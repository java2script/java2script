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
public class DragAdapter implements DragListener {

	public boolean dragBegan(DragEvent e) {
		return true;
	}

	public boolean dragCanceled(DragEvent e) {
		return true;
	}

	public boolean dragEnded(DragEvent e) {
		return true;
	}

	public boolean dragging(DragEvent e) {
		return true;
	}

	public boolean isDraggable(HTMLEventWrapper e) {
		return true;
	}

}
