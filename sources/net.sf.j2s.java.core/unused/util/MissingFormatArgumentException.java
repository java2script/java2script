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
 * The unchecked exception will be thrown out if there no corresponding argument
 * with the specified conversion or an argument index that refers to an
 * unexisting argument.
 */
public class MissingFormatArgumentException extends IllegalFormatException {
	private static final long serialVersionUID = 19190115L;

	private String s;

	/**
	 * Constructs an MissingFormatArgumentException with the specified
	 * conversion that lacks the argument.
	 * 
	 * @param s
	 *            The specified conversion that lacks the argument.
	 */
	public MissingFormatArgumentException(String s) {
		if (null == s) {
			throw new NullPointerException();
		}
		this.s = s;
	}

	/**
	 * Returns the conversion associated with the exception.
	 * 
	 * @return The conversion associated with the exception.
	 */
	public String getFormatSpecifier() {
		return s;
	}

	/**
	 * Returns the message of the exception.
	 * 
	 * @return The message of the exception.
	 */
	public String getMessage() {
        //return org.apache.harmony.luni.util.Msg.getString("K0348", s);
		return "Format specifier '" + s + "'";
    }
}
