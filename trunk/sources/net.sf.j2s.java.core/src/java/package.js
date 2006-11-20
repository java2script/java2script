(function () {
	ClazzLoader.registerPackages ("java", [
			"io", "lang", "lang.reflect", "util", "net", "text"]);
			
	window["reflect"] = java.lang.reflect;

	var base = ClazzLoader.getClasspathFor ("java.*");
	
	ClazzLoader.loadZJar (base + "error.z.js", "java.lang.Throwable");
	ClazzLoader.loadZJar (base + "core.z.js", ClazzLoader.runtimeKeyClass); //"java.lang.String"

	ClazzLoader.jarClasspath (base + "core.z.js", [
		"net.sf.j2s.ajax.HttpRequest",
		"$.IXHRCallback",
		"$.XHRCallbackAdapter",
		"$.XHRCallbackSWTAdapter",
		"$.ARunnable",
		"$.AClass",
		"$.ASWTClass",
       	
		"$.SimpleSerializable",
		"$.SimpleRPCRunnable",
		"$.SimpleRPCRequest",
		"$.SimpleRPCSWTRequest"
	]);

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
