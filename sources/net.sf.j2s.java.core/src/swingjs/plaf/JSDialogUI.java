package swingjs.plaf;

import java.util.List;

import java.awt.Window;
import java.awt.peer.DialogPeer;

import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.LookAndFeel;


public class JSDialogUI extends JSFrameUI implements DialogPeer {

	//
	// a frame without min/max buttons
	
	// uses Frame.updateDOMNode()
	
	public JSDialogUI() {
		z = frameZ + 500;
		zModal = z - 1;
		isFrame = true;
		isDialog = true;
		defaultWidth = 500;
		defaultHeight = 300;
		setDoc();
	}

		@Override
		public void installUI(JComponent jc) {
			frame = (JFrame) c;
			isModal = ((JDialog) c).isModal();
			LookAndFeel.installColors(jc,
			   "Frame.background",
			   "Frame.foreground");
		}
	
	@Override
	public void uninstallUI(JComponent jc) {
	}

	@Override
	public void blockWindows(List<Window> windows) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
		if (b) {
			setComponentFocus();
		}
		
	}

}
