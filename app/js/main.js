var SliderWidget = (function(){

	function init () {

		$('.price__element').each(function(){

			var
				$this = $(this),
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
		})	
	}

	function _insertValues ($this) {
		var 
			container = $this.closest('.price__list'),
			from = container.find('.price__input_from'),
			to = container.find('.price__input_to');

		var values = $this.slider('option', 'values');

		from.val(values[0]);
		to.val(values[1]);
	}

	return {
		init: init
	}
})();

SliderWidget.init();