'use strict';
angular.module('youcantest').directive('actionSelector', function (trackrService) {
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
            vm.selectedType = undefined;
            vm.error = false;
            vm.index = $scope.index;

            vm.remove = function () {
                unbindWatchElement();
                $scope.onRemove({index: $scope.index});
            }

            $scope.$watch(angular.bind(this, function () {
                return this.selectedType;
            }), function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    vm.action.error = true;
                    if (newVal !== undefined) {
                        bindWatchElement();

                  			trackrService.trackEvt({
                  				category: 'action',
                  				action: 'select_type',
                          label: newVal.id
                        });
                    }
                    else {
                        unbindWatchElement();

                  			trackrService.trackEvt({
                  				category: 'action',
                  				action: 'unselect_type'
                        });
                    }
                }
            });


            var bind = undefined;

            function bindWatchElement() {
                bind = $scope.$watch('action', function (newVal, oldVal, currScope) {
                    if (newVal === oldVal) return;

                    if (newVal !== undefined) {
                        var found = false;
                        for (var attr in newVal) {
                            if (newVal.hasOwnProperty(attr)) {
                                if (newVal[attr] === "" || newVal[attr] === undefined) {
                                    found = true;
                                }
                            }
                        }

                        vm.action.error = found;
                    }
                }, true);
            }

            function unbindWatchElement() {
                if (bind !== undefined) {
                    bind();
                }
            }
        }
    }
});
