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

import net.sf.j2s.ajax.SimpleRPCHttpServlet;
import net.sf.j2s.ajax.SimpleRPCRunnable;
import net.sf.j2s.ajax.SimpleSerializable;

/**
 * 
 * @author zhou renjian
 */
public class SimplePipeRPCHttpServlet extends SimpleRPCHttpServlet {

	private static final long serialVersionUID = 3141977053834098092L;

	@Override
	protected SimpleRPCRunnable getRunnableByRequest(String request) {
		SimpleRPCRunnable runnable = super.getRunnableByRequest(request);
		if (runnable instanceof SimplePipeRunnable) {
			SimplePipeRunnable pipeRunnable = (SimplePipeRunnable) runnable;
			pipeRunnable.setPipeHelper(new SimplePipeHelper.IPipeThrough() {
			
				public void helpThrough(SimplePipeRunnable pipe,
						SimpleSerializable[] objs) {
					SimplePipeHelper.pipeIn(pipe.pipeKey, objs);
				}
			
			});
			pipeRunnable.pipeManaged = managingPipe;
		}
		return runnable;
	}

}
