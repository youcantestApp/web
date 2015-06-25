angular.module('youcantest').factory('resultsRepository', function ($http, $routeParams, GLOBALS) {
    function getUser() {
        return $routeParams.user;
    }

    function getBySchedule(id) {
        return $http.get(GLOBALS.BASE_PATH + getUser() + '/result/getBySchedule', {params: {id : id}});
    }

    return {
        getBySchedule: getBySchedule
    };
});
