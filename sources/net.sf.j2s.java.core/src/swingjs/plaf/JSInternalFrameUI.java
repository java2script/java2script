package swingjs.plaf;

import java.awt.event.WindowEvent;

import javax.swing.JInternalFrame;

public class JSInternalFrameUI extends JSFrameUI {

	public JSInternalFrameUI() {
		super();
		isInternalFrame = true;
	}

	
	protected void frameCloserAction() {
		JInternalFrame jif = (JInternalFrame) frame;
         if(jif.isClosable())
            jif.doDefaultCloseAction();
	}


}
