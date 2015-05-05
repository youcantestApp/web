'use strict';

angular.module('youcantest').controller('TestAddCtrl', function (testRepository) {
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
        console.log(vm.test.context, vm.asserts, vm.actions);
    };
    vm.save = save;

    (function () {
        vm.loading = false;
    })();
});