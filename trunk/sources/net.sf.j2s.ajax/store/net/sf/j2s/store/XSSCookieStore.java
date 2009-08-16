package net.sf.j2s.store;

/**
 * 
 * @author Zhou Renjian (http://zhourenjian.com)
 *
 * Mar 28, 2009
 * 
 * @j2sSuffix
 * var ua = navigator.userAgent.toLowerCase ();
 * var isIE = (ua.indexOf ("msie") != -1);
 * var isIE6OrEarlier = isIE && ((ua.indexOf ("msie 6.0") != -1)
 * 		|| (ua.indexOf ("msie 5.5") != -1) || (ua.indexOf ("msie 5.0") != -1));
 * var xssCookieURL = window["j2s.xss.cookie.url"];
 * var isLocal = window.location.protocol == "file:";
 * if (!isLocal && xssCookieURL != null && !isIE6OrEarlier) {
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
var isIE = (ua.indexOf ("msie") != -1);
if (!isIE) {
	document.domain = document.domain;
}
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
	xssIfr.contentWindow.createCookie (name, value, 365);
} catch (e) { }
	 */
	public void setProperty(String name, String value) {
		
	}

	public boolean isReady() {
		return initialized;
	}

}
