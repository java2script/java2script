package swingjs;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;

public class JSByteBuffer extends ByteBuffer {

	JSByteBuffer(int mark, int pos, int lim, int cap, byte[] hb, int offset) {
		super(mark, pos, lim, cap, hb, offset);
		// TODO Auto-generated constructor stub
	}

	@Override
	public CharBuffer asCharBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ByteBuffer slice() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ByteBuffer duplicate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ByteBuffer asReadOnlyBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte get() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public ByteBuffer put(byte $x$) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public byte get(int index) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public ByteBuffer put(int index, byte $x$) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ByteBuffer compact() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isDirect() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public byte _get(int i) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void _put(int i, byte b) { //  SwingJS -- was package-private
		
		// TODO Auto-generated method stub

	}

	@Override
	public boolean isReadOnly() {
		// TODO Auto-generated method stub
		return false;
	}

}
