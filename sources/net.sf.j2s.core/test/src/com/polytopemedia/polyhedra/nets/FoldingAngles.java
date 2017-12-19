package com.polytopemedia.polyhedra.nets;


public class FoldingAngles extends AngleFactory {
	
	@Override
	public double[] getAngles(Net net, boolean basedOnOldAngles) {
		double[] angles = net.findOptimalAngles(basedOnOldAngles);
		return angles;
	}

}
