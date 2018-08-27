package javajs.util;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javajs.api.BytePoster;
import javajs.api.GenericOutputChannel;
import javajs.api.js.J2SObjectInterface;

/**
 * 
 * A generic output method. JmolOutputChannel can be used to:
 * 
 * add characters to a StringBuffer 
 *   using fileName==null, append() and toString()
 *   
 * add bytes utilizing ByteArrayOutputStream 
 *   using writeBytes(), writeByteAsInt(), append()*, and bytesAsArray()
 *       *append() can be used as long as os==ByteArrayOutputStream
 *        or it is not used before one of the writeByte methods. 
 * 
 * output characters to a FileOutputStream 
 *  using os==FileOutputStream, asWriter==true, append(), and closeChannel()
 *  
 * output bytes to a FileOutputStream 
 *  using os==FileOutputStream, writeBytes(), writeByteAsInt(), append(), and closeChannel()
 * 
 * post characters or bytes to a remote server
 *  using fileName=="http://..." or "https://...",
 *    writeBytes(), writeByteAsInt(), append(), and closeChannel()
 *    
 * send characters or bytes to a JavaScript function
 *  when JavaScript and (typeof fileName == "function")
 *  
 * if fileName equals ";base64,", then the data are base64-encoded
 * prior to writing, and closeChannel() returns the data.
 * 
 *  @author hansonr  Bob Hanson hansonr@stolaf.edu  9/2013
 *  
 *  
 */

public class OC extends OutputStream implements GenericOutputChannel {
 
  private BytePoster bytePoster; // only necessary for writing to http:// or https://
  private String fileName;
  private BufferedWriter bw;
  private boolean isLocalFile;
  private int byteCount;
  private boolean isCanceled;
  private boolean closed;
  private OutputStream os;
  private SB sb;
  private String type;
	private boolean isBase64;
	private OutputStream os0;
	private byte[] bytes; // preset bytes; output only
  
	public boolean bigEndian = true;

	private boolean isTemp;
	
	/**
	 * Setting isTemp=true informs OC that this is a temporary file 
	 * and not to send it to the user as a "download". Instead, the calling
	 * class can use .toByteArray() to retrieve the byte[] result.
	 * 
	 * @param tf
	 */
	public void setTemp(boolean tf) {
		isTemp = tf;
	}


  
  @Override
  public boolean isBigEndian() {
    return bigEndian;
  }

  public void setBigEndian(boolean TF) {
  	bigEndian = TF;
  }

	/**
	 * Set up an output channel. String or byte data can be added without problem.
	 * 
	 * @param bytePoster a byte poster can take the output byte[] when closing and
	 *                   do something with them
	 * @param fileName   TODO: It is possible that JavaScript will call this with a
	 *                   function name for fileName
	 * @param asWriter   string-based
	 * @param os         the desired target OutputStream - not the calling stream!
	 * @return
	 */
  public OC setParams(BytePoster bytePoster, String fileName,
                                     boolean asWriter, OutputStream os) {
    this.bytePoster = bytePoster;
    isBase64 = ";base64,".equals(fileName);
    if (isBase64) {
    	fileName = null;
    	os0 = os;
    	os = null;
    }
    this.fileName = fileName;
    this.os = os;
    isLocalFile = (fileName != null && !isRemote(fileName));
    if (asWriter && !isBase64 && os != null) 
    	bw = Rdr.getBufferedWriter(os, null);
    return this;
  }

  public OC setBytes(byte[] b) {
  	bytes = b;
  	return this;
  }
  
  public String getFileName() {
    return fileName;
  }
  
  public String getName() {
    return (fileName == null ? null : fileName.substring(fileName.lastIndexOf("/") + 1));
  }

  public int getByteCount() {
    return byteCount;
  }

  /**
   * 
   * @param type  user-identified type (PNG, JPG, etc)
   */
  public void setType(String type) {
    this.type = type;
  }
  
  public String getType() {
    return type;
  }

  /**
   * will go to string buffer if bw == null and os == null
   * 
   * @param s
   * @return this, for chaining like a standard StringBuffer
   * 
   */
  public OC append(String s) {
    try {
      if (bw != null) {
        bw.write(s);
      } else if (os == null) {
        if (sb == null)
          sb = new SB();
        sb.append(s);
      } else {
        byte[] b = s.getBytes();
        os.write(b, 0, b.length);
        byteCount += b.length;
        return this;
      }
    } catch (IOException e) {
      // ignore
    }
    byteCount += s.length(); // not necessarily exactly correct if unicode
    return this;
  }

  @Override
  public void reset() {
    sb = null;
    initOS();
  }


  private void initOS() {
    if (sb != null) {
      String s = sb.toString();
      reset();
      append(s);
      return;
    }
    try {
      /**
       * @j2sNative
       * 
       *            this.os = null;
       */
      {
        if (os instanceof FileOutputStream) {
          os.close();
          os = new FileOutputStream(fileName);
        } else {
          os = null;
        }
      }
      if (os == null)
        os = new ByteArrayOutputStream();
      if (bw != null) {
        bw.close();
        bw = Rdr.getBufferedWriter(os, null);
      }
    } catch (Exception e) {
      // not perfect here.
      System.out.println(e.toString());
    }
    byteCount = 0;
  }

  /**
   * @param b  
   */
  @Override
  public void writeByteAsInt(int b) {
    if (os == null)
      initOS();
    {
      try {
        os.write(b);
      } catch (IOException e) {
      }
    }
    byteCount++;
  }
  
  @Override
  public void write(byte[] buf, int i, int len) {
    if (os == null)
      initOS();
    try {
      os.write(buf, i, len);
    } catch (IOException e) {
    }
    byteCount += len;
  }
  
  @Override
  public void writeShort(short i) {
    if (isBigEndian()) {
      writeByteAsInt(i >> 8);
      writeByteAsInt(i);
    } else {
      writeByteAsInt(i);
      writeByteAsInt(i >> 8);
    }
  }

  @Override
  public void writeLong(long b) {
    if (isBigEndian()) {
      writeInt((int) ((b >> 32) & 0xFFFFFFFFl));
      writeInt((int) (b & 0xFFFFFFFFl));
    } else {
      writeByteAsInt((int) (b >> 56));
      writeByteAsInt((int) (b >> 48));
      writeByteAsInt((int) (b >> 40));
      writeByteAsInt((int) (b >> 32));
      writeByteAsInt((int) (b >> 24));
      writeByteAsInt((int) (b >> 16));
      writeByteAsInt((int) (b >> 8));
      writeByteAsInt((int) b);
    }
  }

  public void write(int b) {
    // required by standard ZipOutputStream -- do not use, as it will break JavaScript methods
    if (os == null)
      initOS();
    try {
      os.write(b);
    } catch (IOException e) {
    }
    byteCount++;
  }

  public void write(byte[] b) {
    // not used in JavaScript due to overloading problem there
    write(b, 0, b.length);
  }

  public void cancel() {
    isCanceled = true;
    closeChannel();
  }

  @Override
  @SuppressWarnings({ "unused" })
  public String closeChannel() {
    if (closed)
      return null;
    // can't cancel file writers
    try {
      if (bw != null) {
        bw.flush();
        bw.close();
      } else if (os != null) {
        os.flush();
        os.close();
      }
      if (os0 != null && isCanceled) {
        os0.flush();
        os0.close();
      }
    } catch (Exception e) {
      // ignore closing issues
    }
    if (isCanceled) {
      closed = true;
      return null;
    }
    if (fileName == null) {
      if (isBase64) {
        String s = getBase64();
        if (os0 != null) {
          os = os0;
          append(s);
        }
        sb = new SB();
        sb.append(s);
        isBase64 = false;
        return closeChannel();
      }
      return (sb == null ? null : sb.toString());
    }
    closed = true;
    J2SObjectInterface J2S = null;
    Object _function = null;
    /**
     * @j2sNative
     * 
     *            J2S = self.J2S || self.Jmol; _function = (typeof this.fileName == "function" ?
     *            this.fileName : null);
     * 
     */
    {
      if (!isLocalFile) {
        String ret = postByteArray(); // unsigned applet could do this
        if (ret.startsWith("java.net"))
          byteCount = -1;
        return ret;
      }
    }
    if (J2S != null && !isTemp) {
    	
      // action here generally will be for the browser to display a download message
      // temp files will not be sent this way.
      Object data = (sb == null ? toByteArray() : sb.toString());
      if (_function == null)
        J2S.doAjax(fileName, null, data, sb == null);
      else
        J2S.applyFunc(_function, data);
    }
    return null;
  }

	public boolean isBase64() {
		return isBase64;
	}

	public String getBase64() {
    return Base64.getBase64(toByteArray()).toString();
	}
	
  public byte[] toByteArray() {
    return (bytes != null ? bytes : (bytes = os instanceof ByteArrayOutputStream ? ((ByteArrayOutputStream)os).toByteArray() : 
    	sb == null ? null : sb.toBytes(0, sb.length())));
  }

  @Override
  @Deprecated
  public void close() {
    closeChannel();
  }

  @Override
  public String toString() {
    if (bw != null)
      try {
        bw.flush();
      } catch (IOException e) {
        // TODO
      }
    if (sb != null)
      return closeChannel();
    return byteCount + " bytes";
  }

  /**
   * We have constructed some sort of byte[] that needs to be posted to a remote site.
   * We don't do that posting here -- we let the bytePoster do it.
   * 
   * @return
   */
  private String postByteArray() {
    return bytePoster == null ? null : bytePoster.postByteArray(fileName, toByteArray());
  }

  public final static String[] urlPrefixes = { "http:", "https:", "sftp:", "ftp:",
  "file:" };
  // note that SFTP is not supported
  public final static int URL_LOCAL = 4;

  public static boolean isRemote(String fileName) {
    if (fileName == null)
      return false;
    int itype = urlTypeIndex(fileName);
    return (itype >= 0 && itype != URL_LOCAL);
  }

  public static boolean isLocal(String fileName) {
    if (fileName == null)
      return false;
    int itype = urlTypeIndex(fileName);
    return (itype < 0 || itype == URL_LOCAL);
  }

  public static int urlTypeIndex(String name) {
    if (name == null)
      return -2; // local unsigned applet
    for (int i = 0; i < urlPrefixes.length; ++i) {
      if (name.startsWith(urlPrefixes[i])) {
        return i;
      }
    }
    return -1;
  }

  @Override
  public void writeInt(int i) {
    if (bigEndian) {
      writeByteAsInt(i >> 24);
      writeByteAsInt(i >> 16);
      writeByteAsInt(i >> 8);
      writeByteAsInt(i);
    } else {
      writeByteAsInt(i);
      writeByteAsInt(i >> 8);
      writeByteAsInt(i >> 16);
      writeByteAsInt(i >> 24);
    }
  }

  public void writeFloat(float x) {
    writeInt(x == 0 ? 0 : Float.floatToIntBits(x));
  }

}
