/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2007-04-05 09:07:28 -0500 (Thu, 05 Apr 2007) $
 * $Revision: 7326 $
 *
 * Copyright (C) 2003-2005  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
package javajs.util;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import javajs.api.GenericCifDataParser;
import javajs.api.GenericLineReader;
import javajs.api.Interface;

/**
 * A general helper class for a variety of stream and reader functionality
 * including:
 * 
 * stream and byte magic-number decoding for PNG, PNGJ, ZIP, and GZIP streams
 * 
 * various stream/reader methods, including UTF-encoded stream reading
 * 
 * reflection-protected access to a CIF parser and ZIP tools
 * 
 * 
 * 
 * 
 */
public class Rdr implements GenericLineReader {

  public static class StreamReader extends BufferedReader {

    private BufferedInputStream stream;

    public StreamReader(BufferedInputStream bis, String charSet) throws UnsupportedEncodingException {
      super(new InputStreamReader(bis, (charSet == null ? "UTF-8" : charSet)));
      stream = bis;
    }

    public BufferedInputStream getStream() {
      try {
        stream.reset();
      } catch (IOException e) {
        // ignore
      }
      return stream;
    }

  }

  private static final int UNDERFLOW = 264;

  BufferedReader reader;

  public Rdr(BufferedReader reader) {
    this.reader = reader;
  }

  @Override
  public String readNextLine() throws Exception {
    return reader.readLine();
  }

	/**
	 * Read an InputStream in its entirety as a byte array, closing the stream.
	 * 
	 * @param is
	 * @return a byte array
	 * @throws IOException 
	 */
	public static byte[] streamToBytes(InputStream is) throws IOException {
		byte[] bytes = getLimitedStreamBytes(is, -1);
		is.close();
		return bytes;
	}

	/**
	 * Read an InputStream in its entirety as a string, closing the stream.
	 * 
	 * @param is
	 * @return a String
	 * @throws IOException
	 */
	public static String streamToString(InputStream is) throws IOException {
		return new String(streamToBytes(is));
	}

	public static Map<String, Object> readCifData(GenericCifDataParser parser, BufferedReader br) {
		return parser.set(null, br, false).getAllCifData();
	}

  ///////////

  /**
   * 
   * Read a UTF-8 byte array fully, converting it to a String. Called by Jmol's
   * XMLReaders
   * 
   * @param bytes
   * @return a UTF-8 string
   */
  public static String bytesToUTF8String(byte[] bytes) {
    return streamToUTF8String(new BufferedInputStream(new ByteArrayInputStream(bytes)));
  }

  /**
   * 
   * Read a UTF-8 stream fully, converting it to a String. Called by Jmol's
   * XMLReaders
   * 
   * @param bis
   * @return a UTF-8 string or null if there is an error
   */
  public static String streamToUTF8String(BufferedInputStream bis) {
    String[] data = new String[1];
    try {
      readAllAsString(getBufferedReader(bis, "UTF-8"), -1, true, data, 0);
    } catch (IOException e) {
    }
    return data[0];
  }

  /**
   * Read an input stream fully, saving a byte array, then return a buffered
   * reader to those bytes converted to string form.
   * 
   * @param bis
   * @param charSet
   * @return Reader
   * @throws IOException
   */
  public static BufferedReader getBufferedReader(BufferedInputStream bis, String charSet) throws IOException {
    // could also just make sure we have a buffered input stream here.
    if (getUTFEncodingForStream(bis) == Encoding.NONE)
      return new StreamReader(bis, (charSet == null ? "UTF-8" : charSet));
    byte[] bytes = getLimitedStreamBytes(bis, -1);
    bis.close();
    return getBR(charSet == null ? fixUTF(bytes) : new String(bytes, charSet));
  }

  /**
   * This method is specifically for strings that might be marked for UTF 8 or 16.
   * In this case, Java would return a (0xFEFF) code point as the first character.
   * 
   * @param bytes
   * @return UTF-decoded bytes
   */
  public static String fixUTF(byte[] bytes) {
    Encoding encoding = getUTFEncoding(bytes);
    if (encoding != Encoding.NONE)
      try {
        String s = new String(bytes, encoding.name().replace('_', '-'));
        switch (encoding) {
        case UTF8:
        case UTF_16BE:
        case UTF_16LE:
          // extra byte at beginning removed
          s = s.substring(1);
          break;
        default:
          break;
        }
        return s;
      } catch (UnsupportedEncodingException e) {
        System.out.println(e);
      }
    return new String(bytes);
  }

  private static Encoding getUTFEncoding(byte[] bytes) {
    if (bytes.length >= 3 && (bytes[0] & 0xFF) == 0xEF && (bytes[1] & 0xFF) == 0xBB && (bytes[2] & 0xFF) == 0xBF)
      return Encoding.UTF8;
    if (bytes.length >= 4 && (bytes[0] & 0xFF) == 0 && (bytes[1] & 0xFF) == 0 && (bytes[2] & 0xFF) == 0xFE
        && (bytes[3] & 0xFF) == 0xFF)
      return Encoding.UTF_32BE;
    if (bytes.length >= 4 && (bytes[0] & 0xFF) == 0xFF && (bytes[1] & 0xFF) == 0xFE && (bytes[2] & 0xFF) == 0
        && (bytes[3] & 0xFF) == 0)
      return Encoding.UTF_32LE;
    if (bytes.length >= 2 && (bytes[0] & 0xFF) == 0xFF && (bytes[1] & 0xFF) == 0xFE)
      return Encoding.UTF_16LE;
    if (bytes.length >= 2 && (bytes[0] & 0xFF) == 0xFE && (bytes[1] & 0xFF) == 0xFF)
      return Encoding.UTF_16BE;
    return Encoding.NONE;

  }

  ////////// stream type checking //////////

  private static Encoding getUTFEncodingForStream(BufferedInputStream is) throws IOException {
    byte[] abMagic = new byte[4];
    abMagic[3] = 1;
    try {
      is.mark(5);
    } catch (Exception e) {
      return Encoding.NONE;
    }
    is.read(abMagic, 0, 4);
    is.reset();
    return getUTFEncoding(abMagic);
  }

  public static boolean isBase64(SB sb) {
    return (sb.indexOf(";base64,") == 0);
  }

  public static boolean isCompoundDocumentS(InputStream is) {
    return isCompoundDocumentB(getMagic(is, 8));
  }

  public static boolean isCompoundDocumentB(byte[] bytes) {
    return (bytes.length >= 8 && (bytes[0] & 0xFF) == 0xD0 && (bytes[1] & 0xFF) == 0xCF && (bytes[2] & 0xFF) == 0x11
        && (bytes[3] & 0xFF) == 0xE0 && (bytes[4] & 0xFF) == 0xA1 && (bytes[5] & 0xFF) == 0xB1
        && (bytes[6] & 0xFF) == 0x1A && (bytes[7] & 0xFF) == 0xE1);
  }

  public static boolean isBZip2S(InputStream is) {
    return isBZip2B(getMagic(is, 3));
  }

  public static boolean isGzipS(InputStream is) {
    return isGzipB(getMagic(is, 2));
  }

  public static boolean isBZip2B(byte[] bytes) {
    return (bytes != null && bytes.length >= 3 // BZh
        && (bytes[0] & 0xFF) == 0x42 && (bytes[1] & 0xFF) == 0x5A && (bytes[2] & 0xFF) == 0x68);
  }

  public static boolean isGzipB(byte[] bytes) {
    return (bytes != null && bytes.length >= 2 && (bytes[0] & 0xFF) == 0x1F && (bytes[1] & 0xFF) == 0x8B);
  }

  public static boolean isPickleS(InputStream is) {
    return isPickleB(getMagic(is, 2));
  }

  public static boolean isPickleB(byte[] bytes) {
    return (bytes != null && bytes.length >= 2 && (bytes[0] & 0xFF) == 0x7D && (bytes[1] & 0xFF) == 0x71);
  }

  public static boolean isMessagePackS(InputStream is) {
    return isMessagePackB(getMagic(is, 2));
  }

  public static boolean isMessagePackB(byte[] bytes) {
    // look for 'map' start, but PNG files start with 0x89, which is
    // the MessagePack start for a 9-member map, so in that case we have
    // to check that the next byte is not "P" as in <89>PNG
    int b;

    return (bytes != null && bytes.length >= 1
        && (((b = bytes[0] & 0xFF)) == 0xDE || (b & 0xE0) == 0x80 && bytes[1] != 0x50));
  }

  public static boolean isPngZipStream(InputStream is) {
    return isPngZipB(getMagic(is, 55));
  }

  public static boolean isPngZipB(byte[] bytes) {
    // \0PNGJ starting at byte 50
    return (bytes[50] == 0 && bytes[51] == 0x50 && bytes[52] == 0x4E && bytes[53] == 0x47 && bytes[54] == 0x4A);
  }

  /**
   * Check for a ZIP input stream - starting with "PK<03><04>"
   * 
   * @param is
   * @return true if a ZIP stream
   */
  public static boolean isZipS(InputStream is) {
    return isZipB(getMagic(is, 4));
  }

  public static boolean isZipB(byte[] bytes) {
    return (bytes.length >= 4 && bytes[0] == 0x50 // PK<03><04>
        && bytes[1] == 0x4B && bytes[2] == 0x03 && bytes[3] == 0x04);
  }

  public static byte[] getMagic(InputStream is, int n) {
    byte[] abMagic = (n > 264 ? new byte[n] : b264 == null ? (b264 = new byte[265]) : b264);
    try {
      abMagic[UNDERFLOW] = -1;
      is.mark(n + 1);
      int i = is.read(abMagic, 0, n);
      if (i < n) {
        // ensure 
        abMagic[0] = abMagic[UNDERFLOW] = 0;
      }
    } catch (IOException e) {
    }
    try {
      is.reset();
    } catch (IOException e) {
    }
    return abMagic;
  }

  public static String guessMimeTypeForBytes(byte[] bytes) {
    // only options here are JPEG, PNG, GIF, and BMP
    switch (bytes.length < 2 ? -1 : bytes[1]) {
    case 0:
      return "image/jpg"; // 0xFF 0x00 ...
    case 0x49:
      return "image/gif"; // GIF89a...
    case 0x4D:
      return "image/BMP"; // BM...
    case 0x50:
      return "image/png";
    default:
      return "image/unknown";
    }
  }

  ////////// stream/byte methods ///////////

  public static BufferedInputStream getBIS(byte[] bytes) {
    return new BufferedInputStream(new ByteArrayInputStream(bytes));
  }

  public static BufferedReader getBR(String string) {
    return new BufferedReader(new StringReader(string));
  }

  public static BufferedInputStream toBIS(Object o) {
    return (AU.isAB(o) ? getBIS((byte[]) o)
        : o instanceof SB ? getBIS(getBytesFromSB((SB) o))
            : o instanceof String ? getBIS(((String) o).getBytes()) : null);
  }

  /**
   * Allow for base64-encoding check.
   * 
   * @param sb
   * @return byte array
   */
  public static byte[] getBytesFromSB(SB sb) {
    return (isBase64(sb) ? Base64.decodeBase64(sb.substring(8)) : sb.toBytes(0, -1));
  }

  /**
   * Read a an entire BufferedInputStream for its bytes, and either return them or
   * leave them in the designated output channel.
   * 
   * Closes the stream.
   * 
   * @param bis
   * @param out a destination output channel, or null
   * @return byte[] (if out is null) or a message indicating length (if not)
   * 
   * @throws IOException
   */
  public static Object getStreamAsBytes(BufferedInputStream bis, OC out) throws IOException {
    byte[] buf = new byte[1024];
    byte[] bytes = (out == null ? new byte[4096] : null);
    int len = 0;
    int totalLen = 0;
    while ((len = bis.read(buf, 0, 1024)) > 0) {
      totalLen += len;
      if (out == null) {
        if (totalLen >= bytes.length)
          bytes = AU.ensureLengthByte(bytes, totalLen * 2);
        System.arraycopy(buf, 0, bytes, totalLen - len, len);
      } else {
        out.write(buf, 0, len);
      }
    }
    bis.close();
    if (out == null) {
      return AU.arrayCopyByte(bytes, totalLen);
    }
    return totalLen + " bytes";
  }

  /**
   * Read a possibly limited number of bytes (when n > 0) from a stream, leaving
   * the stream open.
   * 
   * @param is an input stream, not necessarily buffered.
   * @param n  the maximum number of bytes to read, or -1 for all
   * @return the bytes read
   * 
   * @throws IOException
   */
  public static byte[] getLimitedStreamBytes(InputStream is, long n) throws IOException {

    // Note: You cannot use InputStream.available() to reliably read
    // zip data from the web.

    int buflen = (n > 0 && n < 1024 ? (int) n : 1024);
    byte[] buf = new byte[buflen];
    byte[] bytes = new byte[n < 0 ? 4096 : (int) n];
    int len = 0;
    int totalLen = 0;
    if (n < 0)
      n = Integer.MAX_VALUE;
    while (totalLen < n && (len = is.read(buf, 0, buflen)) > 0) {
      totalLen += len;
      if (totalLen > bytes.length)
        bytes = AU.ensureLengthByte(bytes, totalLen * 2);
      System.arraycopy(buf, 0, bytes, totalLen - len, len);
      if (n != Integer.MAX_VALUE && totalLen + buflen > bytes.length)
        buflen = bytes.length - totalLen;

    }
    if (totalLen == bytes.length)
      return bytes;
    buf = new byte[totalLen];
    System.arraycopy(bytes, 0, buf, 0, totalLen);
    return buf;
  }

  /**
   * This method fills data[i] with string data from a file that may or may not be
   * binary even though it is being read by a reader. It is meant to be used
   * simple text-based files only.
   * 
   * @param br
   * @param nBytesMax
   * @param allowBinary
   * @param data
   * @param i
   * @return true if data[i] holds the data; false if data[i] holds an error
   *         message.
   */
  public static boolean readAllAsString(BufferedReader br, int nBytesMax, boolean allowBinary, String[] data, int i) {
    try {
      SB sb = SB.newN(8192);
      String line;
      if (nBytesMax < 0) {
        line = br.readLine();
        if (allowBinary || line != null && line.indexOf('\0') < 0
            && (line.length() != 4 || line.charAt(0) != 65533 || line.indexOf("PNG") != 1)) {
          sb.append(line).appendC('\n');
          while ((line = br.readLine()) != null)
            sb.append(line).appendC('\n');
        }
      } else {
        int n = 0;
        int len;
        while (n < nBytesMax && (line = br.readLine()) != null) {
          if (nBytesMax - n < (len = line.length()) + 1)
            line = line.substring(0, nBytesMax - n - 1);
          sb.append(line).appendC('\n');
          n += len + 1;
        }
      }
      br.close();
      data[i] = sb.toString();
      return true;
    } catch (Exception ioe) {
      data[i] = ioe.toString();
      return false;
    }
  }

  /////////// PNGJ support /////////////

  /**
   * Look at byte 50 for "\0PNGJxxxxxxxxx+yyyyyyyyy" where xxxxxxxxx is a byte
   * offset to the JMOL data and yyyyyyyyy is the length of the data.
   * 
   * @param bis
   * @return same stream or byte stream
   */

  /**
   * We define a request for zip file extraction by vertical bar:
   * zipName|interiorFileName. These may be nested if there is a zip file
   * contained in a zip file.
   * 
   * @param fileName
   * @return filename trimmed of interior fileName
   * 
   */
  public static String getZipRoot(String fileName) {
    int pt = fileName.indexOf("|");
    return (pt < 0 ? fileName : fileName.substring(0, pt));
  }

  public static BufferedWriter getBufferedWriter(OutputStream os, String charSetName) {
    OutputStreamWriter osw = (OutputStreamWriter) Interface.getInstanceWithParams("java.io.OutputStreamWriter",
        new Class<?>[] { java.io.OutputStream.class, String.class },
        new Object[] { os, charSetName == null ? "UTF-8" : charSetName });

    return new BufferedWriter(osw);
  }

  private static byte[] b264;

  public static boolean isTar(BufferedInputStream bis) {
      byte[] bytes = getMagic(bis, 264);
      // check for ustar<00>
      return (bytes[UNDERFLOW] == -1
          && (bytes[257] & 0xFF) == 0x75
          && (bytes[258] & 0xFF) == 0x73
          && (bytes[259] & 0xFF) == 0x74
          && (bytes[260] & 0xFF) == 0x61
          && (bytes[261] & 0xFF) == 0x72
          );
  }

  /**
   * Just looking for non-printable characters.
   * 
   * @param bis
   * @param n length to scan
   * @return true if non-printable characters found
   */
  public static boolean isBinary(BufferedInputStream bis, int n) {
    byte[] bytes = getMagic(bis, n);
    if (b264[UNDERFLOW] == -1)
      for (int i = 0; i < n; i++)
      if (bytes[i] < 9) // TAB
        return true;
    return false;
  }

}
