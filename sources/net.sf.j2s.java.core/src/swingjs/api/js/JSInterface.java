package swingjs.api.js;

/**
 * called by SwingJS JavaScript methods
 * 
 */
public interface JSInterface {

	int cacheFileByName(String fileName, boolean isAdd); // $S$Z

	void cachePut(String key, Object data); // $S$O

	void destroy();

	String getFullName();

	void openFileAsyncSpecial(String fileName, int flags); // $S$I

	boolean processMouseEvent(int id, int x, int y, int modifiers, long time, Object jqevent, int scroll); // $I$I$I$I$J$O$I

	void processTwoPointGesture(float[][][] touches); // AFFF

	void setDisplay(HTML5Canvas canvas);

	void setScreenDimension(int width, int height);

	boolean setStatusDragDropped(int mode, int x, int y, String fileName);
	
	static void setCursor(String c) {
		/**
		 * @j2sNative
		 * 
		 * try {
		 * 
		 *   document.body.style.cursor = c;
		 * 
		 * } catch (e) {}
		 */
	}

}
