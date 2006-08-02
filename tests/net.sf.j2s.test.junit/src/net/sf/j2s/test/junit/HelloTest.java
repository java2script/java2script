/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.test.junit;

import junit.framework.TestCase;

/**
 * @author josson smith
 *
 * 2006-7-20
 */
public class HelloTest extends TestCase {
	
	public HelloTest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public HelloTest(String name) {
		super(name);
		// TODO Auto-generated constructor stub
	}
	public void testOK() {
		assertTrue(false);
	}
	public void testHello() {
		assertTrue(true);
		assertEquals(2, 2);
		assertEquals(2.0, 2.1, 0.0001);
	}
	public void testWorld() {
		assertEquals(false, true);
	}
	public static void main(String[] args) {
		System.out.println("OK..2..");
		//junit.textui.TestRunner.run(HelloTest.class);
		junit.textui.TestRunner.run(StringBufferTest.class);
//		junit.textui.TestRunner.run(StringTest.class);
//		junit.textui.TestRunner.run(ObjectTest.class);
//		junit.textui.TestRunner.run(NumberTest.class);
//		junit.textui.TestRunner.run(IntegerTest.class);
//		junit.textui.TestRunner.run(LongTest.class);
//		junit.textui.TestRunner.run(FloatTest.class);
//		junit.textui.TestRunner.run(DoubleTest.class);
		//junit.textui.TestRunner.run(new HelloTest("testHello"));
		System.out.println("OK....");
	}
}
