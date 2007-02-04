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

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import org.eclipse.swt.widgets.Display;

/**
 * @author josson smith
 *
 * 2006-10-10
 */
public class SimpleRPCSWTRequest extends SimpleRPCRequest {
	/**
	 * @param runnable
	 * @j2sNative
	 * runnable.ajaxIn ();
	 * net.sf.j2s.ajax.SimpleRPCRequest.ajaxRequest (runnable);
	 */
	public static void swtRequest(SimpleRPCRunnable runnable) {
		runnable.ajaxIn();
		if (runningMode == MODE_LOCAL_JAVA_THREAD) {
			Display.getDefault().asyncExec(runnable);
		} else {
			swtAJAXRequest(runnable);
		}
	}
	
	private static void swtAJAXRequest(final SimpleRPCRunnable runnable) {
		String url = runnable.getHttpURL();
		String method = runnable.getHttpMethod();
		String serialize = runnable.serialize();
		if (method == null) {
			method = "POST";
		}
		if (checkXSS(url, serialize, runnable)) {
			return;
		}
		if ("get".equals(method.toLowerCase())) {
			try {
				String query = URLEncoder.encode(serialize, "UTF-8");
				if (url.indexOf('?') != -1) {
					/* should not come to this branch! */
					url += "&jzz=" + query;
				} else {
					url += "?" + query;
				}
				serialize = null;
			} catch (UnsupportedEncodingException e) {
				// should never throws such exception!
				//e.printStackTrace();
			}
		}
		final HttpRequest request = new HttpRequest();
		request.open(method, url, true);
		request.registerOnReadyStateChange(new XHRCallbackSWTAdapter() {
			public void swtOnLoaded() {
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
}
