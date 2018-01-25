package edu.northwestern.physics.groups.atomic.applet;

//  Mirror.java
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

/* @author Xiaowei Jiang, G. Anderson
 * @version 0.1, June 1999
 */

import java.awt.BorderLayout;

import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.GridLayout;

import a2s.Panel;

import java.awt.Point;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionAdapter;

import javax.swing.JApplet;

//web_Ready
//web_AppletName= Mirror
//web_Description= Interactive illustration of convex and concave mirrors
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= mirror.png
//web_Info= width:550, height:400
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/optics/mirrors.html
//web_Category= Physics - Optics
//web_Features= AWT-to-Swing, canvas 

public class Mirror extends JApplet {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private final MirrorCanvas canvas;

	public Mirror() {
		canvas = new MirrorCanvas();
		setLayout(new BorderLayout());
		add("North", new Banner("Mirrors"));
		add("South", new MirrorControl(canvas));
		add("Center", canvas);
	}

	@Override
	public String getAppletInfo() {
		return "Copyrighted under the GNU GPL by Northwestern University";
	}

	@Override
	public void init() {
		canvas.init();
	}

	@Override
	public void start() {
	}

}

class MirrorArrow {
	private int xx, yy;
	private int width, height = 0;
	Color color;

	public MirrorArrow(Color theColor, int w) {
		color = theColor;
		width = w;
	}

	public MirrorArrow(Color theColor, int w, int h) {
		color = theColor;
		width = w;
		height = h;
	}

	public Color getColor() {
		return color;
	}

	public int getHeight() {
		return height;
	}

	public Point getTip() {
		return new Point(xx, yy - height);
	}

	public int getX() {
		return xx;
	}

	public int getY() {
		return yy;
	}

	public boolean inside(int x, int y) {
		if ((Math.abs(x - xx) > (width / 2))
				|| (((y - yy) * (y - (yy - height - (2 * width)))) > 0)) {
			return false;
		} else {
			return true;
		}
	}

	public void paint(Graphics g) {
		g.setColor(color);
		final int w = width / 2;
		final int h = (int) (height - (Math.sqrt(3) * width));
		if (height > 0) {
			g.fillRect(xx - w, yy - h, width + 1, h);
		} else {
			g.fillRect(xx + w, yy, -width + 1, -h);
		}
		paintTriangle(g, xx, yy - h);
	}

	private void paintTriangle(Graphics g, int x, int y) {
		final int[] xPoints = new int[3];
		final int[] yPoints = new int[3];
		xPoints[0] = x - width;
		yPoints[0] = y;
		xPoints[1] = x + width;
		yPoints[1] = y;
		xPoints[2] = x;
		yPoints[2] = (int) (y - (Math.sqrt(3) * width));
		g.fillPolygon(xPoints, yPoints, 3);
	}

	public void setColor(Color colo) {
		color = colo;
	}

	public void setHeight(int h) {
		height = h;
		if ((width * h) < 0) {
			width = -width;
		}
	}

	public void setLocation(int x, int y) {
		xx = x;
		yy = y;
	}

	public void setX(int x) {
		xx = x;
	}

	public void setY(int y) {
		yy = y;
	}

}


class MirrorImage {
	public int xx, yy; // Intersection of mirror with axis
	// origin = (xx,yy) & center = (xx-2*focus, yy)
	public int height;
	public double focus;

	public MirrorImage(double f, int h) {
		focus = f;
		height = h;
		xx = 200;
		yy = 150;
	}

	public Point getBottom() {
		return new Point(xx, yy - height);
	}

	public Point getCenter() {
		return new Point((int) (xx - (2 * focus)), yy);
	}

	public double getF() {
		return focus;
	}

	public Point getFocus() {
		return new Point((int) (xx - focus), yy);
	}

	public int getH() {
		return height;
	}

	public Point getOrigin() {
		return new Point(xx, yy);
	}

	public Point getTop() {
		return new Point(xx, yy + height);
	}

	public int getX() {
		return xx;
	}

	public int getY() {
		return yy;
	}

	public boolean inside(int x, int y) {
		if ((Math.abs(x - xx) < 3) && (Math.abs(y - yy) < Math.abs(height))) {
			return true;
		} else {
			return false;
		}
	}

	public void paint(Graphics g) {
		final Point center = getCenter();
		final Point foc = getFocus();
		final int radius = (int) Math.abs(2 * focus);
		final double alpha1 = Math.atan2(-height, (int) (2 * focus));
		final double alpha2 = Math.atan2(height, (int) (2 * focus));
		final int degree1 = (int) ((alpha1 / Math.PI) * 180);
		int degree2 = (int) ((alpha2 / Math.PI) * 180);
		if (degree2 < degree1) {
			degree2 += 360;
		}
		g.setColor(Color.black);
		g.drawLine(20, getY(), 520, getY());
		g.drawArc(center.x - radius, center.y - radius, 2 * radius, 2 * radius,
				degree1, degree2 - degree1);
		g.setColor(Color.black);
		g.drawLine(center.x, yy - 5, center.x, yy + 5);
		g.drawLine(foc.x, yy - 5, foc.x, yy + 5);
	}

	public void setF(double f) {
		focus = f;
	}

	public void setLocation(int x, int y) {
		xx = x;
		yy = y;
	}

	public void setX(int x) {
		xx = x;
	}

	public void setY(int y) {
		yy = y;
	}
}

class MirrorConvex extends MirrorImage {
	public MirrorConvex() {
		super(-80., -80);
		setX(250);
	}

	public MirrorConvex(double f, int h) {
		super(f, h);
		setX(250);
	}
}


class MirrorCanvas extends Canvas {
	class MirrorDragListener extends MouseMotionAdapter {
		@Override
		public void mouseDragged(MouseEvent e) {
			final int x = e.getX();
			final int y = e.getY();
			mirrorSys.move(x, y);
			repaint();
		}
	}

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	public int item; // the item to be show, i.e, converge, or diverge

	private MirrorSystem mirrorSys;

	MirrorCanvas() {
		item = 0;
		setBackground(Color.white);
	}

	public void init() {
		if (item == 0) {
			mirrorSys = new MirrorSystem(new MirrorConvex());
		} else {
			mirrorSys = new MirrorSystem(new MirrorConcave());
		}
		addMouseListener(mirrorSys.getFocusAssigner());
		addMouseMotionListener(new MirrorDragListener());
	}

	@Override
	public void paint(Graphics g) {
		g.setColor(Color.WHITE);
		g.clearRect(0,  0,  getWidth(),  getHeight());
		mirrorSys.paint(g);
	}

	public void setView(boolean a, boolean b, boolean c) {
		mirrorSys.setView(a, b, c);
	}
}

class MirrorConcave extends MirrorImage {

	public MirrorConcave() {
		super(80., 80);
		setX(250);
	}

	public MirrorConcave(double f, int h) {
		super(f, h);
		setX(250);
	}

}

class MirrorControl extends Panel {
	private class ControlListener implements ItemListener {
		public void itemStateChanged(ItemEvent e) {
			parent.item = mirrorType.getSelectedIndex();
			parent.init();
			setView();
			parent.repaint();
		}
	}

	private class ViewListener implements ItemListener {
		public void itemStateChanged(ItemEvent e) {
			setView();
			parent.repaint();
		}
	}

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Choice mirrorType;

	Checkbox center, first, second;

	MirrorCanvas parent;

	public MirrorControl(MirrorCanvas theCanvas) {
		parent = theCanvas;
		setLayout(new GridLayout(1, 4, 5, 5));

		mirrorType = new Choice();
		mirrorType.addItem("Convex Mirror");
		mirrorType.addItem("Concave Mirror");
		add(mirrorType);
		mirrorType.addItemListener(new ControlListener());

		final ItemListener view = new ViewListener();

		center = new Checkbox("Center Line");
		center.setState(false);
		add(center);
		center.addItemListener(view);

		first = new Checkbox("Focus Line");
		first.setState(false);
		add(first);
		first.addItemListener(view);

		second = new Checkbox("Parallel Line");
		second.setState(false);
		add(second);
		second.addItemListener(view);

	}

	private void setView() {
		final boolean a = center.getState();
		final boolean b = first.getState();
		final boolean c = second.getState();
		parent.setView(a, b, c);
	}
}


class MirrorSystem {
	class FocusAssigner extends MouseAdapter {
		private int insideId(int x, int y) {
			if (mirror.inside(x, y)) {
				return 0; // case: mirror been selected
			}
			if (src.inside(x, y)) {
				return 1; // case: source been selected
			}
			if (img.inside(x, y)) {
				return 2; // case: image been selected
			} else {
				return -1;
			}
		}

		@Override
		public void mousePressed(MouseEvent e) {
			id = insideId(e.getX(), e.getY());
		}
	}

	private final MirrorImage mirror;
	private final MirrorArrow src, img;
	private int id; // id of the object been activated
	private boolean showParallelLine = false;
	private boolean showFocusLine = false;

	private boolean showCenterLine = false;

	public MirrorSystem(MirrorImage theMirror) {
		mirror = theMirror;
		src = new MirrorArrow(Color.blue, 6, 40); // color, width, height
		src.setLocation(60, mirror.getY()); // (x,y)
		img = new MirrorArrow(Color.blue, 6); // color, width, height
		img.setY(mirror.getY());
	}

	private void drawCenterLine(Graphics g) {
		final Point srcTip = src.getTip();
		final Point imgTip = img.getTip();
		final Point center = mirror.getCenter();
		final int yOnMirror = extractY(srcTip, center, mirror.getX());
		g.setColor(src.getColor());
		g.drawLine(srcTip.x, srcTip.y, mirror.getX(), yOnMirror);
		g.setColor(img.getColor());
		g.drawLine(mirror.getX(), yOnMirror, imgTip.x, imgTip.y);
		if (img.getX() > mirror.getX()) {// virtual image
			if (src.getX() > center.x) {// source in the left of focus, concave
				// case
				g.setColor(src.getColor());
				g.drawLine(srcTip.x, srcTip.y, center.x, center.y);
			} else {// source in the right of focus, convex case
				g.setColor(img.getColor());
				g.drawLine(imgTip.x, imgTip.y, center.x, center.y);
			}
		}
	}

	private void drawFocusLine(Graphics g) {
		final int xLeft = 20;
		final Point srcTip = src.getTip();
		final Point imgTip = img.getTip();
		final Point foc = mirror.getFocus();
		final int yOnMirror = extractY(srcTip, foc, mirror.getX());
		g.setColor(src.getColor());
		g.drawLine(srcTip.x, srcTip.y, mirror.getX(), yOnMirror);
		g.drawLine(mirror.getX(), yOnMirror, xLeft, yOnMirror);
		g.setColor(img.getColor());
		g.drawLine(mirror.getX(), yOnMirror, imgTip.x, imgTip.y);
		if (img.getX() > mirror.getX()) {// virtual image
			g.setColor(img.getColor());
			if (src.getX() > foc.x) {// source in the left of focus, concave
				// case
				g.drawLine(srcTip.x, srcTip.y, foc.x, foc.y);
			} else {// source in the right of focus, convex case
				g.drawLine(mirror.getX(), yOnMirror, foc.x, foc.y);
			}
		}
	}

	private void drawParallelLine(Graphics g) {
		// int xLeft = 20;
		final Point srcTip = src.getTip();
		final Point imgTip = img.getTip();
		final Point foc = mirror.getFocus();
		g.setColor(src.getColor());
		g.drawLine(srcTip.x, srcTip.y, mirror.getX(), srcTip.y);
		g.setColor(img.getColor());
		g.drawLine(mirror.getX(), srcTip.y, imgTip.x, imgTip.y);

		if (img.getX() > mirror.getX()) {// virtual image
			if (src.getX() > foc.x) {// source in the left of focus, concave
				// case
				g.setColor(src.getColor());
				g.drawLine(mirror.getX(), srcTip.y, foc.x, foc.y);
			} else {// source in the right of focus, convex case
				g.setColor(img.getColor());
				g.drawLine(imgTip.x, imgTip.y, foc.x, foc.y);
			}
		}
	}

	private int extractY(Point first, Point second, int x) {
		final int x1 = first.x, y1 = first.y;
		final int x2 = second.x, y2 = second.y;
		if (x1 != x2) {
			return y1 + (((x - x1) * (y2 - y1)) / (x2 - x1));
		} else {
			final int LARGE = 10000;
			return LARGE;
		}
	}

	MouseListener getFocusAssigner() {
		return new FocusAssigner();
	}

	public void move(int x, int y) {
		switch (id) {
		case 0:// drag mirror
			moveMirror(x);
			break;
		case 1:// drag source
			moveSrc(x);
			break;
		case 2:// drag image
			moveImg(x);
			break;
		default:
			break; // do nothing
		}
	}

	private void moveImg(int x) {
		// do nothing
	}

	private void moveMirror(int x) {
		if (x >= src.getX()) {
			mirror.setX(x);
		} else {
			mirror.setX(src.getX());
		}
	}

	private void moveSrc(int x) {
		if (x < mirror.getX()) {
			src.setX(x);
		} else {
			src.setX(mirror.getX());
		}
	}

	public void paint(Graphics g) {
		setImg();
		mirror.paint(g);
		src.paint(g);
		img.paint(g);

		if (showParallelLine) {
			drawParallelLine(g);
		}
		if (showCenterLine) {
			drawCenterLine(g);
		}
		if (showFocusLine) {
			drawFocusLine(g);
		}
	}

	private void setImg() {
		final double f = mirror.getF();
		final int xMirror = mirror.getX();
		// int yMirror = mirror.getY();
		final int srcD = xMirror - src.getX();
		final int imgD = (int) ((srcD * f) / (srcD - f));

		img.setX(xMirror - imgD);
		if (srcD != 0) {
			img.setHeight((-src.getHeight() * imgD) / srcD);
		}
		if (img.getX() < mirror.getX()) {
			img.setColor(Color.blue); // real image
		} else {
			img.setColor(Color.green); // virtual image
		}
	}

	public void setView(boolean a, boolean b, boolean c) {
		showCenterLine = a;
		showFocusLine = b;
		showParallelLine = c;
	}

}
