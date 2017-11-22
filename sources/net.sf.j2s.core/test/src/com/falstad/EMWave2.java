package com.falstad;

//EMWave2.java (c) 2002 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= EMWave2
//web_Description= A simulation that demonstrates magnetostatics and electrodynamics in two dimensions.
//web_JavaVersion= http://www.falstad.com/emwave2/
//web_AppletImage= emwave2.png
//web_Category= Physics - Electromagnetics
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, AWT-to-Swing


//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> a2s
//
//import java.awt [Applet, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
//Changed paint() to paintComponent() in EMWave1Canvas and EMWav1Frame
//
//Added Container main and added components to main
//
//resize and show --> useFrame options
//
//added triggerShow()
//
//Moves showFrame to applet.init()

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
import java.awt.image.BufferedImage;
import java.awt.image.MemoryImageSource;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.text.NumberFormat;
import java.util.Random;
import java.util.Vector;

import a2s.Applet;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Scrollbar;

class EMWave2Canvas extends Canvas {
 EMWave2Frame pg;
 EMWave2Canvas(EMWave2Frame p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateEMWave2(g);
 }
 public void paintComponent(Graphics g) {
	pg.updateEMWave2(g);
 }
};

class EMWave2Layout implements LayoutManager {
 public EMWave2Layout() {}
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
	int cw = targetw* 2/3;
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

public class EMWave2 extends Applet implements ComponentListener {
 static EMWave2Frame ogf;
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
     ogf = new EMWave2Frame(null);
     ogf.init();
 }

 void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new EMWave2Frame(this);
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

class EMWave2Frame extends Frame
implements ComponentListener, ActionListener, AdjustmentListener,
          MouseMotionListener, MouseListener, ItemListener {
 
 Thread engine = null;

 Dimension winSize;
 Image dbimage;
 
 Random random;
 int gridSizeX;
 int gridSizeY;
 int gridSizeXY;
 int windowWidth = 50;
 int windowHeight = 50;
 int windowOffsetX = 0;
 int windowOffsetY = 0;
 public static final int sourceRadius = 7;
 public static final double freqMult = .0233333/2;
 
 public String getAppletInfo() {
	return "EMWave2 by Paul Falstad";
 }

 Button clearButton;
 Button ClearAllButton;
 Checkbox stoppedCheck;
 Choice modeChooser;
 Choice viewChooser;
 Choice sourceChooser;
 Choice setupChooser;
 Vector setupList;
 Setup setup;
 Scrollbar speedBar;
 Scrollbar forceBar;
 Scrollbar resBar;
 Scrollbar brightnessBar;
 Scrollbar lineDensityBar;
 Scrollbar auxBar;
 Scrollbar adjustBar;
 Label auxLabel;
 Label adjustLabel;
 double forceTimeZero;
 double sourceMult;
 static final double pi = 3.14159265358979323846;
 OscElement grid[];
 int gw;
 OscSource sources[];
 static final int MODE_PERF_CONDUCTOR = 0;
 static final int MODE_GOOD_CONDUCTOR = 1;
 static final int MODE_FAIR_CONDUCTOR = 2;
 static final int MODE_J_POS = 3;
 static final int MODE_J_NEG = 4;
 static final int MODE_FERROMAG = 5;
 static final int MODE_DIAMAG = 6;
 static final int MODE_MEDIUM = 7;
 static final int MODE_M_DOWN = 8;
 static final int MODE_M_UP = 9;
 static final int MODE_M_LEFT = 10;
 static final int MODE_M_RIGHT = 11;
 static final int MODE_RESONANT = 12;
 static final int MODE_CLEAR = 13;
 static final int MODE_ADJUST = 14; // same as next one
 static final int MODE_ADJ_CONDUCT = 14;
 static final int MODE_ADJ_PERM = 15;
 static final int MODE_ADJ_J = 16;
 static final int MODE_ADJ_MEDIUM = 17;
 static final int MODE_ADJ_MAG_DIR = 18;
 static final int MODE_ADJ_MAG_STR = 19;
 static final int VIEW_E = 0;
 static final int VIEW_B = 1;
 static final int VIEW_B_LINES = 2;
 static final int VIEW_B_STRENGTH = 3;
 static final int VIEW_J = 4;
 static final int VIEW_E_B = 5;
 static final int VIEW_E_B_LINES = 6;
 static final int VIEW_E_B_J = 7;
 static final int VIEW_E_B_LINES_J = 8;
 static final int VIEW_H = 9;
 static final int VIEW_M = 10;
 static final int VIEW_TYPE = 11;
 static final int VIEW_A = 12;
 static final int VIEW_POYNTING = 13;
 static final int VIEW_ENERGY = 14;
 static final int VIEW_POYNTING_ENERGY = 15;
 static final int VIEW_FORCE = 16;
 static final int VIEW_EFF_CUR = 17;
 static final int VIEW_MAG_CHARGE = 18;
 static final int VIEW_CURL_E = 19;
 static final int VIEW_BX = 20;
 static final int VIEW_BY = 21;
 static final int VIEW_HX = 22;
 static final int VIEW_HY = 23;
 static final int VIEW_NONE = -1;
 static final int TYPE_CONDUCTOR = 1;
 static final int TYPE_DIAMAGNET = 2;
 static final int TYPE_FERROMAGNET = 3;
 static final int TYPE_MAGNET = 4;
 static final int TYPE_CURRENT = 5;
 static final int TYPE_MEDIUM = 6;
 static final int TYPE_NONE = 0;
 // this fudge factor was found by trial and error
 static final double mhmult = 12;
 int dragX, dragY;
 int selectedSource;
 int forceBarValue;
 boolean dragging;
 boolean dragClear;
 boolean dragSet;
 double t;
 int pause;
 MemoryImageSource imageSource;
 int pixels[];
 int sourceCount = -1;
 boolean sourcePlane = false;
 int sourceFreqCount = -1;
 int sourceWaveform = SWF_SIN;
 int auxFunction;
 int adjustSelectX1, adjustSelectY1, adjustSelectX2, adjustSelectY2;
 static final int mediumMax = 191;
 static final double mediumMaxIndex = .5;
 static final int SWF_SIN = 0;
 static final int SWF_PACKET = 1;
 static final int AUX_NONE = 0;
 static final int AUX_PHASE = 1;
 static final int AUX_FREQ = 2;
 static final int AUX_SPEED = 3;
 static final int SRC_NONE = 0;
 static final int SRC_1S1F = 1;
 static final int SRC_2S1F = 3;
 static final int SRC_2S2F = 4;
 static final int SRC_4S1F = 6;
 static final int SRC_1S1F_PACKET = 7;
 static final int SRC_1S1F_PLANE = 8;
 static final int SRC_2S1F_PLANE = 10;
 static final int SRC_1S1F_PLANE_PACKET = 12;
 boolean showControls;
 public boolean useFrame;

 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 EMWave2Canvas cv;
 EMWave2 applet;

 EMWave2Frame(EMWave2 a) {
	super("TM Electrodynamics Applet v1.4b");
	applet = a;
	useFrame = true;
	showControls = true;
 }

 boolean useBufferedImage = false;
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
	    useBufferedImage = true;
	
	setupList = new Vector();
	Setup s = new SingleSourceSetup();
	int i = 0;
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	    if (i++ > 300) {
		System.out.print("setup loop?\n");
		return;
	    }
	}
	String os = System.getProperty("os.name");

	sources = new OscSource[4];
	main.setLayout(new EMWave2Layout());
	cv = new EMWave2Canvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);

	setupChooser = new Choice();
	for (i = 0; i != setupList.size(); i++)
	    setupChooser.add("Setup: " +
			     ((Setup) setupList.elementAt(i)).getName());
	setup = (Setup) setupList.elementAt(0);
	setupChooser.addItemListener(this);
	main.add(setupChooser);

	sourceChooser = new Choice();
	sourceChooser.add("No Sources");
	sourceChooser.add("1 Src, 1 Freq");
	sourceChooser.add("1 Src, 2 Freq");
	sourceChooser.add("2 Src, 1 Freq");
	sourceChooser.add("2 Src, 2 Freq");
	sourceChooser.add("3 Src, 1 Freq");
	sourceChooser.add("4 Src, 1 Freq");
	sourceChooser.add("1 Src, 1 Freq (Packet)");
	sourceChooser.add("1 Plane Src, 1 Freq");
	sourceChooser.add("1 Plane Src, 2 Freq");
	sourceChooser.add("2 Plane Src, 1 Freq");
	sourceChooser.add("2 Plane Src, 2 Freq");
	sourceChooser.add("1 Plane 1 Freq (Packet)");
	sourceChooser.select(SRC_1S1F);
	sourceChooser.addItemListener(this);
	main.add(sourceChooser);

	modeChooser = new Choice();
	modeChooser.add("Mouse = Add Perf. Conductor");
	modeChooser.add("Mouse = Add Good Conductor");
	modeChooser.add("Mouse = Add Fair Conductor");
	modeChooser.add("Mouse = Add Current (+)");
	modeChooser.add("Mouse = Add Current (-)");
	modeChooser.add("Mouse = Add Ferromagnet");
	modeChooser.add("Mouse = Add Diamagnet");
	modeChooser.add("Mouse = Add Dielectric");
	modeChooser.add("Mouse = Add Magnet (Down)");
	modeChooser.add("Mouse = Add Magnet (Up)");
	modeChooser.add("Mouse = Add Magnet (Left)");
	modeChooser.add("Mouse = Add Magnet (Right)");
	modeChooser.add("Mouse = Add Resonant Medium");
	modeChooser.add("Mouse = Clear");
	modeChooser.add("Mouse = Adjust Conductivity");
	modeChooser.add("Mouse = Adjust Permeability");
	modeChooser.add("Mouse = Adjust Current");
	modeChooser.add("Mouse = Adjust Dielectric");
	modeChooser.add("Mouse = Adjust Mag Dir");
	modeChooser.add("Mouse = Adjust Mag Strength");
	modeChooser.addItemListener(this);
	main.add(modeChooser);

	viewChooser = new Choice();
	viewChooser.add("Show Electric Field (E)");
	viewChooser.add("Show Magnetic Field (B)");
	viewChooser.add("Show B Lines");
	viewChooser.add("Show B Strength");
	viewChooser.add("Show Current (j)");
	viewChooser.add("Show E/B");
	viewChooser.add("Show E/B lines");
	viewChooser.add("Show E/B/j");
	viewChooser.add("Show E/B lines/j");
	viewChooser.add("Show Mag. Intensity (H)");
	viewChooser.add("Show Magnetization (M)");
	viewChooser.add("Show Material Type");
	viewChooser.add("Show Vec. Potential");
	viewChooser.add("Show Poynting Vector");
	viewChooser.add("Show Energy Density");
	viewChooser.add("Show Poynting/Energy");
	viewChooser.add("Show Force");
	viewChooser.add("Show Effective Current");
	viewChooser.add("Show Magnetic Charge");
	viewChooser.add("Show Curl E");
	viewChooser.add("Show Bx");
	viewChooser.add("Show By");
	viewChooser.add("Show Hx");
	viewChooser.add("Show Hy");
	viewChooser.addItemListener(this);
	main.add(viewChooser);
	viewChooser.select(VIEW_E_B_J);

	main.add(clearButton = new Button("Clear Fields"));
	clearButton.addActionListener(this);
	main.add(ClearAllButton = new Button("Clear All"));
	ClearAllButton.addActionListener(this);
	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	main.add(stoppedCheck);
	
	main.add(new Label("Simulation Speed", Label.CENTER));
	main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 180, 1, 1, 2000));
	speedBar.addAdjustmentListener(this);

	main.add(new Label("Resolution", Label.CENTER));
	main.add(resBar = new Scrollbar(Scrollbar.HORIZONTAL, 40, 5, 16, 140));
	resBar.addAdjustmentListener(this);
	setResolution();

	main.add(new Label("Source Frequency", Label.CENTER));
	main.add(forceBar = new Scrollbar(Scrollbar.HORIZONTAL,
				     forceBarValue = 10, 1, 1, 40));
	forceBar.addAdjustmentListener(this);

	main.add(new Label("Brightness", Label.CENTER));
	main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    10, 1, 1, 2000));
	brightnessBar.addAdjustmentListener(this);

	main.add(new Label("Line Density", Label.CENTER));
	main.add(lineDensityBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    50, 1, 10, 100));
	lineDensityBar.addAdjustmentListener(this);

	main.add(auxLabel = new Label("", Label.CENTER));
	main.add(auxBar = new Scrollbar(Scrollbar.HORIZONTAL, 1, 1, 1, 40));
	auxBar.addAdjustmentListener(this);

	main.add(adjustLabel = new Label("", Label.CENTER));
	main.add(adjustBar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 1, 0, 102));
	adjustBar.addAdjustmentListener(this);

	main.add(new Label("http://www.falstad.com"));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	random = new Random();
	reinit();
	setup = (Setup) setupList.elementAt(0);
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
	setModeChooser();
	
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
//	resize(660, 500);
//	handleResize();
//	Dimension x = getSize();
//	Dimension screen = getToolkit().getScreenSize();
//	setLocation((screen.width  - x.width)/2,
//		    (screen.height - x.height)/2);
//	show();
 }

 void reinit() {
	sourceCount = -1;
	adjustSelectX1 = -1;
	grid = new OscElement[gridSizeXY];
	int i;
	for (i = 0; i != gridSizeXY; i++)
	    grid[i] = new OscElement();
	doSetup();
 }
 
 void setDamping() {
	int i, j;
	for (i = 0; i != gridSizeXY; i++) {
	    grid[i].damp = 1;
	    // need this to avoid reflections in Dielectric setup
	    if (grid[i].medium > 0)
		grid[i].damp = .99;
	}
	for (i = 0; i != windowOffsetX; i++)
	    for (j = 0; j != gridSizeX; j++) {
		double da = Math.exp(-(windowOffsetX-i)*.002);
		grid[i+j*gw].damp = grid[gridSizeX-1-i+gw*j].damp =
		    grid[j+i*gw].damp = grid[j+gw*(gridSizeY-1-i)].damp = da;
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
	pixels = null;
	if (useBufferedImage) {
	    try {
		/* simulate the following code using reflection:
		   dbimage = new BufferedImage(d.width, d.height,
		   BufferedImage.TYPE_INT_RGB);
		   DataBuffer db = (DataBuffer)(((BufferedImage)dbimage).
		   getRaster().getDataBuffer());
		   DataBufferInt dbi = (DataBufferInt) db;
		   pixels = dbi.getData();
		*/
		Class biclass = Class.forName("java.awt.image.BufferedImage");
		Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
		Class rasclass = Class.forName("java.awt.image.Raster");
		Constructor cstr = biclass.getConstructor(
		    new Class[] { int.class, int.class, int.class });
		dbimage = (Image) cstr.newInstance(new Object[] {
		    new Integer(d.width), new Integer(d.height),
		    new Integer(BufferedImage.TYPE_INT_RGB)});
		Method m = biclass.getMethod("getRaster", null);
		Object ras = m.invoke(dbimage, null);
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
	    pixels = new int[d.width*d.height];
	    int i;
	    for (i = 0; i != d.width*d.height; i++)
		pixels[i] = 0xFF000000;
	    imageSource = new MemoryImageSource(d.width, d.height, pixels, 0,
						d.width);
	    imageSource.setAnimated(true);
	    imageSource.setFullBufferUpdates(true);
	    dbimage = cv.createImage(imageSource);
	}
 }

 public boolean handleEvent(Event ev) {
     if (ev.id == Event.WINDOW_DESTROY) {
         applet.destroyFrame();
         return true;
     }
     return super.handleEvent(ev);
 }
 
 void doClear() {
	int x, y;
	// I set all the elements in the grid to 1e-10 instead of 0 because
	// if I set them to zero, then the simulation slows down for a
	// short time until the grid fills up again.  Don't ask me why!
	// I don't know.  This showed up when I started using floats
	// instead of doubles.
	for (x = 0; x < gridSizeXY; x++) {
	    grid[x].az = grid[x].dazdt = 1e-10;
	    grid[x].epos = 0;
	    if (grid[x].resonant)
		grid[x].jz = 0;
	}
	t = 0;
	doFilter();
 }

 void doClearAll() {
	int x, y;
	for (x = 0; x < gridSizeXY; x++) {
	    OscElement oe = grid[x];
	    oe.jz = 0;
	    oe.az = oe.dazdt = 1e-10f;
	    oe.boundary = false;
	    oe.gray = false;
	    oe.resonant = false;
	    oe.conductivity = 0;
	    oe.perm = 1;
	    oe.medium = 0;
	    oe.mx = oe.my = 0;
	    oe.epos = 0;
	}
	setDamping();
	sourceChooser.select(SRC_NONE);
	setSources();
 }

 void calcBoundaries() {
	int x, y;
	int bound = 0;
	// if walls are in place on border, need to extend that through
	// hidden area to avoid "leaks"
	for (x = 0; x < gridSizeX; x++)
	    for (y = 0; y < windowOffsetY; y++) {
		grid[x+gw*y].conductivity = grid[x+gw*windowOffsetY].conductivity;
		grid[x+gw*(gridSizeY-y-1)].conductivity =
		    grid[x+gw*(gridSizeY-windowOffsetY-1)].conductivity;
	    }
	for (y = 0; y < gridSizeY; y++)
	    for (x = 0; x < windowOffsetX; x++) {
		grid[x+gw*y].conductivity = grid[windowOffsetX+gw*y].conductivity;
		grid[gridSizeX-x-1+gw*y].conductivity =
		    grid[gridSizeX-windowOffsetX-1+gw*y].conductivity;
	    }
	for (x = 1; x < gridSizeX-1; x++)
	    for (y = 1; y < gridSizeY-1; y++) {
		int gi = x+gw*y;
		OscElement oe = grid[gi];
		double perm = oe.perm;
		int medium = oe.medium;
		double mx = oe.mx;
		double my = oe.my;
		OscElement e1 = grid[gi-1];
		OscElement e2 = grid[gi+1];
		OscElement e3 = grid[gi-gw];
		OscElement e4 = grid[gi+gw];

		oe.gray = 
		    (oe.conductivity > 0 || oe.medium != 0 ||
		     oe.perm != 1 || oe.mx != 0 || oe.my != 0 ||
		     oe.resonant);
		    
		// mark all grid squares where the permeability, medium,
		// or magnetization is different from one of the neighbors
		if (e1.perm != perm || e2.perm != perm ||
		    e3.perm != perm || e4.perm != perm ||
		    e1.medium != medium || e2.medium != medium ||
		    e3.medium != medium || e4.medium != medium ||
		    e1.mx != mx || e2.mx != mx || e3.mx != mx || e4.mx != mx ||
		    e1.my != my || e2.my != my || e3.my != my || e4.my != my ||
		    oe.resonant) {
		    oe.boundary = true;
		    bound++;
		} else
		    oe.boundary = false;
	    }
 }

 int getPanelHeight() { return winSize.height / 3; }

 void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
     g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
 }

// public void paintComponent(Graphics g) {
//	cv.repaint();
// }

 long lastTime = 0;
 
 public void updateEMWave2(Graphics realg) {
	if (winSize == null || winSize.width == 0) {
	    // this works around some weird bug in IE which causes the
	    // applet to not show up properly the first time after
	    // a reboot.
	    handleResize();
	    return;
	}
	double tadd = 0;
	if (!stoppedCheck.getState()) {
	    int val = 5;
	    tadd = val*.05;
	}
	int i, j;

	boolean stopFunc = dragging;
	if (stoppedCheck.getState())
	    stopFunc = true;
	double speedValue = speedBar.getValue()/2.;
	if (stopFunc)
	    lastTime = 0;
	else {
	    if (lastTime == 0)
		lastTime = System.currentTimeMillis();
	    if (speedValue*(System.currentTimeMillis()-lastTime) < 1000)
		stopFunc = true;
	}
	if (!stopFunc) {
	    int iter;
	    int mxx = gridSizeX-1;
	    int mxy = gridSizeY-1;
	    for (iter = 1; ; iter++) {
		doSources(tadd, false);
		setup.doStep();
		double sinhalfth = 0;
		double sinth = 0;
		double scaleo = 0;
		double tadd2 = tadd;
		double forcecoef = 1;
		int curMedium = 0;
		OscElement oew, oee, oen, oes, oe;
		double previ, nexti, prevj, nextj, basis, a, b;
		for (j = 1; j != mxy; j++) {
		    int gi = j*gw+1;
		    int giEnd = gi+mxx-1;
		    oe = grid[gi-1];
		    oee = grid[gi];
		    for (; gi != giEnd; gi++) {
			oew = oe;
			oe = oee;
			oee = grid[gi+1];
			oen = grid[gi-gw];
			oes = grid[gi+gw];

			if (oe.conductivity > 0)
			    oe.jz = 0;

			if (oe.boundary) {
			    // here we may be on the boundary between two
			    // media, so we have to do some extra work
			    if (oe.resonant) {
				oe.jz = oe.jz*.999 +
				    -oe.dazdt * .001 - oe.epos * .02;
				oe.epos += oe.jz * .2;
			    }
			    if (curMedium != oe.medium) {
				curMedium = oe.medium;
				forcecoef = (1-
				   (mediumMaxIndex/mediumMax)*curMedium);
				forcecoef *= forcecoef;
			    }
			    double az = oe.az;
			    previ = (oew.az-az)/oew.perm;
			    nexti = (oee.az-az)/oee.perm;
			    prevj = (oen.az-az)/oen.perm;
			    nextj = (oes.az-az)/oes.perm;
			    basis = (nexti+previ+nextj+prevj)*.25;
			    // calculate effective current
			    double jz = oew.my - oee.my +
				oes.mx - oen.mx + oe.jz;
			    a = oe.perm*basis + jz;
			} else {
			    // easy way
			    previ = oew.az;
			    nexti = oee.az;
			    prevj = oen.az;
			    nextj = oes.az;
			    basis = (nexti+previ+nextj+prevj)*.25;
			    a = oe.jz - (oe.az - basis);
			}
			oe.dazdt = (oe.dazdt * oe.damp) + a * forcecoef;
		    }
		}
		tadd2 = tadd*tadd;
		for (j = 1; j != mxy; j++) {
		    int gi = j*gw+1;
		    int giEnd = gi-1+mxx;
		    for (; gi != giEnd; gi++) {
			oe = grid[gi];
			if (oe.conductivity > 0) {
			    a = -oe.dazdt*oe.conductivity;
			    oe.jz = a;
			    oe.dazdt += a;
			}
			oe.az += oe.dazdt * tadd2;
		    }
		}
		t += tadd;
		filterGrid();
		long tm = System.currentTimeMillis();
		if (tm-lastTime > 200 ||
		    iter*1000 >= speedValue*(tm-lastTime)) {
		    lastTime = tm;
		    break;
		}
	    }
	}

	renderGrid();
	
	int intf = (gridSizeY/2-windowOffsetY)*winSize.height/windowHeight;
	for (i = 0; i < sourceCount; i++) {
	    OscSource src = sources[i];
	    int xx = src.getScreenX();
	    int yy = src.getScreenY();
	    plotSource(i, xx, yy);
	}
	if (adjustSelectX1 != -1) {
	    int c = getrand(255);
	    int col = 0x010100 * c + 0xFF000000;
	    int lx1 = (int) (adjustSelectX1*winSize.width /windowWidth);
	    int ly1 = (int) (adjustSelectY1*winSize.height/windowHeight);
	    int lx2 = (int) ((adjustSelectX2+1)*winSize.width /windowWidth);
	    int ly2 = (int) ((adjustSelectY2+1)*winSize.height/windowHeight);
	    plotRect(lx1, ly1, lx2-1, ly2-1, col);
	}
	
	if (imageSource != null)
	    imageSource.newPixels();
	
	realg.drawImage(dbimage, 0, 0, this);
	if (!stoppedCheck.getState())
	    cv.repaint(pause);
 }

 void plotRect(int x1, int y1, int x2, int y2, int col) {
	int i;
	for (i = x1; i <= x2; i++) {
	    plotPixel(i, y1, col);
	    plotPixel(i, y2, col);
	}
	for (i = y1; i <= y2; i++) {
	    plotPixel(x1, i, col);
	    plotPixel(x2, i, col);
	}
 }
 
 void plotPixel(int x, int y, int pix) {
	if (x < 0 || x >= winSize.width)
	    return;
	try { pixels[x+y*winSize.width] = pix; } catch (Exception e) {}
 }

 // draw a circle the slow and dirty way
 void plotSource(int n, int xx, int yy) {
	int rad = sourceRadius;
	int j;
	int col = (n == selectedSource) ? 0xFF00FFFF : 0xFFFFFFFF;
	for (j = 0; j <= rad; j++) {
	    int k = (int) (Math.sqrt(rad*rad-j*j)+.5);
	    plotPixel(xx+j, yy+k, col);
	    plotPixel(xx+k, yy+j, col);
	    plotPixel(xx+j, yy-k, col);
	    plotPixel(xx-k, yy+j, col);
	    plotPixel(xx-j, yy+k, col);
	    plotPixel(xx+k, yy-j, col);
	    plotPixel(xx-j, yy-k, col);
	    plotPixel(xx-k, yy-j, col);
	    plotPixel(xx, yy+j, col);
	    plotPixel(xx, yy-j, col);
	    plotPixel(xx+j, yy, col);
	    plotPixel(xx-j, yy, col);
	}
 }
 
 void renderGrid() {
	double mult = brightnessBar.getValue() / 50.0;
	double emult = 1;
	int ix = 0;
	int i, j, k, l;

	int viewScalar, viewVector, viewScalarCond, viewVectorCond;
	int v = viewChooser.getSelectedIndex();
	if (v == VIEW_FORCE)
	    calcForce();
	boolean showLines = false;
	viewScalar = viewScalarCond =
	    viewVector = viewVectorCond = VIEW_NONE;
	switch (v) {
	case VIEW_E:
	case VIEW_A:
	case VIEW_J:
	case VIEW_BX:
	case VIEW_BY:
	case VIEW_HX:
	case VIEW_HY:
	case VIEW_EFF_CUR:
	case VIEW_MAG_CHARGE:
	case VIEW_TYPE:
	case VIEW_B_STRENGTH:
	case VIEW_ENERGY:
	    viewScalar = viewScalarCond = v;
	    break;
	case VIEW_B:
	case VIEW_POYNTING:
	case VIEW_H:
	case VIEW_M:
	case VIEW_CURL_E:
	    viewVector = viewVectorCond = v;
	    break;
	case VIEW_B_LINES:
	    showLines = true;
	    break;
	case VIEW_FORCE:
	    viewScalar = viewScalarCond = VIEW_E;
	    viewVector = viewVectorCond = VIEW_FORCE;
	    break;
	case VIEW_E_B:
	    viewScalar = viewScalarCond = VIEW_E;
	    viewVector = viewVectorCond = VIEW_B;
	    emult = .3;
	    break;
	case VIEW_E_B_J:
	    viewScalar = VIEW_E;
	    viewScalarCond = VIEW_J;
	    viewVector = viewVectorCond = VIEW_B;
	    emult = .3;
	    break;
	case VIEW_E_B_LINES:
	    viewScalar = viewScalarCond = VIEW_E;
	    showLines = true;
	    emult = .3;
	    break;
	case VIEW_E_B_LINES_J:
	    viewScalar = VIEW_E;
	    viewScalarCond = VIEW_J;
	    showLines = true;
	    emult = .3;
	    break;
	case VIEW_POYNTING_ENERGY:
	    viewScalar = viewScalarCond = VIEW_ENERGY;
	    viewVector = viewVectorCond = VIEW_POYNTING;
	    break;
	}
	for (j = 0; j != windowHeight; j++) {
	    ix = winSize.width*(j*winSize.height/windowHeight);
	    int gi = (j+windowOffsetY)*gw+windowOffsetX;
	    for (i = 0; i != windowWidth; i++, gi++) {
		int x = i*winSize.width/windowWidth;
		int y = j*winSize.height/windowHeight;
		int x2 = (i+1)*winSize.width/windowWidth;
		int y2 = (j+1)*winSize.height/windowHeight;
		int i2 = i+windowOffsetX;
		int j2 = j+windowOffsetY;
		int vs = viewScalar;
		int vv = viewVector;
		int col_r = 0, col_g = 0, col_b = 0;
		OscElement oe = grid[gi];
		if (oe.gray || oe.jz != 0) {
		    col_r = col_g = col_b = 64;
		    if (oe.conductivity > 0 || (oe.jz != 0 && !oe.resonant)) {
			vv = viewVectorCond;
			vs = viewScalarCond;
		    }
		}
		if (vs != VIEW_NONE) {
		    double dy = 0;
		    switch (vs) {
		    case VIEW_E:   dy = -oe.dazdt * emult; break;
		    case VIEW_A:   dy = oe.az * .2; break;
		    case VIEW_J:   dy = oe.jz; break;
		    case VIEW_BX:
			dy = grid[gi-gw].az - grid[gi+gw].az;
			break;
		    case VIEW_BY:
			dy = -(grid[gi+1].az - grid[gi-1].az);
			break;
		    case VIEW_HX:
			dy = ((grid[gi-gw].az - grid[gi+gw].az)/oe.perm
			      - oe.mx*mhmult);
			break;
		    case VIEW_HY:
			dy = -((grid[gi+1].az - grid[gi-1].az)/oe.perm
			      - oe.my*mhmult);
			break;
		    case VIEW_EFF_CUR:
			dy = getMagY(gi-1) - getMagY(gi+1) +
			    getMagX(gi+gw) - getMagX(gi-gw);
			break;
		    case VIEW_MAG_CHARGE:
			dy = grid[gi-1].mx - grid[gi+1].mx +
			     grid[gi-gw].my - grid[gi+gw].my;
			break;
		    case VIEW_B_STRENGTH:
			{
			    double dx = grid[gi-gw].az - grid[gi+gw].az;
			    dy = grid[gi+1].az - grid[gi-1].az;
			    dy = Math.sqrt(dx*dx+dy*dy);
			    break;
			}
		    case VIEW_ENERGY:
			{
			    double n = 1/
				(1-oe.medium*mediumMaxIndex/mediumMax);
			    double dielec = n*n;
			    double dx = grid[gi-gw].az - grid[gi+gw].az;
			    dy = grid[gi+1].az - grid[gi-1].az;
			    dy = .4*((dx*dx+dy*dy)/oe.perm +
				     oe.dazdt * oe.dazdt * dielec);
			    break;
			}
		    }
		    dy *= mult;
		    if (dy < -1)
			dy = -1;
		    if (dy > 1)
			dy = 1;
		    if (vs == VIEW_TYPE) {
			double dr = 0, dg = 0, db = 0;
			if (oe.resonant) {
			    dr = 1;
			    dg = .75;
			    db = .5;
			} else if (oe.perm < 1) {
			    dr = 1-oe.perm;
			} else if (oe.perm > 1) {
			    dg = (oe.perm-1)/30;
			} else if (oe.mx != 0 || oe.my != 0) {
			    dr = .53; dg = .27; db = .63;
			} else if (oe.medium > 0) {
			    dr = oe.medium/(double) mediumMax;
			    dg = dr*.5;
			} else if (oe.conductivity > 0) {
			    dg = db = oe.conductivity;
			    if (oe.conductivity == 1)
				dr = 1;
			} else if (oe.jz > 0) {
			    dr = dg = oe.jz*mult;
			} else if (oe.jz < 0) {
			    db = -oe.jz*mult;
			}
			dr = clamp(dr);
			dg = clamp(dg);
			db = clamp(db);
			col_r = col_r+(int) (dr*(255-col_r));
			col_g = col_g+(int) (dg*(255-col_g));
			col_b = col_b+(int) (db*(255-col_b));
		    } else if (vs == VIEW_J || vs == VIEW_EFF_CUR ||
			       vs == VIEW_ENERGY) {
			if (dy < 0)
			    col_b = col_b+(int) (-dy*(255-col_b));
			else {
			    col_r = col_r+(int) (dy*(255-col_r));
			    col_g = col_g+(int) (dy*(255-col_g));
			}
		    } else {
			if (dy < 0)
			    col_r = col_r+(int) (-dy*(255-col_r));
			else
			    col_g = col_g+(int) (dy*(255-col_g));
		    }
		}
		int col = (255<<24) | (col_r<<16) | (col_g<<8) | col_b;
		for (k = 0; k != x2-x; k++, ix++)
		    for (l = 0; l != y2-y; l++)
			pixels[ix+l*winSize.width] = col;
		oe.col = col;
		if (vv != VIEW_NONE) {
		    double dx = 0, dy = 0;
		    switch (vv) {
		    case VIEW_B:
			dx = grid[gi-gw].az - grid[gi+gw].az;
			dy = grid[gi+1].az - grid[gi-1].az;
			break;
		    case VIEW_H:
			dx = (grid[gi-gw].az - grid[gi+gw].az)/oe.perm -
			    mhmult*oe.mx;
			dy = (grid[gi+1].az - grid[gi-1].az)/oe.perm -
			    mhmult*oe.my;
			break;
		    case VIEW_M:
			{
			    double mm = 1-1/oe.perm;
			    dx = (grid[gi-gw].az - grid[gi+gw].az)*mm +
				oe.mx;
			    dy = (grid[gi+1].az - grid[gi-1].az)*mm +
				oe.my;
			}
			break;
		    case VIEW_POYNTING:
			dy = 5*oe.dazdt *
			    (grid[gi-gw].az - grid[gi+gw].az)/oe.perm;
			dx = -5*oe.dazdt *
			    (grid[gi+1].az - grid[gi-1].az)/oe.perm;
			break;
		    case VIEW_FORCE:
			dx = forceVecs[forceMap[i2][j2]][0];
			dy = forceVecs[forceMap[i2][j2]][1];
			break;
		    case VIEW_CURL_E:
			dx = -5*(grid[gi-gw].dazdt - grid[gi+gw].dazdt);
			dy = -5*(grid[gi+1].dazdt - grid[gi-1].dazdt);
			break;
		    }
		    double dn = Math.sqrt(dx*dx+dy*dy);
		    if (dn > 0) {
			dx /= dn;
			dy /= dn;
		    }
		    dn *= mult;
		    if (dn > 1) {
			if (dn > 2)
			    dn = 2;
			dn -= 1;
			col_g = 255;
			col_r = col_r+(int) (dn*(255-col_r));
			col_b = col_b+(int) (dn*(255-col_b));
		    } else
			col_g = col_g+(int) (dn*(255-col_g));
		    col = (255<<24) | (col_r<<16) | (col_g<<8) | col_b;
		    int sw2 = (x2-x)/2;
		    int sh2 = (y2-y)/2;
		    int x1 = x+sw2-(int) (sw2*dx);
		    int y1 = y+sh2-(int) (sh2*dy);
		    x2 = x+sw2+(int) (sw2*dx);
		    y2 = y+sh2+(int) (sh2*dy);
		    drawLine(x1, y1, x2, y2, col);
		    int as = 3;
		    drawLine(x2, y2,
			     (int) ( dy*as-dx*as+x2),
			     (int) (-dx*as-dy*as+y2), col);
		    drawLine(x2, y2,
			     (int) (-dy*as-dx*as+x2),
			     (int) ( dx*as-dy*as+y2), col);
		}
	    }
	}
	if (showLines) {
	    renderLines();
	    lineDensityBar.enable();
	} else {
	    lineDensityBar.disable();
	}
 }

 void drawLine(int x1, int y1, int x2, int y2, int col) {
	if (x1 < 0) x1 = 0;
	if (y1 < 0) y1 = 0;
	if (x2 < 0) x2 = 0;
	if (y2 < 0) y2 = 0;
	if (x1 >= winSize.width-1)  x1 = winSize.width-1;
	if (y1 >= winSize.height-1) y1 = winSize.height-1;
	if (x2 >= winSize.width-1)  x2 = winSize.width-1;
	if (y2 >= winSize.height-1) y2 = winSize.height-1;
	int dx = abs(x2-x1);
	int dy = abs(y2-y1);
	if (dx > dy) {
	    if (x1 > x2) {
		int q;
		q = x1; x1 = x2; x2 = q;
		q = y1; y1 = y2; y2 = q;
	    }
	    int x;
	    for (x = x1; x <= x2; x++)
		pixels[x+(y1+(y2-y1)*(x-x1)/dx)*winSize.width] = col;
	} else if (dy > 0) {
	    if (y1 > y2) {
		int q;
		q = x1; x1 = x2; x2 = q;
		q = y1; y1 = y2; y2 = q;
	    }
	    int y;
	    for (y = y1; y <= y2; y++)
		pixels[x1+(x2-x1)*(y-y1)/dy+y*winSize.width] = col;
	}
 }
 
 double getMagX(int gi) {
	OscElement oe = grid[gi];
	double mm = 1-1/oe.perm;
	return (grid[gi-gw].az - grid[gi+gw].az)*mm + oe.mx;
 }

 double getMagY(int gi) {
	OscElement oe = grid[gi];
	double mm = 1-1/oe.perm;
	return (grid[gi+1].az - grid[gi-1].az)*mm + oe.my;
 }

 double clamp(double x) {
	return (x < 0) ? 0 : (x > 1) ? 1 : x;
 }

 void doSources(double tadd, boolean clear) {
	int i, j;
	if (sourceCount == 0)
	    return;
	double w = forceBar.getValue()*(t-forceTimeZero)*freqMult;
	double w2 = w;
	switch (auxFunction) {
	case AUX_FREQ:
	    w2 = auxBar.getValue()*t*freqMult;
	    break;
	case AUX_PHASE:
	    {
		// scrollbars don't always go all the way to the end,
		// so we do some extra work to make sure we can set
		// the phase all the way from 0 to pi
		int au = auxBar.getValue()-1;
		if (au > 38)
		    au = 38;
		w2 = w+au*(pi/38);
		break;
	    }
	}
	double v = 0;
	double v2 = 0;
	switch (sourceWaveform) {
	case SWF_SIN:
	    v = Math.sin(w);
	    if (sourceCount >= 2)
		v2 = Math.sin(w2);
	    else if (sourceFreqCount == 2)
		v = (v+Math.sin(w2))*.5;
	    break;
	case SWF_PACKET:
	    {
		w %= pi*2;
		double adjw = w/(freqMult*forceBar.getValue());
		adjw -= 10;
		v = Math.exp(-.01*adjw*adjw)*
		    Math.sin(adjw*.2);
		if (adjw < 0)
		    doFilter();
	    }
	    break;
	}
	if (clear)
	    v = v2 = 0;
	sources[0].v = sources[2].v = (float) (2*v*sourceMult);
	sources[1].v = sources[3].v = (float) (2*v2*sourceMult);
	if (sourcePlane) {
	    for (j = 0; j != sourceCount/2; j++) {
		OscSource src1 = sources[j*2];
		OscSource src2 = sources[j*2+1];
		OscSource src3 = sources[j];
		drawPlaneSource(src1.x, src1.y,
				src2.x, src2.y, src3.v*.1);
	    }
	} else {
	    for (i = 0; i != sourceCount; i++) {
		OscSource src = sources[i];
		OscElement oe = grid[src.x+gw*src.y];
		oe.jz = src.v;
	    }
	}
 }

 int abs(int x) {
	return x < 0 ? -x : x;
 }

 void drawPlaneSource(int x1, int y1, int x2, int y2, double v) {
	if (y1 == y2) {
	    if (x1 == windowOffsetX)
		x1 = 0;
	    if (x2 == windowOffsetX)
		x2 = 0;
	    if (x1 == windowOffsetX+windowWidth-1)
		x1 = gridSizeX-1;
	    if (x2 == windowOffsetX+windowWidth-1)
		x2 = gridSizeX-1;
	}
	if (x1 == x2) {
	    if (y1 == windowOffsetY)
		y1 = 0;
	    if (y2 == windowOffsetY)
		y2 = 0;
	    if (y1 == windowOffsetY+windowHeight-1)
		y1 = gridSizeY-1;
	    if (y2 == windowOffsetY+windowHeight-1)
		y2 = gridSizeY-1;
	}
	// need to draw a line from x1,y1 to x2,y2
	if (x1 == x2 && y1 == y2) {
	    grid[x1+gw*y1].jz = v;
	} else if (abs(y2-y1) > abs(x2-x1)) {
	    // y difference is greater, so we step along y's
	    // from min to max y and calculate x for each step
	    int sgn = sign(y2-y1);
	    int x, y;
	    for (y = y1; y != y2+sgn; y += sgn) {
		x = x1+(x2-x1)*(y-y1)/(y2-y1);
		grid[x+gw*y].jz = v;
	    }
	} else {
	    // x difference is greater, so we step along x's
	    // from min to max x and calculate y for each step
	    int sgn = sign(x2-x1);
	    int x, y;
	    for (x = x1; x != x2+sgn; x += sgn) {
		y = y1+(y2-y1)*(x-x1)/(x2-x1);
		grid[x+gw*y].jz = v;
	    }
	}
 }

 int sign(int x) {
	return (x < 0) ? -1 : (x == 0) ? 0 : 1;
 }

 byte linegrid[];

 // render electric field lines
 void renderLines() {
	double x = 0, y = 0;
	int lineGridSize = lineDensityBar.getValue();
	int lineGridSize2 = lineGridSize*lineGridSize;
	if (linegrid == null)
	    linegrid = new byte[lineGridSize2];
	double lspacing = lineGridSize/(double) windowWidth;
	double startx = -1, starty = 0;
	int linemax = 0;
	double mult = brightnessBar.getValue() / 50.0;
	boolean doArrow = false;
	int dir = 1;
	double olddn = -1;
	int oldcol = -1;
	int gridsearchx = 0, gridsearchy = 0;
	int i, j;
	for (i = 0; i != lineGridSize2; i++)
	    linegrid[i] = 0;
	int oldcgx = -1, oldcgy = -1;
	while (true) {
	    if (linemax-- == 0 || x == 0) {
		if (dir == 1) {
		    int gi = gridsearchx+lineGridSize*gridsearchy;
		    while (true) {
			if (linegrid[gi] == 0)
			    break;
			if (++gridsearchx == lineGridSize) {
			    if (++gridsearchy == lineGridSize)
				break;
			    gridsearchx = 0;
			}
			gi++;
		    }
		    if (gridsearchx == lineGridSize && gridsearchy == lineGridSize)
			break;
		    startx = gridsearchx/lspacing;
		    starty = gridsearchy/lspacing;
		}
		x = startx+.48/lspacing;
		y = starty+.48/lspacing;
		linemax = 40; // was 100
		dir = -dir;
		oldcgx = oldcgy = -1;
	    }
	    if (x < 0 || y < 0 || x >= windowWidth || y >= windowHeight) {
		x = 0;
		continue;
	    }
	    int cgx = (int) (x*lspacing);
	    int cgy = (int) (y*lspacing);
	    doArrow = true;
	    if (cgx != oldcgx || cgy != oldcgy) {
		int lg = ++linegrid[cgx+lineGridSize*cgy];
		if (lg > 2) {
		    x = 0;
		    continue;
		}
		oldcgx = cgx;
		oldcgy = cgy;
	    } else
		doArrow = false;
	    int xi = windowOffsetX+(int) x;
	    int yi = windowOffsetY+(int) y;
	    int gi = xi+gw*yi;
	    OscElement oe = grid[gi];
	    double dx = grid[gi-gw].az - grid[gi+gw].az;
	    double dy = grid[gi+1].az  - grid[gi-1].az;
	    double dn = Math.sqrt(dx*dx+dy*dy);
	    if (dn == 0) {
		x = 0;
		continue;
	    }
	    dx /= dn;
	    dy /= dn;
	    double oldx = x;
	    double oldy = y;
	    x += .5*dx*dir;
	    y += .5*dy*dir;
	    dn *= mult;
	    int col = grid[gi].col;
	    if (dn != olddn || col != oldcol) {
		int col_r = (col>>16) & 255;
		int col_g = (col>> 8) & 255;
		int col_b = col & 255;
		if (dn > 1) {
		    if (dn > 2)
			dn = 2;
		    dn -= 1;
		    col_g = 255;
		    col_r = col_r+(int) (dn*(255-col_r));
		    col_b = col_b+(int) (dn*(255-col_b));
		} else
		    col_g = col_g+(int) (dn*(255-col_g));
		col = (255<<24) | (col_r<<16) | (col_g<<8) | col_b;
		olddn = dn;
		oldcol = col;
	    }
	    int lx1 = (int) (oldx*winSize.width /windowWidth);
	    int ly1 = (int) (oldy*winSize.height/windowHeight);
	    int lx2 = (int) (x*winSize.width /windowWidth);
	    int ly2 = (int) (y*winSize.height/windowHeight);
	    drawLine(lx1, ly1, lx2, ly2, col);
	    if (doArrow && linegrid[cgx+lineGridSize*cgy] == 1) {
		if ((cgx & 3) == 0 && (cgy & 3) == 0) {
		    int as = 5;
		    drawLine(lx2, ly2,
			     (int) ( dy*as-dx*as+lx2),
			     (int) (-dx*as-dy*as+ly2), col);
		    drawLine(lx2, ly2,
			     (int) (-dy*as-dx*as+lx2),
			     (int) ( dx*as-dy*as+ly2), col);
		}
	    }
	}
 }

 byte forceMap[][];
 double forceVecs[][];

 void calcForce() {
	int x, y;
	forceMap = new byte[gridSizeX][gridSizeY];
	forceVecs = new double[256][2];
	byte magno = 1;
	for (x = windowOffsetX; x != windowWidth+windowOffsetX; x++)
	    for (y = windowOffsetY; y != windowHeight+windowOffsetY; y++) {
		if (forceMap[x][y] != 0 || !grid[x+gw*y].feelsForce())
		    continue;
		forceVecs[magno][0] = forceVecs[magno][1] = 0;
		forceSearch(x, y, magno++);
	    }
 }

 void forceSearch(int x, int y, byte magno) {
	if (forceMap[x][y] != 0)
	    return;
	if (x < windowOffsetX ||
	    y < windowOffsetY ||
	    x >= windowOffsetX+windowWidth ||
	    y >= windowOffsetY+windowHeight)
	    return;
	int gi = x+y*gw;
	double mc = getMagX(gi-1)  - getMagX(gi+1) +
	            getMagY(gi-gw) - getMagY(gi+gw);
	double bx = grid[gi-gw].az - grid[gi+gw].az;
	double by = grid[gi+1].az  - grid[gi-1].az;
	forceVecs[magno][0] += mc*bx + grid[gi].jz*by;
	forceVecs[magno][1] += mc*by - grid[gi].jz*bx;
	if (grid[gi].feelsForce()) {
	    forceMap[x][y] = magno;
	    forceSearch(x-1, y, magno);
	    forceSearch(x+1, y, magno);
	    forceSearch(x, y-1, magno);
	    forceSearch(x, y+1, magno);
	}
 }

 int filterCount = 0;

 // filter out high-frequency noise
 void filterGrid() {
	if ((filterCount++ & 3) != 0)
	    return;
	if (filterCount > 200)
	    return;
	// filter less aggressively if there is a source on the screen,
	// to avoid damping the waves
	double mult1 = (forceBar.getValue() > 7 &&
			sourceCount > 0 &&
			sourceWaveform == SWF_SIN) ? 40 : 8;
	double mult2 = 4+mult1;
	int x, y;
	for (y = 1; y < gridSizeY-1; y++)
	    for (x = 1; x < gridSizeX-1; x++) {
		int gi = x+y*gw;
		OscElement oe = grid[gi];
		if (oe.jz != 0 || oe.conductivity > 0)
		    continue;
		if (oe.perm != grid[gi-1].perm ||
		    oe.perm != grid[gi+1].perm ||
		    oe.perm != grid[gi-gw].perm ||
		    oe.perm != grid[gi+gw].perm)
		    continue;
		double jz = grid[gi-1].my - grid[gi+1].my +
		    grid[gi+gw].mx - grid[gi-gw].mx;
		if (jz != 0)
		    continue;
		oe.az = (oe.az*mult1 + grid[gi-1].az + grid[gi+1].az +
			 grid[gi-gw].az + grid[gi+gw].az)/mult2;
	    }
 }

 void noFilter() {
	filterCount = 200;
 }
 void doFilter() {
	filterCount %= 4;
 }

 void edit(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	if (selectedSource != -1) {
	    doSources(1, true);
	    x = x*windowWidth/winSize.width;
	    y = y*windowHeight/winSize.height;
	    OscSource s = sources[selectedSource];
	    if (x >= 0 && y >= 0 && x < windowWidth && y < windowHeight) {
		int ox = s.x;
		int oy = s.y;
		s.x = x+windowOffsetX;
		s.y = y+windowOffsetY;
		cv.repaint(pause);
	    }
	    return;
	}
	if (modeChooser.getSelectedIndex() >= MODE_ADJUST) {
	    int xp = x*windowWidth/winSize.width;
	    int yp = y*windowHeight/winSize.height;
	    if (adjustSelectX1 == -1) { 
		adjustSelectX1 = adjustSelectX2 = xp;
		adjustSelectY1 = adjustSelectY2 = yp;
		adjustBar.enable();
		return;
	    }
	    adjustSelectX1 = max(0, min(xp, adjustSelectX1));
	    adjustSelectX2 = min(windowWidth-1,  max(xp, adjustSelectX2));
	    adjustSelectY1 = max(0, min(yp, adjustSelectY1));
	    adjustSelectY2 = min(windowHeight-1, max(yp, adjustSelectY2));
	    adjustBar.enable();
	    return;
	}
	if (dragX == x && dragY == y)
	    editFuncPoint(x, y);
	else {
	    // need to draw a line from old x,y to new x,y and
	    // call editFuncPoint for each point on that line.  yuck.
	    if (abs(y-dragY) > abs(x-dragX)) {
		// y difference is greater, so we step along y's
		// from min to max y and calculate x for each step
		int x1 = (y < dragY) ? x : dragX;
		int y1 = (y < dragY) ? y : dragY;
		int x2 = (y > dragY) ? x : dragX;
		int y2 = (y > dragY) ? y : dragY;
		dragX = x;
		dragY = y;
		for (y = y1; y <= y2; y++) {
		    x = x1+(x2-x1)*(y-y1)/(y2-y1);
		    editFuncPoint(x, y);
		}
	    } else {
		// x difference is greater, so we step along x's
		// from min to max x and calculate y for each step
		int x1 = (x < dragX) ? x : dragX;
		int y1 = (x < dragX) ? y : dragY;
		int x2 = (x > dragX) ? x : dragX;
		int y2 = (x > dragX) ? y : dragY;
		dragX = x;
		dragY = y;
		for (x = x1; x <= x2; x++) {
		    y = y1+(y2-y1)*(x-x1)/(x2-x1);
		    editFuncPoint(x, y);
		}
	    }
	}
	calcBoundaries();
	cv.repaint(pause);
 }

 int min(int a, int b) { return (a < b) ? a : b; }
 int max(int a, int b) { return (a > b) ? a : b; }

 void editFuncPoint(int x, int y) {
	int xp = x*windowWidth/winSize.width;
	int yp = y*windowHeight/winSize.height;

	if (xp < 0 || xp >= windowWidth ||
	    yp < 0 || yp >= windowHeight)
	    return;

	xp += windowOffsetX;
	yp += windowOffsetY;
	OscElement oe = grid[xp+gw*yp];
	doFilter();
	if (!dragSet && !dragClear) {
	    dragClear = oe.conductivity != 0 || oe.medium != 0 ||
		oe.mx != 0 || oe.my != 0 || oe.perm != 1 ||
		oe.jz != 0 || oe.resonant;
	    dragSet = !dragClear;
	}

	oe.conductivity = 0;
	oe.medium = 0;
	oe.mx = oe.my = 0;
	oe.perm = 1;
	oe.jz = 0;
	oe.resonant = false;

	if (dragClear)
	    return;

	switch (modeChooser.getSelectedIndex()) {
	case MODE_J_POS: oe.jz =  1; break;
	case MODE_J_NEG: oe.jz = -1; break;
	case MODE_FERROMAG: addPerm(xp, yp, 5);  break;
	case MODE_DIAMAG:  addPerm(xp, yp, .5); break;
	case MODE_MEDIUM:  oe.medium = mediumMax; break;
	case MODE_M_DOWN:   oe.my = 1;  break;
	case MODE_M_UP:     oe.my = -1; break;
	case MODE_M_LEFT:   oe.mx = -1; break;
	case MODE_M_RIGHT:  oe.mx = 1;  break;
	case MODE_PERF_CONDUCTOR: addConductor(xp, yp, 1); break;
	case MODE_GOOD_CONDUCTOR: addConductor(xp, yp, .9); break;
	case MODE_FAIR_CONDUCTOR: addConductor(xp, yp, .5); break;
	case MODE_RESONANT: oe.resonant = true; break;
	}
 }

 void selectSource(MouseEvent me) {
	int x = me.getX();
	int y = me.getY();
	int i;
	selectedSource = -1;
	int best = sourceRadius*2;
	best *= best;
	for (i = 0; i != sourceCount; i++) {
	    OscSource src = sources[i];
	    int sx = src.getScreenX();
	    int sy = src.getScreenY();
	    int r2 = (sx-x)*(sx-x)+(sy-y)*(sy-y);
	    if (r2 < best) {
		selectedSource = i;
		best = r2;
	    }
	}
 }

 public void componentHidden(ComponentEvent e){}
 public void componentMoved(ComponentEvent e){}
 public void componentShown(ComponentEvent e) {
	cv.repaint();
 }

 public void componentResized(ComponentEvent e) {
	handleResize();
	cv.repaint(100);
 }
 public void actionPerformed(ActionEvent e) {
	if (e.getSource() == clearButton) {
	    doClear();
	    cv.repaint();
	}
	if (e.getSource() == ClearAllButton) {
	    doClearAll();
	    cv.repaint();
	}
 }

 public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == resBar) {
	    setResolution();
	    reinit();
	    cv.repaint(pause);
	}
	if (e.getSource() == brightnessBar)
	    cv.repaint(pause);
	if (e.getSource() == lineDensityBar) {
	    cv.repaint(pause);
	    linegrid = null;
	}
	if (e.getSource() == forceBar)
	    setForce();
	if (e.getSource() == adjustBar)
	    doAdjust();
 }

 void setForceBar(int x) {
	forceBar.setValue(x);
	forceBarValue = x;
	forceTimeZero = 0;
 }

 void setForce() {
	// adjust time zero to maintain continuity in the force func
	// even though the frequency has changed.
	double oldfreq = forceBarValue * freqMult;
	forceBarValue = forceBar.getValue();
	double newfreq = forceBarValue * freqMult;
	double adj = newfreq-oldfreq;
	forceTimeZero = t-oldfreq*(t-forceTimeZero)/newfreq;
 }

 void setResolution() {
	windowWidth = windowHeight = resBar.getValue();
	windowOffsetX = windowOffsetY = 20;
	gridSizeX = windowWidth + windowOffsetX*2;
	gridSizeY = windowHeight + windowOffsetY*2;
	gridSizeXY = gridSizeX*gridSizeY;
	gw = gridSizeX;
	System.out.println("gridsize " + gridSizeX + " window " + windowWidth);
	linegrid = null;
 }

 void setResolution(int x) {
	resBar.setValue(x);
	setResolution();
	reinit();
 }

 void doAdjust() {
	if (adjustSelectX1 == -1)
	    return;
	int vali = adjustBar.getValue();
	if (vali < 1)
	    vali = 1;
	if (vali > 99)
	    vali = 100;
	if (modeChooser.getSelectedIndex() == MODE_ADJ_PERM && vali < 3)
	    vali = 3;
	float val = vali/100.f;
	int x, y;
	for (y = adjustSelectY1; y <= adjustSelectY2; y++)
	    for (x = adjustSelectX1; x <= adjustSelectX2; x++) {
		OscElement oe = grid[x+windowOffsetX+gw*(y+windowOffsetY)];
		switch (modeChooser.getSelectedIndex()) {
		case MODE_ADJ_CONDUCT:
		    if (oe.getType() == TYPE_CONDUCTOR)
			oe.conductivity = val;
		    break;
		case MODE_ADJ_PERM:
		    if (oe.getType() == TYPE_FERROMAGNET)
			oe.perm = vali/2.f;
		    break;
		case MODE_ADJ_J:
		    if (oe.getType() == TYPE_CURRENT)
			oe.jz = (oe.jz < 0) ? -val : val;
		    break;
		case MODE_ADJ_MEDIUM:
		    if (oe.getType() == TYPE_MEDIUM)
			oe.medium = (int) (val*mediumMax);
		    break;
		case MODE_ADJ_MAG_DIR:
		    if (oe.getType() == TYPE_MAGNET) {
			double m =
			    Math.sqrt(oe.mx*oe.mx+oe.my*oe.my);
			oe.mx = (float) (Math.cos(val*2*pi)*m);
			oe.my = (float) -(Math.sin(val*2*pi)*m);
		    }
		    break;
		case MODE_ADJ_MAG_STR:
		    if (oe.getType() == TYPE_MAGNET) {
			float mult = (float) (val/Math.
					      sqrt(oe.mx*oe.mx+oe.my*oe.my));
			oe.mx *= mult;
			oe.my *= mult;
		    }
		    break;
		}
	    }
	calcBoundaries();
 }

 public void mouseDragged(MouseEvent e) {
	if (!dragging)
	    selectSource(e);
	dragging = true;
	edit(e);
 }
 public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	selectSource(e);
 }
 public void mouseClicked(MouseEvent e) {
 }
 public void mouseEntered(MouseEvent e) {
 }
 public void mouseExited(MouseEvent e) {
	selectedSource = -1;
	cv.repaint();
 }
 public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	adjustSelectX1 = -1;
	adjustBar.disable();
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	if (!dragging)
	    selectSource(e);
	dragging = true;
	edit(e);
 }
 public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = false;
	dragSet = dragClear = false;
	cv.repaint();
 }
 public void itemStateChanged(ItemEvent e) {
	cv.repaint(pause);
	if (e.getItemSelectable() == stoppedCheck)
	    return;
	if (e.getItemSelectable() == sourceChooser) {
	    setSources();
	    doFilter();
	}
	if (e.getItemSelectable() == setupChooser)
	    doSetup();
	if (e.getItemSelectable() == modeChooser)
	    setModeChooser();
 }

 void setModeChooser() {
	if (modeChooser.getSelectedIndex() < MODE_ADJUST) {
	    adjustLabel.hide();
	    adjustBar.hide();
	    validate();
	    adjustSelectX1 = -1;
	    return;
	}
	switch (modeChooser.getSelectedIndex()) {
	case MODE_ADJ_CONDUCT: adjustLabel.setText("Conductivity"); break;
	case MODE_ADJ_PERM:    adjustLabel.setText("Permeability"); break;
	case MODE_ADJ_J:       adjustLabel.setText("Current"); break;
	case MODE_ADJ_MEDIUM:  adjustLabel.setText("Dielectric Constant"); break;
	case MODE_ADJ_MAG_DIR: adjustLabel.setText("Direction"); break;
	case MODE_ADJ_MAG_STR: adjustLabel.setText("Strength"); break;
	}
	adjustLabel.show();
	adjustBar.show();
	if (adjustSelectX1 == -1)
	    adjustBar.disable();
	else
	    adjustBar.enable();
	validate();
 }

 void doSetup() {
	t = 0;
	doClearAll();
	// don't use previous source positions, use defaults
	sourceCount = -1;
	filterCount = 0;
	sourceChooser.select(SRC_1S1F);
	setForceBar(10);
	brightnessBar.setValue(100);
	auxBar.setValue(1);
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	setup.select();
	setup.doSetupSources();
	calcBoundaries();
	setDamping();
 }

 void addMedium() {
	int i, j;
	for (i = 0; i != gridSizeX; i++)
	    for (j = gridSizeY/2; j != gridSizeY; j++)
		grid[i+gw*j].medium = mediumMax;
 }

 void addCondMedium(double cv) {
	conductFillRect(0, gridSizeY/2, gridSizeX-1, gridSizeY-1, cv);
 }

 void addResMedium() {
	int i, j;
	for (i = 0; i != gridSizeX; i++)
	    for (j = gridSizeY/2; j != gridSizeY; j++)
		grid[i+gw*j].resonant = true;
 }

 void addUniformField() {
	float v = 2f/windowHeight;
	int y;
	for (y = 0; y != gridSizeY; y++) {
	    grid[windowOffsetX+gw*y].jz = v;
	    grid[windowOffsetX+windowWidth-1+gw*y].jz = -v;
	}
 }

 void addSolenoid(int x1, int y1, int x2, int y2, double v) {
	int i;
	for (i = y1; i <= y2; i++) {
	    grid[x1+gw*i].jz = v;
	    grid[x2+gw*i].jz = -v;
	}
 }

 void addMagnet(int x1, int y1, int x2, int y2, double v) {
	int i, j;
	for (i = y1; i <= y2; i++)
	    for (j = x1; j <= x2; j++)
		grid[j+gw*i].my = (float) v;
 }

 void addMagnet(int x1, int y1, int x2, int y2, double vx, double vy) {
	int i, j;
	for (i = y1; i <= y2; i++)
	    for (j = x1; j <= x2; j++) {
		grid[j+gw*i].mx = (float) vx;
		grid[j+gw*i].my = (float) vy;
	    }
 }

 void setSources() {
	if (sourceCount > 0)
	    doSources(1, true);
	sourceMult = 1;
	int oldSCount = sourceCount;
	boolean oldPlane = sourcePlane;
	sourceFreqCount = 1;
	sourcePlane = (sourceChooser.getSelectedIndex() >= SRC_1S1F_PLANE);
	sourceWaveform = SWF_SIN;
	sourceCount = 1;
	switch (sourceChooser.getSelectedIndex()) {
	case 0: sourceCount = 0; break;
	case 2: sourceFreqCount = 2; break;
	case 3: sourceCount = 2; break;
	case 4: sourceCount = 2; sourceFreqCount = 2; break;
	case 5: sourceCount = 3; break;
	case 6: sourceCount = 4; break;
	case 7: sourceWaveform = SWF_PACKET; break;
	case 9: sourceFreqCount = 2; break;
	case 10: sourceCount = 2; break;
	case 11: sourceCount = sourceFreqCount = 2; break;
	case 12: sourceWaveform = SWF_PACKET; break;
	}
	if (sourceFreqCount >= 2) {
	    auxFunction = AUX_FREQ;
	    auxBar.setValue(forceBar.getValue());
	    if (sourceCount == 2)
		auxLabel.setText("Source 2 Frequency");
	    else
		auxLabel.setText("2nd Frequency");
	} else if (sourceCount == 2 || sourceCount == 4) {
	    auxFunction = AUX_PHASE;
	    auxBar.setValue(1);
	    auxLabel.setText("Phase Difference");
	} else {
	    auxFunction = AUX_NONE;
	    auxBar.hide();
	    auxLabel.hide();
	}
	if (auxFunction != AUX_NONE) {
	    auxBar.show();
	    auxLabel.show();
	}
	validate();
	
	if (sourcePlane) {
	    sourceCount *= 2;
	    if (!(oldPlane && oldSCount == sourceCount)) {
		int x2 = windowOffsetX+windowWidth-1;
		int y2 = windowOffsetY+windowHeight-1;
		sources[0] = new OscSource(windowOffsetX, windowOffsetY);
		sources[1] = new OscSource(x2, windowOffsetY);
		sources[2] = new OscSource(windowOffsetX, y2);
		sources[3] = new OscSource(x2, y2);
	    }
	} else if (!(oldSCount == sourceCount && !oldPlane)) {
	    sources[0] = new OscSource(gridSizeX/2, windowOffsetY+1);
	    sources[1] = new OscSource(gridSizeX/2, gridSizeY-windowOffsetY-2);
	    sources[2] = new OscSource(windowOffsetX+1, gridSizeY/2);
	    sources[3] = new OscSource(gridSizeX-windowOffsetX-2, gridSizeY/2);
	}
 }

 class OscSource {
	int x;
	int y;
	double v;
	OscSource(int xx, int yy) { x = xx; y = yy; }
	int getScreenX() {
	    return ((x-windowOffsetX) * winSize.width+winSize.width/2)
		/windowWidth;
	}
	int getScreenY() {
	    return ((y-windowOffsetY) * winSize.height+winSize.height/2)
		/windowHeight;
	}
 };

 class OscElement {
	// permeability of this square (1 = vacuum)
	float perm;
	// conductivity (0, vacuum, 1 = perfect)
	float conductivity;
	// permanent magnetization
	float mx, my;
	// current
	double jz;
	// electron position (for resonance)
	float epos;
	// damping (used to keep waves from reflecting back after going
	// off the screen)
	double damp;
	// z component of vector potential and its first derivative
	double az, dazdt;
	// dielectric strength (0 = none, up to mediumMax)
	int medium;
	// temp variable used to store color when drawing field lines
	int col;
	// true if we are on a boundary between media
	boolean boundary;
	// true if this is a gray square (some medium)
	boolean gray;
	// true if this is a resonant medium
	boolean resonant;
	int getType() {
	    if (perm < 1)
		return TYPE_DIAMAGNET;
	    else if (perm > 1)
		return TYPE_FERROMAGNET;
	    else if (mx != 0 || my != 0)
		return TYPE_MAGNET;
	    else if (medium > 0)
		return TYPE_MEDIUM;
	    else if (conductivity > 0)
		return TYPE_CONDUCTOR;
	    else if (jz != 0)
		return TYPE_CURRENT;
	    return TYPE_NONE;
	}
	boolean feelsForce() {
	    int t = getType();
	    return (t != TYPE_NONE && t != TYPE_MEDIUM);
	}
 };

 abstract class Setup {
	abstract String getName();
	void select() {}
	void deselect() {}
	void valueChanged(Scrollbar s) {}
	void doStep() {}
	void doSetupSources() { setSources(); }
	abstract Setup createNext();
	Setup() { }
 };

 class SingleSourceSetup extends Setup {
	String getName() { return "Single Source"; }
	void select() {
	    setForceBar(30);
	}
	Setup createNext() { return new DoubleSourceSetup(); }
 }
 class DoubleSourceSetup extends Setup {
	String getName() { return "Two Sources"; }
	void select() {
	    setForceBar(30);
	}
	void doSetupSources() {
	    sourceChooser.select(SRC_2S1F);
	    setSources();
	    sources[0].y = gridSizeY/2 - 8;
	    sources[1].y = gridSizeY/2 + 8;
	    sources[0].x = sources[1].x = gridSizeX/2;
	}
	Setup createNext() { return new PlaneWaveSetup(); }
 }
 class PlaneWaveSetup extends Setup {
	String getName() { return "Plane Wave"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    brightnessBar.setValue(225);
	    setForceBar(30);
	}
	Setup createNext() { return new IntersectingPlaneWavesSetup(); }
 }
 class IntersectingPlaneWavesSetup extends Setup {
	String getName() { return "Intersecting Planes"; }
	void select() {
	    brightnessBar.setValue(70);
	    setForceBar(34);
	}
	void doSetupSources() {
	    sourceChooser.select(SRC_2S1F_PLANE);
	    setSources();
	    sources[0].y = sources[1].y = windowOffsetY;
	    sources[0].x = windowOffsetX+1;
	    sources[2].x = sources[3].x = windowOffsetX;
	    sources[2].y = windowOffsetY+1;
	    sources[3].y = windowOffsetY+windowHeight-1;
	}
	Setup createNext() { return new SingleWireSetup(); }
 }
 class SingleWireSetup extends Setup {
	String getName() { return "Single Wire"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    grid[gridSizeX/2+gw*(gridSizeY/2)].jz =  1;
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new DoubleWireSetup(); }
 }
 class DoubleWireSetup extends Setup {
	String getName() { return "Wire Pair"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    grid[gridSizeX/2+gw*(gridSizeY/2-3)].jz =  1;
	    grid[gridSizeX/2+gw*(gridSizeY/2+3)].jz =  1;
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new DipoleWireSetup(); }
 }
 class DipoleWireSetup extends Setup {
	String getName() { return "Dipole Wire Pair"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    grid[gridSizeX/2+gw*(gridSizeY/2-3)].jz =  1;
	    grid[gridSizeX/2+gw*(gridSizeY/2+3)].jz = -1;
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new MagnetPairSetup(); }
 }
 class MagnetPairSetup extends Setup {
	String getName() { return "Magnet Pair"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addMagnet(gridSizeX/2-windowWidth/4-3, gridSizeY/2-2,
		      gridSizeX/2-windowWidth/4+3, gridSizeY/2+2, -.2);
	    addMagnet(gridSizeX/2+windowWidth/4-3, gridSizeY/2-2,
		      gridSizeX/2+windowWidth/4+3, gridSizeY/2+2, -.2);
	}
	Setup createNext() { return new MagnetPairOppSetup(); }
 }
 class MagnetPairOppSetup extends Setup {
	String getName() { return "Magnet Pair, Opp"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addMagnet(gridSizeX/2-windowWidth/4-3, gridSizeY/2-2,
		      gridSizeX/2-windowWidth/4+3, gridSizeY/2+2, -.2);
	    addMagnet(gridSizeX/2+windowWidth/4-3, gridSizeY/2-2,
		      gridSizeX/2+windowWidth/4+3, gridSizeY/2+2, .2);
	}
	Setup createNext() { return new MagnetPairStackedSetup(); }
 }
 class MagnetPairStackedSetup extends Setup {
	String getName() { return "Magnet Pair Stacked"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addMagnet(gridSizeX/2-3, gridSizeY/2-10,
		      gridSizeX/2+3, gridSizeY/2-5, -.2);
	    addMagnet(gridSizeX/2-3, gridSizeY/2+5,
		      gridSizeX/2+3, gridSizeY/2+10, -.2);
	}
	Setup createNext() { return new MagnetPairStackedOppSetup(); }
 }
 class MagnetPairStackedOppSetup extends Setup {
	String getName() { return "Magnet Pair Stacked Opp"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addMagnet(gridSizeX/2-3, gridSizeY/2-10,
			gridSizeX/2+3, gridSizeY/2- 5, .2);
	    addMagnet(gridSizeX/2-3, gridSizeY/2+ 5,
			gridSizeX/2+3, gridSizeY/2+10, -.2);
	}
	Setup createNext() { return new UniformFieldSetup(); }
 }
 class UniformFieldSetup extends Setup {
	String getName() { return "Uniform Field"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addUniformField();
	    brightnessBar.setValue(225);
	}
	Setup createNext() { return new ApertureFieldSetup(); }
 }
 class ApertureFieldSetup extends Setup {
	String getName() { return "Field Near Aperture"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    float v = 2f/windowHeight;
	    int y;
	    for (y = 0; y != gridSizeY; y++)
		grid[windowOffsetX+gw*y].jz = v;
	    int r1 = gridSizeX/2-windowWidth/6;
	    int r2 = gridSizeX/2+windowWidth/6;
	    conductDrawRect(r1, windowOffsetY,
			    r1, windowOffsetY+windowHeight-1, 1);
	    conductDrawRect(r1, gridSizeY/2-6,
			    r1, gridSizeY/2+6, 0);
	    brightnessBar.setValue(740);
	}
	Setup createNext() { return new SolenoidSetup(); }
 }
 class SolenoidSetup extends Setup {
	String getName() { return "Solenoid"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int h = windowHeight/3;
	    double v = 2./h;
	    int cy = gridSizeY/2;
	    addSolenoid(gridSizeX/2-3, cy-h, gridSizeX/2+3, cy+h, v);
	}
	Setup createNext() { return new ToroidalSolenoidSetup(); }
 }
 class ToroidalSolenoidSetup extends Setup {
	String getName() { return "Toroidal Solenoid"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addWireCircle(gridSizeX/2, gridSizeY/2, windowHeight/3,
			  -30/360., 0, 360);
	    addWireCircle(gridSizeX/2, gridSizeY/2, windowHeight/6,
			   30/360., 0, 360);
	    brightnessBar.setValue(400);
	}
	Setup createNext() { return new CylinderSetup(); }
 }
 class CylinderSetup extends Setup {
	String getName() { return "Sphere"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int res = 4;
	    int cx = gridSizeX/2 * res;
	    int cy = gridSizeY/2 * res;
	    int r = windowHeight/5 * res;
	    double my = -1./(r*r);
	    int x, y;
	    for (x = -r; x <= r; x++) {
		int yd = (int) Math.sqrt(r*r-x*x);
		for (y = -yd; y <= yd; y++)
		    grid[( x+cx)/res+gw*((y+cy)/res)].my += my;
	    }
	    brightnessBar.setValue(450);
	}
	Setup createNext() { return new ThickWireSetup(); }
 }
 class ThickWireSetup extends Setup {
	String getName() { return "Thick Wire"; }
	void select() {
	    int r = windowWidth/4;
	    addThickWire(gridSizeX/2, gridSizeY/2, r, 1./(r*r));
	    sourceChooser.select(SRC_NONE);
	}
	Setup createNext() { return new HoleInWire1Setup(); }
 }
 class HoleInWire1Setup extends Setup {
	String getName() { return "Hole In Wire 1"; }
	void select() {
	    int r = windowWidth/3;
	    double j = 1./(r*r);
	    // avoid rounding error
	    j = ((int) (j*1024))/1024.;
	    if (j == 0)
		j = 1/1024.;
	    addThickWire(gridSizeX/2, gridSizeY/2, r, j);
	    addThickWire(gridSizeX/2, gridSizeY/2, r*2/3, -j);
	    sourceChooser.select(SRC_NONE);
	    brightnessBar.setValue(450);
	}
	Setup createNext() { return new HoleInWire2Setup(); }
 }
 class HoleInWire2Setup extends Setup {
	String getName() { return "Hole In Wire 2"; }
	void select() {
	    int r = windowWidth/3;
	    double j = 1./(r*r);
	    // avoid rounding error
	    j = ((int) (j*1024))/1024.;
	    if (j == 0)
		j = 1/1024.;
	    addThickWire(gridSizeX/2, gridSizeY/2, r, j);
	    addThickWire(gridSizeX/2+r/4, gridSizeY/2, r/2, -j);
	    sourceChooser.select(SRC_NONE);
	    brightnessBar.setValue(450);
	}
	Setup createNext() { return new FerromagnetSetup(); }
 }
 class FerromagnetSetup extends Setup {
	String getName() { return "Ferromagnet"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addSolenoid(gridSizeX/2-2, gridSizeY/2-2,
			gridSizeX/2+2, gridSizeY/2+2, .4);
	    int x1 = windowOffsetX+3;
	    int x2 = windowOffsetX+windowWidth-4;
	    permFillRect(x1, gridSizeY/2+4,
			 x2, gridSizeY/2+8, 5);
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new DiamagnetSetup(); }
 }
 class DiamagnetSetup extends Setup {
	String getName() { return "Diamagnet"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addSolenoid(gridSizeX/2-2, gridSizeY/2-2,
			gridSizeX/2+2, gridSizeY/2+2, .4);
	    int x1 = windowOffsetX+3;
	    int x2 = windowOffsetX+windowWidth-4;
	    permFillRect(x1, gridSizeY/2+4,
			 x2, gridSizeY/2+8, .5);
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new MeissnerEffectSetup(); }
 }
 class MeissnerEffectSetup extends Setup {
	String getName() { return "Meissner Effect"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    addSolenoid(gridSizeX/2-2, gridSizeY/2-2,
			gridSizeX/2+2, gridSizeY/2+2, .4);
	    int x1 = windowOffsetX+3;
	    int x2 = windowOffsetX+windowWidth-4;
	    conductFillRect(x1, gridSizeY/2+4,
			    x2, gridSizeY/2+8, 1);
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new HorseshoeSetup(); }
 }
 class HorseshoeSetup extends Setup {
	String getName() { return "Horseshoe Magnet"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int r1 = windowHeight/3;
	    int r2 = windowHeight/6;
	    addWireCircle(gridSizeX/2, gridSizeY/2, r1, -30/360., 0, 180);
	    addWireCircle(gridSizeX/2, gridSizeY/2, r2,  30/360., 0, 180);
	    int y;
	    for (y = 0; y != r2; y++) {
		int x;
		for (x = -r1; x <= r1; x++)
		    grid[gridSizeX/2+x+gw*(gridSizeY/2+y)].jz =
			grid[gridSizeX/2+x+gw*(gridSizeY/2+y-1)].jz;
	    }
	    brightnessBar.setValue(400);
	}
	Setup createNext() { return new Horseshoe2Setup(); }
 }
 class Horseshoe2Setup extends HorseshoeSetup {
	String getName() { return "Horseshoe + Load"; }
	void select() {
	    super.select();
	    int r1 = windowHeight/3;
	    int r2 = windowHeight/6;
	    permFillRect(gridSizeX/2-r1-3, gridSizeY/2+r2,
			 gridSizeX/2+r1+3, gridSizeY/2+r2*2, 5);
	    brightnessBar.setValue(225);
	}
	Setup createNext() { return new MagneticShielding1Setup(); }
 }
 class MagneticShielding1Setup extends Setup {
	String getName() { return "Magnetic Shielding 1"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    addSolenoid(gridSizeX/2-2, gridSizeY/2-2,
			gridSizeX/2+2, gridSizeY/2+2, .4);
	    int x1 = windowOffsetX+3;
	    int x2 = windowOffsetX+windowWidth-4;
	    permDrawRect(x1, gridSizeY/2+4,
			 x2, gridSizeY/2+5, 10);
	}
	Setup createNext() { return new MagneticShielding2Setup(); }
 }
 class MagneticShielding2Setup extends Setup {
	String getName() { return "Magnetic Shielding 2"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    addSolenoid(gridSizeX/2-2, gridSizeY/2-2,
			gridSizeX/2+2, gridSizeY/2+2, .4);
	    for (i = 6; i <= 8; i++)
		permDrawRect(gridSizeX/2-i, gridSizeY/2-i,
			     gridSizeX/2+i, gridSizeY/2+i, 10);
	}
	Setup createNext() { return new MagneticShielding3Setup(); }
 }
 class MagneticShielding3Setup extends Setup {
	String getName() { return "Magnetic Shielding 3"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    addSolenoid(cx-1, cy-1, cx+1, cy+1, 4);
	    int th;
	    brightnessBar.setValue(340);
	    for (th = 0; th != 360; th += 3) {
		double r1 = 4.9;
		int x = cx+(int) (Math.cos(th*pi/180)*r1);
		int y = cy-(int) (Math.sin(th*pi/180)*r1);
		addPerm(x, y, 5);
		double r2 = 5.9;
		x = cx+(int) (Math.cos(th*pi/180)*r2);
		y = cy-(int) (Math.sin(th*pi/180)*r2);
		addPerm(x, y, 5);
	    }
	}
	Setup createNext() { return new MagneticShielding4Setup(); }
 }
 class MagneticShielding4Setup extends Setup {
	String getName() { return "Magnetic Shielding 4"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    for (i = 6; i <= 8; i++)
		permDrawRect(gridSizeX/2-i, gridSizeY/2-i,
			     gridSizeX/2+i, gridSizeY/2+i, 10);
	    addUniformField();
	    brightnessBar.setValue(250);
	}
	Setup createNext() { return new MagneticCircuit1Setup(); }
 }
 class MagneticCircuit1Setup extends Setup {
	String getName() { return "Magnetic Circuit 1"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    for (i = 6; i <= 9; i++) {
		permDrawRect(gridSizeX/2-i, gridSizeY/2-i,
			     gridSizeX/2+i, gridSizeY/2+i, 10);
	    }
	    addSolenoid(gridSizeX/2+5, gridSizeY/2-1,
			gridSizeX/2+10, gridSizeY/2+1, .2);
	}
	Setup createNext() { return new MagneticCircuit2Setup(); }
 }
 class MagneticCircuit2Setup extends MagneticCircuit1Setup {
	String getName() { return "Magnetic Circuit 2"; }
	void select() {
	    super.select();
	    permFillRect(gridSizeX/2-9, gridSizeY/2-1,
			 gridSizeX/2-6, gridSizeY/2+1, 1);
	}
	Setup createNext() { return new MonopoleAttemptSetup(); }
 }
 class MonopoleAttemptSetup extends Setup {
	String getName() { return "Monopole Attempt"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int w = windowWidth/5;
	    int i;
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    int j;
	    for (j = 0; j != 3; j++) {
		for (i = -w+1; i < w; i++) {
		    grid[cx-w+gw*(cy+i)].mx = -1;
		    grid[cx+w+gw*(cy+i)].mx =  1;
		    grid[cx+i+gw*(cy-w)].my = -1;
		    grid[cx+i+gw*(cy+w)].my =  1;
		}
		w++;
	    }
	}
	Setup createNext() { return new QuadrupoleLensSetup(); }
 }
 class QuadrupoleLensSetup extends Setup {
	String getName() { return "Quadrupole Lens"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int x;
	    int w = gridSizeX/2-1;
	    int h = windowWidth/4;
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    float str = 1/(float) h;
	    for (x = -w; x <= w; x++) {
		int yd = (int) Math.sqrt(x*x+h*h);
		int y;
		for (y = yd; y <= w; y++) {
		    grid[cx+x+gw*(cy+y)].my = -str;
		    grid[cx+x+gw*(cy-y)].my = str;
		    grid[cx+y+gw*(cy+x)].mx = str;
		    grid[cx-y+gw*(cy+x)].mx = -str;
		}
	    }
	}
	Setup createNext() { return new HalbachArraySetup(); }
 }
 class HalbachArraySetup extends Setup {
	String getName() { return "Halbach Array"; }
	void select() {
	    brightnessBar.setValue(80);
	    sourceChooser.select(SRC_NONE);
	    int sz = 5;
	    int y1 = gridSizeY/2-sz/2;
	    int y2 = gridSizeY/2+sz/2;
	    int fx = gridSizeX/2 -sz/2 -2*sz;
	    int s1 = sz-1;
	    addMagnet(fx, y1, fx+s1, y2, -.2,   0); fx += sz;
	    addMagnet(fx, y1, fx+s1, y2,   0, -.2); fx += sz;
	    addMagnet(fx, y1, fx+s1, y2,  .2,   0); fx += sz;
	    addMagnet(fx, y1, fx+s1, y2,   0,  .2); fx += sz;
	    addMagnet(fx, y1, fx+s1, y2, -.2,   0); fx += sz;
	}
	Setup createNext() { return new HalbachArray2Setup(); }
 }
 class HalbachArray2Setup extends Setup {
	String getName() { return "Halbach Array (long)"; }
	void select() {
	    brightnessBar.setValue(80);
	    sourceChooser.select(SRC_NONE);
	    int sz = 3;
	    int y1 = gridSizeY/2-1;
	    int y2 = gridSizeY/2+1;
	    int fx = windowOffsetX + (windowWidth-windowWidth/sz*sz)/2;
	    int s1 = sz-1;
	    int i;
	    double dx = -.2; double dy = 0;
	    for (i = 0; i != windowWidth/sz; i++) {
		addMagnet(fx, y1, fx+s1, y2, dx, dy);
		fx += sz;
		double dq = dx; dx = -dy; dy = dq;
	    }
	}
	Setup createNext() { return new HalbachArray3Setup(); }
 }
 class HalbachArray3Setup extends Setup {
	String getName() { return "Halbach Array (dipole)"; }
	void select() {
	    brightnessBar.setValue(47);
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int r2 = windowWidth/3;
	    int r1 = r2/2;
	    int x, y;
	    for (x = -r2; x <= r2; x++)
		for (y = -r2; y <= r2; y++) {
		    double r = Math.sqrt(x*x+y*y);
		    if (r > r2+.9 || r < r1)
			continue;
		    double a = Math.atan2(y, x)*180/pi + 22.5 + 45;
		    if (a < 0)
			a += 360;
		    int ai = (int) (a/45);
		    float dq = ((ai & 2) == 0) ? .2f : -.2f;
		    float dx = 0, dy = 0;
		    if ((ai & 1) == 0)
			dx = dq;
		    else
			dy = dq;
		    grid[gridSizeX/2+x+gw*(gridSizeY/2+y)].mx = dx;
		    grid[gridSizeX/2+x+gw*(gridSizeY/2+y)].my = dy;
		}
	}
	Setup createNext() { return new HalbachArray4Setup(); }
 }
 class HalbachArray4Setup extends Setup {
	String getName() { return "Halbach Array (quadrupole)"; }
	void select() {
	    brightnessBar.setValue(255);
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int r2 = windowWidth/3;
	    int r1 = r2*2/3;
	    int x, y;
	    for (x = -r2; x <= r2; x++)
		for (y = -r2; y <= r2; y++) {
		    double r = Math.sqrt(x*x+y*y);
		    if (r > r2+.9 || r < r1)
			continue;
		    double a = Math.atan2(y, x)*180/pi + 11.25;
		    if (a < 0)
			a += 360;
		    int ai = (int) (a/22.5);
		    double da = -pi/2 + (pi*3/2)*ai/4.;
		    float dx = (float) Math.cos(da);
		    float dy = (float) Math.sin(da);
		    float d0 = -.06f;
		    grid[gridSizeX/2+x+gw*(gridSizeY/2+y)].mx = dx*d0;
		    grid[gridSizeX/2+x+gw*(gridSizeY/2+y)].my = dy*d0;
		}
	}
	Setup createNext() { return new DielectricSetup(); }
 }
 class DielectricSetup extends Setup {
	String getName() { return "Dielectric"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PACKET);
	    addMedium();
	    setForceBar(4);
	    brightnessBar.setValue(1000);
	    noFilter();
	}
	Setup createNext() { return new ConductReflectSetup(); }
 }
 class ConductReflectSetup extends Setup {
	String getName() { return "Fair Conductor Reflection"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PACKET);
	    addCondMedium(.5);
	    setForceBar(4);
	    brightnessBar.setValue(800);
	}
	Setup createNext() { return new Conduct2ReflectSetup(); }
 }
 class Conduct2ReflectSetup extends Setup {
	String getName() { return "Poor Conductor Reflection"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PACKET);
	    addCondMedium(.1);
	    setForceBar(4);
	    brightnessBar.setValue(800);
	}
	Setup createNext() { return new SkinEffect1Setup(); }
 }
 class SkinEffect1Setup extends Setup {
	String getName() { return "Skin Effect 1"; }
	void select() {
	    sourceChooser.select(SRC_1S1F);
	    addCondMedium(.33);
	    setForceBar(6);
	    brightnessBar.setValue(800);
	}
	Setup createNext() { return new SkinEffect2Setup(); }
 }
 class SkinEffect2Setup extends Setup {
	String getName() { return "Skin Effect 2"; }
	void select() {
	    sourceChooser.select(SRC_1S1F);
	    addCondMedium(.33);
	    setForceBar(40);
	    brightnessBar.setValue(800);
	}
	Setup createNext() { return new ResonantAbsSetup(); }
 }
 class ResonantAbsSetup extends Setup {
	String getName() { return "Resonant Absorption"; }
	void select() {
	    addResMedium();
	    setForceBar(23);
	    brightnessBar.setValue(200);
	    noFilter();
	}
	Setup createNext() { return new Dispersion1Setup(); }
 }
 class Dispersion1Setup extends ResonantAbsSetup {
	String getName() { return "Dispersion 1"; }
	void select() {
	    super.select();
	    setForceBar(14);
	}
	Setup createNext() { return new Dispersion2Setup(); }
 }
 class Dispersion2Setup extends ResonantAbsSetup {
	String getName() { return "Dispersion 2"; }
	void select() {
	    super.select();
	    setForceBar(21);
	}
	Setup createNext() { return new Dispersion3Setup(); }
 }
 class Dispersion3Setup extends ResonantAbsSetup {
	String getName() { return "Dispersion 3"; }
	void select() {
	    super.select();
	    setForceBar(25);
	}
	Setup createNext() { return new Dispersion4Setup(); }
 }
 class Dispersion4Setup extends ResonantAbsSetup {
	String getName() { return "Dispersion 4"; }
	void select() {
	    super.select();
	    setForceBar(39);
	}
	Setup createNext() { return new DiffusionSetup(); }
 }
 class DiffusionSetup extends Setup {
	String getName() { return "Magnetic Diffusion"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    conductFillRect(1, 1, gridSizeX-2, gridSizeY-2, .2);
	    addConductor(gridSizeX/2, gridSizeY/2, 0);
	    grid[gridSizeX/2+gw*(gridSizeY/2)].jz = 1;
	    brightnessBar.setValue(800);
	}
	Setup createNext() { return new OscRingSetup(); }
 }
 class OscRingSetup extends Setup {
	String getName() { return "Oscillating Ring"; }
	void doSetupSources() {
	    sourceChooser.select(SRC_2S1F);
	    setSources();
	    sources[0].y = sources[1].y = gridSizeY/2;
	    sources[0].x = gridSizeX/2 - 4;
	    sources[1].x = gridSizeX/2 + 4;
	    auxBar.setValue(40);
	}
	void select() {
	    setForceBar(26);
	    brightnessBar.setValue(86);
	}
	Setup createNext() { return new OscRingPairSetup(); }
 }
 class OscRingPairSetup extends Setup {
	String getName() { return "Oscillating Ring Pair"; }
	void doSetupSources() {
	    sourceChooser.select(SRC_4S1F);
	    setSources();
	    sources[0].y = sources[1].y = gridSizeY/2-2;
	    sources[2].y = sources[3].y = gridSizeY/2+2;
	    sources[0].x = sources[3].x = gridSizeX/2 - 2;
	    sources[1].x = sources[2].x = gridSizeX/2 + 2;
	    auxBar.setValue(40);
	}
	void select() {
	    setForceBar(26);
	    brightnessBar.setValue(86);
	}
	Setup createNext() { return new OscRingInductionSetup(); }
 }
 class OscRingInductionSetup extends Setup {
	String getName() { return "Ring Induction"; }
	void doSetupSources() {
	    sourceChooser.select(SRC_2S1F);
	    setSources();
	    sources[0].y = sources[1].y = gridSizeY/2-2;
	    sources[0].x = gridSizeX/2 - 4;
	    sources[1].x = gridSizeX/2 + 4;
	    auxBar.setValue(40);
	}
	void select() {
	    setForceBar(12);
	    brightnessBar.setValue(140);
	    addConductor(gridSizeX/2-4, gridSizeY/2+2, .5);
	    addConductor(gridSizeX/2+4, gridSizeY/2+2, .5);
	}
	Setup createNext() { return new WireInductionSetup(); }
 }
 class WireInductionSetup extends Setup {
	String getName() { return "Wire Induction"; }
	void doSetupSources() {
	    setForceBar(12);
	    sourceChooser.select(SRC_1S1F);
	    setSources();
	    sources[0].y = gridSizeY/2-2;
	    sources[0].x = gridSizeX/2;
	}
	void select() {
	    brightnessBar.setValue(140);
	    addConductor(gridSizeX/2, gridSizeY/2+2, .5);
	}
	Setup createNext() { return new OscRingEddy1Setup(); }
 }
 class OscRingEddy1Setup extends OscRingSetup {
	String getName() { return "Ring + Fair Conductor"; }
	void select() {
	    brightnessBar.setValue(280);
	    setForceBar(3);
	    conductFillRect(0, gridSizeY/2+3,
			    gridSizeX-1, gridSizeY/2+5, .5);
	}
	Setup createNext() { return new OscRingEddy2Setup(); }
 }
 class OscRingEddy2Setup extends OscRingSetup {
	String getName() { return "Ring + Poor Conductor"; }
	void select() {
	    brightnessBar.setValue(280);
	    setForceBar(3);
	    conductFillRect(0, gridSizeY/2+3,
			    gridSizeX-1, gridSizeY/2+5, .1);
	}
	Setup createNext() { return new WireEddy1Setup(); }
 }
 class WireEddy1Setup extends Setup {
	String getName() { return "Wire + Fair Conductor"; }
	void doSetupSources() {
	    setForceBar(3);
	    sourceChooser.select(SRC_1S1F);
	    setSources();
	    sources[0].y = gridSizeY/2;
	    sources[0].x = gridSizeX/2;
	}
	void select() {
	    brightnessBar.setValue(280);
	    conductFillRect(0, gridSizeY/2+3,
			    gridSizeX-1, gridSizeY/2+5, .5);
	}
	Setup createNext() { return new WireEddy2Setup(); }
 }
 class WireEddy2Setup extends WireEddy1Setup {
	String getName() { return "Wire + Poor Conductor"; }
	void select() {
	    brightnessBar.setValue(280);
	    conductFillRect(0, gridSizeY/2+3,
			    gridSizeX-1, gridSizeY/2+5, .1);
	}
	Setup createNext() { return new OscRingPermSetup(); }
 }
 class OscRingPermSetup extends Setup {
	String getName() { return "Rings + Ferromagnet"; }
	void doSetupSources() {
	    sourceChooser.select(SRC_2S1F);
	    setSources();
	    sources[0].y = sources[1].y = gridSizeY/2;
	    sources[0].x = gridSizeX/2 - 4;
	    sources[1].x = gridSizeX/2 + 4;
	    auxBar.setValue(40);
	}
	void select() {
	    setForceBar(6);
	    brightnessBar.setValue(94);
	    addConductor(gridSizeX/2-4, gridSizeY/2+10, .5);
	    addConductor(gridSizeX/2+4, gridSizeY/2+10, .5);
	    addConductor(gridSizeX/2-4, gridSizeY/2-10, .5);
	    addConductor(gridSizeX/2+4, gridSizeY/2-10, .5);
	    permFillRect(gridSizeX/2-2, gridSizeY/2-1,
			 gridSizeX/2+2, windowOffsetY+windowHeight-1, 50);
	    conductFillRect(gridSizeX/2-2, gridSizeY/2-1,
			    gridSizeX/2+2, windowOffsetY+windowHeight-1, .05);
	}
	Setup createNext() { return new SolenoidOscSetup(); }
 }
 class SolenoidOscSetup extends Setup {
	String getName() { return "Osc. Solenoid"; }
	void select() {
	    sourceChooser.select(SRC_2S1F_PLANE);
	    setSources();
	    int h = windowHeight/3;
	    int cy = gridSizeY/2;
	    sources[0].x = sources[1].x = gridSizeX/2-3;
	    sources[2].x = sources[3].x = gridSizeX/2+3;
	    sources[0].y = sources[2].y = cy-h;
	    sources[1].y = sources[3].y = cy+h;
	    auxBar.setValue(40);
	    setForceBar(9);
	}
	void doSetupSources() {}
	Setup createNext() { return new TransformerSetup(); }
 }
 class TransformerSetup extends SolenoidOscSetup {
	String getName() { return "Transformer"; }
	void select() {
	    super.select();
	    int h = windowHeight/3;
	    int cy = gridSizeY/2;
	    conductDrawRect(gridSizeX/2-5, cy-h, gridSizeX/2-5, cy+h, .9);
	    conductDrawRect(gridSizeX/2+5, cy-h, gridSizeX/2+5, cy+h, .9);
	    brightnessBar.setValue(340);
	}
	Setup createNext() { return new ToroidalSolenoidOscSetup(); }
 }
 class ToroidalSolenoidOscSetup extends Setup {
	String getName() { return "Osc Toroidal Solenoid"; }
	void select() {
	    setSources();
	    sources[0].x = windowOffsetX;
	    sources[0].y = windowOffsetY;
	    sourceChooser.select(SRC_NONE);
	    brightnessBar.setValue(300);
	    setForceBar(8);
	}
	void doSetupSources() {}
	void doStep() {
	    double val = grid[windowOffsetX+gw*windowOffsetY].jz * 30;
	    int i, j;
	    for (i = 0; i != windowWidth; i++)
		for (j = 0; j != windowHeight; j++)
		    grid[i+windowOffsetX+gw*(j+windowOffsetY)].jz = 0;
	    addWireCircle(gridSizeX/2, gridSizeY/2, windowHeight/3,
			  -val/360., 0, 360);
	    addWireCircle(gridSizeX/2, gridSizeY/2, windowHeight/6,
			   val/360., 0, 360);
	}
	Setup createNext() { return new CoaxCableSetup(); }
 }
 class CoaxCableSetup extends Setup {
	String getName() { return "Coaxial Cable"; }
	void select() {
	    setSources();
	    sources[0].x = windowOffsetX;
	    sources[0].y = windowOffsetY;
	    brightnessBar.setValue(300);
	    setForceBar(8);
	}
	void doSetupSources() {}
	void doStep() {
	    double val = grid[windowOffsetX+gw*windowOffsetY].jz * 30;
	    int i, j;
	    for (i = 0; i != windowWidth; i++)
		for (j = 0; j != windowHeight; j++)
		    grid[i+windowOffsetX+gw*(j+windowOffsetY)].jz = 0;
	    int sz = 3;
	    addWireCircle(gridSizeX/2, gridSizeY/2, sz, -val/360., 0, 360);
	    grid[gridSizeX/2+gw*(gridSizeY/2)].jz = val/16;
	}
	Setup createNext() { return new CondInOscFieldSetup(); }
 }
 class CondInOscFieldSetup extends Setup {
	String getName() { return "Cond. in Osc. Field"; }
	void doSetupSources() {}
	void select() {
	    sourceChooser.select(SRC_2S1F_PLANE);
	    setSources();
	    int h = windowHeight/3;
	    int cy = gridSizeY/2;
	    sources[0].x = sources[1].x = windowOffsetX;
	    sources[2].x = sources[3].x = windowOffsetX+windowWidth-1;
	    sources[0].y = sources[2].y = 0;
	    sources[1].y = sources[3].y = gridSizeY-1;
	    conductFillRect(gridSizeX/2-4, gridSizeY/2-4,
			    gridSizeX/2+4, gridSizeY/2+4, .4);
	    setForceBar(2);
	    auxBar.setValue(40);
	}
	Setup createNext() { return new MovingWireSetup(); }
 }
 class MovingWireSetup extends Setup {
	String getName() { return "Moving Wire"; }
	double y;
	int dir, delay;
	void select() {
	    sourceChooser.select(SRC_NONE);
	    y = windowOffsetY;
	    dir = 1;
	    delay = 0;
	    stopDelay = 200;
	    brightnessBar.setValue(200);
	}
	int stopDelay;
	void doStep() {
	    if (delay > 0) {
		delay--;
		filt();
		return;
	    }
	    int yi = (int) y;
	    int i;
	    for (i = 0; i != 2; i++) {
		int gi = gridSizeX/2+i+gw*yi;
		grid[gi].jz = 0;
		grid[gi+gw].jz = 0;
		grid[gi+gw+gw].jz = 0;
	    }
	    y += dir*.06;
	    int yi2 = (int) y;
	    if (yi != yi2) {
		if (yi2 == gridSizeY/2)
		    delay = stopDelay;
		if (yi2 == windowOffsetY ||
		    yi2 == windowOffsetY+windowHeight-3) {
		    dir = -dir;
		    delay = stopDelay;
		}
	    }
	    yi = yi2;
	    float yfrac = (float) (y-yi);
	    for (i = 0; i != 2; i++) {
		int gi = gridSizeX/2+i+gw*yi;
		grid[gi].jz = (1-yfrac)*.25;
		grid[gi+gw].jz = .25;
		grid[gi+gw+gw].jz = yfrac*.25;
	    }
	    filt();
	    calcBoundaries();
	}
	int filtstep = 0;
	void filt() {
	    // do filtering around the moving wire
	    int xi = gridSizeX/2;
	    int yi = (int) y;
	    int x, y;
	    int r = 10;
	    for (y = yi-r; y <= yi+r; y++)
		for (x = xi-r; x <= xi+r; x++) {
		    int gi = x+y*gw;
		    OscElement oe = grid[gi];
		    if (oe.jz != 0 || oe.conductivity > 0)
			continue;
		    double rr = Math.sqrt((y-yi)*(y-yi)+
					  (x-xi)*(x-xi));
		    double mult1 = 8+rr;
		    double mult2 = 4+mult1;
		    oe.az = (oe.az*mult1 + grid[gi-1].az + grid[gi+1].az +
			     grid[gi-gw].az + grid[gi+gw].az)/mult2;
		}
	}
	Setup createNext() { return new MovingWireTubeSetup(); }
 }
 class MovingWireTubeSetup extends MovingWireSetup {
	String getName() { return "Moving Wire in Tube"; }
	void select() {
	    super.select();
	    int w = 4;
	    conductFillRect(gridSizeX/2-w, windowOffsetY,
			    gridSizeX/2-w, windowOffsetY+windowHeight, .6);
	    w++;
	    conductFillRect(gridSizeX/2+w, windowOffsetY,
			    gridSizeX/2+w, windowOffsetY+windowHeight, .6);
	    stopDelay = 500;
	    brightnessBar.setValue(500);
	}
	Setup createNext() { return new MovingMagnetSetup(); }
 }
 class MovingMagnetSetup extends Setup {
	String getName() { return "Moving Magnet in Tube"; }
	double y;
	int dir, delay;
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int w = 5;
	    conductFillRect(gridSizeX/2-w, windowOffsetY,
			    gridSizeX/2-w, windowOffsetY+windowHeight, .6);
	    conductFillRect(gridSizeX/2+w, windowOffsetY,
			    gridSizeX/2+w, windowOffsetY+windowHeight, .6);
	    y = windowOffsetY;
	    dir = 1;
	    delay = 0;
	    brightnessBar.setValue(250);
	}
	void doStep() {
	    if (delay > 0) {
		delay--;
		filt();
		return;
	    }
	    int yi = (int) y;
	    int x, i;
	    for (x = -3; x <= 3; x++) {
		for (i = 0; i <= 2; i++)
		    grid[gridSizeX/2+x+gw*(yi+i)].my = 0;
	    }
	    y += dir*.06;
	    int yi2 = (int) y;
	    if (yi != yi2) {
		if (yi2 == gridSizeY/2)
		    delay = 500;
		if (yi2 == windowOffsetY ||
		    yi2 == windowOffsetY+windowHeight-3) {
		    dir = -dir;
		    delay = 500;
		}
	    }
	    yi = yi2;
	    float yfrac = (float) (y-yi);
	    for (x = -3; x <= 3; x++) {
		int gi = gridSizeX/2 + x + gw*yi;
		grid[gi].my = -(1-yfrac);
		grid[gi+gw].my = -1;
		grid[gi+gw+gw].my = -yfrac;
	    }
	    calcBoundaries();
	    /*for (x = -4; x <= 4; x++)
		for (i = -1; i <= 3; i++)
		grid[gridSizeX/2+x][yi+i].boundary = true;*/
	    filt();
	}
	int filtstep = 0;
	void filt() {
	    // run a filter around the moving wire
	    int xi = gridSizeX/2;
	    int yi = (int) y;
	    int x, y;
	    int r = 12;
	    double mult1 = 8;
	    double mult2 = 4+mult1;
	    for (y = yi-r; y <= yi+r; y++)
		for (x = xi-r; x <= xi+r; x++) {
		    int gi = x+gw*y;
		    OscElement oe = grid[gi];
		    if (oe.jz != 0 || oe.conductivity > 0)
			continue;
		    double jz = grid[gi-1].my - grid[gi+1].my +
			grid[gi+gw].mx - grid[gi-gw].mx;
		    if (jz != 0)
			continue;
		    oe.az = (oe.az*mult1 + grid[gi-1].az + grid[gi+1].az +
			     grid[gi-gw].az + grid[gi+gw].az)/mult2;
		}
	}
	Setup createNext() { return new RotatingMagnet1Setup(); }
 }
 class RotatingMagnet1Setup extends Setup {
	String getName() { return "Rotating Magnet 1"; }
	double mt;
	void select() {
	    sourceChooser.select(SRC_NONE);
	    grid[gridSizeX/2+gw*(gridSizeY/2)].mx = 1;
	    calcBoundaries();
	    setForceBar(10);
	    mt = 0;
	    brightnessBar.setValue(500);
	}
	void doStep() {
	    mt += forceBar.getValue() * .003;
	    grid[gridSizeX/2+gw*(gridSizeY/2)].mx =
		(float) Math.cos(mt);
	    grid[gridSizeX/2+gw*(gridSizeY/2)].my =
		(float) -Math.sin(mt);
	    doFilter();
	}
	Setup createNext() { return new RotatingMagnet2Setup(); }
 }
 class RotatingMagnet2Setup extends RotatingMagnet1Setup {
	String getName() { return "Rotating Magnet 2"; }
	void doStep() {
	    mt += forceBar.getValue() * .003;
	    grid[gridSizeX/2+gw*(gridSizeY/2)].mx =
		(float) Math.cos(mt);
	    grid[gridSizeX/2+gw*(gridSizeY/2)].my =
		(float) -Math.abs(Math.sin(mt));
	    doFilter();
	    brightnessBar.setValue(500);
	}
	Setup createNext() { return new Scattering1Setup(); }
 }
 class Scattering1Setup extends Setup {
	String getName() { return "Scattering 1"; }
	int ctr;
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    brightnessBar.setValue(100);
	    setForceBar(23);
	    int i, j;
	    for (i = gridSizeX/2-1; i <= gridSizeX/2+1; i++)
		for (j = gridSizeY/2-1; j <= gridSizeY/2+1; j++)
		    grid[i+gw*j].resonant = true;
	}
	void doStep() {
	    ctr++;
	    if (ctr >= 600 && ctr <= 700) {
		double c = (ctr-600)*.01;
		sourceMult = 1-c;
	    } else if (ctr >= 1100) {
		double c = (ctr-1100)*.01;
		sourceMult = c;
		if (ctr == 1200)
		    ctr = 0;
	    }
	}
	Setup createNext() { return new Scattering2Setup(); }
 }
 class Scattering2Setup extends Scattering1Setup {
	String getName() { return "Scattering 2"; }
	int ctr;
	void select() {
	    super.select();
	    setForceBar(16);
	}
	Setup createNext() { return new BigModeSetup(); }
 }
 class BigModeSetup extends Setup {
	String getName() { return "Big TM11 Mode"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int n = windowWidth*3/4;
	    int x = windowOffsetX+windowWidth/2-n/2;
	    int y = windowOffsetY+windowHeight/2-n/2;
	    for (i = 1; i != 4; i++)
		conductDrawRect(x-i, y-i, x+n+i-1, y+n+i-1, 1);
	    setupMode(x, y, n, n, 1, 1);
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new OneByOneModesSetup(); }
 }
 void setupMode(int x, int y, int sx, int sy, int nx, int ny) {
	int i, j;
	for (i = 0; i != sx; i++)
	    for (j = 0; j != sy; j++) {
		grid[i+x+gw*(j+y)].az = 2*
		    (Math.sin(pi*nx*(i+1)/(sx+1))*
		     Math.sin(pi*ny*(j+1)/(sy+1)));
		grid[i+x+gw*(j+y)].dazdt = 0;
	    }
	noFilter();
 }
 class OneByOneModesSetup extends Setup {
	String getName() { return "TM11 Modes"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    int y = 1;
	    int ny = 5;
	    while (y + ny < windowHeight) {
		int nx = ((y+ny)*(windowWidth-8)/windowHeight)+6;
		int y1 = y + windowOffsetY;
		int x1 = windowOffsetX + 1;
		conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		setupMode(x1, y1, nx, ny, 1, 1);
		y += ny+2;
	    }
	}
	Setup createNext() { return new OneByNModesSetup(); }
 }
 class OneByNModesSetup extends Setup {
	String getName() { return "TMn1 Modes"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    int y = 1;
	    int ny = 8;
	    int nx = windowWidth-2;
	    int mode = 1;
	    while (y + ny < windowHeight) {
		int y1 = y + windowOffsetY;
		int x1 = windowOffsetX + 1;
		conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		setupMode(x1, y1, nx, ny, mode, 1);
		y += ny+2;
		mode++;
	    }
	}
	Setup createNext() { return new NByNModesSetup(); }
 }
 class NByNModesSetup extends Setup {
	String getName() { return "TMnn Modes"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    int y = 1;
	    int modex, modey;
	    int maxmode = 3;
	    if (resBar.getValue() >= 70)
		maxmode++;
	    if (resBar.getValue() >= 100)
		maxmode++;
	    int ny = windowHeight/maxmode-2;
	    int nx = windowWidth/maxmode-2;
	    for (modex = 1; modex <= maxmode; modex++)
		for (modey = 1; modey <= maxmode; modey++) {
		    int x1 = windowOffsetX + 1 + (ny+2)*(modey-1);
		    int y1 = windowOffsetY + 1 + (nx+2)*(modex-1);
		    conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		    setupMode(x1, y1, nx, ny, modex, modey);
		}
	}
	Setup createNext() { return new OneByNModeCombosSetup(); }
 }
 class OneByNModeCombosSetup extends Setup {
	String getName() { return "TMn1 Mode Combos"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    int y = 1;
	    int ny = 8;
	    int nx = windowWidth-2;
	    while (y + ny < windowHeight) {
		int mode1 = getrand(8)+1;
		int mode2;
		do
		    mode2 = getrand(8)+1;
		while (mode1 == mode2);
		int y1 = y + windowOffsetY;
		int x1 = windowOffsetX + 1;
		conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		for (i = 0; i != nx; i++)
		    for (j = 0; j != ny; j++) {
			grid[i+x1+gw*(j+y1)].az = (float) 2*
			    (Math.sin(mode1*pi*(i+1)/(nx+1))*
			     Math.sin(pi*(j+1)/(ny+1))*.5 +
			     Math.sin(mode2*pi*(i+1)/(nx+1))*
			     Math.sin(pi*(j+1)/(ny+1))*.5);
			grid[i+x1+gw*(j+y1)].dazdt = 0;
		    }
		y += ny+2;
	    }
	    noFilter();
	}
	Setup createNext() { return new NByNModeCombosSetup(); }
 }
 class NByNModeCombosSetup extends Setup {
	String getName() { return "TMnn Mode Combos"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    int y = 1;
	    int maxmode = 2;
	    if (resBar.getValue() >= 70)
		maxmode++;
	    if (resBar.getValue() >= 100)
		maxmode++;
	    int ny = windowHeight/maxmode-2;
	    int nx = windowWidth/maxmode-2;
	    int gx, gy;
	    for (gx = 1; gx <= maxmode; gx++)
		for (gy = 1; gy <= maxmode; gy++) {
		    int mode1x = getrand(4)+1;
		    int mode1y = getrand(4)+1;
		    int mode2x, mode2y;
		    do {
			mode2x = getrand(4)+1;
			mode2y = getrand(4)+1;
		    } while (mode1x == mode2x && mode1y == mode2y);
		    int x1 = windowOffsetX + 1 + (ny+2)*(gx-1);
		    int y1 = windowOffsetY + 1 + (nx+2)*(gy-1);
		    conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		    for (i = 0; i != nx; i++)
			for (j = 0; j != ny; j++) {
			    grid[i+x1+gw*(j+y1)].az = 2*
				(Math.sin(mode1x*pi*(i+1)/(nx+1))*
				 Math.sin(mode1y*pi*(j+1)/(ny+1))*.5 +
				 Math.sin(mode2x*pi*(i+1)/(nx+1))*
				 Math.sin(mode2y*pi*(j+1)/(ny+1))*.5);
			    grid[i+x1+gw*(j+y1)].dazdt = 0;
			}
		}
	    noFilter();
	}
	Setup createNext() { return new TriangleModesSetup(); }
 }
 class TriangleModesSetup extends Setup {
	String getName() { return "Triangle Modes"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    for (i = 0; i != 2; i++)
		for (j = 0; j != 2; j++) {
		    int x = windowOffsetX+windowWidth*i/2+1;
		    int y = windowOffsetY+windowHeight*j/2+1;
		    int w = windowWidth/2-2;
		    int h = windowHeight/2-2;
		    int k;
		    for (k = 0; k != w; k++)
			conductDrawRect(x+k+1, y+k, x+w, y+k, 1);
		    conductDrawRect(x-1, y-1, x+w, y+h, 1);
		    int mx = 0, my = 0;
		    switch (j*2+i) {
		    case 0: mx = 1; my = 2; break;
		    case 1: mx = 1; my = 3; break;
		    case 2: mx = 2; my = 3; break;
		    case 3: mx = 1; my = 4; break;
		    }
		    int xi, yi;
		    for (yi = 0; yi != h; yi++) {
			for (xi = 0; xi <= yi; xi++)
			    grid[x+xi+gw*(y+yi)].az =
				(Math.sin(mx*pi*(xi+1)/(w+2))*
				 Math.sin(my*pi*(yi+2)/(h+2)) -
				 Math.sin(my*pi*(xi+1)/(w+2))*
				 Math.sin(mx*pi*(yi+2)/(h+2)));
			    grid[x+xi+gw*(y+yi)].dazdt = 0;
			}
		}
	    brightnessBar.setValue(114);
	    noFilter();
	}
	Setup createNext() { return new CircleModes1Setup(); }
 }
 class CircleModes1Setup extends Setup {
	String getName() { return "Circular Modes 1"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    for (i = 0; i != 2; i++)
		for (j = 0; j != 2; j++) {
		    int x = windowOffsetX+windowWidth*i/2+1;
		    int y = windowOffsetY+windowHeight*j/2;
		    int w = windowWidth/2-2;
		    int h = windowHeight/2-2;
		    conductFillRect(x-1, y-1, x+w+1, y+h+1, 1);
		    int k, r = w/2;
		    double jj[] = new double[3];
		    double omega = zeroj(i, j+1)/r;
		    double mult = 1;
		    switch (j*2+i) {
		    case 1: mult = 1/.6; break;
		    case 2: mult = 2; break;
		    case 3: mult = 5/.6; break;
		    }
		    for (k = -r; k <= r; k++) {
			int yy = (int) Math.sqrt(r*r-k*k-.00001);
			conductFillRect(x+r+k, y+r-yy, x+r+k, y+r+yy, 0);
			int l;
			for (l = -yy; l <= yy; l++) {
			    double rr = Math.sqrt(k*k+l*l);
			    double r0 = rr*omega;
			    double angfunc = (i == 0) ? 1 : l/rr;
			    if (rr == 0)
				angfunc = (i == 0) ? 1 : 0;
			    bess(i, r0, jj);
			    grid[x+r+k+gw*(y+r+l)].az = jj[i+1]*angfunc*mult;
			}
		    }
		}
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new CircleModes2Setup(); }
 }
 class CircleModes2Setup extends Setup {
	String getName() { return "Circular Modes 2"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int x = windowOffsetX+1;
	    int y = windowOffsetY+1;
	    int w = windowWidth-2;
	    int h = windowHeight-2;
	    conductFillRect(x-1, y-1, x+w+1, y+h+1, 1);
	    int k, r = w/2;
	    double jj[] = new double[3];
	    double omega = zeroj(1, 1)/r;
	    double tmult = 2*r/16.;
	    for (k = -r; k <= r; k++) {
		int yy = (int) Math.sqrt(r*r-k*k-.00001);
		conductFillRect(x+r+k, y+r-yy, x+r+k, y+r+yy, 0);
		int l;
		for (l = -yy; l <= yy; l++) {
		    double rr = Math.sqrt(k*k+l*l);
		    double r0 = rr*omega;
		    double angfunc1 = l/rr;
		    double angfunc2 = k/rr;
		    if (rr == 0)
			angfunc1 = angfunc2 = 0;
		    bess(1, r0, jj);
		    grid[x+r+k+gw*(y+r+l)].az = jj[2]*angfunc1*tmult;
		    grid[x+r+k+gw*(y+r+l)].dazdt = jj[2]*angfunc2;
		}
	    }
	    brightnessBar.setValue(200);
	}
	Setup createNext() { return new Waveguides1Setup(); }
 }

 double zeroj( int m_order, int n_zero) {
	// Zeros of the Bessel function J(x)
	// Inputs
	//   m_order   Order of the Bessel function
	//   n_zero    Index of the zero (first, second, etc.)
	// Output
	//   z         The "n_zero"th zero of the Bessel function
	
	//* Use asymtotic formula for initial guess
	double beta = (n_zero + 0.5*m_order - 0.25)*(3.141592654);
	double mu = 4*m_order*m_order;
	double beta8 = 8*beta;
	double z = beta - (mu-1)/beta8 
	    - 4*(mu-1)*(7*mu-31)/(3*beta8*beta8*beta8);
	
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


 class Waveguides1Setup extends Setup {
	String getName() { return "Waveguides 1"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int i, j;
	    int x = 1;
	    int nx = 5;
	    int y1 = windowOffsetY + 2;
	    while (x + nx < windowWidth) {
		int x1 = x + windowOffsetX;
		conductDrawRect(x1-1,  y1-1, x1-1,  gridSizeY-1, 1);
		conductDrawRect(x1+nx, y1-1, x1+nx, gridSizeY-1, 1);
		nx += 2;
		x += nx;
	    }
	    conductDrawRect(x-1+windowOffsetX, y1-1, gridSizeX-1, y1-1, 1);
	    brightnessBar.setValue(140);
	    setForceBar(28);
	}
	Setup createNext() { return new Waveguides2Setup(); }
 }
 class Waveguides2Setup extends Waveguides1Setup {
	String getName() { return "Waveguides 2"; }
	void select() {
	    super.select();
	    setForceBar(17);
	}
	Setup createNext() { return new Waveguides3Setup(); }
 }
 class Waveguides3Setup extends Setup {
	String getName() { return "Waveguides 3"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int i, j;
	    int x = 1;
	    int nx = 8;
	    int y1 = windowOffsetY + 2;
	    conductDrawRect(windowOffsetX+1,             y1-1,
			    windowOffsetX+windowWidth-1, y1-1, 1);
	    x = 1;
	    j = 0;
	    while (x + nx < windowWidth && j < nx) {
		int x1 = x + windowOffsetX;
		conductDrawRect(x1-1,  y1-1, x1-1,  gridSizeY-1, 1);
		conductDrawRect(x1+nx, y1-1, x1+nx, gridSizeY-1, 1);
		addConductor(x1+j++, y1-1, 0);
		x += nx+2;
		if (resBar.getValue() == 32 && j == 2)
		    j++;
	    }
	    brightnessBar.setValue(1000);
	    setForceBar(32);
	}
	Setup createNext() { return new Waveguides4Setup(); }
 }
 class Waveguides4Setup extends Waveguides3Setup {
	String getName() { return "Waveguides 4"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int i;
	    int x = 1;
	    int nx = 9;
	    int y1 = windowOffsetY + 2;
	    int ny = windowHeight-1;
	    x = 1;
	    while (x + nx < windowWidth) {
		int x1 = x + windowOffsetX;
		conductDrawRect(x1-1,  y1-1, x1-1,  y1+ny-2, 1);
		conductDrawRect(x1+nx, y1-1, x1+nx, y1+ny-2, 1);
		x += nx+2;
	    }
	    brightnessBar.setValue(480);
	    setForceBar(40);
	}
	void doStep() {
	    int y = windowOffsetY;
	    int nx = 9;
	    int x = 1;
	    int g = 1;
	    while (x + nx < windowWidth) {
		int x1 = x + windowOffsetX;
		int j;
		int n1 = 1;
		int n2 = 1;
		switch (g) {
		case 1: n1 = n2 = 1; break;
		case 2: n1 = n2 = 2; break;
		case 3: n1 = n2 = 3; break;
		case 4: n1 = 1; n2 = 2; break;
		case 5: n1 = 1; n2 = 3; break;
		case 6: n1 = 2; n2 = 3; break;
		default: n1 = n2 = 0; break;
		}
		for (j = 0; j != nx; j++) {
		    grid[x1+j+gw*y].az = grid[x1+j+gw*y].jz *
			(Math.sin(pi*n1*(j+1)/(nx+1)) +
			 Math.sin(pi*n2*(j+1)/(nx+1)));
		    grid[x1+j+gw*y].jz = 0;
		}
		x += nx+2;
		g++;
	    }
	}
	Setup createNext() { return new ResonantCavitiesSetup(); }
 }

 class ResonantCavitiesSetup extends Setup {
	String getName() { return "Resonant Cavities"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int i, j;
	    int x = 1;
	    int nx = 5;
	    int y1 = windowOffsetY + 11;
	    while (x + nx < windowWidth) {
		int ny = ((x+nx)*(windowHeight-18)/windowWidth)+6;
		int x1 = x + windowOffsetX;
		for (i = 0; i != ny+2; i++) {
		    addConductor(x1- 1, y1+i-1, 1);
		    addConductor(x1+nx, y1+i-1, 1);
		}
		for (j = 0; j != nx+2; j++) {
		    addConductor(x1+j-1, y1-1, 1);
		    addConductor(x1+j-1, y1+ny, 1);
		}
		addConductor(x1+nx/2, y1-1, 0);
		x += nx+2;
	    }
	    x--;
	    for (; x < windowWidth; x++)
		addConductor(x+windowOffsetX, y1-1, 1);
	    brightnessBar.setValue(300);
	    setForceBar(38);
	}
	Setup createNext() { return new SingleSlitSetup(); }
 }

 class SingleSlitSetup extends Setup {
	String getName() { return "Single Slit"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int x = gridSizeX/2;
	    int y = windowOffsetY+4;
	    conductFillRect(0, y, gridSizeX-1, y+2, 1);
	    conductFillRect(x-7, y, x+7, y+2, 0);
	    brightnessBar.setValue(275);
	    setForceBar(35);
	}
	Setup createNext() { return new DoubleSlitSetup(); }
 }
 class DoubleSlitSetup extends Setup {
	String getName() { return "Double Slit"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int x = gridSizeX/2;
	    int y = windowOffsetY+4;
	    conductFillRect(0, y, gridSizeX-1, y+2, 1);
	    conductFillRect(x-7, y, x-5, y+2, 0);
	    conductFillRect(x+5, y, x+7, y+2, 0);
	    brightnessBar.setValue(366);
	    setForceBar(35);
	}
	Setup createNext() { return new TripleSlitSetup(); }
 }
 class TripleSlitSetup extends Setup {
	String getName() { return "Triple Slit"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int x = gridSizeX/2;
	    int y = windowOffsetY+4;
	    conductFillRect(0, y, gridSizeX-1, y+2, 1);
	    conductFillRect(x-13, y, x-11, y+2, 0);
	    conductFillRect(x -1, y, x +1, y+2, 0);
	    conductFillRect(x+11, y, x+13, y+2, 0);
	    brightnessBar.setValue(310);
	    setForceBar(35);
	}
	Setup createNext() { return new ObstacleSetup(); }
 }
 class ObstacleSetup extends Setup {
	String getName() { return "Obstacle"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int x = gridSizeX/2;
	    int y = windowOffsetY+6;
	    conductFillRect(x-7, y, x+7, y+2, 1);
	    brightnessBar.setValue(400);
	    setForceBar(35);
	}
	Setup createNext() { return new HalfPlaneSetup(); }
 }
 class HalfPlaneSetup extends Setup {
	String getName() { return "Half Plane"; }
	void select() {
	    sourceChooser.select(SRC_1S1F_PLANE);
	    int x = windowOffsetX+windowWidth/2;
	    int i;
	    conductFillRect(windowOffsetX+windowWidth*2/3, windowOffsetY+3,
			    windowOffsetY+windowWidth-1, windowOffsetY+5, 1);
	    brightnessBar.setValue(150);
	    setForceBar(35);
	}
	Setup createNext() { return new LloydsMirrorSetup(); }
 }
 class LloydsMirrorSetup extends Setup {
	String getName() { return "Lloyd's Mirror"; }
	void select() {
	    setSources();
	    sources[0].x = windowOffsetX;
	    sources[0].y = windowOffsetY + windowHeight*3/4;
	    brightnessBar.setValue(120);
	    setForceBar(40);
	    conductDrawRect(0, windowOffsetY+windowHeight-1,
			    gridSizeX-1, windowOffsetY+windowHeight-1, 1);
	}
	void doSetupSources() {}
	Setup createNext() { return null; }
 }

 void addThickWire(int cx, int cy, int r, double j) {
	int res = 4;
	cx *= res;
	cy *= res;
	r *= res;
	j /= (res*res);
	int x, y;
	for (x = -r; x <= r; x++) {
	    int yd = (int) Math.sqrt(r*r-x*x);
	    for (y = -yd; y <= yd; y++)
		grid[( x+cx)/res+gw*((y+cy)/res)].jz += j;
	}
 }

 void addWireCircle(int cx, int cy, int r, double j, int deg1, int deg2) {
	int res = 4;
	r *= res;
	j /= (res*res);
	int th;
	for (th = deg1; th != deg2; th++) {
	    int x = cx+(int) (Math.cos(th*pi/180)*r/res);
	    int y = cy-(int) (Math.sin(th*pi/180)*r/res);
	    grid[x+gw*y].jz += j;
	}
 }

 void addConductor(int x, int y, double cv) {
	OscElement oe = grid[x+gw*y];
	oe.conductivity = (float) cv;
	if (cv == 1)
	    oe.az = oe.dazdt = 0;
 }
 void addPerm(int x, int y, double pm) {
	OscElement oe = grid[x+gw*y];
	oe.perm = (float) pm;
	oe.conductivity = (pm == 1) ? 0 : .5f;
 }
 void conductFillRect(int x, int y, int x2, int y2, double cv) {
	int i, j;
	for (i = x; i <= x2; i++)
	    for (j = y; j <= y2; j++)
		addConductor(i, j, (float) cv);
 }
 void conductDrawRect(int x, int y, int x2, int y2, double cvd) {
	int i;
	float cv = (float) cvd;
	for (i = x; i <= x2; i++) {
	    addConductor(i, y, cv);
	    addConductor(i, y2, cv);
	}
	for (i = y; i <= y2; i++) {
	    addConductor(x,  i, cv);
	    addConductor(x2, i, cv);
	}
 }
 void permDrawRect(int x, int y, int x2, int y2, double pm) {
	int i;
	for (i = x; i <= x2; i++) {
	    addPerm(i, y,  pm);
	    addPerm(i, y2, pm);
	}
	for (i = y; i <= y2; i++) {
	    addPerm(x,  i, pm);
	    addPerm(x2, i, pm);
	}
 }
 void permFillRect(int x, int y, int x2, int y2, double pm) {
	int i, j;
	for (i = x; i <= x2; i++)
	    for (j = y; j <= y2; j++)
		addPerm(i, j, pm);
 }
}
