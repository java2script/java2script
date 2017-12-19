package swingjs.api.js;

public interface HTML5AudioContext {

	// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
	// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
	
	void close();

	float[] createBuffer(int nChannels, int frameCount, int sampleRate);

	void createBufferSource();

	void createMediaElementSource();

	void createMediaStreamSource();

	void createMediaStreamDestination();

	void createScriptProcessor();

	//void createStereoPanner();

	void createAnalyser();

	void createBiquadFilter();

	void createChannelMerger();

	void createChannelSplitter();

	void createConvolver();

	void createDelay();

	void createDynamicsCompressor();

	void createGain();

	void createIIRFilter();

	void createOscillator();

	void createPanner();

	void createPeriodicWave();

	void createWaveShaper();

	void createAudioWorker();

	void decodeAudioData();

	void resume();

	void suspend();

}
