package net.sf.j2s.store;

import java.io.File;

import net.sf.j2s.annotation.J2SRequireImport;

@J2SRequireImport({CookieStore.class, XSSCookieStore.class})
public class SimpleStore implements IStore {

	private static SimpleStore singleton;
	
	private IStore store;
	
	private SimpleStore() {
		/**
		 * @j2sNative
		 * var ua = navigator.userAgent.toLowerCase ();
		 * var isOldIE = ua.indexOf ("msie 5.5") != -1 || ua.indexOf ("msie 5.0") != -1;
		 * var cookieURL = window["j2s.xss.cookie.url"];
		 * var isLocal = window.location.protocol == "file:"
		 * 		|| window.location.host.toLowerCase ().indexOf ("localhost") != -1;
		 * if (!isLocal && cookieURL != null && !isOldIE) {
		 *  this.store = new net.sf.j2s.store.XSSCookieStore(cookieURL);
		 * } else {
		 *  this.store = new net.sf.j2s.store.CookieStore();
		 * }
		 */ {
			File storeFile = new File(System.getProperty("user.home"), ".java2script.store");
			this.store = new INIFileStore(storeFile.getAbsolutePath()); 
		}
	}
	
	public static SimpleStore getDefault() {
		if (singleton == null) {
			singleton = new SimpleStore();
		}
		return singleton;
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
window.xssCookieReadyCallback = (function (r) {
	return function () {
		net.sf.j2s.store.XSSCookieStore.initialized = true;
		r.run ();
	};
}) (runnable);
			 */ {}
			return;
		}
		runnable.run();
	}
}
