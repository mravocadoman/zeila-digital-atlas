<?php
// POST from the newsletter signup -> the Sender group "Rihards Zeila (EN)". See _rz.php.
declare(strict_types=1);
require __DIR__ . '/_rz.php';

$v = rz_validate_signup(rz_request());
if (!$v['ok']) rz_reply(400, ['error' => $v['error']]);
$s = $v['value'];
if ($s['bot']) rz_reply(200, ['ok' => true]); // a filled honeypot gets the same answer, nothing is stored

try {
  $token = rz_secret('SENDER_API_TOKEN');
  $how = rz_subscribe(rz_sender_http($token), $token, RZ_SENDER_GROUP, $s);
  error_log("newsletter signup $how ({$s['source']})");
  rz_reply(200, ['ok' => true]);
} catch (Throwable $e) {
  error_log('newsletter signup failed: ' . $e->getMessage());
  rz_reply(502, ['error' => 'signup_failed']);
}
