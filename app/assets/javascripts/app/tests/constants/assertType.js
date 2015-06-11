angular.module('youcantest').constant('ASSERT_TYPE',
    {
        //"OPEN_URL": {label: "open url", id: "openUrl"},
	    "ASSERT_VALUE": {label: "assert value", id: "assertValue" },
	    "CHECK_URL": {label: "check actual url", id: "checkUrl" },
	    "HAS_CLASS": { label: "has class", id: "hasClass" },
        "IS_ELEMENT_EXISTS": { label: "element exists", id: "isElementExists" },
        "IS_ELEMENT_VISIBLE": { label: "element is visible", id: "isElementVisible" }
    }
);
