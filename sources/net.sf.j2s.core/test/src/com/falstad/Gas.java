package com.falstad;

//Gas.java (C) 2001 by Paul Falstad, www.falstad.com
//
//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> a2s
//
//import java.awt [Applet, Canvas, Checkbox, Choice, Label, Scrollbar] --> a2s

// missing hist_cv.updateComponent()

//web_Ready
//web_AppletName= Gas
//web_Description= A simulation of the ideal gas law.
//web_Date= 02/08/2016
//web_JavaVersion= www.falstad.com/gas
//web_AppletImage= gas.png
//web_Category= Chemistry - Ideal Gases
//web_Features= graphics, AWT-to-Swing

import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Random;
import java.util.Vector;

import a2s.Applet;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Label;
import a2s.Scrollbar;

class GasCanvas extends Canvas {
 Gas pg;
 GasCanvas(Gas p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateGas(g);
 }
 public void paintComponent(Graphics g) {
	pg.updateGas(g);
 }
};

class HistogramCanvas extends Canvas {
 Gas pg;
 HistogramCanvas(Gas p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(125,50);
 }
 public void update(Graphics g) {
	pg.updateHistogram(g);
 }

 public void paintComponent(Graphics g) {
	pg.updateHistogram(g);
 }

};

class GasLayout implements LayoutManager {
 public GasLayout() {}
 public void addLayoutComponent(String name, Component c) {}
 public void removeLayoutComponent(Component c) {}
 public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
 }
 public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
 }
 public void layoutContainer(Container target) {
	int cw = target.size().width * 2/3;
	target.getComponent(0).move(0, 0);
	target.getComponent(0).resize(cw, target.size().height-100);
	target.getComponent(1).move(0, target.size().height-100);
	target.getComponent(1).resize(cw, 100);
	int i;
	int h = 0;
	for (i = 2; i < target.getComponentCount(); i++) {
	    Component m = target.getComponent(i);
	    if (m.isVisible()) {
		Dimension d = m.getPreferredSize();
		if (m instanceof Scrollbar)
		    d.width = target.size().width - cw;
		int c = 0;
		if (m instanceof Label) {
		    h += d.height/3;
		    c = (target.size().width-cw-d.width)/2;
		}
		m.move(cw+c, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	}
 }
};


public class Gas extends Applet
implements ComponentListener, ActionListener, AdjustmentListener,
          ItemListener {
 
 Thread engine = null;
 int molCount;

 Dimension winSize;
 Image dbimage;
 
 public static final int defaultPause = 10;
 int heaterSize;
 int pause;
 Random random;
 
 public String getAppletInfo() {
	return "Gas Molecules by Paul Falstad";
 }

 public static int gridEltWidth = 10; // was 60
 public static int gridEltHeight = 10;
 int gridWidth;
 int gridHeight;
 Molecule mols[];
 Molecule grid[][];
 Molecule bigmol;
 Button resetButton;
 Button expandButton;
 Checkbox stoppedCheck;
 Checkbox heaterCheck;
 Checkbox energyCheck;
 Scrollbar heaterTempBar;
 Scrollbar gravityBar;
 Scrollbar speedBar;
 Scrollbar molCountBar;
 Scrollbar colorBar;
 Choice setupChooser;
 Vector setupList;
 Setup setup;
 double gravity;
 double colorMult;
 int upperBound;
 double topWallPos;
 double topWallVel;
 int areaHeight;
 double heatstate;
 double heaterTemp;
 double heaterMove;
 double wallF, wallFMeasure;
 Color heaterColor;
 Color colors[];
 int heaterTop;
 int heaterLeft;
 int heaterRight;
 final int maxMolCount = 1000;
 NumberFormat showFormat;

 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 GasCanvas cv;
 HistogramCanvas hist_cv;

 public void init() {
	setupList = new Vector();
	Setup s = new Setup1Random();
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	}
	showFormat = DecimalFormat.getInstance();
	showFormat.setMaximumFractionDigits(3);
	
	int ci = 0;
	heatstate = 0;
	colors = new Color[16];
	colors[ci++] = new Color(46,120,255);
	colors[ci++] = new Color(79,140,254);
	colors[ci++] = new Color(113,142,253);
	colors[ci++] = new Color(147,145,252);
	colors[ci++] = new Color(181,105,178);
	colors[ci++] = new Color(215,64,103);
	colors[ci++] = new Color(249,23,28);
	colors[ci++] = new Color(250,101,44);
	colors[ci++] = new Color(251,139,33);
	colors[ci++] = new Color(252,178,22);
	colors[ci++] = new Color(253,216,11);
	colors[ci++] = new Color(255,255,0);
	colors[ci++] = new Color(255,255,63);
	colors[ci++] = new Color(255,255,127);
	colors[ci++] = new Color(255,255,191);
	colors[ci++] = new Color(255,255,255);
	gravity = 0;
	//setLayout(new GridLayout(3, 1, 10, 10));
	setLayout(new GasLayout());
	//setLayout(new GridBagLayout());
	cv = new GasCanvas(this);
	cv.addComponentListener(this);
	add(cv);
	hist_cv = new HistogramCanvas(this);
	hist_cv.addComponentListener(this);
	add(hist_cv);

	setupChooser = new Choice();
	int i;
	for (i = 0; i != setupList.size(); i++)
	    setupChooser.add("Setup: " +
			     ((Setup) setupList.elementAt(i)).getName());
	setupChooser.addItemListener(this);
	add(setupChooser);

	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	add(stoppedCheck);

	heaterCheck = new Checkbox("Heater");
	heaterCheck.addItemListener(this);
	add(heaterCheck);

	energyCheck = new Checkbox("Energy Distribution");
	energyCheck.addItemListener(this);
	add(energyCheck);

	add(resetButton = new Button("Reset"));
	resetButton.addActionListener(this);
	add(expandButton = new Button("Expand"));
	expandButton.addActionListener(this);
	add(new Label("Simulation Speed", Label.CENTER));
	add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 1, 0, 100));
	speedBar.addAdjustmentListener(this);
	add(new Label("Molecule Count", Label.CENTER));
	add(molCountBar = new Scrollbar(Scrollbar.HORIZONTAL, 500, 1, 1, maxMolCount));
	molCountBar.addAdjustmentListener(this);
	add(new Label("Color Scale", Label.CENTER));
	add(colorBar = new Scrollbar(Scrollbar.HORIZONTAL, 150, 1, 1, 300));
	colorBar.addAdjustmentListener(this);
	add(new Label("Heater Temperature", Label.CENTER));
	add(heaterTempBar = new Scrollbar(Scrollbar.HORIZONTAL, 35, 1, 0, 100));
	heaterTempBar.addAdjustmentListener(this);
	add(new Label("Gravity", Label.CENTER));
	add(gravityBar = new Scrollbar(Scrollbar.HORIZONTAL, 20, 1, 0, 100));
	gravityBar.addAdjustmentListener(this);
	cv.setBackground(Color.black);
	cv.setForeground(heaterColor = Color.lightGray);
	hist_cv.setBackground(Color.black);
	hist_cv.setForeground(Color.lightGray);
	random = new Random();
	pause = defaultPause;
	adjustColors();
	adjustHeaterTemp();
	enableItems();
	try {
	    String param = getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	reinit(true);
	repaint();
 }

 static final int SPEED_RANDOM  = 0;
 static final int SPEED_EQUAL   = 1;
 static final int SPEED_EXTREME = 2;

 void reinit(boolean newsetup) {
	if (cv.getSize().width == 0 || gravityBar == null || setupChooser == null)
	    return;
	System.out.println("winsize " + winSize);
	bigmol = null;
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	gravityBar.setValue(0);
	if (newsetup) {
	    speedBar.setValue(20);
	    molCountBar.setValue(500);
	    colorBar.setValue(160);
	    setup.select();
	}
	setup.reinit();
	adjustColors();
 }
 
 void expand() {
	topWallPos -= 50;
	if (topWallPos < 0)
	    topWallPos = 0;
	enableItems();
 }

 void initMolecules(int speed) {
     Dimension d = winSize = cv.getSize();
	molCount = molCountBar.getValue();
	upperBound = (int) (winSize.height*(1-setup.getVolume())-1);
	topWallPos = upperBound;
	areaHeight = winSize.height-upperBound;
	mols = new Molecule[maxMolCount];
	dbimage = createImage(d.width, d.height);
	gridWidth =  d.width /gridEltWidth+1;
	gridHeight = d.height/gridEltHeight+1;
	grid = new Molecule[gridWidth][gridHeight];
	int i, j;
	for (i = 0; i != gridWidth; i++)
	    for (j = 0; j != gridHeight; j++) {
		grid[i][j] = new Molecule();
		grid[i][j].listHead = true;
	    }
	for (i = 0; i != maxMolCount; i++) {
	    Molecule m = new Molecule();
	    mols[i] = m;
	    m.x = getrand(winSize.width*10)*.1;
	    m.y = getrand(areaHeight*10)*.1+upperBound;
	    m.dx = (getrand(100)/99.0-.5);
	    m.dy = java.lang.Math.sqrt(1-m.dx*m.dx);
	    if (getrand(10) > 4)
		m.dy = -m.dy;
	    if (speed == SPEED_EXTREME) {
		double q = ((i & 2) > 0) ? 3 : .1;
		m.dx *= q;
		m.dy *= q;
	    }
	    if (speed == SPEED_RANDOM) {
		double q = getrand(101)/50.;
		m.dx *= q;
		m.dy *= q;
	    }
	    if (Double.isNaN(m.dx) || Double.isNaN(m.dy))
		System.out.println("nan1");
	    setColor(m);
	    if (i < molCount)
		gridAdd(m);
	}
	heaterTop = winSize.height-5;
	heaterSize = winSize.width/4;
	heaterLeft = (winSize.width-heaterSize*3)/2;
	heaterRight = (winSize.width+heaterSize*3)/2;
	enableItems();
	cv.repaint();
	hist_cv.repaint();
 }

 void setMoleculeTypes(double mult, int typeCount) {
	int i, j;
	for (i = 0; i != maxMolCount; i++) {
	    Molecule m = mols[i];
	    m.r *= mult;
	    m.mass *= mult*mult;
	    if (typeCount > 1) {
		int n = (i % typeCount);
		m.type = n;
		if (n == 2) {
		    m.r *= 3;
		    m.mass *= 9; // was 27
		} else if (n == 1) {
		    m.r *= 2;
		    m.mass *= 4; // was 8
		}
	    }
	    setColor(m);
	}
 }

 long secTime, lastTime;
 double t, lastSecT, totalKE, temp, totalV;
 
	public void updateGas(Graphics realg) {
		if (winSize == null)
			return;
		Graphics g = dbimage.getGraphics();
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		int j;

		double dt = speedBar.getValue() / 100.;
		if (!stoppedCheck.getState()) {
			long sysTime = System.currentTimeMillis();
			if (lastTime != 0) {
				int inc = (int) (sysTime - lastTime);
				dt *= inc / 8.;
			}
			if (sysTime - secTime >= 1000) {
				if (t > 0)
					wallF /= t - lastSecT;
				wallFMeasure = wallF;
				wallF = 0;
				secTime = sysTime;
				lastSecT = t;
			}
			lastTime = sysTime;
		} else
			lastTime = 0;

		for (short i = 0; i != molCount; i++) {
			Molecule m = mols[i];
			boolean bounce = false;
			int ix = (int) m.x;
			int iy = (int) m.y;
			j = (stoppedCheck.getState()) ? 5 : 0;
			for (; j < 5; j++) {
				m.dy += gravity * dt;
				m.x += m.dx * dt;
				m.y += m.dy * dt;
				if (Double.isNaN(m.dx) || Double.isNaN(m.dy))
					System.out.println("nan2");
				int r = m.r;
				if (m.x < r || m.x >= winSize.width - r) {
					wallF += Math.abs(m.dx) * m.mass;
					m.dx = -m.dx;
					if (m.x < m.r)
						m.x = m.r;
					if (m.x >= winSize.width - r)
						m.x = winSize.width - r - 1;
					setColor(m);
					bounce = true;
				}
				if (m.y < upperBound + r || m.y >= winSize.height - r) {
					wallF += Math.abs(m.dy) * m.mass;
					if (m.y < upperBound + r)
						m.y = upperBound + r;
					if (m.y >= winSize.height - r)
						m.y = winSize.height - r - 1;
					if (m.y == upperBound + r && m.dy < 0 && false) {
						double wallMass = 1000;
						double totmass = m.mass + wallMass;
						double comdy = (m.mass * m.dy + wallMass * topWallVel) / totmass;
						double chg = (m.dy - comdy);
						// System.out.print("< " + m.dy + " " + topWallVel + "\n");
						m.dy -= 2 * chg;
						topWallVel += 2 * chg * m.mass / wallMass;
						// System.out.print("> " + m.dy + " " + topWallVel + "\n");
					} else
						m.dy = -m.dy;
					setColor(m);
					bounce = true;
				}
				int nix = (int) m.x;
				int niy = (int) m.y;
				if (!bounce && nix >= heaterLeft && nix <= heaterRight
						&& niy >= heaterTop - 1 && heaterCheck.getState()) {
					double v = java.lang.Math.sqrt(m.dx * m.dx + m.dy * m.dy);
					double oldy = m.dy;
					// calculate velocity of particle if it were at heater temp
					double mxv = Math.sqrt(3 * heaterTemp / m.mass);
					// mix this velocity with particle's velocity randomly
					double mix = getrand(100) / 99.0;
					mix = 0;
					double newv = v * mix + mxv * (1 - mix);
					// randomize direction
					m.dx = getrand(101) / 50.0 - 1;
					m.dy = -Math.sqrt(1 - m.dx * m.dx) * newv;
					m.dx *= newv;
					if (Double.isNaN(m.dx) || Double.isNaN(m.dy))
						System.out.println("nan3");
					wallF += (oldy - m.dy) * m.mass;
					setColor(m);
					bounce = true;
					m.y = heaterTop - 2;
					niy = (int) m.y;
				}
				Molecule m2 = (bounce) ? null : checkCollision(m);
				if (m2 != null) {
					// handle a collision
					// first, find exact moment they collided by solving
					// a quadratic equation:
					// [(x1-x2)+t(dx1-dx2)]^2 + [(y1-y2)+...]^2 = mindist^2
					// (first deal with degenerate case where molecules are on top
					// of each other)
					if (m.dx == m2.dx && m.dy == m2.dy) {
						if (m.dx == 0 && m.dy == 0)
							continue;
						m.dx += .001;
					}
					double sdx = m.dx - m2.dx;
					double sx = m.x - m2.x;
					double sdy = m.dy - m2.dy;
					double sy = m.y - m2.y;
					int mindist = m.r + m2.r;
					double a = sdx * sdx + sdy * sdy;
					double b = 2 * (sx * sdx + sy * sdy);
					double c = sx * sx + sy * sy - mindist * mindist;
					double t = (-b - java.lang.Math.sqrt(b * b - 4 * a * c)) / a;
					double t2 = (-b + java.lang.Math.sqrt(b * b - 4 * a * c)) / a;
					if (java.lang.Math.abs(t) > java.lang.Math.abs(t2))
						t = t2;
					if (Double.isNaN(t))
						System.out.print("nan " + m.dx + " " + m.dy + " " + m2.dx + " "
								+ m2.dy + " " + a + " " + b + " " + c + " " + t + " " + t2
								+ "\n");

					// backtrack m to where they collided.
					// (t is typically negative.)
					m.x += t * m.dx;
					m.y += t * m.dy;

					// ok, so now they are just touching. find vector
					// separating their centers and normalize it.
					sx = m.x - m2.x;
					sy = m.y - m2.y;
					double sxynorm = java.lang.Math.sqrt(sx * sx + sy * sy);
					double sxn = sx / sxynorm;
					double syn = sy / sxynorm;

					// find velocity of center of mass
					double totmass = m.mass + m2.mass;
					double comdx = (m.mass * m.dx + m2.mass * m2.dx) / totmass;
					double comdy = (m.mass * m.dy + m2.mass * m2.dy) / totmass;
					// System.out.print("<x " + (m.dx-comdx) + " " + (m2.dx-comdx) +
					// "\n");
					// System.out.print("<y " + (m.dy-comdy) + " " + (m2.dy-comdy) +
					// "\n");

					// subtract COM velocity from m's momentum and
					// project result onto the vector separating them.
					// This is the component of m's momentum which
					// must be turned the other way. Double the
					// result. This is the momentum that is
					// transferred.
					double pn = (m.dx - comdx) * sxn + (m.dy - comdy) * syn;
					double px = 2 * sxn * pn;
					double py = 2 * syn * pn;

					// subtract this vector from m's momentum
					m.dx -= px;
					m.dy -= py;
					if (Double.isNaN(m.dx))
						System.out.println("nan0 " + sxynorm + " " + pn);

					// adjust m2's momentum so that total momentum
					// is conserved
					double mult = m.mass / m2.mass;
					m2.dx += px * mult;
					m2.dy += py * mult;
					// System.out.print(">x " + (m.dx-comdx) + " " + (m2.dx-comdx) +
					// "\n");
					// System.out.print(">y " + (m.dy-comdy) + " " + (m2.dy-comdy) +
					// "\n");

					// send m on its way
					if (t < 0) {
						m.x -= t * m.dx;
						m.y -= t * m.dy;
					}
					if (m.x < r)
						m.x = r;
					if (m.x >= winSize.width - r)
						m.x = winSize.width - r;
					if (m.y < upperBound + r)
						m.y = upperBound + r;
					if (m.y >= winSize.height - r)
						m.y = winSize.height - r - 1;
					if (Double.isNaN(m.dx) || Double.isNaN(m.dy))
						System.out.println("nan4");
					if (Double.isNaN(m2.dx) || Double.isNaN(m2.dy))
						System.out.println("nan5");
					setColor(m);
					setColor(m2);
				}
				// this line may not be reached
			}
			g.setColor(m.color);
			g.fillOval((int) m.x - m.r, (int) m.y - m.r, m.r * 2, m.r * 2);
			// XXX
			// g.fillRect((int)m.x-m.r, (int)m.y-m.r, m.r*2, m.r*2);
			gridRemove(m);
			gridAdd(m);
		}
		t += dt * 5;
		totalKE = 0;
		totalV = 0;
		for (short i = 0; i != molCount; i++) {
			Molecule m = mols[i];
			totalKE += m.ke;
			totalV += m.r * m.r;
		}
		totalV *= Math.PI;
		temp = totalKE / molCount; // T = K.E./k in 2-d

		// topWallVel += volumeBar.getValue()*.01;
		if (topWallVel > .5)
			topWallVel = .5;
		topWallPos += topWallVel * 5;
		if (topWallPos < 0) {
			topWallPos = 0;
			if (topWallVel < 0)
				topWallVel = 0;
		}
		if (topWallPos > (winSize.height * 4 / 5)) {
			topWallPos = (winSize.height * 4 / 5);
			if (topWallVel > 0)
				topWallVel = 0;
		}
		upperBound = (int) topWallPos;

		int heatstateint = ((int) heatstate);
		if (heaterCheck.getState()) {
			for (j = 0; j != heaterSize; j++, heatstateint++) {
				int x = heaterLeft + j * 3;
				int y = heatstateint & 3;
				if ((heatstateint & 4) == 4)
					y = 4 - y;
				g.setColor(heaterColor);
				g.fillRect(x, heaterTop + y, 2, 2);
			}
		}
		g.setColor(Color.lightGray);
		g.drawRect(0, upperBound, winSize.width - 1, winSize.height - 1
				- upperBound);
		g.fillRect(winSize.width / 2 - 20, 0, 40, upperBound);
		realg.drawImage(dbimage, 0, 0, this);
		if (!stoppedCheck.getState()) {
			heatstate += heaterMove;
			cv.repaint(pause);
			hist_cv.repaint(pause);
		}
	}

 void gridAdd(Molecule m) {
	int gx = (int) (m.x/gridEltWidth);
	int gy = (int) (m.y/gridEltHeight);
	Molecule g = grid[gx][gy];
	m.next = g;
	m.prev = g.prev;
	g.prev = m;
	m.prev.next = m;
 }

 void gridRemove(Molecule m) {
	m.next.prev = m.prev;
	m.prev.next = m.next;
 }

 Molecule checkCollision(Molecule m) {
	if (bigmol != null) {
	    Molecule q = checkCollisionList(m,
		 grid[(int) (bigmol.x/gridEltWidth)]
		     [(int) (bigmol.y/gridEltHeight)]);
	    if (q != null)
		return q;
	}
	int gx = (int) (m.x/gridEltWidth);
	int gy = (int) (m.y/gridEltHeight);
	int i, j;
	// check grid squares around the molecule for collisions
	for (i = -1; i <= 1; i++)
	    for (j = -1; j <= 1; j++) {
		if (gx+i < 0 || gy+j < 0 ||
		    gx+i >= gridWidth || gy+j >= gridHeight)
		    continue;
		Molecule n = checkCollisionList(m, grid[gx+i][gy+j]);
		if (n != null)
		    return n;
	    }
	return null;
 }

 Molecule checkCollisionList(Molecule m, Molecule list) {
	Molecule l = list.next;
	int count = 0;
	for (; !l.listHead; l = l.next) {
	    if (m == l)
		continue;
	    count++;
	    int mindist = m.r+l.r;
	    double dx = m.x-l.x;
	    double dy = m.y-l.y;
	    //System.out.print("ck " + dx + " " + dy + "\n");
	    if (dx > mindist || dy > mindist ||
		dx < -mindist || dy < -mindist)
		continue;
	    double dist = java.lang.Math.sqrt(dx*dx+dy*dy);
	    if (dist > mindist)
		continue;
	    //System.out.print("COLL " + m + " " + l + "\n");
	    return l;
	}
	return null;
 }

 void setColor(Molecule m) {
	m.vel = Math.sqrt(m.dx*m.dx+m.dy*m.dy);
	m.ke = .5*m.mass*m.vel*m.vel;
	int col = (int) (m.ke*colorMult);
	int maxcol = colors.length-1;
	if (col > maxcol) col = maxcol;
	m.color = colors[col];
 }

 int graphmax = 20;
 public void updateHistogram(Graphics realg) {
	if (winSize == null)
	    return;
	Dimension d = hist_cv.size();
	Graphics g = dbimage.getGraphics();
	g.setColor(hist_cv.getBackground());
	g.fillRect(0, 0, d.width, d.height);
	g.setColor(hist_cv.getForeground());
	int i;
	int slots = d.width/2;
	int graph[] = new int[slots];
	int gi;
	int mg = 0;
	int gicount = setup.getHistogramCount();
	boolean energy = energyCheck.getState();
	for (gi = 0; gi != gicount; gi++) {
	    int ymin = d.height*gi/gicount;
	    int ymax = d.height*(gi+1)/gicount-1;
	    int yheight = ymax-ymin;
	    double maxke = energy ? 70 : 15;
	    for (i = 0; i != slots; i++)
		graph[i] = 0;
	    double mass = 1;
	    int mcount = 0;
	    for (i = 0; i != molCount; i++) {
		Molecule m = mols[i];
		if (m.type != gi)
		    continue;
		mcount++;
		mass = m.mass;
		double value = (energy ? m.ke : m.vel);
		int r = (int) (value*slots/maxke);
		if (r >= slots)
		    continue;
		graph[r]++;
	    }
	    maxke += .5;
	    int maxcol = colors.length-1;
	    for (i = 0; i != slots; i++) {
		if (graph[i] == 0)
		    continue;
		if (graph[i] > mg)
		    mg = graph[i];
		int y = ymax-(graph[i] * yheight / graphmax);
		if (y < ymin)
		    y = ymin;
		double value = i*maxke/slots;
		if (!energy)
		    value *= mass*value;
		int col = (int) (value*colorMult);
		if (col > maxcol) col = maxcol;
		g.setColor(colors[col]);
		g.fillRect(i*2, y, 2, ymax-y+1);
	    }
	    int ox = -1, oy = -1;
	    g.setColor(Color.lightGray);
	    // not sure if maxwell energy distribution is right,
	    // comment it out for now
	    if (!energyCheck.getState()) {
		for (i = 0; i != slots; i++) {
		    double v = i*maxke/slots;
		    double dv = maxke/slots;
		    double distdv = .5*mcount*(maxwellDist(v, mass)+maxwellDist(v+dv, mass))*dv;
		    int v0 = (int) distdv;
		    int y = (ymax-(v0 * yheight / graphmax));
		    if (y < ymin)
			y = ymin;
		    int x = i*2;
		    if (ox != -1 && !(y == oy && oy == ymax))
			g.drawLine(ox, oy, x, y);
		    ox = x; oy = y;
		}
	    }
	}
	if (mg > graphmax)
	    graphmax = mg;
	if (mg < graphmax/2 && graphmax > 1)
	    graphmax /= 2;

	FontMetrics fm = g.getFontMetrics();
	g.setColor(Color.white);
	int x = winSize.width*2/3;
	double vadj = 4e-4;
	double v = (winSize.width-2)*(winSize.height-upperBound-2)*vadj;
	g.drawString("V = " + showFormat.format(v), x, fm.getAscent());
	g.drawString("n = " + molCount, x, fm.getAscent()+fm.getHeight());
	double a = 2*(winSize.width+(winSize.height-upperBound)-4);
	double p = 1e4 * wallFMeasure/(3*a);
	g.drawString("P = " + showFormat.format(p),
		     x, fm.getAscent()+2*fm.getHeight());
	g.drawString("kT = " + showFormat.format(temp), x,
		     fm.getAscent()+3*fm.getHeight());
	g.drawString("PV/nkT = " + showFormat.format(p*v/(molCount*temp)),
		     x, fm.getAscent()+4*fm.getHeight());
	g.drawString("P(V-nb)/nkT = " +
		     showFormat.format(p*(v-totalV*vadj)/(molCount*temp)),
		     x, fm.getAscent()+5*fm.getHeight());

	realg.drawImage(dbimage, 0, 0, this);
 }

 // 2-D Maxwell distribution of molecular speeds
 double maxwellDist(double v, double mass) {
	if (energyCheck.getState())
	    return Math.exp(-v/temp)/temp;
	return (mass/temp)*v*Math.exp(-mass*v*v/(2*temp));
 }
	
 public void componentHidden(ComponentEvent e){}
 public void componentMoved(ComponentEvent e){}
 public void componentShown(ComponentEvent e){}
 public void componentResized(ComponentEvent e) {
	reinit(false);
	cv.repaint(100);
	hist_cv.repaint(100);
 }
 public void actionPerformed(ActionEvent e) {
	System.out.println(e);
	if (e.getSource() == resetButton) {
	    reinit(false);
	    cv.repaint();
	}
	if (e.getSource() == expandButton) {
	    expand();
	    cv.repaint();
	}
 }
 public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.println(((Scrollbar) e.getSource()).getValue());
	/*if (e.getSource() == volumeBar) {
	    upperBound = winSize.height * (100-volumeBar.getValue()) / 100;
	    areaHeight = winSize.height - upperBound;
	    }*/ // XXXXXX
	if (e.getSource() == gravityBar)
	    gravity = gravityBar.getValue() * (.001/20);
	if (e.getSource() == heaterTempBar)
	    adjustHeaterTemp();
	if (e.getSource() == molCountBar)
	    adjustMolCount();
	if (e.getSource() == colorBar)
	    adjustColors();
 }

 void adjustHeaterTemp() {
	heaterTemp = (heaterTempBar.getValue() * .029111971)*30 + .01;
	heaterMove = (heaterTempBar.getValue() * .029111971) + .3;
	heaterMove /= 2;
	double value = 1.5*heaterTemp;
	int col = (int) (value*colorMult);
	int maxcol = colors.length-1;
	if (col > maxcol) col = maxcol;
	heaterColor = colors[col];
	System.out.println("htemp = " + heaterTemp);
 }

 void adjustColors() {
	int i;
	double c = colorBar.getValue() / 150.;
	colorMult = Math.exp((c-1)*4)*.7;
	for (i = 0; i != molCount; i++)
	    setColor(mols[i]);
 }

 void enableItems() {
	heaterTempBar.setEnabled(heaterCheck.getState());
	expandButton.setEnabled(topWallPos > 0);
 }
 
 public void itemStateChanged(ItemEvent e) {
	enableItems();
	if (e.getItemSelectable() == stoppedCheck) {
	    cv.repaint();
	    return;
	}
	if (e.getItemSelectable() == setupChooser)
	    reinit(true);
 }

 void adjustMolCount() {
	int oldcount = molCount;
	molCount = molCountBar.getValue();
	if (molCount == oldcount)
	    return;
	if (oldcount > molCount) {
	    int i;
	    for (i = molCount; i != oldcount; i++)
		gridRemove(mols[i]);
	} else {
	    int i;
	    for (i = oldcount; i != molCount; i++)
		gridAdd(mols[i]);
	}
 }
 
 class Molecule {
	public double x, y, dx, dy, mass, ke, vel;
	public int r, type;
	public Color color;
	public Molecule next, prev;
	public boolean listHead;
	Molecule() {
	    r = 2;
	    type = 0;
	    mass = 2;
	    next = prev = this;
	}
 };

 
 abstract class Setup {
	abstract String getName();
	void select() {}
	void reinit() {}
	void deselect() {}
	int getHistogramCount() { return 1; }
	double getVolume() { return 1; }
	abstract Setup createNext();
 };

 class Setup1Random extends Setup {
	String getName() { return "1 Gas, Random Speeds"; }
	void reinit() {
	    initMolecules(SPEED_RANDOM);
	    setMoleculeTypes(2, 1);
	}
	Setup createNext() { return new Setup1Equal(); }
 }
 class Setup1Equal extends Setup {
	String getName() { return "1 Gas, Equal Speeds"; }
	void select() { speedBar.setValue(3); }
	void reinit() {
	    initMolecules(SPEED_EQUAL);
	    setMoleculeTypes(2, 1);
	}
	Setup createNext() { return new Setup1Extreme(); }
 }
 class Setup1Extreme extends Setup {
	String getName() { return "1 Gas, Extreme Speeds"; }
	void select() { speedBar.setValue(3); }
	void reinit() {
	    initMolecules(SPEED_EXTREME);
	    setMoleculeTypes(2, 1);
	}
	Setup createNext() { return new Setup1Single(); }
 }
 class Setup1Single extends Setup {
	String getName() { return "1 Gas, One Moving Molecule"; }
	void select() { speedBar.setValue(10); }
	void reinit() {
	    initMolecules(SPEED_EQUAL);
	    int i, j;
	    for (i = 1; i != maxMolCount; i++)
		mols[i].dx = mols[i].dy = 0;
	    mols[0].dx *= Math.sqrt(molCount);
	    mols[0].dy *= Math.sqrt(molCount);
	    setMoleculeTypes(2, 1);
	}
	Setup createNext() { return new Setup1Small(); }
 }
 class Setup1Small extends Setup {
	String getName() { return "1 Gas, Small"; }
	void select() {
	    colorBar.setValue(215);
	    speedBar.setValue(36);
	}
	void reinit() {
	    initMolecules(SPEED_RANDOM);
	    setMoleculeTypes(1, 1);
	}
	Setup createNext() { return new Setup2Random(); }
 }
 class Setup2Random extends Setup {
	String getName() { return "2 Gases, Random Speeds"; }
	void reinit() {
	    initMolecules(SPEED_RANDOM);
	    setMoleculeTypes(1, 2);
	}
	int getHistogramCount() { return 2; }
	Setup createNext() { return new Setup2Equal(); }
 }
 class Setup2Equal extends Setup {
	String getName() { return "2 Gases, Equal Speeds"; }
	void select() { speedBar.setValue(3); }
	void reinit() {
	    initMolecules(SPEED_EQUAL);
	    setMoleculeTypes(1, 2);
	}
	int getHistogramCount() { return 2; }
	Setup createNext() { return new Setup3Random(); }
 }
 class Setup3Random extends Setup {
	String getName() { return "3 Gases, Random Speeds"; }
	void reinit() {
	    initMolecules(SPEED_RANDOM);
	    setMoleculeTypes(1, 3);
	}
	int getHistogramCount() { return 3; }
	Setup createNext() { return new Setup3Equal(); }
 }
 class Setup3Equal extends Setup {
	String getName() { return "3 Gases, Equal Speeds"; }
	void select() { speedBar.setValue(3); }
	void reinit() {
	    initMolecules(SPEED_EQUAL);
	    setMoleculeTypes(1, 3);
	}
	int getHistogramCount() { return 3; }
	Setup createNext() { return new SetupBrownian(); }
 }
 class SetupBrownian extends Setup {
	String getName() { return "Brownian Motion"; }
	void select() {
	    speedBar.setValue(70);
	    colorBar.setValue(210);
	}
	void reinit() {
	    initMolecules(SPEED_RANDOM);
	    bigmol = mols[0];
	    bigmol.r = 30;
	    bigmol.mass = bigmol.r*bigmol.r/2;
	    bigmol.dx = bigmol.dy = 0;
	}
	Setup createNext() { return new SetupExpansion(); }
 }
 class SetupExpansion extends Setup {
	String getName() { return "Free Expansion"; }
	void select() {
	    molCountBar.setValue(250);
	    speedBar.setValue(45);
	    colorBar.setValue(210);
	}
	void reinit() {
	    initMolecules(SPEED_RANDOM);
	    setMoleculeTypes(1, 1);
	}
	double getVolume() { return .5; }
	Setup createNext() { return null; }
 }
}

