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
 * @author zhou renjian
 *
 * 2006-10-10
 */
public abstract class SimpleRPCRunnable extends SimpleSerializable {
	
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
	 * Whether serializing delta updates in response only or not. Supporting
	 * delta updates will save connection bandwidth but increase the CPU usage.
	 * 
	 * This method will be called by server side.
	 * 
	 * @return supported
	 */
	public boolean supportsDeltaResponse() {
		return true;
	}
	
	/**
	 * Whether sending out response in GZip encoding or not. Supporting GZip
	 * encoding will save connection bandwidth but increase the CPU usage.
	 * 
	 * For those RPC with already-encoded bytes, for example, PNG/JPEG images,
	 * AAC/MP3 audio, H.265 movies and others, GZip encoding should be closed.
	 *  
	 * This method will be called by server side.
	 * 
	 * @return supported
	 */
	public boolean supportsGZipEncoding() {
		return true;
	}
	
	/**
	 * Whether supporting HTTP Keep-Alive feature or not.
	 *  
	 * This method will be called by server side.
	 * 
	 * @return supported
	 */
	public boolean supportsKeepAlive() {
		return true;
	}
	
}
