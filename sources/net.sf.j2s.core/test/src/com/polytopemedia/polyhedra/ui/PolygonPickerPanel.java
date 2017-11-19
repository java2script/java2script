package com.polytopemedia.polyhedra.ui;

import java.awt.BorderLayout;
import java.awt.Color;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import com.polytopemedia.polyhedra.Polygon;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerListener;


class PolygonPickerPanel extends JPanel implements PolygonPicker{ 

	private PolygonCanvas canvas;

	PolygonPickerPanel(int start, Color fgColor, Color bgColor) {
		JPanel top = new JPanel();
		JSpinner spinner = new JSpinner(new SpinnerNumberModel(start,3,100,1));
		canvas = new PolygonCanvas(spinner, fgColor, bgColor);
		top.add(new JLabel("Sides : "));
		top.add(spinner);
		this.setLayout(new BorderLayout());
		this.add(top,"North");
		this.add(canvas,"Center");
	}
	
	/* (non-Javadoc)
	 * @see com.polytopemedia.polyhedra.ui.PolygonPicker#addPolygonPickerListener(com.polytopemedia.polyhedra.ui.events.PolygonPickerListener)
	 */
	public void addPolygonPickerListener(PolygonPickerListener l) {
		canvas.addPolygonPickerListener(l, -1);
	}

	/* (non-Javadoc)
	 * @see com.polytopemedia.polyhedra.ui.PolygonPicker#getPolygon()
	 */
	public Polygon getPolygon() {
		return canvas.getPolygon();
	}

	void addPolygonPickerListener(
			PolygonPickerListener listener, int i) {
		canvas.addPolygonPickerListener(listener, i);
	}

}
