

angular.module('youcantest').factory('testRepository', function ($http) {
    function getAll() {
        return $http.get('test/getAll');
    }
    function del(id) {
        return $http.post('test/delete', {id: id});
    }
    function add(object) {
        return $http.post('test/insert', object);
    }
    function publish(id) {
        return $http.post('test/publish', {id: id});
    }

    return {
        getAll : getAll,
        add: add,
        publish: publish,
        delete : del
    };

});
