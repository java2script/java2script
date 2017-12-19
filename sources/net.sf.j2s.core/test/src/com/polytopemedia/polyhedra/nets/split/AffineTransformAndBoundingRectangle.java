package com.polytopemedia.polyhedra.nets.split;

import com.polytopemedia.polyhedra.vec.AffineTransform2D;


class AffineTransformAndBoundingRectangle { 
	private final double heightRatio;
	private final double widthRatio;
	private final AffineTransform2D transform;

	AffineTransformAndBoundingRectangle(AffineTransform2D transform, double widthRatio, double heightRatio) {
		this.transform = transform;
		this.widthRatio = widthRatio;
		this.heightRatio = heightRatio;
	}

	boolean ratiosTooBig() {
		return widthRatio > 1 || heightRatio > 1;
	}

	double biggestRatio() {
		return Math.max(widthRatio, heightRatio);
	}

	public AffineTransform2D getTransform() {
		return transform;
	}
}
