(function () {
	ClazzLoader.registerPackages ("java", [
			"io", "lang", "lang.reflect", "util"]);

	var base = ClazzLoader.getClasspathFor ("java.*");
	
	ClazzLoader.loadZJar (base + "error.z.js", "java.lang.Throwable");
	ClazzLoader.loadZJar (base + "core.z.js", ClazzLoader.runtimeKeyClass); //"java.lang.String"

	ClazzLoader.jarClasspath (base + "util/AbstractList.js", [
		"java.util.AbstractList",
		"$.RandomAccessSubList",
		"$.SubList"
	]);
	
	ClazzLoader.ignore (
		"java.io.FileInputStream",
		"$.ObjectInputStream",
		"$.ObjectOutputStream",
		"$.PrintWriter",
		"$.BufferedReader",
		"$.BufferedWriter",
		"$.ByteArrayOutputStream",
		"$.File",
		"$.FileOutputStream",
		"$.StringReader",
		"$.StringWriter",
		"$.InputStreamReader",
		"$.OuputStreamWriter",
		"java.lang.Character",
		"java.lang.ref.SoftReference",
		"java.lang.reflect.Array",
		"java.text.DateFormat",
		"$.SimpleDateFormat",
		"$.NumberFormat",
		"java.util.Calendar",
		"$.Collections",
		"$.GregorianCalendar",
		"$.TimeZone",
		"$.StringTokenizer",
		"$.zip.ZipFile"
	);
}) ();

/* private */
window["java.registered"] = true;
