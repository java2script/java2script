package com.polytopemedia.colorfactory;

import java.awt.Color;

public class SphericalTransform implements ColorFactory{

	private final PlanarColorFactory delegate;

	public SphericalTransform(PlanarColorFactory delegate) {
		this.delegate = delegate;
	}
	
	public Color getColor(double x, double y, double z) {
		double theta = Math.atan2(y,x);
		if (y == 0 && x == 0) theta = 0;
		double phi = Math.atan2(Math.sqrt(x*x+y*y),z);
		if (z == 0 && y == 0 && x == 0) {
			phi = 0;
		}
		double a = theta / (2 * Math.PI);
		double b = phi / Math.PI;
		a = a%1;
		while (a < 0) a++;
		while (a >= 1) a--;
		b = b%1;
		while (b < 0) b++;
		while (b >= 1) b--;
		return delegate.getColor(a, b);
	}

}
