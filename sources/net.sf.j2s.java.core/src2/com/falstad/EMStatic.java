// EMStatic.java (c) 2001 by Paul Falstad, www.falstad.com




package com.falstad;

//web_Ready
//web_AppletName= 2-D Electrostatics
//web_Description= Demonstrates static electric fields and steady-state current
//web_JavaVersion= http://www.falstad.com/emstatic/
//web_AppletImage= emstatic.png
//web_Category= Physics - Electromagnetics
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features: graphics, AWT-to-Swing

// Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
// import javax.swing.applet.Applet --> a2s
//
// import java.awt [Applet, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
// Changed paint() to paintComponent() in EMStaticCanvas and EMStaticFrame
//
// Added Container main
//
// Changed add() to main.add()
// 
// resize and show --> useFrame options
//
// added triggerShow()
//
// added paint() to applet class

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
import java.text.NumberFormat;
import java.util.Vector;

import java.applet.Applet;

import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.Choice;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Scrollbar;

class EMStaticCanvas extends Canvas {
    EMStaticFrame pg;
    EMStaticCanvas(EMStaticFrame p) {
	pg = p;
    }
    @Override
		public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    @Override
		public void update(Graphics g) {
	pg.updateEMStatic(g);
    }
    @Override
		public void paint(Graphics g) {
	pg.updateEMStatic(g);
    }
}

class EMStaticLayout implements LayoutManager {
    public EMStaticLayout() {}
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
	Insets insets = target.insets();
	int targetw = target.size().width - insets.left - insets.right;
	int cw = targetw* 2/3;
	int targeth = target.size().height - (insets.top+insets.bottom);
	target.getComponent(0).setLocation(insets.left, insets.top);
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
		if (m instanceof Label) {
		    h += d.height/5;
		    d.width = barwidth;
		}
		m.setLocation(cw, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	}
    }
}

public class EMStatic extends Applet {
    static EMStaticFrame ogf;
    void destroyFrame() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
    }

    public static void main(String args[]) {
        ogf = new EMStaticFrame(null);
        ogf.init();
    }

    @Override
		public void init() {
	ogf = new EMStaticFrame(this);
	ogf.init();
    }
    @Override
		public void destroy() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
    }
    
	boolean started = false;
    
    @Override
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
}

class EMStaticFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    int gridSizeX;
    int gridSizeY;
    int windowWidth = 50;
    int windowHeight = 50;
    int windowOffsetX = 0;
    int windowOffsetY = 0;
    int chargeRadius = 1;
    public static final double chargeAmt = .5;

    public String getAppletInfo() {
	return "EMStatic by Paul Falstad";
    }

    Button blankButton;
    Checkbox stoppedCheck;
    Checkbox currentCheck;
    Checkbox equipCheck;
    Choice modeChooser;
    Choice viewChooser;
    Choice setupChooser;
    Choice accuracyChooser;
    Vector setupList;
    Setup setup;
    Scrollbar resBar;
    Scrollbar brightnessBar;
    Scrollbar adjustBar;
    Scrollbar equipBar;
    Label adjustLabel;
    GridElement grid[][];
    SolverGrid solverGrids[];
    Charge charges[];
    static final int chargeMax = 20;
    static final int MODE_MOVE = 0;
    static final int MODE_DELETE = 1;
    static final int MODE_FQPLUS = 2;
    static final int MODE_FQMINUS = 3;
    static final int MODE_CLEAR = 4;
    static final int MODE_CONDUCTOR = 5;
    static final int MODE_CPLUS = 6;
    static final int MODE_CMINUS = 7;
    static final int MODE_QPLUS = 8;
    static final int MODE_QMINUS = 9;
    static final int MODE_DIELEC = 10;
    static final int MODE_FLOAT = 11;
    static final int MODE_ADJUST = 12; // same as next one
    static final int MODE_ADJ_CONDUCT = 12;
    static final int MODE_ADJ_DIELEC = 13;
    static final int MODE_ADJ_POT = 14;
    static final int MODE_ADJ_CHARGE = 15;
    
    static final int VIEW_E = 0;
    static final int VIEW_E_LINES = 1;
    static final int VIEW_POT = 2;
    static final int VIEW_A = 3;
    static final int VIEW_B = 4;
    static final int VIEW_J = 5;
    static final int VIEW_Q = 6;
    static final int VIEW_D = 7;
    static final int VIEW_P = 8;
    static final int VIEW_P_CHARGE = 9;
    static final int VIEW_TYPE = 10;
    static final int VIEW_Q_J = 11;
    static final int VIEW_E_Q = 12;
    static final int VIEW_E_LINES_Q = 13;
    static final int VIEW_E_J = 14;
    static final int VIEW_E_LINES_J = 15;
    static final int VIEW_E_Q_J = 16;
    static final int VIEW_E_LINES_Q_J = 17;
    static final int VIEW_E_POT = 18;
    static final int VIEW_E_LINES_POT = 19;
    static final int VIEW_E_POT_COND = 20;
    static final int VIEW_E_LINES_POT_COND = 21;
    static final int VIEW_E_POT_J = 22;
    static final int VIEW_E_LINES_POT_J = 23;
    static final int VIEW_B_J = 24;
    static final int VIEW_E_B_Q_J = 25;
    static final int VIEW_E_LINES_B_Q_J = 26;
    static final int VIEW_EX = 27;
    static final int VIEW_EY = 28;
    static final int VIEW_DX = 29;
    static final int VIEW_DY = 30;
    static final int VIEW_NONE = -1;
    int dragX, dragY;
    int selectedCharge;
    boolean dragging, stopCalc;
    boolean dragClear;
    boolean dragSet;
    boolean objDragMap[][];
    boolean changedCharges, changedConductors, changedMagField;
    double t;
    int pause;
    int chargeCount = 0;
    int adjustSelectX1, adjustSelectY1, adjustSelectX2, adjustSelectY2;
    public boolean useFrame;
    boolean showControls;

    EMStaticCanvas cv;
    EMStatic applet;
    Container main;

    EMStaticFrame(EMStatic a) {
	super("Electrostatics Applet");
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
	// build setup list
	setupList = new Vector();
	Setup s = new SingleChargeSetup();
	int i = 0;
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	    if (i++ == 300) {
		System.out.print("setup loop?\n");
		break;
	    }
	}

	charges = new Charge[chargeMax];
	main.setLayout(new EMStaticLayout());
	cv = new EMStaticCanvas(this);
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

	//add(new Label("Mouse mode:", Label.CENTER));
	modeChooser = new Choice();
	modeChooser.add("Mouse = Move Object");
	modeChooser.add("Mouse = Delete Object");
	modeChooser.add("Mouse = Add + Draggable Charge");
	modeChooser.add("Mouse = Add - Draggable Charge");
	modeChooser.add("Mouse = Clear Square");
	modeChooser.add("Mouse = Add Conductor (Gnd)");
	modeChooser.add("Mouse = Add + Conductor");
	modeChooser.add("Mouse = Add - Conductor");
	modeChooser.add("Mouse = Add + Charge Square");
	modeChooser.add("Mouse = Add - Charge Square");
	modeChooser.add("Mouse = Add Dielectric");
	modeChooser.add("Mouse = Make Floater");
	modeChooser.add("Mouse = Adjust Conductivity");
	modeChooser.add("Mouse = Adjust Dielectric");
	modeChooser.add("Mouse = Adjust Potential");
	modeChooser.add("Mouse = Adjust Charge");
	modeChooser.addItemListener(this);
	modeChooser.select(MODE_MOVE);
	main.add(modeChooser);

	viewChooser = new Choice();
	viewChooser.add("Show Electric Field (E)");
	viewChooser.add("Show E lines");
	viewChooser.add("Show Potential (Phi)");
	viewChooser.add("Show Vector Potential (A)");
	viewChooser.add("Show Magnetic Field (B)");
	viewChooser.add("Show Current (j)");
	viewChooser.add("Show Charge (rho)");
	viewChooser.add("Show Displacement (D)");
	viewChooser.add("Show Polarization (P)");
	viewChooser.add("Show Polarization Charge");
	viewChooser.add("Show Material Type");
	viewChooser.add("Show rho/j");
	viewChooser.add("Show E/rho");
	viewChooser.add("Show E lines/rho");
	viewChooser.add("Show E/j");
	viewChooser.add("Show E lines/j");
	viewChooser.add("Show E/rho/j");
	viewChooser.add("Show E lines/rho/j");
	viewChooser.add("Show E/Phi");
	viewChooser.add("Show E lines/Phi");
	viewChooser.add("Show E/Phi in conductors");
	viewChooser.add("Show E lines/Phi in cond.");
	viewChooser.add("Show E/Phi/j");
	viewChooser.add("Show E lines/Phi/j");
	viewChooser.add("Show B/j");
	viewChooser.add("Show E/B/rho/j");
	viewChooser.add("Show E lines/B/rho/j");
	viewChooser.add("Show Ex");
	viewChooser.add("Show Ey");
	viewChooser.add("Show Dx");
	viewChooser.add("Show Dy");
	viewChooser.addItemListener(this);
	main.add(viewChooser);
	viewChooser.select(VIEW_E_Q_J);

	accuracyChooser = new Choice();
	accuracyChooser.add("Low Accuracy");
	accuracyChooser.add("Medium Accuracy");
	accuracyChooser.add("High Accuracy");
	accuracyChooser.add("Highest Accuracy");
	accuracyChooser.select(2);
	accuracyChooser.addItemListener(this);
	main.add(accuracyChooser);

	main.add(blankButton = new Button("Clear All"));
	blankButton.addActionListener(this);
	stoppedCheck = new Checkbox("Stop Calculation");
	stoppedCheck.addItemListener(this);
	main.add(stoppedCheck);
	currentCheck = new Checkbox("Enable Current", false);
	currentCheck.addItemListener(this);
	main.add(currentCheck);
	equipCheck = new Checkbox("Draw Equipotentials", true);
	equipCheck.addItemListener(this);
	main.add(equipCheck);
	
	main.add(new Label("Resolution", Label.CENTER));
	main.add(resBar = new Scrollbar(Scrollbar.HORIZONTAL, 44, 4, 24, 90));
	resBar.addAdjustmentListener(this);
	setResolution();

	main.add(new Label("Brightness", Label.CENTER));
	main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    10, 1, 1, 2000));
	brightnessBar.addAdjustmentListener(this);

	main.add(new Label("Equipotential Count", Label.CENTER));
	main.add(equipBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 2, 30));
	equipBar.addAdjustmentListener(this);

	main.add(adjustLabel = new Label("", Label.CENTER));
	main.add(adjustBar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 1, 0, 102));
	adjustBar.addAdjustmentListener(this);

	main.add(new Label("http://www.falstad.com"));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	reinit();
	setModeChooser();
	setup = (Setup) setupList.elementAt(0);
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
	
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
//	show();
    }

    void reinit() {
	chargeCount = 0;
	adjustSelectX1 = -1;
	grid = new GridElement[gridSizeX][gridSizeY];
	int i, j;
	for (i = 0; i != gridSizeX; i++)
	    for (j = 0; j != gridSizeY; j++)
		grid[i][j] = new GridElement();
	solverGrids = new SolverGrid[16];
	for (i = 0; i != 16; i++)
	    solverGrids[i] = new SolverGrid();
	doSetup();
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
    }

    @Override
		public boolean handleEvent(Event ev) {
        if (ev.id == Event.WINDOW_DESTROY) {
            applet.destroyFrame();
            return true;
        }
        return super.handleEvent(ev);
    }
    
    void doBlank() {
	int x, y;
	for (x = 0; x < gridSizeX; x++)
	    for (y = 0; y < gridSizeY; y++)
		grid[x][y].clear();
	chargeCount = 0;
	floatCharge = 0;
	changedCharges = changedConductors = true;
    }

    // add a dielectric on lower half of screen
    void doDielec(double d) {
	int x, y;
	for (x = 0; x < gridSizeX; x++)
	    for (y = gridSizeY/2; y < gridSizeY; y++) {
		grid[x][y].dielec = d;
	    }
	changedConductors = true;
    }

    void addUniformField() {
	conductFillRect(0, windowOffsetY,
			gridSizeX-1, windowOffsetY, 1, 1);
	int y = windowOffsetY+windowHeight-1;
	conductFillRect(0, y, gridSizeX-1, y, -1, 1);
    }

    void calcExceptions() {
	int x, y;
	// if walls are in place on border, need to extend that through
	// hidden area to avoid "leaks"
	for (x = 0; x < gridSizeX; x++)
	    for (y = 0; y < windowOffsetY; y++) {
		copyConductor(x, y, x, windowOffsetY);
		copyConductor(x, gridSizeY-y-1,
			      x, windowOffsetY+windowHeight-1);
	    }
	for (y = 0; y < gridSizeY; y++)
	    for (x = 0; x < windowOffsetX; x++) {
		copyConductor(x, y, windowOffsetX, y);
		copyConductor(gridSizeX-x-1, y,
			      windowOffsetX+windowWidth-1, y);
	    }

	// find all dielectric and conductor boundaries and mark them
	for (x = 1; x != gridSizeX-1; x++)
	    for (y = 1; y != gridSizeY-1; y++) {
		GridElement e1 = grid[x][y-1];
		GridElement e2 = grid[x][y+1];
		GridElement e3 = grid[x-1][y];
		GridElement e4 = grid[x+1][y];
		GridElement e0 = grid[x][y];
		e0.boundary = (e1.dielec != e0.dielec ||
			       e2.dielec != e0.dielec ||
			       e3.dielec != e0.dielec ||
			       e4.dielec != e0.dielec ||
			       e1.conductor != e0.conductor ||
			       e2.conductor != e0.conductor ||
			       e3.conductor != e0.conductor ||
			       e4.conductor != e0.conductor);
	    }
    }

    void copyConductor(int x1, int y1, int x2, int y2) {
	grid[x1][y1].conductor = grid[x2][y2].conductor;
	grid[x1][y1].floater = grid[x2][y2].floater;
	grid[x1][y1].conductivity = grid[x2][y2].conductivity;
	if (grid[x1][y1].conductor)
	    grid[x1][y1].pot = grid[x2][y2].pot;
    }

    int getPanelHeight() { return winSize.height / 3; }

    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

//    public void paintComponent(Graphics g) {
//	cv.repaint();
//    }

    boolean calculateNotice;

    public void updateEMStatic(Graphics realg) {
	if (winSize == null || winSize.width == 0)
	    return;
        Graphics g = null;
	g = dbimage.getGraphics();
	if (!calculateNotice && !stoppedCheck.getState() && !stopCalc &&
	    (changedConductors || changedCharges)) {
	    FontMetrics fm = g.getFontMetrics();
	    g.setColor(Color.black);
	    String cs = "Calculating...";
	    g.fillRect(0, winSize.height-30, 20+fm.stringWidth(cs), 30);
	    g.setColor(Color.white);
	    g.drawString(cs, 10, winSize.height-10);
	    cv.repaint(0);
	    calculateNotice = true;
	    realg.drawImage(dbimage, 0, 0, this);
	    return;
	}
	calculateNotice = false;

	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	int i, j;

	double mult = brightnessBar.getValue() / 5.0;
	int ix = 0;
	int k, l;

	int viewScalar, viewVector, viewScalarCond, viewVectorCond;
	viewScalar = viewScalarCond = viewVector = viewVectorCond = VIEW_NONE;
	int v = viewChooser.getSelectedIndex();
	boolean showLines = false, conductLines = false;
	boolean needA = false;
	switch (v) {
	case VIEW_POT:
	case VIEW_Q:
	case VIEW_P_CHARGE:
	case VIEW_TYPE:
	    viewScalar = viewScalarCond = v;
	    break;
	case VIEW_B:
	case VIEW_DX:
	case VIEW_DY:
	case VIEW_EX:
	case VIEW_EY:
	    viewScalar = viewScalarCond = v;
	    needA = true;
	    break;
	case VIEW_E:
	case VIEW_D:
	case VIEW_P:
	case VIEW_J:
	    viewVector = viewVectorCond = v;
	    break;
	case VIEW_A:
	    viewVector = viewVectorCond = v;
	    needA = true;
	    break;
	case VIEW_E_J:
	    viewVector = VIEW_E;
	    viewVectorCond = VIEW_J;
	    break;
	case VIEW_E_LINES_J:
	    viewVectorCond = VIEW_J;
	    showLines = true;
	    break;
	case VIEW_E_LINES:
	    showLines = conductLines = true;
	    break;
	case VIEW_Q_J:
	    viewScalar = viewScalarCond = VIEW_Q;
	    viewVector = viewVectorCond = VIEW_J;
	    break;
	case VIEW_E_Q:
	    viewScalar = viewScalarCond = VIEW_Q;
	    viewVector = viewVectorCond = VIEW_E;
	    break;
	case VIEW_E_LINES_Q:
	    viewScalar = viewScalarCond = VIEW_Q;
	    showLines = conductLines = true;
	    break;
	case VIEW_E_LINES_B_Q_J:
	    viewScalar = VIEW_B;
	    viewScalarCond = VIEW_Q;
	    viewVectorCond = VIEW_J;
	    showLines = true;
	    needA = true;
	    break;
	case VIEW_E_POT:
	    viewScalar = viewScalarCond = VIEW_POT;
	    viewVector = viewVectorCond = VIEW_E;
	    break;
	case VIEW_E_LINES_POT:
	    viewScalar = viewScalarCond = VIEW_POT;
	    showLines = conductLines = true;
	    break;
	case VIEW_E_POT_J:
	    viewScalar = viewScalarCond = VIEW_POT;
	    viewVector = VIEW_E;
	    viewVectorCond = VIEW_J;
	    break;
	case VIEW_E_LINES_POT_J:
	    viewScalar = viewScalarCond = VIEW_POT;
	    viewVectorCond = VIEW_J;
	    showLines = true;
	    break;
	case VIEW_E_POT_COND:
	    viewScalar = VIEW_NONE;
	    viewScalarCond = VIEW_POT;
	    viewVector = VIEW_E;
	    break;
	case VIEW_E_LINES_POT_COND:
	    viewScalar = VIEW_NONE;
	    viewScalarCond = VIEW_POT;
	    showLines = true;
	    break;
	case VIEW_E_Q_J:
	    viewScalar = viewScalarCond = VIEW_Q;
	    viewVector = VIEW_E;
	    viewVectorCond = VIEW_J;
	    break;
	case VIEW_E_LINES_Q_J:
	    viewScalar = viewScalarCond = VIEW_Q;
	    viewVectorCond = VIEW_J;
	    showLines = true;
	    break;
	case VIEW_B_J:
	    viewScalar = viewScalarCond = VIEW_B;
	    viewVector = viewVectorCond = VIEW_J;
	    needA = true;
	    break;
	case VIEW_E_B_Q_J:
	    viewScalar = VIEW_B;
	    viewScalarCond = VIEW_Q;
	    viewVector = VIEW_E;
	    viewVectorCond = VIEW_J;
	    needA = true;
	    break;
	}
	doCalc(needA);
	if (stopCalc) {
	    viewVector = viewVectorCond = viewScalar = VIEW_NONE;
	    if (viewScalarCond != VIEW_POT)
		viewScalarCond = VIEW_NONE;
	}
	for (j = 0; j != windowHeight; j++) {
	    ix = winSize.width*(j*winSize.height/windowHeight);
	    for (i = 0; i != windowWidth; i++) {
		int x = i*winSize.width/windowWidth;
		int y = j*winSize.height/windowHeight;
		int x2 = (i+1)*winSize.width/windowWidth;
		int y2 = (j+1)*winSize.height/windowHeight;
		int i2 = i+windowOffsetX;
		int j2 = j+windowOffsetY;
		int vs = viewScalar;
		int vv = viewVector;
		int col_r = 0, col_g = 0, col_b = 0;
		GridElement ge = grid[i2][j2];

		// highlight selected object
		if (ge.conductor || ge.dielec != 1 || ge.charge != 0) {
		    col_r = col_g = col_b = 64;
		    if (objDragMap != null) {
			try {
			    if (objDragMap[i2-dragObjX][j2-dragObjY]) {
				col_r = col_g = col_b = 128;
			    }
			} catch (Exception e) { }
		    }
		    if (ge.conductor) {
			vv = viewVectorCond;
			vs = viewScalarCond;
		    }
		}

		if (vs != VIEW_NONE) {
		    double dy = 0;
		    switch (vs) {
		    case VIEW_POT: dy = ge.pot * .2 * mult; break;
		    case VIEW_Q:   dy = .4*getCharge(i2, j2) * mult; break;
		    case VIEW_EX:
			dy = getEField(ge, grid[i2-1][j2], grid[i2+1][j2]) *
			    mult;
			break;
		    case VIEW_EY:
			dy = getEField(ge, grid[i2][j2-1], grid[i2][j2+1]) *
			    mult;
			break;
		    case VIEW_DX:
			dy = getDField(ge, grid[i2-1][j2], grid[i2+1][j2], 0) *
			    mult;
			break;
		    case VIEW_DY:
			dy = getDField(ge, grid[i2][j2-1], grid[i2][j2+1], 0) *
			    mult;
			break;
		    case VIEW_B:
			// calculate curl
			double daydx = grid[i2-1][j2].ay-grid[i2+1][j2].ay;
			double daxdy = grid[i2][j2+1].ax-grid[i2][j2-1].ax;
			dy = (daydx+daxdy)*mult;
			break;
		    case VIEW_P_CHARGE:
			dy = (getPCharge(ge, grid[i2-1][j2], grid[i2+1][j2]) +
			      getPCharge(ge, grid[i2][j2-1], grid[i2][j2+1]))
			    *.4*mult;
			vs = VIEW_Q;
			break;
		    }
		    if (dy < -1)
			dy = -1;
		    if (dy > 1)
			dy = 1;
		    if (vs == VIEW_TYPE) {
			double dr = 0, dg = 0, db = 0;
			if (ge.conductor) {
			    if (ge.floater > 0)
				dr = db = 1;
			    else
				dg = db = ge.conductivity;
			} else if (ge.dielec != 1) {
			    dr = ge.dielec/10;
			    dg = dr*.5;
			} else if (ge.charge != 0) {
			    dy = ge.charge*mult;
			    if (dy < 0)
				col_b = col_b+(int) (-dy*(255-col_b));
			    else {
				col_r = col_r+(int) (dy*(255-col_r));
				col_g = col_g+(int) (dy*(255-col_g));
			    }
			}
			col_r = col_r+(int) (clamp(dr)*(255-col_r));
			col_g = col_g+(int) (clamp(dg)*(255-col_g));
			col_b = col_b+(int) (clamp(db)*(255-col_b));
		    } else if (vs == VIEW_Q) {
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
		g.setColor(new Color(col));
		g.fillRect(x, y, x2-x, y2-y);
		ge.col = col;
		if (vv != VIEW_NONE) {
		    double dx = 0, dy = 0;
		    switch (vv) {
		    case VIEW_E:
			if (!ge.boundary) {
			    dx = -grid[i2+1][j2].pot + grid[i2-1][j2].pot;
			    dy = -grid[i2][j2+1].pot + grid[i2][j2-1].pot;
			} else {
			    dx = getEField(ge, grid[i2-1][j2], grid[i2+1][j2]);
			    dy = getEField(ge, grid[i2][j2-1], grid[i2][j2+1]);
			}
			break;
		    case VIEW_D:
			dx = getDField(ge, grid[i2-1][j2], grid[i2+1][j2], 0);
			dy = getDField(ge, grid[i2][j2-1], grid[i2][j2+1], 0);
			break;
		    case VIEW_P:
			dx = getDField(ge, grid[i2-1][j2], grid[i2+1][j2], 1);
			dy = getDField(ge, grid[i2][j2-1], grid[i2][j2+1], 1);
			break;
		    case VIEW_J:
			dx = ge.jx;
			dy = ge.jy;
			break;
		    case VIEW_A:
			dx = ge.ax * .3;
			dy = ge.ay * .3;
			break;
		    }
		    double dn = java.lang.Math.sqrt(dx*dx+dy*dy);
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
		    g.setColor(new Color(col));

		    // draw arrow
		    int x1 = x+sw2-(int) (sw2*dx);
		    int y1 = y+sh2-(int) (sh2*dy);
		    x2 = x+sw2+(int) (sw2*dx);
		    y2 = y+sh2+(int) (sh2*dy);
		    g.drawLine(x1, y1, x2, y2);
		    int as = 3;
		    g.drawLine(x2, y2,
			       (int) ( dy*as-dx*as+x2),
			       (int) (-dx*as-dy*as+y2));
		    g.drawLine(x2, y2,
			       (int) (-dy*as-dx*as+x2),
			       (int) ( dx*as-dy*as+y2));
		}
	    }
	}
	if (!stopCalc) {
	    if (showLines)
		renderLines(g, conductLines);
	    if (equipCheck.getState())
		renderEquips(g);
	}
	
	// draw charges
	chargeRadius = winSize.width*5/(windowWidth*4);
	for (i = 0; i < chargeCount; i++) {
	    Charge src = charges[i];
	    int xx = src.getScreenX();
	    int yy = src.getScreenY();
	    int rad = chargeRadius;
	    //g.setColor(src.v < 0 ? Color.blue : Color.yellow);
	    double dy = src.v * mult * .4;
	    if (dy < 0) {
		int b = (int) (-dy*(255-64))+64;
		if (b > 255)
		    b = 255;
		g.setColor(new Color(64, 64, b));
	    } else {
		int r = (int) (dy*(255-64))+64;
		if (r > 255)
		    r = 255;
		g.setColor(new Color(r, r, 64));
	    }
	    g.fillOval(xx-rad, yy-rad, rad*2, rad*2);
	    if (i == selectedCharge) {
		g.setColor(Color.white);
		g.drawOval(xx-rad, yy-rad, rad*2, rad*2);
	    }
	    g.setColor(Color.black);
	    g.drawLine(xx-rad/2, yy, xx+rad/2, yy);
	    if (src.v > 0)
		g.drawLine(xx, yy-rad/2, xx, yy+rad/2);
	}

	// highlight adjustment area
	if (adjustSelectX1 != -1) {
	    g.setColor(Color.cyan);
	    int lx1 = (int) (adjustSelectX1*winSize.width /windowWidth);
	    int ly1 = (int) (adjustSelectY1*winSize.height/windowHeight);
	    int lx2 = (int) ((adjustSelectX2+1)*winSize.width /windowWidth);
	    int ly2 = (int) ((adjustSelectY2+1)*winSize.height/windowHeight);
	    g.drawRect(lx1, ly1, lx2-lx1-1, ly2-ly1-1);
	}

	// calculate charge of selected object
	if (objDragMap != null) {
	    NumberFormat nf = NumberFormat.getInstance();
	    nf.setMaximumFractionDigits(3);
	    FontMetrics fm = g.getFontMetrics();
	    g.setColor(Color.black);
	    String cs = "Q = " + nf.format(getSelObjCharge());
	    g.fillRect(0, winSize.height-30, 20+fm.stringWidth(cs), 30);
	    g.setColor(Color.white);
	    g.drawString(cs, 10, winSize.height-10);
	}

	realg.drawImage(dbimage, 0, 0, this);
    }

    double clamp(double x) {
	return (x < 0) ? 0 : (x > 1) ? 1 : x;
    }

    boolean solveCurrent;

    void doCalc(boolean needA) {
	if (stoppedCheck.getState() || stopCalc) {
	    if (changedConductors || changedCharges) {
		// clear out fields if something changed but calculation
		// is turned off
		int i, j;
		for (i = 0; i != gridSizeX; i++)
		    for (j = 0; j != gridSizeY; j++) {
			GridElement ge = grid[i][j];
			ge.jx = ge.jy = ge.ax = ge.ay = 0;
			if (!ge.conductor)
			    ge.pot = 0;
		    }
	    }
	    return;
	}
	boolean hasPath = false;
	if (changedConductors) {
	    calcExceptions();
	    hasPath = findCurrentPath();
	}
	SolverElement sg[][] = new SolverElement[gridSizeX][gridSizeY];
	int i, j;
	if (hasPath) {
	    // calculate potential (and then current) on current path
	    // using standard solver.  To do that, we ignore all grid
	    // squares not on the current path, and treat current path
	    // squares as dielectrics where the dielectric constant is
	    // the conductivity.
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j] = new SolverElement();
		    se.charge = 0;
		    se.boundary = true;
		    if (ge.currentPath) {
			se.pot = (j == 0) ? 1 : (j == gridSizeY-1) ? -1 : 0;
			
			// conductors are only at the top and bottom of the
			// grid, because "conductor" means "fixed potential"
			// as far as the solver is concerned.
			se.conductor = (j == 0 || j == gridSizeY-1);

			se.ignore = false;
			se.dielec = ge.conductivity;
		    } else {
			// ignore everything not on the current path
			se.ignore = true;
			se.dielec = 0;
			se.pot = 0;
		    }
		}
	    solveCurrent = true;
	    doSolve(sg, 0, gridSizeX);
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j];
		    if (ge.currentPath && i > 0 && i < gridSizeX-1 && 
			j > 0 && j < gridSizeY-1) {
			ge.pot = se.pot;

			// calculate current.  have to go to some extra
			// work here to make current appear smooth
			// across conductor boundaries
			double d1 = (grid[i-1][j].currentPath) ?
			    sg[i-1][j].pot : ge.pot;
			double d2 = (grid[i+1][j].currentPath) ?
			    sg[i+1][j].pot : ge.pot;
			double d3 = (grid[i][j-1].currentPath) ?
			    sg[i][j-1].pot : ge.pot;
			double d4 = (grid[i][j+1].currentPath) ?
			    sg[i][j+1].pot : ge.pot;
			ge.jx = (d1-ge.pot)*(grid[i-1][j].conductivity) +
			    (ge.pot-d2)*ge.conductivity;
			ge.jy = (d3-ge.pot)*(grid[i][j-1].conductivity) +
			    (ge.pot-d4)*ge.conductivity;
		    } else {
			// ground conductors and zero out current on all
			// non-current-path squares.
			ge.jx = ge.jy = 0;
			if (ge.conductor)
			    ge.pot = 0;
		    }
		}
	    changedMagField = changedConductors = true;
	} else if (changedConductors) {
	    // if there is no current path, zero out the magnetic field
	    changedMagField = false;
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    ge.ax = ge.ay = ge.jx = ge.jy = 0;
		}
	}

	if (changedConductors || changedCharges) {
	    // calculate potential on all non-conducting squares
	    boolean floater = false;
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j] = new SolverElement();
		    se.dielec = ge.dielec;
		    if (ge.conductor) {
			ge.charge = 0;
			if (ge.floater > 0) {
			    // for floaters, zero potential to zero for now
			    ge.pot = 0;
			    floater = true;
			}
			// GridElement.dielec applies to the material
			// between this square and the ones to the right
			// of it and below it.  But it's not possible from
			// the UI to create a square that is both dielectric
			// and conducting.  So we do some fudging to make it
			// possible to fill the area between two conductors
			// with dielectric.
			if (i < gridSizeX-1 && !grid[i+1][j].conductor)
			    se.dielec = grid[i+1][j].dielec;
			else if (j < gridSizeY-1 && !grid[i][j+1].conductor)
			    se.dielec = grid[i][j+1].dielec;
		    }
		    se.charge = ge.charge;
		    se.ignore = false;
		    se.pot = ge.pot;
		    se.conductor = ge.conductor;
		    se.boundary = ge.boundary;
		}
	    solveCurrent = false;
	    doSolve(sg, 0, gridSizeX);
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j];
		    ge.pot = se.pot;
		}
	    
	    if (floater)
		doFloater(sg);
	    else
		floatCharge = 0;
	}

	if (changedMagField && needA) {
	    // calculate vector potential from current
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j] = new SolverElement();
		    se.charge = ge.jx*.01;
		    se.dielec = 1;
		}
	    doSolve(sg, 0, gridSizeX);
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j];
		    ge.ax = se.pot;
		    se.charge = ge.jy*.01;
		    se.pot = 0;
		}
	    doSolve(sg, 0, gridSizeX);
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j];
		    ge.ay = se.pot;
		}
	    changedMagField = false;
	}
	changedConductors = changedCharges = false;
    }

    void checkAdjConductor(int x, int y, Point adj) {
	if (adj.x == -2)
	    return;
	if (grid[x][y].conductor && grid[x][y].floater == 0) {
	    if (adj.x >= 0 && grid[x][y].pot != grid[adj.x][adj.y].pot) {
		adj.x = -2;
	    } else {
		adj.x = x;
		adj.y = y;
	    }
	}
    }

    double floatCap, floatCharge = 0, floatExtCharge;
    void doFloater(SolverElement sg[][]) {
	// set the potential on the floating conductor
	int i, j;
	floatExtCharge = 0;
	double fp1 = 0;
	Point adj = new Point(-1, 0);

	// calculate charge on the floater with potential at ground.
	// also see if the floater is touching a fixed conductor.
	for (i = 0; i != gridSizeX; i++)
	    for (j = 0; j != gridSizeY; j++) {
		GridElement ge = grid[i][j];
		if (ge.floater > 0) {
		    fp1 = ge.pot;
		    floatExtCharge += getCharge(i, j);
		    checkAdjConductor(i+1, j, adj);
		    checkAdjConductor(i-1, j, adj);
		    checkAdjConductor(i, j+1, adj);
		    checkAdjConductor(i, j-1, adj);
		}
	    }
	double adjPot = 0;
	boolean isAdj = false;
	if (adj.x == -2)
	    System.out.print("two floating potentials!\n");
	else if (adj.x != -1) {
	    // it is touching a fixed conductor, so set its potential
	    // to be the same
	    isAdj = true;
	    adjPot = grid[adj.x][adj.y].pot;
	    //System.out.print("adjacent " + adjPot + "\n");
	}
	//System.out.print("floatExtCharge " + floatExtCharge + " " + fp1 + "\n");
	if (changedConductors) {
	    double fp = 0;
	    // calculate potential at all points on grid if floater is
	    // raised to a potential of 1.  ground all other conductors
	    // and delete all other charges.  Store this in floatPot.
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j];
		    se.pot = (ge.conductor && ge.floater > 0) ? 1 : 0;
		    se.charge = 0;
		    //se.dielec = ge.dielec;
		    //se.ignore = false;
		    //se.conductor = ge.conductor;
		    //se.boundary = ge.boundary;
		}
	    solveCurrent = false;
	    doSolve(sg, 0, gridSizeX);
	    floatCap = 0;
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    SolverElement se = sg[i][j];
		    double pot = ge.floatPot = se.pot;
		    if (ge.floater > 0) {
			fp = pot;
			// calculate charge on floater at unit potential
			if (!grid[i+1][j].conductor)
			    floatCap -= sg[i+1][j].pot-pot;
			if (!grid[i-1][j].conductor)
			    floatCap -= sg[i-1][j].pot-pot;
			if (!grid[i][j+1].conductor)
			    floatCap -= sg[i][j+1].pot-pot;
			if (!grid[i][j-1].conductor)
			    floatCap -= sg[i][j-1].pot-pot;
		    }
		}
	    //System.out.print("charge2 " + floatCap + " " + fp + "\n");
	}
	double mult = 0;
	if (isAdj)
	    // fix potential at adjacent conductor's potential
	    mult = adjPot;
	else
	    // raise potential just enough so that the charge on the
	    // floater is same as last time (floatCharge).
	    mult = (floatCharge-floatExtCharge)/floatCap;

	// add in a multiple of floatPot to every square on the grid.
	for (i = 0; i != gridSizeX; i++)
	    for (j = 0; j != gridSizeY; j++) {
		GridElement ge = grid[i][j];
		ge.pot += ge.floatPot*mult;
	    }
	if (isAdj) {
	    // calculate new charge on floater if we are touching a
	    // conductor
	    double charge2 = 0;
	    for (i = 0; i != gridSizeX; i++)
		for (j = 0; j != gridSizeY; j++) {
		    GridElement ge = grid[i][j];
		    if (ge.floater > 0)
			charge2 += getCharge(i, j);
		}
	    floatCharge = charge2;
	}
	//System.out.print("charge3 " + charge2 + " " + floatCharge + "\n");
    }

    // solve poisson's equation using a multigrid-like technique
    void doSolve(SolverElement g1[][], int step, int size) {
	int i, j;
	int size1 = size-1;
	if (size > 3) {
	    // get a good starting guess by halving the resolution and
	    // calling doSolve recursively.
	    int size2 = size/2+1;
	    //System.out.print("starting " + size2 + "\n");
	    SolverElement g2[][] = solverGrids[step].grid;
	    if (g2 == null)
		g2 = solverGrids[step].grid = new SolverElement[size2][size2];
	    for (i = 0; i != size2; i++)
		for (j = 0; j != size2; j++) {
		    int i2 = i*2;
		    int j2 = j*2;
		    if (i2 >= size)
			i2 = size1;
		    if (j2 >= size)
			j2 = size1;
		    if (g2[i][j] == null)
			g2[i][j] = new SolverElement();
		    double c = g1[i2][j2].charge;
		    double d = g1[i2][j2].dielec;
		    boolean b = g1[i2][j2].boundary;
		    int ig = (g1[i2][j2].ignore) ? 1 : 0;
		    int sq = 1;
		    if (i2 < size1) {
			c += g1[i2+1][j2].charge;
			d += g1[i2+1][j2].dielec;
			b |= g1[i2+1][j2].boundary;
			ig += (g1[i2+1][j2].ignore) ? 1 : 0;
			sq++;
			if (j2 < size1) {
			    c += g1[i2+1][j2+1].charge;
			    d += g1[i2+1][j2+1].dielec;
			    b |= g1[i2+1][j2+1].boundary;
			    ig += (g1[i2+1][j2+1].ignore) ? 1 : 0;
			    sq++;
			}
		    }
		    if (j2 < size1) {
			c += g1[i2][j2+1].charge;
			d += g1[i2][j2+1].dielec;
			b |= g1[i2][j2+1].boundary;
			ig += (g1[i2][j2+1].ignore) ? 1 : 0; // XXX use byte
			sq++;
		    }
		    g2[i][j].charge = c;
		    g2[i][j].dielec = d/sq;
		    g2[i][j].boundary = b;
		    g2[i][j].ignore = (ig == sq) ? true : false;
		    if (solveCurrent)
			g2[i][j].dielec = (ig == sq) ? 0 : d/(4-ig);
		    int cc = 0;
		    double cpot = 0;
		    if (g1[i2  ][j2  ].conductor) {
			cc++; cpot += g1[i2][j2].pot;
		    }
		    if (i2 < size1 && g1[i2+1][j2  ].conductor) {
			cc++; cpot += g1[i2+1][j2].pot;
		    }
		    if (j2 < size1 && g1[i2  ][j2+1].conductor) {
			cc++; cpot += g1[i2][j2+1].pot;
		    }
		    if (i2 < size1 && j2 < size1 &&
			g1[i2+1][j2+1].conductor) {
			cc++; cpot += g1[i2+1][j2+1].pot;
		    }
		    if (cc > 0 && g2[i][j].charge == 0) {
			g2[i][j].conductor = true;
			g2[i][j].pot = cpot/cc;
		    } else {
			g2[i][j].conductor = false;
			g2[i][j].pot = 0;
		    }
		}

	    // ok, now call doSolve recursively
	    doSolve(g2, step+1, size2);

	    // get the coarser solution and map it back to this grid
	    for (i = 1; i != size1; i++)
		for (j = 1; j != size1; j++) {
		    if (!g1[i][j].conductor)
			g1[i][j].pot = g2[i/2][j/2].pot;
		}
	}
	//System.out.print("size " + size + "\n");
	int iters = 0;
	double tol = 0;
	int maxiter = 200;
	switch (accuracyChooser.getSelectedIndex()) {
	case 0: tol = 30*5e-6; break;
	case 1: tol = 15*5e-6; break;
	case 2: tol = 15e-6;   maxiter = 400; break;
	case 3:
	    tol = 1e-7;
	    if (step == 0)
		maxiter = 20000;
	    else
		maxiter = 1000;
	    break;
	}
	double err = 0;
	if (step > 1) {
	    if (maxiter < 400)
		maxiter = 400;
	    tol /= 5;
	}
	if (step == 0 && maxiter < 1000)
	    tol /= 2;

	// now use relaxation to solve poisson's equation
	while (true) {
	    err = 0;
	    for (i = 1; i != size1; i++)
		for (j = 1; j != size1; j++) {
		    SolverElement ge = g1[i][j];
		    if (ge.conductor || ge.ignore)
			continue;
		    double previ, nexti, prevj, nextj, np;
		    if (ge.boundary) {
			// we do extra work for dielectric boundaries
			// or squares adjacent to "ignore" squares.
			previ = g1[i-1][j].pot*g1[i-1][j].dielec;
			nexti = g1[i+1][j].pot*g1[i  ][j].dielec;
			prevj = g1[i][j-1].pot*g1[i][j-1].dielec;
			nextj = g1[i][j+1].pot*g1[i][j  ].dielec;
			double div = (g1[i-1][j].dielec + g1[i][j].dielec +
				      g1[i][j-1].dielec + g1[i][j].dielec);
			if (solveCurrent) {
			    if (g1[i-1][j].ignore)
				{ previ = 0; div -= g1[i-1][j].dielec; }
			    if (g1[i+1][j].ignore)
				{ nexti = 0; div -= g1[i][j].dielec; }
			    if (g1[i][j-1].ignore)
				{ prevj = 0; div -= g1[i][j-1].dielec; }
			    if (g1[i][j+1].ignore)
				{ nextj = 0; div -= g1[i][j].dielec; }
			}
			np = (nexti+previ+nextj+prevj)/div + ge.charge/ge.dielec;
		    } else {
			// make common case fast
			previ = g1[i-1][j].pot;
			nexti = g1[i+1][j].pot;
			prevj = g1[i][j-1].pot;
			nextj = g1[i][j+1].pot;
			np = (nexti+previ+nextj+prevj)*.25 + ge.charge/ge.dielec;
		    }
		    err += (np > ge.pot) ? np-ge.pot : ge.pot-np;
		    ge.pot = np;
		}
	    iters++;
	    if (err/(size*size) < tol || iters == maxiter)
		break;
	}
	//System.out.print("size " + size + " iters " + iters + " " + err/(size*size) + "\n");
    }

    boolean findCurrentPath() {
	if (!currentCheck.getState())
	    return false;
	int i, j;
	for (j = 0; j != gridSizeY; j++) {
	    for (i = 0; i != gridSizeX; i++) {
		GridElement ge = grid[i][j];
		ge.currentPath = false;
	    }
	}
	boolean returnVal = currentPathSearch(0, 1);
	returnVal |= currentPathSearch(gridSizeY-1, -1);
	return returnVal;
    }

    boolean currentPathSearch(int y, int pot) {
	// do a depth-first search (flood fill) to see if there is any
	// path from row y to the opposite side of the grid.  While
	// we're at it, set the potential (in case there is no path,
	// or in case there are some conductors touching that row
	// which are not connected to the current path).
	int i;
	Vector stack = null;
	for (i = 0; i != gridSizeX; i++)
	    if (grid[i][y].conductor) {
		if (stack == null)
		    stack = new Vector();
		stack.addElement(new Point(i, y));
	    }
	if (stack == null)
	    return false;
	boolean returnVal = false;
	while (stack.size() > 0) {
	    Point x = (Point) stack.elementAt(stack.size()-1);
	    stack.removeElementAt(stack.size()-1);
	    GridElement ge = grid[x.x][x.y];
	    if (!ge.conductor || ge.currentPath)
		continue;
	    ge.currentPath = true;
	    ge.pot = pot;
	    if (x.x > 0)
		stack.addElement(new Point(x.x-1, x.y));
	    if (x.y > 0)
		stack.addElement(new Point(x.x, x.y-1));
	    else if (y != 0)
		returnVal = true;
	    if (x.x < gridSizeX-1)
		stack.addElement(new Point(x.x+1, x.y));
	    if (x.y < gridSizeY-1)
		stack.addElement(new Point(x.x, x.y+1));
	    else if (y == 0)
		returnVal = true;
	}
	return returnVal;
    }

    // calculate charge at a particular grid location
    double getCharge(int x, int y) {
	GridElement ge = grid[x][y];

	// this was determined by trial and error
	final double scale = 3.72;

	if (!ge.conductor)
	    return ge.charge*scale;
	double c = ge.charge*scale;
	c -= (grid[x+1][y].pot-ge.pot)*(grid[x+1][y].dielec);
	//if (!grid[x-1][y].conductor)
	c -= (grid[x-1][y].pot-ge.pot)*(grid[x-1][y].dielec);
	//if (!grid[x][y+1].conductor)
	c -= (grid[x][y+1].pot-ge.pot)*(grid[x][y+1].dielec);
	//if (!grid[x][y-1].conductor)
	c -= (grid[x][y-1].pot-ge.pot)*(grid[x][y-1].dielec);
	return c;
    }

    // calculate E field with some extra work to do one-sided
    // derivatives at conductor and dielectric boundaries.
    // ge = square we want the E field for, gn = next square,
    // gp = previous square.
    double getEField(GridElement ge, GridElement gp, GridElement gn) {
	if (ge.conductor && !gn.conductor && !gp.conductor)
	    return -gn.pot + gp.pot;
	if (ge.dielec != gp.dielec || ge.conductor != gp.conductor)
	    return 2*(ge.pot-gn.pot);
	if (ge.conductor != gn.conductor)
	    return 2*(gp.pot-ge.pot);
	return -gn.pot + gp.pot;
    }

    // calculate D and P with some extra work to do one-sided
    // derivatives at conductor and dielectric boundaries.
    // p = 0 to calculate D, 1 to calculate P.
    double getDField(GridElement ge, GridElement gp, GridElement gn,
		     double p) {
	if (ge.conductor && !gn.conductor && !gp.conductor)
	    return (ge.pot-gn.pot)*(ge.dielec-p) +
		(gp.pot-ge.pot)*(gp.dielec-p);
	if (ge.dielec != gp.dielec || ge.conductor != gp.conductor)
	    return 2*(ge.pot-gn.pot)*(ge.dielec-p);
	if (ge.conductor != gn.conductor)
	    return 2*(gp.pot-ge.pot)*(gp.dielec-p);
	return (ge.pot-gn.pot)*(ge.dielec-p) + (gp.pot-ge.pot)*(gp.dielec-p);
    }

    // get polarization charge
    double getPCharge(GridElement ge, GridElement gp, GridElement gn) {
	if (ge.dielec == gp.dielec)
	    return 0;
	return (ge.dielec-1)*(gn.pot-ge.pot) - (gp.dielec-1)*(ge.pot-gp.pot);
    }

    int abs(int x) {
	return x < 0 ? -x : x;
    }

    int sign(int x) {
	return (x < 0) ? -1 : (x == 0) ? 0 : 1;
    }

    byte linegrid[][];

    // render field lines
    void renderLines(Graphics g, boolean inConduct) {
	double x = 0, y = 0;
	g.setColor(Color.white);
	final double lspacing = 1.5;
	int cgridw = (int) (windowWidth*lspacing);
	int cgridh = (int) (windowHeight*lspacing);
	if (linegrid == null)
	    linegrid = new byte[cgridw+1][cgridh+1];
	double startx = -1, starty = 0;
	int linemax = 0;
	double mult = brightnessBar.getValue() / 5.0;
	boolean doArrow = false;
	int dir = 1;
	double olddn = -1;
	int oldcol = -1;
	int gridsearchx = 0, gridsearchy = 0;
	int i, j;
	for (i = 0; i != cgridw; i++)
	    for (j = 0; j != cgridh; j++)
		linegrid[i][j] = 0;
	while (true) {
	    if (linemax-- == 0 || x == 0) {
		if (dir == 1) {
		    while (true) {
			if (linegrid[gridsearchx][gridsearchy] == 0)
			    break;
			if (++gridsearchx == cgridw) {
			    if (++gridsearchy == cgridh)
				break;
			    gridsearchx = 0;
			}
		    }
		    if (gridsearchx == cgridw && gridsearchy == cgridh)
			break;
		    startx = gridsearchx/lspacing;
		    starty = gridsearchy/lspacing;
		}
		x = startx+.5/lspacing;
		y = starty+.5/lspacing;
		linemax = 40; // was 100
		doArrow = (dir == -1);
		dir = -dir;
	    }
	    if (x < 0 || y < 0 || x >= windowWidth || y >= windowHeight) {
		x = 0;
		continue;
	    }
	    int cgx = (int) (x*lspacing);
	    int cgy = (int) (y*lspacing);
	    if (++linegrid[cgx][cgy] > 2) {
		x = 0;
		continue;
	    }
	    if (linegrid[cgx][cgy] == 1)
		doArrow = true;
	    int xi = windowOffsetX+(int) x;
	    int yi = windowOffsetY+(int) y;
	    GridElement ge = grid[xi][yi];
	    if (!inConduct && ge.conductor) {
		x = 0;
		continue;
	    }
	    double dx, dy;
	    if (!ge.boundary) {
		dx = -grid[xi+1][yi].pot + grid[xi-1][yi].pot;
		dy = -grid[xi][yi+1].pot + grid[xi][yi-1].pot;
	    } else {
		dx = getEField(ge, grid[xi-1][yi], grid[xi+1][yi]);
		dy = getEField(ge, grid[xi][yi-1], grid[xi][yi+1]);
	    }
	    double dn = java.lang.Math.sqrt(dx*dx+dy*dy);
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
	    int col = grid[xi][yi].col;
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
		g.setColor(new Color(col));
		olddn = dn;
		oldcol = col;
	    }
	    int lx1 = (int) (oldx*winSize.width /windowWidth);
	    int ly1 = (int) (oldy*winSize.height/windowHeight);
	    int lx2 = (int) (x*winSize.width /windowWidth);
	    int ly2 = (int) (y*winSize.height/windowHeight);
	    g.drawLine(lx1, ly1, lx2, ly2);
	    if (doArrow) {
		doArrow = false;
		if ((cgx & 3) == 0 && (cgy & 3) == 0) {
		    int as = 5;
		    g.drawLine(lx2, ly2,
			       (int) ( dy*as-dx*as+lx2),
			       (int) (-dx*as-dy*as+ly2));
		    g.drawLine(lx2, ly2,
			       (int) (-dy*as-dx*as+lx2),
			       (int) ( dx*as-dy*as+ly2));
		}
	    }
	}
    }

    // render equipotentials
    void renderEquips(Graphics g) {
	int x, y;
	g.setColor(Color.lightGray);
	for (x = 0; x != windowWidth; x++)
	    for (y = 0; y != windowHeight; y++) {
		// try all possible edge combinations
		tryEdge(g, x, y,  x+1, y,  x, y+1,  x+1, y+1);
		tryEdge(g, x, y,  x+1, y,  x, y,    x, y+1);
		tryEdge(g, x, y,  x+1, y,  x+1, y,  x+1, y+1);
		tryEdge(g, x, y,  x, y+1,  x+1, y,  x+1, y+1);
		tryEdge(g, x, y,  x, y+1,  x, y+1,  x+1, y+1);
		tryEdge(g, x+1, y, x+1, y+1, x, y+1, x+1, y+1);
	    }
    }

    // interpolate between two points
    void interpPoint(GridElement ep1, GridElement ep2,
		     int x1, int y1, int x2, int y2, double pval, Point pos) {
	double interp2 = (pval-ep1.pot)/(ep2.pot-ep1.pot);
	double interp1 = 1-interp2;
	pos.x = (int) ((x1+.5)*winSize.width*interp1/windowWidth +
		       (x2+.5)*winSize.width*interp2/windowWidth);
	pos.y = (int) ((y1+.5)*winSize.height*interp1/windowHeight +
		       (y2+.5)*winSize.height*interp2/windowHeight);
    }

    // check to see if pval is between the potential at ep1 and ep2
    boolean spanning(GridElement ep1, GridElement ep2, double pval) {
	if (ep1.pot == ep2.pot)
	    return false;
	return !((ep1.pot < pval && ep2.pot < pval) ||
		 (ep1.pot > pval && ep2.pot > pval));
    }

    // try to draw any equipotentials between edge (x1,y1)-(x2,y2)
    // and edge (x3,y3)-(x4,y4).
    void tryEdge(Graphics g, int x1, int y1, int x2, int y2,
		 int x3, int y3, int x4, int y4) {
	int i;
	double emult = equipBar.getValue() * .1;
	double mult = 1/(brightnessBar.getValue() * emult * .1);
	GridElement ep1 = grid[x1+windowOffsetX][y1+windowOffsetY];
	GridElement ep2 = grid[x2+windowOffsetX][y2+windowOffsetY];
	GridElement ep3 = grid[x3+windowOffsetX][y3+windowOffsetY];
	GridElement ep4 = grid[x4+windowOffsetX][y4+windowOffsetY];
	double pmin = min(min(ep1.pot, ep2.pot), min(ep3.pot, ep4.pot));
	double pmax = max(max(ep1.pot, ep2.pot), max(ep3.pot, ep4.pot));
	int imin = (int) (pmin/mult);
	int imax = (int) (pmax/mult);
	//double bmult = brightnessBar.getValue() / 5.0;
	for (i = imin; i <= imax; i++) {
	    double pval = i*mult;
	    if (!(spanning(ep1, ep2, pval) && spanning(ep3, ep4, pval)))
		continue;
	    Point pa = new Point();
	    Point pb = new Point();
	    interpPoint(ep1, ep2, x1, y1, x2, y2, pval, pa);
	    interpPoint(ep3, ep4, x3, y3, x4, y4, pval, pb);
	    /*double dy = pval*.2*bmult;
	    if (dy < 0) {
		dy = max(-1, dy);
		g.setColor(new Color((int) (-dy*(255-64))+64, 64, 64));
	    } else {
		dy = min(1, dy);
		g.setColor(new Color(64, (int) (dy*(255-64))+64, 64));
		}*/
	    g.drawLine(pa.x, pa.y, pb.x, pb.y);
	}
    }

    void dragCharge(int x, int y) {
	Charge s = charges[selectedCharge];
	if (!(x >= 0 && y >= 0 && x < windowWidth && y < windowHeight))
	    return;
	x += windowOffsetX;
	y += windowOffsetY;
	if (x == s.x && y == s.y)
	    return;
	if (!legalChargePos(x, y, selectedCharge))
	    return;
	int ox = s.x;
	int oy = s.y;
	grid[ox][oy].charge = 0;
	s.x = x; s.y = y;
	GridElement ge = grid[s.x][s.y];
	ge.charge = s.v;
	changedCharges = true;
	cv.repaint(pause);
    }

    boolean emptySquare(int x, int y) {
	if (grid[x][y].conductor)
	    return false;
	if (grid[x][y].charge != 0)
	    return false;
	return true;
    }

    // get the charge on the selected object
    double getSelObjCharge() {
	int x,y;
	double c = 0;
	for (x = 0; x != gridSizeX; x++)
	    for (y = 0; y != gridSizeY; y++) {
		if (objDragMap[x][y])
		    c += getCharge(x+dragObjX, y+dragObjY);
	    }
	return c;
    }

    int min(int a, int b) { return (a < b) ? a : b; }
    int max(int a, int b) { return (a > b) ? a : b; }
    double min(double a, double b) { return (a < b) ? a : b; }
    double max(double a, double b) { return (a > b) ? a : b; }

    void edit(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	if (selectedCharge != -1) {
	    x = x*windowWidth/winSize.width;
	    y = y*windowHeight/winSize.height;
	    dragCharge(x, y);
	    return;
	}
	switch (modeChooser.getSelectedIndex()) {
	case MODE_FQPLUS:
	case MODE_FQMINUS:
	case MODE_MOVE:
	case MODE_FLOAT:
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
	    cv.repaint(pause);
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
    }

    void clearFloaters() {
	int i, j;
	for (i = 0; i != gridSizeX; i++)
	    for (j = 0; j != gridSizeY; j++)
		grid[i][j].floater = 0;
	changedConductors = true;
    }

    void editFuncPoint(int x, int y) {
	int xp = x*windowWidth/winSize.width+windowOffsetX;
	int yp = y*windowHeight/winSize.height+windowOffsetY;
	GridElement ge = grid[xp][yp];
	if (!dragSet && !dragClear) {
	    dragClear = (ge.conductor || ge.charge != 0 || ge.dielec != 1);
	    dragSet = !dragClear;
	}
	if (ge.conductor && ge.floater > 0)
	    clearFloaters();
	ge.conductor = false;
	ge.jx = ge.jy = ge.charge = 0;
	ge.dielec = 1;
	stopCalc = true;
	switch (modeChooser.getSelectedIndex()) {
	case MODE_CLEAR:
	    dragClear = true;
	    dragSet = false;
	    break;
	case MODE_CONDUCTOR:
	    if (dragSet)
		addConductor(xp, yp, 0);
	    break;
	case MODE_CPLUS:
	    if (dragSet)
		addConductor(xp, yp, 1);
	    break;
	case MODE_CMINUS:
	    if (dragSet)
		addConductor(xp, yp, -1);
	    break;
	case MODE_DIELEC:
	    if (dragSet)
		ge.dielec = 2;
	    break;
	case MODE_QPLUS:
	    if (dragSet)
		ge.charge = chargeAmt;
	    break;
	case MODE_QMINUS:
	    if (dragSet)
		ge.charge = -chargeAmt;
	    break;
	}
	changedCharges = changedConductors = true;
	cv.repaint(pause);
    }

    void addCharge(int x, int y, double amt) {
	if (chargeCount == chargeMax)
	    return;
	if (!legalChargePos(x, y, -1))
	    return;
	charges[chargeCount++] = new Charge(x, y, amt);
	grid[x][y].charge = amt;
	changedCharges = true;
	cv.repaint(pause);
    }

    void deleteCharge(int num) {
	Charge c = charges[num];
	grid[c.x][c.y].charge = 0;
	for (; num < chargeCount; num++)
	    charges[num] = charges[num+1];
	chargeCount--;
	changedCharges = true;
	selectedCharge = -1;
	cv.repaint(pause);
    }

    boolean legalChargePos(int x, int y, int orig) {
	Charge s = (orig == -1) ? null : charges[orig];
	int i, j;
	for (i = -1; i <= 1; i++)
	    for (j = -1; j <= 1; j++) {
		// skip our own charge square
		if (s != null && s.x == x+i && s.y == y+j)
		    continue;
		// touching a conductor or bound charge?
		if (!emptySquare(x+i, y+j))
		    return false;
	    }
	// check for touching other charges
	for (i = 0; i != chargeCount; i++) {
	    if (i == orig)
		continue;
	    Charge s2 = charges[i];
	    if (abs(s2.x-x) <= 2 && abs(s2.y-y) <= 2)
		return false;
	}
	return true;
    }

    void selectCharge(MouseEvent me) {
	int x = me.getX();
	int y = me.getY();
	int i;
	int sc = selectedCharge;
	selectedCharge = -1;
	for (i = 0; i != chargeCount; i++) {
	    Charge src = charges[i];
	    int sx = src.getScreenX();
	    int sy = src.getScreenY();
	    int r2 = (sx-x)*(sx-x)+(sy-y)*(sy-y);
	    if (chargeRadius*chargeRadius > r2) {
		selectedCharge = i;
		break;
	    }
	}
	if (sc != selectedCharge)
	    cv.repaint(pause);
    }

    boolean matchElement(GridElement ge1, GridElement ge2) {
	if (ge1.conductor && ge2.conductor && (ge1.pot == ge2.pot ||
					       currentCheck.getState()) &&
	    ge1.floater == ge2.floater && ge1.conductivity == ge2.conductivity)
	    return true;
	if (ge1.charge != 0 && ge1.charge == ge2.charge)
	    return true;
	if (ge1.dielec != 1 && ge1.dielec == ge2.dielec)
	    return true;
	return false;
    }

    void selectObject(int xo, int yo) {
	dragObjX = dragObjY = 0;
	int xp = xo*windowWidth/winSize.width+windowOffsetX;
	int yp = yo*windowHeight/winSize.height+windowOffsetY;
	boolean oldSel1 = objDragMap != null;
	boolean oldSel2 = oldSel1 && objDragMap[xp][yp];
	GridElement ge1 = grid[xp][yp];
	if (!(ge1.conductor || ge1.dielec != 1 || ge1.charge != 0)) {
	    objDragMap = null;
	    if (oldSel1)
		cv.repaint(pause);
	    return;
	}
	if (objDragMap != null && objDragMap[xp][yp])
	    return;
	objDragMap = new boolean[gridSizeX][gridSizeY];
	Vector stack = new Vector();
	stack.addElement(new Point(xp, yp));

	// depth-first search to find object at mouse position
	while (stack.size() > 0) {
	    Point x = (Point) stack.elementAt(stack.size()-1);
	    stack.removeElementAt(stack.size()-1);
	    if (objDragMap[x.x][x.y])
		continue;
	    GridElement ge = grid[x.x][x.y];
	    if (!matchElement(ge, ge1))
		continue;
	    if (x.x == windowOffsetX || x.x == windowOffsetX+windowWidth-1 ||
		x.y == windowOffsetY || x.y == windowOffsetY+windowHeight-1) {
		objDragMap = null;
		if (oldSel1)
		    cv.repaint(pause);
		return;
	    }
	    objDragMap[x.x][x.y] = true;
	    stack.addElement(new Point(x.x-1, x.y));
	    stack.addElement(new Point(x.x, x.y-1));
	    stack.addElement(new Point(x.x+1, x.y));
	    stack.addElement(new Point(x.x, x.y+1));
	}
	dragBoundX1 = 1000;
	dragBoundY1 = 1000;
	dragBoundX2 = 0;
	dragBoundY2 = 0;
	int xi, yi;
	for (xi = 0; xi != gridSizeX; xi++)
	    for (yi = 0; yi != gridSizeY; yi++) {
		if (!objDragMap[xi][yi])
		    continue;
		if (xi < dragBoundX1)
		    dragBoundX1 = xi;
		if (yi < dragBoundY1)
		    dragBoundY1 = yi;
		if (xi > dragBoundX2)
		    dragBoundX2 = xi;
		if (yi > dragBoundY2)
		    dragBoundY2 = yi;
	    }
	if (!oldSel2)
	    cv.repaint(pause);
    }

    int dragObjX, dragObjY;
    int dragBoundX1, dragBoundX2, dragBoundY1, dragBoundY2;

    void dragObject(int xe, int ye) {
	int xp2 = xe*windowWidth/winSize.width+windowOffsetX;
	int yp2 = ye*windowHeight/winSize.height+windowOffsetY;
	int xp1 = dragX*windowWidth/winSize.width+windowOffsetX;
	int yp1 = dragY*windowHeight/winSize.height+windowOffsetY;
	int dx = xp2-xp1;
	int dy = yp2-yp1;
	if (dx == dragObjX && dy == dragObjY)
	    return;
	int xi, yi;
	if (!tryDrag(dx, dy)) {
	    // if we can't drag to the mouse position then see how close
	    // we can get.
	    for (;;) {
		if (dx != dragObjX) {
		    dx = (dx > dragObjX) ? dx-1 : dx+1;
		    if (tryDrag(dx, dy))
			break;
		}
		if (dy != dragObjY) {
		    dy = (dy > dragObjY) ? dy-1 : dy+1;
		    if (tryDrag(dx, dy))
			break;
		}
		if (dx == dragObjX && dy == dragObjY)
		    return;
	    }
	}
	GridElement template = null;
	for (xi = dragBoundX1; xi <= dragBoundX2; xi++)
	    for (yi = dragBoundY1; yi <= dragBoundY2; yi++) {
		int xi1 = xi+dragObjX;
		int yi1 = yi+dragObjY;
		if (objDragMap[xi][yi]) {
		    // clear old position
		    GridElement ge = grid[xi1][yi1];
		    template = ge.copy();
		    ge.clear();
		}
	    }
	for (xi = dragBoundX1; xi <= dragBoundX2; xi++)
	    for (yi = dragBoundY1; yi <= dragBoundY2; yi++) {
		int xi2 = xi+dx;
		int yi2 = yi+dy;
		if (objDragMap[xi][yi]) {
		    // set new position
		    GridElement ge = grid[xi2][yi2];
		    ge.set(template);
		}
	    }
	dragObjX = dx;
	dragObjY = dy;
	changedConductors = true;
	cv.repaint(pause);
    }

    boolean tryDrag(int dx, int dy) {
	int xi, yi;
	if (dragBoundX1+dx <= windowOffsetX || dragBoundY1+dy <= windowOffsetY ||
	    dragBoundX2+dx >= windowOffsetX+windowWidth-1 ||
	    dragBoundY2+dy >= windowOffsetY+windowHeight-1)
	    return false;
	for (xi = dragBoundX1; xi <= dragBoundX2; xi++)
	    for (yi = dragBoundY1; yi <= dragBoundY2; yi++) {
		int xi1 = xi+dx-dragObjX;
		int yi1 = yi+dy-dragObjY;
		int xi2 = xi+dx;
		int yi2 = yi+dy;
		try {
		    // don't let us move object on top of something,
		    // unless it's just the present location of the object.
		    if (!objDragMap[xi1][yi1] &&
			objDragMap[xi][yi] &&
			(grid[xi2][yi2].conductor ||
			 grid[xi2][yi2].dielec != 1 ||
			 grid[xi2][yi2].charge != 0))
			return false;
		    if (objDragMap[xi][yi]) {
			// don't let us move objects on top of free charges
			int i;
			for (i = 0; i != chargeCount; i++) {
			    Charge s = charges[i];
			    if (abs(s.x-xi2) <= 1 && abs(s.y-yi2) <= 1)
				return false;
			}
		    }
		} catch (Exception e) {
		    return false;
		}
	    }
	return true;
    }

    void deleteObject(int xp, int yp) {
	Vector stack = new Vector();
	stack.addElement(new Point(xp, yp));
	GridElement ge1 = grid[xp][yp].copy();
	while (stack.size() > 0) {
	    Point x = (Point) stack.elementAt(stack.size()-1);
	    stack.removeElementAt(stack.size()-1);
	    if (x.x < 0 || x.x >= gridSizeX ||
		x.y < 0 || x.y >= gridSizeY)
		continue;
	    GridElement ge = grid[x.x][x.y];
	    if (!matchElement(ge, ge1))
		continue;
	    ge.clear();
	    stack.addElement(new Point(x.x-1, x.y));
	    stack.addElement(new Point(x.x, x.y-1));
	    stack.addElement(new Point(x.x+1, x.y));
	    stack.addElement(new Point(x.x, x.y+1));
	}
	changedConductors = true;
	cv.repaint(pause);
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
	cv.repaint(100);
    }
    @Override
		public void actionPerformed(ActionEvent e) {
	if (e.getSource() == blankButton) {
	    doBlank();
	    cv.repaint(pause);
	}
    }

    @Override
		public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	cv.repaint(pause);
	if (e.getSource() == resBar) {
	    setResolution();
	    reinit();
	}
	if (e.getSource() == adjustBar)
	    doAdjust();
    }

    void setResolution() {
	windowWidth = windowHeight = resBar.getValue()+1;
	windowOffsetX = windowOffsetY = 20;
	gridSizeX = windowWidth + windowOffsetX*2;
	gridSizeY = windowHeight + windowOffsetY*2;
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
	float val = vali/100.f;
	int x, y;
	boolean create = true;
	for (y = adjustSelectY1; y <= adjustSelectY2; y++)
	    for (x = adjustSelectX1; x <= adjustSelectX2; x++) {
		GridElement oe = grid[x+windowOffsetX][y+windowOffsetY];
		if (oe.conductor || oe.dielec != 1)
		    create = false;
	    }
	boolean adjustFloat = false;
	double pot = 0;
	for (y = adjustSelectY1; y <= adjustSelectY2; y++)
	    for (x = adjustSelectX1; x <= adjustSelectX2; x++) {
		GridElement oe = grid[x+windowOffsetX][y+windowOffsetY];
		switch (modeChooser.getSelectedIndex()) {
		case MODE_ADJ_CONDUCT:
		    if (oe.conductor)
			oe.conductivity = val;
		    changedConductors = true;
		    break;
		case MODE_ADJ_DIELEC:
		    if (oe.dielec != 1 || create)
			oe.dielec = (vali-1)/10.+1.1;
		    changedConductors = true;
		    break;
		case MODE_ADJ_CHARGE:
		    if (vali <= 1)
			val = 0;
		    if (vali == 50)
			val = .51f;
		    if (oe.charge != 0)
			oe.charge = val*2-1;
		    changedConductors = true;
		    break;
		case MODE_ADJ_POT:
		    if (vali <= 1)
			val = 0;
		    pot = val*2-1;
		    if (create)
			addConductor(x+windowOffsetX, y+windowOffsetY);
		    if (oe.conductor) {
			if (oe.floater > 0)
			    adjustFloat = true;
			else {
			    oe.pot = pot;
			    changedConductors = true;
			}
		    }
		    break;
		}
	    }
	if (adjustFloat) {
	    // they're trying to change potential of floater, so change
	    // floatCharge appropriately.
	    floatCharge = floatExtCharge + floatCap*pot;
	    //System.out.print("float pot = " + pot + "\n");
	    changedCharges = true;
	}
	cv.repaint(pause);
	if (modeChooser.getSelectedIndex() == MODE_ADJ_CHARGE) {
	    // one of the free charges may have been modified
	    int i;
	    for (i = 0; i != chargeCount; i++) {
		Charge src = charges[i];
		src.v = grid[src.x][src.y].charge;
	    }
	}
    }

    @Override
		public void mouseDragged(MouseEvent e) {
	dragging = true;
	if (objDragMap != null && modeChooser.getSelectedIndex() == MODE_MOVE)
	    dragObject(e.getX(), e.getY());
	else
	    edit(e);
    }
    @Override
		public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	processMouseMotion(e);
    }
    
    void processMouseMotion(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int panelHeight = getPanelHeight();
	selectCharge(e);
	int md = modeChooser.getSelectedIndex();
	if ((md == MODE_MOVE || md == MODE_DELETE || md == MODE_FLOAT) &&
	      selectedCharge == -1)
	    selectObject(x, y);
    }
    @Override
		public void mouseClicked(MouseEvent e) {
    }
    @Override
		public void mouseEntered(MouseEvent e) {
    }
    @Override
		public void mouseExited(MouseEvent e) {
    }
    @Override
		public void mousePressed(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	processMouseMotion(e);
	adjustSelectX1 = -1;
	adjustBar.disable();
	int xp = e.getX()*windowWidth/winSize.width+windowOffsetX;
	int yp = e.getY()*windowHeight/winSize.height+windowOffsetY;
	switch (modeChooser.getSelectedIndex()) {
	case MODE_FQPLUS:
	    if (selectedCharge == -1)
		addCharge(xp, yp, chargeAmt);
	    break;
	case MODE_FQMINUS:
	    if (selectedCharge == -1)
		addCharge(xp, yp, -chargeAmt);
	    break;
	case MODE_MOVE:
	    dragging = true;
	    break;
	case MODE_FLOAT:
	    if (objDragMap != null) {
		clearFloaters();
		int i, j;
		double ch = 0;
		for (i = 0; i != gridSizeX; i++)
		    for (j = 0; j != gridSizeY; j++)
			if (objDragMap[i][j]) {
			    grid[i][j].floater = 1;
			    ch += getCharge(i, j);
			}
		floatCharge = ch;
		changedConductors = true;
		cv.repaint(pause);
	    }
	    break;
	case MODE_DELETE:
	    if (selectedCharge != -1)
		deleteCharge(selectedCharge);
	    else
		deleteObject(xp, yp);
	    break;
	default:
	    dragging = true;
	    edit(e);
	    break;
	}
    }
    @Override
		public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = dragSet = dragClear = stopCalc = false;
	if (objDragMap != null) {
	    objDragMap = null;
	    selectObject(e.getX(), e.getY());
	}
	cv.repaint();
    }
    @Override
		public void itemStateChanged(ItemEvent e) {
	cv.repaint(pause);
	// needed for mobile
	deselectAll();
	if (e.getItemSelectable() == setupChooser)
	    doSetup();
	if (e.getItemSelectable() == modeChooser)
	    setModeChooser();
	if (e.getItemSelectable() == accuracyChooser ||
	    e.getItemSelectable() == currentCheck)
	    changedConductors = true;
    }

    void deselectAll() {
	objDragMap = null;
	selectedCharge = -1;
	cv.repaint(pause);
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
	case MODE_ADJ_DIELEC:  adjustLabel.setText("Dielectric Constant"); break;
	case MODE_ADJ_POT:     adjustLabel.setText("Potential"); break;
	case MODE_ADJ_CHARGE:  adjustLabel.setText("Charge"); break;
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
	doBlank();
	currentCheck.setState(false);
	brightnessBar.setValue(90);
	modeChooser.select(MODE_MOVE);
	setModeChooser();
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	setup.select();
    }

    class Charge {
	int x;
	int y;
	double v;
	Charge(int xx, int yy, double vv) { x = xx; y = yy; v = vv; }
	int getScreenX() {
	    return ((x-windowOffsetX) * winSize.width+winSize.width/2)
		/windowWidth;
	}
	int getScreenY() {
	    return ((y-windowOffsetY) * winSize.height+winSize.height/2)
		/windowHeight;
	}
    }

    class GridElement {
	// potential
	double pot;
	// current
	double jx, jy;
	// vector potential
	double ax, ay;
	// dielectric constant (1 = space)
	double dielec;
	// conductivity (1 = highest)
	double conductivity;
	// bound charge
	double charge;

	// potential at this square if floater is at unit potential
	// and all other charges and charged conductors are zeroed out
	double floatPot;

	// color (used for drawing field lines)
	int col;

	// true if this is a conductor
	boolean conductor;
	// true if this is a conducting or dielectric boundary
	boolean boundary;
	// true if this is carrying current
	boolean currentPath;
	// 1 if this is a floater, otherwise 0 (may allow multiple floaters
	// later on)
	byte floater;

	void clear() {
	    pot = charge = 0;
	    dielec = conductivity = 1;
	    conductor = false;
	    floater = 0;
	}
	GridElement copy() {
	    GridElement ge = new GridElement();
	    ge.pot = pot;
	    ge.dielec = dielec;
	    ge.conductivity = conductivity;
	    ge.conductor = conductor;
	    ge.charge = charge;
	    ge.floater = floater;
	    return ge;
	}
	void set(GridElement ge) {
	    pot = ge.pot;
	    dielec = ge.dielec;
	    conductivity = ge.conductivity;
	    conductor = ge.conductor;
	    charge = ge.charge;
	    floater = ge.floater;
	}
    }

    // element in one of the solver grids
    class SolverElement {
	double charge, dielec, pot;
	boolean conductor, boundary;

	// true if we should skip this square (used for non-conducting
	// squares when calculating current)
	boolean ignore;
    }

    class SolverGrid {
	SolverElement grid[][];
    }

    abstract class Setup {
	abstract String getName();
	void select() {}
	void deselect() {}
	void valueChanged(Scrollbar s) {}
	void doStep() {}
	abstract Setup createNext();
	Setup() { }
    }

    class SingleChargeSetup extends Setup {
	@Override
	String getName() { return "Single Charge"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    addCharge(x, y, chargeAmt);
	}
	@Override
	Setup createNext() { return new DoubleChargeSetup(); }
    }
    class DoubleChargeSetup extends Setup {
	@Override
	String getName() { return "Double Charge"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    addCharge(x, y-6, chargeAmt);
	    addCharge(x, y+6, chargeAmt);
	}
	@Override
	Setup createNext() { return new DipoleChargeSetup(); }
    }
    class DipoleChargeSetup extends Setup {
	@Override
	String getName() { return "Dipole Charge"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    addCharge(x, y-5, chargeAmt);
	    addCharge(x, y+5, -chargeAmt);
	}
	@Override
	Setup createNext() { return new ChargePlaneSetup(); }
    }
    class ChargePlaneSetup extends Setup {
	@Override
	String getName() { return "Charge + Plane"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    addCharge(x, y-5, chargeAmt);
	    conductFillRect(windowOffsetX+1, y,
			    windowOffsetX+windowWidth-2, y+2, 0, 1);
	}
	@Override
	Setup createNext() { return new DipoleUniformSetup(); }
    }
    class DipoleUniformSetup extends Setup {
	@Override
	String getName() { return "Dipole + Uniform"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    addCharge(x, y-4, chargeAmt);
	    addCharge(x, y+4, -chargeAmt);
	    addUniformField();
	}
	@Override
	Setup createNext() { return new QuadChargeSetup(); }
    }
    class QuadChargeSetup extends Setup {
	@Override
	String getName() { return "Quadrupole Charge"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    addCharge(x+4, y-4,  chargeAmt);
	    addCharge(x+4, y+4, -chargeAmt);
	    addCharge(x-4, y-4, -chargeAmt);
	    addCharge(x-4, y+4,  chargeAmt);
	}
	@Override
	Setup createNext() { return new ConductingPlanesSetup(); }
    }
    class ConductingPlanesSetup extends Setup {
	@Override
	String getName() { return "Conducting Planes"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    int sep = 4;
	    int w = windowWidth*2/6;
	    conductFillRect(x-w, y-sep-2, x+w, y-sep,    1, 1);
	    conductFillRect(x-w, y+sep,   x+w, y+sep+2, -1, 1);
	    brightnessBar.setValue(35);
	}
	@Override
	Setup createNext() { return new ChargedPlanesSetup(); }
    }
    class ChargedPlanesSetup extends Setup {
	@Override
	String getName() { return "Charged Planes"; }
	@Override
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    int sep = 4;
	    int w = windowWidth*2/6;
	    int n, i;
	    double c = 1./(w*3);
	    for (i = 0; i != 3; i++)
		for (n = -w; n <= w; n++) {
		    grid[x+n][y-sep-i].charge = c;
		    grid[x+n][y+sep+i].charge = -c;
		}
	    brightnessBar.setValue(35);
	}
	@Override
	Setup createNext() { return new ConductingCylinderSetup(); }
    }

    void doCylinder(double p, int floater) {
	int x = gridSizeX/2;
	int y = gridSizeY/2;
	int r = 8;
	int n;
	for (n = -r+1; n < r; n++) {
	    int a = (int) java.lang.Math.sqrt(r*r-n*n-.01);
	    int a2;
	    for (a2 = -a; a2 != a; a2++) {
		addConductor(x+n, y+a2, p);
		grid[x+n][y+a2].floater = (byte) floater;
	    }
	}
    }

    void doCylinderHollow(double p, int floater) {
	int x = gridSizeX/2;
	int y = gridSizeY/2;
	int r = 12;
	int n;
	for (n = -r+1; n < r; n++) {
	    int a = (int) java.lang.Math.sqrt(r*r-n*n-.01);
	    int a2;
	    for (a2 = -a; a2 != a; a2++) {
		if (Math.sqrt(n*n+a2*a2) < 9)
		    continue;
		addConductor(x+n, y+a2, p);
		grid[x+n][y+a2].floater = (byte) floater;
	    }
	}
    }
    
    void doCylinderCharge(double p, int r, int xo) {
	int x = gridSizeX/2;
	int y = gridSizeY/2;
	int n;
	for (n = -r+1; n < r; n++) {
	    int a = (int) java.lang.Math.sqrt(r*r-n*n-.01);
	    int a2;
	    for (a2 = -a; a2 != a; a2++)
		grid[x+n+xo][y+a2].charge += p;
	}
    }

    class ConductingCylinderSetup extends Setup {
	@Override
	String getName() { return "Conducting Cylinder"; }
	@Override
	void select() {
	    doCylinder(1, 0);
	}
	@Override
	Setup createNext() { return new GroundedCylinderSetup(); }
    }
    class GroundedCylinderSetup extends Setup {
	@Override
	String getName() { return "Grounded Cyl + Charge"; }
	@Override
	void select() {
	    doCylinder(0, 0);
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    int r = 7;
	    addCharge(x, y+r*2, chargeAmt);
	}
	@Override
	Setup createNext() { return new GroundedCylinderUniformSetup(); }
    }
    class GroundedCylinderUniformSetup extends Setup {
	@Override
	String getName() { return "Grounded Cyl + Field"; }
	@Override
	void select() {
	    doCylinder(0, 0);
	    addUniformField();
	}
	@Override
	Setup createNext() { return new ChargedCylinderSetup(); }
    }
    class ChargedCylinderSetup extends Setup {
	@Override
	String getName() { return "Charged Cylinder"; }
	void select() {
	    doCylinderCharge(.005, 10, 0);
	    brightnessBar.setValue(50);
	}
	Setup createNext() { return new ChargedHollowCylinder1Setup(); }
    }
    class ChargedHollowCylinder1Setup extends Setup {
	String getName() { return "Charged Hollow Cyl 1"; }
	void select() {
	    doCylinderCharge(.005, 10, 0);
	    doCylinderCharge(-.005, 5, 0);
	}
	Setup createNext() { return new ChargedHollowCylinder2Setup(); }
    }
    class ChargedHollowCylinder2Setup extends Setup {
	String getName() { return "Charged Hollow Cyl 2"; }
	void select() {
	    doCylinderCharge(.005, 10, 0);
	    doCylinderCharge(-.005, 5, 2);
	}
	Setup createNext() { return new FloatingCylinderSetup(); }
    }
    class FloatingCylinderSetup extends Setup {
	String getName() { return "Floating Cyl + Charge"; }
	void select() {
	    doCylinder(1, 1);
	    addCharge(gridSizeX/2+7, gridSizeY/2+7, chargeAmt);
	}
	Setup createNext() { return new FloatingCylinder2Setup(); }
    }
    class FloatingCylinder2Setup extends Setup {
	String getName() { return "Floating Cyl + Plates"; }
	void select() {
	    doCylinder(1, 1);
	    conductFillRect(gridSizeX/2-windowWidth/3, windowOffsetY,
			    gridSizeX/2+windowWidth/3, windowOffsetY+2, 1, 1);
	    conductFillRect(gridSizeX/2-windowWidth/3,
			    windowOffsetY+windowHeight-3,
			    gridSizeX/2+windowWidth/3,
			    windowOffsetY+windowHeight-1, -1, 1);
	}
	Setup createNext() { return new ConductingBoxSetup(); }
    }
    class ConductingBoxSetup extends Setup {
	String getName() { return "Conducting Box"; }
	void select() {
	    int i;
	    int d = windowWidth/5;
	    for (i = d-2; i <= d; i++)
		conductDrawRect(gridSizeX/2-i, gridSizeY/2-i,
				gridSizeX/2+i, gridSizeY/2+i, 1, 1);
	}
	Setup createNext() { return new HollowFloatingCylinderSetup(); }
    }
    class HollowFloatingCylinderSetup extends Setup {
	String getName() { return "Floating Hollow Cyl"; }
	void select() {
	    doCylinderHollow(0, 1);
	    addCharge(gridSizeX/2+6, gridSizeY/2, chargeAmt);
	}
	Setup createNext() { return new HollowFloatingCylinder2Setup(); }
    }
    class HollowFloatingCylinder2Setup extends Setup {
	String getName() { return "Floating Hollow Cyl 2"; }
	void select() {
	    doCylinderHollow(0, 1);
	    addCharge(gridSizeX/2-3, gridSizeY/2, +chargeAmt);
	    addCharge(gridSizeX/2+3, gridSizeY/2, -chargeAmt);
	}
	Setup createNext() { return new SharpPointSetup(); }
    }
    class SharpPointSetup extends Setup {
	String getName() { return "Sharp Point"; }
	void select() {
	    conductFillRect(gridSizeX/2-1, gridSizeY/2-1,
			    gridSizeX/2+1, gridSizeY-1, 1, 1);
	}
	Setup createNext() { return new CornerSetup(); }
    }
    class CornerSetup extends Setup {
	String getName() { return "Corner"; }
	void select() {
	    conductFillRect(gridSizeX/2-1, gridSizeY/2-1,
			    gridSizeX/2+1, gridSizeY-1, 1, 1);
	    conductFillRect(gridSizeX/2-1, gridSizeY/2-1,
			    gridSizeX-1, gridSizeY/2+1, 1, 1);
	}
	Setup createNext() { return new Angle45Setup(); }
    }
    class Angle45Setup extends Setup {
	String getName() { return "45 Degrees"; }
	void select() {
	    int i;
	    int d = 4;
	    for (i = -1; i != windowWidth/2+d*2; i++)
		conductFillRect(gridSizeX/2+i-d-2, gridSizeY/2+d-i,
				gridSizeX/2+i-d+1, gridSizeY/2+d-i, 1, 1);
	    conductFillRect(gridSizeX/2-d, gridSizeY/2-1+d,
			    gridSizeX-1, gridSizeY/2+1+d, 1, 1);
	}
	Setup createNext() { return new Angle135Setup(); }
    }
    class Angle135Setup extends Setup {
	String getName() { return "135 Degrees"; }
	void select() {
	    int i;
	    int d = 0;
	    for (i = -1; i != windowWidth/2+2; i++)
		conductFillRect(gridSizeX/2+i-d-2, gridSizeY/2+d-i,
				gridSizeX/2+i-d+1, gridSizeY/2+d-i, 1, 1);
	    conductFillRect(0, gridSizeY/2-1+d,
			    gridSizeX/2-d, gridSizeY/2+1+d, 1, 1);
	}
	Setup createNext() { return new DielectricCylinderSetup(); }
    }
    
    void doDielecCylinder() {
	int x = gridSizeX/2;
	int y = gridSizeY/2;
	int r = 8;
	int n;
	for (n = -r+1; n < r; n++) {
	    int a = (int) java.lang.Math.sqrt(r*r-n*n-.01);
	    int a2;
	    for (a2 = -a; a2 != a; a2++)
		grid[x+n][y+a2].dielec = 5;
	}
    }

    class DielectricCylinderSetup extends Setup {
	String getName() { return "Dielectric Cylinder"; }
	void select() {
	    doDielecCylinder();
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    int r = 8;
	    addCharge(x+r*3/2, y+r*3/2, chargeAmt);
	}
	Setup createNext() { return new DielectricCylinderFieldSetup(); }
    }
    class DielectricCylinderFieldSetup extends Setup {
	String getName() { return "Dielectric Cyl + Field"; }
	void select() {
	    doDielecCylinder();
	    addUniformField();
	}
	Setup createNext() { return new Dielectric1Setup(); }
    }
    class Dielectric1Setup extends Setup {
	String getName() { return "Dielectric 1"; }
	void select() {
	    doDielec(6);
	    addCharge(gridSizeX/2, gridSizeY/2-5, chargeAmt);
	    brightnessBar.setValue(250);
	}
	Setup createNext() { return new Dielectric2Setup(); }
    }
    class Dielectric2Setup extends Setup {
	String getName() { return "Dielectric 2"; }
	void select() {
	    doDielec(6);
	    addCharge(gridSizeX/2, gridSizeY/2+5, chargeAmt);
	    brightnessBar.setValue(250);
	}
	Setup createNext() { return new DielectricDipoleSetup(); }
    }
    class DielectricDipoleSetup extends Setup {
	String getName() { return "Dielectric + Dipole"; }
	void select() {
	    doDielec(3);
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    addCharge(x+8, y-4, chargeAmt);
	    addCharge(x-8, y+4, -chargeAmt);
	}
	Setup createNext() { return new DielecCapSetup(); }
    }
    class DielecCapSetup extends Setup {
	String getName() { return "Dielectric Capacitor"; }
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    int sep = 2;
	    int w = windowWidth/4;
	    conductFillRect(x-w, y-sep-2, x+w, y-sep,    1, 1);
	    conductFillRect(x-w, y+sep,   x+w, y+sep+2, -1, 1);
	    int i, j;
	    for (i = -w+2; i <= w-2; i++)
		for (j = -sep+1; j < sep; j++)
		    grid[x+i][y+j].dielec = 5;
	    brightnessBar.setValue(12);
	}
	Setup createNext() { return new ConductingPlanesGapSetup(); }
    }
    class ConductingPlanesGapSetup extends Setup {
	String getName() { return "Conducting Planes w/ Gap"; }
	void select() {
	    int y = gridSizeY/2;
	    int d = 4;
	    conductFillRect(0, y-1,             gridSizeX/2-d-1, y+1, 1, 1);
	    conductFillRect(gridSizeX/2+d, y-1, gridSizeX-1, y+1, -1, 1);
	}
	Setup createNext() { return new SlottedConductingPlaneSetup(); }
    }
    class SlottedConductingPlaneSetup extends Setup {
	String getName() { return "Slotted Conducting Plane"; }
	void select() {
	    int y = gridSizeY/2;
	    int d = 4;
	    conductFillRect(0, y-1,             gridSizeX/2-d-1, y+1, 0, 1);
	    conductFillRect(gridSizeX/2+d, y-1, gridSizeX-1, y+1, 0, 1);
	    conductFillRect(0, windowOffsetY, gridSizeX-1, windowOffsetY,
			    1, 1);
	    brightnessBar.setValue(960);
	}
	Setup createNext() { return new Shielding1Setup(); }
    }
    
    class Shielding1Setup extends Setup {
	String getName() { return "Shielding 1"; }
	void select() {
	    int i;
	    for (i = 6; i <= 8; i++)
		conductDrawRect(gridSizeX/2-i, gridSizeY/2-i,
				gridSizeX/2+i, gridSizeY/2+i, 0, 1);
	    addUniformField();
	}
	Setup createNext() { return new Shielding2Setup(); }
    }
    class Shielding2Setup extends Setup {
	String getName() { return "Shielding 2"; }
	void select() {
	    int i;
	    int s1 = windowWidth/4;
	    int s2 = s1+2;
	    for (i = s1; i <= s2; i++)
		conductDrawRect(gridSizeX/2-i, gridSizeY/2-i,
				gridSizeX/2+i, gridSizeY/2+i, 0, 1);
	    addCharge(gridSizeX/2, gridSizeY/2, chargeAmt);
	}
	Setup createNext() { return new BoxOneSideSetup(); }
    }
    class BoxOneSideSetup extends Setup {
	String getName() { return "Box w/ One Live Side"; }
	void select() {
	    int i;
	    int s1 = windowWidth/4;
	    int s2 = s1+2;
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    for (i = s1; i <= s2; i++) {
		conductDrawRect(x-i, y-i, x+i, y+i, 0, 1);
		grid[x-s1+1][y-i].conductor = false;
		grid[x+s1-1][y-i].conductor = false;
	    }
	    conductFillRect(x-s1+2, y-s2, x+s1-2, y-s1, 1, 1);
	}
	Setup createNext() { return new QuadrupoleLensSetup(); }
    }
    class QuadrupoleLensSetup extends Setup {
	String getName() { return "Quadrupole Lens"; }
	void select() {
	    int x;
	    int w = gridSizeX/2-1;
	    int h = windowWidth/4;
	    int cx = gridSizeX/2;
	    int cy = gridSizeY/2;
	    for (x = -w; x <= w; x++) {
		int yd = (int) java.lang.Math.sqrt(x*x+h*h);
		int y;
		for (y = yd; y <= w; y++) {
		    addConductor(cx+x, cy+y, -1);
		    addConductor(cx+x, cy-y, -1);
		    addConductor(cx+y, cy+x,  1);
		    addConductor(cx-y, cy+x,  1);
		}
	    }
	    brightnessBar.setValue(24);
	}
	Setup createNext() { return new ConductingWireSetup(); }
    }
    class ConductingWireSetup extends Setup {
	String getName() { return "Wire w/ Current"; }
	void select() {
	    int x = gridSizeX/2;
	    int d = 8;
	    conductFillRect(x-d/2, 0, x+d/2, gridSizeY-1, 0, 1);
	    currentCheck.setState(true);
	}
	Setup createNext() { return new ResistorSetup(); }
    }
    class ResistorSetup extends Setup {
	String getName() { return "Resistor"; }
	void select() {
	    int x = gridSizeX/2;
	    int d = 8;
	    conductFillRect(x-d/2, 0, x+d/2, gridSizeY/2-6, 0, 1);
	    conductFillRect(x-d/2, gridSizeY/2+6, x+d/2, gridSizeY-1, 0, 1);
	    conductFillRect(x-d/2+1, gridSizeY/2-5,
			    x+d/2-1, gridSizeY/2+5, 0, .1);
	    currentCheck.setState(true);
	}
	Setup createNext() { return new ResistorsParallelSetup(); }
    }
    class ResistorsParallelSetup extends Setup {
	String getName() { return "Resistors in Parallel"; }
	void select() {
	    int x = gridSizeX/2;
	    int d = 8;
	    int i, j;
	    int d2 = d/2;
	    conductFillRect(x-d2, 0,
			    x+d2, gridSizeY/2-d2-1, 0, 1);
	    conductFillRect(x-d2, gridSizeY/2+d2+1,
			    x+d2, gridSizeY-1, 0, 1);
	    conductFillRect(x-windowWidth/4, gridSizeY/2-d,
			    x+windowWidth/4, gridSizeY/2-d2-1, 0, 1);
	    conductFillRect(x-windowWidth/4, gridSizeY/2+d2+1,
			    x+windowWidth/4, gridSizeY/2+d, 0, 1);
	    conductFillRect(x-windowWidth/4,   gridSizeY/2-d2,
			    x-windowWidth/4+4, gridSizeY/2+d2, 0, .6);
	    conductFillRect(x+windowWidth/4-4, gridSizeY/2-d2,
			    x+windowWidth/4,   gridSizeY/2+d2, 0, .1);
	    conductFillRect(x-2, gridSizeY/2-d2,
			    x+2, gridSizeY/2+d2, 0, .04);
	    currentCheck.setState(true);
	}
	Setup createNext() { return new Current2D1Setup(); }
    }
    class Current2D1Setup extends Setup {
	String getName() { return "Current in 2D 1"; }
	void select() {
	    int x = gridSizeX/2;
	    int y = gridSizeY/2;
	    int d = windowWidth/3;
	    int i, j;
	    int d2 = 4;
	    conductFillRect(x-d, y-d, x+d, y+d, 0, 1);
	    conductFillRect(x-d, 0, x-d+d2, y, 0, 1);
	    conductFillRect(x+d-d2, 0, x+d, gridSizeY-1, 0, 1);
	    for (i = -3; i <= 3; i++)
		for (j = -3; j <= 3; j++)
		    grid[x+i][y+j].conductor = false;
	    currentCheck.setState(true);
	}
	Setup createNext() { return new Current2D2Setup(); }
    }
    class Current2D2Setup extends Setup {
	String getName() { return "Current in 2D 2"; }
	void select() {
	    int x = gridSizeX/2;
	    int d = 8;
	    int i, j;
	    for (i = 0; i != d; i++)
		for (j = 0; j != gridSizeY; j++)
		    addConductor(x+i-d/2, j);
	    for (i = -windowWidth/4; i < windowWidth/4; i++)
		for (j = gridSizeY/2-d; j <= gridSizeY/2+d; j++)
		    addConductor(x+i, j);
	    currentCheck.setState(true);
	}
	Setup createNext() { return null; }
    }

    void addConductor(int x, int y) {
	addConductor(x, y, 0, 1);
    }
    void addConductor(int x, int y, double p) {
	addConductor(x, y, p, 1);
    }
    void addConductor(int x, int y, double p, double cv) {
	GridElement ge = grid[x][y];
	ge.conductor = true;
	ge.pot = p;
	ge.conductivity = cv;
	ge.floater = 0;
	//ge.damp = .1;
    }
    void conductFillRect(int x, int y, int x2, int y2, double p, double cv) {
	int i, j;
	for (i = x; i <= x2; i++)
	    for (j = y; j <= y2; j++)
		addConductor(i, j, p, cv);
    }
    void conductDrawRect(int x, int y, int x2, int y2, double p, double cv) {
	int i, j;
	for (i = x; i <= x2; i++) {
	    addConductor(i, y, p, cv);
	    addConductor(i, y2, p, cv);
	}
	for (j = y; j <= y2; j++) {
	    addConductor(x,  j, p, cv);
	    addConductor(x2, j, p, cv);
	}
    }
}
