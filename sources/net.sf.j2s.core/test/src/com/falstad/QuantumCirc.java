package com.falstad;

//QuantumCirc.java (C) 2001 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= QuantumCirc
//web_Description= A simulation that shows the behavior of a particle in a two dimensional circular square well.
//web_JavaVersion= http://www.falstad.com/qm2dcirc/
//web_AppletImage= quantumcirc.png
//web_Category= Physics - Quantum
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, AWT-to-Swing

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

import javax.swing.ButtonGroup;
import javax.swing.JRadioButtonMenuItem;

import a2s.Applet;

import com.falstad.FFT;

import a2s.Canvas;
import a2s.Checkbox;
import a2s.CheckboxMenuItem;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Menu;
import a2s.MenuBar;
import a2s.MenuItem;
import a2s.Scrollbar;
import a2s.Button;

import javax.swing.ButtonGroup;
import javax.swing.JRadioButtonMenuItem;

class QuantumCircCanvas extends Canvas {
 QuantumCircFrame pg;
 QuantumCircCanvas(QuantumCircFrame p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateQuantumCirc(g);
 }
 public void paintComponent(Graphics g) {
	pg.updateQuantumCirc(g);
 }
};

class QuantumCircLayout implements LayoutManager {
 public QuantumCircLayout() {}
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
		if (m instanceof Choice)
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

public class QuantumCirc extends Applet implements ComponentListener {
 static QuantumCircFrame ogf;
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
     ogf = new QuantumCircFrame(null);
     ogf.init();
 }

 void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new QuantumCircFrame(this);
	    ogf.init();
	    repaint();
	}
 }
 
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

class QuantumCircFrame extends Frame
implements ComponentListener, ActionListener, AdjustmentListener,
          MouseMotionListener, MouseListener, ItemListener {
 
 Thread engine = null;

 Dimension winSize;
 Image dbimage;
 
 Random random;
 int maxSampleCount = 70;
 int maxDispPhasorsR = 10;
 int maxDispPhasorsTh = 21;
 int sampleCountR, sampleCountTh;
 int modeCountR, modeCountTh, modeCountM;
 FFT fftTh;
 public static final double epsilon = .00001;
 public static final double epsilon2 = .003;
 static final int panePad = 4;
 
 public String getAppletInfo() {
	return "QuantumCirc Series by Paul Falstad";
 }

 Button groundButton;
 Button blankButton;
 Button normalizeButton;
 Button maximizeButton;
 Checkbox stoppedCheck;
 CheckboxMenuItem eCheckItem;
 CheckboxMenuItem xCheckItem;
 CheckboxMenuItem pCheckItem;
 CheckboxMenuItem lCheckItem;
 CheckboxMenuItem statesCheckItem;
 CheckboxMenuItem expectCheckItem;
 CheckboxMenuItem uncertaintyCheckItem;
 JRadioButtonMenuItem probCheckItem;
 JRadioButtonMenuItem probPhaseCheckItem;
 JRadioButtonMenuItem magPhaseCheckItem;
 CheckboxMenuItem alwaysNormItem;
 CheckboxMenuItem alwaysMaxItem;
 Menu waveFunctionMenu;
 MenuItem measureEItem;
 MenuItem measureLItem;
 MenuItem exitItem;
 Choice mouseChooser;
 Checkbox colorCheck;
 Scrollbar brightnessBar;
 Scrollbar speedBar;
 Scrollbar forceBar;
 Scrollbar resBar;
 Scrollbar phasorBar;
 Scrollbar pZoomBar;
 int pZoomBarValue;
 View viewPotential, viewX, viewP, viewStates,
	viewXMap, viewPMap, viewStatesMap, viewL;
 View viewList[];
 int viewCount;
 boolean editingFunc;
 boolean dragStop;
 double magcoef[][];
 double phasecoef[][];
 double phasecoefcos[][];
 double phasecoefsin[][];
 double phasecoefadj[][];
 double angle1SinTab[];
 double angle1CosTab[];
 double angle2SinTab[];
 double angle2CosTab[];
 double elevels[][];
 double xformbuf[];
 double lzspectrum[];
 static final double pi = 3.14159265358979323846;
 double step;
 double func[][];
 double funci[][];
 double pfunc[][];
 double pfunci[][];
 PhaseColor phaseColors[][];
 PhaseColor whitePhaseColor;
 Color grayLevels[];
 static final int phaseColorCount = 50;
 int xpoints[];
 int ypoints[];
 int floorValues[];
 double xStates[][][];
 double pStates[][][];
 int selectedCoefX, selectedCoefY;
 double selectedGridX, selectedGridY;
 int selectedPaneHandle;
 static final int SEL_NONE = 0;
 static final int SEL_POTENTIAL = 1;
 static final int SEL_X = 2;
 static final int SEL_STATES = 3;
 static final int SEL_L = 4;
 static final int SEL_HANDLE = 5;
 static final int MOUSE_GAUSS = 0;
 static final int MOUSE_GAUSSP = 1;
 static final int MOUSE_ROTATE = 2;
 int selection;
 int dragX, dragY;
 int dragStartX, dragStartY;
 boolean dragSet, dragClear;
 double viewZoom = 1, viewZoomDragStart;
 double scaleHeight = 6;
 double viewHeight = -14, viewHeightDragStart;
 double viewDistance;
 double magDragStart;
 boolean dragging;
 double t;
 int pause;
 double scalex, scaley;
 int centerX3d;
 int centerY3d;
 double topz = 3;
 double brightmult;

 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 QuantumCircCanvas cv;
 QuantumCirc applet;
 public boolean useFrame;
 boolean showControls;
 Container main;

 QuantumCircFrame(QuantumCirc a) {
	super("Quantum Circular Box Applet v1.5a");
	applet = a;
	useFrame = true;
	showControls = true;
 }

 boolean useBufferedImage = false;
 
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
	    useBufferedImage = true;

	selectedCoefX = selectedCoefY = -1;
	main.setLayout(new QuantumCircLayout());
	cv = new QuantumCircCanvas(this);
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
	m.add(pCheckItem = getCheckItem("Linear Momentum"));
	m.add(lCheckItem = getCheckItem("Angular Momentum"));
	m.add(statesCheckItem = getCheckItem("State Phasors"));
	statesCheckItem.setState(true);
	m.addSeparator();
	m.add(expectCheckItem = getCheckItem("Expectation Values"));
	m.add(uncertaintyCheckItem = getCheckItem("Uncertainties"));
	Menu m2 = waveFunctionMenu = new Menu("Wave Function");
	m.add(m2);
	m2.add(probCheckItem = getRadioItem("Probability"));
	m2.add(probPhaseCheckItem = getRadioItem("Probability + Phase"));
	m2.add(magPhaseCheckItem = getRadioItem("Magnitude + Phase"));
	magPhaseCheckItem.setSelected(true);

	m = new Menu("Measure");
	mb.add(m);
	m.add(measureEItem = getMenuItem("Measure Energy"));
	m.add(measureLItem = getMenuItem("Measure Angular Momentum"));

	m = new Menu("Options");
	mb.add(m);
	m.add(alwaysNormItem = getCheckItem("Always Normalize"));
	m.add(alwaysMaxItem = getCheckItem("Always Maximize"));
	alwaysMaxItem.setState(true);
	setMenuBar(mb);

	mouseChooser = new Choice();
	mouseChooser.add("Mouse = Create Gaussian");
	mouseChooser.add("Mouse = Gaussian w/ Momentum");
	mouseChooser.add("Mouse = Rotate Function");
	mouseChooser.addItemListener(this);
	main.add(mouseChooser);
	mouseChooser.select(MOUSE_GAUSS);

	main.add(blankButton = new Button("Clear"));
	blankButton.addActionListener(this);
	main.add(normalizeButton = new Button("Normalize"));
	normalizeButton.addActionListener(this);
	main.add(maximizeButton = new Button("Maximize"));
	maximizeButton.addActionListener(this);
	main.add(groundButton = new Button("Ground State"));
	groundButton.addActionListener(this);

	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	main.add(stoppedCheck);

	main.add(new Label("Simulation Speed", Label.CENTER));
	main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 105, 1, 1, 300));
	speedBar.addAdjustmentListener(this);

	main.add(new Label("Brightness", Label.CENTER));
	main.add(brightnessBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, 980, 1, 700, 2000));
	brightnessBar.addAdjustmentListener(this);

	main.add(new Label("Resolution", Label.CENTER));
	main.add(resBar = new Scrollbar(Scrollbar.HORIZONTAL,
				   16, 1, 2, maxSampleCount/2));
	resBar.addAdjustmentListener(this);

	main.add(new Label("Momentum Zoom", Label.CENTER));
	main.add(pZoomBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    166, 1, 45, 260));
	pZoomBar.addAdjustmentListener(this);

	main.add(new Label("Phasor Count", Label.CENTER));
	main.add(phasorBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    10, 1, 5, maxSampleCount/2));
	phasorBar.addAdjustmentListener(this);

	setResolution();

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	
	int i, j;
	phaseColors = new PhaseColor[8][phaseColorCount+1];
	for (i = 0; i != 8; i++)
	    for (j = 0; j <= phaseColorCount; j++) {
		double ang = java.lang.Math.atan(j/(double) phaseColorCount);
		phaseColors[i][j] = genPhaseColor(i, ang);
	    }
	whitePhaseColor = new PhaseColor(1, 1, 1);
	grayLevels = new Color[256];
	for (i = 0; i != 256; i++)
	    grayLevels[i] = new Color(i, i, i);
	
	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);

//	resize(640, 600);
//	handleResize();
//	Dimension x = getSize();
//	Dimension screen = getToolkit().getScreenSize();
//	setLocation((screen.width  - x.width)/2,
//		    (screen.height - x.height)/2);
//	show();
	
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

 ButtonGroup radioGroup;

 JRadioButtonMenuItem getRadioItem(String s) {
	if (radioGroup == null)
	    radioGroup = new ButtonGroup();
     JRadioButtonMenuItem mi = new JRadioButtonMenuItem(s);
     mi.addItemListener(this);
     radioGroup.add(mi);
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

 void reinit() {
	doBlank();
	magcoef[1][0] = 1;
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
	dbimage = createImage(d.width, d.height);
	setupDisplay();
 }

 void setupDisplay() {
	if (winSize == null)
	    return;
	int potsize = (viewPotential == null) ? 50 : viewPotential.height;
	int statesize = (viewStates == null) ? 150 : viewStates.height;
	viewX = viewL = viewP = viewPotential = viewStates = null;
	viewList = new View[10];
	int i = 0;
	if (eCheckItem.getState())
	    viewList[i++] = viewPotential = new View();
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
	if (pCheckItem.getState())
	    viewList[i++] = viewP = new View();
	if (lCheckItem.getState())
	    viewList[i++] = viewL = new View();
	if (statesCheckItem.getState())
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
	    int h = toth/sizenum;
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
	viewXMap = null;
	viewStatesMap = null;
	if (viewStates != null) {
	    viewStatesMap = new View(viewStates);
	    double a = viewStates.width / (double) viewStates.height;
	    double a2 = modeCountTh / (double) modeCountR;
	    int w, h;
	    if (a2 > a)
		w = viewStates.width-2;
	    else
		w = (int) ((viewStates.height-2)*a2);
	    viewStatesMap.x += (viewStatesMap.width -w)/2 + 1;
	    viewStatesMap.width  = w;
	}
	if (viewX != null) {
	    viewXMap = new View(viewX);
	    processMap(viewXMap);
	}
	if (viewP != null) {
	    viewPMap = new View(viewP);
	    processMap(viewPMap);
	}
	if (viewL != null) {
	    View v = viewL;
	    v.mid_y = v.y + v.height/2;
	    v.ymult = .90*v.height/2;
	    v.lower_y = (int) (v.mid_y+v.ymult);
	    v.ymult2 = v.ymult*2;
	}
	
	floorValues = null;
 }

 void processMap(View v) {
	double a = v.width / (double) v.height;
	int w, h;
	if (1 > a)
	    w = h = v.width-2;
	else
	    w = h = v.height-2;
	v.x += (v.width -w)/2 + 1;
	v.y += (v.height-h)/2 + 1;
	v.width  = w;
	v.height = h;
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
		v.memimage = (Image) cstr.newInstance(new Object[] {
		    new Integer(v.width), new Integer(v.height),
		    new Integer(1)}); // BufferedImage.TYPE_INT_RGB)});
		Method m = biclass.getMethod("getRaster", null);
		Object ras = m.invoke(v.memimage, null);
		Object db = rasclass.getMethod("getDataBuffer", null).
		    invoke(ras, null);
		v.pixels = (int[])
		    dbiclass.getMethod("getData", null).invoke(db, null);
	    } catch (Exception ee) {
		// ee.printStackTrace();
		System.out.println("BufferedImage failed");
	    }
	}
	if (v.pixels == null) {
	    v.pixels = new int[v.width*v.height];
	    int i;
	    for (i = 0; i != v.width*v.height; i++)
		v.pixels[i] = 0xFF000000;
	    v.imageSource = new MemoryImageSource(v.width, v.height,
						v.pixels, 0, v.width);
	    v.imageSource.setAnimated(true);
	    v.imageSource.setFullBufferUpdates(true);
	    v.memimage = cv.createImage(v.imageSource);
	}
 }

 int min(int x, int y) { return (x < y) ? x : y; }

 /*if (viewFreq != null) {
	    viewFreq.x = (winSize.width-viewFreq.height)/2;
	    viewFreq.width -= viewFreq.x*2;
	    int tw = getTermWidth();
	    int h = tw*(modeCountR+1);
	    int pad = viewFreq.height-h;
	    if (pad > 0) {
		viewFreq.y += pad;
		viewFreq.height -= pad;
		if (view3d != null)
		    view3d.height += pad;
		if (view2d != null)
		    view2d.height += pad;
	    }
	    }*/

 void doGround() {
	doBlank();
	magcoef[0][0] = 1;
	t = 0;
 }

 void normalize() {
	double norm = 0;
	int i, j;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		norm += magcoef[i][j]*magcoef[i][j];
	if (norm == 0)
	    return;
	double normmult = 1/java.lang.Math.sqrt(norm);
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		magcoef[i][j] *= normmult;
	cv.repaint(pause);
 }

 void maximize() {
	int i, j;
	double maxm = 0;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		if (java.lang.Math.abs(magcoef[i][j]) > maxm)
		    maxm = java.lang.Math.abs(magcoef[i][j]);
	if (maxm == 0)
	    return;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		magcoef[i][j] *= 1/maxm;
	cv.repaint(pause);
 }

 void measureE() {
	normalize();
	double n = random.nextDouble();
	int i = 0, j = 0;
	int picki = -1;
	int pickj = -1;
	for (i = 0; i < modeCountTh; i++)
	    for (j = 0; j < modeCountR; j++) {
		double m = magcoef[i][j]*magcoef[i][j];
		n -= m;
		if (n < 0) {
		    picki = i;
		    pickj = j;
		    i = j = 10000;
		    break;
		}
	    }
	if (picki == -1)
	    return;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		if (elevels[i][j] != elevels[picki][pickj])
		    magcoef[i][j] = 0;
	if (alwaysNormItem.getState())
	    normalize();
	else
	    maximize();
 }

 final int lspacing = 3;

 void calcLSpectrum() {
	int lzcount = modeCountTh*lspacing;
	if (lzspectrum == null)
	    lzspectrum = new double[lzcount];
	int i, j;
	for (i = 0; i != lzcount; i++)
	    lzspectrum[i] = 0;
	int lc = (lzcount/2);
	for (i = 0; i != modeCountTh; i++) {
	    int m = ((i % 2) == 0) ?
		(i/2*lspacing+lc) :
		(lc-lspacing*(i+1)/2);
	    for (j = 0; j != modeCountR; j++)
		lzspectrum[m] += magcoef[i][j]*magcoef[i][j];
	}
 }

 void measureL() {
	normalize();
	calcLSpectrum();
	double n = random.nextDouble();
	int i = 0;
	int picki = -1;
	int lzcount = modeCountTh*lspacing;
	for (i = 0; i != lzcount; i++) {
	    double m = lzspectrum[i];
	    n -= m;
	    if (n < 0) {
		picki = i;
		i = lzcount;
		break;
	    }
	}
	if (picki == -1)
	    return;
	int lc = (lzcount/2);
	int j;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++) {
		int m = ((i % 2) == 0) ?
		    (i/2*lspacing+lc) :
		    (lc-lspacing*(i+1)/2);
		if (m != picki)
		    magcoef[i][j] = 0;
	    }
	if (alwaysNormItem.getState())
	    normalize();
	else
	    maximize();
 }

 void doBlank() {
	int x, y;
	for (x = 0; x != modeCountTh; x++)
	    for (y = 0; y != modeCountR; y++)
		magcoef[x][y] = 0;
 }

 int getPanelHeight() { return winSize.height / 3; }

 void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
     g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
 }

// public void paintComponent(Graphics g) {
//	cv.repaint();
// }

 long lastTime;
 public void updateQuantumCirc(Graphics realg) {
		if (winSize == null || winSize.width == 0) {
	    // this works around some weird bug in IE which causes the
	    // applet to not show up properly sometimes.
	    handleResize();
	    return;
	}
	Graphics g = dbimage.getGraphics();
	if (winSize == null || winSize.width == 0 || dbimage == null)
	    return;
	boolean allQuiet = true;
	if (!stoppedCheck.getState() && !dragging) {
	    int val = speedBar.getValue();
	    double tadd = java.lang.Math.exp(val/20.)*(.1/5);
	    long sysTime = System.currentTimeMillis();
	    if (lastTime == 0)
		lastTime = sysTime;
	    tadd *= (sysTime-lastTime)*(1/170.);
	    t += tadd;
	    lastTime = sysTime;
	    allQuiet = false;
	} else
	    lastTime = 0;
	Color gray1 = new Color(76,  76,  76);
	Color gray2 = new Color(127, 127, 127);
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());

	int i, j;
	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].paneY,
		       winSize.width, viewList[i].paneY);
	}

	int x, y;
	if (dragStop)
	    t = 0;
	double norm = 0;
	double normmult = 0, normmult2 = 0;
	if (!editingFunc) {
	    // update phases
	    for (i = 0; i != modeCountTh; i++) {
		for (j = 0; j != modeCountR; j++) {
		    if (magcoef[i][j] < epsilon && magcoef[i][j] > -epsilon) {
			magcoef[i][j] = phasecoef[i][j] =
			    phasecoefadj[i][j] = 0;
			continue;
		    }
		    allQuiet = false;
		    phasecoef[i][j] =
			(-elevels[i][j]*t+phasecoefadj[i][j]) % (2*pi);
		    phasecoefcos[i][j] = java.lang.Math.cos(phasecoef[i][j]);
		    phasecoefsin[i][j] = java.lang.Math.sin(phasecoef[i][j]);
		    norm += magcoef[i][j]*magcoef[i][j];
		}
	    }
	    normmult2 = 1/norm;
	    if (norm == 0)
		normmult2 = 0;
	    normmult = java.lang.Math.sqrt(normmult2);
	    genFunc(normmult, true);
	}
	brightmult =
	    java.lang.Math.exp(brightnessBar.getValue()/200.-5);
	if (norm == 0)
	    normmult = normmult2 = 0;
	int half = sampleCountTh/2;
	xpoints = new int[4];
	ypoints = new int[4];

	if (viewPotential != null) {
	    int floory = viewPotential.y + viewPotential.height - 5;
	    double ymult = 200;
	    if (floorValues == null)
		floorValues = new int[floory+1];
	    for (i = 0; i <= floory; i++)
		floorValues[i] = 0;
	    for (i = 0; i != modeCountTh; i++)
		for (j = 0; j != modeCountR; j++) {
		    double dy = elevels[i][j];
		    double m = magcoef[i][j]*magcoef[i][j];
		    int mc = (int) ((256-32)*m)+1;
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
	    g.setColor(Color.white);
	    g.drawLine(viewXMap.x, 0, viewXMap.x, floory);
	    int x0 = viewXMap.x+viewXMap.width;
	    g.drawLine(x0, 0, x0, floory);
	    g.drawLine(viewXMap.x, floory, x0, floory);
	    
	    // calculate expectation value of E
	    if (norm != 0 && (expectCheckItem.getState() ||
			      uncertaintyCheckItem.getState())) {
		double expecte = 0;
		double expecte2 = 0;
		for (i = 0; i != modeCountTh; i++)
		    for (j = 0; j != modeCountR; j++) {
			double prob = magcoef[i][j]*magcoef[i][j]*normmult2;
			expecte += prob*elevels[i][j];
			expecte2 += prob*elevels[i][j]*elevels[i][j];
		    }
		double uncert = java.lang.Math.sqrt(expecte2-expecte*expecte);
		if (uncertaintyCheckItem.getState()) {
		    if (!(uncert >= 0))
			uncert = 0;
		    g.setColor(Color.blue);
		    y = floory - (int) (ymult * (expecte+uncert));
		    g.drawLine(0, y, winSize.width, y);
		    y = floory - (int) (ymult * (expecte-uncert));
		    if (expecte-uncert >= 0)
			g.drawLine(0, y, winSize.width, y);
		}
		if (expectCheckItem.getState()) {
		    y = floory - (int) (ymult * expecte);
		    g.setColor(Color.red);
		    g.drawLine(0, y, winSize.width, y);
		}
	    }
	    
	    if (selectedCoefX != -1 && !dragging) {
		g.setColor(Color.yellow);
		y = floory - (int) (ymult * elevels[selectedCoefX][selectedCoefY]);
		g.drawLine(0, y, winSize.width, y);
	    }
	}

	if (viewX != null)
	    drawRadial(g, viewXMap, func, funci);

	if (viewP != null) {
	    genFunc(normmult, false);
	    drawRadial(g, viewPMap, pfunc, pfunci);
	}

	if (viewL != null) {
	    int lzcount = modeCountTh*lspacing;
	    calcLSpectrum();
	    for (i = 0; i != lzcount; i++)
		lzspectrum[i] = java.lang.Math.sqrt(lzspectrum[i]);
	    drawFunction(g, viewL, lzspectrum, null, lzcount, 0);
	}

	if (viewStatesMap != null) {
	    // draw frequency grid
	    int termWidth = getTermWidth();
	    int stateSize = termWidth;
	    int ss2 = termWidth/2;
	    for (i = 0; i < modeCountTh && i < maxDispPhasorsTh; i++)
		for (j = 0; j < modeCountR && j < maxDispPhasorsR; j++) {
		    x = viewStatesMap.x + i*termWidth + ss2;
		    y = viewStatesMap.y + j*termWidth + ss2;
		    boolean yel = (selectedCoefX != -1 &&
			  elevels[selectedCoefX][selectedCoefY] == elevels[i][j]);
		    g.setColor(yel ? Color.yellow :
			       (magcoef[i][j] == 0) ? gray2 : Color.white);
		    g.drawOval(x-ss2, y-ss2, stateSize, stateSize);
		    int xa = (int) (magcoef[i][j]*phasecoefcos[i][j]*ss2);
		    int ya = (int) (-magcoef[i][j]*phasecoefsin[i][j]*ss2);
		    g.drawLine(x, y, x+xa, y+ya);
		    g.drawLine(x+xa-1, y+ya, x+xa+1, y+ya);
		    g.drawLine(x+xa, y+ya-1, x+xa, y+ya+1);
		}
	    g.setColor(Color.white);
	}

	if (selectedCoefX != -1) {
	    g.setColor(Color.yellow);
	    int m = (selectedCoefX+1)/2;
	    if ((selectedCoefX & 1) != 0)
		m = -m;
	    if (viewStatesMap != null && viewX != null)
		centerString(g, "nr = " + selectedCoefY + ", m = " + m,
			     viewX.y+viewX.height-10);
	    if (viewL != null) {
		int lzcount = modeCountTh*lspacing; // XXX
		int mx = m * lspacing + lzcount/2;
		x = viewL.width*mx/(lzcount-1);
		g.drawLine(x, viewL.y, x, viewL.y+viewL.height);
	    }
	}

	realg.drawImage(dbimage, 0, 0, this);
	if (dragStop)
	    allQuiet = true;
	if (!stoppedCheck.getState() && !allQuiet)
	    cv.repaint(pause);
 }

 void drawRadial(Graphics g, View view, double fr[][], double fi[][]) {
	int rcol = 0x00010000;
	int gcol = 0x00000100;
	int cx = view.width/2;
	int cy = view.height/2;
	int cr = view.width/2;
	int x, y;
	double mx = 0;
	double expectx = 0, expectx2 = 0;
	double expecty = 0, expecty2 = 0;
	double tot = 0;
	for (y = 0; y <= sampleCountR; y++) {
	    for (x = 0; x != sampleCountTh; x++) {
		double ar = fr[x][y];
		double ai = fi[x][y];
		double fv = (ar*ar+ai*ai);
		double xv = y*angle1CosTab[x];
		double yv = y*angle1SinTab[x];
		expectx += fv*y*xv;
		expecty += fv*y*yv;
		expectx2 += fv*y*xv*xv;
		expecty2 += fv*y*yv*yv;
		tot += fv*y;
		if (magPhaseCheckItem.isSelected())
		    fv = java.lang.Math.sqrt(fv);
		if (fv > mx)
		    mx = fv;
	    }
	}
	expectx /= tot;
	expecty /= tot;
	expectx2 /= tot;
	expecty2 /= tot;
	double mult = 255*brightmult/mx;
	double rscale = -cr/(double) sampleCountR;
	for (y = 0; y != sampleCountR; y++) {
	    double r1 = rscale*y;
	    double r2 = rscale*(y+1);
	    xpoints[0] = (int) (cx+r1);
	    ypoints[0] = cy;
	    xpoints[3] = (int) (cx+r2);
	    ypoints[3] = cy;
	    for (x = 0; x != sampleCountTh; x++) {
		double ar = fr[x][y];
		double ai = fi[x][y];
		double fv = (ar*ar+ai*ai);
		if (magPhaseCheckItem.isSelected())
		    fv = java.lang.Math.sqrt(fv);
		fv *= mult;
		PhaseColor c = getPhaseColor(ar, ai);
		if (fv > 255)
		    fv = 255;
		int clr = (int) (c.r * fv);
		int clg = (int) (c.g * fv);
		int clb = (int) (c.b * fv);
		int col = (255<<24) | (clr<<16) | (clg<<8) | clb;
		g.setColor(new Color(col));
		xpoints[1] = (int) (cx+r1*angle2CosTab[x]);
		ypoints[1] = (int) (cy-r1*angle2SinTab[x]);
		xpoints[2] = (int) (cx+r2*angle2CosTab[x]);
		ypoints[2] = (int) (cy-r2*angle2SinTab[x]);
		
		fillTriangle(view, xpoints[0], ypoints[0], xpoints[1], ypoints[1],
			     xpoints[2], ypoints[2], col);
		fillTriangle(view, xpoints[0], ypoints[0], xpoints[2], ypoints[2],
			     xpoints[3], ypoints[3], col);
		xpoints[0] = xpoints[1];
		ypoints[0] = ypoints[1];
		xpoints[3] = xpoints[2];
		ypoints[3] = ypoints[2];
	    }
	}
	if (view.imageSource != null)
	    view.imageSource.newPixels();
	g.drawImage(view.memimage, view.x, view.y, null);
	cx += view.x;
	cy += view.y;
	if (expectCheckItem.getState()) {
	    x = (int) (cx+expectx*rscale);
	    y = (int) (cy-expecty*rscale);
	    g.setColor(Color.red);
	    g.drawLine(x, view.y, x, view.y+view.height);
	    g.drawLine(view.x, y, view.x+view.width, y);
	}
	if (uncertaintyCheckItem.getState()) {
	    double uncertx = java.lang.Math.sqrt(expectx2-expectx*expectx);
	    double uncerty = java.lang.Math.sqrt(expecty2-expecty*expecty);
	    int xx1 = (int) (cx+(expectx+uncertx)*rscale);
	    int xx2 = (int) (cx+(expectx-uncertx)*rscale);
	    int yy1 = (int) (cy-(expecty-uncerty)*rscale);
	    int yy2 = (int) (cy-(expecty+uncerty)*rscale);
	    g.setColor(Color.blue);
	    g.drawRect(xx1, yy1, xx2-xx1, yy2-yy1);
	}
	g.setColor(Color.white);
	g.drawOval(view.x, view.y, view.width, view.height);
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
	return (int) (y1+((double) x-x1)*(y2-y1)/(x2-x1));
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
	    x = v.width-1;
	    if (x2 >= v.width)
		return;
	}
	if (y2 > y3) {
	    int q = y2;
	    y2 = y3; y3 = q;
	}
	// y2 < y3
	while (x != x2+dir) {
	    // XXX this could be speeded up
	    int ya = interp(x1, y1, x2, y2, x);
	    int yb = interp(x1, y1, x2, y3, x);
	    if (ya < 0)
		ya = 0;
	    if (yb >= v.height)
		yb = v.height-1;

	    int p1 = x+ya*v.width;
	    int p2 = x+yb*v.width;
	    for (; p1 <= p2; p1 += v.width)
		v.pixels[p1] = col;
	    x += dir;
	    if (x < 0 || x >= v.width)
		return;
	}
 }
 
 void drawFunction(Graphics g, View view, double fr[], double fi[],
		      int count, int offset) {
	int i;
	
	double expectx = 0;
	double expectx2 = 0;
	double maxsq = 0;
	double tot = 0;
	int zero = winSize.width/2;
	for (i = 0; i != count; i++) {
	    int x = winSize.width * i / (count-1);
	    int ii = i+offset;
	    double dr = fr[ii];
	    double di = (fi == null) ? 0 : fi[ii];
	    double dy = dr*dr+di*di;
	    if (dy > maxsq)
		maxsq = dy;
	    int dev = x-zero;
	    expectx += dy*dev;
	    expectx2 += dy*dev*dev;
	    tot += dy;
	}
	expectx /= tot;
	expectx2 /= tot;
	double maxnm = java.lang.Math.sqrt(maxsq);
	double uncert = java.lang.Math.sqrt(expectx2-expectx*expectx);
	int ox = -1, oy = 0;
	double bestscale = 0;
	if (fi != null &&
	      (probCheckItem.isSelected() || probPhaseCheckItem.isSelected()))
	    bestscale = 1/maxsq;
	else
	    bestscale = 1/maxnm;
	view.scale = bestscale;
	if (view.scale > 1e8)
	    view.scale = 1e8;
	g.setColor(Color.gray);
	int mid_x = winSize.width * (count/2) / (count-1);
	g.drawLine(mid_x, view.y, mid_x, view.y+view.height);

	int mid_y = view.lower_y;
	double mult = view.ymult2*view.scale;
	if (fi != null) {
	    g.setColor(Color.blue);
	    for (i = 0; i != count; i++) {
		int x = winSize.width * i / (count-1);
		int ii = i+offset;
		int y = mid_y - (int) (mult * fi[ii]);
		if (ox != -1)
		    g.drawLine(ox, oy, x, y);
		ox = x;
		oy = y;
	    }
	}
	g.setColor(Color.white);
	ox = -1;
	for (i = 0; i != count; i++) {
	    int x = winSize.width * i / (count-1);
	    int ii = i+offset;
	    int y = mid_y - (int) (mult * fr[ii]);
	    if (ox != -1)
		g.drawLine(ox, oy, x, y);
	    ox = x;
	    oy = y;
	}

	if (maxsq > 0) {
	    expectx += zero;
	    if (uncertaintyCheckItem.getState()) {
		g.setColor(Color.blue);
		g.drawLine((int) (expectx-uncert), view.y,
			   (int) (expectx-uncert), view.y+view.height);
		g.drawLine((int) (expectx+uncert), view.y,
			   (int) (expectx+uncert), view.y+view.height);
	    }
	    if (expectCheckItem.getState()) {
		g.setColor(Color.red);
		g.drawLine((int) expectx, view.y,
			   (int) expectx, view.y+view.height);
	    }
	}
 }

 Color computeColor(int x, int y, double c) {
	double h = func[x][y];
	if (!colorCheck.getState()) {
	    h = 0;
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
	double grayness = (1-(redness+grnness))*c;
	double gray = .6;
	return new Color((int) ((c*redness+gray*grayness)*255),
			 (int) ((c*grnness+gray*grayness)*255),
			 (int) ((gray*grayness)*255));
 }

 void genFunc(double normmult, boolean do_x) {
	int i, j, th, r;
	int wc = sampleCountTh*2;
	int wm = wc - 1;

	double states[][][] = (do_x) ? xStates : pStates;
	double outr[][] = (do_x) ? func : pfunc;
	double outi[][] = (do_x) ? funci : pfunci;

	// step through each value of r and use inverse fft to calculate
	// values for all theta
	for (r = 0; r <= sampleCountR; r++) {
	    for (i = 0; i != wc; i++)
		xformbuf[i] = 0;

	    // calculate contribution from modes with m=0
	    double d0r = 0;
	    double d0i = 0;
	    for (j = 0; j != modeCountR; j++) {
		d0r += states[0][j][r]*magcoef[0][j]*phasecoefcos[0][j];
		d0i += states[0][j][r]*magcoef[0][j]*phasecoefsin[0][j];
	    }
	    xformbuf[0] = d0r;
	    xformbuf[1] = d0i;

	    // calculate contributions from modes with m>0
	    for (i = 1; i < modeCountTh; i += 2) {
		double d1r = 0, d2r = 0, d1i = 0, d2i = 0;
		int ii = (i+1)/2;
		for (j = 0; j != modeCountR; j++) {
		    d1r += states[ii][j][r]*magcoef[i][j]*
			phasecoefcos[i][j];
		    d1i += states[ii][j][r]*magcoef[i][j]*
			phasecoefsin[i][j];
		    d2r += states[ii][j][r]*magcoef[i+1][j]*
			phasecoefcos[i+1][j];
		    d2i += states[ii][j][r]*magcoef[i+1][j]*
			phasecoefsin[i+1][j];
		}
		if (!do_x) {
		    double adj = pi/2 * ii;
		    double acos = java.lang.Math.cos(adj);
		    double asin = java.lang.Math.sin(adj);
		    double q1 = d1r;
		    double q2 = d1i;
		    d1r = q1 * acos + q2 * asin;
		    d1i = -q1 * asin + q2 * acos;
		    q1 = d2r;
		    q2 = d2i;
		    d2r = q1 * acos + q2 * asin;
		    d2i = -q1 * asin + q2 * acos;
		}
		xformbuf[ii*2]   = d2r;
		xformbuf[ii*2+1] = d2i;
		xformbuf[wm & (wc-ii*2)]   = d1r;
		xformbuf[wm & (wc-ii*2+1)] = d1i;
	    }

	    // take fft
	    fftTh.transform(xformbuf);

	    for (i = 0; i != sampleCountTh; i++) {
		outr[i][r] = xformbuf[i*2]  *normmult;
		outi[i][r] = xformbuf[i*2+1]*normmult;
	    }
	    outr[sampleCountTh][r] = outr[0][r];
	    outi[sampleCountTh][r] = outi[0][r];
	}
 }

 PhaseColor getPhaseColor(double x, double y) {
	int sector = 0;
	double val = 0;
	if (probCheckItem.isSelected())
	    return whitePhaseColor;
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

 int getTermWidth() {
	int termWidth1 = viewStatesMap.width / min(modeCountTh, maxDispPhasorsTh);
	int termWidth2 = viewStatesMap.height / min(modeCountR, maxDispPhasorsR);
	return (termWidth1 < termWidth2) ? termWidth1 : termWidth2;
 }

 void edit(MouseEvent e) {
	if (selection == SEL_NONE)
	    return;
	int x = e.getX();
	int y = e.getY();
	switch (selection) {
	case SEL_HANDLE:  editHandle(y);   break;
	case SEL_STATES:  editMag(x, y);   break;
	case SEL_POTENTIAL:
	    findStateByEnergy(y);
	    enterSelectedState();
	    break;
	case SEL_X:       editX(x, y);  break;
	case SEL_L:       editL(x, y);  break;
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

 void editMag(int x, int y) {
	if (selectedCoefX == -1)
	    return;
	int stateSize = getTermWidth(); // XXX
	int ss2 = stateSize/2;
	int x0 = stateSize*selectedCoefX+ss2 + viewStatesMap.x;
	int y0 = stateSize*selectedCoefY+ss2 + viewStatesMap.y;
	x -= x0;
	y -= y0;
	double mag = java.lang.Math.sqrt(x*x+y*y)/ss2;
	double ang = java.lang.Math.atan2(-y, x);
	double ang0 = (-elevels[selectedCoefX][selectedCoefY]*t) % (2*pi);
	if (mag > 10)
	    mag = 0;
	if (mag > 1)
	    mag = 1;
	magcoef[selectedCoefX][selectedCoefY] = mag;
	phasecoefadj[selectedCoefX][selectedCoefY] = (ang-ang0) % (2*pi);
	if (phasecoefadj[selectedCoefX][selectedCoefY] > pi)
	    phasecoefadj[selectedCoefX][selectedCoefY] -= 2*pi;
	if (alwaysNormItem.getState())
	    normalize();
	cv.repaint(pause);
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
 }

 void editX(int x, int y) {
	switch (mouseChooser.getSelectedIndex()) {
	case MOUSE_GAUSS:
	    editXGauss(x, y);
	    return;
	case MOUSE_GAUSSP:
	    editXGaussP(x, y);
	    return;
	case MOUSE_ROTATE:
	    editRotate(x, y);
	    return;
	}
 }

 void editL(int x, int y) {
	int xi = x * modeCountTh / winSize.width;
	int m = xi - modeCountTh/2;
	int r, th;
	for (r = 0; r <= sampleCountR; r++)
	    for (th = 0; th <= sampleCountTh; th++) {
		if (r == 0 && m != 0)
		    func[th][0] = funci[th][0] = 0;
		else {
		    double thr = th*2*pi/sampleCountTh;
		    func [th][r] = java.lang.Math.cos(thr*m);
		    funci[th][r] = java.lang.Math.sin(thr*m);
		}
	    }
	transform();
	cv.repaint(pause);
 }

 double lastGaussWx = -8, lastGaussWy = -8;

 void editXGauss(int x, int y) {
	int i, j;
	int gx = x-dragX + 8;
	int gy = y-dragY + 8;
	double wx = 1/(abs(gx)+.0001);
	double wy = 1/(abs(gy)+.0001);
	wx = -wx*wx*2000;
	wy = -wy*wy*2000;
	lastGaussWx = wx;
	lastGaussWy = wy;
	for (x = 0; x != sampleCountR; x++) {
	    for (y = 0; y != sampleCountTh; y++) {
		double th = y*2*pi/sampleCountTh;
		double xx = -java.lang.Math.cos(th)*x/sampleCountR
		    - selectedGridX;
		double yy = -java.lang.Math.sin(th)*x/sampleCountR
		    - selectedGridY;
		double rfunc = java.lang.Math.exp(wx*xx*xx +
						  wy*yy*yy);
		func[y][x] = rfunc;
		funci[y][x] = 0;
	    }
	}
	transform();
	cv.repaint(pause);
 }

 void editXGaussP(int x, int y) {
	int i, j;
	double wx = lastGaussWx;
	double wy = lastGaussWy;
	double momentumX = (x-dragX) * .1;
	double momentumY = -(y-dragY) * .1;
	for (x = 0; x != sampleCountR; x++) {
	    for (y = 0; y != sampleCountTh; y++) {
		double th = y*2*pi/sampleCountTh;
		double xx = -java.lang.Math.cos(th)*x/sampleCountR
		    - selectedGridX;
		double yy = -java.lang.Math.sin(th)*x/sampleCountR
		    - selectedGridY;
		double cx = java.lang.Math.cos(momentumX*xx);
		double cy = java.lang.Math.cos(momentumY*yy);
		double sx = java.lang.Math.sin(momentumX*xx);
		double sy = java.lang.Math.sin(momentumY*yy);
		double rfunc = java.lang.Math.exp(wx*xx*xx +
						  wy*yy*yy);
		func[y][x] = rfunc*(cx*cy - sx*sy);
		funci[y][x] = rfunc*(cx*sy + cy*sx);
	    }
	}
	transform();
	cv.repaint(pause);
 }

 void editRotate(int x, int y) {
	int cx = viewXMap.x + viewXMap.width/2;
	int cy = viewXMap.y + viewXMap.height/2;
	double angle1 = java.lang.Math.atan2(-(dragY-cy), dragX-cx);
	double angle2 = java.lang.Math.atan2(-(y-cy), x-cx);
	double ad = angle2-angle1;
	int i, j;
	for (i = 1; i < modeCountTh; i++)
	    for (j = 0; j < modeCountR; j++) {
		int m = (i+1)/2;
		if ((i % 2) == 0)
		    m = -m;
		phasecoefadj[i][j] += ad*m;
	    }
	dragX = x;
	dragY = y;
	cv.repaint(pause);
 }

 void transform() {
	t = 0;
	int i, j;

	// zero out arrays.  phasecoefcos and phasecoefsin are
	// the real and imaginary parts of the state coefficients.
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		phasecoefcos[i][j] = phasecoefsin[i][j] = 0;

	int r, th;

	// integrate the function func[][] with each mode times r (since the
	// modes are only orthogonal with a weighting function of r) and also
	// integrate each mode with itself times r to get the norm.
	for (r = 0; r <= sampleCountR; r++) {
	    // fft each set of samples at constant r
	    for (th = 0; th != sampleCountTh*2; th++)
		xformbuf[th] = 0;
	    for (th = 0; th != sampleCountTh; th++) {
		xformbuf[th*2] = func[th][r]*r;
		xformbuf[th*2+1] = funci[th][r]*r;
	    }
	    fftTh.transform(xformbuf);

	    // perform integration step for each m=0 mode
	    for (j = 0; j != modeCountR; j++) {
		phasecoefcos[0][j] += xStates[0][j][r]*xformbuf[0];
		phasecoefsin[0][j] += xStates[0][j][r]*xformbuf[1];
	    }

	    // perform integration step with each m>0 mode
	    int wc = sampleCountTh*2;
	    int wm = wc - 1;
	    for (i = 1; i < modeCountTh; i += 2) {
		for (j = 0; j != modeCountR; j++) {
		    int ii = i+1;
		    int m = ii/2;
		    phasecoefcos[i][j] += xStates[m][j][r]*
			xformbuf[ii];
		    phasecoefsin[i][j] += xStates[m][j][r]*
			xformbuf[ii+1];

		    phasecoefcos[i+1][j] += xStates[m][j][r]*
			xformbuf[wm & -ii];
		    phasecoefsin[i+1][j] += xStates[m][j][r]*
			xformbuf[wm & (-ii+1)];
		}
	    }
	}

	// finish up by dividing out the norms and moving the results
	// to magcoef and phasecoefadj
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++) {
		double a = phasecoefcos[i][j];
		double b = phasecoefsin[i][j];
		if (a < epsilon && a > -epsilon) a = 0;
		if (b < epsilon && b > -epsilon) b = 0;
		magcoef[i][j] = java.lang.Math.sqrt(a*a+b*b);
		phasecoefadj[i][j] = java.lang.Math.atan2(b, a);
	    }
	if (alwaysNormItem.getState())
	    normalize();
	else if (alwaysMaxItem.getState())
	    maximize();
 }

 int sign(int x) {
	return (x < 0) ? -1 : (x == 0) ? 0 : 1;
 }
 
 int abs(int x) {
	return x < 0 ? -x : x;
 }

 public void componentHidden(ComponentEvent e){}
 public void componentMoved(ComponentEvent e){}
 public void componentShown(ComponentEvent e) {
	cv.repaint(pause);
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
	if (e.getSource() == groundButton)
	    doGround();
	if (e.getSource() == blankButton)
	    doBlank();
	if (e.getSource() == normalizeButton)
	    normalize();
	if (e.getSource() == maximizeButton)
	    maximize();
	if (e.getSource() == measureEItem)
	    measureE();
	if (e.getSource() == measureLItem)
	    measureL();
 }

 public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == resBar) {
	    if (resBar.getValue() != modeCountR)
		setResolution();
	}
	if (e.getSource() == pZoomBar)
	    calcPStates();
	if (e.getSource() == phasorBar) {
	    maxDispPhasorsR = phasorBar.getValue();
	    maxDispPhasorsTh = maxDispPhasorsR*2+1;
	}
	cv.repaint(pause);
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
	int oldCountR  = modeCountR;
	// calculate number of samples in R and theta directions.
	// number of theta samples must be power of 2 (for fft)
	modeCountR = sampleCountR = resBar.getValue();
	sampleCountR *= 4;
	int sth = resBar.getValue() * 2;
	sampleCountTh = 1;
	while (sampleCountTh < sth)
	    sampleCountTh *= 2;
	modeCountTh = sampleCountTh+1;
	modeCountM = sampleCountTh/2 + 1;
	sampleCountTh *= 2;
	fftTh = new FFT(sampleCountTh);
	double oldmagcoef[][] = magcoef;
	magcoef = new double[modeCountTh][modeCountR];
	phasecoef = new double[modeCountTh][modeCountR];
	phasecoefcos = new double[modeCountTh][modeCountR];
	phasecoefsin = new double[modeCountTh][modeCountR];
	phasecoefadj = new double[modeCountTh][modeCountR];
	xformbuf = new double[sampleCountTh*2];
	func  = new double[sampleCountTh+1][sampleCountR+1];
	funci = new double[sampleCountTh+1][sampleCountR+1];
	pfunc  = new double[sampleCountTh+1][sampleCountR+1];
	pfunci = new double[sampleCountTh+1][sampleCountR+1];
	lzspectrum = null;
	System.out.print("grid: " + sampleCountTh + " " + 
			 sampleCountR + " " + 
			 sampleCountTh * sampleCountR + "\n");
	scaleHeight = 6;
	step = pi/sampleCountTh;
	viewDistance = 50;
	int m, n;
	elevels = new double[modeCountTh][modeCountR];
	double angstep = step*2;
	// m = angular modes
	// n = radial modes
	System.out.print("calc omegas...\n");
	for (m = 0; m != modeCountTh; m++)
	    for (n = 0; n != modeCountR; n++) {
		int realm = (m+1)/2;
		elevels[m][n] = zeroj(realm, n+1)/sampleCountR;
	    }
	System.out.print("calc omegas...done\n");
	double jj[] = new double[modeCountM+1];
	int x, y;
	// x = th, y = r
	xStates = new double[modeCountM][modeCountR][sampleCountR+1];
	System.out.print("calc modes...\n");
	for (m = 0; m != modeCountM; m++) {
	    for (n = 0; n != modeCountR; n++) {
		double max = 0;
		double nm = 0;
		for (y = 0; y <= sampleCountR; y++) {
		    // work around bess() bug at x=0
		    if (y == 0)
			jj[m+1] = (m == 0) ? 1 : 0;
		    else
			bess(m, y*elevels[m*2][n], jj);
		    double q = xStates[m][n][y] = jj[m+1];
		    if (q > max)
			max = q;
		    if (q < -max)
			max = -q;
		    nm += q*q*y;
		}
		nm = java.lang.Math.sqrt(nm);
		for (y = 0; y <= sampleCountR; y++)
		    xStates[m][n][y] /= nm;
	    }
	}

	double mult = .01/(elevels[0][0]*elevels[0][0]);
	int i, j;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		elevels[i][j] *= elevels[i][j]*mult;
	System.out.print("calc modes...done\n");

	if (oldmagcoef != null) {
	    for (i = 0; i != oldCountTh && i != modeCountTh; i++)
		for (j = 0; j != oldCountR && j != modeCountR; j++)
		    magcoef[i][j] = oldmagcoef[i][j];
	}
	
	pZoomBarValue = -1;
	calcPStates();

	angle1SinTab = new double[sampleCountTh+1];
	angle1CosTab = new double[sampleCountTh+1];
	angle2SinTab = new double[sampleCountTh+1];
	angle2CosTab = new double[sampleCountTh+1];
	for (i = 0; i <= sampleCountTh; i++) {
	    double th1 = 2*pi*i/sampleCountTh;
	    double th2 = 2*pi*(i+1)/sampleCountTh + .001;
	    angle1SinTab[i] = java.lang.Math.sin(th1);
	    angle1CosTab[i] = java.lang.Math.cos(th1);
	    angle2SinTab[i] = java.lang.Math.sin(th2);
	    angle2CosTab[i] = java.lang.Math.cos(th2);
	}
 }
 
 void calcPStates() {
	if (pZoomBar.getValue() == pZoomBarValue)
	    return;
	pZoomBarValue = pZoomBar.getValue();
	double pmult = pZoomBar.getValue() / (5.*sampleCountR);
	double jj[] = new double[modeCountM+1];
	double jz[] = new double[modeCountM+1];
	int i, j, x, y, realm;
	System.out.print("calc pstates\n");
	pStates = new double[modeCountM][modeCountR][sampleCountR+1];
	for (realm = 0; realm != modeCountM; realm++) {
	    int bessm = (realm == 0) ? 1 : realm;
	    for (j = 0; j != modeCountR; j++) {
		double z0 = zeroj(realm, j+1);
		bess(bessm, z0, jz);
		jz[0] = -jz[2];
		for (x = 0; x != sampleCountR; x++) {
		    // work around bess() bug at x=0
		    double x0 = pmult*x;
		    if (x == 0) {
			if (realm == 0) {
			    jj[1] = 1;
			    jj[0] = 0;
			} else {
			    jj[realm+1] = 0;
			    jj[realm]   = (realm == 1) ? 1 : 0;
			}
		    } else {
			// calculate bessel functions of order 0
			// through bessm and store in jj[1..bessm+1].
			bess(bessm, x0, jj);
			// We store J(-1, x) in jj[0].  It's just -J(1, x)
			jj[0] = -jj[2];
		    }
		    pStates[realm][j][x] =
			(z0*jz[realm]*jj[realm+1])/(x0*x0-z0*z0);
		}
	    }
	}
	System.out.print("calc pstates, done\n");
 }

 // this routine not tested for m_order > 64 or n_zero > 34 !!
 double zeroj( int m_order, int n_zero) {
	// Zeros of the Bessel function J(x)
	// Inputs
	//   m_order   Order of the Bessel function
	//   n_zero    Index of the zero (first, second, etc.)
	// Output
	//   z         The "n_zero"th zero of the Bessel function

	if (m_order >= 48 && n_zero == 1) {
	    switch (m_order) {
	    case 48: return 55.0283;
	    case 49: return 56.0729;
	    case 50: return 57.1169;
	    case 51: return 58.1603;
	    case 52: return 59.2032;
	    case 53: return 60.2456;
	    case 54: return 61.2875;
	    case 55: return 62.3288;
	    case 56: return 63.3697;
	    case 57: return 64.4102;
	    case 58: return 65.4501;
	    case 59: return 66.4897;
	    case 60: return 67.5288;
	    case 61: return 68.5675;
	    case 62: return 69.6058;
	    case 63: return 70.6437;
	    case 64: return 71.6812;
	    }
	}
	if (m_order >= 62 && n_zero == 2) {
	    switch (m_order) {
	    case 62: return 75.6376;
	    case 63: return 76.7021;
	    case 64: return 77.7659;
	    }
	}

	//* Use asymtotic formula for initial guess
	double beta = (n_zero + 0.5*m_order - 0.25)*(3.141592654);
	double mu = 4*m_order*m_order;
	double beta8 = 8*beta;
	double beta82 = beta8*beta8;
	double beta84 = beta82*beta82;
	double z = beta - (mu-1)/beta8 
	    - 4*(mu-1)*(7*mu-31)/(3*beta82*beta8);
	z -= 32*(mu-1)*(83*mu*mu-982*mu+3779)/(15*beta84*beta8);
	z -= 64*(mu-1)*(6949*mu*mu*mu-153855*mu*mu+1585743*mu-6277237)/
	    (105*beta84*beta82*beta8);
	
	//* Use Newton's method to locate the root
	double jj[] = new double[m_order+3];
	int i;  double deriv;
	for( i=1; i<=5; i++ ) {
	    bess( m_order+1, z, jj );  // Remember j(1) is J_0(z)     
	    // Use the recursion relation to evaluate derivative
	    deriv = -jj[m_order+2] + m_order/z * jj[m_order+1];
	    z -= jj[m_order+1]/deriv;  // Newton's root finding  
	}
	return(z);
 }
 
 void bess( int m_max, double x, double jj[] ) {
	// Bessel function
	// Inputs
	//    m_max  Largest desired order
	//    x = Value at which Bessel function J(x) is evaluated
	// Output
	//    jj = Vector of J(x) for order m = 0, 1, ..., m_max
	
	//* Perform downward recursion from initial guess
	int maxmx = (m_max > x) ? m_max : ((int)x);  // Max(m,x)
	// Recursion is downward from m_top (which is even)
	int m_top = 2*((int)( (maxmx+15)/2 + 1 ));   
	double j[] = new double[m_top+2];
	j[m_top+1] = 0.0;
	j[m_top] = 1.0;
	double tinyNumber = 1e-16;
	int m;
	for( m=m_top-2; m>=0; m--)       // Downward recursion
	    j[m+1] = 2*(m+1)/(x+tinyNumber)*j[m+2] - j[m+3];
	
	//* Normalize using identity and return requested values
	double norm = j[1];        // NOTE: Be careful, m=0,1,... but
	for( m=2; m<=m_top; m+=2 ) // vector goes j(1),j(2),...
	    norm += 2*j[m+1];
	for( m=0; m<=m_max; m++ )  // Send back only the values for
	    jj[m+1] = j[m+1]/norm;   // m=0,...,m_max and discard values
 }                            // for m=m_max+1,...,m_top

 void findGridPoint2D(View v, int mx, int my) {
	int cx = v.x + v.width/2;
	int cy = v.y + v.height/2;
	int cr = v.width/2;
	selectedGridX = (mx-cx)/(double) cr;
	selectedGridY = -(my-cy)/(double) cr;
	double r = java.lang.Math.sqrt(selectedGridX*selectedGridX +
				       selectedGridY*selectedGridY);
	if (r > 1) {
	    selectedGridX /= r;
	    selectedGridY /= r;
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
	dragX = x; dragY = y;
	int panelHeight = getPanelHeight();
	int oldCoefX = selectedCoefX;
	int oldCoefY = selectedCoefY;
	selectedCoefX = -1;
	selectedCoefY = -1;
	selectedPaneHandle = -1;
	selection = 0;
	int i;
	for (i = 1; i != viewCount; i++) {
	    int dy = y-viewList[i].paneY;
	    if (dy >= -3 && dy <= 3) {
		selectedPaneHandle = i;
		selection = SEL_HANDLE;
	    }
	}
	if (viewXMap != null && viewXMap.inside(x, y))
	    selection = SEL_X;
	else if (viewPotential != null && viewPotential.contains(x, y)) {
	    selection = SEL_POTENTIAL;
	    findStateByEnergy(y);
	} else if (viewStatesMap != null && viewStatesMap.inside(x, y)) {
	    int termWidth = getTermWidth();
	    selectedCoefX = (x-viewStatesMap.x)/termWidth;
	    selectedCoefY = (y-viewStatesMap.y)/termWidth;
	    if (selectedCoefX >= modeCountTh || selectedCoefX >= maxDispPhasorsTh)
		selectedCoefX = selectedCoefY = -1;
	    if (selectedCoefY >= modeCountR || selectedCoefY >= maxDispPhasorsR)
		selectedCoefX = selectedCoefY = -1;
	    if (selectedCoefX < 0 || selectedCoefY < 0)
		selectedCoefX = selectedCoefY = -1;
	    if (selectedCoefX != -1 && selectedCoefY != -1)
		selection = SEL_STATES;
	} else if (viewL != null && viewL.contains(x, y))
	    selection = SEL_L;
	if (selectedCoefX != oldCoefX || selectedCoefY != oldCoefY)
	    cv.repaint(pause);
 }

 void findStateByEnergy(int y) {
	int i, j;
	int floory = viewPotential.y + viewPotential.height - 5;
	double ymult = 200;
	double dist = 100;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++) {
		int yy = floory - (int) (ymult * elevels[i][j]);
		double d = java.lang.Math.abs(y-yy);
		if (d < dist) {
		    dist = d;
		    selectedCoefX = i;
		    selectedCoefY = j;
		}
	    }
 }

 public void mouseClicked(MouseEvent e) {
	if (e.getClickCount() == 2 && selectedCoefX != -1)
	    enterSelectedState();
	else if (selection == SEL_STATES)
	    editMagClick();
 }

 void enterSelectedState() {
	int i, j;
	for (i = 0; i != modeCountTh; i++)
	    for (j = 0; j != modeCountR; j++)
		if (selectedCoefX != i || selectedCoefY != j)
		    magcoef[i][j] = 0;
	magcoef[selectedCoefX][selectedCoefY] = 1;
	cv.repaint(pause);
 }

 public void mouseEntered(MouseEvent e) {
 }

 public void mouseExited(MouseEvent e) {
	if (!dragging) {
	    if (selectedCoefX != -1) {
		selectedCoefX = selectedCoefY = -1;
		cv.repaint(pause);
	    }
	    if (selectedPaneHandle != -1) {
		selectedPaneHandle = -1;
		cv.repaint(pause);
	    }
	}
 }

 public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	mouseMoved(e);
	if (selection == SEL_X)
	    findGridPoint2D(viewXMap, e.getX(), e.getY());
	dragStartX = e.getX();
	dragStartY = e.getY();
	if (selectedCoefX != -1)
	    magDragStart = magcoef[selectedCoefX][selectedCoefY];
	dragging = true;
	edit(e);
 }

 public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = editingFunc = dragStop = false;
	dragSet = dragClear = false;
	mouseMoved(e);
	cv.repaint(pause);
 }

 
 private boolean finished;
 
 public void itemStateChanged(ItemEvent e) {
	 
	 if(!finished){
			return;
		}
	 
	if (e.getItemSelectable() == stoppedCheck) {
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() == xCheckItem ||
	    e.getItemSelectable() == pCheckItem ||
	    e.getItemSelectable() == lCheckItem ||
	    e.getItemSelectable() == eCheckItem ||
	    e.getItemSelectable() == statesCheckItem) {
	    handleResize();
	    cv.repaint(pause);
	}
	if (e.getItemSelectable() == alwaysNormItem &&
	    alwaysNormItem.getState()) {
	    normalize();
	    alwaysMaxItem.setState(false);
	    cv.repaint(pause);
	}
	if (e.getItemSelectable() == alwaysMaxItem &&
	    alwaysMaxItem.getState()) {
	    maximize();
	    alwaysNormItem.setState(false);
	    cv.repaint(pause);
	}
	int i;
	for (i = 0; i != waveFunctionMenu.countItems(); i++)
	    if (e.getItemSelectable() == waveFunctionMenu.getItem(i)) {
		int j;
		((CheckboxMenuItem) waveFunctionMenu.getItem(i))
		    .setState(true);
		for (j = 0; j != waveFunctionMenu.countItems(); j++)
		    if (i != j)
			((CheckboxMenuItem) waveFunctionMenu.getItem(j))
			    .setState(false);
	    }
 }

	
 class PhaseColor {
	public double r, g, b;
	PhaseColor(double rr, double gg, double bb) {
	    r = rr; g = gg; b = bb;
	}
	Color getColor() { return new Color((int) (r*255),
					    (int) (g*255),
					    (int) (b*255)); } // XXX
 }

 class View extends Rectangle {
	View() { }
	View(View v) { super(v); }
	double ymult, ymult2, scale;
	int mid_y, lower_y;
	int paneY;
	MemoryImageSource imageSource;
	Image memimage;
	int pixels[];
 }
};
