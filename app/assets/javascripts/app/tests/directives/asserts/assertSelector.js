'use strict';
angular.module('youcantest').directive('assertSelector', function () {
    return {
        templateUrl: 'assets/app/tests/partials/asserts/testAssert.html',
        restrict: 'E',
        scope: {
            assert: '=',
            index: '=',
            onRemove: '&'
        },
        controllerAs: 'vm',
        controller: function ($scope, ASSERT_TYPE) {
            var vm = this;

            vm.types = ASSERT_TYPE;
            vm.assert = $scope.assert;
            vm.selectedAssert = undefined;

            vm.remove = function() {
                $scope.onRemove({ index: $scope.index });
            }
        }
    }
});

