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
 * @j2sSuffix
var methods = ["onmousedown", "onmouseup", "onmousemove",
		"onkeyup", "onselectstart"];
for (var i = 0; i < methods.length; i++) {
	org.eclipse.swt.internal.dnd.DNDUtils["$" + methods[i]] =
			org.eclipse.swt.internal.dnd.DNDUtils[methods[i]];
}
org.eclipse.swt.internal.dnd.DNDUtils.bindFunctionWith = function (aFun, obj) {
	var xFun = null;
	eval ("xFun = " + aFun + ";");
	return (function (yFun, o) {
		return function (e) {
			return yFun (e, o);
		}
	}) (xFun, obj);
};
org.eclipse.swt.internal.dnd.HTMLEventWrapper.prototype.wrapEvent = null;
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = 0;
Clazz.defineMethod (org.eclipse.swt.internal.dnd.HTMLEventWrapper, "wrapEvent",
function (e) {
	this.target = null;
	this.x = 0;
	this.y = 0;
	this.leftButtonHold = true;
	this.event = null;
	this.type = 0;

	// See more about Event properties at 
	// http://www.quirksmode.org/js/events_properties.html
	if (!e) {
		e = window.event;
		this.stopPropagation = function () {
			this.event.cancelBubble = true;
		};
		this.preventDefault = function () {
			this.event.returnValue = false;
		};
	} else {
		this.stopPropagation = function () {
			this.event.stopPropagation ();
		};
		this.preventDefault = function () {
			this.event.preventDefault ();
		};
	}
	this.event = e;
	this.type = e.type;
	if (e.target) {
		this.target = e.target;
	} else if (e.srcElement) {
		this.target = e.srcElement;
	}
	if (e.pageX || e.pageY) {
		this.x = e.pageX;
		this.y = e.pageY;
	} else if (e.clientX || e.clientY) {
		this.x = e.clientX + document.body.scrollLeft;
		this.y = e.clientY + document.body.scrollTop;
	}

	if (e.which) {
		this.leftButtonHold = (e.which == 1);
		if (e.which == 19 || e.which == 65536 || e.which > 8) {
			this.leftButtonHold = (org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton == 1);
		} else {
			org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = e.which;
		}
	} else if (e.button) {
		this.leftButtonHold = (e.button == 1);
	}
}, "Object");
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
