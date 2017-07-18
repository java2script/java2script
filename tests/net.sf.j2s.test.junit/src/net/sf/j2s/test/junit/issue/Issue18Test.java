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

package net.sf.j2s.test.junit.issue;

import junit.framework.TestCase;
import net.sf.j2s.test.junit.sample.C;
import net.sf.j2s.test.junit.sample.C2;
import net.sf.j2s.test.junit.sample.CF;
import net.sf.j2s.test.junit.sample.CF1;
import net.sf.j2s.test.junit.util.Output;

public class Issue18Test extends TestCase {

	/**
	 * Boolean.FALSE must evaluate to <code>false</code> when used in a boolean expression, 
	 * e.g. as a literal in a ternary operation's condition.
	 */
	public void testFALSEInInTernaryCondition() {
		assertEquals("OK", Boolean.FALSE ? "FAILED" : "OK");
	}

	/**
	 * Boolean.FALSE must evaluate to <code>false</code> when used in a boolean expression, 
	 * e.g. as the value of a variable in a ternary operation's condition.
	 */
	public void testFALSEInInTernaryConditionViaVariable() {
		Boolean b = Boolean.FALSE;
		assertEquals("OK", b ? "FAILED" : "OK");
	}
}
