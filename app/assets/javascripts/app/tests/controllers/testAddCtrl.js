'use strict';

angular.module('youcantest').controller('TestAddCtrl', function ($location, testRepository) {
	var vm = this;

    vm.loading = true;

    vm.actions = [];

    function addAction() {
        vm.actions.push({ type: undefined, index: vm.actions.length });
    };
    vm.addAction = addAction;

    function removeAction(index) {
        vm.actions.splice(index, 1);
    };
    vm.removeAction = removeAction;

    vm.asserts = [];

    function addAssert() {
        vm.asserts.push({ type: undefined, index: vm.asserts.length });
    };
    vm.addAssert = addAssert;

    function removeAssert(index) {
        vm.asserts.splice(index, 1);
    };
    vm.removeAssert = removeAssert;

    function save() {
        var valid = true;
        vm.actions.forEach(function (element) {
           if(element.error === true)  {
               valid = false;
               return false;
           }
        });

        if(valid === true) {
            vm.asserts.forEach(function (element) {
                if(element.error === true)  {
                    valid = false;
                    return false;
                }
            });
        }


        if(!valid) {
            alert('invalid data');
            return;
        }

        var object = {
            context: {url: vm.test.context },
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

        testRepository.add({data: object}).then(function () {
            alert('test added');

            $location.path('/tests');
        }, function() {
            alert('error!');
        });
    };
    vm.save = save;

    (function () {
        vm.loading = false;
    })();
});