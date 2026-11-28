<?php
// Shared code for the form endpoints (contact.php, newsletter.php, apply.php), run by SiteGround's PHP 8.2.
// Replaced the Lovable/Supabase edge functions on 28 Nov 2026. Tested by tests/api.test.php.
// .htaccess refuses to serve anything under /api/_, so this file is never a page.
declare(strict_types=1);

const RZ_TO = 'rihards.zeila@gmail.com';
const RZ_FROM = 'rihardszeila.com <forms@rihardszeila.com>';
const RZ_SENDER_GROUP = 'dN2qwz'; // Sender group "Rihards Zeila (EN)"
const RZ_SPEND = ['under-10k', '10k-20k', '20k-50k', '50k-plus'];
const RZ_SOURCES = ['linkedin-post', 'linkedin-profile', 'blog', 'newsletter', 'google', 'referral', 'other'];
const RZ_TYPES = ['project', 'cofounder', 'cmo', 'speaking', 'other', 'workshop', 'mba-module', 'corporate-training', 'public-program'];
const RZ_ROLES = ['founder', 'growth', 'buyer', 'other'];
const RZ_TIMELINES = ['now', 'month', 'quarter', 'exploring'];

function rz_str(array $d, string $k): string {
  return isset($d[$k]) && is_string($d[$k]) ? trim($d[$k]) : '';
}
function rz_email_ok(string $e): bool {
  return strlen($e) <= 254 && filter_var($e, FILTER_VALIDATE_EMAIL) !== false;
}
function rz_bot(array $d, string $k): bool {
  return rz_str($d, $k) !== '';
}

/** Contact form and /work-with-me. ['ok' => true, 'value' => [...]] or ['ok' => false, 'error' => '...']. */
function rz_validate_contact($d): array {
  if (!is_array($d)) return ['ok' => false, 'error' => 'Invalid input'];
  $name = rz_str($d, 'name'); $email = strtolower(rz_str($d, 'email')); $type = strtolower(rz_str($d, 'type')); $msg = rz_str($d, 'message');
  if ($name === '' || mb_strlen($name) > 100) return ['ok' => false, 'error' => 'Invalid name'];
  if (!rz_email_ok($email)) return ['ok' => false, 'error' => 'Invalid email'];
  if (!in_array($type, RZ_TYPES, true)) return ['ok' => false, 'error' => 'Invalid type'];
  if ($msg === '' || mb_strlen($msg) > 5000) return ['ok' => false, 'error' => 'Invalid message'];
  $org = rz_str($d, 'organization');
  if (mb_strlen($org) > 150) return ['ok' => false, 'error' => 'Invalid organization'];
  $source = rz_str($d, 'source'); $spend = rz_str($d, 'spend');
  if ($source !== '' && !in_array($source, RZ_SOURCES, true)) return ['ok' => false, 'error' => 'Invalid source'];
  if ($spend !== '' && !in_array($spend, RZ_SPEND, true)) return ['ok' => false, 'error' => 'Invalid spend'];
  $v = ['name' => $name, 'email' => $email, 'type' => $type, 'message' => $msg];
  if ($org !== '') $v['organization'] = $org;
  if ($source !== '') $v['source'] = $source;
  if ($spend !== '') $v['spend'] = $spend;
  if (rz_bot($d, 'website')) $v['bot'] = true;
  return ['ok' => true, 'value' => $v];
}

/** Newsletter signup. `source` is a short label from our own pages, cut to 40 characters. */
function rz_validate_signup($d): array {
  if (!is_array($d)) return ['ok' => false, 'error' => 'Invalid email'];
  $email = strtolower(rz_str($d, 'email'));
  if (!rz_email_ok($email)) return ['ok' => false, 'error' => 'Invalid email'];
  $first = rz_str($d, 'firstname');
  if (mb_strlen($first) > 60) return ['ok' => false, 'error' => 'First name too long'];
  $spend = rz_str($d, 'spend');
  if ($spend !== '' && !in_array($spend, RZ_SPEND, true)) return ['ok' => false, 'error' => 'Invalid spend'];
  $source = mb_substr(rz_str($d, 'source'), 0, 40);
  $v = ['email' => $email];
  if ($first !== '') $v['firstname'] = $first;
  if ($spend !== '') $v['spend'] = $spend;
  $v['source'] = $source !== '' ? $source : 'unknown';
  $v['bot'] = rz_bot($d, 'website');
  return ['ok' => true, 'value' => $v];
}

/** /apply. Under EUR 10K a month is routed to free resources by the page and refused here too. */
function rz_validate_application($d): array {
  if (!is_array($d)) return ['ok' => false, 'error' => 'Invalid input'];
  foreach ([['name', 150], ['company', 150], ['decision', 150], ['goal', 2000], ['blocker', 2000]] as [$k, $max]) {
    $s = rz_str($d, $k);
    if ($s === '' || mb_strlen($s) > $max) return ['ok' => false, 'error' => "Invalid $k"];
  }
  $email = strtolower(rz_str($d, 'email'));
  if (!rz_email_ok($email)) return ['ok' => false, 'error' => 'Invalid email'];
  if (!in_array(rz_str($d, 'spend'), ['10k-20k', '20k-50k', '50k-plus'], true)) return ['ok' => false, 'error' => 'Invalid spend'];
  if (!in_array(rz_str($d, 'role'), RZ_ROLES, true)) return ['ok' => false, 'error' => 'Invalid role'];
  if (!in_array(rz_str($d, 'timeline'), RZ_TIMELINES, true)) return ['ok' => false, 'error' => 'Invalid timeline'];
  $website = rz_str($d, 'website');
  if (mb_strlen($website) > 150) return ['ok' => false, 'error' => 'Invalid website'];
  $v = ['email' => $email];
  foreach (['spend', 'name', 'company', 'role', 'goal', 'blocker', 'timeline', 'decision'] as $k) $v[$k] = rz_str($d, $k);
  if ($website !== '') $v['website'] = $website;
  $source = mb_substr(rz_str($d, 'source'), 0, 40);
  if ($source !== '') $v['source'] = $source;
  $v['bot'] = rz_bot($d, 'hp');
  return ['ok' => true, 'value' => $v];
}

/**
 * Add a signup to the Sender group (Sender runs the welcome automation on joining). $http(url, body) returns
 * [status, decoded body]. Sender does not document what create does with an address it already has, so a refused
 * create (4xx other than 401/429) falls back to adding that address to the group; only "non_existing" is a failure.
 */
function rz_subscribe(callable $http, string $token, string $group, array $s): string {
  if ($token === '') throw new RuntimeException('missing SENDER_API_TOKEN');
  $fields = ['{$spend}' => $s['spend'] ?? '', '{$source}' => $s['source']];
  if ($fields['{$spend}'] === '') unset($fields['{$spend}']);
  $body = ['email' => $s['email'], 'groups' => [$group], 'fields' => $fields, 'trigger_automation' => true];
  if (isset($s['firstname'])) $body = ['email' => $s['email'], 'firstname' => $s['firstname']] + $body;
  [$status] = $http('https://api.sender.net/v2/subscribers', $body);
  if ($status >= 200 && $status < 300) return 'created';
  if ($status < 400 || $status >= 500 || $status === 401 || $status === 429) throw new RuntimeException("sender $status");
  [$status, $res] = $http("https://api.sender.net/v2/subscribers/groups/$group", ['subscribers' => [$s['email']], 'trigger_automation' => true]);
  $missing = $res['message']['non_existing_subscribers'] ?? [];
  if ($status >= 200 && $status < 300 && !in_array($s['email'], (array) $missing, true)) return 'added';
  throw new RuntimeException("sender $status: not added to group");
}

/** The real HTTP call to Sender, with the token from the secrets file. */
function rz_sender_http(string $token): callable {
  return function (string $url, array $body) use ($token): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
      CURLOPT_POST => true,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 15,
      CURLOPT_HTTPHEADER => ["Authorization: Bearer $token", 'Content-Type: application/json', 'Accept: application/json'],
      CURLOPT_POSTFIELDS => json_encode($body),
    ]);
    $raw = curl_exec($ch);
    $status = $raw === false ? 0 : (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    curl_close($ch);
    $decoded = is_string($raw) ? json_decode($raw, true) : null;
    return [$status, is_array($decoded) ? $decoded : []];
  };
}

/** rz-secrets.json sits in the folder above the web root; the deploy writes it from a GitHub secret. */
function rz_secret(string $key): string {
  $file = dirname(__DIR__, 2) . '/rz-secrets.json';
  $data = is_readable($file) ? json_decode((string) file_get_contents($file), true) : null;
  return is_array($data) && isset($data[$key]) && is_string($data[$key]) ? $data[$key] : '';
}

/** A header value with no line breaks, so visitor input can never add a header. */
function rz_header_safe(string $s): string {
  return trim((string) preg_replace('/[\r\n]+/', ' ', $s));
}
function rz_h(string $s): string {
  return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

/** Mail Rihards an HTML table of label => value rows. Returns false when SiteGround's mail() refuses. */
function rz_mail(string $subject, string $heading, array $rows, string $replyTo, string $footer = ''): bool {
  $table = '';
  foreach ($rows as $label => $value) {
    if ($value === '' || $value === null) continue;
    $table .= '<tr><td style="padding:4px 12px 4px 0;vertical-align:top"><strong>' . rz_h((string) $label) . '</strong></td><td style="padding:4px 0">'
      . nl2br(rz_h((string) $value)) . '</td></tr>';
  }
  $html = '<h2>' . rz_h($heading) . '</h2><table>' . $table . '</table>' . ($footer !== '' ? '<p>' . rz_h($footer) . '</p>' : '');
  $headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . RZ_FROM,
    'Reply-To: ' . rz_header_safe($replyTo),
  ];
  $log = getenv('RZ_MAIL_LOG'); // local testing: write the mail to a file instead of sending it
  if (is_string($log) && $log !== '') {
    return file_put_contents($log, "Subject: $subject\n" . implode("\n", $headers) . "\n\n$html\n\n", FILE_APPEND) !== false;
  }
  return mail(RZ_TO, mb_encode_mimeheader(rz_header_safe($subject), 'UTF-8'), $html, implode("\r\n", $headers));
}

/** Read the JSON body of a POST, or answer 405/400 and stop. */
function rz_request(): array {
  if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') rz_reply(405, ['error' => 'POST only']);
  $d = json_decode((string) file_get_contents('php://input'), true);
  if (!is_array($d)) rz_reply(400, ['error' => 'Invalid JSON']);
  return $d;
}
function rz_reply(int $status, array $body): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store');
  echo json_encode($body);
  exit;
}
