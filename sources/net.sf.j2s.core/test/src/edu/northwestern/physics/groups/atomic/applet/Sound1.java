package edu.northwestern.physics.groups.atomic.applet;

// Sound1.java  (JDK 1.0) 0.1 98/02/21  Greg Anderson
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
 * fitness for any particular purpose.  Your mileage may vary.            *
 * See the GNU General Public License for more details.                  *
 *                                                                       *
 *************************************************************************/

//  Modification History
//    Date      Initials     Change
//    2/01/98    GWA         Initial release
//  Abstract:
/*
 * the amplitude and angular frequency of two simple harmonic waves.
 * This code is built over various classes from SUN's JDK.
 * IMPORTANT This version of the applet was build over jkd-1.0.
 * @author Greg Anderson
 * @version 0.1, 21 Feb 1998
 */

import java.awt.BorderLayout;

import a2s.Button;
import a2s.Canvas;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.Timer;

import a2s.Label;
import a2s.Panel;
import a2s.TextField;
import a2s.Applet;

//web_Ready
//web_AppletName= Sound1
//web_Description= A simulation of sound
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= sound1.png
//web_Info= width:550, height:500
//web_JavaVersion= ??http://groups.physics.northwestern.edu/vpl/waves/sound1.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas 
public class Sound1 extends Applet implements Runnable {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Sound1Controls controls;
	Sound1Canvas c;
	Sound1Banner banner;

	Label vplName = new Label("The Virtual Physics Laboratory");
	Label department = new Label("Department of Physics and Astronomy");
	Label university = new Label("Northwestern University");
	Label appletName = new Label("Sound Wave Propagation");
	
	{
		vplName.setForeground(Color.white);
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
		c = new Sound1Canvas();

		banner = new Sound1Banner(2, 2);
		banner.add("Center", department);
		banner.add(vplName);
		banner.add("Center", university);
		banner.add("South", appletName);

		add("North", banner);
		add("Center", c);
		add("South", controls = new Sound1Controls(c));
		c.annimationThread = null;
		c.stopAnnimation = false;
	}

	public void run() {
		while (c.annimationThread != null) {
			try {
				Thread.sleep(300);
			} catch (final InterruptedException e) {
			}
			c.repaint();
		}
		c.annimationThread = null;
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

class Sound1Banner extends Panel {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public Sound1Banner(int n, int m) {
		final Color darkMagenta = new Color(150, 0, 150);
		setBackground(darkMagenta);
		setForeground(Color.white);
		setLayout(new GridLayout(n, m, 40, -5)); /* nr,nc, vg, hg */
	}
}

class Sound1Canvas extends Canvas implements MouseListener {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public static int abs(int a) {
		return (a < 0) ? -a : a;
	}

	public static double fabs(double a) {
		return (a < 0) ? -a : a;
	}

	Sound1Canvas() {
		addMouseListener(this);
	}
	
	Dimension offDimension; // These objects are used for

	Image offImage; // Double Buffering to
	Graphics offg; // "offline graphics"

	Timer annimationThread; // PF changed thread to timer for swingjs

	boolean stopAnnimation;
	int halfWidth = 200;
	int spacing = 30;

	int shiftr = 25;
	int vcenter = 6 * spacing; /* Vertical Center for graph 1 */
	int t = 0; /* elapsed time */
	double T = 4; /* period */
	double v = 4; /* v = f*lambda = w/k */
	double vs = 2; /* speed of sound */

	double k = 0.5; /* k = w/v */
	double w = (2 * Math.PI) / T; /* angular frequency */

	double R; /* pulse radius */
	double dist; /* distance traveled by source */

	int x0 = 40;
	int y0 = 200;
	int x;
	int dx;

	// The displacement plotted is actually measured from
	// the top of the screen downward, hence the -A1 etc
	// below.

	int y;

	int dy;

	// PF replaced mouseDown() with mouseClicked()
	@Override
	public void mouseClicked(MouseEvent e) {
		if (stopAnnimation) {
			annimationThread.start();
		} else {
			annimationThread.stop();
		}
		stopAnnimation = !stopAnnimation;
	}

	@Override
	public void paintComponent(Graphics g) {
	    super.paintComponent(g);
		update(g);
	}

	public void redraw(Double Vs, Double V, Double Tp) {
		vs = Vs.doubleValue();
		v = V.doubleValue();
		T = Tp.intValue();
		t = 0;
		repaint();
	}

	@Override
	public void update(Graphics g) {

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

		/** The outer envelope of the pulse */

		R = vs * t; /* pulse radius */
		dist = v * t; /* distance traveled by source */

		/** The Source of the pulse */

		offg.setColor(Color.red);
		int Amp;
		Amp = (int) Math.abs(3 * Math.sin((w * t) / 2));
		Amp += 1;

		x = x0 + (int) dist;
		offg.fillOval(x - Amp, y0 - Amp, 2 * Amp, 2 * Amp);

		offg.setColor(darkmagenta);

		/* Graphics::drawOval(x,y,dx,dy); * */
		/** draws an oval inside a box of **/
		/** of coords (x,y) (x+dx,y) (x,y+dy) (x+dx,y+dy) **/

		/* previous wave fronts */
		/* if show history */

		offg.setColor(Color.blue);

		for (int n = 0; (n * T) < t; n++) {
			final double Tn = n * T; /* time pulse was made */
			R = vs * (t - Tn);
			dist = v * Tn; /* distance traveled before pulse */
			x = (int) ((x0 + dist) - R);
			dx = (int) (2 * R);
			y = y0 - (int) R;
			dy = (int) (2 * R);
			offg.drawOval(x, y, dx, dy);
		}

		g.drawImage(offImage, 0, 0, this);

		t++;

		if ((v * t) > 1000) {
			t = 0;
		}
	}

	@Override
	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
}

class Sound1Controls extends Panel implements ActionListener {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Button btemp;
	TextField vs;
	TextField v;
	TextField t;
	Sound1Canvas canvas;
	Double dtemp;

	public Sound1Controls(Sound1Canvas canvas) {
		setLayout(new GridLayout(2, 6, 5, 5)); /* nr,nc, vg, hg */
		this.canvas = canvas;
		final Color darkmagenta = new Color(150, 0, 150);

		setForeground(Color.black);

		add(new Label("Sound Speed:", Label.LEFT));

		btemp = new Button("Vs = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this);
		add(btemp);
		dtemp = new Double(canvas.vs);
		add(vs = new TextField(dtemp.toString(), 4));
		vs.addActionListener(this);

		add(new Label("Source Speed:", Label.LEFT));

		btemp = new Button("V = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this);
		add(btemp);
		dtemp = new Double(canvas.v);
		add(v = new TextField(dtemp.toString(), 4));
		v.addActionListener(this);

		add(new Label("Period:", Label.LEFT));

		btemp = new Button("T = ");
		btemp.setForeground(darkmagenta);
		btemp.addActionListener(this);
		add(btemp);
		dtemp = new Double(canvas.T);
		add(t = new TextField(dtemp.toString(), 4));
		t.addActionListener(this);

		add(new Label("", Label.LEFT));
		add(new Label("", Label.LEFT));
		add(new Label("", Label.LEFT));

	}

	@Override
	public void actionPerformed(ActionEvent ev) {
			canvas.redraw(Double.valueOf(vs.getText().trim()),
					Double.valueOf(v.getText().trim()),
					Double.valueOf(t.getText().trim()));
	}
}
