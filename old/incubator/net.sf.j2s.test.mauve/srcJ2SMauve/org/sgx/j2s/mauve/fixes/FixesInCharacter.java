//package org.sgx.j2s.mauve.fixes;
//
//public class FixesInCharacter {
//	
//	public void applyAllFixes() {
//		fixBugforDigit();
//	}
//	
//	
//	   /**
//     * Determines the character representation for a specific digit in
//     * the specified radix. If the value of <code>radix</code> is not a
//     * valid radix, or the value of <code>digit</code> is not a valid
//     * digit in the specified radix, the null character
//     * (<code>'&#92;u0000'</code>) is returned.
//     * <p>
//     * The <code>radix</code> argument is valid if it is greater than or
//     * equal to <code>MIN_RADIX</code> and less than or equal to
//     * <code>MAX_RADIX</code>. The <code>digit</code> argument is valid if
//     * <code>0&nbsp;&lt;=digit&nbsp;&lt;&nbsp;radix</code>.
//     * <p>
//     * If the digit is less than 10, then
//     * <code>'0'&nbsp;+ digit</code> is returned. Otherwise, the value
//     * <code>'a'&nbsp;+ digit&nbsp;-&nbsp;10</code> is returned.
//     *
//     * @param   digit   the number to convert to a character.
//     * @param   radix   the radix.
//     * @return  the <code>char</code> representation of the specified digit
//     *          in the specified radix.
//     * @see     java.lang.Character#MIN_RADIX
//     * @see     java.lang.Character#MAX_RADIX
//     * @see     java.lang.Character#digit(char, int)
//     */
//    public static char fixBugforDigit_impl(int digit, int radix) {
//        if ((digit >= radix) || (digit < 0)) {
//            return '\0';
//        }
//        if ((radix < Character.MIN_RADIX) || (radix > Character.MAX_RADIX)) {
//            return '\0';
//        }
//        if (digit < 10) {
//            return (char)('0' + digit);
//        }
//        return (char)('a' - 10 + digit);
//    }
//    
//    public void fixBugforDigit() {
//		/**
//		 * @j2sNative
//		 java.lang.Character.forDigit = org.sgx.j2s.mauve.fixes.FixesInCharacter.fixBugforDigit_impl;
//		 */{}
//	}
//
//	
//}
