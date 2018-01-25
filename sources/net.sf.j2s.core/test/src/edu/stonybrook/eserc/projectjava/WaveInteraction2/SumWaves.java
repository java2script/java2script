package edu.stonybrook.eserc.projectjava.WaveInteraction2;

import java.awt.Graphics;
import java.awt.Point;
// Author: Konstantin Lukin
// Modified for 3 waves by Glenn A. Richard - May, 2002
// Modified for SwingJS by Bob Hanson - Jan, 2017

public class SumWaves {
	SineWave w1;
	SineWave w2;
	SineWave w3;

	public SumWaves(SineWave w1, SineWave w2, SineWave w3) {
		this.w1 = w1;
		this.w2 = w2;
		this.w3 = w3;
	}

	public void setWave1(SineWave sine1) {
		this.w1 = sine1;
	}

	public void setWave2(SineWave sine2) {
		this.w2 = sine2;
	}

	public void setWave3(SineWave sine3) {
		this.w3 = sine3;
	}

	public int getY(int x) {
		return w1.getY(x) + w2.getY(x) + w3.getY(x);
	}

	public void draw(Graphics g, int x, int y, int width) {
		int yloc1, yloc2;
		for (int i = 0; i < width; i++) {
			yloc1 = y + w1.getY(i) + w2.getY(i) + w3.getY(i);
			yloc2 = y + w1.getY(i + 1) + w2.getY(i + 1) + w3.getY(i + 1);
			g.drawLine(x + i, yloc1, x + i + 1, yloc2);
		}
	}

	public void draw(Graphics g, int x, int y, int length, int thickness) {
		for (int i = 1; i <= length; i++) {
			// SwingJS optimized removing new Point
			int x1 = x + i;
			int y1 = y + getY(i);
			int x2 = x + i + 1;
			int y2 = y + getY(i + 1);
			for (int k = 0; k < thickness; k++)
				g.drawLine(x1 + k, y1, x2 + k, y2);
		}
	}

}
