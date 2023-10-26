package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Insets;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentEvent;
import java.awt.event.WindowEvent;
import java.awt.peer.FramePeer;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.LookAndFeel;
import javax.swing.Timer;

import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JSFunction;

/**
 * New! Frame, JFrame, and JInternalFrame embedding on a web page:
 * 
 * 1) In the constructor, set the frame to be undecorated:
 * 
 * 
 * this.setUndecorated(true);
 * 
 * 2) In the constructor, give the frame a name of your choice
 * 
 * this.setName("myframe");
 * 
 * 
 * 3) On the web page somewhere, create a div with id (appletname-name-div)
 * where appletname is the applet name (e.g. "testApplet") and styles
 * position:absolute;left:<nnn>px;top:<nnn>px.
 * 
 * If you wish, you can set the width and height, but that is optional. All four
 * of these values override whatever is given in the constructor.
 * 
 * &lt;div id="testApplet-myframe-div"
 * style="position:absolute;left:100px;top:200px;width:400px;height:300px"
 * &gt;&lt;/div&gt;
 * 
 * That's all there is to it! The frame will not be sizable.
 * 
 * @author hansonr
 *
 */
public class JSFrameUI extends JSWindowUI implements FramePeer, JSComponentUI.Embeddable {

	private static final Insets ZERO_INSETS = new Insets(0, 0, 0, 0);

	// a window with a border and optional menubar and (though not here) min and max
	// buttons

	// Adds a root pane to the JPanel content pane to connect the menubar with the
	// content plane
	// manages the menu bar; would provide min/max buttons to a dialog.
	//
	// for our purposes, a frame will be synonymous with a non-imbedded applet or a
	// dialog.

	protected JFrame frame;
//	private String title;
	private int state;
	private DOMNode closerWrap;
	protected int zModal;

	protected boolean isInternalFrame;

	boolean doEmbed, isHidden;

	private String appletPrefix;

	public JSFrameUI() {
		frameZ += 1000;
		z = frameZ;
		isContainer = true;
		defaultHeight = 500;
		defaultWidth = 500;
		setDoc();
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
			containerNode = frameNode = domNode = newDOMObject("div", id + "_frame");
			if (isDummyFrame) {
				DOMNode.setVisible(domNode, false);
				return domNode;
			}
			int w = c.getWidth();
			int h = c.getHeight();
			if (w == 0)
				w = defaultWidth;
			if (h == 0)
				h = defaultHeight;
			DOMNode.setSize(frameNode, w, h);
			DOMNode.setTopLeftAbsolute(frameNode, 0, 0);
			DOMNode node = (DOMNode) getEmbedded("init");
			if (node != null) {
				embeddingNode = node;
				doEmbed = (DOMNode.getWidth(node) > 0);
				isHidden = !doEmbed;
			}
			setWindowClass();
			if (!frame.isUndecorated()) {
				DOMNode.setStyles(frameNode, "box-shadow", "0px 0px 10px gray", "box-sizing", "content-box");
				titleBarNode = newDOMObject("div", id + "_titlebar");
				DOMNode.setTopLeftAbsolute(titleBarNode, 0, 0);
				DOMNode.setStyles(titleBarNode, "background-color", "#E0E0E0", "height", "20px", "font-size", "14px",
						"font-family", "sans-serif", "font-weight", "bold");

				titleNode = newDOMObject("label", id + "_title");
				DOMNode.setTopLeftAbsolute(titleNode, 0, 0);
				DOMNode.setStyles(titleNode, "background-color", "#E0E0E0", "height", "20px", "overflow", "hidden");

				closerWrap = newDOMObject("div", id + "_closerwrap");
				DOMNode.setTopLeftAbsolute(closerWrap, 0, 0);
				DOMNode.setStyle(closerWrap, "text-align", "right");

				closerNode = newDOMObject("label", id + "_closer", "innerHTML", "X");
				DOMNode.setStyles(closerNode, "width", "20px", "height", "20px", "position", "absolute", "text-align",
						"center", "right", "0px");
				frameNode.appendChild(titleBarNode);
				titleBarNode.appendChild(titleNode);
				titleBarNode.appendChild(closerWrap);
				closerWrap.appendChild(closerNode);
				DOMNode.setStyle(closerNode, "background-color", "#DDD");// strColor);
			}
			bindWindowEvents();
			Insets s = getInsets();
			DOMNode.setTopLeftAbsolute(frameNode, 0, 0);
			DOMNode.setAttrs(frameNode, "width", "" + frame.getWidth() + s.left + s.right, "height",
					"" + frame.getHeight() + s.top + s.bottom);

			addFocusHandler();
		}
		String strColor = toCSSString(c.getBackground());
		DOMNode.setStyle(domNode, "background-color", strColor);
		DOMNode.setStyle(frameNode, "background", strColor);
		// Why did I set background to DDD? 2019-03-15 12:25:57 commit ca0130f819e926a987a1010569a2fcb5c36ced7c
		DOMNode.setStyle(frameNode, "color", toCSSString(c.getForeground()));
		setInnerComponentBounds(width, height);
		setTitle(frame.getTitle());
		if (!isDummyFrame) {
			DOMNode.setVisible(domNode, jc.isVisible());
		}
		return domNode;
	}

	/**
	 * 
	 * @param frame
	 * @param type "name", "node", "init", "dim", or any DOM attribute, such as "id"
	 * @return
	 */
	@Override
	public Object getEmbedded(String type) {
		String name = frame.getName();
		switch (type) {
		case "name":
			return name;
		case "init":
			DOMNode node = (DOMNode) getEmbedded("node");
			if (node == null)
				return null;
			Dimension dim = (Dimension) getEmbedded("dim");
			if (dim.width > 0) {
				frame.setUndecorated(true);
				frame.setLocation(0, 0);
				String resize = DOMNode.getStyle(node, "resize");
				if (resize == "none")
					frame.秘freezeBounds(dim.width, dim.height);
			} else {
				DOMNode.setStyles(node, "position", "relative", "overflow", "hidden");
			}
			return node;
		default:
			if (appletPrefix == null) {
				appletPrefix = DOMNode.getAttr(JSUtil.getHTML5Applet(jc), "_id") + "-";
				if (DOMNode.getEmbedded(appletPrefix + name, "node") == null)
					appletPrefix = "";
			}		
			return DOMNode.getEmbedded(appletPrefix + name, type);
		}
	}

	@Override
	protected boolean isFrameIndependent() {
		return !doEmbed;
	}

	@Override
	public void setZ(int z) {
		if (doEmbed)
			z = 999;
		super.setZ(z);
	}

	@Override
	protected void setDraggableEvents() {
		if (doEmbed || frame.isUndecorated())
			return;
		@SuppressWarnings("unused")
		DOMNode fnode = frameNode;
		JSFunction fGetFrameParent = null;
		/**
		 * @j2sNative var me = this; fGetFrameParent = function(mode, x, y) {
		 * 
		 *            switch(arguments.length) { case 1: if (mode == 501)
		 *            me.selected$(); me.hideMenu$(); return $(fnode).parent(); case 3:
		 *            if (mode == 506) { me.moveFrame$I$I(x, y); return null; } }
		 * 
		 *            return null; }
		 */
		{
			// Java only; just for reference
			selected();
			moveFrame(0, 0);
			hideMenu();
		}

		J2S.setDraggable(titleBarNode, fGetFrameParent);
	}

	/**
	 * Do not change this method name referenced by j2sNative, above
	 */
	protected void selected() {
		// subclassed by JSInternalFrameUI
		((JFrame) jc).toFront();
	}

	/**
	 * Do not change this method name referenced by j2sNative, above
	 */
	/* not private */ void hideMenu() {
		hideMenusAndToolTip();
	}

	/**
	 * Do not change this method name referenced by j2sNative, above
	 * 
	 * @param x
	 * @param y
	 */
	/* not private */ void moveFrame(int x, int y) {
		if (!isInternalFrame) {
			x = Math.max(30 - frame.getWidth(), x);
			y = Math.max(0, y);
		}
		JSPopupMenuUI.closeAllMenus();
		frame.setLocation(x, y);
	}

	public int[] getMoveCoords(int x, int y) {
		return new int[] { x, y };
	}

	public void notifyFrameMoved() {
		// from JavaScript
		this.toFront();
		Toolkit.getEventQueue().postEvent(new ComponentEvent(frame, ComponentEvent.COMPONENT_MOVED));
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		if (target == closerNode && eventType == -1) {
			switch (/** @j2sNative jQueryEvent.type || */
			"") {
			case "click":
			case "pointerup":
			case "mouseup":
				frameCloserAction();
				return HANDLED;
			case "pointerout":
			case "mouseout":
				DOMNode.setStyle(closerNode, "background-color", "#DDD");// toCSSString(c.getBackground()));
				return HANDLED;
			case "pointerenter":
			case "mouseenter":
				DOMNode.setStyle(closerNode, "background-color", "red");
				return HANDLED;
			}
		}
		// note that for a key event this will cause stopPropagation and preventDefault from JQuery
		return NOT_HANDLED;
	}

	protected void frameCloserAction() {
		// We use a timer so that all the focus-related window zindex business is done first, 
		// in case a custom close-option dialog is thrown up.
		Timer t = new Timer(100, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				frame.dispatchEvent(new WindowEvent(frame, WindowEvent.WINDOW_CLOSING));
			}
			
		});
		t.setRepeats(false);
		t.start();
	}

	protected void closeFrame() {
		if (!frame.isUndecorated()) {
			DOMNode tbar = titleBarNode;
			/**
			 * @j2sNative
			 * 
			 * 			J2S.setDraggable(tbar, false);
			 */
			{
				// but "false" here will become Boolean.FALSE
				J2S.setDraggable(tbar, false);
			}
		}
		J2S.unsetMouse(frameNode);
		$(frameNode).remove();
		$(outerNode).remove();
	}

	@Override
	protected void setInnerComponentBounds(int width, int height) {
		DOMNode.setStyles(closerWrap, "text-align", "right", "width", width + "px");
		DOMNode.setStyles(titleNode, "width", (width - 4) + "px", "height", "20px");
	}

	@Override
	public void installUI(JComponent jc) {
		// jc is really JFrame, even though JFrame is not a JComponent
		frame = (JFrame) c;
		isDummyFrame = /**
						 * @j2sNative jc.__CLASS_NAME__ == "javax.swing.SwingUtilities.SharedOwnerFrame"
						 *            ||
						 */
				false;

		frame.addWindowListener(this);
		frame.addComponentListener(this);
		LookAndFeel.installColorsAndFont(jc, "Frame.background", "Frame.foreground", "Frame.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// never called
		closeFrame();
		frame.removeWindowListener(this);
	}

	@Override
	public void setTitle(String title) {
		if (titleNode != null)
			DOMNode.setAttr(titleNode, "innerHTML", title);
	}

	@Override
	public void setMenuBar(Object mb) {
	}

	@Override
	public void setResizable(boolean resizeable) {
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
		Insets i = (isDummyFrame ? null : frame.isUndecorated() ? ZERO_INSETS : jc.getFrameViewer().getInsets());
		//System.out.println("JSFrameUI.getInsets " + id + " "+frame.isUndecorated() + " " + i);
		return i;
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
		if (isModal()) {
			modalBlocked = b;
			if (b) {
				$(body).after(modalNode);
				addClass(modalNode, "swingjs-window"); // so as to slip into z-index ranking
				@SuppressWarnings("unused")
				String sz = DOMNode.getStyle(domNode, "z-index");
				int z = ( /** @j2sNative +sz || */getInheritedZ()) - 1;
				DOMNode.setZ(modalNode, z);
			}
			DOMNode.setVisible(modalNode, b);
		}
		DOMNode.setVisible(domNode, b);
	}

	protected boolean isModal() {
		// see JSDialogUI
		return false;
	}
}
