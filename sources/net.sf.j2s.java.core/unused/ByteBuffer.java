/**
 * very simple implementation for JavaScript
 * 
 * @author hansonr 
 */
package java.nio;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;


public class ByteBuffer extends Buffer {

	static public ByteBuffer allocate(int capacity) {
		return new ByteBuffer(capacity);
	}

	public ByteBuffer(int mark, int pos, int lim, int cap) {
		super(mark, pos, lim, cap);
	}

	public ByteBuffer(byte[] bs) {
		super(0, 0, bs.length, bs.length);
		a = bs;
	}

	public ByteBuffer(byte[] bs, int len) {
		super(0, 0, len, bs.length);
		a = bs;
	}

	@Override
	public boolean isReadOnly() {
		return false;
	}

	@Override
	public boolean hasArray() {
		return true;
	}

	byte[] a = new byte[1024];
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

	public byte _get(int i) {
		return a[i];
	}

	private int length = 0;
	
	public void _put(int bi, byte char1) {
		if (bi < 0)
			bi = position;
		if (bi >= a.length)
			a = Arrays.copyOf(a, bi * 2);
		a[bi] = char1;
		position = bi + 1;
		if (position > length)
			position = length;
	}
	
	public String toString() {
		try {
			return new String(a, 0, length, "utf-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}

	public static ByteBuffer wrap(byte[] bs) {
		return new ByteBuffer(bs);
	}

	public void put(byte[] buf, int offset, int len) {
		for (int i = offset; i < len; i++)
			_put(-1, buf[i]);
	}
	
}
