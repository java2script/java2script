/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2007-04-26 16:57:51 -0500 (Thu, 26 Apr 2007) $
 * $Revision: 7502 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2005  The Jmol Development Team
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

/**
 * created to remove ambiguities and make a simpler DecimalFormat
 */
public class DF {

  private final static String[] formattingStrings = { "0", "0.0", "0.00",
      "0.000", "0.0000", "0.00000", "0.000000", "0.0000000", "0.00000000",
      "0.000000000" };
  private final static String zeros = "0000000000000000000000000000000000000000";

  private final static float[] formatAdds = { 0.5f, 0.05f, 0.005f, 0.0005f,
      0.00005f, 0.000005f, 0.0000005f, 0.00000005f, 0.000000005f, 0.0000000005f };

  private final static Boolean[] useNumberLocalization = new Boolean[] { Boolean.TRUE };

  public static void setUseNumberLocalization(boolean TF) {
    useNumberLocalization[0] = (TF ? Boolean.TRUE : Boolean.FALSE);
  }

  public static String formatDecimalDbl(double value, int decimalDigits) {
    if (decimalDigits == Integer.MAX_VALUE 
        || value == Double.NEGATIVE_INFINITY
        || value == Double.POSITIVE_INFINITY 
        || Double.isNaN(value))
      return "" + value;
    return DF.formatDecimal((float) value, decimalDigits);
  }

  /**
   * a simple alternative to DecimalFormat (which Java2Script does not have
   * and which is quite too complex for our use here.)
   * 
   * @param value
   * @param decimalDigits
   * @return  formatted decimal
   */
  public static String formatDecimal(float value, int decimalDigits) {
    if (decimalDigits == Integer.MAX_VALUE 
        || value == Float.NEGATIVE_INFINITY || value == Float.POSITIVE_INFINITY || Float.isNaN(value))
      return "" + value;
    int n;
    if (decimalDigits < 0) {
      decimalDigits = -decimalDigits;
      if (decimalDigits > formattingStrings.length)
        decimalDigits = formattingStrings.length;
      if (value == 0)
        return formattingStrings[decimalDigits - 1] + "E+0";
      //scientific notation
      n = 0;
      double d;
      if (Math.abs(value) < 1) {
        n = 10;
        d = value * 1e-10;
      } else {
        n = -10;
        d = value * 1e10;
      }
      String s = ("" + d).toUpperCase();
      int i = s.indexOf("E");
      n = PT.parseInt(s.substring(i + 1)) + n;
      String sf;
      if (i < 0) {
        sf = "" + value;
      } else {
        float f = PT.parseFloat(s.substring(0, i));
        if (f == 10 || f == -10) {
          //d = 9.99999997465; n = -6 --> 10.00000E-5
          f /= 10;
          n += (n < 0 ? 1 : -1);          
        }
        sf = formatDecimal(f, decimalDigits - 1);
      }
      return sf  + "E" + (n >= 0 ? "+" : "") + n;
    }
  
    if (decimalDigits >= formattingStrings.length)
      decimalDigits = formattingStrings.length - 1;
    String s1 = ("" + value).toUpperCase();
    int pt = s1.indexOf(".");
    if (pt < 0) // specifically JavaScript "-2" not "-2.0"
      return s1 + formattingStrings[decimalDigits].substring(1);
    boolean isNeg = s1.startsWith("-");
    if (isNeg) {
      s1 = s1.substring(1);
      pt--;
    }
    int pt1 = s1.indexOf("E-");
    if (pt1 > 0) {
      n = PT.parseInt(s1.substring(pt1 + 1));
      // 3.567E-2
      // 0.03567
      s1 = "0." + zeros.substring(0, -n - 1) + s1.substring(0, 1) + s1.substring(2, pt1);
      pt = 1; 
    }
  
    pt1 = s1.indexOf("E");
    // 3.5678E+3
    // 3567.800000000
    // 1.234E10 %3.8f -> 12340000000.00000000
    if (pt1 > 0) {
      n = PT.parseInt(s1.substring(pt1 + 1));
      s1 = s1.substring(0, 1) + s1.substring(2, pt1) + zeros;
      s1 = s1.substring(0, n + 1) + "." + s1.substring(n + 1);
      pt = s1.indexOf(".");
    } 
    // "234.345667  len == 10; pt = 3
    // "  0.0 "  decimalDigits = 1
    
    int len = s1.length();
    int pt2 = decimalDigits + pt + 1;
    if (pt2 < len && s1.charAt(pt2) >= '5') {
      return formatDecimal(
          value + (isNeg ? -1 : 1) * formatAdds[decimalDigits], decimalDigits);
    }
  
    SB sb = SB.newS(s1.substring(0, (decimalDigits == 0 ? pt
        : ++pt)));
    for (int i = 0; i < decimalDigits; i++, pt++) {
      if (pt < len)
        sb.appendC(s1.charAt(pt));
      else
        sb.appendC('0');
    }
    s1 = (isNeg ? "-" : "") + sb;
    return (Boolean.TRUE.equals(useNumberLocalization[0]) ? s1 : s1.replace(',',
        '.'));
  }

  /**
   * an alternative to DecimalFormat "0.#"
   * 
   * @param x
   * @param precision
   * @return  formatted number 
   */
  public static String formatDecimalTrimmed(double x, int precision) {
    String str = formatDecimalDbl(x, precision);
    int m = str.length() - 1;
    char zero = '0';
    while (m >= 0 && str.charAt(m) == zero)
      m--;
    return str.substring(0, m + 1); // 0.##...
  }

}
