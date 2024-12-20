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

import java.io.ByteArrayInputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PushbackInputStream;
import java.io.UnsupportedEncodingException;

import swingjs.JSUtil;

/**
 * Modified by Bob Hanson for compatibility with jzlib
 * 
 * This class implements an input stream filter for reading files in the ZIP
 * file format. Includes support for both compressed and uncompressed entries.
 * 
 * For SwingJS, we generally have a ByteArrayInputStream, which means there is no
 * issue about closing, and there is no need for a PushbackInputStream. We can 
 * dispense with any BufferedInputStream wrappers as well. 
 * 
 * In addition, we can use the ZipEntry to "randomly access" the zip stream and 
 * re-read entries without any contents searching. Just go to the position and unzip.
 * 
 * 
 * @author David Connelly
 */
public class ZipInputStream extends InflaterInputStream implements ZipConstants {
  private ZipEntry entry;
  private int flag;
  private CRC32 crc = new CRC32();
  private long remaining;
  private byte[] tmpbuf = new byte[512];

  private static final int STORED = ZipEntry.STORED;
  private static final int DEFLATED = ZipEntry.DEFLATED;

//  private boolean closed = false; ! SwingJS no - InflaterInputStream has this
  // this flag is set to true after EOF has reached for
  // one entry
  private boolean entryEOF = false;

  private String zc;
private boolean isPushback;

  /**
   * Check to make sure that this stream has not been closed
   * 
   * @throws IOException
   */
  private void ensureOpen() throws IOException {
    if (closed) {
      throw new IOException("Stream closed");
    }
  }

  /**
   * Creates a new ZIP input stream.
   * 
   * SwingJS - probably strips off any BufferedInputStreams and ends up with a
   * raw ByteArrayInputStream.
   * 
   * <p>
   * The UTF-8 {@link java.nio.charset.Charset charset} is used to decode the
   * entry names.
   * 
   * @param in
   *        the actual input stream
   */
  public ZipInputStream(InputStream in) {
    super(秘getByteStream(in, GET_BYTE_STREAM_FOR_ZIP), newInflater(), 512);
    isPushback = this.in instanceof PushbackInputStream;
    String charset = "UTF-8";
    //usesDefaultInflater = true;
	//    try {
	//      new String(byteTest, charset);
	//    } catch (UnsupportedEncodingException e) {
	//      throw new NullPointerException("charset is invalid");
	//    }
    this.zc = charset;
  }

  private static Inflater newInflater() {
    return (Inflater) new Inflater().init(0, true);
  }

//  private byte[] byteTest = new byte[] { 0x20 };

      /**
       * Creates a new ZIP input stream.
       *
       * @param in the actual input stream
       *
       * @param charset
       *        The {@linkplain java.nio.charset.Charset charset} to be
       *        used to decode the ZIP entry name (ignored if the
       *        <a href="package-summary.html#lang_encoding"> language
       *        encoding bit</a> of the ZIP entry's general purpose bit
       *        flag is set).
       *
       * @since 1.7
       */
      public ZipInputStream(InputStream in, String charset){
          super(秘getByteStream(in, GET_BYTE_STREAM_FOR_ZIP), new Inflater(), 512);
//          //usesDefaultInflater = true;
//          try {
//            new String(byteTest, charset);
//          } catch (UnsupportedEncodingException e) {
//            throw new NullPointerException("charset is invalid");
//          }
          if (!charset.equalsIgnoreCase("UTF-8"))
        	  JSUtil.notImplemented("ZipInputStream charset " + charset);
          charset = "UTF-8";
          this.zc = charset;
      }

	private void initEntry() {
		crc.reset();
		inflater = inf = newInflater();
		if (entry.method == STORED) {
			remaining = entry.size;
		}
		entryEOF = false;
	}

/**
   * Closes the current ZIP entry and positions the stream for reading the next
   * entry.
   * 
   * @exception ZipException
   *            if a ZIP file error has occurred
   * @exception IOException
   *            if an I/O error has occurred
   */
  public void closeEntry() throws IOException {
    ensureOpen();
    while (read(tmpbuf, 0, tmpbuf.length) != -1) {
      // ok
    }
    entryEOF = true;
  }

  /**
   * Returns 0 after EOF has reached for the current entry data, otherwise
   * always return 1.
   * <p>
   * Programs should not count on this method to return the actual number of
   * bytes that could be read without blocking.
   * 
   * @return 1 before EOF and 0 after EOF has reached for current entry.
   * @exception IOException
   *            if an I/O error occurs.
   * 
   */
  @Override
  public int available() throws IOException {
    ensureOpen();
    return (entryEOF ? 0 : 1);
  }

  /**
   * Reads from the current ZIP entry into an array of bytes. If
   * <code>len</code> is not zero, the method blocks until some input is
   * available; otherwise, no bytes are read and <code>0</code> is returned.
   * 
   * @param b
   *        the buffer into which the data is read
   * @param off
   *        the start offset in the destination array <code>b</code>
   * @param len
   *        the maximum number of bytes read
   * @return the actual number of bytes read, or -1 if the end of the entry is
   *         reached
   * @exception NullPointerException
   *            if <code>b</code> is <code>null</code>.
   * @exception IndexOutOfBoundsException
   *            if <code>off</code> is negative, <code>len</code> is negative,
   *            or <code>len</code> is greater than <code>b.length - off</code>
   * @exception ZipException
   *            if a ZIP file error has occurred
   * @exception IOException
   *            if an I/O error has occurred
   */
  @Override
  public int read(byte[] b, int off, int len) throws IOException {
    ensureOpen();
    if (off < 0 || len < 0 || off > b.length - len) {
      throw new IndexOutOfBoundsException();
    } else if (len == 0) {
      return 0;
    }

    if (entry == null) {
      return -1;
    }
    switch (entry.method) {
    case DEFLATED:
      len = readInf(b, off, len);
      if (len == -1) {
        readEnd(entry);
        entryEOF = true;
        entry = null;
      } else {
        crc.update(b, off, len);
      }
      return len;
    case STORED:
      if (remaining <= 0) {
        entryEOF = true;
        entry = null;
        return -1;
      }
      if (len > remaining) {
        len = (int) remaining;
      }
      len = in.read(b, off, len); 
      if (len == -1) {
        throw new ZipException("unexpected EOF");
      }
      crc.update(b, off, len);
      remaining -= len;
      if (remaining == 0 && entry.crc != crc.getValue()) {
        throw new ZipException("invalid entry CRC (expected 0x"
            + Long.toHexString(entry.crc) + " but got 0x"
            + Long.toHexString(crc.getValue()) + ")");
      }
      return len;
    default:
      throw new ZipException("invalid compression method");
    }
  }

  /**
   * Skips specified number of bytes in the current ZIP entry.
   * 
   * @param n
   *        the number of bytes to skip
   * @return the actual number of bytes skipped
   * @exception ZipException
   *            if a ZIP file error has occurred
   * @exception IOException
   *            if an I/O error has occurred
   * @exception IllegalArgumentException
   *            if n < 0
   */
  @Override
  public long skip(long n) throws IOException {
    if (n < 0) {
      throw new IllegalArgumentException("negative skip length");
    }
    ensureOpen();
    int max = (int) Math.min(n, Integer.MAX_VALUE);
    int total = 0;
    while (total < max) {
      int len = max - total;
      if (len > tmpbuf.length) {
        len = tmpbuf.length;
      }
      len = read(tmpbuf, 0, len);
      if (len == -1) {
        entryEOF = true;
        break;
      }
      total += len;
    }
    return total;
  }

  /**
   * Closes this input stream and releases any system resources associated with
   * the stream.
   * 
   * @exception IOException
   *            if an I/O error has occurred
   */
  @Override
  public void close() throws IOException {
    if (!closed) {
      super.close();
      closed = true;
    }
  }

  private byte[] b = new byte[256];

  /*
   * Reads local file (LOC) header for next entry.
   */
  private ZipEntry readLOC() throws IOException {
    try {
      readFully(tmpbuf, 0, LOCHDR);
    } catch (EOFException e) {
      return null;
    }
    if (get32(tmpbuf, 0) != LOCSIG) {
      return null;
    }
    // get flag first, we need check EFS.
    flag = get16(tmpbuf, LOCFLG);
    // get the entry name and create the ZipEntry first
    int len = get16(tmpbuf, LOCNAM);
    int blen = b.length;
    if (len > blen) {
      do
        blen = blen * 2;
      while (len > blen);
      b = new byte[blen];
    }
    readFully(b, 0, len);
    // Force to use UTF-8 if the EFS bit is ON, even the cs is NOT UTF-8
    ZipEntry e = createZipEntry(((flag & ZipConstants64.EFS) != 0) ? toStringUTF8(
        b, len)
        : toStringb2(b, len));
    // now get the remaining fields for the entry
    if ((flag & 1) == 1) {
      throw new ZipException("encrypted ZIP entry not supported");
    }
    e.method = get16(tmpbuf, LOCHOW);
    e.time = get32(tmpbuf, LOCTIM);
	boolean readSizes = ((flag & 8) != 8 || e.getMethod() != DEFLATED);
	// flag 8 means size is unknown at compression time
		// leave crc and sizes -1
		/* "Data Descriptor" present */
	// still read the 0 if  (e.getMethod() == DEFLATED)
			// DO NOT throw new ZipException
			//System.out.println("ZipInputStream: only DEFLATED entries can have EXT descriptor?? - " + e.getName());
	if (readSizes) {
		e.setCrc(get32(tmpbuf, LOCCRC));
		e.setCompressedSize(get32(tmpbuf, LOCSIZ));
		e.setSize(get32(tmpbuf, LOCLEN));
	}
//    if ((flag & 8) == 8) {
	// oops - don't set 0!
//      /* "Data Descriptor" present */
//      if (e.method != DEFLATED) {
//        throw new ZipException("only DEFLATED entries can have EXT descriptor");
//      }
//    } else {
//      e.crc = get32(tmpbuf, LOCCRC);
//      e.csize = get32(tmpbuf, LOCSIZ);
//      e.size = get32(tmpbuf, LOCLEN);
//    }
    len = get16(tmpbuf, LOCEXT);
    byte[] bb = new byte[len + 4];
    if (len > 0) {
      bb = new byte[len + 4];
      readFully(bb, 0, len);
      e.setExtra(bb);
      // extra fields are in "HeaderID(2)DataSize(2)Data... format
      if (e.csize == ZipConstants64.ZIP64_MAGICVAL
          || e.size == ZipConstants64.ZIP64_MAGICVAL) {
        int off = 0;
        while (off + 4 < len) {
          int sz = get16(bb, off + 2);
          if (get16(bb, off) == ZipConstants64.ZIP64_EXTID) {
            off += 4;
            // LOC extra zip64 entry MUST include BOTH original and
            // compressed file size fields
            if (sz < 16 || (off + sz) > len) {
              // Invalid zip64 extra fields, simply skip. Even it's
              // rare, it's possible the entry size happens to be
              // the magic value and it "accidnetly" has some bytes
              // in extra match the id.
              return e;
            }
            e.size = get64(bb, off);
            e.csize = get64(bb, off + 8);
            break;
          }
          off += (sz + 4);
        }
      }
    }
    return e;
  }

  private String toStringUTF8(byte[] b2, int len) {
    try {
      return new String(b2, 0, len, zc);
    } catch (UnsupportedEncodingException e) {
      return toStringb2(b2, len);
    }
  }

  private String toStringb2(byte[] b2, int len) {
    return new String(b2, 0, len);
  }

  /**
   * Creates a new <code>ZipEntry</code> object for the specified entry name.
   * 
   * @param name
   *        the ZIP file entry name
   * @return the ZipEntry just created
   */
  protected ZipEntry createZipEntry(String name) {
    return new ZipEntry(name);
  }

  /*
   * Reads end of deflated entry as well as EXT descriptor if present.
   */
  private void readEnd(ZipEntry e) throws IOException {
    int n = inf.getAvailIn();
    if (n > 0) {
      unread(buf, len, n);
      this.eof = false;
    }
    if ((flag & 8) == 8) {
      /* "Data Descriptor" present */
      if (inf.getTotalOutL() > ZipConstants64.ZIP64_MAGICVAL
          || inf.getTotalInL() > ZipConstants64.ZIP64_MAGICVAL) {
        // ZIP64 format
        readFully(tmpbuf, 0, ZipConstants64.ZIP64_EXTHDR);
        long sig = get32(tmpbuf, 0);
        if (sig != EXTSIG) { // no EXTSIG present
          e.crc = sig;
          e.csize = get64(tmpbuf, ZipConstants64.ZIP64_EXTSIZ
              - ZipConstants64.ZIP64_EXTCRC);
          e.size = get64(tmpbuf, ZipConstants64.ZIP64_EXTLEN
              - ZipConstants64.ZIP64_EXTCRC);
          unread(tmpbuf, ZipConstants64.ZIP64_EXTHDR - 1, ZipConstants64.ZIP64_EXTCRC);
        } else {
          e.crc = get32(tmpbuf, ZipConstants64.ZIP64_EXTCRC);
          e.csize = get64(tmpbuf, ZipConstants64.ZIP64_EXTSIZ);
          e.size = get64(tmpbuf, ZipConstants64.ZIP64_EXTLEN);
        }
      } else {
        readFully(tmpbuf, 0, EXTHDR);
        long sig = get32(tmpbuf, 0);
        if (sig != EXTSIG) { // no EXTSIG present
          e.crc = sig;
          e.csize = get32(tmpbuf, EXTSIZ - EXTCRC);
          e.size = get32(tmpbuf, EXTLEN - EXTCRC);
          unread(tmpbuf, EXTHDR - 1, EXTCRC);
        } else {
          e.crc = get32(tmpbuf, EXTCRC);
          e.csize = get32(tmpbuf, EXTSIZ);
          e.size = get32(tmpbuf, EXTLEN);
        }
      }
    }
    if (e.size != inf.getTotalOutL()) {
      throw new ZipException("invalid entry size (expected " + e.size
          + " but got " + inf.getTotalOutL() + " bytes)");
    }
    if (e.csize != inf.getTotalInL()) {
      throw new ZipException("invalid entry compressed size (expected "
          + e.csize + " but got " + inf.getTotalInL() + " bytes)");
    }
    if (e.crc != crc.getValue()) {
      throw new ZipException("invalid entry CRC (expected 0x"
          + Long.toHexString(e.crc) + " but got 0x"
          + Long.toHexString(crc.getValue()) + ")");
    }
  }

  private void unread(byte[] b, int len, int n) throws IOException {
	  if (isPushback) {
		  ((PushbackInputStream) in).unread(b, len - n, n);
	  } else {
		  ((ByteArrayInputStream) in).pos -= n;
	  }
  }

/*
   * Reads bytes, blocking until all bytes are read.
   */
  private void readFully(byte[] b, int off, int len) throws IOException {
    while (len > 0) {
      int n = in.read(b, off, len);
      if (n == -1) {
        throw new EOFException();
      }
      off += n;
      len -= n;
    }
  }

  /*
   * Fetches unsigned 16-bit value from byte array at specified offset.
   * The bytes are assumed to be in Intel (little-endian) byte order.
   */
  private static final int get16(byte b[], int off) {
    return (b[off] & 0xff) | ((b[off + 1] & 0xff) << 8);
  }

  /*
   * Fetches unsigned 32-bit value from byte array at specified offset.
   * The bytes are assumed to be in Intel (little-endian) byte order.
   */
  private static final long get32(byte b[], int off) {
    return (get16(b, off) | ((long) get16(b, off + 2) << 16)) & 0xffffffffL;
  }

  /*
   * Fetches signed 64-bit value from byte array at specified offset.
   * The bytes are assumed to be in Intel (little-endian) byte order.
   */
  private static final long get64(byte b[], int off) {
    return get32(b, off) | (get32(b, off + 4) << 32);
  }
  
	/**
	 * SwingJS addition
	 * 
	 * Reads the next ZIP file entry and positions the stream at the beginning of
	 * the entry data.
	 * 
	 * @return the next ZIP file entry, or null if there are no more entries
	 * @exception ZipException if a ZIP file error has occurred
	 * @exception IOException  if an I/O error has occurred
	 */
	public ZipEntry getNextEntry() throws IOException {
		ensureOpen();
		if (entry != null) {
			closeEntry();
		}
		if ((entry = readLOC()) == null) {
			return null;
		}
		initEntry();
		if (!entry.isDirectory()) {
			entry.秘source = in;
			entry.秘entryOffset = 秘getEntryOffset(entry);
		}
		return entry;
	}

	/**
	 * SwingJS addition: 
	 * 
	 * 
	 * This is based on using only BufferedInputStreams and ByteArrayInputStreams as
	 * fodder for ZipInputStream. This is typically the case. Maybe always.
	 * 
	 * @param entry
	 * @return
	 */
	private int 秘getEntryOffset(ZipEntry entry) {
		if (!isPushback) {
			//System.out.println("ZISB " + entry.name + " " + ((ByteArrayInputStream) in).pos);
			return ((ByteArrayInputStream) in).pos;
		}
		PushbackInputStream pis = (PushbackInputStream) in;
		if (!(pis.in instanceof ByteArrayInputStream)) {
			return -1;
		}
//		System.out.println("ZIS " + entry.name + " " + ((ByteArrayInputStream) pis.in).pos + "-"
//				+ (pis.buf.length - pis.pos) + " avail=" + this.inflater.avail_in);
		return ((ByteArrayInputStream) pis.in).pos - (pis.buf.length - pis.pos);
	}

	/**
	 * Set the stream to the specified entry, if possible -- that is, if the underlying input stream
	 * some set of BufferedInputStreams and a FileInputStream or a ByteArrayInputStream. 
	 * 
	 * @param entry
	 * @return the size of the entry, or -1 if this was not possible
	 */
	public long setEntry(ZipEntry entry) {
		if (isPushback)
			return -1;
		this.closed = false;
		this.entry = entry;
		initEntry();
		((ByteArrayInputStream) in).pos = entry.秘entryOffset;
		return entry.getSize();
	}

	/**
	 * Java 9
	 * 
	 * @return
	 * @throws IOException
	 */
	@Override
	public byte[] readAllBytes() throws IOException {
		if (entry == null) {
			return new byte[0];
		}
		byte[] b = new byte[(int) entry.size];
		read(b, 0, b.length);
		return b;
	}
	
	/**
	 * Java 9
	 * 
	 * @param out
	 * @return
	 * @throws IOException
	 */
	@Override
	public long transferTo(OutputStream out)
          throws IOException {
		byte[] b = readAllBytes();
		out.write(b);
		return b.length;
	}
	

}
