var SliderWidget = (function(){

	function init () {
		_setUpListners();
		slider();
	}

	function _setUpListners () {

	}

	function slider () {

		$('.price__element').each(function(){

			var	$this = $(this),
				min = parseInt($this.data('min')),
				max = parseInt($this.data('max'));

			$this.slider({
				range: true,
				min: min,
				max: max,
				values: [ min, max ],

				slide: function() {
					_insertValues($this);
				},
				create: function() {
					_insertValues($this);
				}
			});
		});

		$('.sorting__select').select2({
			minimumResultsForSearch: Infinity
		});	
	}


	function _insertValues ($this) {
		var container = $this.closest('.price__list'),
			from = container.find('.price__input_from'),
			to = container.find('.price__input_to');

		var values = $this.slider('option', 'values');

		from.val(values[0]);
		to.val(values[1]);
	}

	return {
		init: init,
		slider: slider
	}

	})();

var ChangeView = (function () {

	function init () {
		_setUpListners ();
	}

	function _setUpListners () {

		$('.view-catalog__link').on('click', _activeView);
		$('.view-catalog__link').on('click', _changeView);

	}


	function _changeView (e) {
		e.preventDefault();
	
		var $this = $(this);
		
		var item = $this.closest('.view-catalog__link'),
			view = item.data('view'),
			list = $('#goods__list'),
			modifier = 'goods__list_',
			viewClass = modifier + view;

		if(view == 'table') {
			list.attr('class', 'goods__list');
		}else if(view == 'thumbnail') {
			list.attr('class', 'goods__list' + ' ' +viewClass)
		}else {
			list.attr('class', 'goods__list' + ' ' + 'goods__list_thumbnail' + ' ' +viewClass)
		}
	}

	function _activeView (e) {
		e.preventDefault();

		var $this = $(this);

		$this.closest('.view-catalog__item').addClass('active')
			.siblings().removeClass('active');

	}

	return {
		init : init
	}
})();

var ResetChecked = (function() {
	function init (){
		_setUpListners()
	}

	function _setUpListners() {
		$('.reset-checkbox').on('click' , _reset)
	}

	function _reset (e) {
		e.preventDefault();

		$('.accordion__inner input[type=checkbox]').removeProp('checked');
	}
	return {
		init: init
	}
})();

var SlideShow = (function () {

	function init () {
		_setUpListners();
	}

	function _setUpListners () {
		$('.goods__slideshow-link').on('click', _slideShow);
		
	}

	function _slideShow (e) {
		e.preventDefault();
		var $this = $(this);

		$this.closest('.goods__slideshow-item').addClass('active')
			.siblings('.goods__slideshow-item').removeClass('active')

		_changeSlide($this);

		function _changeSlide ($this) {
			var block = $this.closest('.goods__slideshow'),
				path = $this.find('img').attr('src'),
				display = block.find('.goods__slideshow-img');

			display.fadeOut(function() {
				$(this).attr('src', path).fadeIn();
			});
		}
		
	}

	return{
		init: init
	}

})();

SliderWidget.init();
ChangeView.init();
ResetChecked.init();
SlideShow.init();