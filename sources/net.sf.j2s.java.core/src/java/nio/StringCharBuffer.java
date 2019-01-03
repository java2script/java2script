/*
 * Copyright (c) 2000, 2013, Oracle and/or its affiliates. All rights reserved.
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

package java.nio;


// ## If the sequence is a string, use reflection to share its array

class StringCharBuffer                                  // package-private
    extends CharBuffer
{
    CharSequence str;

    StringCharBuffer(CharSequence s, int start, int end) { // package-private
        super(-1, start, end, s.length());
        int n = s.length();
        if ((start < 0) || (start > n) || (end < start) || (end > n))
            throw new IndexOutOfBoundsException();
        str = s;
    }

    @Override
	public CharBuffer slice() {
        return new StringCharBuffer(str,
                                    -1,
                                    0,
                                    this.remaining(),
                                    this.remaining(),
                                    offset + this.position());
    }

    private StringCharBuffer(CharSequence s,
                             int mark,
                             int pos,
                             int limit,
                             int cap,
                             int offset) {
        super(mark, pos, limit, cap, null, offset);
        str = s;
    }

    @Override
	public CharBuffer duplicate() {
        return new StringCharBuffer(str, markValue(),
                                    position(), limit(), capacity(), offset);
    }

    @Override
	public CharBuffer asReadOnlyBuffer() {
        return duplicate();
    }

    @Override
	public final char get() {
        return str.charAt(nextGetIndex() + offset);
    }

    @Override
	public final char get(int index) {
        return str.charAt(checkIndex(index) + offset);
    }

    @Override
	char getUnchecked(int index) {
        return str.charAt(index + offset);
    }

    // ## Override bulk get methods for better performance

    @Override
	public final CharBuffer put(char c) {
        throw new ReadOnlyBufferException();
    }

    @Override
	public final CharBuffer put(int index, char c) {
        throw new ReadOnlyBufferException();
    }

    @Override
	public final CharBuffer compact() {
        throw new ReadOnlyBufferException();
    }

    @Override
	public final boolean isReadOnly() {
        return true;
    }

    @Override
	final String toString(int start, int end) {
        return str.toString().substring(start + offset, end + offset);
    }

    @Override
	public final CharBuffer subSequence(int start, int end) {
        try {
            int pos = position();
            return new StringCharBuffer(str,
                                        -1,
                                        pos + checkIndex(start, pos),
                                        pos + checkIndex(end, pos),
                                        capacity(),
                                        offset);
        } catch (IllegalArgumentException x) {
            throw new IndexOutOfBoundsException();
        }
    }

    @Override
	public boolean isDirect() {
        return false;
    }

    @Override
	public ByteOrder order() {
        return ByteOrder.nativeOrder();
    }

}
