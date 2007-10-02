package net.sf.j2s.test.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

public class TestScrollBar extends Shell {

	private Composite composite;

	/**
	 * Launch the application
	 * @param args
	 */
	public static void main(String args[]) {
		try {
			Display display = Display.getDefault();
			TestScrollBar shell = new TestScrollBar(display,
					SWT.SHELL_TRIM);
			shell.open();
			shell.layout();
			while (!shell.isDisposed()) {
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
	public TestScrollBar(Display display, int style) {
		super(display, style);
		createContents();
		setLayout(new FillLayout());
	}

	/**
	 * Create contents of the window
	 */
	protected void createContents() {
		setText("SWT Application");
		setSize(500, 375);

		composite = new Composite(this, SWT.NONE);
		GridLayout gridLayout = new GridLayout();
		gridLayout.horizontalSpacing = 0;
		gridLayout.numColumns = 2;
		composite.setLayout(gridLayout);
		composite.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));

		Composite composite_1 = new Composite(composite, SWT.V_SCROLL);
		composite_1.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		composite_1.setLayout(new GridLayout());
		
		composite_1 = new Composite(composite, SWT.H_SCROLL);
		composite_1.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		composite_1.setLayout(new GridLayout());
		
		final Composite composite_2 = new Composite(composite, SWT.H_SCROLL | SWT.V_SCROLL);
		composite_2.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		composite_2.setLayout(new FillLayout());
		new Button(composite_2, SWT.PUSH).setText("Hello World");
		composite_2.getVerticalBar().addSelectionListener(new SelectionAdapter() {
		
			public void widgetSelected(SelectionEvent e) {
				System.out.println(composite_2.getVerticalBar().getSelection());
			}
		
		});
		
		composite_2.getVerticalBar().setSelection(80);
		//composite_2.getHorizontalBar().setSelection(80);
		composite_2.getHorizontalBar().addSelectionListener(new SelectionAdapter() {
			
			public void widgetSelected(SelectionEvent e) {
				System.out.println(composite_2.getHorizontalBar().getSelection());
			}
			
		});
		
		composite_2.getHorizontalBar().setMinimum(20);
		
		composite_2.getHorizontalBar().setMaximum(40);
	}

	protected void checkSubclass() {
		// Disable the check that prevents subclassing of SWT components
	}
}
