package swingjs.plaf;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.JSComponent;
import java.awt.Rectangle;
import java.awt.event.MouseEvent;
import java.beans.PropertyVetoException;

import javax.swing.JApplet;
import javax.swing.JFrame;
import javax.swing.JInternalFrame;
import javax.swing.JRootPane;
import javax.swing.RootPaneContainer;

import swingjs.api.js.JSFunction;
import swingjs.JSFrameViewer;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JSInterface;

public class Resizer {

	private JRootPane rootPane;
	private DOMNode resizer, rootNode, rubberBand;
	private JFrame jframe;
	private int offsetx = -4, offsety = -4, minSize = 10;
	private RootPaneContainer rpc;
	@SuppressWarnings("unused")
	private int titleHeight;
	private boolean enabled = true;
	private boolean allowResize = true;

	public Resizer() {
	}

	public Resizer set(JSFrameViewer viewer, RootPaneContainer top) {
		rpc = top;
		rootPane = rpc.getRootPane();
		titleHeight = viewer.getInsets().top; // 20px
		if (viewer.isApplet) {
			rootNode = viewer.getDiv("appletdiv");
		} else {
			jframe = (JFrame) rpc;
			rootNode = ((JSComponentUI) jframe.getUI()).getDOMNode();
		}
		return (rootNode == null ? null : this);
	}

	public void show() {
		if (!allowResize  || !enabled)
			return;
		if (resizer == null) 
			createAndShowResizer();
		else
			JSUtil.jQuery.$(resizer).show();
		setPosition(0, 0);
	}

	public void hide() {
		JSUtil.jQuery.$(resizer).hide();		
	}
	
	public void setMin(int min) {
		minSize = min;
	}
	
	@SuppressWarnings("unused")
	private void createAndShowResizer() {
		String id = rootPane.秘htmlName + "_resizer";
		resizer = DOMNode.createElement("div", id);
		DOMNode.setSize(resizer, 10, 10);
		DOMNode.setStyles(resizer, "background-color", "red", "opacity", "0", "cursor", "nwse-resize");
		JSUtil.jQuery.$(resizer).addClass("swingjs-resizer");
		rubberBand = DOMNode.createElement("div", id + "_rb");
		DOMNode.setStyles(rubberBand, "border", "1px dashed #FF00FF", "z-index", "100000", "position", "absolute",
				"left", "0px", "top", "0px", "display", "none");
		rootNode.appendChild(resizer);
		rootNode.appendChild(rubberBand);
		JSFunction fHandleResizer = null, fHandleDOMResize = null;
		Object me = this;
		/**
		 * @j2sNative
		 * 
		 * 			fHandleResizer =
		 *            function(xyev,type){me.fHandleResizer$I$I$I( xyev.dx,
		 *            xyev.dy,type)};
		 * 
		 */
		{
		}
		// set to track size changes
		JSUtil.J2S.setDraggable(resizer, new JSFunction[] { fHandleResizer });
		JSUtil.jQuery.$(rootNode).resize(fHandleDOMResize);
	}

	public void setPosition(int dw, int dh) {
		Rectangle r = getFrameOffset(dw, dh);
		DOMNode.setTopLeftAbsolute(resizer, r.height + offsety, r.width + offsetx);
		DOMNode.setSize(rubberBand, r.width, r.height);
	}
	
	public DOMNode getDOMNode() {
		return resizer;
	}
	
	/**
	 * 
	 * @param xyev
	 * @param type
	 */
	protected void fHandleResizer(int dx, int dy, int type) {
		if (!enabled || !allowResize)
			return;
		switch (type) {
		case MouseEvent.MOUSE_MOVED:
			break; // TODO - change cursor? Entry/Exit?
		case MouseEvent.MOUSE_PRESSED:
			DOMNode.setStyles(resizer, "background-color", "green");
			DOMNode.setVisible(rubberBand, true);
			JSInterface.setCursor("nwse-resize");
			// set cursor to dragging
			break;
		case MouseEvent.MOUSE_DRAGGED:
			setPosition(dx, dy);
			break;
		case MouseEvent.MOUSE_RELEASED:
			DOMNode.setStyles(resizer, "background-color", "red");
			DOMNode.setVisible(rubberBand, false);
			JSInterface.setCursor("auto");
			fHandleDOMResize(null, dx, dy);
		}
	}

	protected void fHandleDOMResize(Object event, int dw, int dh) {
		Rectangle r;
		if (!enabled)
			return;
		if (event == null) {
			// from above
			r = getFrameOffset(dw, dh);
		} else {
			// from some DOM event
			DOMNode.getCSSRectangle(rootNode, r = new Rectangle());
		}
		if (jframe == null) {
			rootPane.getGraphics().setColor(Color.WHITE);
			rootPane.getGraphics().fillRect(0, 0, r.width, r.height);
			((JApplet) rootPane.getParent()).resizeHTML(r.width, r.height);
		} else {
			jframe.setPreferredSize(new Dimension(r.width, r.height));
			jframe.invalidateTree();
			jframe.repackContainer();
			if (jframe instanceof JInternalFrame) {
				try {
					((JInternalFrame) jframe).setSelected(true);
				} catch (PropertyVetoException e) {
				}
			} else {
				jframe.toFront();
			}
		}
		setPosition(0, 0);
		// Toolkit.getEventQueue().postEvent(new ComponentEvent(f,
		// ComponentEvent.COMPONENT_RESIZED));
	}

  private Rectangle getFrameOffset(int dw, int dh) {
 	 Rectangle r = ((JSComponent) rpc).getBounds();			
			// from mouse release
			if (r.width + dw > minSize)
				r.width += dw;
			if (r.height + dh > minSize)
				r.height += dh;
			return r;
	}

    /**
     * Embedded frames can do this
     * 
     * @param b
     */
    public void setAllowResize(boolean b) {
    	allowResize = b;
    }
    
	public void setEnabled(boolean b) {
		enabled = b;
		if (b)
			show();
		else
			hide();
	}

}
