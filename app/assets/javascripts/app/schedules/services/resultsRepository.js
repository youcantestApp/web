angular.module('youcantest').factory('resultsRepository', function ($http) {
    function getBySchedule(id) {
        return $http.get('result/getBySchedule', {params: {id : id}});
    }

    return {
        getBySchedule: getBySchedule
    };
});
