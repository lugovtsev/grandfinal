<?
	class Mail
	{
		public $to, $theme, $name, $phone, $email, $from, $destination, $message, $surname, $location, $emailmess, $item_name, $conditions, $weight, $volume;
		public $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";

		function __construct($to, $theme, $name, $phone, $email, $from, $destination, $message, $surname, $location, $item_name, $conditions, $weight, $volume)
		{
			$this->to = $to;
			$this->theme = $theme;
			$this->name = $name;
			$this->phone = $phone;
			$this->email = $email;
			$this->from = $from;
			$this->destination = $destination;
			$this->message = $message;
			$this->surname = $surname;
			$this->location = $location;
			$this->item_name = $item_name;
			$this->conditions = $conditions;
			$this->weight = $weight;
			$this->volume = $volume;

			$this->emailmess = "<table>";
			if(!empty($this->name)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Имя: </td><td style='border:1px solid;padding:6px;'>".$this->name."</td></tr>";
			}
			if(!empty($this->phone)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Телефон: </td><td style='border:1px solid;padding:6px;'>".$this->phone."</td></tr>";
			}
			if(!empty($this->email)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Email: </td><td style='border:1px solid;padding:6px;'>".$this->email."</td></tr>";
			}
			if(!empty($this->from)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Откуда: </td><td style='border:1px solid;padding:6px;'>".$this->from."</td></tr>";
			}
			if(!empty($this->destination)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Куда: </td><td style='border:1px solid;padding:6px;'>".$this->destination."</td></tr>";
			}
			if(!empty($this->item_name)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Груз: </td><td style='border:1px solid;padding:6px;'>".$this->item_name."</td></tr>";
			}
			if(!empty($this->conditions)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Условия: </td><td style='border:1px solid;padding:6px;'>".$this->conditions."</td></tr>";
			}
			if(!empty($this->weight)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Вес: </td><td style='border:1px solid;padding:6px;'>".$this->weight."</td></tr>";
			}
			if(!empty($this->volume)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Объем: </td><td style='border:1px solid;padding:6px;'>".$this->volume."</td></tr>";
			}
			if(!empty($this->message)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Сообщение: </td><td style='border:1px solid;padding:6px;'>".$this->message."</td></tr>";
			}
			if(!empty($this->location)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Форма сайта: </td><td style='border:1px solid;padding:6px;'>".$this->location."</td></tr>";
			}
			$this->emailmess .= "</table>";
		}


		function sendMail()
		{
			if (isset($_POST['name']) && !empty($this->name))/* && empty($this->surname)*/
			{
				mail($this->to, $this->theme, $this->emailmess, $this->headers);
				header('Location: ../');
			}
			else
			{
				header("Location: ../");
			}
		}

		function sendMailFile()
		{
			// Закачиваем файл
			$path = $_FILES['myfile']['name'];
			if (copy($_FILES['myfile']['tmp_name'], $path)) $picture = $path;

			if ($path)
			{
				$fp = fopen($path,"rb");
				if (!$fp)
				{ print "Cannot open file";
					exit();
				}
				$file = fread($fp, filesize($path));
				fclose($fp);
			}
			$name = $path; // в этой переменной надо сформировать имя файла (без всякого пути)
			$EOL = "\r\n"; // ограничитель строк, некоторые почтовые сервера требуют \n - подобрать опытным путём
			$boundary     = "--".md5(uniqid(time()));  // любая строка, которой не будет ниже в потоке данных.
			$headersF    = "MIME-Version: 1.0;$EOL";
			$headersF   .= "Content-Type: multipart/mixed; boundary=\"$boundary\"$EOL";
			$headersF   .= "From: address@server.com";

			$multipart  = "--$boundary$EOL";
			$multipart .= "Content-Type: text/html; charset=utf-8$EOL";
			$multipart .= "Content-Transfer-Encoding: base64$EOL";
			$multipart .= $EOL; // раздел между заголовками и телом html-части
			$multipart .= chunk_split(base64_encode($this->emailmess));

			$multipart .=  "$EOL--$boundary$EOL";
			$multipart .= "Content-Type: application/octet-stream; name=\"$name\"$EOL";
			$multipart .= "Content-Transfer-Encoding: base64$EOL";
			$multipart .= "Content-Disposition: attachment; filename=\"$name\"$EOL";
			$multipart .= $EOL; // раздел между заголовками и телом прикрепленного файла
			$multipart .= chunk_split(base64_encode($file));

			$multipart .= "$EOL--$boundary--$EOL";
			if (isset($_POST['name']) && !empty($this->name))/* && empty($this->surname)*/
			{
				mail($this->to, $this->theme, $multipart, $headersF);
				header('Location: ../');
			}
			else
			{
				header("Location: ../");
			}
		}
	}
?>
