package com.polytopemedia.polyhedra.utils;

public class Interval implements Comparable{
	private final double max;
	private final double min;

	Interval(double min, double max) {
		if (min < max) {
			this.min = min;
			this.max = max;
		} else {
			this.max = min;
			this.min = max;
		}
	}

	public boolean equals(Object o) {
		if (o == this)
			return true;
		if (o instanceof Interval) {
			return compareTo(o) == 0;
		}
		return false;
	}
	
	public int compareTo(Object o) { // NO_UCD
		Interval other = (Interval)o;
		if (this.min < other.min) {
			return -1;
		}
		if (this.min > other.min) {
			return 1;
		}
		if (this.max < other.max) {
			return -1;
		}
		if (this.max > other.max) {
			return 1;
		}
		return 0;
	}

	double min() {
		return min;
	}
	double max() {
		return max;
	}

	boolean meets(Interval other) {
		if (this.min > other.max-1e-6) {
			return false;
		}
		if (other.min > this.max-1e-6) {
			return false;
		}
		return true;
	}
	
	public double length() {
		return max-min;
	}
	
	public String toString() {
		return "["+min+","+max+"]";
	}

	

	public double mid() {
		return (min+max)/2;
	}
}
