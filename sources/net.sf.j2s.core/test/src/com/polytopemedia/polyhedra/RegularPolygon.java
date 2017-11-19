package com.polytopemedia.polyhedra;

import java.util.ArrayList;
import java.util.List;

import com.polytopemedia.polyhedra.vec.Vector;

public class RegularPolygon extends Polygon {
	public RegularPolygon(int n) {
		super(buildCorners(n));
	}

	private static List<Vector> buildCorners(int n) {
		double r = 0.5 / Math.sin(Math.PI/n);
		List<Vector> rtn = new ArrayList<Vector>(n);
		for (int i=0; i<n; i++) {
			double theta = Math.PI/n + Math.PI*2/n*i;
			rtn.add(new Vector(r*Math.cos(theta), r*Math.sin(theta), 0));
		}
		return rtn;
	}
	
	public String toString() {
		return size()+"-gon";
	}

	@Override
	public int[] getParameters() {
		return new int[] {0,size()};
	}
	
}
