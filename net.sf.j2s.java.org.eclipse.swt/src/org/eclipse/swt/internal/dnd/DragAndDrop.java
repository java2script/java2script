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

import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author josson smith
 *
 * 2006-3-15
 */
public class DragAndDrop {
	int status = 0;
	Element element = null;
	int startX = 0;
	int startY = 0;
	private DragListener[] listeners = new DragListener[0];
	
	protected void reset() {
		status = 0;
		document.onmousemove = null;
		document.onmouseup = null;
		document.onselectstart = null;
		document.onkeyup = null;
		if (this.element != null) {
			this.element.onselectstart = null;
		}
	}
	public void bind(Element el) {
		this.element = el;
		el.onmousedown =  DNDUtils.bindFunctionWith (DNDUtils.onmousedown, this);
		//el.onmouseup =  DNDUtils.bindFunctionWith (DNDUtils.onmouseup, this);
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
