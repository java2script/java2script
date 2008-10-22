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

package org.eclipse.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;

/**
 * 
 * @author Zhou Renjian
 * 
 * 2007-6-20
 */
public class HTMLSource {

	public void exportSource(Shell objShell, boolean onlyContent) {
		final Shell shell = new Shell(objShell.display, SWT.SHELL_TRIM | SWT.APPLICATION_MODAL);
//		shell.setLayout(new FillLayout());
		String c = null; // always be "b" for "@j2sNative/Src"
		if (onlyContent) {
			shell.setText("Shell Content's HTML Source");
			c = objShell.contentHandle.innerHTML;
		} else {
			shell.setText("Shell's HTML Source");
			c = objShell.handle.innerHTML;
		}
		//b.replaceAll("(<\\/?)(\\w+)(\\s|>)", "$0$1$2");
		if (OS.isIE)
		/**
		 * @j2sNative
	c = c.replace (/(<\/?)(\w+)(\s|>)/ig, function ($0, $1, $2, $3) {
		return $1 + $2.toLowerCase () + $3;
	}).replace (/(style\s*=\s*")([^"]+)(")/ig, function ($0, $1, $2, $3) {
		if (!((/;$/).test ($2))) {
			$2 += ";";
		}
		return "style=\"" + $2.toLowerCase ().replace (/(:|;)\s+/g, "$1") + "\"";
	}).replace (/(\s+(\w+)\s*=\s*)([^\"\s>]+)(\s|>)/ig, function ($0, $1, $2, $3, $4) {
		return " " + $2 + "=\"" + $3 + "\"" + $4;
	//}).replace (/\s+(\w+)(\s|>)/ig, function ($0, $1, $2) {
//		$1 = $1.toLowerCase ();
//		return " " + $1 + "=\"" + $1 + "\"" + $2;
	});
		 */ {} else
		/**
		 * @j2sNative
	c = c.replace (/(style\s*=\s*")([^"]+)(")/ig, function ($0, $1, $2, $3) {
		return "style=\"" + $2.replace (/(:|;)\s+/g, "$1") + "\"";
	});
		 */ {}
		/**
		 * @j2sNative
	c = c.replace (/(\sclass\s*=\s*)"([^"]*)"(\s|>)/ig, function ($0, $1, $2, $3) {
		$2 = $2.replace (/\s\s+/g, ' ').replace (/^\s+/, '').replace (/\s+$/g, '');
		if ($2.length == 0) {
			if ($3 != ">") {
				return $3;
			} else {
				return ">";
			}
		} else {
			return " class=\"" + $2 + "\"" + $3;
		}
	});
		 */ {}
//		int length = innerHTML.length();
//		if (length < 200) {
//			length = 200;
//		} else if (length > 1800) {
//			length = 1800;
//		}
//		length = (length - 200) / 400;
//		shell.setSize(480 + 80 * length, 280 + 50 * length);
//		Composite composite = new Composite(shell, SWT.NONE);
//		composite.setLayout(new GridLayout());
		shell.setLayout(new GridLayout());
		Text text = new Text(shell, SWT.BORDER | SWT.MULTI | SWT.READ_ONLY | SWT.V_SCROLL);
		Font font = null;
		/**
	     * @j2sNative
	     * font = new $wt.graphics.Font ($wt.widgets.Display.getCurrent (),  new $wt.graphics.FontData ("Courier New", 10, 0));
	     */ {}
	    text.setFont(font);
		GridData gd = new GridData(GridData.FILL_BOTH);
		
		String str = "0123456789";
		str += str; // 20
		str += str; // 40
		str += str; // 80
		Point defaultSize = OS.getStringStyledSize(str, null, "font-size:10pt;font-family:monospace,Arial,sans-serif;");
		
		gd.widthHint = defaultSize.x/* + OS.getScrollBarWidth()*/;
		gd.heightHint = defaultSize.y * 25/* + OS.getScrollBarHeight()*/;
		text.setLayoutData(gd);
		Rectangle rect = objShell.getClientArea();
		String html = null;
		if (onlyContent) {
			html = "<div class=\"shell-content\" style=\"" + "width:"
					+ rect.width + "px;height:" + rect.height + "px;\">" + c
					+ "</div>";
		} else {
			String cssText = objShell.handle.style.cssText;
			if (cssText != null && cssText.trim().length() != 0) 
			/**
			 * @j2sNative
			 * cssText = cssText.replace (/([;\s]*)(top|left|right|bottom)\s*:\s*[^;"']*([;"'])/i, "$3").replace (/([;\s]*)(top|left|right|bottom)\s*:\s*[^;"']*([;"'])/i, "$3");
			 */ {}
			html = "<div class=\"" + objShell.handle.className + "\"" +
					((cssText != null && cssText.trim().length() != 0) ? 
							" style=\"" + cssText + "\"" : "") +
									">" + c + "</div>";
		}
		text.setText(html);
		new Label(shell, SWT.HORIZONTAL | SWT.SEPARATOR)
				.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		Button button = new Button(shell, SWT.PUSH);
		button.setText("&OK");
		GridData gridData = new GridData(GridData.HORIZONTAL_ALIGN_END);
		gridData.widthHint = 80;
		button.setLayoutData(gridData);
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				shell.close();
			}
		});
		shell.pack();
		shell.open();
		while (!shell.isDisposed ()) {
			if (!objShell.display.readAndDispatch ()) objShell.display.sleep ();
		}
	}
}
