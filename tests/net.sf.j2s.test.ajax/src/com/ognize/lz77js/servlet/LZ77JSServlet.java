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

package com.ognize.lz77js.servlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.j2s.ajax.SimpleRPCHttpServlet;
import com.ognize.lz77js.LZ77JSSimpleRPCRunnable;

/**
 * @author josson smith
 *
 * 2006-9-3
 */
public class LZ77JSServlet extends SimpleRPCHttpServlet {

	private static final long serialVersionUID = 183900982866458122L;

	public void initSimpleRPC(final HttpServletRequest req, HttpServletResponse resp) {
		this.runnable = new LZ77JSSimpleRPCRunnable();
	}
	
}
