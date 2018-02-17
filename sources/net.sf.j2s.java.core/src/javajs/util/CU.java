package javajs.util;

import java.util.Hashtable;
import java.util.Map;

import javajs.api.GenericColor;

/**
 * ColorUtility 
 * 
 */

public class CU {

  public static String toRGBHexString(GenericColor c) {
    int rgb = c.getRGB();    
    if (rgb == 0)
      return "000000";
    String r  = "00" + Integer.toHexString((rgb >> 16) & 0xFF);
    r = r.substring(r.length() - 2);
    String g  = "00" + Integer.toHexString((rgb >> 8) & 0xFF);
    g = g.substring(g.length() - 2);
    String b  = "00" + Integer.toHexString(rgb & 0xFF);
    b = b.substring(b.length() - 2);
    return r + g + b;
  }

  public static String toCSSString(GenericColor c) {
    int opacity = c.getOpacity255();
    if (opacity == 255)
      return "#" + toRGBHexString(c);
    int rgb = c.getRGB();
    return "rgba(" + ((rgb>>16)&0xFF) + "," + ((rgb>>8)&0xff) + "," + (rgb&0xff) + "," + opacity/255f  + ")"; 
  }
  
  private final static String[] colorNames = {
    "black",                // 000000
    "pewhite",              // ffffff
    "pecyan",               // 00ffff
    "pepurple",             // d020ff
    "pegreen",              // 00ff00
    "peblue",               // 6060ff
    "peviolet",             // ff80c0
    "pebrown",              // a42028
    "pepink",               // ffd8d8
    "peyellow",             // ffff00
    "pedarkgreen",          // 00c000
    "peorange",             // ffb000
    "pelightblue",          // b0b0ff
    "pedarkcyan",           // 00a0a0
    "pedarkgray",           // 606060
  
    "aliceblue",            // F0F8FF
    "antiquewhite",         // FAEBD7
    "aqua",                 // 00FFFF
    "aquamarine",           // 7FFFD4
    "azure",                // F0FFFF
    "beige",                // F5F5DC
    "bisque",               // FFE4C4
    "blanchedalmond",       // FFEBCD
    "blue",                 // 0000FF
    "blueviolet",           // 8A2BE2
    "brown",                // A52A2A
    "burlywood",            // DEB887
    "cadetblue",            // 5F9EA0
    "chartreuse",           // 7FFF00
    "chocolate",            // D2691E
    "coral",                // FF7F50
    "cornflowerblue",       // 6495ED
    "cornsilk",             // FFF8DC
    "crimson",              // DC143C
    "cyan",                 // 00FFFF
    "darkblue",             // 00008B
    "darkcyan",             // 008B8B
    "darkgoldenrod",        // B8860B
    "darkgray",             // A9A9A9
    "darkgreen",            // 006400
    "darkkhaki",            // BDB76B
    "darkmagenta",          // 8B008B
    "darkolivegreen",       // 556B2F
    "darkorange",           // FF8C00
    "darkorchid",           // 9932CC
    "darkred",              // 8B0000
    "darksalmon",           // E9967A
    "darkseagreen",         // 8FBC8F
    "darkslateblue",        // 483D8B
    "darkslategray",        // 2F4F4F
    "darkturquoise",        // 00CED1
    "darkviolet",           // 9400D3
    "deeppink",             // FF1493
    "deepskyblue",          // 00BFFF
    "dimgray",              // 696969
    "dodgerblue",           // 1E90FF
    "firebrick",            // B22222
    "floralwhite",          // FFFAF0 16775920
    "forestgreen",          // 228B22
    "fuchsia",              // FF00FF
    "gainsboro",            // DCDCDC
    "ghostwhite",           // F8F8FF
    "gold",                 // FFD700
    "goldenrod",            // DAA520
    "gray",                 // 808080
    "green",                // 008000
    "greenyellow",          // ADFF2F
    "honeydew",             // F0FFF0
    "hotpink",              // FF69B4
    "indianred",            // CD5C5C
    "indigo",               // 4B0082
    "ivory",                // FFFFF0
    "khaki",                // F0E68C
    "lavender",             // E6E6FA
    "lavenderblush",        // FFF0F5
    "lawngreen",            // 7CFC00
    "lemonchiffon",         // FFFACD
    "lightblue",            // ADD8E6
    "lightcoral",           // F08080
    "lightcyan",            // E0FFFF
    "lightgoldenrodyellow", // FAFAD2
    "lightgreen",           // 90EE90
    "lightgrey",            // D3D3D3
    "lightgray",            // D3D3D3
    "lightpink",            // FFB6C1
    "lightsalmon",          // FFA07A
    "lightseagreen",        // 20B2AA
    "lightskyblue",         // 87CEFA
    "lightslategray",       // 778899
    "lightsteelblue",       // B0C4DE
    "lightyellow",          // FFFFE0
    "lime",                 // 00FF00
    "limegreen",            // 32CD32
    "linen",                // FAF0E6
    "magenta",              // FF00FF
    "maroon",               // 800000
    "mediumaquamarine",     // 66CDAA
    "mediumblue",           // 0000CD
    "mediumorchid",         // BA55D3
    "mediumpurple",         // 9370DB
    "mediumseagreen",       // 3CB371
    "mediumslateblue",      // 7B68EE
    "mediumspringgreen",    // 00FA9A
    "mediumturquoise",      // 48D1CC
    "mediumvioletred",      // C71585
    "midnightblue",         // 191970
    "mintcream",            // F5FFFA
    "mistyrose",            // FFE4E1
    "moccasin",             // FFE4B5
    "navajowhite",          // FFDEAD
    "navy",                 // 000080
    "oldlace",              // FDF5E6
    "olive",                // 808000
    "olivedrab",            // 6B8E23
    "orange",               // FFA500
    "orangered",            // FF4500
    "orchid",               // DA70D6
    "palegoldenrod",        // EEE8AA
    "palegreen",            // 98FB98
    "paleturquoise",        // AFEEEE
    "palevioletred",        // DB7093
    "papayawhip",           // FFEFD5
    "peachpuff",            // FFDAB9
    "peru",                 // CD853F
    "pink",                 // FFC0CB
    "plum",                 // DDA0DD
    "powderblue",           // B0E0E6
    "purple",               // 800080
    "red",                  // FF0000
    "rosybrown",            // BC8F8F
    "royalblue",            // 4169E1
    "saddlebrown",          // 8B4513
    "salmon",               // FA8072
    "sandybrown",           // F4A460
    "seagreen",             // 2E8B57
    "seashell",             // FFF5EE
    "sienna",               // A0522D
    "silver",               // C0C0C0
    "skyblue",              // 87CEEB
    "slateblue",            // 6A5ACD
    "slategray",            // 708090
    "snow",                 // FFFAFA 16775930
    "springgreen",          // 00FF7F
    "steelblue",            // 4682B4
    "tan",                  // D2B48C
    "teal",                 // 008080
    "thistle",              // D8BFD8
    "tomato",               // FF6347
    "turquoise",            // 40E0D0
    "violet",               // EE82EE
    "wheat",                // F5DEB3
    "white",                // FFFFFF 16777215
    "whitesmoke",           // F5F5F5
    "yellow",               // FFFF00
    "yellowgreen",          // 9ACD32
    // plus a few rasmol names/values
    "bluetint",             // AFD7FF
    "greenblue",            // 2E8B57
    "greentint",            // 98FFB3
    "grey",                 // 808080
    "gray",                 
    "pinktint",             // FFABBB
    "redorange",            // FF4500
    "yellowtint",           // F6F675
  };
  
  private final static int[] colorArgbs = {
  //#FFFFC3 hover
    0xFF000000, // black
    // plus the PE chain colors
    0xFFffffff, // pewhite
    0xFF00ffff, // pecyan
    0xFFd020ff, // pepurple
    0xFF00ff00, // pegreen
    0xFF6060ff, // peblue
    0xFFff80c0, // peviolet
    0xFFa42028, // pebrown
    0xFFffd8d8, // pepink
    0xFFffff00, // peyellow
    0xFF00c000, // pedarkgreen
    0xFFffb000, // peorange
    0xFFb0b0ff, // pelightblue
    0xFF00a0a0, // pedarkcyan
    0xFF606060, // pedarkgray
    // standard JavaScript
    0xFFF0F8FF, // aliceblue
    0xFFFAEBD7, // antiquewhite
    0xFF00FFFF, // aqua
    0xFF7FFFD4, // aquamarine
    0xFFF0FFFF, // azure
    0xFFF5F5DC, // beige
    0xFFFFE4C4, // bisque
    0xFFFFEBCD, // blanchedalmond
    0xFF0000FF, // blue
    0xFF8A2BE2, // blueviolet
    0xFFA52A2A, // brown
    0xFFDEB887, // burlywood
    0xFF5F9EA0, // cadetblue
    0xFF7FFF00, // chartreuse
    0xFFD2691E, // chocolate
    0xFFFF7F50, // coral
    0xFF6495ED, // cornflowerblue
    0xFFFFF8DC, // cornsilk
    0xFFDC143C, // crimson
    0xFF00FFFF, // cyan
    0xFF00008B, // darkblue
    0xFF008B8B, // darkcyan
    0xFFB8860B, // darkgoldenrod
    0xFFA9A9A9, // darkgray
    0xFF006400, // darkgreen
  
    0xFFBDB76B, // darkkhaki
    0xFF8B008B, // darkmagenta
    0xFF556B2F, // darkolivegreen
    0xFFFF8C00, // darkorange
    0xFF9932CC, // darkorchid
    0xFF8B0000, // darkred
    0xFFE9967A, // darksalmon
    0xFF8FBC8F, // darkseagreen
    0xFF483D8B, // darkslateblue
    0xFF2F4F4F, // darkslategray
    0xFF00CED1, // darkturquoise
    0xFF9400D3, // darkviolet
    0xFFFF1493, // deeppink
    0xFF00BFFF, // deepskyblue
    0xFF696969, // dimgray
    0xFF1E90FF, // dodgerblue
    0xFFB22222, // firebrick
    0xFFFFFAF0, // floralwhite
    0xFF228B22, // forestgreen
    0xFFFF00FF, // fuchsia
    0xFFDCDCDC, // gainsboro
    0xFFF8F8FF, // ghostwhite
    0xFFFFD700, // gold
    0xFFDAA520, // goldenrod
    0xFF808080, // gray
    0xFF008000, // green
    0xFFADFF2F, // greenyellow
    0xFFF0FFF0, // honeydew
    0xFFFF69B4, // hotpink
    0xFFCD5C5C, // indianred
    0xFF4B0082, // indigo
    0xFFFFFFF0, // ivory
    0xFFF0E68C, // khaki
    0xFFE6E6FA, // lavender
    0xFFFFF0F5, // lavenderblush
    0xFF7CFC00, // lawngreen
    0xFFFFFACD, // lemonchiffon
    0xFFADD8E6, // lightblue
    0xFFF08080, // lightcoral
    0xFFE0FFFF, // lightcyan
    0xFFFAFAD2, // lightgoldenrodyellow
    0xFF90EE90, // lightgreen
    0xFFD3D3D3, // lightgrey
    0xFFD3D3D3, // lightgray
    0xFFFFB6C1, // lightpink
    0xFFFFA07A, // lightsalmon
    0xFF20B2AA, // lightseagreen
    0xFF87CEFA, // lightskyblue
    0xFF778899, // lightslategray
    0xFFB0C4DE, // lightsteelblue
    0xFFFFFFE0, // lightyellow
    0xFF00FF00, // lime
    0xFF32CD32, // limegreen
    0xFFFAF0E6, // linen
    0xFFFF00FF, // magenta
    0xFF800000, // maroon
    0xFF66CDAA, // mediumaquamarine
    0xFF0000CD, // mediumblue
    0xFFBA55D3, // mediumorchid
    0xFF9370DB, // mediumpurple
    0xFF3CB371, // mediumseagreen
    0xFF7B68EE, // mediumslateblue
    0xFF00FA9A, // mediumspringgreen
    0xFF48D1CC, // mediumturquoise
    0xFFC71585, // mediumvioletred
    0xFF191970, // midnightblue
    0xFFF5FFFA, // mintcream
    0xFFFFE4E1, // mistyrose
    0xFFFFE4B5, // moccasin
    0xFFFFDEAD, // navajowhite
    0xFF000080, // navy
    0xFFFDF5E6, // oldlace
    0xFF808000, // olive
    0xFF6B8E23, // olivedrab
    0xFFFFA500, // orange
    0xFFFF4500, // orangered
    0xFFDA70D6, // orchid
    0xFFEEE8AA, // palegoldenrod
    0xFF98FB98, // palegreen
    0xFFAFEEEE, // paleturquoise
    0xFFDB7093, // palevioletred
    0xFFFFEFD5, // papayawhip
    0xFFFFDAB9, // peachpuff
    0xFFCD853F, // peru
    0xFFFFC0CB, // pink
    0xFFDDA0DD, // plum
    0xFFB0E0E6, // powderblue
    0xFF800080, // purple
    0xFFFF0000, // red
    0xFFBC8F8F, // rosybrown
    0xFF4169E1, // royalblue
    0xFF8B4513, // saddlebrown
    0xFFFA8072, // salmon
    0xFFF4A460, // sandybrown
    0xFF2E8B57, // seagreen
    0xFFFFF5EE, // seashell
    0xFFA0522D, // sienna
    0xFFC0C0C0, // silver
    0xFF87CEEB, // skyblue
    0xFF6A5ACD, // slateblue
    0xFF708090, // slategray
    0xFFFFFAFA, // snow
    0xFF00FF7F, // springgreen
    0xFF4682B4, // steelblue
    0xFFD2B48C, // tan
    0xFF008080, // teal
    0xFFD8BFD8, // thistle
    0xFFFF6347, // tomato
    0xFF40E0D0, // turquoise
    0xFFEE82EE, // violet
    0xFFF5DEB3, // wheat
    0xFFFFFFFF, // white
    0xFFF5F5F5, // whitesmoke
    0xFFFFFF00, // yellow
    0xFF9ACD32, // yellowgreen
    // plus a few rasmol names/values
    0xFFAFD7FF, // bluetint
    0xFF2E8B57, // greenblue
    0xFF98FFB3, // greentint
    0xFF808080, // grey
    0xFF808080, // gray
    0xFFFFABBB, // pinktint
    0xFFFF4500, // redorange
    0xFFF6F675, // yellowtint
  };

  private static final Map<String, Integer> mapJavaScriptColors = new Hashtable<String, Integer>();

  static {
    for (int i = colorNames.length; --i >= 0; )
      mapJavaScriptColors.put(colorNames[i], Integer.valueOf(colorArgbs[i]));
  }

  /**
   * accepts [xRRGGBB] or [0xRRGGBB] or [0xFFRRGGBB] or #RRGGBB or
   * [red,green,blue] or a valid JavaScript color
   * 
   * @param strColor
   * @return 0 if invalid or integer color
   */
  public static int getArgbFromString(String strColor) {
    int len = 0;
    if (strColor == null || (len = strColor.length()) == 0)
      return 0;
    strColor = strColor.toLowerCase();
    if (strColor.charAt(0) == '[' && strColor.charAt(len - 1) == ']') {
      String check;
      if (strColor.indexOf(",") >= 0) {
        String[] tokens = PT.split(strColor.substring(1, strColor
            .length() - 1), ",");
        if (tokens.length != 3)
          return 0;
        float red = PT.parseFloat(tokens[0]);
        float grn = PT.parseFloat(tokens[1]);
        float blu = PT.parseFloat(tokens[2]);
        return colorTriadToFFRGB(red, grn, blu);
      }
      switch (len) {
      case 9:
        check = "x";
        break;
      case 10:
        check = "0x";
        break;
      default:
        return 0;
      }
      if (strColor.indexOf(check) != 1)
        return 0;
      strColor = "#" + strColor.substring(len - 7, len - 1);
      len = 7;
    }
    if (len == 7 && strColor.charAt(0) == '#') {
      try {
        return PT.parseIntRadix(strColor.substring(1, 7), 16) | 0xFF000000;
      } catch (Exception e) {
        return 0;
      }
    }
    Integer boxedArgb = mapJavaScriptColors.get(strColor);
    return (boxedArgb == null ? 0 : boxedArgb.intValue());
  }

  public static int colorTriadToFFRGB(float x, float y, float z) {
    if (x <= 1 && y <= 1 && z <= 1) {
      if (x > 0)
        x = x * 256 - 1;
      if (y > 0)
        y = y * 256 - 1;
      if (z > 0)
        z = z * 256 - 1;
    }
    return rgb((int) x, (int) y, (int) z);
  }

  public static int rgb(int red, int grn, int blu) {
    return 0xFF000000 | (red << 16) | (grn << 8) | blu;
  }

  public final static P3 colorPtFromString(String colorName) {
    return colorPtFromInt(getArgbFromString(colorName), null);
  }

  public final static P3 colorPtFromInt(int color, P3 pt) {
    if (pt == null)
      pt = new P3();
    pt.set((color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF);
    return pt;
  }

  public static int colorPtToFFRGB(T3 pt) {
    return colorTriadToFFRGB(pt.x, pt.y, pt.z);
  }

  public static void toRGB3f(int c, float[] f) {
    f[0] = ((c >> 16) & 0xFF) / 255f; // red
    f[1] = ((c >> 8) & 0xFF) / 255f;
    f[2] = (c & 0xFF) / 255f;
  }

  /**
   * Return a greyscale rgb value 0-FF using NTSC color lightness algorithm
   *<p>
   * the alpha component is set to 0xFF. If you want a value in the
   * range 0-255 then & the result with 0xFF;
   *
   * @param rgb the rgb value
   * @return a grayscale value in the range 0 - 255 decimal
   */
  public static int toFFGGGfromRGB(int rgb) {
    int grey = (((2989 * ((rgb >> 16) & 0xFF)) +
                (5870 * ((rgb >> 8) & 0xFF)) +
                (1140 * (rgb & 0xFF)) + 5000) / 10000) & 0xFFFFFF;
    return rgb(grey, grey, grey);
  }
  
  
  /**
   * Convert RGB values to HSL (hue/saturation/lightness)
   * 
   * @param rgb
   *        range 255 255 255
   * @param doRound
   *        set to false when just using this for 
   *        for RGB -- HSL -- HSL' -- RGB' conversion
   * 
   * @return the HSL as P3 range 360 100 100
   * @author hansonr
   */

  public static P3 rgbToHSL(P3 rgb, boolean doRound) {
    // adapted from http://tips4java.wordpress.com/2009/07/05/hsl-color/
    // see http://en.wikipedia.org/wiki/HSL_color_space
    float r = rgb.x / 255;
    float g = rgb.y / 255;
    float b = rgb.z / 255;
    float min = Math.min(r, Math.min(g, b));
    float max = Math.max(r, Math.max(g, b));

    //  lightness is just p * 50

    float p = (max + min);
    float q = (max - min);

    float h = (60 * ((q == 0 ? 0 : max == r ? ((g - b) / q + 6)
        : max == g ? (b - r) / q + 2 : (r - g) / q + 4))) % 360;

    float s = q / (q == 0 ? 1 : p <= 1 ? p : 2 - p);

    // we round to tenths for HSL so that we can  return enough
    // precision to get back 1-255 in RGB
    return (doRound ? P3.new3(Math.round(h*10)/10f, Math.round(s * 1000)/10f,
        Math.round(p * 500)/10f) : P3.new3(h, s * 100, p * 50));
  }

  /**
   * Convert HSL (hue/saturation/luninance) values to RGB
   *
   * @param hsl in the range 360, 100, 100
   * @return the RGB as P3 range 0 to 255
   * @author hansonr
   */
  public static P3 hslToRGB(P3 hsl) {
    // adapted from http://tips4java.wordpress.com/2009/07/05/hsl-color/
    // see http://en.wikipedia.org/wiki/HSL_color_space
    
    // highly condensed
    
    float h = Math.max(0,  Math.min(360, hsl.x)) / 60;
    float s = Math.max(0,  Math.min(100, hsl.y)) / 100;
    float l = Math.max(0,  Math.min(100, hsl.z)) / 100;

    float p = l - (l < 0.5 ? l : 1 - l) * s;    
    float q = 2 * (l - p); 
        
    float r = toRGB(p, q, h + 2);
    float g = toRGB(p, q, h);
    float b = toRGB(p, q, h - 2);
    return P3.new3(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  }

  private static float toRGB(float p, float q, float h) {
    return ((h = (h + (h < 0 ? 6 : h > 6 ? -6 : 0))) < 1 ? p + q * h
        : h < 3 ? p + q : h < 4 ? p + q * (4 - h) : p);
  }

}
