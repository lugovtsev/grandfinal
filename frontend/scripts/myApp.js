$(document).ready(function() {

	if ($(document).width() < 1200)
	{
		$('.program-items').slick({
		  infinite: true,
		  slidesToShow: 2,
		  slidesToScroll: 1,
			adaptiveHeight: true,
			responsive: [
			 {
				 breakpoint: 768,
				 settings: {
					 slidesToShow: 1,
				 }
			 }]
		});
	}

	function initSertSl() {
		$('.certificate').slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [
					 {
						 breakpoint: 600,
						 settings: {
							 slidesToShow: 2,
						 }
					 }]
		});
	}

	$('a[href="#coach"]').click(function() {
		if (!$('.certificate').hasClass('slick-initialized')) {
			setTimeout(initSertSl, 200);
		}
	});

	$('.brands').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
		 {
			 breakpoint: 768,
			 settings: {
				 slidesToShow: 2,
			 }
		 },
		 {
			 breakpoint: 1200,
			 settings: {
				 slidesToShow: 4,
			 }
		 }]
	});

	/*colorbox*/
	if ($(document).width() > 768) {
		$('.certificate a').colorbox({
				rel: '.cert-item a', //для группировки изображений
				opacity: 0.7,
				speed: 350,
				title: false,
				maxWidth: 700,
				centerPadding: "20%",
    dots: false,
    centerMode: true,
    focusOnSelect: true
			});
		}
if ($(document).width() >= 1200) {
	$('.watch_pr').click(function() {
		$('html, body').animate({
				 scrollTop: $('#about').offset().top}, 500, 'swing', $('a[href="#program"]').click());
	});
} else {
	$('.watch_pr').click(function() {
		$('html, body').animate({
				 scrollTop: $('#about').offset().top + 40}, 500, 'swing', $('a[href="#program"]').click());
	});
}

$('#tab-couch').click(function() {
	try {
		$('a[href="#coach"]').click();
	} catch (e) {}
});

$('#tab-about').click(function() {
	try {
		$('a[href="#program"]').click();
	} catch (e) {}
});

/*переход по якорям со страницы thanks*/
if (location.hash == '#thanks_about') setTimeout('$("#tab-about").click();', 200);
if (location.hash == '#thanks_coach') setTimeout('$("#tab-couch").click();', 200);
if (location.hash == '#thanks_faq') setTimeout('$("#tab-faq").click();', 200);
if (location.hash == '#thanks_contacts') setTimeout('$("#tab-contacts").click();', 200);


$('a.modal-but[data-target="#modal-callback"]').click(function() {
	$('#modal-callback input[name="location"]').val($(this).data('loc'));
});

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
		if ($(this).hasClass('opened')) {
			$(this).removeClass('opened');
			$('nav.top-menu').slideUp(300);
		} else {
			$(this).addClass('opened');
			$('nav.top-menu').slideDown(300);
		}
	});
}

if ($(document).width() >= 1200)
{
	/*шапка*/
	$('.header').scroolly([
		{
			from: 'doc-top',
			to: 'doc-top + 20px',
			removeClass: 'head--fixed'
		},
		{
			from: 'doc-top + 20px',
			addClass: 'head--fixed'
		}
	], $('.promo'));
}

if ($(document).width() < 1200) {
	/*totop*/
	$('#totop').scroolly([
		{
			from: 'doc-top',
			to: 'doc-bottom - 50px',
			css: {bottom: '20px'}
		},
		{
			from: 'doc-bottom - 50px',
			css: {bottom: '60px'}
		}
	]);
}

/*totop*/
$('#totop').scroolly([
	{
		from: 'doc-top',
		to: 'doc-top + 500px',
		css: {opacity: 0}
	},
	{
		from: 'doc-top + 500px',
		css: {opacity: 1}
	}
]);

/* Плавная прокрутка меню*/
if ($(document).width() >= 1200) {
$('#main-menu a').click(function(e)
{
	e.preventDefault();
	$('#main-menu a').removeClass('current');
	$(this).addClass('current');
	var blockId = $(this).attr('href');
	var scrVal = 0;
	if ($('.header').hasClass('head--fixed')) {
		scrVal = (blockId == '#faq') ? 90 : 0;
		$('html, body').animate({
			scrollTop: $(blockId).offset().top - scrVal
		}, 1000);
	} else {
		scrVal = (blockId == '#faq') ? 200 : 110;
		$('html, body').animate({
			scrollTop: $(blockId).offset().top - scrVal
		}, 1000);
	}
});
} else {
	$('#main-menu a').click(function(e)
	{
		e.preventDefault();
		$('#main-menu a').removeClass('current');
		$(this).addClass('current');
		var blockId = $(this).attr('href');
		var scrVal = 0;
		if (blockId == '#faq') {
			scrVal = -15;
			blockId = '#faqmobile'
		} else if (blockId == '#contacts') {
			scrVal = -10;
			blockId = '#contactsmobile'
		} else {
			scrVal = 30;
		}
		if ($(document).width() < 768 && $(this).attr('id') == 'tab-couch') {
			scrVal = -15;
			blockId = '#nav-item-coach'
		}
		$('html, body').animate({
			scrollTop: $(blockId).offset().top + scrVal
		}, 1000, 'swing', $('#burger.opened').click());
	});
}

/* Прокрутка вверх */
$('#totop').click(function()
{
	 $('html, body').animate({
        scrollTop: 0
    }, 1000);
});

/*маска для input c телефоном*/
	$(".phone-input").mask("+7 (999) 999-99-99");

/*валидация формы*/
	$("form").submit(function() {
		var checkError = false; //проверка прохождения валидации
		var regExpMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
		var email = $(this).find('.email-input');
		var regExpName = /[^а-яЁё\s]/i;
		var name = $(this).find('.name-input');
		var phone = $(this).find('.phone-input');

		//не заполнено имя
		if (name.val() != undefined)
		{
			if (name.val()=="")
				{
					name.addClass("fill-error");
					name.attr("placeholder","*Заполните имя");
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
		}

		//неверный формат email
		if (email.val() != undefined)
		{
			if (email.val()=="")
				{
					email.addClass("fill-error");
					email.attr("placeholder","*Заполните email");
					checkError = true;
				}
			else if (!regExpMail.test(email.val()))
				{
					email.addClass("fill-error");
					email.attr("placeholder","Неверный формат e-mail");
					email.val("");
					checkError = true;
				}
			else
				{
					email.removeClass("fill-error");
					email.attr("placeholder","Email*");
				}
			}

			//не заполнен телефон
			if (phone.val() != undefined)
			{
				if (phone.val()=="")
					{
						phone.addClass("fill-error");
						phone.attr("placeholder","*Заполните телефон");
						checkError = true;
					}
				else
					{
						phone.removeClass("fill-error");
						phone.attr("placeholder","Телефон*");
					}
				}

		if (checkError) return false; //отменить отправку формы, если валидация не пройдена
	});

});
