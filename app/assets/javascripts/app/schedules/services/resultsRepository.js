angular.module('youcantest').factory('resultsRepository', function ($http, $routeParams) {
    function getUser() {
        return $routeParams.user;
    }

    function getBySchedule(id) {
        return $http.get(getUser() + '/result/getBySchedule', {params: {id : id}});
    }

    return {
        getBySchedule: getBySchedule
    };
});
