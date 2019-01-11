package swingjs.plaf;

import javajs.api.JSFunction;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.event.ComponentEvent;
import java.awt.event.WindowEvent;
import java.awt.peer.FramePeer;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.LookAndFeel;
import javax.swing.SwingUtilities;

import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

public class JSFrameUI extends JSWindowUI implements FramePeer {
	
	// a window with a border and optional menubar and (though not here) min and max buttons

	// Adds a root pane to the JPanel content pane to connect the menubar with the content plane
	// manages the menu bar; would provide min/max buttons to a dialog.
	//
	// for our purposes, a frame will be synonymous with a non-imbedded applet or a dialog. 
	
	// Applet:                        xxx_appletinfotablediv   (fixed w&h)
	//                                  /                              \
	//        z 200000           xxx_swingdiv (rootpane, fixed w&h)      \
	//        z 200001           xxx_appletdiv (w,h 100%)           xxx_infotablediv (System.out)
	//        z 200002              xxx_canvas2d   (w,h 100%)
	//        z 200003              xxx_contentLayer  (fixed w&h)  
	//                           xxx_2dappletdiv (w,h 100%; could be used for the glassPane)
	//           
	

	protected JFrame frame;
	private String title;
	private int state;
	private boolean resizeable;
	private DOMNode closerWrap;
	protected boolean isModal;
	protected int zModal;

	protected boolean isInternalFrame;


	public JSFrameUI() {
		frameZ += 1000;
		z = frameZ;
		isContainer = true;
		defaultHeight = 500;
		defaultWidth = 500;
		setDoc();
	}

	
	protected void selected() {
		((JFrame) jc).toFront();
	}
	
	// public void notifyFrameMoved() {
	// Toolkit.getEventQueue().postEvent(new ComponentEvent(frame,
	// ComponentEvent.COMPONENT_MOVED));
	// }

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			// we have to give it some sort of border, or it blends in with the
			// page too much.
			// a Windows applet has a sort of fuzzy shadowy border
			domNode = frameNode = newDOMObject("div", id + "_frame");
			if (isDummyFrame) {
				DOMNode.setStyles(domNode, "display", "hidden");
				return domNode;
			}
			DOMNode.setStyles(frameNode, "box-shadow", "0px 0px 10px gray", "box-sizing", "content-box");
			setWindowClass();
			int w = c.getWidth();
			int h = c.getHeight();
			if (w == 0)
				w = defaultWidth;
			if (h == 0)
				h = defaultHeight;
			DOMNode.setSize(frameNode, w, h);
			DOMNode.setTopLeftAbsolute(frameNode, 0, 0);
			setJ2sMouseHandler();
			titleBarNode = newDOMObject("div", id + "_titlebar");
			DOMNode.setTopLeftAbsolute(titleBarNode, 0, 0);
			DOMNode.setStyles(titleBarNode, "background-color", "#E0E0E0", "height", "20px", "font-size", "14px",
					"font-family", "sans-serif", "font-weight", "bold"// ,
			// "border-style", "solid",
			// "border-width", "1px"
			);

			titleNode = newDOMObject("label", id + "_title");
			DOMNode.setTopLeftAbsolute(titleNode, 2, 4);
			DOMNode.setStyles(titleNode, "height", "20px", "overflow", "hidden");

			closerWrap = newDOMObject("div", id + "_closerwrap");
			DOMNode.setTopLeftAbsolute(closerWrap, 0, 0);
			DOMNode.setStyles(closerWrap, "text-align", "right");

			closerNode = newDOMObject("label", id + "_closer", "innerHTML", "X");
			DOMNode.setStyles(closerNode, "width", "20px", "height", "20px", "position", "absolute", "text-align",
					"center", "right", "0px");
			bindJQueryEvents(closerNode, "click mouseenter mouseout", -1);
			frameNode.appendChild(titleBarNode);
			if (isModal) {
				modalNode = DOMNode.createElement("div", id + "_modaldiv");
				Dimension screen = Toolkit.getDefaultToolkit().getScreenSize();
				DOMNode.setStyles(modalNode, "background", toCSSString(new Color(100, 100, 100, 100)));
				DOMNode.setTopLeftAbsolute(modalNode, 0, 0);
				DOMNode.setSize(modalNode, screen.width, screen.height);
			}
			// we have to wait until the frame is wrapped.
			@SuppressWarnings("unused")
			DOMNode fnode = frameNode;
			
			JSFunction fGetFrameParent = null; 
			/**
			 * @j2sNative var me = this; 
			 * fGetFrameParent = function(mode, x, y) {
			 * 		switch(arguments.length) {
			 * 		case 1:
			 *  	         if (mode == 501)
			 *      	        me.selected$();  
			 *          	 return $(fnode).parent();
			 *      case 3:
			 *      		 if (mode == 506) {
			 *      			me.moveFrame$I$I(x,y);
			 *      			return null;
			 *               }
			 *     }
			 *     return null;
			 * }
			 */
			
			J2S.setDraggable(titleBarNode, fGetFrameParent);
			titleBarNode.appendChild(titleNode);
			titleBarNode.appendChild(closerWrap);
			closerWrap.appendChild(closerNode);
			Insets s = getInsets();
			DOMNode.setTopLeftAbsolute(frameNode, 0, 0);
			DOMNode.setAttrs(frameNode, "width", "" + frame.getWidth() + s.left + s.right, "height",
					"" + frame.getHeight() + s.top + s.bottom);
			containerNode = frameNode;
		}
		String strColor = toCSSString(c.getBackground());
		DOMNode.setStyles(domNode, "background-color", strColor);
		DOMNode.setStyles(frameNode, "background", strColor);
		DOMNode.setStyles(frameNode, "color", toCSSString(c.getForeground()));
		DOMNode.setStyles(closerNode, "background-color", strColor);
		setInnerComponentBounds(width, height);
		setTitle(frame.getTitle());
		return domNode;
	}

	void moveFrame(int x, int y) {
		frame.setLocation(x, y);
	}
	
	public int[] getMoveCoords(int x, int y) {
		return new int[] {x, y};
	}

	public void notifyFrameMoved() {
		// from JavaScript
		this.toFront();
		Toolkit.getEventQueue().postEvent(
				new ComponentEvent(frame, ComponentEvent.COMPONENT_MOVED));
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		if (target == closerNode && eventType == -1) {
			switch (/** @j2sNative jQueryEvent.type || */"") {
			case "click":
				DOMNode tbar = titleBarNode;
				J2S.setDraggable(tbar, false);
				frameCloserAction();
				return HANDLED;
			case "mouseout":
				DOMNode.setStyles(closerNode, "background-color", toCSSString(c.getBackground()));
				return HANDLED;
			case "mouseenter":
				DOMNode.setStyles(closerNode, "background-color", "red");
				return HANDLED;
			}
		}
		return NOT_HANDLED;
	}

	
	protected void frameCloserAction() {
  		frame.dispatchEvent(new WindowEvent(frame, WindowEvent.WINDOW_CLOSING));
	}

	protected void closeFrame() {
		J2S.unsetMouse(frameNode);
		$(frameNode).remove();
		$(outerNode).remove();
	}

	@Override
	protected void setInnerComponentBounds(int width, int height) {
		DOMNode.setStyles(closerWrap, "text-align", "right", "width", width + "px");
		DOMNode.setStyles(titleNode, "width", width + "px", "height", "20px");
	}
	
	@Override
	public void installUI(JComponent jc) {
		super.installUI(jc); 
		// jc is really JFrame, even though JFrame is not a JComponent
		frame = (JFrame) c;	
		isDummyFrame = /** @j2sNative jc.__CLASS_NAME__ == "javax.swing.SwingUtilities.SharedOwnerFrame" || */false;
		
		 LookAndFeel.installColors(jc,
		 "Frame.background",
		 "Frame.foreground");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// never called
		closeFrame();
	}


	@Override
	public void setTitle(String title) {
		this.title = title;
		if (titleNode != null)
			DOMNode.setAttr(titleNode, "innerHTML", title);
	}

	@Override
	public void setMenuBar(Object mb) {
	}

	@Override
	public void setResizable(boolean resizeable) {
		this.resizeable = resizeable;
	}

	@Override
	public void setState(int state) {
		this.state = state;
	}

	@Override
	public int getState() {
		return state;
	}

	@Override
	public void setMaximizedBounds(Rectangle bounds) {
		// TODO Auto-generated method stub
		
	}

	private Rectangle bounds;
	@Override
	public void setBoundsPrivate(int x, int y, int width, int height) {
	// only for embedded frames -- not supported in SwingJS
//		// includes frame insets or not?
//		// do we need to subtract them? Add them?
//		// is the width and height of a frame a measure of the internal contents pane?
		bounds = new Rectangle(x, y, width, height);
//		HTML5Canvas canvas = f.frameViewer.newCanvas();
//		if (contentNode != null)
//			DOMNode.remove(DOMNode.firstChild(contentNode));
//		contentNode.appendChild(canvas);
	}

	@Override
	public Rectangle getBoundsPrivate() {
		// only for embedded frames -- not supported in SwingJS
		return bounds;
	}

	@Override
	public Insets getInsets() {
		return (isDummyFrame ? null : jc.getFrameViewer().getInsets());
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		if (e.getPropertyName().equals("resizable")) {
			boolean resizable = ((Boolean) e.getNewValue()).booleanValue();
			if (jc.getFrameViewer().isResizable() == resizable)
				return;
			jc.getFrameViewer().setResizable(resizable);
		}
		super.propertyChange(e);
	}


	@Override
	public void setVisible(boolean b) {
		if (isDummyFrame)
			b = false;
	  super.setVisible(b);
	  if (isModal) {
		  if (b) {
			  $(body).after(modalNode);
			  $(modalNode).addClass("swingjs-window"); // so as to slip into z-index ranking
			  String sz = DOMNode.getStyle(domNode, "z-index");
			  int z = (( /** @j2sNative +sz || */getZIndex(null))) - 1;
			  DOMNode.setStyles(modalNode, "z-index", "" + z);
		  }
		  DOMNode.setVisible(modalNode, b);
	  }
		  
	}

}
