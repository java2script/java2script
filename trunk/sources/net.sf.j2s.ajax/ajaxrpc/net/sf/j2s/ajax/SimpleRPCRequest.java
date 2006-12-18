/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

/**
 * @author josson smith
 *
 * 2006-10-10
 */
public class SimpleRPCRequest {
	
	public static int MODE_AJAX = 1;
	public static int MODE_LOCAL_JAVA_THREAD = 2;
	
	static int runningMode = MODE_LOCAL_JAVA_THREAD;
	
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
	public static void request(SimpleRPCRunnable runnable) {
		runnable.ajaxIn();
		if (runningMode == MODE_LOCAL_JAVA_THREAD) {
			new Thread(runnable).start();
		} else {
			ajaxRequest(runnable);
		}
	}
	
	static String getClassNameURL(SimpleRPCRunnable runnable) {
		Class oClass = runnable.getClass();
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
	
	static SimpleRPCMapping[] mappings = new SimpleRPCMapping[4];
	
	public static boolean addMapping(SimpleRPCMapping mapping) {
		int length = mappings.length;
		for (int i = 0; i < length; i++) {
			if (mappings[i] == mapping) {
				return false;
			}
		}
		for (int i = 0; i < length; i++) {
			if (mappings[i] == null) {
				mappings[i] = mapping;
				return true;
			}
		}
		SimpleRPCMapping[] newMappings = new SimpleRPCMapping[length + 4];
		for (int i = 0; i < length; i++) {
			newMappings[i] = mappings[i];
		}
		newMappings[length] = mapping;
		mappings = newMappings;
		return true;
	}
	
	static String getRunnableURL(final SimpleRPCRunnable runnable) {
		String clazzNameURL = getClassNameURL(runnable);
		int length = mappings.length;
		for (int i = 0; i < length; i++) {
			if (mappings[i] != null) {
				String shortURL = mappings[i].getRunnableURL(clazzNameURL);
				if (shortURL != null) {
					clazzNameURL = shortURL;
					break;
				}
			}
		}
		String url = runnable.baseURL();
		if (url == null || url.trim().length() == 0) {
			url = clazzNameURL; 
		} else {
			url = url.trim();
			if (url.charAt(url.length() - 1) != '/') {
				url += '/';
			}
			url += clazzNameURL;
		}
		return url;
	}

	private static void ajaxRequest(final SimpleRPCRunnable runnable) {
		final HttpRequest request = new HttpRequest();
		String url = getRunnableURL(runnable);
		String method = runnable.method();
		if (method == null) {
			method = "POST";
		}
		request.open(method, url, true);
		request.registerOnReadyStateChange(new XHRCallbackAdapter() {
			public void onLoaded() {
				runnable.deserialize(request.getResponseText());
				runnable.ajaxOut();
			}
		});
		request.send(runnable.serialize());
	}
	
}
