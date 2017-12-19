package com.polytopemedia.polyhedra.print;

public class Label {
	private final String text;
	private final double x;
	private final double y;
	private final boolean hasMatching;
	public Label(String text, double x, double y, boolean hasMatching) {
		this.text = text;
		this.x = x;
		this.y = y;
		this.hasMatching = hasMatching;
	}
	public String getText() {
		return text;
	}
	public double getX() {
		return x;
	}
	public double getY() {
		return y;
	}
	boolean hasMatching() {
		return hasMatching;
	}
}
