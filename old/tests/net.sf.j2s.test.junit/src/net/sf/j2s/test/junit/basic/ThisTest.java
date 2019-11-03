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
import net.sf.j2s.test.junit.sample.C2;
import net.sf.j2s.test.junit.sample.CF;
import net.sf.j2s.test.junit.sample.CF1;
import net.sf.j2s.test.junit.util.Output;

public class ThisTest extends TestCase {

	/**
	 * The correct overload is called when using "this(...)" in a constructor, here "float".
	 */
	public void testThisCallWithFloat() {
		Output.clear();

		new C2(); // calls "this(1.3f)"

		assertEquals("C()\nC.foo()\nC.bar()\nC2((float)1.3)\nC2()-end\n", Output.text());
	}
}
