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

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import net.sf.j2s.ajax.HttpRequest;
import net.sf.j2s.ajax.SimpleRPCRequest;
import net.sf.j2s.ajax.SimpleSerializable;
import net.sf.j2s.ajax.XHRCallbackAdapter;
import net.sf.j2s.annotation.J2SIgnore;

/**
 * 
 * @author zhou renjian
 * 
 * @j2sSuffix
 * window["$p1p3p$"] = net.sf.j2s.ajax.SimplePipeRequest.parseReceived;
 * window["$p1p3b$"] = net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack;
 */
public class SimplePipeRequest extends SimpleRPCRequest {
	
	/**
	 * Status of pipe: ok.
	 */
	protected static final String PIPE_STATUS_OK = "o"; // "ok";

	/**
	 * Status of pipe: destroyed.
	 */
	protected static final String PIPE_STATUS_DESTROYED = "d"; // "destroyed";

	/**
	 * Status of pipe: continue.
	 */
	protected static final String PIPE_STATUS_CONTINUE = "e"; // "continue";
	
	/**
	 * Status of pipe: lost.
	 */
	protected static final String PIPE_STATUS_LOST = "l"; // "lost";

	
	/**
	 * Type of pipe request: query
	 */
	protected static final String PIPE_TYPE_QUERY = "q"; // "query";
	
	/**
	 * Type of pipe request: subdomain-query
	 */
	protected static final String PIPE_TYPE_SUBDOMAIN_QUERY = "u"; // "subdomain-query";
	
	/**
	 * Type of pipe request: notify
	 */
	protected static final String PIPE_TYPE_NOTIFY = "n"; // "notify";
	
	/**
	 * Type of pipe request: script
	 */
	protected static final String PIPE_TYPE_SCRIPT = "s"; // "script";
	
	/**
	 * Type of pipe request: xss
	 */
	protected static final String PIPE_TYPE_XSS = "x"; // "xss";
	
	/**
	 * Type of pipe request: continuum
	 */
	protected static final String PIPE_TYPE_CONTINUUM = "c"; // "continuum";
	
	
	/**
	 * Query key for pipe: pipekey
	 */
	protected static final String FORM_PIPE_KEY = "k"; // "pipekey";
	
	/**
	 * Query key for pipe: pipetype
	 */
	protected static final String FORM_PIPE_TYPE = "t"; // "pipetype";
	
	/**
	 * Query key for pipe: pipetype
	 */
	protected static final String FORM_PIPE_DOMAIN = "d"; // "pipedomain";

	/**
	 * Query key for pipe: pipernd
	 */
	protected static final String FORM_PIPE_RANDOM = "r"; // "pipernd";
	
	static final int PIPE_KEY_LENGTH = 6;

	public static final int MODE_PIPE_QUERY = 3;
	
	public static final int MODE_PIPE_CONTINUUM = 4;
	
	private static int pipeMode = MODE_PIPE_CONTINUUM;
	
	private static long pipeQueryInterval = 1000;
	
	static long pipeLiveNotifyInterval = 25000;
	
	private static long reqCount = 0;
	
	static Object pipeScriptMap = new Object();
	
	public static int getPipeMode() {
		return pipeMode;
	}
	
	public static long getQueryInterval() {
		return pipeQueryInterval;
	}
	
	public static void switchToQueryMode() {
		pipeMode = MODE_PIPE_QUERY;
		pipeQueryInterval = 1000;
	}
	
	public static void switchToQueryMode(long ms) {
		pipeMode = MODE_PIPE_QUERY;
		if (ms < 0) {
			ms = 1000;
		}
		pipeQueryInterval = ms;
	}
	
	public static void switchToContinuumMode() {
		pipeMode = MODE_PIPE_CONTINUUM;
	}
	
	/**
	 * Construct request string for pipe.
	 * @param pipeKey
	 * @param pipeRequestType
	 * @param rand
	 * @return request data for both GET and POST request. 
	 */
	protected static String constructRequest(String pipeKey, String pipeRequestType, boolean rand) {
		reqCount++;
		return FORM_PIPE_KEY + "=" + pipeKey + "&" 
				+ FORM_PIPE_TYPE + "=" + pipeRequestType 
				+ (rand ? "&" + FORM_PIPE_RANDOM + "=" + reqCount : "");
	}
	
	protected static void sendRequest(HttpRequest request, String method, String url, 
			String data, boolean async) {
		if ("GET".equals(method.toUpperCase())) {
			request.open(method, url + (url.indexOf('?') != -1 ? "&" : "?") + data, async);
			request.send(null);
		} else {
			request.open(method, url, async);
			request.send(data);
		}
	}
	
	/**
	 * 
	 * @param runnable
	 * 
	 * @j2sNative
	 * runnable.ajaxIn ();
	 * net.sf.j2s.ajax.SimplePipeRequest.pipeRequest(runnable);
	 */
	public static void pipe(final SimplePipeRunnable runnable) {
		runnable.ajaxIn();
		if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
			(new Thread("Pipe Request Thread") {
				public void run() {
					try {
						runnable.ajaxRun();
					} catch (RuntimeException e) {
						e.printStackTrace(); // should never fail in Java thread mode!
						runnable.ajaxFail();
						return;
					}
					keepPipeLive(runnable);
					runnable.ajaxOut();
				}
			}).start();
		} else {
			pipeRequest(runnable);
		}
	}

	/*
	 * Be used in Java mode to keep the pipe live.
	 */
	@J2SIgnore
	static void keepPipeLive(final SimplePipeRunnable runnable) {
		Thread thread = new Thread(new Runnable() {
			
			public void run() {
				long lastLiveDetected = System.currentTimeMillis();
				do {
					long interval = pipeLiveNotifyInterval;
					
					while (interval > 0) {
						try {
							Thread.sleep(Math.min(interval, 1000));
							interval -= 1000;
						} catch (InterruptedException e) {
							//e.printStackTrace();
						}
						if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
							if (!runnable.isPipeLive()) {
								break;
							}
						} else {
							SimplePipeRunnable pipeRunnable = SimplePipeHelper.getPipe(runnable.pipeKey);
							if (pipeRunnable == null || !pipeRunnable.isPipeLive()) {
								break;
							}
						}
					}
					
					if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
						boolean pipeLive = runnable.isPipeLive();
						if (pipeLive) {
							runnable.keepPipeLive();
							lastLiveDetected = System.currentTimeMillis();
						} else {
							if (System.currentTimeMillis() - lastLiveDetected > runnable.pipeWaitClosingInterval()) {
								runnable.pipeDestroy(); // Pipe's server side destroying
								runnable.pipeClosed(); // Pipe's client side closing
								break;
							}
						}
					} else {
						SimplePipeRunnable r = SimplePipeHelper.getPipe(runnable.pipeKey);
						if (r != null) {
							HttpRequest request = new HttpRequest();
							String pipeKey = runnable.pipeKey;
							String pipeMethod = runnable.getPipeMethod();
							String pipeURL = runnable.getPipeURL();

							String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_NOTIFY, false);
							sendRequest(request, pipeMethod, pipeURL, pipeRequestData, false);
							String response = request.getResponseText();
							if (response != null && response.indexOf("\"" + PIPE_STATUS_LOST + "\"") != -1) {
								runnable.pipeAlive = false;
								runnable.pipeLost();
								SimplePipeHelper.removePipe(pipeKey);
								// may need to inform user that connection is already lost!
								break;
							}
						} else {
							break;
						}
					}
				} while (true);
			}
		
		}, "Pipe Live Notifier Thread");
		thread.setDaemon(true);
		thread.start();
	}

	private static void pipeRequest(final SimplePipeRunnable runnable) {
		String url = runnable.getHttpURL();
		String method = runnable.getHttpMethod();
		String serialize = runnable.serialize();
		if (method == null) {
			method = "POST";
		}
		Object ajaxOut = null;
		/**
		 * Need to call #ajaxPipe inside #checkXSS
		 * 
		 * @j2sNative
		 * ajaxOut = runnable.ajaxOut;
		 * if (ajaxOut.wrapped != true) {
		 * runnable.ajaxOut = (function (aO, r) {
		 * 	return function () {
		 * 		aO.apply (r, []);
		 * 		r.ajaxOut = aO;
		 * 		net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe (r);
		 * 	};
		 * }) (ajaxOut, runnable);
		 * runnable.ajaxOut.wrapped = true;
		 * }
		 */ { if (ajaxOut == null) ajaxOut = null; /* no warning */ }
		if (checkXSS(url, serialize, runnable)) {
			// Already send out pipe request in XSS mode. Just return here.
			return;
		}
		/**
		 * @j2sNative
		 * runnable.ajaxOut = ajaxOut;
		 */ {}
		String url2 = SimpleRPCRequest.adjustRequestURL(method, url, serialize);
		if (url2 != url) {
			serialize = null;
		}
		final HttpRequest request = new HttpRequest();
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
				
				ajaxPipe(runnable);
			}
		});
		request.send(serialize);
	}
	
	/**
	 * 
	 * @param url
	 * @j2sNative
var map = net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap;
var pipe = map[url];
if (pipe != null) {
	pipe.queryEnded = true;
	delete map[url];
}
	 */
	native static void updatePipeByURL(String url);

	/**
	 * @j2sNative
return function () {
	if (iframeID != null) {
		if (window.parent == null || window.parent["net"] == null) return;
		if (!window.parent.net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)) {
			return; // IE, not completed yet
		}
		window.parent.net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL (this.url);
		this.url = null;
		document.getElementsByTagName ("HEAD")[0].removeChild (this);
		var iframe = window.parent.document.getElementById (iframeID);
		if (iframe != null) {
			iframe.parentNode.removeChild (iframe);
		}
	} else {
		if (window == null || window["net"] == null) return;
		if (!net.sf.j2s.ajax.SimpleRPCRequest.cleanUp(this)) {
			return; // IE, not completed yet
		}
		net.sf.j2s.ajax.SimplePipeRequest.updatePipeByURL (this.url);
		this.url = null;
		document.getElementsByTagName ("HEAD")[0].removeChild (this);
	}
};
	 */
	native static Object generatePipeScriptCallback(String iframeID);
	
	/**
	 * Load or send data for pipe using SCRIPT tag.
	 * 
	 * @param url
	 * 
	 * @j2sNative
var script = document.createElement ("SCRIPT");
script.type = "text/javascript";
script.src = url;
script.url = url;
var iframeID = arguments[1];
var userAgent = navigator.userAgent.toLowerCase ();
var isOpera = (userAgent.indexOf ("opera") != -1);
var isIE = (userAgent.indexOf ("msie") != -1) && !isOpera;
var fun = net.sf.j2s.ajax.SimplePipeRequest.generatePipeScriptCallback (iframeID);
script.defer = true;
if (typeof (script.onreadystatechange) == "undefined" || !isIE) { // W3C
	script.onload = script.onerror = fun;
} else { // IE
	script.onreadystatechange = fun;
}
var head = document.getElementsByTagName ("HEAD")[0];
head.appendChild (script);
	 */
	native static void loadPipeScript(String url);

	/**
	 * Load or send data for pipe using SCRIPT tag.
	 * 
	 * @param url
	 * 
	 * @j2sNative
var iframe = document.createElement ("IFRAME");
iframe.style.display = "none";
var iframeID = null;
do {
	iframeID = "pipe-script-" + Math.round (10000000 * Math.random ());
} while (document.getElementById (iframeID) != null);
iframe.id = iframeID;
document.body.appendChild (iframe);
var html = "<html><head><title></title>";
html += "<script type=\"text/javascript\">\r\n";
html += "window[\"$p1p3p$\"] = function (string) {\r\n";
html += "		with (window.parent) {\r\n";
html += "				net.sf.j2s.ajax.SimplePipeRequest.parseReceived (string);\r\n";
html += "		};\r\n";
html += "};\r\n";
html += "window[\"$p1p3b$\"] = function (key, result) {\r\n";
html += "		with (window.parent) {\r\n";
html += "				net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack (key, result);\r\n";
html += "		};\r\n";
html += "};\r\n";
html += "</scr" + "ipt></head><body><script type=\"text/javascript\">\r\n";
if (ClassLoader.isOpera)
html += "window.setTimeout (function () {\r\n";
html += "net = { sf : { j2s : { ajax : { SimplePipeRequest : { generatePipeScriptCallback : " + net.sf.j2s.ajax.SimplePipeRequest.generatePipeScriptCallback + " } } } } };";
html += "(" + net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript + ") (";
html += "\"" + url.replace (/"/g, "\\\"") + "\", \"" + iframeID + "\"";
html += ");\r\n";
if (ClassLoader.isOpera)
html += "}, " + (net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval >> 2) + ");\r\n";
html += "</scr" + "ipt></body></html>";
net.sf.j2s.ajax.SimplePipeRequest.iframeDocumentWrite (iframe, html);
	 */
	native static void loadPipeIFrameScript(String url); // for JavaScript only
	
	/**
	 * @j2sNative
return function () {
	var doc = handle.contentWindow.document;
	doc.open ();
	doc.write (html);
	doc.close ();
	// To avoid blank title in title bar
	document.title = document.title;
	handle = null;
};
	 */
	native static Object generateLazyIframeWriting(Object handle, String html);
	
	/**
	 * @param handle
	 * @param html
	 * @j2sNative
	var handle = arguments[0];
	var html = arguments[1];
	if (handle.contentWindow != null) {
		handle.contentWindow.location = "about:blank";
	} else { // Opera
		handle.src = "about:blank";
	}
	try {
		var doc = handle.contentWindow.document;
		doc.open ();
		doc.write (html);
		doc.close ();
		// To avoid blank title in title bar
		document.title = document.title;
	} catch (e) {
		window.setTimeout (net.sf.j2s.ajax.SimplePipeRequest.generateLazyIframeWriting (handle, html), 25);
	}
	 */
	native static void iframeDocumentWrite(Object handle, String html);
	
	static void pipeScript(SimplePipeRunnable runnable) { // xss
		String url = runnable.getPipeURL();
		String requestURL = url + (url.indexOf('?') != -1 ? "&" : "?")
				+ constructRequest(runnable.pipeKey, PIPE_TYPE_XSS, true);
		/**
		 * @j2sNative
		 * net.sf.j2s.ajax.SimplePipeRequest.pipeScriptMap[requestURL] = runnable;
		 */ {}
		if (isXSSMode(url)) {
			// in xss mode, iframe is used to avoid blocking other *.js loading 
			loadPipeIFrameScript(requestURL);
			return;
		}
		loadPipeScript(requestURL); // never reach here? March 5, 2009
		// only for JavaScript
	}
	
	/**
	 * @param runnable
	 * @param domain
	 * @j2sNative
var pipeKey = runnable.pipeKey;
var spr = net.sf.j2s.ajax.SimplePipeRequest;
var url = runnable.getPipeURL();
spr.pipeIFrameClean (pipeKey, url);
var ifr = document.createElement ("IFRAME");
ifr.style.display = "none";
var src = url + (url.indexOf('?') != -1 ? "&" : "?") 
		+ spr.constructRequest(pipeKey, spr.PIPE_TYPE_SUBDOMAIN_QUERY, true)
		+ "&" + spr.FORM_PIPE_DOMAIN + "=" + domain;
ifr.id = "pipe-" + pipeKey;
ifr.src = src;
document.body.appendChild (ifr);
	 */
	native static void pipeSubdomainQuery(SimplePipeRunnable runnable, String domain); // for JavaScript only
	
	static void pipeNotify(SimplePipeRunnable runnable) { // notifier
		String url = runnable.getPipeURL();
		loadPipeScript(url + (url.indexOf('?') != -1 ? "&" : "?")
				+ constructRequest(runnable.pipeKey, PIPE_TYPE_NOTIFY, true));
		// only for JavaScript
	}
	
	static void pipeNotifyCallBack(String key, String result) {
		if (PIPE_STATUS_LOST.equals(result)) {
			SimplePipeRunnable pipe = SimplePipeHelper.getPipe(key);
			if (pipe != null) {
				pipe.pipeAlive = false;
				pipe.pipeLost();
				SimplePipeHelper.removePipe(key);
			}
		}
		// only for JavaScript
	}
	
	/**
	 * Each query will tell that the pipe is still alive.
	 * 
	 * @param runnable
	 */
	static void pipeQuery(final SimplePipeRunnable runnable) {
		final HttpRequest pipeRequest = new HttpRequest();
		String pipeKey = runnable.pipeKey;
		String pipeMethod = runnable.getPipeMethod();
		String pipeURL = runnable.getPipeURL();
		
		pipeRequest.registerOnReadyStateChange(new XHRCallbackAdapter() {
		
			@Override
			public void onLoaded() {
				/**
				 * Maybe user click on refresh button!
				 * @j2sNative
				 * if (window == null || window["net"] == null) return;
				 */ {}
				if (pipeRequest.getStatus() != 200) {
					runnable.queryFailedRetries++;
					runnable.queryEnded = true;
					return;
				}
				runnable.queryFailedRetries = 0; // succeeded
				parseReceived(pipeRequest.getResponseText());
				runnable.queryEnded = true;
			}
		
		});

		boolean async = false;
		/**
		 * In JavaScript such queries are not wrapped inside Thread, so asynchronous mode is required!
		 * @j2sNative
		 * async = true;
		 */ {}
		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_QUERY, true);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, async);
	}

	/**
	 * Create pipe connection for the SimplePipeRunnable.
	 * In Java, customized HttpRequest object is used to create Comet connection.
	 * In JavaScript, IFRAME is used to simulate Comet connection.
	 * In both mode, it is necessary to notify the server that pipe's client end is still
	 * alive in periods.
	 * To send out the notification, Java mode just send out request by HttpRequest, JavaScript
	 * mode will try to send notification requests in XMLHttpRequest or SCRIPT mode according
	 * to the scenarios.
	 * 
	 * @param runnable
	 * 
	 * @j2sNative
var pipeKey = runnable.pipeKey;
var spr = net.sf.j2s.ajax.SimplePipeRequest;
var url = runnable.getPipeURL();
spr.pipeIFrameClean (pipeKey, url);
var subdomain = arguments[1];
(function () { // avoiding element reference in closure
var ifr = document.createElement ("IFRAME");
ifr.style.display = "none";
ifr.id = "pipe-" + pipeKey;
ifr.src = url + (url.indexOf('?') != -1 ? "&" : "?") 
		+ spr.constructRequest(pipeKey, spr.PIPE_TYPE_SCRIPT, true)
		+ (subdomain == null ? ""
				: "&" + spr.FORM_PIPE_DOMAIN + "=" + subdomain);
document.body.appendChild (ifr);
}) ();
var fun = (function (key, pipeURL, created) {
	return function () {
		var sph = net.sf.j2s.ajax.SimplePipeHelper;
		var runnable = sph.getPipe(key);
		if (runnable != null) {
			var spr = net.sf.j2s.ajax.SimplePipeRequest;
			var now = new Date ().getTime ();
			var last = runnable.lastPipeDataReceived;
			if (last == -1) {
				last = created;
			}
			if (now - last > 4 * spr.pipeLiveNotifyInterval) {
				runnable.pipeAlive = false;
				runnable.pipeClosed();
				sph.removePipe(key);
				spr.pipeIFrameClean (key, pipeURL);
			} else {
				spr.pipeNotify (runnable);
				window.setTimeout (arguments.callee, spr.pipeLiveNotifyInterval);
			}
		}
	};
}) (runnable.pipeKey, runnable.getPipeURL (), new Date ().getTime ());
window.setTimeout (fun, spr.pipeLiveNotifyInterval);
	 */
	static void pipeContinuum(final SimplePipeRunnable runnable) {
		HttpRequest pipeRequest = new HttpRequest() {
			
			/*
			 * A hack to make HttpRequest to support receiving and parsing data
			 * in a Comet way.
			 * 
			 * (non-Javadoc)
			 * @see net.sf.j2s.ajax.HttpRequest#initializeReceivingMonitor()
			 */
			@Override
			protected IXHRReceiving initializeReceivingMonitor() {
				return new HttpRequest.IXHRReceiving() {
					public boolean receiving(ByteArrayOutputStream baos, byte b[], int off, int len) {
						baos.write(b, off, len);
						/*
						 * It is OK to convert to string, because SimpleSerialize's
						 * serialized string contains only ASCII chars.
						 */
						String string = baos.toString();
						String resetString = parseReceived(string);
						if (resetString != null) {
							baos.reset();
							try {
								baos.write(resetString.getBytes());
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
						return true;
					}
				
				};
			}
		
		};
		
		pipeRequest.registerOnReadyStateChange(new XHRCallbackAdapter() {
		
			@Override
			public void onReceiving() {
				keepPipeLive(runnable);
			}

			@Override
			public void onLoaded() { // on case that no destroy event is sent to client
				String pipeKey = runnable.pipeKey;
				if (SimplePipeHelper.getPipe(pipeKey) != null) {
					runnable.pipeClosed(); // may set runnable.pipeKey = null;
					SimplePipeHelper.removePipe(pipeKey);
				}
			}
		
		});
		pipeRequest.setCometConnection(true);

		String pipeKey = runnable.pipeKey;
		String pipeMethod = runnable.getPipeMethod();
		String pipeURL = runnable.getPipeURL();

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_SCRIPT, false);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, true);
	}
	
	/**
	 * Clean pipe's IFRAME elements
	 * @param pipeKey
	 * 
	 * @j2sNative
var iframes = document.getElementsByTagName ("IFRAME");
for (var i = 0; i < iframes.length; i++) {
	var el = iframes[i];
	if (urlPrefix != null) {
		var url = null;
		try {
			url = el.url;
		} catch (e) {
			try {
				url = el.contentWindow.location;
			} catch (e) {
			}
		}
		if (url != null && url.indexOf (urlPrefix) == 0) {
			el.parentNode.removeChild (el);
			continue;
		}
	}
	if (el.id == pipeKey || el.id == "pipe-" + pipeKey) {
		el.parentNode.removeChild (el);
		continue;
	}
}
	 */
	native static void pipeIFrameClean(String pipeKey, String urlPrefix); // for JavaScript only
	
	/**
	 * Parse a SimpleSerializable object's string from given string.
	 * 
	 * The given string should be in format of "X...WLL101...#...$...". The first
	 * 32-length string is pipe key string. And the following string is the
	 * serialized string of SimpleSerializable object or "pipe-is-destroyed",
	 * which indicates that pipe is destroyed.
	 * 
	 * If given string is not in the above format, it is considered that the
	 * string is not completed yet. And in this scenario, return null to
	 * indicate to keep receiving more data before call this method again.
	 * 
	 * If given string contains above format string fragment, the segment
	 * will be parsed and relative {@link SimplePipeRunnable#deal(SimpleSerializable)}
	 * will be called on the string fragment. And the rest string is returned
	 * so later data may continue to construct a new string. 
	 * 
	 * @param string
	 * @return null if given string is not completed, or rest of string after
	 * being parsed.
	 */
	public static String parseReceived(final String string) {
		//System.out.println(string);
		if (string == null) {
			return null;
		}
		SimpleSerializable ss = null;
		int start = 0;
		while (string.length() > start + PIPE_KEY_LENGTH) { // should be bigger than 48 ( 32 + 6 + 1 + 8 + 1)
			String destroyedKey = PIPE_STATUS_DESTROYED;
			int end = start + PIPE_KEY_LENGTH;
			if (destroyedKey.equals(string.substring(end,
					end + destroyedKey.length()))) {
				String key = string.substring(start, end);
				SimplePipeRunnable pipe = SimplePipeHelper.getPipe(key);
				if (pipe != null) {
					pipe.pipeAlive = false;
					pipe.pipeClosed();
					SimplePipeHelper.removePipe(key);
				}
				return string.substring(end + destroyedKey.length());
			}
			String okKey = PIPE_STATUS_OK;
			end = start + PIPE_KEY_LENGTH;
			if (okKey.equals(string.substring(end, end + okKey.length()))) {
				String key = string.substring(start, end);
				SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
				if (runnable != null) { // should always satisfy this condition
					runnable.lastPipeDataReceived = System.currentTimeMillis();
				}
				return string.substring(end + okKey.length());
			}
			boolean isJavaScript = false;
			/**
			 * @j2sNative
			 * isJavaScript = true;
			 */ {}
			if (isJavaScript) { // for SCRIPT mode only
				String continueKey = PIPE_STATUS_CONTINUE;
				end = start + PIPE_KEY_LENGTH;
				if (continueKey.equals(string.substring(end,
						end + continueKey.length()))) {
					String key = string.substring(start, end);
					SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
					if (runnable != null) { // should always satisfy this condition
						runnable.lastPipeDataReceived = System.currentTimeMillis();
						pipeIFrameClean(runnable.pipeKey, runnable.getPipeURL()); // FIXME: getPipeURL might be incorrect
						String pipeURL = runnable.getPipeURL();
						boolean isXSS = isXSSMode(pipeURL);
						boolean isSubdomain = false;
						if (isXSS) {
							isSubdomain = isSubdomain(pipeURL);
						}
						String subdomain = adjustSubdomain(isSubdomain);
						/**
						 * @j2sNative
						 * net.sf.j2s.ajax.SimplePipeRequest.pipeContinuum(runnable, subdomain);
						 */ { subdomain.isEmpty(); }
					}
					return string.substring(end + continueKey.length());
				}
			}
			if ((ss = SimpleSerializable.parseInstance(string, end)) == null
					|| !ss.deserialize(string, end)) {
				break;
			}
			String key = string.substring(start, end);
			SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
			if (runnable != null) { // should always satisfy this condition
				runnable.lastPipeDataReceived = System.currentTimeMillis();
				runnable.deal(ss);
			}
			
			start = restStringIndex(string, start);
		}
		if (start != 0) {
			return string.substring(start);
		}
		return string;
	}

	/*
	 * Return the string index from beginning of next SimpleSerializable
	 * instance.
	 */
	static int restStringIndex(final String string, int start) {
		// Format: WLL101ClassName#NNNNNN$SerializedData...
		int idx1 = string.indexOf('#', start) + 1;
		int idx2 = string.indexOf('$', idx1);
		String sizeStr = string.substring(idx1, idx2);
		sizeStr = sizeStr.replaceFirst("^0+", "");
		int size = 0;
		if (sizeStr.length() != 0) {
			try {
				size = Integer.parseInt(sizeStr);
			} catch (NumberFormatException e) {
				//
			}
		}
		int end = idx2 + size + 1;
		if (end <= string.length()) {
			//string = string.substring(end);
			return end;
		} else {
			return start;
		}
		//return string;
	}
	
	/**
	 * 
	 * @param isSubdomain
	 * @return
	 * @j2sNative
	 * var subdomain = null;
	 * if (isSubdomain) {
	 * 	subdomain = window.location.host;
	 * 	if (subdomain != null) {
	 * 		var idx = subdomain.indexOf (":");
	 * 		if (idx != -1) {
	 * 			subdomain = subdomain.substring (0, idx);
	 * 		}
	 * 		document.domain = subdomain; // set owner iframe's domain
	 * 	}
	 * }
	 * return subdomain;
	 */
	native static String adjustSubdomain(boolean isSubdomain); // for JavaScript only
	
	/**
	 * Start pipe in AJAX mode.
	 * In Java mode, thread is used to receive data from pipe.
	 * In JavaScript mode, IFRAME or XHR/SCRIPT requests are used to receive data 
	 * from server.
	 * 
	 * @param runnable
	 */
	static void ajaxPipe(final SimplePipeRunnable runnable) {
		SimplePipeHelper.registerPipe(runnable.pipeKey, runnable);
		
		/*
		 * Here in JavaScript mode, try to detect whether it's in cross site
		 * script mode or not. In XSS mode, <SCRIPT> is used to make requests. 
		 */
		String pipeURL = runnable.getPipeURL();
		boolean isXSS = isXSSMode(pipeURL);
		boolean isSubdomain = false;
		if (isXSS) {
			isSubdomain = isSubdomain(pipeURL);
		}

		if ((!isXSS || isSubdomain) && pipeMode == MODE_PIPE_CONTINUUM)
			/**
			 * @j2sNative
			 * var spr = net.sf.j2s.ajax.SimplePipeRequest;
			 * var subdomain = spr.adjustSubdomain (isSubdomain);
			 * spr.pipeContinuum (runnable, subdomain);
			 */
		{
			//pipeQuery(runnable, "continuum");
			(new Thread(){
				public void run() {
					pipeContinuum(runnable);
				}
			}).start();
		} else
			/**
			 * @j2sNative
var spr = net.sf.j2s.ajax.SimplePipeRequest;
if (isXSS && isSubdomain && spr.isSubdomainXSSSupported ()) {
	var subdomain = spr.adjustSubdomain (isSubdomain);
	spr.pipeSubdomainQuery (runnable, subdomain);
	return;
}
runnable.queryEnded = true;
(function (pipeFun, key, pipeURL, created) { // Use function to simulate Thread
	return function () {
		var sph = net.sf.j2s.ajax.SimplePipeHelper;
		var runnable = sph.getPipe(key);
		if (runnable != null) {
			var spr = net.sf.j2s.ajax.SimplePipeRequest;
			var now = new Date ().getTime ();
			var last = runnable.lastPipeDataReceived;
			if (last == -1) {
				last = created;
			}
			if ((runnable.queryEnded || now - last >= spr.pipeLiveNotifyInterval)
					&& runnable.queryFailedRetries < 3) {
				runnable.queryEnded = false;
				if (runnable.received == runnable.lastPipeDataReceived
						&& runnable.retries == runnable.queryFailedRetries) {
					runnable.queryFailedRetries++; // response must not be empty
				}
				pipeFun (runnable);
			}
			runnable.retries = runnable.queryFailedRetries;
			runnable.received = runnable.lastPipeDataReceived;
			if (runnable.queryFailedRetries >= 3
					|| now - last > 3 * spr.pipeLiveNotifyInterval) {
				runnable.pipeAlive = false;
				runnable.pipeClosed();
				sph.removePipe(key);
				spr.pipeIFrameClean (key, pipeURL);
			} else {
				window.setTimeout (arguments.callee, spr.pipeQueryInterval);
			}
		}
	};
}) ((!isXSS) ? spr.pipeQuery : spr.pipeScript, runnable.pipeKey,
		runnable.getPipeURL (), new Date ().getTime ()) ();
			 */
		{
			final String key = runnable.pipeKey;
			final long created = System.currentTimeMillis();
			Thread thread = new Thread("Pipe Monitor Thread") {
				public void run() {
					SimplePipeRunnable runnable = null;
					while ((runnable = SimplePipeHelper.getPipe(key)) != null) {
						pipeQuery(runnable);
						
						long now = System.currentTimeMillis();
						long last = runnable.lastPipeDataReceived;
						if (last == -1) {
							last = created;
						}
						if (runnable.queryFailedRetries >= 3
								|| now - last > 3 * pipeLiveNotifyInterval) {
							runnable.pipeAlive = false;
							runnable.pipeClosed();
							SimplePipeHelper.removePipe(key);
							return;
						}

						try {
							Thread.sleep(pipeQueryInterval);
						} catch (InterruptedException e) {
							//e.printStackTrace();
						}
					}
				}
			};
			thread.setDaemon(true);
			thread.start();
		}
	}

	/**
	 * For early version of Firefox (<1.5) and Opera (<9.6), subdomain XSS
	 * query may be unsupported.
	 * 
	 * @return whether subdomain XSS is supported or not.
	 * 
	 * @j2sNative
	var dua = navigator.userAgent;
	var dav = navigator.appVersion;
	if (dua.indexOf("Opera") != -1 && parseFloat (dav) < 9.6) {
		return false;
	}
	if (dua.indexOf("Firefox") != -1 && parseFloat (dav) < 1.5) {
		return false;
	}
	if (dua.indexOf("MSIE") != -1 && parseFloat (dav) < 6.0) {
		return false;
	}
	return true;
	 */
	native static boolean isSubdomainXSSSupported(); // for JavaScript only
	
	/**
	 * 
	 * @param p
	 * @j2sNative
p.initParameters = function () {
	this.parentDomain = document.domain;
	this.pipeQueryInterval = 1000;
	this.pipeLiveNotifyInterval = 25000;
	this.runnable = null;
	this.lastXHR = -1;
	var oThis = this;
	with (window.parent) {
		var sph = net.sf.j2s.ajax.SimplePipeHelper;
		var spr = net.sf.j2s.ajax.SimplePipeRequest;
		this.runnable = sph.getPipe(this.key);
		this.pipeQueryInterval = spr.getQueryInterval ();
		this.pipeLiveNotifyInterval = spr.pipeLiveNotifyInterval;
	}
	if (this.runnable == null) { // refreshing
		eval ("(" + window.parent.net.sf.j2s.ajax.SimplePipeRequest.checkIFrameSrc + ") ();");
	} else {
		this.runnable.queryEnded = true;
	}
	if (this.runnable != null) {
		this.pipeURL = this.runnable.getPipeURL ();
	}
};
p.initHttpRequest = function () {
	this.xhrHandle = null;
	if (window.XMLHttpRequest) {
		this.xhrHandle = new XMLHttpRequest();
	} else {
		try {
			this.xhrHandle = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			this.xhrHandle = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	var oThis = this;
	this.xhrHandle.onreadystatechange = function () {
		if (oThis.xhrHandle == null) {
			oThis = null;
			return;
		}
		var state = oThis.xhrHandle.readyState;
		if (state == 4) {
			var pipeData = oThis.xhrHandle.responseText;
			oThis.xhrHandle.onreadystatechange = null;
			var pipe = oThis.runnable;
			if (oThis.xhrHandle.status != 200 && pipe != null) {
				oThis.xhrHandle = null;
				document.domain = oThis.parentDomain;
				with (window.parent) {
					pipe.queryFailedRetries++;
					pipe.queryEnded = true;
				}
				oThis = null;
				return;
			}
			pipe.queryFailedRetries = 0; // succeeded
			oThis.xhrHandle = null;
			document.domain = oThis.parentDomain;
			pipe.queryEnded = true;
			with (window.parent) {
				net.sf.j2s.ajax.SimplePipeRequest.parseReceived (pipeData);
				oThis.runnable = net.sf.j2s.ajax.SimplePipeHelper.getPipe (oThis.key);
			}
			oThis = null;
		}
	};
};
p.pipeXHRQuery = function (request, method, url, data) {
	if ("GET" == method.toUpperCase ()) {
		request.open (method, url + (url.indexOf ('?') != -1 ? "&" : "?") + data, true, null, null);
		data = null;
	} else {
		request.open (method, url, true, null, null);
	}
	try {
		if (ClassLoader != null && ClassLoader.isGecko) {
			request.setRequestHeader ("User-Agent", "Java2Script/2.0.0");
		}
	} catch (e) {
		// log ("Setting 'User-Agent' header error : " + e);
	}
	if (method != null && method.toLowerCase () == "post") {
		try {
			request.setRequestHeader ("Content-type", 
					"application/x-www-form-urlencoded");
		} catch (e) {
			// log ("Setting 'Content-type' header error : " + e);
		}
		if (request.overrideMimeType) {
			try {
				// request.setRequestHeader ("Connection", "close");
			} catch (e) {
				// log ("Setting 'Connection' header error : " + e);
			}
		}
	}
	request.send(data);
};
p.initParameters ();
	 */
	native static void subdomainInit(Object p); // for JavaScript only
	
	/**
	 * 
	 * @param p
	 * @j2sNative
var created = new Date ().getTime ();
return function () {
	var runnable = p.runnable;
	if (runnable != null) {
		if (runnable.pipeKey != p.key) {
			var key = p.key;
			var url = p.pipeURL;
			with (window.parent) {
				try {
					net.sf.j2s.ajax.SimplePipeHelper.removePipe (key);
					net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean (key, url);
					return;
				} catch (e) {
				}
			}
		}
		var now = new Date ().getTime ();
		var last = runnable.lastPipeDataReceived;
		if (last == -1) {
			last = created;
		}
		if ((runnable.queryEnded || (now - last >= p.pipeLiveNotifyInterval
				&& (p.lastXHR == -1 || now - p.lastXHR >= p.pipeLiveNotifyInterval)))
				&& runnable.queryFailedRetries < 3) {
			runnable.queryEnded = false;
			var method = null;
			var url = null;
			var data = null;
			var key = p.key;
			with (window.parent) {
				try {
					method = runnable.getPipeMethod ();
					url = runnable.getPipeURL ();
					var spr = net.sf.j2s.ajax.SimplePipeRequest;
					data = spr.constructRequest(key, spr.PIPE_TYPE_QUERY, true);
				} catch (e) {
				}
			}
			try {
				document.domain = p.originalDomain;
			} catch (e) {};
			try {
				p.initHttpRequest ();
			} catch (e) {};
			try {
				p.pipeXHRQuery (p.xhrHandle, method, url, data);
				p.lastXHR = new Date ().getTime ();
			} catch (e) {
				p.xhrHandle.onreadystatechange = null;
				p.xhrHandle = null;
				document.domain = p.parentDomain;
				runnable.queryEnded = true;
				runnable.queryFailedRetries++; // Failed
			}
		}
		if (runnable.queryFailedRetries >= 3
				|| now - last > 3 * p.pipeLiveNotifyInterval) {
			document.domain = p.parentDomain;
			var key = p.key;
			var url = p.pipeURL;
			with (window.parent) {
				runnable.pipeAlive = false;
				runnable.pipeClosed ();
				net.sf.j2s.ajax.SimplePipeHelper.removePipe (key);
				net.sf.j2s.ajax.SimplePipeRequest.pipeIFrameClean (key, url);
			}
		} else {
			window.setTimeout (arguments.callee, p.pipeQueryInterval);
		}
	}
};
	 */
	native static void subdomainLoopQuery(Object p); // for JavaScript only
	
	/**
	 * @j2sNative
try {
	var curLoc = "" + window.location;
	var existed = false;
	with (window.parent) {
		var iframes = document.getElementsByTagName ("IFRAME");
		for (var i = 0; i < iframes.length; i++) {
			if (iframes[i].src == curLoc) {
				existed = true;
				break;
			}
		}
	}
	if (!existed) { // refreshing in Firefox 3.0 will trigger this scenario
		var idx = curLoc.indexOf ("?");
		if (idx != -1) {
			var urlPrefix = curLoc.substring (0, idx);
			var goalURL = null;
			with (window.parent) {
				var iframes = document.getElementsByTagName ("IFRAME");
				for (var i = 0; i < iframes.length; i++) {
					if (iframes[i].src.indexOf (urlPrefix) == 0) {
						goalURL = iframes[i].src;
						break;
					}
				}
			}
			if (goalURL != null) {
				window.location.replace (goalURL);
			}
		}
	}
} catch (e) {}
$$ = $; 
$ = function (s) {
	$$ (s);
	try {
		var length = document.body.childNodes.length;
		for (var i = length - 1; i >= 0; i--) { // remove old SCRIPT elements
			var child = document.body.childNodes[i];
			child.parentNode.removeChild (child);
		}
	} catch (e) {}
}
	 */
	native static void checkIFrameSrc(); // for JavaScript only

}
