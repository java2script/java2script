package swingjs.api.js;

/** 
 * called by JSmol JavaScript methods using
 * 
 *  this._applet.xxxx()
 *  
 */
public interface JSInterface {

  int cacheFileByName(String fileName, boolean isAdd);
  void cachePut(String key, Object data);
  void destroy();
  String getFullName();
  void openFileAsyncSpecial(String fileName, int flags);
  boolean processMouseEvent(int id, int x, int y, int modifiers, long time, Object jqevent, int scroll);
  void processTwoPointGesture(float[][][] touches);
  void setDisplay(HTML5Canvas canvas);
  void setScreenDimension(int width, int height);
  boolean setStatusDragDropped(int mode, int x, int y, String fileName);
	void startHoverWatcher(boolean enable);

}

