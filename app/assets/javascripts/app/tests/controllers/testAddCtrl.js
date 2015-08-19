'use strict';

angular.module('youcantest').controller('TestAddCtrl', function ($location, $routeParams, testRepository, trackrService) {
	var vm = this;

    vm.loading = true;

    vm.test = {
        name: undefined,
        context: undefined,
        description: undefined
    };

    vm.actions = [];

    function addAction() {
      vm.actions.push({ type: undefined, index: vm.actions.length });

			trackrService.trackEvt({
				category: 'action',
				action:'add',
			});
    };
    vm.addAction = addAction;

    function removeAction(index) {
      vm.actions.splice(index, 1);

			trackrService.trackEvt({
				category: 'action',
				action:'remove',
			});
    };
    vm.removeAction = removeAction;

    vm.asserts = [];

    function addAssert() {
      vm.asserts.push({ type: undefined, index: vm.asserts.length });

			trackrService.trackEvt({
				category: 'assert',
				action:'add',
			});
    };
    vm.addAssert = addAssert;

    function removeAssert(index) {
      vm.asserts.splice(index, 1);

			trackrService.trackEvt({
				category: 'assert',
				action:'remove',
			});
    };
    vm.removeAssert = removeAssert;

    function checkValid() {
        var valid = true;

        if(!vm.test.name || !vm.test.name.length)  {
            valid = false;
            angular.element('div.name-input').addClass('has-error');
        }
        else {
            angular.element('div.name-input').removeClass('has-error');
        }

        var regexpContext = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if(!vm.test.context || !vm.test.context.length || !regexpContext.test(vm.test.context))  {
            valid = false;
            angular.element('div.context-input').addClass('has-error');
        }
        else {
            angular.element('div.context-input').removeClass('has-error');
        }

        //if(!vm.test.description || !vm.test.description.length)  {
        //    valid = false;
        //    angular.element('div.description-input').addClass('has-error');
        //}
        //else {
        //    angular.element('div.description-input').removeClass('has-error');
        //}

        //if(!vm.actions.length) {
        //    valid = false;
        //}

        if(!vm.asserts.length) {
            valid = false;
        }

        vm.actions.forEach(function (element) {
            if(element.error === true)  {
                valid = false;
            }
        });

        if(valid === true) {
            vm.asserts.forEach(function (element) {
                if(element.error === true)  {
                    valid = false;
                }
            });
        }

        return valid;
    }

    function save() {

        if(!checkValid()) {
            alert('invalid data');
            return;
        }

        var object = {
            name: vm.test.name,
            description: vm.test.description,
            context: { url: vm.test.context },
            actions: undefined,
            asserts: undefined
        }

        object.actions = _.map(vm.actions, function (element) {
            element.type = element.type.id;
            delete element.index;
            delete element.error;

            return element;
        });

        object.asserts = _.map(vm.asserts, function (element) {
            element.type = element.type.id;
            delete element.index;
            delete element.error;

            return element;
        });

        testRepository.add({data: object})
				.then(function () {
					trackrService.trackEvt({
						category: 'test',
						action:'add',
						label:'actions:'+ vm.actions.length +' | asserts:' + vm.asserts.length
					});
				})
				.then(function () {
            alert('test added');

            $location.path('/'+ $routeParams.user +'/tests');
        }, function() {
            alert('error!');
        });
    };
    vm.save = save;

		function cancel() {
      $location.path('/'+ $routeParams.user +'/tests');
		}
		vm.cancel = cancel;

    (function () {
        vm.loading = false;
    })();
});
