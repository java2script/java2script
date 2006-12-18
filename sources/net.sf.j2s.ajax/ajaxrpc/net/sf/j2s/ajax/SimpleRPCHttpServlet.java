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
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
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
public class SimpleRPCHttpServlet extends HttpServlet {

	private static final long serialVersionUID = -3852449040495978018L;

	protected Set runnables = new HashSet();
	
	protected Set mappings = new HashSet();
	
	protected SimpleRPCRunnable getRunnableByURL(String url) {
		int lastIndexOf = url.lastIndexOf('/');
		String shortURL = null;
		if (lastIndexOf == url.length() - 1) {
			lastIndexOf = url.lastIndexOf('/', lastIndexOf - 1);
			if (lastIndexOf == -1) {
				return null; // should never happen!
			}
			shortURL = url.substring(lastIndexOf + 1, url.length() - 1);
		} else {
			shortURL = url.substring(lastIndexOf + 1);
		}
		if (runnables.contains(shortURL)) {
			if (url != null) {
				Object obj = getNewInstanceByClassName(shortURL);
				if (obj != null && obj instanceof SimpleRPCRunnable) {
					return (SimpleRPCRunnable) obj;
				}
			}
		}
		for (Iterator iter = mappings.iterator(); iter.hasNext();) {
			String mappingStr = (String) iter.next();
			if (mappingStr != null) {
				Object obj = getNewInstanceByClassName(mappingStr);
				if (obj != null && obj instanceof SimpleRPCMapping) {
					SimpleRPCMapping mapping = (SimpleRPCMapping) obj;
					String mappedRunnable = mapping.getRunnableClassName(shortURL);
					if (mappedRunnable != null) {
						obj = getNewInstanceByClassName(mappedRunnable);
						if (obj != null && obj instanceof SimpleRPCRunnable) {
							return (SimpleRPCRunnable) obj;
						}
					}
				}
			}
		}
		return null;
	}

	public Object getNewInstanceByClassName(String className) {
		try {
			Class runnableClass = Class.forName(className);
			if (runnableClass != null) {
				Constructor constructor = runnableClass.getConstructor(new Class[0]);
				return constructor.newInstance(new Object[0]);
			}
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		return null;
	}
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

	/* (non-Javadoc)
	 * @see javax.servlet.GenericServlet#init()
	 */
	public void init() throws ServletException {
		String runnableStr = getInitParameter("simple.rpc.runnables");
		if (runnableStr != null) { 
			String[] splits = runnableStr.trim().split("\\s*[,;:]\\s*");
			for (int i = 0; i < splits.length; i++) {
				String trim = splits[i].trim();
				if (trim.length() != 0) {
					runnables.add(trim);
				}
			}
		}
		String mappingStr = getInitParameter("simple.rpc.mappings");
		if (mappingStr != null) {
			String[] splits = mappingStr.trim().split("\\s*[,;:]\\s*");
			for (int i = 0; i < splits.length; i++) {
				String trim = splits[i].trim();
				if (trim.length() != 0) {
					mappings.add(trim);
				}
			}
		}
	}
	
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		SimpleRPCRunnable runnable = getRunnableByURL(req.getPathInfo());
		if (runnable == null) {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		PrintWriter writer = resp.getWriter();
		resp.setContentType("text/plain");
		//resp.setCharacterEncoding("utf-8");
		String request = readAll(req.getInputStream());
		runnable.deserialize(request);
		runnable.ajaxRun();
		writer.write(runnable.serialize());
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		SimpleRPCRunnable runnable = getRunnableByURL(req.getPathInfo());
		if (runnable == null) {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		PrintWriter writer = resp.getWriter();
		resp.setContentType("text/plain");
		//resp.setCharacterEncoding("utf-8");
		runnable.deserialize(req.getQueryString());
		runnable.ajaxRun();
		writer.write(runnable.serialize());
	}
	
	
}