package com.polytopemedia.polyhedra.nets.split;

import java.awt.Color;
import java.awt.Composite;
import java.awt.CompositeContext;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.ColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;

import com.polytopemedia.colorfactory.ColorFactory;
import com.polytopemedia.polyhedra.utils.Utils;
import com.polytopemedia.polyhedra.vec.Vector;
import com.polytopemedia.polyhedra.vec.Vector2D;

public class PaperToSpaceMap {

	private static int nextID = 1;
	private final int id;
	private final Vector2D[] cornersOnPaper;
	private double[][] matrix;

	public PaperToSpaceMap(Vector2D[] cornersOnPaper, Vector[] cornersInSpace) {
		this.cornersOnPaper = cornersOnPaper;
		matrix = Utils.getMatrixThatMaps(cornersOnPaper, cornersInSpace);
		this.id = nextID++;
	}
	/** TODO : delete this method */
	public void paint(Graphics2D gr, ColorFactory colors, int only) {
		if (cornersOnPaper.length != only) 
			return;
		double xmin = Double.POSITIVE_INFINITY;
		double xmax = Double.NEGATIVE_INFINITY;
		int minIndex = -1;
		int maxIndex = -1;
		for (int i=0; i<cornersOnPaper.length; i++) {
			double x = cornersOnPaper[i].getFirst();
			if (x < xmin) {
			   xmin = x;
			   minIndex = i;
			}
			if (x > xmax) {
				xmax = x;
				maxIndex = i;
			}
		}
		// this won't work so well for non-convex polygons!
		Vector2D[] topEdge = new Vector2D[(maxIndex-minIndex+cornersOnPaper.length)%cornersOnPaper.length+1];  
		Vector2D[] bottomEdge = new Vector2D[(minIndex-maxIndex+cornersOnPaper.length)%cornersOnPaper.length+1];
		
		for (int i=minIndex, j=0; j<topEdge.length; j++,i=(i+1)%cornersOnPaper.length) {
			topEdge[j] = cornersOnPaper[i];
		}

		for (int i=minIndex, j=0; j<bottomEdge.length; j++,i=(i-1+cornersOnPaper.length)%cornersOnPaper.length) {
			bottomEdge[j] = cornersOnPaper[i];
		}
		
		int topIndex = 0;
		int bottomIndex = 0;
		
		int ixmin = (int) Math.ceil(xmin);
		int ixmax = (int) Math.floor(xmax);
		System.out.println("x range = ("+ixmin+","+ixmax+") in face "+id);
		for (int ix=ixmin; ix<=ixmax; ix++) {
			while (ix > topEdge[topIndex+1].getFirst()) {
				topIndex++;
			}
			while (ix > bottomEdge[bottomIndex+1].getFirst()) {
				bottomIndex++;
			}
			
			Vector2D topP2 = topEdge[topIndex+1];
			Vector2D botP2 = bottomEdge[bottomIndex+1];
			Vector2D topP1 = topEdge[topIndex];
			Vector2D botP1 = bottomEdge[bottomIndex];

			double topX1 = topP1.getFirst();
			double topY1 = topP1.getSecond();
			double topX2 = topP2.getFirst();
			double topY2 = topP2.getSecond();
			
			double botX1 = botP1.getFirst();
			double botY1 = botP1.getSecond();
			double botX2 = botP2.getFirst();
			double botY2 = botP2.getSecond();

			double topSlope = (topY2-topY1)/(topX2-topX1);
			double bottomSlope = (botY2-botY1)/(botX2-botX1);
			double topY = topSlope*(ix-topX1)+topY1;
			double bottomY = bottomSlope*(ix-botX1)+botY1;
			
			if (topY < bottomY) {
				double tmp = topY;
				topY = bottomY;
				bottomY = tmp;
			}
			
			for (int iy=(int)(Math.ceil(bottomY)); iy<topY; iy++) {
				double x = matrix[0][0]*ix + matrix[0][1]*iy + matrix[0][2];
				double y = matrix[1][0]*ix + matrix[1][1]*iy + matrix[1][2];
				double z = matrix[2][0]*ix + matrix[2][1]*iy + matrix[2][2];
				gr.setColor(colors.getColor(x, y, z));
				if (cornersOnPaper.length == 5) { // TODO! Delete this line!
					gr.setColor(Color.black);// TODO! Delete this line!
					gr.drawLine(ix,iy,ix,iy);
				} else {// TODO! Delete this line!
					gr.setColor(Color.white);// TODO! Delete this line!
					gr.drawLine(ix, iy, ix, iy);// TODO! Delete this line!
				}// TODO! Delete this line!
			}
		}
	}
	public void paint(Graphics2D gr, ColorFactory colors) {
		double xmin = Double.POSITIVE_INFINITY;
		double xmax = Double.NEGATIVE_INFINITY;
		int minIndex = -1;
		int maxIndex = -1;
		for (int i=0; i<cornersOnPaper.length; i++) {
			double x = cornersOnPaper[i].getFirst();
			if (x < xmin) {
			   xmin = x;
			   minIndex = i;
			}
			if (x > xmax) {
				xmax = x;
				maxIndex = i;
			}
		}
		// this won't work so well for non-convex polygons!
		Vector2D[] topEdge = new Vector2D[(maxIndex-minIndex+cornersOnPaper.length)%cornersOnPaper.length+1];  
		Vector2D[] bottomEdge = new Vector2D[(minIndex-maxIndex+cornersOnPaper.length)%cornersOnPaper.length+1];
		
		for (int i=minIndex, j=0; j<topEdge.length; j++,i=(i+1)%cornersOnPaper.length) {
			topEdge[j] = cornersOnPaper[i];
		}

		for (int i=minIndex, j=0; j<bottomEdge.length; j++,i=(i-1+cornersOnPaper.length)%cornersOnPaper.length) {
			bottomEdge[j] = cornersOnPaper[i];
		}
		
		int topIndex = 0;
		int bottomIndex = 0;
		
		int ixmin = (int) Math.ceil(xmin);
		int ixmax = (int) Math.floor(xmax);
		System.out.println("x range = ("+ixmin+","+ixmax+") in face "+id);
		for (int ix=ixmin; ix<=ixmax; ix++) {
			while (ix > topEdge[topIndex+1].getFirst()) {
				topIndex++;
			}
			while (ix > bottomEdge[bottomIndex+1].getFirst()) {
				bottomIndex++;
			}
			
			Vector2D topP2 = topEdge[topIndex+1];
			Vector2D botP2 = bottomEdge[bottomIndex+1];
			Vector2D topP1 = topEdge[topIndex];
			Vector2D botP1 = bottomEdge[bottomIndex];

			double topX1 = topP1.getFirst();
			double topY1 = topP1.getSecond();
			double topX2 = topP2.getFirst();
			double topY2 = topP2.getSecond();
			
			double botX1 = botP1.getFirst();
			double botY1 = botP1.getSecond();
			double botX2 = botP2.getFirst();
			double botY2 = botP2.getSecond();

			double topSlope = (topY2-topY1)/(topX2-topX1);
			double bottomSlope = (botY2-botY1)/(botX2-botX1);
			double topY = topSlope*(ix-topX1)+topY1;
			double bottomY = bottomSlope*(ix-botX1)+botY1;
			
			if (topY < bottomY) {
				double tmp = topY;
				topY = bottomY;
				bottomY = tmp;
			}
			
			for (int iy=(int)(Math.ceil(bottomY)); iy<topY; iy++) {
				double x = matrix[0][0]*ix + matrix[0][1]*iy + matrix[0][2];
				double y = matrix[1][0]*ix + matrix[1][1]*iy + matrix[1][2];
				double z = matrix[2][0]*ix + matrix[2][1]*iy + matrix[2][2];
				gr.setColor(colors.getColor(x, y, z));
				gr.drawLine(ix,iy,ix,iy);
			}
		}
	}

}
