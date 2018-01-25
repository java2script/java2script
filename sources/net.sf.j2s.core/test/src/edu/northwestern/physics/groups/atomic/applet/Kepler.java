package edu.northwestern.physics.groups.atomic.applet;

//  Kepler.java
//
/*************************************************************************
 *                                                                       *
 * Copyright (c) 1998     Northwestern University                        *
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
/*
 * @author Xiaowei Jiang, Greg Anderson
 * @version 0.1, June 1999
 */


import a2s.Applet;

import java.awt.BorderLayout;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.CheckboxGroup;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Image;

import a2s.Label;
import a2s.Panel;

import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JRadioButton;
import javax.swing.Timer;

import a2s.TextField;

//web_Ready
//web_AppletName= Kepler
//web_Description= A simulation gravitational orbits
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= kepler.png
//web_Info= width:550, height:500
//web_JavaVersion= ??http://groups.physics.northwestern.edu/vpl/mechanics/planets.html
//web_Category= Physics - Mechanics
//web_Features= AWT-to-Swing, canvas 
public class Kepler extends Applet implements ActionListener {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	KeplerInputPanel inputPanel;
	KeplerOptionPanel optionPanel;
	KeplerCanvas twoBody;

	public Kepler() {
		setLayout(new BorderLayout());
		inputPanel = new KeplerInputPanel(this);
		add("North", new Banner("Kepler's Law"));
		add("South", inputPanel);
		optionPanel = new KeplerOptionPanel(this);
		add("East", optionPanel);
		twoBody = new KeplerCanvas(this);
		add("Center", twoBody);
		setSize(550, 500);
	}

	// was action(), updating to actionPerformed.  -PF
	@Override
	public void actionPerformed(ActionEvent evt) {
	    Object target = evt.getSource();
		if ((target instanceof Button) || (target instanceof TextField)) {
			twoBody.setE(inputPanel.getE());
			twoBody.setP(inputPanel.getP());
			twoBody.setMassRatio(inputPanel.getRatio());
			twoBody.setTimeInterval(inputPanel.getTimeInterval());
			if (optionPanel.isMoving()) {
				twoBody.start();
			} else {
				twoBody.stop();
			}
		} else if (target instanceof Checkbox || target instanceof JRadioButton) {
			if (target == optionPanel.getVelocityBox()) {
				twoBody.setShowVelocity(optionPanel.showVelocity());
			} else {
				if (target == optionPanel.getAreaBox()) {
					twoBody.setShowArea(optionPanel.showArea());
				} else {
					twoBody.setShowOrbit(optionPanel.showOrbit());
					twoBody.setPerspective(optionPanel.Perspective());
				}
			}
		}
//		return true;
	}

	@Override
	public String getAppletInfo() {
		return "The Northwestern University Virtual Physics Lab, Nov. 1998";
	}

	@Override
	public void init() {
	}

	@Override
	public void start() {
		twoBody.init();
		twoBody.prepareImage(); // BH added
		twoBody.start(); // BH  added to allow resizing
	}

}

class KeplerCanvas extends Canvas /*implements Runnable*/ {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private final KeplerCircle cRed, cBlue;
	private final KeplerVector vecRed, vecBlue;
	private Timer demo; // converted Thread to timer for swingjs.  -PF

	private Image offImage, orbitTrace;
	private Graphics og, tg;

	private double p, e, massRatio; // parameters for the motion
	private boolean showOrbit; // if the orbit is shown
	private boolean showArea; // if the area is shown
	private boolean showVelocity; // if the velocity vector is shown
	private int perspective; // 1 stands for Red, 2 for Blue, 3 for CM;
	private int count;
	private int timeInterval;
	private boolean justChanged; // show if the parameters have just been
	// changed
	private double r, theta; // current location of the planets
	private double xx, yy;

	private boolean stopRunning = false;

	private final Dimension expectedSize = new Dimension(550, 500);
	private Kepler applet;

	public KeplerCanvas(Kepler kepler) {
		this.applet = kepler;
		showOrbit = false;
		showArea = false;
		showVelocity = false;
		setBackground(Color.black);
		cRed = new KeplerCircle(5, Color.red);
		cBlue = new KeplerCircle(5, Color.blue);
		vecRed = new KeplerVector(Color.green);
		vecBlue = new KeplerVector(Color.green);
		p = 5;
		e = 0;
		massRatio = 10;
		perspective = 3;
		count = 0;
		timeInterval = 10;
	}

	public void advance() {
		compute();
		prepareImage();
		justChanged = false;
	}

	private void advanceTheta() {
		theta += 1 / (r * r);
	}

	private void clear(Graphics g) {
		g.setColor(getBackground());
		g.fillRect(0, 0, getExpectedSize().width, getExpectedSize().height);
	}

	/** do calculations */
	private void compute() {
		final Dimension dim = getExpectedSize();
		final double x = xx, y = yy;
		r = p / (1 + (e * Math.cos(theta)));
		xx = (dim.width / 20.) * r * Math.cos(theta);
		yy = (dim.height / 20.) * r * Math.sin(theta);
		advanceTheta();
		double fRed, fBlue;
		switch (perspective) {
		case 1: // red ball at center
			fRed = 0;
			fBlue = 1;
			break;
		case 2: // blue ball at center
			fRed = -1;
			fBlue = 0;
			break;
		case 3: // CM at center
		default:
			fRed = -1 / (1 + massRatio);
			fBlue = 1 / (1 + (1 / massRatio));
		}
		int xp = (dim.width / 2) + round(xx * fRed);
		int yp = (dim.height / 2) + round(yy * fRed);
		cRed.setLocation(xp, yp);
		vecRed.setLocation(xp, yp);
		xp = (dim.width / 2) + round(xx * fBlue);
		yp = (dim.height / 2) + round(yy * fBlue);
		cBlue.setLocation(xp, yp);
		vecBlue.setLocation(xp, yp);
		vecRed.set(fRed * (xx - x) * 5., fRed * (yy - y) * 5.);
		vecBlue.set(fBlue * (xx - x) * 5., fBlue * (yy - y) * 5.);
	}

	private Dimension getExpectedSize() {
		return expectedSize;
	}

	public void init() {
				
		offImage = createImage(getExpectedSize().width,
				getExpectedSize().height);
		orbitTrace = createImage(getExpectedSize().width,
				getExpectedSize().height);
		og = offImage.getGraphics();
		tg = orbitTrace.getGraphics();
	}

	public void mypaint(Graphics g) {
		if (demo != null) {
			cRed.draw(g);
			cBlue.draw(g);
			if (showVelocity) {
				vecRed.draw(g);
				vecBlue.draw(g);
			}
		}
	}

	void prepareImage() {
		
		if (applet.getWidth() != getExpectedSize().width
				|| applet.getHeight() != getExpectedSize().height) {
			expectedSize.setSize(applet.getWidth(), applet.getHeight());
			init();			
		}
		// Color bg = getBackground();

		// Erase the previous image.
		if (showOrbit || showArea) {
			if (justChanged) {
				clear(tg);
			} else {
				if (showArea) {
					final Point center = new Point(getExpectedSize().width / 2,
							getExpectedSize().height / 2);
					if (count < timeInterval) {
						cRed.drawArea(tg, center);
						cBlue.drawArea(tg, center);
					} else {
						cRed.eraseArea(tg, center, getBackground());
						cBlue.eraseArea(tg, center, getBackground());
					}
					count++;
					count = (count % (2 * timeInterval));
				}
				if (showOrbit) {
					cRed.drawOrbit(tg);
					cBlue.drawOrbit(tg);
				}
			}
			og.drawImage(orbitTrace, 0, 0, null);
		} else {
			clear(og);
		}
		mypaint(og);
	}

	private int round(double x) {
		return (int) (x + .5);
	}

	/*
	public void run() {
		while (!stopRunning) {
			advance();
			repaint();
			try {
				Thread.sleep(30);
			} catch (final InterruptedException e) {
			}
		}
	}
	*/

	public void setE(double eIn) {
		e = eIn;
		justChanged = true;
	}

	public void setMassRatio(double rIn) {
		massRatio = rIn;
		justChanged = true;
	}

	public void setP(double pIn) {
		p = pIn;
		justChanged = true;
	}

	public void setPerspective(int perIn) {
		perspective = perIn;
		justChanged = true;
	}

	public void setShowArea(boolean b) {
		showArea = b;
		count = 0;
		justChanged = true;
	}

	public void setShowOrbit(boolean b) {
		showOrbit = b;
		justChanged = true;
	}

	public void setShowVelocity(boolean b) {
		showVelocity = b;
	}

	public void setTimeInterval(int i) {
		timeInterval = i;
		justChanged = true;
	}

	public void start() {
	    System.out.println("start");
		if (demo == null) {
			stopRunning = false;
			    // SwingJS doesn't like threads that sleep, use a timer.  -PF
		            demo = new Timer(30, new ActionListener() {
		                public void actionPerformed(ActionEvent evt) {
		                    advance();
		                    applet.repaint();
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

	@Override  // PF use paintComponent() instead // BH - that is OK now
	public final void paint(Graphics g) {
		g.drawImage(offImage, 0, 0, null);
	}
	
//	public void paintComponent(Graphics g) {
//	    super.paintComponent(g);
//	    g.drawImage(offImage, 0, 0, null);
//	}
}

class KeplerCircle {
	private final int myRadius;
	private final Color myColor;
	private Point myLocation;
	private final Point lastLocation;

	/* Constructor */
	public KeplerCircle(int radius, Color c) {
		myRadius = radius;
		myColor = c;
		myLocation = new Point(0, 0);
		lastLocation = new Point(1, 1);
	}

	/* Display the shape */
	public void draw(Graphics g) {
		g.setColor(myColor);
		g.fillArc(myLocation.x - myRadius, myLocation.y - myRadius,
				(2 * myRadius), (2 * myRadius), 0, 360);
	}

	public void drawArea(Graphics g, Point center) {
		drawAreaWithColor(g, center, myColor);
	}

	private void drawAreaWithColor(Graphics g, Point center, Color c) {
		final int[] xPoints = new int[3];
		final int[] yPoints = new int[3];
		xPoints[0] = center.x;
		yPoints[0] = center.y;
		xPoints[1] = lastLocation.x;
		yPoints[1] = lastLocation.y;
		xPoints[2] = myLocation.x;
		yPoints[2] = myLocation.y;
		g.setColor(c);
		g.fillPolygon(xPoints, yPoints, 3);
	}

	public void drawOrbit(Graphics g) {
		g.setColor(myColor);
		g.drawLine(lastLocation.x, lastLocation.y, myLocation.x, myLocation.y);
	}

	public void erase(Graphics g, Color bg) {
		g.setColor(bg);
		g.fillArc(lastLocation.x - myRadius, lastLocation.y - myRadius,
				(2 * myRadius), (2 * myRadius), 0, 360);
	}

	public void eraseArea(Graphics g, Point center, Color bg) {
		drawAreaWithColor(g, center, bg);
	}

	/** Return this shape's area */
	public double getArea() {
		return Math.PI * (myRadius * myRadius);
	}

	public String getKind() {
		return "Circle";
	}

	public Point getLocation() {
		return myLocation;
	}

	/** Return this shape's perimeter */
	public double getPerimeter() {
		return 2 * Math.PI * myRadius;
	}

	public void setLocation(int x, int y) {
		lastLocation.x = myLocation.x;
		lastLocation.y = myLocation.y;
		myLocation.x = x;
		myLocation.y = y;
	}

	public void setLocation(Point pt) {
		lastLocation.x = myLocation.x;
		lastLocation.y = myLocation.y;
		myLocation = pt;
	}
}

class KeplerInputPanel extends Panel {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private TextField mRatio, pOrbit, eOrbit, timeInterval;

	public KeplerInputPanel(ActionListener app) {
		setLayout(new GridLayout(2, 4, 5, 5)); // nr, nc, vg, hg
		final Color darkMagenta = new Color(150, 0, 150);

		Button btemp;
		btemp = new Button("m_Red/m_Blue = ");
		btemp.setForeground(darkMagenta);
		btemp.addActionListener(app); // PF added for swing
		add(btemp);
		add(mRatio = new TextField("8", 2));
		mRatio.addActionListener(app); // PF added

		btemp = new Button("Orbit param : p = ");
		btemp.setForeground(darkMagenta);
		btemp.addActionListener(app); // PF added
		add(btemp);
		add(pOrbit = new TextField("5", 2));
		pOrbit.addActionListener(app); // PF added

		btemp = new Button("Time interval: t = ");
		btemp.setForeground(Color.blue);
		btemp.addActionListener(app); // PF added
		add(btemp);
		add(timeInterval = new TextField("10", 2));
		timeInterval.addActionListener(app); // PF added

		btemp = new Button("Orbit param : e = ");
		btemp.setForeground(darkMagenta);
		btemp.addActionListener(app); // PF added
		add(btemp);
		add(eOrbit = new TextField("0.4", 2));
		eOrbit.addActionListener(app); // PF added
	}

	public double getE() {
		return getValue(eOrbit);
	}

	private int getInteger(TextField t) {
		return (Integer.valueOf(t.getText().trim())).intValue();
	}

	public double getP() {
		return getValue(pOrbit);
	}

	public double getRatio() {
		return getValue(mRatio);
	}

	public int getTimeInterval() {
		return getInteger(timeInterval);
	}

	private double getValue(TextField t) {
		return (Double.valueOf(t.getText().trim())).doubleValue();
	}

}

class KeplerOptionPanel extends Panel implements ActionListener {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	CheckboxGroup perspective;
	JRadioButton redPlanet;
	JRadioButton bluePlanet;
	JRadioButton center;

	Checkbox displayArea;
	Label area;

	Checkbox displayVelocity;

	Checkbox displayOrbit;

	Button startStop;

	boolean isStart;
	Kepler app;

	public KeplerOptionPanel(Kepler app_) {
	    	app = app_;
		setLayout(new GridLayout(8, 1, 2, 5)); // nr, nc, vg, hg
		// Color darkMagenta = new Color(150, 0, 150);

		perspective = new CheckboxGroup();

		add(new Label("Perspective: "));
		redPlanet = Checkbox.newRadioButton("red planet", perspective, false);
		redPlanet.setForeground(Color.red);
		add(redPlanet);
		bluePlanet = Checkbox.newRadioButton("blue planet", perspective, false);
		bluePlanet.setForeground(Color.blue);
		add(bluePlanet);
		add(center = Checkbox.newRadioButton("center of mass", perspective, true));

		add(displayArea = new Checkbox("show area"));

		add(displayVelocity = new Checkbox("show velocity"));
		add(displayOrbit = new Checkbox("show orbit"));

		startStop = new Button("Start");
		// startStop.setBackground(Color.gray);
		startStop.setForeground(Color.red);
		add(startStop);
		
		// added for swingjs. -PF
		redPlanet.addActionListener(app);
		bluePlanet.addActionListener(app);
		center.addActionListener(app);
		displayArea.addActionListener(app);
		displayVelocity.addActionListener(app);
		displayOrbit.addActionListener(app);
		startStop.addActionListener(this);

		isStart = false;
	}

	@Override
	// update this ancient code that was using action() to respond to buttons -PF
	public void actionPerformed(ActionEvent evt) {
		if (evt.getSource() == startStop) {
			isStart = !isStart;
			if (isStart) {
				startStop.setLabel("Stop");
			} else {
				startStop.setLabel("Start");
			}
			app.actionPerformed(evt);
		}
//		return false;
	}

	public Checkbox getAreaBox() {
		return displayArea;
	}

	public Checkbox getVelocityBox() {
		return displayVelocity;
	}

	public boolean isMoving() {
		return isStart;
	}

	public int Perspective() {
		final JRadioButton cb = perspective.getSelectedCheckbox();
		if (cb == redPlanet) {
			return 1;
		}
		if (cb == bluePlanet) {
			return 2;
		} else {
			return 3;
		}
	}

	public boolean showArea() {
		return displayArea.getState();
	}

	public boolean showOrbit() {
		return displayOrbit.getState();
	}

	public boolean showVelocity() {
		return displayVelocity.getState();
	}

	// private void changeLabel(String s) {
	// startStop.setLabel(s);
	// }
}

class KeplerVector {
	private double r, theta;
	private final double width;
	private final Point location;
	private final Color myColor;

	KeplerVector(Color c) {
		width = 1;
		myColor = c;
		location = new Point(0, 0);
		r = theta = 0;
	}

	KeplerVector(double w, Color c) {
		width = w;
		myColor = c;
		location = new Point(0, 0);
		r = theta = 0;
	}

	public void draw(Graphics g) {
		final double xa = -width * Math.sin(theta), ya = width
				* Math.cos(theta);
		final double xv = r * Math.cos(theta), yv = r * Math.sin(theta);
		final int[] xTail = new int[4];
		final int[] yTail = new int[4];
		xTail[0] += round(location.x + xa);
		yTail[0] += round(location.y + ya);
		xTail[1] += round(location.x - xa);
		yTail[1] += round(location.y - ya);
		xTail[2] += round((location.x + xv) - xa);
		yTail[2] += round((location.y + yv) - ya);
		xTail[3] += round(location.x + xv + xa);
		yTail[3] += round(location.y + yv + ya);
		g.setColor(myColor);
		g.fillPolygon(xTail, yTail, 4);
	}

	private int round(double x) {
		return (int) (x + .5);
	}

	public void set(double x, double y) {
		r = Math.sqrt((x * x) + (y * y));
		theta = Math.atan2(y, x);
	}

	public void setAngle(double t) {
		theta = t;
	}

	public void setLocation(int x, int y) {
		location.x = x;
		location.y = y;
	}

	public void setNorm(double n) {
		r = n;
	}

}
