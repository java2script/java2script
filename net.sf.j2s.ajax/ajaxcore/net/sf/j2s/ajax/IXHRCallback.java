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

/**
 * Interface of XMLHttpRequest callback.
 * 
 * Reference: <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a><br>
 * 
 * The state of the object. The attribute must be one of the following values:<br>
 *    0 Uninitialized<br>
 *        The initial value.<br> 
 *    1 Open<br>
 *        The open() method has been successfully called.<br> 
 *    2 Sent<br>
 *        The user agent successfully acknowledged the request.<br> 
 *    3 Receiving<br>
 *        Immediately before receiving the message body (if any). All HTTP headers have been received.<br> 
 *    4 Loaded<br>
 *        The data transfer has been completed.<br> 
 * 
 * @author zhou renjian
 *
 * 2006-2-11
 */
public interface IXHRCallback {
	/**
	 * Method will be called when the open() method has been successfully called.
	 */
	public void onOpen();
	/**
	 * Method will be called when the user agent successfully acknowledged
	 * the request.
	 */
	public void onSent();
	/**
	 * Method will be called immediately before receiving the message body (if any). 
	 * All HTTP headers have been received.
	 */
	public void onReceiving();
	/**
	 * Method will be called when the data transfer has been completed.
	 */
	public void onLoaded();
}
