package swingjs;

public interface JSAudioThreadOwner {

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
