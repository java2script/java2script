(function () {
	var subPkgs = [
			"lang.ref", 
			"lang.ref.reflect", 
	    	"lang.reflect", 
			"io",
	    	"util"
	];
	for (var i = 0; i < subPkgs.length; i++) {
		Clazz.declarePackage ("java." + subPkgs[i]);
	}

	ClazzLoader.ignore (
		"java.io.FileInputStream",
//		"$.IOException",
		"$.ObjectInputStream",
		"$.ObjectOutputStream",
		"$.PrintWriter",
		"java.lang.ArrayIndexOutOfBoundsException",
		"$.Character",
		"$.ClassCastException",
		"$.ClassNotFoundException",
		"$.CloneNotSupportedException",
		"$.IllegalArgumentException",
		"$.IllegalStateException",
//		"$.IndexOutOfBoundsException",
		"$.InternalError",
		"$.InterruptedException",
//		"$.NullPointerException",
//		"$.StringIndexOutOfBoundsException",
		"$.UnsupportedOperationException",
		"java.lang.ref.SoftReference",
		"java.lang.reflect.Array",
		"java.text.DateFormat",
		"$.SimpleDateFormat",
		"java.util.Calendar",
		"$.Collections",
		"$.ConcurrentModificationException",
		"$.GregorianCalendar",
//		"$.Locale",
		"$.NoSuchElementException",
		"$.TimeZone"
	);

	var path = ClazzLoader.getClasspathFor ("java.package");
	path = path.substring (0, path.lastIndexOf ("package.js"));
	
	ClazzLoader.jarClasspath (path + "util/AbstractList.js", [
		"java.util.AbstractList",
		"$.RandomAccessSubList",
		"$.SubList"
	]);
	
	ClazzLoader.jarClasspath (path + "core.z.js", [
		"java.io.Serializable",
		"java.lang.CharSequence",
		"$.Cloneable",
		"$.Comparable",
		"$.Runnable",
		"java.util.Comparator",
		
       	"java.lang.Number",
       	"$.Integer",
       	"$.Long",
       	"$.Float",
       	"$.Double",
       	
       	"java.util.Date",
       	
       	"$.EventObject",
       	"$.EventListener",
       	"$.EventListenerProxy",
       	
       	"$.Iterator",
       	"$.ListIterator",
       	"$.Enumeration",
       	"$.Collection",
       	"$.Set",
       	"$.Map",
       	"$.List",
       	"$.RandomAccess",
       	
       	"net.sf.j2s.ajax.HttpRequest",
       	"$.IXHRCallback",
       	"$.XHRCallbackAdapter",
       	"$.XHRCallbackSWTAdapter"
	]);

	ClazzLoader.loadClass ("java.lang.Encoding");
	ClazzLoader.loadClass ("java.lang.String", function () {
		var qbs = ClazzLoader.queueBeforeString;
		for (var i = 0; i < qbs.length; i++) {
			ClazzLoader.loadClass (qbs[i][0], qbs[i][1]);
		}
	});
	ClazzLoader.loadClass ("java.lang.Number");
	ClazzLoader.loadClass ("java.lang.Integer");
}) ();

/* private */
window["java.registered"] = true;
