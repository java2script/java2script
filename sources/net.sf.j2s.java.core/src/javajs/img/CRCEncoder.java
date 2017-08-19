package javajs.img;

import java.util.zip.CRC32;


import javajs.util.AU;

abstract class CRCEncoder extends ImageEncoder {

  protected int startPos, bytePos;
  
  private CRC32 crc;  
  protected byte[] pngBytes;  
  protected int dataLen;
  private byte[] int2 = new byte[2];
  private byte[] int4 = new byte[4];

  CRCEncoder() {
    pngBytes = new byte[250];
    crc = new CRC32();
  }

  protected void setData(byte[] b, int pt) {
    pngBytes = b;
    dataLen = b.length;
    startPos = bytePos = pt;
  }

  protected byte[] getBytes() {
    return (dataLen == pngBytes.length ? pngBytes : AU.arrayCopyByte(
        pngBytes, dataLen));
  }

  protected void writeCRC() {
    crc.reset();
    crc.update(pngBytes, startPos, bytePos - startPos);
    writeInt4((int) crc.getValue());
  }

  /**
   * Write a two-byte integer into the pngBytes array at a given position.
   *
   * @param n The integer to be written into pngBytes.
   */
  protected void writeInt2(int n) {
    int2[0] = (byte) ((n >> 8) & 0xff);
    int2[1] = (byte) (n & 0xff);
    writeBytes(int2);
  }

  /**
   * Write a four-byte integer into the pngBytes array at a given position.
   *
   * @param n The integer to be written into pngBytes.
   */
  protected void writeInt4(int n) {
    getInt4(n, int4);
    writeBytes(int4);
  }

  protected static void getInt4(int n, byte[] int4) {
    int4[0] = (byte) ((n >> 24) & 0xff);
    int4[1] = (byte) ((n >> 16) & 0xff);
    int4[2] = (byte) ((n >> 8) & 0xff);
    int4[3] = (byte) (n & 0xff);
  }

  /**
   * Write a single byte into the pngBytes array at a given position.
   *
   * @param b The byte to be written into pngBytes.
   */
  protected void writeByte(int b) {
    byte[] temp = {
      (byte) b
    };
    writeBytes(temp);
  }

  /**
   * Write a string into the pngBytes array at a given position.
   * This uses the getBytes method, so the encoding used will
   * be its default.
   *
   * @param s The string to be written into pngBytes.
   * @see java.lang.String#getBytes()
   */
  protected void writeString(String s) {
    writeBytes(s.getBytes());
  }

  /**
   * Write an array of bytes into the pngBytes array. 
   * Both dataLen and bytePos are updated. If we don't have 
   * enough room, this is certainly in image data writing,
   * so we add just enough for CRC END CRC
   * 
   * @param data
   *        The data to be written into pngBytes.
   */
  protected void writeBytes(byte[] data) {
    int newPos = bytePos + data.length;
    dataLen = Math.max(dataLen, newPos);
    if (newPos > pngBytes.length)
      pngBytes = AU.arrayCopyByte(pngBytes, newPos + 16);
    System.arraycopy(data, 0, pngBytes, bytePos, data.length);
    bytePos = newPos;
  }

}
