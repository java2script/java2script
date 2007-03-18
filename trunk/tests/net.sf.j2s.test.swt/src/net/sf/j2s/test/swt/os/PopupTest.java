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

package net.sf.j2s.test.swt.os;

import org.eclipse.swt.graphics.Rectangle;
import junit.framework.TestCase;

/**
 * @author zhou renjian
 *
 * 2006-9-12
 */
public class PopupTest extends TestCase {
	
	/*
	 * Test popup for the normal condition
	 */
	public void testComboPopupNormal() {
		Rectangle rect = new Rectangle(10, 10, 200, 20);
		Rectangle bounds = new Rectangle(0, 0, 640, 480);
		int height = 40;
		Rectangle pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 30, 200, 40));
	}
	
	/*
	 * Test popup when it's necessary to popup above the given
	 * rectangle.
	 */
	public void testComboPopupAbove() {
		Rectangle rect = new Rectangle(10, 420, 200, 20);
		Rectangle bounds = new Rectangle(0, 0, 640, 480);
		int height = 40;
		Rectangle pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 440, 200, 40));
		
		rect = new Rectangle(10, 421, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 40;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 381, 200, 40));
	}
	
	/*
	 * Test popup when it's necessary to popup override the given
	 * rectangle.
	 */
	public void testComboPopupOver() {
		Rectangle rect = new Rectangle(10, 300, 200, 20);
		Rectangle bounds = new Rectangle(0, 0, 480, 640);
		int height = 320;
		Rectangle pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 320, 200, 320));
		
		rect = new Rectangle(10, 300, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 340;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 300, 200, 340));

		rect = new Rectangle(10, 300, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 640;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 0, 200, 640));
		
		rect = new Rectangle(10, 300, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 650;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 0, 200, 640));
	}
	
	public void testComboPopupUpOrDown() {
		Rectangle rect = new Rectangle(10, 300, 200, 20);
		Rectangle bounds = new Rectangle(0, 0, 480, 640);
		int height = 0;
		Rectangle pos = null;

		rect = new Rectangle(10, 300, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 200, 200, 440));

		rect = new Rectangle(10, 360, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 0, 200, 440));

		rect = new Rectangle(10, 310, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 200, 200, 440));

		rect = new Rectangle(10, 311, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 0, 200, 440));

		rect = new Rectangle(10, 309, 200, 20);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupList(bounds, rect, height);
		assertEquals(pos, new Rectangle(10, 200, 200, 440));
	}
}
