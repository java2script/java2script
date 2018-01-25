package edu.northwestern.physics.groups.atomic.applet;

//package snelllaw;

import java.awt.Graphics;
import java.awt.Point;

public interface InsertText {
	public Point elementAt(int i);

	public void plot(Graphics g, int x, int y);

	public int size();
}
