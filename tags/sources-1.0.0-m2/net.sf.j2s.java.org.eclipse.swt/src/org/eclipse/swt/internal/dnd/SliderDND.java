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


/**
 * @author josson smith
 *
 * 2006-3-15
 */
public class SliderDND extends DragAdapter {
	protected int sourceX = 0;
	protected int sourceY = 0;
	protected boolean isHorizontal;
	public boolean dragBegan(DragEvent e) {
		String cssName = e.sourceElement.className;
		if (cssName.indexOf ("horizontal") != -1) {
			isHorizontal = true;
		} else {
			isHorizontal = false;
		}
		this.sourceX = Integer.parseInt (e.sourceElement.style.left);
		this.sourceY = Integer.parseInt (e.sourceElement.style.top);
		/* first time, set start location to current location */
		e.startX = e.currentX;
		e.startY = e.currentY;
		return true;
	}
}
