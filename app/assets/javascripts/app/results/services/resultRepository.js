angular.module('youcantest').factory('testRepository', function ($http, $routeParams, GLOBALS) {

    function getUser() {
        return $routeParams.user;
    }
});
