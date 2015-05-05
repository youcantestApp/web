'use strict';
angular.module('youcantest').directive('assertCheckUrl', function () {
    return {
        templateUrl: 'assets/app/tests/partials/asserts/checkUrl.html',
        restrict: 'E',
        scope: {
            assert: '='
        },
        controllerAs: 'vm',
        controller: function ($scope, ASSERT_TYPE) {
            var vm = this;

            $scope.assert.type = ASSERT_TYPE.CHECK_URL;
	        vm.assert = $scope.assert;
        }
    }
});


