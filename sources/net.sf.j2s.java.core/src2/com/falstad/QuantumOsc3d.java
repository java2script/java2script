package com.falstad;

//QuantumOsc3d.java (c) 2002 by Paul Falstad, www.falstad.com.
//Rendering algorithm in this applet is based on the description of
//the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
//We raytrace through a 3-d dataset, sampling a number of points and
//integrating over them using Simpson's rule.
//


//web_Ready
//web_AppletName=3-D Quantum Harmonic Oscillator
//web_Description= Harmonic oscillator in three dimensions	
//web_JavaVersion= http://www.falstad.com/qm3dosc/
//web_AppletImage= quantumosc3d.png
//web_Category= Physics
//web_Date= $Date: 2016-12-31 17:53:43 -0600 (Sat, 31 Dec 2016) $


//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> a2s
//
//import java.awt [Applet, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
//Changed paint() to paintComponent() in EMStaticCanvas and EMStaticFrame
//
//Added Container main
//
//Changed add() to main.add()
//
// Added 'finished' boolean/state machine to itemState & adjustmentListener and at the end of init
//		--> otherwise it calls items before they exist

import java.applet.Applet;

import com.falstad.Complex;

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
import java.util.Vector;

import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.CheckboxMenuItem;
import java.awt.Choice;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Menu;
import java.awt.MenuBar;
import java.awt.MenuItem;
import java.awt.Scrollbar;

class QuantumOsc3dCanvas extends Canvas {
	QuantumOsc3dFrame pg;

	QuantumOsc3dCanvas(QuantumOsc3dFrame p) {
		pg = p;
	}

	public Dimension getPreferredSize() {
		return new Dimension(300, 400);
	}

	public void update(Graphics g) {
		pg.updateQuantumOsc3d(g);
	}

	public void paint(Graphics g) {
		pg.updateQuantumOsc3d(g);
	}
};

class QuantumOsc3dLayout implements LayoutManager {
	public QuantumOsc3dLayout() {
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

public class QuantumOsc3d extends Applet {
	static QuantumOsc3dFrame oc;

	void destroyFrame() {
		if (oc != null)
			oc.dispose();
		oc = null;
	}
	
	boolean started = false;

	public static void main(String args[]) {
		oc = new QuantumOsc3dFrame(null);
		oc.init();
	}

	public void init() {
		oc = new QuantumOsc3dFrame(this);
		oc.init();
	}

	public void destroy() {
		if (oc != null)
			oc.dispose();
		oc = null;
	}

	@Override
	public void paint(Graphics g) {
		String s = "Applet is open in a separate window.";
		if (!started)
			s = "Applet is starting.";
		else if (oc == null)
			s = "Applet is finished.";
		else if (oc.useFrame)
			oc.triggerShow();
		g.drawString(s, 10, 30);
		super.paint(g);
	}
};

class QuantumOsc3dFrame extends Frame implements ComponentListener,
		ActionListener, AdjustmentListener, MouseMotionListener, MouseListener,
		ItemListener {

	Thread engine = null;

	Dimension winSize;
	Image dbimage;

	Random random;
	int gridSizeX = 200;
	int gridSizeY = 200;

	public String getAppletInfo() {
		return "QuantumOsc3d by Paul Falstad";
	}

	Button blankButton;
	Button normalizeButton;
	Button maximizeButton;
	Checkbox stoppedCheck;
	CheckboxMenuItem colorCheck;
	CheckboxMenuItem eCheckItem;
	CheckboxMenuItem xCheckItem;
	CheckboxMenuItem lCheckItem;
	CheckboxMenuItem alwaysNormItem;
	CheckboxMenuItem axesItem;
	CheckboxMenuItem autoZoomItem;
	CheckboxMenuItem animatedZoomItem;
	Menu measureMenu, presetsMenu;
	MenuItem exitItem;
	MenuItem measureEItem;
	MenuItem measureLxItem;
	MenuItem measureLyItem;
	MenuItem measureLzItem;
	MenuItem dispGaussItem;
	MenuItem scaled1GaussItem;
	MenuItem scaled2GaussItem;
	MenuItem rotatingGaussItem;
	MenuItem dispX110Item;
	MenuItem dispZ110Item;
	Choice modeChooser;
	Choice viewChooser;
	Choice sliceChooser, nChooser, lChooser, mChooser;
	static final int SLICE_NONE = 0;
	static final int SLICE_X = 1;
	static final int SLICE_Y = 2;
	static final int SLICE_Z = 3;
	Scrollbar speedBar;
	Scrollbar resolutionBar;
	Scrollbar internalResBar;
	Scrollbar brightnessBar;
	Scrollbar scaleBar;
	Scrollbar sampleBar;
	View viewPotential, viewX, viewL, viewStates;
	View viewList[];
	int viewCount;
	Orbital orbitals[];
	int orbCount;
	Phasor phasors[];
	int phasorCount;
	BasisState states[];
	int stateCount;
	AlternateBasis rectBasis, lxBasis, lyBasis;
	AlternateBasis basisList[];
	int basisCount;
	TextBox textBoxes[];
	int textCount;
	boolean changingDerivedStates;
	double dragZoomStart;
	double zoom; // was 10
	double rotmatrix[];
	Rectangle viewAxes;
	static final double pi = 3.14159265358979323846;
	static final double pi2 = pi * 2;
	static final double root2 = 1.41421356237309504880;
	static final double root2inv = .70710678118654752440;
	static final double baseEnergy = 0;
	int xpoints[];
	int ypoints[];
	int selectedPaneHandle;
	double func[][][];
	PhaseColor phaseColors[][];
	double resadj;
	boolean dragging = false;
	MemoryImageSource imageSource;
	int pixels[];
	int sampleCount;
	int dataSize;
	static int maxModes = 10;
	static int maxDispCoefs = 8;
	static int viewDistance = 12;
	int pause;
	QuantumOsc3d applet;
	State selectedState;
	Phasor selectedPhasor;
	int selection = -1;
	static final int SEL_NONE = 0;
	static final int SEL_POTENTIAL = 1;
	static final int SEL_X = 2;
	static final int SEL_STATES = 3;
	static final int SEL_HANDLE = 4;
	static final int MODE_ANGLE = 0;
	static final int MODE_ROTATE_X = 1;
	static final int MODE_ROTATE_Y = 2;
	static final int MODE_ROTATE_Z = 3;
	static final int MODE_SLICE = 5;
	static final int VIEW_COMPLEX = 0;
	static final int VIEW_COMBO_COMP = 1;
	static final int VIEW_COMBO_RECT = 2;
	static final int VIEW_COMBO_N1 = 3;
	static final int VIEW_COMBO_N2 = 4;
	static final int VIEW_COMBO_N3 = 5;
	static final int VIEW_COMBO_N4 = 6;
	int slicerPoints[][];
	double sliceFaces[][];
	double sliceFace[];
	int sliceFaceCount;
	double sliceval = 0;
	int sampleMult[];
	boolean selectedSlice;
	boolean settingScale;
	double magDragStart;
	int dragX, dragY, dragStartX, dragStartY;
	double t = 0;
	public static final double epsilon = .01;
	static final int panePad = 4;
	static final int phaseColorCount = 50;
	double funcr, funci;
	int phiIndex, phiSector;
	double bestBrightness, userBrightMult = 1;
	boolean manualScale;
	Color gray2;
	FontMetrics fontMetrics;
	Container main;
	boolean ignoreAdjustments;

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	public boolean useFrame;
	boolean showControls;

	QuantumOsc3dCanvas cv;

	QuantumOsc3dFrame(QuantumOsc3d a) {
		super("3-D Quantum Oscillator Viewer");
		applet = a;
		useFrame = true;
		showControls = true;
	}

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
		gray2 = new Color(127, 127, 127);

		String os = System.getProperty("os.name");
		String jv = System.getProperty("java.version");
		boolean altRender = false;
		int res = 100;
		// change settings to speed things up where possible
		if (os.indexOf("Windows") == 0) {
			res = 100;
			if (jv.indexOf("1.1") == 0)
				altRender = true;
		}

		main.setLayout(new QuantumOsc3dLayout());
		cv = new QuantumOsc3dCanvas(this);
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
		m.add(eCheckItem = getCheckItem("Energy"));
		eCheckItem.setState(true);
		m.add(xCheckItem = getCheckItem("Position"));
		xCheckItem.setState(true);
		xCheckItem.disable();
		m.add(lCheckItem = getCheckItem("Angular Momentum"));
		m.addSeparator();
		m.add(colorCheck = getCheckItem("Phase as Color"));
		colorCheck.setState(true);

		measureMenu = m = new Menu("Measure");
		mb.add(m);
		m.add(measureEItem = getMenuItem("Measure Energy"));
		m.add(measureLxItem = getMenuItem("Measure Lx"));
		m.add(measureLyItem = getMenuItem("Measure Ly"));
		m.add(measureLzItem = getMenuItem("Measure Lz"));
//		setMenuBar(mb);

		m = new Menu("Options");
		mb.add(m);
		alwaysNormItem = getCheckItem("Always Normalize");
		m.add(axesItem = getCheckItem("Show Axes"));
		axesItem.setState(true);
		m.add(autoZoomItem = getCheckItem("Auto Scale"));
		autoZoomItem.setState(true);
		m.add(animatedZoomItem = getCheckItem("Animated Scaling"));
		animatedZoomItem.setState(true);

		presetsMenu = m = new Menu("Presets");
		mb.add(m);
		m.add(dispGaussItem = getMenuItem("Displaced Gaussian"));
		m.add(scaled1GaussItem = getMenuItem("Scaled Gaussian 1"));
		m.add(scaled2GaussItem = getMenuItem("Scaled Gaussian 2"));
		m.add(rotatingGaussItem = getMenuItem("Rotating Gaussian"));
		m.add(dispX110Item = getMenuItem("1,0,1 Displaced X"));
		m.add(dispZ110Item = getMenuItem("1,0,0 Displaced Z"));

		setMenuBar(mb);

		viewChooser = new Choice();
		viewChooser.add("Single Wave Functions");
		viewChooser.add("Combinations");
		viewChooser.add("Rectangular Combos");
		viewChooser.add("Multiple Bases (n=1)");
		viewChooser.add("Multiple Bases (n=2)");
		viewChooser.add("Multiple Bases (n=3)");
		viewChooser.add("Multiple Bases (n=4)");
		viewChooser.addItemListener(this);
		main.add(viewChooser);

		int i;
		nChooser = new Choice();
		for (i = 0; i <= maxnr; i++)
			nChooser.add("nr = " + i);
		nChooser.addItemListener(this);
		main.add(nChooser);
		nChooser.select(0);

		lChooser = new Choice();
		for (i = 0; i <= maxl; i++)
			lChooser.add("l = " + i
					+ ((i < 6) ? " (" + codeLetter[i] + ")" : ""));
		lChooser.addItemListener(this);
		main.add(lChooser);

		mChooser = new Choice();
		mChooser.addItemListener(this);
		main.add(mChooser);

		sliceChooser = new Choice();
		sliceChooser.add("No Slicing");
		sliceChooser.add("Show X Slice");
		sliceChooser.add("Show Y Slice");
		sliceChooser.add("Show Z Slice");
		sliceChooser.addItemListener(this);
		main.add(sliceChooser);

		modeChooser = new Choice();
		modeChooser.add("Mouse = Adjust View");
		modeChooser.add("Mouse = Rotate X");
		modeChooser.add("Mouse = Rotate Y");
		modeChooser.add("Mouse = Rotate Z");
		modeChooser.addItemListener(this);
		main.add(modeChooser);

		stoppedCheck = new Checkbox("Stopped");
		stoppedCheck.addItemListener(this);
		main.add(stoppedCheck);

		main.add(blankButton = new Button("Clear"));
		blankButton.addActionListener(this);
		main.add(normalizeButton = new Button("Normalize"));
		normalizeButton.addActionListener(this);
		main.add(maximizeButton = new Button("Maximize"));
		maximizeButton.addActionListener(this);

		lChooser.select(3);
		setLValue();

		main.add(new Label("Simulation Speed", Label.CENTER));
		main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 20, 1, 1, 200));
		speedBar.addAdjustmentListener(this);

		main.add(new Label("Brightness", Label.CENTER));
		main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 240, 1, 1,
				4000));
		brightnessBar.addAdjustmentListener(this);

		main.add(new Label("Image Resolution", Label.CENTER));
		main.add(resolutionBar = new Scrollbar(Scrollbar.HORIZONTAL, res, 2,
				20, 500));
		resolutionBar.addAdjustmentListener(this);

		/*
		 * add(new Label("Internal Resolution", Label.CENTER));
		 * add(internalResBar = new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20,
		 * 200)); internalResBar.addAdjustmentListener(this);
		 */

		main.add(new Label("Scale", Label.CENTER));
		main.add(scaleBar = new Scrollbar(Scrollbar.HORIZONTAL, 75, 1, 5, 1620));
		scaleBar.addAdjustmentListener(this);

		/*
		 * add(new Label("Samples", Label.CENTER)); add(sampleBar = new
		 * Scrollbar(Scrollbar.HORIZONTAL, 7, 1, 0, 20));
		 * sampleBar.addAdjustmentListener(this);
		 */

		main.add(new Label("http://www.falstad.com", Label.CENTER));

		try {
			String param = applet.getParameter("PAUSE");
			if (param != null)
				pause = Integer.parseInt(param);
		} catch (Exception e) {
		}

		int j;
		phaseColors = new PhaseColor[8][phaseColorCount + 1];
		for (i = 0; i != 8; i++)
			for (j = 0; j <= phaseColorCount; j++) {
				double ang = java.lang.Math.atan(j / (double) phaseColorCount);
				phaseColors[i][j] = genPhaseColor(i, ang);
			}

		slicerPoints = new int[2][5 * 2];
		sliceFaces = new double[4][3];

		rotmatrix = new double[9];
		rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
		rotate(0, -pi / 2);
		xpoints = new int[4];
		ypoints = new int[4];

		setupSimpson();
		setupStates();

		random = new Random();
		reinit();
		orbitalChanged();
		cv.setBackground(Color.black);
		cv.setForeground(Color.white);
		// resize(680, 650);
		// handleResize();
		// show();
		//
		if (useFrame) {
			setSize(800, 640);
			handleResize();
			Dimension x = getSize();
			Dimension screen = getToolkit().getScreenSize();
			setLocation((screen.width - x.width) / 2,
					(screen.height - x.height) / 2);
			setVisible(true);
		} else {
			setVisible(false);
			handleResize();
			applet.validate();
		}
		finished = true;

	}

	static final int maxnr = 11;
	static final int maxl = 10;

	void setupStates() {
		stateCount = (maxnr + 1) * ((maxl + 1) * (maxl + 1));
		int i;
		states = new BasisState[stateCount];
		int nr = 0;
		int l = 0;
		int m = 0;
		for (i = 0; i != stateCount; i++) {
			BasisState bs = states[i] = new BasisState();
			bs.elevel = 2 * nr + l + 1.5;
			bs.nr = nr;
			bs.l = l;
			bs.m = m;
			bs.n = 2 * nr + l;
			if (m < l)
				m++;
			else {
				l++;
				if (l <= maxl)
					m = -l;
				else {
					nr++;
					l = m = 0;
				}
			}
		}

		basisList = new AlternateBasis[17];
		basisCount = 0;

		rectBasis = setupRectBasis();
		lxBasis = initBasis(35, true);
		setupLBasis(lxBasis, 0, 0, true, l0Array);
		setupLBasis(lxBasis, 0, 1, true, l1xArray);
		setupLBasis(lxBasis, 0, 2, true, l2xArray);
		setupLBasis(lxBasis, 0, 3, true, l3xArray);
		setupLBasis(lxBasis, 0, 4, true, l4xArray);
		setupLBasis(lxBasis, 1, 0, true, l0Array);
		setupLBasis(lxBasis, 1, 1, true, l1xArray);
		setupLBasis(lxBasis, 1, 2, true, l2xArray);
		setupLBasis(lxBasis, 2, 0, true, l0Array);
		lyBasis = initBasis(35, true);
		setupLBasis(lyBasis, 0, 0, false, l0Array);
		setupLBasis(lyBasis, 0, 1, false, l1yArray);
		setupLBasis(lyBasis, 0, 2, false, l2yArray);
		setupLBasis(lyBasis, 0, 3, false, l3yArray);
		setupLBasis(lyBasis, 0, 4, false, l4yArray);
		setupLBasis(lyBasis, 1, 0, false, l0Array);
		setupLBasis(lyBasis, 1, 1, false, l1yArray);
		setupLBasis(lyBasis, 1, 2, false, l2yArray);
		setupLBasis(lyBasis, 2, 0, false, l0Array);
	}

	AlternateBasis initBasis(int sct, boolean xAxis) {
		AlternateBasis basis = new AlternateBasis();
		basis.xAxis = xAxis;
		basis.altStates = new DerivedState[sct];
		basis.altStateCount = 0;
		return basis;
	}

	void setupLBasis(AlternateBasis basis, int nr, int l, boolean xAxis,
			double arr[]) {
		String mtext = (xAxis) ? "mx" : "my";
		int i;
		int lct = l * 2 + 1;
		int ap = 0;
		for (i = 0; i != lct; i++) {
			int sn = basis.altStateCount++;
			DerivedState ds = basis.altStates[sn] = new DerivedState();
			ds.basis = basis;
			ds.count = lct;
			ds.bstates = new BasisState[lct];
			ds.coefs = new Complex[lct];
			ds.m = i - l;
			ds.l = l;
			ds.nr = nr;
			ds.n = 2 * nr + l;
			ds.elevel = 2 * nr + l + 1.5;
			int j;
			for (j = 0; j != lct; j++) {
				ds.bstates[j] = getState(nr, l, j - l);
				ds.coefs[j] = new Complex();
			}
			ds.text = "n = " + ds.n + ", nr = " + nr + ", l = " + l + ", "
					+ mtext + " = " + ds.m;
			for (j = 0; j != lct; j++) {
				ds.coefs[j].setReIm(arr[ap], arr[ap + 1]);
				ap += 2;
			}
		}
	}

	AlternateBasis setupRectBasis() {
		int sct = 35;
		AlternateBasis basis = new AlternateBasis();
		basis.altStates = new DerivedState[sct];
		basis.altStateCount = sct;
		int i;
		int nx = 0, ny = 0, nz = 0;
		int ap = 0;
		for (i = 0; i != sct; i++) {
			int n = nx + ny + nz;
			int n21 = n / 2 + 1;
			int l = ((n & 1) == 0) ? 0 : 1;
			int nr = n / 2;
			int m = -l;
			DerivedState ds = basis.altStates[i] = new DerivedState();
			ds.basis = basis;
			ds.count = (l == 0) ? 2 * n21 * n21 - n21 : 2 * n21 * n21 + n21;
			ds.bstates = new BasisState[sct];
			ds.coefs = new Complex[sct];
			ds.text = "nx = " + nx + ", ny = " + ny + ", nz = " + nz;
			ds.nx = nx;
			ds.ny = ny;
			ds.nz = nz;
			ds.n = n;
			ds.elevel = 2 * nr + l + 1.5;
			int j;
			for (j = 0; j != ds.count; j++) {
				ds.bstates[j] = getState(nr, l, m);
				ds.coefs[j] = new Complex().setReIm(rectArrayR[ap], rectArrayI[ap]);
				ap++;
				if (m++ == l) {
					l += 2;
					nr--;
					m = -l;
				}
			}
			if (i == sct - 1)
				break;
			do {
				nz++;
				if (nz > 4) {
					nz = 0;
					nx++;
					if (nx > 4) {
						nx = 0;
						ny++;
					}
				}
			} while (nx + ny + nz > 4);
		}
		return basis;
	}

	// Lx and Ly eigenvectors for various values of l, expressed in
	// terms of Lz eigenvectors
	double l0Array[] = { 1, 0 };
	double l1xArray[] = { .5, 0, -root2inv, 0, .5, 0, root2inv, 0, 0, 0,
			-root2inv, 0, .5, 0, root2inv, 0, .5, 0 };
	double l1yArray[] = { .5, 0, 0, -root2inv, -.5, 0, 0, -root2inv, 0, 0, 0,
			-root2inv, .5, 0, 0, root2inv, -.5, 0 };
	static final double root6by4 = .61237243569579452454;
	double l2xArray[] = { 1 / 4., 0, -1 / 2., 0, root6by4, 0, -1 / 2., 0,
			1 / 4., 0, -.5, 0, .5, 0, 0, 0, -.5, 0, .5, 0, root6by4, 0, 0, 0,
			-.5, 0, 0, 0, root6by4, 0, -.5, 0, -.5, 0, 0, 0, .5, 0, .5, 0,
			1 / 4., 0, 1 / 2., 0, root6by4, 0, 1 / 2., 0, 1 / 4., 0 };
	double l2yArray[] = { 1 / 4., 0, 0, -1 / 2., -root6by4, 0, 0, 1 / 2.,
			1 / 4., 0, -.5, 0, 0, .5, 0, 0, 0, .5, .5, 0, -root6by4, 0, 0, 0,
			-.5, 0, 0, 0, -root6by4, 0, -.5, 0, 0, -.5, 0, 0, 0, -.5, .5, 0,
			1 / 4., 0, 0, 1 / 2., -root6by4, 0, 0, -1 / 2., 1 / 4., 0 };
	double l3xArray[] = { 0.125, 0, -0.306186, 0, 0.484123, 0, -0.559017, 0,
			0.484123, 0, -0.306186, 0, 0.125, 0, -0.306186, 0, 0.5, 0,
			-0.395285, 0, 0., 0, 0.395285, 0, -0.5, 0, 0.306186, 0, 0.484123,
			0, -0.395285, 0, -0.125, 0, 0.433013, 0, -0.125, 0, -0.395285, 0,
			0.4841230, 0, 0.559017, 0, 0., 0, -0.433013, 0, 0., 0, 0.433013, 0,
			0., 0, -0.559017, 0, 0.484123, 0, 0.395285, 0, -0.125, 0,
			-0.433013, 0, -0.125, 0, 0.395285, 0, 0.484123, 0, -0.306186, 0,
			-0.5, 0, -0.395285, 0, 0., 0, 0.395285, 0, 0.5, 0, 0.306186, 0,
			0.125, 0, 0.306186, 0, 0.484123, 0, 0.559017, 0, 0.484123, 0,
			0.306186, 0, 0.125, 0 };
	double l3yArray[] = { -0.125, 0, 0, 0.306186, 0.484123, 0, 0, -0.559017,
			-0.484123, 0, 0, 0.306186, 0.125, 0, 0.306186, 0, 0, -0.5,
			-0.395285, 0, 0., 0, -0.395285, 0, 0, 0.5, 0.306186, 0, -0.484123,
			0, 0, 0.395285, -0.125, 0, 0, 0.433013, 0.125, 0, 0, 0.395285,
			0.484123, 0, 0, 0.559017, 0., 0, 0, 0.433013, 0., 0, 0, 0.433013,
			0., 0, 0, 0.559017, -0.484123, 0, 0, -0.395285, -0.125, 0, 0,
			-0.433013, 0.125, 0, 0, -0.395285, 0.484123, 0, 0.306186, 0, 0,
			+0.5, -0.395285, 0, 0., 0, -0.395285, 0, 0, -0.5, 0.306186, 0,
			-0.125, 0, 0, -0.306186, 0.484123, 0, 0, +0.559017, -0.484123, 0,
			0, -0.306186, 0.125, 0 };
	double l4xArray[] = { 0.0625, 0., -0.176777, 0., 0.330719, 0., -0.467707,
			0., 0.522913, 0., -0.467707, 0., 0.330719, 0., -0.176777, 0.,
			0.0625, 0., -0.176777, 0., 0.375, 0., -0.467707, 0., 0.330719, 0.,
			0., 0., -0.330719, 0., 0.467707, 0., -0.375, 0., 0.176777, 0.,
			0.330719, 0., -0.467707, 0., 0.25, 0., 0.176777, 0., -0.395285, 0.,
			0.176777, 0., 0.25, 0., -0.467707, 0., 0.330719, 0., -0.467707, 0.,
			0.330719, 0., 0.176777, 0., -0.375, 0., 0., 0., 0.375, 0.,
			-0.176777, 0., -0.330719, 0., 0.467707, 0., 0.522913, 0., 0., 0.,
			-0.395285, 0., 0., 0., 0.375, 0., 0., 0., -0.395285, 0., 0., 0.,
			0.522913, 0., -0.467707, 0., -0.330719, 0., 0.176777, 0., 0.375,
			0., 0., 0., -0.375, 0., -0.176777, 0., 0.330719, 0., 0.467707, 0.,
			0.330719, 0., 0.467707, 0., 0.25, 0., -0.176777, 0., -0.395285, 0.,
			-0.176777, 0., 0.25, 0., 0.467707, 0., 0.330719, 0., -0.176777, 0.,
			-0.375, 0., -0.467707, 0., -0.330719, 0., 0., 0., 0.330719, 0.,
			0.467707, 0., 0.375, 0., 0.176777, 0., 0.0625, 0., 0.176777, 0.,
			0.330719, 0., 0.467707, 0., 0.522913, 0., 0.467707, 0., 0.330719,
			0., 0.176777, 0., 0.0625, 0. };
	double l4yArray[] = { 0.0625, 0., 0., -0.176777, -0.330719, 0., 0.,
			0.467707, 0.522913, 0., 0., -0.467707, -0.330719, 0., 0., 0.176777,
			0.0625, 0., -0.176777, 0., 0., 0.375, 0.467707, 0., 0., -0.330719,
			0., 0., 0., -0.330719, -0.467707, 0., 0., 0.375, 0.176777, 0.,
			0.330719, 0., 0., -0.467707, -0.25, 0., 0., -0.176777, -0.395285,
			0., 0., 0.176777, -0.25, 0., 0., 0.467707, 0.330719, 0., -0.467707,
			0., 0., 0.330719, -0.176777, 0., 0., 0.375, 0., 0., 0., 0.375,
			0.176777, 0., 0., 0.330719, 0.467707, 0., 0.522913, 0., 0., 0.,
			0.395285, 0., 0., 0., 0.375, 0., 0., 0., 0.395285, 0., 0., 0.,
			0.522913, 0., -0.467707, 0., 0., -0.330719, -0.176777, 0., 0.,
			-0.375, 0., 0., 0., -0.375, 0.176777, 0., 0., -0.330719, 0.467707,
			0., 0.330719, 0., 0., 0.467707, -0.25, 0., 0., 0.176777, -0.395285,
			0., 0., -0.176777, -0.25, 0., 0., -0.467707, 0.330719, 0.,
			-0.176777, 0., 0., -0.375, 0.467707, 0., 0., 0.330719, 0., 0., 0.,
			0.330719, -0.467707, 0., 0., -0.375, 0.176777, 0., 0.0625, 0., 0.,
			0.176777, -0.330719, 0., 0., -0.467707, 0.522913, 0., 0., 0.467707,
			-0.330719, 0., 0., -0.176777, 0.0625, 0. };

	// precomputed using brute-force mathematica code
	double rectArrayR[] = { 1., 0., 1., 0., -0.57735, 0., 0., 0.816497, 0., 0.,
			0., -0.774597, 0., 0., 0., 0., 0.632456, 0., 0., 0., 0.447214, 0.,
			0., -0.755929, 0., 0., 0., 0., 0., 0., 0.478091, 0., 0., 0., 0.,
			0.707107, 0., -0.707107, 0., 0., 0.707107, 0., -0.707107, 0.,
			-0.316228, 0., 0.316228, 0., 0., 0.632456, 0., -0.632456, 0., 0.,
			0., 0., -0.46291, 0., 0.46291, 0., 0., 0., 0., 0.534522, 0.,
			-0.534522, 0., 0., 0., -0.57735, 0.5, 0., -0.408248, 0., 0.5, 0.,
			-0.447214, 0., 0., 0.5, 0., -0.547723, 0., 0.5, 0., 0.365148,
			-0.188982, 0., -0.154303, 0., -0.188982, 0., 0., 0.46291, 0.,
			-0.58554, 0., 0.46291, 0., 0., -0.547723, 0., 0.547723, 0.353553,
			0., -0.273861, 0., 0.273861, 0., -0.353553, 0., 0., -0.46291, 0.,
			0.46291, 0., 0., 0.353553, 0., -0.400892, 0., 0.400892, 0.,
			-0.353553, 0., 0.447214, -0.46291, 0., 0.377964, 0., -0.46291,
			0.25, 0., -0.188982, 0., 0.179284, 0., -0.188982, 0., 0.25, 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., -0.57735, -0.5, 0., -0.408248, 0., -0.5, 0., -0.447214, 0., 0.,
			-0.5, 0., -0.547723, 0., -0.5, 0., 0.365148, 0.188982, 0.,
			-0.154303, 0., 0.188982, 0., 0., -0.46291, 0., -0.58554, 0.,
			-0.46291, 0., 0., -0.316228, 0., 0.316228, -0.612372, 0.,
			-0.158114, 0., 0.158114, 0., 0.612372, 0., 0., -0.267261, 0.,
			0.267261, 0., 0., -0.612372, 0., -0.231455, 0., 0.231455, 0.,
			0.612372, 0., 0.365148, 0., 0., 0.308607, 0., 0., -0.612372, 0.,
			0., 0., 0.146385, 0., 0., 0., -0.612372, 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0.447214, 0.46291, 0., 0.377964, 0., 0.46291, 0.25, 0., 0.188982,
			0., 0.179284, 0., 0.188982, 0., 0.25 };

	double rectArrayI[] = { 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., -0.707107, 0., -0.707107, 0., 0.,
			-0.707107, 0., -0.707107, 0., 0.316228, 0., 0.316228, 0., 0.,
			-0.632456, 0., -0.632456, 0., 0., 0., 0., 0.46291, 0., 0.46291, 0.,
			0., 0., 0., -0.534522, 0., -0.534522, 0., 0., 0., 0., -0.707107,
			0., 0., 0., 0.707107, 0., 0., 0., 0., -0.707107, 0., 0., 0.,
			0.707107, 0., 0., 0.267261, 0., 0., 0., -0.267261, 0., 0.,
			-0.654654, 0., 0., 0., 0.654654, 0., 0., 0.316228, 0., 0.316228,
			-0.612372, 0., 0.158114, 0., 0.158114, 0., -0.612372, 0., 0.,
			0.267261, 0., 0.267261, 0., 0., -0.612372, 0., 0.231455, 0.,
			0.231455, 0., -0.612372, 0., 0., 0.46291, 0., 0., 0., -0.46291,
			-0.5, 0., 0.188982, 0., 0., 0., -0.188982, 0., 0.5, 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
			0.547723, 0., 0.547723, 0.353553, 0., 0.273861, 0., 0.273861, 0.,
			0.353553, 0., 0., 0.46291, 0., 0.46291, 0., 0., 0.353553, 0.,
			0.400892, 0., 0.400892, 0., 0.353553, 0., 0., 0.46291, 0., 0., 0.,
			-0.46291, 0.5, 0., 0.188982, 0., 0., 0., -0.188982, 0., -0.5, 0.,
			0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0. };

	MenuItem getMenuItem(String s) {
		MenuItem mi = new MenuItem(s);
		mi.addActionListener(this);
		return mi;
	}

	CheckboxMenuItem getCheckItem(String s) {
		CheckboxMenuItem mi = new CheckboxMenuItem(s);
		mi.addItemListener(this);
		return mi;
	}

	PhaseColor genPhaseColor(int sec, double ang) {
		// convert to 0 .. 2*pi angle
		ang += sec * pi / 4;
		// convert to 0 .. 6
		ang *= 3 / pi;
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

	void setupSimpson() {
		sampleCount = 9; // 15;
		// sampleCount = sampleBar.getValue()*2+1;
		// System.out.print("sampleCount = " + sampleCount + "\n");

		// generate table of sample multipliers for efficient Simpson's rule
		sampleMult = new int[sampleCount];
		int i;
		for (i = 1; i < sampleCount; i += 2) {
			sampleMult[i] = 4;
			sampleMult[i + 1] = 2;
		}
		sampleMult[0] = sampleMult[sampleCount - 1] = 1;
	}

	void handleResize() {
		reinit();
	}

	boolean shown = false;

	public void triggerShow() {
		if (!shown)
			setVisible(true);
		shown = true;
	}

	void reinit() {
		setResolution();
		Dimension d = winSize = cv.getSize();
		if (winSize.width == 0)
			return;
		dbimage = createImage(d.width, d.height);
		setupDisplay();
	}

	void setupMenus() {
		switch (viewChooser.getSelectedIndex()) {
		case VIEW_COMPLEX:
			nChooser.show();
			lChooser.show();
			mChooser.show();
			modeChooser.hide();
			modeChooser.select(MODE_ANGLE);
			blankButton.hide();
			normalizeButton.hide();
			maximizeButton.hide();
			alwaysNormItem.disable();
			measureMenu.disable();
			break;
		default:
			nChooser.hide();
			lChooser.hide();
			mChooser.hide();
			modeChooser.show();
			blankButton.show();
			normalizeButton.show();
			maximizeButton.show();
			alwaysNormItem.enable();
			measureMenu.enable();
			break;
		}
		switch (viewChooser.getSelectedIndex()) {
		case VIEW_COMBO_COMP:
		case VIEW_COMBO_RECT:
			presetsMenu.enable();
			break;
		default:
			presetsMenu.disable();
			break;
		}
		validate();
	}

	void createPhasors() {
		phasorCount = textCount = 0;
		int i;
		for (i = 0; i != basisCount; i++)
			basisList[i].active = false;

		if (viewStates == null)
			return;

		int sz = viewStates.height / 4;
		int x = 0;
		int y = viewStates.y;
		int y0 = y;
		int nr = 0, l = 0, m = 0;
		int sz2;
		textBoxes = new TextBox[10];

		switch (viewChooser.getSelectedIndex()) {
		case VIEW_COMPLEX:
			break;
		case VIEW_COMBO_COMP:
			phasorCount = 25 * 4;
			phasors = new Phasor[phasorCount];
			sz2 = viewStates.width / 25;
			if (sz > sz2)
				sz = sz2;
			if (sz < 10)
				sz = 10;
			for (i = 0; i != phasorCount; i++) {
				Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
				ph.state = getState(nr, l, m);
				x += sz;
				if (++m > l) {
					y += sz / 2;
					l++;
					m = -l;
					if (l >= 5) {
						x = 0;
						y0 += sz;
						y = y0;
						nr++;
						l = m = 0;
					}
				}
			}
			break;
		case VIEW_COMBO_RECT:
			sz = viewStates.height / 5;
			phasorCount = rectBasis.altStateCount;
			phasors = new Phasor[phasorCount];
			i = 0;
			for (m = 0; m != 5; m++) {
				i = createRectPhasors(x, y, sz, i, 5 - m);
				x += (5 - m) * sz + sz / 2;
			}
			break;
		case VIEW_COMBO_N1:
			phasorCount = 12;
			phasors = new Phasor[phasorCount];
			i = 0;
			i = createBasisPhasors(x, y, sz, i, 0, 1);
			createText("Lz", x + sz * 3, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lxBasis, 3, 1);
			createText("Lx", x + sz * 3, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lyBasis, 3, 1);
			createText("Ly", x + sz * 3, y, sz);
			y += sz;
			i = createRectPhasorsN(x, y, sz, i, rectBasis, 1);
			createText("Rect", x + sz * 3, y, sz);
			break;
		case VIEW_COMBO_N2:
			phasorCount = 6 * 4;
			phasors = new Phasor[phasorCount];
			i = 0;
			i = createBasisPhasors(x, y, sz, i, 1, 0);
			i = createBasisPhasors(x + sz * 2, y, sz, i, 0, 2);
			createText("Lz", x + sz * 7, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lxBasis, 1, 25);
			i = createAltPhasors(x + sz * 2, y, sz, i, lxBasis, 5, 4);
			createText("Lx", x + sz * 7, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lyBasis, 1, 25);
			i = createAltPhasors(x + sz * 2, y, sz, i, lyBasis, 5, 4);
			createText("Ly", x + sz * 7, y, sz);
			y += sz;
			i = createRectPhasorsN(x, y, sz, i, rectBasis, 2);
			createText("Rect", x + sz * 7, y, sz);
			break;
		case VIEW_COMBO_N3:
			phasorCount = 10 * 4;
			phasors = new Phasor[phasorCount];
			i = 0;
			i = createBasisPhasors(x, y, sz, i, 1, 1);
			i = createBasisPhasors(x + sz * 4, y, sz, i, 0, 3);
			createText("Lz", x + sz * 12, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lxBasis, 3, 26);
			i = createAltPhasors(x + sz * 4, y, sz, i, lxBasis, 7, 9);
			createText("Lx", x + sz * 12, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lyBasis, 3, 26);
			i = createAltPhasors(x + sz * 4, y, sz, i, lyBasis, 7, 9);
			createText("Ly", x + sz * 12, y, sz);
			y += sz;
			i = createRectPhasorsN(x, y, sz, i, rectBasis, 3);
			createText("Rect", x + sz * 12, y, sz);
			break;
		case VIEW_COMBO_N4:
			phasorCount = 15 * 4;
			phasors = new Phasor[phasorCount];
			i = 0;
			i = createBasisPhasors(x, y, sz, i, 2, 0);
			i = createBasisPhasors(x + sz * 2, y, sz, i, 1, 2);
			i = createBasisPhasors(x + sz * 8, y, sz, i, 0, 4);
			createText("Lz", x + sz * 17, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lxBasis, 1, 34);
			i = createAltPhasors(x + sz * 2, y, sz, i, lxBasis, 5, 29);
			i = createAltPhasors(x + sz * 8, y, sz, i, lxBasis, 9, 16);
			createText("Lx", x + sz * 17, y, sz);
			y += sz;
			i = createAltPhasors(x, y, sz, i, lyBasis, 1, 34);
			i = createAltPhasors(x + sz * 2, y, sz, i, lyBasis, 5, 29);
			i = createAltPhasors(x + sz * 8, y, sz, i, lyBasis, 9, 16);
			createText("Ly", x + sz * 17, y, sz);
			y += sz;
			i = createRectPhasorsN(x, y, sz, i, rectBasis, 4);
			createText("Rect", x + sz * 17, y, sz);
			break;
		}
		for (i = 0; i != phasorCount; i++)
			phasors[i].state.setBasisActive();
		for (i = 0; i != basisCount; i++) {
			if (basisList[i].active) {
				// this clears out any states which do not have phasors present
				basisList[i].convertBasisToDerived();
				basisList[i].convertDerivedToBasis();
			}
		}

		// and if we're viewing Complex Combos, we need an extra step
		// to clear out any states with phasors not present. All other
		// views are handled by the previous loop.
		if (viewChooser.getSelectedIndex() == VIEW_COMBO_COMP)
			for (i = 0; i != stateCount; i++)
				if (states[i].nr >= 4 || states[i].l >= 5)
					states[i].setRe(0);

		// in case the states changed
		createOrbitals();
	}

	boolean higherStatesPresent() {
		int i;
		for (i = 0; i != stateCount; i++)
			if (states[i].n > 4 && states[i].mag > 0)
				return true;
		return false;
	}

	void setInitialOrbital() {
		if (phasorCount == 0)
			return;
		int i;
		for (i = 0; i != phasorCount; i++)
			if (phasors[i].state.mag > 0)
				return;

		doClear();

		// no states active, so pick a phasor and select it.
		phasors[0].state.setRe(1);
		createOrbitals();
	}

	int createBasisPhasors(int x, int y, int sz, int i, int nr, int l) {
		int j;
		for (j = 0; j != l * 2 + 1; j++) {
			Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
			ph.state = getState(nr, l, j - l);
			x += sz;
			i++;
		}
		return i;
	}

	int createAltPhasors(int x, int y, int sz, int i, AlternateBasis basis,
			int ct, int offset) {
		int j;
		for (j = 0; j != ct; j++) {
			Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
			ph.state = basis.altStates[j + offset];
			x += sz;
			i++;
		}
		return i;
	}

	int createRectPhasorsN(int x, int y, int sz, int i, AlternateBasis basis,
			int n) {
		int j;
		for (j = 0; j != basis.altStateCount; j++) {
			DerivedState ds = basis.altStates[j];
			if (ds.nx + ds.ny + ds.nz != n)
				continue;
			Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
			ph.state = basis.altStates[j];
			x += sz;
			i++;
		}
		return i;
	}

	int createRectPhasors(int x, int y, int sz, int i, int nz) {
		while (nz > 0) {
			i = createAltPhasors(x, y, sz, i, rectBasis, nz, i);
			y += sz;
			nz--;
		}
		return i;
	}

	void createText(String text, int x, int y, int sz) {
		TextBox tb = new TextBox(x + 10, y, winSize.width - x, sz, text);
		textBoxes[textCount++] = tb;
	}

	void setupDisplay() {
		if (winSize == null)
			return;
		int potsize = (viewPotential == null) ? 50 : viewPotential.height;
		int statesize = (viewStates == null) ? 64 : viewStates.height;
		viewX = viewPotential = viewL = viewStates = null;
		viewList = new View[10];
		int i = 0;
		if (eCheckItem.getState())
			viewList[i++] = viewPotential = new View();
		if (xCheckItem.getState())
			viewList[i++] = viewX = new View();
		if (lCheckItem.getState())
			viewList[i++] = viewL = new View();
		if (viewChooser.getSelectedIndex() > VIEW_COMPLEX)
			viewList[i++] = viewStates = new View();
		viewCount = i;
		int sizenum = viewCount;
		int toth = winSize.height;

		// preserve size of potential and state panes if possible
		if (potsize > 0 && viewPotential != null) {
			sizenum--;
			toth -= potsize;
		}
		if (statesize > 0 && viewStates != null) {
			sizenum--;
			toth -= statesize;
		}
		toth -= panePad * 2 * (viewCount - 1);
		int cury = 0;
		for (i = 0; i != viewCount; i++) {
			View v = viewList[i];
			int h = (sizenum == 0) ? toth : toth / sizenum;
			if (v == viewPotential && potsize > 0)
				h = potsize;
			else if (v == viewStates && statesize > 0)
				h = statesize;
			v.paneY = cury;
			if (cury > 0)
				cury += panePad;
			v.x = 0;
			v.width = winSize.width;
			v.y = cury;
			v.height = h;
			cury += h + panePad;
		}
		setSubViews();
	}

	void setSubViews() {
		int i;
		pixels = new int[viewX.width * viewX.height];
		for (i = 0; i != viewX.width * viewX.height; i++)
			pixels[i] = 0xFF000000;
		imageSource = new MemoryImageSource(viewX.width, viewX.height, pixels,
				0, viewX.width);

		int asize = (int) (min(viewX.width, viewX.height) / 3);
		viewAxes = new Rectangle(viewX.x + winSize.width - asize, viewX.y,
				asize, asize);

		setupMenus();
		createPhasors();
	}

	int getTermWidth() {
		return 8;
	}

	// multiply rotation matrix by rotations through angle1 and angle2
	void rotate(double angle1, double angle2) {
		double r1cos = java.lang.Math.cos(angle1);
		double r1sin = java.lang.Math.sin(angle1);
		double r2cos = java.lang.Math.cos(angle2);
		double r2sin = java.lang.Math.sin(angle2);
		double rotm2[] = new double[9];

		// angle1 is angle about y axis, angle2 is angle about x axis
		rotm2[0] = r1cos;
		rotm2[1] = -r1sin * r2sin;
		rotm2[2] = r2cos * r1sin;

		rotm2[3] = 0;
		rotm2[4] = r2cos;
		rotm2[5] = r2sin;

		rotm2[6] = -r1sin;
		rotm2[7] = -r1cos * r2sin;
		rotm2[8] = r1cos * r2cos;

		double rotm1[] = rotmatrix;
		rotmatrix = new double[9];

		int i, j, k;
		for (j = 0; j != 3; j++)
			for (i = 0; i != 3; i++) {
				double v = 0;
				for (k = 0; k != 3; k++)
					v += rotm1[k + j * 3] * rotm2[i + k * 3];
				rotmatrix[i + j * 3] = v;
			}
	}

	double max(double a, double b) {
		return a > b ? a : b;
	}

	double min(double a, double b) {
		return a < b ? a : b;
	}

	void setResolution() {
		int og = gridSizeX;
		gridSizeX = gridSizeY = (resolutionBar.getValue() & ~1);
		if (og == gridSizeX)
			return;
		dataSize = gridSizeX * 4; // (internalResBar.getValue() & ~1);
		System.out.print("setResolution " + dataSize + " " + gridSizeX + "\n");
		// was 50
		resadj = 50. / dataSize;
		precomputeAll();
		func = new double[gridSizeX][gridSizeY][3];
	}

	int getNR() {
		return nChooser.getSelectedIndex();
	}

	int getL() {
		return lChooser.getSelectedIndex();
	}

	int getM() {
		return mChooser.getSelectedIndex() - getL();
	}

	String codeLetter[] = { "s", "p", "d", "f", "g", "h" };

	void setLValue() {
		int l = getL();
		int i;
		mChooser.removeAll();
		for (i = -l; i <= l; i++)
			mChooser.add("m = " + i);
		mChooser.select(l);
		validate();
	}

	// compute func[][][] array (2-d view) by raytracing through a
	// 3-d dataset (data[][][])
	void computeView(double colorMult, double normmult) {
		int i, j;
		double q = 3.14159265 / dataSize;
		boolean color = colorCheck.getState();
		for (i = 0; i != orbCount; i++)
			orbitals[i].setupFrame(normmult);
		double izoom = 1 / zoom;
		double rotm[] = rotmatrix;
		double aratio = viewX.width / (double) viewX.height;
		double xmult = dataSize / 2.;
		double ymult = dataSize / 2.;
		double zmult = dataSize / 2.;
		double aratiox = izoom, aratioy = izoom;
		// preserve aspect ratio no matter what window dimensions
		if (aratio < 1)
			aratioy /= aratio;
		else
			aratiox *= aratio;
		int slice = sliceChooser.getSelectedIndex();
		double boundRadius2 = 0;
		for (i = 0; i != orbCount; i++) {
			Orbital oo = orbitals[i];
			double br = oo.getBoundRadius(colorMult);
			if (br > boundRadius2)
				boundRadius2 = br;
		}
		boundRadius2 *= boundRadius2;
		for (i = 0; i != gridSizeX; i++)
			for (j = 0; j != gridSizeY; j++) {
				// calculate camera direction
				double camvx0 = (2 * i / (double) gridSizeX - 1) * aratiox;
				double camvy0 = -(2 * j / (double) gridSizeY - 1) * aratioy;
				// rotate camera with rotation matrix
				double camx = rotm[2] * viewDistance;
				double camy = rotm[5] * viewDistance;
				double camz = rotm[8] * viewDistance;
				double camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
				double camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
				double camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
				double camnorm = java.lang.Math.sqrt(camvx0 * camvx0 + camvy0
						* camvy0 + 1);
				int n;
				double simpr = 0;
				double simpg = 0;
				double simpb = 0;
				// calculate intersections with bounding sphere
				double a = camvx * camvx + camvy * camvy + camvz * camvz;
				double b = 2 * (camvx * camx + camvy * camy + camvz * camz);
				double c = camx * camx + camy * camy + camz * camz
						- boundRadius2;
				double discrim = b * b - 4 * a * c;
				func[i][j][0] = func[i][j][1] = func[i][j][2] = 0;
				if (discrim < 0) {
					// doesn't hit it
					continue;
				}
				discrim = java.lang.Math.sqrt(discrim);
				double mint = (-b - discrim) / (2 * a);
				double maxt = (-b + discrim) / (2 * a);
				if (slice != SLICE_NONE) {
					double t = -100;
					switch (slice) {
					case SLICE_X:
						t = (sliceval - camx) / camvx;
						break;
					case SLICE_Y:
						t = (sliceval - camy) / camvy;
						break;
					case SLICE_Z:
						t = (sliceval - camz) / camvz;
						break;
					}
					if (t < mint || t > maxt)
						continue;
					mint = maxt = t;
				}
				// sample evenly along intersecting portion
				double tstep = (maxt - mint) / (sampleCount - 1);
				double pathlen = (maxt - mint) * camnorm;
				int maxn = sampleCount;
				double xx = (camx + camvx * mint) * xmult;
				double yy = (camy + camvy * mint) * ymult;
				double zz = (camz + camvz * mint) * zmult;
				if (slice != SLICE_NONE) {
					maxn = 1;
					pathlen = 2;
					if (xx > xmult || yy > ymult || zz > zmult || xx < -xmult
							|| yy < -ymult || zz < -zmult)
						continue;
				}
				camvx *= tstep * xmult;
				camvy *= tstep * ymult;
				camvz *= tstep * zmult;
				int dshalf = dataSize / 2;
				int oi;
				for (n = 0; n < maxn; n++) {
					// find grid element that contains sampled point
					double r = java.lang.Math.sqrt(xx * xx + yy * yy + zz * zz);
					double costh = zz / r;
					int ri = (int) r;
					int costhi = (int) (costh * dshalf + dshalf);
					double fr = 0, fi = 0;
					calcPhiComponent(xx, yy);
					for (oi = 0; oi != orbCount; oi++) {
						Orbital oo = orbitals[oi];
						oo.computePoint(ri, costhi);
						fr += funcr;
						fi += funci;
					}
					if (color) {
						double fv = fr * fr + fi * fi;
						fv *= sampleMult[n];
						PhaseColor col = getPhaseColor(fr, fi);
						simpr += col.r * fv;
						simpg += col.g * fv;
						simpb += col.b * fv;
					} else {
						double fv = (fr * fr + fi * fi) * sampleMult[n];
						simpr = simpg = (simpb += fv);
					}
					xx += camvx;
					yy += camvy;
					zz += camvz;
				}
				simpr *= pathlen / n;
				simpg *= pathlen / n;
				simpb *= pathlen / n;
				func[i][j][0] = simpr;
				func[i][j][1] = simpg;
				func[i][j][2] = simpb;
			}
	}

	PhaseColor getPhaseColor(double x, double y) {
		int sector = 0;
		double val = 0;
		if (x == 0 && y == 0)
			return phaseColors[0][0];
		if (y >= 0) {
			if (x >= 0) {
				if (x >= y) {
					sector = 0;
					val = y / x;
				} else {
					sector = 1;
					val = 1 - x / y;
				}
			} else {
				if (-x <= y) {
					sector = 2;
					val = -x / y;
				} else {
					sector = 3;
					val = 1 + y / x;
				}
			}
		} else {
			if (x <= 0) {
				if (y >= x) {
					sector = 4;
					val = y / x;
				} else {
					sector = 5;
					val = 1 - x / y;
				}
			} else {
				if (-y >= x) {
					sector = 6;
					val = -x / y;
				} else {
					sector = 7;
					val = 1 + y / x;
				}
			}
		}
		return phaseColors[sector][(int) (val * phaseColorCount)];
	}

	void calcPhiComponent(double x, double y) {
		phiSector = 0;
		double val = 0;
		if (x == 0 && y == 0) {
			phiSector = 0;
			phiIndex = 0;
			return;
		}
		if (y >= 0) {
			if (x >= 0) {
				if (x >= y) {
					phiSector = 0;
					val = y / x;
				} else {
					phiSector = 1;
					val = 1 - x / y;
				}
			} else {
				if (-x <= y) {
					phiSector = 2;
					val = -x / y;
				} else {
					phiSector = 3;
					val = 1 + y / x;
				}
			}
		} else {
			if (x <= 0) {
				if (y >= x) {
					phiSector = 4;
					val = y / x;
				} else {
					phiSector = 5;
					val = 1 - x / y;
				}
			} else {
				if (-y >= x) {
					phiSector = 6;
					val = -x / y;
				} else {
					phiSector = 7;
					val = 1 + y / x;
				}
			}
		}
		phiIndex = (int) (val * dataSize);
	}

	void setScale() {
		if (manualScale || !autoZoomItem.getState())
			return;
		int i;
		double outer = 0;
		for (i = 0; i != orbCount; i++) {
			Orbital orb = orbitals[i];
			double r = orb.getScaleRadius();
			if (r > outer)
				outer = r;
		}
		// 148 is fudge factor determined by trial and error
		int scaleValue = (int) (outer * 148);
		int oldScaleValue = scaleBar.getValue();

		if (oldScaleValue != scaleValue) {
			int diff = scaleValue - oldScaleValue;
			if (diff < -5 || diff > 5) {
				diff /= 3;
				if (diff < -50)
					diff = -50;
				if (diff > 50)
					diff = 50;
			}
			int nv = oldScaleValue + diff;
			if (!animatedZoomItem.getState())
				nv = scaleValue;
			ignoreAdjustments = true;
			scaleBar.setValue(nv);
			ignoreAdjustments = false;
			scaleValue = nv;
			precomputeAll();
		}
	}

	void precomputeAll() {
		int i;
		for (i = 0; i != orbCount; i++) {
			Orbital orb = orbitals[i];
			orb.precompute();
		}
	}

	int sign(double x) {
		return x < 0 ? -1 : 1;
	}

	public void paintComponent(Graphics g) {
		cv.repaint();
	}

	public void updateQuantumOsc3d(Graphics realg) {
		Graphics g = null;
		if (winSize == null || winSize.width == 0)
			return;
		boolean mis = true;
		g = dbimage.getGraphics();
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());
		if (fontMetrics == null)
			fontMetrics = g.getFontMetrics();

		boolean allQuiet = false;
		double tadd = 0;
		if (!stoppedCheck.getState()) {
			int val = speedBar.getValue();
			tadd = val * (.1 / 16);
			t += tadd;
		} else
			allQuiet = true;

		double norm = 0;
		double normmult = 0, normmult2 = 0;

		if (alwaysNormItem.getState())
			normalize();

		// update phases
		int i;
		for (i = 0; i != stateCount; i++) {
			State st = states[i];
			if (st.mag < epsilon) {
				st.setRe(0);
				continue;
			}
			if (tadd != 0) {
				allQuiet = false;
				st.rotate(-(st.elevel + baseEnergy) * tadd);
			}
			norm += st.magSquared();
		}
		normmult2 = 1 / norm;
		if (norm == 0)
			normmult2 = 0;
		normmult = java.lang.Math.sqrt(normmult2);
		AlternateBasis skipBasis = (changingDerivedStates) ? ((DerivedState) selectedState).basis
				: null;
		for (i = 0; i != basisCount; i++) {
			AlternateBasis basis = basisList[i];
			if (basis != skipBasis && basis.active)
				basis.convertBasisToDerived();
		}

		setScale();
		setBrightness(normmult2);
		boolean sliced = sliceChooser.getSelectedIndex() != SLICE_NONE;
		zoom = (sliced) ? 8 : 16.55;
		double colorMult = java.lang.Math.exp(brightnessBar.getValue() / 100.);
		// System.out.println(colorMult);
		computeView(colorMult, normmult);
		int j, k;

		for (i = 1; i != viewCount; i++) {
			g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
			g.drawLine(0, viewList[i].paneY, winSize.width, viewList[i].paneY);
		}

		if (viewPotential != null) {
			double ymult = 10; // viewPotential.height * 1.9;
			g.setColor(Color.darkGray);
			int floory = viewPotential.y + viewPotential.height - 1;
			for (i = 0; i != 50; i++) {
				double e = (i + 1.5);
				int y = floory - (int) (ymult * e);
				if (y >= 0)
					g.drawLine(0, y, winSize.width, y);
			}

			double xp = getScaler();

			g.setColor(Color.white);
			int ox = -1, oy = -1;
			int x;
			for (x = 0; x != winSize.width; x++) {
				double xx = (x - winSize.width / 2) * xp;
				double dy = .5 * xx * xx;
				int y = floory - (int) (ymult * dy);
				if (y < 0) {
					if (ox == -1)
						continue;
					g.drawLine(ox, oy, ox, 0);
					ox = -1;
					continue;
				}
				if (ox == -1 && x > 0) {
					g.drawLine(x, 0, x, y);
					ox = x;
					oy = y;
					continue;
				}
				if (ox != -1)
					g.drawLine(ox, oy, x, y);
				ox = x;
				oy = y;
			}

			// calculate expectation value of E
			if (norm != 0) {
				double expecte = 0;
				for (i = 0; i != stateCount; i++) {
					State st = states[i];
					double prob = st.magSquared() * normmult2;
					expecte += prob * st.elevel;
				}
				int y = floory - (int) (ymult * expecte);
				g.setColor(Color.red);
				g.drawLine(0, y, winSize.width, y);
			}

			if (selectedState != null && !dragging) {
				g.setColor(Color.yellow);
				int y = floory - (int) (ymult * selectedState.elevel);
				g.drawLine(0, y, winSize.width, y);
			}
		}

		if (viewL != null) {
			int maxm = 4;
			int pad = 3;
			int ct = (maxm * 2 + 1) * pad;
			double ldata[] = new double[ct];

			if (!higherStatesPresent()) {
				calcLxy(lxBasis, ldata, ct, maxm, pad, true, false);
				drawFunction(g, viewL, 0, ldata, ct, pad, false);
				calcLxy(lyBasis, ldata, ct, maxm, pad, false, false);
				drawFunction(g, viewL, 1, ldata, ct, pad, false);
				calcLz(ldata, ct, maxm, pad, false);
				drawFunction(g, viewL, 2, ldata, ct, pad, false);
			}
		}

		int winw = viewX.width;
		int winh = viewX.height;
		for (i = 0; i != gridSizeX; i++)
			for (j = 0; j != gridSizeY; j++) {
				int x = i * winw / gridSizeX;
				int y = j * winh / gridSizeY;
				int x2 = (i + 1) * winw / gridSizeX;
				int y2 = (j + 1) * winh / gridSizeY;
				double cr = func[i][j][0] * colorMult;
				double cg = func[i][j][1] * colorMult;
				double cb = func[i][j][2] * colorMult;
				if (cr == 0 && cg == 0 && cb == 0) {
					int l;
					if (mis)
						for (k = x; k < x2; k++)
							for (l = y; l < y2; l++)
								pixels[k + l * viewX.width] = 0xFF000000;
					continue;
				}
				double fm = max(cr, max(cg, cb));
				if (fm > 255) {
					fm /= 255;
					cr /= fm;
					cg /= fm;
					cb /= fm;
				}
				int colval = 0xFF000000 + (((int) cr) << 16)
						| (((int) cg) << 8) | (((int) cb));
				if (mis) {
					int l;
					for (k = x; k < x2; k++)
						for (l = y; l < y2; l++)
							pixels[k + l * viewX.width] = colval;
				} else {
					g.setColor(new Color(colval));
					g.fillRect(x, y + viewX.y, x2 - x, y2 - y);
				}
			}
		if (mis) {
			Image dbimage2 = cv.createImage(imageSource);
			g.drawImage(dbimage2, viewX.x, viewX.y, null);
		}
		g.setColor(Color.white);
		if (sliced)
			drawCube(g, false);
		if (axesItem.getState())
			drawAxes(g);
		for (i = 0; i != textCount; i++) {
			TextBox tb = textBoxes[i];
			int h = (tb.height + fontMetrics.getAscent() - fontMetrics
					.getDescent()) / 2;
			g.drawString(tb.text, tb.x, tb.y + h);
		}
		g.setColor(Color.yellow);
		if (selectedState != null)
			centerString(g, selectedState.getText(), viewX.y + viewX.height - 5);

		if (viewStates != null)
			drawPhasors(g, viewStates);

		realg.drawImage(dbimage, 0, 0, this);
		if (!allQuiet)
			cv.repaint(pause);
	}

	double getScaler() {
		// XXX don't duplicate this
		double scalex = viewX.width * zoom / 2;
		double scaley = viewX.height * zoom / 2;
		double aratio = viewX.width / (double) viewX.height;
		// preserve aspect ratio regardless of window dimensions
		if (aratio < 1)
			scaley *= aratio;
		else
			scalex /= aratio;
		double xp = 2 * scalex / viewDistance;
		double mult = scaleBar.getValue() / 2500.;
		xp /= 50 * mult;
		xp = 1 / xp;
		return xp;
	}

	public void centerString(Graphics g, String str, int ypos) {
		g.drawString(str, (winSize.width - fontMetrics.stringWidth(str)) / 2,
				ypos);
	}

	// see if the face containing (nx, ny, nz) is visible.
	boolean visibleFace(int nx, int ny, int nz) {
		double viewx = viewDistance * rotmatrix[2];
		double viewy = viewDistance * rotmatrix[5];
		double viewz = viewDistance * rotmatrix[8];
		return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0;
	}

	void drawPhasors(Graphics g, View v) {
		int i;
		for (i = 0; i != phasorCount; i++) {
			Phasor ph = phasors[i];
			State st = ph.state;
			int ss = ph.width;
			int ss2 = ss / 2;
			int x = ph.x + ss2;
			int y = ph.y + ss2;
			boolean yel = (selectedState != null && selectedState.elevel == st.elevel);
			if (viewChooser.getSelectedIndex() >= VIEW_COMBO_N1)
				yel = (selectedState == st);
			g.setColor(yel ? Color.yellow : st.mag == 0 ? gray2 : Color.white);
			g.drawOval(x - ss2, y - ss2, ss, ss);
			int xa = (int) (st.re * ss2);
			int ya = (int) (-st.im * ss2);
			g.drawLine(x, y, x + xa, y + ya);
			g.fillOval(x + xa - 1, y + ya - 1, 3, 3);
		}
	}

	void drawFunction(Graphics g, View view, int pos, double fr[], int count,
			int pad, boolean fromZero) {
		int i;

		double expectx = 0;
		double expectx2 = 0;
		double maxsq = 0;
		double tot = 0;
		int vw = winSize.width / 3;
		int vw2 = vw * 4 / 5;
		int mid_x = (fromZero) ? (vw2 / (count - 1)) : vw2 * (count / 2)
				/ (count - 1);
		int zero = mid_x;
		mid_x += vw * pos;
		for (i = 0; i != count; i++) {
			int x = vw2 * i / (count - 1);
			int ii = i;
			double dr = fr[ii];
			double dy = dr * dr;
			if (dy > maxsq)
				maxsq = dy;
			int dev = x - zero;
			expectx += dy * dev;
			expectx2 += dy * dev * dev;
			tot += dy;
		}
		zero = mid_x;
		expectx /= tot;
		expectx2 /= tot;
		double maxnm = java.lang.Math.sqrt(maxsq);
		double uncert = java.lang.Math.sqrt(expectx2 - expectx * expectx);
		int ox = -1, oy = 0;
		double bestscale = 1 / maxnm;
		view.scale = bestscale;
		if (view.scale > 1e8)
			view.scale = 1e8;
		g.setColor(Color.gray);
		g.drawLine(mid_x, view.y, mid_x, view.y + view.height);

		double ymult2 = .90 * view.height;
		int mid_y = view.y + view.height / 2 + (int) ymult2 / 2;
		double mult = ymult2 * view.scale;
		g.setColor(Color.white);
		ox = -1;
		for (i = 0; i != count; i++) {
			int x = vw2 * i / (count - 1) + vw * pos;
			int ii = i;
			int y = mid_y - (int) (mult * fr[ii]);
			if ((i % pad) == 1) {
				g.setColor(Color.gray);
				g.drawLine(x, mid_y, x, mid_y + 4);
				g.setColor(Color.white);
			}
			if (ox != -1)
				g.drawLine(ox, oy, x, y);
			ox = x;
			oy = y;
		}

		if (maxsq > 0) {
			expectx += zero + .5;
			g.setColor(Color.red);
			g.drawLine((int) expectx, view.y, (int) expectx, view.y
					+ view.height);
		}
	}

	// draw the cube containing the particles. if drawAll is false then
	// we just draw faces that are facing the camera. This routine draws
	// each edge twice which is unnecessary, but easier.
	void drawCube(Graphics g, boolean drawAll) {
		int i;
		int slice = sliceChooser.getSelectedIndex();
		int sp = 0;
		for (i = 0; i != 6; i++) {
			// calculate normal of ith face
			int nx = (i == 0) ? -1 : (i == 1) ? 1 : 0;
			int ny = (i == 2) ? -1 : (i == 3) ? 1 : 0;
			int nz = (i == 4) ? -1 : (i == 5) ? 1 : 0;
			// if face is not facing camera, don't draw it
			if (!drawAll && !visibleFace(nx, ny, nz))
				continue;
			double pts[];
			pts = new double[3];
			int n;
			for (n = 0; n != 4; n++) {
				computeFace(i, n, pts);
				map3d(pts[0], pts[1], pts[2], xpoints, ypoints, n, viewX);
			}
			g.setColor(Color.gray);
			g.drawPolygon(xpoints, ypoints, 4);
			if (slice != SLICE_NONE && i / 2 != slice - SLICE_X) {
				if (selectedSlice)
					g.setColor(Color.yellow);
				int coord1 = (slice == SLICE_X) ? 1 : 0;
				int coord2 = (slice == SLICE_Z) ? 1 : 2;
				computeFace(i, 0, pts);
				pts[slice - SLICE_X] = sliceval;
				map3d(pts[0], pts[1], pts[2], slicerPoints[0], slicerPoints[1],
						sp, viewX);
				computeFace(i, 2, pts);
				pts[slice - SLICE_X] = sliceval;
				map3d(pts[0], pts[1], pts[2], slicerPoints[0], slicerPoints[1],
						sp + 1, viewX);
				g.drawLine(slicerPoints[0][sp], slicerPoints[1][sp],
						slicerPoints[0][sp + 1], slicerPoints[1][sp + 1]);
				sliceFaces[sp / 2][0] = nx;
				sliceFaces[sp / 2][1] = ny;
				sliceFaces[sp / 2][2] = nz;
				sp += 2;
			}
		}
		sliceFaceCount = sp;
	}

	// generate the nth vertex of the bth cube face
	void computeFace(int b, int n, double pts[]) {
		// One of the 3 coordinates (determined by a) is constant.
		// When b=0, x=-1; b=1, x=+1; b=2, y=-1; b=3, y=+1; etc
		int a = b >> 1;
		pts[a] = ((b & 1) == 0) ? -1 : 1;

		// fill in the other 2 coordinates with one of the following
		// (depending on n): -1,-1; +1,-1; +1,+1; -1,+1
		int i;
		for (i = 0; i != 3; i++) {
			if (i == a)
				continue;
			pts[i] = (((n >> 1) ^ (n & 1)) == 0) ? -1 : 1;
			n >>= 1;
		}
	}

	void drawAxes(Graphics g) {
		g.setColor(Color.white);
		double d = .5;
		map3d(0, 0, 0, xpoints, ypoints, 0, viewAxes);
		map3d(d, 0, 0, xpoints, ypoints, 1, viewAxes);
		drawArrow(g, "x", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
		map3d(0, d, 0, xpoints, ypoints, 1, viewAxes);
		drawArrow(g, "y", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
		map3d(0, 0, d, xpoints, ypoints, 1, viewAxes);
		drawArrow(g, "z", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	}

	void drawArrow(Graphics g, String text, int x1, int y1, int x2, int y2) {
		drawArrow(g, text, x1, y1, x2, y2, 5);
	}

	void drawArrow(Graphics g, String text, int x1, int y1, int x2, int y2,
			int as) {
		g.drawLine(x1, y1, x2, y2);
		double l = java.lang.Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1)
				* (y2 - y1));
		if (l > as / 2) { // was as
			double hatx = (x2 - x1) / l;
			double haty = (y2 - y1) / l;
			g.drawLine(x2, y2, (int) (haty * as - hatx * as + x2), (int) (-hatx
					* as - haty * as + y2));
			g.drawLine(x2, y2, (int) (-haty * as - hatx * as + x2), (int) (hatx
					* as - haty * as + y2));
			if (text != null)
				g.drawString(text, (int) (x2 + hatx * 10),
						(int) (y2 + haty * 10));
		}
	}

	// map 3-d point (x,y,z) to screen, storing coordinates
	// in xpoints[pt],ypoints[pt]
	void map3d(double x, double y, double z, int xpoints[], int ypoints[],
			int pt, Rectangle v) {
		double rotm[] = rotmatrix;
		double realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
		double realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
		double realz = viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
		double scalex = v.width * zoom / 2;
		double scaley = v.height * zoom / 2;
		double aratio = v.width / (double) v.height;
		// preserve aspect ratio regardless of window dimensions
		if (aratio < 1)
			scaley *= aratio;
		else
			scalex /= aratio;
		xpoints[pt] = v.x + v.width / 2 + (int) (scalex * realx / realz);
		ypoints[pt] = v.y + v.height / 2 - (int) (scaley * realy / realz);
	}

	// map point on screen to 3-d coordinates assuming it lies on a given plane
	void unmap3d(double x3[], int x, int y, double pn[], double pp[]) {
		// first, find all points which map to (x,y) on the screen.
		// this is a line.
		double scalex = viewX.width * zoom / 2;
		double scaley = viewX.height * zoom / 2;

		double aratio = viewX.width / (double) viewX.height;
		// preserve aspect ratio regardless of window dimensions
		if (aratio < 1)
			scaley *= aratio;
		else
			scalex /= aratio;

		double vx = (x - (viewX.x + viewX.width / 2)) / scalex;
		double vy = -(y - (viewX.y + viewX.height / 2)) / scaley;
		// vz = -1

		// map the line vector to object space
		double rotm[] = rotmatrix;
		double mx = viewDistance * rotm[2];
		double my = viewDistance * rotm[5];
		double mz = viewDistance * rotm[8];
		double mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
		double mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
		double mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);

		// calculate the intersection between the line and the given plane
		double t = ((pp[0] - mx) * pn[0] + (pp[1] - my) * pn[1] + (pp[2] - mz)
				* pn[2])
				/ (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);

		x3[0] = mx + mvx * t;
		x3[1] = my + mvy * t;
		x3[2] = mz + mvz * t;
	}

	public void componentHidden(ComponentEvent e) {
	}

	public void componentMoved(ComponentEvent e) {
	}

	public void componentShown(ComponentEvent e) {
		cv.repaint();
	}

	public void componentResized(ComponentEvent e) {
		handleResize();
		cv.repaint(pause);
	}

	public void actionPerformed(ActionEvent e) {
		if (e.getSource() == exitItem) {
			applet.destroyFrame();
			return;
		}
		cv.repaint();
		if (e.getSource() == blankButton)
			doClear();
		if (e.getSource() == normalizeButton)
			normalize();
		if (e.getSource() == maximizeButton)
			maximize();
		if (e.getSource() == dispGaussItem)
			doDispGaussian();
		if (e.getSource() == scaled1GaussItem)
			doScaled1Gaussian();
		if (e.getSource() == scaled2GaussItem)
			doScaled2Gaussian();
		if (e.getSource() == rotatingGaussItem)
			doRotatingGaussian();
		if (e.getSource() == dispX110Item)
			doDispX110();
		if (e.getSource() == dispZ110Item)
			doDispZ110();
		if (e.getSource() == measureEItem)
			measureE();
		if (e.getSource() == measureLxItem)
			measureL(0);
		if (e.getSource() == measureLyItem)
			measureL(1);
		if (e.getSource() == measureLzItem)
			measureL(2);
	}

	void doDispGaussian() {
		doClear();
		int i;
		rectBasis.convertBasisToDerived();
		for (i = 0; i != 5; i++)
			rectBasis.altStates[i].setReIm(movedGaussian[i], 0);
		rectBasis.convertDerivedToBasis();
		createOrbitals();
	}

	void doScaled1Gaussian() {
		doClear();
		int i;
		for (i = 0; i != 8; i++)
			getState(i, 0, 0).setRe(scaledGaussian[i]);
		createOrbitals();
	}

	void doScaled2Gaussian() {
		doClear();
		int i;
		for (i = 0; i != rectBasis.altStateCount; i++) {
			DerivedState ds = rectBasis.altStates[i];
			ds.setRe(0);
			if ((ds.nx & 1) > 0 || ds.ny > 0 || (ds.nz & 1) > 0)
				continue;
			int s = (ds.nx / 2) * 3 + ds.nz / 2;
			ds.setRe(scaled2Gaussian[s]);
		}
		rectBasis.convertDerivedToBasis();
		createOrbitals();
	}

	void doRotatingGaussian() {
		doClear();
		int i;
		for (i = 0; i != rectBasis.altStateCount; i++) {
			DerivedState ds = rectBasis.altStates[i];
			ds.setRe(0);
			int s = ds.nx * 3 + ds.nz;
			if (ds.ny > 0 || ds.nx > 2 || ds.nz > 2)
				continue;
			ds.setReIm(rotGaussianR[s], rotGaussianI[s]);
		}
		rectBasis.convertDerivedToBasis();
		createOrbitals();
	}

	void doDispX110() {
		doClear();
		int i;
		for (i = 0; i != rectBasis.altStateCount; i++) {
			DerivedState ds = rectBasis.altStates[i];
			ds.setRe(0);
			if (ds.nz != 1 || ds.ny != 0)
				continue;
			ds.setRe(dispX110Array[ds.nx]);
		}
		rectBasis.convertDerivedToBasis();
		createOrbitals();
	}

	void doDispZ110() {
		doClear();
		int i;
		for (i = 0; i != rectBasis.altStateCount; i++) {
			DerivedState ds = rectBasis.altStates[i];
			ds.setRe(0);
			// if (ds.nx != 1 || ds.ny != 1)
			if (ds.nx != 1 || ds.ny != 0)
				continue;
			ds.setRe(dispZ110Array[ds.nz]);
		}
		rectBasis.convertDerivedToBasis();
		createOrbitals();
	}

	double movedGaussian[] = {
			// 0.9394130628134758, 0.33213267352531645, 0.08303316838132911
			.778801, .550695, .275348, .11241, .039743 };

	double scaledGaussian[] = { 0.252982, 0.185903, 0.124708, 0.0808198,
			0.0514334, 0.0323663, 0.0202127, 0.0125533 };

	double scaled2Gaussian[] = { 0.923077, 0.251044, 0.0836194, -0.251044,
			-0.0682749, -0.0227415, 0.0836194, 0.0227415, 0.00757488 };

	double rotGaussianR[] = { 0.75484, 0., -0.150118, 0.400314, 0., -0.079612,
			0.150118, 0., 0 };
	double rotGaussianI[] = { 0, 0.400314, 0, 0, 0.212299, 0, 0, 0.079612, 0 };

	double dispX110Array[] = {
			// -.174036, .953731, .242278, 0, 0
			-0.332133, 0.821986, 0.44035, 0.137825, 0
	// -0.460759,0.624461,0.559978,0.271215,0.0983688
	};

	double dispZ110Array[] = { 0.778801, 0.550695, 0.275348, 0.11241, 0.039743 };

	int scaleValue = -1;
	
	private boolean finished;

	public void adjustmentValueChanged(AdjustmentEvent e) {
		if(!finished || ignoreAdjustments){
			return;
		}
		System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
		if (e.getSource() == scaleBar) {
			if (scaleBar.getValue() == scaleValue)
				return;
			scaleValue = scaleBar.getValue();
			precomputeAll();
			manualScale = true;
		}
		if (e.getSource() == brightnessBar) {
			double mult = java.lang.Math.exp(brightnessBar.getValue() / 100.);
			userBrightMult = mult / bestBrightness;
		}
		if (e.getSource() == resolutionBar)
			setResolution();
		setupSimpson();
		cv.repaint(pause);
	}

	public void mouseDragged(MouseEvent e) {
		dragging = true;
		changingDerivedStates = false;
		edit(e);
		dragX = e.getX();
		dragY = e.getY();
	}

	boolean csInRange(int x, int xa, int xb) {
		if (xa < xb)
			return x >= xa - 5 && x <= xb + 5;
		return x >= xb - 5 && x <= xa + 5;
	}

	void checkSlice(int x, int y) {
		if (sliceChooser.getSelectedIndex() == SLICE_NONE) {
			selectedSlice = false;
			return;
		}
		int n;
		selectedSlice = false;
		for (n = 0; n != sliceFaceCount; n += 2) {
			int xa = slicerPoints[0][n];
			int xb = slicerPoints[0][n + 1];
			int ya = slicerPoints[1][n];
			int yb = slicerPoints[1][n + 1];
			if (!csInRange(x, xa, xb) || !csInRange(y, ya, yb))
				continue;

			double d;
			if (xa == xb)
				d = java.lang.Math.abs(x - xa);
			else {
				// write line as y=a+bx
				double b = (yb - ya) / (double) (xb - xa);
				double a = ya - b * xa;

				// solve for distance
				double d1 = y - (a + b * x);
				if (d1 < 0)
					d1 = -d1;
				d = d1 / java.lang.Math.sqrt(1 + b * b);
			}
			if (d < 6) {
				selectedSlice = true;
				sliceFace = sliceFaces[n / 2];
				break;
			}
		}
	}

	public void mouseMoved(MouseEvent e) {
		if (dragging)
			return;
		int x = e.getX();
		int y = e.getY();
		dragX = x;
		dragY = y;
		int oldsph = selectedPaneHandle;
		int olds = selection;
		State oldss = selectedState;
		selectedPaneHandle = -1;
		selection = 0;
		selectedState = null;
		int i;
		for (i = 1; i != viewCount; i++) {
			int dy = y - viewList[i].paneY;
			if (dy >= -3 && dy <= 3) {
				selectedPaneHandle = i;
				selection = SEL_HANDLE;
			}
		}
		if (viewX != null && viewX.inside(x, y)) {
			selection = SEL_X;
			checkSlice(e.getX(), e.getY());
		} else if (viewPotential.contains(x, y)) {
			selection = SEL_POTENTIAL;
			// findStateByEnergy(y);
		} else if (viewStates != null && viewStates.inside(x, y))
			findPhasor(viewStates, x, y);
		if (oldsph != selectedPaneHandle || olds != selection
				|| oldss != selectedState)
			cv.repaint(pause);
	}

	void findPhasor(View v, int x, int y) {
		int i;
		for (i = 0; i != phasorCount; i++) {
			if (!phasors[i].inside(x, y))
				continue;
			selectedPhasor = phasors[i];
			selectedState = selectedPhasor.state;
			selection = SEL_STATES;
			break;
		}
	}

	public void mouseClicked(MouseEvent e) {
		if (selection == SEL_STATES)
			editMagClick();
		if (e.getClickCount() == 2 && selectedState != null)
			enterSelectedState();
	}

	void enterSelectedState() {
		int i;
		for (i = 0; i != stateCount; i++)
			if (states[i] != selectedState)
				states[i].setRe(0);
		selectedState.convertBasisToDerived();
		selectedState.setRe(1);
		selectedState.convertDerivedToBasis();
		createOrbitals();
		cv.repaint(pause);
	}

	public void mouseEntered(MouseEvent e) {
	}

	public void mouseExited(MouseEvent e) {
		if (!dragging && selection != 0) {
			selectedPaneHandle = -1;
			selectedState = null;
			selectedPhasor = null;
			selection = 0;
			cv.repaint(pause);
		}
	}

	public void mousePressed(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		dragX = dragStartX = e.getX();
		dragY = dragStartY = e.getY();
		dragZoomStart = zoom;
		dragging = true;
		edit(e);
	}

	public void mouseReleased(MouseEvent e) {
		if (dragging)
			cv.repaint();
		dragging = changingDerivedStates = false;
	}

	public void itemStateChanged(ItemEvent e) {
		if(!finished){
			return;
		}
		if (e.getItemSelectable() instanceof CheckboxMenuItem) {
			setupDisplay();
			cv.repaint(pause);
			return;
		}
		if (e.getItemSelectable() == nChooser) {
			orbitalChanged();
		} else if (e.getItemSelectable() == lChooser) {
			setLValue();
			orbitalChanged();
		} else if (e.getItemSelectable() == mChooser) {
			orbitalChanged();
		} else if (e.getItemSelectable() == viewChooser) {
			setLValue();
			orbitalChanged();
			setupDisplay();
			setInitialOrbital();
		}
		cv.repaint(pause);
	}

	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			destroyFrame();
			return true;
		}
		return super.handleEvent(ev);
	}

	void destroyFrame() {
		if (applet == null)
			dispose();
		else
			applet.destroyFrame();
	}

	void edit(MouseEvent e) {
		if (selection == SEL_NONE)
			return;
		int x = e.getX();
		int y = e.getY();
		switch (selection) {
		case SEL_HANDLE:
			editHandle(y);
			break;
		case SEL_STATES:
			editMag(x, y);
			break;
		case SEL_POTENTIAL:
			break;
		case SEL_X:
			editX(x, y);
			break;
		}
	}

	void editHandle(int y) {
		int dy = y - viewList[selectedPaneHandle].paneY;
		View upper = viewList[selectedPaneHandle - 1];
		View lower = viewList[selectedPaneHandle];
		int minheight = 10;
		if (upper.height + dy < minheight || lower.height - dy < minheight)
			return;
		upper.height += dy;
		lower.height -= dy;
		lower.y += dy;
		lower.paneY += dy;
		cv.repaint(pause);
		setSubViews();
	}

	void editX(int x, int y) {
		int mode = modeChooser.getSelectedIndex();
		if (selectedSlice)
			mode = MODE_SLICE;
		if (mode == MODE_ANGLE) {
			int xo = dragX - x;
			int yo = dragY - y;
			rotate(xo / 40., -yo / 40.);
			cv.repaint(pause);
		} else if (mode == MODE_ROTATE_X) {
			int xo = dragX - x + dragY - y;
			rotateXY(xo / 40., true);
		} else if (mode == MODE_ROTATE_Y) {
			int xo = dragX - x + dragY - y;
			rotateXY(xo / 40., false);
		} else if (mode == MODE_ROTATE_Z) {
			int xo = dragX - x + dragY - y;
			rotateZ(xo / 40.);
		} else if (mode == MODE_SLICE) {
			double x3[] = new double[3];
			unmap3d(x3, x, y, sliceFace, sliceFace);
			switch (sliceChooser.getSelectedIndex()) {
			case SLICE_X:
				sliceval = x3[0];
				break;
			case SLICE_Y:
				sliceval = x3[1];
				break;
			case SLICE_Z:
				sliceval = x3[2];
				break;
			}
			if (sliceval < -.99)
				sliceval = -.99;
			if (sliceval > .99)
				sliceval = .99;
			cv.repaint(pause);
		}
	}

	void editMag(int x, int y) {
		if (selectedPhasor == null)
			return;
		int stateSize = selectedPhasor.width;
		int ss2 = stateSize / 2;
		int x0 = selectedPhasor.x + ss2;
		int y0 = selectedPhasor.y + ss2;
		x -= x0;
		y -= y0;
		double mag = java.lang.Math.sqrt(x * x + y * y) / ss2;
		double ang = java.lang.Math.atan2(-y, x);
		if (mag > 10)
			mag = 0;
		if (mag > 1)
			mag = 1;
		selectedState.setMagPhase(mag, ang);

		if (selectedState instanceof DerivedState) {
			selectedState.convertDerivedToBasis();
			changingDerivedStates = true;
		}

		cv.repaint(pause);
		createOrbitals();
	}

	void editMagClick() {
		if (selectedState == null)
			return;
		if (magDragStart < .5)
			selectedState.setReIm(1, 0);
		else
			selectedState.setRe(0);
		cv.repaint(pause);
		createOrbitals();
	}

	void calcLxy(AlternateBasis ab, double data[], int count, int maxm,
			int pad, boolean xAxis, boolean square) {
		int i;
		int mid = count / 2;
		for (i = 0; i != count; i++)
			data[i] = 0;

		if (square)
			mid = 1;

		// convert to the basis
		ab.convertBasisToDerived();

		int j;
		double qq = 0;
		for (j = 0; j != ab.altStateCount; j++) {
			DerivedState ds = ab.altStates[j];
			if (square)
				data[mid + ds.m * ds.m * pad] += ds.magSquared();
			else
				data[mid + ds.m * pad] += ds.magSquared();
		}

		for (i = 0; i != count; i++)
			data[i] = java.lang.Math.sqrt(data[i]);
	}

	void calcLz(double data[], int count, int maxm, int pad, boolean square) {
		int i;
		int mid = count / 2;
		for (i = 0; i != count; i++)
			data[i] = 0;
		if (square)
			mid = 1;
		for (i = 0; i != stateCount; i++) {
			BasisState bs = states[i];
			if (bs.l <= maxm) {
				if (square)
					data[mid + bs.m * bs.m * pad] += bs.magSquared();
				else
					data[mid + bs.m * pad] += bs.magSquared();
			}
		}
		for (i = 0; i != count; i++)
			data[i] = java.lang.Math.sqrt(data[i]);
	}

	void rotateXY(double ang, boolean xAxis) {
		AlternateBasis ab = (xAxis) ? lxBasis : lyBasis;
		// convert to the basis
		ab.convertBasisToDerived();

		// rotate all the states in the basis around the axis
		int j;
		for (j = 0; j != ab.altStateCount; j++) {
			DerivedState ds = ab.altStates[j];
			ds.rotate(ang * ds.m);
		}

		ab.convertDerivedToBasis();

		createOrbitals();
		cv.repaint(pause);
	}

	void rotateZ(double ang) {
		int i;
		for (i = 0; i != stateCount; i++) {
			BasisState bs = states[i];
			bs.rotate(ang * bs.m);
		}
		cv.repaint(pause);
	}

	void createOrbitals() {
		int i;
		int newOrbCount = 0;
		boolean newOrbitals = false;
		for (i = 0; i != stateCount; i++) {
			BasisState st = states[i];
			if (st.m == 0) {
				if (st.mag != 0) {
					newOrbCount++;
					if (st.orb == null)
						newOrbitals = true;
				} else if (st.orb != null)
					newOrbitals = true;
			} else if (st.m > 0) {
				if (st.mag != 0 || getState(st.nr, st.l, -st.m).mag != 0) {
					newOrbCount++;
					if (st.orb == null)
						newOrbitals = true;
				} else if (st.orb != null)
					newOrbitals = true;
			}
		}
		if (!newOrbitals)
			return;
		orbCount = newOrbCount;
		orbitals = new Orbital[orbCount];
		int oi = 0;
		for (i = 0; i != stateCount; i++) {
			BasisState st = states[i];
			if ((st.m == 0 && st.mag != 0)
					|| (st.m > 0 && (st.mag != 0 || getState(st.nr, st.l, -st.m).mag != 0))) {
				if (st.orb == null) {
					Orbital orb;
					if (st.l == 0)
						orb = new SOrbital(st);
					else if (st.m == 0)
						orb = new MZeroOrbital(st);
					else
						orb = new PairedOrbital(st);
					orb.precompute();
					st.orb = orb;
				}
				orbitals[oi++] = st.orb;
			} else
				st.orb = null;
		}
	}

	void doClear() {
		int x;
		for (x = 0; x != stateCount; x++)
			states[x].setRe(0);
	}

	void normalize() {
		double norm = 0;
		int i;
		for (i = 0; i != stateCount; i++)
			norm += states[i].magSquared();
		if (norm == 0)
			return;
		double normmult = 1 / java.lang.Math.sqrt(norm);
		for (i = 0; i != stateCount; i++)
			states[i].multRe(normmult);
		cv.repaint(pause);
	}

	void maximize() {
		int i;
		double maxm = 0;
		for (i = 0; i != stateCount; i++)
			if (states[i].mag > maxm)
				maxm = states[i].mag;
		if (maxm == 0)
			return;
		for (i = 0; i != stateCount; i++)
			states[i].multRe(1 / maxm);
		cv.repaint(pause);
	}

	void measureE() {
		normalize();
		double n = random.nextDouble();
		int i = 0;
		int picki = -1;
		for (i = 0; i != stateCount; i++) {
			double m = states[i].magSquared();
			n -= m;
			if (n < 0) {
				picki = i;
				i = stateCount;
				break;
			}
		}
		if (picki == -1)
			return;
		for (i = 0; i != stateCount; i++) {
			State st = states[i];
			if (st.elevel != states[picki].elevel)
				st.setRe(0);
		}
		normalize();
	}

	void measureL(int axis) {
		if (higherStatesPresent())
			return;
		int maxm = 4;
		int pad = 3;
		int ct = (maxm * 2 + 1) * pad;
		double ldata[] = new double[ct];
		int mid = ct / 2;

		normalize();
		AlternateBasis ab = null;
		switch (axis) {
		case 0:
			calcLxy(ab = lxBasis, ldata, ct, maxm, pad, true, false);
			break;
		case 1:
			calcLxy(ab = lyBasis, ldata, ct, maxm, pad, false, false);
			break;
		case 2:
			calcLz(ldata, ct, maxm, pad, false);
			break;
		}

		double n = random.nextDouble();
		int i = 0;
		int pickm = -100;
		for (i = -maxm; i <= maxm; i++) {
			double m = ldata[mid + i * pad];
			m *= m;
			n -= m;
			if (n < 0) {
				pickm = i;
				i = maxm;
				break;
			}
		}
		if (pickm == -100)
			return;
		switch (axis) {
		case 2:
			for (i = 0; i != stateCount; i++) {
				BasisState bs = states[i];
				if (bs.m != pickm)
					bs.setRe(0);
			}
			break;
		default:
			for (i = 0; i != ab.altStateCount; i++) {
				DerivedState ds = ab.altStates[i];
				if (ds.m != pickm)
					ds.setRe(0);
			}
			ab.convertDerivedToBasis();
		}
		maximize();
		createOrbitals();
	}

	// this is when we are in single-orbital mode, and the user selects
	// a different one
	void orbitalChanged() {
		if (viewChooser.getSelectedIndex() > VIEW_COMPLEX)
			return;
		doClear();
		getState(getNR(), getL(), getM()).setReIm(1, 0);
		createOrbitals();
		manualScale = false;
	}

	BasisState getState(int nr, int l, int m) {
		int pre_n_add = nr * (maxl + 1) * (maxl + 1);
		int pre_l_add = l * l;
		/*
		 * System.out.println(nr + " " + l + " " + m + " " +
		 * (pre_n_add+pre_l_add+l+m));
		 */
		return states[pre_n_add + pre_l_add + l + m];
	}

	void setBrightness(double normmult) {
		int i;
		double avg = 0;
		double totn = 0;
		double minavg = 1e30;
		for (i = 0; i != orbCount; i++) {
			Orbital orb = orbitals[i];
			double as = orb.getBrightness();
			if (as < minavg)
				minavg = as;
			BasisState st = orb.state;
			double n = st.magSquared() * normmult;
			if (orb.state.m != 0)
				n += getState(st.nr, st.l, -st.m).magSquared() * normmult;
			totn += n;
			avg += n * as;
		}
		bestBrightness = 113.9 / (java.lang.Math.sqrt(minavg) * totn);
		double mult = bestBrightness * userBrightMult;
		int bvalue = (int) (java.lang.Math.log(mult) * 100.);
		brightnessBar.setValue(bvalue);
	}

	abstract class Orbital {
		BasisState state;
		int n, nr, l, m;
		double reMult, imMult;

		Orbital(BasisState bs) {
			nr = bs.nr;
			l = bs.l;
			m = bs.m;
			n = nr * 2 + l;
			state = bs;
		}

		void setupFrame(double mult) {
			reMult = state.re * mult;
			imMult = state.im * mult;
		}

		double dataR[], dataTh[], dataPhiR[][], dataPhiI[][];
		int dshalf;
		double brightnessCache;

		double getBoundRadius(double bright) {
			int i;
			int outer = 1;

			/*
			 * double maxThData = 0; if (l == 0) maxThData = 1; else { for (i =
			 * 0; i != dataSize; i++) { if (dataTh[i] > maxThData) maxThData =
			 * dataTh[i]; if (dataTh[i] < -maxThData) maxThData = -dataTh[i]; }
			 * }
			 */

			// we need to divide the spherical harmonic norm out of
			// dataR[] to get just the radial function. (The spherical
			// norm gets multiplied into dataR[] for efficiency.)
			int mpos = (m < 0) ? -m : m;
			double norm1 = 1 / sphericalNorm(l, mpos);
			// norm1 *= maxThData;
			norm1 *= norm1;
			norm1 *= bright;

			for (i = 0; i != dataSize; i++) { // XXX
				double v = dataR[i] * dataR[i] * norm1;
				if (v > 32)
					outer = i;
			}
			// System.out.println(maxThData + " " + outer);
			return outer / (dataSize / 2.);
		}

		double getScaleRadius() {
			// set scale by solving equation Veff(r) = E, assuming m=0
			// r^2/2 = (n+3/2)
			return java.lang.Math.sqrt(2 * (n + 1.5));
		}

		final int distmult = 4;

		void precompute() {
			int x, y, z;
			dshalf = dataSize / 2;
			double mult = scaleBar.getValue() / 2500.;

			int mpos = (m < 0) ? -m : m;
			double lgcorrect = java.lang.Math.pow(-1, m);
			double norm = radialNorm(nr, l) * sphericalNorm(l, mpos);

			dataR = new double[dataSize];
			for (x = 0; x != dataSize; x++) {
				double r = x * resadj * mult + .00000001;
				double rl = java.lang.Math.pow(r, l) * norm;
				dataR[x] = java.lang.Math.exp(-r * r / 2) * rl
						* hypser(-nr, l + 1.5, r * r);
			}

			if (l > 0) {
				dataTh = new double[dataSize + 1];
				for (x = 0; x != dataSize + 1; x++) {
					double th = (x - dshalf) / (double) dshalf;
					// we multiply in lgcorrect because plgndr() uses a
					// different sign convention than Bransden
					dataTh[x] = lgcorrect * plgndr(l, mpos, th);
				}
			}

			if (m != 0) {
				dataPhiR = new double[8][dataSize + 1];
				dataPhiI = new double[8][dataSize + 1];
				for (x = 0; x != 8; x++)
					for (y = 0; y <= dataSize; y++) {
						double phi = x * pi / 4 + y * (pi / 4) / dataSize;
						dataPhiR[x][y] = java.lang.Math.cos(phi * mpos);
						dataPhiI[x][y] = java.lang.Math.sin(phi * mpos);
					}
			}

			brightnessCache = 0;
		}

		double getBrightness() {
			if (brightnessCache != 0)
				return brightnessCache;
			int x;
			double avgsq = 0;
			double vol = 0;

			// we need to divide the spherical harmonic norm out of
			// dataR[] to get just the radial function. (The spherical
			// norm gets multiplied into dataR[] for efficiency.)
			int mpos = (m < 0) ? -m : m;
			double norm1 = 1 / sphericalNorm(l, mpos);

			for (x = 0; x != dataSize; x++) {
				double val = dataR[x] * norm1;
				val *= val;
				avgsq += val * val * x * x;
				vol += x * x;
			}

			brightnessCache = avgsq / vol;
			return brightnessCache;
		}

		double radialNorm(int nr, int l) {
			return java.lang.Math.sqrt(2 * factorial(nr)
					/ fracfactorial(l + nr + .5))
					* pochhammer(l + 1.5, nr) / factorial(nr);
		}

		double sphericalNorm(int l, int m) {
			return java.lang.Math.sqrt((2 * l + 1) * factorial(l - m)
					/ (4 * pi * factorial(l + m)));
		}

		double factorial(int f) {
			double res = 1;
			while (f > 1)
				res *= f--;
			return res;
		}

		double fracfactorial(double f) {
			double res = java.lang.Math.sqrt(pi);
			while (f > 0)
				res *= f--;
			return res;
		}

		double pochhammer(double f, int n) {
			double res = 1;
			for (; n > 0; n--) {
				res *= f;
				f += 1;
			}
			return res;
		}

		abstract void computePoint(int r, int costh);
	};

	class SOrbital extends Orbital {
		SOrbital(BasisState bs) {
			super(bs);
		}

		void computePoint(int r, int costh) {
			try {
				double v = dataR[r];
				funcr = reMult * v;
				funci = imMult * v;
			} catch (Exception e) {
				funcr = funci = 0;
				System.out.println("bad " + r + " " + costh);
			}
		}
	};

	class MZeroOrbital extends Orbital {
		MZeroOrbital(BasisState bs) {
			super(bs);
		}

		void computePoint(int r, int costh) {
			try {
				double v = dataR[r] * dataTh[costh];
				funcr = v * reMult;
				funci = v * imMult;
			} catch (Exception e) {
				funcr = funci = 0;
				System.out.println("bad " + r + " " + costh);
			}
		}
	};

	class PairedOrbital extends Orbital {
		BasisState negstate;

		PairedOrbital(BasisState bs) {
			super(bs);
			negstate = getState(bs.nr, bs.l, -bs.m);
		}

		double f1, f2, f3, f4;

		void setupFrame(double mult) {
			double a = state.re * mult;
			double b = state.im * mult;
			double c = negstate.re * mult;
			double d = negstate.im * mult;
			double mphase = java.lang.Math.pow(-1, m);
			a *= mphase;
			b *= mphase;
			f1 = (a + c);
			f2 = (d - b);
			f3 = (b + d);
			f4 = (a - c);
		}

		void computePoint(int r, int costh) {
			try {
				double q = dataR[r] * dataTh[costh];
				double phiValR = dataPhiR[phiSector][phiIndex];
				double phiValI = dataPhiI[phiSector][phiIndex];
				funcr = q * (f1 * phiValR + f2 * phiValI);
				funci = q * (f3 * phiValR + f4 * phiValI);
			} catch (Exception e) {
				funcr = funci = 0;
				System.out.println("bad " + r + " " + costh);
			}
		}
	};

	class Phasor extends Rectangle {
		Phasor(int x, int y, int a, int b) {
			super(x, y, a, b);
		}

		State state;
	}

	abstract class State extends Complex {
		double elevel;

		void convertDerivedToBasis() {
		}

		void convertBasisToDerived() {
		}

		void setBasisActive() {
		}

		abstract String getText();
	}

	class BasisState extends State {
		int nr, l, m, n;
		Orbital orb;

		String getText() {
			return "n = " + n + ", nr = " + nr + ", l = " + l + ", m = " + m;
		}
	}

	class DerivedState extends State {
		int count, m, l, nr, n, nx, ny, nz;
		AlternateBasis basis;
		String text;
		BasisState bstates[];
		Complex coefs[];

		void convertDerivedToBasis() {
			basis.convertDerivedToBasis();
		}

		void convertBasisToDerived() {
			basis.convertBasisToDerived();
		}

		void setBasisActive() {
			basis.active = true;
		}

		String getText() {
			return text;
		}
	}

	class AlternateBasis {
		DerivedState altStates[];
		int altStateCount;
		boolean active;
		int n, l;
		boolean xAxis;

		AlternateBasis() {
			basisList[basisCount++] = this;
		}

		void convertDerivedToBasis() {
			convertDerivedToBasis(true);
		}

		void convertDerivedToBasis(boolean clear) {
			int i, j;
			if (clear)
				for (i = 0; i != stateCount; i++)
					states[i].setRe(0);
			Complex c = new Complex();
			for (i = 0; i != altStateCount; i++) {
				DerivedState ds = altStates[i];
				for (j = 0; j != ds.count; j++) {
					c.set(ds.coefs[j]);
					c.conjugate();
					c.mult(ds);
					ds.bstates[j].add(c);
				}
			}
			double maxm = 0;
			for (i = 0; i != stateCount; i++)
				if (states[i].mag > maxm)
					maxm = states[i].mag;
			if (maxm > 1) {
				double mult = 1 / maxm;
				for (i = 0; i != stateCount; i++)
					states[i].multRe(mult);
			}
		}

		void convertBasisToDerived() {
			int i, j;
			Complex c1 = new Complex();
			Complex c2 = new Complex();
			double maxm = 0;
			for (i = 0; i != altStateCount; i++) {
				DerivedState ds = altStates[i];
				c1.setRe(0);
				try {
					for (j = 0; j != ds.count; j++) {
						c2.set(ds.coefs[j]);
						c2.mult(ds.bstates[j]);
						c1.add(c2);
					}
				} catch (Exception e) {
					System.out.print("Exception at " + i + "\n");
				}
				if (c1.mag < epsilon)
					c1.setRe(0);
				ds.set(c1);
				if (c1.mag > maxm)
					maxm = ds.mag;
			}
			if (maxm > 1) {
				double mult = 1 / maxm;
				for (i = 0; i != altStateCount; i++)
					altStates[i].multRe(mult);
			}
		}
	}

	class PhaseColor {
		public double r, g, b;

		PhaseColor(double rr, double gg, double bb) {
			r = rr;
			g = gg;
			b = bb;
		}
	}

	double plgndr(int l, int m, double x) {
		double fact, pll = 0, pmm, pmmp1, somx2;
		int i, ll;

		if (m < 0 || m > l || java.lang.Math.abs(x) > 1.0) {
			System.out.print("bad arguments in plgndr\n");
		}
		pmm = 1.0;
		if (m > 0) {
			somx2 = java.lang.Math.sqrt((1.0 - x) * (1.0 + x));
			fact = 1.0;
			for (i = 1; i <= m; i++) {
				pmm *= -fact * somx2;
				fact += 2.0;
			}
		}
		if (l == m)
			return pmm;
		else {
			pmmp1 = x * (2 * m + 1) * pmm;
			if (l == (m + 1))
				return pmmp1;
			else {
				for (ll = (m + 2); ll <= l; ll++) {
					pll = (x * (2 * ll - 1) * pmmp1 - (ll + m - 1) * pmm)
							/ (ll - m);
					pmm = pmmp1;
					pmmp1 = pll;
				}
				return pll;
			}
		}
	}

	double hypser(double a, double c, double z) {
		int n;
		double fac = 1;
		double result = 1;
		for (n = 1; n <= 1000; n++) {
			fac *= a * z / ((double) n * c);
			// System.out.print("fac " + n + " " + fac + " " + z + "\n");
			if (fac == 0)
				return result;
			result += fac;
			a++;
			c++;
		}
		System.out.print("convergence failure in hypser\n");
		return 0;
	}

	class View extends Rectangle {
		View() {
		}

		View(View v) {
			super(v);
		}

		double scale;
		int paneY;
		int pixels[];
	}

	class TextBox extends Rectangle {
		TextBox(int x, int y, int a, int b, String s) {
			super(x, y, a, b);
			text = s;
		}

		String text;
	}
}
