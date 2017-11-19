package com.polytopemedia.polyhedra.ui;

import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import com.polytopemedia.polyhedra.print.PrintModel;


class SpinnerSyncher implements ChangeListener { 

	private final double scale;
	private final JSpinner aSpinner;
	private final JSpinner bSpinner;
	private final PrintModel printModel;
	private final double toInches;

	SpinnerSyncher(JSpinner aSpinner, JSpinner bSpinner, double scale, PrintModel printModel, double toInches) {
		this.aSpinner = aSpinner;
		this.bSpinner = bSpinner;
		this.scale = scale;
		this.printModel = printModel;
		this.toInches = toInches;
	}

	public void stateChanged(ChangeEvent e) {
		double a = (Double)aSpinner.getValue();
		double b = a*scale;
		double oldb = (Double)bSpinner.getValue();
		double stepSize = (Double)((SpinnerNumberModel)bSpinner.getModel()).getStepSize();
		if (Math.abs(b-oldb) > stepSize) {
			b = (Math.round(b/stepSize)*stepSize);
			bSpinner.getModel().setValue(b);
			printModel.setEdgeLengthInches(a*toInches);
		}
	}

}
