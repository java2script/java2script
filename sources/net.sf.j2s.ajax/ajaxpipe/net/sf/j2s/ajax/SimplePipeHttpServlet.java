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
import java.util.List;

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
	
	protected long pipeScriptBreakout = 1200000; // 20 minutes

	protected int pipeMaxItemsPerQuery = -1; // infinite

	/*
	 * Example of web.xml:
    <servlet>
        <servlet-name>simplepipe</servlet-name>
        <servlet-class>net.sf.j2s.ajax.SimplePipeHttpServlet</servlet-class>
		<init-param>
			<param-name>simple.pipe.query.timeout</param-name>
			<param-value>1000</param-value>
		</init-param>
		<init-param>
			<param-name>simple.pipe.script.breakout</param-name>
			<param-value>1200000</param-value>
		</init-param>
		<init-param>
			<param-name>simple.pipe.max.items.per.query</param-name>
			<param-value>60</param-value>
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
		String breakoutStr = getInitParameter("simple.pipe.script.breakout");
		if (breakoutStr != null) {
			try {
				pipeScriptBreakout = Long.parseLong(breakoutStr);
				if (pipeScriptBreakout <= 0 || pipeScriptBreakout > 1200000) {
					pipeScriptBreakout = 1200000; // take a break for every 20 minutes
				} else if (pipeScriptBreakout <= 60000) {
					pipeScriptBreakout = 60000; // at least 1 minute
				}
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
		}
		String perQueryStr = getInitParameter("simple.pipe.max.items.per.query");
		if (perQueryStr != null) {
			try {
				pipeMaxItemsPerQuery = Integer.parseInt(perQueryStr);
				if (pipeMaxItemsPerQuery <= 0 ) {
					pipeMaxItemsPerQuery = -1; // 0, -1 means infinite items
				} else if (pipeMaxItemsPerQuery < 5) {
					pipeMaxItemsPerQuery = 5; // hey, we think limiting for less than 5 items make no senses.
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
		if (key == null) {
			resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return;
		}
		String type = req.getParameter(SimplePipeRequest.FORM_PIPE_TYPE);
		if (type == null) {
			type = SimplePipeRequest.PIPE_TYPE_CONTINUUM;
		}
		String domain = req.getParameter(SimplePipeRequest.FORM_PIPE_DOMAIN);
		doPipe(resp, key, type, domain);
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
	protected void doPipe(final HttpServletResponse resp, String key, String type, String domain)
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
			resp.setContentType("text/javascript; charset=utf-8");
			writer = resp.getWriter();
			writer.write("$p1p3b$ (\""); // $p1p3b$ = net.sf.j2s.ajax.SimplePipeRequest.pipeNotifyCallBack
			writer.write(key);
			writer.write("\", \"");
			writer.write(updated ? SimplePipeRequest.PIPE_STATUS_OK : SimplePipeRequest.PIPE_STATUS_LOST);
			writer.write("\");");
			return;
		}
		if (SimplePipeRequest.PIPE_TYPE_SUBDOMAIN_QUERY.equals(type)) { // subdomain query
			resp.setContentType("text/html; charset=utf-8");
			writer = resp.getWriter();
			StringBuffer buffer = new StringBuffer();
			buffer.append("<html><head><title></title></head><body>\r\n");
			buffer.append("<script type=\"text/javascript\">");
			buffer.append("p = new Object ();\r\n");
			buffer.append("p.key = \"" + key + "\";\r\n");
			buffer.append("p.originalDomain = document.domain;\r\n");
			buffer.append("document.domain = \"" + domain + "\";\r\n");
			buffer.append("var securityErrors = 0\r\n");
			buffer.append("var lazyOnload = function () {\r\n");
			buffer.append("try {\r\n");
			buffer.append("var spr = window.parent.net.sf.j2s.ajax.SimplePipeRequest;\r\n");
			buffer.append("eval (\"(\" + spr.subdomainInit + \") (p);\");\r\n");
			buffer.append("eval (\"((\" + spr.subdomainLoopQuery + \") (p)) ();\");\r\n");
			buffer.append("} catch (e) {\r\n");
			buffer.append("securityErrors++;\r\n");
			buffer.append("if (securityErrors < 100) {\r\n"); // 10s
			buffer.append("window.setTimeout (lazyOnload, 100);\r\n");
			buffer.append("};\r\n"); // end of if
			buffer.append("};\r\n"); // end of catch
			buffer.append("};\r\n"); // end of function
			buffer.append("window.onload = lazyOnload;\r\n");
			buffer.append("</script>\r\n");
			buffer.append("</body></html>\r\n");
			writer.write(buffer.toString());
			return;
		}
		boolean isContinuum = SimplePipeRequest.PIPE_TYPE_CONTINUUM.equals(type);
		if (isContinuum) {
			resp.setHeader("Transfer-Encoding", "chunked");
		}
		boolean isScripting = SimplePipeRequest.PIPE_TYPE_SCRIPT.equals(type);
		if (isScripting) { // iframe
			resp.setContentType("text/html; charset=utf-8");
			writer = resp.getWriter();
			StringBuffer buffer = new StringBuffer();
			buffer.append("<html><head><title></title></head><body>\r\n");
			buffer.append("<script type=\"text/javascript\">");
			if (domain != null) {
				buffer.append("document.domain = \"" + domain + "\";\r\n");
			} else {
				buffer.append("document.domain = document.domain;\r\n");
			}
			buffer.append("function $ (s) { if (window.parent) window.parent.net.sf.j2s.ajax.SimplePipeRequest.parseReceived (s); }");
			buffer.append("if (window.parent) eval (\"(\" + window.parent.net.sf.j2s.ajax.SimplePipeRequest.checkIFrameSrc + \") ();\");\r\n");
			buffer.append("</script>\r\n");
			writer.write(buffer.toString());
			writer.flush();
		} else {
			if (SimplePipeRequest.PIPE_TYPE_QUERY.equals(type)
					|| isContinuum) {
				resp.setContentType("text/plain; charset=utf-8");
			} else {
				resp.setContentType("text/javascript; charset=utf-8");
			}
			writer = resp.getWriter();
		}

		long lastPipeDataWritten = -1;
		long beforeLoop = System.currentTimeMillis();
		int items = 0;
		if (SimplePipeHelper.notifyPipeStatus(key, true)) { // update it!
			List<SimpleSerializable> list = null;
			int priority = 0;
	        long lastLiveDetected = System.currentTimeMillis();
	        SimplePipeRunnable pipe = SimplePipeHelper.getPipe(key);
	        long waitClosingInterval = pipe == null ? 5000 : pipe.pipeWaitClosingInterval();
			while ((list = SimplePipeHelper.getPipeDataList(key)) != null
					/* && SimplePipeHelper.isPipeLive(key) */ // check it!
					&& !writer.checkError()) {
				StringBuffer buffer = new StringBuffer();
				synchronized (list) {
					int size = list.size();
					if (size > 0) {
						boolean live = SimplePipeHelper.isPipeLive(key);
						for (int i = 0; i < size; i++) {
							SimpleSerializable ss = null;
							ss = list.remove(0);
							if (ss == null) break; // terminating signal
							if (ss instanceof ISimpleCacheable) {
								ISimpleCacheable sc = (ISimpleCacheable) ss;
								sc.setCached(false);
							}
							buffer.append(output(type, key, ss.serialize()));
							items++;
							if (live && pipeMaxItemsPerQuery > 0 && items >= pipeMaxItemsPerQuery
									&& !isContinuum) {
								break;
							}
							lastPipeDataWritten = System.currentTimeMillis();
							if (ss instanceof ISimplePipePriority) {
								ISimplePipePriority spp = (ISimplePipePriority) ss;
								int p = spp.getPriority();
								if (p <= 0) {
									p = ISimplePipePriority.IMPORTANT;
								}
								priority += p;
							} else {
								priority += ISimplePipePriority.IMPORTANT;
							}
						}
					}
				}
				if (buffer.length() > 0) {
					writer.write(buffer.toString());
				}
				writer.flush();
				if (!SimplePipeHelper.isPipeLive(key)) {
					if (System.currentTimeMillis() - lastLiveDetected > waitClosingInterval) {
						// break out while loop so pipe connection will be closed
						break;
					} else { // sleep 1s and continue to check pipe status again
						try {
							Thread.sleep(1000);
						} catch (InterruptedException e) {
						}
						continue;
					}
				} else {
					lastLiveDetected = System.currentTimeMillis();
				}
				// Client should send in "notify" request to simulate the following #notifyPipeStatus
				// SimplePipeHelper.notifyPipeStatus(key, true);
				
				long now = System.currentTimeMillis();
				if ((lastPipeDataWritten == -1 && now - beforeLoop >= pipeQueryTimeout)
						|| (lastPipeDataWritten > 0
								&& now - lastPipeDataWritten >= pipeQueryTimeout
								&& (isContinuum || isScripting))) {
					writer.write(output(type, key, SimplePipeRequest.PIPE_STATUS_OK));
					lastPipeDataWritten = System.currentTimeMillis();
				}
				
				now = System.currentTimeMillis();
				if (SimplePipeHelper.getPipeDataList(key) != null // may be broken down already!!
						&& (pipeMaxItemsPerQuery <= 0 || items < pipeMaxItemsPerQuery || isContinuum)
						&& (isContinuum || (isScripting && now - beforeLoop < pipeScriptBreakout)
						|| (priority < ISimplePipePriority.IMPORTANT && now - beforeLoop < pipeQueryTimeout))) {
					synchronized (pipe) {
						try {
							pipe.wait(1000);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
				} else {
					break;
				}
			} // end of while
		} // else pips is already closed or in other statuses
		if (SimplePipeHelper.getPipeDataList(key) == null
				|| !SimplePipeHelper.isPipeLive(key)) { // pipe is tore down!
			//SimplePipeHelper.notifyPipeStatus(key, false); // Leave for pipe monitor to destroy it
			SimplePipeHelper.removePipe(key);
			try {
				writer.write(output(type, key, SimplePipeRequest.PIPE_STATUS_DESTROYED));
				lastPipeDataWritten = System.currentTimeMillis();
			} catch (Exception e) {
				// HTTP connection may be closed already!
			}
		} else if (isScripting
				&& (System.currentTimeMillis() - beforeLoop >= pipeScriptBreakout
						|| (pipeMaxItemsPerQuery > 0 && items >= pipeMaxItemsPerQuery))) {
			try {
				writer.write(output(type, key, SimplePipeRequest.PIPE_STATUS_CONTINUE));
				lastPipeDataWritten = System.currentTimeMillis();
			} catch (Exception e) {
				// HTTP connection may be closed already!
			}
		}
		if (lastPipeDataWritten == -1) {
			writer.write(output(type, key, SimplePipeRequest.PIPE_STATUS_OK));
		}
		if (isScripting) { // iframe
			try {
				writer.write("</body></html>\r\n");
			} catch (Exception e) {
				// HTTP connection may be closed already!
			}
		}
	}

	protected static String output(String type, String key,
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
		return buffer.toString();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doGet(req, resp);
	}

}
