package javajs.util;	

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;

import sun.audio.AudioData;
import sun.audio.AudioDataStream;
import sun.audio.AudioPlayer;


/**
 * The JSAudioThread adds a layer to JSThread that is specific for audio.
 * This class utilizes JSAudioLine, which is not fully fleshed out.
 * 
 * Two very simple interfaces,
 * 
 * (new JSAudioThread()).playULawData(byte[] b);
 * 
 * and
 * 
 * (new JSAudioThread(audioFormat)).playOnce(byte[] b, offset, length);
 * 
 * allow straightforward audio production without having to work with
 * SourceDataLine directly.
 * 
 * As a JSThread, this class implements myInit(), isLooping(), myLoop(),
 * whenDone(), onException(), and doFinally().
 * 
 * If the constructor JSAudioThread(JSAudioThreadUser, AudioFormat, byte[]) is
 * used, then the JSAudioThreadUser must simply implement fillAudioBuffer(),
 * checkSoundStatus(), and audioThreadExiting() for very simple streaming audio.
 * JSAudioThread will then take care of all the timing issues.
 * 
 * But the implementer is welcome to override any of the JSThread overrides
 * themselves in order to customize this further.
 * 
 * The standard streaming case, then is:
 * 
 * audioThread = new JSAudioThread(audioUser, audioFormat, audioByteBuffer);
 * audioThread.start();
 * 
 * where audioUser provides 
 * 
 * checkSoundStatus() (called in isLooping()),
 * 
 * fillAudioBuffer() (called in myLoop()),
 * 
 * and
 * 
 * audioThreadExiting() (called in doFinally()).
 * 
 * @author Bob Hanson
 * 
 */
public class JSAudioThread extends JSThread {
	
	protected Owner owner;
	protected boolean done;
	protected int myBufferLength;
	protected SourceDataLine line;
	protected int rate, nChannels, bitsPerSample;
	
	protected byte[] audioByteBuffer;
	protected int audioBufferByteLength;

	private AudioFormat audioFormat;
	private int myBufferOffset;
	private int playCount;
	
	public JSAudioThread(Owner owner, AudioFormat audioFormat, byte[] audioByteBuffer) {
		this.owner = owner;
		setFormat(audioFormat);
		setBuffer(audioByteBuffer);
	}

	/**
	 * A convenience constructor requiring standard settings of 
	 * signed (for 8-bit) and littleEndian (for 16-bit)
	 *   
	 * @param owner
	 * @param rate
	 * @param bitsPerSample
	 * @param nChannels
	 * @param audioByteBuffer
	 */
	public JSAudioThread(Owner owner, int rate, int bitsPerSample, int nChannels, byte[] audioByteBuffer) {
		this.owner = owner;
		setFormat(new AudioFormat(rate, bitsPerSample, nChannels, true, false));
		setBuffer(audioByteBuffer);
	}
	
	/**
	 * primarily available for (new JSAudioThread()).playULawData
	 * 
	 */
	public JSAudioThread() {
	}

	/**
	 * primarily available for (new JSAudioThread()).playOnce
	 * 
	 */
	public JSAudioThread(AudioFormat audioFormat) {
		setFormat(audioFormat);
	}

	/**
	 * 
	 * A simple 8-bit uLaw data player
	 * 
	 * @param data
	 */
	public void playULawData(byte[] data) {
		// this constructor uses default new AudioFormat(ULAW,8000,8,1,1,8000,true)
		// threading is taken care of by the browser in JavaScript
		AudioPlayer.player.start(new AudioDataStream(new AudioData(data)));
	}


	/**
	 * Just play once through; no additions
	 * 
	 * @param data
	 */
	public void playOnce(byte[] data, int offset, int length) {
		setBuffer(data);
		myBufferOffset = offset;
		myBufferLength = length;
		playCount = 1;
		start();
	}

	public void setBuffer(byte[] audioByteBuffer) {
		this.audioByteBuffer = audioByteBuffer;
		audioBufferByteLength = audioByteBuffer.length;
	}
	
	public SourceDataLine getLine() {
		return line;
	}
	
	public AudioFormat getFormat() {
		return audioFormat;
	}
			
	public void setFormat(AudioFormat audioFormat) {
		this.audioFormat = audioFormat;
		rate = (int) audioFormat.getSampleRate();
		bitsPerSample = audioFormat.getSampleSizeInBits();
		nChannels = audioFormat.getChannels();			
	}

	public void resetAudio() {
		if (line == null)
			return;
		line.flush();
		line.close();
		line = null;
	}

	/**
	 * Standard initialization of a SourceDataLine
	 * 
	 */
	@Override
	protected boolean myInit() {
		try {
			DataLine.Info info = new DataLine.Info(SourceDataLine.class, audioFormat);
			if (line != null)
				line.close();
			line = (SourceDataLine) AudioSystem.getLine(info);
			line.open(audioFormat, audioBufferByteLength);
			line.start();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@Override
	protected boolean isLooping() {
		return !done && (--playCount >= 0 || owner != null && owner.checkSoundStatus());
	}

	@Override
	protected boolean myLoop() {
		if (!done) {
			if ((myBufferLength = (owner == null ? myBufferLength : owner.fillAudioBuffer())) <= 0)
				return !(done = true);
			try {
				if (line == null)
					myInit();					
				line.write(audioByteBuffer, myBufferOffset, myBufferLength);
			} catch (Exception e) {
				e.printStackTrace();
				done = true;
			}
		}
		return !done;
	}

	@Override
	protected void whenDone() {
		done = true;
		resetAudio();
	}

	@Override
	protected int getDelayMillis() {
		// about 25% of the actual play time
	return 1000                                        // ms/sec 
			* (myBufferLength  * 8 / bitsPerSample)        // * samples 
			/ rate                                         // * seconds/sample) 
			/ nChannels                                    // / number of channels
			/ 4;                                           // * 25%
	}

	@Override
	protected void onException(Exception e) {
		e.printStackTrace();
	}

	@Override
	protected void doFinally() {
		if (owner != null)
			owner.audioThreadExiting();
	}

	public interface Owner {

		/**
		 * 
		 * @return true if thread should continue; false if not
		 * 
		 */
		boolean checkSoundStatus();

		/** fill audio buffer
		 * 
		 * @return number of bytes to write to audio line
		 *
		 */
		int fillAudioBuffer();

		/**
		 *  called from the finally clause when complete 
		 * 
		 */
		void audioThreadExiting();
		

	}

}

