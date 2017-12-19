// MOViewer.java (c) 2002 by Paul Falstad, www.falstad.com.
// Rendering algorithm in this applet is based on the description of
// the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
// We raytrace through a 3-d dataset, sampling a number of points and
// integrating over them using Simpson's rule.

//web_NOTReady
//web_AppletName= MOViewer
//web_Description= A simulation of the molecular wave functions (molecular orbitals) of the hydrogen molecular ion (H2+) in 3-D.
//web_JavaVersion= http://www.falstad.com/qmmo/
//web_AppletImage= moviewer.png
//web_Category= Chemistry
//web_Date= $Date: 2016-12-31 17:53:43 -0600 (Sat, 31 Dec 2016) $


package com.falstad;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.CheckboxMenuItem;
import a2s.Choice;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.FontMetrics;
import a2s.Frame;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Insets;
import a2s.Label;
import java.awt.LayoutManager;
import a2s.Menu;
import a2s.MenuBar;
import a2s.MenuItem;
import java.awt.Rectangle;
import a2s.Scrollbar;
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
import java.io.File;
import java.io.FilterInputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.net.URL;
import java.util.Random;
import java.util.StringTokenizer;

import javax.swing.JRadioButtonMenuItem;
import javax.swing.ButtonGroup;

import a2s.Applet;

class MOViewerCanvas extends Canvas {
    MOViewerFrame pg;
    MOViewerCanvas(MOViewerFrame p) {
	pg = p;
    }
    @Override
		public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    @Override
		public void update(Graphics g) {
	pg.updateMOViewer(g);
    }
    @Override
		public void paintComponent(Graphics g) {
	pg.updateMOViewer(g);
    }
}

class MOViewerLayout implements LayoutManager {
    public MOViewerLayout() {}
    @Override
		public void addLayoutComponent(String name, Component c) {}
    @Override
		public void removeLayoutComponent(Component c) {}
    @Override
		public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
    }
    @Override
		public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
    }
    @Override
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
}

public class MOViewer extends Applet implements ComponentListener {
    static MOViewerFrame ogf;
    void destroyFrame() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
    }
    boolean started = false;
    @Override
		public void init() {
	addComponentListener(this);
    }
    
    public static void main(String args[]) {
        ogf = new MOViewerFrame(null);
        ogf.init();
    }

    void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new MOViewerFrame(this);
	    ogf.init();
	    repaint();
	}
    }
    
    @Override
		public void paint(Graphics g) {
	super.paint(g);
	String s = "Applet is open in a separate window.";
	if (!started)
	    s = "Applet is starting.";
	else if (ogf == null)
	    s = "Applet is finished.";
	else
	    ogf.show();
	g.drawString(s, 10, 30);
    }
    
    @Override
		public void componentHidden(ComponentEvent e){}
    @Override
		public void componentMoved(ComponentEvent e){}
    @Override
		public void componentShown(ComponentEvent e) { showFrame(); }
    @Override
		public void componentResized(ComponentEvent e) {}
    
    @Override
		public void destroy() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
	repaint();
    }
}

class MOViewerFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage, memimage;
    
    Random random;
    int gridSizeX = 200;
    int gridSizeY = 200;
    
    public String getAppletInfo() {
	return "MOViewer by Paul Falstad";
    }

    Button blankButton;
    Button normalizeButton;
    Button maximizeButton;
    Checkbox memoryImageSourceCheck;
    CheckboxMenuItem colorCheck;
    CheckboxMenuItem eCheckItem;
    CheckboxMenuItem eSepCheckItem;
    CheckboxMenuItem xCheckItem;
    CheckboxMenuItem alwaysNormItem;
    CheckboxMenuItem nuclearItem;
    CheckboxMenuItem showAtomsItem;
    CheckboxMenuItem dimensionsItem;
    CheckboxMenuItem axesItem;
    MenuItem exitItem;
    Choice sliceChooser, stateChooser, sampleChooser;
    JRadioButtonMenuItem samplesItems[];
    private ButtonGroup samplesGroup;
    int samplesNums[] = { 9, 15, 25, 35, 45, 55 };
    static final int SLICE_NONE = 0;
    static final int SLICE_X = 1;
    static final int SLICE_Y = 2;
    static final int SLICE_Z = 3;
    Scrollbar resolutionBar;
    Scrollbar internalResBar;
    Scrollbar brightnessBar;
    Scrollbar scaleBar;
    Scrollbar sampleBar;
    Scrollbar separationBar;
    View viewPotential, viewPotentialSep, viewX;
    View viewList[];
    int viewCount;
    int stateNum;
    Orbital orbitals[];
    int orbCount;
    Orbital orbListLeft[];
    Orbital orbListRight[];
    Orbital orbListCenter[];
    int orbCountOffset, orbCountCenter;
    double evalues[][];
    int basisCount;
    boolean changingDerivedStates;
    double dragZoomStart;
    double zoom; // was 10
    double rotmatrix[];
    double sep2;
    double colorMult;
    Rectangle viewAxes;
    static final double pi = 3.14159265358979323846;
    static final double pi2 = pi*2;
    static final float root2 = 1.41421356237309504880f;
    static final float root2inv = .70710678118654752440f;
    static final double baseEnergy = .55;
    int xpoints[];
    int ypoints[];
    int selectedPaneHandle;
    double func[][][];
    PhaseColor phaseColors[];
    double resadj;
    boolean dragging = false;
    MemoryImageSource imageSource;
    int pixels[];
    int sampleCount;
    int dataSize;
    float modes[];
    static int maxModes = 10;
    static int maxDispCoefs = 8;
    static int viewDistance = 12;
    int pause;
    MOViewer applet;
    int selection = -1;
    static final int SEL_NONE = 0;
    static final int SEL_POTENTIAL = 1;
    static final int SEL_X = 2;
    static final int SEL_STATES = 3;
    static final int SEL_HANDLE = 4;
    static final int MODE_ANGLE = 0;
    static final int MODE_SLICE = 1;
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
    int phiIndex;
    boolean manualScale;
    Color gray2;
    FontMetrics fontMetrics;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    MOViewerCanvas cv;

    MOViewerFrame(MOViewer a) {
	super("Molecular Orbital Viewer v1.5a");
	applet = a;
    }

    boolean useBufferedImage = false;
    
    public void init() {
	gray2 = new Color(127, 127, 127);

        String jv = System.getProperty("java.class.version");
        double jvf = new Double(jv).doubleValue();
        if (jvf >= 48)
	    useBufferedImage = true;

	int res = 68;

	setLayout(new MOViewerLayout());
	cv = new MOViewerCanvas(this);
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
	//m.add(eCheckItem = getCheckItem("Energy"));
	m.add(eSepCheckItem = getCheckItem("Energy"));
	eSepCheckItem.setState(true);
	m.add(xCheckItem = getCheckItem("Position"));
	xCheckItem.setState(true);
	xCheckItem.setEnabled(false);
	m.addSeparator();
	m.add(colorCheck = getCheckItem("Phase as Color"));
	colorCheck.setState(true);

	m = new Menu("Options");
	mb.add(m);
	m.add(nuclearItem = getCheckItem("Include Nuclear E"));
	nuclearItem.setState(true);
	m.add(showAtomsItem = getCheckItem("Show Nuclei"));
	showAtomsItem.setState(true);
	m.add(dimensionsItem = getCheckItem("Show Dimensions"));
	m.add(axesItem = getCheckItem("Show Axes"));
	axesItem.setState(true);
	setMenuBar(mb);

	m = new Menu("Samples");
	mb.add(m);
        samplesItems = new JRadioButtonMenuItem[6];
	m.add(samplesItems[0] = getRadioItem("Samples = 9 (fastest)"));
	m.add(samplesItems[1] = getRadioItem("Samples = 15 (default)"));
	m.add(samplesItems[2] = getRadioItem("Samples = 25"));
	m.add(samplesItems[3] = getRadioItem("Samples = 35"));
	m.add(samplesItems[4] = getRadioItem("Samples = 45"));
	m.add(samplesItems[5] = getRadioItem("Samples = 55 (best)"));
        samplesGroup = new ButtonGroup();
        for (int i = 0; i < 6; i++) {
                samplesGroup.add(samplesItems[i]);
                samplesItems[i].setActionCommand(""+ samplesNums[i]);
        }
	samplesItems[1].setSelected(true);
	
	int i;
	stateChooser = new Choice();
	stateChooser.add("sigma g 1s");
	stateChooser.add("sigma*u 1s");
	stateChooser.add("pi u 2px");
	stateChooser.add("pi u 2py");
	stateChooser.add("sigma g 2s");
	stateChooser.add("sigma g 2pz");
	stateChooser.add("sigma*u 2s");
	stateChooser.add("pi*g 2px");
	stateChooser.add("pi*g 2py");
	stateChooser.add("sigma*u 2pz");
	stateChooser.addItemListener(this);
	add(stateChooser);
	
	sliceChooser = new Choice();
	sliceChooser.add("No Slicing");
	sliceChooser.add("Show X Slice");
	sliceChooser.add("Show Y Slice");
	sliceChooser.add("Show Z Slice");
	sliceChooser.addItemListener(this);
	add(sliceChooser);

	add(new Label("Brightness", Label.CENTER));
	add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 1385,
					  1, 1000, 1800));
	brightnessBar.addAdjustmentListener(this);

	add(new Label("Image Resolution", Label.CENTER));
	add(resolutionBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 200));
	resolutionBar.addAdjustmentListener(this);

	/*add(new Label("Internal Resolution", Label.CENTER));
	add(internalResBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 200));
	    internalResBar.addAdjustmentListener(this);*/

	add(new Label("Scale", Label.CENTER));
	add(scaleBar = new Scrollbar(Scrollbar.HORIZONTAL, 24, 1, 5, 52));
	scaleBar.addAdjustmentListener(this);

	/*add(new Label("Samples", Label.CENTER));
	add(sampleBar = new Scrollbar(Scrollbar.HORIZONTAL, 7, 1, 0, 20));
	sampleBar.addAdjustmentListener(this);*/

	add(new Label("Separation", Label.CENTER));
	add(separationBar = new Scrollbar(Scrollbar.HORIZONTAL,
					  12, 1, 0, 21));
	separationBar.addAdjustmentListener(this);

	add(new Label("http://www.falstad.com"));

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
	
	slicerPoints = new int[2][5*2];
	sliceFaces = new double[4][3];

	rotmatrix = new double[9];
	rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
	rotate(-pi/2, 0);
	rotate(0, pi/2);
	xpoints = new int[4];
	ypoints = new int[4];

	setupSimpson();

	random = new Random();
	readModes();
	getEnergyValues();
	createOrbitals();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.white);
	setSize(550, 530);
	handleResize();
	Dimension x = getSize();
	Dimension screen = getToolkit().getScreenSize();
	setLocation((screen.width  - x.width)/2,
		    (screen.height - x.height)/2);
	setVisible(true);
	validate();
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

    JRadioButtonMenuItem getRadioItem(String s) {
        JRadioButtonMenuItem mi = new JRadioButtonMenuItem(s);
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
        sampleCount = Integer.parseInt(samplesGroup.getSelection().getActionCommand());
        System.out.println("samplecount = " + sampleCount);

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

    void setupDisplay() {
	if (winSize == null)
	    return;
	int potsize = (viewPotentialSep == null) ?
	    100 : viewPotentialSep.height;
	viewX = viewPotential = viewPotentialSep = null;
	viewList = new View[10];
	int i = 0;
	if (eSepCheckItem.getState())
	    viewList[i++] = viewPotentialSep = new View();
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
	viewCount = i;
	int sizenum = viewCount;
	int toth = winSize.height;

	// preserve size of potential and state panes if possible
	if (potsize > 0 && viewPotentialSep != null) {
	    sizenum--;
	    toth -= potsize;
	}
	toth -= panePad*2*(viewCount-1);
	int cury = 0;
	for (i = 0; i != viewCount; i++) {
	    View v = viewList[i];
	    int h = (sizenum == 0) ? toth : toth/sizenum;
	    if (v == viewPotentialSep && potsize > 0)
		h = potsize;
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
	func = new double[gridSizeX][gridSizeY][3];
    }

    // compute func[][][] array (2-d view) by raytracing through a
    // 3-d dataset (data[][][])
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
	/*double boundRadius2 = 0;
	for (i = 0; i != orbCount; i++) {
	    Orbital oo = orbitals[i];
	    double br = oo.getBoundRadius(colorMult);
	    if (br > boundRadius2)
		boundRadius2 = br;
		}*/
	double boundRadius2 = 1.22;
	boundRadius2 *= boundRadius2;
	double scalemult = scaleBar.getValue() / 50.;
	//double sep = separationBar.getValue() * .001 / scalemult;
	double sep = sep2 * .5 / (zmult*scalemult*resadj);
	//System.out.println(2*sep*zmult*scalemult*resadj);
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

		// calculate intersections with bounding spheres
		double a = camvx*camvx+camvy*camvy+camvz*camvz;
		double b = 2*(camvx*camx+camvy*camy+camvz*camz);
		double c = camx*camx+camy*camy+camz*camz-boundRadius2;
		double discrim = b*b-4*a*c;
		func[i][j][0] = func[i][j][1] = func[i][j][2] = 0;
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
		double msep = sep*zmult;
		for (; n < maxn; n++) {
		    double xy2 = xx*xx+yy*yy;
		    double zz1 = zz+msep;
		    double r = Math.sqrt(xy2+zz1*zz1);
		    double costh = zz1/r;
		    int ri = (int) r;
		    int costhi = (int) (costh*dshalf+dshalf);
		    float fr = 0;
		    calcPhiComponent(xx, yy);
		    for (oi = 0; oi != orbCountOffset; oi++) {
			Orbital oo = orbListLeft[oi];
			fr += oo.computePoint(ri, costhi);
		    }

		    double zz2 = zz-msep;
		    r = Math.sqrt(xy2+zz2*zz2);
		    costh = zz2/r;
		    ri = (int) r;
		    costhi = (int) (costh*dshalf+dshalf);
		    for (oi = 0; oi != orbCountOffset; oi++) {
			Orbital oo = orbListRight[oi];
			fr += oo.computePoint(ri, costhi);
		    }

		    if (orbCountCenter != 0) {
			r = Math.sqrt(xy2+zz*zz);
			costh = zz/r;
			ri = (int) r;
			costhi = (int) (costh*dshalf+dshalf);
			for (oi = 0; oi != orbCountCenter; oi++) {
			    Orbital oo = orbListCenter[oi];
			    fr += oo.computePoint(ri, costhi);
			}
		    }

		    float fv = fr*fr * sampleMult[n];
		    if (color) {
			/*if (fv > 1)
			  System.out.print("fv = " + fv + "\n");*/
			if (fr > 0)
			    simpr += fv;
			else
			    simpg += fv;
		    } else {
			simpr = (simpg += fv);
		    }
		    xx += camvx;
		    yy += camvy;
		    zz += camvz;
		}
		simpr *= pathlen/n;
		simpg *= pathlen/n;
		fillSquare(i, j, simpr, simpg, simpg);
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

    URL getCodeBase() {
        try {
            if (applet != null)
                return applet.getDocumentBase();
            File f = new File(".");
            return new URL("file:" + f.getCanonicalPath() + "/");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    void readModes() {
	try {
	    URL url = new URL(getCodeBase() + "states.txt");
	    Object o = url.getContent();
	    FilterInputStream fis = (FilterInputStream) o;
	    byte b[] = new byte[42000];
	    int off = 0;
	    while (true) {
		int n = fis.read(b, off, 2048);
		if (n <= 0)
		    break;
		off += n;
	    }
	    int len = off;
	    int p;
	    int mm = 0;
	    modes = new float[10101];
	    for (p = 0; p < len; ) {
		int l;
		for (l = 0; l != len-p; l++)
		    if (b[l+p] == '\n') {
			l++;
			break;
		    }
		String line = new String(b, p, l-1);
		StringTokenizer st = new StringTokenizer(line);
		while (st.hasMoreTokens())
		    modes[mm++] = new Float(st.nextToken()).floatValue();
		p += l;
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	}
    }

    int precount;
    void precomputeAll() {
	int i;
	for (i = 0; i != orbCount; i++) {
	    Orbital orb = orbitals[i];
	    orb.precompute();
	}

	sep2 = separationBar.getValue()/2.;
	if (sep2 < 0)
	    sep2 = 0;
	if (sep2 > 10)
	    sep2 = 10;
	
	int ma = 0;
	for (; ; ma++) {
	    if (modes[ma] == 99999)
		break;
	    if (modes[ma] == 99000+sep2)
		break;
	}
	if (modes[ma] == 99999)
	    return;
	ma++;
	stateNum = 0;
	orbitals[4].setReal();
	orbitals[5].setReal();
	orbitals[9].setReal();
	switch (stateChooser.getSelectedIndex()) {
	case 0: stateNum = 0; break;
	case 1: stateNum = 1; break;
	case 2: stateNum = 2; break;
	case 3:
	    stateNum = 2;
	    orbitals[4].setIm();
	    orbitals[5].setIm();
	    orbitals[9].setIm();
	    break;
	case 4: stateNum = 3; break;
	case 5: stateNum = 4; break;
	case 6: stateNum = 5; break;
	case 7: stateNum = 6; break;
	case 8:
	    stateNum = 6;
	    orbitals[4].setIm();
	    orbitals[5].setIm();
	    orbitals[9].setIm();
	    break;
	case 9: stateNum = 7; break;
	}
	for (i = 0; i != orbCount; i++)
	    orbitals[i].used = false;
	while (modes[ma] < 99000 && modes[ma] != stateNum)
	    ma += 59;
	if (modes[ma] >= 99000)
	    return;
	ma++;
	sep2 = modes[ma++];
	int sgn = 1;
	if (sep2 < 0) {
	    sep2 = -sep2;
	    sgn = -1;
	}
	//System.out.println(sep2 + " " + modes[ma++]);
	ma++;

	// 1S orbitals
	precount = 0;
	orbitals[0].precomputeR(1, 1, sgn*modes[ma++]);
	orbitals[1].precomputeR(1, 1, sgn*modes[ma++]);
	orbitals[0].precomputeR(1.5, 1, sgn*modes[ma++]);
	orbitals[1].precomputeR(1.5, 1, sgn*modes[ma++]);
	orbitals[0].precomputeR(2, 1, sgn*modes[ma++]);
	orbitals[1].precomputeR(2, 1, sgn*modes[ma++]);
	orbitals[0].precomputeR(.4, 1, sgn*modes[ma++]);
	orbitals[1].precomputeR(.4, 1, sgn*modes[ma++]);
	orbitals[0].precomputeR(.7, 1, sgn*modes[ma++]);
	orbitals[1].precomputeR(.7, 1, sgn*modes[ma++]);

	// 2S orbitals
	orbitals[0].precomputeR(1, 2, sgn*modes[ma++]);
	orbitals[1].precomputeR(1, 2, sgn*modes[ma++]);
	orbitals[0].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[1].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[0].precomputeR(2, 2, sgn*modes[ma++]);
	orbitals[1].precomputeR(2, 2, sgn*modes[ma++]);
	orbitals[0].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[1].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[0].precomputeR(.7, 2, sgn*modes[ma++]);
	orbitals[1].precomputeR(.7, 2, sgn*modes[ma++]);

	// 2Px orbitals
	orbitals[4].precomputeR(1,   2, sgn*modes[ma++]);
	orbitals[5].precomputeR(1,   2, sgn*modes[ma++]);
	orbitals[4].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[5].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[4].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[5].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[4].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[5].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[4].precomputeR(.7, 2, sgn*modes[ma++]);
	orbitals[5].precomputeR(.7, 2, sgn*modes[ma++]);

	// 2Py orbitals
	/*orbitals[6].precomputeR(1,   2, sgn*modes[ma++]);
	orbitals[7].precomputeR(1,   2, sgn*modes[ma++]);
	orbitals[6].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[7].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[6].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[7].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[6].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[7].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[6].precomputeR(.7, 2, sgn*modes[ma++]);
	orbitals[7].precomputeR(.7, 2, sgn*modes[ma++]);*/

	// 2Pz orbitals
	orbitals[2].precomputeR(1,   2, sgn*modes[ma++]);
	orbitals[3].precomputeR(1,   2, sgn*modes[ma++]);
	orbitals[2].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[3].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[2].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[3].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[2].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[3].precomputeR(.4, 2, sgn*modes[ma++]);
	orbitals[2].precomputeR(.7, 2, sgn*modes[ma++]);
	orbitals[3].precomputeR(.7, 2, sgn*modes[ma++]);

	// centered orbitals
	orbitals[6].precomputeR(1.5, 1, sgn*modes[ma++]);
	orbitals[6].precomputeR(2,   1, sgn*modes[ma++]);
	orbitals[6].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[6].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[7].precomputeR(1.5, 2, sgn*modes[ma++]);
	orbitals[7].precomputeR(2,   2, sgn*modes[ma++]);
	orbitals[7].precomputeR(1.5, 3, sgn*modes[ma++]);
	orbitals[7].precomputeR(2,   3, sgn*modes[ma++]);
	orbitals[8].precomputeR(1.5, 3, sgn*modes[ma++]);
	orbitals[8].precomputeR(2,   3, sgn*modes[ma++]);
	// definition of 3Dxz is reversed
	orbitals[9].precomputeR(1.5, 3, -sgn*modes[ma++]);
	orbitals[9].precomputeR(2,   3, -sgn*modes[ma++]);
	orbitals[7].precomputeR(1.5, 4, sgn*modes[ma++]);
	orbitals[7].precomputeR(2,   4, sgn*modes[ma++]);
	orbitals[10].precomputeR(1.5, 4, sgn*modes[ma++]);
	orbitals[10].precomputeR(2,   4, sgn*modes[ma++]);

	orbCountOffset = orbCountCenter = 0;
	orbListLeft   = new Orbital[3];
	orbListRight  = new Orbital[3];
	orbListCenter = new Orbital[5];
	for (i = 0; i != 6; i += 2) {
	    if (orbitals[i].used) {
		orbListLeft [orbCountOffset] = orbitals[i];
		orbListRight[orbCountOffset] = orbitals[i+1];
		orbCountOffset++;
	    }
	}
	for (i = 6; i != 11; i++) {
	    if (orbitals[i].used) {
		orbListCenter[orbCountCenter] = orbitals[i];
		orbCountCenter++;
	    }
	}
	//System.out.println(orbCountOffset + " " + orbCountCenter);
    }

    void getEnergyValues() {
        int ma = 0;
        evalues = new double[21][8];
        while (modes[ma] != 99999) {
            int s = (int) ((modes[ma]-99000)*2);
            ma++;
            while (modes[ma] < 99000) {
                evalues[s][(int)modes[ma]] = modes[ma+2];
                ma += 59;
            }
        }
    }

    int sign(double x) {
	return x < 0 ? -1 : 1;
    }

//		public void paint(Graphics g) {
//	cv.repaint();
//    }


    public void updateMOViewer(Graphics realg) {
	Graphics g = null;
	if (winSize == null || winSize.width == 0)
	    return;
	g = dbimage.getGraphics();
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());
	if (fontMetrics == null)
	    fontMetrics = g.getFontMetrics();

	boolean sliced = sliceChooser.getSelectedIndex() != SLICE_NONE;
	zoom = (sliced) ? 8 : 16.55;
	colorMult = Math.exp(brightnessBar.getValue()/100.-2);
	//System.out.println(colorMult);
	computeView(1);
	int i, j, k;

	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].paneY,
		       winSize.width, viewList[i].paneY);
	}

	if (viewPotential != null) {
	    int sno = (int) (sep2-1);
	    double ymult = viewPotential.height * 1.9;
	    g.setColor(Color.darkGray);
	    int floory = viewPotential.y + viewPotential.height/2;
	    for (i = 0; i != 21; i++) {
		double e = evalues[sno][i];
		int y = floory - (int) (ymult * e);
		g.drawLine(0, y, winSize.width, y);
	    }

	    double xp = getScaler();
	    
	    /*
	    g.setColor(Color.white);
	    int ox = -1, oy = -1;
	    int x;
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
	    */
	}

	if (viewPotentialSep != null) {
	    int floory = viewPotentialSep.y + viewPotentialSep.height/2;
	    double ymult = viewPotentialSep.height;
	    if (nuclearItem.getState()) {
		ymult *= .7;
	    } else {
		ymult *= .5;
		floory = viewPotentialSep.y;
	    }

	    for (i = 0; i != 8; i++)
		drawEnergyLine(g, i, floory, ymult);
	    drawEnergyLine(g, stateNum, floory, ymult);

	    g.setColor(Color.yellow);
	    int xx = (int) (sep2*winSize.width/10);
	    g.drawLine(xx, viewPotentialSep.y,
		       xx, viewPotentialSep.y+viewPotentialSep.height-1);
	}

	if (imageSource != null)
	    imageSource.newPixels();
	g.drawImage(memimage, viewX.x, viewX.y, null);
	if (showAtomsItem.getState()) {
	    double scalemult = scaleBar.getValue() / 50.;
	    double zmult = dataSize/2.;
	    double sep = sep2 * .5 / (zmult*scalemult*resadj);
	    g.setColor(Color.yellow);
	    map3d(0, 0,  sep, xpoints, ypoints, 0, viewX);
	    g.drawOval(xpoints[0]-2, ypoints[0]-2, 4, 4);
	    map3d(0, 0, -sep, xpoints, ypoints, 0, viewX);
	    g.drawOval(xpoints[0]-2, ypoints[0]-2, 4, 4);
	}

	g.setColor(Color.white);
	if (sliced)
	    drawCube(g, false);
	if (axesItem.getState())
	    drawAxes(g);
	g.setColor(Color.yellow);
	if (dimensionsItem.getState()) {
	    double w = sep2 * 52.9463;
	    centerString(g, "Separation = " + (int)w + " pm (" + sep2 + " a0)",
			 viewX.y+viewX.height-5);
	}
	
	realg.drawImage(dbimage, 0, 0, this);
	/*if (!allQuiet)
	  cv.repaint(pause);*/
    }

    void drawEnergyLine(Graphics g, int i, int floory, double ymult) {
	int ox = -1, oy = -1;
	g.setColor(stateNum == i ? Color.yellow : Color.darkGray);
	int j;
	for (j = 0; j != 21; j++) {
	    int xx = j*winSize.width/20;
	    double ne = 0;
	    if (nuclearItem.getState())
		ne = (j == 0) ? 10 : 1/(j*.5);
	    int yy = floory - (int) (ymult*(evalues[j][i]+ne));
	    if (ox != -1)
		g.drawLine(ox, oy, xx, yy);
	    ox = xx;
	    oy = yy;
	}
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

    @Override
		public void componentHidden(ComponentEvent e){}
    @Override
		public void componentMoved(ComponentEvent e){}
    @Override
		public void componentShown(ComponentEvent e) {
	cv.repaint();
    }

    @Override
		public void componentResized(ComponentEvent e) {
	handleResize();
	cv.repaint(pause);
    }
    @Override
		public void actionPerformed(ActionEvent e) {
	if (e.getSource() == exitItem) {
	    applet.destroyFrame();
	    return;
	}
	cv.repaint();
    }

    int scaleValue = -1;
    int sepValue = -1;

    @Override
		public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == scaleBar) {
	    if (scaleBar.getValue() == scaleValue)
		return;
	    scaleValue = scaleBar.getValue();
	    precomputeAll();
	    manualScale = true;
	}
	if (e.getSource() == separationBar) {
	    if (separationBar.getValue() == sepValue)
		return;
	    sepValue = separationBar.getValue();
	    precomputeAll();
	}
	if (e.getSource() == resolutionBar)
	    setResolution();
	setupSimpson();
	cv.repaint(pause);
    }

    @Override
		public void mouseDragged(MouseEvent e) {
	dragging = true;
	changingDerivedStates = false;
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

    @Override
		public void mouseMoved(MouseEvent e) {
	if (dragging)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int oldsph = selectedPaneHandle;
	int olds = selection;
	boolean oldss = selectedSlice;
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
	if (viewX != null && viewX.inside(x, y)) {
	    selection = SEL_X;
	    checkSlice(e.getX(), e.getY());
	} else if (viewPotential != null && viewPotential.contains(x, y)) {
	    selection = SEL_POTENTIAL;
	    //findStateByEnergy(y);
	}
	if (oldsph != selectedPaneHandle || olds != selection ||
	    oldss != selectedSlice)
	    cv.repaint(pause);
    }

    @Override
		public void mouseClicked(MouseEvent e) {
    }

    @Override
		public void mouseEntered(MouseEvent e) {
    }
    @Override
		public void mouseExited(MouseEvent e) {
	if (!dragging && selection != 0) {
	    selectedPaneHandle = -1;
	    selection = 0;
	    cv.repaint(pause);
	}
    }
    @Override
		public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragX = dragStartX = e.getX();
	dragY = dragStartY = e.getY();
	dragZoomStart = zoom;
	dragging = true;
	edit(e);
    }
    @Override
		public void mouseReleased(MouseEvent e) {
	if (dragging)
	    cv.repaint();
	dragging = changingDerivedStates = false;
    }

	@Override
	public void itemStateChanged(ItemEvent e) {
		if (samplesItems == null)
			return;
		if (e.getItemSelectable() instanceof JRadioButtonMenuItem) {
                    if (e.getStateChange() != ItemEvent.SELECTED)
                            return;
                    // int nsam = samplesNums.length;
                    // int i;
                    // for (i = 0; i != nsam; i++)
                    // if (samplesItems[i] == e.getItemSelectable())
                    // break;
                    // if (i != nsam) {
                    // samplesItems[i].setSelected(true);
                    // // int j;
                    // // for (j = 0; j != nsam; j++)
                    // // samplesItems[j].setState(i == j);
                    // }
                    setupSimpson();
                    setupDisplay();
		}
		if (e.getItemSelectable() == stateChooser)
			precomputeAll();
		cv.repaint(pause);
	}

    @Override
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

    void createOrbitals() {
	if (orbCount == 11)
	    return;
	orbCount = 11;
	orbitals = new Orbital[orbCount];
	orbitals[0] = new SOrbital();
	orbitals[1] = new SOrbital();
	orbitals[2] = new MZeroOrbital(1);
	orbitals[3] = new MZeroOrbital(1);
	orbitals[4] = new ReImOrbital(1);
	orbitals[5] = new ReImOrbital(1);

	orbitals[6]  = new SOrbital();
	orbitals[7]  = new MZeroOrbital(1);
	orbitals[8]  = new MZeroOrbital(2);
	orbitals[9]  = new ReImOrbital(2);
	orbitals[10] = new MZeroOrbital(3);
    }

    abstract class Orbital {
	int l, m;
	float reMult, imMult;
	boolean used;
	void setupFrame(double mult) {
	    reMult = 1; // state.re*mult;
	    imMult = 0; // state.im*mult;
	}
	void setReal() { }
	void setIm() { }
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

	double getScaleRadius() {
	    // set scale by solving equation Veff(r) = E, assuming m=0
	    // Veff(r) = -1/r + l(l+1)/2, E = 1/2n^2
	    int n = 1; // XXX
	    double b0 = -n*n*2;
	    double c0 = l*(l+1)*n*n;
	    double r0 = .5*(-b0+Math.sqrt(b0*b0-4*c0));
	    return r0;
	}

	final int distmult = 4;
	void precompute() {
	    int x, y, z;
	    dshalf = dataSize/2;
	    double mult = scaleBar.getValue() / 50.;

	    int mpos = (m < 0) ? -m : m;
	    double lgcorrect = Math.pow(-1, m);

	    dataR = new float[dataSize];

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

	void precomputeR(double charge, int n, double mag) {
	    if (Math.abs(mag) < .06) {
		precount++;
		return;
	    }
	    used = true;
	    //System.out.println("precomputing " + precount + " " + n + " " + l + " " + m + " " + charge + " " + mag);
	    precount++;
	    int x, y, z;
	    dshalf = dataSize/2;
	    double mult = scaleBar.getValue() / 50.;

	    int mpos = (m < 0) ? -m : m;
	    double norm = radialNorm(n, l, charge)*sphericalNorm(l, mpos) *
		mag;

	    // r*mult = distance in a0's
	    for (x = 0; x != dataSize; x++) {
		double r = x*resadj + .00000001;
		double rho = 2*charge*r*mult/n;
		double rhol = Math.pow(rho, l)*norm;
		dataR[x] += (float) (hypser(l+1-n, 2*l+2, rho)*rhol*
				     Math.exp(-rho/2));
	    }
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

	double radialNorm(int n, int l, double charge) {
	    double a0 = factorial(n+l);
	    return Math.sqrt(4.*charge*charge*charge*factorial(n+l)/
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

	abstract float computePoint(int r, int costh);
    }

    class SOrbital extends Orbital {
	@Override
	float computePoint(int r, int costh) {
	    try {
		float v = (r < dataSize) ? dataR[r] : 0;
		return reMult*v;
	    } catch (Exception e) {
		return 0;
		//System.out.println("bad " + r + " " + costh);
		//funci = 100;
	    }
	}
    }

    class MZeroOrbital extends Orbital {
	MZeroOrbital(int ll) {
	    l = ll;
	}
	@Override
	float computePoint(int r, int costh) {
	    try {
		float v = (r < dataSize) ? dataR[r]*dataTh[costh] : 0;
		return v*reMult;
	    } catch (Exception e) {
		return 0;
		//System.out.println("bad " + r + " " + costh);
	    }
	}
    }

    class ReImOrbital extends Orbital {
        ReImOrbital(int ll) {
	    l = ll;
	    m = 1;
        }
	float dataPhi[];
	@Override
	void setReal() {
	    dataPhi = dataPhiR;
	}
	@Override
	void setIm() {
	    dataPhi = dataPhiI;
	}
        @Override
				float computePoint(int r, int costh) {
            try {
		float phiValR = dataPhi[phiIndex];
                return (r < dataSize) ? dataR[r]*dataTh[costh]*phiValR*root2
		    : 0;
            } catch (Exception e) {
                return 0;
            }
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
}
