package com.falstad;
// base.java (C) 2001 by Paul Falstad, www.falstad.com
// this file must be run through cpp with one of BUILD_E, BUILD_V,
// BUILD_M defined before compiling with java compiler.  This was done
// to reduce class file sizes.

//web_Ready
//web_AppletName= 2-D Vector Fields
//web_Description= Demonstrates various properties of vector fields, including divergence and curl, etc.
//web_JavaVersion= http://www.falstad.com/vector/
//web_AppletImage= vector2d.png
//web_Category= Mathematics
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features= graphics, AWT-to-Swing

import java.io.InputStream;
import java.awt.Adjustable;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Rectangle;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Insets;
import java.awt.LayoutManager;
import java.awt.Point;
import java.awt.image.BufferedImage;
import java.awt.image.MemoryImageSource;
import java.applet.AudioClip;
import java.util.Vector;
import java.util.Hashtable;
import java.util.Enumeration;
import java.io.File;
import java.net.URL;
import java.util.Random;
import java.lang.Math;
import java.text.NumberFormat;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.InputEvent;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

import a2s.Applet;
import a2s.Canvas;
import a2s.TextField;

import a2s.Label;
import a2s.Choice;
import a2s.Frame;
import a2s.Checkbox;
import a2s.Button;

class VecDemoCanvas extends Canvas {
    VecDemoFrame pg;
    VecDemoCanvas(VecDemoFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateVecDemo(g);
    }
    public void paintComponent(Graphics g) {
	super.paintComponent(g);
	pg.updateVecDemo(g);
    }
};

class VecDemoLayout implements LayoutManager {
    public VecDemoLayout() {}
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
		if (m instanceof DecentScrollbar || m instanceof TextField)
		    d.width = barwidth;
		if (m instanceof Choice && d.width > barwidth)
		    d.width = barwidth;
		if (m instanceof Label) {
		    h += d.height/5;
		    d.width = barwidth;
		}
		System.out.println("moved " + m.getClass().getName() + " to " + cw + " " + h + " " + d.height);
		m.move(cw, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	}
    }
};

public class VecDemo extends Applet implements ComponentListener {
    static VecDemoFrame ogf;
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
	VecDemo demo = new VecDemo();
	demo.showFrame();
    }

    void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new VecDemoFrame(this);
	    ogf.initFrame();
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
	if (ogf == null || ogf.useFrame)
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

class VecDemoFrame extends Frame
    implements ComponentListener, ActionListener,
	       MouseMotionListener, MouseListener, ItemListener,
	       DecentScrollbarListener {
    
    Thread engine = null;

    Dimension winSize;
    Rectangle viewMain, viewAxes;
    Image dbimage;
    Image backimage;
    MemoryImageSource imageSource;
    int pixels[];
    
    VecDemo applet;
    Random random;
    
    public String getAppletInfo() {
	return "VecDemo by Paul Falstad";
    }

    static final double pi = 3.14159265358979323846;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    VecDemoCanvas cv;
    Checkbox stoppedCheck;
    Button resetButton;
    Button kickButton;
    Checkbox reverseCheck;
    Button infoButton;
    Choice functionChooser;
    Choice dispChooser;
    static final int DISP_PART_VELOC    = 0;
    static final int DISP_PART_FORCE    = 1;
    static final int DISP_VECTORS       = 2;
    static final int DISP_NONE          = 3;
    static final int DISP_CURLERS       = 4;
    Label partCountLabel;
    Label textFieldLabel;
    Label strengthLabel;
    DecentScrollbar partCountBar;
    DecentScrollbar strengthBar;
    DecentScrollbar aux1Bar;
    DecentScrollbar aux2Bar;
    DecentScrollbar aux3Bar;
    double fieldStrength, barFieldStrength;
    Color darkYellow = new Color(144, 144, 0);
    final double lineWidth = .001;
    class AuxBar {
	DecentScrollbar bar;
	Label label;
	AuxBar(Label l, DecentScrollbar b) { label = l; bar = b; }
    };
    AuxBar auxBars[];
    Label vecDensityLabel;
    DecentScrollbar vecDensityBar;
    Label potentialLabel;
    DecentScrollbar potentialBar;
    Label lineDensityLabel;
    DecentScrollbar lineDensityBar;
    Choice modeChooser;
    Choice floorColorChooser;
    Choice floorLineChooser;

    TextField textFields[];
    int reverse;
    int xpoints[];
    int ypoints[];
    GridElement grid[][];
    Particle particles[];
    FieldVector vectors[];
    int vecCount;
    int density[][];
    Checkbox flatCheck;
    boolean isFlat;
    double viewAngle, viewAngleDragStart;
    double viewZoom = 1.6, viewZoomDragStart;
    double viewAngleCos = 1, viewAngleSin = 0;
    double viewHeight = 2, viewHeightDragStart;
    double viewDistance = 5;
    int integralX = -1, integralY;
    int vectorSpacing = 16;
    int currentStep;
    boolean showA;
    boolean parseError;
    Color fieldColors[];
    static final int gridsize = 80;

    static final int densitygridsize = 16;
    static final double densitygroupsize = 2./densitygridsize;
    static final int maxParticleCount = 2500;
    boolean functionChanged;
    boolean backgroundChanged;
    boolean dragging, draggingView;
    int oldDragX, oldDragY, dragX, dragY, dragStartX, dragStartY;
    double dragZoomStart;
    Vector functionList;
    VecFunction curfunc;
    int pause = 20;
    boolean useFrame;
    static final int MOT_VELOCITY = 0;
    static final int MOT_FORCE    = 1;
    static final int MOT_CURLERS  = 2;
    static final int MOT_EQUIPOTENTIAL = 3;
    static final int FC_FIELD     = 0;
    static final int FC_POTENTIAL = 1;
    static final int FC_NONE      = 2;
    static final int FC_DIV       = 3;
    static final int FC_CURL      = 4;
    static final int FL_NONE      = 0;
    static final int FL_GRID      = 1;
    static final int FL_EQUIP     = 2;
    static final int FL_LINES     = 3;

    static final int MODE_VIEW_ROTATE  = 0;
    static final int MODE_VIEW_ZOOM    = 1;
    static final int MODE_LINE_INT     = 2;
    static final int MODE_SURF_INT     = 3;

    boolean useBufferedImage = false;
    
    VecDemoFrame(VecDemo a) {
	super(BUILD_CASE_EMV("2-D Electrostatic Fields Applet v1.4b", null,
			     "2-D Vector Fields Applet v1.4b"));
	applet = a;
    }

    static boolean BUILD_E = false;
    static boolean BUILD_V = true;
    static String BUILD_CASE_EMV(String e, String m, String v) { return BUILD_V ? v : e; }
    static VecFunction BUILD_CASE_EMV(VecFunction e, VecFunction m, VecFunction v) { return BUILD_V ? v : e; }
    
    public void initFrame() {
	useFrame = false;
	try {
	    String param = applet.getParameter("useFrame");
	    if (param != null && param.equalsIgnoreCase("true"))
		useFrame = true;

	    param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	    param = applet.getParameter("mode");
	    if (param != null && param.equalsIgnoreCase("electric")) {
		BUILD_E = true;
		BUILD_V = false;
	    }
	} catch (Exception e) { }

        String jv = System.getProperty("java.class.version");
        double jvf = new Double(jv).doubleValue();
        if (jvf >= 48)
	    useBufferedImage = true;
	
	functionList = new Vector();
	VecFunction vf = new InverseRadial();
	int ct = 0;
	while (vf != null) {
	    functionList.addElement(vf);
	    vf = vf.createNext();
	    if (ct == 1000) {
		System.out.print("setup loop\n");
		return;
	    }
	}

	Color particleColors[] = new Color[27];
	int i;
	for (i = 0; i != 27; i++)
	    particleColors[i] = new Color(((i%3)+1)*85,
					  ((i/3)%3+1)*85,
					  ((i/9)%3+1)*85);

	Container main = (useFrame) ? this : applet;
	
	random = new Random();
	particles = new Particle[maxParticleCount];
	for (i = 0; i != maxParticleCount; i++) {
	    particles[i] = new Particle();
	    particles[i].color = particleColors[i % 27];
	}
	xpoints = new int[4];
	ypoints = new int[4];
	density = new int[densitygridsize][densitygridsize];
	main.setLayout(new VecDemoLayout());
	cv = new VecDemoCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);

	/*infoButton = new Button("Function Info");
	add(infoButton);
	infoButton.addActionListener(this);*/

	functionChooser = new Choice();
	for (i = 0; i != functionList.size(); i++)
	    functionChooser.add("Setup: " +
	       ((VecFunction) functionList.elementAt(i)).getName());
	main.add(functionChooser);
	functionChooser.addItemListener(this);

	floorColorChooser = new Choice();
	floorColorChooser.add("Color: field magnitude");
	floorColorChooser.add("Color: potential");
	floorColorChooser.add("Color: none");
	if (BUILD_E)
	    floorColorChooser.add("Color: charge");
	else {
	    floorColorChooser.add("Color: divergence");
	    floorColorChooser.add("Color: curl z");
	}
	floorColorChooser.addItemListener(this);
	main.add(floorColorChooser);

	floorLineChooser = new Choice();
	floorLineChooser.add("Floor: no lines");
	floorLineChooser.add("Floor: grid");
	floorLineChooser.add("Floor: equipotentials");
	if (BUILD_V)
	    floorLineChooser.add("Floor: streamlines");
	else
	    floorLineChooser.add("Floor: field lines");
	floorLineChooser.addItemListener(this);
	main.add(floorLineChooser);
	floorLineChooser.select(FL_EQUIP);

	flatCheck = new Checkbox("Flat View");
	flatCheck.addItemListener(this);
	main.add(flatCheck);

	dispChooser = new Choice();
	dispChooser.addItemListener(this);
	setupDispChooser(true);
	main.add(dispChooser);

	modeChooser = new Choice();
	modeChooser.add("Mouse = Adjust Angle");
	modeChooser.add("Mouse = Adjust Zoom");
	modeChooser.add("Mouse = Line Integral");
	modeChooser.add("Mouse = Surface Integral");
	modeChooser.addItemListener(this);
	main.add(modeChooser);
	
	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	main.add(stoppedCheck);

	reverseCheck = new Checkbox("Reverse");
	reverseCheck.addItemListener(this);
	main.add(reverseCheck);

	resetButton = new Button("Reset");
	main.add(resetButton);
	resetButton.addActionListener(this);
	kickButton = new Button("Kick");
	main.add(kickButton);
	kickButton.addActionListener(this);
	kickButton.disable();

	main.add(strengthLabel = new Label("Field Strength", Label.CENTER));
	main.add(strengthBar = new DecentScrollbar(this, 80, 1, 120));

	main.add(partCountLabel = new Label("Number of Particles", Label.CENTER));
	main.add(partCountBar = new DecentScrollbar(this, 500, 1, maxParticleCount));

	main.add(vecDensityLabel = new Label("Vector Density", Label.CENTER));
	main.add(vecDensityBar = new DecentScrollbar(this, 32, 2, 64));

	/*add(lineDensityLabel = new Label("Line Density", Label.CENTER));
	  add(lineDensityBar = new DecentScrollbar(this, 5, 3, 8));*/

	main.add(potentialLabel = new Label("Potential", Label.CENTER));
	main.add(potentialBar = new DecentScrollbar(this, 250, 0, 1000));

	Label lb;
	auxBars = new AuxBar[3];
	main.add(lb = new Label("Aux 1", Label.CENTER));
	main.add(aux1Bar = new DecentScrollbar(this, 0, 0, 100));
	auxBars[0] = new AuxBar(lb, aux1Bar);

	main.add(lb = new Label("Aux 2", Label.CENTER));
	main.add(aux2Bar = new DecentScrollbar(this, 0, 0, 100));
	auxBars[1] = new AuxBar(lb, aux2Bar);

	main.add(lb = new Label("Aux 3", Label.CENTER));
	main.add(aux3Bar = new DecentScrollbar(this, 0, 0, 100));
	auxBars[2] = new AuxBar(lb, aux3Bar);

	if (BUILD_V)
	    main.add(textFieldLabel = new Label("", Label.CENTER));

	textFields = new TextField[2];
	for (i = 0; i != 2; i++) {
	    main.add(textFields[i] = new TextField());
	    textFields[i].addActionListener(this);
	}
	fieldColors = new Color[513];
	int grayLevel = 76;
	for (i = 0; i != 256; i++) {
	    int rb = grayLevel+(128-grayLevel)*i/255;
	    int g = grayLevel+(255-grayLevel)*i/255;
	    int col = (255<<24) | (g<<8) | (rb<<16) | (rb);
	    fieldColors[i] = new Color(col);
	}
	for (i = 0; i != 256; i++) {
	    int col = (255<<24) | (255<<8) | ((i/2+128) * (0x10001));
	    fieldColors[i+256] = new Color(col);
	}
	fieldColors[512] = fieldColors[511];

	main.add(new Label("http://www.falstad.com", Label.CENTER));

	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
	functionChanged();
	dispChooserChanged();
	finished = true;
	
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
            cv.repaint();
        }
        main.requestFocus();
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
	dbimage = cv.createImage(d.width, d.height);
	scaleworld();
	viewMain = new Rectangle(winSize);
	viewAxes = new Rectangle(winSize.width-100, 0, 100, 100);
	backgroundChanged = true;
	
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
		backimage = (Image) cstr.newInstance(new Object[] {
		    new Integer(d.width), new Integer(d.height),
		    new Integer(BufferedImage.TYPE_INT_RGB)});
		Method m = biclass.getMethod("getRaster", null);
		Object ras = m.invoke(backimage, null);
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
	    backimage = cv.createImage(imageSource);
	}
    }

    void resetDensityGroups() {
	int i, j, k;
	for (i = 0; i != densitygridsize; i++)
	    for (j = 0; j != densitygridsize; j++)
		density[i][j] = 0;
	int pcount = getParticleCount();
	for (i = 0; i != pcount; i++) {
	    Particle p = particles[i];
	    addToDensityGroup(p);
	}

	// invalidate all unused particles so they will be
	// repositioned if the particle slider is moved to the right,
	// rather than just falling in where they happened to be last time
	for (; i != maxParticleCount; i++) {
	    Particle p = particles[i];
	    p.lifetime = -100;
	}
    }

    int addToDensityGroup(Particle p) {
	int a = (int)((p.pos[0]+1)*(densitygridsize/2));
	int b = (int)((p.pos[1]+1)*(densitygridsize/2));
	int n = 0;
	try {
	n = ++density[a][b];
	if (n > maxParticleCount)
	    System.out.print(a + " " + b + " " + density[a][b] + "\n");
	} catch (Exception e) {
	    System.out.print(p.pos[0] + " " + p.pos[1] + "\n");
	    e.printStackTrace();
	}
	return n;
    }

    void removeFromDensityGroup(Particle p) {
	int a = (int)((p.pos[0]+1)*(densitygridsize/2));
	int b = (int)((p.pos[1]+1)*(densitygridsize/2));
	try {
	    if (--density[a][b] < 0)
		System.out.print(a + " " + b + " " + density[a][b] + "\n");
	} catch (Exception e) {
	    System.out.print(p.pos[0] + " " + p.pos[1] + "\n");
	    e.printStackTrace();
	}
    }

    void positionParticle(Particle p) {
	int x, y;
	int bestx = 0, besty = 0;
	int best = 10000;

	// we avoid scanning the grid in the same order every time
	// so that we treat equal-density squares as equally as possible.
	int randaddx = getrand(densitygridsize);
	int randaddy = getrand(densitygridsize);
	for (x = 0; x != densitygridsize; x++)
	    for (y = 0; y != densitygridsize; y++) {
		int ix = (randaddx + x) % densitygridsize;
		int iy = (randaddy + y) % densitygridsize;
		if (density[ix][iy] <= best) {
		    bestx = ix;
		    besty = iy;
		    best = density[ix][iy];
		}
	    }
	p.pos[0] = bestx*densitygroupsize +
	    getrand(100)*densitygroupsize/100.0 - 1;
	p.pos[1] = besty*densitygroupsize +
	    getrand(100)*densitygroupsize/100.0 - 1;
	p.lifetime = curfunc.redistribute() ? 500 : 5000;
	p.stepsize = 1;
	p.theta = (getrand(101)-50)*pi/50.;
	p.phi   = (getrand(101)-50)*pi/50.;
	int j;
	for (j = 0; j != 3; j++)
	    p.vel[j] = 0;
    }

    int getParticleCount() {
	return partCountBar.getValue();
    }

    void resetParticles() {
	int pcount = getParticleCount();
	int i, j;
	for (i = 0; i != pcount; i++) {
	    Particle p = particles[i];
	    for (j = 0; j != 2; j++) {
		p.pos[j] = getrand(200)/100.0 - 1;
		p.vel[j] = 0;
	    }
	    p.pos[2] = 0;
	    p.lifetime = i*2;
	    p.stepsize = 1;
	}
	integralX = -1;
	resetDensityGroups();
    }

    void kickParticles() {
	int i, j;
	for (i = 0; i != getParticleCount(); i++) {
	    Particle p = particles[i];
	    for (j = 0; j != 2; j++)
		p.vel[j] += (getrand(100)/99.0 - .5) * .04;
	}
    }

    void generateFunction() {
	int x, y;
	if (grid == null)
	    grid = new GridElement[gridsize+1][gridsize+1];
	curfunc.setupFrame();
	divOffset = curfunc.getDivOffset();
	divRange = curfunc.getDivRange();
	double mu, xx, xx2, yy, yy2, r, r1, r2, r3, r4;
	double levelheight = curfunc.getLevelHeight();
	//System.out.print("gf1\n");
	for (x = 0; x != gridsize+1; x++)
	    for (y = 0; y != gridsize+1; y++) {
		GridElement ge = grid[x][y] = new GridElement();
		ge.curl = ge.div = ge.height = 0;
		curfunc.setGrid(ge, x, y);
		/*ge.normdot = (ge.vecX+ge.vecY+1)*(1/1.73)/
		  java.lang.Math.sqrt(ge.vecX*ge.vecX+ge.vecY*ge.vecY+1);*/
	    }
	curfunc.calcDivergence();
	double zval = 2.0/gridsize;
	for (y = 0; y != gridsize; y++)
	    for (x = 0; x != gridsize; x++) {
		GridElement ge = grid[x][y];
		double vecx = grid[x+1][y].height-ge.height;
		double vecy = grid[x][y+1].height-ge.height;
		// light vector = (1,1,1)/1.73
		// norm vector = (-dzdx, -dzdy, 1)
		ge.normdot = (vecx+vecy+zval)*(1/1.73)/
		    java.lang.Math.sqrt(vecx*vecx+vecy*vecy+zval*zval);
	    }
	for (x = 0; x != gridsize+1; x++) {
	    grid[gridsize][x] = grid[gridsize-1][x];
	    grid[x][gridsize] = grid[x][gridsize-1];
	}
	//System.out.print("gf2\n");
	functionChanged = false;
	backgroundChanged = true;
    }

    double divOffset, divRange;

    int computeColor(GridElement ge, double c) {
	if (c < 0)
	    c = 0;
	if (c > 1)
	    c = 1;
	//System.out.print(c + "\n");
	c = .5 + c * .5;
	double value = 0;
	double range = 10;
	double offset = 4;
	switch (floorColorChooser.getSelectedIndex()) {
	case FC_FIELD:
	    value = ge.vecX*ge.vecX+ge.vecY*ge.vecY;
	    offset = 10;
	    range = 16;
	    if (!ge.valid)
		return 0xFF000080;
	    break;
	case FC_POTENTIAL:
	    value = ge.height-curfunc.getLevelHeight();
	    offset = 1;
	    range = 2;
	    break;
	case FC_CURL:
	    value = ge.curl;
	    offset = 4;
	    range = 10;
	    break;
	case FC_DIV:
	    value = ge.div;
	    offset = divOffset;
	    range = divRange;
	    break;
	case FC_NONE:
	    if (!ge.valid)
		return 0xFF000080;
	    break;
	}
	value *= floorBrightMult;
	double redness =
	    (value < 0) ? (java.lang.Math.log(-value)+offset)/range : 0;
	double grnness =
	    (value > 0) ? (java.lang.Math.log( value)+offset)/range : 0;
	if (redness > 1)
	    redness = 1;
	if (grnness > 1)
	    grnness = 1;
	if (grnness < 0)
	    grnness = 0;
	if (redness < 0)
	    redness = 0;
	/*if (redness > 0)
	  System.out.print(redness + "\n");*/
	double grayness = (1-(redness+grnness))*c;
	double gray = .6;
	int r = (int) ((c*redness+gray*grayness)*255);
	int g = (int) ((c*grnness+gray*grayness)*255);
	int b = (int) ((gray*grayness)*255);
	return (255<<24) | (r<<16) | (g<<8) | b;
    }

    
    void reinit() {
	handleResize();
	resetParticles();
	functionChanged = backgroundChanged = true;
    }

    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

    int shadowBufferTop[], shadowBufferBottom[],
	shadowBufferTop2[], shadowBufferBottom2[];

    final double floorBrightMult = 2;

    void drawBackground() {
	if (isFlat) {
	    int x, y;
	    for (y = 0; y < gridsize; y++)
		for (x = 0; x < gridsize; x++) {
		    GridElement ge = grid[x][y];
		    int nx  = x*winSize.width/gridsize;
		    int ny  = winSize.height-(y+1)*winSize.height/gridsize;
		    int nx1 = (x+1)*winSize.width/gridsize;
		    int ny1 = winSize.height-y*winSize.height/gridsize;
		    int col = computeColor(ge, 0);
		    fillRectangle(nx, ny, nx1, ny1, col);
		    ge.visible = true;
		}
	    drawFloor();
	    functionChanged = backgroundChanged = false;
	    if (imageSource != null)
		imageSource.newPixels();
	    return;
	}

	scaleworld();
	int x, y;

	int xdir, xstart, xend;
	int ydir, ystart, yend;
	int sc = gridsize;
	// figure out what order to render the grid elements so that
	// the ones in back are rendered first.
	if (viewAngleCos < 0) {
	    ystart = sc;
	    yend = 0;
	    ydir = -1;
	} else {
	    ystart = 0;
	    yend = sc;
	    ydir = 1;
	}
	if (viewAngleSin < 0) {
	    xstart = 0;
	    xend = sc;
	    xdir = 1;
	} else {
	    xstart = sc;
	    xend = 0;
	    xdir = -1;
	}
	boolean xFirst = (-viewAngleSin * xdir > viewAngleCos * ydir);

	shadowBufferBottom = new int[winSize.width];
	shadowBufferTop = new int[winSize.width];
	shadowBufferBottom2 = new int[winSize.width];
	shadowBufferTop2 = new int[winSize.width];
	for (x = 0; x != winSize.width; x++) {
	    shadowBufferBottom[x] = shadowBufferBottom2[x] = 0;
	    shadowBufferTop[x] = shadowBufferTop2[x] = winSize.height-1;
	}
	for (x = 0; x != winSize.width*winSize.height; x++)
	    pixels[x] = 0xFF000000;

	int goffx = (xdir == 1) ? 0 : -1;
	int goffy = (ydir == 1) ? 0 : -1;

	//System.out.print("drawing 1\n");
	for (x = xstart; x != xend; x += xdir) {
	    for (y = ystart; y != yend; y += ydir) {
		if (!xFirst)
		    x = xstart;
		for (; x != xend; x += xdir) {
		    double nx  = x*(2.0/gridsize)-1;
		    double ny  = y*(2.0/gridsize)-1;
		    double nx1 = (x+xdir)*(2.0/gridsize)-1;
		    double ny1 = (y+ydir)*(2.0/gridsize)-1;
		    map3d(nx,  ny,  grid[x]  [y].height, xpoints, ypoints, 0);
		    map3d(nx1, ny,  grid[x+xdir][y].height, xpoints, ypoints, 1);
		    map3d(nx,  ny1, grid[x][y+ydir].height, xpoints, ypoints, 2);
		    map3d(nx1, ny1, grid[x+xdir][y+ydir].height, xpoints, ypoints, 3);
		    GridElement ge = grid[x+goffx][y+goffy];
		    int col = computeColor(ge, ge.normdot);
		    // if (((x&1)^(y&1)) == 0) col ^= 0xff;
		    fillTriangle(xpoints[0], ypoints[0],
				 xpoints[1], ypoints[1],
				 xpoints[3], ypoints[3], col);
		    fillTriangle(xpoints[0], ypoints[0],
				 xpoints[2], ypoints[2],
				 xpoints[3], ypoints[3], col);

		    int cx = (xpoints[0]+xpoints[3])/2;
		    int cy = (ypoints[0]+ypoints[3])/2;
		    boolean vis = false;
		    if (cx >= 0 && cx < winSize.width &&
			cy <= shadowBufferTop[cx] && cy >= 0)
			vis = true;
		    ge.visible = vis;

		    if (xFirst)
			break;
		}
		if (!xFirst) {
		    int i;
		    for (i = 0; i != winSize.width; i++) {
			shadowBufferTop[i] = shadowBufferTop2[i];
			shadowBufferBottom[i] = shadowBufferBottom2[i];
		    }
		}
	    }
	    if (!xFirst)
		break;
	    int i;
	    for (i = 0; i != winSize.width; i++) {
		shadowBufferTop[i] = shadowBufferTop2[i];
		shadowBufferBottom[i] = shadowBufferBottom2[i];
	    }
	}

	//System.out.print("drawing 2\n");
	drawFloor();
	//System.out.print("drawing 3\n");

	functionChanged = backgroundChanged = false;
	if (imageSource != null)
	    imageSource.newPixels();
    }

    void drawFloor() {
	int x, y;
	switch (floorLineChooser.getSelectedIndex()) {
	case FL_NONE:
	    break;
	case FL_GRID:
	    for (x = 0; x != gridsize; x++)
		for (y = 0; y != gridsize; y += 10) {
		    double nx  = x*(2.0/gridsize)-1;
		    double nx1 = (x+1)*(2.0/gridsize)-1;
		    double ny  = y*(2.0/gridsize)-1;
		    if (grid[x][y].visible) {
			map3d(nx,  ny, grid[x]  [y].height,
			      xpoints, ypoints, 0);
			map3d(nx1, ny, grid[x+1][y].height,
			      xpoints, ypoints, 1);
			drawLine(xpoints[0], ypoints[0],
				 xpoints[1], ypoints[1]);
		    }
		    if (grid[y][x].visible) {
			map3d(ny, nx,  grid[y][x].height,
			      xpoints, ypoints, 0);
			map3d(ny, nx1, grid[y][x+1].height,
			      xpoints, ypoints, 1);
			drawLine(xpoints[0], ypoints[0],
				 xpoints[1], ypoints[1]);
		    }
		}
	    break;
	case FL_EQUIP:
	    if (!curfunc.nonGradient())
		renderEquips(); 
	    break;
	case FL_LINES:
	   genLines();
	   break;
	}
    }

    void fillTriangle(int x1, int y1, int x2, int y2, int x3, int y3,
		      int col) {
	if (x1 > x2) {
	    if (x2 > x3) {
		// x1 > x2 > x3
		int ay = interp(x1, y1, x3, y3, x2);
		fillTriangle1(x3, y3, x2, y2, ay, col);
		fillTriangle1(x1, y1, x2, y2, ay, col);
	    } else if (x1 > x3) {
		// x1 > x3 > x2
		int ay = interp(x1, y1, x2, y2, x3);
		fillTriangle1(x2, y2, x3, y3, ay, col);
		fillTriangle1(x1, y1, x3, y3, ay, col);
	    } else {
		// x3 > x1 > x2
		int ay = interp(x3, y3, x2, y2, x1);
		fillTriangle1(x2, y2, x1, y1, ay, col);
		fillTriangle1(x3, y3, x1, y1, ay, col);
	    }
	} else {
	    if (x1 > x3) {
		// x2 > x1 > x3
		int ay = interp(x2, y2, x3, y3, x1);
		fillTriangle1(x3, y3, x1, y1, ay, col);
		fillTriangle1(x2, y2, x1, y1, ay, col);
	    } else if (x2 > x3) {
		// x2 > x3 > x1
		int ay = interp(x2, y2, x1, y1, x3);
		fillTriangle1(x1, y1, x3, y3, ay, col);
		fillTriangle1(x2, y2, x3, y3, ay, col);
	    } else {
		// x3 > x2 > x1
		int ay = interp(x3, y3, x1, y1, x2);
		fillTriangle1(x1, y1, x2, y2, ay, col);
		fillTriangle1(x3, y3, x2, y2, ay, col);
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

    void fillTriangle1(int x1, int y1, int x2, int y2, int y3, int col) {
	// x2 == x3
	int dir = (x1 > x2) ? -1 : 1;
	int x = x1;
	if (x < 0) {
	    x = 0;
	    if (x2 < 0)
		return;
	}
	if (x >= winSize.width) {
	    x = winSize.width-1;
	    if (x2 >= winSize.width)
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
	    if (yb >= winSize.height)
		yb = winSize.height-1;

	    if (shadowBufferTop2[x] > ya)
		shadowBufferTop2[x] = ya;
	    if (shadowBufferBottom2[x] < yb)
		shadowBufferBottom2[x] = yb;

	    int sb1 = shadowBufferTop[x];
	    int sb2 = shadowBufferBottom[x];
	    if (!(ya >= sb1 && yb <= sb2)) {
		for (; ya <= yb; ya++) {
		    if (ya < sb1 || ya > sb2)
			pixels[x+ya*winSize.width] = col;
		}
	    }
	    x += dir;
	    if (x < 0 || x >= winSize.width)
		return;
	}
    }

    void fillRectangle(int x1, int y1, int x2, int y2, int col) {
	int x, y;
	for (y = y1; y < y2; y++)
	    for (x = x1; x < x2; x++)
		pixels[x+y*winSize.width] = col;
    }

    void drawLine(int x1, int y1, int x2, int y2) {
	if (x1 == x2 && y1 == y2)
	    return;
	if (abs(y2-y1) > abs(x2-x1)) {
	    // y difference is greater, so we step along y's
	    // from min to max y and calculate x for each step
	    int sgn = sign(y2-y1);
	    int x, y;
	    for (y = y1; y != y2+sgn; y += sgn) {
		x = x1+(x2-x1)*(y-y1)/(y2-y1);
		if (x >= 0 && y >= 0 &&
		    x < winSize.width && y < winSize.height)
		    pixels[x+y*winSize.width] = 0xFFC0C0C0;
	    }
	} else {
	    // x difference is greater, so we step along x's
	    // from min to max x and calculate y for each step
	    int sgn = sign(x2-x1);
	    int x, y;
	    for (x = x1; x != x2+sgn; x += sgn) {
		y = y1+(y2-y1)*(x-x1)/(x2-x1);
		if (x >= 0 && y >= 0 &&
		    x < winSize.width && y < winSize.height)
		    pixels[x+y*winSize.width] = 0xFFC0C0C0;
	    }
	}
    }

    int abs(int x) { return x < 0 ? -x : x; }
    int sign(int x) { return (x < 0) ? -1 : (x == 0) ? 0 : 1; }
    int min(int a, int b) { return (a < b) ? a : b; }
    int max(int a, int b) { return (a > b) ? a : b; }
    double min(double a, double b) { return (a < b) ? a : b; }
    double max(double a, double b) { return (a > b) ? a : b; }

    // render equipotentials
    void renderEquips() {
	int x, y;
	for (x = 0; x != gridsize; x++)
	    for (y = 0; y != gridsize; y++) {
		if (!grid[x][y].visible)
		    continue;
		// try all possible edge combinations
		tryEdge(x, y,  x+1, y,  x, y+1,  x+1, y+1);
		tryEdge(x, y,  x+1, y,  x, y,    x, y+1);
		tryEdge(x, y,  x+1, y,  x+1, y,  x+1, y+1);
		tryEdge(x, y,  x, y+1,  x+1, y,  x+1, y+1);
		tryEdge(x, y,  x, y+1,  x, y+1,  x+1, y+1);
		tryEdge(x+1, y, x+1, y+1, x, y+1, x+1, y+1);
	    }
    }

    class FloatPair { public double x, y; }

    // interpolate between two points
    void interpPoint(GridElement ep1, GridElement ep2,
		     int x1, int y1, int x2, int y2, double pval,
		     FloatPair pos) {
	double interp2 = (pval-ep1.height)/(ep2.height-ep1.height);
	double interp1 = 1-interp2;
	pos.x = (x1*interp1 + x2*interp2) * 2./gridsize - 1;
	pos.y = (y1*interp1 + y2*interp2) * 2./gridsize - 1;
    }

    // check to see if pval is between the potential at ep1 and ep2
    boolean spanning(GridElement ep1, GridElement ep2, double pval) {
	if (ep1.height == ep2.height)
	    return false;
	return !((ep1.height < pval && ep2.height < pval) ||
		 (ep1.height > pval && ep2.height > pval));
    }

    // try to draw any equipotentials between edge (x1,y1)-(x2,y2)
    // and edge (x3,y3)-(x4,y4).
    void tryEdge(int x1, int y1, int x2, int y2,
		 int x3, int y3, int x4, int y4) {
	int i;
	double emult = 5;
	double mult = 1/(40 * emult * .1);
	GridElement ep1 = grid[x1][y1];
	GridElement ep2 = grid[x2][y2];
	GridElement ep3 = grid[x3][y3];
	GridElement ep4 = grid[x4][y4];
	double pmin = min(min(ep1.height, ep2.height), min(ep3.height, ep4.height));
	double pmax = max(max(ep1.height, ep2.height), max(ep3.height, ep4.height));
	if (pmin < -5) // was 10
	    pmin = -5;
	if (pmax > 5)
	    pmax = 5;
	int imin = (int) (pmin/mult);
	int imax = (int) (pmax/mult);
	for (i = imin; i <= imax; i++) {
	    double pval = i*mult;
	    if (!(spanning(ep1, ep2, pval) && spanning(ep3, ep4, pval)))
		continue;
	    FloatPair pa = new FloatPair();
	    FloatPair pb = new FloatPair();
	    interpPoint(ep1, ep2, x1, y1, x2, y2, pval, pa);
	    interpPoint(ep3, ep4, x3, y3, x4, y4, pval, pb);
	    map3d(pa.x, pa.y, pval, xpoints, ypoints, 0);
	    map3d(pb.x, pb.y, pval, xpoints, ypoints, 1);
	    drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	}
    }

    void drawLineBackground(Graphics g) {
	int x, y;
	for (x = 0; x != gridsize; x++)
	    for (y = 0; y != gridsize; y++)
		grid[x][y].visible = true;
	if (isFlat)
	    return;
	for (y = gridsize-1; y >= 0; y--) {
	    for (x = 0; x < gridsize; x += 5) {
		double ny  = y*(2.0/gridsize)-1;
		double nx1 = (x+1)*(2.0/gridsize)-1;
		double ny1 = (y+1)*(2.0/gridsize)-1;
		map3d(nx1, ny,  grid[x][y].height, xpoints, ypoints, 1);
		map3d(nx1, ny1, grid[x][y+1].height, xpoints, ypoints, 2);
		ypoints[1] = bound_y(ypoints[1]);
		ypoints[2] = bound_y(ypoints[2]);
		g.drawLine(xpoints[1], ypoints[1], xpoints[2], ypoints[2]);
	    }
	}
	for (y = 0; y < gridsize; y += 5) {
	    for (x = gridsize-1; x >= 0; x--) {
		double nx  = x*(2.0/gridsize)-1;
		double nx1 = (x+1)*(2.0/gridsize)-1;
		double ny1 = (y+1)*(2.0/gridsize)-1;
		map3d(nx,  ny1, grid[x]  [y].height, xpoints, ypoints, 3);
		map3d(nx1, ny1, grid[x+1][y].height, xpoints, ypoints, 2);
		ypoints[3] = bound_y(ypoints[3]);
		ypoints[2] = bound_y(ypoints[2]);
		g.drawLine(xpoints[3], ypoints[3], xpoints[2], ypoints[2]);
	    }
	}
    }

    int bound_y(int y) {
	if (y < -100)
	    y = -100;
	if (y > winSize.height+100)
	    y = winSize.height+100;
	return y;
    }

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    static final double root2 = 1.4142135623730950488016887242096981;
    double scalex, scaley;

    void map3d(double x, double y, double z, int xpoints[], int ypoints[],
	       int pt) {
	map3dView(x, y, z, xpoints, ypoints, pt, viewMain);
    }

    void map3dView(double x, double y, double z, int xpoints[], int ypoints[],
	       int pt, Rectangle view) {
	if (isFlat) {
	    xpoints[pt] = view.x+(int) ((x+1)*view.width/2);
	    ypoints[pt] = view.y+(int) ((1-y)*view.height/2);
	    return;
	}
	if (z < -1000)
	    z = -1000;
	if (z > 1000)
	    z = 1000;
	/*if (!(z > -2000 && z < 2000))
	  System.out.print(z + " in map3d\n");*/
	double realx = x*viewAngleCos + y*viewAngleSin; // range: [-10,10]
	double realy = z-viewHeight;
	double realz = y*viewAngleCos - x*viewAngleSin + viewDistance;
	scalex = viewZoom * (view.width/4) * viewDistance;
	scaley = scalex;
	int yoff = (int)
	    (scaley*(viewHeight-curfunc.getLevelHeight())/viewDistance);
	xpoints[pt] = view.x+view.width/2 + (int) (scalex*realx/realz);
	ypoints[pt] = view.y+view.height/2 - yoff - (int) (scaley*realy/realz);
    }

    void scaleworld() {
	// scalex = viewZoom * (winSize.width/4) * viewDistance;
	// scaley = scalex;
    }

    double getHeight(double x, double y) {
	x = (x+1)*(gridsize/2);
	y = (y+1)*(gridsize/2);
	int ix = (int) x;
	int iy = (int) y;
	if (ix >= gridsize || iy >= gridsize)
	    return grid[ix][iy].height;
	double fracx = x-ix;
	double fracy = y-iy;
	return grid[ix][iy].height * (1-fracx) * (1-fracy) +
	    grid[ix+1][iy].height * fracx * (1-fracy) +
	    grid[ix][iy+1].height * (1-fracx) * fracy +
	    grid[ix+1][iy+1].height * fracx * fracy;
    }

    void sayCalculating(Graphics realg) {
	realg.setColor(cv.getBackground());
	FontMetrics fm = realg.getFontMetrics();
	String s = "Calculating...";
	realg.fillRect(0, winSize.height-30,
		       20+fm.stringWidth(s), 30);
	realg.setColor(Color.white);
	realg.drawString(s, 10, winSize.height-10);
    }

    long lastTime;
    double timeStep, partMult;
    boolean slowDragView = true;
    
    public void updateVecDemo(Graphics realg) {
	if (winSize == null || winSize.width == 0)
	    return;
	Graphics g = dbimage.getGraphics();
	if (xpoints == null)
	    return;
	checkFlatState();
	barFieldStrength = fieldStrength =
	    java.lang.Math.exp((strengthBar.getValue()-50)/10.);
	if (functionChanged || backgroundChanged) {
	    if (functionChanged) { // && !(draggingView && isFlat)) {
		sayCalculating(realg);
		generateFunction();
	    }
	    if (!slowDragView || !draggingView) {
		long tm1 = System.currentTimeMillis();
		sayCalculating(realg);
		drawBackground();
		long tm2 = System.currentTimeMillis();
		slowDragView = (tm2-tm1 > 100);
	    }
	}

	scaleworld();
	if ((draggingView && slowDragView) || functionChanged) {
	    g.setColor(isFlat ? fieldColors[0] : cv.getBackground());
	    g.fillRect(0, 0, winSize.width, winSize.height);
	    g.setColor(cv.getForeground());
	    drawLineBackground(g);
	} else
	    g.drawImage(backimage, 0, 0, this);

	boolean allquiet = true;

	curfunc.setupFrame();
	fieldStrength = barFieldStrength;
	partMult = fieldStrength * reverse * timeStep;
	int disp = dispChooser.getSelectedIndex();
	timeStep = 1;
	if (!stoppedCheck.getState()) {
	    if (lastTime > 0)
		timeStep = (System.currentTimeMillis()-lastTime)*.03;
	    if (timeStep > 3)
		timeStep = 3;
	    lastTime = System.currentTimeMillis();
	    if (disp != DISP_VECTORS && disp != DISP_NONE) {
		moveParticles();
		allquiet = false;
	    }
	    currentStep += reverse;
	    if (currentStep < 0)
		currentStep += 800;
	} else
	    lastTime = 0;

	if (disp == DISP_VECTORS)
	    drawVectors(g);
	else if (disp != DISP_NONE)
	    drawParticles(g);

	g.setColor(Color.gray);

	if (!isFlat)
	    drawAxes(g);
	curfunc.finishFrame();

	int mode = modeChooser.getSelectedIndex();
	if (mode == MODE_LINE_INT)
	    lineIntegral(g, true);
	else if (mode == MODE_SURF_INT)
	    lineIntegral(g, false);

	if (parseError)
	    centerString(g, "Can't parse expression", winSize.height-20);

	//g.drawString("FR: " + framerate, 0, 10);
	realg.drawImage(dbimage, 0, 0, this);
	long t = System.currentTimeMillis();
	frames++;
	if (firsttime == 0)
	    firsttime = t;
	else if (t-firsttime > 1000) {
	    framerate = frames;
	    firsttime = t;
	    frames = 0;
	}
	if (!stoppedCheck.getState() && !allquiet)
	    cv.repaint(pause);
    }

    void drawAxes(Graphics g) {
	g.setColor(Color.white);
	map3dView(0, 0, 0, xpoints, ypoints, 0, viewAxes);
	map3dView(1, 0, 0, xpoints, ypoints, 1, viewAxes);
	drawArrow(g, "x", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	map3dView(0, 1, 0, xpoints, ypoints, 1, viewAxes);
	drawArrow(g, "y", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	map3dView(0, 0, 1, xpoints, ypoints, 1, viewAxes);
	drawArrow(g, "z", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
    }

    void drawVectors(Graphics g) {
	int x, y, z;
	DrawData dd = new DrawData();
	dd.mult = barFieldStrength*40;
	dd.g = g;
	dd.field = new double[3];
	dd.vv = new double[3];
	vectorSpacing = vecDensityBar.getValue();
	double vec[] = new double[3];

	vecCount = 0;

	for (x = 0; x != vectorSpacing; x++) {
	    vec[0] = x*(2.0/(vectorSpacing-1))-1;
	    for (y = 0; y != vectorSpacing; y++) {
		vec[1] = y*(2.0/(vectorSpacing-1))-1;
		drawVector(dd, vec);
	    }
	}
    }

    void lineIntegral(Graphics g, boolean line) {
	if (integralX == -1)
	    return;
	if (dragStartX == integralX || dragStartY == integralY)
	    return;
	int x1 = min(dragStartX, integralX);
	int y1 = min(dragStartY, integralY);
	int x2 = max(dragStartX, integralX);
	int y2 = max(dragStartY, integralY);
	int step = 15;
	int x;
	double pos[] = rk_k2;
	if (!line) {
	    g.setColor(Color.white);
	    g.drawRect(x1, y1, x2-x1+1, y2-y1+1);
	}
	double y1p = 1 - 2.*y1/winSize.height;
	double y2p = 1 - 2.*y2/winSize.height;
	for (x = x1; x <= x2; x += step) {
	    int step1 = x2-x;
	    if (step1 > step)
		step1 = step;
	    pos[0] = 2.*x/winSize.width - 1;
	    pos[1] = y1p;
	    lineIntegralStep(g, x, y1, pos, step1, 0, line);
	    pos[1] = y2p;
	    lineIntegralStep(g, x+step1, y2, pos, -step1, 0, line);
	}
	int y;
	double x1p = 2.*x1/winSize.width - 1;
	double x2p = 2.*x2/winSize.width - 1;
	for (y = y2; y >= y1; y -= step) {
	    int step1 = y-y1;
	    if (step1 > step)
		step1 = step;
	    pos[0] = x1p;
	    pos[1] = 1 - 2.*y/winSize.height;
	    lineIntegralStep(g, x1, y, pos, 0, step1, line);
	    pos[0] = x2p;
	    lineIntegralStep(g, x2, y-step1, pos, 0, -step1, line);
	}
	boundCheck = false;
	pos[1] = y1p;
	double iv1 = numIntegrate(pos, 0, x1p, x2p, line);
	pos[1] = y2p;
	double iv2 = numIntegrate(pos, 0, x1p, x2p, line);
	pos[0] = x1p;
	double iv3 = numIntegrate(pos, 1, y1p, y2p, line);
	pos[0] = x2p;
	double iv4 = numIntegrate(pos, 1, y1p, y2p, line);
	double ivtot = -iv1+iv2+iv3-iv4;
	NumberFormat nf = NumberFormat.getInstance();
	nf.setMaximumFractionDigits(3);
	if (ivtot < 1e-7 && ivtot > -1e-7)
	    ivtot = 0;
	ivtot *= reverse;
	String s = ((!line) ? "Flux = " : "Circulation = ");
	s += nf.format(ivtot*1e5);
	g.setColor(cv.getBackground());
	FontMetrics fm = g.getFontMetrics();
	g.fillRect(0, winSize.height-30, 20+fm.stringWidth(s), 30);
	g.setColor(Color.white);
	g.drawString(s, 10, winSize.height-10);
    }

    double numIntegrate(double pos[], int n1,
			double x1, double x2, boolean line) {
	int steps = 8;
	double lastres = 0;
	double res = 0;
	int n2 = (line) ? n1 : 1-n1;
	while (true) {
	    int i;
	    double h = (x2-x1)/steps;
	    res = 0;
	    for (i = 0; i <= steps; i++) {
		pos[n1] = x1+i*h;
		double field[] = rk_k1;
		curfunc.getField(field, pos);
		int ss = (i == 0 || i == steps) ? 1 :
		    ((i & 1) == 1) ? 4 : 2;
		res += field[n2]*h*ss;
	    }
	    res /= 3;
	    if (java.lang.Math.abs(lastres-res) < 1e-7)
		break;
	    lastres = res;
	    steps *= 2;
	    if (steps == 65536)
		break;
	}
	if (!line && n1 == 0)
	    res = -res;
	return res;
    }

    void lineIntegralStep(Graphics g, int x, int y,
			  double pos[], int dx, int dy, boolean line) {
	double field[] = rk_k1;
	curfunc.getField(field, pos);
	double f = (line) ? field[0]*dx+field[1]*dy :
	    field[0]*dy - field[1]*dx;
	f *= reverse;
	double dn = java.lang.Math.abs(f*100);
	if (dn > 1)
	    dn = 1;
	int col1 = (int) (dn*128+127);
	int col2 = (int) (127-dn*127);
	if (!line) {
	    x += dx/2;
	    y -= dy/2;
	}
	if (f == 0) {
	    g.setColor(new Color(col2, col2, col2));
	    g.drawLine(x, y, x+dx, y-dy);
	} else if (f > 0) {
	    g.setColor(new Color(col1, col2, col2));
	    if (line)
		drawArrow(g, null, x, y, x+dx, y-dy);
	    else
		drawArrow(g, null, x, y, x+dy, y+dx);
	} else {
	    g.setColor(new Color(col2, col1, col2));
	    if (line)
		drawArrow(g, null, x+dx, y-dy, x, y);
	    else
		drawArrow(g, null, x, y, x-dy, y-dx);
	}
    }

    void genLines() {
	int i;
	
	int lineGridSize = 8; // lineDensityBar.getValue();
	if (lineGridSize < 3)
	    lineGridSize = 3;
	if (lineGridSize > 8)
	    lineGridSize = 8;
	lineGridSize *= 2;
	int ct = 30*lineGridSize*lineGridSize;
	double brightmult = 80*barFieldStrength;
	fieldStrength = 10;

	boolean lineGrid[][] =
	    new boolean[lineGridSize][lineGridSize];
	double lineGridMult = lineGridSize/2.;

	double origp[] = new double[3];
	double field[] = new double[3];
	Particle p = new Particle();
	p.lifetime = -1;
	p.stepsize = 10;
	int dir = -1;
	int segs = 0;
	double lastdist = 0;
	for (i = 0; i != ct; i++) {
	    if (p.lifetime < 0) {
		p.lifetime = 1;
		p.stepsize = 10;
		segs = 0;
		lastdist = 0;
		if (dir == 1) {
		    int j;
		    for (j = 0; j != 3; j++)
			p.pos[j] = origp[j];
		    dir = -1;
		    continue;
		}
		dir = 1;
		int px = 0, py = 0;
		while (true) {
		    if (!lineGrid[px][py])
			break;
		    if (++px < lineGridSize)
			continue;
		    px = 0;
		    if (++py < lineGridSize)
			continue;
		    break;
		}
		if (py == lineGridSize)
		    break;
		lineGrid[px][py] = true;
		double offs = .5/lineGridMult;
		origp[0] = p.pos[0] = px/lineGridMult-1+offs;
		origp[1] = p.pos[1] = py/lineGridMult-1+offs;
	    }

	    double p1x = p.pos[0];
	    double p1y = p.pos[1];
	    double p1z = getHeight(p1x, p1y);
	    GridElement ge = grid[(int) ((p1x+1)*gridsize/2)]
		[(int) ((p1y+1)*gridsize/2)];
	    if (!ge.visible) {
		p.lifetime = -1;
		continue;
	    }
	    
	    double x[] = p.pos;
	    lineSegment(p, dir);
	    //System.out.print(x[0] + " " + x[1] + " " + x[2] + "\n");
	    if (p.lifetime < 0)
		continue;
	    int gx = (int) ((x[0]+1)*lineGridMult);
	    int gy = (int) ((x[1]+1)*lineGridMult);
	    if (!lineGrid[gx][gy])
		segs--;
	    lineGrid[gx][gy] = true;

	    ge = grid[(int) ((p.pos[0]+1)*gridsize/2)]
		[(int) ((p.pos[1]+1)*gridsize/2)];
	    if (!ge.visible) {
		p.lifetime = -1;
		continue;
	    }
	    
	    double dn = brightmult*p.phi;
	    if (dn > 2)
		dn = 2;
	    // fv.col = (int) (dn*255);
	    map3d(p1x, p1y, p1z, xpoints, ypoints, 0);
	    map3d(p.pos[0], p.pos[1], getHeight(p.pos[0], p.pos[1]),
		  xpoints, ypoints, 1);
	    drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);

	    double d2 = dist2(origp, x);
	    if (d2 > lastdist)
		lastdist = d2;
	    else
		segs++;
	    if (segs > 10 || d2 < .001)
		p.lifetime = -1;
	}
	//System.out.print("vc " + vecCount + " " + ct + "\n");
    }

    // draw the appropriate field vector at xx,yy,zz
    void drawVector(DrawData dd, double vec[]) {
	double field[] = dd.field;

	// calculate field vector
	curfunc.getField(field, vec);
	double dn = java.lang.Math.sqrt(field[0]*field[0]+field[1]*field[1]);
	double dnr = dn*reverse;
	if (dn > 0) {
	    field[0] /= dnr;
	    field[1] /= dnr;
	}
	dn *= dd.mult;
	if (dn > 2)
	    dn = 2;
	int col = (int) (dn*255);
	double sw2 = 1./(vectorSpacing-1);
	map3d(vec[0], vec[1], 0, xpoints, ypoints, 0);
	map3d(vec[0]+sw2*field[0], vec[1]+sw2*field[1], 0,
	      xpoints, ypoints, 1);
	dd.g.setColor(fieldColors[col]);
	drawArrow(dd.g, null,
		  xpoints[0], ypoints[0], xpoints[1], ypoints[1], 2);
    }

    void moveParticles() {
	int bestd = 0;
	int i;
	int pcount = getParticleCount();
	for (i = 0; i != pcount; i++) {
	    Particle pt = particles[i];
	    removeFromDensityGroup(pt);
	    moveParticle(pt);
	    double x[] = pt.pos;
	    if (!(x[0] >= -1 && x[0] < 1 &&
		  x[1] >= -1 && x[1] < 1) ||
		(pt.lifetime -= timeStep) < 0)
		positionParticle(pt);
	    int d = addToDensityGroup(pt);
	    if (d > bestd)
		bestd = d;
	}
	boolean withforce =
	    (dispChooser.getSelectedIndex() == DISP_PART_FORCE);
	int maxd =  (6*getParticleCount()/(densitygridsize*densitygridsize));
	if (!withforce && curfunc.redistribute() && bestd > maxd)
	    redistribute(bestd);
    }

    static int frames = 0;
    static int framerate = 0;
    static long firsttime = 0;

    void drawParticles(Graphics g) {
	g.setColor(Color.white);
	int disp = dispChooser.getSelectedIndex();
	if (disp == DISP_VECTORS) {
	    int i;
	    for (i = 0; i != vecCount; i++) {
		FieldVector fv = vectors[i];
		g.setColor(fieldColors[fv.col]);
		drawArrow(g, null, fv.sx1, fv.sy1, fv.sx2, fv.sy2, 2);
	    }
	    return;
	}
	int pcount = getParticleCount();
	int i;
	wooft += .3;
	if (disp == DISP_CURLERS)
	    pcount = (pcount+4)/5;
	for (i = 0; i < pcount; i++) {
	    Particle p = particles[i];
	    double pos[] = p.pos;
	    GridElement ge = grid[(int) ((pos[0]+1)*gridsize/2)]
		[(int) ((pos[1]+1)*gridsize/2)];
	    map3d(pos[0], pos[1], getHeight(pos[0], pos[1]),
					    xpoints, ypoints, 0);
	    if (xpoints[0] < 0 || xpoints[0] >= winSize.width ||
		ypoints[0] < 0 || ypoints[0] >= winSize.height)
		continue;
	    if (disp == DISP_CURLERS) {
		g.setColor(p.color);
		final double len = .02;
		double ax = java.lang.Math.cos(p.theta)*len;
		double ay = java.lang.Math.sin(p.theta)*len;
		double offx = ax;
		double offy = ay;
		double a1 = curlcalc(p.pos[0]+offx, p.pos[1]+offy, -ay, ax);
		double a2 = curlcalc(p.pos[0]-offy, p.pos[1]+offx, -ax, -ay);
		double a3 = curlcalc(p.pos[0]-offx, p.pos[1]-offy, ay, -ax);
		double a4 = curlcalc(p.pos[0]+offy, p.pos[1]-offx, ax, ay);
		p.theta += (a1+a2+a3+a4)/(4*len*len);
		map3d(p.pos[0]-offx, p.pos[1]-offy, 0, xpoints, ypoints, 0);
		map3d(p.pos[0]+offx, p.pos[1]+offy, 0, xpoints, ypoints, 1);
		map3d(p.pos[0]-offy, p.pos[1]+offx, 0, xpoints, ypoints, 2);
		map3d(p.pos[0]+offy, p.pos[1]-offx, 0, xpoints, ypoints, 3);
		g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
		g.drawLine(xpoints[2], ypoints[2], xpoints[3], ypoints[3]);
		g.fillOval(xpoints[0]-1, ypoints[0]-1, 3, 3);
	    } else if (ge.visible && ge.valid)
		g.fillRect(xpoints[0], ypoints[0]-1, 2, 2);
	}
    }

	double wooft = 0;

    void drawPlane(Graphics g, double sizex, double sizey, double z) {
	g.setColor(darkYellow);
	map3d(-sizex, -sizey, z, xpoints, ypoints, 0);
	map3d(+sizex, -sizey, z, xpoints, ypoints, 1);
	map3d(+sizex, +sizey, z, xpoints, ypoints, 2);
	map3d(-sizex, +sizey, z, xpoints, ypoints, 3);
	g.fillPolygon(xpoints, ypoints, 4);
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

    int rediscount;
    void redistribute(int mostd) {
	if (mostd < 5)
	    return;
	rediscount++;
	int maxd = (6*getParticleCount()/
		    (densitygridsize*densitygridsize));
	int i;
	int pn = 0;
	int pcount = getParticleCount();
	for (i = rediscount % 4; i < pcount; i+=4) {
	    Particle p = particles[i];
	    int a = (int)((p.pos[0]+1)*(densitygridsize/2));
	    int b = (int)((p.pos[1]+1)*(densitygridsize/2));
	    if (density[a][b] <= maxd)
		continue;
	    p.lifetime = -1;
	    pn++;
	}
	//System.out.print("redist " + mostd + " " + pn + "\n");
    }

    double curlcalc(double x, double y, double ax, double ay) {
	rk_yn[0] = x;
	rk_yn[1] = y;
	curfunc.getField(rk_k1, rk_yn);
	return partMult*(rk_k1[0]*ax + rk_k1[1]*ay);
    }

    static double distanceParticle(Particle p) {
	return distanceXY(p.pos[0], p.pos[1]);
    }

    static double distanceArray(double y[]) {
	return java.lang.Math.sqrt(y[0]*y[0]+y[1]*y[1]+.000000001);
    }

    static double distanceXY(double x, double y) {
	return java.lang.Math.sqrt(x*x+y*y+.000000001);
    }

    static void rotateParticleAdd(double result[], double y[], double mult,
			double cx, double cy) { 
	result[0] += -mult*(y[1]-cy);
	result[1] +=  mult*(y[0]-cx);
    }

    static void rotateParticle(double result[], double y[], double mult) {
	result[0] = -mult*y[1];
	result[1] =  mult*y[0];
	result[2] = 0;
    }

    void edit(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	editView(x, y);
    }

    void editView(int x, int y) {
	if (modeChooser.getSelectedIndex() == MODE_VIEW_ROTATE) {
	    if (isFlat)
		return;
	    viewAngle = (dragStartX-x)/40. + viewAngleDragStart;
	    while (viewAngle < 0)
		viewAngle += 2*pi;
	    while (viewAngle >= 2*pi)
		viewAngle -= 2*pi;
	    viewAngleCos = java.lang.Math.cos(viewAngle);
	    viewAngleSin = java.lang.Math.sin(viewAngle);
	    viewHeight = -(dragStartY-y)/10. + viewHeightDragStart;
	    if (viewHeight > 9)
		viewHeight = 9;
	    if (viewHeight < -9)
		viewHeight = -9;
	    draggingView = backgroundChanged = true;
	    cv.repaint(pause);
	    return;
	}
	if (modeChooser.getSelectedIndex() == MODE_VIEW_ZOOM) {
	    if (isFlat)
		return;
	    viewZoom = (x-dragStartX)/40. + viewZoomDragStart;
	    if (viewZoom < .1)
		viewZoom = .1;
	    draggingView = backgroundChanged = true;
	    cv.repaint(pause);
	    return;
	}
	if (modeChooser.getSelectedIndex() == MODE_LINE_INT ||
	    modeChooser.getSelectedIndex() == MODE_SURF_INT) {
	    integralX = x;
	    integralY = y;
	    cv.repaint(pause);
	}
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
	vectors = null;
	if (e.getSource() == resetButton)
	    resetParticles();
	if (e.getSource() == kickButton)
	    kickParticles();
	if (e.getSource() == infoButton) {
	    String s = curfunc.getClass().getName();
	    try {
		s = s.substring(s.lastIndexOf('.')+1);
		applet.getAppletContext().showDocument(
			new URL(applet.getCodeBase(),
				"functions.html" + '#' + s),
			"functionHelp");
	    } catch (Exception ex) {
	    }
	}
	curfunc.actionPerformed();
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

    public void scrollbarValueChanged(DecentScrollbar ds) {
	vectors = null;
	System.out.print(ds.getValue() + "\n");
	if (ds == partCountBar)
	    resetDensityGroups();
	if (ds == aux1Bar || ds == aux2Bar || ds == aux3Bar) {
	    functionChanged = true;
	    draggingView = true;
	}
	cv.repaint(pause);
    }

    public void scrollbarFinished(DecentScrollbar ds) {
	draggingView = false;
	cv.repaint(pause);
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
    }
    public void mouseMoved(MouseEvent e) {
    }

    public void mouseClicked(MouseEvent e) {
    }
    public void mouseEntered(MouseEvent e) {
    }
    public void mouseExited(MouseEvent e) {
    }
    public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragStartX = e.getX();
	dragStartY = e.getY();
	viewAngleDragStart = viewAngle;
	viewHeightDragStart = viewHeight;
	viewZoomDragStart = viewZoom;
	dragging = true;
	edit(e);
    }
    public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = draggingView = false;
	cv.repaint(pause);
    }

    void dispChooserChanged() {
	int disp = dispChooser.getSelectedIndex();
	showA = false; // XXX
	if (disp == DISP_PART_FORCE)
	    kickButton.enable();
	else
	    kickButton.disable();
	potentialLabel.hide();
	potentialBar.hide();
	vecDensityLabel.hide();
	vecDensityBar.hide();
	/*lineDensityLabel.hide();
	  lineDensityBar.hide();*/
	partCountLabel.hide();
	partCountBar.hide();
	strengthLabel.show();
	strengthBar.show();
	if (disp == DISP_VECTORS) {
	    vecDensityLabel.show();
	    vecDensityBar.show();
	} else {
	    partCountLabel.show();
	    partCountBar.show();
	}
	validate();
	resetParticles();
    }

    boolean finished = false;
    
    public void itemStateChanged(ItemEvent e) {
	if (!finished)
	    return;
	vectors = null;
	cv.repaint(pause);
	reverse = (reverseCheck.getState()) ? -1 : 1;
	if (e.getItemSelectable() == dispChooser) {
	    dispChooserChanged();
	    resetParticles();
	}
	if (e.getItemSelectable() == functionChooser)
	    functionChanged();
	if (e.getItemSelectable() == reverseCheck)
	    functionChanged = true;
	if (e.getItemSelectable() == floorColorChooser ||
	    e.getItemSelectable() == floorLineChooser)
	    backgroundChanged = true;
    }

    void checkFlatState() {
	boolean oldFlat = isFlat;
	int disp = dispChooser.getSelectedIndex();
	isFlat = flatCheck.getState() || curfunc.nonGradient() ||
	    disp == DISP_VECTORS || disp == DISP_CURLERS;
	int mode = modeChooser.getSelectedIndex();
	if (mode == MODE_LINE_INT || mode == MODE_SURF_INT)
	    isFlat = true;
	if (isFlat != oldFlat)
	    backgroundChanged = true;
    }

    void functionChanged() {
	reverse = 1;
	reverseCheck.setState(false);
	parseError = false;
	curfunc = (VecFunction)
	    functionList.elementAt(functionChooser.getSelectedIndex());
	int i;
	for (i = 0; i != 3; i++) {
	    auxBars[i].label.hide();
	    auxBars[i].bar.hide();
	}
	for (i = 0; i != 2; i++)
	    textFields[i].hide();
	if (textFieldLabel != null)
	    textFieldLabel.hide();
	strengthBar.setValue(80);
	//setupDispChooser(!curfunc.nonGradient());
	curfunc.setup();
	validate();
	resetParticles();
	dispChooserChanged();
	functionChanged = true;
	integralX = -1;
    }

    void setupDispChooser(boolean potential) {
	dispChooser.removeAll();
	dispChooser.add("Display: Particles (Vel.)");
	dispChooser.add("Display: Particles (Force)");
	dispChooser.add("Display: Field Vectors");
	dispChooser.add("Display: None");
	if (BUILD_V)
	    dispChooser.add("Display: Curl Detectors");
    }

    void setupBar(int n, String text, int val) {
	auxBars[n].label.setText(text);
	auxBars[n].label.show();
	auxBars[n].bar.setValue(val);
	auxBars[n].bar.show();
    }

    void cross(double res[], double v1[], double v2[]) {
	res[0] = v1[1]*v2[2] - v1[2]*v2[1];
	res[1] = v1[2]*v2[0] - v1[0]*v2[2];
	res[2] = v1[0]*v2[1] - v1[1]*v2[0];
    }

    double dot(double v1[], double v2[]) {
	return v1[0]*v2[0] + v1[1]*v2[1];
    }

    boolean boundCheck;
    double oldY[];
    double rk_k1[] = new double[6];
    double rk_k2[] = new double[6];
    double rk_k3[] = new double[6];
    double rk_k4[] = new double[6];
    double rk_yn[] = new double[6];

    void rk(int order, double x, double Y[], double stepsize) {
	int i;

	// x is not used...

	if (order == 2) {
	    // velocity-based motion
	    double fmult = stepsize * partMult;
	    for (i = 0; i != order; i++)
		rk_yn[i] = Y[i];
	    curfunc.getField(rk_k1, rk_yn);
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + 0.5*fmult*rk_k1[i]);
	    curfunc.getField(rk_k2, rk_yn);
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + 0.5*fmult*rk_k2[i]);
	    curfunc.getField(rk_k3, rk_yn);
	    
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + fmult*rk_k3[i]);
	    curfunc.getField(rk_k4, rk_yn);
	    for (i = 0; i != order; i++)
		Y[i] = Y[i] + fmult*(rk_k1[i]+2*(rk_k2[i]+rk_k3[i])+rk_k4[i])/6;
	    Y[2] = rk_k4[2];
	} else {
	    // force-based (could share more code with above, but this is
	    // called a lot so we want it to be fast)
	    double fmult = stepsize * partMult;
	    for (i = 0; i != order; i++)
		rk_yn[i] = Y[i];
	    getForceField(rk_k1, rk_yn, stepsize, fmult);
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + 0.5*rk_k1[i]);
	    getForceField(rk_k2, rk_yn, stepsize, fmult);
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + 0.5*rk_k2[i]);
	    getForceField(rk_k3, rk_yn, stepsize, fmult);
	    
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + rk_k3[i]);
	    getForceField(rk_k4, rk_yn, stepsize, fmult);
	    for (i = 0; i != order; i++)
		Y[i] = Y[i] + (rk_k1[i]+2*(rk_k2[i]+rk_k3[i])+rk_k4[i])/6;
	    Y[4] = rk_k4[4];
	}
    }

    void getForceField(double result[], double y[],
		       double stepsize, double fmult) {
	// get the field vector for the current function
	curfunc.getField(result, y);

	// copy height information
	result[4] = result[2];

	// the field data has been written into result[0:1] where it will
	// directly influence the position (y[0:1]), but we want it to
	// influence the velocity (y[2:3]), so we move it.  In the
	// process, we multiply by fmult (to get the reverse button
	// and field strength slider to work).  It would be nice if we
	// could just say getField(result+2, y), but that's java for you.
	int i;
	for (i = 0; i != 2; i++)
	    result[i+2] = fmult*result[i]*.1;

	// here we fill in result[0:1] so that the particle position will
	// change according to the velocity.
	for (i = 0; i != 2; i++)
	    result[i] = stepsize*timeStep*rk_yn[i+2];
    }

    double rk_Y[] = new double[6];
    double rk_Yhalf[] = new double[6];
    double rk_oldY[] = new double[6];
    double ls_fieldavg[] = new double[3];

    void moveParticle(Particle p)
    {
	int disp = dispChooser.getSelectedIndex();
	int numIter=0;
	double maxh=1;
	double error=0.0, E = .001, localError;
	boolean useForce = (disp == DISP_PART_FORCE);
	int order = useForce ? 4 : 2;
	double Y[] = rk_Y;
	double Yhalf[] = rk_Yhalf;
	oldY = rk_oldY;
	int i;

	for (i = 0; i != 2; i++)
	    oldY[i] = Y[i] = Yhalf[i] = p.pos[i];
	if (useForce)
	    for (i = 0; i != 2; i++)
		Y[i+2] = Yhalf[i+2] = p.vel[i];
	double t = 0;

	if (!curfunc.useRungeKutta()) {
	    boundCheck = false;
	    curfunc.getField(Yhalf, Y);
	    if (boundCheck && (!useForce || curfunc.checkBoundsWithForce())) {
		p.pos[0] = -100;
		return;
	    }
	    double fmult = partMult;
	    if (useForce) {
		fmult *= .1;
		for (i = 0; i != 2; i++) {
		    p.vel[i] += fmult*Yhalf[i];
		    p.pos[i] += p.vel[i]*timeStep;
		}
	    } else {
		for (i = 0; i != 2; i++)
		    p.pos[i] += fmult*Yhalf[i];
	    }
	    p.pos[2] = Yhalf[2];
	    for (i = 0; i != 2; i++)
		Y[i] = p.pos[i];
	    if (curfunc.checkBounds(Y, oldY))
		p.pos[0] = -100;
	    return;
	}

	boolean adapt = curfunc.useAdaptiveRungeKutta();
	double h = (adapt) ? p.stepsize : 1;

	int steps = 0;
	double minh = .0001;
	while (t >= 0 && t < 1) {
	    if (t+h > 1)
		h = 1-t;

	    boundCheck = false;

	    // estimate one full step
	    rk(order, 0, Y, h);
	    
	    // bail out after one iteration for some slow fields
	    if (!adapt)
		break;

	    // estimate two half steps
	    rk(order, 0, Yhalf, h*0.5);
	    rk(order, 0, Yhalf, h*0.5);

	    if (boundCheck && (!useForce || curfunc.checkBoundsWithForce())) {
		p.pos[0] = -100;
		return;
	    }

	    // estimate the local error
	    localError = java.lang.Math.abs(Y[0] - Yhalf[0]) +
		java.lang.Math.abs(Y[1] - Yhalf[1]);
	    
	    if (localError > E && h > minh) {
		//System.out.print(E + " " + t + " " + localError + " " + h + "\n");
		h *= 0.75; // decrease the step size
		if (h < minh)
		    h = minh;
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		continue;
	    } else if (localError < (E * 0.5)) {
		h *= 1.25; // increase the step size
		if (h > maxh)
		    h = maxh;
	    }
	    
	    for (i = 0; i != order; i++)
		oldY[i] = Yhalf[i] = Y[i]; 

	    t += h;
	    steps++;
	}
	
	if (boundCheck && (!useForce || curfunc.checkBoundsWithForce())) {
	    p.pos[0] = -100;
	    return;
	}
	
	p.stepsize = h;
	for (i = 0; i != 3; i++)
	    p.pos[i] = Y[i];
	if (useForce) {
	    for (i = 0; i != 2; i++)
		p.vel[i] = Y[i+2];
	    p.pos[2] = Y[4];
	}
    }

    double dist2(double a[], double b[]) {
	double c0 = a[0]-b[0];
	double c1 = a[1]-b[1];
	return c0*c0+c1*c1;
    }

    void lineSegment(Particle p, int dir)
    {
	int numIter=0;
	double maxh=20;
	double error=0.0, E = .001, localError;
	int order = 2;
	double Y[] = rk_Y;
	double Yhalf[] = rk_Yhalf;
	oldY = rk_oldY;
	int i;

	for (i = 0; i != 2; i++)
	    oldY[i] = Y[i] = Yhalf[i] = p.pos[i];
	double h = p.stepsize;
	ls_fieldavg[0] = ls_fieldavg[1] = ls_fieldavg[2] = 0;

	int steps = 0;
	double minh = .1;
	double segSize2max = 1./gridsize;
	double segSize2min = segSize2max/4;
	double lastd = 0;
	int avgct = 0;
	while (true) {
	    boundCheck = false;
	    steps++;
	    if (steps > 100) {
		System.out.print("maxsteps\n");
		p.lifetime = -1;
		return;
	    }
	    //System.out.print(h + " " + boundCheck + "/\n");

	    // estimate one full step
	    rk(order, 0, Y, dir*h);

	    // estimate two half steps
	    rk(order, 0, Yhalf, dir*h*0.5);
	    rk(order, 0, Yhalf, dir*h*0.5);

	    //System.out.print(h + " " + boundCheck + "\n");
	    if (boundCheck) {
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		h /= 2;
		if (h < minh) {
		    p.lifetime = -1;
		    return;
		}
		continue;
	    }
	    if (Y[0] < -1 || Y[0] >= .999 ||
		Y[1] < -1 || Y[1] >= .999) {
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		h /= 2;
		if (h < minh) {
		    p.lifetime = -1;
		    return;
		}
		continue;
	    }

	    // estimate the local error
	    localError =
		java.lang.Math.abs(Y[0] - Yhalf[0]) +
		java.lang.Math.abs(Y[1] - Yhalf[1]);
	    
	    if (localError > E && h > minh) {
		h *= 0.75; // decrease the step size
		if (h < minh)
		    h = minh;
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		continue;
	    } else if (localError < (E * 0.5)) {
		h *= 1.25; // increase the step size
		if (h > maxh)
		    h = maxh;
	    }
	    
	    double d = dist2(p.pos, Y);
	    if (!(d-lastd > 1e-10)) {
		// we're not getting anywhere!
		//System.out.print("nga " + d + " " + lastd + "\n");
		p.lifetime = -1;
		return;
	    }
	    if (d > segSize2max) {
		h /= 2;
		if (h < minh) {
		    p.lifetime = -1;
		    return;
		}
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		continue;
	    }
	    ls_fieldavg[0] += rk_k1[0];
	    ls_fieldavg[1] += rk_k1[1];
	    avgct++;

	    if (d > segSize2min)
		break;
	    lastd = d;

	    for (i = 0; i != order; i++)
		oldY[i] = Yhalf[i] = Y[i]; 
	}

	//System.out.print(steps + " ss\n");
	p.stepsize = h;
	for (i = 0; i != 3; i++)
	    p.pos[i] = Y[i];
	p.phi = java.lang.Math.sqrt(ls_fieldavg[0]*ls_fieldavg[0]+
				    ls_fieldavg[1]*ls_fieldavg[1])/avgct;
    }

    int doubleToGrid(double x) {
	return (int) ((x+1)*gridsize/2);
    }

    double gridToDouble(int x) {
	return (x*2./gridsize)-1;
    }

    abstract class VecFunction {
	abstract String getName();
	abstract VecFunction createNext();
	boolean nonGradient() { return false; }
	boolean useRungeKutta() { return true; }
	boolean useAdaptiveRungeKutta() { return true; }
	boolean checkBoundsWithForce() { return true; }
	boolean checkBounds(double y[], double oldY[]) { return false; }
	abstract void getField(double result[], double y[]);
	boolean redistribute() { return true; }
	void setup() {}
	void setupFrame() {}
	void finishFrame() {}
	void actionPerformed() {}
	void calcDivergence() {}
	double getLevelHeight() { return 0; }
	void setGrid(GridElement ge, int x, int y) {
	    double xx[] = rk_k1;
	    double res[] = rk_k2;
	    double res1[] = rk_k3;
	    xx[0] = (x*2./gridsize)-1;
	    xx[1] = (y*2./gridsize)-1;
	    xx[2] = 0;
	    boundCheck = false;
	    getField(res, xx);
	    ge.vecX = reverse*res[0]*70;
	    ge.vecY = reverse*res[1]*70;
	    ge.height = reverse*res[2]*.625;
	    ge.valid = !boundCheck;
	    /*if (!(ge.height >= -9999 && ge.height <= 9999))
		System.out.print(xx[0] + " " + xx[1] + " " +
		ge.height + "\n"); */
	    double xorig0 = xx[0];
	    xx[0] += 1e-8;
	    getField(res1, xx);
	    ge.div = res1[0] - res[0];
	    ge.curl = res1[1] - res[1];
	    xx[0] = xorig0;
	    xx[1] += 1e-8;
	    getField(res1, xx);
	    ge.div = (ge.div + res1[1] - res[1])*1e10*reverse;
	    ge.curl = (ge.curl - (res1[0] - res[0]))*1e10*reverse;
	}
	double getDivOffset() { return 4; }
	double getDivRange() { return 11; }
    };

    class InverseRadial extends VecFunction {
	double lineLen;
	String getName() { return BUILD_CASE_EMV("charged line",
						 null, "1/r single line"); }
	void getField(double result[], double y[]) {
	    double r = distanceXY(y[0], y[1]);
	    if (r < lineWidth)
		boundCheck = true;
	    double r2 = r*r;
	    result[0] = -.0002*y[0]/r2;
	    result[1] = -.0002*y[1]/r2;
	    result[2] = .4*java.lang.Math.log(r+1e-300);
	}
	void setup() {
	    lineLen = 1;
	}
	VecFunction createNext() { return new InverseRadialDouble(); }
    };

    class InverseRadialDouble extends VecFunction {
	InverseRadialDouble() { sign = 1; }
	String getName() { return BUILD_CASE_EMV("line charge double",
						 null, "1/r double lines"); }
	double sign;
	void getField(double result[], double y[]) {
	    // we want to make sure sep is a multiple of the grid spacing
	    // so that the divergence gets calculated correctly.
	    double sep = gridToDouble(gridsize/2+
				      aux1Bar.getValue()*gridsize/200);
	    double xx1 = y[0] - sep;
	    double xx2 = y[0] + sep;
	    double r1 = distanceXY(xx1, y[1]);
	    double r2 = distanceXY(xx2, y[1]);
	    if (r1 < lineWidth || r2 < lineWidth)
		boundCheck = true;
	    double q = .0002;
	    double r1s = 1/(r1*r1);
	    double r2s = 1/(r2*r2*sign);
	    result[0] = q*(-xx1 *r1s-xx2 *r2s);
	    result[1] = q*(-y[1]*r1s-y[1]*r2s);
	    result[2] = .2*(java.lang.Math.log(r1+1e-20)+
			    sign*java.lang.Math.log(r2+1e-20));
	}
	void setup() {
	    setupBar(0, "Line Separation", 30);
	}
	VecFunction createNext() { return
	    BUILD_CASE_EMV(new InverseRadialDipole(), null,
			   new InverseSquaredRadial()); }
    };

//#ifdef BUILD_E
    class InverseRadialDipole extends InverseRadialDouble {
	InverseRadialDipole() { sign = -1; }
	String getName() { return "dipole lines"; }
	VecFunction createNext() { return new InverseRadialQuad(); }
    };

    class InverseRadialQuad extends VecFunction {
	String getName() { return "quad lines"; }
	void getField(double result[], double y[]) {
	    // we want to make sure sep is a multiple of the grid spacing
	    // so that the divergence gets calculated correctly.
	    double sep = gridToDouble(gridsize/2+
				      aux1Bar.getValue()*gridsize/200);
	    double xx1 = y[0] + sep;
	    double xx2 = y[0] - sep;
	    double yy1 = y[1] + sep;
	    double yy2 = y[1] - sep;
	    double r1 = distanceXY(xx1, yy1);
	    double r2 = distanceXY(xx2, yy1);
	    double r3 = distanceXY(xx1, yy2);
	    double r4 = distanceXY(xx2, yy2);
	    if (r1 < lineWidth || r2 < lineWidth ||
		r3 < lineWidth || r4 < lineWidth)
		boundCheck = true;
	    double q = .0003;
	    result[0] = q*(-xx1/(r1*r1)-xx2/(r4*r4) +xx2/(r2*r2)+xx1/(r3*r3));
	    result[1] = q*(-yy1/(r1*r1)-yy2/(r4*r4) +yy1/(r2*r2)+yy2/(r3*r3));
	    result[2] = .2*(+java.lang.Math.log(r1+1e-20)
			    -java.lang.Math.log(r2+1e-20)
			    -java.lang.Math.log(r3+1e-20)
			    +java.lang.Math.log(r4+1e-20));
	}
	void setup() {
	    setupBar(0, "Line Separation", 30);
	}
	VecFunction createNext() { return new InverseSquaredRadial(); }
    };
//#endif /* BUILD_E */

    class InverseSquaredRadial extends VecFunction {
	String getName() { return BUILD_CASE_EMV("point charge",
						 null, "1/r^2 single"); }
	void getField(double result[], double y[]) {
	    double r = distanceArray(y);
	    if (r < chargeSize)
		boundCheck = true;
	    double r3 = r*r*r;
	    double q = .0003/r3;
	    result[0] = -y[0]*q;
	    result[1] = -y[1]*q;
	    result[2] = -.3/r;
	}

	static final double chargeSize = .001;

	VecFunction createNext() { return new InverseSquaredRadialDouble(); }
    };

    class InverseSquaredRadialDouble extends InverseSquaredRadial {
	String getName() { return BUILD_CASE_EMV("point charge double", null,
						 "1/r^2 double"); }
	double sign2;
	void getField(double result[], double y[]) {
	    // we want to make sure sep is a multiple of the grid spacing
	    // so that the divergence gets calculated correctly.
	    double sep = gridToDouble(gridsize/2+
				      aux1Bar.getValue()*gridsize/200);
	    double xx1 = y[0]-sep;
	    double xx2 = y[0]+sep;
	    double r1 = distanceXY(xx1, y[1]);
	    if (r1 < chargeSize)
		boundCheck = true;
	    double r2 = distanceXY(xx2, y[1]);
	    if (r2 < chargeSize)
		boundCheck = true;
	    double q = .0003;
	    double rq1 = q/(r1*r1*r1);
	    double rq2 = q/(r2*r2*r2) * sign2;
	    result[0] = -xx1 *rq1-xx2 *rq2;
	    result[1] = -y[1]*rq1-y[1]*rq2;
	    result[2] = -.05/r1 - .05*sign2/r2;
	    if (sign2 == -1)
		result[2] *= 2;
	}
	void setup() {
	    sign2 = 1;
	    setupBar(0, "Charge Separation", 30);
	}
	VecFunction createNext() { return
	    BUILD_CASE_EMV(new InverseSquaredRadialDipole(),
			   null, new InverseRotational()); }
    };

//#ifdef BUILD_E
    class InverseSquaredRadialDipole extends InverseSquaredRadialDouble {
	String getName() { return "dipole"; }
	void setup() {
	    super.setup();
	    sign2 = -1;
	}
	VecFunction createNext() { return new InverseSquaredRadialQuad(); }
    };
    class InverseSquaredRadialQuad extends InverseSquaredRadial {
	String getName() { return "quadrupole"; }
	void getField(double result[], double y[]) {
	    // we want to make sure sep is a multiple of the grid spacing
	    // so that the divergence gets calculated correctly.
	    double sep = gridToDouble(gridsize/2+
				      aux1Bar.getValue()*gridsize/200);
	    double xx1 = y[0] - sep;
	    double xx2 = y[0] + sep;
	    double yy1 = y[1] - sep;
	    double yy2 = y[1] + sep;
	    double r1 = distanceXY(xx1, yy1);
	    double r2 = distanceXY(xx2, yy1);
	    double r3 = distanceXY(xx1, yy2);
	    double r4 = distanceXY(xx2, yy2);
	    if (r1 < chargeSize || r2 < chargeSize ||
		r3 < chargeSize || r4 < chargeSize)
		boundCheck = true;
	    double q = .0003;
	    double rq1 = q/(r1*r1*r1);
	    double rq2 = q/(r2*r2*r2);
	    double rq3 = q/(r3*r3*r3);
	    double rq4 = q/(r4*r4*r4);
	    result[0] = -xx1*rq1-xx2*rq4+xx2*rq2+xx1*rq3;
	    result[1] = -yy1*rq1-yy2*rq4+yy1*rq2+yy2*rq3;
	    result[2] = .05*(-1/r1+1/r2+1/r3-1/r4);
	}
	void setup() {
	    super.setup();
	    setupBar(0, "Charge Separation", 30);
	}
	VecFunction createNext() { return new ConductingPlate(); }
    };

    class ConductingPlate extends VecFunction {
	String getName() { return "conducting plate"; }
	Complex z, z2;
	boolean plate;
	double a, base;
	ConductingPlate() {
	    z = new Complex();
	    z2 = new Complex();
	    plate = true;
	}
	void setupFrame() {
	    a = (aux1Bar.getValue()+1)/100.;
	    z.setReIm(0, 1/a);
	    z.arcsin();
	    base = z.im;
	}
	void getField(double result[], double y[]) {
	    // smythe p89
	    if (y[1] >= -.02 && y[1] <= .02) {
		if ((plate  && y[0] >= -a && y[0] <= a) ||
		    (!plate && (y[0] >= a || y[0] <= -a)))
		boundCheck = true;
	    }
	    z.setReIm(y[0]/a, y[1]/a);
	    if (y[1] < 0 && plate)
		z.im = -z.im;
	    z2.set(z);
	    z2.arcsin();
	    result[2] = (plate) ? z2.im/base-1 : -z2.re*.6;

	    // here we calculate ((1-(z/a)^2)^(-1/2))/a, which is
	    // d/dz arcsin(z/a)
	    z.square();
	    z.multRe(-1);
	    z.addRe(1);
	    z.pow(-.5);
	    z.multRe(1/a);
	    if (plate) {
		// field = (Im dw/dz, Re dw/dz)
		result[1] = z.re * -.0007;
		result[0] = z.im * -.0007;
		if (y[1] <= 0)
		    result[1] = -result[1];
	    } else {
		// field = (Re dw/dz, -Im dw/dz)
		result[0] = z.re * .0007;
		result[1] = -z.im * .0007;
		if (y[1] == 0)
		    result[1] = -result[1];
	    }
	}
	void setup() {
	    setupBar(0, "Plate Size", 60);
	}
	double getDivOffset() { return -17.3; }
	double getDivRange() { return 2.5; }
	VecFunction createNext() { return new ChargedPlate(); }
    };
    class ChargedPlate extends ConductingPlate {
	Complex cz;
	ChargedPlate() { cz = new Complex(); }
	String getName() { return "charged plate"; }
	double getDivOffset() { return 4; }
	double getDivRange() { return 11; }
	double getPot(double a1, double a2, double y) {
	    cz.setReIm (y, -a1);
	    cz.multReIm(y,  a2);
	    cz.log();
	    double b1 = cz.im;
	    cz.setReIm (y,  a1);
	    cz.multReIm(y, -a2);
	    cz.log();
	    double y2 = y*y;
	    if (y2 == 0)
		y2 = 1e-8;
	    return .3*(2*(a1-a2) + (b1-cz.im)*y +
		       a2*java.lang.Math.log(a2*a2+y2) -
		       a1*java.lang.Math.log(a1*a1+y2));
	}
	void calcDivergence() {
	    double sep = aux2Bar.getValue()/100.;
	    int x, y;
	    for (x = 0; x != gridsize; x++) {
		double xx = gridToDouble(x);
		if (xx < -a || xx > a)
		    continue;
		grid[x][gridsize/2].div = -reverse;
	    }
	}
	void getField(double result[], double y[]) {
	    if (y[1] >= -.01 && y[1] <= .01 &&
		(y[0] >= -a && y[0] <= a))
		boundCheck = true;
	    double a1 = -a-y[0];
	    double a2 =  a-y[0];
	    double y2 = y[1]*y[1];
	    if (y2 == 0)
		y2 = 1e-8;
	    double q = .0003/a;
	    result[0] = .5*q*
	        java.lang.Math.log((y2+a2*a2)/(y2+a1*a1));
	    result[1] = q*
		(java.lang.Math.atan(a1/y[1])-
		 java.lang.Math.atan(a2/y[1]));
	    result[2] = .4*getPot(a1, a2, y[1])/a;
	}
	VecFunction createNext() { return new ChargedPlatePair(); }
    };

    class ChargedPlatePair extends ChargedPlate {
	String getName() { return "charged plate pair"; }
	boolean useRungeKutta() { return false; }
	double dipole;
	ChargedPlatePair() { dipole = 1; }
	void getField(double result[], double y[]) {
	    double sep = aux2Bar.getValue()/100.;
	    if ((y[1] >= -.01+sep && y[1] <= .01+sep ||
		 y[1] >= -.01-sep && y[1] <= .01-sep) &&
		y[0] >= -a && y[0] <= a)
		boundCheck = true;
	    double a1 = -a-y[0];
	    double a2 =  a-y[0];
	    double y1 = y[1]-sep;
	    double y12 = y1*y1;
	    if (y12 == 0)
		y12 = 1e-8;
	    double y2 = y[1]+sep;
	    double y22 = y2*y2;
	    if (y22 == 0)
		y22 = 1e-8;

	    double q = .0003/a;
	    result[0] = .5*q*
	        (java.lang.Math.log((y12+a2*a2)/(y12+a1*a1)) + dipole*
		 java.lang.Math.log((y22+a2*a2)/(y22+a1*a1)));
	    result[1] = q*
		(java.lang.Math.atan(a1/y1)
		-java.lang.Math.atan(a2/y1)
		+dipole*(java.lang.Math.atan(a1/y2)
			-java.lang.Math.atan(a2/y2)));
	    result[2] = .4*(getPot(a1, a2, y1)+dipole*getPot(a1, a2, y2))/a;
	}
	void calcDivergence() {
	    double sep = aux2Bar.getValue()/100.;
	    int x, y;
	    for (x = 0; x != gridsize; x++) {
		double xx = gridToDouble(x);
		if (xx < -a || xx > a)
		    continue;
		y = doubleToGrid(sep);
		grid[x][y].div = -reverse;
		y = doubleToGrid(-sep);
		grid[x][y].div = -dipole*reverse;
	    }
	}
	void setup() {
	    setupBar(0, "Sheet Size", 60);
	    setupBar(1, "Sheet Separation", 33);
	}
	boolean checkBounds(double y[], double oldY[]) {
	    double size = aux1Bar.getValue()/100.;
	    double sep = aux2Bar.getValue()/100.;
	    // check to see if particle has passed through one of plates
	    if (y[0] >= -size && y[0] <= size) {
		if (y[1] > sep) {
		    if (oldY[1] < sep)
			return true;
		} else if (y[1] < -sep) {
		    if (oldY[1] > -sep)
			return true;
		} else if (oldY[1] > sep || oldY[1] < -sep)
		    return true;
	    }
	    return false;
	}
	VecFunction createNext() { return new ChargedPlateDipole(); }
    };

    class ChargedPlateDipole extends ChargedPlatePair {
	String getName() { return "charged plate dipole"; }
	ChargedPlateDipole() { dipole = -1; }
	VecFunction createNext() { return new InfiniteChargedPlane(); }
    };

    class InfiniteChargedPlane extends VecFunction {
	String getName() { return "infinite plane"; }
	void getField(double result[], double y[]) {
	    double alpha = .0004;
	    if (y[1] > -.01 && y[1] < .01)
		boundCheck = true;
	    result[0] = 0;
	    result[1] = (y[1] <= 0) ? alpha : -alpha;
	    result[2] = java.lang.Math.abs(y[1])-1;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new Cylinder(); }
    };
    
    class Cylinder extends VecFunction {
	String getName() { return "conducting cylinder"; }
	double getCylRadius() { return (aux1Bar.getValue()+1)/110.; }
	void setup() {
	    setupBar(0, "Cylinder Size", 30);
	    setupBar(1, "Cylinder Potential", 1);
	}
	void getField(double result[], double y[]) {
	    // Smythe p70
	    double a = getCylRadius();
	    double farpt = 4;

	    double pot = 2*(aux2Bar.getValue()/50.-1);
	    final int mult = 4000;

	    // add in charge that will bring cylinder to specified potential
	    double cq = -pot/
		(mult*(java.lang.Math.log(a)-java.lang.Math.log(farpt)));
	    double pot0 = mult*cq*java.lang.Math.log(farpt);

	    double y0 = y[0];
	    double y1 = y[1];
	    double r1 = distanceXY(y0, y1);
	    if (r1 < a) {
		result[0] = result[1] = 0;
		result[2] = pot;
		boundCheck = true;
		return;
	    }
	    double a1 = 5*cq/(r1*r1);
	    result[0] = y0*a1;
	    result[1] = y1*a1;
	    result[2] = pot0-cq*mult*java.lang.Math.log(r1);
	}
	void calcDivergence() {
	    double a = getCylRadius();
	    int i;
	    for (i = 0; i != 100; i++) {
		double th = 2*pi*i/100.;
		double xx = java.lang.Math.cos(th)*a;
		double yy = java.lang.Math.sin(th)*a;
		grid[doubleToGrid(xx)][doubleToGrid(yy)].div -= reverse/20.;
	    }
	}
	VecFunction createNext() { return new CylinderAndLineCharge(); }
    };

    class CylinderAndLineCharge extends VecFunction {
	String getName() { return "cyl + line charge"; }
	double getCylRadius() { return (aux1Bar.getValue()+1)/110.; }
	double getSeparation() { return aux2Bar.getValue()/100.; }
	double getCylPos() { return getSeparation()/2; }
	double getPointPos() { return -getSeparation()/2-getCylRadius(); }
	void setup() {
	    setupBar(0, "Cylinder Size", 30);
	    setupBar(1, "Separation", 30);
	    setupBar(2, "Cylinder Potential", 50);
	}

	void setupFrame() {
	    // Smythe p70
	    q = -.0003;
	    a = getCylRadius();
	    b = getSeparation() + a;
	    spos = getCylPos();
	    imagePos = spos - a*a/b;

	    double r2_0 = spos+a-imagePos;
	    double r3_0 = spos+a-getPointPos();

	    // Find charge that will eliminate field at far end cylinder.
	    // That's our definition of "ground".  (We can't use the
	    // potential at infinity as ground, since that diverges.)
	    cq = a*a*(q/(r2_0*r2_0) - q/(r3_0*r3_0));

	    // calculate potential on cylinder with that charge.  we will
	    // subtract that value out of the potential everywhere.
	    pot0 = -cq*java.lang.Math.log(a)
		+q*java.lang.Math.log(r2_0)
		-q*java.lang.Math.log(r3_0);

	    // add in charge that will bring cylinder to specified potential
	    cq -= (aux3Bar.getValue()/50.-1)*.0006/java.lang.Math.log(a);
	}

	double q, a, b, spos, imagePos, cq, pot0;

	void calcDivergence() {
	    int i;
	    double pos[] = rk_k1;
	    double res[] = rk_k2;
	    double a1 = getCylRadius()+.001;
	    int x, y;
	    for (x = 0; x != gridsize; x++)
		for (y = 0; y != gridsize; y++)
		    grid[x][y].div = 0;
	    grid[doubleToGrid(getPointPos())][doubleToGrid(0)].div = -reverse;
	    for (i = 0; i != 200; i++) {
		double th = 2*pi*i/200.;
		double costh = java.lang.Math.cos(th);
		double sinth = java.lang.Math.sin(th);
		pos[0] = costh*a1+getCylPos();
		pos[1] = sinth*a1;
		pos[2] = 0;
		curfunc.getField(res, pos);
		grid[doubleToGrid(costh*a+getCylPos())]
		    [doubleToGrid(sinth*a)].div +=
		    (costh*res[0] + sinth*res[1])*60*reverse;
	    }
	}
	void getField(double result[], double y[]) {
	    // Smythe p70
	    double x1 = y[0]-spos;
	    double r1 = distanceXY(x1, y[1]);
	    final int mult = 4000;
	    double y0 = y[0];
	    double y1 = y[1];
	    if (r1 < a) {
		y0 = spos+a;
		y1 = 0;
		x1 = r1 = a;
		boundCheck = true;
	    }
	    double x2 = y0-imagePos;
	    double r2 = distanceXY(x2, y1);
	    double x3 = y0-getPointPos();
	    double r3 = distanceXY(x3, y1);
	    double chargeSize = .001;
	    if (r3 < chargeSize)
		boundCheck = true;
	    double a1 = cq/(r1*r1);
	    double a2 = -q/(r2*r2);
	    double a3 = q/(r3*r3);
	    result[0] = x1*a1 + x2*a2 + x3*a3;
	    result[1] = y1*(a1+a2+a3);
	    result[2] = mult*(-pot0
			      -cq*java.lang.Math.log(r1)
			      +q*java.lang.Math.log(r2+1e-20)
			      -q*java.lang.Math.log(r3+1e-20));
	    if (r1 == a)
		result[0] = result[1] = 0;
	}
	VecFunction createNext() { return new CylinderInField(); }
    };

    class CylinderInField extends VecFunction {
	CylinderInField() { conducting = true; showD = false; }
	String getName() { return "cylinder in field"; }
	boolean conducting, showD;
	double a;
	void setupFrame() {
	    a = aux1Bar.getValue()/100.;
	}
	void getField(double result[], double y[]) {
	    // smythe p67
	    double a2 = a*a;
	    double r = distanceXY(y[0], y[1]);
	    double e1 = aux2Bar.getValue()/10. + 1;
	    double dimult = (conducting) ? 1 : (e1-1)/(e1+1);
	    double fmult = .0006;
	    final double potmult = 3;
	    if (r < a) {
		result[0] = result[1] = result[2] = 0;
		if (conducting)
		    boundCheck = true;
		else
		    result[0] = (showD) ? e1*fmult*(1-dimult) :
		        fmult*(1-dimult);
		result[2] = -potmult*(1-dimult)*y[0];
		return;
	    }
	    double costh = y[0]/r;
	    double sinth = y[1]/r;
	    double r_2 = 1/(r*r);
	    double er  = (1+dimult*a2*r_2)*costh*fmult;
	    double eth = -(1-dimult*a2*r_2)*sinth*fmult;
	    er /= r;
	    result[0] = y[0]*er - eth*sinth;
	    result[1] = y[1]*er + eth*costh;
	    result[2] = -potmult*(1-dimult*a2*r_2)*y[0];
	}
	void setup() {
	    setupBar(0, "Cylinder Size", 40);
	}
	void calcDivergence() {
	    int i;
	    double pos[] = rk_k1;
	    double res[] = rk_k2;
	    double a1 = a+.001;
	    int x, y;
	    for (x = 0; x != gridsize; x++)
		for (y = 0; y != gridsize; y++)
		    grid[x][y].div = 0;
	    for (i = 0; i != 200; i++) {
		double th = 2*pi*i/200.;
		double costh = java.lang.Math.cos(th);
		double sinth = java.lang.Math.sin(th);
		pos[0] = costh*a1;
		pos[1] = sinth*a1;
		pos[2] = 0;
		curfunc.getField(res, pos);
		double rx = res[0];
		double ry = res[1];
		double a2 = a-.001;
		pos[0] = costh*a2;
		pos[1] = sinth*a2;
		pos[2] = 0;
		curfunc.getField(res, pos);
		grid[doubleToGrid(costh*a)][doubleToGrid(sinth*a)].div +=
		    (costh*(rx-res[0]) + sinth*(ry-res[1]))*4e2*reverse;
	    }
	}
	VecFunction createNext() { return new DielectricCylinderInFieldE(); }
    };

    class DielectricCylinderInFieldE extends CylinderInField {
	DielectricCylinderInFieldE() { conducting = false; showD = false; }
	String getName() { return "dielec cyl in field"; }
	void setup() {
	    setupBar(0, "Cylinder Size", 40);
	    setupBar(1, "Dielectric Strength", 60);
	}
	VecFunction createNext() { return new SlottedPlane(); }
    };

    /*class DielectricBoundaryE extends InverseSquaredRadial {
	boolean showD, conducting;
	double planeY;
	DielectricBoundaryE() { conducting = false; showD = false; }
	String getName() { return "dielec boundary"; }
	void setup() {
	    setupBar(0, "Charge Location", 60);
	    if (!conducting)
		setupBar(1, "Dielectric Strength", 60);
	}
	void getField(double result[], double y[]) {
	    double cx = aux1Bar.getValue()/50.-1.001;
	    double r1 = distance(y[0], y[1]-cx);
	    if (r1 < chargeSize)
		boundCheck = true;
	    double eps1 = 1;
	    double eps2 = aux2Bar.getValue()/10. + 1;
	    if (conducting)
		eps2 = 1e8;
	    if (cx < planeY) {
		eps1 = eps2;
		eps2 = 1;
	    }
	    double q1 = .0003;
	    double q2 = -(eps2-eps1)/(eps2+eps1)*q1;
	    double ep = eps1;
	    if (cx > planeY && y[1] < planeY || cx < planeY && y[1] > planeY) {
		q1 = 2*eps2*q1/(eps2+eps1);
		q2 = 0;
		ep = eps2;
	    }
	    double r2 = distance(y[0], y[1]-planeY*2+cx);
	    result[2] = -2000*(q1/(r1*ep) + q2/(r2*ep));
	    if (!showD) {
		q1 /= ep;
		q2 /= ep;
	    }
	    double rq1 = q1/(r1*r1*r1);
	    double rq2 = q2/(r2*r2*r2);
	    result[0] = -y[0]*(rq1+rq2);
	    result[1] = -(y[1]-cx)*rq1-(y[1]-planeY*2+cx)*rq2;
	}
	VecFunction createNext() { return new ConductingPlane(); }
    };
    class ConductingPlane extends DielectricBoundaryE {
	ConductingPlane() { conducting = true; showD = false; planeY = -1; }
	String getName() { return "conducting plane + pt"; }
	VecFunction createNext() { return new SlottedPlane(); }
	};*/

    class SlottedPlane extends VecFunction {
	String getName() { return "slotted conducting plane"; }
	Complex z, z2, z3;
	double getDivOffset() { return -17.3; }
	double getDivRange() { return 2.5; }
	SlottedPlane() {
	    z = new Complex();
	    z2 = new Complex();
	    z3 = new Complex();
	}
	void getField(double result[], double y[]) {
	    // W = -.5E (z +- (z^2-a^2)^1/2)
	    // dw/dz = -.5E (1 +- z/(z^2-a^2)^1/2)
	    // Smythe p92
	    double a = (aux1Bar.getValue()+1)/101.;
	    z.setReIm(y[0], y[1]);
	    if (y[1] >= -.01 && y[1] <= .01 &&
		(y[0] < -a || y[0] > a)) {
		boundCheck = true;
		if (z.im == 0)
		    z.im = -1e-8;
	    }
	    z2.set(z);
	    z2.square();
	    z2.addRe(-a*a);
	    z3.set(z2);
	    z3.pow(.5);
	    if (z3.im < 0)
		z3.multRe(-1);
	    z3.addReIm(z.re, z.im);
	    result[2] = z3.im*2;

	    z2.pow(-.5);
	    // I can barely understand what Smythe is talking about but
	    // I think he wants the square root to always have a positive
	    // imaginary part.  Here we already took the reciprocal
	    // (by calling pow(-.5) instead of pow(.5)) so we want the
	    // root to have a negative imaginary part instead.
	    if (z2.im > 0)
		z2.multRe(-1);
	    z2.mult(z);
	    // field = (Im dw/dz, Re dw/dz)
	    result[1] = -(1+z2.re) * .003;
	    result[0] = -(z2.im) * .003;
	}
	void setup() {
	    setupBar(0, "Slot Size", 30);
	}
	VecFunction createNext() { return new PlanePair(); }
    };
    class PlanePair extends ConductingPlate {
	String getName() { return "conducting planes w/ gap"; }
	PlanePair() { super(); plate = false; }
	void setup() {
	    setupBar(0, "Gap Size", 20);
	}
	double getDivOffset() { return -17; }
	VecFunction createNext() { return null; }
    };

//#endif
//#ifndef BUILD_E
    class InverseRotational extends InverseRadial {
	String getName() { return BUILD_CASE_EMV(null, "current line",
				  "1/r rotational"); }
	void getField(double result[], double y[]) {
	    double r = distanceXY(y[0], y[1]);
	    if (showA) {
		result[0] = result[1] = 0;
		result[2] = -.001*(java.lang.Math.log(r)-.5);
	    } else {
		if (r < lineWidth*2)
		    boundCheck = true;
		rotateParticle(result, y, .0001/(r*r));
	    }
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new InverseRotationalPotential(); }
    };

    class InverseRotationalPotential extends VecFunction {
	String getName() { return "1/r rotational potential"; }
	void getField(double result[], double y[]) {
	    double r = distanceXY(y[0], y[1]);
	    rotateParticle(result, y, .0001/(r*r));
	    if (r < lineWidth*2)
		boundCheck = true;
	    else if (y[0] >= 0 && y[1] < .001 && y[1] > -.025) {
		boundCheck = true;
		if (y[1] == 0)
		    result[1] = 1e8;
	    }
	    double ang = java.lang.Math.atan2(y[1], y[0]);
	    if (ang < 0)
		ang += 2*pi;
	    result[2] = (pi-ang)*.3;
	}
	VecFunction createNext() { return new InverseRotationalDouble(); }
    };

    class InverseRotationalDouble extends InverseRadialDouble {
	InverseRotationalDouble() { dir2 = 1; ext = false; }
	int dir2;
	boolean ext;
	String getName() { return BUILD_CASE_EMV(null, "current line double",
						 "1/r rotational double"); }
	void getField(double result[], double y[]) {
	    // we want to make sure sep is a multiple of the grid spacing
	    // so that the divergence gets calculated correctly.
	    double sep = gridToDouble(gridsize/2+
				      aux1Bar.getValue()*gridsize/200);
	    double r  = distanceXY(y[0] - sep, y[1]);
	    double r2 = distanceXY(y[0] + sep, y[1]);
	    if (ext) {
		double p = aux3Bar.getValue()*pi/50.;
		double s = aux2Bar.getValue()/6.;
		getDirectionField(result, y, p);
		result[0] *= s;
		result[1] *= s;
		result[2] *= s;
	    } else
		result[0] = result[1] = result[2] = 0;
	    if (showA) {
		if (dir2 == 1)
		    result[2] += -.001*(java.lang.Math.log(r)+
				       java.lang.Math.log(r2)-1);
		else
		    result[2] += .001*(java.lang.Math.log(r)-
				       java.lang.Math.log(r2));
	    } else {
		if (r < lineWidth*2)
		    boundCheck = true;
		rotateParticleAdd(result, y, .0001/(r*r),  sep, 0);
		if (r2 < lineWidth*2)
		    boundCheck = true;
		rotateParticleAdd(result, y, dir2*.0001/(r2*r2), -sep, 0);
	    }
	}
	void setup() {
	    setupBar(0, "Line Separation", 30);
	    if (ext) {
		setupBar(1, "Ext. Strength", 7);
		setupBar(2, "Ext. Direction", 0);
	    }
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new InverseRotationalDoubleExt(); }
    };
    class InverseRotationalDoubleExt extends InverseRotationalDouble {
	InverseRotationalDoubleExt() { ext = true; }
	String getName() { return BUILD_CASE_EMV(null, "cur line double + ext",
						 "1/r rot double + ext"); }
	VecFunction createNext() { return new InverseRotationalDipole(); }
    };
    class InverseRotationalDipole extends InverseRotationalDouble {
	InverseRotationalDipole() { dir2 = -1; }
	String getName() { return BUILD_CASE_EMV(null, "current line dipole",
						 "1/r rotational dipole"); }
	VecFunction createNext() { return new InverseRotationalDipoleExt(); }
    };
    class InverseRotationalDipoleExt extends InverseRotationalDouble {
	InverseRotationalDipoleExt() { dir2 = -1; ext = true; }
	void setup() {
	    super.setup();
	    aux2Bar.setValue(3);
	    aux3Bar.setValue(25);
	}
	String getName() { return BUILD_CASE_EMV(null, "cur line dipole + ext",
						 "1/r rot dipole + ext"); }
	VecFunction createNext() { return new OneDirectionFunction(); }
    };
    class OneDirectionFunction extends VecFunction {
	String getName() { return BUILD_CASE_EMV(null, "uniform field",
						 "one direction"); }
	void getField(double result[], double y[]) {
	    double th = aux1Bar.getValue() * pi /50.;
	    getDirectionField(result, y, th);
	}

	void setup() {
	    setupBar(0, "Theta", 0);
	}
	VecFunction createNext() { return
	    BUILD_CASE_EMV(null, new MovingChargeField(),
			   new InverseSquaredRadialSphere()); }
    };

    void getDirectionField(double result[], double y[], double th) {
	double sinth = java.lang.Math.sin(th);
	double costh = java.lang.Math.cos(th);
	if (!showA) {
	    result[0] = .0003*costh;
	    result[1] = .0003*sinth;
	    result[2] = -.4*(y[0]*costh + y[1]*sinth);
	} else {
	    // The A for this field is a linear rotation around
	    // an axis pointing in the direction of the field.
	    // First calculate the axis.
	    double axis[] = new double[3];
	    axis[0] = costh;
	    axis[1] = sinth;
	    axis[2] = 0;
	    // now project the point we are looking at onto the axis
	    double d = dot(axis, y);
	    // subtract out this projection so we can get the vector
	    // from the point to the axis
	    double r[] = new double[3];
	    int i;
	    for (i = 0; i != 2; i++)
		r[i] = .0006*(y[i] - axis[i]*d);
	    // cross this vector with the axis vector to get the result
	    cross(result, axis, r);
	}
    }

//#endif
//#ifndef BUILD_V
    class MovingChargeField extends InverseSquaredRadial {
	String getName() { return "moving charge"; }
	void getField(double result[], double y[]) {
	    double rz = distanceArray(y);
	    if (showA) {
		result[0] = result[1] = 0;
		result[2] = .0003/rz;
	    } else {
		double r = distanceXY(y[0], y[1]);
		if (rz < chargeSize)
		    boundCheck = true;
		rotateParticle(result, y, .0001/(rz*rz*rz));
	    }
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return null; 
//	       BUILD_CASE_EMV(null, null/*new FastChargeField()*/, null); 
	}
    };
//#endif
//#ifdef BUILD_V
    class InverseSquaredRadialSphere extends VecFunction {
	String getName() { return "1/r^2 sphere"; }
	double getSize() { return (aux1Bar.getValue()+1)/110.; }
	void getField(double result[], double y[]) {
	    double r = distanceArray(y);
	    if (r < .01)
		boundCheck = true;
	    double a = getSize();
	    result[2] = .2*((r > a) ? -1/r : -3/(2*a)+r*r/(2*a*a*a));
	    if (r < a)
		r = a;
	    double alpha = .0003/(r*r*r);
	    result[0] = -y[0]*alpha;
	    result[1] = -y[1]*alpha;
	}
	void setup() {
	    setupBar(0, "Sphere Size", 30);
	}

	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new ConstRadial(); }
    };
    class ConstRadial extends InverseSquaredRadial {
	String getName() { return "const radial"; }
	void getField(double result[], double y[]) {
	    double r = distanceArray(y);
	    if (r < chargeSize)
		boundCheck = true;
	    double q = .0006/r;
	    result[0] = -q*y[0];
	    result[1] = -q*y[1];
	    result[2] = r;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new LinearRadial(); }
    };

    class LinearRadial extends InverseSquaredRadial {
	String getName() { return "linear radial"; }
	void getField(double result[], double y[]) {
	    double r = distanceArray(y);
	    if (r < chargeSize)
		boundCheck = true;
	    double k = .0009;
	    result[0] = -y[0]*k;
	    result[1] = -y[1]*k;
	    result[2] = r*r-1;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new ConstantToYAxis(); }
    };

    class ConstantToYAxis extends InverseRadial {
	String getName() { return "constant to y axis"; }
	void getField(double result[], double y[]) {
	    double alpha = .0004;
	    if (y[0] > -.01 && y[0] < .01)
		boundCheck = true;
	    result[0] = (y[0] <= 0) ? alpha : -alpha;
	    result[1] = 0;
	    result[2] = java.lang.Math.abs(y[0])-1;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new LinearToYAxis(); }
    };
    class LinearToYAxis extends InverseRadial {
	String getName() { return "linear to y axis"; }
	void getField(double result[], double y[]) {
	    double r = java.lang.Math.abs(y[0]);
	    if (r < lineWidth)
		boundCheck = true;
	    double q = .0009;
	    result[0] = -y[0]*q;
	    result[1] = 0;
	    result[2] = r*r-1;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new LinearToXYAxes(); }
    };
    class LinearToXYAxes extends VecFunction {
	String getName() { return "2-dimensional oscillator"; }
	void getField(double result[], double y[]) {
	    double alpha = .0006;
	    double r = java.lang.Math.sqrt((aux1Bar.getValue()+1)/51.);
	    result[0] = -alpha*r*y[0];
	    result[1] = -alpha/r*y[1];
	    result[2] = (y[0]*y[0]*r+y[1]*y[1]/r)-1;
	}
	void setup() {
	    setupBar(0, "X/Y Ratio", 50);
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new InverseToYAxis(); }
    };
    class InverseToYAxis extends VecFunction {
	String getName() { return "inverse to y axis"; }
	void getField(double result[], double y[]) {
	    if (y[0] > -.01 && y[0] < .01)
		boundCheck = true;
	    double alpha = .0003;
	    double zz = y[0];
	    if (zz == 0)
		zz = .00001;
	    result[0] = -alpha/zz;
	    result[1] = 0;
	    result[2] = -.01/(zz*zz);
	}
	VecFunction createNext() { return new InverseSquareRotational(); }
    };
    class InverseSquareRotational extends InverseRadial {
	String getName() { return "1/r^2 rotational"; }
	void getField(double result[], double y[]) {
	    double r = distanceXY(y[0], y[1]);
	    if (r < lineWidth*2)
		boundCheck = true;
	    rotateParticle(result, y, .0001/(r*r*r));
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new LinearRotational(); }
    };
    class LinearRotational extends InverseRadial {
	String getName() { return "linear rotational"; }
	void getField(double result[], double y[]) {
	    double q = .0006;
	    result[0] = -q*y[1];
	    result[1] =  q*y[0];
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new ConstantRotational(); }
    };

    class ConstantRotational extends InverseRadial {
	String getName() { return "constant rotational"; }
	void getField(double result[], double y[]) {
	    double r = distanceXY(y[0], y[1]);
	    rotateParticle(result, y, .0006/r);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new FxEqualsYField(); }
    };

    class FxEqualsYField extends VecFunction {
	String getName() { return "(y,0)"; }
	void getField(double result[], double y[]) {
	    result[2] = result[1] = 0;
	    result[0] = y[1] * .0009;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new FxEqualsY2(); }
    };

    class FxEqualsY2 extends VecFunction {
	String getName() { return "(y^2,0)"; }
	void getField(double result[], double y[]) {
	    result[2] = result[1] = 0;
	    result[0] = y[1]*y[1] * .002;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new Saddle(); }
    };

    class Saddle extends VecFunction {
	String getName() { return "saddle"; }
	void getField(double result[], double y[]) {
	    double q = .001;
	    result[0] = -q*y[0];
	    result[1] =  q*y[1]*.5;
	    result[2] = 1*(2*y[0]*y[0] - y[1]*y[1]);
	}
	VecFunction createNext() { return new RotationalExpansion(); }
    };

    class RotationalExpansion extends VecFunction {
	String getName() { return "rotation + expansion"; }
	void getField(double result[], double y[]) {
	    double q = .0006;
	    result[0] = q*(y[0]-y[1]);
	    result[1] = q*(y[0]+y[1]);
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new Function4Field(); }
    };
    
    class Function4Field extends VecFunction {
	String getName() { return "(x^2-y,x+y^2)"; }
	void getField(double result[], double y[]) {
	    double q = .0003;
	    result[0] = q*(y[0]*y[0]-y[1]);
	    result[1] = q*(y[0]+y[1]*y[1]);
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new Function5Field(); }
    };

    class Function5Field extends VecFunction {
	String getName() { return "(x+y^2,x^2-y)"; }
	void getField(double result[], double y[]) {
	    double q = .0003;
	    result[0] = q*(y[0]+y[1]*y[1]);
	    result[1] = q*(y[0]*y[0]-y[1]);
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new Function6Field(); }
    };

    class Function6Field extends VecFunction {
	String getName() { return "(x,x^2)"; }
	void getField(double result[], double y[]) {
	    double q = .0006;
	    result[0] = q*y[0];
	    result[1] = q*y[0]*y[0];
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new Function7Field(); }
    };

    class Function7Field extends VecFunction {
	String getName() { return "u=x^2+y"; }
	void getField(double result[], double y[]) {
	    double q = .0003;
	    result[0] = -2*y[0]*q;
	    result[1] = -q;
	    result[2] = (y[0]*y[0]+y[1])*1;
	}
	VecFunction createNext() { return new PendulumPotential(); }
    };

    class PendulumPotential extends VecFunction {
	String getName() { return "pendulum potential"; }
	void getField(double result[], double y[]) {
	    double q = .0006;
	    double xx  = y[0]*3.1;
	    double yy  = y[1]*3.1;
	    double cosx = java.lang.Math.cos(xx);
	    double cosy = java.lang.Math.cos(yy);
	    double sinx = java.lang.Math.sin(xx);
	    double siny = java.lang.Math.sin(yy);
	    result[0] = -q*sinx*cosy;
	    result[1] = -q*cosx*siny;
	    result[2] = -cosx*cosy*.5;
	}
	VecFunction createNext() { return new Function8Field(); }
    };

    class Function8Field extends VecFunction {
	String getName() { return "sin(r2)/r2"; }
	void getField(double result[], double y[]) {
	    double r2 = 23*(y[0]*y[0]+y[1]*y[1])+.00000001;
	    result[2] = java.lang.Math.sin(r2)/r2;
	    double r= java.lang.Math.sqrt(r2);
	    double sinr2 = java.lang.Math.sin(r2);
	    double cosr2 = java.lang.Math.cos(r2);
	    double r4 = r2*r2;
	    double vecR = (sinr2/r4-cosr2/r2)*.01;
	    result[0] = y[0]*vecR;
	    result[1] = y[1]*vecR;
	}
	VecFunction createNext() { return new UserDefinedPotential(); }
    };

    class UserDefinedPotential extends VecFunction {
	Expr expr;
	double y0[];
	String getName() { return "user-defined potential"; }
	void setup() {
	    textFields[0].setText("x*x");
	    textFields[0].show();
	    textFieldLabel.setText("Potential Function");
	    textFieldLabel.show();
	    actionPerformed();
	    y0 = new double[3];
	}
	void actionPerformed() {
	    parseError = false;
	    ExprParser ep = new ExprParser(textFields[0].getText());
	    expr = ep.parseExpression();
	    if (ep.gotError())
		parseError = true;
	    functionChanged = true;
	}
	void getField(double result[], double y[]) {
	    double k = .00001;
	    int i;
	    for (i = 0; i != 3; i++)
		y0[i] = y[i];
	    double pot0 = expr.eval(y0);

	    y0[0] += k;
	    result[0] = pot0-expr.eval(y0);
	    y0[0] = y[0];

	    y0[1] += k;
	    result[1] = pot0-expr.eval(y0);
	    y0[1] = y[1];
	    
	    result[2] = pot0*.01;
	    for (i = 0; i != 2; i++)
		if (!(result[i] > -10 && result[i] < 10))
		    boundCheck = true;
	}
	VecFunction createNext() { return new UserDefinedFunction(); }
    };
    class UserDefinedFunction extends VecFunction {
	Expr exprs[];
	String getName() { return "user-defined field"; }
	void setup() {
	    exprs = new Expr[3];
	    textFields[0].setText("x");
	    textFields[1].setText("y");
	    textFieldLabel.setText("Field Functions");
	    textFieldLabel.show();
	    int i;
	    for (i = 0; i != 2; i++)
		textFields[i].show();
	    actionPerformed();
	}
	void actionPerformed() {
	    int i;
	    parseError = false;
	    for (i = 0; i != 2; i++) {
		ExprParser ep = new ExprParser(textFields[i].getText());
		exprs[i] = ep.parseExpression();
		if (ep.gotError())
		    parseError = true;
	    }
	    functionChanged = true;
	}
	void getField(double result[], double y[]) {
	    double k = .0002;
	    int i;
	    for (i = 0; i != 2; i++) {
		result[i] = k*exprs[i].eval(y);
		if (!(result[i] > -10 && result[i] < 10))
		    boundCheck = true;
	    }
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return null; }
    };
//#endif

    class DrawData {
	public Graphics g;
	public double mult;
	public double field[], vv[];
    };

    class Particle {
	public double pos[];
	public double vel[];
	public double lifetime;
	public double phi, theta, phiv, thetav;
	public double stepsize;
	public Color color;
	Particle() {
	    pos = new double[3]; vel = new double[3];
	    stepsize = 1;
	}
    };

    class FieldVector {
	public int sx1, sy1, sx2, sy2;
	public double p1[], p2[];
	public int col;
	public int viewPri;
    };

    class GridElement {
	public double height, div, curl, normdot, vecX, vecY;
	public boolean visible, valid;
    };

    /*
#ifdef BUILD_E    
    // this is a complex number class that avoids creating new objects
    // whenever possible.  Takes a little more effort to use, but it is
    // much faster because we don't have to do constant garbage
    // collection.
    class Complex {
	public double a, b;
	Complex() { a = b = 0; }
	void set(double aa, double bb) { a = aa; b = bb; }
	void set(Complex c) { set(c.a, c.b); }
	void add(double r) { a += r; }
	void add(double r, double i) { a += r; b += i; }
	void square() { set(a*a-b*b, 2*a*b); }
	void mult(double c, double d) { set(a*c-b*d, a*d+b*c); }
	void mult(double c) { a *= c; b *= c; }
	void mult(Complex c) { mult(c.a, c.b); }
	void recip() {
	    double n = a*a+b*b;
	    set(a/n, -b/n);
	}
	void pow(double p) {
	    double arg = java.lang.Math.atan2(b, a);
	    arg *= p;
	    double abs = java.lang.Math.pow(a*a+b*b, p*.5);
	    set(abs*java.lang.Math.cos(arg),
		abs*java.lang.Math.sin(arg));
	}
	void sin() {
	    set(cosh(b)*java.lang.Math.sin(a),
		java.lang.Math.cos(a)*sinh(b));
	}
	void cos() {
	    set(cosh(b)*java.lang.Math.cos(a),
		java.lang.Math.sin(a)*sinh(b));
	}
	void log() {
	    set(java.lang.Math.log(a*a+b*b),
		java.lang.Math.atan2(b, a));
	}
	void arcsin() {
	    Complex z2 = new Complex();
	    z2.set(a, b);
	    z2.square();
	    z2.mult(-1);
	    z2.add(1);
	    z2.pow(.5);
	    mult(0, 1);
	    add(z2.a, z2.b);
	    log();
	    mult(0, -1);
	}
    };

    double cosh(double a) {
	return .5*(java.lang.Math.exp(a)+java.lang.Math.exp(-a));
    }
    double sinh(double a) {
	return .5*(java.lang.Math.exp(a)-java.lang.Math.exp(-a));
    }
#endif
};
*/

//#ifdef BUILD_V
class ExprState {
    public double x, y, z;
}

class Expr {
    Expr(Expr e1, Expr e2, int v) {
	left = e1;
	right = e2;
	type = v;
    }
    Expr(int v, double vv) {
	type = v;
	value = vv;
    }
    Expr(int v) {
	type = v;
    }
    double eval(double es[]) {
	switch (type) {
	case E_ADD: return left.eval(es)+right.eval(es);
	case E_SUB: return left.eval(es)-right.eval(es);
	case E_MUL: return left.eval(es)*right.eval(es);
	case E_DIV: return left.eval(es)/right.eval(es);
	case E_POW: return java.lang.Math.pow(left.eval(es), right.eval(es));
	case E_UMINUS: return -left.eval(es);
	case E_VAL: return value;
	case E_X:   return es[0]*10;
	case E_Y:   return es[1]*10;
	case E_R:   return java.lang.Math.sqrt(
			      es[0]*es[0]+es[1]*es[1])*10;
	case E_SIN: return java.lang.Math.sin(left.eval(es));
	case E_COS: return java.lang.Math.cos(left.eval(es));
	case E_ABS: return java.lang.Math.abs(left.eval(es));
	case E_EXP: return java.lang.Math.exp(left.eval(es));
	case E_LOG: return java.lang.Math.log(left.eval(es));
	case E_SQRT: return java.lang.Math.sqrt(left.eval(es));
	case E_TAN: return java.lang.Math.tan(left.eval(es));
	default: System.out.print("unknown\n");
	}
	return 0;
    }
    Expr left, right;
    double value;
    int type;
    static final int E_ADD = 1;
    static final int E_SUB = 2;
    static final int E_X = 3;
    static final int E_Y = 4;
    static final int E_Z = 5;
    static final int E_VAL = 6;
    static final int E_MUL = 7;
    static final int E_DIV = 8;
    static final int E_POW = 9;
    static final int E_UMINUS = 10;
    static final int E_SIN = 11;
    static final int E_COS = 12;
    static final int E_ABS = 13;
    static final int E_EXP = 14;
    static final int E_LOG = 15;
    static final int E_SQRT = 16;
    static final int E_TAN = 17;
    static final int E_R = 18;
};

class ExprParser {
    String text;
    String token;
    int pos;
    int tlen;
    boolean err;

    void getToken() {
	while (pos < tlen && text.charAt(pos) == ' ')
	    pos++;
	if (pos == tlen) {
	    token = "";
	    return;
	}
	int i = pos;
	int c = text.charAt(i);
	if ((c >= '0' && c <= '9') || c == '.') {
	    for (i = pos; i != tlen; i++) {
		if (!((text.charAt(i) >= '0' && text.charAt(i) <= '9') ||
		      text.charAt(i) == '.'))
		    break;
	    }
	} else if (c >= 'a' && c <= 'z') {
	    for (i = pos; i != tlen; i++) {
		if (!(text.charAt(i) >= 'a' && text.charAt(i) <= 'z'))
		    break;
	    }
	} else {
	    i++;
	}
	token = text.substring(pos, i);
	pos = i;
    }

    boolean skip(String s) {
	if (token.compareTo(s) != 0)
	    return false;
	getToken();
	return true;
    }

    void skipOrError(String s) {
	if (!skip(s))
	    err = true;
    }

    Expr parseExpression() {
	if (token.length() == 0)
	    return new Expr(Expr.E_VAL, 0.);
	Expr e = parse();
	if (token.length() > 0)
	    err = true;
	return e;
    }

    Expr parse() {
	Expr e = parseMult();
	while (true) {
	    if (skip("+"))
		e = new Expr(e, parseMult(), Expr.E_ADD);
	    else if (skip("-"))
		e = new Expr(e, parseMult(), Expr.E_SUB);
	    else
		break;
	}
	return e;
    }

    Expr parseMult() {
	Expr e = parseUminus();
	while (true) {
	    if (skip("*"))
		e = new Expr(e, parseUminus(), Expr.E_MUL);
	    else if (skip("/"))
		e = new Expr(e, parseUminus(), Expr.E_DIV);
	    else
		break;
	}
	return e;
    }

    Expr parseUminus() {
	skip("+");
	if (skip("-"))
	    return new Expr(parsePow(), null, Expr.E_UMINUS);
	return parsePow();
    }

    Expr parsePow() {
	Expr e = parseTerm();
	while (true) {
	    if (skip("^"))
		e = new Expr(e, parseTerm(), Expr.E_POW);
	    else
		break;
	}
	return e;
    }

    Expr parseFunc(int t) {
	skipOrError("(");
	Expr e = parse();
	skipOrError(")");
	return new Expr(e, null, t);
    }

    Expr parseTerm() {
	if (skip("(")) {
	    Expr e = parse();
	    skipOrError(")");
	    return e;
	}
	if (skip("x"))
	    return new Expr(Expr.E_X);
	if (skip("y"))
	    return new Expr(Expr.E_Y);
	if (skip("r"))
	    return new Expr(Expr.E_R);
	if (skip("pi"))
	    return new Expr(Expr.E_VAL, 3.14159265358979323846);
	if (skip("e"))
	    return new Expr(Expr.E_VAL, 2.7182818284590452354);
	if (skip("sin"))
	    return parseFunc(Expr.E_SIN);
	if (skip("cos"))
	    return parseFunc(Expr.E_COS);
	if (skip("abs"))
	    return parseFunc(Expr.E_ABS);
	if (skip("exp"))
	    return parseFunc(Expr.E_EXP);
	if (skip("log"))
	    return parseFunc(Expr.E_LOG);
	if (skip("sqrt"))
	    return parseFunc(Expr.E_SQRT);
	if (skip("tan"))
	    return parseFunc(Expr.E_TAN);
	try {
	    Expr e = new Expr(Expr.E_VAL, Double.valueOf(token).doubleValue());
	    getToken();
	    return e;
	} catch (Exception e) {
	    err = true;
	    System.out.print("unrecognized token: " + token + "\n");
	    return new Expr(Expr.E_VAL, 0);
	}
    }

    ExprParser(String s) {
	text = s;
	tlen = text.length();
	pos = 0;
	err = false;
	getToken();
    }
    boolean gotError() { return err; }
};
//#endif


};
