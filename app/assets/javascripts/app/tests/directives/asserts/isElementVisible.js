'use strict';
angular.module('youcantest').directive('assertIsElementVisible', function () {
    return {
        templateUrl: 'assets/app/tests/partials/asserts/isElementVisible.html',
        restrict: 'E',
        scope: {
            assert: '='
        },
        controllerAs: 'vm',
        controller: function ($scope, ASSERT_TYPE) {
            var vm = this;

            $scope.assert.type = ASSERT_TYPE.IS_ELEMENT_VISIBLE;
	        vm.assert = $scope.assert;

            vm.assert.selector = undefined;
        }
    }
});


