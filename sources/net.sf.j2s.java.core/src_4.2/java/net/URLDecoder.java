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


//import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;

/*
import org.apache.harmony.luni.util.Msg;
import org.apache.harmony.luni.util.Util;
*/

/**
 * This class is used to decode a string which is encoded in the
 * <code>application/x-www-form-urlencoded</code> MIME content type.
 */
public class URLDecoder {

	/**
	 * Decodes the string argument which is assumed to be encoded in the
	 * <code>x-www-form-urlencoded</code> MIME content type.
	 * <p>
	 * '+' will be converted to space, '%' and two following hex digit
	 * characters are converted to the equivalent byte value. All other
	 * characters are passed through unmodified.
	 * <p>
	 * e.g. "A+B+C %24%25" -> "A B C $%"
	 * 
	 * @param s
	 *            java.lang.String The encoded string.
	 * @return java.lang.String The decoded version.
	 * 
	 * @deprecated use URLDecoder#decode(String, String) instead
	 * 
	 * @j2sNative
	 * return decodeURIComponent(s);
	 */
	public static String decode(String s) {
		return null;
	}

	/**
	 * Decodes the string argument which is assumed to be encoded in the
	 * <code>x-www-form-urlencoded</code> MIME content type using the
	 * specified encoding scheme.
	 * <p>
	 * '+' will be converted to space, '%' and two following hex digit
	 * characters are converted to the equivalent byte value. All other
	 * characters are passed through unmodified.
	 * 
	 * <p>
	 * e.g. "A+B+C %24%25" -> "A B C $%"
	 * 
	 * @param s
	 *            java.lang.String The encoded string.
	 * @param enc
	 *            java.lang.String The encoding scheme to use
	 * @return java.lang.String The decoded version.
	 * 
	 * @j2sIgnore
	 */
	public static String decode(String s, String enc)
			throws UnsupportedEncodingException {

		if (enc == null) {
			throw new NullPointerException();
		}
		return null;
	}
}
