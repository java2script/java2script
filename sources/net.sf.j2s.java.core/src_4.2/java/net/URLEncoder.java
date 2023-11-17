/* Copyright 1998, 2005 The Apache Software Foundation or its licensors, as applicable
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

package java.net;

/**
 * This class is used to encode a string using the format required by
 * <code>application/x-www-form-urlencoded</code> MIME content type.
 */
public class URLEncoder {
	static final String digits = "0123456789ABCDEF";

	/**
	 * Prevents this class from being instantiated.
	 * 
	 */
	private URLEncoder() {
	}

	/**
	 * This class contains a utility method for converting a string to the
	 * format required by the <code>application/x-www-form-urlencoded</code>
	 * MIME content type.
	 * <p>
	 * All characters except letters ('a'..'z', 'A'..'Z') and numbers ('0'..'9')
	 * and characters '.', '-', '*', '_' are converted into their hexidecimal
	 * value prepended by '%'.
	 * <p>
	 * For example: '#' -> %23
	 * <p>
	 * In addition, spaces are substituted by '+'
	 * 
	 * @return java.lang.String the string to be converted
	 * @param s
	 *            java.lang.String the converted string
	 * 
	 * @deprecated use URLEncoder#encode(String, String) instead
	 * 
	 * @j2sNative
	 * return encodeURIComponent(s);
	 */
	public static String encode(String s) {
		return null;
	}

	/**
	 * This class contains a utility method for converting a string to the
	 * format required by the <code>application/x-www-form-urlencoded</code>
	 * MIME content type.
	 * <p>
	 * All characters except letters ('a'..'z', 'A'..'Z') and numbers ('0'..'9')
	 * and characters '.', '-', '*', '_' are converted into their hexadecimal
	 * value prepended by '%'.
	 * <p>
	 * For example: '#' -> %23
	 * <p>
	 * In addition, spaces are substituted by '+'
	 * 
	 * @return java.lang.String the string to be converted
	 * @param s
	 *            java.lang.String the converted string
	 * 
	 * @j2sIgnore
	 */
	public static String encode(String s, String enc) {
		return null;
	}

}
