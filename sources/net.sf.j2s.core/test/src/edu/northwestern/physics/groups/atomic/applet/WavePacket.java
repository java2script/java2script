package edu.northwestern.physics.groups.atomic.applet;

//  WavePacket.java (JDK 1.1)
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
 * fitness for any particular purpose.  Your mileage may vary.            *
 * See the GNU General Public License for more details.                  *
 *                                                                       *
 *************************************************************************/

//  Modification History
//    Date      Initials     Change
/*
 * @author Xiaowei Jiang
 * @version 0.1, June 1999
 */

import a2s.Applet;
import java.awt.BorderLayout;
import a2s.Canvas;
import a2s.Choice;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.Image;
import a2s.Label;
import a2s.Panel;
import a2s.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

import javax.swing.Timer;

//web_Ready
//web_AppletName= WavePacket
//web_Description= A simulation of wave packets
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= wavepacket.png
//web_Info= width:550, height:400
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/waves/wavepacket.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas 

public class WavePacket extends Applet {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	WavePacketControls controls;
	WavePacketCanvas canvas;

	public WavePacket() {
		canvas = new WavePacketCanvas();

		setLayout(new BorderLayout());
		add("North", new Banner("Wave Packets"));
		add("Center", canvas);
		add("South", controls = new WavePacketControls(canvas));
	}

	@Override
	public void init() {
		canvas.init();
	}

	@Override
	public void start() {
		canvas.start();
	}

}

class WavePacketCanvas extends Canvas implements Runnable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private static final Dimension expectedSize = new Dimension(550, 400);
	private Image offImage;

	private Graphics og;
	private int width;

	private int height;
	private Timer demo;
	public double k_ = 1000, w_ = 1000, m_ = 100;
	public int relation = 0; // the type of dispersion relation

	private int t = 0;

	boolean isStopped = false;

	public void advance() {
		if ((getExpectedSize().width != width)
				|| (getExpectedSize().height != height)) {
			init();
		}
		t++;
		/*********************** things to be added ********************/
		prepareImage();
	}

	private int func(int x, int t) {
		double result = 0;
		final double deltak = .01;
		double k, w;
		final int sigma = 1000;
		for (int i = -19; i < 20; i++) {
			k = k_ + (i * deltak);
			w = omega(k);
			result += Math.exp((-i * i) / sigma)
					* Math.cos((k * x) - (w * t * 10));
		}
		result /= 39;
		return (int) ((result * height) / 4);
	}

	public Dimension getExpectedSize() {
		return expectedSize;
	}

	public void init() {
		setBackground(Color.white);
		t = 0;
	}

	public void mypaint(Graphics g) {
		final int margin = 20;
		final int halfh = height / 2;
		g.setColor(getBackground());
		g.fillRect(0, 0, width, height);
		g.setColor(Color.black);
		g.drawLine(margin, halfh, width - margin, halfh);
		int ybegin, y;
		ybegin = func(margin, t);
		g.setColor(Color.blue);
		for (int i = margin + 1; i < (width - margin); i++) {
			y = func(i, t);
			g.drawLine(i - 1, halfh + ybegin, i, halfh + y);
			ybegin = y;
		}
	}

	private double omega(double k) {
		switch (relation) {
		case 0:
			return omega0(k);
		case 1:
			return omega1(k);
		case 2:
			return omega2(k);
		}
		return 0;
	}

	private double omega0(double k) {
		return ((k * k) / (k_ * k_)) * w_;
	}

	private double omega1(double k) {
		return (Math.sqrt((k * k) - (m_ * m_)) / Math.sqrt((k_ * k_)
				- (m_ * m_)))
				* w_;
	}

	private double omega2(double k) {
		return (k / k_) * w_;
	}

	public void prepareImage() {
		mypaint(og);
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
		width = getExpectedSize().width;
		height = getExpectedSize().height;
		if (width != getWidth() || height != getHeight()) {
			width = expectedSize.width = getWidth();
			height = expectedSize.height = getHeight();
			offImage = null;
		}
		if (offImage == null) {
			offImage = createImage(width, height);
			og = offImage.getGraphics();
		}
		if (!isStopped) {
			advance();
			repaint();
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
			demo.start();
		}
	}

	public void stop() {
		if (demo != null) {
			isStopped = true;
			demo = null;
		}
	}

	@Override
	public final void update(Graphics g) {
		g.drawImage(offImage, 0, 0, null);
	}

}

class WavePacketControls extends Panel {
	private class InputListener implements ActionListener {
		public void actionPerformed(ActionEvent e) {
			restart();
		}
	}

	private class RelationListener implements ItemListener {
		public void itemStateChanged(ItemEvent e) {
			restart();
		}
	}

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	WavePacketCanvas canvas;

	TextField kInput, wInput, mInput;

	Choice disRelation;

	public WavePacketControls(WavePacketCanvas canv) {
		canvas = canv;
		setLayout(new FlowLayout(FlowLayout.LEFT));

		disRelation = new Choice();
		disRelation.addItem("E = p*p/2m");
		disRelation.addItem("E*E=p*p+m*m");
		disRelation.addItem("E = c*p");
		add(disRelation);

		add(new Label("k ="));
		add(kInput = new TextField("1000"));
		add(new Label("w ="));
		add(wInput = new TextField("1000"));
		add(new Label("m ="));
		add(mInput = new TextField("100"));

		disRelation.addItemListener(new RelationListener());
		final ActionListener tmp = new InputListener();
		kInput.addActionListener(tmp);
		wInput.addActionListener(tmp);
		mInput.addActionListener(tmp);
	}

	private void restart() {
		canvas.k_ = Double.valueOf(kInput.getText().trim()).doubleValue();
		canvas.w_ = Double.valueOf(wInput.getText().trim()).doubleValue();
		canvas.m_ = Double.valueOf(mInput.getText().trim()).doubleValue();
		canvas.relation = disRelation.getSelectedIndex();
		canvas.init();
		canvas.start();
	}
}
