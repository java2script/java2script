package sun.audio;

import javajs.util.JSThread;

import java.io.InputStream;

import javax.sound.sampled.UnsupportedAudioFileException;

import swingjs.JSToolkit;

public class AudioPlayer extends JSThread {

	// note that this thread is never really started because the 
	// playAudio method is run anyway
  public static final AudioPlayer player = getAudioPlayer();

  private static AudioPlayer getAudioPlayer() {
    return new AudioPlayer();
}

	@Override
	protected boolean myInit() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected boolean isLooping() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected boolean myLoop() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected void whenDone() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected int getDelayMillis() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	protected void onException(Exception e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void doFinally() {
		// TODO Auto-generated method stub
		
	}

	public void start(InputStream is) {
		// TODO -- support standard stream?
		AudioDataStream ads = (AudioDataStream) is;
		try {
			JSToolkit.playAudio(ads.getAudioData().buffer, ads.getAudioData().format);
		} catch (UnsupportedAudioFileException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


}
