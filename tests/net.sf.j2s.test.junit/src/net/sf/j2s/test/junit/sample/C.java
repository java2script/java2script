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

public class C {

	public C() {
		Output.add("C()\n");
		foo();
		bar();
	}
	
	public C(String string) {
		Output.add("C(\""+string+"\")\n");
	}
	
	public C(int n) {
		Output.add("C("+n+")\n");
	}

	public C(long n) {
		Output.add("C((long)"+n+")\n");
	}

	public C(float n) {
		Output.add("C((float)"+n+")\n");
	}

	public C(double n) {
		Output.add("C((double)"+n+")\n");
	}

	public C(boolean b) {
		Output.add("C("+b+")\n");
	}

	public void foo() {
		Output.add("C.foo()\n");
	}

	public void bar() {
		Output.add("C.bar()\n");
	}
}