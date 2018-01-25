package edu.northwestern.physics.groups.atomic.applet;

//  Snell.java
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

//  Modification History
//    Date      Initials     Change
//    2/01/98    GWA         Initial release
//  Abstract:
/*
 *
 * @author Greg Anderson
 * @version 0.1, 21 Feb 1998
 */
import java.awt.BorderLayout;

import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Applet;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Image;

import a2s.Label;
import a2s.Panel;

import java.awt.Point;

import a2s.TextField;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.text.NumberFormat;

import javax.swing.Timer;


//web_Ready
//web_AppletName= SnellGraph
//web_Description= An illustration of Snell's Law
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= snellgraph.png
//web_Info= width:550, height:500
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/optics/snell.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas 

class SnellCanvas extends Panel implements Runnable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	public SnellStatus snellStatus;
	private final SnellUpCanvas snellUpCanvas;
	private final SnellDownCanvas snellDownCanvas;

	private Timer demo;

	private boolean stopRunning = false;

	SnellCanvas() {
		snellStatus = new SnellStatus(this);
		snellUpCanvas = new SnellUpCanvas(snellStatus);
		snellDownCanvas = new SnellDownCanvas(snellStatus);

		setLayout(new GridLayout(2, 1, 0, 0));
		add(snellUpCanvas);
		add(snellDownCanvas);

	}

	public void advance() {
		snellUpCanvas.advance();
		snellDownCanvas.advance();
	}

	public void init() {
		snellStatus.init();
		snellUpCanvas.init();
		snellDownCanvas.init();
	}

	public void redraw(Double N1, Double N2, Double Theta) {
		snellStatus.n1 = N1.doubleValue();
		snellStatus.n2 = N2.doubleValue();
		snellStatus.theta1 = ((2 * Math.PI) * Theta.doubleValue()) / 360.;
		snellStatus.setTheta2();
		snellStatus.setIntensities();
		init();
		repaint();
	}

//	@Override
//	public void repaint() {
//	    if (snellUpCanvas == null) return; // PF add to avoid crash
//	//	snellUpCanvas.repaint();
//	//	snellDownCanvas.repaint();
//	}

	public void reset() {
		snellUpCanvas.reset();
		snellDownCanvas.reset();
	}

	public void run() {
	    /*
		while (!stopRunning) {
			advance();
			repaint();
			try {
				Thread.sleep(60);
			} catch (final InterruptedException e) {
//				
			}
		}
*/
	}

	public void start() {
		if (demo == null) {
			stopRunning = false;
			// PF converted thread to timer for swingjs
			demo = new Timer(60, new ActionListener() {
			    public void actionPerformed(ActionEvent evt) {
				advance();
				repaint();
			    }
			});
			demo.start();
		}
	}

	public void stop() {
		if (demo != null) {
		    	demo.stop();
			stopRunning = true;
			demo = null;
		}
	}
}

class SnellControls extends Panel {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Checkbox Incident;
	Checkbox Reflected;
	Checkbox Refracted;
	Checkbox Normal;
	Label btemp;
	TextField n1;
	TextField n2;
	TextField theta;
	Choice c = new Choice();
	SnellStatus status;
	Double dtemp;

	public SnellControls(SnellStatus status) {
		setLayout(new GridLayout(3, 4, 5, 5)); /* nr,nc, vg, hg */
		this.status = status;
		// Color darkMagenta = new Color(150, 0, 150);
		final Color darkGreen = new Color(0, 150, 0);

		btemp = new Label("       n1 = ");
		btemp.setForeground(Color.black);
		add(btemp);
		dtemp = new Double(status.n1);
		n1 = new TextField(dtemp.toString(), 4);
		n1.addActionListener(status.getIncidentNListener());
		add(n1);

		btemp = new Label("        n2 = ");
		btemp.setForeground(Color.black);
		add(btemp);
		dtemp = new Double(status.n2);
		n2 = new TextField(dtemp.toString(), 4);
		n2.addActionListener(status.getRefractedNListener());
		add(n2);

		add(new Label("Incident Angle:", Label.LEFT));
		btemp = new Label("         theta_1 = ");
		btemp.setForeground(Color.blue);
		add(btemp);
		dtemp = new Double((360 * status.theta1) / (2. * Math.PI));
		theta = new TextField(dtemp.toString(), 4);
		theta.addActionListener(status.getIncidentAngleListener());
		add(theta);

		c.addItem("Laser View");
		c.addItem("Wave Fronts View");
		c.addItemListener(status.getViewBoxListener());
		add(c);

		Incident = new Checkbox("Incident Ray");
		Incident.setState(status.displayIncident);
		Incident.setForeground(Color.blue);
		Incident.addItemListener(status.getIncidentBoxListener());
		add(Incident);

		Reflected = new Checkbox("Reflected Ray");
		Reflected.setState(status.displayReflected);
		Reflected.setForeground(darkGreen);
		Reflected.addItemListener(status.getReflectedBoxListener());
		add(Reflected);

		Refracted = new Checkbox("Refracted Ray");
		Refracted.setState(status.displayRefracted);
		Refracted.setForeground(Color.red);
		Refracted.addItemListener(status.getRefractedBoxListener());
		add(Refracted);

		Normal = new Checkbox("Show Normal");
		Normal.setState(status.displayNormal);
		Normal.addItemListener(status.getNormalBoxListener());
		add(Normal);
	}
}

class SnellDownCanvas extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private final SnellStatus status;
	private final WaveFront refractedWaveFront;
	private final RefractedIndex ref;
	private final Caption caption;

	private Image offImage;
	private Graphics og;

	private int width;
	private int height;

	public SnellDownCanvas(SnellStatus snellStatus) {
		status = snellStatus;
		refractedWaveFront = new WaveFront(this, Color.red, 100);
		ref = new RefractedIndex();
		caption = new Caption();
	}

	public void advance() {
		if ((getSize().width != width) || (getSize().height != height)) {
			init();
		}
		refractedWaveFront.advance();
		prepareImage();
	}

	private double getTheta1() {
		return status.theta1;
	}

	public double getTheta2() {
		return status.theta2;
	}

	public void init() {
		width = Math.max(1, getSize().width);
		height = Math.max(1, getSize().height);
		refractedWaveFront.setOrigin(new Point(width / 2, 0));
		reset();
		offImage = createImage(width, height);
		og = offImage.getGraphics();
	}

	public void mypaint(Graphics g) {

		setBackground(Color.black);

		final int leftSpace = 0;
		final int rightSpace = 0;
		final int bottomMargin = 0;
		final int plotWidth = getSize().width - leftSpace - rightSpace; // n
		// =
		// 0
		// -
		// plot width
		final int halfWidth = plotWidth / 2;
		final int plotHeight = getSize().height - bottomMargin;

		g.setColor(getBackground());
		g.fillRect(leftSpace, 0, plotWidth + leftSpace, plotHeight);

		final NumberFormat nf = NumberFormat.getInstance();
		nf.setMaximumFractionDigits(3);

		// labels
		g.setColor(Color.gray);
		ref.plot(g, -15, -12);
		g.drawString(nf.format(status.n2), 32, 15);

		caption.plot(g, 0, plotHeight - 40);
		g.drawString(nf.format(Math.sin(getTheta1())), 60, plotHeight - 25);
		g.drawString(nf.format(Math.sin(status.theta2)), 60, plotHeight - 10);
		g.drawString("R = " + nf.format(status.R), 5, plotHeight - 55);
		g.drawString("T = " + nf.format(status.T), 5, plotHeight - 40);

		// The normal
		if (status.displayNormal) {
			g.setColor(Color.gray);
			g.drawLine(halfWidth, plotHeight, halfWidth, 0);

			// extra stuff
			g.drawString("R_perp = " + nf.format(status.Rperp()), 5,
					plotHeight - 120);
			g.drawString("T_perp = " + nf.format(status.Tperp()), 5,
					plotHeight - 105);
			g.drawString("R_par  = " + nf.format(status.Rpar()), 5,
					plotHeight - 90);
			g.drawString("T_par  = " + nf.format(status.Tpar()), 5,
					plotHeight - 75);

			// draw arcs and label angles
		}

		// The refracted line
		if (!status.TotalInternal) {
			if (status.displayRefracted && (Math.cos(getTheta1()) > 0)) {
				g.setColor(Color.red);

				if (status.waveFrontView) {
					refractedWaveFront.paint(g, (Math.PI / 2) - getTheta2());
				} else {
					g.drawLine(
							halfWidth
									+ (int) (plotHeight * Math
											.tan(status.theta2)), plotHeight,
							halfWidth, 0);
				}
			}
		} else { // Total Internal Reflection
			g.setColor(Color.red);
			g.drawString("Total Internal Reflection", halfWidth - 30, 50);
		}
	}

	public void prepareImage() {
		mypaint(og);
	}

	public void reset() {
		refractedWaveFront.setVelocity(1. / status.n2);
		refractedWaveFront.setWaveLength(1. / status.n2);
		refractedWaveFront.reset();
	}

	@Override
	public final void paint(Graphics g) {
		g.drawImage(offImage, 0, 0, null);
	}

}

public class SnellGraph extends Applet {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	SnellControls controls;
	Banner banner;
	SnellCanvas snellCanvas;

	Label appletName = new Label("Virtual Interactive Demonstration");
	Label department = new Label("Department of Physics and Astronomy");
	Label university = new Label("Northwestern University");

	{
		department.setForeground(Color.white);
		university.setForeground(Color.white);
		appletName.setForeground(Color.white);
	}

	public SnellGraph() {
		setLayout(new BorderLayout());

		banner = new Banner(2, 2);
		banner.add("Center", department);
		banner.add(appletName);
		banner.add("Center", university);
		banner.add("South", new Label("Snell's Law") {
			{
				setForeground(Color.white);
			}
			
		});
		add("North", banner);

		snellCanvas = new SnellCanvas();
		add("Center", snellCanvas);
		controls = new SnellControls(snellCanvas.snellStatus);
		add("South", controls);
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
	}

	@Override
	public void start() {
		// controls.enable();
		controls.setEnabled(true);
		snellCanvas.init();
		snellCanvas.start();
	}

	/*
	 * private class SnellActionListener implements ActionListener{ public void
	 * actionPerformed(ActionEvent e){ //do nothing } }
	 */

	@Override
	public void stop() {
		// controls.disable();
		controls.setEnabled(false);
	}

}

class SnellStatus {

	private class DisplayIncidentBoxListener implements ItemListener {
		// method required to implement ItemListener
		public void itemStateChanged(ItemEvent e) {
			final Checkbox c = (Checkbox) e.getSource();
			displayIncident = c.getState();
		}
	}

	private class DisplayNormalBoxListener implements ItemListener {
		// method required to implement ItemListener
		public void itemStateChanged(ItemEvent e) {
			final Checkbox c = (Checkbox) e.getSource();
			displayNormal = c.getState();
		}
	}

	private class DisplayReflectedBoxListener implements ItemListener {
		// method required to implement ItemListener
		public void itemStateChanged(ItemEvent e) {
			final Checkbox c = (Checkbox) e.getSource();
			displayReflected = c.getState();
		}
	}

	private class DisplayRefractedBoxListener implements ItemListener {
		// method required to implement ItemListener
		public void itemStateChanged(ItemEvent e) {
			try {
				final Checkbox c = (Checkbox) e.getSource();
				displayRefracted = c.getState();
			} catch (final RuntimeException excep) {
				// do nothing
			}
		}
	}

	private class IncidentAngleListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			final TextField theta = (TextField) e.getSource();
			final Double tmp = Double.valueOf(theta.getText().trim());
			theta1 = ((2 * Math.PI) * tmp.doubleValue()) / 360.;
			reset();
		}
	}

	private class IncidentNListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			final TextField tn1 = (TextField) e.getSource();
			final Double tmp = Double.valueOf(tn1.getText().trim());
			n1 = tmp.doubleValue();
			reset();
		}
	}

	private class RefractedNListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			final TextField tn2 = (TextField) e.getSource();
			final Double tmp = Double.valueOf(tn2.getText().trim());
			n2 = tmp.doubleValue();
			reset();
		}
	}

	private class ViewBoxListener implements ItemListener {
		// method required to implement ItemListener
		public void itemStateChanged(ItemEvent e) {
			final Choice c = (Choice) e.getSource();
			final int view = c.getSelectedIndex();
			if (view == 0) {
				waveFrontView = false;
			} else {
				waveFrontView = true;
			}
		}
	}

	public double n1 = 1.0; // Index of Refraction above
	public double n2 = 1.33; // Index of Refraction below
	public double theta1 = Math.PI / 4; // Angle if Incidence
	public double theta2 = Math.PI / 4; // Angle of Refraction

	public double R = 1; // Reflectance R

	public double T = 1; // Transmittance T

	public boolean displayIncident = true;

	public boolean displayReflected = true;

	public boolean displayRefracted = true;

	public boolean displayNormal = false;

	public boolean TotalInternal = false;

	public boolean waveFrontView = false;

	private final SnellCanvas parent;

	public SnellStatus(SnellCanvas canvas) {
		parent = canvas;
	}

	public ActionListener getIncidentAngleListener() {
		return (new IncidentAngleListener());
	}

	public ItemListener getIncidentBoxListener() {
		return (new DisplayIncidentBoxListener());
	}

	public ActionListener getIncidentNListener() {
		return (new IncidentNListener());
	}

	public ItemListener getNormalBoxListener() {
		return (new DisplayNormalBoxListener());
	}

	public ItemListener getReflectedBoxListener() {
		return (new DisplayReflectedBoxListener());
	}

	public ItemListener getRefractedBoxListener() {
		return (new DisplayRefractedBoxListener());
	}

	public ActionListener getRefractedNListener() {
		return (new RefractedNListener());
	}

	public ItemListener getViewBoxListener() {
		return (new ViewBoxListener());
	}

	public void init() {
		reset();
	}

	public void reset() {
		setTheta2();
		setIntensities();
		parent.reset();
	}

	double rPar() {
		double r_par;
		if (theta1 == 0) {
			r_par = (n2 - n1) / (n1 + n2);
		} else {
			r_par = Math.tan(theta1 - theta2) / Math.tan(theta1 + theta2);
		}
		return r_par;
	}

	double Rpar() {
		return (Math.pow(rPar(), 2));
	}

	// Amplitude Coefficients for Dielectrics
	double rPerp() {
		double r_perp;
		if (theta1 == 0) {
			r_perp = (n1 - n2) / (n1 + n2);
		} else {
			r_perp = -Math.sin(theta1 - theta2) / Math.sin(theta1 + theta2);
		}
		return r_perp;
	}

	double Rperp() {
		return (Math.pow(rPerp(), 2));
	}

	void setIntensities() {
		setT();
		setR();
	}

	public void setR() { // Angle of incidence
		if (theta1 == 0) {
			R = Math.pow(n2 - n1, 2) / Math.pow(n1 + n2, 2);
			return;
		} else {
			R = 1. - T;
		}
		if (R == 0) {
			displayReflected = false;
		}
	}

	public void setT() { // Angle of incidence
		if (TotalInternal) {
			T = 0;
			return;
		}
		if (theta1 == 0) {
			T = (4 * n1 * n2) / Math.pow(n1 + n2, 2);
			return;
		} else {
			T = (Tpar() + Tperp()) / 2.;
			if (T < 0) {
				T = 0;
			}
		}
		if (T == 0) {
			displayRefracted = false;
		}
	}

	public void setTheta2() {
		setTheta2(theta1);
	}

	private void setTheta2(double theta_1) { // Angle of incidence
		double arg;
		arg = (n1 * Math.sin(theta_1)) / n2;
		if ((arg < -1.) || (arg > 1)) {
			TotalInternal = true;
			theta2 = Math.PI / 2;
			return;
		}
		TotalInternal = false;
		theta2 = Math.asin(arg);
	}

	double tPar() {
		double t_par;
		if (theta1 == 0) {
			t_par = (2 * n1) / (n1 + n2);
		} else {
			t_par = (2 * Math.sin(theta2) * Math.cos(theta1))
					/ (Math.sin(theta1 + theta2) * Math.cos(theta1 - theta2));
		}
		return t_par;
	}

	double Tpar() {
		double T_par;
		if (theta1 == 0) {
			T_par = (4 * n1 * n2) / Math.pow(n1 + n2, 2);
		} else {
			T_par = (Math.sin(2 * theta1) * Math.sin(2 * theta2))
					/ Math.pow(
							(Math.sin(theta1 + theta2) * Math.cos(theta1
									- theta2)), 2);
		}
		return (T_par);
	}

	double tPerp() {
		double t_perp;
		if (theta1 == 0) {
			t_perp = (2 * n1) / (n1 + n2);
		} else {
			t_perp = (2 * Math.sin(theta2) * Math.cos(theta1))
					/ Math.sin(theta1 + theta2);
		}
		return t_perp;
	}

	double Tperp() {
		double T_perp;
		if (theta1 == 0) {
			T_perp = (4 * n1 * n2) / Math.pow(n1 + n2, 2);
		} else {
			T_perp = (Math.sin(2 * theta1) * Math.sin(2 * theta2))
					/ Math.pow(Math.sin(theta1 + theta2), 2);
		}
		return (T_perp);
	}

}

class SnellUpCanvas extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private final SnellStatus status;
	private final WaveFront incidentWaveFront;
	private final WaveFront reflectedWaveFront;
	private final IncidentIndex inci;

	private Image offImage;
	private Graphics og;

	private int width;
	private int height;

	public SnellUpCanvas(SnellStatus snellStatus) {
		status = snellStatus;
		incidentWaveFront = new WaveFront(this, Color.blue, 100);
		reflectedWaveFront = new WaveFront(this, Color.green, 100);
		inci = new IncidentIndex();
	}

	public void advance() {
		if ((getSize().width != width) || (getSize().height != height)) {
			init();
		}
		incidentWaveFront.advance();
		reflectedWaveFront.advance();
		prepareImage();
	}

	private double getTheta1() {
		return status.theta1;
	}

	public void init() {
		width = Math.max(1, getSize().width);
		height = Math.max(1, getSize().height);
		incidentWaveFront.setOrigin(new Point(width / 2, height));
		reflectedWaveFront.setOrigin(new Point(width / 2, height));
		reset();
		offImage = createImage(width, height);
		og = offImage.getGraphics();
	}

	public void mypaint(Graphics g) {

		setBackground(Color.black);

		final int leftSpace = 0;
		final int rightSpace = 0;
		final int bottomMargin = 0;
		final int plotWidth = getSize().width - leftSpace - rightSpace; // n
		// =
		// 0
		// -
		// plotwitdh
		final int halfWidth = plotWidth / 2;
		final int plotHeight = getSize().height - bottomMargin;

		final String snellTitle = "Snell's Law";
		final Color darkdarkGray = new Color(32, 32, 32);

		g.setColor(darkdarkGray);
		g.fillRect(leftSpace, 0, plotWidth + leftSpace, plotHeight);

		final NumberFormat nf = NumberFormat.getInstance();
		nf.setMaximumFractionDigits(3);

		// labels
		g.setColor(Color.lightGray);
		inci.plot(g, -15, plotHeight - 40);
		g.drawString(nf.format(status.n1), 32, plotHeight - 15);

		// The incident line
		if (status.displayIncident && (Math.cos(getTheta1()) > 0)) {
			g.setColor(Color.blue);

			if (status.waveFrontView) {
				incidentWaveFront.paint(g, (Math.PI / 2) - getTheta1());
			} else {
				g.drawLine(leftSpace,
						plotHeight - (int) (halfWidth / Math.tan(getTheta1())),
						halfWidth, plotHeight);
			}
		}

		// The normal
		if (status.displayNormal) {
			g.setColor(Color.gray);
			g.drawLine(halfWidth, plotHeight, halfWidth, 0);
		} else {
			g.setColor(Color.white);
			g.drawString(snellTitle, (leftSpace + halfWidth) - 30, 30);
		}

		// The reflected line
		if (status.displayReflected && (Math.cos(getTheta1()) > 0)) {
			g.setColor(Color.green);

			if (status.waveFrontView) {
				reflectedWaveFront.paint(g, (Math.PI / 2) + getTheta1());
			} else {
				g.drawLine(
						halfWidth + (int) (plotHeight * Math.tan(getTheta1())),
						0, halfWidth, plotHeight);
			}
		}
	}

	public void prepareImage() {
		mypaint(og);
	}

	public void reset() {
		incidentWaveFront.setVelocity(1. / status.n1);
		reflectedWaveFront.setVelocity(-1. / status.n1);
		incidentWaveFront.setWaveLength(1. / status.n1);
		reflectedWaveFront.setWaveLength(1. / status.n1);
		incidentWaveFront.reset();
		reflectedWaveFront.reset();
	}

	@Override
	public final void paint(Graphics g) {
		g.drawImage(offImage, 0, 0, null);
	}

}

class WaveFront {
	private final Canvas canvas;
	// private Color myColor;
	private final int width;
	private double velocity;
	private double waveLength;
	private Point origin;
	private double phase;

	public WaveFront(Canvas theCanvas, Color theColor, int ww) {
		canvas = theCanvas;
		// myColor = theColor;
		width = ww;
		waveLength = 20;
		phase = 0;
	}

	public void advance() {
		phase += velocity;
		phase = phase - (((int) (phase / waveLength)) * waveLength);
	}

	private void drawLine(Graphics g, Point p, double theta) {
		final double w_prime = width * Math.sin(theta);
		final Point pStart = new Point(
				(int) (p.x - (w_prime * Math.sin(theta))),
				(int) (p.y + (w_prime * Math.cos(theta))));
		final Point pEnd = new Point((int) (p.x + (w_prime * Math.sin(theta))),
				(int) (p.y - (w_prime * Math.cos(theta))));
		g.drawLine(pStart.x, pStart.y, pEnd.x, pEnd.y);
	}

	public void paint(Graphics g, double theta) {
		final double r_min = (-origin.y / Math.sin(theta))
				- (width * Math.abs(Math.cos(theta)));
		final double r_max = ((canvas.getSize().height - origin.y) / Math
				.sin(theta)) + (width * Math.abs(Math.cos(theta)));
		double r = (((int) (r_min / waveLength)) * waveLength) + phase;
		do {
			final Point pp = new Point(
					(int) (origin.x + (r * Math.cos(theta))),
					(int) (origin.y + (r * Math.sin(theta))));
			drawLine(g, pp, theta);
			r += waveLength;
		} while (r <= r_max);
	}

	public void reset() {
		phase = 0;
	}

	public void setOrigin(Point p) {
		origin = p;
	}

	public void setVelocity(double v) {
		velocity = v * 3;
	}

	public void setWaveLength(double lambda) {
		waveLength = lambda * 20;
	}
}
