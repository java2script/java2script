package com.polytopemedia.polyhedra;

import java.util.List;

import com.polytopemedia.polyhedra.vec.Vector;

public abstract class Polygon {
	private final List<Vector> corners;
	Polygon(List<Vector> corners) {
		this.corners = corners;
	}
	
	Vector getVectorAlong(int edge) {
		edge = edge % corners.size();
		while (edge < 0) {
			edge = (edge + corners.size());
		}
		return corners.get(nextEdge(edge)).minus(corners.get(edge));
	}
	private int nextEdge(int edge) {
		edge++;
		edge = edge % corners.size();
		while (edge < 0) {
			edge = (edge + corners.size());
		}
		return edge;
	}
	Vector getVectorNormalTo(int edge) {
		edge = edge % corners.size();
		while (edge < 0) {
			edge = (edge + corners.size());
		}
		Vector nextVectorU = corners.get(nextEdge(edge));
		Vector thisVectorV = corners.get(edge);
		Vector difference = thisVectorV.minus(nextVectorU);
		double a = difference.dot(nextVectorU)/(difference.dot(difference));
		return nextVectorU.minus(difference.times(a));
	}
	Vector getCorner(int corner) {
		corner = corner % corners.size();
		while (corner < 0) {
			corner = (corner + corners.size());
		}
		return corners.get(corner);
	}
	public int size() {
		return corners.size();
	}
	
	public abstract int[] getParameters();

}
