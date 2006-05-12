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

package org.eclipse.swt.internal;

import org.eclipse.swt.SWT;

/**
 * @author josson smith
 *
 * 2006-2-7
 */
public final class Compatibility {
	/**
	 * Returns 2 raised to the power of the argument.
	 *
	 * @param n an int value between 0 and 30 (inclusive)
	 * @return 2 raised to the power of the argument
	 *
	 * @exception IllegalArgumentException <ul>
	 *    <li>ERROR_INVALID_RANGE - if the argument is not between 0 and 30 (inclusive)</li>
	 * </ul>
	 */
	public static int pow2(int n) {
		if (n >= 1 && n <= 30)
			return 2 << (n - 1);
		else if (n != 0) {
			SWT.error(SWT.ERROR_INVALID_RANGE);
		}
		return 1;
	}

}
