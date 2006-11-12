/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax.junit;

import junit.framework.TestCase;
import junit.framework.TestResult;

/**
 * @author josson smith
 *
 * 2006-8-1
 */
public class AsyncTestCase extends TestCase {

	Runnable callback;
	
	TestResult testResult;
	
	public AsyncTestCase() {
		super();
	}

	public AsyncTestCase(String name) {
		super(name);
	}

	public Runnable getCallback() {
		return callback;
	}

	public void setCallback(Runnable callback) {
		this.callback = callback;
	}

	public TestResult getTestResult() {
		return testResult;
	}

	public void setTestResult(TestResult testRestult) {
		this.testResult = testRestult;
	}

	
}
