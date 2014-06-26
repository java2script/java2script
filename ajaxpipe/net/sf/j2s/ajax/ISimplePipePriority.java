/*******************************************************************************
 * Copyright (c) 2009 java2script.org and others.
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
 * 
 * @author Zhou Renjian (http://zhourenjian.com)
 *
 * Feb 26, 2009
 */
public interface ISimplePipePriority {
	
	public final int IMPORTANT = 32;
	
	public final int NORMAL = 8;
	
	public final int TRIVIAL = 1;
	
	public int getPriority();

}
