/*
 * Copyright 1996-2006 Sun Microsystems, Inc.  All Rights Reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Sun designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Sun in the LICENSE file that accompanied this code.
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
 * Please contact Sun Microsystems, Inc., 4150 Network Circle, Santa Clara,
 * CA 95054 USA or visit www.sun.com if you need additional information or
 * have any questions.
 */

package java.lang.reflect;

// BH: all native methods implemented

/**
 * The {@code Array} class provides static methods to dynamically create and
 * access Java arrays.
 *
 * <p>
 * {@code Array} permits widening conversions to occur during a get or set
 * operation, but throws an {@code IllegalArgumentException} if a narrowing
 * conversion would occur.
 * 
 *
 *
 * @author Nakul Saraiya
 */
public final class Array {

	/**
	 * Constructor. Class Array is not instantiable.
	 */
	private Array() {
	}

	/**
	 * Creates a new array with the specified component type and length.
	 * Invoking this method is equivalent to creating an array as follows:
	 * <blockquote>
	 * 
	 * <pre>
	 * int[] x = { length };
	 * Array.newInstance(componentType, x);
	 * </pre>
	 * 
	 * </blockquote>
	 *
	 * @param componentType
	 *            the {@code Class} object representing the component type of
	 *            the new array
	 * @param length
	 *            the length of the new array
	 * @return the new array
	 * @exception NullPointerException
	 *                if the specified {@code componentType} parameter is null
	 * @exception IllegalArgumentException
	 *                if componentType is {@link Void#TYPE}
	 * @exception NegativeArraySizeException
	 *                if the specified {@code length} is negative
	 */
	public static Object newInstance(Class<?> componentType, int length) throws NegativeArraySizeException {
		return newArray(componentType, length);
	}

	/**
	 * Creates a new array with the specified component type and dimensions. If
	 * {@code componentType} represents a non-array class or interface, the new
	 * array has {@code dimensions.length} dimensions and {@code componentType}
	 * as its component type. If {@code componentType} represents an array
	 * class, the number of dimensions of the new array is equal to the sum of
	 * {@code dimensions.length} and the number of dimensions of
	 * {@code componentType}. In this case, the component type of the new array
	 * is the component type of {@code componentType}.
	 *
	 * <p>
	 * The number of dimensions of the new array must not exceed the number of
	 * array dimensions supported by the implementation (typically 255).
	 *
	 * @param componentType
	 *            the {@code Class} object representing the component type of
	 *            the new array
	 * @param dimensions
	 *            an array of {@code int} representing the dimensions of the new
	 *            array
	 * @return the new array
	 * @exception NullPointerException
	 *                if the specified {@code componentType} argument is null
	 * @exception IllegalArgumentException
	 *                if the specified {@code dimensions} argument is a
	 *                zero-dimensional array, or if the number of requested
	 *                dimensions exceeds the limit on the number of array
	 *                dimensions supported by the implementation (typically
	 *                255), or if componentType is {@link Void#TYPE}.
	 * @exception NegativeArraySizeException
	 *                if any of the components in the specified
	 *                {@code dimensions} argument is negative.
	 */
	public static Object newInstance(Class<?> componentType, int... dimensions)
			throws IllegalArgumentException, NegativeArraySizeException {
		return multiNewArray(componentType, dimensions);
	}

	/**
	 * BH needed for SwingJS implementation of native calls
	 * 
	 * @param array
	 * @param index
	 * @return
	 */
	private static Object getAval(Object array, int index)
			throws IllegalArgumentException, IndexOutOfBoundsException, NullPointerException {
		checkArray(array, index, true);
		return ((Object[]) array)[index];
	}

	private static void checkArray(Object array, int index, boolean checkIndex) {
		if (array == null)
			throw new NullPointerException();
		if (checkIndex && (index < 0 || index >= ((Object[]) array).length))
			throw new IndexOutOfBoundsException();
	}

	/**
	 * Returns the length of the specified array object, as an {@code int}.
	 *
	 * @param array
	 *            the array
	 * @return the length of the array
	 * @exception IllegalArgumentException
	 *                if the object argument is not an array
	 * 
	 * 
	 */
	public static int getLength(Object array) throws IllegalArgumentException {
		checkArray(array, 0, false);
		return ((Object[]) array).length;
	}

	/**
	 * Returns the value of the indexed component in the specified array object.
	 * The value is automatically wrapped in an object if it has a primitive
	 * type.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the (possibly wrapped) value of the indexed component in the
	 *         specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static Object get(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		Object x = getAval(array, index);
		/**
		 * @j2sNative
		 * 
		 * 			switch (array.__ARRAYTYPE){ case "BA": return new Byte(x);
		 *            case "CA": return new Character(x); case "HA": return new Short(x); case "IA": return new Integer(x); case "JA":
		 *            return new Long(x); case "ZA": return (x ? Boolean.TRUE :
		 *            Boolean.FALSE); case "FA": return new Float(x); case "DA":
		 *            return new Double(x); } return x;
		 * 
		 * 
		 */
		{
			return x;
		}
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as a {@code boolean}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static boolean getBoolean(Object array, int index)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		boolean val = false;
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		case "ZA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as a {@code byte}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static byte getByte(Object array, int index)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		byte val = (byte) 0;
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		case "BA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as a {@code char}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static char getChar(Object array, int index)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		char val = '\0';
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		case "CA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as a {@code short}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 */
	public static short getShort(Object array, int index)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		short val = (short) 0;
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		  case "BA":
		  case "HA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as an {@code int}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static int getInt(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		int val = 0;
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		  case "BA":
		  case "HA":
		  case "IA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as a {@code long}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static long getLong(Object array, int index)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		long val = 0;
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		  case "BA":
		  case "HA":
		  case "IA":
		  case "JA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as a {@code float}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static float getFloat(Object array, int index)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		float val = 0;
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		  case "BA":
		  case "HA":
		  case "IA":
		  case "JA":
		  case "FA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Returns the value of the indexed component in the specified array object,
	 * as a {@code double}.
	 *
	 * @param array
	 *            the array
	 * @param index
	 *            the index
	 * @return the value of the indexed component in the specified array
	 * @exception NullPointerException
	 *                If the specified object is null
	 * @exception IllegalArgumentException
	 *                If the specified object is not an array, or if the indexed
	 *                element cannot be converted to the return type by an
	 *                identity or widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#get
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static double getDouble(Object array, int index)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		@SuppressWarnings("unused")
		Object x = getAval(array, index);
		String type = "";
		double val = 0;
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE; val = x;
		 */
		{
		}
		switch (type) {
		  case "BA":
		  case "HA":
		  case "IA":
		  case "JA":
		  case "FA":
		  case "DA":
			return val;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified new value. The new value is first automatically unwrapped
	 * if the array has a primitive component type.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param value
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the array component type is primitive and an unwrapping
	 *                conversion fails
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void set(Object array, int index, Object value)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		checkArray(array, index, true);
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		try {
			switch (type) {
			case "BA":
				((byte[]) array)[index] = ((Byte) value).byteValue();
				return;
			case "CA":
				((char[]) array)[index] = ((Character) value).charValue();
				return;
			case "HA":
				((short[]) array)[index] = ((Short) value).shortValue();
				return;
			case "IA":
				((int[]) array)[index] = ((Integer) value).intValue();
				return;
			case "JA":
				((long[]) array)[index] = ((Long) value).longValue();
				return;
			case "ZA":
				((boolean[]) array)[index] = ((Boolean) value).booleanValue();
				return;
			case "FA":
				((float[]) array)[index] = ((Float) value).floatValue();
				return;
			case "DA":
				((double[]) array)[index] = ((Double) value).doubleValue();
				return;
			default: {
				((Object[]) array)[index] = value;
			}
			}
		} catch (Throwable e) {
			throw new IllegalArgumentException();
		}
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code boolean} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param z
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setBoolean(Object array, int index, boolean z)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
	checkArray(array, index, true);
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		case "ZA":
			((boolean[]) array)[index] = z;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code byte} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param b
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setByte(Object array, int index, byte b)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		  case "BA":
		  case "HA":
		  case "IA":
		  case "JA":
		  case "FA":
		  case "DA":
			((byte[]) array)[index] = b;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code char} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param c
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setChar(Object array, int index, char c)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		case "CA":
			((char[]) array)[index] = c;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code short} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param s
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setShort(Object array, int index, short s)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		  case "HA":
		  case "IA":
		  case "JA":
		  case "FA":
		  case "DA":
			((short[]) array)[index] = s;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code int} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param i
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setInt(Object array, int index, int i)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		  case "IA":
		  case "JA":
		  case "FA":
		  case "DA":
			((int[]) array)[index] = i;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code long} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param l
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setLong(Object array, int index, long l)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		  case "JA":
		  case "FA":
		  case "DA":
			((long[]) array)[index] = l;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code float} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param f
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setFloat(Object array, int index, float f)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		  case "FA":
		  case "DA":
			((float[]) array)[index] = f;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * Sets the value of the indexed component of the specified array object to
	 * the specified {@code double} value.
	 * 
	 * @param array
	 *            the array
	 * @param index
	 *            the index into the array
	 * @param d
	 *            the new value of the indexed component
	 * @exception NullPointerException
	 *                If the specified object argument is null
	 * @exception IllegalArgumentException
	 *                If the specified object argument is not an array, or if
	 *                the specified value cannot be converted to the underlying
	 *                array's component type by an identity or a primitive
	 *                widening conversion
	 * @exception ArrayIndexOutOfBoundsException
	 *                If the specified {@code index} argument is negative, or if
	 *                it is greater than or equal to the length of the specified
	 *                array
	 * @see Array#set
	 * 
	 * 
	 * 
	 * 
	 * 
	 */
	public static void setDouble(Object array, int index, double d)
			throws IllegalArgumentException, ArrayIndexOutOfBoundsException {
		String type = "";
		/**
		 * @j2sNative
		 * 
		 * 			type = array.__ARRAYTYPE;
		 */
		{
		}
		switch (type) {
		case "DA":
			((double[]) array)[index] = d;
			return;
		}
		throw new IllegalArgumentException();
	}

	/**
	 * 
	 * 
	 * @param componentType
	 * @param length
	 * @return
	 * @throws NegativeArraySizeException
	 */
	private static Object newArray(Class<?> componentType, int length) throws NegativeArraySizeException {
		/**
		 * @j2sNative
		 * 
		 * 			return Clazz.array(componentType, length);
		 */
		{
			return null;
		}
	}

	/**
	 * 
	 * 
	 * 
	 * @param componentType
	 * @param dimensions
	 * @return
	 * @throws IllegalArgumentException
	 * @throws NegativeArraySizeException
	 */
	private static Object multiNewArray(Class<?> componentType, int[] dimensions)
			throws IllegalArgumentException, NegativeArraySizeException {
		/**
		 * @j2sNative
		 * 
		 * 			return Clazz.array(componentType, dimensions);
		 * 
		 */

		{
			return null;
		}

	}

}
