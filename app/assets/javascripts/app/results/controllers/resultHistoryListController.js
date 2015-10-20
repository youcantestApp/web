'use strict';

angular.module('youcantest').controller('ResultHistoryListCtrl', function ($routeParams, resultRepository) {
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

    vm.data = [];
    var getHistoryList = function (id) {
        return resultRepository.getResultList(id).then(function (result) {
           _.each(result.data.results, function(element) {
             element.executionDateFormat = moment(element.executionDate).format('LLL');
           });
            vm.data = result.data;
            vm.loading = false;

            return result;
        });
    }

    var init = function () {
        getHistoryList($routeParams.id);
    }

    init();
});
