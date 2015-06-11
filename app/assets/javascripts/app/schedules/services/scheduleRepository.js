angular.module('youcantest').factory('scheduleRepository', function ($http, $routeParams) {
    function getUser() {
        return $routeParams.user;
    }

    function getArchiveds() {
        return $http.get(getUser() + '/schedule/getArchiveds');
    }

    function getActives() {
        return $http.get(getUser() + '/schedule/getActives');
    }

    function archive(id) {
        return $http.post(getUser() + '/schedule/archive', {id : id});
    }

    function activeItem(id) {
        return $http.post(getUser() + '/schedule/active', {id : id});
    }

    function deleteItem(id) {
        return $http.post(getUser() + '/schedule/delete', {id : id});
    }

    return {
        archive: archive,
        activeItem: activeItem,
        deleteItem: deleteItem,
        getActives: getActives,
        getArchiveds: getArchiveds
    };
});
