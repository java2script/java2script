package javajs.async;


import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.File;
import java.util.function.Consumer;
import java.util.function.Function;

import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.filechooser.FileSystemView;

/**
 * A simple Asynchronous file chooser for JavaScript and Java.
 * 
 * Requires an onOK runnable; JavaScript can return notification of onCancel for
 * file reading on all platforms, maybe not for saving on all; now using window.focus.
 * 
 * @author Bob Hanson
 */

public class AsyncFileChooser extends JFileChooser implements PropertyChangeListener {

	private int optionSelected;
	private Runnable onOK, onCancel; 
	@SuppressWarnings("unused")
	private boolean isAsyncSave = true;
	private Consumer<File> whenDone;

	//	private static boolean notified; 

	public AsyncFileChooser() {
		super();
	}

	public AsyncFileChooser(File file) {
		super(file);
	}

	public AsyncFileChooser(File file, FileSystemView view) {
		super(file, view);
	}

	@Deprecated
	@Override
	public int showDialog(Component frame, String btnText) {
		// This one can come from JFileChooser - default is OPEN
		return super.showDialog(frame, btnText);
	}

	private int err() {
		try {
			throw new java.lang.IllegalAccessException("Warning! AsyncFileChooser interface bypassed!");
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return JFileChooser.ERROR_OPTION;
	}

	@Deprecated
	@Override
	public int showOpenDialog(Component frame) {
		return err();
	}

	@Override
	public int showSaveDialog(Component frame) {
		isAsyncSave  = false;
		onOK = onCancel = null;
		return super.showSaveDialog(frame);
	}

	/**
	 * 
	 * @param frame
	 * @param btnLabel "open" or "save"
	 * @param onOK
	 * @param onCancel if the dialog is onCanceled
	 */
	public void showDialog(Component frame, String btnLabel, Runnable onOK, Runnable onCancel) {
		this.onOK = onOK;
		this.onCancel = onCancel;
		process(super.showDialog(frame, btnLabel));
	}

	/**
	 * Convenience function for single-file return. 
	 * Note that in JavaScript "onCancel" is not guaranteed on all platforms, as it
	 * relies on a JavaScript window.focus event that may not work on some devices.
	 * 
	 * 
	 * @param frame
	 * @param btnLabel "open" or "save"
	 * @param whenDone will return with a File object or null
	 */
	public void showDialog(Component frame, String btnLabel, Consumer<File> whenDone) {
		this.whenDone = whenDone;
		setMultiSelectionEnabled(false);
		process(super.showDialog(frame, btnLabel));
	}

	/**
	 * 
	 * @param frame
	 * @param onOK
	 * @param onCancel must be null; JavaScript cannot capture a onCancel from a file dialog
	 */
	public void showOpenDialog(Component frame, Runnable onOK, Runnable onCancel) {
		this.onOK = onOK;
		this.onCancel = onCancel;
		process(super.showOpenDialog(frame));
	}

	/**
	 * Convenience function for single-file return. 
	 * Note that a null return is not guaranteed on all platforms, as it
	 * relies on a JavaScript window.focus event that may not work on some devices.
	 * 
	 * 
	 * @param frame
	 * @param whenDone will return with a File object or null
	 */
	public void showOpenDialog(Component frame, Consumer<File> whenDone) {
		this.whenDone = whenDone;
		setMultiSelectionEnabled(false);
		process(super.showOpenDialog(frame));
	}

	/**
	 * 
	 * This just completes the set. It is not necessary for JavaScript, because JavaScript
	 * will just throw up a simple modal OK/Cancel message anyway.
	 * 
	 * @param frame
	 * @param onOK
	 * @param onCancel must be null
	 */
	public void showSaveDialog(Component frame, Runnable onOK, Runnable onCancel) {
		this.onOK = onOK;
		this.onCancel = onCancel;
		process(super.showSaveDialog(frame));
	}

	/**
	 * 
	 * This just completes the set. It is not necessary for JavaScript, because JavaScript
	 * will just throw up a simple modal OK/Cancel message anyway.
	 * 
	 * @param frame
	 * @param whenDone
	 */
	public void showSaveDialog(Component frame, Consumer<File> whenDone) {
		this.whenDone = whenDone;
		process(super.showSaveDialog(frame));
	}

	
	/**
	 * Locate a file for input or output. Note that JavaScript will not return on onCancel for OPEN_DIALOG.
	 * 
	 * @param title       The title for the dialog
	 * @param mode        OPEN_DIALOG or SAVE_DIALOG
	 * @param processFile function to use when complete
	 */
	  public static void getFileAsync(Component parent, String title, int mode, Function<File, Void> processFile) {
		  // BH no references to this method. So changing its signature for asynchonous use
		  // And it didn't do as advertised - ran System.exit(0) if onCanceled
	    // create and display a file dialog
		AsyncFileChooser fc = new AsyncFileChooser();
		fc.setDialogTitle(title);
		Runnable after = new Runnable() {

			@Override
			public void run() {
				processFile.apply(fc.getSelectedFile());
			}
	
		};
		if (mode == JFileChooser.OPEN_DIALOG) {
			fc.showOpenDialog(parent, after, after);  
		} else {
			fc.showSaveDialog(parent, after, after);  
		}
				
	  }
	    
		/**
		 * Run yes.run() if a file doesn't exist or if the user allows it, else run no.run()
		 * @param parent
		 * @param filename
		 * @param title
		 * @param yes (approved)
		 * @param no (optional)
		 */
		public static void checkReplaceFileAsync(Component parent, File outfile, String title, Runnable yes, Runnable no) {
			if (outfile.exists()) {
				AsyncDialog.showYesNoAsync(parent,
						outfile + " exists. Replace it?", null, new ActionListener() {
		
							@Override
							public void actionPerformed(ActionEvent e) {
								switch (e.getID()) {
								case JOptionPane.YES_OPTION:
									yes.run();
									break;
								default:
									if (no != null)
										no.run();
									break;
								}
							}
		
						});
		
			} else {
				yes.run();
			}
		
		}

//	private void notifyCancel() {
//		if (!notified) {
//			System.err.println("developer note: JavaScript cannot fire a FileChooser CANCEL action");
//		}
//		notified = true;
//	}

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		switch (evt.getPropertyName()) {
		case "SelectedFile":
		case "SelectedFiles":
			
			process(optionSelected = (evt.getNewValue() == null ? CANCEL_OPTION : APPROVE_OPTION));
			break;
		}
	}

	private void process(int ret) {
		if (ret != -(-ret))
			return; // initial JavaScript return is NaN
		optionSelected = ret;
		File f = getSelectedFile();
		if (whenDone != null) {
			whenDone.accept(f);
		} else if (f == null) {
			if (onCancel != null)
				onCancel.run();
		} else {
			if (onOK != null)
				onOK.run();
		}
	}

	public int getSelectedOption() {
		return optionSelected;
	}

	public static byte[] getFileBytes(File f) {
		return /** @j2sNative f.秘bytes || */null;
	}

}
