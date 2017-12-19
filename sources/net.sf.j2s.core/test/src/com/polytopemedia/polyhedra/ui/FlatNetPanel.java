package com.polytopemedia.polyhedra.ui;

import java.awt.Color;

import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.nets.ZeroAngles;
import com.polytopemedia.polyhedra.print.PrintModel;
import com.polytopemedia.polyhedra.vec.CameraTransform;
import com.polytopemedia.polyhedra.vec.Vector;


class FlatNetPanel extends NetPanel { 

	FlatNetPanel(Net net, Color bgColor, Color unjoinedEdgeColor,
			Color joinedEdgeColor, MarkColors markColors, PrintModel printModel, String name) {
		super(net, 
			new ZeroAngles(), 
			new CameraTransform(new Vector(0,0,3), new Vector(0,0,-1), new Vector(0,1,0), 10), 
			bgColor, 
			unjoinedEdgeColor, 
			joinedEdgeColor,
			new double[] {-0.3,-0.3}, 
			new double[] {0.3,0.3}, 
			false, 
			markColors, printModel, name, false);
	}
	
}
