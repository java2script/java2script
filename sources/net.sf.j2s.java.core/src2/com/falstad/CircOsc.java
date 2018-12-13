package com.falstad;

//CircOsc.java (C) 2001 by Paul Falstad, www.falstad.com

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
import java.awt.image.MemoryImageSource;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Random;

import javax.sound.sampled.AudioFormat;

import java.applet.Applet;

import com.falstad.FFT;

import javajs.util.JSAudioThread;
import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.Choice;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Scrollbar;

//web_Ready
//web_AppletName= CircOsc
//web_Description= A simulation of waves in a circular membrane, showing its various vibrational modes. 
//web_JavaVersion= http://www.falstad.com/circosc/
//web_AppletImage= circosc.png
//web_Category= Physics - Mechanics
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= audio, graphics, AWT-to-Swing

//
//Conversion to JavaScript by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> a2s
//
//import java.awt [Applet, Button, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
//change paint() to paintComponent() in CircOscCanvas; paint() removed for frame
//
//Added Container main
//
//Changed add() to main.add()
//
//resize and show --> useFrame options
//
//added triggerShow()
//
//added JSThread

class CircOscCanvas extends Canvas {
	CircOscFrame pg;

	CircOscCanvas(CircOscFrame p) {
		pg = p;
	}

	public Dimension getPreferredSize() {
		return new Dimension(300, 400);
	}

	public void update(Graphics g) {
		pg.updateCircOsc(g);
	}

	public void paint(Graphics g) {
		pg.updateCircOsc(g);
	}
};

class CircOscLayout implements LayoutManager {
	public CircOscLayout() {
	}

	public void addLayoutComponent(String name, Component c) {
	}

	public void removeLayoutComponent(Component c) {
	}

	public Dimension preferredLayoutSize(Container target) {
		return new Dimension(500, 500);
	}

	public Dimension minimumLayoutSize(Container target) {
		return new Dimension(100, 100);
	}

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
};

public class CircOsc extends Applet implements ComponentListener {
	static CircOscFrame ogf;

	void destroyFrame() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}

	boolean started = false;

	public void init() {
		// addComponentListener(this);
		showFrame();
	}

	public static void main(String args[]) {
		ogf = new CircOscFrame(null);
		ogf.init();
	}

	void showFrame() {
		if (ogf == null) {
			started = true;
			try {
				ogf = new CircOscFrame(this);
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

	public void componentHidden(ComponentEvent e) {
	}

	public void componentMoved(ComponentEvent e) {
	}

	public void componentShown(ComponentEvent e) { /* showFrame(); */
	}

	public void componentResized(ComponentEvent e) {
	}

	public void destroy() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}
};

class CircOscFrame extends Frame implements ComponentListener, ActionListener,
		AdjustmentListener, MouseMotionListener, MouseListener, ItemListener {

	Dimension winSize;
	Image dbimage;

	Random random;
	int maxSampleCount = 70; // was 50
	int sampleCountR, sampleCountTh;
	int modeCountR, modeCountTh;
	int maxDispRModes = 5, maxDispThModes = 5;
	FFT fftTh;
	public static final double epsilon = .00001;
	public static final double epsilon2 = .003;

	public String getAppletInfo() {
		return "CircOsc Series by Paul Falstad";
	}

	Button sineButton;
	Button blankButton;
	Checkbox stoppedCheck;
	Checkbox soundCheck;
	Checkbox freqCheck;
	Choice modeChooser;
	Choice displayChooser;
	Choice display2Chooser;
	Checkbox colorCheck;
	Scrollbar dampingBar;
	Scrollbar brightnessBar;
	Scrollbar speedBar;
	Scrollbar forceBar;
	Scrollbar resBar;
	Scrollbar baseFreqBar;
	Scrollbar phasorBar;
	View view3d;
	View view2d;
	View viewFreq;
	boolean editingFunc;
	boolean dragStop;
	double cosTable[], sinTable[];
	double magcoef[][];
	double dampcoef[][];
	double phasecoef[][];
	double phasecoefcos[][];
	double phasecoefadj[][];
	double xformbuf[];
	double omega[][];
	static final double pi = 3.14159265358979323846;
	double step;
	double func[][];
	double funci[][];
	int xpoints[] = new int[4];
	int ypoints[] = new int[4];
	float modeFuncsR[][];
	float modeFuncsTh[][][];
	int selectedCoefX, selectedCoefY;
	double selectedGridX, selectedGridY;
	static final int SEL_NONE = 0;
	static final int SEL_FUNC_3D = 1;
	static final int SEL_FUNC_2D = 2;
	static final int SEL_MAG = 3;
	static final int MODE_PLUCK = 0;
	static final int MODE_STRIKE = 1;
	static final int MODE_VIEW_ROTATE = 2;
	static final int MODE_VIEW_ZOOM = 3;
	static final int DISP_3D_2D = 0;
	static final int DISP_3D = 1;
	static final int DISP_2D = 2;
	static final int DISP2_SOLID = 0;
	static final int DISP2_WIRE_XY = 1;
	static final int DISP2_WIRE_X = 2;
	static final int DISP2_WIRE_Y = 3;
	static final int COLOR_HEIGHT = 0;
	static final int COLOR_VEL = 1;
	static final int COLOR_NONE = 2;
	int selection;
	int dragX, dragY;
	int dragStartX, dragStartY;
	boolean dragSet, dragClear;
	double viewAngle, viewAngleDragStart;
	double viewZoom = 1, viewZoomDragStart;
	double scaleHeight = 6;
	double viewAngleCos = 1, viewAngleSin = 0;
	double viewHeight = -14, viewHeightDragStart;
	double viewDistance;
	double magDragStart;
	boolean dragging;
	boolean needPlay;
	double t;
	int pause;
	double scalex, scaley;
	int centerX3d;
	int centerY3d;
	double topz = 3;
	Container main;
	boolean showControls;
	public boolean useFrame;

	class View extends Rectangle {
		View(Dimension r) {
			super(r);
		}

		View(int a, int b, int c, int d) {
			super(a, b, c, d);
		}

		int pixels[];
		MemoryImageSource imageSource;
		Image memimage;
	}

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	CircOscCanvas cv;
	CircOsc applet;

	CircOscFrame(CircOsc a) {
		super("Circular Membrane Applet v1.6b");
		applet = a;
		useFrame = true;
		showControls = true;
	}

	boolean java2 = false;

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

		selectedCoefX = selectedCoefY = -1;
		main.setLayout(new CircOscLayout());
		cv = new CircOscCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		main.add(cv);
		main.add(sineButton = new Button("Fundamental"));
		sineButton.addActionListener(this);
		main.add(blankButton = new Button("Clear"));
		blankButton.addActionListener(this);

		stoppedCheck = new Checkbox("Stopped");
		stoppedCheck.addItemListener(this);
		main.add(stoppedCheck);

		freqCheck = new Checkbox("Show Frequencies", true);
		freqCheck.addItemListener(this);
		main.add(freqCheck);

		colorCheck = new Checkbox("Color", true);
		colorCheck.addItemListener(this);
		main.add(colorCheck);

		soundCheck = new Checkbox("Sound", false);
		soundCheck.addItemListener(this);
		if (java2)
			main.add(soundCheck);

		modeChooser = new Choice();
		modeChooser.add("Mouse = Poke membrane");
		modeChooser.add("Mouse = Strike membrane");
		modeChooser.add("Mouse = Adjust view angle");
		modeChooser.add("Mouse = Adjust view zoom");
		modeChooser.addItemListener(this);
		main.add(modeChooser);
		modeChooser.select(MODE_VIEW_ROTATE);

		displayChooser = new Choice();
		displayChooser.add("Display 3d+2d");
		displayChooser.add("Display 3d only");
		displayChooser.add("Display 2d only");
		displayChooser.addItemListener(this);
		main.add(displayChooser);
		displayChooser.select(DISP_3D);

		display2Chooser = new Choice();
		display2Chooser.add("3d view = Solid");
		display2Chooser.add("3d view = Wireframe");
		display2Chooser.add("3d view = Wireframe theta");
		display2Chooser.add("3d view = Wireframe r");
		display2Chooser.addItemListener(this);
		main.add(display2Chooser);

		main.add(new Label("Simulation Speed", Label.CENTER));
		main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 105, 1, 1, 250));
		speedBar.addAdjustmentListener(this);

		main.add(new Label("Damping", Label.CENTER));
		main.add(dampingBar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 5, 0, 100));
		dampingBar.addAdjustmentListener(this);

		main.add(new Label("Brightness", Label.CENTER));
		main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 100));
		brightnessBar.addAdjustmentListener(this);

		main.add(new Label("Resolution", Label.CENTER));
		main.add(resBar = new Scrollbar(Scrollbar.HORIZONTAL, 16, 1, 2,
				maxSampleCount / 2));
		resBar.addAdjustmentListener(this);

		if (java2)
			main.add(new Label("Base Frequency", Label.CENTER));
		baseFreqBar = new Scrollbar(Scrollbar.HORIZONTAL, 84, 12, 49, 127);
		if (java2)
			main.add(baseFreqBar);
		baseFreqBar.addAdjustmentListener(this);
		baseFreqBar.disable();

		main.add(new Label("Freq Display Count", Label.CENTER));
		main.add(phasorBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 66));
		phasorBar.addAdjustmentListener(this);

		setResolution();
		setMaxDispModes();

		try {
			String param = applet.getParameter("PAUSE");
			if (param != null)
				pause = Integer.parseInt(param);
		} catch (Exception e) {
		}

		random = new Random();
		setDamping();
		reinit();
		cv.setBackground(Color.black);
		cv.setForeground(Color.lightGray);

		if (useFrame) {
			// BH: could do this instead:
			//   getContentPane().setPreferredSize(new Dimension(800, 640));
			//   pack();
			setSize(800, 640);
			// but I think there are bugs in Java's handling of this, because
			// in my testing with Java it still did not set the client dimension
			// correctly in Java.
			
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
		finished = true;

		// resize(640, 640);
		// handleResize();
		// Dimension x = getSize();
		// Dimension screen = getToolkit().getScreenSize();
		// setLocation((screen.width - x.width)/2,
		// (screen.height - x.height)/2);
		// show();
	}

	void reinit() {
		doSine();
	}

	boolean shown = false;

	public void triggerShow() {
		if (!shown)
			setVisible(true);
		shown = true;
	}

	void handleResize() {
		Dimension d = winSize = cv.getSize();
		if (winSize.width == 0 || winSize.height == 0)
			return;
		dbimage = createImage(d.width, d.height);
		setupDisplay();
	}

	void setupDisplay() {
		view3d = view2d = viewFreq = null;
		displayOrder = null;
		switch (displayChooser.getSelectedIndex()) {
		case DISP_3D:
			if (!freqCheck.getState())
				view3d = new View(winSize);
			else {
				view3d = new View(0, 0, winSize.width, winSize.height / 2);
				viewFreq = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			}
			break;
		case DISP_2D:
			if (!freqCheck.getState())
				view2d = new View(winSize);
			else {
				view2d = new View(0, 0, winSize.width, winSize.height / 2);
				viewFreq = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			}
			break;
		case DISP_3D_2D:
		default:
			if (!freqCheck.getState()) {
				view3d = new View(0, 0, winSize.width, winSize.height / 2);
				view2d = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			} else {
				view3d = new View(0, 0, winSize.width / 2, winSize.height / 2);
				view2d = new View(winSize.width / 2, 0, winSize.width / 2,
						winSize.height / 2);
				viewFreq = new View(0, winSize.height / 2, winSize.width,
						winSize.height / 2);
			}
			break;
		}
		if (viewFreq != null) {
			int tw = getTermWidth();
			int h = tw * (maxDispRModes + 1);
			int pad = viewFreq.height - h;
			if (pad > 0) {
				viewFreq.y += pad;
				viewFreq.height -= pad;
				if (view3d != null)
					view3d.height += pad;
				if (view2d != null)
					view2d.height += pad;
			}
			int w = tw * (maxDispThModes + 1);
			pad = (viewFreq.width - w) / 2;
			if (pad > 0)
				viewFreq.x += pad;
		}
		if (view2d != null) {
			int dim = (view2d.width < view2d.height) ? view2d.width : view2d.height;
			view2d.x += (view2d.width - dim) / 2;
			view2d.y += (view2d.height - dim) / 2;
			view2d.width = dim;
			view2d.height = dim;
			setupRaster(view2d);
			brightnessBar.enable();
		} else
			brightnessBar.disable();
		if (view3d != null)
			setupRaster(view3d);
	}

	void setupRaster(View v) {
		v.pixels = null;
		if (java2) {
			try {
				/*
				 * simulate the following code using reflection: dbimage = new
				 * BufferedImage(d.width, d.height, BufferedImage.TYPE_INT_RGB);
				 * DataBuffer db = (DataBuffer)(((BufferedImage)memimage).
				 * getRaster().getDataBuffer()); DataBufferInt dbi = (DataBufferInt) db;
				 * pixels = dbi.getData();
				 */
				Class biclass = Class.forName("java.awt.image.BufferedImage");
				Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
				Class rasclass = Class.forName("java.awt.image.Raster");
				Constructor cstr = biclass.getConstructor(new Class[] { int.class,
						int.class, int.class });
				v.memimage = (Image) cstr.newInstance(new Object[] {
						new Integer(v.width), new Integer(v.height), new Integer(1) }); // BufferedImage.TYPE_INT_RGB)});
				Method m = biclass.getMethod("getRaster", null);
				Object ras = m.invoke(v.memimage, null);
				Object db = rasclass.getMethod("getDataBuffer", null).invoke(ras, null);
				v.pixels = (int[]) dbiclass.getMethod("getData", null).invoke(db, null);
			} catch (Exception ee) {
				// ee.printStackTrace();
				System.out.println("BufferedImage failed");
			}
		}
		if (v.pixels == null) {
			v.pixels = new int[v.width * v.height];
			int i;
			for (i = 0; i != v.width * v.height; i++)
				v.pixels[i] = 0xFF000000;
			v.imageSource = new MemoryImageSource(v.width, v.height, v.pixels, 0,
					v.width);
			v.imageSource.setAnimated(true);
			v.imageSource.setFullBufferUpdates(true);
			v.memimage = cv.createImage(v.imageSource);
		}
	}

	void doSine() {
		doBlank();
		magcoef[0][0] = 1;
		t = 0;
		doPlay();
	}

	void doPluck(double val) {
		val *= 5;

		// calculate plucked membrane shape using an image charge
		// method from electrostatics
		int i, j, x, y;
		double b = java.lang.Math.sqrt(selectedGridX * selectedGridX
				+ selectedGridY * selectedGridY);
		if (b >= 1)
			return;
		double imagex = 1e8, imagey = 0;
		double imageb = 1e8;
		if (b > 0) {
			imageb = (b == 0) ? 1e8 : 1 / b;
			imagex = selectedGridX * imageb / b;
			imagey = selectedGridY * imageb / b;
		}
		double subout = java.lang.Math.log(1 - b) - java.lang.Math.log(imageb - 1);
		double fudge = .0001;
		double mulout = val
				/ (java.lang.Math.log(fudge) - java.lang.Math.log(imageb + fudge) - subout);
		for (x = 0; x != sampleCountR; x++)
			for (y = 0; y != sampleCountTh; y++) {
				double th = y * 2 * pi / sampleCountTh - viewAngle;
				double xx = -java.lang.Math.cos(th) * x / sampleCountR;
				double yy = -java.lang.Math.sin(th) * x / sampleCountR;
				double xx1 = xx - selectedGridX;
				double xx2 = xx - imagex;
				double yy1 = yy - selectedGridY;
				double yy2 = yy - imagey;
				double r1 = java.lang.Math.sqrt(yy1 * yy1 + xx1 * xx1);
				double r2 = java.lang.Math.sqrt(yy2 * yy2 + xx2 * xx2);
				double rfunc = (java.lang.Math.log(r1 + fudge)
						- java.lang.Math.log(r2 + fudge) - subout)
						* mulout;
				func[y][x] = rfunc;
			}
		transform();
		cv.repaint(pause);
	}

	void transform() {
		t = 0;
		int i, j;

		// zero out magcoef and phasecoef arrays. phasecoef is used to
		// calculate the norms of the various modes.
		for (i = 0; i != modeCountTh; i++)
			for (j = 0; j != modeCountR; j++)
				magcoef[i][j] = phasecoef[i][j] = 0;

		int r, th;

		// integrate the function func[][] with each mode times r (since the
		// modes are only orthogonal with a weighting function of r) and also
		// integrate each mode with itself times r to get the norm.
		for (r = 0; r <= sampleCountR; r++) {
			// fft each set of samples at constant r
			for (th = 0; th != sampleCountTh * 2; th++)
				xformbuf[th] = 0;
			for (th = 0; th != sampleCountTh; th++)
				xformbuf[th * 2] = func[th][r] * r;
			fftTh.transform(xformbuf);

			// perform integration step for each m=0 mode
			for (j = 0; j != modeCountR; j++) {
				magcoef[0][j] += modeFuncsR[j][r] * xformbuf[0];
				phasecoef[0][j] += modeFuncsR[j][r] * modeFuncsR[j][r] * r
						* sampleCountTh;
			}

			// perform integration step with each m>0 mode
			int wc = sampleCountTh * 2;
			int wm = wc - 1;
			for (i = 1; i < modeCountTh; i += 2) {
				for (j = 0; j != modeCountR; j++) {
					int ii = i + 1;
					int i2 = i / 2;
					// cos component contributes to odd i modes
					magcoef[i][j] += modeFuncsTh[i2][j][r] * .5
							* (xformbuf[ii] + xformbuf[wm & (-ii)]);
					// sin component contributes to even i modes
					magcoef[i + 1][j] += modeFuncsTh[i2][j][r] * .5
							* (xformbuf[ii + 1] - xformbuf[wm & (-ii + 1)]);
					// calculate norm. also multiply in 1/2 which is the
					// result of integrating sin or cos around the circle.
					phasecoef[i][j] += modeFuncsTh[i2][j][r] * modeFuncsTh[i2][j][r] * r
							* sampleCountTh * .5;
					phasecoef[i + 1][j] = phasecoef[i][j];
				}
			}
		}

		// divide out the norms
		for (i = 0; i != modeCountTh; i++)
			for (j = 0; j != modeCountR; j++) {
				magcoef[i][j] /= phasecoef[i][j];
				phasecoefadj[i][j] = 0;
				phasecoef[0][j] = 0;
			}

		needPlay = true;
	}

	void doStrike(double val) {
		val *= 10;
		int i, j, x, y;
		double striker = .2;

		// struck membrane shape is zero everywhere except in small
		// area around strike point
		for (x = 0; x != sampleCountR; x++) {
			for (y = 0; y != sampleCountTh; y++) {
				double th = y * 2 * pi / sampleCountTh - viewAngle;
				double xx = -java.lang.Math.cos(th) * x / sampleCountR - selectedGridX;
				double yy = -java.lang.Math.sin(th) * x / sampleCountR - selectedGridY;
				double r = java.lang.Math.sqrt(yy * yy + xx * xx);
				double rfunc = 0;
				if (r < striker)
					rfunc = val * (striker - r);
				func[y][x] = rfunc;
			}
		}
		transform();
		cv.repaint(pause);
	}

	void doBlank() {
		handleResize();
		int x, y;
		for (x = 0; x != modeCountTh; x++)
			for (y = 0; y != modeCountR; y++)
				magcoef[x][y] = 0;
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

	int displayOrder[];

	long lastTime;

	public void updateCircOsc(Graphics realg) {
		if (winSize == null || winSize.width == 0 || dbimage == null)
			return;
		Graphics g = dbimage.getGraphics();
		boolean allQuiet = true;
		double tadd = 0;
		if (!stoppedCheck.getState()) {
			int val = speedBar.getValue();
			tadd = java.lang.Math.exp(val / 20.) * (.1 / 50);
			long sysTime = System.currentTimeMillis();
			if (lastTime == 0)
				lastTime = sysTime;
			tadd *= (sysTime - lastTime) * (1 / 170.);
			t += tadd;
			lastTime = sysTime;
			allQuiet = false;
		} else
			lastTime = 0;
		Color gray1 = new Color(76, 76, 76);
		Color gray2 = new Color(127, 127, 127);
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());

		int x, y;
		int i, j;
		if (dragStop) {
			t = 0;
			lastTime = 0;
		}
		for (i = 0; i != modeCountTh; i++) {
			for (j = 0; j != modeCountR; j++) {
				if (magcoef[i][j] < epsilon && magcoef[i][j] > -epsilon) {
					magcoef[i][j] = phasecoef[i][j] = phasecoefadj[i][j] = 0;
					continue;
				}
				magcoef[i][j] *= Math.exp(dampcoef[i][j] * tadd);
				phasecoef[i][j] = (omega[i][j] * t + phasecoefadj[i][j]) % (2 * pi);
				phasecoefcos[i][j] = java.lang.Math.cos(phasecoef[i][j]);
			}
		}
		genFunc();
		double brightmult = brightnessBar.getValue() / 10.;
		int half = sampleCountTh / 2;
		// System.out.print(xdir + " " + ydir + " " + xFirst + " " +
		// viewAngleSin + " " + viewAngleCos+ "\n");

		if (view3d != null) {
			scaleworld();
			for (x = 0; x != sampleCountTh + 1; x++) {
				double th = 2 * pi * (x - half) / sampleCountTh;
				;
				cosTable[x] = Math.cos(th);
				sinTable[x] = Math.sin(th);
			}
			if (display2Chooser.getSelectedIndex() == DISP2_SOLID) {
				int pixels[] = view3d.pixels;
				for (x = 0; x != view3d.width * view3d.height; x++)
					pixels[x] = 0xFF000000;
				if (displayOrder == null)
					displayOrder = getDisplayOrder();
				int sc2 = sampleCountR * sampleCountTh;
				for (i = 0; i != sc2; i++) {
					int de = displayOrder[i];
					x = de % sampleCountTh;
					y = de / sampleCountTh;
					map3d(x, y, func[x][y], xpoints, ypoints, 0);
					map3d(x + 1, y, func[x + 1][y], xpoints, ypoints, 1);
					map3d(x, y + 1, func[x][y + 1], xpoints, ypoints, 2);
					map3d(x + 1, y + 1, func[x + 1][y + 1], xpoints, ypoints, 3);
					double qx = func[x + 1][y] - func[x][y];
					double qy = func[x][y + 1] - func[x][y];
					double normdot = (qx + qy + 1) * (1 / 1.73)
							/ java.lang.Math.sqrt(qx * qx + qy * qy + 1);
					int col = computeColor(x, y, normdot);
					fillTriangle(view3d, xpoints[0], ypoints[0], xpoints[1], ypoints[1],
							xpoints[3], ypoints[3], col);
					fillTriangle(view3d, xpoints[0], ypoints[0], xpoints[2], ypoints[2],
							xpoints[3], ypoints[3], col);
				}
				if (view3d.imageSource != null)
					view3d.imageSource.newPixels();
				g.drawImage(view3d.memimage, view3d.x, view3d.y, null);
			} else {
				boolean needX = (display2Chooser.getSelectedIndex() != DISP2_WIRE_Y);
				boolean needY = (display2Chooser.getSelectedIndex() != DISP2_WIRE_X);
				if (displayOrder == null)
					displayOrder = getDisplayOrder();
				int sc2 = sampleCountR * sampleCountTh;
				for (i = 0; i != sc2; i++) {
					int de = displayOrder[i];
					x = de % sampleCountTh;
					y = de / sampleCountTh;
					g.setColor(new Color(computeColor(x, y, 0)));
					map3d(x, y, func[x][y], xpoints, ypoints, 0);
					if (x < sampleCountTh && needX) {
						map3d(x + 1, y, func[x + 1][y], xpoints, ypoints, 1);
						g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
					}
					if (y < sampleCountR && needY) {
						map3d(x, y + 1, func[x][y + 1], xpoints, ypoints, 2);
						g.drawLine(xpoints[0], ypoints[0], xpoints[2], ypoints[2]);
					}
				}
			}
		}
		if (view2d != null) {
			int rcol = 0x00010000;
			int gcol = 0x00000100;
			int cx = view2d.width / 2;
			int cy = view2d.height / 2;
			int cr = view2d.width / 2;
			for (x = 0; x != sampleCountTh; x++) {
				double th2 = 2 * pi * (x + 1) / sampleCountTh - viewAngle + .001;
				cosTable[x] = Math.cos(th2);
				sinTable[x] = Math.sin(th2);
			}
			for (y = 0; y != sampleCountR; y++) {
				double r1 = -cr * y / sampleCountR;
				double r2 = -cr * (y + 1) / sampleCountR;
				double th1 = -viewAngle;
				double costh1 = Math.cos(th1);
				double sinth1 = Math.sin(th1);
				xpoints[0] = (int) (cx + r1 * costh1);
				ypoints[0] = (int) (cy - r1 * sinth1);
				xpoints[3] = (int) (cx + r2 * costh1);
				ypoints[3] = (int) (cy - r2 * sinth1);
				for (x = 0; x != sampleCountTh; x++) {
					int val;
					val = (int) (255 * brightmult * func[x][y]);
					if (val < -255)
						val = -255;
					if (val > 255)
						val = 255;
					int col = 0;
					if (val < 0)
						col = 0xFF000000 + rcol * -val;
					else
						col = 0xFF000000 + gcol * val;
					double costh2 = cosTable[x];
					double sinth2 = sinTable[x];
					xpoints[1] = (int) (cx + r1 * costh2);
					ypoints[1] = (int) (cy - r1 * sinth2);
					xpoints[2] = (int) (cx + r2 * costh2);
					ypoints[2] = (int) (cy - r2 * sinth2);

					fillTriangle(view2d, xpoints[0], ypoints[0], xpoints[1], ypoints[1],
							xpoints[2], ypoints[2], col);
					fillTriangle(view2d, xpoints[0], ypoints[0], xpoints[2], ypoints[2],
							xpoints[3], ypoints[3], col);
					xpoints[0] = xpoints[1];
					ypoints[0] = ypoints[1];
					xpoints[3] = xpoints[2];
					ypoints[3] = ypoints[2];
				}
			}
			if (view2d.imageSource != null)
				view2d.imageSource.newPixels();
			g.drawImage(view2d.memimage, view2d.x, view2d.y, null);
			g.setColor(Color.white);
			g.drawOval(view2d.x, view2d.y, view2d.width, view2d.height);
		}
		/*
		 * long t3 = System.currentTimeMillis(); System.out.println("q " + (t3-t2));
		 */
		if (viewFreq != null) {
			int termWidth = getTermWidth();
			g.setColor(Color.white);
			for (i = 0; i <= maxDispRModes; i++) {
				x = i * termWidth;
				g.drawLine(viewFreq.x, x + viewFreq.y, viewFreq.x + termWidth
						* maxDispThModes, x + viewFreq.y);
			}
			for (i = 0; i <= maxDispThModes; i++) {
				x = i * termWidth;
				g.drawLine(viewFreq.x + x, viewFreq.y, viewFreq.x + x, viewFreq.y
						+ termWidth * maxDispRModes);
			}
			int rcol = 0x00010000;
			int gcol = 0x00000100;
			for (i = 0; i != maxDispThModes; i++)
				for (j = 0; j != maxDispRModes; j++) {
					x = viewFreq.x + i * termWidth;
					y = viewFreq.y + j * termWidth;
					int val = logcoef(magcoef[i][j]);
					if (val < -255)
						val = -255;
					if (val > 255)
						val = 255;
					if (val < 0)
						g.setColor(new Color(0xFF000000 + rcol * -val));
					else
						g.setColor(new Color(0xFF000000 + gcol * val));
					g.fillRect(x + 1, y + 1, termWidth - 1, termWidth - 1);
					int phx = (int) (phasecoefadj[i][j] * termWidth * (1 / (pi * 2)));
					if (phx > 0) {
						g.setColor(Color.blue);
						g.drawLine(x + phx, y + 1, x + phx, y + termWidth);
					}
					if (selectedCoefX != -1
							&& omega[selectedCoefX][selectedCoefY] == omega[i][j]) {
						g.setColor(Color.yellow);
						g.drawRect(x, y, termWidth, termWidth);
					}
				}
		}

		realg.drawImage(dbimage, 0, 0, this);
		if (dragStop)
			allQuiet = true;
		if (!stoppedCheck.getState() && !allQuiet)
			cv.repaint(pause);
	}

	int computeColor(int x, int y, double c) {
		double h = func[x][y];
		if (!colorCheck.getState()) {
			h = 0;
			if (display2Chooser.getSelectedIndex() != DISP2_SOLID)
				return 0xFFFFFFFF;
		}
		if (c < 0)
			c = 0;
		if (c > 1)
			c = 1;
		c = .5 + c * .5;
		double redness = (h < 0) ? -h : 0;
		double grnness = (h > 0) ? h : 0;
		if (redness > 1)
			redness = 1;
		if (grnness > 1)
			grnness = 1;
		if (grnness < 0)
			grnness = 0;
		if (redness < 0)
			redness = 0;
		double grayness = (1 - (redness + grnness)) * c;
		double gray = .6;
		int ri = (int) ((c * redness + gray * grayness) * 255);
		int gi = (int) ((c * grnness + gray * grayness) * 255);
		int bi = (int) ((gray * grayness) * 255);
		return 0xFF000000 | (ri << 16) | (gi << 8) | bi;
	}

	void genFunc() {
		int i, j, th, r;
		int wc = sampleCountTh * 2;
		int wm = wc - 1;

		// step through each value of r and use inverse fft to calculate
		// values for all theta
		for (r = 0; r <= sampleCountR; r++) {
			for (i = 0; i != wc; i++)
				xformbuf[i] = 0;

			// calculate contribution from modes with m=0
			double d0 = 0;
			for (j = 0; j != modeCountR; j++)
				d0 += modeFuncsR[j][r] * magcoef[0][j] * phasecoefcos[0][j];
			xformbuf[0] = d0;

			// calculate contributions from modes with m>0
			for (i = 1; i < modeCountTh; i += 2) {
				double dc = 0, ds = 0;
				int ii = (i + 1) / 2;
				int i2 = i / 2;
				for (j = 0; j != modeCountR; j++) {
					dc += modeFuncsTh[i2][j][r] * magcoef[i][j] * phasecoefcos[i][j];
					ds += modeFuncsTh[i2][j][r] * magcoef[i + 1][j]
							* phasecoefcos[i + 1][j];
				}
				// put in cosine modes
				xformbuf[ii * 2] = .5 * dc;
				xformbuf[wm & (wc - ii * 2)] = .5 * dc;
				// put in sine modes
				xformbuf[ii * 2 + 1] = -.5 * ds;
				xformbuf[wm & (wc - ii * 2 + 1)] = .5 * ds;
			}

			// take fft
			fftTh.transform(xformbuf);

			for (i = 0; i != sampleCountTh; i++)
				func[i][r] = xformbuf[i * 2];
			func[sampleCountTh][r] = func[0][r];
		}
	}

	void fillTriangle(View view, int x1, int y1, int x2, int y2, int x3, int y3,
			int col) {
		if (x1 > x2) {
			if (x2 > x3) {
				// x1 > x2 > x3
				int ay = interp(x1, y1, x3, y3, x2);
				fillTriangle1(view, x3, y3, x2, y2, ay, col);
				fillTriangle1(view, x1, y1, x2, y2, ay, col);
			} else if (x1 > x3) {
				// x1 > x3 > x2
				int ay = interp(x1, y1, x2, y2, x3);
				fillTriangle1(view, x2, y2, x3, y3, ay, col);
				fillTriangle1(view, x1, y1, x3, y3, ay, col);
			} else {
				// x3 > x1 > x2
				int ay = interp(x3, y3, x2, y2, x1);
				fillTriangle1(view, x2, y2, x1, y1, ay, col);
				fillTriangle1(view, x3, y3, x1, y1, ay, col);
			}
		} else {
			if (x1 > x3) {
				// x2 > x1 > x3
				int ay = interp(x2, y2, x3, y3, x1);
				fillTriangle1(view, x3, y3, x1, y1, ay, col);
				fillTriangle1(view, x2, y2, x1, y1, ay, col);
			} else if (x2 > x3) {
				// x2 > x3 > x1
				int ay = interp(x2, y2, x1, y1, x3);
				fillTriangle1(view, x1, y1, x3, y3, ay, col);
				fillTriangle1(view, x2, y2, x3, y3, ay, col);
			} else {
				// x3 > x2 > x1
				int ay = interp(x3, y3, x1, y1, x2);
				fillTriangle1(view, x1, y1, x2, y2, ay, col);
				fillTriangle1(view, x3, y3, x2, y2, ay, col);
			}
		}
	}

	int interp(int x1, int y1, int x2, int y2, int x) {
		if (x1 == x2)
			return y1;
		if (x < x1 && x < x2 || x > x1 && x > x2)
			System.out.print("interp out of bounds\n");
		return (int) (y1 + ((double) x - x1) * (y2 - y1) / (x2 - x1));
	}

	void fillTriangle1(View v, int x1, int y1, int x2, int y2, int y3, int col) {
		// x2 == x3
		int dir = (x1 > x2) ? -1 : 1;
		int x = x1;
		if (x < 0) {
			x = 0;
			if (x2 < 0)
				return;
		}
		if (x >= v.width) {
			x = v.width - 1;
			if (x2 >= v.width)
				return;
		}
		if (y2 > y3) {
			int q = y2;
			y2 = y3;
			y3 = q;
		}
		// y2 < y3
		while (x != x2 + dir) {
			// XXX this could be speeded up
			int ya = interp(x1, y1, x2, y2, x);
			int yb = interp(x1, y1, x2, y3, x);
			if (ya < 0)
				ya = 0;
			if (yb >= v.height)
				yb = v.height - 1;

			int p1 = x + ya * v.width;
			int p2 = x + yb * v.width;
			for (; p1 <= p2; p1 += v.width)
				v.pixels[p1] = col;
			x += dir;
			if (x < 0 || x >= v.width)
				return;
		}
	}

	double logep2 = 0;

	int logcoef(double x) {
		double ep2 = epsilon2;
		int sign = (x < 0) ? -1 : 1;
		x *= sign;
		if (x < ep2)
			return 0;
		if (logep2 == 0)
			logep2 = -java.lang.Math.log(2 * ep2);
		return (int) (255 * sign * (java.lang.Math.log(x + ep2) + logep2) / logep2);
	}

	void map3d(int th, double r, double z, int xpoints[], int ypoints[], int pt) {
		z *= -scaleHeight;
		r *= 16. / sampleCountR;
		double x = r * cosTable[th];
		double y = r * sinTable[th];
		double realx = x * viewAngleCos + y * viewAngleSin; // range: [-10,10]
		double realy = z - viewHeight;
		double realz = y * viewAngleCos - x * viewAngleSin + viewDistance;
		xpoints[pt] = centerX3d + (int) (scalex * realx / realz);
		ypoints[pt] = centerY3d - (int) (scaley * realy / realz);
	}

	void scaleworld() {
		// scaley = -5 * viewZoom * view3d.height / topz; // was -15
		scalex = viewZoom * (view3d.width / 4) * viewDistance / 9.;
		scaley = -scalex;
		int y = (int) (scaley * viewHeight / viewDistance);
		centerX3d = view3d.x + view3d.width / 2;
		centerY3d = view3d.y + view3d.height / 2 - y;
	}

	int getTermWidth() {
		int termWidth1 = viewFreq.width / maxDispThModes;
		int termWidth2 = viewFreq.height / maxDispRModes;
		return (termWidth1 < termWidth2) ? termWidth1 : termWidth2;
	}

	int[] getDisplayOrder() {
		int sc2 = sampleCountTh * sampleCountR;
		int disp[] = new int[sc2];
		double dispz[] = new double[sc2];
		int i;
		for (i = 0; i != sc2; i++) {
			disp[i] = i;
			int x = i % sampleCountTh;
			int y = i / sampleCountTh;
			double th = 2 * step * x;
			double xd = y * java.lang.Math.cos(th);
			double yd = y * java.lang.Math.sin(th);
			dispz[i] = yd * viewAngleCos - xd * viewAngleSin;
		}
		qsort(disp, dispz, 0, sc2 - 1);
		return disp;
	}

	void qsort(int disp[], double dispz[], int lo0, int hi0) {
		int lo = lo0;
		int hi = hi0;

		if (hi0 > lo0) {
			/*
			 * Arbitrarily establishing partition element as the midpoint of the
			 * array.
			 */
			int part = (lo0 + hi0) / 2;
			double z = dispz[disp[part]];

			// loop through the array until indices cross
			while (lo <= hi) {
				/*
				 * find the first element that is greater than or equal to the partition
				 * element starting from the left Index.
				 */
				while ((lo < hi0) && dispz[disp[lo]] < z)
					++lo;

				/*
				 * find an element that is smaller than or equal to the partition
				 * element starting from the right Index.
				 */
				while ((hi > lo0) && dispz[disp[hi]] > z)
					--hi;

				// if the indexes have not crossed, swap
				if (lo <= hi) {
					int swap = disp[lo];
					disp[lo] = disp[hi];
					disp[hi] = swap;

					++lo;
					--hi;
				}
			}

			/*
			 * If the right index has not reached the left side of array must now sort
			 * the left partition.
			 */
			if (lo0 < hi)
				qsort(disp, dispz, lo0, hi);

			/*
			 * If the left index has not reached the right side of array must now sort
			 * the right partition.
			 */
			if (lo < hi0)
				qsort(disp, dispz, lo, hi0);
		}
	}

	void edit(MouseEvent e) {
		if (selection == SEL_NONE)
			return;
		int x = e.getX();
		int y = e.getY();
		switch (selection) {
		case SEL_MAG:
			editMag(x, y);
			break;
		case SEL_FUNC_2D:
			editFunc2D(x, y);
			break;
		case SEL_FUNC_3D:
			editFunc3D(x, y);
			break;
		}
	}

	void editMag(int x, int y) {
		if (selectedCoefX == -1)
			return;
		double coef = (dragStartY - y) / 20. + magDragStart;
		if (coef < -1)
			coef = -1;
		if (coef > 1)
			coef = 1;
		double pcoef = (x - dragStartX) / 10.;
		if (pcoef < 0)
			pcoef = 0;
		if (pcoef > 2 * pi)
			pcoef = 2 * pi;
		if (magcoef[selectedCoefX][selectedCoefY] == coef
				&& phasecoefadj[selectedCoefX][selectedCoefY] == pcoef)
			return;
		magcoef[selectedCoefX][selectedCoefY] = coef;
		phasecoefadj[selectedCoefX][selectedCoefY] = pcoef;
		cv.repaint(pause);
		needPlay = true;
	}

	int sign(int x) {
		return (x < 0) ? -1 : (x == 0) ? 0 : 1;
	}

	int abs(int x) {
		return x < 0 ? -x : x;
	}

	void editMagClick() {
		if (selectedCoefX == -1)
			return;
		if (magDragStart < .5)
			magcoef[selectedCoefX][selectedCoefY] = 1;
		else
			magcoef[selectedCoefX][selectedCoefY] = 0;
		phasecoefadj[selectedCoefX][selectedCoefY] = 0;
		cv.repaint(pause);
		doPlay();
	}

	void editFunc2D(int x, int y) {
		findGridPoint2D(x, y);
		editingFunc = dragStop = true;
		if (modeChooser.getSelectedIndex() == MODE_STRIKE)
			doStrike(1);
		else
			doPluck(1);
	}

	void editFunc3D(int x, int y) {
		if (modeChooser.getSelectedIndex() == MODE_VIEW_ROTATE) {
			viewAngle = (dragStartX - x) / 40. + viewAngleDragStart;
			while (viewAngle < 0)
				viewAngle += 2 * pi;
			while (viewAngle >= 2 * pi)
				viewAngle -= 2 * pi;
			viewAngleCos = java.lang.Math.cos(viewAngle);
			viewAngleSin = java.lang.Math.sin(viewAngle);
			viewHeight = (dragStartY - y) / 10. + viewHeightDragStart;
			displayOrder = null;
			cv.repaint(pause);
			return;
		}
		if (modeChooser.getSelectedIndex() == MODE_VIEW_ZOOM) {
			viewZoom = (x - dragStartX) / 40. + viewZoomDragStart;
			if (viewZoom < .1)
				viewZoom = .1;
			cv.repaint(pause);
			return;
		}
		double v = 1 + (dragStartY - y) / 40.;
		if (v < -1)
			v = -1;
		if (v > 1)
			v = 1;
		editingFunc = dragStop = true;
		if (modeChooser.getSelectedIndex() == MODE_PLUCK) {
			doPluck(v);
			return;
		}
		doStrike(v);
	}

	public void componentHidden(ComponentEvent e) {
	}

	public void componentMoved(ComponentEvent e) {
	}

	public void componentShown(ComponentEvent e) {
		cv.repaint(pause);
	}

	public void componentResized(ComponentEvent e) {
		handleResize();
		cv.repaint(pause);
	}

	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == sineButton) {
			doSine();
			cv.repaint();
		}
		if (e.getSource() == blankButton) {
			doBlank();
			cv.repaint();
		}
	}

	public void adjustmentValueChanged(AdjustmentEvent e) {
		System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
		if (e.getSource() == dampingBar || e.getSource() == speedBar)
			setDamping();
		if (e.getSource() == resBar || e.getSource() == phasorBar) {
			if (resBar.getValue() != modeCountR)
				setResolution();
			setMaxDispModes();
			setupDisplay();
		}
		cv.repaint(pause);
	}

	void setMaxDispModes() {
		maxDispRModes = phasorBar.getValue();
		maxDispThModes = maxDispRModes * 2 + 1;
		if (maxDispRModes > modeCountR)
			maxDispRModes = modeCountR;
		if (maxDispThModes > modeCountTh)
			maxDispThModes = modeCountTh;
	}

	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			applet.destroyFrame();
			return true;
		}
		return super.handleEvent(ev);
	}

	void setResolution() {
		int oldCountTh = modeCountTh;
		int oldCountR = modeCountR;
		// calculate number of samples in R and theta directions.
		// number of theta samples must be power of 2 (for fft)
		modeCountR = sampleCountR = resBar.getValue();
		sampleCountR *= 4;
		int sth = resBar.getValue() * 2;
		sampleCountTh = 1;
		while (sampleCountTh < sth)
			sampleCountTh *= 2;
		modeCountTh = sampleCountTh + 1;
		sampleCountTh *= 2;
		cosTable = new double[sampleCountTh + 1];
		sinTable = new double[sampleCountTh + 1];
		fftTh = new FFT(sampleCountTh);

		// allocate mode arrays
		double oldmagcoef[][] = magcoef;
		magcoef = new double[modeCountTh][modeCountR];
		phasecoef = new double[modeCountTh][modeCountR];
		phasecoefcos = new double[modeCountTh][modeCountR];
		phasecoefadj = new double[modeCountTh][modeCountR];
		xformbuf = new double[sampleCountTh * 2];
		func = new double[sampleCountTh + 1][sampleCountR + 1];
		funci = new double[sampleCountTh + 1][sampleCountR + 1];
		scaleHeight = 6;
		step = pi / sampleCountTh;
		viewDistance = 50;
		displayOrder = null;
		int m, n;
		omega = new double[modeCountTh][modeCountR];
		double angstep = step * 2;
		// m = angular modes
		// n = radial modes
		// System.out.print("calc omegas...\n");
		for (m = 0; m != modeCountTh; m++)
			for (n = 0; n != modeCountR; n++) {
				int realm = (m + 1) / 2;
				/*
				 * if (m == 0 || ((m+1) & 1) == 0) System.out.println(realm + " " +
				 * (n+1) + " " + zeroj(realm, n+1));
				 */
				omega[m][n] = zeroj(realm, n + 1) / sampleCountR;
			}
		// System.out.print("calc omegas...done\n");
		double jj[] = new double[modeCountTh + 1];
		int x, y;

		// x = th, y = r
		// allocate arrays for m=0 modes, and for angular modes.
		// each pair of angular modes share one entry in modeFuncsTh,
		// to save space and computation time.
		modeFuncsR = new float[modeCountR][sampleCountR + 1];
		modeFuncsTh = new float[modeCountTh / 2][modeCountR][sampleCountR + 1];
		System.out.print("calc modes...\n");
		for (n = 0; n != modeCountR; n++) {
			float max = 0;
			for (y = 0; y <= sampleCountR; y++) {
				// work around bess() bug at x=0
				if (y == 0)
					jj[1] = 1;
				else
					bess(0, y * omega[0][n], jj);
				float q = modeFuncsR[n][y] = (float) jj[1];
				if (q > max)
					max = q;
				if (q < -max)
					max = -q;
			}
			for (y = 0; y <= sampleCountR; y++)
				modeFuncsR[n][y] /= max;
		}
		int m2;
		for (m2 = 0; m2 != modeCountTh / 2; m2++) {
			m = m2 * 2 + 1;
			int realm = m2 + 1;
			for (n = 0; n != modeCountR; n++) {
				float max = 0;
				for (y = 0; y <= sampleCountR; y++) {
					// work around bess() bug at x=0
					if (y == 0)
						jj[realm + 1] = (realm == 0) ? 1 : 0;
					else
						bess(realm, y * omega[m][n], jj);
					float q = modeFuncsTh[m2][n][y] = (float) jj[realm + 1];
					if (q > max)
						max = q;
					if (q < -max)
						max = -q;
				}
				for (y = 0; y <= sampleCountR; y++)
					modeFuncsTh[m2][n][y] /= max;
			}
		}
		double mult = 1 / omega[0][0];
		int i, j;
		for (i = 0; i != modeCountTh; i++)
			for (j = 0; j != modeCountR; j++)
				omega[i][j] *= mult;
		if (oldmagcoef != null) {
			for (i = 0; i != oldCountTh && i != modeCountTh; i++)
				for (j = 0; j != oldCountR && j != modeCountR; j++)
					magcoef[i][j] = oldmagcoef[i][j];
		}

		setDamping();
		System.out.print("calc modes...done\n");
	}

	// this routine not tested for m_order > 64 or n_zero > 34 !!
	double zeroj(int m_order, int n_zero) {
		
		// Zeros of the Bessel function J(x)
		// Inputs
		// m_order Order of the Bessel function
		// n_zero Index of the zero (first, second, etc.)
		// Output
		// z The "n_zero"th zero of the Bessel function

		if (m_order >= 48 && n_zero == 1) {
			switch (m_order) {
			case 48:
				return 55.0283;
			case 49:
				return 56.0729;
			case 50:
				return 57.1169;
			case 51:
				return 58.1603;
			case 52:
				return 59.2032;
			case 53:
				return 60.2456;
			case 54:
				return 61.2875;
			case 55:
				return 62.3288;
			case 56:
				return 63.3697;
			case 57:
				return 64.4102;
			case 58:
				return 65.4501;
			case 59:
				return 66.4897;
			case 60:
				return 67.5288;
			case 61:
				return 68.5675;
			case 62:
				return 69.6058;
			case 63:
				return 70.6437;
			case 64:
				return 71.6812;
			}
		}
		if (m_order >= 62 && n_zero == 2) {
			switch (m_order) {
			case 62:
				return 75.6376;
			case 63:
				return 76.7021;
			case 64:
				return 77.7659;
			}
		}

		// * Use asymtotic formula for initial guess
		double beta = (n_zero + 0.5 * m_order - 0.25) * (3.141592654);
		double mu = 4 * m_order * m_order;
		double beta8 = 8 * beta;
		double beta82 = beta8 * beta8;
		double beta84 = beta82 * beta82;
		double z = beta - (mu - 1) / beta8 - 4 * (mu - 1) * (7 * mu - 31)
				/ (3 * beta82 * beta8);
		z -= 32 * (mu - 1) * (83 * mu * mu - 982 * mu + 3779)
				/ (15 * beta84 * beta8);
		z -= 64 * (mu - 1)
				* (6949 * mu * mu * mu - 153855 * mu * mu + 1585743 * mu - 6277237)
				/ (105 * beta84 * beta82 * beta8);

		// * Use Newton's method to locate the root
		double jj[] = new double[m_order + 3];
		int i;
		double deriv;
		for (i = 1; i <= 5; i++) {
			bess(m_order + 1, z, jj); // Remember j(1) is J_0(z)
			// Use the recursion relation to evaluate derivative
			deriv = -jj[m_order + 2] + m_order / z * jj[m_order + 1];
			z -= jj[m_order + 1] / deriv; // Newton's root finding
		}
		return (z);
	}

	void bess(int m_max, double x, double jj[]) {
		// Bessel function
		// Inputs
		// m_max Largest desired order
		// x = Value at which Bessel function J(x) is evaluated
		// Output
		// jj = Vector of J(x) for order m = 0, 1, ..., m_max

		// * Perform downward recursion from initial guess
		int maxmx = (m_max > x) ? m_max : ((int) x); // Max(m,x)
		// Recursion is downward from m_top (which is even)
		int m_top = 2 * ((int) ((maxmx + 15) / 2 + 1));
		double j[] = new double[m_top + 2];
		j[m_top + 1] = 0.0;
		j[m_top] = 1.0;
		double tinyNumber = 1e-16;
		int m;
		for (m = m_top - 2; m >= 0; m--)
			// Downward recursion
			j[m + 1] = 2 * (m + 1) / (x + tinyNumber) * j[m + 2] - j[m + 3];

		// * Normalize using identity and return requested values
		double norm = j[1]; // NOTE: Be careful, m=0,1,... but
		for (m = 2; m <= m_top; m += 2)
			// vector goes j(1),j(2),...
			norm += 2 * j[m + 1];
		for (m = 0; m <= m_max; m++)
			// Send back only the values for
			jj[m + 1] = j[m + 1] / norm; // m=0,...,m_max and discard values
	} // for m=m_max+1,...,m_top

	void setDamping() {
		int i, j;
		dampcoef = new double[modeCountTh][modeCountR];
		for (i = 0; i != modeCountTh; i++) {
			for (j = 0; j != modeCountR; j++) {
				double damper = dampingBar.getValue() / 40.;
				damper = java.lang.Math.exp(damper) - 1;
				double damp2 = omega[i][j]
						* java.lang.Math.sqrt(java.lang.Math.sqrt(1 + damper * damper
								/ (omega[i][j] * omega[i][j])) - 1);
				dampcoef[i][j] = -damp2 * .002;
			}
		}
	}

	void findGridPoint2D(int mx, int my) {
		int cx = view2d.x + view2d.width / 2;
		int cy = view2d.y + view2d.height / 2;
		int cr = view2d.width / 2;
		selectedGridX = (mx - cx) / (double) cr;
		selectedGridY = -(my - cy) / (double) cr;
		double r = java.lang.Math.sqrt(selectedGridX * selectedGridX
				+ selectedGridY * selectedGridY);
		if (r > 1) {
			selectedGridX /= r;
			selectedGridY /= r;
		}
	}

	void findGridPoint3D(int mx, int my) {
		int x, y;
		int bestr = 3600;
		selectedGridX = selectedGridY = 0;

		for (y = 0; y <= sampleCountR; y++)
			for (x = 0; x <= sampleCountTh; x++) {
				map3d(x, y, func[x][y], xpoints, ypoints, 0);
				int rx = (xpoints[0] - mx);
				int ry = (ypoints[0] - my);
				int r = rx * rx + ry * ry;
				if (r < bestr) {
					bestr = r;
					double th = (x + sampleCountTh / 2) * 2 * pi / sampleCountTh
							- viewAngle;
					selectedGridX = y * java.lang.Math.cos(th) / sampleCountR;
					selectedGridY = y * java.lang.Math.sin(th) / sampleCountR;
				}
			}
	}

	public void mouseDragged(MouseEvent e) {
		dragging = true;
		edit(e);
	}

	public void mouseMoved(MouseEvent e) {
		if (dragging)
			return;
		int x = e.getX();
		int y = e.getY();
		dragX = x;
		dragY = y;
		int panelHeight = getPanelHeight();
		int oldCoefX = selectedCoefX;
		int oldCoefY = selectedCoefY;
		selectedCoefX = -1;
		selectedCoefY = -1;
		selection = 0;
		if (view2d != null && view2d.inside(x, y))
			selection = SEL_FUNC_2D;
		else if (view3d != null && view3d.inside(x, y))
			selection = SEL_FUNC_3D;
		else if (viewFreq != null && viewFreq.inside(x, y)) {
			int termWidth = getTermWidth();
			selectedCoefX = (x - viewFreq.x) / termWidth;
			selectedCoefY = (y - viewFreq.y) / termWidth;
			if (selectedCoefX >= modeCountTh)
				selectedCoefX = selectedCoefY = -1;
			if (selectedCoefY >= modeCountR)
				selectedCoefX = selectedCoefY = -1;
			if (selectedCoefX != -1 && selectedCoefY != -1)
				selection = SEL_MAG;
		}
		if (selectedCoefX != oldCoefX || selectedCoefY != oldCoefY)
			cv.repaint(pause);
	}

	public void mouseClicked(MouseEvent e) {
		if (selection == SEL_MAG)
			editMagClick();
		if (e.getClickCount() == 2 && selectedCoefX != -1) {
			int i, j;
			for (i = 0; i != modeCountTh; i++)
				for (j = 0; j != modeCountR; j++)
					if (selectedCoefX != i || selectedCoefY != j)
						magcoef[i][j] = 0;
			magcoef[selectedCoefX][selectedCoefY] = 1;
			cv.repaint(pause);
		}
	}

	public void mouseEntered(MouseEvent e) {
	}

	public void mouseExited(MouseEvent e) {
		if (!dragging && selectedCoefX != -1) {
			selectedCoefX = selectedCoefY = -1;
			cv.repaint(pause);
		}
	}

	public void mousePressed(MouseEvent e) {
		mouseMoved(e);
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		if (selection == SEL_FUNC_3D)
			findGridPoint3D(e.getX(), e.getY());
		dragStartX = e.getX();
		dragStartY = e.getY();
		if (selectedCoefX != -1)
			magDragStart = magcoef[selectedCoefX][selectedCoefY];
		viewAngleDragStart = viewAngle;
		viewHeightDragStart = viewHeight;
		viewZoomDragStart = viewZoom;
		dragging = true;
		needPlay = false;
		edit(e);
	}

	public void mouseReleased(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		if (needPlay)
			doPlay();
		dragging = editingFunc = dragStop = false;
		dragSet = dragClear = false;
		mouseMoved(e);
		cv.repaint(pause);
	}

	private boolean finished;

	public void itemStateChanged(ItemEvent e) {
		if (!finished) {
			return;
		}
		if (e.getItemSelectable() == stoppedCheck) {
			cv.repaint(pause);
			return;
		}
		if (e.getItemSelectable() == displayChooser
				|| e.getItemSelectable() == freqCheck) {
			setupDisplay(); // commented this out because of an error when changing
											// the imports
			cv.repaint(pause);
		}
		if (e.getItemSelectable() == display2Chooser
				|| e.getItemSelectable() == colorCheck)
			cv.repaint(pause);
		if (e.getItemSelectable() == soundCheck) {
			if (soundCheck.getState()) {
				speedBar.setValue(250);
				dampingBar.setValue(40);
				setDamping();
				baseFreqBar.enable();
				doPlay();
			} else
				baseFreqBar.disable();
		}
	}

	double sndmax;

	// private boolean isJava = true;

	int getFreq(int n) {
		double stepsize = java.lang.Math.log(2) / 12;
		double freq = java.lang.Math.exp(baseFreqBar.getValue() * stepsize);
		// return (int) (freq*omega[n]);
		return 0;
	}

	FFT fftPlay;

	void doPlay() {
		if (!soundCheck.getState())
			return;
		final int rate = 22050;
		final int playSampleCount = 32768;

		byte b[] = new byte[playSampleCount];

		double stepsize = Math.log(2) / 12;
		double mx = .2;
		double nmult = 2 * pi / rate;
		double freq = Math.exp(baseFreqBar.getValue() * stepsize);
		double n = freq * nmult;
		// filter out frequencies above Nyquist freq
		double maxomega = pi / n;
		boolean failed;
		double sndmax = 1e-8;
		int i, j, k;

		double playfunc[] = new double[playSampleCount * 2];
		for (j = 0; j < modeCountTh; j += 2)
			for (k = 0; k != modeCountR; k++) {
				double f = omega[j][k] * freq;
				if (f < 20 || f > rate / 2)
					continue;
				int dfreq = ((int) (f * (double) playSampleCount / rate)) * 2;
				if (dfreq >= playSampleCount * 2)
					break;
				double mag = magcoef[j][k];
				if (j > 0) {
					double mag2 = magcoef[j - 1][k];
					mag = Math.sqrt(mag * mag + mag2 * mag2);
				}
				playfunc[dfreq + 1] += mag;
			}
		if (fftPlay == null)
			fftPlay = new FFT(playSampleCount);
		fftPlay.transform(playfunc);
		double damper = dampingBar.getValue() * 1e-5;
		damper = java.lang.Math.exp(damper) - 1;
		for (i = 0; i != playSampleCount; i++) {
			playfunc[i * 2] *= Math.exp(-damper * i);
			double dy = playfunc[i * 2];
			if (dy > sndmax)
				sndmax = dy;
			if (dy < -sndmax)
				sndmax = -dy;
		}
		if (sndmax < .01)
			return;
		double mult = 127 / sndmax;

		for (i = 0; i != playSampleCount; i++)
			b[i] = (byte) (playfunc[i * 2] * mult);

		new JSAudioThread(new AudioFormat(rate, 8, 1, true, true)).playOnce(b, 0,
				b.length);

		cv.repaint();
	}

}
