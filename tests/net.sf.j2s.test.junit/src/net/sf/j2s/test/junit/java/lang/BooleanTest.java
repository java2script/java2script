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

package net.sf.j2s.test.junit.java.lang;

import junit.framework.TestCase;
import net.sf.j2s.test.junit.sample.C;
import net.sf.j2s.test.junit.sample.C2;
import net.sf.j2s.test.junit.sample.CF;
import net.sf.j2s.test.junit.sample.CF1;
import net.sf.j2s.test.junit.util.Output;

public class BooleanTest extends TestCase {

	/**
	 * Boolean.FALSE must evaluate to <code>false</code> when used in a boolean expression.
	 */
	public void testFALSEInInBooleanExpression() {
		assertFalse(Boolean.FALSE);
	}

	/**
	 * Boolean.FALSE must evaluate to <code>false</code> when used in a boolean expression, 
	 * e.g. as a literal in an if-statement's condition.
	 */
	public void testFALSEInIfCondition() {
		if (Boolean.FALSE) {
			fail("Boolean.FALSE does not evaluate to false");
		}
	}
	
	/**
	 * Boolean.TRUE must evaluate to <code>true</code> when used in a boolean expression, 
	 * e.g. as a literal in an if-statement's condition.
	 */
	public void testTRUEInIfCondition() {
		if (Boolean.TRUE) {
			// do nothing
		} else {
			fail("Boolean.TRUE does not evaluate to true");
		}
	}

}
