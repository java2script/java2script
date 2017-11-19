package com.polytopemedia.polyhedra.nets.split;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import com.polytopemedia.polyhedra.PlacedPolygon;
import com.polytopemedia.polyhedra.nets.Edge;
import com.polytopemedia.polyhedra.nets.Face;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.utils.Interval;
import com.polytopemedia.polyhedra.utils.TwoKeyMap;
import com.polytopemedia.polyhedra.utils.Utils;
import com.polytopemedia.polyhedra.vec.AffineTransform2D;
import com.polytopemedia.polyhedra.vec.Vector2D;


class FaceTree { 
	private LinkedHashMap<Face, Collection<Edge>> faces;
	private LinkedHashMap<Edge, Collection<Face>> edges;

	private FaceTree(LinkedHashMap<Face, Collection<Edge>> faces,
			LinkedHashMap<Edge, Collection<Face>> edges) {
		this.faces = faces;
		this.edges = edges;
	}

	static FaceTree buildFrom(Net net) {
		Face firstFace = net.getFirstFace();
		return traceTree(firstFace, null, null);
	}

	private Face otherFace(Face f, Edge e) {
		Face[] ff = edges.get(e).toArray(new Face[2]);
		if (f != ff[0] && f != ff[1]) return null;
		if (f == ff[0]) return ff[1];
		return ff[0];
	}

	int size() {
		return faces.size();
	}
	
	boolean contains(Face f) {
		return faces.containsKey(f);
	}

	boolean contains(Edge e) {
		return edges.containsKey(e);
	}
	
	Set<Edge> edgesBetween(Face f1, Face f2) {
		LinkedList<Edge> path = new LinkedList<Edge>();
		path = findPath(f2, null, f1, path);
		if (path == null) return null;
		return new LinkedHashSet<Edge>(path);
	}
	
	private LinkedList<Edge> findPath(Face to, Edge via, Face from, LinkedList<Edge> pathSoFar) {
		for (Edge nextEdge : faces.get(from)) {
			if (nextEdge != via) {
				pathSoFar.add(nextEdge);
				Face nextFace = otherFace(from, nextEdge);
				if (nextFace == to) {
					return pathSoFar;
				}
				LinkedList<Edge> pathFound = findPath(to, nextEdge, nextFace, pathSoFar);
				if (pathFound != null) {
					return pathFound;
				}
				pathSoFar.removeLast();
			}
		}
		return null;
	}

	private static FaceTree traceTree(Face firstFace, Edge forbidden, FaceTree supertree) {
		LinkedHashMap<Face, Collection<Edge>> faces = new LinkedHashMap<Face, Collection<Edge>>();
		LinkedHashMap<Edge, Collection<Face>> edges = new LinkedHashMap<Edge, Collection<Face>>();
		LinkedList<Face> facesToExamine = new LinkedList<Face>();
		LinkedList<Edge> edgesToExamine = new LinkedList<Edge>();
		HashSet<Face> facesSeen = new HashSet<Face>();
		HashSet<Edge> edgesSeen = new HashSet<Edge>();
		facesToExamine.add(firstFace);
		while (!facesToExamine.isEmpty() || !edgesToExamine.isEmpty()) {
			if (!facesToExamine.isEmpty()) {
				Face face = facesToExamine.poll();
				facesSeen.add(face);
				List<Edge> myEdges;
				if (supertree == null) {
					myEdges = new ArrayList<Edge>(
						face.getTwoWayTreeEdges());
				} else {
					myEdges = new ArrayList<Edge>(supertree.faces.get(face));
				}
				if (forbidden != null) {
					myEdges.remove(forbidden);
				}
				faces.put(face, myEdges);
				for (Edge edge : myEdges) {
					if (!edges.containsKey(edge) && !edgesSeen.contains(edge)) {
						edgesToExamine.add(edge);
					}
				}
			}
			if (!edgesToExamine.isEmpty()) {
				Edge edge = edgesToExamine.poll();
				edgesSeen.add(edge);
				List<Face> myFaces = Arrays.asList(edge.getFaces());
				edges.put(edge, myFaces);
				for (Face face : myFaces) {
					if (!faces.containsKey(face) && !facesSeen.contains(face)) {
						facesToExamine.add(face);
					}
				}
			}
		}
		return new FaceTree(faces, edges);
	}

	FaceTree[] split(Edge e) {
		FaceTree first = traceTree(e.getFirstFace(), e, this);
		FaceTree second = traceTree(e.getSecondFace(), e, this);
		return new FaceTree[] { first, second };
	}

	/** returns an affine transform that fits this facetree on the given paper size, or null if this is impossible */
	AffineTransformAndBoundingRectangle fitOnPaper(double imageableWidth, double imageableHeight, double edgeLength,
			LinkedHashMap<Face, PlacedPolygon> facePositions,
			TwoKeyMap<PlacedPolygon, Vector2D, Interval> intervalCache, double pageCentreX, double pageCentreY) {
		double width = imageableWidth / edgeLength;
		double height = imageableHeight / edgeLength;
		TreeSet<Vector2D> points = getPoints(facePositions);
		Vector2D[] hull = Utils.convexHull(points).toArray(new Vector2D[0]);
		TreeSet<Vector2D> axes = new TreeSet<Vector2D>();
		for (int i=0; i<hull.length-1; i++) {
			Vector2D dir = hull[i+1].minus(hull[i]);
			if (dir.length() > 1e-6) {
				dir = dir.normalise();
				if (dir.getFirst() < 0) dir = dir.times(-1);
				if (dir.getFirst() == 0 && dir.getSecond() < 0) dir = dir.times(-1);
				axes.add(dir);
				dir = dir.normal();
				if (dir.getFirst() < 0) dir = dir.times(-1);
				if (dir.getFirst() == 0 && dir.getSecond() < 0) dir = dir.times(-1);
				axes.add(dir);
			}
		}
		double bestLengthRatio= Double.POSITIVE_INFINITY;
		double bestHorizontalRatio= Double.NaN;
		double bestVerticalRatio= Double.NaN;
		Vector2D bestAxis = null;
		Vector2D bestNormal = null;
		Interval bestHorizontalInterval=null;
		Interval bestVerticalInterval=null;
		for (Vector2D axis : axes) {
			Vector2D normal = axis.normal();
			Interval horizontal = Utils.projectionInterval(axis, hull);
			Interval vertical= Utils.projectionInterval(normal, hull);
			double verticalLength=vertical.length();
			double horizontalLength = horizontal.length();
			double horizontalLengthRatio = horizontalLength/width;
			double verticalLengthRatio = verticalLength/height;
			double lengthRatio = Math.max(verticalLengthRatio, horizontalLengthRatio);
			if (lengthRatio < bestLengthRatio) {
				bestLengthRatio = lengthRatio;
				bestAxis = axis;
				bestHorizontalInterval = horizontal;
				bestVerticalInterval = vertical;
				bestHorizontalRatio = horizontalLengthRatio;
				bestVerticalRatio = verticalLengthRatio;
				bestNormal = normal;
			}
		}
		AffineTransform2D transform = AffineTransform2D.buildInverseFrom(bestAxis, bestNormal, bestHorizontalInterval.mid(), bestVerticalInterval.mid());
		transform = transform.scale(edgeLength);
		transform = transform.translate(pageCentreX, pageCentreY);
		return new AffineTransformAndBoundingRectangle(transform, bestHorizontalRatio, bestVerticalRatio);
	}

	private TreeSet<Vector2D> getPoints(
			LinkedHashMap<Face, PlacedPolygon> facePositions) {
		TreeSet<Vector2D> rtn = new TreeSet<Vector2D>();
		for (Face face : faces.keySet()) {
			PlacedPolygon poly = facePositions.get(face);
			Vector2D[] corners = poly.cornerPositionProjections();
			rtn.addAll(Arrays.asList(corners));
		}
		return rtn;
	}

	public Set<Edge> getEdges() {
		return edges.keySet();
	}

	public Set<Face> getFaces() {
		return faces.keySet();
	}

}
