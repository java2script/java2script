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
 * Text example snippet: verify input (only allow digits)
 *
 * For a list of all SWT example snippets see
 * http://www.eclipse.org/swt/snippets/
 */
import org.eclipse.swt.*;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.*;

public class TestTextVerifyText {

public static void main (String [] args) {
	Display display = new Display ();
	Shell shell = new Shell (display);
	//shell.setLayout(new FillLayout());
	Text text = new Text (shell, SWT.BORDER | SWT.V_SCROLL);
	text.setBounds (10, 10, 200, 200);
	text.addListener (SWT.Verify, new Listener () {
		public void handleEvent (Event e) {
			String string = e.text;
			char [] chars = new char [string.length ()];
			string.getChars (0, chars.length, chars, 0);
			for (int i=0; i<chars.length; i++) {
				if (!('0' <= chars [i] && chars [i] <= '9')) {
					System.out.println("false");
					e.doit = false;
					return;
				}
			}
		}
	});
	text.addListener(SWT.Modify, new Listener() {
		public void handleEvent(Event event) {
			System.out.println("Modified." + ((Text) event.widget).getText());
		}
	});
	text.addModifyListener(new ModifyListener() {
	
		public void modifyText(ModifyEvent e) {
			System.out.println("..Modified.." + e.widget);
		}
	
	});
	shell.setSize(250, 160);
	shell.open ();
	while (!shell.isDisposed()) {
		if (!display.readAndDispatch ()) display.sleep ();
	}
	display.dispose ();
}
} 
