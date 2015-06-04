'use strict';

angular.module('youcantest').controller('HeaderCtrl', function ($rootScope) {
    var vm = this;

    $rootScope.$on('userSelected', function (event, data) {
        vm.user = data.user;
    });
});
