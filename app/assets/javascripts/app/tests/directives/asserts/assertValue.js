'use strict';
angular.module('youcantest').directive('assertValue', function () {
    return {
        templateUrl: 'assets/app/tests/partials/asserts/assertValue.html',
        restrict: 'E',
        scope: {
            assert: '='
        },
        controllerAs: 'vm',
        controller: function ($scope, ASSERT_TYPE) {
            var vm = this;

            $scope.assert.type = ASSERT_TYPE.ASSERT_VALUE;
	        vm.assert = $scope.assert;
        }
    }
});


