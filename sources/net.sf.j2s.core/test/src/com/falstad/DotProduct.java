// DotProduct.java (C) 2001 by Paul Falstad, www.falstad.com

// Added imports
//
// paint --> paintComponent

package com.falstad;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.FontMetrics;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.text.NumberFormat;
import java.util.Random;

import a2s.Applet;

import a2s.Canvas;
import a2s.Button;

//web_Ready
//web_AppletName= DotProduct
//web_Description= Demonstrates the dot product or scalar product of two vectors
//web_JavaVersion= http://www.falstad.com/dotproduct/
//web_AppletImage= dotproduct.png
//web_Category= Mathematics
//web_Date= $Date: 2016-12-31 17:53:43 -0600 (Sat, 31 Dec 2016) $
//web_Features: graphics, AWT-to-Swing

class DotProductCanvas extends Canvas {
 DotProduct pg;
 DotProductCanvas(DotProduct p) {
	pg = p;
	setBackground(Color.BLACK);
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateDotProduct(g);
 }
 public void paintComponent(Graphics g) {
	 super.paintComponent(g);
	pg.updateDotProduct(g);
 }
};

class DotProductLayout implements LayoutManager {
 public DotProductLayout() {}
 public void addLayoutComponent(String name, Component c) {}
 public void removeLayoutComponent(Component c) {}
 public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
 }
 public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
 }
 public void layoutContainer(Container target) {
	int cw = target.size().width;
	int ct = target.getComponentCount();
	target.getComponent(ct-1).move(0, 0);
	target.getComponent(ct-1).resize(cw, target.size().height);
	int i;
	int h = 0;
	for (i = 0; i < ct-1; i++) {
	    Component m = target.getComponent(i);
	    if (m.isVisible()) {
		Dimension d = m.getPreferredSize();
		m.move(cw-d.width, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	}
 }
};


public class DotProduct extends Applet
implements ComponentListener, ActionListener, AdjustmentListener,
          MouseMotionListener, MouseListener {
 
 Thread engine = null;

 Dimension winSize;
 Image dbimage;
 
 Random random;
 
 public String getAppletInfo() {
	return "DotProduct by Paul Falstad";
 }

 Button swapButton;
 double vecs[][];
 int selection = -1;

 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 DotProductCanvas cv;

 public void init() {
	setLayout(new DotProductLayout());
	cv = new DotProductCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	add(swapButton = new Button("Swap"));
	swapButton.addActionListener(this);
	add(cv);
	setBackground(Color.black);
	setForeground(Color.lightGray);
	random = new Random();
	vecs = new double[2][2];
	vecs[0][0] = 0; vecs[0][1] = 1;
	vecs[1][0] = 1; vecs[1][1] = 1;
	reinit();
	repaint();
 }

 void reinit() {
     Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	dbimage = createImage(d.width, d.height);
 }
 
 /*
 public void paint(Graphics g) {
	cv.repaint();
 }
*/
 
 void findVecCoords(double x, double y, int result[]) {
	int cy = winSize.height/4;
	int cx = cy;
	result[0] = (int) (cx*(x+2));
	result[1] = (int) (cy*(2-y));
 }

 void findVecCoords(int num, int result[]) {
	findVecCoords(vecs[num][0], vecs[num][1], result);
 }

 void drawArrow(Graphics g, int x1, int y1, int x2, int y2, double len) {
	g.drawLine(x1, y1, x2, y2);
	if (len > .05) {
	    double l = java.lang.Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	    double hatx = (x2-x1)/l;
	    double haty = (y2-y1)/l;
	    int as = 10;
	    g.drawLine(x2, y2,
		       (int) (haty*as-hatx*as+x2),
		       (int) (-hatx*as-haty*as+y2));
	    g.drawLine(x2, y2,
		       (int) (-haty*as-hatx*as+x2),
		       (int) (hatx*as-haty*as+y2));
	}
 }

 void drawBar(Graphics g, int offset, double val) {
	int x = (int) (winSize.width * val/6);
	int cx = winSize.width/2;
	int h = 5;
	int y = winSize.height + h*offset;
	int y2 = y+h-1;
	if (val < 0)
	    g.fillRect(cx+x, y, -x, h);
	else
	    g.fillRect(cx, y, x, h);
 }

 public void updateDotProduct(Graphics realg) {
	double alen = java.lang.Math.sqrt(
	    vecs[0][0] * vecs[0][0] + vecs[0][1] * vecs[0][1]);
	double blen = java.lang.Math.sqrt(
	    vecs[1][0] * vecs[1][0] + vecs[1][1] * vecs[1][1]);
	double piadj = 180/3.14159265;
	double dot = vecs[0][0] * vecs[1][0] + vecs[0][1] * vecs[1][1];
	double acosth = (blen > 0) ? dot/blen : 0;
	double costh = (alen > 0) ? acosth/alen : 0;
	double theta = java.lang.Math.acos(costh)*piadj;

	Graphics g = dbimage.getGraphics();
	if (winSize == null || winSize.width == 0)
	    return;
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(Color.gray);
	g.setFont(new Font("Helvetica", 0, 15));
	int i, j;
	for (i = -2; i <= 2; i++) {
	    int x = winSize.height*(i+2)/4;
	    g.drawLine(x, 0, x, winSize.height);
	    g.drawLine(0, x, winSize.height, x);
	}
	int cy = winSize.height/2;
	int cx = cy;
	int vc[] = new int[2];
	if (blen > 0) {
	    int vc2[] = new int[2];
	    findVecCoords(vecs[1][0] * acosth/blen,
			  vecs[1][1] * acosth/blen, vc);
	    findVecCoords(0, vc2);
	    g.setColor(Color.gray);
	    g.drawLine(vc[0], vc[1], vc2[0], vc2[1]);
	}
	if (alen > .1 && blen > .1) {
	    int c1x = cx/10;
	    int c1y = cy/10;
	    int a1 = (int)(piadj*java.lang.Math.atan2(vecs[0][1], vecs[0][0]));
	    int a2 = (int)(piadj*java.lang.Math.atan2(vecs[1][1], vecs[1][0]));
	    if (a1 > a2 && a1 < a2+180) {
		int a3 = a1;
		a1 = a2; 
		a2 = a3;
	    }
	    if (a2 < a1)
		a2 += 360;
	    g.setColor(Color.orange);
	    g.drawArc(cx-c1x, cy-c1y, c1x*2, c1y*2, a1, a2-a1);
	}
	findVecCoords(0, vc);
	g.setColor(Color.red);
	drawArrow(g, cx, cy, vc[0], vc[1], alen);
	findVecCoords(1, vc);
	g.setColor(Color.cyan);
	drawArrow(g, cx, cy, vc[0], vc[1], blen);
	int yl = g.getFontMetrics().getHeight();
	int y = yl;
	NumberFormat nf = NumberFormat.getInstance();
	nf.setMaximumFractionDigits(3);
	g.setColor(Color.red);
	displayString(g,
		     "A = (" + nf.format(vecs[0][0]) + ", " +
		     nf.format(vecs[0][1]) + ")", y += yl);
	displayString(g, "|A| = " + nf.format(alen), y += yl);
	drawBar(g, -4, alen);
	g.setColor(Color.cyan);
	displayString(g,
		     "B = (" + nf.format(vecs[1][0]) + ", " +
		     nf.format(vecs[1][1]) + ")", y += yl);
	displayString(g, "|B| = " + nf.format(blen), y += yl);
	drawBar(g, -3, blen);
	g.setColor(Color.yellow);
	displayString(g, "|A| cos theta = " + nf.format(acosth), y += yl);
	drawBar(g, -2, acosth);
	if (blen > 0) {
	    findVecCoords(vecs[1][0] * acosth/blen,
			  vecs[1][1] * acosth/blen, vc);
	    g.setColor(Color.yellow);
	    g.drawLine(cx, cy, vc[0], vc[1]);
	}
	g.setColor(Color.white);
	displayString(g, "cos theta = " + nf.format(costh), y += yl);
	g.setColor(Color.orange);
	displayString(g, "theta = " + nf.format(theta) + "\u00b0", y += yl);
	g.setColor(Color.green);
	displayString(g, "A dot B = " + nf.format(dot), y += yl);
	drawBar(g, -1, dot);
	realg.drawImage(dbimage, 0, 0, this);
 }

 void displayString(Graphics g, String s, int y) {
	int lx = winSize.height;
	int lw = winSize.width - lx;
	FontMetrics fm = g.getFontMetrics();
     g.drawString(s, lx+(lw-fm.stringWidth(s))/2, y);
 }

 void edit(MouseEvent e) {
	if (selection == -1)
	    return;
	int x = e.getX();
	int y = e.getY();
	double cy = winSize.height/4;
	double cx = cy;
	double xf = x/cx-2;
	double yf = 2-y/cy;
	if (xf < -2) xf = -2;
	if (yf < -2) yf = -2;
	if (xf >  2) xf =  2;
	if (yf >  2) yf =  2;
	vecs[selection][0] = xf;
	vecs[selection][1] = yf;
	repaint();
 }

 public void componentHidden(ComponentEvent e){}
 public void componentMoved(ComponentEvent e){}
 public void componentShown(ComponentEvent e) {
	repaint();
 }

 public void componentResized(ComponentEvent e) {
	reinit();
	repaint();
 }
 public void actionPerformed(ActionEvent e) {
	if (e.getSource() == swapButton) {
	    int x;
	    for (x = 0; x < 2; x++) {
		double y = vecs[0][x];
		vecs[0][x] = vecs[1][x];
		vecs[1][x] = y;
	    }
	    repaint();
	}
 }
 public void adjustmentValueChanged(AdjustmentEvent e) {
 }
 public void mouseDragged(MouseEvent e) {
	edit(e);
 }
 public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	edit(e);
 }
 public void mouseClicked(MouseEvent e) {
 }
 public void mouseEntered(MouseEvent e) {
 }
 public void mouseExited(MouseEvent e) {
 }
 public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	int x = e.getX();
	int y = e.getY();
	int vc[] = new int[2];
	int i;
	selection = -1;
	float best = 30*30;
	for (i = 0; i != 2; i++) {
	    findVecCoords(i, vc);
	    float dx = x-vc[0];
	    float dy = y-vc[1];
	    float dist = dx*dx+dy*dy;
	    if (dist < best) {
	    	best = dist;
	    	selection = i;
	    }
	}
	if (selection != -1)
	    edit(e);
 }
 public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	selection = -1;
 }
}

