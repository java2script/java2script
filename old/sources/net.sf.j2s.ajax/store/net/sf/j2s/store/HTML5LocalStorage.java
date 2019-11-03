package net.sf.j2s.store;


/**
 * 
 * @author Zhou Renjian (http://zhourenjian.com)
 *
 * July 10, 2010
 * 
 */
public class HTML5LocalStorage implements IStore {

	/**
	 * @j2sNative
	 * return localStorage.getItem (name);
	 */
	public String getProperty(String name) {
		return null;
	}

	public boolean isReady() {
		return true;
	}

	/**
	 * @j2sNative
	 * localStorage.setItem (name, value);
	 */
	public void setProperty(String name, String value) {
	}

}
