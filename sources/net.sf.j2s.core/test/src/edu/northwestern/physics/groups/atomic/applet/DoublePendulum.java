package edu.northwestern.physics.groups.atomic.applet;

//DoublePendulum.java
//
/*************************************************************************
 *                                                                       *
 * Copyright (c) 1999       Northwestern University                      *
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


//web_Ready
//web_AppletName= Double Pendulum
//web_Description= A simulation of a double pendulum
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= doublependulum.png
//web_Info= width:828, height:535
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/mechanics/pendulum.html
//web_Category= Physics - Mechanics
//web_Features= AWT-to-Swing, canvas 

//  Modification History
//    Date      Initials     Change
//    2/10/99    XWJ         Initial release
//  Abstract:
/*
 * @author Xiaowei Jiang
 * @version 0.1, Feb 1999
 */

/** showing the system of a double pendulum.

 @author Xiaowei Jiang
 @version 1.0

 */

import a2s.Applet;
import a2s.Button;
import a2s.Canvas;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Image;
import a2s.Label;
import java.awt.Panel;
import a2s.Scrollbar;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import javax.swing.Timer;


class canvasPenPen // ===================================
extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	// / privacies
	private Image img = null;

	private Graphics g2 = null;

	private final int width, height;

	private int x1, x2, y1, y2;

	public canvasPenPen(int x, int y, int width, int height, Panel father) {
		super();
		setBounds(x, y, width, height);
		setBackground(Color.black);
		father.add(this);

		this.width = width;
		this.height = height;
	}

	private void checkImage() {
		if (img == null) {
			img = createImage(width, height);
			g2 = img.getGraphics();
		}
	}

	@Override
	public void paint(Graphics g) {
		int x, y;
		checkImage();
		g2.setColor(Color.black);
		g2.fillRect(0, 0, width, height);
		x = width / 2;
		y = height / 2;
		g2.setColor(Color.red);
		g2.drawArc(x - 3, y - 3, 6, 6, 0, 360);
		g2.drawLine(x, y, x + x1, y - y1);
		x += x1;
		y -= y1;
		g2.fillArc(x - 4, y - 4, 8, 8, 0, 360);
		g2.setColor(Color.blue);
		g2.drawLine(x, y, x + x2, y - y2);
		g2.fillArc((x + x2) - 4, y - y2 - 4, 8, 8, 0, 360);
		g.drawImage(img, 0, 0, null);
	}

	public void setXYs(int x1, int y1, int x2, int y2) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		repaint();
	}

	@Override
	public void update(Graphics g) {
		paint(g);
	}
} // class canvasPenPen

class canvasTrace // =================================
extends Canvas {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	// / privacies
	private final int width, height;

	private double ax = 1, bx = 0, ay = 1, by = 0; // x-> ax*x+bx; y->ay*y+by;

	private Image img;

	private Graphics g2;

	// private double lastX, lastY;
	private final int totalBuffered = 100;

	private boolean clearRequested = false;

	private final Color[] colors = new Color[totalBuffered - 1];

	private final int[] xBuffer = new int[totalBuffered];

	private final int[] yBuffer = new int[totalBuffered];
	private int ibegin, iend, itotal;

	public canvasTrace(int x, int y, int width, int height, Panel father) {
		super();
		setBounds(x, y, width, height);
		setBackground(Color.black);
		father.add(this);
		this.width = width;
		this.height = height;

		for (int i = 0; i < (totalBuffered - 1); i++) {
			final int r = (i * 255) / (totalBuffered - 2);
			colors[i] = new Color(r, 0, (255 - r) / 2);
		}

		clearHistory();
		setCoord(0, 0, width, height);
	}

	public void addPoint(double x, double y) {
		xBuffer[iend] = (int) ((ax * x) + bx);
		yBuffer[iend] = (int) ((ay * y) + by);
		if (itotal == totalBuffered) {
			iend++;
			if (iend == totalBuffered) {
				iend = 0;
			}
			ibegin = iend;
		} else {
			itotal++;
			iend++;
			if (iend == totalBuffered) {
				iend = 0;
			}
		}
		repaint();
	}

	public void clearHistory() {
		ibegin = 0;
		iend = 0;
		itotal = 0;
		clearRequested = true;
		repaint();
	}

	private void clearImage() {
		g2.setColor(Color.black);
		g2.fillRect(0, 0, width, height);
	}

	private void makeImage() {
		int i1, i2;
		if (img == null) {
			img = createImage(width, height);
			g2 = img.getGraphics();
			clearImage();
		}
		if (clearRequested) { // clearHistory just called
			clearRequested = false;
			clearImage();
		}
		i1 = ibegin;
		for (int i = 0; i < (itotal - 1); i++) {
			g2.setColor(colors[(i + totalBuffered) - itotal]);
			i2 = i1 + 1;
			if (i2 == totalBuffered) {
				i2 = 0;
			}
			g2.drawLine(xBuffer[i1], yBuffer[i1], xBuffer[i2], yBuffer[i2]);
			i1++;
			if (i1 == totalBuffered) {
				i1 = 0;
			}
		}
	}

	@Override
	public void paint(Graphics g) {
		makeImage();
		g.drawImage(img, 0, 0, null);
	}

	// / default : (0,0) - (width, height)
	public void setCoord(double xLeft, double yBot, double xRight, double yTop) {
		ax = (width) / (xRight - xLeft);
		bx = -ax * xLeft;
		ay = (height) / (yBot - yTop);
		by = -ay * yTop;
	}

	@Override
	public void update(Graphics g) {
		paint(g);
	}
} // class canvasTrace

public class DoublePendulum // =================================
extends Applet implements ActionListener, AdjustmentListener {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	// / variables
	private myButton btnRestart, btnClear;

	private myScrollbar sbTheta1, sbTheta2, sbM1, sbM2, sbL1, sbL2;

	private myLabel lbTheta1, lbTheta2, lbM1, lbM2, lbL1, lbL2;

	private canvasPenPen cvPenPen;

	private canvasTrace cvTrace;

	private final mathPenPen penpen = new mathPenPen();

	private int theta1, theta2, m1, m2, l1, l2;

	// / privacies

	// private boolean running;
//	private theThread thread = null;

	private final double d2r = 3.1415926 / 180.0;

	// private boolean clearRequested = false;

	// / Constructor
	public DoublePendulum() {
		super();
	}

	/*
	 * public void run(){ double x1, x2, y1, y2; for(;;){ if(running){ for(int
	 * i=0;i<5;i++) penpen.moveForward(0.03); x1=penpen.getX1();
	 * x2=penpen.getX2(); y1=penpen.getY1(); y2=penpen.getY2();
	 * cvPenPen.setXYs((int)x1,(int)y1,(int)x2,(int)y2);
	 * cvTrace.addPoint(x1,x2); } if(clearRequested){ cvTrace.clearHistory();
	 * clearRequested = false; } try{ Thread.sleep(1); }
	 * catch(InterruptedException e){} } }
	 */
	// / Messages
	  Timer thread; // use timer instead of thread for SwingJS -PF

	public void actionPerformed(ActionEvent e) {
		if (e.getActionCommand() == "Restart") {
			parameterChanged();
			cvTrace.clearHistory();
//			if (thread == null) {
//				thread = new theThread(this);
//				thread.start();
//			}
			if (thread == null) {
			    // SwingJS doesn't like threads that sleep, use a timer.  -PF
		            thread = new Timer(20, new ActionListener() {
		                public void actionPerformed(ActionEvent evt) {
		                    go();
		                }
		            });
		            thread.start();
			}
		} else { // clear graph
			cvTrace.clearHistory();
		}
	}

	public void adjustmentValueChanged(AdjustmentEvent e) {
		parameterChanged();
	}

	public void go() {
		double x1, x2, y1, y2;
		for (int i = 0; i < 5; i++) {
			penpen.moveForward(0.03);
		}
		x1 = penpen.getX1();
		x2 = penpen.getX2();
		y1 = penpen.getY1();
		y2 = penpen.getY2();
		cvPenPen.setXYs((int) x1, (int) y1, (int) x2, (int) y2);
		cvTrace.addPoint(x1, x2);
	}

	// / init, start, run
	@Override
	public void init() {
		setupComponents();
	}

	private void parameterChanged() {
		if (thread != null) {
			thread.stop();
			thread = null;
		}
		theta1 = sbTheta1.getValue();
		lbTheta1.setText("theta_1 = " + theta1);
		theta2 = sbTheta2.getValue();
		lbTheta2.setText("theta_2 = " + theta2);
		m1 = sbM1.getValue();
		lbM1.setText("m_1 = " + m1);
		m2 = sbM2.getValue();
		lbM2.setText("m_2 = " + m2);
		l1 = sbL1.getValue();
		lbL1.setText("L_1 = " + l1);
		l2 = sbL2.getValue();
		lbL2.setText("L_2 = " + l2);
		penpen.setParameters(m1, m2, l1, l2, theta1 * d2r, theta2 * d2r, 0, 0);
		cvPenPen.setXYs((int) penpen.getX1(), (int) penpen.getY1(),
				(int) penpen.getX2(), (int) penpen.getY2());
	}

	private void setupComponents() {
		setLayout(null);

		cvPenPen = new canvasPenPen(4, 4, 400, 400, this);
		cvTrace = new canvasTrace(408, 4, 400, 400, this);

		btnRestart = new myButton(172, 440, 75, 25, "Restart", this);
		btnRestart.addActionListener(this);
		btnClear = new myButton(684, 440, 75, 25, "Clear Graph", this);
		btnClear.addActionListener(this);

		sbTheta1 = new myScrollbar(4, 416, 121, 16, 90, -180, 180, this);
		sbTheta1.addAdjustmentListener(this);
		sbTheta2 = new myScrollbar(4, 460, 121, 16, -90, -180, 180, this);
		sbTheta2.addAdjustmentListener(this);
		sbM1 = new myScrollbar(456, 417, 121, 16, 80, 1, 100, this);
		sbM1.addAdjustmentListener(this);
		sbM2 = new myScrollbar(456, 464, 121, 16, 70, 1, 100, this);
		sbM2.addAdjustmentListener(this);
		sbL1 = new myScrollbar(284, 416, 121, 16, 100, 1, 100, this);
		sbL1.addAdjustmentListener(this);
		sbL2 = new myScrollbar(284, 463, 121, 16, 80, 1, 100, this);
		sbL2.addAdjustmentListener(this);

		lbTheta1 = new myLabel(4, 439, 121, 13, "", this);
		lbTheta2 = new myLabel(4, 484, 121, 13, "", this);
		lbM1 = new myLabel(456, 439, 121, 13, "", this);
		lbM2 = new myLabel(456, 488, 121, 13, "", this);
		lbL1 = new myLabel(284, 440, 121, 13, "", this);
		lbL2 = new myLabel(284, 489, 121, 13, "", this);
		new myLabel(650, 410, 70, 13, "( X1 , X2 )", this); // PF made larger
	}

	@Override
	public void start() {
		cvTrace.setCoord(-110, -110, 110, 110);
		parameterChanged();
	}

	@Override
	public void stop() {
		if (thread != null) {
			thread.stop();
			thread = null;
		}
	}
} // class DoublePendulum

class mathPenPen { // ====================================

	private final static double g = 9.8;

	// / privacies
	private double m1, m2, l1, l2;

	private double theta1, theta2, omega1, omega2;

	private double x1, x2, y1, y2;

	// / constructor: set initial condition. static at first.
	public mathPenPen() {
	}

	// / get current state of the system
	public double getX1() {
		return y1;
	}

	public double getX2() {
		return y2;
	}

	public double getY1() {
		return -x1;
	}

	public double getY2() {
		return -x2;
	}

	// / move the system a little bit
	public void moveForward(double dt) {
		double temp0, temp1, temp2, temp3, temp4, temp5, M;
		final double damp = 0.99999;
		M = m1 + m2;
		temp0 = (y1 * x2) - (y2 * x1);
		temp1 = (m2 * omega2 * omega2 * temp0) + (M * g * y1);
		temp2 = (-m2 * omega1 * omega1 * temp0) + (m2 * g * y2);
		temp5 = ((x1 * x2) + (y1 * y2)) / l1 / l2;
		temp3 = temp5 / l1 / l2;
		temp4 = (M - (m2 * temp5 * temp5));

		omega1 += (-dt * ((temp1 / l1 / l1) - (temp3 * temp2))) / temp4;
		omega2 += (-dt * ((-temp1 * temp3) + ((temp2 * M) / m2 / l2 / l2)))
				/ temp4;
		omega1 *= damp;
		omega2 *= damp;
		theta1 += dt * omega1;
		theta2 += dt * omega2;

		toXY();
	}

	public void setParameters(double m1, double m2, double l1, double l2,
			double theta1, double theta2, double omega1, double omega2) {
		this.m1 = m1;
		this.m2 = m2;
		this.l1 = l1;
		this.l2 = l2;
		this.theta1 = theta1;
		this.theta2 = theta2;
		this.omega1 = omega1;
		this.omega2 = omega2;
		toXY();
	}

	private void toXY() {
		x1 = l1 * Math.cos(theta1);
		x2 = l2 * Math.cos(theta2);
		y1 = l1 * Math.sin(theta1);
		y2 = l2 * Math.sin(theta2);
	}

} // class mathPenPen

class myButton // ========================================
extends Button {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public myButton(int x, int y, int width, int height, String name,
			Panel father) {
		super();
		setName(name);
		setLabel(name);
		father.add(this);
		setBounds(x, y, width, height); // PF moved after add() to workaround bug since fixed
	}

} // class myButton

class myLabel // ==========================================
extends Label {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public myLabel(int x, int y, int width, int height, String name,
			Panel father) {
		super(name);
		father.add(this);
		setBounds(x, y, width, height); // PF moved after add() to workaround bug since fixed
	}
} // class myLabel

class myScrollbar // ======================================
extends Scrollbar {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public myScrollbar(int x, int y, int width, int height, int pos, int min,
			int max, Panel father) {
	    // adjust pos for swing.  -PF
		super(Scrollbar.HORIZONTAL, pos < max-1 ? pos : max-1, 1, min, max);
		father.add(this);
		setBounds(x, y, width, height);  // PF moved after father.add() or else slider is too small
	}
} // class myScrollbar

class theThread implements Runnable {
	private final DoublePendulum that;

	private Thread thread = null;

	public theThread(DoublePendulum that) {
		this.that = that;
	}

	public void run() {
		while (thread != null) {
			that.go();
			try {
				Thread.sleep(20);
			} catch (final InterruptedException e) {
				break;
			}
		}
	}

	public void start() {
		if (thread == null) {
			thread = new Thread(this);
			thread.start();
		}
	}

	public void stop() {
		thread = null;
	}
}
