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
import junit.framework.TestResult;
import junit.textui.ResultPrinter;

class ResultPrinterBridge extends ResultPrinter {
	
	public ResultPrinterBridge(PrintStream writer) {
		super(writer);
	}
	
	synchronized void printResult(TestResult result, long runTime) {
		printHeader(runTime);
		printErrors(result);
		printFailures(result);
		printFooter(result);
	}
	
}