package org.sgx.j2s.mauve.fixes;

public class FixesInLong {
	public void applyAllFixes() {	
			fixBugLongGetLong();
//			fixBugLongBitCount();
//			fixBugLongRotateRight();
//			fixBugLongRotateLeft();
//			fixBugLong_highestOneBit();
//			fixBugLong_lowestOneBit();
//			fixBugLong_numberOfTrailingZeros();
//			fixBugLong_numberOfLeadingZeros();
//			fixBugLong_signum();
//			fixBugLong_reverseBytes();
//			fixBugLong_reverse();
	}
	
	

	
	
	
//	/* *** Long.bitCount() *** */
//	/**
//     * Returns the number of one-bits in the two's complement binary
//     * representation of the specified <tt>long</tt> value.  This function is
//     * sometimes referred to as the <i>population count</i>.
//     *
//     * @return the number of one-bits in the two's complement binary
//     *     representation of the specified <tt>long</tt> value.
//     * @since 1.5
//     */
//     public static int fixBugLongbitCount_MethodImpl(long i) {
//        // HD, Figure 5-14
//	i = i - ((i >>> 1) & 0x5555555555555555L);
//	i = (i & 0x3333333333333333L) + ((i >>> 2) & 0x3333333333333333L);
//	i = (i + (i >>> 4)) & 0x0f0f0f0f0f0f0f0fL;
//	i = i + (i >>> 8);
//	i = i + (i >>> 16);
//	i = i + (i >>> 32);
//	return (int)i & 0x7f;
//     }
//     public void fixBugLongBitCount() {
// 		/**
// 		 * @j2sNative
// 		 java.lang.Long.bitCount = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLongbitCount_MethodImpl;
// 		 */{}
// 	}
//     
//     
//     
//     
//     /* *** Long.rotateLeft() *** */
//     /**
//      * Returns the value obtained by rotating the two's complement binary
//      * representation of the specified <tt>long</tt> value left by the
//      * specified number of bits.  (Bits shifted out of the left hand, or
//      * high-order, side reenter on the right, or low-order.)
//      *
//      * <p>Note that left rotation with a negative distance is equivalent to
//      * right rotation: <tt>rotateLeft(val, -distance) == rotateRight(val,
//      * distance)</tt>.  Note also that rotation by any multiple of 64 is a
//      * no-op, so all but the last six bits of the rotation distance can be
//      * ignored, even if the distance is negative: <tt>rotateLeft(val,
//      * distance) == rotateLeft(val, distance & 0x3F)</tt>.
//      *
//      * @return the value obtained by rotating the two's complement binary
//      *     representation of the specified <tt>long</tt> value left by the
//      *     specified number of bits.
//      * @since 1.5
//      */
//     public static long fixBugLong_rotateLeft(long i, int distance) {
//         return (i << distance) | (i >>> -distance);
//     }
//     public void fixBugLongRotateLeft() {
//  		/**
//  		 * @j2sNative
//  		 java.lang.Long.rotateLeft = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_rotateLeft;
//  		 */{}
//  	}
//     
//     
//  
//     
//     
//     /* *** Long.rotateRight() *** */
//     
//     /**
//      * Returns the value obtained by rotating the two's complement binary
//      * representation of the specified <tt>long</tt> value right by the
//      * specified number of bits.  (Bits shifted out of the right hand, or
//      * low-order, side reenter on the left, or high-order.)
//      *
//      * <p>Note that right rotation with a negative distance is equivalent to
//      * left rotation: <tt>rotateRight(val, -distance) == rotateLeft(val,
//      * distance)</tt>.  Note also that rotation by any multiple of 64 is a
//      * no-op, so all but the last six bits of the rotation distance can be
//      * ignored, even if the distance is negative: <tt>rotateRight(val,
//      * distance) == rotateRight(val, distance & 0x3F)</tt>.
//      *
//      * @return the value obtained by rotating the two's complement binary
//      *     representation of the specified <tt>long</tt> value right by the
//      *     specified number of bits.
//      * @since 1.5
//      */
//     public static long fixBugLong_rotateRight(long i, int distance) {
//         return (i >>> distance) | (i << -distance);
//     }
//     public void fixBugLongRotateRight() {
//   		/**
//   		 * @j2sNative
//   		 java.lang.Long.rotateRight = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_rotateRight;
//   		 */{}
//     }
//     
//     
//     
//     /* *** Long.highestOneBit() *** */
//     /**
//      * Returns a <tt>long</tt> value with at most a single one-bit, in the
//      * position of the highest-order ("leftmost") one-bit in the specified
//      * <tt>long</tt> value.  Returns zero if the specified value has no
//      * one-bits in its two's complement binary representation, that is, if it
//      * is equal to zero.
//      *
//      * @return a <tt>long</tt> value with a single one-bit, in the position
//      *     of the highest-order one-bit in the specified value, or zero if
//      *     the specified value is itself equal to zero.
//      * @since 1.5
//      */
//     public static long fixBugLong_highestOneBit(long i) {
//         // HD, Figure 3-1
//         i |= (i >>  1);
//         i |= (i >>  2);
//         i |= (i >>  4);
//         i |= (i >>  8);
//         i |= (i >> 16);
//         i |= (i >> 32);
//         return i - (i >>> 1);
//     }
//     public void fixBugLong_highestOneBit() {
//    		/**
//    		 * @j2sNative
//    		 java.lang.Long.highestOneBit = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_highestOneBit;
//    		 */{}
//      }
//     
//     
//     
//     /* *** Long.lowestOneBit() *** */
//     
//     /**
//      * Returns a <tt>long</tt> value with at most a single one-bit, in the
//      * position of the lowest-order ("rightmost") one-bit in the specified
//      * <tt>long</tt> value.  Returns zero if the specified value has no
//      * one-bits in its two's complement binary representation, that is, if it
//      * is equal to zero.
//      *
//      * @return a <tt>long</tt> value with a single one-bit, in the position
//      *     of the lowest-order one-bit in the specified value, or zero if
//      *     the specified value is itself equal to zero.
//      * @since 1.5
//      */
//     public static long fixBugLong_lowestOneBit(long i) {
//         // HD, Section 2-1
//         return i & -i;
//     }
//     public void fixBugLong_lowestOneBit() {
//   		/**
//   		 * @j2sNative
//   		 java.lang.Long.lowestOneBit = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_lowestOneBit;
//   		 */{}
//     }
//     
//     
//     
//     
//     
//     
//     /* *** Long.numberOfLeadingZeros() *** */
//     /**
//      * Returns the number of zero bits preceding the highest-order
//      * ("leftmost") one-bit in the two's complement binary representation
//      * of the specified <tt>long</tt> value.  Returns 64 if the
//      * specified value has no one-bits in its two's complement representation,
//      * in other words if it is equal to zero.
//      *
//      * <p>Note that this method is closely related to the logarithm base 2.
//      * For all positive <tt>long</tt> values x:
//      * <ul>
//      * <li>floor(log<sub>2</sub>(x)) = <tt>63 - numberOfLeadingZeros(x)</tt>
//      * <li>ceil(log<sub>2</sub>(x)) = <tt>64 - numberOfLeadingZeros(x - 1)</tt>
//      * </ul>
//      *
//      * @return the number of zero bits preceding the highest-order
//      *     ("leftmost") one-bit in the two's complement binary representation
//      *     of the specified <tt>long</tt> value, or 64 if the value
//      *     is equal to zero.
//      * @since 1.5
//      */
//     public static int fixBugLong_numberOfLeadingZeros(long i) {
//         // HD, Figure 5-6
//          if (i == 0)
//             return 64;
//         int n = 1;
// 	int x = (int)(i >>> 32);
//         if (x == 0) { n += 32; x = (int)i; }
//         if (x >>> 16 == 0) { n += 16; x <<= 16; }
//         if (x >>> 24 == 0) { n +=  8; x <<=  8; }
//         if (x >>> 28 == 0) { n +=  4; x <<=  4; }
//         if (x >>> 30 == 0) { n +=  2; x <<=  2; }
//         n -= x >>> 31;
//         return n;
//     }
//     public void fixBugLong_numberOfLeadingZeros() {
// 		/**
// 		 * @j2sNative
// 		 java.lang.Long.numberOfLeadingZeros = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_numberOfLeadingZeros;
// 		 */{}
//   }
//     
//     
//     
//     
//     /* *** Long.numberOfTrailingZeros() *** */
//     /**
//      * Returns the number of zero bits following the lowest-order ("rightmost")
//      * one-bit in the two's complement binary representation of the specified
//      * <tt>long</tt> value.  Returns 64 if the specified value has no
//      * one-bits in its two's complement representation, in other words if it is
//      * equal to zero.
//      *
//      * @return the number of zero bits following the lowest-order ("rightmost")
//      *     one-bit in the two's complement binary representation of the
//      *     specified <tt>long</tt> value, or 64 if the value is equal
//      *     to zero.
//      * @since 1.5
//      */
//     public static int fixBugLong_numberOfTrailingZeros(long i) {
//         // HD, Figure 5-14
// 	int x, y;
// 	if (i == 0) return 64;
// 	int n = 63;
// 	y = (int)i; if (y != 0) { n = n -32; x = y; } else x = (int)(i>>>32);
// 	y = x <<16; if (y != 0) { n = n -16; x = y; }
// 	y = x << 8; if (y != 0) { n = n - 8; x = y; }
// 	y = x << 4; if (y != 0) { n = n - 4; x = y; }
// 	y = x << 2; if (y != 0) { n = n - 2; x = y; }
// 	return n - ((x << 1) >>> 31);
//     }
//     public void fixBugLong_numberOfTrailingZeros() {
//  		/**
//  		 * @j2sNative
//  		 java.lang.Long.numberOfTrailingZeros = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_numberOfTrailingZeros;
//  		 */{}
//    }
//     
//     
//     
//     
//     /**
//      * Returns the signum function of the specified <tt>long</tt> value.  (The
//      * return value is -1 if the specified value is negative; 0 if the
//      * specified value is zero; and 1 if the specified value is positive.)
//      *
//      * @return the signum function of the specified <tt>long</tt> value.
//      * @since 1.5
//      */
//     public static int fixBugLong_signum(long i) {
//         // HD, Section 2-7
//         return (int) ((i >> 63) | (-i >>> 63));
//     }
//     public void fixBugLong_signum() {
//   		/**
//   		 * @j2sNative
//   		 java.lang.Long.signum = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_signum;
//   		 */{}
//     }
//     
//     
//     
//     
//     /**
//      * Returns the value obtained by reversing the order of the bytes in the
//      * two's complement representation of the specified <tt>long</tt> value.
//      *
//      * @return the value obtained by reversing the bytes in the specified
//      *     <tt>long</tt> value.
//      * @since 1.5
//      */
//     public static long fixBugLong_reverseBytes(long i) {
//         i = (i & 0x00ff00ff00ff00ffL) << 8 | (i >>> 8) & 0x00ff00ff00ff00ffL;
//         return (i << 48) | ((i & 0xffff0000L) << 16) |
//             ((i >>> 16) & 0xffff0000L) | (i >>> 48);
//     }
//     public void fixBugLong_reverseBytes() {
//    		/**
//    		 * @j2sNative
//    		 java.lang.Long.reverseBytes = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_reverseBytes;
//    		 */{}
//      }
//     
//     
//     
//     
//     /**
//      * Returns the value obtained by reversing the order of the bits in the
//      * two's complement binary representation of the specified <tt>long</tt>
//      * value.
//      *
//      * @return the value obtained by reversing order of the bits in the
//      *     specified <tt>long</tt> value.
//      * @since 1.5
//      */
//     public static long fixBugLong_reverse(long i) {
//         // HD, Figure 7-1
// 	i = (i & 0x5555555555555555L) << 1 | (i >>> 1) & 0x5555555555555555L;
// 	i = (i & 0x3333333333333333L) << 2 | (i >>> 2) & 0x3333333333333333L;
// 	i = (i & 0x0f0f0f0f0f0f0f0fL) << 4 | (i >>> 4) & 0x0f0f0f0f0f0f0f0fL;
// 	i = (i & 0x00ff00ff00ff00ffL) << 8 | (i >>> 8) & 0x00ff00ff00ff00ffL;
// 	i = (i << 48) | ((i & 0xffff0000L) << 16) |
// 	    ((i >>> 16) & 0xffff0000L) | (i >>> 48);
// 	return i;
//     }
//     public void fixBugLong_reverse() {
// 		/**
// 		 * @j2sNative
// 		 java.lang.Long.reverse = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLong_reverse;
// 		 */{}
//   }
     
     
     
     

 	/* *** Long.getLong() *** */
 	
 	/**
 	 *  Long.getLong() made in java for this java-fix
 	 */
 	public static Long fixBugLongGetLong_MethodImpl(String nm, Long val) {
 		String v = null;
         try {
             v = System.getProperty(nm);
         } catch (IllegalArgumentException e) {
         } catch (NullPointerException e) {
         }
 		if (v != null) {
 		    try {
 			return Long.decode(v);
 		    } catch (NumberFormatException e) {
 		    }
 		}
 		return val==null?new Integer(0):val;
 	}
 	public void fixBugLongGetLong() {
 		/**
 		 * @j2sNative
 		 java.lang.Long.getLong = org.sgx.j2s.mauve.fixes.FixesInLong.fixBugLongGetLong_MethodImpl;
 		 */{}
 	}
 	
 	
}
