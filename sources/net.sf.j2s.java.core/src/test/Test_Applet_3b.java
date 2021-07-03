package test;

import java.awt.BorderLayout;

import javax.swing.BoxLayout;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JPanel;

public class Test_Applet_3b extends JApplet {


	public Test_Applet_3b() {
		setName("Test_2");		
	}

	@Override
	public void init() {
		setLayout(new BorderLayout());
		JPanel p = new JPanel();
		p.setLayout(new BoxLayout(p, BoxLayout.LINE_AXIS));
		p.add(new JButton("test1"));
		p.add(new JButton("test2"));
		add(p, BorderLayout.SOUTH);
	}

}