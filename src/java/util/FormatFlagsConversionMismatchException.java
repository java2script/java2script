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
 * The unchecked exception will be thrown out if a conversion and flags are
 * incompatible.
 */
public class FormatFlagsConversionMismatchException extends
		IllegalFormatException implements Serializable {

	private static final long serialVersionUID = 19120414L;

	private String f;

	private char c;

	/**
	 * Construct a FormatFlagsConversionMismatchException with the flags and
	 * conversion specified.
	 * 
	 * @param f
	 *            The flags
	 * @param c
	 *            The conversion
	 */
	public FormatFlagsConversionMismatchException(String f, char c) {
		if (null == f) {
			throw new NullPointerException();
		}
		this.f = f;
		this.c = c;
	}

	/**
	 * Returns the incompatible format flag.
	 * 
	 * @return The incompatible format flag.
	 */
	public String getFlags() {
		return f;
	}

	/**
	 * Returns the incompatible Conversion.
	 * 
	 * @return The incompatible Conversion.
	 */
	public char getConversion() {
		return c;
	}

	/**
	 * Returns the message string of the FormatFlagsConversionMismatchException.
	 * 
	 * @return The message string of the FormatFlagsConversionMismatchException.
	 */
	public String getMessage() {
		/*
		StringBuilder buffer = new StringBuilder();
		buffer.append("Mismatched Convertor =");
		buffer.append(c);
		buffer.append(", Flags= ");
		buffer.append(f);
		return buffer.toString();
		*/
		return "Mismatched Convertor =" + c + ", Flags= " + f;
	}
}
