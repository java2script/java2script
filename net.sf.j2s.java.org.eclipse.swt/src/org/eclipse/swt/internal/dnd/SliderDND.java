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

import org.eclipse.swt.internal.xhtml.CSSStyle;


/**
 * @author zhou renjian
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
		CSSStyle style = e.sourceElement.style;
		this.sourceX = style.left.length() > 0 ? Integer.parseInt (e.sourceElement.style.left) : 0;
		this.sourceY = style.top.length() > 0 ? Integer.parseInt (e.sourceElement.style.top) : 0;
		/* first time, set start location to current location */
		e.startX = e.currentX;
		e.startY = e.currentY;
		return true;
	}
}
