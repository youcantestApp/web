

angular.module('youcantest').factory('testRepository', function ($http) {
    function getAll() {
        return $http.get('test/getAll');
    }

    return {
        getAll : getAll
    };

});
