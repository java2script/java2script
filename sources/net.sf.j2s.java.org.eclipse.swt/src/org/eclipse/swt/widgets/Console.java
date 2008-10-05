package org.eclipse.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ShellAdapter;
import org.eclipse.swt.events.ShellEvent;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.Composite;

public class Console extends Shell {

	/**
	 * Launch the console
	 */
	public static void openConsole() {
		try {
			Display display = Display.getDefault();
			Console console = new Console(display, SWT.SHELL_TRIM);
			
			console.addShellListener(new ShellAdapter() {
			
				@Override
				public void shellClosed(ShellEvent e) {
					//console.setVisible(false);
					//e.doit = false;
					Element el = document.getElementById("_console_");
					if (el != null) {
						el.parentNode.removeChild(el);
						el.style.display = "none";
						el.style.fontSize = "";
						document.body.appendChild(el);
					}
				}
				
			});
			
			console.open();
			console.layout();
			while (!console.isDisposed()) {
				if (!display.readAndDispatch())
					display.sleep();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Create the shell
	 * @param display
	 * @param style
	 */
	public Console(Display display, int style) {
		super(display, style);
		createContents();
		setLayout(new FillLayout());
	}

	/**
	 * Create contents of the window
	 */
	protected void createContents() {
		setText("Console");
		setSize(500, 375);

		final Composite composite = new Composite(this, SWT.NONE);
		composite.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		//
		
		composite.handle.style.overflow = "scroll";
		
		Element el = document.getElementById("_console_");
		if (el == null) {
			el = document.createElement("DIV");
			el.id = "_console_";
			el.style.fontFamily = "monospace,Arial,sans-serif";
		} else {
			el.parentNode.removeChild(el);
			el.style.display = "";
		}
		el.style.fontSize = "10pt";
		composite.handle.appendChild(el);
	}

	@Override
	protected void checkSubclass() {
		// Disable the check that prevents subclassing of SWT components
	}

}
