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

package net.sf.j2s.ajax;

import org.eclipse.swt.widgets.Display;

/**
 * 
 * @author Zhou Renjian (http://zhourenjian.com)
 *
 * Jul 12, 2008
 */
public class SWTHelper {

	public static void syncExec(Display disp, Runnable runnable) {
		if (disp == null || disp.isDisposed()) {
			runnable.run();
		} else {
			try {
				disp.syncExec(runnable);
			} catch (NullPointerException e) {
				//e.printStackTrace();
				runnable.run();
			}
		}
	}

}
