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

import net.sf.j2s.ajax.HttpRequest;
import net.sf.j2s.ajax.XHRCallbackAdapter;


/**
 * @author zhou renjian
 *
 * 2006-2-11
 */
public class Base64UserPasswordTest {

	public static void main(String[] args) {
		final HttpRequest request = new HttpRequest();
		request.open("GET", "http://localhost:8080/manager/html", true, "hello", "hello");
		request.registerOnReadyStateChange(new XHRCallbackAdapter() {
			public void onLoaded() {
				System.out.println(request.getAllResponseHeaders());
				System.out.println(request.getResponseText());
			}
		});
		request.send();
		System.out.println("continue!");
	}
}
