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
import net.sf.j2s.test.junit.sample.CVarArgs;
import net.sf.j2s.test.junit.util.Output;

public class VarArgsTest extends TestCase {

	/**
	 * Call a varArgs method with not arguments.
	 */
	public void testVarArgsEmpty() {
		String s = new CVarArgs().fVarArgsInt();
		assertEquals("ints: ", s);
	}

	/**
	 * Call a varArgs method with some arguments.
	 */
	public void testVarArgsNotEmpty() {
		String s = new CVarArgs().fVarArgsInt(4,7,9);
		assertEquals("ints: 4 7 9 ", s);
	}
	
	/**
	 * Call a varArgs method with some arguments (via array).
	 */
	public void testVarArgsNotEmptyViaArray() {
		int[] args = new int[]{4,7,9};
		String s = new CVarArgs().fVarArgsInt(args);
		assertEquals("ints: 4 7 9 ", s);
	}
	
	/**
	 * Call a varArgs method with a mandatory arguments and no optional arguments.
	 */
	public void testStringPlusVarArgsEmpty() {
		String s = new CVarArgs().fStringVarArgsInt("demo ");
		assertEquals("demo ", s);
	}

	/**
	 * Call a varArgs method with a mandatory arguments and no optional arguments.
	 */
	public void testStringPlusVarArgsNotEmpty() {
		String s = new CVarArgs().fStringVarArgsInt("demo ", 4, 7);
		assertEquals("demo 4 7 ", s);
	}
	
	/**
	 * Call a varArgs method of array type (here int[]) with not arguments.
	 */
	public void testIntArrVarArgsEmpty() {
		String s = new CVarArgs().fIntArr();
		assertEquals("intss ", s);
	}

	/**
	 * Call a varArgs method of array type (here int[]) with some arguments.
	 */
	public void testIntArrVarArgsNotEmpty() {
		String s = new CVarArgs().fIntArr(new int[]{3,5,7}, new int[]{2,4});
		assertEquals("intss [3 5 7 ] [2 4 ] ", s);
	}

	/**
	 * Call a varArgs method of array type (here int[]) with some arguments  (via array).
	 */
	public void testIntArrVarArgsNotEmptyViaArray() {
		int[][] args = new int[][]{new int[]{3,5,7}, new int[]{2,4}};
		String s = new CVarArgs().fIntArr(args );
		assertEquals("intss [3 5 7 ] [2 4 ] ", s);
	}
}
