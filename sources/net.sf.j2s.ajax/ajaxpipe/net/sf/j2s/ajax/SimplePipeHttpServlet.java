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

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.j2s.ajax.SimpleSerializable;

/**
 * 
 * @author zhou renjian
 */
public class SimplePipeHttpServlet extends HttpServlet {

	private static final long serialVersionUID = -1220429212081566243L;

	protected long pipeQueryTimeout = 5000; // 5 seconds
	
	/*
	 * Example of web.xml:
    <servlet>
        <servlet-name>simplepipe</servlet-name>
        <servlet-class>net.sf.j2s.ajax.SimplePipeHttpServlet</servlet-class>
		<init-param>
			<param-name>simple.pipe.query.timeout</param-name>
			<param-value>1000</param-value>
		</init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>simplepipe</servlet-name>
        <url-pattern>/simplepipe</url-pattern>
    </servlet-mapping>
	 */
	public void init() throws ServletException {
		String timeoutStr = getInitParameter("simple.pipe.query.timeout");
		if (timeoutStr != null) {
			try {
				pipeQueryTimeout = Long.parseLong(timeoutStr);
				/*
				 * Range is [0, 20000]!
				 * 0: No waiting
				 * -1: 20 seconds
				 */
				if (pipeQueryTimeout < 0 || pipeQueryTimeout > 20000) {
					pipeQueryTimeout = 20000; // 20s: less than 30s should be safe!
				}
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
		}
		super.init();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String key = req.getParameter(SimplePipeRequest.FORM_PIPE_KEY);
		String type = req.getParameter(SimplePipeRequest.FORM_PIPE_TYPE);
		if (type == null) {
			type = SimplePipeRequest.PIPE_TYPE_CONTINUUM;
		}
		doPipe(resp, key, type);
	}

	/**
	 * continuum, query, script, xss
	 * 
	 * type = continuum
	 * The connection will be kept open.
	 * 
	 * type = query
	 * The connection will not be kept. Each request stands for a query
	 * 
	 * type = script
	 * IFRAME object is used to simulate kept-open-connection
	 * 
	 * type = xss
	 * Cross Site Script pipe type, SimpleSerializable instances are
	 * wrapped in JavaScript string.
	 * 
	 * type = notify
	 * Notify that client (browser) still keeps the pipe connection.
	 */ 
	protected void doPipe(final HttpServletResponse resp, String key, String type)
			throws IOException {
		PrintWriter writer = null;
		resp.setHeader("Pragma", "no-cache");
		resp.setHeader("Cache-Control", "no-cache");
		resp.setDateHeader("Expires", 0);
		
		if (SimplePipeRequest.PIPE_TYPE_NOTIFY.equals(type)) {
			/*
			 * Client send in "notify" request to execute #notifyPipeStatus, see below comments
			 */
			boolean updated = SimplePipeHelper.notifyPipeStatus(key, true); // update it!
			resp.setContentType("text/plain; charset=utf-8");
			writer = resp.getWriter();
			writer.write("$p1p3b$ (\""); // $p1p3b$ = net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack
			writer.write(key);
			writer.write("\", \"");
			writer.write(updated ? SimplePipeRequest.PIPE_STATUS_OK : SimplePipeRequest.PIPE_STATUS_LOST);
			writer.write("\");");
			return;
		}
		
		resp.setHeader("Transfer-Encoding", "chunked");
		if (SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type)) { // iframe
			resp.setContentType("text/html; charset=utf-8");
			writer = resp.getWriter();
			StringBuffer buffer = new StringBuffer();
			buffer.append("<html><head><title></title></head><body>\r\n");
			buffer.append("<script type=\"text/javascript\">");
			buffer.append("function $ (s) { if (window.parent) window.parent.net.sf.j2s.ajax.SimplePipeRequest.parseReceived (s); }");
			buffer.append("</script>\r\n");
			writer.write(buffer.toString());
		} else {
			resp.setContentType("text/plain; charset=utf-8");
			writer = resp.getWriter();
		}

		SimplePipeHelper.notifyPipeStatus(key, true); // update it!
		
		boolean hasPipeData = false;

		long beforeLoop = new Date().getTime();
		Vector<SimpleSerializable> vector = null;
		while ((vector = SimplePipeHelper.getPipeVector(key)) != null
				&& SimplePipeHelper.isPipeLive(key) // check it!
				&& !writer.checkError()) {
			int size = vector.size();
			if (size > 0) {
				for (int i = size - 1; i >= 0; i--) {
					SimpleSerializable ss = null;
					/*
					 * Still need to check vector size!
					 * Maybe multiple pipe servlets! 
					 */
					synchronized (vector) {
						if (vector.size() <= 0) break;
						ss = vector.remove(0);
					}
					if (ss == null) break; // terminating signal
					output(writer, type, key, ss.serialize());
					hasPipeData = true;
					writer.flush();
				}
			} else {
				writer.flush();
			}
			/*
			 * Client should send in "notify" request to simulate the following #notifyPipeStatus
			 */
			// SimplePipeHelper.notifyPipeStatus(key, true);
			
			long now = new Date().getTime();
			if ((vector = SimplePipeHelper.getPipeVector(key)) != null // may be broken down already!!
					&& (SimplePipeRequest.PIPE_TYPE_CONTINUUM.equals(type) 
							|| SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type)
					|| (size <= 0 && now - beforeLoop < pipeQueryTimeout))) {
				synchronized (vector) {
					try {
						vector.wait(1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			} else {
				break;
			}
		} // end of while
		if (SimplePipeHelper.getPipeVector(key) == null
				|| !SimplePipeHelper.isPipeLive(key)) { // pipe is tore down!
			SimplePipeHelper.notifyPipeStatus(key, false);
			SimplePipeHelper.pipeTearDown(key);
			SimplePipeHelper.removePipe(key);
			try {
				output(writer, type, key, SimplePipeRequest.PIPE_STATUS_DESTROYED);
				hasPipeData = true;
			} catch (Exception e) {
				// HTTP connection may be closed already!
			}
		}
		if (!hasPipeData) {
			//output(writer, type, key, SimplePipeRequest.PIPE_STATUS_OK);
		}
		if (SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type)) { // iframe
			try {
				writer.write("</body></html>\r\n");
			} catch (Exception e) {
				// HTTP connection may be closed already!
			}
		}
	}

	protected void output(PrintWriter writer, String type, String key,
			String str) {
		StringBuffer buffer = new StringBuffer();
		if (SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type)) { 
			// iframe, so $ is a safe method identifier
			buffer.append("<script type=\"text/javascript\">$ (\"");
		} else if (SimplePipeRequest.PIPE_TYPE_XSS.equals(type)) {
			buffer.append("$p1p3p$ (\""); // $p1p3p$
		}
		buffer.append(key);
		if (SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type) 
				|| SimplePipeRequest.PIPE_TYPE_XSS.equals(type)) {
			str = str.replaceAll("\\\\", "\\\\\\\\").replaceAll("\r", "\\\\r")
					.replaceAll("\n", "\\\\n").replaceAll("\"", "\\\\\"");
			if (SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type)) {
				str = str.replaceAll("<\\/script>", "<\\/scr\" + \"ipt>");
			}
		}
		buffer.append(str);
		if (SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type)) { // iframe
			buffer.append("\");</script>\r\n");
		} else if (SimplePipeRequest.PIPE_TYPE_XSS.equals(type)) {
			buffer.append("\");\r\n");
		}
		writer.write(buffer.toString());
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}

}
