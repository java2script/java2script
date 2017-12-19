package com.polytopemedia.polyhedra.nets;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.polytopemedia.polyhedra.PlacedPolygon;
import com.polytopemedia.polyhedra.vec.CameraTransform;
import com.polytopemedia.polyhedra.vec.LineSegment;
import com.polytopemedia.polyhedra.vec.LineSegment2D;
import com.polytopemedia.polyhedra.vec.Vector;

public class ProjectedNet {
	private final CameraTransform transform;
	private final FoldedNet fnet;

	public ProjectedNet(CameraTransform transform, FoldedNet fnet) {
		this.transform = transform;
		this.fnet = fnet;
	}
	
	public List<PolygonToDraw> getPolygonsInDrawnPosition() {
		List<PolygonToDraw> rtn = new ArrayList<PolygonToDraw>();
		LinkedHashMap<Face, PlacedPolygon> facePositions = fnet.getFacePositions();
		for (Face f : facePositions.keySet()) {
			PlacedPolygon polygon = facePositions.get(f);
			int size = polygon.size();
			List<double[]> myCorners = new ArrayList<double[]>(size);
			double[][] cornerPositions = new double[size+1][];
			for (int i=0; i<size; i++) {
				Vector cornerPosition = polygon.cornerPosition(i);
				double[] p = transform.point2DFor(cornerPosition);
				if (p[2] > 0) {
					myCorners.add(p);
					cornerPositions[i] = p;
				}
			}
			if (myCorners.size() == size) {
				cornerPositions[size] = cornerPositions[0];
				LinkedHashMap<LineSegment2D, Edge> edges = new LinkedHashMap<LineSegment2D, Edge>();
				for (int i=0; i<size; i++) {
					LineSegment2D segmnent = new LineSegment2D(cornerPositions[i],cornerPositions[i+1]);
					edges.put(segmnent, f.getEdge(i));
				}
				PolygonToDraw poly = new PolygonToDraw(myCorners, edges);
				rtn.add(poly);
			}
		}
		return rtn;
	}
	
	public LinkedHashMap<LineSegment2D, Edge> getEdgesInDrawnPositions() {
		LinkedHashMap<LineSegment2D, Edge> rtn = new LinkedHashMap<LineSegment2D, Edge>();
		Map<Edge, List<LineSegment>> edgePositions = fnet.edgePositions();
		for (Edge e : edgePositions.keySet()) {
			for (LineSegment lineSegment : edgePositions.get(e)) {
				double[] p = transform.point2DFor(lineSegment.start());
				double[] q = transform.point2DFor(lineSegment.end());
				if (p[2] < 0) {
					double[] r = p;
					p = q;
					q = r;
				}
				if (p[2] > 0) {
					if (q[2] < 0) {
//						double t = (q[2]*(1-1e-6))/(q[2]-p[2]);
//						for (int i=0; i<3; i++) {
//							q[i] = t*p[i]+(1-t)*q[i];
//						}
					}
					if (q[2] > 0) {
						LineSegment2D toDraw = new LineSegment2D(p,q);
						rtn.put(toDraw, e);
					}
				}
			}
		}
		return rtn;
	}
	
	public Edge getClosestUnjoinedOrTreeEdgeTo(double x, double y) {
		LinkedHashMap<LineSegment2D, Edge> edgesInDrawnPosition = getEdgesInDrawnPositions();
		Edge closest = null;
		double minDistance = Double.POSITIVE_INFINITY;
		for (LineSegment2D seg : edgesInDrawnPosition.keySet()) {
			Edge edge = edgesInDrawnPosition.get(seg);
			if (edge.isUnjoined() || edge.isTreeEdge()) {
				double distance = seg.distanceTo(x,y);
				if (distance < minDistance) {
					minDistance = distance;
					closest = edge;
				}
			}
		}
		return closest;
	}
}
