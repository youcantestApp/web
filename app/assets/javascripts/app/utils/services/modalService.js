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
            size: 'sm',
        });

        return modalInstance.result;
    }


    return {
        openConfirmationModal: openConfirmModal
    };
});

