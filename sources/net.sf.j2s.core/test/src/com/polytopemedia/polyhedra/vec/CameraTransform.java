package com.polytopemedia.polyhedra.vec;


public class CameraTransform {
	private double[][] matrix;
	private Vector out;
	private Vector up;
	private Vector right;
	private final Vector centre;
	private final double focus;
	
	public CameraTransform(Vector centre, Vector out, Vector up, double focus) {
		this.centre = centre;
		this.focus = focus;
		out = out.times(1/out.length());
		this.out = out;
		up = up.minus(out.times(out.dot(up)));
		this.up = up;
		this.right = out.cross(up);
		this.matrix = computeMatrix();
	}

	private double[][] computeMatrix() {
		double[] row1 = right.times(1/right.dot(right)).toArray();
		row1[3] = -right.dot(centre)/(right.dot(right));
		double[] row2 = up.times(1/up.dot(up)).toArray();
		row2[3] = -up.dot(centre)/(up.dot(up));
		double[] row3 = out.times(focus).toArray();
		row3[3] = 1-focus*out.dot(centre);
		return new double[][] {row1,row2,row3};
	}
	
	public double[] point2DFor(Vector v) {
		double[] array = v.toArray();
		double[] result3 = new double[3];
		for (int i=0; i<3; i++) {
			for (int j=0; j<4; j++) {
				result3[i] += matrix[i][j]*array[j];
			}
		}
		return result3;
	}
	
	/** the opposite of 'moveCamera' is 'change the focal length */
	public CameraTransform zoom(double factor, boolean moveCamera) {
		if (moveCamera) {
			return new CameraTransform(centre.times(factor), out, up, focus);
		} else {
			return new CameraTransform(centre, out, up, focus*factor);
		}
	}

	public Vector getCentre() {
		return centre;
	}
	public Vector getOut() {
		return out;
	}

	public Vector getUp() {
		return up;
	}

	public double getFocus() {
		return focus;
	}

	public Vector getRight() {
		return right;
	}
	
}
