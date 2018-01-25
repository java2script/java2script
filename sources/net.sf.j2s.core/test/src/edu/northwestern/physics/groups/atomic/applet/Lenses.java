package edu.northwestern.physics.groups.atomic.applet;

// Lenses.java (JDK 1.1)

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

/* @author Xiaowei Jiang, Greg Anderson
 * @version 0.1, June 1999
 */

import a2s.Applet;
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

//web_Ready
//web_AppletName= Lenses
//web_Description= Interactive illustration of convex and concave lenses
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= lenses.png
//web_Info= width:550, height:400
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/optics/lenses.html
//web_Category= Physics - Optics
//web_Features= AWT-to-Swing, canvas 

class LensArrow {
	private int xx, yy;
	private int width, height = 0;
	Color color;

	public LensArrow(Color theColor, int w) {
		color = theColor;
		width = w;
	}

	public LensArrow(Color theColor, int w, int h) {
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


class LensImage {
	public int xx, yy;
	public int width, height;
	public double focus;

	public LensImage(double f, int w, int h) {
		focus = f;
		width = w;
		height = h;
		xx = 200;
		yy = 150;
	}

	public Point getBottom() {
		return new Point(xx, yy - height);
	}

	public Point getCenter() {
		return new Point(xx, yy);
	}

	public double getF() {
		return focus;
	}

	public Point getFocus1() {
		return new Point((int) (xx - focus), yy);
	}

	public Point getFocus2() {
		return new Point((int) (xx + focus), yy);
	}

	public int getH() {
		return height;
	}

	public Point getTop() {
		return new Point(xx, yy + height);
	}

	public int getW() {
		return width;
	}

	public int getX() {
		return xx;
	}

	public int getY() {
		return yy;
	}

	public boolean inside(int x, int y) {
		return false;
	}

	public void paint(Graphics g) {
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
	};
}


class LensConverge extends LensImage {
	public LensConverge() {
		super(80., 10, 80);
	}

	public LensConverge(double f, int w, int h) {
		super(f, w, h);
	}

	@Override
	public boolean inside(int x, int y) {
		final int dis2 = (((x - xx) * (x - xx)) / (width * width))
				+ (((y - yy) * (y - yy)) / (height * height));
		if (dis2 <= 1) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public void paint(Graphics g) {
		g.setColor(Color.black);
		g.drawLine(20, getY(), 520, getY());
		g.setColor(Color.gray);
		g.fillArc(xx - width, yy - height, 2 * width, 2 * height, 0, 360);
		g.setColor(Color.black);
		g.drawLine((int) (xx - focus), yy - 5, (int) (xx - focus), yy + 5);
		g.drawLine((int) (xx + focus), yy - 5, (int) (xx + focus), yy + 5);
	}
}

class LensDiverge extends LensImage {
	private double alpha;
	private int radius;

	public LensDiverge() {
		super(-80., 8, 50);
		setX(160);
		setParam();
	}

	public LensDiverge(double f, int w, int h) {
		super(f, w, h);
		setParam();
	}

	@Override
	public boolean inside(int x, int y) {
		final int width = getW();
		final int height = getH();
		final int dis2 = (((x - xx) * (x - xx)) / (width * width))
				+ (((y - yy) * (y - yy)) / (height * height));
		if (dis2 <= 1) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public void paint(Graphics g) {
		g.setColor(Color.black);
		g.drawLine(20, getY(), 520, getY());
		g.drawLine(xx - width - 2, yy - height, xx + width + 2, yy - height);
		g.drawLine(xx - width - 2, yy + height, xx + width + 2, yy + height);
		final int degree = (int) (((2 * alpha) / Math.PI) * 180);
		g.drawArc(xx + (width / 2), yy - radius, 2 * radius, 2 * radius,
				degree, 360 - (2 * degree));
		g.drawArc(xx - (width / 2) - (2 * radius), yy - radius, 2 * radius,
				2 * radius, degree - 180, 360 - (2 * degree));
		g.setColor(Color.black);
		g.drawLine((int) (xx - focus), yy - 5, (int) (xx - focus), yy + 5);
		g.drawLine((int) (xx + focus), yy - 5, (int) (xx + focus), yy + 5);
	}

	private void setParam() {
		alpha = Math.atan2(height, width);
		radius = (int) (Math.sqrt(((width * width) / 4.) + (height * height)) / (2. * Math
				.cos(alpha)));
	}
}

class LensCanvas extends Canvas {
	class LensDragListener extends MouseMotionAdapter {
		@Override
		public void mouseDragged(MouseEvent e) {
			final int x = e.getX();
			final int y = e.getY();
			lenseSys.move(x, y);
			getTopLevelAncestor().repaint();
		}
	}

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	public int item; // the item to be show, i.e, converge, or diverge

	private LensSystem lenseSys;

	LensCanvas() {
		item = 0;
		//setBackground(Color.white);
	}

	public void init() {
		if (item == 0) {
			lenseSys = new LensSystem(new LensConverge());
		} else {
			lenseSys = new LensSystem(new LensDiverge());
		}
		addMouseListener(lenseSys.getFocusAssigner());
		addMouseMotionListener(new LensDragListener());
	}

	@Override
	public void paint(Graphics g) {
		g.setColor(Color.WHITE);
		g.clearRect(0,  0,  getWidth(),  getHeight());
		lenseSys.paint(g);
	}

	public void setView(boolean a, boolean b, boolean c) {
		lenseSys.setView(a, b, c);
	}
}

class LensControl extends Panel {
	private class ControlListener implements ItemListener {
		public void itemStateChanged(ItemEvent e) {
			parent.item = lenseType.getSelectedIndex();
			parent.init();
			setView();
			getTopLevelAncestor().repaint();
			// parent.repaint(); // BH
		}
	}

	private class ViewListener implements ItemListener {
		public void itemStateChanged(ItemEvent e) {
			setView();
			getTopLevelAncestor().repaint();
		}
	}

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	Choice lenseType;

	Checkbox center, first, second;

	LensCanvas parent;

	public LensControl(LensCanvas theCanvas) {
		parent = theCanvas;
		setLayout(new GridLayout(1, 4, 5, 5));

		lenseType = new Choice();
		lenseType.addItem("Convex Lens");
		lenseType.addItem("Concave Lens");
		add(lenseType);
		lenseType.addItemListener(new ControlListener());

		final ItemListener view = new ViewListener();

		center = new Checkbox("Center Line");
		center.setState(false);
		add(center);
		center.addItemListener(view);

		first = new Checkbox("1st Focus Line");
		first.setState(false);
		add(first);
		first.addItemListener(view);

		second = new Checkbox("2nd Focus Line");
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

public class Lenses extends Applet {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private final LensCanvas canvas;

	public Lenses() {
		canvas = new LensCanvas();
		setLayout(new BorderLayout());
		add("North", new Banner("Lenses"));
		add("South", new LensControl(canvas));
		add("Center", canvas);
	}

	@Override
	public String getAppletInfo() {
		return "The Northwestern University Virtual Physics Lab";
	}

	@Override
	public void init() {
		canvas.init();
	}

	@Override
	public void start() {
	}
}

class LensSystem {
	class FocusAssigner extends MouseAdapter {
		private int insideId(int x, int y) {
			if (lense.inside(x, y)) {
				return 0; // case: lense been selected
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

	private final LensImage lense;
	private final LensArrow src, img;
	private int id; // id of the object been activated
	private boolean showCenterLine = false;
	private boolean showFirstFocusLine = false;

	private boolean showSecondFocusLine = false;

	public LensSystem(LensImage theLens) {
		lense = theLens;
		src = new LensArrow(Color.blue, 6, 40); // color, width, height
		src.setLocation(60, lense.getY()); // (x,y)
		img = new LensArrow(Color.blue, 6); // color, width, height
		img.setY(lense.getY());
	}

	private void drawCentralLine(Graphics g) {
		final Point srcTip = src.getTip();
		final Point imgTip = img.getTip();
		if (img.getX() > lense.getX()) {// real image
			g.setColor(src.getColor());
			g.drawLine(srcTip.x, srcTip.y, imgTip.x, imgTip.y);
		} else {// virtual image
			g.setColor(img.getColor());
			g.drawLine(srcTip.x, srcTip.y, imgTip.x, imgTip.y);

			final int xRight = 520;
			final int yRight = extractY(srcTip, lense.getCenter(), xRight);
			g.setColor(src.getColor());
			g.drawLine(srcTip.x, srcTip.y, xRight, yRight);
		}
	}

	private void drawFocus1Line(Graphics g) {
		final Point srcTip = src.getTip();
		final Point imgTip = img.getTip();
		final Point focus = lense.getFocus1();
		if (lense.getX() < img.getX()) {// real image
			g.setColor(src.getColor());
			final int xLens = lense.getX();
			final int yOnLens = extractY(srcTip, focus, xLens);
			g.drawLine(srcTip.x, srcTip.y, xLens, yOnLens);
			g.drawLine(xLens, yOnLens, img.getX(), yOnLens);
		} else {// virtual image
			final int xRight = 520;
			final int yOnLens = extractY(focus, srcTip, lense.getX());
			g.setColor(src.getColor());
			g.drawLine(lense.getX(), yOnLens, xRight, yOnLens);
			g.setColor(img.getColor());
			g.drawLine(imgTip.x, imgTip.y, lense.getX(), yOnLens);

			g.setColor(src.getColor());
			g.drawLine(srcTip.x, srcTip.y, lense.getX(), yOnLens);

			g.setColor(img.getColor());
			if (focus.x < srcTip.x) {// convex
				g.drawLine(focus.x, focus.y, srcTip.x, srcTip.y);
			} else {// concave
				g.drawLine(focus.x, focus.y, lense.getX(), yOnLens);
			}
		}
	}

	private void drawFocus2Line(Graphics g) {
		final Point srcTip = src.getTip();
		final Point imgTip = img.getTip();
		g.setColor(src.getColor());
		g.drawLine(srcTip.x, srcTip.y, lense.getX(), srcTip.y);
		if (lense.getX() < img.getX()) {// real image
			g.drawLine(lense.getX(), srcTip.y, imgTip.x, imgTip.y);
		} else {// virtual image
			final int xRight = 520;
			final int yRight = extractY(new Point(lense.getX(), srcTip.y),
					lense.getFocus2(), xRight);
			g.drawLine(lense.getX(), srcTip.y, xRight, yRight);
			g.setColor(img.getColor());
			g.drawLine(lense.getX(), srcTip.y, imgTip.x, imgTip.y);
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
		case 0:// drag lense
			moveLens(x);
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

	private void moveLens(int x) {
		if (x >= src.getX()) {
			lense.setX(x);
		} else {
			lense.setX(src.getX());
		}
	}

	private void moveSrc(int x) {
		if (x < lense.getX()) {
			src.setX(x);
		} else {
			src.setX(lense.getX());
		}
	}

	public void paint(Graphics g) {
		setImg();
		lense.paint(g);
		src.paint(g);
		img.paint(g);

		if (showCenterLine) {
			drawCentralLine(g);
		}
		if (showFirstFocusLine) {
			drawFocus1Line(g);
		}
		if (showSecondFocusLine) {
			drawFocus2Line(g);
		}
	}

	private void setImg() {
		final double f = lense.getF();
		final int xLens = lense.getX();
		// int yLens = lense.getY();
		final int srcD = xLens - src.getX();
		final int imgD = (int) ((srcD * f) / (srcD - f));

		img.setX(imgD + xLens);
		if (srcD != 0) {
			img.setHeight((-src.getHeight() * imgD) / srcD);
		}
		if (img.getX() < lense.getX()) {
			img.setColor(Color.green);
		} else {
			img.setColor(Color.blue);
		}
	}

	public void setView(boolean a, boolean b, boolean c) {
		showCenterLine = a;
		showFirstFocusLine = b;
		showSecondFocusLine = c;
	}

}
