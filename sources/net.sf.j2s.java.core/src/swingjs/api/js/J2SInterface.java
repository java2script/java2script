package swingjs.api.js;

import java.awt.JSComponent;
import java.awt.Point;
import java.util.Hashtable;

import javajs.api.JSFunction;
//import javajs.util.JSThread;
import swingjs.api.js.JSSwingMenu;


public interface J2SInterface {

	void addBinaryFileType(String ext);

	void addDirectDatabaseCall(String domain);
	
	boolean debugClip();
	
	
	
	HTML5Applet findApplet(String htmlName);

	Object getCachedJavaFile(String key);

	/**
	 * 
	 * @param isAll true for check of navigator; otherwise just J2S._lang from j2sLang=xx_XX in URI
	 * @return
	 */
	String getDefaultLanguage(boolean isAll);

	Object getFileData(String fileName, Object fSuccess, boolean doProcess, boolean isBinary);

	void getFileFromDialog(JSFunction f, String type);

	Object getJavaResource(String resourceName, boolean isJavaPath);
	
	String getJavaVersion();

	int getKeyModifiers(Object jQueryEvent);
	
	Point getMousePosition(Point p);
	
	String getResourcePath(String resourceName, boolean isJavaPath);

	Hashtable<String, Object> getSetJavaFileCache(Object object);
	
	JSSwingMenu getSwing();
	
	int getZ(HTML5Applet applet, String frameType);

	boolean isBinaryUrl(String filename);

	boolean isResourceLoaded(String file, boolean done);

	void readyCallback(String appId, String fullId, boolean isReady, 
			Object javaApplet, Object javaAppletPanel);

	void saveFile(String fileName, Object data, String mimeType, String encoding);
	
	void setDragDropTarget(JSComponent target, DOMNode node, boolean adding);

	void setDraggable(DOMNode tagNode, Object targetNodeOrFDown);
	
	void setKeyListener(DOMNode node);

	void setMouse(DOMNode frameNode, boolean isSwingJS);

	int setWindowZIndex(DOMNode domNode, int pos);

	void unsetMouse(DOMNode frameNode);


}

