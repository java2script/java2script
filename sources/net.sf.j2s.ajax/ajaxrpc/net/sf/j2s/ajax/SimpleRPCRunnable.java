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
public abstract class SimpleRPCRunnable extends SimpleSerializable implements Runnable {
	
	public abstract String url();
	
	public String method() {
		return "POST";
	}
	
	/*
	 * Actually there is synchronous call of this #ajaxIn method
	 */
	public void ajaxIn() {};
	
	/*
	 * Called by local Java thread of XMLHttpRequest
	 */
	public abstract void ajaxRun();
	
	/*
	 * Called by local Java thread of XMLHttpRequest after #ajaxRun
	 */
	public void ajaxOut() {};
	
	/**
	 * @j2sNative
	 * net.sf.j2s.ajax.ServletThread.call(this);
	 */
	public void run() {
		// ajaxIn(); // ajaxIn should be run outside of #run directly
		ajaxRun();
		ajaxOut();
	}
}
