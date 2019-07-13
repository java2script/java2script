package test;

import swingjs.api.js.HTML5Canvas;

/** 
 * called by JSmol JavaScript methods using
 * 
 *  this._appletPanel.xxxx$paramTypes()
 *  
 */
public interface JSInterface {

	public static int doTest(int i) {
		return i + 1;
	}
	
  int cacheFileByName(String fileName, boolean isAdd);  // $S$Z
  void cachePut(String key, Object data);               // $S$O
  void destroy();                                      
  String getFullName();                             
  void openFileAsyncSpecial(String fileName, int flags); // $S$I
  boolean processMouseEvent(int id, int x, int y, int modifiers, long time, Object jqevent, int scroll); // $I$I$I$I$J$O$I
  void processTwoPointGesture(float[][][] touches); // AFFF
  void setDisplay(HTML5Canvas canvas);  
  void setScreenDimension(int width, int height);
  boolean setStatusDragDropped(int mode, int x, int y, String fileName);
	void startHoverWatcher(boolean enable);

}

