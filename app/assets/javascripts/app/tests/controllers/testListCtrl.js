'use strict';

angular.module('youcantest').controller('TestListCtrl', function (testRepository) {
	var vm = this;

    vm.loading = true;

    (function () {
        testRepository.getAll().then(function (response) {
           vm.tests =  response.data;
        }).finally(function () {
            vm.loading = false;
        });
    })();
});