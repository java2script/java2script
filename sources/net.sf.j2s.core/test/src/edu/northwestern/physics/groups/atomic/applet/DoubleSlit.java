package edu.northwestern.physics.groups.atomic.applet;

//  DoubleSlit.java  (JDK 1.0)
//
/*************************************************************************
 *                                                                       *
 * Copyright (c) 1998         Greg W. Anderson                           *
 *                                                                       *
 * This program is free software.  You can copy, modify, or redistribute *
 * this software under the terms of the GNU General Public License       *
 * as published by the Free Software Foundation; either version 2 of the *
 * License, or (at your option) any later version, provided that both    *
 * the above copyright notice appears in all copies and that this        *
 * permission notice appear in any supporting documentation.             *
 *                                                                       *
 * This software is provided "as is" in the hope that it will be useful, *
 * but WITHOUT any expressed or implied warranty of merchantability or   *
 * fitness for any particular purpose.  Your milage may vary.            *
 * See the GNU General Public License for more details.                  *
 *                                                                       *
 *************************************************************************/


//web_Ready
//web_AppletName= Double Slit
//web_Description= A simulation of diffraction
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= doubleslit.png
//web_Info= width:550, height:500
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/optics/diffraction.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas 


//  Modification History
//    Date      Initials     Change
//    2/01/98    GWA         Initial release
//    Uses JDK 1.0

/* Abstract:
 * This is a simple applet class to allow Students to
 * add two simple harmonic waves.  Students can vary
 * the amplitude and angular frequency of two simple
 * harmonic waves.
 *
 * @author Greg Anderson
 * @version 0.1, 21 Feb 1998
 */

//  NB there is a problem with odd numbered diffraction gratings
//  for the n slit pattern plotted by sin_theta
//

import java.awt.BorderLayout;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;

import java.awt.Color;
import java.awt.Event;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JApplet;

import a2s.Label;
import a2s.Panel;
import a2s.TextField;

public class DoubleSlit extends JApplet {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	DoubleSlitControls controls;
	DoubleSlitBanner banner;

	Label Collection = new Label("The Virtual Physics Laboratory");
	Label Department = new Label("Department of Physics and Astronomy");
	Label University = new Label("Northwestern University");
	Label AppletName = new Label("N-Slit Diffraction");
	{
		Collection.setForeground(Color.white);
		Department.setForeground(Color.white);
		University.setForeground(Color.white);
		AppletName.setForeground(Color.white);
	}

	/*
	@Override
	public boolean handleEvent(Event e) {
		if (e.id == Event.WINDOW_DESTROY) {
			System.exit(0);
		}
		return false;
	}
	*/

	@Override
	public void init() {
		setLayout(new BorderLayout());

		banner = new DoubleSlitBanner(2, 2);
		banner.add("Center", Department);
		banner.add(Collection);
		banner.add("Center", University);
		banner.add("South", AppletName);
		add("North", banner);

		final DoubleSlitCanvas c = new DoubleSlitCanvas(this);
		add("Center", c);
		add("South", controls = new DoubleSlitControls(c));
	}

	@Override
	public void start() {
		controls.setEnabled(true);
	}

	@Override
	public void stop() {
		controls.setEnabled(false);
	}

}

class DoubleSlitBanner extends Panel {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public DoubleSlitBanner(int n, int m) {
		final Color darkMagenta = new Color(150, 0, 150);
		setBackground(darkMagenta);
		setForeground(Color.white);
		setLayout(new GridLayout(n, m, 40, -5)); /* nr,nc, vg, hg */
	}
}

class DoubleSlitCanvas extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	static String singleslitTitle = "Single Slit Diffraction";
	static String youngTitle = "Young's Experiment";
	static String gratingTitle = "Diffraction Grating";
	public boolean displaySingleSlit = true;

	public boolean displayDoubleSlit = false;
	public boolean displayCombinedSlit = true;
	public int displayByTheta = 0;

	Color darkMagenta = new Color(150, 0, 150);

	int baseline = 300;
	int bMargin = 50;
	int I0 = baseline - bMargin - 10; // Amplitude

	int n = 2; // number of slits
	double a = 2; // slit width
	double d = 10; // slit spacing
	double lambda = 1;
	private DoubleSlit doubleSlit;

	public DoubleSlitCanvas(DoubleSlit doubleSlit) {
		super();
		this.doubleSlit = doubleSlit;
	}

	double alpha(double sin_theta) { // Single-slit arg
		return ((Math.PI * a * sin_theta) / (2 * lambda));
	}

	double beta(double sin_theta) { // N-slit argument
		return ((Math.PI * d * sin_theta) / (2 * lambda));
	}

	double combined(double sin_theta) {
		if (n == 1) {
			return sss(sin_theta);
		}
		return (((-singleSlit(sin_theta) * nSlit(sin_theta)) / I0) + baseline);
	}

	double nSlit(double sin_theta) {
		if (n == 1) {
			return singleSlit(sin_theta);
		} else {
			if (beta(sin_theta) == 0) {
				return -I0;
			}
			double nS;
			nS = -I0
					* Math.pow(
							Math.sin(n * beta(sin_theta))
							/ (n * Math.sin(beta(sin_theta))), 2);
			if (nS < -I0) {
				nS = -I0; // fixes problem for odd N
			}
			return (nS);
		}
	}

	@Override
	public void paint(Graphics g) {
		//setBackground(Color.black);
		g.setColor(Color.black);
		g.fillRect(0, 0, getSize().width, getSize().height);
		final int spacing = 30;
		final int leftSpace = 15;
		final int rightSpace = 10;
		final int plotWidth = getSize().width - leftSpace - rightSpace; // n = 0
		// -
		// plotwitdh
		final int halfWidth = plotWidth / 2;

		// axes
		g.setColor(Color.gray);
		g.drawLine(leftSpace, baseline, leftSpace, baseline - ((11 * I0) / 10));
		g.drawLine(leftSpace, baseline, plotWidth + leftSpace, baseline);
		g.drawLine(leftSpace + plotWidth, baseline, leftSpace + plotWidth,
				baseline - ((11 * I0) / 10));

		// axis labels
		// g.setColor(Color.darkGray);
		g.setColor(Color.gray);
		g.drawString("Relative", leftSpace + 2, baseline - 250);
		g.drawString("Intensity", leftSpace + 2, baseline - 240);
		g.drawString("0", 0, baseline + 5);

		if (displayByTheta == 0) {
			g.drawString("Theta", (leftSpace + (plotWidth / 2)) - 10,
					baseline + 30);
			g.drawString("-pi/2", leftSpace - 10, baseline + 15);
			g.drawString("0", (leftSpace + (plotWidth / 2)) - 2, baseline + 15);
			g.drawString("+pi/2", (leftSpace + plotWidth) - 25, baseline + 15);
		}
		if (displayByTheta == 1) {
			g.drawString("Sine(Theta)", (leftSpace + (plotWidth / 2)) - 20,
					baseline + 30);
			g.drawString("-1", leftSpace - 10, baseline + 15);
			g.drawString("0", (leftSpace + (plotWidth / 2)) - 2, baseline + 15);
			g.drawString("+1", (leftSpace + plotWidth) - 15, baseline + 15);
		}

		// MAKE SURE YOU DON'T MISS ZERO
		// test for increments within a stepsize of zero
		// Make theta a function and add an option
		// to plot as a function of theta or sign theta

		int sn;
		final double stepSize = 2 * ((Math.PI / 2) / plotWidth);
		double th; // -pi/2 < theta < pi/2
		double sin_th; // -pi/2 < theta < pi/2

		// th = -Math.PI/2. + n*stepSize;

		if (displaySingleSlit) {
			g.setColor(Color.blue);
			for (int n = 0; n < plotWidth; n++) {
				sn = n + leftSpace;
				if (displayByTheta == 0) {
					th = (-Math.PI / 2.) + (n * stepSize);
					g.drawLine(sn, (int) sss(Math.sin(th)), sn + 1,
							(int) sss(Math.sin(th + stepSize)));
				} else { // plot f( sin(theta) )
					sin_th = -1 + ((2. * n) / plotWidth);
					g.drawLine(sn, (int) sss(sin_th), sn + 1, (int) sss(sin_th
							+ (2. / plotWidth)));
				}
			}
		}

		if (displayDoubleSlit) {
			g.setColor(Color.gray);
			for (int n = 0; n < plotWidth; n++) {
				sn = n + leftSpace;
				if (displayByTheta == 0) {
					th = (-Math.PI / 2.) + (n * stepSize);
					g.drawLine(sn, (int) sds(Math.sin(th)), sn + 1,
							(int) sds(Math.sin(th + stepSize)));
				} else {
					sin_th = -1 + ((2. * n) / plotWidth);
					g.drawLine(sn, (int) sds(sin_th), sn + 1, (int) sds(sin_th
							+ (2. / plotWidth)));
				}
			}
		}

		if (displayCombinedSlit) {
			g.setColor(Color.red);
			for (int n = 0; n < plotWidth; n++) {
				sn = n + leftSpace;
				if (displayByTheta == 0) {
					th = (-Math.PI / 2.) + (n * stepSize);
					g.drawLine(sn, (int) combined(Math.sin(th)), sn + 1,
							(int) combined(Math.sin(th + stepSize)));
				} else {
					sin_th = -1 + ((2. * n) / plotWidth);
					g.drawLine(sn, (int) combined(sin_th), sn + 1,
							(int) combined(sin_th + (2. / plotWidth)));
				}
			}
		}

		g.setColor(Color.magenta);
		if (n == 1) {
			g.drawString(singleslitTitle, (leftSpace + halfWidth) - 50,
					spacing / 2);
		} else if (n == 2) {
			g.drawString(youngTitle, (leftSpace + halfWidth) - 50, spacing / 2);
		} else {
			g.drawString(gratingTitle, (leftSpace + halfWidth) - 50,
					spacing / 2);
		}
	}

	public void redraw(Integer N, Double A, Double D, Double L) {
		n = N.intValue();
		a = A.doubleValue();
		d = D.doubleValue();
		lambda = L.doubleValue();
		repaint();
	}

	double sds(double sin_theta) { // shifted double slit
		return (nSlit(sin_theta) + baseline);
	}

	double singleSlit(double sin_theta) {
		if (alpha(sin_theta) == 0) {
			return -I0;
		}
		double ss;
		ss = -I0
				* Math.pow((Math.sin(alpha(sin_theta)) / alpha(sin_theta)), 2.);
		return (ss);
	}

	double sss(double sin_theta) { // shifted single slit
		return (singleSlit(sin_theta) + baseline);
	}

}

class DoubleSlitControls extends Panel implements ActionListener {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Checkbox singleSlit;
	Checkbox doubleSlit;
	Checkbox combinedSlit;
	Button btemp;
	TextField n;
	TextField a;
	TextField d;
	TextField l;
	Choice c = new Choice();
	DoubleSlitCanvas canvas;

	public DoubleSlitControls(DoubleSlitCanvas canvas) {
		setLayout(new GridLayout(3, 4, 5, 5)); /* nr,nc, vg, hg */
		this.canvas = canvas;
		final Color darkMagenta = new Color(150, 0, 150);

		// this.setForeground(Color.black);
		// add (new Label("Number of Slits:",Label.LEFT));
		// add (new Label("",Label.LEFT));

		btemp = new Button("Number of slits: n = ");
		btemp.setForeground(darkMagenta);
		btemp.addActionListener(this); // PF added
		add(btemp);
		add(n = new TextField("2", 4));

		btemp = new Button("Slit width: a = ");
		btemp.setForeground(Color.blue);
		btemp.addActionListener(this); // PF added
		add(btemp);
		add(a = new TextField("2", 4));

		btemp = new Button("Slit Spacing: d = ");
		btemp.setForeground(darkMagenta);
		btemp.addActionListener(this); // PF added
		add(btemp);
		add(d = new TextField("10", 4));

		// btemp = new Button("Wavelength: lambda = ");
		btemp = new Button("Wavelength  = ");
		btemp.setForeground(darkMagenta);
		btemp.addActionListener(this); // PF added
		add(btemp);
		add(l = new TextField("1", 4));

		singleSlit = new Checkbox("Pure single slit");
		singleSlit.setState(canvas.displaySingleSlit);
		// singleSlit.setForeground(Color.blue)
		add(singleSlit);
		doubleSlit = new Checkbox("Pure n-slit");
		doubleSlit.setState(canvas.displayDoubleSlit);
		// doubleSlit.setColor(Color.gray)
		add(doubleSlit);
		combinedSlit = new Checkbox("Complete pattern");
		// singleSlit.setForeground(Color.red)
		combinedSlit.setState(canvas.displayCombinedSlit);
		add(combinedSlit);

		c.addItem("Plot I(theta)");
		c.addItem("Plot I(sin(theta))");
		add(c);
		
		// PF added the following
		singleSlit.addActionListener(this);
		doubleSlit.addActionListener(this);
		combinedSlit.addActionListener(this);
		c.addActionListener(this);
		n.addActionListener(this);
		a.addActionListener(this);
		d.addActionListener(this);
		l.addActionListener(this);
	}

	public void actionPerformed(ActionEvent ev) {
			int displayBy;
			canvas.displaySingleSlit = singleSlit.getState();
			canvas.displayDoubleSlit = doubleSlit.getState();
			canvas.displayCombinedSlit = combinedSlit.getState();
			displayBy = c.getSelectedIndex();
			if (displayBy == 0) {
				canvas.displayByTheta = displayBy;
			} else {
				canvas.displayByTheta = 1;
			}
			canvas.redraw(Integer.valueOf(n.getText().trim()),
					Double.valueOf(a.getText().trim()),
					Double.valueOf(d.getText().trim()),
					Double.valueOf(l.getText().trim()));
	}

}
