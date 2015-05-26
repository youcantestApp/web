'use strict';

var youcantestApp = angular.module('youcantest', [
        'ipCookie',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
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
            .when('/tests/:id/detail', {
                templateUrl: 'assets/app/tests/partials/testViewDetail.html',
                controller: 'TestViewCtrl as vm'
            })
            .when('/tests/add', {
                templateUrl: 'assets/app/tests/partials/add.html',
                controller: 'TestAddCtrl as vm'
            })
            .when('/schedules', {
                templateUrl: 'assets/app/schedules/partials/list.html',
                controller: 'ScheduleListCtrl as vm'
            })
            .when('/schedules/:id/results', {
                templateUrl: 'assets/app/schedules/partials/results.html',
                controller: 'ScheduleResultsCtrl as vm'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]).run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeSuccess', function () {
           ga('send', 'pageview', $location.path());
        });
    });
