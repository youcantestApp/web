'use strict';
angular.module('youcantest').service('trackrService', function () {
	var trackEvt = function (data) {
		if(data.category !== undefined && data.action !== undefined) {
			ga('send', 'event', data.category, data.action, data.label, data.value);
		}
	};

	return {
		trackEvt: trackEvt
	};
});
