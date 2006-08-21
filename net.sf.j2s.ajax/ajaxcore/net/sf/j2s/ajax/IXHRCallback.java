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
 * Interface of XMLHttpRequest callback.
 * 
 * @author josson smith
 *
 * 2006-2-11
 */
public interface IXHRCallback {
	//public void onUninitialized();
	/**
	 * Method will be called when XMLHttpRequest is loading.
	 */
	public void onLoading();
	/**
	 * Method will be called when XMLHttpRequest already setup HTTP connection.
	 */
	public void onLoaded();
	/**
	 * Method will be called when XMLHttpRequest is transforming request and 
	 * receiving response.
	 */
	public void onInteractive();
	/**
	 * Method will be called when XMLHttpRequest receives all reponses.
	 */
	public void onComplete();
}
