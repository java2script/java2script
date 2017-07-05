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
import net.sf.j2s.test.junit.sample.CF;
import net.sf.j2s.test.junit.sample.CF1;
import net.sf.j2s.test.junit.util.Output;

public class FieldInitTest extends TestCase {

	/**
	 * The field is initialized before the constructor is called.
	 */
	public void testFieldFirst() {
		Output.clear();

		new CF();
		
		assertEquals("F(\"CF.f\")\nCF()\n", Output.text());
	}

	/**
	 * The field and constructor of the superclass are handled before
	 * the field and constructor of a subclass.
	 */
	public void testSuperClassFirst() {
		Output.clear();

		new CF1();
		
		assertEquals("F(\"CF.f\")\nCF()\nF(\"CF1.f\")\nCF1()\n", Output.text());
	}
}
