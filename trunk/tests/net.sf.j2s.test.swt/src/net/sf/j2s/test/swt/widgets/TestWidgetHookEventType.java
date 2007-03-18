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
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.KeyListener;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.MouseListener;
import org.eclipse.swt.events.MouseMoveListener;
import org.eclipse.swt.events.MouseTrackListener;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-5-15
 */
public class TestWidgetHookEventType {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setSize(200, 150);
		shell.setLayout(new FillLayout());
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Hello");
		button.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
				System.out.println("default");
			}
			public void widgetSelected(SelectionEvent e) {
				System.out.println("selected");
			}
		});
		/*
		button.addMouseListener(new MouseListener() {
			public void mouseUp(MouseEvent e) {
				System.out.println("up");
			}
			public void mouseDown(MouseEvent e) {
				System.out.println("down");
			}
			public void mouseDoubleClick(MouseEvent e) {
				System.out.println("double click");
			}
		});
		button.addKeyListener(new KeyListener() {
			public void keyReleased(KeyEvent e) {
				System.out.println("released");
			}
			public void keyPressed(KeyEvent e) {
				System.out.println("pressed");
			}
		});
		button.addMouseMoveListener(new MouseMoveListener() {
			public void mouseMove(MouseEvent e) {
				System.out.println("moving");
			}
		});
		button.addMouseTrackListener(new MouseTrackListener() {
			public void mouseHover(MouseEvent e) {
				System.out.println("hovering");
			}
			public void mouseExit(MouseEvent e) {
				System.out.println("exited");
			}
			public void mouseEnter(MouseEvent e) {
				System.out.println("entered");
			}
		});
		*/
		button.addListener(SWT.DragDetect, new Listener() {
			public void handleEvent(Event event) {
				System.out.println("dragging");
				event.doit = true;
			}
		});
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}

}
