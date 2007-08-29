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

package net.sf.j2s.test.junit;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import junit.framework.TestCase;

/**
 * @author zhou renjian
 *
 * 2006-12-30
 */
public class ArraysTest extends TestCase {
	public void testArraysSort() {
		byte[] bs = new byte[] {13, 4, 56};
		Arrays.sort(bs);
		for (int i = 0; i < bs.length; i++) {
			System.out.println(bs[i]);
		}
		assertEquals(4, bs[0]);
		assertEquals(13, bs[1]);
		assertEquals(56, bs[2]);
	}
	public void testArraysBinarySearch() {
		byte[] bs = new byte[] {11, 50, 45, 4, 13, 4, 56};
		Arrays.sort(bs);
		int idx = Arrays.binarySearch(bs, (byte) 13);
		assertEquals(3, idx);
	}
	public void testArraysEquals() {
		byte[] bs1 = new byte[] {11, 50, 45, 4, 13, 4, 56};
		byte[] bs2 = new byte[] {11, 50, 45, 4, 13, 4, 56};
		assertTrue(Arrays.equals(bs1, bs2));
		Arrays.sort(bs1);
		assertFalse(Arrays.equals(bs1, bs2));
	}
	public void testArraysAsList() {
		List asList = Arrays.asList(11, 50, 45, 4, 13, 4, 56);
		assertEquals(7, asList.size());
		assertEquals(4, asList.get(3));
	}
	public void testArraysSortString() {
		String[] bs = new String[] {"Hello", "World", "JavaScript"};
		Arrays.sort(bs);
		for (int i = 0; i < bs.length; i++) {
			System.out.println(bs[i]);
		}
		assertEquals("Hello", bs[0]);
		assertEquals("JavaScript", bs[1]);
		assertEquals("World", bs[2]);
	}
	public void testArraysBinarySearchString() {
		String[] bs = new String[] {"Hello", "World", "JavaScript", "AJAX", "SWT", "JavaScript"};
		Arrays.sort(bs);
		int idx = Arrays.binarySearch(bs, "SWT");
		assertEquals(4, idx);
	}
	public void testArraysEqualsString() {
		String[] bs1 = new String[] {"Hello", "World", "JavaScript", "AJAX", "SWT", "JavaScript"};
		String[] bs2 = new String[] {"Hello", "World", "JavaScript", "AJAX", "SWT", "JavaScript"};
		assertTrue(Arrays.equals(bs1, bs2));
		Arrays.sort(bs1);
		assertFalse(Arrays.equals(bs1, bs2));
	}
	public void testArraysSortString2() {
		String[] bs = new String[] {"Hello", "World", "JavaScript"};
		Arrays.sort(bs, new Comparator<String>() {
			public int compare(String o1, String o2) {
				return o1.charAt(1) - o2.charAt(1);
			}
		});
		for (int i = 0; i < bs.length; i++) {
			System.out.println(bs[i]);
		}
		assertEquals("JavaScript", bs[0]);
		assertEquals("Hello", bs[1]);
		assertEquals("World", bs[2]);
	}
	public void testArraysBinarySearchString2() {
		String[] bs = new String[] {"Hello", "World", "JavaScript", "AJAX", "SWT", "JavaScript"};
		Arrays.sort(bs, new Comparator<String>() {
			public int compare(String o1, String o2) {
				return o1.charAt(1) - o2.charAt(1);
			}
		});
		System.out.println();
		for (int i = 0; i < bs.length; i++) {
			System.out.println(bs[i]);
		}
//		int idx = Arrays.binarySearch(bs, "SWT");
//		assertEquals(1, idx);
	}
	public void testArraysEqualsString2() {
		String[] bs1 = new String[] {"Hello", "World", "JavaScript", "AJAX", "SWT", "JavaScript"};
		String[] bs2 = new String[] {"Hello", "World", "JavaScript", "AJAX", "SWT", "JavaScript"};
		assertTrue(Arrays.equals(bs1, bs2));
		Arrays.sort(bs1, new Comparator<String>() {
			public int compare(String o1, String o2) {
				return o1.charAt(1) - o2.charAt(1);
			}
		});
		assertFalse(Arrays.equals(bs1, bs2));
	}
}
