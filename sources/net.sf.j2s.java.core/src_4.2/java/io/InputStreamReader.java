/*
 * Copyright (c) 1996, 2005, Oracle and/or its affiliates. All rights reserved.
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

package java.io;

/**
 * An InputStreamReader is a bridge from byte streams to character streams: It
 * reads bytes and decodes them into characters using a specified {@link
 * java.nio.charset.Charset <code>charset</code>}.  The charset that it uses
 * may be specified by name or may be given explicitly, or the platform's
 * default charset may be accepted.
 *
 * <p> Each invocation of one of an InputStreamReader's read() methods may
 * cause one or more bytes to be read from the underlying byte-input stream.
 * To enable the efficient conversion of bytes to characters, more bytes may
 * be read ahead from the underlying stream than are necessary to satisfy the
 * current read operation.
 *
 * <p> For top efficiency, consider wrapping an InputStreamReader within a
 * BufferedReader.  For example:
 *
 * <pre>
 * BufferedReader in
 *   = new BufferedReader(new InputStreamReader(System.in));
 * </pre>
 *
 * @see BufferedReader
 * @see InputStream
 * @see java.nio.charset.Charset
 *
 * @author      Mark Reinhold
 * @since       JDK1.1
 */

public class InputStreamReader extends Reader {

//    /**
//     * Creates an InputStreamReader that uses the default charset.
//     *
//     * @param  in   An InputStream
//     */
//    public InputStreamReader(InputStream in) {
//        super(in);
//        try {
//            sd = StreamDecoder.forInputStreamReader(in, this, (String)null); // ## check lock object
//        } catch (UnsupportedEncodingException e) {
//            // The default encoding should always be available
//            throw new Error(e);
//        }
//    }

    private InputStream in;
    private boolean isOpen = true;
    private String charsetName;
    private boolean isUTF8;

    /**
     * Creates an InputStreamReader that uses the named charset.
     *
     * @param  in
     *         An InputStream
     *
     * @param  charsetName
     *         The name of a supported
     *         {@link java.nio.charset.Charset </code>charset<code>}
     *
     * @exception  UnsupportedEncodingException
     *             If the named charset is not supported
     */
    public InputStreamReader(InputStream in, String charsetName)
        throws UnsupportedEncodingException
    {
        super(in);
        this.in = in;
        this.charsetName = charsetName;
        if (!(isUTF8 = "UTF-8".equals(charsetName)) && !"ISO-8859-1".equals(charsetName))
            throw new NullPointerException("charsetName");
        //in.resetStream();
        //sd = StreamDecoder.forInputStreamReader(in, this, charsetName);
    }

//    /**
//     * Creates an InputStreamReader that uses the given charset. </p>
//     *
//     * @param  in       An InputStream
//     * @param  cs       A charset
//     *
//     * @since 1.4
//     * @spec JSR-51
//     */
//    public InputStreamReader(InputStream in, Charset cs) {
//        super(in);
//        if (cs == null)
//            throw new NullPointerException("charset");
//        sd = StreamDecoder.forInputStreamReader(in, this, cs);
//    }

//    /**
//     * Creates an InputStreamReader that uses the given charset decoder.  </p>
//     *
//     * @param  in       An InputStream
//     * @param  dec      A charset decoder
//     *
//     * @since 1.4
//     * @spec JSR-51
//     */
//    public InputStreamReader(InputStream in, CharsetDecoder dec) {
//        super(in);
//        if (dec == null)
//            throw new NullPointerException("charset decoder");
//        sd = StreamDecoder.forInputStreamReader(in, this, dec);
//    }

    /**
     * Returns the name of the character encoding being used by this stream.
     *
     * <p> If the encoding has an historical name then that name is returned;
     * otherwise the encoding's canonical name is returned.
     *
     * <p> If this instance was created with the {@link
     * #InputStreamReader(InputStream, String)} constructor then the returned
     * name, being unique for the encoding, may differ from the name passed to
     * the constructor. This method will return <code>null</code> if the
     * stream has been closed.
     * </p>
     * @return The historical name of this encoding, or
     *         <code>null</code> if the stream has been closed
     *
     * @see java.nio.charset.Charset
     *
     * @revised 1.4
     * @spec JSR-51
     */
    public String getEncoding() {
        return this.charsetName;
        //return sd.getEncoding();
    }

//    /**
//     * Reads a single character.
//     *
//     * @return The character read, or -1 if the end of the stream has been
//     *         reached
//     *
//     * @exception  IOException  If an I/O error occurs
//     */
//    public int read() throws IOException {
//        return sd.read();
//    }

    private byte[] bytearr = null;
    private int pos;
    
  /**
   * Reads characters into a portion of an array. Adapted by Bob Hanson to be
   * more flexible, allowing char codes 128-255 as simple characters and avoid
   * the use of string decoders. Will gracefully turn off isUTF if rules are not
   * followed.
   * 
   * @param cbuf
   *        Destination buffer
   * @param offset
   *        Offset at which to start storing characters
   * @param length
   *        Maximum number of characters to read
   * 
   * @return The number of characters read, or -1 if the end of the stream has
   *         been reached
   * 
   * @exception IOException
   *            If an I/O error occurs
   */
  @Override
  public int read(char cbuf[], int offset, int length) throws IOException {
    // borrowed from DataInputStream:

    if (bytearr == null || bytearr.length < length)
      bytearr = new byte[length];
    int c, char2, char3;
    int byteCount = 0;
    int charCount = offset;
    int byteLen = in.read(bytearr, pos, length - pos);
    int nAvail = in.available();
    if (byteLen < 0)
      return -1;
    int nMax = byteLen;
    while (byteCount < nMax) {
      c = bytearr[byteCount] & 0xff;
      if (isUTF8)
        switch (c >> 4) {
        case 0xC:
        case 0xD:
          /* 110x xxxx   10xx xxxx*/
          if (byteCount + 1 >= byteLen) {
            if (nAvail >= 1) {
              // truncate at this point and 
              // check in the next round
              nMax = byteCount;
              continue;
            }
          } else if (((char2 = bytearr[byteCount + 1]) & 0xC0) == 0x80) {
            cbuf[charCount++] = (char) (((c & 0x1F) << 6) | (char2 & 0x3F));
            byteCount += 2;
            continue;
          }
          isUTF8 = false;
          break;
        case 0xE:
          /* 1110 xxxx  10xx xxxx  10xx xxxx */
          if (byteCount + 2 >= byteLen) {
            if (nAvail >= 2) {
              // truncate at this point and 
              // check in the next round
              nMax = byteCount;
              continue;
            }
          } else if (((char2 = bytearr[byteCount + 1]) & 0xC0) == 0x80
              && ((char3 = bytearr[byteCount + 2]) & 0xC0) == 0x80) {
            cbuf[charCount++] = (char) (((c & 0x0F) << 12)
                | ((char2 & 0x3F) << 6) | (char3 & 0x3F));
            byteCount += 3;
            continue;
          }
          isUTF8 = false;
          break;
        }
      /* 0xxxxxxx or otherwise unreadable -- just take it to be a character and don't worry about it.*/
      byteCount++;
      cbuf[charCount++] = (char) c;
    }
    // The number of chars produced may be less than utflen
    pos = byteLen - byteCount;
    for (int i = 0; i < pos; i++) {
      bytearr[i] = bytearr[byteCount++];
    }
    return charCount - offset;
  }

    /**
     * Tells whether this stream is ready to be read.  An InputStreamReader is
     * ready if its input buffer is not empty, or if bytes are available to be
     * read from the underlying byte stream.
     *
     * @exception  IOException  If an I/O error occurs
     */
    @Override
    public boolean ready() throws IOException {
        return isOpen;
    }

    @Override
    public void close() throws IOException {
        in.close();
        isOpen = false;
    }
}
