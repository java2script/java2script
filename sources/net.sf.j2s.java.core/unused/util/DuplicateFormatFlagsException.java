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

/**
 * The unchecked exception will be thrown out if there are duplicate flags given
 * out in the format specifier.
 */
public class DuplicateFormatFlagsException extends IllegalFormatException {
	private static final long serialVersionUID = 18890531L;

	private String flags;

	/**
	 * Constructs a DuplicateFormatFlagsException which flags is specified.
	 * 
	 * @param f
	 *            The format flags that contian a duplicate flag.
	 */
	public DuplicateFormatFlagsException(String f) {
		if (null == f) {
			throw new NullPointerException();
		}
		flags = f;
	}

	/**
	 * Returns the format flags that contian a duplicate flag.
	 * 
	 * @return The format flags that contian a duplicate flag.
	 */
	public String getFlags() {
		return flags;
	}

	/**
	 * Returns the message string of the DuplicateFormatFlagsException.
	 * 
	 * @return The message string of the DuplicateFormatFlagsException.
	 */
	public String getMessage() {
		/*
		StringBuilder buffer = new StringBuilder();
		buffer.append("Flags of the DuplicateFormatFlagsException is'");
		buffer.append(flags);
		buffer.append("'");
		return buffer.toString();
		*/
		return "Flags of the DuplicateFormatFlagsException is '" + flags + "'";
	}

}
