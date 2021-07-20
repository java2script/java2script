package swingjs.a2s;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.LayoutManager;

import javax.swing.JComponent;
import javax.swing.JPanel;

public class Panel extends JPanel {

	public void isAWT() {}
	public void isAWTContainer() {}

	public Panel() {
		this(new FlowLayout());
	} 

	public Panel(LayoutManager layout) {
		super(layout);
		subclassSetup();
		setBackground(null);
		super.setOpaque(false);
		// next two lines are in case a panel is painted
		// in a way that bypasses its paint() method, as for Canvas
		// See _mpQuaZ_Applets_ResistorApplet_bastel.htm
		
		秘setPaintsSelf(PAINTS_SELF_ALWAYS);
		秘paintClass = 秘updateClass = /**@j2sNative C$ || */null;
		A2SContainer.fixAWTPaint(this, JComponent.class);
	}

	protected void subclassSetup() {
		// JApplet startup
	}

	@Override
	public void setBackground(Color c) {
		super.setBackground(c);
		super.setOpaque(c != null);
	}


}
