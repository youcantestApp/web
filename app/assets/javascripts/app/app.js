'use strict';

var youcantestApp = angular.module('youcantest', [
        //'ngAnimate',
        'ipCookie',
        //'ngMessages',
        //``'ngResource',
        'ngRoute',
        'ngSanitize',
        //'ngTouch',
        //'ui.utils.masks',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        //'uiGmapgoogle-maps'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'assets/app/home/partials/home.html',
                controller: 'HomeCtrl as vm'
            })
            .when('/tests', {
                templateUrl: 'assets/app/tests/partials/list.html',
                controller: 'TestListCtrl as vm'
            })
            .when('/tests/add', {
                templateUrl: 'assets/app/tests/partials/add.html',
                controller: 'TestAddCtrl as vm'
            })
            //.when('/repair', {
            //    templateUrl: 'views/repair.html',
            //    controller: 'RepairCtrl'
            //})
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]);
