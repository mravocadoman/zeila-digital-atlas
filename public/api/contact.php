<?php
// POST from the contact form and /work-with-me -> an email to Rihards. See _rz.php.
declare(strict_types=1);
require __DIR__ . '/_rz.php';

$v = rz_validate_contact(rz_request());
if (!$v['ok']) rz_reply(400, ['error' => $v['error']]);
$c = $v['value'];
if (!empty($c['bot'])) rz_reply(200, ['ok' => true]); // a filled honeypot gets the same answer, nothing is sent

$sent = rz_mail(
  'New ' . $c['type'] . ' inquiry from ' . $c['name'] . (isset($c['organization']) ? ' (' . $c['organization'] . ')' : ''),
  'New contact form submission',
  ['Type' => $c['type'], 'Name' => $c['name'], 'Email' => $c['email'], 'Organization' => $c['organization'] ?? '',
   'Found me via' => $c['source'] ?? '', 'Ad spend (EUR a month)' => $c['spend'] ?? '', 'Message' => $c['message']],
  $c['email']
);
$sent ? rz_reply(200, ['ok' => true]) : rz_reply(502, ['error' => 'send_failed']);
