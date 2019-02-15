(function($) {

$('.js-open').on('click', function(e){
	e.preventDefault();
	$('.menu').addClass('mob-menu');
	$('.js-close').addClass('close');
})
$('.js-close').on('click', function () {
	$('.menu').removeClass('mob-menu');
	$('.close').removeClass('close');
});
$('.js-slider').slick({
	infinite: true,
	slidesToShow: 3,
	prevArrow: '<div class="slick-prev" style="background-color: red"></div>',
    nextArrow: '<div class="slick-next" style="background-color: black"></div>'
});
})(jQuery);
