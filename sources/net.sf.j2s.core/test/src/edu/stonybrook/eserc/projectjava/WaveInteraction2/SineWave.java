package edu.stonybrook.eserc.projectjava.WaveInteraction2;

import java.awt.Graphics;
import java.awt.Point;

import edu.stonybrook.eserc.projectjava.waveinteraction.MyMath;

/*
 *  Programmer:  Glenn A. Richard
 *  Modified by: Konstantin Lukin
 *  
 *          Modified for SwingJS by Bob Hanson - Jan, 2017
 */

public class SineWave {

	public int wavelength, amplitude, phase;

	public SineWave(int w, int a, int p) {
		wavelength = w;
		amplitude = a;
		phase = p;
	}

	public void advance(int phaseIncrement) {
		// note: this advances the initial phase, so a positive value
		// moves the wave form to the left, negative to the right.
		phase -= phaseIncrement;
		if (phase >= 360)
			phase %= 360;
		if (phase < 0)
			phase += 360;
	}

	public SineWave copy() {
		return new SineWave(wavelength, amplitude, phase);
	}

	public int getY(int x) {
		double degreesPerPixel = 360.0 / wavelength;
		double degrees = (-phase + 180) + x * degreesPerPixel;
		return (int) (amplitude * Math.sin(degrees * Math.PI / 180.0));
	}

	// draws a very nice looking sine curve if the wavelength is not
	// too small or amplitude too big. Good for presentations.
	public void drawThick(Graphics g, int x, int y, int width) {
		double degreesPerPixel = 360.0 / wavelength;
		int yOffset = (int) (amplitude / 2.0) + 2;
		double degrees;
		int xloc;
		int yloc;
		for (int i = 0; i < width; i++) {
			degrees = phase + i * degreesPerPixel;
			xloc = x + i;
			yloc = (int) (y + yOffset + amplitude
					* Math.sin(degrees * Math.PI / 180.0));
			g.drawLine(xloc, yloc - 1, xloc, yloc + 1);
		}
	}

	// this function draws a thin sine wave by connecting two
	// adjacent points with a line.
	// Sine wave could only be vertical
	public void draw(Graphics g, int x, int y, int length) {
		for (int i = 1; i <= length; i++) {
			g.drawLine(x + i,y + getY(i), x + i + 1, y + getY(i + 1));
		}
	}

	public void draw(Graphics g, int x, int y, int length, int thickness) {
		for (int i = 0; i < length; i++) {
			int x1 = x + i;
			int y1 = y + getY(i);
		  int x2 = x + i + 1;
		  int y2 = y + getY(i + 1);
			for (int k = 0; k < thickness; k++)
				g.drawLine(x1 + k, y1, x2 + k, y2);
		}
	}

	// This function does the same thing as the previous one,
	// plus it can draw a sine wave between any two points
	
	private Point ptTemp1 = new Point(), ptTemp2 = new Point();

	public void draw(Graphics g, Point start, Point stop) {
		float angle = MyMath.getAngle(start, stop);
		float length = MyMath.length(start.x, start.y, stop.x, stop.y);
		for (int i = 1; i <= length; i++) {
			ptTemp1.x = start.x + i;
			ptTemp1.y = start.y + this.getY(i);
			ptTemp2.x = start.x + i + 1;
			ptTemp2.y = start.y + this.getY(i + 1);
			MyMath.translate(start, ptTemp1, angle);
			MyMath.translate(start, ptTemp2, angle);
		}
	}

	// return phase in degrees when x = length.
	public int getPhase(float length) {
		return (int) (360 * (length / wavelength) + phase);
	}

	// returns the number of wavelengths that fits into length=x
	public float getWaveNum(int x) {
		return (1f * x / wavelength); // BH fix - was (float) (int/int)
	}

}
