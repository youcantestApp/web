

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

    return {
        getAll : getAll,
        add: add,
        delete : del
    };

});
