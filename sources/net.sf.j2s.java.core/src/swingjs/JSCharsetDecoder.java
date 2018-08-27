package swingjs;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CoderResult;

public class JSCharsetDecoder extends CharsetDecoder {

	protected JSCharsetDecoder(Charset cs, float averageCharsPerByte, float maxCharsPerByte) {
		super(cs, averageCharsPerByte, maxCharsPerByte);
	}

	@Override
	protected CoderResult decodeLoop(ByteBuffer in, CharBuffer out) {
			char[] b = in.toString().toCharArray();
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
