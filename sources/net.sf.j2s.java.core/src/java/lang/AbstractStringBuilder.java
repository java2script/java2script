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

//import java.util.Arrays;
import java.nio.charset.Charset;

/**
 * <p>
 * A modifiable {@link CharSequence sequence of characters} for use in creating
 * and modifying Strings. This class is intended as a base class for
 * {@link java.lang.StringBuffer} and {@link java.lang.StringBuilder}.
 * </p>
 * 
 * @see java.lang.StringBuffer
 * @see java.lang.StringBuilder
 * 
 * @since 1.5
 */
abstract class AbstractStringBuilder {

	String s; // used by JavaScript only; no Java references

	// TODO: JS experiment with using array and .push() here

	public AbstractStringBuilder() {
		/**
		 * @j2sNative
		 * 
		 * 			this.s = "";
		 * 
		 */
	}

	public AbstractStringBuilder(int n) {
		this();
	}

	public AbstractStringBuilder(String s) {
		this.s = s;
	}

	final void appendNull() {
		s += "null";
	}


		public void append0(CharSequence csq) {
			append0(csq.toString());
		}

		//	final void append0(String string) {
		public void append0(String s) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += s
			 * 
			 */
		}

//		final void append0(char ch) {
		public void append0(char c) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += c;
			 */
		}

		public void append0(int i) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += i
			 * 
			 */
		}

		public void append0(long l) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += l
			 * 
			 */
		}

		public void append0(StringBuilder buf) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += buf.s;
			 * 
			 */
		}

		public void append0(StringBuffer buf) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += (buf === null ? "null" : buf.s);
			 * 
			 */
		}

		public void append0(Object data) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += (data === null ? "null" : data.toString());
			 * 
			 */
		}

//		final void append0(char chars[]) {
		final void append0(char chars[]) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += chars.join("");
			 * 
			 */
		}
			
			

//	final void append0(char chars[], int start, int length) {
		public void append0(char[] cb, int off, int len) {
			/**
			 * @j2sNative
			 * 
			 * 			this.s += cb.slice(off,off+len).join("");
			 * 
			 */
		}

//	final void append0(CharSequence s, int start, int end) {
		public void append0(CharSequence csq, int start, int end) {
			append0(csq.subSequence(start, end).toString());
		}

	//////////////////////
	/////////////////// new

	public int capacity() {
		return Integer.MAX_VALUE;
	}

	public char charAt(int i) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.charAt(i);
		 * 
		 */
		{
			return 0;
		}
	}

	public int charCodeAt(int i) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.charCodeAt(i);
		 * 
		 */
		{
			return 0;
		}
	}

	public void delete0(int start, int end) {
		/**
		 * @j2sNative
		 * 
		 * 			this.s = this.s.substring(0, start) + this.s.substring(end);
		 */
	}

	final void deleteCharAt0(int index) {
		/**
		 * @j2sNative
		 * 
		 * 			this.s = this.s.substring(0, start) + this.s.substring(end);
		 */
	}

	public void insert0(int offset, int i) {
		insert0(offset, /** @j2sNative i || */
				"0");
	}

	public void insert0(int offset, long l) {
		insert0(offset, /** @j2sNative l || */
				"0");
	}

	public void insert0(int offset, Object o) {
		replace0(offset, offset, (o == null ? null : o.toString()));
	}

	public void insert0(int offset, CharSequence s, int start, int end) {
		replace0(offset, offset, (s == null ? null : s.subSequence(start, end).toString()));
	}

//      final void insert0(int index, char ch) {
	public void insert0(int offset, char c) {
		replace0(offset, offset, (String) (Object) c);
	}

//      final void insert0(int index, CharSequence s, int start, int end) {
	public void insert0(int offset, CharSequence s) {
		insert0(offset, (Object) s);
	}

//          final void insert0(int index, String string) {
	public void insert0(int offset, String c) {
		replace0(offset, offset, c);
	}

//        final void insert0(int index, char[] chars) {
	public void insert0(int offset, char[] str) {
		replace0(offset, offset, /** j2sNative str.join("") || */
				"");
	}

//    final void insert0(int index, char chars[], int start, int length) {
	public void insert0(int offset, char[] str, int off, int len) {
		replace0(offset, offset, /** j2sNative str.slice(off, off+len).join("") || */
				"");
	}

	public int length() {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.length;
		 * 
		 */
		{
			return 0;
		}
	}

	final void replace0(int start, int end, String string) {

		/**
		 * @j2sNative
		 * 
		 * 			this.s = this.s.substring(0, start) + str + this.s.substring(end);
		 */
	}

	public void reverse0() {
		/**
		 * @j2sNative s.toCharArray$().reverse().join("");
		 */
	}

	public void setLength(int n) {
		/**
		 * @j2sNative
		 * 
		 * 			this.s = this.s.substring(0, n);
		 */
	}

	public String substring(int i) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.substring(i);
		 */
		{
			return null;
		}
	}

	public String substring(int i, int j) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.substring(i, j);
		 */
		{
			return null;
		}
	}

	@Override
	public String toString() {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s;
		 * 
		 */
		{
			return null;
		}
	}

	public CharSequence subSequence(int start, int end) {
		return substring(start, end);
	}

	public int indexOf(String s) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.indexOf(s);
		 * 
		 */
		{
			return 0;
		}
	}

	public int indexOf(String s, int i) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.indexOf(s, i);
		 */
		{
			return 0;
		}
	}

	public int lastIndexOf(String s) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.lastIndexOf(s);
		 */
		{
			return 0;
		}
	}

	public int lastIndexOf(String s, int i) {
		/**
		 * @j2sNative
		 * 
		 * 			return this.s.lastIndexOf(s, i);
		 */
		{
			return 0;
		}
	}

	final char[] shareValue() {
		return getValue();
	}

	final char[] getValue() {
		return s.toCharArray();
	}

	public synchronized void trimToSize() {
		// interesting idea!
	}

	public void ensureCapacity(int min) {
		// unnec.
	}

	public int codePointCount(int beginIndex, int endIndex) {
		return beginIndex - endIndex;
	}

	public int codePointBefore(int i) {
		if (i < 1 || i > s.length())
			throw new IndexOutOfBoundsException();
		return s.codePointAt(i);
	}

	public void getChars(int start, int end, char[] buffer, int idx) {
		for (int i = start; i < end; i++)
			buffer[idx++] = s.charAt(i);
	}

	public int offsetByCodePoints(int index, int codePointOffset) {
		return index + codePointOffset;
	}

	public int codePointAt(int index) {
		return s.codePointAt(index);
	}

	//// ???
	
	/**
	 * simple byte conversion properly implementing UTF-8. * Used for base64
	 * conversion and allows for offset
	 * 
	 * @param off
	 * @param len or -1 for full length (then off must = 0)
	 * @return byte[]
	 */
	public byte[] toBytes(int off, int len) {
		if (len == 0)
			return new byte[0];
		Charset cs;
		/**
		 * 
		 * just a string in JavaScript
		 * 
		 * @j2sNative
		 * 
		 * 			cs = "UTF-8";
		 * 
		 */
		{
			cs = Charset.forName("UTF-8");
		}
		return (len > 0 ? substring(off, off + len) : off == 0 ? toString() : substring(off, length() - off))
				.getBytes(cs);
	}

	public void setCharAt(int offset, char ch) {
		insert0(offset, ch);
	}

	public void appendCodePoint0(int i) {
		/**
		 * @j2sNative
		 * 
		 * 			this.s += String.fromCharCode(i);
		 * 
		 */
	}


}
