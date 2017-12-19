package com.polytopemedia.polyhedra.vec;

public class LineSegment2D {

	private final Vector2D p;
	private final Vector2D q;

	public LineSegment2D(double[] p, double[] q) {
		this(new Vector2D(p),new Vector2D(q));
	}

	public LineSegment2D(Vector2D p, Vector2D q) {
		this.p = p;
		this.q = q;
	}

	public double distanceTo(double x, double y) {
		return distanceTo(new Vector2D(x,y)); 
	}

	private double distanceTo(Vector2D v) {
		Vector2D dif1 = p.minus(v);
		Vector2D dif2 = p.minus(q);
		double t = dif1.dot(dif2)/dif2.dot(dif2);
		if (t < 0) t = 0;
		if (t > 1) t = 1;
		Vector2D r = p.minus(dif2.times(t));
		return r.minus(v).length();
	}
	
	public Vector2D getStart() {
		return p;
	}

	public Vector2D getEnd() {
		return q;
	}

}
