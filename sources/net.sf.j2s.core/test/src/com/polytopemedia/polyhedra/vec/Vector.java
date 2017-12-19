package com.polytopemedia.polyhedra.vec;

public class Vector {
	public Vector(double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

//	Vector(double[] result) {
//		this(result.length == 4 ? result[0]/result[3] : result[0], result.length == 4 ? result[1]/result[3] : result[1], result.length == 4 ? result[2]/result[3] : result[2]);
//	}

	private double x,y,z;

	public Vector minus(Vector other) {
		return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
	}
	public Vector plus(Vector other) {
		return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
	}
	public Vector times(double a) {
		return new Vector(this.x * a, this.y * a, this.z * a);
	}
	public double dot(Vector other) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}
	double[] toArray() {
		return new double[] {x,y,z,1};
	}
	public double[] toArray3() {
		return new double[] {x,y,z};
	}

	public Vector cross(Vector other) {
		return new Vector(
				this.y * other.z - this.z * other.y,
				this.z * other.x - this.x * other.z,
				this.x * other.y - this.y * other.x
				);
	}
	public double length() {
		return Math.sqrt(lengthSquared());
	}
	
	private double lengthSquared() {
		return x*x+y*y+z*z;
	}


	public double getX() {
		return x;
	}
	public double getY() {
		return y;
	}
	public double getZ() {
		return z;
	}
	public String toString() {
		return String.format("(%7.5f,%7.5f,%7.5f)",x,y,z);
	}


}
