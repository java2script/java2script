/*******************************************************************************
 * Copyright (c) 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.adaptor;

import java.io.*;

/**
 * Represents an <code>OutputStream</code> provided by FileManager
 * @see StreamManager#getOutputStream(String)
 * <p>
 * Clients may not extend this class.
 * </p>
 * @since 3.1
 */
public class StreamManagerOutputStream extends FilterOutputStream {
	private String target;
	private StreamManager manager;
	private File outputFile;
	private int state;
	private StreamManagerOutputStream[] streamSet = null;

	StreamManagerOutputStream(OutputStream out, StreamManager manager, String target, File outputFile, int state) {
		super(out);
		this.manager = manager;
		this.target = target;
		this.outputFile = outputFile;
		this.state = state;
	}

	/** 
	 * Instructs this output stream to be closed and file manager to 
	 * be updated as appropriate.
	 * 
	 * @see StreamManager#getOutputStream(String)
	 * @see StreamManager#getOutputStreamSet(String[])
	 */
	public void close() throws IOException {
		manager.closeOutputStream(this);
	}

	/**
	 * Instructs this output stream to be closed and the contents removed.
	 * @see StreamManager#getOutputStream(String)
	 * @see StreamManager#getOutputStreamSet(String[])
	 */
	public void abort() {
		manager.abortOutputStream(this);
	}

	OutputStream getOutputStream() {
		return out;
	}

	String getTarget() {
		return target;
	}

	File getOutputFile() {
		return outputFile;
	}

	int getState() {
		return state;
	}

	void setState(int state) {
		this.state = state;
	}

	void setStreamSet(StreamManagerOutputStream[] set) {
		streamSet = set;
	}

	StreamManagerOutputStream[] getStreamSet() {
		return streamSet;
	}
}
