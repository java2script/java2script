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
import net.sf.j2s.test.junit.sample.C;
import net.sf.j2s.test.junit.sample.CF;
import net.sf.j2s.test.junit.sample.CF1;
import net.sf.j2s.test.junit.util.Output;

public class OverloadTest extends TestCase {

	/**
	 * The correct constructor is called when overloaded, here "String".
	 */
	public void testOverloadedConstructorString() {
		Output.clear();

		new C("A");

		assertEquals("C(\"A\")\n", Output.text());
	}
	
	/**
	 * The correct constructor is called when overloaded, here "int".
	 */
	public void testOverloadedConstructorInt() {
		Output.clear();

		new C(1);

		assertEquals("C(1)\n", Output.text());
	}
	
	/**
	 * The correct constructor is called when overloaded, here "long".
	 */
	public void testOverloadedConstructorLong() {
		Output.clear();

		new C(2L);

		assertEquals("C((long)2)\n", Output.text());
	}
	
	/**
	 * The correct constructor is called when overloaded, here "float".
	 */
	public void testOverloadedConstructorFloat() {
		Output.clear();

		new C(1.2f);

		assertEquals("C((float)1.2)\n", Output.text());
	}
	
	/**
	 * The correct constructor is called when overloaded, here "double".
	 */
	public void testOverloadedConstructorDouble() {
		Output.clear();

		new C(1.3);

		assertEquals("C((double)1.3)\n", Output.text());
	}
	
	/**
	 * The correct constructor is called when overloaded, here "boolean".
	 */
	public void testOverloadedConstructorBoolean() {
		Output.clear();

		new C(true);

		assertEquals("C(true)\n", Output.text());
	}
	
	
}
