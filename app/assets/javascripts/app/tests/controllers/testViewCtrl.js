'use strict';

angular.module('youcantest').controller('TestViewCtrl', function ($location, $routeParams, testRepository) {
    var vm = this;

    vm.loading = true;

    (function () {
        vm.test = {};
        if(!$routeParams.id) {
            $location.url('/tests');
            return;
        }

        vm.test.id = $routeParams.id;

        testRepository.get(vm.test.id).then(function (response) {
            vm.test = response.data;
        }).finally(function () {
            vm.loading = false;
        });
    })();
});
