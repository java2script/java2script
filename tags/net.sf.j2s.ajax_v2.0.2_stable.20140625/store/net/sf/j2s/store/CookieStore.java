package net.sf.j2s.store;

class CookieStore implements IStore {
	
	/**
	 * @j2sNative
var prefix = name + "=";
var allCookies = document.cookie.split (';');
for(var i = 0; i < allCookies.length; i++) {
	var item = allCookies[i].replace (/^\s*-/, "");
	if (item.indexOf (prefix) == 0) {
		return item.substring (prefix.length, item.length);
	}
}
return null;
	 */
	public String getProperty(String name) {
		return null;
	}

	/**
	 * @j2sNative
var toExpire = new Date();
if (value == null) {
	value = "";
	toExpire.setTime (new Date().getTime () - 24 * 3600 * 1000);
} else {
	toExpire.setTime (new Date().getTime () + 365 * 24 * 3600 * 1000);
}
document.cookie = name + "=" + value
		+ "; expires=" + toExpire.toGMTString ()
		+ "; path=/";
	 */
	public void setProperty(String name, String value) {
		
	}

	public boolean isReady() {
		return true;
	}

}
