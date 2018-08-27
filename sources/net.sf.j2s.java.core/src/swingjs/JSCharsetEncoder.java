package swingjs;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.nio.charset.CoderResult;

public class JSCharsetEncoder extends CharsetEncoder {

	protected JSCharsetEncoder(Charset cs, float averageBytesPerChar, float maxBytesPerChar) {
		super(cs, averageBytesPerChar, maxBytesPerChar);
	}

	@Override
	protected CoderResult encodeLoop(CharBuffer in, ByteBuffer out) {
		try {
			byte[] b = in.toString().getBytes("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		/**
		 * @j2sNative
		 * 
		 * out.a = b;
		 * out.length = out.limit = b.length;
		 * out.position = 0;
		 */
		return CoderResult.UNDERFLOW;
	}

}
