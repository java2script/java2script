package com.polytopemedia.polyhedra.ui;

import java.awt.Color;
import java.util.HashMap;

public class MarkColors {
	
	public MarkColors(Color selected, Color clicked, Color selectedTree) {
		setColorFor(Mark.selected, selected);
		setColorFor(Mark.clicked, clicked);
		setColorFor(Mark.selectedTree, selectedTree);
	}
	
	Color getColorFor(Mark mark) {
		return colors.get(mark);
	}
	
	private Color setColorFor(Mark mark, Color color) {
		return colors.put(mark, color);
	}
	
	private HashMap<Mark, Color> colors = new HashMap<Mark, Color>();
}
