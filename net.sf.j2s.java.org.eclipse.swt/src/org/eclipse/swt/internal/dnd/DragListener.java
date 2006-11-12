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
public interface DragListener {
	public boolean isDraggable(HTMLEventWrapper e);
	public boolean dragBegan(DragEvent e);
	public boolean dragging(DragEvent e);
	public boolean dragEnded(DragEvent e);
	public boolean dragCanceled(DragEvent e);
}
