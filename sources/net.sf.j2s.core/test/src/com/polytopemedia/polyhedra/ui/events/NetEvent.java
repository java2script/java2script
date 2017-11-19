package com.polytopemedia.polyhedra.ui.events;

import com.polytopemedia.polyhedra.nets.Edge;
import com.polytopemedia.polyhedra.nets.Net;

public class NetEvent {

	private final Edge unjoinedOrTreeEdgeNearestScreenPoint;
	private final NetEventType type;

	public NetEvent(NetEventType type, Edge unjoinedEdgeNearestScreenPoint, Net net, NetEventSource source) {
		this.type = type;
		this.unjoinedOrTreeEdgeNearestScreenPoint = unjoinedEdgeNearestScreenPoint;
	}

	public NetEventType getType() {
		return type;
	}
	
	public Edge getEdge() {
		return unjoinedOrTreeEdgeNearestScreenPoint;
	}

}
