package com.polytopemedia.polyhedra.nets;


public class ZeroAngles extends AngleFactory{

	@Override
	public double[] getAngles(Net net, boolean referToBase) {
		return new double[net.getNumberOfFolds()];
	}

}
