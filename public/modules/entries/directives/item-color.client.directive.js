'use strict';

angular.module('entries').directive('itemColor', [
	function() {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				// Item color directive logic
				// ...

				var color = attrs.itemColor;

				element.css('border-left-width', '5px');
				element.css('border-left-color', color);

				angular.forEach(element.find('h4'), function(value, key){
					if(value.className.indexOf('list-group-item-heading') < 0) return;

					angular.element(value).css('color', color);
				});
			}
		};
	}
]);