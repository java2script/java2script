package java.nio.charset; // decompiled using http://jd.benow.ca/

//import java.lang.ref.WeakReference;
import java.nio.BufferOverflowException;
import java.nio.BufferUnderflowException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Arrays;

public abstract class CharsetEncoder {
	private final Charset charset;
	private final float averageBytesPerChar;
	private final float maxBytesPerChar;
	private byte[] replacement;
	private CodingErrorAction malformedInputAction = CodingErrorAction.REPORT;
	private CodingErrorAction unmappableCharacterAction = CodingErrorAction.REPORT;
	private static final int ST_RESET = 0;
	private static final int ST_CODING = 1;
	private static final int ST_END = 2;
	private static final int ST_FLUSHED = 3;
	private int state = ST_RESET;
	private static String[] stateNames = { "RESET", "CODING", "CODING_END", "FLUSHED" };

	protected CharsetEncoder(Charset charset, float ave, float max, byte[] rep) {
		this.charset = charset;
		if (ave <= 0.0F) {
			throw new IllegalArgumentException("Non-positive averageBytesPerChar");
		}
		if (max <= 0.0F) {
			throw new IllegalArgumentException("Non-positive maxBytesPerChar");
		}
//    if ((!Charset.atBugLevel("1.4")) && 
//      (ave > max)) {
//      throw new IllegalArgumentException("averageBytesPerChar exceeds maxBytesPerChar");
//    }
		this.replacement = rep;
		this.averageBytesPerChar = ave;
		this.maxBytesPerChar = max;
		replaceWith(rep);
	}

	protected CharsetEncoder(Charset charset, float ave, float max) {
		this(charset, ave, max, new byte[] { 63 });
	}

	public final Charset charset() {
		return this.charset;
	}

	public final byte[] replacement() {
		return Arrays.copyOf(this.replacement, this.replacement.length);
	}

	public final CharsetEncoder replaceWith(byte[] rep) {
		if (rep == null) {
			throw new IllegalArgumentException("Null replacement");
		}
		int i = rep.length;
		if (i == 0) {
			throw new IllegalArgumentException("Empty replacement");
		}
		if (i > this.maxBytesPerChar) {
			throw new IllegalArgumentException("Replacement too long");
		}
		if (!isLegalReplacement(rep)) {
			throw new IllegalArgumentException("Illegal replacement");
		}
		this.replacement = Arrays.copyOf(rep, rep.length);

		implReplaceWith(this.replacement);
		return this;
	}

	private // WeakReference<
	CharsetDecoder
	// >
	cachedDecoder = null;

	protected void implReplaceWith(byte[] rep) {
	}

	public boolean isLegalReplacement(byte[] rep) {
//    WeakReference 
		CharsetDecoder localWeakReference = this.cachedDecoder;
		CharsetDecoder localCharsetDecoder = null;
		if ((localWeakReference == null)
				|| ((localCharsetDecoder = (CharsetDecoder) localWeakReference/* .get() */) == null)) {
			localCharsetDecoder = charset().newDecoder();
			localCharsetDecoder.onMalformedInput(CodingErrorAction.REPORT);
			localCharsetDecoder.onUnmappableCharacter(CodingErrorAction.REPORT);
			this.cachedDecoder = /* new WeakReference( */localCharsetDecoder;// );
		} else {
			localCharsetDecoder.reset();
		}
		ByteBuffer localByteBuffer = ByteBuffer.wrap(rep);
		CharBuffer localCharBuffer = CharBuffer
				.allocate((int) (localByteBuffer.remaining() * localCharsetDecoder.maxCharsPerByte()));
		CoderResult localCoderResult = localCharsetDecoder.decode(localByteBuffer, localCharBuffer, true);
		return !localCoderResult.isError();
	}

	public CodingErrorAction malformedInputAction() {
		return this.malformedInputAction;
	}

	public final CharsetEncoder onMalformedInput(CodingErrorAction err) {
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

	public final CharsetEncoder onUnmappableCharacter(CodingErrorAction err) {
		if (err == null) {
			throw new IllegalArgumentException("Null action");
		}
		this.unmappableCharacterAction = err;
		implOnUnmappableCharacter(err);
		return this;
	}

	protected void implOnUnmappableCharacter(CodingErrorAction err) {
	}

	public final float averageBytesPerChar() {
		return this.averageBytesPerChar;
	}

	public final float maxBytesPerChar() {
		return this.maxBytesPerChar;
	}

	public final CoderResult encode(CharBuffer in, ByteBuffer out, boolean done) {
		int i = done ? ST_END : ST_CODING;
		if ((this.state != ST_RESET) && (this.state != ST_CODING) && ((!done) || (this.state != ST_END))) {
			throwIllegalStateException(this.state, i);
		}
		this.state = i;
		for (;;) {
			CoderResult localCoderResult;
			try {
				localCoderResult = encodeLoop(in, out);
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
				if (out.remaining() < this.replacement.length) {
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

	public final CoderResult flush(ByteBuffer out) {
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

	protected CoderResult implFlush(ByteBuffer out) {
		return CoderResult.UNDERFLOW;
	}

	public final CharsetEncoder reset() {
		implReset();
		this.state = ST_RESET;
		return this;
	}

	protected void implReset() {
	}

	protected abstract CoderResult encodeLoop(CharBuffer in, ByteBuffer out);

	public final ByteBuffer encode(CharBuffer in) throws CharacterCodingException {
		int i = (int) (in.remaining() * averageBytesPerChar());
		Object localObject = ByteBuffer.allocate(i);
		if ((i == 0) && (in.remaining() == 0)) {
			return (ByteBuffer) localObject;
		}
		reset();
		for (;;) {
			CoderResult localCoderResult = in.hasRemaining()
					? encode(in, (ByteBuffer) localObject, true)
					: CoderResult.UNDERFLOW;
			if (localCoderResult.isUnderflow()) {
				localCoderResult = flush((ByteBuffer) localObject);
			}
			if (localCoderResult.isUnderflow()) {
				break;
			}
			if (localCoderResult.isOverflow()) {
				i = 2 * i + 1;
				ByteBuffer localByteBuffer = ByteBuffer.allocate(i);
				((ByteBuffer) localObject).flip();
				localByteBuffer.put((ByteBuffer) localObject);
				localObject = localByteBuffer;
			} else {
				localCoderResult.throwException();
			}
		}
		((ByteBuffer) localObject).flip();
		return (ByteBuffer) localObject;
	}

	private boolean canEncode(CharBuffer in) {
		if (this.state == ST_FLUSHED) {
			reset();
		} else if (this.state != ST_RESET) {
			throwIllegalStateException(this.state, ST_CODING);
		}
		CodingErrorAction localCodingErrorAction1 = malformedInputAction();
		CodingErrorAction localCodingErrorAction2 = unmappableCharacterAction();
		try {
			onMalformedInput(CodingErrorAction.REPORT);
			onUnmappableCharacter(CodingErrorAction.REPORT);
			encode(in);
		} catch (CharacterCodingException localCharacterCodingException) {
			return false;
		} finally {
			onMalformedInput(localCodingErrorAction1);
			onUnmappableCharacter(localCodingErrorAction2);
			reset();
		}
		return true;
	}

	public boolean canEncode(char c) {
		CharBuffer localCharBuffer = CharBuffer.allocate(1);
		localCharBuffer.put(c);
		localCharBuffer.flip();
		return canEncode(localCharBuffer);
	}

	public boolean canEncode(CharSequence cs) {
		CharBuffer localCharBuffer;
		if ((cs instanceof CharBuffer)) {
			localCharBuffer = ((CharBuffer) cs).duplicate();
		} else {
			localCharBuffer = CharBuffer.wrap(cs.toString());
		}
		return canEncode(localCharBuffer);
	}

	private void throwIllegalStateException(int old, int now) {
		throw new IllegalStateException(
				"Current state = " + stateNames[old] + ", new state = " + stateNames[now]);
	}
}
