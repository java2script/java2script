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

import org.eclipse.swt.internal.xhtml.Element;

/**
 * @author zhou renjian
 *
 * 2006-3-15
 * 
 * @j2sSuffix
org.eclipse.swt.internal.dnd.HTMLEventWrapper.mozLastButton = 0;
 */
public class HTMLEventWrapper {
	public Element target;
	public int x;
	public int y;
	public boolean leftButtonHold;
	public Object event;
	public int type;
	
	public HTMLEventWrapper(Object event) {
		this.event = event;
		this.wrapEvent(event);
	}
	
	/**
	 * @param a
	 * 
	 * @j2sNative
	var e = a; // event
	this.target = null;
	this.x = 0;
	this.y = 0;
	this.leftButtonHold = true;
	this.event = null;
	this.type = 0;

	// See more about Event properties at 
	// http://www.quirksmode.org/js/events_properties.html
	if (!e || (window["O$"] != null && O$.isIE)) {
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
	 */
	protected void wrapEvent(Object a) {
		
	}

	public void stopPropagation() {
		
	}
	
	public void preventDefault() {
		
	}
	
}
