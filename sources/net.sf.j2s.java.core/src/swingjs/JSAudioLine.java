package swingjs;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Control;
import javax.sound.sampled.Control.Type;

import swingjs.api.js.HTML5AudioContext;

import javax.sound.sampled.DataLine;
import javax.sound.sampled.Line;
import javax.sound.sampled.LineListener;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.SourceDataLine;

class JSAudioLine implements SourceDataLine {

	private DataLine.Info info;
	private boolean bOpen;
	private HTML5AudioContext auctx;
	private Object audioBuffer;
	private int nChannels, sampleRate;
	private int sampleSizeInBytes;
	private boolean isBigEndian, isUnsignedPCM;
	@SuppressWarnings("unused")
	private int startTime;
	private boolean bStopped;

	public JSAudioLine(Line.Info info) {
		this.info = (Info) info;
	}

	@Override
	public void open() throws LineUnavailableException {
		open(null, AudioSystem.NOT_SPECIFIED);
	}

	@Override
	public void open(AudioFormat format) throws LineUnavailableException {
		open(format, AudioSystem.NOT_SPECIFIED);
	}

	/**
	 * 
	 */
	@Override
	public void open(AudioFormat format, int bufferSizeBytes)
			throws LineUnavailableException {
		/**
		 * @j2sNative
		 * 
		 *            window.AudioContext = window.AudioContext ||
		 *            window.webkitAudioContext; this.auctx = new AudioContext();
		 * 
		 */
		{
		}
		if (format != null) {
			info.getFormats()[0] = format;
			nChannels = format.getChannels();
			sampleRate = (int) format.getSampleRate();
			sampleSizeInBytes = format.getSampleSizeInBits() >> 3;
			isBigEndian = format.isBigEndian();
			isUnsignedPCM = format.getEncoding() == AudioFormat.Encoding.PCM_UNSIGNED;
			audioBuffer = null;
		}
		startTime = 0;
		bOpen = true;
		bStopped = false;
	}

	@Override
	public Line.Info getLineInfo() {
		return info;
	}

	@Override
	public boolean isOpen() {
		return bOpen;
	}

	@Override
	public void close() {
		if (auctx != null)
			auctx.close();
		auctx = null;
		bOpen = false;
	}

	
	@Override
	public void start() {
		auctx.resume();
		bStopped = false;
	}

	@Override
	public void stop() {
		bStopped = true;
		auctx.suspend();
	}

	@Override
	public void drain() {
		flush();
		// this method blocks until the audio is done.
		// not tested in JavaScript. I doubt we can do it.
		
	}

	@Override
	public void flush() {
		this.startTime = 0;
		close(); // no flushing of HTML5 audio.
	}

	@Override
	public boolean isRunning() {
		return !bStopped;
	}

	@Override
	public boolean isActive() {
		return !bStopped; //??
	}

	@Override
	public AudioFormat getFormat() {
		return info.getFormats()[0];
	}

	@Override
	public int getBufferSize() {
		return Integer.MAX_VALUE;
	}

	@Override
	public int available() {
		return Integer.MAX_VALUE;
	}

	@Override
	public int getFramePosition() {
		JSUtil.notImplemented(null);
		return 0;
	}

	@Override
	public long getLongFramePosition() {
		JSUtil.notImplemented(null);
		return 0;
	}

	@Override
	public long getMicrosecondPosition() {
		/**
		 * @j2sNative
		 * 
		 * return this.auctx.currentTime * 1000000;
		 */
		{}
		return 0;
	}

	@Override
	public float getLevel() {
		JSUtil.notImplemented(null);
		return 0;
	}

	@Override
	public Control[] getControls() {
		JSUtil.notImplemented(null);
		return null;
	}

	@Override
	public boolean isControlSupported(Type control) {
		JSUtil.notImplemented(null);
		return false;
	}

	@Override
	public Control getControl(Type control) {
		JSUtil.notImplemented(null);
		return null;
	}

	@Override
	public void addLineListener(LineListener listener) {
		JSUtil.notImplemented(null);
	}

	@Override
	public void removeLineListener(LineListener listener) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int write(byte[] b, int off, int len) {
		if (!bOpen)
			try {
				open(getFormat());
			} catch (LineUnavailableException e) {
				return -1;
			}
		for (int i = nChannels; --i >= 0;)
			setChannelData(i, b, off, len);
		/**
		 * @j2sNative
		 * 
		 *            var source = this.auctx.createBufferSource(); if
		 *            (this.starTime == 0) this.auctx.currentTime = 0; if (this.startTime <
		 *            this.auctx.currentTime) this.startTime =
		 *            this.auctx.currentTime;
		 * 
		 *            source.buffer = this.audioBuffer;
		 *            source.connect(this.auctx.destination);
		 *            source.start(this.startTime);
		 * 
		 *            this.startTime += this.audioBuffer.duration;
		 */
		{
		}
		return len;
	}

	@SuppressWarnings({ "null", "unused" })
	/**
	 * We must convert data in one multi-channel-interwoven byte array
	 * to channelCount arrays of single-channel data.
	 * 
	 * We create a new audioBuffer if necessary.
	 *  
	 * @param ich
	 * @param b
	 * @param offset
	 * @param len
	 */
	private void setChannelData(int ich, byte[] b, int offset, int len) {
		float[] data = null;
		Object ab = audioBuffer;
		int abLen = 0;
		/**
		 * @j2sNative
		 * 
		 *            abLen = (ab ? ab.length : 0);
		 * 
		 */
		{
		}

		int nFrames = (len - offset) / sampleSizeInBytes / nChannels;
		if (audioBuffer == null || abLen != nFrames) {
			ab = audioBuffer = auctx.createBuffer(nChannels, nFrames, sampleRate);
		}

		/**
		 * @j2sNative
		 * 
		 *            data = ab.getChannelData(ich);
		 * 
		 */
		{
		}
		int bytesPerSample = sampleSizeInBytes;
		int di = bytesPerSample * nChannels;
		boolean big = isBigEndian;
		boolean unsigned = isUnsignedPCM;
		float f = 0;
		// initial data are 8-bit or 16-bit signed or unsigned integers
		// sampling must end up in the range -1.0 to 1.0
		for (int i = offset + ich * bytesPerSample, pt = 0; i < len; i += di) {
			switch (bytesPerSample) {
			case 1:
				f = b[i] * 1f / 0x80;
				break;
			case 2:
				// b will be a string of (short)
				int bi1 = b[i];
				int bi2 = b[i + 1];
				f = (big ? (bi1 << 8) | (bi2 & 0xFF) 
	     	         : (bi2 << 8) | (bi1 & 0xFF)
 						) * 1f / 0x8000;
			}
			// unsigned will be in the range 0.0 to 2.0 instead of -1.0 to 1.0
			data[pt++] = (unsigned ? f - 1 : f);
		}

	}

 }