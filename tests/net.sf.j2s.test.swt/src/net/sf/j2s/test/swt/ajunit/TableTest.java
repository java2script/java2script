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
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;
import org.eclipse.swt.widgets.TableItem;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class TableTest extends AsyncTestCase {

	public void xtestTableHeaderSize3() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		table1.setHeaderVisible(true);
		final Table table2 = new Table(shell, SWT.BORDER);
		table2.setHeaderVisible(true);
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		table3.setHeaderVisible(true);
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		table4.setHeaderVisible(true);
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		table5.setHeaderVisible(true);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 26, 35), table1.getBounds());
				assertEquals(new Rectangle(5, 45, 30, 39), table2.getBounds());
				assertEquals(new Rectangle(5, 89, 26, 35), table3.getBounds());
				assertEquals(new Rectangle(5, 129, 26, 35), table4.getBounds());
				assertEquals(new Rectangle(5, 169, 26, 35), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTableHeaderSize2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		table1.setHeaderVisible(true);
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE).setWidth(40);
		table2.setHeaderVisible(true);
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE).setWidth(40);
		table3.setHeaderVisible(true);
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE).setWidth(40);
		table4.setHeaderVisible(true);
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE).setWidth(40);
		table5.setHeaderVisible(true);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 56, 35), table1.getBounds());
				assertEquals(new Rectangle(5, 45, 60, 39), table2.getBounds());
				assertEquals(new Rectangle(5, 89, 56, 35), table3.getBounds());
				assertEquals(new Rectangle(5, 129, 56, 35), table4.getBounds());
				assertEquals(new Rectangle(5, 169, 56, 35), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTableHeaderSize1() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE).setWidth(40);
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE).setWidth(40);
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE).setWidth(40);
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE).setWidth(40);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 56, 18), table1.getBounds());
				assertEquals(new Rectangle(5, 28, 60, 22), table2.getBounds());
				assertEquals(new Rectangle(5, 55, 56, 18), table3.getBounds());
				assertEquals(new Rectangle(5, 78, 56, 18), table4.getBounds());
				assertEquals(new Rectangle(5, 101, 56, 18), table5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTableSizeHeader() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE);
		tableItem1.setText(0, "A");
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE);
		tableItem12.setText(1, "W");
		table1.setHeaderVisible(true);
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE).setWidth(40);
		new TableColumn(table2, SWT.NONE).setWidth(40);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		tableItem2.setText(0, "A");
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		tableItem22.setText(1, ".");
		table2.setHeaderVisible(true);
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE).setWidth(40);
		new TableColumn(table3, SWT.NONE).setWidth(40);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		tableItem3.setText(0, "A");
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		tableItem32.setText(new String[] { null, "ABC"});
		table3.setHeaderVisible(true);
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE).setWidth(40);
		new TableColumn(table4, SWT.NONE).setWidth(40);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		tableItem4.setText(".");
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		tableItem42.setText("A.");
		table4.setHeaderVisible(true);
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE).setWidth(40);
		new TableColumn(table5, SWT.NONE).setWidth(40);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		tableItem5.setText("W");
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		tableItem52.setText(new String[] {"Width", "Very long long string"});
		table5.setHeaderVisible(true);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 96, 63), table1.getBounds());
				assertEquals(new Rectangle(5, 73, 100, 67), table2.getBounds());
				assertEquals(new Rectangle(5, 145, 96, 63), table3.getBounds());
				assertEquals(new Rectangle(5, 213, 96, 63), table4.getBounds());
				assertEquals(new Rectangle(5, 281, 96, 63), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTableSizeX123() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE);
		tableItem1.setText(0, "A");
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE);
		tableItem12.setText(1, "W");
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE).setWidth(40);
		new TableColumn(table2, SWT.NONE).setWidth(40);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		tableItem2.setText(0, "A");
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		tableItem22.setText(1, ".");
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE).setWidth(40);
		new TableColumn(table3, SWT.NONE).setWidth(40);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		tableItem3.setText(0, "A");
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		tableItem32.setText(new String[] { null, "ABC"});
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE).setWidth(40);
		new TableColumn(table4, SWT.NONE).setWidth(40);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		tableItem4.setText(".");
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		tableItem42.setText("A.");
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE).setWidth(40);
		new TableColumn(table5, SWT.NONE).setWidth(40);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		tableItem5.setText("W");
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		tableItem52.setText(new String[] {"Width", "Very long long string"});
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 96, 46), table1.getBounds());
				assertEquals(new Rectangle(5, 56, 100, 50), table2.getBounds());
				assertEquals(new Rectangle(5, 111, 96, 46), table3.getBounds());
				assertEquals(new Rectangle(5, 162, 96, 46), table4.getBounds());
				assertEquals(new Rectangle(5, 213, 96, 46), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTableSizeX122() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE);
		tableItem1.setText("A");
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE);
		tableItem12.setText("W");
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE).setWidth(40);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		tableItem2.setText("A");
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		tableItem22.setText(".");
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE).setWidth(40);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		tableItem3.setText("A");
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		tableItem32.setText("ABC");
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE).setWidth(40);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		tableItem4.setText(".");
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		tableItem42.setText("A.");
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE).setWidth(40);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		tableItem5.setText("W");
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		tableItem52.setText("Width");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 56, 46), table1.getBounds());
				assertEquals(new Rectangle(5, 56, 60, 50), table2.getBounds());
				assertEquals(new Rectangle(5, 111, 56, 46), table3.getBounds());
				assertEquals(new Rectangle(5, 162, 56, 46), table4.getBounds());
				assertEquals(new Rectangle(5, 213, 56, 46), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTableSizeX12() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE);
		tableItem1.setText("A");
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE);
		tableItem12.setText("W");
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		tableItem2.setText("A");
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		tableItem22.setText(".");
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		tableItem3.setText("A");
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		tableItem32.setText("ABC");
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		tableItem4.setText(".");
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		tableItem42.setText("A.");
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		tableItem5.setText("W");
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		tableItem52.setText("Width");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 80, 46), table1.getBounds());
				assertEquals(new Rectangle(5, 56, 84, 50), table2.getBounds());
				assertEquals(new Rectangle(5, 111, 80, 46), table3.getBounds());
				assertEquals(new Rectangle(5, 162, 80, 46), table4.getBounds());
				assertEquals(new Rectangle(5, 213, 80, 46), table5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTableSizeX1() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE); 
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE); 
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 80, 46), table1.getBounds());
				assertEquals(new Rectangle(5, 56, 84, 50), table2.getBounds());
				assertEquals(new Rectangle(5, 111, 80, 46), table3.getBounds());
				assertEquals(new Rectangle(5, 162, 80, 46), table4.getBounds());
				assertEquals(new Rectangle(5, 213, 80, 46), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTableSizeX2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		new TableColumn(table1, SWT.NONE);
		new TableColumn(table1, SWT.NONE);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE); 
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE); 
		final Table table2 = new Table(shell, SWT.BORDER);
		new TableColumn(table2, SWT.NONE);
		new TableColumn(table2, SWT.NONE);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		new TableColumn(table3, SWT.NONE);
		new TableColumn(table3, SWT.NONE);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		new TableColumn(table4, SWT.NONE);
		new TableColumn(table4, SWT.NONE);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		new TableColumn(table5, SWT.NONE);
		new TableColumn(table5, SWT.NONE);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 80, 46), table1.getBounds());
				assertEquals(new Rectangle(5, 56, 84, 50), table2.getBounds());
				assertEquals(new Rectangle(5, 111, 80, 46), table3.getBounds());
				assertEquals(new Rectangle(5, 162, 80, 46), table4.getBounds());
				assertEquals(new Rectangle(5, 213, 80, 46), table5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTableSize5() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE);
		tableItem1.setText("A");
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE);
		tableItem12.setText("W");
		final Table table2 = new Table(shell, SWT.BORDER);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		tableItem2.setText("A");
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		tableItem22.setText(".");
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		tableItem3.setText("A");
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		tableItem32.setText("ABC");
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		tableItem4.setText(".");
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		tableItem42.setText("A.");
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		tableItem5.setText("W");
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		tableItem52.setText("Width");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 35, 46), table1.getBounds());
				assertEquals(new Rectangle(5, 56, 36, 50), table2.getBounds());
				assertEquals(new Rectangle(5, 111, 45, 46), table3.getBounds());
				assertEquals(new Rectangle(5, 162, 36, 46), table4.getBounds());
				assertEquals(new Rectangle(5, 213, 53, 46), table5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTableSize4() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE);
		tableItem1.setText("A");
		final Table table2 = new Table(shell, SWT.BORDER);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		tableItem2.setText("A");
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		tableItem3.setText("A");
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		tableItem4.setText(".");
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		tableItem5.setText("W");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 32, 32), table1.getBounds());
				assertEquals(new Rectangle(5, 42, 36, 36), table2.getBounds());
				assertEquals(new Rectangle(5, 83, 32, 32), table3.getBounds());
				assertEquals(new Rectangle(5, 120, 29, 32), table4.getBounds());
				assertEquals(new Rectangle(5, 157, 35, 32), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public void testTableSize3() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE); 
		final TableItem tableItem12 = new TableItem(table1, SWT.NONE); 
		final Table table2 = new Table(shell, SWT.BORDER);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		final TableItem tableItem22 = new TableItem(table2, SWT.NONE); 
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		final TableItem tableItem32 = new TableItem(table3, SWT.NONE); 
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		final TableItem tableItem42 = new TableItem(table4, SWT.NONE); 
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		final TableItem tableItem52 = new TableItem(table5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 26, 46), table1.getBounds());
				assertEquals(new Rectangle(5, 56, 30, 50), table2.getBounds());
				assertEquals(new Rectangle(5, 111, 26, 46), table3.getBounds());
				assertEquals(new Rectangle(5, 162, 26, 46), table4.getBounds());
				assertEquals(new Rectangle(5, 213, 26, 46), table5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTableSize2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE); 
		final Table table2 = new Table(shell, SWT.BORDER);
		final TableItem tableItem2 = new TableItem(table2, SWT.NONE); 
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		final TableItem tableItem3 = new TableItem(table3, SWT.NONE); 
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		final TableItem tableItem4 = new TableItem(table4, SWT.NONE); 
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		final TableItem tableItem5 = new TableItem(table5, SWT.NONE); 
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 26, 32), table1.getBounds());
				assertEquals(new Rectangle(5, 42, 30, 36), table2.getBounds());
				assertEquals(new Rectangle(5, 83, 26, 32), table3.getBounds());
				assertEquals(new Rectangle(5, 120, 26, 32), table4.getBounds());
				assertEquals(new Rectangle(5, 157, 26, 32), table5.getBounds());
			}
		});
		display.dispose ();
	}
	
	public void testTableSize1() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());

		final Table table1 = new Table(shell, SWT.NONE);
		final Table table2 = new Table(shell, SWT.BORDER);
		final Table table3 = new Table(shell, SWT.V_SCROLL);
		final Table table4 = new Table(shell, SWT.H_SCROLL);
		final Table table5 = new Table(shell, SWT.V_SCROLL | SWT.H_SCROLL);
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(table1.getBounds());
				System.out.println(table2.getBounds());
				System.out.println(table3.getBounds());
				System.out.println(table4.getBounds());
				System.out.println(table5.getBounds());
				assertEquals(new Rectangle(5, 5, 26, 18), table1.getBounds());
				assertEquals(new Rectangle(5, 28, 30, 22), table2.getBounds());
				assertEquals(new Rectangle(5, 55, 26, 18), table3.getBounds());
				assertEquals(new Rectangle(5, 78, 26, 18), table4.getBounds());
				assertEquals(new Rectangle(5, 101, 26, 18), table5.getBounds());
			}
		});
		display.dispose ();
	}

	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (TableTest.class);
	}
}
