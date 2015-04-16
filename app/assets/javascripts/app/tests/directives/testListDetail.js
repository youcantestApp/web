'use strict';
angular.module('youcantest').directive('testListDetail', function () {
    return {
        templateUrl: 'assets/app/tests/partials/testListDetail.html',
        restrict: 'E',
        scope: {
            element: '='
        },
        controllerAs: 'vm',
        controller: function ($scope, modalService, testRepository) {
            var vm = this;

            vm.element = $scope.element;

            vm.remove = function () {
                modalService.openConfirmationModal('delete test', 'are you sure?', 'yes', 'no').then(function () {
                    testRepository.delete(vm.element._id);
                })
            };
        }
    }
});


