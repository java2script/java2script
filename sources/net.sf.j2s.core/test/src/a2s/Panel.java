package a2s;

import java.awt.Component;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.EventListener;

import javax.swing.AbstractButton;
import javax.swing.JComboBox;
import javax.swing.JPanel;

public class Panel extends JPanel {

	public Panel(LayoutManager layout) {
		super(layout);
	}

	public Panel() {
		super();
	}

	public Component add(Component comp) {
		super.add(comp);
		return A2SEvent.addComponent((EventListener) this.getTopLevelAncestor(), comp);
	}

}
