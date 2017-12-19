// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.audio;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.URL;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;

/**
 * Reason why PhetAudioClip exists:
 * <p/>
 * http://www.javaworld.com/javaworld/javatips/jw-javatip24.html
 * <p/>
 * TODO: why not use Applet.newAudioClip instead of this implementation?
 */
public class PhetAudioClip {

    private static final int EXTERNAL_BUFFER_SIZE = 4000;

    private final URL url;
    private volatile boolean playing;

    public PhetAudioClip( String resourceName ) {
        this( Thread.currentThread().getContextClassLoader().getResource( resourceName ) );
    }

    public PhetAudioClip( URL url ) {
        this.url = url;
    }

    /**
     * Plays the audio clip in a separate thread.
     */
    public void play() {
    	
        startAudioThread();
    }

    /**
     * Is the audio clip playing?
     *
     * @return
     */
    public boolean isPlaying() {
        return playing;
    }

    /*
     * Starts the thread that processes the audio resource.
     */
    private void startAudioThread() {
        Thread playingThread = new Thread( new Runnable() {
            @Override
						public void run() {
                try {
                    processAudio();
                }
                catch ( Exception e ) {
                    e.printStackTrace();
                }
            }
        } );
        playingThread.setDaemon( true );
        playingThread.start();
    }

	/**
	 * 
	 * Processes the audio resource associated with this clip. Reads data from the
	 * resource file, writes it to the audio system.
	 * 
	 * 
	 */
	private void processAudio() {
		playing = true;

		try {

			/**
			 * This call to swingjs.JSToolkit.payAudioFile replaces any need for AudioSystem.
			 *
			 * 
			 * @j2sNative
			 * 
			 *            swingjs.JSToolkit.playAudioFile$java_net-URL(this.url);
			 */
			{

				AudioInputStream audioInputStream;
				SourceDataLine line;

				// Load the audio input stream and decorate with a BufferedInputStream
				// to support mark/reset, see #3375
				audioInputStream = AudioSystem
						.getAudioInputStream(new BufferedInputStream(url.openStream()));

				AudioFileFormat aff = AudioSystem.getAudioFileFormat(url);

				AudioFormat audioFormat = aff.getFormat();

				DataLine.Info info = new DataLine.Info(SourceDataLine.class,
						audioFormat);
				line = (SourceDataLine) AudioSystem.getLine(info);

				/*
				 * The line is there, but it is not yet ready to receive audio data. We
				 * have to open the line.
				 */
				line.open(audioFormat);

				/*
				 * Still not enough. The line now can receive data, but will not pass
				 * them on to the audio output device (which means to your sound card).
				 * This has to be activated.
				 */
				line.start();

				/*
				 * Ok, finally the line is prepared. Now comes the real job: we have to
				 * write data to the line. We do this in a loop. First, we read data
				 * from the AudioInputStream to a buffer. Then, we write from this
				 * buffer to the Line. This is done until the finish of the file is
				 * reached, which is detected by a return value of -1 from the read
				 * method of the AudioInputStream.
				 */
				int nBytesRead = 0;

				byte[] abData = new byte[EXTERNAL_BUFFER_SIZE];
				while (nBytesRead != -1) {
					try {
						nBytesRead = audioInputStream.read(abData, 0, abData.length);
					} catch (IOException e) {
						break;
					}
					if (nBytesRead >= 0) {
						line.write(abData, 0, nBytesRead);
					}
				}
				line.drain();
				line.close();

			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			playing = false;
		}
	}
}
