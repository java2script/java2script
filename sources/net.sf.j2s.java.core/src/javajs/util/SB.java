
package javajs.util;

import java.nio.charset.Charset;

/**
 * Interesting thing here is that JavaScript is 3x faster than Java in handling strings.
 * 
 * Java StringBuilder is final, unfortunately. I guess they weren't thinking about Java2Script!
 * 
 * The reason we have to do this that several overloaded append methods is WAY too expensive
 * 
 */

public class SB {
  
  private java.lang.StringBuilder sb;
  String s; // used by JavaScript only; no Java references
  
  //TODO: JS experiment with using array and .push() here

  public SB() {
    /**
     * @j2sNative
     * 
     *            this.s = "";
     * 
     */
    {
      sb = new java.lang.StringBuilder();
    }
  }

  public static SB newN(int n) {
    /**
     * @j2sNative
     *            return new javajs.util.SB(); 
     */
    {
      // not perfect, because it requires defining sb twice. 
      // We can do better...
      SB sb = new SB();
      sb.sb = new java.lang.StringBuilder(n);
      return sb;
    }
  }

  public static SB newS(String s) {
    /**
     * @j2sNative 
     * 
     * var sb = new javajs.util.SB();
     * sb.s = s;
     * return sb; 
     * 
     */
    {
    SB sb = new SB();
    sb.sb = new java.lang.StringBuilder(s);
    return sb;
    }
  }

  public SB append(String s) {
    /**
     * @j2sNative
     * 
     *            this.s += s
     * 
     */
    {
      sb.append(s);
    }
    return this;
  }
  
  public SB appendC(char c) {
    /**
     * @j2sNative
     * 
     *            this.s += c;
     */
    {
      sb.append(c);
    }
    return this;
    
  }

  public SB appendI(int i) {
    /**
     * @j2sNative
     * 
     *            this.s += i
     * 
     */
    {
      sb.append(i);
    }
    return this;
  }

  public SB appendB(boolean b) {
    /**
     * @j2sNative
     * 
     *            this.s += b
     * 
     */
    {
      sb.append(b);
    }
    return this;
  }

  /**
   * note that JavaScript could drop off the ".0" in "1.0"
   * @param f
   * @return this
   */
  public SB appendF(float f) {
    /**
     * @j2sNative
     * 
     * var sf = "" + f;
     * if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
     *   sf += ".0" ;
     *            this.s += sf;
     * 
     */
    {
      sb.append(f);
    }
    return this;
  }

  public SB appendD(double d) {
    /**
     * @j2sNative
     * 
     * var sf = "" + d;
     * if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
     *   sf += ".0" ;
     *            this.s += sf;
     * 
     */
    {
      sb.append(d);
    }
    return this;
  }

  public SB appendSB(SB buf) {
    /**
     * @j2sNative
     * 
     *            this.s += buf.s;
     * 
     */
    {
      sb.append(buf.sb);
    }
    return this;
  }

  public SB appendO(Object data) {
    if (data != null) {
      /**
       * @j2sNative
       * 
       *            this.s += data.toString();
       * 
       */
      {
        sb.append(data);
      }
    }
    return this;
  }

  public void appendCB(char[] cb, int off, int len) {
    /**
     * @j2sNative
     * 
     * this.s += cb.slice(off,off+len).join("");
     * 
     */
    {
       sb.append(cb, off, len);
    }
  }

  @Override
  public String toString() {
    /**
     * @j2sNative
     * 
     *            return this.s;
     * 
     */
    {
      return sb.toString();
    }
  }

  public int length() {
    /**
     * @j2sNative
     * 
     *            return this.s.length;
     * 
     */
    {
      return sb.length();
    }
  }

  public int indexOf(String s) {
    /**
     * @j2sNative
     * 
     *            return this.s.indexOf(s);
     * 
     */
    {
      return sb.indexOf(s);
    }
  }

  public char charAt(int i) {
    /**
     * @j2sNative
     * 
     *            return this.s.charAt(i);
     * 
     */
    {
      return sb.charAt(i);
    }
  }

  public int charCodeAt(int i) {
    /**
     * @j2sNative
     * 
     *            return this.s.charCodeAt(i);
     * 
     */
    {
      return sb.codePointAt(i);
    }
  }

  public void setLength(int n) {
    /**
     * @j2sNative
     * 
     *            this.s = this.s.substring(0, n);
     */
    {
      sb.setLength(n);
    }
  }

  public int lastIndexOf(String s) {
    /**
     * @j2sNative
     * 
     *            return this.s.lastIndexOf(s);
     */
    {
      return sb.lastIndexOf(s);
    }
  }

  public int indexOf2(String s, int i) {
    /**
     * @j2sNative
     * 
     *            return this.s.indexOf(s, i);
     */
    {
      return sb.indexOf(s, i);
    }
  }

  public String substring(int i) {
    /**
     * @j2sNative
     * 
     *            return this.s.substring(i);
     */
    {
      return sb.substring(i);
    }
  }

  public String substring2(int i, int j) {
    /**
     * @j2sNative
     * 
     *            return this.s.substring(i, j);
     */
    {
      return sb.substring(i, j);
    }
  }

  /**
   * simple byte conversion properly implementing UTF-8. * Used for base64
   * conversion and allows for offset
   * 
   * @param off
   * @param len
   *        or -1 for full length (then off must = 0)
   * @return byte[]
   */
  public byte[] toBytes(int off, int len) {
    if (len == 0)
      return new byte[0];
    Charset cs;
    /**
     * 
     * just a string in JavaScript
     * 
     * @j2sNative
     * 
     *            cs = "UTF-8";
     * 
     */
    {
      cs = Charset.forName("UTF-8");
    }
    return (len > 0 ? substring2(off, off + len) 
        : off == 0 ? toString()
        : substring2(off, length() - off)).getBytes(cs);
  }

	public void replace(int start, int end, String str) {
		/**
		 * @j2sNative
		 * 
		 * this.s = this.s.substring(0, start) + str + this.s.substring(end);
		 */
		{
			sb.replace(start, end, str);
		}
	}

	public void insert(int offset, String str) {
		replace(offset, offset, str);
	}

}
