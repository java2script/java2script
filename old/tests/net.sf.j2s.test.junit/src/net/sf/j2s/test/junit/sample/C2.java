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

public class C2 extends C {
	
	public C2() {
		this(1.3f);
		Output.add("C2()-end\n");
	}

	public C2(float n) {
		Output.add("C2((float)"+n+")\n");
	}

	public C2(double n) {
		Output.add("C2((double)"+n+")\n");
	}


}