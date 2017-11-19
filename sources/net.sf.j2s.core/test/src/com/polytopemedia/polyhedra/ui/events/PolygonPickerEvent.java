package com.polytopemedia.polyhedra.ui.events;

import com.polytopemedia.polyhedra.Polygon;

public class PolygonPickerEvent {

	private final Polygon polygon;

	public PolygonPickerEvent(Polygon polygon) {
		this.polygon = polygon;
	}

	public Polygon getPolygon() {
		return polygon;
	}
}
