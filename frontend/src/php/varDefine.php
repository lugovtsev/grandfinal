<?
	$name  = (isset($_POST['name'])) ? trim(strip_tags($_POST['name'])) : "";
	$phone = (isset($_POST['phone'])) ? trim(strip_tags($_POST['phone'])) : "";
	$email  = (isset($_POST['email'])) ? trim(strip_tags($_POST['email'])) : "";
	$from  = (isset($_POST['from'])) ? trim(strip_tags($_POST['from'])) : "";
	$destination  = (isset($_POST['destination'])) ? trim(strip_tags($_POST['destination'])) : "";
	$message = (isset($_POST['message'])) ? trim(strip_tags($_POST['message'])) : "";
	$surname  = (isset($_POST['surname'])) ? ($_POST['surname']) : "";
	$location = (isset($_POST['location'])) ? trim(strip_tags($_POST['location'])) : "";
	$item_name = (isset($_POST['item_name'])) ? trim(strip_tags($_POST['item_name'])) : "";
	$conditions = (isset($_POST['conditions'])) ? trim(strip_tags($_POST['conditions'])) : "";
	$weight = (isset($_POST['weight'])) ? trim(strip_tags($_POST['weight'])) : "";
	$volume = (isset($_POST['volume'])) ? trim(strip_tags($_POST['volume'])) : "";
?>
