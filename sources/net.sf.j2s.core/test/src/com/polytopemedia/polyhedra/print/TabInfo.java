package com.polytopemedia.polyhedra.print;

public class TabInfo {
	private final boolean hasMatching;

	public TabInfo(boolean drawTab, String labelText, boolean hasMatching) {
		super();
		this.drawTab = drawTab;
		this.labelText = labelText;
		this.hasMatching = hasMatching;
	}
	public boolean isDrawTab() {
		return drawTab;
	}
	public String getLabelText() {
		return labelText;
	}
	private boolean drawTab;
	private String labelText;
	
	public TabInfo matching() {
		return hasMatching ? new TabInfo(!drawTab, labelText, hasMatching) : null;
	}
	
	public String toString() {
		char c = drawTab ? '!' : '-';
		return c + labelText + c;
	}
	public boolean hasMatching() {
		return hasMatching;
	}
}
