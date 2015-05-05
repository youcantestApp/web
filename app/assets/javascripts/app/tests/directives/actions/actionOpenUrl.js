'use strict';
angular.module('youcantest').directive('actionOpenUrl', function () {
    return {
        templateUrl: 'assets/app/tests/partials/actions/openUrl.html',
        restrict: 'E',
        scope: {
            action: '='
        },
        controllerAs: 'vm',
        controller: function ($scope) {
            var vm = this;
        }
    }
});


