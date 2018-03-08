package swingjs.plaf;

import java.awt.event.MouseEvent;

import javajs.api.JSFunction;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.JSComponent;
import java.awt.Rectangle;

import javax.swing.JApplet;
import javax.swing.JFrame;
import javax.swing.JRootPane;
import javax.swing.RootPaneContainer;
import swingjs.JSFrameViewer;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;

public class Resizer {

	private JRootPane rootPane;
	private DOMNode resizer, rootNode, rubberBand;
	private JFrame jframe;
	private int offsetx = -4, offsety = -4, minSize = 10;
	private RootPaneContainer rpc;
	@SuppressWarnings("unused")
	private int titleHeight;
	private boolean enabled = true;

	public Resizer() {
	}

	public Resizer set(JSFrameViewer viewer) {
		rpc = (RootPaneContainer) viewer.top;
		rootPane = rpc.getRootPane();
		titleHeight = viewer.getInsets().top; // 20px
		if (viewer.isApplet) {
			rootNode = viewer.getDiv("appletdiv");
		} else {
			jframe = (JFrame) rpc;
			rootNode = ((JSComponentUI) jframe.getUI()).domNode;
		}
		return (rootNode == null ? null : this);
	}

	public void show() {
		if (resizer == null) 
			createAndShowResizer();
		else
			$(resizer).show();
		setPosition(0, 0);
	}

	public void hide() {
		$(resizer).hide();		
	}
	
	public void setMin(int min) {
		minSize = min;
	}
	
	@SuppressWarnings("unused")
	private void createAndShowResizer() {
		String id = rootPane.htmlName + "_resizer";
		resizer = DOMNode.createElement("div", id);
		DOMNode.setSize(resizer, 10, 10);
		DOMNode.setStyles(resizer, 
				"background-color", "red", 
				"opacity", "0", 
				"cursor", "nwse-resize"
		);
		$(resizer).addClass("swingjs-resizer");
		rubberBand = DOMNode.createElement("div", id + "_rb");
		DOMNode.setStyles(rubberBand, 
				"border", "1px dashed #FF00FF",
				"z-index", "100000",
				"position", "absolute", 
				"left", "0px", 
				"top", "0px",
				"display", "none");
		rootNode.appendChild(resizer);
		rootNode.appendChild(rubberBand);
		JSFunction fHandleResizer = null, fHandleDOMResize = null;
		Object me = this;
		/**
		 * @j2sNative
		 * 
		 *            fHandleResizer = function(xyev,type){me.fHandleResizer$I$I$I(
		 *            xyev.dx, xyev.dy,type)}; 
		 * 
		 */
		{
		}
		// set to track size changes
		JSUtil.J2S._setDraggable(resizer, new JSFunction[] { fHandleResizer });
		$(rootNode).resize(fHandleDOMResize);
	}

	public void setPosition(int dw, int dh) {
		Rectangle r = getFrameOffset(dw, dh);
		DOMNode.setPositionAbsolute(resizer, r.height + offsety, r.width + offsetx);
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
		if (!enabled)
			return;
		switch (type) {
		case MouseEvent.MOUSE_PRESSED:
			DOMNode.setStyles(resizer, "background-color", "green");
			DOMNode.setVisible(rubberBand, true);
			DOMNode.setCursor("nwse-resize");
			// set cursor to dragging
			break;
		case MouseEvent.MOUSE_DRAGGED:
			setPosition(dx, dy);
			break;
		case MouseEvent.MOUSE_RELEASED:
			DOMNode.setStyles(resizer, "background-color", "red");
			DOMNode.setVisible(rubberBand, false);
			DOMNode.setCursor("auto");
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
			DOMNode.getRectangle(rootNode, r = new Rectangle());
		}
		if (jframe == null) {
			rootPane.getGraphics().setColor(Color.WHITE);
			rootPane.getGraphics().fillRect(0, 0, r.width, r.height);
			((JApplet) rootPane.getParent()).resize(r.width, r.height);
		} else {
			jframe.setPreferredSize(new Dimension(r.width, r.height));
			jframe.invalidate();
			jframe.repackContainer();
			jframe.toFront();
		}
		setPosition(0, 0);
		// Toolkit.getEventQueue().postEvent(new ComponentEvent(f,
		// ComponentEvent.COMPONENT_RESIZED));
	}

	private JQueryObject $(DOMNode node) {
		return JSUtil.getJQuery().$(node);
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

	public void setEnabled(boolean b) {
		enabled  = b;
	}

}
