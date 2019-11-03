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

package org.eclipse.jface.window;

import org.eclipse.swt.widgets.Shell;

/**
 * @author josson smith
 *
 * 2006-4-29
 */
public class WindowProxy {
	public static Shell getParentShell(Window window) {
		return window.getParentShell();
	}
}
