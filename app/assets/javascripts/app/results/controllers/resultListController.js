'use strict';

angular.module('youcantest').controller('ResultListCtrl', function (testRepository) {
    var vm = this;

    vm.loading = true;

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

    vm.elements = [];
    var getResults = function () {
       return testRepository.getResults().then(function (result) {
           vm.tests = result.data;
           vm.loading = false;

           return result;
       });
    }

    var init = function () {
        getResults();
    }

    init();
});
