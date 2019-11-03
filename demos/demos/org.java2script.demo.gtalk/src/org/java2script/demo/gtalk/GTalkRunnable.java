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

package org.java2script.demo.gtalk;

import net.sf.j2s.ajax.SimpleRPCRunnable;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public abstract class GTalkRunnable extends SimpleRPCRunnable {
	
	public String getHttpURL() {
		/**
		 * FIXME TODO:
		 * If you configure no cross site script supports, then
		 * you has no needs to override this #getHttpURL method.
		 * Just let it be "simplerpc" will be OK. 
		 */
		return "simplerpc";
		//return "http://yourdomain.com/gtalk/simplerpc";
	}

}
