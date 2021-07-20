package test;

import java.awt.BorderLayout;

import javax.swing.BoxLayout;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;

public class Test_Applet_3 extends JApplet {


	public Test_Applet_3() {
		setName("Test_2");		
	}

	@Override
	public void init() {
		setLayout(new BorderLayout());
		JMenuBar mb = new JMenuBar();
		mb.add(new JMenuItem("ok"));
		mb.add(new JMenu("menu"));
		setJMenuBar(mb);
		JPanel p = new JPanel();
		p.setLayout(new BoxLayout(p, BoxLayout.LINE_AXIS));
		p.add(new JButton("test1"));
		p.add(new JButton("test2"));
		add(p, BorderLayout.SOUTH);
	}

}