package net.sf.j2s.store;

/**
 * 
 * @author Zhou Renjian (http://zhourenjian.com)
 *
 * Mar 28, 2009
 * 
 * @j2sSuffix
 * var ua = navigator.userAgent.toLowerCase ();
 * var isOldIE = ua.indexOf ("msie 5.5") != -1 || ua.indexOf ("msie 5.0") != -1;
 * var xssCookieURL = window["j2s.xss.cookie.url"];
 * var isLocal = false;
 * try {
 * 	isLocal = window.location.protocol == "file:"
 * 			|| window.location.host.toLowerCase ().indexOf ("localhost") != -1;
 * } catch (e) {
 * 	isLocal = true;
 * }
 * if (!isLocal && xssCookieURL != null && !isOldIE) {
 * 	net.sf.j2s.store.XSSCookieStore.initialize(xssCookieURL);
 * }
 */
class XSSCookieStore implements IStore {

	private String url;

	private static boolean initialized = false;
	
	public XSSCookieStore(String url) {
		if (url == null) {
			url = "http://cookie.java2script.org/xss-cookie.html";
		}
		this.url = url;
		initialize(url);
	}
	
	/**
	 * @j2sNative
var ua = navigator.userAgent.toLowerCase ();
try {
	document.domain = document.domain;
	window["xss.domain.enabled"] = true;
} catch (e) {}
var xssIfr = document.getElementById ("xss-cookie");
if (xssIfr != null) {
	return;
}
net.sf.j2s.store.XSSCookieStore.initializeCallback ();
var xssIfr = document.createElement ("IFRAME");
xssIfr.id = "xss-cookie";
xssIfr.src = url;
xssIfr.style.display = "none";
document.body.appendChild (xssIfr);
	 */
	private static void initialize(String url) {
		
	}
	
	/**
	 * @j2sNative
window.xssCookieReadyCallback = function () {
	net.sf.j2s.store.XSSCookieStore.initialized = true;
};
	 */
	static void initializeCallback() {
		
	}
	
	/**
	 * @j2sNative
if (!net.sf.j2s.store.XSSCookieStore.initialized) {
	return null;
}
var xssIfr = document.getElementById ("xss-cookie");
if (xssIfr == null) {
	return null;
}
try {
	return xssIfr.contentWindow.readCookie (name);
} catch (e) {
	return null;
}
	 */
	public String getProperty(String name) {
		if (initialized && url != null) {
			return null;
		}
		return null;
	}

	/**
	 * @j2sNative
if (!net.sf.j2s.store.XSSCookieStore.initialized) {
	return;
}
var xssIfr = document.getElementById ("xss-cookie");
if (xssIfr == null) {
	return;
}
try {
	if (value == null) {
		xssIfr.contentWindow.createCookie (name, value, -1);
	} else {
		xssIfr.contentWindow.createCookie (name, value, 365);
	}
} catch (e) { }
	 */
	public void setProperty(String name, String value) {
		
	}

	public boolean isReady() {
		return initialized;
	}

}
