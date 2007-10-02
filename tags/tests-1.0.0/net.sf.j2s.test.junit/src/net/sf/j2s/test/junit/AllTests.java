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

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

/**
 * @author zhou renjian
 *
 * 2006-8-17
 */
public class AllTests extends TestCase {
	
	public void testOne() {
		System.out.println("Hello One");
	}
	
	public static void main(String[] args) {
		junit.textui.TestRunner.run(AllTests.suite());
	}
	public static Test suite() {
		TestSuite suite = new TestSuite("Test for net.sf.j2s.test.junit");
		//$JUnit-BEGIN$
		suite.addTestSuite(StringTest.class);
		suite.addTestSuite(IntegerTest.class);
		//$JUnit-END$
		return suite;
	}
}
