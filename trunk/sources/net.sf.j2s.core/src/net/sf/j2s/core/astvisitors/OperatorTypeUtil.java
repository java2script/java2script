/*******************************************************************************
 * Copyright (c) 2005 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

public class OperatorTypeUtil {
	public static boolean isIntegerType(String type) {
		if ("int".equals(type)
				|| "long".equals(type)
				|| "byte".equals(type)
				|| "short".equals(type)
				|| "char".equals(type)) {
			return true;
		}
		return false;
	}
}
