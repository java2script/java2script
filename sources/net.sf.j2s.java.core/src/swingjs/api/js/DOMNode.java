package swingjs.api.js;

import java.awt.Dimension;
import java.awt.Rectangle;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * A mix of direct DOM calls on DOM nodes and convenience methods to do that.
 * 
 * NOTE: DO NOT OVERLOAD THESE METHODS, as this package will not be qualified.
 * 
 * @author hansonr
 *
 */
public interface DOMNode {
	
	
	public default void x(){
	  Consumer<String> x = new Consumer<String>(){

		@Override
		public void accept(String t) {
			// TODO Auto-generated method stub
			
		}
		  
	  };
	}
	
	/**
	 * avoiding GCC inability to handle .finally and .catch
	 * 
	 * @j2sNative
	 * 
	 * 		eval("Promise.prototype.$then = function(resolve,reject){return this.then(function(value) {return resolve ? resolve.apply$O(value) : value},function(reason){return reject ? reject.apply$O(reason) : reason})};");
	 *      eval("Promise.prototype.$finally = function(r){this.finally(function(){r.run$()})};");
	 *      eval("Promise.prototype.$catch = function(err){this.catch(function(){err.accept$S('' + err)})};");
	 */

	public interface Promise {
		public Promise then(JSFunction resolve, JSFunction reject);
		public Promise $then(Function<Object, Object> resolve, Function<Object, Object> reject);
		public Promise $finally(Runnable whenDone);
		public Promise $catch(Consumer<String> onRejected);
	}

	public static JQuery jQuery = /** @j2sNative jQuery.$ || (jQuery.$ = jQuery) || */null;

	// "abstract" in the sense that these are the exact calls to JavaScript
	

	public void addEventListener(String event, Object listener);
	public void removeEventListener(String event);
	public void removeEventListener(String event, Object listener);



	public String[] getAttributeNames();

	public String getAttribute(String name);

	public void setAttribute(String attr, String val);

	public void appendChild(DOMNode node);
	
	public void prepend(DOMNode node);
	
	public void insertBefore(DOMNode node, DOMNode refNode);
	
	public DOMNode removeChild(DOMNode node);

	public void focus();
	public boolean hasFocus();
	public void blur();

	public DOMNode removeAttribute(String attr);
	
	public void setSelectionRange(int start, int end, String direction);

	public Rectangle getBoundingClientRect();
	
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

	public static DOMNode getElement(String id) {
		return (/**  @j2sNative  document.getElementById(id) ||*/ null);
	}

	public static DOMNode createTextNode(String text) {
		return (/** @j2sNative document.createTextNode(text) || */ null); 
	}

	public static DOMNode getParent(DOMNode node) {
		return (/**  @j2sNative  node.parentNode ||*/ null);
	}
	
	public static DOMNode getPreviousSibling(DOMNode node) {
		return (/**  @j2sNative  node.previousSibling ||*/ null);
	}
	
	public static DOMNode firstChild(DOMNode node) {
		return 	(/**  @j2sNative node.firstChild ||*/ null);
	}

	public static DOMNode lastChild(DOMNode node) {
		return 	(/**  @j2sNative node.lastChild ||*/ null);
	}

	public static DOMNode setZ(DOMNode node, int z) {
		return setStyle(node, "z-index", "" + z);
	}

	public static Object getAttr(Object node, String attr) {
		/**
		 * @j2sNative
		 * 
		 * if (!node)
		 *   return null;
		 * var a = node[attr];
		 * return (typeof a == "undefined" ? null : a); 
		 */
		{
		return null;
		}
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
		 * 			attr && (node[attr] = (val == "秘TRUE" ? true : val == "秘FALSE" ? false : val));
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
		 *              C$.setAttr(node, attr[i++],attr[i++]);
		 *            }
		 */
		return node;
	}

	public static DOMNode setStyle(DOMNode node, String attr, String val) {
		/**
		 * @j2sNative
		 * 
		 *            node && (node.style[attr] = val);
		 * 
		 */
		return node;
	}

	public static DOMNode setStyles(DOMNode node, String... av) {
		/**
		 * @j2sNative
		 * 
if (node)for (var i = 0, n = av.length; i < n;) {
	var k = av[i++], v = av[i++];
	node.style[k] != v && (node.style[k] = v);
}
		 * 
		 */
		return node;
	}

	public static DOMNode setSize(DOMNode node, int width, int height) {
		return setStyles(node, "width", width + "px", "height", height + "px");
	}

	public static DOMNode setPositionAbsolute(DOMNode node) {
		return DOMNode.setStyle(node, "position", "absolute");
	}

	public static void setVisible(DOMNode node, boolean visible) {
		setStyle(node, "display", visible ? "block" : "none");
	}

	public static DOMNode setTopLeftAbsolute(DOMNode node, int top, int left) {
		return DOMNode.setStyles(node, "top", top + "px", "left", left + "px", "position", "absolute");
	}

	public static void addHorizontalGap(DOMNode domNode, int gap) {
		DOMNode label = DOMNode.setStyles(DOMNode.createElement("label", null), 
				"letter-spacing", gap + "px", "font-size", "0pt");
		label.appendChild(DOMNode.createTextNode("."));
		domNode.appendChild(label);
	}

	public static void appendChildSafely(DOMNode parent, DOMNode node) {
		/**
		 * @j2sNative
		 * if (!parent || node.parentElement == parent)
		 *   return;
		 */
		parent.appendChild(node);
	}
	
	// static jQuery calls
	
	/**
	 * jQuery height()
	 * 
	 * @param node
	 * @return height
	 */
	public static int getHeight(DOMNode node) {
		return jQuery.$(node).height();
	}

	/**
	 * jQuery width()
	 * 
	 * @param node
	 * @return width
	 */
	public static int getWidth(DOMNode node) {
		return jQuery.$(node).width();
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
	public static void dispose(DOMNode node) {
		if (node != null)		
			jQuery.$(node).remove();
	}

	/**
	 * Just remove the node, keeping its events and data 
	 * @param node
	 */
	public static void remove(DOMNode node) {
		
		// NOTE: IE does not have node.remove()
		
		DOMNode p = getParent(node);
		if (p != null)
			p.removeChild(node);
	}

	/**
	 * just detaches all the nodes; doesn't remove their listeners
	 * @param node
	 */
	public static void detachAll(DOMNode node) {
		/**
		 * @j2sNative
		 *  if(node)
		 *    while(node.lastChild)
		 *  	node.removeChild(node.lastChild);
		 */
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
			if (p != null)
				jQuery.$(node).detach();
		} catch (Throwable e) {
			// ignore
		}
		 if (container == null)
		 	return p; 
		 jQuery.$(container).append(node);
		return container;
	}

	public static Object getEmbedded(String name, String type) {
		DOMNode node = DOMNode.getElement(name + "-div");
		if (node == null)
			return null;
		switch (type) {
		case "node":
			return node;
		case "dim":
			return new Dimension(DOMNode.getWidth(node), DOMNode.getHeight(node));
		default:
			return DOMNode.getAttr(node, type);
		}
	}

}
