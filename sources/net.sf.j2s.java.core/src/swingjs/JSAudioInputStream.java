package swingjs;

import java.io.InputStream;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;

public class JSAudioInputStream extends AudioInputStream {

	public JSAudioInputStream(InputStream stream, AudioFormat format, long length) {
		super(stream, format, length);
	}

}