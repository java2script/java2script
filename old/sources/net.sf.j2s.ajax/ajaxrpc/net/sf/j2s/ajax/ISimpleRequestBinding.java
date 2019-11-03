/*******************************************************************************
 * Copyright (c) 2013 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian / zhourenjian@gmail.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

public interface ISimpleRequestBinding extends ISimpleRequestInfoBinding {

	public void setRequestPort(int port);
	public void setRequestSecurity(boolean sslEnabled);

}
