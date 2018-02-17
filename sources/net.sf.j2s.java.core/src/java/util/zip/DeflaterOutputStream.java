/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1996, 2009, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
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
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package java.util.zip;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

/**
 * This class implements an output stream filter for compressing data in
 * the "deflate" compression format. It is also used as the basis for other
 * types of compression filters, such as GZIPOutputStream.
 *
 * @see         Deflater
 * @author      David Connelly
 */
public
class DeflaterOutputStream extends swingjs.jzlib.DeflaterOutputStream {

  public DeflaterOutputStream() {
		super(null);
  }

  /**
   * Creates a new output stream with the specified compressor,
   * buffer size and flush mode.

   * @param out the output stream
   * @param def the compressor ("deflater")
   * @param size the output buffer size
   * @param syncFlush
   *        if {@code true} the {@link #flush()} method of this
   *        instance flushes the compressor with flush mode
   *        {@link Deflater#SYNC_FLUSH} before flushing the output
   *        stream, otherwise only flushes the output stream
   *
   * @throws IllegalArgumentException if size is <= 0
   *
   * @since 1.7
   */
  public DeflaterOutputStream(OutputStream out,
                              Deflater def,
                              int size,
                              boolean syncFlush) {
      super(out, def, size, syncFlush);
  }


  /**
   * Creates a new output stream with the specified compressor and
   * buffer size.
   *
   * <p>The new output stream instance is created as if by invoking
   * the 4-argument constructor DeflaterOutputStream(out, def, size, false).
   *
   * @param out the output stream
   * @param def the compressor ("deflater")
   * @param size the output buffer size
   * @exception IllegalArgumentException if size is <= 0
   */
  public DeflaterOutputStream(OutputStream out, Deflater def, int size) {
      this(out, def, size, false);
  }

  /**
   * Creates a new output stream with the specified compressor, flush
   * mode and a default buffer size.
   *
   * @param out the output stream
   * @param def the compressor ("deflater")
   * @param syncFlush
   *        if {@code true} the {@link #flush()} method of this
   *        instance flushes the compressor with flush mode
   *        {@link Deflater#SYNC_FLUSH} before flushing the output
   *        stream, otherwise only flushes the output stream
   *
   * @since 1.7
   */
  public DeflaterOutputStream(OutputStream out,
                              Deflater def,
                              boolean syncFlush) {
      this(out, def, 512, syncFlush);
  }


  /**
   * Creates a new output stream with the specified compressor and
   * a default buffer size.
   *
   * <p>The new output stream instance is created as if by invoking
   * the 3-argument constructor DeflaterOutputStream(out, def, false).
   *
   * @param out the output stream
   * @param def the compressor ("deflater")
   */
  public DeflaterOutputStream(OutputStream out, Deflater def) {
      this(out, def, 512, false);
  }

  boolean usesDefaultDeflater = false;


  /**
   * Creates a new output stream with a default compressor, a default
   * buffer size and the specified flush mode.
   *
   * @param out the output stream
   * @param syncFlush
   *        if {@code true} the {@link #flush()} method of this
   *        instance flushes the compressor with flush mode
   *        {@link Deflater#SYNC_FLUSH} before flushing the output
   *        stream, otherwise only flushes the output stream
   *
   * @since 1.7
   */
  public DeflaterOutputStream(OutputStream out, boolean syncFlush) {
	  super(out);
	   jzSetDOS(out, deflater, 0, true);
	  jzSetDOS(out, deflater, 0, true);
      usesDefaultDeflater = true;
  }

  /**
   * Creates a new output stream with a default compressor and buffer size.
   *
   * <p>The new output stream instance is created as if by invoking
   * the 2-argument constructor DeflaterOutputStream(out, false).
   *
   * @param out the output stream
   */
  public DeflaterOutputStream(OutputStream out) {
      this(out, false);
      usesDefaultDeflater = true;
  }


  public DeflaterOutputStream(ByteArrayOutputStream bos, Deflater deflater) {
	super(bos);
    setDOS(bos, deflater);
  }

  protected void setDOS(OutputStream out, Deflater deflater) {
    jzSetDOS(out, deflater, 0, true);
  }
}
