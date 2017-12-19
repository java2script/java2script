package com.polytopemedia.polyhedra.nets;

import java.util.ArrayList;
import java.util.List;

import com.polytopemedia.polyhedra.Polygon;

public class Face {
	private static int nextID = 0;
	private int id = nextID++;
	private final Polygon polygon;
	private final Edge[] edges;
	private List<Edge> treeEdges;

	Face(Polygon p) {
		this(p,null);
	}

	Face(Polygon p, Edge e) {
		this.polygon = p;
		int n = p.size();
		this.edges = new Edge[n];
		for (int i=0; i<n; i++) {
			if (i == 0 && e != null) {
				edges[i] = e;
			} else {
				edges[i] = new Edge(this, i, null, -1);
			}
		}
		treeEdges = new ArrayList<Edge>();
	}

	public Edge getEdge(int e) {
		return edges[e];
	}

	public Edge[] getEdges() {
		return edges;
	}

	void addTreeEdge(Edge edge) {
		treeEdges.add(edge);
	}

	void setEdge(int i, Edge e) {
		edges[i] = e;
	}

	public Polygon getPolygon() {
		return polygon;
	}

	public List<Edge> getTreeEdges() {
		return treeEdges;
	}
	
	public List<Edge> getTwoWayTreeEdges() {
		List<Edge> rtn = new ArrayList<Edge>();
		for (Edge e : getEdges()) {
			if (isTwoWayTreeEdge(e)) {
				rtn.add(e);
			}
		}
		return rtn;
	}
	
	private boolean isTwoWayTreeEdge(Edge e) {
		if (isTreeEdge(e)) {
			return true;
		}
		if (e.isUnjoined()) {
			return false;
		}
		Face other = e.getOtherFace(this);
		return other.isTreeEdge(e);
	}

	private boolean isTreeEdge(Edge e) {
		return treeEdges.contains(e);
	}

	public String toString() {
		return "Face:"+id;
	}

}
