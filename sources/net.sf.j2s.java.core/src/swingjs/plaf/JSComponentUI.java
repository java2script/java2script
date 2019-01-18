package swingjs.plaf;

import java.awt.AWTEvent;
import java.awt.Color;
import java.awt.Component;
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
import java.awt.event.KeyEvent;
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
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;
import javax.swing.JTable.BooleanRenderer;
import javax.swing.KeyStroke;
import javax.swing.SwingConstants;
import javax.swing.UIManager;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.ComponentUI;
import javax.swing.plaf.UIResource;

import javajs.api.JSFunction;
import javajs.util.PT;
import sun.awt.CausedFocusEvent.Cause;
import swingjs.JSFocusPeer;
import swingjs.JSGraphics2D;
import swingjs.JSToolkit;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Applet;
import swingjs.api.js.J2SInterface;
import swingjs.api.js.JQuery;
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
 * SwingJS MOUSE AND KEY EVENT HANDLING
 * 
 * A mouse action starts in j2sApplet.js as a jQuery event, 
 * where it is processed and then passed to JSFrameViewer's JSMouse object.
 * 
 * In JSMouse the event is converted to a java.awt.event.MouseEvent, with the
 * jQuery event saved as event.bdata[].jqevent. 
 * 
 * methods involved include:
 * 
 * 		setDataComponent(DOMNode node)
 * 
 * 		setDataUI(node)
 * 
 *      bindJQueryEvents(node, [event name string], [MouseEvent id])
 *      
 *      bindJSKeyEvents(node, addFocusAndDnD)
 *      
 *      setJ2sMouseHandler(DOMNode node)
 *      
 * 	    ignoreAllMouseEvents(node)
 *      
 * 
 * data-component [setDataComponent(DOMNode button)]
 * --------------
 * 
 * The data-component attribute is necessary for canceling propagation and 
 * default action of an event within the event processing sequence. It is current 
 * invoked only for JButton, JList, and JSlider.
 * 
 * This standard MouseEvent in Java is dispatched using java.awt.EventQueue, 
 * thus setting EventQueue.isDispatchThread() true. In SwingJS, we also do this,
 * unless the DOM element is given the "data-component" attribute, 
 * pointing to its corresponding AWT component directly. This attribute is stored
 * in the event as bdata.jqevent.target["data-component"].
 * 
 * Either way, the event is dispatched by java.awt.LightweightDispatcher (in
 * Container.java), where the "nativeContainer" for this window (JApplet,
 * JFrame, JWindow, JDialog, or JPopupMenu) is identified. Java has to search
 * the native container for the right X,Y coordinate for this control, but in
 * SwingJS we can bypass that and already know the control that was clicked. 
 * This more direct method is only invoked if "data-component" is set. 
 * 
 * data-ui [setDataUI(node)]
 * -------
 * 
 * Some UIs (JSSpinnerUI, JSComboBoxUI, JSFrameUI, and JSTextUI) set jqevent.target["data-ui"] 
 * to point to themselves. This allows the control an option to handle the raw jQuery
 * event directly, bypassing the Java dispatch system entirely, id desired.
 * 
 * TODO: We should not use this method. It bypasses the normal Java LightWeightDispatcher,
 * which has a protected processEvent(AWTEvent) method that 
 * users can use to do custom processing. Maybe think about this more?
 * 
 * This method is used for specific operations, including JFrame closing,
 * JComboBox selection, and JSText key action handling. This connection is set up in
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

	private static final Color rootPaneColor = new Color(238, 238, 238);

	private static final int MENUITEM_OFFSET = 11;

	final J2SInterface J2S = JSUtil.J2S;
	
	public boolean isNull;

	/**
	 * provides a unique id for any component; set on instantiation
	 */
	protected static int incr;

	/**
	 * Set this during run time using swingjs.plaf.JSComponentUI.borderTest = true
	 * to debug alignments
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
	public JComponent jc;

	/**
	 * the associated JLabel, if this is one
	 */

	protected JLabel label;
	
	/**
	 *  TableCellRenderers will not have parents; here we point to the table so that
	 * we can send the coordinates to the retrieve the row and cell
	 * 
	 */
	protected JComponent targetParent;

	public JComponent getTargetParent() {
		return targetParent;
	}

	protected JPopupMenu menu;

	// MouseInputListener mouseInputListener;

	/**
	 * The outermost div holding a component -- left, top, and for a container width
	 * and height
	 * 
	 * Note that all controls have an associated outerNode div. Specifically, menu
	 * items will be surrounded by an li element, not a div.
	 * 
	 * This must be set up here, nowhere else.
	 * 
	 */
	public DOMNode outerNode;

	/**
	 * When CellRendererPane updates a table cell, it needs to save and restore
	 * all of the various nodes -- enableNode, textNode, etc -- to domNode.
	 * 
	 * This save is done immediately after painting. It disables the ui for any
	 * changes that might pass to it from property changes.
	 * 
	 * @param td
	 */
	protected void saveCellNodes(DOMNode td) {
		DOMNode[] nodes = new DOMNode[] {
				domNode,
				innerNode,
				centeringNode,
				
				iconNode,
				textNode,
				accelNode,
				buttonNode,			
				enableNode,
				
				(enableNodes == null ? null : enableNodes[0]),
				(enableNodes == null ? null : enableNodes[1]),
				(enableNodes == null ? null : enableNodes[2]),
				
				focusNode,
				actionNode,
				valueNode,
		};	
		DOMNode.setAttr(td, "data-nodes", nodes);
		DOMNode node = DOMNode.firstChild(td);
		if (node != domNode) {
			$(td).empty();
			td.appendChild(domNode);
		}
		domNode = outerNode = null;
	}

	protected void restoreCellNodes(DOMNode td) {
		DOMNode[] nodes = (DOMNode[]) DOMNode.getAttr(td, "data-nodes");
		if (nodes == null)
			return;
		domNode 		= nodes[0];
		innerNode		= nodes[1];
		centeringNode 	= nodes[2];
		
		iconNode		= nodes[3];
		textNode		= nodes[4];
		accelNode       = nodes[5];
		buttonNode 		= nodes[6];
		enableNode 		= nodes[7];
		
		if (nodes[8] != null) {
			enableNodes[0] = nodes[8];
			enableNodes[1] = nodes[9];
			enableNodes[2] = nodes[10];
		}
		
		focusNode		= nodes[11];
		actionNode 		= nodes[12];
		valueNode		= nodes[13];
	}

	/**
	 * inner node for JButtonUI that needs to be cleared prior to calculating
	 * preferred size
	 * 
	 */
	protected DOMNode innerNode;

	/**
	 * the main HTML5 element for the component, possibly containing others, such as
	 * radio button with its label.
	 * 
	 */
	public DOMNode domNode;
	
	/**
	 * an inner div that allows vertical and horizontal centering 
	 * for a JLabel or AbstractButton, including JMenuItems
	 * 
	 */
	protected DOMNode centeringNode;

	/**
	 * an icon image -- non-null means we do have an icon
	 * 
	 */
	protected DOMNode imageNode;

	/**
	 * the HTML5 input element being pressed, if the control is a radio or checkbox
	 * button
	 * 
	 */
	protected DOMNode actionNode;

	/**
	 * the "FOR" label for a radio button
	 * 
	 */
	protected DOMNode buttonNode;

	/**
	 * a component or subcomponent that can be enabled/disabled
	 */
	protected DOMNode enableNode;

	/**
	 * a component or subcomponent that can be enabled/disabled;
	 * this is DOMNode[3]
	 */
	protected DOMNode[] enableNodes;

	/**
	 * the part of a component that can hold an icon
	 */
	protected DOMNode iconNode;

	/**
	 * the part of a component that can hold text
	 */
	public DOMNode textNode;

	/**
	 * the place flushed right for alt-X
	 */
	public DOMNode accelNode;

	/**
	 * the subcomponent with the value field
	 */
	protected DOMNode valueNode;

	/**
	 * a component that is focusable
	 */
	public DOMNode focusNode;

	/**
	 * menu li node
	 */
    protected DOMNode itemNode;

    /**
     * the node to put children into; defaulting (and set) to outerNode 
     * when initially null, but sometimes domNode
     */
	protected DOMNode containerNode;

	
	/**
	 * "left" "right" "center" if defined
	 */
	protected String textAlign;

	/**
	 * Labels with icons will have this
	 */
	protected int iconHeight;

	/**
	 * jSButtonUI buttonListener
	 * 
	 */
	public ButtonListener buttonListener;
	
	/**
	 * the anchor tag surrounding a menu item
	 * 
	 */
	
 	public DOMNode menuAnchorNode;

	/**
	 * for SplitPaneDivider
	 * 
	 */
	protected boolean draggable;

	public void setDraggable(JSFunction f) {
		// SplitPaneDivider
		draggable = true; // never actually used
		J2S.setDraggable(getDOMNode(), f);
	}

   /**
	 * a numerical reference for an ID
	 */
	protected int num;

	// /**
	// * a flag to indicate that it is not visible, but not according to Java
	// */
	// private boolean zeroWidth;

	protected boolean isDummyFrame;
	
//	/**
//	 * indicates that in a toolbar, this component should use its preferred size for
//	 * min and max
//	 * 
//	 */
//
//	protected boolean isToolbarFixed = true;

	/**
	 * indicates that we need a new outerNode
	 * 
	 */
	protected boolean isTainted = true;

	/**
	 * prevents premature visualization
	 * 
	 */
	protected boolean boundsSet;

	/**
	 * indicates that we do not need an outerNode and that we should be applying any
	 * positioning to the node itself; all menu items will have this set true
	 */

	protected boolean isMenuItem;

    /**
     * 
     * '-' or '|' in a menuitem or JSeparator
     */
	
	protected boolean isMenuSep;
	
	
	/**
	 * indicates that we do not want to updateDOMNode too early
	 */

	protected boolean isMenu;

	/**
	 * flag for raw JButton used in setHTMLSize1 only
	 * 
	 */
	protected boolean isSimpleButton, isLabel;

	protected int x, y;

	/**
	 * preferred dimension set by user
	 * 
	 */
	protected Dimension preferredSize;

	/**
	 * used by JSListUI to give it the correct scrollable size for its JViewPort
	 */
	protected int jsActualWidth, jsActualHeight;

	private Object dropTarget = this; // unactivated

	protected int actionItemOffset;

	private int mnemonicIndex = -1;


	/**
	 * panels
	 * 
	 */
	protected boolean isContainer, isWindow, isRootPane, isPopupMenu,
					  isContentPane, isPanel, isDesktop, isTable;

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

	private DOMNode waitImage;

	private final Color colorUNKNOWN = new Color();

	protected Color inactiveForeground = colorUNKNOWN, inactiveBackground = colorUNKNOWN;

	private boolean enabled = true;

	/**
	 * processed text (local to setIconAndText) is HTML
	 */
	private boolean isHTML;

	/**
	 * set false for tool tip or other non-label object that has text
	 * 
	 */
	protected boolean allowTextAlignment = true;

	protected static JQuery jquery = JSUtil.getJQuery();

	/**
	 * JavaScript menu timer id
	 */
	protected int menuTimer;

	/**
	 * checked by JavaScript in j2sApplet.js as well as in Java by InputEvent.consume()
	 */
	public boolean j2sDoPropagate;

	/**
	 * Set so that ui will handle all event stopPropagation() and preventDefault() action.
	 */
	protected void setDoPropagate() {
		j2sDoPropagate = true; // so that we enable the JavaScript button or caret action
 	}


	private boolean notImplemented;

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
	public void installJS() {
		/**
		 * @j2sNative
		 * 
		 * 			this.c.addChangeListener$javax_swing_event_ChangeListener &&
		 *            this.c.addChangeListener$javax_swing_event_ChangeListener(this);
		 */
		{
		}
		if (buttonListener == null)
		c.addPropertyChangeListener(this);
	}

	/**
	 * Called upon disposal of Window, JPopupMenu, and JComponent.
	 * 
	 * Subclasses should not implement this method; use uninstallUIImpl() instead
	 * 
	 */
	private void uninstallJS() {

		// window closing will fire this with c == null

		/**
		 * @j2sNative
		 * 
		 * 			this.c &&
		 *            this.c.removeChangeListener$javax_swing_event_ChangeListener &&
		 *            this.c.removeChangeListener$javax_swing_event_ChangeListener(this);
		 */
		if (c != null)
			c.removePropertyChangeListener(this);
		if (outerNode != null) {
			DOMNode.dispose(outerNode);
			outerNode = null;
		}
	}

	protected JQueryObject $(Object node) {
		return jquery.$(node);
	}

	/**
	 * Set the associated JComponent. Setting comp null will disable this UI from
	 * getting any events.
	 * 
	 * @param comp
	 */
	private void setComponent(JComponent comp) {
		c = jc = comp;
		isUIDisabled = (comp == null);
		if (isUIDisabled)
			domNode = outerNode = null;		

	}

	public JSComponentUI set(JComponent target) {
		// note that in JavaScript, in certain cases
		// (JFrame, JWindow, JDialog)
		// target will not be a JComponent,
		// but it will always be a JSComponent, and
		// we do not care if it is not a JComponent.
		setComponent(target);
		applet = JSToolkit.getHTML5Applet(c);
		newID(false);
		installUI(target); // need to do this immediately, not later
		installJS();
		if (needPreferred) // only slider needs this
			getHTMLSizePreferred(updateDOMNode(), false);
		return this;
	}

	protected void newID(boolean forceNew) {
		classID = c.getUIClassID();
		notImplemented = (classID == "ComponentUI");
		if (id == null || forceNew) {
			num = ++incr;
			id = c.getHTMLName(classID) + "_" + num;
		}
	}

	/**
	 * This must remain the only place that domNode is set to null;
	 */
	public void reInit() {
		setTainted();
		if (domNode != null)
			DOMNode.dispose(domNode);
		domNode = null;
		keysEnabled = false;
		newID(true);
	}

	// ////////////// user event handling ///////////////////

	/**
	 * When a user clicks a component in SwingJS, jQuery catches it, and a message
	 * is sent to javax.swing.LightweightDispatcher (in Component.js) to be
	 * processed. If this were actual Java, we would have to determine if a
	 * component's button was clicked by running through all the buttons on the
	 * component's "native container" and checking whether the click was within the
	 * component's boundaries.
	 * 
	 * By setting the data-component attribute of a DOM element, we are indicating
	 * to the LightweightDispatcher that we already know what button was clicked; it
	 * is not necessary to check x and y for that. This ensures perfect
	 * correspondence between a clicked button and its handling by SwingJS.
	 * 
	 * The action will be handled by a standard Java MouseListener, but it 
	 * will be on the system event queue, not the "AWT Event Queue" -- 
	 * EventQueue.isDispatchThread() will be false. 
	 * 
	 * Includes Button, List, Slider, and TextField
	 * 
	 * @param button
	 */
	protected void setDataComponent(DOMNode button) {
		DOMNode.setAttr(button, "data-component", c);
	}

	
	protected void setDataKeyComponent(DOMNode node) {
		DOMNode.setAttr(node, "data-keycomponent", c);
	}

	/**
	 * Indicate to J2S to completely ignore all mouse events for this control. It
	 * will be handled by the control directly using a jQuery callback that is
	 * generated by updateDOMNode. Used by JSComboBoxUI and JSSliderUI.
	 * 
	 * @param node
	 */
	protected void ignoreAllMouseEvents(DOMNode node) {
		addClass(node, "swingjs-ui");
	}

	protected static void hideAllMenus() {
		JSUtil.jQuery.$(".ui-menu").hide();
	}
	
	protected void addClass(DOMNode node, String cl) {
		$(node).addClass(cl);
	}
	
	protected void removeClass(DOMNode node, String cl) {
		$(node).removeClass(cl);
	}
	
	/**
	 * J2S mouse event handling (in j2sApplet.js) will look for the data-ui
	 * attribute of a jQuery event target and, if found, reroute the event to
	 * handleJSEvent, bypassing the standard LightweightDispatcher business.
	 * 
	 * JSComboBoxUI, JSFrameUI, and JSTextUI set jqevent.target["data-ui"] to point
	 * to themselves. This allows the control to bypass the Java dispatch system
	 * entirely and just come here for processing. This method is used for specific
	 * operations, including JFrame closing, JComboBox selection, and JSText action
	 * handling so that those can be handled specially.
	 * 
	 * This connection is set up in JSComponentUI.setDataUI() and handled by
	 * overriding JSComponentUI.handleJSEvent().
	 * 
	 * @param node
	 */
	protected void setDataUI(DOMNode node) {
		DOMNode.setAttr(node, "data-ui", this);
		addClass(node, "data-ui");
	}

	/**
	 * Set attributes and data for action in j2sMenu
	 * 
	 * @param node icon, text, or accelerator node
	 */
	protected void setMenuItem(DOMNode node) {
		$(node).attr("role", "menucloser");
		setDataComponent(node);
//		setDataUI(iconNode);
	}

	/**
	 * Set j2sApplet to capture jQuery mouse events and turn them into Java MouseEvents. 
	 * Used by JSFrameUI and JTextArea to indicate that it is to be the "currentTarget" for mouse 
	 * clicks. 
	 * @param node
	 * @param isFrame
	 */
	protected void setJ2sMouseHandler() {
		// The DOM attributes applet and _frameViewer are necessary for proper 
		// direction to the target
		DOMNode.setAttrs(domNode, "applet", applet, "_frameViewer", jc.getFrameViewer());
		J2S.setMouse(domNode, true);
	}

	/**
	 * fired by JSComponent when key listeners are registered
	 * 
	 * @param on
	 */
	public void enableJSKeys(boolean on) {
		if (getDOMNode() == null)
			return; // too early
		if (!on) {
			setTabIndex(Integer.MIN_VALUE);
		} else if (keysEnabled) {
			setTabIndex(-1);
		} else {
			addJ2SKeyHandler();
		}
	}

	protected void addJ2SKeyHandler() {
		if (focusNode == null && (focusNode = domNode) == null)
			return;
		keysEnabled = true;
		DOMNode.setAttrs(focusNode, "applet", applet, "_frameViewer", jc.getFrameViewer());
		setDataKeyComponent(focusNode);
		J2S.setKeyListener(focusNode);
		setTabIndex(-1);
	}
	
	/**
	 * enable JavaScript .focus() and .blur() reporting
	 * 
	 * @param i
	 */
	private void setTabIndex(int i) {
		if (focusNode == null)
			return;
		if (i == Integer.MIN_VALUE) {
			focusNode.removeAttribute("tabindex");
			DOMNode.setAttr(focusNode, "ui", null);
		} else {
			focusNode.setAttribute("tabindex", "" + i);
			DOMNode.setAttr(focusNode, "ui", this);
		}
	}

	@Override
	public boolean isFocusable() {
		return (focusNode != null);
	}

	public boolean hasFocus() {
		return focusNode != null && focusNode == getActiveElement();
	}

	private DOMNode getActiveElement() {
		return (DOMNode) DOMNode.getAttr(document, "activeElement");
	}

	@Override
	public boolean requestFocus(Component lightweightChild, boolean temporary, boolean focusedWindowChangeAllowed,
			long time, Cause cause) {
		if (lightweightChild == null)
			return focus();
		return JSToolkit.requestFocus(lightweightChild);
	}

	/**
	 * Outgoing: Initiate a focus() event in the system directly
	 * 
	 * @return
	 */
	public boolean focus() {
		if (focusNode == null || isUIDisabled)
			return false;
		JSFocusPeer.focus(focusNode);
		return true;
	}

	/**
	 * Add the $().focus() and $().blur() events to a DOM button.
	 * 
	 * Added in JSFrameUI
	 * Added in JSComboBoxUI?
	 * 
	 * Also from bindJSKeyEvents
	 * 
	 */
	protected void addJQueryFocusCallbacks() {
		if (focusNode == null)
			focusNode = domNode;
		setTabIndex(-1);
		JQueryObject node = $(focusNode);
		node.unbind("focus blur");
		JSComponentUI me = this;

		// initial idea involved
		// 
		//    node.mousedown(function(e) { e.target.focus() });
		//
		// but that is not quite right. We need to let KeyboardFocusManager handle all of this.
		

		/**
		 * @j2sNative
		 * 
		 * 			node.focus(function(e) {
		 * 				//System.out.println("JSSCUI node.focus() callback " + me.id + "  " + document.activeElement.id);
		 * 				me.handleJSFocus$O$O$Z(me.jc, e.relatedTarget, true);
		 * 				//System.out.println("JSSCUI focus " + me.id);
		 * 			});
		 *            node.blur(function(e) {
		 *            try{
		 * 				//System.out.println("JSSCUI node.blur() callback " + me.id + "  " + document.activeElement.id);
		 *            me.handleJSFocus$O$O$Z(me.jc, e.relatedTarget, false);
		 * 				//System.out.println("JSSCUI focus blur " + me.id + "  " + document.activeElement.id);
		 *            }catch(e){
		 *              //System.out.println("JSSCUI focus error blur " + me.id);
		 *            }
		 *            });
		 */
		{
			// Eclipse reference only
			me.handleJSFocus(this.jc, null, true);
		}
	}

	/**
	 * Incoming: From jQuery callback; checks for complementary event
	 * 
	 * @param jco       initiating JComponent
	 * @param related   partner in focus loss/gain
	 * @param focusGained 
	 */
	public void handleJSFocus(Object jco, Object related, boolean focusGained) {
		JSFocusPeer.handleJSFocus(jco, related, focusGained);
	}

	/**
	 * Internal: Directly fire KFM events for button press from JComponent.doClick() 
	 */
	@SuppressWarnings("unused")
	public void abstractButtonFocusHack() {    	
		JComponent focused = (JComponent) JSToolkit.getCurrentFocusOwner(null);
    	JSComponentUI focusedUI = /** @j2sNative focused && focused.ui || */ null;
    	// This is important for a button that is responding to a formatted text box input.
    	// I cannot figure out how to get the blur message before this one.
    	// See Micrometer.java
    	if (focusedUI != null && focusedUI != this) {
    		focusedUI.handleJSFocus(jc, null, false);
    		handleJSFocus(jc, null, true);
    	}
	}

	
	private boolean keysEnabled;

	private int mnemonic;

	/**
	 * for jQuery return
	 */
	protected final static boolean CONSUMED = false;
	protected final static boolean NOT_CONSUMED = true;
	
	/**
	 * for SetMouse check
	 */
	protected final static boolean HANDLED = true;
	protected final static boolean NOT_HANDLED = false;

	/**
	 * Set the node to accept key events and possibly focusout
	 * 
	 * @param node
	 * @param andFocusOut
	 */
	protected void bindJSKeyEvents(DOMNode node, boolean addFocus) {
		setDataUI(node);
		addClass(node, "ui-key");
		keysEnabled = true;
		bindJQueryEvents(node, "keydown keypress keyup" + (addFocus ? " focusout"// dragover drop"
				: ""), Event.KEY_PRESS);
		
		if (addFocus) {
			addJQueryFocusCallbacks();
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
	 * @param node      the JavaScript element that is being triggered
	 * @param eventList one or more JavaScript event names to pass, separated by
	 *                  space
	 * @param eventID   an integer event type to return; can be anything, but
	 *                  Event.XXXX is recommended
	 */
	protected void bindJQueryEvents(DOMNode node, String eventList, int eventID) {
		JSEventHandler me = this;
		JSFunction f = null;
		setDataUI(node);
		addClass(node, "ui-events");
		/**
		 * @j2sNative
		 * 
		 * f = function(jqevent) { return me.handleJSEvent$O$I$O(node, eventID, jqevent) }
		 */
		{
			me.handleJSEvent(null, 0, null); // Eclipse reference only; not in
											// JavaScript
		}
		$(node).bind(eventList, f);
	}
	

	/**
	 * handle an event set up by adding the data-ui attribute to a DOM node.
	 * 
	 * @param target      a DOMNode
	 * @param eventType   a MouseEvent id, including 501, 502, 503, or 506 (pressed,
	 *                    released, moved, and dragged, respectively)
	 * @param jQueryEvent
	 * @return false to prevent the default process
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		return NOT_CONSUMED; // aka HANDLED
	}
	
	/**
	 * Cause a new event to be scheduled for the rebuilding of this Swing
	 * component's internal DOM structure using updateDOMNode.
	 * 
	 * For example, an item is added to a JComboBox, perhaps due to the user
	 * selecting an option that changes a JComboBox contents.
	 * 
	 * We need to add that change to the DOM, so we make JSComboBoxUI a listener for
	 * that event. JSComboBoxUI calls revalidate(), which calls
	 * JComponent.revalidate(). JComponent.revalidate() first calls setTainted() and
	 * then sets up a paint request.
	 * 
	 * This is just a convenience method that lets us trap with debugging when this
	 * is occurring from this package.
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

	/**
	 * allows also for the cell renderer to not taint this cell just from a bounds change if scrolling.
	 * 
	 * @param tf
	 */
	public void setTainted(boolean tf) {
		isTainted = tf;
	}


	@Override
	public void stateChanged(ChangeEvent e) {
		if (debugging)
			System.out.println(id + " stateChange " + dumpEvent(e));
	}


	
	private void updatePropertyAncestor(boolean fromButtonListener) {
		if (fromButtonListener) {
			setTainted();
			setHTMLElement();
		}
		JComponent p = (JComponent) jc.getParent();
		while (p != null) {
			JSComponentUI parentui = (JSComponentUI) (p == null ? null : p.getUI());
			if (parentui != null) {
				parentui.setTainted();
				if (fromButtonListener) {
					parentui.setHTMLElement();
					if (parentui.menu != null) {
						((JSPopupMenuUI) parentui).updateMenu(false);
					} else if (parentui.isPopupMenu && p.getParent() == null) {
						p = (JComponent) ((JPopupMenu) p).getInvoker();
						continue;
					}
				}
			}
			p = (JComponent) p.getParent();
		}
	}
	
	
//	
//	@Override
//	public void propertyChange(PropertyChangeEvent e) {
//		// old
//		String prop = e.getPropertyName();
//		if (prop == "ancestor") {
//			JComponent p = (JComponent) jc.getParent();
//			while (p != null) {
//				JSComponentUI parentui = (JSComponentUI) (p == null ? null : p.getUI());
//				if (parentui != null)
//					parentui.setTainted();
//				p = (JComponent) p.getParent();
//			}
//
//			if (e.getNewValue() == null)
//				return;
//			if (isDisposed && c.visible && e.getNewValue() != null)
//				setVisible(true);
//		}
//		propertyChangedCUI(prop);
//	}
//
//	


	@Override
	public void propertyChange(PropertyChangeEvent e) {
		if (isUIDisabled)
			return;
		String prop = e.getPropertyName();
		if (prop == "ancestor") {
			if (cellComponent != null)
				return;
			updatePropertyAncestor(false);
			if (e.getNewValue() == null)
				return;
			if (isDisposed && c.visible && e.getNewValue() != null)
				setVisible(true);
		}
		propertyChangedCUI(e, prop);
	}
	
	/**
	 * plaf ButtonListener and TextListener will call this to update common
	 * properties such as "text".
	 * @param e TODO
	 * @param prop
	 */
	void propertyChangedFromListener(PropertyChangeEvent e, String prop) {
		if (isUIDisabled)
			return;
		switch (prop) {
		case "ancestor":
			if (cellComponent != null)
				return;
			updatePropertyAncestor(true);
			break;
		}
		propertyChangedCUI(e, prop);
	}
	
	protected void propertyChangedCUI(PropertyChangeEvent e, String prop) {
		// don't want to update a menu until we have to, after its place is set
		// and we know it is not a JMenuBar menu
		if (!isMenu)
			getDOMNode();
		switch (prop) {
		case "preferredSize":
			// size has been set by JComponent layout
			preferredSize = c.getPreferredSize(); // may be null
			getPreferredSize(jc);
			return;
		case "background":
			setBackground(c.getBackground());
			return;
		case "foreground":
			setForeground(c.getForeground());
			return;
		case "opaque":
			setBackground(c.getBackground());
			return;
		case "inverted":
			updateDOMNode();
			return;
		case "text":
			String val = ((AbstractButton) c).getText();
			if (val == null ? currentText != null : !val.equals(currentText))
				setIconAndText(prop, currentIcon, currentGap, (String) val);
			return;
		case "iconTextGap":
			if (iconNode != null) {
				int gap = ((AbstractButton) c).getIconTextGap();
				if (currentGap != gap)
					setIconAndText(prop, currentIcon, gap, currentText);
			}
			return;
		case "icon":
			if (centeringNode != null) {
				// note that we use AbstractButton cast here just because
				// it has a getIcon() method. JavaScript will not care if
				// it is really a JLabel or JOptionPane, which also have icons
				ImageIcon icon = getIcon(c, null);
				if (icon == null ? currentIcon != null : !icon.equals(currentIcon))
					setIconAndText(prop, icon, currentGap, currentText);
			}
			return;
		case "mnemonic":
			int newValue = ((Integer) e.getNewValue()).intValue();
			setMnemonic(newValue);
			setIconAndText(prop, currentIcon, currentGap, currentText);
			return;
		case "displayedMnemonicIndex":
			mnemonicIndex = ((Integer) e.getNewValue()).intValue();
			setIconAndText(prop, currentIcon, currentGap, currentText);
			return;
		default:
			if (debugging)
				System.out.println("JSComponentUI: unrecognized prop: " + this.id + " " + prop);
		}
	}	
	
	protected void setMnemonic(int newValue) {
		// need to handle non-menu mnemonics as well
		if (newValue == mnemonic || domNode == null)
			return;
		if (newValue < 0) {
			newValue = (isLabel ? (label == null ? 0 : label.getDisplayedMnemonic()) 
					: /** @j2sNative this.jc.getMnemonic$ && this.jc.getMnemonic$() ||*/ 0);
			}
		DOMNode node = (menuAnchorNode == null ? domNode : menuAnchorNode);
		if (newValue != mnemonic)
			removeClass(node, "ui-mnem-" + Character.toLowerCase(mnemonic));
		if (newValue != 0)
			addClass(node, "ui-mnem-" + Character.toLowerCase(newValue));
		mnemonic = newValue;	
	}

	private String createMsgs = "";

	/**
	 * set to TRUE by Container.validateTree at the beginning of its laying out and
	 * FALSE when that is complete.
	 * 
	 */
	@SuppressWarnings("unused")
	private boolean layingOut;

	/**
	 * has been disposed; will need to reattach it if it ever becomes visible again.
	 * 
	 */
	private boolean isDisposed;

	/**
	 * table cell renderer component
	 * 
	 */
	protected JSComponent cellComponent;
	
	/**
	 * table cell width and height
	 */
	private int cellWidth, cellHeight;

	/**
	 * this ui has been disabled from receiving any events; see JTableUI
	 */
	protected boolean isUIDisabled;
	

	/**
	 * Calculated by temporarily setting the node on the page and measuring its
	 * dimensions.
	 * 
	 */
	protected int actualHeight, actualWidth;

	/**
	 * can be set false to never draw a background, primarily because Mac OS will
	 * paint a non-rectangular object.
	 * 
	 * (textfield, textarea, button, combobox, menuitem)
	 */
	protected boolean allowPaintedBackground = true;

	private boolean backgroundPainted;

	/**
	 * Label will render its image, drawing to the canvas; Button will not 
	 * (as of this writing), so we need a flag to know when to not hide it.
	 * 
	 */
	
	protected boolean imagePersists;

	private boolean allowDivOverflow;


	/**
	 * we can allow frames -- particularly JInternalFrames -- to overflow.
	 * 
	 * To do this, we need to make this indication for both the Root pane and the
	 * contentPane for the parent JFrame:
	 * 
	 * this.getRootPane().putClientProperty("swingjs.overflow.hidden", "false");
	 * 
	 * 
	 */
	protected void checkAllowDivOverflow() {
		allowDivOverflow = "false".equals(jc.getRootPane().getClientProperty("swingjs.overflow.hidden"));
	}

	public void setAllowPaintedBackground(boolean TF) {
		// listCellRenderer does not allow this.
		allowPaintedBackground = TF;
	}

	public DOMNode getDOMNode() {
		return (isUIDisabled ? null : updateDOMNode());
	}

	/**
	 * Create or recreate the inner DOM element for this Swing component.
	 * 
	 * @return the DOM element's node and, if the DOM element already exists,
	 */
	public DOMNode updateDOMNode() {
		if (notImplemented) {
			String msg = "Swingjs WARNING: default JSComponentUI.updateDOMNode() is being used for "
					+ getClass().getName();
			if (debugging && createMsgs.indexOf(msg) < 0) {
				createMsgs += msg;
				JSUtil.alert(msg);
			}
			System.out.println(msg);
			if (domNode != null)
				domNode = DOMNode.createElement("div", id);
		}
		return domNode;
	}
				
	protected DOMNode updateDOMNodeCUI() {
		if (cellComponent != null)
			updateCell(cellWidth, cellHeight);		
		return domNode;
	}

	private void updateCell(int width, int height) {
		DOMNode.setStyles(domNode, "width", "100%", "height", "100%");
		if (allowPaintedBackground)
			DOMNode.setStyles(domNode, "background", "transparent");
		if (cellComponent instanceof BooleanRenderer) {
			DOMNode.setStyles(centeringNode, "width", "100%", "height", "100%");
			DOMNode.setStyles(buttonNode, "width", "100%", "height", "100%");
			DOMNode.setStyles(actionNode, "position", "absolute", "width", "14px", "height", "14px", "top",
					(height / 2) + "px");
			int textAlign = ((BooleanRenderer) cellComponent).getHorizontalAlignment();
			switch (textAlign) {
			case SwingConstants.RIGHT:
			case SwingConstants.TRAILING:
				DOMNode.setStyles(actionNode, "left", width + "px", "transform",
						"scale(0.75,0.75) translate(-25px,-16px)");
				break;
			case SwingConstants.LEFT:
			case SwingConstants.LEADING:
				DOMNode.setStyles(actionNode, "left", "0px", "transform", "scale(0.75,0.75) translate(-5px,-16px)");
				break;
			case SwingConstants.CENTER:
				DOMNode.setStyles(actionNode, "left", (width / 2) + "px", "transform",
						"scale(0.75,0.75) translate(-15px,-16px)");
				break;
			}
		}
	}
	
	protected DOMNode setCssFont(DOMNode obj, Font font) {
		if (font != null) {
			int istyle = font.getStyle();
			DOMNode.setStyles(obj, 
					"font-family", JSToolkit.getCSSFontFamilyName(font.getFamily()), 
					"font-size", font.getSize() + "px", 
					"font-style", ((istyle & Font.ITALIC) == 0 ? "normal" : "italic"), 
					"font-weight", ((istyle & Font.BOLD) == 0 ? "normal" : "bold"));
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

	protected static void vCenter(DOMNode obj, int offset, float scale) {
		DOMNode.setStyles(obj, "top", "50%", "transform", 
				(scale > 0 ? "scale(" + scale + "," + scale + ")" : "")
				+"translateY(" + offset + "%)");
	}

	/**
	 * overloaded to allow panel and radiobutton to handle slightly differently
	 * 
	 * @param obj
	 * @param addCSS --- always false now
	 * @return
	 */
	protected Dimension getHTMLSizePreferred(DOMNode obj, boolean addCSS) {
		return setHTMLSize1(centeringNode == null || obj != domNode ? obj : centeringNode, addCSS, true);
	}

	public Dimension getHTMLSize(DOMNode obj) {
		return setHTMLSize1(obj, false, false);
	}
	
	private Dimension getIconSize(AbstractButton b) {
		return (iconNode == null || imageNode == null || b.getIcon() == null ? null
				: getHTMLSize(iconNode));
	}
	
	private Dimension getTextSize(AbstractButton b) {
		String t;
		return (textNode == null || (t = b.getText()) == null 
				|| t == "" ? null : getHTMLSize(textNode));
	}

	/**
	 * also called by JSRadioButtonUI so that it can calculate subset dimensions
	 * 
	 * @param node
	 * @param addCSS
	 * @param usePreferred
	 * @return
	 */
	@SuppressWarnings("unused")
	protected Dimension setHTMLSize1(DOMNode node, boolean addCSS, boolean usePreferred) {
		if (node == null)
			return null;
		addCSS &= !isMenuItem;
		int h, w;
		String w0 = null, h0 = null, w0i = null, h0i = null, position = null;
		DOMNode parentNode = null;
		if (scrollPaneUI != null) {
			w = scrollPaneUI.c.getWidth();
			h = scrollPaneUI.c.getHeight();
		} else if (usePreferred && preferredSize != null) {
			// user has set preferred size
			w = preferredSize.width;
			h = preferredSize.height;
		} else if (usePreferred && preferredDim != null) {
			// user has set preferred size
			w = preferredDim.width;
			h = preferredDim.height;
		} else {
			// determine the natural size of this object
			// save the parent node -- we will need to reset that.
			parentNode = DOMNode.transferTo(node, null);

			// remove position, width, and height, because those are what we are
			// setting here

			boolean simpleButton = isSimpleButton;
			DOMNode centerNode = centeringNode;
			DOMNode dnode = domNode;
			
			if (!isMenuItem)
			/**
			 * @j2sNative
			 * 
			 * 			w0 = node.style.width; h0 = node.style.height; position =
			 *            node.style.position;
			 * 
			 *            if (node == centerNode && simpleButton) { w0i =
			 *            dNode.style.width; h0i = dNode.style.height; }
			 */
			{
				w0 = w0i = "";
			}
			DOMNode.setStyles(node, "position", null, "width", null, "height", null);
			if (innerNode != null) // JSListUI only
				DOMNode.setStyles(innerNode, "width", null, "height", null);
			DOMNode div;
			if (DOMNode.getAttr(node, "tagName") == "DIV")
				div = node;
			else
				div = wrap("div", id + "_temp", node);
			DOMNode.setPositionAbsolute(div);

			// process of discovering width and height is facilitated using
			// jQuery
			// and appending to document.body.
			// By using .after() we avoid CSS changes in the BODY element.
			// but this almost certainly has issues with zooming

			if (node == this.centeringNode) {
				// can't have these for getBoundingClientRect to work
				DOMNode.setStyles(node, "position", null);
				DOMNode.setStyles(this.textNode, "position", null);
				DOMNode.setStyles(this.iconNode, "position", null);
			}

			$(body).after(div);
			Rectangle r = div.getBoundingClientRect();
			
			//System.out.println("JSCUI " + (int) (r.width + 0.) + " " + (/** @j2sNative div.innerHTML ||*/""));
			
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
		Dimension dim = getCSSAdjustment(addCSS);
		dim.width += w;
		dim.height += h;
		DOMNode.setStyles(node, "position", null);
		if (w0 != null) {
			DOMNode.setStyles(node, "width", w0, "height", h0, "position", position);
		}
		if (w0i != null) {
			DOMNode.setStyles(domNode, "width", w0i, "height", h0i);
		}
		if (parentNode != null)
			parentNode.appendChild(node);
		return dim;
	}

	/**
	 * allows for can be overloaded to allow some special adjustments
	 * 
	 * @param addingCSS TODO
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
	 * Overridden for JSLabelUI, JSViewportUI, and JWindowUI, though both of those
	 * classes do setHTMLElementCUI() first; they just append to it.
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
	 * When something has occurred that needs rebuilding of the internal structure
	 * of the node, isTainted will be set. Only then will this method be executed.
	 * 
	 * @return the outer node for this component's DOM tree, containing all child
	 *         elements needed to implement it.
	 */
	protected DOMNode setHTMLElementCUI() {

		if (isUIDisabled || !isTainted)
			return outerNode;

		if (isDummyFrame) {
			isTainted = false;
			return (outerNode = DOMNode.createElement("div", "dummyFrame"));
		}
		updateDOMNode();
		checkTransparent(domNode);
		Component[] children = getChildren();
		int n = getChildCount();

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
		 * 			this.outerNode.setAttribute("name", this.jc.__CLASS_NAME__);
		 */
		{
		}
		// set position

		setOuterLocationFromComponent();

		if (n > 0 && containerNode == null)
			containerNode = outerNode;
		if (isContainer || n > 0) {
			// set width from component
			if (isContainer && !isMenuItem && !isTable) {
				// System.out.println("JSComponentUI container " + id + " "
				// + c.getBounds());
				int w = getContainerWidth();
				int h = getContainerHeight();
				DOMNode.setSize(outerNode, w, h);				
				if (isPanel || isContentPane || isRootPane) {
					DOMNode.setStyles(outerNode, "overflow",
							 allowDivOverflow ? "visible" : "hidden");
					if (isRootPane) {
						if (jc.getFrameViewer().isApplet) {
							// If the applet's root pane, we insert it into the applet's
							// content
							DOMNode cdiv = swingjs.JSToolkit.getHTML5Applet(jc)._getContentLayer();
							if (cdiv != null)
								cdiv.appendChild(outerNode);
						}
					}
				}
			}
			if (n > 0)
				addChildrenToDOM(children, n);
			if (isWindow && jc.getUIClassID() != "InternalFrameUI" && jc.getWidth() > 0) {
				DOMNode.transferTo(outerNode, body);
			}
		}
		isTainted = false;
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
			DOMNode.setPositionAbsolute(outerNode);
			DOMNode.setStyles(outerNode, "left", (x = c.getX()) + "px", "top", (y = c.getY()) + "px");
		}
	}

	protected Component[] getChildren() {
		// but see JSMenuUI and JTableUI
		return JSComponent.getChildArray(jc);
	}

	protected int getChildCount() {
		// but see JSMenuUI and JTableUI
		return jc.getComponentCount();
	}

	protected void addChildrenToDOM(Component[] children, int n) {
		// add all children
		for (int i = 0; i < n; i++) {
			if (!isTable && children[i] == null)
				break;
			JSComponentUI ui = JSToolkit.getUI(children[i], false);
			if (ui == null || ui.isNull) {
				// Box.Filler has no ui.
				continue;
			}
			ui.parent = this;
			if (ui.getOuterNode() == null) {
				System.out.println("JSCUI addChildren no outer node for " + ui.id);
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

	@Override
	public void update(Graphics g, JComponent c) {
		if (isUIDisabled)
			return;
		// called from JComponent.paintComponent
		if (borderTest) {
			g.setColor(Color.red);
			g.drawRect(0, 0, c.getWidth(), c.getHeight());
			System.out.println("drawing " + c.getWidth() + " " + c.getHeight());
		}
		setHTMLElement();
		setAlignment();
		paint(g, c);
	}

	/**
	 * Even if opaque, do not paint the background for some components (JButton, 
	 * JComboBox, JMenuItem, JEditorPanel, JTextArea, JTextField), as they
	 * will be be given colored backgrounds themselves as HTML5 components. 
	 * @return
	 */
	public boolean doPaintBackground() {
		return !backgroundPainted && c.isOpaque() && allowPaintedBackground;
	}
	
	/**
	 * This flag is set by border painting and background painting detection
	 * to indicate that a cell renderer must do that painting.
	 */
	public void setPainted(Graphics g) {
		backgroundPainted = true;
		if (allowPaintedBackground) {
			setTransparent(domNode);
		}
	}

	/**
	 * from ComponentPeer; not implemented in SwingJS
	 */
	@Override
	public void paint(Graphics g) {
		update(g, jc);
	}

	/**
	 * subclass overriding method should call super(g,c)
	 */
	@Override
	public void paint(Graphics g, JComponent c) {

		if (doPaintBackground()) {
			g.setColor(c.getBackground());
			g.fillRect(0, 0, c.getWidth(), c.getHeight());
			setTransparent(domNode);
		} 
		setOverflow();
		if (imageNode != null && !imagePersists) {
			// the icon must paint itself; imageNode is just a placeholder
			DOMNode.setStyles(imageNode, "visibility", "hidden");
		}

	}

	protected void setOverflow() {
		if (textNode != null)
			DOMNode.setStyles(textNode, "overflow", "hidden");
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
	public final Dimension getMinimumSize() {
		// from ComponentPeer; convenience only
		return getMinimumSize(jc);
	}
	
	@Override
	public final Dimension getPreferredSize() {
		// from ComponentPeer; convenience only
		return getPreferredSize(jc);
	}


// removed 12/31/18 -- does nothing
//	@Override
//	public Dimension getMaximumSize(JComponent jc) {
//		if (isToolbarFixed) { // default is true; false only for TextUI
//			Container parent = jc.getParent();
//			String parentClass = (parent == null ? null : parent.getUIClassID());
//			if ("ToolBarUI" == parentClass)
//				return getPreferredSize();
//		}
//		return getPreferredSize();
//	}

	/**
	 * getPreferredSize reports to a LayoutManager what the size is for this
	 * component will be when placed in the DOM.
	 * 
	 * It is only called if the user has not already set the preferred size of the
	 * component.
	 * 
	 * Later, the LayoutManager will make a call to setBounds in order to complete
	 * the transaction, after taking everything into consideration.
	 * 
	 */
	@Override
	public Dimension getPreferredSize(JComponent jc) {
		return getHTMLSizePreferred(updateDOMNode(), false);
	}

	/**
	 * 
	 * Returns <code>true</code> if the specified <i>x,y</i> location is contained
	 * within the look and feel's defined shape of the specified component.
	 * <code>x</code> and <code>y</code> are defined to be relative to the
	 * coordinate system of the specified component. Although a component's
	 * <code>bounds</code> is constrained to a rectangle, this method provides the
	 * means for defining a non-rectangular shape within those bounds for the
	 * purpose of hit detection.
	 * 
	 * @param c the component where the <i>x,y</i> location is being queried; this
	 *          argument is often ignored, but might be used if the UI object is
	 *          stateless and shared by multiple components
	 * @param x the <i>x</i> coordinate of the point
	 * @param y the <i>y</i> coordinate of the point
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
	 * returns an instance of that UI delegate subclass. If the UI delegate subclass
	 * is stateless, it may return an instance that is shared by multiple
	 * components. If the UI delegate is stateful, then it should return a new
	 * instance per component. The default implementation of this method throws an
	 * error, as it should never be invoked.
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
	 * Returns the baseline. The baseline is measured from the top of the component.
	 * This method is primarily meant for <code>LayoutManager</code>s to align
	 * components along their baseline. A return value less than 0 indicates this
	 * component does not have a reasonable baseline and that
	 * <code>LayoutManager</code>s should not align this component on its baseline.
	 * <p>
	 * This method returns -1. Subclasses that have a meaningful baseline should
	 * override appropriately.
	 * 
	 * @param c      <code>JComponent</code> baseline is being requested for
	 * @param width  the width to get the baseline for
	 * @param height the height to get the baseline for
	 * @throws NullPointerException     if <code>c</code> is <code>null</code>
	 * @throws IllegalArgumentException if width or height is &lt; 0
	 * @return baseline or a value &lt; 0 indicating there is no reasonable baseline
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
	 * Returns an enum indicating how the baseline of he component changes as the
	 * size changes. This method is primarily meant for layout managers and GUI
	 * builders.
	 * <p>
	 * This method returns <code>BaselineResizeBehavior.OTHER</code>. Subclasses
	 * that support a baseline should override appropriately.
	 * 
	 * @param c <code>JComponent</code> to return baseline resize behavior for
	 * @return an enum indicating how the baseline changes as the component size
	 *         changes
	 * @throws NullPointerException if <code>c</code> is <code>null</code>
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
	 * overridden in JSPasswordFieldUI and JSEditorPane
	 * 
	 * @return text
	 */
	public String getJSTextValue() {
		return (String) DOMNode.getAttr(domNode, valueNode == null ? "innerText" : "value");
	}

	DOMNode getOuterNode() {
		return (outerNode == null && !isUIDisabled ? setHTMLElement() : outerNode);
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
		setVisible(getOuterNode(), b);
	}
	
	public void setVisible(DOMNode node, boolean b) {
		if (!b && cellComponent != null)
			return;
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

	protected void enableNode(DOMNode node, boolean b) {
		if (node == null)
			return;
		DOMNode.setAttr(node, "disabled", (b ? null : "TRUE"));
		if (!b && inactiveForeground == colorUNKNOWN)
			getDisabledColors(getPropertyPrefix());
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
		inactiveBackground = UIManager.getColor(pp + ".inactiveBackground");
		inactiveForeground = UIManager.getColor(pp + ".inactiveForeground");
	}

	@Override
	public void setBounds(int x, int y, int width, int height, int op) {
		if (isUIDisabled)
			return;
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

	protected void setJSDimensions(int width, int height) {
		if (jsActualWidth > 0)
			width = jsActualWidth;
		if (jsActualHeight > 0)
			height = jsActualHeight;
		DOMNode.setSize(domNode, width, height);
		if (outerNode != null) {
			DOMNode.setSize(outerNode, width, height);
		}
//		if (menuAnchorNode != null) {
//			DOMNode.setSize(menuAnchorNode, width, height);
//		}
	}

	protected void setInnerComponentBounds(int width, int height) {
		if (debugging)
			System.out.println("CUI reshapeMe: need to reshape " + id + " w:" + this.width + "->" + width + " h:"
					+ this.height + "->" + height);
	}

	private ImageIcon getIcon(JSComponent c, Icon icon) {
		return (c == null || icon == null && (icon = ((AbstractButton) c).getIcon()) == null ? null
				: icon.getIconWidth() <= 0 || icon.getIconHeight() <= 0 ? null
						: (icon instanceof ImageIcon) ? (ImageIcon) icon : JSToolkit.createImageIcon(jc, icon, id + "tmpIcon"));
	}

	protected void setIconAndText(String prop, Icon icon, int gap, String text) {

		if (iconNode == null && textNode == null)
			return;

		// TODO so, actually, icons replace the checkbox or radio button, they do not
		// complement them

		setMnemonic(-1);
		actualWidth = actualHeight = 0;
		currentText = text;
		currentGap = gap;
		currentIcon = null;
		imageNode = null;
		if (iconNode != null) {
			icon = currentIcon = getIcon(jc, icon);
			$(iconNode).empty();
			if (currentIcon != null) {
				imageNode = DOMNode.getImageNode(currentIcon.getImage());
				iconNode.appendChild(imageNode);
				iconHeight = icon.getIconHeight();
				DOMNode.setStyles(imageNode, "visibility", (isLabel ? "hidden" : null));
				DOMNode.setStyles(iconNode, "height", iconHeight + "px", "width", icon.getIconWidth() + "px");
			}
		}
		if (text == null || text.length() == 0) {
			text = "";
		} else {
			DOMNode.setStyles(textNode, "white-space", "nowrap");
			if (icon == null) {
				// tool tip does not allow text alignment
				if (iconNode != null && allowTextAlignment 
						&& isMenuItem && actionNode == null && text != null) {
					DOMNode.addHorizontalGap(iconNode, gap + MENUITEM_OFFSET);
				}
			} else {
				// vCenter(imageNode, 10); // perhaps? Not sure if this is a
				// good idea
				if (gap == Integer.MAX_VALUE)
					gap = getDefaultIconTextGap();
				if (gap != 0 && text != null)
					DOMNode.addHorizontalGap(iconNode, gap);
			}
			isHTML = false;
			if (text.indexOf("<html>") == 0) {
				isHTML = true;
				// PhET uses <html> in labels and uses </br>
				text = PT.rep(text.substring(6, text.length() - 7), "</br>", "");
				text = PT.rep(text, "</html>", "");
				text = PT.rep(text, "href=", "target=_blank href=");
			} else if (jc.getClientProperty("html") != null) {
				isHTML = true;
			} else if (mnemonicIndex >= 0) {
				int i = mnemonicIndex;
				isHTML = true;
				if (i < text.length())
					text = text.substring(0, i) + "<u>" + text.substring(i, i + 1) + "</u>" + text.substring(i + 1);
			}
		}
		DOMNode obj = null;
		if (textNode != null) {
			prop = "innerHTML";
			obj = textNode;
			setCssFont(textNode, c.getFont());
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
		if (valueNode != null) {
			setBackgroundFor(valueNode, c.getBackground());
		}
		if (debugging)
			System.out.println("JSComponentUI: setting " + id + " " + prop);
	}

	protected int getDefaultIconTextGap() {
		return 0;
	}

	protected Insets insets;

	protected Icon icon;
	protected Rectangle viewR, iconR, textR;

	protected Dimension preferredDim;

	protected static Insets zeroInsets = new Insets(0, 0, 0, 0);
	
	protected void getJSInsets() {
		if (insets == null)
			insets = new Insets(0, 0, 0, 0);
		jc.getInsets(insets);
	}

	public void setButtonRectangles(boolean isPreferred) {
		if (iconR == null) {
			iconR = new Rectangle();
			textR = new Rectangle();
			viewR = new Rectangle();
		}
		getJSInsets();
		if (isPreferred) {
			viewR.width = Short.MAX_VALUE;
			viewR.height = Short.MAX_VALUE;
		} else {
			viewR.x = 0;
			viewR.y = 0;
			viewR.width = width - insets.right - insets.left;
			viewR.height = height - insets.bottom - insets.top;		
		}
		iconR.width = -1;
		if (isMenuItem && actionNode != null) {
			iconR.width = iconR.height = 15;
		} else if (icon == null && iconNode != null) {
			Dimension d = getHTMLSize(iconNode);
			iconR.width = d.width;
			iconR.height = d.height;
		}
		iconR.x = iconR.y = textR.x = textR.y = 0;
	}
	
	protected void setAlignment() {
		if (allowTextAlignment && centeringNode != null)
			setAlignments((AbstractButton)jc);
	}

	protected void addCentering(DOMNode node) {
		if (iconNode == null)
			iconNode = newDOMObject("span", id + "_icon");
		textNode = newDOMObject("span", id + "_txt");
		centeringNode = newDOMObject("span", id + "_ctr");
		centeringNode.appendChild(iconNode);
		centeringNode.appendChild(textNode);
		node.appendChild(centeringNode);
	}

	protected void updateCenteringNode() {
//		// old code -- label only -- is this advisable? 
//		if (actualHeight > 0)
//			DOMNode.setStyles(centeringNode, "position", "absolute", "height",
//					actualHeight + "px");
//		if (actualWidth > 0)
//			DOMNode.setStyles(centeringNode, "position", "absolute", "width",
//					actualWidth + "px");
	}

	protected void setAlignments(AbstractButton b) {
		setAlignments(b, false);
	}
	
	protected void setAlignments(AbstractButton b, boolean justGetPreferred) {
		int hTextPos = b.getHorizontalTextPosition();
		int hAlign = b.getHorizontalAlignment();
		int vAlign = b.getVerticalAlignment();
		int vTextPos = b.getVerticalTextPosition();

		getJSInsets();
		Dimension dimIcon = getIconSize(b);
		Dimension dimText = getTextSize(b);
		int wIcon = (actionNode != null ? (isMenuItem ? 15 : 20)
				: dimIcon == null ? 0 : Math.max(0, dimIcon.width));
		int wText = (dimText == null ? 0 : dimText.width);
		int gap = (wText == 0 || wIcon == 0 ? 0 : b.getIconTextGap());
		int w = cellComponent != null ? cellWidth : $(domNode).width();
		boolean alignVCenter = (vAlign == SwingConstants.CENTER);
		Insets margins = (isLabel ? insets : b.getMargin());
		if (margins == null)
			margins = zeroInsets;
		int h = (dimText == null ? 0 : dimText.height);
		int ih = (dimIcon == null ? 0 : dimIcon.height);
		int hCtr = Math.max(h, ih);
		int wCtr = wIcon + gap + wText;
		int wAccel = 0;
		String accel = null;
		// setHTMLSize1((buttonNode == null ? domNode : centeringNode), false,
		// false).width;
		// But we need to slightly underestimate it so that the
		// width of label + button does not go over the total calculated width

		// horizontalTextAlignment leading,left-to-right:
		// horizontalTextAlignment trailing,right-to-left:
		//
		// text [btn].....
		//

		// horizontalTextAlignment trailing,left-to-right
		//
		// [btn] text.....
		//

		// horizontalTextAlignment trailing,right-to-left:
		//
		// .....text [btn]
		//

		// horizontalTextAlignment leading,right-to-left
		//
		// .....[btn] text
		//

		// horizontalTextAlignment center, valign top
		// text
		// [btn]

		// horizontalTextAlignment center, valign bottom
		// [btn]
		// text

		// horizontalTextAlignment center, valign center
		// [btn/text] can be on top of each other

		boolean ltr = jc.getComponentOrientation().isLeftToRight();
		boolean alignLeft, alignRight, alignHCenter, textRight;
		if (menuAnchorNode == null) {
			alignLeft = (w == 0 || hAlign == SwingConstants.LEFT
					|| hAlign == (ltr ? SwingConstants.LEADING : SwingConstants.TRAILING));
			alignRight = w != 0 && (hAlign == SwingConstants.RIGHT
					|| hAlign == (ltr ? SwingConstants.TRAILING : SwingConstants.LEADING));
			alignHCenter = (!alignLeft && !alignRight);
			textRight = (hTextPos == SwingConstants.RIGHT
					|| hTextPos == (ltr ? SwingConstants.TRAILING : SwingConstants.LEADING));
		} else {
			// menus are far simpler!
			alignLeft = ltr;
			alignRight = !ltr;
			alignHCenter = false;
			textRight = ltr;
			accel = (b instanceof JMenuItem ? getAccelStr((JMenuItem) b): null);
			DOMNode accelNode = menuAnchorNode;
			accelNode = /** @j2sNative accelNode.children[1] || */null;
			if ((accelNode == null) != (accel == null)) {
				if (accel == null) {
					DOMNode.remove(accelNode);
				} else { 
					menuAnchorNode.appendChild(accelNode = DOMNode.createElement("span", id + "_acc"));
					addClass(accelNode, "ui-menu-accel");
					DOMNode.setAttr(accelNode, "role", "menuitem");
					DOMNode.setStyles(accelNode,  "font-size", "10px");
					setMenuItem(accelNode);
				}
			}
			if (accel != null) {
				DOMNode.setStyles(accelNode, "float", null);
				DOMNode.setAttr(accelNode, "innerHTML", accel);// = accel + "\u00A0\u00A0");
				wAccel = getHTMLSize(accelNode).width; 
				DOMNode.setStyles(accelNode, 
						"float", ltr ? "right" : "left", 
						"text-align", ltr ? "right" : "left",
						"margin", "0px 5px",
						"transform", "translateY(15%)");
			}
			DOMNode.setStyles(menuAnchorNode, "width", "95%", "min-width", (wCtr + wAccel + margins.left + margins.right) + "px");			
		}

		if (alignHCenter) {
			switch (hTextPos) {
			case SwingConstants.TOP:
			case SwingConstants.BOTTOM:
				hCtr = ih + gap + h;
				/* fall through */
			case SwingConstants.CENTER:
				wCtr = Math.max(wIcon, wText);
				break;
			}
		}
		if (justGetPreferred) {
			if (preferredDim == null)
				preferredDim = new Dimension();
			preferredDim.width = wCtr + margins.left + margins.right;
			preferredDim.height = hCtr + margins.top + margins.bottom;
			return;
		}
		preferredDim = null;

		DOMNode.setStyles(centeringNode, "position", "absolute", "top", null, "left", null, "transform", null);
		if (alignHCenter && alignVCenter && wIcon == 0
				|| wText == 0 && margins.left == margins.right && margins.top == margins.bottom) {
			// simple totally centered label or button
			DOMNode.setStyles(centeringNode, "top", "50%", "left", "50%", "transform",
					"translateX(-50%)translateY(-50%)");
			return;
		}

		DOMNode.setStyles(centeringNode, "width", wCtr + "px", "height", hCtr + "px");
		DOMNode.setStyles(iconNode, "position", "absolute", "top", null, "left", null, "transform", null);
		DOMNode.setStyles(textNode, "position", "absolute", "top", null, "left", null, "transform", null);

		
		int left = -1;

		if (menuAnchorNode == null) {
			if (alignHCenter) {
				switch (hTextPos) {
				case SwingConstants.TOP:
				case SwingConstants.BOTTOM:
				case SwingConstants.CENTER:
					DOMNode.setStyles(textNode, "left", ((wCtr - wText) / 2) + "px");
					DOMNode.setStyles(iconNode, "left", ((wCtr - wIcon) / 2) + "px");
					break;
				default:
					int off = wCtr / 2;
					if (textRight) {
						DOMNode.setStyles(iconNode, "left", "0px");
						DOMNode.setStyles(textNode, "left", (gap + wIcon) + "px");
					} else {
						DOMNode.setStyles(textNode, "left", off + "px");
						DOMNode.setStyles(iconNode, "left", (gap + wText) + "px");
					}
					break;
				}
				left = (w - wCtr + margins.left - margins.right) / 2;
			} else if (alignRight) {
				left = w - wCtr - margins.right;
				if (textRight) {
					DOMNode.setStyles(textNode, "left", (wCtr - wText) + "px");
					DOMNode.setStyles(iconNode, "left", "0px");
				} else {
					DOMNode.setStyles(textNode, "left", "0px");
					DOMNode.setStyles(iconNode, "left", (wCtr - wIcon) + "px");
				}
			} else {
				left = margins.left;
				if (textRight) {
					int off = (!isMenuItem || ltr || actionNode != null ? 0 : actionItemOffset);
					DOMNode.setStyles(iconNode, "left", off + "px");
					DOMNode.setStyles(textNode, "left", (wIcon + gap) + "px");
				} else {
					DOMNode.setStyles(textNode, "left", (!isMenuItem ? 0 : ltr ? actionItemOffset : -3) + "px");
					DOMNode.setStyles(iconNode, "left", (wText + gap) + "px");
				}
			}
			DOMNode.setStyles(centeringNode, "left", left + "px");
		} else {
			if (alignRight) {
				DOMNode.setStyles(itemNode, "text-align", "right");
				DOMNode.setStyles(centeringNode,  "right", "0px");
				DOMNode.setStyles(textNode, "right", "23px");
				DOMNode.setStyles(iconNode, "right", "3px");
			} else {
				DOMNode.setStyles(itemNode, "text-align", "left");
				DOMNode.setStyles(centeringNode,  "left", "0px");
				DOMNode.setStyles(iconNode, "left", "3px");
				DOMNode.setStyles(textNode, "left", "23px");
			}
		}

		int top = margins.top;

		h = c.getHeight();
		if (h == 0) {
			h = 16;
		}

		if (menuAnchorNode == null) {
			switch (vAlign) {
			case SwingConstants.TOP:
				break;
			case SwingConstants.BOTTOM:
				top = h - margins.bottom - hCtr;
				break;
			default:
			case SwingConstants.CENTER:
				top = (h - hCtr + margins.top - margins.bottom) / 2;
				break;
			}
			DOMNode.setStyles(centeringNode, "top", top + "px");
			int itop;
			String iscale = null;
			switch (vTextPos) {
			case SwingConstants.TOP:
				top = itop = 0;
				break;
			default:
			case SwingConstants.CENTER:
				top = itop = 50;
				if (iconNode == actionNode) {
					itop = 70;
					iscale = "scale(0.6,0.6)";
				}
				break;
			case SwingConstants.BOTTOM:
				top = itop = 100;
				break;
			}
			DOMNode.setStyles(textNode, "top", top + "%", "transform", "translateY(-" + top + "%)");
			DOMNode.setStyles(iconNode, "top", top + "%", "transform",
					"translateY(-" + itop + "%)" + (iscale == null ? "" : iscale));
		} else {			
			DOMNode.setStyles(menuAnchorNode, "height", h + "px");
			DOMNode.setStyles(textNode, "top", "50%", "transform", "translateY(-60%)");
			DOMNode.setStyles(iconNode, "top", "50%", "transform", "translateY(-80%) scale(0.6,0.6)");
		}
	}

	private String getAccelStr(JMenuItem b) {
		KeyStroke ks = b.getAccelerator();
		if (ks != null) {
			return KeyEvent.getKeyModifiersText(ks.getModifiers()) + "-" +
		               KeyEvent.getKeyText(ks.getKeyCode());
		}
		return null;
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
		if (isUIDisabled)
			return;
		if (cellComponent != null) {
			DOMNode.setVisible(domNode, false);
			return;
		}
		isDisposed = true;
		DOMNode.dispose(domNode);
		if (domNode != outerNode)
			DOMNode.dispose(outerNode);
	}


	/**
	 * 
	 * This control has been added back to some other node after being disposed of.
	 * So now we need to undo that.
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
		if (node == null || isMenuItem || isUIDisabled)
			return;
		// if (color == null) // from paintComponentSafely
		DOMNode.setStyles(node, "background-color", color == null ? null : JSToolkit.getCSSColor(color == null ? rootPaneColor : color));
		if (allowPaintedBackground && selfOrParentBackgroundPainted())
			setTransparent(node);
		else
			checkTransparent(node);
		
	}

	public boolean selfOrParentBackgroundPainted() {
		JSComponent c = jc;
		JSComponent p = targetParent;
		while (c != null) {
			if (c._isBackgroundPainted)
				return true;
			c = (JSComponent) (p == null ? c.getParent() : p);
			p = null;
		}
		return false;
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

	private void setTransparent(DOMNode node) {
		if (allowPaintedBackground)
			DOMNode.setStyles(node, "background", "transparent");
	}

	@Override
	public void setFont(Font f) {
		if (domNode != null && !isUIDisabled)
			setCssFont((textNode == null ? domNode : textNode), f);
	}

	@Override
	public void updateCursorImmediately() {
		if (isUIDisabled)
			return;
		setHTMLElement();
		String curs = JSToolkit.getCursorName(c.getCursor());
		DOMNode.setStyles(outerNode, "cursor", curs);
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
	}

	@Override
	public Rectangle getBounds() {
		JSUtil.notImplemented("");
		return null;
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
		 *            while (node && !node.style["z-index"]) node = node.parentElement;
		 *            z = parseInt(node.style["z-index"]); return(!z || isNaN(z) ?
		 *            100000 : z);
		 */
		{
			return z;
		}
	}

	// /////////////////////////// ContainerPeer ///////////////////////////

	// all Swing components are containers

	@Override
	public Insets getInsets() {
		// In lieu of a JComponent border, the UI is responsible for setting 
		// the inset that is calculated into the position of the component
		return null;
	}

	@Override
	public void beginValidate() {
		// TODO Auto-generated method stub

	}

	@Override
	public void endValidate() {
		if (!isUIDisabled)
			setHTMLElement();
	}

	@Override
	public void beginLayout() {
		// hide if not a panel and bounds have not been set.
		if (!boundsSet && !isContainer)
			setVisible(false);
		isLaidOut = false;
		layingOut = true;
	}

	boolean isLaidOut;
	
	@Override
	public void endLayout() {
		layingOut = false;
		isLaidOut = true;
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
	 * We allow here for an off-screen graphic for which the paint operation also
	 * sets its location.
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

	@Override
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
		J2S.setDragDropTarget(c, getDOMNode(), dropTarget != null);
	}

	public void setZOrder(int z) {
		DOMNode.setPositionAbsolute(domNode);
		DOMNode.setZ(domNode, z);
		DOMNode.setZ(outerNode, z);// saves it
	}

	public void invalidate() {
		setTainted();
	}

	/**
	 * mouseenter for a menuItem 
	 * @param target
	 * @param eventType
	 * @param jQueryEvent
	 */
	protected void checkStopPopupMenuTimer(Object target, int eventType, Object jQueryEvent) {
		if (target == domNode && eventType == -1) {
			String type = (/** @j2sNative jQueryEvent.type || */"");
			if (type.equals("mouseenter")) {
				stopPopupMenuTimer();
			}
		}
	}

	/**
	 * Called from JSMenuUI in a JMenuBar to start a timer that closes the popup window after a short period.
	 *  
	 * @param ui
	 */
	protected void startPopupMenuTimer() {
		JSPopupMenuUI ui = (JSPopupMenuUI) ((JMenu) jc).getPopupMenu().getUI();
		ui.menuTimer = /** @j2sNative setTimeout(function() { ui.hideMenu$()},1000) || */0;
	}

	/**
	 * Called from JSMenuUI, JSMenuItem, and JSRadioButtonUI to stop the the popup window timer so that it can persist.
	 *  
	 * @param ui
	 */
	protected void stopPopupMenuTimer() {
		JSPopupMenuUI ui = (JSPopupMenuUI) (isPopupMenu ? this : jc.getParent().getUI());
		int timer = ui.menuTimer;
		if (timer != 0) { 
		  /** @j2sNative
		   *  
		   *   clearTimeout(timer); 
		   */
		  ui.menuTimer = 0;
		}
	}

	public void setRenderer(JSComponent rendererComponent, int width, int height) {
		// We must disable the UI after painting so that when 
		// the next cell is chosen we do not act on the previous cell
		// in table.prepareRenderer(...) prior to assigning the desired table cell.
		//System.out.println(this.id + " " + rendererComponent + " " + width + " " + height);
		setComponent((JComponent) rendererComponent);
		if (isUIDisabled)
			return;
		cellComponent = rendererComponent;		
		backgroundPainted = false;
		if (width == 0)
			return;
		cellWidth = width;
		cellHeight = height;
	}

	public void reinstallUI(JComponent oldC, JComponent newC) {
        uninstallUI(oldC);
        uninstallJS();
        if (newC != null) {
        	// JPopupMenu
        	installJS();
        	installUI(newC);
        }
	}

}
