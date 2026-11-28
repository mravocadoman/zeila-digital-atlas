<?php
// Self-check for the form endpoints in public/api: php tests/api.test.php
// Same cases the old Supabase functions were tested on, now against the PHP that runs on SiteGround.
declare(strict_types=1);
require __DIR__ . '/../public/api/_rz.php';

$n = 0;
function check(bool $ok, string $what): void { global $n; $n++; if (!$ok) { fwrite(STDERR, "FAIL: $what\n"); exit(1); } }
function throws(callable $f, string $pattern, string $what): void {
  try { $f(); } catch (Throwable $e) { check((bool) preg_match($pattern, $e->getMessage()), "$what (got: {$e->getMessage()})"); return; }
  check(false, "$what (nothing thrown)");
}

// --- contact form ---
$base = ['name' => 'Ada', 'email' => ' Ada@Example.com ', 'type' => 'project', 'message' => 'Hello'];
$v = rz_validate_contact($base);
check($v['ok'] && $v['value'] === ['name' => 'Ada', 'email' => 'ada@example.com', 'type' => 'project', 'message' => 'Hello'], 'plain contact passes, email trimmed and lower-cased');
$v = rz_validate_contact($base + ['source' => 'linkedin-post', 'spend' => '20k-50k']);
check($v['ok'] && $v['value']['source'] === 'linkedin-post' && $v['value']['spend'] === '20k-50k', 'source and spend pass');
$v = rz_validate_contact($base + ['source' => '', 'spend' => '']);
check($v['ok'] && !isset($v['value']['source']), 'empty source means not answered');
check(preg_match('/source/', rz_validate_contact($base + ['source' => 'tiktok'])['error'] ?? '') === 1, 'unknown source refused');
check(preg_match('/spend/', rz_validate_contact($base + ['spend' => 'lots'])['error'] ?? '') === 1, 'unknown spend refused');
check(!rz_validate_contact(['name' => str_repeat('x', 101)] + $base)['ok'], 'long name refused');
check(!rz_validate_contact(['type' => 'astronaut'] + $base)['ok'], 'unknown type refused');
check(!rz_validate_contact(null)['ok'], 'no body refused');
check(rz_validate_contact($base + ['website' => 'http://spam'])['value']['bot'] ?? false, 'honeypot flags a bot');

// --- newsletter signup ---
$v = rz_validate_signup(['email' => ' Ada@Example.com ', 'firstname' => ' Ada ', 'spend' => '20k-50k', 'source' => 'blog', 'website' => '']);
check($v === ['ok' => true, 'value' => ['email' => 'ada@example.com', 'firstname' => 'Ada', 'spend' => '20k-50k', 'source' => 'blog', 'bot' => false]], 'valid signup');
check(preg_match('/email/', rz_validate_signup(['source' => 'blog'])['error'] ?? '') === 1, 'missing email refused');
check(preg_match('/spend/', rz_validate_signup(['email' => 'a@b.co', 'spend' => 'lots'])['error'] ?? '') === 1, 'unknown spend refused');
check(!rz_validate_signup(['email' => 'a@b.co', 'firstname' => str_repeat('x', 61)])['ok'], 'long first name refused');
check(rz_validate_signup(['email' => 'a@b.co', 'website' => 'x'])['value']['bot'] === true, 'honeypot flags a bot');
check(strlen(rz_validate_signup(['email' => 'a@b.co', 'source' => str_repeat('x', 60)])['value']['source']) === 40, 'long source is cut, not refused');

// --- reaching Sender, with a fake http that records calls ---
function fake(array $replies): array {
  $calls = new ArrayObject();
  $fn = function (string $url, array $body) use (&$replies, $calls): array {
    $calls[] = ['url' => $url, 'body' => $body];
    return array_shift($replies) ?? [500, []];
  };
  return [$fn, $calls];
}
$s = ['email' => 'ada@example.com', 'firstname' => 'Ada', 'spend' => '20k-50k', 'source' => 'blog', 'bot' => false];
[$f, $calls] = fake([[201, ['success' => true]]]);
check(rz_subscribe($f, 'tok', 'grp1', $s) === 'created', 'new subscriber is created');
check($calls[0]['url'] === 'https://api.sender.net/v2/subscribers' && $calls[0]['body']['groups'] === ['grp1'], 'create call carries the group');
check($calls[0]['body']['fields'] === ['{$spend}' => '20k-50k', '{$source}' => 'blog'] && $calls[0]['body']['trigger_automation'] === true, 'fields and automation flag');
[$f, $calls] = fake([[422, []], [200, ['success' => true, 'message' => ['subscribers_added_to_group' => [], 'non_existing_subscribers' => []]]]]);
check(rz_subscribe($f, 'tok', 'grp1', $s) === 'added', 'existing subscriber is added to the group');
check($calls[1]['url'] === 'https://api.sender.net/v2/subscribers/groups/grp1' && $calls[1]['body']['subscribers'] === ['ada@example.com'], 'group call carries the address');
[$f] = fake([[503, []]]);
throws(fn () => rz_subscribe($f, 'tok', 'grp1', $s), '/sender 503/', 'Sender down is an error');
[$f] = fake([[422, []], [200, ['message' => ['non_existing_subscribers' => ['ada@example.com']]]]]);
throws(fn () => rz_subscribe($f, 'tok', 'grp1', $s), '/not added/', 'not found when adding to the group is an error');
throws(fn () => rz_subscribe(fake([])[0], '', 'grp1', $s), '/missing SENDER_API_TOKEN/', 'missing token is an error');

// --- application ---
$good = ['spend' => '20k-50k', 'name' => 'Ada', 'email' => 'Ada@Example.com', 'company' => 'Acme', 'website' => 'acme.com', 'role' => 'founder',
  'goal' => 'Lower CPA', 'blocker' => 'Tracking is off', 'timeline' => 'month', 'decision' => 'Me and my co-founder', 'source' => 'linkedin', 'hp' => ''];
$v = rz_validate_application($good);
check($v['ok'] && $v['value']['email'] === 'ada@example.com' && $v['value']['bot'] === false, 'valid application');
foreach ([['spend', 'lots', 'spend'], ['spend', 'under-10k', 'spend'], ['goal', '', 'goal'], ['email', 'nope', 'email'], ['role', 'astronaut', 'role'], ['blocker', str_repeat('x', 2001), 'blocker']] as [$k, $val, $want]) {
  check(preg_match("/$want/", rz_validate_application([$k => $val] + $good)['error'] ?? '') === 1, "application refuses bad $k");
}
check(rz_validate_application(['website' => ''] + $good)['ok'], 'website is optional');
check(strlen(rz_validate_application(['source' => str_repeat('x', 60)] + $good)['value']['source']) === 40, 'long ?from= tag is cut');
check(rz_validate_application(['hp' => 'x'] + $good)['value']['bot'] === true, 'honeypot flags a bot');

// --- mail headers never carry a second line from visitor input ---
check(rz_header_safe("Acme\r\nBcc: x@y.z") === 'Acme Bcc: x@y.z', 'line breaks are stripped from header values');

echo "api: ok ($n checks)\n";
