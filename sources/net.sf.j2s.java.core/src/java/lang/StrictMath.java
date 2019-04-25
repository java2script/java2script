/*
 * Copyright (c) 1999, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package java.lang;

/**
 * The class {@code StrictMath} contains methods for performing basic
 * numeric operations such as the elementary exponential, logarithm,
 * square root, and trigonometric functions.
 *
 * <p>To help ensure portability of Java programs, the definitions of
 * some of the numeric functions in this package require that they
 * produce the same results as certain published algorithms. These
 * algorithms are available from the well-known network library
 * {@code netlib} as the package "Freely Distributable Math
 * Library," <a
 * href="ftp://ftp.netlib.org/fdlibm.tar">{@code fdlibm}</a>. These
 * algorithms, which are written in the C programming language, are
 * then to be understood as executed with all floating-point
 * operations following the rules of Java floating-point arithmetic.
 *
 * <p>The Java math library is defined with respect to
 * {@code fdlibm} version 5.3. Where {@code fdlibm} provides
 * more than one definition for a function (such as
 * {@code acos}), use the "IEEE 754 core function" version
 * (residing in a file whose name begins with the letter
 * {@code e}).  The methods which require {@code fdlibm}
 * semantics are {@code sin}, {@code cos}, {@code tan},
 * {@code asin}, {@code acos}, {@code atan},
 * {@code exp}, {@code log}, {@code log10},
 * {@code cbrt}, {@code atan2}, {@code pow},
 * {@code sinh}, {@code cosh}, {@code tanh},
 * {@code hypot}, {@code expm1}, and {@code log1p}.
 *
 * <p>
 * The platform uses signed two's complement integer arithmetic with
 * int and long primitive types.  The developer should choose
 * the primitive type to ensure that arithmetic operations consistently
 * produce correct results, which in some cases means the operations
 * will not overflow the range of values of the computation.
 * The best practice is to choose the primitive type and algorithm to avoid
 * overflow. In cases where the size is {@code int} or {@code long} and
 * overflow errors need to be detected, the methods {@code addExact},
 * {@code subtractExact}, {@code multiplyExact}, and {@code toIntExact}
 * throw an {@code ArithmeticException} when the results overflow.
 * For other arithmetic operations such as divide, absolute value,
 * increment, decrement, and negation overflow occurs only with
 * a specific minimum or maximum value and should be checked against
 * the minimum or maximum as appropriate.
 *
 * @author  unascribed
 * @author  Joseph D. Darcy
 * @since   1.3
 */

public final class StrictMath {

    /**
     * Don't let anyone instantiate this class.
     */
    private StrictMath() {}

    /**
     * The {@code double} value that is closer than any other to
     * <i>e</i>, the base of the natural logarithms.
     */
    public static final double E = 2.7182818284590452354;

    /**
     * The {@code double} value that is closer than any other to
     * <i>pi</i>, the ratio of the circumference of a circle to its
     * diameter.
     */
    public static final double PI = 3.14159265358979323846;

    /**
     * Returns the sum of its arguments,
     * throwing an exception if the result overflows an {@code int}.
     *
     * @param x the first value
     * @param y the second value
     * @return the result
     * @throws ArithmeticException if the result overflows an int
     * @see Math#addExact(int,int)
     * @since 1.8
     * 
     * @j2sNative return math.addExact$I$I(x, y);
     */
    public static int addExact(int x, int y) {
        return Math.addExact(x, y);
    }

    /**
     * Returns the sum of its arguments,
     * throwing an exception if the result overflows a {@code long}.
     *
     * @param x the first value
     * @param y the second value
     * @return the result
     * @throws ArithmeticException if the result overflows a long
     * @see Math#addExact(long,long)
     * @since 1.8
    * @j2sNative return math.addExact$J$J(x, y);
     */
    public static long addExact(long x, long y) {
        return Math.addExact(x, y);
    }

    /**
     * Returns the difference of the arguments,
     * throwing an exception if the result overflows an {@code int}.
     *
     * @param x the first value
     * @param y the second value to subtract from the first
     * @return the result
     * @throws ArithmeticException if the result overflows an int
     * @see Math#subtractExact(int,int)
     * @since 1.8
    * @j2sNative return math.subtractExact$I$I(x, y);
     */
    public static int subtractExact(int x, int y) {
        return Math.subtractExact(x, y);
    }

    /**
     * Returns the difference of the arguments,
     * throwing an exception if the result overflows a {@code long}.
     *
     * @param x the first value
     * @param y the second value to subtract from the first
     * @return the result
     * @throws ArithmeticException if the result overflows a long
     * @see Math#subtractExact(long,long)
     * @since 1.8
    * @j2sNative return math.subtractExact$J$J(x, y);
     */
    public static long subtractExact(long x, long y) {
        return Math.subtractExact(x, y);
    }

    /**
     * Returns the product of the arguments,
     * throwing an exception if the result overflows an {@code int}.
     *
     * @param x the first value
     * @param y the second value
     * @return the result
     * @throws ArithmeticException if the result overflows an int
     * @see Math#multiplyExact(int,int)
     * @since 1.8
    * @j2sNative return math.multiplyExact$I$I(x, y);
     */
    public static int multiplyExact(int x, int y) {
        return Math.multiplyExact(x, y);
    }

    /**
     * Returns the product of the arguments,
     * throwing an exception if the result overflows a {@code long}.
     *
     * @param x the first value
     * @param y the second value
     * @return the result
     * @throws ArithmeticException if the result overflows a long
     * @see Math#multiplyExact(long,long)
     * @since 1.8
    * @j2sNative return math.multiplyExact$J$J(x, y);
     */
    public static long multiplyExact(long x, long y) {
        return Math.multiplyExact(x, y);
    }

    /**
     * Returns the value of the {@code long} argument;
     * throwing an exception if the value overflows an {@code int}.
     *
     * @param value the long value
     * @return the argument as an int
     * @throws ArithmeticException if the {@code argument} overflows an int
     * @see Math#toIntExact(long)
     * @since 1.8
    * @j2sNative return math.toIntExact$J(value);
     */
    public static int toIntExact(long value) {
        return Math.toIntExact(value);
    }

    /**
     * Returns the largest (closest to positive infinity)
     * {@code int} value that is less than or equal to the algebraic quotient.
     * There is one special case, if the dividend is the
     * {@linkplain Integer#MIN_VALUE Integer.MIN_VALUE} and the divisor is {@code -1},
     * then integer overflow occurs and
     * the result is equal to the {@code Integer.MIN_VALUE}.
     * <p>
     * See {@link Math#floorDiv(int, int) Math.floorDiv} for examples and
     * a comparison to the integer division {@code /} operator.
     *
     * @param x the dividend
     * @param y the divisor
     * @return the largest (closest to positive infinity)
     * {@code int} value that is less than or equal to the algebraic quotient.
     * @throws ArithmeticException if the divisor {@code y} is zero
     * @see Math#floorDiv(int, int)
     * @see Math#floor(double)
     * @since 1.8
    * @j2sNative return math.floorDiv$I$I(x, y);
     */
    public static int floorDiv(int x, int y) {
        return Math.floorDiv(x, y);
    }

    /**
     * Returns the largest (closest to positive infinity)
     * {@code long} value that is less than or equal to the algebraic quotient.
     * There is one special case, if the dividend is the
     * {@linkplain Long#MIN_VALUE Long.MIN_VALUE} and the divisor is {@code -1},
     * then integer overflow occurs and
     * the result is equal to the {@code Long.MIN_VALUE}.
     * <p>
     * See {@link Math#floorDiv(int, int) Math.floorDiv} for examples and
     * a comparison to the integer division {@code /} operator.
     *
     * @param x the dividend
     * @param y the divisor
     * @return the largest (closest to positive infinity)
     * {@code long} value that is less than or equal to the algebraic quotient.
     * @throws ArithmeticException if the divisor {@code y} is zero
     * @see Math#floorDiv(long, long)
     * @see Math#floor(double)
    * @j2sNative return math.floorDiv$J$J(x, y);
     * @since 1.8
     */
    public static long floorDiv(long x, long y) {
        return Math.floorDiv(x, y);
    }

    /**
     * Returns the floor modulus of the {@code int} arguments.
     * <p>
     * The floor modulus is {@code x - (floorDiv(x, y) * y)},
     * has the same sign as the divisor {@code y}, and
     * is in the range of {@code -abs(y) < r < +abs(y)}.
     * <p>
     * The relationship between {@code floorDiv} and {@code floorMod} is such that:
     * <ul>
     *   <li>{@code floorDiv(x, y) * y + floorMod(x, y) == x}
     * </ul>
     * <p>
     * See {@link Math#floorMod(int, int) Math.floorMod} for examples and
     * a comparison to the {@code %} operator.
     *
     * @param x the dividend
     * @param y the divisor
     * @return the floor modulus {@code x - (floorDiv(x, y) * y)}
     * @throws ArithmeticException if the divisor {@code y} is zero
     * @see Math#floorMod(int, int)
     * @see StrictMath#floorDiv(int, int)
     * @since 1.8
    * @j2sNative return math.floorMod$I$I(x, y);
     */
    public static int floorMod(int x, int y) {
        return Math.floorMod(x , y);
    }
    /**
     * Returns the floor modulus of the {@code long} arguments.
     * <p>
     * The floor modulus is {@code x - (floorDiv(x, y) * y)},
     * has the same sign as the divisor {@code y}, and
     * is in the range of {@code -abs(y) < r < +abs(y)}.
     * <p>
     * The relationship between {@code floorDiv} and {@code floorMod} is such that:
     * <ul>
     *   <li>{@code floorDiv(x, y) * y + floorMod(x, y) == x}
     * </ul>
     * <p>
     * See {@link Math#floorMod(int, int) Math.floorMod} for examples and
     * a comparison to the {@code %} operator.
     *
     * @param x the dividend
     * @param y the divisor
     * @return the floor modulus {@code x - (floorDiv(x, y) * y)}
     * @throws ArithmeticException if the divisor {@code y} is zero
     * @see Math#floorMod(long, long)
     * @see StrictMath#floorDiv(long, long)
     * @since 1.8
    * @j2sNative return math.floorMod$J$J(x, y);
     */
    public static long floorMod(long x, long y) {
        return Math.floorMod(x, y);
    }

    /**
     * Returns the first floating-point argument with the sign of the
     * second floating-point argument.  For this method, a NaN
     * {@code sign} argument is always treated as if it were
     * positive.
     *
     * @param magnitude  the parameter providing the magnitude of the result
     * @param sign   the parameter providing the sign of the result
     * @return a value with the magnitude of {@code magnitude}
     * and the sign of {@code sign}.
     * @since 1.6
     */
    public static double copySign(double magnitude, double sign) {
        return Math.copySign(magnitude, (Double.isNaN(sign)?1.0d:sign));
    }

    /**
     * Returns the first floating-point argument with the sign of the
     * second floating-point argument.  For this method, a NaN
     * {@code sign} argument is always treated as if it were
     * positive.
     *
     * @param magnitude  the parameter providing the magnitude of the result
     * @param sign   the parameter providing the sign of the result
     * @return a value with the magnitude of {@code magnitude}
     * and the sign of {@code sign}.
     * @since 1.6
     */
    public static float copySign(float magnitude, float sign) {
        return Math.copySign(magnitude, (Float.isNaN(sign)?1.0f:sign));
    }
    /**
     * Returns the unbiased exponent used in the representation of a
     * {@code float}.  Special cases:
     *
     * <ul>
     * <li>If the argument is NaN or infinite, then the result is
     * {@link Float#MAX_EXPONENT} + 1.
     * <li>If the argument is zero or subnormal, then the result is
     * {@link Float#MIN_EXPONENT} -1.
     * </ul>
     * @param f a {@code float} value
     * @return the unbiased exponent of the argument
     * @since 1.6
     */
    public static int getExponent(float f) {
        return Math.getExponent(f);
    }

    /**
     * Returns the unbiased exponent used in the representation of a
     * {@code double}.  Special cases:
     *
     * <ul>
     * <li>If the argument is NaN or infinite, then the result is
     * {@link Double#MAX_EXPONENT} + 1.
     * <li>If the argument is zero or subnormal, then the result is
     * {@link Double#MIN_EXPONENT} -1.
     * </ul>
     * @param d a {@code double} value
     * @return the unbiased exponent of the argument
     * @since 1.6
     */
    public static int getExponent(double d) {
        return Math.getExponent(d);
    }

    /**
     * Returns the floating-point number adjacent to the first
     * argument in the direction of the second argument.  If both
     * arguments compare as equal the second argument is returned.
     *
     * <p>Special cases:
     * <ul>
     * <li> If either argument is a NaN, then NaN is returned.
     *
     * <li> If both arguments are signed zeros, {@code direction}
     * is returned unchanged (as implied by the requirement of
     * returning the second argument if the arguments compare as
     * equal).
     *
     * <li> If {@code start} is
     * &plusmn;{@link Double#MIN_VALUE} and {@code direction}
     * has a value such that the result should have a smaller
     * magnitude, then a zero with the same sign as {@code start}
     * is returned.
     *
     * <li> If {@code start} is infinite and
     * {@code direction} has a value such that the result should
     * have a smaller magnitude, {@link Double#MAX_VALUE} with the
     * same sign as {@code start} is returned.
     *
     * <li> If {@code start} is equal to &plusmn;
     * {@link Double#MAX_VALUE} and {@code direction} has a
     * value such that the result should have a larger magnitude, an
     * infinity with same sign as {@code start} is returned.
     * </ul>
     *
     * @param start  starting floating-point value
     * @param direction value indicating which of
     * {@code start}'s neighbors or {@code start} should
     * be returned
     * @return The floating-point number adjacent to {@code start} in the
     * direction of {@code direction}.
     * @since 1.6
     */
    public static double nextAfter(double start, double direction) {
        return Math.nextAfter(start, direction);
    }

    /**
     * Returns the floating-point number adjacent to the first
     * argument in the direction of the second argument.  If both
     * arguments compare as equal a value equivalent to the second argument
     * is returned.
     *
     * <p>Special cases:
     * <ul>
     * <li> If either argument is a NaN, then NaN is returned.
     *
     * <li> If both arguments are signed zeros, a value equivalent
     * to {@code direction} is returned.
     *
     * <li> If {@code start} is
     * &plusmn;{@link Float#MIN_VALUE} and {@code direction}
     * has a value such that the result should have a smaller
     * magnitude, then a zero with the same sign as {@code start}
     * is returned.
     *
     * <li> If {@code start} is infinite and
     * {@code direction} has a value such that the result should
     * have a smaller magnitude, {@link Float#MAX_VALUE} with the
     * same sign as {@code start} is returned.
     *
     * <li> If {@code start} is equal to &plusmn;
     * {@link Float#MAX_VALUE} and {@code direction} has a
     * value such that the result should have a larger magnitude, an
     * infinity with same sign as {@code start} is returned.
     * </ul>
     *
     * @param start  starting floating-point value
     * @param direction value indicating which of
     * {@code start}'s neighbors or {@code start} should
     * be returned
     * @return The floating-point number adjacent to {@code start} in the
     * direction of {@code direction}.
     * @since 1.6
     * 
     * @j2sNative return Math.nextAfter$F$D(start, direction);
     */
    public static float nextAfter(float start, double direction) {
        return Math.nextAfter(start, direction);
    }

    /**
     * Returns the floating-point value adjacent to {@code d} in
     * the direction of positive infinity.  This method is
     * semantically equivalent to {@code nextAfter(d,
     * Double.POSITIVE_INFINITY)}; however, a {@code nextUp}
     * implementation may run faster than its equivalent
     * {@code nextAfter} call.
     *
     * <p>Special Cases:
     * <ul>
     * <li> If the argument is NaN, the result is NaN.
     *
     * <li> If the argument is positive infinity, the result is
     * positive infinity.
     *
     * <li> If the argument is zero, the result is
     * {@link Double#MIN_VALUE}
     *
     * </ul>
     *
     * @param d starting floating-point value
     * @return The adjacent floating-point value closer to positive
     * infinity.
     * @since 1.6
     */
    public static double nextUp(double d) {
        return Math.nextUp(d);
    }

    /**
     * Returns the floating-point value adjacent to {@code f} in
     * the direction of positive infinity.  This method is
     * semantically equivalent to {@code nextAfter(f,
     * Float.POSITIVE_INFINITY)}; however, a {@code nextUp}
     * implementation may run faster than its equivalent
     * {@code nextAfter} call.
     *
     * <p>Special Cases:
     * <ul>
     * <li> If the argument is NaN, the result is NaN.
     *
     * <li> If the argument is positive infinity, the result is
     * positive infinity.
     *
     * <li> If the argument is zero, the result is
     * {@link Float#MIN_VALUE}
     *
     * </ul>
     *
     * @param f starting floating-point value
     * @return The adjacent floating-point value closer to positive
     * infinity.
     * @since 1.6
     */
    public static float nextUp(float f) {
        return Math.nextUp(f);
    }

    /**
     * Returns the floating-point value adjacent to {@code d} in
     * the direction of negative infinity.  This method is
     * semantically equivalent to {@code nextAfter(d,
     * Double.NEGATIVE_INFINITY)}; however, a
     * {@code nextDown} implementation may run faster than its
     * equivalent {@code nextAfter} call.
     *
     * <p>Special Cases:
     * <ul>
     * <li> If the argument is NaN, the result is NaN.
     *
     * <li> If the argument is negative infinity, the result is
     * negative infinity.
     *
     * <li> If the argument is zero, the result is
     * {@code -Double.MIN_VALUE}
     *
     * </ul>
     *
     * @param d  starting floating-point value
     * @return The adjacent floating-point value closer to negative
     * infinity.
     * @since 1.8
     * 
     */
    public static double nextDown(double d) {
        return Math.nextDown(d);
    }

    /**
     * Returns the floating-point value adjacent to {@code f} in
     * the direction of negative infinity.  This method is
     * semantically equivalent to {@code nextAfter(f,
     * Float.NEGATIVE_INFINITY)}; however, a
     * {@code nextDown} implementation may run faster than its
     * equivalent {@code nextAfter} call.
     *
     * <p>Special Cases:
     * <ul>
     * <li> If the argument is NaN, the result is NaN.
     *
     * <li> If the argument is negative infinity, the result is
     * negative infinity.
     *
     * <li> If the argument is zero, the result is
     * {@code -Float.MIN_VALUE}
     *
     * </ul>
     *
     * @param f  starting floating-point value
     * @return The adjacent floating-point value closer to negative
     * infinity.
     * @since 1.8
     */
    public static float nextDown(float f) {
        return Math.nextDown(f);
    }

    /**
     * Returns {@code d} &times;
     * 2<sup>{@code scaleFactor}</sup> rounded as if performed
     * by a single correctly rounded floating-point multiply to a
     * member of the double value set.  See the Java
     * Language Specification for a discussion of floating-point
     * value sets.  If the exponent of the result is between {@link
     * Double#MIN_EXPONENT} and {@link Double#MAX_EXPONENT}, the
     * answer is calculated exactly.  If the exponent of the result
     * would be larger than {@code Double.MAX_EXPONENT}, an
     * infinity is returned.  Note that if the result is subnormal,
     * precision may be lost; that is, when {@code scalb(x, n)}
     * is subnormal, {@code scalb(scalb(x, n), -n)} may not equal
     * <i>x</i>.  When the result is non-NaN, the result has the same
     * sign as {@code d}.
     *
     * <p>Special cases:
     * <ul>
     * <li> If the first argument is NaN, NaN is returned.
     * <li> If the first argument is infinite, then an infinity of the
     * same sign is returned.
     * <li> If the first argument is zero, then a zero of the same
     * sign is returned.
     * </ul>
     *
     * @param d number to be scaled by a power of two.
     * @param scaleFactor power of 2 used to scale {@code d}
     * @return {@code d} &times; 2<sup>{@code scaleFactor}</sup>
     * @since 1.6
     */
    public static double scalb(double d, int scaleFactor) {
        return Math.scalb(d, scaleFactor);
    }

    /**
     * Returns {@code f} &times;
     * 2<sup>{@code scaleFactor}</sup> rounded as if performed
     * by a single correctly rounded floating-point multiply to a
     * member of the float value set.  See the Java
     * Language Specification for a discussion of floating-point
     * value sets.  If the exponent of the result is between {@link
     * Float#MIN_EXPONENT} and {@link Float#MAX_EXPONENT}, the
     * answer is calculated exactly.  If the exponent of the result
     * would be larger than {@code Float.MAX_EXPONENT}, an
     * infinity is returned.  Note that if the result is subnormal,
     * precision may be lost; that is, when {@code scalb(x, n)}
     * is subnormal, {@code scalb(scalb(x, n), -n)} may not equal
     * <i>x</i>.  When the result is non-NaN, the result has the same
     * sign as {@code f}.
     *
     * <p>Special cases:
     * <ul>
     * <li> If the first argument is NaN, NaN is returned.
     * <li> If the first argument is infinite, then an infinity of the
     * same sign is returned.
     * <li> If the first argument is zero, then a zero of the same
     * sign is returned.
     * </ul>
     *
     * @param f number to be scaled by a power of two.
     * @param scaleFactor power of 2 used to scale {@code f}
     * @return {@code f} &times; 2<sup>{@code scaleFactor}</sup>
     * @since 1.6
     */
    public static float scalb(float f, int scaleFactor) {
        return Math.scalb(f, scaleFactor);
    }
	
	
	
	/**
	 * Answers the absolute value of the argument.
	 * 
	 * @param d
	 *            the value to be converted
	 * @return the argument if it is positive, otherwise the negation of the
	 *         argument.
	 * 
	 * @j2sNative return Math.abs (d);
	 */
	public static double abs(double d) {
		long bits = Double.doubleToLongBits(d);
		bits &= 0x7fffffffffffffffL;
		return Double.longBitsToDouble(bits);
	}

	/**
	 * Answers the absolute value of the argument.
	 * 
	 * @param f
	 *            the value to be converted
	 * @return the argument if it is positive, otherwise the negation of the
	 *         argument.
	 * 
	 * @j2sNative return Math.abs (f);
	 */
	public static float abs(float f) {
		int bits = Float.floatToIntBits(f);
		bits &= 0x7fffffff;
		return Float.intBitsToFloat(bits);
	}

	/**
	 * Answers the absolute value of the argument.
	 * 
	 * @param i
	 *            the value to be converted
	 * @return the argument if it is positive, otherwise the negation of the
	 *         argument.
	 * 
	 */
	public static int abs(int i) {
		return i >= 0 ? i : -i;
	}

	/**
	 * Answers the absolute value of the argument.
	 * 
	 * @param l
	 *            the value to be converted
	 * @return the argument if it is positive, otherwise the negation of the
	 *         argument.
	 * 
	 */
	public static long abs(long l) {
		return l >= 0 ? l : -l;
	}

	/**
	 * Answers the closest double approximation of the arc cosine of the
	 * argument
	 * 
	 * @param d
	 *            the value to compute acos of
	 * @return the arc cosine of the argument.
	 * 
	 * @j2sNative return Math.acos (d);
	 */
	public static double acos(double d) {return 0;}

	/**
	 * Answers the closest double approximation of the arc sine of the argument
	 * 
	 * @param d
	 *            the value to compute asin of
	 * @return the arc sine of the argument.
	 * 
	 * @j2sNative return Math.asin (d);
	 */
	public static double asin(double d) {return 0;}

	/**
	 * Answers the closest double approximation of the arc tangent of the
	 * argument
	 * 
	 * @param d
	 *            the value to compute atan of
	 * @return the arc tangent of the argument.
	 * 
	 * @j2sNative return Math.atan (d);
	 */
	public static double atan(double d) {return 0;}

	/**
	 * Answers the closest double approximation of the arc tangent of the result
	 * of dividing the first argument by the second argument.
	 * 
	 * @param d1
	 *            the numerator of the value to compute atan of
	 * @param d2
	 *            the denominator of the value to compute atan of
	 * @return the arc tangent of d1/d2.
	 * 
	 * @j2sNative return Math.atan2 (d1, d2);
	 */
	public static double atan2(double d1, double d2) {return 0;}
    
     /**
     * Answers the closest double approximation of the cube root of the
     * argument. 
     * 
     * @param d
     *             the value to compute cube root of
     * @return the cube root of the argument.
     */
    public static double cbrt(double d) {return 0;}

	/**
	 * Answers the double conversion of the most negative (i.e. closest to
	 * negative infinity) integer value which is greater than the argument.
	 * 
	 * @param d
	 *            the value to be converted
	 * @return the ceiling of the argument.
	 * 
	 * @j2sNative return Math.ceil (d);
	 */
	public static double ceil(double d) {return 0;}
    
    
    /**
     * Answers the closest double approximation of the hyperbolic cosine of the
     * argument.
     * 
     * @param d
     *            the value to compute hyperbolic cosine of
     * @return the hyperbolic cosine of the argument.
	 * 
	 * @j2sNative return Math.cosh (d);
     */
    public static double cosh(double d) {return 0;}

	/**
	 * Answers the closest double approximation of the cosine of the argument
	 * 
	 * @param d
	 *            the value to compute cos of
	 * @return the cosine of the argument.
	 * 
	 * @j2sNative return Math.cos (d);
	 */
	public static double cos(double d) {return 0;}

	/**
	 * Answers the closest double approximation of the raising "e" to the power
	 * of the argument
	 * 
	 * @param d
	 *            the value to compute the exponential of
	 * @return the exponential of the argument.
	 * 
	 * @j2sNative return Math.exp (d);
	 */
	public static double exp(double d) {return 0;}
    
    /**
     * Answers the closest double approximation of <i>e</i><sup>d</sup> - 1.
     * If the argument is very close to 0, it is much more accurate to use
     * expm1(d)+1 than exp(d).
     * 
     * @param d
     *            the value to compute the <i>e</i><sup>d</sup> - 1 of
     * @return the <i>e</i><sup>d</sup> - 1 value of the argument.
     */
    public static double expm1(double d) {return 0;}

	/**
	 * Answers the double conversion of the most positive (i.e. closest to
	 * positive infinity) integer value which is less than the argument.
	 * 
	 * 
	 * @param d
	 *            the value to be converted
	 * @return the ceiling of the argument.
	 * 
	 * @j2sNative return Math.floor (d);
	 */
	public static double floor(double d) {return 0;}
    
    /**
     * Answers sqrt(<i>x</i><sup>2</sup>+<i>y</i><sup>2</sup>). The
     * final result is without medium underflow or overflow.
     * 
     * @param x
     *            a double number
     * @param y
     *            a double number
     * @return the sqrt(<i>x</i><sup>2</sup>+<i>y</i><sup>2</sup>) value
     *         of the arguments.
     *         
     * @j2sNative return Math.sqrt(x * x + y * y);
     */
    public static double hypot(double x, double y) {return 0;}

	/**
	 * Answers the remainder of dividing the first argument by the second using
	 * the IEEE 754 rules.
	 * 
	 * @param d1
	 *            the numerator of the operation
	 * @param d2
	 *            the denominator of the operation
	 * @return the result of d1/d2.
	 */
	public static double IEEEremainder(double d1, double d2) {return Math.IEEEremainder(d1,  d2);}

	/**
	 * Answers the closest double approximation of the natural logarithm of the
	 * argument
	 * 
	 * @param d
	 *            the value to compute the log of
	 * @return the natural logarithm of the argument.
	 * 
	 * @j2sNative return Math.log (d);
	 */
	public static double log(double d) {return 0;}
    
    /**
     * Answers the logarithm of the argument and the base is 10.
     * 
     * @param d
     *            the value to compute the base 10 log of
     * @return the base 10 logarithm of the argument.
	 * 
	 * @j2sNative return Math.log10 (d);
     */
    public static double log10(double d) {return 0;}
    
    /**
     * Answers the closest double approximation of the natural logarithm of the
     * sum of the argument and 1. If the argument is very close to 0, it is much
     * more accurate to use log1p(d) than log(1.0+d).
     * 
     * @param d
     *            the value to compute the ln(1+d) of
     * @return the natural logarithm of the sum of the argument and 1.
     * 
     * @j2sNative return Math.log(d + 1);
     */
    public static double log1p(double d) {return 0;}

	/**
	 * Answers the most positive (i.e. closest to positive infinity) of the two
	 * arguments.
	 * 
	 * @param d1
	 *            the first argument to check
	 * @param d2
	 *            the second argument
	 * @return the larger of d1 and d2.
	 * 
	 * @j2sNative return Math.max (d1, d2);
	 */
	public static double max(double d1, double d2) {
		if (d1 > d2)
			return d1;
		if (d1 < d2)
			return d2;
		/* if either arg is NaN, return NaN */
		if (d1 != d2)
			return Double.NaN;
		/* max( +0.0,-0.0) == +0.0 */
		if (d1 == 0.0
				&& ((Double.doubleToLongBits(d1) & Double.doubleToLongBits(d2)) & 0x8000000000000000L) == 0)
			return 0.0;
		return d1;
	}

	/**
	 * Answers the most positive (i.e. closest to positive infinity) of the two
	 * arguments.
	 * 
	 * @param f1
	 *            the first argument to check
	 * @param f2
	 *            the second argument
	 * @return the larger of f1 and f2.
	 * 
	 * @j2sNative return Math.max (f1, f2);
	 */
	public static float max(float f1, float f2) {
		if (f1 > f2)
			return f1;
		if (f1 < f2)
			return f2;
		/* if either arg is NaN, return NaN */
		if (f1 != f2)
			return Float.NaN;
		/* max( +0.0,-0.0) == +0.0 */
		if (f1 == 0.0f
				&& ((Float.floatToIntBits(f1) & Float.floatToIntBits(f2)) & 0x80000000) == 0)
			return 0.0f;
		return f1;
	}

	/**
	 * Answers the most positive (i.e. closest to positive infinity) of the two
	 * arguments.
	 * 
	 * @param i1
	 *            the first argument to check
	 * @param i2
	 *            the second argument
	 * @return the larger of i1 and i2.
	 * 
	 * @j2sNative return Math.max (i1, i2);
	 */
	public static int max(int i1, int i2) {
		return i1 > i2 ? i1 : i2;
	}

	/**
	 * Answers the most positive (i.e. closest to positive infinity) of the two
	 * arguments.
	 * 
	 * @param l1
	 *            the first argument to check
	 * @param l2
	 *            the second argument
	 * @return the larger of l1 and l2.
	 * 
	 * @j2sNative return Math.max (l1, l2);
	 */
	public static long max(long l1, long l2) {
		return l1 > l2 ? l1 : l2;
	}

	/**
	 * Answers the most negative (i.e. closest to negative infinity) of the two
	 * arguments.
	 * 
	 * @param d1
	 *            the first argument to check
	 * @param d2
	 *            the second argument
	 * @return the smaller of d1 and d2.
	 * 
	 * @j2sNative return Math.min (d1, d2);
	 */
	public static double min(double d1, double d2) {
		if (d1 > d2)
			return d2;
		if (d1 < d2)
			return d1;
		/* if either arg is NaN, return NaN */
		if (d1 != d2)
			return Double.NaN;
		/* min( +0.0,-0.0) == -0.0 */
		if (d1 == 0.0
				&& ((Double.doubleToLongBits(d1) | Double.doubleToLongBits(d2)) & 0x8000000000000000l) != 0)
			return 0.0 * (-1.0);
		return d1;
	}

	/**
	 * Answers the most negative (i.e. closest to negative infinity) of the two
	 * arguments.
	 * 
	 * @param f1
	 *            the first argument to check
	 * @param f2
	 *            the second argument
	 * @return the smaller of f1 and f2.
	 * 
	 * @j2sNative return Math.min (f1, f2);
	 */
	public static float min(float f1, float f2) {
		if (f1 > f2)
			return f2;
		if (f1 < f2)
			return f1;
		/* if either arg is NaN, return NaN */
		if (f1 != f2)
			return Float.NaN;
		/* min( +0.0,-0.0) == -0.0 */
		if (f1 == 0.0f
				&& ((Float.floatToIntBits(f1) | Float.floatToIntBits(f2)) & 0x80000000) != 0)
			return 0.0f * (-1.0f);
		return f1;
	}

	/**
	 * Answers the most negative (i.e. closest to negative infinity) of the two
	 * arguments.
	 * 
	 * @param i1
	 *            the first argument to check
	 * @param i2
	 *            the second argument
	 * @return the smaller of i1 and i2.
	 * 
	 * @j2sNative return Math.min (i1, i2);
	 */
	public static int min(int i1, int i2) {
		return i1 < i2 ? i1 : i2;
	}

	/**
	 * Answers the most negative (i.e. closest to negative infinity) of the two
	 * arguments.
	 * 
	 * @param l1
	 *            the first argument to check
	 * @param l2
	 *            the second argument
	 * @return the smaller of l1 and l2.
	 * 
	 * @j2sNative return Math.min (l1, l2);
	 */
	public static long min(long l1, long l2) {
		return l1 < l2 ? l1 : l2;
	}

	/**
	 * Answers the closest double approximation of the result of raising the
	 * first argument to the power of the second.
	 * 
	 * @param d1
	 *            the base of the operation.
	 * @param d2
	 *            the exponent of the operation.
	 * @return d1 to the power of d2
	 * 
	 * @j2sNative return Math.pow (d1, d2);
	 */
	public static double pow(double d1, double d2) {return 0;}

	/**
	 * Returns a pseudo-random number between 0.0 and 1.0.
	 * 
	 * @return a pseudo-random number
	 * 
	 * @j2sNative return Math.random ();
	 */
	public static double random() {
		return 0;
//		if (random == null)
//			random = new Random();
//		return random.nextDouble();
	}

	/**
	 * Answers the double conversion of the result of rounding the argument to
	 * an integer.
	 * 
	 * @param d
	 *            the value to be converted
	 * @return the closest integer to the argument (as a double).
	 * 
	 * @j2sNative return Math.round (d);
	 */
	public static double rint(double d) {return 0;}

	/**
	 * Answers the result of rounding the argument to an integer.
	 * 
	 * @param d
	 *            the value to be converted
	 * @return the closest integer to the argument.
	 * 
	 * @j2sNative return Math.round (d);
	 */
	public static long round(double d) {
		// check for NaN
		if (d != d)
			return 0L;
		return (long) Math.floor(d + 0.5d);
	}

	/**
	 * Answers the result of rounding the argument to an integer.
	 * 
	 * @param f
	 *            the value to be converted
	 * @return the closest integer to the argument.
	 * 
	 * @j2sNative return Math.round (f);
	 */
	public static int round(float f) {
		// check for NaN
		if (f != f)
			return 0;
		return (int) Math.floor(f + 0.5f);
	}
    
    /**
     * Answers the signum function of the argument. If the argument is less than
     * zero, it answers -1.0. If greater than zero, 1.0 is returned. It returns
     * zero if the argument is also zero.
     * 
     * @param d
     *            the value to compute signum function of
     * @return the value of the signum function.
     */
    public static double signum(double d){
        if(Double.isNaN(d)){
            return Double.NaN;
        }
        double sig = d;
        if(d > 0){
            sig = 1.0;
        }else if (d < 0){
            sig = -1.0;
        }
        return sig;
    }
    
    /**
     * Answers the signum function of the argument. If the argument is less than
     * zero, it answers -1.0. If greater than zero, 1.0 is returned. It returns
     * zero if the argument is also zero.
     * 
     * @param f
     *            the value to compute signum function of
     * @return the value of the signum function.
     */
    public static float signum(float f){
        if(Float.isNaN(f)){
            return Float.NaN;
        }
        float sig = f;
        if(f > 0){
            sig = 1.0f;
        }else if (f < 0){
            sig = -1.0f;
        }
        return sig;
    }

    /**
     * Answers the closest double approximation of the hyperbolic sine of the
     * argument. 
     * 
     * @param d
     *            the value to compute hyperbolic sine of
     * @return the hyperbolic sine of the argument.
	 * 
	 * @j2sNative return Math.sinh (d);
     */
    public static double sinh(double d) {return 0;}
    
	/**
	 * Answers the closest double approximation of the sine of the argument
	 * 
	 * @param d
	 *            the value to compute sin of
	 * @return the sine of the argument.
	 * 
	 * @j2sNative return Math.sin (d);
	 */
	public static double sin(double d) {return 0;}

	/**
	 * Answers the closest double approximation of the square root of the
	 * argument
	 * 
	 * @param d
	 *            the value to compute sqrt of
	 * @return the square root of the argument.
	 * 
	 * @j2sNative return Math.sqrt (d);
	 */
	public static double sqrt(double d) {return 0;}

	/**
	 * Answers the closest double approximation of the tangent of the argument
	 * 
	 * @param d
	 *            the value to compute tan of
	 * @return the tangent of the argument.
	 * 
	 * @j2sNative return Math.tan (d);
	 */
	public static double tan(double d) {return 0;}

    /**
     * Answers the closest double approximation of the hyperbolic tangent of the
     * argument. The absolute value is always less than 1. 
     * 
     * @param d
     *            the value to compute hyperbolic tangent of
     * @return the hyperbolic tangent of the argument.
	 * 
	 * @j2sNative return Math.tanh (d);
     */
    public static double tanh(double d) {return 0;}
    
	/**
	 * Returns the measure in degrees of the supplied radian angle
	 * 
	 * @param angrad
	 *            an angle in radians
	 * @return the degree measure of the angle.
	 */
	public static double toDegrees(double angrad) {
		return angrad * 180d / PI;
	}

	/**
	 * Returns the measure in radians of the supplied degree angle
	 * 
	 * @param angdeg
	 *            an angle in degrees
	 * @return the radian measure of the angle.
	 */
	public static double toRadians(double angdeg) {
		return angdeg / 180d * PI;
	}
	
	/**
     * Answers the argument's ulp. The size of a ulp of a double value is the
     * positive distance between this value and the double value next larger
     * in magnitude. For non-NaN x, ulp(-x) == ulp(x).
     * 
     * @param d
     *            the floating-point value to compute ulp of
     * @return the size of a ulp of the argument.
     * 
     * @j2sNative return Math.ulp(d);
     * 
     */
    public static double ulp(double d) {
        // special cases
        if (Double.isInfinite(d)) {
            return Double.POSITIVE_INFINITY;
        } else if (d == Double.MAX_VALUE || d == -Double.MAX_VALUE) {
            return pow(2, 971);
        }
        d = Math.abs(d);
        return 0;//nextafter(d, Double.MAX_VALUE) - d;
    }

    /**
     * Answers the argument's ulp. The size of a ulp of a float value is the
     * positive distance between this value and the float value next larger
     * in magnitude. For non-NaN x, ulp(-x) == ulp(x).
     * 
     * @param f
     *            the floating-point value to compute ulp of
     * @return the size of a ulp of the argument.
     * 
     * @j2sNative return Math.ulp$F(f);
     */
    public static float ulp(float f) {
        // special cases
        if (Float.isNaN(f)) {
            return Float.NaN;
        } else if (Float.isInfinite(f)) {
            return Float.POSITIVE_INFINITY;
        } else if (f == Float.MAX_VALUE || f == -Float.MAX_VALUE) {
            return (float) pow(2, 104);
        }
        f = Math.abs(f);
//        return nextafterf(f, Float.MAX_VALUE) - f;
    	return 0;
    }

//    private static double nextafter(double x, double y);
//
//    private static float nextafterf(float x, float y); 
}
