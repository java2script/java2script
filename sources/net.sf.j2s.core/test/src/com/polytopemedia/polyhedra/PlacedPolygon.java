package com.polytopemedia.polyhedra;

import java.util.LinkedHashMap;
import java.util.Map;

import com.polytopemedia.polyhedra.vec.AffineTransform;
import com.polytopemedia.polyhedra.vec.Vector;
import com.polytopemedia.polyhedra.vec.Vector2D;

public class PlacedPolygon {
	private final AffineTransform t;
	private final Polygon p;
	private final Map<Integer, AffineTransform> derivatives;

	public PlacedPolygon(Polygon p, AffineTransform t, Map<Integer, AffineTransform> derivatives) {
		this.p = p;
		this.t = t;
		this.derivatives = derivatives;
	}
	
	public Vector cornerPosition(int corner) {
		return t.transformPoint(p.getCorner(corner), false);
	}
	
	public Vector2D[] cornerPositionProjections() {
		Vector2D[] rtn = new Vector2D[size()];
		for (int i=0; i<size(); i++) {
			Vector cornerPosition = cornerPosition(i);
			double[] array3 = cornerPosition.toArray3();
			rtn[i] = new Vector2D(array3[0],array3[1]);
		}
		return rtn;
	}
	
	public Vector[] cornerPositions() {
		Vector[] rtn = new Vector[size()];
		for (int i=0; i<size(); i++) {
			Vector cornerPosition = cornerPosition(i);
			rtn[i] = cornerPosition;
		}
		return rtn;
	}
	

	
	public Vector cornerDerivative(int corner, int derivative) {
		AffineTransform derivativeTransform = derivatives.get(derivative);
		if (derivativeTransform != null)
			return derivativeTransform.transformPoint(p.getCorner(corner), true);
		return new Vector(0,0,0);
	}
	
	public PlacedPolygon getAttached(Polygon otherp, int thisEdge, int otherEdge, double theta, int index) {
		Vector du = this.p.getVectorAlong(thisEdge);
		Vector dv = otherp.getVectorAlong(otherEdge).times(-1);
		du = du.times(1/du.length());
		dv = dv.times(1/dv.length());
		double phi = Math.atan2(dv.cross(du).getZ(), dv.dot(du));
		AffineTransform rotationOfOther = AffineTransform.zRotation(phi);
		Vector v2 = otherp.getCorner(otherEdge+1);
		Vector u1 = this.p.getCorner(thisEdge);
		Vector rv2 = rotationOfOther.transformPoint(v2, false);
		Vector normalVectorToEdge = this.p.getVectorNormalTo(thisEdge);
		AffineTransform translation1 = AffineTransform.translation(normalVectorToEdge);
		AffineTransform translation2 = AffineTransform.translation(u1.minus(rv2));
		AffineTransform[] rotationAndDerivative = AffineTransform.rotationAndDerivative(this.p.getVectorAlong(thisEdge), theta);
		AffineTransform rotationAroundEdge = rotationAndDerivative[0];
		AffineTransform derivativeOfRotation = rotationAndDerivative[1];
		AffineTransform conjugatedRotation = translation1.times(rotationAroundEdge).times(translation1.inverse()).times(translation2).times(rotationOfOther);
		AffineTransform conjugatedDerivative = translation1.times(derivativeOfRotation).times(translation1.inverse()).times(translation2).times(rotationOfOther);
		AffineTransform newTransform = t.times(conjugatedRotation);
		Map<Integer, AffineTransform> newDerivatives = new LinkedHashMap<Integer, AffineTransform>();
		for (Integer key : derivatives.keySet()) {
			AffineTransform dt = derivatives.get(key);
			newDerivatives.put(key, dt.times(conjugatedRotation));
		}
		if (newDerivatives.containsKey(index)) {
			throw new UnsupportedOperationException("Index "+index+" encountered twice!");
		}
		newDerivatives.put(index, t.times(conjugatedDerivative));
		return new PlacedPolygon(otherp, newTransform, newDerivatives);
	}

	public int size() {
		return p.size();
	}

}
