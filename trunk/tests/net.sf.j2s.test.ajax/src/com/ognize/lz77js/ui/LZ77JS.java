package com.ognize.lz77js.ui;

import net.sf.j2s.ajax.SimpleRPCRequest;
import net.sf.j2s.ajax.SimpleRPCSWTRequest;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.SashForm;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import com.ognize.lz77js.LZ77JSSimpleRPCRunnable;

public class LZ77JS {

	final static String LZ77_JS_URL = "http://bl.ognize.com/lz77js/lz77js";
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		final Display display = new Display();
		final Shell shell = new Shell(display);
		//shell.setMaximized(true);
		shell.setText("LZ77 JavaScript Compressor");
		shell.setLayout(new FillLayout());

		SashForm form = new SashForm(shell, SWT.VERTICAL);
		form.setLayout(new FillLayout());

		Composite outlinePanel = new Composite(form, SWT.NONE);
		outlinePanel.setLayout(new GridLayout());
		new Label(outlinePanel, SWT.NONE).setText("JavaScript Source:");
		final Text sourceText = new Text(outlinePanel, SWT.BORDER | SWT.MULTI | SWT.V_SCROLL | SWT.H_SCROLL);
		sourceText.setLayoutData(new GridData(GridData.FILL_BOTH));
		
		Composite optionPanel = new Composite(outlinePanel, SWT.NONE);
		optionPanel.setLayout(new GridLayout(3, true));
		optionPanel.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		final Button regExpButton = new Button(optionPanel, SWT.CHECK);
		regExpButton.setSelection(true);
		regExpButton.setText("RegExp trimming before LZ77");
		regExpButton.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));

		final Button lz77HeaderButton = new Button(optionPanel, SWT.CHECK);
		lz77HeaderButton.setSelection(true);
		lz77HeaderButton.setText("Output with LZ77 decoder");
		lz77HeaderButton.setAlignment(SWT.CENTER);
		lz77HeaderButton.setLayoutData(new GridData(GridData.HORIZONTAL_ALIGN_CENTER));

		Button lz77Button = new Button(optionPanel, SWT.PUSH);
		lz77Button.setText("LZ77 Compress");
		lz77Button.setAlignment(SWT.RIGHT);
		lz77Button.setLayoutData(new GridData(GridData.HORIZONTAL_ALIGN_END));

		final Composite contentPanel = new Composite(form, SWT.NONE);
		contentPanel.setLayout(new GridLayout());
		new Label(contentPanel, SWT.NONE).setText("LZ77 Compressed JavaScript:");
		final Text resultText = new Text(contentPanel, SWT.BORDER | SWT.MULTI | SWT.V_SCROLL | SWT.H_SCROLL);
		resultText.setLayoutData(new GridData(GridData.FILL_BOTH));
		
		final Label ratioLabel = new Label(contentPanel, SWT.BORDER);
		ratioLabel.setText("Input source JavaScript and then press \"LZ77 Compress\" button.");
		ratioLabel.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));

		form.setWeights(new int[] { 68, 32 });
		
		lz77Button.addSelectionListener(new SelectionAdapter () {
			public void widgetSelected(SelectionEvent e) {
				String jsContent = sourceText.getText();
				String trimJS = jsContent.trim();
				if (trimJS.length() == 0) {
					MessageBox messageBox = new MessageBox(shell, SWT.RESIZE | SWT.ICON_INFORMATION);
					messageBox.setMessage("Source JavaScript can not be empty!");
					messageBox.open();
				} else if (trimJS.length() < 832 * 4 / 3) {
					MessageBox messageBox = new MessageBox(shell, SWT.RESIZE | SWT.ICON_INFORMATION);
					messageBox.setMessage("It's unnecessary to compress raw source that is less than 1k.");
					messageBox.open();
				} else {
					ratioLabel.setText("Start JavaScript lz77 compressing to server, please wait ...");
					/*
					 * Local Java Thread mode is already the default mode for Java client
					 */
					SimpleRPCRequest.switchToLocalJavaThreadMode();
					/*
					 * AJAX mode is only mode for Java2Script client.
					 * You can uncomment the follow line to call a LZ77JS RPC of bl.ognize.com.
					 * In JavaScript mode, you should modify LZ77JSSimpleRPCRunnable#url so there
					 * is no cross site script for XMLHttpRequest.
					 */ 
					//AJAXServletRequest.switchToAJAXMode();
					SimpleRPCSWTRequest.swtRequest(new LZ77JSSimpleRPCRunnable() {
						public void ajaxIn() {
							jsContent = sourceText.getText();
							toRegExpCompress = regExpButton.getSelection();
							addLZ77Header = lz77HeaderButton.getSelection();
						}
						
						public void ajaxOut() {
							resultText.setText(result);
							ratioLabel.setText("Compressed Ratio: " + result.length() + " / " + sourceText.getText().length() + " = " + (100.0 * result.length() / sourceText.getText().length()) + "%");
						}
						
					});
				}
			}
		});

		shell.open();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
		display.dispose();
	}

}
