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
import org.eclipse.swt.events.ControlEvent;
import org.eclipse.swt.events.ControlListener;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-10-16
 */
public class TestNestedShells {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell (display);
		shell.setText ("hi");
		shell.setSize(210, 120);
		shell.open ();
		final Shell shell2 = new Shell(shell);
		shell2.setSize(110, 60);
		shell2.open();
		shell.addControlListener(new ControlListener() {
			int lastX, lastY;
			public void controlResized(ControlEvent e) {
			// TODO Auto-generated method stub
			}
			public void controlMoved(ControlEvent e) {
				Point pt = shell.getLocation();
				Point pt2 = shell2.getLocation();
				shell2.setLocation(pt2.x + pt.x - lastX, pt2.y + pt.y - lastY);
				lastX = pt.x;
				lastY = pt.y;
			}
		});
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}
}
