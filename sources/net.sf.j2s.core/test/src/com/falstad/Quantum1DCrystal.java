package com.falstad;
// Quantum1DCrystal.java (C) 2002 by Paul Falstad, www.falstad.com


//web_Ready
//web_AppletName= 1-D Quantum Crystal
//web_Description= Periodic potentials in one dimension
//web_JavaVersion= http://www.falstad.com/qm1dcrystal/
//web_AppletImage= 1dqcrystal.png
//web_Category= Physics - Solid State
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features= graphics, AWT-to-Swing


import java.awt.Color;
import java.awt.Component;
import java.awt.Cursor;
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
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.Vector;
import java.util.Random;
import java.lang.Math;
import java.text.DecimalFormat;
import java.text.NumberFormat;

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

import javax.swing.ButtonGroup;
import javax.swing.JRadioButtonMenuItem;

import a2s.Applet;

import Jama.Matrix;
import Jama.EigenvalueDecomposition;

class Quantum1DCrystalCanvas extends Canvas {
    Quantum1DCrystalFrame pg;
    Quantum1DCrystalCanvas(Quantum1DCrystalFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateQuantum1DCrystal(g);
    }
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
	pg.updateQuantum1DCrystal(g);
    }
};

class Quantum1DCrystalLayout implements LayoutManager {
    public Quantum1DCrystalLayout() {}
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
		if (m instanceof Scrollbar || m instanceof DecentScrollbar)
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


public class Quantum1DCrystal extends Applet implements ComponentListener {
    static Quantum1DCrystalFrame qf;
    void destroyFrame() {
	if (qf != null)
	    qf.dispose();
	qf = null;
	repaint();
    }

    public static void main(String args[]) {
        qf = new Quantum1DCrystalFrame(null);
        qf.init();
    }

    boolean started = false;
    public void init() {
	addComponentListener(this);
    }
    void showFrame() {
	if (qf == null) {
	    started = true;
	    qf = new Quantum1DCrystalFrame(this);
	    qf.init();
	    repaint();
	}
    }
    public void paint(Graphics g) {
	String s = "Applet is open in a separate window.";
	if (!started)
	    s = "Applet is starting.";
	else if (qf == null)
	    s = "Applet is finished.";
	else
	    qf.show();
	g.drawString(s, 10, 30);
    }
    
    public void componentHidden(ComponentEvent e){}
    public void componentMoved(ComponentEvent e){}
    public void componentShown(ComponentEvent e) { showFrame(); }
    public void componentResized(ComponentEvent e) {}
    
    public void destroy() {
	if (qf != null)
	    qf.dispose();
	qf = null;
	repaint();
    }
};

class Quantum1DCrystalFrame extends Frame
  implements ComponentListener, ActionListener,
             MouseMotionListener, MouseListener, ItemListener,
	     DecentScrollbarListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    Random random;
    int stateCount;
    int elevelCount;
    int maxStateCount = 500;
    int sampleCount = 320;
    int cellSampleCount = 32;
    int potSampleCount = 128;
    int pSampleCount;
    double modes[][];
    double modesLeft[][];
    double dispersion[][];
    double expecte;
    double selectedK;
    double potTrans[];
    double blochTrans[];
    int selectedBand;
    public static final double epsilon = .00001;
    public static final double epsilon2 = .003;
    public static final double phasorBaseEnergy = 1;
    
    public String getAppletInfo() {
	return "Quantum1DCrystal by Paul Falstad";
    }

    Button groundButton;
    Checkbox stoppedCheck;
    CheckboxMenuItem eCheckItem;
    CheckboxMenuItem xCheckItem;
    CheckboxMenuItem pCheckItem;
    CheckboxMenuItem blochCheckItem;
    CheckboxMenuItem dispersionCheckItem;
    CheckboxMenuItem expectCheckItem;
    JRadioButtonMenuItem probCheckItem;
    JRadioButtonMenuItem probPhaseCheckItem;
    JRadioButtonMenuItem reImCheckItem;
    JRadioButtonMenuItem magPhaseCheckItem;
    JRadioButtonMenuItem extendedZonesItem;
    JRadioButtonMenuItem reducedZonesItem;
    JRadioButtonMenuItem repeatedZonesItem;
    Menu waveFunctionMenu;
    Menu zoneMenu;
    MenuItem exitItem;
    Choice mouseChooser;
    Choice setupChooser;
    Vector setupList;
    Setup setup;
    DecentScrollbar forceBar, speedBar, wellCountBar, energyScaleBar;
    DecentScrollbar massBar, aux1Bar, aux2Bar, aux3Bar, aux4Bar;
    Label aux1Label, aux2Label, aux3Label, aux4Label;
    View viewPotential, viewX, viewP, viewDispersion, viewBloch;
    View viewList[];
    int viewCount;
    double elevels[];
    double dispmax[];
    static final double pi = 3.14159265358979323846;
    double step;
    double func[];
    double funci[];
    double blochr[];
    double blochi[];
    double pdata[], pdatar[], pdatai[];
    double pot[];
    double mass;
    double escale;
    int selectedCoef;
    int selectedPaneHandle;
    int kUpdateState, kUpdateSkip;
    static final int stateBuffer = 5;
    static final int SEL_NONE = 0;
    static final int SEL_POTENTIAL = 1;
    static final int SEL_X = 2;
    static final int SEL_P = 3;
    static final int SEL_STATES = 4;
    static final int SEL_HANDLE = 5;
    static final int SEL_DISPERSION = 6;
    static final int MOUSE_EIGEN = 0;
    static final int MOUSE_EDIT = 1;
    int selection;
    int dragX, dragY;
    int xpoints[], ypoints[];
    boolean dragging;
    boolean startup, selectGround;
    boolean levelsChanged, stateChanged;
    boolean setupModified;
    double t;
    int pause;
    static final int phaseColorCount = 480;
    Color phaseColors[];
    FFT fft;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    Quantum1DCrystalCanvas cv;
    Quantum1DCrystal applet;
    NumberFormat showFormat;

    Quantum1DCrystalFrame(Quantum1DCrystal a) {
	super("1-d Quantum Crystal Applet v1.0c");
	applet = a;
    }

    public void init() {
	startup = true;
	xpoints = new int[5];
	ypoints = new int[5];

	setupList = new Vector();
	Setup s = new FiniteWellSetup();
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	}
	selectedCoef = -1;
	setLayout(new Quantum1DCrystalLayout());
	cv = new Quantum1DCrystalCanvas(this);
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
	m.add(pCheckItem = getCheckItem("Momentum"));
	m.add(blochCheckItem = getCheckItem("Bloch Function"));
	/*m.add(densityCheckItem = getCheckItem("Density of Levels"));
	  densityCheckItem.setState(true);*/
	m.add(dispersionCheckItem = getCheckItem("Dispersion"));
	dispersionCheckItem.setState(true);
	m.addSeparator();
	/*m.add(expectCheckItem = getCheckItem("Expectation Values"));
	  expectCheckItem.setState(true);*/
	Menu m2 = waveFunctionMenu = new Menu("Wave Function");
	m.add(m2);
        m2.add(probCheckItem = getRadioItem("Probability"));
        m2.add(probPhaseCheckItem = getRadioItem("Probability + Phase"));
//      probPhaseCheckItem.setState(true);
        probPhaseCheckItem.setSelected(true);
        m2.add(reImCheckItem = getRadioItem("Real + Imaginary Parts"));
        m2.add(magPhaseCheckItem = getRadioItem("Magnitude + Phase"));

        radioGroup = null;
	m = zoneMenu = new Menu("Zones");
	mb.add(m);
	m.add(extendedZonesItem = getRadioItem("Extended Zone Scheme"));
	m.add(reducedZonesItem  = getRadioItem("Reduced Zone Scheme"));
	reducedZonesItem.setSelected(true);
	m.add(repeatedZonesItem = getRadioItem("Repeated Zone Scheme"));
	setMenuBar(mb);

	setupChooser = new Choice();
	int i;
	for (i = 0; i != setupList.size(); i++)
	    setupChooser.add("Setup: " +
			     ((Setup) setupList.elementAt(i)).getName());
	setup = (Setup) setupList.elementAt(0);
	setupChooser.addItemListener(this);
	add(setupChooser);

	mouseChooser = new Choice();
	mouseChooser.add("Mouse = Set Eigenstate");
	mouseChooser.add("Mouse = Edit Function");
	mouseChooser.addItemListener(this);
	add(mouseChooser);
	mouseChooser.select(MOUSE_EIGEN);

	add(groundButton = new Button("Ground State"));
	groundButton.addActionListener(this);
	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	add(stoppedCheck);
	
	add(new Label("Simulation Speed", Label.CENTER));
	add(speedBar = new DecentScrollbar(this, 50, 1, 150));

	add(new Label("Particle Mass", Label.CENTER));
	add(massBar = new DecentScrollbar(this, 100, 10, 500));

	add(new Label("# of Wells Shown", Label.CENTER));
	add(wellCountBar = new DecentScrollbar(this, 5, 1, 50));

	add(new Label("Energy Scale", Label.CENTER));
	add(energyScaleBar = new DecentScrollbar(this, 99, 1, 100));

	add(aux1Label = new Label("Aux 1", Label.CENTER));
	add(aux1Bar = new DecentScrollbar(this, 50, 1, 100));

	add(aux2Label = new Label("Aux 2", Label.CENTER));
	add(aux2Bar = new DecentScrollbar(this, 50, 1, 100));

	add(aux3Label = new Label("Aux 3", Label.CENTER));
	add(aux3Bar = new DecentScrollbar(this, 50, 1, 100));

	add(aux4Label = new Label("Aux 4", Label.CENTER));
	add(aux4Bar = new DecentScrollbar(this, 50, 1, 100));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	
	dispmax = new double[maxStateCount];
	setResolution();
	phaseColors = new Color[phaseColorCount+1];
	for (i = 0; i != phaseColorCount; i++) {
	    int pm = phaseColorCount/6;
	    int a1 = i % pm;
	    int a2 = a1*255/pm;
	    int a3 = 255-a2;
	    Color c = null;
	    switch (i/pm) {
	    case 0: c = new Color(255, a2, 0); break;
	    case 1: c = new Color(a3, 255, 0); break;
	    case 2: c = new Color(0, 255, a2); break;
	    case 3: c = new Color(0, a3, 255); break;
	    case 4: c = new Color(a2, 0, 255); break;
	    case 5: c = new Color(255, 0, a3); break;
	    }
	    phaseColors[i] = c;
	}
	phaseColors[phaseColorCount] = phaseColors[0];

	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
	showFormat = DecimalFormat.getInstance();
	showFormat.setMaximumFractionDigits(2);
	resize(750, 600);
	handleResize();
	Dimension x = getSize();
	Dimension screen = getToolkit().getScreenSize();
	setLocation((screen.width  - x.width)/2,
		    (screen.height - x.height)/2);
	show();
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

    void reinit() {
	doSetup();
    }

    void handleResize() {
        Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	int tpad = 20;
	int potsize = (viewPotential == null) ? 0 : viewPotential.height+tpad;
	int dispsize = (viewDispersion == null) ? 0 : viewDispersion.height+tpad;
	viewX = viewP = viewDispersion = viewPotential = viewBloch = null;
	viewList = new View[20];
	int i = 0;
	if (eCheckItem.getState())
	    viewList[i++] = viewPotential = new View();
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
	if (blochCheckItem.getState())
	    viewList[i++] = viewBloch = new View();
	if (pCheckItem.getState())
	    viewList[i++] = viewP = new View();
	if (dispersionCheckItem.getState())
	    viewList[i++] = viewDispersion = new View();
	viewCount = i;
	int sizenum = viewCount;
	int toth = winSize.height;

	// preserve size of potential and state panes if possible
	if (potsize > 0 && viewPotential != null) {
	    sizenum--;
	    toth -= potsize;
	}
	if (dispsize > 0 && viewDispersion != null) {
	    sizenum--;
	    toth -= dispsize;
	}
	int cury = 0;
	for (i = 0; i != viewCount; i++) {
	    View v = viewList[i];
	    int h = toth/sizenum;
	    if (v == viewPotential && potsize > 0)
		h = potsize;
	    else if (v == viewDispersion && dispsize > 0)
		h = dispsize;
	    v.x = 0;
	    v.width = winSize.width;
	    v.y = cury+tpad;
	    v.height = h-tpad;
	    v.handle = cury;
	    cury += h;
	}
	setGraphLines();
	dbimage = createImage(d.width, d.height);
    }
    
    void setGraphLines() {
	int i;
	for (i = 0; i != viewCount; i++) {
	    View v = viewList[i];
	    v.mid_y = v.y + v.height/2;
	    v.ymult = .90*v.height/2;
	    v.lower_y = (int) (v.mid_y+v.ymult);
	    v.ymult2 = v.ymult*2;
	}
    }

    void doGround() {
	select(0, 0);
    }

    void doBlank() {
	t = 0;
	// workaround bug in IE
	if (winSize != null && winSize.width > 0)
	    dbimage = createImage(winSize.width, winSize.height);
    }

    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    long lastTime;
    public void updateQuantum1DCrystal(Graphics realg) {
	if (winSize == null || winSize.width == 0)
	    return;
	Graphics g = dbimage.getGraphics();
	boolean allQuiet = true;
	double tadd = 0;
	if (!stoppedCheck.getState() && !dragging) {
	    int val = speedBar.getValue();
	    tadd = Math.exp(val/20.)*(.1/5);
	    long sysTime = System.currentTimeMillis();
	    if (lastTime == 0)
		lastTime = sysTime;
	    tadd *= (sysTime-lastTime)*(1/17.);
	    lastTime = sysTime;
	    allQuiet = false;
	} else
	    lastTime = 0;
	Color gray1 = new Color(76,  76,  76);
	Color gray2 = new Color(127, 127, 127);
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());
	int i;
	int ox = -1, oy = -1;

	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].handle, winSize.width, viewList[i].handle);
	}

	if (levelsChanged || stateChanged) {
	    cv.setCursor(Cursor.getPredefinedCursor(WAIT_CURSOR));
	    if (levelsChanged)
		genStates();
	    else
		getBands(true, selectedK, selectedBand);
	    cv.setCursor(null);
	    levelsChanged = stateChanged = false;
	} else {
	    long tm = System.currentTimeMillis();
	    // spend 50ms updating K
	    while (updateK() &&
		   System.currentTimeMillis() < tm+50)
		;
	}

	ox = -1;
	int j;

	if (viewPotential != null) {
	    int mid_y = viewPotential.mid_y;
	    double ymult = viewPotential.ymult;
	    g.setColor(Color.gray);
	    for (i = 0; i < elevelCount; i += 2) {
		g.setColor(Color.darkGray);
		double dy2 = elevels[i];
		double dy1 = elevels[i+1];
		int y1 = getEnergyY(dy1, viewPotential);
		int y2 = getEnergyY(dy2, viewPotential);
		y2 -= y1;
		if (y2 <= 0)
		    y2 = 1;
		g.fillRect(0, y1, winSize.width, y2);
	    }
	    
	    g.setColor(Color.white);
	    int wc = wellCountBar.getValue();
	    double step = winSize.width/((double) potSampleCount*wc);
	    for (i = 0; i != potSampleCount*wc; i++) {
		int x = (int) (step*i);
		double dy = pot[i & (potSampleCount-1)];
		int y = getEnergyY(dy, viewPotential);
		if (ox != -1)
		    g.drawLine(ox, oy, x, y);
		ox = x;
		oy = y;
	    }

	    int y = getEnergyY(expecte, viewPotential);
	    g.setColor(Color.red);
	    g.drawLine(0, y, winSize.width, y);
	    /*
	    g.setColor(Color.black);
	    g.fillRect(0, 0, winSize.width, 20);
	    viewPotential.drawLabel(g, "Potential");*/
	}

	ox = -1;
	g.setColor(Color.white);

	double maxf = 0;
	for (i = 0; i != sampleCount; i++) {
	    int x = winSize.width * i / sampleCount;
	    double dr = func[i], di = funci[i];
	    double dy = dr*dr+di*di;
	    if (dy > maxf)
		maxf = dy;
	}

	// evolve wave function
	double speed = (expecte+1)*tadd;
	double efr = Math.cos(speed);
	double efi = -Math.sin(speed);
	for (i = 0; i != sampleCount; i++) {
	    double fr = func [i];
	    double fi = funci[i];
	    func [i] = fr*efr - fi*efi;
	    funci[i] = fr*efi + fi*efr;
	    fr = blochr[i];
	    fi = blochi[i];
	    blochr[i] = fr*efr - fi*efi;
	    blochi[i] = fr*efi + fi*efr;
	}
	
	if (viewX != null) {
	    viewX.drawLabel(g, "Wave Function (Position)");
	    // draw X representation
	    int mid_y = viewX.mid_y;
	    double ymult = viewX.ymult;

	    drawFunction(g, viewX, func, funci, sampleCount, 0);

	    if (selectedCoef != -1 && !dragging) {
		g.setColor(Color.yellow);
		ox = -1;
		for (i = 0; i != sampleCount; i++) {
		    int x = winSize.width * i / sampleCount;
		    double dy = modes[selectedCoef][i]/dispmax[selectedCoef];
		    int y = mid_y - (int) (ymult * dy);
		    if (ox != -1)
			g.drawLine(ox, oy, x, y);
		    ox = x;
		    oy = y;
		}
	    }
	}

	if (viewP != null) {
	    viewP.drawLabel(g, "Momentum");
	    // draw P representation

	    g.setColor(gray2);
	    g.drawLine(winSize.width/2, viewP.mid_y-(int) viewP.ymult,
		       winSize.width/2, viewP.mid_y+(int) viewP.ymult);

	    for (i = 0; i != pdatar.length; i++)
		pdatar[i] = pdatai[i] = 0;

	    int btlen = blochTrans.length/4;
	    int btmask = blochTrans.length-1;
	    
	    // I must have missed a sign somewhere; fix it so that waves
	    // are going in right direction
	    int fudge = ((selectedBand & 1) == 1) ? 1 : -1;
	    int kstep = 8;
	    kstep *= -fudge;
	    
	    int pc = pdatar.length/2 + (int) (selectedK*kstep);
	    btlen = 16;

	    for (i = 0; i != btlen; i++) {
		pdatar[pc+kstep*i] = blochTrans[i*2];
		pdatar[pc-kstep*i] = blochTrans[btmask&(-i*2)];
		pdatai[pc+kstep*i] = blochTrans[i*2+1];
		pdatai[pc-kstep*i] = blochTrans[btmask&(-i*2+1)];
	    }
	    for (i = pdatar.length-1; i > 0; i--) {
		if (pdatar[i] == 0 && pdatai[i] == 0) {
		    pdatar[i] = pdatar[i-1]*1e-16;
		    pdatai[i] = pdatai[i-1]*1e-16;
		}
	    }
	    int offset = pSampleCount/4;
	    drawFunction(g, viewP, pdatar, pdatai, pSampleCount/2, offset);
	}

	if (viewDispersion != null) {
	    viewDispersion.drawLabel(g, "Dispersion (E vs. k)");
	    g.setColor(Color.gray);
	    int mid_y = viewDispersion.mid_y;
	    double ymult = viewDispersion.ymult;
	    double e0 = elevels[0]+1;
	    int top = viewDispersion.y+5;
	    for (i = 0; i < elevelCount; i += 2) {
		g.setColor(Color.darkGray);
		double dy2 = elevels[i]-e0;
		double dy1 = elevels[i+1]-e0;
		int y1 = getEnergyY(dy1, viewDispersion);
		int y2 = getEnergyY(dy2, viewDispersion);
		if (y2 < top)
		    continue;
		if (y1 < top)
		    y1 = top;
		y2 -= y1;
		if (y2 <= 0)
		    y2 = 1;
		g.fillRect(0, y1, winSize.width, y2);
	    }
	    
	    g.setColor(Color.white);
	    if (repeatedZonesItem.isSelected()) {
		viewDispersion.cellw2 = viewDispersion.width/10;
		int cells = (viewDispersion.width/2)/viewDispersion.cellw2 + 1;
		for (i = 0; i != dispersion.length; i++)
		    for (j = -cells; j <= cells; j++)
			drawDispersion(g, i, j, true, true);
	    }

	    if (reducedZonesItem.isSelected()) {
		viewDispersion.cellw2 = viewDispersion.width/3;
		for (i = 0; i != dispersion.length; i++)
		    drawDispersion(g, i, 0, true, true);
	    }

	    if (extendedZonesItem.isSelected()) {
		viewDispersion.cellw2 = viewDispersion.width/10;
		boolean xp = true;
		for (i = 0; i != dispersion.length; i++) {
		    drawDispersion(g, i, (i+1)/2, xp, !xp);
		    drawDispersion(g, i, -(i+1)/2, !xp, xp);
		    xp = !xp;
		}
	    }

	    int y = getEnergyY(expecte-e0, viewDispersion);
	    g.setColor(Color.red);
	    if (y >= viewDispersion.y) {
		g.drawLine(0, y, winSize.width, y);
	    }
	    int x = (int) (viewDispersion.cellw2*selectedK*2+
			   viewDispersion.width/2);
	    if (!extendedZonesItem.isSelected())
		g.drawLine(x, top, x, viewDispersion.y+viewDispersion.height);
	}
	
	if (viewBloch != null) {
	    viewBloch.drawLabel(g, "Bloch Function");
	    drawFunction(g, viewBloch, blochr, blochi, blochr.length, 0);
	}
	
	realg.drawImage(dbimage, 0, 0, this);
	if (!stoppedCheck.getState())
	    cv.repaint(pause);
    }

    int getEnergyY(double e, View v) {
	escale = energyScaleBar.getValue()/100.;
	e = (e+1)*escale-1;
	return v.mid_y - (int) (v.ymult*e);
    }
    
    void drawDispersion(Graphics g, int level, int off, boolean pos, boolean neg) {
	int ox = -1;
	int oy = -1;
	int j;
	double e0 = elevels[0]+1;
	int cellw2 = viewDispersion.cellw2;
	int cellw = cellw2*2;
	int top = viewDispersion.y+5;
	for (j = 0; j != dispersion[0].length; j++) {
	    int cx = off*cellw + viewDispersion.width/2;
	    int x = j*cellw2/(dispersion[0].length-1);
	    int y = getEnergyY(dispersion[level][j]-e0, viewDispersion);
	    if (ox != -1 && y > top && oy > top) {
		if (pos)
		    g.drawLine(cx+ox, oy, cx+x, y);
		if (neg)
		    g.drawLine(cx-ox, oy, cx-x, y);
	    }
	    ox = x;
	    oy = y;
	}
    }
    
    String getUnitText(double v, String u) {
	double va = Math.abs(v);
	if (va < 1e-17)
	    return "0 " + u;
	if (va < 1e-12)
	    return showFormat.format(v*1e15) + " f" + u;
	if (va < 1e-9)
	    return showFormat.format(v*1e12) + " p" + u;
	if (va < 1e-6)
	    return showFormat.format(v*1e9) + " n" + u;
	if (va < 1e-3)
	    return showFormat.format(v*1e6) + " u" + u;
	if (va < 1)
	    return showFormat.format(v*1e3) + " m" + u;
	if (va < 1e3)
	    return showFormat.format(v) + " " + u;
	if (va < 1e6)
	    return showFormat.format(v*1e-3) + " k" + u;
	if (va < 1e9)
	    return showFormat.format(v*1e-6) + " M" + u;
	if (va < 1e12)
	    return showFormat.format(v*1e-9) + " G" + u;
	if (va < 1e15)
	    return showFormat.format(v*1e-12) + " T" + u;
	return v + " " + u;
    }

    String getEnergyText(double e, boolean abs) {
	return getUnitText(convertEnergy(e, abs), "eV");
    }

    String getLengthText(double x) {
	// getEnergyText() assumes a 4 nm screen width
	return getUnitText(pointsToLength(x), "m");
    }

    double pointsToLength(double x) {
	// getEnergyText() assumes a 4 nm screen width
	return 4e-9*x/(sampleCount-2.);
    }

    double convertEnergy(double e, boolean abs) {
	// ground state energy for an electron in a 4 nm infinite well (in eV)
	// (for 1 Angstrom, it's 37.603)
	double base = .023502;
	
	// the calculated ground state energy for a particle of default mass in a
	// well the full width of the window is 0.001891.  So, if we assume the
	// window is 1 angstrom wide, then we multiply the elevels by base/.001891 to
	// get eV.
	if (abs)
	    e += setup.getBaseEnergy();
	return e*base/.0018801;
    }

    int stateColSize, stateSize;

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
	double maxnm = Math.sqrt(maxsq);
	double uncert = Math.sqrt(expectx2-expectx*expectx);
	int ox = -1, oy = 0;
	double bestscale = 0;
	if (fi != null &&
	      (probCheckItem.isSelected() || probPhaseCheckItem.isSelected()))
	    bestscale = 1/maxsq;
	else
	    bestscale = 1/maxnm;
	view.scale = bestscale;
	/*
	if (!adjustingWaveFunc) {
	    // adjust scale
	    view.scale *= 1.001;
	    if (view.scale > bestscale || view.scale == 0)
		view.scale = bestscale;
	    if (view.scale > 1e8)
		view.scale = 1e8;
	}
	*/
	g.setColor(Color.gray);

	/*
	double scaler = 1e-10;
	while (scaler*view.scale*view.ymult*600 < view.height)
	    scaler *= 10;
	System.out.print(scaler + "\n");
	for (i = 0; i != 20; i++) {
	    int y = (int) (view.ymult * i * view.scale * scaler * 10);
	    System.out.print(i + " " + y + "\n");
	    if (y > view.height/2)
		break;
	    g.drawLine(winSize.width-5, view.mid_y - y,
		       winSize.width, view.mid_y - y);
	}
	*/

	if ((probCheckItem.isSelected() || probPhaseCheckItem.isSelected() ||
	     magPhaseCheckItem.isSelected()) && fi != null) {

	    // draw probability or magnitude
	    g.setColor(Color.white);
	    double mult = view.ymult2*view.scale;
	    for (i = 0; i != count; i++) {
		int x = winSize.width * i / (count-1);
		double dy = 0;
		int ii = i+offset;
		if (!magPhaseCheckItem.isSelected())
		    dy = (fr[ii]*fr[ii]+fi[ii]*fi[ii]);
		else
		    dy = Math.sqrt(fr[ii]*fr[ii]+fi[ii]*fi[ii]);
		if (!probCheckItem.isSelected()) {
		    double ang = Math.atan2(fi[ii], fr[ii]);
		    g.setColor(phaseColors[(int)((ang+pi)*phaseColorCount/(2*pi+.2))]);
		}
		int y = view.lower_y - (int) (mult * dy);
		if (y < view.y)
		    y = view.y;
		if (ox != -1) {
		    xpoints[0] = ox;
		    ypoints[0] = view.lower_y+1;
		    xpoints[1] = ox;
		    ypoints[1] = oy;
		    xpoints[2] = x;
		    ypoints[2] = y;
		    xpoints[3] = x;
		    ypoints[3] = view.lower_y+1;
		    g.fillPolygon(xpoints, ypoints, 4);
		}
		ox = x;
		oy = y;
	    }
	} else {
	    g.setColor(Color.darkGray);
	    int mid_y = view.mid_y;
	    g.drawLine(0, mid_y, winSize.width, mid_y);
	    double mult = view.ymult*view.scale;
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
	}
	if (maxsq > 0 && fi != null) {
	    expectx += zero;
	    /*if (uncertaintyCheckItem.getState()) {
		g.setColor(Color.blue);
		g.drawLine((int) (expectx-uncert), view.y,
			   (int) (expectx-uncert), view.y+view.height);
		g.drawLine((int) (expectx+uncert), view.y,
			   (int) (expectx+uncert), view.y+view.height);
			   }*/
	    /*if (expectCheckItem.getState()) {
		g.setColor(Color.red);
		g.drawLine((int) expectx, view.y,
			   (int) expectx, view.y+view.height);
			   }*/
	}
    }

    void edit(MouseEvent e) {
	if (selection == SEL_NONE)
	    return;
	int x = e.getX();
	int y = e.getY();
	switch (selection) {
	case SEL_HANDLE: editHandle(y);   break;
	case SEL_DISPERSION : editDispersion(x, y); break;
	default:         editFunc(x, y);  break;
	}
    }

    void editHandle(int y) {
	int dy = y-viewList[selectedPaneHandle].handle;
	View upper = viewList[selectedPaneHandle-1];
	View lower = viewList[selectedPaneHandle];
	int minheight = 10;
	if (upper.height+dy < minheight || lower.height-dy < minheight)
	    return;
	upper.height += dy;
	lower.height -= dy;
	lower.y += dy;
	lower.handle += dy;
	setGraphLines();
	cv.repaint(pause);
    }

    void editFunc(int x, int y) {
	if (mouseChooser.getSelectedIndex() == MOUSE_EIGEN) {
	    if (selection == SEL_POTENTIAL)
		selectStateByEnergy(y);
	    return;
	}
	if (dragX == x) {
	    editFuncPoint(x, y);
	    dragY = y;
	} else {
	    // need to draw a line from old x,y to new x,y and
	    // call editFuncPoint for each point on that line.  yuck.
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

    void editFuncPoint(int x, int y) {
	if (selection != SEL_POTENTIAL)
	    return;
	View v = (selection == SEL_X) ? viewX : viewPotential;
	int wc = wellCountBar.getValue();
	int fullx = potSampleCount*wc;
	int lox = x * fullx / winSize.width;
	int hix = ((x+1) * fullx-1) / winSize.width;
	double val = (v.mid_y - y) / v.ymult;
	double val2 = (v.lower_y - y) / v.ymult2;
	if (val > 1)
	    val = 1;
	if (val < -1)
	    val = -1;
	if (val2 > 1)
	    val2 = 1;
	if (val2 < 0)
	    val2 = 0;
	val  = (val +1)/escale-1;
	val2 = (val2+1)/escale-1;
	if (val > 1)
	    val = 1;
	if (val2 > 1)
	    val2 = 1;
	if (lox < 1)
	    lox = 1;
	if (hix >= sampleCount-1)
	    hix = sampleCount-2;
	for (; lox <= hix; lox++) {
	    pot[lox % potSampleCount] = val;
	    setupModified = true;
	    getPotTrans();
	    levelsChanged = true;
	}
	cv.repaint(pause);
    }

    void editDispersion(int x, int y) {
	x -= viewDispersion.width/2;
	double k = x*.5/viewDispersion.cellw2;

	if (extendedZonesItem.isSelected()) {
	    int band = 0;
	    while (k > .5) {
		k -= .5;
		band++;
	    }
	    while (k < -.5) {
		k += .5;
		band++;
	    }
	    if ((band & 1) != 0)
		k = (k >= 0) ? .5-k : -.5-k;
	    select(k, band);
	    return;
	}
	
	if (repeatedZonesItem.isSelected()) {
	    while (k > .5)
		k -= 1;
	    while (k < -.5)
		k += 1;
	}
	if (k > .5)
	    k = .5;
	if (k < -.5)
	    k = -.5;
	int i;
	int besty = 1000;
	int band = 0;
	double e0 = elevels[0]+1;
	for (i = 0; i != dispersion.length; i++) {
	    int ya = getEnergyY(elevels[i*2  ]-e0, viewDispersion);
	    int yb = getEnergyY(elevels[i*2+1]-e0, viewDispersion);
	    if (y < ya && y > yb) {
		besty = -1;
		band = i;
		break;
	    }
	    int yd = Math.abs(y-ya);
	    if (yd < besty) {
		besty = yd;
		band = i;
	    }
	    yd = Math.abs(y-yb);
	    if (yd < besty) {
		besty = yd;
		band = i;
	    }
	}

	select(k, band);
    }

    void select(double k, int band) {
	selectedK = k;
	selectedBand = band;
	stateChanged = true;
	cv.repaint(pause);
    }

    void getPotTrans() {
	potTrans = new double[potSampleCount*2];
	int i;
	for (i = 0; i != potSampleCount; i++)
	    potTrans[i*2] = pot[i];
	FFT fft = new FFT(potSampleCount);
	fft.transform(potTrans, false);
    }
    
    double getPState(int x) {
	double p = (x * pSampleCount/2 / winSize.width) - pSampleCount/4;
	return p*pi/(pSampleCount/2);
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
    }

    public void scrollbarValueChanged(DecentScrollbar ds) {
	System.out.print(ds.getValue() + "\n");
	if (ds == massBar)
	    levelsChanged = true;
	if (ds == aux1Bar || ds == aux2Bar || ds == aux3Bar || ds == aux4Bar) {
	    setup.drawPotential();
	    getPotTrans();
	    levelsChanged = true;
	}
	if (ds == wellCountBar) {
	    setResolution();
	    setup.drawPotential();
	    stateChanged = true;
	}
	cv.repaint(pause);
    }

    public void scrollbarFinished(DecentScrollbar ds) {
	/*
	if (ds == massBar || ds == aux1Bar || ds == aux2Bar || ds == aux3Bar ||
	    ds == aux4Bar) {
	    adjustingStates = false;
	    statesChanged = true;
	    cv.repaint(pause);
	}
	*/
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

    void setResolution() {
	int wc = wellCountBar.getValue();
	cellSampleCount = 8;
	while (cellSampleCount < 700/wc)
	    cellSampleCount *= 2;
	sampleCount = cellSampleCount * wc;
	//sampleCount++;
	func = new double[sampleCount];
	funci = new double[sampleCount];
	blochr = new double[sampleCount];
	blochi = new double[sampleCount];
	pot = new double[potSampleCount];
	stateChanged = true;
	pSampleCount = 512;
	pdatar = new double[pSampleCount];
	pdatai = new double[pSampleCount];
	fft = new FFT(pSampleCount);
    }

    void genStates() {
	levelsChanged = false;

	if (potTrans == null)
	    getPotTrans();
	
	double lev1[] = getBands(false, 0, 0);
	double lev2[] = getBands(false, .5, 0);

	elevelCount = lev1.length*2;
	elevels = new double[elevelCount];
	stateCount = elevelCount;
	
	// copy levels, and make sure they are in proper order
	// (swapp every other pair)
	int i;
	for (i = 0; i != lev1.length; i++) {
	    int a = (i & 1);
	    elevels[i*2+a]   = lev1[i];
	    elevels[i*2+1-a] = lev2[i];
	}

	// start to calculate the dispersion graph; first get the
	// endpoints, k = 0 and k = .5
	int dispx = 65;
	int ll = lev1.length;
	dispersion = new double[ll][dispx];
	for (i = 0; i != ll; i++) {
	    dispersion[i][0]       = lev1[i];
	    dispersion[i][dispx-1] = lev2[i];
	    
	    // linearly interpolate the middle values for now
	    int j;
	    for (j = 1; j < dispx-1; j++) {
		double q = j/(dispx-1.);
		dispersion[i][j] = lev1[i]*(1-q) + lev2[i]*q;
	    }
	}
	// fill in the rest of the dispersion graph later
	kUpdateState = dispx/2;
	kUpdateSkip  = kUpdateState*2;

	getBands(true, selectedK, selectedBand);
    }

    boolean updateK() {
	// are we done?
	if (kUpdateSkip <= 1)
	    return false;

	// update one k value in the dispersion graph.  at the start,
	// have the endpoints k = 0 and .5, and then we do .25, and then
	// .125 and .375, etc. until it's all done.
	
	int dispx = dispersion[0].length;
	double k = kUpdateState/(2.*(dispx-1));
	double lev3[] = getBands(false, k, 0);
	int j;
	for (j = 0; j != lev3.length; j++) {
	    dispersion[j][kUpdateState] = lev3[j];
	    int hskip = kUpdateSkip/2;
	    int m;
	    // interpolate linearly between the neighbor points that are done
	    for (m = 1; m < hskip; m++) {
		double q = m/(double) hskip;
		dispersion[j][kUpdateState-m] =
		    (1-q)*dispersion[j][kUpdateState] +
		    q*dispersion[j][kUpdateState-hskip];
		dispersion[j][kUpdateState+m] =
		    (1-q)*dispersion[j][kUpdateState] +
		    q*dispersion[j][kUpdateState+hskip];
	    }
	}
	
	// skip to the next point
	kUpdateState += kUpdateSkip;
	if (kUpdateState >= dispx) {
	    // use a finer grid
	    kUpdateSkip /= 2;
	    if (kUpdateSkip == 1)
		return false;
	    kUpdateState = kUpdateSkip/2;
	}
	return true;
    }
    
    int getFourierIndex(int i, int n) {
	return (i > n/2) ? n/2-i : i;
    }
    
    double [] getBands(boolean getStates, double k, int band) {
	//System.out.println("genstates " + k);
	// n = number of basis states to use (more = more accurate, slower)
	int n = 48;
	int n2 = n*2;
	double h[][] = new double[n2][n2];
	int i, j;
	mass = massBar.getValue()*.0002;
	double m1 = 1./mass;
	mass *= .511e6 / .32;

	// calculate matrix element of H.  The basis functions for the
	// H matrix are the momentum eigenfunctions, e^ikx.  We
	// convert the complex H (n by n) to a real H matrix 2n by 2n, because our
	// eigenvalue solver can't handle complex numbers.  To set
	// H(i,j) to a+bi, we set H(i,j)=H(i+n,j+n)=a, H(i+n,j)=-b,
	// H(i,j+n)=b.
	for (i = 0; i != n; i++) {
	    // basis state i = exp(I*ii*x) (I^2 = -1)
	    int ii = getFourierIndex(i, n);
	    // p^2/2m matrix has h^2 (ii+k)^2/2m along the diagonal
	    double iik = ii+k;
	    h[i+n][i+n] = h[i][i] = m1*iik*iik*.01;
	    for (j = 0; j != n; j++) {
		// basis state j = exp(I*jj*x)
		int jj = getFourierIndex(j, n);
		// V matrix element Vij = (jj-ii)'th element of fourier xform of potential fn
		int ij = jj-ii;
		if (ij < 0)
		    ij += potTrans.length/2;
		double re = potTrans[ij*2]/potSampleCount;
		double im = potTrans[ij*2+1]/potSampleCount;
		h[i][j] += re;
		h[i+n][j+n] += re;
		h[i+n][j] -= im;
		h[i][j+n] += im;
	    }
	}

	Matrix mx = new Matrix(h);
        EigenvalueDecomposition ed = mx.eig(getStates);
	double w[] = ed.getRealEigenvalues();
	//System.out.println(info.val);

	double levels[] = new double[n2];

	// now get the eigenvalues and sort them
	for (i = 0; i != n2; i++)
	    levels[i] = w[i];

	int si, sj;
	// sort the elevels
	for (si = 1; si < n2; si++) {
	    double v = levels[si];
	    sj = si;
	    while (levels[sj-1] > v) {
		levels[sj] = levels[sj-1]; sj--;
		if (sj <= 0) break;
	    }
	    levels[sj] = v;
	}

	// get the levels
	double levels2[] = new double[20];
	for (i = 0; i != 20; i++)
	    levels2[i] = levels[i*2];

	// if we only need the levels, quit now
	if (!getStates)
	    return levels2;

	// get an eigenstate by stepping through all them.
	int picker = 0;
	double vecs[][] = ed.getV().getArray();

	for (i = 0; i != stateCount; i++) {
	    for (j = 0; j != n2; j++)
		if (levels[i] == w[j])
		    break;
	    if (j == n) {
		System.out.print("can't find elevels! " + i + " " +
				 levels[i] + "\n");
		continue;
	    }
	    w[j] = -1;
	    // is this the eigenstate we want?
	    if (picker++ < band*2)
		continue;

	    // do an inverse FFT to calculate the bloch function
	    double q[] = new double[cellSampleCount*2];
//	    int off = n2*j;
	    blochTrans = new double[cellSampleCount*2];
	    int row = j;
	    int norm = (vecs[1][row] < 0) ? -1 : 1;
	    for (j = 0; j != n; j++) {
		int qo = getFourierIndex(j, n);
		if (Math.abs(qo) >= cellSampleCount/2)
		    continue;
		if (qo < 0)
		    qo += q.length/2;
		blochTrans[qo*2]   = q[qo*2  ] = norm*vecs[j][row];
		blochTrans[qo*2+1] = q[qo*2+1] = norm*vecs[j+n][row];
	    }
	    FFT fft = new FFT(cellSampleCount);
	    fft.transform(q, true);
	    double km = 2*pi*k/cellSampleCount;
	    
	    // I must have missed a sign somewhere; fix it so that waves
	    // are going in right direction
	    int fudge = ((band & 1) == 1) ? 1 : -1;

	    // multiply by the bloch wave to get the required state over
	    // multiple wells.
	    for (j = 0; j != sampleCount; j++) {
		int ji = j % cellSampleCount;
		double re = q[ji*2];
		double im = q[ji*2+1];
		double kr = Math.cos(j*km);
		double ki = -Math.sin(j*km);
		func[j] = re*kr - im*ki;
		funci[j] = fudge*(re*ki + im*kr);
		blochr[j] = re;
		blochi[j] = fudge*im;
	    }
	    expecte = levels[band*2];
	    break;
	}

	return null;
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
    }
    public void mouseMoved(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int oldCoef = selectedCoef;
	int oldSelection = selection;
	selectedCoef = -1;
	selectedPaneHandle = -1;
	selection = 0;
	int i;
	for (i = 1; i != viewCount; i++) {
	    int dy = y-viewList[i].handle;
	    if (dy >= -3 && dy <= 3) {
		selectedPaneHandle = i;
		selection = SEL_HANDLE;
	    }
	}
	Cursor cs = null;
	if (selection == SEL_HANDLE)
	    cs = Cursor.getPredefinedCursor(N_RESIZE_CURSOR);
	else if (viewX != null && viewX.contains(x, y))
	    selection = SEL_X;
	else if (viewP != null && viewP.contains(x, y)) {
	    selection = SEL_P;
	    cv.repaint(pause);
	} else if (viewPotential != null && viewPotential.contains(x, y)) {
	    selection = SEL_POTENTIAL;
	}  else if (viewDispersion != null && viewDispersion.contains(x, y)) {
	    selection = SEL_DISPERSION;
	}
	cv.setCursor(cs);
	if (selection != oldSelection || selectedCoef != oldCoef)
	    cv.repaint(pause);
    }

    void selectStateByEnergy(int y) {
	int band = 0;
	double besty = 1000;
	int i, j;
	double k = 0;
	for (i = 0; i != dispersion.length; i++)
	    for (j = 0; j != dispersion[0].length; j++) {
		double ye = getEnergyY(dispersion[i][j], viewPotential);
		// subtract out the energy to break ties
		ye -= dispersion[i][j]*1e-8;
		double yd = Math.abs(y-ye);
		if (yd < besty) {
		    besty = yd;
		    band = i;
		    k = j*.5/(dispersion[0].length-1);
		}
	    }
	select(k, band);
    }

    public void mouseClicked(MouseEvent e) {
	if (e.getClickCount() == 2 && selectedCoef != -1)
	    enterSelectedState();
    }

    void enterSelectedState() {
    }

    public void mouseEntered(MouseEvent e) {
    }
    public void mouseExited(MouseEvent e) {
	if (!dragging) {
	    if (selectedCoef != -1) {
		selectedCoef = -1;
		cv.repaint(pause);
	    }
	    if (selectedPaneHandle != -1) {
		selectedPaneHandle = -1;
		cv.repaint(pause);
	    }
	}
    }
    
    public void mousePressed(MouseEvent e) {
	mouseMoved(e);
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = true;
	edit(e);
    }
    
    public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	/*if (mouseChooser.getSelectedIndex() == MOUSE_EDIT &&
	    selection == SEL_POTENTIAL) {
	    adjustingStates = false;
	    statesChanged = true;
	    }*/
	dragging = false;
	cv.repaint(pause);
    }
    
    boolean finished;
    
    public void itemStateChanged(ItemEvent e) {
        if (!finished)
            return;
	if (e.getItemSelectable() == stoppedCheck) {
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() == setupChooser)
	    doSetup();
	if (e.getItemSelectable() instanceof JRadioButtonMenuItem) {
	    JRadioButtonMenuItem cmi = (JRadioButtonMenuItem) e.getItemSelectable();
	    if (!(cmi == extendedZonesItem ||
		  cmi == reducedZonesItem ||
		  cmi == repeatedZonesItem))
		handleResize();
	    cv.repaint(pause);
	}
	int i;
//	doRadio(waveFunctionMenu, e);
//	doRadio(zoneMenu, e);
    }

    void doRadio(Menu menu, ItemEvent e) {
	int i, j;
	for (i = 0; i != menu.countItems(); i++)
	    if (e.getItemSelectable() == menu.getItem(i)) {
		((CheckboxMenuItem) menu.getItem(i)).setState(true);
		for (j = 0; j != menu.countItems(); j++)
		    if (i != j)
			((CheckboxMenuItem) menu.getItem(j)).setState(false);
	    }
    }

    void doSetup() {
	doBlank();
	int i;
	for (i = 0; i != potSampleCount; i++)
	    pot[i] = 0;
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	aux1Bar.setValue(100);
	aux2Bar.setValue(100);
	aux3Bar.setValue(100);
	aux4Bar.setValue(100);
	selectGround = true;
	setup.select();
	setup.drawPotential();
	getPotTrans();
	setupModified = false;
	levelsChanged = true;
	if (setup.getAuxBarCount() >= 2) {
	    aux2Label.show();
	    aux2Bar.show();
	} else {
	    aux2Label.hide();
	    aux2Bar.hide();
	}
	if (setup.getAuxBarCount() >= 3) {
	    aux3Label.show();
	    aux3Bar.show();
	} else {
	    aux3Label.hide();
	    aux3Bar.hide();
	}
	if (setup.getAuxBarCount() >= 4) {
	    aux4Label.show();
	    aux4Bar.show();
	} else {
	    aux4Label.hide();
	    aux4Bar.hide();
	}
	validate();
	selectedCoef = -1;
    }

    class FFT {
	double wtabf[];
	double wtabi[];
	int size;
	FFT(int sz) {
	    size = sz;
	    if ((size & (size-1)) != 0)
		System.out.println("size must be power of two!");
	    calcWTable();
	}
	
	void calcWTable() {
	    // calculate table of powers of w
	    wtabf = new double[size];
	    wtabi = new double[size];
	    int i;
	    for (i = 0; i != size; i += 2) {
		double pi = 3.1415926535;
		double th = pi*i/size;
		wtabf[i  ] = Math.cos(th);
		wtabf[i+1] = Math.sin(th);
		wtabi[i  ] = wtabf[i];
		wtabi[i+1] = -wtabf[i+1];
	    }
	}
    
	void transform(double data[], boolean inv) {
	    int i;
	    int j = 0;
	    int size2 = size*2;

	    if ((size & (size-1)) != 0)
		System.out.println("size must be power of two!");
	
	    // bit-reversal
	    double q;
	    int bit;
	    for (i = 0; i != size2; i += 2) {
		if (i > j) {
		    q = data[i]; data[i] = data[j]; data[j] = q;
		    q = data[i+1]; data[i+1] = data[j+1]; data[j+1] = q;
		}
		// increment j by one, from the left side (bit-reversed)
		bit = size;
		while ((bit & j) != 0) {
		    j &= ~bit;
		    bit >>= 1;
		}
		j |= bit;
	    }

	    // amount to skip through w table
	    int tabskip = size << 1;
	    double wtab[] = (inv) ? wtabi : wtabf;
	
	    int skip1, skip2, ix, j2;
	    double wr, wi, d1r, d1i, d2r, d2i, d2wr, d2wi;
	
	    // unroll the first iteration of the main loop
	    for (i = 0; i != size2; i += 4) {
		d1r = data[i];
		d1i = data[i+1];
		d2r = data[i+2];
		d2i = data[i+3];
		data[i  ] = d1r+d2r;
		data[i+1] = d1i+d2i;
		data[i+2] = d1r-d2r;
		data[i+3] = d1i-d2i;
	    }
	    tabskip >>= 1;
	
	    // unroll the second iteration of the main loop
	    int imult = (inv) ? -1 : 1;
	    for (i = 0; i != size2; i += 8) {
		d1r = data[i];
		d1i = data[i+1];
		d2r = data[i+4];
		d2i = data[i+5];
		data[i  ] = d1r+d2r;
		data[i+1] = d1i+d2i;
		data[i+4] = d1r-d2r;
		data[i+5] = d1i-d2i;
		d1r = data[i+2];
		d1i = data[i+3];
		d2r = data[i+6]*imult;
		d2i = data[i+7]*imult;
		data[i+2] = d1r-d2i;
		data[i+3] = d1i+d2r;
		data[i+6] = d1r+d2i;
		data[i+7] = d1i-d2r;
	    }
	    tabskip >>= 1;
	
	    for (skip1 = 16; skip1 <= size2; skip1 <<= 1) {
		// skip2 = length of subarrays we are combining
		// skip1 = length of subarray after combination
		skip2 = skip1 >> 1;
		tabskip >>= 1;
		for (i = 0; i != 1000; i++);
		// for each subarray
		for (i = 0; i < size2; i += skip1) {
		    ix = 0;
		    // for each pair of complex numbers (one in each subarray)
		    for (j = i; j != i+skip2; j += 2, ix += tabskip) {
			wr = wtab[ix];
			wi = wtab[ix+1];
			d1r = data[j];
			d1i = data[j+1];
			j2 = j+skip2;
			d2r = data[j2];
			d2i = data[j2+1];
			d2wr = d2r*wr - d2i*wi;
			d2wi = d2r*wi + d2i*wr;
			data[j]    = d1r+d2wr;
			data[j+1]  = d1i+d2wi;
			data[j2  ] = d1r-d2wr;
			data[j2+1] = d1i-d2wi;
		    }
		}
	    }
	}
    }

    abstract class Setup {
	abstract String getName();
	abstract void select();
	abstract Setup createNext();
	void fudgeLevels() { }
	boolean allowLeftRight() { return false; }
	abstract void drawPotential();
	int getAuxBarCount() { return 2; }
	void getInfo(String s[], int offset) { }
	double getBaseEnergy() { return -1; }
    };

    class FiniteWellSetup extends Setup {
	String getName() { return "Finite Wells"; }
	void select() {
	    aux1Label.setText("Well Width");
	    aux1Bar.setValue(98);
	    aux2Label.setText("Well Depth");
	}
	int getWidth() {
	    return (potSampleCount-1)*aux1Bar.getValue()/100;
	}
	double getTop() {
	    return -1+(aux2Bar.getValue()-1)/49.5;
	}
	void drawPotential() {
	    int i;
	    int width = getWidth();
	    double top = getTop();
	    for (i = 0; i != width; i++)
		pot[i] = -1;
	    for (; i < potSampleCount; i++)
		pot[i] = top;
	}
	/*
	void getInfo(String s[], int o) {
	    s[o] = "Well width = " + getLengthText(potSampleCount-getOffset()*2);
	    s[o] += ", Well depth = " + getEnergyText(1-getFloor(), false);
	}
	*/
	Setup createNext() { return new FiniteWellPairSetup(); }
    }
    class FiniteWellPairSetup extends Setup {
	String getName() { return "Well Pairs"; }
	void select() {
	    aux1Label.setText("Well Width");
	    aux2Bar.setValue(80);
	    aux2Label.setText("Well Separation");
	    aux2Bar.setValue(100);
	    aux3Label.setText("Well Depth 1");
	    aux3Bar.setValue(100);
	    aux4Label.setText("Well Depth 2");
	    aux4Bar.setValue(90);
	}
	int getAuxBarCount() { return 4; }
	int getWidth() {
	    return (aux1Bar.getValue()*3/4)*(potSampleCount/2)/110+1;
	}
	void drawPotential() {
	    int i;
	    int width = getWidth();
	    // min sep = 1+width; max sep = potSampleCount/2
	    double sepFrac = aux2Bar.getValue()/100.;
	    int sep = (int) ((1+width)*(1-sepFrac) + (potSampleCount/2)*sepFrac);
	    double level1 = 1-aux3Bar.getValue()/50.;
	    double level2 = 1-aux4Bar.getValue()/50.;
	    double top = 1;
	    double space = level1 < level2 ? (level1+1) : (level2+1);
	    top -= space;
	    level1 -= space;
	    level2 -= space;
	    for (i = 0; i != potSampleCount; i++)
		pot[i] = top;
	    for (i = 0; i != width; i++) {
		pot[i] = level1;
		pot[i+sep] = level2;
	    }
	}
	/*void getInfo(String s[], int o) {
	    s[o] = "Well width = " + getLengthText(getWidth());
	    s[o] += ", Well depth = " + getEnergyText(1-getFloor(), false);
	    s[o+1] = "Well separation = " + getLengthText(getSep()*2);
	    }*/
	Setup createNext() { return new FiniteWellPairCoupledSetup(); }
    }
    class FiniteWellPairCoupledSetup extends Setup {
	String getName() { return "Coupled Well Pairs"; }
	void select() {
	    aux1Label.setText("Well Separation");
	    aux1Bar.setValue(1);
	    aux2Label.setText("Wall Potential");
	    aux2Bar.setValue(50);
	}
	int getWidth() { return potSampleCount/4; }
	double getWallEnergy() { return  -1+(aux2Bar.getValue()-1)/50.; }
	void drawPotential() {
	    int i;
	    int width = getWidth();
	    // min sep = 1+width; max sep = potSampleCount/2
	    double sepFrac = aux1Bar.getValue()/100.;
	    int sep = (int) ((1+width)*(1-sepFrac) + (potSampleCount/2)*sepFrac);
	    double floor = -1;
	    double infloor = -1+(aux2Bar.getValue()-1)/49.;
	    if (infloor > 1)
		infloor = 1;
	    for (i = 0; i != potSampleCount; i++)
		pot[i] = 1;
	    for (i = 0; i != width; i++)
		pot[i] = pot[i+sep] = -1;
	    for (i = width; i != sep; i++)
		pot[i] = infloor;
	}
	/*void getInfo(String s[], int o) {
	    s[o] = "Well width = " + getLengthText(getWidth());
	    s[o] += ", Well depth = " + getEnergyText(2, false);
	    s[o+1] = "Well separation = " + getLengthText(getSep()*2);
	    s[o+1] += ", Wall potential = " + getEnergyText(getWallEnergy(), true);
	    }*/
	Setup createNext() { return new HarmonicWellSetup(); }
    }
    class HarmonicWellSetup extends Setup {
	String getName() { return "Harmonic"; }
	void select() {
	    aux1Label.setText("Well Width");
	    aux2Label.setText("Well Depth");
	}
	int getAuxBarCount() { return 2; }
	double getFloor() { return 1-(aux2Bar.getValue())/50.; }
	double getTop() { return -1+(aux2Bar.getValue())/50.; }
	void drawPotential() {
	    int i;
	    double top = getTop();
	    int width = aux1Bar.getValue()*(potSampleCount-1)/100;
	    double a = (top+1)/((width/2)*(width/2.));
	    for (i = 0; i != width; i++) {
		double xx = (i-width/2.);
		pot[i] = -1+xx*xx*a;
		if (pot[i] > top)
		    pot[i] = top;
	    }
	    for (; i < potSampleCount; i++)
		pot[i] = top;
	}
	Setup createNext() { return new CoulombWellArraySetup(); }
    }
    class CoulombWellArraySetup extends Setup {
	String getName() { return "Coulomb-Like"; }
	void select() {
	    aux1Label.setText("Well Width");
	    aux1Bar.setValue(40);
	}
	int getAuxBarCount() { return 1; }
	void drawPotential() {
	    int i;
	    double s = (aux1Bar.getValue())/200.;
	    int width = potSampleCount;
	    s *= width/2;
	    double a = -2*width*s/(2*s-width);
	    double b = 1+2*a/width;
	    double add = 1-(b-2*a/(width/2.));
	    b += add;
	    for (i = 0; i != potSampleCount; i++) {
		double xx  = (i-width/2.);
		double xx2 = width-Math.abs(xx);
		pot[i] = b-a/Math.abs(xx)-a/xx2;
		if (pot[i] < -1)
		    pot[i] = -1;
	    }
	}
	Setup createNext() { return new FreeParticleSetup(); }
    }
    class FreeParticleSetup extends Setup {
	String getName() { return "Free Particle"; }
	void select() {}
	int getAuxBarCount() { return 0; }
	void drawPotential() {
	    int i;
	    for (i = 0; i != potSampleCount; i++)
		pot[i] = -1;
	}
	Setup createNext() { return new SinusoidalLatticeSetup(); }
    }
    class SinusoidalLatticeSetup extends Setup {
	String getName() { return "Sinusoidal"; }
	void select() {
	    aux1Label.setText("Well Depth");
	}
	int getAuxBarCount() { return 1; }
	void drawPotential() {
	    double amp = aux1Bar.getValue()/100.;
	    int buf = potSampleCount/10;
	    int i;
	    for (i = 0; i != potSampleCount; i++) {
		double xx = i*2*pi/potSampleCount;
		pot[i] = -1+amp*(1-Math.cos(xx));
	    }
	}
	Setup createNext() { return null; }
    }

    class View extends Rectangle {
	int mid_y, lower_y, handle;
	double ymult, ymult2, scale;
	int cellw2;
	void drawLabel(Graphics g, String str) {
	    g.setColor(Color.white);
	    centerString(g, str, y-5);
	}
    }
};
