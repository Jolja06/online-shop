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


	function _changeView ($this) {
		
	var _previouseClass = '';
		var $this = $(this),
			item = $this.closest('.view-catalog__item'),
			view = item.data('view'),
			list = $('#goods__list'),
			viewPrefix = 'goods__list_',
			classView = viewPrefix + view;

			console.log(this);

		if ( _previouseClass = '') {
			_previouseClass = list.attr('class');
		}

		list.attr('class', _previouseClass + ' ' + classView );

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

SliderWidget.init();
ChangeView.init();