package edu.northwestern.physics.groups.atomic.applet;

import java.awt.Color;
import java.awt.GridLayout;
import a2s.Label;
import a2s.Panel;

public class Banner extends Panel {

	private static final long serialVersionUID = 1L;

	public Banner(int n, int m) {
		final Color darkMagenta = new Color(150, 0, 150);
		setBackground(darkMagenta);
		setLayout(new GridLayout(n, m, 40, -5)); /* nr,nc, vg, hg */
	}

	public Banner(String name) {
		final Color darkMagenta = new Color(150, 0, 150);
		setBackground(darkMagenta);
		setLayout(new GridLayout(2, 2, 40, -5));
		setForeground(Color.white);
		add(new Label("Department of Physics and Astronomy"){
			{
				setForeground(Color.white);
			}
			
		});
		add(new Label("Virtual Interactive Demonstration"){
			{
				setForeground(Color.white);
			}
			
		});
		add(new Label("Northwestern University"){
			{
				setForeground(Color.white);
			}
			
		});
		add(new Label(name){
			{
				setForeground(Color.white);
			}
			
		});
	}
}
