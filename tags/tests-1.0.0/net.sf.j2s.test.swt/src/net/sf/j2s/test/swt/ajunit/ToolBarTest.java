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
import net.sf.j2s.test.swt.widgets.TestButton;
import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class ToolBarTest extends AsyncTestCase {

	public void testComboToolItem2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final ToolBar bar = new ToolBar(shell, SWT.NONE);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final ToolBar bar2 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar2, SWT.NONE).setText("Hello");
		final ToolItem itemDrowdown = new ToolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final ToolBar bar3 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar3, SWT.NONE).setText("Hello");
		final ToolItem toolItemSep = new ToolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		final Combo combo = new Combo(bar3, SWT.DROP_DOWN);
		combo.setItems (new String [] {"250", "500", "750"});
		combo.setText (combo.getItem (0));
		combo.pack ();
		toolItemSep.setWidth (combo.getSize ().x);
		toolItemSep.setControl(combo);
		
		final ToolItem followItem = new ToolItem(bar3, SWT.NONE);
		followItem.setText("Hello world");
		
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		final ToolBar bar4 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar4, SWT.NONE).setText("Hello");
		new ToolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar5 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar5, SWT.NONE).setText("Hello World");
		new ToolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar6 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar6, SWT.NONE).setText("Hello World");
		final ToolItem toolItem2 = new ToolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar6, SWT.NONE);//.setText("World");
		
		final ToolBar bar7 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar7, SWT.NONE);
		final ToolItem toolItem3 = new ToolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("Hello World");//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("World longing for");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(bar7.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItemSep.getBounds());
				System.out.println(combo.getBounds());
				System.out.println(followItem.getBounds());
				System.out.println(itemDrowdown.getBounds());
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem3.getBounds());
				assertEquals(bar.getSize(), new Point(65, 23));
				assertEquals(bar2.getSize(), new Point(86, 23));
				assertEquals(bar3.getSize(), new Point(213, 23));
				assertEquals(bar4.getSize(), new Point(77, 23));
				assertEquals(bar5.getSize(), new Point(139, 23));
				assertEquals(bar6.getSize(), new Point(200, 23));
				assertEquals(bar7.getSize(), new Point(349, 23));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 2, 65, 21));
				assertEquals(toolItemSep.getBounds(), new Rectangle(34, 2, 41, 21));
				assertEquals(combo.getBounds(), new Rectangle(34, 2, 41, 21));
				assertEquals(followItem.getBounds(), new Rectangle(75, 2, 63, 21));
				assertEquals(itemDrowdown.getBounds(), new Rectangle(34, 2, 52, 21));
				assertEquals(toolItem2.getBounds(), new Rectangle(65, 2, 74, 21));
				assertEquals(toolItem3.getBounds(), new Rectangle(89, 2, 102, 21));
			}
		});
		display.dispose ();
	}

	public void testComboToolItem() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final ToolBar bar = new ToolBar(shell, SWT.NONE);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final ToolBar bar2 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar2, SWT.NONE).setText("Hello");
		final ToolItem itemDrowdown = new ToolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final ToolBar bar3 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar3, SWT.NONE).setText("Hello");
		final ToolItem toolItemSep = new ToolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		final Combo combo = new Combo(bar3, SWT.DROP_DOWN);
		toolItemSep.setControl(combo);
		
		new ToolItem(bar3, SWT.NONE).setText("Hello world");
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		final ToolBar bar4 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar4, SWT.NONE).setText("Hello");
		new ToolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar5 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar5, SWT.NONE).setText("Hello World");
		new ToolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar6 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar6, SWT.NONE).setText("Hello World");
		final ToolItem toolItem2 = new ToolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar6, SWT.NONE);//.setText("World");
		
		final ToolBar bar7 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar7, SWT.NONE);
		final ToolItem toolItem3 = new ToolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("Hello World");//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("World longing for");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(bar7.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItemSep.getBounds());
				System.out.println(combo.getBounds());
				System.out.println(itemDrowdown.getBounds());
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem3.getBounds());
				assertEquals(bar.getSize(), new Point(65, 23));
				assertEquals(bar2.getSize(), new Point(86, 23));
				assertEquals(bar3.getSize(), new Point(180, 23));
				assertEquals(bar4.getSize(), new Point(77, 23));
				assertEquals(bar5.getSize(), new Point(139, 23));
				assertEquals(bar6.getSize(), new Point(200, 23));
				assertEquals(bar7.getSize(), new Point(349, 23));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 2, 65, 21));
				assertEquals(toolItemSep.getBounds(), new Rectangle(34, 2, 8, 21));
				assertEquals(combo.getBounds(), new Rectangle(34, 2, 8, 21));
				assertEquals(itemDrowdown.getBounds(), new Rectangle(34, 2, 52, 21));
				assertEquals(toolItem2.getBounds(), new Rectangle(65, 2, 74, 21));
				assertEquals(toolItem3.getBounds(), new Rectangle(89, 2, 102, 21));
			}
		});
		display.dispose ();
	}

	public void testFlatToolBarImageItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));

		int style = SWT.FLAT | SWT.SHADOW_OUT;
		final ToolBar bar = new ToolBar(shell, style);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		toolItem.setImage(imageOpen);
		final ToolBar bar2 = new ToolBar(shell, style);
		new ToolItem(bar2, SWT.CHECK).setText("Hello");
		final ToolItem toolItemImage = new ToolItem(bar2, SWT.NONE);
		toolItemImage.setImage(imageOpen);
		final ToolBar bar4 = new ToolBar(shell, style);
		new ToolItem(bar4, SWT.NONE);
		final ToolItem toolItemImage2 = new ToolItem(bar4, SWT.NONE);
		toolItemImage2.setImage(imageOpen);
		final ToolBar bar3 = new ToolBar(shell, style);
		new ToolItem(bar3, SWT.RADIO).setText("Hello");
		new ToolItem(bar3, SWT.RADIO).setText("World");
		final ToolItem toolItem2 = new ToolItem(bar3, SWT.RADIO);
		toolItem2.setText("Hello world");
		toolItem2.setImage(imageOpen);
		//new ToolItem(bar3, SWT.DROP_DOWN).setText("World is small");
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		
		final ToolBar bar5 = new ToolBar(shell, style);
		new ToolItem(bar5, SWT.RADIO).setText("Hello");
		new ToolItem(bar5, SWT.RADIO).setText("World");
		final ToolItem toolItem3 = new ToolItem(bar5, SWT.RADIO);
		toolItem3.setText("Hello world");
		toolItem3.setImage(imageOpen);
		final ToolItem toolItem4 = new ToolItem(bar5, SWT.DROP_DOWN);
		toolItem4.setText("World is small");
		toolItem4.setImage(imageOpen);
		new ToolItem(bar5, SWT.NONE).setText("World is small");

		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar3.getSize());
				System.out.println(bar5.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItemImage.getBounds());
				System.out.println(toolItemImage2.getBounds());
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem4.getBounds());
				assertEquals(bar.getSize(), new Point(65, 38));
				assertEquals(bar2.getSize(), new Point(57, 38));
				assertEquals(bar4.getSize(), new Point(46, 24));
				assertEquals(bar3.getSize(), new Point(211, 38));
				assertEquals(bar5.getSize(), new Point(299, 38));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 0, 65, 36));
				assertEquals(toolItemImage.getBounds(), new Rectangle(34, 0, 23, 36));
				assertEquals(toolItemImage2.getBounds(), new Rectangle(23, 0, 23, 22));
				assertEquals(toolItem2.getBounds(), new Rectangle(73, 0, 63, 36));
				assertEquals(toolItem4.getBounds(), new Rectangle(136, 0, 88, 36));
			}
		});
		imageOpen.dispose();
		display.dispose ();
	}

	public void testToolBarImageItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));

		final ToolBar bar = new ToolBar(shell, SWT.NONE);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		toolItem.setImage(imageOpen);
		final ToolBar bar2 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar2, SWT.CHECK).setText("Hello");
		final ToolItem toolItemImage = new ToolItem(bar2, SWT.NONE);
		toolItemImage.setImage(imageOpen);
		final ToolBar bar4 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar4, SWT.NONE);
		final ToolItem toolItemImage2 = new ToolItem(bar4, SWT.NONE);
		toolItemImage2.setImage(imageOpen);
		final ToolBar bar3 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar3, SWT.RADIO).setText("Hello");
		new ToolItem(bar3, SWT.RADIO).setText("World");
		final ToolItem toolItem2 = new ToolItem(bar3, SWT.RADIO);
		toolItem2.setText("Hello world");
		toolItem2.setImage(imageOpen);
		//new ToolItem(bar3, SWT.DROP_DOWN).setText("World is small");
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		
		final ToolBar bar5 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar5, SWT.RADIO).setText("Hello");
		new ToolItem(bar5, SWT.RADIO).setText("World");
		final ToolItem toolItem3 = new ToolItem(bar5, SWT.RADIO);
		toolItem3.setText("Hello world");
		toolItem3.setImage(imageOpen);
		final ToolItem toolItem4 = new ToolItem(bar5, SWT.DROP_DOWN);
		toolItem4.setText("World is small");
		toolItem4.setImage(imageOpen);
		new ToolItem(bar5, SWT.NONE).setText("World is small");

		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar3.getSize());
				System.out.println(bar5.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItemImage.getBounds());
				System.out.println(toolItemImage2.getBounds());
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem4.getBounds());
				assertEquals(bar.getSize(), new Point(65, 38));
				assertEquals(bar2.getSize(), new Point(57, 38));
				assertEquals(bar4.getSize(), new Point(46, 24));
				assertEquals(bar3.getSize(), new Point(211, 38));
				assertEquals(bar5.getSize(), new Point(299, 38));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 2, 65, 36));
				assertEquals(toolItemImage.getBounds(), new Rectangle(34, 2, 23, 36));
				assertEquals(toolItemImage2.getBounds(), new Rectangle(23, 2, 23, 22));
				assertEquals(toolItem2.getBounds(), new Rectangle(73, 2, 63, 36));
				assertEquals(toolItem4.getBounds(), new Rectangle(136, 2, 88, 36));
			}
		});
		imageOpen.dispose();
		display.dispose ();
	}

	public void testFlatToolBarItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		int style = SWT.FLAT;
		
		final ToolBar bar = new ToolBar(shell, style);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final ToolBar bar2 = new ToolBar(shell, style);
		new ToolItem(bar2, SWT.NONE).setText("Hello");
		final ToolItem itemDrowdown = new ToolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final ToolBar bar3 = new ToolBar(shell, style);
		new ToolItem(bar3, SWT.NONE).setText("Hello");
		final ToolItem toolItemSep = new ToolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		new ToolItem(bar3, SWT.NONE).setText("Hello world");
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		final ToolBar bar4 = new ToolBar(shell, style);
		new ToolItem(bar4, SWT.NONE).setText("Hello");
		new ToolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar5 = new ToolBar(shell, style);
		new ToolItem(bar5, SWT.NONE).setText("Hello World");
		new ToolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar6 = new ToolBar(shell, style);
		new ToolItem(bar6, SWT.NONE).setText("Hello World");
		final ToolItem toolItem2 = new ToolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar6, SWT.NONE);//.setText("World");
		
		final ToolBar bar7 = new ToolBar(shell, style);
		new ToolItem(bar7, SWT.NONE);
		final ToolItem toolItem3 = new ToolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		final ToolItem toolItem4 = new ToolItem(bar7, SWT.NONE);
		toolItem4.setText("Hello World");//.setText("World");
		final ToolItem toolItem5 = new ToolItem(bar7, SWT.NONE);
		toolItem5.setText("World longing for");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(bar7.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItemSep.getBounds());
				System.out.println(itemDrowdown.getBounds());
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem3.getBounds());
				System.out.println(toolItem4.getBounds());
				System.out.println(toolItem5.getBounds());
				assertEquals(bar.getSize(), new Point(65, 21));
				assertEquals(bar2.getSize(), new Point(86, 21));
				assertEquals(bar3.getSize(), new Point(180, 21));
				assertEquals(bar4.getSize(), new Point(77, 21));
				assertEquals(bar5.getSize(), new Point(139, 21));
				assertEquals(bar6.getSize(), new Point(200, 21));
				assertEquals(bar7.getSize(), new Point(349, 21));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 0, 65, 21));
				assertEquals(toolItemSep.getBounds(), new Rectangle(34, 0, 8, 21));
				assertEquals(itemDrowdown.getBounds(), new Rectangle(34, 0, 52, 21));
				assertEquals(toolItem2.getBounds(), new Rectangle(65, 0, 74, 21));
				assertEquals(toolItem3.getBounds(), new Rectangle(89, 0, 102, 21));
				assertEquals(toolItem4.getBounds(), new Rectangle(191, 0, 65, 21));
				assertEquals(toolItem5.getBounds(), new Rectangle(256, 0, 93, 21));
			}
		});
		display.dispose ();
	}


	public void testBorderToolBarItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		int style = SWT.BORDER;
		
		final ToolBar bar = new ToolBar(shell, style);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final ToolBar bar2 = new ToolBar(shell, style);
		new ToolItem(bar2, SWT.NONE).setText("Hello");
		final ToolItem itemDrowdown = new ToolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final ToolBar bar3 = new ToolBar(shell, style);
		new ToolItem(bar3, SWT.NONE).setText("Hello");
		final ToolItem toolItemSep = new ToolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		new ToolItem(bar3, SWT.NONE).setText("Hello world");
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		final ToolBar bar4 = new ToolBar(shell, style);
		new ToolItem(bar4, SWT.NONE).setText("Hello");
		new ToolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar5 = new ToolBar(shell, style);
		new ToolItem(bar5, SWT.NONE).setText("Hello World");
		new ToolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar6 = new ToolBar(shell, style);
		new ToolItem(bar6, SWT.NONE).setText("Hello World");
		final ToolItem toolItem2 = new ToolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar6, SWT.NONE);//.setText("World");
		
		final ToolBar bar7 = new ToolBar(shell, style);
		new ToolItem(bar7, SWT.NONE);
		final ToolItem toolItem3 = new ToolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("Hello World");//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("World longing for");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(bar7.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItemSep.getBounds());
				System.out.println(itemDrowdown.getBounds());
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem3.getBounds());
				assertEquals(bar.getSize(), new Point(69, 27));
				assertEquals(bar2.getSize(), new Point(90, 27));
				assertEquals(bar3.getSize(), new Point(184, 27));
				assertEquals(bar4.getSize(), new Point(81, 27));
				assertEquals(bar5.getSize(), new Point(143, 27));
				assertEquals(bar6.getSize(), new Point(204, 27));
				assertEquals(bar7.getSize(), new Point(353, 27));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 2, 65, 21));
				assertEquals(toolItemSep.getBounds(), new Rectangle(34, 2, 8, 21));
				assertEquals(itemDrowdown.getBounds(), new Rectangle(34, 2, 52, 21));
				assertEquals(toolItem2.getBounds(), new Rectangle(65, 2, 74, 21));
				assertEquals(toolItem3.getBounds(), new Rectangle(89, 2, 102, 21));
			}
		});
		display.dispose ();
	}


	public void testToolBarItem2Size() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final ToolBar bar = new ToolBar(shell, SWT.NONE);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final ToolBar bar2 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar2, SWT.NONE).setText("Hello");
		final ToolItem itemDrowdown = new ToolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final ToolBar bar3 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar3, SWT.NONE).setText("Hello");
		final ToolItem toolItemSep = new ToolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		new ToolItem(bar3, SWT.NONE).setText("Hello world");
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		final ToolBar bar4 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar4, SWT.NONE).setText("Hello");
		new ToolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar5 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar5, SWT.NONE).setText("Hello World");
		new ToolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final ToolBar bar6 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar6, SWT.NONE).setText("Hello World");
		final ToolItem toolItem2 = new ToolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar6, SWT.NONE);//.setText("World");
		
		final ToolBar bar7 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar7, SWT.NONE);
		final ToolItem toolItem3 = new ToolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("Hello World");//.setText("World");
		new ToolItem(bar7, SWT.NONE).setText("World longing for");
		
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(bar7.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItemSep.getBounds());
				System.out.println(itemDrowdown.getBounds());
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem3.getBounds());
				assertEquals(bar.getSize(), new Point(65, 23));
				assertEquals(bar2.getSize(), new Point(86, 23));
				assertEquals(bar3.getSize(), new Point(180, 23));
				assertEquals(bar4.getSize(), new Point(77, 23));
				assertEquals(bar5.getSize(), new Point(139, 23));
				assertEquals(bar6.getSize(), new Point(200, 23));
				assertEquals(bar7.getSize(), new Point(349, 23));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 2, 65, 21));
				assertEquals(toolItemSep.getBounds(), new Rectangle(34, 2, 8, 21));
				assertEquals(itemDrowdown.getBounds(), new Rectangle(34, 2, 52, 21));
				assertEquals(toolItem2.getBounds(), new Rectangle(65, 2, 74, 21));
				assertEquals(toolItem3.getBounds(), new Rectangle(89, 2, 102, 21));
			}
		});
		display.dispose ();
	}

	public void testToolBarItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final ToolBar bar = new ToolBar(shell, SWT.NONE);
		final ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final ToolBar bar2 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar2, SWT.NONE).setText("Hello");
		new ToolItem(bar2, SWT.NONE).setText("World");
		final ToolBar bar3 = new ToolBar(shell, SWT.NONE);
		new ToolItem(bar3, SWT.NONE).setText("Hello");
		new ToolItem(bar3, SWT.NONE).setText("World");
		new ToolItem(bar3, SWT.NONE).setText("Hello world");
		new ToolItem(bar3, SWT.NONE).setText("World is small");
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				System.out.println(bar2.getSize());
				System.out.println(bar3.getSize());
				System.out.println(toolItem.getBounds());
				assertEquals(bar.getSize(), new Point(65, 23));
				assertEquals(bar2.getSize(), new Point(73, 23));
				assertEquals(bar3.getSize(), new Point(211, 23));
			}
		});
		display.dispose ();
	}

	public void testLayoutDataSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final ToolBar bar1 = new ToolBar(shell, SWT.NONE);
		bar1.setLayoutData(new GridData(120, 40));
		bar1.setEnabled(false);
		final ToolBar bar2 = new ToolBar(shell, SWT.BORDER);
		bar2.setLayoutData(new GridData(150, 50));
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar1.getSize());
				System.out.println(bar2.getSize());
				assertEquals(bar1.getSize(), new Point(120, 40));
				assertEquals(bar2.getSize(), new Point(154, 54));
			}
		});
		display.dispose ();
	}
	
	
	public void testToolBarSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final ToolBar bar = new ToolBar(shell, SWT.NONE);
		//cmb1.setItems(new String[] {"Hello", "World"});
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				assertEquals(bar.getSize(), new Point(24, 22));
			}
		});
		display.dispose ();
	}

	
	public void xtestComboPos() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		ToolBar btnImg = new ToolBar(shell, SWT.TOGGLE);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println("make position tests ... ");
				assertTrue(true);
			}
		});
		display.dispose ();
	}

	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (ToolBarTest.class);
	}
}
