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
public class PopupMenuTest extends TestCase {
	
	/*
	 * Test popup for the normal condition
	 */
	public void testMenuPopupNormal() {
		Rectangle rect = new Rectangle(10, 10, 0, 0);
		Rectangle bounds = new Rectangle(0, 0, 640, 480);
		int width = 200;
		int height = 40;
		Rectangle pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 10, 200, 40));
	}
	
	/*
	 * Test popup when it's necessary to popup above the given
	 * rectangle.
	 */
	public void testMenuPopupAboveOrBefore() {
		Rectangle rect = new Rectangle(10, 420, 0, 0);
		Rectangle bounds = new Rectangle(0, 0, 640, 480);
		int width = 200;
		int height = 60;
		Rectangle pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 420, 200, 60));
		
		rect = new Rectangle(10, 421, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 60;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 361, 200, 60));
		
		rect = new Rectangle(440, 420, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 60;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(440, 420, 200, 60));
		
		rect = new Rectangle(441, 420, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 60;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(241, 420, 200, 60));
		
		rect = new Rectangle(441, 421, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 60;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(241, 361, 200, 60));
	}
	
	/*
	 * Test popup when it's necessary to popup override the given
	 * rectangle.
	 */
	public void testMenuPopupOver() {
		Rectangle rect = new Rectangle(10, 300, 0, 0);
		Rectangle bounds = new Rectangle(0, 0, 480, 640);
		int width = 200;
		int height = 340;
		Rectangle pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 300, 200, 340));
		
		rect = new Rectangle(10, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 360;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 280, 200, 360));

		rect = new Rectangle(10, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 640;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 0, 200, 640));
		
		rect = new Rectangle(10, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 650;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 0, 200, 640));

		// x
		rect = new Rectangle(280, 300, 0, 0);
		bounds = new Rectangle(0, 0, 480, 640);
		width = 200;
		height = 340;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(280, 300, 200, 340));
		
		rect = new Rectangle(120, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		width = 380;
		height = 360;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(100, 280, 380, 360));

		rect = new Rectangle(10, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		width = 480;
		height = 640;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(0, 0, 480, 640));
		
		rect = new Rectangle(10, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		width = 500;
		height = 650;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(0, 0, 480, 640));
	}
	
	public void testMenuPopupUpOrDown() {
		Rectangle rect = new Rectangle(10, 300, 0, 0);
		Rectangle bounds = new Rectangle(0, 0, 480, 640);
		int width = 200;
		int height = 0;
		Rectangle pos = null;

		rect = new Rectangle(10, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 200, 200, 440));

		rect = new Rectangle(10, 360, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 0, 200, 440));

		rect = new Rectangle(10, 320, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 200, 200, 440));

		rect = new Rectangle(10, 321, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 0, 200, 440));

		rect = new Rectangle(10, 319, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(10, 200, 200, 440));
		
		// x
		rect = new Rectangle(200, 300, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		width = 360;
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(120, 200, 360, 440));

		rect = new Rectangle(280, 360, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(0, 0, 360, 440));

		rect = new Rectangle(240, 320, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(120, 200, 360, 440));

		rect = new Rectangle(241, 321, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(0, 0, 360, 440));

		rect = new Rectangle(239, 319, 0, 0);
		//bounds = new Rectangle(0, 0, 640, 480);
		height = 440;
		pos = Popup.popupMenu(bounds, rect, width, height, 0);
		assertEquals(pos, new Rectangle(120, 200, 360, 440));

	}
}
