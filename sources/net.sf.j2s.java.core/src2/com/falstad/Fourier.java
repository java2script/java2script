package com.falstad;

//Fourier.java (C) 2001 by Paul Falstad, www.falstad.com
//
//web_Ready
//web_AppletName= Fourier
//web_Description= Simulation of Fourier series, which is a method of expressing an arbitrary periodic function as a sum of cosine terms.
//web_JavaVersion= http://www.falstad.com/fourier/
//web_AppletImage= fourier.png
//web_Category= Physics
//web_Date= $Date: 2016-12-31 17:53:43 -0600 (Sat, 31 Dec 2016) $
//web_Features= audio, graphics, AWT-to-Swing
//
//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> a2s
//
//import java.awt [Applet, Button, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
//change paint() to paintComponent() in CircOscCanvas and CircOscFrame
//
//Added Container main
//
//Changed add() to main.add()
//
//resize and show --> useFrame options
//
//added triggerShow()sw
// 
// BH - streamlined audio
// BH better action of [x] sound checkbox. 
//

import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Insets;
import java.awt.ItemSelectable;
import java.awt.LayoutManager;
import java.awt.Rectangle;
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
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Hashtable;
import java.util.Random;
import java.util.StringTokenizer;


import javajs.util.JSThread;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;

import java.applet.Applet;

import com.falstad.FFT;

import javajs.util.JSAudioThread;
import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Scrollbar;

class FourierCanvas extends Canvas {
	FourierFrame pg;

	FourierCanvas(FourierFrame p) {
		pg = p;
	}

	@Override
	public Dimension getPreferredSize() {
		return new Dimension(300, 400);
	}

	@Override
	public void update(Graphics g) {
		pg.updateFourier(g);
	}

	@Override
	public void paint(Graphics g) {
		pg.updateFourier(g);
	}
}

class FourierLayout implements LayoutManager {
	public FourierLayout() {
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
};

public class Fourier extends Applet implements ComponentListener {
	static FourierFrame ogf;

	void destroyFrame() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}

	boolean started = false;

	@Override
	public void init() {
		showFrame();
		addComponentListener(this);
	}

	@Override
	public void start() {
		showFrame();

	}

	public static void main(String args[]) {
		ogf = new FourierFrame(null);
		ogf.initFrame();
	}

	void showFrame() {
		if (ogf == null) {
			started = true;
			ogf = new FourierFrame(this);
			ogf.initFrame();
			repaint();
		}
	}

	@Override
	public void paint(Graphics g) {
		super.paint(g); //required to avoid hover-mouse repaint
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

class FourierFrame extends Frame implements ComponentListener, ActionListener,
		AdjustmentListener, MouseMotionListener, MouseListener, ItemListener,
		JSAudioThread.Owner {

	Dimension winSize;
	Image dbimage;

	Random random;
	public static final int sampleCount = 1024;
	public static final int halfSampleCount = sampleCount / 2;
	public static final double halfSampleCountFloat = sampleCount / 2;

	public String getAppletInfo() {
		return "Fourier Series by Paul Falstad";
	}

	FourierFrame(Fourier a) {
		super("Fourier Series Applet v1.6d");
		applet = a;
		useFrame = true;
	}

	Fourier applet;
	NumberFormat showFormat;
	public boolean useFrame;
	Container main;
	Button sineButton;
	Button cosineButton;
	Button rectButton;
	Button fullRectButton;
	Button triangleButton;
	Button sawtoothButton;
	Button squareButton;
	Button noiseButton;
	Button blankButton;
	Button phaseButton;
	Button clipButton;
	Button resampleButton;
	Button quantizeButton;
	Button highPassButton;
	Checkbox magPhaseCheck;
	Checkbox soundCheck;
	Checkbox logCheck;
	Scrollbar termBar;
	Scrollbar freqBar;
	double magcoef[];
	double phasecoef[];
	boolean mutes[], solos[], hasSolo;
	static final double pi = 3.14159265358979323846;
	static final double step = 2 * pi / sampleCount;
	double func[];
	int maxTerms = 160;
	int selectedCoef;
	static final int SEL_NONE = 0;
	static final int SEL_FUNC = 1;
	static final int SEL_MAG = 2;
	static final int SEL_PHASE = 3;
	static final int SEL_MUTES = 4;
	static final int SEL_SOLOS = 5;
	int selection;
	int dragX, dragY;
	int quantizeCount, resampleCount;
	boolean dragging, freqAdjusted;
	View viewFunc, viewMag, viewPhase, viewMutes, viewSolos;
	FFT fft;

	class View extends Rectangle {
		View(int x, int y, int w, int h) {
			super(x, y, w, h);
			midy = y + h / 2;
			ymult = .6 * h / 2;
			periodWidth = w / 3;
			labely = midy - 5 - h * 3 / 8;
		}

		int midy, labely;
		double ymult;
		int periodWidth;
	}

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	FourierCanvas cv;
	boolean java2;
	Hashtable showTable;

	boolean mustShow(String s) {
		return showTable == null || showTable.containsKey(s);
	}

	Button doButton(String s) {
		Button b = new Button(s);
		if (mustShow(s))
			main.add(b);
		b.addActionListener(this);
		return b;
	}

	Checkbox doCheckbox(String s) {
		Checkbox b = new Checkbox(s);
		if (mustShow(s))
			main.add(b);
		try {
			String param = applet.getParameter(s);
			if (param != null && param.equalsIgnoreCase("true"))
				b.setState(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		b.addItemListener(this);
		return b;
	}

	public void initFrame() {
		String jv = System.getProperty("java.class.version");
		double jvf = new Double(jv).doubleValue();
		if (jvf >= 48)
			java2 = true;
		String state = "";
		try {
			String param = applet.getParameter("useFrame");
			if (param != null && param.equalsIgnoreCase("false"))
				useFrame = false;
			String show = applet.getParameter("show");
			if (show != null) {
				showTable = new Hashtable(10);
				StringTokenizer st = new StringTokenizer(show, ",");
				while (st.hasMoreTokens()) {
					String s = st.nextToken();
					showTable.put(s, "");
				}
				showTable.put("Sound", "");
			}
			state = applet.getParameter("state");
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (useFrame)
			main = this;
		else
			main = applet;

		selectedCoef = -1;
		magcoef = new double[maxTerms];
		phasecoef = new double[maxTerms];
		mutes = new boolean[maxTerms];
		solos = new boolean[maxTerms];
		func = new double[sampleCount + 1];
		random = new Random();
		fft = new FFT(sampleCount);

		main.setLayout(new FourierLayout());
		cv = new FourierCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		main.add(cv);
		sineButton = doButton("Sine");
		cosineButton = doButton("Cosine");
		triangleButton = doButton("Triangle");
		sawtoothButton = doButton("Sawtooth");
		squareButton = doButton("Square");
		noiseButton = doButton("Noise");
		phaseButton = doButton("Phase Shift");
		clipButton = doButton("Clip");
		resampleButton = doButton("Resample");
		quantizeButton = doButton("Quantize");
		rectButton = doButton("Rectify");
		fullRectButton = doButton("Full Rectify");
		highPassButton = doButton("High-Pass Filter");
		blankButton = doButton("Clear");

		soundCheck = doCheckbox("Sound");
		if (!java2)
			remove(soundCheck);
		magPhaseCheck = doCheckbox("Mag/Phase View");
		logCheck = doCheckbox("Log View");
		logCheck.disable();
		if (mustShow("Terms"))
			main.add(new Label("Number of Terms", Label.CENTER));
		termBar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 1, 1, maxTerms);
		termBar.addAdjustmentListener(this);
		if (mustShow("Terms"))
			main.add(termBar);
		if (java2)
			main.add(new Label("Playing Frequency", Label.CENTER));
		freqBar = new Scrollbar(Scrollbar.HORIZONTAL, 251, 1, -100, 500);
		freqBar.addAdjustmentListener(this);
		if (java2)
			main.add(freqBar);
		main.add(new Label("http://www.falstad.com"));
		cv.setBackground(Color.black);
		cv.setForeground(Color.lightGray);
		showFormat = DecimalFormat.getInstance();
		showFormat.setMaximumFractionDigits(5);

		if (state != null) {

			if (state.equalsIgnoreCase("square"))
				doSquare();
			else if (state.equalsIgnoreCase("sine"))
				doSine();
			else if (state.equalsIgnoreCase("triangle"))
				doTriangle();
			else if (state.equalsIgnoreCase("noise"))
				doNoise();
			else if (state.equalsIgnoreCase("quant")) {
				doSine();
				doQuantize();
			} else if (state.equalsIgnoreCase("resample")) {
				doSine();
				doResample();
			} else if (state.equalsIgnoreCase("clip")) {
				doSine();
				doClip();
			} else if (state.equalsIgnoreCase("rect")) {
				doSine();
				doRect();
			} else if (state.equalsIgnoreCase("fullrect")) {
				doSine();
				doFullRect();
			} else if (state.equalsIgnoreCase("fullsaw")) {
				doSawtooth();
				doFullRect();
			} else if (state.equalsIgnoreCase("beats"))
				doBeats();
			else if (state.equalsIgnoreCase("loudsoft"))
				doLoudSoft();
			else
				doSawtooth();

		}
		if (useFrame) {
			resize(800, 640);
			handleResize();
			Dimension x = getSize();
			Dimension screen = getToolkit().getScreenSize();
			setLocation((screen.width - x.width) / 2, (screen.height - x.height) / 2);
			show();
		} else {
			hide();
			handleResize();
			applet.validate();
			cv.repaint(); // BH added
		}
		main.requestFocus();
	}

	void handleResize() {
		Dimension d = winSize = cv.getSize();
		if (winSize.width == 0 || winSize.height == 0)
			return;
		dbimage = cv.createImage(d.width, d.height);
		int margin = 20;
		int pheight = (d.height - margin * 2) / 3;
		viewFunc = new View(0, 0, d.width, pheight);
		int y = pheight + margin * 2;
		viewMag = new View(0, y, d.width, pheight);
		if (magPhaseCheck.getState()) {
			viewMag.ymult *= 1.6;
			viewMag.midy += (int) viewMag.ymult / 2;
			logCheck.enable();
		} else {
			logCheck.disable();
			logCheck.setState(false);
		}
		y += pheight;
		viewPhase = new View(0, y, d.width, pheight);
		int pmy = viewPhase.midy + (int) viewPhase.ymult + 10;
		int h = (d.height - pmy) / 2;
		// System.out.println("height " + h);
		viewMutes = new View(0, pmy, d.width, h);
		viewSolos = new View(0, pmy + h, d.width, h);
		// System.out.println(viewMutes + " " + viewSolos + " " +d.height);
	}

	boolean shown = false;

	public void triggerShow() {
		if (!shown)
			show();
		shown = true;
	}

	void doBeats() {
		int x;
		for (x = 0; x != sampleCount; x++) {
			double q = (x - halfSampleCount) * step;
			func[x] = .5 * (Math.cos(q * 20) + Math.cos(q * 21));
		}
		func[sampleCount] = func[0];
		transform();
		freqBar.setValue(-100);
	}

	void doLoudSoft() {
		int x;
		for (x = 0; x != sampleCount; x++) {
			double q = (x - halfSampleCount) * step;
			func[x] = Math.cos(q) + .05 * Math.cos(q * 10);
		}
		func[sampleCount] = func[0];
		transform();
	}

	void doSawtooth() {
		int x;
		for (x = 0; x != sampleCount; x++)
			func[x] = (x - sampleCount / 2) / halfSampleCountFloat;
		func[sampleCount] = func[0];
		transform();
	}

	void doTriangle() {
		int x;
		for (x = 0; x != halfSampleCount; x++) {
			func[x] = (x * 2 - halfSampleCount) / halfSampleCountFloat;
			func[x + halfSampleCount] = ((halfSampleCount - x) * 2 - halfSampleCount)
					/ halfSampleCountFloat;
		}
		func[sampleCount] = func[0];
		transform();
	}

	void doSine() {
		int x;
		for (x = 0; x != sampleCount; x++) {
			func[x] = Math.sin((x - halfSampleCount) * step);
		}
		func[sampleCount] = func[0];
		transform();
	}

	void doCosine() {
		int x;
		for (x = 0; x != sampleCount; x++) {
			func[x] = Math.cos((x - halfSampleCount) * step);
		}
		func[sampleCount] = func[0];
		transform();
	}

	void doRect() {
		int x;
		for (x = 0; x != sampleCount; x++)
			if (func[x] < 0)
				func[x] = 0;
		func[sampleCount] = func[0];
		transform();
	}

	void doFullRect() {
		int x;
		for (x = 0; x != sampleCount; x++)
			if (func[x] < 0)
				func[x] = -func[x];
		func[sampleCount] = func[0];
		transform();
	}

	void doHighPass() {
		int i;
		int terms = termBar.getValue();
		for (i = 0; i != terms; i++)
			if (magcoef[i] != 0) {
				magcoef[i] = 0;
				break;
			}
		doSetFunc();
	}

	void doSquare() {
		int x;
		for (x = 0; x != halfSampleCount; x++) {
			func[x] = -1;
			func[x + halfSampleCount] = 1;
		}
		func[sampleCount] = func[0];
		transform();
	}

	void doNoise() {
		int x;
		int blockSize = 3;
		for (x = 0; x != sampleCount / blockSize; x++) {
			double q = Math.random() * 2 - 1;
			int i;
			for (i = 0; i != blockSize; i++)
				func[x * blockSize + i] = q;
		}
		func[sampleCount] = func[0];
		transform();
	}

	void doPhaseShift() {
		int i;
		int sh = sampleCount / 20;
		double copyf[] = new double[sh];
		for (i = 0; i != sh; i++)
			copyf[i] = func[i];
		for (i = 0; i != sampleCount - sh; i++)
			func[i] = func[i + sh];
		for (i = 0; i != sh; i++)
			func[sampleCount - sh + i] = copyf[i];
		func[sampleCount] = func[0];
		transform();
	}

	void doBlank() {
		int x;
		for (x = 0; x <= sampleCount; x++)
			func[x] = 0;
		for (x = 0; x != termBar.getValue(); x++)
			mutes[x] = solos[x] = false;
		transform();
	}

	void doSetFunc() {
		int i;
		double data[] = new double[sampleCount * 2];
		int terms = termBar.getValue();
		for (i = 0; i != terms; i++) {
			int sgn = (i & 1) == 1 ? -1 : 1;
			data[i * 2] = sgn * magcoef[i] * Math.cos(phasecoef[i]);
			data[i * 2 + 1] = -sgn * magcoef[i] * Math.sin(phasecoef[i]);
		}
		fft.transform(data, true);
		for (i = 0; i != sampleCount; i++)
			func[i] = data[i * 2];
		func[sampleCount] = func[0];
		updateSound();
	}

	void doClip() {
		int x;
		double mult = 1.2;
		for (x = 0; x != sampleCount; x++) {
			func[x] *= mult;
			if (func[x] > 1)
				func[x] = 1;
			if (func[x] < -1)
				func[x] = -1;
		}
		func[sampleCount] = func[0];
		transform();
	}

	void doResample() {
		int x, i;
		if (resampleCount == 0)
			resampleCount = 32;
		if (resampleCount == sampleCount)
			return;
		for (x = 0; x != sampleCount; x += resampleCount) {
			for (i = 1; i != resampleCount; i++)
				func[x + i] = func[x];
		}
		func[sampleCount] = func[0];
		transform();
		resampleCount *= 2;
	}

	double origFunc[];

	void doQuantize() {
		int x;
		if (quantizeCount == 0) {
			quantizeCount = 8;
			origFunc = new double[sampleCount];
			System.arraycopy(func, 0, origFunc, 0, sampleCount);
		}
		for (x = 0; x != sampleCount; x++) {
			func[x] = Math.round(origFunc[x] * quantizeCount)
					/ (double) quantizeCount;
		}
		func[sampleCount] = func[0];
		transform();
		quantizeCount /= 2;
	}

	int dfreq0;
	private Object buttonPressed;

	double getFreq() {
		// get approximate freq from slider (log scale)
		double freq = 27.5 * Math.exp(freqBar.getValue() * .004158883084 * 2);
		// get offset into FFT array for frequency selected (as close as possible;
		// it can't be exact because we use an FFT to generate the wave, and so the
		// frequency choices must be integer multiples of a base frequency)
		dfreq0 = ((int) (freq * (double) playSampleCount / rate)) * 2;
		// get exact frequency being played
		return rate * dfreq0 / (playSampleCount * 2.);
	}

	void transform() {
		int x, y;
		double data[] = new double[sampleCount * 2];
		int i;
		for (i = 0; i != sampleCount; i++)
			data[i * 2] = func[i];
		fft.transform(data, false);
		double epsilon = .00001;
		double mult = 2. / sampleCount;
		for (y = 0; y != maxTerms; y++) {
			double acoef = data[y * 2] * mult;
			double bcoef = -data[y * 2 + 1] * mult;
			if ((y & 1) == 1)
				acoef = -acoef;
			else
				bcoef = -bcoef;
			// System.out.println(y + " " + acoef + " " + bcoef);
			if (acoef < epsilon && acoef > -epsilon)
				acoef = 0;
			if (bcoef < epsilon && bcoef > -epsilon)
				bcoef = 0;
			if (y == 0) {
				magcoef[0] = acoef / 2;
				phasecoef[0] = 0;
			} else {
				magcoef[y] = Math.sqrt(acoef * acoef + bcoef * bcoef);
				phasecoef[y] = Math.atan2(-bcoef, acoef);
			}
			// System.out.print("phasecoef " + phasecoef[y] + "\n");
		}
		updateSound();
	}

	void centerString(Graphics g, String s, int y) {
		FontMetrics fm = g.getFontMetrics();
		g.drawString(s, (winSize.width - fm.stringWidth(s)) / 2, y);
	}

//	public void paintComponent(Graphics g) {
//		cv.repaint();
//	}

	public void updateFourier(Graphics realg) {
		if (winSize == null || winSize.width == 0 || dbimage == null)
			return;
		Graphics g = dbimage.getGraphics();
		Color gray1 = new Color(76, 76, 76);
		Color gray2 = new Color(127, 127, 127);
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());
		int i;
		int ox = -1, oy = -1;
		int midy = viewFunc.midy;
		int periodWidth = viewFunc.periodWidth;
		double ymult = viewFunc.ymult;
		for (i = -1; i <= 1; i++) {
			g.setColor((i == 0) ? gray2 : gray1);
			g.drawLine(0, midy + (i * (int) ymult), winSize.width, midy
					+ (i * (int) ymult));
		}
		for (i = 2; i <= 4; i++) {
			g.setColor((i == 3) ? gray2 : gray1);
			g.drawLine(periodWidth * i / 2, midy - (int) ymult, periodWidth * i / 2,
					midy + (int) ymult);
		}
		g.setColor(Color.white);
		if (!(dragging && selection != SEL_FUNC)) {
			for (i = 0; i != sampleCount + 1; i++) {
				int x = periodWidth * i / sampleCount;
				int y = midy - (int) (ymult * func[i]);
				if (ox != -1) {
					g.drawLine(ox, oy, x, y);
					g.drawLine(ox + periodWidth, oy, x + periodWidth, y);
					g.drawLine(ox + periodWidth * 2, oy, x + periodWidth * 2, y);
				}
				ox = x;
				oy = y;
			}
		}
		int terms = termBar.getValue();
		if (!(dragging && selection == SEL_FUNC)) {
			g.setColor(Color.red);
			ox = -1;
			for (i = 0; i != sampleCount + 1; i++) {
				int x = periodWidth * i / sampleCount;
				int j;
				double dy = 0;
				for (j = 0; j != terms; j++) {
					dy += magcoef[j]
							* Math.cos(step * (i - halfSampleCount) * j + phasecoef[j]);
				}
				int y = midy - (int) (ymult * dy);
				if (ox != -1) {
					g.drawLine(ox, oy, x, y);
					g.drawLine(ox + periodWidth, oy, x + periodWidth, y);
					g.drawLine(ox + periodWidth * 2, oy, x + periodWidth * 2, y);
				}
				ox = x;
				oy = y;
			}
		}
		int texty = viewFunc.height + 10;
		if (selectedCoef != -1) {
			g.setColor(Color.yellow);
			ox = -1;
			double phase = phasecoef[selectedCoef];
			int x;
			double n = selectedCoef * 2 * pi / periodWidth;
			int dx = periodWidth / 2;
			double mag = magcoef[selectedCoef];
			if (!magPhaseCheck.getState()) {
				if (selection == SEL_MAG) {
					mag *= -Math.sin(phase);
					phase = -pi / 2;
				} else {
					mag *= Math.cos(phase);
					phase = 0;
				}
			}
			ymult *= mag;
			if (!dragging) {
				for (i = 0; i != sampleCount + 1; i++) {
					x = periodWidth * i / sampleCount;
					double dy = Math.cos(step * (i - halfSampleCount) * selectedCoef
							+ phase);
					int y = midy - (int) (ymult * dy);
					if (ox != -1) {
						g.drawLine(ox, oy, x, y);
						g.drawLine(ox + periodWidth, oy, x + periodWidth, y);
						g.drawLine(ox + periodWidth * 2, oy, x + periodWidth * 2, y);
					}
					ox = x;
					oy = y;
				}
			}
			if (selectedCoef > 0 && java2) {
				int f = (int) (getFreq() * selectedCoef);
				centerString(g, f + ((f > rate / 2) ? " Hz (filtered)" : " Hz"), texty);
			}
			if (selectedCoef != -1) {
				String harm;
				if (selectedCoef == 0)
					harm = showFormat.format(mag) + "";
				else {
					String func = "cos";
					if (!magPhaseCheck.getState() && selection == SEL_MAG)
						func = "sin";
					if (selectedCoef == 1)
						harm = showFormat.format(mag) + " " + func + "(x";
					else
						harm = showFormat.format(mag) + " " + func + "(" + selectedCoef
								+ "x";
					if (!magPhaseCheck.getState() || phase == 0)
						harm += ")";
					else {
						harm += (phase < 0) ? " - " : " + ";
						harm += showFormat.format(Math.abs(phase)) + ")";
					}
					if (logCheck.getState()) {
						showFormat.setMaximumFractionDigits(2);
						harm += "   ("
								+ showFormat.format(20 * Math.log(mag) / Math.log(10)) + " dB)";
						showFormat.setMaximumFractionDigits(5);
					}
				}
				centerString(g, harm, texty + 15);
			}
		}
		if (selectedCoef == -1 && freqAdjusted && java2) {
			int f = (int) getFreq();
			g.setColor(Color.yellow);
			centerString(g, f + " Hz", texty);
		}
		freqAdjusted = false;
		int termWidth = getTermWidth();

		ymult = viewMag.ymult;
		midy = viewMag.midy;
		g.setColor(Color.white);
		if (magPhaseCheck.getState()) {
			centerString(g, "Magnitudes", viewMag.labely);
			centerString(g, "Phases", viewPhase.labely);
			g.setColor(gray2);
			g.drawLine(0, midy, winSize.width, midy);
			g.setColor(gray1);
			g.drawLine(0, midy - (int) ymult, winSize.width, midy - (int) ymult);
			int dotSize = termWidth - 3;
			for (i = 0; i != terms; i++) {
				int t = termWidth * i + termWidth / 2;
				int y = midy - (int) (showMag(i) * ymult);
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				g.drawLine(t, midy, t, y);
				g.fillOval(t - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
			}

			ymult = viewPhase.ymult;
			midy = viewPhase.midy;
			for (i = -2; i <= 2; i++) {
				g.setColor((i == 0) ? gray2 : gray1);
				g.drawLine(0, midy + (i * (int) ymult) / 2, winSize.width, midy
						+ (i * (int) ymult) / 2);
			}
			ymult /= pi;
			for (i = 0; i != terms; i++) {
				int t = termWidth * i + termWidth / 2;
				int y = midy - (int) (phasecoef[i] * ymult);
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				g.drawLine(t, midy, t, y);
				g.fillOval(t - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
			}
		} else {
			centerString(g, "Sines", viewMag.labely);
			centerString(g, "Cosines", viewPhase.labely);
			g.setColor(gray2);
			g.drawLine(0, midy, winSize.width, midy);
			g.setColor(gray1);
			g.drawLine(0, midy - (int) ymult, winSize.width, midy - (int) ymult);
			g.drawLine(0, midy + (int) ymult, winSize.width, midy + (int) ymult);
			int dotSize = termWidth - 3;
			for (i = 1; i != terms; i++) {
				int t = termWidth * i + termWidth / 2;
				int y = midy + (int) (magcoef[i] * Math.sin(phasecoef[i]) * ymult);
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				g.drawLine(t, midy, t, y);
				g.fillOval(t - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
			}

			ymult = viewPhase.ymult;
			midy = viewPhase.midy;
			for (i = -2; i <= 2; i += 2) {
				g.setColor((i == 0) ? gray2 : gray1);
				g.drawLine(0, midy + (i * (int) ymult) / 2, winSize.width, midy
						+ (i * (int) ymult) / 2);
			}
			for (i = 0; i != terms; i++) {
				int t = termWidth * i + termWidth / 2;
				int y = midy - (int) (magcoef[i] * Math.cos(phasecoef[i]) * ymult);
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				g.drawLine(t, midy, t, y);
				g.fillOval(t - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
			}
		}
		double basef = getFreq();
		if (viewMutes.height > 8) {
			Font f = new Font("SansSerif", 0, viewMutes.height);
			g.setFont(f);
			FontMetrics fm = g.getFontMetrics();
			for (i = 1; i != terms; i++) {
				if (basef * i > rate / 2)
					break;
				int t = termWidth * i + termWidth / 2;
				int y = viewMutes.y + fm.getAscent();
				g.setColor(i == selectedCoef ? Color.yellow : Color.white);
				if (hasSolo && !solos[i])
					g.setColor(Color.gray);
				String pm = "-";
				if (mutes[i])
					pm = "M";
				int w = fm.stringWidth(pm);
				g.drawString(pm, t - w / 2, y);
				y = viewSolos.y + fm.getAscent();
				pm = "-";
				if (solos[i])
					pm = "S";
				w = fm.stringWidth(pm);
				g.drawString(pm, t - w / 2, y);
			}
		}
		realg.drawImage(dbimage, 0, 0, this);
	}

	double showMag(int n) {
		double m = magcoef[n];
		if (!logCheck.getState() || n == 0)
			return m;
		m = Math.log(m) / 6. + 1;
		// System.out.println(magcoef[i] + " " + m);
		return (m < 0) ? 0 : m;
	}

	double getMagValue(double m) {
		if (!logCheck.getState())
			return m;
		if (m == 0)
			return 0;
		return Math.exp(6 * (m - 1));
	}

	int getTermWidth() {
		int terms = termBar.getValue();
		int termWidth = winSize.width / terms;
		int maxTermWidth = winSize.width / 30;
		if (termWidth > maxTermWidth)
			termWidth = maxTermWidth;
		if (termWidth > 12)
			termWidth = 12;
		termWidth &= ~1;
		return termWidth;
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
		case SEL_PHASE:
			editPhase(x, y);
			break;
		case SEL_MUTES:
			editMutes(e, x, y);
			break;
		case SEL_SOLOS:
			editSolos(e, x, y);
			break;
		}
		quantizeCount = resampleCount = 0;
	}

	void editMag(int x, int y) {
		if (selectedCoef == -1)
			return;
		double ymult = viewMag.ymult;
		double midy = viewMag.midy;
		double coef = -(y - midy) / ymult;
		if (magPhaseCheck.getState()) {
			if (selectedCoef > 0) {
				if (coef < 0)
					coef = 0;
				coef = getMagValue(coef);
			} else if (coef < -1)
				coef = -1;
			if (coef > 1)
				coef = 1;
			if (magcoef[selectedCoef] == coef)
				return;
			magcoef[selectedCoef] = coef;
		} else {
			int c = selectedCoef;
			if (c == 0)
				return;
			double m2 = magcoef[c] * Math.cos(phasecoef[c]);
			if (coef > 1)
				coef = 1;
			if (coef < -1)
				coef = -1;
			double m1 = coef;
			magcoef[c] = Math.sqrt(m1 * m1 + m2 * m2);
			phasecoef[c] = Math.atan2(-m1, m2);
		}
		updateSound();
		cv.repaint();
	}

	void editFunc(int x, int y) {
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

	void editFuncPoint(int x, int y) {
		int midy = viewFunc.midy;
		int periodWidth = viewFunc.periodWidth;
		double ymult = viewFunc.ymult;
		int lox = (x % periodWidth) * sampleCount / periodWidth;
		int hix = (((x % periodWidth) + 1) * sampleCount / periodWidth) - 1;
		double val = (midy - y) / ymult;
		if (val > 1)
			val = 1;
		if (val < -1)
			val = -1;
		for (; lox <= hix; lox++)
			func[lox] = val;
		func[sampleCount] = func[0];
		cv.repaint();
	}

	void editPhase(int x, int y) {
		if (selectedCoef == -1)
			return;
		double ymult = viewPhase.ymult;
		double midy = viewPhase.midy;
		double coef = -(y - midy) / ymult;
		if (magPhaseCheck.getState()) {
			coef *= pi;
			if (coef < -pi)
				coef = -pi;
			if (coef > pi)
				coef = pi;
			if (phasecoef[selectedCoef] == coef)
				return;
			phasecoef[selectedCoef] = coef;
		} else {
			int c = selectedCoef;
			double m1 = -magcoef[c] * Math.sin(phasecoef[c]);
			if (coef > 1)
				coef = 1;
			if (coef < -1)
				coef = -1;
			double m2 = coef;
			magcoef[c] = Math.sqrt(m1 * m1 + m2 * m2);
			phasecoef[c] = Math.atan2(-m1, m2);
			updateSound();
		}
		cv.repaint();
	}

	void editMutes(MouseEvent e, int x, int y) {
		if (e.getID() != MouseEvent.MOUSE_PRESSED)
			return;
		if (selectedCoef == -1)
			return;
		mutes[selectedCoef] = !mutes[selectedCoef];
		cv.repaint();
	}

	void editSolos(MouseEvent e, int x, int y) {
		if (e.getID() != MouseEvent.MOUSE_PRESSED)
			return;
		if (selectedCoef == -1)
			return;
		solos[selectedCoef] = !solos[selectedCoef];
		int terms = termBar.getValue();
		hasSolo = false;
		int i;
		for (i = 0; i != terms; i++)
			if (solos[i]) {
				hasSolo = true;
				break;
			}
		cv.repaint();
	}

	@Override
	public void componentHidden(ComponentEvent e) {
	}

	@Override
	public void componentMoved(ComponentEvent e) {
	}

	@Override
	public void componentShown(ComponentEvent e) {
		cv.repaint();
	}

	@Override
	public void componentResized(ComponentEvent e) {
		handleResize();
		cv.repaint(100);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		pressButton(e.getSource());
	}

	void pressButton(Object b) {
		resetAudio();
		buttonPressed = b;
		if (b == triangleButton) {
			doTriangle();
			cv.repaint();
		}
		if (b == sineButton) {
			doSine();
			cv.repaint();
		}
		if (b == cosineButton) {
			doCosine();
			cv.repaint();
		}
		if (b == rectButton) {
			doRect();
			cv.repaint();
		}
		if (b == fullRectButton) {
			doFullRect();
			cv.repaint();
		}
		if (b == squareButton) {
			doSquare();
			cv.repaint();
		}
		if (b == highPassButton) {
			doHighPass();
			cv.repaint();
		}
		if (b == noiseButton) {
			doNoise();
			cv.repaint();
		}
		if (b == phaseButton) {
			doPhaseShift();
			cv.repaint();
		}
		if (b == blankButton) {
			doBlank();
			cv.repaint();
		}
		if (b == sawtoothButton) {
			doSawtooth();
			cv.repaint();
		}
		if (b == clipButton) {
			doClip();
			cv.repaint();
		}
		if (b == quantizeButton) {
			doQuantize();
			cv.repaint();
		} else
			quantizeCount = 0;
		if (b == resampleButton) {
			doResample();
			cv.repaint();
		} else
			resampleCount = 0;
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
				audioThread.start();
				if (buttonPressed != null)
					pressButton(buttonPressed);
			}
		} else if (c == magPhaseCheck) {
			handleResize();
		}
		cv.repaint();
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		resetAudio();
		if (e.getSource() == termBar) {
			updateSound();
			cv.repaint();
		}
		if (e.getSource() == freqBar) {
			freqAdjusted = true;
			updateSound();
			cv.repaint();
		}
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		dragging = true;
		edit(e);
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		dragX = x;
		dragY = y;
		int oldCoef = selectedCoef;
		selectedCoef = -1;
		selection = 0;
		int oldsel = selection;
		if (viewFunc.contains(x, y))
			selection = SEL_FUNC;
		else {
			int termWidth = getTermWidth();
			selectedCoef = x / termWidth;
			if (selectedCoef > termBar.getValue())
				selectedCoef = -1;
			if (selectedCoef != -1) {
				if (viewMag.contains(x, y))
					selection = SEL_MAG;
				else if (viewMutes.contains(x, y))
					selection = SEL_MUTES;
				else if (viewSolos.contains(x, y))
					selection = SEL_SOLOS;
				else if (viewPhase.contains(x, y))
					selection = SEL_PHASE;
			}
		}
		if (selectedCoef != oldCoef || oldsel != selection)
			cv.repaint();
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		if (e.getClickCount() == 2 && selectedCoef != -1 && selection != SEL_MUTES
				&& selection != SEL_SOLOS) {
			int i;
			for (i = 0; i != termBar.getValue(); i++) {
				phasecoef[i] = 0;
				if (selectedCoef != i)
					magcoef[i] = 0;
			}
			magcoef[selectedCoef] = 1;
			if (!magPhaseCheck.getState())
				phasecoef[selectedCoef] = (selection == SEL_MAG) ? -pi / 2 : 0;
			doSetFunc();
			cv.repaint();
		}
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
	}

	@Override
	public void mousePressed(MouseEvent e) {
		mouseMoved(e);
		if ((e.getModifiers() & MouseEvent.BUTTON3_MASK) != 0 && selectedCoef != -1) {
			termBar.setValue(selectedCoef + 1);
			cv.repaint();
		}
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		dragging = true;
		edit(e);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		dragging = false;
		if (selection == SEL_FUNC)
			transform();
		else if (selection != SEL_NONE)
			doSetFunc();
		cv.repaint();
	}

	@Override
	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			if (applet == null)
				dispose();
			else
				applet.destroyFrame();
			return true;
		}
		return super.handleEvent(ev);
	}

	@Override
	public boolean checkSoundStatus() {
		return (soundCheck.getState() && applet.ogf != null);
	}

	private void resetAudio() {
		if (audioThread != null)
			audioThread.resetAudio();
	}

	// ////////////////////// JSAudio //////////////////////

	final int playSampleCount = 16384;
	final int rate = 22050;
	final int audioBufferByteLength = playSampleCount * 2;
	final int bitsPerSample = 16;
	final int nChannels = 1;

	FFT playFFT;
	double[] playfunc;
	byte[] audioByteBuffer;
	int offset;
	int dampCount;

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

	private double mx;

	@Override
	public int fillAudioBuffer() {
		if (playfunc == null || soundChanged) {
			soundChanged = false;
			playfunc = new double[playSampleCount * 2];
			int i;
			int terms = termBar.getValue();
			double bstep = 2 * pi * getFreq() / rate;
			double mx = .2;
			for (i = 1; i != terms; i++) {
				if (hasSolo && !solos[i])
					continue;
				if (mutes[i])
					continue;
				int dfreq = dfreq0 * i;
				if (dfreq >= playSampleCount)
					break;
				int sgn = (i & 1) == 1 ? -1 : 1;
				playfunc[dfreq] = sgn * magcoef[i] * Math.cos(phasecoef[i]);
				playfunc[dfreq + 1] = -sgn * magcoef[i] * Math.sin(phasecoef[i]);
			}
			if (playFFT == null)
				playFFT = new FFT(playSampleCount);
			playFFT.transform(playfunc, true);
			for (i = 0; i != playSampleCount; i++)
				mx = Math.max(mx, Math.abs(playfunc[i * 2]));
			double mult = 32767 / mx;
			for (i = 0; i != playSampleCount; i++) {
				short x = (short) (playfunc[i * 2] * mult);
				audioByteBuffer[i * 2] = (byte) (x / 256);
				audioByteBuffer[i * 2 + 1] = (byte) (x & 255);
			}
		}
		return audioBufferByteLength;
	}

	@Override
	public void audioThreadExiting() {
		audioThread = null;
	}
}
