'use strict';

angular.module('youcantest').controller('ResultDetailCtrl', function ($location, $routeParams, resultRepository) {
	var vm = this;

    vm.loading = true;

    (function () {
        vm.result = {};
        if(!$routeParams.resultId) {
            $location.url('/'+ $routeParams.user + '/results');
            return;
        }

        vm.result.testId = $routeParams.resultId;

        resultRepository.getById($routeParams.resultId).then(function (response) {
           vm.result = response.data;
        }).finally(function () {
            vm.loading = false;
        });
    })();
});