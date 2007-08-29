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

package net.sf.j2s.ui.launching;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zhou renjian
 *
 * 2006-2-8
 */
public class ArgsUtil {

	public static String[] splitArguments(String s) {
		if (s == null || s.trim().length() == 0) {
			return new String[0];
		}
		s = s.trim();
		List list = new ArrayList();
		int lastIndex = 0;
		int index = 0;
		int length = s.length();
		while (index < length) {
			StringBuffer buffer = new StringBuffer();
			boolean isInString = false;
			boolean lastInStringConcat = false;
			char lastChar = 0;
			while (index < length) {
				char ch = s.charAt(index++);
				if (!isInString) {
					if (ch == ' ' || ch == '\r' || ch == '\n' 
							|| ch == '\t') {
						lastChar = ch;
						if (index == lastIndex + 1) {
							lastIndex = index;
							continue;
						}
						break;
					} else if (ch == '\"') {
						if (lastChar != '\\') {
							isInString = true;
							lastChar = ch;
							lastInStringConcat = index != lastIndex + 1;
							continue;
						} else {
							buffer.deleteCharAt(buffer.length() - 1);
							//lastInStringConcat = index != lastIndex + 1;
						}
					}
					lastChar = ch;
				} else {
					if (ch == '\"') {
						if (lastChar != '\\') {
							isInString = false;
							//break;
							if (lastInStringConcat) {
								continue;
							} else {
								break;
							}
						} else {
							buffer.deleteCharAt(buffer.length() - 1);
						}
						//buffer.append('\"');
					}
				}
				buffer.append(ch);
				lastChar = ch;
			}
			lastIndex = index;
			if (buffer.length() != 0) {
				list.add(buffer.toString());
			}
		}
		return (String[]) list.toArray(new String[0]);
	}
	
	public static String outputString(String s) {
		if (s == null || s.length() == 0) {
			return s;
		}
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < s.length(); i++) {
			char ch = s.charAt(i);
			if (ch == '\r' || ch == '\n'  || ch == '\f'
				|| ch == '\t' || ch == '\\' || ch == '\"' || ch == '\'') {
				buffer.append('\\');
				switch (ch) {
				case '\r':
					buffer.append('r');
					break;
				case '\n':
					buffer.append('n');
					break;
				case '\f':
					buffer.append('f');
					break;
				case '\t':
					buffer.append('t');
					break;
				case '\\':
					buffer.append('\\');
					break;
				case '\'':
					buffer.append('\'');
					break;
				case '\"':
					buffer.append('\"');
					break;
				}
				continue;
			}
			buffer.append(ch);
		}
		return buffer.toString();
	}
	
	public static String wrapAsArgumentArray(String s, boolean whitespace) {
		String[] args = splitArguments(s);
		StringBuffer buffer = new StringBuffer();
		buffer.append('[');
		for (int i = 0; i < args.length; i++) {
			buffer.append('\"');
			buffer.append(outputString(args[i]));
			buffer.append('\"');
			if (i != args.length - 1) {
				buffer.append(",");
				if (whitespace) {
					buffer.append(" ");
				}
			}
		}
		buffer.append(']');
		return buffer.toString();
	}
	public static void main(String[] args) {
		System.out.println(args.length);
		for (int i = 0; i < args.length; i++) {
			System.out.println(args[i]);
		}
	}
}
