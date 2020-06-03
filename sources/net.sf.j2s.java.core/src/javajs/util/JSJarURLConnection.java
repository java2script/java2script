package javajs.util;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.JarURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.function.Function;
import java.util.jar.JarEntry;
import java.util.jar.JarException;
import java.util.jar.JarFile;
import java.util.jar.Manifest;

import swingjs.JSUtil;

public class JSJarURLConnection extends JarURLConnection {

	boolean connected;

	protected JSJarURLConnection(URL url) throws MalformedURLException {
		super(url);
	}

	@Override
	public JarFile getJarFile() throws IOException {
		JSUtil.notImplemented("JSJarURLConnection does not (yet) implement getJarFile()");
		return null; 
	}

	@Override
	public void connect() throws IOException {
		if (url._streamData != null)
			return;
		BufferedInputStream bis = (BufferedInputStream) getJarFileURL().openStream();
		byte[] bytes = ZipTools.getZipFileContentsAsBytes(bis, new String[] { getEntryName() }, 0);
		if (bytes == null)
			throw new JarException("Jar entry " + getEntryName() + " was not found in " + getJarFileURL());
		url._streamData = bytes;
		return;
	}
	@Override
	public InputStream getInputStream() {
		if (!connected && url._streamData == null)
			try {
				connect();
			} catch (IOException e) {
				return null;
			}
		return new ByteArrayInputStream((byte[]) url._streamData);
	}

    public Manifest getManifest() throws IOException {
    	JSUtil.notImplemented(null);
    	return null;
    }

    /**
     * Return the JAR entry object for this connection, if any. This
     * method returns null if the JAR file URL corresponding to this
     * connection points to a JAR file and not a JAR file entry.
     *
     * @return the JAR entry object for this connection, or null if
     * the JAR URL for this connection points to a JAR file.
     *
     * @exception IOException if getting the JAR file for this
     * connection causes an IOException to be thrown.
     *
     * @see #getJarFile
     * @see #getJarEntry
     */
    public JarEntry getJarEntry() throws IOException {
    	JSUtil.notImplemented(null);
    	return null;
    }

	@Override
	public void getBytesAsync(Function<byte[], Void> whenDone) {
		try {
			whenDone.apply(getInputStream().readAllBytes());
		} catch (IOException e) {
			whenDone.apply(null);
		}
	}

}
