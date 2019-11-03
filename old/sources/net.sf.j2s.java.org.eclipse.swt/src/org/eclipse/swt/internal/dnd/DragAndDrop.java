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
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author zhou renjian
 *
 * 2006-3-15
 */
public class DragAndDrop {
	int status = 0;
	Element element = null;
	int startX = 0;
	int startY = 0;
	private DragListener[] listeners = new DragListener[0];
	
	Object hSelectStart;
	Object hMouseDown;
	Object hMouseUp;
	Object hMouseMove;
	Object hKeyUp;
	
	protected void reset() {
		status = 0;
		if (hMouseMove != null) {
			Clazz.removeEvent(document.class, "mousemove", hMouseMove);
			hMouseMove = null;
		}
		if (hMouseUp != null) {
			Clazz.removeEvent(document.class, "mouseup", hMouseUp);
			hMouseUp = null;
		}
		if (hKeyUp != null) {
			Clazz.removeEvent(document.class, "keyup", hKeyUp);
			hKeyUp = null;
		}
		if (this.element != null && hSelectStart != null) {
			Clazz.removeEvent(element, "selectstart", hSelectStart);
		}
		if (hSelectStart != null) {
			Clazz.removeEvent(document.class, "selectstart", hSelectStart);
			hSelectStart = null;
		}
	}
	public void bind(Element el) {
		this.element = el;
		if (hMouseDown == null) {
			hMouseDown = DNDUtils.bindFunctionWith (DNDUtils.onmousedown, this);
			Clazz.addEvent(el, "mousedown", hMouseDown);
		}
	}
	public void unbind()  {
		if (hMouseDown != null) {
			Clazz.removeEvent(element, "mouseover", hMouseDown);
			hMouseDown = null;
		}
		element = null;
	}
	public boolean checkDraggable(HTMLEventWrapper e) {
		for (int i = 0; i < this.listeners.length; i++) {
			if (!this.listeners[i].isDraggable (e)) {
				return false;
			}
		}
		return true;
	}
	public boolean notifyDragBegan(DragEvent e) {
		for (int i = 0; i < this.listeners.length; i++) {
			if (!this.listeners[i].dragBegan (e)) {
				return false;
			}
		}
		return true;
	}
	public boolean notifyDragging(DragEvent e) {
		for (int i = 0; i < this.listeners.length; i++) {
			this.listeners[i].dragging (e);
		}
		return true;
	}
	public boolean notifyDragEnded(DragEvent e) {
		for (int i = 0; i < this.listeners.length; i++) {
			this.listeners[i].dragEnded (e);
		}
		return true;
	};
	public boolean notifyDragCanceled(DragEvent e) {
		for (int i = 0; i < this.listeners.length; i++) {
			this.listeners[i].dragCanceled (e);
		}
		return true;
	}
	public void addDragListener(DragListener listener) {
		for (int i = 0; i < this.listeners.length; i++) {
			if (this.listeners[i] == listener) {
				return ;
			}
		}
		this.listeners[this.listeners.length] = listener;
	}
	public DragListener removeDragListener(DragListener listener) {
		for (int i = 0; i < this.listeners.length; i++) {
			if (this.listeners[i] == listener) {
				for (int j = i + 1; j < this.listeners.length; j++) {
					this.listeners[j - 1] = this.listeners[j];
				}
				//this.listeners.length--;
				DragListener[] oldListeners = this.listeners;
				this.listeners = new DragListener[oldListeners.length - 1];
				for (int j = 0; j < oldListeners.length - 1; j++) {
					this.listeners[j] = oldListeners[j];
				}
				return listener;
			}
		}
		return null;
	}
}
