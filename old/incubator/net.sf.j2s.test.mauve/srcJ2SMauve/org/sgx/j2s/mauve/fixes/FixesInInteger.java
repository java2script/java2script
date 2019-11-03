package org.sgx.j2s.mauve.fixes;

/**
 * added a lot of missing static methods to java.lang.Integer
 * all commented code was already fixed in j2s.java.core files.
 * @author sgurin
 *
 */
public class FixesInInteger {

	public void applyAllFixes() {
//		fixBugIntegerCompare();
//		fixBugIntegerhighestOneBit();
//		fixBugInteger_lowestOneBit();
//		fixBugInteger_numberOfLeadingZeros();
//		fixBugInteger_numberOfTrailingZeros();
//		fixBugIntegerBitCount();
//		fixBugIntegerrotateLeft();
//		fixBugIntegerrotateRight();
//		fixBugIntegerreverse();
//		fixBugIntegersignum();
//		fixBugIntegerreverseBytes();
//		fixBugIntegertoBinaryString();
		fixBugIntegerGetInteger();
	}
    
//    /* *** integer compare to *** */
//    
//    public static int fixBugInteger_compare_methodImpl(int f1, int f2) {
//        if (f1 < f2)
//             return -1;		 // Neither val is NaN, thisVal is smaller
//         if (f1 > f2)
//             return 1;		 // Neither val is NaN, thisVal is larger
//         return 0;
//     }
//    
//    public static void fixBugIntegerCompare() {
//    	/**@j2sNative
//    	 * 
//    	 java.lang.Integer.compare=org.sgx.j2s.mauve.fixes.FixesInInteger.fixBugInteger_compare_methodImpl;
//    	 java.lang.Integer.prototype.compareTo=function(anotherInt) {
//	    	 var otherValue = anotherInt;
//				if(anotherInt.valueOf) 
//					otherValue=anotherInt.valueOf();
//				return java.lang.Integer.compare(this.valueOf(), otherValue);
//    	 }
//    	 */{}
//    } 
//    
//    
//	
//    
//    
//    
//    
//    /* *** highestOneBit *** */
//    /**
//     * Returns an <tt>int</tt> value with at most a single one-bit, in the
//     * position of the highest-order ("leftmost") one-bit in the specified
//     * <tt>int</tt> value.  Returns zero if the specified value has no
//     * one-bits in its two's complement binary representation, that is, if it
//     * is equal to zero.
//     *
//     * @return an <tt>int</tt> value with a single one-bit, in the position
//     *     of the highest-order one-bit in the specified value, or zero if
//     *     the specified value is itself equal to zero.
//     * @since 1.5
//     */
//    public static int fixBugInteger_highestOneBit(int i) {
//        // HD, Figure 3-1
//        i |= (i >>  1);
//        i |= (i >>  2);
//        i |= (i >>  4);
//        i |= (i >>  8);
//        i |= (i >> 16);
//        return i - (i >>> 1);
//    }
//    private void fixBugIntegerhighestOneBit() {
//    	/**@j2sNative
//    	 java.lang.Integer.highestOneBit=org.sgx.j2s.mauve.fixes.FixesInInteger.fixBugInteger_highestOneBit;
//    	 */{}
//	}
//    
//    
//    
//    
//    /**
//     * Returns an <tt>int</tt> value with at most a single one-bit, in the
//     * position of the lowest-order ("rightmost") one-bit in the specified
//     * <tt>int</tt> value.  Returns zero if the specified value has no
//     * one-bits in its two's complement binary representation, that is, if it
//     * is equal to zero.
//     *
//     * @return an <tt>int</tt> value with a single one-bit, in the position
//     *     of the lowest-order one-bit in the specified value, or zero if
//     *     the specified value is itself equal to zero.
//     * @since 1.5
//     */
//    public static int lowestOneBit(int i) {
//        // HD, Section 2-1
//        return i & -i;
//    }
//    private void fixBugInteger_lowestOneBit() {
//    	/**@j2sNative
//    	 java.lang.Integer.lowestOneBit=org.sgx.j2s.mauve.fixes.FixesInInteger.lowestOneBit;
//    	 */{}
//	}
//    
//    
//    
//    
//    
//    /**
//     * Returns the number of zero bits preceding the highest-order
//     * ("leftmost") one-bit in the two's complement binary representation
//     * of the specified <tt>int</tt> value.  Returns 32 if the
//     * specified value has no one-bits in its two's complement representation,
//     * in other words if it is equal to zero.
//     *
//     * <p>Note that this method is closely related to the logarithm base 2.
//     * For all positive <tt>int</tt> values x:
//     * <ul>
//     * <li>floor(log<sub>2</sub>(x)) = <tt>31 - numberOfLeadingZeros(x)</tt>
//     * <li>ceil(log<sub>2</sub>(x)) = <tt>32 - numberOfLeadingZeros(x - 1)</tt>
//     * </ul>
//     *
//     * @return the number of zero bits preceding the highest-order
//     *     ("leftmost") one-bit in the two's complement binary representation
//     *     of the specified <tt>int</tt> value, or 32 if the value
//     *     is equal to zero.
//     * @since 1.5
//     */
//    public static int numberOfLeadingZeros(int i) {
//        // HD, Figure 5-6
//        if (i == 0)
//            return 32;
//        int n = 1;
//        if (i >>> 16 == 0) { n += 16; i <<= 16; }
//        if (i >>> 24 == 0) { n +=  8; i <<=  8; }
//        if (i >>> 28 == 0) { n +=  4; i <<=  4; }
//        if (i >>> 30 == 0) { n +=  2; i <<=  2; }
//        n -= i >>> 31;
//        return n;
//    }
//    private void fixBugInteger_numberOfLeadingZeros() {
//    	/**@j2sNative
//    	 java.lang.Integer.numberOfLeadingZeros=org.sgx.j2s.mauve.fixes.FixesInInteger.numberOfLeadingZeros;
//    	 */{}
//	}
//    
//    
//    
//    
//    
//    
//    /**
//     * Returns the number of zero bits following the lowest-order ("rightmost")
//     * one-bit in the two's complement binary representation of the specified
//     * <tt>int</tt> value.  Returns 32 if the specified value has no
//     * one-bits in its two's complement representation, in other words if it is
//     * equal to zero.
//     *
//     * @return the number of zero bits following the lowest-order ("rightmost")
//     *     one-bit in the two's complement binary representation of the
//     *     specified <tt>int</tt> value, or 32 if the value is equal
//     *     to zero.
//     * @since 1.5
//     */
//    public static int numberOfTrailingZeros(int i) {
//        // HD, Figure 5-14
//	int y;
//	if (i == 0) return 32;
//	int n = 31;
//	y = i <<16; if (y != 0) { n = n -16; i = y; }
//	y = i << 8; if (y != 0) { n = n - 8; i = y; }
//	y = i << 4; if (y != 0) { n = n - 4; i = y; }
//	y = i << 2; if (y != 0) { n = n - 2; i = y; }
//	return n - ((i << 1) >>> 31);
//    }
//    private void fixBugInteger_numberOfTrailingZeros() {
//    	/**@j2sNative
//    	 java.lang.Integer.numberOfTrailingZeros=org.sgx.j2s.mauve.fixes.FixesInInteger.numberOfTrailingZeros;
//    	 */{}
//	}
//    
//    
//    
//    
//    
//
//    /* *** integer bitCount *** */    
//	/**
//     * Returns the number of one-bits in the two's complement binary
//     * representation of the specified <tt>int</tt> value.  This function is
//     * sometimes referred to as the <i>population count</i>.
//     *
//     * @return the number of one-bits in the two's complement binary
//     *     representation of the specified <tt>int</tt> value.
//     * @since 1.5
//     */
    public static int fixBugInteger_bitCount_method_impl(int i) {
        // HD, Figure 5-2
		i = i - ((i >>> 1) & 0x55555555);
		i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
		i = (i + (i >>> 4)) & 0x0f0f0f0f;
		i = i + (i >>> 8);
		i = i + (i >>> 16);
		return i & 0x3f;
    }
//    private void fixBugIntegerBitCount() {
//    	/**@j2sNative
//    	 * 
//    	 java.lang.Integer.bitCount=org.sgx.j2s.mauve.fixes.FixesInInteger.fixBugInteger_bitCount_method_impl;
//    	 */{}
//	}
//
//
//    
//    /**
//     * Returns the value obtained by rotating the two's complement binary
//     * representation of the specified <tt>int</tt> value left by the
//     * specified number of bits.  (Bits shifted out of the left hand, or
//     * high-order, side reenter on the right, or low-order.)
//     *
//     * <p>Note that left rotation with a negative distance is equivalent to
//     * right rotation: <tt>rotateLeft(val, -distance) == rotateRight(val,
//     * distance)</tt>.  Note also that rotation by any multiple of 32 is a
//     * no-op, so all but the last five bits of the rotation distance can be
//     * ignored, even if the distance is negative: <tt>rotateLeft(val,
//     * distance) == rotateLeft(val, distance & 0x1F)</tt>.
//     *
//     * @return the value obtained by rotating the two's complement binary
//     *     representation of the specified <tt>int</tt> value left by the
//     *     specified number of bits.
//     * @since 1.5
//     */
//    public static int rotateLeft(int i, int distance) {
//        return (i << distance) | (i >>> -distance);
//    }
//    private void fixBugIntegerrotateLeft() {
//    	/**@j2sNative
//    	 * 
//    	 java.lang.Integer.rotateLeft=org.sgx.j2s.mauve.fixes.FixesInInteger.rotateLeft;
//    	 */{}
//	}
//
//    
//    /**
//     * Returns the value obtained by rotating the two's complement binary
//     * representation of the specified <tt>int</tt> value right by the
//     * specified number of bits.  (Bits shifted out of the right hand, or
//     * low-order, side reenter on the left, or high-order.)
//     *
//     * <p>Note that right rotation with a negative distance is equivalent to
//     * left rotation: <tt>rotateRight(val, -distance) == rotateLeft(val,
//     * distance)</tt>.  Note also that rotation by any multiple of 32 is a
//     * no-op, so all but the last five bits of the rotation distance can be
//     * ignored, even if the distance is negative: <tt>rotateRight(val,
//     * distance) == rotateRight(val, distance & 0x1F)</tt>.
//     *
//     * @return the value obtained by rotating the two's complement binary
//     *     representation of the specified <tt>int</tt> value right by the
//     *     specified number of bits.
//     * @since 1.5
//     */
//    public static int rotateRight(int i, int distance) {
//        return (i >>> distance) | (i << -distance);
//    }
//    private void fixBugIntegerrotateRight() {
//    	/**@j2sNative
//    	 * 
//    	 java.lang.Integer.rotateRight=org.sgx.j2s.mauve.fixes.FixesInInteger.rotateRight;
//    	 */{}
//	}
//    
//    
//    
//    /**
//     * Returns the value obtained by reversing the order of the bits in the
//     * two's complement binary representation of the specified <tt>int</tt>
//     * value.
//     *
//     * @return the value obtained by reversing order of the bits in the
//     *     specified <tt>int</tt> value.
//     * @since 1.5
//     */
//    public static int reverse(int i) {
//        // HD, Figure 7-1
//	i = (i & 0x55555555) << 1 | (i >>> 1) & 0x55555555;
//	i = (i & 0x33333333) << 2 | (i >>> 2) & 0x33333333;
//	i = (i & 0x0f0f0f0f) << 4 | (i >>> 4) & 0x0f0f0f0f;
//	i = (i << 24) | ((i & 0xff00) << 8) |
//	    ((i >>> 8) & 0xff00) | (i >>> 24);
//	return i;
//    }
//    private void fixBugIntegerreverse() {
//    	/**@j2sNative
//    	 * 
//    	 java.lang.Integer.reverse=org.sgx.j2s.mauve.fixes.FixesInInteger.reverse;
//    	 */{}
//	}
//    
//    
//    
//    /**
//     * Returns the signum function of the specified <tt>int</tt> value.  (The
//     * return value is -1 if the specified value is negative; 0 if the
//     * specified value is zero; and 1 if the specified value is positive.)
//     *
//     * @return the signum function of the specified <tt>int</tt> value.
//     * @since 1.5
//     */
//    public static int signum(int i) {
//        // HD, Section 2-7
//        return (i >> 31) | (-i >>> 31);
//    }
//    private void fixBugIntegersignum() {
//    	/**@j2sNative
//    	 * 
//    	 java.lang.Integer.signum=org.sgx.j2s.mauve.fixes.FixesInInteger.signum;
//    	 */{}
//	}
//    
//    
//    /**
//     * Returns the value obtained by reversing the order of the bytes in the
//     * two's complement representation of the specified <tt>int</tt> value.
//     *
//     * @return the value obtained by reversing the bytes in the specified
//     *     <tt>int</tt> value.
//     * @since 1.5
//     */
//    public static int reverseBytes(int i) {
//        return ((i >>> 24)           ) |
//               ((i >>   8) &   0xFF00) |
//               ((i <<   8) & 0xFF0000) |
//               ((i << 24));
//    }
//    private void fixBugIntegerreverseBytes() {
//    	/**@j2sNative
//    	 * 
//    	 java.lang.Integer.reverseBytes=org.sgx.j2s.mauve.fixes.FixesInInteger.reverseBytes;
//    	 */{}
//	}
    
    
    
    
    
    
//    /* *** Integer.printing to string related methods *** */
    
    //found that toHex, toOctal, are buggy for nevative values. the following start fixing them but it is not applyied because methods exist!:. toString(a,r) is buggy also. 
//    
//    final static char[] digits = {
//	'0' , '1' , '2' , '3' , '4' , '5' ,
//	'6' , '7' , '8' , '9' , 'a' , 'b' ,
//	'c' , 'd' , 'e' , 'f' , 'g' , 'h' ,
//	'i' , 'j' , 'k' , 'l' , 'm' , 'n' ,
//	'o' , 'p' , 'q' , 'r' , 's' , 't' ,
//	'u' , 'v' , 'w' , 'x' , 'y' , 'z'
//    };    
//    /**
//     * Convert the integer to an unsigned number.
//     */
//    private static String toUnsignedString(int i, int shift) {
//		char[] buf = new char[32];
//		int charPos = 32;
//		int radix = 1 << shift;
//		int mask = radix - 1;
//		do {
//		    buf[--charPos] = digits[i & mask];
//		    i >>>= shift;
//		} while (i != 0);
//	
//		return new String(buf, charPos, (32 - charPos));
//    }
//    public static String toBinaryString(int i) {
//    	return toUnsignedString(i, 1);
//    }
//    private void fixBugIntegertoBinaryString() {
//    	/**@j2sNative
//    	 java.lang.Integer.toBinaryString=org.sgx.j2s.mauve.fixes.FixesInInteger.toBinaryString;
//    	 */{}ger.getInteger() *** */	
//	/**
//	 * Integer.getInteger made in java for this java-fix
//	 */
//	public static Integer fixBugIntegerGetInteger_MethodImpl(String nm, Integer val) {
//		String v = null;
//       try {
//           v = System.getProperty(nm);
//       } catch (IllegalArgumentException e) {
//       } catch (NullPointerException e) {
//       }
//		if (v != null) {
//		    try {
//			return Integer.decode(v);
//		    } catch (NumberFormatException e) {
//		    }
//		}
//		return val==null?new Integer(0):val;
//	}
//	public void fixBugIntegerGetInteger() {
//		/**
//		 * @j2sNative
//		 java.lang.Integer.getInteger = org.sgx.j2s.mauve.fixes.FixesInInteger.fixBugIntegerGetInteger_MethodImpl;
//		 */{}
//	}
//	}
    
    
    
    
    

	/* *** Integer.getInteger() *** */	
	/**
	 * Integer.getInteger made in java for this java-fix
	 */
	public static Integer fixBugIntegerGetInteger_MethodImpl(String nm, Integer val) {
		String v = null;
        try {
            v = System.getProperty(nm);
        } catch (IllegalArgumentException e) {
        } catch (NullPointerException e) {
        }
		if (v != null) {
		    try {
			return Integer.decode(v);
		    } catch (NumberFormatException e) {
		    }
		}
		return val==null?new Integer(0):val;
	}
	public void fixBugIntegerGetInteger() {
		/**
		 * @j2sNative
		 java.lang.Integer.getInteger = org.sgx.j2s.mauve.fixes.FixesInInteger.fixBugIntegerGetInteger_MethodImpl;
		 */{}
	}
    
}
