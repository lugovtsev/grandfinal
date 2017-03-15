$(document).ready(function() {

/* Прокрутка вверх

$('#totop').click(function()
{
	 $('html, body').animate({
        scrollTop: 0
    }, 500);
});
*/

/* Плавная прокрутка меню

$('#main-menu a').click(function(e)
{
	e.preventDefault();
	var blockId = $(this).attr('href');
	 $('html, body').animate({
        scrollTop: $(blockId).offset().top - 50
    }, 500);
});

*/

/*маска для input c телефоном*/
	$(".phone-input").mask("+7 (999) 999-99-99");

/*colorbox*/
	/*$('.cert-item a').colorbox({
			rel: '.cert-item a', //для группировки изображений
			opacity: 0.7,
			speed: 350,
			title: false
		});*/

/*slick*/
	/*$('.slick-container').slick({
	  infinite: true,
	  arrows: false,
	  dots: true,
	  slidesToShow: 4,
	  slidesToScroll: 2
	});*/

/*валидация формы*/
	$("form").submit(function() {
		var checkError = false; //проверка прохождения валидации
		//var regExpMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
		//var email = $(this).find('.email-input');
		var regExpName = /[^а-яЁё\s]/i;
		var name = $(this).find('.name-input');
		var phone = $(this).find('.phone-input');

		//не заполнено имя
		if (name.val()=="")
			{
				name.addClass("fill-error");
				name.attr("placeholder","*Заполните поле");
				checkError = true;
			}
		else if (regExpName.test(name.val())) //неверный формат имени
					{
						name.addClass("fill-error");
						name.attr("placeholder","Неверный формат имени");
						name.val("");
						checkError = true;
					}
		else
		{
			name.removeClass("fill-error");
			name.attr("placeholder","Имя*");

		}
		//не заполнен телефон
		if (phone.val()=="")
			{
				phone.addClass("fill-error");
				phone.attr("placeholder","*Заполните поле");
				checkError = true;
			}
		else
			{
				phone.removeClass("fill-error");
				phone.attr("placeholder","Телефон*");
			}
		//неверный формат email
		/*
		if (!regExpMail.test(email.val()) && email.val()!="")
			{
				email.addClass("fill-error");
				email.attr("placeholder","Неверный формат e-mail");
				email.val("");
				checkError = true;
			}
		else
			{
				email.removeClass("fill-error");
				email.attr("placeholder","Email");
			}*/
		if (checkError) return false; //отменить отправку формы, если валидация не пройдена
	});

});
