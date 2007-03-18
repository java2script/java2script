/*******************************************************************************
 * Copyright (c) 2000, 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.test.swt.widgets;
 
/*
 * Tree example snippet: create a tree
 *
 * For a list of all SWT example snippets see
 * http://www.eclipse.org/swt/snippets/
 */
import org.eclipse.swt.*;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.*;

public class TestTree {

public static void main (String [] args) {
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
	while (!shell.isDisposed()) {
		if (!display.readAndDispatch ()) display.sleep ();
	}
	display.dispose ();
//	Display display = new Display ();
//	Shell shell = new Shell (display);
//	shell.setLayout(new FillLayout());
//	Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));
//	Image imageClose = new Image(display, TestButton.class.getResourceAsStream("closedFolder.gif"));
//	final Tree tree = new Tree (shell, SWT.BORDER | SWT.CHECK);
//	tree.setSize (100, 100);
//	shell.setSize (300, 200);
//	for (int i=0; i<2; i++) {
//		TreeItem iItem = new TreeItem (tree, 0);
//		iItem.setText ("TreeItem (0) -" + i);
//		iItem.setImage(imageOpen);
//		for (int j=0; j<2; j++) {
//			TreeItem jItem = new TreeItem (iItem, 0);
//			jItem.setText ("TreeItem (1) -" + j);
//			jItem.setImage(imageClose);
//			for (int k=0; k<3; k++) {
//				TreeItem kItem = new TreeItem (jItem, 0);
//				kItem.setText ("TreeItem (2) -" + k);
////				for (int l=0; l<2; l++) {
////					TreeItem lItem = new TreeItem (kItem, 0);
////					lItem.setText ("TreeItem (3) -" + l);
////				}
//			}
//		}
//	}
//	shell.open ();
//	while (!shell.isDisposed()) {
//		if (!display.readAndDispatch ()) display.sleep ();
//	}
//	imageOpen.dispose();
//	imageClose.dispose();
//	display.dispose ();
}
} 
