'use strict';
angular.module('youcantest').directive('actionSelector', function () {
    return {
        templateUrl: 'assets/app/tests/partials/actions/testAction.html',
        restrict: 'E',
        scope: {
            action: '=',
            index: '=',
            onRemove: '&'
        },
        controllerAs: 'vm',
        controller: function ($scope, ACTION_TYPE) {
            var vm = this;

            vm.action = $scope.action;
	        vm.types = ACTION_TYPE;
            vm.selectedAction = undefined;

            vm.remove = function() {
                $scope.onRemove({ index: $scope.index });
            }
        }
    }
});


