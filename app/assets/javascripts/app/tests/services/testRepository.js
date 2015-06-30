

angular.module('youcantest').factory('testRepository', function ($http, $routeParams, GLOBALS) {

    function getUser() {
        return $routeParams.user;
    }

    function getAll() {
        return $http.get(GLOBALS.BASE_PATH +  getUser() + '/tests/getAll');
    }
    function getResults() {
        return $http.get(GLOBALS.BASE_PATH +  getUser() + '/tests/getResults');
    }
    function getById(id) {
        return $http.get(GLOBALS.BASE_PATH + getUser() + '/test/get/' + id);
    }
    function del(id) {
        return $http.post(GLOBALS.BASE_PATH + getUser() + '/test/delete', {id: id});
    }
    function add(object) {
        return $http.post(GLOBALS.BASE_PATH + getUser() + '/test/insert', object);
    }
    function schedule(id, period) {
        return $http.post(GLOBALS.BASE_PATH + getUser() + '/test/schedule', {id: id, period: period});
    }
    function getResults() {
        return $http.get(GLOBALS.BASE_PATH + getUser() + '/tests/getResults');
    }

    return {
        getAll : getAll,
        getResults : getResults,
        add: add,
        schedule: schedule,
        getResults: getResults,
        delete : del,
        get: getById
    };

});
