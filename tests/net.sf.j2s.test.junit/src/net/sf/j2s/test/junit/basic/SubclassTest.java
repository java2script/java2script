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

import junit.framework.TestCase;
import net.sf.j2s.test.junit.sample.C1;
import net.sf.j2s.test.junit.util.Output;

public class SubclassTest extends TestCase {

	/**
	 * A call in a superclass constructor to an overridden method ("foo")
	 * runs the method in the subclass.
	 */
	public void testSuperClassConstructorCallsOverridingMethod() {
		Output.clear();

		new C1();
		assertEquals("C()\nC1.foo()\nC.bar()\nC1()\n", Output.text());
	}
}


