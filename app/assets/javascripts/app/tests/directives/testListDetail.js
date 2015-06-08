'use strict';
angular.module('youcantest').directive('testListDetail', function ($modal) {
    return {
        templateUrl: 'assets/app/tests/partials/testListDetail.html',
        restrict: 'E',
        scope: {
            element: '=',
            index: '=',
            onDelete: '&'
        },
        controllerAs: 'vm',
        controller: function ($scope, modalService, testRepository) {
            var vm = this;

            vm.element = $scope.element;

            vm.remove = function () {
                modalService.openConfirmationModal('delete test', 'are you sure?', 'yes', 'no').then(function () {
                    testRepository.delete(vm.element._id.$oid).then(function () {
                       $scope.onDelete({idx: $scope.index});
                    });
                })
            };


            vm.scheduleTest = function () {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'assets/app/tests/partials/scheduleTestModal.html',
                    controller: 'ScheduleTestModalCtrl',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve : {
                        selectedTest: function () {
                            return vm.element;
                        }
                    }
                });

                modalInstance.result.then(function (selectedPeriod) {
                    testRepository.schedule(vm.element._id.$oid, selectedPeriod).then(function () {
                        alert('scheduled');
                    });

                });
            }
        }
    }
});


