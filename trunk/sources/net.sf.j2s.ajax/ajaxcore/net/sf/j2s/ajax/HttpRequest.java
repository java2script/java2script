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
 * This class is a Java implementation of browser's XMLHttpRequest object.
 * This class can be considered as a bridge of Java's AJAX programming and
 * JavaScript/Browser's AJAX programming.
 * 
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
	
	/**
	 * Return read state of XMLHttpRequest.
	 * @return int ready state
	 */
	public int getReadyState() {
		return readyState;
	}
	/**
	 * Return response raw text of XMLHttpRequest 
	 * @return String response text. May be null if the request is not sent
	 * or an error happens. 
	 */
	public String getResponseText() {
		return responseText;
	}
	/**
	 * Return the parsed XML document of the response of XMLHttpRequest.
	 * @return Document XML document. May be null if the response text is not
	 * a valid XML document.
	 */
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
	/**
	 * Return respose code.
	 * @return int response code. For more information please read about
	 * HTTP protocol.
	 */
	public int getResponseCode() {
		return status;
	}
	/**
	 * Register XMLHttpRequest callback.
	 * 
	 * @param onreadystatechange IXHRCallback callback
	 */
	public void registerOnReadyStateChange(IXHRCallback onreadystatechange) {
		this.onreadystatechange = onreadystatechange;
	}
	/**
	 * Set request header with given key and value.
	 * @param key String request header keyword. For more information please 
	 * read about HTTP protocol.
	 * @param value String request header value
	 */
	public void setRequestHeader(String key, String value) {
		headers.put(key, value);
	}
	/**
	 * Get response header with given key.
	 * @param key String header keyword. For more information please 
	 * read about HTTP protocol.
	 * @return String the reponse header value.
	 */
	public String getResponseHeader(String key) {
		return connection.getHeaderField(key);
	}
	/**
	 * Open connection for HTTP request with given method and URL 
	 * synchronously.
	 * 
	 * @param method String "POST" or "GET" usually.
	 * @param url String remote URL. Should always be absolute URL.
	 */
	public void open(String method, String url) {
		open(method, url, false);
	}
	/**
	 * Open connection for HTTP request with given method, URL and mode.
	 * 
	 * @param method String "POST" or "GET" usually.
	 * @param url String remote URL. Should always be absolute URL.
	 * @param async boolean whether send request asynchronously or not. 
	 */
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
	
	/**
	 * Send the HTTP request without extra content.
	 */
	public void send() {
		send(null);
	}
	/**
	 * Send the HTTP request with given content.
	 * @param str String HTTP request content. May be null.
	 */
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
	/*
	 * Try setup the real connection and send the request over HTTP protocol. 
	 */
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
