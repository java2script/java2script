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
import java.io.OutputStream;
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
	/*
	 * @(#)Base64.java	1.4 03/01/23
	 *
	 * Copyright 2003 Sun Microsystems, Inc. All rights reserved.
	 * SUN PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
	 */

	/**
	 * Static methods for translating Base64 encoded strings to byte arrays
	 * and vice-versa.
	 *
	 * @author  Josh Bloch
	 * @version 1.4, 01/23/03
	 * @see     Preferences
	 * @since   1.4
	 */
	static class Base64 {
	    /**
	     * Translates the specified byte array into a Base64 string as per
	     * Preferences.put(byte[]).
	     */
	    static String byteArrayToBase64(byte[] a) {
	        int aLen = a.length;
	        int numFullGroups = aLen/3;
	        int numBytesInPartialGroup = aLen - 3*numFullGroups;
	        int resultLen = 4*((aLen + 2)/3);
	        StringBuffer result = new StringBuffer(resultLen);
	        char[] intToAlpha = intToBase64;

	        // Translate all full groups from byte array elements to Base64
	        int inCursor = 0;
	        for (int i=0; i<numFullGroups; i++) {
	            int byte0 = a[inCursor++] & 0xff;
	            int byte1 = a[inCursor++] & 0xff;
	            int byte2 = a[inCursor++] & 0xff;
	            result.append(intToAlpha[byte0 >> 2]);
	            result.append(intToAlpha[(byte0 << 4)&0x3f | (byte1 >> 4)]);
	            result.append(intToAlpha[(byte1 << 2)&0x3f | (byte2 >> 6)]);
	            result.append(intToAlpha[byte2 & 0x3f]);
	        }

	        // Translate partial group if present
	        if (numBytesInPartialGroup != 0) {
	            int byte0 = a[inCursor++] & 0xff;
	            result.append(intToAlpha[byte0 >> 2]);
	            if (numBytesInPartialGroup == 1) {
	                result.append(intToAlpha[(byte0 << 4) & 0x3f]);
	                result.append("==");
	            } else {
	                // assert numBytesInPartialGroup == 2;
	                int byte1 = a[inCursor++] & 0xff;
	                result.append(intToAlpha[(byte0 << 4)&0x3f | (byte1 >> 4)]);
	                result.append(intToAlpha[(byte1 << 2)&0x3f]);
	                result.append('=');
	            }
	        }
	        // assert inCursor == a.length;
	        // assert result.length() == resultLen;
	        return result.toString();
	    }

	    /**
	     * This array is a lookup table that translates 6-bit positive integer
	     * index values into their "Base64 Alphabet" equivalents as specified 
	     * in Table 1 of RFC 2045.
	     */
	    private static final char intToBase64[] = {
	        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
	        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
	    };
	}

	private int status;
	private String statusText;
	private int readyState;
	
	private String responseText;
	private Document responseXML;
	private IXHRCallback onreadystatechange;
	//private boolean overrideMimeType;
	
	private boolean asynchronous;
	private HttpURLConnection connection;
	private String url;
	private String method;
	private String user;
	private String password;
	
	private Map headers = new HashMap();
	private String content;
	
	private boolean toAbort = false;
	private boolean isDisconnected = false;
	private OutputStream activeOS;
	private InputStream activeIS;
	
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
		String type = connection.getHeaderField("Content-Type");
		if (type != null && (type.indexOf("/xml") != -1 || type.indexOf("+xml") != -1)) {
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
		} else {
			return null;
		}
	}
	/**
	 * Return respose code.
	 * @return int response code. For more information please read about
	 * HTTP protocol.
	 */
	public int getStatus() {
		return status;
	}
	/**
	 * Return respose code related text.
	 * @return int response code. For more information please read about
	 * HTTP protocol.
	 */
	public String getStatusText() {
		return statusText;
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
	 * Get all response heades.
	 * @return String the all reponse header value.
	 */
	public String getAllResponseHeaders() {
		StringBuffer buffer = new StringBuffer();
		int i = 1;
		while (true) {
			String key = connection.getHeaderFieldKey(i);
			if (key != null) {
				String value = connection.getHeaderField(i); 
				buffer.append(key);
				buffer.append(": ");
				buffer.append(value);
				buffer.append("\r\n");
			} else {
				break;
			}
			i++;
		}
		buffer.append("\r\n");
		return buffer.toString();
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
		open(method, url, false, null, null);
	}
	/**
	 * Open connection for HTTP request with given method, URL and mode.
	 * 
	 * @param method String "POST" or "GET" usually.
	 * @param url String remote URL. Should always be absolute URL.
	 * @param async boolean whether send request asynchronously or not. 
	 */
	public void open(String method, String url, boolean async) {
		open(method, url, async, null, null);
	}
	/**
	 * Open connection for HTTP request with given method, URL and mode.
	 * 
	 * @param method String "POST" or "GET" usually.
	 * @param url String remote URL. Should always be absolute URL.
	 * @param async boolean whether send request asynchronously or not. 
	 * @param user String user name
	 */
	public void open(String method, String url, boolean async, String user) {
		open(method, url, async, user, null);
	}
	/**
	 * Open connection for HTTP request with given method, URL and mode.
	 * 
	 * @param method String "POST" or "GET" usually.
	 * @param url String remote URL. Should always be absolute URL.
	 * @param async boolean whether send request asynchronously or not.
	 * @param user String user name
	 * @param password String user password 
	 */
	public void open(String method, String url, boolean async, String user, String password) {
		this.asynchronous = async;
		this.method = method;
		this.url = url;
		this.user = user;
		this.password = password;
		responseText = null;
		responseXML = null;
		readyState = 1;
		status = 200; // default OK
		statusText = null;
		toAbort = false;
		if (onreadystatechange != null) {
			onreadystatechange.onOpen();
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
					if (!toAbort) {
						request();
					}
				}
			}).start();
		} else {
			request();
		}
	}
	/**
	 * Abort the sending or receiving data process.
	 */
	public void abort() {
		toAbort = true;
		isDisconnected = false;
		checkAbort();
	}
	private boolean checkAbort() {
		if (!toAbort) return false;
		if (activeOS != null) {
			try {
				activeOS.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			activeOS = null;
		}
		if (activeIS != null) {
			try {
				activeIS.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			activeIS = null;
		}
		if (!isDisconnected && connection != null) {
			connection.disconnect();
			isDisconnected = true;
		}
		return true;
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
			if (user != null) {
				String auth = user + ":" + (password != null ? password : "");
				String base64Auth = HttpRequest.Base64.byteArrayToBase64(auth.getBytes());
				connection.setRequestProperty("Authorization", "Basic " + base64Auth);
			}
			for (Iterator iter = headers.keySet().iterator(); iter.hasNext();) {
				String key = (String) iter.next();
				connection.setRequestProperty(key, (String) headers.get(key));
			}
			connection.setUseCaches(false);
			if (checkAbort()) return; // not yet send out a byte
			if ("post".equalsIgnoreCase(method)) {
				DataOutputStream dos = new DataOutputStream(connection.getOutputStream());
				activeOS = dos;
				if (content != null) {
					dos.writeBytes(content);
				}
				if (checkAbort()) return; // do not flush anything and close the connection
				dos.flush();
				dos.close();
				activeOS = null;
			}
			if (checkAbort()) return; // just disconnect without receiving anything
			InputStream is = connection.getInputStream();
			activeIS = is;
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024];
			int read;
			while (!toAbort && (read = is.read(buffer)) != -1) {
				if (checkAbort()) return; // stop receiving anything
				if (readyState < 2) {
					readyState = 2;
					status = connection.getResponseCode();
					statusText = connection.getResponseMessage();
					if (onreadystatechange != null) {
						onreadystatechange.onSent();
					}
				}
				baos.write(buffer, 0, read);
				if (readyState != 3) {
					readyState = 3;
					if (onreadystatechange != null) {
						onreadystatechange.onReceiving();
					}
				}
			}
			if (checkAbort()) return; // stop receiving anything
			is.close();
			activeIS = null;
			responseText = baos.toString();
			readyState = 4;
			if (onreadystatechange != null) {
				onreadystatechange.onLoaded();
			}
			connection.disconnect();
			readyState = 0;
			/*
			if (onreadystatechange != null) {
				onreadystatechange.onUninitialized();
			}
			*/
		} catch (IOException e) {
			if (checkAbort()) return; // exception caused by abort action
			e.printStackTrace();
			readyState = 4;
			if (onreadystatechange != null) {
				onreadystatechange.onLoaded();
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
