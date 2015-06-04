

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
    function publish(id) {
        return $http.post(getUser() + '/test/publish', {id: id});
    }

    return {
        getAll : getAll,
        add: add,
        publish: publish,
        delete : del,
        get: getById
    };

});
