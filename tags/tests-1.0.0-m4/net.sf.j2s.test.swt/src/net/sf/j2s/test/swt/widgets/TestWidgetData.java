/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.test.swt.widgets;

import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author josson smith
 *
 * 2006-5-15
 */
public class TestWidgetData {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setData("Hello");
		shell.setData("name", "josson");
		shell.setData("age", "25");
		System.out.println(shell.getData());
		System.out.println(shell.getData("name"));
		System.out.println(shell.getData("age"));
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}

//		shell.dispose();
		display.dispose ();
	}

}
