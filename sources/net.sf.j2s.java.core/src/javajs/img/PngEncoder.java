/* $RCSfile$
 * $Author: nicove $
 * $Date: 2007-03-30 12:26:16 -0500 (Fri, 30 Mar 2007) $
 * $Revision: 7275 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2002-2005  The Jmol Development Team
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
package javajs.img;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.zip.Deflater;
import java.util.zip.DeflaterOutputStream;

/**
 * 
 * Modified by Bob Hanson hansonr@stolaf.edu to be a subclass of ImageEncoder
 * and to use javajs.util.OutputChannel instead of just returning bytes. Also
 * includes:
 * 
 * -- JavaScript-compatible image processing
 * 
 * -- transparent background option
 * 
 * -- more efficient calculation of needs for pngBytes
 * 
 * -- option to use pre-created PNGJ image data (3/19/14; Jmol 14.1.12)
 * 
 * -- PNGJ format:
 * 
 * // IHDR chunk
 * 
 * // tEXt chunk "Jmol type - <PNG0|PNGJ|PNGT><0000000pt>+<000000len>"
 * 
 * // tEXt chunk "Software - Jmol <version>"
 * 
 * // tEXt chunk "Creation Time - <date>"
 * 
 * // tRNS chunk transparent color, if desired
 *
 * // IDAT chunk (image data)
 * 
 * // IEND chunk
 * 
 * // [JMOL ZIP FILE APPENDIX]
 * 
 * Original Comment:
 * 
 * PngEncoder takes a Java Image object and creates a byte string which can be
 * saved as a PNG file. The Image is presumed to use the DirectColorModel.
 * 
 * Thanks to Jay Denny at KeyPoint Software http://www.keypoint.com/ who let me
 * develop this code on company time.
 * 
 * You may contact me with (probably very-much-needed) improvements, comments,
 * and bug fixes at:
 * 
 * david@catcode.com
 * 
 * @author J. David Eisenberg
 * @author http://catcode.com/pngencoder/
 * @author Christian Ribeaud (christian.ribeaud@genedata.com)
 * @author Bob Hanson (hansonr@stolaf.edu)
 * 
 * @version 1.4, 31 March 2000
 */
public class PngEncoder extends CRCEncoder {

  /**
   * Note that for Jmol 12.3.7-29 and 14.3.25-16.4.9, PNG files created by Jmol
   * have incorrect checksums.
   * 
   */
  
  /** Constants for filters */
  public static final int FILTER_NONE = 0;
  public static final int FILTER_SUB = 1;
  public static final int FILTER_UP = 2;
  public static final int FILTER_LAST = 2;

  private PNG png;

  private boolean encodeAlpha;
  private int filter = FILTER_NONE;
  private int bytesPerPixel;
  private int compressionLevel;
  private Integer transparentColor;
  private String comment;

  private final static double inchesPerMeter = 39.3700787;

  public final static byte[] pngIdBytes = { -119, 80, 78, 71, 13, 10, 26, 10 };

  private class PNG {

    /**
     * four characters; PNGx, where x is J or T for Jmol; original type "PNG" is
     * now "PNG0"
     * 
     */
    private String type;

    /**
     * nine characters to allow software to recognize itself
     * 
     */
    private String appPrefix;
    /**
     * zip data or state
     */
    protected byte[] appData;
    protected byte[] bytes;

    private int dataPt;

    private List<Chunk> data = new ArrayList<>();

    /**
     * pointer to first tEXt chunk
     */
    private int textPt;

    /**
     * has IDAT chunk
     */
    private boolean isValid;

    protected PNG(String type, String appPrefix) {
      this.type = type;
      if (appPrefix == null)
        appPrefix = "#SwingJS.";
      if (appPrefix.length() < 9)
        appPrefix = (appPrefix + ".........");
      if (appPrefix.length() > 9)
        appPrefix = appPrefix.substring(0, 9);
      this.appPrefix = appPrefix;
    }

    protected void addChunk(Chunk c) {
      if (textPt <= 0 && c.name.equals("tEXt"))
        textPt = data.size();
      if (!isValid && c.name.equals("IDAT"))
          isValid = true;
      data.add(c);
    }

    protected void writePNGData() {
      if (appData != null) {
        setJmolTypeText(0, 0);
        dataPt = pngIdBytes.length;
        Chunk last = data.get(data.size() - 1);
        if (last.name == null)
          data.remove(data.size() - 1);
        for (int i = 0, n = data.size(); i < n; i++) {
          dataPt += data.get(i).getWritelength();
        }
        data.add(new Chunk(null, appData));
        setJmolTypeText(dataPt, appData.length);
      }
      for (int i = 0, n = data.size(); i < n; i++) {
        data.get(i).write();
      }
    }

    /**
     * Generate the 33-byte PNGJ directory identifier:
     * 
     * xxxxxxxxx\0ttttiiiiiiiii+ddddddddd
     * 
     * 000000000.111111111122222222223333 123456789.012345678901234567890123
     * 
     * where
     * 
     * xxxxxxxxx is a unique 9-character software identifier tttt is a four-byte
     * software-specific type indicator (PNG0, PNGJ, PNGT, etc.) iiiiiiiii is
     * the file pointer to the start of app data ddddddddd is the length of the
     * app data
     * 
     * @param nPNG
     * @param nData
     * @return text
     */
    protected String getApplicationText(int nPNG, int nData) {
      String sPNG = "000000000" + nPNG;
      sPNG = sPNG.substring(sPNG.length() - 9);
      String sData = "000000000" + nData;
      sData = sData.substring(sData.length() - 9);
      return appPrefix + "\0" + type + sPNG + "+" + sData;
    }

    /**
     * Add or replace the Jmol type text chunk (the first tEXt chunk) with number of
     * bytes of PNG data and number of bytes of Jmol state data.
     * 
     * @param nPNG
     * @param nState
     */
    private void setJmolTypeText(int nPNG, int nState) {
      String s = getApplicationText(nPNG, nState);
      byte[] test = appPrefix.getBytes();
      Chunk c = new Chunk("tEXt", s);
      if (textPt == 1 && data.get(1).startsWith(test)) {
        data.remove(1);
      }
      data.add(1, c);
      textPt = 1;
    }

    /**
     * Read chunks from PNG data. Trailing data will be found in a
     * final (disposable?) null-named chunk.
     * 
     * @return bytes read; dataPt will be end of IEND record
     */
    protected int readDataFromBytes() {
      for (int i = pngIdBytes.length; --i >= 0;)
        if (bytes[i] != pngIdBytes[i])
          return -1;
      dataPt = pngIdBytes.length;
      while (dataPt < bytes.length) {
        if (!readDataChunk())
          break;
      }
      if (!isValid)
        return -1;
      if (dataPt < bytes.length) {
        byte[] extra = new byte[bytes.length - dataPt];
        System.arraycopy(bytes, dataPt, extra, 0, extra.length);
        data.add(new Chunk(null, extra));
      }
      return bytes.length;
    }

    private boolean readDataChunk() {
      int n = readInt4();
      byte[] b = new byte[n];
      String name = new String(readBytes(int4));
      readBytes(b);
      addChunk(new Chunk(name, b));
      dataPt += 4; // past CRC
      return (n > 0 || !name.equals("IEND"));
    }

    private int readInt4() {
      int j = dataPt;
      int n = (bytes[j + 3] & 0xff) | (bytes[j + 2] & 0xff) << 8
          | (bytes[j + 1] & 0xff) << 16 | (bytes[j] & 0xff) << 24;
      dataPt += 4;
      return n | 0; // for JavaScript   
    }

    private byte[] readBytes(byte[] b) {
      System.arraycopy(bytes, dataPt, b, 0, b.length);
      dataPt += b.length;
      return b;
    }

  
  }

  protected class Chunk {
    String name;
    private byte[] bytes;
    private int len, pt;
    private String text;

    protected Chunk(String name, String text) {
      this(name, text.getBytes());
      this.text = text;
    }

    protected Chunk(String name, byte[] bytes) {
      this.name = name;
      this.bytes = bytes;
      len = bytes.length;
    }

    int write() {
      if (name == null) {
        writeBytes(bytes);
      } else {
        writeInt4(len);
        startPos = bytePos;
        writeString(name);
        writeBytes(bytes);
        writeCRC();
      }
      return len;
    }

    public void addByte(int i) {
      bytes[pt++] = (byte) i;
    }

    public void addInt2(int n) {
      getInt2(n, bytes, pt);
      pt += 2;
    }

    public void addInt4(int n) {
      getInt4(n, bytes, pt);
      pt += 4;
    }

    /**
     * @return length of LEN + NAME + bytes + CRC
     */
    public int getWritelength() {
      return len + 12;
    }

    public boolean startsWith(byte[] test) {
      if (bytes.length < test.length)
        return false;
      for (int i = test.length; --i >= 0;)
        if (bytes[i] != test[i]) {
          return false;
        }
      return true;
    }

    @Override
    public String toString() {
      return "[Chunk " + name + " " + len + " " + (text == null ? "" : text) + "]";
    }
  }

  public PngEncoder() {
    super();
  }

  @Override
  protected void setParams(Map<String, Object> params) {
    if (quality < 0) {
      quality = (params.containsKey("qualityPNG")
          ? ((Integer) params.get("qualityPNG")).intValue()
          : 2);
    } else if (quality > 9 && quality < 90) {
      quality = 9;
    }
    dpi = 300;
    if (quality >= 90) {
      // 96, 100, 200, 300, 600, etc.
      dpi = quality;
      quality = 2;
    }
    encodeAlpha = false;
    filter = FILTER_NONE;
    compressionLevel = quality;
    transparentColor = (Integer) params.get("transparentColor");
    comment = (String) params.get("comment");
    String type = (params.get("type") + "0000").substring(0, 4);
    String appPrefix = (String) params.get("pngAppPrefix");
    png = new PNG(type, appPrefix);
    png.bytes = (byte[]) params.get("pngImgData");
    png.appData = (byte[]) params.get("pngAppData");
  }

  @Override
  protected void generate() throws IOException {
    boolean ok;
    try {
      ok = (png.bytes == null ? pngEncode()
          : png.readDataFromBytes() > 0);
      if (ok) {
        writeBytes(pngIdBytes);
        png.writePNGData();
        // for Legacy J2S, do not use out.write(b)
        byte[] b = getBytes();
        out.write(b, 0, b.length);
      }
    } catch (Exception e) {
      e.printStackTrace();
      ok = false;
    }
    if (!ok) {
      out.cancel();
    }
  }

  /**
   * Creates an array of Chunks that is the PNG equivalent of the current image,
   * specifying whether to encode alpha or not.
   * 
   * @return true if successful
   * 
   */
  private boolean pngEncode() {

    //hdrPos = bytePos;
    addHeader();
    addText("Software\0" + comment);
    addText("Creation Time\0" + date);

    if (dpi > 0)
      addPhysicalSize();

    if (!encodeAlpha && transparentColor != null)
      addTransparentColor(transparentColor.intValue());
    //dataPos = bytePos;
    if (!addImageData())
      return false;
    addEnd();
    return true;
  }

  //  /**
  //   * Set the filter to use
  //   *
  //   * @param whichFilter from constant list
  //   */
  //  public void setFilter(int whichFilter) {
  //    this.filter = (whichFilter <= FILTER_LAST ? whichFilter : FILTER_NONE);
  //  }

  //  /**
  //   * Retrieve filtering scheme
  //   *
  //   * @return int (see constant list)
  //   */
  //  public int getFilter() {
  //    return filter;
  //  }

  //  /**
  //   * Set the compression level to use
  //   *
  //   * @param level 0 through 9
  //   */
  //  public void setCompressionLevel(int level) {
  //    if ((level >= 0) && (level <= 9)) {
  //      this.compressionLevel = level;
  //    }
  //  }

  //  /**
  //   * Retrieve compression level
  //   *
  //   * @return int in range 0-9
  //   */
  //  public int getCompressionLevel() {
  //    return compressionLevel;
  //  }

  /**
   * Write a PNG "IHDR" chunk into the pngBytes array.
   */
  private void addHeader() {
    Chunk c = new Chunk("IHDR", new byte[13]);
    c.addInt4(width);
    c.addInt4(height);
    c.addByte(8); // bit depth
    c.addByte(encodeAlpha ? 6 : 2); // color type or direct model
    c.addByte(0); // compression method
    c.addByte(0); // filter method
    c.addByte(0); // no interlace
    png.addChunk(c);
  }

  private void addText(String msg) {
    png.addChunk(new Chunk("tEXt", msg));
  }

  /**
   * Write a PNG "tRNS" chunk into the pngBytes array.
   * 
   * @param icolor
   */
  private void addTransparentColor(int icolor) {
    Chunk c = new Chunk("tRNS", new byte[6]);
    c.addInt2((icolor >> 16) & 0xFF);
    c.addInt2((icolor >> 8) & 0xFF);
    c.addInt2(icolor & 0xFF);
    png.addChunk(c);
  }

  /**
   * Write a PNG "pHYs" chunk into the pngBytes array, setting the dots per
   * meter.
   * 
   */
  private void addPhysicalSize() {
    Chunk c = new Chunk("pHYs", new byte[9]);
    int ppm = (int) Math.round(inchesPerMeter * dpi);
    c.addInt4(ppm);
    c.addInt4(ppm);
    c.addByte(0);
    png.addChunk(c);
  }

  private byte[] scanLines; // the scan lines to be compressed
  private int byteWidth; // width * bytesPerPixel

  //private int hdrPos, dataPos, endPos;
  //private byte[] priorRow;
  //private byte[] leftBytes;

  /**
   * Write the image data into the pngBytes array. This will write one or more
   * PNG "IDAT" chunks. In order to conserve memory, this method grabs as many
   * rows as will fit into 32K bytes, or the whole image; whichever is less.
   * 
   * 
   * @return true if no errors; false if error grabbing pixels
   */
  private boolean addImageData() {

    bytesPerPixel = (encodeAlpha ? 4 : 3);
    byteWidth = width * bytesPerPixel;

    int scanWidth = byteWidth + 1; // the added 1 is for the filter byte

    //boolean doFilter = (filter != FILTER_NONE);

    int rowsLeft = height; // number of rows remaining to write
    //int startRow = 0; // starting row to process this time through
    int nRows; // how many rows to grab at a time

    int scanPos; // where we are in the scan lines

    Deflater deflater = new Deflater(compressionLevel);
    ByteArrayOutputStream outBytes = new ByteArrayOutputStream(1024);

    DeflaterOutputStream compBytes = new DeflaterOutputStream(outBytes,
        deflater);

    int pt = 0; // overall image byte pointer

    // Jmol note: The entire image has been stored in pixels[] already

    try {
      while (rowsLeft > 0) {
        nRows = Math.max(1, Math.min(32767 / scanWidth, rowsLeft));
        scanLines = new byte[scanWidth * nRows];
        //        if (doFilter)
        //          switch (filter) {
        //          case FILTER_SUB:
        //            leftBytes = new byte[16];
        //            break;
        //          case FILTER_UP:
        //            priorRow = new byte[scanWidth - 1];
        //            break;
        //          }
        int nPixels = width * nRows;
        scanPos = 0;
        //startPos = 1;
        for (int i = 0; i < nPixels; i++, pt++) {
          if (i % width == 0) {
            scanLines[scanPos++] = (byte) filter;
            //startPos = scanPos;
          }
          scanLines[scanPos++] = (byte) ((pixels[pt] >> 16) & 0xff);
          scanLines[scanPos++] = (byte) ((pixels[pt] >> 8) & 0xff);
          scanLines[scanPos++] = (byte) ((pixels[pt]) & 0xff);
          if (encodeAlpha) {
            scanLines[scanPos++] = (byte) ((pixels[pt] >> 24) & 0xff);
          }
          //          if (doFilter && i % width == width - 1) {
          //            switch (filter) {
          //            case FILTER_SUB:
          //              filterSub();
          //              break;
          //            case FILTER_UP:
          //              filterUp();
          //              break;
          //            }
          //          }
        }

        /*
         * Write these lines to the output area
         */
        compBytes.write(scanLines, 0, scanPos);

        //startRow += nRows;
        rowsLeft -= nRows;
      }
      compBytes.close();

      /*
       * Write the compressed bytes
       */
      byte[] compressedLines = outBytes.toByteArray();
      deflater.finish();
      png.addChunk(new Chunk("IDAT", compressedLines));
      return true;
    } catch (IOException e) {
      System.err.println(e.toString());
      return false;
    }
  }

  /**
   * Write a PNG "IEND" chunk into the pngBytes array.
   */
  private void addEnd() {
    png.addChunk(new Chunk("IEND", new byte[0]));
  }

  ///**
  //* Perform "sub" filtering on the given row.
  //* Uses temporary array leftBytes to store the original values
  //* of the previous pixels.  The array is 16 bytes long, which
  //* will easily hold two-byte samples plus two-byte alpha.
  //*
  //*/
  //private void filterSub() {
  // int offset = bytesPerPixel;
  // int actualStart = startPos + offset;
  // int leftInsert = offset;
  // int leftExtract = 0;
  // //byte current_byte;
  //
  // for (int i = actualStart; i < startPos + byteWidth; i++) {
  //   leftBytes[leftInsert] = scanLines[i];
  //   scanLines[i] = (byte) ((scanLines[i] - leftBytes[leftExtract]) % 256);
  //   leftInsert = (leftInsert + 1) % 0x0f;
  //   leftExtract = (leftExtract + 1) % 0x0f;
  // }
  //}
  //
  ///**
  //* Perform "up" filtering on the given row. Side effect: refills the prior row
  //* with current row
  //* 
  //*/
  //private void filterUp() {
  // int nBytes = width * bytesPerPixel;
  // for (int i = 0; i < nBytes; i++) {
  //   int pt = startPos + i;
  //   byte b = scanLines[pt];
  //   scanLines[pt] = (byte) ((scanLines[pt] - priorRow[i]) % 256);
  //   priorRow[i] = b;
  // }
  //}

}
