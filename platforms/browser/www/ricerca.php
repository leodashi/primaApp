<?php
$q = '';
foreach($_GET as $k => $v){
    $q .= $k."=".$v."&";
}
$q = substr($q,0,-1);
$url =  'http://www.omdbapi.com/?'.$q;
$a = file_get_contents('http://www.omdbapi.com/?'.$q);
//var_dump($a);
echo $a;
//echo json_encode(
//        $a
//);    
