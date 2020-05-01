// SwingJSApplet.js

// BH 8/1/2018 $-qualified Java methods
// generic SwingJS Applet
// BH 3/14/2018 8:42:33 PM adds applet._window for JSObject
// BH 12/18/2016 8:09:56 AM added SwingJS.Loaded and SwingJS.isLoaded
// BH 7/24/2015 9:09:39 AM allows setting Info.resourcePath
// BH 4/28/2015 10:15:32 PM adds getAppletHtml 
// BH 4/2/2015 5:17:44 PM  adds SwingJS.getJavaResource(path)

// BH 3/27/2015 6:34:49 AM  just a shell

if(typeof(jQuery)=="undefined") alert ("Note -- jQuery is required for SwingJS, but it's not defined.")

if (typeof(SwingJS) == "undefined") {

  SwingJS = {eventID:0};

(function (SwingJS, $, J2S) {

	SwingJS.getApplet = function(id, Info, checkOnly) {
		if (arguments.length == 1 && typeof id == "object") {
			// allow for getApplet(Info)
			Info = id;
			id = null;
		}
		return SwingJS._Applet._get(id, Info, checkOnly);
	}

  	// optional Info here	
	SwingJS.getAppletHtml = function(applet, Info) {
		if (arguments.length == 1 && typeof applet == "object" && !applet._code) {
			// allow for getApplet(Info)
			Info = applet;
			applet = null;
		}
		if (Info) {
			var d = SwingJS._document;
			SwingJS._document = null;
			applet = SwingJS.getApplet(applet, Info);
			SwingJS._document = d;
		}  
		return applet._code;
	}

	SwingJS._Applet = function(id, Info, checkOnly){
		window[id] = this;
		this._appletType = "SwingJS._Applet" + (Info.isSigned ? " (signed)" : "");
		this._isJava = true;
		this._availableParams = null; // all allowed
    this._window = window;
		if (checkOnly)
			return this;
		this._isSigned = Info.isSigned;
		this._readyFunction = Info.readyFunction;
		this._ready = false;
		this._isJava = true; 
		this._isInfoVisible = false;
		this._applet = null;
		this._memoryLimit = Info.memoryLimit || 512;
		this._canScript = function(script) {return true;};
		this._savedOrientations = [];
		this._initialize = function(jarPath, jarFile) {
			var doReport = false;
			SwingJS._jarFile && (jarFile = SwingJS._jarFile);
			if(this._jarFile) {
				var f = this._jarFile;
				if(f.indexOf("/") >= 0) {
					alert ("This web page URL is requesting that the applet used be " + f + ". This is a possible security risk, particularly if the applet is signed, because signed applets can read and write files on your local machine or network.");
					var ok = prompt("Do you want to use applet " + f + "? ", "yes or no")
					if(ok == "yes") {
						jarPath = f.substring(0, f.lastIndexOf("/"));
						jarFile = f.substring(f.lastIndexOf("/") + 1);
					} else {
						doReport = true;
					}
				} else {
					jarFile = f;
				}
				this_isSigned = Info.isSigned = (jarFile.indexOf("Signed") >= 0);
			}
 			this._jarPath = Info.jarPath = jarPath || ".";
			this._jarFile = Info.jarFile = jarFile;
			if (doReport)
				alert ("The web page URL was ignored. Continuing using " + this._jarFile + ' in directory "' + this._jarPath + '"');
			// could do something like this: J2S.controls == undefined || J2S.controls._onloadResetForms();		
		}		
		this._create(id, Info);
		return this;
	}

	;(function(Applet, proto) {
  
	Applet._get = function(id, Info, checkOnly) {

		checkOnly || (checkOnly = false);
		Info || (Info = {});
		var DefaultInfo = {
      code: null,//"swingjs.test.TanSugd3S",
      uncompressed: true,
			//color: "#FFFFFF", // applet object background color
			width: 300,
			height: 300,
			serverURL: "http://your.server.here/jsmol.php",
  	  console: null,  // div for where the JavaScript console will be.
			readyFunction: null,
			use: "HTML5",//other options include JAVA
			jarPath: "java",
			jarFile: "[code].jar",
			j2sPath: "j2s",
			spinnerImage: "core/Spinner.gif",
			disableJ2SLoadMonitor: false,
			disableInitialConsole: false,
			debug: false
		};	 
		id || (id = Info.name) || (id = "j2sApplet" + J2S._defaultID++);
    
		J2S._addDefaultInfo(Info, DefaultInfo);
		
		
    Info.jarFile && Info.code && Info.jarFile.replace(/\[code\]/,Info.code);
		J2S._debugAlert = Info.debug;
		Info.serverURL && (J2S._serverUrl = Info.serverURL);

		var javaAllowed = false;
		var applet = null;
		var List = Info.use.toUpperCase().split("#")[0].split(" ");
		for (var i = 0; i < List.length; i++) {
			switch (List[i]) {
			case "JAVA":
				javaAllowed = true;
				if (J2S.featureDetection.supportsJava())
					applet = new Applet(id, Info, checkOnly);
				break;
			case "HTML5":               
  			if (J2S.featureDetection.allowHTML5){
				  applet = Applet._getCanvas(id, Info, checkOnly);
        } else {
          List.push("JAVA");
        }
				break;
			}
			if (applet != null)
				break;		  
		}
		if (applet == null) {
			if (checkOnly || !javaAllowed)
				applet = {_appletType : "none" };
			else if (javaAllowed)
 		  	applet = new Applet(id, Info);
		}

		// keyed to both its string id and itself
		return (checkOnly ? applet : J2S._registerApplet(id, applet));  
	}

	Applet._getCanvas = function(id, Info, checkOnly) {
    Info._isLayered = true;
    Info._isSwing = true;
    Info._platform = "";
		J2S._Canvas2D.prototype = J2S._jsSetPrototype(new Applet(id, Info, true));
		return new J2S._Canvas2D(id, Info, Info.code, checkOnly);
	};

	/*  AngelH, mar2007:
		By (re)setting these variables in the webpage before calling J2S.getApplet(),
		a custom message can be provided (e.g. localized for user's language) when no Java is installed.
	*/
	Applet._noJavaMsg =
			"Either you do not have Java applets enabled in your web<br />browser or your browser is blocking this applet.<br />\
			Check the warning message from your browser and/or enable Java applets in<br />\
			your web browser preferences, or install the Java Runtime Environment from <a href='http://www.java.com'>www.java.com</a>";

	Applet._setCommonMethods = function(p) {
		p._showInfo = proto._showInfo;	
///		p._search = proto._search;
		p._getName = proto._getName;
		p.readyCallback = proto.readyCallback;
	}

	Applet._createApplet = function(applet, Info, params) {
		applet._initialize(Info.jarPath, Info.jarFile);
		var jarFile = applet._jarFile;
		var jnlp = ""
		if (J2S._isFile) {
			jarFile = jarFile.replace(/0\.jar/,".jar");
		}
		// size is set to 100% of containers' size, but only if resizable. 
		// Note that resizability in MSIE requires: 
		// <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
		var w = (applet._containerWidth.indexOf("px") >= 0 ? applet._containerWidth : "100%");
		var h = (applet._containerHeight.indexOf("px") >= 0 ? applet._containerHeight : "100%");
		var widthAndHeight = " style=\"width:" + w + ";height:" + h + "\" ";
		var attributes = "name='" + applet._id + "_object' id='" + applet._id + "_object' " + "\n"
				+ widthAndHeight + jnlp + "\n"
		params.codebase = applet._jarPath;
		params.codePath = params.codebase + "/";
		if (params.codePath.indexOf("://") < 0) {
			var base = document.location.href.split("#")[0].split("?")[0].split("/");
			base[base.length - 1] = params.codePath;
			params.codePath = base.join("/");
		}
		params.archive = jarFile;
		params.mayscript = 'true';
		params.java_arguments = "-Xmx" + Math.round(Info.memoryLimit || applet._memoryLimit) + "m";
		params.permissions = (applet._isSigned ? "all-permissions" : "sandbox");
		params.documentLocation = document.location.href;
		params.documentBase = document.location.href.split("#")[0].split("?")[0];

		params.jarPath = Info.jarPath;
		J2S._syncedApplets.length && (params.synccallback = "J2S._mySyncCallback");
		applet._startupScript && (params.script = applet._startupScript);
		var t = "\n"; 
 		for (var i in params)
			if(params[i])
		 		t += "  <param name='"+i+"' value='"+params[i]+"' />\n";
		if (J2S.featureDetection.useIEObject || J2S.featureDetection.useHtml4Object) {
			t = "<object " + attributes
				+ (J2S.featureDetection.useIEObject ? 
					 " classid='clsid:8AD9C840-044E-11D1-B3E9-00805F499D93' codebase='http://java.sun.com/update/1.6.0/jinstall-6u22-windows-i586.cab'>"
				 : " type='application/x-java-applet'>")
				 + t + "<p style='background-color:yellow;" + widthAndHeight.split('"')[1] 
				+ ";text-align:center;vertical-align:middle;'>\n" + Applet._noJavaMsg + "</p></object>\n";
		} else { // use applet tag
			t = "<applet " + attributes
				+ " code='" + params.code + "' codebase='" + applet._jarPath + "' archive='" + jarFile + "' mayscript='true'>\n"
				+ t + "<table bgcolor='yellow'><tr><td align='center' valign='middle' " + widthAndHeight + ">\n"
				+ Applet._noJavaMsg + "</td></tr></table></applet>\n";
		}
		if (applet._deferApplet)
			applet._javaCode = t, t="";
		t = J2S._getWrapper(applet, true) + t + J2S._getWrapper(applet, false) 
			+ (Info.addSelectionOptions ? J2S._getGrabberOptions(applet) : "");
		if (J2S._debugAlert)
			alert (t);
		applet._code = J2S._documentWrite(t);
	}

	proto._newApplet = function(viewerOptions) {
		this._viewerOptions = viewerOptions;
    // for now assigning this._applet here instead of in readyCallback
    Clazz.loadClass("swingjs.JSAppletViewer");
		this._appletPanel = Clazz.new_(swingjs.JSAppletViewer.c$$java_util_Hashtable, [viewerOptions]);
    this._appletPanel.start$();
	}
	
	proto._addCoreFiles = function() {
		if (this.__Info.core != "NONE" && this.__Info.core != "none" && !J2S._debugCode)
			J2S._addCoreFile((this.__Info.core || "swingjs"), this._j2sPath, this.__Info.preloadCore);
//		if (J2S._debugCode) {
//		// no min package for that
//			J2S._addExec([this, null, "swingjs.JSAppletViewer", "load " + this.__Info.code]);
//      
//		}
  }
  
	proto._create = function(id, Info){
		J2S._setObject(this, id, Info);
		var params = {
			syncId: J2S._syncId,
			progressbar: "true",                      
			progresscolor: "blue",
			boxbgcolor: this._color || "black",
			boxfgcolor: "white",
			boxmessage: "Downloading Applet ...",
			//script: (this._color ? "background \"" + this._color +"\"": ""),
			code: Info.appletClass + ".class"
		};

		J2S._setAppletParams(this._availableParams, params, Info);
		function sterilizeInline(model) {
			model = model.replace(/\r|\n|\r\n/g, (model.indexOf("|") >= 0 ? "\\/n" : "|")).replace(/'/g, "&#39;");
			if(J2S._debugAlert)
				alert ("inline model:\n" + model);
			return model;
		}

		params.loadInline = (Info.inlineModel ? sterilizeInline(Info.inlineModel) : "");
		params.appletReadyCallback = "J2S.readyCallback";
		if (J2S._syncedApplets.length)
			params.synccallback = "J2S._mySyncCallback";
		params.java_arguments = "-Xmx" + Math.round(Info.memoryLimit || this._memoryLimit) + "m";

		this._initialize(Info.jarPath, Info.jarFile);
		Applet._createApplet(this, Info, params);
	}


	proto._restoreState = function(clazzName, state) {
   // applet-dependent
	}

	proto.readyCallback = function(id, fullid, isReady) {
		if (!isReady)
			return; // ignore -- page is closing
		J2S._setDestroy(this);
		this._ready = true;
		this._showInfo(true);
		this._showInfo(false);
		J2S.Cache.setDragDrop(this);
		this._readyFunction && this._readyFunction(this);
		J2S._setReady(this);
		var app = this._2dapplet;
		if (app && app._isEmbedded && app._ready && app.__Info.visible)
			this._show2d(true);
	}

	proto._showInfo = function(tf) {
    if(this._isJNLP)return;
		if(tf && this._2dapplet)
			this._2dapplet._show(false);
		J2S.$html(J2S.$(this, "infoheaderspan"), this._infoHeader);
		if (this._info)
			J2S.$html(J2S.$(this, "infodiv"), this._info);
		if ((!this._isInfoVisible) == (!tf))
			return;
		this._isInfoVisible = tf;
		// 1px does not work for MSIE
		if (this._isJava) {
			var x = (tf ? 2 : "100%");
			J2S.$setSize(J2S.$(this, "appletdiv"), x, x);
		}
		J2S.$setVisible(J2S.$(this, "infotablediv"), tf);
		J2S.$setVisible(J2S.$(this, "infoheaderdiv"), tf);
		this._show(!tf);
	}

	proto._show = function(tf) {
		var x = (!tf ? 2 : "100%");
		J2S.$setSize(J2S.$(this, "object"), x, x);
		if (!this._isJava)
			J2S.$setVisible(J2S.$(this, "appletdiv"), tf);
	}

	proto._clearConsole = function () {
			if (this._console == this._id + "_infodiv")
				this.info = "";
			if (!self.Clazz)return;
			J2S._setConsoleDiv(this._console);
			Clazz.Console.clear();
		}

	proto._resizeApplet = function(size) {
		// See _jmolGetAppletSize() for the formats accepted as size [same used by jmolApplet()]
		//  Special case: an empty value for width or height is accepted, meaning no change in that dimension.

		/*
		 * private functions
		 */
		function _getAppletSize(size, units) {
			/* Accepts single number, 2-value array, or object with width and height as mroperties, each one can be one of:
			 percent (text string ending %), decimal 0 to 1 (percent/100), number, or text string (interpreted as nr.)
			 [width, height] array of strings is returned, with units added if specified.
			 Percent is relative to container div or element (which should have explicitly set size).
			 */
			var width, height;
			if(( typeof size) == "object" && size != null) {
				width = size[0]||size.width;
				height = size[1]||size.height;
			} else {
				width = height = size;
			}
			return [J2S.fixDim(width, units), J2S.fixDim(height, units)];
		}
		var sz = _getAppletSize(size, "px");
		var d = J2S._getElement(this, "appletinfotablediv");
		d.style.width = sz[0];
		d.style.height = sz[1];
		this._containerWidth = sz[0];
		this._containerHeight = sz[1];
		if (this._is2D)
			J2S.repaint(this, true);
	}

	proto._cover = function (doCover) {
    // from using getAppletHtml()
		this._newCanvas(false);
		this._showInfo(false);
		this._init();
	};


  
})(SwingJS._Applet, SwingJS._Applet.prototype);

})(SwingJS, jQuery, J2S);

} // SwingJS undefined
