<?
	class Mail 
	{
		public $to, $theme, $name, $phone, $email, $message, $surname, $location, $emailmess;
		public $headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";

		function __construct($to, $theme, $name, $phone, $email, $message, $surname, $location) 
		{
			$this->to = $to;
			$this->theme = $theme;
			$this->name = $name;
			$this->phone = $phone;
			$this->email = $email;
			$this->message = $message;
			$this->surname = $surname;
			$this->location = $location;

			$this->emailmess = "<table>";
			if(!empty($this->name)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Name: </td><td style='border:1px solid;padding:6px;'>".$this->name."</td></tr>";
			}
			if(!empty($this->phone)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Phone: </td><td style='border:1px solid;padding:6px;'>".$this->phone."</td></tr>";
			}
			if(!empty($this->email)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Email: </td><td style='border:1px solid;padding:6px;'>".$this->email."</td></tr>";
			}
			if(!empty($this->message)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Message: </td><td style='border:1px solid;padding:6px;'>".$this->message."</td></tr>";
			}
			if(!empty($this->location)){
				$this->emailmess .= "<tr><td style='border:1px solid;padding:6px;'>Form: </td><td style='border:1px solid;padding:6px;'>".$this->location."</td></tr>";
			}
			$this->emailmess .= "</table>";
		}


		function sendMail() 
		{
			if (isset($_POST['name']) && !empty($this->name) && empty($this->surname)) 
			{
				mail($this->to, $this->theme, $this->emailmess, $this->headers);
				header('Location: ../thanks.html');
			} 
			else
			{
				header("Location: ../");
			}
		}
	}
?>