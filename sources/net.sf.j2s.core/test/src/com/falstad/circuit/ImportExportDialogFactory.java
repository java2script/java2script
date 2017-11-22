package com.falstad.circuit;

import javajs.J2SIgnoreImport;

@J2SIgnoreImport({ImportExportClipboardDialog.class, ImportExportFileDialog.class})
public class ImportExportDialogFactory {
	public static ImportExportDialog Create(CirSim f,
			ImportExportDialog.Action type) {

		boolean isJS = false;
		/**
		 * @j2sNative
		 * 
		 *            isJS = true;
		 */
		{
		}

		if (isJS) {
			return new ImportExportDialogSwingJS(f, type);
		} else if (f.applet != null) {
			/*
			 * try { return new ImportExportAppletDialog(f, type); } catch (Exception
			 * e) { return new ImportExportClipboardDialog(f, type); }
			 */
			return new ImportExportClipboardDialog(f, type);
		} else {
			return new ImportExportFileDialog(f, type);
		}
	}
}
