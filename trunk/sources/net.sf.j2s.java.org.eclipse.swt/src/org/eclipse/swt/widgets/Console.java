package org.eclipse.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ShellAdapter;
import org.eclipse.swt.events.ShellEvent;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;

public class Console extends Shell {

	static Console console;
	
	static Rectangle lastBounds;
	
	static Point scrollOffset;

	Composite consoleWrapper;
	
	
	/**
	 * Launch the console
	 */
	public static void openConsole() {
		if (console != null && !console.isDisposed()) {
			console.setMinimized(false);
			console.setVisible(true);
			console.bringToTop();
			return;
		}
		try {
			Display display = Display.getDefault();
			console = new Console(display, SWT.SHELL_TRIM);
			
			console.addShellListener(new ShellAdapter() {
			
				public void shellClosed(ShellEvent e) {
					//console.setVisible(false);
					//e.doit = false;
					lastBounds = console.getBounds();
					Element wrapperEl = console.consoleWrapper.handle;
					scrollOffset = new Point(wrapperEl.scrollLeft, wrapperEl.scrollTop);
					Element el = document.getElementById("_console_");
					if (el != null) {
						el.parentNode.removeChild(el);
						if (OS.isIE) {
							el.style.display = "block";
							el.style.position = "absolute";
							el.style.width = "200px";
							el.style.height = "200px";
							el.style.left = "-400px";
							el.style.top = "-400px";
							el.style.overflow = "hidden";
						} else {
							el.style.display = "none";
						}
						el.style.fontSize = "";
						document.body.appendChild(el);
					}
					console = null;
				}
				
			});
			
			console.open();
			if (lastBounds != null) {
				console.setBounds(lastBounds);
			} else {
				console.pack();
			}
			console.layout();
			if (scrollOffset != null) {
				// Wait 50ms, so console shell may complete its layout
				console.getDisplay().timerExec(50, new Runnable() {
				
					public void run() {
						Element wrapperEl = console.consoleWrapper.handle;
						wrapperEl.scrollLeft = scrollOffset.x;
						wrapperEl.scrollTop = scrollOffset.y;
					}
				
				});
			}
			while (!console.isDisposed()) {
				if (!display.readAndDispatch())
					display.sleep();
			}
			if (display.shortcutBar == null || display.shortcutBar.shortcutCount == 0) {
				display.dispose();
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
		GridLayout gridLayout = new GridLayout();
		gridLayout.marginWidth = 0;
		gridLayout.marginHeight = 0;
		gridLayout.horizontalSpacing = 0;
		gridLayout.verticalSpacing = 0;
		setLayout(gridLayout);
	}

	/**
	 * Create contents of the window
	 */
	protected void createContents() {
		setText("Console");
		this.shellIcon.className = "shell-title-icon shell-title-icon-console";
		consoleWrapper = new Composite(this, SWT.NONE);
		consoleWrapper.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		//
		String str = "0123456789";
		str += str; // 20
		str += str; // 40
		str += str; // 80
		Point defaultSize = OS.getStringStyledSize(str, null, "font-size:10pt;font-family:monospace,Arial,sans-serif;");
		
		GridData gridData = new GridData(GridData.FILL_BOTH);
		gridData.widthHint = defaultSize.x + OS.getScrollBarWidth();
		gridData.heightHint = defaultSize.y * 25 + OS.getScrollBarHeight();
		consoleWrapper.setLayoutData(gridData);

		consoleWrapper.handle.style.overflow = "scroll";
		consoleWrapper.handle.style.backgroundColor = "black";
		consoleWrapper.handle.style.color = "white";
		
		Element el = document.getElementById("_console_");
		if (el == null) {
			el = document.createElement("DIV");
			el.id = "_console_";
			el.style.fontFamily = "monospace,Arial,sans-serif";
		} else {
			el.parentNode.removeChild(el);
			el.style.display = "";
			if (OS.isIE) {
				el.style.position = "";
				el.style.width = "";
				el.style.height = "";
				el.style.left = "";
				el.style.top = "";
				el.style.overflow = "";
			}
		}
		el.style.fontSize = "10pt";
		consoleWrapper.handle.appendChild(el);
	}

	protected void checkSubclass() {
		// Disable the check that prevents subclassing of SWT components
	}

}
