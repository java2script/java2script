package com.falstad.circuit;

import java.awt.Event;

import java.awt.Dialog;
import java.awt.TextArea;

/**
 * 
 * @author Bob Hanson
 * 
 */
class ImportExportDialogSwingJS extends Dialog implements ImportExportDialog {
	private CirSim cframe;
	private TextArea text;
	private Action type;

	ImportExportDialogSwingJS(CirSim f, Action type) {
		super(f, (type == Action.EXPORT) ? "Export" : "Import", false);
		cframe = f;
		this.type = type;
		text = new TextArea("", 10, 60);
		// we don't really create this dialog for a SwingJS import or export
	}

	@Override
	public void setDump(String dump) {
		text.setText(dump);
	}

	private static String lastName = "circuit.txt";

	@SuppressWarnings("unused")
	@Override
	public void execute() {
		if (type == Action.IMPORT) {
			/**
			 * @j2sNative
			 * 
			 *            swingjs.JSToolkit.getFileFromDialog(this, "string");
			 */
			{
			}
		} else {
			String data = text.getText();
			String mimeType = "text/plain";
			String encoding = null;
			String fileName = null;
			String name = lastName;
			/**
			 * @j2sNative
			 * 
			 *            fileName = prompt("Enter a file name", name); fileName &&
			 *            swingjs.JSToolkit.saveFile(fileName, data, mimeType,
			 *            encoding);
			 */
			{
			}
		}
		dispose();
		return;
	}

	// @Override
	public void handleFileLoaded(Object data, String fileName) {
		// SwingJS asynchronous return from FileReader
		if (fileName == null)
			return;
		lastName = fileName;
		try {
			cframe.readSetup((String) data);
		} finally {
			dispose();
		}
	}

	@Override
	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			cframe.main.requestFocus();
			setVisible(false);
			cframe.impDialog = null;
			return true;
		}
		return super.handleEvent(ev);
	}

}
