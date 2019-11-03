/*******************************************************************************
 * Copyright (c) 2010 java2script.org and others.
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
 * Providing a comet way for given Simple RPC, in case RPC takes a long time.
 * For server side only.
 * 
 * @author zhou renjian
 *
 * 2012-08-30
 */
public interface ISimpleCometable {

	/**
	 * Return whether job will be run in comet or not.
	 * 
	 * @return Returning true, {@link #cometRun(Runnable)} will be invoked.
	 * Return false, SimpleRPCRunnable#ajaxRun() will be invoked.
	 */
	public boolean supportsCometMode();
	
	/**
	 * Try to run RPC, if running in comet mode, return true, else return false.
	 *  
	 * @param doneCallback provided by server, will not be null.
	 * @return Returning false, call-back must not be invoked. Returning true,
	 * call-back must be called when its job is done. Otherwise, this
	 * connection will be kept until server restarts.
	 */
	public boolean cometRun(final Runnable asyncDoneCallback);
	
	/**
	 * Return whether send chunked encoding header before responding real data.
	 * @return Returning true, HTTP chunked encoding header will be sent and real data will be
	 * sent in later packet. Returning false, normal HTTP response will be sent after real data is ready.
	 */
	public boolean supportsChunkedEncoding();
	
}
