package swingjs.api.js;

import java.applet.AudioClip;
import java.awt.Component;
import java.awt.Image;
import java.awt.JSComponent;
import java.awt.Rectangle;

import javax.swing.plaf.ComponentUI;

import swingjs.JSUtil;

/**
 * A mix of direct DOM calls on DOM nodes and convenience methods to do that.
 * 
 * NOTE: DO NOT OVERLOAD THESE METHODS, as this package will not be qualified.
 * 
 * @author hansonr
 *
 */
public abstract class DOMNode {


	public abstract String[] getAttributeNames();

	public abstract String getAttribute(String name);

	// "abstract" in the sense that these are the exact calls to JavaScript
	
	public abstract void appendChild(DOMNode node);

	public abstract boolean hasFocus();

	public abstract boolean play();

	public abstract DOMNode removeAttribute(String attr);
	
	public abstract void setSelectionRange(int pt0, int pt1);

	public abstract Rectangle getBoundingClientRect();
	
	// static convenience methods

	public static DOMNode createElement(String key, String id) {
		DOMNode node = null;
		/**
		 * @j2sNative
		 * 					node = document.createElement(key);
		 * 					id && (node.id = id);
		 */
		return node;
	}

	public static DOMNode createTextNode(String text) {
		return (/** @j2sNative document.createTextNode(text) || */ null); 
	}

	public static void addJqueryHandledEvent(Object me, DOMNode node, String event) {
		JSUtil.jQuery.$(node).on(event, /** @j2sNative  function(ev) {me.handleJSEvent$O$I$O(node, -1, ev)} || */null);
	}

	public static DOMNode getParent(DOMNode node) {
		return (/**  @j2sNative  node.parentNode ||*/ null);
	}
	
	public static DOMNode firstChild(DOMNode node) {
		return 	(/**  @j2sNative node.firstChild ||*/ null);
	}

	public static DOMNode lastChild(DOMNode node) {
		return 	(/**  @j2sNative node.lastChild ||*/ null);
	}

	public static DOMNode setZ(DOMNode node, int z) {
		return setStyles(node, "z-index", "" + z);
	}

	public static Object getAttr(DOMNode node, String attr) {
		return 	(/**  @j2sNative node && node[attr] ||*/ null);
	}

	public static int getAttrInt(DOMNode node, String attr) {
		return 	(/**  @j2sNative node && node[attr] ||*/ 0);
	}

	public static String getStyle(DOMNode node, String style) {
		return 	(/**  @j2sNative node && node.style[style] ||*/ null);
	}

	public static void getCSSRectangle(DOMNode node, Rectangle r) {
		/**
		 * @j2sNative
		 * 
		 *       r.x = parseInt(node.style.left.split("p")[0]);
		 *       r.y = parseInt(node.style.top.split("p")[0]);
		 *       r.width = parseInt(node.style.width.split("p")[0]);
		 *       r.height = parseInt(node.style.height.split("p")[0]);
		 * 
		 */
	}

	public static DOMNode setAttr(DOMNode node, String attr, Object val) {
		/**
		 * @j2sNative
		 * 
		 * 			node[attr] = (val == "TRUE" ? true : val);
		 * 
		 */
		return node;
	}


	public static void setAttrInt(DOMNode node, String attr, int val) {
		/**
		 * @j2sNative
		 * 
		 * 			node[attr] = val;
		 * 
		 */
	}


	/**
	 * allows for null key to be skipped (used in audio)
	 * 
	 * @param node
	 * @param attr
	 * @return
	 */
	public static DOMNode setAttrs(DOMNode node, Object... attr) {
		/**
		 * @j2sNative
		 * 
		 *            for (var i = 0; i < attr.length;) { 
		 *            	var key = attr[i++];
		 *            	var val = attr[i++];
		 *            	key && (node[key] = val); 
		 *            }
		 */
		return node;
	}

	public static DOMNode setStyles(DOMNode node, String... attr) {
		/**
		 * @j2sNative
		 * 
		 *            if (node) for (var i = 0; i < attr.length;) {
		 *             node.style[attr[i++]] = attr[i++]; }
		 * 
		 */
		return node;
	}

	public static DOMNode setSize(DOMNode node, int width, int height) {
		return setStyles(node, "width", width + "px", "height", height + "px");
	}

	public static DOMNode setPositionAbsolute(DOMNode node) {
		return DOMNode.setStyles(node, "position", "absolute");
	}

	public static void setVisible(DOMNode node, boolean visible) {
		setStyles(node, "display", visible ? "block" : "none");
	}

	public static DOMNode setTopLeftAbsolute(DOMNode node, int top, int left) {
		DOMNode.setStyles(node, "top", top + "px");
		DOMNode.setStyles(node, "left", left + "px");
		return DOMNode.setStyles(node, "position", "absolute");
	}

	public static void setCursor(String c, Component comp) {
		ComponentUI ui = (comp == null ? null : ((JSComponent) comp).getUI());
		@SuppressWarnings("unused")
		DOMNode node = (ui == null ? null : ui.getDOMNode());
		/**
		 * @j2sNative
		 * 
		 * if (node == null) {document.body.style.cursor = c} else {  node.style.cursor = c }
		 * 
		 */
	}

	public static DOMNode getImageNode(Image img) {		
		// note that canvas takes precedence over imgNode, because
		// imgNode is a placeholder for the original image, but canvas
		// will be an op-filtered image
		return (/** @j2sNative img._canvas || img._imgNode ||*/ null);
	}

	public static void addHorizontalGap(DOMNode domNode, int gap) {
		DOMNode label = DOMNode.setStyles(DOMNode.createElement("label", null), 
				"letter-spacing", gap + "px", "font-size", "0pt");
		label.appendChild(DOMNode.createTextNode("."));
		domNode.appendChild(label);
	}

	public static AudioClip getAudioElement(String filePath, boolean isLoop) {
		AudioClip clip = (AudioClip) DOMNode.setAttrs(DOMNode.createElement("audio", null), 
				"controls", "true", (isLoop ? "loop" : null), (isLoop ? "true" : null), "src", filePath);
		// alias the actual audio element methods to SwingJS-qualified methods.
		/**
		 * @j2sNative
		 *  clip.play$ = clip.play;
		 *  clip.stop$ = clip.stop;
		 *  clip.loop$ = clip.loop;
		 */
		return clip;
	}

	// static jQuery calls
	
	/**
	 * jQuery height()
	 * 
	 * @param node
	 * @return height
	 */
	public static int getHeight(DOMNode node) {
		return JSUtil.jQuery.$(node).height();
	}

	/**
	 * jQuery width()
	 * 
	 * @param node
	 * @return width
	 */
	public static int getWidth(DOMNode node) {
		return JSUtil.jQuery.$(node).width();
	}

	/**
	 * jQuery remove()
	 * 
	 * Remove this node and return its parent. Automatically removing all events
	 * attached to it.
	 * 
	 * @param node
	 * @return parent or null
	 */
	public static void remove(DOMNode node) {
		if (node != null)		
			JSUtil.jQuery.$(node).remove();
	}
	
	/**
	 * jQuery detach() + append()
	 * 
	 * @param node
	 * @param container
	 * @return parent if container is null, or container if it is not null
	 */
	public static DOMNode transferTo(DOMNode node, DOMNode container) {
		if (node == null)
			return null;
		DOMNode p = getParent(node);
		try {
			JSUtil.jQuery.$(node).detach();
		} catch (Throwable e) {
			// ignore
		}
		 if (container == null)
		 	return p; 
		 JSUtil.jQuery.$(container).append(node);
		return container;
	}

}
