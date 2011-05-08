/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import net.sf.j2s.annotation.J2SIgnore;
import net.sf.j2s.annotation.J2SNative;

/**
 * @author zhou renjian
 *
 * 2006-10-10
 */
public class SimpleRPCRequest {
	
	@J2SIgnore
	public static interface IHttpRequestFactory {

		public HttpRequest createRequest();
		
	}

	public static final int MODE_AJAX = 1;
	public static final int MODE_LOCAL_JAVA_THREAD = 2;
	
	private static int runningMode = MODE_LOCAL_JAVA_THREAD;
	
	protected static IHttpRequestFactory requestFactory;
	
	static {
		boolean ajax = false;
		/**
		 * @j2sNative
		 * ajax = true;
		 */ {}
		if (ajax) {
			runningMode = MODE_AJAX;
		}
	}
	
	public static int getRequstMode() {
		return runningMode;
	}
	
	public static void switchToAJAXMode() {
		runningMode = MODE_AJAX;
	}
	
	/**
	 * This method only makes sense for Java client not for
	 * Java2Script client!
	 */
	public static void switchToLocalJavaThreadMode() {
		runningMode = MODE_LOCAL_JAVA_THREAD;
	}
	
	/**
	 * Java2Script client will always requests in AJAX mode. 
	 * @param runnable
	 * @j2sNative
	 * runnable.ajaxIn ();
	 * net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest (runnable);
	 */
	public static void request(final SimpleRPCRunnable runnable) {
		runnable.ajaxIn();
		if (runningMode == MODE_LOCAL_JAVA_THREAD) {
			(new Thread("Simple RPC Request") {
				public void run() {
					try {
						runnable.ajaxRun();
					} catch (RuntimeException e) {
						e.printStackTrace(); // should never fail in Java thread mode!
						runnable.ajaxFail();
						return;
					}
					runnable.ajaxOut();
				}
			}).start();
		} else {
			ajaxRequest(runnable);
		}
	}
	
	static String getClassNameURL(SimpleRPCRunnable runnable) {
		Class<?> oClass = runnable.getClass();
		String name = oClass.getName();
		while (name.indexOf('$') != -1) {
			oClass = oClass.getSuperclass();
			if (oClass == null) {
				return null; // should never happen!
			}
			name = oClass.getName();
		}
		return name;
	}

	@J2SIgnore
	public static void setHttpRequestFactory(IHttpRequestFactory factory) {
		requestFactory = factory;
	}

	@J2SNative("return new net.sf.j2s.ajax.HttpRequest ();")
	public static HttpRequest getRequest() {
		if (requestFactory != null) {
			try {
				return requestFactory.createRequest();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return new HttpRequest();
	}
	
	private static void ajaxRequest(final SimpleRPCRunnable runnable) {
		String url = runnable.getHttpURL();
		if (url == null) {
			url = "";
		}
		String method = runnable.getHttpMethod();
		String serialize = runnable.serialize();
		if (method == null) {
			method = "POST";
		}
		if (checkXSS(url, serialize, runnable)) {
			return;
		}
		String url2 = adjustRequestURL(method, url, serialize);
		if (url2 != url) {
			serialize = null;
		}
		
		final HttpRequest request = getRequest();
		request.open(method, url, true);
		request.registerOnReadyStateChange(new XHRCallbackAdapter() {
			public void onLoaded() {
				String responseText = request.getResponseText();
				if (responseText == null || responseText.length() == 0) {
					runnable.ajaxFail(); // should seldom fail!
					return;
				}
				runnable.deserialize(responseText);
				runnable.ajaxOut();
			}
		});
		request.send(serialize);
	}

	protected static String adjustRequestURL(String method, String url, String serialize) {
		if ("GET".equals(method.toUpperCase())) {
			try {
				String query = URLEncoder.encode(serialize, "UTF-8");
				if (url.indexOf('?') != -1) {
					/* should not come to this branch! */
					url += "&jzz=" + query;
				} else {
					url += "?" + query;
				}
			} catch (UnsupportedEncodingException e) {
				// should never throws such exception!
				//e.printStackTrace();
			}
		}
		return url;
	}
	
	/**
	 * Check that whether it is in cross site script mode or not.
	 * @param url
	 * @return
	 * @j2sNative
if (url != null && (url.indexOf ("http://") == 0
		|| url.indexOf ("https://") == 0)) {
	var host = null;
	var idx1 = url.indexOf ("//") + 2;
	var idx2 = url.indexOf ('/', 9);
	if (idx2 != -1) {
		host = url.substring (idx1, idx2); 
	} else {
		host = url.substring (idx1); 
	}
	var protocol = null; // http: or https:
	var idx0 = url.indexOf ("://");
	if (idx0 != -1) {
		protocol = url.substring (0, idx0 + 1);
	} else {
		protocol = window.location.protocol;
	}
	var port = null;
	var idx3 = host.indexOf (':'); // there is port number
	if (idx3 != -1) {
		port = parseInt (host.substring (idx3 + 1));
		host = host.substring (0, idx3);
	} else {
		if ("http:" == protocol) {
			port = 80;
		} else if ("https:" == protocol) {
			port = 443;
		} else {
			port = window.location.port;
			if (port != "") {
				port = parseInt (port);
			}
		}
	}
	var loc = window.location;
	var locPort = loc.port;
	if (locPort == "") {
		if ("http:" == loc.protocol) {
			locPort = 80;
		} else if ("https:" == loc.protocol) {
			locPort = 443;
		}
	} else {
		locPort = parseInt (locPort);
	}
	var locHost = null;
	try {
		locHost = loc.host;
	} catch (e) {
		if (arguments.length == 2) {
			return false; // about:blank page has no domain
		}
		return true; // about:blank page
	}
	var idx4 = locHost.indexOf (":");
	if (idx4 != -1) {
		locHost = locHost.substring (0, idx4);
	}
	if (arguments.length == 2) { // check subdomain
		var idx5 = host.indexOf ("." + locHost);
		return idx5 != -1 && idx5 == host.length - locHost.length - 1
				&& locPort == port && loc.protocol == protocol && loc.protocol != "file:";
	}
	return (locHost != host || locPort != port
			|| loc.protocol != protocol || loc.protocol == "file:");
}
return false; // ftp ...
	 */
	protected static boolean isXSSMode(String url) {
		return false;
	}
	
	/**
	 * Check that whether it is a subdomain of current location.
	 * @param url
	 * @return
	 * @j2sNative
	 * return window["j2s.disable.subdomain.xss"] != true
	 * 		&& net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode(url, true);
	 */
	protected static boolean isSubdomain(String url) {
		return false;
	}
	
	/**
	 * Check cross site script. Only make senses for JavaScript.
	 * 
	 * @param url
	 * @param serialize
	 * @param runnable
	 * @return
	 */
	protected static boolean checkXSS(String url, String serialize, SimpleRPCRunnable runnable) {
		/**
		 * @j2sNative
if (net.sf.j2s.ajax.SimpleRPCRequest.isXSSMode (url)) {
	if (runnable.$fai13d$ == true) {
		runnable.$fai13d$ = false;
	}
	var g = net.sf.j2s.ajax.SimpleRPCRequest;
	if (g.idSet == null) {
		g.idSet = new Object ();
	}
	var rnd = null;
	while (true) {
		var rnd = Math.random () + "0000000.*";
		rnd = rnd.substring (2, 8);
		if (g.idSet["o" + rnd] == null) {
			g.idSet["o" + rnd] = runnable;
			break;
		}
	}
	var limit = 7168; //8192;
	if (window["script.get.url.limit"] != null) {
		limit = window["script.get.url.limit"]; 
	}
	var ua = navigator.userAgent.toLowerCase ();
	if (ua.indexOf ("msie")!=-1 && ua.indexOf ("opera") == -1){
		limit = 2048 - 44; // ;jsessionid=
	}
	limit -= url.length + 36; // 5 + 6 + 5 + 2 + 5 + 2 + 5;
	var contents = [];
	var content = encodeURIComponent(serialize);
	if (content.length > limit) {
		parts = Math.ceil (content.length / limit);
		var lastEnd = 0;
		for (var i = 0; i < parts; i++) {
			var end = (i + 1) * limit;
			if (end > content.length) {
				end = content.length;
			} else {
				for (var j = 0; j < 3; j++) {
					var ch = content.charAt (end - j);
					if (ch == '%') {
						end -= j;
						break;
					}
				}
			}
			contents[i] = content.substring (lastEnd, end);
			lastEnd = end; 
		}
	} else {
		contents[0] = content;
	}
	if (contents.length > 1) {
		g.idSet["x" + rnd] = contents;
	}
	// Only send the first request, later server return "continue", and client will get
	// the session id and continue later requests.
	net.sf.j2s.ajax.SimpleRPCRequest.callByScript(rnd, contents.length, 0, contents[0]);
	contents[0] = null;
	return true; // cross site script!
}
		 */ { }
		 return false;
	}
	
	/**
	 * Clean up SCRIPT element's event handlers.
	 * @param scriptObj
	 * @return whether the SCRIPT element is already OK to clean up.
	 * @j2sNative
var userAgent = navigator.userAgent.toLowerCase ();
var isOpera = (userAgent.indexOf ("opera") != -1);
var isIE = (userAgent.indexOf ("msie") != -1) && !isOpera;
if (isIE) {
	if (scriptObj.onreadystatechange == null) {
		return false; // already cleaned up
	}
	var done = false;
	var state = "" + scriptObj.readyState;
	if (state == "loaded" || state == "complete") {
		scriptObj.onreadystatechange = null; 
		done = true;
	}
	return done;
} else {
	if (scriptObj.onerror == null) {
		return false; // already cleaned up
	}
	scriptObj.onerror = null;
	scriptObj.onload = null;
	return true;
}
	 */
	native static boolean cleanUp(Object scriptObj); // for JavaScript only
	
	/**
	 * @j2sNative
return function () {
	var g = net.sf.j2s.ajax.SimpleRPCRequest;
	if (!g.cleanUp(script)) {
		return; // IE, not completed yet
	}
	if (error) {
		var src = script.src;
		var idx = src.indexOf ("jzn=");
		var rid = src.substring (idx + 4, src.indexOf ("&", idx));
		net.sf.j2s.ajax.SimpleRPCRequest.xssNotify (rid, null);
	}
	if (script.onerror != null) { // W3C
		script.onerror = script.onload = null;
	} else { // IE
		script.onreadystatechange = null;
	}
	document.getElementsByTagName ("HEAD")[0].removeChild (script);
	script = null;
};
	 */
	native static Object generateCallback4Script(Object script, String rnd, boolean error);
	
	/**
	 * @j2sNative
var g = net.sf.j2s.ajax.SimpleRPCRequest;
var runnable = g.idSet["o" + rnd];
if (runnable == null) return;
var url = runnable.getHttpURL();
var session = g.idSet["s" + rnd];
if (session != null && window["script.get.session.url"] != false) {
	url += ";jsessionid=" + session;
}
var script = document.createElement ("SCRIPT");
script.type = "text/javascript";
script.src = url + "?jzn=" + rnd
		+ (length == 1 ? "" : ("&jzp=" + length + (i == 0 ? "" : "&jzc=" + (i + 1))))
		+ "&jzz=" + content;
var okFun = g.generateCallback4Script (script, rnd, false);
var errFun = g.generateCallback4Script (script, rnd, true);
var userAgent = navigator.userAgent.toLowerCase ();
var isOpera = (userAgent.indexOf ("opera") != -1);
var isIE = (userAgent.indexOf ("msie") != -1) && !isOpera;
script.defer = true;
if (typeof (script.onreadystatechange) == "undefined" || !isIE) { // W3C
	script.onerror = errFun;
	script.onload = okFun;
} else { // IE, IE won't detect script loading error until timeout!
	script.onreadystatechange = okFun;
}
var head = document.getElementsByTagName ("HEAD")[0];
head.appendChild (script);
var timeout = 30000;
if (window["j2s.ajax.reqeust.timeout"] != null) {
	timeout = window["j2s.ajax.reqeust.timeout"];
}
if (timeout < 1000) {
	timeout = 1000; // at least 1s for timeout
}
g.idSet["h" + rnd] = window.setTimeout (errFun, timeout);
	 */
	native static void callByScript(String rnd, String length, String i, String content);

	/**
	 * @j2sNative
var state = "" + this.readyState;
if (state == "loaded" || state == "complete") {
	this.onreadystatechange = null; 
	document.getElementsByTagName ("HEAD")[0].removeChild (this);
}
	 */
	native static void ieScriptCleanup();

	/**
	 * Cross site script notify. Only make senses for JavaScript.
	 * 
	 * @param nameID
	 * @param response
	 * @param session
	 */
	static void xssNotify(String nameID, String response, String session) {
		/**
		 * @j2sNative
var ua = navigator.userAgent.toLowerCase ();
if (response != null && ua.indexOf ("msie") != -1 && ua.indexOf ("opera") == -1) {
	var ss = document.getElementsByTagName ("SCRIPT");
	for (var i = 0; i < ss.length; i++) {
		var s = ss[i];
		if (s.src != null && s.src.indexOf ("jzn=" + nameID) != -1 // FIXME: Not totally safe
				&& s.readyState == "interactive") {
 			s.onreadystatechange = net.sf.j2s.ajax.SimpleRPCRequest.ieScriptCleanup;
	 	}
	}
}
var hKey = "h" + nameID;
var g = net.sf.j2s.ajax.SimpleRPCRequest;
if (g.idSet[hKey] != null) {
	window.clearTimeout (g.idSet[hKey]);
	delete g.idSet[hKey];
}
		 */ { }
		if (response == "continue") {
			/**
			 * @j2sNative
var g = net.sf.j2s.ajax.SimpleRPCRequest;
if (session != null){
	g.idSet["s" + nameID] = session;
}
var k = "x" + nameID;
var xcontent = g.idSet[k]; 
if (xcontent != null) {
	// Send out requests one by one.  
	for (var i = 0; i < xcontent.length; i++) {
		if (xcontent[i] != null) {
			g.callByScript(nameID, xcontent.length, i, xcontent[i]);
			xcontent[i] = null;
			break;
		}
	}
	
	var more = false;
	for (var i = xcontent.length - 1; i >= 0; i--) {
		if (xcontent[i] != null) {
			more = true;
			break;
		}
	}
	if (!more) { // all contents are sent
		g.idSet[k] = null;
		delete g.idSet[k];
	}
}
			 */ {}
			return;
		}
		SimpleRPCRunnable runnable = null;
		/**
		 * @j2sNative
var g = net.sf.j2s.ajax.SimpleRPCRequest;
var oK = "o" + nameID;
runnable = g.idSet[oK];
g.idSet[oK] = null;
delete g.idSet[oK];
var sK = "s" + nameID;
if (g.idSet[sK] != null) {
	g.idSet[sK] = null;
	delete g.idSet[sK];
}
if (response == null && runnable != null) { // error!
	runnable.$fai13d$ = true;
	runnable.ajaxFail();
	return;
}
		 */ {}
		if (response == "unsupported" || response == "exceedrequestlimit" || response == "error") {
			String src = null;
			/**
			 * @j2sNative
var existed = false;
var ss = document.getElementsByTagName ("SCRIPT");
for (var i = 0; i < ss.length; i++) {
	var s = ss[i];
	if (s.src != null && s.src.indexOf ("jzn=" + nameID) != -1) {
		src = s.src;
		existed = true;
		s.onreadystatechange = null;
		s.onerror = null;
		s.onload = null;
		document.getElementsByTagName ("HEAD")[0].removeChild (s);
 	}
}
if (!existed && runnable == null) {
	return; // already print out error message!
}
			 */ {}
			if (runnable != null) {
				runnable.ajaxFail();
			} else {
				if (response == "error") {
					System.err.println("[Java2Script] Sever error: URL \"" + src + "\" is semantically incorrect!");
				} else if (response == "unsupported") {
					System.err.println("[Java2Script] Sever error: Cross site script is not supported!");
				} else {
					System.err.println("[Java2Script] Sever error: Exceed cross site script request limit!");
				}
			}
			return;
		}
		if (runnable != null) {
			/**
			 * @j2sNative
			 * if (runnable.$fai13d$ == true) {
			 * 	return; // already failed, should not call #ajaxOut!
			 * }
			 */ {}
			runnable.deserialize(response);
			runnable.ajaxOut();
		}
	}
}
