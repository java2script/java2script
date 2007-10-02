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

package net.sf.j2s.test.swt.ajunit;

import net.sf.j2s.ajax.junit.AsyncSWT;
import net.sf.j2s.ajax.junit.AsyncTestCase;
import net.sf.j2s.ajax.junit.AsyncTestRunnable;
import net.sf.j2s.ajax.junit.AsyncTestRunner;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Tree;
import org.eclipse.swt.widgets.TreeItem;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class TreeStructureTest extends AsyncTestCase {
	
	public void treeStruct(int d1, int d2, int d3, int d4) {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		int[] dims = new int[] {d1, d2, d3, d4};
		for (int i=0; i<dims[0]; i++) {
			TreeItem iItem = new TreeItem (tree, 0);
			iItem.setText ("TreeItem (0) -" + i);
			for (int j=0; j<dims[1]; j++) {
				TreeItem jItem = new TreeItem (iItem, 0);
				jItem.setText ("TreeItem (1) -" + j);
				for (int k=0; k<dims[2]; k++) {
					TreeItem kItem = new TreeItem (jItem, 0);
					kItem.setText ("TreeItem (2) -" + k);
					for (int l=0; l<dims[3]; l++) {
						TreeItem lItem = new TreeItem (kItem, 0);
						lItem.setText ("TreeItem (3) -" + l);
					}
				}
			}
		}
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}

	public void testStruct29() {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		int[] dims = new int[] {2, 1, 2};
		for (int i=0; i<dims[0]; i++) {
			TreeItem iItem = new TreeItem (tree, 0);
			iItem.setText ("TreeItem (0) -" + i);
			for (int j=0; j<dims[1]; j++) {
				TreeItem jItem = new TreeItem (iItem, 0);
				jItem.setText ("TreeItem (1) -" + j);
				for (int k=0; k<dims[2]; k++) {
					TreeItem kItem = new TreeItem (jItem, 0);
					kItem.setText ("TreeItem (2) -" + k);
					for (int l=0; l<dims[3]; l++) {
						TreeItem lItem = new TreeItem (kItem, 0);
						lItem.setText ("TreeItem (3) -" + l);
					}
				}
			}
		}
		TreeItem iItem = new TreeItem (tree, 0);
		iItem.setText("Last Item");
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}
	
	public void testStruct28() {
		treeStruct(4, 2, 4, 2);
	}
	public void testStruct27() {
		treeStruct(4, 2, 2, 2);
	}
	public void testStruct26() {
		treeStruct(4, 1, 2, 2);
	}
	public void testStruct25() {
		treeStruct(4, 5, 1, 2);
	}
	public void testStruct24() {
		treeStruct(4, 2, 1, 2);
	}
	public void testStruct23() {
		treeStruct(4, 1, 1, 5);
	}
	public void testStruct22() {
		treeStruct(1, 1, 1, 5);
	}
	public void testStruct21() {
		treeStruct(1, 1, 1, 2);
	}
	public void testStruct20() {
		/**
		 * @j2sNative 
		 * window["defaultWindowLeft"] = 100;
		 * window["defaultWindowTop"] = 100;
		 */ {}
		treeStruct(1, 1, 1, 1);
	}
	public void testStruct19() {
		treeStruct(5, 1, 6, 0);
	}
	public void testStruct18() {
		treeStruct(2, 1, 2, 0);
	}
	public void testStruct17() {
		treeStruct(5, 1, 1, 0);
	}
	public void testStruct16() {
		treeStruct(2, 1, 1, 0);
	}
	public void testStruct15() {
		treeStruct(1, 1, 12, 0);
	}
	public void testStruct14() {
		treeStruct(1, 1, 2, 0);
	}
	public void testStruct13() {
		treeStruct(1, 1, 1, 0);
	}
	public void testStruct12() {
		treeStruct(4, 3, 0, 0);
	}
	public void testStruct11() {
		treeStruct(2, 3, 0, 0);
	}
	public void testStruct10() {
		/**
		 * @j2sNative 
		 * window["defaultWindowLeft"] = 100;
		 * window["defaultWindowTop"] = 100;
		 */ {}
		treeStruct(2, 2, 0, 0);
	}
	public void testStruct9() {
		treeStruct(13, 1, 0, 0);
	}
	public void testStruct8() {
		treeStruct(3, 1, 0, 0);
	}
	public void testStruct7() {
		treeStruct(2, 1, 0, 0);
	}
	public void testStruct6() {
		treeStruct(1, 12, 0, 0);
	}
	public void testStruct5() {
		treeStruct(1, 2, 0, 0);
	}
	public void testStruct4() {
		treeStruct(1, 1, 0, 0);
	}
	public void testStruct3() {
		treeStruct(12, 0, 0, 0);
	}
	public void testStruct2() {
		treeStruct(2, 0, 0, 0);
	}
	public void testStruct1() {
		treeStruct(1, 0, 0, 0);
	}
	
	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (TreeStructureTest.class);
	}
}
