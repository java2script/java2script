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

package net.sf.j2s.test.ajax;

import net.sf.j2s.ajax.SimpleRPCRequest;

/**
 * @author zhou renjian
 *
 * 2007-1-23
 */
public class ZZRunnableTest {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		SimpleRPCRequest.switchToAJAXMode();
		SimpleRPCRequest.request(new ZZRunnable() {
			/* (non-Javadoc)
			 * @see net.sf.j2s.test.ajax.ZZRunnable#getHttpURL()
			 */
			public String getHttpURL() {
				return "http://localhost/doitrightnow/simplerpc";
			}
			public void ajaxIn() {
				System.out.println("In");
				
				this.name = "";
				for (int i = 0; i < 10; i++) {
					this.name += "ABC %?#ABC %?#ABC %?#";
				}
			}
			public void ajaxOut() {
				System.out.println("Out");
				System.out.println(this.name);
			}
			public void ajaxFail() {
				System.out.println("Fail");
			}
		});
	}
}
