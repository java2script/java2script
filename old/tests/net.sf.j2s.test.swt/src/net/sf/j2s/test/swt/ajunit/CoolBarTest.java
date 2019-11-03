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
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.CoolBar;
import org.eclipse.swt.widgets.CoolItem;
import org.eclipse.swt.widgets.Text;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class CoolBarTest extends AsyncTestCase {

	/*
	public void xtestFlatCoolBarImageItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));

		int style = SWT.FLAT | SWT.SHADOW_OUT;
		final CoolBar bar = new CoolBar(shell, style);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		toolItem.setImage(imageOpen);
		final CoolBar bar2 = new CoolBar(shell, style);
		new CoolItem(bar2, SWT.CHECK).setText("Hello");
		final CoolItem toolItemImage = new CoolItem(bar2, SWT.NONE);
		toolItemImage.setImage(imageOpen);
		final CoolBar bar4 = new CoolBar(shell, style);
		new CoolItem(bar4, SWT.NONE);
		final CoolItem toolItemImage2 = new CoolItem(bar4, SWT.NONE);
		toolItemImage2.setImage(imageOpen);
		final CoolBar bar3 = new CoolBar(shell, style);
		new CoolItem(bar3, SWT.RADIO).setText("Hello");
		new CoolItem(bar3, SWT.RADIO).setText("World");
		final CoolItem toolItem2 = new CoolItem(bar3, SWT.RADIO);
		toolItem2.setText("Hello world");
		toolItem2.setImage(imageOpen);
		//new CoolItem(bar3, SWT.DROP_DOWN).setText("World is small");
		new CoolItem(bar3, SWT.NONE).setText("World is small");
		
		final CoolBar bar5 = new CoolBar(shell, style);
		new CoolItem(bar5, SWT.RADIO).setText("Hello");
		new CoolItem(bar5, SWT.RADIO).setText("World");
		final CoolItem toolItem3 = new CoolItem(bar5, SWT.RADIO);
		toolItem3.setText("Hello world");
		toolItem3.setImage(imageOpen);
		final CoolItem toolItem4 = new CoolItem(bar5, SWT.DROP_DOWN);
		toolItem4.setText("World is small");
		toolItem4.setImage(imageOpen);
		new CoolItem(bar5, SWT.NONE).setText("World is small");

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

	public void xtestCoolBarImageItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));

		final CoolBar bar = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		toolItem.setImage(imageOpen);
		final CoolBar bar2 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar2, SWT.CHECK).setText("Hello");
		final CoolItem toolItemImage = new CoolItem(bar2, SWT.NONE);
		toolItemImage.setImage(imageOpen);
		final CoolBar bar4 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar4, SWT.NONE);
		final CoolItem toolItemImage2 = new CoolItem(bar4, SWT.NONE);
		toolItemImage2.setImage(imageOpen);
		final CoolBar bar3 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar3, SWT.RADIO).setText("Hello");
		new CoolItem(bar3, SWT.RADIO).setText("World");
		final CoolItem toolItem2 = new CoolItem(bar3, SWT.RADIO);
		toolItem2.setText("Hello world");
		toolItem2.setImage(imageOpen);
		//new CoolItem(bar3, SWT.DROP_DOWN).setText("World is small");
		new CoolItem(bar3, SWT.NONE).setText("World is small");
		
		final CoolBar bar5 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar5, SWT.RADIO).setText("Hello");
		new CoolItem(bar5, SWT.RADIO).setText("World");
		final CoolItem toolItem3 = new CoolItem(bar5, SWT.RADIO);
		toolItem3.setText("Hello world");
		toolItem3.setImage(imageOpen);
		final CoolItem toolItem4 = new CoolItem(bar5, SWT.DROP_DOWN);
		toolItem4.setText("World is small");
		toolItem4.setImage(imageOpen);
		new CoolItem(bar5, SWT.NONE).setText("World is small");

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

	public void xtestFlatCoolBarItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		int style = SWT.FLAT;
		
		final CoolBar bar = new CoolBar(shell, style);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final CoolBar bar2 = new CoolBar(shell, style);
		new CoolItem(bar2, SWT.NONE).setText("Hello");
		final CoolItem itemDrowdown = new CoolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final CoolBar bar3 = new CoolBar(shell, style);
		new CoolItem(bar3, SWT.NONE).setText("Hello");
		final CoolItem toolItemSep = new CoolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		new CoolItem(bar3, SWT.NONE).setText("Hello world");
		new CoolItem(bar3, SWT.NONE).setText("World is small");
		final CoolBar bar4 = new CoolBar(shell, style);
		new CoolItem(bar4, SWT.NONE).setText("Hello");
		new CoolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final CoolBar bar5 = new CoolBar(shell, style);
		new CoolItem(bar5, SWT.NONE).setText("Hello World");
		new CoolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final CoolBar bar6 = new CoolBar(shell, style);
		new CoolItem(bar6, SWT.NONE).setText("Hello World");
		final CoolItem toolItem2 = new CoolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new CoolItem(bar6, SWT.NONE);//.setText("World");
		
		final CoolBar bar7 = new CoolBar(shell, style);
		new CoolItem(bar7, SWT.NONE);
		final CoolItem toolItem3 = new CoolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		final CoolItem toolItem4 = new CoolItem(bar7, SWT.NONE);
		toolItem4.setText("Hello World");//.setText("World");
		final CoolItem toolItem5 = new CoolItem(bar7, SWT.NONE);
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


	public void xtestBorderCoolBarItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		int style = SWT.BORDER;
		
		final CoolBar bar = new CoolBar(shell, style);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final CoolBar bar2 = new CoolBar(shell, style);
		new CoolItem(bar2, SWT.NONE).setText("Hello");
		final CoolItem itemDrowdown = new CoolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final CoolBar bar3 = new CoolBar(shell, style);
		new CoolItem(bar3, SWT.NONE).setText("Hello");
		final CoolItem toolItemSep = new CoolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		new CoolItem(bar3, SWT.NONE).setText("Hello world");
		new CoolItem(bar3, SWT.NONE).setText("World is small");
		final CoolBar bar4 = new CoolBar(shell, style);
		new CoolItem(bar4, SWT.NONE).setText("Hello");
		new CoolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final CoolBar bar5 = new CoolBar(shell, style);
		new CoolItem(bar5, SWT.NONE).setText("Hello World");
		new CoolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final CoolBar bar6 = new CoolBar(shell, style);
		new CoolItem(bar6, SWT.NONE).setText("Hello World");
		final CoolItem toolItem2 = new CoolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new CoolItem(bar6, SWT.NONE);//.setText("World");
		
		final CoolBar bar7 = new CoolBar(shell, style);
		new CoolItem(bar7, SWT.NONE);
		final CoolItem toolItem3 = new CoolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		new CoolItem(bar7, SWT.NONE).setText("Hello World");//.setText("World");
		new CoolItem(bar7, SWT.NONE).setText("World longing for");
		
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


	public void xtestCoolBarItem2Size() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final CoolBar bar2 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar2, SWT.NONE).setText("Hello");
		final CoolItem itemDrowdown = new CoolItem(bar2, SWT.DROP_DOWN);
		itemDrowdown.setText("World");
		final CoolBar bar3 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar3, SWT.NONE).setText("Hello");
		final CoolItem toolItemSep = new CoolItem(bar3, SWT.SEPARATOR);
		toolItemSep.setText("World");
		new CoolItem(bar3, SWT.NONE).setText("Hello world");
		new CoolItem(bar3, SWT.NONE).setText("World is small");
		final CoolBar bar4 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar4, SWT.NONE).setText("Hello");
		new CoolItem(bar4, SWT.DROP_DOWN);//.setText("World");
		final CoolBar bar5 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar5, SWT.NONE).setText("Hello World");
		new CoolItem(bar5, SWT.DROP_DOWN);//.setText("World");
		final CoolBar bar6 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar6, SWT.NONE).setText("Hello World");
		final CoolItem toolItem2 = new CoolItem(bar6, SWT.DROP_DOWN);//.setText("World");
		new CoolItem(bar6, SWT.NONE);//.setText("World");
		
		final CoolBar bar7 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar7, SWT.NONE);
		final CoolItem toolItem3 = new CoolItem(bar7, SWT.DROP_DOWN);//.setText("World");
		new CoolItem(bar7, SWT.NONE).setText("Hello World");//.setText("World");
		new CoolItem(bar7, SWT.NONE).setText("World longing for");
		
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

	public void xtestCoolBarItemSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final CoolBar bar2 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar2, SWT.NONE).setText("Hello");
		new CoolItem(bar2, SWT.NONE).setText("World");
		final CoolBar bar3 = new CoolBar(shell, SWT.NONE);
		new CoolItem(bar3, SWT.NONE).setText("Hello");
		new CoolItem(bar3, SWT.NONE).setText("World");
		new CoolItem(bar3, SWT.NONE).setText("Hello world");
		new CoolItem(bar3, SWT.NONE).setText("World is small");
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
	// */
	public void testCoolBarItemWrapControlSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar5 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		final Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello World");
		toolItem5.setControl(label5);
		toolItem5.setPreferredSize(200, 24);
		final CoolItem toolItem52 = new CoolItem(bar5, SWT.NONE);
		final Label label52 = new Label(bar5, SWT.NONE);
		label52.setText("Hello World");
		toolItem52.setControl(label52);
		toolItem52.setPreferredSize(100, 24);
		final CoolItem toolItem53 = new CoolItem(bar5, SWT.NONE);
		final Label label53 = new Label(bar5, SWT.NONE);
		label53.setText("World");
		toolItem53.setControl(label53);
		toolItem53.setPreferredSize(60, 24);
		final CoolItem toolItem54 = new CoolItem(bar5, SWT.NONE);
		final Label label54 = new Label(bar5, SWT.NONE);
		label54.setText("World");
		toolItem54.setControl(label54);
		toolItem54.setPreferredSize(60, 24);
		bar5.setWrapIndices(new int[] { 3 });
		
		final CoolBar bar6 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem6 = new CoolItem(bar6, SWT.NONE);
		final Text text6 = new Text(bar6, SWT.BORDER);
		toolItem6.setControl(text6);
		toolItem6.setPreferredSize(200, 24);
		final CoolItem toolItem62 = new CoolItem(bar6, SWT.NONE);
		final Text text62 = new Text(bar6, SWT.BORDER);
		toolItem62.setControl(text62);
		toolItem62.setPreferredSize(120, 24);
		final CoolItem toolItem63 = new CoolItem(bar6, SWT.NONE);
		final Text text63 = new Text(bar6, SWT.BORDER);
		toolItem63.setControl(text63);
		toolItem63.setPreferredSize(100, 24);
		final CoolItem toolItem64 = new CoolItem(bar6, SWT.NONE);
		final Text text64 = new Text(bar6, SWT.BORDER);
		toolItem64.setControl(text64);
		toolItem64.setPreferredSize(160, 24);
		final CoolItem toolItem65 = new CoolItem(bar6, SWT.NONE);
		final Text text65 = new Text(bar6, SWT.BORDER);
		toolItem65.setControl(text65);
		toolItem65.setPreferredSize(30, 24);
		bar6.setWrapIndices(new int[] { 2 });
		shell.pack();
		shell.setLocation(320, 0);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(label5.getBounds());
				System.out.println(text6.getBounds());
				
				System.out.println(label52.getBounds());
				System.out.println(text62.getBounds());
				System.out.println(label53.getBounds());
				System.out.println(text63.getBounds());
				System.out.println(label54.getBounds());
				System.out.println(text64.getBounds());
				System.out.println(text65.getBounds());

				assertEquals(bar5.getSize(), new Point(368, 54));
				assertEquals(bar6.getSize(), new Point(326, 54));
				assertEquals(label5.getBounds(), new Rectangle(9, 0, 187, 24));
				assertEquals(text6.getBounds(), new Rectangle(9, 0, 187, 24));
				assertEquals(label52.getBounds(), new Rectangle(211, 0, 87, 24));
				assertEquals(text62.getBounds(), new Rectangle(211, 0, 107, 24));
				assertEquals(label53.getBounds(), new Rectangle(313, 0, 47, 24));
				assertEquals(text63.getBounds(), new Rectangle(9, 26, 87, 24));
				assertEquals(label54.getBounds(), new Rectangle(9, 26, 351, 24));
				assertEquals(text64.getBounds(), new Rectangle(111, 26, 147, 24));
				assertEquals(text65.getBounds(), new Rectangle(273, 26, 45, 24));
			}
		});
		display.dispose ();
	}
	
	
	public void testCoolBarItemWrap3() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar5 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello World");
		toolItem5.setControl(label5);
		toolItem5.setPreferredSize(200, 24);
		final CoolItem toolItem52 = new CoolItem(bar5, SWT.NONE);
		Label label52 = new Label(bar5, SWT.NONE);
		label52.setText("Hello World");
		toolItem52.setControl(label52);
		toolItem52.setPreferredSize(100, 24);
		final CoolItem toolItem53 = new CoolItem(bar5, SWT.NONE);
		Label label53 = new Label(bar5, SWT.NONE);
		label53.setText("World");
		toolItem53.setControl(label53);
		toolItem53.setPreferredSize(60, 24);
		final CoolItem toolItem54 = new CoolItem(bar5, SWT.NONE);
		Label label54 = new Label(bar5, SWT.NONE);
		label54.setText("World");
		toolItem54.setControl(label54);
		toolItem54.setPreferredSize(60, 24);
		bar5.setWrapIndices(new int[] { 3 });
		
		final CoolBar bar6 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem6 = new CoolItem(bar6, SWT.NONE);
		Text text6 = new Text(bar6, SWT.BORDER);
		toolItem6.setControl(text6);
		toolItem6.setPreferredSize(200, 24);
		final CoolItem toolItem62 = new CoolItem(bar6, SWT.NONE);
		Text text62 = new Text(bar6, SWT.BORDER);
		toolItem62.setControl(text62);
		toolItem62.setPreferredSize(120, 24);
		final CoolItem toolItem63 = new CoolItem(bar6, SWT.NONE);
		Text text63 = new Text(bar6, SWT.BORDER);
		toolItem63.setControl(text63);
		toolItem63.setPreferredSize(100, 24);
		final CoolItem toolItem64 = new CoolItem(bar6, SWT.NONE);
		Text text64 = new Text(bar6, SWT.BORDER);
		toolItem64.setControl(text64);
		toolItem64.setPreferredSize(160, 24);
		final CoolItem toolItem65 = new CoolItem(bar6, SWT.NONE);
		Text text65 = new Text(bar6, SWT.BORDER);
		toolItem65.setControl(text65);
		toolItem65.setPreferredSize(30, 24);
		bar6.setWrapIndices(new int[] { 2 });
		shell.pack();
		shell.setLocation(320, 0);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem6.getBounds());
				
				System.out.println(toolItem52.getBounds());
				System.out.println(toolItem62.getBounds());
				System.out.println(toolItem53.getBounds());
				System.out.println(toolItem63.getBounds());
				System.out.println(toolItem54.getBounds());
				System.out.println(toolItem64.getBounds());
				System.out.println(toolItem65.getBounds());

				assertEquals(bar5.getSize(), new Point(368, 54));
				assertEquals(bar6.getSize(), new Point(326, 54));
				assertEquals(toolItem5.getBounds(), new Rectangle(0, 0, 202, 24));
				assertEquals(toolItem6.getBounds(), new Rectangle(0, 0, 202, 24));
				assertEquals(toolItem52.getBounds(), new Rectangle(202, 0, 102, 24));
				assertEquals(toolItem62.getBounds(), new Rectangle(202, 0, 120, 24));
				assertEquals(toolItem53.getBounds(), new Rectangle(304, 0, 60, 24));
				assertEquals(toolItem63.getBounds(), new Rectangle(0, 26, 102, 24));
				assertEquals(toolItem54.getBounds(), new Rectangle(0, 26, 364, 24));
				assertEquals(toolItem64.getBounds(), new Rectangle(102, 26, 162, 24));
				assertEquals(toolItem65.getBounds(), new Rectangle(264, 26, 58, 24));
			}
		});
		display.dispose ();
	}
	
	public void testCoolBarItemWrap2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar5 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello World");
		toolItem5.setControl(label5);
		toolItem5.setPreferredSize(200, 24);
		final CoolItem toolItem52 = new CoolItem(bar5, SWT.NONE);
		Label label52 = new Label(bar5, SWT.NONE);
		label52.setText("Hello World");
		toolItem52.setControl(label52);
		toolItem52.setPreferredSize(100, 24);
		final CoolItem toolItem53 = new CoolItem(bar5, SWT.NONE);
		Label label53 = new Label(bar5, SWT.NONE);
		label53.setText("World");
		toolItem53.setControl(label53);
		toolItem53.setPreferredSize(60, 24);
		
		final CoolBar bar6 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem6 = new CoolItem(bar6, SWT.NONE);
		Text text6 = new Text(bar6, SWT.BORDER);
		toolItem6.setControl(text6);
		toolItem6.setPreferredSize(200, 24);
		final CoolItem toolItem62 = new CoolItem(bar6, SWT.NONE);
		Text text62 = new Text(bar6, SWT.BORDER);
		toolItem62.setControl(text62);
		toolItem62.setPreferredSize(120, 24);
		final CoolItem toolItem63 = new CoolItem(bar6, SWT.NONE);
		Text text63 = new Text(bar6, SWT.BORDER);
		toolItem63.setControl(text63);
		toolItem63.setPreferredSize(100, 24);
		final CoolItem toolItem64 = new CoolItem(bar6, SWT.NONE);
		Text text64 = new Text(bar6, SWT.BORDER);
		toolItem64.setControl(text64);
		toolItem64.setPreferredSize(160, 24);
		bar6.setWrapIndices(new int[] { 2 });
		shell.pack();
		shell.setLocation(320, 0);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem6.getBounds());
				
				System.out.println(toolItem52.getBounds());
				System.out.println(toolItem62.getBounds());
				System.out.println(toolItem53.getBounds());
				System.out.println(toolItem63.getBounds());
				System.out.println(toolItem64.getBounds());

				assertEquals(bar5.getSize(), new Point(368, 28));
				assertEquals(bar6.getSize(), new Point(326, 54));
				assertEquals(toolItem5.getBounds(), new Rectangle(0, 0, 202, 24));
				assertEquals(toolItem6.getBounds(), new Rectangle(0, 0, 202, 24));
				assertEquals(toolItem52.getBounds(), new Rectangle(202, 0, 102, 24));
				assertEquals(toolItem62.getBounds(), new Rectangle(202, 0, 120, 24));
				assertEquals(toolItem53.getBounds(), new Rectangle(304, 0, 60, 24));
				assertEquals(toolItem63.getBounds(), new Rectangle(0, 26, 102, 24));
				assertEquals(toolItem64.getBounds(), new Rectangle(102, 26, 220, 24));
			}
		});
		display.dispose ();
	}


	public void testCoolBarItemWrap() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar5 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello World");
		toolItem5.setControl(label5);
		toolItem5.setPreferredSize(200, 24);
		final CoolItem toolItem52 = new CoolItem(bar5, SWT.NONE);
		Label label52 = new Label(bar5, SWT.NONE);
		label52.setText("Hello World");
		toolItem52.setControl(label52);
		toolItem52.setPreferredSize(100, 24);
		final CoolItem toolItem53 = new CoolItem(bar5, SWT.NONE);
		Label label53 = new Label(bar5, SWT.NONE);
		label53.setText("World");
		toolItem53.setControl(label53);
		toolItem53.setPreferredSize(60, 24);
		
		final CoolBar bar6 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem6 = new CoolItem(bar6, SWT.NONE);
		Text text6 = new Text(bar6, SWT.BORDER);
		toolItem6.setControl(text6);
		toolItem6.setPreferredSize(200, 24);
		final CoolItem toolItem62 = new CoolItem(bar6, SWT.NONE);
		Text text62 = new Text(bar6, SWT.BORDER);
		toolItem62.setControl(text62);
		toolItem62.setPreferredSize(120, 24);
		final CoolItem toolItem63 = new CoolItem(bar6, SWT.NONE);
		Text text63 = new Text(bar6, SWT.BORDER);
		toolItem63.setControl(text63);
		toolItem63.setPreferredSize(100, 24);
		final CoolItem toolItem64 = new CoolItem(bar6, SWT.NONE);
		Text text64 = new Text(bar6, SWT.BORDER);
		toolItem64.setControl(text64);
		toolItem64.setPreferredSize(220, 24);
		bar6.setWrapIndices(new int[] { 2 });
		shell.pack();
		shell.setLocation(320, 0);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem6.getBounds());
				
				System.out.println(toolItem52.getBounds());
				System.out.println(toolItem62.getBounds());
				System.out.println(toolItem53.getBounds());
				System.out.println(toolItem63.getBounds());
				System.out.println(toolItem64.getBounds());

				assertEquals(bar5.getSize(), new Point(368, 28));
				assertEquals(bar6.getSize(), new Point(326, 54));
				assertEquals(toolItem5.getBounds(), new Rectangle(0, 0, 202, 24));
				assertEquals(toolItem6.getBounds(), new Rectangle(0, 0, 202, 24));
				assertEquals(toolItem52.getBounds(), new Rectangle(202, 0, 102, 24));
				assertEquals(toolItem62.getBounds(), new Rectangle(202, 0, 120, 24));
				assertEquals(toolItem53.getBounds(), new Rectangle(304, 0, 60, 24));
				assertEquals(toolItem63.getBounds(), new Rectangle(0, 26, 102, 24));
				assertEquals(toolItem64.getBounds(), new Rectangle(102, 26, 220, 24));
			}
		});
		display.dispose ();
	}


	public void testCoolBarItem2() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final CoolItem toolItem2 = new CoolItem(bar, SWT.NONE);
		toolItem2.setText("Hello World");
		final CoolBar bar4 = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem4 = new CoolItem(bar4, SWT.NONE);
		Label label4 = new Label(bar4, SWT.NONE);
		toolItem4.setControl(label4);
		final CoolItem toolItem42 = new CoolItem(bar4, SWT.NONE);
		Label label42 = new Label(bar4, SWT.NONE);
		toolItem42.setControl(label42);
		final CoolBar bar5 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello World");
		toolItem5.setControl(label5);
		final CoolItem toolItem52 = new CoolItem(bar5, SWT.NONE);
		Label label52 = new Label(bar5, SWT.NONE);
		label52.setText("Hello World");
		toolItem52.setControl(label52);
		final CoolBar bar6 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem6 = new CoolItem(bar6, SWT.NONE);
		Text text6 = new Text(bar6, SWT.BORDER);
		toolItem6.setControl(text6);
		toolItem6.setPreferredSize(200, 24);
		final CoolItem toolItem62 = new CoolItem(bar6, SWT.NONE);
		Text text62 = new Text(bar6, SWT.BORDER);
		toolItem62.setControl(text62);
		toolItem62.setPreferredSize(200, 24);
//		final CoolBar bar2 = new CoolBar(shell, SWT.NONE);
//		new CoolItem(bar2, SWT.NONE).setText("Hello");
//		new CoolItem(bar2, SWT.NONE).setText("World");
//		final CoolBar bar3 = new CoolBar(shell, SWT.NONE);
//		new CoolItem(bar3, SWT.NONE).setText("Hello");
//		new CoolItem(bar3, SWT.NONE).setText("World");
//		new CoolItem(bar3, SWT.NONE).setText("Hello world");
//		new CoolItem(bar3, SWT.NONE).setText("World is small");
		shell.pack();
		shell.setLocation(320, 0);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
//				System.out.println(bar2.getSize());
//				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItem4.getBounds());
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem6.getBounds());
//				System.out.println(toolItem4.getBounds());
				
				System.out.println(toolItem2.getBounds());
				System.out.println(toolItem42.getBounds());
				System.out.println(toolItem52.getBounds());
				System.out.println(toolItem62.getBounds());
//				System.out.println(toolItem4.getBounds());

				assertEquals(bar.getSize(), new Point(28, 4));
//				assertEquals(bar2.getSize(), new Point(73, 23));
//				assertEquals(bar3.getSize(), new Point(211, 23));
				assertEquals(bar4.getSize(), new Point(28, 64));
				assertEquals(bar5.getSize(), new Point(32, 68));
				assertEquals(bar6.getSize(), new Point(406, 28));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 0, 15, 4));
				assertEquals(toolItem4.getBounds(), new Rectangle(0, 0, 15, 0));
				assertEquals(toolItem5.getBounds(), new Rectangle(0, 0, 15, 0));
				assertEquals(toolItem6.getBounds(), new Rectangle(0, 0, 202, 24));
				assertEquals(toolItem2.getBounds(), new Rectangle(15, 0, 13, 4));
				assertEquals(toolItem42.getBounds(), new Rectangle(15, 0, 13, 0));
				assertEquals(toolItem52.getBounds(), new Rectangle(15, 0, 13, 0));
				assertEquals(toolItem62.getBounds(), new Rectangle(202, 0, 200, 24));
			}
		});
		display.dispose ();
	}

	public void testCoolBarItemPreferredSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		toolItem.setPreferredSize(200, 24);
		final CoolBar bar4 = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem4 = new CoolItem(bar4, SWT.NONE);
		Label label4 = new Label(bar4, SWT.NONE);
		toolItem4.setControl(label4);
		toolItem4.setPreferredSize(200, 24);
		final CoolBar bar5 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello World");
		toolItem5.setControl(label5);
		toolItem5.setPreferredSize(200, 24);
		final CoolBar bar6 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem6 = new CoolItem(bar6, SWT.NONE);
		Text text6 = new Text(bar6, SWT.BORDER);
		toolItem6.setControl(text6);
		toolItem6.setPreferredSize(200, 24);
//		final CoolBar bar2 = new CoolBar(shell, SWT.NONE);
//		new CoolItem(bar2, SWT.NONE).setText("Hello");
//		new CoolItem(bar2, SWT.NONE).setText("World");
//		final CoolBar bar3 = new CoolBar(shell, SWT.NONE);
//		new CoolItem(bar3, SWT.NONE).setText("Hello");
//		new CoolItem(bar3, SWT.NONE).setText("World");
//		new CoolItem(bar3, SWT.NONE).setText("Hello world");
//		new CoolItem(bar3, SWT.NONE).setText("World is small");
		shell.pack();
		shell.setLocation(320, 0);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
//				System.out.println(bar2.getSize());
//				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItem4.getBounds());
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem6.getBounds());
//				System.out.println(toolItem4.getBounds());
				assertEquals(bar.getSize(), new Point(200, 4));
//				assertEquals(bar2.getSize(), new Point(73, 23));
//				assertEquals(bar3.getSize(), new Point(211, 23));
				assertEquals(bar4.getSize(), new Point(200, 24));
				assertEquals(bar5.getSize(), new Point(204, 28));
				assertEquals(bar6.getSize(), new Point(204, 28));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 0, 200, 4));
				assertEquals(toolItem4.getBounds(), new Rectangle(0, 0, 200, 24));
				assertEquals(toolItem5.getBounds(), new Rectangle(0, 0, 200, 24));
				assertEquals(toolItem6.getBounds(), new Rectangle(0, 0, 200, 24));
			}
		});
		display.dispose ();
	}

	public void testCoolBarItem() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem = new CoolItem(bar, SWT.NONE);
		toolItem.setText("Hello World");
		final CoolBar bar4 = new CoolBar(shell, SWT.NONE);
		final CoolItem toolItem4 = new CoolItem(bar4, SWT.NONE);
		Label label4 = new Label(bar4, SWT.NONE);
		toolItem4.setControl(label4);
		final CoolBar bar5 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello World");
		toolItem5.setControl(label5);
		final CoolBar bar6 = new CoolBar(shell, SWT.BORDER);
		final CoolItem toolItem6 = new CoolItem(bar6, SWT.NONE);
		Text text6 = new Text(bar6, SWT.BORDER);
		toolItem6.setControl(text6);
		toolItem6.setPreferredSize(200, 24);
//		final CoolBar bar2 = new CoolBar(shell, SWT.NONE);
//		new CoolItem(bar2, SWT.NONE).setText("Hello");
//		new CoolItem(bar2, SWT.NONE).setText("World");
//		final CoolBar bar3 = new CoolBar(shell, SWT.NONE);
//		new CoolItem(bar3, SWT.NONE).setText("Hello");
//		new CoolItem(bar3, SWT.NONE).setText("World");
//		new CoolItem(bar3, SWT.NONE).setText("Hello world");
//		new CoolItem(bar3, SWT.NONE).setText("World is small");
		shell.pack();
		shell.setLocation(320, 0);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
//				System.out.println(bar2.getSize());
//				System.out.println(bar3.getSize());
				System.out.println(bar4.getSize());
				System.out.println(bar5.getSize());
				System.out.println(bar6.getSize());
				System.out.println(toolItem.getBounds());
				System.out.println(toolItem4.getBounds());
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem6.getBounds());
//				System.out.println(toolItem4.getBounds());
				assertEquals(bar.getSize(), new Point(13, 4));
//				assertEquals(bar2.getSize(), new Point(73, 23));
//				assertEquals(bar3.getSize(), new Point(211, 23));
				assertEquals(bar4.getSize(), new Point(13, 64));
				assertEquals(bar5.getSize(), new Point(17, 68));
				assertEquals(bar6.getSize(), new Point(204, 28));
				assertEquals(toolItem.getBounds(), new Rectangle(0, 0, 13, 4));
				assertEquals(toolItem4.getBounds(), new Rectangle(0, 0, 13, 0));
				assertEquals(toolItem5.getBounds(), new Rectangle(0, 0, 13, 0));
				assertEquals(toolItem6.getBounds(), new Rectangle(0, 0, 200, 24));
			}
		});
		display.dispose ();
	}

	public void testLayoutDataSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final CoolBar bar1 = new CoolBar(shell, SWT.NONE);
		bar1.setLayoutData(new GridData(120, 40));
		bar1.setEnabled(false);
		final CoolBar bar2 = new CoolBar(shell, SWT.BORDER);
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
	
	
	public void testCoolBarSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final CoolBar bar = new CoolBar(shell, SWT.NONE);
		//cmb1.setItems(new String[] {"Hello", "World"});
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(bar.getSize());
				assertEquals(bar.getSize(), new Point(64, 64));
			}
		});
		display.dispose ();
	}

	/*
	public void xtestComboPos() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		CoolBar btnImg = new CoolBar(shell, SWT.TOGGLE);
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
	*/
	
	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (CoolBarTest.class);
	}
}
