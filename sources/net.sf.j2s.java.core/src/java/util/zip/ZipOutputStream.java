/*
 * Copyright (c) 1996, 2010, Oracle and/or its affiliates. All rights reserved.
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

import java.io.OutputStream;
import java.io.IOException;
//import java.io.UnsupportedEncodingException;
import java.util.Hashtable;
import java.util.Map;

import javajs.util.Lst;

import com.jcraft.jzlib.ZStream;

/**
 * modified by Bob Hanson for compatibility with jzlib
 * 
 * This class implements an output stream filter for writing files in the ZIP
 * file format. Includes support for both compressed and uncompressed entries.
 * 
 * @author David Connelly
 */
public class ZipOutputStream extends DeflaterOutputStream implements
    ZipConstants {
  private ZipEntry current;
  private Lst<ZipEntry> xentries = new Lst<ZipEntry>();
  private Map<String, Boolean> names = new Hashtable<String, Boolean>();
  private CRC32 crc = new CRC32();
  private long written = 0;
  private long locoff = 0;
  private byte[] comment;
  private int method = DEFLATED;
  private boolean finished;

  private boolean closed = false;

  private static int version(ZipEntry e) throws ZipException {
    switch (e.method) {
    case DEFLATED:
      return 20;
    case STORED:
      return 10;
    default:
      throw new ZipException("unsupported compression method");
    }
  }

  /**
   * Checks to make sure that this stream has not been closed.
   * 
   * @throws IOException
   */
  private void ensureOpen() throws IOException {
    if (closed) {
      throw new IOException("Stream closed");
    }
  }

  /**
   * Compression method for uncompressed (STORED) entries.
   */
  public static final int STORED = ZipEntry.STORED;

  /**
   * Compression method for compressed (DEFLATED) entries.
   */
  public static final int DEFLATED = ZipEntry.DEFLATED;

  public ZipOutputStream() {
    // for JavaScript
  }
  
  /**
   * Creates a new ZIP output stream.
   * 
   * <p>
   * The UTF-8 {@link java.nio.charset.Charset charset} is used to encode the
   * entry names and comments.
   * 
   * @j2sIgnore
   * 
   * @param out
   *        the actual output stream
   */
  public ZipOutputStream(OutputStream out) {
    super();
    setZOS(out);
  }

  public ZipOutputStream setZOS(OutputStream out) {
    setDOS(out, newDeflater());
    return this;
  }
  
  private static Deflater newDeflater() {
    return (Deflater) (new Deflater(Integer.MAX_VALUE)).init(Deflater.DEFAULT_COMPRESSION, 0, true);
  }

  /**
   * Sets the ZIP file comment.
   * 
   * @param comment
   *        the comment string
   * @exception IllegalArgumentException
   *            if the length of the specified ZIP file comment is greater than
   *            0xFFFF bytes
   */
  public void setComment(String comment) {
    if (comment != null) {
      this.comment = ZStream.getBytes(comment);
      if (this.comment.length > 0xffff)
        throw new IllegalArgumentException("ZIP file comment too long.");
    }
  }

  //    /**
  //     * Sets the default compression method for subsequent entries. This
  //     * default will be used whenever the compression method is not specified
  //     * for an individual ZIP file entry, and is initially set to DEFLATED.
  //     * @param method the default compression method
  //     * @exception IllegalArgumentException if the specified compression method
  //     *            is invalid
  //     */
  //    public void setMethod(int method) {
  //        if (method != DEFLATED && method != STORED) {
  //            throw new IllegalArgumentException("invalid compression method");
  //        }
  //        this.method = method;
  //    }

  //    /**
  //     * Sets the compression level for subsequent entries which are DEFLATED.
  //     * The default setting is DEFAULT_COMPRESSION.
  //     * @param level the compression level (0-9)
  //     * @exception IllegalArgumentException if the compression level is invalid
  //     */
  //    public void setLevel(int level) {
  //        def.setLevel(level);
  //    }

  /**
   * Begins writing a new ZIP file entry and positions the stream to the start
   * of the entry data. Closes the current entry if still active. The default
   * compression method will be used if no compression method was specified for
   * the entry, and the current time will be used if the entry has no set
   * modification time.
   * 
   * @param e
   *        the ZIP entry to be written
   * @exception ZipException
   *            if a ZIP format error has occurred
   * @exception IOException
   *            if an I/O error has occurred
   */
  public void putNextEntry(ZipEntry e) throws IOException {
    ensureOpen();
    if (current != null) {
      closeEntry(); // close previous entry
    }
    if (e.time == -1) {
      e.setTime(System.currentTimeMillis());
    }
    if (e.method == -1) {
      e.method = method; // use default method
    }
    // store size, compressed size, and crc-32 in LOC header
    e.flag = 0;
    switch (e.method) {
    case DEFLATED:
      // store size, compressed size, and crc-32 in data descriptor
      // immediately following the compressed entry data
      if (e.size == -1 || e.csize == -1 || e.crc == -1)
        e.flag = 8;

      break;
    case STORED:
      // compressed size, uncompressed size, and crc-32 must all be
      // set for entries using STORED compression method
      if (e.size == -1) {
        e.size = e.csize;
      } else if (e.csize == -1) {
        e.csize = e.size;
      } else if (e.size != e.csize) {
        throw new ZipException(
            "STORED entry where compressed != uncompressed size");
      }
      if (e.size == -1 || e.crc == -1) {
        throw new ZipException(
            "STORED entry missing size, compressed size, or crc-32");
      }
      break;
    default:
      throw new ZipException("unsupported compression method");
    }
    if (names.containsKey(e.name)) {
      throw new ZipException("duplicate entry: " + e.name);
    }
    names.put(e.name, Boolean.TRUE);
    //if (zc.isUTF8())
    e.flag |= ZipConstants64.EFS;
    current = e;
    current.offset = written;
    xentries.addLast(current);
    writeLOC(current);
  }

  /**
   * Closes the current ZIP entry and positions the stream for writing the next
   * entry.
   * 
   * @exception ZipException
   *            if a ZIP format error has occurred
   * @exception IOException
   *            if an I/O error has occurred
   */
  public void closeEntry() throws IOException {
    ensureOpen();
    if (current != null) {
      ZipEntry e = current;
      switch (e.method) {
      case DEFLATED:
        deflater.finish();
        super.finish();//BH possible problem here?
        if ((e.flag & 8) == 0) {
          // verify size, compressed size, and crc-32 settings
          if (e.size != deflater.getBytesRead()) {
            throw new ZipException("invalid entry size (expected " + e.size
                + " but got " + deflater.getBytesRead() + " bytes)");
          }
          if (e.csize != deflater.getBytesWritten()) {
            throw new ZipException("invalid entry compressed size (expected "
                + e.csize + " but got " + deflater.getBytesWritten()
                + " bytes)");
          }
          if (e.crc != crc.getValue()) {
            throw new ZipException("invalid entry CRC-32 (expected 0x"
                + Long.toHexString(e.crc) + " but got 0x"
                + Long.toHexString(crc.getValue()) + ")");
          }
        } else {
          e.size = deflater.getBytesRead();
          e.csize = deflater.getBytesWritten();
          e.crc = crc.getValue();
          writeEXT(e);
        }
        deflater = newDeflater();
        written += e.csize;
        break;
      case STORED:
        // we already know that both e.size and e.csize are the same
        if (e.size != written - locoff) {
          throw new ZipException("invalid entry size (expected " + e.size
              + " but got " + (written - locoff) + " bytes)");
        }
        if (e.crc != crc.getValue()) {
          throw new ZipException("invalid entry crc-32 (expected 0x"
              + Long.toHexString(e.crc) + " but got 0x"
              + Long.toHexString(crc.getValue()) + ")");
        }
        break;
      default:
        throw new ZipException("invalid compression method");
      }
      crc.reset();
      current = null;
    }
  }

  /**
   * Writes an array of bytes to the current ZIP entry data. This method will
   * block until all the bytes are written.
   * 
   * @param b
   *        the data to be written
   * @param off
   *        the start offset in the data
   * @param len
   *        the number of bytes that are written
   * @exception ZipException
   *            if a ZIP file error has occurred
   * @exception IOException
   *            if an I/O error has occurred
   */
  @Override
  public synchronized void write(byte[] b, int off, int len) throws IOException {
    ensureOpen();
    if (off < 0 || len < 0 || off > b.length - len) {
      throw new IndexOutOfBoundsException();
    } else if (len == 0) {
      return;
    }

    if (current == null) {
      throw new ZipException("no current ZIP entry");
    }
    ZipEntry entry = current;
    switch (entry.method) {
    case DEFLATED:
      super.write(b, off, len);
      break;
    case STORED:
      written += len;
      if (written - locoff > entry.size) {
        throw new ZipException("attempt to write past end of STORED entry");
      }
      out.write(buffer, 0, len);
      break;
    default:
      throw new ZipException("invalid compression method");
    }
    crc.update(b, off, len);
  }

  /**
   * Finishes writing the contents of the ZIP output stream without closing the
   * underlying stream. Use this method when applying multiple filters in
   * succession to the same output stream.
   * 
   * @exception ZipException
   *            if a ZIP file error has occurred
   * @exception IOException
   *            if an I/O exception has occurred
   */
  @Override
  public void finish() throws IOException {
    ensureOpen();
    if (finished) {
      return;
    }
    if (current != null) {
      closeEntry();
    }
    // write central directory
    long off = written;
    for (ZipEntry xentry : xentries)
      writeCEN(xentry);
    writeEND(off, written - off);
    finished = true;
  }

  /**
   * Closes the ZIP output stream as well as the stream being filtered.
   * 
   * @exception ZipException
   *            if a ZIP file error has occurred
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

  /*
   * Writes local file (LOC) header for specified entry.
   */
  private void writeLOC(ZipEntry entry) throws IOException {
    ZipEntry e = entry;
    int flag = e.flag;
    int elen = (e.extra != null) ? e.extra.length : 0;
    boolean hasZip64 = false;

    writeInt(LOCSIG); // LOC header signature

    if ((flag & 8) == 8) {
      writeShort(version(e)); // version needed to extract
      writeShort(flag); // general purpose bit flag
      writeShort(e.method); // compression method
      writeInt(e.time); // last modification time

      // store size, uncompressed size, and crc-32 in data descriptor
      // immediately following compressed entry data
      writeInt(0);
      writeInt(0);
      writeInt(0);
    } else {
      if (e.csize >= ZipConstants64.ZIP64_MAGICVAL
          || e.size >= ZipConstants64.ZIP64_MAGICVAL) {
        hasZip64 = true;
        writeShort(45); // ver 4.5 for zip64
      } else {
        writeShort(version(e)); // version needed to extract
      }
      writeShort(flag); // general purpose bit flag
      writeShort(e.method); // compression method
      writeInt(e.time); // last modification time
      writeInt(e.crc); // crc-32
      if (hasZip64) {
        writeInt(ZipConstants64.ZIP64_MAGICVAL);
        writeInt(ZipConstants64.ZIP64_MAGICVAL);
        elen += 20; //headid(2) + size(2) + size(8) + csize(8)
      } else {
        writeInt(e.csize); // compressed size
        writeInt(e.size); // uncompressed size
      }
    }
    byte[] nameBytes = ZStream.getBytes(e.name);
    writeShort(nameBytes.length);
    writeShort(elen);
    writeBytes(nameBytes, 0, nameBytes.length);
    if (hasZip64) {
      writeShort(ZipConstants64.ZIP64_EXTID);
      writeShort(16);
      writeLong(e.size);
      writeLong(e.csize);
    }
    if (e.extra != null) {
      writeBytes(e.extra, 0, e.extra.length);
    }
    locoff = written;
  }

  /*
   * Writes extra data descriptor (EXT) for specified entry.
   */
  private void writeEXT(ZipEntry e) throws IOException {
    writeInt(EXTSIG); // EXT header signature
    writeInt(e.crc); // crc-32
    if (e.csize >= ZipConstants64.ZIP64_MAGICVAL
        || e.size >= ZipConstants64.ZIP64_MAGICVAL) {
      writeLong(e.csize);
      writeLong(e.size);
    } else {
      writeInt(e.csize); // compressed size
      writeInt(e.size); // uncompressed size
    }
  }

  /*
   * Write central directory (CEN) header for specified entry.
   * REMIND: add support for file attributes
   */
  private void writeCEN(ZipEntry entry) throws IOException {
    ZipEntry e = entry;
    int flag = e.flag;
    int version = version(e);

    long csize = e.csize;
    long size = e.size;
    long offset = entry.offset;
    int e64len = 0;
    boolean hasZip64 = false;
    if (e.csize >= ZipConstants64.ZIP64_MAGICVAL) {
      csize = ZipConstants64.ZIP64_MAGICVAL;
      e64len += 8; // csize(8)
      hasZip64 = true;
    }
    if (e.size >= ZipConstants64.ZIP64_MAGICVAL) {
      size = ZipConstants64.ZIP64_MAGICVAL; // size(8)
      e64len += 8;
      hasZip64 = true;
    }
    if (entry.offset >= ZipConstants64.ZIP64_MAGICVAL) {
      offset = ZipConstants64.ZIP64_MAGICVAL;
      e64len += 8; // offset(8)
      hasZip64 = true;
    }
    writeInt(CENSIG); // CEN header signature
    if (hasZip64) {
      writeShort(45); // ver 4.5 for zip64
      writeShort(45);
    } else {
      writeShort(version); // version made by
      writeShort(version); // version needed to extract
    }
    writeShort(flag); // general purpose bit flag
    writeShort(e.method); // compression method
    writeInt(e.time); // last modification time
    writeInt(e.crc); // crc-32
    writeInt(csize); // compressed size
    writeInt(size); // uncompressed size
    byte[] nameBytes = ZStream.getBytes(e.name);
    writeShort(nameBytes.length);
    if (hasZip64) {
      // + headid(2) + datasize(2)
      writeShort(e64len + 4 + (e.extra != null ? e.extra.length : 0));
    } else {
      writeShort(e.extra != null ? e.extra.length : 0);
    }
    byte[] commentBytes;
    if (e.comment != null) {
      commentBytes = ZStream.getBytes(e.comment);
      writeShort(Math.min(commentBytes.length, 0xffff));
    } else {
      commentBytes = null;
      writeShort(0);
    }
    writeShort(0); // starting disk number
    writeShort(0); // internal file attributes (unused)
    writeInt(0); // external file attributes (unused)
    writeInt(offset); // relative offset of local header
    writeBytes(nameBytes, 0, nameBytes.length);
    if (hasZip64) {
      writeShort(ZipConstants64.ZIP64_EXTID);// Zip64 extra
      writeShort(e64len);
      if (size == ZipConstants64.ZIP64_MAGICVAL)
        writeLong(e.size);
      if (csize == ZipConstants64.ZIP64_MAGICVAL)
        writeLong(e.csize);
      if (offset == ZipConstants64.ZIP64_MAGICVAL)
        writeLong(entry.offset);
    }
    if (e.extra != null) {
      writeBytes(e.extra, 0, e.extra.length);
    }
    if (commentBytes != null) {
      writeBytes(commentBytes, 0, Math.min(commentBytes.length, 0xffff));
    }
  }

  /*
   * Writes end of central directory (END) header.
   */
  private void writeEND(long off, long len) throws IOException {
    boolean hasZip64 = false;
    long xlen = len;
    long xoff = off;
    if (xlen >= ZipConstants64.ZIP64_MAGICVAL) {
      xlen = ZipConstants64.ZIP64_MAGICVAL;
      hasZip64 = true;
    }
    if (xoff >= ZipConstants64.ZIP64_MAGICVAL) {
      xoff = ZipConstants64.ZIP64_MAGICVAL;
      hasZip64 = true;
    }
    int count = xentries.size();
    if (count >= ZipConstants64.ZIP64_MAGICCOUNT) {
      count = ZipConstants64.ZIP64_MAGICCOUNT;
      hasZip64 = true;
    }
    if (hasZip64) {
      long off64 = written;
      //zip64 end of central directory record
      writeInt(ZipConstants64.ZIP64_ENDSIG); // zip64 END record signature
      writeLong(ZipConstants64.ZIP64_ENDHDR - 12); // size of zip64 end
      writeShort(45); // version made by
      writeShort(45); // version needed to extract
      writeInt(0); // number of this disk
      writeInt(0); // central directory start disk
      writeLong(xentries.size()); // number of directory entires on disk
      writeLong(xentries.size()); // number of directory entires
      writeLong(len); // length of central directory
      writeLong(off); // offset of central directory

      //zip64 end of central directory locator
      writeInt(ZipConstants64.ZIP64_LOCSIG); // zip64 END locator signature
      writeInt(0); // zip64 END start disk
      writeLong(off64); // offset of zip64 END
      writeInt(1); // total number of disks (?)
    }
    writeInt(ENDSIG); // END record signature
    writeShort(0); // number of this disk
    writeShort(0); // central directory start disk
    writeShort(count); // number of directory entries on disk
    writeShort(count); // total number of directory entries
    writeInt(xlen); // length of central directory
    writeInt(xoff); // offset of central directory
    if (comment != null) { // zip file comment
      writeShort(comment.length);
      writeBytes(comment, 0, comment.length);
    } else {
      writeShort(0);
    }
  }

  /*
   * Writes a 16-bit short to the output stream in little-endian byte order.
   */
  private void writeShort(int v) throws IOException {
    OutputStream out = this.out;
    
    /**
     * @j2sNative
     * 
     *            out.writeByteAsInt((v >>> 0) & 0xff);
     *            out.writeByteAsInt((v >>> 8) & 0xff);
     * 
     */
    { 
      out.write((v >>> 0) & 0xff);
      out.write((v >>> 8) & 0xff);
    }
    written += 2;
  }

  /*
   * Writes a 32-bit int to the output stream in little-endian byte order.
   */
  private void writeInt(long v) throws IOException {
    OutputStream out = this.out;
    /**
     * @j2sNative
     * 
     *            out.writeByteAsInt((v >>> 0) & 0xff);
     *            out.writeByteAsInt((v >>> 8) & 0xff);
     *            out.writeByteAsInt((v >>> 16) & 0xff);
     *            out.writeByteAsInt((v >>> 24) & 0xff);
     * 
     */
    {
      out.write((int) ((v >>> 0) & 0xff));
      out.write((int) ((v >>> 8) & 0xff));
      out.write((int) ((v >>> 16) & 0xff));
      out.write((int) ((v >>> 24) & 0xff));
    }
    written += 4;
  }

  /*
   * Writes a 64-bit int to the output stream in little-endian byte order.
   */
  private void writeLong(long v) throws IOException {
    OutputStream out = this.out;
    /**
     * JavaScript does not support long
     * 
     * @j2sNative
     * 
     *            out.writeByteAsInt((v >>> 0) & 0xff);
     *            out.writeByteAsInt((v >>> 8) & 0xff);
     *            out.writeByteAsInt((v >>> 16) & 0xff);
     *            out.writeByteAsInt((v >>> 24) & 0xff);
     *            out.writeByteAsInt(0);
     *            out.writeByteAsInt(0);
     *            out.writeByteAsInt(0);
     *            out.writeByteAsInt(0);
     * 
     */
    {
    out.write((int) ((v >>> 0) & 0xff));
    out.write((int) ((v >>> 8) & 0xff));
    out.write((int) ((v >>> 16) & 0xff));
    out.write((int) ((v >>> 24) & 0xff));
    out.write((int) ((v >>> 32) & 0xff));
    out.write((int) ((v >>> 40) & 0xff));
    out.write((int) ((v >>> 48) & 0xff));
    out.write((int) ((v >>> 56) & 0xff));
    }
    written += 8;
  }

  /*
   * Writes an array of bytes to the output stream.
   */
  private void writeBytes(byte[] b, int off, int len) throws IOException {
    super.out.write(b, off, len);
    written += len;
  }
}
