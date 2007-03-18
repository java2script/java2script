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

package net.sf.j2s.test.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableColumn;
import org.eclipse.swt.widgets.TableItem;

/**
 * @author zhou renjian
 *
 * 2006-5-21
 */
public class TestTable {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));

		final Table table1 = new Table(shell, SWT.CHECK);
		table1.setLinesVisible(true);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		new TableColumn(table1, SWT.NONE).setWidth(40);
		final TableItem tableItem1 = new TableItem(table1, SWT.NONE);
		tableItem1.setImage(imageOpen);
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
		final Table table6 = new Table(shell, SWT.NONE);
		new TableColumn(table5, SWT.NONE).setText("I'm A Column");
		table6.setHeaderVisible(true);
		final TableItem doNotDeleteMe = new TableItem(table6, SWT.NONE);
		doNotDeleteMe.setText("Do not click on me first! I will be deleted");
		final TableItem deleteMeFirst = new TableItem(table6, SWT.NONE);
		deleteMeFirst.setText("Click on me first! I will be deleted");
		final TableItem deleteMeAfter = new TableItem(table6, SWT.NONE);
		deleteMeAfter.setText("Click on me after! I will be deleted");
		table6.addSelectionListener(new SelectionAdapter(){

			public void widgetDefaultSelected(SelectionEvent e) {
//				table6.remove(table6.indexOf((TableItem) e.item));
				table6.remove(table6.getSelectionIndex());
			}
			
		});
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		imageOpen.dispose();
		display.dispose ();
	}
}
