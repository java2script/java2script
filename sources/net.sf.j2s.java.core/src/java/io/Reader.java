/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package java.io;

import java.nio.CharBuffer;
import java.util.Objects;

/**
 * Reader is an Abstract class for reading Character Streams. Subclasses of
 * Reader must implement the methods <code>read(char[], int, int)</code> and
 * <code>close()</code>.
 * 
 * @see Writer
 */
public abstract class Reader implements Readable, Closeable {

	private static final int TRANSFER_BUFFER_SIZE = 8192;

	/**
	 * The object used to synchronize access to the reader.
	 */
	protected Object lock;

	/**
	 * Constructs a new character stream Reader using <code>this</code> as the
	 * Object to synchronize critical regions around.
	 */
	protected Reader() {
		super();
		lock = this;
	}

	/**
	 * Constructs a new character stream Reader using <code>lock</code> as the
	 * Object to synchronize critical regions around.
	 * 
	 * @param lock
	 *            the <code>Object</code> to synchronize critical regions
	 *            around.
	 */
	protected Reader(Object lock) {
		if (lock != null)
			this.lock = "";// swingjs no real object here
		else
			throw new NullPointerException();
	}

	/**
	 * Close this Reader. This must be implemented by any concrete subclasses.
	 * The implementation should free any resources associated with the Reader.
	 * 
	 * @throws IOException
	 *             If an error occurs attempting to close this Reader.
	 */
	public abstract void close() throws IOException;

    /**
     * Reads all characters from this reader and writes the characters to the
     * given writer in the order that they are read. On return, this reader
     * will be at end of the stream. This method does not close either reader
     * or writer.
     * <p>
     * This method may block indefinitely reading from the reader, or
     * writing to the writer. The behavior for the case where the reader
     * and/or writer is <i>asynchronously closed</i>, or the thread
     * interrupted during the transfer, is highly reader and writer
     * specific, and therefore not specified.
     * <p>
     * If an I/O error occurs reading from the reader or writing to the
     * writer, then it may do so after some characters have been read or
     * written. Consequently the reader may not be at end of the stream and
     * one, or both, streams may be in an inconsistent state. It is strongly
     * recommended that both streams be promptly closed if an I/O error occurs.
     *
     * @param  out the writer, non-null
     * @return the number of characters transferred
     * @throws IOException if an I/O error occurs when reading or writing
     * @throws NullPointerException if {@code out} is {@code null}
     *
     * @since 10
     */
    public long transferTo(Writer out) throws IOException {
        Objects.requireNonNull(out, "out");
        long transferred = 0;
        char[] buffer = new char[TRANSFER_BUFFER_SIZE];
        int nRead;
        while ((nRead = read(buffer, 0, TRANSFER_BUFFER_SIZE)) >= 0) {
            out.write(buffer, 0, nRead);
            transferred += nRead;
        }
        return transferred;
    }

	/**
	 * Set a Mark position in this Reader. The parameter <code>readLimit</code>
	 * indicates how many characters can be read before a mark is invalidated.
	 * Sending reset() will reposition the reader back to the marked position
	 * provided <code>readLimit</code> has not been surpassed.
	 * <p>
	 * This default implementation simply throws IOException and concrete
	 * subclasses must provide their own implementations.
	 * 
	 * @param readLimit
	 *            an int representing how many characters must be read before
	 *            invalidating the mark.
	 * 
	 * @throws IOException
	 *             If an error occurs attempting mark this Reader.
	 */
	public void mark(int readLimit) throws IOException {
		throw new IOException();
	}

	/**
	 * Answers a boolean indicating whether or not this Reader supports mark()
	 * and reset(). This class a default implementation which answers false.
	 * 
	 * @return <code>true</code> if mark() and reset() are supported,
	 *         <code>false</code> otherwise. This implementation returns
	 *         <code>false</code>.
	 */
	public boolean markSupported() {
		return false;
	}

	/**
	 * Reads a single character from this reader and returns the result as an
	 * int. The 2 higher-order characters are set to 0. If the end of reader was
	 * encountered then return -1.
	 * 
	 * @return the character read or -1 if end of reader.
	 * 
	 * @throws IOException
	 *             If the Reader is already closed or some other IO error
	 *             occurs.
	 */
	public int read() throws IOException {
		synchronized (lock) {
			char charArray[] = new char[1];
			if (read(charArray, 0, 1) != -1)
				return charArray[0];
			return -1;
		}
	}

	/**
	 * Reads characters from this Reader and stores them in the character array
	 * <code>buf</code> starting at offset 0. Returns the number of characters
	 * actually read or -1 if the end of reader was encountered.
	 * 
	 * @param buf
	 *            character array to store the read characters
	 * @return how many characters were successfully read in or else -1 if the
	 *         end of the reader was detected.
	 * 
	 * @throws IOException
	 *             If the Reader is already closed or some other IO error
	 *             occurs.
	 */
	public int read(char buf[]) throws IOException {
		return read(buf, 0, buf.length);
	}

	/**
	 * Reads at most <code>count</code> characters from this Reader and stores
	 * them at <code>offset</code> in the character array <code>buf</code>.
	 * Returns the number of characters actually read or -1 if the end of reader
	 * was encountered.
	 * 
	 * @param buf
	 *            character array to store the read characters
	 * @param offset
	 *            offset in buf to store the read characters
	 * @param count
	 *            how many characters should be read in
	 * @return how many characters were successfully read in or else -1 if the
	 *         end of the reader was detected.
	 * 
	 * @throws IOException
	 *             If the Reader is already closed or some other IO error
	 *             occurs.
	 */
	public abstract int read(char buf[], int offset, int count)
			throws IOException;

	/**
	 * Answers a <code>boolean</code> indicating whether or not this Reader is
	 * ready to be read without blocking. If the result is <code>true</code>,
	 * the next <code>read()</code> will not block. If the result is
	 * <code>false</code> this Reader may or may not block when
	 * <code>read()</code> is sent.
	 * 
	 * @return <code>true</code> if the receiver will not block when
	 *         <code>read()</code> is called, <code>false</code> if unknown
	 *         or blocking will occur.
	 * 
	 * @throws IOException
	 *             If the Reader is already closed or some other IO error
	 *             occurs.
	 */
	public boolean ready() throws IOException {
		return false;
	}

	/**
	 * Reset this Readers position to the last <code>mark()</code> location.
	 * Invocations of <code>read()/skip()</code> will occur from this new
	 * location. If this Reader was not marked, the implementation of
	 * <code>reset()</code> is implementation specific. See the comment for
	 * the specific Reader subclass for implementation details. The default
	 * action is to throw <code>IOException</code>.
	 * 
	 * @throws IOException
	 *             If a problem occured or the receiver does not support
	 *             <code>mark()/reset()</code>.
	 */
	public void reset() throws IOException {
		throw new IOException();
	}

	/**
	 * Skips <code>count</code> number of characters in this Reader.
	 * Subsequent <code>read()</code>'s will not return these characters
	 * unless <code>reset()</code> is used. This method may perform multiple
	 * reads to read <code>count</code> characters.
	 * 
	 * @param count
	 *            how many characters should be passed over
	 * @return how many characters were successfully passed over
	 * 
	 * @throws IOException
	 *             If the Reader is closed when the call is made or if an IO
	 *             error occurs during the operation.
	 */
	public long skip(long count) throws IOException {
		if (count >= 0) {
			synchronized (lock) {
				long skipped = 0;
				int toRead = count < 512 ? (int) count : 512;
				char charsSkipped[] = new char[toRead];
				while (skipped < count) {
					int read = read(charsSkipped, 0, toRead);
					if (read == -1) {
						return skipped;
					}
					skipped += read;
					if (read < toRead) {
						return skipped;
					}
					if (count - skipped < toRead) {
						toRead = (int) (count - skipped);
					}
				}
				return skipped;
			}
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Read chars from the Reader and then put them to the <code>target</code>
	 * CharBuffer. Only put method is called on the <code>target</code>.
	 * 
	 * @param target
	 *            the destination CharBuffer
	 * @return the actual number of chars put to the <code>target</code>. -1
	 *         when the Reader has reached the end before the method is called.
	 * @throws IOException
	 *             if any I/O error raises in the procedure
	 * @throws NullPointerException
	 *             if the target CharBuffer is null
	 * @throws ReadOnlyBufferException
	 *             if the target CharBuffer is readonly
	 * 
	 */
	public int read(CharBuffer target) throws IOException {
		if (null == target) {
			throw new NullPointerException();
		}
		int length = target.length();
		char[] buf = new char[length];
		length = Math.min(length, read(buf));
		if (length > 0) {
			target.put(buf, 0, length);
		}
		return length;
	}
}
