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
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.program.Program;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

/**
 * @author zhou renjian
 *
 * 2006-5-21
 */
public class TestLink {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		/*
//		System.out.println(new StringBuffer().getClass().getName());
		final Link link = new Link(shell, SWT.BORDER);
		link.setText("Hello <a href=\"http://ognize.com/\">ognize</a> &World");
		link.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("424234233");
				System.out.println(link);
				e.doit = false;
			}
		});
		link.setVisible(false);
		final Link link2 = new Link(shell, SWT.BORDER);
		link2.setText("Hello <a href=\"http://ognize.com/j2s/\">o&&\r\ngni<br/>ze</a> \r\n &Great <a href=\"http://google.com\">&Worl&d</a>");
//		link2.setForeground(new Color(display, 0, 255, 0));
//		link2.setEnabled(false);
		final SelectionAdapter selectionAdapter = new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("424234233");
				System.out.println(link2);
				e.doit = false;
			}
		};
		link2.addSelectionListener(selectionAdapter);
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("************");
				print (link);
				print (link2);
				link2.setEnabled(true);
				link.setVisible(true);
				link2.removeSelectionListener(selectionAdapter);
			}
		});
		*/
		
		Composite composite = new Composite(shell, SWT.NONE);
		GridLayout layout = new GridLayout();
		composite.setLayout(layout);
		GridData data = new GridData(GridData.FILL);
		data.grabExcessHorizontalSpace = true;
		composite.setLayoutData(data);

			Label label = new Label(composite, SWT.NONE);
			label.setText("It's detected that your JDT Core is not enhanced yet.");
			label.setForeground(new Color(null, 255, 0, 0));
			
			Label label2 = new Label(composite, SWT.NONE);
			label2.setText("JDT Core must be enhanced before Java2Script builder can take into effect.");

			Link link = new Link(composite, SWT.NONE);
			link.setText("<a href=\"http://j2s.sourceforge.net/docs/jdt-core-enhance.html\">Why must JDT Core be enhanced?</a>");

			createLabel(composite, "Maybe this is the first time you install Java2Script plugin. To install Java2Script, do as following:");
			createLabel(composite, "1. Click the following \"Enhance JDT Core\" button, and then exit Eclipse platform. ");
			createLabel(composite, "2. Copy the enhanced \"org.eclipse.jdt.core_3.*.*.jar\" file and overwrite original " +
					"jar file in \"plugins\" folder (You must exit Eclipse first, as Eclipse is locking the jar file).");
			createLabel(composite, "3. Restart the Eclipse you will get the true Java2Script Builder property page.");

			//new Label(composite, SWT.NONE);
			Label seperator0 = new Label(composite, SWT.SEPARATOR | SWT.HORIZONTAL);
			seperator0.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));

			final Button btnEnhance = new Button(composite, SWT.PUSH);
			btnEnhance.setText("Enhance JDT Core");
			GridData gdBtn = new GridData(GridData.BEGINNING);
			gdBtn.widthHint = 216;
			gdBtn.horizontalIndent = 6;
			gdBtn.verticalIndent = 8;
			btnEnhance.setLayoutData(gdBtn);
			new Label(composite, SWT.NONE);
			
			Composite pathComp = new Composite(composite, SWT.NONE);
			pathComp.setLayout(new GridLayout(2, false));
			GridData gd = new GridData(GridData.FILL_HORIZONTAL);
			gd.grabExcessHorizontalSpace = true;
			pathComp.setLayoutData(gd);
			
			final Label label3 = new Label(pathComp, SWT.NONE);
			label3.setText("Enhanced Jar Location:");
			final Text textPath = new Text(pathComp, SWT.NONE);
			String base = "S:/eclipse-3.1.1/";
			textPath.setText(base);
			textPath.setEditable(false);
			GridData gd2 = new GridData(GridData.FILL_HORIZONTAL);
			gd2.widthHint = 240;
			textPath.setLayoutData(gd2);
			final Button btnOpen = new Button(pathComp, SWT.PUSH);
			GridData gd3Btn = new GridData(GridData.BEGINNING);
			gd3Btn.widthHint = 216;
			gd3Btn.horizontalSpan = 2;
			//gd3Btn.horizontalIndent = 6;
			btnOpen.setLayoutData(gd3Btn);
			btnOpen.setText("Open Location with External Explorer");
			//btnOpen.setLayoutData(new GridData(GridData.BEGINNING, GridData.BEGINNING, false, false, 2, 1));
			btnOpen.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
					Program.launch(textPath.getText());
				}
			});
			
			final Label label4 = createLabel(composite, "Before you can overwrite the JDT Core jar, you have to exit Ecipse platform. After replacing with the enhanced jar, you can restart the Eclipse.");

			final Button btnRestart = new Button(composite, SWT.PUSH);
			btnRestart.setText("Exit Eclipse Now");
			GridData gd2Btn = new GridData(GridData.BEGINNING);
			gd2Btn.widthHint = 216;
			gd2Btn.horizontalIndent = 6;
			btnRestart.setLayoutData(gd2Btn);
			//btnRestart.setLayoutData(new GridData(GridData.END, GridData.BEGINNING, true, false));
			btnRestart.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
			        //PlatformUI.getWorkbench().close();
				}
			});
			label3.setEnabled(false);
			textPath.setEnabled(false);
			btnOpen.setEnabled(false);
			label4.setEnabled(false);
			btnRestart.setEnabled(false);
			
			btnEnhance.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
					label4.setEnabled(true);
					btnRestart.setEnabled(true);
					//btnEnhance.setEnabled(false);
					label3.setEnabled(true);
					textPath.setEnabled(true);
					btnOpen.setEnabled(true);
					btnEnhance.setText("Enhance JDT Core Again");
				}
			});
			
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}

	private static Label createLabel(Composite comp, String label) {
		Label lbl = new Label(comp, SWT.WRAP);
		lbl.setText(label);
		GridData gd = new GridData(GridData.FILL_HORIZONTAL);
		gd.widthHint = 330;
		lbl.setLayoutData(gd);
		return lbl;
	}
	public static void print(Link link) {
		System.out.println(link.getSize());
		System.out.println(link.getBounds());
		System.out.println(link.getBorderWidth());
		System.out.println(link.getLocation());
		System.out.println(link.getFont().getFontData()[0].height);
		System.out.println("..======..");
	}
}
