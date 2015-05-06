angular.module('youcantest').factory('scheduleRepository', function ($http) {
    function getAll() {
        return $http.get('schedule/getAll');
    }

    return {
        getAll : getAll
    };
});
