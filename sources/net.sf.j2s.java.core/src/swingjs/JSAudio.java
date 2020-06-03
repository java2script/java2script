package swingjs;	

import java.applet.AudioClip;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Hashtable;
import java.util.Map;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioFormat.Encoding;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.Line;
import javax.sound.sampled.UnsupportedAudioFileException;

import javajs.util.BC;
import javajs.util.Base64;
import javajs.util.OC;
import javajs.util.Rdr;
import swingjs.api.js.DOMNode;



/**
 * 
 * see http://stackoverflow.com/questions/5810164/how-can-i-write-wav-file-from-byte-array-in-java
 * 
 * see www-mmsp.ece.mcgill.ca/documents/audioformats/wave/wave.html
 * 
 * see http://www.jsresources.org/faq_audio.html
 * 
 * 
 * 
 * 
 * 
 */

public class JSAudio implements AudioClip {

	private AudioClip myPlayer;
	private String myURI;


	public JSAudio() {
		// for reflection
	}

	public JSAudio(URL url) {
		try {
			byte[] bytes = Rdr.getLimitedStreamBytes(url.openStream(), -1);
			AudioFormat audioFormat = getAudioFormatForStreamOrBytes(null, bytes);
			String format = (String) audioFormat.getProperty("fileFormat");
			if (format == null || format == "AU") {
				bytes = createWaveData(bytes, audioFormat);
				format = "wav"; // for Chrome: not "wave"
			}
			if (bytes == null)
				return;
			myURI = getBase64(bytes, format);
			myPlayer = getAudioElement(myURI, false);			
		} catch (Exception e) {
			System.out.println("Exception creating AudioClip for " + url);
			e.printStackTrace();
		}
	}

	public AudioClip getAudioClip(URL url) {
		JSAudio jsAudio = new JSAudio(url);
		return jsAudio;
	}

	public static AudioClip getAudioElement(String filePath, boolean isLoop) {
		AudioClip clip = (AudioClip) DOMNode.setAttrs(DOMNode.createElement("audio", null), 
				"controls", "true", (isLoop ? "loop" : null), (isLoop ? "true" : null), "src", filePath);
		// alias the actual audio element methods to SwingJS-qualified methods.
		/**
		 * @j2sNative
		 *  clip.play$ = clip.play;
		 *  clip.stop$ = clip.stop;
		 *  clip.loop$ = clip.loop;
		 */
		return clip;
	}


	@Override
	public void play() {
		if (this.myPlayer == null)
			return;
		/**
		 * @j2sNative
		 * 
		 * this.myPlayer.currentTime = 0;
		 * 
		 */
		myPlayer.play();
	}


	/**
	 * untested
	 * 
	 */
	@Override
	public void loop() {
		if (this.myPlayer == null)
			return;
		stop();
		/**
		 * @j2sNative
		 * 
		 * this.myPlayer.loop = true;
		 */
		play();
	}


	@Override
	public void stop() {
		if (this.myPlayer == null)
			return;
		/**
		 * @j2sNative
		 * 
		 * this.myPlayer.pause();
		 * this.myPlayer.currentTime = 0;
		 * 
		 */
		{
			myPlayer.stop();
		}
	}

	
	public Line getAudioLine(Line.Info info) {
		return new JSAudioLine(info);
	}
	
	public AudioClip getAudioFileFromURL(URL url) throws IOException, UnsupportedAudioFileException {
		if (JSUtil.debugging)
			System.out.println(url + " AudioFormat:" + getAudioFileFormat(url));
		return getAudioPlayerForBytes(Rdr.getLimitedStreamBytes(url.openStream(), -1), null);
	}
 
	
	public static AudioFormat getAudioFileFormat(URL url) throws IOException, UnsupportedAudioFileException {
		return getAudioFormatForStreamOrBytes(null, Rdr.getLimitedStreamBytes(url.openStream(), -1));
	}
 

	/**
	 * play binary audio file data through an HTML5 audio element where the data
	 * are already in wave format (this could be MPEG, for example, too, but WAVE
	 * is the most reliable for cross-browser capability.
	 * 
	 * @param fileData
	 * @param fileType
	 *          string xxx to be placed in data:audio/xxx;base64,
	 * @throws UnsupportedAudioFileException
	 */
	public AudioClip getAudioPlayerForBytes(byte[] fileData, String fileType)
			throws UnsupportedAudioFileException {
		AudioFormat format = getFormat(fileData, fileType);
		return getAudio(fileData, format);
	}

	private AudioFormat getFormat(byte[] fileData, String fileType) throws UnsupportedAudioFileException {
		Map<String, Object> props = new Hashtable<String, Object>();
		if (fileType == null)
			fileType = getAudioTypeForBytes(fileData);
		props.put("fileFormat", fileType);
		return new AudioFormat(null, -1, -1, -1, -1, -1, false, props);
	}

	/**
	 * 
	 * play audio from byte data.  
	 * 
	 * 
	 * @param data  either raw data or wave data, with header
	 * @param audioFormat  null if data is already formatted
	 * @param format xxx in data:/audio/xxx;base64 if not null; ignored if audioFormat is not null
	 * @return false if unsuccessful
	 * @throws UnsupportedAudioFileException 
	 * @throws IOException
	 */
	public AudioClip getAudio(byte[] data, AudioFormat audioFormat) throws UnsupportedAudioFileException {
		String format = (String) audioFormat.getProperty("fileFormat");
		if (format == null || format == "AU") {
			data = createWaveData(data, audioFormat);
			format = "wav"; // for Chrome: not "wave"
		}
		if (data == null)
			return null;			
		return getAudioElement(getBase64(data, format), false);
	}

	
	private String getBase64(byte[] data, String format) {
		return "data:audio/" + format.toLowerCase() + ";base64," + Base64.getBase64(data);
	}


	private final static int FORMAT_UNSUPPORTED = 0;
	private final static int FORMAT_PCM = 1;
	private final static int FORMAT_ULAW = 7;


	/**
	 * add the necessary header to raw wave data.
	 * 
	 * accepting
	 * 
	 * samplesPerSecond 8000,11025,16000,22050,44100
	 * 
	 * bytesPerSample 1 (8-bit) or 2 (16-bit)
	 * 
	 * encoding PCM_SIGNED (8- or 16-bit) and ULAW (8 bit)
	 * 
	 * @param data
	 *          raw byte data without header
	 * 
	 * @return WAV data or null if not supported
	 * @throws UnsupportedAudioFileException
	 */
	public byte[] createWaveData(byte[] data, AudioFormat af)
			throws UnsupportedAudioFileException {
		int spsec = (int) af.getSampleRate();
		int bitsPerSample = af.getSampleSizeInBits();
		int bytesPerSample = bitsPerSample / 8;

		switch (spsec) {
		case 8000:
		case 11025:
		case 16000:
		case 22050:
		case 44100:
			break;
		default:
			throw new UnsupportedAudioFileException("sample rate of " + spsec
					+ " must be one of 8000,11025,1600,22050,44100");
		}

		// 0x0001 WAVE_FORMAT_PCM PCM
		// 0x0003 WAVE_FORMAT_IEEE_FLOAT IEEE float
		// 0x0006 WAVE_FORMAT_ALAW 8-bit ITU-T G.711 A-law
		// 0x0007 WAVE_FORMAT_MULAW 8-bit ITU-T G.711 �-law

		// byte[] b;
		int fmt = FORMAT_UNSUPPORTED;
		int offset = 0;
		// "PCM ;PCMB;ALAW;ULAW;FLOAT"

		String format = af.getEncoding().toString();
		//.......0.........1.........2.........3.........4.........5.........6
		//.......0123456789012345678901234567890123456789012345678901234567890
		switch ("PCM_SIGNED     PCM_UNSIGNED   PCM_FLOAT      ULAW           ALAW           "
				.indexOf(format)) {
		case 0: // PCM_SIGNED
			switch (bitsPerSample) {
			case 8:
				fmt = FORMAT_ULAW;
				data = toULaw(data);
				break;
			case 16:
				fmt = FORMAT_PCM;
				if (af.isBigEndian())
					data = toLittleEndian(data);
				break;
			}
			break;
		case 45:
			// 
			if (bitsPerSample == 8) {
				fmt = FORMAT_ULAW;
				if (isAU(data))
					offset = BC.bytesToInt(data, 4, true);
			}
			break;
		}
		if (fmt == FORMAT_UNSUPPORTED)
			throw new UnsupportedAudioFileException("unsupported format "
					+ bitsPerSample + "-bit " + format);
		int nchannels = 1;
		int bytesPerSecond = spsec * nchannels * bytesPerSample;
		@SuppressWarnings("resource")
		OC out = new OC();
		out.setBigEndian(false);
		out.append("RIFF"); // 00 "RIFF"
		out.writeInt(36 + data.length); // 04 36 + data.length
		out.append("WAVE"); // 08 "WAVE"
		out.append("fmt "); // 12 "fmt "
		out.writeInt(16); // 16 - size of this chunk
		out.writeShort((short) fmt); // 20 - what is the audio format? 1 (PCM)
		out.writeShort((short) 1); // 22 - mono or stereo? 1
		out.writeInt(spsec); // 24 - samples per second
		out.writeInt(bytesPerSecond); // 28 - bytes per second
		out.writeShort((short) bytesPerSample); // 32 - # of bytes in one sample (2)
		out.writeShort((short) (bitsPerSample)); // 34 - how many bits in a sample
																							// sample (16)
		out.append("data"); // 36 - "data"
		out.writeInt(data.length - offset); // 40 - how big is this data chunk
		out.write(data, offset, data.length - offset); // 44 - the actual data itself
		out.closeChannel();
		return out.toByteArray();
	}

	/**
	 * switches byte pairs from bigendian to littleendian
	 * @param data
	 * @return
	 */
	public static byte[] toLittleEndian(byte[] data) {
		// switch to little-endian form
		byte[] b = new byte[data.length];
		for (int i = data.length;--i > 0;--i) { // > 0 here
			b[i - 1] = data[i];
			b[i] = data[i - 1];
		}
		return b;
	}


	/**
	 * converts bytes to mu-Law format
	 * 
	 * @param data
	 */
	 public static byte[] toULaw(byte[] data) {
			byte[] b = new byte[data.length];
			System.arraycopy(data, 0, b, 0, b.length);		 
		 for (int i = b.length; --i >= 0;)
			 b[i] = (byte) to_ulaw[128 + b[i]];
		 return b;
	 }

	// from http://www.falstad.com/barwaves/
	 
	 static final int to_ulaw[] = {
			0,    0,    0,    0,    0,    1,    1,    1,
			1,    2,    2,    2,    2,    3,    3,    3,
			3,    4,    4,    4,    4,    5,    5,    5,
			5,    6,    6,    6,    6,    7,    7,    7,
			7,    8,    8,    8,    8,    9,    9,    9,
			9,   10,   10,   10,   10,   11,   11,   11,
			11,   12,   12,   12,   12,   13,   13,   13,
			13,   14,   14,   14,   14,   15,   15,   15,
			15,   16,   16,   17,   17,   18,   18,   19,
			19,   20,   20,   21,   21,   22,   22,   23,
			23,   24,   24,   25,   25,   26,   26,   27,
			27,   28,   28,   29,   29,   30,   30,   31,
			31,   32,   33,   34,   35,   36,   37,   38,
			39,   40,   41,   42,   43,   44,   45,   46,
			47,   49,   51,   53,   55,   57,   59,   61,
			63,   66,   70,   74,   78,   84,   92,  104,
			254,  231,  219,  211,  205,  201,  197,  193,
			190,  188,  186,  184,  182,  180,  178,  176,
			175,  174,  173,  172,  171,  170,  169,  168,
			167,  166,  165,  164,  163,  162,  161,  160,
			159,  159,  158,  158,  157,  157,  156,  156,
			155,  155,  154,  154,  153,  153,  152,  152,
			151,  151,  150,  150,  149,  149,  148,  148,
			147,  147,  146,  146,  145,  145,  144,  144,
			143,  143,  143,  143,  142,  142,  142,  142,
			141,  141,  141,  141,  140,  140,  140,  140,
			139,  139,  139,  139,  138,  138,  138,  138,
			137,  137,  137,  137,  136,  136,  136,  136,
			135,  135,  135,  135,  134,  134,  134,  134,
			133,  133,  133,  133,  132,  132,  132,  132,
			131,  131,  131,  131,  130,  130,  130,  130,
			129,  129,  129,  129,  128,  128,  128,  128
		 };
	 
	 public static AudioInputStream getAudioInputStream(ByteArrayInputStream stream) throws UnsupportedAudioFileException {
		return new JSAudioInputStream(stream, getAudioFormatForStreamOrBytes(stream, null), -1);
	}

	@SuppressWarnings("unused")
	private static AudioFormat getAudioFormatForStreamOrBytes(
			ByteArrayInputStream stream, byte[] header) throws UnsupportedAudioFileException {
		
		// tests at http://www.kozco.com/tech/soundtests.html

		Map<String, Object> props = new Hashtable<String, Object>();
		String fmt = (stream == null ? getAudioTypeForBytes(header) : getAudioTypeForStream(stream));
		props.put("fileFormat", fmt);
		if (stream != null)
			stream.reset();
		Encoding encoding = null;
		float sampleRate = -1;
		int sampleSizeInBits = -1;
		int channels = -1;
		int frameSize = -1;
		float frameRate = -1;
		boolean bigEndian = false;

		try {
			if (fmt == "MP3") {
				// doubtful that Java can read these.
			} else if (fmt == "OGG") {
				// same deal
			} else if (fmt == "AU") {
				// based on http://www.topherlee.com/software/pcm-tut-wavformat.html
				if (stream != null) {
					header = new byte[24];
					stream.read(header);
				}
				sampleSizeInBits = 8;
				//int pt = BC.bytesToInt(header, 4, true);
				//int length = BC.bytesToInt(header, 8, true);
				int enc = BC.bytesToInt(header, 12, true);
				frameRate = sampleRate = BC.bytesToInt(header, 16, true);
				channels = BC.bytesToInt(header, 20, true);
				frameSize = channels * sampleSizeInBits / 8;
				bigEndian = true;
				if (enc != 1) {
					System.out.println("AU audio encoding " + enc + " not supported");
				}
				encoding = Encoding.ULAW;
			} else if (fmt == "WAV") {
				// based on http://www.topherlee.com/software/pcm-tut-wavformat.html
				if (stream != null) {
					header = new byte[36];
					stream.read(header);
				}
				int enc = BC.bytesToShort(header, 20, false);
				if (enc == 1)
					encoding = Encoding.PCM_SIGNED; // assuming signed here
				channels = BC.bytesToShort(header, 22, false);
				frameRate = sampleRate = BC.bytesToInt(header, 24, false);
				//int byteRate =  BC.bytesToInt(header, 28, false);// Sample Rate * BitsPerSample * Channels / 8.
				frameSize = BC.bytesToShort(header, 32, false);// NumChannels * BitsPerSample / 8
				sampleSizeInBits = BC.bytesToShort(header, 34, false); // 8, 16, etc.
			}
		} catch (Throwable e) {
		} finally {
			if (stream != null)
				stream.reset();
		}
		return new AudioFormat(encoding, sampleRate, sampleSizeInBits, channels,
				frameSize, frameRate, bigEndian, props);
	}


	private static String getAudioTypeForStream(ByteArrayInputStream stream) throws UnsupportedAudioFileException {
		stream.reset();
		byte[] b = new byte[12];
		try {
			stream.read(b);
		} catch (IOException e) {
			// no problem
		}
		stream.reset();
		return getAudioTypeForBytes(b);
	}


	private static String getAudioTypeForBytes(byte[] b)
			throws UnsupportedAudioFileException {
		if (isWave(b))
			return "WAV";
		if (isMP3(b))
			return "MP3";
		if (isOGG(b))
			return "OGG";
		if (isAU(b))
			return "AU";
		throw new UnsupportedAudioFileException();
	}


	private static boolean isOGG(byte[] b) {
		// "OggS"
		return b[0] == 0x4F && b[1] == 0x67 && b[2] == 0x67 && b[3] == 0x53;
	}

	private static boolean isMP3(byte[] b) {
		// FF FB.., or "ID3" 
		return b[0] == 0xFF && b[1] == 0xFB
				|| b[0] == 0x49 && b[1] == 0x44 && b[2] == 0x33;
	}
	private static boolean isWave(byte[] b) {
		// "RIFF....WAVE" // 52 49 46 46
		return b[0] == 0x52 && b[1] == 0x49 && b[2] == 0x46 && b[3] == 0x46
			  && b[8] == 0x57 && b[9] == 0x41 && b[10] == 0x56 && b[11] == 0x45;
	}

	private static boolean isAU(byte[] b) {
		// ".snd"
		return b[0] == 0x2E && b[1] == 0x73 && b[2] == 0x6E && b[3] == 0x64;
	}


}
