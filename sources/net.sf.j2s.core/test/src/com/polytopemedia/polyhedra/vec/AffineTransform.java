package com.polytopemedia.polyhedra.vec;

public class AffineTransform {
	private double[][] matrix;
	
	
	private AffineTransform(double[][] matrix) {
		this.matrix = matrix;
	}
	private static AffineTransform getAffineTransform(double[][] rotation, double[] translation) {
		return new AffineTransform(new double[][] {
				{rotation[0][0], rotation[0][1], rotation[0][2], translation[0]},
				{rotation[1][0], rotation[1][1], rotation[1][2], translation[1]},
				{rotation[2][0], rotation[2][1], rotation[2][2], translation[2]},
				{0,0,0,1}});
	}

	public static AffineTransform translation(Vector translation) {
		return getAffineTransform(new double[][] {{1,0,0},{0,1,0},{0,0,1}},translation.toArray());
	}
	
	public AffineTransform inverse() {
		double[][] r = rotation();
		double[][] rT = new double[][] {
				{r[0][0], r[1][0], r[2][0]},
				{r[0][1], r[1][1], r[2][1]},
				{r[0][2], r[1][2], r[2][2]}
		};
		double[] t = translation();
		t[0] *= -1;
		t[1] *= -1;
		t[2] *= -1;
		return getAffineTransform(rT, new double[3]).times(AffineTransform.translation(new Vector(t[0],t[1],t[2])));
	}
	
	private double[] translation() {
		return new double[] {matrix[0][3], matrix[1][3], matrix[2][3]};
	}
	private double[][] rotation() {
		return new double[][] {
				{matrix[0][0], matrix[0][1], matrix[0][2]},
				{matrix[1][0], matrix[1][1], matrix[1][2]},
				{matrix[2][0], matrix[2][1], matrix[2][2]}
		};
	}
	public AffineTransform times(AffineTransform other) {
		double[][] result = new double[4][4];
		for (int i=0; i<4; i++) {
			for (int k=0; k<4; k++) {
				double sum = 0;
				for (int j=0; j<4; j++) {
					sum += this.matrix[i][j] * other.matrix[j][k];
				}
				result[i][k] = sum;
			}
		}
		return new AffineTransform(result);
	}
	
	public Vector transformPoint(Vector point, boolean derivative) {
		double[] array = point.toArray();
		double[] result = new double[4];
		for (int i=0; i<4; i++) {
			for (int j=0; j<4; j++) {
				result[i] += matrix[i][j] * array[j];
			}
		}
		if (derivative) {
			result[3] = 1;
		}
		return new Vector(result.length == 4 ? result[0]/result[3] : result[0], result.length == 4 ? result[1]/result[3] : result[1], result.length == 4 ? result[2]/result[3] : result[2]);
	}
	
	
	public static AffineTransform zRotation(double phi) {
		return getAffineTransform(new double[][] {
				{Math.cos(phi), -Math.sin(phi), 0},
				{Math.sin(phi),  Math.cos(phi), 0},
				{0            , 0             , 1}}
				, new double[] {0,0,0});
	}

	public static AffineTransform[] rotationAndDerivative(Vector axis, double theta) {
		double x = axis.getX();
		double y = axis.getY();
		double z = axis.getZ();
		double r = Math.sqrt(x*x+y*y+z*z);
		x /= r;
		y /= r;
		z /= r;
		double cos = Math.cos(theta);
		double sin = Math.sin(theta);
		double[][] rotationMatrix = new double[][] {
				{cos + x*x*(1-cos), x*y*(1-cos)-z*sin, x*z*(1-cos)+y*sin},
				{x*y*(1-cos)+z*sin, cos + y*y*(1-cos), y*z*(1-cos)-x*sin},
				{x*z*(1-cos)-y*sin, y*z*(1-cos)+x*sin, cos + z*z*(1-cos)}
		};
		double[][] derivativeMatrix = new double[][] {
				{-sin + x*x*sin, x*y*sin-z*cos, x*z*sin+y*cos, 0},
				{x*y*sin+z*cos, -sin + y*y*sin, y*z*sin-x*cos, 0},
				{x*z*sin-y*cos, y*z*sin+x*cos, -sin + z*z*sin, 0},
				{0,0,0,0}
		};
		AffineTransform rotation = getAffineTransform(rotationMatrix, new double[] {0,0,0});
		AffineTransform derivative = new AffineTransform(derivativeMatrix);
		return new AffineTransform[] {rotation, derivative};
		
	}
	
	
	public static AffineTransform identity() {
		return AffineTransform.translation(new Vector(0,0,0));
	}
}
