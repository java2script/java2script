package com.polytopemedia.polyhedra.nets;

import java.util.LinkedHashMap;
import java.util.List;

import com.polytopemedia.polyhedra.vec.LineSegment2D;

public class PolygonToDraw {
	private List<double[]> points;
	private LinkedHashMap<LineSegment2D, Edge> edges;

	PolygonToDraw(List<double[]> points,	LinkedHashMap<LineSegment2D, Edge> edges) {
		super();
		this.points = points;
		this.edges = edges;
	}

	public double getDistance() {
		double sum = 0;
		int count = 0;
		for (double[] p : points) {
			sum += p[2];
			count++;
		}
		return sum/count;
	}

	public int size() {
		return points.size();
	}

	public List<double[]> getPoints() {
		return points;
	}

	public LinkedHashMap<LineSegment2D, Edge> getEdges() {
		return edges;
	}

}
