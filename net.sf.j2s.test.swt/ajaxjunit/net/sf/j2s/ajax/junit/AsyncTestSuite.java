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

import java.util.Enumeration;
import junit.framework.Test;
import junit.framework.TestResult;
import junit.framework.TestSuite;

/**
 * @author josson smith
 *
 * 2006-7-31
 */
public class AsyncTestSuite extends TestSuite {
	Runnable tsCallback;
	
	public AsyncTestSuite() {
		super();
	}

	public AsyncTestSuite(Class theClass, String name) {
		super(theClass, name);
	}

	public AsyncTestSuite(Class theClass) {
		super(theClass);
	}

	public AsyncTestSuite(String name) {
		super(name);
	}

	/**
	 * Runs the tests and collects their result in a TestResult.
	 */
	public void run(final TestResult result, final Runnable callback) {
		final Enumeration e= tests();
		tsCallback = new Runnable() {
			public void run() {
				if (e.hasMoreElements()
						&& !result.shouldStop()) {
		  			Test test= (Test)e.nextElement();
		  			if (test instanceof AsyncTestCase) {
		  				AsyncTestCase aTest = (AsyncTestCase) test;
		  				aTest.setCallback(new Runnable() {
							public void run() {
								if (tsCallback != null) {
									tsCallback.run();
								}
							}
						});
		  				aTest.setTestResult(result);
		  			}
		  			runTest(test, result);
				} else {
					callback.run();
				}
			}
		};
		tsCallback.run();
	}
}
