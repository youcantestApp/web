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
            vm.selectedType = undefined;

            vm.remove = function () {
                unbindWatchElement();
                $scope.onRemove({index: $scope.index});
            }

            $scope.$watch(angular.bind(this, function () {
                return this.selectedType;
            }), function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    vm.assert.error = true;
                    if (newVal !== undefined) {
                        bindWatchElement();
                    }
                    else {
                        unbindWatchElement();
                    }
                }
            });


            var bind = undefined;

            function bindWatchElement() {
                bind = $scope.$watch('assert', function (newVal, oldVal) {
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

                        vm.assert.error = found;
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

