package edu.northwestern.physics.groups.atomic.applet;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Event;
import java.awt.Graphics;
import java.awt.GridLayout;

import javax.swing.AbstractButton;
import javax.swing.JApplet;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Label;
import a2s.Panel;
import a2s.TextField;
//Hydrogen.java
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
 * fitness for any particular purpose.                                   *
 * See the GNU General Public License for more details.                  *
 * Your milage may vary.                                                 *
 *************************************************************************/
//Modification History
//Date        Initials     Change
//2/01/98     GWA          Initial release
//2015-May-16 DPS          Fixed Unsigned Applet Problem
//Abstract:
/*
 *
 * @author Greg Anderson
 * @version 0.1, 21 Feb 1998
 */

//web_Ready
//web_AppletName= Hydrogen Levels
//web_Description= Interactive Bohr and Dirac diagrams of energy levels in the hydrogen atom
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= hydrogenlevels.png
//web_Info= width:600, height:500
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/atomic/hydrogen.html
//web_Category= Physics - Atomic
//web_Features= AWT-to-Swing, AWT-ActionEvent, canvas 

// BH only changes are (1) to replace setBackground() in the middle of a paint operation (which calls repaint!)
// BH              and (2) check for button instanceof AbstractButton, not Button

// BH no ActionListener business necessary, as these are now handled by a2s.A2SEvent

class HydrogenCanvas extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	public boolean displayLabels = true;
	public boolean trueColor = false;

	public boolean displayBalmer = true;
	public boolean displayPaschen = true;
	public boolean displayLyman = true;
	public boolean displayBrackett = true;

	public boolean displayElectricDipole = true;
	public boolean displayMagneticDipole = true;
	public boolean displayElectricQuadrupole = true;
	public boolean allowedTransition = true;

	public int displayModel = 0;

	Color darkMagenta = new Color(150, 0, 150);
	Color darkdarkGray = new Color(32, 32, 32);

	int leftSpace = 30;
	int rightSpace = 10;
	int hSpace = 10;
	int topMargin = 40;
	int bottomMargin = 10;
	int plotWidth;
	int halfWidth;
	int plotHeight;
	int halfHeight;
	int levelSpacing;
	int Z;

	int nmax = 8; // The number of radial orbitals displayed
	int lmax = 7; // The number of angular momentum states displayed

	public void displaySeries(Graphics g, int nf, int lf) {
		if (displayModel == 0) {
			for (int ni = nf + 1; ni < nmax; ni++) {
				displayTransition(g, ni, nf - 1, nf, nf - 1);
			}
		} else {
			for (int ni = nf + 1; ni <= nmax; ni++) {
				for (int li = 0; li < ni; li++) { // Conseration of Angular
					// Momentum
					if ((li == (lf + 1)) || (li == (lf - 1))) {
						displayTransition(g, ni, li, nf, lf);
					}
				}
			}
		}
	}

	public void displayTransition(Graphics g, int ni, int li, int nf, int lf) {
		if (trueColor) {
			g.setColor(Color.gray);
			if ((ni == 3) && (nf == 2)) {
				g.setColor(Color.red); // Balmer Red = 3->2
			}
			if ((ni == 4) && (nf == 2)) {
				g.setColor(Color.blue); // Balmer blue = 4->2
			}
			if ((ni == 5) && (nf == 2)) {
				g.setColor(darkMagenta); // Balmer violet = 5->2
			}
		}
		// try to keep displayed lines from crossing
		if (lf <= li) {
			g.drawLine((leftSpace - (hSpace / 2) - (5 * ni))
					+ ((li + 1) * levelSpacing), topMargin + (int) Energy(ni),
					(leftSpace - (hSpace / 2) - (5 * ni))
							+ ((lf + 1) * levelSpacing), topMargin
							+ (int) Energy(nf));
		} else {
			g.drawLine(leftSpace + (hSpace / 2) + (5 * ni)
					+ (li * levelSpacing), topMargin + (int) Energy(ni),
					leftSpace + (hSpace / 2) + (5 * ni) + (lf * levelSpacing),
					topMargin + (int) Energy(nf));
		}
	}

	void drawLevel(Graphics g, int n) { // Bohr levels only
		g.drawLine(leftSpace + (hSpace / 2), topMargin + (int) Energy(n),
				(leftSpace + plotWidth) - (hSpace / 2), topMargin
						+ (int) Energy(n));
	}

	void drawLevel(Graphics g, int n, int l) { // and (n,l) level
		g.drawLine(leftSpace + (l * levelSpacing) + (hSpace / 2), topMargin
				+ (int) Energy(n), (leftSpace + ((l + 1) * levelSpacing))
				- (hSpace / 2), topMargin + (int) Energy(n));
	}

	double Energy(int n) {
		return Energy(n, 0);
	}

	double Energy(int n, int j) {
		double E0;
		final double alpha = 1. / 137.;
		double En;
		double dE; // note, this fine structure is too small to see here
		E0 = getSize().height - topMargin - bottomMargin; // 13.6 eV
		En = (E0 * Math.pow(Z, 2)) / Math.pow(n, 2);
		dE = En
				* (Math.pow((Z * alpha) / n, 2) * ((n / (j + 0.5)) - (3. / 4.)));
		En = En + dE;
		return En;
	}

	public void initSizes() {
		plotWidth = getSize().width - leftSpace - rightSpace;
		halfWidth = plotWidth / 2;
		plotHeight = getSize().height - bottomMargin;
		halfHeight = plotHeight / 2;
		levelSpacing = plotWidth / (lmax + 1);
		Z = 1; // the number of protons
	}

	public boolean IsAllowedTransition(int li, int ji, int lf, int jf) {
		// ED (dl = +/-1 ), (dj = 0,+/-1 , ! 0->0)
		if (displayElectricDipole) {
			if ((Math.abs(li - lf) == 1) && (Math.abs(ji - jf) == 1)) {
				return true;
			}
			if ((Math.abs(li - lf) == 1) && (Math.abs(ji - jf) == 0)
					&& (jf != 0)) {
				return true;
			}
		}

		// MD (dl = 0), (dj = 0,+/- 1 !0->0)
		if (displayMagneticDipole) {
		}

		// EQ (dl = 0,+/-2), (no l= 0->0)
		if (displayElectricQuadrupole) {
		}

		return allowedTransition;
	}

	@Override
	public void paint(Graphics g) {

		initSizes();
		g.setColor(Color.black); // BH needed for Swing
		g.fillRect(0,  0,  getWidth(),  getHeight()); // BH need for Swing
		//setBackground(Color.black); // BH does not work in Java Swing
		int nf;

		g.setColor(Color.yellow);
		g.drawString("Energy Levels of ", plotWidth - 150, plotHeight - 40);
		g.drawString("the Hydrogen Atom", plotWidth - 150, plotHeight - 20);

		// axes
		g.setColor(Color.lightGray);
		g.drawLine(leftSpace, 3, leftSpace, plotHeight);
		g.drawLine(leftSpace, 3, leftSpace - 3, 6);
		g.drawLine(leftSpace, 3, leftSpace + 3, 6);
		g.drawString("Energy", leftSpace + 4, 12);
		g.drawString("0", leftSpace - 12, topMargin + 5);
		g.drawLine(leftSpace - 2, topMargin, leftSpace + 2, topMargin);

		if (displayLabels) {
			for (int n = 1; n <= nmax; n++) {
				if (n < 5) {
					g.setColor(Color.lightGray);
					g.drawString("n=" + n, 0, topMargin + (int) Energy(n) + 5);
				}
			}
			if (displayModel != 0) { // 0 = Bohr Model
				for (int l = 0; l <= lmax; l++) {
					g.setColor(Color.lightGray);
					g.drawString("l=" + l, 10 + leftSpace
							+ ((l * plotWidth) / (1 + lmax)), topMargin - 6);
				}
			}
		}

		// draw Energy Levels
		for (int n = 1; n <= nmax; n++) {
			for (int l = 0; l < n; l++) {
				g.setColor(Color.yellow);
				if (displayModel == 0) {
					drawLevel(g, n);
				}
				if (displayModel != 0) {
					drawLevel(g, n, l);
				}
			}
		}

		if (displayLyman) {
			g.setColor(Color.red);
			if (displayModel == 0) {
				displaySeries(g, 1, 0);
			} else {
				displaySeries(g, 1, 0);
			}
		}

		if (displayBalmer) {
			g.setColor(Color.magenta);
			if (displayModel == 0) {
				displaySeries(g, 2, 0);
			} else {
				nf = 2;
				for (int lf = 0; lf < nf; lf++) {
					displaySeries(g, nf, lf);
				}
			}
		}

		if (displayPaschen) {
			nf = 3;
			g.setColor(Color.blue);
			if (displayModel == 0) {
				displaySeries(g, 3, 0);
			} else {
				nf = 3;
				for (int lf = 0; lf < nf; lf++) {
					displaySeries(g, nf, lf);
				}
			}
		}

		if (displayBrackett) {
			nf = 4;
			g.setColor(Color.green);
			if (displayModel == 0) {
				displaySeries(g, 4, 0);
			} else {
				nf = 4;
				for (int lf = 0; lf < nf; lf++) {
					displaySeries(g, nf, lf);
				}
			}
		}

	}

	public void redraw(Integer Nmax, Integer Lmax) {
		nmax = Nmax.intValue();
		lmax = Lmax.intValue();
		repaint();
	}

}

class HydrogenControls extends Panel {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Checkbox Lyman;
	Checkbox Balmer;
	Checkbox Paschen;
	Checkbox Brackett;
	Checkbox TrueColor;
	Button btemp;

	TextField nmax;
	TextField lmax;
	Choice c = new Choice();
	HydrogenCanvas canvas;
	// Double dtemp;
	Integer itemp;

	public HydrogenControls(HydrogenCanvas canvas) {

		// s,p,d,f,g,h
		setLayout(new GridLayout(3, 4, 5, 5)); /* nr,nc, vg, hg */
		this.canvas = canvas;
		// Color darkMagenta = new Color(150, 0, 150);
		// Color darkGreen = new Color(0, 150, 0);

		btemp = new Button("n_max = ");
		btemp.setForeground(Color.black);
		add(btemp);
		itemp = new Integer(canvas.nmax);
		add(nmax = new TextField(itemp.toString(), 4));

		btemp = new Button("l_max = ");
		btemp.setForeground(Color.black);
		add(btemp);
		itemp = new Integer(canvas.lmax);
		add(lmax = new TextField(itemp.toString(), 4));

		TrueColor = new Checkbox("True Colors");
		TrueColor.setState(canvas.trueColor);
		add(TrueColor);
		add(new Label("", Label.LEFT));
		add(new Label("Theory:", Label.LEFT));

		c.addItem("Bohr Model");
		c.addItem("Dirac");
		add(c);

		Lyman = new Checkbox("Lyman Series");
		Lyman.setState(canvas.displayLyman);
		add(Lyman);
		Balmer = new Checkbox("Balmer Series");
		Balmer.setState(canvas.displayBalmer);
		add(Balmer);
		Paschen = new Checkbox("Paschen Series");
		Paschen.setState(canvas.displayPaschen);
		add(Paschen);
		Brackett = new Checkbox("Brackett Series");
		Brackett.setState(canvas.displayBrackett);
		add(Brackett);
	}

	@Override
	public boolean action(Event ev, Object arg) {
		// String label = (String) arg;
		if ((ev.target instanceof AbstractButton) // BH changed
				|| ((arg instanceof Boolean) || (ev.target instanceof Choice))
				|| (ev.id == Event.END)) { // Redisplay if Return
			// int Theory;
			canvas.trueColor = TrueColor.getState();
			canvas.displayLyman = Lyman.getState();
			canvas.displayBalmer = Balmer.getState();
			canvas.displayPaschen = Paschen.getState();
			canvas.displayBrackett = Brackett.getState();
			final int Theory = c.getSelectedIndex();
			if (Theory == 0) {
				canvas.displayModel = Theory;
			} else {
				canvas.displayModel = 1;
			}
			canvas.redraw(Integer.valueOf(nmax.getText().trim()),
					Integer.valueOf(lmax.getText().trim()));
			return true;
		}

		return false;
	}

}

public class HydrogenLevels extends JApplet {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	HydrogenCanvas c;
	HydrogenControls controls;
	Banner banner;

	Label appletName = new Label("Virtual Interactive Demonstration");
	Label department = new Label("Department of Physics and Astronomy");
	Label university = new Label("Northwestern University");

	@Override
	public String getAppletInfo() {
		return "HydrogenLevels by Greg Anderson";
	}

	@Override
	public boolean handleEvent(Event e) {
		if (e.id == Event.WINDOW_DESTROY) {
			System.exit(0);
		}
		return false;
	}

	@Override
	public void init() {
		setLayout(new BorderLayout());

		banner = new Banner(2, 2);
		banner.add("Center", department);
		banner.add(appletName);
		banner.add("Center", university);
		banner.add("South", new Label("G.Anderson"));
		add("North", banner);

		c = new HydrogenCanvas();
		add("Center", c);
		add("South", controls = new HydrogenControls(c));
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