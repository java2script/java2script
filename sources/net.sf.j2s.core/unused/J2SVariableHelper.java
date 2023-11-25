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

package j2s.jmol.common;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.eclipse.jdt.core.dom.Expression;

/**
 * Final variables inside anonymous class is a big thing for Java2Script
 * compiler. And Java2Script compiler also tries to minimize the variable name.
 * 
 * @author zhou renjian
 *
 *         2006-12-3
 */
	/**
	 * If given expression is constant value expression, return its value string; or
	 * return null.
	 * 
	 * @param node
	 * @return
	 */
	protected static String getConstantValue(Expression node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null
				&& (constValue instanceof Number || constValue instanceof Character || constValue instanceof Boolean)) {
			StringBuffer buf = new StringBuffer();
			if (constValue instanceof Character) {
				buf.append('\'');
				buf.append(escapeChar(((Character) constValue).charValue()));
				buf.append('\'');
			} else {
				buf.append(constValue);
			}
			return buf.toString();
		}
		if (constValue != null && (constValue instanceof String)) {
			StringBuffer buf = new StringBuffer();
			String str = (String) constValue;
			int length = str.length();
			/*
			 * if (length > 20) { return null; }
			 */
			buf.append("\"");
			for (int i = 0; i < length; i++) {
				buf.append(escapeChar(str.charAt(i)));
			}
			buf.append("\"");
			return buf.toString();
		}
		return null;
	}

	public static String escapeChar(char charValue) {
		String out = "";
		switch (charValue) {
		case '\\':
		case '\'':
		case '\"':
			out = "\\" + charValue;
			break;
		case '\r':
			out = "\\r";
			break;
		case '\n':
			out = "\\n";
			break;
		case '\t':
			out = "\\t";
			break;
		case '\f':
			out = "\\f";
			break;
		default:
			if (charValue < 32 || charValue > 127) {
				String hexStr = "0000" + Integer.toHexString(charValue);
				out = "\\u" + hexStr.substring(hexStr.length() - 4);
			} else {
				out = "" + charValue;
			}
			break;
		}
		return out;
	}

	static int escapedCharToInt(String s) {
		// pt to xxx of 'xxx'<eob>
		int len = s.length();
		if (len == 1)
			return s.charAt(0);
		// '\x';
		switch (s.charAt(1)) {
		case 'r':
			return '\r';
		case 'n':
			return '\n';
		case 't':
			return '\t';
		case 'f':
			return '\f';
		case '\\':
		case '\'':
		case '\"':
			return s.charAt(1);
		default:
			return (s.charAt(1) == 'u' ? Integer.parseInt(s.substring(2), 16) : Integer.parseInt(s.substring(1), 8));
		}
	}
//	
//	public static void main(String[] args) {
//		String s = "\t\f\r\n\'\"\\\1\u0FF0";
//		for (int i = 0; i < s.length(); i++) {
//			String e = escapeChar(s.charAt(i));
//			int ie = unescapeChar(e);
//			System.out.println("" + ((int) s.charAt(i) + " " + e + " " + ie));
//			assert(s.charAt(i) == ie);
//		}
//		// \t\f\r\n\'\"\\\u0001\u0ff0
//	}

}
