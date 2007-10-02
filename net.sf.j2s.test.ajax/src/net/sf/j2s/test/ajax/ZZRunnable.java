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

package net.sf.j2s.test.ajax;

import net.sf.j2s.ajax.SimpleRPCRunnable;

/**
 * @author zhou renjian
 *
 * 2007-1-23
 */
public class ZZRunnable extends SimpleRPCRunnable {
	public String name;
	
	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.SimpleRPCRunnable#getHttpURL()
	 */
	public String getHttpURL() {
		return "http://localhost/doitrightnow/simplerpc";
	}
	
	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.SimpleRPCRunnable#getHttpMethod()
	 */
	public String getHttpMethod() {
		return "GET";
	}
	
	public void ajaxRun() {
		name = "/* server */" + name + "/* client */";
	}
}
