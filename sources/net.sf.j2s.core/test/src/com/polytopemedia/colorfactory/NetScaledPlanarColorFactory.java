package com.polytopemedia.colorfactory;

import java.awt.Color;
import java.util.Collection;

import org.omg.CORBA.portable.Delegate;

import com.polytopemedia.polyhedra.PlacedPolygon;
import com.polytopemedia.polyhedra.nets.FoldedNet;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.vec.Vector;

public class NetScaledPlanarColorFactory implements ColorFactory{

	private final Vector left;
	private final Vector up;
	private double minU;
	private double minL;
	private double uScale;
	private double lScale;
	private final PlanarColorFactory delegate;

	public NetScaledPlanarColorFactory(PlanarColorFactory delegate, Net net, Vector left, Vector up) {
		this.delegate = delegate;
		this.left = left;
		this.up = up;
		Collection<PlacedPolygon> polygons = new FoldedNet(net,net.findOptimalAngles(false)).getFacePositions().values();
		minL = Double.POSITIVE_INFINITY;
		double maxL = Double.NEGATIVE_INFINITY;
		minU = Double.POSITIVE_INFINITY;
		double maxU = Double.NEGATIVE_INFINITY;
		for (PlacedPolygon poly : polygons) {
			Vector[] cornerPositions = poly.cornerPositions();
			for (Vector corner : cornerPositions) {
				double l = left.dot(corner);
				double u = up.dot(corner);
				minU = Math.min(minU, u);
				maxU = Math.max(maxU, u);
				minL = Math.min(minL, l);
				maxL = Math.max(maxL, l);
			}
		}
		lScale = 1.0/(maxL-minL);
		uScale = 1.0/(maxU-minU);
	}
	
	public Color getColor(double x, double y, double z) {
		Vector v = new Vector(x,y,z);
		double l = left.dot(v)-minL;
		double u = up.dot(v)-minU;
		return delegate.getColor(l*lScale, u*uScale);
	}

}
