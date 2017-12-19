package com.polytopemedia.polyhedra.vec;

import java.util.Arrays;

public class Vector2D implements Comparable {
	private double[] p;
	
	public Vector2D(double... p) {
		if (p.length == 3) {
			this.p = new double[] {p[0]/p[2],p[1]/p[2]};
		} else if (p.length == 2){
			this.p = p;
		} else {
			throw new IllegalArgumentException("wrong dimension for array p");
		}
	}

	public Vector2D minus(Vector2D other) {
		return new Vector2D(new double[] {this.p[0]-other.p[0],this.p[1]-other.p[1]});
	}

	public double dot(Vector2D other) {
		return this.p[0]*other.p[0] + this.p[1]*other.p[1];
	}

	public Vector2D times(double t) {
		return new Vector2D(p[0]*t,p[1]*t);
	}

	public double length() {
		return Math.sqrt(this.dot(this));
	}

	public Vector2D normalise() {
		return this.times(1/this.length());
	}
	
	public String toString() {
		return Arrays.toString(p);
	}

	public Vector2D plus(Vector2D other) {
		return new Vector2D(new double[] {this.p[0]+other.p[0],this.p[1]+other.p[1]});
	}

	public double getFirst() {
		return p[0];
	}
	public double getSecond() {
		return p[1];
	}

	public Vector2D normal() {
		return new Vector2D(-p[1],p[0]);
	}
	
	public boolean equals(Object o) {
		if (o == this) return true;
		if (o instanceof Vector2D) {
			Vector2D other = (Vector2D)o;
			return (this.p[0] == other.p[0] && this.p[1] == other.p[1]);
		}
		return false;
	}
	
	private int hash= -1;
	public int hashCode() {
		if (hash != -1) return hash;
		return hash = new  Double(p[0]).hashCode() + 34786*(new Double(p[1]).hashCode());
	}

	public int compareTo(Object o) { // NO_UCD
		Vector2D other = (Vector2D)o;
		if (this.p[0] < other.p[0]) {
			return 1;
		}
		if (this.p[0] > other.p[0]) {
			return -1;
		}
		if (this.p[1] < other.p[1]) {
			return 1;
		}
		if (this.p[1] > other.p[1]) {
			return -1;
		}
		return 0;
	}
	
	
	

}
