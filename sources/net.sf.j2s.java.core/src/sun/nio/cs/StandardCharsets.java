package sun.nio.cs;

public class StandardCharsets {

  static final String[] aliases_US_ASCII = { "US_ASCII", "US-ASCII", "iso-ir-6", "ANSI_X3.4-1986", "ISO_646.irv:1991", "ASCII", "ISO646-US", "us", "IBM367", "cp367", "csASCII", "default", "646", "iso_646.irv:1983", "ANSI_X3.4-1968", "ascii7" };
  static final String[] aliases_UTF_8 = { "UTF_8", "UTF-8", "UTF8", "unicode-1-1-utf-8" };
  static final String[] aliases_CESU_8 = { "CESU_8", "CESU-8", "CESU8", "csCESU-8" };
  static final String[] aliases_UTF_16 = { "UTF_16", "UTF-16", "utf16", "unicode", "UnicodeBig" };
  static final String[] aliases_UTF_16BE = { "UTF_16BE", "UTF-16BE", "ISO-10646-UCS-2", "X-UTF-16BE", "UnicodeBigUnmarked" };
  static final String[] aliases_UTF_16LE = { "UTF_16LE", "UTF-16LE", "X-UTF-16LE", "UnicodeLittleUnmarked" };
  static final String[] aliases_UTF_16LE_BOM = { "UTF_16LE_BOM", "x-UTF-16LE-BOM", "UnicodeLittle" };
  static final String[] aliases_UTF_32 = { "UTF_32", "UTF-32", "UTF32" };
  static final String[] aliases_UTF_32LE = { "UTF_32LE", "X-UTF-32LE" };
  static final String[] aliases_UTF_32BE = { "UTF_32BE", "X-UTF-32BE" }; 
  static final String[] aliases_UTF_32LE_BOM = { "UTF_32LE_BOM", "x-UTF-32LE-BOM", "UTF-32LE-BOM" };
  static final String[] aliases_UTF_32BE_BOM = { "UTF_32BE_BOM", "x-UTF-32BE-BOM", "UTF-32BE-BOM" };
  static final String[] aliases_ISO_8859_1 = { "ISO_8859_1", "ISO-8859-1", "iso-ir-100", "latin1", "l1", "IBM819", "cp819", "csISOLatin1", "819", "IBM-819", "ISO8859_1", "ISO_8859-1:1987", "ISO_8859_1", "8859_1", "ISO8859-1" };

  static final String[] aliases_GB18030 = { "ext.GB18030", "gb18030", "gb18030-2005", "gb2312" }; // SwingJS added
  static final String[] aliases_GBK = { "GBK" }; // SwingJS added
//  static final String[] aliases_ISO_8859_2 = { "iso8859_2", "8859_2", "iso-ir-101", "ISO_8859-2", "ISO_8859-2:1987", "ISO8859-2", "latin2", "l2", "ibm912", "ibm-912", "cp912", "912", "csISOLatin2" };
//  static final String[] aliases_ISO_8859_4 = { "iso8859_4", "iso8859-4", "8859_4", "iso-ir-110", "ISO_8859-4", "ISO_8859-4:1988", "latin4", "l4", "ibm914", "ibm-914", "cp914", "914", "csISOLatin4" };
//  static final String[] aliases_ISO_8859_5 = { "iso8859_5", "8859_5", "iso-ir-144", "ISO_8859-5", "ISO_8859-5:1988", "ISO8859-5", "cyrillic", "ibm915", "ibm-915", "cp915", "915", "csISOLatinCyrillic" };
//  static final String[] aliases_ISO_8859_7 = { "iso8859_7", "8859_7", "iso-ir-126", "ISO_8859-7", "ISO_8859-7:1987", "ELOT_928", "ECMA-118", "greek", "greek8", "csISOLatinGreek", "sun_eu_greek", "ibm813", "ibm-813", "813", "cp813", "iso8859-7" };
//  static final String[] aliases_ISO_8859_9 = { "iso8859_9", "8859_9", "iso-ir-148", "ISO_8859-9", "ISO_8859-9:1989", "ISO8859-9", "latin5", "l5", "ibm920", "ibm-920", "920", "cp920", "csISOLatin5" };
//  static final String[] aliases_ISO_8859_13 = { "iso8859_13", "8859_13", "iso_8859-13", "ISO8859-13" };
//  static final String[] aliases_ISO_8859_15 = { "ISO_8859-15", "8859_15", "ISO-8859-15", "ISO8859_15", "ISO8859-15", "IBM923", "IBM-923", "cp923", "923", "LATIN0", "LATIN9", "L9", "csISOlatin0", "csISOlatin9", "ISO8859_15_FDIS" };
//  static final String[] aliases_KOI8_R = { "koi8_r", "koi8", "cskoi8r" };
//  static final String[] aliases_KOI8_U = { "koi8_u" };
//  static final String[] aliases_MS1250 = { "cp1250", "cp5346" };
//  static final String[] aliases_MS1251 = { "cp1251", "cp5347", "ansi-1251" };
//  static final String[] aliases_MS1252 = { "cp1252", "cp5348" };
//  static final String[] aliases_MS1253 = { "cp1253", "cp5349" };
//  static final String[] aliases_MS1254 = { "cp1254", "cp5350" };
//  static final String[] aliases_MS1257 = { "cp1257", "cp5353" };
//  static final String[] aliases_IBM437 = { "cp437", "ibm437", "ibm-437", "437", "cspc8codepage437", "windows-437" };
//  static final String[] aliases_IBM737 = { "cp737", "ibm737", "ibm-737", "737" };
//  static final String[] aliases_IBM775 = { "cp775", "ibm775", "ibm-775", "775" };
//  static final String[] aliases_IBM850 = { "cp850", "ibm-850", "ibm850", "850", "cspc850multilingual" };
//  static final String[] aliases_IBM852 = { "cp852", "ibm852", "ibm-852", "852", "csPCp852" };
//  static final String[] aliases_IBM855 = { "cp855", "ibm-855", "ibm855", "855", "cspcp855" };
//  static final String[] aliases_IBM857 = { "cp857", "ibm857", "ibm-857", "857", "csIBM857" };
//  static final String[] aliases_IBM858 = { "cp858", "ccsid00858", "cp00858", "858", "PC-Multilingual-850+euro" };
//  static final String[] aliases_IBM862 = { "cp862", "ibm862", "ibm-862", "862", "csIBM862", "cspc862latinhebrew" };
//  static final String[] aliases_IBM866 = { "cp866", "ibm866", "ibm-866", "866", "csIBM866" };
//  static final String[] aliases_IBM874 = { "cp874", "ibm874", "ibm-874", "874" };

  // SwingJS -- just a few common ones; if others are needed, then 
  // (a) add the file
  // (b) add the primary name as the first name of the alias list
  // (c) add the aliases_xxxx to SWINGJS_ALIASES
  
  public static final String[][] SWINGJS_ALIASES = { 
		   aliases_UTF_8 
		  ,aliases_UTF_16 
		  ,aliases_US_ASCII 
		  ,aliases_ISO_8859_1 
		  ,aliases_CESU_8 
		  ,aliases_UTF_32LE_BOM 
		  ,aliases_UTF_32LE 
		  ,aliases_UTF_32BE_BOM 
		  ,aliases_UTF_32BE 
		  ,aliases_UTF_32 
		  ,aliases_UTF_16LE_BOM 
		  ,aliases_UTF_16LE 
		  ,aliases_UTF_16BE 
		  ,aliases_GBK
		  ,aliases_GB18030
//		  ,aliases_ISO_8859_9 
//		  ,aliases_ISO_8859_7 
//		  ,aliases_ISO_8859_5 
//		  ,aliases_ISO_8859_4 
//		  ,aliases_ISO_8859_2 
//		  ,aliases_ISO_8859_15 
//		  ,aliases_ISO_8859_13 
//		  ,aliases_MS1257 
//		  ,aliases_MS1254 
//		  ,aliases_MS1253 
//		  ,aliases_MS1252 
//		  ,aliases_MS1251 
//		  ,aliases_MS1250 
//		  ,aliases_KOI8_U 
//		  ,aliases_KOI8_R 
//		  ,aliases_IBM874 
//		  ,aliases_IBM866 
//		  ,aliases_IBM862 
//		  ,aliases_IBM858 
//		  ,aliases_IBM857 
//		  ,aliases_IBM855 
//		  ,aliases_IBM852 
//		  ,aliases_IBM850 
//		  ,aliases_IBM775 
//		  ,aliases_IBM737 
//		  ,aliases_IBM437 
  };
  
  
    
}


