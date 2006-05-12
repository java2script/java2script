var totalTime = 0;
window.sumTime = function (t1, t2) {
	if (arguments.length == 1) {
		totalTime += t1;
	} else if (arguments.length == 2) {
		totalTime += t2.getTime () - t1.getTime ();
	}
};

var startTime = new Date ();
window.startLog = function () {
	startTime = new Date ();
};

startLog ();
window.endLog = function () {
	var endTime = new Date ();
	log (startTime);
	log (endTime);
	log ("Cost ms: " + (endTime.getTime () - startTime.getTime ()));
	log ("Sum time (in ms): " + totalTime);
};

