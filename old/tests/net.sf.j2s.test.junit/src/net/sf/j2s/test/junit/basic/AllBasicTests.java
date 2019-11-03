/*******************************************************************************
 * Copyright (c) 2017 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Udo Borkowski - initial implementation
 *******************************************************************************/

package net.sf.j2s.test.junit.basic;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class AllBasicTests extends TestCase {
	
	public static Test suite() {
		TestSuite suite = new TestSuite("All Basic Tests");

		suite.addTestSuite(FieldInitTest.class);
		suite.addTestSuite(OverloadTest.class);
		suite.addTestSuite(SubclassTest.class);
		suite.addTestSuite(ThisTest.class);
		suite.addTestSuite(VarArgsTest.class);

		return suite;
	}
}
