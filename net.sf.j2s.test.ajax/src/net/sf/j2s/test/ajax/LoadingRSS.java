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
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


/**
 * @author zhou renjian
 *
 * 2006-2-11
 */
public class LoadingRSS {

	public static void main3(String[] args) {
		final HttpRequest request = new HttpRequest();
		//http://j2s.sourceforge.net/blog/feed/atom/
		request.open("POST", "http://bl.ognize.com:8080/servlets-examples/servlet/RequestParamExample?hello=world", true);
		request.registerOnReadyStateChange(new XHRCallbackAdapter() {
			public void onLoaded() {
				System.out.println(request.getResponseText());
			}
		});
		request.send("firstname=23as&lastname=3q");
		System.out.println("continue!");
	}

	public static void main(String[] args) {
		final HttpRequest request = new HttpRequest();
		//request.open("GET", "http://j2s.sourceforge.net/blog/feed/atom/", true);
		request.open("GET", "http://bl.ognize.com/whizznotes/rss/all.xml", true);
		request.registerOnReadyStateChange(new XHRCallbackAdapter() {
			public void onLoaded() {
				//System.out.println(request.getResponseText());
				NodeList items = request.getResponseXML().getElementsByTagName("item");
				for (int i = 0; i < items.getLength(); i++) {
					Element item = (Element) items.item(i);
					NodeList titles = item.getElementsByTagName("title");
					Element title = (Element) titles.item(0);
					System.out.println(i + ". " + title.getFirstChild().getNodeValue());
				}
			}
		});
		request.send();
		System.out.println("continue!");
	}

	public static void main0(String[] args) {
		HttpRequest request = new HttpRequest();
		request.open("GET", "http://bl.ognize.com/whizznotes/rss/all.xml", false);
		request.send();
		System.out.println(request.getResponseText());
	}

}
