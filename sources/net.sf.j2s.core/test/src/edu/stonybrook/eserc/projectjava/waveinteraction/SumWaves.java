/*
 * Decompiled with CFR 0_118.
 */

package edu.stonybrook.eserc.projectjava.waveinteraction;

import java.awt.Graphics;
import java.awt.Point;

public class SumWaves {
	SineWave w1;
	SineWave w2;

	public SumWaves(SineWave sineWave, SineWave sineWave2) {
		this.w1 = sineWave;
		this.w2 = sineWave2;
	}

	public void setWave1(SineWave sineWave) {
		this.w1 = sineWave;
	}

	public void setWave2(SineWave sineWave) {
		this.w2 = sineWave;
	}

	public int getY(int n) {
		return this.w1.getY(n) + this.w2.getY(n);
	}

	public void draw(Graphics graphics, int n, int n2, int n3) {
		int n4 = 0;
		while (n4 < n3) {
			int n5 = n2 + this.w1.getY(n4) + this.w2.getY(n4);
			int n6 = n2 + this.w1.getY(n4 + 1) + this.w2.getY(n4 + 1);
			graphics.drawLine(n + n4, n5, n + n4 + 1, n6);
			++n4;
		}
	}

	public void draw(Graphics graphics, int n, int n2, int n3, int n4) {
		int n5 = 1;
		while (n5 <= n3) {
			int x1 = n + n5;
			int y1 = n2 + this.getY(n5);
			int x2 = n + n5 + 1;
			int y2 = n2 + this.getY(n5 + 1);
			int n6 = 0;
			while (n6 < n4) {
				graphics.drawLine(x1 + n6, y1, x2 + n6, y2);
				++n6;
			}
			++n5;
		}
	}
}