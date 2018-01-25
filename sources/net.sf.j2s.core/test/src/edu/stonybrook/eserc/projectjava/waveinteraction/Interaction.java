/*
 * Decompiled with CFR 0_118.
 * 
 * Could not load the following classes:
 *  Box
 *  Handle
 *  SineWave
 *  SumWaves
 */

package edu.stonybrook.eserc.projectjava.waveinteraction;

import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Timer;

// a2s is a SwingJS Java AWT adapter package that allow us to 
// keep references here that look like AWT Applet and Components
// even though everything has to be Swing JApplet and JComponents.

import a2s.Applet;
import a2s.Button;
import a2s.Scrollbar;


//web_Ready
//web_AppletName= Wave Interaction
//web_Description= Adjust two sinusoidal waves and see their sum
//web_JavaVersion= http://www.eserc.stonybrook.edu/ProjectJava/WaveInteractionApplet
//web_AppletImage= waveinteraction.png
//web_Category= Physics - Waves
//web_Info= width:600,height:520
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features= graphics, AWT-to-Swing with handleEvent, decompiled using CFR

public class Interaction extends Applet implements Runnable {
	
	// Note that a2s.Applet subclasses javax.swing.JApplet, not java.applet.Applet

	private Rectangle border;
	private Rectangle graph;
	private Rectangle clip;
	private Rectangle control;
	private Rectangle[] space;
	private Rectangle[] base;
	private Rectangle[] part;
	private SineWave[] wave;
	private SineWave[] store_wave;
	private SumWaves sum;
	private Box[] box;
	private Box[] speed_box;
	private Handle[] handle;
	private Scrollbar[] bar;
	private Scrollbar[] speed;
	private Image[] image;
	private Graphics[] offg;
	private FontMetrics fm;
	private Font label_font;
	private Font graph_font;
	private Font title_font;
	private int index;
	private int update_mode;
	private int values_mode;
	private int runner_state;
	private int[] speed_value;
	private Timer runner;
	Button button;
	private int width;
	private int height;
	private int msDelay;
	private int startSpeed;

	@Override
	public void init() {

		this.setSize(600, 520);
		
		// super.init() is a SwingJS call to a2s.Applet that 
		// enable the older handleEvent() method in Java AWT applets
		// and also fixes flashing/background/missing button problems
		// in Java Swing when both background painting and buttons are involved.
		
		// It requires that we put all of our graphics painting into the paintMe(g) method. 

		super.init();

		
		// We adjust a few timing/speed characteristics for JavaScript, which is 3-5 times slower than Java.
		
		boolean isJS = false;

		/**
		 * @j2sNative isJS = true;
		 * 
		 */
		{
		}

		msDelay = (isJS ? 2 : 30); // SwingJS optimization
		startSpeed = (isJS ? 15 : 5); // SwingJS optimization


		this.title_font = new Font("Helvetica", 1, 16);
		this.label_font = new Font("Helvetica", 0, 14);
		this.graph_font = new Font("Helvetica", 0, 12);
		this.speed_value = new int[2];
		int n = 0;
		while (n < this.speed_value.length) {
			this.speed_value[n] = startSpeed;
			++n;
		}
		this.setLayout(null);
		this.setWaves();
		this.setComponents();
		this.defineLayout();
		this.index = -1;
		this.update_mode = 2;
		this.values_mode = 6;
		this.runner_state = 0;
	}
	
	private void setWaves() {
		this.wave = new SineWave[2];
		this.store_wave = new SineWave[2];
		this.wave[0] = new SineWave(40, 40, 0);
		this.wave[1] = new SineWave(30, 40, 0);
		this.sum = new SumWaves(this.wave[0], this.wave[1]);

	}

	private void setComponents() {
		this.box = new Box[6];
		this.speed_box = new Box[2];
		this.bar = new Scrollbar[6];
		this.speed = new Scrollbar[2];
		int n = 0;
		while (n < 2) {
			int n2 = 3 * n;
			this.bar[n2] = new Scrollbar(0, 0, 0, 0, 90);
			this.bar[n2 + 1] = new Scrollbar(0, 0, 0, 0, 90);
			this.bar[n2 + 2] = new Scrollbar(0, 0, 0, 0, 90);
			this.speed[n] = new Scrollbar(0, 0, 0, 0, 90);
			this.add(this.bar[n2]);
			this.add(this.bar[n2 + 1]);
			this.add(this.bar[n2 + 2]);
			this.add(this.speed[n]);
			this.bar[n2].setBackground(Color.gray);
			this.bar[n2 + 1].setBackground(Color.gray);
			this.bar[n2 + 2].setBackground(Color.gray);
			this.speed[n].setBackground(Color.gray);
			this.bar[n2].setValue(this.wave[n].wavelength * 9 / 20);
			this.bar[n2 + 1].setValue(this.wave[n].amplitude * 2);
			this.bar[n2 + 2].setValue(this.wave[n].phase / 4);
			this.speed[n].setValue(this.speed_value[n] * 3);
			++n;
		}
		this.button = new Button("start");
		this.button.setFont(this.title_font);
		this.button.setBackground(Color.lightGray);
		this.button.setForeground(Color.black);
		this.add(this.button);
	}


	@Override
	public String getAppletInfo() {
		return "Waveform Interaction, written by Konstantin Lukin. (ProjectJava, LICIL)";
	}

	@Override
	public void start() {
		
		// The original applet used a thread with a do/while loop and Thread.sleep(),
		// but we cannot use that in JavaScript. In this case we use a javax.swing.Timer, 
		// which is just a simple repeating setTimeout call. 
		
		this.runner = new Timer(msDelay, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				run();
			}

		});
		// Old way:
		// new Thread(this);
		// this.runner.setPriority(1);
		
		// New way:
		this.runner.setRepeats(true);
		this.runner.start();
	}
	
	@Override
	public void run() {
		switch (this.runner_state) {
		default: {
			return;
		}
		case 1:
		}
		this.wave[0].advance(this.speed_value[0]);
		this.wave[1].advance(this.speed_value[1]);
		this.repaint();
	}


	@Override
	public void stop() {
		this.runner.stop();
		this.runner = null;
	}

	// The original run() method is preserved below:

//	public void run() {
//		block3: do {
//			this.pause(30);
//			Thread.yield();
//			switch (this.runner_state) {
//			default: {
//				continue block3;
//			}
//			case 1:
//			}
//			this.wave[0].advance(this.speed_value[0]);
//			this.wave[1].advance(this.speed_value[1]);
//			this.repaint();
//		} while (true);
//	}
//
//
//	private void pause(int n) {
//		try {
//			Thread.sleep(n);
//			return;
//		} catch (InterruptedException v0) {
//			return;
//		}
//	}

	private void startAnimation() {
		this.store_wave[0] = this.wave[0].copy();
		this.store_wave[1] = this.wave[1].copy();
		int n = 0;
		while (n < 2) {
			this.bar[3 * n + 2].disable();
			++n;
		}
		this.update_mode = 2;
		this.values_mode = -2;
		this.runner_state = 1;
	}

	private void stopAnimation() {
		this.runner_state = 0;
		int n = 0;
		while (n < 2) {
			this.wave[n].phase = this.store_wave[n].phase;
			++n;
		}
		int n2 = 0;
		while (n2 < 2) {
			this.bar[3 * n2 + 2].enable();
			++n2;
		}
		this.update_mode = 2;
		this.values_mode = 6;
		this.repaint();
	}

	@Override
	public boolean action(Event event, Object object) {
		if (event.target instanceof Button) {
			if (this.button.getLabel().equals("start")) {
				this.startAnimation();
				this.button.setLabel("stop");
			} else {
				this.stopAnimation();
				this.button.setLabel("start");
			}
		} else {
			return super.action(event, object);
		}
		return true;
	}

	@Override
	public boolean handleEvent(Event event) {
		int n;
		//System.out.println("handle " + event);
		if (event.id == 605 || event.id == 601 || event.id == 602
				|| event.id == 603 || event.id == 604) {
			n = 0;
			while (n < 8) {
				if (n < 6 && event.target == this.bar[n] || n > 5
						&& event.target == this.speed[n - 6])
					break;
				++n;
			}
			switch (n) {
			case 0:
			case 3: {
				this.wave[n / 3].wavelength = this.bar[n].getValue() * 20 / 9;
				this.values_mode = n == 0 ? 0 : 2;
				break;
			}
			case 1:
			case 4: {
				this.wave[n / 3].amplitude = this.bar[n].getValue() / 2;
				this.values_mode = n == 1 ? 0 : 2;
				break;
			}
			case 2:
			case 5: {
				this.wave[n / 3].phase = this.bar[n].getValue() * 4;
				this.values_mode = n == 2 ? 1 : 3;
				break;
			}
			case 6:
			case 7: {
				this.speed_value[n - 6] = this.speed[n - 6].getValue() / 3;
				this.values_mode = n == 6 ? 4 : 5;
				break;
			}
			}
		} else {
			return super.handleEvent(event);
		}
		this.update_mode = n / 3;
		
		this.repaint();
		return true;
	}

	@Override
	public boolean mouseDown(Event event, int n, int n2) {
		if (this.runner_state == 1) {
			return super.mouseDown(event, n, n2);
		}
		this.index = this.insideHandle(n, n2);
		if (this.index == -1) {
			return super.mouseDown(event, n, n2);
		}
		this.notifyBars(Color.lightGray);
		return true;
	}

	@Override
	public boolean mouseUp(Event event, int n, int n2) {
		if (this.runner_state == 1) {
			return super.mouseDown(event, n, n2);
		}
		this.notifyBars(Color.gray);
		this.index = -1;
		return super.mouseUp(event, n, n2);
	}

	@Override
	public boolean mouseDrag(Event event, int n, int n2) {
		switch (this.index) {
		case -1: {
			return super.mouseDrag(event, n, n2);
		}
		case 0:
		case 2: {
			int n3;
			int n4 = this.index / 2;
			int n5 = n - this.space[n4].x - this.base[n4].x;
			this.wave[n4].phase = n3 = this.AdjustPhase(n5 * 360
					/ this.wave[n4].wavelength);
			this.updateBars();
			this.update_mode = this.index == 0 ? 0 : 1;
			this.values_mode = this.index == 0 ? 1 : 3;
			break;
		}
		case 1:
		case 3: {
			int n6;
			int n7 = this.index / 2;
			int n8 = n - this.space[n7].x - this.base[n7].x;
			int n9 = n2 - this.space[n7].y - this.base[n7].y;
			this.wave[n7].amplitude = n6 = this.AdjustAmp(this.base[n7].height / 2
					- n9);
			int n10 = n8 * 360 / (this.wave[n7].phase + 90);
			this.wave[n7].wavelength = n10 = this.AdjustLambda(n10);
			this.updateBars();
			this.update_mode = this.index == 1 ? 0 : 1;
			this.values_mode = this.index == 1 ? 0 : 2;
			break;
		}
		default: {
			return super.mouseDrag(event, n, n2);
		}
		}
		this.repaint();
		return true;
	}

	private int AdjustLambda(int n) {
		if (n > 200) {
			return 200;
		}
		if (n < 5) {
			return 5;
		}
		return n;
	}

	private int AdjustAmp(int n) {
		if (n > 45) {
			return 45;
		}
		if (n < 0) {
			return 0;
		}
		return n;
	}

	private int AdjustPhase(int n) {
		if (n > 360) {
			return 360;
		}
		if (n < 0) {
			return 0;
		}
		return n;
	}

	private int insideHandle(int n, int n2) {
		int n3 = 0;
		while (n3 < this.handle.length) {
			int n4 = n - this.space[n3 / 2].x;
			int n5 = n2 - this.space[n3 / 2].y;
			if (this.handle[n3].inside(n4, n5)) {
				return n3;
			}
			++n3;
		}
		return -1;
	}

	private void notifyBars(Color color) {
		switch (this.index) {
		case -1: {
			return;
		}
		case 0: {
			this.bar[2].setBackground(color);
			return;
		}
		case 1: {
			this.bar[0].setBackground(color);
			this.bar[1].setBackground(color);
			return;
		}
		case 2: {
			this.bar[5].setBackground(color);
			return;
		}
		case 3: {
			this.bar[3].setBackground(color);
			this.bar[4].setBackground(color);
			return;
		}
		}
	}

	private void updateBars() {
		switch (this.index) {
		case -1: {
			return;
		}
		case 0: {
			this.bar[2].setValue(this.wave[0].phase / 4);
			return;
		}
		case 1: {
			this.bar[0].setValue(this.wave[0].wavelength * 9 / 20);
			this.bar[1].setValue(this.wave[0].amplitude * 2);
			return;
		}
		case 2: {
			this.bar[5].setValue(this.wave[1].phase / 4);
			return;
		}
		case 3: {
			this.bar[3].setValue(this.wave[1].wavelength * 9 / 20);
			this.bar[4].setValue(this.wave[1].amplitude * 9 / 4);
			return;
		}
		}
	}

	@Override
	protected void paintMe(Graphics graphics) {
		defineLayout();
		if (this.offg == null) {
			this.image = new Image[3];
			this.offg = new Graphics[3];
			int n = 0;
			while (n < this.image.length) {
				this.image[n] = this.createImage(this.space[n].width,
						this.space[n].height);
				this.offg[n] = this.image[n].getGraphics();
				++n;
			}
		}
		this.drawBorder(graphics);
		this.drawControl(graphics);
		this.drawGraph(graphics);
		this.update_mode = 2;
		this.values_mode = 6;
		this.update(graphics);

	}

	@Override
	public void update(Graphics graphics) {
		this.drawValues(graphics);
		if (this.runner_state == 1) {
			this.update_mode = 2;
			this.values_mode = -2;
		}
		switch (this.update_mode) {
		case -1: {
			return;
		}
		case 0: {
			this.drawImage0();
			this.drawImage2();
			graphics.drawImage(this.image[0], this.space[0].x, this.space[0].y, null);
			graphics.drawImage(this.image[2], this.space[2].x, this.space[2].y, null);
			return;
		}
		case 1: {
			this.drawImage1();
			this.drawImage2();
			graphics.drawImage(this.image[1], this.space[1].x, this.space[1].y, null);
			graphics.drawImage(this.image[2], this.space[2].x, this.space[2].y, null);
			return;
		}
		case 2: {
			this.drawImage0();
			this.drawImage1();
			this.drawImage2();
			graphics.drawImage(this.image[0], this.space[0].x, this.space[0].y, null);
			graphics.drawImage(this.image[1], this.space[1].x, this.space[1].y, null);
			graphics.drawImage(this.image[2], this.space[2].x, this.space[2].y, null);
			return;
		}
		}
	}

	private void setHandles(int n) {
		this.handle[2 * n].move(this.base[n].x + this.wave[n].phase
				* this.wave[n].wavelength / 360, this.space[n].height / 2);
		this.handle[2 * n + 1].move(this.handle[2 * n].Cx + this.wave[n].wavelength
				/ 4, this.space[n].height / 2 - this.wave[n].amplitude);
	}

	void drawGraphPaper(int n, int n2, int n3) {
		this.offg[n].setColor(Color.darkGray);
		int n4 = n2;
		while (n4 < this.space[n].width) {
			this.offg[n].drawLine(n4, 0, n4, this.space[n].height);
			n4 += 10;
		}
		int n5 = n3;
		while (n5 < this.space[n].height) {
			this.offg[n].drawLine(0, n5, this.space[n].width, n5);
			n5 += 10;
		}
	}

	private void drawImage0() {
		this.offg[0].setColor(Color.black);
		this.offg[0].fillRect(0, 0, this.space[0].width, this.space[0].height);
		this.drawGraphPaper(0, 0, 8);
		this.offg[0].setColor(new Color(0, 180, 0));
		this.wave[0].draw(this.offg[0], this.base[0].x, this.space[0].height / 2,
				this.base[0].width, 2);
		if (this.runner_state == 0) {
			this.setHandles(0);
			this.offg[0].setColor(Color.white);
			this.handle[0].draw(this.offg[0]);
			this.handle[1].draw(this.offg[0]);
		}
	}

	private void drawImage1() {
		this.offg[1].setColor(Color.black);
		this.offg[1].fillRect(0, 0, this.space[1].width, this.space[1].height);
		this.drawGraphPaper(1, 0, 4);
		this.offg[1].setColor(new Color(0, 180, 0));
		this.wave[1].draw(this.offg[1], this.base[1].x, this.space[1].height / 2,
				this.base[1].width, 2);
		if (this.runner_state == 0) {
			this.setHandles(1);
			this.offg[1].setColor(Color.white);
			this.handle[2].draw(this.offg[1]);
			this.handle[3].draw(this.offg[1]);
		}
	}

	private void drawImage2() {
		this.offg[2].setColor(Color.black);
		this.offg[2].fillRect(0, 0, this.space[2].width, this.space[2].height);
		this.drawGraphPaper(2, 0, 0);
		this.offg[2].setColor(Color.blue);
		this.sum.draw(this.offg[2], this.base[2].x, this.space[2].height / 2,
				this.base[2].width, 3);
	}

	void drawBorder(Graphics graphics) {
		graphics.setColor(Color.black);
		graphics.fillRect(this.border.x, this.border.y, this.border.width,
				this.border.height);
		graphics.setColor(Color.white);
		graphics.drawRect(this.border.x - 1, this.border.y - 1, this.border.width,
				this.border.height);
		graphics.setColor(Color.gray);
		graphics.drawRect(this.border.x + 1, this.border.y + 1, this.border.width,
				this.border.height);
		graphics.setColor(Color.black);
		graphics.drawRect(this.border.x, this.border.y, this.border.width,
				this.border.height);
	}

	void drawGraph(Graphics graphics) {
		graphics.setColor(Color.black);
		graphics.fillRect(this.graph.x, this.graph.y, this.graph.width + 1,
				this.graph.height + 1);
		this.drawGraphPaper(graphics);
		this.drawGraphLabels(graphics);
	}

	void drawGraphPaper(Graphics graphics) {
		graphics.setColor(Color.darkGray);
		int n = this.graph.x;
		while (n < this.graph.x + this.graph.width) {
			graphics.drawLine(n, this.graph.y, n, this.graph.y + this.graph.height);
			n += 10;
		}
		int n2 = this.graph.y;
		while (n2 < this.graph.y + this.graph.height) {
			graphics.drawLine(this.graph.x, n2, this.graph.x + this.graph.width, n2);
			n2 += 10;
		}
	}

	void drawGraphLabels(Graphics graphics) {
		graphics.setFont(this.graph_font);
		graphics.setColor(Color.lightGray);
		graphics.drawString("Wave1", this.graph.x + 5, this.space[0].y
				+ this.space[0].height / 2);
		graphics.drawString("Wave2", this.graph.x + 5, this.space[1].y
				+ this.space[1].height / 2);
		graphics.drawString("Sum", this.graph.x + 5, this.space[2].y
				+ this.space[2].height / 2);
	}

	void drawControl(Graphics graphics) {
		graphics.setColor(Color.black);
		graphics.fillRect(this.control.x, this.control.y, this.control.width,
				this.control.height);
		this.drawWaveBox0(graphics);
		this.drawWaveBox1(graphics);
		this.drawAnimBox(graphics);
		this.drawSeparator(graphics);
		this.drawControlLabels(graphics);
	}

	void drawControlLabels(Graphics graphics) {
		graphics.setFont(this.label_font);
		String[] arrstring = new String[] { "Wavelength", "Amplitude", "Phase" };
		int n = 0;
		while (n < 6) {
			graphics.setColor(Color.black);
			this.box[n].fill(graphics, 0);
			graphics.setColor(Color.green);
			graphics.drawString(arrstring[n % 3], this.box[n].x, this.box[n].y
					+ this.box[n].top.height - 5);
			++n;
		}
		String[] arrstring2 = new String[] { "Speed 1", "Speed 2" };
		int n2 = 0;
		while (n2 < 2) {
			graphics.setColor(Color.black);
			this.speed_box[n2].fill(graphics, 0);
			graphics.setColor(Color.green);
			graphics.drawString(arrstring2[n2], this.speed_box[n2].x,
					this.speed_box[n2].y + this.speed_box[n2].top.height - 5);
			++n2;
		}
		arrstring = null;
		arrstring2 = null;
	}

	private void drawValues(Graphics graphics) {
		graphics.setFont(this.label_font);
		switch (this.values_mode) {
		case -1: {
			graphics.setColor(Color.black);
			int n = 0;
			while (n < 6) {
				this.box[n].fill(graphics, 4);
				++n;
			}
			n = 0;
			while (n < 2) {
				this.speed_box[n].fill(graphics, 4);
				++n;
			}
			return;
		}
		case 0: {
			graphics.setColor(Color.black);
			this.box[0].fill(graphics, 4);
			this.box[1].fill(graphics, 4);
			graphics.setColor(Color.green);
			graphics.drawString("" + this.wave[0].wavelength,
					this.box[0].right_top.x, this.box[0].y + this.box[0].top.height - 5);
			graphics.drawString("" + this.wave[0].amplitude, this.box[1].right_top.x,
					this.box[1].y + this.box[1].top.height - 5);
			return;
		}
		case 1: {
			graphics.setColor(Color.black);
			this.box[2].fill(graphics, 4);
			graphics.setColor(Color.green);
			graphics.drawString("" + this.wave[0].phase, this.box[2].right_top.x,
					this.box[2].y + this.box[2].top.height - 5);
			return;
		}
		case 2: {
			graphics.setColor(Color.black);
			this.box[3].fill(graphics, 4);
			this.box[4].fill(graphics, 4);
			graphics.setColor(Color.green);
			graphics.drawString("" + this.wave[1].wavelength,
					this.box[3].right_top.x, this.box[3].y + this.box[3].top.height - 5);
			graphics.drawString("" + this.wave[1].amplitude, this.box[4].right_top.x,
					this.box[4].y + this.box[4].top.height - 5);
			return;
		}
		case 3: {
			graphics.setColor(Color.black);
			this.box[5].fill(graphics, 4);
			graphics.setColor(Color.green);
			graphics.drawString("" + this.wave[1].phase, this.box[5].right_top.x,
					this.box[5].y + this.box[5].top.height - 5);
			return;
		}
		case 4: {
			graphics.setColor(Color.black);
			this.speed_box[0].fill(graphics, 4);
			graphics.setColor(Color.green);
			graphics.drawString("" + this.speed_value[0],
					this.speed_box[0].right_top.x, this.speed_box[0].y
							+ this.speed_box[0].top.height - 5);
			return;
		}
		case 5: {
			graphics.setColor(Color.black);
			this.speed_box[1].fill(graphics, 4);
			graphics.setColor(Color.green);
			graphics.drawString("" + this.speed_value[1],
					this.speed_box[1].right_top.x, this.speed_box[1].y
							+ this.speed_box[1].top.height - 5);
			return;
		}
		case 6: {
			graphics.setColor(Color.black);
			int n = 0;
			while (n < 6) {
				this.box[n].fill(graphics, 4);
				++n;
			}
			n = 0;
			while (n < 2) {
				this.speed_box[n].fill(graphics, 4);
				++n;
			}
			graphics.setColor(Color.green);
			graphics.drawString("" + this.wave[0].wavelength,
					this.box[0].right_top.x, this.box[0].y + this.box[0].top.height - 5);
			graphics.drawString("" + this.wave[0].amplitude, this.box[1].right_top.x,
					this.box[1].y + this.box[1].top.height - 5);
			graphics.drawString("" + this.wave[0].phase, this.box[2].right_top.x,
					this.box[2].y + this.box[2].top.height - 5);
			graphics.drawString("" + this.wave[1].wavelength,
					this.box[3].right_top.x, this.box[3].y + this.box[3].top.height - 5);
			graphics.drawString("" + this.wave[1].amplitude, this.box[4].right_top.x,
					this.box[4].y + this.box[4].top.height - 5);
			graphics.drawString("" + this.wave[1].phase, this.box[5].right_top.x,
					this.box[5].y + this.box[5].top.height - 5);
			graphics.drawString("" + this.speed_value[0],
					this.speed_box[0].right_top.x, this.speed_box[0].y
							+ this.speed_box[0].top.height - 5);
			graphics.drawString("" + this.speed_value[1],
					this.speed_box[1].right_top.x, this.speed_box[1].y
							+ this.speed_box[1].top.height - 5);
			return;
		}
		}
	}

	private void drawSeparator(Graphics graphics) {
		graphics.setColor(Color.lightGray);
		graphics.drawLine(this.control.x, this.control.y, this.control.x,
				this.control.y + this.control.height);
	}

	private void drawWaveBox0(Graphics graphics) {
		this.fm = graphics.getFontMetrics(this.title_font);
		String string = "Wave 1";
		Rectangle rectangle = new Rectangle(this.part[0].x + 5,
				this.part[0].y + 10, this.part[0].width - 10, this.part[0].height - 15);
		graphics.setColor(Color.lightGray);
		graphics.drawRoundRect(rectangle.x, rectangle.y, rectangle.width,
				rectangle.height, 20, 20);
		int n = this.fm.stringWidth(string) + 10;
		rectangle = new Rectangle(rectangle.x + (rectangle.width - n) / 2,
				rectangle.y - 10, n, 15);
		graphics.setColor(Color.black);
		graphics.fillRect(rectangle.x, rectangle.y, rectangle.width,
				rectangle.height);
		graphics.setFont(this.title_font);
		graphics.setColor(Color.red);
		graphics.drawString(string,
				rectangle.x + (rectangle.width - this.fm.stringWidth(string)) / 2,
				rectangle.y + rectangle.height);
		this.fm = null;
	}

	private void drawWaveBox1(Graphics graphics) {
		this.fm = graphics.getFontMetrics(this.title_font);
		String string = "Wave 2";
		Rectangle rectangle = new Rectangle(this.part[1].x + 5,
				this.part[1].y + 10, this.part[1].width - 10, this.part[1].height - 15);
		graphics.setColor(Color.lightGray);
		graphics.drawRoundRect(rectangle.x, rectangle.y, rectangle.width,
				rectangle.height, 20, 20);
		int n = this.fm.stringWidth(string) + 10;
		rectangle = new Rectangle(rectangle.x + (rectangle.width - n) / 2,
				rectangle.y - 10, n, 15);
		graphics.setColor(Color.black);
		graphics.fillRect(rectangle.x, rectangle.y, rectangle.width,
				rectangle.height);
		graphics.setFont(this.title_font);
		graphics.setColor(Color.red);
		graphics.drawString(string,
				rectangle.x + (rectangle.width - this.fm.stringWidth(string)) / 2,
				rectangle.y + rectangle.height);
		this.fm = null;
	}

	private void drawAnimBox(Graphics graphics) {
		graphics.setFont(this.title_font);
		this.fm = graphics.getFontMetrics(this.title_font);
		String string = "Animation";
		Rectangle rectangle = new Rectangle(this.part[2].x + 5,
				this.part[2].y + 10, this.part[2].width - 10, this.part[2].height - 15);
		graphics.setColor(Color.lightGray);
		graphics.drawRoundRect(rectangle.x, rectangle.y, rectangle.width,
				rectangle.height, 20, 20);
		int n = this.fm.stringWidth(string) + 10;
		rectangle = new Rectangle(rectangle.x + (rectangle.width - n) / 2,
				rectangle.y - 10, n, 15);
		graphics.setColor(Color.black);
		graphics.fillRect(rectangle.x, rectangle.y, rectangle.width,
				rectangle.height);
		graphics.setColor(Color.red);
		graphics.drawString(string,
				rectangle.x + (rectangle.width - this.fm.stringWidth(string)) / 2,
				rectangle.y + rectangle.height);
		this.fm = null;
	}

	private void setHandles() {
		this.handle = new Handle[4];
		int n = 0;
		while (n < this.handle.length) {
			if (n % 2 == 0) {
				this.handle[n] = new Handle(0);
				this.handle[n].move(this.base[n / 2].x, this.base[n / 2].y
						+ this.base[n / 2].height / 2);
			} else {
				this.handle[n] = new Handle(2);
				this.handle[n].move(this.base[n / 2].x + this.wave[n / 2].wavelength
						/ 4, this.base[n / 2].y + this.base[n / 2].height / 2
						- this.wave[n / 2].amplitude);
			}
			++n;
		}
	}

	private void setComponentPositions() {
		Rectangle rectangle = new Rectangle(this.part[0].x + 10,
				this.part[0].y + 20, this.part[0].width - 20, this.part[0].height - 30);
		int n3 = 0;
		while (n3 < 3) {
			this.box[n3] = new Box(rectangle.x, rectangle.y + n3 * rectangle.height
					/ 3, rectangle.width, rectangle.height / 3);
			this.bar[n3].reshape(this.box[n3].x, this.box[n3].left.y,
					this.box[n3].width, this.box[n3].left.height);
			++n3;
		}
		rectangle = new Rectangle(this.part[1].x + 10, this.part[1].y + 20,
				this.part[1].width - 20, this.part[1].height - 30);
		int n4 = 3;
		while (n4 < 6) {
			this.box[n4] = new Box(rectangle.x, rectangle.y + (n4 - 3)
					* rectangle.height / 3, rectangle.width, rectangle.height / 3);
			this.bar[n4].reshape(this.box[n4].x, this.box[n4].left.y,
					this.box[n4].width, this.box[n4].left.height);
			++n4;
		}
		rectangle = new Rectangle(this.part[2].x + 10, this.part[2].y + 20,
				this.part[2].width - 20, this.part[2].height - 30);
		int n5 = 0;
		while (n5 < this.speed.length) {
			this.speed_box[n5] = new Box(rectangle.x, rectangle.y + n5
					* rectangle.height / 3, rectangle.width, rectangle.height / 3);
			this.speed[n5].reshape(this.speed_box[n5].x, this.speed_box[n5].left.y,
					this.speed_box[n5].width, this.speed_box[n5].left.height);
			++n5;
		}

		this.button.reshape(rectangle.x + 20, rectangle.y + 2 * rectangle.height
				/ 3 + 3, rectangle.width - 40, rectangle.height / 3 - 6);
	}


	private void defineLayout() {
		if (this.getWidth() == width && this.getHeight() == height)
			return;
		width = getWidth();
		height = getHeight();
		this.offg = null;
		this.border = new Rectangle(5, 5, this.size().width - 10,
				this.size().height - 10);
		this.graph = new Rectangle(this.border.x + 5, this.border.y + 5,
				this.border.width - 150, this.border.height - 10);
		this.clip = new Rectangle(this.graph.x + 50, this.graph.y + 2,
				this.graph.width - 60, this.graph.height - 4);
		this.control = new Rectangle(this.graph.x + this.graph.width + 5,
				this.border.y + 5, 138, this.border.y + this.border.height - 15);
		this.space = new Rectangle[3];
		this.space[0] = new Rectangle(this.clip.x, this.clip.y, this.clip.width,
				this.clip.height / 4);
		this.space[1] = new Rectangle(this.clip.x, this.clip.y + this.clip.height
				/ 4, this.clip.width, this.clip.height / 4);
		this.space[2] = new Rectangle(this.clip.x, this.clip.y + this.clip.height
				/ 2, this.clip.width, this.clip.height / 2);
		this.base = new Rectangle[3];
		this.base[0] = new Rectangle(10, (this.space[0].height - 90) / 2,
				this.space[0].width - 20, 90);
		this.base[1] = new Rectangle(10, (this.space[1].height - 90) / 2,
				this.space[1].width - 20, 90);
		this.base[2] = new Rectangle(10, (this.space[2].height - 180) / 2,
				this.space[2].width - 20, 180);
		this.part = new Rectangle[3];
		this.part[0] = new Rectangle(this.control.x, this.control.y,
				this.control.width, this.control.height * 7 / 20);
		this.part[1] = new Rectangle(this.control.x, this.part[0].y
				+ this.part[0].height, this.control.width, this.control.height * 7 / 20);
		this.part[2] = new Rectangle(this.control.x, this.part[1].y
				+ this.part[1].height, this.control.width, this.control.height * 6 / 20);
		setComponentPositions();
		this.setHandles();
	}
}

// Clazz.startProfiling(10,true)
// "use Clazz.getProfile() to show results"
// total wall time: 10 sec
//
// count prep(ms) exec(ms)
// -------- -------- --------
// ....140025 ......2069 .....27296
// -------- -------- --------
// ....124542 ......1797 ......1079 java.awt.Point construct
// ......2719 ........46 ........76 java.awt.Rectangle construct
// ......2719 ........24 ........22 java.awt.geom.Rectangle2D construct
// ......1530 ........38 .........5 java.awt.BasicStroke construct
// ......1428 ........20 ........17 java.util.HashMap construct
// ......1326 ........16 .......897 swingjs.JSGraphics2D create
// .......748 ........17 ........80 swingjs.JSGraphics2D drawString
// .......408 .........9 .........0 swingjs.plaf.JSComponentUI paint
// .......272 ........15 ........84 edu.stonybrook.eserc.projectjava.waveinteraction.Box construct
// .......272 .........3 .........3 java.awt.Polygon construct
// .......204 .........5 .......169 java.awt.image.Raster createPackedRaster
// .......204 .........3 .........3 sun.awt.image.SunWritableRaster stealData
// .......204 .........2 .........0 sun.awt.image.SunWritableRaster$1 getData
// .......136 .........3 ........48 edu.stonybrook.eserc.projectjava.waveinteraction.Interaction drawGraphPaper
// .......136 .........1 ........22 edu.stonybrook.eserc.projectjava.waveinteraction.Handle construct
// .......134 .........2 .........4 java.lang.Thread init
// .......102 .........2 .......111 swingjs.JSImage construct
// .......102 .........2 ........68 swingjs.JSGraphics2D drawImage
// .......102 .........2 ........33 swingjs.JSGraphics2D construct
// .......102 .........2 .........4 java.awt.image.DataBuffer construct
// .......102 .........2 .........3 java.awt.image.SinglePixelPackedSampleModel
// construct
// .......102 .........2 .........0 swingjs.JSGraphics2D getFontMetrics
// .......102 .........1 .......121 java.awt.Component createImage
// .......102 .........1 .......119 swingjs.JSToolkit createImage
// .......102 .........1 .......108 java.awt.image.BufferedImage construct
// .......102 .........1 ........25 java.awt.image.DataBufferInt construct
// .......102 .........1 ........10 sun.awt.image.IntegerInterleavedRaster
// construct
// .......102 .........1 .........7 sun.awt.image.IntegerComponentRaster
// construct
// .......102 .........1 .........5 sun.awt.image.SunWritableRaster construct
// .......102 .........1 .........2 java.awt.image.WritableRaster construct
// .......102 .........1 .........1 java.awt.Graphics2D construct
// .......102 .........1 .........1 java.awt.Dimension construct
// .......102 .........0 .........0 java.awt.image.Raster construct
// .......101 .........1 .........1 JU.Lst construct
// .......100 .........2 .........1 java.awt.AWTEvent construct
// ........68 .........1 ......4749 edu.stonybrook.eserc.projectjava.waveinteraction.SineWave draw
// ........67 .........3 .........4 java.awt.event.InvocationEvent construct
// ........67 .........2 ........15 java.awt.EventDispatchThread construct
// ........67 .........1 .........6 JU.JSThread construct
// ........67 .........1 .........4 java.lang.Thread construct
// ........67 .........1 .........2 java.util.HashMap.Entry construct
// ........67 .........1 .........0 java.util.MapEntry construct
// ........67 .........1 .........0 java.awt.EventQueue noEvents
// ........67 .........0 .........1 JU.JSThread start
// ........66 .........1 ........80 javax.swing.JApplet repaint
// ........66 .........1 ........57 javax.swing.RepaintManager
// scheduleProcessingRunnable
// ........34 .........1 ......2329 edu.stonybrook.eserc.projectjava.waveinteraction.SumWaves draw
// ........34 .........0 ......8894 javax.swing.JLayeredPane paint
// ........34 .........0 ......7892 a2s.Applet$1 paintComponent
// ........34 .........0 ........40 edu.stonybrook.eserc.projectjava.waveinteraction.Interaction setHandles
// ........34 .........0 ........30 javax.swing.JApplet getGraphics
// ........34 .........0 .........2 java.util.IdentityHashMap getEntry
// ........34 .........0 .........0 javax.swing.AbstractButton paintBorder
// ........34 .........0 .........0
// java.util.IdentityHashMap.IdentityHashMapEntry construct
// ........34 .........0 .........0 java.awt.Rectangle setBounds
// ........33 .........1 ........36 javax.swing.RepaintManager addDirtyRegion
// ........33 .........1 .........2 java.awt.event.ActionEvent construct
//
// Total new objects: 152107
//
// count exec(ms)
// -------- -------- ------------------------------
// ........68 .........2 java.awt.EventDispatchThread.HierarchyEventFilter
// .......135 .........2 java.awt.EventDispatchThread$1
// ........67 ........10 java.awt.event.InvocationEvent
// .......101 .........5 JU.Lst
// ........67 ........19 java.awt.EventDispatchThread
// ........67 .........6 java.util.HashMap.Entry
// ........67 .........0 java.awt.EventQueueItem
// ........34 .........0 java.util.IdentityHashMap$1$1
// ........34 .........0 java.util.IdentityHashMap.IdentityHashMapIterator
// ........34 .........1 java.util.IdentityHashMap.IdentityHashMapEntry
// ......2244 ........34 java.util.Hashtable
// ......2142 ........20 Float
// .....10302 ........90 java.util.HashtableEntry
// ......1326 .........9 java.awt.Graphics
// ......1428 ........15 java.awt.geom.AffineTransform
// ......1428 ........59 java.util.HashMap
// ......1428 .......103 java.awt.RenderingHints
// ......1326 ........10 java.util.AbstractMap
// ......1428 ........59 java.awt.BasicStroke
// ......2311 .......141 java.awt.Rectangle
// .......102 .........4 java.awt.Dimension
// .......272 .......104 edu.stonybrook.eserc.projectjava.waveinteraction.Box
// .......272 .........9 java.awt.Polygon
// .......136 ........27 edu.stonybrook.eserc.projectjava.waveinteraction.Handle
// .......102 .........0 sun.java2d.StateTrackableDelegate
// .......102 ........29 java.awt.image.DataBufferInt
// ....124542 ......4444 java.awt.Point
// .......102 .........8 java.awt.image.SinglePixelPackedSampleModel
// .......102 ........18 sun.awt.image.IntegerInterleavedRaster
// .......102 .......116 swingjs.JSImage
// .......102 ........38 swingjs.JSGraphics2D
// ........68 .........1 java.awt.Color
// ........33 .........6 java.awt.event.ActionEvent
// ........33 .........0 javax.swing.Timer$1
// ....152107 ......5405

