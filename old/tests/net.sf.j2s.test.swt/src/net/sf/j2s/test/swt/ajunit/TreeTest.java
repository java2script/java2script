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
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Tree;
import org.eclipse.swt.widgets.TreeColumn;
import org.eclipse.swt.widgets.TreeItem;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class TreeTest extends AsyncTestCase {

	public void testTreeHeaderSize3() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		tree1.setHeaderVisible(true);
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		tree2.setHeaderVisible(true);
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		tree3.setHeaderVisible(true);
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		tree4.setHeaderVisible(true);
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		tree5.setHeaderVisible(true);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 80, 33), tree1.getBounds());
				assertEquals(new Rectangle(5, 43, 84, 37), tree2.getBounds());
				assertEquals(new Rectangle(5, 85, 80, 33), tree3.getBounds());
				assertEquals(new Rectangle(5, 123, 80, 33), tree4.getBounds());
				assertEquals(new Rectangle(5, 161, 80, 33), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTreeHeaderSize2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE).setWidth(40);
		tree1.setHeaderVisible(true);
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE).setWidth(40);
		tree2.setHeaderVisible(true);
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE).setWidth(40);
		tree3.setHeaderVisible(true);
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE).setWidth(40);
		tree4.setHeaderVisible(true);
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE).setWidth(40);
		tree5.setHeaderVisible(true);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 56, 33), tree1.getBounds());
				assertEquals(new Rectangle(5, 43, 60, 37), tree2.getBounds());
				assertEquals(new Rectangle(5, 85, 56, 33), tree3.getBounds());
				assertEquals(new Rectangle(5, 123, 56, 33), tree4.getBounds());
				assertEquals(new Rectangle(5, 161, 56, 33), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTreeHeaderSize1() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE).setWidth(40);
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE).setWidth(40);
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE).setWidth(40);
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE).setWidth(40);
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE).setWidth(40);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 56, 80), tree1.getBounds());
				assertEquals(new Rectangle(5, 90, 60, 84), tree2.getBounds());
				assertEquals(new Rectangle(5, 179, 56, 80), tree3.getBounds());
				assertEquals(new Rectangle(5, 264, 56, 80), tree4.getBounds());
				assertEquals(new Rectangle(5, 349, 56, 80), tree5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTreeSizeHeader() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE).setWidth(40);
		new TreeColumn(tree1, SWT.NONE).setWidth(40);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE);
		treeItem1.setText(0, "A");
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE);
		treeItem12.setText(1, "W");
		tree1.setHeaderVisible(true);
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE).setWidth(40);
		new TreeColumn(tree2, SWT.NONE).setWidth(40);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		treeItem2.setText(0, "A");
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		treeItem22.setText(1, ".");
		tree2.setHeaderVisible(true);
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE).setWidth(40);
		new TreeColumn(tree3, SWT.NONE).setWidth(40);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		treeItem3.setText(0, "A");
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		treeItem32.setText(new String[] { null, "ABC"});
		tree3.setHeaderVisible(true);
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE).setWidth(40);
		new TreeColumn(tree4, SWT.NONE).setWidth(40);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		treeItem4.setText(".");
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		treeItem42.setText("A.");
		tree4.setHeaderVisible(true);
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE).setWidth(40);
		new TreeColumn(tree5, SWT.NONE).setWidth(40);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		treeItem5.setText("W");
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		treeItem52.setText(new String[] {"Width", "Very long long string"});
		tree5.setHeaderVisible(true);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 96, 65), tree1.getBounds());
				assertEquals(new Rectangle(5, 75, 100, 69), tree2.getBounds());
				assertEquals(new Rectangle(5, 149, 96, 65), tree3.getBounds());
				assertEquals(new Rectangle(5, 219, 96, 65), tree4.getBounds());
				assertEquals(new Rectangle(5, 289, 96, 65), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTreeSizeX123() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE).setWidth(40);
		new TreeColumn(tree1, SWT.NONE).setWidth(40);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE);
		treeItem1.setText(0, "A");
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE);
		treeItem12.setText(1, "W");
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE).setWidth(40);
		new TreeColumn(tree2, SWT.NONE).setWidth(40);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		treeItem2.setText(0, "A");
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		treeItem22.setText(1, ".");
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE).setWidth(40);
		new TreeColumn(tree3, SWT.NONE).setWidth(40);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		treeItem3.setText(0, "A");
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		treeItem32.setText(new String[] { null, "ABC"});
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE).setWidth(40);
		new TreeColumn(tree4, SWT.NONE).setWidth(40);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		treeItem4.setText(".");
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		treeItem42.setText("A.");
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE).setWidth(40);
		new TreeColumn(tree5, SWT.NONE).setWidth(40);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		treeItem5.setText("W");
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		treeItem52.setText(new String[] {"Width", "Very long long string"});
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 96, 48), tree1.getBounds());
				assertEquals(new Rectangle(5, 58, 100, 52), tree2.getBounds());
				assertEquals(new Rectangle(5, 115, 96, 48), tree3.getBounds());
				assertEquals(new Rectangle(5, 168, 96, 48), tree4.getBounds());
				assertEquals(new Rectangle(5, 221, 96, 48), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTreeSizeX122() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE).setWidth(40);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE);
		treeItem1.setText("A");
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE);
		treeItem12.setText("W");
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE).setWidth(40);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		treeItem2.setText("A");
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		treeItem22.setText(".");
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE).setWidth(40);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		treeItem3.setText("A");
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		treeItem32.setText("ABC");
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE).setWidth(40);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		treeItem4.setText(".");
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		treeItem42.setText("A.");
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE).setWidth(40);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		treeItem5.setText("W");
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		treeItem52.setText("Width");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 56, 48), tree1.getBounds());
				assertEquals(new Rectangle(5, 58, 60, 52), tree2.getBounds());
				assertEquals(new Rectangle(5, 115, 59, 48), tree3.getBounds());
				assertEquals(new Rectangle(5, 168, 56, 48), tree4.getBounds());
				assertEquals(new Rectangle(5, 221, 67, 48), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTreeSizeX12() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE);
		treeItem1.setText("A");
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE);
		treeItem12.setText("W");
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		treeItem2.setText("A");
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		treeItem22.setText(".");
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		treeItem3.setText("A");
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		treeItem32.setText("ABC");
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		treeItem4.setText(".");
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		treeItem42.setText("A.");
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		treeItem5.setText("W");
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		treeItem52.setText("Width");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 49, 48), tree1.getBounds());
				assertEquals(new Rectangle(5, 58, 50, 52), tree2.getBounds());
				assertEquals(new Rectangle(5, 115, 59, 48), tree3.getBounds());
				assertEquals(new Rectangle(5, 168, 50, 48), tree4.getBounds());
				assertEquals(new Rectangle(5, 221, 67, 48), tree5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTreeSizeX1() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE); 
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE); 
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 39, 48), tree1.getBounds());
				assertEquals(new Rectangle(5, 58, 43, 52), tree2.getBounds());
				assertEquals(new Rectangle(5, 115, 39, 48), tree3.getBounds());
				assertEquals(new Rectangle(5, 168, 39, 48), tree4.getBounds());
				assertEquals(new Rectangle(5, 221, 39, 48), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTreeSizeX2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE);
		new TreeColumn(tree1, SWT.NONE);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE); 
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE); 
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		new TreeColumn(tree2, SWT.NONE);
		new TreeColumn(tree2, SWT.NONE);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		new TreeColumn(tree3, SWT.NONE);
		new TreeColumn(tree3, SWT.NONE);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		new TreeColumn(tree4, SWT.NONE);
		new TreeColumn(tree4, SWT.NONE);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TreeColumn(tree5, SWT.NONE);
		new TreeColumn(tree5, SWT.NONE);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 39, 48), tree1.getBounds());
				assertEquals(new Rectangle(5, 58, 43, 52), tree2.getBounds());
				assertEquals(new Rectangle(5, 115, 39, 48), tree3.getBounds());
				assertEquals(new Rectangle(5, 168, 39, 48), tree4.getBounds());
				assertEquals(new Rectangle(5, 221, 39, 48), tree5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTreeSize5() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE);
		treeItem1.setText("A");
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE);
		treeItem12.setText("W");
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		treeItem2.setText("A");
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		treeItem22.setText(".");
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		treeItem3.setText("A");
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		treeItem32.setText("ABC");
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		treeItem4.setText(".");
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		treeItem42.setText("A.");
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		treeItem5.setText("W");
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		treeItem52.setText("Width");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 49, 48), tree1.getBounds());
				assertEquals(new Rectangle(5, 58, 50, 52), tree2.getBounds());
				assertEquals(new Rectangle(5, 115, 59, 48), tree3.getBounds());
				assertEquals(new Rectangle(5, 168, 50, 48), tree4.getBounds());
				assertEquals(new Rectangle(5, 221, 67, 48), tree5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTreeSize4() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE);
		treeItem1.setText("A");
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		treeItem2.setText("A");
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		treeItem3.setText("A");
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		treeItem4.setText(".");
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		treeItem5.setText("W");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 46, 32), tree1.getBounds());
				assertEquals(new Rectangle(5, 42, 50, 36), tree2.getBounds());
				assertEquals(new Rectangle(5, 83, 46, 32), tree3.getBounds());
				assertEquals(new Rectangle(5, 120, 43, 32), tree4.getBounds());
				assertEquals(new Rectangle(5, 157, 49, 32), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTreeSize3() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE); 
		final TreeItem treeItem12 = new TreeItem(tree1, SWT.NONE); 
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		final TreeItem treeItem22 = new TreeItem(tree2, SWT.NONE); 
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		final TreeItem treeItem32 = new TreeItem(tree3, SWT.NONE); 
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		final TreeItem treeItem42 = new TreeItem(tree4, SWT.NONE); 
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		final TreeItem treeItem52 = new TreeItem(tree5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 39, 48), tree1.getBounds());
				assertEquals(new Rectangle(5, 58, 43, 52), tree2.getBounds());
				assertEquals(new Rectangle(5, 115, 39, 48), tree3.getBounds());
				assertEquals(new Rectangle(5, 168, 39, 48), tree4.getBounds());
				assertEquals(new Rectangle(5, 221, 39, 48), tree5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTreeSize2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		final TreeItem treeItem1 = new TreeItem(tree1, SWT.NONE); 
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		final TreeItem treeItem2 = new TreeItem(tree2, SWT.NONE); 
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		final TreeItem treeItem3 = new TreeItem(tree3, SWT.NONE); 
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		final TreeItem treeItem4 = new TreeItem(tree4, SWT.NONE); 
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TreeItem treeItem5 = new TreeItem(tree5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 39, 32), tree1.getBounds());
				assertEquals(new Rectangle(5, 42, 43, 36), tree2.getBounds());
				assertEquals(new Rectangle(5, 83, 39, 32), tree3.getBounds());
				assertEquals(new Rectangle(5, 120, 39, 32), tree4.getBounds());
				assertEquals(new Rectangle(5, 157, 39, 32), tree5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTreeSize1() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Tree tree1 = new Tree(shell, SWT.NONE);
		final Tree tree2 = new Tree(shell, SWT.BORDER);
		final Tree tree3 = new Tree(shell, SWT.V_SCROLL);
		final Tree tree4 = new Tree(shell, SWT.H_SCROLL);
		final Tree tree5 = new Tree(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(tree1.getBounds());
				System.out.println(tree2.getBounds());
				System.out.println(tree3.getBounds());
				System.out.println(tree4.getBounds());
				System.out.println(tree5.getBounds());
				assertEquals(new Rectangle(5, 5, 80, 80), tree1.getBounds());
				assertEquals(new Rectangle(5, 90, 84, 84), tree2.getBounds());
				assertEquals(new Rectangle(5, 179, 80, 80), tree3.getBounds());
				assertEquals(new Rectangle(5, 264, 80, 80), tree4.getBounds());
				assertEquals(new Rectangle(5, 349, 80, 80), tree5.getBounds());
			}
		});
		display.dispose ();
	}

	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (TreeTest.class);
	}
}
