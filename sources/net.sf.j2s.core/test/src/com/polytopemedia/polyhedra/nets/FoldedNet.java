package com.polytopemedia.polyhedra.nets;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.polytopemedia.polyhedra.PlacedPolygon;
import com.polytopemedia.polyhedra.vec.AffineTransform;
import com.polytopemedia.polyhedra.vec.LineSegment;
import com.polytopemedia.polyhedra.vec.Vector;

public class FoldedNet {
	private final Net net;
	private final LinkedHashMap<Face, PlacedPolygon> facePositions;
	private Map<Edge, List<Vector[][]>> edgePositions;

	public FoldedNet(Net net, double[] angles) {
		this.net = net;
		this.facePositions = foldUp(angles);
	}
/** folds up the net into a folded net */
	private LinkedHashMap<Face, PlacedPolygon> foldUp(double[] angles) {
		LinkedHashMap<Face, PlacedPolygon> facePositions = new LinkedHashMap<Face, PlacedPolygon>();
		LinkedList<Face> faces = new LinkedList<Face>();
		LinkedList<PlacedPolygon> placedPolygons = new LinkedList<PlacedPolygon>();
		faces.add(net.firstFace);
		placedPolygons.add(new PlacedPolygon(net.firstFace.getPolygon(), AffineTransform.identity(), new LinkedHashMap<Integer, AffineTransform>()));
		while (faces.size() > 0) {
			Face thisFace = faces.poll();
			PlacedPolygon thisPolygon = placedPolygons.poll();
			facePositions.put(thisFace, thisPolygon);
			for (Edge e : thisFace.getTreeEdges()) {
				int foldingIndex = net.getFoldingIndexOf(e);
				if (foldingIndex < 0) {
					throw new IllegalStateException("Invalid state encountered while folding!");
				}
				double angle = angles[foldingIndex];
				Face otherFace = e.getSecondFace();
				PlacedPolygon otherPolygon = e.placeNextPolygon(thisPolygon, angle, foldingIndex);
				faces.add(otherFace);
				placedPolygons.add(otherPolygon);
			}
		}
		return facePositions;
	}
	
	/** join just those pairs of unjoined edges that happen to be touching */
	public void joinTouchingEdges() {
		List<Edge> allUnjoined = new ArrayList<Edge>();
		for (Edge edge : edgePositionsAndDerivatives().keySet()) {
			if (edge.isUnjoined()) {
				allUnjoined.add(edge);
			}
		}
		Edge[] unjoined = allUnjoined.toArray(new Edge[allUnjoined.size()]);
		List<Edge[]> toJoin = new ArrayList<Edge[]>();
		boolean[] used = new boolean[unjoined.length];
		for (int i=0; i<unjoined.length; i++) {
			if (!used[i]) {
				for (int j=i+1; j<unjoined.length; j++) {
					if (!used[i] && !used[j]) {
						Vector[][] pos1 = edgePositionsAndDerivatives().get(unjoined[i]).get(0);
						Vector[][] pos2 = edgePositionsAndDerivatives().get(unjoined[j]).get(0);
						Vector[][] differences = differences(pos1,pos2);
						double edgeMismatch = misnatch(differences[differences.length-1]);
						if (edgeMismatch < 1e-2) {
							used[i] = true;
							used[j] = true;
							toJoin.add(new Edge[]{unjoined[i], unjoined[j]});
						}
					}
				}
			}
		}
		if (toJoin.size() > 0) {
			if (toJoin.size() > 1) { 
				net.beginMultiAction();
			}
			
			for (Edge[] pair : toJoin) {
				net.join(pair[0], pair[1]);
			}
			
			if (toJoin.size() > 1) { 
				net.endMultiAction();
			}
		}
	}

	/*
	 * TODO :
	 *  * edge positions in 3D
	 *  * mismatches between edges
	 *  * transformed edges in 2D
	 *  * nearest edge to a point in the 2D space
	 */
/** evaluates how badly folded this net is by summing the mismatch between the mismatched edges 
 * @param gradient */
	double misfold(int power, double[] gradient) {
		Map<Edge, List<Vector[][]>> edgePositions = edgePositionsAndDerivatives();
		double sum = 0;
		for (Edge edge : edgePositions.keySet()) {
			List<Vector[][]> positions = edgePositions.get(edge);
			if (positions.size() == 2) {
				Vector[][] pos1 = positions.get(0);
				Vector[][] pos2 = positions.get(1);
				Vector[][] differences = differences(pos1,pos2);
				double edgeMismatch = misnatch(differences[differences.length-1]);
				double logMismatch = Math.log(edgeMismatch+1);
				double powered = logMismatch;
				double scale = 1/(edgeMismatch+1);
//				double powered = power % 2 == 0 ? Utils.pow(edgeMismatch, power/2) : Utils.pow(Math.sqrt(edgeMismatch),power);
//				double scale = edgeMismatch == 0 ? 0 : powered*power/2/edgeMismatch;
				double[] g = new double[gradient.length];
				for (int i=0; i<gradient.length; i++) {
					g[i] = 2*twoDots(differences[differences.length-1], differences[i])*scale;
				}
				double weight = weight(edge);
				sum += powered * weight;
				for (int i=0; i<g.length; i++) {
					gradient[i] += g[i]*weight;
				}
			}
		}
		return sum;
	}
	
	private double misnatch(Vector[] diff) {
		return twoDots(diff, diff);
	}
	
	private double twoDots(Vector[] diff, Vector[] other) {
		return diff[0].dot(other[0]) + diff[1].dot(other[1]);
	}
	/**
	 * pos1 and pos2 are arrays of pairs of vectors. The last pair are the actual points, the other pairs are the derivatives
	 * */
	private Vector[][] differences(Vector[][] pos1, Vector[][] pos2) {
		boolean swapped;// = false;
		//int pos = pos1.length-1;
		//Vector[] diffSwapped = {pos1[pos][0].minus(pos2[pos][1]), pos1[pos][1].minus(pos2[pos][0])}; 
		//Vector[] diffUnswapped = {pos1[pos][0].minus(pos2[pos][0]), pos1[pos][1].minus(pos2[pos][1])};
		//double swappedMismatch = misnatch(diffSwapped); 
		//double unswappedMismatch = misnatch(diffUnswapped);
		swapped = true; //swappedMismatch < unswappedMismatch;
		Vector[][] diff = new Vector[pos1.length][2];
		for (int i=0; i<pos1.length; i++) {
			for (int j=0; j<2; j++) {
				diff[i][j] = pos1[i][j].minus(pos2[i][swapped ? 1-j : j]);
			}
		}
		return diff;
	}

	
	Map<Edge, List<LineSegment>> edgePositions() {
		Map<Edge, List<Vector[][]>> edgePositionsAndDerivatives = edgePositionsAndDerivatives();
		Map<Edge, List<LineSegment>> rtn = new LinkedHashMap<Edge, List<LineSegment>>();
		for (Edge edge : edgePositionsAndDerivatives.keySet()) {
			List<Vector[][]> list = edgePositionsAndDerivatives.get(edge);
			List<LineSegment> segments = new ArrayList<LineSegment>();
			for (Vector[][] points : list) {
				Vector p = points[points.length-1][0];
				Vector q = points[points.length-1][1];
				segments.add(new LineSegment(p, q));
			}
			rtn.put(edge, segments);
		}
		return rtn;
	}
	
	private double weight(Edge edge) {
		return 1;
	}

	/** finds the positions of all the edges in this folded net */
	private Map<Edge, List<Vector[][]>> edgePositionsAndDerivatives() {
		int numberOfFolds = net.getNumberOfFolds();
		if (edgePositions == null) {
			Map<Edge, List<Vector[][]>> rtn = new LinkedHashMap<Edge, List<Vector[][]>>();
			for (Face face : facePositions.keySet()) {
				PlacedPolygon placedPolygon = facePositions.get(face);
				Vector[] corners = new Vector[placedPolygon.size()+1];
				Vector[][] derivatives = new Vector[placedPolygon.size()+1][numberOfFolds];
				for (int i=0; i<placedPolygon.size(); i++) {
					corners[i] = placedPolygon.cornerPosition(i);
					for (int j=0; j<numberOfFolds; j++) {
						derivatives[i][j] = placedPolygon.cornerDerivative(i, j);
					}
				}
				corners[placedPolygon.size()] = corners[0];
				derivatives[placedPolygon.size()] = derivatives[0];
				for (int i=0; i<placedPolygon.size(); i++) {
					Vector[][] results = new Vector[numberOfFolds+1][];
					results[numberOfFolds] = new Vector[] {corners[i], corners[i+1]};
					for (int j=0; j<numberOfFolds; j++) {
						results[j] = new Vector[] {derivatives[i][j], derivatives[i+1][j]};
					}
					Edge thisEdge = face.getEdge(i);
					if (!rtn.containsKey(thisEdge)) {
						rtn.put(thisEdge, new ArrayList<Vector[][]>());
					}
					rtn.get(thisEdge).add(results);
				}
			}
			edgePositions = rtn;
		}
		return edgePositions;
	}
	public LinkedHashMap<Face, PlacedPolygon> getFacePositions() {
		return facePositions;
	}
	
}