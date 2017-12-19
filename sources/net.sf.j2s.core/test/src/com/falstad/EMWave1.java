package com.falstad;

//EMWave1.java (c) 2002 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= EMWave1
//web_Description= A simulation that demonstrates electrodynamics in two dimensions.
//web_JavaVersion= http://www.falstad.com/emwave1/
//web_AppletImage= emwave1.png
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
// Added Container main and added components to main
//
// resize and show --> useFrame options
//
// added triggerShow()
//
// Moves showFrame to applet.init()

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

class EMWave1Canvas extends Canvas {
 EMWave1Frame pg;
 EMWave1Canvas(EMWave1Frame p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateEMWave1(g);
 }
 public void paintComponent(Graphics g) {
	pg.updateEMWave1(g);
 }
};

class EMWave1Layout implements LayoutManager {
 public EMWave1Layout() {}
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

public class EMWave1 extends Applet implements ComponentListener {
 static EMWave1Frame ogf;
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
     ogf = new EMWave1Frame(null);
     ogf.init();
 }

 void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new EMWave1Frame(this);
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

class EMWave1Frame extends Frame
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
	return "EMWave1 by Paul Falstad";
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
 Scrollbar EBrightnessBar;
 Scrollbar lineDensityBar;
 Scrollbar auxBar;
 Label auxLabel;
 double forceTimeZero;
 double sourceMult;
 static final double pi = 3.14159265358979323846;
 OscElement grid[];
 int gw;
 OscSource sources[];
 
 static final int MODE_PERF_CONDUCTOR = 0;
 static final int MODE_M_POS = 1;
 static final int MODE_M_NEG = 2;
 static final int MODE_CLEAR = 3;
 
 static final int VIEW_E = 0;
 static final int VIEW_E_LINES = 1;
 static final int VIEW_B = 2;
 static final int VIEW_Q = 3;
 static final int VIEW_J = 4;
 static final int VIEW_E_B = 5;
 static final int VIEW_E_LINES_B = 6;
 static final int VIEW_E_B_Q_J = 7;
 static final int VIEW_E_LINES_B_Q_J = 8;
 static final int VIEW_E_Q = 9;
 static final int VIEW_E_LINES_Q = 10;
 static final int VIEW_E_B_J = 11;
 static final int VIEW_E_LINES_B_J = 12;
 static final int VIEW_POYNTING = 13;
 static final int VIEW_ENERGY = 14;
 static final int VIEW_POYNTING_ENERGY = 15;
 static final int VIEW_DISP_CUR = 16;
 static final int VIEW_DISP_J = 17;
 static final int VIEW_DISP_J_B = 18;
 static final int VIEW_DB_DT = 19;
 static final int VIEW_NONE = -1;
 static final int TYPE_CONDUCTOR = 1;
 static final int TYPE_CURRENT = 2;
 static final int TYPE_NONE = 0;
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
 int sourceType;
 int auxFunction;
 boolean sourcePacket = false;
 static final int SRC_NONE = 0;
 static final int SRC_1PLANE = 1;
 static final int SRC_2PLANE = 2;
 static final int SRC_1PLANE_PACKET = 3;
 static final int SRC_1ANTENNA = 4;
 static final int SRC_2ANTENNA = 5;
 static final int SRC_1LOOP = 6;
 static final int SRC_1LOOP_PACKET = 7;
 static final int SRC_PLANE = 1;
 static final int SRC_ANTENNA = 2;
 static final int SRC_LOOP = 3;

 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 EMWave1Canvas cv;
 EMWave1 applet;

 EMWave1Frame(EMWave1 a) {
	super("TE Electrodynamics Applet v1.4a");
	applet = a;
	useFrame = true;
	showControls = true;
 }

 Container main;
 
 public boolean useFrame;
 boolean showControls;
 
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
	
	setupList = new Vector();
	Setup s = new PlaneWaveSetup();
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
	int res = 40; // was 34

	sources = new OscSource[4];
	main.setLayout(new EMWave1Layout());
	cv = new EMWave1Canvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);

	setupChooser = new Choice();
	for (i = 0; i != setupList.size(); i++)
	    setupChooser.add("Setup: " +
			     ((Setup) setupList.elementAt(i)).getName());
	setupChooser.select(4);
	setup = (Setup) setupList.elementAt(4);
	setupChooser.addItemListener(this);
	main.add(setupChooser);

	sourceChooser = new Choice();
	sourceChooser.add("No Sources");
	sourceChooser.add("1 Plane Src");
	sourceChooser.add("2 Plane Srcs");
	sourceChooser.add("1 Plane Src (Packets)");
	sourceChooser.add("1 Antenna Src");
	sourceChooser.add("2 Antenna Srcs");
	sourceChooser.add("1 Loop Src");
	sourceChooser.add("1 Loop Src (Packets)");
	sourceChooser.select(SRC_1PLANE);
	sourceChooser.addItemListener(this);
	main.add(sourceChooser);

	modeChooser = new Choice();
	modeChooser.add("Mouse = Add Perf. Conductor");
	modeChooser.add("Mouse = Clear");
	modeChooser.addItemListener(this);
	main.add(modeChooser);

	viewChooser = new Choice();
	viewChooser.add("Show Electric Field (E)");
	viewChooser.add("Show E lines");
	viewChooser.add("Show Magnetic Field (B)");
	viewChooser.add("Show Charge (rho)");
	viewChooser.add("Show Current (j)");
	viewChooser.add("Show E/B");
	viewChooser.add("Show E lines/B");
	viewChooser.add("Show E/B/rho/j");
	viewChooser.add("Show E lines/B/rho/j");
	viewChooser.add("Show E/rho");
	viewChooser.add("Show E lines/rho");
	viewChooser.add("Show E/B/j");
	viewChooser.add("Show E lines/B/j");
	viewChooser.add("Show Poynting Vector");
	viewChooser.add("Show Energy Density");
	viewChooser.add("Show Poynting/Energy");
	viewChooser.add("Show Disp Current");
	viewChooser.add("Show Disp + j");
	viewChooser.add("Show Disp + j/B");
	viewChooser.add("Show dB/dt");
	viewChooser.addItemListener(this);
	main.add(viewChooser);
	viewChooser.select(VIEW_E_B_Q_J);

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
	main.add(resBar = new Scrollbar(Scrollbar.HORIZONTAL, res, 5, 16, 140));
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

	main.add(new Label("E Field Brightness", Label.CENTER));
	main.add(EBrightnessBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    100, 1, 1, 800));
	EBrightnessBar.addAdjustmentListener(this);

	main.add(new Label("Line Density", Label.CENTER));
	main.add(lineDensityBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    50, 1, 10, 100));
	lineDensityBar.addAdjustmentListener(this);

	main.add(auxLabel = new Label("", Label.CENTER));
	main.add(auxBar = new Scrollbar(Scrollbar.HORIZONTAL, 1, 1, 1, 40));
	auxBar.addAdjustmentListener(this);

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
	grid = new OscElement[gridSizeXY];
	int i, j;
	for (i = 0; i != gridSizeXY; i++)
	    grid[i] = new OscElement();
	doSetup();
 }
 
 void setDamping() {
	int i, j;
	for (i = 0; i != gridSizeXY; i++)
	    grid[i].damp = 1;
	for (i = 0; i != windowOffsetX; i++)
	    for (j = 0; j != gridSizeX; j++) {
		double da = Math.exp(-(windowOffsetX-i)*.0022);
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
	for (x = 0; x != gridSizeXY; x++)
	    grid[x].az = grid[x].dazdt = 0;
	t = 0;
	doFilter();
 }

 void doClearAll() {
	int x, y;
	for (x = 0; x != gridSizeXY; x++) {
	    grid[x].jx = grid[x].jy = 0;
	    grid[x].az = grid[x].dazdt = 0;
	    grid[x].boundary = false;
	    grid[x].gray = false;
	    grid[x].conductor = false;
	    grid[x].col = 0;
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
		grid[x+y*gw].conductor = grid[x+windowOffsetY*gw].conductor;
		grid[x+gw*(gridSizeY-y-1)].conductor =
		    grid[x+gw*(gridSizeY-windowOffsetY-1)].conductor;
	    }
	for (y = 0; y < gridSizeY; y++)
	    for (x = 0; x < windowOffsetX; x++) {
		grid[x+gw*y].conductor = grid[windowOffsetX+gw*y].conductor;
		grid[gridSizeX-x-1+gw*y].conductor =
		    grid[gridSizeX-windowOffsetX-1+gw*y].conductor;
	    }
	for (x = 1; x < gridSizeX-1; x++)
	    for (y = 1; y < gridSizeY-1; y++) {
		int gi = x+gw*y;
		OscElement oe = grid[gi];
		boolean cond = oe.conductor;
		OscElement e1 = grid[gi-1];
		OscElement e2 = grid[gi+1];
		OscElement e3 = grid[gi-gw];
		OscElement e4 = grid[gi+gw];

		oe.gray = oe.conductor;
		    
		// mark all grid squares where the permeability, medium,
		// or magnetization is different from one of the neighbors
		if (e1.conductor != cond || e2.conductor != cond ||
		    e3.conductor != cond || e4.conductor != cond) {
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
 
 public void updateEMWave1(Graphics realg) {
	if (winSize == null || winSize.width == 0) {
	    // this works around some weird bug in IE which causes the
	    // applet to not show up properly the first time after
	    // a reboot.
	    handleResize();
	    return;
	}
	double tadd = 0;
	if (!stoppedCheck.getState()) {
	    int val = 5; // 5; //speedBar.getValue();
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
		double tadd2 = tadd*tadd;
		double forcecoef = 1;
		int curMedium = 0;
		OscElement oew, oee, oen, oes, oe;
		double previ, nexti, prevj, nextj, basis, a, b, o;
		for (j = 1; j != mxy; j++) {
		    int gi = j*gw+1;
		    int giEnd = gi+mxx-1;
		    oe = grid[gi-1];
		    oee = grid[gi];
		    for (; gi != giEnd; gi++) {
			oew = oe;
			oe = oee;
			oee = grid[gi+1];
			if (oe.conductor)
			    continue;

			oen = grid[gi-gw];
			oes = grid[gi+gw];

			if (oe.boundary) {
			    double az = oe.az;
			    previ = oew.az-az;
			    if (oew.conductor)
				previ = (oee.conductor) ? 0 : oee.az-az;
			    nexti = oee.az-az;
			    if (oee.conductor)
				nexti = (oew.conductor) ? 0 : oew.az-az;
			    prevj = oen.az-az;
			    if (oen.conductor)
				prevj = (oes.conductor) ? 0 : oes.az-az;
			    nextj = oes.az-az;
			    if (oes.conductor)
				nextj = (oen.conductor) ? 0 : oen.az-az;
			    basis = (nexti+previ+nextj+prevj)*.25;

			    double jj = oes.jx - oen.jx + oew.jy - oee.jy;
			    a = basis + jj;
			} else {
			    // easy way
			    previ = oew.az;
			    nexti = oee.az;
			    prevj = oen.az;
			    nextj = oes.az;
			    basis = (nexti+previ+nextj+prevj)*.25;
			    a = oes.jx - oen.jx + oew.jy - oee.jy
				- (oe.az - basis);
			}
			o = oe.dazdt;
			oe.dazdt = (oe.dazdt * oe.damp) + a * forcecoef;
			oe.dazdt2 = oe.dazdt-o;
		    }
		}
		for (j = 1; j != mxy; j++) {
		    int gi = j*gw+1;
		    int giEnd = gi-1+mxx;
		    for (; gi != giEnd; gi++) {
			oe = grid[gi];
			oe.az += oe.dazdt * tadd2;
		    }
		}
		t += tadd;
		filterGrid();
		long tm = System.currentTimeMillis();
		/*System.out.println(tm-lastTime);
		  System.out.println(speedValue*1000/(tm-lastTime));*/
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
	    int col = 0xFFFFFFFF;
	    if (sourceType == SRC_ANTENNA && (i % 2) == 0)
		col = 0xFFFFFF00;
	    plotSource(i, xx, yy, col);
	}
	
	if (imageSource != null)
	    imageSource.newPixels();
	
	realg.drawImage(dbimage, 0, 0, this);
	if (!stoppedCheck.getState())
	    cv.repaint(pause);
 }

 void plotPixel(int x, int y, int pix) {
	if (x < 0 || x >= winSize.width)
	    return;
	try { pixels[x+y*winSize.width] = pix; } catch (Exception e) {}
 }

 // draw a circle the slow and dirty way
 void plotSource(int n, int xx, int yy, int col) {
	int rad = sourceRadius;
	int j;
	if (n == selectedSource)
	    col ^= 0x00808080;
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
	double emult = EBrightnessBar.getValue() / 100.0;
	int ix = 0;
	int i, j, k, l;

	int viewScalar, viewVector, viewScalarCond, viewVectorCond;
	int v = viewChooser.getSelectedIndex();
	boolean showLines = false;
	viewScalar = viewScalarCond =
	    viewVector = viewVectorCond = VIEW_NONE;
	switch (v) {
	case VIEW_Q:
	case VIEW_B:
	case VIEW_DB_DT:
	case VIEW_ENERGY:
	    viewScalar = viewScalarCond = v;
	    break;
	case VIEW_E:
	case VIEW_J:
	case VIEW_POYNTING:
	case VIEW_DISP_CUR:
	case VIEW_DISP_J:
	    viewVector = viewVectorCond = v;
	    break;
	case VIEW_DISP_J_B:
	    viewVector = viewVectorCond = VIEW_DISP_J;
	    viewScalar = VIEW_B;
	    break;
	case VIEW_E_LINES:
	    showLines = true;
	    break;
	case VIEW_E_B:
	    viewScalar = viewScalarCond = VIEW_B;
	    viewVector = viewVectorCond = VIEW_E;
	    break;
	case VIEW_E_LINES_B:
	    viewScalar = viewScalarCond = VIEW_B;
	    showLines = true;
	    break;
	case VIEW_E_Q:
	    viewScalar = viewScalarCond = VIEW_Q;
	    viewVector = viewVectorCond = VIEW_E;
	    break;
	case VIEW_E_LINES_Q:
	    viewScalar = viewScalarCond = VIEW_Q;
	    showLines = true;
	    break;
	case VIEW_E_B_J:
	    viewScalar = viewScalarCond = VIEW_B;
	    viewVector = VIEW_E;
	    viewVectorCond = VIEW_J;
	    break;
	case VIEW_E_LINES_B_J:
	    viewScalar = viewScalarCond = VIEW_B;
	    viewVector = VIEW_E;
	    viewVectorCond = VIEW_J;
	    showLines = true;
	    break;
	case VIEW_E_LINES_B_Q_J:
	    viewScalar = VIEW_B;
	    viewScalarCond = VIEW_Q;
	    viewVectorCond = VIEW_J;
	    showLines = true;
	    break;
	case VIEW_E_B_Q_J:
	    viewScalar = VIEW_B;
	    viewScalarCond = VIEW_Q;
	    viewVector = VIEW_E;
	    viewVectorCond = VIEW_J;
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
		if (oe.gray || oe.jx != 0 || oe.jy != 0) {
		    col_r = col_g = col_b = 64;
		    vv = viewVectorCond;
		    vs = viewScalarCond;
		}
		if (vs != VIEW_NONE) {
		    double dy = 0;
		    switch (vs) {
		    case VIEW_B:   dy = oe.az * .2; break;
		    case VIEW_DB_DT: dy = oe.dazdt; break;
		    case VIEW_Q:
			dy = 0;
			if (oe.conductor) {
			    if (!grid[gi+gw].conductor)
				dy = getEField(grid[gi+gw],
					       grid[gi+gw-1],
					       grid[gi+gw+1]);
			    if (!grid[gi-gw].conductor)
				dy += getEField(grid[gi-gw],
						grid[gi-gw+1],
						grid[gi-gw-1]);
			    if (!grid[gi+1].conductor)
				dy += getEField(grid[gi+1],
						grid[gi+gw+1],
						grid[gi-gw+1]);
			    if (!grid[gi-1].conductor)
				dy += getEField(grid[gi-1],
						grid[gi-gw-1],
						grid[gi+gw-1]);
			    dy *= .6;
			}
			break;
		    case VIEW_ENERGY:
			{
			    double dx =
				getEField(oe, grid[gi+gw], grid[gi-gw]);
			    dy = getEField(oe, grid[gi-1], grid[gi+1]);
			    dy = .4*(Math.sqrt(dx*dx+dy*dy)*3 +
				     oe.az * oe.az * .05);
			    break;
			}
		    }
		    dy *= mult;
		    if (dy < -1)
			dy = -1;
		    if (dy > 1)
			dy = 1;
		    if (vs == VIEW_Q) {
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
		    double dx = 0, dy = 0, mm;
		    final double jmult = .2;
		    switch (vv) {
		    case VIEW_E:
			dx = getEField(oe, grid[gi+gw], grid[gi-gw])*emult;
			dy = getEField(oe, grid[gi-1], grid[gi+1])*emult;
			break;
		    case VIEW_DISP_CUR:
		    case VIEW_DISP_J:
			dx = getdEdt(oe, grid[gi+gw], grid[gi-gw])*100;
			dy = getdEdt(oe, grid[gi-1], grid[gi+1])*100;
			if (vv == VIEW_DISP_CUR)
			    break;
			// fallthrough
		    case VIEW_J:
			if (oe.conductor) {
			    if (!grid[gi+gw].conductor)
				dx += -grid[gi+gw].az*jmult;
			    if (!grid[gi-gw].conductor)
				dx += grid[gi-gw].az*jmult;
			    if (!grid[gi+1].conductor)
				dy += grid[gi+1].az*jmult;
			    if (!grid[gi-1].conductor)
				dy += -grid[gi-1].az*jmult;
			} else {
			    dx += oe.jx*jmult;
			    dy += oe.jy*jmult;
			}
			break;
		    case VIEW_POYNTING:
			mm = 3.6*oe.az;
			dy = -mm *
			    getEField(oe, grid[gi-gw], grid[gi+gw]);
			dx = mm *
			    getEField(oe, grid[gi+1], grid[gi-1]);
			break;
			
		    }
		    double dn = Math.sqrt(dx*dx+dy*dy);
		    if (dn > 0) {
			dx /= dn;
			dy /= dn;
		    }
		    dn *= mult;
		    if (vv == VIEW_J) {
			if (dn > 1) {
			    if (dn > 2)
				dn = 2;
			    dn -= 1;
			    col_r = col_g = 255;
			    col_b = col_b+(int) (dn*(255-col_b));
			} else {
			    col_r = col_r+(int) (dn*(255-col_r));
			    col_g = col_g+(int) (dn*(255-col_g));
			}
		    } else {
			if (dn > 1) {
			    if (dn > 2)
				dn = 2;
			    dn -= 1;
			    col_g = 255;
			    col_r = col_r+(int) (dn*(255-col_r));
			    col_b = col_b+(int) (dn*(255-col_b));
			} else
			    col_g = col_g+(int) (dn*(255-col_g));
		    }
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
 
 // calculate E field with some extra work to do one-sided
 // derivatives at conductor and dielectric boundaries.
 // ge = square we want the E field for, gn = next square,
 // gp = previous square.
 double getEField(OscElement ge, OscElement gp, OscElement gn) {
	if (ge.conductor)
	    return 0;
	if (gp.conductor)
	    return .66*(ge.dazdt-gn.dazdt);
	if (gn.conductor)
	    return .66*(gp.dazdt-ge.dazdt);
	return .33*(-gn.dazdt + gp.dazdt);
 }

 double getdEdt(OscElement ge, OscElement gp, OscElement gn) {
	if (ge.conductor)
	    return 0;
	if (gp.conductor)
	    return 2*(ge.dazdt2-gn.dazdt2);
	if (gn.conductor)
	    return 2*(gp.dazdt2-ge.dazdt2);
	return -gn.dazdt2 + gp.dazdt2;
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
	boolean skip = false;
	
	// scrollbars don't always go all the way to the end,
	// so we do some extra work to make sure we can set
	// the phase all the way from 0 to pi
	int au = auxBar.getValue()-1;
	if (au > 38)
	    au = 38;
	w2 = w+au*(pi/38);
	
	double v = 0;
	double v2 = 0;
	if (!sourcePacket) {
	    v = Math.sin(w);
	    if (sourceCount >= 2)
		v2 = Math.sin(w2);
	} else {
	    w %= pi*2;
	    double adjw = w/(freqMult*forceBar.getValue());
	    adjw -= 10;
	    v = Math.exp(-.01*adjw*adjw)*
		Math.sin(adjw*.2);
	    if (adjw < 0)
		doFilter();
	}
	if (clear)
	    v = v2 = 0;
	sources[0].v = sources[2].v = (float) (2*v*sourceMult);
	sources[1].v = sources[3].v = (float) (2*v2*sourceMult);
	if (sourceType == SRC_PLANE) {
	    for (j = 0; j != sourceCount/2; j++) {
		OscSource src1 = sources[j*2];
		OscSource src2 = sources[j*2+1];
		OscSource src3 = sources[j];
		drawPlaneSource(src1.x, src1.y,
				src2.x, src2.y, src3.v*.1);
	    }
	} else if (sourceType == SRC_ANTENNA) {
	    for (j = 0; j != sourceCount/2; j++) {
		OscSource src1 = sources[j*2];
		OscSource src2 = sources[j*2+1];
		OscSource src3 = sources[j];
		drawAntennaSource(src1.x, src1.y,
				  src2.x, src2.y, src3.v*.1);
	    }
	} else if (sourceType == SRC_LOOP) {
	    int x1 = min(sources[0].x, sources[1].x);
	    int x2 = max(sources[0].x, sources[1].x);
	    int y1 = min(sources[0].y, sources[1].y);
	    int y2 = max(sources[0].y, sources[1].y);
	    int ix, iy;
	    double vx, vy;
	    vx = vy = sources[0].v*.1;
	    if (x1 == x2)
		vx = 0;
	    if (y1 == y2)
		vy = 0;
	    for (ix = x1+1; ix < x2; ix++) {
		grid[ix+gw*y1].jx =  vx;
		grid[ix+gw*y2].jx = -vx;
	    }
	    grid[x1+gw*y1].jx =  .5*vx;
	    grid[x2+gw*y1].jx =  .5*vx;
	    grid[x1+gw*y2].jx = -.5*vx;
	    grid[x2+gw*y2].jx = -.5*vx;
	    for (iy = y1+1; iy < y2; iy++) {
		grid[x1+gw*iy].jy = -vy;
		grid[x2+gw*iy].jy =  vy;
	    }
	    grid[x1+gw*y1].jy = -.5*vy;
	    grid[x1+gw*y2].jy = -.5*vy;
	    grid[x2+gw*y1].jy =  .5*vy;
	    grid[x2+gw*y2].jy =  .5*vy;
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
	double len = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	double xmult = (x2-x1)/len;
	double ymult = (y2-y1)/len;
	// need to draw a line from x1,y1 to x2,y2
	if (x1 == x2 && y1 == y2) {
	    //grid[x1][y1].jrot = v;
	} else if (abs(y2-y1) > abs(x2-x1)) {
	    // y difference is greater, so we step along y's
	    // from min to max y and calculate x for each step
	    int sgn = sign(y2-y1);
	    int x, y;
	    for (y = y1; y != y2+sgn; y += sgn) {
		x = x1+(x2-x1)*(y-y1)/(y2-y1);
		grid[x+y*gw].jx = v*xmult;
		grid[x+y*gw].jy = v*ymult;
	    }
	} else {
	    // x difference is greater, so we step along x's
	    // from min to max x and calculate y for each step
	    int sgn = sign(x2-x1);
	    int x, y;
	    for (x = x1; x != x2+sgn; x += sgn) {
		y = y1+(y2-y1)*(x-x1)/(x2-x1);
		grid[x+y*gw].jx = v*xmult;
		grid[x+y*gw].jy = v*ymult;
	    }
	}
 }

 void drawAntennaSource(int x1, int y1, int x2, int y2, double v) {
     double k = forceBar.getValue() * .0224; // determined by trial-and-error
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
	double len = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	double ph = 0; // -len;
	double xmult = (x2-x1)/len;
	double ymult = (y2-y1)/len;
	// need to draw a line from x1,y1 to x2,y2
	if (x1 == x2 && y1 == y2) {
	    //grid[x1][y1].jrot = v;
	} else if (abs(y2-y1) > abs(x2-x1)) {
	    // y difference is greater, so we step along y's
	    // from min to max y and calculate x for each step
	    int sgn = sign(y2-y1);
	    int x, y;
	    for (y = y1; y != y2+sgn; y += sgn) {
		x = x1+(x2-x1)*(y-y1)/(y2-y1);
		double q = Math.sin((ph+(y-y1)/ymult)*k)*v;
		grid[x+y*gw].jx = q*xmult;
		grid[x+y*gw].jy = q*ymult;
	    }
	} else {
	    // x difference is greater, so we step along x's
	    // from min to max x and calculate y for each step
	    int sgn = sign(x2-x1);
	    int x, y;
	    for (x = x1; x != x2+sgn; x += sgn) {
		y = y1+(y2-y1)*(x-x1)/(x2-x1);
		double q = Math.sin((ph+(x-x1)/xmult)*k)*v;
		grid[x+y*gw].jx = q*xmult;
		grid[x+y*gw].jy = q*ymult;
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
	double mult = brightnessBar.getValue() *
	    (double) EBrightnessBar.getValue() / 5000.0;
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
	    if (oe.gray || oe.jx != 0 || oe.jy != 0) {
		x = 0;
		continue;
	    }
	    double dx = getEField(oe, grid[gi+gw], grid[gi-gw]);
	    double dy = getEField(oe, grid[gi-1],  grid[gi+1]);
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
			!sourcePacket) ? 40 : 8;
	double mult2 = 4+mult1;
	int x, y;
	for (y = 1; y < gridSizeY-1; y++)
	    for (x = 1; x < gridSizeX-1; x++) {
		int gi = x+y*gw;
		OscElement oe = grid[gi];
		if (oe.jx != 0 || oe.jy != 0 || oe.boundary || oe.conductor)
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
	    dragClear = oe.conductor || oe.jx != 0 || oe.jy != 0;
	    dragSet = !dragClear;
	}

	oe.conductor = false;

	if (dragClear)
	    return;

	switch (modeChooser.getSelectedIndex()) {
	case MODE_PERF_CONDUCTOR: addConductor(xp, yp, 1); break;
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
	    if (resBar.getValue() == windowWidth)
		return;
	    setResolution();
	    reinit();
	    cv.repaint(pause);
	}
	if (e.getSource() == brightnessBar ||
	    e.getSource() == EBrightnessBar ||
	    e.getSource() == lineDensityBar)
	    cv.repaint(pause);
	if (e.getSource() == lineDensityBar)
	    linegrid = null;
	if (e.getSource() == forceBar)
	    setForce();
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
	windowOffsetX = windowOffsetY = 30;
	gridSizeX = windowWidth + windowOffsetX*2;
	gridSizeY = windowHeight + windowOffsetY*2;
	gridSizeXY = gridSizeX*gridSizeY;
	gw = gridSizeX;
	linegrid = null;
 }

 void setResolution(int x) {
	resBar.setValue(x);
	setResolution();
	reinit();
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
	
 }

 void doSetup() {
	t = 0;
	doClearAll();
	// don't use previous source positions, use defaults
	sourceCount = -1;
	filterCount = 0;
	sourceChooser.select(SRC_NONE);
	setForceBar(10);
	brightnessBar.setValue(100);
	EBrightnessBar.setValue(100);
	auxBar.setValue(1);
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	setup.select();
	setup.doSetupSources();
	calcBoundaries();
	setDamping();
 }

 void addMedium() {
 }

 void addCondMedium(double cv) {
	conductFillRect(0, gridSizeY/2, gridSizeX-1, gridSizeY-1, cv);
 }

 void setSources() {
	if (sourceCount > 0)
	    doSources(1, true);
	sourceMult = 1;
	int oldSCount = sourceCount;
	sourceCount = 0;
	sourceType = SRC_PLANE;
	sourcePacket = false;
	switch (sourceChooser.getSelectedIndex()) {
	case SRC_NONE  : sourceCount = 0; break;
	case SRC_1PLANE: sourceCount = 1; break;
	case SRC_2PLANE: sourceCount = 2; break;
	case SRC_1PLANE_PACKET: sourceCount = 1; sourcePacket = true; break;
	case SRC_1ANTENNA: sourceCount = 1; sourceType = SRC_ANTENNA; break;
	case SRC_2ANTENNA: sourceCount = 2; sourceType = SRC_ANTENNA; break;
	case SRC_1LOOP       : sourceCount = 1; sourceType = SRC_LOOP; break;
	case SRC_1LOOP_PACKET: sourceCount = 1; sourceType = SRC_LOOP; sourcePacket = true;
	}
	if (sourceCount == 2) {
	    auxBar.setValue(1);
	    auxLabel.setText("Phase Difference");
	    auxBar.show();
	    auxLabel.show();
	} else {
	    auxBar.hide();
	    auxLabel.hide();
	}
	validate();
	
	sourceCount *= 2;
	if (oldSCount != sourceCount) {
	    int x2 = windowOffsetX+windowWidth-1;
	    int y2 = windowOffsetY+windowHeight-1;
	    sources[0] = new OscSource(windowOffsetX, windowOffsetY);
	    sources[1] = new OscSource(x2, windowOffsetY);
	    sources[2] = new OscSource(windowOffsetX, y2);
	    sources[3] = new OscSource(x2, y2);
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
	// true if perfect conductor
	boolean conductor;
	// current
	double jx, jy;
	// damping (used to keep waves from reflecting back after going
	// off the screen)
	double damp;
	// z component of vector potential and its first derivative
	double az, dazdt, dazdt2;
	// temp variable used to store color when drawing field lines
	int col;
	// true if we are on a boundary between media
	boolean boundary;
	// true if this is a gray square (some medium)
	boolean gray;
	int getType() {
	    if (conductor)
		return TYPE_CONDUCTOR;
	    else if (jx != 0 || jy != 0)
		return TYPE_CURRENT;
	    return TYPE_NONE;
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

 class PlaneWaveSetup extends Setup {
	String getName() { return "Plane Wave"; }
	void select() {
	    sourceChooser.select(SRC_1PLANE);
	    brightnessBar.setValue(225);
	    setForceBar(30);
	}
	Setup createNext() { return new IntersectingPlaneWavesSetup(); }
 }
 class IntersectingPlaneWavesSetup extends Setup {
	String getName() { return "Intersecting Planes"; }
	void select() {
	    brightnessBar.setValue(126);
	    setForceBar(34);
	}
	void doSetupSources() {
	    sourceChooser.select(SRC_2PLANE);
	    setSources();
	    sources[0].y = sources[1].y = windowOffsetY;
	    sources[0].x = windowOffsetX+1;
	    sources[2].x = sources[3].x = windowOffsetX;
	    sources[2].y = windowOffsetY+1;
	    sources[3].y = windowOffsetY+windowHeight-1;
	}
	Setup createNext() { return new ConductReflectSetup(); }
 }
 class ConductReflectSetup extends Setup {
	String getName() { return "Reflection At Conductor"; }
	void select() {
	    sourceChooser.select(SRC_1LOOP_PACKET);
	    addCondMedium(1);
	    setForceBar(4);
	    brightnessBar.setValue(1600);
	}
	void doSetupSources() {
	    setSources();
	    sources[0].x = gridSizeX/2-1;
	    sources[1].x = gridSizeX/2+1;
	    sources[0].y = windowOffsetY;
	    sources[1].y = windowOffsetY+2;
	}
	Setup createNext() { return new OscDipoleSetup(); }
 }
 class OscDipoleSetup extends Setup {
	String getName() { return "Oscillating Dipole"; }
	void select() {
	    setForceBar(10);
	    brightnessBar.setValue(1066);
	    EBrightnessBar.setValue(300);
	}
	void doSetupSources() {
	    sourceChooser.select(SRC_1PLANE);
	    setSources();
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    sources[0].x = sources[1].x = cx;
	    sources[0].y = cy-1;
	    sources[1].y = cy+1;
	}
	Setup createNext() { return new HalfWaveAnt1Setup(); }
 }
 class HalfWaveAnt1Setup extends Setup {
	String getName() { return "Half Wave Antenna"; }
	void select() {
	    setForceBar(10);
	    brightnessBar.setValue(390);
	    EBrightnessBar.setValue(350);
	}
	void doSetupSources() {
	    sourceChooser.select(SRC_1ANTENNA);
	    setSources();
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    sources[0].x = sources[1].x = cx;
	    sources[0].y = cy+7;
	    sources[1].y = cy-7;
	}
	Setup createNext() { return new FullWaveAnt1Setup(); }
 }
 class FullWaveAnt1Setup extends Setup {
	String getName() { return "Full Wave Ant (End-Driven)"; }
	void select() {
	    setForceBar(25);
	    brightnessBar.setValue(390);
	}
	void doSetupSources() {
	    sourceChooser.select(SRC_1ANTENNA);
	    setSources();
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    sources[0].x = sources[1].x = cx;
	    sources[0].y = cy+6;
	    sources[1].y = cy-5;
	}
	Setup createNext() { return new FullWaveAnt2Setup(); }
 }
 class FullWaveAnt2Setup extends Setup {
	String getName() { return "Full Wave Ant (Center-Driven)"; }
	void select() {
	    setForceBar(25);
	    brightnessBar.setValue(390);
	}
	void doSetupSources() {
	    sourceChooser.select(SRC_2ANTENNA);
	    setSources();
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    sources[0].x = sources[1].x = cx;
	    sources[2].x = sources[3].x = cx;
	    sources[0].y = cy+1;
	    sources[1].y = cy+6;
	    sources[2].y = cy;
	    sources[3].y = cy-5;
	    auxBar.setValue(40);
	}
	Setup createNext() { return new OscCurrentLoop(); }
 }
 class OscCurrentLoop extends Setup {
	String getName() { return "Current Loop"; }
	void select() {
	    sourceChooser.select(SRC_1LOOP);
	    setSources();
	    sources[0].x = gridSizeX/2-1;
	    sources[0].y = gridSizeY/2-1;
	    sources[1].x = gridSizeX/2+1;
	    sources[1].y = gridSizeY/2+1;
	    brightnessBar.setValue(270);
	    setForceBar(34);
	}
	Setup createNext() { return new BigMode01Setup(); }
 }
 class BigMode01Setup extends Setup {
	String getName() { return "Big TE01 Mode"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int n = windowWidth*3/4;
	    int x = windowOffsetX+windowWidth/2-n/2;
	    int y = windowOffsetY+windowHeight/2-n/2;
	    for (i = 1; i != 4; i++)
		conductDrawRect(x-i, y-i, x+n+i-1, y+n+i-1, 1);
	    setupMode(x, y, n, n, 0, 1);
	    brightnessBar.setValue(200);
	    EBrightnessBar.setValue(400);
	}
	Setup createNext() { return new BigMode10Setup(); }
 }
 class BigMode10Setup extends Setup {
	String getName() { return "Big TE10 Mode"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int n = windowWidth*3/4;
	    int x = windowOffsetX+windowWidth/2-n/2;
	    int y = windowOffsetY+windowHeight/2-n/2;
	    for (i = 1; i != 4; i++)
		conductDrawRect(x-i, y-i, x+n+i-1, y+n+i-1, 1);
	    setupMode(x, y, n, n, 1, 0);
	    brightnessBar.setValue(200);
	    EBrightnessBar.setValue(400);
	}
	Setup createNext() { return new BigMode1001Setup(); }
 }
 class BigMode1001Setup extends Setup {
	String getName() { return "Big TE10+TE01 Mode"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int n = windowWidth*3/4;
	    int x = windowOffsetX+windowWidth/2-n/2;
	    int y = windowOffsetY+windowHeight/2-n/2;
	    for (i = 1; i != 4; i++)
		conductDrawRect(x-i, y-i, x+n+i-1, y+n+i-1, 1);
	    setupMode(x, y, n, n, 1, 0);
	    addMode(x, y, n, n, 0, 1);
	    brightnessBar.setValue(200);
	    EBrightnessBar.setValue(250);
	}
	Setup createNext() { return new BigMode1001iSetup(); }
 }
 class BigMode1001iSetup extends Setup {
	String getName() { return "Big TE10+TE01i Mode"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int n = windowWidth*3/4;
	    int x = windowOffsetX+windowWidth/2-n/2;
	    int y = windowOffsetY+windowHeight/2-n/2;
	    for (i = 1; i != 4; i++)
		conductDrawRect(x-i, y-i, x+n+i-1, y+n+i-1, 1);
	    setupMode(x, y, n, n, 1, 0);
	    addModeI(x, y, n, n, 0, 1);
	    brightnessBar.setValue(200);
	    EBrightnessBar.setValue(250);
	}
	Setup createNext() { return new BigMode2Setup(); }
 }
 class BigMode2Setup extends Setup {
	String getName() { return "Big TE11 Mode"; }
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
	    EBrightnessBar.setValue(300);
	}
	Setup createNext() { return new OneByOneModesSetup(); }
 }
 void setupMode(int x, int y, int sx, int sy, int nx, int ny) {
	int i, j;
	for (i = 0; i < sx; i++)
	    for (j = 0; j < sy; j++) {
		grid[i+x+gw*(j+y)].az = 2*
		    (Math.cos(pi*nx*i/(sx-1))*
		     Math.cos(pi*ny*j/(sy-1)));
		grid[i+x+gw*(j+y)].dazdt = 0;
	    }
	noFilter();
 }
 void addMode(int x, int y, int sx, int sy, int nx, int ny) {
	int i, j;
	for (i = 0; i < sx; i++)
	    for (j = 0; j < sy; j++) {
		grid[i+x+gw*(j+y)].az += 2*
		    (Math.cos(pi*nx*i/(sx-1))*
		     Math.cos(pi*ny*j/(sy-1)));
	    }
	noFilter();
 }
 void addModeI(int x, int y, int sx, int sy, int nx, int ny) {
	int i, j;
	double mult = pi*4*Math.sqrt(nx*nx/((double) (sx-1)*(sx-1)) +
					       ny*ny/((double) (sy-1)*(sy-1)));
	for (i = 0; i < sx; i++)
	    for (j = 0; j < sy; j++) {
		grid[i+x+gw*(j+y)].dazdt += mult*
		    (Math.cos(pi*nx*i/(sx-1))*
		     Math.cos(pi*ny*j/(sy-1)));
	    }
	noFilter();
 }
 class OneByOneModesSetup extends Setup {
	String getName() { return "TE10 Modes"; }
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
		setupMode(x1, y1, nx, ny, 1, 0);
		y += ny+2;
	    }
	    brightnessBar.setValue(250);
	    EBrightnessBar.setValue(300);
	}
	Setup createNext() { return new NByZeroModesSetup(); }
 }
 class NByZeroModesSetup extends Setup {
	String getName() { return "TEn0 Modes"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    int y = 1;
	    int ny = 6;
	    int nx = windowWidth-2;
	    int mode = 1;
	    while (y + ny < windowHeight) {
		int y1 = y + windowOffsetY;
		int x1 = windowOffsetX + 1;
		conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		setupMode(x1, y1, nx, ny, mode, 0);
		y += ny+2;
		mode++;
	    }
	    brightnessBar.setValue(200);
	    EBrightnessBar.setValue(128);
	}
	Setup createNext() { return new NByOneModesSetup(); }
 }
 class NByOneModesSetup extends Setup {
	String getName() { return "TEn1 Modes"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i, j;
	    int y = 1;
	    int ny = 10;
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
	    brightnessBar.setValue(150);
	}
	Setup createNext() { return new NByNModesSetup(); }
 }
 class NByNModesSetup extends Setup {
	String getName() { return "TEnn Modes"; }
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
		    if (modex == 1 && modey == 1)
			continue;
		    int x1 = windowOffsetX + 1 + (ny+2)*(modey-1);
		    int y1 = windowOffsetY + 1 + (nx+2)*(modex-1);
		    conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		    setupMode(x1, y1, nx, ny, modex-1, modey-1);
		}
	    brightnessBar.setValue(300);
	}
	Setup createNext() { return new ZeroByNModeCombosSetup(); }
 }
 class ZeroByNModeCombosSetup extends Setup {
	String getName() { return "TEn0 Mode Combos"; }
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
		int my = (this instanceof ZeroByNModeCombosSetup) ? 0 : 1;
		for (i = 0; i != nx; i++)
		    for (j = 0; j != ny; j++) {
			grid[i+x1+gw*(j+y1)].az = (float) 2*
			    (Math.cos(mode1*pi*i/(nx-1))*
			     Math.cos(pi*my*j/(ny-1))*.5 +
			     Math.cos(mode2*pi*i/(nx-1))*
			     Math.cos(pi*my*j/(ny-1))*.5);
			grid[i+x1+gw*(j+y1)].dazdt = 0;
		    }
		y += ny+2;
	    }
	    noFilter();
	    brightnessBar.setValue(310);
	}
	Setup createNext() { return new OneByNModeCombosSetup(); }
 }
 class OneByNModeCombosSetup extends ZeroByNModeCombosSetup {
	String getName() { return "TEn1 Mode Combos"; }
	Setup createNext() { return new NByNModeCombosSetup(); }
 }
 class NByNModeCombosSetup extends Setup {
	String getName() { return "TEnn Mode Combos"; }
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
		    int mode1x = getrand(4);
		    int mode1y = getrand(4)+1;
		    int mode2x, mode2y;
		    do {
			mode2x = getrand(4)+1;
			mode2y = getrand(4);
		    } while (mode1x == mode2x && mode1y == mode2y);
		    int x1 = windowOffsetX + 1 + (ny+2)*(gx-1);
		    int y1 = windowOffsetY + 1 + (nx+2)*(gy-1);
		    conductDrawRect(x1-1, y1-1, x1+nx, y1+ny, 1);
		    for (i = 0; i != nx; i++)
			for (j = 0; j != ny; j++) {
			    grid[i+x1+gw*(j+y1)].az = 2*
				(Math.cos(mode1x*pi*i/(nx-1))*
				 Math.cos(mode1y*pi*j/(ny-1))*.5 +
				 Math.cos(mode2x*pi*i/(nx-1))*
				 Math.cos(mode2y*pi*j/(ny-1))*.5);
			    grid[i+x1+gw*(j+y1)].dazdt = 0;
			}
		}
	    brightnessBar.setValue(370);
	    noFilter();
	}
	Setup createNext() { return new Waveguides1Setup(); }
 }
 class Waveguides1Setup extends Setup {
	String getName() { return "Waveguides"; }
	void select() {
	    sourceChooser.select(SRC_1PLANE);
	    int i, j;
	    int x = 1;
	    int nx = 5;
	    int y1 = windowOffsetY + 1;
	    while (x + nx < windowWidth) {
		int x1 = x + windowOffsetX;
		conductDrawRect(x1-1,  y1-1, x1-1,  gridSizeY-1, 1);
		conductDrawRect(x1+nx, y1-1, x1+nx, gridSizeY-1, 1);
		nx += 2;
		x += nx;
	    }
	    conductDrawRect(x-1+windowOffsetX, y1, gridSizeX-1, y1, 1);
	    brightnessBar.setValue(215);
	    setForceBar(28);
	}
	Setup createNext() { return new CapacitorSetup(); }
 }
 class CapacitorSetup extends Setup {
	String getName() { return "Capacitor"; }
	void select() {
	    sourceChooser.select(SRC_NONE);
	    int i;
	    int sz = (windowWidth > 45) ? 45 : windowWidth;
	    int n = sz*3/4;
	    int cx = windowOffsetX+windowWidth/2;
	    int cy = windowOffsetY+windowHeight/2;
	    int x = cx-n/2;
	    int y = cy-n/2;
	    for (i = 1; i != 4; i++)
		conductDrawRect(x-i, y-i, x+n+i-1, y+n+i-1, 1);
	    setupMode(x, y, n, n, 1, 0);

	    // fill in top and bottom
	    conductFillRect(x, y, x+n, y+4, 1);
	    conductFillRect(x, y+n-4, x+n, y+n-1, 1);

	    // conductors leading to plates
	    int sep = 4;
	    conductFillRect(cx-2, y, cx+2, cy-sep, 1);
	    conductFillRect(cx-2, cy+sep, cx+2, y+n, 1);

	    // plates
	    conductFillRect(cx-5, cy-(sep+1), cx+5, cy-(sep-1), 1);
	    conductFillRect(cx-5, cy+(sep-1), cx+5, cy+(sep+1), 1);
	    brightnessBar.setValue(700);
	    EBrightnessBar.setValue(200);
	    findMode(x, y, x+n, y+n);
	    noFilter();
	}
	Setup createNext() { return new ResonantCavitiesSetup(); }
 }

 void findMode(int x1, int y1, int x2, int y2) {
	int iter;
	double delta = 0;
	int iic = 1000; // 500; // 1000; // 2000;
	for (iter = 0; iter != iic; iter++) {
	    int i, j;
	    int ct = 0;
	    for (i = x1; i <= x2; i++)
		for (j = y1; j <= y2; j++) {
		    int gi = i+j*gw;
		    OscElement oew = grid[gi-1];
		    OscElement oee = grid[gi+1];
		    OscElement oen = grid[gi-gw];
		    OscElement oes = grid[gi+gw];
		    OscElement oe = grid[gi];
		    if (oe.conductor)
			continue;
		    if (oe.col != 0) {
			oe.dazdt = oe.az;
			continue;
		    }

		    double az = oe.az;
		    double previ = oew.az;
		    if (oew.conductor)
			previ = (oee.conductor) ? az : oee.az;
		    double nexti = oee.az;
		    if (oee.conductor)
			nexti = (oew.conductor) ? az : oew.az;
		    double prevj = oen.az;
		    if (oen.conductor)
			prevj = (oes.conductor) ? az : oes.az;
		    double nextj = oes.az;
		    if (oes.conductor)
			nextj = (oen.conductor) ? az : oen.az;
		    oe.dazdt = .125*(nexti+previ+nextj+prevj+4*az);
		    delta += Math.abs(oe.dazdt-az);
		    ct++;
		}
	    delta /= ct;
	    for (i = x1; i <= x2; i++)
		for (j = y1; j <= y2; j++) {
		    OscElement oe = grid[i+j*gw];
		    oe.az = oe.dazdt;
		    oe.dazdt = 0;
		}
	}
 }

 class ResonantCavitiesSetup extends Setup {
	String getName() { return "Resonant Cavities"; }
	void select() {
	    sourceChooser.select(SRC_1PLANE);
	    int i, j;
	    int x = 1;
	    int nx = 3;
	    int y1 = windowOffsetY + 11;
	    while (x + nx < windowWidth) {
		int ny = ((x+nx)*(windowHeight-18)/windowWidth)+6;
		int x1 = x + windowOffsetX;
		for (i = 0; i != ny+2; i++)
		    grid[x1-1+gw*(y1+i-1)].conductor =
			grid[x1+nx+gw*(y1+i-1)].conductor = true;
		for (j = 0; j != nx+2; j++)
		    grid[x1+j-1+gw*(y1-1)].conductor =
			grid[x1+j-1+gw*(y1+ny)].conductor = true;
		grid[x1+nx/2+gw*(y1-1)].conductor = false;
		x += nx+2;
	    }
	    x--;
	    for (; x < windowWidth; x++)
		grid[x+windowOffsetX+gw*(y1-1)].conductor = true;
	    brightnessBar.setValue(120);
	    setForceBar(15);
	}
	Setup createNext() { return new SingleSlitSetup(); }
 }

 class SingleSlitSetup extends Setup {
	String getName() { return "Single Slit"; }
	void select() {
	    sourceChooser.select(SRC_1PLANE);
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
	    sourceChooser.select(SRC_1PLANE);
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
	    sourceChooser.select(SRC_1PLANE);
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
	    sourceChooser.select(SRC_1PLANE);
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
	    sourceChooser.select(SRC_1PLANE);
	    int x = windowOffsetX+windowWidth/2;
	    int i;
	    conductFillRect(windowOffsetX+windowWidth*2/3, windowOffsetY+3,
			    windowOffsetY+windowWidth-1, windowOffsetY+5, 1);
	    brightnessBar.setValue(250);
	    setForceBar(35);
	}
	Setup createNext() { return new LloydsMirrorSetup(); }
 }
 class LloydsMirrorSetup extends Setup {
	String getName() { return "Lloyd's Mirror"; }
	void select() {
	    sourceChooser.select(SRC_1LOOP);
	    setSources();
	    sources[0].x = windowOffsetX;
	    sources[0].y = windowOffsetY + windowHeight*3/4-1;
	    sources[1].x = windowOffsetX+2;
	    sources[1].y = windowOffsetY + windowHeight*3/4+1;
	    brightnessBar.setValue(250);
	    setForceBar(40);
	    conductDrawRect(0, windowOffsetY+windowHeight-1,
			    gridSizeX-1, windowOffsetY+windowHeight-1, 1);
	}
	void doSetupSources() {}
	Setup createNext() { return null; }
 }

 void addConductor(int x, int y, double cv) {
	OscElement oe = grid[x+gw*y];
	oe.conductor = (cv == 0) ? false : true;
	if (cv == 1)
	    oe.az = oe.dazdt = 0;
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
}
