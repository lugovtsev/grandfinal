$(document).ready(function() {

/*collapse FAQ*/
$('.collapse-link').click(function() {
	if ($(this).hasClass('opened')) {
		$(this).removeClass('opened');
		$(this).siblings('.collapse-content').slideUp(300);
	}
	else {
		$('.collapse-link').removeClass('opened');
		$('.collapse-content').slideUp(300);
		$(this).addClass('opened');
		$(this).siblings('.collapse-content').slideDown(300);
	}
});

if ($(document).width() < 1200)
{
	/*show mob menu*/
	$('#burger').click(function() {
		$('#menu-box').animate({
			left: 0
		},
		200,
		function() {
			$('.left-menu-overlay').fadeIn(200);
			$('body').css('overflow','hidden');
		});
	});

	$('.left-menu-overlay').click(function() {
		$('.left-menu-overlay').fadeOut();
		$("#menu-box").animate({
			left: "-100%"
		},
		200,
		function() {
			$('body').css('overflow','auto');
		});

	});
	$('.open-sub-menu').click(function() {
		$(this).toggleClass('opened');
		$(this).siblings('ul').slideToggle(200);
	});
}

if ($(document).width() >= 1200)
{
	/*шапка*/
	$('.head2').scroolly([
		{
			from: 'doc-top',
			to: 'con-bottom = vp-top',
			css: {position: 'static'},
			removeClass: 'head2--fixed'
		},
		{
			from: 'con-bottom = vp-top',
			css: {position: 'fixed',top: 0},
			addClass: 'head2--fixed'
		}
	], $('.head1'));
	/*sidebar в услугах*/
	$('.sidebar').scroolly([
		{
			from: 'doc-top',
			to: 'con-bottom = vp-top + 100px',
			removeClass: 'sidebar-fixed'
		},
		{
			from: 'con-bottom = vp-top + 100px',
			addClass: 'sidebar-fixed'
		}
	], $('.services-menu'));
}

/*для добавления файла*/
$('#add_file').click(function(){
   $("#attached_file").click();
})

$("#attached_file").change(function(){
	if (this.value != "")
  	$('#add_file').text(this.value.replace(/C:\\fakepath\\/i, ''));
	else {
		$('#add_file').text("Прикрепить файл");
	}
})

/* Прокрутка вверх */

$('#totop').click(function()
{
	 $('html, body').animate({
        scrollTop: 0
    }, 500);
});


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
