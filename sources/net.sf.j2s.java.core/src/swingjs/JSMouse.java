/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2012-09-11 19:29:26 -0500 (Tue, 11 Sep 2012) $
 * $Revision: 17556 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2002-2005  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
package swingjs;

import java.awt.Component;
import java.awt.Container;
import java.awt.Event;
import java.awt.JSComponent;
import java.awt.Toolkit;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseWheelEvent;

import javax.swing.JComponent;

import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;
import swingjs.api.js.JQueryObject.JQEvent;
import swingjs.plaf.JSComponentUI;

/**
 * JavaScript interface from JmolJSmol.js via handleOldJvm10Event (for now)
 * 
 */

public class JSMouse {

	private JSFrameViewer viewer;
	private Object jqevent;

	public JSMouse(JSFrameViewer v) {
		viewer = v;
	}

	public boolean processEvent(int id, int x, int y, int modifiers, long time, Object jqevent, int scroll) {
		JSToolkit.setThreadForViewer(viewer);
		this.jqevent = jqevent;
		// Note that we do not derive the Java event id from the jQuery event. 
		// This is because we may be creating a different type of Java event.
		switch (id) {
		case KeyEvent.KEY_PRESSED:
		case KeyEvent.KEY_TYPED:
		case KeyEvent.KEY_RELEASED:
			return keyAction(id, jqevent, time);
		}	
		if (id != MouseEvent.MOUSE_WHEEL && id != MouseEvent.MOUSE_MOVED)
			modifiers = applyLeftMouse(modifiers);
		switch (id) {	
		case MouseEvent.MOUSE_WHEEL:
			wheeled(time, x, y, scroll, modifiers);
			break;
		case MouseEvent.MOUSE_PRESSED:
			xWhenPressed = x;
			yWhenPressed = y;
			modifiersWhenPressed10 = modifiers & ~EXTENDED_MASK;
			pressed(time, x, y, modifiers, false);
			break;
		case MouseEvent.MOUSE_DRAGGED:
			dragged(time, x, y, modifiers);
			break;
		case MouseEvent.MOUSE_ENTERED:
		case MouseEvent.MOUSE_EXITED:
			entry(time, x, y, id);
			break;
		case MouseEvent.MOUSE_MOVED:
			moved(time, x, y, modifiers);
			break;
		case MouseEvent.MOUSE_RELEASED:
			released(time, x, y, modifiers & ~EXTENDED_MASK);
			// simulate a mouseClicked event for us
			if (x == xWhenPressed && y == yWhenPressed
					&& (modifiers & ~EXTENDED_MASK) == modifiersWhenPressed10 
					&& getButton(id, jqevent) != MouseEvent.BUTTON1) {
				// the underlying code will turn this into dbl clicks for us
				// note that double-right-click is not supported.
				// note that original event type field is read-only
				/**
				 * @j2sNative 
				 * 
				 *    jqevent.type = jqevent.originalEvent.j2stype = "click";
				 */
				clicked(time, x, y, modifiers & ~EXTENDED_MASK, 1);
			}
			break;
		case MouseEvent.MOUSE_CLICKED:
			// left-mouse only?
			int n = /** @j2sNative jqevent.originalEvent.detail || */ 0;
			clicked(time, x, y, modifiers & ~EXTENDED_MASK, n);
			break;
		default:
			return false;
		}
		return true;
	}

	/**
	 * 
	 * called by JSmol as processTwoPointGesture(canvas.touches);
	 * 
	 * @param touches
	 *          [[finger1 touches],[finger2 touches]] where finger touches are
	 *          [[x0,y0],[x1,y1],[x2,y2],...]
	 * 
	 */
	public void processTwoPointGesture(float[][][] touches) {
		getMouse2().processTwoPointGesture(touches);
	}

	private JSMouse2 mouse2;
	private JSMouse2 getMouse2() {
		return (mouse2 == null ? (mouse2 = (JSMouse2) JSUtil.getInstance("swingjs.JSMouse2")).set(this) : mouse2);
	}

	public static final int MOUSE_LEFT = 16; // MouseEvent.BUTTON1_MASK
	public static final int MOUSE_MIDDLE = 8; // Event.ALT_MASK;  MouseEvent.BUTTON2_MASK
	public static final int MOUSE_RIGHT = 4; // Event.META_MASK;  MouseEvent.BUTTON3_MASK
	public static final int MOUSE_WHEEL = 32;

	public static final int EXTENDED_MASK = 0x3FC0; // ^(InputEvent.HIGH_MODIFIERS | JDK_1_3_MODIFIERS)  
	public final static int MAC_COMMAND = MOUSE_LEFT | MOUSE_RIGHT;
	public final static int BUTTON_MASK = MOUSE_LEFT | MOUSE_MIDDLE | MOUSE_RIGHT;
	
	void translateXYBy(int deltaX, int deltaY) {
		// Called by JSMouse2
	}

	public void mouseClicked(MouseEvent e) {
		clicked(e.getWhen(), e.getX(), e.getY(), e.getModifiers(),
				e.getClickCount());
	}

	public void mouseEntered(MouseEvent e) {
		entry(e.getWhen(), e.getX(), e.getY(), MouseEvent.MOUSE_ENTERED);
	}

	public void mouseExited(MouseEvent e) {
		entry(e.getWhen(), e.getX(), e.getY(), MouseEvent.MOUSE_EXITED);
	}

	public void mousePressed(MouseEvent e) {
		pressed(e.getWhen(), e.getX(), e.getY(), e.getModifiers(),
				e.isPopupTrigger());
	}

	public void mouseReleased(MouseEvent e) {
		released(e.getWhen(), e.getX(), e.getY(), e.getModifiers());
	}

	public void mouseDragged(MouseEvent e) {
		int modifiers = e.getModifiers();
		/****************************************************************
		 * Netscape 4.* Win32 has a problem with mouseDragged if you left-drag then
		 * none of the modifiers are selected we will try to fix that here
		 ****************************************************************/
		if ((modifiers & BUTTON_MASK) == 0)
			modifiers |= MOUSE_LEFT;
		/****************************************************************/
		dragged(e.getWhen(), e.getX(), e.getY(), modifiers);
	}

	public void mouseMoved(MouseEvent e) {
		moved(e.getWhen(), e.getX(), e.getY(), e.getModifiers());
	}

	public void mouseWheelMoved(MouseWheelEvent e) {
   	e.consume();
		wheeled(e.getWhen(), 0, 0, e.getWheelRotation(), e.getModifiers());
	}

	private void entry(long time, int x, int y, int id) {
		wheeling = false;
		mouseEnterExit(time, x, y, id);
	}

	/**
	 * 
	 * @param time
	 * @param x
	 * @param y
	 * @param modifiers
	 * @param clickCount
	 */
	private void clicked(long time, int x, int y, int modifiers, int clickCount) {
		// clearKeyBuffer();
		// clickedCount is not reliable on some platforms
		// so we will just deal with it ourselves
		mouseAction(MouseEvent.MOUSE_CLICKED, time, x, y, clickCount, modifiers, 0);
	}

	private boolean isCtrlShiftMouseDown; // Macintosh may not recognize CTRL-SHIFT-LEFT as
																// drag, only move
	private boolean wheeling;

	private void moved(long time, int x, int y, int modifiers) {
		// BH cannot remember why this was important; removed because the release was being missed.
		// Maybe for touch devices?
		// clearKeyBuffer();
		if (isCtrlShiftMouseDown)
			mouseAction(MouseEvent.MOUSE_DRAGGED, time, x, y, 0,
					applyLeftMouse(modifiers), 0);
		else
			mouseAction(MouseEvent.MOUSE_MOVED, time, x, y, 0, modifiers, 0);
	}

	void wheeled(long time, int x, int y, int rotation, int modifiers) {
		// clearKeyBuffer();
		wheeling = true;
		mouseAction(MouseEvent.MOUSE_WHEEL, time, x, y, 0, modifiers
				& ~BUTTON_MASK | MOUSE_WHEEL, rotation);
	}

	/**
	 * 
	 * @param time
	 * @param x
	 * @param y
	 * @param modifiers
	 * @param isPopupTrigger
	 */
	private void pressed(long time, int x, int y, int modifiers,
			boolean isPopupTrigger) {
		// clearKeyBuffer();
		isCtrlShiftMouseDown = ((modifiers & (Event.CTRL_MASK | Event.SHIFT_MASK)) == (Event.CTRL_MASK | Event.SHIFT_MASK));
		wheeling = false;
		mouseAction(MouseEvent.MOUSE_PRESSED, time, x, y, 0, modifiers, 0);
	}

	private void released(long time, int x, int y, int modifiers) {
		isCtrlShiftMouseDown = false;
		wheeling = false;
		mouseAction(MouseEvent.MOUSE_RELEASED, time, x, y, 0, modifiers & ~EXTENDED_MASK, 0);
	}

	private void dragged(long time, int x, int y, int modifiers) {
		if (wheeling)
			return;
		if ((modifiers & MAC_COMMAND) == MAC_COMMAND)
			modifiers = modifiers & ~MOUSE_RIGHT | Event.CTRL_MASK;
		mouseAction(MouseEvent.MOUSE_DRAGGED, time, x, y, 0, modifiers, 0);
	}

	private static int applyLeftMouse(int modifiers) {
		// if neither BUTTON2 or BUTTON3 then it must be BUTTON1
		return ((modifiers & BUTTON_MASK) == 0) ? (modifiers | MOUSE_LEFT)
				: modifiers;
	}

	private int xWhenPressed, yWhenPressed, modifiersWhenPressed10;

	private static int getButton(int id, Object jqevent) {
//
// Firefox MDN notes:
//
//		button:
//
//
//		    0: Main button pressed, usually the left button or the un-initialized state
//		    1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
//		    2: Secondary button pressed, usually the right button
//		    3: Fourth button, typically the Browser Back button
//		    4: Fifth button, typically the Browser Forward button
//
//
//		buttons:
//
//		    0 : No button or un-initialized
//		    1 : Primary button (usually the left button)
//		    2 : Secondary button (usually the right button)
//		    4 : Auxilary button (usually the mouse wheel button or middle button)
//		    8 : 4th button (typically the "Browser Back" button)
//		    16 : 5th button (typically the "Browser Forward" button)
//
//
//	    On Mac OS X 10.5, the buttons attribute always returns 0 because there is no platform API for implementing this feature.
// 
//	    Utilities allow customization of button actions. Therefore, primary might not be the the left button on the device, 
		// secondary might not be the right button, and so on. Moreover, the middle
		// (wheel) button, 4th button, and 5th button might
		// not be assigned a value, even when they are pressed.
//	    Single-button devices may emulate additional buttons with combinations of button and keyboard presses.
//	    Touch devices may emulate buttons with configurable gestures (e.g., one-finger touch for primary, two-finger touch for secondary, etc.).
//	    On Linux (GTK), the 4th button and the 5th button are not supported. 
//      In addition, a mouseup event always includes the releasing button information in the buttons value.

// And, I would add: 
//
// On Windows, e.button will be 0 on a mouseup if it is the left mouse button 

		if (id != MouseEvent.MOUSE_MOVED) {
			@SuppressWarnings("unused")
			Object e = jqevent;
			switch (/** @j2sNative e.button || e.buttons && (8 << e.buttons) || */ 1) {
			case 1:
			case 8 << 1:
				return MouseEvent.BUTTON1; // left
			case 3:
			case 8 << 4:
				return MouseEvent.BUTTON2; // middle
			case 2:
			case 8 << 2:
				return MouseEvent.BUTTON3; // right
			}
		}
		return MouseEvent.NOBUTTON;
	}

	private void mouseEnterExit(long time, int x, int y, int id) {
		mouseAction(id, time, x, y, 0, 0, 0);
	}

	
	private long lasttime;
	private int lastx, lasty, clickCount;
	
	private final static int DBL_CLICK_MAX_MS = 500;
	private final static int DBL_CLICK_DX = 3; // verified in Windows

	// count ms x y
	// CirSim java clicked(5,323,573,177) 0
	// CirSim java clicked(7,415,573,178) 0
	// CirSim java clicked(8,217,573,178) 0
	// CirSim java clicked(9,180,573,178) 0
	// CirSim java clicked(10,158,573,178) 0
	// CirSim java clicked(11,331,573,175) 0
	// CirSim java clicked(12,416,573,174) 0

	// interesting that clicks are being combined and skipped

	private int updateClickCount(int id, long time, int x, int y) {
		boolean reset = (time - lasttime > DBL_CLICK_MAX_MS
				|| Math.abs(x - lastx) > DBL_CLICK_DX || Math.abs(y - lasty) > DBL_CLICK_DX);
		lasttime = time;
		lastx = x;
		lasty = y;
		int ret = clickCount;
		switch (id) {
		case Event.MOUSE_DOWN:
			ret = clickCount = (reset ? 1 : clickCount + 1);
			break;
		case Event.MOUSE_ENTER:
		case Event.MOUSE_EXIT:
			clickCount = 0;
			break;
		case Event.MOUSE_MOVE:
			if (reset)
				clickCount = 0;
			break;
		case Event.MOUSE_UP:
		case Event.MOUSE_DRAG:
		case -1: // JavaScript wheeled
			break;
		}
		return ret;
	}

	// All events in this class end up in one of these two methods.

	/**
	 * 
	 * @param id
	 * @param time
	 * @param x
	 * @param y
	 * @param xcount
	 * @param modifiers
	 * @param dy
	 */
	private void mouseAction(int id, long time, int x, int y, int xcount, int modifiers, int dy) {
		Component source = viewer.getTopComponent(); // may be a JFrame
		int count = (xcount > 1 && id == MouseEvent.MOUSE_CLICKED ? xcount : updateClickCount(id, time, x, y));
		processMouseEvent(jqevent, source, id, time, x, y, count,  modifiers, dy);
	}
	
	@SuppressWarnings("unused")
	private static void processMouseEvent(Object jqevent, Component source, int id, long time, int x, int y, int count, int modifiers,
			int dy) {
		int button = getButton(id, jqevent);
		boolean popupTrigger = isPopupTrigger(id, modifiers, JSToolkit.isWin);
		MouseEvent e;
		if (id == MouseEvent.MOUSE_WHEEL) {
			e = new MouseWheelEvent(source, id, time, modifiers, x, y, x, y, count, popupTrigger,
					MouseWheelEvent.WHEEL_UNIT_SCROLL, 1, dy);
		} else {
			e = new MouseEvent(source, id, time, modifiers, x, y, x, y, count, popupTrigger, button);
		}
		byte[] bdata = new byte[0];
		e.setBData(bdata);
		Component c = null;
		/**
		 * @j2sNative
		 * 
		 * 			bdata.jqevent = jqevent; bdata.source = c =
		 *            jqevent.j2sretarget || jqevent.target["data-component"]; 
		 *            bdata.doPropagate = c && c.ui.j2sDoPropagate;
		 */

		// bdata.doPropagate will be tested in InputEvent.doConsume.

		// the key here is that if we have a data-component, go directly to its
		// container and dispatch the event; if we go through the event queue, any
		// e.consume()
		// that occurs is too late to consume the event.

		if (c == null) {
			Toolkit.getDefaultToolkit().getSystemEventQueue().postEvent(e);
		} else {
			((Container) e.getSource()).dispatchEvent(e);
		}
	}

	public static void setPropagation(Component target, MouseEvent e) {
		@SuppressWarnings("unused")
		JQueryObject.JQEvent je = getJQEvent(e);
		/**
		 * @j2sNative
		 * 
		 * if (je && target.ui.j2sDoPropagate)
		 *   je.doPropagate = true;
		 */
	}

	private static JQEvent getJQEvent(MouseEvent e) {
		/**
		 * @j2sNative
		 * 
		 * 			return (e.bdata && e.bdata.jqevent || null)
		 */
		{
			return null;
		}
	}

	@SuppressWarnings("unused")
	public static void checkConsume(InputEvent e) {
		JSComponentUI ui = ((JComponent) e.getSource()).秘getUI();
		if (e.bdata != null && ui != null && ui.buttonListener == null 
				&& ((/** @j2sNative !e.bdata.doPropagate || */false))) {
			JSToolkit.consumeEvent(e);
		}
	}

	
	public static JComponent getJ2SEventTarget(MouseEvent e) {
		return /** @j2sNative e.bdata && e.bdata.source || */null;
	}

	private static boolean isPopupTrigger(int id, int mods, boolean isWin) {
		boolean rt = ((mods & InputEvent.BUTTON3_MASK) != 0);
		if (isWin) {
			if (id != MouseEvent.MOUSE_RELEASED)
				return false;
//
//			// Oddly, Windows returns InputEvent.META_DOWN_MASK on release, though
//			// BUTTON3_DOWN_MASK for pressed. So here we just accept both.
//
// actually, we can use XXX_MASK, not XXX_DOWN_MASK and avoid this issue, because
// J2S adds the appropriate extended (0x3FC0) and simple (0x3F) modifiers. 
//
			return rt;
		} else {
			// mac, linux, unix
			if (id != MouseEvent.MOUSE_PRESSED)
				return false;
			boolean lt = ((mods & InputEvent.BUTTON1_MASK) != 0);
			boolean ctrl = ((mods & InputEvent.CTRL_MASK) != 0);
			return rt || (ctrl && lt);
		}
	}

	@SuppressWarnings({ "unused" })
	private boolean keyAction(int id, Object jqevent, long time) {
		JComponent c = 	/** @j2sNative 
		jqevent.target["data-shadowkeycomponent"] || jqevent.target["data-keycomponent"] ||
				 */null; 
		if (c == null)
			return false;
		if (c.秘isContentPane)
			c = (JComponent) c.getTopLevelAncestor();
		return JSComponent.秘dispatchKeyEvent(c, id, jqevent, time);
	}
	
	public static int getScroll(Object ev) {
		/**
		 * @j2sNative
		 * 
		 * 			var oe = ev.originalEvent; return (oe.detail ? oe.detail :
		 *            (J2S.featureDetection.os == "mac" ? 1 : -1) * oe.wheelDelta);
		 */
		{
			return 0;
		}
	}

	public static int getModifiers(Object ev) {
		boolean shift = false, ctrl = false, meta = false, alt = false, altGraph = false;
		/**
		 * @j2sNative
		 * 
		 *            shift = ev.shiftKey;
		 *            ctrl = ev.ctrlKey;
		 *            alt = ev.altKey;
		 *            meta = ev.metaKey;
		 *            altGraph = ev.altGraphKey;
		 */
		int modifiers = 0; 
		if (shift)
			modifiers |= InputEvent.SHIFT_MASK + InputEvent.SHIFT_DOWN_MASK;
		if (ctrl)
			modifiers |= InputEvent.CTRL_MASK + InputEvent.CTRL_DOWN_MASK;
		if (alt)
			modifiers |= InputEvent.ALT_MASK + InputEvent.ALT_DOWN_MASK;
		if (meta)
			modifiers |= InputEvent.META_MASK + InputEvent.META_DOWN_MASK;
		if (altGraph)
			modifiers |= InputEvent.ALT_GRAPH_MASK + InputEvent.ALT_GRAPH_DOWN_MASK;
		return modifiers;
	}

	public static int fixEventType(Object jqevent, int def) {
		switch (/**@j2sNative jqevent.type ||*/""){
		case "keydown":
			return KeyEvent.KEY_PRESSED;
		case "keyup":
			return KeyEvent.KEY_RELEASED;
		case "keypress":
			return KeyEvent.KEY_TYPED;
		case "click":
			return MouseEvent.MOUSE_CLICKED;
		case "pointerdown":
		case "mousedown":
		case "touchstart":
			return MouseEvent.MOUSE_PRESSED;
		case "pointerup":
		case "mouseup":
		case "touchend":
			return MouseEvent.MOUSE_RELEASED;
		case "pointermove":
		case "mousemove":
			return MouseEvent.MOUSE_MOVED;
		case "mousedrag":
			return MouseEvent.MOUSE_DRAGGED;
		case "mousewheel":
			return MouseEvent.MOUSE_WHEEL;
		case "pointerover":
		case "pointerenter":
		case "mouseover":
		case "mouseenter":
			return MouseEvent.MOUSE_ENTERED;
		case "pointerout":
		case "pointerleave":
		case "mouseout":
		case "mouseleave":
			return MouseEvent.MOUSE_EXITED;
		}
		return def;			
	}
	
	@SuppressWarnings({ "null" })
	public static void retargetMouseEvent(Object jqevent, DOMNode base, JComponent from, JComponent to, int id) {
		if (id == 0)
			id = fixEventType(jqevent, 0);
		boolean isDirect = (base != null);
		JSComponent c;
		if (base == null) {
			c = JSComponent.秘getTopInvokableAncestor(from, false);
			base = c.秘getUI().getDOMNode();
		} else {
			c = from;
		}
		int[] xym = null;
		/**
		 * @j2sNative jqevent.j2sretarget = to; 
		 *            xym = J2S._getEventXY(jqevent, J2S.$(base).offset());
		 */
		int modifiers = getModifiers(jqevent);
		long time = System.currentTimeMillis();
		if (isDirect) {
			processMouseEvent(jqevent, from, id, time, xym[0], xym[1], 0, modifiers, 0);
		} else {
			c.getFrameViewer().processMouseEvent(id, xym[0], xym[1], modifiers, time, jqevent,
					getScroll(jqevent));
		}
	}

	public static DOMNode getTarget(MouseEvent e) {
		@SuppressWarnings("unused")
		JQEvent je = getJQEvent(e);
		return /** @j2sNative je ? je.target :*/null;
	}




}
