package com.falstad;

//StringWave.java (C) 2001 by Paul Falstad, www.falstad.com
//
//web_Ready
//web_AppletName= StringWave
//web_Description= A simulation that demonstrates standing waves on a vibrating string (a loaded string, to be precise).
//web_JavaVersion= http://www.falstad.com/loadedstring/
//web_AppletImage= stringwave.png
//web_Category= Physics - Waves
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= audio, graphics, AWT-to-Swing

//
//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> a2s
//
//import java.awt [Applet, Button, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
// change paint() to paintComponent() in StringWaveCanvas and StringWaveFrame
//
// FFT and PlayThread moved into frame as inner classes to avoid conflict with other apps
//
//Added Container main
//
//Changed add() to main.add()
//
//resize and show --> useFrame options
//
//added triggerShow()
//
//added paint() to applet class
//
// called showFrame() in stringWave.init()

// BH SwingJS: There is a problem with loading inner classes by
// reflection using Outer$Inner.

// BH (new byte[] b).getClass  is not defined.

// BH line.flush(); // necessary in JavaScript, not in Java
//
// BH better action of [x] sound checkbox. 

import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Insets;
import java.awt.ItemSelectable;
import java.awt.LayoutManager;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.Random;

import javax.sound.sampled.AudioFormat;

import java.applet.Applet;
import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.Choice;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Scrollbar;
import javajs.util.JSAudioThread;

public class StringWave extends Applet implements ComponentListener {

	static StringWaveFrame ogf;

	void destroyFrame() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}

	boolean started = false;

	@Override
	public void init() {
		// addComponentListener(this);
		showFrame();
	}

	public static void main(String args[]) {
		ogf = new StringWaveFrame(null);
		ogf.init();
	}

	void showFrame() {
		if (ogf == null) {
			started = true;
			ogf = new StringWaveFrame(this);
			ogf.init();
			repaint();
		}
	}

	@Override
	public void paint(Graphics g) {
		super.paint(g);
		String s = "Applet is open in a separate window.";
		if (!started)
			s = "Applet is starting.";
		else if (ogf == null)
			s = "Applet is finished.";
		else if (ogf.useFrame)
			ogf.triggerShow();
		if(ogf == null || ogf.useFrame)
			g.drawString(s, 10, 30);
	}

	@Override
	public void componentHidden(ComponentEvent e) {
	}

	@Override
	public void componentMoved(ComponentEvent e) {
	}

	@Override
	public void componentShown(ComponentEvent e) {
		showFrame();
	}

	@Override
	public void componentResized(ComponentEvent e) {
	}

	@Override
	public void destroy() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}
};

class StringWaveFrame extends Frame implements ComponentListener,
		ActionListener, AdjustmentListener, MouseMotionListener, MouseListener,
		ItemListener, JSAudioThread.Owner {

	boolean isJava = true;

	Dimension winSize;
	Image dbimage;

	Random random;
	int maxTerms = 60;
	int maxMaxTerms = 160;

	int sampleCount;

	double sinTable[][];
	public static final double epsilon = .00001;
	public static final double epsilon2 = .003;

	public String getAppletInfo() {
		return "StringWave Series by Paul Falstad";
	}

	Button fundamentalButton;
	Button centerPluckButton;
	Button clearButton;
	Button resonanceButton;
	Checkbox stoppedCheck;
	Checkbox forceCheck;
	Checkbox soundCheck;
	Checkbox touchCheck;
	Checkbox backwardsCheck;
	Checkbox logCheck;
	Choice modeChooser;
	Choice displayChooser;
	Scrollbar dampingBar;
	Scrollbar speedBar;
	Scrollbar forceBar;
	Scrollbar loadBar;
	Scrollbar tensionBar;
	double magcoef[];
	double dampcoef;
	double phasecoef[];
	double phasecoefcos[];
	double phasecoefadj[];
	// double magcoefdisp[];
	// double phasecoefdisp[];
	// double phasecoefcosdisp[];
	double forcebasiscoef[];
	double omega[];
	static final double pi = 3.14159265358979323846;
	double step;
	double func[];
	double funci[];
	int selectedCoef;
	int magnitudesY;
	static final int SEL_NONE = 0;
	static final int SEL_FUNC = 1;
	static final int SEL_MAG = 2;
	static final int MODE_PLUCK = 0;
	static final int MODE_SHAPE = 1;
	static final int MODE_TOUCH = 997;
	static final int MODE_FORCE = 998;
	static final int MODE_BOW = 999;
	static final int DISP_PHASE = 0;
	static final int DISP_LEFTRIGHT = 1;
	static final int DISP_PHASECOS = 2;
	static final int DISP_PHASORS = 3;
	static final int DISP_MODES = 4;
	int selection;
	int dragX, dragY;
	boolean dragging;
	boolean bowing;
	boolean bowCaught;
	boolean forceApplied;
	double t;
	double forceMag;
	int pause;
	int forceBarValue;
	double forceTimeZero;
	int tensionBarValue;
	Color gray1 = new Color(76, 76, 76);
	Color gray2 = new Color(127, 127, 127);
	public boolean useFrame;
	boolean showControls;

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	StringWaveCanvas cv;
	StringWave applet;
	boolean java2;

	StringWaveFrame(StringWave a) {
		super("Loaded String Applet v1.5a");
		applet = a;
		useFrame = true;
		showControls = true;
		/**
		 * @j2sNative
		 * 
		 *            isJava = false;
		 */
		{
			isJava = true;
		}
	}

	Container main;

	public void init() {
		try {
			if (applet != null) {
				String param = applet.getParameter("useFrame");
				if (param != null && param.equalsIgnoreCase("false"))
					useFrame = false;
				param = applet.getParameter("showControls");
				if (param != null && param.equalsIgnoreCase("false"))
					showControls = false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (useFrame)
			main = this;
		else
			main = applet;
		String jv = System.getProperty("java.class.version");
		double jvf = new Double(jv).doubleValue();
		if (jvf >= 48)
			java2 = true;

		selectedCoef = -1;
		main.setLayout(new StringWaveLayout());
		cv = new StringWaveCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		main.add(cv);
		main.add(fundamentalButton = new Button("Fundamental"));
		fundamentalButton.addActionListener(this);
		main.add(centerPluckButton = new Button("Center Pluck"));
		centerPluckButton.addActionListener(this);
		main.add(clearButton = new Button("Clear"));
		clearButton.addActionListener(this);
		stoppedCheck = new Checkbox("Stopped");
		stoppedCheck.addItemListener(this);
		main.add(stoppedCheck);
		forceCheck = new Checkbox("Driving Force", false);
		forceCheck.addItemListener(this);
		main.add(forceCheck);
		soundCheck = new Checkbox("Sound", false);
		soundCheck.addItemListener(this);
		if (java2)
			main.add(soundCheck);
		touchCheck = new Checkbox("Touched in Center", false);
		touchCheck.addItemListener(this);
		/* add(touchCheck); */
		backwardsCheck = new Checkbox("Run Backwards", false);
		backwardsCheck.addItemListener(this);
		// add(backwardsCheck);
		logCheck = new Checkbox("Log View", false);
		logCheck.addItemListener(this);
		main.add(logCheck);

		modeChooser = new Choice();
		modeChooser.add("Mouse = Pluck string");
		modeChooser.add("Mouse = Shape string");
		/*
		 * modeChooser.add("Mouse = Touch string");
		 * modeChooser.add("Mouse = Apply force");
		 */
		modeChooser.addItemListener(this);
		main.add(modeChooser);

		displayChooser = new Choice();
		displayChooser.add("Display Phases");
		displayChooser.add("Display Left+Right");
		displayChooser.add("Display Phase Cosines");
		displayChooser.add("Display Phasors");
		displayChooser.add("Display Modes");
		displayChooser.addItemListener(this);
		main.add(displayChooser);

		main.add(new Label("Simulation Speed", Label.CENTER));
		main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 85, 1, 1, 200));
		speedBar.addAdjustmentListener(this);

		main.add(new Label("Damping", Label.CENTER));
		main.add(dampingBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 400));
		dampingBar.addAdjustmentListener(this);

		main.add(new Label("Force Frequency", Label.CENTER));
		forceBarValue = 5;
		main.add(forceBar = new Scrollbar(Scrollbar.HORIZONTAL, forceBarValue, 1,
				1, 30));
		forceBar.addAdjustmentListener(this);

		main.add(resonanceButton = new Button("Resonance Freq"));
		resonanceButton.addActionListener(this);

		main.add(new Label("Number of Loads", Label.CENTER));
		main.add(loadBar = new Scrollbar(Scrollbar.HORIZONTAL, maxTerms, 1, 2,
				maxMaxTerms));
		loadBar.addAdjustmentListener(this);
		setLoadCount();

		tensionBarValue = 16;
		main.add(new Label("Tension", Label.CENTER));
		main.add(tensionBar = new Scrollbar(Scrollbar.HORIZONTAL, tensionBarValue,
				1, 1, 100));
		tensionBar.addAdjustmentListener(this);

		try {
			String param = applet.getParameter("PAUSE");
			if (param != null)
				pause = Integer.parseInt(param);
		} catch (Exception e) {
		}

		magcoef = new double[maxMaxTerms];
		phasecoef = new double[maxMaxTerms];
		phasecoefcos = new double[maxMaxTerms];
		phasecoefadj = new double[maxMaxTerms];
		// magcoefdisp = new double[maxMaxTerms];
		// phasecoefdisp = new double[maxMaxTerms];
		// phasecoefcosdisp = new double[maxMaxTerms];
		forcebasiscoef = new double[maxMaxTerms];
		func = new double[maxMaxTerms + 1];
		funci = new double[maxMaxTerms + 1];

		random = new Random();
		setDamping();
		reinit();
		cv.setBackground(Color.black);
		cv.setForeground(Color.lightGray);
		// resize(800, 600);
		// handleResize();
		// Dimension x = getSize();
		// Dimension screen = getToolkit().getScreenSize();
		// setLocation((screen.width - x.width)/2,
		// (screen.height - x.height)/2);
		// show();
		if (useFrame) {
			setSize(800, 640);
			handleResize();
			Dimension x = getSize();
			Dimension screen = getToolkit().getScreenSize();
			setLocation((screen.width - x.width) / 2, (screen.height - x.height) / 2);
			setVisible(true);
		} else {
			setVisible(false);
			handleResize();
			applet.validate();
		}
	}

	void reinit() {
		doSine();
	}

	void handleResize() {
		Dimension d = winSize = cv.getSize();
		if (winSize.width == 0)
			return;
		dbimage = createImage(d.width, d.height);
	}

	boolean shown = false;

	public void triggerShow() {
		if (!shown)
			setVisible(true);
		shown = true;
	}

	void doSine() {
		int x;
		for (x = 0; x != sampleCount; x++) {
			func[x] = java.lang.Math.sin(x * step);
		}
		func[sampleCount] = func[0];
		transform(true);
	}

	void doTriangle() {
		int x;
		for (x = 0; x <= sampleCount / 2; x++)
			func[sampleCount - x] = func[x] = 2.0 * x / sampleCount;
		func[sampleCount] = func[0];
		transform(true);
	}

	void doBlank() {
		int x;
		for (x = 0; x <= sampleCount; x++)
			func[x] = 0;
		transform(true);
	}

	void transform(boolean novel) {
		int x, y;
		t = 0;
		for (y = 1; y != maxTerms; y++) {
			double a = 0;
			double b = 0;
			for (x = 1; x != sampleCount; x++) {
				a += sinTable[x][y] * func[x];
				b -= sinTable[x][y] * funci[x];
			}
			a *= 2.0 / sampleCount;
			b *= 2.0 / (sampleCount * omega[y]);
			if (a < epsilon && a > -epsilon)
				a = 0;
			if (b < epsilon && b > -epsilon)
				b = 0;
			if (novel)
				b = 0;
			double r = java.lang.Math.sqrt(a * a + b * b);
			magcoef[y] = r;
			double ph2 = java.lang.Math.atan2(b, a);
			phasecoefadj[y] = ph2;
			phasecoef[y] = ph2;
		}
		updateSound();
	}

	int getPanelHeight() {
		return winSize.height / 3;
	}

	void centerString(Graphics g, String s, int y) {
		FontMetrics fm = g.getFontMetrics();
		g.drawString(s, (winSize.width - fm.stringWidth(s)) / 2, y);
	}

//	public void paintComponent(Graphics g) {
//		cv.repaint();
//	}

	long lastTime;

	public void updateStringWave(Graphics realg) {
		if (winSize == null || winSize.width == 0)
			return;
		Graphics g = dbimage.getGraphics();
		boolean allQuiet = true;
		double dampmult = 1;
		if (!stoppedCheck.getState()) {
			if (bowing) {
				doBow();
				allQuiet = false;
			}
			int val = speedBar.getValue();
			// if (val > 40)
			// val += getrand(10);
			if (forceCheck.getState()) {
				doForce();
				allQuiet = false;
			} else
				forceMag = 0;
			long sysTime = System.currentTimeMillis();
			double tadd = 0;
			if (lastTime != 0)
				tadd = java.lang.Math.exp(val / 20.) * (.1 / 1500)
						* (sysTime - lastTime);
			if (backwardsCheck.getState())
				t -= tadd;
			else
				t += tadd;
			lastTime = sysTime;
			dampmult = Math.exp(dampcoef * tadd);
		} else
			lastTime = 0;
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());
		int i;
		int ox = -1, oy = -1;
		int panelHeight = getPanelHeight();
		int midy = panelHeight / 2;
		int halfPanel = panelHeight / 2;
		double ymult = .75 * halfPanel;
		for (i = -1; i <= 1; i++) {
			g.setColor((i == 0) ? gray2 : gray1);
			g.drawLine(0, midy + (i * (int) ymult), winSize.width, midy
					+ (i * (int) ymult));
		}
		g.setColor(gray2);
		g.drawLine(winSize.width / 2, midy - (int) ymult, winSize.width / 2, midy
				+ (int) ymult);
		if (dragging && selection == SEL_FUNC) {
			g.setColor(Color.cyan);
			allQuiet = true;
			for (i = 0; i != sampleCount + 1; i++) {
				int x = winSize.width * i / sampleCount;
				int y = midy - (int) (ymult * func[i]);
				if (ox != -1)
					g.drawLine(ox, oy, x, y);
				ox = x;
				oy = y;
			}
		}
		if (!stoppedCheck.getState()) {
			if (touchCheck.getState())
				doTouch();
			for (i = 1; i != maxTerms; i++)
				magcoef[i] *= dampmult;
		}

		double magcoefdisp[] = magcoef;
		double phasecoefdisp[] = phasecoef;
		double phasecoefcosdisp[] = phasecoefcos;

		if (dragging && selection == SEL_FUNC) {
			lastTime = 0;
		} else {
			g.setColor(Color.white);
			ox = -1;
			int j;
			for (j = 1; j != maxTerms; j++) {
				if (magcoef[j] < epsilon && magcoef[j] > -epsilon) {
					magcoef[j] = phasecoef[j] = phasecoefadj[j] = 0;
					continue;
				}
				allQuiet = false;
				phasecoef[j] = (omega[j] * t + phasecoefadj[j]) % (2 * pi);
				if (phasecoef[j] > pi)
					phasecoef[j] -= 2 * pi;
				else if (phasecoef[j] < -pi)
					phasecoef[j] += 2 * pi;
				phasecoefcos[j] = java.lang.Math.cos(phasecoef[j]);
			}
			if (forceApplied) {
				allQuiet = false;
				magcoefdisp = new double[maxTerms];
				phasecoefdisp = new double[maxTerms];
				phasecoefcosdisp = new double[maxTerms];
				for (i = 1; i < maxTerms; i++) {
					double ph = phasecoef[i];
					double a = magcoef[i] * phasecoefcos[i];
					double b = magcoef[i] * java.lang.Math.sin(ph);
					a += forcebasiscoef[i];
					double r = java.lang.Math.sqrt(a * a + b * b);
					magcoefdisp[i] = r;
					double ph2 = java.lang.Math.atan2(b, a);
					phasecoefdisp[i] += ph2;
					phasecoefcosdisp[i] = (r > 0) ? a / r : 0;
				}
			}

			int dotSize = (sampleCount < 40) ? 5 : 0;
			int funcDotSize = dotSize;
			int forcePos = (forceMag == 0) ? -1 : sampleCount / 2;
			for (i = 0; i != sampleCount + 1; i++) {
				int x = winSize.width * i / sampleCount;
				double dy = 0;
				for (j = 1; j != maxTerms; j++)
					dy += magcoefdisp[j] * sinTable[i][j] * phasecoefcosdisp[j];
				func[i] = dy;
				int y = midy - (int) (ymult * dy);
				if (ox != -1)
					g.drawLine(ox, oy, x, y);
				if (dotSize > 0 && i != 0 && i != sampleCount)
					g.fillOval(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
				if (i == forcePos) {
					int yl = (int) (ymult * forceMag * 8);
					if (yl > 7 || yl < -7) {
						int y2 = y - yl;
						int forcedir = (forceMag < 0) ? -1 : 1;
						g.drawLine(x, y, x, y2);
						g.drawLine(x, y2, x + 5, y2 + 5 * forcedir);
						g.drawLine(x, y2, x - 5, y2 + 5 * forcedir);
					}
				}
				ox = x;
				oy = y;
			}
		}
		if (selectedCoef != -1
				&& !dragging
				&& (magcoefdisp[selectedCoef] > .04 || magcoefdisp[selectedCoef] < -.04)) {
			g.setColor(Color.yellow);
			ox = -1;
			ymult *= magcoefdisp[selectedCoef];
			for (i = 0; i != sampleCount + 1; i++) {
				int x = winSize.width * i / sampleCount;
				double dy = sinTable[i][selectedCoef] * phasecoefcosdisp[selectedCoef];
				int y = midy - (int) (ymult * dy);
				if (ox != -1)
					g.drawLine(ox, oy, x, y);
				ox = x;
				oy = y;
			}
		}
		int termWidth = getTermWidth();
		ymult = .6 * halfPanel;
		g.setColor(Color.white);
		if (displayChooser.getSelectedIndex() == DISP_PHASE
				|| displayChooser.getSelectedIndex() == DISP_PHASECOS)
			magnitudesY = panelHeight;
		else
			magnitudesY = panelHeight * 2;
		midy = magnitudesY + (panelHeight / 2) + (int) ymult / 2;
		centerString(g, "Harmonics: Magnitudes", magnitudesY
				+ (int) (panelHeight * .16));
		g.setColor(gray2);
		g.drawLine(0, midy, winSize.width, midy);
		g.setColor(gray1);
		g.drawLine(0, midy - (int) ymult, winSize.width, midy - (int) ymult);
		g.drawLine(0, midy + (int) ymult, winSize.width, midy + (int) ymult);
		int dotSize = termWidth - 3;
		if (dotSize < 3)
			dotSize = 3;
		if (dotSize > 9)
			dotSize = 9;
		for (i = 1; i != maxTerms; i++) {
			int t = termWidth * (i - 1) + termWidth / 2;
			int y = midy - (int) (logcoef(magcoefdisp[i]) * ymult);
			g.setColor(i == selectedCoef ? Color.yellow : Color.white);
			g.drawLine(t, midy, t, y);
			g.fillOval(t - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
		}

		if (displayChooser.getSelectedIndex() == DISP_PHASE
				|| displayChooser.getSelectedIndex() == DISP_PHASECOS) {
			g.setColor(Color.white);
			boolean cosines = displayChooser.getSelectedIndex() == DISP_PHASECOS;
			centerString(g, cosines ? "Harmonics: Phase Cosines"
					: "Harmonics: Phases", (int) (panelHeight * 2.10));
			ymult = .75 * halfPanel;
			midy = ((panelHeight * 5) / 2);
			for (i = -2; i <= 2; i++) {
				if (cosines && (i == 1 || i == -1))
					continue;
				g.setColor((i == 0) ? gray2 : gray1);
				g.drawLine(0, midy + (i * (int) ymult) / 2, winSize.width, midy
						+ (i * (int) ymult) / 2);
			}
			if (!cosines)
				ymult /= pi;
			for (i = 1; i != maxTerms; i++) {
				int t = termWidth * (i - 1) + termWidth / 2;
				double ph = (cosines) ? phasecoefcosdisp[i] : phasecoefdisp[i];
				if (magcoef[i] > -epsilon2 / 4 && magcoefdisp[i] < epsilon2 / 4)
					ph = 0;
				int y = midy - (int) (ph * ymult);
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				g.drawLine(t, midy, t, y);
				g.fillOval(t - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
			}
		} else if (displayChooser.getSelectedIndex() == DISP_LEFTRIGHT) {
			midy = panelHeight + panelHeight / 2;
			halfPanel = panelHeight / 2;
			ymult = .75 * halfPanel;
			for (i = -1; i <= 1; i++) {
				g.setColor((i == 0) ? gray2 : gray1);
				g.drawLine(0, midy + (i * (int) ymult), winSize.width, midy
						+ (i * (int) ymult));
			}
			g.setColor(gray2);
			g.drawLine(winSize.width / 2, midy - (int) ymult, winSize.width / 2, midy
					+ (int) ymult);
			ox = -1;
			int oy2 = -1;
			int subsamples = 4;
			for (i = 0; i != sampleCount * subsamples + 1; i++) {
				int x = winSize.width * i / (subsamples * sampleCount);
				double dy1 = 0;
				double dy2 = 0;
				int j;
				double stepi = step * i / subsamples;
				for (j = 1; j != maxTerms; j++) {
					if (magcoefdisp[j] == 0)
						continue;
					double stepij = stepi * j;
					double dp = magcoefdisp[j] * .5;
					double phase = phasecoefdisp[j];
					dy1 += dp * java.lang.Math.sin(stepij + phase);
					dy2 += dp * java.lang.Math.sin(stepij - phase);
				}
				int y1 = midy - (int) (ymult * dy1);
				int y2 = midy - (int) (ymult * dy2);
				if (ox != -1) {
					g.setColor(Color.cyan);
					g.drawLine(ox, oy, x, y1);
					g.setColor(Color.green);
					g.drawLine(ox, oy2, x, y2);
				}
				ox = x;
				oy = y1;
				oy2 = y2;
			}
		} else if (displayChooser.getSelectedIndex() == DISP_PHASORS) {
			int sqw = (winSize.width - 25) / 3;
			int sqh = sqw;
			int y = panelHeight + (panelHeight - sqh) / 2;
			dotSize = 5;
			for (i = 1; i <= 3; i++) {
				g.setColor(gray2);
				int leftX = (sqw + 10) * (i - 1);
				int centerX = leftX + sqw / 2;
				int centerY = y + sqh / 2;
				g.drawLine(leftX, centerY, leftX + sqw, centerY);
				g.drawLine(centerX, y, centerX, y + sqh);
				g.setColor(gray1);
				g.drawOval(centerX - sqw / 2, centerY - sqh / 2, sqw, sqh);
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				g.drawRect(leftX, y, sqw, sqh);
				boolean getFx = (forceApplied || forceCheck.getState());
				int ax = (int) (phasecoefcosdisp[i] * magcoefdisp[i] * sqw * .5);
				int ay = (int) (java.lang.Math.sin(phasecoefdisp[i]) * magcoefdisp[i]
						* sqh * .5);
				int fx = (getFx) ? ((int) (forcebasiscoef[i] * sqw * .5)) : 0;
				g.drawLine(centerX + fx, centerY, centerX + ax, centerY - ay);
				g.fillOval(centerX + ax - dotSize / 2, centerY - ay - dotSize / 2,
						dotSize, dotSize);
			}
		} else if (displayChooser.getSelectedIndex() == DISP_MODES) {
			int sqw = (winSize.width - 25) / 3;
			int sqh = (int) (sqw / pi);
			int topY = panelHeight;
			int leftX = 0;
			for (i = 1; i < sampleCount; i++) {
				if (!(magcoefdisp[i] > .06 || magcoefdisp[i] < -.06))
					continue;
				g.setColor(gray2);
				int centerX = leftX + sqw / 2;
				int centerY = topY + sqh / 2;
				g.drawLine(leftX, centerY, leftX + sqw, centerY);
				g.drawLine(centerX, topY, centerX, topY + sqh);
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				g.drawRect(leftX, topY, sqw, sqh);
				ox = -1;
				ymult = sqh * .5 * magcoefdisp[i];
				int j;
				for (j = 0; j != sampleCount + 1; j++) {
					int x = leftX + sqw * j / sampleCount;
					double dy = sinTable[j][i] * phasecoefcosdisp[i];
					int y = centerY - (int) (ymult * dy);
					if (ox != -1)
						g.drawLine(ox, oy, x, y);
					ox = x;
					oy = y;
				}
				leftX += sqw + 10;
				if (leftX + sqw > winSize.width) {
					leftX = 0;
					topY += sqh + 10;
					if (topY + sqh > panelHeight * 2)
						break;
				}
			}
		}
		realg.drawImage(dbimage, 0, 0, this);
		if (!stoppedCheck.getState() && !allQuiet)
			cv.repaint(pause);
	}

	int getTermWidth() {
		int termWidth = winSize.width / maxTerms;
		if (termWidth < 2)
			termWidth = 2;
		int maxTermWidth = winSize.width / 30;
		if (termWidth > maxTermWidth)
			termWidth = maxTermWidth;
		termWidth &= ~1;
		return termWidth;
	}

	void getVelocities() {
		int k, j;
		for (j = 0; j != sampleCount; j++) {
			double dy = 0;
			for (k = 0; k != sampleCount; k++)
				dy += magcoef[k] * sinTable[j][k] * java.lang.Math.sin(phasecoef[k])
						* omega[k];
			funci[j] = -dy;
		}
	}

	void setForce() {
		// adjust time zero to maintain continuity in the force func
		// even though the frequency has changed.
		double oldfreq = forceBarValue * omega[1] / 20.0;
		forceBarValue = forceBar.getValue();
		double newfreq = forceBarValue * omega[1] / 20.0;
		double adj = newfreq - oldfreq;
		forceTimeZero = t - oldfreq * (t - forceTimeZero) / newfreq;
	}

	void doForce() {
		double freq = forceBar.getValue() * omega[1] / 20.0;
		// was .01
		forceMag = java.lang.Math.cos((t - forceTimeZero) * freq) * .06;
		if (forceBar.getValue() == 1)
			forceMag *= 2;
		applyForce(maxTerms / 2, forceMag);
	}

	void doTouch() {
		int x = sampleCount / 2;
		double lim = .1;
		double val = func[x];
		double force = 0;
		if (val > lim)
			force = -(val - lim);
		else if (val < -lim)
			force = -(val + lim);
		else
			return;
		int y;
		for (y = 1; y != maxTerms; y++) {
			double coef = 0;
			for (int j = 1; j != sampleCount; j++) {
				double f = (j <= x) ? force * j / x : force * (sampleCount - j)
						/ (sampleCount - x);
				coef += sinTable[j][y] * f;
			}
			coef *= 2.0 / sampleCount;

			double ph = phasecoefadj[y] + omega[y] * t; // XXX change elsewhere
			// / XXX outside loop, elsewhere too
			double a = magcoef[y] * java.lang.Math.cos(ph);
			double b = magcoef[y] * java.lang.Math.sin(ph);
			a += coef;
			double r = java.lang.Math.sqrt(a * a + b * b);
			magcoef[y] = r;
			double ph2 = java.lang.Math.atan2(b, a);
			phasecoefadj[y] += ph2 - ph;
		}
	}

	void edit(MouseEvent e) {
		resetAudio();
		if (selection == SEL_NONE)
			return;
		int x = e.getX();
		int y = e.getY();
		switch (selection) {
		case SEL_MAG:
			editMag(x, y);
			break;
		case SEL_FUNC:
			editFunc(x, y);
			break;
		}
	}

	void editMag(int x, int y) {
		if (selectedCoef == -1)
			return;
		int panelHeight = getPanelHeight();
		double ymult = .6 * panelHeight / 2;
		double midy = magnitudesY + (panelHeight / 2) + (int) ymult / 2;
		double coef = -(y - midy) / ymult;
		coef = unlogcoef(coef);
		if (coef < -1)
			coef = -1;
		if (coef > 1)
			coef = 1;
		if (magcoef[selectedCoef] == coef)
			return;
		magcoef[selectedCoef] = coef;
		updateSound();
		cv.repaint(pause);
	}

	void editFunc(int x, int y) {
		if (modeChooser.getSelectedIndex() == MODE_PLUCK) {
			editFuncPluck(x, y);
			return;
		}
		if (modeChooser.getSelectedIndex() == MODE_TOUCH) {
			editFuncTouch(x, y);
			return;
		}
		if (modeChooser.getSelectedIndex() == MODE_BOW) {
			editFuncBow(x, y);
			return;
		}
		if (modeChooser.getSelectedIndex() == MODE_FORCE) {
			forceCheck.setState(false);
			editFuncForce(x, y);
			return;
		}
		if (dragX == x) {
			editFuncPoint(x, y);
			dragY = y;
		} else {
			// need to draw a line from old x,y to new x,y and
			// call editFuncPoint for each point on that line. yuck.
			int x1 = (x < dragX) ? x : dragX;
			int y1 = (x < dragX) ? y : dragY;
			int x2 = (x > dragX) ? x : dragX;
			int y2 = (x > dragX) ? y : dragY;
			dragX = x;
			dragY = y;
			for (x = x1; x <= x2; x++) {
				y = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
				editFuncPoint(x, y);
			}
		}
	}

	void editFuncTouch(int xx, int yy) {
		dragging = false;
		int panelHeight = getPanelHeight();
		int midy = panelHeight / 2;
		int halfPanel = panelHeight / 2;
		int periodWidth = winSize.width;
		double ymult = .75 * halfPanel;
		int x = xx * sampleCount / periodWidth;
		double val = (midy - yy) / ymult;
		if (val > 1)
			val = 1;
		if (val < -1)
			val = -1;
		if (x < 1 || x >= sampleCount)
			return;
		// if (val > 0 && func[x] < val)
		// return;
		// if (val < 0 && func[x] > val)
		// return;
		int y;
		for (y = 1; y != maxTerms; y++) {
			double coef1 = sinTable[x][y];
			if (coef1 < 0)
				coef1 = -coef1;
			double coef = magcoef[y] * coef1;
			if (coef < 0)
				coef = -coef;
			double f = .02;
			if (coef < f)
				continue;
			int sign = (magcoef[y] < 0) ? -1 : 1;
			magcoef[y] = sign * f / coef1;
		}
	}

	void editFuncForce(int xx, int yy) {
		dragging = false;
		int panelHeight = getPanelHeight();
		int midy = panelHeight / 2;
		int halfPanel = panelHeight / 2;
		int periodWidth = winSize.width;
		double ymult = .75 * halfPanel;
		int x = xx * sampleCount / periodWidth;
		if (x < 1 || x >= sampleCount)
			return;
		double val = (midy - yy) / ymult;
		if (val > 1)
			val = 1;
		if (val < -1)
			val = -1;
		soundCheck.setState(false);
		applyForce(x, val);
		cv.repaint(pause);
	}

	void applyForce(int x, double val) {
		int y;
		for (y = 1; y != maxTerms; y++) {
			double coef = 0;
			for (int j = 1; j != sampleCount; j++) {
				double f = (j <= x) ? val * j / x : val * (sampleCount - j)
						/ (sampleCount - x);
				coef += sinTable[j][y] * f;
			}
			coef *= 2.0 / sampleCount;

			double ph = phasecoefadj[y] + omega[y] * t; // XXX change elsewhere
			double a = magcoef[y] * phasecoefcos[y];
			double b = magcoef[y] * java.lang.Math.sin(ph);
			if (forceApplied)
				a += forcebasiscoef[y];
			a -= coef;
			double r = java.lang.Math.sqrt(a * a + b * b);
			if (r > 2)
				r = 2;
			magcoef[y] = r;
			double ph2 = java.lang.Math.atan2(b, a);
			phasecoefadj[y] += ph2 - ph;
			forcebasiscoef[y] = coef;
		}
		forceApplied = true;
	}

	void forceAppliedOff() {
		if (!forceApplied)
			return;
		forceApplied = false;
		for (int i = 1; i < maxTerms; i++) {
			double ph = phasecoefadj[i] + omega[i] * t; // XXX change elsewhere
			double a = magcoef[i] * java.lang.Math.cos(ph);
			double b = magcoef[i] * java.lang.Math.sin(ph);
			a += forcebasiscoef[i];
			double r = java.lang.Math.sqrt(a * a + b * b);
			magcoef[i] = r;
			double ph2 = java.lang.Math.atan2(b, a);
			phasecoefadj[i] += ph2 - ph;
		}
	}

	void editFuncBow(int xx, int yy) {
		dragging = false;
		bowing = true;
		dragX = xx;
		dragY = yy;
		bowCaught = true;
		cv.repaint(pause);
	}

	void doBow() {
		if (!bowCaught)
			return;
		int panelHeight = getPanelHeight();
		int midy = panelHeight / 2;
		int halfPanel = panelHeight / 2;
		int periodWidth = winSize.width;
		double ymult = .75 * halfPanel;
		int x = dragX * sampleCount / periodWidth;
		double val = (midy - dragY) / ymult;
		if (val < 0)
			val = -val;
		double bowvel = .4;
		if (bowCaught && func[x] > val) {
			bowCaught = false;
			forceAppliedOff();
			return;
		}
		double p = func[x] + bowvel;
		applyForce(x, p);
	}

	double logep2 = 0;

	private ActionEvent lastAction;

	private boolean playInitialized;

	double logcoef(double x) {
		if (!logCheck.getState())
			return x;
		if (x == 0)
			return x;
		int sign = (x < 0) ? -1 : 1;
		double lg = Math.log(x * sign);
		lg = 1 + lg * .1;
		if (lg < 0)
			return 0;
		return sign * lg;
	}

	double unlogcoef(double x) {
		if (!logCheck.getState())
			return x;
		if (x == 0)
			return x;
		int sign = (x < 0) ? -1 : 1;
		double ex = Math.exp((x * sign - 1) * 10);
		return ex * sign;
	}

	void editFuncPoint(int x, int y) {
		int panelHeight = getPanelHeight();
		int midy = panelHeight / 2;
		int halfPanel = panelHeight / 2;
		int periodWidth = winSize.width;
		double ymult = .75 * halfPanel;
		int lox = x * sampleCount / periodWidth;
		int hix = ((x + 1) * sampleCount - 1) / periodWidth;
		double val = (midy - y) / ymult;
		if (val > 1)
			val = 1;
		if (val < -1)
			val = -1;
		if (lox < 1)
			lox = 1;
		if (hix >= sampleCount)
			hix = sampleCount - 1;
		for (; lox <= hix; lox++) {
			func[lox] = val;
			funci[lox] = 0;
		}
		func[sampleCount] = func[0];
		cv.repaint(pause);
		if (soundCheck.getState() == false)
			transform(false);
	}

	void editFuncPluck(int x, int y) {
		int panelHeight = getPanelHeight();
		int midy = panelHeight / 2;
		int halfPanel = panelHeight / 2;
		int periodWidth = winSize.width;
		double ymult = .75 * halfPanel;
		int ax = x * sampleCount / periodWidth;
		double val = (midy - y) / ymult;
		if (val > 1)
			val = 1;
		if (val < -1)
			val = -1;
		if (ax < 1 || ax >= sampleCount)
			return;
		int i;
		for (i = 0; i <= ax; i++)
			func[i] = val * i / ax;
		int bx = sampleCount - ax;
		for (i = ax + 1; i < sampleCount; i++)
			func[i] = val * (sampleCount - i) / bx;
		for (i = 0; i <= sampleCount; i++)
			funci[i] = 0;
		func[sampleCount] = func[0];
		cv.repaint(pause);
		if (soundCheck.getState() == false)
			transform(false);
	}

	@Override
	public void componentHidden(ComponentEvent e) {
	}

	@Override
	public void componentMoved(ComponentEvent e) {
	}

	@Override
	public void componentShown(ComponentEvent e) {
		cv.repaint(pause);
	}

	@Override
	public void componentResized(ComponentEvent e) {
		handleResize();
		cv.repaint(pause);
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		if (e.getSource() == centerPluckButton) {
			resetAudio();
			lastAction = e;
			doTriangle();
			cv.repaint();
		}
		if (e.getSource() == fundamentalButton) {
			resetAudio();
			lastAction = e;
			doSine();
			cv.repaint();
		}
		if (e.getSource() == clearButton) {
			resetAudio();
			lastAction = e;
			doBlank();
			cv.repaint();
		}
		if (e.getSource() == resonanceButton) {
			forceBar.setValue(20);
			setForce();
		}
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		resetAudio();
		System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
		if (e.getSource() == dampingBar || e.getSource() == speedBar)
			setDamping();
		if (e.getSource() == loadBar) {
			setLoadCount();
			updateSound();
		}
		if (e.getSource() == forceBar)
			setForce();
		if (e.getSource() == tensionBar) {
			setTension();
			updateSound();
		}
		cv.repaint(pause);
	}

	@Override
	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			applet.destroyFrame();
			return true;
		}
		return super.handleEvent(ev);
	}

	void setTension() {
		int oldTension = tensionBarValue;
		tensionBarValue = tensionBar.getValue();
		double mult = java.lang.Math.sqrt(oldTension / (double) tensionBarValue);
		double roottens = java.lang.Math.sqrt((double) tensionBarValue);
		for (int i = 1; i != maxTerms; i++) {
			magcoef[i] *= mult;
			double oldomegat = omega[i] * t;
			omega[i] = 5 * roottens
					* java.lang.Math.sin(i * (3.14159265 / (2 * (maxTerms + 1))));
			double newomegat = omega[i] * t;
			phasecoefadj[i] = (phasecoefadj[i] + oldomegat - newomegat) % (2 * pi);
		}
	}

	void setLoadCount() {
		sampleCount = maxTerms = loadBar.getValue();
		step = pi / sampleCount;
		int x, y;
		sinTable = new double[sampleCount + 1][maxTerms];
		for (y = 1; y != maxTerms; y++)
			for (x = 0; x != sampleCount + 1; x++)
				sinTable[x][y] = java.lang.Math.sin(step * x * y);
		omega = new double[maxTerms];
		int i;
		for (i = 1; i != maxTerms; i++)
			omega[i] = java.lang.Math.sin(i * (3.14159265 / (2 * (maxTerms + 1))));
		double mult = 1 / omega[1];
		for (i = 1; i != maxTerms; i++)
			omega[i] *= mult;
		setDamping();
	}

	void setDamping() {
		double damper = java.lang.Math.exp(dampingBar.getValue() / 40 - 8);
		if (dampingBar.getValue() <= 2)
			damper = 0;
		dampcoef = -damper;
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		dragging = true;
		edit(e);
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
			return;
		processMouseMotion(e);
	}
	
	void processMouseMotion(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		dragX = x;
		dragY = y;
		int panelHeight = getPanelHeight();
		int oldCoef = selectedCoef;
		selectedCoef = -1;
		selection = 0;
		if (y < panelHeight)
			selection = SEL_FUNC;
		if (y >= magnitudesY && y < magnitudesY + panelHeight) {
			int termWidth = getTermWidth();
			selectedCoef = x / termWidth + 1;
			if (selectedCoef >= maxTerms)
				selectedCoef = -1;
			if (selectedCoef != -1)
				selection = SEL_MAG;
		}
		if (selectedCoef != oldCoef)
			cv.repaint(pause);
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		if (e.getClickCount() == 2 && selectedCoef != -1) {
			int i;
			for (i = 1; i != maxTerms; i++)
				if (selectedCoef != i)
					magcoef[i] = 0;
			magcoef[selectedCoef] = 1;
			updateSound();
			cv.repaint(pause);
		}
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
		if (!dragging && selectedCoef != -1) {
			selectedCoef = -1;
			cv.repaint(pause);
		}
	}

	@Override
	public void mousePressed(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		processMouseMotion(e);
		if (selection == SEL_FUNC)
			getVelocities();
		dragging = true;
		edit(e);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		if (forceApplied || bowing) {
			bowing = bowCaught = false;
			forceAppliedOff();
		} else if (dragging && selection == SEL_FUNC)
			transform(false);
		dragging = false;
		cv.repaint(pause);
	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		ItemSelectable c = e.getItemSelectable();
		if (c == soundCheck) {
			if (!soundCheck.getState()) {
				if (audioThread != null) {
					resetAudio();
					audioThread = null;
					return;
				}
			}
			if (audioThread == null) {
				createAudioThread();
				if (!playInitialized) {
					playInitialized = true;
					speedBar.setValue(150);
					dampingBar.setValue(100);
					setDamping();
				}
				audioThread.start();
				if (lastAction != null)
					actionPerformed(lastAction);
			}
		} else if (c == stoppedCheck) {
			cv.repaint(pause);
		} else if (c == forceCheck) {
			forceTimeZero = t;
			cv.repaint(pause);
			forceAppliedOff();
			soundCheck.setState(false);
		} else if (c == displayChooser) {
			cv.repaint(pause);
		}
	}

	class StringWaveCanvas extends Canvas {
		StringWaveFrame pg;

		StringWaveCanvas(StringWaveFrame p) {
			pg = p;
		}

		@Override
		public Dimension getPreferredSize() {
			return new Dimension(300, 400);
		}

		@Override
		public void update(Graphics g) {
			pg.updateStringWave(g);
		}

		@Override
		public void paint(Graphics g) {
			pg.updateStringWave(g);
		}
	};

	class StringWaveLayout implements LayoutManager {
		public StringWaveLayout() {
		}

		@Override
		public void addLayoutComponent(String name, Component c) {
		}

		@Override
		public void removeLayoutComponent(Component c) {
		}

		@Override
		public Dimension preferredLayoutSize(Container target) {
			return new Dimension(500, 500);
		}

		@Override
		public Dimension minimumLayoutSize(Container target) {
			return new Dimension(100, 100);
		}

		@Override
		public void layoutContainer(Container target) {
			int barwidth = 0;
			int i;
			for (i = 1; i < target.getComponentCount(); i++) {
				Component m = target.getComponent(i);
				if (m.isVisible()) {
					Dimension d = m.getPreferredSize();
					if (d.width > barwidth)
						barwidth = d.width;
				}
			}
			Insets insets = target.insets();
			int targetw = target.size().width - insets.left - insets.right;
			int cw = targetw - barwidth;
			int targeth = target.size().height - (insets.top + insets.bottom);
			target.getComponent(0).move(insets.left, insets.top);
			target.getComponent(0).resize(cw, targeth);
			cw += insets.left;
			int h = insets.top;
			for (i = 1; i < target.getComponentCount(); i++) {
				Component m = target.getComponent(i);
				if (m.isVisible()) {
					Dimension d = m.getPreferredSize();
					if (m instanceof Scrollbar)
						d.width = barwidth;
					if (m instanceof Label) {
						h += d.height / 5;
						d.width = barwidth;
					}
					m.move(cw, h);
					m.resize(d.width, d.height);
					h += d.height;
				}
			}
		}
	}

	// ////////////////////// JSAudio //////////////////////

	private byte[] audioByteBuffer;

	private final int playSampleCount = 16384;
	private final int rate = 22050;
	private final int audioBufferByteLength = 8*4096; // need big buffer for javascript
	private final int bitsPerSample = 16;
	private final int nChannels = 1;

	private JSAudioThread audioThread;
  
	private void createAudioThread() {
		audioByteBuffer = new byte[audioBufferByteLength];
		audioThread = new JSAudioThread(this, 
				new AudioFormat(rate, bitsPerSample, nChannels, true, true),
				audioByteBuffer);
	}

	private boolean soundChanged;

	private void updateSound() {
		soundChanged = true;
	}

	private void resetAudio() {
//		if (audioThread != null)
//			audioThread.resetAudio();
	}

	@Override
	public boolean checkSoundStatus() {
		return (soundCheck.getState() && applet.ogf != null);
	}

	private double mx;
	private int offset;
	private int dampCount;
	private FFT fft;
	private double[] playfunc;

	@Override
	public int fillAudioBuffer() {
	    	// try to get speed of audio damping to match damping speed in simulation.
	    	// Still not quite right..
		int val = speedBar.getValue();
		double timeadj = Math.exp(val / 20.) * (.1 / 1500);
		double damper = dampcoef * timeadj * 1000. / rate; // * 1e-2;
		if (playfunc == null || soundChanged) {
			soundChanged = false;
			if (fft == null)
				fft = new FFT(playSampleCount);
			offset = 0;
			dampCount = 0;
			audioThread.getLine().flush();
			playfunc = new double[playSampleCount * 2];
			int i;
			// double bstep = 2*pi*440./rate;
			// int dfreq0 = 440; // XXX
			double n = 2 * pi * 20.0 * Math.sqrt((double) tensionBarValue);
			n /= omega[1];
			mx = .2;
			for (i = 1; i != maxTerms; i++) {
				int dfreq = (int) (n * omega[i]);
				if (dfreq >= playSampleCount)
					break;
				playfunc[dfreq] = magcoef[i];
			}
			fft.transform(playfunc, true);
			for (i = 0; i != playSampleCount; i++)
				mx = Math.max(mx, Math.abs(playfunc[i * 2]) * Math.exp(damper * i));
			dampCount = offset = 0;
		}

		double mult = 32767 / mx;
		int bl = audioBufferByteLength / 2;
		int i;
		for (i = 0; i != bl; i++) {
			double v = playfunc[(i + offset) * 2] * mult
					* Math.exp(damper * dampCount++);
			short x = (short) (v);
			audioByteBuffer[i * 2] = (byte) (x / 256);
			audioByteBuffer[i * 2 + 1] = (byte) (x & 255);
		}
		offset += bl;
		if (offset == playfunc.length / 2)
			offset = 0;
		return audioBufferByteLength;
	}

	@Override
	public void audioThreadExiting() {
		audioThread = null;
	}	
	

}
