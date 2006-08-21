/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package java.lang;

import java.io.Serializable;

/**
 * @author josson smith
 *
 * 2006-8-5
 */
public class Character implements Serializable, Comparable {
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
	 * Compare the receiver to the specified Character to determine the relative
	 * ordering.
	 * 
	 * @param c
	 *            the Character
	 * @return an int < 0 if this Character is less than the specified
	 *         Character, 0 if they are equal, and > 0 if this Character is
	 *         greater
     * @throws NullPointerException if <code>c</code> is <code>null</code>.
     * @since 1.2
	 */
	public int compareTo(Character c) {
		return value - c.value;
	}
	
    public int compareTo(Object o) {
        return compareTo((Character) o);
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

}
