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

package net.sf.j2s.test.junit.sample;

import net.sf.j2s.test.junit.util.Output;

public class C1 extends C {
	
	public C1() {
		Output.add("C1()\n");
	}

	public void foo() {
		Output.add("C1.foo()\n");
	}

}