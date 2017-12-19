package com.polytopemedia.polyhedra.ui;

import java.awt.Color;

import com.polytopemedia.polyhedra.nets.FoldingAngles;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.print.PrintModel;
import com.polytopemedia.polyhedra.vec.CameraTransform;
import com.polytopemedia.polyhedra.vec.Vector;


class FoldedNetPanel extends NetPanel{ 
	FoldedNetPanel(Net net, Color bgColor, Color unjoinedEdgeColor,
			Color joinedEdgeColor, MarkColors markColors, PrintModel printModel, String name, boolean autofoldAtStart) {
		super(net, 
			new FoldingAngles(), 
			new CameraTransform(new Vector(5,3,1), new Vector(-5,-3,-1), new Vector(0,0,1), 2), 
			bgColor, 
			unjoinedEdgeColor, 
			joinedEdgeColor,
			new double[] {-0.3,-0.3}, 
			new double[] {0.3,0.3}, 
			true, 
			markColors, printModel, name, autofoldAtStart);
	}
}
