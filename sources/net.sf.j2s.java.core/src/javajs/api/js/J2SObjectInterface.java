package javajs.api.js;

/**
 * methods in j2s JavaScript accessed in Jmol -- note that there is a different  interface in SwingJS
 */
public interface J2SObjectInterface {
	
	Object doAjax(String url, String postOut, Object bytesOrStringOut, Object info);

	Object doAjax(Object url, String postOut, Object bytesOrStringOut, boolean isBinary);

	void applyFunc(Object func, Object data);

	void clearConsole(JSAppletObject html5Applet);

	Object getHiddenCanvas(JSAppletObject html5Applet, String string, int w, int h);

	Object loadFileAsynchronously(Object fileLoadThread, JSAppletObject html5Applet, String fileName, Object appData);

	Object newGrayScaleImage(Object context, Object image, int width, int height, int[] grayBuffer);

	void repaint(JSAppletObject html5Applet, boolean asNewThread);

	void resizeApplet(Object html5Applet, int[] dims);

	void saveImage(JSAppletObject html5Applet, String type, String fileName);

	void setCanvasImage(Object canvas, int width, int height);

	void showInfo(JSAppletObject html5Applet, boolean show);

// also in swingjs.api.js: 
	
	boolean isBinaryUrl(String filename);

	void saveFile(String fileName, Object data, String mimeType, String encoding);

}
