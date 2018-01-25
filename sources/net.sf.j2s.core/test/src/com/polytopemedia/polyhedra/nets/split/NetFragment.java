package com.polytopemedia.polyhedra.nets.split;

import java.awt.print.PageFormat;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
import java.util.Set;

import com.polytopemedia.polyhedra.PlacedPolygon;
import com.polytopemedia.polyhedra.nets.Edge;
import com.polytopemedia.polyhedra.nets.Face;
import com.polytopemedia.polyhedra.nets.FoldedNet;
import com.polytopemedia.polyhedra.nets.Net;
import com.polytopemedia.polyhedra.print.Label;
import com.polytopemedia.polyhedra.print.LineType;
import com.polytopemedia.polyhedra.print.TabInfo;
import com.polytopemedia.polyhedra.print.TabLabelGenerator;
import com.polytopemedia.polyhedra.utils.Interval;
import com.polytopemedia.polyhedra.utils.TwoKeyMap;
import com.polytopemedia.polyhedra.utils.Utils;
import com.polytopemedia.polyhedra.vec.AffineTransform2D;
import com.polytopemedia.polyhedra.vec.LineSegment2D;
import com.polytopemedia.polyhedra.vec.Vector;
import com.polytopemedia.polyhedra.vec.Vector2D;

public class NetFragment {
	
	public NetFragment(Net net, PageFormat pageFormat, double edgeLengthInches) {
		this.net = net;
		this.paper = pageFormat;
		this.edgeLengthInches = edgeLengthInches;
		foldedNetFacePositions = new FoldedNet(net, net.getLastFoldingAngles()).getFacePositions();
		flatNet = new FoldedNet(net, new double[net.getNumberOfFolds()]);
		flatNetFacePositions = flatNet.getFacePositions();
		intervalCache = new TwoKeyMap<PlacedPolygon, Vector2D, Interval>();
		faceTree = FaceTree.buildFrom(net);
		pairsToSeparate = findPairsToSeparate(flatNetFacePositions, intervalCache);
		transformToPaper = fitOnPaper(faceTree);
	}

	public List<NetFragment> shatter() {
		List<NetFragment> rtn = new ArrayList<NetFragment>();
		LinkedList<NetFragment> toBreak = new LinkedList<NetFragment>();
		toBreak.add(this);
		while (toBreak.size() > 0) {
			NetFragment next = toBreak.poll();
			if (next.fitsOnPaper() || next.size() == 1) {
				rtn.add(next);
			} else {
				NetFragment[] optimalSplit = next.splitOptimally();
//				System.out.println(next.size() + " broken into "+optimalSplit[0].size()+"&"+optimalSplit[1].size());
				for (NetFragment bit : optimalSplit) {
					toBreak.add(bit);
				}
			}
		}
		return rtn;
	}

	private int size() {
		return faceTree.size();
	}

	private boolean fitsOnPaper() {
		return pairsToSeparate.size() == 0 && !transformToPaper.ratiosTooBig();
	}

	private Net net;
	private NetFragment(Net net, LinkedHashMap<Face[], Set<Edge>> pairsToSeparate,
			FaceTree faceTree,
			AffineTransformAndBoundingRectangle transformToPaper,
			LinkedHashMap<Face, PlacedPolygon> flatNetFacePositions,
			LinkedHashMap<Face, PlacedPolygon> foldedNetFacePositions,
			TwoKeyMap<PlacedPolygon, Vector2D, Interval> intervalCache,
			FoldedNet foldedNet, PageFormat paper, double edgeLengthMillis) {
		this.net = net;
		this.pairsToSeparate = pairsToSeparate;
		this.faceTree = faceTree;
		this.transformToPaper = transformToPaper;
		this.flatNetFacePositions = flatNetFacePositions;
		this.foldedNetFacePositions = foldedNetFacePositions;
		this.intervalCache = intervalCache;
		this.flatNet = foldedNet;
		this.paper = paper;
		this.edgeLengthInches = edgeLengthMillis;
	}

	private LinkedHashMap<Face[], Set<Edge>> pairsToSeparate;
	private FaceTree faceTree;
	private AffineTransformAndBoundingRectangle transformToPaper;
	private LinkedHashMap<Face, PlacedPolygon> flatNetFacePositions;
	private TwoKeyMap<PlacedPolygon, Vector2D, Interval> intervalCache;
	private FoldedNet flatNet;
	private final PageFormat paper;
	private final double edgeLengthInches;
	private LinkedHashMap<Face, PlacedPolygon> foldedNetFacePositions;


	public PaperToSpaceMap[] getPolygonsToColor() {
		Set<Face> faces = faceTree.getFaces();
		PaperToSpaceMap[] rtn = new PaperToSpaceMap[faces.size()];
		int count = 0;
		for (Face face : faces) {
			PlacedPolygon polygonOnPlane = flatNetFacePositions.get(face);
			PlacedPolygon polygonInSpace = foldedNetFacePositions.get(face);
			Vector2D[] cornersOnPlane = polygonOnPlane.cornerPositionProjections();
			Vector2D[] cornersOnPaper = new Vector2D[cornersOnPlane.length];
			Vector[] cornersInSpace = polygonInSpace.cornerPositions();
			for (int i=0; i<cornersOnPaper.length; i++) {
				cornersOnPaper[i] = transformToPaper.getTransform().transformPoint(cornersOnPlane[i]);
			}
			rtn[count] = new PaperToSpaceMap(cornersOnPaper, cornersInSpace);
			count++;

		}
		return rtn;
	}

	
	
	public void generateLinesAndLabels(LinkedHashMap<LineSegment2D, LineType> lines, List<Label> labels, TwoKeyMap<Face, Edge, TabInfo> tabinfo, boolean lineLabelsIn) {
		AffineTransform2D transform = transformToPaper.getTransform();
		for (Face ff : faceTree.getFaces()) {
			PlacedPolygon pp = flatNetFacePositions.get(ff);
			Vector2D[] corners = pp.cornerPositionProjections();
			Vector2D[] transformed = new Vector2D[corners.length+1];
			for (int i=0; i<corners.length; i++) {
				transformed[i] = transform.transformPoint(corners[i]);
			}
			transformed[corners.length] = transformed[0];
			for (int i=0; i<corners.length; i++) {
				Vector2D t1 = transformed[i];
				Vector2D t2 = transformed[i+1];
				lines.put(new LineSegment2D(t1, t2),LineType.edge);
				Edge edge = ff.getEdge(i);
				if (tabinfo.containsKeys(ff, edge)) {
					TabInfo tabInfo = tabinfo.get(ff, edge);
					Vector2D dt = t2.minus(t1);
					Vector2D td = dt.normal();
					Vector2D labelPos;
					LineType lineType = tabInfo.hasMatching() ? LineType.tab : LineType.unmatchedTab;
					double labelOut;
					if (tabInfo.isDrawTab()) {
						Vector2D tp1 = t1.plus(dt.times(0.25/Math.sqrt(3))).plus(td.times(-0.25));
						Vector2D tp2 = t2.plus(dt.times(-0.25/Math.sqrt(3))).plus(td.times(-0.25));
						lines.put(new LineSegment2D(t1, tp1),lineType);
						lines.put(new LineSegment2D(tp1, tp2),lineType);
						lines.put(new LineSegment2D(tp2, t2),lineType);
						labelOut = -0.125;
					} else {
						labelOut = lineLabelsIn ? 0.125 : -0.125;
					}
					labelPos = t1.plus(dt.times(0.5).plus(td.times(labelOut)));
					labels.add(new Label(tabInfo.getLabelText(), labelPos.getFirst(), labelPos.getSecond(), tabInfo.hasMatching()));
				}
			}
		}
	}
	
	private static final int MAX=20;
	
	private NetFragment[] splitOptimally() {
		if (fitsOnPaper()) {
			return new NetFragment[] {this};
		}
		Set<Edge> edges = getPriorityEdges();
//		System.out.println(this.size() + " has " + edges.size()+" priority edges...   NetFragment.splitOptimally()");
		Set<NetFragment[]> neitherFOOP = new LinkedHashSet<NetFragment[]>();
		Set<NetFragment[]> oneFOOP = new LinkedHashSet<NetFragment[]>();
		Set<NetFragment[]> bothFOOP = new LinkedHashSet<NetFragment[]>();
		if (edges.size() > MAX) {
			Random rr = new Random(net.countFolds());
			Edge[] asArray = edges.toArray(new Edge[]{});
			while (edges.size() > MAX) {
				edges.remove(asArray[rr.nextInt(asArray.length)]);
			}
		}
		for (Edge e : edges) {
			NetFragment[] parts = this.split(e);
			boolean part0fits = parts[0].fitsOnPaper();
			boolean part1fits = parts[1].fitsOnPaper();
			if (part0fits && part1fits) {
				bothFOOP.add(parts);
			} else if (!part0fits && !part1fits) {
				neitherFOOP.add(parts);
			} else {
				oneFOOP.add(parts);
			}
		}
		if (!bothFOOP.isEmpty()) {
			return mostBalancedSizes(bothFOOP);
		}
		if (!oneFOOP.isEmpty()) {
			return oneWithBiggestBitThatFOOP(oneFOOP);
		}
//		if (!neitherFOOP.isEmpty()) {
			return mostBalancedFaceCounts(neitherFOOP);
//		}
		
	}
	
	private NetFragment[] mostBalancedFaceCounts(Set<NetFragment[]> neitherFOOP) {
		NetFragment[] best = null;
		int lowestDifference = Integer.MAX_VALUE;
		for (NetFragment[] bits : neitherFOOP) {
			int count0 = bits[0].size();
			int count1 = bits[1].size();
			int difference = Math.abs(count0-count1);
			if (difference < lowestDifference) {
				lowestDifference = difference;
				best = bits;
			}
		}
		return best;
	}

	private NetFragment[] mostBalancedSizes(Set<NetFragment[]> bothFOOP) {
		NetFragment[] best = null;
		double bestRatio = 100;
		for (NetFragment[] bits : bothFOOP) {
			double ratio0 = bits[0].transformToPaper.biggestRatio();
			double ratio1 = bits[1].transformToPaper.biggestRatio();
			double difference = Math.abs(ratio0-ratio1);
			if (difference < bestRatio) {
				bestRatio = difference;
				best = bits;
			}
		}
		return best;
	}

	private NetFragment[] oneWithBiggestBitThatFOOP(Set<NetFragment[]> oneFOOP) {
		NetFragment[] best = null;
		double bestRatio = -1;
		for (NetFragment[] bits : oneFOOP) {
			NetFragment bit = null;
			if (bits[0].fitsOnPaper()) {
				bit = bits[0];
			} else {
				bit = bits[1];
			}
			double ratio = bit.transformToPaper.biggestRatio();
			if (ratio > bestRatio) {
				bestRatio = ratio;
				best = bits;
			}
		}
		return best;
	}

	private Set<Edge> getPriorityEdges() {
		if (pairsToSeparate.size() == 0) {
			return faceTree.getEdges();
		}
		LinkedHashMap<Edge, Integer> splitCounts = new LinkedHashMap<Edge, Integer>();
		for (Face[] faces : pairsToSeparate.keySet()) {
			Set<Edge> path = faceTree.edgesBetween(faces[0], faces[1]);
			if (path == null) {
				System.out.println("NetFragment.getPriorityEdges()");
			}
			for (Edge e : path) {
				if (!splitCounts.containsKey(e)) {
					splitCounts.put(e, 1);
				} else {
					splitCounts.put(e, splitCounts.get(e)+1);
				}
			}
		}
		int max = 0;
		Set<Edge> rtn = new LinkedHashSet<Edge>();
		for (Edge e : splitCounts.keySet()) {
			int splits = splitCounts.get(e);
			if (splits > max) {
				max = splits;
				rtn.clear();
			}
			if (splits == max) {
				rtn.add(e);
			}
		}
		return rtn;
	}

	
	
	private NetFragment[] split(Edge e) {
		if (!faceTree.contains(e)) {
			return null;
		}
		FaceTree[] splitFaceTrees = faceTree.split(e);
		LinkedHashMap<Face[], Set<Edge>>[] splitPairsToSeparate = new LinkedHashMap[2];
		AffineTransformAndBoundingRectangle[] splitTransform = new AffineTransformAndBoundingRectangle[2];
		NetFragment[] rtn = new NetFragment[2];
		for (int i=0; i<2; i++) {
			splitPairsToSeparate[i] = new LinkedHashMap<Face[], Set<Edge>>();
			for (Face[] facePair : pairsToSeparate.keySet()) {
				if (splitFaceTrees[i].contains(facePair[0]) && splitFaceTrees[i].contains(facePair[1])) {
					splitPairsToSeparate[i].put(facePair, pairsToSeparate.get(facePair));
				}
			}
			splitTransform[i] = fitOnPaper(splitFaceTrees[i]);
			rtn[i] = new NetFragment(net, splitPairsToSeparate[i], splitFaceTrees[i], splitTransform[i], flatNetFacePositions, foldedNetFacePositions, intervalCache, flatNet,paper, edgeLengthInches);
		}
		return rtn;
	}

	private AffineTransformAndBoundingRectangle fitOnPaper(FaceTree faceTree) {
		double imageableWidth = paper.getImageableWidth();
		double centreX = paper.getImageableX()+imageableWidth/2;
		double imageableHeight = paper.getImageableHeight();
		double centreY = paper.getImageableY()+imageableHeight/2;
		return faceTree.fitOnPaper(imageableWidth, imageableHeight, this.edgeLengthInches*72, flatNetFacePositions, intervalCache, centreX, centreY);
	}
	

	private LinkedHashMap<Face[], Set<Edge>> findPairsToSeparate(LinkedHashMap<Face, PlacedPolygon> facePositions, TwoKeyMap<PlacedPolygon, Vector2D, Interval> intervalCache) {
		Face[] allfaces = facePositions.keySet().toArray(new Face[0]);
		ArrayList<Face[]> facePairs = new ArrayList<Face[]>();
		for (int i=0; i<allfaces.length-1; i++) {
			for (int j=i+1; j<allfaces.length; j++) {
				PlacedPolygon p1 = facePositions.get(allfaces[i]);
				PlacedPolygon p2 = facePositions.get(allfaces[j]);
				// TODO non-convex polys??
				boolean separated = Utils.areSeparated(p1,p2, intervalCache);
				if (!separated) {
					facePairs.add(new Face[] {allfaces[i],allfaces[j]});
				}
			}
		}
		LinkedHashMap<Face[], Set<Edge>> rtn = new LinkedHashMap<Face[], Set<Edge>>();
		for (Face[] ff : facePairs) {
			rtn.put(ff, faceTree.edgesBetween(ff[0], ff[1]));
		}
		return rtn;
	}

	public void generateTabInfo(TabLabelGenerator tabLabels, TwoKeyMap<Face, Edge, TabInfo> allTabInfo) {
		for (Face face : faceTree.getFaces()) {
			for (Edge edge : face.getEdges()) { // the face has all its edges
				if (!faceTree.contains(edge)) { // but the facetree only has its own tree edges
					if (allTabInfo.filter2(edge).isEmpty()) {
						// new edge encountered
						String labelText;
						if (edge.isUnjoined()) {
							labelText = "?";
						} else {
							labelText = tabLabels.getAndBump();
						}
						TabInfo tabInfo = new TabInfo(true, labelText, !edge.isUnjoined());
						allTabInfo.put(face, edge, tabInfo);
					} else {
						// seen this edge before
						TabInfo otherInfo = allTabInfo.filter2(edge).values().iterator().next();
						allTabInfo.put(face, edge, otherInfo.matching());
					}
				}
			}
		}
	}
	
	
	
	
}
