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

package net.sf.j2s.core.compiler;

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
		String specialFunKey = "@324@();\r\n";
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

}
