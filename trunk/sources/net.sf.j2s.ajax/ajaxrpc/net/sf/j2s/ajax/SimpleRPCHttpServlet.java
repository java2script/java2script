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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * This class is designed as a Java Servlet container.
 * 
 * @author josson smith
 *
 * 2006-10-10
 */
public abstract class SimpleRPCHttpServlet extends HttpServlet {

	private static final long serialVersionUID = -3852449040495978018L;

	protected SimpleRPCRunnable runnable;
	
	public abstract void initSimpleRPC(HttpServletRequest req, HttpServletResponse resp);

	public static String readAll(InputStream res) {
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int read = 0;
			while ((read = res.read(buf)) != -1) {
				baos.write(buf, 0, read);
			}
			res.close();
			return baos.toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		if (runnable == null) {
			initSimpleRPC(req, resp);
		}
		PrintWriter writer = resp.getWriter();
		resp.setContentType("text/plain");
		resp.setCharacterEncoding("utf-8");
		String request = readAll(req.getInputStream());
		runnable.deserialize(request);
		runnable.ajaxRun();
		writer.write(runnable.serialize());
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		if (runnable == null) {
			initSimpleRPC(req, resp);
		}
		PrintWriter writer = resp.getWriter();
		resp.setContentType("text/plain");
		resp.setCharacterEncoding("utf-8");
		runnable.deserialize(req.getQueryString());
		runnable.ajaxRun();
		writer.write(runnable.serialize());
	}
	
	
}