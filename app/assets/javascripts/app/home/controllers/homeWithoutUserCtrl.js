'use strict';

angular.module('youcantest').controller('HomeWithoutUserCtrl', function ($window) {
	var vm = this;

    function onClick () {
        if(vm.user && vm.user.length > 2) {
            $window.location.href ="/" + vm.user;
        }
    };

    vm.go = onClick;
});