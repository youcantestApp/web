angular.module('youcantest').factory('resultRepository', function ($http, $routeParams, GLOBALS) {

    function getUser() {
        return $routeParams.user;
    }

    function getResultList(testId) {
        return $http.get(GLOBALS.BASE_PATH + getUser() + '/result/getListByTestId', {params: {id : testId}});
    }

    return {
        getResultList: getResultList
    }
});
