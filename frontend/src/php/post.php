<?php
require 'Mail.class.php';
require 'varDefine.php';

//$to = file_get_contents("../add/email.inc").", company@gmail.com";
$to = "a.lugovtsev@t-stark.ru";

$theme  = "Заявка с сайта Cargo Expert";

$objMail = new Mail($to, $theme, $name, $phone, $email, $from, $destination, $message, $surname, $location, $item_name, $conditions, $weight, $volume);
if (!empty($_FILES['myfile']['tmp_name']))
  {
    $objMail->sendMailFile();
  }
  else
  {
    $objMail->sendMail();
  }


?>
