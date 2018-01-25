package edu.northwestern.physics.groups.atomic.applet;

//  SuperPosition1.java (JDK 1.0)
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

//  Modification History
//    Date      Initials     Change
//    2/01/98    GWA         Initial release
//    1/09/99    GWA         Added Phase constant
//  Abstract:
/*
 * This is a simple applet class to allow Students to
 * add two simple harmonic waves.  Students can vary
 * the amplitude and angular frequency of two simple
 * harmonic waves.
 *
 * @author Greg Anderson
 * @version 0.1, 21 Feb 1998
 */

import java.awt.BorderLayout;

import a2s.Button;
import a2s.Canvas;

import java.awt.Color;
import java.awt.Event;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import a2s.Label;
import a2s.Panel;
import a2s.TextField;
import a2s.Applet;

//web_Ready
//web_AppletName= Superposition1
//web_Description= Adding Simple Harmonic Waves I
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= superposition1.png
//web_Info= width:550, height:500
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/waves/superposition1.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas 

public class Superposition1 extends Applet {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Superposition1Controls controls;
	Superposition1Banner banner;

	Label appletName = new Label("The Virtual Physics Laboratory");
	Label department = new Label("Department of Physics and Astronomy");
	Label university = new Label("Northwestern University");

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

		banner = new Superposition1Banner(2, 2);
		banner.add("Center", department);
		banner.add(appletName);
		banner.add("Center", university);
		banner.add("South", new Label("G.Anderson"));
		add("North", banner);

		final Superposition1Canvas c = new Superposition1Canvas();
		add("Center", c);
		add("South", controls = new Superposition1Controls(c));
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

class Superposition1Banner extends Panel {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public Superposition1Banner(int n, int m) {
		final Color darkMagenta = new Color(150, 0, 150);
		setBackground(darkMagenta);
		setForeground(Color.white);
		setLayout(new GridLayout(n, m, 40, -5)); /* nr,nc, vg?, hg? */
	}
}

class Superposition1Canvas extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	static String firstWave = "A1(t) = A0_1*sin(w1*t + phi1):";

	static String secondWave = "A2(t) = A0_2*sin(w2*t + phi2):";
	static String combinedWave = "Adding the waves above: A(t) = A1(t) + A2(t)";
	int halfWidth = 200;
	int spacing = 30;
	int shiftr = 25;

	int vcenter1 = 3 * spacing; /* Vertical Center for graph 1 */
	int vcenter2 = 6 * spacing; /* Vertical Center for graph 1 */
	int vcenter3 = 10 * spacing; /* Vertical Center for graph 1 */
	int t = 0;
	double x = 0;
	double phi1 = 0; /* phase constant */
	double phi2 = 0;
	double k1 = 10.; /* k = w/v */
	double k2 = 10.; /* k = 2pi/lambda */
	double w1 = 1. / 2.;

	double w2 = 1. / 2.1;
	double f1;
	double f2;
	int A0 = 30; /* Amplitude */

	int A1 = A0; /* Amplitude */

	int A2 = A0; /* Amplitude */

	int A3 = A0; /* Amplitude */

	double fun(double t) {
		return ((fun1(t) + fun2(t) + vcenter3) - vcenter2 - vcenter1);
	}

	double fun1(double t) {
		return ((-A1 * Math.sin((k1 * x) + (w1 * t) + phi1)) + vcenter1);
	}

	double fun2(double t) {
		return ((-A2 * Math.sin((k2 * x) + (w2 * t) + phi2)) + vcenter2);
	}

	@Override
	public void paint(Graphics g) {
		
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, getWidth(), getHeight());
		
		final Color darkmagenta = new Color(150, 0, 150);

		/* axes */
		g.setColor(Color.gray);
		g.drawLine(shiftr, vcenter1, getSize().width, vcenter1);
		g.drawLine(shiftr, vcenter2, getSize().width, vcenter2);
		g.drawLine(shiftr, vcenter3, getSize().width, vcenter3);
		A3 = A1 + A2;
		g.drawLine(shiftr, vcenter1 - ((12 * A1) / 10), shiftr, vcenter1
				+ ((12 * A1) / 10));
		g.drawLine(shiftr, vcenter2 - ((12 * A2) / 10), shiftr, vcenter2
				+ ((12 * A2) / 10));
		g.drawLine(shiftr, vcenter3 - ((12 * A3) / 10), shiftr, vcenter3
				+ ((12 * A3) / 10));

		/* axis labels */
		g.setColor(Color.darkGray);
		g.drawString("  20", 0, vcenter1 - 15);
		g.drawString("   0", 0, vcenter1 + 5);
		g.drawString("-20", 0, vcenter1 + 25);
		g.drawString("t", getSize().width - 15, vcenter1 + 10);
		g.drawString("  20", 0, vcenter2 - 15);
		g.drawString("   0", 0, vcenter2 + 5);
		g.drawString("-20", 0, vcenter2 + 25);
		g.drawString("t", getSize().width - 15, vcenter2 + 10);
		g.drawString("  20", 0, vcenter3 - 15);
		g.drawString("   0", 0, vcenter3 + 5);
		g.drawString("-20", 0, vcenter3 + 25);
		g.drawString("t", getSize().width - 15, vcenter3 + 10);

		int sn;
		g.setColor(darkmagenta);
		for (int n = 0; n < (getSize().width - shiftr); n++) {
			sn = n + shiftr;
			g.drawLine(sn, (int) fun1(n), sn + 1, (int) fun1(n + 1));
		}

		g.setColor(Color.blue);
		for (int n = 0; n < (getSize().width - shiftr); n++) {
			sn = n + shiftr;
			g.drawLine(sn, (int) fun2(n), sn + 1, (int) fun2(n + 1));
		}

		g.setColor(Color.red);
		for (int n = 0; n < (getSize().width - shiftr); n++) {
			sn = n + shiftr;
			g.drawLine(sn, (int) fun(n), sn + 1, (int) fun(n + 1));
		}

		/* Text Labels */
		g.setColor(Color.black);
		g.drawString(firstWave, shiftr + 5, vcenter1 - ((12 * spacing) / 10));
		// g.drawString("w1 = " + w1, halfWidth-20, vcenter1 - 12*spacing/10);
		// g.drawString("A0_1 = " + A1, halfWidth+70, vcenter1 - 12*spacing/10);

		g.drawString(secondWave, shiftr + 5, vcenter2 - ((12 * spacing) / 10));
		// g.drawString("w2 = " + w2, halfWidth-20, 48*spacing/10);
		// g.drawString("A0_2 = " + A2, halfWidth+70, 48*spacing/10);

		g.drawString(combinedWave, shiftr + 5, (78 * spacing) / 10);
	}

	public void redraw(Double w1in, Double w2in, Double a1, Double a2,
			Double p1, Double p2) {
		w1 = w1in.doubleValue();
		w2 = w2in.doubleValue();
		A1 = a1.intValue();
		A2 = a2.intValue();
		phi1 = p1.doubleValue();
		phi2 = p2.doubleValue();
		repaint();
	}
}

class Superposition1Controls extends Panel implements ActionListener {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Button btemp;
	TextField w1;
	TextField w2;
	TextField a1;
	TextField a2;
	TextField p1;
	TextField p2;
	Superposition1Canvas canvas;

	public Superposition1Controls(Superposition1Canvas canvas) {
		setLayout(new GridLayout(3, 5, 5, 5)); /* nr,nc, vg, hg */
		this.canvas = canvas;
		final Color darkmagenta = new Color(150, 0, 150);
		setForeground(Color.black);

		add(new Label("Angular Freq. :", Label.LEFT));

		btemp = new Button("W1 = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this); // PF added calls to addActionListener()
		add(btemp);
		add(w1 = new TextField("0.5", 4));
		w1.addActionListener(this);

		btemp = new Button("W2 = ");
		btemp.setForeground(Color.blue);
		btemp.addActionListener(this);
		add(btemp);
		add(w2 = new TextField("0.476", 4));
		w2.addActionListener(this);

		add(new Label("Amplitudes:", Label.LEFT));

		btemp = new Button("A0_1 = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this);
		add(btemp);
		add(a1 = new TextField("30", 4));
		a1.addActionListener(this);

		btemp = new Button("A0_2 = ");
		btemp.setForeground(Color.blue);
		btemp.addActionListener(this);
		add(btemp);
		add(a2 = new TextField("30", 4));
		a2.addActionListener(this);

		add(new Label("Phase Constants:", Label.LEFT));

		btemp = new Button("Phi_1 = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this);
		add(btemp);
		add(p1 = new TextField("0", 4));
		p1.addActionListener(this);

		btemp = new Button("Phi_2 = ");
		btemp.setForeground(Color.blue);
		btemp.addActionListener(this);
		add(btemp);
		add(p2 = new TextField("0", 4));
		p2.addActionListener(this);

	}

	@Override
	public void actionPerformed(ActionEvent ev) { // PF converted from action()
			canvas.redraw(Double.valueOf(w1.getText().trim()),
					Double.valueOf(w2.getText().trim()),
					Double.valueOf(a1.getText().trim()),
					Double.valueOf(a2.getText().trim()),
					Double.valueOf(p1.getText().trim()),
					Double.valueOf(p2.getText().trim()));
	}
}
