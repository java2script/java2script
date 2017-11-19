package com.polytopemedia.polyhedra.vec;

public class LineSegment {
	private final Vector p;
	private final Vector q;

	public LineSegment(Vector p, Vector q) {
		this.p = p;
		this.q = q;
	}
	
	
/*
	private double mismatchMethod2(LineSegment other) {
		double mismatch1 = this.p.minus(other.p).length() + this.q.minus(other.q).length();
		double mismatch2 = this.p.minus(other.q).length() + this.q.minus(other.p).length();
		return Math.min(mismatch1,mismatch2);
	}
	private double mismatchMethod1(LineSegment other) {
		Vector thisMidpoint = this.p.plus(this.q).times(0.5);
		Vector otherMidpoint = other.p.plus(other.q).times(0.5);
		Vector thisDirection = this.p.minus(this.q);
		Vector otherDirection = other.p.minus(other.q);
		double thisLength = thisDirection.length();
		double otherLength = otherDirection.length();
		double cross = thisDirection.cross(otherDirection).length()/thisLength/otherLength;
		double midpointMismatch = thisMidpoint.minus(otherMidpoint).length();
		double lengthMismatch = Math.abs(thisLength-otherLength);
		double directionMismatch = cross*Math.sqrt(thisLength*otherLength);
		return directionMismatch + lengthMismatch + midpointMismatch;
	}
*/
	public Vector start() {
		return p;
	}
	public Vector end() {
		return q;
	}
}
