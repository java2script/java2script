package edu.northwestern.physics.groups.atomic.applet;

// Superposition2.Applet  (JDK 1.0)
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
//  Abstract:
/*
 * the amplitude and angular frequency of two simple
 * harmonic waves.  This is built over various classes
 * from SUN's JDK.
 * @author Greg Anderson
 * @version 0.1, 21 Feb 1998
 */

import java.awt.BorderLayout;

import a2s.Button;
import a2s.Canvas;

import java.awt.Color;
import java.awt.Event;
import java.awt.Dimension;
import java.awt.Image;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Timer;

import a2s.Label;
import a2s.Panel;
import a2s.TextField;
import a2s.Applet;

public class Superposition2 extends Applet implements Runnable {

//web_Ready
//web_AppletName= Superposition2
//web_Description= Adding Simple Harmonic Waves II
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= superposition2.png
//web_Info= width:550, height:500
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/waves/superposition2.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas 
	
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Superposition2Controls controls;
	Superposition2Canvas c;
	Superposition2Banner banner;

	Label appletName = new Label("The Virtual Physics Laboratory");
	Label department = new Label("Department of Physics and Astronomy");
	Label university = new Label("Northwestern University");

	{
		department.setForeground(Color.white);
		university.setForeground(Color.white);
		appletName.setForeground(Color.white);
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
		c = new Superposition2Canvas();

		banner = new Superposition2Banner(2, 2);
		banner.add("Center", department);
		banner.add(appletName);
		banner.add("Center", university);
		banner.add("South", new Label("G.Anderson") {
			{
				setForeground(Color.white);
			}
			
		});

		add("North", banner);
		add("Center", c);
		add("South", controls = new Superposition2Controls(c));
		c.annimationThread = null;
		c.stopAnnimation = false;
	}

	public void run() {
	    /*
		while (c.annimationThread != null) {
			try {
				Thread.sleep(300);
			} catch (final InterruptedException e) {
			}
			c.repaint();
		}
		c.annimationThread = null;
		*/
	}

	@Override
	public void start() {
		controls.setEnabled(true);
		if (c.annimationThread == null) {
		    	// SwingJS doesn't like threads that sleep, use a timer.  -PF
			c.annimationThread = new Timer(300, new ActionListener() {
			    public void actionPerformed(ActionEvent evt) {
				c.repaint();
			    }
			});
			c.annimationThread.start();
		}
	}

	@Override
	public void stop() {
		controls.setEnabled(false);
		c.offg = null;
		c.offImage = null;
	}
}

class Superposition2Banner extends Panel {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public Superposition2Banner(int n, int m) {
		final Color darkMagenta = new Color(150, 0, 150);
		setBackground(darkMagenta);
		setForeground(Color.white);
		setLayout(new GridLayout(n, m, 40, -5)); /* nr,nc, vg, hg */
	}
}

class Superposition2Canvas extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	static String firstWave = "A1(x,t) = A0_1*sin(k1*x - w1*t):";
	static String secondWave = "A2(x,t) = A0_2*sin(k2*x - w2*t):";
	static String combinedWave = "A(x,t) = A1(x,t) + A2(x,t):";

	public static int abs(int a) {
		return (a < 0) ? -a : a;
	}

	public static double fabs(double a) {
		return (a < 0) ? -a : a;
	}

	Dimension offDimension; // These objects are used for

	Image offImage; // Double Buffering to
	Graphics offg; // "offline graphics"
	Timer annimationThread;
	boolean stopAnnimation;
	int halfWidth = 200;

	int spacing = 30;
	int shiftr = 25;
	int vcenter1 = 3 * spacing; /* Vertical Center for graph 1 */
	int vcenter2 = 6 * spacing; /* Vertical Center for graph 1 */
	int vcenter3 = 10 * spacing; /* Vertical Center for graph 1 */
	int t = 0;
	double v1; /* v = f*lambda = w/k */
	double v2;
	double vc; /* carrier or phase velocity */

	double vg; /* group velocity */
	double k1 = 0.5; /* k = w/v */
	double k2 = 0.45; /* k = 2pi/lambda */
	double w1 = 1.0; /* angular frequencies */

	// The displacement plotted is actually measured from
	// the top of the screen downward, hence the -A1 etc
	// below.

	double w2 = 0.7;

	int A0 = 30; /* Amplitude */

	int A1 = A0; /* Amplitude */

	int A2 = A0; /* Amplitude */
	int A3 = A0; /* Amplitude */

	double fun(double x) {
		return ((fun1(x) + fun2(x) + vcenter3) - vcenter2 - vcenter1);
	}

	double fun1(double x) {
		return ((-A1 * Math.sin((k1 * x) - (w1 * t))) + vcenter1);
	}

	double fun2(double x) {
		return ((-A2 * Math.sin((k2 * x) - (w2 * t))) + vcenter2);
	}

	@Override
	public boolean mouseDown(java.awt.Event evt, int x, int y) {
		if (stopAnnimation) {
			annimationThread.start();
		} else {
			annimationThread.stop();
		}
		stopAnnimation = !stopAnnimation;
		return true;
	}

	public void redraw(Double W1, Double W2, Double K1, Double K2, Double a1,
			Double a2) {
		w1 = W1.doubleValue();
		w2 = W2.doubleValue();
		k1 = K1.doubleValue();
		k2 = K2.doubleValue();
		A1 = a1.intValue();
		A2 = a2.intValue();
		repaint();
	}

	@Override
	public void update(Graphics g) {
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, getWidth(), getHeight());
		

		final Dimension d = getSize(); // onscreen drawing area:
		if ((offg == null) || (d.width != offDimension.width)
				|| (d.height != offDimension.height)) {
			offDimension = d;
			offImage = createImage(d.width, d.height);
			offg = offImage.getGraphics();
		}

		// Erase the previous image.
		offg.setColor(getBackground());
		offg.fillRect(0, 0, d.width, d.height);

		setBackground(Color.white);
		final Color darkmagenta = new Color(150, 0, 150);

		/* axes */
		offg.setColor(Color.gray);
		offg.drawLine(shiftr, vcenter1, getSize().width, vcenter1);
		offg.drawLine(shiftr, vcenter2, getSize().width, vcenter2);
		offg.drawLine(shiftr, vcenter3, getSize().width, vcenter3);
		A3 = abs(A1) + abs(A2);
		offg.drawLine(shiftr, vcenter1 - ((12 * A1) / 10), shiftr, vcenter1
				+ ((12 * A1) / 10));
		offg.drawLine(shiftr, vcenter2 - ((12 * A2) / 10), shiftr, vcenter2
				+ ((12 * A2) / 10));
		offg.drawLine(shiftr, vcenter3 - ((12 * A3) / 10), shiftr, vcenter3
				+ ((12 * A3) / 10));

		/* axis labels */
		offg.setColor(Color.darkGray);
		offg.drawString("  20", 0, vcenter1 - 15);
		offg.drawString("   0", 0, vcenter1 + 5);
		offg.drawString("-20", 0, vcenter1 + 25);
		offg.drawString("x", getSize().width - 15, vcenter1 + 10);
		offg.drawString("  20", 0, vcenter2 - 15);
		offg.drawString("   0", 0, vcenter2 + 5);
		offg.drawString("-20", 0, vcenter2 + 25);
		offg.drawString("x", getSize().width - 15, vcenter2 + 10);
		offg.drawString("  20", 0, vcenter3 - 15);
		offg.drawString("   0", 0, vcenter3 + 5);
		offg.drawString("-20", 0, vcenter3 + 25);
		offg.drawString("x", getSize().width - 15, vcenter3 + 10);

		offg.drawString(firstWave, shiftr + 5, vcenter1 - ((12 * spacing) / 10));
		v1 = w1 / k1;
		offg.drawString("v_1 = " + v1, halfWidth + 100, vcenter1
				- ((12 * spacing) / 10));

		offg.drawString(secondWave, shiftr + 5, vcenter2
				- ((12 * spacing) / 10));
		v2 = w2 / k2;
		offg.drawString("v_2 = " + v2, halfWidth + 100, vcenter2
				- ((12 * spacing) / 10));

		offg.drawString(combinedWave, shiftr + 5, vcenter3
				- ((24 * spacing) / 10));
		vc = (w1 + w2) / (k1 + k2);
		vg = (w1 - w2) / (k1 - k2);
		offg.drawString("v_ph = " + vc, halfWidth + 50, vcenter3 - A3 - 18);
		offg.drawString("v_g  =  " + vg, halfWidth + 50, vcenter3 - A3 - 5);

		offg.setColor(darkmagenta);
		int sn;
		for (int n = 0; n < (getSize().width - shiftr); n++) {
			sn = n + shiftr;
			offg.drawLine(sn, (int) fun1(n), sn + 1, (int) fun1(n + 1));
		}

		offg.setColor(Color.blue);
		for (int n = 0; n < (getSize().width - shiftr); n++) {
			sn = n + shiftr;
			offg.drawLine(sn, (int) fun2(n), sn + 1, (int) fun2(n + 1));
		}
		offg.setColor(Color.red);
		for (int n = 0; n < (getSize().width - shiftr); n++) {
			sn = n + shiftr;
			offg.drawLine(sn, (int) fun(n), sn + 1, (int) fun(n + 1));
		}

		g.drawImage(offImage, 0, 0, this);

		t++;
	}
}

class Superposition2Controls extends Panel implements ActionListener {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Button btemp;
	TextField w1;
	TextField w2;
	TextField k1;
	TextField k2;
	TextField a1;
	TextField a2;
	Superposition2Canvas canvas;

	public Superposition2Controls(Superposition2Canvas canvas) {
		setLayout(new GridLayout(3, 5, 5, 5)); /* nr,nc, vg, hg */
		this.canvas = canvas;
		final Color darkmagenta = new Color(150, 0, 150);

		setForeground(Color.black);

		add(new Label("A. Frequencies:", Label.LEFT));

		btemp = new Button("W1 = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this);
		add(btemp);
		add(w1 = new TextField("1.0", 4));
		w1.addActionListener(this);

		btemp = new Button("W2 = ");
		btemp.setForeground(Color.blue);
		btemp.addActionListener(this);
		add(btemp);
		add(w2 = new TextField("0.7", 4));
		w2.addActionListener(this);

		add(new Label("Wave Numbers:", Label.LEFT));

		btemp = new Button("k1 = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this);
		add(btemp);
		add(k1 = new TextField("0.5", 4));
		k1.addActionListener(this);

		btemp = new Button("k2 = ");
		btemp.setForeground(Color.blue);
		btemp.addActionListener(this);
		add(btemp);
		add(k2 = new TextField("0.45", 4));
		k2.addActionListener(this);

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
	}

	@Override
	public void actionPerformed(ActionEvent ev) {
			// String label = (String) arg;
			canvas.redraw(Double.valueOf(w1.getText().trim()),
					Double.valueOf(w2.getText().trim()),
					Double.valueOf(k1.getText().trim()),
					Double.valueOf(k2.getText().trim()),
					Double.valueOf(a1.getText().trim()),
					Double.valueOf(a2.getText().trim()));
	}
}
