'use strict';
angular.module('youcantest').directive('onboardingSteps', function ($rootScope, $cookies, modalService, trackrService) {
	return {
		template: '<div></div>',
		restrict: 'E',
		controllerAs: 'vm',
		scope: {
			template: '@',
			steps: '@',
			size: '@',
			name: '@'
		},
		controller: function ($scope) {
			var vm = this;

			var COOKIE_KEY = 'onboarding-' + $scope.name;

			var shouldShowModal = $cookies.get(COOKIE_KEY) !== 'true';

			if(shouldShowModal) {
				var modalResult = modalService.onboardingStepModal($scope.template, $scope.steps, $scope.size);

				modalResult.then(function () {
					trackrService.trackEvt({
						category: 'onboarding',
						action:'finish',
						page: $scope.name
					});
				})
				.finally(function() {
					$cookies.put(COOKIE_KEY, true);
				});
			}
		}
	}
});
