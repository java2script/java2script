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

/**
 * @author zhou renjian
 *
 * 2007-06-10
 */
public interface SimpleFieldFilter {

	/**
	 * Filter the fields to be serialized or not.
	 * @param field
	 * @return true for to be ignored and false for to be serialzed  
	 */
	public boolean filter(String field);
	
}
