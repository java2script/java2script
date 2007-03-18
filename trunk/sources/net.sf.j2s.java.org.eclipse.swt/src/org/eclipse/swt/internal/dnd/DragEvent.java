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
 */
public class DragEvent {
	public HTMLEventWrapper event;
	
	public Element sourceElement;
	
	public int startX;
	public int startY;
	
	public int currentX = 0;
	public int currentY = 0;
	
	public DragEvent(HTMLEventWrapper evt, Element src, int x, int y) {
		this.event = evt;
		this.sourceElement = src;
		this.startX = x;
		this.startY = y;
	}
	public int deltaX() {
		return this.currentX - this.startX;
	}
	public int deltaY() {
		return this.currentY - this.startY;
	}
	public void mouseMoveTo(int currentX, int currentY) {
		this.currentX = currentX;
		this.currentY = currentY;
	}
	public String toString() {
		return "DragEvent {" + this.sourceElement + "#" 
				+ "(" + this.startX + "," + this.startY + ")->" 
				+ "(" + this.currentX + "," + this.currentY + ")}";
	};

}
