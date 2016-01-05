angular.module('starter.directives', [])

.directive('animateOnChange', function($animate, $timeout) {
  return function(scope, elem, attr) {
    scope.$watch(attr.animateOnChange, function(newVal, oldVal) {
      if (newVal != oldVal) {
        var className = 'change';
        $animate.addClass(elem, className).then(function() {
          $timeout(function() {
            $animate.removeClass(elem, className);
          });
        });
      }
    });
  };
});
