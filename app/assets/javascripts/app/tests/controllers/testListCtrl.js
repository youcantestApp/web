'use strict';

angular.module('youcantest').controller('TestListCtrl', function (testRepository) {
	var vm = this;

    var tests = undefined;

    (function () {
        testRepository.getAll().then(function (response) {
           tests =  response.data;
        });
    })();
});