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
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Tree;
import org.eclipse.swt.widgets.TreeItem;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class TreeStructureTest2 extends AsyncTestCase {

	public void testStruct6() {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		for (int i = 0; i < 4; i++) {
			TreeItem item = new TreeItem (tree, SWT.NONE);
			item.setText("Node." + (i + 1));
			if (i < 3) {
				TreeItem subitem = new TreeItem (item, SWT.NONE);
				subitem.setText("Node." + (i + 1) + ".1");
			}
		}
		
		tree.addListener (SWT.Expand, new Listener () {
			public void handleEvent (final Event event) {
				final TreeItem root = (TreeItem) event.item;
				TreeItem [] items = root.getItems ();
				for (int i= 0; i<items.length; i++) {
					if (items [i].getData () != null) {
						return;
					}
					items [i].dispose ();
				}
				for (int i = 0; i < 3; i++) {
					TreeItem treeItem = new TreeItem (root, 0);
					treeItem.setText("New " + i);
					TreeItem subitem = new TreeItem (treeItem, SWT.NONE);
					subitem.setText("Node." + i + ".1");
				}
				root.setExpanded(true);
			}
		});
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}

	public void testStruct5() {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		for (int i = 0; i < 4; i++) {
			TreeItem item = new TreeItem (tree, SWT.NONE);
			item.setText("Node." + (i + 1));
			if (i < 3) {
				TreeItem subitem = new TreeItem (item, SWT.NONE);
				subitem.setText("Node." + (i + 1) + ".1");
			}
		}
		
		tree.addListener (SWT.Expand, new Listener () {
			public void handleEvent (final Event event) {
				final TreeItem root = (TreeItem) event.item;
				TreeItem [] items = root.getItems ();
				for (int i= 0; i<items.length; i++) {
					if (items [i].getData () != null) {
						return;
					}
					items [i].dispose ();
				}
				for (int i = 0; i < 3; i++) {
					TreeItem treeItem = new TreeItem (root, 0);
					treeItem.setText("New " + i);
				}
				root.setExpanded(true);
			}
		});
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}

	public void testStruct4() {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		for (int i = 0; i < 4; i++) {
			TreeItem item = new TreeItem (tree, SWT.NONE);
			item.setText("Node." + (i + 1));
			if (i < 3) {
				TreeItem subitem = new TreeItem (item, SWT.NONE);
				subitem.setText("Node." + (i + 1) + ".1");
			}
		}
		TreeItem treeRoots[] = tree.getItems ();
		for (int i = 0; i < treeRoots.length; i++) {
			System.out.println(treeRoots[i].getText());
		}
		TreeItem item = new TreeItem (treeRoots[1], SWT.NONE);
		item.setText("Node 2.2");
		item = new TreeItem (item, SWT.NONE);
		item.setText("Node 2.2.1");
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}

	public void testStruct3() {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		for (int i = 0; i < 4; i++) {
			TreeItem item = new TreeItem (tree, SWT.NONE);
			item.setText("Node." + (i + 1));
			if (i < 3) {
				TreeItem subitem = new TreeItem (item, SWT.NONE);
				subitem.setText("Node." + (i + 1) + ".1");
			}
		}
		TreeItem treeRoots[] = tree.getItems ();
		for (int i = 0; i < treeRoots.length; i++) {
			System.out.println(treeRoots[i].getText());
		}
		TreeItem item = new TreeItem (treeRoots[1].getItems()[0], SWT.NONE);
		item.setText("Node 2.1.1");
//		item = new TreeItem (item, SWT.NONE);
//		item.setText("Node 2.2.1");
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}

	public void testStruct2() {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		for (int i = 0; i < 4; i++) {
			TreeItem item = new TreeItem (tree, SWT.NONE);
			item.setText("Node." + (i + 1));
			if (i < 3) {
				TreeItem subitem = new TreeItem (item, SWT.NONE);
				subitem.setText("Node." + (i + 1) + ".1");
			}
		}
		TreeItem treeRoots[] = tree.getItems ();
		for (int i = 0; i < treeRoots.length; i++) {
			System.out.println(treeRoots[i].getText());
		}
		TreeItem item = new TreeItem (treeRoots[1], SWT.NONE);
		item.setText("Node 2.2");
//		item = new TreeItem (item, SWT.NONE);
//		item.setText("Node 2.2.1");
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}

	public void testStruct1() {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout(new FillLayout());
		final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
		tree.setSize (100, 100);
		shell.setSize (300, 200);
		for (int i = 0; i < 4; i++) {
			TreeItem item = new TreeItem (tree, SWT.NONE);
			item.setText("Node." + (i + 1));
			if (i < 3) {
				TreeItem subitem = new TreeItem (item, SWT.NONE);
				subitem.setText("Node." + (i + 1) + ".1");
			}
		}
//		TreeItem treeRoots[] = tree.getItems ();
//		TreeItem item = new TreeItem (treeRoots[1], SWT.NONE);
//		item.setText("Node 2.2");
//		item = new TreeItem (item, SWT.NONE);
//		item.setText("Node 2.2.1");
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
			}
		});
		display.dispose ();
	}
	
	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (TreeStructureTest2.class);
	}
}
