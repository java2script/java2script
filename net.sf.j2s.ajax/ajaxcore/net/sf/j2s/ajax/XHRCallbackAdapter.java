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
 * This adapter provides a default implementation of IXHRCallback.
 * 
 * @author josson smith
 *
 * 2006-2-11
 */
public class XHRCallbackAdapter implements IXHRCallback {

	/**
	 * Method will be called when the data transfer has been completed.
	 */
	public void onLoaded() {
	}

	/**
	 * Method will be called immediately before receiving the message body 
	 * (if any). All HTTP headers have been received.
	 */
	public void onReceiving() {
	}

	/**
	 * Method will be called when the user agent successfully acknowledged
	 * the request.
	 */
	public void onSent() {
	}

	/**
	 * Method will be called when XMLHttpRequestthe#open method has been 
	 * successfully called.
	 */
	public void onOpen() {
	}

}
