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

	private static final long serialVersionUID = -3852449040495666018L;

	protected Set runnables = new HashSet();
	
	/**
	 * Get SimpleRPCRunnable instance correspond to the given request. 
	 * 
	 * @param request String that is from POST data or GET query  
	 * @return SimpleRPCRunnable instance. If request is bad request, 
	 * null will be returned.
	 * 
	 * TODO: request (May be large string) may be duplicated when being
	 * passed in as parameter
	 */
	protected SimpleRPCRunnable getRunnableByRequest(String request) {
		if (request == null) return null;
		int length = request.length();
		if (length <= 7 || !request.startsWith("WLL")) return null;
		int index = request.indexOf('#');
		if (index == -1) return null;
		String clazzName = request.substring(6, index);
		
		if (runnables.contains(clazzName)) {
			return createRunnableInstance(clazzName);
		}
		return null;
	}

	/**
	 * Create SimpleRPCRunnable instance by given class name. May be inherited to
	 * do more jobs before starting to deserialize request and running the main job.
	 * 
	 * @param clazzName full class name of inherited SimpleRPCRunnable class 
	 * @return instance of given class name, null may be returned.
	 */
	protected SimpleRPCRunnable createRunnableInstance(String clazzName) {
		try {
			Class runnableClass = Class.forName(clazzName);
			if (runnableClass != null) {
				// SimpleRPCRunnale should always has default constructor
				Constructor constructor = runnableClass.getConstructor(new Class[0]);
				Object obj = constructor.newInstance(new Object[0]);
				if (obj != null && obj instanceof SimpleRPCRunnable) {
					return (SimpleRPCRunnable) obj;
				}
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
	
	/*
	 * Example of web.xml:
    <servlet>
        <servlet-name>simplerpc</servlet-name>
        <servlet-class>net.sf.j2s.ajax.SimpleRPCHttpServlet</servlet-class>
		<init-param>
			<param-name>simple.rpc.runnables</param-name>
			<param-value>
				org.java2script.notepad.AutoSaveRunnable;
				org.java2script.notepad.LoadDraftRunnable;
				org.java2script.notepad.LoadNoteRunnable;
				org.java2script.notepad.SaveNoteRunnable;
			</param-value>
		</init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>simplerpc</servlet-name>
        <url-pattern>/simplerpc</url-pattern>
    </servlet-mapping>
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
		super.init();
	}
	
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {
		String request = null;
		InputStream res = req.getInputStream();
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buf = new byte[1024];
			int read = 0;
			while ((read = res.read(buf)) != -1) {
				baos.write(buf, 0, read);
				if (baos.size() > 0x1000000) { // 16 * 1024 * 1024 // 16M!
					/*
					 * Some malicious request may try to allocate huge size of memory! 
					 * DoS attack? Limit the data size of HTTP request! 
					 */
					res.close();
					resp.sendError(HttpServletResponse.SC_FORBIDDEN, 
							"Data size reaches the limit of Java2Script Simple RPC!");
					return;
				}
			}
			res.close();
			request = baos.toString();
		} catch (IOException e) {
			e.printStackTrace();
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		SimpleRPCRunnable runnable = getRunnableByRequest(request);
		if (runnable == null) {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		PrintWriter writer = resp.getWriter();
		resp.setContentType("text/plain");
		//resp.setCharacterEncoding("utf-8");
		runnable.deserialize(request);
		runnable.ajaxRun();
		writer.write(runnable.serialize());
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {
		String request = req.getQueryString();
		SimpleRPCRunnable runnable = getRunnableByRequest(request);
		if (runnable == null) {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		PrintWriter writer = resp.getWriter();
		resp.setContentType("text/plain");
		//resp.setCharacterEncoding("utf-8");
		runnable.deserialize(request);
		runnable.ajaxRun();
		writer.write(runnable.serialize());
	}
	
	
}