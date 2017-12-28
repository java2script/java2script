package swingjs.plaf;

import javax.swing.JComponent;

public class JSColorChooserUI extends JSDialogUI {


	public JSColorChooserUI() {
		z = frameZ + 500;
		isFrame = true;
		isDialog = true;
		defaultWidth = 300;
		defaultHeight = 300;
		setDoc();
	}

	@Override
	public void installUI(JComponent jc) {
		super.installUI(jc);
		// LookAndFeel.installColors(c,
		// "Frame.background",
		// "Frame.foreground");
	}

	@Override
	public void uninstallUI(JComponent jc) {
	}

}
