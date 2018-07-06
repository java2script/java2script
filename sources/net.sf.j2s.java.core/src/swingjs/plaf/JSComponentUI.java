package swingjs.plaf;

import java.awt.AWTEvent;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.Insets;
import java.awt.JSComponent;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.dnd.DropTarget;
import java.awt.dnd.peer.DropTargetPeer;
import java.awt.event.FocusEvent;
import java.awt.event.PaintEvent;
import java.awt.image.ColorModel;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.image.VolatileImage;
import java.awt.peer.ContainerPeer;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.EventObject;

import javax.swing.AbstractButton;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JTable;
import javax.swing.SwingConstants;
import javax.swing.UIManager;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.event.MouseInputListener;
import javax.swing.plaf.ComponentUI;
import javax.swing.plaf.UIResource;

import javajs.api.JSFunction;
import javajs.util.PT;
import sun.awt.CausedFocusEvent.Cause;
import swingjs.JSGraphics2D;
import swingjs.JSToolkit;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Applet;
import swingjs.api.js.JQueryObject;

/**
 * The JSComponentUI subclasses are where all the detailed HTML5 implementation
 * is carried out. These subclasses mirror the subclasses found in the actual
 * javax.swing.plaf but have an important difference in that that effectively
 * act as both the UI (a single implementation for a given AppContext in Swing)
 * and a peer (one implementation per component).
 * 
 * So here we store both the constants for the HTML5 "LookAndFeel" as well as
 * HTML5 DOM objects (aka DOMNode) that really are on the page.
 * 
 * Essentially, at least for now, we are not implementing the HTML5LookAndFeel
 * as such. We'll see how that goes.
 * 
 * MOUSE EVENT HANDLING
 * 
 * In SwingJS, the domBtn DOM element will be given the "data-component"
 * attribute pointing to its corresponding AWT component.
 * 
 * A mouse action starts in j2sApplet.js as jQuery events, where it is processed
 * and then passed to JSFrameViewer's JSMouse object.
 * 
 * In JSMouse the event is converted to a java.awt.event.MouseEvent, with the
 * jQuery event saved as event.bdata[].jqevent. This standard MouseEvent is then
 * posted just like a "real Java" event using
 * Toolkit.getEventQueue().postEvent(e), thus giving it its own "thread."
 * 
 * The event is dispatched by java.awt.LightweightDispatcher (in
 * Container.java), where the "nativeContainer" for this window (JApplet,
 * JFrame, JWindow, JDialog, or JPopupMenu) is identified. Java has to search
 * the native container for the right X,Y coordinate for this control, but in
 * SwingJS we already know the control that was clicked. We can find that from
 * bdata.jqevent.target["data-component"]
 * 
 * Some UIs (JSComboBoxUI, JSFrameUI, and JSTextUI) set
 * jqevent.target["data-ui"] to point to themselves. This allows the control to
 * bypass the Java dispatch system entirely and just come here for processing.
 * This method is used for specific operations, including JFrame closing,
 * JComboBox selection, and JSText action handling. This connection is set up in
 * JSComponentUI.setDataUI() and handled by overriding
 * JSComponentUI.handleJSEvent().
 * 
 * Finally, some UIs (JSSliderUI and JSPopupMenuUI) set up jQueryEvents that
 * call back to themselves or handle some internal event processing themselves.
 * 
 * 
 * @see java.awt.LightweightDispatcher (in Container.js)
 * 
 * @author Bob Hanson
 * 
 */
public class JSComponentUI extends ComponentUI
		implements ContainerPeer, JSEventHandler, PropertyChangeListener, ChangeListener, DropTargetPeer {

	private static final Color rootPaneColor = new Color(238, 238, 238); // EE
																			// EE
																			// EE;
																			// look
																			// and
																			// feel
																			// "control"

	/**
	 * provides a unique id for any component; set on instantiation
	 */
	protected static int incr;

	/**
	 * Set this during run time using swingjs.plaf.JSComponentUI.borderTest =
	 * true to debug alignments
	 */
	private static boolean borderTest;

	/**
	 * Derived from swingjs.JSToolkit.debugger. Set this during run time using
	 * swingjs.plaf.JSComponentUI.debugger = true to give detailed debugging
	 * messages
	 */
	protected static boolean debugging;

	/**
	 * a unique id
	 */
	protected String id;

	/**
	 * the associated Component; for which this is c.ui
	 * 
	 */
	protected JSComponent c;

	/**
	 * the associated JComponent; for which this is c.ui
	 * 
	 */
	protected JComponent jc;

	/**
	 * TableCellRenderers will not have parents; here we point to the table so 
	 * that we can send the coordinates to the retrieve the row and cell
	 *  
	 */
	protected  JComponent targetParent;
	
	public JComponent getTargetParent() {
		return targetParent;
	}

	//MouseInputListener mouseInputListener;
	

	/**
	 * The outermost div holding a component -- left, top, and for a container
	 * width and height
	 * 
	 * Note that all controls have an associated outerNode div. Specifically,
	 * menu items will be surrounded by an li element, not a div.
	 * 
	 * This must be set up here, nowhere else.
	 * 
	 */
	protected DOMNode outerNode;

	/**
	 * inner node for JButtonUI that needs to be cleared prior to calculating
	 * preferred size
	 * 
	 */
	protected DOMNode innerNode;

	/**
	 * the main HTML5 element for the component, possibly containing others,
	 * such as radio button with its label.
	 * 
	 */
	public DOMNode domNode;

	/**
	 * An inner div that allows vertical centering for a JLabel or
	 * AbstractButton
	 */
	protected DOMNode centeringNode;

	/**
	 * An icon image -- non-null means we do have an icon
	 * 
	 */
	protected DOMNode imageNode;

	/**
	 * for SplitPaneDivider
	 * 
	 */
	protected boolean draggable;

	@Override
	public void setDraggable(JSFunction f) {
		// SplitPaneDivider
		draggable = true; // never actually used
		JSUtil.J2S._setDraggable(updateDOMNode(), f);
	}

	/**
	 * The HTML5 input element being pressed, if the control 
	 * is a radio or checkbox button.
	 * 
	 */
	protected DOMNode radioBtn;

	/**
	 * the "FOR" label for a radio button
	 * 
	 */
	protected DOMNode btnLabel; 

	/**
	 * a component or subcomponent that can be enabled/disabled
	 */
	protected DOMNode enableNode;

	/**
	 * a component or subcomponent that can be enabled/disabled
	 */
	protected DOMNode[] enableNodes;

	/**
	 * the part of a component that can hold an icon
	 */
	protected DOMNode iconNode;

	/**
	 * the part of a component that can hold text
	 */
	protected DOMNode textNode;

	/**
	 * "left" "right" "center" if defined
	 */
	protected String textAlign;

	/**
	 * the subcomponent with the value field
	 */
	protected DOMNode valueNode;

	/**
	 * a component that is being scrolled by a JScrollPane
	 */
	protected DOMNode scrollNode;

	/**
	 * Labels with icons will have this
	 */
	protected int iconHeight;

	/**
	 * a component that is focusable
	 */
	protected DOMNode focusNode;

	/**
	 * DOM components pre-defined (JScrollPane)
	 * 
	 */
	protected Component[] children;

	/**
	 * a numerical reference for an ID
	 */
	protected int num;

	// /**
	// * a flag to indicate that it is not visible, but not according to Java
	// */
	// private boolean zeroWidth;

	/**
	 * indicates that in a toolbar, this component should use its preferred size
	 * for min and max
	 * 
	 */

	protected boolean isToolbarFixed = true;

	/**
	 * indicates that we need a new outerNode
	 * 
	 */
	protected boolean isTainted = true;

	/**
	 * prevents premature visualization
	 * 
	 */
	protected boolean boundsSet = false;

	/**
	 * Indicates that we do not need an outerNode and that we should be applying
	 * any positioning to the node itself. All menu items will have this set
	 * true.
	 */

	protected boolean isMenuItem = false;

	/**
	 * Indicates that we do not want to updateDOMNode too early.
	 */

	protected boolean isMenu = false;

	protected int x, y;

	/**
	 * preferred dimension set by user
	 * 
	 */
	protected Dimension preferredSize;

	/**
	 * panels
	 * 
	 */
	protected boolean isContainer, isWindow, isRootPane, isContentPane;

	/**
	 * linked nodes of this class
	 * 
	 */
	protected JSComponentUI parent;

	String currentText;

	protected ImageIcon currentIcon;

	protected int currentGap = Integer.MAX_VALUE;

	/**
	 * the scroller for a text area
	 */
	protected JSScrollPaneUI scrollPaneUI;

	/**
	 * uiClassID for this component
	 */
	protected String classID;

	/**
	 * initial frameZ
	 * 
	 */
	protected static int frameZ = 19000;

	protected DOMNode body;
	private DOMNode document;
	protected HTML5Applet applet; // used in getting z value, setting frame
									// mouse
									// actions

	protected boolean needPreferred;

	protected int width;
	protected int height;

	protected DOMNode containerNode;

	public boolean isNull;

	private DOMNode waitImage;

	private boolean canAlignText;
	private boolean canAlignIcon;

	/**
	 * set false for tool tip or other non-label object that has text
	 * 
	 */
	protected boolean allowTextAlignment = true;

	public JSComponentUI() {
		setDoc();
	}

	protected void setDoc() {
		/**
		 * @j2sNative
		 * 
		 * 			this.document = document; this.body = document.body;
		 * 
		 * 
		 */
		{
		}
		debugging = swingjs.JSUtil.debugging;
	}

	/**
	 * installUI is called prior to completion of UI creation, guaranteeing that
	 * this.c and this.jc have been set up and well before any call to
	 * this.updateDOMNode.
	 * 
	 * Subclasses should not implement this method; use installUIImpl() instead
	 * 
	 */
	@Override
	public void installJS() {
		/**
		 * @j2sNative
		 * 
		 * 			this.c.addChangeListener$javax_swing_event_ChangeListener
		 *            &&
		 *            this.c.addChangeListener$javax_swing_event_ChangeListener(this);
		 */
		{
		}
		c.addPropertyChangeListener(this);
	}

	/**
	 * Called upon disposal of Window, JPopupMenu, and JComponent.
	 * 
	 * Subclasses should not implement this method; use uninstallUIImpl()
	 * instead
	 * 
	 */
	@Override
	public void uninstallJS() {

		// window closing will fire this with c == null

		/**
		 * @j2sNative
		 * 
		 * 			this.c &&
		 *            this.c.removeChangeListener$javax_swing_event_ChangeListener
		 *            &&
		 *            this.c.removeChangeListener$javax_swing_event_ChangeListener(this);
		 *            this.c &&
		 *            this.c.removePropertyChangeListener$java_beans_PropertyChangeListener(this);
		 */
		{
		}
		if (outerNode != null) {
			DOMNode.remove(outerNode);
			outerNode = null;
		}
	}

	protected JQueryObject $(Object node) {
		return JSUtil.getJQuery().$(node);
	}

	public JSComponentUI set(JComponent target) {
		// note that in JavaScript, in certain cases
		// (JFrame, JWindow, JDialog)
		// target will not be a JComponent,
		// but it will always be a JSComponent, and
		// we do not care if it is not a JComponent.
		c = target;
		jc = (JComponent) c;
		applet = JSToolkit.getHTML5Applet(c);
		newID(false);
		installUI(target); // need to do this immediately, not later
		installJS();
		if (needPreferred)
			getHTMLSize();
		return this;
	}

	protected void newID(boolean forceNew) {
		classID = c.getUIClassID();
		if (id == null || forceNew) {
			num = ++incr;
			id = c.getHTMLName(classID) + "_" + num;
		}
	}

	public void reInit() {
		setTainted();
		domNode = null;
		newID(true);
	}

	// ////////////// user event handling ///////////////////

	/**
	 * When a user clicks a component in SwingJS, jQuery catches it, and a
	 * message is sent to javax.swing.LightweightDispatcher (in Component.js) to
	 * be processed. If this were actual Java, we would have to determine if a
	 * component's button was clicked by running through all the buttons on the
	 * component's "native container" and checking whether the click was within
	 * the component's boundaries.
	 * 
	 * By setting the data-component attribute of a DOM element, we are
	 * indicating to the LightweightDispatcher that we already know what button
	 * was clicked; it is not necessary to check x and y for that. This ensures
	 * perfect correspondence between a clicked button and its handling by
	 * SwingJS.
	 * 
	 * The action will be handled by a standard Java MouseListener
	 * 
	 * @param button
	 */
	protected void setDataComponent(DOMNode button) {
		DOMNode.setAttr(button, "data-component", c);
	}

	/**
	 * Indicate to J2S to completely ignore all mouse events for this control.
	 * It will be handled by the control directly using a jQuery callback that
	 * is generated by updateDOMNode. Used by JSComboBoxUI and JSSliderUI.
	 * 
	 * @param node
	 */
	protected void ignoreAllMouseEvents(DOMNode node) {
		$(node).addClass("swingjs-ui");
	}

	/**
	 * J2S mouse event handling (in j2sApplet.js) will look for the data-ui
	 * attribute of a jQuery event target and, if found, reroute the event to
	 * handleJSEvent, bypassing the standard LightweightDispatcher business.
	 * 
	 * JSComboBoxUI, JSFrameUI, and JSTextUI set jqevent.target["data-ui"] to
	 * point to themselves. This allows the control to bypass the Java dispatch
	 * system entirely and just come here for processing. This method is used
	 * for specific operations, including JFrame closing, JComboBox selection,
	 * and JSText action handling so that those can be handled specially.
	 * 
	 * This connection is set up in JSComponentUI.setDataUI() and handled by
	 * overriding JSComponentUI.handleJSEvent().
	 * 
	 * @param node
	 */
	protected void setDataUI(DOMNode node) {
		DOMNode.setAttr(node, "data-ui", this);
	}

	/**
	 * handle an event set up by adding the data-ui attribute to a DOM node.
	 * 
	 * @param target
	 *            a DOMNode
	 * @param eventType
	 *            a MouseEvent id, including 501, 502, 503, or 506 (pressed,
	 *            released, moved, and dragged, respectively)
	 * @param jQueryEvent
	 * @return false to prevent the default process
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// System.out.println(id + " handling event " + eventType +
		// jQueryEvent);
		return true;
	}

	/**
	 * Used by JSFrameUI to indicate that it is to be the "currentTarget" for
	 * mouse clicks that target one of its buttons. The DOM attributes applet
	 * and _frameViewer will be set for the node, making it consistent with
	 * handling for Jmol's applet canvas element.
	 * 
	 * @param node
	 * @param isFrame
	 */
	protected void setJ2sMouseHandler(DOMNode frameNode) {
		DOMNode.setAttrs(frameNode, "applet", applet, "_frameViewer", jc.getFrameViewer());
		JSUtil.J2S._jsSetMouse(frameNode, true);
	}

	public static JSComponentUI focusedUI;

	JSComponentUI getFocusedUI() {
		return focusedUI;
	}

	/**
	 * Add the $().focus() and $().blur() events to a DOM button
	 * 
	 */
	@SuppressWarnings("unused")
	protected void addJQueryFocusCallbacks() {
		JQueryObject node = $(focusNode);
		Object me = this;

		/**
		 * @j2sNative
		 * 
		 * 			node.focus(function() {me.notifyFocus$Z(true)});
		 *            node.blur(function() {me.notifyFocus$Z(false)});
		 */
		{
		}
	}

	/**
	 * Allows mouse and keyboard handling via an overridden method
	 * 
	 * this.handleJSEvent(node, eventID, jsEvent)
	 * 
	 * j2sApplet will require node["data-ui"] and, in the case of a mouse event,
	 * node["swingjs-ui"] in order to ignore handling the event and allow this
	 * method to work.
	 * 
	 * 
	 * @param node
	 *            the JavaScript element that is being triggered
	 * @param eventList
	 *            one or more JavaScript event names to pass, separated by space
	 * @param eventID
	 *            an integer event type to return; can be anything, but
	 *            Event.XXXX is recommended
	 * @param andSetCSS
	 *            TODO
	 */
	protected void bindJSEvents(DOMNode node, String eventList, int eventID, boolean andSetCSS) {
		JSFunction f = null;
		@SuppressWarnings("unused")
		JSEventHandler me = this;

		if (andSetCSS) {
			setDataUI(node);
			ignoreAllMouseEvents(node);
		}

		/**
		 * @j2sNative
		 * 
		 * 			f = function(event) { me.handleJSEvent$O$I$O(node,
		 *            eventID, event) }
		 */
		{
			handleJSEvent(null, 0, null); // Eclipse reference only; not in
											// JavaScript
		}
		$(node).bind(eventList, f);
	}

	/**
	 * Set the node to accept key events and possibly focusout
	 * 
	 * @param node
	 * @param andFocusOut
	 */
	protected void bindJSKeyEvents(DOMNode node, boolean andFocusOut) {
		setDataUI(node);
		bindJSEvents(node, "keydown keypress keyup" + (andFocusOut ? " focusout" : ""), Event.KEY_PRESS, false);
		if (andFocusOut)
			addJQueryFocusCallbacks();
	}

	/**
	 * Cause a new event to be scheduled for the rebuilding of this Swing
	 * component's internal DOM structure using updateDOMNode.
	 * 
	 * For example, an item is added to a JComboBox, perhaps due to the user
	 * selecting an option that changes a JComboBox contents.
	 * 
	 * We need to add that change to the DOM, so we make JSComboBoxUI a listener
	 * for that event. JSComboBoxUI calls revalidate(), which calls
	 * JComponent.revalidate(). JComponent.revalidate() first calls setTainted()
	 * and then sets up a paint request.
	 * 
	 * This is just a convenience method that lets us trap with debugging when
	 * this is occurring from this package.
	 * 
	 */
	protected void revalidate() {
		jc.revalidate();
	}

	/**
	 * Mark this component as in need of update.
	 * 
	 */
	public void setTainted() {
		isTainted = true;
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		if (debugging)
			System.out.println(id + " stateChange " + dumpEvent(e));
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (prop == "ancestor") {
			JSComponentUI parentui = this;
			/**
			 * @j2sNative
			 * 
			 * 			parentui = this.jc.parent && this.jc.parent.getUI &&
			 *            this.jc.parent.getUI();
			 */
			if (parentui != null)
				parentui.setTainted();
			if (isDisposed && c.visible && e.getNewValue() != null)
				setVisible(true);
		}
		propertyChangedCUI(prop);
	}

	/**
	 * plaf ButtonListener and TextListener will call this to update common
	 * properties such as "text".
	 * 
	 * @param prop
	 */
	void propertyChangedFromListener(String prop) {
		propertyChangedCUI(prop);
	}

	protected void propertyChangedCUI(String prop) {
		// don't want to update a menu until we have to, after its place is set
		// and we know it is not a JMenuBar menu
		if (!isMenu)
			updateDOMNode();
		if (prop == "preferredSize") {
			// size has been set by JComponent layout
			preferredSize = c.getPreferredSize(); // may be null
			getPreferredSize();
			return;
		}
		if (prop == "background") {
			setBackground(c.getBackground());
			return;
		}
		if (prop == "foreground") {
			setForeground(c.getForeground());
			return;
		}
		if (prop == "opaque") {
			setBackground(c.getBackground());
			return;
		}
		if (prop == "inverted") {
			updateDOMNode();
			return;
		}
		if (prop == "text") {
			String val = ((AbstractButton) c).getText();
			if (val == null ? currentText != null : !val.equals(currentText))
				setIconAndText(prop, currentIcon, currentGap, (String) val);
			return;
		}
		if (prop == "iconTextGap") {
			if (iconNode != null) {
				int gap = ((AbstractButton) c).getIconTextGap();
				if (currentGap != gap)
					setIconAndText(prop, currentIcon, gap, currentText);
			}
			return;
		}
		if (prop == "icon") {
			if (iconNode != null) {
				// note that we use AbstractButton cast here just because
				// it has a getIcon() method. JavaScript will not care if
				// it is really a JLabel or JOptionPane, which also have icons
				ImageIcon icon = getIcon(c, null);
				if (icon == null ? currentIcon != null : !icon.equals(currentIcon))
					setIconAndText(prop, icon, currentGap, currentText);
			}
			return;
		}
		if (prop == "horizontalAlignment" || prop == "verticalAlignment") {
			setAlignment();
			return;
		}
		if (debugging)
			System.out.println("JSComponentUI: unrecognized prop: " + this.id + " " + prop);
	}

	private ImageIcon getIcon(JSComponent c, Icon icon) {
		return (c == null || icon == null 
				&& (icon  = ((AbstractButton) c).getIcon()) == null ?
			null : icon.getIconWidth() <= 0 || icon.getIconHeight() <= 0 ? null : (icon instanceof ImageIcon) ? (ImageIcon) icon :
				JSToolkit.paintImageForIcon(jc, icon));
	}

	protected void setIconAndText(String prop, Icon icon, int gap, String text) {

		// TODO add textPosition

		actualWidth = actualHeight = 0;
		currentText = text;
		currentGap = gap;
		canAlignText = false;
		canAlignIcon = false;
		currentIcon = null;
		imageNode = null;
		if (iconNode != null) {
			icon = currentIcon = getIcon(jc, icon);
			$(iconNode).empty();
			if (currentIcon != null) {
				imageNode = DOMNode.getImageNode(currentIcon.getImage());
				DOMNode.setStyles(imageNode, "vertical-align", "middle"); // else
																			// this
																			// will
																			// be
																			// "baseline"
				iconNode.appendChild(imageNode);
				iconHeight = icon.getIconHeight();
			}
		}
		boolean isHTML = false;
		if (text == null || text.length() == 0) {
			text = "";
			if (icon != null)
				canAlignIcon = true;
		} else {
			if (icon == null) {
				canAlignText = allowTextAlignment;
			} else {
				// vCenter(imageNode, 10); // perhaps? Not sure if this is a
				// good idea
				if (gap == Integer.MAX_VALUE)
					gap = getDefaultIconTextGap();
				if (gap != 0 && text != null)
					DOMNode.addHorizontalGap(iconNode, gap);
			}
			if (text.indexOf("<html>") == 0) {
				isHTML = true;
				// PhET uses <html> in labels and uses </br>
				text = PT.rep(text.substring(6, text.length() - 7), "</br>", "");
				text = PT.rep(text, "</html>", "");
				text = PT.rep(text, "href=", "target=_blank href=");
				text = PT.rep(text, "href=", "target=_blank href=");
				// Jalview hack
				text = PT.rep(text, "width: 350; text-align: justify; word-wrap: break-word;",
						"width: 350px; word-wrap: break-word;");
			}
		}
		DOMNode obj = null;
		if (textNode != null) {
			prop = "innerHTML";
			obj = textNode;
			if (!isHTML)
				text = PT.rep(text, "<", "&lt;");
		} else if (valueNode != null) {
			prop = "value";
			obj = valueNode;
			if (iconNode != null)
				DOMNode.setVisible(obj, text != null);
		}
		if (obj != null)
			setProp(obj, prop, text);
		if (centeringNode == null) {
			// button
			setBackgroundFor(valueNode, c.getBackground());
		} else {
			// label
			setCssFont(centeringNode, c.getFont());
			// added to make sure that the displayed element does not wrap with
			// this new text
		}
		if (!boundsSet)
			setHTMLSize(domNode, true);
		if (centeringNode != null)
			setAlignment();
		if (debugging)
			System.out.println("JSComponentUI: setting " + id + " " + prop);
	}

	protected int getDefaultIconTextGap() {
		return 0;
	}

	private String createMsgs = "";

	/**
	 * set to TRUE by Container.validateTree at the beginning of its laying out
	 * and FALSE when that is complete.
	 * 
	 */
	@SuppressWarnings("unused")
	private boolean layingOut;

	/**
	 * has been disposed; will need to reattach it if it ever becomes visible
	 * again.
	 * 
	 */
	private boolean isDisposed;

	/**
	 * Calculated by temporarily setting the node on the page and measuring its
	 * dimensions.
	 * 
	 */
	protected int actualHeight, actualWidth;

	/**
	 * can be set false to never draw a background, primarily because Mac OS
	 * will paint a non-rectangular object.
	 * 
	 * (textfield, textarea, button, combobox, menuitem)
	 */
	protected boolean allowPaintedBackground = true;

	public void setAllowPaintedBackground(boolean TF) {
		allowPaintedBackground = TF;
	}

	@Override
	public DOMNode getDOMNode() {
		return updateDOMNode();
	}

	/**
	 * Create or recreate the inner DOM element for this Swing component.
	 * 
	 * @return the DOM element's node and, if the DOM element already exists,
	 */
	public DOMNode updateDOMNode() {
		String msg = "Swingjs WARNING: default JSComponentUI.updateDOMNode() is being used for " + getClass().getName();
		if (debugging && createMsgs.indexOf(msg) < 0) {
			createMsgs += msg;
			JSUtil.alert(msg);
		}
		System.out.println(msg);
		return (domNode == null ? domNode = DOMNode.createElement("div", id) : domNode);
	}

	protected DOMNode setCssFont(DOMNode obj, Font font) {
		if (font != null) {
			int istyle = font.getStyle();
			String name = font.getFamily();
			if (name == "Dialog" || name == "SansSerif")
				name = "Arial";
			DOMNode.setStyles(obj, "font-family", name, "font-size", font.getSize() + "px", "font-style",
					((istyle & Font.ITALIC) == 0 ? "normal" : "italic"), "font-weight",
					((istyle & Font.BOLD) == 0 ? "normal" : "bold"));
		}

		// if (c.isBackgroundSet())
		// setBackground(c.getBackground());
		// setForeground(c.getForeground());
		enabled = !c.isEnabled();
		setEnabled(c.isEnabled());
		return obj;
	}

	protected DOMNode newDOMObject(String key, String id, String... attr) {
		DOMNode obj = DOMNode.createElement(key, id);
		for (int i = 0; i < attr.length;)
			DOMNode.setAttr(obj, attr[i++], attr[i++]);
		if (!c.isEnabled())
			setEnabled(false);
		return obj;
	}

	protected DOMNode wrap(String type, String id, DOMNode... elements) {
		DOMNode obj = newDOMObject(type, id + type);
		for (int i = 0; i < elements.length; i++) {
			obj.appendChild(elements[i]);
		}
		return obj;
	}

	protected void debugDump(DOMNode d) {
		System.out.println(DOMNode.getAttr(d, "outerHTML"));
	}

	protected static void vCenter(DOMNode obj, int offset) {
		DOMNode.setStyles(obj, "top", "50%", "transform", "translateY(" + offset + "%)");
	}

	/**
	 * overloaded to allow panel and radiobutton to handle slightly differently
	 * 
	 * @param obj
	 * @param addCSS
	 * @return
	 */
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		return setHTMLSize1(obj, addCSS, true);
	}

	/**
	 * also called by JSRadioButtonUI so that it can calculate subset dimensions
	 * 
	 * @param node
	 * @param addCSS
	 * @param usePreferred
	 * @return
	 */
	protected Dimension setHTMLSize1(DOMNode node, boolean addCSS, boolean usePreferred) {
		if (node == null)
			return null;
		addCSS &= !isMenuItem;
		int h, w;
		String w0 = null, h0 = null, w0i = null, h0i = null, position = null;
		DOMNode parentNode = null;
		if (centeringNode != null && node == domNode)
			node = centeringNode;

		if (scrollPaneUI != null) {
			w = scrollPaneUI.c.getWidth();
			h = scrollPaneUI.c.getHeight();
		} else if (usePreferred && preferredSize != null) {
			// user has set preferred size
			w = preferredSize.width;
			h = preferredSize.height;
		} else {
			// determine the natural size of this object
			// save the parent node -- we will need to reset that.
			parentNode = DOMNode.transferTo(node, null);

			// remove position, width, and height, because those are what we are
			// setting here

			if (!isMenuItem)
			/**
			 * @j2sNative
			 * 
			 * 			w0 = node.style.width; h0 = node.style.height;
			 *            position = node.style.position;
			 * 
			 *            if (node == this.centeringNode && this.innerNode) {
			 *            w0i = this.innerNode.style.width; h0i =
			 *            this.innerNode.style.height; }
			 */
			{
				w0 = w0i = "";
			}
			DOMNode.setStyles(node, "position", null, "width", null, "height", null);
			if (innerNode != null)
				DOMNode.setStyles(innerNode, "width", null, "height", null);

			DOMNode div;
			if (DOMNode.getAttr(node, "tagName") == "DIV")
				div = node;
			else
				div = wrap("div", id + "_temp", node);
			DOMNode.setPositionAbsolute(div, Integer.MIN_VALUE, 0);

			// process of discovering width and height is facilitated using
			// jQuery
			// and appending to document.body.
			// By using .after() we avoid CSS changes in the BODY element.
			// but this almost certainly has issues with zooming

			$(body).after(div);
			// DOMNode test = (jc.uiClassID == "LabelUI" ? node : div);
			Rectangle r = div.getBoundingClientRect();
			// From the DOM; Will be Rectangle2D.double, actually.
			// This is preferable to $(text).width() because that is rounded
			// DOWN.
			// This showed up in Chrome, where a value of 70.22 for w caused a
			// "Step"
			// button to be wrapped.
			w = (int) Math.max(0, Math.ceil(r.width));
			h = (int) Math.max(0, Math.ceil(r.height));
			if (!usePreferred) {
				actualWidth = w;
				actualHeight = h;
			}
			// h = preferredHeight;// (iconHeight > 0 ? iconHeight :
			// centerHeight);
			// TODO what if centerHeight is > prefHeight?
			$(div).detach();
		}
		// allow a UI to slightly adjust its dimension
		Dimension size = getCSSAdjustment(addCSS);
		size.width += w;
		size.height += h;
		if (addCSS) {
			DOMNode.setPositionAbsolute(node, Integer.MIN_VALUE, 0);
			DOMNode.setSize(node, size.width, size.height);
			if (node == centeringNode) {
				// also set domNode?
				DOMNode.setPositionAbsolute(parentNode, Integer.MIN_VALUE, 0);
				DOMNode.setSize(parentNode, size.width, size.height);
			}
		} else {
			DOMNode.setStyles(node, "position", null);
			// check to reset width/height after getPreferredSize
			if (w0 != null) {
				DOMNode.setStyles(node, "width", w0, "height", h0, "position", position);
			}

		}
		if (w0i != null) {
			DOMNode.setStyles(innerNode, "width", w0i, "height", h0i);
		}
		if (parentNode != null)
			parentNode.appendChild(node);
		return size;
	}

	/**
	 * allows for can be overloaded to allow some special adjustments
	 * 
	 * @param addingCSS
	 *            TODO
	 * 
	 * @return
	 */
	protected Dimension getCSSAdjustment(boolean addingCSS) {
		return new Dimension(0, 0);
	}

	/**
	 * Creates the DOM node and inserts it into the tree at the correct place,
	 * iterating through all children if this is a container.
	 * 
	 * Overridden for JSLabelUI, JSViewportUI, and JWindowUI, though both of
	 * those classes do setHTMLElementCUI() first; they just append to it.
	 * 
	 * 
	 * 
	 * @return the outerNode
	 * 
	 */
	protected DOMNode setHTMLElement() {
		return setHTMLElementCUI();
	}

	/**
	 * When something has occurred that needs rebuilding of the internal
	 * structure of the node, isTainted will be set. Only then will this method
	 * be executed.
	 * 
	 * @return the outer node for this component's DOM tree, containing all
	 *         child elements needed to implement it.
	 */
	protected DOMNode setHTMLElementCUI() {
		if (!isTainted)
			return outerNode;

		domNode = updateDOMNode();
		checkTransparent(domNode);
		Component[] children = getChildren();
		int n = children.length;

		if (isMenuItem) {
			outerNode = domNode;
			if (n == 0)
				return outerNode;
		}

		if (outerNode == null)
			outerNode = wrap("div", id, domNode);

		/**
		 * @j2sNative
		 * 
		 * 			this.outerNode.setAttribute("name",
		 *            this.jc.__CLASS_NAME__);
		 */
		{
		}
		// set position

		setOuterLocationFromComponent();

		if (n > 0 && containerNode == null)
			containerNode = outerNode;
		if (isContainer || n > 0) {
			// set width from component
			if (isContainer && !isMenuItem) {
				// System.out.println("JSComponentUI container " + id + " "
				// + c.getBounds());
				int w = getContainerWidth();
				int h = getContainerHeight();
				DOMNode.setSize(outerNode, w, h);
				// not clear why this does not always work:
				if (isContentPane)
					DOMNode.setStyles(outerNode, "overflow", "hidden");
			}
			if (isRootPane) {
				if (jc.getFrameViewer().isApplet) {
					// If the applet's root pane, we insert it into the applet's
					// content
					// layer div
					DOMNode cdiv = swingjs.JSToolkit.getHTML5Applet(jc)._getContentLayer();
					if (cdiv != null)
						cdiv.appendChild(outerNode);
					// } else {
					// BH: pretty sure this next is totally unnecessary; would
					// never run?
					// This is the root pane of a JFrame, JDialog, JWindow, etc.
					// we insert the canvas for the frame into this content pane
					// HTML5Canvas canvas = jc.getFrameViewer().canvas;
					// if (DOMNode.getAttr(canvas, "_installed") != null) {
					// outerNode.appendChild(canvas);
					// DOMNode.setAttr(canvas, "_installed", "1");
					/// }
				}
				DOMNode.setStyles(outerNode, "overflow", "hidden");
			}
			addChildrenToDOM(children);

			if (isWindow && jc.getUIClassID() != "InternalFrameUI") {
				DOMNode.transferTo(outerNode, body);
			}
		}

		// mark as not tainted
		// debugDump(divObj);
		isTainted = false;
		// if (jc.getDropTarget() != null) {
		// addDropTarget();
		// }
		return outerNode;
	}

	private void setOuterLocationFromComponent() {
		// In SwingJS we just use the "local" lightweight location
		// for all components, not the native adjusted one, because
		// we maintain the hierarchy of the divs. I think this is
		// saying that everything is basically heavyweight. It
		// "paints" itself.

		if (outerNode != null && !isMenuItem) {
			// Considering the possibility of the parent being created
			// before children are formed. So here we can add them later.
			if (parent == null && jc.getParent() != null && (parent = (JSComponentUI) jc.getParent().getUI()) != null
					&& parent.outerNode != null)
				parent.outerNode.appendChild(outerNode);
			DOMNode.setPositionAbsolute(outerNode, Integer.MIN_VALUE, 0);
			DOMNode.setStyles(outerNode, "left", (x = c.getX()) + "px", "top", (y = c.getY()) + "px");
		}
	}

	protected Component[] getChildren() {
		return (this.children == null ? jc.getComponents() : this.children);
	}

	protected void addChildrenToDOM(Component[] children) {
		// add all children
		int n = children.length;
		for (int i = 0; i < n; i++) {
			JSComponentUI ui = JSToolkit.getUI(children[i], false);
			if (ui == null || ui.isNull) {
				// Box.Filler has no ui.
				continue;
			}
			ui.parent = this;
			if (ui.getOuterNode() == null) {
				System.out.println("JSCUI could not add " + ui.c.getName() + " to " + c.getName());
			} else {
				if (ui.domNode != ui.outerNode && DOMNode.getParent(ui.domNode) == null)
					ui.outerNode.appendChild(ui.domNode);
				containerNode.appendChild(ui.outerNode);
			}
		}
	}

	protected int getContainerWidth() {
		return width = c.getWidth();
	}

	protected int getContainerHeight() {
		return height = c.getHeight();
	}

	private Dimension getHTMLSize() {
		return setHTMLSize(updateDOMNode(), false);
	}

	@Override
	public void update(Graphics g, JComponent c) {
		// called from JComponent.paintComponent
		if (borderTest) {
			g.setColor(Color.red);
			g.drawRect(0, 0, c.getWidth(), c.getHeight());
			System.out.println("drawing " + c.getWidth() + " " + c.getHeight());
		}
		setHTMLElement();
		if (c.isOpaque() && allowPaintedBackground) {
			g.setColor(c.getBackground());
			g.fillRect(0, 0, c.getWidth(), c.getHeight());
			setBackgroundPainted();
		}
		paint(g, c);
	}

	@Override
	public void paint(Graphics g) {
		// from ComponentPeer -- not implemented?
		update(g, jc);
	}

	@Override
	public void paint(Graphics g, JComponent c) {
		// Note that for now, button graphics
		// are BEHIND the button. We will need to paint onto the
		// glass pane for this to work, and then also manage
		// mouse clicks and key clicks with that in mind.

		// used by JSListUI

	}

	@Override
	public void repaint(long tm, int x, int y, int width, int height) {
		// nothing to do here
	}

	@Override
	public void print(Graphics g) {
		JSUtil.notImplemented("");
	}

	@Override
	public Dimension getMinimumSize() {
		return  getMinimumSize(jc);
	}

	@Override
	public Dimension getMaximumSize() {
		return getMaximumSize(jc);
	}

	/**
	 * getPreferredSize reports to a LayoutManager what the size is for this
	 * component will be when placed in the DOM.
	 * 
	 * It is only called if the user has not already set the preferred size of
	 * the component.
	 * 
	 * Later, the LayoutManager will make a call to setBounds in order to
	 * complete the transaction, after taking everything into consideration.
	 * 
	 */
	@Override
	public Dimension getPreferredSize() {
		return getPreferredSize(jc);
	}

	// the following are likely to be called in the original BasicXXXUI classes
	
	Dimension getMinimumSize(JComponent jc) {
		return getPreferredSize(jc);
	}

	Dimension getPreferredSize(JComponent jc) {
		Dimension d = getHTMLSize();
		if (debugging)
			System.out.println("CUI >> getPrefSize >> " + d + " for " + this.id);
		return d;
	}

	Dimension getMaximumSize(JComponent jc) {
		if (isToolbarFixed) {
			Container parent = jc.getParent();
			String parentClass = (parent == null ? null : parent.getUIClassID());
			if ("ToolBarUI" == parentClass)
				return getPreferredSize();
		}
		return null;
	}

	/**
	 * 
	 * Returns <code>true</code> if the specified <i>x,y</i> location is
	 * contained within the look and feel's defined shape of the specified
	 * component. <code>x</code> and <code>y</code> are defined to be relative
	 * to the coordinate system of the specified component. Although a
	 * component's <code>bounds</code> is constrained to a rectangle, this
	 * method provides the means for defining a non-rectangular shape within
	 * those bounds for the purpose of hit detection.
	 * 
	 * @param c
	 *            the component where the <i>x,y</i> location is being queried;
	 *            this argument is often ignored, but might be used if the UI
	 *            object is stateless and shared by multiple components
	 * @param x
	 *            the <i>x</i> coordinate of the point
	 * @param y
	 *            the <i>y</i> coordinate of the point
	 * 
	 * @see javax.swing.JComponent#contains
	 * @see java.awt.Component#contains
	 */
	@SuppressWarnings("deprecation")
	@Override
	public boolean contains(JComponent c, int x, int y) {
		return c.inside(x, y);
	}

	/**
	 * Returns an instance of the UI delegate for the specified component. Each
	 * subclass must provide its own static <code>createUI</code> method that
	 * returns an instance of that UI delegate subclass. If the UI delegate
	 * subclass is stateless, it may return an instance that is shared by
	 * multiple components. If the UI delegate is stateful, then it should
	 * return a new instance per component. The default implementation of this
	 * method throws an error, as it should never be invoked.
	 */
	public static ComponentUI createUI(JComponent c) {
		// SwingJS so, actually, we don't do this. This class is NOT stateless.
		// Instead, what we do is to create a unique instance
		// right in UIManager. The sequence is:
		// JRadioButton.updateUI()
		// --> javax.swing.UIManager.getUI(this)
		// --> javax.swing.UIManager.getDefaults().getUI(target)
		// --> JSToolkit.getComponentUI(target)
		// --> creates an instance of JRadioButtonUI and returns
		// that instance as JRadioButton.ui, which is NOT static.
		//
		// throw new Error("ComponentUI.createUI not implemented.");
		return null;
	}

	/**
	 * Returns the baseline. The baseline is measured from the top of the
	 * component. This method is primarily meant for <code>LayoutManager</code>s
	 * to align components along their baseline. A return value less than 0
	 * indicates this component does not have a reasonable baseline and that
	 * <code>LayoutManager</code>s should not align this component on its
	 * baseline.
	 * <p>
	 * This method returns -1. Subclasses that have a meaningful baseline should
	 * override appropriately.
	 * 
	 * @param c
	 *            <code>JComponent</code> baseline is being requested for
	 * @param width
	 *            the width to get the baseline for
	 * @param height
	 *            the height to get the baseline for
	 * @throws NullPointerException
	 *             if <code>c</code> is <code>null</code>
	 * @throws IllegalArgumentException
	 *             if width or height is &lt; 0
	 * @return baseline or a value &lt; 0 indicating there is no reasonable
	 *         baseline
	 * @see javax.swing.JComponent#getBaseline(int,int)
	 * @since 1.6
	 */
	@Override
	public int getBaseline(JComponent c, int width, int height) {
		if (c == null) {
			throw new NullPointerException("Component must be non-null");
		}
		if (width < 0 || height < 0) {
			throw new IllegalArgumentException("Width and height must be >= 0");
		}
		return -1;
	}

	/**
	 * Returns an enum indicating how the baseline of he component changes as
	 * the size changes. This method is primarily meant for layout managers and
	 * GUI builders.
	 * <p>
	 * This method returns <code>BaselineResizeBehavior.OTHER</code>. Subclasses
	 * that support a baseline should override appropriately.
	 * 
	 * @param c
	 *            <code>JComponent</code> to return baseline resize behavior for
	 * @return an enum indicating how the baseline changes as the component size
	 *         changes
	 * @throws NullPointerException
	 *             if <code>c</code> is <code>null</code>
	 * @see javax.swing.JComponent#getBaseline(int, int)
	 * @since 1.6
	 */
	@Override
	public Component.BaselineResizeBehavior getBaselineResizeBehavior(JComponent c) {
		if (c == null) {
			throw new NullPointerException("Component must be non-null");
		}
		return Component.BaselineResizeBehavior.OTHER;
	}

	/**
	 * overridden in JSPasswordFieldUI
	 * 
	 * @return texat
	 */
	public String getJSTextValue() {
		return (String) DOMNode.getAttr(domNode, valueNode == null ? "innerHTML" : "value");
	}

	DOMNode getOuterNode() {
		return (outerNode == null ? setHTMLElement() : outerNode);
	}

	protected DOMNode setProp(DOMNode obj, String prop, String val) {
		return DOMNode.setAttr(obj, prop, val);
	}

	@Override
	public boolean isObscured() {
		JSUtil.notImplemented("");
		return false;
	}

	@Override
	public boolean canDetermineObscurity() {
		JSUtil.notImplemented("");
		return false;
	}

	@Override
	public void setVisible(boolean b) {
		DOMNode node = getOuterNode();
		if (node == null)
			node = domNode; // a frame or other window
		DOMNode.setVisible(node, b);
		if (b) {
			if (isDisposed)
				undisposeUI(node);
			toFront();
		}
	}

	public void toFront() {
		// windows only
	}

	@Override
	public void setEnabled(boolean b) {
		if (b == enabled)
			return;
		enabled = b;
		if (enableNode != null)
			enableNode(enableNode, b);
		else if (enableNodes != null)
			for (int i = 0; i < enableNodes.length; i++)
				enableNode(enableNodes[i], b);
	}

	private final Color colorUNKNOWN = new Color();

	protected Color inactiveForeground = colorUNKNOWN, inactiveBackground = colorUNKNOWN;

	private boolean enabled = true;

	protected void enableNode(DOMNode node, boolean b) {
		if (node == null)
			return;

		if (isMenuItem) {
			if (b) {
				$(node).removeClass("ui-menu-disabled ui-state-disabled");
			} else {
				$(node).addClass("ui-menu-disabled ui-state-disabled");
			}
			return;
		}

		DOMNode.setAttr(node, "disabled", (b ? null : "TRUE"));
		String pp = getPropertyPrefix();
		if (!b && inactiveForeground == colorUNKNOWN)
			getDisabledColors(pp);
		if (jc.isOpaque()) {
			Color bg = c.getBackground();
			setBackground(b || !(bg instanceof UIResource) || inactiveBackground == null ? bg : inactiveBackground);
		}
		Color fg = c.getForeground();
		setForeground(b ? fg : getInactiveTextColor(fg));
	}

	protected Color getInactiveTextColor(Color fg) {
		// overridden in JSTextUI to include consideration of editable
		return (inactiveForeground == null ? fg : inactiveForeground);
	}

	protected void getDisabledColors(String pp) {
		inactiveBackground = UIManager.getColor(pp + "inactiveBackground");
		inactiveForeground = UIManager.getColor(pp + "inactiveForeground");
	}

	@Override
	public void setBounds(int x, int y, int width, int height, int op) {
		boolean isBounded = (width > 0 && height > 0);
		if (isBounded && !boundsSet) {
			// now we can set it to be visible, because its bounds have
			// been explicitly set.
			if (c.visible)
				setVisible(true);
			boundsSet = true;
		}
		if (debugging)
			System.out.println("CUI << SetBounds >> [" + x + " " + y + " " + width + " " + height + "] op=" + op
					+ " for " + this.id);
		// Note that this.x and this.y are never used. Tney are frame-referenced
		switch (op) {
		case SET_BOUNDS:
		case SET_LOCATION:
			x = c.getX();
			y = c.getY();
			if (this.x != x || this.y != y) {
				this.x = x;
				this.y = y;
			}
			setOuterLocationFromComponent();
			if (op == SET_LOCATION)
				break;
			//$FALL-THROUGH$
		case SET_CLIENT_SIZE: // is supposed to be without insets
		case SET_SIZE:
			if (scrollPaneUI != null) {
				width = Math.min(width, scrollPaneUI.c.getWidth());
				height = Math.min(height, scrollPaneUI.c.getHeight());
			}
			if (width > 0 && height > 0)
				setSizeFromComponent(width, height, op);
			break;
		}
	}

	private void setSizeFromComponent(int width, int height, int op) {
		// allow for special adjustments
		// currently MenuItem, TextField, and TextArea
		Dimension size = getCSSAdjustment(true);
		// if (this.width != width || this.height != height) {
		this.width = width;
		this.height = height;
		if (debugging)
			System.out.println(id + " setBounds " + x + " " + y + " " + this.width + " " + this.height + " op=" + op
					+ " createDOM?" + (domNode == null));
		if (domNode == null)
			updateDOMNode();
		setJSDimensions(width + size.width, height + size.height);
		setInnerComponentBounds(width, height);
	}

	/**
	 * used by JSListUI to give it the correct scrollable size for its JViewPort
	 */
	protected int jsActualWidth, jsActualHeight;

	private Object dropTarget = this; // unactivated

	protected void setJSDimensions(int width, int height) {
		if (jsActualWidth > 0)
			width = jsActualWidth;
		if (jsActualHeight > 0)
			height = jsActualHeight;
		DOMNode.setSize(domNode, width, height);
		if (outerNode != null)
			DOMNode.setSize(outerNode, width, height);
	}

	protected void setInnerComponentBounds(int width, int height) {
		setAlignment();
		if (debugging)
			System.out.println("CUI reshapeMe: need to reshape " + id + " w:" + this.width + "->" + width + " h:"
					+ this.height + "->" + height);
	}

	private void setAlignment() {
		if (canAlignText) {
			setVerticalAlignment(true);
			setTextAlignment();
		} else if (canAlignIcon) {
			setVerticalAlignment(false);
			setTextAlignment();
		}
	}

	private void setTextAlignment() {
		if (this.c.getWidth() == 0)
			return;
		int type = ((AbstractButton) c).getHorizontalAlignment();
		String prop = getCSSTextAlignment(type);
		// the centeringNode is not visible. It is a div that allows us to
		// position the text and icon of the image based on its preferred size
		// in the
		DOMNode.setStyles(domNode, "width", c.getWidth() + "px", "text-align", textAlign = prop);
		if (jc.uiClassID == "LabelUI" && centeringNode != null) {
			int left = 0;
			int w = actualWidth;
			if (w == 0)
				w = setHTMLSize1(centeringNode, false, false).width;
			switch (type) {
			case SwingConstants.LEFT:
			case SwingConstants.LEADING:
				break;
			case SwingConstants.RIGHT:
			case SwingConstants.TRAILING:
				prop = "right";
				left = c.getWidth() - w;
				break;
			case SwingConstants.CENTER:
				left = (c.getWidth() - w) / 2;
				break;
			default:
				return;
			}
			// edu_northwestern_physics_groups_atomic_applet_Mirror_applet.html
			// seems to work OK here because the absolute is being removed
			// there was a problem with Applet.init() not having the right
			// width/height initialization
			// but now it seems OK. This issue is most certainly the issue that
			// in applet start up
			// an initial paint shows checkboxes lower than they should be.
			DOMNode.setStyles(centeringNode, "position", "absolute", "left", left + "px");
		}
	}

	protected String getCSSTextAlignment(int type) {
		String prop = null;
		switch (type) {
		case SwingConstants.RIGHT:
		case SwingConstants.TRAILING:
			prop = "right";
			break;
		case SwingConstants.LEFT:
		case SwingConstants.LEADING:
			prop = "left";
			break;
		case SwingConstants.CENTER:
			prop = "center";
			break;
		}
		return prop;
	}

	protected void setVerticalAlignment(boolean isText) {
		int type = ((AbstractButton) c).getVerticalAlignment();
		if (centeringNode == null || this.c.getHeight() == 0)
			return;
		int top = 0;
		int h = actualHeight;
		if (h == 0) {
			if (isText) {
				if (c.getFont() == null)
					return;
				h = setHTMLSize1(domNode, false, false).height;
				// for example, a 12-pt font might have a height of 16, and
				// ascent of 13, and descent of 3
				// adjust down to center only the ascension of the text.
				h -= (c.getFont().getFontMetrics().getDescent());
			} else {
				h = iconHeight;
			}
		}
		switch (type) {
		case SwingConstants.TOP:
			break;
		case SwingConstants.BOTTOM:
			top = c.getHeight() - h;
			break;
		case SwingConstants.CENTER:
			top = (c.getHeight() - h) / 2;
			break;
		default:
			return;
		}
		DOMNode.setStyles(centeringNode, "position", "absolute", "top", top + "px");
	}

	@Override
	public void handleEvent(AWTEvent e) {
		// Mouse events will show up here immediately after being dispatched
		// to the target by Container.dispatchEventImpl.
		// We do not handle them here since we are already handling them there.
	}

	@Override
	public void coalescePaintEvent(PaintEvent e) {
		JSUtil.notImplemented("");

	}

	/**
	 * Coordinates relative to the document
	 * 
	 */
	@Override
	public Point getLocationOnScreen() {
		Insets offset = (Insets) $(outerNode).offset();
		return new Point(offset.left, offset.top);
	}

	@Override
	public ColorModel getColorModel() {
		return Toolkit.getDefaultToolkit().getColorModel();
	}

	@Override
	public Toolkit getToolkit() {
		return Toolkit.getDefaultToolkit();
	}

	@Override
	public Graphics getGraphics() {
		// n/a -- called from java.awt.Component when NOT a LightweightPeer.
		return null;
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		return c.getFontMetrics(font);
	}

	@Override
	public void dispose() {
		isDisposed = true;
		DOMNode.remove(domNode);
		if (domNode != outerNode)
			DOMNode.remove(outerNode);
	}

	/**
	 * 
	 * This control has been added back to some other node after being disposed
	 * of. So now we need to undo that.
	 * 
	 * @param node
	 */
	private void undisposeUI(DOMNode node) {
		if (c.getParent() != null) {
			JSComponentUI ui = (JSComponentUI) c.getParent().getUI();
			if (ui.containerNode != null)
				ui.containerNode.appendChild(node);
		}
		// menu separators have domNode == outerNode
		// cell renderers will set their domNode to null;
		if (outerNode != null && domNode != null && domNode != outerNode) 
			outerNode.appendChild(domNode);
		isDisposed = false;
	}

	@Override
	public void setForeground(Color color) {
		if (domNode != null)
			DOMNode.setStyles(domNode, "color",
					(color == null ? "rgba(0,0,0,0)" : JSToolkit.getCSSColor(color == null ? Color.black : color)));
	}

	@Override
	public void setBackground(Color color) {
		setBackgroundFor(domNode, color);
	}

	private void setBackgroundFor(DOMNode node, Color color) {
		// Don't allow color for Menu and MenuItem. This is taken care of by
		// jQuery
		if (node == null || isMenuItem)
			return;
		// if (color == null) // from paintComponentSafely
		DOMNode.setStyles(node, "background-color", JSToolkit.getCSSColor(color == null ? rootPaneColor : color));
		if (allowPaintedBackground && jc.selfOrParentBackgroundPainted())
			setTransparent(node);
		else
			checkTransparent(node);
	}

	/**
	 * If a control is transparent, then set that in HTML for its node
	 * 
	 * @param node
	 */
	private void checkTransparent(DOMNode node) {
		// Note that c.setOpaque(true/false) on a label DOES work, but you need
		// to do a repaint to see it in Java.
		// Here we keep it simple and do the change immediately.
		//

		if (!c.isOpaque() && node != null)
			setTransparent(node);
	}

	@Override
	public void setBackgroundPainted() {
		setTransparent(domNode);
	}

	private void setTransparent(DOMNode node) {
		DOMNode.setStyles(node, "background", "transparent");
	}

	@Override
	public void setFont(Font f) {
		if (domNode != null)
			setCssFont(domNode, f);
	}

	@Override
	public void updateCursorImmediately() {
		String curs;
		switch (c.getCursor().getType()) {
		case 1:
			curs = "crosshair";
			break;
		case 3: // wait
			curs = "wait";
			break;
		case 8: // zoom
			curs = "ns-resize";
			break;
		case 12: // hand
			curs = "grab";
			break;
		case 13:
			curs = "move";
			break;
		default:
			curs = "default";
			break;
		}
		DOMNode.setStyles(setHTMLElement(), "cursor", curs);
		setWaitImage(curs == "wait");
	}

	protected void setWaitImage(boolean doShow) {
		if (waitImage != null) {
			if (!doShow)
				return;
			String path = "";
			/**
			 * @j2sNative
			 * 
			 * 			path = this.applet._j2sPath;
			 * 
			 */
			{
			}
			path += "/img/cursor_wait.gif";
			if (debugging)
				System.out.println("loading wait cursor " + path);
			waitImage = newDOMObject("image", id + "_waitImage", "src", path);
		}
		if (doShow)
			$(waitImage).show();
		else
			$(waitImage).hide();
	}

	@Override
	public boolean requestFocus(Component lightweightChild, boolean temporary, boolean focusedWindowChangeAllowed,
			long time, Cause cause) {
		if (focusNode == null)
			return false;
		$(focusNode).focus();
		if (textNode != null)
			$(textNode).select();
		else if (valueNode != null)
			$(valueNode).select();
		return true;
	}

	@Override
	public boolean isFocusable() {
		return (focusNode != null);
	}

	@Override
	public Image createImage(ImageProducer producer) {
		JSUtil.notImplemented("");
		return null;
	}

	@Override
	public Image createImage(int width, int height) {
		JSUtil.notImplemented("");
		return null;
	}

	@Override
	public VolatileImage createVolatileImage(int width, int height) {
		JSUtil.notImplemented("");
		return null;
	}

	@Override
	public boolean prepareImage(Image img, int w, int h, ImageObserver o) {
		JSUtil.notImplemented("");
		return false;
	}

	@Override
	public int checkImage(Image img, int w, int h, ImageObserver o) {
		JSUtil.notImplemented("");
		return 0;
	}

	@Override
	public GraphicsConfiguration getGraphicsConfiguration() {
		JSUtil.notImplemented("");
		return null;
	}

	@Override
	public boolean handlesWheelScrolling() {
		JSUtil.notImplemented("");
		return false;
	}

	@Override
	public Image getBackBuffer() {
		JSUtil.notImplemented("");
		return null;
	}

	@Override
	public void destroyBuffers() {
		JSUtil.notImplemented("");

	}

	@Override
	public void reparent(ContainerPeer newContainer) {
		JSUtil.notImplemented("");

	}

	@Override
	public boolean isReparentSupported() {
		JSUtil.notImplemented("");
		return false;
	}

	@Override
	public void layout() {
		JSUtil.notImplemented("");

	}

	@Override
	public Rectangle getBounds() {
		JSUtil.notImplemented("");
		return null;
	}

	public boolean hasFocus() {
		return focusNode != null && focusNode == DOMNode.getAttr(document, "activeElement");
	}

	public void notifyFocus(boolean focusGained) {
		// unfortunately, this will be TOO LATE

		AWTEvent e = new FocusEvent(c, focusGained ? FocusEvent.FOCUS_GAINED : FocusEvent.FOCUS_LOST);
		if (focusGained) {
			// The problem here is that we are getting an activate signal too
			// early,
			// before focus has been obtained.
			focusedUI = this;
			Toolkit.getEventQueue().postEvent(e);
		} else {
			focusedUI = null;
			/**
			 * @j2xxsNative
			 * 
			 * 				this.c.processEvent(e);
			 * 
			 */
			{
				// We must be certain that the lost message arrives before the
				// gained.
				Toolkit.getEventQueue().dispatchEventAndWait(e, c);
			}

		}
	}

	public int getZIndex(String what) {
		@SuppressWarnings("unused")
		DOMNode node = domNode;
		int z = 0;
		/**
		 * looking for high-level content pane or frame
		 * 
		 * @j2sNative
		 * 
		 * 			if (what) return this.applet._z[what];
		 * 
		 *            while (node && !node.style["z-index"]) node =
		 *            node.parentElement; z = parseInt(node.style["z-index"]);
		 *            return(!z || isNaN(z) ? 100000 : z);
		 */
		{
			return z;
		}
	}

	// /////////////////////////// ContainerPeer ///////////////////////////

	// all Swing components are containers

	@Override
	public Insets getInsets() {
		return null;
	}

	@Override
	public void beginValidate() {
		// TODO Auto-generated method stub

	}

	@Override
	public void endValidate() {
		// TODO Auto-generated method stub

	}

	@Override
	public void beginLayout() {
		// hide if not a panel and bounds have not been set.
		if (!boundsSet && !isContainer)
			setVisible(false);
		layingOut = true;
	}

	@Override
	public void endLayout() {
		layingOut = false;
	}

	public String getId() {
		return id;
	}

	protected String dumpEvent(EventObject e) {
		return e.toString();
	}

	public static String toCSSString(Color c) {
		int opacity = c.getAlpha();
		if (opacity == 255)
			return "#" + toRGBHexString(c);
		int rgb = c.getRGB();
		return "rgba(" + ((rgb >> 16) & 0xFF) + "," + ((rgb >> 8) & 0xff) + "," + (rgb & 0xff) + "," + opacity / 255f
				+ ")";
	}

	public static String toRGBHexString(Color c) {
		int rgb = c.getRGB();
		if (rgb == 0)
			return "000000";
		String r = "00" + Integer.toHexString((rgb >> 16) & 0xFF);
		r = r.substring(r.length() - 2);
		String g = "00" + Integer.toHexString((rgb >> 8) & 0xFF);
		g = g.substring(g.length() - 2);
		String b = "00" + Integer.toHexString(rgb & 0xFF);
		b = b.substring(b.length() - 2);
		return r + g + b;
	}

	/**
	 * We allow here for an off-screen graphic for which the paint operation
	 * also sets its location.
	 * 
	 * Called from edu.colorado.phet.common.phetgraphics.view.
	 * 
	 * @param comp
	 * @param owner
	 * @param g
	 */
	public static void updateSceneGraph(JComponent comp, JComponent owner, JSGraphics2D g) {

		DOMNode node = ((JSComponentUI) comp.ui).outerNode;
		int x = 0, y = 0;
		/**
		 * @j2sNative
		 * 
		 * 			x = g.$transform.m02; y = g.$transform.m12;
		 * 
		 *            if (x == node.lastSceneX && y == node.lastSceneY) return;
		 *            node.lastSceneX = x; node.lastSceneY = y;
		 * 
		 */
		{
		}
		DOMNode.setStyles(node, "left", x + "px", "top", y + "px");

		/**
		 * @j2sNative
		 * 
		 * 			if (node.parentElement == null)
		 *            owner.ui.outerNode.appendChild(node);
		 * 
		 */
		{
		}
	}

	/**
	 * prefix for the HTML5LookAndFeal
	 * 
	 * @return
	 */

	protected String getPropertyPrefix() {
		return null;
	}

	protected void setPadding(Insets padding) {
		// JTextField and JButton
		DOMNode.setStyles(domNode, "padding", padding == null ? "0px"
				: padding.top + "px " + padding.left + "px " + padding.bottom + "px " + padding.right + "px");
	}

	public void addDropTarget(DropTarget t) {
		// called by DropTarget
		if (dropTarget == t)
			return;
		dropTarget = t;
		setDropTarget(true);
	}

	@Override
	public void removeDropTarget(DropTarget t) {
		// called by DropTarget
		if (dropTarget != t)
			return;
		setDropTarget(false);
		dropTarget = null;
	}

	private void setDropTarget(boolean adding) {
		if (dropTarget == this)
			return;
		JSUtil.J2S._setDragDropTarget(c, getDOMNode(), dropTarget != null);
	}

	public void setTargetParent(JComponent targetParent, MouseInputListener mouseInputListener) {
		this.targetParent = targetParent;
		//this.mouseInputListener = mouseInputListener;
	}

}
