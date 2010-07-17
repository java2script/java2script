/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.lib.build;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author zhou renjian
 *
 * 2006-2-20
 */
public class RegExCompress {

	public static String mk(String str, String regex, String replacement) {
		Matcher matcher = Pattern.compile(regex).matcher(str);
		matcher.reset();
        boolean result = matcher.find();
        if (result) {
            StringBuffer sb = new StringBuffer();
            do {
            	if (matcher.group(10) != null) {
            		matcher.appendReplacement(sb, "$11 $12");
            	} else if (matcher.group(13) != null) {
            		matcher.appendReplacement(sb, "$14 $15");
            	} else {
            		matcher.appendReplacement(sb, replacement);
            	}
                result = matcher.find();
            } while (result);
            matcher.appendTail(sb);
            return sb.toString();
        }
		return str;
	}
	/**
	 * @param args
	 * @throws FileNotFoundException 
	 */
	public static void main(String[] args) throws FileNotFoundException {
		boolean completelyCompressing = true;
		int indexDelta = 0;
		if (args.length % 2 == 1 && args.length > 0) {
			completelyCompressing = "true".equals(args[0]);
			indexDelta = 1;
		}
		for (int i = 0; i < (args.length - indexDelta) / 2; i++) {
			File src = new File(args[i + i + indexDelta]);
			File dest = new File(args[i + i + 1 + indexDelta]);
			pack(src, dest, completelyCompressing);
		}
	}
	private static void pack(File src, File dest, boolean completelyCompress) throws FileNotFoundException {
		if (src.exists() && dest.exists() && (src.lastModified() <= dest.lastModified() 
				&& !src.getAbsolutePath().equals(dest.getAbsolutePath()))) {
			return ;
		}
		if (!src.exists()) {
			System.err.println("Source file " + src.getAbsolutePath() + " does not exist!");
			return ;
		}
		String s = readFileAll(new FileInputStream(src));
		String j2sKeySig = "/* http://j2s.sf.net/ */";
		if (s.startsWith(j2sKeySig)) {
			return ;
		}
		if (completelyCompress) {
			s = regexCompress(s);
		} else {
			s = regexCompress2(s);
		}
		if (!dest.getParentFile().exists()) {
			dest.getParentFile().mkdirs();
		}
		try {
			FileOutputStream fos = new FileOutputStream(dest);
			String compressedStr = j2sKeySig + s;
			fos.write(compressedStr.getBytes());
			fos.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static String regexCompress(String str) {
		str = str.replaceAll("(\r([^\n]))|(([^\r])\n)", "$4\r\n$2"); // fix line terminators
		boolean ignoreCSS = false;
		String cssCodes = null;
		int idx1 = str.indexOf("$WTC$$.registerCSS");
		int idx2 = -1;
		int idx = idx1;
		while (idx != -1) {
			int index = str.indexOf("\");\r\n", idx);
			if (index != -1) {
				idx2 = index + 5;
				ignoreCSS = true;
				idx = str.indexOf("$WTC$$.registerCSS", idx2);
			} else {
				break;
			}
		}
		String specialFunKey = "@324@();";
		if (ignoreCSS) {
			cssCodes = str.substring(idx1, idx2);
			str = str.substring(0, idx1) + specialFunKey + str.substring(idx2);
		}
		String regEx = "(''|'[^\\n\\r]*[^\\\\]')|" + // 1:1
				"(\"\"|\"([^\\n\\r\\\"]|\\\\\\\")*[^\\\\]\")|" + // 1:3
				"(\\/\\/[^\\n\\r]*[\\n\\r])|" + // 1:4
				"(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|" + // 2:5,6
				"(\\s+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|" + // 2:7,8
				"([^\\w\\x24\\/'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)"; // 1:9
		//str = str.replaceAll(regEx,	"$1$2$7$8");
		str = mk(str, regEx +
				"|((\\b|\\x24)\\s+(\\b|\\x24))|" + // 3:10,11,12
				"(([+\\-])\\s+([+\\-]))|" + // 3:13,14,15
				"(\\s+)",
				"$1$2$8$9");
		if (ignoreCSS) {
			idx = str.indexOf(specialFunKey);
			if (idx != -1) {
				str = str.substring(0, idx) + cssCodes + str.substring(idx + specialFunKey.length());
			} else {
				System.err.println("Error! Fail to ignore CSS codes!");
			}
		}
		return str;
	}
	public static String regexCompress2(String str) {
		str = str.replaceAll("(\r([^\n]))|(([^\r])\n)", "$4\r\n$2"); // fix line terminators
		boolean ignoreCSS = false;
		String cssCodes = null;
		int idx1 = str.indexOf("$WTC$$.registerCSS");
		int idx2 = -1;
		int idx = idx1;
		while (idx != -1) {
			int index = str.indexOf("\");\r\n", idx);
			if (index != -1) {
				idx2 = index + 5;
				ignoreCSS = true;
				idx = str.indexOf("$WTC$$.registerCSS", idx2);
			} else {
				break;
			}
		}
		String specialFunKey = "@324@();\r\n";
		if (ignoreCSS) {
			cssCodes = str.substring(idx1, idx2);
			str = str.substring(0, idx1) + specialFunKey + str.substring(idx2);
		}
		String whiteSpace = "[ \\f\\t\\v]";
		String regEx = "(''|'[^\\n\\r]*[^\\\\]')|" + // 1:1
				"(\"\"|\"([^\\n\\r\\\"]|\\\\\\\")*[^\\\\]\")|" + // 2:2,3
				"(\\/\\/[^\\n\\r]*[\\n\\r])|" + // 1:4 // line comments
				"(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|" + // 2:5,6 // block comments
				"(" + whiteSpace + "+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|" + // 2:7,8 // regular expression
				"([^\\w\\x24\\/'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)"; // 1:9 // regular expression 
		//str = str.replaceAll(regEx,	"$1$2$7$8");
		str = mk(str, regEx +
				"|((\\b|\\x24)" + whiteSpace + "+(\\b|\\x24))|" + // 3:10,11,12
				"(([+\\-])" + whiteSpace + "+([+\\-]))|" + // 3:13,14,15
				"(" + whiteSpace + "+)",
				"$1$2$8$9");
		if (ignoreCSS) {
			idx = str.indexOf(specialFunKey);
			if (idx != -1) {
				str = str.substring(0, idx) + cssCodes + str.substring(idx + specialFunKey.length());
			} else {
				System.err.println("Error! Fail to ignore CSS codes!");
			}
		}
		return str;
	}
	public static String readFileAll(InputStream res) {
		try {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] utf8Header = new byte[3];
			byte[] buf = new byte[1024];
			int read = 0;
			// Try to ignore the UTF-8 header! And return string are considered as
			// UTF-8 encoded.
			int readLen = 0;
			while ((read = res.read(utf8Header, readLen, 3 - readLen)) != -1) {
				readLen += read;
				if (readLen == 3) {
					if (utf8Header[0] == (byte) 0xef
							&& utf8Header[1] == (byte) 0xbb
							&& utf8Header[2] == (byte) 0xbf) {
						// skip
					} else {
						baos.write(utf8Header);
					}
					break;
				}
			}
			while ((read = res.read(buf)) != -1) {
				baos.write(buf, 0, read);
			}
			res.close();
			return baos.toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "Missing";
	}

}
