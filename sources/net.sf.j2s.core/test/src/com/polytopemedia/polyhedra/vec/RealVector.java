package com.polytopemedia.polyhedra.vec;

public class RealVector {

	public static double[] multiplied(double[] x, double d) {
		double[] y = x.clone();
		if (d != 1) {
			for (int i=0; i<y.length; i++) {
				y[i] *= d;
			}
		}
		return y;
	}

	public static double[] added(double[] x, double[] y, double a,
			double b) {
		double[] r = multiplied(x, a);
		for (int i=0; i<r.length; i++) {
			r[i] += b*y[i];
		}
		return r;
	}

	public static double dotProduct(double[] x, double[] y) {
		double d = 0;
		for (int i=0; i<x.length; i++) {
			d += x[i]*y[i];
		}
		return d;
	}

	private static double norm2(double[] x) {
		return Math.sqrt(dotProduct(x, x));
	}
	
	public static double norm(double[] x, int p) {
		return norm2(x);
	}

	

	

}
