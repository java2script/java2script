package swingjs.plaf;

import java.awt.AWTEvent;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Dimension;
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
import java.awt.Window;
import java.awt.dnd.DropTarget;
import java.awt.dnd.peer.DropTargetPeer;
import java.awt.event.KeyEvent;
import java.awt.event.PaintEvent;
import java.awt.image.BufferedImage;
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
import javax.swing.JLayeredPane;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;
import javax.swing.JRootPane;
import javax.swing.JTable.BooleanRenderer;
import javax.swing.KeyStroke;
import javax.swing.SwingConstants;
import javax.swing.ToolTipManager;
import javax.swing.UIManager;
import javax.swing.border.CompoundBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.ComponentUI;
import javax.swing.plaf.UIResource;

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
import swingjs.api.js.JSFunction;

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
 * event directly, bypassing the Java dispatch system entirely, if desired.
 * 
 * This method is used for specific operations, including JFrame closing,
 * JComboBox selection, and JSText key action handling. This connection is set up in
 * JSComponentUI.setDataUI() and handled by overriding
 * JSComponentUI.handleJSEvent().  The handleJSEvent will pass on to
 * the standard Java key event processing mechanism.  
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
		implements JSEventHandler, PropertyChangeListener, ChangeListener, DropTargetPeer {

	public interface Embeddable {
		Object getEmbedded(String type);
	}

	private static final int MENUITEM_OFFSET = 11;

	final J2SInterface J2S = JSUtil.J2S;
	
	public boolean isNull;

	/**
	 * provides a unique id for any component; set on instantiation
	 */
	protected static int incr;

//	/**
//	 * Set this during run time using swingjs.plaf.JSComponentUI.borderTest = true
//	 * to debug alignments
//	 */
//	private static boolean borderTest;

	/**
	 * Derived from swingjs.JSToolkit.debugger. Set this during run time using
	 * swingjs.plaf.JSComponentUI.debugger = true to give detailed debugging
	 * messages
	 */
	protected static boolean debugging;

	/**
	 * this initial unique id, such as testApplet_EditorPaneUI_1553
	 */
	protected String id0;

	/**
	 * a unique id for a given revision of an element, such as
	 * testApplet_EditorPaneUI_1553_1611
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
	 * we can send the coordinates to retrieve the row and cell and also set the 
	 * background to transparent if need be.
	 * 
	 */
	private JComponent targetParent;

	public void setTargetParent(JComponent table) {
		targetParent = table;
	}


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
	protected void saveCellNodes(DOMNode td, boolean isHeader) {
		outerNode = null;
		reInit(true);
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
		
		//System.err.println("JSCUI td saved " + tableID);
		
		updateTableCell(td, isHeader);
	}

	/**
	 * We must make sure that the table cell actually holds this DOMNode
	 * @param td
	 */
	private void updateTableCell(DOMNode td, boolean andAdd) {
		DOMNode node = DOMNode.firstChild(td);
		if (node != domNode) {
			if (isLabel || buttonNode != null) {
				$(td).empty();
			} else {
				DOMNode.detachAll(td);
				setHTMLElement();
			}
			node = null;
			//if (andAdd) 
				td.appendChild(domNode);
			//else
				node = domNode;
			DOMNode.setAttr(td, "domNode", node);
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
	public DOMNode centeringNode;

	/**
	 * an icon image -- non-null means we do have an icon
	 * 
	 */
	public DOMNode imageNode;

	/**
	 * the HTML5 input element being pressed, if the control is a radio or checkbox
	 * button
	 * 
	 */
	protected DOMNode actionNode;

	/**
	 * the "FOR" label for a radio button; the Button element itself for simple buttons 
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
	 * a numerical reference for an ID
	 */
	protected int num;

	/**
	 * a flag to indicate that this is an AWT component
	 * 
	 */
	public boolean isAWT;

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
	 * indicates not to add it to the DOM
	 */
	private boolean isPaintedOnly;

	/**
	 * container is between the HTML5 canvas and a component that paints itself
	 */
	private boolean inPaintPath;
	

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
					  isContentPane, isLayeredPane, isPanel, isDesktop, isTable;

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
//	private DOMNode document;
	protected HTML5Applet applet; // used in getting z value, setting frame
									// mouse
									// actions

	protected boolean needPreferred;

	protected int width;
	protected int height;

	private DOMNode waitImage;

	protected final Color colorUNKNOWN = new Color();

	protected Color inactiveForeground = colorUNKNOWN, 
			inactiveBackground = colorUNKNOWN;

	/**
	 * from JButton.isEnabled()
	 */
	private boolean enabled = true;

	/**
	 * processed text (local to setIconAndText) is HTML
	 */
	protected boolean isHTML;

	/**
	 * set false for tool tip or other non-label object that has text
	 * 
	 */
	protected boolean allowTextAlignment = true;

	protected static JQuery jquery = JSUtil.getJQuery();

	/**
	 * A static flag indicating that we have a menu open
	 */
	protected static boolean isMenuOpen;

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
		body = /** @j2sNative document.body ||*/ null;

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
		setUIDisabled(comp == null);
	}

	/**
	 * required call to fully set up the UI
	 * @param target
	 * @return
	 */
	public JSComponentUI set(JComponent target) {
		// note that in JavaScript, in certain cases
		// (JFrame, JWindow, JDialog)
		// target will not be a JComponent,
		// but it will always be a JSComponent, and
		// we do not care if it is not a JComponent.
		setComponent(target);
		isAWT = jc.秘isAWT();
		applet = JSToolkit.getHTML5Applet(c);
		newID(false);
		// don't do this -- will break JSTableUI.installListeners:    target.ui = this;
		installUI(target); // need to do this immediately, not later
		installJS();
		if (needPreferred) // only slider needs this
			getHTMLSizePreferred(updateDOMNode(), false);
		return this;
	}

	protected void newID(boolean forceNew) {
		classID = c.getUIClassID();
		notImplemented = (classID == "ComponentUI");
		boolean firstTime = (id0 == null);
		if (firstTime || forceNew) {
			num = ++incr;
			id = c.getHTMLName(classID);
			if (firstTime) 
				id0 = id;
			id += "_" + num;
		}
	}

	/**
	 * Retrieve the node for a list or table, and then clear this renderer
	 * so that it can rebuild a new domNode for the next cell.
	 * @return
	 */
	public DOMNode getListNode() {
		DOMNode node = reInit(true);
	    reInit(false);
		return node;
	}


	/**
	 * This must remain the only place that domNode is set to null;
	 */
	public DOMNode reInit(boolean getNew) {
		setTainted();
		if (domNode != null) {
			DOMNode.dispose(domNode);
		}
		domNode = null;
		keysEnabled = false;
		newID(true);
		return (getNew ? getDOMNode() : null);
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

	
	/**
	 * Sends key events through JSMouse
	 * 
	 * @param node
	 */
	protected void setDataKeyComponent(DOMNode node) {
		DOMNode.setAttr(node, "data-keycomponent", c);
	}

	/**
	 * Sends key events through JSMouse to a DIFFERENT component;
	 * used for JComboBox to pass events to JList even though JList
	 * is not actually there.
	 * 
	 * @param node
	 */
	protected void setDataShadowKeyComponent(DOMNode node, Component c) {
		DOMNode.setAttr(node, "data-shadowkeycomponent", c);
	}

	/**
	 * 
	 * @param node
	 */
	protected void setDataFocusComponent(DOMNode node) {
		DOMNode.setAttr(node, "data-focuscomponent", c);
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

	protected static void hideMenusAndToolTip() {
		if (isMenuOpen)
			JSPopupMenuUI.closeAllMenus();
		hideTooltip();
	}
	
	@SuppressWarnings("unused")
	protected static void hideTooltip() {
		if (/** @j2sNative javax.swing.ToolTipManager ||*/false)
			ToolTipManager.j2sHideToolTip();
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
		if (node == null)
			return;
		addClass(node, "ui-j2smenu-node");
		setDataComponent(node);
//		setDataUI(iconNode);
	}

	/**
	 * Set j2sApplet to capture jQuery mouse events and turn them into Java MouseEvents. 
	 * Used by JSWindowUI and JTextArea to indicate that it is to be the "currentTarget" for mouse 
	 * clicks. 
	 */
	protected void setJ2sMouseHandler() {
		// The DOM attributes applet and _frameViewer are necessary for proper 
		// direction to the target
		J2S.unsetMouse(domNode);
		if (domNode == null)// BH GCC found semi here: ;
			updateDOMNode();
		DOMNode.setAttrs(domNode, "applet", applet, "_frameViewer", jc.getFrameViewer());
		J2S.setMouse(domNode, true);
	}

	/**
	 * Fired by JSComponent when key listeners are registered.
	 * Will NOT be created from ui.installUI() since component.ui 
	 * will not have been created yet. 
	 * 
	 * @param on
	 */
	public void enableJSKeys(boolean on) {
		if (isUIDisabled)
			return;
		if (!on) {
			setTabIndex(Integer.MIN_VALUE);
		} else if (keysEnabled) {
			setTabIndex(-1);
		} else {
			addFocusHandler();
		}
	}

	protected void addFocusHandler() {
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

	/**
	 * Called by DefaultFocusTraversalPolicy only.
	 * Overridden to return true in buttons, menu items, JEditorPane, JTextPane, JTextArea
	 */
	@Override
	public boolean isFocusable() {
		// meaning "can use TAB to set their focus" within a focus cycle
		return false;
		// from ComponentPeer
		// file:///C:/Users/hansonr/git/jdk8u-jdk/src/share/classes/java/awt/doc-files/FocusSpec.html
		//
		// The recommendations for Windows and Unix are that Canvases, Labels, Panels,
		// Scrollbars, ScrollPanes, Windows, and lightweight Components have
		// non-focusable peers, and all other Components have focusable peers.
		
		// Q: What is left? Maybe SUBCLASSES of Window. This makes little sense. 
		// I have implemented this in SwingJS as:
		
		// by default peers are not focusable
		// AbstractButton, other than menu item buttons, are focusable
		// TextFields are focusable.
		
		
		
//		return (jc.isFocusable() && setFocusable());
	}

	public boolean setFocusable() {
		if (focusNode == null) 
		  addFocusHandler();
		if (focusNode != null)
			addJQueryFocusCallbacks();
		return (focusNode != null);
	}

	public boolean hasFocus() {
		return /**
				 * @j2sNative document.activeElement == this.focusNode||
				 */false;
	}

	private Runnable focusRunnable = new Runnable() {

		@Override
		public void run() {
			focus();
		}
		
	};

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
	 * for Window and JApplet
	 */
	protected void setComponentFocus() {
		jc.requestFocus();
		Component c = jc.getFocusTraversalPolicy().getDefaultComponent(jc);
		if (c != null)
			c.requestFocus();
	}

	/**
	 * A Window ComponentPeer method called from Component.requestFocusHelper
	 * in response to a requestFocus() call.
	 * 
	 * @param me  The lightweight component to receive the focus.
	 * @param temporary ignored
	 * @param focusedWindowChangeAllowed ignored
	 * @param time ignored
	 * @param cause ignored
	 * @return true if successful
	 */
	@Override
	public boolean requestFocus(Component me, boolean temporary, boolean focusedWindowChangeAllowed, long time,
			Cause cause) {
		if (me == null)
			return focus();
		if (!me.isFocusable())
			return false;
		JSComponentUI ui = ((JSComponent) me).秘getUI();
		ui.setFocusable();
		JSToolkit.dispatch(ui.focusRunnable, 50, 0);
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

		/**
		 * @j2sNative
		 * 
		 * 			node.focus(function(e) {
		 * 				//System.out.println("JSSCUI node.focus() callback " + me.id + "  " + document.activeElement.id + " " + me.ignoreFocus);
		 *              if (!me.ignoreFocus)
		 * 				me.handleJSFocus$O$O$Z(me.jc, e.relatedTarget, true);
		 * 				me.ignoreFocus = false;
		 *              //System.out.println("JSSCUI focus " + me.id);
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
		setThread();
		JSFocusPeer.handleJSFocus(jco, related, focusGained);
	}

	protected void setThread() {
		JSToolkit.setThreadForViewer(jc.getFrameViewer());
	}


	/**
	 * Internal: Directly fire KFM events for button press from JComponent.doClick() 
	 */
	@SuppressWarnings("unused")
	public void abstractButtonFocusHack() {
		if (jc == null)
			return;
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
	 * for DOMNode will be turning into boolean true/false for attribute
	 */
	protected final static String TRUE = "秘TRUE";
	protected final static String FALSE = "秘FALSE";
	protected final static String NULL = null;
	/**
	 * for jQuery return
	 */
	protected final static boolean CONSUMED = false;
	protected final static boolean NOT_CONSUMED = true;
	
	/**
	 * for SetMouse check
	 */
	public final static boolean HANDLED = true;
	public final static boolean NOT_HANDLED = false;
	
    protected static final int SOME_MOUSE_EVENT = -1;
    protected static final int SOME_KEY_EVENT = -2;

	public static final int CONTENT_PANE_Z = -30000;

	/**
	 * Set the node to accept key events and possibly focusout
	 * 
	 * @param node
	 * @param andFocusOut
	 */
	protected void bindJSKeyEvents(DOMNode node, boolean addFocus) {
		setDataUI(node);
//		addClass(node, "ui-key"); ??
		keysEnabled = true;
		bindJQueryEvents(node, "keydown keypress keyup" + (addFocus ? " focusout"// dragover drop"
				: ""), SOME_KEY_EVENT);
		
		if (addFocus) {
			addJQueryFocusCallbacks();
		}
	}



	/**
	 * Signal to swingjs2 to ignore the event, as it has been handled already.
	 * 
	 * @param jqevent
	 */
	public static void setIgnoreEvent(Object jqevent) {
		/**
		 * @j2sNative jqevent.originalEvent.xhandled = true;
		 */
	}
	
	public static boolean isIgnoreEvent(Object jqevent) {
		/**
		 * @j2sNative return jqevent.originalEvent.xhandled;
		 */ 
		{
			 return false;
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
		 * f = function(jqevent) {
		 *   me.setThread$(); 
		 *   return me.handleJSEvent$O$I$O(node, eventID, jqevent);
		 *  }
		 */
		{
			setThread();
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
		setTainted(true);
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
	}

	private void updatePropertyAncestor(boolean andSetHTML) {
		// Q: Why is setTainted() within fromButtonListener -- here only, not below?
		setTainted();
		if (andSetHTML) {
			setHTMLElement();
		}
		JComponent p = (JComponent) jc.getParent();
		while (p != null) {
			JSComponentUI parentui = (p == null ? null : p.秘getUI());
			if (parentui != null) {
				parentui.setTainted();
				if (andSetHTML) {
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

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		// domNode null could be a new table component
		if (isUIDisabled)
			return;
		String prop = e.getPropertyName();
		Object value = e.getNewValue();
		if (prop == "jscanvas") {
			addLocalCanvas(false);
		}
		if (domNode == null)
			return;
		
		if (prop == "ancestor") {
			if (isAWT) 
				setAWTFontAndColor((Container) value);
			if (cellComponent != null)
				return;
			updatePropertyAncestor(false);
			if (value == null)
				return;
			if (isDisposed && c.visible && e.getNewValue() != null)
				setVisible(true);
		}
		propertyChangedCUI(e, prop);
	}
	
	protected void addLocalCanvas(boolean forceNew) {
		if (jc.秘g != null && !forceNew)
			return;
		jc.秘g = (JSGraphics2D)(Object) Boolean.TRUE;
		setTainted();
	}

	private Container awttop;
	protected Color awtPeerBG, awtPeerFG;
	
	/**
	 * AWT component background, foreground, and font are all set at the
	 * time of addition to the top-level ancestor -- Applet or Frame, usually.
	 * Maybe PopupMenu? 
	 * 
	 * So we track the top ancestor and only do the setting when that has changed.
	 * 
	 * @param value
	 */
	private void setAWTFontAndColor(Container value) {
		Container top = JSComponent.秘getTopInvokableAncestor(value, false);
		 if (top == this.awttop || (this.awttop = top) == null) {
			 if (top == null) {
				 awtPeerBG = awtPeerFG = null;
			 }
			 return;
		 }
		setBackgroundImpl(awtPeerBG = getBackground());
		setForegroundFor(domNode, awtPeerFG = getForeground());
		setFont(c.getFont());
	}

	/**
	 * plaf ButtonListener and TextListener will call this to update common
	 * properties such as "text".
	 * @param e 
	 * @param prop
	 */
	void propertyChangedFromListener(PropertyChangeEvent e, String prop) {
		if (isUIDisabled)
			return;
		switch (prop) {
		case "ancestor":
			// remove will be too soon to update ancestor
			if (cellComponent != null || e.getNewValue() == null)
				return;
			Container anc = JSComponent.秘getTopInvokableAncestor(c, false);
			updatePropertyAncestor(anc != null && anc.isVisible());
			break;
		}
		propertyChangedCUI(e, prop);
	}
	
	protected void propertyChangedCUI(PropertyChangeEvent e, String prop) {
		// don't want to update a menu until we have to, after its place is set
		// and we know it is not a JMenuBar menu
		if (allowPropertyUpdate() && cellComponent == null)
			getDOMNode();
		
		switch (prop) {
		case JLayeredPane.LAYER_PROPERTY:
			setZ(getInheritedZ() + ((Integer)e.getNewValue()).intValue());
			setTainted();
			return;
		case "border":
			// Simple Buttons have insets that don't overlap with the border.
			//if (!isSimpleButton)
				jc.秘setPaintsSelf(JSComponent.PAINTS_SELF_UNKNOWN);
			setTainted();
			return;
		case "preferredSize":
			// size has been set by JComponent layout
			preferredSize = (Dimension) e.getNewValue(); 
//			getPreferredSize(jc);
			return;
		case "background":
			setBackground(c.getBackground());
			return;
		case "foreground":
			setForeground(c.getForeground());
			return;
		case "focusable":
		    setFocusable();
			return;
		case "opaque":
			setBackground(c.getBackground());// BH was CUI??
			return;
		case "inverted":
			updateDOMNode();
			return;
		case "text":
			String val = ((AbstractButton) c).getText();
			if (val == null ? currentText != null : !val.equals(currentText)) {
				setIconAndText(prop, currentIcon, currentGap, (String) val);
				if (isMenuItem && textNode != null)
					this.setAlignments((AbstractButton) c, true);
			}
			return;
		case "iconTextGap":
			if (iconNode != null) {
				int gap = ((AbstractButton) c).getIconTextGap();
				if (currentGap != gap)
					setIconAndText(prop, currentIcon, gap, currentText);
			}
			return;
		case "icon":
			updateIcon();
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
	
	protected void updateIcon() {
		if (centeringNode != null) {
			// note that we use AbstractButton cast here just because
			// it has a getIcon() method. JavaScript will not care if
			// it is really a JLabel or JOptionPane, which also have icons
			ImageIcon icon = getOrCreateIcon(c, null);
			if (icon == null ? currentIcon != null : !icon.equals(currentIcon))
				setIconAndText("icon", icon, currentGap, currentText);
		}
	}


	protected boolean allowPropertyUpdate() {
		return true;
	}


	protected void setMnemonic(int newValue) {
		// need to handle non-menu mnemonics as well
		if (newValue == mnemonic || domNode == null)
			return;
		if (newValue < 0) {
			newValue = (isLabel ? (label == null ? -1 : label.getDisplayedMnemonic()) 
					: /** @j2sNative this.jc.getMnemonic$ && this.jc.getMnemonic$() ||*/ -1);
			}
		DOMNode node = (menuAnchorNode == null ? domNode : menuAnchorNode);
		if (mnemonic > 0 && newValue != mnemonic)
			removeClass(node, "ui-mnem-" + Character.toLowerCase(mnemonic));
		if (newValue > 0)
			addClass(node, "ui-mnem-" + Character.toLowerCase(newValue));
		mnemonic = newValue;	
	}


	/**
	 * set to TRUE by Container.validateTree at the beginning of its laying out and
	 * FALSE when that is complete.
	 * 
	 */
	protected boolean layingOut;

	/**
	 * has been disposed; will need to reattach it if it ever becomes visible again.
	 * 
	 */
	public boolean isDisposed;

	/**
	 * table cell renderer component
	 * 
	 */
	protected JComponent cellComponent;
	
	/**
	 * table cell width and height
	 */
	private int cellWidth;

	protected int cellHeight;
	
	/**
	 * this ui has been disabled from receiving any events; see JTableUI
	 */
	protected boolean isUIDisabled;

	public boolean setUIDisabled(boolean b) {
		return isUIDisabled = b;
	}



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
	 * (InternalFrame, Button, ComboBox, MenuBar, MenuItem, ScrollBar, TextField, TextArea, EditorPane)
	 */
	public boolean allowPaintedBackground = true;

	/**
	 * Label will render its image, drawing to the canvas; Button will not 
	 * (as of this writing), so we need a flag to know when to not hide it.
	 * 
	 */
	
	protected boolean imagePersists;

	protected boolean allowDivOverflow;

	@SuppressWarnings("unused")
	/**
	 * used in j2sNative focus callback
	 */
	private boolean ignoreFocus;

	/**
	 * a div that the user has created that has a frame-specific name, indicating
	 * that the frame should be embedding in the page within that div. 
	 * 
	 * If this div has style width:0px, then the embedding is not done, and the 
	 * component is completely hidden from view. 
	 * 
	 * If this div is the top-level ancestor of a JDesktopPane, then setting
	 * width:0px both hides this div and causes its internal frames that are not
	 * themselves hidden to be "sticky" -- to float above the page without moving
	 * when the page (body) is scrolled.
	 * 
	 */
	protected DOMNode embeddingNode;

	/**
	 * A sticky frame (specifically for now a JInternalFrame) will take this
	 * attribute, preventing it being added to its desktop parent.
	 */
	protected boolean isSticky;

	/**
	 * an icon created using "jsvideo" as its description
	 */
	protected boolean isVideoIcon;

	private static DOMNode tempDiv;

	/**
	 * we can allow frames -- particularly JInternalFrames in a JDesktopFrame -- to overflow.
	 * 
	 * To do this, we need to make this indication for both the Root pane and the
	 * contentPane for the parent JFrame, as well as the JDesktopPane, if that pane is not the contentPane. 
	 * The developer need only indicate this for the rootPane
	 * 
	 * this.getRootPane().putClientProperty("swingjs.overflow.hidden", "false");
	 * 
	 * 
	 */
	protected void checkAllowDivOverflow() {
		JRootPane root = jc.getRootPane();
		allowDivOverflow = (root != null && "false".equals(root.getClientProperty("swingjs.overflow.hidden")));
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
		if (domNode == null) {
			if (notImplemented) {
				notImplemented = false;
				String s = jc.getClass().getName();
				if (!s.equals("javax.swing.Box$Filler"))
					System.out.println("Swingjs WARNING: default JSComponentUI.updateDOMNode() is being used for " + s);
			}
			domNode = DOMNode.createElement("div", id);
		}
		return domNode;
	}
				
	protected DOMNode updateDOMNodeCUI() {
		if (myCursor != getCursor())
			setCursor();
		if (outerNode != null)
			setVisible(outerNode, jc.isVisible());
		if (pasteHandler != null)
			setPasteHandler(pasteHandler);
		return domNode;
	}


	@Override
	public void updateCursorImmediately() {
		if (isUIDisabled)
			return;
		setHTMLElement(); // for a frame, this is the call that connects it to BODY
		setCursor();
	}
  
	protected void setCursor() {
		myCursor = getCursor();
		String curs = JSToolkit.getCursorName(myCursor);
		DOMNode.setStyle(outerNode, "cursor", curs);
		DOMNode.setStyle(domNode, "cursor", curs);
		setWaitImage(curs == "wait");
	}


	protected Cursor getCursor() {
		Cursor cur = c.getCursor();
		return (cur == Cursor.getDefaultCursor() ? null : cur);		
	}


	protected void setWaitImage(boolean doShow) {
		if (waitImage == null) {
			if (!doShow)
				return;
			String path = (/** @j2sNative this.applet._j2sPath || */null) + "/img/cursor_wait.gif";
			waitImage = newDOMObject("image", id + "_waitImage", "src", path);
		}
		if (doShow)
			$(waitImage).show();
		else
			$(waitImage).hide();
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

		// force the issue
		enabled = !c.isEnabled();
		setEnabled(c.isEnabled());
		return obj;
	}

	protected static DOMNode newDOMObject(String key, String id, String... attr) {
		DOMNode obj = DOMNode.createElement(key, id);
		for (int i = 0; i < attr.length;)
			DOMNode.setAttr(obj, attr[i++], attr[i++]);
		return obj;
	}

	protected static DOMNode wrap(String type, String id, DOMNode... elements) {
		DOMNode obj = newDOMObject(type, id + type);
		for (int i = 0; i < elements.length; i++) {
			obj.appendChild(elements[i]);
		}
		return obj;
	}

	protected void debugDump(DOMNode d) {
		System.out.println(DOMNode.getAttr(d, "outerHTML"));
	}

// save for posterity -- a good idea in general	
//	protected static void vCenter(DOMNode obj, int offset, float scale) {
//		DOMNode.setStyles(obj, "top", "50%", "transform", 
//				(scale > 0 ? "scale(" + scale + "," + scale + ")" : "")
//				+"translateY(" + offset + "%)");
//	}
//
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
				: new Dimension(b.getIcon().getIconWidth(), b.getIcon().getIconHeight()));
	}
	
	public Dimension getTextSize(AbstractButton b) {
		if (textNode == null)
			return null;
		DOMNode.setStyle(textNode,  "padding", "0px");
		String t = b.getText();
		if (isAWT && t == "")
			t = "\u00A0"; // AWT labels do not hide if ""
		return (t == null || t == "" ? null : getHTMLSize(textNode));
		
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
		boolean hasFocus = false;
		if (!usePreferred && scrollPaneUI != null && scrollPaneUI.c.getWidth() != 0) {
			w = scrollPaneUI.c.getWidth();
			h = scrollPaneUI.c.getHeight();
		} else if (usePreferred && preferredSize != null) {
			// preferred size has been set by JComponent layout
			// and delivered via a property change "preferredSize"
			w = preferredSize.width;
			h = preferredSize.height;
			// frame resizeing will be here
			position = /** @j2sNative node.style.position || */
					null;
		} else if (usePreferred && preferredDim != null) {
			// has been set by setAlignments
			w = preferredDim.width;
			h = preferredDim.height;
			position = /** @j2sNative node.style.position || */
					null;
		} else {
			// determine the natural size of this object
			// save the parent node -- we will need to reset that.
			hasFocus = hasFocus();

			// remove position, width, and height, because those are what we are
			// setting here

			if (!isMenuItem) {
				boolean simpleButton = isSimpleButton;
				DOMNode centerNode = centeringNode;
				DOMNode dnode = domNode;
				/**
				 * @j2sNative
				 * 
				 * 			w0 = node.style.width; h0 = node.style.height; position =
				 *            node.style.position;
				 * 
				 *            if (node == centerNode && simpleButton) { w0i = dNode.style.width;
				 *            h0i = dNode.style.height; }
				 */
				{
					w0 = w0i = "";
				}
			}
			DOMNode.setStyles(node, "position", null, "width", null, "height", null);
			if (innerNode != null) // JSListUI only
				DOMNode.setStyles(innerNode, "width", null, "height", null);
			// process of discovering width and height is facilitated using
			// jQuery
			// and appending to document.body.
			// By using .after() we avoid CSS changes in the BODY element.
			// but this almost certainly has issues with zooming

			if (node == centeringNode) {
//				if (isHTML && (/** @j2sNative this.textNode.firstElementChild.tagName || */null) == "DIV") {
//					node = (DOMNode) DOMNode.getAttr(textNode, "firstChild");
				if (!isHTML) {

					// can't have these for getBoundingClientRect to work
					DOMNode.setStyle(node, "position", null);
					DOMNode.setStyle(textNode, "position", null);
					DOMNode.setStyle(iconNode, "position", null);
				}
			}
			
			parentNode = DOMNode.transferTo(node, null);
			Rectangle r = getBoundingRect(node);
			

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
		}
		// allow a UI to slightly adjust its dimension
		Dimension dim = getCSSAdjustment(addCSS, true);
		dim.width += w;
		dim.height += h;
		DOMNode.setStyle(node, "position", null);
		if (w0 != null) {
			DOMNode.setStyles(node, "width", 
					 (isHTML && isLabel ? "inherit" : w0), "height", h0);
		}
		if (position != null) {
			DOMNode.setStyle(node, "position", position);
		}
		if (w0i != null) {
			DOMNode.setStyles(domNode, "width", w0i, "height", h0i);
		}
		if (parentNode != null) {
			parentNode.appendChild(node);
			if (hasFocus) {
				ignoreFocus = true;
				node.focus();
			}
		}
		return dim;
	}

	protected Rectangle getBoundingRect(DOMNode node) {
		if (tempDiv == null) {
			tempDiv = DOMNode.createElement("div", "_temp");
			DOMNode.setStyle(tempDiv,  "display", "inline-block");
			DOMNode.setTopLeftAbsolute(tempDiv, 0, -100000);
			$(body).after(tempDiv);
		}
		tempDiv.appendChild(node);
		Rectangle r = tempDiv.getBoundingClientRect();
		tempDiv.removeChild(node);
		return r;
	}


	/**
	 * allows for can be overloaded to allow some special adjustments;
	 * must be mutable
	 * 
	 * @param addingCSS see subclasses
	 * @param mutable 
	 * 
	 * @return
	 */
	protected Dimension getCSSAdjustment(boolean addingCSS, boolean mutable) {
		return mutable ? new Dimension(0, 0) : ZERO_SIZE;
	}

	protected static Dimension ZERO_SIZE = new Dimension(0, 0);
	protected static Dimension ANY_SIZE = new Dimension(Integer.MAX_VALUE, Integer.MAX_VALUE);
	
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
		checkTransparent();
		Component[] children = getChildren();
		int n = getChildCount();

		if (isMenuItem) {
			outerNode = domNode;
			if (n == 0)
				return outerNode;
		}
		if (outerNode == null)
			createOuterNode();
		else if (domNode != outerNode && DOMNode.getParent(domNode) != outerNode)
			outerNode.appendChild(domNode);
		Integer order = (Integer) jc.getClientProperty(JLayeredPane.LAYER_PROPERTY);
		if (order != null && order.intValue() != CONTENT_PANE_Z)
			setZ(getInheritedZ() + order.intValue());
		setOuterLocationFromComponent();
		if (n > 0 && containerNode == null)
			containerNode = outerNode;
		if (isContainer || n > 0) {
			// set width from component
			if (isContainer && !isMenuItem && !isTable) {
				int w = getContainerWidth();
				int h = getContainerHeight();
				DOMNode.setSize(outerNode, w, h);				

				if (isPanel || isContentPane || isRootPane) {
					DOMNode.setStyle(outerNode, "overflow",
							 allowDivOverflow ? "visible" : "hidden");
					if (isRootPane) {
						if (jc.getFrameViewer().isApplet) {
							// If the applet's root pane, we insert it into the applet's
							// content
							DOMNode cdiv = (DOMNode) swingjs.JSToolkit.getHTML5Applet(jc)._getContentLayer();
							DOMNode.appendChildSafely(cdiv, outerNode);
						}
					}
				}
			}
			if (n > 0)
				addChildrenToDOM(children, n);
			if (isWindow 
					&& jc.getWidth() > 0
					&& isFrameIndependent() && !isSticky) {
			  // that isSticky must come after isFrameIndependent, because
			  // that is where it is set. (All independent JInternalFrames are sticky when they are independent, 
			  // because in that case, their parent JDesktopPane is hidden.)
				DOMNode.transferTo(outerNode, body);
				DOMNode.setStyle(outerNode,  "position", "absolute");
			}
		} else {
			DOMNode.setStyle(outerNode, "overflow", "hidden");
		}
		isTainted = false;
		
		if (embeddingNode != null) {
			// Note that detachAll leaves any previously attached nodes in limbo. 
			// It should probably close them. We could add a data-j2sembedded
			// attribute to indicate that we need to close any frame that is being 
			// removed. But I am not sure we really want to destroy them like that. Maybe.
			DOMNode.detachAll(embeddingNode);
			DOMNode.appendChildSafely(embeddingNode, outerNode);
		}
		return outerNode;
	}

	private void createOuterNode() {
		outerNode = wrap("div", id, domNode);
		@SuppressWarnings("unused")
		JComponent c = jc;
		@SuppressWarnings("unused")
		String name = jc.getName();
		String s = (/** @j2sNative name || c.__CLASS_NAME__|| */"");
		outerNode.setAttribute("name", s);
	}


	protected boolean isFrameIndependent() {
		return true;
	}

	/**
	 * The (effective) children of this component. 
	 * For performance, we allow the raw component[] array to be delivered directly,
	 * which may be null-terminating.
	 * 
	 * @return null-terminated array
	 */
	protected Component[] getChildren() {
		// but see JSMenuUI and JSTableUI and JComboBox
		return JSComponent.秘getChildArray(jc);
	}

	protected int getChildCount() {
		// but see JSMenuUI and JSTableUI and JSComboBoxUI
		return jc.getComponentCount();
	}


	protected DOMNode getContainerNode(int i) {
		return containerNode;
	}

	protected void addChildrenToDOM(Component[] children, int n) {
		// add all children
		for (int i = 0; i < n; i++) {
			if (!isTable && children[i] == null)
				break;
			JSComponentUI ui = JSToolkit.getUI(children[i], false);
			if (ui == null || ui.jc == null || ui.isNull || ui.isPaintedOnly) {
				// Box.Filler has no ui.
				continue;
			}
			ui.parent = this;
			if (ui.getOuterNode() == null) {
				if (ui.domNode != null)
					System.out.println("JSCUI addChildren no outer node for " + ui.id);
			} else {
				if (ui.domNode != ui.outerNode && DOMNode.getParent(ui.domNode) == null)				
					ui.outerNode.appendChild(ui.domNode);
				if (ui.embeddingNode == null
						&& (!ui.isRootPane || !ui.jc.getFrameViewer().isApplet)
						&& (!ui.isWindow || !ui.isFrameIndependent()))
					DOMNode.appendChildSafely(getContainerNode(i), ui.outerNode);
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
		if (cellComponent == null) {
			setHTMLElement();
			if (allowTextAlignment && centeringNode != null)
				setAlignments((AbstractButton) jc, false);
		}
		paint(g, c);
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

		setOverflow();
		if (imageNode != null && !imagePersists) {
			// the icon must paint itself; imageNode is just a placeholder
			DOMNode.setStyle(imageNode, "visibility", "hidden");
		}

	}

	protected void setOverflow() {
		if (textNode != null)
			DOMNode.setStyle(textNode, "overflow", "hidden");
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

	/**
	 * Overwritten by JSTextFieldUI
	 * @param obj
	 * @param prop
	 * @param val
	 * @return
	 */
	protected DOMNode setJSText(DOMNode obj, String prop, String val) {
		// Don't use DOMNode.setAttr here, because that converts TRUE to true
		/**
		 * @j2sNative
		 * 
		 * obj[prop] = val;
		 */
		return obj;
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
		if (isPaintedOnly)
			b = false;
		if (!b && cellComponent != null)
			return;
		if (node == null)
			node = domNode; // a frame or other window
		DOMNode.setVisible(node, b);
		if (b) {
			if (isDisposed)
				undisposeUI(node);
		}
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
		if (node == null || isUIDisabled)
			return;
		
		DOMNode.setAttr(node, "disabled", (b ? NULL : TRUE));
		if (!b && inactiveForeground == colorUNKNOWN)
			getDisabledColors(buttonNode == null ? getPropertyPrefix() : "Button");
		if (jc.isOpaque()) {
			Color bg = getBackground();
			setBackgroundImpl(b || !(bg instanceof UIResource) || inactiveBackground == null ? bg : inactiveBackground);
		}
		Color fg = getForeground();
		setForegroundFor(domNode, b ? fg : getInactiveTextColor(fg));
	}

	protected Color getBackground() {
		return (awtPeerBG == null ? c.getBackground() : awtPeerBG);
	}

	protected Color getForeground() {
		return (awtPeerFG == null ? c.getForeground() : awtPeerFG);
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
			// note that x and y are completely ignored.
		if (isUIDisabled)
			return;
		
		
		boolean isBounded = (width > 0 && height > 0);
		if (isBounded && !boundsSet) {
			// now we can set it to be visible, because its bounds have
			// been explicitly set.
			if (c.visible && cellComponent == null)
				setVisible(true);
			boundsSet = true;
		}
		// Note that this.x and this.y are never used. Tney are frame-referenced
		switch (op) {
		case SET_BOUNDS:
		case SET_LOCATION:
			x = c.getX();
			y = c.getY();
			if (embeddingNode == null && (this.x != x || this.y != y)) {
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

	private void setOuterLocationFromComponent() {
		// In SwingJS we just use the "local" lightweight location
		// for all components, not the native adjusted one, because
		// we maintain the hierarchy of the divs. I think this is
		// saying that everything is basically heavyweight. It
		// "paints" itself.

		if (outerNode != null && !isMenuItem) {
			// Considering the possibility of the parent being created
			// before children are formed. So here we can add them later.
			if (parent == null && jc.getParent() != null && (parent = jc.getParent().秘getUI()) != null
					&& parent.outerNode != null)
				DOMNode.appendChildSafely(parent.outerNode, outerNode);
			DOMNode.setPositionAbsolute(outerNode);
			DOMNode.setStyles(outerNode, "left", (x = c.getX()) + "px", "top", (y = c.getY()) + "px");	
		}
	}

	private void setSizeFromComponent(int width, int height, int op) {
		// allow for special adjustments
		// currently MenuItem, TextField, and TextArea
		Dimension size = getCSSAdjustment(true, false);
		// if (this.width != width || this.height != height) {
		this.width = width;
		this.height = height;
		if (domNode == null) {
			alignmentDisabled = true;
			updateDOMNode();
			alignmentDisabled = false;
		}
		setJSDimensions(width + size.width, height + size.height);
		setInnerComponentBounds(width, height);
	}

	protected void setJSDimensions(int width, int height) {
		if (jsActualWidth > 0)
			width = jsActualWidth; // list only
		if (jsActualHeight > 0)
			height = jsActualHeight; // list only
		DOMNode.setSize(domNode, width, height);
		if (outerNode != null) {
			DOMNode.setSize(outerNode, width, height);
		}
	}

	protected void setInnerComponentBounds(int width, int height) {
	}

	/**
	 * Create an image icon if necessary
	 * @param c
	 * @param icon
	 * @return
	 */
	protected ImageIcon getOrCreateIcon(JSComponent c, Icon icon) {
		return (c == null || icon == null && (icon = getIcon()) == null ? null
				: icon.getIconWidth() <= 0 || icon.getIconHeight() <= 0 ? null
						: (icon instanceof ImageIcon) ? (ImageIcon) icon : JSToolkit.createImageIcon(jc, icon, id + "tmpIcon"));
	}

	protected Icon getIcon() {
		return ((AbstractButton) c).getIcon();
	}

	@SuppressWarnings("unused")
	private static Object re0 = /** @j2sNative new RegExp("\u0000","gm") || */null;
	@SuppressWarnings("unused")
	private static Object reSpace = /** @j2sNative new RegExp(" ","gm") || */null;
	@SuppressWarnings("unused")
	private static Object reLT = /** @j2sNative new RegExp("<","gm") || */null;
	
	
	/**
	 * remove 0x0000 and replace space with nonbreaking space if not a textarea
	 * 
	 * @param t
	 * @return
	 */
	protected String fixText(String t) {
		if (t != null) {
			if (isHTML) {
				// file:///./testing -> swingjs/j2s///./  which is OK
				// file://./testing ->  swingjs/j2s//./  which is OK, but not Java
				// file://testing ->    swingjs/j2s/testing
				// file:/testing -->    swintjs/j2s/testing
				String rp = J2S.getResourcePath("",  true);
				t = t.replaceAll("file:/",  t.indexOf(rp) >= 0 ? "" : rp);
			} else if (valueNode == null) {
				/** @j2sNative t = t.replace(C$.re0, "").replace(C$.reSpace, "\u00A0"); */
			}
		}
		return t;
	}

	protected void setIconAndText(String prop, Icon icon, int gap, String text) {

		if (iconNode == null && textNode == null)
			return;

		// icons replace the checkbox or radio button
		// (they do not complement them) only on menu items
		setMnemonic(-1);
		actualWidth = actualHeight = 0;
		// need to know if HTML here
		
		currentText = text;		
		isHTML = (text != null && (text.indexOf("<html>") == 0
				|| jc.getClientProperty("html") != null
				|| mnemonicIndex >= 0));
		text = fixText(text);
			
		currentGap = gap;
		currentIcon = null;
		imageNode = null;
		int h = 0;
		if (iconNode != null) {
			icon = currentIcon = getOrCreateIcon(jc, icon);
			$(iconNode).empty();
			if (currentIcon != null) {
				imageNode = ((BufferedImage) currentIcon.getImage()).秘getImageNode(BufferedImage.GET_IMAGE_FOR_ICON);
				iconNode.appendChild(imageNode);
				if (DOMNode.getAttr(imageNode, "tagName") == "VIDEO")
					isVideoIcon = imagePersists = true;
				int w;
				if (isVideoIcon) {
					if (jc.isPreferredSizeSet()) {
						w = jc.getPreferredSize().width;
						h = jc.getPreferredSize().height;
					} else {
						w = DOMNode.getAttrInt(imageNode, "videoWidth");
						h = DOMNode.getAttrInt(imageNode, "videoHeight");
					}
					if (w > 0 && h > 0) {
						((ImageIcon) icon).秘setIconSize(w, h);
						DOMNode.setStyles(imageNode, "height", h + "px", "width", w  + "px");
						DOMNode.setStyles(iconNode, "height", h + "px", "width", w  + "px");
					}
					// might have to do this if we have problems with onloadmetadata
//					if (isVideoIcon && iconHeight == 1) {
//						iconHeight = icon.getIconHeight();
//						// video is still loading
//						setDataUI(imageNode);
//						setTainted(true);
//					} else {
//					}
				} else {
					w = icon.getIconWidth();
					h = icon.getIconHeight();
					boolean hasItemIconAndAction = (!isSimpleButton && isMenuItem && iconNode != null && actionNode != null && iconNode != actionNode);
					if (hasItemIconAndAction && h > 20) {
						w = (int)(w * 20.0 / h);
						h = 20;
					}
					DOMNode.setStyles(iconNode, "height", h + "px", "width", w  + "px");
					if (!imagePersists)
						DOMNode.setStyle(imageNode, "visibility", "hidden");
				}
			}
		}
		if (text == null) {
			text = "";
		} else if (text == "") {
			if (isAWT)
				text = "\u00A0"; // AWT labels do not hide if ""
		}
		if (text != "") {
			if (text == "\0") {
				isPaintedOnly = true; // this cannot be undone
			}
			if (!isHTML || !isLabel)
				DOMNode.setStyle(textNode, "white-space", "nowrap");
			if (icon == null) {
				// tool tip does not allow text alignment
				// menuitem checkboxes DO appear with iconNodes.
				if (iconNode != null && allowTextAlignment 
						&& isMenuItem 
						&& actionNode == null 
						&& text != null) {
					DOMNode.addHorizontalGap(iconNode, gap + MENUITEM_OFFSET);
				}
			} else {
				// vCenter(imageNode, 10); // perhaps? Not sure if this is a
				// good idea
				if (gap == Integer.MAX_VALUE)
					gap = getDefaultIconTextGap();
				if (gap != 0 && text != null && doAddTextGap())
					DOMNode.addHorizontalGap(iconNode, gap);
			}
			if (text.indexOf("<html>") == 0) {
				// PhET uses <html> in labels and uses </br>
				text = text.substring(6).replaceAll("</br>", "");
				text = text.replaceAll("</html>", "");
				text = text.replaceAll("href=", "target=_blank href=");
			} else if (jc.getClientProperty("html") != null) {
			} else if (mnemonicIndex >= 0) {
				int i = mnemonicIndex;
				if (i < text.length())
					text = text.substring(0, i) + "<u>" + text.substring(i, i + 1) + "</u>" + text.substring(i + 1);
			}
		}
		DOMNode obj = null;
		if (textNode != null) {
			prop = "innerHTML";
			obj = textNode;
			// IT TURNS OUT...
			// that for a <button> element to properly align vertically,
			// the font must be set for the button element, not in a child element.

			Font f = getFont();
			setCssFont(domNode, f); // for vertical centering
			setCssFont(textNode, f);
			if (menuAnchorNode != null) {
				setCssFont(menuAnchorNode, f); // for vertical centering
			}
			if (!isHTML) {
				/** @j2sNative text = text.replace(C$.reLT, "&lt;").replace(C$.reSpace, "\u00A0");*/
			}
		} else if (valueNode != null) {
			prop = "value";
			obj = valueNode;
			if (iconNode != null)
				DOMNode.setVisible(obj, text != null);
		}
		if (obj != null) {
			setJSText(obj, prop, text);
		}
		if (valueNode != null) {
			setBackgroundImpl(c.getBackground());
		}
	}

	private boolean doAddTextGap() {
		AbstractButton b = (AbstractButton) jc;
		return (b.getHorizontalTextPosition() != SwingConstants.CENTER);
	}


	protected int getDefaultIconTextGap() {
		return 0;
	}

	protected Insets insets;

	protected Icon icon;
	protected Rectangle viewR, iconR, textR;

	protected Dimension preferredDim;

	/**
	 * particularly for buttons
	 */
	private boolean isFullyCentered;

	private Cursor myCursor;

	private boolean alignmentDisabled;

	protected static Insets zeroInsets = new Insets(0, 0, 0, 0);
	
	protected void getJSInsets() {
		if (insets == null)
			insets = new Insets(0, 0, 0, 0);
		insets = jc.getInsets(insets);
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
		if (isMenuItem && actionNode != null && actionNode == iconNode) {
			iconR.width = iconR.height = 15;
		} else if (icon == null && iconNode != null) {
			Dimension d = getHTMLSize(iconNode);
			iconR.width = d.width;
			iconR.height = d.height;
		}
		iconR.x = iconR.y = textR.x = textR.y = 0;
	}
	
	protected void addCentering(DOMNode node) {
		if (iconNode == null)
			iconNode = newDOMObject("span", id + "_icon");
		textNode = newDOMObject("span", id + "_txt");
		centeringNode = newDOMObject("span", id + "_ctr");
		centeringNode.appendChild(iconNode);
		if (actionNode != null && actionNode != iconNode)
			centeringNode.appendChild(actionNode);
		centeringNode.appendChild(textNode);
		node.appendChild(centeringNode);
	}

	protected void updateCenteringNode() {
		if (jc.秘paintsSelfEntirely()) {
			// component will be responsible for border, background, and text
			DOMNode.setStyle(centeringNode, "visibility", "hidden");
			DOMNode.setStyle(domNode, "border", "none");
			DOMNode.setStyle(domNode, "background", "none");
		}

	}

	protected void setAlignments(AbstractButton b, boolean justGetPreferred) {
		if (alignmentDisabled)
			return;
		getJSInsets();
		Dimension dimIcon = getIconSize(b);
		Dimension dimText = getTextSize(b);
		boolean hasItemIconAndAction = (!isSimpleButton && isMenuItem && iconNode != null && actionNode != null
				&& iconNode != actionNode);
		int wAction = (hasItemIconAndAction ? 15 : 0);
		int wIcon = (actionNode != null ? (isMenuItem && dimIcon == null ? 5 : 20)
				: dimIcon == null ? 0 : Math.max(0, dimIcon.width));
		int wText = (dimText == null ? 0 : dimText.width);
		int gap = (wText == 0 || wIcon == 0 ? 0 : b.getIconTextGap());
		int w0 = cellComponent != null ? cellWidth : $(domNode).width();
		int w = w0;
		if (w < wIcon + wText + wAction) {
			// jQuery method can fail that may not have worked.
			w = wIcon + wText + wAction;
		}
		Insets margins = (isLabel ? (isAWT ? b.getInsets() : insets) : getButtonMargins(b, justGetPreferred));
		if (margins == null)
			margins = zeroInsets;
		Insets myInsets = (isLabel || !isSimpleButton || justGetPreferred ? zeroInsets : getButtonOuterInsets(b));
		int hText = (dimText == null ? 0 : dimText.height);
		int hIcon = (dimIcon == null ? 0 : dimIcon.height);
		// int ah = (wAction == 0 ? 0 : 15);
		int ih = (wAction == 0 && actionNode != null ? 15 : dimIcon == null ? 0 : dimIcon.height);
		int hCtr = Math.max(hText, ih);
		int wCtr = wIcon + gap + wAction + wText;
		// But we need to slightly underestimate it so that the
		// width of label + button does not go over the total calculated width

		int hAlign = b.getHorizontalAlignment();
		int vAlign = b.getVerticalAlignment();

//		Sets the area on the label where its contents should be placed. 
//		The SwingConstants interface defines five possible values for horizontal 
//		alignment: LEFT, CENTER (the default for image-only labels), RIGHT, LEADING 
//		(the default for text-only labels), TRAILING. 
//		For vertical alignment: TOP, CENTER (the default), and BOTTOM.

		int hTextPos = b.getHorizontalTextPosition();
		int vTextPos = b.getVerticalTextPosition();

//		Sets the location where the label's text will be placed, relative to 
//		the label's image. The SwingConstants interface defines five possible values 
//		for horizontal position: LEADING, LEFT, CENTER, RIGHT, and TRAILING (the default). 
//		For vertical position: TOP, CENTER (the default), and BOTTOM.

		boolean ltr = jc.getComponentOrientation().isLeftToRight();

		boolean alignVCenter = (vAlign == SwingConstants.CENTER);
		boolean alignLeft, alignRight, alignHCenter, textRight, textCenter;

//      getComponentOrientation().isLeftToRight()

		// horizontalTextPosition leading,left-to-right:
		// horizontalTextPosition trailing,right-to-left:
		//
		// text [btn].....
		//

		// horizontalTextPosition trailing,left-to-right
		//
		// [btn] text.....
		//

		// horizontalTextPosition trailing,right-to-left:
		//
		// .....text [btn]
		//

		// horizontalTextPosition leading,right-to-left
		//
		// .....[btn] text
		//

		// horizontalTextPosition center, verticalTextPosition top
		// text
		// [btn]

		// horizontalTextPosition center, verticalTextPosition bottom
		// [btn]
		// text

		// horizontalTextPosition center, verticalTextPosition center
		// [btn/text] can be on top of each other if horizontalAlignment is center

		if (menuAnchorNode == null) {
			alignLeft = (w == 0 || hAlign == SwingConstants.LEFT
					|| hAlign == (ltr ? SwingConstants.LEADING : SwingConstants.TRAILING));
			alignRight = w != 0 && (hAlign == SwingConstants.RIGHT
					|| hAlign == (ltr ? SwingConstants.TRAILING : SwingConstants.LEADING));
			alignHCenter = (!alignLeft && !alignRight);
			textCenter = (hTextPos == SwingConstants.CENTER);
			textRight = (hTextPos == SwingConstants.RIGHT
					|| hTextPos == (ltr ? SwingConstants.TRAILING : SwingConstants.LEADING));
		} else {
			// menus are far simpler!
			alignLeft = ltr;
			alignRight = !ltr;
			alignHCenter = false;
			textRight = ltr;
			textCenter = false;
		}

		if (menuAnchorNode != null) {
			setMenuAnchorAndAccelerator(b, wCtr, ltr, margins);
		} else if (textCenter) {

			// presumably no centered text for dropdown menu items?
			// with horizontalTextPosition CENTER, centering node w and h depends upon the
			// vertical text position

			switch (vTextPos) {
			case SwingConstants.TOP:
				hCtr = hIcon + gap + hText;
				break;
			case SwingConstants.BOTTOM:
				hCtr = hIcon + gap + hText;
				break;
			case SwingConstants.CENTER:
				break;
			}
			wCtr = Math.max(wIcon, wText);
			if (w0 > 0 && w0 < w)
				w = w0;
		}
		if (justGetPreferred) {
			if (preferredDim == null)
				preferredDim = new Dimension();
			preferredDim.width = wCtr + margins.left + margins.right;
			preferredDim.height = hCtr + margins.top + margins.bottom;
			return;
		}
		preferredDim = null;
		Object cssCtr = getJSObject(); // {...}
		Object cssTxt = getJSObject();
		Object cssIcon = getJSObject();
		Object cssAction = (hasItemIconAndAction ? getJSObject() : null);

		addJSKeyVal(cssCtr, "position", "absolute", "top", null, "left", null, "transform", null, "width",
				(isHTML && isLabel ? "inherit" : wCtr + "px"), "height", hCtr + "px", "display",
				(isLabel ? "inline-block" : null));
		addJSKeyVal(cssIcon, "position", "absolute", "top", null, "left", null, "transform", null);
		addJSKeyVal(cssTxt, "position", "absolute", "display", (isLabel ? "inline-block" : null), "top", null, "left",
				null, "transform", null);
		if (hasItemIconAndAction)
			addJSKeyVal(cssAction, "position", "absolute", "top", null, "left", null, "transform", null);

		// checkboxes and radiobuttons (i.e. with actionNodes) should not be fully
		// centered unless in a table
		isFullyCentered = (alignHCenter && alignVCenter && wIcon == 0 || wText == 0
				&& (actionNode == null || this.cellComponent != null || isSimpleButton) && margins.left == margins.right
				&& margins.top == margins.bottom && myInsets.left == myInsets.right && myInsets.top == myInsets.bottom);
		if (isFullyCentered) {
			// simple totally centered label or button
			// can't have width or height here --- let the browser figure that out
			fullyCenter(cssCtr, isSimpleButton || isLabel);
			fullyCenter(cssIcon, isSimpleButton);
			fullyCenter(cssTxt, isSimpleButton);
		} else {

			// horizontal

			int left = -1;

			if (menuAnchorNode == null) {

				if (alignHCenter) {
					left = (w - wCtr + margins.left - margins.right + myInsets.left - myInsets.right) / 2;
					if (textCenter) {
					} else if (textRight) {
						addJSKeyVal(cssIcon, "left", "0px");
						addJSKeyVal(cssTxt, "left", (gap + wIcon) + "px");
					} else {
						addJSKeyVal(cssTxt, "left", "0px");
						addJSKeyVal(cssIcon, "left", (gap + wText) + "px");
					}
				} else if (alignRight) {
					left = w - wCtr - margins.right - myInsets.right - (cellComponent == null ? 0 : 2);// table fudge
					if (textCenter) {
					} else if (textRight) {
						addJSKeyVal(cssTxt, "left", (wCtr - wText) + "px");
						addJSKeyVal(cssIcon, "left", "0px");
					} else {
						addJSKeyVal(cssTxt, "left", "0px");
						addJSKeyVal(cssIcon, "left", (wCtr - wIcon) + "px");
					}
				} else { // alignLeft
					left = margins.left + myInsets.left - (cellComponent == null ? 0 : 1);
					if (textCenter) {
					} else if (textRight) {
						int off = (!isMenuItem || ltr || actionNode != null ? 0 : actionItemOffset);
						addJSKeyVal(cssIcon, "left", off + "px");
						addJSKeyVal(cssTxt, "left", (wIcon + gap) + "px");
					} else {
						addJSKeyVal(cssTxt, "left", (!isMenuItem ? 0 : ltr ? actionItemOffset : -3) + "px");
						addJSKeyVal(cssIcon, "left", (wText + gap) + "px");
					}
				}
				if (textCenter) {
					addJSKeyVal(cssTxt, "left", ((wCtr - wText) / 2) + "px");
					addJSKeyVal(cssIcon, "left", ((wCtr - wIcon) / 2) + "px");
				}
				addJSKeyVal(cssCtr, "left", left + "px");
			} else if (alignRight) {
				DOMNode.setStyle(itemNode, "text-align", "right");
				addJSKeyVal(cssCtr, "right", "0px");
				addJSKeyVal(cssTxt, "right", "23px");
				if (hasItemIconAndAction) {
					addJSKeyVal(cssAction, "right", "0px"); // was 3
					addJSKeyVal(cssIcon, "right", (wText + gap + wAction) + "px"); // was 3
				} else {
					addJSKeyVal(cssIcon, "right", "0px"); // was 3
				}
			} else {
				DOMNode.setStyle(itemNode, "text-align", "left");
				addJSKeyVal(cssCtr, "left", "0px");
				if (hasItemIconAndAction) {
					addJSKeyVal(cssAction, "left", "0px"); // was 3
					addJSKeyVal(cssIcon, "left", (wAction + gap) + "px"); // was 3
					addJSKeyVal(cssTxt, "left", (wAction + wIcon + gap) + "px");
				} else {
					addJSKeyVal(cssIcon, "left", "0px"); // was 3
					addJSKeyVal(cssTxt, "left", "23px");
				}
			}

			// vertical

			int h = c.getHeight();

			if (h == 0) {
				h = hCtr; // fallback -- tooltip
			}

			if (menuAnchorNode == null) {
				int top;

				switch (vAlign) {
				case SwingConstants.TOP:
					top = margins.top + myInsets.top;
					break;
				case SwingConstants.BOTTOM:
					top = h - hCtr - margins.bottom - myInsets.bottom;
					break;
				default:
				case SwingConstants.CENTER:
					top = 0;
//					if (isLabel || true || hIcon != 0 && (vTextPos != SwingConstants.CENTER
//				|| hTextPos != SwingConstants.CENTER)) {
					top = (h - hCtr + margins.top - margins.bottom + myInsets.top - myInsets.bottom) / 2;
					if (!isLabel)
						top -= myInsets.top;
//					}
					break;
				}

//				System.out.println("jscui.setAlignments " + b.getText() + " vAlign=" + vAlign + " top=" + top
//						+ " hIcon/hText/ih/gap=" + hIcon + " " + hText + " " + ih + " " + gap
//						+ " h/hctr=" + h + " " + hCtr
////				 + " font=" + b.getFont() 
//						+ " margins=" + margins + " insets=" + insets
////				 + " class=" + jc.getClass().getSimpleName() 
//
//				);

				addJSKeyVal(cssCtr, "top", top + "px");
				int itop;
				String yoff = null;
				String iscale = "";
				String voff = "";
				switch (vTextPos) {
				case SwingConstants.TOP:
					top = itop = 0;
					if (hIcon > 0 && hTextPos == SwingConstants.CENTER) {
						itop = -1;
						addJSKeyVal(cssTxt, "top", "0px");
						addJSKeyVal(cssIcon, "top", hText + gap + "px");
					} else {
						voff = " translateY(" + margins.top + "px)";
					}
					break;
				case SwingConstants.BOTTOM:
					top = itop = 100;
					if (hIcon > 0 && hTextPos == SwingConstants.CENTER) {
						itop = -1;
						addJSKeyVal(cssIcon, "top", "0px");
						addJSKeyVal(cssTxt, "top", hIcon + gap + "px");
					} else {
						voff = " translateY(-" + margins.bottom + "px)";
					}
					break;
				default:
				case SwingConstants.CENTER:
					top = itop = 50;
					if (iconNode == actionNode) {
						itop = 70;
						iscale = "scale(0.8,0.8)";
					}

					break;
				}
				if (itop >= 0) {
					addJSKeyVal(cssTxt, "top", top + "%", "transform",
							"translateY(" + (yoff == null ? "-" + top + "%" : yoff) + ")" + voff);
					addJSKeyVal(cssIcon, "top", top + "%", "transform", "translateY(-" + itop + "%)" + voff + iscale);
				}
			} else {
				DOMNode.setStyle(menuAnchorNode, "height", "1em");
//				if (wIcon > 0)
				// addJSKeyVal(cssTxt, "top", "50%", "transform", "translateY(-50%)");
				if (hasItemIconAndAction) {
					addJSKeyVal(cssAction, "top", "65%", "transform", "translateY(-100%) scale(0.6)");
					addJSKeyVal(cssIcon, "top", "50%", "transform", "translateY(-80%)");
				} else {
					addJSKeyVal(cssIcon, "top", "50%", "transform", "translateY(-80%) scale(0.6)");
				}
			}

		}
		setCSS(cssCtr, centeringNode);
		setCSS(cssIcon, iconNode);
		if (hasItemIconAndAction)
			setCSS(cssAction, actionNode);
		setCSS(cssTxt, textNode);

		if (cellComponent != null)
			updateCellNode();
	}

	private void setMenuAnchorAndAccelerator(AbstractButton b, int wCtr, boolean ltr, Insets margins) {
		int wAccel = 0;
		if (isMenu) {
			// Correct for dimText calc losing position:absolute
			DOMNode.setPositionAbsolute(textNode);
		} else {
			String accel = getAccelStr((JMenuItem) b);
			DOMNode accelNode = menuAnchorNode;
			accelNode = /** @j2sNative accelNode.children[1] || */
					null;
			if ((accelNode == null) != (accel == null)) {
				if (accel == null) {
					DOMNode.remove(accelNode);
				} else {
					menuAnchorNode.appendChild(accelNode = DOMNode.createElement("span", id + "_acc"));
					addClass(accelNode, "ui-j2smenu-accel");
					DOMNode.setAttr(accelNode, "role", "menuitem");
					DOMNode.setStyle(accelNode, "font-size", "0.8em");
					setMenuItem(accelNode);
				}
			}
			if (accel != null) {
				DOMNode.setStyle(accelNode, "float", null);
				DOMNode.setAttr(accelNode, "innerHTML", accel);// = accel + "\u00A0\u00A0");
				wAccel = getHTMLSize(accelNode).width;
				DOMNode.setStyles(accelNode, "float", ltr ? "right" : "left", "text-align", ltr ? "right" : "left",
						"margin", "0px 5px", "transform", "translateY(15%)");
			}
		}
		if (!isMenu || isMenuItem)
			DOMNode.setStyle(menuAnchorNode, // "width", "90%",
					"min-width", Math.max(75, (23 + 15 + wCtr + wAccel + margins.left + margins.right)) + "px"); // was
	}


	private void fullyCenter(Object css, boolean noOffsets) {
		if (noOffsets)
			addJSKeyVal(css, "width", null, "position", null, "padding", "0", "margin", "0 auto");
		else
			addJSKeyVal(css, "width", null, "top", "50%", "left", "50%", "transform",
				"translateX(-50%)translateY(-50%)translateY(0.5px)translateX(0.5px)", "position", "absolute");
	}

	public static Object getJSObject() {
		return /** @j2sNative {} || */ null;
	}

	public static void addJSKeyVal(Object o, String... kv) {
		for (int i = 0, n = kv.length; i < n; i++) {
		/** @j2sNative 
		 * 
		 * o[kv[i++]] = kv[i]; 
		 * 
		 */
		}
	}

	private void setCSS(Object css, DOMNode node) {
		if (node == null)
			return;
		/**
		 * @j2sNative
		 *  
		 * for (var a in css)node.style[a] = css[a];
		 * 
		 */
	}

	protected void updateCellNode() {
		// could be editor or cell
		if (cellWidth == 0 || cellHeight == 0) {
			return;
		}
		
		//System.out.println("jscui.updateCellNode " + id + " " + DOMNode.getAttr(actionNode, "outerHTML"));

		if (allowPaintedBackground || isMenu && !isMenuItem)
			DOMNode.setStyles(domNode, "background", "transparent");
		if (cellComponent instanceof BooleanRenderer 
				|| cellComponent.getClientProperty("_jsBooleanEditor") != null) {

			DOMNode.setStyles(centeringNode, "width", "100%", "height", "100%");
			DOMNode.setStyles(buttonNode, "width", "100%", "height", "100%");
			DOMNode.setStyles(actionNode, "position", "absolute", "width", "14px", "height", "14px", "top",
					(cellHeight / 2) + "px");
			int textAlign = ((AbstractButton) cellComponent).getHorizontalAlignment();
			int width = cellWidth;
			switch (textAlign) {
			case SwingConstants.RIGHT:
			case SwingConstants.TRAILING:
				DOMNode.setStyles(actionNode, "left", width + "px", "transform",
						"scale(0.75,0.75) translate(-25px,-20px)");
				break;
			case SwingConstants.LEFT:
			case SwingConstants.LEADING:
				DOMNode.setStyles(actionNode, "left", "0px", 
						"top", "50%", "transform", "scale(0.75,0.75) translateX(-50%) translateY(-50%) translate(-10px,-10px)");
				break;
			case SwingConstants.CENTER:
				DOMNode.setStyles(actionNode, "left", "50%", "top", "50%", "transform",
						"scale(0.75,0.75) translateX(-50%) translateY(-50%) translate(-10px,-10px)");// translate(-20px,-20px)"); // admittedly, a hack translate(-50%,-50%) does not work- still need the -10,-10
				break;
			}

			//System.out.println(JSUtil.getStackTrace(6));
			
		}

	}

    /**
     * 
     * @param b
     * @param includeOuter only if getting preferred settings only
     * @return
     */
	private Insets getButtonMargins(AbstractButton b, boolean includeOuter) {
		return (includeOuter ? b.getInsets() // will include margins
				: b.getBorder() instanceof CompoundBorder
						? ((CompoundBorder) b.getBorder()).getInsideBorder().getBorderInsets(b)
						: null);
	}


	/**
	 * Compound borders
	 * 
	 * @param b
	 * @return
	 */
	protected Insets getButtonOuterInsets(AbstractButton b) {
			if (b.getBorder() instanceof CompoundBorder) {
				return ((CompoundBorder) b.getBorder()).getOutsideBorder().getBorderInsets(b);
			}
			return b.getInsets();
	}


	Font getFont() {
		// for AWT components before they are connected
		Font f = c.getFont();
		return (f == null ? (Font) HTML5LookAndFeel.dialogPlain12 : f);
	}

	private String getAccelStr(JMenuItem b) {
		KeyStroke ks = b.getAccelerator();
		if (ks != null) {
			String k = KeyEvent.getKeyText(ks.getKeyCode());
			if (k == "Escape")
				k = "Esc";
			String s = KeyEvent.getKeyModifiersText(ks.getModifiers());
			return s + (s == "" ? "" : "-") + k;
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
		//JSUtil.notImplemented("");
	}

	/**
	 * Coordinates relative to the document
	 * 
	 */
	@Override
	public Point getLocationOnScreen() {
		Insets offset = (Insets) $(outerNode == null ? jc.getParent().秘getUI().outerNode : outerNode).offset();
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
		// n/a -- called from java.awt.Component when NOT a LightweightPeer.
		return null;
	}

	/**
	 * Window has been disposed, or component has been removed.
	 */
	@Override
	public void dispose() {
		if (isUIDisabled)
			return;
		if (cellComponent != null) {
			DOMNode.setVisible(domNode, false);
			return;
		}
		isDisposed = true;
		// notice that we do not delete domNode, only detach it
		// and remove its listeners. 
		DOMNode.dispose(domNode);
		if (domNode != outerNode)
			DOMNode.dispose(outerNode);
	}


	/**
	 * 
	 * This control has been added back to some other node after being disposed of.
	 * So now we need to undo that.
	 * 
	 * @param nodef
	 */
	protected void undisposeUI(DOMNode node) {
		if (!isDisposed)
			return;
		Container parent = c.getParent();
		// node will be null for Window, including Dialog
		if (node != null && parent != null) {
			JSComponentUI ui = c.getParent().秘getUI();
			if (ui.containerNode != null)
				ui.containerNode.appendChild(node);
		}
		// menu separators have domNode == outerNode
		// cell renderers will set their domNode to null;
		if (outerNode != null && domNode != null && domNode != outerNode) {
			outerNode.appendChild(domNode);
		}
		isDisposed = false;
	}

	public void setForegroundCUI(Color c) {
		setForegroundFor(domNode, c);
	}

	protected void setForegroundFor(DOMNode node, Color color) {
		if (node != null)
			DOMNode.setStyle(node, "color",
					(color == null ? "rgba(0,0,0,0)" : toCSSString(color == null ? Color.black : color)));
	}

	@Override
	final public void setFont(Font f) {
//		if (domNode != null && !isUIDisabled) {
//		if (textNode != null)
//			setCssFont(textNode, f);
//			setCssFont(domNode, f);
//		}
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
	@Deprecated
	final public void layout() {
		// called by Component.validate() only; totally ignored
	}

	@Override
	public Rectangle getBounds() {
		JSUtil.notImplemented("");
		return null;
	}

	/**
	 * Efficiently find the closest object in the DOM hierarchy to this component's
	 * domNode that has a non-zero and non-blank z-index.
	 * 
	 * @return z-index of self or higher element; 9000 as default
	 */
	
	public static int getInheritedZ(JComponent c) {
		return c.秘getUI().getInheritedZ();
	}

	/**
	 * Efficiently find the closest object in the DOM hierarchy to this component's
	 * domNode that has a non-zero and non-blank z-index.
	 * 
	 * @return z-index of self or higher element; 9000 as default
	 */
	@SuppressWarnings("unused")
	protected int getInheritedZ() {
		DOMNode node = domNode;
		int base = 9000;
		int z = 0;
		/**
		 * @j2sNative
		 * 
		 *            while (node && !node.style["z-index"]) node = node.parentElement;
		 *            !(z = +(node && node.style["z-index"])) && (z = base);
		 */
		return z;
	}

	/**
	 * Set the z-index of this component's domNode and outerNode
	 * @param z
	 */
	public void setZ(int z) {
		if (z == CONTENT_PANE_Z) // content pane
			return;
		DOMNode.setPositionAbsolute(domNode);
		DOMNode.setZ(domNode, z);
		DOMNode.setZ(outerNode, z);// saves it
	}

	/**
	 * Bring the container of this component to the front
	 * @param c
	 */
	public static void containerToFront(JComponent c) {
		Component root = c.getRootPane();
		Component w = (root == null ? null : root.getParent());
		if (w instanceof Window)
			((Window) w).toFront();
	}


	// /////////////////////////// ContainerPeer ///////////////////////////

	public Insets getInsets() {
		// In lieu of a JComponent border, the UI is responsible for setting 
		// the inset that is calculated into the position of the component
		return null;
	}

	public void beginValidate() {
		// only used in JSWindowUI
	}

	public void endValidate() {
		// only used in JSWindowUI
	}

	public void beginLayout() {
		// hide if not a panel and bounds have not been set.
		if (!boundsSet && !isContainer)
			setVisible(false);
		isLaidOut = false;
		layingOut = true;
	}

	boolean isLaidOut;

	public void endLayout() {
		layingOut = false;
		isLaidOut = true;
	}

	
	//////////////////////////////////
	
	
	public String getId() {
		return id;
	}

	protected String dumpEvent(EventObject e) {
		return e.toString();
	}

	public static String toCSSString(Color c) {
		return JSToolkit.getCSSColor(c, false);
	}

//	public static String toRGBHexString(Color c) {
//		int rgb = c.getRGB();
//		if (rgb == 0)
//			return "000000";
//		String r = "00" + Integer.toHexString((rgb >> 16) & 0xFF);
//		r = r.substring(r.length() - 2);
//		String g = "00" + Integer.toHexString((rgb >> 8) & 0xFF);
//		g = g.substring(g.length() - 2);
//		String b = "00" + Integer.toHexString(rgb & 0xFF);
//		b = b.substring(b.length() - 2);
//		return r + g + b;
//	}

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
		String s = jc.getUIClassID();
		return (s == null ? null : s.substring(0, s.length() - 2));
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

	public void setRenderer(JSComponent rendererComponent, int width, int height, DOMNode td) {
		// We must disable the UI after painting so that when 
		// the next cell is chosen we do not act on the previous cell
		// in table.prepareRenderer(...) prior to assigning the desired table cell.
		setComponent((JComponent) rendererComponent);
		if (isUIDisabled) {
			updateTableCell(td, true);
			return;
		}
		// while in the CellRendererPane, we save that information or clear it
		cellComponent = (JComponent) rendererComponent;		
		if (width == 0)
			return;
		// saves the most recent cell width and height
		cellWidth = width;
		cellHeight = height;
	}

	public void reinstallUI(JComponent oldC, JComponent newC) {
        uninstallUI(oldC);
        uninstallJS();
        if (newC== null) {
//        	// Frame or Dialog.dispose()
//    		if (outerNode != null) {
//    			DOMNode.dispose(outerNode);
//    			outerNode = null;
//    			domNode = null;
//    			isDisposed = true;
//    		}
        } else {
        	// JPopupMenu
        	installJS();
        	installUI(newC);
        }
	}

//	public void setPaintedOnly() {
//		isPaintedOnly = true;
//	}


	@Override
	public void setForeground(Color c) {
		awtPeerFG = null;
		setForegroundFor(domNode, c);
	}

	/**
	 * Setting the background through the interface also clears the AWT peer background
	 */
	@Override
	public void setBackground(Color c) {
		awtPeerBG = null;
		
		setBackgroundImpl(c);
	}
	
	private Color backgroundColor;

	protected void setBackgroundImpl(Color color) {
		// Don't allow color for Menu and MenuItem. This is taken care of by
		// jQuery

		if (domNode == null || isMenuItem || isUIDisabled)
			return;
		// currently painting - update JSGraphics2D
		backgroundColor = color;
		if ((jc.秘paintsSelf() || (isContentPane || isLayeredPane)
				&& jc.秘setPaintsSelf(JSComponent.PAINTS_SELF_YES) == JSComponent.PAINTS_SELF_YES) && jc.isOpaque()) {
			clearPaintPath();
		}
		paintBackground(jc.秘gtemp);
	}

	/**
	 * If a control is transparent, then set that in HTML for its node
	 * 
	 * @param node
	 */
	private void checkTransparent() {
		// Note that c.setOpaque(true/false) on a label DOES work, but you need
		// to do a repaint to see it in Java.
		// Here we keep it simple and do the change immediately.
		//

		if (inPaintPath || domNode != null && (cellComponent != null || !c.isOpaque()))
			setTransparent();
	}

	private void setTransparent() {
		if (allowPaintedBackground)
			DOMNode.setStyle(domNode, "background", "transparent");
	}
	
	public void paintBackground(JSGraphics2D g) {
		Color color = (this.backgroundColor == null ? getBackground() : this.backgroundColor);
		if (color == null)
			return;
		boolean isOpaque = c.isOpaque();
		boolean paintsSelf = jc.秘paintsSelf();
		// System.out.println("paintback " + this.id + " " + (/** @j2sNative
		// this.jc.text||*/"")+ " " + isOpaque + " " + paintsSelf + " " + g);
		if (g == null) {
			if (!paintsSelf)
				setBackgroundDOM(domNode, color);
			// preliminary -- DOM only, when the background is set
		} else if (allowPaintedBackground && (isOpaque && (isPanel || cellComponent != null || jc.getComponentCount() > 0) || jc.秘g != null)) {
			// all opaque components must paint their background
			// just in case they have painted CHILDREN or if they are table cell components
			if (isOpaque == (color.getAlpha() == 255)) {
				g.setBackground(color);
			} else {
				g.setBackground(new Color(color.getRed(), color.getGreen(), color.getBlue(), isOpaque ? 255 : 0));
			}
			g.clearRect(0, 0, c.getWidth(), c.getHeight());
			if (isOpaque) {
				isOpaque = cellComponent == null && !jc.秘paintsSelf();
				if (!isOpaque && isWindow) {
					JComponent c = (JComponent) jc.getRootPane().getContentPane();
					c.秘setPaintsSelf(JSComponent.PAINTS_SELF_YES);
					((JSComponentUI) c.ui).setTransparent();
				}
			}
		}
		if (allowPaintedBackground && !isOpaque)
			setTransparent();
		else
			checkTransparent();
	}

	protected void setBackgroundDOM(DOMNode node, Color color) {
		DOMNode.setStyle(node, "background-color",
				color == null ? null : toCSSString(color));
	}


	/**
	 * A call to getGraphics has been made to a component that
	 * otherwise has not been identified as a painted object
	 */
	public void clearPaintPath() {
		JSComponent c = jc;
		while (c != null) {
			JSComponentUI ui = c.秘getUI();
			if (ui == null || ui.isWindow)
				return;
			ui.inPaintPath = true;
			c.秘setPaintsSelf(JSComponent.PAINTS_SELF_ALWAYS);
			ui.setTransparent();
			c = c.getParent();
		}
	}

	/**
	 * if this window is blocked
	 * 
	 */
	protected boolean modalBlocked;

	/**
	 * JTextArea, JTextPane, and JEditorPane
	 */
	public boolean isTextView;

	public boolean isModalBlocked() {
		return JSComponent.秘getTopInvokableAncestor(jc, false).秘getUI().modalBlocked;
	}

	public boolean isDisplayable() {
		return !isDisposed && domNode != null;
	}

	private JSFunction pasteHandler;
	
	/**
	 * Set the handler for paste operations
	 * @param handler
	 */
	public void setPasteHandler(JSFunction handler) {
		pasteHandler = handler;
		if (domNode != null) {
			Object oldHandler = DOMNode.getAttr(domNode,  "paste-handler");
			if (oldHandler == handler)
				return;
			/**
			 * @j2sNative
			 * 			oldHandler && this.domNode.removeEventListener("paste", oldHandler);
			 *          handler && this.domNode.addEventListener("paste", handler);
			 */
			DOMNode.setAttrs(domNode, "contentEditable", (handler == null ? FALSE : TRUE));
			// critical
			j2sDoPropagate = (handler != null);
			setFocusable();
		}
	}
	

}
