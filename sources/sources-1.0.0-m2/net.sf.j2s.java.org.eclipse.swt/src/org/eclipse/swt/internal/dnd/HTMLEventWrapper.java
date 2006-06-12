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

/**
 * @author josson smith
 *
 * 2006-3-15
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
	
	protected void wrapEvent(Object event) {
		
	}

	public void stopPropagation() {
		
	}
	
	public void preventDefault() {
		
	}
	
}
