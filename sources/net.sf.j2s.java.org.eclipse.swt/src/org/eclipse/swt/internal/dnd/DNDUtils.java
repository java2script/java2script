/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package org.eclipse.swt.internal.dnd;

import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author josson smith
 *
 * 2006-3-15
 */
public class DNDUtils {
	public static Object onselectstart;
	public static Object onmousemove;
	public static Object onmousedown;
	public static Object onmouseup;
	public static Object onkeyup;
	public static Object bindFunctionWith(Object aFun, Object obj) {
		return obj;
	}
	public static boolean onselectstart(Object e) {
		HTMLEventWrapper evt = new HTMLEventWrapper (e);
		evt.preventDefault ();
		evt.stopPropagation ();
		return false;
	}
	public static boolean onmousemove(Object e, DragAndDrop oThis) {
		HTMLEventWrapper evt = new HTMLEventWrapper(e);
		if (!evt.leftButtonHold) {
			//oThis.element.onmouseup (e); /* reset */
			if (oThis.status != 0) {
				DragEvent dndEvt = new DragEvent (evt, oThis.element, 
						oThis.startX, oThis.startY);
				dndEvt.mouseMoveTo (evt.x, evt.y);
				oThis.notifyDragEnded (dndEvt);
				oThis.status = 0;
			}
			oThis.reset();
			return false;
		}
		DragEvent dndEvt = new DragEvent (evt, oThis.element, 
				oThis.startX, oThis.startY);
		if (oThis.status == 0) {
			oThis.status = 1;
			oThis.startX = evt.x;
			oThis.startY = evt.y;
			dndEvt.mouseMoveTo (evt.x, evt.y);
			oThis.notifyDragBegan (dndEvt);
		}
		dndEvt.mouseMoveTo (evt.x, evt.y);
		oThis.notifyDragging (dndEvt);
		return true;
	}
	public static boolean onmousedown(Object e, DragAndDrop oThis) {
		HTMLEventWrapper evt = new HTMLEventWrapper (e);
		if (!oThis.checkDraggable (evt)) {
			return true;
		}
		document.onselectstart = DNDUtils.onselectstart;
		evt.target.onselectstart = DNDUtils.onselectstart;
		document.onmousemove = DNDUtils.bindFunctionWith (DNDUtils.onmousemove, oThis);
		document.onkeyup = DNDUtils.bindFunctionWith (DNDUtils.onkeyup, oThis);
		document.onmouseup = DNDUtils.bindFunctionWith (DNDUtils.onmouseup, oThis); //oThis.element.onmouseup;
		evt.preventDefault ();
		evt.stopPropagation ();
		return false;
		//return true;
	}
	public static boolean onkeyup(Object e, DragAndDrop oThis) {
		HTMLEventWrapper evt = new HTMLEventWrapper (e);
		if (((HTMLEvent) evt.event).keyCode == 27) {
			if (oThis.status != 0) {
				DragEvent dndEvt = new DragEvent (evt, oThis.element,
						oThis.startX, oThis.startY);
				dndEvt.mouseMoveTo (evt.x, evt.y);
				oThis.notifyDragCanceled (dndEvt);
				oThis.status = 0;
			}
			oThis.reset ();
			return false;
		}
		return true;
	}	
	public static boolean onmouseup(Object e, DragAndDrop oThis) {
		if (oThis.status != 0) {
			HTMLEventWrapper evt = new HTMLEventWrapper (e);
			DragEvent dndEvt = new DragEvent (evt, oThis.element, 
					oThis.startX, oThis.startY);
			dndEvt.mouseMoveTo (evt.x, evt.y);
			oThis.notifyDragEnded (dndEvt);
			oThis.status = 0;
		}
		oThis.reset ();
		HTMLEventWrapper evt = new HTMLEventWrapper (e);
		evt.preventDefault ();
		evt.stopPropagation ();
		return false;
		//return true;
	}
}
