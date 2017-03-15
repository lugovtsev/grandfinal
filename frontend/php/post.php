<?php
require 'Mail.class.php';
require 'varDefine.php';

//$to = file_get_contents("../add/email.inc").", company@gmail.com";
$to = "a.lugovtsev@t-stark.ru";

$theme  = "Заявка с сайта ...";

$objMail = new Mail($to, $theme, $name, $phone, $email, $message, $surname, $location);
$objMail->sendMail();
?>