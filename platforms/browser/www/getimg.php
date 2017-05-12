<?php
echo $a = file_get_contents($_GET['s']);
//imagejpeg($a);

$ch = curl_init ($_GET['s']);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER,true);
curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$rawdata=curl_exec($ch);
curl_close ($ch);
echo $rawdata;exit;
$fp = fopen($local_file,'w');
fwrite($fp, $rawdata);
fclose($fp);
