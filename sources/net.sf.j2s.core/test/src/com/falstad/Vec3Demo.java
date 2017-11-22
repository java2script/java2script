package com.falstad;
// (C) 2001 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= 3-D Vector Fields
//web_Description= Demonstrates vector fields in 3 dimensions.  Includes the Lorenz Attractor and Rossler Attractor
//web_JavaVersion= http://www.falstad.com/vector3d/
//web_AppletImage= vector3d.png
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
import a2s.Scrollbar;

class Vec3DemoCanvas extends Canvas {
    Vec3DemoFrame pg;
    Vec3DemoCanvas(Vec3DemoFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateVec3Demo(g);
    }
    public void paintComponent(Graphics g) {
	super.paintComponent(g);
	pg.updateVec3Demo(g);
    }
};

class Vec3DemoLayout implements LayoutManager {
    public Vec3DemoLayout() {}
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
		if (m instanceof Scrollbar || m instanceof TextField)
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

public class Vec3Demo extends Applet implements ComponentListener {
    static Vec3DemoFrame ogf;
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
	Vec3Demo demo = new Vec3Demo();
	demo.showFrame();
    }

    void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new Vec3DemoFrame(this);
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

class Vec3DemoFrame extends Frame
    implements ComponentListener, ActionListener, AdjustmentListener,
	       MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Rectangle viewMain, viewAxes;
    Image dbimage;
    
    Vec3Demo applet;
    Random random;
    
    public String getAppletInfo() {
	return "Vec3Demo by Paul Falstad";
    }

    static final double pi = 3.14159265358979323846;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    Vec3DemoCanvas cv;
    Checkbox stoppedCheck;
    Button resetButton;
    Button kickButton;
    Checkbox reverseCheck;
    Button infoButton;
    Choice functionChooser;
    Choice dispChooser;
    static int DISP_PART_VELOC, DISP_PART_FORCE, DISP_VECTORS, DISP_LINES, DISP_EQUIPS, DISP_PART_VELOC_A, DISP_VECTORS_A, DISP_PART_MAG, DISP_VIEW_PAPER;
    Choice sliceChooser;
    static final int SLICE_NONE = 0;
    static final int SLICE_X = 1;
    static final int SLICE_Y = 2;
    static final int SLICE_Z = 3;
    Label partCountLabel;
    Label textFieldLabel;
    Label strengthLabel;
    Scrollbar partCountBar;
    Scrollbar strengthBar;
    Scrollbar aux1Bar;
    Scrollbar aux2Bar;
    Scrollbar aux3Bar;
    double fieldStrength, partMult;
    Color darkYellow = new Color(144, 144, 0);
    final double lineWidth = .01;
    class AuxBar {
	Scrollbar bar;
	Label label;
	AuxBar(Label l, Scrollbar b) { label = l; bar = b; }
    };
    AuxBar auxBars[];
    Label vecDensityLabel;
    Scrollbar vecDensityBar;
    Label potentialLabel;
    Scrollbar potentialBar;
    Label lineDensityLabel;
    Scrollbar lineDensityBar;
    Choice modeChooser;
    TextField textFields[];
    static final int MODE_ANGLE = 0;
    static final int MODE_ZOOM = 1;
    static final int MODE_SLICE = 2;
    int reverse;
    int xpoints[];
    int ypoints[];
    int slicerPoints[][];
    double sliceFaces[][];
    double sliceFace[];
    Particle particles[];
    FieldVector vectors[];
    int vecCount;
    int density[][][];
    double sliceval = 0;
    double rotmatrix[];
    double cameraPos[];
    double intersection[];
    double intersectionDistance;
    int vectorSpacing = 16;
    int currentStep;
    boolean selectedSlice, mouseDown, getPot;
    boolean showA;
    boolean parseError;
    Color fieldColors[];
    Color equipColors[];

    static boolean BUILD_E = false;
    static boolean BUILD_V = true;
    static boolean BUILD_M = false;
    static String BUILD_CASE_EMV(String e, String m, String v) { return BUILD_V ? v : BUILD_E ? e : m; }
    static VecFunction BUILD_CASE_EMV(VecFunction e, VecFunction m, VecFunction v) { return BUILD_V ? v : BUILD_E ? e : m; }

    // was 1./5, 10; 1./3, 6 worked better
    static final double densitygroupsize = 1./2;
    static final int densitygridsize = 4;
    static final int maxParticleCount = 5000;
    double zoom = 3;
    boolean dragging;
    int oldDragX, oldDragY, dragX, dragY, dragStartX, dragStartY;
    double dragZoomStart, lastXRot, lastYRot;
    Vector functionList;
    VecFunction curfunc;
    int pause = 20;
    boolean useFrame = false;

    Vec3DemoFrame(Vec3Demo a) {
	super("3-D Vector Fields Applet v1.3c");
	applet = a;
    }

    public void initFrame() {
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
		BUILD_M = false;
	    }
	    if (param != null && param.equalsIgnoreCase("magnetic")) {
		BUILD_M = true;
		BUILD_V = false;
		BUILD_E = false;
	    }
	} catch (Exception e) { }
	
	Container main;
        if (useFrame)
            main = this;
        else
            main = applet;
	
	if (!BUILD_M) {
	    DISP_PART_VELOC    = 0;
	    DISP_PART_FORCE    = 1;
	    DISP_VECTORS       = 2;
	    DISP_LINES         = 3;
	    DISP_EQUIPS        = 4;
	    DISP_PART_VELOC_A  = -1;
	    DISP_VECTORS_A     = -2;
	    DISP_PART_MAG      = -3;
	    DISP_VIEW_PAPER    = -4;
	} else {
	    DISP_PART_VELOC    = 0;
	    DISP_PART_VELOC_A  = 1;
	    DISP_VECTORS       = 2;
	    DISP_VECTORS_A     = 3;
	    DISP_LINES         = 4;
	    DISP_PART_MAG      = 5;
	    DISP_VIEW_PAPER    = 6;
	    DISP_EQUIPS        = -1;
	    DISP_PART_FORCE    = -4;
	}


	functionList = new Vector();
	VecFunction vf =
	    BUILD_CASE_EMV(new InverseSquaredRadial(),
			   new InverseRotational(),
			   new InverseSquaredRadial());
	while (vf != null) {
	    functionList.addElement(vf);
	    vf = vf.createNext();
	}
	random = new Random();
	particles = new Particle[maxParticleCount];
	int i;
	for (i = 0; i != maxParticleCount; i++)
	    particles[i] = new Particle();
	xpoints = new int[4];
	ypoints = new int[4];
	slicerPoints = new int[2][5*2];
	sliceFaces = new double[4][3];
	rotmatrix = new double[9];
	setXYView();
	density = new int[densitygridsize][densitygridsize][densitygridsize];
	main.setLayout(new Vec3DemoLayout());
	cv = new Vec3DemoCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);

	/*infoButton = new Button("Function Info");
	add(infoButton);
	infoButton.addActionListener(this);*/

	main.add(new Label("Field selection:"));
	functionChooser = new Choice();
	for (i = 0; i != functionList.size(); i++)
	    functionChooser.add(
	       ((VecFunction) functionList.elementAt(i)).getName());
	main.add(functionChooser);
	functionChooser.addItemListener(this);

	dispChooser = new Choice();
	dispChooser.addItemListener(this);
	setupDispChooser(true);
	main.add(dispChooser);

	modeChooser = new Choice();
	modeChooser.add("Mouse = Adjust Angle");
	modeChooser.add("Mouse = Adjust Zoom");
	modeChooser.addItemListener(this);
	main.add(modeChooser);
	
	sliceChooser = new Choice();
	sliceChooser.add("No Slicing");
	sliceChooser.add("Show X Slice");
	sliceChooser.add("Show Y Slice");
	sliceChooser.add("Show Z Slice");
	sliceChooser.addItemListener(this);
	main.add(sliceChooser);
	
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
	
	if (BUILD_M) {
	    add(kickButton);
	    kickButton.addActionListener(this);
	    kickButton.disable();
	}

	main.add(strengthLabel = new Label("Field Strength", Label.CENTER));
	main.add(strengthBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 100));
	strengthBar.addAdjustmentListener(this);

	main.add(partCountLabel = new Label("Number of Particles", Label.CENTER));
	main.add(partCountBar = new Scrollbar(Scrollbar.HORIZONTAL,
					 500, 1, 1,
					 maxParticleCount));
	partCountBar.addAdjustmentListener(this);

	main.add(vecDensityLabel = new Label("Vector Density", Label.CENTER));
	main.add(vecDensityBar = new Scrollbar(Scrollbar.HORIZONTAL, 16, 1, 2, 64));
	vecDensityBar.addAdjustmentListener(this);

	main.add(lineDensityLabel = new Label(BUILD_V ?
					 "Streamline Density" :
					 "Field Line Density",
					 Label.CENTER));
	main.add(lineDensityBar = new Scrollbar(Scrollbar.HORIZONTAL, 5, 1, 3, 16));
	lineDensityBar.addAdjustmentListener(this);

	main.add(potentialLabel = new Label("Potential", Label.CENTER));
	main.add(potentialBar = new Scrollbar(Scrollbar.HORIZONTAL, 250,
					 1, 0, 1000));
	potentialBar.addAdjustmentListener(this);

	Label lb;
	auxBars = new AuxBar[3];
	main.add(lb = new Label("Aux 1", Label.CENTER));
	main.add(aux1Bar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, 100));
	aux1Bar.addAdjustmentListener(this);
	auxBars[0] = new AuxBar(lb, aux1Bar);

	main.add(lb = new Label("Aux 2", Label.CENTER));
	main.add(aux2Bar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, 100));
	aux2Bar.addAdjustmentListener(this);
	auxBars[1] = new AuxBar(lb, aux2Bar);

	main.add(lb = new Label("Aux 3", Label.CENTER));
	main.add(aux3Bar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, 100));
	aux3Bar.addAdjustmentListener(this);
	auxBars[2] = new AuxBar(lb, aux3Bar);

	if (BUILD_V)
	    main.add(textFieldLabel = new Label("", Label.CENTER));

	textFields = new TextField[3];
	for (i = 0; i != 3; i++) {
	    main.add(textFields[i] = new TextField());
	    textFields[i].addActionListener(this);
	}
	fieldColors = new Color[513];
	for (i = 0; i != 256; i++) {
	    int col = (255<<24) | (i<<8);
	    fieldColors[i] = new Color(col);
	}
	for (i = 0; i != 256; i++) {
	    int col = (255<<24) | (255<<8) | (i * (0x10001));
	    fieldColors[i+256] = new Color(col);
	}
	fieldColors[512] = fieldColors[511];
	equipColors = new Color[513];
	for (i = 0; i != 256; i++) {
	    int r = 255-i/2;
	    int gb = i/2;
	    int col = (255<<24) | (r<<16) | (gb<<8) | gb;
	    equipColors[i] = new Color(col);
	}
	for (i = 0; i != 256; i++) {
	    int g = 128+i/2;
	    int rb = 128-i/2;
	    int col = (255<<24) | (rb<<16) | (g<<8) | rb;
	    equipColors[i+256] = new Color(col);
	}
	equipColors[512] = equipColors[511];

	main.add(new Label("http://www.falstad.com", Label.CENTER));
	intersection = new double[3];

	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);

	functionChanged();
	dispChooserChanged();

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
	finished = true;
    }

    boolean finished;
    
    void setViewMatrix(double a, double b) {
	int i;
	for (i = 0; i != 9; i++)
	    rotmatrix[i] = 0;
	rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
	rotate(a, b);
	lastXRot = lastYRot = 0;
    }

    void setXYView() {
	setViewMatrix(0, pi/11);
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
    }

    void resetDensityGroups() {
	int i, j, k;
	for (i = 0; i != densitygridsize; i++)
	    for (j = 0; j != densitygridsize; j++)
		for (k = 0; k != densitygridsize; k++)
		    density[i][j][k] = 0;
	int slice = sliceChooser.getSelectedIndex();
	boolean sliced = (slice > 0);
	int pcount = getParticleCount();
	for (i = 0; i != pcount; i++) {
	    Particle p = particles[i];
	    if (sliced)
		p.pos[slice-SLICE_X] = sliceval;
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
	int c = (int)((p.pos[2]+1)*(densitygridsize/2));
	int n = 0;
	try {
	n = ++density[a][b][c];
	if (n > maxParticleCount)
	    System.out.print(a + " " + b + " " + c + " " + density[a][b][c] + "\n");
	} catch (Exception e) {
	    System.out.print(p.pos[0] + " " + p.pos[1] + " " + p.pos[2] + "\n");
	    e.printStackTrace();
	}
	return n;
    }

    void removeFromDensityGroup(Particle p) {
	int a = (int)((p.pos[0]+1)*(densitygridsize/2));
	int b = (int)((p.pos[1]+1)*(densitygridsize/2));
	int c = (int)((p.pos[2]+1)*(densitygridsize/2));
	try {
	    if (--density[a][b][c] < 0)
		System.out.print(a + " " + b + " " + c + " " + density[a][b][c] + "\n");
	} catch (Exception e) {
	    System.out.print(p.pos[0] + " " + p.pos[1] + " " + p.pos[2] + "\n");
	    e.printStackTrace();
	}
    }

    void positionParticle(Particle p) {
	int x, y, z;
	int bestx = 0, besty = 0, bestz = 0;
	int best = 10000;

	// we avoid scanning the grid in the same order every time
	// so that we treat equal-density squares as equally as possible.
	int randaddx = getrand(densitygridsize);
	int randaddy = getrand(densitygridsize);
	int randaddz = getrand(densitygridsize);
	for (x = 0; x != densitygridsize; x++)
	    for (y = 0; y != densitygridsize; y++)
		for (z = 0; z != densitygridsize; z++) {
		    int ix = (randaddx + x) % densitygridsize;
		    int iy = (randaddy + y) % densitygridsize;
		    int iz = (randaddz + z) % densitygridsize;
		    if (density[ix][iy][iz] <= best) {
			bestx = ix;
			besty = iy;
			bestz = iz;
			best = density[ix][iy][iz];
		    }
		}
	p.pos[0] = bestx*densitygroupsize +
	    getrand(100)*densitygroupsize/100.0 - 1;
	p.pos[1] = besty*densitygroupsize +
	    getrand(100)*densitygroupsize/100.0 - 1;
	p.pos[2] = bestz*densitygroupsize +
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
	    for (j = 0; j != 3; j++) {
		p.pos[j] = getrand(200)/100.0 - 1;
		p.vel[j] = 0;
	    }
	    p.lifetime = i*2;
	    p.stepsize = 1;
	}
	resetDensityGroups();
    }

    void kickParticles() {
	int i, j;
	for (i = 0; i != getParticleCount(); i++) {
	    Particle p = particles[i];
	    for (j = 0; j != 3; j++)
		p.vel[j] += (getrand(100)/99.0 - .5) * .04;
	}
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
	rotate(rotm2);
    }

    void rotate(double rotm2[]) {
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

    void reinit() {
	handleResize();
	resetParticles();
    }

    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    static final double root2 = 1.4142135623730950488016887242096981;
    double scalex, scaley;
    static final double viewDistance = 5;

    void map3d(double x, double y, double z, int xpoints[],
	       int ypoints[], int pt) {
	map3dView(x, y, z, xpoints, ypoints, pt, viewMain);
    }

    void map3dView(double x, double y, double z,
	       int xpoints[], int ypoints[], int pt, Rectangle view) {
	double rotm[] = rotmatrix;
	double realx =               x*rotm[0] + y*rotm[3] + z*rotm[6];
	double realy =               x*rotm[1] + y*rotm[4] + z*rotm[7];
	double realz = viewDistance-(x*rotm[2] + y*rotm[5] + z*rotm[8]);
	double scalex = view.width*zoom/2;
	double scaley = view.height*zoom/2;
	double aratio = view.width/(double) view.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;
	xpoints[pt] = view.x + view.width /2 + (int) (scalex*realx/realz);
	ypoints[pt] = view.y + view.height/2 - (int) (scaley*realy/realz);
    }

    double getScalingFactor(double x, double y, double z) {
	double rotm[] = rotmatrix;
	double realz = viewDistance-(x*rotm[2] + y*rotm[5] + z*rotm[8]);
	double scalex = winSize.width*zoom/2;
	double scaley = winSize.height*zoom/2;
	double aratio = winSize.width/(double) winSize.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;
	// scalex and scaley should now be approx. equal
	return scalex/realz;
    }

    // map point on screen to 3-d coordinates assuming given z depth
    void unmap3d(double x3[], int x, int y, double z, Rectangle view) {
	double scalex = view.width*zoom/2;
	double scaley = view.height*zoom/2;

	double aratio = view.width/(double) view.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;

	double realz = viewDistance-z;
	double realx =  (x-(view.width/2))*realz/scalex;
	double realy = -(y-(view.height/2))*realz/scaley;
	double rotm[] = rotmatrix;
	x3[0] = (realx*rotm[0] + realy*rotm[1] + z*rotm[2]);
	x3[1] = (realx*rotm[3] + realy*rotm[4] + z*rotm[5]);
	x3[2] = (realx*rotm[6] + realy*rotm[7] + z*rotm[8]);
    }

    // map point on screen to 3-d coordinates assuming it lies on a given plane
    void unmap3d(double x3[], int x, int y, double pn[], double pp[],
		 Rectangle view) {
	// first, find all points which map to (x,y) on the screen.
	// this is a line.
	double scalex = view.width*zoom/2;
	double scaley = view.height*zoom/2;

	double aratio = view.width/(double) view.height;
	// preserve aspect ratio regardless of window dimensions
	if (aratio < 1)
	    scaley *= aratio;
	else
	    scalex /= aratio;

	double vx =  (x-(view.width/2))/scalex;
	double vy = -(y-(view.height/2))/scaley;
	// vz = -1
	
	// map the line vector to object space (we know where the camera
	// is in object space already so no need to map that)
	double rotm[] = rotmatrix;
	double mvx = (vx*rotm[0] + vy*rotm[1] - rotm[2]);
	double mvy = (vx*rotm[3] + vy*rotm[4] - rotm[5]);
	double mvz = (vx*rotm[6] + vy*rotm[7] - rotm[8]);
	
	// calculate the intersection between the line and the given plane
	double t = ((pp[0]-cameraPos[0])*pn[0] +
		    (pp[1]-cameraPos[1])*pn[1] +
		    (pp[2]-cameraPos[2])*pn[2]) /
	    (pn[0]*mvx+pn[1]*mvy+pn[2]*mvz);

	x3[0] = cameraPos[0]+mvx*t;
	x3[1] = cameraPos[1]+mvy*t;
	x3[2] = cameraPos[2]+mvz*t;
    }

    void scaleworld() {
	scalex = winSize.width/2;
	scaley = winSize.height/2;
    }

    long lastTime;
    double timeStep;
    
    public void updateVec3Demo(Graphics realg) {
	if (winSize == null || winSize.width == 0)
	    return;
	Graphics g = dbimage.getGraphics();
	if (xpoints == null)
	    return;
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());
	// XXX make it true, then fix it so current animation works w/ vectors
	boolean allquiet = false;

	curfunc.setupFrame();
	int disp = dispChooser.getSelectedIndex();
	timeStep = 1;
	if (!stoppedCheck.getState()) {
	    if (lastTime > 0)
		timeStep = (System.currentTimeMillis()-lastTime)*.03;
	    if (timeStep > 3)
		timeStep = 3;
	    lastTime = System.currentTimeMillis();
	    if (disp != DISP_VECTORS && disp != DISP_VECTORS_A &&
		disp != DISP_LINES && disp != DISP_EQUIPS) {
		moveParticles();
		allquiet = false;
	    }
	    currentStep = (int)
		(reverse*(lastTime/30) % 800);
	    if (currentStep < 0)
		currentStep += 800;
	} else {
	    lastXRot = lastYRot = 0;
	    lastTime = 0;
	}

	drawCube(g, true);

	cameraPos = new double[3];
	unmap3d(cameraPos, winSize.width/2, winSize.height/2, viewDistance,
		viewMain);
	if (disp == DISP_VECTORS || disp == DISP_VECTORS_A)
	    drawVectors(g);
	else if (disp == DISP_LINES) {
	    genLines();
	    drawLines(g);
	} else if (disp == DISP_EQUIPS) {
	    genEquips();
	    drawLines(g);
	} else if (disp == DISP_VIEW_PAPER)
	    drawViewPaper(g);
	else
	    drawParticles(g);

	g.setColor(Color.gray);
	drawCube(g, false);

	drawAxes(g);
	curfunc.finishFrame();

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
	if (mouseDown)
	    lastXRot = lastYRot = 0;
	else if (lastXRot != 0 || lastYRot != 0) {
	    rotate(lastXRot*timeStep, lastYRot*timeStep);
	    allquiet = false;
	}
	if (!stoppedCheck.getState() && !allquiet)
	    cv.repaint(pause);
    }

    void drawCurrentArrow(Graphics g, int x1, int y1, int x2, int y2) {
	if (reverse == 1)
	    drawArrow(g, null, x1, y1, x2, y2, 7);
	else
	    drawArrow(g, null, x2, y2, x1, y1, 7);
    }

    void drawCurrentLine(Graphics g, int x1, int y1, int x2, int y2, int n,
			 boolean doArrow, int dir) {
	int i;
	if (dir == -1) {
	    int x3 = x1;
	    int y3 = y1;
	    x1 = x2; y1 = y2;
	    x2 = x3; y2 = y3;
	}
	int x0 = x1;
	int y0 = y1;
	n *= 3;
	for (i = 1; i <= n; i++) {
	    int x = (x2-x1)*i/n + x1;
	    int y = (y2-y1)*i/n + y1;
	    g.setColor(Color.yellow);
	    if (i == n && doArrow && reverse == 1)
		drawCurrentArrow(g, x0, y0, x, y);
	    else if (i == 1 && doArrow && reverse == -1)
		drawCurrentArrow(g, x0, y0, x, y);
	    else {
		g.setColor(getCurrentColor(i));
		g.drawLine(x0, y0, x, y);
	    }
	    x0 = x; y0 = y;
	}
    }

    Color getCurrentColor(int i) {
	return (((currentStep/2+400-i) & 4) > 0) ?
	    Color.yellow : Color.darkGray;
    }
    
    void drawSphere(Graphics g, double r, boolean back) {
	int i;
	int ct = 10;
	for (i = 0; i != ct; i++) {
	    double th1 = pi*2*i/ct;
	    double th2 = pi*2*(i+1)/ct;
	    double sinth1 = r*java.lang.Math.sin(th1);
	    double costh1 = r*java.lang.Math.cos(th1);
	    double sinth2 = r*java.lang.Math.sin(th2);
	    double costh2 = r*java.lang.Math.cos(th2);
	    if (backFacing(costh1, sinth1, 0, costh1, sinth1, 0) == back) {
		map3d(costh1, sinth1, 0, xpoints, ypoints, 0);
		map3d(costh2, sinth2, 0, xpoints, ypoints, 1);
		g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    }
	    if (backFacing(0, costh1, sinth1, 0, costh1, sinth1) == back) {
		map3d(0, costh1, sinth1, xpoints, ypoints, 0);
		map3d(0, costh2, sinth2, xpoints, ypoints, 1);
		g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    }
	    if (backFacing(costh1, 0, sinth1, costh1, 0, sinth1) == back) {
		map3d(costh1, 0, sinth1, xpoints, ypoints, 0);
		map3d(costh2, 0, sinth2, xpoints, ypoints, 1);
		g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    }
	}
    }

    void fillSphere(Graphics g, double r, double xoff) {
	int i, j;
	int ct = 20;
	for (i = 0; i != ct; i++) {
	    double th1 = pi*i/ct;
	    double th2 = pi*(i+1)/ct;
	    double costh1 = r*java.lang.Math.cos(th1);
	    double sinth1 = r*java.lang.Math.sin(th1);
	    double costh2 = r*java.lang.Math.cos(th2);
	    double sinth2 = r*java.lang.Math.sin(th2);
	    double cosph1 = 1, sinph1 = 0;
	    for (j = 0; j != ct; j++) {
		double ph2 = 2*pi*(j+1)/ct;
		double cosph2 = java.lang.Math.cos(ph2);
		double sinph2 = java.lang.Math.sin(ph2);
		double x1 = sinth1*cosph1;
		double y1 = sinth1*sinph1;
		double z1 = costh1;
		double x = cameraPos[0]-(x1+xoff);
		double y = cameraPos[1]-y1;
		double z = cameraPos[2]-z1;
		double d = x*x1+y*y1+z*z1;
		if (d > 0) {
		    int dd = (int) (d/r*40);
		    if (dd > 255)
			dd = 255;
		    g.setColor(new Color(dd, dd, 0));
		    map3d(xoff+x1, y1, z1, xpoints, ypoints, 0);
		    map3d(xoff+sinth1*cosph2, sinth1*sinph2, costh1,
			  xpoints, ypoints, 1);
		    map3d(xoff+sinth2*cosph2, sinth2*sinph2, costh2,
			  xpoints, ypoints, 2);
		    map3d(xoff+sinth2*cosph1, sinth2*sinph1, costh2,
			  xpoints, ypoints, 3);
		    g.fillPolygon(xpoints, ypoints, 4);
		}
		cosph1 = cosph2; sinph1 = sinph2;
	    }
	}
    }

    void drawCylinder(Graphics g, double r, double xoff, boolean back) {
	int i;
	int ct = 10;
	for (i = 0; i != ct; i++) {
	    double th1 = pi*2*i/ct;
	    double th2 = pi*2*(i+1)/ct;
	    double sinth1 = r*java.lang.Math.sin(th1);
	    double costh1 = r*java.lang.Math.cos(th1);
	    double sinth2 = r*java.lang.Math.sin(th2);
	    double costh2 = r*java.lang.Math.cos(th2);
	    if (backFacing(costh1, sinth1, 0, costh1, sinth1, 0) == back) {
		map3d(xoff+costh1, sinth1, -1, xpoints, ypoints, 0);
		map3d(xoff+costh2, sinth2, -1, xpoints, ypoints, 1);
		map3d(xoff+costh2, sinth2, +1, xpoints, ypoints, 2);
		map3d(xoff+costh1, sinth1, +1, xpoints, ypoints, 3);
		g.drawPolygon(xpoints, ypoints, 4);
	    }
	}
    }

    void setFaceColor(Graphics g, double d) {
	int dd = 32+(int) (d*40);
	if (dd > 255)
	    dd = 255;
	g.setColor(new Color(dd, dd, 0));
    }

    void fillCylinder(Graphics g, double r, double xoff) {
	int i;
	int ct = 30;
	int sidepoints[][];
	sidepoints = new int[4][ct];
	for (i = 0; i != ct; i++) {
	    double th1 = pi*2*i/ct;
	    double th2 = pi*2*(i+1)/ct;
	    double sinth1 = r*java.lang.Math.sin(th1);
	    double costh1 = r*java.lang.Math.cos(th1);
	    double sinth2 = r*java.lang.Math.sin(th2);
	    double costh2 = r*java.lang.Math.cos(th2);
	    double x = cameraPos[0]-(xoff+costh1);
	    double y = cameraPos[1]-sinth1;
	    double d = x*costh1+y*sinth1;
	    if (d > 0)
		setFaceColor(g, d/r);
	    map3d(xoff+costh1, sinth1, -1, xpoints, ypoints, 0);
	    map3d(xoff+costh2, sinth2, -1, xpoints, ypoints, 1);
	    map3d(xoff+costh2, sinth2, +1, xpoints, ypoints, 2);
	    map3d(xoff+costh1, sinth1, +1, xpoints, ypoints, 3);
	    sidepoints[0][i] = xpoints[0];
	    sidepoints[1][i] = ypoints[0];
	    sidepoints[2][i] = xpoints[3];
	    sidepoints[3][i] = ypoints[3];
	    if (d > 0)
		g.fillPolygon(xpoints, ypoints, 4);
	}
	if (!backFacing(0, 0, 1, 0, 0, 1)) {
	    setFaceColor(g, cameraPos[2]);
	    g.fillPolygon(sidepoints[2], sidepoints[3], ct);
	} else if (!backFacing(0, 0, -1, 0, 0, -1)) {
	    setFaceColor(g, -cameraPos[2]);
	    g.fillPolygon(sidepoints[0], sidepoints[1], ct);
	}
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

    void drawViewPaper(Graphics g) {
	int i, j;
	int ct = vecDensityBar.getValue();
	ct = 24+(ct*56/64);
	double z = sliceval;
	double pos[] = new double[3];
	double field[] = new double[3];
	int slice = sliceChooser.getSelectedIndex()-SLICE_X;
	if (slice < 0)
	    slice = 0;
	int coord1 = (slice == 0) ? 1 : 0;
	int coord2 = (slice == 2) ? 1 : 2;
	for (i = 0; i != ct; i++) {
	    double x1 = i*2./ct - 1;
	    double x2 = (i+1.)*2/ct - 1;
	    for (j = 0; j != ct; j++) {
		double y1 = j*2./ct - 1;
		double y2 = (j+1.)*2/ct - 1;
		pos[coord1] = x1;
		pos[coord2] = y1;
		pos[slice] = z;
		curfunc.getField(field, pos);
		// paper is dark when field is perpendicular, light when
		// it is parallel
		double prp = field[slice] < 0 ? -field[slice] : field[slice];
		double par = java.lang.Math.sqrt(field[coord1]*field[coord1]+
						 field[coord2]*field[coord2]);
		int dd = (int) ((par/2-prp)*strengthBar.getValue()*20000.+128);
		if (dd < 0)
		    dd = 0;
		if (dd > 255)
		    dd = 255;
		g.setColor(new Color(0f, dd/255f, 0f));
		map3d(pos[0], pos[1], pos[2], xpoints, ypoints, 0);
		pos[coord1] = x2;
		map3d(pos[0], pos[1], pos[2], xpoints, ypoints, 1);
		pos[coord2] = y2;
		map3d(pos[0], pos[1], pos[2], xpoints, ypoints, 2);
		pos[coord1] = x1;
		map3d(pos[0], pos[1], pos[2], xpoints, ypoints, 3);
		g.fillPolygon(xpoints, ypoints, 4);
	    }
	}
    }

    void drawVectors(Graphics g) {
	int x, y, z;
	DrawData dd = new DrawData();
	dd.mult = strengthBar.getValue() * 80.;
	dd.g = g;
	dd.field = new double[3];
	dd.vv = new double[3];
	vectorSpacing = vecDensityBar.getValue();
	int slice = sliceChooser.getSelectedIndex();
	boolean sliced = (slice > 0);
	double vec[] = new double[3];

	if (vectors == null && sliced)
	    vectors = new FieldVector[vectorSpacing*vectorSpacing];
	vecCount = 0;

	if (!sliced) {
	    vectorSpacing = vectorSpacing / 2;
	    if (vectors == null)
		vectors =
		    new FieldVector[vectorSpacing*vectorSpacing*vectorSpacing];
	    for (x = 0; x != vectorSpacing; x++) {
		vec[0] = x*(2.0/(vectorSpacing-1))-1;
		for (y = 0; y != vectorSpacing; y++) {
		    vec[1] = y*(2.0/(vectorSpacing-1))-1;
		    for (z = 0; z != vectorSpacing; z++) {
			vec[2] = z*(2.0/(vectorSpacing-1))-1;
			drawVector(dd, vec);
		    }
		}
	    }
	} else {
	    int coord1 = (slice == SLICE_X) ? 1 : 0;
	    int coord2 = (slice == SLICE_Z) ? 1 : 2;
	    int slicecoord = slice-SLICE_X;
	    vec[slicecoord] = sliceval;
	    for (x = 0; x != vectorSpacing; x++) {
		vec[coord1] = x*(2.0/(vectorSpacing-1))-1;
		for (y = 0; y != vectorSpacing; y++) {
		    vec[coord2] = y*(2.0/(vectorSpacing-1))-1;
		    drawVector(dd, vec);
		}
	    }
	}
	curfunc.render(g);
    }

    void genLines() {
	if (vectors != null)
	    return;
	partMult = fieldStrength = 10;
	int i;
	vecCount = 0;
	
	int lineGridSize = lineDensityBar.getValue();
	if (lineGridSize < 3)
	    lineGridSize = 3;
	if (lineGridSize > 16)
	    lineGridSize = 16;
	int slice = sliceChooser.getSelectedIndex();
	boolean sliced = (slice > 0);
	if (sliced)
	    lineGridSize *= 2;
	int ct = (sliced) ? 30*lineGridSize*lineGridSize :
	    30*lineGridSize*lineGridSize*lineGridSize;
	vectors = new FieldVector[ct];
	double brightmult = 160*strengthBar.getValue();

	boolean lineGrid[][][] =
	    new boolean[lineGridSize][lineGridSize][lineGridSize];
	double lineGridMult = lineGridSize/2.;
	if (sliced) {
	    int j, k;
	    int gp = (int) ((sliceval+1)*lineGridMult);
	    for (i = 0; i != lineGridSize; i++)
		for (j = 0; j != lineGridSize; j++)
		    for (k = 0; k != lineGridSize; k++) {
			switch (slice) {
			case SLICE_X: lineGrid[i][j][k] = i!=gp; break;
			case SLICE_Y: lineGrid[i][j][k] = j!=gp; break;
			case SLICE_Z: lineGrid[i][j][k] = k!=gp; break;
			}
		    }
	}

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
		int px = 0, py = 0, pz = 0;
		while (true) {
		    if (!lineGrid[px][py][pz])
			break;
		    if (++px < lineGridSize)
			continue;
		    px = 0;
		    if (++py < lineGridSize)
			continue;
		    py = 0;
		    if (++pz < lineGridSize)
			continue;
		    break;
		}
		if (pz == lineGridSize)
		    break;
		lineGrid[px][py][pz] = true;
		double offs = .5/lineGridMult;
		origp[0] = p.pos[0] = px/lineGridMult-1+offs;
		origp[1] = p.pos[1] = py/lineGridMult-1+offs;
		origp[2] = p.pos[2] = pz/lineGridMult-1+offs;
		if (sliced)
		    origp[slice-SLICE_X] = p.pos[slice-SLICE_X] = sliceval;
	    }

	    FieldVector fv = vectors[vecCount];
	    if (fv == null) {
		fv = vectors[vecCount] = new FieldVector();
		fv.p1 = new double[3];
		fv.p2 = new double[3];
	    }
	    vecCount++;
	    fv.p1[0] = p.pos[0]; fv.p1[1] = p.pos[1]; fv.p1[2] = p.pos[2];
	    double x[] = p.pos;
	    lineSegment(p, dir);
	    //System.out.print(x[0] + " " + x[1] + " " + x[2] + "\n");
	    if (p.lifetime < 0) {
		vecCount--;
		continue;
	    }
	    int gx = (int) ((x[0]+1)*lineGridMult);
	    int gy = (int) ((x[1]+1)*lineGridMult);
	    int gz = (int) ((x[2]+1)*lineGridMult);
	    if (!lineGrid[gx][gy][gz])
		segs--;
	    lineGrid[gx][gy][gz] = true;
	    fv.p2[0] = p.pos[0]; fv.p2[1] = p.pos[1]; fv.p2[2] = p.pos[2];
	    
	    double dn = brightmult*p.phi;
	    if (dn > 2)
		dn = 2;
	    fv.col = (int) (dn*255);

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

    void drawLines(Graphics g) {
	int i;
	for (i = 0; i != vecCount; i++) {
	    FieldVector fv = vectors[i];
	    double x[] = fv.p1;
	    map3d(x[0], x[1], x[2], xpoints, ypoints, 0);
	    int vp1 = curfunc.getViewPri(cameraPos, x);
	    x = fv.p2;
	    map3d(x[0], x[1], x[2], xpoints, ypoints, 1);

	    fv.sx1 = xpoints[0];
	    fv.sy1 = ypoints[0];
	    fv.sx2 = xpoints[1];
	    fv.sy2 = ypoints[1];
	    int vp2 = curfunc.getViewPri(cameraPos, x);
	    fv.viewPri = (vp1 > vp2) ? vp1 : vp2;
	}
	curfunc.render(g);
    }

//#ifndef BUILD_M
    double potfield[];
    class EquipPoint {
	double pos[];
	double pot;
	EquipPoint() { pos = new double[3]; }
	EquipPoint(EquipPoint a, EquipPoint b) {
	    pos = new double[3];
	    int i;
	    for (i = 0; i != 3; i++)
		pos[i] = .5*(a.pos[i] + b.pos[i]);
	    curfunc.getField(potfield, pos);
	    pot = reverse*potfield[0];
	}
	void set(int cx, int cy, int cz, double x, double y, double z) {
	    pos[cx] = x; pos[cy] = y; pos[cz] = z;
	}
	boolean valid() {
	    return !(Double.isNaN(pot) || Double.isInfinite(pot));
	}
	boolean inRange() {
	    return (pot >= -2 && pot <= 2);
	}
	void setPot(double p) { pot = p; }
    }

    boolean canSubdivide(EquipPoint a, EquipPoint b) {
	return dist2(a.pos, b.pos) > .04*.04;
    }

    static final int maxVectors = 10000;
    void genEquips() {
	if (vectors != null)
	    return;
	partMult = fieldStrength = 10;
	vecCount = 0;
	int slice = sliceChooser.getSelectedIndex();
	vectors = new FieldVector[maxVectors];
	potfield = new double[3];

	EquipPoint eps[] = new EquipPoint[4];
	int i;
	for (i = 0; i != 4; i++)
	    eps[i] = new EquipPoint();
	if (slice == SLICE_NONE) {
	    int steps = 3;
	    for (i = -steps; i <= steps; i++)
		genEquipPlane(eps, i/(double) steps, SLICE_X);
	    for (i = -steps; i <= steps; i++)
		genEquipPlane(eps, i/(double) steps, SLICE_Y);
	    for (i = -steps; i <= steps; i++)
		genEquipPlane(eps, i/(double) steps, SLICE_Z);
	} else
	    genEquipPlane(eps, sliceval, slice);
	//System.out.print("vc " + vecCount + "\n");
    }

    void genEquipPlane(EquipPoint eps[], double z, int slice) {
	int i, j;
	int coord1 = (slice == SLICE_X) ? 1 : 0;
	int coord2 = (slice == SLICE_Z) ? 1 : 2;
	slice -= SLICE_X;
	int grid = (sliceChooser.getSelectedIndex() == SLICE_NONE) ? 12 : 24;
	double gridmult = 2./grid;
	double pots[][] = new double[grid+1][grid+1];
	for (i = 0; i <= grid; i++)
	    for (j = 0; j <= grid; j++) {
		double x1 = i*gridmult-1;
		double y1 = j*gridmult-1;
		eps[0].set(coord1, coord2, slice, x1, y1, z);
		curfunc.getField(potfield, eps[0].pos);
		pots[i][j] = reverse*potfield[0];
	    }
	for (i = 0; i != grid; i++)
	    for (j = 0; j != grid; j++) {
		double x1 = i*gridmult-1;
		double y1 = j*gridmult-1;
		double x2 = (i+1)*gridmult-1;
		double y2 = (j+1)*gridmult-1;
		eps[0].set(coord1, coord2, slice, x1, y1, z);
		eps[1].set(coord1, coord2, slice, x2, y1, z);
		eps[2].set(coord1, coord2, slice, x1, y2, z);
		eps[3].set(coord1, coord2, slice, x2, y2, z);
		eps[0].setPot(pots[i  ][j  ]);
		eps[1].setPot(pots[i+1][j  ]);
		eps[2].setPot(pots[i  ][j+1]);
		eps[3].setPot(pots[i+1][j+1]);
		tryEdges(eps[0], eps[1], eps[2], eps[3]);
	    }
    }

    double max(double a, double b) { return a > b ? a : b; }
    double min(double a, double b) { return a < b ? a : b; }

    boolean shouldSubdivide(EquipPoint ep1, EquipPoint ep2, EquipPoint ep3,
			    EquipPoint ep4) {
	if (!ep1.inRange())
	    return true;
	if (!ep2.inRange())
	    return true;
	if (!ep3.inRange())
	    return true;
	if (!ep4.inRange())
	    return true;
	double pmin = min(min(ep1.pot, ep2.pot), min(ep3.pot, ep4.pot));
	double pmax = max(max(ep1.pot, ep2.pot), max(ep3.pot, ep4.pot));
	return (pmax-pmin) > .3;
    }

    void tryEdges(EquipPoint ep1, EquipPoint ep2, EquipPoint ep3,
		  EquipPoint ep4) {
	if (shouldSubdivide(ep1, ep2, ep3, ep4) && canSubdivide(ep1, ep2)) {
	    EquipPoint ep12 = new EquipPoint(ep1,  ep2);
	    EquipPoint ep13 = new EquipPoint(ep1,  ep3);
	    EquipPoint ep24 = new EquipPoint(ep2,  ep4);
	    EquipPoint ep34 = new EquipPoint(ep3,  ep4);
	    EquipPoint epc  = new EquipPoint(ep12, ep34);
	    tryEdges(ep1, ep12, ep13, epc);
	    tryEdges(ep12, ep2, epc, ep24);
	    tryEdges(ep13, epc, ep3, ep34);
	    tryEdges(epc, ep24, ep34, ep4);
	    return;
	}
	tryEdge(ep1, ep2, ep3, ep4);
	tryEdge(ep1, ep2, ep1, ep3);
	tryEdge(ep1, ep2, ep2, ep4);
	tryEdge(ep1, ep3, ep2, ep4);
	tryEdge(ep1, ep3, ep3, ep4);
	tryEdge(ep2, ep4, ep3, ep4);
    }

    boolean spanning(EquipPoint ep1, EquipPoint ep2, double pval) {
	if (ep1.pot == ep2.pot)
	    return false;
	if (!(ep1.valid() && ep2.valid()))
	    return false;
	return !((ep1.pot < pval && ep2.pot < pval) ||
		 (ep1.pot > pval && ep2.pot > pval));
    }

    void interpPoint(EquipPoint ep1, EquipPoint ep2, double pval,
		     double pos[]) {
	double interp2 = (pval-ep1.pot)/(ep2.pot-ep1.pot);
	double interp1 = 1-interp2;
	//System.out.print("I " + interp1 + " " + interp2 + "\n");
	//System.out.print(ep1.pot + " " + ep2.pot + " " + Double.isNaN(ep1.pot) + "\n");
	int i;
	for (i = 0; i != 3; i++)
	    pos[i] = ep1.pos[i]*interp1+ep2.pos[i]*interp2;
	//System.out.print("> " + pos[0] + " " + pos[1] + " " + pos[2] + "\n");
    }

    void tryEdge(EquipPoint ep1, EquipPoint ep2,
		 EquipPoint ep3, EquipPoint ep4) {
	int i;
	if (sliceChooser.getSelectedIndex() == SLICE_NONE) {
	    tryEdge(ep1, ep2, ep3, ep4, (potentialBar.getValue()-500)/500.);
	} else {
	    for (i = -20; i <= 20; i++)
		tryEdge(ep1, ep2, ep3, ep4, i/20.);
	}
    }

    void tryEdge(EquipPoint ep1, EquipPoint ep2,
		 EquipPoint ep3, EquipPoint ep4, double pval) {
	if (!(spanning(ep1, ep2, pval) && spanning(ep3, ep4, pval)))
	    return;

	if (vecCount == maxVectors)
	    return;
	FieldVector fv = vectors[vecCount];
	if (fv == null) {
	    fv = vectors[vecCount] = new FieldVector();
	    fv.p1 = new double[3];
	    fv.p2 = new double[3];
	}
	vecCount++;
	interpPoint(ep1, ep2, pval, fv.p1);
	interpPoint(ep3, ep4, pval, fv.p2);
	fv.col = 255+((int) (255*pval));
    }
//#endif /* BUILD_M */

    // draw the appropriate field vector at xx,yy,zz
    void drawVector(DrawData dd, double vec[]) {
	double field[] = dd.field;

	// calculate field vector
	curfunc.getField(field, vec);
	double dn = java.lang.Math.sqrt(field[0]*field[0]+field[1]*field[1]+
					field[2]*field[2]);
	double dnr = dn*reverse;
	if (dn > 0) {
	    field[0] /= dnr;
	    field[1] /= dnr;
	    field[2] /= dnr;
	}
	dn *= dd.mult;
	if (dn > 2)
	    dn = 2;
	int col = (int) (dn*255);
	double sw2 = 1./(vectorSpacing-1);
	map3d(vec[0], vec[1], vec[2], xpoints, ypoints, 0);
	double vv[] = dd.vv;
	vv[0] = vec[0] + sw2*field[0];
	vv[1] = vec[1] + sw2*field[1];
	vv[2] = vec[2] + sw2*field[2];
	map3d(vv[0], vv[1], vv[2], xpoints, ypoints, 1);
	FieldVector fv = vectors[vecCount];
	if (fv == null)
	    fv = vectors[vecCount] = new FieldVector();
	fv.sx1 = xpoints[0];
	fv.sy1 = ypoints[0];
	fv.sx2 = xpoints[1];
	fv.sy2 = ypoints[1];
	fv.col = col;
	vecCount++;
	int vp1 = curfunc.getViewPri(cameraPos, vec);
	if (!curfunc.noSplitFieldVectors())
	    fv.viewPri = vp1;
	else {
	    int vp2 = curfunc.getViewPri(cameraPos, vv);
	    fv.viewPri = (vp1 == vp2) ? vp1 : -1;
	}
    }

    void drawParticles(Graphics g) {
	int i;
	int pcount = getParticleCount();
	for (i = 0; i < pcount; i++) {
	    Particle pt = particles[i];
	    pt.viewPri = curfunc.getViewPri(cameraPos, pt.pos);
	}
	curfunc.render(g);
    }

    void moveParticles() {
	fieldStrength = strengthBar.getValue();
	int bestd = 0;
	int i;
	int pcount = getParticleCount();
	int slice = sliceChooser.getSelectedIndex();
	boolean sliced = (slice > 0);
	partMult = fieldStrength * reverse * timeStep;
	for (i = 0; i != pcount; i++) {
	    Particle pt = particles[i];
	    removeFromDensityGroup(pt);
	    moveParticle(pt);
	    double x[] = pt.pos;
	    if (!(x[0] >= -1 && x[0] < 1 &&
		  x[1] >= -1 && x[1] < 1 &&
		  x[2] >= -1 && x[2] < 1) ||
		(pt.lifetime -= timeStep) < 0) {
		positionParticle(pt);
	    }
	    if (sliced)
		x[slice-SLICE_X] = sliceval;
	    int d = addToDensityGroup(pt);
	    if (d > bestd)
		bestd = d;
	}
	boolean withforce =
	    (dispChooser.getSelectedIndex() == DISP_PART_FORCE);
	int maxd =  (10*getParticleCount()/(densitygridsize*densitygridsize*
					    densitygridsize));
	if (sliced)
	    maxd = 4*getParticleCount()/(densitygridsize*densitygridsize);
	if (!withforce && curfunc.redistribute() && bestd > maxd)
	    redistribute(bestd);
    }

    static int frames = 0;
    static int framerate = 0;
    static long firsttime = 0;

    // draw the cube containing the particles.  if drawAll is false then
    // we just draw faces that are facing the camera.  This routine draws
    // each edge twice which is unnecessary, but easier.
    void drawCube(Graphics g, boolean drawAll) {
	int i;
	int slice = sliceChooser.getSelectedIndex();
	int sp = (drawAll) ? 0 : 8;
	for (i = 0; i != 6; i++) {
	    // calculate normal of ith face
	    int nx = (i == 0) ? -1 : (i == 1) ? 1 : 0;
	    int ny = (i == 2) ? -1 : (i == 3) ? 1 : 0;
	    int nz = (i == 4) ? -1 : (i == 5) ? 1 : 0;
	    // if face is not facing camera, don't draw it
	    if (!drawAll && backFacing(nx, ny, nz, nx, ny, nz))
		continue;
	    double pts[];
	    pts = new double[3];
	    int n;
	    for (n = 0; n != 4; n++) {
		computeFace(i, n, pts);
		map3d(pts[0], pts[1], pts[2], xpoints, ypoints, n);
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
		      slicerPoints[0], slicerPoints[1], sp);
		computeFace(i, 2, pts);
		pts[slice-SLICE_X] = sliceval;
		map3d(pts[0], pts[1], pts[2],
		      slicerPoints[0], slicerPoints[1], sp+1);
		g.drawLine(slicerPoints[0][sp  ], slicerPoints[1][sp],
			   slicerPoints[0][sp+1], slicerPoints[1][sp+1]);
		if (drawAll) {
		    // we don't keep track of the sliceFaces and slicerPoints
		    // unless drawAll is true, because if it's false then
		    // we're not drawing all the faces of the cube and the
		    // numbering will get screwed up.  So if drawAll is
		    // false we just point sp to scratch space and don't
		    // bother storing the sliceFaces.
		    sliceFaces[sp/2][0] = nx;
		    sliceFaces[sp/2][1] = ny;
		    sliceFaces[sp/2][2] = nz;
		    sp += 2;
		}
	    }
	}
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

    void renderItems(Graphics g, int pri) {
	g.setColor(Color.white);
	int disp = dispChooser.getSelectedIndex();
	if (disp == DISP_VECTORS || disp == DISP_VECTORS_A) {
	    int i;
	    for (i = 0; i != vecCount; i++) {
		FieldVector fv = vectors[i];
		if (fv.viewPri != pri)
		    continue;
		g.setColor(fieldColors[fv.col]);
		drawArrow(g, null, fv.sx1, fv.sy1, fv.sx2, fv.sy2, 2);
	    }
	    return;
	}
	if (disp == DISP_LINES || disp == DISP_EQUIPS) {
	    int i;
	    g.setColor(Color.white);
	    Color colvec[] = (disp == DISP_EQUIPS) ? equipColors : fieldColors;
	    for (i = 0; i != vecCount; i++) {
		FieldVector fv = vectors[i];
		if (fv.viewPri != pri)
		    continue;
		if (fv.sx1 == fv.sx2 && fv.sy1 == fv.sy2)
		    continue;
		g.setColor(colvec[fv.col]);
		g.drawLine(fv.sx1, fv.sy1, fv.sx2, fv.sy2);
	    }
	    return;
	}
	int pcount = getParticleCount();
	int i;
	wooft += .3;
	for (i = 0; i < pcount; i++) {
	    Particle p = particles[i];
	    if (p.viewPri != pri)
		continue;
	    double pos[] = p.pos;
	    map3d(pos[0], pos[1], pos[2], xpoints, ypoints, 0);
	    if (xpoints[0] < 0 || xpoints[0] >= winSize.width ||
		ypoints[0] < 0 || ypoints[0] >= winSize.height)
		continue;
	    if (disp == DISP_PART_MAG) {
		double cosph = java.lang.Math.cos(p.phi);
		double sinph = java.lang.Math.sin(p.phi);
		double costh = java.lang.Math.cos(p.theta);
		double sinth = java.lang.Math.sin(p.theta);
		double al = .08;
		double rhatx = sinth*cosph*al;
		double rhaty = sinth*sinph*al;
		double rhatz = costh*al;
		map3d(pos[0]+rhatx, pos[1]+rhaty, pos[2]+rhatz,
		      xpoints, ypoints, 1);
		drawArrow(g, null, xpoints[0], ypoints[0],
			  xpoints[1], ypoints[1], 2);
	    } else
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

    boolean backFacing(double px, double py, double pz,
		       double nx, double ny, double nz) {
	double x = cameraPos[0]-px;
	double y = cameraPos[1]-py;
	double z = cameraPos[2]-pz;
	double d = x*nx+y*ny+z*nz;
	return d <= 0;
    }

    int intersectSphere(double cp[], double ptx, double pty, double ptz,
			double r) {
	return intersectSphere(cp, ptx, pty, ptz, 0, 0, 0, r);
    }

    // calculate intersection of a ray starting at the camera and going
    // through point (ptx,pty,ptz) with a sphere of radius 2 at the origin.
    // Returns 0 if there is no intersection before the ray hits the point,
    // 1 if the point is inside the sphere, and 2 if the point is behind
    // the sphere.
    int intersectSphere(double cp[], double ptx, double pty, double ptz,
			double sx, double sy, double sz, double r) {
	double vx = ptx-cp[0];
	double vy = pty-cp[1];
	double vz = ptz-cp[2];
	double qpx = cp[0]-sx;
	double qpy = cp[1]-sy;
	double qpz = cp[2]-sz;
	double a = vx*vx+vy*vy+vz*vz;
	double b = 2*(vx*qpx + vy*qpy + vz*qpz);
	double c = qpx*qpx + qpy*qpy + qpz*qpz - r*r;
	double discrim = b*b-4*a*c;
	if (discrim < 0)
	    return 0;
	discrim = java.lang.Math.sqrt(discrim);
	double b1 = (-b-discrim)/(2*a);
	double b2 = (-b+discrim)/(2*a);
	if (b1 < 1 && inViewBox(b1, cp, vx, vy, vz))
	    return (b2 < 1) ? 2 : 1;
	else
	    return 0;
    }

    // calculate intersection of a ray starting at the camera and going
    // through point (ptx,pty,ptz) with the plane z=a.  Returns 0 if there
    // is no intersection before the ray hits the point; otherwise 2.
    double intersectZPlane(double cp[], double a,
			   double ptx, double pty, double ptz) {
	double vx = ptx-cp[0];
	double vy = pty-cp[1];
	double vz = ptz-cp[2];
	double t = intersectionDistance = -(cp[2]+a)/vz;
	if (t > 1)
	    return 0;
	if (!inViewBox(t, cp, vx, vy, vz))
	    return 0;
	return 2;
    }

    // make sure the intersection is inside the viewing box
    boolean inViewBox(double t, double cp[], double vx, double vy, double vz) {
	if (t < 0)
	    return false;
	double ix = intersection[0] = cp[0]+vx*t;
	double iy = intersection[1] = cp[1]+vy*t;
	double iz = intersection[2] = cp[2]+vz*t;
	//System.out.print("ivb " + t + " " + ix + " " + iy + " " + iz + "\n");
	if (ix < -1 || ix > 1 || iy < -1 || iy > 1 ||
	    iz < -1 || iz > 1)
	    return false;
	return true;
    }

    int intersectCylinder(double cp[], double ptx, double pty, double ptz,
			  double r, boolean vbTest) {
	return intersectCylinder(cp, ptx, pty, ptz, 0, 0, r, vbTest);
    }

    // calculate intersection of a ray starting at the camera and
    // going through point (ptx,pty,ptz) with a cylinder of radius r
    // centered at the z axis.  Returns 0 if there is no intersection
    // before the ray hits the point, 1 if the point is inside the
    // cylinder, and 2 if the point is behind the cylinder.
    int intersectCylinder(double cp[], double ptx, double pty, double ptz,
			  double sx, double sy, double r, boolean vbTest) {
	double vx = ptx-cp[0];
	double vy = pty-cp[1];
	double qpx = cp[0]-sx;
	double qpy = cp[1]-sy;
	double a = vx*vx+vy*vy;
	double b = 2*(vx*qpx + vy*qpy);
	double c = qpx*qpx + qpy*qpy - r*r;
	double discrim = b*b-4*a*c;
	if (discrim < 0)
	    return 0;
	discrim = java.lang.Math.sqrt(discrim);
	double b1 = (-b-discrim)/(2*a);
	double b2 = (-b+discrim)/(2*a);
	//System.out.print(b1 + " " +b2 + "\n");

	// test if first intersection is behind point
	if (b1 > 1)
	    return 0;

	// if vbTest is true, check if intersection is inside box
	if (!vbTest || inViewBox(b1, cp, vx, vy, ptz-cp[2]))
	    // if the second intersection is between camera and point,
	    // the point is behind the cylinder.  Otherwise it's inside.
	    return (b2 < 1) ? 2 : 1;

	// If the second intersection is between camera and point,
	// the point is inside the cylinder.
	if (b2 > 1)
	    return 2;

	// If the second intersection is in the view box, the point
	// is behind the cylinder.
	if (inViewBox(b2, cp, vx, vy, ptz-cp[2]))
	    return 2;

	// otherwise there is no valid intersection.
	return 0;
    }

    int rediscount;
    void redistribute(int mostd) {
	if (mostd < 5)
	    return;
	rediscount++;
	int maxd = (10*getParticleCount()/
		    (densitygridsize*densitygridsize*densitygridsize));
	int i;
	int pn = 0;
	int pcount = getParticleCount();
	for (i = rediscount % 4; i < pcount; i+=4) {
	    Particle p = particles[i];
	    int a = (int)((p.pos[0]+1)*(densitygridsize/2));
	    int b = (int)((p.pos[1]+1)*(densitygridsize/2));
	    int c = (int)((p.pos[2]+1)*(densitygridsize/2));
	    if (density[a][b][c] <= maxd)
		continue;
	    p.lifetime = -1;
	    pn++;
	}
	//System.out.print("redist " + mostd + " " + pn + "\n");
    }

    static double distanceParticle(Particle p) {
	return distance3(p.pos[0], p.pos[1], p.pos[2]);
    }

    static double distanceArray(double y[]) {
	return distance3(y[0], y[1], y[2]);
    }

    static double distance3(double x, double y, double z) {
	return java.lang.Math.sqrt(x*x+y*y+z*z+.000000001);
    }

    static double distance2(double x, double y) {
	return java.lang.Math.sqrt(x*x+y*y+.000000001);
    }

    void rotateParticleAdd(double result[], double y[], double mult,
			double cx, double cy) { 
	result[0] += -mult*(y[1]-cy);
	result[1] +=  mult*(y[0]-cx);
	result[2] += 0;
    }

    void rotateParticle(double result[], double y[], double mult) {
	result[0] = -mult*y[1];
	result[1] =  mult*y[0];
	result[2] = 0;
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
    }

    public boolean handleEvent(Event ev) {
	if (ev.id == Event.WINDOW_DESTROY) {
	    applet.destroyFrame();
	    return true;
	}
	return super.handleEvent(ev);
    }
    
    public void adjustmentValueChanged(AdjustmentEvent e) {
	vectors = null;
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == partCountBar)
	    resetDensityGroups();
	cv.repaint(pause);
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	oldDragX = dragX;
	oldDragY = dragY;
	dragX = e.getX(); dragY = e.getY();
	int mode = modeChooser.getSelectedIndex();
	if (selectedSlice)
	    mode = MODE_SLICE;
	if (mode == MODE_ANGLE) {
	    int xo = oldDragX-dragX;
	    int yo = oldDragY-dragY;
	    rotate(lastXRot = xo/40., lastYRot = -yo/40.);
	    double lr = Math.sqrt(lastXRot*lastXRot + lastYRot*lastYRot);
	    if (lr > .06) {
		lr /= .06;
		lastXRot /= lr;
		lastYRot /= lr;
	    }
	    cv.repaint(pause);
	} else if (mode == MODE_ZOOM) {
	    int xo = dragX-dragStartX;
	    zoom = dragZoomStart + xo/20.;
	    if (zoom < .1)
		zoom = .1;
	    cv.repaint(pause);
	} else if (mode == MODE_SLICE) {
	    double x3[] = new double[3];
	    unmap3d(x3, dragX, dragY, sliceFace, sliceFace, viewMain);
	    switch (sliceChooser.getSelectedIndex()) {
	    case SLICE_X: sliceval = x3[0]; break;
	    case SLICE_Y: sliceval = x3[1]; break;
	    case SLICE_Z: sliceval = x3[2]; break;
	    }
	    // Avoid -1 because it causes particles to drift out of the
	    // cube too easily.  Avoid +1 because of that and because it is
	    // not included in any density group.
	    if (sliceval < -.99)
		sliceval = -.99;
	    if (sliceval > .99)
		sliceval = .99;
	    resetDensityGroups();
	    //System.out.print(sliceval + "\n");
	    cv.repaint(pause);
	    vectors = null;
	}
	
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
	for (n = 0; n != 8; n += 2) {
	    int xa = slicerPoints[0][n];
	    int xb = slicerPoints[0][n+1];
	    int ya = slicerPoints[1][n];
	    int yb = slicerPoints[1][n+1];
	    if (!csInRange(x, xa, xb) || !csInRange(y, ya, yb))
		continue;

	    double d;
	    if (xa == xb)
		d = java.lang.Math.abs(x-xa);
	    else {
		// write line as y=a+bx
		double b = (yb-ya)/(double) (xb-xa);
		double a = ya-b*xa;
		
		// solve for distance
		double d1 = y-(a+b*x);
		if (d1 < 0)
		    d1 = -d1;
		d = d1/java.lang.Math.sqrt(1+b*b);
	    }
	    if (d < 6) {
		selectedSlice = true;
		sliceFace = sliceFaces[n/2];
		break;
	    }
	}
    }

    public void mouseMoved(MouseEvent e) {
	dragX = e.getX(); dragY = e.getY();
	dragStartX = dragX;
	dragStartY = dragY;
	dragZoomStart = zoom;
	boolean ss = selectedSlice;
	checkSlice(dragX, dragY);
	if (ss != selectedSlice)
	    cv.repaint(pause);
    }
    public void mouseClicked(MouseEvent e) {
    }
    public void mouseEntered(MouseEvent e) {
    }
    public void mouseExited(MouseEvent e) {
    }
    public void mousePressed(MouseEvent e) {
	mouseMoved(e);
	mouseDown = true;
    }
    public void mouseReleased(MouseEvent e) {
	mouseDown = false;
    }

    void dispChooserChanged() {
	int disp = dispChooser.getSelectedIndex();
	showA = (disp == DISP_PART_VELOC_A || disp == DISP_VECTORS_A);
	getPot = (disp == DISP_EQUIPS);
	if (disp == DISP_PART_FORCE)
	    kickButton.enable();
	else
	    kickButton.disable();
	potentialLabel.hide();
	potentialBar.hide();
	vecDensityLabel.hide();
	vecDensityBar.hide();
	lineDensityLabel.hide();
	lineDensityBar.hide();
	partCountLabel.hide();
	partCountBar.hide();
	strengthLabel.show();
	strengthBar.show();
	if (disp == DISP_VECTORS || disp == DISP_VECTORS_A ||
	    disp == DISP_VIEW_PAPER) {
	    vecDensityLabel.show();
	    vecDensityBar.show();
	} else if (disp == DISP_LINES) {
	    lineDensityLabel.show();
	    lineDensityBar.show();
	} else if (disp == DISP_EQUIPS) {
	    potentialLabel.show();
	    potentialBar.show();
	} else {
	    partCountLabel.show();
	    partCountBar.show();
	}
	vecDensityLabel.setText(disp == DISP_VIEW_PAPER ?
				"Resolution" : "Vector Density");
	if (disp == DISP_EQUIPS) {
	    strengthLabel.hide();
	    strengthBar.hide();
	}
	if ((disp == DISP_VIEW_PAPER || disp == DISP_EQUIPS) &&
	      sliceChooser.getSelectedIndex() == SLICE_NONE) {
	    sliceChooser.select(curfunc.getBestSlice());
	    potentialBar.disable();
	}
	validate();
	resetParticles();
    }

    public void itemStateChanged(ItemEvent e) {
	if (!finished || ignoreChanges)
	    return;
	vectors = null;
	cv.repaint(pause);
	reverse = (reverseCheck.getState()) ? -1 : 1;
	if (e.getItemSelectable() == dispChooser) {
	    dispChooserChanged();
	    resetParticles();
	}
	if (e.getItemSelectable() == sliceChooser) {
	    resetParticles();
	    if (modeChooser.getSelectedIndex() == MODE_SLICE)
		modeChooser.select(MODE_ANGLE);
	    if (sliceChooser.getSelectedIndex() == SLICE_NONE)
		potentialBar.enable();
	    else
		potentialBar.disable();
	}
	if (e.getStateChange() != ItemEvent.SELECTED)
	    return;
	if (e.getItemSelectable() == functionChooser)
	    functionChanged();
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
	    textFields[i].hide();
	    if (textFieldLabel != null)
		textFieldLabel.hide();
	}
	strengthBar.setValue(20);
	int x = dispChooser.getSelectedIndex();
	setupDispChooser(!curfunc.nonGradient());
	ignoreChanges = true;
	try {
	    if (x >= 0)
		dispChooser.select(x);
	} catch (Exception e) { }
	ignoreChanges = false;
	curfunc.setup();
	sliceChooser.select(SLICE_NONE);
	validate();
	resetParticles();
	dispChooserChanged();
    }

    // swing calls itemStateChanged when we programmatically change the choosers; we need to suppress that
    boolean ignoreChanges = false;
    
    void setupDispChooser(boolean potential) {
	ignoreChanges = true;
	dispChooser.removeAllItems();
	dispChooser.add("Display: Particles (Vel.)");
	if (BUILD_M) {
	    dispChooser.add("Display: Parts (A Field, Vel.)");
	    dispChooser.add("Display: Field Vectors");
	    dispChooser.add("Display: Field Vectors (A)");
	} else {
	    dispChooser.add("Display: Particles (Force)");
	    dispChooser.add("Display: Field Vectors");
	}
	if (BUILD_V)
	    dispChooser.add("Display: Streamlines");
	else
	    dispChooser.add("Display: Field Lines");
	if (BUILD_M) {
	    dispChooser.add("Display: Parts (Magnetic)");
	    dispChooser.add("Display: Mag View Film");
	} else {
	    if (potential) 
		dispChooser.add("Display: Equipotentials");
	}
	ignoreChanges = false;
    }

    void setupBar(int n, String text, int val) {
	auxBars[n].label.setText(text);
	auxBars[n].label.show();
	auxBars[n].bar.setValue(val);
	auxBars[n].bar.show();
    }

    boolean useMagnetMove() {
	int disp = dispChooser.getSelectedIndex();
	return (disp == DISP_PART_MAG);
    }

    MagnetState mstates[];

    void magneticMoveParticle(Particle p) {
	int i;
	if (mstates == null) {
	    mstates = new MagnetState[3];
	    for (i = 0; i != 3; i++)
		mstates[i] = new MagnetState();
	}
	MagnetState ms     = mstates[0];
	MagnetState mshalf = mstates[1];
	MagnetState oldms  = mstates[2];
	for (i = 0; i != 3; i++) {
	    ms.pos[i] = p.pos[i];
	    ms.vel[i] = p.vel[i];
	    ms.theta  = p.theta;
	    ms.thetav = p.thetav;
	    ms.phi    = p.phi;
	    ms.phiv   = p.phiv;
	}
	mshalf.copy(ms);
	oldms.copy(ms);
	
	double h = 1;
	final double minh = .01;
	final double maxh = 1;
	final double E = .1;
	int steps = 0;
	boolean adapt = curfunc.useAdaptiveRungeKutta() &&
	    curfunc.useRungeKutta();
	boundCheck = false;

	double t = 0;
	while (t < 1) {
	    // estimate one full step
	    magnetMove(ms, h);
	    if (boundCheck) {
		p.pos[0] = -100;
		return;
	    }
	    if (curfunc.checkBounds(ms.pos, oldms.pos)) {
		p.pos[0] = -100;
		return;
	    }
	    
	    if (!adapt)
		break;

	    // estimate two half steps
	    magnetMove(mshalf, h*.5);
	    magnetMove(mshalf, h*.5);
	    
	    // estimate the local error
	    double localError =
		java.lang.Math.abs(ms.pos[0] - mshalf.pos[0]) +
		java.lang.Math.abs(ms.pos[1] - mshalf.pos[1]) +
		java.lang.Math.abs(ms.pos[2] - mshalf.pos[2]) +
		java.lang.Math.abs(ms.theta  - mshalf.theta) +
		java.lang.Math.abs(ms.phi    - mshalf.phi);
	    
	    if (localError > E && h > minh) {
		h *= 0.75; // decrease the step size
		if (h < minh)
		    h = minh;
		ms.copy(oldms);
		continue;
	    } else if (localError < (E * 0.5)) {
		h *= 1.25; // increase the step size
		if (h > maxh)
		    h = maxh;
	    }
	    
	    mshalf.copy(ms);
	    t += h;
	    steps++;
	}

	/*if (steps > 1)
	  System.out.print(steps + "\n");*/
	for (i = 0; i != 3; i++) {
	    p.pos[i]  = ms.pos[i];
	    p.vel[i]  = ms.vel[i];
	    p.theta   = ms.theta;
	    p.thetav  = ms.thetav;
	    p.phi     = ms.phi;
	    p.phiv    = ms.phiv;
	}
    }

    void magnetMove(MagnetState ms, double stepsize) {
	double cosph = java.lang.Math.cos(ms.phi);
	double sinph = java.lang.Math.sin(ms.phi);
	double costh = java.lang.Math.cos(ms.theta);
	double sinth = java.lang.Math.sin(ms.theta);
	// rhat  = (sinth*cosph, sinth*sinph, costh)
	// thhat = (costh*cosph, costh*sinph, -sinth)
	// phhat = (-sinph, cosph, 0)
	// These three vectors are always perpendicular and rhat X
	// thhat = phhat.  The particle's arrow points in the
	// direction of rhat, so the points p.pos + thhat, p.pos +
	// phhat, p.pos - tthat, p.pos - phhat are the four points we
	// sample on the current loop (if we pretend that each
	// particle has a current loop which goes around the arrow)
	double thhat[]  = new double[3];
	double phhat[]  = new double[3];
	double thhatn[] = new double[3];
	double phhatn[] = new double[3];
	double force[]  = new double[3];
	double torque[]  = new double[3];
	thhat[0] = costh*cosph; thhat[1] = costh*sinph; thhat[2] = -sinth;
	phhat[0] = -sinph;      phhat[1] = cosph;       phhat[2] = 0;
	int i;
	for (i = 0; i != 3; i++) {
	    thhatn[i] = -thhat[i];
	    phhatn[i] = -phhat[i];
	    force[i] = torque[i] = 0;
	}
	getMagForce(ms.pos, thhat,  phhat,  force, torque);
	getMagForce(ms.pos, phhat,  thhatn, force, torque);
	getMagForce(ms.pos, thhatn, phhatn, force, torque);
	getMagForce(ms.pos, phhatn, thhat,  force, torque);
	for (i = 0; i != 3; i++) {
	    ms.vel[i] += force[i]*stepsize;
	    ms.pos[i] += ms.vel[i]*stepsize;
	}
	// turning about the phhat axis causes theta to change.
	ms.thetav += dot(torque, phhat)*1000*stepsize;
	// turning about the z axis causes phi to change.
	ms.phiv   += torque[2]*1000*stepsize; // torque . zhat

	// heavily damp the oscillation of the magnets
	ms.thetav *= java.lang.Math.exp(-.2*stepsize);
	ms.phiv   *= java.lang.Math.exp(-.2*stepsize);

	ms.theta  += ms.thetav*stepsize;
	ms.phi    += ms.phiv*stepsize;
    }

    void getMagForce(double pos[], double off[], double j[], double f[],
		     double torque[]) {
	int i;
	double offs[] = new double[3];
	for (i = 0; i != 3; i++) {
	    offs[i] = off[i] * .02;
	    rk_yn[i] = pos[i] + offs[i];
	}
	curfunc.getField(rk_k1, rk_yn);
	double fmult = reverse * strengthBar.getValue();
	for (i = 0; i != 3; i++)
	    rk_k1[i] *= fmult;
	double newf[] = new double[3];
	double newtorque[] = new double[3];
	cross(newf, j, rk_k1);
	cross(newtorque, offs, newf);
	for (i = 0; i != 3; i++) {
	    f[i] += newf[i];
	    torque[i] += newtorque[i];
	}
    }

    class MagnetState {
	MagnetState() { pos = new double[3]; vel = new double[3]; }
	double pos[], vel[], theta, phi, thetav, phiv;
	void copy(MagnetState ms) {
	    int i;
	    for (i = 0; i != 3; i++) {
		pos[i]  = ms.pos[i];
		vel[i]  = ms.vel[i];
		theta   = ms.theta;
		thetav  = ms.thetav;
		phi     = ms.phi;
		phiv    = ms.phiv;
	    }
	}
    };

    void cross(double res[], double v1[], double v2[]) {
	res[0] = v1[1]*v2[2] - v1[2]*v2[1];
	res[1] = v1[2]*v2[0] - v1[0]*v2[2];
	res[2] = v1[0]*v2[1] - v1[1]*v2[0];
    }

    double dot(double v1[], double v2[]) {
	return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
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

	if (order == 3) {
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
	}
    }

    void getForceField(double result[], double y[],
		       double stepsize, double fmult) {
	// get the field vector for the current function
	curfunc.getField(result, y);
	
	// the field data has been written into result[0:2] where it will
	// directly influence the position (y[0:2]), but we want it to
	// influence the velocity (y[3:5]), so we move it.  In the
	// process, we multiply by fmult (to get the reverse button
	// and field strength slider to work).  It would be nice if we
	// could just say getField(result+3, y), but that's java for you.
	int i;
	for (i = 0; i != 3; i++)
	    result[i+3] = .1*fmult*result[i];

	// here we fill in result[0:2] so that the particle position will
	// change according to the velocity.
	for (i = 0; i != 3; i++)
	    result[i] = stepsize*timeStep*rk_yn[i+3];
    }

    double rk_Y[] = new double[6];
    double rk_Yhalf[] = new double[6];
    double rk_oldY[] = new double[6];
    double ls_fieldavg[] = new double[3];

    void moveParticle(Particle p)
    {
	int disp = dispChooser.getSelectedIndex();
	if (disp == DISP_PART_MAG) {
	    magneticMoveParticle(p);
	    return;
	}

	int numIter=0;
	double maxh=1;
	double error=0.0, E = .001, localError;
	boolean useForce = (disp == DISP_PART_FORCE);
	int order = useForce ? 6 : 3;
	double Y[] = rk_Y;
	double Yhalf[] = rk_Yhalf;
	oldY = rk_oldY;
	int i;

	for (i = 0; i != 3; i++)
	    oldY[i] = Y[i] = Yhalf[i] = p.pos[i];
	if (useForce)
	    for (i = 0; i != 3; i++)
		Y[i+3] = Yhalf[i+3] = p.vel[i];
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
		for (i = 0; i != 3; i++) {
		    p.vel[i] += fmult*Yhalf[i];
		    p.pos[i] += timeStep*p.vel[i];
		}
	    } else {
		for (i = 0; i != 3; i++)
		    p.pos[i] += fmult*Yhalf[i];
	    }
	    for (i = 0; i != 3; i++)
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
		java.lang.Math.abs(Y[1] - Yhalf[1]) +
		java.lang.Math.abs(Y[2] - Yhalf[2]);
	    
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
	    for (i = 0; i != 3; i++)
		p.vel[i] = Y[i+3];
	}
    }

    double dist2(double a[], double b[]) {
	double c0 = a[0]-b[0];
	double c1 = a[1]-b[1];
	double c2 = a[2]-b[2];
	return c0*c0+c1*c1+c2*c2;
    }

    void lineSegment(Particle p, int dir)
    {
	int numIter=0;
	double maxh=20;
	double error=0.0, E = .001, localError;
	int order = 3;
	double Y[] = rk_Y;
	double Yhalf[] = rk_Yhalf;
	oldY = rk_oldY;
	int i;
	int slice = sliceChooser.getSelectedIndex();
	boolean sliced = (slice > 0);
	slice -= SLICE_X;

	for (i = 0; i != 3; i++)
	    oldY[i] = Y[i] = Yhalf[i] = p.pos[i];
	double h = p.stepsize;
	ls_fieldavg[0] = ls_fieldavg[1] = ls_fieldavg[2] = 0;

	int steps = 0;
	double minh = .1;
	double segSize2min = .04*.04;
	double segSize2max = .08*.08;
	double lastd = 0;
	int avgct = 0;
	while (true) {
	    boundCheck = false;
	    steps++;
	    if (steps > 100) {
		//System.out.print("maxsteps\n");
		p.lifetime = -1;
		break;
	    }
	    //System.out.print(h + " " + boundCheck + "/\n");

	    // estimate one full step
	    rk(order, 0, Y, dir*h);

	    // estimate two half steps
	    rk(order, 0, Yhalf, dir*h*0.5);
	    rk(order, 0, Yhalf, dir*h*0.5);

	    if (sliced)
		Y[slice] = Yhalf[slice] = sliceval;

	    //System.out.print(h + " " + boundCheck + "\n");
	    if (boundCheck) {
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		h /= 2;
		if (h < minh) {
		    p.lifetime = -1;
		    break;
		}
		continue;
	    }
	    if (Y[0] < -1 || Y[0] >= .999 ||
		Y[1] < -1 || Y[1] >= .999 ||
		Y[2] < -1 || Y[2] >= .999) {
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		h /= 2;
		if (h < minh) {
		    //System.out.print("bound1\n");
		    p.lifetime = -1;
		    break;
		}
		continue;
	    }

	    // estimate the local error
	    localError = java.lang.Math.abs(Y[0] - Yhalf[0]) +
		java.lang.Math.abs(Y[1] - Yhalf[1]) +
		java.lang.Math.abs(Y[2] - Yhalf[2]);
	    
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
		break;
	    }
	    if (d > segSize2max) {
		h /= 2;
		if (h < minh)
		    break;
		for (i = 0; i != order; i++)
		    Y[i] = Yhalf[i] = oldY[i]; 
		continue;
	    }
	    ls_fieldavg[0] += rk_k1[0];
	    ls_fieldavg[1] += rk_k1[1];
	    ls_fieldavg[2] += rk_k1[2];
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
				    ls_fieldavg[1]*ls_fieldavg[1]+
				    ls_fieldavg[2]*ls_fieldavg[2])/avgct;
    }
    
    abstract class VecFunction {
	abstract String getName();
	abstract VecFunction createNext();
	boolean nonGradient() { return false; }
	boolean useRungeKutta() { return true; }
	boolean useAdaptiveRungeKutta() { return true; }
	boolean checkBoundsWithForce() { return true; }
	boolean noSplitFieldVectors() { return true; }
	int getViewPri(double cameraPos[], double pos[]) {
	    return 0;
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	}
	boolean checkBounds(double y[], double oldY[]) { return false; }
	abstract void getField(double result[], double y[]);
	boolean redistribute() { return true; }
	void setup() {}
	void setupFrame() {}
	void finishFrame() {}
	void actionPerformed() {}

	int getBestSlice() {
	    double y[] = new double[3];
	    double r1[] = new double[3];
	    double r2[] = new double[3];
	    double r3[] = new double[3];
	    y[0] = y[1] = y[2] = .9;
	    curfunc.getField(r1, y);
	    y[0] = .91;
	    curfunc.getField(r2, y);
	    y[0] = .9; y[1] = .91;
	    curfunc.getField(r3, y);
	    if (r1[0] == r2[0] && r1[1] == r2[1] && r1[2] == r2[2])
		return SLICE_X;
	    if (r1[0] == r3[0] && r1[1] == r3[1] && r1[2] == r3[2])
		return SLICE_Y;
	    return SLICE_Z;
	}

	void renderSphere(Graphics g, double sz) {
	    // draw particles behind sphere
	    renderItems(g, 2);

	    // draw back lines of sphere
	    g.setColor(darkYellow);
	    drawSphere(g, sz, true);

	    // draw parts inside sphere
	    renderItems(g, 1);

	    // draw front lines of sphere
	    g.setColor(darkYellow);
	    map3d(0, 0, 0, xpoints, ypoints, 0);
	    int r = (int) (getScalingFactor(0, 0, 0) * sz);
	    g.drawOval(xpoints[0]-r, ypoints[0]-r, r*2, r*2);
	    drawSphere(g, sz, false);

	    // draw rest of particles
	    renderItems(g, 0);
	}
    };

    class InverseSquaredRadial extends VecFunction {
	String getName() { return BUILD_CASE_EMV("point charge",
						 null, "1/r^2 single"); }
	void getField(double result[], double y[]) {
	    double r = distanceArray(y);
	    if (r < chargeSize)
		boundCheck = true;
	    if (getPot) {
		result[0] = -.1/r;
		return;
	    }
	    double r3 = r*r*r;
	    double q = .0003/r3;
	    result[0] = -y[0]*q;
	    result[1] = -y[1]*q;
	    result[2] = -y[2]*q;
	}

	static final double chargeSize = .06;

	void drawCharge(Graphics g, double x, double y, double z) {
	    drawCharge(g, x, y, z, 0);
	}

	void drawCharge(Graphics g, double x, double y, double z, int dir) {
	    map3d(x, y, z,    xpoints, ypoints, 0);
	    map3d(x, y, z+.3*dir*reverse, xpoints, ypoints, 1);
	    g.setColor(darkYellow);
	    int r = (int) (getScalingFactor(x, y, z) * chargeSize);
	    g.fillOval(xpoints[0]-r, ypoints[0]-r, r*2, r*2);
	    if (dir != 0)
		drawArrow(g, null, xpoints[0], ypoints[0],
			  xpoints[1], ypoints[1], 5);
	}

	void render(Graphics g) {
	    drawCharge(g, 0, 0, 0);
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    int i;
	    i = intersectSphere(cameraPos, x[0], x[1], x[2], chargeSize);
	    if (i == 0)
		return 1;
	    if (i == 1)
		return -1;
	    return 0;
	}
	VecFunction createNext() { return new InverseSquaredRadialDouble(); }
    };

    class InverseSquaredRadialDouble extends InverseSquaredRadial {
	String getName() { return BUILD_CASE_EMV("point charge double", null,
						 "1/r^2 double"); }
	double sign2;
	int getBestSlice() { return SLICE_Y; }
	void getField(double result[], double y[]) {
	    double sep = aux1Bar.getValue()/100.;
	    double xx1 = y[0]-sep;
	    double xx2 = y[0]+sep;
	    double r1 = distance3(xx1, y[1], y[2]);
	    if (r1 < chargeSize)
		boundCheck = true;
	    double r2 = distance3(xx2, y[1], y[2]);
	    if (r2 < chargeSize)
		boundCheck = true;
	    if (getPot) {
		result[0] = -.05/r1 - .05*sign2/r2;
		if (sign2 == -1)
		    result[0] *= 2;
		return;
	    }
	    double q = .0003;
	    double rq1 = q/(r1*r1*r1);
	    double rq2 = q/(r2*r2*r2) * sign2;
	    result[0] = -xx1 *rq1-xx2 *rq2;
	    result[1] = -y[1]*rq1-y[1]*rq2;
	    result[2] = -y[2]*rq1-y[2]*rq2;
	}
	void setup() {
	    setXZView();
	    sign2 = 1;
	    setupBar(0, "Charge Separation", 30);
	}
	void render(Graphics g) {
	    double sep = aux1Bar.getValue()/100.;
	    drawCharge(g, +sep, 0, 0);
	    drawCharge(g, -sep, 0, 0);
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    double sep = aux1Bar.getValue()/100.;
	    if (intersectSphere(cameraPos, x[0], x[1], x[2],
				+sep, 0, 0, chargeSize)== 0 &&
		intersectSphere(cameraPos, x[0], x[1], x[2],
				-sep, 0, 0, chargeSize) == 0)
		return 1;
	    return 0;
	}
	VecFunction createNext() { return
	    BUILD_CASE_EMV(new InverseSquaredRadialDipole(),
			   null, new InverseRadial()); }
    };

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
	    double sep = aux1Bar.getValue()/100.;
	    double xx1 = y[0] - sep;
	    double xx2 = y[0] + sep;
	    double yy1 = y[1] - sep;
	    double yy2 = y[1] + sep;
	    double zz  = y[2];
	    double r1 = distance3(xx1, yy1, zz);
	    double r2 = distance3(xx2, yy1, zz);
	    double r3 = distance3(xx1, yy2, zz);
	    double r4 = distance3(xx2, yy2, zz);
	    if (r1 < chargeSize || r2 < chargeSize ||
		r3 < chargeSize || r4 < chargeSize)
		boundCheck = true;
	    if (getPot) {
		result[0] = .05*(-1/r1+1/r2+1/r3-1/r4);
		return;
	    }
	    double q = .0003;
	    double rq1 = q/(r1*r1*r1);
	    double rq2 = q/(r2*r2*r2);
	    double rq3 = q/(r3*r3*r3);
	    double rq4 = q/(r4*r4*r4);
	    result[0] = -xx1*rq1-xx2*rq4+xx2*rq2+xx1*rq3;
	    result[1] = -yy1*rq1-yy2*rq4+yy1*rq2+yy2*rq3;
	    result[2] = -zz *rq1-zz *rq4+zz *rq2+zz *rq3;
	}
	void setup() {
	    super.setup();
	    setupBar(0, "Charge Separation", 30);
	    setXYViewExact();
	}
	void render(Graphics g) {
	    double sep = aux1Bar.getValue()/100.;
	    int i, j;
	    for (i = -1; i <= 1; i += 2)
		for (j = -1; j <= 1; j += 2)
		    drawCharge(g, i*sep, j*sep, 0);
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    double sep = aux1Bar.getValue()/100.;
	    int i, j;
	    for (i = -1; i <= 1; i += 2)
		for (j = -1; j <= 1; j += 2)
		    if (intersectSphere(cameraPos, x[0], x[1], x[2],
					i*sep, j*sep, 0, .06) != 0)
			return 0;
	    return 1;
	}
	VecFunction createNext() { return new InverseRadial(); }
    };
    class InverseRadial extends VecFunction {
	double lineLen;
	String getName() { return BUILD_CASE_EMV("charged line",
						 null, "1/r single line"); }
	void getField(double result[], double y[]) {
	    double r = distance2(y[0], y[1]);
	    if (r < lineWidth)
		boundCheck = true;
	    if (getPot) {
		result[0] = .4*java.lang.Math.log(r+1e-20);
		return;
	    }
	    double r2 = r*r;
	    result[0] = -.0003*y[0]/r2;
	    result[1] = -.0003*y[1]/r2;
	    result[2] = 0;
	}
	void setup() {
	    setXZView();
	    lineLen = 1;
	}
	void render(Graphics g) {
	    g.setColor(darkYellow);
	    map3d(0, 0, -lineLen, xpoints, ypoints, 0);
	    map3d(0, 0, +lineLen, xpoints, ypoints, 1);
	    g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectCylinder(cameraPos, x[0], x[1], x[2], lineWidth,
				  true) == 0)
		return 1;
	    if (intersection[2] >= -lineLen && intersection[2] <= lineLen)
		return 0;
	    return 1;
	}
	VecFunction createNext() { return new InverseRadialDouble(); }
    };

    class InverseRadialDouble extends VecFunction {
	InverseRadialDouble() { sign = 1; }
	String getName() { return BUILD_CASE_EMV("line charge double",
						 null, "1/r double lines"); }
	double sign;
	void getField(double result[], double y[]) {
	    double sep = aux1Bar.getValue()/100.;
	    double xx1 = y[0] - sep;
	    double xx2 = y[0] + sep;
	    double r1 = distance2(xx1, y[1]);
	    double r2 = distance2(xx2, y[1]);
	    if (r1 < lineWidth || r2 < lineWidth)
		boundCheck = true;
	    if (getPot) {
		result[0] = .2*(java.lang.Math.log(r1+1e-20)+
				sign*java.lang.Math.log(r2+1e-20));
		return;
	    }
	    double q = .0003;
	    double r1s = 1/(r1*r1);
	    double r2s = 1/(r2*r2*sign);
	    result[0] = q*(-xx1 *r1s-xx2 *r2s);
	    result[1] = q*(-y[1]*r1s-y[1]*r2s);
	    result[2] = 0;
	}
	void setup() {
	    setupBar(0, "Line Separation", 30);
	    setXZView();
	}
	void render(Graphics g) {
	    double sep = aux1Bar.getValue()/100.;
	    g.setColor(darkYellow);
	    int i;
	    for (i = -1; i <= 1; i += 2) {
		map3d(sep*i, 0, -1, xpoints, ypoints, 0);
		map3d(sep*i, 0, +1, xpoints, ypoints, 1);
		g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    }
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    int i;
	    double sep = aux1Bar.getValue()/100.;
	    for (i = -1; i <= 1; i += 2) {
		if (intersectCylinder(cameraPos, x[0], x[1], x[2],
				      i*sep, 0, lineWidth, true) != 0)
		    return 0;
	    }
	    return 1;
	}
	VecFunction createNext() { return
	    BUILD_CASE_EMV(new InverseRadialDipole(), null,
			   new InverseRotational()); }
    };

    class InverseRadialDipole extends InverseRadialDouble {
	InverseRadialDipole() { sign = -1; }
	String getName() { return "dipole lines"; }
	VecFunction createNext() { return new InverseRadialQuad(); }
    };

    class InverseRadialQuad extends VecFunction {
	String getName() { return "quad lines"; }
	void getField(double result[], double y[]) {
	    double sep = aux1Bar.getValue()/100.;
	    double xx1 = y[0] + sep;
	    double xx2 = y[0] - sep;
	    double yy1 = y[1] + sep;
	    double yy2 = y[1] - sep;
	    double r1 = distance2(xx1, yy1);
	    double r2 = distance2(xx2, yy1);
	    double r3 = distance2(xx1, yy2);
	    double r4 = distance2(xx2, yy2);
	    if (r1 < lineWidth || r2 < lineWidth ||
		r3 < lineWidth || r4 < lineWidth)
		boundCheck = true;
	    if (getPot) {
		result[0] = .2*(+java.lang.Math.log(r1+1e-20)
				-java.lang.Math.log(r2+1e-20)
				-java.lang.Math.log(r3+1e-20)
				+java.lang.Math.log(r4+1e-20));
		return;
	    }
	    double q = .0003;
	    result[0] = q*(-xx1/(r1*r1)-xx2/(r4*r4) +xx2/(r2*r2)+xx1/(r3*r3));
	    result[1] = q*(-yy1/(r1*r1)-yy2/(r4*r4) +yy1/(r2*r2)+yy2/(r3*r3));
	    result[2] = 0;
	}
	void setup() {
	    setupBar(0, "Line Separation", 30);
	    setXYViewExact();
	}
	void render(Graphics g) {
	    double sep = aux1Bar.getValue()/100.;
	    g.setColor(darkYellow);
	    int i, j;
	    for (i = -1; i <= 1; i += 2) {
		for (j = -1; j <= 1; j += 2) {
		    map3d(sep*i, sep*j, -1, xpoints, ypoints, 0);
		    map3d(sep*i, sep*j, +1, xpoints, ypoints, 1);
		    g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
		}
	    }
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    int i, j;
	    double sep = aux1Bar.getValue()/100.;
	    for (i = -1; i <= 1; i += 2) {
		for (j = -1; j <= 1; j += 2) {
		    if (intersectCylinder(cameraPos, x[0], x[1],
					  x[2], i*sep, j*sep, .01, true) != 0)
			return 0;
		}
	    }
	    return 1;
	}
	VecFunction createNext() { return new FiniteChargedLine(); }
    };

    class FiniteChargedLine extends InverseRadial {
	String getName() { return "finite line"; }
	void setup() {
	    setXZView();
	    setupBar(0, "Line Length", 30);
	}
	void setupFrame() {
	    lineLen = (aux1Bar.getValue()+1) / 101.;
	}
	void getField(double result[], double y[]) {
	    result[0] = result[1] = result[2] = 0;
	    getLineField(result, y, 0);
	}
	void getLineField(double result[], double y[], double off) {
	    double a1 = -lineLen-y[2];
	    double a2 =  lineLen-y[2];
	    double r = distance2(y[0]-off, y[1]);
	    if (r < lineWidth && a1 <= 0 && a2 >= 0) 
		boundCheck = true;
	    double y2 = r*r;
	    double a12 = a1*a1;
	    double a22 = a2*a2;
	    double a12y2 = java.lang.Math.sqrt(a12+y2);
	    double a22y2 = java.lang.Math.sqrt(a22+y2);
	    if (getPot) {
		result[0] -= .2*java.lang.Math.log((a2+a22y2)/(a1+a12y2));
		return;
	    }
	    double q = .0001/lineLen;
	    double fth =
		q* (-1/(a12+y2+a1*a12y2)+1/(a22+y2+a2*a22y2));
	    result[0] += fth*(y[0]-off);
	    result[1] += fth*y[1];
	    result[2] += q*(1/a12y2 - 1/a22y2);
	}
	VecFunction createNext() { return new FiniteChargedLinePair(); }
    };

    class FiniteChargedLinePair extends FiniteChargedLine {
	double dipole;
	FiniteChargedLinePair() { dipole = 1; }
	String getName() { return "finite line pair"; }
	void setup() {
	    setXZView();
	    setupBar(0, "Line Length", 30);
	    setupBar(1, "Line Separation", 30);
	}
	void setupFrame() {
	    lineLen = (aux1Bar.getValue()+1) / 101.;
	}
	void getField(double result[], double y[]) {
	    double sep = aux2Bar.getValue()/100.;
	    result[0] = result[1] = result[2] = 0;
	    getLineField(result, y, +sep);
	    result[0] *= dipole;
	    result[1] *= dipole;
	    result[2] *= dipole;
	    getLineField(result, y, -sep);
	}
	void render(Graphics g) {
	    double sep = aux2Bar.getValue()/100.;
	    g.setColor(darkYellow);
	    int i;
	    for (i = -1; i <= 1; i += 2) {
		map3d(sep*i, 0, -lineLen, xpoints, ypoints, 0);
		map3d(sep*i, 0, +lineLen, xpoints, ypoints, 1);
		g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    }
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    int i;
	    double sep = aux2Bar.getValue()/100.;
	    for (i = -1; i <= 1; i += 2) {
		if (intersectCylinder(cameraPos, x[0], x[1], x[2],
				      i*sep, 0, lineWidth, true) != 0)
		    if (intersection[2] >= -lineLen &&
			  intersection[2] <= lineLen)
			return 0;
	    }
	    return 1;
	}
	VecFunction createNext() { return new FiniteChargedLineDipole(); }
    };

    class FiniteChargedLineDipole extends FiniteChargedLinePair {
	FiniteChargedLineDipole() { dipole = -1; }
	String getName() { return "finite line dipole"; }
	VecFunction createNext() { return new ConductingPlate(); }
    };

    class ConductingPlate extends VecFunction {
	String getName() { return "conducting plate"; }
	Complex z;
	boolean plate;
	double a;
	ConductingPlate() {
	    z = new Complex();
	    plate = true;
	}
	void setupFrame() {
	    a = (aux1Bar.getValue()+1)/100.;
	}
	void getField(double result[], double y[]) {
	    // smythe p89
	    if (y[2] >= -.02 && y[2] <= .02) {
		if ((plate  && y[0] >= -a && y[0] <= a) ||
		    (!plate && (y[0] >= a || y[0] <= -a)))
		boundCheck = true;
	    }
	    z.setReIm(y[0]/a, y[2]/a);
	    if (y[2] < 0 && plate)
		z.im = -z.im;
	    if (getPot) {
		z.arcsin();
		result[0] = (plate) ? z.im*.6*a : -z.re*.6;
		return;
	    }
	    // here we calculate ((1-(z/a)^2)^(-1/2))/a, which is
	    // d/dz arcsin(z/a)
	    z.square();
	    z.multRe(-1);
	    z.addRe(1);
	    z.pow(-.5);
	    z.multRe(1/a);
	    if (plate) {
		// field = (Im dw/dz, Re dw/dz)
		result[2] = z.re * -.0007;
		result[0] = z.im * -.0007;
		if (y[2] < 0)
		    result[2] = -result[2];
	    } else {
		// field = (Re dw/dz, -Im dw/dz)
		result[0] = z.re * .0007;
		result[2] = -z.im * .0007;
	    }
	    result[1] = 0;
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectZPlane(cameraPos, 0, x[0], x[1], x[2]) != 0) {
		if (intersection[0] >= -a && intersection[0] <= a)
		    return 1;
	    }
	    return 0;
	}
	void render(Graphics g) {
	    drawPlane(g, a, 1, 0);
	    renderItems(g, 0);
	}
	void setup() {
	    setupBar(0, "Plate Size", 60);
	    setXZView();
	}
	VecFunction createNext() { return new ChargedPlate(); }
    };
    class ChargedPlate extends ConductingPlate {
	Complex cz;
	ChargedPlate() { cz = new Complex(); }
	String getName() { return "charged plate"; }
	double getPot(double a1, double a2, double y) {
	    cz.setReIm (y, -a1);
	    cz.multReIm(y,  a2);
	    cz.log();
	    double b1 = cz.im;
	    cz.setReIm (y,  a1);
	    cz.multReIm(y, -a2);
	    cz.log();
	    double y2 = y*y;
	    return .2*(2*(a1-a2) + (b1-cz.im)*y +
		       a2*java.lang.Math.log(a2*a2+y2) -
		       a1*java.lang.Math.log(a1*a1+y2));
	}
	void getField(double result[], double y[]) {
	    if (y[2] >= -.01 && y[2] <= .01 &&
		(y[0] >= -a && y[0] <= a))
		boundCheck = true;
	    double a1 = -a-y[0];
	    double a2 =  a-y[0];
	    double y2 = y[2]*y[2];
	    if (y2 == 0)
		y2 = 1e-8;
	    if (getPot) {
		result[0] = getPot(a1, a2, y[2]);
		return;
	    }
	    double q = .0003/a;
	    result[0] = .5*q*
	        java.lang.Math.log((y2+a2*a2)/(y2+a1*a1));
	    result[1] = 0;
	    result[2] = q*
		(java.lang.Math.atan(a1/y[2])-
		 java.lang.Math.atan(a2/y[2]));
	}
	VecFunction createNext() { return new ChargedPlatePair(); }
    };

    class ChargedPlatePair extends ChargedPlate {
	String getName() { return "charged plate pair"; }
	boolean useRungeKutta() { return false; }
	void getField(double result[], double y[]) {
	    double sep = aux2Bar.getValue()/100.;
	    if ((y[2] >= -.01+sep && y[2] <= .01+sep ||
		 y[2] >= -.01-sep && y[2] <= .01-sep) &&
		y[0] >= -a && y[0] <= a)
		boundCheck = true;
	    double a1 = -a-y[0];
	    double a2 =  a-y[0];
	    double y1 = y[2]-sep;
	    double y12 = y1*y1;
	    if (y12 == 0)
		y12 = 1e-8;
	    double y2 = y[2]+sep;
	    double y22 = y2*y2;
	    if (y22 == 0)
		y22 = 1e-8;
	    if (getPot) {
		result[0] = getPot(a1, a2, y1)-
		    getPot(a1, a2, y2);
		return;
	    }

	    double q = .0003/a;
	    result[0] = .5*q*
	        (java.lang.Math.log((y12+a2*a2)/(y12+a1*a1)) -
		 java.lang.Math.log((y22+a2*a2)/(y22+a1*a1)));
	    result[1] = 0;
	    result[2] = q*
		(java.lang.Math.atan(a1/y1)
		-java.lang.Math.atan(a2/y1)
		-java.lang.Math.atan(a1/y2)
		+java.lang.Math.atan(a2/y2));
	}
	void setup() {
	    setupBar(0, "Sheet Size", 30);
	    setupBar(1, "Sheet Separation", 33);
	    setXZViewExact();
	}
	boolean checkBounds(double y[], double oldY[]) {
	    double size = aux1Bar.getValue()/100.;
	    double sep = aux2Bar.getValue()/100.;
	    // check to see if particle has passed through one of plates
	    if (y[0] >= -size && y[0] <= size) {
		if (y[2] > sep) {
		    if (oldY[2] < sep)
			return true;
		} else if (y[2] < -sep) {
		    if (oldY[2] > -sep)
			return true;
		} else if (oldY[2] > sep || oldY[2] < -sep)
		    return true;
	    }
	    return false;
	}
	void render(Graphics g) {
	    double sep = aux2Bar.getValue()/100.;
	    double size = aux1Bar.getValue()/100.;
	    int i;
	    for (i = 0; i != 2; i++) {
		double s = (i == 0) ? sep : -sep;
		drawPlane(g, size, 1, s);
	    }
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    double sep = aux2Bar.getValue()/100.;
	    double size = aux1Bar.getValue()/100.;
	    if (intersectZPlane(cameraPos, +sep, x[0], x[1], x[2]) != 0) {
		//System.out.print(size + " " + intersection[0] + " " + intersection[1] + "\n");
		if (intersection[0] >= -size && intersection[0] <= size)
		    return 0;
	    }
	    if (intersectZPlane(cameraPos, -sep, x[0], x[1], x[2]) != 0) {
		//System.out.print(size + " " + intersection[0] + " " + intersection[1] + "\n");
		if (intersection[0] >= -size && intersection[0] <= size)
		    return 0;
	    }
	    return 1;
	}
	VecFunction createNext() { return new InfiniteChargedPlane(); }
    };

    class InfiniteChargedPlane extends VecFunction {
	String getName() { return "infinite plane"; }
	int getBestSlice() { return SLICE_Y; }
	void getField(double result[], double y[]) {
	    double alpha = .0003;
	    if (y[2] > -.01 && y[2] < .01)
		boundCheck = true;
	    if (getPot) {
		result[0] = java.lang.Math.abs(y[2])-1;
		return;
	    }
	    result[0] = 0;
	    result[1] = 0;
	    result[2] = (y[2] < 0) ? alpha : -alpha;
	}
	void setup() {
	    setXZView();
	}
	void render(Graphics g) {
	    renderItems(g, 1);
	    drawPlane(g, 1, 1, 0);
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectZPlane(cameraPos, 0, x[0], x[1], x[2]) == 0)
		return 0;
	    return 1;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new SphereAndPointCharge(); }
    };
    
    class SphereAndPointCharge extends InverseSquaredRadial {
	String getName() { return "conducting sphere + pt"; }
	double getSphereRadius() { return (aux1Bar.getValue()+1)/110.; }
	double getSeparation() { return aux2Bar.getValue()/100.; }
	double getSpherePos() { return getSeparation()/2; }
	double getPointPos() { return -getSeparation()/2-getSphereRadius(); }
	int getBestSlice() { return SLICE_Y; }
	void setup() {
	    setupBar(0, "Sphere Size", 30);
	    setupBar(1, "Separation", 50);
	    setupBar(2, "Sphere Potential", 50);
	    setXZView();
	}
	void getField(double result[], double y[]) {
	    double q = -.0003;
	    double a = getSphereRadius();
	    double b = getSeparation() + a;
	    double spos = getSpherePos();
	    double imageQ = -q*a/b;
	    double imagePos = spos - a*a/b;

	    // first charge at center of sphere
	    double x1 = y[0]-spos;
	    double r1 = distance3(x1, y[1], y[2]);
	    if (r1 < a)
		boundCheck = true;
	    double sq = (aux3Bar.getValue()-50)*.002*a/50.;

	    // second charge at image position
	    double x2 = y[0]-imagePos;
	    double r2 = distance3(x2, y[1], y[2]);

	    // third charge at point
	    double x3 = y[0]-getPointPos();
	    double r3 = distance3(x3, y[1], y[2]);
	    if (r3 < chargeSize)
		boundCheck = true;

	    if (getPot) {
		result[0] = 400*(sq/r1 + imageQ/r2 + q/r3);
		return;
	    }
	    double a1 = sq/(r1*r1*r1);
	    double a2 = imageQ/(r2*r2*r2);
	    double a3 = q/(r3*r3*r3);
	    result[0] = x1*a1 + x2*a2 + x3*a3;
	    result[1] = y[1]*(a1+a2+a3);
	    result[2] = y[2]*(a1+a2+a3);
	}
	void render(Graphics g) {
	    int ic = intersectSphere(cameraPos, getPointPos()-getSpherePos(),
				     0, 0, getSphereRadius());
	    if (ic != 0)
		drawCharge(g, getPointPos(), 0, 0, 0);
	    fillSphere(g, getSphereRadius(), getSpherePos());
	    if (ic == 0)
		drawCharge(g, getPointPos(), 0, 0, 0);
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectSphere(cameraPos, x[0], x[1], x[2],
				getSpherePos(), 0, 0, getSphereRadius()) != 0)
		return -1;
	    if (intersectSphere(cameraPos, x[0], x[1], x[2],
				getPointPos(), 0, 0, chargeSize) != 0)
		return -1;
	    return 0;
	}
	VecFunction createNext() { return new ChargedSphereAndPointCharge(); }
    };

    class ChargedSphereAndPointCharge extends SphereAndPointCharge {
	String getName() { return "charged sphere + pt"; }
	void setup() {
	    setupBar(0, "Sphere Size", 30);
	    setupBar(1, "Separation", 50);
	    setupBar(2, "Sphere Charge", 50);
	    setXZView();
	}
	void getField(double result[], double y[]) {
	    double q = -.0003;
	    double a = getSphereRadius();
	    double b = getSeparation() + a;
	    double spos = getSpherePos();

	    // first charge at center of sphere
	    double x1 = y[0]-spos;
	    double r1 = distance3(x1, y[1], y[2]);
	    if (r1 < a)
		boundCheck = true;
	    double sq = (aux3Bar.getValue()-50)*.0006/50.;

	    // second charge at point
	    double x3 = y[0]-getPointPos();
	    double r3 = distance3(x3, y[1], y[2]);
	    if (r3 < chargeSize)
		boundCheck = true;

	    if (getPot) {
		result[0] = 300*(sq/r1 + q/r3);
		return;
	    }
	    double a1 = sq/(r1*r1*r1);
	    double a3 = q/(r3*r3*r3);
	    result[0] = x1*a1 + x3*a3;
	    result[1] = y[1]*(a1+a3);
	    result[2] = y[2]*(a1+a3);
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
	    setXYView();
	}
	void getField(double result[], double y[]) {
	    // Smythe p70
	    double q = -.0003;
	    double a = getCylRadius();
	    double b = getSeparation() + a;
	    double spos = getCylPos();
	    double imagePos = spos - a*a/b;
	    double x1 = y[0]-spos;
	    double r1 = distance2(x1, y[1]);
	    if (r1 < a)
		boundCheck = true;
	    double x2 = y[0]-imagePos;
	    double r2 = distance2(x2, y[1]);
	    double x3 = y[0]-getPointPos();
	    double r3 = distance2(x3, y[1]);
	    double chargeSize = .06;
	    if (r3 < chargeSize)
		boundCheck = true;
	    // pick a charge at the center of the cylinder that puts it
	    // at ground potential
	    double cq = q*(java.lang.Math.exp(b-a)-1) +
		(aux3Bar.getValue()/50.-1)*a*.0006;
	    if (getPot) {
		result[0] = -700*(cq*java.lang.Math.log(r1+1e-20)
				  -q*java.lang.Math.log(r2+1e-20)
				  +q*java.lang.Math.log(r3+1e-20));
		return;
	    }
	    double a1 = cq/(r1*r1);
	    double a2 = -q/(r2*r2);
	    double a3 = q/(r3*r3);
	    result[0] = x1*a1 + x2*a2 + x3*a3;
	    result[1] = y[1]*(a1+a2+a3);
	    result[2] = 0;
	}
	void render(Graphics g) {
	    int ic = intersectCylinder(cameraPos, getPointPos(), 0, 0,
				       getCylPos(), 0, getCylRadius(), false);
	    if (ic == 0)
		fillCylinder(g, getCylRadius(), getCylPos());
	    g.setColor(darkYellow);
	    map3d(getPointPos(), 0, -1, xpoints, ypoints, 0);
	    map3d(getPointPos(), 0, +1, xpoints, ypoints, 1);
	    g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    if (ic != 0)
		fillCylinder(g, getCylRadius(), getCylPos());
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectCylinder(cameraPos, x[0], x[1], x[2],
				  getPointPos(), 0, lineWidth, true) != 0)
		return -1;
	    if (intersectCylinder(cameraPos, x[0], x[1], x[2],
				  getCylPos(), 0, getCylRadius(), true) != 0)
		return -1;
	    return 0;
	}
	VecFunction createNext() { return new SphereInField(); }
    };

    class SphereInField extends VecFunction {
	SphereInField() { conducting = true; showD = false; }
	String getName() { return "conducting sphere in field"; }
	boolean conducting;
	boolean showD;
	int getBestSlice() { return SLICE_Y; }
	void getField(double result[], double y[]) {
	    // marion p74
	    double a = aux1Bar.getValue()/100.;
	    double a3 = a*a*a;
	    double r = distanceArray(y);
	    double e1 = aux2Bar.getValue()/10. + 1;
	    double dimult = (conducting) ? 1 : (e1-1)/(e1+2);
	    double fmult = .0006;
	    if (r < a) {
		result[0] = result[1] = 0;
		if (conducting)
		    boundCheck = true;
		else {
		    if (getPot)
			result[0] = -(1-dimult)*y[2];
		    else
			result[2] = (showD) ? e1*fmult*(1-dimult) :
			                      fmult*(1-dimult);
		}
		return;
	    }
	    double costh = y[2]/r;
	    double sinth = java.lang.Math.sqrt(1-costh*costh);
	    double cosph = y[0]/(r*sinth);
	    double sinph = y[1]/(r*sinth);
	    double r_3 = 1/(r*r*r);
	    if (getPot) {
		result[0] = -(1-dimult*a3*r_3)*y[2];
		return;
	    }
	    double er  = (1+dimult*2*a3*r_3)*costh*fmult;
	    double eth = -(1-dimult*a3*r_3)*sinth*fmult;
	    er /= r;
	    result[0] = y[0]*er + eth*costh*cosph;
	    result[1] = y[1]*er + eth*costh*sinph;
	    result[2] = y[2]*er - eth*sinth;
	}
	void setup() {
	    setupBar(0, "Sphere Size", 60);
	    setXZViewExact();
	}
	void render(Graphics g) {
	    double a = aux1Bar.getValue()/100.;
	    fillSphere(g, a, 0);
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    double a = aux1Bar.getValue()/100.;
	    return intersectSphere(cameraPos, x[0], x[1], x[2], a);
	}
	VecFunction createNext() { return new DielectricSphereInFieldE(); }
    };
    class DielectricSphereInFieldE extends SphereInField {
	DielectricSphereInFieldE() { conducting = false; showD = false; }
	String getName() { return "dielec sphere in field E"; }
	void setup() {
	    setupBar(0, "Sphere Size", 60);
	    setupBar(1, "Dielectric Strength", 60);
	    setXZViewExact();
	}
	void render(Graphics g) {
	    double a = aux1Bar.getValue()/100.;
	    renderSphere(g, a);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    double a = aux1Bar.getValue()/100.;
	    return intersectSphere(cameraPos, x[0], x[1], x[2], a);
	}
	boolean noSplitFieldVectors() { return false; }
	VecFunction createNext() { return new DielectricSphereInFieldD(); }
    };
    class DielectricSphereInFieldD extends DielectricSphereInFieldE {
	DielectricSphereInFieldD() { conducting = false; showD = true; }
	String getName() { return "dielec sphere in field D"; }
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
	    double r = distance2(y[0], y[1]);
	    double e1 = aux2Bar.getValue()/10. + 1;
	    double dimult = (conducting) ? 1 : (e1-1)/(e1+1);
	    double fmult = .0006;
	    if (r < a) {
		result[0] = result[1] = result[2] = 0;
		if (conducting)
		    boundCheck = true;
		else if (getPot)
		    result[0] = -(1-dimult)*y[0];
		else
		    result[0] = (showD) ? e1*fmult*(1-dimult) :
		        fmult*(1-dimult);
		return;
	    }
	    double costh = y[0]/r;
	    double sinth = y[1]/r;
	    double r_2 = 1/(r*r);
	    if (getPot) {
		result[0] = -(1-dimult*a2*r_2)*y[0];
		return;
	    }
	    double er  = (1+dimult*a2*r_2)*costh*fmult;
	    double eth = -(1-dimult*a2*r_2)*sinth*fmult;
	    er /= r;
	    result[0] = y[0]*er - eth*sinth;
	    result[1] = y[1]*er + eth*costh;
	    result[2] = 0;
	}
	void setup() {
	    setupBar(0, "Cylinder Size", 40);
	    setXYView();
	}
	void render(Graphics g) {
	    fillCylinder(g, a, 0);
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    return intersectCylinder(cameraPos, x[0], x[1], x[2],
				     a, conducting);
	}
	VecFunction createNext() { return new DielectricCylinderInFieldE(); }
    };

    class DielectricCylinderInFieldE extends CylinderInField {
	DielectricCylinderInFieldE() { conducting = false; showD = false; }
	String getName() { return "dielec cyl in field E"; }
	void setup() {
	    setupBar(0, "Cylinder Size", 40);
	    setupBar(1, "Dielectric Strength", 60);
	    setXYView();
	}
	void render(Graphics g) {
	    // draw particles behind cylinder
	    renderItems(g, 2);
	    // draw back faces of cylinder
	    g.setColor(darkYellow);
	    drawCylinder(g, a, 0, true);
	    // draw particles inside
	    renderItems(g, 1);
	    // draw front faces
	    g.setColor(darkYellow);
	    drawCylinder(g, a, 0, false);
	    // draw particles in front
	    renderItems(g, 0);
	}
	boolean noSplitFieldVectors() { return false; }
	VecFunction createNext() { return new DielectricCylinderInFieldD(); }
    };
    class DielectricCylinderInFieldD extends DielectricCylinderInFieldE {
	DielectricCylinderInFieldD() { conducting = false; showD = true; }
	String getName() { return "dielec cyl in field D"; }
	VecFunction createNext() { return new DielectricBoundaryE(); }
    };

    class DielectricBoundaryE extends InverseSquaredRadial {
	boolean showD, conducting;
	double planeZ;
	DielectricBoundaryE() { conducting = false; showD = false; }
	int getBestSlice() { return SLICE_Y; }
	String getName() { return "dielec boundary E"; }
	void setup() {
	    setupBar(0, "Charge Location", 60);
	    if (!conducting)
		setupBar(1, "Dielectric Strength", 60);
	    setViewMatrix(0, pi/40-pi/2);
	}
	void render(Graphics g) {
	    renderItems(g, 1);
	    drawPlane(g, 1, 1, planeZ);
	    double cx = aux1Bar.getValue()/50.-1.001;
	    drawCharge(g, 0, 0, cx);
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    double cx = aux1Bar.getValue()/50.-1.001;
	    if (intersectSphere(cameraPos, x[0], x[1], x[2]-cx,
				chargeSize) == 0
		&& intersectZPlane(cameraPos, 0, x[0], x[1], x[2]-planeZ) == 0)
		return 0;
	    return 1;
	}
	void getField(double result[], double y[]) {
	    double cx = aux1Bar.getValue()/50.-1.001;
	    double r1 = distance3(y[0], y[1], y[2]-cx);
	    if (r1 < chargeSize)
		boundCheck = true;
	    double eps1 = 1;
	    double eps2 = aux2Bar.getValue()/10. + 1;
	    if (conducting)
		eps2 = 1e8;
	    if (cx < planeZ) {
		eps1 = eps2;
		eps2 = 1;
	    }
	    double q1 = .0003;
	    double q2 = -(eps2-eps1)/(eps2+eps1)*q1;
	    double ep = eps1;
	    if (cx > planeZ && y[2] < planeZ || cx < planeZ && y[2] > planeZ) {
		q1 = 2*eps2*q1/(eps2+eps1);
		q2 = 0;
		ep = eps2;
	    }
	    double r2 = distance3(y[0], y[1], y[2]-planeZ*2+cx);
	    if (getPot) {
		result[0] = -1000*(q1/(r1*ep) + q2/(r2*ep));
		return;
	    }
	    if (!showD) {
		q1 /= ep;
		q2 /= ep;
	    }
	    double rq1 = q1/(r1*r1*r1);
	    double rq2 = q2/(r2*r2*r2);
	    result[0] = -y[0]*(rq1+rq2);
	    result[1] = -y[1]*(rq1+rq2);
	    result[2] = -(y[2]-cx)*rq1-(y[2]-planeZ*2+cx)*rq2;
	}
	VecFunction createNext() { return new DielectricBoundaryD(); }
    };
    class DielectricBoundaryD extends DielectricBoundaryE {
	DielectricBoundaryD() { conducting = false; showD = true; }
	String getName() { return "dielec boundary D"; }
	VecFunction createNext() { return new ConductingPlane(); }
    };
    class ConductingPlane extends DielectricBoundaryE {
	ConductingPlane() { conducting = true; showD = false; planeZ = -1; }
	String getName() { return "conducting plane + pt"; }
	VecFunction createNext() { return new FastChargeEField(); }
    };

    class MovingChargeField extends InverseSquaredRadial {
	String getName() { return "moving charge"; }
	void getField(double result[], double y[]) {
	    double rz = distanceArray(y);
	    if (showA) {
		result[0] = result[1] = 0;
		result[2] = .0003/rz;
	    } else {
		double r = distance2(y[0], y[1]);
		if (rz < chargeSize)
		    boundCheck = true;
		rotateParticle(result, y, .0001/(rz*rz*rz));
	    }
	}
	void render(Graphics g) {
	    drawCharge(g, 0, 0, 0, 1);
	    renderItems(g, 1);
	}
	void setup() {
	    setXZView();
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return
	       BUILD_CASE_EMV(null, new FastChargeField(), null); }
    };
    class FastChargeEField extends MovingChargeField {
	String getName() { return "fast charge"; }
	int getBestSlice() { return SLICE_Y; }
	void getField(double result[], double y[]) {
	    double rz = distanceArray(y);
	    if (rz < chargeSize)
		boundCheck = true;
	    double r = distance2(y[0], y[1]);
	    // sine of angle between particle vector and direction of motion
	    double sinth = r/rz;
	    double beta = (aux1Bar.getValue()+1)/102.;
	    if (getPot) {
		result[0] = -.1/
		    (rz*java.lang.Math.pow(1-beta*beta*sinth*sinth, .5));
		return;
	    }
	    
	    // field = e R (1-beta^2) / R^3 (1-beta^2 sin^2 th)^(3/2)
	    double b = -.0001 * (1-beta*beta)/
		(rz*rz*rz*java.lang.Math.pow(1-beta*beta*sinth*sinth, 1.5));
	    result[0] = b*y[0];
	    result[1] = b*y[1];
	    result[2] = b*y[2];
	}
	void setup() {
	    setupBar(0, "Speed/C", 60);
	    super.setup();
	}
	boolean nonGradient() { return false; }
	VecFunction createNext() { return new ChargedRing(); }
    };

    class SlottedPlane extends VecFunction {
	String getName() { return "slotted conducting plane"; }
	Complex z, z2;
	SlottedPlane() {
	    z = new Complex();
	    z2 = new Complex();
	}
	void getField(double result[], double y[]) {
	    // W = -.5E (z +- (z^2-a^2)^1/2)
	    // dw/dz = -.5E (1 +- z/(z^2-a^2)^1/2)
	    // Smythe p92
	    double a = (aux1Bar.getValue()+1)/101.;
	    if (y[2] >= -.01 && y[2] <= .01 &&
		(y[0] < -a || y[0] > a))
		boundCheck = true;
	    z.setReIm(y[0], y[2]);
	    z2.set(z);
	    z2.square();
	    z2.addRe(-a*a);
	    if (getPot) {
		z2.pow(.5);
		if (z2.im < 0)
		    z2.multRe(-1);
		z2.add(z);
		result[0] = -z2.im*.6;
		return;
	    }
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
	    result[2] = (1+z2.re) * .003;
	    result[0] = (z2.im) * .003;
	    result[1] = 0;
	}
	void setup() {
	    setupBar(0, "Slot Size", 60);
	    setXZView();
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectZPlane(cameraPos, 0, x[0], x[1], x[2]) != 0) {
		double a = (aux1Bar.getValue()+1)/101.;
		if (intersection[0] < -a || intersection[0] > a)
		    return 1;
	    }
	    return 0;
	}
	void render(Graphics g) {
	    g.setColor(darkYellow);
	    double a = (aux1Bar.getValue()+1)/101.;
	    map3d(-1, -1, 0, xpoints, ypoints, 0);
	    map3d(-a, -1, 0, xpoints, ypoints, 1);
	    map3d(-a, +1, 0, xpoints, ypoints, 2);
	    map3d(-1, +1, 0, xpoints, ypoints, 3);
	    g.fillPolygon(xpoints, ypoints, 4);
	    map3d( 1, -1, 0, xpoints, ypoints, 0);
	    map3d( a, -1, 0, xpoints, ypoints, 1);
	    map3d( a, +1, 0, xpoints, ypoints, 2);
	    map3d( 1, +1, 0, xpoints, ypoints, 3);
	    g.fillPolygon(xpoints, ypoints, 4);
	    renderItems(g, 0);
	}
	VecFunction createNext() { return new PlanePair(); }
    };
    class PlanePair extends ConductingPlate {
	String getName() { return "conducting planes w/ gap"; }
	PlanePair() { super(); plate = false; }
	void setup() {
	    setupBar(0, "Gap Size", 20);
	    setXZView();
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectZPlane(cameraPos, 0, x[0], x[1], x[2]) != 0) {
		if (intersection[0] < -a || intersection[0] > a)
		    return 1;
	    }
	    return 0;
	}
	void render(Graphics g) {
	    g.setColor(darkYellow);
	    map3d(-1, -1, 0, xpoints, ypoints, 0);
	    map3d(-a, -1, 0, xpoints, ypoints, 1);
	    map3d(-a, +1, 0, xpoints, ypoints, 2);
	    map3d(-1, +1, 0, xpoints, ypoints, 3);
	    g.fillPolygon(xpoints, ypoints, 4);
	    map3d( 1, -1, 0, xpoints, ypoints, 0);
	    map3d( a, -1, 0, xpoints, ypoints, 1);
	    map3d( a, +1, 0, xpoints, ypoints, 2);
	    map3d( 1, +1, 0, xpoints, ypoints, 3);
	    g.fillPolygon(xpoints, ypoints, 4);
	    renderItems(g, 0);
	}
	VecFunction createNext() { return null; }
    };
    class InverseRotational extends InverseRadial {
	String getName() { return BUILD_CASE_EMV(null, "current line",
				  "1/r rotational"); }
	void setup() {
	    setXYViewExact();
	}
	void getField(double result[], double y[]) {
	    double r = distance2(y[0], y[1]);
	    if (showA) {
		result[0] = result[1] = 0;
		result[2] = -.001*(java.lang.Math.log(r)-.5);
	    } else {
		if (r < lineWidth*2)
		    boundCheck = true;
		rotateParticle(result, y, .0001/(r*r));
	    }
	}
	void render(Graphics g) {
	    g.setColor(darkYellow);
	    map3d(0, 0, -1, xpoints, ypoints, 0);
	    map3d(0, 0, +1, xpoints, ypoints, 1);
	    drawCurrentLine(g, xpoints[0], ypoints[0], xpoints[1], ypoints[1],
			    12, true, 1);
	    renderItems(g, 1);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new InverseRotationalDouble(); }
    };
    class InverseRotationalDouble extends InverseRadialDouble {
	InverseRotationalDouble() { dir2 = 1; ext = false; }
	int dir2;
	boolean ext;
	String getName() { return BUILD_CASE_EMV(null, "current line double",
						 "1/r rotational double"); }
	void getField(double result[], double y[]) {
	    double sep = aux1Bar.getValue()/100.;
	    double r  = distance2(y[0] - sep, y[1]);
	    double r2 = distance2(y[0] + sep, y[1]);
	    if (ext) {
		double p = aux3Bar.getValue()*pi/50.;
		double s = aux2Bar.getValue()/30.;
		getDirectionField(result, y, pi/2, p);
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
		    result[2] += -.001*(java.lang.Math.log(r)-
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
		setupBar(1, "Ext. Strength", 28);
		setupBar(2, "Ext. Direction", 0);
	    }
	    setXYViewExact();
	}
	void render(Graphics g) {
	    double sep = aux1Bar.getValue()/100.;
	    g.setColor(darkYellow);
	    int i;
	    for (i = -1; i <= 1; i += 2) {
		map3d(sep*i, 0, -1, xpoints, ypoints, 0);
		map3d(sep*i, 0, +1, xpoints, ypoints, 1);
		int dir = (i == -1) ? dir2 : 1;
		drawCurrentLine(g, xpoints[0], ypoints[0],
				xpoints[1], ypoints[1], 12, true, dir);
	    }
	    renderItems(g, 1);
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
	    aux2Bar.setValue(17);
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
	    double ph = aux2Bar.getValue() * pi /50.;
	    getDirectionField(result, y, th, ph);
	}

	void setup() {
	    setupBar(0, "Theta", 25);
	    setupBar(1, "Phi", 0);
	    setXYView();
	}
	VecFunction createNext() { return
	    BUILD_CASE_EMV(null, new MovingChargeField(),
			   new InverseSquaredRadialSphere()); }
    };

    void getDirectionField(double result[], double y[],
			   double th, double ph) {
	double sinth = java.lang.Math.sin(th);
	double costh = java.lang.Math.cos(th);
	double sinph = java.lang.Math.sin(ph);
	double cosph = java.lang.Math.cos(ph);
	if (!showA) {
	    if (getPot) {
		result[0] = -.4*(y[0]*sinth*cosph + y[1]*sinth*sinph +
				 y[2]*costh);
		return;
	    }
	    result[0] = .0003*sinth*cosph;
	    result[1] = .0003*sinth*sinph;
	    result[2] = .0003*costh;
	} else {
	    // The A for this field is a linear rotation around
	    // an axis pointing in the direction of the field.
	    // First calculate the axis.
	    double axis[] = new double[3];
	    axis[0] = sinth*cosph;
	    axis[1] = sinth*sinph;
	    axis[2] = costh;
	    // now project the point we are looking at onto the axis
	    double d = dot(axis, y);
	    // subtract out this projection so we can get the vector
	    // from the point to the axis
	    double r[] = new double[3];
	    int i;
	    for (i = 0; i != 3; i++)
		r[i] = .0006*(y[i] - axis[i]*d);
	    // cross this vector with the axis vector to get the result
	    cross(result, axis, r);
	}
    }

    class FastChargeField extends MovingChargeField {
	String getName() { return "fast charge"; }
	double getFieldStrength(double y[]) {
	    double rz = distanceArray(y);
	    if (rz < chargeSize)
		boundCheck = true;
	    double r = distance2(y[0], y[1]);
	    // sine of angle between particle vector and direction of motion
	    double sinth = r/rz;
	    double beta = (aux1Bar.getValue()+1)/102.;
	    // field = e(beta X R)(1-beta^2)/(R^3)(1-beta^2 sin^2 th)^(3/2)
            //       = C/(R^2)(1-beta^2 sin^2 th)^(3/2)
	    // We are ignoring C which affects the strength of the field and
	    // does not change its shape.  The field is in the direction
	    // of beta X R which means that it rotates the particle
	    // around the z axis.  XXX changed this, fix
	    double b = .001*(1-beta*beta)*beta/
		(rz*rz*java.lang.Math.pow(1-beta*beta*sinth*sinth, 1.5));
	    return b;
	}
	void setup() {
	    super.setup();
	    setupBar(0, "Speed/C", 60);
	}
	void render(Graphics g) {
	    // the charge is always going in the same direction,
	    // regardless of reverse
	    drawCharge(g, 0, 0, 0, reverse);
	    renderItems(g, 1);
	}
	void getField(double result[], double y[]) {
	    if (showA) {
		double rz = distanceArray(y);
		double r = distance2(y[0], y[1]);
		// sine of angle between particle vector and direction of motion
		double sinth = r/rz;
		double beta = (aux1Bar.getValue()+1)/102.;
		result[0] = result[1] = 0;
		result[2] = .003*beta/
		    (rz*java.lang.Math.pow(1-beta*beta*sinth*sinth, .5));
	    } else
		rotateParticle(result, y, getFieldStrength(y));
	}
	VecFunction createNext() { return new MovingChargeFieldDouble(); }
    };

    class MovingChargeFieldDouble extends InverseSquaredRadialDouble {
	String getName() { return "moving charge double"; }
	MovingChargeFieldDouble() { dir2 = 1; }
	int dir2;
	void getField(double result[], double y[]) {
	    result[0] = result[1] = result[2] = 0;
	    double sep = aux1Bar.getValue()/100.;
	    double rz1 = distance3(y[0] - sep, y[1], y[2]);
	    double rz2 = distance3(y[0] + sep, y[1], y[2]);
	    if (showA) {
		result[0] = result[1] = 0;
		result[2] = .0003*(1/rz1 + dir2/rz2);
	    } else {
		double r = distance2(y[0] - sep, y[1]);
		if (rz1 < chargeSize)
		    boundCheck = true;
		rotateParticleAdd(result, y, .0001/(rz1*rz1*rz1),  sep, 0);
		if (rz2 < chargeSize)
		    boundCheck = true;
		r = distance2(y[0] + sep, y[1]);
		rotateParticleAdd(result, y, dir2*.0001/(rz2*rz2*rz2),
				  -sep, 0);
	    }
	}
	void setup() {
	    setupBar(0, "Charge Separation", 30);
	    super.setup();
	}
	void render(Graphics g) {
	    double sep = aux1Bar.getValue()/100.;
	    drawCharge(g, +sep, 0, 0, 1);
	    drawCharge(g, -sep, 0, 0, dir2);
	    renderItems(g, 1);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new MovingChargeDipole(); }
    };
    class MovingChargeDipole extends MovingChargeFieldDouble {
	MovingChargeDipole() { dir2 = -1; }
	String getName() { return "moving charge dipole"; }
	VecFunction createNext() { return new CurrentLoopField(); }
    };
    class CurrentLoopField extends VecFunction {
	CurrentLoopField() { useColor = true; }
	Color colors[];
	boolean useColor;
	double size;
	String getName() { return "current loop"; }
	boolean useAdaptiveRungeKutta() { return false; }
	void setup() {
	    setXZView();
	    setupBar(0, "Loop Size", 40);
	}
	void setupFrame() {
	    size = (aux1Bar.getValue()+1)/100.;
	}
	void getField(double result[], double y[]) {
	    getLoopField(result, y, 0, 0, 1, size);
	}
	void getLoopField(double result[], double y[], double xoff,
			  double zoff, int dir, double size) {
	    double xx = y[0]-xoff;
	    double yy = y[1];
	    double zz = y[2]-zoff;
	    int i;
	    result[0] = result[1] = result[2] = 0;
	    int ct = 8;
	    double q = .0006*dir/(size*ct);
	    double ang0 = java.lang.Math.atan2(y[1], y[0]);
	    for (i = 0; i != ct; i ++) {
		double ang = pi*2*i/ct;
		double jxx = size*java.lang.Math.cos(ang+ang0);
		double jyy = size*java.lang.Math.sin(ang+ang0);
		double lxx = -jyy*q;
		double lyy =  jxx*q;
		double rx = xx-jxx;
		double ry = yy-jyy;
		double rz = zz;
		double r = java.lang.Math.sqrt(rx*rx+ry*ry+rz*rz);
		if (!showA) {
		    double r3 = r*r*r;
		    if (r < .04 && useMagnetMove())
			boundCheck = true;

		    // dl x R = (lxx, lyy, 0) X R
		    //        = (lyy*rz, -lxx*rz, lxx*ry-lyy*rx)
		    // we are integrating by dl x Rhat/r^2, so we rewrite
		    // that as dl x R / r^3.
		    double cx = lyy*rz/r3;
		    double cy = -lxx*rz/r3;
		    double cz = (lxx*ry - lyy*rx)/r3;
		    result[0] += cx;
		    result[1] += cy;
		    result[2] += cz;
		} else {
		    // dl /r = lxx 
		    result[0] += 6*lxx/r;
		    result[1] += 6*lyy/r;
		}
	    }
	}
	boolean checkBounds(double y[], double oldY[]) {
	    if (!useMagnetMove())
		return false;
	    if ((y[2] > 0 && oldY[2] < 0) ||
		(y[2] < 0 && oldY[2] > 0)) {
		double r = java.lang.Math.sqrt(y[0]*y[0]+y[1]*y[1]);
		if (r < size)
		    return true;
	    }
	    return false;
	}

	void render(Graphics g) {
	    renderItems(g, 1);
	    renderLoop(g, 0, 0, 1, size);
	    renderItems(g, 0);
	}

	void renderLoop(Graphics g, double xoff, double zoff, int dir,
			double size) {
	    final int loopSegments = 72;
	    int i;
	    if (!useColor)
		g.setColor(darkYellow);
	    for (i = 0; i != loopSegments; i++) {
		double ang1 = pi*2*i/loopSegments;
		double ang2 = pi*2*(i+dir)/loopSegments;
		double jxx1 = size*java.lang.Math.cos(ang1) + xoff;
		double jyy1 = size*java.lang.Math.sin(ang1);
		double jxx2 = size*java.lang.Math.cos(ang2) + xoff;
		double jyy2 = size*java.lang.Math.sin(ang2);
		map3d(jxx1, jyy1, zoff, xpoints, ypoints, 0);
		map3d(jxx2, jyy2, zoff, xpoints, ypoints, 1);
		if (useColor)
		    g.setColor(getCurrentColor(i*dir));
		if (i == 0 && useColor)
		    drawCurrentArrow(g, xpoints[0], ypoints[0],
				     xpoints[1], ypoints[1]);
		else
		    g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    }
	}

	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectZPlane(cameraPos, 0, x[0], x[1], x[2]) != 0)
		return 1;
	    return 0;
	}
	boolean noSplitFieldVectors() { return false; }
	boolean nonGradient() { return true; }
	VecFunction createNext() { return
	     BUILD_CASE_EMV(null, new CurrentLoopsSideField(), null); }
    };
    class CurrentLoopsSideField extends CurrentLoopField {
	String getName() { return "loop pair"; }
	int dir2;
	double offx, offz, size;
	double tres1[], tres2[];
	CurrentLoopsSideField() {
	    tres1 = new double[3];
	    tres2 = new double[3];
	}
	void setup() {
	    setXZView();
	    setupBar(0, "Loop Size", 40);
	    setupBar(1, "Loop Separation", 10);
	    setupBar(2, "Offset", 0);
	}
	void setupFrame() {
	    size = (aux1Bar.getValue()+1)/100.;
	    double sep = aux2Bar.getValue()/100.;
	    double sep2 = aux3Bar.getValue()/100.;
	    offx = sep*(1-size)+size; offz = sep2;
	    dir2 = 1;
	}
	void getField(double result[], double y[]) {
	    getLoopField(tres1, y, +offx, +offz, 1,    size);
	    getLoopField(tres2, y, -offx, -offz, dir2, size);
	    int i;
	    for (i = 0; i != 3; i++)
		result[i] = tres1[i] + tres2[i];
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	    renderLoop(g, +offx, +offz,  1,   size);
	    renderLoop(g, -offx, -offz, dir2, size);
	    renderItems(g, 1);
	}
	boolean checkBounds(double y[], double oldY[]) {
	    if (!useMagnetMove())
		return false;
	    if ((y[2] > offz && oldY[2] < offz) ||
		(y[2] < offz && oldY[2] > offz)) {
		double x = y[0]-offx;
		double r = java.lang.Math.sqrt(x*x+y[1]*y[1]);
		if (r < size)
		    return true;
	    }
	    if ((y[2] > -offz && oldY[2] < -offz) ||
		(y[2] < -offz && oldY[2] > -offz)) {
		double x = y[0]+offx;
		double r = java.lang.Math.sqrt(x*x+y[1]*y[1]);
		if (r < size)
		    return true;
	    }
	    return false;
	}
	VecFunction createNext() { return new CurrentLoopsSideOppField(); }
    };
    class CurrentLoopsSideOppField extends CurrentLoopsSideField {
	String getName() { return "loop pair opposing"; }
	void setupFrame() {
	    size = (aux1Bar.getValue()+1)/100.;
	    double sep = aux2Bar.getValue()/100.;
	    double sep2 = aux3Bar.getValue()/100.;
	    offx = sep*(1-size)+size; offz = sep2;
	    dir2 = -1;
	}
	VecFunction createNext() { return new CurrentLoopsStackedField(); }
    };
    class CurrentLoopsStackedField extends CurrentLoopsSideField {
	String getName() { return "loop pair stacked"; }
	void setupFrame() {
	    size = (aux1Bar.getValue()+1)/100.;
	    double sep = (aux2Bar.getValue()+1)/100.;
	    double sep2 = aux3Bar.getValue()/100.;
	    offx = sep2; offz = sep;
	    dir2 = 1;
	}
	VecFunction createNext() { return new CurrentLoopsStackedOppField(); }
    };
    class CurrentLoopsStackedOppField extends CurrentLoopsSideField {
	String getName() { return "loop pair stacked, opp."; }
	void setupFrame() {
	    size = (aux1Bar.getValue()+1)/100.;
	    double sep = (aux2Bar.getValue()+1)/100.;
	    double sep2 = aux3Bar.getValue()/100.;
	    offx = sep2; offz = sep;
	    dir2 = -1;
	}
	VecFunction createNext() { return new CurrentLoopsOpposingConcentric(); }
    };
    class CurrentLoopsOpposingConcentric extends CurrentLoopField {
	String getName() { return "concentric loops"; }
	int dir2;
	double tres1[], tres2[];
	double size2;
	CurrentLoopsOpposingConcentric() {
	    tres1 = new double[3];
	    tres2 = new double[3];
	}
	void setup() {
	    setXZView();
	    setupBar(0, "Outer Loop Size", 75);
	    setupBar(1, "Inner Loop Size", 50);
	}
	void setupFrame() {
	    size = (aux1Bar.getValue()+1)/101.;
	    size2 = size*(aux2Bar.getValue()+1)/101.;
	}
	void getField(double result[], double y[]) {
	    getLoopField(tres1, y, 0, 0,  1, size);
	    getLoopField(tres2, y, 0, 0, -1, size2);

	    // getLoopField's result is not proportional to size^2 (as
	    // it should be) but rather to size, because that makes
	    // the field of small loops too hard to see, and because
	    // we care more about the shape of the field than its
	    // absolute magnitude.  To correct for that, we have to
	    // multiply the smaller loop's field by size2/size to
	    // ensure that the field looks correct for two concentric
	    // loops with the same current.
	    double mult = size2/size;
	    int i;
	    for (i = 0; i != 3; i++)
		result[i] = tres1[i] + mult*tres2[i];
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	    renderLoop(g, 0, 0,  1, size);
	    renderLoop(g, 0, 0, -1, size2);
	    renderItems(g, 1);
	}
	VecFunction createNext() { return new SolenoidField(); }
    };
    class ChargedRing extends CurrentLoopField {
	ChargedRing() { useColor = false; }
	String getName() { return "charged ring"; }
	int getBestSlice() { return SLICE_Y; }
	void getField(double result[], double y[]) {
	    getLoopField(result, y, 0);
	}
	void getLoopField(double result[], double y[], double zoff) {
	    double xx = y[0];
	    double yy = y[1];
	    double zz = y[2]+zoff;
	    int i;
	    result[0] = result[1] = result[2] = 0;
	    double size = aux1Bar.getValue()/100.;
	    int ct = 8;
	    double q = (getPot) ? .2/ct : -.0006/ct;
	    double ang0 = java.lang.Math.atan2(y[1], y[0]);
	    for (i = 0; i != ct; i++) {
		double ang = pi*2*i/ct;
		double jxx = size*java.lang.Math.cos(ang+ang0);
		double jyy = size*java.lang.Math.sin(ang+ang0);
		double rx = xx-jxx;
		double ry = yy-jyy;
		double rz = zz;
		double r = java.lang.Math.sqrt(rx*rx+ry*ry+rz*rz);
		if (r < .06)
		    boundCheck = true;
		double r3 = r*r*r;
		if (getPot) {
		    result[0] += -q/r;
		} else {
		    result[0] += q*rx/r3;
		    result[1] += q*ry/r3;
		    result[2] += q*rz/r3;
		}
	    }
	}
	void setup() {
	    setupBar(0, "Ring Size", 40);
	    setXZView();
	}
	boolean nonGradient() { return false; }
	VecFunction createNext() { return new ChargedRingPair(); }
    };
    class ChargedRingPair extends ChargedRing {
	String getName() { return "charged ring pair"; }
	double sep;
	int r2;
	double tres1[], tres2[];
	ChargedRingPair() {
	    tres1 = new double[3];
	    tres2 = new double[3];
	    r2 = 1;
	}
	void setupFrame() {
	    sep = aux2Bar.getValue()/100.;
	}
	void getField(double result[], double y[]) {
	    getLoopField(tres1, y, -sep);
	    getLoopField(tres2, y, sep);
	    int i;
	    for (i = 0; i != 3; i++)
		result[i] = tres1[i] + r2*tres2[i];
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	    double size = aux1Bar.getValue()/100.;
	    renderLoop(g, 0, -sep, 1, size);
	    renderLoop(g, 0,  sep, 1, size);
	    renderItems(g, 1);
	}
	void setup() {
	    setupBar(0, "Ring Size", 40);
	    setupBar(1, "Ring Separation", 40);
	    setXZView();
	}
	VecFunction createNext() { return new ChargedRingDipole(); }
    };
    class ChargedRingDipole extends ChargedRingPair {
	String getName() { return "charged ring dipole"; }
	ChargedRingDipole() {
	    r2 = -1;
	}
	VecFunction createNext() { return new SlottedPlane(); }
    }
    class SolenoidField extends VecFunction {
	String getName() { return "solenoid"; }
	boolean useRungeKutta() { return false; }
	double height, size;
	int turns;
	void setupFrame() {
	    size = (aux1Bar.getValue()+1)/100.;
	    turns = (aux3Bar.getValue()/4)+1;
	    height = (aux2Bar.getValue()+1)/25.;
	}
	void getField(double result[], double y[]) {
	    int i, j, n;
	    result[0] = result[1] = result[2] = 0;
	    int angct = 8; // was 10 aux3Bar.getValue()+1;
	    if (turns == 0)
		return;
	    if (turns < 9)
		angct = 80/turns;
	    double ang0 = java.lang.Math.atan2(y[1], y[0]);
	    double zcoilstep = height/turns;
	    double zangstep = zcoilstep/angct;
	    double zbase = -height/2;
	    double q = .003/(turns*angct);
	    double lzz = q*zangstep;
	    if (ang0 < 0)
		ang0 += 2*pi;
	    if (ang0 < 0)
		System.out.print("-ang0?? " + ang0 + "\n");
	    ang0 %= zangstep;
	    zbase += zcoilstep*ang0/(2*pi);
	    for (i = 0; i != angct; i++) {
		double ang = pi*2*i/angct;
		double jxx = size*java.lang.Math.cos(ang+ang0);
		double jyy = size*java.lang.Math.sin(ang+ang0);
		double jzz = zbase+zangstep*i;
		double lxx = -jyy*q;
		double lyy =  jxx*q;
		double rx = y[0]-jxx;
		double ry = y[1]-jyy;
		double rx2ry2 = rx*rx+ry*ry;
		for (j = 0; j != turns; j++) {
		    double rz = y[2]-jzz;
		    double r = java.lang.Math.sqrt(rx2ry2+rz*rz);
		    if (!showA) {
			if (r < .04 && useMagnetMove())
			    boundCheck = true;
			
			// dl x R = (lxx, lyy, lzz) X R
			//        = (lyy*rz-lzz*ry, lzz*rx-lxx*rz,
			//           lxx*ry-lyy*rx)
			// we are integrating by dl x Rhat/r^2, so we rewrite
			// that as dl x R / r^3.
			double r3 = r*r*r;
			double cx = (lyy*rz-lzz*ry)/r3;
			double cy = (lzz*rx-lxx*rz)/r3;
			double cz = (lxx*ry-lyy*rx)/r3;
			result[0] += cx;
			result[1] += cy;
			result[2] += cz;
		    } else {
			result[0] += 6*lxx/r;
			result[1] += 6*lyy/r;
			result[2] += 6*lzz/r;
		    }
		    jzz += zcoilstep;
		}
	    }
	}
	void setup() {
	    setupBar(0, "Diameter", 40);
	    setupBar(1, "Height", 30);
	    setupBar(2, "# of Turns", 36);
	    setXZView();
	}
	int getViewPri(double cameraPos[], double x[]) {
	    return intersectCylinder(cameraPos, x[0], x[1], x[2], 2, false);
	}
	boolean checkBounds(double y[], double oldY[]) {
	    if (!useMagnetMove())
		return false;
	    double height2 = height*2;
	    double r  = java.lang.Math.sqrt(y[0]*y[0]+y[1]*y[1]);
	    double or = java.lang.Math.sqrt(oldY[0]*oldY[0]+oldY[1]*oldY[1]);
	    // going through walls?
	    if (y[2] < height2 && y[2] > -height2) {
		if ((r < size && or > size) ||
		    (or < size && r > size))
		    return true;
	    }
	    // passing through z=0 plane inside solenoid?
	    if ((y[2] > 0 && oldY[2] < 0) ||
		(y[2] < 0 && oldY[2] > 0)) {
		if (r < size)
		    return true;
	    }
	    return false;
	}
	void render(Graphics g) {
	    renderItems(g, 2);
	    // draw particles inside cylinder; XXX
	    renderItems(g, 1);
	    g.setColor(darkYellow);
	    int i, j;
	    int angct = 48;
	    if (turns < 10)
		angct = 480/turns;
	    double zcoilstep = height/turns;
	    double zangstep = zcoilstep/angct;
	    double zbase = -height/2;
	    for (i = 0; i != angct; i++) {
		double ang1 = pi*2*i/angct;
		double ang2 = pi*2*(i+1)/angct;
		double jxx1 = size*java.lang.Math.cos(ang1);
		double jyy1 = size*java.lang.Math.sin(ang1);
		double jxx2 = size*java.lang.Math.cos(ang2);
		double jyy2 = size*java.lang.Math.sin(ang2);
		double jzz1 = zbase + zangstep*i;
		for (j = 0; j != turns; j++) {
		    double jzz2 = jzz1 + zangstep;
		    map3d(jxx1, jyy1, jzz1, xpoints, ypoints, 0);
		    map3d(jxx2, jyy2, jzz2, xpoints, ypoints, 1);
		    g.setColor(getCurrentColor(j*angct+i));
		    if (i == 0 && j == turns/2)
			drawCurrentArrow(g, xpoints[0], ypoints[0],
					 xpoints[1], ypoints[1]);
		    else
			g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
		    jzz1 += zcoilstep;
		}
	    }
	    renderItems(g, 0);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new ToroidalSolenoidField(); }
    };
    class ToroidalSolenoidField extends VecFunction {
	ToroidalSolenoidField() { turnmult = 1; }
	String getName() { return "toroidal solenoid"; }
	boolean useRungeKutta() { return false; }
	double size1, size2, q;
	int turns, angct = 8;
	int turnmult;
	double costab1[], sintab1[];
	double costab2[][], sintab2[][];

	void setupFrame() {
	    size1 = aux1Bar.getValue()/100.;
	    size2 = aux2Bar.getValue()*size1/100.;
	    turns = aux3Bar.getValue()/3+6;
	    q = .0003/(angct*turns);
	    costab1 = new double[angct];
	    sintab1 = new double[angct];
	    costab2 = new double[angct][turns];
	    sintab2 = new double[angct][turns];
	    int i, j;
	    for (i = 0; i != angct; i++) {
		double ang = pi*2*i/angct;
		costab1[i] = java.lang.Math.cos(ang);
		sintab1[i] = java.lang.Math.sin(ang);
		for (j = 0; j != turns; j++) {
		    double ang2 = (pi*2*j+ang)/(turnmult*turns);
		    costab2[i][j] = java.lang.Math.cos(ang2);
		    sintab2[i][j] = java.lang.Math.sin(ang2);
		}
	    }
	}
	void finishFrame() {
	    costab1 = sintab1 = null;
	    costab2 = sintab2 = null;
	}

	void setup() {
	    setupBar(0, "Center Radius", 60);
	    setupBar(1, "Outer Radius", 80);
	    setupBar(2, "# of turns", 18);
	}

	void getField(double result[], double y[]) {
	    int i, j, n;
	    result[0] = result[1] = result[2] = 0;
	    for (i = 0; i != angct; i++) {
		double cosp = costab1[i];
		double sinp = sintab1[i];
		double jzz = size2*sinp;
		double lzz = q*turns*size2*cosp;
		double rz = y[2]-jzz;
		for (j = 0; j != turns; j++) {
		    double cosa = costab2[i][j];
		    double sina = sintab2[i][j];
		    double jxx = cosa*(size1+size2*cosp);
		    double jyy = sina*(size1+size2*cosp);
		    double lxx = q*
			(-(size1+size2*cosp)*sina - turns*size2*cosa*sinp);
		    double lyy = q*
			((size1+size2*cosp)*cosa - turns*size2*sina*sinp);
		    double rx = y[0]-jxx;
		    double ry = y[1]-jyy;
		    double r = distance3(rx, ry, rz);
		    if (!showA) {
			double r3 = r*r*r;
			if (r < .04 && useMagnetMove())
			    boundCheck = true;

			// dl x R = (lxx, lyy, lzz) X R
			//        = (lyy*rz-lzz*ry, lzz*rx-lxx*rz,
			//           lxx*ry-lyy*rx)
			// we are integrating by dl x Rhat/r^2, so we rewrite
			// that as dl x R / r^3.
			double cx = (lyy*rz-lzz*ry)/r3;
			double cy = (lzz*rx-lxx*rz)/r3;
			double cz = (lxx*ry-lyy*rx)/r3;
			result[0] += cx;
			result[1] += cy;
			result[2] += cz;
		    } else {
			result[0] += 6*lxx/r;
			result[1] += 6*lyy/r;
			result[2] += 6*lzz/r;
		    }
		}
	    }
	}
	int getViewPri(double cameraPos[], double x[]) {
	    return intersectCylinder(cameraPos, x[0], x[1], x[2], 2, false);
	}
	void render(Graphics g) {
	    renderItems(g, 2);
	    // draw particles inside cylinder; XXX
	    renderItems(g, 1);
	    g.setColor(darkYellow);
	    int jzz, i;
	    int steps = turns*48;
	    for (i = 0; i != steps; i++) {
		getToroidPoint(xpoints, ypoints, size1, size2, turns, i, 0);
		getToroidPoint(xpoints, ypoints, size1, size2, turns, i+1, 1);
		g.setColor(getCurrentColor(i));
		if (i == 50)
		    drawArrow(g, null, xpoints[0], ypoints[0],
			      xpoints[1], ypoints[1], 7);
		else
		    g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	    }
	    renderItems(g, 0);
	}
	void getToroidPoint(int xpoints[], int ypoints[], double size1,
			    double size2, int turns, int i, int n) {
	    int angct = 48;
	    double ang = pi*2*(i % angct)/angct;
	    double cosp = java.lang.Math.cos(ang);
	    double sinp = java.lang.Math.sin(ang);
	    double ang2 = (pi*2*(i/angct)+ang)/(turns*turnmult);
	    double cosa = java.lang.Math.cos(ang2);
	    double sina = java.lang.Math.sin(ang2);
	    map3d(cosa*(size1+size2*cosp),
		  sina*(size1+size2*cosp),
		  size2*sinp,
		  xpoints, ypoints, n);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new HorseshoeElectromagnetField(); }
    };
    class HorseshoeElectromagnetField extends ToroidalSolenoidField {
	HorseshoeElectromagnetField() { turnmult = 2; }
	String getName() { return "horseshoe electromagnet"; }
	void setup() {
	    setupBar(0, "Center Radius", 40);
	    setupBar(1, "Outer Radius", 50);
	    setupBar(2, "# of turns", 18);
	    setXYView();
	}
	VecFunction createNext() { return new SquareLoopField(); }
    };
    class SquareLoopField extends VecFunction {
	String getName() { return "square loop"; }
	double lstart, lstop, size;

	void setup() {
	    setupBar(0, "Loop Size", 60);
	    setXZView();
	}

	void setupFrame() {
	    size = aux1Bar.getValue()/100.;
	    lstart = -size;
	    lstop  =  size;
	}

	void getField(double result[], double y[]) {
	    getLoopField(result, y, 0, 1);
	}

	void getLineField(double result[], double y[], double offo,
			  double offt, int lcoord, int ocoord, int tcoord,
			  int dir) {
	    double a1 = lstart-y[lcoord];
	    double a2 = lstop-y[lcoord];
	    double r = distance2(y[ocoord]-offo, y[tcoord]-offt);
	    if (r < lineWidth && a1 <= 0 && a2 >= 0)
		boundCheck = true;
	    double y2 = r*r;
	    double a12 = a1*a1;
	    double a22 = a2*a2;
	    double a12y2 = java.lang.Math.sqrt(a12+y2);
	    double a22y2 = java.lang.Math.sqrt(a22+y2);
	    if (showA) {
		if (lcoord < ocoord)
		    dir = -dir;
		result[lcoord] +=
		    dir*.0003*java.lang.Math.log((a2+a22y2)/(a1+a12y2))/size;
		return;
	    }
	    double q = dir*.0001/size;
	    double fth =
		q* (-1/(a12+y2+a1*a12y2)+1/(a22+y2+a2*a22y2));
	    result[tcoord] += fth*(y[ocoord]-offo);
	    result[ocoord] -= fth*(y[tcoord]-offt);
	}

	void getLoopField(double result[], double y[], double zoff, int dir) {
	    result[0] = result[1] = result[2] = 0;
	    getLineField(result, y,  size, zoff, 0, 1, 2,  dir);
	    getLineField(result, y, -size, zoff, 0, 1, 2, -dir);
	    getLineField(result, y,  size, zoff, 1, 0, 2,  dir);
	    getLineField(result, y, -size, zoff, 1, 0, 2, -dir);
	}
	boolean checkBounds(double y[], double oldY[]) {
	    if (!useMagnetMove())
		return false;
	    if ((y[2] > 0 && oldY[2] < 0) ||
		(y[2] < 0 && oldY[2] > 0)) {
		if (y[0] < size  && y[1] < size &&
		    y[0] > -size && y[1] > -size)
		    return true;
	    }
	    return false;
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	    g.setColor(darkYellow);
	    map3d(-size, -size, 0, xpoints, ypoints, 0);
	    map3d(+size, -size, 0, xpoints, ypoints, 1);
	    map3d(+size, +size, 0, xpoints, ypoints, 2);
	    map3d(-size, +size, 0, xpoints, ypoints, 3);
	    int i;
	    for (i = 0; i != 4; i++) {
		int j = (i + 1) & 3;
		drawCurrentLine(g, xpoints[i], ypoints[i],
				xpoints[j], ypoints[j], 8, i == 0, 1);
	    }
	    renderItems(g, 1);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectZPlane(cameraPos, 0, x[0], x[1], x[2]) == 0)
		return 1;
	    return 0;
	}
	boolean noSplitFieldVectors() { return false; }
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new RectLoopField(); }
    };
    class RectLoopField extends SquareLoopField {
	String getName() { return "rectangular loop"; }
	double sizeX, sizeY;

	void setup() {
	    setupBar(0, "Loop Width", 60);
	    setupBar(1, "Loop Depth", 40);
	    setXZView();
	}

	void setupFrame() {
	    sizeX = aux1Bar.getValue()/100.+.01;
	    sizeY = aux2Bar.getValue()/100.+.01;
	}

	void getField(double result[], double y[]) {
	    result[0] = result[1] = result[2] = 0;
	    lstart = -sizeX;
	    lstop  =  sizeX;
	    size = sizeY;
	    getLineField(result, y,  sizeY, 0, 0, 1, 2,  1);
	    getLineField(result, y, -sizeY, 0, 0, 1, 2, -1);
	    lstart = -sizeY;
	    lstop  =  sizeY;
	    size = sizeX;
	    getLineField(result, y,  sizeX, 0, 1, 0, 2,  1);
	    getLineField(result, y, -sizeX, 0, 1, 0, 2, -1);
	}

	boolean checkBounds(double y[], double oldY[]) {
	    if (!useMagnetMove())
		return false;
	    if ((y[2] > 0 && oldY[2] < 0) ||
		(y[2] < 0 && oldY[2] > 0)) {
		if (y[0] < sizeX  && y[1] < sizeY &&
		    y[0] > -sizeX && y[1] > -sizeY)
		    return true;
	    }
	    return false;
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	    g.setColor(darkYellow);
	    map3d(-sizeX, -sizeY, 0, xpoints, ypoints, 0);
	    map3d(+sizeX, -sizeY, 0, xpoints, ypoints, 1);
	    map3d(+sizeX, +sizeY, 0, xpoints, ypoints, 2);
	    map3d(-sizeX, +sizeY, 0, xpoints, ypoints, 3);
	    int i;
	    for (i = 0; i != 4; i++) {
		int j = (i + 1) & 3;
		drawCurrentLine(g, xpoints[i], ypoints[i],
				xpoints[j], ypoints[j], 8, i == 0, 1);
	    }
	    renderItems(g, 1);
	}
	VecFunction createNext() { return new CornerField(); }
    };
    class CornerField extends SquareLoopField {
	String getName() { return "corner"; }
	void setup() {
	    setXZView();
	    setupBar(0, "Offset", 50);
	}
	double offset;
	void setupFrame() {
	    size = 2;
	    offset = aux1Bar.getValue()/50.-1;
	    lstart = offset;
	    lstop = 10+offset;
	}

	void getField(double result[], double y[]) {
	    result[0] = result[1] = result[2] = 0;
	    getLineField(result, y, offset, 0, 0, 1, 2, -1);
	    getLineField(result, y, offset, 0, 1, 0, 2, -1);
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	    g.setColor(darkYellow);
	    map3d(offset, offset, 0, xpoints, ypoints, 0);
	    map3d(1,      offset, 0, xpoints, ypoints, 1);
	    map3d(offset, 1,      0, xpoints, ypoints, 2);
	    drawCurrentLine(g,
			    xpoints[0], ypoints[0],
			    xpoints[1], ypoints[1], 8, true, 1);
	    drawCurrentLine(g,
			    xpoints[2], ypoints[2],
			    xpoints[0], ypoints[0], 8, false, 1);
	    renderItems(g, 1);
	}
	VecFunction createNext() { return new MagneticSphereB(); }
    };
    class MagneticSphereB extends VecFunction {
	String getName() { return "magnetic sphere"; }
	void getField(double result[], double y[]) {
	    double a = aux1Bar.getValue()/100.;
	    double r = distanceArray(y);
	    if (r < a) {
		boundCheck = true;
		result[0] = result[1] = result[2] = 0;
		return;
	    }
	    double rz = distance2(y[0], y[1]);
	    double costh = y[2]/r;
	    double sinth = rz/r;
	    double sinph = y[1]/rz;
	    double cosph = y[0]/rz;
	    if (!showA) {
		// rhat  = (sinth*cosph, sinth*sinph, costh)
		// thhat = (costh*cosph, costh*sinph, -sinth)
		double r3 = .003*a*a*a/(r*r*r);
		double eth = 2*sinth*r3;
		double er  =   costh*r3;
		result[0] = sinth*cosph*er + costh*cosph*eth;
		result[1] = sinth*sinph*er + costh*sinph*eth;
		result[2] = costh      *er - sinth*      eth;
	    } else {
		// phhat = (-sinph, cosph, 0)
		double aph = .003*a*a*a*sinth/(r*r);
		result[0] = -sinph*aph;
		result[1] =  cosph*aph;
		result[2] = 0;
	    }
	}
	void setup() {
	    setupBar(0, "Sphere Size", 50);
	    setXZView();
	}
	void render(Graphics g) {
	    double a = aux1Bar.getValue()/100.;
	    fillSphere(g, a, 0);
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    double a = aux1Bar.getValue()/100.;
	    return intersectSphere(cameraPos, x[0], x[1], x[2], a);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new MonopoleAttempt(); }
    };
    class MonopoleAttempt extends SquareLoopField {
	String getName() { return "monopole attempt"; }
	double tres[][], yflip[], rad, size;
	int count;
	MonopoleAttempt() {
	    tres = new double[8][3];
	    yflip = new double[3];
	}
	void setup() {
	    setXZView();
	    setupBar(0, "Loop Size", 40);
	    setupBar(1, "Separation", 10);
	    setupBar(2, "Loop Count", 100);
	    dispChooser.select(DISP_VECTORS);
	}
	void setupFrame() {
	    super.setupFrame();
	    size = (aux1Bar.getValue())/100.;
	    rad = aux2Bar.getValue()/100. + size;
	    count = (aux3Bar.getValue()*6)/101 + 1;
	}
	void drawLoop(Graphics g) {
	    int i;
	    for (i = 0; i != 4; i++) {
		int j = (i + 1) & 3;
		drawCurrentLine(g, xpoints[i], ypoints[i],
				xpoints[j], ypoints[j], 8, i == 0, 1);
	    }
	}
	void render(Graphics g) {
	    renderItems(g, 0);
	    g.setColor(darkYellow);
	    double size = aux1Bar.getValue()/100.;

	    int i;
	    int ct = count;
	    for (i = -1; i <= 1; i += 2) {
		if (--ct < 0)
		    break;
		map3d(-size,   -size,   rad*i, xpoints, ypoints, 0);
		map3d(+size*i, -size*i, rad*i, xpoints, ypoints, 1);
		map3d(+size,   +size,   rad*i, xpoints, ypoints, 2);
		map3d(-size*i, +size*i, rad*i, xpoints, ypoints, 3);
		drawLoop(g);
	    }

	    for (i = -1; i <= 1; i += 2) {
		if (--ct < 0)
		    break;
		map3d(-size,   rad*i, -size,   xpoints, ypoints, 0);
		map3d(-size*i, rad*i, +size*i, xpoints, ypoints, 1);
		map3d(+size,   rad*i, +size,   xpoints, ypoints, 2);
		map3d(+size*i, rad*i, -size*i, xpoints, ypoints, 3);
		drawLoop(g);
	    }

	    for (i = -1; i <= 1; i += 2) {
		if (--ct < 0)
		    break;
		map3d(rad*i, -size,   -size,   xpoints, ypoints, 0);
		map3d(rad*i, +size*i, -size*i, xpoints, ypoints, 1);
		map3d(rad*i, +size,   +size,   xpoints, ypoints, 2);
		map3d(rad*i, -size*i, +size*i, xpoints, ypoints, 3);
		drawLoop(g);
	    }

	    renderItems(g, 1);
	}
	void getField(double result[], double y[]) {
	    int i;
	    for (i = 0; i != 6; i++)
		tres[i][0] = tres[i][1] = tres[i][2] = 0;
	    getLoopField(tres[0], y, -rad, -1);
	    if (count > 1)
		getLoopField(tres[1], y,  rad,  1);
	    yflip[1] = y[0];
	    yflip[2] = y[1];
	    yflip[0] = y[2];
	    if (count > 2)
		getLoopField(tres[2], yflip, -rad, -1);
	    if (count > 3)
		getLoopField(tres[3], yflip,  rad,  1);
	    yflip[2] = y[0];
	    yflip[0] = y[1];
	    yflip[1] = y[2];
	    if (count > 4)
		getLoopField(tres[4], yflip, -rad, -1);
	    if (count > 5)
		getLoopField(tres[5], yflip,  rad,  1);
	    for (i = 0; i != 3; i++)
		result[i] = tres[0][i] + tres[1][i] +
		    tres[2][(i+1)%3] + tres[3][(i+1)%3] +
		    tres[4][(i+2)%3] + tres[5][(i+2)%3];
	}
	VecFunction createNext() { return null; }
    };
    class InverseSquaredRadialSphere extends VecFunction {
	String getName() { return "1/r^2 sphere"; }
	double getSize() { return (aux1Bar.getValue()+1)/110.; }
	void getField(double result[], double y[]) {
	    double r = distanceArray(y);
	    if (r < .01)
		boundCheck = true;
	    double a = getSize();
	    if (getPot) {
		result[0] = .1*((r > a) ? -1/r : -3/(2*a)+r*r/(2*a*a*a));
		return;
	    }
	    if (r < a)
		r = a;
	    double alpha = .0003/(r*r*r);
	    result[0] = -y[0]*alpha;
	    result[1] = -y[1]*alpha;
	    result[2] = -y[2]*alpha;
	}
	void setup() {
	    setupBar(0, "Sphere Size", 70);
	}

	void render(Graphics g) {
	    renderSphere(g, getSize());
	}
	int getViewPri(double cameraPos[], double x[]) {
	    return intersectSphere(cameraPos, x[0], x[1], x[2], getSize());
	}
	boolean noSplitFieldVectors() { return false; }
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new ConstRadial(); }
    };
    class ConstRadial extends InverseSquaredRadial {
	String getName() { return "const radial"; }
	void getField(double result[], double y[]) {
	    double r = distanceArray(y);
	    if (r < chargeSize)
		boundCheck = true;
	    double q = .0003/r;
	    if (getPot) {
		result[0] = r-1;
		return;
	    }
	    result[0] = -q*y[0];
	    result[1] = -q*y[1];
	    result[2] = -q*y[2];
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
	    if (getPot) {
		result[0] = r*r-1;
		return;
	    }
	    double k = .0003;
	    result[0] = -y[0]*k;
	    result[1] = -y[1]*k;
	    result[2] = -y[2]*k;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new ConstantToZAxis(); }
    };

    class ConstantToZAxis extends InverseRadial {
	String getName() { return "constant to z axis"; }
	void getField(double result[], double y[]) {
	    double r = distance2(y[0], y[1]);
	    if (r < lineWidth)
		boundCheck = true;
	    if (getPot) {
		result[0] = r-1;
		return;
	    }
	    double q = .0003/r;
	    result[0] = -y[0]*q;
	    result[1] = -y[1]*q;
	    result[2] = 0;
	}
	void setup() {
	    setXYView();
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new ConstantToXYPlane(); }
    };
    class ConstantToXYPlane extends VecFunction {
	String getName() { return "constant to xy plane"; }
	void getField(double result[], double y[]) {
	    double alpha = .0003;
	    if (y[2] > -.01 && y[2] < .01)
		boundCheck = true;
	    if (getPot) {
		result[0] = java.lang.Math.abs(y[2])-1;
		return;
	    }
	    result[0] = 0;
	    result[1] = 0;
	    result[2] = (y[2] < 0) ? alpha : -alpha;
	}
	void setup() {
	    setXZView();
	}
	void render(Graphics g) {
	    renderItems(g, 1);
	    drawPlane(g, 1, 1, 0);
	    renderItems(g, 0);
	}
	int getViewPri(double cameraPos[], double x[]) {
	    if (intersectZPlane(cameraPos, 0, x[0], x[1], x[2]) == 0)
		return 0;
	    return 1;
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new LinearToZAxis(); }
    };
    class LinearToZAxis extends InverseRadial {
	String getName() { return "linear to z axis"; }
	void getField(double result[], double y[]) {
	    double r = distance2(y[0], y[1]);
	    if (r < lineWidth)
		boundCheck = true;
	    if (getPot) {
		result[0] = r*r-1;
		return;
	    }
	    double q = .0003;
	    result[0] = -y[0]*q;
	    result[1] = -y[1]*q;
	    result[2] = 0;
	}
	void setup() {
	    setXYView();
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new LinearToXYPlane(); }
    };
    class LinearToXYPlane extends ConstantToXYPlane {
	String getName() { return "linear to xy plane"; }
	void getField(double result[], double y[]) {
	    if (getPot) {
		result[0] = y[2]*y[2]-1;
		return;
	    }
	    if (y[2] > -.01 && y[2] < .01)
		boundCheck = true;
	    double alpha = .0003;
	    result[0] = 0;
	    result[1] = 0;
	    result[2] = -alpha*y[2];
	}
	void setup() {
	    setXYView();
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new LinearToYZXZPlane(); }
    };
    class LinearToYZXZPlane extends VecFunction {
	String getName() { return "linear to yz, xz planes"; }
	void getField(double result[], double y[]) {
	    if (y[0] > -.01 && y[0] < .01)
		boundCheck = true;
	    if (y[1] > -.01 && y[1] < .01)
		boundCheck = true;
	    double alpha = .0003;
	    double r = java.lang.Math.sqrt((aux1Bar.getValue()+1)/51.);
	    if (getPot) {
		result[0] = (y[0]*y[0]*r+y[1]*y[1]/r)-1;
		return;
	    }
	    result[0] = -alpha*r*y[0];
	    result[1] = -alpha/r*y[1];
	    result[2] = 0;
	}
	void setup() {
	    setXYView();
	    setupBar(0, "X/Y Ratio", 50);
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new LinearToYZXZXYPlane(); }
    };
    class LinearToYZXZXYPlane extends VecFunction {
	String getName() { return "linear to yz, xz, xy planes"; }
	void getField(double result[], double y[]) {
	    if (y[2] > -.01 && y[2] < .01)
		boundCheck = true;
	    double alpha = .0003;
	    double r1 = (aux1Bar.getValue()+1)/51.;
	    double r2 = (aux2Bar.getValue()+1)/51.;
	    if (getPot) {
		result[0] = (y[0]*y[0]*r1+y[1]*y[1]+y[2]*y[2]/r2)-1;
		return;
	    }
	    result[0] = -alpha*r1*y[0];
	    result[1] = -alpha   *y[1];
	    result[2] = -alpha/r2*y[2];
	}
	void setup() {
	    setXYView();
	    setupBar(0, "X/Y Ratio", 50);
	    setupBar(1, "Y/Z Ratio", 50);
	}
	boolean checkBoundsWithForce() { return false; }
	VecFunction createNext() { return new InverseToXYPlane(); }
    };
    class InverseToXYPlane extends ConstantToXYPlane {
	String getName() { return "inverse to xy plane"; }
	void getField(double result[], double y[]) {
	    if (y[2] > -.01 && y[2] < .01)
		boundCheck = true;
	    double alpha = .0003;
	    double zz = y[2];
	    if (getPot) {
		result[0] = -.01/(zz*zz);
		return;
	    }
	    if (zz == 0)
		zz = .00001;
	    result[0] = 0;
	    result[1] = 0;
	    result[2] = -alpha/zz;
	}
	void setup() {
	    setXZView();
	}
	VecFunction createNext() { return new InverseSquareRotational(); }
    };
    class InverseSquareRotational extends InverseRadial {
	String getName() { return "1/r^2 rotational"; }
	void getField(double result[], double y[]) {
	    double r = distance2(y[0], y[1]);
	    if (r < lineWidth*2)
		boundCheck = true;
	    rotateParticle(result, y, .0001/(r*r*r));
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new LinearRotational(); }
    };
    class LinearRotational extends InverseRadial {
	String getName() { return "linear rotational"; }
	void setup() {
	    setXYViewExact();
	}
	void getField(double result[], double y[]) {
	    double q = .0003;
	    result[0] = -q*y[1];
	    result[1] =  q*y[0];
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new LinearRotationalA(); }
    };
    class LinearRotationalA extends InverseRadial {
	String getName() { return "fz=-(x^2+y^2)"; }
	void setup() {
	    setXZView();
	}
	void getField(double result[], double y[]) {
	    double q = .0003;
	    result[0] = result[1] = 0;
	    result[2] = -q*(y[0]*y[0]+y[1]*y[1]);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new ConstantRotational(); }
    };

    class ConstantRotational extends InverseRadial {
	String getName() { return "constant rotational"; }
	void setup() {
	    setXYViewExact();
	}
	void getField(double result[], double y[]) {
	    double r = distance2(y[0], y[1]);
	    rotateParticle(result, y, .0003/r);
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new ConstantRotationalA(); }
    };

    class ConstantRotationalA extends InverseRadial {
	String getName() { return "(0,0,-r)"; }
	void setup() {
	    setXZView();
	}
	void getField(double result[], double y[]) {
	    double r = distance2(y[0], y[1]);
	    result[0] = result[1] = 0;
	    result[2] = -.0006*r;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new Helical(); }
    };

    class Helical extends InverseRadial {
	String getName() { return "helical"; }
	void setup() {
	    setXZView();
	    setupBar(0, "Z Speed", 30);
	}
	void getField(double result[], double y[]) {
	    double q= .0003;
	    result[0] = -q*y[1];
	    result[1] =  q*y[0];
	    result[2] =  .00001*aux1Bar.getValue();
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new FxEqualsYField(); }
    };

    class FxEqualsYField extends VecFunction {
	String getName() { return "fx=y"; }
	void getField(double result[], double y[]) {
	    result[2] = result[1] = 0;
	    result[0] = y[1] * .0006;
	}
	void setup() {
	    setXYView();
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new FxEqualsY2(); }
    };

    class FxEqualsY2 extends VecFunction {
	String getName() { return "fx=y2"; }
	void getField(double result[], double y[]) {
	    result[2] = result[1] = 0;
	    result[0] = y[1]*y[1] * .001;
	}
	void setup() {
	    setXYView();
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new LinearZRotational(); }
    };

    class LinearZRotational extends VecFunction {
	String getName() { return "(-yz,xz,0)"; }
	void setup() {
	    setXZView();
	}
	void getField(double result[], double y[]) {
	    double q = .001*y[2];
	    result[0] = -q*y[1];
	    result[1] =  q*y[0];
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new YzXz0Field(); }
    };

    class YzXz0Field extends VecFunction {
	String getName() { return "(yz,xz,0)"; }
	void setup() {
	    setXZView();
	}
	void getField(double result[], double y[]) {
	    double q = .0006*y[2];
	    result[0] = q*y[1];
	    result[1] = q*y[0];
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new XY_2ZField(); }
    };

    class XY_2ZField extends VecFunction {
	String getName() { return "(-x,-y,2z)"; }
	void setup() {
	    setXZView();
	}
	void getField(double result[], double y[]) {
	    double q = .0006;
	    result[0] = q*y[0];
	    result[1] = q*y[1];
	    result[2] = -2*q*y[2];
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new XY0Field(); }
    };

    class XY0Field extends VecFunction {
	String getName() { return "(-x,y,0)"; }
	void setup() {
	    setXYView();
	}
	void getField(double result[], double y[]) {
	    double q = .0006;
	    result[0] = -q*y[0];
	    result[1] =  q*y[1];
	    result[2] = 0;
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new RotationalExpansion(); }
    };

    class RotationalExpansion extends VecFunction {
	String getName() { return "(x-y,x+y,0)"; }
	void getField(double result[], double y[]) {
	    double q = .0003;
	    result[0] = q*(y[0]-y[1]);
	    result[1] = q*(y[0]+y[1]);
	    result[2] = 0;
	}
	void setup() {
	    setXYView();
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new RotationalExpansion3D(); }
    };
    class RotationalExpansion3D extends VecFunction {
	String getName() { return "(x-y,x+y,2z)"; }
	void getField(double result[], double y[]) {
	    double q = .0003;
	    result[0] = q*(y[0]-y[1]);
	    result[1] = q*(y[0]+y[1]);
	    result[2] = q*(y[2]*2);
	}
	void setup() {
	    setXYView();
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return new RosslerAttractor(); }
    };
    class RosslerAttractor extends VecFunction {
	String getName() { return "Rossler attractor"; }
	void getField(double result[], double y[]) {
	    int scale = aux2Bar.getValue()*2+20;
	    double xx = y[0] * 24;
	    double yy = y[1] * 24;
	    double zz = (y[2]+.75) * scale;
	    double k = .00002;
	    double c = aux1Bar.getValue()*.1;
	    result[0] = -(yy+zz)*k;
	    result[1] = k*(xx+.2*yy);
	    result[2] = k*(.2+xx*zz-c*zz);
	}
	void setup() {
	    setXZView();
	    setupBar(0, "c", 80);
	    setupBar(1, "Z Scale", 36);
	    strengthBar.setValue(75);
	}
	boolean nonGradient() { return true; }
	boolean redistribute() { return false; }
	VecFunction createNext() { return new LorenzAttractor(); }
    };
    class LorenzAttractor extends VecFunction {
	String getName() { return "Lorenz attractor"; }
	void setup() {
	    setXZView();
	    setupBar(0, "Scale", 24);
	}
	void getField(double result[], double y[]) {
	    int scale = aux1Bar.getValue()/2 + 23;
	    double xx = y[0] * scale;
	    double yy = y[1] * scale;
	    double zz = y[2] * scale + scale;
	    double k = .00002;
	    result[0] = (-10*xx+10*yy)*k;
	    result[1] = k*(28*xx-yy-xx*zz);
	    result[2] = k*(-(8./3.)*zz+xx*yy);
	}
	boolean nonGradient() { return true; }
	boolean redistribute() { return false; }
	VecFunction createNext() { return new UserDefinedPotential(); }
    };
    class UserDefinedPotential extends VecFunction {
	Expr expr;
	double y0[];
	String getName() { return "user-defined potential"; }
	void setup() {
	    setXZView();
	    textFields[0].setText("x*x-z*z");
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
	}
	void getField(double result[], double y[]) {
	    double k = .00001;
	    int i;
	    for (i = 0; i != 3; i++)
		y0[i] = y[i];
	    double pot0 = expr.eval(y0);
	    if (getPot) {
		result[0] = pot0*.01;
		return;
	    }

	    y0[0] += k;
	    result[0] = pot0-expr.eval(y0);
	    y0[0] = y[0];

	    y0[1] += k;
	    result[1] = pot0-expr.eval(y0);
	    y0[1] = y[1];
	    
	    y0[2] += k;
	    result[2] = pot0-expr.eval(y0);
	    for (i = 0; i != 3; i++)
		if (!(result[i] > -10 && result[i] < 10))
		    boundCheck = true;
	}
	VecFunction createNext() { return new UserDefinedFunction(); }
    };
    class UserDefinedFunction extends VecFunction {
	Expr exprs[];
	String getName() { return "user-defined field"; }
	void setup() {
	    setXZView();
	    exprs = new Expr[3];
	    textFields[0].setText("x");
	    textFields[1].setText("y");
	    textFields[2].setText("z");
	    textFieldLabel.setText("Field Functions");
	    textFieldLabel.show();
	    int i;
	    for (i = 0; i != 3; i++)
		textFields[i].show();
	    actionPerformed();
	}
	void actionPerformed() {
	    int i;
	    parseError = false;
	    for (i = 0; i != 3; i++) {
		ExprParser ep = new ExprParser(textFields[i].getText());
		exprs[i] = ep.parseExpression();
		if (ep.gotError())
		    parseError = true;
	    }
	}
	void getField(double result[], double y[]) {
	    double k = .0002;
	    int i;
	    for (i = 0; i != 3; i++) {
		result[i] = k*exprs[i].eval(y);
		if (!(result[i] > -10 && result[i] < 10))
		    boundCheck = true;
	    }
	}
	boolean nonGradient() { return true; }
	VecFunction createNext() { return null; }
    };

    class DrawData {
	public Graphics g;
	public double mult;
	public double field[], vv[];
    };

    class Particle {
	public double pos[];
	public double vel[];
	public int viewPri;
	public double lifetime;
	public double phi, theta, phiv, thetav;
	public double stepsize;
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
	case E_Z:   return es[2]*10;
	case E_R:   return java.lang.Math.sqrt(
			      es[0]*es[0]+es[1]*es[1]+es[2]*es[2])*10;
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
	if (skip("z"))
	    return new Expr(Expr.E_Z);
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
}
}
