'use strict';

var youcantestApp = angular.module('youcantest', [
      'ngRoute',
  		'ngCookies',
      'ngSanitize',
      'ui.bootstrap',
      'ui.bootstrap.tpls'
    ])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/:user', {
                templateUrl: 'assets/app/home/partials/home.html',
                controller: 'HomeCtrl as vm'
            })
            .when('/:user/tests', {
                templateUrl: 'assets/app/tests/partials/list.html',
                controller: 'TestListCtrl as vm'
            })
            .when('/:user/tests/:id/detail', {
                templateUrl: 'assets/app/tests/partials/testViewDetail.html',
                controller: 'TestViewCtrl as vm'
            })
            .when('/:user/tests/add', {
                templateUrl: 'assets/app/tests/partials/add.html',
                controller: 'TestAddCtrl as vm'
            })
            .when('/:user/results', {
                templateUrl: 'assets/app/results/partials/list.html',
                controller: 'ResultListCtrl as vm',
            })
            .when('/:user/resultDetail/:resultId', {
                templateUrl: 'assets/app/results/partials/result.html',
                controller: 'ResultDetailCtrl as vm',
            })
            .when('/:user/results/:id/history', {
                templateUrl: 'assets/app/results/partials/history.html',
                controller: 'ResultHistoryListCtrl as vm'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }]).run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            $rootScope.$broadcast('userSelected', {user: next.params.user})
        });

        $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
            ga('send', 'pageview', $location.path());
        });
    });
