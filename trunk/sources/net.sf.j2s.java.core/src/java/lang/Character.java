/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package java.lang;

import java.io.Serializable;

/**
 * <p>
 * Character is the wrapper for the primitive type <code>char</code>. This
 * class also provides a number of utility methods for working with
 * <code>char</code>s.
 * </p>
 * 
 * <p>
 * Character data is based upon the Unicode Standard, 4.0. The Unicode
 * specification, character tables and other information are available at <a
 * href="http://www.unicode.org/">http://www.unicode.org/</a>.
 * </p>
 * 
 * <p>
 * Unicode characters are referred to as <i>code points</i>. The range of valid
 * code points is U+0000 to U+10FFFF. The <i>Basic Multilingual Plane (BMP)</i>
 * is the code point range U+0000 to U+FFFF. Characters above the BMP are
 * referred to as <i>Supplementary Characters</i>. On the Java platform, UTF-16
 * encoding and <code>char</code> pairs are used to represent code points in
 * the supplementary range. A pair of <code>char</code> values that represent
 * a supplementary character are made up of a <i>high surrogate</i> with a
 * value range of 0xD800 to 0xDBFF and a <i>low surrogate</i> with a value
 * range of 0xDC00 to 0xDFFF.
 * </p>
 * 
 * <p>
 * On the Java platform a <code>char</code> value represents either a single
 * BMP code point or a UTF-16 unit that's part of a surrogate pair. The
 * <code>int</code> type is used to represent all Unicode code points.
 * </p>
 * 
 * @since 1.0
 */
public final class Character implements Serializable, Comparable<Character> {
    private static final long serialVersionUID = 3786198910865385080L;

    private final char value;

	/**
	 * Constructs a new instance of the receiver which represents the char
	 * valued argument.
	 * 
	 * @param value
	 *            the char to store in the new instance.
	 */
	public Character(char value) {
		this.value = value;
	}

	/**
	 * Answers the char value which the receiver represents.
	 * 
	 * @return char the value of the receiver
	 */
	public char charValue() {
		return value;
	}


    /**
     * Compares the receiver to the specified Character to determine the
     * relative ordering.
     * 
     * @param c
     *            the Character
     * @return an int < 0 if this Character is less than the specified
     *         Character, 0 if they are equal, and > 0 if this Character is
     *         greater
     * @throws NullPointerException
     *             if <code>c</code> is <code>null</code>.
     * @since 1.2
     */
    public int compareTo(Character c) {
        return value - c.value;
    }
    
	/**
	 * Answers the lower case equivalent for the character when the character is
	 * an upper case letter, otherwise answer the character.
	 * 
	 * @param c
	 *            the character
	 * @return if <code>c</code> is <b>not</b> a lower case character then
	 *         its lower case counterpart, otherwise just <code>c</code>
	 */
	public static char toLowerCase(char c) {
		return ("" + c).toLowerCase().charAt(0);
	}
	
	/**
	 * Answers the upper case equivalent for the character when the character is
	 * a lower case letter, otherwise answer the character.
	 * 
	 * @param c
	 *            the character
	 * @return if <code>c</code> is <b>not</b> an upper case character then
	 *         its upper case counterpart, otherwise just <code>c</code>
	 */
	public static char toUpperCase(char c) {
		return ("" + c).toUpperCase().charAt(0);
	}


	/**
	 * Answers whether the character is a digit.
	 * 
	 * @param c
	 *            the character
	 * @return true when the character is a digit, false otherwise
	 */
	public static boolean isDigit(char c) {
		// Optimized case for ASCII
		if ('0' <= c && c <= '9')
			return true;
		if (c < 1632)
			return false;
		//return getType(c) == DECIMAL_DIGIT_NUMBER;
		return false;
	}

	/**
	 * Answers whether the character is a whitespace character in Java.
	 * 
	 * @param c
	 *            the character
	 * @return <code>true</code> if the supplied <code>c</code> is a
	 *         whitespace character in Java, otherwise <code>false</code>.
	 */
	public static boolean isWhitespace(char c) {
		// Optimized case for ASCII
		if ((c >= 0x1c && c <= 0x20) || (c >= 0x9 && c <= 0xd))
			return true;
		if (c == 0x1680)
			return true;
		if (c < 0x2000 || c == 0x2007)
			return false;
		return c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x3000;
	}

	/**
	 * Answers whether the character is a letter.
	 * 
	 * @param c
	 *            the character
	 * @return true when the character is a letter, false otherwise
	 */
	public static boolean isLetter(char c) {
		if (('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z'))
			return true;
		if (c < 128)
			return false;
//		int type = getType(c);
//		return type >= UPPERCASE_LETTER && type <= OTHER_LETTER;
		return false;
	}

	/**
	 * Answers whether the character is a letter or a digit.
	 * 
	 * @param c
	 *            the character
	 * @return true when the character is a letter or a digit, false otherwise
	 */
	public static boolean isLetterOrDigit(char c) {
//		int type = getType(c);
//		return (type >= UPPERCASE_LETTER && type <= OTHER_LETTER)
//				|| type == DECIMAL_DIGIT_NUMBER;
		return isLetter(c) || isDigit(c);
	}

	/**
	 * Answers whether the character is a Unicode space character. A member of
	 * one of the Unicode categories Space Separator, Line Separator, or
	 * Paragraph Separator.
	 * 
	 * @param c
	 *            the character
	 * @return true when the character is a Unicode space character, false
	 *         otherwise
	 */
	public static boolean isSpaceChar(char c) {
		if (c == 0x20 || c == 0xa0 || c == 0x1680)
			return true;
		if (c < 0x2000)
			return false;
		return c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x202f
				|| c == 0x3000;
	}

	/**
	 * @j2sIgnore
	 */
	public static int codePointCount(char[] chs, int begin, int offset) {
		return 0;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static int codePointAt(char[] chs, int begin, int offset) {
		return 0;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static int codePointBefore(char[] chs, int begin) {
		return 0;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static int offsetByCodePoints(char[] chs, int begin, int offset, int end, int length) {
		return 0;
	}
	
	/**
	 * @j2sIgnore
	 */
	public static char[] toChars(int point) {
		return null;
	}
}
