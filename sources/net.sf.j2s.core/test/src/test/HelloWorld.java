package test;

import java.awt.BorderLayout;

import javax.swing.JApplet;
import javax.swing.JLabel;

public class HelloWorld extends JApplet {

	
	public HelloWorld() {
		setName("Hello World");		
	}

	@Override
	public void init() {
		JLabel label = new JLabel("Hello World");
		setLayout(new BorderLayout());
		add(label);
	}

	@Override
	public String getAppletInfo() {
		return "A simple Hello World applet";
	}

}