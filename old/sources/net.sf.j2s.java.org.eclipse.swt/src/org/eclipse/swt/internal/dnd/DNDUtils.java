/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package org.eclipse.swt.internal.dnd;

import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author zhou renjian
 *
 * 2006-3-15
 * 
 * @j2sSuffix
var methods = ["onmousedown", "onmouseup", "onmousemove",
		"onkeyup", "onselectstart"];
for (var i = 0; i < methods.length; i++) {
	org.eclipse.swt.internal.dnd.DNDUtils["$" + methods[i]] =
			org.eclipse.swt.internal.dnd.DNDUtils[methods[i]];
}
 */
public class DNDUtils {
	public static Object onselectstart;
	public static Object onmousemove;
	public static Object onmousedown;
	public static Object onmouseup;
	public static Object onkeyup;
	
	/**
	 * @param aFun
	 * @param obj
	 * @return
	 * 
	 * @j2sNative
	var xFun = null;
	eval ("xFun = " + a + ";");
	return (function (yFun, o) {
		return function (e) {
			return yFun (e, o);
		}
	}) (xFun, b);
	 * @j2sNativeSrc
	var xFun = null;
	eval ("xFun = " + aFun + ";");
	return (function (yFun, o) {
		return function (e) {
			return yFun (e, o);
		}
	}) (xFun, obj);
	 */
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
			dndEvt.startX = oThis.startX;
			dndEvt.startY = oThis.startY;
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
		if (oThis.hSelectStart == null) {
			oThis.hSelectStart = DNDUtils.onselectstart;
			Clazz.addEvent(document.class, "selectstart", oThis.hSelectStart);
			Clazz.addEvent(evt.target, "selectstart", oThis.hSelectStart);
		}
		
		oThis.startX = evt.x;
		oThis.startY = evt.y;
		if (oThis.hMouseMove == null) {
			oThis.hMouseMove = DNDUtils.bindFunctionWith (DNDUtils.onmousemove, oThis);
			Clazz.addEvent(document.class, "mousemove", oThis.hMouseMove);
		}
		if (oThis.hKeyUp == null) {
			oThis.hKeyUp = DNDUtils.bindFunctionWith (DNDUtils.onkeyup, oThis);
			Clazz.addEvent(document.class, "keyup", oThis.hKeyUp);
		}
		if (oThis.hMouseUp == null) {
			oThis.hMouseUp = DNDUtils.bindFunctionWith (DNDUtils.onmouseup, oThis);
			Clazz.addEvent(document.class, "mouseup", oThis.hMouseUp);
		}
		boolean isOpera = false;
		/**
		 * @j2sNative
		 * var dua = navigator.userAgent;
		 * isOpera = dua.indexOf("Opera") >= 0;
		 */ {}
		if (isOpera) {
			/*
			 * Why ? Sep 16, 2006
			 * Opera will have text selection. Sep 15, 2008
			 */
			evt.preventDefault ();
			evt.stopPropagation ();
			return false;
		}
		return true;
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
