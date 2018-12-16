// Vowel.java (C) 2005 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= Vowel
//web_Description= A simulation of sound waves in the human vocal tract to make vowel sounds.
//web_JavaVersion= http://www.falstad.com/vowel/
//web_AppletImage= vowel.png
//web_Category= Physics - Waves
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= streaming audio, graphics, AWT-to-Swing

package com.falstad;

import java.awt.AWTEvent;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Insets;
import java.awt.LayoutManager;
import java.awt.Point;
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
import java.util.Random;
import java.util.StringTokenizer;


import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;

import java.applet.Applet;

import com.falstad.Complex;
import com.falstad.FFT;

import javajs.util.JSAudioThread;
import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.CheckboxMenuItem;
import java.awt.Choice;
import java.awt.Dialog;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Menu;
import java.awt.MenuBar;
import java.awt.MenuItem;
import java.awt.Scrollbar;
import java.awt.TextArea;

/*
 * SwingJS note -- BH
 * 
 * This SwingJS applet conversion demonstrates the use of 16-bit streaming stereo
 * audio using a subclassed JSAudioThread. 
 * 
 * The original applet was Java 1.2, preSWING, AWT-only.
 * 
 * Note that in Swing one uses processEvent(), not handleEvent().
 * 
 */

// using a2s classes for pre-Swing AWT controls

public class Vowel extends Applet implements ComponentListener {
	static VowelFrame ogf;

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
		ogf = new VowelFrame(null);
		ogf.init();
	}

	void showFrame() {
		if (ogf == null) {
			started = true;
			try {
				ogf = new VowelFrame(this);
				ogf.init();
			} catch (Exception e) {
				e.printStackTrace();
				ogf = null;
				security = true;
				repaint();
			}
			repaint();
		}
	}

	boolean security = false;

	@Override
	public void paint(Graphics g) {
		super.paint(g);
		String s = "Applet is open in a separate window.";
		if (security)
			s = "Security exception, use nosound version";
		else if (!started)
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
	public void componentShown(ComponentEvent e) { /* showFrame(); */
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

class VowelFrame extends Frame implements ComponentListener, ActionListener,
		AdjustmentListener, MouseMotionListener, MouseListener, ItemListener {

	Dimension winSize;
	Image dbimage;
	View respView, impulseView, phaseView, pipeView, stepView, spectrumView,
			waveformView, poleInfoView, polesView;

	Random random;
	int maxSampleCount = 70; // was 50
	int sampleCountR, sampleCountTh;
	int modeCountR, modeCountTh;
	int maxDispRModes = 5, maxDispThModes = 5;
	public static final double epsilon = .00001;
	public static final double epsilon2 = .003;
	public static final double log10 = 2.30258509299404568401;
	public static int WINDOW_KAISER = 4;
	public static final double soundSpeed = 35396; // cm/sec

	public String getAppletInfo() {
		return "Vowel Series by Paul Falstad";
	}

	Checkbox soundCheck;
	Checkbox displayCheck;
	Checkbox compressCheck;
	Checkbox attenuationCheck;
	Checkbox envelopeCheck;
	Button exportButton;
	ImportDialog impDialog;
	// Checkbox woofCheck;
	CheckboxMenuItem freqCheckItem;
	CheckboxMenuItem phaseCheckItem;
	CheckboxMenuItem spectrumCheckItem;
	CheckboxMenuItem impulseCheckItem;
	CheckboxMenuItem stepCheckItem;
	CheckboxMenuItem waveformCheckItem;
	CheckboxMenuItem logFreqCheckItem;
	CheckboxMenuItem linRespCheckItem;
	CheckboxMenuItem allWaveformCheckItem;
	CheckboxMenuItem ferrisCheckItem;
	MenuItem exitItem;
	Choice filterChooser;
	int selection;
	final int SELECT_RESPONSE = 1;
	final int SELECT_SPECTRUM = 2;
	final int SELECT_PIPE = 3;
	int filterSelection;
	Choice inputChooser;
	Choice windowChooser;
	Choice rateChooser;
	Scrollbar auxBars[];
	Label auxLabels[];
	Label inputLabel;
	Scrollbar inputBar;
	Label kaiserLabel;
	Scrollbar kaiserBar;
	boolean editingFunc;
	boolean dragStop;
	double inputW;
	double step;
	double waveGain = 1. / 65536;
	double outputGain = 1;
	int sampleRate;
	int xpoints[] = new int[4];
	int ypoints[] = new int[4];
	int dragX, dragY;
	int dragStartX, dragStartY;
	int mouseX, mouseY;
	int selectedPole, selectedZero;
	int lastPoleCount = 2, lastZeroCount = 2;
	boolean dragSet, dragClear;
	boolean dragging;
	boolean unstable;
	double pipeRadius[];
	double pipeLen;
	double t;
	int pause;
	Filter curFilter;
	FilterType filterType;
	double spectrumBuf[];
	FFT spectrumFFT;
	Waveform wformInfo;
	PhaseColor phaseColors[];
	static final int phaseColorCount = 50 * 8;
	boolean filterChanged;
	Container main;
	public boolean useFrame;
	boolean showControls;

	class View extends Rectangle {
		public double mult;

		View(Dimension r) {
			super(r);
		}

		View(int a, int b, int c, int d) {
			super(a, b, c, d);
			right = a + c - 1;
			bottom = b + d - 1;
		}

		int right, bottom;

		void drawLabel(Graphics g, String str) {
			g.setColor(Color.white);
			centerString(g, str, y - 5);
		}
	}

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	VowelCanvas cv;
	Vowel applet;
	NumberFormat showFormat;

	VowelFrame(Vowel a) {
		super("Vowel Applet v1.0");
		applet = a;
		useFrame = true;
		showControls = true;
	}

	boolean java2 = false;
	String mp3List[];
	String mp3Error;

	public void init() {
		mp3List = new String[20];
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

		int j;
		int pc8 = phaseColorCount / 8;
		phaseColors = new PhaseColor[phaseColorCount];
		int i;
		for (i = 0; i != 8; i++)
			for (j = 0; j != pc8; j++) {
				double ang = Math.atan(j / (double) pc8);
				phaseColors[i * pc8 + j] = genPhaseColor(i, ang);
			}

		pipeRadius = new double[200];
		for (i = 0; i != 10; i++)
			pipeRadius[i] = 2.828427;
		for (; i != 20; i++)
			pipeRadius[i] = 1;

		main.setLayout(new VowelLayout());
		cv = new VowelCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		main.add(cv);

		MenuBar mb = new MenuBar();
		Menu m = new Menu("File");
		mb.add(m);
		m.add(exitItem = getMenuItem("Exit"));
		m = new Menu("View");
		mb.add(m);
		m.add(freqCheckItem = getCheckItem("Frequency Response", true));
		// m.add(
		phaseCheckItem = getCheckItem("Phase Response", false);
		// );
		m.add(spectrumCheckItem = getCheckItem("Spectrum", true));
		m.add(waveformCheckItem = getCheckItem("Waveform", false));
		m.add(impulseCheckItem = getCheckItem("Impulse Response", false));
		m.add(stepCheckItem = getCheckItem("Step Response", false));
		m.addSeparator();
		m.add(logFreqCheckItem = getCheckItem("Log Frequency Scale", false));
		m.add(allWaveformCheckItem = getCheckItem("Show Entire Waveform", false));
		m.add(ferrisCheckItem = getCheckItem("Ferris Plot", false));
		m.add(linRespCheckItem = getCheckItem("Linear Response Scale", false));

		setMenuBar(mb);

		soundCheck = new Checkbox("Sound On");
		if (java2)
			soundCheck.setState(false);//true);
		else
			soundCheck.disable();
		soundCheck.addItemListener(this);
		main.add(soundCheck);

		displayCheck = new Checkbox("Stop Display");
		displayCheck.addItemListener(this);
		// add(displayCheck);

		compressCheck = new Checkbox("Compress");
		compressCheck.setState(true);
		compressCheck.addItemListener(this);
		// add(compressCheck);

		attenuationCheck = new Checkbox("Attenuation");
		attenuationCheck.setState(true);
		attenuationCheck.addItemListener(this);
		main.add(attenuationCheck);

		envelopeCheck = new Checkbox("Envelope");
		envelopeCheck.setState(true);
		envelopeCheck.addItemListener(this);
		main.add(envelopeCheck);

		/*
		 * woofCheck = new Checkbox("Woof"); woofCheck.addItemListener(this);
		 * add(woofCheck);
		 */

		exportButton = new Button("Import/Export");
		main.add(exportButton);
		exportButton.addActionListener(this);

		main.add(inputChooser = new Choice());
		inputChooser.add("Input = Noise");
		inputChooser.add("Input = Vocal");
		inputChooser.add("Input = Sawtooth");
		inputChooser.add("Input = Periodic Noise");
		inputChooser.add("Input = Triangle Wave");
		inputChooser.add("Input = Square Wave");
		inputChooser.add("Input = Sine Wave");
		inputChooser.add("Input = Sweep");
		inputChooser.add("Input = Impulses");
		for (i = 0; mp3List[i] != null; i++)
			inputChooser.add("Input = " + mp3List[i]);
		inputChooser.select(1);
		inputChooser.addItemListener(this);

		main.add(filterChooser = new Choice());
		filterChooser.add("Filter = ah");
		filterChooser.add("Filter = oh");
		filterChooser.add("Filter = oo");
		filterChooser.add("Filter = ee");
		filterChooser.add("Filter = eh");
		filterChooser.add("Filter = barred-I (Russian vowel)");
		filterChooser.add("Filter = ah (simple)");
		filterChooser.add("Filter = ee (simple)");
		filterChooser.add("Filter = a as in bad (simple)");
		filterChooser.add("Filter = ih (simple)");
		filterChooser.add("Filter = oo (simple)");
		filterChooser.add("Filter = French u (simple)");
		filterChooser.add("Filter = open tube");
		filterChooser.add("Filter = custom");
		filterChooser.add("Filter = none");
		filterChooser.addItemListener(this);
		filterSelection = -1;

		windowChooser = new Choice();
		windowChooser.add("Window = Rectangular");
		windowChooser.add("Window = Hamming");
		windowChooser.add("Window = Hann");
		windowChooser.add("Window = Blackman");
		windowChooser.add("Window = Kaiser");
		windowChooser.add("Window = Bartlett");
		windowChooser.add("Window = Welch");
		windowChooser.addItemListener(this);
		// windowChooser.select(1);

		main.add(rateChooser = new Choice());
		rateChooser.add("Sampling Rate = 8000");
		rateChooser.add("Sampling Rate = 11025");
		rateChooser.add("Sampling Rate = 16000");
		rateChooser.add("Sampling Rate = 22050");
		// rateChooser.add("Sampling Rate = 32000");
		// rateChooser.add("Sampling Rate = 44100");
		rateChooser.select(1);
		sampleRate = 11025;
		rateChooser.addItemListener(this);

		auxLabels = new Label[5];
		auxBars = new Scrollbar[5];
		for (i = 0; i != 5; i++) {
			main.add(auxLabels[i] = new Label("", Label.CENTER));
			main.add(auxBars[i] = new Scrollbar(Scrollbar.HORIZONTAL, 25, 1, 1, 999));
			auxBars[i].addAdjustmentListener(this);
		}

		main.add(inputLabel = new Label("Input Frequency", Label.CENTER));
		main.add(inputBar = new Scrollbar(Scrollbar.HORIZONTAL, 400, 1, 1, 999));
		inputBar.addAdjustmentListener(this);

		main.add(kaiserLabel = new Label("Kaiser Parameter", Label.CENTER));
		main.add(kaiserBar = new Scrollbar(Scrollbar.HORIZONTAL, 500, 1, 1, 999));
		kaiserBar.addAdjustmentListener(this);

		random = new Random();
		setInputLabel();
		reinit();
		cv.setBackground(Color.black);
		cv.setForeground(Color.lightGray);

		showFormat = DecimalFormat.getInstance();
		showFormat.setMaximumFractionDigits(2);

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

		// resize(640, 640);
		// handleResize();
		// Dimension x = getSize();
		// Dimension screen = getToolkit().getScreenSize();
		// setLocation((screen.width - x.width)/2,
		// (screen.height - x.height)/2);
		// show();
	}

	void reinit() {
		setupFilter();
		setInputW();
	}

	MenuItem getMenuItem(String s) {
		MenuItem mi = new MenuItem(s);
		mi.addActionListener(this);
		return mi;
	}

	CheckboxMenuItem getCheckItem(String s, boolean b) {
		CheckboxMenuItem mi = new CheckboxMenuItem(s);
		mi.setState(b);
		mi.addItemListener(this);
		return mi;
	}

	/**
	 *
	 * @param n
	 * @return smallest power of 2 >= n
	 */
	int getPower2(int n) {
		int o = 2;
		while (o < n)
			o *= 2;
		return o;
	}

	PhaseColor genPhaseColor(int sec, double ang) {
		// convert to 0 .. 2*pi angle
		ang += sec * Math.PI / 4;
		// convert to 0 .. 6
		ang *= 3 / Math.PI;
		int hsec = (int) ang;
		double a2 = ang % 1;
		double a3 = 1. - a2;
		PhaseColor c = null;
		switch (hsec) {
		case 6:
		case 0:
			c = new PhaseColor(1, a2, 0);
			break;
		case 1:
			c = new PhaseColor(a3, 1, 0);
			break;
		case 2:
			c = new PhaseColor(0, 1, a2);
			break;
		case 3:
			c = new PhaseColor(0, a3, 1);
			break;
		case 4:
			c = new PhaseColor(a2, 0, 1);
			break;
		case 5:
			c = new PhaseColor(1, 0, a3);
			break;
		}
		return c;
	}

	class PhaseColor {
		public double r, g, b;

		PhaseColor(double rr, double gg, double bb) {
			r = rr;
			g = gg;
			b = bb;
		}
	}

	boolean shown = false;

	public void triggerShow() {
		if (!shown)
			setVisible(true);
		shown = true;
	}

	void handleResize() {
		Dimension d = winSize = cv.getSize();
		if (winSize.width == 0)
			return;
		int ct = 1;
		respView = spectrumView = impulseView = phaseView = stepView = waveformView = pipeView = null;
		if (freqCheckItem.getState())
			ct++;
		if (phaseCheckItem.getState())
			ct++;
		if (spectrumCheckItem.getState())
			ct++;
		if (waveformCheckItem.getState())
			ct++;
		if (impulseCheckItem.getState())
			ct++;
		if (stepCheckItem.getState())
			ct++;
		ct++; // pipe

		int dh3 = d.height / ct;
		dbimage = createImage(d.width, d.height);
		int bd = 15;

		int i = 0;
		if (freqCheckItem.getState())
			respView = getView(i++, ct);
		if (phaseCheckItem.getState())
			phaseView = getView(i++, ct);
		if (spectrumCheckItem.getState())
			spectrumView = getView(i++, ct);
		if (waveformCheckItem.getState())
			waveformView = getView(i++, ct);
		if (impulseCheckItem.getState())
			impulseView = getView(i++, ct);
		if (stepCheckItem.getState())
			stepView = getView(i++, ct);
		pipeView = getView(i++, ct);
		poleInfoView = getView(i++, ct);
		if (poleInfoView.height > 200)
			poleInfoView.height = 200;
		polesView = new View(poleInfoView.x, poleInfoView.y, poleInfoView.height,
				poleInfoView.height);
	}

	View getView(int i, int ct) {
		int dh3 = winSize.height / ct;
		int bd = 5;
		int tpad = 15;
		return new View(bd, bd + i * dh3 + tpad, winSize.width - bd * 2, dh3 - bd
				* 2 - tpad);
	}

	void centerString(Graphics g, String s, int y) {
		FontMetrics fm = g.getFontMetrics();
		g.drawString(s, (winSize.width - fm.stringWidth(s)) / 2, y);
	}

//	public void paintComponent(Graphics g) {
//		cv.repaint();
//	}

	long lastTime;
	double minlog, logrange;

	public void updateVowel(Graphics realg) {
		if (dbimage == null)
			return;
		Graphics g = dbimage.getGraphics();
		if (winSize == null || winSize.width == 0 || dbimage == null)
			return;
		long sysTime = System.currentTimeMillis();
		if (lastTime == 0)
			lastTime = sysTime;
		t += (sysTime - lastTime) * .008;
		lastTime = sysTime;

		if (curFilter == null) {
			Filter f = filterType.genFilter();
			curFilter = f;
			if (audioThread != null)
				audioThread.setFilter(f);
			filterChanged = true;
			unstable = false;
		}

		if (audioThread == null && !unstable && soundCheck.getState()) {
			createAudioThread();
			audioThread.start();
		}

		if (displayCheck.getState())
			return;

		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());

		double minf = 40. / sampleRate;
		minlog = Math.log(minf);
		logrange = Math.log(.5) - minlog;
		Complex cc = new Complex();

		int i;
		if (respView != null) {
			respView.drawLabel(g, "Frequency Response");
			g.setColor(Color.darkGray);
			g.fillRect(respView.x, respView.y, respView.width, respView.height);
			g.setColor(Color.black);
			/*
			 * i = respView.x + respView.width/2; g.drawLine(i, respView.y, i,
			 * respView.y+respView.height);
			 */
			double ym = .069;
			for (i = 0;; i += 2) {
				double q = ym * i;
				if (q > 1)
					break;
				int y = respView.y + (int) (q * respView.height);
				g.drawLine(respView.x, y, respView.right, y);
			}
			for (i = 1;; i++) {
				double ll = logrange - i * Math.log(2);
				int x = 0;
				if (logFreqCheckItem.getState())
					x = (int) (ll * respView.width / logrange);
				else
					x = respView.width / (1 << i);
				if (x <= 0)
					break;
				x += respView.x;
				g.drawLine(x, respView.y, x, respView.bottom);
			}
			g.setColor(Color.white);
			int ox = -1, oy = -1, ox2 = -1, oy2 = -1;
			for (i = 0; i != respView.width; i++) {
				double w = 0;
				if (!logFreqCheckItem.getState())
					w = Math.PI * i / (respView.width);
				else {
					double f = Math.exp(minlog + i * logrange / respView.width);
					w = 2 * Math.PI * f;
				}
				filterType.getResponse(w, cc);
				double bw = cc.magSquared();
				double val = -ym * Math.log(bw * bw) / log10;
				if (linRespCheckItem.getState())
					val = 1 - cc.mag;
				int x = i + respView.x;
				if (val > 1) {
					if (ox != -1)
						g.drawLine(ox, oy, ox, respView.bottom);
					ox = -1;
				} else {
					int y = respView.y + (int) (respView.height * val);
					if (ox != -1)
						g.drawLine(ox, oy, x, y);
					else if (x > respView.x)
						g.drawLine(x, respView.bottom, x, y);
					ox = x;
					oy = y;
				}
			}
		}
		g.setColor(Color.white);

		if (phaseView != null) {
			phaseView.drawLabel(g, "Phase Response");
			g.setColor(Color.darkGray);
			g.fillRect(phaseView.x, phaseView.y, phaseView.width, phaseView.height);
			g.setColor(Color.black);
			for (i = 0; i < 5; i++) {
				double q = i * .25;
				int y = phaseView.y + (int) (q * phaseView.height);
				g.drawLine(phaseView.x, y, phaseView.right, y);
			}
			for (i = 1;; i++) {
				double ll = logrange - i * Math.log(2);
				int x = 0;
				if (logFreqCheckItem.getState())
					x = (int) (ll * phaseView.width / logrange);
				else
					x = phaseView.width / (1 << i);
				if (x <= 0)
					break;
				x += phaseView.x;
				g.drawLine(x, phaseView.y, x, phaseView.bottom);
			}
			g.setColor(Color.white);
			int ox = -1, oy = -1;
			for (i = 0; i != phaseView.width; i++) {
				double w = 0;
				if (!logFreqCheckItem.getState())
					w = Math.PI * i / (phaseView.width);
				else {
					double f = Math.exp(minlog + i * logrange / phaseView.width);
					w = 2 * Math.PI * f;
				}
				filterType.getResponse(w, cc);
				double val = .5 - cc.phase / (2 * Math.PI);
				int y = phaseView.y + (int) (phaseView.height * val);
				int x = i + phaseView.x;
				if (ox != -1)
					g.drawLine(ox, oy, x, y);
				else if (x > phaseView.x)
					g.drawLine(x, phaseView.bottom, x, y);
				ox = x;
				oy = y;
			}
		}

		// BH localize variables to avoid synthetic accessor for inner functions
		// inside for loops
		
		double[] pr = pipeRadius;
		int prlen = pr.length;
		double plen = pipeLen;
		View pv = pipeView;
		
		if (pv != null && filterType instanceof PipeFIRFilter) {
			pv.drawLabel(g, "Cross Section");
			g.setColor(Color.darkGray);
			g.fillRect(pv.x, pv.y, pv.width, pv.height);
			g.setColor(Color.black);
			pv.mult = 1 / 7.;
			for (i = 0; i != 10; i++) {
				double y1 = pv.y + pv.height * (.5 - i * pv.mult);
				if (y1 < pv.y)
					break;
				g.drawLine(0, (int) y1, winSize.width - 1, (int) y1);
				double y2 = pv.y + pv.height * (.5 + i * pv.mult);
				g.drawLine(0, (int) y2, winSize.width - 1, (int) y2);
			}
			for (i = 0; i * .01 <= plen; i++) {
				int xi = pv.x + (int) (pv.width * i * .01 / plen);
				g.drawLine(xi, pv.y, xi, pv.y + pv.height);
			}
			double f = 0;
			double k = 0;
			Complex wave[] = null;
			g.setColor(Color.white);
			if ((respView != null && respView.contains(mouseX, mouseY))
					|| (spectrumView != null && spectrumView.contains(mouseX, mouseY))) {
				f = getFreqFromX(mouseX, respView);
				f *= sampleRate;
				wave = new Complex[prlen + 1];
				calcWave(f, wave);
				k = 2 * Math.PI * f / soundSpeed;
				k *= plen * 100 / prlen;
			}
			for (i = 0; i != prlen; i++) {
				if (f > 0) {
					wave[i].rotate(t);
					double wv = wave[i].re / 2.;
					// int c = (int) (128+127*Math.sin(k*i)*wv);
					int c = (int) (128 + 127 * wv);
					if (c < 0)
						c = 0;
					if (c > 255)
						c = 255;
					g.setColor(new Color(c, c, c));
				}
				int x1 = pv.width * i / prlen + pv.x;
				int x2 = pv.width * (i + 1) /prlen + pv.x;
				int y1 = pv.y
						+ (int) (pv.height * (.5 - pr[i] * pv.mult));
				int y2 = pv.y
						+ (int) (pv.height * (.5 + pr[i] * pv.mult));
				g.fillRect(x1, y1, x2 - x1, y2 - y1);
			}
		}

		int polect = filterType.getPoleCount();
		int zeroct = filterType.getZeroCount();
		int infoX = 10;
		int ph = 0, pw = 0, cx = 0, cy = 0;
		if (poleInfoView != null
				&& (polect > 0 || zeroct > 0 || ferrisCheckItem.getState())) {
			ph = polesView.height / 2;
			pw = ph;
			cx = polesView.x + pw;
			cy = polesView.y + ph;
			infoX = cx + pw + 10;

			if (!ferrisCheckItem.getState()) {
				g.setColor(Color.white);
				FontMetrics fm = g.getFontMetrics();
				String s = "Poles/Zeros";
				g.drawString(s, cx - fm.stringWidth(s) / 2, polesView.y - 5);
				g.drawOval(cx - pw, cy - ph, pw * 2, ph * 2);
				g.drawLine(cx, cy - ph, cx, cy + ph);
				g.drawLine(cx - ph, cy, cx + ph, cy);
				Complex c1 = new Complex();
				for (i = 0; i != polect; i++) {
					filterType.getPole(i, c1);
					g.setColor(i == selectedPole ? Color.yellow : Color.white);
					int c1x = cx + (int) (pw * c1.re);
					int c1y = cy - (int) (ph * c1.im);
					g.drawLine(c1x - 3, c1y - 3, c1x + 3, c1y + 3);
					g.drawLine(c1x - 3, c1y + 3, c1x + 3, c1y - 3);
				}
				for (i = 0; i != zeroct; i++) {
					filterType.getZero(i, c1);
					g.setColor(i == selectedZero ? Color.yellow : Color.white);
					int c1x = cx + (int) (pw * c1.re);
					int c1y = cy - (int) (ph * c1.im);
					g.drawOval(c1x - 3, c1y - 3, 6, 6);
				}
			}
		}
		if (poleInfoView != null) {
			g.setColor(Color.white);
			String info[] = new String[10];
			filterType.getInfo(info);
			for (i = 0; i != 10; i++)
				if (info[i] == null)
					break;
			if (wformInfo.needsFrequency())
				info[i++] = "Input Freq = " + (int) (inputW * sampleRate / (2 * Math.PI))
						+ " Hz";
			/*
			 * info[i++] = "Output adjust = " +
			 * showFormat.format(-10*Math.log(outputGain)/Math.log(.1)) + " dB";
			 */
			for (i = 0; i != 10; i++) {
				if (info[i] == null)
					break;
				g.drawString(info[i], infoX, poleInfoView.y + 5 + 20 * i);
			}
			if ((respView != null && respView.contains(mouseX, mouseY))
					|| (spectrumView != null && spectrumView.contains(mouseX, mouseY))) {
				double f = getFreqFromX(mouseX, respView);
				if (f >= 0) {
					double fw = 2 * Math.PI * f;
					f *= sampleRate;
					g.setColor(Color.yellow);
					String s = "f = " + (int) f;
					if (respView.contains(mouseX, mouseY)) {
						filterType.getResponse(fw, cc);
						double bw = cc.magSquared();
						bw = Math.log(bw * bw) / (2 * log10);
						s += " Hz, " + showFormat.format(10 * bw) + " dB, \u03bb = ";
						s += showFormat.format(soundSpeed / f) + " cm";
					}
					g.drawString(s, infoX, poleInfoView.y + 5 + 20 * i);
					if (ph > 0) {
						int x = cx + (int) (pw * Math.cos(fw));
						int y = cy - (int) (pw * Math.sin(fw));
						if (ferrisCheckItem.getState()) {
							g.setColor(Color.black);
							g.fillOval(x - 3, y - 3, 7, 7);
						}
						g.setColor(Color.yellow);
						g.fillOval(x - 2, y - 2, 5, 5);
					}
				}
			}
		}

		if (impulseView != null) {
			impulseView.drawLabel(g, "Impulse Response");
			g.setColor(Color.darkGray);
			g.fillRect(impulseView.x, impulseView.y, impulseView.width,
					impulseView.height);
			g.setColor(Color.black);
			g.drawLine(impulseView.x, impulseView.y + impulseView.height / 2,
					impulseView.x + impulseView.width - 1, impulseView.y
							+ impulseView.height / 2);
			g.setColor(Color.white);
			int offset = curFilter.getImpulseOffset();
			double impBuf[] = curFilter.getImpulseResponse(offset);
			int len = curFilter.getImpulseLen(offset, impBuf);
			int ox = -1, oy = -1;
			double mult = .5 / max(impBuf);
			int flen = (len < 50) ? 50 : len;
			if (len < flen && flen < impBuf.length - offset)
				len = flen;
			// System.out.println("cf " + offset + " " + len + " " + impBuf.length);
			for (i = 0; i != len; i++) {
				int k = offset + i;
				double q = impBuf[k] * mult;
				int y = impulseView.y + (int) (impulseView.height * (.5 - q));
				int x = impulseView.x + impulseView.width * i / flen;
				if (len < 100) {
					g.drawLine(x, impulseView.y + impulseView.height / 2, x, y);
					g.fillOval(x - 2, y - 2, 5, 5);
				} else {
					if (ox != -1)
						g.drawLine(ox, oy, x, y);
					ox = x;
					oy = y;
				}
			}
		}

		if (stepView != null) {
			stepView.drawLabel(g, "Step Response");
			g.setColor(Color.darkGray);
			g.fillRect(stepView.x, stepView.y, stepView.width, stepView.height);
			g.setColor(Color.black);
			g.drawLine(stepView.x, stepView.y + stepView.height / 2, stepView.x
					+ stepView.width - 1, stepView.y + stepView.height / 2);
			g.setColor(Color.white);
			int offset = curFilter.getStepOffset();
			double impBuf[] = curFilter.getStepResponse(offset);
			int len = curFilter.getStepLen(offset, impBuf);
			int ox = -1, oy = -1;
			double mult = .5 / max(impBuf);
			int flen = (len < 50) ? 50 : len;
			if (len < flen && flen < impBuf.length - offset)
				len = flen;
			// System.out.println("cf " + offset + " " + len + " " + impBuf.length);
			for (i = 0; i != len; i++) {
				int k = offset + i;
				double q = impBuf[k] * mult;
				int y = stepView.y + (int) (stepView.height * (.5 - q));
				int x = stepView.x + stepView.width * i / flen;
				if (len < 100) {
					g.drawLine(x, stepView.y + stepView.height / 2, x, y);
					g.fillOval(x - 2, y - 2, 5, 5);
				} else {
					if (ox != -1)
						g.drawLine(ox, oy, x, y);
					ox = x;
					oy = y;
				}
			}
		}

		if (audioThread != null) {
			int splen = audioThread.spectrumLen;
			if (spectrumBuf == null || spectrumBuf.length != splen * 2)
				spectrumBuf = new double[splen * 2];
			int off = audioThread.spectrumOffset;
			int i2;
			int mask = audioThread.fbufmask;
			for (i = i2 = 0; i != splen; i++, i2 += 2) {
				int o = mask & (off + i);
				spectrumBuf[i2] = audioThread.fbufLo[o] + audioThread.fbufRo[o];
				spectrumBuf[i2 + 1] = 0;
			}
		} else
			spectrumBuf = null;

		if (waveformView != null && spectrumBuf != null) {
			waveformView.drawLabel(g, "Waveform");
			g.setColor(Color.darkGray);
			g.fillRect(waveformView.x, waveformView.y, waveformView.width,
					waveformView.height);
			g.setColor(Color.black);
			g.drawLine(waveformView.x, waveformView.y + waveformView.height / 2,
					waveformView.x + waveformView.width - 1, waveformView.y
							+ waveformView.height / 2);
			g.setColor(Color.white);
			int ox = -1, oy = -1;

			if (waveGain < .1)
				waveGain = .1;
			double max = 0;
			for (i = 0; i != spectrumBuf.length; i += 2) {
				if (spectrumBuf[i] > max)
					max = spectrumBuf[i];
				if (spectrumBuf[i] < -max)
					max = -spectrumBuf[i];
			}
			if (waveGain > 1 / max)
				waveGain = 1 / max;
			else if (waveGain * 1.05 < 1 / max)
				waveGain *= 1.05;
			double mult = .5 * waveGain;
			int nb = waveformView.width;
			if (nb > spectrumBuf.length || allWaveformCheckItem.getState())
				nb = spectrumBuf.length;
			for (i = 0; i < nb; i += 2) {
				double bf = .5 - spectrumBuf[i] * mult;
				int ya = (int) (waveformView.height * bf);
				if (ya > waveformView.height) {
					ox = -1;
					continue;
				}
				int y = waveformView.y + ya;
				int x = waveformView.x + i * waveformView.width / nb;
				if (ox != -1)
					g.drawLine(ox, oy, x, y);
				ox = x;
				oy = y;
			}
		}

		if (spectrumView != null && spectrumBuf != null) {
			spectrumView.drawLabel(g, "Spectrum");
			g.setColor(Color.darkGray);
			g.fillRect(spectrumView.x, spectrumView.y, spectrumView.width,
					spectrumView.height);
			g.setColor(Color.black);
			double ym = .138;
			for (i = 0;; i++) {
				double q = ym * i;
				if (q > 1)
					break;
				int y = spectrumView.y + (int) (q * spectrumView.height);
				g.drawLine(spectrumView.x, y, spectrumView.x + spectrumView.width, y);
			}
			for (i = 1;; i++) {
				double ll = logrange - i * Math.log(2);
				int x = 0;
				if (logFreqCheckItem.getState())
					x = (int) (ll * spectrumView.width / logrange);
				else
					x = spectrumView.width / (1 << i);
				if (x <= 0)
					break;
				x += spectrumView.x;
				g.drawLine(x, spectrumView.y, x, spectrumView.bottom);
			}

			g.setColor(Color.white);
			int isub = spectrumBuf.length / 2;
			double cosmult = 2 * Math.PI / (spectrumBuf.length - 2);
			for (i = 0; i != spectrumBuf.length; i += 2) {
				double ht = .54 - .46 * Math.cos(i * cosmult);
				spectrumBuf[i] *= ht;
			}
			if (spectrumFFT == null
					|| spectrumFFT.getSize() != isub)
				spectrumFFT = new FFT(isub);
			spectrumFFT.transform(spectrumBuf, false);
//			double logmult = spectrumView.width
//					/ Math.log(isub + 1);

//			int ox = -1, oy = -1;
			double bufmult = 1. / isub;
			// if (logAmpCheckItem.getState())
			bufmult /= 65536;
			bufmult *= bufmult;

			double specArray[] = new double[spectrumView.width];
			if (logFreqCheckItem.getState()) {
				// freq = i*rate/(spectrumBuf.length)
				// min frequency = 40 Hz
				for (i = 0; i != isub; i += 2) {
					double f = i / (double) spectrumBuf.length;
					int ix = (int) (specArray.length * (Math.log(f) - minlog) / logrange);
					if (ix < 0)
						continue;
					specArray[ix] += spectrumBuf[i] * spectrumBuf[i] + spectrumBuf[i + 1]
							* spectrumBuf[i + 1];
				}
			} else {
				for (i = 0; i != isub; i += 2) {
					int ix = specArray.length * i / isub;
					specArray[ix] += spectrumBuf[i] * spectrumBuf[i] + spectrumBuf[i + 1]
							* spectrumBuf[i + 1];
				}
			}

			int maxi = specArray.length;
			for (i = 0; i != spectrumView.width; i++) {
				double bf = specArray[i] * bufmult;
				bf = -ym * Math.log(bf) / log10;

				int ya = (int) (spectrumView.height * bf);
				if (ya > spectrumView.height)
					continue;
				int y = spectrumView.y + ya;
				int x = spectrumView.x + i * spectrumView.width / maxi;
				g.drawLine(x, y, x, spectrumView.y + spectrumView.height - 1);
			}
		}
		if (spectrumView != null && !java2) {
			g.setColor(Color.white);
			centerString(g, "Need java 2 for sound", spectrumView.y
					+ spectrumView.height / 2);
		}

		if (unstable) {
			g.setColor(Color.red);
			centerString(g, "Filter is unstable", winSize.height / 2);
		}
		if (mp3Error != null) {
			g.setColor(Color.red);
			centerString(g, mp3Error, winSize.height / 2 + 20);
		}

		if (respView != null && respView.contains(mouseX, mouseY)) {
			g.setColor(Color.yellow);
			g.drawLine(mouseX, respView.y, mouseX, respView.y + respView.height - 1);
		}
		if (spectrumView != null && spectrumView.contains(mouseX, mouseY)) {
			g.setColor(Color.yellow);
			g.drawLine(mouseX, spectrumView.y, mouseX, spectrumView.y
					+ spectrumView.height - 1);
		}
		filterChanged = false;

		realg.drawImage(dbimage, 0, 0, this);
	}

	void calcWave(double f, Complex wave[]) {
		int ll[] = new int[pipeRadius.length + 1];
		for (int i = 0; i != ll.length; i++)
			ll[i] = i;
		double resp[] = new double[2];
		genPipeResponse(pipeRadius, f * 2, ll, resp, wave);
		double m = 1 / wave[0].mag;
		for (int i = wave.length; --i >= 0;)
			wave[i].multRe(m);
	}

	void setCutoff(double f) {
	}

	int countPoints(double buf[], int offset) {
		int len = buf.length;
		double max = 0;
		int i;
		int result = 0;
		double last = 123;
		for (i = offset; i < len; i++) {
			double qa = Math.abs(buf[i]);
			if (qa > max)
				max = qa;
			if (Math.abs(qa - last) > max * .003) {
				result = i - offset + 1;
				// System.out.println(qa + " " + last + " " + i + " " + max);
			}
			last = qa;
		}
		return result;
	}

	double max(double buf[]) {
		int i;
		double max = 0;
		for (i = 0; i != buf.length; i++) {
			double qa = Math.abs(buf[i]);
			if (qa > max)
				max = qa;
		}
		return max;
	}

	// get freq (from 0 to .5) given an x coordinate
	double getFreqFromX(int x, View v) {
		double f = .5 * (x - v.x) / (double) v.width;
		if (f <= 0 || f >= .5)
			return -1;
		if (logFreqCheckItem.getState())
			return Math.exp(minlog + 2 * f * logrange);
		return f;
	}

	void setupFilter() {
		int filt = filterChooser.getSelectedIndex();
		switch (filt) {
		case 0:
			filterType = new AVowelFilter();
			break;
		case 1:
			filterType = new OVowelFilter();
			break;
		case 2:
			filterType = new UVowelFilter();
			break;
		case 3:
			filterType = new IVowelFilter();
			break;
		case 4:
			filterType = new EVowelFilter();
			break;
		case 5:
			filterType = new IBarVowelFilter();
			break;
		case 6:
			filterType = new AVowelFilterSimple();
			break;
		case 7:
			filterType = new IVowelFilterSimple();
			break;
		case 8:
			filterType = new AEVowelFilterSimple();
			break;
		case 9:
			filterType = new IhVowelFilterSimple();
			break;
		case 10:
			filterType = new OoVowelFilterSimple();
			break;
		case 11:
			filterType = new YVowelFilterSimple();
			break;
		// case 8: filterType = new UrVowelFilterSimple(); break;

		case 12:
			filterType = new OpenTubeFilter();
			break;
		case 13:
			filterType = new CustomFilter();
			break;
		case 14:
			filterType = new NoFilter();
			break;
		}
		if (filterSelection != filt) {
			filterSelection = filt;
			int i;
			for (i = 0; i != auxBars.length; i++)
				auxBars[i].setMaximum(999);
			int ax = filterType.select();
			for (i = 0; i != ax; i++) {
				auxLabels[i].show();
				auxBars[i].show();
			}
			for (i = ax; i != auxBars.length; i++) {
				auxLabels[i].hide();
				auxBars[i].hide();
			}
			if (filterType.needsWindow()) {
				windowChooser.show();
				setWindow();
			} else {
				windowChooser.hide();
				setWindow();
			}
			validate();
		}
		filterType.setup();
		curFilter = null;
	}

	void setInputLabel() {
		wformInfo = getWaveformObject();
		String inText = wformInfo.getInputText();
		if (inText == null) {
			inputLabel.hide();
			inputBar.hide();
		} else {
			inputLabel.setText(inText);
			inputLabel.show();
			inputBar.show();
		}
		validate();
	}

	Waveform getWaveformObject() {
		Waveform wform;
		int ic = inputChooser.getSelectedIndex();
		switch (ic) {
		case 0:
			wform = new NoiseWaveform();
			break;
		case 1:
			wform = new VocalWaveform();
			break;
		case 2:
			wform = new SawtoothWaveform();
			break;
		case 3:
			wform = new PeriodicNoiseWaveform();
			break;
		case 4:
			wform = new TriangleWaveform();
			break;
		case 5:
			wform = new SquareWaveform();
			break;
		case 6:
			wform = new SineWaveform();
			break;
		case 7:
			wform = new SweepWaveform();
			break;
		case 8:
			wform = new ImpulseWaveform();
			break;
		default:
			wform = new NoiseWaveform();
			break;
		}
		return wform;
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
		if (e.getSource() == exitItem) {
			destroyFrame();
			return;
		}
		if (e.getSource() == exportButton)
			doImport();
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		if ((e.getSource()) != inputBar)
			setupFilter();
		System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
		if ((e.getSource()) == inputBar)
			setInputW();
		cv.repaint(pause);
	}

	void setInputW() {
		inputW = Math.PI * inputBar.getValue() / 1000.;
		inputW /= 20;
	}

	@Override
	public void processEvent(AWTEvent ev) {
		if (ev.getID() == Event.WINDOW_DESTROY) {
			destroyFrame();
			return;
		}
		super.processEvent(ev);
	}

	void destroyFrame() {
		requestAudioShutdown();
		if (applet == null)
			dispose();
		else
			applet.destroyFrame();
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		mouseX = e.getX();
		mouseY = e.getY();
		edit(e);
		cv.repaint(pause);
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		dragX = mouseX = e.getX();
		dragY = mouseY = e.getY();
		cv.repaint(pause);
		// BH added "else" here -- no need to check multiple times
		if (respView != null && respView.contains(e.getX(), e.getY()))
			selection = SELECT_RESPONSE;
		else if (spectrumView != null && spectrumView.contains(e.getX(), e.getY()))
			selection = SELECT_SPECTRUM;
		else if (pipeView != null && pipeView.contains(e.getX(), e.getY()))
			selection = SELECT_PIPE;
	}

	void selectPoleZero(int x, int y) {
		selectedPole = selectedZero = -1;
		int i;
		int ph = polesView.height / 2;
		int pw = ph;
		int cx = polesView.x + pw;
		int cy = polesView.y + ph;
		Complex c1 = new Complex();
		int polect = filterType.getPoleCount();
		int zeroct = filterType.getZeroCount();
		int bestdist = 10000;
		for (i = 0; i != polect; i++) {
			filterType.getPole(i, c1);
			int c1x = cx + (int) (pw * c1.re);
			int c1y = cy - (int) (ph * c1.im);
			int dist = distanceSq(c1x, c1y, x, y);
			if (dist <= bestdist) {
				bestdist = dist;
				selectedPole = i;
				selectedZero = -1;
			}
		}
		for (i = 0; i != zeroct; i++) {
			filterType.getZero(i, c1);
			int c1x = cx + (int) (pw * c1.re);
			int c1y = cy - (int) (ph * c1.im);
			int dist = distanceSq(c1x, c1y, x, y);
			if (dist < bestdist) {
				bestdist = dist;
				selectedPole = -1;
				selectedZero = i;
			}
		}
	}

	int distanceSq(int x1, int y1, int x2, int y2) {
		return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
	}

	@Override
	public void mouseClicked(MouseEvent e) {
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
		edit(e);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
	}

	void edit(MouseEvent e) {
		/*
		 * if (selection == SELECT_RESPONSE) { double f = getFreqFromX(e.getX(),
		 * respView); if (f < 0) return; filterType.setCutoff(f); setupFilter(); }
		 */
		if (selection == SELECT_SPECTRUM) {
			if (!wformInfo.needsFrequency())
				return;
			double f = getFreqFromX(e.getX(), spectrumView);
			if (f < 0)
				return;
			inputW = 2 * Math.PI * f;
			inputBar.setValue((int) (2000 * f));
		}
		if (selection == SELECT_PIPE) {
			filterChooser.select(13);
			editPipe(e);
		}
	}

	void editPipe(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		if (dragX == x) {
			editPipePoint(x, y);
			dragY = y;
		} else {
			// need to draw a line from old x,y to new x,y and
			// call editPipePoint for each point on that line. yuck.
			int x1 = (x < dragX) ? x : dragX;
			int y1 = (x < dragX) ? y : dragY;
			int x2 = (x > dragX) ? x : dragX;
			int y2 = (x > dragX) ? y : dragY;
			dragX = x;
			dragY = y;
			for (x = x1; x <= x2; x++) {
				y = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
				editPipePoint(x, y);
			}
		}
		setupFilter();
	}

	void editPipePoint(int x, int y) {
		int xx = (x - pipeView.x) * pipeRadius.length / pipeView.width;
		if (xx < 0 || xx >= pipeRadius.length)
			return;
		double yy = (y - pipeView.y) / (double) pipeView.height;
		yy = (.5 - yy) / pipeView.mult;
		pipeRadius[xx] = Math.abs(yy);
	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		filterChanged = true;
		if (e.getSource() == displayCheck) {
			cv.repaint(pause);
			return;
		}
		if (e.getSource() == inputChooser) {
			requestAudioShutdown();
			setInputLabel();
		}
		if ((e.getSource()) == rateChooser) {
			requestAudioShutdown();
			inputW *= sampleRate;
			switch (rateChooser.getSelectedIndex()) {
			case 0:
				sampleRate = 8000;
				break;
			case 1:
				sampleRate = 11025;
				break;
			case 2:
				sampleRate = 16000;
				break;
			case 3:
				sampleRate = 22050;
				break;
			case 4:
				sampleRate = 32000;
				break;
			case 5:
				sampleRate = 44100;
				break;
			}
			inputW /= sampleRate;
		}
		if ((e.getSource()) == windowChooser)
			setWindow();
		if (e.getSource() instanceof CheckboxMenuItem)
			handleResize();
		else
			setupFilter();
		cv.repaint(pause);
	}

	void setWindow() {
		if (windowChooser.getSelectedIndex() == WINDOW_KAISER
				&& filterType.needsWindow()) {
			kaiserLabel.show();
			kaiserBar.show();
		} else {
			kaiserLabel.hide();
			kaiserBar.hide();
		}
		validate();
	}

	void setSampleRate(int r) {
		int x = 0;
		switch (r) {
		case 8000:
			x = 0;
			break;
		case 11025:
			x = 1;
			break;
		case 16000:
			x = 2;
			break;
		case 22050:
			x = 3;
			break;
		case 32000:
			x = 4;
			break;
		case 44100:
			x = 5;
			break;
		}
		rateChooser.select(x);
		sampleRate = r;
	}

	abstract class Waveform {
		short buffer[];

		boolean start() {
			return true;
		}

		abstract int getData();

		int getChannels() {
			return 2;
		}

		void getBuffer() {
			buffer = new short[getPower2(sampleRate / 12) * getChannels()];
		}

		String getInputText() {
			return "Input Frequency";
		}

		boolean needsFrequency() {
			return true;
		}
	}

	class NoiseWaveform extends Waveform {
		@Override
		boolean start() {
			getBuffer();
			return true;
		}

		@Override
		int getData() {
			int i;
			for (i = 0; i != buffer.length; i++)
				buffer[i] = (short) random.nextInt();
			return buffer.length;
		}

		@Override
		String getInputText() {
			return null;
		}

		@Override
		boolean needsFrequency() {
			return false;
		}
	}

	class PeriodicNoiseWaveform extends Waveform {
		short smbuf[];
		int ix;

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			smbuf = new short[1];
			ix = 0;
			return true;
		}

		@Override
		int getData() {
			int period = (int) (2 * Math.PI / inputW);
			if (period != smbuf.length) {
				smbuf = new short[period];
				int i;
				for (i = 0; i != period; i++)
					smbuf[i] = (short) random.nextInt();
			}
			int i;
			for (i = 0; i != buffer.length; i++, ix++) {
				if (ix >= period)
					ix = 0;
				buffer[i] = smbuf[ix];
			}
			return buffer.length;
		}
	}

	class SineWaveform extends Waveform {
		int ix;

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			ix = 0;
			return true;
		}

		@Override
		int getData() {
			int i;
			for (i = 0; i != buffer.length; i++) {
				ix++;
				buffer[i] = (short) (Math.sin(ix * inputW) * 32000);
			}
			return buffer.length;
		}
	}

	class TriangleWaveform extends Waveform {
		int ix;
		short smbuf[];

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			ix = 0;
			smbuf = new short[1];
			return true;
		}

		@Override
		int getData() {
			int i;
			int period = (int) (2 * Math.PI / inputW);
			if (period != smbuf.length) {
				smbuf = new short[period];
				double p2 = period / 2.;
				for (i = 0; i < p2; i++)
					smbuf[i] = (short) (i / p2 * 64000 - 32000);
				for (; i != period; i++)
					smbuf[i] = (short) ((2 - i / p2) * 64000 - 32000);
			}
			for (i = 0; i != buffer.length; i++, ix++) {
				if (ix >= period)
					ix = 0;
				buffer[i] = smbuf[ix];
			}
			return buffer.length;
		}
	}

	class SawtoothWaveform extends Waveform {
		int ix;
		short smbuf[];

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			ix = 0;
			smbuf = new short[1];
			return true;
		}

		@Override
		int getData() {
			int i;
			int period = (int) (2 * Math.PI / inputW);
			if (period != smbuf.length) {
				smbuf = new short[period];
				double p2 = period / 2.;
				for (i = 0; i != period; i++)
					smbuf[i] = (short) ((i / p2 - 1) * 32000);
			}
			for (i = 0; i != buffer.length; i++, ix++) {
				if (ix >= period)
					ix = 0;
				buffer[i] = smbuf[ix];
			}
			return buffer.length;
		}
	}

	class VocalWaveform extends Waveform {
		int ix;

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			ix = 0;
			return true;
		}

		int period = 0;
		double p2 = 0;

		@Override
		int getData() {
			int i;
			for (i = 0; i != buffer.length; i++, ix++) {
				if (ix >= period) {
					ix = 0;
					period = (int) (2 * Math.PI / inputW);
					period += getrand(3) - 1;
					p2 = period / 2;
				}
				buffer[i] = (short) ((ix / p2 - 1) * 32000);
			}
			return buffer.length;
		}
	}

	class SquareWaveform extends Waveform {
		int ix;
		double omega;
		short smbuf[];

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			ix = 0;
			smbuf = new short[1];
			return true;
		}

		@Override
		int getData() {
			int i;
			int period = (int) (2 * Math.PI / inputW);
			if (period != smbuf.length) {
				smbuf = new short[period];
				for (i = 0; i != period / 2; i++)
					smbuf[i] = 32000;
				if ((period & 1) > 0)
					smbuf[i++] = 0;
				for (; i != period; i++)
					smbuf[i] = -32000;
			}
			for (i = 0; i != buffer.length; i++, ix++) {
				if (ix >= period)
					ix = 0;
				buffer[i] = smbuf[ix];
			}
			return buffer.length;
		}
	}

	class SweepWaveform extends Waveform {
		int ix;
		double omega, nextOmega, t, startOmega;

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			ix = 0;
			startOmega = nextOmega = omega = 2 * Math.PI * 40 / sampleRate;
			t = 0;
			return true;
		}

		@Override
		int getData() {
			int i;
			double nmul = 1;
			double nadd = 0;
			double maxspeed = 1 / (.66 * sampleRate);
			double minspeed = 1 / (sampleRate * 16);
			if (logFreqCheckItem.getState())
				nmul = Math
						.pow(2 * Math.PI / startOmega, 2 * (minspeed + (maxspeed - minspeed)
								* inputBar.getValue() / 1000.));
			else
				nadd = (2 * Math.PI - startOmega)
						* (minspeed + (maxspeed - minspeed) * inputBar.getValue() / 1000.);
			for (i = 0; i != buffer.length; i++) {
				ix++;
				t += omega;
				if (t > 2 * Math.PI) {
					t -= 2 * Math.PI;
					omega = nextOmega;
					if (nextOmega > Math.PI)
						omega = nextOmega = startOmega;
				}
				buffer[i] = (short) (Math.sin(t) * 32000);
				nextOmega = nextOmega * nmul + nadd;
			}
			return buffer.length;
		}

		@Override
		String getInputText() {
			return "Sweep Speed";
		}

		@Override
		boolean needsFrequency() {
			return false;
		}
	}

	class ImpulseWaveform extends Waveform {
		int ix;

		@Override
		int getChannels() {
			return 1;
		}

		@Override
		boolean start() {
			getBuffer();
			ix = 0;
			return true;
		}

		@Override
		int getData() {
			int i;
			int ww = inputBar.getValue() / 51 + 1;
			int period = 10000 / ww;
			for (i = 0; i != buffer.length; i++) {
				short q = 0;
				if (ix % period == 0)
					q = 32767;
				ix++;
				buffer[i] = q;
			}
			return buffer.length;
		}

		@Override
		String getInputText() {
			return "Impulse Frequency";
		}

		@Override
		boolean needsFrequency() {
			return false;
		}
	}


	abstract class Filter {
		abstract void run(double inBuf[], double outBuf[], int bp, int mask,
				int count, double x[]);

		abstract void evalTransfer(Complex c);

		abstract int getImpulseOffset();

		abstract int getStepOffset();

		abstract int getLength();

		boolean useConvolve() {
			return false;
		}

		double[] getImpulseResponse(int offset) {
			int pts = 1000;
			double inbuf[] = new double[offset + pts];
			double outbuf[] = new double[offset + pts];
			inbuf[offset] = 1;
			double state[] = createState();
			run(inbuf, outbuf, offset, ~0, pts, state);
			return outbuf;
		}

		double[] getStepResponse(int offset) {
			int pts = 1000;
			double inbuf[] = new double[offset + pts];
			double outbuf[] = new double[offset + pts];
			int i;
			for (i = offset; i != inbuf.length; i++)
				inbuf[i] = 1;
			double state[] = createState();
			run(inbuf, outbuf, offset, ~0, pts, state);
			return outbuf;
		}

		int getImpulseLen(int offset, double buf[]) {
			return countPoints(buf, offset);
		}

		int getStepLen(int offset, double buf[]) {
			return countPoints(buf, offset);
		}

		double[] createState() {
			return null;
		}
	}

	class DirectFilter extends Filter {
		double aList[], bList[];
		int nList[];

		DirectFilter() {
			aList = new double[] { 1 };
			bList = null;
			nList = new int[] { 0 };
		}

		@Override
		int getLength() {
			return aList.length;
		}

		@Override
		boolean useConvolve() {
			return bList == null && aList.length > 25;
		}

		void dump() {
			System.out.print("a ");
			dump(aList);
			if (bList != null) {
				System.out.print("b ");
				dump(bList);
			}
		}

		void dump(double x[]) {
			int i;
			for (i = 0; i != x.length; i++)
				System.out.print(x[i] + " ");
			System.out.println("");
		}

		Complex czn, top, bottom;

		@Override
		void evalTransfer(Complex c) {
			if (czn == null) {
				czn = new Complex();
				top = new Complex();
				bottom = new Complex();
			}
			int i, j;
			czn.setRe(1);
			top.setRe(0);
			bottom.setRe(0);
			int n = 0;
			for (i = 0; i != aList.length; i++) {
				int n1 = nList[i];
				while (n < n1) {
					if (n + 3 < n1) {
						czn.set(c);
						czn.pow(-n1);
						n = n1;
						break;
					}
					czn.divide(c);
					n++;
				}
				top.scaleAdd(aList[i], czn);
				if (bList != null)
					bottom.scaleAdd(bList[i], czn);
			}
			if (bList != null)
				top.divide(bottom);
			c.set(top);
		}

		@Override
		void run(double inBuf[], double outBuf[], int bp, int mask, int count,
				double state[]) {
			int j;
			int fi2 = bp, i20;
			double q = 0;

			int i2;
			for (i2 = 0; i2 != count; i2++) {
				fi2 = bp + i2;
				i20 = fi2 & mask;

				q = inBuf[i20] * aList[0];
				if (bList == null) {
					for (j = 1; j < aList.length; j++) {
						int ji = (fi2 - nList[j]) & mask;
						q += inBuf[ji] * aList[j];
					}
				} else {
					for (j = 1; j < aList.length; j++) {
						int ji = (fi2 - nList[j]) & mask;
						q += inBuf[ji] * aList[j] - outBuf[ji] * bList[j];
					}
				}
				outBuf[i20] = q;
			}
		}

		boolean isSimpleAList() {
			if (bList != null)
				return false;
			return nList[nList.length - 1] == nList.length - 1;
		}

		@Override
		int getImpulseOffset() {
			if (isSimpleAList())
				return 0;
			return getStepOffset();
		}

		@Override
		int getStepOffset() {
			int i;
			int offset = 0;
			for (i = 0; i != aList.length; i++)
				if (nList[i] > offset)
					offset = nList[i];
			return offset;
		}

		@Override
		double[] getImpulseResponse(int offset) {
			if (isSimpleAList())
				return aList;
			return super.getImpulseResponse(offset);
		}

		@Override
		int getImpulseLen(int offset, double buf[]) {
			if (isSimpleAList())
				return aList.length;
			return countPoints(buf, offset);
		}
	}

	class CascadeFilter extends Filter {
		
		CascadeFilter(int s) {
			size = s;
			a1 = new double[s];
			a2 = new double[s];
			b0 = new double[s];
			b1 = new double[s];
			b2 = new double[s];
			int i;
			for (i = 0; i != s; i++)
				b0[i] = 1;
		}

		double a1[], a2[], b0[], b1[], b2[];
		int size;

		@Override
		double[] createState() {
			return new double[size * 3];
		}

		void setAStage(double x1, double x2) {
			int i;
			for (i = 0; i != size; i++) {
				if (a1[i] == 0 && a2[i] == 0) {
					a1[i] = x1;
					a2[i] = x2;
					return;
				}
				if (a2[i] == 0 && x2 == 0) {
					a2[i] = -a1[i] * x1;
					a1[i] += x1;
					// System.out.println("setastate " + i + " " + a1[i] + " " + a2[i]);
					return;
				}
			}
			System.out.println("setAStage failed");
		}

		void setBStage(double x0, double x1, double x2) {
			// System.out.println("setting b " + i + " "+ x0 + " "+ x1 + " "+ x2 + " "
			// + size);
			int i;
			for (i = 0; i != size; i++) {
				if (b1[i] == 0 && b2[i] == 0) {
					b0[i] = x0;
					b1[i] = x1;
					b2[i] = x2;
					// System.out.println("setbstage " + i + " " + x0 + " " + x1 + " " +
					// x2);
					return;
				}
				if (b2[i] == 0 && x2 == 0) {
					// (b0 + z b1)(x0 + z x1) = (b0 x0 + (b1 x0+b0 x1) z + b1 x1 z^2)
					b2[i] = b1[i] * x1;
					b1[i] = b1[i] * x0 + b0[i] * x1;
					b0[i] *= x0;
					// System.out.println("setbstage " + i + " " + b0[i]+" "+b1[i] + " " +
					// b2[i]);
					return;
				}
			}
			System.out.println("setBStage failed");
		}

		@Override
		void run(double inBuf[], double outBuf[], int bp, int mask, int count,
				double state[]) {
			int fi2, i20;
			int i2, j;
			double in = 0, d2, d1, d0;
			for (i2 = 0; i2 != count; i2++) {
				fi2 = bp + i2;
				i20 = fi2 & mask;
				in = inBuf[i20];
				for (j = 0; j != size; j++) {
					int j3 = j * 3;
					d2 = state[j3 + 2] = state[j3 + 1];
					d1 = state[j3 + 1] = state[j3];
					d0 = state[j3] = in + a1[j] * d1 + a2[j] * d2;
					in = b0[j] * d0 + b1[j] * d1 + b2[j] * d2;
				}
				outBuf[i20] = in;
			}
		}

		Complex cm2, cm1, top, bottom;

		@Override
		void evalTransfer(Complex c) {
			if (cm1 == null) {
				cm1 = new Complex();
				cm2 = new Complex();
				top = new Complex();
				bottom = new Complex();
			}
			int i;
			cm1.set(c);
			cm1.recip();
			cm2.set(cm1);
			cm2.square();
			c.setRe(1);
			for (i = 0; i != size; i++) {
				top.setRe(b0[i]);
				top.scaleAdd(b1[i], cm1);
				top.scaleAdd(b2[i], cm2);
				bottom.setRe(1);
				bottom.scaleAdd(-a1[i], cm1);
				bottom.scaleAdd(-a2[i], cm2);
				c.mult(top);
				c.divide(bottom);
			}
		}

		@Override
		int getImpulseOffset() {
			return 0;
		}

		@Override
		int getStepOffset() {
			return 0;
		}

		@Override
		int getLength() {
			return 1;
		}
	}

	abstract class FilterType {
		int select() {
			return 0;
		}

		void setup() {
		}

		abstract void getResponse(double w, Complex c);

		int getPoleCount() {
			return 0;
		}

		int getZeroCount() {
			return 0;
		}

		void getPole(int i, Complex c) {
			c.setRe(0);
		}

		void getZero(int i, Complex c) {
			c.setRe(0);
		}

		abstract Filter genFilter();

		void getInfo(String x[]) {
		}

		boolean needsWindow() {
			return false;
		}

		void setCutoff(double f) {
			auxBars[0].setValue((int) (2000 * f));
		}
	}

	String getOmegaText(double wc) {
		return ((int) (wc * sampleRate / (2 * Math.PI))) + " Hz";
	}

	abstract class FIRFilterType extends FilterType {
		double response[];

		@Override
		void getResponse(double w, Complex c) {
			if (response == null) {
				c.setRe(0);
				return;
			}
			int off = (int) (response.length * w / (2 * Math.PI));
			off &= ~1;
			if (off < 0)
				off = 0;
			if (off >= response.length)
				off = response.length - 2;
			c.setReIm(response[off], response[off + 1]);
		}

		double getWindow(int i, int n) {
			if (n == 1)
				return 1;
			double x = 2 * Math.PI * i / (n - 1);
			double n2 = n / 2; // int
			switch (windowChooser.getSelectedIndex()) {
			case 0:
				return 1; // rect
			case 1:
				return .54 - .46 * Math.cos(x); // hamming
			case 2:
				return .5 - .5 * Math.cos(x); // hann
			case 3:
				return .42 - .5 * Math.cos(x) + .08 * Math.cos(2 * x); // blackman
			case 4: {
				double kaiserAlphaPi = kaiserBar.getValue() * Math.PI / 120.;
				double q = (2 * i / (double) n) - 1;
				return bessi0(kaiserAlphaPi * Math.sqrt(1 - q * q));
			}
			case 5:
				return (i < n2) ? i / n2 : 2 - i / n2; // bartlett
			case 6: {
				double xt = (i - n2) / n2;
				return 1 - xt * xt;
			} // welch
			}
			return 0;
		}

		void setResponse(DirectFilter f) {
			setResponse(f, 0);
		}

		void setResponse(DirectFilter f, double offset) {
			response = new double[8192];
			int i;
			if (f.nList.length != f.aList.length) {
				f.nList = new int[f.aList.length];
				for (i = 0; i != f.aList.length; i++)
					f.nList[i] = i;
			}
			for (i = 0; i != f.aList.length; i++)
				response[f.nList[i] * 2] = f.aList[i];
			new FFT(response.length / 2).transform(response, false);
			double maxresp = 0;
			int j;
			Complex c1 = new Complex();
			for (j = 0; j != response.length; j += 2) {
				c1.setReIm(response[j], response[j + 1]);
				// divide out the uninteresting (and confusing) constant delay
				c1.rotate(-offset * 2 * Math.PI * j / response.length);
				double ms = c1.magSquared();
				if (maxresp < ms)
					maxresp = ms;
				response[j] = c1.re;
				response[j + 1] = c1.im;
			}
			// normalize response
			maxresp = Math.sqrt(maxresp);
			for (j = 0; j != response.length; j++)
				response[j] /= maxresp;
			for (j = 0; j != f.aList.length; j++)
				f.aList[j] /= maxresp;
		}
	}

	double bessi0(double x) {
		double ax, ans;
		double y;

		if ((ax = Math.abs(x)) < 3.75) {
			y = x / 3.75;
			y *= y;
			ans = 1.0
					+ y
					* (3.5156229 + y
							* (3.0899424 + y
									* (1.2067492 + y
											* (0.2659732 + y * (0.360768e-1 + y * 0.45813e-2)))));
		} else {
			y = 3.75 / ax;
			ans = (Math.exp(ax) / Math.sqrt(ax))
					* (0.39894228 + y
							* (0.1328592e-1 + y
									* (0.225319e-2 + y
											* (-0.157565e-2 + y
													* (0.916281e-2 + y
															* (-0.2057706e-1 + y
																	* (0.2635537e-1 + y
																			* (-0.1647633e-1 + y * 0.392377e-2))))))));
		}
		return ans;
	}

	void genPipeResponse(double rad[], double maxf, int lens[], double resp[],
			Complex wave[]) {
		// BH here is the time sink in JavaScript

		int n = 1 + rad.length;
		double zair = 40.3; // g/cm^2*sec
		double dim = pipeLen;
		dim /= lens[lens.length - 1];
		dim *= 100; // convert to cm
		double z[] = new double[n + 1];
		// z[0] = 200; // formants at 1000n
		// z[0] = 1e6 and below; // formants at 1000n
		// z[0] = 10e8; // formants at 500(n+1)
		// z[0] = 10e7; // formants at 500(n+1), sounds ok
		// z[0] = 1e7; // formants at 500(n+1), sounds ok
		z[0] = 200;
		// pipe Z = zair/S
		for (int i = 1; i != n; i++)
			z[i] = zair / (Math.PI * rad[i - 1] * rad[i - 1]);
		// end of pipe Z = (zair/S)((ka/2)^2+.6ka i)
		// z[i+1] = zair/1000;
		Complex cond[][] = new Complex[n * 2][4];
		Complex rs[] = new Complex[n * 2];
		
// BH this is the double loop that is very slow in JavaScript
// 		int wi;
//		for (wi = 1; wi != resp.length; wi++) {
//			// double f = sampleRate*wi/(resp.length*2);
//			double f = maxf * wi / resp.length;
//			double w = f * 2 * Math.PI;
//			double k = w / soundSpeed;
//			z[rad.length + 1] = zair * k * k / (4 * Math.PI);
//			z[rad.length + 1] = z[rad.length] / 4; // sounds better
//			for (i = 0; i != n; i++) {
//				int ii = i * 2;
//				double x = lens[i] * dim;
//				int i2 = ii + 1;
//				double alpha = (i == n - 1) ? 0 : .007
//						* Math.sqrt(1 / (rad[i] * rad[i])) * (.5 + f / 4000.); // p125 Fant
//				if (!attenuationCheck.getState())
//					alpha = 0;
//				// voltages
//				cond[ii][0] = iexp(-k * x, -alpha * x, 1);
//				cond[ii][1] = iexp(k * x, alpha * x, 1);
//				cond[ii][2] = iexp(-k * x, -alpha * x, -1);
//				cond[ii][3] = iexp(k * x, alpha * x, -1);
//				// currents
//				cond[i2][0] = iexp(-k * x, -alpha * x, 1 / z[i]);
//				cond[i2][1] = iexp(k * x, alpha * x, -1 / z[i]);
//				cond[i2][2] = iexp(-k * x, -alpha * x, -1 / z[i + 1]);
//				cond[i2][3] = iexp(k * x, alpha * x, 1 / z[i + 1]);
//			}
//			// System.out.print((w/(Math.PI*2)) + " ");
//			double f100 = f / 100;
//			double envelope = envelopeCheck.getState() ? f100 / (1 + f100 * f100) : 1;
//			resp[wi] = solve(cond, n * 2, wave) * envelope;
//		}
		double ss = soundSpeed;
		boolean attCheck = attenuationCheck.getState();
		boolean envCheck = envelopeCheck.getState();
		for (int wi = 1, len = resp.length; wi < len; wi++) {
			// double f = sampleRate*wi/(resp.length*2);
			// BH there is no need to create wave[] until the last iteration of wi.
			Complex[] wav = (wi == len - 1 ? wave : null);
			double f = maxf * wi / len;
			double w = f * 2 * Math.PI;
			double k = w / ss;
			//z[rad.length + 1] = zair * k * k / (4 * Math.PI);
			z[n] = z[n-1] / 4; // sounds better
			for (int i = 0; i != n; i++) {
				int ii = i * 2;
				int i2 = ii + 1;
				double x = lens[i] * dim;
				// BH why this? 
				//double alpha = (i == n - 1) ? 0 : .007
					//	* Math.sqrt(1 / (rad[i] * rad[i])) * (.5 + f / 4000.); // p125 Fant
				double alpha = (i == n - 1) ? 0 : .007 / rad[i] * (.5 + f / 4000.); // p125 Fant
				if (!attCheck)
					alpha = 0;
				// voltages
				cond[ii][0] = iexp(-k * x, -alpha * x, 1);
				cond[ii][1] = iexp(k * x, alpha * x, 1);
				cond[ii][2] = iexp(-k * x, -alpha * x, -1);
				cond[ii][3] = iexp(k * x, alpha * x, -1);
				// currents
				cond[i2][0] = iexp(-k * x, -alpha * x, 1 / z[i]);
				cond[i2][1] = iexp(k * x, alpha * x, -1 / z[i]);
				cond[i2][2] = iexp(-k * x, -alpha * x, -1 / z[i + 1]);
				cond[i2][3] = iexp(k * x, alpha * x, 1 / z[i + 1]);
			}
			// System.out.print((w/(Math.PI*2)) + " ");
			double f100 = f / 100;
			double envelope = envCheck ? f100 / (1 + f100 * f100) : 1;
			resp[wi] = solve(cond, n * 2, wav) * envelope;
		}
		resp[0] = resp[1];
	}

	// gaussian elimination; each row has 4 elements, and we don't need
	// to solve the first and last columns, so those can be ignored. So
	// we don't store the entire matrix, just the 4 elements for each row.
	//
	// m01 m02 m03
	// m11 m12 m13
	// m20 m21 m22 m23
	// m30 m31 m32 m33
	// m40 m41 m42 m43
	// m40 m41 m42 m43		s1.set2(0, 0);

	// ...
	
	Complex s0 = new Complex();
	Complex s1 = new Complex();
	Complex det = new Complex();
	Complex rs0 = new Complex();
	Complex rs1 = new Complex();
	Complex cy = new Complex();
	
	double solve(Complex m[][], int n, Complex wave[]) {
		int i;
		s0.setReIm(1, 0);
		s1.setReIm(0, 0);
		det.setReIm(0, 0);
		rs0.setReIm(0, 0);
		rs1.setReIm(0, 0);
		/*
		 * for (i = 0; i != n; i++) { System.out.println(i + " " +
		 * m[i][0].asString() + " " + m[i][1].asString() + " " + m[i][2].asString()
		 * + " " + m[i][3].asString()); }
		 */
		for (i = n - 2; i >= 0; i -= 2) {
			// use variables we know to get rid of 2 columns, moving them to right
			// side
			rs0.setRe(0);
			rs0.scaleAdd2(-1, m[i][2], s0);
			rs0.scaleAdd2(-1, m[i][3], s1);
			rs1.setRe(0);
			rs1.scaleAdd2(-1, m[i + 1][2], s0);
			rs1.scaleAdd2(-1, m[i + 1][3], s1);
			// System.out.println("rs0 rs1 " + rs0.asString() + " " + rs1.asString());
			// use cramer's rule to solve the remaining 2x2 matrix
			// first, get determinant
			det.setRe(0);
			det.scaleAdd2(1, m[i][0], m[i + 1][1]);
			det.scaleAdd2(-1, m[i][1], m[i + 1][0]);
			// then solve
			s0.setRe(0);
			s0.scaleAdd2(-1, m[i][1], rs1);
			s0.scaleAdd2(1, m[i + 1][1], rs0);
			s0.divide(det);
			s1.setRe(0);
			s1.scaleAdd2(1, m[i][0], rs1);
			s1.scaleAdd2(-1, m[i + 1][0], rs0);
			s1.divide(det);
			// System.out.println("s0 s1 " + s0.asString() + " " + s1.asString());
			if (wave != null) {
				Complex cx = wave[i / 2] = new Complex().setReIm(s0.re, s0.im);
				cx.mult(m[i][0]);
				cy.setReIm(s1.re, s1.im);
				cy.mult(m[i][1]);
				cx.add(cy);
			}
		}
		// System.out.println("newsolve " + s0.mag + " " + s1.mag);
		return 1 / s1.mag;
	}

	Complex iexp(double x, double alpha, double mul) {
		Complex a = new Complex();
		a.setMagPhase(Math.exp(alpha), x);
		a.multRe(mul);
		return a;
	}

	double uresp[];

	class PipeFIRFilter extends FIRFilterType {
				
		@Override
		int select() {
			/*
			 * auxLabels[0].setText("Order"); auxBars[0].setValue(256);
			 * auxBars[0].setMaximum(1600);
			 */
			auxLabels[0].setText("Total Length");
			auxBars[0].setValue(176);
			auxBars[0].setMaximum(1000);
			return 1;
		}

		void compressedPipeResponse(double arr[], double resp[]) {
			int i, n;
			double last = -1;
			for (i = n = 0; i != arr.length; i++) {
				if (arr[i] != last)
					n++;
				last = arr[i];
			}
			double x[] = new double[n];
			int count[] = new int[n + 1];
			last = -1;
			count[0] = 0;
			for (i = n = 0; i != arr.length; i++) {
				if (arr[i] != last)
					last = x[n++] = arr[i];
				count[n] = i;
			}
			genPipeResponse(x, sampleRate / 2, count, resp, null);
		}

		@Override
		Filter genFilter() {
			int rlen = 16;
			int n = 256; // auxBars[0].getValue();
			while (rlen < n)
				rlen *= 2;
			double resp[] = new double[rlen];
			pipeLen = auxBars[0].getValue() / 1000.;
			if (compressCheck.getState())
				compressedPipeResponse(pipeRadius, resp);
			else {
				int ll[] = new int[pipeRadius.length + 1];
				int i;
				for (i = 0; i != ll.length; i++)
					ll[i] = i;
				genPipeResponse(pipeRadius, sampleRate / 2, ll, resp, null);
			}
			int nsz = resp.length * 4;
			double fbuf[] = new double[nsz];
			int i;
			int nsz2 = nsz / 2;
			int nsz4 = nsz2 / 2;
			for (i = 0; i != nsz4; i++) {
				double ur = resp[i] / nsz2;
				fbuf[i * 2] = ur;
				if (i > 0)
					fbuf[nsz - i * 2] = ur;
			}
			new FFT(nsz2).transform(fbuf, true);

			DirectFilter f = new DirectFilter();
			f.aList = new double[n];
			f.nList = new int[n];
			for (i = 0; i != n; i++) {
				int i2 = (i - n / 2) * 2;
				f.aList[i] = fbuf[i2 & (nsz - 1)] * getWindow(i, n);
				f.nList[i] = i;
			}
			setResponse(f, n / 2);
			return f;
		}

		@Override
		void getInfo(String x[]) {
			// int n = auxBars[0].getValue();
			// x[0] = "Order: " + n;
			x[0] = "Length: " + auxBars[0].getValue() + " mm";
		}

		double areaToRadius(double x) {
			return Math.sqrt(x / Math.PI);
		}

		@Override
		boolean needsWindow() {
			return true;
		}
	}

	class IBarVowelFilter extends PipeFIRFilter {
		
		double data[] = { 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5,
				6.42857, 2.83929, 2.73214, 3.13393, 3.29464, 3.45536, 3.45536, 4.58036,
				5.49107, 6.45536, 6.96429, 7.33929, 7.66071, 7.84821, 8.03571, 8.19643,
				8.30357, 8.38393, 8.41071, 8.38393, 8.35714, 8.25, 8.14286, 8.14286,
				7.98214, 7.82143, 7.58036, 7.3125, 6.75, 6.02679, 5.22321, 4.6875,
				4.28571, 3.96429, 3.66964, 3.40179, 3.13393, 2.91964, 2.75893, 2.625,
				2.625, 2.51786, 2.4375, 2.35714, 2.27679, 2.19643, 2.11607, 2.0625,
				2.00893, 1.95536, 1.875, 1.79464, 1.71429, 1.66071, 1.60714, 1.52679,
				1.52679, 1.47321, 1.41964, 1.36607, 1.3125, 1.25893, 1.20536, 1.15179,
				1.125, 1.09821, 1.07143, 1.04464, 1.04464, 1.01786, 1.01786, 1.01786,
				1.01786, 1.01786, 1.04464, 1.09821, 1.15179, 1.17857, 1.23214, 1.28571,
				1.39286, 1.47321, 1.60714, 1.76786, 1.95536, 2.16964, 2.35714, 2.46429,
				2.51786, 2.35714, 2.35714, 2.0625, 1.79464, 1.71429, 1.79464, 2.86607,
				3.375, 3.85714, 4.125, 4.33929, 4.55357, 4.76786, 4.92857, 5.11607,
				5.30357, 5.46429, 5.46429, 5.59821, 5.75893, 5.89286, 6.10714, 6.26786,
				6.42857, 6.61607, 6.75, 6.96429, 7.125, 7.25893, 7.47321, 7.6875,
				7.875, 8.08929, 8.33036, 8.33036, 8.625, 8.83929, 9.13393, 9.375,
				9.58929, 9.80357, 10.0179, 10.1786, 10.3125, 10.4196, 10.5, 10.6071,
				10.6607, 10.7143, 10.7679, 10.8482, 10.8482, 10.875, 10.9018, 10.9286,
				10.9821, 10.9821, 11.0089, 11.0089, 11.0357, 11.0357, 11.0625, 11.0357,
				11.0625, 11.0625, 11.0625, 11.0625, 11.0625, 11.0625, 11.0893, 11.0893,
				11.0893, 11.0893, 11.0625, 11.0625, 11.1161, 11.0893, 11.0625, 11.0625,
				11.0625, 10.9018, 3.58929, 3.375, 3.21429, 3.21429, 3.13393, 3.08036,
				3.05357, 3.02679, 3.02679, 3.02679, 3, 3.02679, 3.02679, 3, 3, 3,
				2.97321, 2.94643, 2.97321 };

		@Override
		int select() {
			int r = super.select();
			int i;
			for (i = 0; i != pipeRadius.length; i++)
				pipeRadius[pipeRadius.length - 1 - i] = areaToRadius(data[i]);
			auxBars[r - 1].setValue(190);
			return r;
		}
	}

	class IVowelFilter extends PipeFIRFilter {
		

		double data[] = { 8.74254, 8.74254, 7.71642, 7.18284, 6.64925, 5.99254,
				4.96642, 4.63806, 4.55597, 4.43284, 4.02239, 2.95522, 2.87313, 2.83209,
				2.83209, 2.83209, 2.83209, 2.79104, 2.25746, 1.76493, 1.76493, 1.76493,
				1.68284, 1.64179, 1.60075, 1.5597, 1.47761, 1.35448, 1.31343, 1.1903,
				1.10821, 1.10821, 1.02612, 0.985075, 0.94403, 0.86194, 0.779851,
				0.738806, 0.656716, 0.656716, 0.656716, 0.656716, 0.574627, 0.574627,
				0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627, 0.574627,
				0.574627, 0.615672, 0.615672, 0.615672, 0.615672, 0.574627, 0.574627,
				0.574627, 0.574627, 0.615672, 0.656716, 0.615672, 0.615672, 0.656716,
				0.697761, 0.697761, 0.697761, 0.697761, 0.738806, 0.779851, 0.779851,
				0.820896, 0.779851, 0.779851, 0.902985, 0.902985, 0.985075, 1.10821,
				1.23134, 1.39552, 1.51866, 1.72388, 1.84701, 2.05224, 2.17537, 2.42164,
				2.66791, 2.87313, 3.20149, 3.5709, 3.65299, 4.06343, 4.39179, 4.72015,
				5.37687, 5.66418, 6.15672, 6.85448, 7.01866, 7.34701, 7.4291, 7.55224,
				7.71642, 7.79851, 7.79851, 7.75746, 7.71642, 7.59328, 7.47015, 7.30597,
				7.22388, 7.34701, 7.79851, 9.11194, 10.0149, 10.2612, 10.5075, 10.8358,
				10.8769, 10.9179, 10.959, 11, 11.041, 11, 11.041, 11.041, 11.041,
				11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11.041, 11, 10.959,
				10.9179, 10.8358, 10.7948, 10.7127, 10.6306, 10.5075, 10.4664, 10.3433,
				10.2612, 10.1381, 10.056, 10.056, 9.85075, 9.72761, 9.64552, 9.52239,
				9.39925, 9.35821, 9.27612, 9.19403, 9.11194, 9.02985, 8.94776, 8.86567,
				8.78358, 8.74254, 8.66045, 8.66045, 8.53731, 8.45522, 8.37313, 8.33209,
				8.29104, 8.25, 8.20896, 8.20896, 8.20896, 8.16791, 8.16791, 8.12687,
				8.08582, 8.04478, 7.83955, 2.87313, 2.62687, 2.54478, 2.54478, 2.46269,
				2.42164, 2.46269, 2.46269, 2.46269, 2.54478, 2.58582, 2.66791, 2.66791,
				2.75, 2.79104, 2.83209, 2.87313, 2.91418, 2.99627, 3.03731, };

		@Override
		int select() {
			int bars = super.select();
			int i;
			for (i = 0; i != pipeRadius.length; i++)
				pipeRadius[pipeRadius.length - 1 - i] = areaToRadius(data[i]);
			auxBars[bars - 1].setValue(170);
			return bars;
		}
	}

	class EVowelFilter extends PipeFIRFilter {
				

		double data[] = { 10.2, 10.2, 10.2, 9.31174, 8.98785, 8.70445, 8.54251,
				8.34008, 7.85425, 5.91093, 5.34413, 5.26316, 5.18219, 5.06073, 4.97976,
				4.93927, 4.93927, 4.97976, 5.06073, 5.10121, 5.10121, 5.06073, 5.06073,
				4.89879, 4.69636, 4.49393, 4.21053, 4.0081, 3.80567, 3.64372, 3.48178,
				3.15789, 2.99595, 2.67206, 2.46964, 2.38866, 2.26721, 2.14575, 2.14575,
				2.10526, 2.10526, 2.18623, 2.18623, 2.30769, 2.34818, 2.42915, 2.46964,
				2.55061, 2.63158, 2.67206, 2.75304, 2.83401, 2.95547, 2.99595, 3.07692,
				3.19838, 3.23887, 3.23887, 3.36032, 3.4413, 3.56275, 3.56275, 3.64372,
				3.64372, 3.7247, 3.80567, 3.84615, 3.92713, 4.0081, 4.04858, 4.12955,
				4.17004, 4.21053, 4.33198, 4.41296, 4.49393, 4.49393, 4.5749, 4.65587,
				4.69636, 4.77733, 4.8583, 4.89879, 5.06073, 5.26316, 5.30364, 5.4251,
				5.66802, 5.78947, 6.03239, 6.11336, 6.31579, 6.51822, 6.63968, 6.80162,
				6.92308, 7.12551, 7.24696, 7.36842, 7.40891, 7.40891, 7.40891, 7.32794,
				7.20648, 7.04453, 6.80162, 6.72065, 6.80162, 6.92308, 7.32794, 7.85425,
				8.25911, 8.8664, 9.06883, 9.4332, 9.55466, 9.67611, 9.79757, 9.79757,
				9.87854, 9.91903, 9.95951, 9.95951, 10, 9.95951, 9.95951, 9.95951,
				9.95951, 9.91903, 9.87854, 9.83806, 9.79757, 9.75709, 9.67611, 9.63563,
				9.55466, 9.47368, 9.39271, 9.35223, 9.23077, 9.19028, 9.1498, 8.98785,
				8.82591, 8.70445, 8.66397, 8.54251, 8.34008, 8.13765, 7.93522, 7.85425,
				7.69231, 7.65182, 7.53036, 7.36842, 7.16599, 7.08502, 6.96356, 6.84211,
				6.72065, 6.43725, 6.35628, 6.23482, 6.19433, 6.07287, 6.03239, 5.9919,
				5.9919, 5.95142, 5.91093, 5.95142, 5.91093, 5.91093, 5.95142, 5.95142,
				5.95142, 5.54656, 1.53846, 1.417, 1.417, 1.417, 1.417, 1.417, 1.45749,
				1.53846, 1.61943, 1.61943, 1.65992, 1.78138, 1.78138, 1.94332, 2.06478,
				2.14575, 2.22672, 2.30769, 2.38866, 2.51012, 2.59109, 2.63158, 2.75304, };

		@Override
		int select() {
			int bars = super.select();
			int i;
			for (i = 0; i != pipeRadius.length; i++)
				pipeRadius[pipeRadius.length - 1 - i] = areaToRadius(data[i]);
			auxBars[bars - 1].setValue(170);
			return bars;
		}
	}

	class OpenTubeFilter extends PipeFIRFilter {
		
		@Override
		int select() {
			int bars = super.select();
			int i;
			for (i = 0; i != pipeRadius.length; i++)
				pipeRadius[i] = areaToRadius(6.5);
			return bars;
		}
	}

	class CustomFilter extends PipeFIRFilter {

		@Override		
		int select() {
			int bars = super.select();
			auxBars[0].setValue((int) (pipeLen * 1000));
			return bars;
		}
	}

	class AVowelFilter extends PipeFIRFilter {
		
		double data[] = { 6.08276, 6.08276, 6.08276, 6.08276, 6.08276, 6.05379,
				5.93793, 5.59034, 5.18483, 5.01103, 4.92414, 4.89517, 4.86621, 4.86621,
				4.86621, 4.86621, 4.86621, 4.89517, 4.9531, 5.04, 5.18483, 5.38759,
				5.67724, 5.93793, 6.14069, 6.31448, 6.48828, 6.6331, 6.74897, 6.89379,
				7.00966, 7.09655, 7.24138, 7.35724, 7.44414, 7.53103, 7.6469, 7.73379,
				7.79172, 7.87862, 7.93655, 7.96552, 8.02345, 8.05241, 8.11034, 8.13931,
				8.19724, 8.19724, 8.25517, 8.28414, 8.34207, 8.37103, 8.37103, 8.4,
				8.42897, 8.4, 8.4, 8.4, 8.34207, 8.3131, 8.28414, 8.22621, 8.16828,
				8.13931, 8.05241, 7.99448, 7.93655, 7.84966, 7.79172, 7.70483, 7.6469,
				7.50207, 7.38621, 7.27034, 7.12552, 6.98069, 6.89379, 6.77793, 6.60414,
				6.43034, 6.25655, 6.08276, 5.93793, 5.73517, 5.56138, 5.38759, 5.21379,
				5.09793, 4.89517, 4.69241, 4.54759, 4.31586, 4.02621, 3.82345, 3.64966,
				3.36, 3.09931, 2.86759, 2.54897, 2.17241, 1.85379, 1.73793, 1.68,
				1.73793, 1.96966, 2.11448, 2.57793, 2.75172, 2.95448, 3.07034, 3.04138,
				3.04138, 2.98345, 2.89655, 2.78069, 2.66483, 2.52, 2.37517, 2.28828,
				2.17241, 2.02759, 1.96966, 1.88276, 1.79586, 1.68, 1.65103, 1.53517,
				1.47724, 1.39034, 1.30345, 1.21655, 1.12966, 1.04276, 1.04276,
				0.984828, 0.955862, 0.926897, 0.926897, 0.868966, 0.868966, 0.811034,
				0.811034, 0.724138, 0.782069, 0.811034, 0.84, 0.811034, 0.868966,
				0.868966, 0.84, 0.897931, 0.926897, 0.926897, 0.984828, 1.04276,
				1.07172, 1.15862, 1.24552, 1.30345, 1.36138, 1.50621, 1.5931, 1.7669,
				1.82483, 2.02759, 2.17241, 2.4331, 2.54897, 2.80966, 3.04138, 3.36,
				3.50483, 3.67862, 3.85241, 4.02621, 4.08414, 4.05517, 3.99724, 3.09931,
				1.44828, 1.36138, 1.33241, 1.36138, 1.36138, 1.44828, 1.47724, 1.53517,
				1.56414, 1.65103, 1.73793, 1.82483, 1.91172, 1.99862, 2.11448, 2.17241,
				2.25931, 2.37517, 2.46207, 2.54897, 2.63586 };

		@Override
		int select() {
			int bars = super.select();
			auxBars[bars - 1].setValue(190);
			auxLabels[bars].setText("Pharynx Width");
			auxBars[bars].setValue(100);
			auxBars[bars].setMaximum(200);
			auxLabels[bars + 1].setText("Mouth Width");
			auxBars[bars + 1].setValue(100);
			auxBars[bars + 1].setMaximum(200);
			return bars + 2;
		}

		@Override
		Filter genFilter() {
			int i;
			double pw = auxBars[1].getValue() / 100.;
			double mw = auxBars[2].getValue() / 100.;
			for (i = 0; i != 100; i++)
				pipeRadius[pipeRadius.length - 1 - i] = areaToRadius(data[i]) * mw;
			for (; i != pipeRadius.length; i++)
				pipeRadius[pipeRadius.length - 1 - i] = areaToRadius(data[i]) * pw;
			return super.genFilter();
		}
	}

	class AVowelFilterSimple extends PipeFIRFilter {
		
		@Override
		int select() {
			super.select();
			auxLabels[1].setText("1st Section Length");
			auxBars[1].setValue((int) (200 * 1.2 / 2.2));
			auxBars[1].setMaximum(200);
			return 2;
		}

		@Override
		Filter genFilter() {
			int i;
			for (i = 0; i < auxBars[1].getValue(); i++)
				pipeRadius[i] = areaToRadius(1);
			for (; i != pipeRadius.length; i++)
				pipeRadius[i] = areaToRadius(8);
			return super.genFilter();
		}
	}

	class AEVowelFilterSimple extends AVowelFilterSimple {
		
		@Override
		int select() {
			super.select();
			auxBars[1].setValue(200 / 3);
			return 2;
		}
	}

	class OVowelFilter extends PipeFIRFilter {
		
		
		double data[] = { 3.8, 3.8, 3.8, 3.86077, 3.53659, 3.4187, 3.35976,
				3.30081, 3.30081, 3.24187, 3.33028, 3.38923, 3.59553, 3.89024, 4.15549,
				4.30285, 4.56809, 4.8628, 5.03963, 6.07114, 7.39736, 8.4878, 9.75508,
				10.6687, 11.1402, 11.8476, 12.6138, 13.3506, 13.4685, 13.7632, 13.9695,
				14.1169, 14.2053, 14.3526, 14.4116, 14.5, 14.5, 14.5, 14.5, 14.4411,
				14.3526, 14.2348, 13.999, 13.2033, 12.4959, 11.9949, 11.5528, 11.1697,
				10.9929, 10.6982, 10.4329, 10.2856, 10.0793, 9.93191, 9.78455, 9.60772,
				9.46037, 9.25407, 9.13618, 8.98882, 8.87093, 8.72358, 8.57622, 8.42886,
				8.2815, 8.10467, 7.92785, 7.78049, 7.63313, 7.54472, 7.33841, 7.22053,
				7.10264, 6.98476, 6.80793, 6.6311, 6.4248, 6.30691, 6.18902, 6.04167,
				5.89431, 5.77642, 5.59959, 5.42276, 5.33435, 5.18699, 5.06911, 4.95122,
				4.83333, 4.68598, 4.56809, 4.4502, 4.33232, 4.21443, 4.06707, 3.89024,
				3.74289, 3.50711, 3.38923, 3.15346, 3.03557, 2.77033, 2.44614, 2.21037,
				1.91565, 1.76829, 1.73882, 1.79776, 2.18089, 2.74085, 2.88821, 2.91768,
				2.91768, 2.82927, 2.74085, 2.41667, 2.18089, 1.85671, 1.70935, 1.47358,
				1.35569, 1.26728, 1.2378, 1.20833, 1.17886, 1.17886, 1.14939, 1.17886,
				1.14939, 1.14939, 1.17886, 1.14939, 1.17886, 1.17886, 1.17886, 1.17886,
				1.17886, 1.17886, 1.20833, 1.20833, 1.2378, 1.26728, 1.29675, 1.35569,
				1.38516, 1.47358, 1.50305, 1.56199, 1.62093, 1.70935, 1.79776, 1.85671,
				1.94512, 2.06301, 2.06301, 2.18089, 2.26931, 2.3872, 2.50508, 2.5935,
				2.74085, 2.88821, 3.06504, 3.24187, 3.38923, 3.56606, 3.74289, 3.97866,
				4.09654, 4.21443, 4.36179, 4.59756, 4.74492, 4.89228, 5.06911, 5.18699,
				5.27541, 5.48171, 5.54065, 5.57012, 5.54065, 5.09858, 2.56402, 1.88618,
				1.70935, 1.73882, 1.70935, 1.73882, 1.76829, 1.79776, 1.82724, 1.85671,
				1.94512, 2.00407, 2.06301, 2.15142, 2.23984, 2.29878, 2.35772, 2.53455 };

		@Override
		int select() {
			super.select();
			int i;
			for (i = 0; i != pipeRadius.length; i++)
				pipeRadius[pipeRadius.length - 1 - i] = areaToRadius(data[i]);
			auxBars[1].setValue(190);
			return 2;
		}
	}

	class UVowelFilter extends PipeFIRFilter {
		
		double data[] = { 0.975787, 1.57385, 0.94431, 0.661017, 0.535109, 0.440678,
				0.440678, 0.377724, 0.346247, 0.31477, 0.346247, 0.409201, 0.472155,
				0.62954, 0.849879, 1.07022, 1.32203, 1.66828, 2.14044, 2.48668,
				2.83293, 3.1477, 3.52542, 3.93462, 4.31235, 5.50847, 7.77482, 9.8523,
				10.6392, 11.1429, 11.4262, 11.7409, 12.0872, 12.276, 12.4649, 12.5908,
				12.6852, 12.7797, 12.8426, 12.8741, 12.9685, 13.0315, 13.063, 13.063,
				13.063, 13.063, 13, 12.937, 12.8741, 12.6538, 12.3705, 12.0872,
				11.4576, 10.6077, 9.75787, 9.19128, 8.78208, 8.49879, 8.05811, 7.77482,
				7.49153, 7.23971, 6.95642, 6.67312, 6.42131, 6.23245, 5.94915, 5.69734,
				5.50847, 5.31961, 5.13075, 4.75303, 4.62712, 4.40678, 4.12349, 3.93462,
				3.80872, 3.65133, 3.36804, 3.21065, 3.08475, 2.92736, 2.83293, 2.70702,
				2.61259, 2.54964, 2.45521, 2.42373, 2.39225, 2.3293, 2.3293, 2.29782,
				2.29782, 2.3293, 2.3293, 2.3293, 2.3293, 2.29782, 2.26634, 2.20339,
				2.10896, 1.95157, 1.79419, 1.47942, 1.29056, 1.29056, 1.44794, 2.046,
				2.42373, 2.58111, 2.64407, 2.64407, 2.54964, 2.42373, 2.29782, 2.14044,
				1.95157, 1.85714, 1.76271, 1.66828, 1.57385, 1.47942, 1.41646, 1.35351,
				1.29056, 1.29056, 1.25908, 1.2276, 1.2276, 1.2276, 1.25908, 1.32203,
				1.32203, 1.35351, 1.38499, 1.47942, 1.5109, 1.57385, 1.66828, 1.79419,
				1.88862, 2.01453, 2.17191, 2.39225, 2.58111, 2.86441, 3.1477, 3.52542,
				3.99758, 4.46973, 4.97337, 5.50847, 5.98063, 6.32688, 6.76755, 7.08232,
				7.36562, 7.64891, 7.90073, 8.15254, 8.3414, 8.43584, 8.56174, 8.65617,
				8.75061, 8.81356, 8.87651, 8.97094, 9.00242, 9.0339, 9.06538, 9.09685,
				9.12833, 9.12833, 9.15981, 9.15981, 9.15981, 9.15981, 9.15981, 9.12833,
				7.49153, 3.1477, 2.76998, 2.61259, 2.54964, 2.51816, 2.51816, 2.54964,
				2.58111, 2.61259, 2.67554, 2.70702, 2.7385, 2.80145, 2.86441, 2.92736,
				2.95884, 2.99031, 3.05327, 3.08475 };

		@Override
		int select() {
			super.select();
			int i;
			for (i = 0; i != pipeRadius.length; i++)
				pipeRadius[pipeRadius.length - 1 - i] = areaToRadius(data[i]);
			auxBars[1].setValue(190);
			return 2;
		}
	}

	class YVowelFilterSimple extends PipeFIRFilter {
		
		@Override
		int select() {
			super.select();
			auxLabels[1].setText("1st Section Length");
			auxBars[1].setValue(100);
			auxBars[1].setMaximum(200);
			return 2;
		}

		@Override
		Filter genFilter() {
			int i;
			for (i = 0; i < auxBars[1].getValue(); i++)
				pipeRadius[i] = areaToRadius(8);
			for (; i != pipeRadius.length; i++)
				pipeRadius[i] = areaToRadius(1);
			return super.genFilter();
		}
	}

	class IVowelFilterSimple extends YVowelFilterSimple {

		@Override
		int select() {
			super.select();
			auxBars[0].setValue(145);
			auxBars[1].setValue((int) (200 * (1.5 / 2.5)));
			return 2;
		}
	}

	class UrVowelFilterSimple extends YVowelFilterSimple {
		
		@Override
		int select() {
			super.select();
			auxBars[1].setValue(200 * 8 / 9);
			return 2;
		}
	}

	class IhVowelFilterSimple extends PipeFIRFilter {
		
		@Override
		int select() {
			super.select();
			auxBars[0].setValue(160);
			return 1;
		}

		@Override
		Filter genFilter() {
			int i;
			for (i = 0; i < 200 * 3 / 16; i++)
				pipeRadius[i] = areaToRadius(1);
			for (; i < 200 * 9 / 16; i++)
				pipeRadius[i] = areaToRadius(7);
			for (; i != pipeRadius.length; i++)
				pipeRadius[i] = areaToRadius(1);
			return super.genFilter();
		}
	}

	class OoVowelFilterSimple extends PipeFIRFilter {
		
		@Override
		int select() {
			super.select();
			auxBars[0].setValue(180);
			return 1;
		}

		@Override
		Filter genFilter() {
			int i;
			for (i = 0; i < 200 * 3 / 18; i++)
				pipeRadius[i] = areaToRadius(1);
			for (; i < 200 * 8 / 18; i++)
				pipeRadius[i] = areaToRadius(7);
			for (; i < 200 * 11 / 18; i++)
				pipeRadius[i] = areaToRadius(1);
			for (; i < 200 * 16 / 18; i++)
				pipeRadius[i] = areaToRadius(7);
			for (; i != pipeRadius.length; i++)
				pipeRadius[i] = areaToRadius(1);
			return super.genFilter();
		}
	}

	class NoFilter extends FilterType {
		
		@Override
		void getResponse(double w, Complex c) {
			c.setRe(1);
		}

		@Override
		Filter genFilter() {
			DirectFilter f = new DirectFilter();
			f.aList = new double[1];
			f.aList[0] = 1;
			return f;
		}
	}

	void doImport() {
		if (impDialog != null) {
			requestFocus();
			impDialog.setVisible(false);
			impDialog = null;
		}
		String dump = "";

		int i;
		dump = "$ 0 " + pipeLen + " " + pipeRadius.length + "\n";
		for (i = 0; i != pipeRadius.length; i++)
			dump += "p " + pipeRadius[i] + "\n";
		impDialog = new ImportDialog(this, dump);
		impDialog.show();
	}

	void readImport(String s) {
		byte b[] = s.getBytes();
		int len = s.length();
		int p;
		int x = 0;
		int srci = 0;
		int pi = 0;
		filterChooser.select(13);
		for (p = 0; p < len;) {
			int l;
			int linelen = 0;
			for (l = 0; l != len - p; l++)
				if (b[l + p] == '\n' || b[l + p] == '\r') {
					linelen = l++;
					if (l + p < b.length && b[l + p] == '\n')
						l++;
					break;
				}
			String line = new String(b, p, linelen);
			StringTokenizer st = new StringTokenizer(line);
			while (st.hasMoreTokens()) {
				String type = st.nextToken();
				int tint = type.charAt(0);
				try {
					if (tint == '$') {
						int flags = new Integer(st.nextToken()).intValue();
						pipeLen = new Double(st.nextToken()).doubleValue();
						int radlen = new Integer(st.nextToken()).intValue();
						break;
					}
					if (tint == 'p') {
						pipeRadius[pi++] = new Double(st.nextToken()).doubleValue();
						break;
					}
					System.out.println("unknown type!");
				} catch (Exception ee) {
					ee.printStackTrace();
					break;
				}
				break;
			}
			p += l;

		}
		setupFilter();
	}

	class ImportDialogLayout implements LayoutManager {
		public ImportDialogLayout() {
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
			Insets insets = target.insets();
			int targetw = target.size().width - insets.left - insets.right;
			int targeth = target.size().height - (insets.top + insets.bottom);
			int i;
			int pw = 300;
			if (target.getComponentCount() == 0)
				return;
			Component cl = target.getComponent(target.getComponentCount() - 1);
			Dimension dl = cl.getPreferredSize();
			target.getComponent(0).move(insets.left, insets.top);
			int cw = target.size().width - insets.left - insets.right;
			int ch = target.size().height - insets.top - insets.bottom - dl.height;
			target.getComponent(0).resize(cw, ch);
			int h = ch + insets.top;
			int x = 0;
			for (i = 1; i < target.getComponentCount(); i++) {
				Component m = target.getComponent(i);
				if (m.isVisible()) {
					Dimension d = m.getPreferredSize();
					m.move(insets.left + x, h);
					m.resize(d.width, d.height);
					x += d.width;
				}
			}
		}
	};

	class ImportDialog extends Dialog implements ActionListener {
		VowelFrame rframe;
		Button importButton, clearButton, closeButton;
		TextArea text;

		ImportDialog(VowelFrame f, String str) {
			super(f, (str.length() > 0) ? "Export" : "Import", false);
			rframe = f;
			setLayout(new ImportDialogLayout());
			add(text = new TextArea(str, 10, 60));
			add(importButton = new Button("Import"));
			importButton.addActionListener(this);
			add(clearButton = new Button("Clear"));
			clearButton.addActionListener(this);
			add(closeButton = new Button("Close"));
			closeButton.addActionListener(this);
			Point x = rframe.getLocationOnScreen();
			resize(400, 300);
			Dimension d = getSize();
			setLocation(x.x + (winSize.width - d.width) / 2, x.y
					+ (winSize.height - d.height) / 2);
			show();
			if (str.length() > 0)
				text.selectAll();
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			int i;
			Object src = e.getSource();
			if (src == importButton) {
				rframe.readImport(text.getText());
				setVisible(false);
			}
			if (src == closeButton)
				setVisible(false);
			if (src == clearButton)
				text.setText("");
		}

		@Override
		public boolean handleEvent(Event ev) {
			if (ev.id == Event.WINDOW_DESTROY) {
				rframe.requestFocus();
				setVisible(false);
				return true;
			}
			return super.handleEvent(ev);
		}
	}

	PlayThread audioThread;

	private void createAudioThread() {
		audioThread = new PlayThread();
	}

	boolean shutdownRequested;

	void requestAudioShutdown() {
		shutdownRequested = true;
	}

	/**
	 * In the SwingJS implementation of PlayThread, we extend JSAudioThread
	 * so that we have full control of looping with only occasional sleeping. 
	 *
	 */
	class PlayThread extends JSAudioThread implements JSAudioThread.Owner {
		private Waveform wform;
		private boolean stereo;
		private Filter filt, newFilter;
		private double fbufLi[], fbufRi[], fbufLo[], fbufRo[];
		private double stateL[], stateR[];
		private int fbufmask, fbufsize;
		private int spectrumOffset, spectrumLen;

		private int inbp, outbp;
		private int spectCt;

		private int gainCounter = 0;
		private boolean maxGain = true;
		private boolean useConvolve = false;
		private int ss;
		
		private double impulseBuf[], convolveBuf[];
		private int convBufPtr;
		private FFT convFFT;


		public PlayThread() {
			shutdownRequested = false;
		}

		@Override // JSAudioThread
		public boolean myInit() {
			try {
				owner = this;
				rateChooser.enable();
				wform = getWaveformObject();
				mp3Error = null;
				unstable = false;
				if (!wform.start()) {
					cv.repaint();
					return false;
				}

				fbufsize = 32768;
				fbufmask = fbufsize - 1;
				fbufLi = new double[fbufsize];
				fbufRi = new double[fbufsize];
				fbufLo = new double[fbufsize];
				fbufRo = new double[fbufsize];
				openLine();
				inbp = outbp = spectCt = 0;
				outputGain = 1;
				newFilter = filt = curFilter;
				spectrumLen = getPower2(sampleRate / 12);
				audioBufferByteLength = 16384;
				audioByteBuffer = new byte[audioBufferByteLength];
	//			int shiftCtr = 0;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
			return true;
		}

		@Override // JSAudioThread
		public boolean checkSoundStatus() {
			return !shutdownRequested && soundCheck.getState()
					&& (applet == null || applet.ogf != null);
		}

		@Override // JSAudioThread
		protected boolean myLoop() {
			// System.out.println("nf " + newFilter + " " +(inbp-outbp));
			if (newFilter != null) {
				line.flush(); // BH added
				gainCounter = 0;
				maxGain = true;
				if (wform instanceof SweepWaveform || wform instanceof SineWaveform)
					maxGain = false;
				outputGain = 1;
				// we avoid doing this unless necessary because it sounds bad
				if (filt == null || filt.getLength() != newFilter.getLength())
					convBufPtr = inbp = outbp = spectCt = 0;
				filt = newFilter;
				newFilter = null;
				impulseBuf = null;
				useConvolve = filt.useConvolve();
				stateL = filt.createState();
				stateR = filt.createState();
			}
			int length = wform.getData();
			if (length == 0)
				return true;
			short ib[] = wform.buffer;

			int i2;
			int i = inbp;
			for (i2 = 0; i2 < length; i2 += ss) {
				fbufLi[i] = ib[i2];
				i = (i + 1) & fbufmask;
			}
			i = inbp;
			if (stereo) {
				for (i2 = 0; i2 < length; i2 += 2) {
					fbufRi[i] = ib[i2 + 1];
					i = (i + 1) & fbufmask;
				}
			} else {
				for (i2 = 0; i2 < length; i2++) {
					fbufRi[i] = fbufLi[i];
					i = (i + 1) & fbufmask;
				}
			}
			/*
			 * if (shiftSpectrumCheck.getState()) { double shiftFreq =
			 * shiftFreqBar.getValue()*pi/1000.; if (shiftFreq > pi) shiftFreq = pi; i
			 * = inbp; for (i2 = 0; i2 < length; i2 += ss) { double q =
			 * Math.cos(shiftFreq*shiftCtr++); fbufLi[i] *= q; fbufRi[i] *= q; i =
			 * (i+1) & fbufmask; } }
			 */

			int sampleCount = length / ss;
			if (useConvolve) {
				doConvolveFilter(sampleCount);
			} else {
				doFilter(sampleCount);
				if (!unstable)
					doOutput(sampleCount * 4);
			}
			if (unstable)
				return false;
			if (spectCt >= spectrumLen) {
				spectrumOffset = (outbp - spectrumLen) & fbufmask;
				spectCt -= spectrumLen;
				cv.repaint();
			}
			gainCounter += sampleCount;
			if (maxGain && gainCounter >= sampleRate) {
				gainCounter = 0;
				maxGain = false;
			}
			return true;
		}

		@Override // JSAudioThread
		public void whenDone() {
			if (shutdownRequested || unstable || !soundCheck.getState())
				line.flush();
			else
				line.drain();
			cv.repaint();
		}
		
		@Override // JSAudioThread
		public void audioThreadExiting() {
			line.close();
			audioThread = null;
			cv.repaint();
		}

		
		@Override // JSAudioThreadOwner
		public int fillAudioBuffer() {
			int qi;
			int i, i2;
			int outlen = myBufferLength;
			while (true) {
				int max = 0;
				i = outbp;
				for (i2 = 0; i2 < outlen; i2 += 4) {
					qi = (int) (fbufLo[i] * outputGain);
					if (qi > max)
						max = qi;
					if (qi < -max)
						max = -qi;
					audioByteBuffer[i2] = (byte) qi;
					audioByteBuffer[i2 + 1] = (byte) (qi >> 8);
					i = (i + 1) & fbufmask;
				}
				i = outbp;
				for (i2 = 2; i2 < outlen; i2 += 4) {
					qi = (int) (fbufRo[i] * outputGain);
					if (qi > max)
						max = qi;
					if (qi < -max)
						max = -qi;
					audioByteBuffer[i2 + 1] = (byte) (qi >> 8);
					audioByteBuffer[i2] = (byte) qi;
					i = (i + 1) & fbufmask;
				}
				// if we're getting overflow, adjust the gain
				if (max > 32767) {
					// System.out.println("max = " + max);
					outputGain *= 30000. / max;
					if (outputGain < 1e-8 || Double.isInfinite(outputGain)) {
						unstable = true;
						break;
					}
					continue;
				} else if (maxGain && max < 24000) {
					if (max == 0) {
						if (outputGain == 1)
							break;
						outputGain = 1;
					} else
						outputGain *= 30000. / max;
					continue;
				}
				break;
			}
			if (unstable)
				return 0;
			outbp = i;
			return outlen;
		}

		///////////// below here, unchanged ///////////////
		
		void setFilter(Filter f) {
			newFilter = f;
		}

		private void openLine() {
			try {
				stereo = (wform.getChannels() == 2);
				ss = (stereo ? 2 : 1);
				bitsPerSample = 16;
				nChannels = 2;
				rate = sampleRate;
				// mono will be carried out how?  Note this is littleEndian
				AudioFormat playFormat = new AudioFormat(rate, bitsPerSample, nChannels, true, false);
				DataLine.Info info = new DataLine.Info(SourceDataLine.class, playFormat);

				line = (SourceDataLine) AudioSystem.getLine(info);
				int n = getPower2(sampleRate/4);
				line.open(playFormat, n);
				line.start();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		private void doFilter(int sampleCount) {
			filt.run(fbufLi, fbufLo, inbp, fbufmask, sampleCount, stateL);
			filt.run(fbufRi, fbufRo, inbp, fbufmask, sampleCount, stateR);
			inbp = (inbp + sampleCount) & fbufmask;
			double q = fbufLo[(inbp - 1) & fbufmask];
			if (Double.isNaN(q) || Double.isInfinite(q))
				unstable = true;
		}

		private void doConvolveFilter(int sampleCount) {
			int i;
			int fi2 = inbp, i20;
			double filtA[] = ((DirectFilter) filt).aList;
			int cblen = getPower2(512 + filtA.length * 2);
			if (convolveBuf == null || convolveBuf.length != cblen)
				convolveBuf = new double[cblen];
			if (impulseBuf == null) {
				// take FFT of the impulse response
				impulseBuf = new double[cblen];
				for (i = 0; i != filtA.length; i++)
					impulseBuf[i * 2] = filtA[i];
				convFFT = new FFT(convolveBuf.length / 2);
				convFFT.transform(impulseBuf, false);
			}
			int cbptr = convBufPtr;
			// result = impulseLen+inputLen-1 samples long; result length
			// is fixed, so use it to get inputLen
			int cbptrmax = convolveBuf.length + 2 - 2 * filtA.length;
			// System.out.println("reading " + sampleCount);
			for (i = 0; i != sampleCount; i++, fi2++) {
				i20 = fi2 & fbufmask;
				convolveBuf[cbptr] = fbufLi[i20];
				convolveBuf[cbptr + 1] = fbufRi[i20];
				cbptr += 2;
				if (cbptr == cbptrmax) {
					// buffer is full, do the transform
					convFFT.transform(convolveBuf, false);
					double mult = 2. / cblen;
					int j;
					// multiply transforms to get convolution
					for (j = 0; j != cblen; j += 2) {
						double a = convolveBuf[j] * impulseBuf[j] - convolveBuf[j + 1]
								* impulseBuf[j + 1];
						double b = convolveBuf[j] * impulseBuf[j + 1] + convolveBuf[j + 1]
								* impulseBuf[j];
						convolveBuf[j] = a * mult;
						convolveBuf[j + 1] = b * mult;
					}
					// inverse transform to get signal
					convFFT.transform(convolveBuf, true);
					int fj2 = outbp, j20;
					int overlap = cblen - cbptrmax;
					// generate output that overlaps with old data
					for (j = 0; j != overlap; j += 2, fj2++) {
						j20 = fj2 & fbufmask;
						fbufLo[j20] += convolveBuf[j];
						fbufRo[j20] += convolveBuf[j + 1];
					}
					// generate new output
					for (; j != cblen; j += 2, fj2++) {
						j20 = fj2 & fbufmask;
						fbufLo[j20] = convolveBuf[j];
						fbufRo[j20] = convolveBuf[j + 1];
					}
					cbptr = 0;
					// output the sound
					doOutput(cbptrmax * 2);
					// System.out.println("outputting " + cbptrmax);
					// clear transform buffer
					for (j = 0; j != cblen; j++)
						convolveBuf[j] = 0;
				}
			}
			inbp = fi2 & fbufmask;
			convBufPtr = cbptr;
		}

		private void doOutput(int outlen) {
			if (audioByteBuffer.length < outlen)
				audioByteBuffer = new byte[outlen];
			myBufferLength = outlen;
			if (fillAudioBuffer() <= 0)
				return;
			line.write(audioByteBuffer, 0, myBufferLength);
			spectCt += outlen / 4;
		}
				
	}
	
	class VowelCanvas extends Canvas {
		VowelFrame pg;

		VowelCanvas(VowelFrame p) {
			pg = p;
		}

		@Override
		public Dimension getPreferredSize() {
			return new Dimension(300, 400);
		}

		@Override
		public void update(Graphics g) {
			pg.updateVowel(g);
		}

		@Override
		public void paint(Graphics g) {
			pg.updateVowel(g);
		}
	};

	class VowelLayout implements LayoutManager {
		public VowelLayout() {
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
			Insets insets = target.insets();
			int targetw = target.size().width - insets.left - insets.right;
			int cw = targetw * 7 / 10;
			int targeth = target.size().height - (insets.top + insets.bottom);
			target.getComponent(0).move(insets.left, insets.top);
			target.getComponent(0).resize(cw, targeth);
			int barwidth = targetw - cw;
			cw += insets.left;
			int i;
			int h = insets.top;
			for (i = 1; i < target.getComponentCount(); i++) {
				Component m = target.getComponent(i);
				if (m.isVisible()) {
					Dimension d = m.getPreferredSize();
					if (m instanceof Scrollbar)
						d.width = barwidth;
					if (m instanceof Choice)
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

}

