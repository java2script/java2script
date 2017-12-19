package com.polytopemedia.polyhedra.vec;

public class AffineTransform2D {

	private double[][] matrix;
	
	private AffineTransform2D(double[][] matrix) {
		this.matrix = matrix;
	}
	
	public static AffineTransform2D buildInverseFrom(Vector2D axis1, Vector2D axis2, double dot1, double dot2) {
		double[][] matrix = {
				{
					axis1.getFirst(), axis1.getSecond(), -dot1
				},
				{
					-axis1.getSecond(), axis1.getFirst(), -dot2
				},
				{
					0,0,1
				}
		};
		return new AffineTransform2D(matrix);
	}
	
	public Vector2D transformPoint(Vector2D original) {
		double[] p = {original.getFirst(), original.getSecond(), 1};
		double[] q = new double[3];
		for (int i=0; i<matrix.length; i++) {
			for (int j=0; j<matrix[i].length; j++) {
				q[i] += matrix[i][j]*p[j];
			}
		}
		return new Vector2D(q);
	}

	public AffineTransform2D scale(double d) {
		double[][] newMatrix = new double[][] {
				{matrix[0][0]*d, matrix[0][1]*d, matrix[0][2]*d},
				{matrix[1][0]*d, matrix[1][1]*d, matrix[1][2]*d},
				{matrix[2][0], matrix[2][1], matrix[2][2]}
		};
		return new AffineTransform2D(newMatrix);
	}

	public AffineTransform2D translate(double tx, double ty) {
		double[][] newMatrix = new double[][] {
				{matrix[0][0], matrix[0][1], matrix[0][2]+tx},
				{matrix[1][0], matrix[1][1], matrix[1][2]+ty},
				{matrix[2][0], matrix[2][1], matrix[2][2]}
		};
		return new AffineTransform2D(newMatrix);
	}

}
