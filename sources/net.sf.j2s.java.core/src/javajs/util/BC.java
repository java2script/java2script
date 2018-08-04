package javajs.util;

/**
 * byte converter
 * 
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 * 
 */
public class BC {

  public BC() {
    // unnecessary to instantialize unless subclassed
  }
  
  public static float bytesToFloat(byte[] bytes, int j, boolean isBigEndian) throws Exception {
    return intToFloat(bytesToInt(bytes, j, isBigEndian));
  }

  public static int bytesToShort(byte[] bytes, int j, boolean isBigEndian) {
    int n = (isBigEndian ? (bytes[j + 1] & 0xff) | (bytes[j] & 0xff) << 8
        : (bytes[j++] & 0xff) | (bytes[j++] & 0xff) << 8);
      return (n > 0x7FFF ? n - 0x10000 : n);
  }

  public static int bytesToInt(byte[] bytes, int j, boolean isBigEndian) {
    int n = (isBigEndian ? (bytes[j + 3] & 0xff) | (bytes[j + 2] & 0xff) << 8
        | (bytes[j + 1] & 0xff) << 16 | (bytes[j] & 0xff) << 24
        : (bytes[j++] & 0xff) | (bytes[j++] & 0xff) << 8
            | (bytes[j++] & 0xff) << 16 | (bytes[j++] & 0xff) << 24);
    
    return (/** @j2sNative (n|0) || */ n); 
//    /**
//     * xxxxxxj2sNative
//     * 
//     * return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
//     *   
//     */
//    {
//      return n;
//    }
  }

  public static int intToSignedInt(int n) {
	  
	    return (/** @j2sNative n || */ n); 

//    /**
//     * xxxxxxj2sNative
//     * 
//     * return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
//     *   
//     */
//    {
//      return n;
//    }    
  }
  public static float intToFloat(int x) throws Exception {
    
//    // see http://en.wikipedia.org/wiki/Binary32
//    // 
//    // [sign]      [8 bits power] [23 bits fraction]
//    // 0x80000000  0x7F800000      0x7FFFFF
//    // 
//    // (untested)
//		if (x == 0)
//			return 0;
//	boolean isJS = /** xxxxxxj2sNative true | */false;
//	
//	
//	if (isJS) {
//        if (fracIEEE == null)
//            setFracIEEE();		
//        int m =  ((x & 0x7F800000) >> 23);
//        *       return ((x & 0x80000000) == 0 ? 1 : -1) * o.shiftIEEE$D$I((x & 0x7FFFFF) | 0x800000, m - 149);
//
//	}
//	 /** 
//     * 
//     * xxxxxxj2sNative
//     * 
//     *       if (x == 0) return 0;
//     *       var o = javajs.util.BC;
//     *       if (o.fracIEEE$ == null)
//     *         o.setFracIEEE$();
//     *       var m = ((x & 0x7F800000) >> 23);
//     *       return ((x & 0x80000000) == 0 ? 1 : -1) * o.shiftIEEE$D$I((x & 0x7FFFFF) | 0x800000, m - 149);
//     *  
//     */
//    {
    return Float.intBitsToFloat(x);
 //   }
  }

  /**
   * see http://en.wikipedia.org/wiki/Binary64
   *  
   * not concerning ourselves with very small or very large numbers and getting
   * this exactly right. Just need a float here.
   * 
   * @param bytes
   * @param j
   * @param isBigEndian
   * @return float
   */
  public static float bytesToDoubleToFloat(byte[] bytes, int j, boolean isBigEndian) {
    {
      // IEEE754: sign (1 bit), exponent (11 bits), fraction (52 bits).
      // seeeeeee eeeeffff ffffffff ffffffff ffffffff xxxxxxxx xxxxxxxx xxxxxxxx
      //     b1      b2       b3       b4       b5    ---------float ignores----

        if (fracIEEE == null)
           setFracIEEE();
        
      /**
       * @j2sNative
       *       var b1, b2, b3, b4, b5;
       *       
       *       if (isBigEndian) {
       *       b1 = bytes[j] & 0xFF;
       *       b2 = bytes[j + 1] & 0xFF;
       *       b3 = bytes[j + 2] & 0xFF;
       *       b4 = bytes[j + 3] & 0xFF;
       *       b5 = bytes[j + 4] & 0xFF;
       *       } else {
       *       b1 = bytes[j + 7] & 0xFF;
       *       b2 = bytes[j + 6] & 0xFF;
       *       b3 = bytes[j + 5] & 0xFF;
       *       b4 = bytes[j + 4] & 0xFF;
       *       b5 = bytes[j + 3] & 0xFF;
       *       }
       *       var s = ((b1 & 0x80) == 0 ? 1 : -1);
       *       var e = (((b1 & 0x7F) << 4) | (b2 >> 4)) - 1026;
       *       b2 = (b2 & 0xF) | 0x10;
       *       return s * (C$.shiftIEEE$D$I(b2, e) +C$.shiftIEEE$D$I(b3, e - 8) + C$.shiftIEEE$D$I(b4, e - 16)
       *         + C$.shiftIEEE$D$I(b5, e - 24));
       */
      {
        double d;
        
        if (isBigEndian)
          d = Double.longBitsToDouble((((long) bytes[j]) & 0xff) << 56
             | (((long) bytes[j + 1]) & 0xff) << 48
             | (((long) bytes[j + 2]) & 0xff) << 40
             | (((long) bytes[j + 3]) & 0xff) << 32
             | (((long) bytes[j + 4]) & 0xff) << 24
             | (((long) bytes[j + 5]) & 0xff) << 16
             | (((long) bytes[j + 6]) & 0xff) << 8 
             | (((long) bytes[7]) & 0xff));
        else
          d = Double.longBitsToDouble((((long) bytes[j + 7]) & 0xff) << 56
             | (((long) bytes[j + 6]) & 0xff) << 48
             | (((long) bytes[j + 5]) & 0xff) << 40
             | (((long) bytes[j + 4]) & 0xff) << 32
             | (((long) bytes[j + 3]) & 0xff) << 24
             | (((long) bytes[j + 2]) & 0xff) << 16
             | (((long) bytes[j + 1]) & 0xff) << 8 
             | (((long) bytes[j]) & 0xff));
        return (float) d;
      }

    }
  }

  private static float[] fracIEEE;

  private static void setFracIEEE() {
    fracIEEE = new float[270];
    for (int i = 0; i < 270; i++)
      fracIEEE[i] = (float) Math.pow(2, i - 141);
    //    System.out.println(fracIEEE[0] + "  " + Parser.FLOAT_MIN_SAFE);
    //    System.out.println(fracIEEE[269] + "  " + Float.MAX_VALUE);
  }

  /**
   * only concerned about reasonable float values here -- private but not designated; called by JavaScript
   * 
   * @param f
   * @param i
   * @return f * 2^i
   */
  static double shiftIEEE(double f, int i) {
    if (f == 0 || i < -140)
      return 0;
    if (i > 128)
      return Float.MAX_VALUE;
    return f * fracIEEE[i + 140];
  }

//  static {
//    setFracIEEE();
//    for (int i = -50; i < 50; i++) {
//      float f = i * (float) (Math.random() * Math.pow(2, Math.random() * 100 - 50));
//      int x = Float.floatToIntBits(f);
//      int m = ((x & 0x7F800000) >> 23);
//      float f1 = (float) (f == 0 ? 0 : ((x & 0x80000000) == 0 ? 1 : -1) * shiftIEEE((x & 0x7FFFFF) | 0x800000, m - 149));
//      System.out.println(f + "  " + f1);
//    }
//    System.out.println("binarydo");
//  }



}
