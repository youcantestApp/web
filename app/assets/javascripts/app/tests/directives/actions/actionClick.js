'use strict';
angular.module('youcantest').directive('actionClick', function () {
    return {
        templateUrl: 'assets/app/tests/partials/actions/click.html',
        restrict: 'E',
        scope: {
            action: '='
        },
        controllerAs: 'vm',
        controller: function ($scope, ACTION_TYPE) {
            var vm = this;

            $scope.action.type =  ACTION_TYPE.CLICK;

            vm.action = $scope.action;
        }
    }
});


