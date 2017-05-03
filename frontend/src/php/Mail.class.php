<?
	class Mail
	{
		public $to, $theme, $name, $phone, $email, $from, $destination, $message, $surname, $location, $emailmess, $item_name, $conditions, $weight, $volume;
		public $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";

		function __construct($to, $theme, $name, $phone, $email, $surname, $location)
		{
			$this->to = $to;
			$this->theme = $theme;
			$this->name = $name;
			$this->phone = $phone;
			$this->email = $email;
			$this->surname = $surname;
			$this->location = $location;

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
			if(!empty($this->location)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Форма сайта: </td><td style='border:1px solid;padding:6px;'>".$this->location."</td></tr>";
			}
			$this->emailmess .= "</table>";
		}


		function sendMail()
		{
			if (isset($_POST['name']) && !empty($this->name) && empty($this->surname))
			{
				mail($this->to, $this->theme, $this->emailmess, $this->headers);
				header('Location: /thanks/');
			}
			else
			{
				header("Location: /");
			}
		}

	}
?>
