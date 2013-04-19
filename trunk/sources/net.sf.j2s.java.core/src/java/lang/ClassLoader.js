/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create July 10, 2006
 *******/

if (window["ClazzNode"] == null) {
/**
 * TODO:
 * Make optimization over class dependency tree.
 */

/*
 * ClassLoader Summary
 * 
 * ClassLoader creates SCRIPT elements and setup class path and onload 
 * callback to continue class loading.
 *
 * In the onload callbacks, ClazzLoader will try to calculate the next-to-be-
 * load *.js and load it. In *.js, it will contains some codes like
 * Clazz.load (..., "$wt.widgets.Control", ...);
 * to provide information to build up the class dependency tree.
 *
 * Some known problems of different browsers:
 * 1. In IE, loading *.js through SCRIPT will first triggers onreadstatechange 
 * event, and then executes inner *.js source.
 * 2. In Firefox, loading *.js will first executes *.js source and then 
 * triggers onload event.
 * 3. In Opera, similar to IE, but trigger onload event. (TODO: More details 
 * should be studied. Currently, Opera supports no multiple-thread-loading)
 * 
 * For class dependency tree, actually, it is not a tree. It is a reference
 * net with nodes have n parents and n children. There is a root, which 
 * ClassLoader knows where to start searching and loading classes, for such
 * a net. Each node is a class. Each class may require a set of must-classes, 
 * which must be loaded before itself getting initialized, and also need a set
 * of optional classes, which also be loaded before being called.
 *
 * The class loading status will be in 6 stages.
 * 1. Unknown, the class is newly introduced by other class.
 * 2. Known, the class is already mentioned by other class.
 * 3. Loaded, *.js source is in memory, but may not be initialized yet. It 
 * requires all its must-classes be intiailized, which is in the next stage.
 * 4. Musts loaded, all must classes is already loaded and declared.
 * 5. Delcared, the class is already declared (ClazzLoader#isClassDefined).
 * 6. Optionals loaded, all optional classes is loaded and declared.
 *
 * The ClassLoader tries to load all necessary classes in order, and intialize
 * them in order. For such job, it will traverse the dependency tree, and try 
 * to next class to-be-loaded. Sometime, the class dependencies may be in one
 * or more cycles, which must be broken down so classes is loaded in correct
 * order.
 *
 * Loading order and intializing order is very important for the ClassLoader.
 * The following technical options are considered:
 * 1. SCRIPT is loading asynchronously, which means controling order must use
 * callback methods to continue.
 * 2. Multiple loading threads are later introduced, which requires the 
 * ClassLoader should use variables to record the class status.
 * 3. Different browsers have different loading orders, which means extra tests
 * should be tested to make sure loading order won't be broken.
 * 4. Java2Script simulator itself have some loading orders that must be 
 * honored, which means it should be integrated seamlessly to Clazz system.
 * 5. Packed *.z.js is introduced to avoid lots of small *.js which requires 
 * lots of HTTP connections, which means that packed *.z.js should be treated
 * specially (There will be mappings for such packed classes).
 * 6. *.js or *.css loading may fail according to network status, which means
 * another loading try should be performed, so ClazzLoader is more robust.
 * 7. SWT lazy loading is later introduced, which means that class loading
 * process may be paused and should be resumed later.
 *
 * Some known bugs:
 * <code>$_L(["$wt.graphics.Drawable","$wt.widgets.Widget"],
 *  "$wt.widgets.Control", ...</code>
 * has errors while must classes in different order such as
 * <code>$_L(["$wt.widgets.Widget", "$wt.graphics.Drawable"],
 *  "$wt.widgets.Control", ...</code>
 * has no error.
 * 
 * Other maybe bug scenarios:
 * 1. In <code>ClazzLoader.maxLoadingThreads = 1;</code> single loading thread 
 * mode, there are no errors, but in default multiple thread loading mode, 
 * there are errors.
 * 2. No errors in one browser, but has errors on other browsers (Browser 
 * script loading order differences).
 * 3. First time loading has errors, but reloading it gets no errors (Maybe 
 * HTTP connections timeout, but should not accur in local file system, or it
 * is a loading bug by using JavaScript timeout thread).
 */

/*
 * The following comments with "#" are special configurations for a much
 * smaller *.js file size.
 *
 * @see net.sf.j2s.lib/src/net/sf/j2s/lib/build/SmartJSCompressor.java
 */
/*-#
 # ClazzNode -> $CN$
 # ClazzLoader -> $CL$
 # <<< ClazzLoader = $CL$;
 #-*/
 
/*-#
 # parents -> sp
 # musts -> sm
 # xxxoptionals -> so
 # declaration -> dcl
 # optionalsLoaded -> oled
 # qClazzName ->Nq
 #-*/
 
/**
 * Class dependency tree node
 */
/* private */
ClazzNode = function () {
	this.parents = new Array ();
	this.musts = new Array ();
	this.optionals = new Array ();
	this.declaration = null;
	this.name = null; // id
	this.path = null;
	this.status = 0;
	this.random = 0.13412;
	this.optionalsLoaded = null;
	this.toString = function () {
		if (this.name != null) {
			return this.name;
		} else if (this.path != null) {
			return this.path;
		} else {
			return "ClazzNode";
		}
	};
};

/*-#
 # ClazzNode.STATUS_UNKNOWN = 0
 # ClazzNode.STATUS_KNOWN -> 1
 # ClazzNode.STATUS_CONTENT_LOADED -> 2
 # ClazzNode.STATUS_MUSTS_LOADED -> 3
 # ClazzNode.STATUS_DECLARED -> 4
 # ClazzNode.STATUS_OPTIONALS_LOADED -> 5
 #-*/
/*# >>x #*/
ClazzNode.STATUS_UNKNOWN = 0;
ClazzNode.STATUS_KNOWN = 1;
ClazzNode.STATUS_CONTENT_LOADED = 2;
ClazzNode.STATUS_MUSTS_LOADED = 3;
ClazzNode.STATUS_DECLARED = 4;
ClazzNode.STATUS_OPTIONALS_LOADED = 5;
/*# x<< #*/

/**
 * Static class loader class
 */
ClazzLoader = function () {};

ClazzLoader.loaders = [];

ClazzLoader.requireLoaderByBase = function (base) {
	for (var i = 0; i < ClazzLoader.loaders.length; i++) {
		if (ClazzLoader.loaders[i].base == base) {
			return ClazzLoader.loaders[i];
		}
	}
	var loader = new ClazzLoader ();
	loader.base = base; 
	ClazzLoader.loaders[ClazzLoader.loaders.length] = loader;
	return loader;
};

/**
 * Class dependency tree
 */
/*-# clazzTreeRoot -> tr #-*/
ClazzLoader.clazzTreeRoot = new ClazzNode ();

/**
 * Used to keep the status whether a given *.js path is loaded or not.
 */
/* private */
/*-# loadedScripts -> ls #-*/
ClazzLoader.loadedScripts = new Object ();

/**
 * Multiple threads are used to speed up *.js loading.
 */
/* private */
/*-# inLoadingThreads -> ilt #-*/
ClazzLoader.inLoadingThreads = 0;

/**
 * Maximum of loading threads
 */
/* protected */
ClazzLoader.maxLoadingThreads = 6;

ClazzLoader.userAgent = navigator.userAgent.toLowerCase ();
ClazzLoader.isOpera = (ClazzLoader.userAgent.indexOf ("opera") != -1);
ClazzLoader.isIE = (ClazzLoader.userAgent.indexOf ("msie") != -1) && !ClazzLoader.isOpera;
ClazzLoader.isGecko = (ClazzLoader.userAgent.indexOf ("gecko") != -1);
ClazzLoader.isChrome = (ClazzLoader.userAgent.indexOf ("chrome") != -1);
ClazzLoader.isSafari = (ClazzLoader.userAgent.indexOf ("safari") != -1);
ClazzLoader.isMobileSafari = (ClazzLoader.isSafari && ClazzLoader.userAgent.indexOf ("mobile") != -1);
ClazzLoader.randomlyReload = ClazzLoader.isSafari;

/*
 * Opera has different loading order which will result in performance degrade!
 * So just return to single thread loading in Opera!
 *
 * FIXME: This different loading order also causes bugs in single thread!
 */
if (ClazzLoader.isOpera) {
	ClazzLoader.maxLoadingThreads = 1;
	var index = ClazzLoader.userAgent.indexOf ("opera/");
	if (index != -1) {
		var verNumber = 9.0;
		try {
			verNumber = parseFloat(ClazzLoader.userAgent.subString (index + 6));
		} catch (e) {}
		if (verNumber >= 9.6) {
			ClazzLoader.maxLoadingThreads = 6;
		}
	} 
}

/**
 * Try to be compatiable with Clazz system.
 * In original design ClazzLoader and Clazz are independent!
 *  -- zhourenjian @ December 23, 2006
 */
if (window["Clazz"] != null && Clazz.isClassDefined) {
	ClazzLoader.isClassDefined = Clazz.isClassDefined;
} else {
	/*-# definedClasses -> dC #-*/
	ClazzLoader.definedClasses = new Object ();
	ClazzLoader.isClassDefined = function (clazzName) {
		return ClazzLoader.definedClasses[clazzName] == true;
	};
}

/*
 * binaryFolders will be used for ResourceBundle to check *.properties
 * files. The default should always be "bin/"!
 */
if (window["Clazz"] != null && Clazz.binaryFolders != null) {
	ClazzLoader.binaryFolders = Clazz.binaryFolders;
} else {
	ClazzLoader.binaryFolders = ["bin/", "", "j2slib/"];
}

/*# {$clazz.existed} >>x #*/
/* public */
ClazzLoader.addBinaryFolder = function (bin) {
	if (bin != null) {
		var bins = ClazzLoader.binaryFolders;
		for (var i = 0; i < bins.length; i++) {
			if (bins[i] == bin) {
				return;
			}
		}
		bins[bins.length] = bin;
	}
};
/* public */
ClazzLoader.removeBinaryFolder = function (bin) {
	if (bin != null) {
		var bins = ClazzLoader.binaryFolders;
		for (var i = 0; i < bins.length; i++) {
			if (bins[i] == bin) {
				for (var j = i; j < bins.length - 1; j++) {
					bins[j] = bins[j + 1];
				}
				bins.length--;
				return bin;
			}
		}
	}
	return null;
};
/* public */
ClazzLoader.setPrimaryFolder = function (bin) {
	if (bin != null) {
		ClazzLoader.removeBinaryFolder (bin);
		var bins = ClazzLoader.binaryFolders;
		for (var i = bins.length - 1; i >= 0; i--) {
			bins[i + 1] = bins[i];
		}
		bins[0] = bin;
	}
};
/*# x<<
 # ClazzLoader.addBinaryFolder = Clazz.addBinaryFolder;
 # ClazzLoader.removeBinaryFolder = Clazz.removeBinaryFolder;
 # ClazzLoader.setPrimaryFolder = Clazz.setPrimaryFolder;
 #*/

/**
 * Indicate whether ClazzLoader is loading script synchronously or 
 * asynchronously.
 */
/* protected */
/*-# isAsynchronousLoading -> async #-*/
ClazzLoader.isAsynchronousLoading = true;

/* protected */
/*-# isUsingXMLHttpRequest -> xhr #-*/
ClazzLoader.isUsingXMLHttpRequest = false;

/* protected */
/*-# loadingTimeLag -> ltl #-*/
ClazzLoader.loadingTimeLag = -1;

/**
 * String mode:
 * asynchronous modes:
 * async(...).script, async(...).xhr, async(...).xmlhttprequest,
 * script.async(...), xhr.async(...), xmlhttprequest.async(...),
 * script
 * 
 * synchronous modes:
 * sync(...).xhr, sync(...).xmlhttprequest,
 * xhr.sync(...), xmlhttprequest.sync(...),
 * xmlhttprequest, xhr
 *
 * Integer mode:
 * Script/XHR bit: 1, 
 * 0: Script, 1: XHR
 * Asynchronous/Synchronous bit: 2
 * 0: Asynchronous, 2: Synchronous
 *
 * 0: Script & Asynchronous
 * 1: XHR & Asynchronous
 * 2: Script & Synchronous [Never]
 * 3: XHR & Synchronous
 */
/* public */
ClazzLoader.setLoadingMode = function (mode, timeLag) {
	if (mode == null) {
		if (ClazzLoader.isAsynchronousLoading && timeLag >= 0) {
			ClazzLoader.loadingTimeLag = timeLag;
		} else {
			ClazzLoader.loadingTimeLag = -1;
		}
		return;
	}
	if (typeof mode == "string") {
		mode = mode.toLowerCase ();
		if (mode.length == 0 || mode.indexOf ("script") != -1) {
			ClazzLoader.isUsingXMLHttpRequest = false;
			ClazzLoader.isAsynchronousLoading = true;
		} else {
			ClazzLoader.isUsingXMLHttpRequest = true;
			if (mode.indexOf ("async") != -1) {
				ClazzLoader.isAsynchronousLoading = true;
			} else {
				ClazzLoader.isAsynchronousLoading = false;
			}
		}
	/*# {$no.clazzloader.mode} >>x #*/
	} else {
		if (mode == ClazzLoader.MODE_SCRIPT) {
			ClazzLoader.isUsingXMLHttpRequest = false;
			ClazzLoader.isAsynchronousLoading = true;
		} else {
			ClazzLoader.isUsingXMLHttpRequest = true;
			if (mode == ClazzLoader.MODE_XHR_ASYNC) {
				ClazzLoader.isAsynchronousLoading = true;
			} else {
				ClazzLoader.isAsynchronousLoading = false;
			}
		}
	/*# x<< #*/
	}
	if (ClazzLoader.isAsynchronousLoading && timeLag >= 0) {
		ClazzLoader.loadingTimeLag = timeLag;
	} else {
		ClazzLoader.loadingTimeLag = -1;
	}
};

/*# {$no.clazzloader.mode} >>x #*/
ClazzLoader.MODE_SCRIPT = 0;
ClazzLoader.MODE_SCRIPT_ASYNC = 0;
ClazzLoader.MODE_XHR = 3;
ClazzLoader.MODE_XHR_SYNC = 3;
ClazzLoader.MODE_XHR_ASYNC = 1;
/*# x<< #*/
/**
 * Expand the shorten list of class names.
 * For example:
 * $wt.widgets.Shell, $.Display, $.Decorations
 * will be expanded to 
 * org.eclipse.swt.widgets.Shell, org.eclipse.swt.widgets.Display, 
 * org.eclipse.swt.widgets.Decorations ....
 * in which "$wt." stands for "org.eclipse.swt.", and "$." stands for
 * the previous class name's package.
 *
 * This method will be used to unwrap the required/optional classes list and 
 * the ignored classes list.
 */
/* private */
/*x-# unwrapArray -> uA #-x*/
ClazzLoader.unwrapArray = function (arr) {
	if (arr == null || arr.length == 0) {
		return arr;
	}
	var last = null;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == null) {
			continue;
		}
		if (arr[i].charAt (0) == '$') {
			if (arr[i].charAt (1) == '.') {
				if (last == null) {
					continue;
				}
				var idx = last.lastIndexOf (".");
				if (idx != -1) {
					var prefix = last.substring (0, idx);
					arr[i] = prefix + arr[i].substring (1);
				}
			} else {
				arr[i] = "org.eclipse.s" + arr[i].substring (1);
			}
		}
		last = arr[i];
	}
	return arr;
};

/**
 * Used to keep to-be-loaded classes.
 */
/* private */
/*-# classQueue -> cq #-*/
ClazzLoader.classQueue = new Array ();

/* protected */
ClazzLoader.classpathMap = new Object ();

/* public */
ClazzLoader.packageClasspath = function (pkg, base, index) {
	var map = ClazzLoader.classpathMap;
	/*
	 * In some situation, maybe,
	 * ClazzLoader.packageClasspath ("java", ..., true);
	 * is called after other ClazzLoader#packageClasspath, e.g.
	 * <code>
	 * ClazzLoader.packageClasspath ("org.eclipse.swt", "...", true);
	 * ClazzLoader.packageClasspath ("java", "...", true);
	 * </code>
	 * which is not recommended. But ClazzLoader should try to adjust orders
	 * which requires "java" to be declared before normal ClazzLoader
	 * #packageClasspath call before that line! And later that line
	 * should never initialize "java/package.js" again!
	 */
	var isPkgDeclared = index == true && map["@" + pkg] != null;
	if (index && map["@java"] == null && pkg.indexOf ("java") != 0) {
		ClazzLoader.assurePackageClasspath ("java");
	}
	if (pkg instanceof Array) {
		ClazzLoader.unwrapArray (pkg);
		for (var i = 0; i < pkg.length; i++) {
			ClazzLoader.packageClasspath (pkg[i], base, index);
		}
		return;
	}
	if (pkg == "java" || pkg == "java.*") {
		// support ajax for default
		var key = "@net.sf.j2s.ajax";
		if (map[key] == null) {
			map[key] = base;
		}
		key = "@net.sf.j2s";
		if (map[key] == null) {
			map[key] = base;
		}
	} else if (pkg == "swt") { //abbrev
		pkg = "org.eclipse.swt";
	} else if (pkg == "ajax") { //abbrev
		pkg = "net.sf.j2s.ajax";
	} else if (pkg == "j2s") { //abbrev
		pkg = "net.sf.j2s";
	}
	if (pkg.lastIndexOf (".*") == pkg.length - 2) {
		pkg = pkg.substring (0, pkg.length - 2);
	}
	map["@" + pkg] = base;
	if (index == true && !isPkgDeclared) {
		if (window[pkg + ".registered"] != true) {
			ClazzLoader.pkgRefCount++;
			ClazzLoader.loadClass (pkg + ".package", function () {
					ClazzLoader.pkgRefCount--;
					if (ClazzLoader.pkgRefCount == 0) {
						ClazzLoader.runtimeLoaded ();
					}
				}, true);
		} else if (window[pkg + ".package.callback"] != null) {
			window[pkg + ".package.callback"] ();
		}
	}
};

ClazzLoader.pkgRefCount = 0;

/**
 * Register classes to a given *.z.js path, so only a single *.z.js is loaded
 * for all those classes.
 */
/* public */
/*-# clazzes -> zs #-*/
ClazzLoader.jarClasspath = function (jar, clazzes) {
	if (clazzes instanceof Array) {
		ClazzLoader.unwrapArray (clazzes);
		for (var i = 0; i < clazzes.length; i++) {
			ClazzLoader.classpathMap["#" + clazzes[i]] = jar;
		}
		ClazzLoader.classpathMap["$" + jar] = clazzes;
	} else {
		ClazzLoader.classpathMap["#" + clazzes] = jar;
		ClazzLoader.classpathMap["$" + jar] = [clazzes];
	}
};

/**
 * Usually be used in .../package.js. All given packages will be registered
 * to the same classpath of given prefix package.
 */
/* public */
ClazzLoader.registerPackages = function (prefix, pkgs) {
	//alert ("package " + pkgs);
	ClazzLoader.checkInteractive ();
	var base = ClazzLoader.getClasspathFor (prefix + ".*", true);
	for (var i = 0; i < pkgs.length; i++) {
		if (window["Clazz"] != null) {
			Clazz.declarePackage (prefix + "." + pkgs[i]);
		}
		ClazzLoader.packageClasspath (prefix + "." + pkgs[i], base);
	}
};

/**
 * Using multiple sites to load *.js in multiple threads. Using multiple
 * sites may avoid 2 HTTP 1.1 connections recommendation limit.
 * Here is a default implementation for http://archive.java2script.org.
 * In site archive.java2script.org, there are 6 sites:
 * 1. http://archive.java2script.org or http://a.java2script.org
 * 2. http://erchive.java2script.org or http://e.java2script.org
 * 3. http://irchive.java2script.org or http://i.java2script.org
 * 4. http://orchive.java2script.org or http://o.java2script.org
 * 5. http://urchive.java2script.org or http://u.java2script.org
 * 6. http://yrchive.java2script.org or http://y.java2script.org
 */
/* protected */
ClazzLoader.multipleSites = function (path) {
	var deltas = window["j2s.update.delta"];
	if (deltas != null && deltas instanceof Array && deltas.length >= 3) {
		var lastOldVersion = null;
		var lastNewVersion = null;
		for (var i = 0; i < deltas.length / 3; i++) {
			var oldVersion = deltas[i + i + i];
			if (oldVersion != "$") {
				lastOldVersion = oldVersion;
			}
			var newVersion = deltas[i + i + i + 1];
			if (newVersion != "$") {
				lastNewVersion = newVersion;
			}
			var relativePath = deltas[i + i + i + 2];
			var key = lastOldVersion + "/" + relativePath;
			var idx = path.indexOf (key);
			if (idx != -1 && idx == path.length - key.length) {
				path = path.substring (0, idx) + lastNewVersion + "/" + relativePath;
				break;
			}
		}
	}
	var length = path.length;
	if (ClazzLoader.maxLoadingThreads > 1 
			&& ((length > 15 && path.substring (0, 15) == "http://archive.")
			|| (length > 9 && path.substring (0, 9) == "http://a."))) {
		var index = path.lastIndexOf ("/");
		if (index < length - 3) {
			var arr = ['a', 'e', 'i', 'o', 'u', 'y'];
			var c1 = path.charCodeAt (index + 1);
			var c2 = path.charCodeAt (index + 2);
			var idx = (length - index) * 3 + c1 * 5 + c2 * 7; // Hash
			return path.substring (0, 7) + arr[idx % 6] + path.substring (8);
		}
	}
	return path;
};

/**
 * Return the *.js path of the given class. Maybe the class is contained
 * in a *.z.js jar file.
 * @param clazz Given class that the path is to be calculated for. May
 * be java.package, or java.lang.String
 * @param forRoot Optional argument, if true, the return path will be root
 * of the given classs' package root path.
 * @param ext Optional argument, if given, it will replace the default ".js"
 * extension.
 */
/* public */
ClazzLoader.getClasspathFor = function (clazz, forRoot, ext) {
	//error ("check js path : " + clazz);
	var path = ClazzLoader.classpathMap["#" + clazz];
	var base = null;
	if (path != null) {
		if (!forRoot && ext == null) { // return directly
			return ClazzLoader.multipleSites (path);
		} else {
			var idx = path.lastIndexOf (clazz.replace (/\./g, "/"));
			if (idx != -1) {
				base = path.substring (0, idx);
			} else {
				/*
				 * Check more: Maybe the same class' *.css is located
				 * in the same folder.
				 */
				idx = clazz.lastIndexOf (".");
				if (idx != -1) {
					idx = path.lastIndexOf (clazz.substring (0, idx)
							.replace (/\./g, "/"));
					if (idx != -1) {
						base = path.substring (0, idx);
					}
				}
			}
		}
	}
	if (base == null) {
		/*
		path = ClazzLoader.classpathMap["@" + clazz]; // package
		if (path != null) {
			return ClazzLoader.assureBase (path) + clazz.replace (/\./g, "/") + "/";
		}
		*/
		var idx = clazz.lastIndexOf (".");
		//*
		while (idx != -1) {
			var pkg = clazz.substring (0, idx);
			base = ClazzLoader.classpathMap["@" + pkg];
			if (base != null) {
				break;
			}
			idx = clazz.lastIndexOf (".", idx - 2);
		}
		//*/
		/*
		if (idx != -1) {
			var pkg = clazz.substring (0, idx);
			base = ClazzLoader.classpathMap["@" + pkg];
		}
		//*/
	}
	
	base = ClazzLoader.assureBase (base);
	if (forRoot) {
		return ClazzLoader.multipleSites (base);
	}
	if (clazz.lastIndexOf (".*") == clazz.length - 2) {
		return ClazzLoader.multipleSites (base + clazz.substring (0, idx + 1)
				.replace (/\./g, "/"));
	}
	if (ext == null) {
		ext = ".js";
	} else if (ext.charAt (0) != '.') {
		ext = "." + ext;
	}
	var jsPath = base + clazz.replace (/\./g, "/") + ext;
	return ClazzLoader.multipleSites (jsPath);
};

/* private */
/*-# assureBase -> aB #-*/
ClazzLoader.assureBase = function (base) {
	if (base == null) {
		// Try to be compatiable with Clazz system.
		var bins = "binaryFolders";
		if (window["Clazz"] != null && Clazz[bins] != null
				&& Clazz[bins].length != 0) {
			base = Clazz[bins][0];
		} else if (ClazzLoader[bins] != null 
				&& ClazzLoader[bins].length != 0) {
			base = ClazzLoader[bins][0];
		} else {
			base = "bin";
		}
	}
	if (base.lastIndexOf ("/") != base.length - 1) {
		base += "/";
	}
	return base;
};

/* Used to keep ignored classes */
/* private */
/*-# excludeClassMap -> exmap #-*/
ClazzLoader.excludeClassMap = new Object ();

/**
 * To ignore some classes.
 */
/* public */
ClazzLoader.ignore = function () {
	var clazzes = null;
	if (arguments.length == 1) {
		if (arguments[0] instanceof Array) {
			clazzes = arguments[0];
		}
	}
	if (clazzes == null) {
		clazzes = new Array ();
		for (var i = 0; i < arguments.length; i++) {
			clazzes[clazzes.length] = arguments[i];
		}
	}
	ClazzLoader.unwrapArray (clazzes);
	for (var i = 0; i < clazzes.length; i++) {
		ClazzLoader.excludeClassMap["@" + clazzes[i]] = true;
	}
};

/* private */
/*-# isClassExcluded -> isEx #-*/
ClazzLoader.isClassExcluded = function (clazz) {
	return ClazzLoader.excludeClassMap["@" + clazz] == true;
};

/**
 * The following *.script* can be overriden to indicate the 
 * status of classes loading.
 *
 * TODO: There should be a Java interface with name like INativeLoaderStatus
 */
/* protected */
ClazzLoader.scriptLoading = function (file) {};

/* protected */
ClazzLoader.scriptLoaded = function (file) {};

/* protected */
ClazzLoader.scriptInited = function (file) {};

/* protected */
ClazzLoader.scriptCompleted = function (file) {};

/* protected */
ClazzLoader.classUnloaded = function (clazz) {};

/* protected */
ClazzLoader.classReloaded = function (clazz) {};

/**
 * After all the classes are loaded, this method will be called.
 * Should be overriden to run *.main([]).
 */
/* protected */
ClazzLoader.globalLoaded = function () {};

/* protected */
ClazzLoader.keepOnLoading = true;

/* private */
/*-# mapPath2ClassNode -> p2node #-*/
ClazzLoader.mapPath2ClassNode = new Object ();

/* private */
ClazzLoader.xhrOnload = function (transport, file) {
	if (transport.status >= 400 || transport.responseText == null
			|| transport.responseText.length == 0) { // error
		var fs = ClazzLoader.failedScripts;
		if (fs[file] == null) {
			// Silently take another try for bad network
			fs[file] = 1;
			ClazzLoader.loadedScripts[file] = false;
			ClazzLoader.loadScript (file);
			return;
		} else {
			alert ("[Java2Script] Error in loading " + file + "!");
		}
		ClazzLoader.tryToLoadNext (file);
	} else {
		try {
			/*
			if (transport.responseText.length >= 2048) {
				//fileCount++;
			}
				if (file.indexOf ("examples") != -1) {
				} else {
				log (transport.responseText.length + "::" + file);
				}				
			*/
			//	fileCount += transport.responseText.length;
			eval (transport.responseText);
		} catch (e) {
			alert ("[Java2Script] Script error: " + e.message);
			throw e;
		}
		ClazzLoader.scriptLoaded (file);
		ClazzLoader.tryToLoadNext (file);
	}
};

/**
 * Empty onreadystatechange for fixing IE's memeory leak on XMLHttpRequest
 */
/* private */
/*-# emptyOnRSC -> rsc #-*/
ClazzLoader.emptyOnRSC = function () {
};

/* protected */
/*-# failedScripts -> fss #-*/
ClazzLoader.failedScripts = new Object ();

/* protected */
/*-# failedHandles -> fhs #-*/
ClazzLoader.failedHandles = new Object ();

/* protected */
ClazzLoader.takeAnotherTry = true;

/* private */
/*-# generateRemovingFunction -> gRF #-*/
ClazzLoader.generateRemovingFunction = function (node) {
	return function () {
		if (node.readyState != "interactive") {
			try {
				if (node.parentNode != null) {
					node.parentNode.removeChild (node);
				}
			} catch (e) { }
			node = null;
		}
	};
};

/*
 * Dynamically SCRIPT elements are removed after they are parsed into memory.
 * And removed *.js may not be fetched again by "Refresh" action. And it will
 * save loading time for Java2Script applications.
 *
 * This may disturb debugging tools such as Firebug. Setting
 * window["j2s.script.debugging"] = true;
 * will ignore removing SCRIPT elements requests.
 */
/* private */
/*-# removeScriptNode -> RsN #-*/
ClazzLoader.removeScriptNode = function (n) {
	if (window["j2s.script.debugging"]) {
		return;
	}
	// lazily remove script nodes.
	window.setTimeout (ClazzLoader.generateRemovingFunction (n), 1);
};

/* private */
/*-# generatingXHROnload -> gXOd #-*/
ClazzLoader.generatingXHROnload = function (transport, file) {
	return function () {
		ClazzLoader.xhrOnload (transport, file);
		transport = null;
		file = null;
	};
};

/* private */
/*-# generatingXHRCallback -> gXcb #-*/
ClazzLoader.generatingXHRCallback = function (transport, file, isActiveX) {
	return function () {
		if (transport.readyState == 4) {
			if (ClazzLoader.inLoadingThreads > 0) {
				ClazzLoader.inLoadingThreads--;
			}
			var lazyFun = ClazzLoader.generatingXHROnload (transport, file);
			if (isActiveX) {
				transport.onreadystatechange = ClazzLoader.emptyOnRSC;
				// For IE, try to avoid stack overflow errors
				window.setTimeout (lazyFun,
						ClazzLoader.loadingTimeLag < 0 ? 0 : ClazzLoader.loadingTimeLag);
			} else {
				transport.onreadystatechange = null;
				if (ClazzLoader.loadingTimeLag >= 0) {
					window.setTimeout (lazyFun, ClazzLoader.loadingTimeLag);
				} else {
					ClazzLoader.xhrOnload (transport, file);
				}
			}
			transport = null;
			file = null;
		}
	};
};

/* private */
/*-# loadingNextByPath -> lNBP #-*/
ClazzLoader.loadingNextByPath = function (path) {
	if (ClazzLoader.loadingTimeLag >= 0) {
		window.setTimeout (function () {
					ClazzLoader.tryToLoadNext (path);
				}, ClazzLoader.loadingTimeLag);
	} else {
		ClazzLoader.tryToLoadNext (path);
	}
};

/* private */
/*-# ieToLoadScriptAgain -> iTLA #-*/
ClazzLoader.ieToLoadScriptAgain = function (path, local) {
	var fun = function () {
		if (!ClazzLoader.takeAnotherTry) {
			return;
		}
		// next time in "loading" state won't get waiting!
		ClazzLoader.failedScripts[path] = 0;
		ClazzLoader.loadedScripts[path] = false;
		// failed count down!
		if (ClazzLoader.inLoadingThreads > 0) {
			ClazzLoader.inLoadingThreads--;
		}
		// Take another try!
		// log ("re - loading ... " + path);
		ClazzLoader.loadScript (path);
	};
	// consider 30 seconds available after failing!
	/*
	 * Set 3s waiting in local file system. Is it 3s enough?
	 * What about big *.z.js need more than 3s to initialize?
	 */
	var waitingTime = (local ? 3000 : 30000); // 3s : 30s
	//alert ("waiting:" + waitingTime + " . " + path);
	return window.setTimeout (fun, waitingTime);
};

/* private */
/*-# w3cFailedLoadingTest -> wFLT #-*/
ClazzLoader.w3cFailedLoadingTest = function (script) {
	return window.setTimeout (function () {
				script.onerror ();
				script.timeoutHandle = null;
				script = null;
			}, 500); // 0.5s for loading a local file is considered enough long
};

/* private */
/*-# lazilyReloadScript -> lRlS #-*/
ClazzLoader.lazilyReloadScript = function (path) {
	return window.setTimeout (function () {
				ClazzLoader.loadScript (path);
			}, 100); // 0.1s for script reloading interval
};

/* private */
/*-# generatingW3CScriptOnCallback -> gWSC #-*/
ClazzLoader.generatingW3CScriptOnCallback = function (path, forError) {
	return function () {
		if (ClazzLoader.isGecko && this.timeoutHandle != null) {
			window.clearTimeout (this.timeoutHandle);
			this.timeoutHandle = null;
		}
		if (ClazzLoader.inLoadingThreads > 0) {
			ClazzLoader.inLoadingThreads--;
		}
		this.onload = null;
		this.onerror = null;
		if (!forError && ClazzLoader.isOpera // Opera only
				&& !ClazzLoader.innerLoadedScripts[this.src]) {
			ClazzLoader.checkInteractive();
		}
		if (forError || (!ClazzLoader.innerLoadedScripts[this.src]
					&& ClazzLoader.isOpera)) {
			// Opera will not take another try.
			var fss = ClazzLoader.failedScripts;
			if (fss[path] == null && ClazzLoader.takeAnotherTry) {
				// silently take another try for bad network
				// alert ("re loading " + path + " ... ");
				fss[path] = 1;
				if (!forError) {
					ClazzLoader.innerLoadedScripts[this.src] = false;
				}
				ClazzLoader.loadedScripts[path] = false;
				ClazzLoader.lazilyReloadScript (path);
				ClazzLoader.removeScriptNode (this);
				return;
			} else {
				alert ("[Java2Script] Error in loading " + path + "!");
			}
			if (forError) {
				ClazzLoader.scriptLoaded (path);
			}
		} else {
			ClazzLoader.scriptLoaded (path);
		}
		ClazzLoader.loadingNextByPath (path);
		ClazzLoader.removeScriptNode (this);
	};
};

/* private */
/*-# generatingIEScriptOnCallback -> gISC #-*/
ClazzLoader.generatingIEScriptOnCallback = function (path) {
	var f = function () {
		var fhs = ClazzLoader.failedHandles;
		var fss = ClazzLoader.failedScripts;
		var state = "" + this.readyState;
		
		var local = state == "loading" 
				&& (this.src.indexOf ("file:") == 0 
				|| (window.location.protocol == "file:"
				&& this.src.indexOf ("http") != 0));

		// alert (state + "/" + this.src);
		if (state != "loaded" && state != "complete") {
			/*
			 * When no such *.js existed, IE will be
			 * stuck here without loaded event!
			 */
			/*
			if ((window.location.protocol != "file:" 
					&& this.src.indexOf ("file:") != 0)
					|| this.readyState != "loading") {
				return;
			}
			*/
			if (fss[path] == null) {
				fhs[path] = ClazzLoader.ieToLoadScriptAgain (path, local);
				return;
			}
			if (fss[path] == 1) { // above function will be executed?!
				return;
			}
			if (state == "loading" && !local) {
				return; // continue to load script
			}
		}
		if (fhs[path] != null) {
			window.clearTimeout (fhs[path]);
			fhs[path] = null;
		}
		if ((local || state == "loaded")
				&& !ClazzLoader.innerLoadedScripts[this.src]) {
			if (!local && (fss[path] == null || fss[path] == 0)
					&& ClazzLoader.takeAnotherTry) {
				// failed! count down
				if (ClazzLoader.inLoadingThreads > 0) {
					ClazzLoader.inLoadingThreads--;
				}
				// silently take another try for bad network
				fss[path] = 1;
				// log ("reloading ... " + path);
				ClazzLoader.loadedScripts[path] = false;
				ClazzLoader.lazilyReloadScript (path);
				ClazzLoader.removeScriptNode (this);
				return;
			} else {
				alert ("[Java2Script] Error in loading " + path + "!");
			}
		}
		if (ClazzLoader.inLoadingThreads > 0) {
			ClazzLoader.inLoadingThreads--;
		}
		ClazzLoader.scriptLoaded (path);
		// Unset onreadystatechange, leaks mem in IE
		this.onreadystatechange = null; 
		ClazzLoader.loadingNextByPath (path);
		ClazzLoader.removeScriptNode (this);

		/*
		 * In case this script loading takes too long, another script will be
		 * created to take another try. So remove other script nodes to avoid
		 * duplicate class loading and initializing.
		 */
		var scripts = document.getElementsByTagName ("SCRIPT");
		if (scripts != null && scripts.length > 0) {
			for (var i = 0; i < scripts.length; i++) {
				var s = scripts[i];
				if (s.readyState == "loading" && s.onreadystatechange != null
						&& s.onreadystatechange.path == path && s !== this) {
					s.parentNode.removeChild (s);
				}
			}
		}
	};
	f.path = path;
	return f;
};

/*
 * There is another thread trying to remove j2slib.z.js or similar SCRIPT.
 * See the end of this file.
 */

/**
 * Load *.js by adding script elements into head. Hook the onload event to
 * load the next class in dependency tree.
 */
/* protected */
/*-#
 # loadScript -> xrpt
 #
 # transport -> tt
 # isActiveX -> iX
 # ignoreOnload -> iol
 #-*/
ClazzLoader.loadScript = function (file) {
	// maybe some scripts are to be loaded without needs to know onload event.
	var ignoreOnload = (arguments[1] == true);
	if (ClazzLoader.loadedScripts[file] && !ignoreOnload) {
		ClazzLoader.tryToLoadNext (file);
		return;
	}
	ClazzLoader.loadedScripts[file] = true;
	/* also remove from those queue */
	var cq = ClazzLoader.classQueue;
	for (var i = 0; i < cq.length; i++) {
		if (cq[i] == file) {
			for (var j = i; j < cq.length - 1; j++) {
				cq[i] = cq[i + 1];
			}
			cq.length--;
			break;
		}
	}

	if (ClazzLoader.isUsingXMLHttpRequest) {
		ClazzLoader.scriptLoading (file);
		var transport = null;
		var isActiveX = false;
		if (window.XMLHttpRequest) {
			transport = new XMLHttpRequest();
		} else {
			isActiveX = true;
			try {
				transport = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				transport = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		if (transport == null) { // should never happen in modern browsers.
			alert ("[Java2Script] XMLHttpRequest not supported!");
			return;
		}

		transport.open ("GET", file, ClazzLoader.isAsynchronousLoading);
		// transport.setRequestHeader ("User-Agent",
		// 		"Java2Script-Pacemaker/1.0 (+http://j2s.sourceforge.net)");
		if (ClazzLoader.isAsynchronousLoading) {
			transport.onreadystatechange = ClazzLoader.generatingXHRCallback (
					transport, file, isActiveX);
			ClazzLoader.inLoadingThreads++;
			try {
				transport.send (null);
			} catch (e) {
				alert ("[Java2Script] Loading file error: " + e.message);
				ClazzLoader.xhrOnload (transport, file);
				//throw e;
			}
		} else {
			try {
				transport.send (null);
			} catch (e) {
				alert ("[Java2Script] Loading file error: " + e.message);
				//throw e;
			}
			ClazzLoader.xhrOnload (transport, file);
		}
		return;
	}
	// Create script DOM element
	var script = document.createElement ("SCRIPT");
	script.type = "text/javascript";
	if (ClazzLoader.randomlyReload && ClazzLoader.reloadingClasses[file]) {
		script.src = file + "?" + Math.floor (100000 * Math.random ());
	} else {
		script.src = file;
	}
	var head = document.getElementsByTagName ("HEAD")[0];

	if (ignoreOnload) {
		head.appendChild (script);
		// ignore onload event and no call of ClazzLoader.scriptLoading
		return;
	}
	script.defer = true;
	// Alert when the script is loaded
	if (typeof (script.onreadystatechange) == "undefined" || !ClazzLoader.isIE) { // W3C
		if (ClazzLoader.isGecko && (file.indexOf ("file:") == 0 
				|| (window.location.protocol == "file:" && file.indexOf ("http") != 0))) {
			script.timeoutHandle = ClazzLoader.w3cFailedLoadingTest (script);
		}

		/*
		 * What about Safari and Google Chrome?
		 */
		/*
		 * Opera will trigger onload event even there are no *.js existed
		 */
		script.onload = ClazzLoader.generatingW3CScriptOnCallback (file, false);
		/*
		 * For Firefox/Mozilla, unexisted *.js will result in errors.
		 */
		script.onerror = ClazzLoader.generatingW3CScriptOnCallback (file, true);

		if (ClazzLoader.isOpera) {
			ClazzLoader.needOnloadCheck = true;
		}
	} else { // IE
		ClazzLoader.needOnloadCheck = true;
		script.onreadystatechange = ClazzLoader.generatingIEScriptOnCallback (file);
	}
	ClazzLoader.inLoadingThreads++;
	//alert("threads:"+ClazzLoader.inLoadingThreads);
	// Add script DOM element to document tree
	head.appendChild (script);
	ClazzLoader.scriptLoading (file);
};

/* protected */
ClazzLoader.isResourceExisted = function (id, path, base) {
	if (id != null && document.getElementById (id) != null) {
		return true;
	}
	if (path != null) {
		var key = path;
		if (base != null) {
			if (path.indexOf (base) == 0) {
				key = path.substring (base.length);
			}
		}
		if (path.lastIndexOf (".css") == path.length - 4) {
			var resLinks = document.getElementsByTagName ("LINK");
			for (var i = 0; i < resLinks.length; i++) {
				var cssPath = resLinks[i].href;
				var idx = cssPath.lastIndexOf (key);
				if (idx != -1 && idx == cssPath.length - key.length) {
					return true;
				}
			}
			if (window["css." + id] == true) {
				return true;
			}
		} else if (path.lastIndexOf (".js") == path.length - 4) {
			var resScripts = document.getElementsByTagName ("SCRIPT");
			for (var i = 0; i < resScripts.length; i++) {
				var jsPath = resScripts[i].src;
				var idx = jsPath.lastIndexOf (key);
				if (idx != -1 && idx == jsPath.length - key.length) {
					return true;
				}
			}
		}
	}
	return false;
};

/* private */
/*-# queueBe4SWT -> q4T #-*/
ClazzLoader.queueBe4SWT = [];

/* private */
/*-# lockQueueBe4SWT -> l4T #-*/
ClazzLoader.lockQueueBe4SWT = true;

/* private */
/*-# isLoadingEntryClass -> lec #-*/
ClazzLoader.isLoadingEntryClass = true;

/* private */
/*-# besidesJavaPackage -> bJP #-*/
ClazzLoader.besidesJavaPackage = false;

/**
 * After class is loaded, this method will be executed to check whether there
 * are classes in the dependency tree that need to be loaded.
 */
/* private */
/*-# tryToLoadNext -> next #-*/
ClazzLoader.tryToLoadNext = function (file) {
	/*
	 * Try to check whether current status is in SWT lazy loading mode. If
	 * yes, try to keep ClazzLoader#tryToLoadNext in queue and wait until
	 * all SWT core is loaded.
	 */
	if (ClazzLoader.lockQueueBe4SWT && ClazzLoader.pkgRefCount != 0 
			&& file.lastIndexOf ("package.js") != file.length - 10
			&& !ClazzLoader.isOpera) { // No Opera! Opera is in single thread.
		var qbs = ClazzLoader.queueBe4SWT;
		qbs[qbs.length] = file;
		return;
	}

	//alert ("in tryToLoadNext");
	var node = ClazzLoader.mapPath2ClassNode["@" + file];
	if (node == null) { // maybe class tree root
		//error (" null node ?" + file);
		return;
	}
	//alert ("loaded .. " + file);
	var clazzes = ClazzLoader.classpathMap["$" + file];
	if (clazzes != null) {
		for (var i = 0; i < clazzes.length; i++) {
			var nm = clazzes[i];
			if (nm != node.name) {
				var n = ClazzLoader.findClass (nm);
				if (n != null) {
				//*
					if (n.status < ClazzNode.STATUS_CONTENT_LOADED) {
						n.status = ClazzNode.STATUS_CONTENT_LOADED;
						ClazzLoader.updateNode (n);
					}
				//*/
				//ClazzLoader.tryToLoadNext (n.path);
				} else {
					n = new ClazzNode ();
					n.name = nm;
					var pp = ClazzLoader.classpathMap["#" + nm];
					if (pp == null) {
						log (nm);
						error ("Java2Script implementation error! Please report this bug!");
					}
					//n.path = ClazzLoader.lastScriptPath;
					n.path = pp;
					//error ("..." + node.path + "//" + node.name);
					ClazzLoader.mappingPathNameNode (n.path, nm, n);
					n.status = ClazzNode.STATUS_CONTENT_LOADED;
					ClazzLoader.addChildClassNode(ClazzLoader.clazzTreeRoot, n, -1);
					ClazzLoader.updateNode (n);
				}
			}
		}
	}
	if (node instanceof Array) {
		//log ("array of node " + node.length + ">>>>" + file);
		/*
		for (var i = 0; i < node.length; i++) {
			alert ("array of node " + node[i].name);
		}
		*/
		for (var i = 0; i < node.length; i++) {
			if (node[i].status < ClazzNode.STATUS_CONTENT_LOADED) {
				node[i].status = ClazzNode.STATUS_CONTENT_LOADED;
				//error ("updating array : " + node[i].name + "..");
				ClazzLoader.updateNode (node[i]);
			}
		}
	} else {
		if (node.status < ClazzNode.STATUS_CONTENT_LOADED) {
			var stillLoading = false;
			var ss = document.getElementsByTagName ("SCRIPT");
			for (var i = 0; i < ss.length; i++) {
				if (ClazzLoader.isIE) {
					if (ss[i].onreadystatechange != null && ss[i].onreadystatechange.path == node.path
							&& ss[i].readyState == "interactive") {
						stillLoading = true;
						break;
					}
				} else {
					if (ss[i].onload != null && ss[i].onload.path == node.path) {
						stillLoading = true;
						break;
					}
				}
			}
			if (!stillLoading) {
				node.status = ClazzNode.STATUS_CONTENT_LOADED;
				ClazzLoader.updateNode (node);
			}
		}
	}
	/*
	 * Maybe in #optionalsLoaded inside above ClazzLoader#updateNode calls, 
	 * ClazzLoader.keepOnLoading is set false (Already loaded the wanted
	 * classes), so here check to stop.
	 */
	if (!ClazzLoader.keepOnLoading) {
		return;
	}

	var loadFurther = false;
	var n = ClazzLoader.findNextMustClass (ClazzLoader.clazzTreeRoot, 
			ClazzNode.STATUS_KNOWN);
	//alert (file + " next ..." + n) ;
	if (n != null) {
		//log ("next ..." + n.name);
		ClazzLoader.loadClassNode (n);
		while (ClazzLoader.inLoadingThreads < ClazzLoader.maxLoadingThreads) {
			var nn = ClazzLoader.findNextMustClass (ClazzLoader.clazzTreeRoot,
					ClazzNode.STATUS_KNOWN);
			if (nn == null) break;
			ClazzLoader.loadClassNode (nn); // will increase inLoadingThreads!
		}
	} else {
		var cq = ClazzLoader.classQueue;
		if (cq.length != 0) { 
			/* queue must be loaded in order! */
			n = cq[0]; // popup class from the queue
			//alert ("load from queue");
			//alert (cq.length + ":" + cq);
			/*
			var offset = 1;
			for (var i = 0; i < cq.length - offset; i++) {
				var next = cq[i + offset];
				while (next.status == ClazzNode.STATUS_OPTIONALS_LOADED) {
					offset++;
					if (i + offset < cq.length) {
						next = cq[i + offset];
					} else {
						next = null;
						break;
					}
				}
				if (next != null) {
					cq[i] = next;
				}
			}
			cq.length -= offset;
			//*/
			for (var i = 0; i < cq.length - 1; i++) {
				cq[i] = cq[i + 1];
			}
			cq.length--;
			//log (cq.length + ":" + cq);
			if (!ClazzLoader.loadedScripts[n.path] || cq.length != 0 
					|| !ClazzLoader.isLoadingEntryClass
					|| (n.musts != null && n.musts.length != 0)
					|| (n.optionals != null && n.optionals.length != 0)/*
					|| window["org.eclipse.swt.registered"] != null*/) {
				ClazzLoader.addChildClassNode(ClazzLoader.clazzTreeRoot, n, 1);
				ClazzLoader.loadScript (n.path);
			} else {
				if (ClazzLoader.isLoadingEntryClass) {
					/*
					 * The first time reaching here is the time when ClassLoader
					 * is trying to load entry class. Class with #main method and
					 * is to be executed is called Entry Class.
					 *
					 * Here when loading entry class, ClassLoader should not call
					 * the next following loading script. This is because, those
					 * scripts will try to mark the class as loaded directly and
					 * then continue to call #optionalsLoaded callback method,
					 * which results in an script error!
					 */
					ClazzLoader.isLoadingEntryClass = false;
				}
				//alert ("Continue loading by SCRIPT onload event!");
				//ClazzLoader.addChildClassNode(ClazzLoader.clazzTreeRoot, n, 1);
				//ClazzLoader.loadScript (n.path);
			}
		} else { // Optionals
			//log ("options");
			n = ClazzLoader.findNextOptionalClass (ClazzNode.STATUS_KNOWN);
			if (n != null) {
				//log ("in optionals unknown..." + n.name);
				var moreLoaded = ClazzLoader.loadClassNode (n);
				while (ClazzLoader.inLoadingThreads < ClazzLoader.maxLoadingThreads) {
					var nn = ClazzLoader.findNextOptionalClass (ClazzNode.STATUS_KNOWN);
					//log ("in second loading " + nn);
					if (nn == null) break;
					if (ClazzLoader.loadClassNode (nn)) { // will increase inLoadingThreads!
						moreLoaded = true;
					}
				}
				loadFurther = !moreLoaded;
			} else {
				loadFurther = true;
			}
		}
	}
	/*
	 * The following codes still need more tests, e.g. cyclic tests.
	 * And they also need optimization.
	 */
	if (loadFurther && ClazzLoader.inLoadingThreads == 0) {
		//error ("no optionals?");
		var lastNode = null;
		while ((n = ClazzLoader.findNextMustClass (ClazzLoader.clazzTreeRoot, ClazzNode.STATUS_CONTENT_LOADED)) != null) {
			if (lastNode === n) {
				break;
			}
			ClazzLoader.updateNode (n);
			lastNode = n;
		}
		lastNode = null;
		while ((n = ClazzLoader.findNextOptionalClass (ClazzNode.STATUS_CONTENT_LOADED)) != null) {
			if (lastNode === n) { // Already existed cycle ?
				n.status = ClazzNode.STATUS_OPTIONALS_LOADED;
			}
			ClazzLoader.updateNode (n);
			lastNode = n;
		}
		while (true) {
			ClazzLoader.tracks = new Array ();
			if (!ClazzLoader.checkOptionalCycle (ClazzLoader.clazzTreeRoot)) {
				break;
			}
		}
		lastNode = null;
		while ((n = ClazzLoader.findNextMustClass (ClazzLoader.clazzTreeRoot, ClazzNode.STATUS_DECLARED)) != null) {
			if (lastNode === n) {
				break;
			}
			ClazzLoader.updateNode (n);
			lastNode = n;
		}
		lastNode = null;
		while ((n = ClazzLoader.findNextOptionalClass (ClazzNode.STATUS_DECLARED)) != null) {
			if (lastNode === n) {
				break;
			}
			ClazzLoader.updateNode (n);
			lastNode = n;
		}
		var dList = [];
		while ((n = ClazzLoader.findNextMustClass (ClazzLoader.clazzTreeRoot, ClazzNode.STATUS_DECLARED)) != null) {
			dList[dList.length] = n;
			n.status = ClazzNode.STATUS_OPTIONALS_LOADED;
		}
		while ((n = ClazzLoader.findNextOptionalClass (ClazzNode.STATUS_DECLARED)) != null) {
			dList[dList.length] = n;
			n.status = ClazzNode.STATUS_OPTIONALS_LOADED;
		}
		for (var i = 0; i < dList.length; i++) {
			// ClazzLoader.updateNode (dList[i]);
			ClazzLoader.destroyClassNode (dList[i]); // Same as above
		}
		for (var i = 0; i < dList.length; i++) {
			var optLoaded = dList[i].optionalsLoaded;
			if (optLoaded != null) {
				dList[i].optionalsLoaded = null;
				//window.setTimeout (optLoaded, 25);
				optLoaded ();
			}
		}

		if (ClazzLoader.inLoadingThreads == 0) {
			/*
			 * It seems ClazzLoader#globalLoaded is seldom overrided.
			 */
			ClazzLoader.globalLoaded ();
			//error ("end ?");
		}
	}
};

ClazzLoader.tracks = new Array ();

/* private */
ClazzLoader.checkInnerArray4Cycle = function (index, node, array, traces, paths, list) {
	var arrayLength = array.length;
	for (var i = 0; i < arrayLength; i++) {
		var n = array[i];
		if (n.status == ClazzNode.STATUS_DECLARED) {
			var listLength = list.length;
			for (var j = 0; j < listLength; j++) {
				if (list[j] === n) {
					// cycle found!
					for (var k = j; k >= -1; k--) {
						var tn = (k >= 0) ? list[k] : node;
						tn.status = ClazzNode.STATUS_OPTIONALS_LOADED;
						//ClazzLoader.updateNode (tn);
						ClazzLoader.destroyClassNode (tn); // Same as above
						var ps = tn.parents;
						for (var l = 0; l < ps.length; l++) {
							ClazzLoader.updateNode (ps[l]);
						}
						tn.parents = new Array ();
						var optLoaded = tn.optionalsLoaded;
						if (optLoaded != null) {
							tn.optionalsLoaded = null;
							//window.setTimeout (optLoaded, 25);
							optLoaded ();
						}
					}
					return true;
				}
			}
			traces[traces.length] = n;
			paths[paths.length] = index - 1;
		}
 	}
 	return false;
};

/*
 * There are classes reference cycles. Try to detect and break those cycles.
 * TODO: Reference cycles should be broken down carefully. Or there will be 
 * bugs!
 */
/* protected */
ClazzLoader.checkOptionalCycle = function (node) {
	var traces = [];
	var paths = [];
	var index = 0;
	var parentIndex = 0;
	var node = ClazzLoader.clazzTreeRoot;
	while (true) {
		var length = traces.length;
		var list = [];
		var k = parentIndex;
		while (k > 0) {
			var n = traces[k];
			list[list.length] = n;
			k = paths[k];
		}

		if (ClazzLoader.checkInnerArray4Cycle (index, node, node.musts, traces, paths, list)) {
			return true;
		}
		if (ClazzLoader.checkInnerArray4Cycle (index, node, node.optionals, traces, paths, list)) {
			return true;
		}
		
		if (index >= traces.length) {
			return false; // not found
		}
		parentIndex = paths[index];
		node = traces[index];
		index++;
	}
	return false;

	// The following implementation is using recursive way to check cycles.
	// It is considered running poor in old browsers, though not tested.
	//  
	/*
	var ts = ClazzLoader.tracks;
	var length = ts.length;
	var cycleFound = -1;
	for (var i = 0; i < ts.length; i++) {
		if (ts[i] === node && ts[i].status >= ClazzNode.STATUS_DECLARED) { 
			// Cycle is found;
			cycleFound = i;
			break;
		}
	}
	ts[ts.length] = node;
	if (cycleFound != -1) {
		//for (var i = cycleFound; i < ts.length; i++) {
		//	alert (ts[i].name + ":::" + ts[i].status);
		//}
		//alert ("===");
		for (var i = cycleFound; i < ts.length; i++) {
			ts[i].status = ClazzNode.STATUS_OPTIONALS_LOADED;
			//ClazzLoader.updateNode (ts[i]);
			ClazzLoader.destroyClassNode (ts[i]); // Same as above
			for (var k = 0; k < ts[i].parents.length; k++) {
				//log ("updating parent ::" + ts[i].parents[k].name);
				ClazzLoader.updateNode (ts[i].parents[k]);
			}
			ts[i].parents = new Array ();
			var optLoaded = ts[i].optionalsLoaded;
			if (optLoaded != null) {
				ts[i].optionalsLoaded = null;
				//alert ("check cycle.");
				//window.setTimeout (optLoaded, 25);
				optLoaded ();
			}
		}
		ts.length = 0;
		return true;
	}
	for (var i = 0; i < node.musts.length; i++) {
		if (node.musts[i].status == ClazzNode.STATUS_DECLARED) {
			if (ClazzLoader.checkOptionalCycle (node.musts[i])) {
				return true;
			}
		}
	}
	for (var i = 0; i < node.optionals.length; i++) {
		if (node.optionals[i].status == ClazzNode.STATUS_DECLARED) {
			if (ClazzLoader.checkOptionalCycle (node.optionals[i])) {
				return true;
			}
		}
	}
	ts.length = length;
	return false;
	// */
};

/**
 * Update the dependency tree nodes recursively.
 */
/* private */
/*-# 
 # updateNode -> uN 
 #
 # isMustsOK -> mOK
 # isOptionsOK -> oOK
 #-*/
ClazzLoader.updateNode = function (node) {
	if (node.name == null 
			|| node.status >= ClazzNode.STATUS_OPTIONALS_LOADED) {
		ClazzLoader.destroyClassNode (node);
		return;
	}
	var isMustsOK = false;
	if (node.musts == null || node.musts.length == 0 
			|| node.declaration == null) {
		//alert (node.name + " no musts");
		isMustsOK = true;
	} else {
		//alert ("checking " + node.musts.length + " musts");
		isMustsOK = true;
		var mustLength = node.musts.length;
		for (var i = mustLength - 1; i >= 0; i--) {
			/*
			 * Soheil reported a strange bug:
The problem here is that, Widget functions and field are not added to
the Control !
Control is not an instance of Widget! I got an error that says
this.checkOrientation is not a function ( in Control's constructor).

When I changed the order of Drawable and Widget in the definition of
Control's constructor, the line bellow, it works fine!
$_L(["$wt.graphics.Drawable","$wt.widgets.Widget"],"$wt.widgets.Control",
... : has the error
$_L(["$wt.widgets.Widget","$wt.graphics.Drawable"],"$wt.widgets.Control", 
... : does not have the error 
			 *
			 * In the bug fix procedure, it's known that node.musts will
			 * be changed according to the later codes:
			 * ClazzLoader.updateNode (n); // (see about 20 lines below)
			 * 
			 * As node.musts may become smaller, node.musts should be 
			 * traversed in reverse order, so all musts are checked.
			 *
			 * TODO:
			 */
			var n = node.musts[i];
			if (n.status < ClazzNode.STATUS_DECLARED) {
				if (ClazzLoader.isClassDefined (n.name)) {
					var nns = new Array (); // for optional loaded events!
					n.status = ClazzNode.STATUS_OPTIONALS_LOADED;
					// ClazzLoader.updateNode (n); // musts may be changed
					ClazzLoader.destroyClassNode (n); // Same as above
					/*
					 * For those classes within one *.js file, update
					 * them synchronously.
					 */
					if (n.declaration != null 
							&& n.declaration.clazzList != null) {
						var list = n.declaration.clazzList;
						for (var j = 0; j < list.length; j++) {
							var nn = ClazzLoader.findClass (list[j]);
							if (nn.status != ClazzNode.STATUS_OPTIONALS_LOADED
									&& nn !== n) {
								nn.status = n.status;
								nn.declaration = null;
								// ClazzLoader.updateNode (nn);
								// Same as above
								ClazzLoader.destroyClassNode (nn);
								if (nn.optionalsLoaded != null) {
									nns[nns.length] = nn;
								}
							}
						}
						n.declaration = null;
					}
					if (n.optionalsLoaded != null) {
						nns[nns.length] = n;
					}
					for (var j = 0; j < nns.length; j++) {
						var optLoaded = nns[j].optionalsLoaded;
						if (optLoaded != null) {
							nns[j].optionalsLoaded = null;
							//window.setTimeout (optLoaded, 25);
							optLoaded ();
						}
					}
				} else { // why not break? -Zhou Renjian @ Nov 28, 2006
					if (n.status == ClazzNode.STATUS_CONTENT_LOADED) {
						// lazy loading script doesn't work! - 2/26/2007
						ClazzLoader.updateNode (n); // musts may be changed
					}
					if (n.status < ClazzNode.STATUS_DECLARED) {
						isMustsOK = false;
					}
				}
				// fix the above strange bug
				if (node.musts.length != mustLength) {
					// length changed!
					mustLength = node.musts.length;
					i = mustLength; // -1
					isMustsOK = true;
				}
			}
		}
	}
	/*
	var scripts = document.getElementsByTagName ("SCRIPT");
	var count = 0;
	for (var i = 0; i < scripts.length; i++) {
		var s = scripts[i];
		if (s.onload != null) {
			log ("---:---" + s.src);
			count++;
		}
	}
	alert ("There are " + count + " script loading ...");
	*/
	if (isMustsOK) {
		if (node.status < ClazzNode.STATUS_DECLARED) {
			var decl = node.declaration;
			if (decl != null) {
				if (!decl.executed) {
					decl ();
					decl.executed = true;
				//} else {
				//	decl ();
				}
			}
			node.status = ClazzNode.STATUS_DECLARED;
			if (ClazzLoader.definedClasses != null) {
				ClazzLoader.definedClasses[node.name] = true;
			}
			ClazzLoader.scriptInited (node.path);
					/*
					 * For those classes within one *.js file, update
					 * them synchronously.
					 */
					if (node.declaration != null 
							&& node.declaration.clazzList != null) {
						var list = node.declaration.clazzList;
						for (var j = 0; j < list.length; j++) {
							var nn = ClazzLoader.findClass (list[j]);
							if (nn.status != ClazzNode.STATUS_DECLARED
									&& nn !== node) {
			nn.status = ClazzNode.STATUS_DECLARED;
			if (ClazzLoader.definedClasses != null) {
				ClazzLoader.definedClasses[nn.name] = true;
			}
			ClazzLoader.scriptInited (nn.path);
							}
						}
					}
		}
		var level = ClazzNode.STATUS_DECLARED;
		var isOptionsOK = false;
		if (((node.optionals == null || node.optionals.length == 0) 
				&& (node.musts == null || node.musts.length == 0))
				|| (node.status > ClazzNode.STATUS_KNOWN 
				&& node.declaration == null)) {
			isOptionsOK = true;
		} else {
			isOptionsOK = true;
			for (var i = 0; i < node.musts.length; i++) {
				var n = node.musts[i];
				if (n.status < ClazzNode.STATUS_OPTIONALS_LOADED) {
					isOptionsOK = false;
					break;
				}
			}
			if (isOptionsOK) {
				for (var i = 0; i < node.optionals.length; i++) {
					var n = node.optionals[i];
					if (n.status < ClazzNode.STATUS_OPTIONALS_LOADED) {
						isOptionsOK = false;
						break;
					}
				}
			}
		}
		if (isOptionsOK) {
			level = ClazzNode.STATUS_OPTIONALS_LOADED;
			node.status = level;
			ClazzLoader.scriptCompleted (node.path);
			var optLoaded = node.optionalsLoaded;
			if (optLoaded != null) {
				node.optionalsLoaded = null;
				//window.setTimeout (optLoaded, 25);
				optLoaded ();
				if (!ClazzLoader.keepOnLoading) {
					return false;
				}
			}
			ClazzLoader.destroyClassNode (node);
					/*
					 * For those classes within one *.js file, update
					 * them synchronously.
					 */
					if (node.declaration != null 
							&& node.declaration.clazzList != null) {
						var list = node.declaration.clazzList;
						for (var j = 0; j < list.length; j++) {
							var nn = ClazzLoader.findClass (list[j]);
							if (nn.status != level && nn !== node) {
			nn.status = level;
			nn.declaration = null;
			ClazzLoader.scriptCompleted (nn.path);
			var optLoaded = nn.optionalsLoaded;
			if (optLoaded != null) {
				nn.optionalsLoaded = null;
				//window.setTimeout (optLoaded, 25);
				optLoaded ();
				if (!ClazzLoader.keepOnLoading) {
					return false;
				}
			}
			ClazzLoader.destroyClassNode (node);
							}
						}
					}
		}
		
		// ClazzLoader.updateParents (node, level);
		if (node.parents == null || node.parents.length == 0) {
			return;
		}
		for (var i = 0; i < node.parents.length; i++) {
			var p = node.parents[i];
			if (p.status >= level) {
				continue;
			}
			ClazzLoader.updateNode (p);
		}
		if (level == ClazzNode.STATUS_OPTIONALS_LOADED) {
			node.parents = new Array ();
		}
	}
};

/* private */
/*-# findNextMustClass -> fNM #-*/
ClazzLoader.findNextMustClass = function (node, status) {
	var trace = new Object ();
	trace.pool = new Array ();
	var pool = new Array ();
	pool[0] = ClazzLoader.clazzTreeRoot;
	while (true) {
		for (var k = 0; k < pool.length; k++) {
			var node = pool[k];
			if (node.name != null) {
				trace[node.name] = true;
			}
			/*
			if (ClazzLoader.isClassDefined (node.name)) {
				node.status = ClazzNode.STATUS_OPTIONALS_LOADED;
			}
			*/
			if (node.musts != null && node.musts.length != 0) {
				for (var i = 0; i < node.musts.length; i++) {
					var n = node.musts[i];
					if (trace[n.name]) {
						continue;
					}
					if (n.status == status && (status != ClazzNode.STATUS_KNOWN 
							|| ClazzLoader.loadedScripts[n.path] != true)
							&& (status == ClazzNode.STATUS_DECLARED
							|| !ClazzLoader.isClassDefined (n.name))) {
						return n;
					} else {
						trace.pool[trace.pool.length] = n; // for next level
					}
				}
			}
			if (node.status == status && (status != ClazzNode.STATUS_KNOWN 
					|| ClazzLoader.loadedScripts[node.path] != true)
					&& (status == ClazzNode.STATUS_DECLARED
					|| !ClazzLoader.isClassDefined (node.name))) {
				return node;
			}
			if (node.optionals != null && node.optionals.length != 0) {
				for (var i = 0; i < node.optionals.length; i++) {
					var n = node.optionals[i];
					if (trace[n.name]) {
						continue;
					}
					if (n.status != ClazzNode.STATUS_DECLARED
							&& n.status != ClazzNode.STATUS_OPTIONALS_LOADED) {
						trace.pool[trace.pool.length] = n; // for next level
					}
				}
			}
		} // end of for pool
		
		if (trace.pool.length <= 0) {
			break;
		}
		pool = trace.pool;
		trace.pool = new Array ();
	}
	return null;
};

/*
 * Be used to record already used random numbers. And next new random
 * number should not be in the property set.
 */
/* private */
/*-# usedRandoms -> Rms #-*/
ClazzLoader.usedRandoms = {};
ClazzLoader.usedRandoms["r" + 0.13412] = 0.13412;

/* private */
/*-# findNextOptionalClass -> fNO #-*/
ClazzLoader.findNextOptionalClass = function (status) {
	var rnd = 0;
	while (true) { // try to generate a never used random number
		rnd = Math.random ();
		var s = "r" + rnd;
		if (ClazzLoader.usedRandoms[s] != rnd) {
			ClazzLoader.usedRandoms[s] = rnd;
			break;
		}
	}
	ClazzLoader.clazzTreeRoot.random = rnd;
	var node = ClazzLoader.clazzTreeRoot;
	return ClazzLoader.findNodeNextOptionalClass (node, status);
};

/* private */
/*-# findNodeNextOptionalClass -> fNNO #-*/
ClazzLoader.findNodeNextOptionalClass = function (node, status) {
	var rnd = ClazzLoader.clazzTreeRoot.random;
	// search musts first
	if (node.musts != null && node.musts.length != 0) {
		var n = ClazzLoader.searchClassArray (node.musts, rnd, status);
		if (n != null && (status != ClazzNode.STATUS_KNOWN 
				|| ClazzLoader.loadedScripts[n.path] != true)
				&& (status == ClazzNode.STATUS_DECLARED
				|| !ClazzLoader.isClassDefined (n.name))) {
			return n;
		}
	}
	// search optionals second
	if (node.optionals != null && node.optionals.length != 0) {
		var n = ClazzLoader.searchClassArray (node.optionals, rnd, status);
		if (n != null && (status != ClazzNode.STATUS_KNOWN 
				|| ClazzLoader.loadedScripts[n.path] != true)
				&& (status == ClazzNode.STATUS_DECLARED
				|| !ClazzLoader.isClassDefined (n.name))) {
			return n;
		}
	}
	// search itself
	if (node.status == status && (status != ClazzNode.STATUS_KNOWN 
			|| ClazzLoader.loadedScripts[node.path] != true)
			&& (status == ClazzNode.STATUS_DECLARED
			|| !ClazzLoader.isClassDefined (node.name))) {
		return node;
	}
	return null;
};

/* private */
ClazzLoader.searchClassArray = function (arr, rnd, status) {
	for (var i = 0; i < arr.length; i++) {
		var n = arr[i];
		if (n.status == status && (status != ClazzNode.STATUS_KNOWN 
				|| ClazzLoader.loadedScripts[n.path] != true)
				&& (status == ClazzNode.STATUS_DECLARED
				|| !ClazzLoader.isClassDefined (n.name))) {
			return n;
		} else {
			if (n.random == rnd) {
				continue;
			}
			n.random = rnd; // mark as visited!
			var nn = ClazzLoader.findNodeNextOptionalClass (n, status);
			if (nn != null) {
				return nn;
			}
		}
	}
	return null;
};

/**
 * This map variable is used to mark that *.js is correctly loaded.
 * In IE, ClazzLoader has defects to detect whether a *.js is correctly
 * loaded or not, so inner loading mark is used for detecting.
 */
/* private */
/*-# innerLoadedScripts -> ilss #-*/
ClazzLoader.innerLoadedScripts = new Object ();

/**
 * This variable is used to keep the latest interactive SCRIPT element.
 */
/* private */
/*-# interactiveScript -> itst #-*/
ClazzLoader.interactiveScript = null;

/**
 * IE and Firefox/Mozilla are different in using <SCRIPT> tag to load *.js.
 */
/* private */
ClazzLoader.needOnloadCheck = false;

/**
 * Check the interactive status of SCRIPT elements to determine whether a
 * *.js file is correctly loaded or not.
 *
 * Only make senses for IE.
 */
/* protected */
ClazzLoader.checkInteractive = function () {
	//alert ("checking...");
	if (!ClazzLoader.needOnloadCheck) {
		return;
	}
	var is = ClazzLoader.interactiveScript;
	if (is != null && is.readyState == "interactive") { // IE
		return;
	}
	ClazzLoader.interactiveScript = null;
	var ss = document.getElementsByTagName ("SCRIPT");
	for (var i = 0; i < ss.length; i++) {
		if (ss[i].readyState == "interactive"
				&& ss[i].onreadystatechange != null) { // IE
			ClazzLoader.interactiveScript = ss[i];
			ClazzLoader.innerLoadedScripts[ss[i].src] = true;
		} else if (ClazzLoader.isOpera) { // Opera
			if (ss[i].readyState == "loaded" 
					&& ss[i].src != null && ss[i].src.length != 0) {
				ClazzLoader.innerLoadedScripts[ss[i].src] = true;
			}
		}
	}
};

/**
 * This method will be called in almost every *.js generated by Java2Script
 * compiler.
 */
/* protected */
ClazzLoader.load = function (musts, clazz, optionals, declaration) {
	//alert ("Loading " + clazz + " ...");
	ClazzLoader.checkInteractive ();

	if (clazz instanceof Array) {
		ClazzLoader.unwrapArray (clazz);
		for (var i = 0; i < clazz.length; i++) {
			ClazzLoader.load (musts, clazz[i], optionals, declaration, clazz);
		}
		return;
	}
	if (clazz.charAt (0) == '$') {
		clazz = "org.eclipse.s" + clazz.substring (1);
	}
	
	var node = ClazzLoader.mapPath2ClassNode["#" + clazz];
	if (node == null) { // ClazzLoader.load called inside *.z.js?
		var n = ClazzLoader.findClass (clazz);
		if (n != null) {
			node = n;
		} else {
			node = new ClazzNode ();
		}
		//*
		//node = new ClazzNode ();
		node.name = clazz;
		var pp = ClazzLoader.classpathMap["#" + clazz];
		if (pp == null) { // TODO: Remove this test in final release
			log (clazz);
			error ("Java2Script implementation error! Please report this bug!");
		}
		//node.path = ClazzLoader.lastScriptPath;
		node.path = pp;
		//error ("..." + node.path + "//" + node.name);
		ClazzLoader.mappingPathNameNode (node.path, clazz, node);
		node.status = ClazzNode.STATUS_KNOWN;
		ClazzLoader.addChildClassNode(ClazzLoader.clazzTreeRoot, node, -1);
		//log (clazz);
		//alert ("[Java2Script] ClazzLoader#load is not executed correctly!");
		//*/
		/*
		if (declaration != null) {
			declaration ();
		}
		alert ("[Java2Script] ClazzLoader#load is not executed correctly!");
		return;
		//*/
	}
	//var okToInit = true;
	if (musts != null && musts.length != 0) {
		ClazzLoader.unwrapArray (musts);
		for (var i = 0; i < musts.length; i++) {
			var name = musts[i];
			if (name == null || name.length == 0) {
				continue;
			}
			var n = ClazzLoader.findClass (name);
			if (ClazzLoader.isClassDefined (name) 
					|| ClazzLoader.isClassExcluded (name)) {
				if (n != null // non-system classes
						&& n.status != ClazzNode.STATUS_OPTIONALS_LOADED) {
					ClazzLoader.addChildClassNode (node, n, 1);
				}
				continue;
			}
			//okToInit = false;
			if (n == null) {
				n = new ClazzNode ();
				n.name = musts[i];
				n.status = ClazzNode.STATUS_KNOWN;
				ClazzLoader.addChildClassNode (node, n, 1);
			} else {
				if (n.status != ClazzNode.STATUS_OPTIONALS_LOADED) {
					ClazzLoader.addChildClassNode (node, n, 1);
				}
			}
		}
	}

	/*
	 * The following lines are commented intentionally.
	 * So lots of class is not declared until there is a must?
	 *
	 * TODO: Test the commented won't break up the dependency tree.
	 */
	/*
	if (okToInit) {
		declaration ();
		node.declaration = null;
		node.status = ClazzNode.STATUS_DECLARED;
	} else {
		node.declaration = declaration;
	}
	*/
	if (arguments.length == 5 && declaration != null) {
		declaration.status = node.status;
		declaration.clazzList = arguments[4];
	}
	node.declaration = declaration;
	if (declaration != null) {
		node.status = ClazzNode.STATUS_CONTENT_LOADED;
	}

	//var isOptionalsOK = true;
	if (optionals != null && optionals.length != 0) {
		ClazzLoader.unwrapArray (optionals);
		for (var i = 0; i < optionals.length; i++) {
			var name = optionals[i];
			if (name == null || name.length == 0) {
				continue;
			}
			var n = ClazzLoader.findClass (name);
			if (ClazzLoader.isClassDefined (name) 
					|| ClazzLoader.isClassExcluded (name)) {
				if (n != null // non-system classes
						&& n.status != ClazzNode.STATUS_OPTIONALS_LOADED) {
					ClazzLoader.addChildClassNode (node, n, -1);
				}
				continue;
			}
			//isOptionalsOK = false;
			if (n == null) {
				n = new ClazzNode ();
				n.name = optionals[i];
				n.status = ClazzNode.STATUS_KNOWN;
				ClazzLoader.addChildClassNode (node, n, -1);
			} else {
				if (n.status != ClazzNode.STATUS_OPTIONALS_LOADED) {
					ClazzLoader.addChildClassNode (node, n, -1);
				}
			}
		}
	}
};

/*
 * Try to be compatiable of Clazz
 */
if (window["Clazz"] != null) {
	Clazz.load = ClazzLoader.load;
	if (window["$_L"] != null) {
		$_L = Clazz.load;
	}
}

/**
 *
 */
/* protected */
/*-# findClass -> fC #-*/
ClazzLoader.findClass = function (clazzName) {
	var rnd = 0;
	while (true) { // try to generate a never used random number
		rnd = Math.random ();
		var s = "r" + rnd;
		if (ClazzLoader.usedRandoms[s] != rnd) {
			ClazzLoader.usedRandoms[s] = rnd;
			break;
		}
	}
	ClazzLoader.clazzTreeRoot.random = rnd;
	return ClazzLoader.findClassUnderNode (clazzName, 
			ClazzLoader.clazzTreeRoot);
};

/* private */
/*-# findClassUnderNode -> fCU #-*/
ClazzLoader.findClassUnderNode = function (clazzName, node) {
	var rnd = ClazzLoader.clazzTreeRoot.random;
	if (node.name == clazzName) {
		return node;
	}
	// musts first
	for (var i = 0; i < node.musts.length; i++) {
		var n = node.musts[i];
		if (n.name == clazzName) {
			return n;
		}
		if (n.random == rnd) {
			continue;
		}
		n.random = rnd;
		var nn = ClazzLoader.findClassUnderNode (clazzName, n);
		if (nn != null) {
			return nn;
		}
	}
	// optionals last
	for (var i = 0; i < node.optionals.length; i++) {
		var n = node.optionals[i];
		if (n.name == clazzName) {
			return n;
		}
		if (n.random == rnd) {
			continue;
		}
		n.random = rnd;
		var nn = ClazzLoader.findClassUnderNode (clazzName, n);
		if (nn != null) {
			return nn;
		}
	}
	return null;
};

/**
 * Map different class to the same path! Many classes may be packed into
 * a *.z.js already.
 *
 * @path *.js path
 * @name class name
 * @node ClazzNode object
 */
/* private */
/*-# mappingPathNameNode -> mpp #-*/
ClazzLoader.mappingPathNameNode = function (path, name, node) {
	var map = ClazzLoader.mapPath2ClassNode;
	var keyPath = "@" + path;
	var v = map[keyPath];
	if (v != null) {
		if (v instanceof Array) {
			var existed = false;
			for (var i = 0; i < v.length; i++) {
				if (v[i].name == name) {
					existed = true;
					break;
				}
			}
			if (!existed) {
				v[v.length] = node;
			}
		} else {
			var arr = new Array ();
			arr[0] = v;
			arr[1] = node;
			map[keyPath] = arr;
		}
	} else {
		map[keyPath] = node;
	}
	map["#" + name] = node;
};

/* protected */
/*-# loadClassNode -> lCN #-*/
ClazzLoader.loadClassNode = function (node) {
	var name = node.name;
	if (!ClazzLoader.isClassDefined (name) 
			&& !ClazzLoader.isClassExcluded (name)) {
		var path = ClazzLoader.getClasspathFor (name/*, true*/);
		node.path = path;
		ClazzLoader.mappingPathNameNode (path, name, node);
		if (!ClazzLoader.loadedScripts[path]) {
			ClazzLoader.loadScript (path);
			return true;
		}
	}
	return false;
};


/* protected */
ClazzLoader.runtimeKeyClass = "java.lang.String";

/**
 * Queue used to store classes before key class is loaded.
 */
/* private */
ClazzLoader.queueBe4KeyClazz = new Array ();

/**
 * Return J2SLib base path from existed SCRIPT src attribute.
 */
/* private */
/*-# getJ2SLibBase -> gLB #-*/
ClazzLoader.getJ2SLibBase = function () {
	var o = window["j2s.lib"];
	if (o != null) {
		if (o.base == null) {
			o.base = "http://archive.java2script.org/";
		}
		return o.base + (o.alias ? o.alias : (o.version ? o.version : "1.0.0")) + "/";
	}
	var ss = document.getElementsByTagName ("SCRIPT");
	for (var i = 0; i < ss.length; i++) {
		var src = ss[i].src;
		var idx = src.indexOf ("j2slib.z.js"); // consider it as key string!
		if (idx != -1) {
			return src.substring (0, idx);
		}
		idx = src.indexOf ("j2slibcore.z.js"); // consider it as key string!
		if (idx != -1) {
			return src.substring (0, idx);
		}
		var base = ClazzLoader.classpathMap["@java"];
		if (base != null) {
			return base;
		}
		idx = src.indexOf ("java/lang/ClassLoader.js"); // may be not packed yet
		if (idx != -1) {
			return src.substring (0, idx);
		}
	}
	return null;
};

/* private static */
/*-# J2SLibBase -> JLB #-*/
ClazzLoader.J2SLibBase = null;
/*-# fastGetJ2SLibBase -> fgLB #-*/
ClazzLoader.fastGetJ2SLibBase = function () {
	if (ClazzLoader.J2SLibBase == null) {
		ClazzLoader.J2SLibBase = ClazzLoader.getJ2SLibBase ();
	}
	return ClazzLoader.J2SLibBase;
};

/*
 * Check whether given package's classpath is setup or not.
 * Only "java" and "org.eclipse.swt" are accepted in argument.
 */
/* private */
/*-# assurePackageClasspath -> acp #-*/
ClazzLoader.assurePackageClasspath = function (pkg) {
	var r = window[pkg + ".registered"];
	if (r != false && r != true && ClazzLoader.classpathMap["@" + pkg] == null) {
		window[pkg + ".registered"] = false;
		var base = ClazzLoader.fastGetJ2SLibBase ();
		if (base == null) {
			base = "http://archive.java2script.org/1.0.0/"; // only after 1.0.0
		}
		ClazzLoader.packageClasspath (pkg, base, true);
	}
};

/**
 * Load the given class ant its related classes.
 */
/* public */
ClazzLoader.loadClass = function (name, optionalsLoaded, forced, async) {
	if (typeof optionalsLoaded == "boolean") {
		return Clazz.evalType (name);
	}

	/*
	 * Make sure that
	 * ClazzLoader.packageClasspath ("java", base, true); 
	 * is called before any ClazzLoader#loadClass is called.
	 */
	ClazzLoader.assurePackageClasspath ("java");
	var swtPkg = "org.eclipse.swt";
	if (name.indexOf (swtPkg) == 0 || name.indexOf ("$wt") == 0) {
		ClazzLoader.assurePackageClasspath (swtPkg);
	}
	if (name.indexOf ("junit") == 0) {
		ClazzLoader.assurePackageClasspath ("junit");
	}

	/*
	 * Any ClazzLoader#loadClass calls will be queued until java.* core classes
	 * is loaded.
	 */
	ClazzLoader.keepOnLoading = true;
	if (!forced && ((ClazzLoader.pkgRefCount != 0 
			&& name.lastIndexOf (".package") != name.length - 8)
			|| (!ClazzLoader.isClassDefined (ClazzLoader.runtimeKeyClass) 
			&& name.indexOf ("java.") != 0))) {
		var qbs = ClazzLoader.queueBe4KeyClazz;
		qbs[qbs.length] = [name, optionalsLoaded];
		return;
	}
	if (!ClazzLoader.isClassDefined (name) 
			&& !ClazzLoader.isClassExcluded (name)) {
		var path = ClazzLoader.getClasspathFor (name/*, true*/);
		var existed = ClazzLoader.loadedScripts[path];
		var existedItem = null;
		var qq = ClazzLoader.classQueue;
		if (!existed) {
			for (var i = qq.length - 1; i >= 0; i--) {
				if (qq[i].path == path || qq[i].name == name) {
					existed = true;
					existedItem = qq[i];
				}
			}
		}
		var n = null;
		var checked = false;
		if (existed && optionalsLoaded != null) {
			n = ClazzLoader.findClass (name);
			checked = true;
			if (n == null) {
				existed = false; // another class in the same *.z.js path
			}
		}
		if (!existed) {
			if (Clazz.unloadedClasses[name] != null && !checked) {
				n = ClazzLoader.findClass (name);
			}
			if (n == null) {
				n = new ClazzNode ();
			}
			n.name = name;
			n.path = path;
			ClazzLoader.mappingPathNameNode (path, name, n);
			n.optionalsLoaded = optionalsLoaded;
			n.status = ClazzNode.STATUS_KNOWN;
			/*-# needBeingQueued -> nQ #-*/
			var needBeingQueued = false;
			//error (qq.length + ":" + qq);
			//error (path);
			for (var i = qq.length - 1; i >= 0; i--) {
				if (qq[i].status != ClazzNode.STATUS_OPTIONALS_LOADED) {
					needBeingQueued = true;
					break;
				}
			}
			if (path.lastIndexOf ("package.js") == path.length - 10) {//forced
				// push class to queue
				var inserted = false;
				for (var i = qq.length - 1; i >= 0; i--) {
					var itemName = qq[i].name;
					if (itemName.lastIndexOf ("package.js") == itemName.length - 10) {
						qq[i + 1] = n;
						inserted = true;
						break;
					}
					qq[i + 1] = qq[i];
				}
				if (!inserted) {
					qq[0] = n;
				}
			} else if (needBeingQueued) {
				qq[qq.length] = n;
			}
			if (!needBeingQueued) { // can be loaded directly
				/*-# bakEntryClassLoading -> bkECL #-*/
				var bakEntryClassLoading = false;
				if (optionalsLoaded != null) {
					bakEntryClassLoading = ClazzLoader.isLoadingEntryClass;
					ClazzLoader.isLoadingEntryClass = true;
				}
				ClazzLoader.addChildClassNode(ClazzLoader.clazzTreeRoot, n, 1);
				if (!ClazzLoader.loadedScripts[n.path]) {
					ClazzLoader.loadScript (n.path);
				}
				if (optionalsLoaded != null) {
					ClazzLoader.isLoadingEntryClass = bakEntryClassLoading;
				}
			}
		} else if (optionalsLoaded != null) {
			if (!checked) {
				n = ClazzLoader.findClass (name);
			}
			if (n != null) {
				if (n.optionalsLoaded == null) {
					n.optionalsLoaded = optionalsLoaded;
				} else if (optionalsLoaded != n.optionalsLoaded) {
					n.optionalsLoaded = (function (oF, nF) {
						return function () {
							oF();
							nF();
						};
					}) (n.optionalsLoaded, optionalsLoaded);
				}
			} else if (existedItem != null) {
				if (existedItem[1] == null) {
					existedItem[1] = optionalsLoaded;
				} else if (optionalsLoaded != existedItem[1]) {
					existedItem[1] = (function (oF, nF) {
						return function () {
							oF();
							nF();
						};
					}) (existedItem[1], optionalsLoaded);
				}
			} // else already be checked, should not reach here
		}
	} else if (optionalsLoaded != null && ClazzLoader.isClassDefined (name)) {
		var nn = ClazzLoader.findClass (name);
		if (nn == null || nn.status >= ClazzNode.STATUS_OPTIONALS_LOADED) {
			/*if (nn != null) {
				ClazzLoader.destroyClassNode (nn);
			}*/
			if (async) {
				window.setTimeout (optionalsLoaded, 25);
			} else {
				optionalsLoaded ();
			}
		} else { // should be called later
			window.setTimeout (optionalsLoaded, 25);
		}
	}
	
};

/**
 * Load the application by the given class name and run its static main method.
 */
/* public */
$w$ = ClazzLoader.loadJ2SApp = function (clazz, args, loaded) {
	if (clazz == null) {
		return;
	}
	var clazzStr = clazz;
	if (clazz.charAt (0) == '$') {
		clazzStr = "org.eclipse.s" + clazz.substring (1);
	}
	var idx = -1;
	if ((idx = clazzStr.indexOf ("@")) != -1) {
		var path = clazzStr.substring (idx + 1);
		ClazzLoader.setPrimaryFolder (path); // TODO: No primary folder?
		clazzStr = clazzStr.substring (0, idx);
		idx = clazzStr.lastIndexOf (".");
		if (idx != -1) {
			var pkgName = clazzStr.substring (0, idx);
			ClazzLoader.packageClasspath (pkgName, path);
		}
	}
	var agmts = args;
	if (agmts == null || !(agmts instanceof Array)) {
		agmts = [];
	}
	var afterLoaded = loaded;
	if (afterLoaded == null) {
		afterLoaded = (function (clazzName, argv) {
			return function () {
				Clazz.evalType (clazzName).main (argv);
			};
		}) (clazzStr, agmts);
	} else {
		afterLoaded = loaded (clazzStr, agmts);
	}
	ClazzLoader.loadClass (clazzStr, afterLoaded);
};
/**
 * Load JUnit tests by the given class name.
 */
/* public */
$u$ = ClazzLoader.loadJUnit = function (clazz, args) {
	var afterLoaded = function (clazzName, argv) {
		return function () {
			ClazzLoader.loadClass ("junit.textui.TestRunner", function () {
				junit.textui.TestRunner.run (Clazz.evalType (clazzName));
			});
		};
	};
	ClazzLoader.loadJ2SApp (clazz, args, afterLoaded);
};

/* private */
ClazzLoader.runtimeLoaded = function () {
	if (ClazzLoader.pkgRefCount != 0 
			|| !ClazzLoader.isClassDefined (ClazzLoader.runtimeKeyClass)) {
		return;
	}
	var qbs = ClazzLoader.queueBe4KeyClazz;
	for (var i = 0; i < qbs.length; i++) {
		ClazzLoader.loadClass (qbs[i][0], qbs[i][1]);
	}
	ClazzLoader.queueBe4KeyClazz = [];
	/*
	 * Should not set to empty function! Some later package may need this
	 * runtimeLoaded function. For example, lazily loading SWT package may
	 * require this runtimeLoaded function. 
	 * -- zhou renjian @ Dec 17, 2006
	 */
	// ClazzLoader.runtimeLoaded = function () {};
};

/*
 * Load those key *.z.js. This *.z.js will be surely loaded before other 
 * queued *.js.
 */
/* public */
ClazzLoader.loadZJar = function (zjarPath, keyClazz) {
	var keyClass = keyClazz;
	var isArr = (keyClazz instanceof Array);
	if (isArr) {
		keyClass = keyClazz[keyClazz.length - 1];
	}
	ClazzLoader.jarClasspath (zjarPath, isArr ? keyClazz
			: [keyClazz]);
	if (keyClazz == ClazzLoader.runtimeKeyClass) {
		ClazzLoader.loadClass (keyClass, ClazzLoader.runtimeLoaded, true);
	} else {
		ClazzLoader.loadClass (keyClass, null, true);
	}
};

/**
 * The method help constructing the multiple-binary class dependency tree.
 */
/* private */
/*-# addChildClassNode -> addCCN #-*/
ClazzLoader.addChildClassNode = function (parent, child, type) {
	var existed = false;
	var arr = null;
	if (type == 1) {
		arr = parent.musts;
	} else {
		arr = parent.optionals;
	}
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].name == child.name) {
			existed = true;
			break;
		}
	}
	if (!existed) {
		/*
		if (type != 1) { // test cyclic optionals
			existed = false;
			for (var j = 0; j < child.optionals.length; j++) {
				if (child.optionals[j].name == parent.name) {
					existed = true;
					break;
				}
			}
		}
		*/
		/* above existed tests are commented */
		//if (!existed) {
			arr[arr.length] = child;
			var swtPkg = "org.eclipse.swt";
			if (child.name.indexOf (swtPkg) == 0 
					|| child.name.indexOf ("$wt") == 0) {
				window["swt.lazy.loading.callback"] = ClazzLoader.swtLazyLoading;
				ClazzLoader.assurePackageClasspath (swtPkg);
			}
			if (ClazzLoader.isLoadingEntryClass 
					&& child.name.indexOf ("java") != 0 
					&& child.name.indexOf ("net.sf.j2s.ajax") != 0) {
				if (ClazzLoader.besidesJavaPackage) {
					ClazzLoader.isLoadingEntryClass = false;
				}
				ClazzLoader.besidesJavaPackage = true;
			}
		//}
	}
	existed = false;
	for (var i = 0; i < child.parents.length; i++) {
		if (child.parents[i].name == parent.name) {
			existed = true;
			break;
		}
	}
	if (!existed && parent.name != null && parent != ClazzLoader.clazzTreeRoot
			&& parent != child) {
		child.parents[child.parents.length] = parent;
	}
};

/*
 * Some SWT classes may already skip ClazzLoader#tryToLoadNext when it's
 * detected that SWT is in lazy loading mode. Here it will try to re-execute
 * those ClazzLoader#tryToLoadNext
 */
/* private */
ClazzLoader.swtLazyLoading = function () {
	ClazzLoader.lockQueueBe4SWT = false;
	var qbs = ClazzLoader.queueBe4SWT;
	for (var i = 0; i < qbs.length; i++) {
		ClazzLoader.tryToLoadNext (qbs[i]);
	}
	ClazzLoader.queueBe4SWT  = [];
};

/* private */
ClazzLoader.removeFromArray = function (node, arr) {
	if (arr == null || node == null) {
		return false;
	}
	/*var isPackedJS = (node.path != null
			&& node.path.indexOf (".z.js") == node.path.length - 5);
	log ("... remove " + node.path + " :: " + isPackedJS);*/
	var j = 0;
	for (var i = 0; i < arr.length; i++) {
		if (!(arr[i] === node/* || (isPackedJS && arr[i].path == node.path)*/)) {
			if (j < i) {
				arr[j] = arr[i];
			}
			j++;
		}
	}
	arr.length = j;
	return false;
};

/* private */
/*-# destroyClassNode -> dCN #-*/
ClazzLoader.destroyClassNode = function (node) {
	//log (node.name + " // " + node.path);
	var parents = node.parents;
	if (parents != null) {
		for (var k = 0; k < parents.length; k++) {
			if (!ClazzLoader.removeFromArray (node, parents[k].musts)) {
				ClazzLoader.removeFromArray (node, parents[k].optionals);
			}
		}
	}
	/*
	if (node.optionalsLoaded != null) {
		node.optionalsLoaded ();
	}
	if (!ClazzLoader.removeFromArray (node, ClazzLoader.clazzTreeRoot.musts)) {
		ClazzLoader.removeFromArray (node, ClazzLoader.clazzTreeRoot.optionals);
	}
	*/
};

/* For hotspot and unloading */

/* protected */
ClazzLoader.unloadClassExt = function (qClazzName) {
	if (ClazzLoader.definedClasses != null) {
		ClazzLoader.definedClasses[qClazzName] = false;
	}
	if (ClazzLoader.classpathMap["#" + qClazzName] != null) {
		var pp = ClazzLoader.classpathMap["#" + qClazzName];
		ClazzLoader.classpathMap["#" + qClazzName] = null;
		var arr = ClazzLoader.classpathMap["$" + pp];
		var removed = false;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == qClazzName) {
				for (var j = i; j < arr.length - 1; j++) {
					arr[j] = arr[j + 1];
				}
				arr.length--;
				removed = true;
				break;
			}
		}
		if (removed) {
			ClazzLoader.classpathMap["$" + pp] = arr;
		}
	}
	var n = ClazzLoader.findClass (qClazzName);
	if (n != null) {
		n.status = ClazzNode.STATUS_KNOWN;
		ClazzLoader.loadedScripts[n.path] = false;
	}
	var path = ClazzLoader.getClasspathFor (qClazzName);
	ClazzLoader.loadedScripts[path] = false;
	if (ClazzLoader.innerLoadedScripts[path]) {
		ClazzLoader.innerLoadedScripts[path] = false;
	}

	ClazzLoader.classUnloaded (qClazzName);
};

/* protected */ /* Clazz#assureInnerClass */
ClazzLoader.assureInnerClass = function (clzz, fun) {
	var clzzName = clzz.__CLASS_NAME__;
	if (Clazz.unloadedClasses[clzzName]) {
		if (clzzName.indexOf ("$") != -1) return;
		var list = new Array ();
		var key = clzzName + "$";
		for (var s in Clazz.unloadedClasses) {
			if (Clazz.unloadedClasses[s] != null && s.indexOf (key) == 0) {
				list[list.length] = s;
			}
		}
		if (list.length == 0) return;
		var funStr = "" + fun;
		var idx1 = funStr.indexOf (key);
		if (idx1 == -1) return;
		var idx2 = funStr.indexOf ("\"", idx1 + key.length);
		if (idx2 == -1) return; // idx2 should never be -1;
		var anonyClazz = funStr.substring (idx1, idx2);
		if (Clazz.unloadedClasses[anonyClazz] == null) return;
		var idx3 = funStr.indexOf ("{", idx2);
		if (idx3 == -1) return;
		idx3++;
		var idx4 = funStr.indexOf ("(" + anonyClazz + ",", idx3 + 3);
		if (idx4 == -1) return; // idx3 should never be -1;
		var idx5 = funStr.lastIndexOf ("}", idx4 - 1);
		if (idx5 == -1) return;
		var innerClazzStr = funStr.substring (idx3, idx5);
		eval (innerClazzStr);
		Clazz.unloadedClasses[anonyClazz] = null;
		/*
		window.setTimeout ((function (clz, str) {
			return function () {
				eval (str);
				Clazz.unloadedClasses[clz] = null;
			};
		}) (anonyClazz, innerClazzStr), 10);
		*/
	}
};

/*-# lastHotspotUpdated -> ltUd #-*/
ClazzLoader.lastHotspotUpdated = new Date ().getTime ();
/*-# lastHotspotSessionID -> ltSI #-*/
ClazzLoader.lastHotspotSessionID = 0;

/* Google Chrome need to load *.js using url + "?" + random number */
if (ClazzLoader.randomlyReload) {
	ClazzLoader.reloadingClasses = new Object ();
}

/*
 * This method will be called in server-return-script:
 *
 * ClazzLoader.updateHotspot (
 * 134324344, 1, "org.eclipse.swt.widgets.Menu",
 * 134324345, 2, "org.eclipse.swt.widgets.MenuItem",
 * null);
 *
 */
/* public */
ClazzLoader.updateHotspot = function () {
	if (Clazz.assureInnerClass == null) {
		Clazz.assureInnerClass = ClazzLoader.assureInnerClass;
	}
	var args = arguments[0];
	if (arguments.length != 1 || arguments[0] == null) {
		args = arguments;
	}
	var length = (args.length - 1) / 3;
	var lastID = 0;
	/*-# lastUpdated -> lUd #-*/
	var lastUpdated = 0;
	/*-# toUpdateClasses -> tUs #-*/
	var toUpdateClasses = new Array ();
	for (var i = 0; i < length; i++) {
		var time = args[i * 3];
		var id = args[i * 3 + 1];
		var clazz = args[i * 3 + 2];
		if ((time > ClazzLoader.lastHotspotUpdated) 
				|| (time == ClazzLoader.lastHotspotUpdated
				&& id > ClazzLoader.lastHotspotSessionID)) {
			toUpdateClasses[toUpdateClasses.length] = clazz;
			lastID = id;
			lastUpdated = time;
		}
	}
	if (toUpdateClasses.length > 0) {
		ClazzLoader.lastHotspotUpdated = lastUpdated;
		ClazzLoader.lastHotspotSessionID = lastID;
		/*-# needUpdateClasses -> nUC #-*/
		var needUpdateClasses = new Array ();
		for (var i = 0; i < toUpdateClasses.length; i++) {
			needUpdateClasses[i] = Clazz.unloadClass (toUpdateClasses[i]);
		}
		for (var i = 0; i < toUpdateClasses.length; i++) {
			if (needUpdateClasses[i]) {
				var clzz = toUpdateClasses[i];
				if (ClazzLoader.randomlyReload) {
					ClazzLoader.reloadingClasses[ClazzLoader.getClasspathFor (clzz)] = true;
				}
				ClazzLoader.loadClass (clzz, (function (clazz) {
					return function () {
						// succeeded!
						Clazz.unloadedClasses[clazz] = null;
						ClazzLoader.classReloaded (clazz);
						if (ClazzLoader.randomlyReload) {
							ClazzLoader.reloadingClasses[ClazzLoader.getClasspathFor (clazz)] = false;
						}
					};
				}) (clzz));
			}
		}
	}
	ClazzLoader.lastHotspotJSFailed = false;
};

/* private */
/*-# removeHotspotScriptNode -> rtSN #-*/
ClazzLoader.removeHotspotScriptNode = function (node) {
	// lazily remove script nodes.
	window.setTimeout (function () {
			if (node.readyState != "interactive") {
				try {
					if (node.parentNode != null) {
						node.parentNode.removeChild (node);
					}
				} catch (e) { }
			}
			node = null;
		}, 1);
	
	if (ClazzLoader.hotspotMonitoringTimeout != null) {
		window.clearTimeout (ClazzLoader.hotspotMonitoringTimeout);
		ClazzLoader.hotspotMonitoringTimeout = null;
	}
};

/*-# lastHotspotScriptLoaded -> ltSL #-*/
ClazzLoader.lastHotspotScriptLoaded = true;
/*-# hotspotJSTimeout -> hJSt #-*/
ClazzLoader.hotspotJSTimeout = null;
/*-# lastHotspotJSFailed -> ltJF #-*/
ClazzLoader.lastHotspotJSFailed = false;

/*-# generatingHotspotW3COnCallback -> gHWC #-*/
ClazzLoader.generatingHotspotW3COnCallback = function () {
	return function () {
		try {
			ClazzLoader.lastHotspotScriptLoaded = true;
			ClazzLoader.removeHotspotScriptNode (this);
		} catch (e) {}; // refreshing browser may cause exceptions
		this.onload = null;
		this.onerror = null;
	};
};

/*-# generatingHotspotIEOnCallback -> gHIC #-*/
ClazzLoader.generatingHotspotIEOnCallback = function () {
	return function () {
		var state = "" + this.readyState;
		if (state == "loaded" || state == "complete") {
			try {
				ClazzLoader.lastHotspotScriptLoaded = true;
				ClazzLoader.removeHotspotScriptNode (this);
			} catch (e) {}; // refreshing browser may cause exceptions
			this.onreadystatechange = null;
		}
	};
};

/* private */
ClazzLoader.loadHotspotScript = function (hotspotURL, iframeID) {
	var script = document.createElement ("SCRIPT");
	script.type = "text/javascript";
	script.defer = true;
	script.src = hotspotURL;
	if (typeof (script.onreadystatechange) == "undefined" || !ClazzLoader.isIE) { // W3C
		script.onload = script.onerror = ClazzLoader.generatingHotspotW3COnCallback ();
	} else {
		script.onreadystatechange = ClazzLoader.generatingHotspotIEOnCallback ();
	}
	var head = document.getElementsByTagName ("HEAD")[0];
	head.appendChild (script);
};

/* private */
/*-# hotspotLoadingTimeout -> hLTo #-*/
ClazzLoader.hotspotLoadingTimeout = function () {
	ClazzLoader.lastHotspotScriptLoaded = true; // timeout
	ClazzLoader.lastHotspotJSFailed = false; // timeout
};

/* protected */
/*-# hotspotMonitoring -> htMr #-*/
ClazzLoader.hotspotMonitoring = function () {
	if (ClazzLoader.lastHotspotScriptLoaded 
			&& !ClazzLoader.lastHotspotJSFailed) {
		var port = window["j2s.hotspot.port"];
		if (port == null) {
			port = 1725;
		}
		var host = window["j2s.hotspot.host"];
		if (host == null) {
			host = "127.0.0.1";
		}
		var hotspotURL = "http://" + host + ":" + port;
		if (ClazzLoader.lastHotspotSessionID == 0) {
			hotspotURL += "/hotspot.js?" + Math.random ();
		} else {
			hotspotURL += "/" + ClazzLoader.lastHotspotSessionID + ".js?"
					+ Math.random ();
		}

		ClazzLoader.lastHotspotJSFailed = true;
		ClazzLoader.lastHotspotScriptLoaded = false;
		
		ClazzLoader.loadHotspotScript (hotspotURL);

		if (ClazzLoader.hotspotJSTimeout != null) {
			window.clearTimeout (ClazzLoader.hotspotJSTimeout);
			ClazzLoader.hotspotJSTimeout = null;
		}
		ClazzLoader.hotspotJSTimeout = window.setTimeout (
				ClazzLoader.hotspotLoadingTimeout, 2000);
		/*
		 * 2 seconds to time out. For local server running inside Eclipse
		 * 2 seconds is already a very long time!
		 */
	}
	
	window.setTimeout (ClazzLoader.hotspotMonitoring, 2500);
};

/*
 * Remove j2slib.z.js, j2slibcore.z.js or Class/Ext/Loader/.js.
 */
window.setTimeout (function () {
	var ss = document.getElementsByTagName ("SCRIPT");
	for (var i = 0; i < ss.length; i++) {
		var src = ss[i].src;
		if (src.indexOf ("chrome:") != 0 && (src.indexOf ("j2slib.z.js") != -1
				|| src.indexOf ("j2slibcore.z.js") != -1)) {
			ClazzLoader.getJ2SLibBase (); // cached ...
			ClazzLoader.removeScriptNode (ss[i]);
			break;
		}
	}
	/* start ClazzLoader hotspot monitoring after 1 second */
	if (window["j2s.script.debugging"] == true && window["j2s.disable.hotspot"] != true) {
		window.setTimeout (ClazzLoader.hotspotMonitoring, 10000); // 10s, initializing 
	}
}, 324); // 0.324 seconds is considered as enough before refresh action

ClassLoader = ClazzLoader;
}
