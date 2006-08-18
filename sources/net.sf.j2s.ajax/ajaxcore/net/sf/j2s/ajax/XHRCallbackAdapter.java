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
	 * Will be called when all responses are received.
	 */
	public void onComplete() {
		
	}

	/**
	 * Will be called when the request is sending and the reponse comes.
	 */
	public void onInteractive() {
		
	}

	/**
	 * Will be called when the HTTP connection is setup.
	 */
	public void onLoaded() {
		
	}

	/**
	 * Will be called when <code>HttPRequest#open</code> is called.
	 */
	public void onLoading() {
		
	}

//	public void onUninitialized() {
//		
//	}

}
