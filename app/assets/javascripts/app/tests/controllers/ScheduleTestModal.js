'use strict';

angular.module('youcantest').controller('ScheduleTestModalCtrl', function ($scope, $modalInstance, selectedTest) {
    var vm = this;

    vm.test = selectedTest;

    vm.types = [
        {value: '0', text: 'Once (Now)'},
        {value: '10', text: 'Every 10 minutes'},
        {value: '60', text: 'Every 60 minutes'},
        {value: '720', text: 'Every 12 hours'},
        {value: '1440', text: 'Every day'},
        {value: '10080', text: 'Every sunday'}
    ];

    vm.scheduleTest = function () {
        if(vm.scheduleOn !== undefined) {
            $modalInstance.close(vm.scheduleOn);
        }
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
