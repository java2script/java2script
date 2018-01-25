package edu.northwestern.physics.groups.atomic.applet;

import java.awt.Graphics;
import java.awt.Point;

class RefractedIndex implements InsertText {
	private final int x[] = { 21, 23, 24, 25, 20, 21, 22, 26, 33, 34, 35, 36,
			37, 38, 39, 40, 41, 42, 21, 26, 21, 26, 21, 26, 33, 34, 35, 36, 37,
			38, 39, 40, 41, 42, 21, 26, 30, 31, 21, 26, 29, 32, 20, 21, 22, 25,
			26, 27, 32, 32, 31, 30, 32, 29, 30, 31, 32, 32 };

	private final int y[] = { 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19,
			19, 19, 19, 19, 19, 19, 20, 20, 21, 21, 22, 22, 22, 22, 22, 22, 22,
			22, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25,
			25, 25, 25, 26, 27, 28, 28, 29, 29, 29, 29, 29 };

	public Point elementAt(int i) {
		return new Point(x[i], y[i]);
	}

	public void plot(Graphics g, int xx, int yy) {
		for (int i = 0; i < x.length; i++) {
			g.drawLine(xx + x[i], yy + y[i], xx + x[i], yy + y[i]);
		}
	}

	public int size() {
		return x.length;
	}
}
