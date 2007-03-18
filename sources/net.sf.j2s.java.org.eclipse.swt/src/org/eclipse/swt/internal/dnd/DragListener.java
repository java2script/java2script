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

/**
 * @author zhou renjian
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
