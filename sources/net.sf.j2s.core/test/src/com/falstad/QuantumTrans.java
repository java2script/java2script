package com.falstad;
// QuantumTrans.java (C) 2005 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= 1-D Quantum Transitions
//web_Description= Radiative transitions (absorption and stimulated emission) in one dimension
//web_JavaVersion= http://www.falstad.com/qm1drad/
//web_AppletImage= quantumtrans.png
//web_Category= Physics - Quantum
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

class QuantumTransCanvas extends Canvas {
    QuantumTransFrame pg;
    QuantumTransCanvas(QuantumTransFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateQuantumTrans(g);
    }
    public void paintComponent(Graphics g) {
	super.paintComponent(g);
	pg.updateQuantumTrans(g);
    }
};

class QuantumTransLayout implements LayoutManager {
    public QuantumTransLayout() {}
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


public class QuantumTrans extends Applet implements ComponentListener {
    static QuantumTransFrame qf;
    void destroyFrame() {
	if (qf != null)
	    qf.dispose();
	qf = null;
	repaint();
    }
    boolean started = false;
    public void init() {
	addComponentListener(this);
    }

    public static void main(String args[]) {
        qf = new QuantumTransFrame(null);
        qf.init();
    }

    void showFrame() {
	if (qf == null) {
	    started = true;
	    qf = new QuantumTransFrame(this);
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

class QuantumTransFrame extends Frame
  implements ComponentListener, ActionListener,
             MouseMotionListener, MouseListener, ItemListener,
	     DecentScrollbarListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    Random random;
    int stateCount;
    static final int destStateCount = 8;
    int elevelCount;
    int maxStateCount = 300;
    int sampleCount = 64;
    int pSampleCount;
    double modes[][];
    static final double epsilon = 1e-8;
    static final double epsilon2 = .003;
    static final int panePad = 4;
    static final double baseEnergy = 1.01;
    
    public String getAppletInfo() {
	return "QuantumTrans by Paul Falstad";
    }

    Button blankButton;
    Button rescaleButton;
    Button stopButton;
    Button reverseButton;
    Checkbox stoppedCheck;
    CheckboxMenuItem xCheckItem;
    CheckboxMenuItem pCheckItem;
    CheckboxMenuItem parityCheckItem;
    CheckboxMenuItem currentCheckItem;
    CheckboxMenuItem expectCheckItem;
    CheckboxMenuItem uncertaintyCheckItem;
    JRadioButtonMenuItem probCheckItem;
    JRadioButtonMenuItem probPhaseCheckItem;
    JRadioButtonMenuItem reImCheckItem;
    JRadioButtonMenuItem magPhaseCheckItem;
    Menu waveFunctionMenu;
    MenuItem exitItem;
    Choice mouseChooser;
    Choice setupChooser;
    Vector setupList;
    Setup setup;
    DecentScrollbar forceBar, speedBar, strengthBar, stepBar, resBar;
    DecentScrollbar massBar, aux1Bar, aux2Bar, freqBar;
    Label aux1Label, aux2Label;
    View viewPotential, viewX, viewP, viewParity, viewStates,
	viewCurrent, viewDestStates;
    View viewList[];
    int viewCount;
    double coefr[], coefi[], newcoefr[], newcoefi[];
    double oldExpectX, current;
    double dipoleOp[][];
    double elevels[];
    double dispmax[];
    static final double pi = 3.14159265358979323846;
    double step;
    double func[];
    double funci[];
    double pdata[], pdatar[], pdatai[], currentData[], parityData[];
    double pot[];
    double freqMax, freq, freqPhase;
    int selectedCoef;
    int sourceState, destState;
    int selectedPaneHandle;
    double selectedPState;
    static final int SEL_NONE = 0;
    static final int SEL_POTENTIAL = 1;
    static final int SEL_X = 2;
    static final int SEL_P = 3;
    static final int SEL_STATES = 4;
    static final int SEL_DEST_STATES = 5;
    static final int SEL_HANDLE = 6;
    int selection;
    int dragX, dragY;
    int xpoints[], ypoints[];
    boolean dragging;
    boolean startup;
    boolean statesChanged, adjustingStates, adjustingWaveFunc;
    boolean setupModified;
    int pause;
    static final int phaseColorCount = 480;
    Color phaseColors[];
    Color purple;
    FFT fft;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    QuantumTransCanvas cv;
    QuantumTrans applet;

    QuantumTransFrame(QuantumTrans a) {
	super("1-d Quantum Transitions Applet v1.5a");
	applet = a;
    }

    boolean finished;
    
    public void init() {
	xpoints = new int[5];
	ypoints = new int[5];

	setupList = new Vector();
	Setup s = new InfiniteWellSetup();
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	}
	selectedCoef = -1;
	setLayout(new QuantumTransLayout());
	cv = new QuantumTransCanvas(this);
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
	m.add(xCheckItem = getCheckItem("Position"));
	xCheckItem.setState(true);
	m.add(pCheckItem = getCheckItem("Momentum"));
	m.add(parityCheckItem = getCheckItem("Parity"));
	m.add(currentCheckItem = getCheckItem("Probability Current"));
	m.addSeparator();
	m.add(expectCheckItem = getCheckItem("Expectation Values"));
	expectCheckItem.setState(true);
	m.add(uncertaintyCheckItem = getCheckItem("Uncertainties"));
	Menu m2 = waveFunctionMenu = new Menu("Wave Function");
	m.add(m2);
	m2.add(probCheckItem = getRadioItem("Probability"));
	m2.add(probPhaseCheckItem = getRadioItem("Probability + Phase"));
//	probPhaseCheckItem.setState(true);
	probPhaseCheckItem.setSelected(true);
	m2.add(reImCheckItem = getRadioItem("Real + Imaginary Parts"));
	m2.add(magPhaseCheckItem = getRadioItem("Magnitude + Phase"));
	setMenuBar(mb);

	setupChooser = new Choice();
	int i;
	for (i = 0; i != setupList.size(); i++)
	    setupChooser.add("Setup: " +
			     ((Setup) setupList.elementAt(i)).getName());
	setup = (Setup) setupList.elementAt(0);
	setupChooser.addItemListener(this);
	add(setupChooser);

	add(blankButton = new Button("Clear"));
	blankButton.addActionListener(this);
	add(rescaleButton = new Button("Rescale Graphs"));
	rescaleButton.addActionListener(this);
	add(stopButton = new Button("Stop Radiation"));
	stopButton.addActionListener(this);
	add(reverseButton = new Button("Reverse Phase"));
	reverseButton.addActionListener(this);
	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	add(stoppedCheck);
	
	add(new Label("Simulation Speed", Label.CENTER));
	add(speedBar = new DecentScrollbar(this, 57, 1, 300));

	stepBar = new DecentScrollbar(this, 40, 1, 300);

	add(new Label("Radiation Intensity", Label.CENTER));
	add(strengthBar = new DecentScrollbar(this, 130, 85, 200));

	add(new Label("Radiation Frequency", Label.CENTER));
	add(freqBar = new DecentScrollbar(this, 1, 1, 400));

	add(new Label("Resolution", Label.CENTER));
	add(resBar = new DecentScrollbar(this, 128,
					 sampleCount, maxStateCount));

	massBar = new DecentScrollbar(this, 16, 1, 100);

	add(aux1Label = new Label("Aux 1", Label.CENTER));
	add(aux1Bar = new DecentScrollbar(this, 50, 1, 100));

	add(aux2Label = new Label("Aux 2", Label.CENTER));
	add(aux2Bar = new DecentScrollbar(this, 50, 1, 100));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	
	coefr = new double[maxStateCount];
	coefi = new double[maxStateCount];
	newcoefr = new double[maxStateCount];
	newcoefi = new double[maxStateCount];
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
	purple = new Color(192, 60, 206);

	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
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
	int potsize = (viewPotential == null) ? 0 : viewPotential.height;
	int statesize = (viewStates == null) ? 25 : viewStates.height;
	viewX = viewP = viewParity = viewCurrent = null;
	viewList = new View[10];
	viewList[0] = viewPotential = new View();
	int i = 1;
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
	if (pCheckItem.getState())
	    viewList[i++] = viewP = new View();
	if (parityCheckItem.getState())
	    viewList[i++] = viewParity = new View();
	if (currentCheckItem.getState())
	    viewList[i++] = viewCurrent = new View();
	viewList[i++] = viewStates = new View();
	viewCount = i;
	int sizenum = viewCount;
	int toth = winSize.height;

	// preserve size of potential and state panes if possible
	if (potsize > 0) {
	    sizenum--;
	    toth -= potsize;
	}
	if (statesize > 0) {
	    sizenum--;
	    toth -= statesize*2 + stateBuffer;
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
	setGraphLines();
	dbimage = createImage(d.width, d.height);
    }
    
    void setGraphLines() {
	int i;
	for (i = 0; i != viewCount; i++) {
	    View v = viewList[i];
	    int h = v.height;
	    if (v == viewPotential)
		h -= 20;
	    v.mid_y = v.y + h/2;
	    v.ymult = .90*h/2;
	    if (v == viewPotential)
		v.ymult *= .9;
	    v.lower_y = (int) (v.mid_y+v.ymult);
	    v.ymult2 = v.ymult*2;
	}
	int h = winSize.height-viewStates.y;
	stateSize = (h-stateBuffer)/2;
	if (stateSize > winSize.width/8)
	    stateSize = winSize.width/8;
	viewDestStates = new View();
	viewDestStates.x = 0;
	viewDestStates.width = winSize.width;
	viewDestStates.y = viewStates.y + stateSize + stateBuffer;
	viewDestStates.height = stateSize;
	viewStates.height = stateSize;
    }

    void doBlank() {
	int x;
	for (x = 0; x != sampleCount; x++)
	    func[x] = funci[x] = 0;
	for (x = 0; x != stateCount; x++)
	    coefr[x] = coefi[x] = 0;
    }

    void normalize() {
	double norm = 0;
	int i;
	for (i = 0; i != stateCount; i++)
	    norm += coefr[i]*coefr[i] + coefi[i]*coefi[i];
	if (norm == 0)
	    return;
	double normmult = 1/java.lang.Math.sqrt(norm);
	for (i = 0; i != stateCount; i++) {
	    coefr[i] *= normmult;
	    coefi[i] *= normmult;
	}
    }

    void rescaleGraphs() {
	int i;
	for (i = 0; i != viewCount; i++)
	    viewList[i].scale = 0;
    }

    void transform() {
	int x, y;
	for (y = 0; y != stateCount; y++) {
	    double a = 0;
	    double b = 0;
	    for (x = 1; x != sampleCount; x++) {
		a += modes[y][x]*func[x];
		b += modes[y][x]*funci[x];
	    }
	    if (a < epsilon && a > -epsilon) a = 0;
	    if (b < epsilon && b > -epsilon) b = 0;
	    coefr[y] = a;
	    coefi[y] = b;
	}
    }

    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

    int writeString(Graphics g, String s, int x, int y) {
        g.drawString(s, x, y);
	FontMetrics fm = g.getFontMetrics();
	return fm.stringWidth(s);
    }

    int writeArrow(Graphics g, int x, int y, double v) {
	int h = 12;
	double vn = java.lang.Math.abs(v);
	if (vn > 1) {
	    if (vn > 2)
		vn = 2;
	    float c = (float) vn-1;
	    // need to use 0-1 version here, 0-255 version gets confused in js
	    g.setColor(new Color(c, 1f, c));
	} else {
	    int c = (int) (255*vn);
	    g.setColor(new Color(0f, c/255f, 0f));
	}
	if (v > 0)
	    drawArrow(g, x, y-h/2, x+h, y-h/2);
	else
	    drawArrow(g, x+h, y-h/2, x, y-h/2);
	return h;
    }

    void drawArrow(Graphics g, int x1, int y1, int x2, int y2) {
	g.drawLine(x1, y1, x2, y2);
	double l = java.lang.Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	int as = 5;
	if (l > as/2) {  // was as
	    double hatx = (x2-x1)/l;
	    double haty = (y2-y1)/l;
	    g.drawLine(x2, y2,
		       (int) (haty*as-hatx*as+x2),
		       (int) (-hatx*as-haty*as+y2));
	    g.drawLine(x2, y2,
		       (int) (-haty*as-hatx*as+x2),
		       (int) (hatx*as-haty*as+y2));
	}
    }

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    double t2 = 0;
    public void updateQuantumTrans(Graphics realg) {
	if (winSize == null || winSize.width == 0)
	    return;
	Graphics g = dbimage.getGraphics();
	boolean allQuiet = true;
	int tval = stepBar.getValue();
	double tadd = java.lang.Math.exp(tval/20.)*(.1/5);
	int sval = strengthBar.getValue();
	double strengthMul = java.lang.Math.exp(sval/20.)/(9*455e2);

	Color gray1 = new Color(76,  76,  76);
	Color gray2 = new Color(127, 127, 127);
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());
	int i;
	int ox = -1, oy = -1;

	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].paneY, winSize.width,
		       viewList[i].paneY);
	}

	if (statesChanged) {
	    cv.setCursor(Cursor.getPredefinedCursor(WAIT_CURSOR));
	    if (adjustingStates)
		genModes(false);
	    else {
		realg.setColor(cv.getBackground());
		FontMetrics fm = realg.getFontMetrics();
		String cs = "Calculating...";
		realg.fillRect(0, winSize.height-30,
			       20+fm.stringWidth(cs), 30);
		realg.setColor(Color.white);
		realg.drawString(cs, 10, winSize.height-10);
		genModes(true);
		transform();
	    }
	    cv.setCursor(null);
	    statesChanged = false;
	    if (startup) {
		coefr[0] = 1;
		startup = false;
		rescaleGraphs();
	    }
	}

	viewPotential.scale = 2/(elevels[destStateCount*3/2]+1);
	double ymult = viewPotential.ymult;
	int mid_y = (int) ((viewPotential.mid_y + ymult) -
			   ymult*viewPotential.scale);
	viewPotential.midy_adj = mid_y;
	g.setColor(gray2);
	ymult *= viewPotential.scale;
	g.drawLine(winSize.width/2, mid_y-(int) ymult,
		   winSize.width/2, mid_y+(int) ymult);

	ox = -1;
	int j;
	double norm = 0;
	if (!adjustingStates)
	    for (j = 0; j != stateCount; j++)
		norm += coefr[j]*coefr[j] + coefi[j]*coefi[j];
	double normmult2 = 1/norm;
	double normmult = java.lang.Math.sqrt(normmult2);
	if (norm == 0)
	    normmult = normmult2 = 0;
	
	g.setColor(Color.gray);
	for (i = 0; i != elevelCount; i++) {
	    if (i == stateCount)
		g.setColor(Color.darkGray);
	    double dy = elevels[i];
	    int y = mid_y - (int) (ymult * dy);
	    g.drawLine(0, y, winSize.width, y);
	}

	double fsin = java.lang.Math.sin(t2*freq);
	double mula = -strengthMul*fsin;

	g.setColor(Color.white);
	for (i = 0; i != sampleCount; i++) {
	    int x = winSize.width * i / sampleCount;
	    double dy = pot[i]+mula*(i/(double)sampleCount-.5);
	    int y = mid_y - (int) (ymult * dy);
	    if (y < 0)
		y = 0;
	    if (ox != -1)
		g.drawLine(ox, oy, x, y);
	    ox = x;
	    oy = y;
	}

	// calculate expectation value of E
	if (!adjustingStates && norm != 0 &&
	    (expectCheckItem.getState() || uncertaintyCheckItem.getState())) {
	    double expecte = 0;
	    double expecte2 = 0;
	    for (i = 0; i != stateCount; i++) {
		double prob = (coefr[i]*coefr[i]+coefi[i]*coefi[i])*normmult2;
		expecte += prob*elevels[i];
		expecte2 += prob*elevels[i]*elevels[i];
	    }
	    double uncert = java.lang.Math.sqrt(expecte2-expecte*expecte);
	    if (uncertaintyCheckItem.getState()) {
		g.setColor(Color.blue);
		int y = mid_y - (int) (ymult * (expecte+uncert));
		g.drawLine(0, y, winSize.width, y);
		y = mid_y - (int) (ymult * (expecte-uncert));
		if (expecte-uncert >= -1)
		    g.drawLine(0, y, winSize.width, y);
	    }
	    if (expectCheckItem.getState()) {
		int y = mid_y - (int) (ymult * expecte);
		g.setColor(Color.red);
		g.drawLine(0, y, winSize.width, y);
	    }
	}

	if (selectedCoef != -1 && !dragging) {
	    g.setColor(Color.yellow);
	    int y = mid_y - (int) (ymult * elevels[selectedCoef]);
	    g.drawLine(0, y, winSize.width, y);
	}

	ox = -1;

	int ty = viewPotential.y + viewPotential.height-5;
	int tx = 10;
	g.setColor(Color.white);
	tx += writeString(g, "Electric Field: ", tx, ty);
	tx += writeArrow(g, tx, ty, fsin*2);
	g.setColor(Color.white);
	tx += writeString(g, "    Current: ", tx, ty);
	tx += writeArrow(g, tx, ty, 1000*current/tadd);
	g.setColor(Color.white);

	g.setColor(Color.white);
	double maxf = 0;
	double expectx = 0;
	if (!adjustingStates && !adjustingWaveFunc) {
	    // calculate wave function
	    for (i = 0; i != sampleCount; i++) {
		int x = winSize.width * i / sampleCount;
		double dr = 0, di = 0;
		for (j = 0; j != stateCount; j++) {
		    dr += coefr[j]*modes[j][i];
		    di += coefi[j]*modes[j][i];
		}
		dr *= normmult;
		di *= normmult;
		func[i] = dr;
		funci[i] = di;
		double dy = dr*dr+di*di;
		expectx += dy*x;
		if (dy > maxf)
		    maxf = dy;
	    }
	} else {
	    for (i = 0; i != sampleCount; i++) {
		int x = winSize.width * i / sampleCount;
		double dr = func[i], di = funci[i];
		double dy = dr*dr+di*di;
		expectx += dy*x;
		if (dy > maxf)
		    maxf = dy;
	    }
	}

	if (viewX != null) {
	    // draw X representation
	    mid_y = viewX.mid_y;
	    ymult = viewX.ymult;

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
	    if (selectedPState != 0) {
		g.setColor(Color.yellow);
		ox = -1;
		int s2 = sampleCount*2;
		for (i = 0; i != s2; i++) {
		    int x = winSize.width * i / s2;
		    double dy = java.lang.Math.cos(selectedPState*
						   (i-sampleCount)*.5);
		    int y = mid_y - (int) (ymult * dy);
		    if (ox != -1)
			g.drawLine(ox, oy, x, y);
		    ox = x;
		    oy = y;
		}
	    }
	}

	if (viewP != null) {
	    // draw P representation
	    for (i = 0; i != pSampleCount*2; i++)
		pdata[i] = 0;
	    for (i = 0; i != sampleCount; i++) {
		int ii = (i <= sampleCount/2) ? (sampleCount/2-i)*2 :
		    (pSampleCount-(i-sampleCount/2))*2;
		pdata[ii]   = func[sampleCount-1-i];
		pdata[ii+1] = funci[sampleCount-1-i];
	    }
	    fft.transform(pdata, false);

	    double pnorm = 1/java.lang.Math.sqrt(pSampleCount);
	    for (i = 0; i != pSampleCount; i++) {
		int ii = (i <= pSampleCount/2) ? (pSampleCount/2-i)*2 : (pSampleCount-(i-pSampleCount/2))*2;
		pdatar[i] = pdata[ii]*pnorm;
		pdatai[i] = pdata[ii+1]*pnorm;
	    }

	    int offset = pSampleCount/4;
	    drawFunction(g, viewP, pdatar, pdatai, pSampleCount/2, offset);
	}

	if (viewParity != null) {
	    // draw parity graph
	    double pplus = 0, pminus = 0;
	    for (i = 0; i != sampleCount; i++) {
		double a1 = func[i];
		double a2 = funci[i];
		double b1 = func[sampleCount-1-i];
		double b2 = funci[sampleCount-1-i];
		double c1 = (a1+b1)*(a1+b1)+(a2+b2)*(a2+b2);
		double c2 = (a1-b1)*(a1-b1)+(a2-b2)*(a2-b2);
		pplus += c1;
		pminus += c2;
	    }
	    parityData[90] = java.lang.Math.sqrt(pplus)/2;
	    parityData[10] = java.lang.Math.sqrt(pminus)/2;
	    drawFunction(g, viewParity, parityData, null, 100, 0);
	}

	if (viewCurrent != null) {
	    // draw probability current
	    for (i = 0; i != sampleCount-1; i++) {
		double a1 = func[i+1]-func[i];
		double a2 = funci[i+1]-funci[i];
		currentData[i] = func[i]*a2 - funci[i]*a1;
	    }
	    drawFunction(g, viewCurrent, currentData, null, sampleCount, 0);
	}

	if (!adjustingStates) {
	    // draw state phasors
	    /*stateColSize = 20;
	    for (i = 19; i >= 8; i--) {
		int ss = winSize.width/i;
		int h = ss*((stateCount+i-1)/i);
		if (h <= viewStates.height-buffer)
		    stateColSize = i;
		    }*/
	    //stateSize = winSize.width/stateColSize;
	    int ss2 = stateSize/2;
	    stateColSize = 100;

	    int yel = (selectedCoef >= 0 && selection == SEL_STATES) ?
		selectedCoef : -1;
	    for (i = 0; i != stateCount; i++) {
		int x = stateSize*(i % stateColSize)+ss2;
		int y = stateSize*(i / stateColSize)+ss2 + viewStates.y;
		g.setColor(i == yel ? Color.yellow :
			   i == sourceState ? purple :
			   (coefr[i] == 0 && coefi[i] == 0) ? gray2 :
			   Color.white);
		g.drawOval(x-ss2, y-ss2, stateSize, stateSize);
		int xa = (int) (coefr[i]*ss2);
		int ya = (int) (-coefi[i]*ss2);
		g.drawLine(x, y, x+xa, y+ya);
		g.drawLine(x+xa-1, y+ya, x+xa+1, y+ya);
		g.drawLine(x+xa, y+ya-1, x+xa, y+ya+1);
	    }

	    for (i = 0; i != destStateCount; i++) {
		int x = stateSize*(i % stateColSize)+ss2;
		int y = stateSize*(i / stateColSize)+ss2 + viewDestStates.y;
		int c = (sourceState < 0) ? 0 : (int)
		    (6+java.lang.Math.log(
		       java.lang.Math.abs(dipoleOp[sourceState][i])))*64;
		if (c > 255)
		    c = 255;
		if (c < 0)
		    c = 0;
		g.setColor(new Color(0, 0, c));
		g.fillOval(x-ss2, y-ss2, stateSize, stateSize);
		g.setColor(i == destState ? purple : gray2);
		g.drawOval(x-ss2, y-ss2, stateSize, stateSize);
	    }

	    if (selection == SEL_DEST_STATES && selectedCoef >= 0 &&
		sourceState >= 0) {
		int x1 = stateSize*(sourceState % stateColSize)+ss2;
		int y1 = stateSize*(sourceState / stateColSize)+ss2 +
		    viewStates.y;
		int x2 = stateSize*(selectedCoef % stateColSize)+ss2;
		int y2 = stateSize*(selectedCoef / stateColSize)+ss2 +
		    viewDestStates.y;
		g.setColor(Color.yellow);
		drawArrow(g, x1, y1, x2, y2);
	    }
	}

	int iters = speedBar.getValue();
	if (stoppedCheck.getState() || dragging || adjustingStates)
	    iters = 0;
	else
	    allQuiet = false;
	// iteration
	while (iters-- > 0) {
	    double mul = strengthMul * java.lang.Math.sin(t2*freq) * tadd;
	    freqPhase = (t2*freq) % (2*pi);
	    for (j = 0; j != stateCount; j++) {
		double a = coefr[j];
		double b = coefi[j];
		int k;
		for (k = 0; k != stateCount; k++) {
		    a -= mul*dipoleOp[j][k]*coefi[k];
		    b += mul*dipoleOp[j][k]*coefr[k];
		}
		double ang = -(elevels[j]+baseEnergy)*tadd;
		double angr = java.lang.Math.cos(ang);
		double angi = java.lang.Math.sin(ang);
		newcoefr[j] = a*angr - b*angi;
		newcoefi[j] = b*angr + a*angi;
		if (a*a+b*b < 1e-12)
		    newcoefr[j] = newcoefi[j] = 0;
	    }
	    for (j = 0; j != stateCount; j++) {
		coefr[j] = newcoefr[j];
		coefi[j] = newcoefi[j];
	    }
	    t2 += tadd;
	    if (iters < 2) {
		expectx = 0;
		for (i = 0; i != sampleCount; i++) {
		    double x = i/(sampleCount-1.) - .5;
		    double dr = 0, di = 0;
		    for (j = 0; j != stateCount; j++) {
			dr += coefr[j]*modes[j][i];
			di += coefi[j]*modes[j][i];
		    }
		    func[i] = dr;
		    funci[i] = di;
		    double dy = dr*dr+di*di;
		    expectx += dy*x;
		}
		current = expectx - oldExpectX;
		oldExpectX = expectx;
	    }
	}
	normalize();
	if (sourceState >= 0 && destState >= 0) {
	    double a1 = coefr[sourceState]*coefr[sourceState] + 
		coefi[sourceState]*coefi[sourceState];
	    double a2 = coefr[destState]*coefr[destState] + 
		coefi[destState]*coefi[destState];
	    if (a2 > a1) {
		int s = sourceState;
		sourceState = destState;
		destState = s;
	    }
	}

	realg.drawImage(dbimage, 0, 0, this);
	if (!stoppedCheck.getState() && !allQuiet)
	    cv.repaint(pause);
    }

    int stateColSize, stateSize = 15;
    static final int stateBuffer = 5;

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
	if (!adjustingWaveFunc) {
	    // adjust scale
	    view.scale *= 1.001;
	    if (view.scale > bestscale || view.scale == 0)
		view.scale = bestscale;
	    if (view.scale > 1e8)
		view.scale = 1e8;
	}
	g.setColor(Color.gray);

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
		    dy = java.lang.Math.sqrt(fr[ii]*fr[ii]+fi[ii]*fi[ii]);
		if (!probCheckItem.isSelected()) {
		    double ang = java.lang.Math.atan2(fi[ii], fr[ii]);
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
	    int mid_y = view.mid_y;
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

    void edit(MouseEvent e) {
	if (selection == SEL_NONE)
	    return;
	int x = e.getX();
	int y = e.getY();
	switch (selection) {
	case SEL_HANDLE: editHandle(y);   break;
	case SEL_STATES: editMag(x, y);   break;
	case SEL_DEST_STATES: editDest(x, y);   break;
	default:         editFunc(x, y);  break;
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
	setGraphLines();
	cv.repaint(pause);
    }

    void editDest(int x, int y) {
	if (selectedCoef == -1)
	    return;
	int j;
	double mx = 0;
	for (j = 0; j != stateCount; j++) {
	    double xx = coefr[j]*coefr[j] + coefi[j]*coefi[j];
	    if (xx > mx) {
		mx = xx;
		sourceState = j;
	    }
	}
	destState = selectedCoef;
	setSourceDest();
    }

    void setSourceDest() {
	if (destState >= 0 && sourceState < 0)
	    sourceState = 0;
	freq = elevels[destState]-elevels[sourceState];
	freqBar.setValue((int) (freq*400/freqMax));
    }

    void editMag(int x, int y) {
	if (selectedCoef == -1)
	    return;
	int ss2 = stateSize/2;
	int x0 = stateSize*(selectedCoef % stateColSize)+ss2;
	int y0 = stateSize*(selectedCoef / stateColSize)+ss2 + viewStates.y;
	x -= x0;
	y -= y0;
	double mag = java.lang.Math.sqrt(x*x+y*y)/ss2;
	if (mag > 10)
	    x = y = 0;
	coefr[selectedCoef] = x/(double) ss2;
	coefi[selectedCoef] = -y/(double) ss2;
	if (mag > 1) {
	    coefr[selectedCoef] /= mag;
	    coefi[selectedCoef] /= mag;
	}
	cv.repaint(pause);
    }

    void editFunc(int x, int y) {
	if (selection == SEL_POTENTIAL) {
	    findStateByEnergy(y);
	    enterSelectedState();
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

    void destroyFrame() {
        if (applet == null)
            dispose();
        else
            applet.destroyFrame();
    }
    

    public void actionPerformed(ActionEvent e) {
	if (e.getSource() == exitItem) {
	    destroyFrame();
	    return;
	}
	if (e.getSource() == blankButton) {
	    doBlank();
	    cv.repaint();
	}
	if (e.getSource() == stopButton) {
	    freq = 0;
	    sourceState = destState = -1;
	}
	if (e.getSource() == reverseButton && freq != 0) {
	    //freqPhase = 3*pi - freqPhase;
	    freqPhase += pi;
	    t2 = freqPhase/freq;
	}
    }

    public void scrollbarValueChanged(DecentScrollbar ds) {
	System.out.print(ds.getValue() + "\n");
	if (ds == massBar) {
	    statesChanged = adjustingStates = true;
	    cv.repaint(pause);
	}
	if (ds == aux1Bar || ds == aux2Bar) {
	    adjustingStates = true;
	    setup.drawPotential();
	    statesChanged = true;
	    cv.repaint(pause);
	}
	if (ds == resBar)
	    adjustingStates = true;
	if (ds == freqBar) {
	    freq = ds.getValue()*freqMax/400.;
	    sourceState = destState = -1;
	    t2 = freqPhase/freq;
	}
    }

    public void scrollbarFinished(DecentScrollbar ds) {
	if (ds == resBar) {
	    adjustingStates = false;
	    setResolution();
	    reinit();
	    cv.repaint(pause);
	}
	if (ds == massBar || ds == aux1Bar || ds == aux2Bar) {
	    adjustingStates = false;
	    statesChanged = true;
	    cv.repaint(pause);
	}
    }

    public boolean handleEvent(Event ev) {
	if (ev.id == Event.WINDOW_DESTROY) {
	    applet.destroyFrame();
	    return true;
	}
	return super.handleEvent(ev);
    }

    void setResolution() {
	sampleCount = resBar.getValue();
	sampleCount++;
	func = new double[sampleCount];
	funci = new double[sampleCount];
	pot = new double[sampleCount];
	statesChanged = true;
	int ps = 8*sampleCount;
	pSampleCount = 1;
	while (pSampleCount < ps)
	    pSampleCount *= 2;
	pdata = new double[pSampleCount*2];
	pdatar = new double[pSampleCount];
	pdatai = new double[pSampleCount];
	parityData = new double[100];
	currentData = new double[sampleCount];
	fft = new FFT(pSampleCount);
    }

    void genModes(boolean getStates) {
	statesChanged = false;
	int n = sampleCount;
	double d[] = new double[n+1];
	double e[] = new double[n+1];
	double z[][] = new double[n+1][n+1];
	int i, j;
	double m1 = 1/(massBar.getValue()*.02);
	double maxpot = -20;

	// express schroedinger's equation as a matrix equation
	// using finite differencing
	for (i = 1; i <= n; i++) {
	    if (i < n)
		e[i] = -m1;
	    d[i] = 2*m1+pot[i-1];
	    if (pot[i-1] > maxpot)
		maxpot = pot[i-1];
	    for (j = 1; j <= n; j++)
		z[i][j] = 0;
	    z[i][i] = 1;
	}
	imtql2(n, d, e, getStates ? z : null);
	//System.out.print("done with tqli\n");

	elevels = new double[n];
	elevelCount = n;

	// now get the eigenvalues and sort them
	for (i = 0; i != n; i++) {
	    //System.out.print("d " + i + " " + d[i+1] + "\n");
	    /*if (i < n-1 && d[i] == d[i+1])
	      System.out.print("degeneracy! " + i + "\n");*/
	    elevels[i] = d[i+1];
	}

	int si, sj;
	// sort the elevels
	for (si = 1; si < n; si++) {
	    double v = elevels[si];
	    sj = si;
	    while (elevels[sj-1] > v) {
		elevels[sj] = elevels[sj-1]; sj--;
		if (sj <= 0) break;
	    }
	    elevels[sj] = v;
	}
	
	while (maxpot > 0 && elevels[elevelCount-1] > maxpot)
	    elevelCount--;

	stateCount = elevelCount;
	int maxs = 20;
	if (stateCount > maxs && getStates)
	    stateCount = maxs;

	if (!getStates)
	    return;

	// get the eigenstates
	modes = new double[stateCount][sampleCount];
	for (i = 0; i != stateCount; i++) {
	    for (j = 0; j != n; j++)
		if (elevels[i] == d[j+1])
		    break;
	    if (j == n) {
		System.out.print("can't find elevels! " + i + " " + elevels[i] + "\n");
		continue;
	    }
	    d[j+1] = -1;
	    int k;

	    dispmax[i] = 0;
	    for (k = 0; k != n; k++) {
		modes[i][k] = z[k+1][j+1];
		if (modes[i][k] > dispmax[i])
		    dispmax[i] = modes[i][k];
		else if (-modes[i][k] > dispmax[i])
		    dispmax[i] = -modes[i][k];
	    }
	}

	dipoleOp = new double[stateCount][stateCount];
	int k;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++) {
		double dd = 0;
		int mk = 0;
		double mkx = 0;
		for (k = 0; k != sampleCount; k++) {
		    double x = k/(sampleCount-1.) - .5;
		    dd += modes[i][k]*modes[j][k]*x;
		    if (-modes[i][k] > mkx) {
			mkx = -modes[i][k];
			mk = k;
		    }
		}
		dipoleOp[i][j] = dd;
		//if (i < 8 && j < 8)
		//   System.out.print(i + " " + j + " " + dd+ "\n");
	    }
	freqMax = elevels[destStateCount-1] - elevels[0];
	//System.out.print(freqMax + "\n");

	// The energy levels calculated above for a harmonic oscillator are
	// not evenly spaced because of numerical error, so we force
	// them to be evenly spaced in order to get coherent states to work
	if (!setupModified)
	    setup.fudgeLevels();

	sourceState = 0;
	destState = 1;
	setSourceDest();
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
    }
    public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int oldCoef = selectedCoef;
	int oldSelection = selection;
	selectedCoef = -1;
	selectedPState = 0;
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
	Cursor cs = null;
	if (selection == SEL_HANDLE)
	    cs = Cursor.getPredefinedCursor(N_RESIZE_CURSOR);
	else if (viewPotential.contains(x, y)) {
	    selection = SEL_POTENTIAL;
	    findStateByEnergy(y);
	} else if (viewStates.contains(x, y)) {
	    int xi = x/stateSize;
	    int yi = (y-viewStates.y)/stateSize;
	    selectedCoef = xi+yi*stateColSize;
	    if (selectedCoef >= destStateCount)
		selectedCoef = -1;
	    if (selectedCoef != -1)
		selection = SEL_STATES;
	} else if (viewDestStates.contains(x, y)) {
	    int xi = x/stateSize;
	    int yi = (y-viewDestStates.y)/stateSize;
	    selectedCoef = xi+yi*stateColSize;
	    if (selectedCoef >= destStateCount)
		selectedCoef = -1;
	    if (selectedCoef != -1)
		selection = SEL_DEST_STATES;
	}
	cv.setCursor(cs);
	if (selection != oldSelection || selectedCoef != oldCoef)
	    cv.repaint(pause);
    }

    void findStateByEnergy(int y) {
	int i;
	double dy = (viewPotential.midy_adj-y)/(viewPotential.ymult*
						viewPotential.scale);
	double dist = 100;
	for (i = 0; i != stateCount; i++) {
	    double d = java.lang.Math.abs(elevels[i]-dy);
	    if (d < dist) {
		dist = d;
		selectedCoef = i;
	    }
	}
    }

    public void mouseClicked(MouseEvent e) {
	if (e.getClickCount() == 2 && selectedCoef != -1)
	    enterSelectedState();
    }

    void enterSelectedState() {
	int i;
	for (i = 0; i != stateCount; i++)
	    if (selectedCoef != i)
		coefr[i] = coefi[i] = 0;
	coefr[selectedCoef] = 1;
	coefi[selectedCoef] = 0;
	cv.repaint(pause);
	rescaleGraphs();
	destState = -1;
	sourceState = selectedCoef;
	freq = 0;
    }

    public void mouseEntered(MouseEvent e) {
    }
    public void mouseExited(MouseEvent e) {
	if (!dragging) {
	    if (selectedCoef != -1) {
		selectedCoef = -1;
		cv.repaint(pause);
	    }
	    if (selectedPState != 0) {
		selectedPState = 0;
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
	dragging = adjustingWaveFunc = false;
	cv.repaint(pause);
    }
    public void itemStateChanged(ItemEvent e) {
	if (!finished)
	    return;
	if (e.getItemSelectable() == stoppedCheck) {
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() == setupChooser)
	    doSetup();
	if (e.getItemSelectable() == xCheckItem ||
	    e.getItemSelectable() == pCheckItem ||
	    e.getItemSelectable() == parityCheckItem ||
	    e.getItemSelectable() == currentCheckItem) {
	    handleResize();
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
		rescaleGraphs();
	    }
    }

    void doSetup() {
	doBlank();
	int i;
	for (i = 0; i != sampleCount; i++)
	    func[i] = funci[i] = pot[i] = 0;
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	aux1Bar.setValue(100);
	aux2Bar.setValue(100);
	setup.select();
	setup.drawPotential();
	setupModified = false;
	statesChanged = true;
	aux2Label.hide();
	aux2Bar.hide();
	aux1Label.hide();
	aux1Bar.hide();
	validate();
	startup = true;
    }

    // imtql2, from EISPACK
    //     On INPUT
    //
    //        N is the order of the matrix.
    //
    //        D contains the diagonal elements of the input matrix.
    //
    //        E contains the subdiagonal elements of the input matrix
    //          in its first N-1 positions.
    //
    //        Z contains the transformation matrix produced in the
    //          reduction by  TRED2, if performed.  If the eigenvectors
    //          of the tridiagonal matrix are desired, Z must contain
    //          the identity matrix.
    //
    //      On OUTPUT
    //
    //        D contains the eigenvalues.
    //
    //        E has been destroyed.
    //
    //        Z contains orthonormal eigenvectors of the symmetric
    //          tridiagonal (or full) matrix.  If an error exit is made,
    //          Z contains the eigenvectors associated with the stored
    //          eigenvalues.
    //
    void imtql2(int n, double d[], double e[], double z[][]) {
	int i, j, k, L, m, ii, nm, mml;
	int n2 = n*n;
	double b, c, f, g, p, r, s, s1, s2;

	if (n == 1)
	    return;

	// DO 100 I = 2, N 100 E(I-1) = E(I)
	// done in caller rtn
	
	for (L = 0; L != n; L++) {
	    j = 0;

	    while (true) {
		// .......... LOOK FOR SMALL SUB-DIAGONAL ELEMENT ..........
		for (m = L; m < n-1; m++) {
		    s1 = Math.abs(d[m]) + Math.abs(d[m+1]);
		    s2 = s1 + Math.abs(e[m]);
		    if (s2 == s1)
			break;
		}
		
		if (m == L)
		    break;
		p = d[L];
		if (j++ == 30) {
		    System.out.println("Too many iterations in imtql2");
		    break;
		}
		
		// .......... FORM SHIFT ..........
		g = (d[L+1]-p) / (2*e[L]);
		r = Math.sqrt(g*g+1);
		g = d[m] - p + e[L]/(g+((g > 0) ? Math.abs(r) : -Math.abs(r)));
		s = 1;
		c = 1;
		p = 0;
		for (i = m-1; i >= L; i--) {
		    f = s*e[i];
		    b = c*e[i];
		    if (Math.abs(f) >= Math.abs(g)) {
			c = g/f;
			r = Math.sqrt(c*c+1);
			e[i+1] = f*r;
			s = 1/r;
			c *= s;
		    } else {
			s = f/g;
			r = Math.sqrt(s*s+1);
			e[i+1] = g*r;
			c = 1/r;
			s *= c;
		    }
		    g = d[i+1] - p;
		    r = (d[i] - g)*s + 2*c*b;
		    p = s*r;
		    d[i+1] = g+p;
		    g = c*r-b;
		    
		    // .......... FORM VECTOR ..........
		    if (z != null) {
			for (k = 0; k < n; k++) {
			    f = z[k][i+1];
			    z[k][i+1] = s*z[k][i] + c*f;
			    z[k][i]   = c*z[k][i] - s*f;
			}
		    }
		}
		
		d[L] -= p;
		e[L] = g;
		e[m] = 0;
	    }
	}
	
	// .......... ORDER EIGENVALUES AND EIGENVECTORS ..........
	// we do this in calling rtn
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
	abstract void drawPotential();
	int getAuxBarCount() { return 0; }
    };

    class InfiniteWellSetup extends Setup {
	String getName() { return "Infinite Well"; }
	void select() { }
	void drawPotential() {
	    int i;
	    int width = 1;
	    for (i = 0; i != sampleCount; i++)
		pot[i] = 50;
	    for (i = width; i <= sampleCount-1-width; i++)
		pot[i] = -1;
	}
	void fudgeLevels() {
	    // change levels to exact values so that states are periodic
	    int i;
	    for (i = 1; i != stateCount; i++)
		elevels[i] = (elevels[0]+1)*(i+1)*(i+1)-1;
	}
	Setup createNext() { return new FiniteWellPairCoupledSetup(); }
    }
    class FiniteWellPairCoupledSetup extends Setup {
	String getName() { return "Coupled Well Pair"; }
	void select() { }
	void drawPotential() {
	    int i;
	    int width = sampleCount/4;
	    int sep = 1*(width-1)/101+1;
	    double floor = -1;
	    double infloor = 0;
	    for (i = 0; i != sampleCount; i++)
		pot[i] = 50;
	    for (i = 0; i != width; i++)
		pot[sampleCount/2-i-sep] = pot[sampleCount/2+i+sep] = floor;
	    for (i = 0; i < sep; i++)
		pot[sampleCount/2-i] = pot[sampleCount/2+i] = infloor;
	}
	Setup createNext() { return new HarmonicOscillatorSetup(); }
    }
    class HarmonicOscillatorSetup extends Setup {
	String getName() { return "Harmonic Oscillator"; }
	void select() { }
	void drawPotential() {
	    int i;
	    double width = (75)*(sampleCount/2)/110.;
	    int offset = 0;
	    width *= 2;
	    double a = 2/(width*width);
	    for (i = 0; i != sampleCount; i++) {
		int ii = offset+i-sampleCount/2;
		pot[i] = a*ii*ii-1;
	    }
	    pot[0] = pot[sampleCount-1] = 50;
	}
	void fudgeLevels() {
	    int i;
	    if (stateCount < 10)
		return;
	    double avg = 0;
	    for (i = 0; i != 10; i++)
		avg += elevels[i+1]-elevels[i];
	    avg /= 10;
	    for (i = 1; i != stateCount; i++) {
		// if the levels are way off then leave them alone.  this
		// can happen if the offset is too far to the left, for
		// example.
		if ((elevels[i]-elevels[i-1])/avg > 2)
		    break;
		elevels[i] = elevels[i-1]+avg;
	    }
	}
	Setup createNext() { return null; }
    }

    class View extends Rectangle {
	int mid_y, lower_y, midy_adj, paneY;
	double ymult, ymult2, scale;
    }
};

