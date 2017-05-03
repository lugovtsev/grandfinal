<?php
require 'Mail.class.php';
require 'varDefine.php';

//$to = file_get_contents("../add/email.inc").", company@gmail.com";
$to = "a.lugovtsev@t-stark.ru";

$theme  = "Заявка с сайта grandfinal.ru";

$objMail = new Mail($to, $theme, $name, $phone, $email, $surname, $location);

$objMail->sendMail();



?>
