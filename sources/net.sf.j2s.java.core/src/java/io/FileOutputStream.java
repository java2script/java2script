/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 * Copyright 1994-2007 Sun Microsystems, Inc.  All Rights Reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Sun designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Sun in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Sun Microsystems, Inc., 4150 Network Circle, Santa Clara,
 * CA 95054 USA or visit www.sun.com if you need additional information or
 * have any questions.
 */

package java.io;

import java.io.FileNotFoundException;
import java.io.IOException;

import javajs.util.OC;

/**
 * A file output stream is an output stream for writing data to a
 * <code>File</code> or to a <code>FileDescriptor</code>. Whether or not a file
 * is available or may be created depends upon the underlying platform. Some
 * platforms, in particular, allow a file to be opened for writing by only one
 * <tt>FileOutputStream</tt> (or other file-writing object) at a time. In such
 * situations the constructors in this class will fail if the file involved is
 * already open.
 *
 * <p>
 * <code>FileOutputStream</code> is meant for writing streams of raw bytes such
 * as image data. For writing streams of characters, consider using
 * <code>FileWriter</code>.
 *
 * @author Arthur van Hoff
 * @see java.io.File
 * @see java.io.FileDescriptor
 * @see java.io.FileInputStream
 * @since JDK1.0
 */
public class FileOutputStream extends OutputStream {
	// /**
	// * The system dependent file descriptor. The value is
	// * 1 more than actual file descriptor. This means that
	// * the default value 0 indicates that the file is not open.
	// */
	// private FileDescriptor fd;

	// private boolean append = false;
	//
	// private volatile boolean closed = false;

	private OC out;

	/**
	 * Creates an output file stream to write to the file with the specified
	 * name. A new <code>FileDescriptor</code> object is created to represent
	 * this file connection.
	 * <p>
	 * First, if there is a security manager, its <code>checkWrite</code> method
	 * is called with <code>name</code> as its argument.
	 * <p>
	 * If the file exists but is a directory rather than a regular file, does
	 * not exist but cannot be created, or cannot be opened for any other reason
	 * then a <code>FileNotFoundException</code> is thrown.
	 *
	 * @param name
	 *            the system-dependent filename
	 * @exception FileNotFoundException
	 *                if the file exists but is a directory rather than a
	 *                regular file, does not exist but cannot be created, or
	 *                cannot be opened for any other reason
	 * @exception SecurityException
	 *                if a security manager exists and its
	 *                <code>checkWrite</code> method denies write access to the
	 *                file.
	 * @see java.lang.SecurityManager#checkWrite(java.lang.String)
	 */
	public FileOutputStream(String name) throws FileNotFoundException {
		this(name != null ? new File(name) : null, false);
	}

	/**
	 * Creates an output file stream to write to the file with the specified
	 * <code>name</code>. If the second argument is <code>true</code>, then
	 * bytes will be written to the end of the file rather than the beginning. A
	 * new <code>FileDescriptor</code> object is created to represent this file
	 * connection.
	 * <p>
	 * First, if there is a security manager, its <code>checkWrite</code> method
	 * is called with <code>name</code> as its argument.
	 * <p>
	 * If the file exists but is a directory rather than a regular file, does
	 * not exist but cannot be created, or cannot be opened for any other reason
	 * then a <code>FileNotFoundException</code> is thrown.
	 *
	 * @param name
	 *            the system-dependent file name
	 * @param append
	 *            if <code>true</code>, then bytes will be written to the end of
	 *            the file rather than the beginning
	 * @exception FileNotFoundException
	 *                if the file exists but is a directory rather than a
	 *                regular file, does not exist but cannot be created, or
	 *                cannot be opened for any other reason.
	 * @exception SecurityException
	 *                if a security manager exists and its
	 *                <code>checkWrite</code> method denies write access to the
	 *                file.
	 * @see java.lang.SecurityManager#checkWrite(java.lang.String)
	 * @since JDK1.1
	 */
	public FileOutputStream(String name, boolean append) throws FileNotFoundException {
		this(name != null ? new File(name) : null, append);
	}

	/**
	 * Creates a file output stream to write to the file represented by the
	 * specified <code>File</code> object. A new <code>FileDescriptor</code>
	 * object is created to represent this file connection.
	 * <p>
	 * First, if there is a security manager, its <code>checkWrite</code> method
	 * is called with the path represented by the <code>file</code> argument as
	 * its argument.
	 * <p>
	 * If the file exists but is a directory rather than a regular file, does
	 * not exist but cannot be created, or cannot be opened for any other reason
	 * then a <code>FileNotFoundException</code> is thrown.
	 *
	 * @param file
	 *            the file to be opened for writing.
	 * @exception FileNotFoundException
	 *                if the file exists but is a directory rather than a
	 *                regular file, does not exist but cannot be created, or
	 *                cannot be opened for any other reason
	 * @exception SecurityException
	 *                if a security manager exists and its
	 *                <code>checkWrite</code> method denies write access to the
	 *                file.
	 * @see java.io.File#getPath()
	 * @see java.lang.SecurityException
	 * @see java.lang.SecurityManager#checkWrite(java.lang.String)
	 */
	public FileOutputStream(File file) throws FileNotFoundException {
		this(file, false);
	}

	/**
	 * Creates a file output stream to write to the file represented by the
	 * specified <code>File</code> object. If the second argument is
	 * <code>true</code>, then bytes will be written to the end of the file
	 * rather than the beginning. A new <code>FileDescriptor</code> object is
	 * created to represent this file connection.
	 * <p>
	 * First, if there is a security manager, its <code>checkWrite</code> method
	 * is called with the path represented by the <code>file</code> argument as
	 * its argument.
	 * <p>
	 * If the file exists but is a directory rather than a regular file, does
	 * not exist but cannot be created, or cannot be opened for any other reason
	 * then a <code>FileNotFoundException</code> is thrown.
	 *
	 * @param file
	 *            the file to be opened for writing.
	 * @param append
	 *            if <code>true</code>, then bytes will be written to the end of
	 *            the file rather than the beginning
	 * @exception FileNotFoundException
	 *                if the file exists but is a directory rather than a
	 *                regular file, does not exist but cannot be created, or
	 *                cannot be opened for any other reason
	 * @exception SecurityException
	 *                if a security manager exists and its
	 *                <code>checkWrite</code> method denies write access to the
	 *                file.
	 * @see java.io.File#getPath()
	 * @see java.lang.SecurityException
	 * @see java.lang.SecurityManager#checkWrite(java.lang.String)
	 * @since 1.4
	 * 
	 *        Swingjs: Utilizes javajs.util.OC simple output channel
	 * 
	 */
	public FileOutputStream(File file, boolean append) throws FileNotFoundException {
		String name = (file != null ? file.getPath() : null);
		if (name == null) {
			throw new NullPointerException();
		}
		// this.append = append;
		if (append) {
			openAppend(name);
		} else {
			open(name);
		}
	}

	/**
	 * Creates an output file stream to write to the specified file descriptor,
	 * which represents an existing connection to an actual file in the file
	 * system.
	 * <p>
	 * First, if there is a security manager, its <code>checkWrite</code> method
	 * is called with the file descriptor <code>fdObj</code> argument as its
	 * argument.
	 *
	 * @param fdObj
	 *            the file descriptor to be opened for writing
	 * @throws FileNotFoundException 
	 * @exception SecurityException
	 *                if a security manager exists and its
	 *                <code>checkWrite</code> method denies write access to the
	 *                file descriptor
	 * @see java.lang.SecurityManager#checkWrite(java.io.FileDescriptor)
	 */
	public FileOutputStream(FileDescriptor fdObj) throws FileNotFoundException {
		this(new File("output"), false);
	}

	/**
	 * Opens a file, with the specified name, for writing.
	 * 
	 * @param name
	 *            name of file to be opened
	 */
	private void open(String name) throws FileNotFoundException {
		out = new OC();
		out.setParams(null, name, false, null);
	}

	/**
	 * Opens a file, with the specified name, for appending.
	 * 
	 * @param name
	 *            name of file to be opened
	 */
	private void openAppend(String name) throws FileNotFoundException {
		System.out.println("FileOutputStream disabled -- no JSToolkit");
		// DISABLED TEMPORARITY
		// out = new OC();
		// byte[] bytes = JSToolkit.getFileAsBytes(name);
		// java.io.ByteArrayOutputStream os = new
		// java.io.ByteArrayOutputStream();
		// os.write(bytes, 0, bytes.length);
		// out.setParams(null, name, false, os);
	}

	/**
	 * Writes a sub array as a sequence of bytes.
	 * 
	 * @param b
	 *            the data to be written
	 * @param off
	 *            the start offset in the data
	 * @param len
	 *            the number of bytes that are written
	 * @exception IOException
	 *                If an I/O error has occurred.
	 */
	private void writeBytes(byte b[], int off, int len) throws IOException {
		out.write(b, off, len);
	}

	/**
	 * Writes the specified byte to this file output stream. Implements the
	 * <code>write</code> method of <code>OutputStream</code>.
	 *
	 * @param b
	 *            the byte to be written.
	 * @exception IOException
	 *                if an I/O error occurs.
	 */
	@Override
	public void write(int b) throws IOException {
		out.writeByteAsInt(b);
	}

	/**
	 * Writes <code>b.length</code> bytes from the specified byte array to this
	 * file output stream.
	 *
	 * @param b
	 *            the data.
	 * @exception IOException
	 *                if an I/O error occurs.
	 */
	public void write(byte b[]) throws IOException {
		writeBytes(b, 0, b.length);
	}

	/**
	 * Writes <code>len</code> bytes from the specified byte array starting at
	 * offset <code>off</code> to this file output stream.
	 *
	 * @param b
	 *            the data.
	 * @param off
	 *            the start offset in the data.
	 * @param len
	 *            the number of bytes to write.
	 * @exception IOException
	 *                if an I/O error occurs.
	 */
	@Override
	public void write(byte b[], int off, int len) throws IOException {
		writeBytes(b, off, len);
	}

	/**
	 * Closes this file output stream and releases any system resources
	 * associated with this stream. This file output stream may no longer be
	 * used for writing bytes.
	 *
	 * <p>
	 * If this stream has an associated channel then the channel is closed as
	 * well.
	 *
	 * @exception IOException
	 *                if an I/O error occurs.
	 *
	 * @revised 1.4
	 * @spec JSR-51
	 */
	@Override
	public void close() throws IOException {
		out.closeChannel();
	}
	// /**
	// * Returns the file descriptor associated with this stream.
	// *
	// * @return the <code>FileDescriptor</code> object that represents
	// * the connection to the file in the file system being used
	// * by this <code>FileOutputStream</code> object.
	// *
	// * @exception IOException if an I/O error occurs.
	// * @see java.io.FileDescriptor
	// */
	// public final FileDescriptor getFD() throws IOException {
	// if (fd != null) return fd;
	// throw new IOException();
	// }
	//
	// /**
	// * Returns the unique {@link java.nio.channels.FileChannel FileChannel}
	// * object associated with this file output stream. </p>
	// *
	// * <p> The initial {@link java.nio.channels.FileChannel#position()
	// * </code>position<code>} of the returned channel will be equal to the
	// * number of bytes written to the file so far unless this stream is in
	// * append mode, in which case it will be equal to the size of the file.
	// * Writing bytes to this stream will increment the channel's position
	// * accordingly. Changing the channel's position, either explicitly or by
	// * writing, will change this stream's file position.
	// *
	// * @return the file channel associated with this file output stream
	// *
	// * @since 1.4
	// * @spec JSR-51
	// */
	// public FileChannel getChannel() {
	// synchronized (this) {
	// if (channel == null) {
	// channel = FileChannelImpl.openWrite(fd, this, append);
	//
	// /*
	// * Increment fd's use count. Invoking the channel's close()
	// * method will result in decrementing the use count set for
	// * the channel.
	// */
	// fd.incrementAndGetUseCount();
	// }
	// return channel;
	// }
	// }

	/**
	 * Cleans up the connection to the file, and ensures that the
	 * <code>close</code> method of this file output stream is called when there
	 * are no more references to this stream.
	 *
	 * @exception IOException
	 *                if an I/O error occurs.
	 * @see java.io.FileInputStream#close()
	 */
	@Override
	protected void finalize() throws IOException {
		// if (fd != null) {
		// if (fd == fd.out || fd == fd.err) {
		// flush();
		// } else {
		//
		// /*
		// * Finalizer should not release the FileDescriptor if another
		// * stream is still using it. If the user directly invokes
		// * close() then the FileDescriptor is also released.
		// */
		//// runningFinalize.set(Boolean.TRUE);
		//// try {
		close();
		//// } finally {
		//// runningFinalize.set(Boolean.FALSE);
		//// }
		// }
		// }
	}

	// private void close0() throws IOException {
	// out.closeChannel();
	// }
	//

}
