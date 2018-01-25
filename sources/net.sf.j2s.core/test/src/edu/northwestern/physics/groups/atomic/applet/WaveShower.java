package edu.northwestern.physics.groups.atomic.applet;

//  WaveShower.java
//
/*************************************************************************
 *                                                                       *
 * Copyright (c) 1999     Northwestern University                        *
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
 * fitness for any particular purpose.  Your mileage may vary.           *
 * See the GNU General Public License for more details.                  *
 *                                                                       *
 *************************************************************************/

//  Modification History
//    Date      Initials     Change
/*
 * @author Northwestern University
 * @version 0.1, June 1999
 */

import a2s.Applet;
import java.awt.BorderLayout;
import a2s.Button;
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

import javajs.util.JSThread;

//web_Ready
//web_AppletName= WaveShower
//web_Description= A simulation of a wave reflection
//web_Date= $Date: 2016-12-30 11:17:11 -0600 (Fri, 30 Dec 2016) $
//web_AppletImage= waveshower.png
//web_Info= width:550, height:400
//web_JavaVersion= http://groups.physics.northwestern.edu/vpl/waves/wavereflection.html
//web_Category= Physics - Waves
//web_Features= AWT-to-Swing, canvas, JSThread

// BH 1) Note that calling paint from update (as was the case here) was never recommended, even
// BH for AWT. So here canvas.paint --> canvas.paintMe

// BH see	http://www.oracle.com/technetwork/java/painting-140037.html#awt_summary

// BH 2) applet.paint(g) needs to include super.paint(g), or buttons will not show.

// BH 3) Thread --> JSThread; could have just made this a timer.

// BH 4) fixing problem that after starting, increasing the size of the applet needs a new image.


class WaveCanvas extends Canvas {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	WaveShower waveshower;
	Thread wavethread;
	int waveindex = 0;
	int time = 0;
	Dimension d;
	int[] x, y;
	Image offImage;
	Graphics og;
	final double pi = 3.1415;

	WaveCanvas(WaveShower waveshower) {
		this.waveshower = waveshower;
	}

	private void myPaint(Graphics g) {
		g.drawImage(offImage, 0, 0, null);
	}

	//@Override
	public void paintMe(Graphics g) {
		if (waveindex != 0) {
			g.setColor(Color.red);
			g.drawLine(10, d.height / 2, d.width - 10, d.height / 2);
			g.setColor(Color.black);
			g.drawLine(d.width - 10, d.height / 4, d.width - 10,
					(d.height * 3) / 4);
		}
	}

	private void paintImage(Graphics g) {
		// setBackground(Color.blue);
		g.setColor(Color.red);
		g.clearRect(0, 0, d.width, d.height);
		if ((waveindex != 0)) {
			int i;
			for (i = 0; i < waveindex; i++) {
				g.drawLine(x[i], y[i], x[i + 1], y[i + 1]);
			}
			g.setColor(Color.black);
			g.drawLine(x[waveindex], d.height / 4, x[waveindex],
					(d.height * 3) / 4);
		}
	}

	private void prepareImage() {
		Dimension dnew = getSize();
		if (d != null && d.width == dnew.width && d.height == dnew.height)
			return;
		d = dnew;
		offImage = createImage(d.width, d.height);
		og = offImage.getGraphics();
	}

	public void start() {
		// prepareImage(); // BH moved from here
		if (wavethread == null) {
			wavethread = new WaveThread();
			wavethread.start();
		}
	}

	public void stop() {
		wavethread.interrupt();
		wavethread = null;
		time = 0;
	}
	

//public void run() {
//	while (wavethread != null) {
//		repaint();
//		time++;
//		try {
//			Thread.sleep(60);
//		} catch (final InterruptedException e) {
//			break;
//		}
//	}
//}
	
	public class WaveThread extends JSThread {

		@Override
		protected boolean myInit() {
			return true;
		}

		@Override
		protected boolean isLooping() {
			return (wavethread != null);
		}

		@Override
		protected boolean myLoop() {
			repaint();
			time++;
			return true;
		}

		@Override
		protected void whenDone() {
		}

		@Override
		protected int getDelayMillis() {
			return 60;
		}

		@Override
		protected void onException(Exception e) {
		}

		@Override
		protected void doFinally() {
		}
	}


	@Override
	public synchronized void update(Graphics g) {
		prepareImage(); // BH moved to here
		waveindex = (d.width - 20);
		x = new int[waveindex + 1];
		y = new int[waveindex + 1];
		int i;
		if (!waveshower.on) {
			g.clearRect(0, 0, d.width, d.height);
			paintMe(g);
			return;
		} else {
			for (i = 0; i <= waveindex; i++) {
				x[i] = i + 10;
			}
			if (waveshower.waveshape) {// if ..shape
				if (waveshower.waveend) {// if .. end
					for (i = 0; i <= waveindex; i++) {// for loop
						if (x[i] >= ((waveshower.f * time * waveshower.length) / (20 * pi)))// if
						// time
						{
							y[i] = d.height / 2;
						} else {
							if ((((waveshower.f * time * waveshower.length) / (20 * pi)) >= (d.width - 10.0))
									&& (x[i] >= ((2 * d.width) - 20.0 - ((waveshower.f
											* time * waveshower.length) / (20 * pi))))) {
								y[i] = (int) (((d.height / 2) + (50 * Math
										.sin(((2 * pi * x[i]) / waveshower.length)
												- ((waveshower.f * time) / 10.0)))) - (50 * Math
														.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
																- ((waveshower.f * time) / 10.0))));
							} else {
								y[i] = (int) ((d.height / 2) + (50 * Math
										.sin(((2 * pi * x[i]) / waveshower.length)
												- ((waveshower.f * time) / 10.0))));
							}
						}// if time
					}// for loop
				} else {
					for (i = 0; i <= waveindex; i++) {// for loop
						if (x[i] >= ((waveshower.f * time * waveshower.length) / (20 * pi)))// if
						// time
						{
							y[i] = d.height / 2;
						} else {
							if ((((waveshower.f * time * waveshower.length) / (20 * pi)) >= (d.width - 10.0))
									&& (x[i] >= ((2 * d.width) - 20.0 - ((waveshower.f
											* time * waveshower.length) / (20 * pi))))) {
								y[i] = (int) ((d.height / 2)
										+ (50 * Math
												.sin(((2 * pi * x[i]) / waveshower.length)
														- ((waveshower.f * time) / 10.0))) + (50 * Math
																.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
																		- ((waveshower.f * time) / 10.0))));
							} else {
								y[i] = (int) ((d.height / 2) + (50 * Math
										.sin(((2 * pi * x[i]) / waveshower.length)
												- ((waveshower.f * time) / 10.0))));
							}
						}// if time
					}// for .. loop
				}// if .. end
			} else {
				if (waveshower.waveend) {// if .. end
					for (i = 0; i <= waveindex; i++) {// for loop
						if (((waveshower.f * time * waveshower.length) / (20 * pi)) <= (d.width - 10.0)) {
							if ((x[i] >= ((waveshower.f * time * waveshower.length) / (20 * pi)))
									|| (x[i] <= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length)))// if
							// time
							{
								y[i] = d.height / 2;
							} else {
								y[i] = (int) ((d.height / 2) + (50 * Math
										.sin(((2 * pi * x[i]) / waveshower.length)
												- ((waveshower.f * time) / 10.0))));
							}
						} else {
							if ((((waveshower.f * time * waveshower.length) / (20 * pi)) >= (d.width - 10.0))
									&& (((waveshower.f * time * waveshower.length) / (20 * pi)) <= ((d.width - 10.0) + waveshower.length))) {
								if ((x[i] >= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] >= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = (int) (((d.height / 2) + (50 * Math
											.sin(((2 * pi * x[i]) / waveshower.length)
													- ((waveshower.f * time) / 10.0)))) - (50 * Math
											.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
													- ((waveshower.f * time) / 10.0))));
								}
								if ((x[i] <= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] >= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = (int) ((d.height / 2) + (50 * Math
											.sin(((2 * pi * x[i]) / waveshower.length)
													- ((waveshower.f * time) / 10.0))));
								}
								if ((x[i] >= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] <= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = (int) ((d.height / 2) - (50 * Math
											.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
													- ((waveshower.f * time) / 10.0))));
								}
								if ((x[i] <= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] <= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = d.height / 2;
								}
							}
							if (((waveshower.f * time * waveshower.length) / (20 * pi)) >= ((d.width - 10.0) + waveshower.length)) {
								if (((waveshower.f * time * waveshower.length) / (20 * pi)) <= ((2 * (d.width - 10)) + waveshower.length)) {
									if ((x[i] <= ((2 * (d.width - 10)) - ((waveshower.f
											* time * waveshower.length) / (20 * pi))))
											|| (x[i] >= (((2 * d.width) - 20 - ((waveshower.f
													* time * waveshower.length) / (20 * pi))) + waveshower.length))) {
										y[i] = d.height / 2;
									} else {
										y[i] = (int) ((d.height / 2) - (50 * Math
												.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
														- ((waveshower.f * time) / 10.0))));
									}
								} else {
									time = -1;
									y[i] = d.height / 2;
								}
							}
						}// if time
					}// for loop
				} else {
					for (i = 0; i <= waveindex; i++) {// for loop
						if (((waveshower.f * time * waveshower.length) / (20 * pi)) <= (d.width - 10.0)) {
							if ((x[i] >= ((waveshower.f * time * waveshower.length) / (20 * pi)))
									|| (x[i] <= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length)))// if
							// time
							{
								y[i] = d.height / 2;
							} else {
								y[i] = (int) ((d.height / 2) + (50 * Math
										.sin(((2 * pi * x[i]) / waveshower.length)
												- ((waveshower.f * time) / 10.0))));
							}
						} else {
							if ((((waveshower.f * time * waveshower.length) / (20 * pi)) >= (d.width - 10.0))
									&& (((waveshower.f * time * waveshower.length) / (20 * pi)) <= ((d.width - 10.0) + waveshower.length))) {
								if ((x[i] >= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] >= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = (int) ((d.height / 2)
											+ (50 * Math
													.sin(((2 * pi * x[i]) / waveshower.length)
															- ((waveshower.f * time) / 10.0))) + (50 * Math
											.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
													- ((waveshower.f * time) / 10.0))));
								}
								if ((x[i] <= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] >= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = (int) ((d.height / 2) + (50 * Math
											.sin(((2 * pi * x[i]) / waveshower.length)
													- ((waveshower.f * time) / 10.0))));
								}
								if ((x[i] >= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] <= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = (int) ((d.height / 2) + (50 * Math
											.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
													- ((waveshower.f * time) / 10.0))));
								}
								if ((x[i] <= ((2 * d.width) - 20.0 - ((waveshower.f
										* time * waveshower.length) / (20 * pi))))
										&& (x[i] <= (((waveshower.f * time * waveshower.length) / (20 * pi)) - waveshower.length))) {
									y[i] = d.height / 2;
								}
							}
							if (((waveshower.f * time * waveshower.length) / (20 * pi)) >= ((d.width - 10.0) + waveshower.length)) {
								if (((waveshower.f * time * waveshower.length) / (20 * pi)) <= ((2 * (d.width - 10)) + waveshower.length)) {
									if ((x[i] <= ((2 * (d.width - 10)) - ((waveshower.f
											* time * waveshower.length) / (20 * pi))))
											|| (x[i] >= (((2 * d.width) - 20 - ((waveshower.f
													* time * waveshower.length) / (20 * pi))) + waveshower.length))) {
										y[i] = d.height / 2;
									} else {
										y[i] = (int) ((d.height / 2) + (50 * Math
												.sin(((2 * pi * ((2 * d.width) - 20 - x[i])) / waveshower.length)
														- ((waveshower.f * time) / 10.0))));
									}
								} else {
									time = -1;
									y[i] = d.height / 2;
								}
							}
						}// if time
					}// for loop

				}// if .. end
			}// if ..shape
		}
		paintImage(og);
		myPaint(g);
	}

}

public class WaveShower extends Applet implements ActionListener, ItemListener {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	WaveCanvas wavecanvas;
	Panel control, choicecontrol, subpanel1, subpanel2;
	Button wavebutton;
	Label label1, label2;
	TextField text1, text2;
	Choice c1, c2;
	int length, f;
	boolean waveshape, waveend, on;

	public void actionPerformed(ActionEvent e) {
		final Object src = e.getSource();

		if (src == wavebutton) {
			on ^= true;
			if (on) {
				wavebutton.setForeground(Color.red);
				wavebutton.setLabel("Stop");
				wavecanvas.start();
			} else {
				wavebutton.setForeground(Color.black);
				wavebutton.setLabel("Start");
				wavecanvas.stop();
				wavecanvas.repaint();
			}
		}
		if (src == text1) {
			length = Float.valueOf(text1.getText()).intValue();
		}
		if (src == text2) {
			f = Float.valueOf(text2.getText()).intValue();
		}

	}

	@Override
	public String getAppletInfo() {
		return "Xiaowei Jiang, not copyrighted, Feb. 1999";
	}

	@Override
	public void init() {
		length = 100;
		f = 10;
		waveshape = true;
		waveend = true;
		on = false;
		final BorderLayout layout = new BorderLayout();
		layout.setVgap(5);
		layout.setHgap(10);
		setLayout(layout);

		add("North", new Banner("Wave Reflection"));
		wavecanvas = new WaveCanvas(this);
		add("Center", wavecanvas);

		control = new Panel();
		add("South", control);

		label1 = new Label("Wave Length");
		label2 = new Label("Frequency");
		text1 = new TextField("100", 3);
		text2 = new TextField("10", 3);
		wavebutton = new Button("Start");
		c1 = new Choice();
		c1.addItem("Harmonic Wave");
		c1.addItem("Single Pulse");
		c2 = new Choice();
		c2.addItem("Fixed end");
		c2.addItem("Open end");

		control.setLayout(new FlowLayout(FlowLayout.LEFT));
		control.add(label1);
		control.add(text1);
		text1.addActionListener(this);
		control.add(label2);
		control.add(text2);
		text2.addActionListener(this);
		control.add(c1);
		c1.addItemListener(this);
		control.add(c2);
		c2.addItemListener(this);
		control.add(wavebutton);
		wavebutton.addActionListener(this);
	}

	public void itemStateChanged(ItemEvent e) {
		final Object src = e.getSource();
		int id;

		if (src == c1) {
			id = c1.getSelectedIndex();
			if (c1.getItem(id) == "Harmonic Wave") {
				waveshape = true;
			} else {
				waveshape = false;
			}
		}
		if (src == c2) {
			id = c2.getSelectedIndex();
			if (c2.getItem(id) == "Fixed end") {
				waveend = true;
			} else {
				waveend = false;
			}
		}
	}

	@Override
	public void paint(Graphics g) {
		super.paint(g); // BH added
		wavebutton.requestFocus();
		//wavecanvas.repaint();// BH note: this is unnecessary
	}

	@Override
	public void start() {
	}
}
