package swingjs.api.js;

public interface HTML5Applet {

	/**
	 * The canvas that is being used by the HTML5 applet 
	 * 
	 * @return
	 */
	Object _getHtml5Canvas();

	int _getHeight();

	int _getWidth();

	/**
	 * The div associated with the HTML5 applet 
	 * 
	 * @return
	 */
	Object _getContentLayer();

	/**
	 * Simple resizing for an inline applet
	 * 
	 * @param widthHeight
	 */
	void _resizeApplet(int[] widthHeight);

	void _show(boolean b);

	String _getID();

	void _setAppClass(Object app);


}
