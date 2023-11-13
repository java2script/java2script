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
 * 
 * @j2sSuffix java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;
 */
public final class Character implements Serializable, Comparable<Character> {
    private static final long serialVersionUID = 3786198910865385080L;

    /**
     * The minimum possible Character value.
     */
    public static final char MIN_VALUE = '\u0000';

    /**
     * The maximum possible Character value.
     */
    public static final char MAX_VALUE = '\uffff';

    /**
     * The minimum possible radix used for conversions between Characters and
     * integers.
     */
    public static final int MIN_RADIX = 2;

    /**
     * The maximum possible radix used for conversions between Characters and
     * integers.
     */
    public static final int MAX_RADIX = 36;

    /**
     * The <code>char</code> {@link Class} object.
     */
    @SuppressWarnings("unchecked")
    public static final Class<Character> TYPE = null;

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
     * Returns a hash code for this <code>Character</code>.
     * @return  a hash code value for this object.
     */
    public int hashCode() {
        return (int)value;
    }

    /**
     * Compares this object against the specified object.
     * The result is <code>true</code> if and only if the argument is not
     * <code>null</code> and is a <code>Character</code> object that
     * represents the same <code>char</code> value as this object.
     *
     * @param   obj   the object to compare with.
     * @return  <code>true</code> if the objects are the same;
     *          <code>false</code> otherwise.
     */
    public boolean equals(Object obj) {
        if (obj instanceof Character) {
            return value == ((Character)obj).charValue();
        }
        return false;
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

	//sgurin: added forDigit
	/** 
     * Determines the character representation for a specific digit in
     * the specified radix. If the value of <code>radix</code> is not a
     * valid radix, or the value of <code>digit</code> is not a valid
     * digit in the specified radix, the null character
     * (<code>'&#92;u0000'</code>) is returned.
     * <p>
     * The <code>radix</code> argument is valid if it is greater than or
     * equal to <code>MIN_RADIX</code> and less than or equal to
     * <code>MAX_RADIX</code>. The <code>digit</code> argument is valid if
     * <code>0&nbsp;&lt;=digit&nbsp;&lt;&nbsp;radix</code>.
     * <p>
     * If the digit is less than 10, then
     * <code>'0'&nbsp;+ digit</code> is returned. Otherwise, the value
     * <code>'a'&nbsp;+ digit&nbsp;-&nbsp;10</code> is returned.
     *
     * @param   digit   the number to convert to a character.
     * @param   radix   the radix.
     * @return  the <code>char</code> representation of the specified digit
     *          in the specified radix.
     * @see     java.lang.Character#MIN_RADIX
     * @see     java.lang.Character#MAX_RADIX
     * @see     java.lang.Character#digit(char, int)
     */
    public static char forDigit(int digit, int radix) {
        if ((digit >= radix) || (digit < 0)) {
            return '\0';
        }
        if ((radix < Character.MIN_RADIX) || (radix > Character.MAX_RADIX)) {
            return '\0';
        }
        if (digit < 10) {
            return (char)('0' + digit);
        }
        return (char)('a' - 10 + digit);
    }
    /**
     * Answers whether the character is an upper case letter.
     * 
     * @param c
     *            the character
     * @return true when the character is a upper case letter, false otherwise
     */
    public static boolean isUpperCase(char c) {
        // Optimized case for ASCII
        if ('A' <= c && c <= 'Z') {
            return true;
        }
//        if (c < 128) {
            return false;
//        }
//
//        return getType(c) == UPPERCASE_LETTER;
    }

    /**
     * Answers whether the character is a lower case letter.
     * 
     * @param c
     *            the character
     * @return true when the character is a lower case letter, false otherwise
     */
    public static boolean isLowerCase(char c) {
        // Optimized case for ASCII
        if ('a' <= c && c <= 'z') {
            return true;
        }
//        if (c < 128) {
            return false;
//        }
//
//        return getType(c) == LOWERCASE_LETTER;
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
     * Convenient method to determine the value of character <code>c</code> in
     * the supplied radix. The value of <code>radix</code> must be between
     * MIN_RADIX and MAX_RADIX.
     * 
     * @param c
     *            the character
     * @param radix
     *            the radix
     * @return if <code>radix</code> lies between {@link #MIN_RADIX} and
     *         {@link #MAX_RADIX} then the value of the character in the radix,
     *         otherwise -1.
     */
    public static int digit(char c, int radix) {
        if (radix >= MIN_RADIX && radix <= MAX_RADIX) {
            if (c < 128) {
                // Optimized for ASCII
                int result = -1;
                if ('0' <= c && c <= '9') {
                    result = c - '0';
                } else if ('a' <= c && c <= 'z') {
                    result = c - ('a' - 10);
                } else if ('A' <= c && c <= 'Z') {
                    result = c - ('A' - 10);
                }
                return result < radix ? result : -1;
            }
//            int result = BinarySearch.binarySearchRange(digitKeys, c);
//            if (result >= 0 && c <= digitValues[result * 2]) {
//                int value = (char) (c - digitValues[result * 2 + 1]);
//                if (value >= radix) {
//                    return -1;
//                }
//                return value;
//            }
        }
        return -1;
    }
    
    /**
     * Convenient method to determine the value of character
     * <code>codePoint</code> in the supplied radix. The value of
     * <code>radix</code> must be between MIN_RADIX and MAX_RADIX.
     * 
     * @param codePoint
     *            the character, including supplementary characters
     * @param radix
     *            the radix
     * @return if <code>radix</code> lies between {@link #MIN_RADIX} and
     *         {@link #MAX_RADIX} then the value of the character in the radix,
     *         otherwise -1.
     * @j2sIgnore
     */
    public static int digit(int codePoint, int radix) {
        //return UCharacter.digit(codePoint, radix);
    	return -1;
    }

	/**
	 * @j2sIgnore
	 */
	public static char[] toChars(int point) {
		return null;
	}

    /**
     * Returns a <code>String</code> object representing this
     * <code>Character</code>'s value.  The result is a string of
     * length 1 whose sole component is the primitive
     * <code>char</code> value represented by this
     * <code>Character</code> object.
     *
     * @return  a string representation of this object.
     */
    public String toString() {
        char buf[] = {value};
        return String.valueOf(buf);
    }

    /**
     * Returns a <code>String</code> object representing the
     * specified <code>char</code>.  The result is a string of length
     * 1 consisting solely of the specified <code>char</code>.
     *
     * @param c the <code>char</code> to be converted
     * @return the string representation of the specified <code>char</code>
     * @since 1.4
     */
    public static String toString(char c) {
    	/**
    	 * @j2sNative
    	 * if (this === Charater) {
    	 * 	return "class java.lang.Charater"; // Charater.class.toString
    	 * }
    	 */ {}
        return String.valueOf(c);
    }
}
