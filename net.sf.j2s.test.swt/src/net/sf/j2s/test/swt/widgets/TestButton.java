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
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-5-21
 */
public class TestButton {
	/**
	 * @param args
	 */
	public static void mainArrow(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
//		System.out.println(new StringBuffer().getClass().getName());
		new Button(shell, SWT.ARROW | SWT.LEFT);
		new Button(shell, SWT.ARROW | SWT.RIGHT);
		new Button(shell, SWT.ARROW | SWT.UP);
		new Button(shell, SWT.ARROW | SWT.DOWN);
		
		new Button(shell, SWT.ARROW | SWT.LEFT | SWT.FLAT);
		new Button(shell, SWT.ARROW | SWT.RIGHT | SWT.FLAT);
		new Button(shell, SWT.ARROW | SWT.UP | SWT.FLAT);
		new Button(shell, SWT.ARROW | SWT.DOWN | SWT.FLAT);
		
		new Button(shell, SWT.ARROW | SWT.LEFT).setLayoutData(new GridData(80, 50));
		new Button(shell, SWT.ARROW | SWT.RIGHT).setLayoutData(new GridData(80, 50));
		new Button(shell, SWT.ARROW | SWT.UP).setLayoutData(new GridData(80, 50));
		new Button(shell, SWT.ARROW | SWT.DOWN).setLayoutData(new GridData(80, 50));
		
		final Button btn00 = new Button(shell, SWT.ARROW | SWT.RIGHT);
		final Button btn0 = new Button(shell, SWT.ARROW | SWT.FLAT);
		final Button btn = new Button(shell, SWT.ARROW | SWT.BORDER | SWT.DOWN);
//		link.setText("Hello <a href=\"http://ognize.com/\">ognize</a> &World");
//		link.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent e) {
//				System.out.println("424234233");
//				System.out.println(link);
//				e.doit = false;
//			}
//		});
//		link.setVisible(false);
		final Button btn1 = new Button(shell, SWT.ARROW);
		btn1.setText("Hello &Wo\r\nrld");
		GridData gd = new GridData();
		gd.widthHint = 150;
		btn1.setLayoutData(gd);
		btn1.setForeground(new Color(display, 255, 0, 0));
		btn1.setBackground(new Color(display, 0, 255, 0));
		final Button btn3 = new Button(shell, SWT.ARROW | SWT.LEFT);
		btn3.setEnabled(false);
		btn3.setText("Hello &Wo\r\nrld");
		Font font = new Font(display, "Tahoma", 1, SWT.NONE);
		btn3.setFont(font);
		btn3.setLayoutData(new GridData(80, 30));
		btn3.setAlignment(SWT.DOWN);
		final Button btn4 = new Button(shell, SWT.ARROW | SWT.UP);
		btn4.setLayoutData(new GridData(80, 50));
		btn4.setAlignment(SWT.LEFT);
		final Button btn2 = new Button(shell, SWT.BORDER | SWT.TOGGLE);
		btn2.setText("Hello Worl&d");
		btn2.setLayoutData(new GridData(120, 30));
		btn2.setAlignment(SWT.CENTER);
//		link2.setForeground(new Color(display, 0, 255, 0));
//		link2.setEnabled(false);
		final SelectionAdapter selectionAdapter = new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
//				System.out.println("424234233");
				System.out.println(btn2);
//				e.doit = false;
			}
		};
		btn2.addSelectionListener(selectionAdapter);
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("************");
				print (btn0);
				print (btn);
				print (btn2);
				print (btn3);
				System.out.println(btn2.getSelection());
//				link2.setEnabled(true);
//				link.setVisible(true);
//				link2.removeSelectionListener(selectionAdapter);
			}
		});
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		font.dispose();
		display.dispose ();
	}
	public static void mainRadio(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));
		
		final Button btnImg = new Button(shell, SWT.RADIO | SWT.LEFT | SWT.BORDER);
		btnImg.setImage(imageOpen);
//		btnImg.setLayoutData(new GridData(280, 30));
		btnImg.setEnabled(false);
		
//		System.out.println(new StringBuffer().getClass().getName());
		final Button btn0 = new Button(shell, SWT.RADIO | SWT.FLAT);
		final Button btn = new Button(shell, SWT.BORDER | SWT.CHECK);
//		link.setText("Hello <a href=\"http://ognize.com/\">ognize</a> &World");
//		link.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent e) {
//				System.out.println("424234233");
//				System.out.println(link);
//				e.doit = false;
//			}
//		});
//		link.setVisible(false);
		final Button btn1 = new Button(shell, SWT.RADIO);
		btn1.setText("Hello &Wo\r\nrld");
		btn1.setForeground(new Color(display, 255, 0, 0));
		btn1.setBackground(new Color(display, 0, 255, 0));
		btn1.setEnabled(false);
		
		final Button btn3 = new Button(shell, SWT.RADIO | SWT.BORDER);
		btn3.setText("Hello &Wo\r\nrld");
		Font font = new Font(display, "Tahoma", 1, SWT.NONE);
		btn3.setFont(font);
//		btn3.setLayoutData(new GridData(80, 30));
		final Button btn2 = new Button(shell, SWT.BORDER | SWT.CHECK);
		btn2.setText("Hello Worl&d");
//		link2.setForeground(new Color(display, 0, 255, 0));
//		link2.setEnabled(false);
		final SelectionAdapter selectionAdapter = new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("424234233");
				System.out.println(btn2);
				e.doit = false;
			}
		};
		btn2.addSelectionListener(selectionAdapter);
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("************");
				print (btnImg);
				btnImg.setText("Hi, I love you");
				btnImg.setEnabled(true);
				print (btn0);
				btn0.setImage(imageOpen);
				print (btn);
				btn1.setImage(imageOpen);
				print (btn2);
				btn2.setImage(imageOpen);
				System.err.println(btn2.getText());
				print (btn3);
				btn3.setImage(imageOpen);
//				link2.setEnabled(true);
//				link.setVisible(true);
//				link2.removeSelectionListener(selectionAdapter);
				shell.layout();
			}
		});
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		font.dispose();
		imageOpen.dispose();
		display.dispose ();
	}
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));
		
		final Button btnImg = new Button(shell, SWT.TOGGLE);
		btnImg.setImage(imageOpen);
		
//		System.out.println(new StringBuffer().getClass().getName());
		final Button btn0 = new Button(shell, SWT.PUSH | SWT.FLAT);
		final Button btn = new Button(shell, SWT.BORDER);
//		link.setText("Hello <a href=\"http://ognize.com/\">ognize</a> &World");
//		link.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent e) {
//				System.out.println("424234233");
//				System.out.println(link);
//				e.doit = false;
//			}
//		});
//		link.setVisible(false);
		final Button btn1 = new Button(shell, SWT.PUSH);
		btn1.setText("Hello &Wo\r\nrld");
		btn1.setForeground(new Color(display, 255, 0, 0));
		btn1.setBackground(new Color(display, 0, 255, 0));
		final Button btn3 = new Button(shell, SWT.PUSH);
		btn3.setText("Hello &Wo\r\nrld");
		Font font = new Font(display, "Tahoma", 1, SWT.NONE);
		btn3.setFont(font);
//		btn3.setLayoutData(new GridData(80, 30));
		final Button btn2 = new Button(shell, SWT.BORDER);
		btn2.setText("Hello Worl&d");
//		link2.setForeground(new Color(display, 0, 255, 0));
//		link2.setEnabled(false);
		final SelectionAdapter selectionAdapter = new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("424234233");
				System.out.println(btn2);
				e.doit = false;
			}
		};
		btn2.addSelectionListener(selectionAdapter);
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("************");
				print (btnImg);
				print (btn0);
				print (btn);
				print (btn2);
				print (btn3);
//				link2.setEnabled(true);
//				link.setVisible(true);
//				link2.removeSelectionListener(selectionAdapter);
			}
		});
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		font.dispose();
		imageOpen.dispose();
		display.dispose ();
	}
	public static void print(Button btn) {
		System.out.println(btn.getSize());
		System.out.println(btn.getBounds());
		System.out.println(btn.getBorderWidth());
		System.out.println(btn.getLocation());
		System.out.println("..======..");
	}
}
