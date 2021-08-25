/*************** global init **************/
var $slide;
var idx = 0, last, prev, next;

/************** user function *************/
function init() {
	$slide = $('.slide-wrap .slide').slice();
	last = $slide.length - 1;
	slideInit();
}

function slideInit() {
	$('.slide-wrap').css('left', '-100%').empty();
	prev = (idx === 0) ? last : idx - 1;
	next = (idx === last) ? 0 : idx + 1;
	$($slide[idx]).clone().appendTo('.slide-wrap');
	$($slide[prev]).clone().prependTo('.slide-wrap');
	$($slide[next]).clone().appendTo('.slide-wrap');
}

/************** event callback ************/
function onPrev() {
	$('.slide-wrap').stop().animate({'left': 0}, 500, function() {
		idx = (idx === 0) ? last : idx - 1;
		slideInit();
	});
}

function onNext() {
	$('.slide-wrap').stop().animate({'left': '-200%'}, 500, function() {
		idx = (idx === last) ? 0 : idx + 1;
		slideInit();
	});
}

/*************** event init ***************/
$('.bt-prev').click(onPrev);
$('.bt-next').click(onNext);

/*************** start init ***************/
init();
