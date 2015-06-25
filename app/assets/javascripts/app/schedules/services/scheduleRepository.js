angular.module('youcantest').factory('scheduleRepository', function ($http, $routeParams, GLOBALS) {
    function getUser() {
        return $routeParams.user;
    }

    function getArchiveds() {
        return $http.get(GLOBALS.BASE_PATH + getUser() + '/schedule/getArchiveds');
    }

    function getActives() {
        return $http.get(GLOBALS.BASE_PATH + getUser() + '/schedule/getActives');
    }

    function archive(id) {
        return $http.post(GLOBALS.BASE_PATH + getUser() + '/schedule/archive', {id : id});
    }

    function activeItem(id) {
        return $http.post(GLOBALS.BASE_PATH + getUser() + '/schedule/active', {id : id});
    }

    function deleteItem(id) {
        return $http.post(GLOBALS.BASE_PATH + getUser() + '/schedule/delete', {id : id});
    }

    return {
        archive: archive,
        activeItem: activeItem,
        deleteItem: deleteItem,
        getActives: getActives,
        getArchiveds: getArchiveds
    };
});
