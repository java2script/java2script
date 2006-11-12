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
	 * this.ajaxRequest(runnable);
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
		final HttpRequest request = new HttpRequest();
		request.open(runnable.method(), runnable.url(), true);
		request.registerOnReadyStateChange(new XHRCallbackSWTAdapter() {
			public void swtOnLoaded() {
				runnable.deserialize(request.getResponseText());
				runnable.ajaxOut();
			}
		});
		request.send(runnable.serialize());
	}
}
