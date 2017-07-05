/*******************************************************************************
 * Copyright (c) 2017 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Udo Borkowski - initial implementation
 *******************************************************************************/

package net.sf.j2s.test.junit.util;

/**
 * Construct a text.  
 * 
 * <p>Output is not thread-safe.
 */
public class Output {
	private static StringBuffer text = new StringBuffer();
	
	/**
	 * Clear the current text, i.e. make it the empty string.
	 */
	public static void clear() {
		text = new StringBuffer();
	}
	
	/**
	 * Add the string to the current text.
	 * 
	 * @param string
	 */
	public static void add(String string) {
		text.append(string);
	}
	
	/**
	 * The current text
	 */
	public static String text() {
		return text.toString();
	}
}
