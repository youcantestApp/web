'use strict';

angular.module('youcantest').controller('ScheduleListCtrl', function (scheduleRepository) {
	var vm = this;

    vm.loading = true;

    vm.deleteItem = function(idx) {
        vm.tests.splice(idx, 1);
    };

    (function () {
        scheduleRepository.getAll().then(function (response) {
           vm.tests = response.data;
        }).finally(function () {
            vm.loading = false;
        });
    })();
});