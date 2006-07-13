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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;

/**
 * @author josson smith
 *
 * 2006-2-11
 */
public final class HttpRequest {
	private int status;
	private int readyState;
	
	private String responseText;
	private Document responseXML;
	private IXHRCallback onreadystatechange;
	//private boolean overrideMimeType;
	
	private boolean asynchronous;
	private HttpURLConnection connection;
	private String url;
	private String method;
	
	private Map headers = new HashMap();
	private String content;
	
	public int getReadyState() {
		return readyState;
	}
	public String getResponseText() {
		return responseText;
	}
	public Document getResponseXML() {
		if (responseXML != null) {
			return responseXML;
		}
		if (responseText != null && responseText.length() != 0) {
	        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
	        dbf.setNamespaceAware(true);
	        dbf.setAttribute("http://xml.org/sax/features/namespaces", Boolean.TRUE);
			try {
	            DocumentBuilder db = dbf.newDocumentBuilder();
	            ByteArrayInputStream biStream = new ByteArrayInputStream(responseText.getBytes());
	            responseXML = db.parse(biStream);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
		}
		return responseXML;
	}
	public int getResponseCode() {
		return status;
	}
	public void registerOnReadyStateChange(IXHRCallback onreadystatechange) {
		this.onreadystatechange = onreadystatechange;
	}
	public void setRequestHeader(String key, String value) {
		headers.put(key, value);
	}
	public String getResponseHeader(String key) {
		return connection.getHeaderField(key);
	}
	public void open(String method, String url) {
		open(method, url, false);
	}
	public void open(String method, String url, boolean async) {
		this.asynchronous = async;
		this.method = method;
		this.url = url;
		responseText = null;
		responseXML = null;
		readyState = 1;
		if (onreadystatechange != null) {
			onreadystatechange.onLoading();
		}
	}
	public void send() {
		send(null);
	}
	public void send(String str) {
		content = str;
		if (asynchronous) {
			new Thread(new Runnable() {
				public void run() {
					request();
				}
			}).start();
		} else {
			request();
		}
	}
	private void request() {
		try {
			connection = (HttpURLConnection) new URL(url).openConnection();
			connection.setDoInput(true);
			connection.setRequestMethod(method);
			connection.setRequestProperty("User-Agent",
					"Java2Script-Pacemaker/1.0 (+http://j2s.sourceforge.net)");
			if ("post".equalsIgnoreCase(method)) {
				connection.setDoOutput(true);
				connection.setRequestProperty("Content-Type",
						"application/x-www-form-urlencoded");
			}
			for (Iterator iter = headers.keySet().iterator(); iter.hasNext();) {
				String key = (String) iter.next();
				connection.setRequestProperty(key, (String) headers.get(key));
			}
			connection.setUseCaches(false);
			if ("post".equalsIgnoreCase(method)) {
				DataOutputStream dos = new DataOutputStream(connection.getOutputStream());
				if (content != null) {
					dos.writeBytes(content);
				}
				dos.flush();
				dos.close();
			}
			InputStream is = connection.getInputStream();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024];
			int read;
			while ((read = is.read(buffer)) != -1) {
				if (readyState < 2) {
					readyState = 2;
					if (onreadystatechange != null) {
						onreadystatechange.onLoaded();
					}
				}
				baos.write(buffer, 0, read);
				if (readyState != 3) {
					readyState = 3;
					if (onreadystatechange != null) {
						onreadystatechange.onInteractive();
					}
				}
			}
			is.close();
			responseText = baos.toString();
			status = connection.getResponseCode();
			readyState = 4;
			if (onreadystatechange != null) {
				onreadystatechange.onComplete();
			}
			connection.disconnect();
			readyState = 0;
			/*
			if (onreadystatechange != null) {
				onreadystatechange.onUninitialized();
			}
			*/
		} catch (IOException e) {
			e.printStackTrace();
			readyState = 4;
			if (onreadystatechange != null) {
				onreadystatechange.onComplete();
			}
			connection = null;
			readyState = 0;
			/*
			if (onreadystatechange != null) {
				onreadystatechange.onUninitialized();
			}
			*/
		}
	}
	
}
