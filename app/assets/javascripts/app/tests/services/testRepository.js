

angular.module('youcantest').factory('testRepository', function ($http, $routeParams) {
    function getUser() {
        return $routeParams.user;
    }

    function getAll() {
        return $http.get(getUser() + '/test/getAll');
    }
    function getById(id) {
        return $http.get(getUser() + '/test/get/' + id);
    }
    function del(id) {
        return $http.post(getUser() + '/test/delete', {id: id});
    }
    function add(object) {
        return $http.post(getUser() + '/test/insert', object);
    }
    function schedule(id, period) {
        return $http.post(getUser() + '/test/schedule', {id: id, period: period});
    }

    return {
        getAll : getAll,
        add: add,
        schedule: schedule,
        delete : del,
        get: getById
    };

});
