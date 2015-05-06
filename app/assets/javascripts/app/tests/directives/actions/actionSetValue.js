'use strict';
angular.module('youcantest').directive('actionSetValue', function () {
    return {
        templateUrl: 'assets/app/tests/partials/actions/setValue.html',
        restrict: 'E',
        scope: {
            action: '='
        },
        controllerAs: 'vm',
        controller: function ($scope, ACTION_TYPE) {
            var vm = this;

	        $scope.action.type =  ACTION_TYPE.SET_VALUE;

	        vm.action = $scope.action;

            vm.action.value = undefined;
            vm.action.selector = undefined;
        }
    }
});


