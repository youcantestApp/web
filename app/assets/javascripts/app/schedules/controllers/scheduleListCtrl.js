'use strict';

angular.module('youcantest').controller('ScheduleListCtrl', function (scheduleRepository, tab) {
	var vm = this;

    vm.loading = true;

    vm.changeTab = function(tab) {
        vm.activeTab = tab;

        vm.tests = undefined;
        if(tab === 'active')
           getActives();
        else
            getArchiveds();
    }

    vm.getPeriodText = function(period) {
        if(period === 0 ) {
            return 'Execute Once';
        }
        var base = 'Every ';

        switch(period) {
            case 10:
                return 'Every 10 minutes';
            case 60:
                return 'Every 60 minutes';
            case 720:
                return 'Every 12 hours';
            case 1440:
                return 'Every day';
            case 10080:
                return 'Every sunday';
        }
    }

    vm.archiveItem = function(id) {
        scheduleRepository.archive(id).then(function (response) {
            alert('item archived');
        }, function(err) {
            alert('error');
        });
    };

    vm.activeItem = function(id) {
        scheduleRepository.activeItem(id).then(function (response) {
            alert('item activated again');
        }, function(err) {
            alert('error');
        });
    };

    vm.deleteItem = function(id) {
        scheduleRepository.deleteItem(id).then(function (response) {
            alert('item deleted');
        }, function(err) {
            alert('error');
        });
    };

    function getActives() {
        scheduleRepository.getActives().then(function (response) {
            vm.tests = response.data;
        }).finally(function () {
            vm.loading = false;
        });
    }

    function getArchiveds() {
        scheduleRepository.getArchiveds().then(function (response) {
            vm.tests = response.data;
        }).finally(function () {
            vm.loading = false;
        });
    }

    (function () {
        vm.changeTab(tab);
    })();
});