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

import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import junit.framework.TestCase;

/**
 * @author zhou renjian
 *
 * 2006-10-1
 */
public class CoolBarVerticalTest extends TestCase {
	CoolBar bar;
	CoolItem item1;
	CoolItem item2;
	CoolItem item3;
	CoolItem item4;
	
	protected void setUp() throws Exception {
		bar = new CoolBar();
		bar.items = new CoolItem[4];
		bar.originalItems = new CoolItem[4];
		item1 = new CoolItem(bar);
		bar.items[0] = item1;
		bar.originalItems[0] = item1;
		item1.setPreferredSize(200, 24);
		item2 = new CoolItem(bar);
		bar.items[1] = item2;
		bar.originalItems[1] = item2;
		item2.setMinimumSize(13, 24);
		item2.setPreferredSize(100, 24);
		item3 = new CoolItem(bar);
		bar.items[2] = item3;
		bar.originalItems[2] = item3;
		item3.setPreferredSize(60, 24);
		item4 = new CoolItem(bar);
		bar.items[3] = item4;
		bar.originalItems[3] = item4;
		item4.setPreferredSize(60, 24);
		bar.setWrapIndices(new int[] { 3 });
	}

	public void testCoolBarSize() {
		// Make sure virtual CoolBar is in the correct size
		Point computeSize = bar.computeSize(-1, -1, false);
		assertEquals(computeSize, new Point(364, 50));
	}

	public void testCoolBarVerticalLine() {
		assertEquals(bar.verticalLineByPixel(-1), -1);
		assertEquals(bar.verticalLineByPixel(0), 0);
		assertEquals(bar.verticalLineByPixel(23), 0);
		assertEquals(bar.verticalLineByPixel(26), 1);
		assertEquals(bar.verticalLineByPixel(28), 1);
		assertEquals(bar.verticalLineByPixel(50), 2);
		assertEquals(bar.verticalLineByPixel(76), 2);
		assertEquals(bar.verticalLineByPixel(77), 2);
	}

	public void testCoolItemSize() {
		layout();
		// Make sure virtual CoolItem is in the correct bounds
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
		assertEquals(item2.getBounds(), new Rectangle(202, 0, 102, 24));
		assertEquals(item3.getBounds(), new Rectangle(304, 0, 60, 24));
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}

	void layout() {
		Point computeSize = bar.computeSize(-1, -1, false);
		bar.SetWindowPos(null, null, 5, 5, computeSize.x, computeSize.y, 0);
	}
	
	/*
	 * Normal up and down move
	 */
	public void testMoveItem1Up() {
		layout();
		bar.moveDelta(0, 2, -1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 364, 24));
		assertEquals(item2.getBounds(), new Rectangle(0, 26, 102, 24));
		assertEquals(item3.getBounds(), new Rectangle(102, 26, 262, 24));
		assertEquals(item4.getBounds(), new Rectangle(0, 52, 364, 24));
	}
	public void testMoveItem2Up() {
		layout();
		bar.moveDelta(1, 2, -1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 364, 24));
//		assertEquals(item2.getBounds(), new Rectangle(0, 26, 102, 24));
//		assertEquals(item3.getBounds(), new Rectangle(102, 26, 262, 24));
//		assertEquals(item4.getBounds(), new Rectangle(0, 52, 364, 24));
	}
	public void testMoveItem3Up() {
		layout();
		bar.moveDelta(2, 2, -1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item3.getBounds(), new Rectangle(0, 0, 364, 24));
//		assertEquals(item2.getBounds(), new Rectangle(0, 26, 102, 24));
//		assertEquals(item3.getBounds(), new Rectangle(102, 26, 262, 24));
//		assertEquals(item4.getBounds(), new Rectangle(0, 52, 364, 24));
	}
	public void testMoveItem1Down() {
		layout();
		bar.moveDelta(0, 2, 1);
		assertEquals(new Point(bar.width, bar.height), new Point(364, 50));
		printResult();
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 102, 24));
		assertEquals(item3.getBounds(), new Rectangle(102, 0, 262, 24));
		assertEquals(item1.getBounds(), new Rectangle(11, 26, 353, 24));
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 11, 24));
	}

	private void printResult() {
		System.out.println(item1.getBounds());
		System.out.println(item2.getBounds());
		System.out.println(item3.getBounds());
		System.out.println(item4.getBounds());
		System.out.println("--*--");
	}
	
	//*
	public void testMoveItem2Down() {
		layout();
		bar.moveDelta(1, 2, 1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 50));
		assertEquals(item2.getBounds(), new Rectangle(204, 26, 160, 24));
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 204, 24));
	}
	public void testMoveItem2Down2() {
		layout();
		bar.moveDelta(1, 2, 2);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item2.getBounds(), new Rectangle(0, 52, 364, 24));
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}
	public void testMoveItem4Up() {
		layout();
		bar.moveDelta(3, 210, -1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 24));
		assertEquals(item4.getBounds(), new Rectangle(230, 0, 94, 24));
		//assertEquals(item4.getBounds(), new Rectangle(0, 26, 204, 24));
	}
	// */

	public void testMoveItem23Up1Down() {
		layout();
		bar.moveDelta(2, 2, -1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item3.getBounds(), new Rectangle(0, 0, 364, 24));
		bar.moveDelta(2, 2, -2);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 102));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 364, 24));
		bar.moveDelta(2, 2, 1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item1.getBounds(), new Rectangle(11, 52, 353, 24));
//		assertEquals(item2.getBounds(), new Rectangle(0, 26, 102, 24));
//		assertEquals(item3.getBounds(), new Rectangle(102, 26, 262, 24));
//		assertEquals(item4.getBounds(), new Rectangle(0, 52, 364, 24));
	}

	public void testMoveItem23Up3Down() {
		layout();
		bar.moveDelta(2, 2, -1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item3.getBounds(), new Rectangle(0, 0, 364, 24));
		bar.moveDelta(2, 2, -2);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 102));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 364, 24));
		bar.moveDelta(0, 2, 1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item2.getBounds(), new Rectangle(11, 0, 353, 24));
//		assertEquals(item2.getBounds(), new Rectangle(0, 26, 102, 24));
//		assertEquals(item3.getBounds(), new Rectangle(102, 26, 262, 24));
//		assertEquals(item4.getBounds(), new Rectangle(0, 52, 364, 24));
	}

	public void testMoveItem23Up3Down2() {
		layout();
		bar.moveDelta(1, 2, -1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 364, 24));
		bar.moveDelta(2, 2, -2);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 102));
		assertEquals(item3.getBounds(), new Rectangle(0, 0, 364, 24));
		bar.moveDelta(0, 2, 1);
		printResult();
		assertEquals(new Point(bar.width, bar.height), new Point(364, 76));
		assertEquals(item3.getBounds(), new Rectangle(28, 0, 336, 24));
//		assertEquals(item2.getBounds(), new Rectangle(0, 26, 102, 24));
//		assertEquals(item3.getBounds(), new Rectangle(102, 26, 262, 24));
//		assertEquals(item4.getBounds(), new Rectangle(0, 52, 364, 24));
	}
}
