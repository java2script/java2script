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

package net.sf.j2s.ui.launching;

import java.util.HashSet;
import java.util.Set;

/**
 * @author zhou renjian
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
