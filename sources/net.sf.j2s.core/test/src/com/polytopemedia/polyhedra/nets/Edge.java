package com.polytopemedia.polyhedra.nets;

import com.polytopemedia.polyhedra.PlacedPolygon;

public class Edge {

	private static int nextID = 0;
	private int id = nextID++;
	private final Face face1;
	private Face face2;
	private final int i1;
	private int i2;

	Edge(Face face1, int i1, Face face2, int i2) {
		this.face1 = face1;
		this.face2 = face2;
		this.i1 = i1;
		this.i2 = i2;
	}

	public boolean isUnjoined() {
		return face2 == null;
	}

	void join(Face f, int i) {
		if (!isUnjoined()) {
			return;
		}
		face2 = f;
		i2 = i;
		face1.addTreeEdge(this);
	}

	Edge joinWith(Edge other) {
		if (!this.isUnjoined() || !other.isUnjoined()) {
			return null;
		}
		Edge e = new Edge(this.face1, this.i1, other.face1, other.i1);
		this.face1.setEdge(this.i1,e);
		other.face1.setEdge(other.i1,e);
		return e;
	}

	PlacedPolygon placeNextPolygon(PlacedPolygon thisPolygon,
			double theta, int foldingIndex) {
		return thisPolygon.getAttached(face2.getPolygon(), i1, i2, theta, foldingIndex);
	}

	public String toString() {
		return "Edge:"+id;
	}

	public Face getSecondFace() {
		return face2;
	}
	public Face getFirstFace() {
		return face1;
	}
	public Face[] getFaces() {
		return new Face[] {face1, face2};
	}

	Face getOtherFace(Face face) {
		if (face == face1) {
			return face2;
		}
		if (face == face2) {
			return face1;
		}
		return null;
	}

	public boolean isTreeEdge() {
		if (face2 == null) return false;
		return (face1.getTreeEdges().contains(this) || face2.getTreeEdges().contains(this)); 
	}
	
}
