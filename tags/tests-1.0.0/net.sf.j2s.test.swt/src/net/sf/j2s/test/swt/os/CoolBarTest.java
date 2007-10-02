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
public class CoolBarTest extends TestCase {
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
	 * Normal left and right move
	 */
	public void testMoveItem1Right() {
		layout();
		bar.moveDelta(0, 2, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
	}
	
	public void testMoveItem1Left() {
		layout();
		bar.moveDelta(0, -2, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
	}
	
	public void testMoveItem2Right() {
		layout();
		bar.moveDelta(1, 2, 0);
		assertEquals(item2.getBounds(), new Rectangle(204, 0, 100, 24));
	}
	
	public void testMoveItem2Left() {
		layout();
		bar.moveDelta(1, -2, 0);
		assertEquals(item2.getBounds(), new Rectangle(200, 0, 104, 24));
	}
	
	public void testMoveItem3Right() {
		layout();
		bar.moveDelta(2, 2, 0);
		assertEquals(item3.getBounds(), new Rectangle(306, 0, 58, 24));
	}
	
	public void testMoveItem3Left() {
		layout();
		bar.moveDelta(2, -2, 0);
		assertEquals(item3.getBounds(), new Rectangle(302, 0, 62, 24));
	}
	
	public void testMoveItem4Right() {
		layout();
		bar.moveDelta(3, 2, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}
	
	public void testMoveItem4Left() {
		layout();
		bar.moveDelta(3, -2, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}
	
	/*
	 * Move to the edge of swapping
	 */
	public void testMoveItem1RightToEdge() {
		layout();
		bar.moveDelta(0, 201, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
		bar.moveDelta(0, 202, 0);
		assertEquals(item1.getBounds(), new Rectangle(202, 0, 102, 24));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 202, 24));
	}
	public void testMoveItem1RightToEdge2() {
		layout();
		bar.moveDelta(0, 201, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
		bar.moveDelta(0, 203, 0);
		assertEquals(item1.getBounds(), new Rectangle(203, 0, 101, 24));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 203, 24));
	}
	public void testMoveItem1LeftToEdge() {
		layout();
		bar.moveDelta(0, -201, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
		bar.moveDelta(0, -202, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
		bar.moveDelta(0, -382, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
	}
	public void testMoveItem1LeftToEdge2() {
		layout();
		bar.moveDelta(0, -201, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
		bar.moveDelta(0, -203, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202, 24));
	}

	/*
	 * Item 2
	 */
	public void testMoveItem2LeftToEdge() {
		layout();
		bar.moveDelta(1, -190, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 12, 24));
		assertEquals(item2.getBounds(), new Rectangle(12, 0, 292, 24));
	}
	public void testMoveItem2LeftToEdge2() {
		layout();
		bar.moveDelta(1, -191, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(11, 0, 293, 24));
	}
	public void testMoveItem2LeftToEdge3() {
		layout();
		bar.moveDelta(1, -192, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(11, 0, 293, 24));
	}
	public void testMoveItem2LeftToEdge4() {
		layout();
		bar.moveDelta(1, -201, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(11, 0, 293, 24));
	}
	// left to swapping
	public void testMoveItem2LeftToEdge5() {
		layout();
		bar.moveDelta(1, -202, 0);
		assertEquals(item1.getBounds(), new Rectangle(293, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 293, 24));
	}
	public void testMoveItem2LeftToEdge6() {
		layout();
		bar.moveDelta(1, -203, 0);
		assertEquals(item1.getBounds(), new Rectangle(293, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(0, 0, 293, 24));
	}
	
	// right
	public void testMoveItem2RightToEdge() {
		layout();
		bar.moveDelta(1, 73, 0);
		assertEquals(item2.getBounds(), new Rectangle(275, 0, 29, 24));
	}
	public void testMoveItem2RightToEdge1() {
		layout();
		bar.moveDelta(1, 74, 0);
		assertEquals(item2.getBounds(), new Rectangle(276, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(304, 0, 60, 24));
	}
	public void testMoveItem2RightToEdge2() {
		layout();
		bar.moveDelta(1, 75, 0);
		assertEquals(item2.getBounds(), new Rectangle(277, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(305, 0, 59, 24));
	}
	public void testMoveItem2RightToEdge3() {
		layout();
		bar.moveDelta(1, 75 + 50, 0); // 50 = 59 - 9
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 327, 24));
		assertEquals(item2.getBounds(), new Rectangle(277 + 50, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(305 + 50, 0, 9, 24));
	}
	public void testMoveItem2RightToEdge4() {
		layout();
		bar.moveDelta(1, 75 + 50 + 1, 0); // 50 = 59 - 9
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 327, 24));
		assertEquals(item2.getBounds(), new Rectangle(277 + 50, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(305 + 50, 0, 9, 24));
	}
	public void testMoveItem2RightToEdge5() {
		layout();
		bar.moveDelta(1, 75 + 50 + 8, 0); // 50 = 59 - 9
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 327, 24));
		assertEquals(item2.getBounds(), new Rectangle(277 + 50, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(305 + 50, 0, 9, 24));
	}
	public void testMoveItem2RightToEdge6() {
		layout();
		bar.moveDelta(1, 138, 0); // 202 + 134 = 336 
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 327, 24));
		assertEquals(item3.getBounds(), new Rectangle(327, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(338, 0, 26, 24));
	}
	public void testMoveItem2RightToEdge7() {
		layout();
		bar.moveDelta(1, 75 + 50 + 15, 0); // 50 = 59 - 9
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 327, 24));
		assertEquals(item3.getBounds(), new Rectangle(364 - 26 - 11, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(364 - 26, 0, 26, 24));
	}

	/*
	 * item 3
	 */
	public void testMoveItem3RightToEdge() {
		layout();
		bar.moveDelta(2, 50, 0);
		assertEquals(item3.getBounds(), new Rectangle(354, 0, 10, 24));
	}
	public void testMoveItem3RightToEdge2() {
		layout();
		bar.moveDelta(2, 51, 0);
		assertEquals(item3.getBounds(), new Rectangle(355, 0, 9, 24));
	}
	public void testMoveItem3RightToEdge3() {
		layout();
		bar.moveDelta(2, 52, 0);
		assertEquals(item3.getBounds(), new Rectangle(355, 0, 9, 24));
	}
	public void testMoveItem3RightToEdge4() {
		layout();
		bar.moveDelta(2, 70, 0);
		assertEquals(item3.getBounds(), new Rectangle(355, 0, 9, 24));
	}
	/*
	 */
	public void testMoveItem3LeftToEdge2() {
		layout();
		bar.moveDelta(2, -73, 0);
		assertEquals(item2.getBounds(), new Rectangle(202, 0, 29, 24));
		assertEquals(item3.getBounds(), new Rectangle(304 - 73, 0, 60 + 73, 24));
	}
	public void testMoveItem3LeftToEdge3() {
		layout();
		bar.moveDelta(2, -74, 0);
		assertEquals(item2.getBounds(), new Rectangle(202, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(304 - 74, 0, 60 + 74, 24));
	}
	public void testMoveItem3LeftToEdge4() {
		layout();
		bar.moveDelta(2, -75, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 201, 24));
		assertEquals(item2.getBounds(), new Rectangle(201, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(304 - 75, 0, 60 + 75, 24));
	}
	public void testMoveItem3LeftToEdge5() {
		layout();
		bar.moveDelta(2, -74 - 191, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202 - 191, 24));
		assertEquals(item2.getBounds(), new Rectangle(202 - 191, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(304 - 74 - 191, 0, 60 + 74 + 191, 24));
	}
	public void testMoveItem3LeftToEdge6() {
		layout();
		bar.moveDelta(2, -74 - 192, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 202 - 191, 24));
		assertEquals(item2.getBounds(), new Rectangle(202 - 191, 0, 28, 24));
		assertEquals(item3.getBounds(), new Rectangle(304 - 74 - 191, 0, 60 + 74 + 191, 24));
	}
	public void testMoveItem3LeftToEdge7() {
		layout();
		bar.moveDelta(2, -74 - 191 - 28, 0);
		assertEquals(item1.getBounds(), new Rectangle(0, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(338, 0, 26, 24));
		assertEquals(item3.getBounds(), new Rectangle(11, 0, 327, 24));
	}
	public void testMoveItem3LeftToEdge8() {
		layout();
		bar.moveDelta(2, -74 - 191 - 28 - 11, 0);
		assertEquals(item1.getBounds(), new Rectangle(327, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(338, 0, 26, 24));
		assertEquals(item3.getBounds(), new Rectangle(0, 0, 327, 24));
	}
	public void testMoveItem3LeftToEdge9() {
		layout();
		bar.moveDelta(2, -74 - 191 - 28 - 19, 0);
		assertEquals(item1.getBounds(), new Rectangle(327, 0, 11, 24));
		assertEquals(item2.getBounds(), new Rectangle(338, 0, 26, 24));
		assertEquals(item3.getBounds(), new Rectangle(0, 0, 327, 24));
	}
	
	/*
	 * Item 4
	 */
	public void testMoveItem4RightToEdge() {
		layout();
		bar.moveDelta(3, 363, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
		bar.moveDelta(3, 364, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}
	public void testMoveItem4RightToEdge2() {
		layout();
		bar.moveDelta(3, 363, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
		bar.moveDelta(3, 365, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}
	public void testMoveItem4LeftToEdge() {
		layout();
		bar.moveDelta(3, -363, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
		bar.moveDelta(3, -364, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}
	public void testMoveItem4LeftToEdge2() {
		layout();
		bar.moveDelta(3, -363, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
		bar.moveDelta(3, -365, 0);
		assertEquals(item4.getBounds(), new Rectangle(0, 26, 364, 24));
	}
}
