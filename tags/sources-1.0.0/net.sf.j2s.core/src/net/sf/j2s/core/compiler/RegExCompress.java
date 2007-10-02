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
            		matcher.appendReplacement(sb, "$10 $11");
            	} else if (matcher.group(13) != null) {
            		matcher.appendReplacement(sb, "$13 $14");
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
		String regEx = "('[^'\\n\\r]*')|" + // 1:1
				"(\"[^\"\\n\\r]*\")|" + // 1:2
				"(\\/\\/[^\\n\\r]*[\\n\\r])|" + // 1:3 // line comments
				"(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|" + // 2:4,5 // block comments
				"(\\s+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|" + // 2:6,7 // regular expression
				"([^\\w\\x24\\/'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)"; // 1:8 // regular expression 
		//str = str.replaceAll(regEx,	"$1$2$7$8");
		str = mk(str, regEx +
				"|((\\b|\\x24)\\s+(\\b|\\x24))|" + // 3:9,10,11
				"(([+\\-])\\s+([+\\-]))|" + // 3:12,13,14
				"(\\s+)",
				"$1$2$7$8");
		return str;
	}
	public static String regexCompress2(String str) {
		String whiteSpace = "[ \\f\\t\\v]";
		String regEx = "('[^'\\n\\r]*')|" + // 1:1
				"(\"[^\"\\n\\r]*\")|" + // 1:2
				"(\\/\\/[^\\n\\r]*[\\n\\r])|" + // 1:3 // line comments
				"(\\/\\*[^*]*\\*+([^\\/][^*]*\\*+)*\\/)|" + // 2:4,5 // block comments
				"(" + whiteSpace + "+(\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*))|" + // 2:6,7 // regular expression
				"([^\\w\\x24\\/'\"*)\\?:]\\/[^\\/\\n\\r\\*][^\\/\\n\\r]*\\/[gim]*)"; // 1:8 // regular expression 
		//str = str.replaceAll(regEx,	"$1$2$7$8");
		str = mk(str, regEx +
				"|((\\b|\\x24)" + whiteSpace + "+(\\b|\\x24))|" + // 3:9,10,11
				"(([+\\-])" + whiteSpace + "+([+\\-]))|" + // 3:12,13,14
				"(" + whiteSpace + "+)",
				"$1$2$7$8");
		return str;
	}

}
