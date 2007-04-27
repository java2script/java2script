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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.net.URLDecoder;
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
	
	protected long postLimit = 0x1000000; // 16 * 1024 * 1024 // 16M!
	
	protected boolean supportXSS = true;
	
	/* 
	 * should never be bigger than 10!
	 * each part will be an HTTP connection!
	 */
	protected int xssPartLimit = 128; // 8k * 128 = 1M, for IE it will 2k * 128 = 256k
	
	protected long xssLatency = 60 * 1000; // 60s to send a request?
	
	protected long maxPostLimit() {
		return postLimit;
	}
	
	/**
	 * Return support cross site script request or not.
	 * 
	 * If cross site script is supported, http log format should be modified
	 * so those requests are not logged.
	 * If Apache httpd server is used, you can modify httpd.conf as following:
	 * <pre>
	 * LogFormat "%h %l %u %t \"%m %U %H\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" noquery
	 * ...
	 * CustomLog logs/dummy-host.example.com-access_log noquery
	 * </pre>
	 * Or use SetEnvIf
	 * <pre>
	 * SetEnvIf Request_URI "^/your-url" dontlog
	 * CustomLog logs/dummy-host.example.com-access_log combined env=!dontlog
	 * </pre>
	 * 
	 * @see http://httpd.apache.org/docs/2.0/mod/mod_log_config.html
	 * @see http://httpd.apache.org/docs/1.3/logs.html
	 * 
	 * @return
	 */
	protected boolean supportXSSRequest() {
		return supportXSS;
	}
	
	protected int maxXSSRequestParts() { 
		return xssPartLimit;
	}
	
	protected long maxXSSRequestLatency() {
		return xssLatency;
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
		<init-param>
			<param-name>simple.rpc.xss.support</param-name>
			<param-value>true</param-value>
		</init-param>
		<init-param>
			<param-name>simple.rpc.xss.max.parts</param-name>
			<param-value>10</param-value>
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
		String postLimitStr = getInitParameter("simple.rpc.post.limit");
		if (postLimitStr != null) {
			try {
				postLimit = Long.parseLong(postLimitStr);
				if (postLimit <= 0) {
					postLimit = Long.MAX_VALUE;
				}
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
		}
		String xssSupportStr = getInitParameter("simple.rpc.xss.support");
		if (xssSupportStr != null) {
			supportXSS = "true".equals(xssSupportStr);
		}
		String xssLatencytStr = getInitParameter("simple.rpc.xss.max.latency");
		if (xssLatencytStr != null) {
			try {
				xssLatency = Long.parseLong(xssLatencytStr);
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
		}
		String xssPartsStr = getInitParameter("simple.rpc.xss.max.parts");
		if (xssPartsStr != null) {
			try {
				xssPartLimit = Integer.parseInt(xssPartsStr);
			} catch (NumberFormatException e) {
				e.printStackTrace();
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
		// a quick check!
		if (request == null || request.length() < 4) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		
		boolean isScriptReuest = false;
		String requestID = null;
		/*
		 * may be start with "jz[n|p|c|z]=", normal request may start with 
		 * raw "WLL100" or other tokens but charAt(3) should never be '='.
		 */
		if (request.charAt(3) == '=') { // simplerpc?jzn=604107&jzp=1&jzc=1&jzz=WLL100...
			request = req.getParameter("jzz"); // jzz without jzn is considered as XHR requests!
			if (request == null || request.trim().length() == 0) {
				resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
				return;
			}
			
			requestID = req.getParameter("jzn");
			if (requestID != null && requestID.length() != 0) {
				isScriptReuest = true;
				
				// when jzn is defined, it's considered as a script request!
				request = prepareScriptRequest(req, resp, requestID, request);
				if (request == null) { // already send out reponses
					return;
				}
			}
		} else { // ?WLL100net.sf....%23...
			request = URLDecoder.decode(request, "UTF-8");
		}
		
		SimpleRPCRunnable runnable = getRunnableByRequest(request);
		if (runnable == null) {
			resp.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}
		runnable.deserialize(request);
		runnable.ajaxRun();
		String serialize = runnable.serialize();
		
		if (isScriptReuest) { // cross site script response
			resp.setContentType("text/javascript");
			//resp.setCharacterEncoding("utf-8");
			PrintWriter writer = resp.getWriter();
			writer.write("net.sf.j2s.ajax.SimpleRPCRequest.xssNotify(");
			writer.write("\"" + requestID + "\", \"");
			writer.write(serialize.replaceAll("\r", "\\\\r")
					.replaceAll("\n", "\\\\n")
					.replaceAll("\"", "\\\\\""));
			writer.write("\");");
			return;
		}
		
		// normal text response
		resp.setContentType("text/plain");
		//resp.setCharacterEncoding("utf-8");
		PrintWriter writer = resp.getWriter();
		writer.write(serialize);
	}

	private String prepareScriptRequest(HttpServletRequest req, HttpServletResponse resp, 
			String scriptRequestID, String request) throws IOException {
		
		// check request id: must be 6 digitals
		if (!scriptRequestID.matches("\\d{6,}")) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// make sure that servlet support cross site script request
		if (!supportXSSRequest()) {
			resp.setContentType("text/javascript");
			//resp.setCharacterEncoding("utf-8");
			resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest" +
					".xssNotify(\"" + scriptRequestID + "\", \"unsupported\");");
			return null;
		}
		
		// check script request counts
		String count = req.getParameter("jzp");
		if (count == null || !count.matches("[1-9]\\d{0,2}")) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		int partsCount = Integer.parseInt(count);
		if (partsCount == 1) {
			return request; // can be return directly
		}
		
		// check curent request index
		String current = req.getParameter("jzc");
		if (current == null || !current.matches("[1-9]\\d{0,2}")) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		int curPart = Integer.parseInt(current);
		if (partsCount < 1 || curPart > partsCount) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		
		// check whether servlet can deal the requests
		if (partsCount > maxXSSRequestParts()) {
			resp.setContentType("text/javascript");
			//resp.setCharacterEncoding("utf-8");
			resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest" +
					".xssNotify(\"" + scriptRequestID + "\", \"exceedrequestlimit\");");
			return null;
		}
		
		// clean dead session bodies
		cleanSession(req);

		// store request in session before the request is completed
		HttpSession session = req.getSession();
		
		String attrName = "jzn" + scriptRequestID;
		String attrTime = "jzt" + scriptRequestID;
		String[] parts = null;
		
		boolean badRequest = false;
		boolean toContinue = false;
		synchronized (session) {
			Object attr = session.getAttribute(attrName);
			if (attr == null) {
				parts = new String[partsCount];
				session.setAttribute(attrName, parts);
				session.setAttribute(attrTime, new Date());
			} else { // attr instanceof String[]
				parts = (String []) attr;
				if (partsCount != parts.length) {
					badRequest = true;
				}
			}
			if (!badRequest) {
				synchronized (parts) {
					parts[curPart - 1] = request;
					for (int i = 0; i < parts.length; i++) {
						if (parts[i] == null) {
							// not completed yet! just response and wait next request.
							toContinue = true;
							break;
						}
					}
				}
				if (!toContinue) {
					// request is completed. return the request
					session.removeAttribute(attrName);
					session.removeAttribute(attrTime);
				}
			}
		}
		if (badRequest) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		if (toContinue) {
			resp.setContentType("text/javascript");
			//resp.setCharacterEncoding("utf-8");
			resp.getWriter().write("net.sf.j2s.ajax.SimpleRPCRequest" +
					".xssNotify(\"" + scriptRequestID + "\", \"continue\");");
			return null;
		}
		
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < parts.length; i++) {
			buf.append(parts[i]);
			parts[i] = null;
		}
		return buf.toString();
	}
	
	private void cleanSession(HttpServletRequest req) {
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
	}
	
}