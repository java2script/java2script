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

package net.sf.j2s.ui.launching;

import java.util.HashSet;
import java.util.Set;

/**
 * @author josson smith
 *
 * 2006-8-12
 */
public class J2SCyclicProjectUtils {
	
	private static Set tracks = new HashSet();
	
	public static void emptyTracks() {
		tracks.clear();
	}
	
	public static boolean visit(Object obj) {
		if (tracks.contains(obj)) {
			return false;
		}
		tracks.add(obj);
		return true;
	}
}
