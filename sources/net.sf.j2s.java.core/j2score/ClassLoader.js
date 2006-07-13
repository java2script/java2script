/******************************************************************************
 * Copyright (c) 2005-2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Web:
 *     http://j2s.sourceforge.net/
 *     http://sourceforge.net/projects/j2s/
 * Contributors:
 *     ognize.com - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create July 10, 2006
 *******/

/**
 * TODO:
 * Make optimization over class dependency tree.
 * Give more ways for the feedback of loading.
 */
 
/*-#
 # ClazzNode -> $CN$
 # ClazzLoader -> $CL$
 # <<< ClazzLoader = $CL$;
 #-*/
 
/*-#
 # parents -> sp
 # musts -> sm
 # optionals -> so
 # declaration -> dcl
 # optionalsLoaded -> oled
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
ClazzLoader = {};

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
 * Try to be compatiable with Clazz system.
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
				return ;
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
		return ;
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
/*-# unwrapArray -> uA #-*/
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
};

/**
 * Used to keep to-be-loaded classes.
 */
/* private */
/*-# classQueue -> cq #-*/
ClazzLoader.classQueue = new Array ();

/* private */
/*-# classpathMap -> cm #-*/
ClazzLoader.classpathMap = new Object ();

/* public */
ClazzLoader.packageClassPath = function (pkg, base) {
	if (pkg.lastIndexOf (".*") == pkg.length - 2) {
		pkg = pkg.substring (0, pkg.length - 2);
	}
	ClazzLoader.classpathMap["@" + pkg] = base;
};

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

/* public */
/*-#
 # prefix -> px 
 # isRegistered -> iX
 #-*/
ClazzLoader.libraryClasspath = function (prefix, pkgs, base, index) {
	var isRegistered = prefix + "registered";
	if (ClazzLoader[isRegistered] == true) {
		return ;
	}
	ClazzLoader[isRegistered] = true;
	for (var i = 0; i < pkgs.length; i++) {
		ClazzLoader.packageClassPath (prefix + pkgs[i], base);
	}
	if (index == true && window[prefix + "package"] != true) {
		ClazzLoader.loadClass (prefix + "package");
	}
};

/* public */
ClazzLoader.runtimeClasspath = function (base) {
	ClazzLoader.libraryClasspath ("java.",  [
			"*",
			"lang.*",
			"lang.ref.*",
			"lang.ref.reflect.*",
			"lang.reflect.*",
			"io.*",
			"util.*"
	], base, true);
};

/* public */
ClazzLoader.swtClasspath = function (base) {
	ClazzLoader.libraryClasspath ("org.eclipse.swt.", [
			"*",
			"accessibility.*",
			"awt.*",
			"browser.*",
			"custom.*",
			"dnd.*",
			"events.*",
			"graphics.*",
			"internal.*",
			"internal.browser.*",
			"internal.dnd.*",
			"internal.struct.*",
			"layout.*",
			"printing.*",
			"program.*",
			"widgets.*"
	], base, true);
};

/* public */
ClazzLoader.ajaxClasspath = function (base) {
	ClazzLoader.libraryClasspath ("net.sf.j2s.ajax.", ["*"], base, false);
};

/**
 * All the Java runtime library, Eclipse SWT library and AJAX library are put
 * in the same folder.
 */
/* public */
ClazzLoader.j2slibClasspath = function (base) {
	ClazzLoader.runtimeClasspath (base);
	ClazzLoader.swtClasspath (base);
	ClazzLoader.ajaxClasspath (base);
};

/**
 * Return the *.js path of the given class. Maybe the class is contained
 * in a *.z.js jar file.
 */
/* public */
ClazzLoader.getClasspathFor = function (clazz/*, fullpath*/) {
	//error ("check js path : " + clazz);
	var path = ClazzLoader.classpathMap["#" + clazz];
	if (path != null) {
		return path;
	}
	var base = null;
	var idx = clazz.lastIndexOf (".");
	/*
	while (idx != -1) {
		var pkg = clazz.substring (0, idx);
		base = ClazzLoader.classpathMap["@" + pkg];
		if (base != null) {
			break;
		}
		idx = clazz.lastIndexOf (".", idx - 2);
	}
	*/
	if (idx != -1) {
		var pkg = clazz.substring (0, idx);
		base = ClazzLoader.classpathMap["@" + pkg];
	}
	
	base = ClazzLoader.assureBase (base);
	/*
	if (!fullpath) {
		return base;
	}
	*/
	var jsPath = base + clazz.replace (/\./g, "/") + ".js";
	return jsPath;
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
 */
/* protected */
ClazzLoader.scriptLoading = function (file) {};

/* protected */
ClazzLoader.scriptLoaded = function (file) {};

/* protected */
ClazzLoader.scriptInited = function (file) {};

/* protected */
ClazzLoader.scriptCompleted = function (file) {};

/**
 * After all the classes are loaded, this method will be called.
 * Should be overriden to run *.main([]).
 */
/* protected */
ClazzLoader.globalLoaded = function () {};

/* private */
/*-# mapPath2ClassNode -> p2node #-*/
ClazzLoader.mapPath2ClassNode = new Object ();

/* private */
ClazzLoader.xhrOnload = function (transport, file) {
	if (transport.status >= 400 || transport.responseText == null
			|| transport.responseText.length == 0) { // error
		// TODO: Maybe should take another try before ignoring
		ClazzLoader.tryToLoadNext (file);
	} else {
		try {
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

/* private */
ClazzLoader.lastScriptPath = null;

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
		return ;
	}
	ClazzLoader.lastScriptPath = file;
	ClazzLoader.loadedScripts[file] = true;

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
			return ;
		}
		transport.open ("GET", file, ClazzLoader.isAsynchronousLoading);
		transport.setRequestHeader ("User-Agent",
				"Java2Script-Pacemaker/1.0 (+http://j2s.sourceforge.net)");
		if (ClazzLoader.isAsynchronousLoading) {
			transport.onreadystatechange = function () {
				if (transport.readyState == 4) {
					if (isActiveX) {
						transport.onreadystatechange = ClazzLoader.emptyOnRSC;
						// For IE, try to avoid stack overflow errors
						window.setTimeout (function () {
								ClazzLoader.xhrOnload (transport, file);
						}, ClazzLoader.loadingTimeLag < 0 ? 0 : 
								ClazzLoader.loadingTimeLag);
					} else {
						transport.onreadystatechange = null;
						if (ClazzLoader.loadingTimeLag >= 0) {
							window.setTimeout (function () {
									ClazzLoader.xhrOnload (transport, file);
							}, ClazzLoader.loadingTimeLag);
						} else {
							ClazzLoader.xhrOnload (transport, file);
						}
					}
				}
			};
			transport.send (null);
		} else {
			transport.send (null);
			ClazzLoader.xhrOnload (transport, file);
		}
		return ;
	}
	// Create script DOM element
	var script = document.createElement ("SCRIPT");
	script.type = "text/javascript";
	script.src = file;

	if (ignoreOnload) {
		document.getElementsByTagName ("HEAD")[0].appendChild (script);
		// ignore onload event and no call of ClazzLoader.scriptLoading
		return ;
	}
	// Alert when the script is loaded
	if (typeof (script.onreadystatechange) == "undefined") { // W3C
		/*
		 * Opera will trigger onload event even there are no related *.js
		 */
		script.onload = function () { 
			this.onload = null; 
			var path = arguments.callee.path;
			ClazzLoader.scriptLoaded (path);
			if (ClazzLoader.loadingTimeLag >= 0) {
				window.setTimeout (function () {
						ClazzLoader.tryToLoadNext (path);
				}, ClazzLoader.loadingTimeLag);
			} else {
				ClazzLoader.tryToLoadNext (path);
			}
		};
		script.onload.path = file;
		/*
		 * Fore Firefox/Mozilla, no related *.js will result in errors.
		 */
		script.onerror = function () { // Firefox/Mozilla
			this.onerror = null; 
			var path = arguments.callee.path;
			ClazzLoader.scriptLoaded (path);
			if (ClazzLoader.loadingTimeLag >= 0) {
				window.setTimeout (function () {
						ClazzLoader.tryToLoadNext (path);
				}, ClazzLoader.loadingTimeLag);
			} else {
				ClazzLoader.tryToLoadNext (path);
			}
		};
		script.onerror.path = file;
	} else { // IE
		script.onreadystatechange = function () {
			if (this.readyState != "loaded" && this.readyState != "complete") {
				/*
				 * When no such *.js existed for local file system, IE will be
				 * stuck in here without loaded event!
				 */
				if ((window.location.protocol != "file:" 
						&& script.src.indexOf ("file:") != 0)
						|| this.readyState != "loading") {
					return;
				}
			}
			var path = arguments.callee.path;
			ClazzLoader.scriptLoaded (path);
			// Unset onreadystatechange, leaks mem in IE
			this.onreadystatechange = null; 
			if (ClazzLoader.loadingTimeLag >= 0) {
				window.setTimeout (function () {
						ClazzLoader.tryToLoadNext (path);
				}, 5);
			} else {
				ClazzLoader.tryToLoadNext (path);
			}
		};
		script.onreadystatechange.path = file;
	}
	// Add script DOM element to document tree
	document.getElementsByTagName ("HEAD")[0].appendChild (script);
	ClazzLoader.scriptLoading (file);
};

/**
 * After class is loaded, this method will be executed to check whether there
 * are classes in the dependency tree that need to be loaded.
 */
/* private */
/*-# tryToLoadNext -> next #-*/
ClazzLoader.tryToLoadNext = function (file) {
	//alert ("in tryToLoadNext");
	var node = ClazzLoader.mapPath2ClassNode["@" + file];
	if (node == null) { // maybe class tree root
		//error (" null node ?" + file);
		return ;
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
					n.path = ClazzLoader.lastScriptPath;
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
			node.status = ClazzNode.STATUS_CONTENT_LOADED;
			ClazzLoader.updateNode (node);
		}
	}
	var n = ClazzLoader.findNextMustClass (ClazzLoader.clazzTreeRoot, 
			ClazzNode.STATUS_KNOWN);
	//alert ("next..." + n) ;
	if (n != null) {
		//log ("next ..." + n.name);
		ClazzLoader.loadClassNode (n);
	} else {
		var cq = ClazzLoader.classQueue;
		if (cq.length != 0) {
			n = cq[0]; // popup class from the quue
			for (var i = 0; i < cq.length - 1; i++) {
				cq[i] = cq[i + 1];
			}
			cq.length--;
			
			ClazzLoader.addChildClassNode(ClazzLoader.clazzTreeRoot, n, 1);
			//alert ("load from queue");
			ClazzLoader.loadScript (n.path);
		} else { // Optionals
			n = ClazzLoader.findNextOptionalClass (ClazzNode.STATUS_KNOWN);
			if (n != null) {
				//log ("in optionals..." + n.name);
				ClazzLoader.loadClassNode (n);
			} else {
				ClazzLoader.globalLoaded ();
				//error ("no optionals?");
			}
		}
	}
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
		return ;
	}
	var isMustsOK = false;
	if (node.musts == null || node.musts.length == 0 
			|| node.declaration == null) {
		//alert (node.name + " no musts");
		isMustsOK = true;
	} else {
		//alert ("checking " + node.musts.length + " musts");
		isMustsOK = true;
		for (var i = 0; i < node.musts.length; i++) {
			var n = node.musts[i];
			if (n.status < ClazzNode.STATUS_DECLARED) {
				if (ClazzLoader.isClassDefined (n.name)) {
					n.status = ClazzNode.STATUS_OPTIONALS_LOADED;
					ClazzLoader.updateNode (n);
					/*
					 * For those classes within one *.js file, update
					 * them synchronously.
					 */
					if (n.declaration != null 
							&& n.declaration.clazzList != null) {
						var list = n.declaration.clazzList;
						for (var j = 0; j < list.length; j++) {
							var nn = list[j];
							if (nn.status != ClazzNode.STATUS_OPTIONALS_LOADED
									&& nn != n) {
								nn.status = n.status;
								ClazzLoader.updateNode (nn);
							}
						}
					}
				} else {
					isMustsOK = false;
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
				if (decl.executed == false) {
					decl ();
					decl.executed = true;
				} else {
					decl ();
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
							var nn = list[j];
							if (nn.status != ClazzNode.STATUS_DECLARED
									&& nn != node) {
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
		if (node.optionals == null || node.optionals.length == 0
				|| node.declaration == null) {
			isOptionsOK = true;
		} else {
			isOptionsOK = true;
			for (var i = 0; i < node.optionals.length; i++) {
				var n = node.optionals[i];
				if (n.status < ClazzNode.STATUS_OPTIONALS_LOADED) {
					isOptionsOK = false;
				}
			}
		}
		if (isOptionsOK) {
			level = ClazzNode.STATUS_OPTIONALS_LOADED;
			node.status = level;
			ClazzLoader.scriptCompleted (node.path);
			if (node.optionalsLoaded != null) {
				node.optionalsLoaded ();
			}
					/*
					 * For those classes within one *.js file, update
					 * them synchronously.
					 */
					if (node.declaration != null 
							&& node.declaration.clazzList != null) {
						var list = node.declaration.clazzList;
						for (var j = 0; j < list.length; j++) {
							var nn = list[j];
							if (nn.status != ClazzNode.level && nn != node) {
			ClazzLoader.scriptCompleted (nn.path);
			if (nn.optionalsLoaded != null) {
				nn.optionalsLoaded ();
			}
							}
						}
					}
		}
		ClazzLoader.updateParents (node, level);
	}
};

/* private */
/*-# updateParents -> uP #-*/
ClazzLoader.updateParents = function (node, level) {
	if (node.parents == null || node.parents.length == 0) {
		return ;
	}
	for (var i = 0; i < node.parents.length; i++) {
		var p = node.parents[i];
		if (p.status >= level) {
			continue;
		}
		ClazzLoader.updateNode (p);
	}
};

/* private */
/*-# findNextMustClass -> fNM #-*/
ClazzLoader.findNextMustClass = function (node, status) {
	if (node != null) {
		/*
		if (ClazzLoader.isClassDefined (node.name)) {
			node.status = ClazzNode.STATUS_OPTIONALS_LOADED;
		}
		*/
		if (node.musts != null && node.musts.length != 0) {
			for (var i = 0; i < node.musts.length; i++) {
				var n = node.musts[i];
				if (n.status == status) {
					return n;
				} else {
					var nn = ClazzLoader.findNextMustClass (n, status);
					if (nn != null) {
						return nn;
					}
				}
			}
		}
		if (node.status == status) {
			return node;
		}
	}
	return null;
};

/* private */
/*-# findNextOptionalClass -> fNO #-*/
ClazzLoader.findNextOptionalClass = function (status) {
	var rnd = Math.random ();
	while (rnd == ClazzLoader.clazzTreeRoot.random) {
		rnd = Math.random ();
	}
	ClazzLoader.clazzTreeRoot.random = rnd;
	var node = ClazzLoader.clazzTreeRoot;
	return ClazzLoader.findNodeNextOptionalClass (node, status);
};

/* private */
/*-# findNodeNextOptionalClass -> fNNO #-*/
ClazzLoader.findNodeNextOptionalClass = function (node, status) {
	var rnd = ClazzLoader.clazzTreeRoot.random;
	if (node != null) {
		if (node.musts != null && node.musts.length != 0) {
			for (var i = 0; i < node.musts.length; i++) {
				var n = node.musts[i];
				if (n.status == status) {
					return n;
				} else {
					if (n.random == rnd) {
						continue;
					}
					n.random = rnd;
					var nn = ClazzLoader.findNodeNextOptionalClass (n, status);
					if (nn != null) {
						return nn;
					}
				}
			}
		}
		if (node.optionals != null && node.optionals.length != 0) {
			for (var i = 0; i < node.optionals.length; i++) {
				var n = node.optionals[i];
				if (n.status == status) {
					return n;
				} else {
					if (n.random == rnd) {
						continue;
					}
					n.random = rnd;
					var nn = ClazzLoader.findNodeNextOptionalClass (n, status);
					if (nn != null) {
						return nn;
					}
				}
			}
		}
		if (node.status == status) {
			return node;
		}
	}
};

/**
 * This method will be called in almost every *.js generated by Java2Script
 * compiler.
 */
/* protected */
ClazzLoader.load = function (musts, clazz, optionals, declaration) {
	if (clazz instanceof Array) {
		ClazzLoader.unwrapArray (clazz);
		for (var i = 0; i < clazz.length; i++) {
			ClazzLoader.load (musts, clazz[i], optionals, declaration, clazz);
		}
		return ;
	}
	if (clazz.charAt (0) == '$') {
		clazz = "org.eclipse.s" + clazz.substring (1);
	}
	var node = ClazzLoader.mapPath2ClassNode["#" + clazz];
	if (node == null) { // ClazzLoader.load called inside *.z.js?
		//*
		node = new ClazzNode ();
		node.name = clazz;
		node.path = ClazzLoader.lastScriptPath;
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
		return ;
		//*/
	}
	var okToInit = true;
	if (musts != null && musts.length != 0) {
		ClazzLoader.unwrapArray (musts);
		for (var i = 0; i < musts.length; i++) {
			var name = musts[i];
			if (name == null || name.length == 0) {
				continue;
			}
			if (ClazzLoader.isClassDefined (name) 
					|| ClazzLoader.isClassExcluded (name)) {
				continue;
			}
			okToInit = false;
			var n = ClazzLoader.findClass (name);
			if (n == null) {
				n = new ClazzNode ();
				n.name = musts[i];
				n.status = ClazzNode.STATUS_KNOWN;
			}
			ClazzLoader.addChildClassNode (node, n, 1);
		}
	}

	/*
	 * The following lines are commented intentionally.
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
	
	if (optionals != null && optionals.length != 0) {
		ClazzLoader.unwrapArray (optionals);
		for (var i = 0; i < optionals.length; i++) {
			var name = optionals[i];
			if (name == null || name.length == 0) {
				continue;
			}
			if (ClazzLoader.isClassDefined (name) 
					|| ClazzLoader.isClassExcluded (name)) {
				continue;
			}
			var n = ClazzLoader.findClass (name);
			if (n == null) {
				n = new ClazzNode ();
				n.name = optionals[i];
				n.status = ClazzNode.STATUS_KNOWN;
			}
			ClazzLoader.addChildClassNode (node, n, -1);
		}
	}
};

/*
 * Try to be compatiable of Clazz
 */
if (window["Clazz"] != null) {
	Clazz.load = ClazzLoader.load;
}

/**
 *
 */
/* protected */
/*-# findClass -> fC #-*/
ClazzLoader.findClass = function (clazzName) {
	/*
	 * Random number is used as a visited mark so there won't get into
	 * recurive searching.
	 *
	 * TODO: It's unsafe for such random-number-way for searching
	 */
	var rnd = Math.random ();
	while (rnd == ClazzLoader.clazzTreeRoot.random) {
		rnd = Math.random ();
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
		}
	}
};

ClazzLoader.queueBeforeString = new Array ();

/**
 * Load the given class ant its related classes.
 */
/* public */
ClazzLoader.loadClass = function (name, optionalsLoaded) {
	if (!ClazzLoader.isClassDefined ("java.lang.String") 
			&& name.indexOf ("java.") != 0) {
		var qbs = ClazzLoader.queueBeforeString;
		qbs[qbs.length] = [name, optionalsLoaded];
		return ;
	}
	if (!ClazzLoader.isClassDefined (name) 
			&& !ClazzLoader.isClassExcluded (name)) {
		var path = ClazzLoader.getClasspathFor (name/*, true*/);
		if (!ClazzLoader.loadedScripts[path]) {
			var n = new ClazzNode ();
			n.name = name;
			n.path = path;
			ClazzLoader.mappingPathNameNode (path, name, n);
			n.optionalsLoaded = optionalsLoaded;
			n.status = ClazzNode.STATUS_KNOWN;
			/*-# needBeingQueued -> nQ #-*/
			var needBeingQueued = false;
			for (var i = ClazzLoader.classQueue.length - 1; i >= 0; i++) {
				var cq = ClazzLoader.classQueue[i];
				if (cq.status != ClazzNode.STATUS_OPTIONALS_LOADED) {
					needBeingQueued = true;
					break;
				}
			}
			// push class to queue
			ClazzLoader.classQueue[ClazzLoader.classQueue.length] = n;
			if (!needBeingQueued) { // can be loaded directly
				ClazzLoader.addChildClassNode(ClazzLoader.clazzTreeRoot, n, 1);
				ClazzLoader.loadScript (n.path);
			}
		}
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
		arr[arr.length] = child;
	}
	existed = false;
	for (var i = 0; i < child.parents.length; i++) {
		if (child.parents[i].name == parent.name) {
			existed = true;
			break;
		}
	}
	if (!existed) {
		child.parents[child.parents.length] = parent;
	}
};

