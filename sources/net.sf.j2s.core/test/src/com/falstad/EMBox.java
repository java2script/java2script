package com.falstad;

//web_Ready
//web_AppletName= EMBox
//web_Description= A simulation of standing electromagnetic waves in a 3-d rectangular box.
//web_JavaVersion= http://www.falstad.com/embox/
//web_AppletImage= embox.png
//web_Category= Physics - Electromagnetics
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, AWT-to-Swing

//EMBox.java (c) 2001 by Paul Falstad, www.falstad.com.
//Rendering algorithm in this applet is based on the description of
//the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
//We raytrace through a 3-d dataset, sampling a number of points and
//integrating over them using Simpson's rule.

//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//import javax.swing.applet.Applet --> a2s
//
//import java.awt [Applet, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
//Changed paint() to paintComponent() in EMBoxCanvas and EMBoxFrame
//
//Added Container main
//
//Changed add() to main.add()
//
//resize and show --> useFrame options
//
//added triggerShow()
//
//added paint() to applet class

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
import java.util.Random;

import a2s.Applet;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Scrollbar;

class EMBoxCanvas extends Canvas {
    EMBoxFrame pg;
    EMBoxCanvas(EMBoxFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateEMBox(g);
    }
    public void paintComponent(Graphics g) {
	pg.updateEMBox(g);
    }
};

class EMBoxLayout implements LayoutManager {
    public EMBoxLayout() {}
    public void addLayoutComponent(String name, Component c) {}
    public void removeLayoutComponent(Component c) {}
    public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 550);
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

public class EMBox extends Applet {
    static EMBoxFrame oc;
    void destroyFrame() {
	if (oc != null) 
	    oc.dispose();
	oc = null;
    }
    
    void showFrame() {
    	if (oc == null) {
    	    started = true;
    	    oc = new EMBoxFrame(this);
    	    oc.init();
    	    repaint();
    	}
     }
    
    boolean started = false;
    public void init() {
	oc = new EMBoxFrame(this);
	oc.init();
    }
    public static void main(String args[]) {
        oc = new EMBoxFrame(null);
        oc.init();
    }
    public void destroy() {
	if (oc != null)
	    oc.dispose();
	oc = null;
    }
    
    public void paint(Graphics g) {
    	super.paint(g);
    	String s = "Applet is open in a separate window.";
    	if (!started)
    	    s = "Applet is starting.";
    	else if (oc == null)
    	    s = "Applet is finished.";
    	else if (oc.useFrame)
			oc.triggerShow();
    	if(oc == null || oc.useFrame)
    		g.drawString(s, 10, 30);
     }
};

class EMBoxFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    Random random;
    int gridSizeX = 200;
    int gridSizeY = 200;
    
    public String getAppletInfo() {
	return "EMBox by Paul Falstad";
    }

    Button clearButton;
    Button resetPartButton;
    static boolean waveguide;
    Checkbox stoppedCheck;
    Checkbox stopOscCheck;
    Checkbox spectrumCheck;
    Checkbox sidesCheck;
    Choice modeChooser;
    Choice sliceChooser;
    Choice emChooser;
    Choice dispChooser;
    static final int EMCHOICE_E = 0;
    static final int EMCHOICE_B = 1;
    static final int EMCHOICE_EB = 2;
    static final int EMCHOICE_J = 3;
    static final int EMCHOICE_Q = 4;
    static final int DISP_PART = 0;
    static final int DISP_FIELD_MAG = 1;
    static final int DISP_FIELD_X = 2;
    static final int DISP_FIELD_Y = 3;
    static final int DISP_FIELD_Z = 4;
    static final int DISP_FIELD_COL = 5;
    static final int DISP_VECTORS = 6;
    Scrollbar speedBar;
    Scrollbar partSpeedBar;
    Scrollbar resolutionBar;
    Scrollbar vecDensityBar;
    Scrollbar brightnessBar;
    Scrollbar widthBar;
    Scrollbar heightBar;
    Scrollbar partCountBar;
    Scrollbar freqBar;
    double dragZoomStart;
    double zoom = 6.5;
    double sliceval = 0;
    double rotmatrix[];
    double cameraPos[];
    double selectedMinOmega;
    double selectedMaxOmega;
    Rectangle view3d, view3d_e, view3d_b, viewAxes;
    Rectangle viewSpectrum;
    Rectangle viewFreq[];
    double colorMult;
    static final double pi = 3.14159265358979323846;
    static final double pi2 = pi*2;
    static final int gridsize = 80;
    static final double densitygroupsize = 1.01/2;
    static final int densitygridsize = 4;
    static final int maxParticleCount = 1000;
    int vectorSpacing = 16;
    int xpoints[];
    int ypoints[];
    int slicerPoints[][];
    double sliceFaces[][];
    double sliceFace[];
    Particle particles[];
    int density[][][];
    int spectrum[];
    static final int spectrumSpacing = 60;
    float func[][][];
    double boxwidth = 2;
    double boxheight = 2;
    double boxdepth = 2;
    int boxGuideMult = 1;
    boolean dragging = false;
    boolean selectedSlice;
    MemoryImageSource imageSource;
    int pixels[];
    int maxTerms = 16;
    int maxModes = 10;
    int maxDispCoefs = 5;
    int maxZDispCoefs = 5;
    int viewDistance = 12;
    Mode modes[];
    int modeCount = 0;
    int pause;
    EMBox applet;
    int selection = -1;
    static final int SEL_NONE = 0;
    static final int SEL_3D = 1;
    static final int SEL_MAG = 2;
    static final int SEL_SPECTRUM = 3;
    static final int MODE_ANGLE = 0;
    static final int MODE_ZOOM = 1;
    static final int SLICE_NONE = 0;
    static final int SLICE_X = 1;
    static final int SLICE_Y = 2;
    static final int SLICE_Z = 3;
    int selectedCoefX = -1;
    int selectedCoefY;
    int selectedCoefZ;
    boolean selectedCoefTEMode;
    static final int sampleCount = 15;
    int sampleMult[];
    int curfieldno;
    double magDragStart;
    int dragX, dragY, oldDragX, oldDragY, dragStartX, dragStartY;
    double t = 0;
    public static final double epsilon = .00001;
    public static final double epsilon2 = .003;
    int sidemap[][];

    class DynControl {
	DynControl(Scrollbar s, Label l, int df) {
	    bar = s; label = l; flags = 1<<df;
	}
	DynControl(Scrollbar s, Label l, int df, int df2) {
	    bar = s; label = l; flags = (1<<df) | (1<<df2);
	}
	public Scrollbar bar;
	public Label label;
	public int flags;
    };
    DynControl dynControls[];

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    EMBoxCanvas cv;
    
    public boolean useFrame;
    boolean showControls;
	Container main;


    EMBoxFrame(EMBox a) {
	super("EM Modes Applet");
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
		
	String os = System.getProperty("os.name");
	String jv = System.getProperty("java.version");
	boolean altRender = false;
	int res = 54;
	// change settings to speed things up where possible
	if (os.indexOf("Windows") == 0) {
	    res = 100;
	    if (jv.indexOf("1.1") == 0)
		altRender = true;
	}
	
	main.setLayout(new EMBoxLayout());
	cv = new EMBoxCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);

	main.add(clearButton = new Button("Clear"));
	clearButton.addActionListener(this);
	
	main.add(resetPartButton = new Button("Reset Particles"));
	resetPartButton.addActionListener(this);
	
	stoppedCheck = new Checkbox("Stop");
	stoppedCheck.addItemListener(this);
	main.add(stoppedCheck);

	stopOscCheck = new Checkbox("Stop Oscillation");
	stopOscCheck.addItemListener(this);
	main.add(stopOscCheck);

	spectrumCheck = new Checkbox("Show Spectrum");
	spectrumCheck.addItemListener(this);
	main.add(spectrumCheck);

	sidesCheck = new Checkbox("Show Sides");
	sidesCheck.addItemListener(this);
	main.add(sidesCheck);

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
	
	emChooser = new Choice();
	emChooser.add("Show Electric Field");
	emChooser.add("Show Magnetic Field");
	emChooser.add("Show Both Fields");
	emChooser.add("Show Current");
	emChooser.add("Show Charge");
	emChooser.addItemListener(this);
	main.add(emChooser);
	
	dispChooser = new Choice();
	dispChooser.add("Show Particles on Field Lines");
	dispChooser.add("Show Field Magnitude");
	dispChooser.add("Show Field X");
	dispChooser.add("Show Field Y");
	dispChooser.add("Show Field Z");
	dispChooser.add("Show Field (tri-color)");
	dispChooser.add("Show Field Vectors");
	dispChooser.addItemListener(this);
	main.add(dispChooser);
	dispChooser.select(DISP_FIELD_COL);

	dynControls = new DynControl[6];

	main.add(new Label("Oscillation Speed", Label.CENTER));
	main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 15, 1, 1, 200));
	speedBar.addAdjustmentListener(this);

	Label lab;
	main.add(lab = new Label("Number of Particles", Label.CENTER));
	main.add(partCountBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, 500, 1, 1, 1000));
	partCountBar.addAdjustmentListener(this);
	dynControls[0] = new DynControl(partCountBar, lab, DISP_PART);

	main.add(lab = new Label("Particle Speed", Label.CENTER));
	main.add(partSpeedBar = new Scrollbar(Scrollbar.HORIZONTAL, 90, 1, 1, 200));
	partSpeedBar.addAdjustmentListener(this);
	dynControls[1] = new DynControl(partSpeedBar, lab, DISP_PART);

	main.add(lab = new Label("Brightness", Label.CENTER));
	main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 28,
					  1, 1, 200));
	brightnessBar.addAdjustmentListener(this);
	dynControls[2] = new DynControl(brightnessBar, lab,
					DISP_FIELD_MAG, DISP_VECTORS);

	main.add(lab = new Label("Image Resolution", Label.CENTER));
	main.add(resolutionBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 1, 20, 200));
	resolutionBar.addAdjustmentListener(this);
	dynControls[3] = new DynControl(resolutionBar, lab,
					DISP_FIELD_MAG);

	main.add(lab = new Label("Vector Density", Label.CENTER));
	main.add(vecDensityBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 2, 64));
	vecDensityBar.addAdjustmentListener(this);
	dynControls[4] = new DynControl(vecDensityBar, lab, DISP_VECTORS);

	main.add(new Label("Width", Label.CENTER));
	main.add(widthBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 31));
	widthBar.addAdjustmentListener(this);

	main.add(new Label("Height", Label.CENTER));
	main.add(heightBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 31));
	heightBar.addAdjustmentListener(this);
	
	Label freqLabel;
	main.add(freqLabel = new Label("Driving Frequency", Label.CENTER));
	main.add(freqBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 50));
	freqBar.addAdjustmentListener(this);

	main.add(new Label("http://www.falstad.com", Label.CENTER));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	if (applet == null)
	    waveguide = true;
	else {
	    String wg = applet.getParameter("waveguide");
	    waveguide = (wg != null && wg.equals("true"));
	}
	if (!waveguide)
	    vecDensityBar.setValue(16);
	
	if (waveguide) {
	    boxGuideMult = 3;
	    boxdepth *= boxGuideMult;
	    maxZDispCoefs = 2;
	    zoom = 3.25;
	    spectrumCheck.hide();
	} else {
	    freqBar.hide();
	    freqLabel.hide();
	}

	modes = new Mode[maxModes];
	addMode(1, 0, 1, true).magcoef = 1;

	slicerPoints = new int[2][5*2];
	sliceFaces = new double[4][3];
	
	rotmatrix = new double[9];
	rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
	rotate(-pi/2, 0);
	rotate(-pi/4, pi/4);
	xpoints = new int[4];
	ypoints = new int[4];

	density = new int[densitygridsize][densitygridsize][densitygridsize];

	// generate table of sample multipliers for efficient Simpson's rule
	int i;
	sampleMult = new int[sampleCount];
	for (i = 1; i < sampleCount; i += 2) {
	    sampleMult[i  ] = 4;
	    sampleMult[i+1] = 2;
	}
	sampleMult[0] = sampleMult[sampleCount-1] = 1;
	sidemap = new int[6][3];
	for (i = 0; i != 3; i++) {
	    sidemap[i*2  ][i] =  1;
	    sidemap[i*2+1][i] = -1;
	}

	random = new Random();
	particles = new Particle[maxParticleCount];
	for (i = 0; i != maxParticleCount; i++)
	    particles[i] = new Particle();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.white);
//	resize(500,550);
//	handleResize();
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
	setMaxTerms();
        Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	calcSpectrum();
	dbimage = createImage(d.width, d.height);
	setupDisplay();
	int w = view3d.width;
	if (emChooser.getSelectedIndex() == EMCHOICE_EB)
	    w = w/2;
	pixels = new int[w*view3d.height];
	int i;
	for (i = 0; i != w*view3d.height; i++)
	    pixels[i] = 0xFF000000;
	imageSource = new MemoryImageSource(w, view3d.height,
					    pixels, 0, w);
	resetParticles();
	setDynamicControls();
    }

    int getTermWidth() {
	return 8;
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
	int a = (int)((p.pos[0]+1)/densitygroupsize);
	int b = (int)((p.pos[1]+1)/densitygroupsize);
	int c = (int)((p.pos[2]+1)/densitygroupsize);
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
	int a = (int)((p.pos[0]+1)/densitygroupsize);
	int b = (int)((p.pos[1]+1)/densitygroupsize);
	int c = (int)((p.pos[2]+1)/densitygroupsize);
	try {
	    if (--density[a][b][c] < 0)
		System.out.print(a + " " + b + " " + c + " " + density[a][b][c] + "\n");
	} catch (Exception e) {
	    System.out.print(p.pos[0] + " " + p.pos[1] + " " + p.pos[2] + "\n");
	    e.printStackTrace();
	}
    }

    // find a position for a new particle.  We try to pick an area of
    // the box that is not too dense.
    void positionParticle(Particle p) {
	int x, y, z;
	int bestx = 0, besty = 0, bestz = 0;
	int best = 10000;

	// we avoid scanning the grid in the same order every time
	// so that we treat equal-density squares as equally as possible.
	int randaddx = getrand(densitygridsize);
	int randaddy = getrand(densitygridsize);
	int randaddz = getrand(densitygridsize);
	int gm1 = densitygridsize-1;
	for (x = 0; x != densitygridsize; x++)
	    for (y = 0; y != densitygridsize; y++)
		for (z = 0; z != densitygridsize; z++) {
		    int ix = (randaddx + x) % densitygridsize;
		    int iy = (randaddy + y) % densitygridsize;
		    int iz = (randaddz + z) % densitygridsize;
		    // if sides check is on, reject all particles not on sides
		    if (sidesCheck.getState() &&
			!(ix == 0 || ix == gm1 || iy == 0 || iy == gm1 ||
			  (!waveguide && (iz == 0 || iz == gm1))))
			continue;
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
	p.lifetime = 500;
	if (sidesCheck.getState()) {
	    int s = 0;
	    if (bestx == gm1)      s = 0;
	    else if (bestx == 0)   s = 1;
	    else if (besty == gm1) s = 2;
	    else if (besty == 0)   s = 3;
	    else if (bestz == gm1) s = 4;
	    else s = 5;
	    if (waveguide && s >= 4)
		p.lifetime = -1;
	    p.side = s;
	    p.pos[p.side/2] = sidemap[p.side][p.side/2];
	}
    }

    int getParticleCount() {
	return partCountBar.getValue();
    }

    // reset the particles to random locations
    void resetParticles() {
	int pcount = getParticleCount();
	int i, j, k;
	for (i = 0; i != pcount; i++) {
	    Particle p = particles[i];
	    for (j = 0; j != 3; j++)
		p.pos[j] = getrand(200)/100.0 - 1;
	    p.lifetime = i*2;
	    if (sidesCheck.getState()) {
		p.side = getrand(waveguide ? 4 : 6);
		p.pos[p.side/2] = sidemap[p.side][p.side/2];
	    }
	}
	resetDensityGroups();
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

    void setMaxTerms() {
	gridSizeX = gridSizeY = (resolutionBar.getValue() & ~1);
	maxTerms = gridSizeX;
	if (maxTerms > 100)
	    maxTerms = 100;
	func = new float[gridSizeX][gridSizeY][3];
	regenData();
    }

    // force all precomputed wave data to be regenerated
    void regenData() {
	int i;
	for (i = 0; i != modeCount; i++)
	    modes[i].modeDatas[0].data =
	      modes[i].modeDatas[1].data = null;
    }

    // set view rectangles for the various subwindows
    void setupDisplay() {
	int perColumn = 2;
	int perRow = maxZDispCoefs;
	int freqHeight = getTermWidth() * (maxDispCoefs+1) * perColumn;
	int spectrumHeight = (spectrumCheck.getState()) ?
	    getTermWidth()*6 : 0;
	view3d = new Rectangle(0, 0, winSize.width,
			       winSize.height-freqHeight-spectrumHeight);
	view3d_e = new Rectangle(view3d);
	view3d_e.width = view3d_e.width/2;
	view3d_b = new Rectangle(view3d);
	view3d_b.width = view3d_b.width/2;
	view3d_b.x += view3d_b.width;
	if (spectrumCheck.getState())
	    viewSpectrum = new Rectangle(0, view3d.height,
					 winSize.width, spectrumHeight);
	else
	    viewSpectrum = null;
	viewAxes = new Rectangle(winSize.width-100, 0, 100, 100);
	viewFreq = new Rectangle[maxZDispCoefs*2];
	int i;
	int winw = getTermWidth() * maxDispCoefs;
	int winh = winw;
	int pad = getTermWidth();
	int x = (winSize.width-(winw*4+pad*3))/2;
	for (i = 0; i != maxZDispCoefs*2; i++)
	    viewFreq[i] = new Rectangle(x+(i%perRow)*(winw+pad),
					view3d.height+spectrumHeight+
					  (i/perRow)*(winh+pad),
					winw, winh);
    }

    // compute func[][][] array (2-d view) by raytracing through
    // 3-d datasets (m.data[][][])
    void computeFunction(Rectangle view, int fieldno) {
	int i, j;
	double q = pi/maxTerms;
	double cost = java.lang.Math.cos(t);
	double izoom = 1/zoom;
	double rotm[] = rotmatrix;
	float boxhalfwidth = (float) boxwidth/2;
	float boxhalfheight = (float) boxheight/2;
	float boxhalfdepth = (float) boxdepth/2;
	double aratio = view.width/(double) view.height;
	int disp = dispChooser.getSelectedIndex();
	boolean doSides = sidesCheck.getState();
	int fnindex = fieldno;
	if (fieldno == EMCHOICE_Q) {
	    fnindex = EMCHOICE_E;
	    genData(EMCHOICE_E);
	    disp = -1;
	    doSides = true;
	} else if (fieldno == EMCHOICE_J) {
	    fnindex = EMCHOICE_B;
	    genData(EMCHOICE_B);
	    doSides = true;
	} else
	    genData(fieldno);
	for (i = 0; i != gridSizeX; i++)
	    for (j = 0; j != gridSizeY; j++) {
		// calculate camera position and direction
		double camx0 = 0;
		double camz0 = viewDistance;
		double camvx0 =  (2*i/(double) gridSizeX - 1)*izoom;
		double camvy0 = -(2*j/(double) gridSizeY - 1)*izoom;
		// preserve aspect ratio no matter what window dimensions
		if (aratio < 1)
		    camvy0 /= aratio;
		else
		    camvx0 *= aratio;
		// rotate camera with rotation matrix
		double camvz0 = -1;
		double camx  = rotm[0]*camx0+rotm[2]*camz0;
		double camy  = rotm[5]*camz0;
		double camz  = rotm[6]*camx0+rotm[8]*camz0;
		double camvx = rotm[0]*camvx0+rotm[1]*camvy0+rotm[2]*camvz0;
		double camvy = rotm[3]*camvx0+rotm[4]*camvy0+rotm[5]*camvz0;
		double camvz = rotm[6]*camvx0+rotm[7]*camvy0+rotm[8]*camvz0;
		float camnorm = (float)
		    java.lang.Math.sqrt(camvx*camvx+camvy*camvy+camvz*camvz);
		int n;
		float simpr = 0;
		float simpg = 0;
		float simpb = 0;
		// number of simpson's rule samples = 14
		int nmax = 14;
		// calculate intersections with planes containing box edges
		double tx1 = (-boxhalfwidth-camx)/camvx;
		double tx2 = ( boxhalfwidth-camx)/camvx;
		double ty1 = (-boxhalfheight-camy)/camvy;
		double ty2 = ( boxhalfheight-camy)/camvy;
		double tz1 = (-boxhalfdepth-camz)/camvz;
		double tz2 = ( boxhalfdepth-camz)/camvz;
		// calculate portion of line that intersects box
		float mint = (float)
		    (max(min(tx1, tx2),
			max(min(ty1, ty2), min(tz1, tz2)))+.001);
		float maxt = (float)
		    (min(max(tx1, tx2),
			min(max(ty1, ty2), max(tz1, tz2)))-.001);
		if (maxt < mint) {
		    // doesn't hit box
		    func[i][j][0] = func[i][j][1] = func[i][j][2] = 0;
		    continue;
		}
		// sample evenly along intersecting portion
		float tstep = (maxt-mint)/(sampleCount-1);
		float pathlen = (maxt-mint)*camnorm;
		float xmult = (float) (maxTerms/boxwidth);
		float ymult = (float) (maxTerms/boxheight);
		float zmult = (float) (maxTerms/boxdepth);
		int maxn = sampleCount;
		int slice = sliceChooser.getSelectedIndex();
		if (slice > 0) {
		    // calculate intersection with slice plane
		    double tx;
		    if (slice == SLICE_X)
			tx = (sliceval*boxhalfwidth-camx)/camvx;
		    else if (slice == SLICE_Y)
			tx = (sliceval*boxhalfheight-camy)/camvy;
		    else
			tx = (sliceval*boxhalfdepth-camz)/camvz;
		    if (tx < mint || tx > maxt) {
			// doesn't hit box
			func[i][j][0] = func[i][j][1] = func[i][j][2] = 0;
			continue;
		    }
		    mint = maxt = (float) tx;
		    pathlen = 2;
		    maxn = 1;
		}
		if (doSides) {
		    // this is a really inefficient way to do just the
		    // sides, but it's simple
		    maxn = 1;
		    pathlen = 4;
		}
		float fcamx = (float) camx;
		float fcamy = (float) camy;
		float fcamz = (float) camz;
		float fcamvx = (float) camvx;
		float fcamvy = (float) camvy;
		float fcamvz = (float) camvz;
		for (n = 0; n < maxn; n++) {
		    float t = mint+n*tstep;
		    float xx = fcamx+fcamvx*t;
		    float yy = fcamy+fcamvy*t;
		    float zz = fcamz+fcamvz*t;
		    // find grid element that contains sampled point
		    int xxi = (int) ((xx+boxhalfwidth )*xmult);
		    int yyi = (int) ((yy+boxhalfheight)*ymult);
		    int zzi = (int) ((zz+boxhalfdepth )*zmult);
		    int mi;
		    float fx = 0, fy = 0, fz = 0;
		    for (mi = 0; mi != modeCount; mi++) {
			ModeData md = modes[mi].modeDatas[fnindex];
			double fxymult = md.zmode_xymult[zzi];
			double  fzmult = md.zmode_zmult[zzi];
			fx += md.data[xxi][yyi][0]*fxymult;
			fy += md.data[xxi][yyi][1]*fxymult;
			fz += md.data[xxi][yyi][2]*fzmult;
		    }
		    if (fieldno == EMCHOICE_J) {
			float sw;
			// convert magnetic field to its curl
			if (xx < -.99)
			    { fx = 0; sw = fy; fy = -fz; fz = sw; }
			else if (xx > .99)
			    { fx = 0; sw = fy; fy = fz; fz = -sw; }
			else if (yy < -.99)
			    { fy = 0; sw = fx; fx = fz; fz = -sw; }
			else if (yy > .99)
			    { fy = 0; sw = fx; fx = -fz; fz = sw; }
			else if (zz < -.99 && !waveguide)
			    { fz = 0; sw = fx; fx = -fy; fy = sw; }
			else if (zz > .99 && !waveguide)
			    { fz = 0; sw = fx; fx = fy; fy = -sw; }
			else
			    fx = fy = fz = 0;
		    }
		    // doing color representation of vectors?
		    if (disp == DISP_FIELD_COL) {
			fx = java.lang.Math.abs(fx);
			fy = java.lang.Math.abs(fy);
			fz = java.lang.Math.abs(fz);
			simpr += sampleMult[n] * fx;
			simpg += sampleMult[n] * fy;
			simpb += sampleMult[n] * fz;
			continue;
		    }
		    float f = 0;
		    switch (disp) {
		    case DISP_FIELD_MAG:
			f = (float) java.lang.Math.sqrt(fx*fx+fy*fy+fz*fz);
			break;
		    case DISP_FIELD_X: f = fx; break;
		    case DISP_FIELD_Y: f = fy; break;
		    case DISP_FIELD_Z: f = fz; break;
		    case -1: // charge
			if (xx < -.99)
			    f = fx;
			else if (xx > .99)
			    f = -fx;
			else if (yy < -.99)
			    f = fy;
			else if (yy > .99)
			    f = -fy;
			else if (zz < -.99 && !waveguide)
			    f = fz;
			else if (zz > .99 && !waveguide)
			    f = -fz;
			else
			    f = 0;
			break;
		    }
		    if (f < 0) {
			f = java.lang.Math.abs(f);
			simpr += sampleMult[n] * f;
		    } else
			simpg += sampleMult[n] * f;
		}
		simpr *= pathlen/n;
		simpg *= pathlen/n;
		simpb *= pathlen/n;
		func[i][j][0] = simpr;
		func[i][j][1] = simpg;
		func[i][j][2] = simpb;
	    }
    }

    int sign(double x) {
	return x < 0 ? -1 : 1;
    }

//    public void paintComponent(Graphics g) {
//	cv.repaint();
//    }

    boolean allQuiet;

    public void updateEMBox(Graphics realg) {
	Graphics g = null;
	if (winSize == null || winSize.width == 0)
	    return;
	g = dbimage.getGraphics();
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());

	allQuiet = true;
	int disp = dispChooser.getSelectedIndex();
	if (!stoppedCheck.getState() && !stopOscCheck.getState()) {
	    int val = speedBar.getValue();
	    double tadd = val*(.1/25);
	    // slow things down if vectors or particles are selected
	    if (disp == DISP_VECTORS || disp == DISP_PART)
		tadd /= 4;
	    // add random crap into the time to avoid aliasing
	    tadd += val*getrand(20) * (.001091171/4);
	    t += tadd;
	    if (modeCount > 0)
		allQuiet = false;
	}
	
	int i, j, k;
	// evolve modes forward in time
	for (i = 0; i != modeCount; i++) {
	    Mode m = modes[i];
	    m.phasecoef = (m.omega*t+m.phasecoefadj) % (2*pi);
	    double phasecoefcos = java.lang.Math.cos(m.phasecoef);
	    double phasecoefsin = java.lang.Math.sin(m.phasecoef);
	    m.ephaseshift = (waveguide) ? -m.phasecoef : 0;
	    m.bphaseshift = (waveguide) ? -m.phasecoef : 0;
	    m.ephasemult = (waveguide) ? m.magcoef :
		phasecoefsin * m.magcoef;
	    m.bphasemult = (waveguide) ? m.magcoef :
		phasecoefcos * m.magcoef;
	    calcModeMults(m, true);
	}

	if (emChooser.getSelectedIndex() == EMCHOICE_EB) {
	    // display both fields by dividing view3d rectangle in half
	    doDisplay(view3d_b, g, EMCHOICE_B);
	    doDisplay(view3d_e, g, EMCHOICE_E);
	} else {
	    // display selected field
	    doDisplay(view3d, g, emChooser.getSelectedIndex());
	}

	g.setColor(Color.black);
	g.fillRect(0, view3d.height,
		   winSize.width, winSize.height-view3d.height);
	for (i = 0; i != maxZDispCoefs; i++) {
	    drawFrequencies(g, i, false);
	    drawFrequencies(g, i, true);
	}

	// display coordinate axes

	map3d(0, 0, 0, xpoints, ypoints, 0, viewAxes);

	Color defaultColor = (disp == DISP_FIELD_MAG || disp == DISP_PART) ?
	    Color.white : Color.gray;
	map3d(1, 0, 0, xpoints, ypoints, 1, viewAxes);
	g.setColor(disp == DISP_FIELD_COL ? Color.red :
		   disp == DISP_FIELD_X ? Color.green : defaultColor);
	drawArrow(g, "x", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	if (disp == DISP_FIELD_X) {
	    map3d(-1, 0, 0, xpoints, ypoints, 1, viewAxes);
	    g.setColor(Color.red);
	    drawArrow(g, null, xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	}

	map3d(0, 1, 0, xpoints, ypoints, 1, viewAxes);
	g.setColor(disp == DISP_FIELD_COL ? Color.green :
		   disp == DISP_FIELD_Y ? Color.green : defaultColor);
	drawArrow(g, "y", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	if (disp == DISP_FIELD_Y) {
	    map3d(0, -1, 0, xpoints, ypoints, 1, viewAxes);
	    g.setColor(Color.red);
	    drawArrow(g, null, xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	}

	map3d(0, 0, 1, xpoints, ypoints, 1, viewAxes);
	g.setColor(disp == DISP_FIELD_COL ? Color.blue :
		   disp == DISP_FIELD_Z ? Color.green : defaultColor);
	drawArrow(g, "z", xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	if (disp == DISP_FIELD_Z) {
	    map3d(0, 0, -1, xpoints, ypoints, 1, viewAxes);
	    g.setColor(Color.red);
	    drawArrow(g, null, xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
	}

	if (viewSpectrum != null) {
	    // draw spectrum
	    // modes can be identified either individually or by a
	    // frequency range.  We highlight whichever ones are selected.
	    double selw = (selectedCoefX == -1) ? 0 :
		getOmega(selectedCoefX, selectedCoefY, selectedCoefZ);
	    int selx = (int) (selw * spectrumSpacing);
	    int selmin = (int) (selectedMinOmega * spectrumSpacing);
	    int selmax = (int) (selectedMaxOmega * spectrumSpacing);
	    int ym = viewSpectrum.height - 10;
	    int y = viewSpectrum.y + viewSpectrum.height - 5;
	    for (i = 1; i != winSize.width; i++) {
		if (spectrum[i] == 0)
		    continue;
		int h = (int) (ym * (.2+java.lang.Math.log(spectrum[i])/4));
		if (h > ym)
		    h = ym;
		g.setColor((i == selx || (i >= selmin && i < selmax))
			   ? Color.yellow : Color.gray);
		g.drawLine(i, y, i, y-h);
	    }
	}

	if (selectedCoefX != -1) {
	    String s = "Selected mode = " +
		((selectedCoefTEMode) ? "TE (" : "TM (") +
		selectedCoefX + "," +
		selectedCoefY;
	    if (!waveguide)
		s += "," + selectedCoefZ;
	    s += ")";
	    FontMetrics fm = g.getFontMetrics();
	    g.setColor(Color.yellow);
	    int y = view3d.y + view3d.height - fm.getDescent() - 2;
	    g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
	}
	realg.drawImage(dbimage, 0, 0, this);
	
	// if something is happening, queue a repaint request
	if (!allQuiet)
	    cv.repaint(pause);
    }

    // display a field in the given rectangle
    void doDisplay(Rectangle view, Graphics g, int fieldno) {
	int i, j, k;
	boolean mis = true; // memoryImageSourceCheck.getState();
	colorMult = brightnessBar.getValue() * 3;
	int winw = view.width;
	int winh = view.height;
	boolean partDisplay = false;
	int slice = sliceChooser.getSelectedIndex();
	boolean sliced = (slice > 0);
	curfieldno = fieldno;

	drawCube(g, view, true);

	cameraPos = new double[3];
	unmap3d(cameraPos, view.width/2, view.height/2, viewDistance, view);

	int disp = dispChooser.getSelectedIndex();
	if (fieldno == EMCHOICE_Q)
	    disp = DISP_FIELD_MAG;
	if (disp == DISP_VECTORS) {
	    //
	    // vector display
	    //
	    int x, y, z;
	    Particle p = particles[0];
	    DrawData dd = new DrawData();
	    dd.mult = colorMult / 30.;
	    dd.g = g;
	    dd.view = view;
	    dd.fieldno = fieldno;
	    dd.realfieldno = fieldno;
	    if (fieldno == EMCHOICE_J)
		dd.fieldno = EMCHOICE_B;
	    vectorSpacing = vecDensityBar.getValue();
	    genData(dd.fieldno);

	    double slice01 = .5*sliceval+.5;
	    // don't know a more elegant way to do this...
	    if (sidesCheck.getState()) {
		drawVectorsX(0, dd);
		drawVectorsX(1, dd);
		drawVectorsY(0, dd);
		drawVectorsY(1, dd);
		if (!waveguide) {
		    drawVectorsZ(0, dd);
		    drawVectorsZ(1, dd);
		}
	    } else if (!sliced) {
		vectorSpacing = vectorSpacing/2;    // doing /= 2 may convert to float in js
		for (x = 0; x != vectorSpacing; x++) {
		    double xx = x*(1.0/(vectorSpacing-1));
		    for (y = 0; y != vectorSpacing; y++) {
			double yy = y*(1.0/(vectorSpacing-1));
			for (z = 0; z != vectorSpacing*boxGuideMult; z++) {
			    double zz = z*(1.0/(vectorSpacing*boxGuideMult-1));
			    drawVector(dd, xx, yy, zz);
			}
		    }
		}
	    } else if (slice == SLICE_X) {
		drawVectorsX(slice01, dd);
	    } else if (slice == SLICE_Y) {
		drawVectorsY(slice01, dd);
	    } else if (slice == SLICE_Z) {
		drawVectorsZ(slice01, dd);
	    }
	} else if (disp == DISP_PART) {
	    //
	    // particle display
	    //
	    int pcount = getParticleCount()/2;
	    int pstart = 0;
	    int f = (fieldno == EMCHOICE_J) ? 1 : fieldno;
	    pstart = pcount*f;
	    if (!stoppedCheck.getState()) {
		moveParticles(pstart, pcount);
		allQuiet = false;
	    }
	    g.setColor(Color.white);
	    for (i = pstart; i != pcount+pstart; i++) {
		Particle p = particles[i];
		double pos[] = p.pos;
		map3d(pos[0], pos[1], pos[2], xpoints, ypoints, 0, view);
		if (xpoints[0] < 0 || xpoints[0] >= winSize.width ||
		    ypoints[0] < 0 || ypoints[0] >= winSize.height)
		    continue;
		g.fillRect(xpoints[0], ypoints[0]-1, 2, 2);
	    }
	} else if (modeCount > 0) {
	    //
	    // raytraced display
	    //
	    computeFunction(view, fieldno);
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    int x = i*winw/gridSizeX;
		    int y = j*winh/gridSizeY;
		    int x2 = (i+1)*winw/gridSizeX;
		    int y2 = (j+1)*winh/gridSizeY;
		    int colval = 0xFF000000 +
			(getColorValue(i, j, 0) << 16) |
			(getColorValue(i, j, 1) << 8) |
			(getColorValue(i, j, 2));
		    if (mis) {
			int l;
			for (k = x; k < x2; k++)
			    for (l = y; l < y2; l++)
				pixels[k+l*winw] = colval;
		    } else {
			g.setColor(new Color(colval));
			g.fillRect(view.x+x, view.y+y, x2-x, y2-y);
		    }
		}
	    if (mis) {
		Image dbimage2 = cv.createImage(imageSource);
		g.drawImage(dbimage2, view.x, view.y, null);
	    }
	}

	drawCube(g, view, false);
    }

    void drawVectorsX(double slice01, DrawData dd) {
	int y, z;
	for (z = 0; z != vectorSpacing*boxGuideMult; z++)
	    for (y = 0; y != vectorSpacing; y++) {
		double xx = slice01;
		double yy = y*(1.0/(vectorSpacing-1));
		double zz = z*(1.0/(vectorSpacing*boxGuideMult-1));
		drawVector(dd, xx, yy, zz);
	    }
    }

    void drawVectorsY(double slice01, DrawData dd) {
	int x, z;
	for (x = 0; x != vectorSpacing; x++)
	    for (z = 0; z != vectorSpacing*boxGuideMult; z++) {
		double xx = x*(1.0/(vectorSpacing-1));
		double yy = slice01;
		double zz = z*(1.0/(vectorSpacing*boxGuideMult-1));
		drawVector(dd, xx, yy, zz);
	    }
    }

    void drawVectorsZ(double slice01, DrawData dd) {
	int x, y;
	for (x = 0; x != vectorSpacing; x++)
	    for (y = 0; y != vectorSpacing; y++) {
		double xx = x*(1.0/(vectorSpacing-1));
		double yy = y*(1.0/(vectorSpacing-1));
		double zz = slice01;
		drawVector(dd, xx, yy, zz);
	    }
    }

    void drawArrow(Graphics g, String text, int x1, int y1, int x2, int y2) {
	drawArrow(g, text, x1, y1, x2, y2, 5);
    }

    void drawArrow(Graphics g, String text, int x1, int y1, int x2, int y2,
		   int as) {
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

    // draw the appropriate field vector at xx,yy,zz
    void drawVector(DrawData dd, double xx, double yy, double zz) {
	int fieldno = dd.fieldno;
	Particle p = particles[0];
	// find grid element that contains sampled point
	int xxi = (int) (xx*maxTerms);
	int yyi = (int) (yy*maxTerms);
	int zzi = (int) (zz*maxTerms);
	if (xxi >= maxTerms) xxi = maxTerms-1;
	if (yyi >= maxTerms) yyi = maxTerms-1;
	if (zzi >= maxTerms) zzi = maxTerms-1;
	int mi;
	double dx = 0, dy = 0, dz = 0;

	// calculate field vector
	for (mi = 0; mi != modeCount; mi++) {
	    ModeData md = modes[mi].modeDatas[fieldno];
	    double fxymult = md.zmode_xymult[zzi];
	    double  fzmult = md.zmode_zmult[zzi];
	    dx += md.data[xxi][yyi][0]*fxymult;
	    dy += md.data[xxi][yyi][1]*fxymult;
	    dz += md.data[xxi][yyi][2]*fzmult;
	}
	if (dd.realfieldno == EMCHOICE_J) {
	    double sw;
	    // convert magnetic field to its curl
	    if (xx <= .01)
		{ dx = 0; sw = dy; dy = -dz; dz = sw; }
	    else if (xx >= .99)
		{ dx = 0; sw = dy; dy = dz; dz = -sw; }
	    else if (yy <= .01)
		{ dy = 0; sw = dx; dx = dz; dz = -sw; }
	    else if (yy >= .99)
		{ dy = 0; sw = dx; dx = -dz; dz = sw; }
	    else if (zz <= .01 && !waveguide)
		{ dz = 0; sw = dx; dx = -dy; dy = sw; }
	    else if (zz >= .99 && !waveguide)
		{ dz = 0; sw = dx; dx = dy; dy = -sw; }
	    else
		dx = dy = dz = 0;
	}
	
	//calcVector((xx+1)*.5, (yy+1)*.5, (zz+1)*.5, p, 0);
	//double dx = p.fx;
	//double dy = p.fy;
	//double dz = p.fz;
	if (dx == 0)
	    dx = .0001;
	double dn = java.lang.Math.sqrt(dx*dx+dy*dy+dz*dz);
	dx /= dn;
	dy /= dn;
	dz /= dn;
	dn *= dd.mult;
	int col;
	if (dn > 1) {
	    if (dn > 2)
		dn = 2;
	    dn -= 1;
	    int val = (int) (dn * 255);
	    // fade from green to white for high intensity
	    col = (255<<24) | (255<<8) | (val * (0x10001));
	} else {
	    // fade from black to green for low intensity
	    int val = (int) (dn * 255);
	    col = (255<<24) | (val<<8); // shade of green
	}
	dd.g.setColor(new Color(col));
	double sw2 = 1./(vectorSpacing-1);
	xx = xx*2-1;
	yy = yy*2-1;
	zz = zz*2-1;
	map3d(xx, yy, zz, xpoints, ypoints, 0, dd.view);
	map3d(xx+sw2*dx*2/boxwidth, yy+sw2*dy*2/boxheight, zz+sw2*dz/boxGuideMult, xpoints, ypoints, 1, dd.view);
	drawArrow(dd.g, null, xpoints[0], ypoints[0], xpoints[1], ypoints[1], 2);
    }

    // see if the face containing (nx, ny, nz) is visible.
    boolean visibleFace(int nx, int ny, int nz) {
	double viewx = viewDistance*rotmatrix[2];
	double viewy = viewDistance*rotmatrix[5];
	double viewz = viewDistance*rotmatrix[8];
	return (nx-viewx)*nx+(ny-viewy)*ny+(nz-viewz)*nz < 0;
    }

    // draw the cube containing the particles.  if drawAll is false then
    // we just draw faces that are facing the camera.  This routine draws
    // each edge twice which is unnecessary, but easier.
    void drawCube(Graphics g, Rectangle view, boolean drawAll) {
	int i;
	int slice = sliceChooser.getSelectedIndex();
	int sp = (drawAll) ? 0 : 8;
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
		map3d(pts[0], pts[1], pts[2], xpoints, ypoints, n, view);
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
		      slicerPoints[0], slicerPoints[1], sp, view);
		computeFace(i, 2, pts);
		pts[slice-SLICE_X] = sliceval;
		map3d(pts[0], pts[1], pts[2],
		      slicerPoints[0], slicerPoints[1], sp+1, view);
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

    // map 3-d point (x,y,z) to screen, storing coordinates
    // in xpoints[pt],ypoints[pt]
    void map3d(double x, double y, double z,
	       int xpoints[], int ypoints[], int pt, Rectangle view) {
	if (view != viewAxes) {
	    x *= boxwidth/2;
	    y *= boxheight/2;
	    z *= boxdepth/2;
	}
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

    // map point on screen to 3-d coordinates
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
	double realx =  (x-(view.x+view.width/2))*realz/scalex;
	double realy = -(y-(view.y+view.height/2))*realz/scaley;
	double rotm[] = rotmatrix;
	x3[0] = (realx*rotm[0] + realy*rotm[1] + z*rotm[2]) / (boxwidth/2);
	x3[1] = (realx*rotm[3] + realy*rotm[4] + z*rotm[5]) / (boxheight/2);
	x3[2] = (realx*rotm[6] + realy*rotm[7] + z*rotm[8]) / (boxdepth/2);
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

	double vx =  (x-(view.x+view.width/2))/scalex;
	double vy = -(y-(view.y+view.height/2))/scaley;
	// vz = -1
	
	// map the line vector to object space (we know where the camera
	// is in object space already so no need to map that)
	double rotm[] = rotmatrix;
	double mvx = (vx*rotm[0] + vy*rotm[1] - rotm[2]);
	double mvy = (vx*rotm[3] + vy*rotm[4] - rotm[5]);
	double mvz = (vx*rotm[6] + vy*rotm[7] - rotm[8]);
	mvx /= boxwidth/2;
	mvy /= boxheight/2;
	mvz /= boxdepth/2;
	
	// calculate the intersection between the line and the given plane
	double t = ((pp[0]-cameraPos[0])*pn[0] +
		    (pp[1]-cameraPos[1])*pn[1] +
		    (pp[2]-cameraPos[2])*pn[2]) /
	    (pn[0]*mvx+pn[1]*mvy+pn[2]*mvz);

	x3[0] = (cameraPos[0]+mvx*t);
	x3[1] = (cameraPos[1]+mvy*t);
	x3[2] = (cameraPos[2]+mvz*t);
    }

    void drawFrequencies(Graphics g, int z, boolean teMode) {
	// draw one frequency grid for a particular z
	Rectangle view = viewFreq[z+((teMode) ? 0 : maxZDispCoefs)];
	int termWidth = getTermWidth();
	g.setColor(Color.white);
	int i, j, x, y;
	if (!legalMode(1, 1, z, teMode))
	    return;
	int starti = (legalMode(1, 0, z, teMode)) ? 0 : 1;
	for (i = starti; i <= maxDispCoefs; i++) {
	    x = i*termWidth;
	    int startdraw = (i == 0) ? 1 : starti;
	    g.drawLine(view.x+startdraw*termWidth,    x+view.y,
		       view.x+termWidth*maxDispCoefs, x+view.y);
	    g.drawLine(view.x+x, view.y+startdraw*termWidth,
		       view.x+x, view.y+termWidth*maxDispCoefs);
	}
	int rcol = 0x00010000;
	int gcol = 0x00000100;
	for (i = 0; i != modeCount; i++) {
	    Mode m = modes[i];
	    if (m.z != z)
		continue;
	    if (m.teMode != teMode)
		continue;
	    x = view.x+m.x*termWidth;
	    y = view.y+m.y*termWidth;
	    int val = logcoef(m.magcoef);
	    if (val < -255)
		val = -255;
	    if (val > 255)
		val = 255;
	    if (val < 0)
		g.setColor(new Color(0xFF000000 + rcol * -val));
	    else
		g.setColor(new Color(0xFF000000 + gcol * val));
	    g.fillRect(x+1, y+1, termWidth-1, termWidth-1);
	    int phx = (int) (m.phasecoefadj * termWidth * (1/(pi*2)));
	    if (phx > 0) {
		// show phase line
		g.setColor(Color.blue);
		g.drawLine(x+phx, y+1,
			   x+phx, y+termWidth);
	    }
	}
	if (waveguide) {
	    for (i = 0; i != maxDispCoefs; i++)
		for (j = 0; j != maxDispCoefs; j++) {
		    x = view.x+i*termWidth;
		    y = view.y+j*termWidth;
		    if (!basicLegalMode(i, j, z, teMode))
			continue;
		    if (!legalMode(i, j, z, teMode)) {
			g.setColor(Color.white);
			g.drawLine(x, y+termWidth, x+termWidth, y);
			//g.drawLine(x+termWidth, y, x, y+termWidth);
		    }
		}
	}
	if (selectedCoefX != -1 && !waveguide) {
	    // draw yellow square around degenerate modes
	    double selOmega =
		getOmega(selectedCoefX, selectedCoefY, selectedCoefZ);
	    g.setColor(Color.yellow);
	    for (i = starti; i != maxDispCoefs; i++)
		for (j = starti; j != maxDispCoefs; j++) {
		    x = view.x+i*termWidth;
		    y = view.y+j*termWidth;
		    if (getOmega(i, j, z) == selOmega)
			g.drawRect(x, y, termWidth, termWidth);
		}
	}
	if (selectedMinOmega > 0 && selectedMaxOmega > 0) {
	    // draw yellow square around modes in selected range
	    g.setColor(Color.yellow);
	    for (i = starti; i != maxDispCoefs; i++)
		for (j = starti; j != maxDispCoefs; j++) {
		    x = view.x+i*termWidth;
		    y = view.y+j*termWidth;
		    double w = getOmega(i, j, z);
		    if (w >= selectedMinOmega && w < selectedMaxOmega)
			g.drawRect(x, y, termWidth, termWidth);
		}
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
	    logep2 = -java.lang.Math.log(2*ep2);
	return (int) (255 * sign * (java.lang.Math.log(x+ep2)+logep2)/logep2);
    }

    int getColorValue(int i, int j, int k) {
	int val = (int) (func[i][j][k] * colorMult);
	if (val > 255)
	    val = 255;
	return val;
    }

    void moveParticles(int pstart, int pcount) {
	int bestd = 0;
	int i;
	int slice = sliceChooser.getSelectedIndex();
	boolean sliced = (slice > 0);
	for (i = pstart; i != pcount+pstart; i++) {
	    Particle pt = particles[i];
	    removeFromDensityGroup(pt);
	    moveParticle(pt);
	    double x[] = pt.pos;
	    if (x[0] < -1 || x[0] > 1 ||
		x[1] < -1 || x[1] > 1 ||
		x[2] < -1 || x[2] > 1) {
		if (!sidesCheck.getState())
		    pt.lifetime = -1;
		else {
		    // try to wrap particle onto a new side
		    int c, ns = -1;
		    for (c = 0; c != 3; c++) {
			if (x[c] < -1)
			    ns = c*2+1;
			else if (x[c] > 1)
			    ns = c*2;
		    }
		    if (ns == pt.side || (waveguide && ns >= 4))
			pt.lifetime = -1;
		    else {
			pt.side = ns;
			pt.pos[pt.side/2] = sidemap[pt.side][pt.side/2];
		    }
		}
	    }
	    if (pt.lifetime-- < 0)
		positionParticle(pt);
	    if (sliced)
		x[slice-SLICE_X] = sliceval;
	    int d = addToDensityGroup(pt);
	    if (d > bestd)
		bestd = d;
	}
	int maxd =  (4*getParticleCount()/(densitygridsize*densitygridsize*
					    densitygridsize));
	if (sliced)
	    maxd = 2*getParticleCount()/(densitygridsize*densitygridsize);
	if (bestd > maxd)
	    redistribute(bestd);
    }

    int rediscount;
    void redistribute(int mostd) {
	if (mostd < 5)
	    return;
	rediscount++;
	int maxd = (4*getParticleCount()/
		    (densitygridsize*densitygridsize*densitygridsize));
	int i;
	int pn = 0;
	int pcount = getParticleCount();
	for (i = rediscount % 4; i < pcount; i+=4) {
	    Particle p = particles[i];
	    int a = (int)((p.pos[0]+1)/densitygroupsize);
	    int b = (int)((p.pos[1]+1)/densitygroupsize);
	    int c = (int)((p.pos[2]+1)/densitygroupsize);
	    if (density[a][b][c] <= maxd)
		continue;
	    p.lifetime = -1;
	    pn++;
	}
	//System.out.print("redist " + mostd + " " + pn + "\n");
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
	if (e.getSource() == clearButton) {
	    while (modeCount > 0)
		deleteMode(0);
	    cv.repaint();
	}
	if (e.getSource() == resetPartButton) {
	    resetParticles();
	    cv.repaint();
	}
    }

    public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == widthBar || e.getSource() == heightBar)
	    setWidthHeight();
	if (e.getSource() == freqBar)
	    setFrequency();
	if (e.getSource() == resolutionBar)
	    setMaxTerms();
	if (e.getSource() == partCountBar)
	    resetDensityGroups();
	cv.repaint(pause);
    }

    // set the width and/or height of box and adjust omegas to match
    void setWidthHeight() {
	boxwidth  = widthBar.getValue()  / 5.;
	boxheight = heightBar.getValue() / 5.;
	int i;
	for (i = 0; i != modeCount; i++) {
	    Mode m = modes[i];
	    m.omega = getOmega(m.x, m.y, m.z);
	}
	setFrequency();
    }

    // change driving frequency (and change mode wave numbers to match)
    void setFrequency() {
	int i;
	for (i = 0; i != modeCount; i++) {
	    Mode m = modes[i];
	    m.zwavenum = getWaveNum(m.x, m.y);
	    if (!(m.zwavenum > 0))
		deleteMode(i--);
	}
	calcSpectrum();
    }

    void calcSpectrum() {
	int i, j, k;
	if (winSize == null)
	    return;
	spectrum = new int[winSize.width];
	for (i = 0; i != maxDispCoefs; i++)
	    for (j = 0; j != maxDispCoefs; j++)
		for (k = 0; k != maxDispCoefs; k++) {
		    if (!legalMode(i, j, k, true) &&
			!legalMode(i, j, k, false))
			continue;
		    double w = getOmega(i, j, k);
		    int x = (int) (w*spectrumSpacing);
		    if (x >= winSize.width)
			continue;
		    spectrum[x]++;
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
	if (emChooser.getSelectedIndex() == EMCHOICE_EB)
	    x -= (view3d_e.inside(x, y)) ? 0 : view3d_b.x;
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

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	oldDragX = dragX;
	oldDragY = dragY;
	dragX = e.getX(); dragY = e.getY();
	edit(e);
    }
    public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0) {
	    if (selection != -1) {
		dragging = true;
	    }
	    return;
	}
	processMouseMotion(e);
    }
    
    void processMouseMotion(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	oldDragX = dragX;
	oldDragY = dragY;
	dragX = x; dragY = y;
	boolean ss = selectedSlice;
	checkSlice(dragX, dragY);
	if (ss != selectedSlice)
	    cv.repaint(pause);
	int oldCoefX = selectedCoefX;
	int oldCoefY = selectedCoefY;
	int oldCoefZ = selectedCoefZ;
	selectedCoefX = -1;
	selectedCoefY = -1;
	selectedCoefZ = -1;
	selection = 0;
	selectedMinOmega = selectedMaxOmega = 0;
	int i;
	if (view3d.inside(x,y))
	    selection = SEL_3D;
	if (viewSpectrum != null && viewSpectrum.inside(x,y)) {
	    selection = SEL_SPECTRUM;
	    selectedMinOmega = (x-2)/(double) spectrumSpacing;
	    selectedMaxOmega = (x+2)/(double) spectrumSpacing;
	}
	for (i = 0; i != maxZDispCoefs*2; i++) {
	    Rectangle vf = viewFreq[i];
	    if (vf.inside(x, y)) {
		int termWidth = getTermWidth();
		selectedCoefX = (x-vf.x)/termWidth;
		selectedCoefY = (y-vf.y)/termWidth;
		selectedCoefZ = i % maxZDispCoefs;
		selectedCoefTEMode = (i < maxZDispCoefs);
		if (selectedCoefX >= maxDispCoefs)
		    selectedCoefX = -1;
		if (selectedCoefY >= maxDispCoefs)
		    selectedCoefX = -1; // sic
		if (selectedCoefX != -1)
		    selection = SEL_MAG;
	    }
	}
	if (!legalMode(selectedCoefX, selectedCoefY,
		       selectedCoefZ, selectedCoefTEMode))
	    selectedCoefX = selectedCoefY = selectedCoefZ = -1;
	if (selectedCoefX != oldCoefX || selectedCoefY != oldCoefY ||
	    selectedCoefZ != oldCoefZ)
	    cv.repaint(pause);
    }
    boolean legalMode(int x, int y, int z, boolean h) {
	if (waveguide) {
	    if (z != 1)
		return false;
	    if (!(getWaveNum(x, y) > 0))
		return false;
	}
	return basicLegalMode(x, y, z, h);
    }
    
    boolean basicLegalMode(int x, int y, int z, boolean h) {
	if (h)
	    return z != 0 && !(x == 0 && y == 0);
	else
	    return x != 0 && y != 0;
    }
    public void mouseClicked(MouseEvent e) {
	if (selection == SEL_MAG)
	    editMagClick();
	if (e.getClickCount() == 2 && selectedCoefX != -1) {
	    while (modeCount > 0)
		deleteMode(0);
	    addMode(selectedCoefX, selectedCoefY, selectedCoefZ,
		    selectedCoefTEMode).magcoef = 1;
	    cv.repaint(pause);
	}
    }
    public void mouseEntered(MouseEvent e) {
    }
    public void mouseExited(MouseEvent e) {
	if (!dragging && selection != -1) {
	    selectedCoefX = selectedCoefY = selectedCoefZ = -1;
	    cv.repaint(pause);
	}
    }
    public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	processMouseMotion(e);
	oldDragX = dragStartX = e.getX();
	oldDragY = dragStartY = e.getY();
	dragZoomStart = zoom;
	if (selectedCoefX != -1) {
	    Mode m = findSelectedMode();
	    magDragStart = m.magcoef;
	}
	dragging = true;
	edit(e);
    }
    public void mouseReleased(MouseEvent e) {
	if (dragging)
	    cv.repaint();
	dragging = false;
    }
    
    private boolean finished;
    
    public void itemStateChanged(ItemEvent e) {
    	if(!finished){
			return;
		}
	if (e.getItemSelectable() == spectrumCheck)
	    setupDisplay();
	if (e.getItemSelectable() == dispChooser)
	    setDynamicControls();
	if (e.getItemSelectable() == sliceChooser)
	    setDynamicControls();
	if (e.getItemSelectable() == emChooser)
	    reinit();
	cv.repaint(pause);
    }

    // enable/disable controls as appropriate
    void setDynamicControls() {
	int em = emChooser.getSelectedIndex();
	int dcf = dispChooser.getSelectedIndex();
	if (em == EMCHOICE_Q) {
	    sliceChooser.select(SLICE_NONE);
	    sliceChooser.disable();
	    dispChooser.select(DISP_FIELD_MAG);
	    dispChooser.disable();
	} else {
	    if (em == EMCHOICE_J && dcf != DISP_VECTORS) {
		sliceChooser.disable();
		sliceChooser.select(SLICE_NONE);
	    } else
		sliceChooser.enable();
	    dispChooser.enable();
	}
	if (dcf != DISP_PART && dcf != DISP_VECTORS &&
	    sliceChooser.getSelectedIndex() == SLICE_NONE)
	    dcf = DISP_FIELD_MAG;
	if (em == EMCHOICE_Q || (em == EMCHOICE_J && dcf != DISP_VECTORS)) {
	    sidesCheck.disable();
	    sidesCheck.setState(true);
	} else if (sliceChooser.getSelectedIndex() == SLICE_NONE &&
		   (dcf != DISP_PART || em == EMCHOICE_J)) {
	    sidesCheck.enable();
	    sidesCheck.setState((em == EMCHOICE_J) ? true : false);
	} else {
	    sidesCheck.disable();
	    sidesCheck.setState(false);
	}
	dcf = 1<<dcf;
	int i;
	for (i = 0; dynControls[i] != null; i++) {
	    DynControl dc = dynControls[i];
	    if ((dc.flags & dcf) > 0) {
		dc.bar.show();
		dc.label.show();
	    } else {
		dc.bar.hide();
		dc.label.hide();
	    }
	}
	if (dispChooser.getSelectedIndex() == DISP_PART) {
	    resetPartButton.enable();
	    stopOscCheck.enable();
	} else {
	    resetPartButton.disable();
	    stopOscCheck.disable();
	    stopOscCheck.setState(false);
	}
	if (dispChooser.getSelectedIndex() == DISP_PART)
	    resetParticles();
	validate();
    }

    public boolean handleEvent(Event ev) {
        if (ev.id == Event.WINDOW_DESTROY) {
            if (applet == null) dispose(); else applet.destroyFrame();
            return true;
        }
        return super.handleEvent(ev);
    }

    void edit(MouseEvent e) {
	if (selection == SEL_NONE)
	    return;
	int x = e.getX();
	int y = e.getY();
	switch (selection) {
	case SEL_MAG:      editMag(x, y);   break;
	case SEL_3D:       edit3d(x, y);    break;
	}
    }

    void edit3d(int x, int y) {
	if (selectedSlice) {
	    double x3[] = new double[3];
	    Rectangle view = view3d;
	    if (emChooser.getSelectedIndex() == EMCHOICE_EB)
		view = (view3d_e.inside(x, y)) ? view3d_e : view3d_b;
	    unmap3d(x3, dragX, dragY, sliceFace, sliceFace, view);
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
	    cv.repaint(pause);
	} else if (modeChooser.getSelectedIndex() == MODE_ANGLE) {
	    int xo = oldDragX-x;
	    int yo = oldDragY-y;
	    rotate(xo/40., -yo/40.);
	    cv.repaint(pause);
	} else if (modeChooser.getSelectedIndex() == MODE_ZOOM) {
	    int xo = x-dragStartX;
	    zoom = dragZoomStart + xo/20.;
	    if (zoom < .1)
		zoom = .1;
	    cv.repaint(pause);
	}
    }

    void editMag(int x, int y) {
	if (selectedCoefX == -1)
	    return;
	double coef = (dragStartY-y)/20.+magDragStart;
	if (coef < -1)
	    coef = -1;
	if (coef > 1)
	    coef = 1;
	double pcoef = (x-dragStartX)/10.;
	if (pcoef < 0)
	    pcoef = 0;
	if (pcoef > 2*pi)
	    pcoef = 2*pi;
	Mode m = findSelectedMode();
	if (m.magcoef == coef && m.phasecoefadj == pcoef)
	    return;
	m.magcoef = coef;
	m.phasecoefadj = pcoef;
	cv.repaint(pause);
    }

    void editMagClick() {
	if (selectedCoefX == -1)
	    return;
	Mode m = findSelectedMode();
	if (magDragStart < .5)
	    m.magcoef = 1;
	else
	    m.magcoef = 0;
	m.phasecoefadj = 0;
	if (m.magcoef == 0)
	    deleteMode(m);
	cv.repaint(pause);
    }

    // generate 3-d dataset.  This is called once every frame, but
    // not all of the function is executed each time.  Here we calculate
    // the field vector that the user has asked to see.  For speed, this
    // vector data is split into three parts:
    //
    // data[x][y][0..2] - the portion of the vectors that varies with x and
    //                    y.  [x][y][0] is the X component, [x][y][1] is the
    //                    Y component, [x][y][2] is the Z component.
    //                    This does not change over time so we precalculate
    //                    it once.  This data also include constant
    //                    factors which do not vary with time.
    // zmode_xymult[z]  - This is the portion of the x and y components
    //                    that varies with respect to z or t.  We
    //                    recalculate it every frame.
    // zmode_zmult[z]   - This is the portion of the z component
    //                    that varies with respect to z or t.  We
    //                    recalculate it every frame.
    //
    // So the (x,y,z) component of the field vector is equal to:
    //   (data[x][y][0]*zmode_xymult[z],
    //    data[x][y][1]*zmode_xymult[z],
    //    data[x][y][2]*zmode_zmult[z])
    //
    void genData(int fieldno) {
	double q = pi/(maxTerms-1);
	int x, y, z, mi;
	double fx, fy, fz;
	boolean showE = (fieldno == EMCHOICE_E);
	for (mi = 0; mi != modeCount; mi++) {
	    Mode m = modes[mi];
	    ModeData md = m.modeDatas[fieldno];
	    if (md.data == null) {
		md.zmode_xymult = new float[maxTerms];
		md.zmode_zmult  = new float[maxTerms];
	    }
	    calcModeMults(m, false);
	    double qz = (waveguide) ? 2*q*m.zwavenum : q;
	    double wgshift = (waveguide) ? pi/2 : 0;
	    for (z = 0; z != maxTerms; z++) {
		if (showE) {
		    md.zmode_xymult[z] = (float)
			(java.lang.Math.sin(z*qz*m.z+m.ephaseshift) *
			 m.ephasemult);
		    md.zmode_zmult [z] = (float)
			(java.lang.Math.cos(z*qz*m.z+m.ephaseshift) *
			 m.ephasemult);
		} else {
		    md.zmode_xymult[z] = (float)
			(java.lang.Math.cos(z*qz*m.z+m.bphaseshift-wgshift) *
			 m.bphasemult);
		    md.zmode_zmult [z] = (float)
			(java.lang.Math.sin(z*qz*m.z+m.bphaseshift+wgshift) *
			 m.bphasemult);
		}
	    }
	    if (md.data != null)
		continue;

	    // this part of the function is only executed when a new mode
	    // is added or an important parameter is changed.

	    md.data = new float[maxTerms][maxTerms][3];
	    fz = 0;
	    for (x = 0; x != maxTerms; x++)
		for (y = 0; y != maxTerms; y++) {
		    if (showE) {
			fx = java.lang.Math.cos(x*m.x*q)*
			    java.lang.Math.sin(y*m.y*q) * m.exmult;
			fy = java.lang.Math.sin(x*m.x*q)*
			    java.lang.Math.cos(y*m.y*q) * m.eymult;
			fz = java.lang.Math.sin(x*m.x*q)*
			    java.lang.Math.sin(y*m.y*q) * m.ezmult;
		    } else {
			fx = java.lang.Math.sin(x*m.x*q)*
			    java.lang.Math.cos(y*m.y*q) * m.bxmult;
			fy = java.lang.Math.cos(x*m.x*q)*
			    java.lang.Math.sin(y*m.y*q) * m.bymult;
			fz = java.lang.Math.cos(x*m.x*q)*
			    java.lang.Math.cos(y*m.y*q) * m.bzmult;
		    }
		    md.data[x][y][0] = (float) fx;
		    md.data[x][y][1] = (float) fy;
		    md.data[x][y][2] = (float) fz;
		}
	}
    }

    // calculate coefficients for the x, y, and z components of both
    // the E and B field vectors.  We only care about coefficients
    // that change the direction of the field vectors; in fact we
    // normalize the vectors so they are easy to see.  The multipliers
    // are slightly different for waveguides vs. cavities.
    void calcModeMults(Mode m, boolean usephase) {
	double a1 = m.x/(double) boxwidth;
	double a2 = m.y/(double) boxheight;
	double a3 = (waveguide) ? m.zwavenum : m.z/(double) boxdepth;
	double gneg = (waveguide) ? -1 : 1;
	if (m.teMode)
	    calcMults(m,
	      usephase ? m.ephasemult : 1, a2, -a1, 0,
	      usephase ? m.bphasemult : 1, a1*a3, a2*a3, -gneg*(a1*a1+a2*a2));
	else
	    calcMults(m,
	      usephase ? m.ephasemult : 1, a1*a3, a2*a3, -(a1*a1+a2*a2),
	      usephase ? m.bphasemult : 1, a2*gneg, -gneg*a1, 0);
    }

    void calcMults(Mode m,
		   double emult, double ex, double ey, double ez,
		   double bmult, double bx, double by, double bz) {
	double enorm = emult/java.lang.Math.sqrt(ex*ex+ey*ey+ez*ez);
	m.exmult = ex*enorm;
	m.eymult = ey*enorm;
	m.ezmult = ez*enorm;
	double bnorm = bmult/java.lang.Math.sqrt(bx*bx+by*by+bz*bz);
	m.bxmult = bx*bnorm;
	m.bymult = by*bnorm;
	m.bzmult = bz*bnorm;
    }

    // This is used to calculate the field vector at a particle's location.
    // The stuff generated by genData is too blocky to use for particle
    // movement.  So, unfortunately some of the math is duplicated here.
    void calcField(Particle p, double field[], double pos[]) {
	int mi;
	double q = pi/2;
	double x = pos[0]+1;
	double y = pos[1]+1;
	double z = pos[2]+1;
	field[0] = field[1] = field[2] = 0;
	boolean showE = (curfieldno == EMCHOICE_E);
	double wgshift = (waveguide) ? pi/2 : 0;
	for (mi = 0; mi != modeCount; mi++) {
	    Mode m = modes[mi];
	    double qz = (waveguide) ? 2*q*m.zwavenum : q;
	    if (showE) {
		// e-field
		field[0] += m.exmult *
		    java.lang.Math.cos(x*m.x*q) *
		    java.lang.Math.sin(y*m.y*q) *
		    java.lang.Math.sin(z*m.z*qz+m.ephaseshift);
		field[1] += m.eymult *
		    java.lang.Math.sin(x*m.x*q) *
		    java.lang.Math.cos(y*m.y*q) *
		    java.lang.Math.sin(z*m.z*qz+m.ephaseshift);
		field[2] += m.ezmult *
		    java.lang.Math.sin(x*m.x*q) *
		    java.lang.Math.sin(y*m.y*q) *
		    java.lang.Math.cos(z*m.z*qz+m.ephaseshift);
	    } else {
		// b-field
		field[0] += m.bxmult *
		    java.lang.Math.sin(x*m.x*q) *
		    java.lang.Math.cos(y*m.y*q) *
		    java.lang.Math.cos(z*m.z*qz+m.bphaseshift-wgshift);
		field[1] += m.bymult *
		    java.lang.Math.cos(x*m.x*q) *
		    java.lang.Math.sin(y*m.y*q) *
		    java.lang.Math.cos(z*m.z*qz+m.bphaseshift-wgshift);
		field[2] += m.bzmult *
		    java.lang.Math.cos(x*m.x*q) *
		    java.lang.Math.cos(y*m.y*q) *
		    java.lang.Math.sin(z*m.z*qz+m.bphaseshift+wgshift);
	    }
	}
	if (curfieldno == EMCHOICE_J) {
	    double sw;
	    // convert magnetic field to its curl.
	    switch (p.side) {
	    case 0:
		field[0] = 0;
		sw = field[1]; field[1] = field[2]; field[2] = -sw;
		break;
	    case 1:
		field[0] = 0;
		sw = field[1]; field[1] = -field[2]; field[2] = sw;
		break;
	    case 2:
		field[1] = 0;
		sw = field[0]; field[0] = -field[2]; field[2] = sw;
		break;
	    case 3:
		field[1] = 0;
		sw = field[0]; field[0] = field[2]; field[2] = -sw;
		break;
	    case 4:
		field[2] = 0;
		sw = field[0]; field[0] = field[1]; field[1] = -sw;
		break;
	    case 5:
		field[2] = 0;
		sw = field[0]; field[0] = -field[1]; field[1] = sw;
		break;
	    }
	}
    }

    void deleteMode(int i) {
	for (; i < modeCount-1; i++) {
	    modes[i] = modes[i+1];
	}
	modeCount--;
    }

    void deleteMode(Mode m) {
	int i;
	for (i = 0; i != modeCount; i++)
	    if (modes[i] == m) {
		deleteMode(i);
		return;
	    }
    }

    Mode addMode(int x, int y, int z, boolean teMode) {
	if (modeCount == maxModes) {
	    // one of the existing modes must be deleted; pick weakest one
	    int i;
	    double minmag = 1;
	    int minmagi = 0;
	    for (i = 0; i != modeCount; i++) {
		Mode m = modes[i];
		if (m.magcoef < minmag) {
		    minmag = m.magcoef;
		    minmagi = i;
		}
	    }
	    deleteMode(minmagi);
	}
	Mode m = new Mode();
	m.x = x;
	m.y = y;
	m.z = z;
	m.teMode = teMode;
	m.magcoef = 0;
	m.phasecoef = 0;
	m.phasecoefadj = 0;
	m.omega = getOmega(x, y, z);
	m.zwavenum = getWaveNum(x, y);
	m.modeDatas = new ModeData[2];
	m.modeDatas[0] = new ModeData();
	m.modeDatas[1] = new ModeData();
	modes[modeCount++] = m;
	return m;
    }

    // get propagation constant (wave number) for given mode
    double getWaveNum(int x, int y) {
	if (!waveguide)
	    return 1;
	double gammasq = (x*x/(boxwidth*boxwidth) +
			  y*y/(boxheight*boxheight));
	return java.lang.Math.sqrt(freqBar.getValue()*.2-gammasq);
    }

    // get angular frequency of a particular mode
    double getOmega(int x, int y, int z) {
	if (waveguide)
	    return 1;
	return java.lang.Math.sqrt(x*x/(boxwidth*boxwidth)+
				   y*y/(boxheight*boxheight)+z*z/4.);
    }

    Mode findSelectedMode() {
	int i;
	for (i = 0; i != modeCount; i++) {
	    Mode m = modes[i];
	    if (selectedCoefX == m.x && selectedCoefY == m.y &&
		selectedCoefZ == m.z && selectedCoefTEMode == m.teMode)
		return m;
	}
	return addMode(selectedCoefX, selectedCoefY, selectedCoefZ,
		       selectedCoefTEMode);
    }

    // highly object-oriented design we have here..  :(
    class Mode {
	public int x, y, z;
	public boolean teMode;
	public double magcoef, phasecoef, ephasemult,
	    bphasemult, phasecoefadj, omega, ephaseshift, bphaseshift;
	// wave number (propagation constant) for z direction
	public double zwavenum;

	public double exmult, eymult, ezmult;
	public double bxmult, bymult, bzmult;
	public ModeData modeDatas[];
    };
    
    class ModeData {
	public float data[][][], zmode_xymult[], zmode_zmult[];
    };

    class DrawData {
	public Graphics g;
	public double mult;
	public Rectangle view;
	public int fieldno, realfieldno;
    };

    class Particle {
	public double pos[], stepsize;
	public int lifetime, side;
	Particle() {
	    pos   = new double[3];
	    stepsize = 1;
	}
    };

    boolean boundCheck;
    double oldY[];
    double rk_k1[] = new double[6];
    double rk_k2[] = new double[6];
    double rk_k3[] = new double[6];
    double rk_k4[] = new double[6];
    double rk_yn[] = new double[6];

    void rk(Particle p, int order, double x, double Y[], double stepsize) {
	int i;

	// x is not used...

	if (order == 3) {
	    // velocity-based motion
	    double fmult = stepsize * .0016 * partSpeedBar.getValue();
	    for (i = 0; i != order; i++)
		rk_yn[i] = Y[i];
	    calcField(p, rk_k1, rk_yn);
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + 0.5*fmult*rk_k1[i]);
	    calcField(p, rk_k2, rk_yn);
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + 0.5*fmult*rk_k2[i]);
	    calcField(p, rk_k3, rk_yn);
	    
	    for (i = 0; i != order; i++)
		rk_yn[i] = (Y[i] + fmult*rk_k3[i]);
	    calcField(p, rk_k4, rk_yn);
	    for (i = 0; i != order; i++)
		Y[i] = Y[i] + fmult*(rk_k1[i]+2*(rk_k2[i]+rk_k3[i])+rk_k4[i])/6;
	}
    }

    double rk_Y[] = new double[6];
    double rk_Yhalf[] = new double[6];
    double rk_oldY[] = new double[6];

    void moveParticle(Particle p)
    {
	int disp = dispChooser.getSelectedIndex();

	int numIter=0;
	double maxh=1;
	double error=0.0, E = .001, localError;
	int order = 3;
	double Y[] = rk_Y;
	double Yhalf[] = rk_Yhalf;
	oldY = rk_oldY;
	int i;

	for (i = 0; i != 3; i++)
	    oldY[i] = Y[i] = Yhalf[i] = p.pos[i];
	double t = 0;

	double h = p.stepsize;

	int steps = 0;
	double minh = .0001;
	while (t >= 0 && t < 1) {
	    if (t+h > 1)
		h = 1-t;

	    boundCheck = false;

	    // estimate one full step
	    rk(p, order, 0, Y, h);
	    
	    // estimate two half steps
	    rk(p, order, 0, Yhalf, h*0.5);
	    rk(p, order, 0, Yhalf, h*0.5);

	    if (boundCheck) {
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

	p.stepsize = h;
	for (i = 0; i != 3; i++)
	    p.pos[i] = Y[i];
	/* if (steps > 1)
	   System.out.print(steps + "\n"); */
    }
}