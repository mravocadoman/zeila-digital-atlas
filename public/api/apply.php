<?php
// POST from /apply -> an email to Rihards with every answer. See _rz.php.
declare(strict_types=1);
require __DIR__ . '/_rz.php';

$v = rz_validate_application(rz_request());
if (!$v['ok']) rz_reply(400, ['error' => $v['error']]);
$a = $v['value'];
if ($a['bot']) rz_reply(200, ['ok' => true]);

$sent = rz_mail(
  'Application: ' . $a['company'] . ' (' . $a['spend'] . ')',
  'New application from rihardszeila.com/apply',
  ['Ad spend (EUR a month)' => $a['spend'], 'Name' => $a['name'], 'Email' => $a['email'], 'Company' => $a['company'],
   'Website' => $a['website'] ?? '', 'Role' => $a['role'], 'Next 90 days' => $a['goal'], 'In the way' => $a['blocker'],
   'Start' => $a['timeline'], 'Who else decides' => $a['decision'], 'Came from' => $a['source'] ?? ''],
  $a['email'],
  'Reply with three times within one working day.'
);
$sent ? rz_reply(200, ['ok' => true]) : rz_reply(502, ['error' => 'send_failed']);
