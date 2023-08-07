<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$ad_array[] = array();
$ad_array[0] = "Message 1";
$ad_array[1] = "Message 2";
$ad_array[2] = "Message 3";
$ad_array[3] = "Message 4";

$time = date('r');
echo "data: {$ad_array[rand(0,3)]}\n\n";
flush();

?> 