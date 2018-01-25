package edu.northwestern.physics.groups.atomic.applet;

//  WaveTypes.java
//
/*************************************************************************
 *                                                                       *
 * Copyright (c) 1998        Northwestern University                     *
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
/*
 * @author Xiaowei Jiang, Greg Anderson
 * @version 0.1, Feb 1999
 */

import a2s.Applet;
import java.awt.BorderLayout;
import a2s.Button;
import a2s.Canvas;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.GridLayout;
import a2s.Panel;
import a2s.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Timer;

//web_Ready
//web_AppletName= WaveTypes
//web_Description= Longitudinal waves, transverse waves, and waves of mixed type
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= wavetypes.png
//web_Info= width:550, height:560
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/waves/wavetype.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas, javax.swing.Timer

// BH 1) replacing simple looping Thread with javax.swing.Timer
// BH 2) ca;;

public class WaveTypes extends Applet {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private final WaveTypesCanvas canvas;

	public WaveTypes() {
		setLayout(new BorderLayout());
		canvas = new WaveTypesCanvas(this, 10);
		final WaveTypesControl control = new WaveTypesControl(canvas);
		add("North", new Banner("Types of Waves"));
		add("South", control);
		add("Center", canvas);
	}

	@Override
	public String getAppletInfo() {
		return "Authors Xiaowei Jiang and Greg Anderson. \nCopyrighted by Northwestern University under the GNU GPL. \nThis applet is part of the Virtual Physics Laboratory.";
	}

	@Override
	public void init() {
	}

	@Override
	public void start() {
		canvas.start();
	}
}

class WaveTypesBall {
	private int x, y, x0, y0;
	private final int radius;
	private final Color myColor;

	public WaveTypesBall(Color color, int xx, int yy, int rad) {
		myColor = color;
		x = x0 = xx;
		y = y0 = yy;
		radius = rad;
	}

	public void advanceX(int xx) {
		x = x0 + xx;
	}

	public void advanceY(int yy) {
		y = y0 + yy;
	}

	public void paint(Graphics g) {
		g.setColor(myColor);
		g.fillArc(x - radius, y - radius, (2 * radius), (2 * radius), 0, 360);
	}

	public void reset() {
		x = x0;
		y = y0;
	}
}

class WaveTypesCanvas extends Canvas {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	double kT, kL, omegaT, omegaL, phase, amp;

	WaveTypesBall ballTrans[];
	WaveTypesBall ballLong[];
	WaveTypesBall ballMix[];
	int number, time;

	private Timer demo;

	private boolean isStopped = false;

	private WaveTypes waveTypes;

	public WaveTypesCanvas(WaveTypes waveTypes, int num) {
		number = num;
		this.waveTypes = waveTypes;
		time = 0;
		ballTrans = new WaveTypesBall[number];
		ballLong = new WaveTypesBall[number];
		ballMix = new WaveTypesBall[number];

		for (int i = 0; i < number; i++) {
			ballTrans[i] = new WaveTypesBall(Color.red, 50 * (i + 1), 100, 5);
			ballLong[i] = new WaveTypesBall(Color.blue, 50 * (i + 1), 250, 5);
			ballMix[i] = new WaveTypesBall(Color.green, 50 * (i + 1), 400, 5);
		}
	}

	public void advance() {
		int stepX, stepY;
		for (int i = 0; i < number; i++) {
			stepY = (int) (25 * amp * Math.sin((kT * i * .2)
					- (.3 * omegaT * time)));
			stepX = (int) (25 * Math.sin(((kL * i * .2) - (.3 * omegaL * time))
					+ phase));
			ballTrans[i].advanceY(stepY);
			ballLong[i].advanceX(stepX);
			ballMix[i].advanceY(stepY);
			ballMix[i].advanceX(stepX);
		}
		time++;
	}

	@Override
	public void paint(Graphics g) {
		g.setColor(Color.black);
		g.fillRect(0,  0,  getWidth(), getHeight());
		g.setColor(Color.red);
		g.drawString("Transverse Wave", 5, 20);
		g.setColor(Color.blue);
		g.drawString("Longitudinal Wave", 5, 180);
		g.setColor(Color.green);
		g.drawString("Mixture", 5, 330);
		for (int i = 0; i < number; i++) {
			ballTrans[i].paint(g);
			ballLong[i].paint(g);
			ballMix[i].paint(g);
		}
	}

	public void reset() {
		for (int i = 0; i < number; i++) {
			ballTrans[i].reset();
			ballLong[i].reset();
			ballMix[i].reset();
		}
		time = 0;
	}

	// public void run() {
	// while (!isStopped) {
	// advance();
	// repaint();
	// try {
	// Thread.sleep(60);
	// } catch (final InterruptedException e) {
	// /* do nothing */
	// }
	// }
	// }

	public void run() {
		if (!isStopped) {
			advance();
			waveTypes.repaint(); // BH
		}
	}

	
	public void start() {
		if (demo == null) {
			isStopped = false;
			demo = new Timer(60, new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					run();					
				}
				
			});
			demo.setRepeats(true);
			demo.start();
		}
	}

	public void stop() {
		if (demo != null) {
			isStopped = true;
			demo = null;
		}
	}

}

class WaveTypesControl extends Panel {
	class ControlListener implements ActionListener {
		@Override
		public void actionPerformed(ActionEvent e) {
			readInput();
			canvas.reset();
		}
	}

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	WaveTypesCanvas canvas;
	TextField kTInput, kLInput, omegaTInput, omegaLInput;
	TextField phaseInput, ampInput;

	Button btemp;

	public WaveTypesControl(WaveTypesCanvas theCanvas) {
		canvas = theCanvas;

		setLayout(new GridLayout(3, 4, 5, 5));

		btemp = new Button("Transverse k = ");
		btemp.setForeground(Color.red);
		add(btemp);
		kTInput = new TextField("3");
		add(kTInput);

		btemp = new Button("Transverse f = ");
		btemp.setForeground(Color.red);
		add(btemp);
		omegaTInput = new TextField("1");
		add(omegaTInput);

		btemp = new Button("Longitudinal k = ");
		btemp.setForeground(Color.blue);
		add(btemp);
		kLInput = new TextField("3");
		add(kLInput);

		btemp = new Button("Longitudinal f = ");
		btemp.setForeground(Color.blue);
		add(btemp);
		omegaLInput = new TextField("1");
		add(omegaLInput);

		btemp = new Button("Phase Difference = ");
		btemp.setForeground(Color.black);
		add(btemp);
		phaseInput = new TextField("0");
		add(phaseInput);

		btemp = new Button("Amp_r/Amp_b  = ");
		btemp.setForeground(Color.black);
		add(btemp);
		ampInput = new TextField("1");
		add(ampInput);

		readInput();
		kTInput.addActionListener(new ControlListener());
		kLInput.addActionListener(new ControlListener());
		omegaTInput.addActionListener(new ControlListener());
		omegaLInput.addActionListener(new ControlListener());
		phaseInput.addActionListener(new ControlListener());
		ampInput.addActionListener(new ControlListener());
	}

	public void readInput() {
		Double tmp;
		tmp = Double.valueOf(kTInput.getText().trim());
		canvas.kT = tmp.doubleValue();
		tmp = Double.valueOf(kLInput.getText().trim());
		canvas.kL = tmp.doubleValue();
		tmp = Double.valueOf(omegaTInput.getText().trim());
		canvas.omegaT = tmp.doubleValue();
		tmp = Double.valueOf(omegaLInput.getText().trim());
		canvas.omegaL = tmp.doubleValue();
		tmp = Double.valueOf(phaseInput.getText().trim());
		canvas.phase = tmp.doubleValue();
		tmp = Double.valueOf(ampInput.getText().trim());
		canvas.amp = tmp.doubleValue();
	}
}
