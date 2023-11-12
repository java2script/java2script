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
 * The unchecked exception will be thrown out if there is an unknown flag.
 * 
 */
public class UnknownFormatFlagsException extends IllegalFormatException {

	private static final long serialVersionUID = 19370506L;

	private String flags;

	/**
	 * Constructs an UnknownFormatFlagsException with the specified flags.
	 * 
	 * @param f
	 *            The specified flags.
	 */
	public UnknownFormatFlagsException(String f) {
		if (null == f) {
			throw new NullPointerException();
		}
		flags = f;
	}

	/**
	 * Returns the flags associated with the exception.
	 * 
	 * @return The flags associated with the excepiton.
	 */
	public String getFlags() {
		return flags;
	}

	/**
	 * Returns the message associated with the exception.
	 * 
	 * @return The message associated with the exception.
	 */
	public String getMessage() {
        //return org.apache.harmony.luni.util.Msg.getString("K034a", flags);
		return "The flags are " + flags;
    }
}
