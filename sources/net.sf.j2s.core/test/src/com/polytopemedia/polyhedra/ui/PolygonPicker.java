package com.polytopemedia.polyhedra.ui;

import com.polytopemedia.polyhedra.Polygon;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerListener;


interface PolygonPicker {
	public abstract void addPolygonPickerListener(PolygonPickerListener l);

	public abstract Polygon getPolygon();

}