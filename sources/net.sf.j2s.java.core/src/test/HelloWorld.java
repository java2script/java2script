package test;

import java.awt.Font;
import java.awt.Label;

import javax.swing.JApplet;

public class HelloWorld extends JApplet {
	
	@Override
	public void init() {

		Label label = new Label("Hello, World!");
		label.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 32));
		label.setAlignment(Label.CENTER);
		add(label);

	}
	
}


