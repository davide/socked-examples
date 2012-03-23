ConsoleLogger = {
	log: function () {
		var l = arguments.length;
		var arr = [];
		for (var i = 0; i < l; i += 1) {
			arr[i] = arguments[i];
		}
		if (typeof (window.console) !== 'undefined') {
			window.console.log(arr);
		}
	}
};

DocLogger = {
	log: function () {
		var l = arguments.length;
		var arr = [];
		for (var i = 0; i < l; i += 1) {
			arr[i] = arguments[i];
		}
		document.write(arr);
		document.write('<br/>');
	}
};