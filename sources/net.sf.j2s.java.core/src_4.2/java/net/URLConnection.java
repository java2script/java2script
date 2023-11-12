/*
 * %W% %E%
 *
 * Copyright (c) 2006, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

// minimal support -- Bob Hanson 
// source: http://javasourcecode.org/html/open-source/jdk/jdk-6u23/java/net/URLConnection.java.html
package java.net;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javajs.util.Lst;

/**
 * The abstract class <code>URLConnection</code> is the superclass of all
 * classes that represent a communications link between the application and a
 * URL. Instances of this class can be used both to read from and to write to
 * the resource referenced by the URL. In general, creating a connection to a
 * URL is a multistep process:
 * <p>
 * <center>
 * <table border=2 summary="Describes the process of creating a connection to a URL: openConnection() and connect() over time.">
 * <tr>
 * <th><code>openConnection()</code></th>
 * <th><code>connect()</code></th>
 * </tr>
 * <tr>
 * <td>Manipulate parameters that affect the connection to the remote resource.</td>
 * <td>Interact with the resource; query header fields and contents.</td>
 * </tr>
 * </table>
 * ----------------------------&gt; <br>
 * time</center>
 * 
 * <ol>
 * <li>The connection object is created by invoking the
 * <code>openConnection</code> method on a URL.
 * <li>The setup parameters and general request properties are manipulated.
 * <li>The actual connection to the remote object is made, using the
 * <code>connect</code> method.
 * <li>The remote object becomes available. The header fields and the contents
 * of the remote object can be accessed.
 * </ol>
 * <p>
 * The setup parameters are modified using the following methods:
 * <ul>
 * <li><code>setAllowUserInteraction</code>
 * <li><code>setDoInput</code>
 * <li><code>setDoOutput</code>
 * <li><code>setIfModifiedSince</code>
 * <li><code>setUseCaches</code>
 * </ul>
 * <p>
 * and the general request properties are modified using the method:
 * <ul>
 * <li><code>setRequestProperty</code>
 * </ul>
 * <p>
 * Default values for the <code>AllowUserInteraction</code> and
 * <code>UseCaches</code> parameters can be set using the methods
 * <code>setDefaultAllowUserInteraction</code> and
 * <code>setDefaultUseCaches</code>.
 * <p>
 * Each of the above <code>set</code> methods has a corresponding
 * <code>get</code> method to retrieve the value of the parameter or general
 * request property. The specific parameters and general request properties that
 * are applicable are protocol specific.
 * <p>
 * The following methods are used to access the header fields and the contents
 * after the connection is made to the remote object:
 * <ul>
 * <li><code>getContent</code>
 * <li><code>getHeaderField</code>
 * <li><code>getInputStream</code>
 * <li><code>getOutputStream</code>
 * </ul>
 * <p>
 * Certain header fields are accessed frequently. The methods:
 * <ul>
 * <li><code>getContentEncoding</code>
 * <li><code>getContentLength</code>
 * <li><code>getContentType</code>
 * <li><code>getDate</code>
 * <li><code>getExpiration</code>
 * <li><code>getLastModifed</code>
 * </ul>
 * <p>
 * provide convenient access to these fields. The <code>getContentType</code>
 * method is used by the <code>getContent</code> method to determine the type of
 * the remote object; subclasses may find it convenient to override the
 * <code>getContentType</code> method.
 * <p>
 * In the common case, all of the pre-connection parameters and general request
 * properties can be ignored: the pre-connection parameters and request
 * properties default to sensible values. For most clients of this interface,
 * there are only two interesting methods: <code>getInputStream</code> and
 * <code>getContent</code>, which are mirrored in the <code>URL</code> class by
 * convenience methods.
 * <p>
 * More information on the request properties and header fields of an
 * <code>http</code> connection can be found at: <blockquote>
 * 
 * <pre>
 * <a href="http://www.ietf.org/rfc/rfc2068.txt">http://www.ietf.org/rfc/rfc2068.txt</a>
 * </pre>
 * 
 * </blockquote>
 * 
 * Note about <code>fileNameMap</code>: In versions prior to JDK 1.1.6, field
 * <code>fileNameMap</code> of <code>URLConnection</code> was public. In JDK
 * 1.1.6 and later, <code>fileNameMap</code> is private; accessor and mutator
 * methods {link #getFileNameMap() getFileNameMap} and
 * {link #setFileNameMap(java.net.FileNameMap) setFileNameMap} are added to
 * access it. This change is also described on the <a href=
 * "http://java.sun.com/products/jdk/1.2/compatibility.html"> Compatibility</a>
 * page.
 * 
 * Invoking the <tt>close()</tt> methods on the <tt>InputStream</tt> or
 * <tt>OutputStream</tt> of an <tt>URLConnection</tt> after a request may free
 * network resources associated with this instance, unless particular protocol
 * specifications specify different behaviours for it.
 * 
 * @author James Gosling
 * @version %I%, %G%
 * @see java.net.URL#openConnection()
 * @see java.net.URLConnection#connect()
 * see java.net.URLConnection#getContent()
 * see java.net.URLConnection#getContentEncoding()
 * see java.net.URLConnection#getContentLength()
 * see java.net.URLConnection#getContentType()
 * see java.net.URLConnection#getDate()
 * see java.net.URLConnection#getExpiration()
 * see java.net.URLConnection#getHeaderField(int)
 * see java.net.URLConnection#getHeaderField(java.lang.String)
 * @see java.net.URLConnection#getInputStream()
 * see java.net.URLConnection#getLastModified()
 * @see java.net.URLConnection#getOutputStream()
 * see java.net.URLConnection#setAllowUserInteraction(boolean)
 * see java.net.URLConnection#setDefaultUseCaches(boolean)
 * @see java.net.URLConnection#setDoInput(boolean)
 * @see java.net.URLConnection#setDoOutput(boolean)
 * see java.net.URLConnection#setIfModifiedSince(long)
 * @see java.net.URLConnection#setRequestProperty(java.lang.String,
 *      java.lang.String)
 * see java.net.URLConnection#setUseCaches(boolean)
 * @since JDK1.0
 */
public abstract class URLConnection {

	/**
	 * The URL represents the remote object on the World Wide Web to which this
	 * connection is opened.
	 * <p>
	 * The value of this field can be accessed by the <code>getURL</code> method.
	 * <p>
	 * The default value of this variable is the value of the URL argument in the
	 * <code>URLConnection</code> constructor.
	 * 
	 * @see java.net.URLConnection#getURL()
	 * @see java.net.URLConnection#url
	 */
	protected URL url;

	/**
	 * This variable is set by the <code>setDoInput</code> method. Its value is
	 * returned by the <code>getDoInput</code> method.
	 * <p>
	 * A URL connection can be used for input and/or output. Setting the
	 * <code>doInput</code> flag to <code>true</code> indicates that the
	 * application intends to read data from the URL connection.
	 * <p>
	 * The default value of this field is <code>true</code>.
	 * 
	 * @see java.net.URLConnection#getDoInput()
	 * @see java.net.URLConnection#setDoInput(boolean)
	 */
	protected boolean doInput = true;

	/**
	 * Sets the value of the <code>doInput</code> field for this
	 * <code>URLConnection</code> to the specified value.
	 * <p>
	 * A URL connection can be used for input and/or output. Set the DoInput flag
	 * to true if you intend to use the URL connection for input, false if not.
	 * The default is true.
	 * 
	 * @param doinput
	 *          the new value.
	 * @throws IllegalStateException
	 *           if already connected
	 * @see java.net.URLConnection#doInput
	 * @see #getDoInput()
	 */
	public void setDoInput(boolean doinput) {
		if (connected)
			throw new IllegalStateException("Already connected");
		doInput = doinput;
	}

	/**
	 * Returns the value of this <code>URLConnection</code>'s <code>doInput</code>
	 * flag.
	 * 
	 * @return the value of this <code>URLConnection</code>'s <code>doInput</code>
	 *         flag.
	 * @see #setDoInput(boolean)
	 */
	public boolean getDoInput() {
		return doInput;
	}

	/**
	 * This variable is set by the <code>setDoOutput</code> method. Its value is
	 * returned by the <code>getDoOutput</code> method.
	 * <p>
	 * A URL connection can be used for input and/or output. Setting the
	 * <code>doOutput</code> flag to <code>true</code> indicates that the
	 * application intends to write data to the URL connection.
	 * <p>
	 * The default value of this field is <code>false</code>.
	 * 
	 * @see java.net.URLConnection#getDoOutput()
	 * @see java.net.URLConnection#setDoOutput(boolean)
	 */
	protected boolean doOutput = false;

	/**
	 * Sets the value of the <code>doOutput</code> field for this
	 * <code>URLConnection</code> to the specified value.
	 * <p>
	 * A URL connection can be used for input and/or output. Set the DoOutput flag
	 * to true if you intend to use the URL connection for output, false if not.
	 * The default is false.
	 * 
	 * @param dooutput
	 *          the new value.
	 * @throws IllegalStateException
	 *           if already connected
	 * @see #getDoOutput()
	 */
	public void setDoOutput(boolean dooutput) {
		if (connected)
			throw new IllegalStateException("Already connected");
		doOutput = dooutput;
	}

	/**
	 * Returns the value of this <code>URLConnection</code>'s
	 * <code>doOutput</code> flag.
	 * 
	 * @return the value of this <code>URLConnection</code>'s
	 *         <code>doOutput</code> flag.
	 * @see #setDoOutput(boolean)
	 */
	public boolean getDoOutput() {
		return doOutput;
	}

	/**
	 * If <code>false</code>, this connection object has not created a
	 * communications link to the specified URL. If <code>true</code>, the
	 * communications link has been established.
	 */
	protected boolean connected = false;

	protected Lst<String[]> requests;

	/**
	 * Opens a communications link to the resource referenced by this URL, if such
	 * a connection has not already been established.
	 * <p>
	 * If the <code>connect</code> method is called when the connection has
	 * already been opened (indicated by the <code>connected</code> field having
	 * the value <code>true</code>), the call is ignored.
	 * <p>
	 * URLConnection objects go through two phases: first they are created, then
	 * they are connected. After being created, and before being connected,
	 * various options can be specified (e.g., doInput and UseCaches). After
	 * connecting, it is an error to try to set them. Operations that depend on
	 * being connected, like getContentLength, will implicitly perform the
	 * connection, if necessary.
	 * 
	 * @throws SocketTimeoutException
	 *           if the timeout expires before the connection can be established
	 * @exception IOException
	 *              if an I/O error occurs while opening the connection.
	 * @see java.net.URLConnection#connected
	 * see #getConnectTimeout()
	 * see #setConnectTimeout(int)
	 */
	abstract public void connect() throws IOException;

	/**
	 * Constructs a URL connection to the specified URL. A connection to the
	 * object referenced by the URL is not created.
	 * 
	 * @param url
	 *          the specified URL.
	 */
	protected URLConnection(URL url) {
		this.url = url;
	}

	/**
	 * Returns the value of this <code>URLConnection</code>'s <code>URL</code>
	 * field.
	 * 
	 * @return the value of this <code>URLConnection</code>'s <code>URL</code>
	 *         field.
	 * @see java.net.URLConnection#url
	 */
	public URL getURL() {
		return url;
	}

	/**
	 * Returns an input stream that reads from this open connection.
	 * 
	 * A SocketTimeoutException can be thrown when reading from the returned input
	 * stream if the read timeout expires before data is available for read.
	 * 
	 * @return an input stream that reads from this open connection.
	 * @exception IOException
	 *              if an I/O error occurs while creating the input stream.
	 * @exception UnknownServiceException
	 *              if the protocol does not support input.
	 * see #setReadTimeout(int)
	 * see #getReadTimeout()
	 */
	public InputStream getInputStream() throws IOException {
		throw new UnknownServiceException("protocol doesn't support input");
	}

	/**
	 * Returns an output stream that writes to this connection.
	 * 
	 * @return an output stream that writes to this connection.
	 * @exception IOException
	 *              if an I/O error occurs while creating the output stream.
	 * @exception UnknownServiceException
	 *              if the protocol does not support output.
	 */
	public OutputStream getOutputStream() throws IOException {
		throw new UnknownServiceException("protocol doesn't support output");
	}

	/**
	 * Sets the general request property. If a property with the key already
	 * exists, overwrite its value with the new value.
	 * 
	 * <p>
	 * NOTE: HTTP requires all request properties which can legally have multiple
	 * instances with the same key to use a comma-seperated list syntax which
	 * enables multiple properties to be appended into a single property.
	 * 
	 * @param key
	 *          the keyword by which the request is known (e.g., "
	 *          <code>accept</code>").
	 * @param value
	 *          the value associated with it.
	 * @throws IllegalStateException
	 *           if already connected
	 * @throws NullPointerException
	 *           if key is <CODE>null</CODE>
	 * see #getRequestProperty(java.lang.String)
	 */
	public void setRequestProperty(String key, String value) {
		if (connected)
			throw new IllegalStateException("Already connected");
		if (key == null)
			throw new NullPointerException("key is null");
		if (requests == null)
			requests = new Lst<String[]>();
		for (int i = requests.size(); --i >= 0;)
			if (requests.get(i)[0].equals(key)) {
				requests.get(i)[1] = value;
				return;
			}
		requests.addLast(new String[] { key, value });
	}

}
