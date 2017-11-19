package com.polytopemedia.polyhedra.ui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridLayout;
import java.util.ArrayList;

import javax.swing.ButtonGroup;
import javax.swing.JPanel;
import javax.swing.JRadioButton;

import com.polytopemedia.polyhedra.Polygon;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerEvent;
import com.polytopemedia.polyhedra.ui.events.PolygonPickerListener;


class PolygonPickerPanelArray extends JPanel implements PolygonPicker, PolygonPickerListener{ 

	private JRadioButton[] radios;

	PolygonPickerPanelArray(int number, int size, Color fgColor, Color bgColor) {
		int originalSize = size;
		panels = new PolygonPickerPanel[number];
		radios = new JRadioButton[number];
		this.setLayout(new GridLayout(1,number));
		size = size - (number/2);
		if (size < 3) size = 3;
		ButtonGroup group = new ButtonGroup();
		for (int i=0; i<number; i++) {
			int mySize = size+i;
			panels[i] = new PolygonPickerPanel(mySize, fgColor, bgColor);
			JPanel container = new JPanel();
			container.setLayout(new BorderLayout());
			container.add(panels[i],"Center");
			JPanel top = new JPanel();
			container.add(top,"North");
			JRadioButton radio = new JRadioButton();
			radios[i] = radio;
			top.add(radio);
			radio.setSelected(mySize == originalSize);
			group.add(radio);
			this.add(container);
			panels[i].addPolygonPickerListener(this, i);
		}
	}
	
	private PolygonPickerPanel[] panels;
	
	private ArrayList<PolygonPickerListener> listeners = new ArrayList<PolygonPickerListener>();
	
	public void addPolygonPickerListener(PolygonPickerListener l) {
		listeners.add(l);
	}

	public Polygon getPolygon() {
		for (int i=0; i<radios.length; i++) {
			if (radios[i].isSelected()) {
				return panels[i].getPolygon();
			}
		}
		return null;
	}

	public void polygonPicked(PolygonPickerEvent event, int index) {
		radios[index].setSelected(true);
		for (PolygonPickerListener listener : listeners) {
			listener.polygonPicked(event, -1);
		}
	}

}
