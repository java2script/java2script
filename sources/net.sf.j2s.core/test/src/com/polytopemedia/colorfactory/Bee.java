package com.polytopemedia.colorfactory;

import java.awt.Color;

public class Bee implements ColorFactory {

	public Color getColor(double x, double y, double z) {
		double r = (10*Math.sqrt(x*x+y*y+z*z))%1;
		return r < 0.5 ? Color.yellow : Color.black;
	}

}
