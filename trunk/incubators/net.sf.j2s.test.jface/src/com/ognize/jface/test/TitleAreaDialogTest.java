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

package com.ognize.jface.test;

import java.io.File;

import org.eclipse.jface.dialogs.TitleAreaDialog;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

import com.ognize.jface.async.AsyncWindowProxy;
import com.ognize.jface.async.AsyncWindowRunnable;

/**
 * @author josson smith
 *
 * 2006-4-28
 */
public class TitleAreaDialogTest {
	/**
	 * 
	 * @param path
	 * @return
	 *
	 * @j2sInvokeServer return j2$Invoke(path); 
	 */
	public static String[] getServerFileList(String path) {
		return new File(path).list();
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		/**
		 * @j2sDebug window.defaultWindowLeft = 200;
		 */{}
		final Display display = new Display();
		final Shell shell = new Shell(display);
		shell.setText("Test TitleAreaDialog");
		TitleAreaDialog dialog = new MyTitleAreaDialog(shell);
		dialog.setTitleAreaColor(new RGB(0xcc, 0xdd, 0xee));
        dialog.setBlockOnOpen(false);
        System.out.println("Hi...");
		//dialog.open();
        System.out.println("Hello...");
        //dialog.getShell().setImage(new Image(display, "j2slib/images/default.gif"));
//		dialog.setTitle("hello");
//		dialog.setMessage("Hello JFace World");
		//dialog.
		/**
		 * @j2sNatives
		 */
		{
		AsyncWindowProxy.open(dialog, new AsyncWindowRunnable() {
			public void run() {
				int ret = getWindow().getReturnCode();
				System.out.println("Hello!" + ret);
				System.out.println("Hello!" + getReturnCode());
//				display.dispose();
//				shell.dispose();
//				Shell shell = new Shell(display);
//				shell.setText("Test TitleAreaDialog");
				TitleAreaDialog dialog = new MyTitleAreaDialog(new Shell());
		        dialog.setBlockOnOpen(false);
				//dialog.open();
				AsyncWindowProxy.open(dialog, new AsyncWindowRunnable() {
					public void run() {
						System.out.println("World!");
					}
				});
			}
		});
		}
		shell.open ();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();

	}

}
