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

import org.eclipse.swt.widgets.Display;

/**
 * @author zhou renjian
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
	public static void swtRequest(final SimpleRPCRunnable runnable) {
		SWTHelper.syncExec(Display.getDefault(), new Runnable() {
			public void run() {
				runnable.ajaxIn();
			}
		});
		if (getRequstMode() == MODE_LOCAL_JAVA_THREAD) {
			(new Thread("Simple RPC Request") {
				public void run() {
					try {
						runnable.ajaxRun();
					} catch (RuntimeException e) {
						e.printStackTrace(); // should never fail in Java thread mode!
						SWTHelper.syncExec(Display.getDefault(), new Runnable() {
							public void run() {
								runnable.ajaxFail();
							}
						});
						return;
					}
					SWTHelper.syncExec(Display.getDefault(), new Runnable() {
						public void run() {
							runnable.ajaxOut();
						}
					});
				}
			}).start();
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
		String url2 = SimpleRPCRequest.adjustRequestURL(method, url, serialize);
		if (url2 != url) {
			serialize = null;
		}
		final HttpRequest request = getRequest();
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
