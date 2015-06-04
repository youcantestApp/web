angular.module('youcantest').factory('scheduleRepository', function ($http, $routeParams) {
    function getUser() {
        return $routeParams.user;
    }

    function getAll() {
        return $http.get(getUser() + '/schedule/getAll');
    }

    return {
        getAll : getAll
    };
});
