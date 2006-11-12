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

package org.eclipse.swt.internal.struct;

import org.eclipse.swt.widgets.Control;

/**
 * @author josson smith
 *
 * 2006-6-2
 */
public class MESSAGE {
	public static final int CONTROL_RESIZE = 1;
	public static final int CONTROL_LAYOUT = 2;
	
	public boolean defer;
	public Control control;
	public int type;
	public Object data;
	
	public MESSAGE(Control control, int type, Object data) {
		super();
		this.control = control;
		this.type = type;
		this.data = data;
	}
	
}
