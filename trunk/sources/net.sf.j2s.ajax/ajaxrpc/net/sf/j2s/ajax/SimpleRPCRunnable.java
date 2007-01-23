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
 * @author zhou renjian
 *
 * 2006-10-10
 */
public abstract class SimpleRPCRunnable extends SimpleSerializable implements Runnable {
	
	public String getHttpURL() {
		return "simplerpc"; // url is relative to the servlet!
	}
	
	public String getHttpMethod() {
		return "POST";
	}
	
	/*
	 * Actually there is synchronous call of this #ajaxIn method
	 */
	public void ajaxIn() {};
	
	/**
	 * Called by local Java thread of XMLHttpRequest or by remote servlet.
	 * In this method, those public fields which has no senses for #ajaxOut
	 * should be set empty so the transfer is much smaller and faster.
	 */
	public abstract void ajaxRun();
	
	/*
	 * Called by local Java thread of XMLHttpRequest after #ajaxRun
	 */
	public void ajaxOut() {};
	
	/*
	 * Called by local Java thread of XMLHttpRequest when #ajaxRun contains errors
	 */
	public void ajaxFail() {};
	
	/**
	 * @j2sNative
	 * net.sf.j2s.ajax.ServletThread.call(this);
	 */
	public void run() {
		// ajaxIn(); // ajaxIn should be run outside of #run directly
		try {
			ajaxRun();
		} catch (RuntimeException e) {
			e.printStackTrace(); // should never fail in Java thread mode!
			ajaxFail();
			return;
		}
		ajaxOut();
	}
}
