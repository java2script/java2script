package test;

import java.applet.Applet;
import java.awt.Component;

import javax.swing.JApplet;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

class Ta extends JApplet {
	public void init() {
		System.out.println("init");
	}
   public void start() {
   	Component p = this;
   	String s = "";
   	while (p != null) {
   		s += p.getClass().getName() + "\n";
   		p = p.getParent();
   	}
//   	JFrame a = new JFrame();
//   	JOptionPane.showConfirmDialog(a, s, "OK", JOptionPane.OK_OPTION);
   }
}
