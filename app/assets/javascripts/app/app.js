'use strict';

var youcantestApp = angular.module('youcantest', [
        //'ngAnimate',
        'ipCookie',
        //'ngMessages',
        //``'ngResource',
        'ngRoute',
        'ngSanitize'
        //'ngTouch',
        //'ui.utils.masks',
        //'uiGmapgoogle-maps'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'assets/app/home/partials/home.html',
                controller: 'HomeCtrl'
            })
            .when('/tests', {
                templateUrl: 'assets/app/tests/partials/list.html',
                controller: 'TestListCtrl'
            })
            //.when('/repair', {
            //    templateUrl: 'views/repair.html',
            //    controller: 'RepairCtrl'
            //})
            .otherwise({
                redirectTo: '/'
            });

        //$locationProvider.html5Mode(true);
    }]);
