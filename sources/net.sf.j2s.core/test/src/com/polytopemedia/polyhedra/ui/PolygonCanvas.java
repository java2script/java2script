package com.polytopemedia.polyhedra.ui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.LinkedHashMap;

import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import com.polytopemedia.polyhedra.Polygon;
import com.polytopemedia.polyhedra.RegularPolygon;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerEvent;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerListener;


@SuppressWarnings("serial")
class PolygonCanvas extends JPanel implements ChangeListener, MouseListener{ 

	private final JSpinner spinner;
	private int n;
	private final Color fgColor;

	PolygonCanvas(JSpinner spinner, Color fgColor, Color bgColor) {
		this.spinner = spinner;
		this.fgColor = fgColor;
		this.setPreferredSize(new Dimension(100,100));
		spinner.addChangeListener(this);
		this.setBackground(bgColor);
		this.addMouseListener(this);
		updateN();
	}

	private void updateN() {
		this.n = (Integer)(spinner.getModel().getValue());
		repaint();
	}

	public void stateChanged(ChangeEvent e) {
		updateN();
	}
	
	public void paintComponent(Graphics gr) {
		super.paintComponent(gr);
		double centreX = getWidth()/2.0;
		double centreY = getHeight()/2.0;
		double radius = Math.min(centreX, centreY)/1.1;
		double[][] points = new double[n+1][];
		double angleOffset = -Math.PI/n;
		for (int i=0; i<n; i++) {
			double angle = i*Math.PI*2/n-angleOffset;
			points[i] = new double[] {-Math.sin(angle), Math.cos(angle)};
		}
		for (int i=0; i<n; i++) {
			points[i][0] = radius*points[i][0]+centreX;
			points[i][1] = radius*points[i][1]+centreY;
		}
		points[n] = points[0];
		gr.setColor(fgColor);
		for (int i=0; i<n; i++) {
			int x1 = (int)Math.round(points[i][0]);
			int y1 = (int)Math.round(points[i][1]);
			int x2 = (int)Math.round(points[i+1][0]);
			int y2 = (int)Math.round(points[i+1][1]);
			gr.drawLine(x1,y1,x2,y2);
		}
	}
	
	private LinkedHashMap<PolygonPickerListener, Integer> polygonListeners = new LinkedHashMap<PolygonPickerListener, Integer>();

	void addPolygonPickerListener(PolygonPickerListener l, int i) {
		polygonListeners.put(l,i);
	}

	public void mouseClicked(MouseEvent e) {
		firePolygonPicked();
	}

	private void firePolygonPicked() {
		PolygonPickerEvent event = new PolygonPickerEvent(getPolygon());
		for (PolygonPickerListener l:polygonListeners.keySet()) {
			l.polygonPicked(event, polygonListeners.get(l));
		}
	}

	public void mousePressed(MouseEvent e) {}
	public void mouseReleased(MouseEvent e) {}
	public void mouseEntered(MouseEvent e) {}
	public void mouseExited(MouseEvent e) {}

	public Polygon getPolygon() {
		return new RegularPolygon(n);
	}

	
	
}
