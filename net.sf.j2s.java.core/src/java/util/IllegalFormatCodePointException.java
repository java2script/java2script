/* Copyright 2006 The Apache Software Foundation or its licensors, as applicable
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package java.util;

import java.io.Serializable;

/**
 * The unchecked exception will be thrown out if an invalid Unicode code point,
 * which is Character.isValidCodePoint(int), is passed as a parameter to
 * Formatter.
 */
public class IllegalFormatCodePointException extends IllegalFormatException
		implements Serializable {
	private static final long serialVersionUID = 19080630L;

	private int c;

	/**
	 * Constructs an IllegalFormatCodePointException which is specified by the
	 * invalid Unicode code point.
	 * 
	 * @param c
	 *            The invalid Unicode code point.
	 */
	public IllegalFormatCodePointException(int c) {
		this.c = c;
	}

	/**
	 * Return the invalid Unicode code point.
	 * 
	 * @return The invalid Unicode code point.
	 */
	public int getCodePoint() {
		return c;
	}

	/**
	 * Return the message string of the IllegalFormatCodePointException.
	 * 
	 * @retun The message string of the IllegalFormatCodePointException.
	 */
	public String getMessage() {
		/*
		StringBuilder buffer = new StringBuilder();
		buffer.append("Code point is ");
		char[] chars = Character.toChars(c);
		for (int i = 0; i < chars.length; i++) {
			buffer.append(chars[i]);
		}
		return buffer.toString();
		*/
		return "Code point is " + c;
	}
}
