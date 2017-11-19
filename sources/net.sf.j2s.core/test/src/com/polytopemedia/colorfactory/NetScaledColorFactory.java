package com.polytopemedia.colorfactory;

import java.awt.Color;
import java.util.Collection;
import java.util.LinkedHashMap;

import com.polytopemedia.colorfactory.ColorFactory;
import com.polytopemedia.polyhedra.PlacedPolygon;
import com.polytopemedia.polyhedra.nets.Face;
import com.polytopemedia.polyhedra.nets.FoldedNet;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.vec.Vector;

public class NetScaledColorFactory implements ColorFactory{
	
	private final ColorFactory delegate;
	private Vector centre;
	private double scale;

	public NetScaledColorFactory(Net net, ColorFactory delegate) {
		this.delegate = delegate;
		Collection<PlacedPolygon> polygons = new FoldedNet(net,net.findOptimalAngles(false)).getFacePositions().values();
		Vector sum = new Vector(0,0,0);
		int n = 0;
		for (PlacedPolygon poly : polygons) {
			Vector[] cornerPositions = poly.cornerPositions();
			for (Vector corner : cornerPositions) {
				sum = sum.plus(corner);
				n++;
			}
		}
		centre = sum.times(1.0/n);
		scale = 0;
		for (PlacedPolygon poly : polygons) {
			Vector[] cornerPositions = poly.cornerPositions();
			for (Vector corner : cornerPositions) {
				scale = scale + corner.minus(centre).length();
			}
		}
		scale = n/scale;
	}

	public Color getColor(double x, double y, double z) {
		Vector v = new Vector(x,y,z);
		v = v.minus(centre).times(scale);
		return delegate.getColor(v.getX(), v.getY(), v.getZ());
	}

}
