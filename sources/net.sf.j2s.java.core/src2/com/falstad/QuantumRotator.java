package com.falstad;

//QuantumRotator.java (c) 2002 by Paul Falstad, www.falstad.com.
// 


//web_Ready
//web_AppletName= Quantum Rigid Rotator
//web_Description= Particle confined to the surface of a sphere
//web_JavaVersion= http://www.falstad.com/qm1dcrystal/
//web_AppletImage= quantumrotor.png
//web_Category= Physics - Quantum
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, AWT-to-Swing


//Conversion to JavaScript by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//Changes:
//
//	import javax.swing.applet.Applet --> a2s
//	
//	import java.awt [Applet, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//	
//	replace paint with paintcomponent in frame and canvas
// 
// Added Container main and added components to it
//
//	Added call for showframe() to applet.init
//
// 	Modified applet.paint()
//
//	resize and show --> useFrame options (added setupStates() call)
//
// added triggerShow()


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

import com.falstad.FFT;


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

class QuantumRotatorCanvas extends Canvas {
 QuantumRotatorFrame pg;
 QuantumRotatorCanvas(QuantumRotatorFrame p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateQuantumRotator(g);
 }
 public void paint(Graphics g) {
	pg.updateQuantumRotator(g);
 }
};

class QuantumRotatorLayout implements LayoutManager {
 public QuantumRotatorLayout() {}
 public void addLayoutComponent(String name, Component c) {}
 public void removeLayoutComponent(Component c) {}
 public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
 }
 public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
 }
 public void layoutContainer(Container target) {
	Insets insets = target.insets();
	int targetw = target.size().width - insets.left - insets.right;
	int cw = targetw* 7/10;
	int targeth = target.size().height - (insets.top+insets.bottom);
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
		if (m instanceof Choice && d.width > barwidth)
		    d.width = barwidth;
		if (m instanceof Label) {
		    h += d.height/5;
		    d.width = barwidth;
		}
		m.move(cw, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	}
 }
};

public class QuantumRotator extends Applet implements ComponentListener {
 static QuantumRotatorFrame ogf;
 void destroyFrame() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
 }
 boolean started = false;
 public void init() {
	//addComponentListener(this);
	 showFrame();
 }
 

 public static void main(String args[]) {
     ogf = new QuantumRotatorFrame(null);
     ogf.init();
 }

 void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new QuantumRotatorFrame(this);
	    ogf.init();
	    repaint();
	}
 }
 
 public void paint(Graphics g) {
	String s = "Applet is open in a separate window.";
	if (!started)
	    s = "Applet is starting.";
	else if (ogf == null)
	    s = "Applet is finished.";
	else if (ogf.useFrame)
		ogf.triggerShow();
	g.drawString(s, 10, 30);
	super.paint(g);
 }
 
 public void componentHidden(ComponentEvent e){}
 public void componentMoved(ComponentEvent e){}
 public void componentShown(ComponentEvent e) { /*showFrame();*/ }
 public void componentResized(ComponentEvent e) {}
 
 public void destroy() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
 }
};

class QuantumRotatorFrame extends Frame
implements ComponentListener, ActionListener, AdjustmentListener,
          MouseMotionListener, MouseListener, ItemListener {
 
 Thread engine = null;

 Dimension winSize;
 Image dbimage, memimage;
 
 Random random;
 int gridSizeX = 200;
 int gridSizeY = 200;
 
 public String getAppletInfo() {
	return "QuantumRotator by Paul Falstad";
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
 MenuItem exitItem;
 Choice modeChooser;
 Scrollbar speedBar;
 Scrollbar resolutionBar;
 Scrollbar internalResBar;
 Scrollbar brightnessBar;
 Scrollbar phasorBar;
 View viewPotential, viewX, viewL, viewStates;
 View viewList[];
 int viewCount;
 Phasor phasors[];
 int phasorCount;
 BasisState states[];
 int stateCount;
 TextBox textBoxes[];
 int textCount;
 double dragZoomStart;
 double zoom = 19.9; // was 10
 double rotmatrix[];
 Rectangle viewAxes;
 static final double pi = 3.14159265358979323846;
 static final double pi2 = pi*2;
 static final double root2 = 1.41421356237309504880;
 static final double root2inv = .70710678118654752440;
 static final double baseEnergy = 0;
 int xpoints[];
 int ypoints[];
 int floorValues[];
 int selectedPaneHandle;
 PhaseColor phaseColors[][];
 Color grayLevels[];
 double resadj;
 boolean dragging = false;
 boolean editingFunc = false;
 MemoryImageSource imageSource;
 int pixels[];
 int dataSize, dataSizeTh, dataSizePh;
 static int maxModes = 10;
 static int maxDispCoefs = 8;
 static int viewDistance = 12;
 int pause;
 QuantumRotator applet;
 State selectedState;
 Phasor selectedPhasor;
 int selection = -1;
 static final int SEL_NONE = 0;
 static final int SEL_POTENTIAL = 1;
 static final int SEL_X = 2;
 static final int SEL_STATES = 3;
 static final int SEL_HANDLE = 4;
 static final int MODE_ANGLE = 0;
 static final int MODE_GAUSS = 1;
 static final int MODE_GAUSSP = 2;
 static final int MODE_ZOOM = 3;
 boolean settingScale;
 double magDragStart;
 int dragX, dragY, dragStartX, dragStartY;
 double t = 0;
 public static final double epsilon = .01;
 static final int panePad = 4;
 static final int phaseColorCount = 50;
 double func[][], funci[][];
 int phiIndex, phiSector;
 double bestBrightness, userBrightMult = 1;
 double colorMult;
 boolean manualScale;
 Color gray2;
 FontMetrics fontMetrics;
 boolean useBufferedImage;
 FFT fft;

 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 QuantumRotatorCanvas cv;
 Container main;
 boolean showControls;
 public boolean useFrame;

 QuantumRotatorFrame(QuantumRotator a) {
	super("Rigid Rotator v1.5b");
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

     String jv = System.getProperty("java.class.version");
     double jvf = new Double(jv).doubleValue();
     if (jvf >= 48)
	    useBufferedImage = true;
	
	main.setLayout(new QuantumRotatorLayout());
	cv = new QuantumRotatorCanvas(this);
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
	m.add(lCheckItem = getCheckItem("Angular Momentum (Z)"));
	m.addSeparator();
	m.add(colorCheck = getCheckItem("Phase as Color"));
	colorCheck.setState(true);

	m = new Menu("Options");
	mb.add(m);
	alwaysNormItem = getCheckItem("Always Normalize");
	m.add(axesItem = getCheckItem("Show Axes"));
	axesItem.setState(true);
	setMenuBar(mb);

	int i;
	
	modeChooser = new Choice();
	modeChooser.add("Mouse = Adjust View");
	modeChooser.add("Mouse = Create Gaussian");
	modeChooser.add("Mouse = Gaussian w/ Momentum");
	//modeChooser.add("Mouse = Adjust Zoom");
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

	main.add(new Label("Simulation Speed", Label.CENTER));
	main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 6, 1, 1, 200));
	speedBar.addAdjustmentListener(this);

	main.add(new Label("Brightness", Label.CENTER));
	main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 743,
					  1, 1, 4000));
	brightnessBar.addAdjustmentListener(this);

	main.add(new Label("Image Resolution", Label.CENTER));
	main.add(resolutionBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, 150, 2, 20, 500));
	resolutionBar.addAdjustmentListener(this);

	/*add(new Label("Internal Resolution", Label.CENTER));
	add(internalResBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 200));
	    internalResBar.addAdjustmentListener(this);*/

	main.add(new Label("Phasor Count", Label.CENTER));
	main.add(phasorBar = new Scrollbar(Scrollbar.HORIZONTAL, 8, 1, 3, 30));
	phasorBar.addAdjustmentListener(this);

	main.add(new Label("http://www.falstad.com", Label.CENTER));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }

	int j;
	phaseColors = new PhaseColor[8][phaseColorCount+1];
	for (i = 0; i != 8; i++)
	    for (j = 0; j <= phaseColorCount; j++) {
		double ang = java.lang.Math.atan(j/(double) phaseColorCount);
		phaseColors[i][j] = genPhaseColor(i, ang);
	    }
	grayLevels = new Color[256];
	for (i = 0; i != 256; i++)
	    grayLevels[i] = new Color(i, i, i);
	
	rotmatrix = new double[9];
	setView();
	xpoints = new int[4];
	ypoints = new int[4];

	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.white);
	
	if (useFrame) {
		setSize(800, 640);
		handleResize();
		Dimension x = getSize();
		Dimension screen = getToolkit().getScreenSize();
		setLocation((screen.width - x.width) / 2,
				(screen.height - x.height) / 2);
		setVisible(true);
		setupStates();
	} else {
		setVisible(false);
		setupStates();
		handleResize();
		applet.validate();
	}
//	resize(580, 500);
//	handleResize();
//	Dimension x = getSize();
//	Dimension screen = getToolkit().getScreenSize();
//	setLocation((screen.width  - x.width)/2,
//		    (screen.height - x.height)/2);
//	setupStates();
//	show();
 }

 void setView() {
	int i;
	for (i = 0; i != 9; i++)
	    rotmatrix[i] = 0;
	rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
	rotate(0, -pi/2);
 }

 void setupStates() {
	stateCount = 32*32;
	int i;
	states = new BasisState[stateCount];
	int l = 0;
	int m = 0;
	int dshalf = dataSize/2;
	for (i = 0; i != stateCount; i++) {
	    BasisState bs = states[i] = new BasisState();
	    bs.elevel = l*(l+1);
	    bs.l = l;
	    bs.m = m;

	    int mpos = (m < 0) ? -m : m;
	    double lgcorrect = java.lang.Math.pow(-1, m);
	    double norm = sphericalNorm(l, mpos);
	    double dataTh[] = bs.plm = new double[dataSizeTh];
	    double mphase = java.lang.Math.pow(-1, m);
	    lgcorrect *= mphase*norm;
	    int x;
	    for (x = 0; x != dataSizeTh; x++) {
		double th = x*pi/(dataSizeTh-1);
		// we multiply in lgcorrect because plgndr() uses a
		// different sign convention than Bransden
		dataTh[x] = lgcorrect*plgndr(l, mpos, java.lang.Math.cos(th));
	    }

	    if (m < l)
		m++;
	    else {
		l++;
		m = -l;
	    }
	}
	states[13].setRe(1);
 }

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
	ang += sec*pi/4;
	// convert to 0 .. 6
	ang *= 3/pi;
	int hsec = (int) ang;
	double a2 = ang % 1;
	double a3 = 1.-a2;
	PhaseColor c = null;
	switch (hsec) {
	case 6:
	case 0: c = new PhaseColor(1, a2, 0); break;
	case 1: c = new PhaseColor(a3, 1, 0); break;
	case 2: c = new PhaseColor(0, 1, a2); break;
	case 3: c = new PhaseColor(0, a3, 1); break;
	case 4: c = new PhaseColor(a2, 0, 1); break;
	case 5: c = new PhaseColor(1, 0, a3); break;
	}
	return c;
 }
 
 boolean shown = false;

	public void triggerShow() {
		if (!shown)
			setVisible(true);
		shown = true;
	}

 void handleResize() {
	reinit();
 }

 void reinit() {
	setResolution();
     Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	dbimage = createImage(d.width, d.height);
	setupDisplay();
 }

 void createPhasors() {
	phasorCount = textCount = 0;
	int i;
	if (viewStates == null)
	    return;
	
	int sz = viewStates.height/phasorBar.getValue();
	if (sz < 7)
	    sz = 7;
	int x = viewStates.width/2;
	int y = viewStates.y;
	int n = 1, l = 0, m = 0;
	textBoxes = new TextBox[10];

	phasorCount = phasorBar.getValue();
	phasorCount *= phasorCount;
	phasors = new Phasor[phasorCount];
	for (i = 0; i != phasorCount; i++) {
	    Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
	    ph.state = states[i];
	    x += sz;
	    if (++m > l) {
		x -= sz*(2*l+2);
		y += sz;
		l++;
		m = -l;
	    }
	}
 }

 void setInitialOrbital() {
	if (phasorCount == 0)
	    return;
	int i;
	for (i = 0; i != stateCount; i++)
	    if (states[i].mag > 0)
		return;

	// no states active, so pick a phasor (a basis phasor, for speed)
	// and select it.
	for (i = 0; i != phasorCount; i++)
	    if (phasors[i].state instanceof BasisState) {
		phasors[i].state.setRe(1);
		return;
	    }
 }

 int createBasisPhasors(int x, int y, int sz, int i, int n, int l) {
	int j;
	for (j = 0; j != l*2+1; j++) {
	    Phasor ph = phasors[i] = new Phasor(x, y, sz, sz);
	    ph.state = getState(n, l, j-l);
	    x += sz;
	    i++;
	}
	return i;
 }

 void createText(String text, int x, int y, int sz) {
	TextBox tb = new TextBox(x+10, y, winSize.width-x, sz, text);
	textBoxes[textCount++] = tb;
 }

 void setupDisplay() {
	if (winSize == null)
	    return;
	int potsize = (viewPotential == null) ? 50 : viewPotential.height;
	int statesize = (viewStates == null) ? 96 : viewStates.height;
	viewX = viewPotential = viewL = viewStates = null;
	viewList = new View[10];
	int i = 0;
	if (eCheckItem.getState())
	    viewList[i++] = viewPotential = new View();
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
	if (lCheckItem.getState())
	    viewList[i++] = viewL = new View();
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
	toth -= panePad*2*(viewCount-1);
	int cury = 0;
	for (i = 0; i != viewCount; i++) {
	    View v = viewList[i];
	    int h = (sizenum == 0) ? toth : toth/sizenum;
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
	    cury += h+panePad;
	}
	setSubViews();
 }

 void setSubViews() {
	int i;
	pixels = null;
	if (useBufferedImage) {
	    try {
		/* simulate the following code using reflection:
		   dbimage = new BufferedImage(d.width, d.height,
		   BufferedImage.TYPE_INT_RGB);
		   DataBuffer db = (DataBuffer)(((BufferedImage)memimage).
		   getRaster().getDataBuffer());
		   DataBufferInt dbi = (DataBufferInt) db;
		   pixels = dbi.getData();
		*/
		Class biclass = Class.forName("java.awt.image.BufferedImage");
		Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
		Class rasclass = Class.forName("java.awt.image.Raster");
		Constructor cstr = biclass.getConstructor(
		    new Class[] { int.class, int.class, int.class });
		memimage = (Image) cstr.newInstance(new Object[] {
		    new Integer(viewX.width), new Integer(viewX.height),
		    new Integer(1)}); // BufferedImage.TYPE_INT_RGB)});
		Method m = biclass.getMethod("getRaster", null);
		Object ras = m.invoke(memimage, null);
		Object db = rasclass.getMethod("getDataBuffer", null).
		    invoke(ras, null);
		pixels = (int[])
		    dbiclass.getMethod("getData", null).invoke(db, null);
	    } catch (Exception ee) {
		// ee.printStackTrace();
		System.out.println("BufferedImage failed");
	    }
	}
	if (pixels == null) {
	    pixels = new int[viewX.width*viewX.height];
	    for (i = 0; i != viewX.width*viewX.height; i++)
		pixels[i] = 0xFF000000;
	    imageSource = new MemoryImageSource(viewX.width, viewX.height,
						pixels, 0, viewX.width);
	    imageSource.setAnimated(true);
	    imageSource.setFullBufferUpdates(true);
	    memimage = cv.createImage(imageSource);
	}
	int asize = (int) (min(viewX.width, viewX.height)/4);
	viewAxes = new Rectangle(viewX.x+winSize.width-asize, viewX.y,
				 asize, asize);
	floorValues = null;

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
	rotm2[1] = -r1sin*r2sin;
	rotm2[2] = r2cos*r1sin;

	rotm2[3] = 0;
	rotm2[4] = r2cos;
	rotm2[5] = r2sin;

	rotm2[6] = -r1sin;
	rotm2[7] = -r1cos*r2sin;
	rotm2[8] = r1cos*r2cos;

	double rotm1[] = rotmatrix;
	rotmatrix = new double[9];

	int i, j, k;
	for (j = 0; j != 3; j++)
	    for (i = 0; i != 3; i++) {
		double v = 0;
		for (k = 0; k != 3; k++)
		    v += rotm1[k+j*3]*rotm2[i+k*3];
		rotmatrix[i+j*3] = v;
	    }
 }

 double max(double a, double b) { return a > b ? a : b; }
 double min(double a, double b) { return a < b ? a : b; }

 void setResolution() {
	int og = gridSizeX;
	gridSizeX = gridSizeY = (resolutionBar.getValue() & ~1);
	if (og == gridSizeX)
	    return;
	dataSize = gridSizeX*4; // (internalResBar.getValue() & ~1);
	dataSize = 128; // XXX
	dataSizePh = dataSize;
	dataSizeTh = dataSize+1;
	func = new double[dataSizeTh][dataSizePh];
	funci = new double[dataSizeTh][dataSizePh];
	System.out.print("setResolution " + dataSize + " " +
			 gridSizeX + "\n");
	fft = new FFT(dataSizePh);
	// was 50
	resadj = 50./dataSize;
 }

 void computeView(double normmult) {
	int i, j;
	double q = 3.14159265/dataSize;
	boolean color = colorCheck.getState();
	double izoom = 1/zoom;
	double rotm[] = rotmatrix;
	double aratio = viewX.width/(double) viewX.height;
	double xmult = dataSize/2.;
	double ymult = dataSize/2.;
	double zmult = dataSize/2.;
	double aratiox = izoom, aratioy = izoom;
	// preserve aspect ratio no matter what window dimensions
	if (aratio < 1)
	    aratioy /= aratio;
	else
	    aratiox *= aratio;
	double boundRadius2 = .5;
	boundRadius2 *= boundRadius2;
	int phiMask = dataSizePh-1;
	for (i = 0; i != gridSizeX; i++)
	    for (j = 0; j != gridSizeY; j++) {
		// calculate camera direction
		double camvx0 = (2*i/(double) gridSizeX - 1)*aratiox;
		double camvy0 = -(2*j/(double) gridSizeY - 1)*aratioy;
		// rotate camera with rotation matrix
		double camx  = rotm[2]*viewDistance;
		double camy  = rotm[5]*viewDistance;
		double camz  = rotm[8]*viewDistance;
		double camvx = rotm[0]*camvx0+rotm[1]*camvy0-rotm[2];
		double camvy = rotm[3]*camvx0+rotm[4]*camvy0-rotm[5];
		double camvz = rotm[6]*camvx0+rotm[7]*camvy0-rotm[8];
		double camnorm =
		    java.lang.Math.sqrt(camvx0*camvx0+camvy0*camvy0+1);
		int n;
		double simpr = 0;
		double simpg = 0;
		double simpb = 0;
		// calculate intersections with bounding sphere
		double a = camvx*camvx+camvy*camvy+camvz*camvz;
		double b = 2*(camvx*camx+camvy*camy+camvz*camz);
		double c = camx*camx+camy*camy+camz*camz-boundRadius2;
		double discrim = b*b-4*a*c;
		if (discrim < 0) {
		    // doesn't hit it
		    if (color) {
			double xx = 40./colorMult;
			fillSquare(i, j, xx, xx, xx);
		    } else {
			fillSquare(i, j, 0, 0, 64./colorMult);
		    }
		    continue;
		}
		discrim = java.lang.Math.sqrt(discrim);
		double mint = (-b-discrim)/(2*a);

		double xx = (camx + camvx * mint) * xmult;
		double yy = (camy + camvy * mint) * ymult;
		double zz = (camz + camvz * mint) * zmult;

		int dshalf = dataSizeTh/2;

		// find grid element that contains sampled point
		double r = xmult * .5; // java.lang.Math.sqrt(xx*xx+yy*yy+zz*zz);
		double costh = zz/r;
		double th = java.lang.Math.acos(costh);
		double th0 = th/pi*(dataSizeTh-1);
		int thi = (int) th0;
		double thw = th0-thi;
		double phi = calcPhiComponent(xx, yy);
		int phii = (int) phi;
		double phiw = phi-phii;
		int phi1 = (phii+1) & phiMask;
		double fr = func[thi][phii]*(1-thw)*(1-phiw) +
		    func[thi+1][phii]*thw*(1-phiw) +
		    func[thi][phi1]*(1-thw)*phiw +
		    func[thi+1][phi1]*thw*phiw;
		double fi = funci[thi][phii]*(1-thw)*(1-phiw) +
		    funci[thi+1][phii]*thw*(1-phiw) +
		    funci[thi][phi1]*(1-thw)*phiw +
		    funci[thi+1][phi1]*thw*phiw;
		if (color) {
		    double fv = fr*fr+fi*fi;
		    /*if (fv > 1)
		      System.out.print("fv = " + fv + "\n");*/
		    PhaseColor col = getPhaseColor(fr, fi);
		    simpr = col.r * fv;
		    simpg = col.g * fv;
		    simpb = col.b * fv;
		} else {
		    double fv = (fr*fr+fi*fi);
		    simpr = simpg = simpb = fv;
		}
		fillSquare(i, j, simpr, simpg, simpb);
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
		    val = y/x;
		} else {
		    sector = 1;
		    val = 1-x/y;
		}
	    } else {
		if (-x <= y) {
		    sector = 2;
		    val = -x/y;
		} else {
		    sector = 3;
		    val = 1+y/x;
		}
	    }
	} else {
	    if (x <= 0) {
		if (y >= x) {
		    sector = 4;
		    val = y/x;
		} else {
		    sector = 5;
		    val = 1-x/y;
		}
	    } else {
		if (-y >= x) {
		    sector = 6;
		    val = -x/y;
		} else {
		    sector = 7;
		    val = 1+y/x;
		}
	    }
	}
	return phaseColors[sector][(int) (val*phaseColorCount)];
 }

 double calcPhiComponent(double x, double y) {
	int sectorMult = dataSizePh/8;
	int phiSector = 0;
	double val = 0;
	if (x == 0 && y == 0)
	    return 0;
	if (y >= 0) {
	    if (x >= 0) {
		if (x >= y) {
		    phiSector = 0;
		    val = y/x;
		} else {
		    phiSector = 1;
		    val = 1-x/y;
		}
	    } else {
		if (-x <= y) {
		    phiSector = 2;
		    val = -x/y;
		} else {
		    phiSector = 3;
		    val = 1+y/x;
		}
	    }
	} else {
	    if (x <= 0) {
		if (y >= x) {
		    phiSector = 4;
		    val = y/x;
		} else {
		    phiSector = 5;
		    val = 1-x/y;
		}
	    } else {
		if (-y >= x) {
		    phiSector = 6;
		    val = -x/y;
		} else {
		    phiSector = 7;
		    val = 1+y/x;
		}
	    }
	}
	return (phiSector+val)*sectorMult;
 }

 void genFunc(double normmult) {
	int i, j, th, ph;
	int wc = dataSizePh*2;
	int wm = wc - 1;

	double xformbuf[] = new double[wc]; // XXX

	// step through each value of costh and use inverse fft to calculate
	// values for all phi
	for (th = 0; th != dataSizeTh; th++) {
	    for (i = 0; i != wc; i++)
		xformbuf[i] = 0;

	    for (i = 0; i != stateCount; i++) {
		BasisState st = states[i];
		int ii = wm & (-st.m*2);
		xformbuf[ii  ] += st.re*st.plm[th];
		xformbuf[ii+1] += st.im*st.plm[th];
	    }

	    // take inverse fft
	    fft.transform(xformbuf, true);

	    for (i = 0; i != dataSizePh; i++) {
		func [th][i] = xformbuf[i*2]*normmult;
		funci[th][i] = xformbuf[i*2+1]*normmult;
	    }
	}
 }

	void transform() {
		int wc = dataSizePh * 2;
		int wm = wc - 1;

		int i;
		for (i = 0; i != stateCount; i++)
			states[i].setRe(0);

		t = 0;
		int th;

		double xformbuf[] = new double[wc]; // XXX

		for (th = 0; th != dataSizeTh; th++) {
			double mult = java.lang.Math.sin(th * pi / (dataSizeTh - 1));
			for (i = 0; i != dataSizePh; i++) {
				xformbuf[i * 2] = func[th][i];
				xformbuf[i * 2 + 1] = funci[th][i];
			}
			fft.transform(xformbuf, false);

			for (i = 0; i != stateCount; i++) {
				BasisState st = states[i];
				int ii = wm & (-st.m * 2);
				st.addQuick(xformbuf[ii] * st.plm[th] * mult, xformbuf[ii + 1]
						* st.plm[th] * mult);
			}
		}
		for (i = 0; i != stateCount; i++)
			states[i].setMP();
		maximize();
	}


 int sign(double x) {
	return x < 0 ? -1 : 1;
 }

 public void paintComponent(Graphics g) {
	cv.repaint();
 }

 long lastTime;
 
 public void updateQuantumRotator(Graphics realg) {
	Graphics g = null;
	if (winSize == null || winSize.width == 0)
	    return;
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
	    long sysTime = System.currentTimeMillis();
	    if (lastTime != 0)
		tadd = val*(.001/160)*(sysTime - lastTime);
	    lastTime = sysTime;
	    t += tadd;
	} else {
	    lastTime = 0;
	    allQuiet = true;
	}
	
	double norm = 0;
	double normmult = 0, normmult2 = 0;

	if (alwaysNormItem.getState())
	    normalize();

	// update phases
	int i;
	if (!editingFunc && tadd != 0) {
	    allQuiet = false;
	    for (i = 0; i != stateCount; i++) {
		State st = states[i];
		if (st.mag < epsilon) {
		    st.setRe(0);
		    continue;
		}
		st.rotate(-(st.elevel+baseEnergy)*tadd);
	    }
	}
	for (i = 0; i != stateCount; i++) {
	    State st = states[i];
	    norm += st.magSquared();
	}
	normmult2 = 1/norm;
	if (norm == 0)
	    normmult2 = 0;
	normmult = java.lang.Math.sqrt(normmult2);

	genFunc(normmult);

	//zoom = (sliced) ? 8 : 16.55;
	colorMult = java.lang.Math.exp(brightnessBar.getValue()/100.);
	//System.out.println(colorMult);
	computeView(normmult);
	int j, k;

	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].paneY,
		       winSize.width, viewList[i].paneY);
	}

	if (viewPotential != null) {
	    double ymult = .2;
	    g.setColor(Color.darkGray);
	    int floory = viewPotential.y + viewPotential.height - 1;

	    if (floorValues == null)
		floorValues = new int[floory+1];
	    for (i = 0; i <= floory; i++)
		floorValues[i] = 0;
	    for (i = 0; i != stateCount; i++) {
		State st = states[i];
		double dy = st.elevel;
		double m = st.magSquared();
		int mc = (int) ((256-32)*m)+1;
		int y;
		y = floory - (int) (ymult * dy);
		if (y >= 0 && y <= floory)
		    floorValues[y] += mc;
	    }
	    for (i = 0; i <= floory; i++) {
		if (floorValues[i] == 0)
		    continue;
		int mc = floorValues[i]+32;
		if (mc > 255)
		    mc = 255;
		g.setColor(grayLevels[mc]);
		g.drawLine(0, i, winSize.width, i);
	    }
	    
	    // calculate expectation value of E
	    if (norm != 0) {
		double expecte = 0;
		for (i = 0; i != stateCount; i++) {
		    State st = states[i];
		    double prob = st.magSquared()*normmult2;
		    expecte += prob*st.elevel;
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
	    int maxm = 32;
	    int pad = 3;
	    int ct = (maxm*2+1)*pad;
	    double ldata[] = new double[ct];

	    calcLz(ldata, ct, maxm, pad, false);
	    drawFunction(g, viewL, ldata, ct, pad, false);
	}

	if (imageSource != null)
	    imageSource.newPixels();
	g.drawImage(memimage, viewX.x, viewX.y, null);
	
	g.setColor(Color.white);
	if (axesItem.getState())
	    drawAxes(g);
	for (i = 0; i != textCount; i++) {
	    TextBox tb = textBoxes[i];
	    int h = (tb.height + fontMetrics.getAscent() -
		     fontMetrics.getDescent())/2;
	    g.drawString(tb.text, tb.x, tb.y + h);
	}
	g.setColor(Color.yellow);
	if (selectedState != null)
	    centerString(g, selectedState.getText(),
			 viewX.y+viewX.height-5);
	
	if (viewStates != null) {
	    drawPhasors(g, viewStates);

	    g.setColor(Color.white);
	    int termWidth = phasors[0].width;
	    int x = winSize.width-termWidth/2;
	    int y = viewStates.y + termWidth/2;
	    double omega = 2;
	    double tcos = java.lang.Math.cos(-omega*t+pi/2);
	    double tsin = java.lang.Math.sin(-omega*t+pi/2);
	    int ss2 = termWidth/2;
	    int xa = (int) (tcos*ss2);
	    int ya = (int) (-tsin*ss2);
	    g.drawOval(x-ss2, y-ss2, termWidth, termWidth);
	    g.drawLine(x, y, x+xa, y+ya);
	    g.drawLine(x+xa, y+ya-1, x+xa, y+ya+1);
	    g.drawLine(x+xa-1, y+ya, x+xa+1, y+ya);
	}


	realg.drawImage(dbimage, 0, 0, this);
	if (!allQuiet)
	    cv.repaint(pause);
 }

 void fillSquare(int i, int j, double cr, double cg, double cb) {
	int winw = viewX.width;
	int winh = viewX.height;
	int x = i*winw/gridSizeX;
	int y = j*winh/gridSizeY;
	int x2 = (i+1)*winw/gridSizeX;
	int y2 = (j+1)*winh/gridSizeY;
	cr *= colorMult;
	cg *= colorMult;
	cb *= colorMult;
	int k, l;
	if (cr == 0 && cg == 0 && cb == 0) {
	    int y2l = y2*viewX.width;
	    for (k = x; k < x2; k++)
		for (l = y*viewX.width; l < y2l; l += viewX.width)
		    pixels[k+l] = 0xFF000000;
	    return;
	}
	double fm = max(cr, max(cg, cb));
	if (fm > 255) {
	    fm /= 255;
	    cr /= fm;
	    cg /= fm;
	    cb /= fm;
	}
	int colval = 0xFF000000 +
	    (((int) cr) << 16) |
	    (((int) cg) << 8) |
	    (((int) cb));
	int y2l = y2*viewX.width;
	for (k = x; k < x2; k++)
	    for (l = y*viewX.width; l < y2l; l += viewX.width)
		pixels[k+l] = colval;
 }
 
 public void centerString(Graphics g, String str, int ypos) {
	g.drawString(str, (winSize.width-fontMetrics.stringWidth(str))/2, ypos);
 }

 // see if the face containing (nx, ny, nz) is visible.
 boolean visibleFace(int nx, int ny, int nz) {
	double viewx = viewDistance*rotmatrix[2];
	double viewy = viewDistance*rotmatrix[5];
	double viewz = viewDistance*rotmatrix[8];
	return (nx-viewx)*nx+(ny-viewy)*ny+(nz-viewz)*nz < 0;
 }

 void drawPhasors(Graphics g, View v) {
	int i;
	for (i = 0; i != phasorCount; i++) {
	    Phasor ph = phasors[i];
	    State st = ph.state;
	    int ss = ph.width;
	    int ss2 = ss/2;
	    int x = ph.x + ss2;
	    int y = ph.y + ss2;
	    boolean yel = (selectedState != null &&
			   selectedState.elevel == st.elevel);
	    g.setColor(yel ? Color.yellow :
		       st.mag == 0 ? gray2 : Color.white);
	    g.drawOval(x-ss2, y-ss2, ss, ss);
	    int xa = (int) (st.re*ss2);
	    int ya = (int) (-st.im*ss2);
	    g.drawLine(x, y, x+xa, y+ya);
	    g.drawLine(x+xa, y+ya-1, x+xa, y+ya+1);
	    g.drawLine(x+xa-1, y+ya, x+xa+1, y+ya);
	}
 }

 void drawFunction(Graphics g, View view,
		      double fr[], int count, int pad, boolean fromZero) {
	int i;
	
	double expectx = 0;
	double expectx2 = 0;
	double maxsq = 0;
	double tot = 0;
	int vw = winSize.width;
	int vw2 = vw;
	int mid_x = (fromZero) ? (vw2/(count-1)) : vw2 * (count/2) / (count-1);
	int zero = mid_x;
	for (i = 0; i != count; i++) {
	    int x = vw2 * i / (count-1);
	    int ii = i;
	    double dr = fr[ii];
	    double dy = dr*dr;
	    if (dy > maxsq)
		maxsq = dy;
	    int dev = x-zero;
	    expectx += dy*dev;
	    expectx2 += dy*dev*dev;
	    tot += dy;
	}
	zero = mid_x;
	expectx /= tot;
	expectx2 /= tot;
	double maxnm = java.lang.Math.sqrt(maxsq);
	double uncert = java.lang.Math.sqrt(expectx2-expectx*expectx);
	int ox = -1, oy = 0;
	double bestscale = 1/maxnm;
	view.scale = bestscale;
	if (view.scale > 1e8)
	    view.scale = 1e8;
	g.setColor(Color.gray);
	g.drawLine(mid_x, view.y, mid_x, view.y+view.height);

	double ymult2 = .90*view.height;
	int mid_y = view.y+view.height/2+(int) ymult2/2;
	double mult = ymult2*view.scale;
	g.setColor(Color.white);
	ox = -1;
	for (i = 0; i != count; i++) {
	    int x = vw2 * i / (count-1);
	    int ii = i;
	    int y = mid_y - (int) (mult * fr[ii]);
	    if ((i % pad) == 1) {
		g.setColor(Color.gray);
		g.drawLine(x, mid_y, x, mid_y+4);
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
	    g.drawLine((int) expectx, view.y,
		       (int) expectx, view.y+view.height);
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

 void drawArrow(Graphics g, String text,
		   int x1, int y1, int x2, int y2, int as) {
	g.drawLine(x1, y1, x2, y2);
	double l = java.lang.Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	if (l > as/2) {  // was as
	    double hatx = (x2-x1)/l;
	    double haty = (y2-y1)/l;
	    g.drawLine(x2, y2,
		       (int) (haty*as-hatx*as+x2),
		       (int) (-hatx*as-haty*as+y2));
	    g.drawLine(x2, y2,
		       (int) (-haty*as-hatx*as+x2),
		       (int) (hatx*as-haty*as+y2));
	    if (text != null)
		g.drawString(text, (int) (x2+hatx*10), (int) (y2+haty*10));
	}
 }

 // map 3-d point (x,y,z) to screen, storing coordinates
 // in xpoints[pt],ypoints[pt]
 void map3d(double x, double y, double z,
	       int xpoints[], int ypoints[], int pt, Rectangle v) {
	double rotm[] = rotmatrix;
	double realx =               x*rotm[0] + y*rotm[3] + z*rotm[6];
	double realy =               x*rotm[1] + y*rotm[4] + z*rotm[7];
	double realz = viewDistance-(x*rotm[2] + y*rotm[5] + z*rotm[8]);
	double scalex = v.width*zoom/2;
	double scaley = v.height*zoom/2;
	double aratio = v.width/(double) v.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;
	xpoints[pt] = v.x + v.width /2 + (int) (scalex*realx/realz);
	ypoints[pt] = v.y + v.height/2 - (int) (scaley*realy/realz);
 }

 // map point on screen to 3-d coordinates assuming it lies on a given plane
 void unmap3d(double x3[], int x, int y, double pn[], double pp[]) {
	// first, find all points which map to (x,y) on the screen.
	// this is a line.
	double scalex = viewX.width*zoom/2;
	double scaley = viewX.height*zoom/2;

	double aratio = viewX.width/(double) viewX.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;

	double vx =  (x-(viewX.x+viewX.width/2))/scalex;
	double vy = -(y-(viewX.y+viewX.height/2))/scaley;
	// vz = -1
	
	// map the line vector to object space
	double rotm[] = rotmatrix;
	double mx  = viewDistance*rotm[2];
	double my  = viewDistance*rotm[5];
	double mz  = viewDistance*rotm[8];
	double mvx = (vx*rotm[0] + vy*rotm[1] - rotm[2]);
	double mvy = (vx*rotm[3] + vy*rotm[4] - rotm[5]);
	double mvz = (vx*rotm[6] + vy*rotm[7] - rotm[8]);
	
	// calculate the intersection between the line and the given plane
	double t = ((pp[0]-mx)*pn[0] +
		    (pp[1]-my)*pn[1] +
		    (pp[2]-mz)*pn[2]) /
	    (pn[0]*mvx+pn[1]*mvy+pn[2]*mvz);

	x3[0] = mx+mvx*t;
	x3[1] = my+mvy*t;
	x3[2] = mz+mvz*t;
 }

 public void componentHidden(ComponentEvent e){}
 public void componentMoved(ComponentEvent e){}
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
 }

 void doGauss(int xx, int yy, int mom) {
	int i, j;

	//System.out.println("populate");

	int dshalf = dataSizeTh/2;
	if (xx < 0)
	    xx = 0;
	if (yy < 0)
	    yy = 0;
	double gx = 500/(xx+5);
	double gy = 500/(yy+5);
	//System.out.println(xx + " " + yy + " " + gx + " " + gy);
	double gm = mom/3.;
	if (gm > 24)
	    gm = 24;
	if (gm < -24)
	    gm = -24;
	for (i = 0; i != dataSizeTh; i++) {
	    double th = i*pi/(dataSizeTh-1);
	    double z = java.lang.Math.cos(th);
	    double sinth = java.lang.Math.sin(th);
	    for (j = 0; j != dataSizePh; j++) {
		double ph = j*2*pi/dataSizePh;
		double x = java.lang.Math.cos(ph)*sinth;
		double y = java.lang.Math.sin(ph)*sinth;
		double d1 = java.lang.Math.exp(-gx*((y+1)*(y+1)+x*x)-gy*z*z);
		func [i][j] = d1 * java.lang.Math.cos((ph-3*pi/2)*gm);
		funci[i][j] = d1 * java.lang.Math.sin((ph-3*pi/2)*gm);
	    }
	}
	//System.out.println("Transform");
	transform();
	//System.out.println("Transform done");
	editingFunc = true;
 }

 int scaleValue = -1;

 public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == phasorBar)
	    setupDisplay();
	if (e.getSource() == brightnessBar) {
	    double mult = java.lang.Math.exp(brightnessBar.getValue()/100.);
	    userBrightMult = mult/bestBrightness;
	}
	if (e.getSource() == resolutionBar)
	    setResolution();
	cv.repaint(pause);
 }

 public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
	dragX = e.getX(); dragY = e.getY();
 }

 public void mouseMoved(MouseEvent e) {
	if (dragging)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int oldsph = selectedPaneHandle;
	int olds = selection;
	State oldss = selectedState;
	selectedPaneHandle = -1;
	selection = 0;
	selectedState = null;
	int i;
	for (i = 1; i != viewCount; i++) {
	    int dy = y-viewList[i].paneY;
	    if (dy >= -3 && dy <= 3) {
		selectedPaneHandle = i;
		selection = SEL_HANDLE;
	    }
	}
	if (viewX != null && viewX.inside(x, y)) {
	    selection = SEL_X;
	} else if (viewPotential != null && viewPotential.contains(x, y)) {
	    selection = SEL_POTENTIAL;
	    //findStateByEnergy(y);
	} else if (viewStates != null && viewStates.inside(x, y))
	    findPhasor(viewStates, x, y);
	if (oldsph != selectedPaneHandle || olds != selection ||
	    oldss != selectedState)
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
	selectedState.setRe(1);
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
	mouseMoved(e); // needed for mobile
	dragX = dragStartX = e.getX();
	dragY = dragStartY = e.getY();
	dragZoomStart = zoom;
	dragging = true;
	edit(e);
 }
 public void mouseReleased(MouseEvent e) {
	if (dragging)
	    cv.repaint();
	dragging = editingFunc = false;
 }
 public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() instanceof CheckboxMenuItem) {
	    setupDisplay();
	    cv.repaint(pause);
	    return;
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
	case SEL_HANDLE:  editHandle(y);   break;
	case SEL_STATES:  editMag(x, y);   break;
	case SEL_POTENTIAL:  break;
	case SEL_X:       editX(x, y);  break;
	}
 }

 void editHandle(int y) {
	int dy = y-viewList[selectedPaneHandle].paneY;
	View upper = viewList[selectedPaneHandle-1];
	View lower = viewList[selectedPaneHandle];
	int minheight = 10;
	if (upper.height+dy < minheight || lower.height-dy < minheight)
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
	if (mode == MODE_ANGLE) {
	    int xo = dragX-x;
	    int yo = dragY-y;
	    rotate(xo/40., -yo/40.);
	    cv.repaint(pause);
	} else if (mode == MODE_GAUSS) {
	    doGauss(x-dragStartX, y-dragStartY, 0);
	    setView();
	    cv.repaint();
	} else if (mode == MODE_GAUSSP) {
	    int xx = x-dragStartX;
	    int yy = y-dragStartY;
	    doGauss(yy, yy, xx);
	    setView();
	    cv.repaint();
	} else if (mode == MODE_ZOOM) {
	    int xo = dragX-dragStartX;
	    zoom = dragZoomStart + xo/20.;
	    if (zoom < .1)
		zoom = .1;
	    System.out.println(zoom);
	    cv.repaint(pause);
	}
 }

 void editMag(int x, int y) {
	if (selectedPhasor == null)
	    return;
	int stateSize = selectedPhasor.width;
	int ss2 = stateSize/2;
	int x0 = selectedPhasor.x + ss2;
	int y0 = selectedPhasor.y + ss2;
	x -= x0;
	y -= y0;
	double mag = java.lang.Math.sqrt(x*x+y*y)/ss2;
	double ang = java.lang.Math.atan2(-y, x);
	if (mag > 10)
	    mag = 0;
	if (mag > 1)
	    mag = 1;
	selectedState.setMagPhase(mag, ang);

	cv.repaint(pause);
 }

 void editMagClick() {
	if (selectedState == null)
	    return;
	if (magDragStart < .5)
	    selectedState.setRe(1);
	else
	    selectedState.setRe(0);
	cv.repaint(pause);
 }

 void calcLz(double data[], int count, int maxm, int pad, boolean square) {
	int i;
	int mid = count/2;
	for (i = 0; i != count; i++)
	    data[i] = 0;
	if (square)
	    mid = 1;
	for (i = 0; i != stateCount; i++) {
	    BasisState bs = states[i];
	    if (bs.l <= maxm) {
		if (square)
		    data[mid+bs.m*bs.m*pad] += bs.magSquared();
		else
		    data[mid+bs.m*pad] += bs.magSquared();
	    }
	}
	for (i = 0; i != count; i++)
	    data[i] = java.lang.Math.sqrt(data[i]);
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
	double normmult = 1/java.lang.Math.sqrt(norm);
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
	for (i = 0; i != stateCount; i++) {
	    states[i].multRe(1/maxm);
	    if (states[i].mag < epsilon)
		states[i].setRe(0);
	}
	cv.repaint(pause);
 }

 BasisState getState(int n, int l, int m) {
	int pre_n = n-1;
	int pre_n_add = pre_n*(pre_n+1)*(2*pre_n+1)/6;
	int pre_l_add = l*l;
	return states[pre_n_add+pre_l_add+l+m];
 }

 double radialNorm(int n, int l) {
	double a0 = factorial(n+l);
	return java.lang.Math.sqrt(4.*factorial(n+l)/
				   (n*n*n*n*factorial(n-l-1)))/
	    factorial(2*l+1);
 }

 double sphericalNorm(int l, int m) {
	return java.lang.Math.sqrt((2*l+1)*factorial(l-m)/
				   (4*pi*factorial(l+m)));
 }
 
 double factorial(int f) {
	double res = 1;
	while (f > 1)
	    res *= f--;
	return res;
 }

 class Phasor extends Rectangle {
	Phasor(int x, int y, int a, int b) {
	    super(x, y, a, b);
	}
	State state;
 }

 abstract class State extends Complex {
	double elevel;
	void setBasisActive() {}
	abstract String getText();
 }

 class BasisState extends State {
	int l, m;
	double plm[];
	String getText() {
	    return "l = " + l + ", m = " + m;
	}
 }

 class PhaseColor {
	public double r, g, b;
	PhaseColor(double rr, double gg, double bb) {
	    r = rr; g = gg; b = bb;
	}
 }

 double plgndr(int l,int m,double x) {
	double fact,pll = 0,pmm,pmmp1,somx2;
	int i,ll;

	if (m < 0 || m > l || java.lang.Math.abs(x) > 1.0) {
	    System.out.print("bad arguments in plgndr\n");
	}
	pmm=1.0;
	if (m > 0) {
	    somx2=java.lang.Math.sqrt((1.0-x)*(1.0+x));
	    fact=1.0;
	    for (i=1;i<=m;i++) {
		pmm *= -fact*somx2;
		fact += 2.0;
	    }
	}
	if (l == m)
	    return pmm;
	else {
	    pmmp1=x*(2*m+1)*pmm;
	    if (l == (m+1))
		return pmmp1;
	    else {
		for (ll=(m+2);ll<=l;ll++) {
		    pll=(x*(2*ll-1)*pmmp1-(ll+m-1)*pmm)/(ll-m);
		    pmm=pmmp1;
		    pmmp1=pll;
		}
		return pll;
	    }
	}
 }

 double hypser(int a, int c, double z) {
	int n;
	double fac = 1;
	double result = 1;
	for (n=1;n<=1000;n++) {
	    fac *= a*z/((double) n*c);
	    //System.out.print("fac " + n + " " + fac + " " + z + "\n");
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
	View() { }
	View(View v) { super(v); }
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
