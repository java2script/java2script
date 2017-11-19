package com.polytopemedia.polyhedra.nets;

public abstract class AngleFactory {
	public abstract double[] getAngles(Net net, boolean referToBase);

	public FoldedNet fold(Net net, boolean referToBase) {
		return net.foldUp(this.getAngles(net, referToBase));
	}
}
