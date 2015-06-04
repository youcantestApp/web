'use strict';

angular.module('youcantest').controller('HomeCtrl', function ($routeParams) {
	var vm = this;

    vm.user = $routeParams.user;

});