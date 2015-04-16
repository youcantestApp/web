

angular.module('youcantest').factory('testRepository', function ($http) {
    function getAll() {
        return $http.get('test/getAll');
    }
    function del(id) {
        return $http.post('test/delete', {id: id});
    }

    return {
        getAll : getAll,
        delete : del
    };

});
