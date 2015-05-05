'use strict';
angular.module('youcantest').directive('assertHasClass', function () {
    return {
        templateUrl: 'assets/app/tests/partials/asserts/hasClass.html',
        restrict: 'E',
        scope: {
            assert: '='
        },
        controllerAs: 'vm',
        controller: function ($scope, ASSERT_TYPE) {
            var vm = this;

            $scope.assert.type = ASSERT_TYPE.HAS_CLASS;
	        vm.assert = $scope.assert;
        }
    }
});


