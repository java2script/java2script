package net.sf.j2s.store;

import java.io.File;

import net.sf.j2s.annotation.J2SRequireImport;

@J2SRequireImport({CookieStore.class, XSSCookieStore.class, HTML5LocalStorage.class})
public class SimpleStore implements IStore {

	private static SimpleStore singleton;
	
	private static SimpleStore[] extras = new SimpleStore[3];
	
	public static final String TYPE_LOCALSTORAGE = "local";
	public static final String TYPE_COOKIE = "cookie";
	public static final String TYPE_XSS_COOKIE = "xss";
	public static final String TYPE_FILE = "file";
	
	private IStore store;
	private String type;
	
	private SimpleStore(String type) {
		/**
		 * @j2sNative
var ua = navigator.userAgent.toLowerCase ();
var isLocalFile = false;
try {
	isLocalFile = window.location.protocol == "file:";
} catch (e) {
	isLocalFile = true;
}
if ((type == null || "local" == type) && window["j2s.html5.store"] && window["localStorage"] != null
 		&& (ua.indexOf ("gecko/") == -1 || !isLocalFile)) {
	try {
		localStorage.setItem('net.sf.j2s.test', '1');
		localStorage.removeItem('net.sf.j2s.test');
		this.store = new net.sf.j2s.store.HTML5LocalStorage ();
		this.type = "local";
		return;
	} catch (error) {
	}
}
var isLocal = false;
try {
	isLocal = window.location.protocol == "file:"
			|| window.location.host.toLowerCase () == "localhost";
} catch (e) {
	isLocal = true;
}
var isOldIE = ua.indexOf ("msie 5.5") != -1 || ua.indexOf ("msie 5.0") != -1;
var cookieURL = window["j2s.xss.cookie.url"];
if (!isLocal && cookieURL != null && !isOldIE && (type == null || "xss" == type)) {
	this.store = new net.sf.j2s.store.XSSCookieStore(cookieURL);
	this.type = "xss";
} else {
	if (type == null || "cookie" == type) {
		this.store = new net.sf.j2s.store.CookieStore();
		this.type = "cookie";
	} else {
		throw new RuntimeException("Not supporting SimpleStore for given type \"" + type + "\"!");
	}
}
		 */ {
			if (type == null || "file".equals(type)) {
				File storeFile = new File(System.getProperty("user.home"), ".java2script.store");
				this.store = new INIFileStore(storeFile.getAbsolutePath());
				this.type = "file";
			} else {
				throw new RuntimeException("Not supporting SimpleStore for given type \"" + type + "\"!");
			}
		}
	}

	public static SimpleStore getDefault() {
		if (singleton == null) {
			singleton = new SimpleStore(null);
		}
		return singleton;
	}
	
	public static SimpleStore getTypedStore(String type) {
		if (singleton == null) {
			singleton = new SimpleStore(null);
		}
		if (type == null || type.length() == 0 || type.equals(singleton.type)) {
			return singleton;
		}
		SimpleStore[] es = extras;
		for (int i = 0; i < es.length; i++) {
			SimpleStore ss = es[i];
			if (ss == null) continue;
			if (type.equals(ss.type)) return ss;
		}
		SimpleStore typedStore = null;
		try {
			typedStore = new SimpleStore(type);
		} catch (Throwable e) {
			//e.printStackTrace();
			return null;
		}
		for (int i = 0; i < es.length; i++) {
			SimpleStore ss = es[i];
			if (ss == null) {
				es[i] = typedStore;
				break;
			}
		}
		return typedStore;
	}

	public String getProperty(String name) {
		return store.getProperty(name);
	}

	public void setProperty(String name, String value) {
		store.setProperty(name, value);
	}
	
	public boolean isReady() {
		return store.isReady();
	}

	public void execute(Runnable runnable) {
		if (store instanceof XSSCookieStore && !store.isReady()) {
			/**
			 * @j2sNative
window.xssCookieReadyCallback = (function (r1, r2) {
	return function () {
		net.sf.j2s.store.XSSCookieStore.initialized = true;
		if (r1 != null) {
			try {
				r1.run ();
			} catch (e) {
			}
		}
		r2.run ();
	};
}) (window.xssCookieReadyCallback, runnable);
window.setTimeout (function () {
	if (!net.sf.j2s.store.XSSCookieStore.initialized
			&& window.xssCookieReadyCallback != null) {
		window.xssCookieReadyCallback ();
	}
}, 10000);
			 */ {}
			return;
		}
		runnable.run();
	}
	
	public Object getStore() {
		return store;
	}
	
}
