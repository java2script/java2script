/*
 * Copyright (c) 2003, 2013, Oracle and/or its affiliates. All rights reserved.
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
 * A mutable sequence of characters.  This class provides an API compatible
 * with {@code StringBuffer}, but with no guarantee of synchronization.
 * This class is designed for use as a drop-in replacement for
 * {@code StringBuffer} in places where the string buffer was being
 * used by a single thread (as is generally the case).   Where possible,
 * it is recommended that this class be used in preference to
 * {@code StringBuffer} as it will be faster under most implementations.
 *
 * <p>The principal operations on a {@code StringBuilder} are the
 * {@code append} and {@code insert} methods, which are
 * overloaded so as to accept data of any type. Each effectively
 * converts a given datum to a string and then appends or inserts the
 * characters of that string to the string builder. The
 * {@code append} method always adds these characters at the end
 * of the builder; the {@code insert} method adds the characters at
 * a specified point.
 * <p>
 * For example, if {@code z} refers to a string builder object
 * whose current contents are "{@code start}", then
 * the method call {@code z.append("le")} would cause the string
 * builder to contain "{@code startle}", whereas
 * {@code z.insert(4, "le")} would alter the string builder to
 * contain "{@code starlet}".
 * <p>
 * In general, if sb refers to an instance of a {@code StringBuilder},
 * then {@code sb.append(x)} has the same effect as
 * {@code sb.insert(sb.length(), x)}.
 * <p>
 * Every string builder has a capacity. As long as the length of the
 * character sequence contained in the string builder does not exceed
 * the capacity, it is not necessary to allocate a new internal
 * buffer. If the internal buffer overflows, it is automatically made larger.
 *
 * <p>Instances of {@code StringBuilder} are not safe for
 * use by multiple threads. If such synchronization is required then it is
 * recommended that {@link java.lang.StringBuffer} be used.
 *
 * <p>Unless otherwise noted, passing a {@code null} argument to a constructor
 * or method in this class will cause a {@link NullPointerException} to be
 * thrown.
 *
 * @author      Michael McCloskey
 * @see         java.lang.StringBuffer
 * @see         java.lang.String
 * @since       1.5
 */
public final class StringBuilder
    extends AbstractStringBuilder
    implements java.io.Serializable, CharSequence
{

    /** use serialVersionUID for interoperability */
    static final long serialVersionUID = 4383685877147921099L;

    /**
     * Constructs a string builder with no characters in it and an
     * initial capacity of 16 characters.
     */
    public StringBuilder() {
        super(16);
    }

    /**
     * Constructs a string builder with no characters in it and an
     * initial capacity specified by the {@code capacity} argument.
     *
     * @param      capacity  the initial capacity.
     * @throws     NegativeArraySizeException  if the {@code capacity}
     *               argument is less than {@code 0}.
     */
    public StringBuilder(int capacity) {
        super(capacity);
    }

    /**
     * Constructs a string builder initialized to the contents of the
     * specified string. The initial capacity of the string builder is
     * {@code 16} plus the length of the string argument.
     *
     * @param   str   the initial contents of the buffer.
     */
    public StringBuilder(String str) {
        super(str.length() + 16);
        append(str);
    }

    /**
     * Constructs a string builder that contains the same characters
     * as the specified {@code CharSequence}. The initial capacity of
     * the string builder is {@code 16} plus the length of the
     * {@code CharSequence} argument.
     *
     * @param      seq   the sequence to copy.
     */
    public StringBuilder(CharSequence seq) {
        this(seq.length() + 16);
        append(seq);
    }

    @Override
    public StringBuilder append(Object obj) {
        return (StringBuilder) super.append(obj);
    }

    @Override
    public StringBuilder append(String str) {
        return (StringBuilder) super.append(str);
        
    }

    /**
     * Appends the specified {@code StringBuffer} to this sequence.
     * <p>
     * The characters of the {@code StringBuffer} argument are appended,
     * in order, to this sequence, increasing the
     * length of this sequence by the length of the argument.
     * If {@code sb} is {@code null}, then the four characters
     * {@code "null"} are appended to this sequence.
     * <p>
     * Let <i>n</i> be the length of this character sequence just prior to
     * execution of the {@code append} method. Then the character at index
     * <i>k</i> in the new character sequence is equal to the character at
     * index <i>k</i> in the old character sequence, if <i>k</i> is less than
     * <i>n</i>; otherwise, it is equal to the character at index <i>k-n</i>
     * in the argument {@code sb}.
     *
     * @param   sb   the {@code StringBuffer} to append.
     * @return  a reference to this object.
     */
    @Override
	public StringBuilder append(StringBuffer sb) {
    	return (StringBuilder) super.append(sb);
        
    }

    @Override
    public StringBuilder append(CharSequence s) {
    	return (StringBuilder) super.append(s);
        
    }

    /**
     * @throws     IndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder append(CharSequence s, int start, int end) {
        return (StringBuilder) super.append(s, start, end);
        
    }

    @Override
    public StringBuilder append(char[] str) {
        return (StringBuilder) super.append(str);
        
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder append(char[] str, int offset, int len) {
        return (StringBuilder) super.append(str, offset, len);
        
    }

    @Override
    public StringBuilder append(boolean b) {
        return (StringBuilder) super.append(b);
        
    }

    @Override
    public StringBuilder append(char c) {
        return (StringBuilder) super.append(c);
        
    }

    @Override
    public StringBuilder append(int i) {
        return (StringBuilder) super.append( i);
        
    }

    @Override
    public StringBuilder append(long lng) {
        return (StringBuilder) super.append( lng);
        
    }

    @Override
    public StringBuilder append(float f) {
        return (StringBuilder) super.append( f);
        
    }

    @Override
    public StringBuilder append(double d) {
        return (StringBuilder) super.append( d);
        
    }

    /**
     * @since 1.5
     */
    @Override
    public StringBuilder appendCodePoint(int codePoint) {
        return (StringBuilder) super.appendCodePoint(codePoint);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder delete(int start, int end) {
        return (StringBuilder) super.delete(start, end);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder deleteCharAt(int index) {
        return (StringBuilder) super.deleteCharAt(index);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder replace(int start, int end, String str) {
        return (StringBuilder) super.replace(start, end, str);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int index, char[] str, int offset,
                                int len)
    {
        return (StringBuilder) super.insert(index, str, offset, len);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, Object obj) {
            return (StringBuilder) super.insert(offset, obj);
            
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, String str) {
        return (StringBuilder) super.insert(offset, str);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, char[] str) {
        return (StringBuilder) super.insert(offset, str);
        
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int dstOffset, CharSequence s) {
            return (StringBuilder) super.insert(dstOffset, s);
            
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int dstOffset, CharSequence s,
                                int start, int end)
    {
        return (StringBuilder) super.insert(dstOffset, s, start, end);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, boolean b) {
        return (StringBuilder) super.insert(offset, b);
        
    }

    /**
     * @throws IndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, char c) {
        return (StringBuilder) super.insert(offset, c);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, int i) {
        return (StringBuilder) super.insert(offset, i);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, long l) {
        return (StringBuilder) super.insert(offset, l);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, float f) {
        return (StringBuilder) super.insert(offset, f);
        
    }

    /**
     * @throws StringIndexOutOfBoundsException {@inheritDoc}
     */
    @Override
    public StringBuilder insert(int offset, double d) {
        return (StringBuilder) super.insert(offset, d);
        
    }

    @Override
    public int indexOf(String str) {
        return super.indexOf(str);
    }

    @Override
    public int indexOf(String str, int fromIndex) {
        return super.indexOf(str, fromIndex);
    }

    @Override
    public int lastIndexOf(String str) {
        return super.lastIndexOf(str);
    }

    @Override
    public int lastIndexOf(String str, int fromIndex) {
        return super.lastIndexOf(str, fromIndex);
    }

    @Override
    public StringBuilder reverse() {
    	return (StringBuilder) super.reverse();
        
    }

    @Override
    public String toString() {
    	return 秘s;
//        // Create a copy, don't share the array
//        return new String(value, 0, count);
    }
//
//    /**
//     * Save the state of the {@code StringBuilder} instance to a stream
//     * (that is, serialize it).
//     *
//     * @serialData the number of characters currently stored in the string
//     *             builder ({@code int}), followed by the characters in the
//     *             string builder ({@code char[]}).   The length of the
//     *             {@code char} array may be greater than the number of
//     *             characters currently stored in the string builder, in which
//     *             case extra characters are ignored.
//     */
//    private void writeObject(java.io.ObjectOutputStream s)
//        throws java.io.IOException {
//        s.defaultWriteObject();
//        s.writeInt(count);
//        s.writeObject(value);
//    }
//
//    /**
//     * readObject is called to restore the state of the StringBuffer from
//     * a stream.
//     */
//    private void readObject(java.io.ObjectInputStream s)
//        throws java.io.IOException, ClassNotFoundException {
//        s.defaultReadObject();
//        count = s.readInt();
//        value = (char[]) s.readObject();
//    }

}
