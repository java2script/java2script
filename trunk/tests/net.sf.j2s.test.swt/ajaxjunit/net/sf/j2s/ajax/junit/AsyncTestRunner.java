/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax.junit;

import java.io.PrintStream;
import junit.framework.Test;
import junit.framework.TestResult;
import junit.textui.ResultPrinter;
import junit.textui.TestRunner;

/**
 * @author zhou renjian
 *
 * 2006-7-31
 */
public class AsyncTestRunner extends TestRunner{
	private ResultPrinterBridge f2Printer;
	
	public AsyncTestRunner() {
		this(System.out);
	}

	public AsyncTestRunner(PrintStream writer) {
		this(new ResultPrinterBridge(writer));
	}

	public AsyncTestRunner(ResultPrinter printer) {
		super(printer);
		this.f2Printer = (ResultPrinterBridge) printer;
	}

	public TestResult doRun(Test suite, final boolean wait) {
		final TestResult result= createTestResult();
		result.addListener(f2Printer);
		final long startTime= System.currentTimeMillis();
		((AsyncTestSuite) suite).run(result, new Runnable() {
			public void run() {
				long endTime= System.currentTimeMillis();
				long runTime= endTime-startTime;
				
				f2Printer.printResult(result, runTime);

				pause(wait);
			}
		});
		return result;
	}
	
	
	/**
	 * Runs a suite extracted from a TestCase subclass.
	 */
	static public void asyncRun(Class testClass) {
		asyncRun(new AsyncTestSuite(testClass));
	}

	/**
	 * Runs a single test and collects its results.
	 * This method can be used to start a test run
	 * from your program.
	 * <pre>
	 * public static void main (String[] args) {
	 *     test.textui.TestRunner.run(suite());
	 * }
	 * </pre>
	 */
	static public TestResult asyncRun(Test test) {
		AsyncTestRunner runner= new AsyncTestRunner();
		return runner.doRun(test);
	}

	/**
	 * Runs a single test and waits until the user
	 * types RETURN.
	 */
	static public void asyncRunAndWait(Test suite) {
		AsyncTestRunner aTestRunner= new AsyncTestRunner();
		aTestRunner.doRun(suite, true);
	}
}
