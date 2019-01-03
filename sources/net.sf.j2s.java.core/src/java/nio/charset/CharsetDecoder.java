package java.nio.charset; // decompiled using http://jd.benow.ca/

import java.nio.BufferOverflowException;
import java.nio.BufferUnderflowException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

public abstract class CharsetDecoder {
	private final Charset charset;
	private final float averageCharsPerByte;
	private final float maxCharsPerByte;
	private String replacement;
	private CodingErrorAction malformedInputAction = CodingErrorAction.REPORT;
	private CodingErrorAction unmappableCharacterAction = CodingErrorAction.REPORT;
	private static final int ST_RESET = 0;
	private static final int ST_CODING = 1;
	private static final int ST_END = 2;
	private static final int ST_FLUSHED = 3;

	private static final String DEFAULT_REPLACEMENT = "\u00ef\u00bf\u00bd";

	private int state = ST_RESET;
	private static String[] stateNames = { "RESET", "CODING", "CODING_END", "FLUSHED" };

	private CharsetDecoder(Charset charset, float ave, float max, String repl) {
		this.charset = charset;
		if (ave <= 0.0F) {
			throw new IllegalArgumentException("Non-positive averageCharsPerByte");
		}
		if (max <= 0.0F) {
			throw new IllegalArgumentException("Non-positive maxCharsPerByte");
		}
		this.replacement = repl;
		this.averageCharsPerByte = ave;
		this.maxCharsPerByte = max;
		replaceWith(repl);
	}

	protected CharsetDecoder(Charset charset, float ave, float max) {
		this(charset, ave, max, DEFAULT_REPLACEMENT);
	}

	public final Charset charset() {
		return this.charset;
	}

	public final String replacement() {
		return this.replacement;
	}

	public final CharsetDecoder replaceWith(String rep) {
		if (rep == null) {
			throw new IllegalArgumentException("Null replacement");
		}
		int i = rep.length();
		if (i == 0) {
			throw new IllegalArgumentException("Empty replacement");
		}
// SwingJS UnicodeDecoder used 0.5 and 1.0 for char size??
//    if (i > this.maxCharsPerByte) {
//      throw new IllegalArgumentException("Replacement too long");
//    }
		this.replacement = rep;

		implReplaceWith(this.replacement);
		return this;
	}

	protected void implReplaceWith(String newRep) {
	}

	public CodingErrorAction malformedInputAction() {
		return this.malformedInputAction;
	}

	public final CharsetDecoder onMalformedInput(CodingErrorAction err) {
		if (err == null) {
			throw new IllegalArgumentException("Null action");
		}
		this.malformedInputAction = err;
		implOnMalformedInput(err);
		return this;
	}

	protected void implOnMalformedInput(CodingErrorAction err) {
	}

	public CodingErrorAction unmappableCharacterAction() {
		return this.unmappableCharacterAction;
	}

	public final CharsetDecoder onUnmappableCharacter(CodingErrorAction err) {
		if (err == null) {
			throw new IllegalArgumentException("Null action");
		}
		this.unmappableCharacterAction = err;
		implOnUnmappableCharacter(err);
		return this;
	}

	protected void implOnUnmappableCharacter(CodingErrorAction err) {
	}

	public final float averageCharsPerByte() {
		return this.averageCharsPerByte;
	}

	public final float maxCharsPerByte() {
		return this.maxCharsPerByte;
	}

	public final CoderResult decode(ByteBuffer in, CharBuffer out, boolean done) {
		int i = done ? ST_END : ST_CODING;
		if ((this.state != ST_RESET) && (this.state != ST_CODING) && ((!done) || (this.state != ST_END))) {
			throwIllegalStateException(this.state, i);
		}
		this.state = i;
		for (;;) {
			CoderResult localCoderResult;
			try {
				localCoderResult = decodeLoop(in, out);
			} catch (BufferUnderflowException localBufferUnderflowException) {
				throw new CoderMalfunctionError(localBufferUnderflowException);
			} catch (BufferOverflowException localBufferOverflowException) {
				throw new CoderMalfunctionError(localBufferOverflowException);
			}
			if (localCoderResult.isOverflow()) {
				return localCoderResult;
			}
			if (localCoderResult.isUnderflow()) {
				if ((done) && (in.hasRemaining())) {
					localCoderResult = CoderResult.malformedForLength(in.remaining());
				} else {
					return localCoderResult;
				}
			}
			CodingErrorAction localCodingErrorAction = null;
			if (localCoderResult.isMalformed()) {
				localCodingErrorAction = this.malformedInputAction;
			} else if (localCoderResult.isUnmappable()) {
				localCodingErrorAction = this.unmappableCharacterAction;
//      } else if (!$assertionsDisabled) {
//        throw new AssertionError(localCoderResult.toString());
			}
			if (localCodingErrorAction == CodingErrorAction.REPORT) {
				return localCoderResult;
			}
			if (localCodingErrorAction == CodingErrorAction.REPLACE) {
				if (out.remaining() < this.replacement.length()) {
					return CoderResult.OVERFLOW;
				}
				out.put(this.replacement);
			}
//      if ((localCodingErrorAction == CodingErrorAction.IGNORE) || (localCodingErrorAction == CodingErrorAction.REPLACE)) {
			in.position(in.position() + localCoderResult.length());
//      } else if (!$assertionsDisabled) {
//        throw new AssertionError();
//      }
		}
	}

	public final CoderResult flush(CharBuffer out) {
		if (this.state == ST_END) {
			CoderResult localCoderResult = implFlush(out);
			if (localCoderResult.isUnderflow()) {
				this.state = ST_FLUSHED;
			}
			return localCoderResult;
		}
		if (this.state != ST_FLUSHED) {
			throwIllegalStateException(this.state, ST_FLUSHED);
		}
		return CoderResult.UNDERFLOW;
	}

	protected CoderResult implFlush(CharBuffer out) {
		return CoderResult.UNDERFLOW;
	}

	public final CharsetDecoder reset() {
		implReset();
		this.state = ST_RESET;
		return this;
	}

	protected void implReset() {
	}

	protected abstract CoderResult decodeLoop(ByteBuffer in, CharBuffer out);

	public final CharBuffer decode(ByteBuffer in) throws CharacterCodingException {
		int i = (int) (in.remaining() * averageCharsPerByte());
		Object localObject = CharBuffer.allocate(i);
		if ((i == 0) && (in.remaining() == 0)) {
			return (CharBuffer) localObject;
		}
		reset();
		for (;;) {
			CoderResult localCoderResult = in.hasRemaining() ? decode(in, (CharBuffer) localObject, true)
					: CoderResult.UNDERFLOW;
			if (localCoderResult.isUnderflow()) {
				localCoderResult = flush((CharBuffer) localObject);
			}
			if (localCoderResult.isUnderflow()) {
				break;
			}
			if (localCoderResult.isOverflow()) {
				i = 2 * i + 1;
				CharBuffer localCharBuffer = CharBuffer.allocate(i);
				((CharBuffer) localObject).flip();
				localCharBuffer.put((CharBuffer) localObject);
				localObject = localCharBuffer;
			} else {
				localCoderResult.throwException();
			}
		}
		((CharBuffer) localObject).flip();
		return (CharBuffer) localObject;
	}

	public boolean isAutoDetecting() {
		return false;
	}

	public boolean isCharsetDetected() {
		throw new UnsupportedOperationException();
	}

	public Charset detectedCharset() {
		throw new UnsupportedOperationException();
	}

	private void throwIllegalStateException(int old, int now) {
		throw new IllegalStateException("Current state = " + stateNames[old] + ", new state = " + stateNames[now]);
	}
}
