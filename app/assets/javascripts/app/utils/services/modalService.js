'use strict';
angular.module('youcantest').factory('modalService', function ($modal) {
    var openConfirmModal = function(title, content, confirmText, cancelText) {
        var modalInstance = $modal.open({
            templateUrl: 'assets/app/utils/partials/confirmationModal.html',
            controller: ['$scope', function($scope) {
                $scope.title = title;
                $scope.content = content;
                $scope.confirmText = confirmText;
                $scope.cancelText = cancelText;
            }],
            size: 'sm'
        });

        return modalInstance.result;
    };

    var onboardingStepModal = function(templateUrl, steps, size) {
		var modalInstance = $modal.open({
			templateUrl: templateUrl,
			controller: ['$scope', function($scope, $modalInstance) {
                $scope.totalSteps = steps;
                $scope.step = 0;
                $scope.prevStep = function () {
                    $scope.step--;
                };
                $scope.nextStep = function () {
                    $scope.step++;
                };
                $scope.onClose = function() {
                    $modalInstance.close();
                };
			}],
			size: size
		});

		return modalInstance.result;
	};

    return {
        openConfirmationModal: openConfirmModal,
        onboardingStepModal: onboardingStepModal
    };
});

