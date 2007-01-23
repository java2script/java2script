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
import java.util.Date;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * This class is designed as a Java Servlet container.
 * 
 * @author zhou renjian
 *
 * 2006-10-10
 */
public class SimpleRPCHttpServlet extends HttpServlet {

	private static final long serialVersionUID = -3852449040495666018L;

	protected Set runnables = new HashSet();
	
	protected long maxPostLimit() {
		return 0x1000000; // 16 * 1024 * 1024 // 16M!
	}
	
	protected boolean supportXSSRequest() {
		return true;
	}
	
	protected int maxXSSRequestParts() { 
		/* 
		 * should never bigger than 10!
		 * each part will be an HTTP connection!
		 */
		return 128; // 8k * 128 = 1M, for IE it will 2k * 128 = 256k
	}
	
	protected long maxXSSRequestLatency() {
		return 60 * 1000; // 60s to send a request?
	}
	
	/**
	 * Get SimpleRPCRunnable instance correspond to the given request. 
	 * 
	 * @param request String that is from POST data or GET query  
	 * @return SimpleRPCRunnable instance. If request is bad request or 
	 * specified class name is invalid, null will be returned.
	 */
	protected SimpleRPCRunnable getRunnableByRequest(String request) {
		if (request == null) return null;
		int length = request.length();
		if (length <= 7 || !request.startsWith("WLL")) return null;
		int index = request.indexOf('#');
		if (index == -1) return null;
		String clazzName = request.substring(6, index);
		if (!validateRunnable(clazzName)) return null;
		return createRunnableInstance(clazzName);
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

	/**
	 * Validate the given class name.
	 * @param clazzName
	 * @return specified class is valid or not.
	 */
	protected boolean validateRunnable(String clazzName) {
		return runnables.contains(clazzName);
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
				if (baos.size() > maxPostLimit()) {
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
		resp.setContentType("text/plain");
		//resp.setCharacterEncoding("utf-8");
		PrintWriter writer = resp.getWriter();
		runnable.deserialize(request);
		runnable.ajaxRun();
		writer.write(runnable.serialize());
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {
		String request = req.getQueryString();
		/*
		 * may be start with "jz[n|p|c|z]=", normal request may start with 
		 * "WLL100" or other tokens but charAt(3) should never be '='.
		 */
		boolean isScriptRequest = request.charAt(3) == '=';
		
		boolean supportScriptRequest = supportXSSRequest();
		
		String nameID = null;
		if (supportScriptRequest) {
			HttpSession ses = req.getSession(false);
			if (ses != null) { // try to clean expired request!
				Enumeration attrNames = ses.getAttributeNames();
				while (attrNames.hasMoreElements()) {
					String name = (String) attrNames.nextElement();
					if (name.startsWith("jzt")) {
						Date dt = (Date) ses.getAttribute(name);
						if (new Date().getTime() - dt.getTime() > maxXSSRequestLatency()) {
							ses.removeAttribute(name);
							ses.removeAttribute("jzn" + name.substring(3));
						}
					}
				}
			}
			if (isScriptRequest) { // simplerpc?jzn=604107&jzp=1&jzc=1&jzz=WLL100...
				nameID = req.getParameter("jzn");
				String count = req.getParameter("jzp");
				String current = req.getParameter("jzc");
				String content = req.getParameter("jzz");
				if (nameID == null || !nameID.matches("\\d{6,}")
						|| count == null || !count.matches("[1-9]\\d{0,2}")
						|| current == null || !current.matches("[1-9]\\d{0,2}")
						|| content == null || content.trim().length() == 0) {
					resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}
				int partsCount = Integer.parseInt(count);
				int curPart = Integer.parseInt(current);
				if (partsCount > maxXSSRequestParts() || curPart > partsCount) {
					resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
					return;
				}
				if (partsCount != 1) {
					HttpSession session = req.getSession();
					String attrName = "jzn" + nameID;
					String attrTime = "jzt" + nameID;
					Object attr = session.getAttribute(attrName);
					String[] parts = null;
					if (attr == null) {
						parts = new String[partsCount];
						session.setAttribute(attrName, parts);
						session.setAttribute(attrTime, new Date());
					} else { // attr instanceof String[]
						parts = (String []) attr;
						if (partsCount != parts.length) {
							resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
							return;
						}
					}
					parts[curPart - 1] = content;
					for (int i = 0; i < parts.length; i++) {
						if (parts[i] == null) {
							resp.setContentType("text/javascript");
							//resp.setCharacterEncoding("utf-8");
							resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest" +
									".xssNotify(\"" + nameID + "\", \"continue\");");
							return;
						}
					}
					synchronized (session) {
						session.removeAttribute(attrName);
						session.removeAttribute(attrTime);
					}
					StringBuffer buf = new StringBuffer();
					for (int i = 0; i < parts.length; i++) {
						buf.append(parts[i]);
						parts[i] = null;
					}
					request = buf.toString();
				} else { // bad request !
					request = content;
				}
			}
		} else if (isScriptRequest) {
			resp.setContentType("text/javascript");
			//resp.setCharacterEncoding("utf-8");
			nameID = req.getParameter("jzn");
			resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest" +
					".xssNotify(\"" + nameID + "\", \"unsupported\");");
			return;
		}
		SimpleRPCRunnable runnable = getRunnableByRequest(request);
		if (runnable == null) {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		runnable.deserialize(request);
		runnable.ajaxRun();
		String serialize = runnable.serialize();
		if (!isScriptRequest) {
			resp.setContentType("text/plain");
			//resp.setCharacterEncoding("utf-8");
			PrintWriter writer = resp.getWriter();
			writer.write(serialize);
		} else {
			resp.setContentType("text/javascript");
			//resp.setCharacterEncoding("utf-8");
			PrintWriter writer = resp.getWriter();
			writer.write("net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(");
			writer.write("\"" + nameID + "\", \"");
			writer.write(serialize.replaceAll("\r", "\\r")
					.replaceAll("\n", "\\n")
					.replaceAll("\"", "\\\""));
			writer.write("\");");
		}
	}
	
	
}