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
	
	public int[] getMoveCoords(int x, int y) {
//		JInternalFrame jif = (JInternalFrame) frame;    	
//        if (jif.getDesktopPane() == null) {
//        	// in another object 
//        } else if (jif.getDesktopPane().getDesktopManager() == null) {
//        	int pw = jif.getWidth();
//        	int ph = jif.getHeight();
//        	if (pw > 0 && ph > 0) {
//        		x = Math.min(Math.max(0, x), pw - 20);
//        		y = Math.min(Math.max(0, y), ph - 20);
//        	}
//        }
	
	return new int[] {x, y};
}



}
