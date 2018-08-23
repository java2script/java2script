/**
 * @author hansonr
 * 
 */
package java.nio;

import java.util.Arrays;

public class CharBuffer extends Buffer {

	private char[] a = new char[1024];

	public CharBuffer asReadOnlyBuffer() {
		return new CharBuffer(a);
	}

	static public CharBuffer allocate(int capacity) {
		return new CharBuffer(capacity);
	}

	static public CharBuffer wrap(char[] array) {
		return new CharBuffer(array);
	}

	static public CharBuffer wrap(String str) {
		char[] a = str.toCharArray();
		return new CharBuffer(a);
	}

	static public CharBuffer wrap(char[] array, int offset, int length) {
		CharBuffer cb = new CharBuffer(array);
		cb.position = offset;
		cb.limit = offset + length;
		cb.capacity = array.length;
		return cb;

	}

	static public CharBuffer wrap(CharSequence csq) {
		return wrap(csq.toString());
	}

	static public CharBuffer wrap(CharSequence csq, int start, int end) {
		return wrap(csq.subSequence(start, end).toString());
	}

	public CharBuffer(int mark, int pos, int lim, int cap) {
		super(mark, pos, lim, cap);
	}

	public CharBuffer(char[] a) {
		super(-1, 0, a.length, a.length);
		this.a = a;
	}

	public CharBuffer(char[] a, int len) {
		super(-1, 0, len, a.length);
		this.a = a;
	}

	public CharBuffer(int capacity) {
		super(0, 0, capacity, capacity);
		a = new char[capacity];
	}

	@Override
	public boolean isReadOnly() {
		return false;
	}

	@Override
	public boolean hasArray() {
		return true;
	}

	@Override
	public Object array() {
		return a;
	}

	@Override
	public int arrayOffset() {
		return 0;
	}

	@Override
	public boolean isDirect() {
		return false;
	}

	public char _get(int i) {
		return a[i];
	}

	public void _put(int bi, char char1) {
		if (bi >= limit)
			a = Arrays.copyOf(a, limit = bi * 2);
		a[bi] = char1;
	}

	public int getLength() {
		return limit - position;
	}

	public CharBuffer append(char c) {
		_put(position++, c);
		return this;
	}

	public CharBuffer append(CharSequence csq) {
		return put(csq.toString());
	}

	public CharBuffer append(CharSequence csq, int start, int end) {
		for (int i = start; i < end; i++)
			_put(position, csq.charAt(i));
		return this;
	}

	public CharBuffer put(char[] buf, int offset, int len) {
		for (int i = offset, end = offset + len; i < end; i++)
			_put(position++, buf[i]);
		return this;
	}

	public char charAt(int index) {
		return a[position + index];
	}

	public CharBuffer compact() {
		int pt = 0;
		for (int i = position; i < limit;)
			a[pt++] = a[i++];
		position = pt;
		limit = capacity;
		mark = -1;
		return this;
	}

	public int compareTo(CharBuffer cb) {
		int n = cb.getLength();
		int m = getLength();
		int v;
		for (int lim = position + Math.min(n, m), i = position; i < lim; i++)
			if ((v = Character.compare(a[i], cb.charAt(i))) != 0)
				return v;
		return (n == m ? 0 : m > n ? 1 : -1);
	}

	public CharBuffer duplicate() {
		CharBuffer b = new CharBuffer(a);
		b.position = position;
		b.limit = limit;
		b.capacity = capacity;
		return b;
	}

	public boolean equals(Object ob) {
		if (!(ob instanceof CharBuffer))
			return false;
		CharBuffer cb = (CharBuffer) ob;
		if (cb.limit - cb.position != limit - position)
			return false;
		for (int i = position; i < limit; i++)
			if (cb.a[i] != a[i])
				return false;
		return true;
	}

	public char get() {
		return _get(position++);
	}

	public CharBuffer get(char[] dst) {
		return get(dst, 0, dst.length);
	}

	public CharBuffer get(char[] dst, int offset, int length) {
		for (int i = offset, end = offset + length; i < end; i++)
			dst[i] = get();
		return this;
	}

	public char get(int index) {
		return a[index];
	}

	public int hashCode() {
		return toString().hashCode();
	}

	public ByteOrder order() {
		return ByteOrder.LITTLE_ENDIAN;
	}

	public CharBuffer put(char[] src) {
		return put(src, 0, src.length);
	}

	public CharBuffer put(CharBuffer src) {
		put(src.a, src.position, src.limit);
		src.position(src.limit);
		return this;
	}

	public CharBuffer put(int index, char c) {
		_put(index, c);
		return this;
	}

	public CharBuffer put(String s) {
		char[] chars = /** @j2sNative csq.toString().split('') || */
				null;
		return put(chars, 0, chars.length);
	}

	public CharBuffer put(String src, int start, int end) {
		for (int i = 0; i < src.length(); i++)
			_put(position, src.charAt(i));
		return this;
	}

	public int read(CharBuffer target) {
		// Q: why isn't this "write"?		
		int n = limit - position;
		if (n == 0)
			return -1;
		target.put(a, position, n);
		return n;
	}

	public CharBuffer slice() {
		return new CharBuffer(a);
	}

	public CharBuffer subSequence(int start, int end) {
//		Creates a new character buffer that represents the specified subsequence of this buffer, relative to the current position.
		CharBuffer cb = new CharBuffer(a);
		cb.position = position + start;
		cb.limit = position + end;
		return cb;
	}

	public String toString() {
		return (/** @j2sNative this.a.slice(this.position,this.limit).join('')|| */
		null);
	}

}
