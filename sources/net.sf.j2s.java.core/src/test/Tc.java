package test;

import java.applet.Applet;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;

import java.awt.Label;
import java.awt.Panel;

import javax.swing.JApplet;
import javax.swing.JOptionPane;


public class Tc extends JApplet {
	public void init() {
		setSize(500,500);
	}
	
   public void start() {
   	Component p = this;
   	String s = "";
   	while (p != null) {
   		s += p.getClass().getName() + "\n";
   		p = p.getParent();
   	}
   	JOptionPane.showConfirmDialog(this, s, "OK", JOptionPane.OK_OPTION);
   }

}
