'use strict';

angular.module('youcantest').controller('ScheduleResultsCtrl', function ($location, $routeParams, resultsRepository) {
	var vm = this;

    vm.loading = true;

    vm.deleteItem = function(idx) {
        vm.tests.splice(idx, 1);
    };

    (function () {
        vm.result = {};
        if(!$routeParams.id) {
            $location.url('/schedules');
            return;
        }

        vm.result.scheduleId = $routeParams.id;

        resultsRepository.getBySchedule($routeParams.id).then(function (response) {
           vm.result = response.data;
        }).finally(function () {
            vm.loading = false;
        });
    })();
});