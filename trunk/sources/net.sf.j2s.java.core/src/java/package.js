(function () {
	ClazzLoader.registerPackages ("java", [
			"io", "lang", "lang.reflect", "util", "net"]);
			
	window["reflect"] = java.lang.reflect;

	var base = ClazzLoader.getClasspathFor ("java.*");
	
	ClazzLoader.loadZJar (base + "error.z.js", "java.lang.Throwable");
	ClazzLoader.loadZJar (base + "core.z.js", ClazzLoader.runtimeKeyClass); //"java.lang.String"

	ClazzLoader.jarClasspath (base + "util/AbstractList.js", [
		"java.util.AbstractList",
		"$.RandomAccessSubList",
		"$.SubList"
	]);

	ClazzLoader.jarClasspath (base + "lang/reflect.z.js", [
        "java.lang.Void",
		"$.reflect.AccessibleObject",
		"$.InvocationHandler",
		"$.Member",
        "$.Modifier",
		"$.Constructor",
        "$.Field",
        "$.Method"
	]);
}) ();

/* private */
window["java.registered"] = true;
