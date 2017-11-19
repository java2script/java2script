package com.polytopemedia.polyhedra;

public class PolygonFactory {
	public PolygonFactory() {	}
	public Polygon getPolygon(int[] parameters) {
		switch (parameters[0]) {
		case 0:
			return new RegularPolygon(parameters[1]);
		default:
			throw new IllegalArgumentException("Unknow polygon factory "+parameters[0]);
		}
	}
}
