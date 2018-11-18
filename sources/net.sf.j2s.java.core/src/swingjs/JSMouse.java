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

import java.awt.event.InputEvent;
import java.awt.Component;
import java.awt.Container;
import java.awt.Event;
import java.awt.Toolkit;
import java.awt.event.MouseEvent;
import java.awt.event.MouseWheelEvent;

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
		this.jqevent = jqevent;
		if (id != MouseEvent.MOUSE_WHEEL && id != MouseEvent.MOUSE_MOVED)
			modifiers = applyLeftMouse(modifiers);
		switch (id) {	
		case MouseEvent.MOUSE_WHEEL:
			wheeled(time, x, y, scroll, modifiers);
			break;
		case MouseEvent.MOUSE_PRESSED:
			xWhenPressed = x;
			yWhenPressed = y;
			modifiersWhenPressed10 = modifiers;
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
			released(time, x, y, modifiers);
			// simulate a mouseClicked event for us
//			if (x == xWhenPressed && y == yWhenPressed
//					&& modifiers == modifiersWhenPressed10) {
//				// the underlying code will turn this into dbl clicks for us
//				clicked(time, x, y, modifiers, 1);
//			}
			break;
		case MouseEvent.MOUSE_CLICKED:
			int n = /** @j2sNative jqevent.originalEvent.detail || */ 0;
			clicked(time, x, y, modifiers, n);
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
		// TODO Auto-generated method stub

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
		mouseAction(MouseEvent.MOUSE_RELEASED, time, x, y, 0, modifiers, 0);
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

	private int getButton(int modifiers) {
		switch (modifiers & BUTTON_MASK) {
		case MOUSE_LEFT:
			return MouseEvent.BUTTON1;
		case MOUSE_MIDDLE:
			return MouseEvent.BUTTON2;
		case MOUSE_RIGHT:
			return MouseEvent.BUTTON3;
		default:
			return MouseEvent.NOBUTTON;
		}
	}

	private void mouseEnterExit(long time, int x, int y, int id) {
		mouseAction(id, time, x, y, 0, 0, 0);
	}

	@SuppressWarnings("unused")
	private void mouseAction(int id, long time, int x, int y, int xcount,
			int modifiers, int dy) {

		// Oddly, Windows returns InputEvent.META_DOWN_MASK on release, though
		// BUTTON3_DOWN_MASK for pressed. So here we just accept both when not a
		// mac.
		// A bit of a kludge.

		int extended = modifiers & EXTENDED_MASK;
		boolean popupTrigger = (
				extended == InputEvent.BUTTON3_DOWN_MASK	|| 
				extended == InputEvent.META_DOWN_MASK ||
				JSToolkit.isMac && extended == (InputEvent.CTRL_DOWN_MASK | InputEvent.BUTTON1_DOWN_MASK));
		int button = getButton(modifiers);
		int count = (xcount > 1 && id == MouseEvent.MOUSE_CLICKED ? xcount : updateClickCount(id, time, x, y));

		Component source = viewer.getTopComponent(); // may be a JFrame
		MouseEvent e;
		if (id == MouseEvent.MOUSE_WHEEL) {
			e = new MouseWheelEvent(source, id, time, modifiers, x, y, x, y, count, 
							popupTrigger, MouseWheelEvent.WHEEL_UNIT_SCROLL, 1, dy);
		} else {
		// Component source, int id, long when, int modifiers,
    // int x, int y, int xAbs, int yAbs, int clickCount, boolean popupTrigger,
    // int scrollType, int scrollAmount, int wheelRotation
			
		e = new MouseEvent(source, id, time, modifiers, x, y, x, y,
				count, popupTrigger, button);
		}
		byte[] bdata = new byte[0];
		e.setBData(bdata);
		Object jqevent = this.jqevent;
		Component c = null;
		/**
		 * @j2sNative 
		 * 
		 * bdata.jqevent = jqevent;
		 * c = jqevent.target["data-component"];
		 */
		
		// the key here is that if we have a data-component, we must go directly to its
		// container and dispatch the event; if we go through the event queue, any e.consume()
		// that occurs is too late to consume the event. 
		
//		if (c == null) {
	//		Toolkit.getDefaultToolkit().getSystemEventQueue().postEvent(e);
		//} else {
		  ((Container) e.getSource()).dispatchEvent(e);
	//	}
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
//		System.out.println("setting mouse click to " + clickCount + " returning  "
	//			+ ret);
		return ret;
	}

}
