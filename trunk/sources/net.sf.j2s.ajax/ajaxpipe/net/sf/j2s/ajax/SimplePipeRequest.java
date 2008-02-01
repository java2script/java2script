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
	protected static final String PIPE_STATUS_OK = "ok";

	/**
	 * Status of pipe: destroyed.
	 */
	protected static final String PIPE_STATUS_DESTROYED = "destroyed";
	
	/**
	 * Status of pipe: lost.
	 */
	protected static final String PIPE_STATUS_LOST = "lost";

	
	/**
	 * Type of pipe request: query
	 */
	protected static final String PIPE_TYPE_QUERY = "query";
	
	/**
	 * Type of pipe request: notify
	 */
	protected static final String PIPE_TYPE_NOTIFY = "notify";
	
	/**
	 * Type of pipe request: script
	 */
	protected static final String PIPE_TYPE_SCRIPT = "script";
	
	/**
	 * Type of pipe request: xss
	 */
	protected static final String PIPE_TYPE_XSS = "xss";
	
	/**
	 * Type of pipe request: continuum
	 */
	protected static final String PIPE_TYPE_CONTINUUM = "continuum";
	
	
	/**
	 * Query key for pipe: pipekey
	 */
	protected static final String FORM_PIPE_KEY = "pipekey";
	
	/**
	 * Query key for pipe: pipetype
	 */
	protected static final String FORM_PIPE_TYPE = "pipetype";
	
	/**
	 * Query key for pipe: pipernd
	 */
	protected static final String FORM_PIPE_RANDOM = "pipernd";
	
	
	public static final int MODE_PIPE_QUERY = 3;
	
	public static final int MODE_PIPE_CONTINUUM = 4;
	
	private static int pipeMode = MODE_PIPE_CONTINUUM;
	
	private static long pipeQueryInterval = 1000;
	
	static long pipeLiveNotifyInterval = 25000;
	
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
		return FORM_PIPE_KEY + "=" + pipeKey + "&" 
				+ FORM_PIPE_TYPE + "=" + pipeRequestType 
				+ (rand ? "&" + FORM_PIPE_RANDOM + "=" + Math.round(100000000 * Math.random()) : "");
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
			new Thread(new Runnable() {
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

	/**
	 * Be used in Java mode to keep the pipe live.
	 * 
	 * @param runnable
	 * 
	 * @j2sIgnore
	 */
	static void keepPipeLive(final SimplePipeRunnable runnable) {
		new Thread(new Runnable() {
			
			public void run() {
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
							if (SimplePipeHelper.getPipe(runnable.pipeKey) == null) {
								break;
							}
						}
					}
					
					if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
						boolean pipeLive = runnable.isPipeLive();
						if (pipeLive) {
							runnable.keepPipeLive();
						} else {
							runnable.pipeClosed(); //?
							break;
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
							if (response != null && response.indexOf(PIPE_STATUS_LOST) != -1) {
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
		
		}, "Pipe Live Notifier Thread").start();
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
		 * runnable.ajaxOut = (function (aO, r) {
		 * 	return function () {
		 * 		aO.apply (r, []);
		 * 		net.sf.j2s.ajax.SimplePipeRequest.ajaxPipe (r);
		 * 	};
		 * }) (ajaxOut, runnable); 
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
	 * Load or send data for pipe using SCRIPT tag.
	 * 
	 * @param url
	 * 
	 * @j2sNative
var script = document.createElement ("SCRIPT");
script.type = "text/javascript";
script.src = url;
var iframeID = arguments[1];
if (typeof (script.onreadystatechange) == "undefined") { // W3C
	script.onerror = function () {
		this.onerror = null;
		if (iframeID != null) {
			if (window.parent == null || window.parent["net"] == null) return;
			window.parent.net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived = true;
			document.getElementsByTagName ("HEAD")[0].removeChild (this);
			var iframe = window.parent.document.getElementById (iframeID);
			if (iframe != null) {
				iframe.parentNode.removeChild (iframe);
			}
			return;
		}
		if (window == null || window["net"] == null) return;
		net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived = true; 
		document.getElementsByTagName ("HEAD")[0].removeChild (this);
	};
	script.onload = function () {
		this.onload = null;
		if (iframeID != null) {
			if (window.parent == null || window.parent["net"] == null) return;
			window.parent.net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived = true;
			document.getElementsByTagName ("HEAD")[0].removeChild (this);
			var iframe = window.parent.document.getElementById (iframeID);
			if (iframe != null) {
				iframe.parentNode.removeChild (iframe);
			}
			return;
		}
		if (window == null || window["net"] == null) return;
		net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived = true; 
		document.getElementsByTagName ("HEAD")[0].removeChild (this);
	};
} else { // IE
	script.defer = true;
	script.onreadystatechange = function () {
		var state = "" + this.readyState;
		if (state == "loaded" || state == "complete") {
			this.onreadystatechange = null; 
			if (iframeID != null) {
				if (window.parent == null || window.parent["net"] == null) return;
				window.parent.net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived = true;
				document.getElementsByTagName ("HEAD")[0].removeChild (this);
				var iframe = window.parent.document.getElementById (iframeID);
				if (iframe != null) {
					iframe.parentNode.removeChild (iframe);
				}
				return;
			}
			if (window == null || window["net"] == null) return;
			net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived = true; 
			document.getElementsByTagName ("HEAD")[0].removeChild (this);
		}
	};
}
var head = document.getElementsByTagName ("HEAD")[0];
head.appendChild (script);
	 */
	static void loadPipeScript(String url) {
		// only for JavaScript
	}

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
html += "(" + net.sf.j2s.ajax.SimplePipeRequest.loadPipeScript + ") (";
html += "\"" + url.replace (/"/g, "\\\"") + "\", \"" + iframeID + "\"";
html += ");\r\n";
if (ClassLoader.isOpera)
html += "}, " + (net.sf.j2s.ajax.SimplePipeRequest.pipeQueryInterval >> 2) + ");\r\n";
html += "</scr" + "ipt></body></html>";
net.sf.j2s.ajax.SimplePipeRequest.iframeDocumentWrite (iframe, html);
	 */
	static void loadPipeIFrameScript(String url) {
		// only for JavaScript
		iframeDocumentWrite(null, null);
	}
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
	} catch (e) {
		window.setTimeout ((function (handle, html) {
			return function () {
				var doc = handle.contentWindow.document;
				doc.open ();
				doc.write (html);
				doc.close ();
			};
		}) (handle, html), 25);
	}
	 */
	private native static void iframeDocumentWrite(Object handle, String html);
	
	static void pipeScript(SimplePipeRunnable runnable) { // xss
		String url = runnable.getPipeURL();
		String requestURL = url + (url.indexOf('?') != -1 ? "&" : "?")
				+ constructRequest(runnable.pipeKey, PIPE_TYPE_XSS, true);
		if (isXSSMode(url)) {
			// in xss mode, iframe is used to avoid blocking other *.js loading 
			loadPipeIFrameScript(requestURL);
			return;
		}
		loadPipeScript(requestURL);
		// only for JavaScript
	}
	
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
	static void pipeQuery(SimplePipeRunnable runnable) {
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
				String responseText = pipeRequest.getResponseText();
				if (responseText != null) {
					String retStr = parseReceived(responseText);
					if (retStr != null && retStr.length() > 0) {
						String destroyedKey = PIPE_STATUS_DESTROYED;
						if (retStr.indexOf(destroyedKey) == 0) {
							int beginIndex = destroyedKey.length() + 1;
							String pipeKeyStr = retStr.substring(beginIndex, beginIndex + 32);
							SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKeyStr);
							if (pipe != null) {
								pipe.pipeClosed();
								SimplePipeHelper.removePipe(pipeKeyStr);
							}
							//SimplePipeHelper.removePipe(pipeKeyStr);
						}
					}
				}
				
				/**
				 * @j2sNative
				 * net.sf.j2s.ajax.SimplePipeRequest.lastQueryReceived = true;
				 */ {}
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
var ifr = document.createElement ("IFRAME");
ifr.style.display = "none";
var pipeKey = runnable.pipeKey;
var spr = net.sf.j2s.ajax.SimplePipeRequest;
var url = runnable.getPipeURL();
ifr.src = url + (url.indexOf('?') != -1 ? "&" : "?") 
		+ spr.constructRequest(pipeKey, spr.PIPE_TYPE_SCRIPT, true);
document.body.appendChild (ifr);

var threadFun = function (pipeFun, key) {
		return function () {
			var runnable = net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
			if (runnable != null) {
				var spr = net.sf.j2s.ajax.SimplePipeRequest;
				//if (spr.lastQueryReceived) {
					pipeFun (runnable);
					//spr.lastQueryReceived = false;
				//}
				window.setTimeout (arguments.callee, spr.pipeLiveNotifyInterval);
			}
		};
};
//spr.lastQueryReceived = true;
var fun = threadFun (spr.pipeNotify, runnable.pipeKey);
fun ();
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
							String destroyedKey = PIPE_STATUS_DESTROYED;
							if (resetString.indexOf(destroyedKey) == 0) {
								int beginIndex = destroyedKey.length() + 1;
								// Following 32 is the length of pipe key string
								String pipeKeyStr = resetString.substring(beginIndex, beginIndex + 32);
								SimplePipeRunnable pipe = SimplePipeHelper.getPipe(pipeKeyStr);
								if (pipe != null) {
									pipe.pipeClosed();
									SimplePipeHelper.removePipe(pipeKeyStr);
								}
								resetString = resetString.substring(beginIndex + 32 + 1);
							}
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
		
		});
		String pipeKey = runnable.pipeKey;
		String pipeMethod = runnable.getPipeMethod();
		String pipeURL = runnable.getPipeURL();

		String pipeRequestData = constructRequest(pipeKey, PIPE_TYPE_CONTINUUM, false);
		sendRequest(pipeRequest, pipeMethod, pipeURL, pipeRequestData, true);
	}
	
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
		SimpleSerializable ss = null;
		int start = 0;
		while (string.length() > start + 32) { // should be bigger than 48 ( 32 + 6 + 1 + 8 + 1)
			String destroyedKey = PIPE_STATUS_DESTROYED;
			if (destroyedKey.equals(string.substring(start + 32, 
					start + 32 + destroyedKey.length()))) {
				/**
				 * @j2sNative
				 * var key = string.substring(start, start + 32);
				 * net.sf.j2s.ajax.SimplePipeHelper.removePipe(key);
				 */ {}
				return destroyedKey + ":" + string.substring(start, start + 32) + ":" + string.substring(start + 32 + destroyedKey.length());
			}
			if ((ss = SimpleSerializable.parseInstance(string, start + 32)) == null
					|| !ss.deserialize(string, start + 32)) {
				break;
			}
			String key = string.substring(start, start + 32);
			SimplePipeRunnable runnable = SimplePipeHelper.getPipe(key);
			if (runnable != null) { // should always satisfy this condition
				runnable.deal(ss);
			}
			
			start = restStringIndex(string, start);
		}
		if (start != 0) {
			return string.substring(start);
		}
		return string;
	}

	/**
	 * Return the string index from beginning of next SimpleSerializable
	 * instance.
	 * 
	 * @param string
	 * @return
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
		boolean isXSS = isXSSMode(runnable.getPipeURL());

		if (!isXSS && pipeMode == MODE_PIPE_CONTINUUM)
			/**
			 * @j2sNative
			 * net.sf.j2s.ajax.SimplePipeRequest.pipeContinuum (runnable);
			 */
		{
			//pipeQuery(runnable, "continuum");
			new Thread(new Runnable(){
				public void run() {
					pipeContinuum(runnable);
				}
			}).start();
		} else
			/**
			 * @j2sNative
var spr = net.sf.j2s.ajax.SimplePipeRequest;
var f = (!isXSS) ? spr.pipeQuery 
		: spr.pipeScript;
var threadFun = function (pipeFun, key) {
		return function () {
			var runnable = net.sf.j2s.ajax.SimplePipeHelper.getPipe(key);
			if (runnable != null) {
				var spr = net.sf.j2s.ajax.SimplePipeRequest;
				if (spr.lastQueryReceived) {
					spr.lastQueryReceived = false;
					pipeFun (runnable);
				}
				spr.queryTimeoutHandle = window.setTimeout (arguments.callee, spr.pipeQueryInterval);
			}
		};
};
spr.lastQueryReceived = true;
if (spr.queryTimeoutHandle != null) {
	window.clearTimeout (spr.queryTimeoutHandle);
}
spr.queryTimeoutHandle = null;
var fun = threadFun (f, runnable.pipeKey);
fun ();
			 */
		{
			final String key = runnable.pipeKey;
			new Thread(new Runnable() {
				public void run() {
					SimplePipeRunnable runnable = null;
					while ((runnable = SimplePipeHelper.getPipe(key)) != null) {
						pipeQuery(runnable);
						try {
							Thread.sleep(pipeQueryInterval);
						} catch (InterruptedException e) {
							//e.printStackTrace();
						}
					}
				}
			}, "Pipe Monitor Thread").start();
		}
	}

}
