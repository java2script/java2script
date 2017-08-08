/* private */
window["java.registered"] = false;

window["java.package.callback"] = function () {
	window["java.package.callback"] = null;
	ClazzLoader.registerPackages ("java", [
			"io", "lang", "lang.annotation", "lang.reflect",
			"util", "util.concurrent", "util.concurrent.atomic", "util.concurrent.locks",
			"util.jar", "util.logging", "util.prefs", "util.regex", "util.zip",
			"net", "text"]);
			
	window["reflect"] = java.lang.reflect;

	var base = ClazzLoader.getClasspathFor ("java.*");

	var coreZ = null;
	if (window["j2s.rt.z.enabled"]) {
		ClazzLoader.jarClasspath (base + "rt.z.js", [
			"java.lang.Void",
			"$.reflect.AccessibleObject",
			"$.AnnotatedElement",
			"$.GenericDeclaration",
			"$.InvocationHandler",
			"$.Member",
			"$.Modifier",
			"$.Constructor",
			"$.Field",
			"$.Method",
			"$.Array",
			"$.InvocationTargetException",
			"$.UndeclaredThrowableException",
				
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
			"$.Queue",
			"$.RandomAccess",
			"$.ConcurrentModificationException",
			"$.EmptyStackException",
			"$.MissingResourceException",
			"$.NoSuchElementException",
			"$.TooManyListenersException",

			"java.io.IOException",
			"$.CharConversionException",
			"$.EOFException",
			"$.FileNotFoundException",
			"$.InterruptedIOException",
			"$.ObjectStreamException",
			"$.InvalidClassException",
			"$.InvalidObjectException",
			"$.NotActiveException",
			"$.NotSerializableException",
			"$.OptionalDataException",
			"$.StreamCorruptedException",
			"$.SyncFailedException",
			"$.UnsupportedEncodingException",
			"$.UTFDataFormatException",
			"$.WriteAbortedException",
			
			"java.net.URLEncoder",
			"$.URLDecoder",
		]);
		ClazzLoader.jarClasspath (base + "simple.z.js", [
			"net.sf.j2s.ajax.HttpRequest",
			"$.ARunnable",
			"$.AClass",
			"$.ASWTClass",
	
			"net.sf.j2s.ajax.IXHRCallback",
			"$.XHRCallbackAdapter",
			"$.XHRCallbackSWTAdapter",
		   	
			"$.SimpleSerializable",
			"$.ISimpleCometable",
			"$.ISimpleConstant",
			"$.ISimpleEnum",
			"$.SimpleFilter",
			"$.SimpleRPCRunnable",
			"$.ISimpleRequestInfoBinding",
			"$.ISimpleRequestInfo",
			"$.ISimpleGeoLocationBinding",
			"$.ISimpleGeoLocation",
			"$.SimpleRPCRequest",
			"$.SimpleRPCSWTRequest",
		   	
			"$.SimplePipeSequence",
			"$.SimplePipeRunnable",
			"$.ISimpleCacheable",
			"$.ISimplePipePriority",
			"$.SimplePipeHelper",
			"$.SimplePipeRequest",
			"$.SimplePipeSWTRequest",
		   	
			"$.CompoundSerializable",
			"$.CompoundPipeSession",
			"$.CompoundPipeRunnable",
			"$.CompoundPipeRequest",
			"$.CompoundPipeSWTRequest",
			
	  		"net.sf.j2s.store.IStore",
	  		"$.CookieStore",
	  		"$.XSSCookieStore",
	  		"$.HTML5LocalStorage",
	  		"$.SimpleStore"
		]);
		ClazzLoader.jarClasspath (base + "simple.store.z.js", [
	  		"net.sf.j2s.store.IStore",
	  		"$.CookieStore",
	  		"$.XSSCookieStore",
	  		"$.HTML5LocalStorage",
	  		"$.SimpleStore"
		]);
		ClazzLoader.jarClasspath (base + "simple.rpc.z.js", [
			"net.sf.j2s.ajax.HttpRequest",
			"$.ARunnable",
			"$.AClass",
	
			"net.sf.j2s.ajax.IXHRCallback",
			"$.XHRCallbackAdapter",
		   	
			"$.SimpleSerializable",
			"$.ISimpleCometable",
			"$.ISimpleConstant",
			"$.ISimpleEnum",
			"$.SimpleFilter",
			"$.SimpleRPCRunnable",
			"$.ISimpleRequestInfoBinding",
			"$.ISimpleRequestInfo",
			"$.ISimpleGeoLocationBinding",
			"$.ISimpleGeoLocation",
			"$.SimpleRPCRequest",
		]);
		ClazzLoader.jarClasspath (base + "simple.pipe.z.js", [
			"net.sf.j2s.ajax.SimplePipeSequence",
			"$.SimplePipeRunnable",
			"$.ISimpleCacheable",
			"$.ISimplePipePriority",
			"$.SimplePipeHelper",
			"$.SimplePipeRequest",
			"$.SimplePipeSWTRequest",
		   	
			"$.CompoundSerializable",
			"$.CompoundPipeSession",
			"$.CompoundPipeRunnable",
			"$.CompoundPipeRequest",
			"$.CompoundPipeSWTRequest",
		]);
		ClazzLoader.jarClasspath (base + "simple.swt.z.js", [
			"net.sf.j2s.ajax.ASWTClass",
			"$.XHRCallbackSWTAdapter",
			"$.SimpleRPCSWTRequest",
			"$.CompoundPipeSWTRequest",
		]);
		coreZ = base + "rt.z.js";
	}
	if (coreZ != null && window["j2s.core.z.packing"] != null) {
		try {
			coreZ = window["j2s.core.z.packing"] (base);
		} catch (e) {
		}
	}
	
	if (coreZ == null || coreZ.length == 0) {
		coreZ = base + "core.z.js";
		ClazzLoader.jarClasspath (coreZ, [
			"java.lang.Void",
			"$.reflect.AccessibleObject",
			"$.AnnotatedElement",
			"$.GenericDeclaration",
			"$.InvocationHandler",
			"$.Member",
			"$.Modifier",
			"$.Constructor",
			"$.Field",
			"$.Method",
			"$.Array",
			"$.InvocationTargetException",
			"$.UndeclaredThrowableException",
				
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
			"$.Queue",
			"$.RandomAccess",
			"$.ConcurrentModificationException",
			"$.EmptyStackException",
			"$.MissingResourceException",
			"$.NoSuchElementException",
			"$.TooManyListenersException",

			"java.io.IOException",
			"$.CharConversionException",
			"$.EOFException",
			"$.FileNotFoundException",
			"$.InterruptedIOException",
			"$.ObjectStreamException",
			"$.InvalidClassException",
			"$.InvalidObjectException",
			"$.NotActiveException",
			"$.NotSerializableException",
			"$.OptionalDataException",
			"$.StreamCorruptedException",
			"$.SyncFailedException",
			"$.UnsupportedEncodingException",
			"$.UTFDataFormatException",
			"$.WriteAbortedException",
			
			"java.net.URLEncoder",
			"$.URLDecoder",
	
			"net.sf.j2s.ajax.HttpRequest",
			"$.ARunnable",
			"$.AClass",
			"$.ASWTClass",
	
			"net.sf.j2s.ajax.IXHRCallback",
			"$.XHRCallbackAdapter",
			"$.XHRCallbackSWTAdapter",
		   	
			"$.SimpleSerializable",
			"$.ISimpleCometable",
			"$.ISimpleConstant",
			"$.ISimpleEnum",
			"$.SimpleFilter",
			"$.SimpleRPCRunnable",
			"$.ISimpleRequestInfoBinding",
			"$.ISimpleRequestInfo",
			"$.ISimpleGeoLocationBinding",
			"$.ISimpleGeoLocation",
			"$.SimpleRPCRequest",
			"$.SimpleRPCSWTRequest",
		   	
			"$.SimplePipeSequence",
			"$.SimplePipeRunnable",
			"$.ISimpleCacheable",
			"$.ISimplePipePriority",
			"$.SimplePipeHelper",
			"$.SimplePipeRequest",
			"$.SimplePipeSWTRequest",
		   	
			"$.CompoundSerializable",
			"$.CompoundPipeSession",
			"$.CompoundPipeRunnable",
			"$.CompoundPipeRequest",
			"$.CompoundPipeSWTRequest",
			
	  		"net.sf.j2s.store.IStore",
	  		"$.CookieStore",
	  		"$.XSSCookieStore",
	  		"$.HTML5LocalStorage",
	  		"$.SimpleStore"
		]);
	}

	ClazzLoader.jarClasspath (base + "util/AbstractList.js", [
		"java.util.AbstractList",
		"java.util.AbstractList.FullListIterator",
		"java.util.AbstractList.SimpleListIterator",
		"java.util.AbstractList.SubAbstractList",
		"java.util.AbstractList.SubAbstractListRandomAccess"
	]);

	ClazzLoader.jarClasspath (base + "util/MapEntry.js", [
		"java.util.MapEntry",
		"java.util.MapEntry.Type"
	]);

	ClazzLoader.jarClasspath (base + "util/Collections.js", [
		"java.util.Collections",
		"java.util.Collections.CheckedCollection",
		"java.util.Collections.CheckedList",
		"java.util.Collections.CheckedListIterator",
		"java.util.Collections.CheckedMap",
		"java.util.Collections.CheckedMap.CheckedEntry",
		"java.util.Collections.CheckedMap.CheckedEntrySet",
		"java.util.Collections.CheckedMap.CheckedEntrySet.CheckedEntryIterator",
		"java.util.Collections.CheckedRandomAccessList",
		"java.util.Collections.CheckedSet",
		"java.util.Collections.CheckedSortedMap",
		"java.util.Collections.CheckedSortedSet",
		"java.util.Collections.CopiesList",
		"java.util.Collections.EmptyList",
		"java.util.Collections.EmptyMap",
		"java.util.Collections.EmptySet",
		"java.util.Collections.ReverseComparator",
		"java.util.Collections.ReverseComparatorWithComparator",
		"java.util.Collections.SingletonList",
		"java.util.Collections.SingletonMap",
		"java.util.Collections.SingletonSet",
		"java.util.Collections.SynchronizedCollection",
		"java.util.Collections.SynchronizedList",
		"java.util.Collections.SynchronizedMap",
		"java.util.Collections.SynchronizedRandomAccessList",
		"java.util.Collections.SynchronizedSet",
		"java.util.Collections.SynchronizedSortedMap",
		"java.util.Collections.SynchronizedSortedSet",
		"java.util.Collections.UnmodifiableCollection",
		"java.util.Collections.UnmodifiableList",
		"java.util.Collections.UnmodifiableMap",
		"java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet",
		"java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.UnmodifiableMapEntry",
		"java.util.Collections.UnmodifiableRandomAccessList",
		"java.util.Collections.UnmodifiableSet",
		"java.util.Collections.UnmodifiableSortedMap",
		"java.util.Collections.UnmodifiableSortedSet"
	]);

	ClazzLoader.jarClasspath (base + "lang/StringBuilder.z.js", 
		["java.lang.AbstractStringBuilder", "$.StringBuilder"]);

	ClazzLoader.jarClasspath (base.substring (0, base.lastIndexOf ("java/"))
			+ "org/apache/harmony/luni/util/Msg.z.js", 
		["org.apache.harmony.luni.util.Msg", "$.MsgHelp"]);

	ClazzLoader.loadZJar (coreZ, ClazzLoader.runtimeKeyClass); //"java.lang.String"
};
if (ClazzLoader.classpathMap["@java"] != null) {
	window["java.package.callback"] ();
}


/* private */
window["java.registered"] = true;
