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
 * This interface is used in the Java side to decide whether a given field
 * should be serialized or not.
 * 
 * Usually, fields with modifier of public or protected among types of number
 * type, string type, array type will be serialized by default. But when a
 * SimpleFieldFilter is specified, some of the fields may not be serialized
 * again. For example, when a SimpleRPCRunnable instance is passed in through
 * HTTP connection, and some fields are modified before this instance is 
 * back to client side. But it is no need to serialize all fields but only 
 * those modified fields.
 * 
 * @author zhou renjian
 *
 * 2007-06-10
 */
public interface SimpleFilter {

	/**
	 * Filter the fields to be serialized or not.
	 * @param field
	 * @return true for to be ignored and false for to be serialzed  
	 */
	public boolean accept(String field);
	
	/**
	 * Ignore fields with default value or not.
	 * @return true for to enable ignoring and false to keep serializing
	 */
	public boolean ignoreDefaultFields();

}
