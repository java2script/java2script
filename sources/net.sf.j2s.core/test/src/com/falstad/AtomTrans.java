package com.falstad;

// AtomTrans.java (c) 2002 by Paul Falstad, www.falstad.com.
// Rendering algorithm in this applet is based on the description of
// the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
// We raytrace through a 3-d dataset, sampling a number of points and
// integrating over them using Simpson's rule.

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

import javax.swing.ButtonGroup;
import javax.swing.JRadioButtonMenuItem;

import a2s.Applet;

import com.falstad.Complex;

import a2s.Button;
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

//web_Ready
//web_AppletName= Atomic Dipole Transitions
//web_Description= Radiative transitions (absorption and stimulated emission) in atoms
//web_JavaVersion= http://www.falstad.com/qmatomrad/
//web_AppletImage= atomtrans.png
//web_Category= Physics - Atomic
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features: graphics, AWT-to-Swing

class AtomTransCanvas extends Canvas {
    AtomTransFrame pg;
    AtomTransCanvas(AtomTransFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateAtomTrans(g);
    }
    public void paintComponent(Graphics g) {
	pg.updateAtomTrans(g);
    }
};

class AtomTransLayout implements LayoutManager {
    public AtomTransLayout() {}
    public void addLayoutComponent(String name, Component c) {}
    public void removeLayoutComponent(Component c) {}
    public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
    }
    public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
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
	int cw = targetw-barwidth;
	int targeth = target.size().height - (insets.top+insets.bottom);
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

public class AtomTrans extends Applet implements ComponentListener {
    static AtomTransFrame ogf;
    void destroyFrame() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
    }
    boolean started = false;
    public void init() {
	addComponentListener(this);
    }
    
    public static void main(String args[]) {
        ogf = new AtomTransFrame(null);
        ogf.init();
    }

    void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new AtomTransFrame(this);
	    ogf.init();
	    repaint();
	}
    }
    
    public void paint(Graphics g) {
        super.paint(g); // for background
	String s = "Applet is open in a separate window.";
	if (!started)
	    s = "Applet is starting.";
	else if (ogf == null)
	    s = "Applet is finished.";
	else
	    ogf.show();
	g.drawString(s, 10, 30);
    }
    
    public void componentHidden(ComponentEvent e){}
    public void componentMoved(ComponentEvent e){}
    public void componentShown(ComponentEvent e) { showFrame(); }
    public void componentResized(ComponentEvent e) {}
    
    public void destroy() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
    }
};

class AtomTransFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage, memimage;
    
    Random random;
    int gridSizeX = 200;
    int gridSizeY = 200;
    
    public String getAppletInfo() {
	return "AtomTrans by Paul Falstad";
    }

    Button blankButton;
    Checkbox stoppedCheck;
    CheckboxMenuItem colorCheck;
    CheckboxMenuItem eCheckItem;
    CheckboxMenuItem xCheckItem;
    CheckboxMenuItem restrictItem;
    CheckboxMenuItem dimensionsItem;
    CheckboxMenuItem axesItem;
    CheckboxMenuItem autoZoomItem;
    CheckboxMenuItem animatedZoomItem;
    MenuItem exitItem;
    Choice sliceChooser, freqChooser;
    Choice dirChooser, setupChooser;
    static final int SLICE_NONE = 0;
    static final int SLICE_X = 1;
    static final int SLICE_Y = 2;
    static final int SLICE_Z = 3;
    static final int STATE_1S = 0;
    static final int STATE_2S = 1;
    static final int STATE_2P1 = 2;
    static final int STATE_2PX = 3;
    static final int STATE_2PZ = 4;
    static final int STATE_3S = 5;
    static final int STATE_2PM1 = 6;
    static final int VIEW_XY = 0;
    static final int VIEW_XZ = 1;
    static final int VIEW_XZ12 = 2;
    static final int FREQ_12 = 0;
    static final int FREQ_13 = 1;
    static final int FREQ_14 = 2;
    static final int FREQ_23 = 3;
    static final int FREQ_24 = 4;
    static final int FREQ_34 = 5;
    Scrollbar speedBar, strengthBar, stepBar;
    Scrollbar resolutionBar;
    Scrollbar internalResBar;
    Scrollbar brightnessBar;
    Scrollbar scaleBar;
    Scrollbar sampleBar;
    View viewPotential, viewX, viewStates;
    View viewList[];
    int viewCount;
    Orbital orbitals[];
    int orbCount;
    Phasor phasors[];
    int phasorCount;
    BasisState states[];
    int stateCount;
    Complex newcoef[];
    double dragZoomStart, lastXRot, lastYRot, colorMult;
    double zoom; // was 10
    double rotmatrix[];
    Rectangle viewAxes, viewField;
    static final double pi = 3.14159265358979323846;
    static final double pi2 = pi*2;
    static final double root2 = 1.41421356237309504880;
    static final double root2inv = .70710678118654752440;
    int xpoints[];
    int ypoints[];
    int selectedPaneHandle;
    double freqMax, freq, freqPhase;
    PhaseColor phaseColors[];
    Color purple;
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
    AtomTrans applet;
    State selectedState;
    Phasor selectedPhasor;
    int selection = -1;
    static final int SEL_NONE = 0;
    static final int SEL_POTENTIAL = 1;
    static final int SEL_X = 2;
    static final int SEL_STATES = 3;
    static final int SEL_HANDLE = 4;
    static final int MODE_ANGLE = 0;
    static final int MODE_SLICE = 1;
    static final int DIR_X = 0;
    static final int DIR_Y = 1;
    static final int DIR_Z = 2;
    static final int DIR_CCW = 3;
    static final int DIR_CW = 4;
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
    float funcr, funci;
    int phiIndex;
    double bestBrightness, userBrightMult = 1;
    boolean manualScale;
    Color gray2;
    FontMetrics fontMetrics;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    AtomTransCanvas cv;

    AtomTransFrame(AtomTrans a) {
	super("Atomic Dipole Transitions Applet v1.5a");
	applet = a;
    }

    boolean useBufferedImage = false;
    
    public void init() {
	gray2 = new Color(127, 127, 127);

	String os = System.getProperty("os.name");
	String jv = System.getProperty("java.version");
	boolean altRender = false;
	int res = 64;

	setLayout(new AtomTransLayout());
	cv = new AtomTransCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	add(cv);

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
	m.addSeparator();
	m.add(colorCheck = getCheckItem("Phase as Color"));
	colorCheck.setState(true);

	m = new Menu("Options");
	mb.add(m);
	restrictItem = getCheckItem("Restrict to N1, N2");
	restrictItem.setState(true);
	m.add(dimensionsItem = getCheckItem("Show Dimensions"));
	m.add(axesItem = getCheckItem("Show Axes"));
	axesItem.setState(true);
	autoZoomItem = getCheckItem("Auto Scale");
	autoZoomItem.setState(true);
	animatedZoomItem = getCheckItem("Animated Scaling");
	animatedZoomItem.setState(true);
	setMenuBar(mb);

	int i;
	setupChooser = new Choice();
	for (i = 0; setupStrings[i] != null; i++)
	    setupChooser.add(setupStrings[i]);
	setupChooser.addItemListener(this);
	add(setupChooser);
	
	sliceChooser = new Choice();
	sliceChooser.add("No Slicing");
	sliceChooser.add("Show X Slice");
	sliceChooser.add("Show Y Slice");
	sliceChooser.add("Show Z Slice");
	sliceChooser.addItemListener(this);
	add(sliceChooser);

	freqChooser = new Choice();
	freqChooser.add("Freq = n=1 <-> n=2");
	freqChooser.add("Freq = n=1 <-> n=3");
	freqChooser.add("Freq = n=1 <-> n=4");
	freqChooser.add("Freq = n=2 <-> n=3");
	freqChooser.add("Freq = n=2 <-> n=4");
	freqChooser.add("Freq = n=3 <-> n=4");
	freqChooser.addItemListener(this);
	//add(freqChooser);

	dirChooser = new Choice();
	dirChooser.add("X Dir");
	dirChooser.add("Y Dir");
	dirChooser.add("Z Dir");
	dirChooser.add("CCW Circular");
	dirChooser.add("CW Circular");
	dirChooser.addItemListener(this);
	//add(dirChooser);
	
	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	add(stoppedCheck);

	add(new Label("Simulation Speed", Label.CENTER));
	add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 6, 1, 1, 200));
	speedBar.addAdjustmentListener(this);

	new Label("Steps", Label.CENTER);
	stepBar = new Scrollbar(Scrollbar.HORIZONTAL, 40, 1, 1, 300);
	stepBar.addAdjustmentListener(this);

	new Label("Radiation Intensity", Label.CENTER);
	strengthBar = new Scrollbar(Scrollbar.HORIZONTAL,
					130, 1, 85, 200);
	strengthBar.addAdjustmentListener(this);

	add(new Label("Brightness", Label.CENTER));
	add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 240,
					  1, 1, 4000));
	brightnessBar.addAdjustmentListener(this);

	add(new Label("Image Resolution", Label.CENTER));
	add(resolutionBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 240));
	resolutionBar.addAdjustmentListener(this);

	/*add(new Label("Internal Resolution", Label.CENTER));
	add(internalResBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 200));
	    internalResBar.addAdjustmentListener(this);*/

	new Label("Scale", Label.CENTER);
	scaleBar = new Scrollbar(Scrollbar.HORIZONTAL, 75, 1, 5, 1620);
	scaleBar.addAdjustmentListener(this);
	// scale bar hidden from user

	/*add(new Label("Samples", Label.CENTER));
	add(sampleBar = new Scrollbar(Scrollbar.HORIZONTAL, 7, 1, 0, 20));
	sampleBar.addAdjustmentListener(this);*/

	add(new Label("http://www.falstad.com", Label.CENTER));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }

	int j;
	phaseColors = new PhaseColor[8*phaseColorCount];
	for (i = 0; i != 8; i++)
	    for (j = 0; j != phaseColorCount; j++) {
		double ang = Math.atan(j/(double) phaseColorCount);
		phaseColors[i*phaseColorCount+j] = genPhaseColor(i, ang);
	    }
	purple = new Color(192, 60, 206);
	
	slicerPoints = new int[2][5*2];
	sliceFaces = new double[4][3];

	rotmatrix = new double[9];
	rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
	rotate(0, -pi/2);
	xpoints = new int[4];
	ypoints = new int[4];

	setupSimpson();
	setupStates();
	doSetup();

	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.white);
	resize(580, 500);
	handleResize();
	Dimension x = getSize();
	Dimension screen = getToolkit().getScreenSize();
	setLocation((screen.width  - x.width)/2,
		    (screen.height - x.height)/2);
	show();
    }

    void setupStates() {
	int maxn = 5;
	stateCount = maxn*(maxn+1)*(2*maxn+1)/6;
	int i;
	states = new BasisState[stateCount];
	int n = 1;
	int l = 0;
	int m = 0;
	for (i = 0; i != stateCount; i++) {
	    BasisState bs = states[i] = new BasisState();
	    bs.index = i;
	    bs.elevel = -1/(2.*n*n);
	    bs.n = n;
	    bs.l = l;
	    bs.m = m;
	    if (m < l)
		m++;
	    else {
		l++;
		if (l < n)
		    m = -l;
		else {
		    n++;
		    l = m = 0;
		}
	    }
	}
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

    void setupSimpson() {
	sampleCount = 15; // 9; // 15;
	//sampleCount = sampleBar.getValue()*2+1;
	//System.out.print("sampleCount = " + sampleCount + "\n");

	// generate table of sample multipliers for efficient Simpson's rule
	sampleMult = new int[sampleCount];
	int i;
	for (i = 1; i < sampleCount; i += 2) {
	    sampleMult[i  ] = 4;
	    sampleMult[i+1] = 2;
	}
	sampleMult[0] = sampleMult[sampleCount-1] = 1;
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
	phasorCount = 0;
	int i;

	if (viewStates == null)
	    return;
	
	int sz = viewStates.height/4;
	int x = 0;
	int y = viewStates.y;
	int n = 1, l = 0, m = 0;

	sz = viewStates.height/5;
	phasorCount = 5+12+15;
	phasors = new Phasor[phasorCount];
	int pct = 0;
	for (i = 0; i != stateCount; i++) {
	    if (l < 3) {
		Phasor ph = phasors[pct] = new Phasor(x, y, sz, sz);
		pct++;
		ph.state = states[i];
		x += sz;
	    }
	    if (++m > l) {
		x += sz;
		l++;
		m = -l;
		if (l >= n) {
		    x = 0;
		    y += sz;
		    n++;
		    l = m = 0;
		}
	    }
	}

	// in case the states changed
	createOrbitals();
    }

    void setupDisplay() {
	if (winSize == null)
	    return;
	int potsize = (viewPotential == null) ? 50 : viewPotential.height;
	int statesize = (viewStates == null) ? 64 : viewStates.height;
	viewX = viewPotential = viewStates = null;
	viewList = new View[10];
	int i = 0;
	if (eCheckItem.getState())
	    viewList[i++] = viewPotential = new View();
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
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
	int asize = (int) (min(viewX.width, viewX.height)/3);
	viewAxes = new Rectangle(viewX.x+winSize.width-asize, viewX.y,
				 asize, asize);
	viewField = new Rectangle(viewX.x+winSize.width-asize,
				  viewX.y+viewX.height-asize,
				  asize, asize);
	createPhasors();
    }

    int getTermWidth() {
	return 8;
    }

    // multiply rotation matrix by rotations through angle1 and angle2
    void rotate(double angle1, double angle2) {
	double r1cos = Math.cos(angle1);
	double r1sin = Math.sin(angle1);
	double r2cos = Math.cos(angle2);
	double r2sin = Math.sin(angle2);
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
	System.out.print("setResolution " + dataSize + " " +
			 gridSizeX + "\n");
	// was 50
	resadj = 50./dataSize;
	precomputeAll();
    }

    // compute 2-d view by raytracing through a 3-d dataset
    void computeView(double normmult) {
	int i, j;
	double q = 3.14159265/dataSize;
	boolean color = colorCheck.getState();
	for (i = 0; i != orbCount; i++)
	    orbitals[i].setupFrame(normmult);
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
		    Math.sqrt(camvx0*camvx0+camvy0*camvy0+1);
		int n;
		float simpr = 0;
		float simpg = 0;
		float simpb = 0;
		// calculate intersections with bounding sphere
		double a = camvx*camvx+camvy*camvy+camvz*camvz;
		double b = 2*(camvx*camx+camvy*camy+camvz*camz);
		double c = camx*camx+camy*camy+camz*camz-boundRadius2;
		double discrim = b*b-4*a*c;
		if (discrim < 0) {
		    // doesn't hit it
		    fillSquare(i, j, 0, 0, 0);
		    continue;
		}
		discrim = Math.sqrt(discrim);
		double mint = (-b-discrim)/(2*a);
		double maxt = (-b+discrim)/(2*a);
		if (slice != SLICE_NONE) {
		    double t = -100;
		    switch (slice) {
		    case SLICE_X: t = (sliceval-camx)/camvx; break;
		    case SLICE_Y: t = (sliceval-camy)/camvy; break;
		    case SLICE_Z: t = (sliceval-camz)/camvz; break;
		    }
		    if (t < mint || t > maxt) {
			fillSquare(i, j, 0, 0, 0);
			continue;
		    }
		    mint = maxt = t;
		}
		// sample evenly along intersecting portion
		double tstep = (maxt-mint)/(sampleCount-1);
		double pathlen = (maxt-mint)*camnorm;
		int maxn = sampleCount-1;
		n = 1;
		double xx = (camx + camvx * mint) * xmult;
		double yy = (camy + camvy * mint) * ymult;
		double zz = (camz + camvz * mint) * zmult;
		if (slice != SLICE_NONE) {
		    maxn = 1;
		    n = 0;
		    pathlen = 2;
		    if (xx >  xmult || yy >  ymult || zz >  zmult ||
			xx < -xmult || yy < -ymult || zz < -zmult) {
			fillSquare(i, j, 0, 0, 0);
			continue;
		    }
		}
		camvx *= tstep*xmult;
		camvy *= tstep*ymult;
		camvz *= tstep*zmult;
		int dshalf = dataSize/2;
		int oi;
		for (; n < maxn; n++) {
		    // find grid element that contains sampled point
		    double r = Math.sqrt(xx*xx+yy*yy+zz*zz);
		    double costh = zz/r;
		    int ri = (int) r;
		    int costhi = (int) (costh*dshalf+dshalf);
		    float fr = 0, fi = 0;
		    calcPhiComponent(xx, yy);
		    for (oi = 0; oi != orbCount; oi++) {
			Orbital oo = orbitals[oi];
			oo.computePoint(ri, costhi);
			fr += funcr;
			fi += funci;
		    }
		    if (color) {
			double fv = fr*fr+fi*fi;
			fv *= sampleMult[n];
			PhaseColor col = getPhaseColor(fr, fi);
			simpr += col.r * fv;
			simpg += col.g * fv;
			simpb += col.b * fv;
		    } else {
			float fv = (fr*fr+fi*fi) * sampleMult[n];
			simpr = simpg = (simpb += fv);
		    }
		    xx += camvx;
		    yy += camvy;
		    zz += camvz;
		}
		simpr *= pathlen/n;
		simpg *= pathlen/n;
		simpb *= pathlen/n;
		fillSquare(i, j, simpr, simpg, simpb);
	    }
    }

    void fillSquare(int i, int j, float cr, float cg, float cb) {
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
    
    PhaseColor getPhaseColor(double x, double y) {
	double val = 0;
	if (x == 0 && y == 0)
	    return phaseColors[0];
	int offset = 0;
	if (y >= 0) {
	    if (x >= 0) {
		if (x >= y) {
		    offset = 0;
		    val = y/x;
		} else {
		    offset = phaseColorCount;
		    val = 1-x/y;
		}
	    } else {
		if (-x <= y) {
		    offset = 2*phaseColorCount;
		    val = -x/y;
		} else {
		    offset = 3*phaseColorCount;
		    val = 1+y/x;
		}
	    }
	} else {
	    if (x <= 0) {
		if (y >= x) {
		    offset = 4*phaseColorCount;
		    val = y/x;
		} else {
		    offset = 5*phaseColorCount;
		    val = 1-x/y;
		}
	    } else {
		if (-y >= x) {
		    offset = 6*phaseColorCount;
		    val = -x/y;
		} else {
		    offset = 7*phaseColorCount;
		    val = 1+y/x;
		}
	    }
	}
	return phaseColors[offset+(int) (val*(phaseColorCount-1))];
    }
    
    void calcPhiComponent(double x, double y) {
	int phiSector = 0;
	double val = 0;
	if (x == 0 && y == 0) {
	    phiIndex = 0;
	    return;
	}
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
	phiIndex = (phiSector*(dataSize+1))+(int) (val*dataSize);
    }

    double getScaleRadius(int n) {
	int l = 0;
	// set scale by solving equation Veff(r) = E, assuming m=0
	// Veff(r) = -1/r + l(l+1)/2, E = 1/2n^2
	double b0 = -n*n*2;
	double c0 = l*(l+1)*n*n;
	double r0 = .5*(-b0+Math.sqrt(b0*b0-4*c0));
	return r0;
    }

    void setScale(int n) {
	if (manualScale || !autoZoomItem.getState())
	    return;
	double outer = getScaleRadius(n);

	// 3.15 is fudge factor determined by trial and error
	int scaleValue = (int) (outer*3.15);
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
	    int nv = oldScaleValue+diff;
	    if (!animatedZoomItem.getState())
		nv = scaleValue;
	    scaleBar.setValue(nv);
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

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    long lastFrameTime;
    
    public void updateAtomTrans(Graphics realg) {
	int n1 = 1;
	int n2 = 1;
	switch (freqChooser.getSelectedIndex()) {
	case 0: n1 = 1; n2 = 2; break;
	case 1: n1 = 1; n2 = 3; break;
	case 2: n1 = 1; n2 = 4; break;
	case 3: n1 = 2; n2 = 3; break;
	case 4: n1 = 2; n2 = 4; break;
	case 5: n1 = 3; n2 = 4; break;
	};

	Graphics g = null;
	if (winSize == null || winSize.width == 0)
	    return;
	g = dbimage.getGraphics();
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());
	if (fontMetrics == null)
	    fontMetrics = g.getFontMetrics();

	boolean allQuiet = false; // XXX
	
	double norm = 0;
	double normmult = 0, normmult2 = 0;

	normalize();

	int i;
	for (i = 0; i != stateCount; i++) {
	    State st = states[i];
	    norm += st.magSquared();
	}
	normmult2 = 1/norm;
	if (norm == 0)
	    normmult2 = 0;
	normmult = Math.sqrt(normmult2);

	setScale(n2);
	//setBrightness(normmult2);
	boolean sliced = sliceChooser.getSelectedIndex() != SLICE_NONE;
	zoom = (sliced) ? 8 : 16.55;
	colorMult = Math.exp(brightnessBar.getValue()/100.);
	//System.out.println(colorMult);
	computeView(normmult);
	int j, k;

	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].paneY,
		       winSize.width, viewList[i].paneY);
	}

	if (viewPotential != null) {
	    double ymult = viewPotential.height * 1.9;
	    g.setColor(Color.darkGray);
	    for (i = 1; i != 16; i++) {
		double e = -1/(2.*i*i);
		int y = viewPotential.y - (int) (ymult * e);
		g.drawLine(0, y, winSize.width, y);
	    }

	    double xp = getScaler();
	    
	    g.setColor(Color.white);
	    int ox = -1, oy = -1;
	    int x;
	    int floory = viewPotential.y + viewPotential.height - 1;
	    for (x = 0; x != winSize.width; x++) {
		double xx = (x-winSize.width/2)*xp;
		if (xx < 0)
		    xx = -xx;
		if (xx < 1e-3)
		    xx = 1e-3;
		double dy = -1/xx;
		int y = viewPotential.y - (int) (ymult * dy);
		if (y > floory) {
		    if (ox == -1)
			continue;
		    g.drawLine(ox, oy, ox, floory);
		    ox = -1;
		    continue;
		}
		if (ox == -1 && x > 0) {
		    g.drawLine(x, floory, x, y);
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
		    double prob = st.magSquared()*normmult2;
		    expecte += prob*st.elevel;
		}
		int y = viewPotential.y - (int) (ymult * expecte);
		g.setColor(Color.red);
		g.drawLine(0, y, winSize.width, y);
	    }
	    
	    if (selectedState != null && !dragging) {
		g.setColor(Color.yellow);
		int y = viewPotential.y - (int) (ymult * selectedState.elevel);
		g.drawLine(0, y, winSize.width, y);
	    }
	}

	if (imageSource != null)
	    imageSource.newPixels();
	g.drawImage(memimage, viewX.x, viewX.y, null);
	g.setColor(Color.white);
	if (sliced)
	    drawCube(g, false);
	if (axesItem.getState())
	    drawAxes(g);
	g.setColor(Color.yellow);
	if (selectedState != null)
	    centerString(g, selectedState.getText(),
			 viewX.y+viewX.height-5);
	else if (dimensionsItem.getState()) {
	    double xp = getScaler();
	    double w = winSize.width*xp * 52.9463;
	    double lambda = 91.1763/(1./(n1*n1)-1./(n2*n2))+.5;
	    double period = 3.3356 * lambda;
	    
	    // calculate expectation value of E
	    double expecte = 0;
	    if (norm != 0) {
		for (i = 0; i != stateCount; i++) {
		    State st = states[i];
		    double prob = st.magSquared()*normmult2;
		    expecte += prob*st.elevel;
		}
	    }
	    double energy = 13.6*2*expecte;
	    energy = ((int) (energy*10))/10.;
	    centerString(g, "Screen width = " + (int)w + " pm, " +
			 "Wavelength = " + (int)lambda + " nm",
			 viewX.y+viewX.height-25);
	    centerString(g, "Period = " + (int)period + " attoseconds, " +
			 "<E> = " + energy + " eV",
			 viewX.y+viewX.height-5);
	}
	
	if (viewStates != null) {
	    drawPhasors(g, viewStates);
	    drawTransitions(g, viewStates, n1, n2);
	}

	long steprate = 24*speedBar.getValue();
	boolean stopped = (stoppedCheck.getState() || dragging);
	if (stopped)
	    lastFrameTime = 0;
	else
	    allQuiet = false;
	
	// iteration
	if (newcoef == null) {
	    newcoef = new Complex[stateCount];
	    for (j = 0; j != stateCount; j++)
		newcoef[j] = new Complex();
	}
	double tadd = Math.exp(stepBar.getValue()/20.)*(.1/5);
	double strengthMul = Math.exp(strengthBar.getValue()/20.)/(9*455e2);
	freq = getState(n1, 0, 0).elevel - getState(n2, 0, 0).elevel;
	double dipoleArr[] = null;
	boolean circular = false;
	int cwmult = 1;
	switch (dirChooser.getSelectedIndex()) {
	case DIR_X: dipoleArr = dipoleOpX; break;
	case DIR_Y: dipoleArr = dipoleOpY; break;
	case DIR_Z: dipoleArr = dipoleOpZ; break;
	case DIR_CCW: circular = true; cwmult = -1; break;
	case DIR_CW:  circular = true; break;
	}
	Complex mul = new Complex();
	Complex newval = new Complex();
	double baseEnergy = getState(n1, 0, 0).elevel-.01;
	int iter;
	for (iter = 1; ; iter++) {
	    if (stopped)
		break;
	    double mul1 = strengthMul * Math.sin(t*freq) * tadd;
	    double mul2 = strengthMul * Math.cos(t*freq) * tadd;
	    freqPhase = (t*freq) % (2*pi);
	    for (j = 0; j != stateCount; j++) {
		BasisState st = states[j];
		if (restrictItem.getState() && st.n != n1 && st.n != n2) {
		    newcoef[j].setRe(0);
		    continue;
		}
		newval.set(st);
		for (k = 0; k != stateCount; k++) {
		    BasisState sk = states[k];
		    if (sk.n != n1 && sk.n != n2)
			continue;
		    if (circular) {
			double dpx = dipoleOp(j, k, dipoleOpX);
			double dpy = -cwmult*dipoleOp(j, k, dipoleOpY);
			mul.setReIm(mul2*dpx, mul1*dpy);
		    } else {
			double dp = mul1*dipoleOp(j, k, dipoleArr);
			if (dipoleArr == dipoleOpY)
			    mul.setReIm(0, -dp);
			else
			    mul.setRe(dp);
		    }
//		    mul.multI();
		    mul.multReIm(0, 1);
		    mul.mult(sk);
		    newval.addQuick(mul.re, mul.im);
		}
		double ang = -(st.elevel-baseEnergy)*tadd;
		double angr = Math.cos(ang);
		double angi = Math.sin(ang);
		newval.multReIm(angr, angi);
		if (newval.mag > 1e-6)
		    newcoef[j].set(newval);
		else
		    newcoef[j].setRe(0);
	    }
	    for (j = 0; j != stateCount; j++)
		states[j].set(newcoef[j]);
	    t += tadd;
	    long tm = System.currentTimeMillis();
	    if (iter*1000 >= steprate*(tm-lastFrameTime) ||
		(tm-lastFrameTime > 500))
		break;
	}
	double ex = 0, ey = 0, ez = 0;
	switch (dirChooser.getSelectedIndex()) {
	case DIR_X: ex = Math.sin(t*freq); break;
	case DIR_Y: ey = Math.sin(t*freq); break;
	case DIR_Z: ez = Math.sin(t*freq); break;
	case DIR_CCW:
	case DIR_CW:
	    ex = Math.cos(t*freq);
	    ey = cwmult*Math.sin(t*freq);
	    break;
	}
	normalize();
	createOrbitals();
	int q = (int) (20*Math.sin(t*freq));
	g.setColor(Color.darkGray);
	double da = .5;
	map3d(0, 0, 0, xpoints, ypoints, 0, viewField);
	map3d(da, 0, 0, xpoints, ypoints, 1, viewField);
	g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	map3d(0, da, 0, xpoints, ypoints, 1, viewField);
	g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	map3d(0, 0, da, xpoints, ypoints, 1, viewField);
	g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	g.setColor(Color.white);
	map3d(ex*da, ey*da, ez*da, xpoints, ypoints, 1, viewField);
	drawArrow(g, null, xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	if (!dimensionsItem.getState())
	    g.drawString("qE", viewField.x +
			 (viewField.width-fontMetrics.stringWidth("qE"))/2,
			 viewField.y+viewField.height-10);

	realg.drawImage(dbimage, 0, 0, this);
	lastFrameTime = System.currentTimeMillis();
	if (!allQuiet)
	    cv.repaint(pause);
    }


    double dipoleOpX[] = {
	0., 0., 0., 0., 0., 0.526749, 0.,
	-0.526749, 0.210938, 0., -0.210938, 0.124346,
	0., -0.124346, 0.085203, 0., -0.085203, 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., -2.12132, 0., 2.12132,
	1.25121, 0., -1.25121, 0.523487, 0., -0.523487,
	0.315964, 0., -0.315964, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0.383102, 0., -0.383102, -5.19615,
	0., 5.19615, 2.23285, 0., -2.23285, 0.922468,
	0., -0.922468, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0.156074, 0., -0.156074, 0.997569, 0., -0.997569,
	-9.48683, 0., 9.48683, 3.47739, 0., -3.47739,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0.0930919, 0.,
	-0.0930919, 0.395842, 0., -0.395842, 1.87806,
	0., -1.87806, -15., 0., 15., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.526749,
	-2.12132, 0.383102, 0.156074, 0.0930919, 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 2.12337,
	0., -0.866861, 0., 0., 0.764602, 0., -0.312148,
	0., 0., 0.436072, 0., -0.178026, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 1.50145, 0., -1.50145, 0., 0.,
	0.540655, 0., -0.540655, 0., 0., 0.30835, 0.,
	-0.30835, 0., -0.526749, 2.12132, -0.383102,
	-0.156074, -0.0930919, 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0.866861, 0.,
	-2.12337, 0., 0., 0.312148, 0., -0.764602,
	0., 0., 0.178026, 0., -0.436072, 0.210938,
	1.25121, -5.19615, 0.997569, 0.395842, 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., -4.5, 0.,
	1.83712, 0., 0., 3.38335, 0., -1.38125, 0., 0.,
	1.32747, 0., -0.541939, 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., -3.18198, 0., 3.18198, 0., 0., 2.39239,
	0., -2.39239, 0., 0., 0.938666, 0., -0.938666,
	0., -0.210938, -1.25121, 5.19615, -0.997569,
	-0.395842, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., -1.83712, 0., 4.5, 0.,
	0., 1.38125, 0., -3.38335, 0., 0., 0.541939,
	0., -1.32747, 0.124346, 0.523487, 2.23285,
	-9.48683, 1.87806, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0.582386, 0., -0.237758, 0.,
	0., -9.29516, 0., 3.79473, 0., 0., 4.93677, 0.,
	-2.01543, 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.411809,
	0., -0.411809, 0., 0., -6.57267, 0., 6.57267,
	0., 0., 3.49082, 0., -3.49082, 0., -0.124346,
	-0.523487, -2.23285, 9.48683, -1.87806, 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0.237758, 0., -0.582386, 0., 0., -3.79473, 0.,
	9.29516, 0., 0., 2.01543, 0., -4.93677, 0.085203,
	0.315964, 0.922468, 3.47739, -15., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0.215914,
	0., -0.0881464, 0., 0., 1.36191, 0., -0.555997,
	0., 0., -15.3704, 0., 6.27495, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0.152674, 0., -0.152674, 0., 0.,
	0.963015, 0., -0.963015, 0., 0., -10.8685, 0.,
	10.8685, 0., -0.085203, -0.315964, -0.922468,
	-3.47739, 15., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0.0881464, 0., -0.215914,
	0., 0., 0.555997, 0., -1.36191, 0., 0., -6.27495,
	0., 15.3704, 0., 0., 0., 0., 0., 2.12337, 0.,
	0., -4.5, 0., 0., 0.582386, 0., 0., 0.215914,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	1.50145, 0., 0., -3.18198, 0., 0., 0.411809,
	0., 0., 0.152674, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., -0.866861, 0., 0.866861, 1.83712, 0.,
	-1.83712, -0.237758, 0., 0.237758, -0.0881464,
	0., 0.0881464, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., -1.50145, 0., 0., 3.18198, 0., 0., -0.411809,
	0., 0., -0.152674, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., -2.12337, 0., 0., 4.5, 0., 0.,
	-0.582386, 0., 0., -0.215914, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0.764602, 0., 0., 3.38335, 0.,
	0., -9.29516, 0., 0., 1.36191, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0.540655, 0., 0.,
	2.39239, 0., 0., -6.57267, 0., 0., 0.963015,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., -0.312148,
	0., 0.312148, -1.38125, 0., 1.38125, 3.79473,
	0., -3.79473, -0.555997, 0., 0.555997, 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., -0.540655, 0., 0.,
	-2.39239, 0., 0., 6.57267, 0., 0., -0.963015,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	-0.764602, 0., 0., -3.38335, 0., 0., 9.29516,
	0., 0., -1.36191, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0.436072, 0., 0., 1.32747, 0., 0., 4.93677,
	0., 0., -15.3704, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0.30835, 0., 0., 0.938666, 0.,
	0., 3.49082, 0., 0., -10.8685, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., -0.178026, 0., 0.178026,
	-0.541939, 0., 0.541939, -2.01543, 0., 2.01543,
	6.27495, 0., -6.27495, 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., -0.30835, 0., 0., -0.938666, 0.,
	0., -3.49082, 0., 0., 10.8685, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., -0.436072, 0., 0.,
	-1.32747, 0., 0., -4.93677, 0., 0., 15.3704, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0.};
    double dipoleOpY[] = {
	0., 0., 0., 0., 0., 0.526749,
	0., 0.526749, 0.210938, 0., 0.210938, 0.124346,
	0., 0.124346, 0.085203, 0., 0.085203, 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., -2.12132, 0., -2.12132,
	1.25121, 0., 1.25121, 0.523487, 0., 0.523487,
	0.315964, 0., 0.315964, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0.383102, 0., 0.383102, -5.19615,
	0., -5.19615, 2.23285, 0., 2.23285, 0.922468,
	0., 0.922468, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0.156074, 0., 0.156074, 0.997569, 0., 0.997569,
	-9.48683, 0., -9.48683, 3.47739, 0., 3.47739,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0.0930919, 0.,
	0.0930919, 0.395842, 0., 0.395842, 1.87806, 0.,
	1.87806, -15., 0., -15., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., -0.526749,
	2.12132, -0.383102, -0.156074, -0.0930919, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	2.12337, 0., 0.866861, 0., 0., 0.764602, 0.,
	0.312148, 0., 0., 0.436072, 0., 0.178026, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 1.50145, 0., 1.50145,
	0., 0., 0.540655, 0., 0.540655, 0., 0., 0.30835,
	0., 0.30835, 0., -0.526749, 2.12132, -0.383102,
	-0.156074, -0.0930919, 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0.866861, 0.,
	2.12337, 0., 0., 0.312148, 0., 0.764602, 0., 0.,
	0.178026, 0., 0.436072, -0.210938, -1.25121,
	5.19615, -0.997569, -0.395842, 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., -4.5, 0.,
	-1.83712, 0., 0., 3.38335, 0., 1.38125, 0., 0.,
	1.32747, 0., 0.541939, 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., -3.18198, 0., -3.18198, 0., 0., 2.39239,
	0., 2.39239, 0., 0., 0.938666, 0., 0.938666,
	0., -0.210938, -1.25121, 5.19615, -0.997569,
	-0.395842, 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., -1.83712, 0., -4.5, 0.,
	0., 1.38125, 0., 3.38335, 0., 0., 0.541939,
	0., 1.32747, -0.124346, -0.523487, -2.23285,
	9.48683, -1.87806, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0.582386, 0., 0.237758, 0.,
	0., -9.29516, 0., -3.79473, 0., 0., 4.93677, 0.,
	2.01543, 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.411809,
	0., 0.411809, 0., 0., -6.57267, 0., -6.57267,
	0., 0., 3.49082, 0., 3.49082, 0., -0.124346,
	-0.523487, -2.23285, 9.48683, -1.87806, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0.237758, 0., 0.582386, 0., 0., -3.79473,
	0., -9.29516, 0., 0., 2.01543, 0., 4.93677,
	-0.085203, -0.315964, -0.922468, -3.47739, 15.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0.215914, 0., 0.0881464, 0., 0., 1.36191,
	0., 0.555997, 0., 0., -15.3704, 0., -6.27495,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0.152674, 0.,
	0.152674, 0., 0., 0.963015, 0., 0.963015, 0., 0.,
	-10.8685, 0., -10.8685, 0., -0.085203, -0.315964,
	-0.922468, -3.47739, 15., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0.0881464,
	0., 0.215914, 0., 0., 0.555997, 0., 1.36191, 0.,
	0., -6.27495, 0., -15.3704, 0., 0., 0., 0., 0.,
	-2.12337, 0., 0., 4.5, 0., 0., -0.582386, 0.,
	0., -0.215914, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., -1.50145, 0., 0., 3.18198, 0., 0.,
	-0.411809, 0., 0., -0.152674, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., -0.866861, 0., -0.866861,
	1.83712, 0., 1.83712, -0.237758, 0., -0.237758,
	-0.0881464, 0., -0.0881464, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., -1.50145, 0., 0., 3.18198, 0.,
	0., -0.411809, 0., 0., -0.152674, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., -2.12337, 0., 0.,
	4.5, 0., 0., -0.582386, 0., 0., -0.215914, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., -0.764602, 0., 0.,
	-3.38335, 0., 0., 9.29516, 0., 0., -1.36191,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	-0.540655, 0., 0., -2.39239, 0., 0., 6.57267,
	0., 0., -0.963015, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., -0.312148, 0., -0.312148, -1.38125, 0.,
	-1.38125, 3.79473, 0., 3.79473, -0.555997, 0.,
	-0.555997, 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	-0.540655, 0., 0., -2.39239, 0., 0., 6.57267,
	0., 0., -0.963015, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., -0.764602, 0., 0., -3.38335, 0.,
	0., 9.29516, 0., 0., -1.36191, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., -0.436072, 0., 0., -1.32747, 0.,
	0., -4.93677, 0., 0., 15.3704, 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., -0.30835, 0., 0.,
	-0.938666, 0., 0., -3.49082, 0., 0., 10.8685,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., -0.178026,
	0., -0.178026, -0.541939, 0., -0.541939,
	-2.01543, 0., -2.01543, 6.27495, 0., 6.27495, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., -0.30835, 0., 0.,
	-0.938666, 0., 0., -3.49082, 0., 0., 10.8685,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	-0.436072, 0., 0., -1.32747, 0., 0., -4.93677,
	0., 0., 15.3704, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0.
    };

    double dipoleOpZ[] = {
	0., 0., 0., 0., 0., 0., 0.744936,
	0., 0., 0.298311, 0., 0., 0.175852, 0., 0.,
	0.120495, 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., -3., 0., 0., 1.76947, 0., 0., 0.740323, 0.,
	0., 0.446841, 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0.541788, 0., 0., -7.34847, 0., 0., 3.15772,
	0., 0., 1.30457, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0.220722, 0., 0., 1.41077, 0., 0.,
	-13.4164, 0., 0., 4.91777, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0.131652, 0., 0., 0.559805,
	0., 0., 2.65597, 0., 0., -21.2132, 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 2.12337, 0., 0., 0.,
	0., 0.764602, 0., 0., 0., 0., 0.436072, 0., 0.,
	0., 0.744936, -3., 0.541788, 0.220722, 0.131652,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 2.45185, 0., 0., 0., 0., 0.882887, 0.,
	0., 0., 0., 0.503533, 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 2.12337, 0., 0., 0., 0., 0.764602,
	0., 0., 0., 0., 0.436072, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., -4.5, 0., 0., 0., 0., 3.38335, 0., 0.,
	0., 0., 1.32747, 0., 0., 0., 0.298311, 1.76947,
	-7.34847, 1.41077, 0.559805, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., -5.19615, 0.,
	0., 0., 0., 3.90676, 0., 0., 0., 0., 1.53283, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., -4.5, 0.,
	0., 0., 0., 3.38335, 0., 0., 0., 0., 1.32747,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0.582386, 0., 0.,
	0., 0., -9.29516, 0., 0., 0., 0., 4.93677, 0.,
	0., 0., 0.175852, 0.740323, 3.15772, -13.4164,
	2.65597, 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0.672481, 0., 0., 0., 0.,
	-10.7331, 0., 0., 0., 0., 5.70049, 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0.582386, 0.,
	0., 0., 0., -9.29516, 0., 0., 0., 0., 4.93677,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0.215914, 0., 0.,
	0., 0., 1.36191, 0., 0., 0., 0., -15.3704, 0.,
	0., 0., 0.120495, 0.446841, 1.30457, 4.91777,
	-21.2132, 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0.249316, 0., 0., 0., 0.,
	1.5726, 0., 0., 0., 0., -17.7482, 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0.215914, 0., 0.,
	0., 0., 1.36191, 0., 0., 0., 0., -15.3704, 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 2.12337, 0., 0., -4.5, 0., 0., 0.582386, 0.,
	0., 0.215914, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 2.45185, 0., 0., -5.19615, 0., 0.,
	0.672481, 0., 0., 0.249316, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 2.12337, 0., 0., -4.5,
	0., 0., 0.582386, 0., 0., 0.215914, 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0.764602, 0.,
	0., 3.38335, 0., 0., -9.29516, 0., 0., 1.36191,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0.882887, 0., 0., 3.90676, 0., 0., -10.7331,
	0., 0., 1.5726, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0.764602, 0., 0., 3.38335, 0., 0.,
	-9.29516, 0., 0., 1.36191, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0.436072, 0., 0.,
	1.32747, 0., 0., 4.93677, 0., 0., -15.3704,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0.503533, 0., 0., 1.53283, 0., 0., 5.70049, 0.,
	0., -17.7482, 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0.436072, 0., 0., 1.32747, 0., 0.,
	4.93677, 0., 0., -15.3704, 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
	0., 0., 0., 0., 0., 0.
    };

    double dipoleOp(int a, int b, double arr[]) {
	BasisState sa = states[a];
	BasisState sb = states[b];
	if (sa.n == sb.n)
	    return 0;
	if (sa.l > 2 || sb.l > 2)
	    return 0;
	if (sa.n > 5 || sb.n > 5)
	    return 0;
	int san = getDipoleStateNum(sa);
	int sbn = getDipoleStateNum(sb);
	return arr[san*32+sbn];
    }

    int getDipoleStateNum(BasisState bs) {
	if (bs.l == 0)
	    return bs.n-1;
	if (bs.l == 1)
	    return 5 + (bs.n-2)*3 + bs.m + 1;
	return 17 + (bs.n-3)*5 + bs.m + 2;
    }

    double getScaler() {
	// XXX don't duplicate this
	double scalex = viewX.width*zoom/2;
	double scaley = viewX.height*zoom/2;
	double aratio = viewX.width/(double) viewX.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;
	double xp = 2*scalex/viewDistance;
	double mult = scaleBar.getValue() / 50.;
	xp /= 50*mult;
	xp = 1/xp;
	return xp;
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
	    boolean yel = (selectedState == st);
	    g.setColor(yel ? Color.yellow :
		       st.mag == 0 ? gray2 : Color.white);
	    g.drawOval(x-ss2, y-ss2, ss, ss);
	    int xa = (int) (st.re*ss2);
	    int ya = (int) (-st.im*ss2);
	    g.drawLine(x, y, x+xa, y+ya);
	    g.drawLine(x+xa-1, y+ya, x+xa+1, y+ya);
	    g.drawLine(x+xa, y+ya-1, x+xa, y+ya+1);
	}
    }

    void drawTransitions(Graphics g, View v, int n1, int n2) {
	int i;
	int offx = winSize.width/2;
	if (phasors[0].width*11 >= offx)
	    return;
	Complex mul = new Complex();
	Complex newval = new Complex();
	boolean circular = false;
	int cwmult = 1;
	double dipoleArr[] = null;
	switch (dirChooser.getSelectedIndex()) {
	case DIR_X: dipoleArr = dipoleOpX; break;
	case DIR_Y: dipoleArr = dipoleOpY; break;
	case DIR_Z: dipoleArr = dipoleOpZ; break;
	case DIR_CCW: circular = true; cwmult = -1; break;
	case DIR_CW:  circular = true; break;
	}
	for (i = 0; i != phasorCount; i++) {
	    Phasor ph = phasors[i];
	    BasisState st = (BasisState) ph.state;
	    int ss = ph.width;
	    int ss2 = ss/2;
	    int x = ph.x + ss2 + offx;
	    int y = ph.y + ss2;
	    boolean yel = (selectedState == st);
	    g.setColor(yel ? Color.yellow :
		       st.mag == 0 ? gray2 : Color.white);

	    double dip = 0;
	    int j;
	    newval.setRe(0);
	    for (j = 0; j != stateCount; j++) {
		BasisState sj = states[j];
		int ii = st.index;
		if (circular) {
		    double dpx = dipoleOp(ii, j, dipoleOpX);
		    double dpy = -cwmult*dipoleOp(ii, j, dipoleOpY);
		    mul.setRe(dpx+dpy);
		} else {
		    double dp = dipoleOp(ii, j, dipoleArr);
		    if (dipoleArr == dipoleOpY)
			mul.setReIm(0, -dp);
		    else
			mul.setRe(dp);
		}
		mul.multReIm(0, 1);
//		mul.multI();
		mul.mult(sj);
		newval.addQuick(mul.re, mul.im);
	    }
	    double nvn = (newval.re*newval.re + newval.im*newval.im)*1e4 +
		1e-8;
	    nvn = Math.sqrt(nvn);
	    int c; // = (int) (6+Math.log(nvn)*16);
	    c = (int) (nvn*3.5);
	    if (c > 255)
		c = 255;
	    if (c < 0)
		c = 0;
	    g.setColor(new Color(0f, 0f, c/255f));
	    g.fillOval(x-ss2, y-ss2, ss, ss);
	    g.setColor(st.n == n1 || st.n == n2 ? purple : gray2);
	    g.drawOval(x-ss2, y-ss2, ss, ss);
	}
    }

    void drawFunction(Graphics g, View view, int pos,
		      double fr[], int count, int pad, boolean fromZero) {
	int i;
	
	double expectx = 0;
	double expectx2 = 0;
	double maxsq = 0;
	double tot = 0;
	int vw = winSize.width/3;
	int vw2 = vw*4/5;
	int mid_x = (fromZero) ? (vw2/(count-1)) : vw2 * (count/2) / (count-1);
	int zero = mid_x;
	mid_x += vw*pos;
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
	double maxnm = Math.sqrt(maxsq);
	double uncert = Math.sqrt(expectx2-expectx*expectx);
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
	    int x = vw2 * i / (count-1) + vw*pos;
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


    // draw the cube containing the particles.  if drawAll is false then
    // we just draw faces that are facing the camera.  This routine draws
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
	    if (slice != SLICE_NONE && i/2 != slice-SLICE_X) {
		if (selectedSlice)
		    g.setColor(Color.yellow);
		int coord1 = (slice == SLICE_X) ? 1 : 0;
		int coord2 = (slice == SLICE_Z) ? 1 : 2;
		computeFace(i, 0, pts);
		pts[slice-SLICE_X] = sliceval;
		map3d(pts[0], pts[1], pts[2],
		      slicerPoints[0], slicerPoints[1], sp, viewX);
		computeFace(i, 2, pts);
		pts[slice-SLICE_X] = sliceval;
		map3d(pts[0], pts[1], pts[2],
		      slicerPoints[0], slicerPoints[1], sp+1, viewX);
		g.drawLine(slicerPoints[0][sp  ], slicerPoints[1][sp],
			   slicerPoints[0][sp+1], slicerPoints[1][sp+1]);
		sliceFaces[sp/2][0] = nx;
		sliceFaces[sp/2][1] = ny;
		sliceFaces[sp/2][2] = nz;
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
	    if (i == a) continue;
	    pts[i] = (((n>>1)^(n&1)) == 0) ? -1 : 1;
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

    void drawArrow(Graphics g, String text,
		   int x1, int y1, int x2, int y2, int as) {
	g.drawLine(x1, y1, x2, y2);
	double l = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
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
    }

    int scaleValue = -1;

    public void adjustmentValueChanged(AdjustmentEvent e) {
	//System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
/*	scalebar not shown to user
 * 	if (e.getSource() == scaleBar) {
	    if (scaleBar.getValue() == scaleValue)
		return;
	    scaleValue = scaleBar.getValue();
	    precomputeAll();
	    manualScale = true;
	}*/
	if (e.getSource() == brightnessBar) {
	    double mult = Math.exp(brightnessBar.getValue()/100.);
	    userBrightMult = mult/bestBrightness;
	}
	if (e.getSource() == resolutionBar)
	    setResolution();
	setupSimpson();
	cv.repaint(pause);
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
	dragX = e.getX(); dragY = e.getY();
    }

    boolean csInRange(int x, int xa, int xb) {
	if (xa < xb)
	    return x >= xa-5 && x <= xb+5;
	return x >= xb-5 && x <= xa+5;
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
	    int xb = slicerPoints[0][n+1];
	    int ya = slicerPoints[1][n];
	    int yb = slicerPoints[1][n+1];
	    if (!csInRange(x, xa, xb) || !csInRange(y, ya, yb))
		continue;

	    double d;
	    if (xa == xb)
		d = Math.abs(x-xa);
	    else {
		// write line as y=a+bx
		double b = (yb-ya)/(double) (xb-xa);
		double a = ya-b*xa;
		
		// solve for distance
		double d1 = y-(a+b*x);
		if (d1 < 0)
		    d1 = -d1;
		d = d1/Math.sqrt(1+b*b);
	    }
	    if (d < 6) {
		selectedSlice = true;
		sliceFace = sliceFaces[n/2];
		break;
	    }
	}
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
	    checkSlice(e.getX(), e.getY());
	} else if (viewPotential.contains(x, y)) {
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
	dragging = false;
    }
    public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() instanceof CheckboxMenuItem) {
	    setupDisplay();
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() == setupChooser)
	    doSetup();
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
	int mode = MODE_ANGLE;
	if (selectedSlice)
	    mode = MODE_SLICE;
	if (mode == MODE_ANGLE) {
	    int xo = dragX-x;
	    int yo = dragY-y;
	    rotate(xo/40., -yo/40.);
	    cv.repaint(pause);
	} else if (mode == MODE_SLICE) {
	    double x3[] = new double[3];
	    unmap3d(x3, x, y, sliceFace, sliceFace);
	    switch (sliceChooser.getSelectedIndex()) {
	    case SLICE_X: sliceval = x3[0]; break;
	    case SLICE_Y: sliceval = x3[1]; break;
	    case SLICE_Z: sliceval = x3[2]; break;
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
	int ss2 = stateSize/2;
	int x0 = selectedPhasor.x + ss2;
	int y0 = selectedPhasor.y + ss2;
	x -= x0;
	y -= y0;
	double mag = Math.sqrt(x*x+y*y)/ss2;
	double ang = Math.atan2(-y, x);
	if (mag > 10)
	    mag = 0;
	if (mag > 1)
	    mag = 1;
	selectedState.setMagPhase(mag, ang);

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

    void createOrbitals() {
	int i;
	int newOrbCount = 0;
	boolean newOrbitals = false;
	
	double magmin = 0;
	for (i = 0; i != stateCount; i++) {
	    BasisState st = states[i];
	    if (st.m == 0) {
		if (st.mag > magmin) {
		    newOrbCount++;
		    if (st.orb == null)
			newOrbitals = true;
		} else if (st.orb != null)
		    newOrbitals = true;
	    } else if (st.m > 0) {
		if (st.mag > magmin || getState(st.n, st.l, -st.m).mag > magmin) {
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
	    if ((st.m == 0 && st.mag > magmin) ||
		(st.m > 0 && (st.mag > magmin ||
			      getState(st.n, st.l, -st.m).mag > magmin))) {
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
	double normmult = 1/Math.sqrt(norm);
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
	    states[i].multRe(1/maxm);
	cv.repaint(pause);
    }

    BasisState getState(int n, int l, int m) {
	int pre_n = n-1;
	int pre_n_add = pre_n*(pre_n+1)*(2*pre_n+1)/6;
	int pre_l_add = l*l;
	return states[pre_n_add+pre_l_add+l+m];
    }

    int getStateIndex(int n, int l, int m) {
	int pre_n = n-1;
	int pre_n_add = pre_n*(pre_n+1)*(2*pre_n+1)/6;
	int pre_l_add = l*l;
	return pre_n_add+pre_l_add+l+m;
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
	    double n = st.magSquared()*normmult;
	    if (orb.state.m != 0)
		n += getState(st.n, st.l, -st.m).magSquared()*normmult;
	    totn += n;
	    avg += n*as;
	}
	bestBrightness = 113.9/(Math.sqrt(minavg)*totn);
	double mult = bestBrightness * userBrightMult;
	int bvalue = (int) (Math.log(mult)*100.);
	brightnessBar.setValue(bvalue);
    }

    abstract class Orbital {
	BasisState state;
	int n, l, m;
	float reMult, imMult;
	Orbital(BasisState bs) {
	    n = bs.n; l = bs.l; m = bs.m;
	    state = bs;
	}
	void setupFrame(double mult) {
	    reMult = (float) (state.re*mult);
	    imMult = (float) (state.im*mult);
	}
	float dataR[], dataTh[], dataPhiR[], dataPhiI[];
	int dshalf;
	double brightnessCache;
	double getBoundRadius(double bright) {
	    int i;
	    int outer = 1;

	    /*
	    double maxThData = 0;
	    if (l == 0)
		maxThData = 1;
	    else {
		for (i = 0; i != dataSize; i++) {
		    if (dataTh[i] > maxThData)
			maxThData = dataTh[i];
		    if (dataTh[i] < -maxThData)
			maxThData = -dataTh[i];
		}
		}*/

	    // we need to divide the spherical harmonic norm out of
	    // dataR[] to get just the radial function.  (The spherical
	    // norm gets multiplied into dataR[] for efficiency.)
	    int mpos = (m < 0) ? -m : m;
	    double norm1 = 1/sphericalNorm(l, mpos);
	    //norm1 *= maxThData;
	    norm1 *= norm1;
	    norm1 *= bright;

	    for (i = 0; i != dataSize; i++) { // XXX
		double v = dataR[i]*dataR[i]*norm1;
		if (v > 32)
		    outer = i;
	    }
	    //System.out.println(maxThData + " " + outer);
	    return outer / (dataSize/2.);
	}

	final int distmult = 4;
	void precompute() {
	    int x, y, z;
	    dshalf = dataSize/2;
	    double mult = scaleBar.getValue() / 50.;

	    int mpos = (m < 0) ? -m : m;
	    double lgcorrect = Math.pow(-1, m);
	    double norm = radialNorm(n, l)*sphericalNorm(l, mpos);

	    dataR = new float[dataSize];
	    for (x = 0; x != dataSize; x++) {
		double r = x*resadj + .00000001;
		double rho = 2*r*mult/n;
		double rhol = Math.pow(rho, l)*norm;
		dataR[x] = (float) (hypser(l+1-n, 2*l+2, rho)*rhol*
				    Math.exp(-rho/2));
	    }

	    if (l > 0) {
		dataTh = new float[dataSize+1];
		for (x = 0; x != dataSize+1; x++) {
		    double th = (x-dshalf)/(double) dshalf;
		    // we multiply in lgcorrect because plgndr() uses a
		    // different sign convention than Bransden
		    dataTh[x] = (float) (lgcorrect*plgndr(l, mpos, th));
		}
	    }

	    if (m != 0) {
		dataPhiR = new float[8*(dataSize+1)];
		dataPhiI = new float[8*(dataSize+1)];
		int ix = 0;
		for (x = 0; x != 8; x++)
		    for (y = 0; y <= dataSize; y++, ix++) {
			double phi = x*pi/4 + y*(pi/4)/dataSize;
			dataPhiR[ix] = (float) Math.cos(phi*mpos);
			dataPhiI[ix] = (float) Math.sin(phi*mpos);
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
	    // dataR[] to get just the radial function.  (The spherical
	    // norm gets multiplied into dataR[] for efficiency.)
	    int mpos = (m < 0) ? -m : m;
	    double norm1 = 1/sphericalNorm(l, mpos);

	    for (x = 0; x != dataSize; x++) {
		double val = dataR[x]*norm1;
		val *= val;
		avgsq += val*val*x*x;
		vol += x*x;
	    }

	    brightnessCache = avgsq / vol;
	    return brightnessCache;
	}

	double radialNorm(int n, int l) {
	    double a0 = factorial(n+l);
	    return Math.sqrt(4.*factorial(n+l)/
				       (n*n*n*n*factorial(n-l-1)))/
		factorial(2*l+1);
	}

	double sphericalNorm(int l, int m) {
	    return Math.sqrt((2*l+1)*factorial(l-m)/
				       (4*pi*factorial(l+m)));
	}

	double factorial(int f) {
	    double res = 1;
	    while (f > 1)
		res *= f--;
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
		float v = dataR[r];
		funcr = reMult*v;
		funci = imMult*v;
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
		float v = dataR[r]*dataTh[costh];
		funcr = v*reMult;
		funci = v*imMult;
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
	    negstate = getState(bs.n, bs.l, -bs.m);
	}

	float f1, f2, f3, f4;

	void setupFrame(double mult) {
	    double a = state.re*mult;
	    double b = state.im*mult;
	    double c = negstate.re*mult;
	    double d = negstate.im*mult;
	    double mphase = Math.pow(-1, m);
	    a *= mphase;
	    b *= mphase;
	    f1 = (float) (a+c);
	    f2 = (float) (d-b);
	    f3 = (float) (b+d);
	    f4 = (float) (a-c);
	}

	void computePoint(int r, int costh) {
	    try {
		float q = dataR[r]*dataTh[costh];
		float phiValR = dataPhiR[phiIndex];
		float phiValI = dataPhiI[phiIndex];
		funcr = q*(f1*phiValR + f2*phiValI);
		funci = q*(f3*phiValR + f4*phiValI);
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
	int index;
	void convertDerivedToBasis() {}
	void convertBasisToDerived() {}
	void setBasisActive() {}
	abstract String getText();
    }

    class BasisState extends State {
	int n, l, m;
	Orbital orb;
	String getText() {
	    return "n = " + n + ", l = " + l + ", m = " + m;
	}
    }

/*    class Complex {
	public double re, im, mag, phase;
	Complex() { re = im = mag = phase = 0; }
	Complex(double r, double i) {
	    set(r, i);
	}
	double magSquared() { return mag*mag; }
	void set(double aa, double bb) {
	    re = aa; im = bb;
	    setMagPhase();
	}
	void set(double aa) {
	    re = aa; im = 0;
	    setMagPhase();
	}
	void set(Complex c) {
	    re = c.re;
	    im = c.im;
	    mag = c.mag;
	    phase = c.phase;
	}
	void add(double r) {
	    re += r;
	    setMagPhase();
	}
	void add(double r, double i) {
	    re += r; im += i;
	    setMagPhase();
	}
	void add(Complex c) {
	    re += c.re;
	    im += c.im;
	    setMagPhase();
	}
	void addQuick(Complex c) {
	    re += c.re;
	    im += c.im;
	}
	void square() {
	    set(re*re-im*im, 2*re*im);
	}
	void mult(double c, double d) {
	    set(re*c-im*d, re*d+im*c);
	}
	void mult(double c) {
	    re *= c; im *= c;
	    mag *= c;
	}
	void multI() {
	    double q = re;
	    re = -im;
	    im = q;
	}
	void mult(Complex c) {
	    mult(c.re, c.im);
	}
	void setMagPhase() {
	    mag = Math.sqrt(re*re+im*im);
	    phase = Math.atan2(im, re);
	}
	void setMagPhase(double m, double ph) {
	    mag = m;
	    phase = ph;
	    re = m*Math.cos(ph);
	    im = m*Math.sin(ph);
	}
	void rotate(double a) {
	    setMagPhase(mag, (phase+a) % (2*pi));
	}
	void conjugate() {
	    im = -im;
	    phase = -phase;
	}
    };*/

    class PhaseColor {
	public double r, g, b;
	PhaseColor(double rr, double gg, double bb) {
	    r = rr; g = gg; b = bb;
	}
    }

    double plgndr(int l,int m,double x) {
	double fact,pll = 0,pmm,pmmp1,somx2;
	int i,ll;

	if (m < 0 || m > l || Math.abs(x) > 1.0) {
	    System.out.print("bad arguments in plgndr\n");
	}
	pmm=1.0;
	if (m > 0) {
	    somx2=Math.sqrt((1.0-x)*(1.0+x));
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

    void setViewMatrix(double a, double b) {
	int i;
	for (i = 0; i != 9; i++)
	    rotmatrix[i] = 0;
	rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
	rotate(a, b);
    }

    void setXYViewExact() {
	setViewMatrix(0, 0);
    }

    void setXZView() {
	setViewMatrix(0, pi/11-pi/2);
    }

    void setXZViewExact() {
	setViewMatrix(0, -pi/2);
    }

    void doSetup() {
	int s = setupChooser.getSelectedIndex();
	int si = s*7;
	doClear();
	switch (setups[si]) {
	case STATE_1S: getState(1, 0, 0).setRe(1); break;
	case STATE_2S: getState(2, 0, 0).setRe(1); break;
	case STATE_2P1:  getState(2, 1, 1).setRe(1); break;
	case STATE_2PX:
	    getState(2, 1, 1).setRe(root2inv);
	    getState(2, 1, -1).setRe(-root2inv);
	    break;
	case STATE_2PZ:  getState(2, 1, 0).setRe(1); break;
	case STATE_3S:   getState(3, 0, 0).setRe(1); break;
	case STATE_2PM1: getState(2, 1, -1).setRe(1); break;
	}
	speedBar.setValue(setups[si+1]);
	strengthBar.setValue(setups[si+2]);
	brightnessBar.setValue(setups[si+3]);
	dirChooser.select(setups[si+4]);
	freqChooser.select(setups[si+6]);
	switch (setups[si+5]) {
	case VIEW_XZ: setXZViewExact(); break;
	case VIEW_XY: setXYViewExact(); break;
	case VIEW_XZ12: setXZView(); break;
	}
    }

    int setups[] = {
	STATE_1S, 15, 149, 1191, DIR_X, VIEW_XZ, FREQ_12,
	STATE_1S, 15, 149, 1191, DIR_Z, VIEW_XZ, FREQ_12,
	STATE_1S, 15, 149, 1191, DIR_CCW, VIEW_XY, FREQ_12,
	STATE_1S, 22, 161, 1334, DIR_Z, VIEW_XZ, FREQ_13,
	STATE_2S, 27, 127, 1381, DIR_Z, VIEW_XZ, FREQ_23,
	STATE_2S, 27, 127, 1381, DIR_CCW, VIEW_XY, FREQ_23,
	STATE_2P1, 27, 127, 1429, DIR_CW, VIEW_XZ12, FREQ_23,
	STATE_2PZ, 27, 127, 1429, DIR_CCW, VIEW_XZ12, FREQ_23,
	STATE_2PZ, 27, 127, 1429, DIR_X, VIEW_XZ, FREQ_23,
	STATE_2PX, 27, 127, 1429, DIR_Z, VIEW_XZ, FREQ_23,
	STATE_2P1, 27, 127, 1429, DIR_Z, VIEW_XZ12, FREQ_23,
	STATE_3S, 27, 127, 1429, DIR_Z, VIEW_XZ, FREQ_23,
	STATE_2PZ, 27, 127, 1429, DIR_Z, VIEW_XZ, FREQ_23,
	STATE_2S, 27, 127, 1572, DIR_Z, VIEW_XZ, FREQ_24,
	STATE_2P1, 38, 109, 1334, DIR_CCW, VIEW_XY, FREQ_23
    };
    String setupStrings[] = {
	"1s -> 2px", "1s -> 2pz", "1s -> 2p+1", "1s -> 3pz",
	"2s -> 3pz", "2s -> 3p+1", "2p+1 -> 3s+3dz2", "2pz -> 3d+1",
	"2pz -> 3dxz", "2px -> 3dxz", "2p+1 -> 3d+1", "3s -> 3dz2+3s",
	"2pz -> 3dz2", "2s -> 4pz", "2p+1 -> 3d+2",
	null
    };
}
