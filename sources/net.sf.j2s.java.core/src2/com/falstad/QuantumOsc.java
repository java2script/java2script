package com.falstad;

//QuantumOsc.java (C) 2003 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= QuantumOsc
//web_Description= A quantum mechanics simulation that shows the behavior of a particle in a two dimensional harmonic oscillator.
//web_JavaVersion= http://www.falstad.com/qm2dosc/
//web_AppletImage= quantumosc.png
//web_Category= Physics - Quantum
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, AWT-to-Swing

import java.applet.Applet;

import com.falstad.Complex;

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
import java.text.NumberFormat;
import java.util.Random;
import java.util.Vector;

import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.CheckboxMenuItem;
import java.awt.Choice;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Menu;
import java.awt.MenuBar;
import java.awt.MenuItem;
import java.awt.Scrollbar;

import javax.swing.ButtonGroup;
import javax.swing.JRadioButtonMenuItem;

class QuantumOscCanvas extends Canvas {
 QuantumOscFrame pg;
 QuantumOscCanvas(QuantumOscFrame p) {
	pg = p;
 }
 public Dimension getPreferredSize() {
	return new Dimension(300,400);
 }
 public void update(Graphics g) {
	pg.updateQuantumOsc(g);
 }
 public void paint(Graphics g) {
	pg.updateQuantumOsc(g);
 }
};

class QuantumOscLayout implements LayoutManager {
 public QuantumOscLayout() {}
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

public class QuantumOsc extends Applet {
 static QuantumOscFrame mf;
 public static void main(String args[]) {
     mf = new QuantumOscFrame(null);
     mf.init();
 }

 void destroyFrame() {
	if (mf != null)
	    mf.dispose();
	mf = null;
 }
 public void init() {
	mf = new QuantumOscFrame(this);
	mf.init();
 }
 public void destroy() {
	if (mf != null)
	    mf.dispose();
	mf = null;
 }
};

class QuantumOscFrame extends Frame
implements ComponentListener, ActionListener, AdjustmentListener,
          MouseMotionListener, MouseListener, ItemListener {
 
 Dimension winSize;
 Image dbimage;
 
 Random random;
 int sampleCount;
 static final int stateCount = 14;
 static final int maxDispTerms = 10;
 static final double epsilon = .01;
 static final int panePad = 4;
 
 public String getAppletInfo() {
	return "QuantumOsc by Paul Falstad";
 }

 Button groundButton;
 Button blankButton;
 Button normalizeButton;
 Button maximizeButton;
 Checkbox stoppedCheck;
 CheckboxMenuItem eCheckItem;
 CheckboxMenuItem xCheckItem;
 CheckboxMenuItem pCheckItem;
 CheckboxMenuItem lCheckItem;
 CheckboxMenuItem statesCheckItem;
 CheckboxMenuItem lStatesCheckItem;
 CheckboxMenuItem expectCheckItem;
 CheckboxMenuItem uncertaintyCheckItem;
 JRadioButtonMenuItem probCheckItem;
 JRadioButtonMenuItem probPhaseCheckItem;
 JRadioButtonMenuItem magPhaseCheckItem;
 CheckboxMenuItem alwaysNormItem;
 CheckboxMenuItem alwaysMaxItem;
 Menu waveFunctionMenu;
 MenuItem measureEItem;
 MenuItem measureLItem;
 MenuItem exitItem;

 Choice mouseChooser;
 Scrollbar speedBar;
 Scrollbar forceBar;
 Scrollbar resBar;
 Scrollbar aspectBar;
 Scrollbar brightnessBar;
 View viewPotential, viewX, viewP, viewL, viewStates, viewLStates,
	viewCurrent, viewXMap, viewPMap, viewStatesMap, viewLStatesMap;
 View viewList[];
 int viewCount;
 boolean changingDerivedStates;
 boolean dragStop;
 double aspectRatio = 1;
 double hermite[][];
 double data[];
 BasisState states[][];
 DerivedState lzStates[];
 int lzStateCount;
 State selectedState;
 Phasor selectedPhasor;
 static final double pi = 3.14159265358979323846;
 double lzspectrum[];
 double step;
 double func[][];
 double funci[][];
 double translateFunc[][];
 double translateFunci[][];
 double pfuncr[][], pfunci[][];
 PhaseColor phaseColors[][];
 PhaseColor whitePhaseColor;
 Color grayLevels[];
 static final int phaseColorCount = 50;
 int xpoints[];
 int ypoints[];
 int floorValues[];
 int selectedGridX, selectedGridY;
 int selectedPaneHandle;
 double selectedGridFunc;
 static final int SEL_NONE = 0;
 static final int SEL_POTENTIAL = 1;
 static final int SEL_X = 2;
 static final int SEL_P = 3;
 static final int SEL_STATES = 4;
 static final int SEL_HANDLE = 5;
 static final int MOUSE_GAUSS = 0;
 static final int MOUSE_GAUSSP = 1;
 static final int MOUSE_ROTATE = 2;
 static final int MOUSE_TRANSLATE = 3;
 static final int MOUSE_SCALE = 4;
 int selection;
 int dragX, dragY;
 int dragStartX, dragStartY;
 boolean dragSet, dragClear;
 double magDragStart;
 boolean dragging;
 double t;
 double alpha;
 int pause;

 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 QuantumOscCanvas cv;
 QuantumOsc applet;

 QuantumOscFrame(QuantumOsc a) {
	super("Quantum 2-D Oscillator Applet v1.2a");
	applet = a;
 }

 public void init() {
	String os = System.getProperty("os.name");
	String jv = System.getProperty("java.version");
	boolean altRender = false;
	if (os.indexOf("Windows") == 0) {
	    if (jv.indexOf("1.1") == 0)
		altRender = true;
	}

	setLayout(new QuantumOscLayout());
	cv = new QuantumOscCanvas(this);
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
	m.add(pCheckItem = getCheckItem("Linear Momentum"));
	m.add(lCheckItem = getCheckItem("Angular Momentum"));
	m.add(statesCheckItem = getCheckItem("Rectangular States"));
	statesCheckItem.setState(true);
	m.add(lStatesCheckItem = getCheckItem("Angular States"));
	m.addSeparator();
	m.add(expectCheckItem = getCheckItem("Expectation Values"));
	expectCheckItem.setState(true);
	m.add(uncertaintyCheckItem = getCheckItem("Uncertainties"));
	Menu m2 = waveFunctionMenu = new Menu("Wave Function");
	m.add(m2);
	m2.add(probCheckItem = getRadioItem("Probability"));
	m2.add(probPhaseCheckItem = getRadioItem("Probability + Phase"));
	m2.add(magPhaseCheckItem = getRadioItem("Magnitude + Phase"));
	magPhaseCheckItem.setSelected(true);

	m = new Menu("Measure");
	mb.add(m);
	m.add(measureEItem = getMenuItem("Measure Energy"));
	m.add(measureLItem = getMenuItem("Measure Angular Momentum"));

	m = new Menu("Options");
	mb.add(m);
	m.add(alwaysNormItem = getCheckItem("Always Normalize"));
	m.add(alwaysMaxItem = getCheckItem("Always Maximize"));
	alwaysMaxItem.setState(true);
	setMenuBar(mb);

	mouseChooser = new Choice();
	mouseChooser.add("Mouse = Create Gaussian");
	mouseChooser.add("Mouse = Gaussian w/ Momentum");
	mouseChooser.add("Mouse = Rotate Function");
	mouseChooser.add("Mouse = Translate Function");
	mouseChooser.add("Mouse = Scale Function");
	mouseChooser.addItemListener(this);
	add(mouseChooser);

	add(blankButton = new Button("Clear"));
	blankButton.addActionListener(this);
	add(normalizeButton = new Button("Normalize"));
	normalizeButton.addActionListener(this);
	add(maximizeButton = new Button("Maximize"));
	maximizeButton.addActionListener(this);
	add(groundButton = new Button("Ground State"));
	groundButton.addActionListener(this);

	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	add(stoppedCheck);

	add(new Label("Simulation Speed", Label.CENTER));
	add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 138, 1, 1, 300));
	speedBar.addAdjustmentListener(this);

	add(new Label("Brightness", Label.CENTER));
	add(brightnessBar =
	    new Scrollbar(Scrollbar.HORIZONTAL, 1100, 1, 700, 2000));
	brightnessBar.addAdjustmentListener(this);

	add(new Label("Resolution", Label.CENTER));
	add(resBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    6, 1, 5, 9));
	resBar.addAdjustmentListener(this);
	resBar.setBlockIncrement(1);

	add(new Label("Aspect Ratio", Label.CENTER));
	add(aspectBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    10, 1, 5, 31));
	aspectBar.addAdjustmentListener(this);

	setLoadCount();

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	
	int i, j;
	phaseColors = new PhaseColor[8][phaseColorCount+1];
	for (i = 0; i != 8; i++)
	    for (j = 0; j <= phaseColorCount; j++) {
		double ang = Math.atan(j/(double) phaseColorCount);
		phaseColors[i][j] = genPhaseColor(i, ang);
	    }
	whitePhaseColor = new PhaseColor(1, 1, 1);
	grayLevels = new Color[256];
	for (i = 0; i != 256; i++)
	    grayLevels[i] = new Color(i, i, i);
	
	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);

	resize(800, 700);
	show();
	handleResize();
	validate();
	
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

 void reinit() {
	momentumX = 0;
	momentumY = .490873;
	selectedGridX = sampleCount*22/32;
	selectedGridY = sampleCount/2;
	drawXGaussP();
 }
 
 void handleResize() {
     Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	dbimage = createImage(d.width, d.height);
	setupDisplay();
 }

 void setupDisplay() {
	if (winSize == null)
	    return;
	int potsize = (viewPotential == null) ? 50 : viewPotential.height;
	int statesize = (viewStates == null) ? 150 : viewStates.height;
	viewX = viewPotential =
	    viewP = viewL = viewStates = viewLStates = null;
	viewList = new View[10];
	int i = 0;
	if (eCheckItem.getState())
	    viewList[i++] = viewPotential = new View();
	if (xCheckItem.getState())
	    viewList[i++] = viewX = new View();
	if (pCheckItem.getState())
	    viewList[i++] = viewP = new View();
	if (lCheckItem.getState() && aspectRatio == 1)
	    viewList[i++] = viewL = new View();
	if (statesCheckItem.getState())
	    viewList[i++] = viewStates = new View();
	if (lStatesCheckItem.getState() && aspectRatio == 1)
	    viewList[i++] = viewLStates = new View();
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
	viewXMap = viewPMap = null;
	viewStatesMap = null;
	viewLStatesMap = null;
	if (viewStates != null) {
	    viewStatesMap = new View(viewStates);
	    viewStatesMap.x = (winSize.width-viewStatesMap.height)/2;
	    viewStatesMap.width -= viewStatesMap.x*2;
	}
	if (viewLStates != null) {
	    viewLStatesMap = new View(viewLStates);
	    viewLStatesMap.x = (winSize.width-viewLStatesMap.height)/2;
	    viewLStatesMap.width -= viewLStatesMap.x*2;
	}
	if (viewX != null) {
	    viewXMap = new View(viewX);
	    processMap(viewXMap, aspectRatio);
	}
	if (viewP != null) {
	    viewPMap = new View(viewP);
	    processMap(viewPMap, 1/aspectRatio);
	}
	if (viewL != null) {
	    View v = viewL;
	    v.mid_y = v.y + v.height/2;
	    v.ymult = .90*v.height/2;
	    v.lower_y = (int) (v.mid_y+v.ymult);
	    v.ymult2 = v.ymult*2;
	}
	
	floorValues = null;
	int i, j;
	if (viewStatesMap != null) {
	    int termWidth = viewStatesMap.height/maxDispTerms;
	    viewStatesMap.phasorCount = maxDispTerms*maxDispTerms;
	    Phasor phasors[] =
		viewStatesMap.phasors = new Phasor[viewStatesMap.phasorCount];
	    int pn = 0;
	    for (i = 1; i <= maxDispTerms; i++)
		for (j = 1; j <= maxDispTerms; j++) {
		    int x = viewStatesMap.x + (i-1)*termWidth;
		    int y = viewStatesMap.y + (j-1)*termWidth;
		    Phasor ph = new Phasor(x, y, termWidth, termWidth);
		    ph.state = states[i-1][j-1];
		    phasors[pn++] = ph;
		}
	}
	if (viewLStatesMap != null) {
	    int termWidth = viewLStatesMap.height/maxDispTerms;
	    int ct =
		viewLStatesMap.phasorCount = (maxDispTerms*(maxDispTerms+1))/2;
	    Phasor phasors[] =
		viewLStatesMap.phasors = new Phasor[ct];
	    int pn = 0;
	    for (i = 1; i <= maxDispTerms; i++)
		for (j = 1; j <= i; j++) {
		    int y = viewLStatesMap.y + (i-1)*termWidth;
		    int x = viewLStatesMap.x +
			(j-1)*termWidth - (i-1)*termWidth/2 +
			viewLStatesMap.width/2;
		    Phasor ph = new Phasor(x, y, termWidth, termWidth);
		    ph.state = lzStates[pn];
		    phasors[pn++] = ph;
		}
	}
 }

 void processMap(View v, double ar) {
	double a = v.width / (double) v.height;
	int w, h;
	if (ar > a) {
	    w = v.width-2;
	    h = (int) (w/ar);
	} else {
	    h = v.height-2;
	    w = (int) (h*ar);
	}
	v.x += (v.width -w)/2 + 1;
	v.y += (v.height-h)/2 + 1;
	v.width  = w;
	v.height = h;
	//if (memoryImageSourceCheck.getState()) {
	    v.pixels = new int[v.width*v.height];
	    int i;
	    for (i = 0; i != v.width*v.height; i++)
		v.pixels[i] = 0xFF000000;
	    v.imageSource = new MemoryImageSource(v.width, v.height,
						  v.pixels, 0, v.width);
	//}
 }

 int min(int x, int y) { return (x < y) ? x : y; }

 // do fundamental
 void doGround() {
	int x, y;
	for (x = 0; x != stateCount; x++)
	    for (y = 0; y != stateCount; y++)
		states[x][y].setRe(0);
	states[0][0].setReIm(1, 0);
 }

 void doBlank() {
	int x, y;
	for (x = 0; x <= sampleCount; x++)
	    for (y = 0; y <= sampleCount; y++)
		func[x][y] = 0;
	transform(true);
 }

 void normalize() {
	double norm = 0;
	int i, j;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		norm += states[i][j].magSquared();
	if (norm == 0)
	    return;
	double normmult = 1/Math.sqrt(norm);
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		states[i][j].multRe(normmult);
	cv.repaint(pause);
 }

 void maximize() {
	int i, j;
	double maxm = 0;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		if (states[i][j].mag > maxm)
		    maxm = states[i][j].mag;
	if (maxm == 0)
	    return;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		states[i][j].multRe(1/maxm);
	cv.repaint(pause);
 }

 void measureE() {
	normalize();
	double n = random.nextDouble();
	int i = 0, j = 0;
	int picki = -1;
	int pickj = -1;
	for (i = 0; i < stateCount; i++)
	    for (j = 0; j < stateCount; j++) {
		double m = states[i][j].magSquared();
		n -= m;
		if (n < 0) {
		    picki = i;
		    pickj = j;
		    i = j = stateCount;
		    break;
		}
	    }
	if (picki == -1)
	    return;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++) {
		State st = states[i][j];
		if (st.elevel != states[picki][pickj].elevel)
		    st.setRe(0);
	    }
	if (alwaysNormItem.getState())
	    normalize();
	else
	    maximize();
 }

 void transform(boolean novel) {
	t = 0;
	int x, y, i, j;
	for (x = 0; x != stateCount; x++)
	    for (y = 0; y != stateCount; y++) {
		BasisState st = states[x][y];
		int nx = st.nx;
		int ny = st.ny;
		double a = 0, b = 0;
		for (i = 0; i != sampleCount; i++)
		    for (j = 0; j != sampleCount; j++) {
			double q = hermite[nx][i]*hermite[ny][j];
			a += q*func [i][j];
			b += q*funci[i][j];
		    }
		if (a < epsilon && a > -epsilon) a = 0;
		if (b < epsilon && b > -epsilon) b = 0;
		if (novel)
		    b = 0;
		st.setReIm(a, b);
	    }
	cv.repaint(pause);
	if (alwaysNormItem.getState())
	    normalize();
	else if (alwaysMaxItem.getState())
	    maximize();
 }

 int getPanelHeight() { return winSize.height / 3; }

 void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
     g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
 }

 /*
 public void paintComponent(Graphics g) {
	cv.repaint();
 }
*/
 
 Color gray1, gray2;
 long lastTime;

 public void updateQuantumOsc(Graphics realg) {
	if (winSize == null || winSize.width == 0) {
	    // this works around some weird bug in IE which causes the
	    // applet to not show up properly sometimes.
	    handleResize();
	    return;
	}
	// next line moved here, after winSize check -- BH
	Graphics g = dbimage.getGraphics();
	boolean allQuiet = true;
	double tadd = 0;
	if (!stoppedCheck.getState() && !dragging) {
	    int val = speedBar.getValue();
	    tadd = Math.exp(val/20.)*(.1/5);
	    long sysTime = System.currentTimeMillis();
	    if (lastTime == 0)
		lastTime = sysTime;
	    tadd *= (sysTime-lastTime)*(1/500.);
	    t += tadd;
	    lastTime = sysTime;
	    allQuiet = false;
	} else
	    lastTime = 0;
	if (gray1 == null) {
	    gray1 = new Color(76,  76,  76);
	    gray2 = new Color(127, 127, 127);
	}
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());

	int i, j;
	for (i = 1; i != viewCount; i++) {
	    g.setColor(i == selectedPaneHandle ? Color.yellow : Color.gray);
	    g.drawLine(0, viewList[i].paneY,
		       winSize.width, viewList[i].paneY);
	}

	int x, y;
	xpoints = new int[3]; // XXX
	xpoints = new int[3];
	if (dragStop)
	    t = 0;
	double norm = 0;
	double normmult = 0, normmult2 = 0;

	// update phases
	for (i = 0; i != stateCount; i++) {
	    for (j = 0; j != stateCount; j++) {
		State st = states[i][j];
		if (st.mag < epsilon) {
		    st.setRe(0);
		    continue;
		}
		allQuiet = false;
		st.rotate(-st.elevel*tadd);
		norm += st.magSquared();
	    }
	}
	normmult2 = 1/norm;
	if (norm == 0)
	    normmult2 = 0;
	normmult = Math.sqrt(normmult2);
	if (!changingDerivedStates)
	    convertBasisToDerived();
	genFunc(normmult);

	double brightmult =
	    Math.exp(brightnessBar.getValue()/200.-5);
	if (norm == 0)
	    normmult = normmult2 = 0;
	if (dragStop)
	    allQuiet = true;
	int half = sampleCount/2;
	//System.out.print(xdir + " " + ydir + " " + xFirst + " " +
	//	 viewAngleSin + " " + viewAngleCos+ "\n");

	if (viewPotential != null) {
	    int floory = viewPotential.y + viewPotential.height - 5;
	    double ymult = 100;
	    if (floorValues == null)
		floorValues = new int[floory+1];
	    for (i = 0; i <= floory; i++)
		floorValues[i] = 0;
	    for (i = 0; i != stateCount; i++)
		for (j = 0; j != stateCount; j++) {
		    State st = states[i][j];
		    double dy = st.elevel;
		    double m = st.magSquared();
		    int mc = (int) ((256-32)*m)+1;
		    y = floory - (int) (ymult * dy);
		    if (y >= 0 && y <= floory)
			floorValues[y] += mc;
		}
	    for (i = 0; i <= floory; i++) {
		if (floorValues[i] == 0)
		    continue;
		int mc = floorValues[i]+32;
		if (mc > 255)
		    mc = 255;
		g.setColor(grayLevels[mc]);
		g.drawLine(0, i, winSize.width, i);
	    }

	    int oy = -1;

	    double xmult = alpha*sampleCount;

	    // with hbar = 1, k = omega.  we add in the 1/2 here for speed
	    double omegax = (states[1][0].elevel-states[0][0].elevel)*.5;

	    if (aspectRatio != 1) {
		double omegay = (states[0][1].elevel-states[0][0].elevel)*.5;
		g.setColor(gray1);
		for (i = 0; i != winSize.width; i++) {
		    double xx = ((i-winSize.width/2)/(double) viewXMap.width) *
			xmult;
		    double dy = xx*xx*omegay;
		    y = floory - (int) (ymult * dy);
		    if (i > 0)
			g.drawLine(i - 1, oy, i, y);
		    oy = y;
		}
	    }
	    g.setColor(Color.white);
	    for (i = 0; i != winSize.width; i++) {
		double xx = ((i-winSize.width/2)/(double) viewXMap.width) *
		    xmult;
		double dy = xx*xx*omegax;
		y = floory - (int) (ymult * dy);
		if (i > 0)
		    g.drawLine(i - 1, oy, i, y);
		oy = y;
	    }
	    
	    // calculate expectation value of E
	    if (norm != 0 && (expectCheckItem.getState() ||
			      uncertaintyCheckItem.getState())) {
		double expecte = 0;
		double expecte2 = 0;
		for (i = 0; i != stateCount; i++)
		    for (j = 0; j != stateCount; j++) {
			State st = states[i][j];
			double prob = st.magSquared()*normmult2;
			expecte += prob*st.elevel;
			expecte2 += prob*st.elevel*st.elevel;
		    }
		double uncert = Math.sqrt(expecte2-expecte*expecte);
		if (uncertaintyCheckItem.getState()) {
		    if (!(uncert >= 0))
			uncert = 0;
		    g.setColor(Color.blue);
		    y = floory - (int) (ymult * (expecte+uncert));
		    g.drawLine(0, y, winSize.width, y);
		    y = floory - (int) (ymult * (expecte-uncert));
		    if (expecte-uncert >= 0)
			g.drawLine(0, y, winSize.width, y);
		}
		if (expectCheckItem.getState()) {
		    // add rounding factor to prevent numerical error
		    // from putting red line off by one pixel
		    y = floory - (int) (ymult * (expecte+.0001));
		    g.setColor(Color.red);
		    g.drawLine(0, y, winSize.width, y);
		}
	    }
	    
	    if (selectedState != null && !dragging) {
		g.setColor(Color.yellow);
		y = floory - (int) (ymult * selectedState.elevel);
		g.drawLine(0, y, winSize.width, y);
	    }
	}

	if (viewXMap != null)
	    updateMapView(g, viewXMap, func, funci, sampleCount, brightmult);
	if (viewPMap != null) {
	    int pres = sampleCount*2;
	    for (x = 0; x != sampleCount*sampleCount*8; x++)
		data[x] = 0;
	    int ymult = pres*2;
	    int nn[] = new int[2];
	    nn[0] = nn[1] = pres;
	    int mask = pres-1;
	    int s2 = sampleCount;
	    int poff = (pres-sampleCount)/2;
	    //System.out.print(s2 + " " + poff + " " + sampleCount + "\n");
	    for (x = 0; x != sampleCount; x++)
		for (y = 0; y != sampleCount; y++) {
		    int o = ((x+poff+s2)&mask)*2 + ((y+poff+s2)&mask)*ymult;
		    data[o  ] = func [x][y];
		    data[o+1] = funci[x][y];
		}
	    ndfft(data, nn, 2, 1);
	    double m = 1./(sampleCount*2);
	    int s0 = 32;
	    int p0 = (pres-s0+2)/2;
	    if (pfuncr == null) {
		pfuncr = new double[s0+1][s0+1];
		pfunci = new double[s0+1][s0+1];
	    }
	    for (x = 0; x <= s0; x++)
		for (y = 0; y <= s0; y++) {
		    int o = ((s0-1-x+p0+s2)&mask)*2 +
			    ((s0-1-y+p0+s2)&mask)*ymult;
		    pfuncr[x][y] = data[o  ]*m;
		    pfunci[x][y] = data[o+1]*m;
		}
	    updateMapView(g, viewPMap, pfuncr, pfunci, s0, brightmult);
	} else {
	    pfuncr = pfunci = null;
	}

	if (viewL != null) {
	    int lzcount = (stateCount*2+1)*lspacing; // XXX
	    calcLSpectrum();
	    for (i = 0; i != lzcount; i++)
		lzspectrum[i] = Math.sqrt(lzspectrum[i]);
	    drawFunction(g, viewL, lzspectrum, null, lzcount, 0);
	}

	if (viewStatesMap != null) {
	    drawPhasors(g, viewStatesMap);
	    g.setColor(Color.white);
	    int termWidth = getTermWidth();
	    if (viewStatesMap.x > termWidth*3/2 && aspectRatio == 1) {
		x = winSize.width-termWidth;
		y = viewStatesMap.y + viewStatesMap.height/2;
		double omega = states[0][0].elevel;
		double tcos = Math.cos(-omega*t+pi/2);
		double tsin = Math.sin(-omega*t+pi/2);
		int ss2 = termWidth/2;
		int xa = (int) (tcos*ss2);
		int ya = (int) (-tsin*ss2);
		g.drawOval(x-ss2, y-ss2, termWidth, termWidth);
		g.drawLine(x, y, x+xa, y+ya);
		g.fillOval(x+xa-1, y+ya-1, 3, 3);
	    }
	}

	if (viewLStatesMap != null)
	    drawPhasors(g, viewLStatesMap);

	if (selectedState != null && viewXMap != null) {
	    g.setColor(Color.yellow);
	    if (selectedState instanceof BasisState)
		drawSelectedBasisState(g);
	    else
		drawSelectedLzState(g);
	}
	if (selectedState instanceof DerivedState && viewL != null) {
	    g.setColor(Color.yellow);
	    int lzcount = (stateCount*2+1)*lspacing; // XXX
	    int m = ((DerivedState) selectedState).lz * lspacing + lzcount/2;
	    x = viewL.width*m/(lzcount-1);
	    g.drawLine(x, viewL.y, x, viewL.y+viewL.height);
	}

	realg.drawImage(dbimage, 0, 0, this);
	if (!stoppedCheck.getState() && !allQuiet)
	    cv.repaint(pause);
 }

 void drawSelectedBasisState(Graphics g) {
	BasisState bst = (BasisState) selectedState;
	int nx = bst.nx;
	int ny = bst.ny;
	int i;
	int cross = 0;
	double s0 = 0;
	int xs[] = new int[nx+2];
     boolean maxed = false;

     // if thresh is too small then the circles will be too large.
	double thresh = .02;

	// look for zero crossings in hermite polynomials (in one dimension)
	for (i = 0; i != sampleCount; i++) {
	    boolean draw = false;

	    // check if we hit the meaty part of the curve
	    if (Math.abs(hermite[nx][i]) > .1)
		maxed = true;
	    if (Math.abs(hermite[nx][i]) > thresh) {

		// put a marker where the curve first exceeds the threshold
		if (cross == 0)
		    draw = true;

	    // also put a marker where the curve last crosses below the threshold (after all the zero crossings)
	    } else if (maxed && cross == nx+1)
		draw = true;

	    // put a marker where the curve crosses zero
	    if (draw || hermite[nx][i] * s0 < 0) {
		int x = viewXMap.x + viewXMap.width * i / (sampleCount+1);
		xs[cross] = x;
		s0 = hermite[nx][i];
		cross++;
		maxed = false;
	    }
	}
	if (cross <= nx+1)
	    xs[cross++] = viewXMap.x + viewXMap.width;

	cross = 0;
	s0 = 0;
	int ys[] = new int[ny+2];
	maxed = false;
	for (i = 0; i != sampleCount; i++) {
	    boolean draw = false;
	    if (Math.abs(hermite[ny][i]) > .1)
		maxed = true;
	    if (Math.abs(hermite[ny][i]) > thresh) {
		if (cross == 0)
		    draw = true;
	    } else if (cross == ny+1 && maxed)
		draw = true;
	    if (draw || hermite[ny][i] * s0 < 0) {
		int y = viewXMap.y + viewXMap.height * i / (sampleCount+1);
		ys[cross] = y;
		s0 = hermite[ny][i];
		cross++;
		maxed = false;
	    }
	}
	if (cross <= ny+1)
	    ys[cross] = viewXMap.y + viewXMap.height;

	int j;
	for (i = 0; i <= nx; i++)
	    for (j = 0; j <= ny; j++) {
		int x1 = xs[i];
		int x0 = xs[i+1] - xs[i];
		int y1 = ys[j];
		int y0 = ys[j+1] - ys[j];
		g.drawOval(x1+x0*10/100, y1+y0*10/100,
			   x0*80/100, y0*80/100);
	    }
	centerString(g, "nx = " + nx + ", ny = " + ny,
		     viewX.y+viewX.height-10);
 }

 void drawSelectedLzState(Graphics g) {
	DerivedState ds = (DerivedState) selectedState;
	centerString(g, "n = " +
		     (ds.bstates[0].nx + ds.bstates[0].ny) +
		     ", m = " + ds.lz,
		     viewX.y+viewX.height-10);
	double e = ds.elevel;
	double xx = Math.sqrt(e*2)/1.7888;
	int x = (int) ((.5-xx)*viewXMap.width);
	if (x < 0)
	    return;
	g.drawOval(viewXMap.x + x, viewXMap.y + x,
		   viewXMap.width-x*2,
		   viewXMap.width-x*2);
 }

 void drawPhasors(Graphics g, View v) {
	int i;
	for (i = 0; i != v.phasorCount; i++) {
	    Phasor ph = v.phasors[i];
	    State st = ph.state;
	    int ss = ph.width;
	    int ss2 = ss/2;
	    int x = ph.x + ss2;
	    int y = ph.y + ss2;
	    boolean yel = (selectedState != null &&
			   selectedState.elevel == st.elevel);
	    g.setColor(yel ? Color.yellow :
		       st.mag == 0 ? gray2 : Color.white);
	    g.drawOval(x-ss2, y-ss2, ss, ss);
	    int xa = (int) (st.re*ss2);
	    int ya = (int) (-st.im*ss2);
	    g.drawLine(x, y, x+xa, y+ya);
	    g.fillOval(x+xa-1, y+ya-1, 3, 3);
	}
 }

 void updateMapView(Graphics g, View vmap,
		       double arrayr[][], double arrayi[][],
		       int res, double brightmult) {
	double selectMag = 0;
	g.setColor(Color.white);
	g.drawRect(vmap.x-1, vmap.y-1, vmap.width+2, vmap.height+2);
	double maxsq = 0;
	double expectx = 0, expectx2 = 0;
	double expecty = 0, expecty2 = 0;
	double tot = 0;
	int zero = res/2;
	int x, y;
	for (y = 0; y <= res; y++) {
	    for (x = 0; x <= res; x++) {
		double dr = arrayr[x][y];
		double di = arrayi[x][y];
		double dy = dr*dr+di*di;
		if (dy > maxsq)
		    maxsq = dy;
		int dev = x-zero;
		expectx += dy*dev;
		expectx2 += dy*dev*dev;
		dev = y-zero;
		expecty += dy*dev;
		expecty2 += dy*dev*dev;
		tot += dy;
	    }
	}
	/*System.out.print(tot + " " + arrayr[0][0] + " " +
	  magcoef[1][1] + "\n");*/
	expectx /= tot;
	expectx2 /= tot;
	expecty /= tot;
	expecty2 /= tot;
	double maxnm = Math.sqrt(maxsq);
	double uncertx = Math.sqrt(expectx2-expectx*expectx);
	double uncerty = Math.sqrt(expecty2-expecty*expecty);
	double bestscale = 0;
	if (probCheckItem.isSelected() || probPhaseCheckItem.isSelected())
	    bestscale = 1/maxsq;
	else
	    bestscale = 1/maxnm;
	vmap.scale *= 1.1;
	// XXX
	//System.out.print(view.scale + " " + bestscale + "\n");
	//if (view.scale > bestscale || view.scale == 0)
	vmap.scale = bestscale;
	if (vmap.scale > 1e8)
	    vmap.scale = 1e8;
	int res1 = res+1;
	boolean mis = true;
	for (y = 0; y <= res; y++) {
	    for (x = 0; x <= res; x++) {
		double fr = arrayr[x][y];
		double fi = arrayi[x][y];
		double fv = (fr*fr+fi*fi);
		if (magPhaseCheckItem.isSelected())
		    fv = Math.sqrt(fv);
		fv *= 255*vmap.scale*brightmult;
		PhaseColor c = getPhaseColor(fr, fi);
		if (fv > 255)
		    fv = 255;
		int cr = (int) (c.r * fv);
		int cg = (int) (c.g * fv);
		int cb = (int) (c.b * fv);
		int col = (255<<24) | (cr<<16) | (cg<<8) | cb;
		int x1 = x*vmap.width/res1;
		int y1 = y*vmap.height/res1;
		int x2 = (x+1)*vmap.width/res1;
		int y2 = (y+1)*vmap.height/res1;
		if (mis) {
		    int ix = x1+y1*vmap.width;
		    int k, l;
		    for (k = 0; k != x2-x1; k++, ix++)
			for (l = 0; l != y2-y1; l++)
			    vmap.pixels[ix+l*vmap.width] = col;
		} else {
		    g.setColor(new Color(col));
		    g.fillRect(x1+vmap.x, y1+vmap.y, x2-x1, y2-y1);
		}
	    }
	}
	if (mis) {
	    g.drawImage(cv.createImage(vmap.imageSource),
			vmap.x, vmap.y, null);
	}
	if (uncertaintyCheckItem.getState() && tot > 0) {
	    g.setColor(Color.blue);
	    int xx1 =
		(int) (vmap.width*(expectx+zero-uncertx+.5)/res1+vmap.x);
	    int xx2 =
		(int) (vmap.width*(expectx+zero+uncertx+.5)/res1+vmap.x);
	    int yy1 =
		(int) (vmap.height*(expecty+zero-uncerty+.5)/res1+vmap.y);
	    int yy2 =
		(int) (vmap.height*(expecty+zero+uncerty+.5)/res1+vmap.y);
	    g.drawRect(xx1, yy1, xx2-xx1, yy2-yy1);
	}
	if (expectCheckItem.getState() && tot > 0) {
	    g.setColor(Color.red);
	    int xx = (int) (vmap.width*(expectx+zero+.5)/res1+vmap.x);
	    g.drawLine(xx, vmap.y, xx, vmap.y+vmap.height);
	    int yy = (int) (vmap.height*(expecty+zero+.5)/res1+vmap.y);
	    g.drawLine(vmap.x, yy, vmap.x+vmap.width, yy);
	}
 }

 final int lspacing = 3;

 void calcLSpectrum() {
	int lzcount = (stateCount*2+1)*lspacing;
	if (lzspectrum == null)
	    lzspectrum = new double[lzcount];
	int i, j;
	for (i = 0; i != lzcount; i++)
	    lzspectrum[i] = 0;
	int lc = (lzcount/2);
	for (i = 0; i != lzStateCount; i++) {
	    DerivedState ds = lzStates[i];
	    int m = lc+lspacing*ds.lz;
	    lzspectrum[m] += ds.magSquared();
	}
 }

 void measureL() {
	if (aspectRatio != 1)
	    return;
	normalize();
	convertBasisToDerived();
	calcLSpectrum();
	double n = random.nextDouble();
	int i = 0;
	int picki = -1;
	int lzcount = (stateCount*2+1)*lspacing; // XXX
	for (i = 0; i != lzcount; i++) {
	    double m = lzspectrum[i];
	    n -= m;
	    if (n < 0) {
		picki = i;
		i = lzcount;
		break;
	    }
	}
	if (picki == -1)
	    return;
	int lc = (lzcount/2);
	for (i = 0; i != lzStateCount; i++) {
	    DerivedState ds = lzStates[i];
	    int m = lc+lspacing*ds.lz;
	    if (m != picki)
		ds.setRe(0);
	}
	convertDerivedToBasis();
	if (alwaysNormItem.getState())
	    normalize();
	else
	    maximize();
 }

 void genFunc(double normmult) {
	int x, y, i, j;
	for (x = 0; x <= sampleCount; x++)
	    for (y = 0; y <= sampleCount; y++) {
		double dr = 0, di = 0;
		for (i = 0; i != stateCount; i++)
		    for (j = 0; j != stateCount; j++) {
			BasisState st = states[i][j];
			double q = hermite[st.nx][x]*hermite[st.ny][y];
			dr += q*st.re;
			di += q*st.im;
		    }
		func[x][y] = dr*normmult;
		funci[x][y] = di*normmult;
	    }
 }

 PhaseColor getPhaseColor(double x, double y) {
	int sector = 0;
	double val = 0;
	if (probCheckItem.isSelected())
	    return whitePhaseColor;
	if (x == 0 && y == 0)
	    return phaseColors[0][0];
	if (y >= 0) {
	    if (x >= 0) {
		if (x >= y) {
		    sector = 0;
		    val = y/x;
		} else {
		    sector = 1;
		    val = 1-x/y;
		}
	    } else {
		if (-x <= y) {
		    sector = 2;
		    val = -x/y;
		} else {
		    sector = 3;
		    val = 1+y/x;
		}
	    }
	} else {
	    if (x <= 0) {
		if (y >= x) {
		    sector = 4;
		    val = y/x;
		} else {
		    sector = 5;
		    val = 1-x/y;
		}
	    } else {
		if (-y >= x) {
		    sector = 6;
		    val = -x/y;
		} else {
		    sector = 7;
		    val = 1+y/x;
		}
	    }
	}
	return phaseColors[sector][(int) (val*phaseColorCount)];
 }

 int getTermWidth() {
	int termWidth = viewStatesMap.height / maxDispTerms;
	return termWidth;
 }

 void edit(MouseEvent e) {
	if (selection == SEL_NONE)
	    return;
	int x = e.getX();
	int y = e.getY();
	switch (selection) {
	case SEL_HANDLE:  editHandle(y);   break;
	case SEL_STATES:  editMag(x, y);   break;
	case SEL_POTENTIAL:
	    findStateByEnergy(y);
	    enterSelectedState();
	    break;
	case SEL_X:       editX(x, y);  break;
	case SEL_P:       editP(x, y);  break;
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
	if (selectedState instanceof DerivedState) {
	    convertDerivedToBasis();
	    changingDerivedStates = true;
	}
	if (alwaysNormItem.getState())
	    normalize();
	cv.repaint(pause);
 }

 void convertDerivedToBasis() {
	int i, j;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		states[i][j].setRe(0);
	Complex c = new Complex();
	for (i = 0; i != lzStateCount; i++) {
	    DerivedState ds = lzStates[i];
	    for (j = 0; j != ds.count; j++) {
		c.set(ds.coefs[j]);
		c.conjugate();
		c.mult(ds);
		ds.bstates[j].add(c);
	    }
	}
	double maxm = 0;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		if (states[i][j].mag > maxm)
		    maxm = states[i][j].mag;
	if (maxm > 1) {
	    double mult = 1/maxm;
	    for (i = 0; i != stateCount; i++)
		for (j = 0; j != stateCount; j++)
		    states[i][j].multRe(mult);
	}
 }

 void convertBasisToDerived() {
	int i, j;
	Complex c1 = new Complex();
	Complex c2 = new Complex();
	double maxm = 0;
	for (i = 0; i != lzStateCount; i++) {
	    DerivedState ds = lzStates[i];
	    c1.setRe(0);
	    try {
		for (j = 0; j != ds.count; j++) {
		    c2.set(ds.coefs[j]);
		    c2.mult(ds.bstates[j]);
		    c1.add(c2);
		}
	    } catch (Exception e) {
		System.out.print("Exception at " + i + "\n");
	    }
	    if (c1.mag < epsilon)
		c1.setRe(0);
	    ds.set(c1);
	    if (c1.mag > maxm)
		maxm = ds.mag;
	}
	if (maxm > 1) {
	    double mult = 1/maxm;
	    for (i = 0; i != lzStateCount; i++)
		lzStates[i].multRe(mult);
	}
 }

 void editMagClick() {
	if (selectedState == null)
	    return;
	if (magDragStart < .5)
	    selectedState.setRe(1);
	else
	    selectedState.setRe(0);
	cv.repaint(pause);
 }

 void editX(int x, int y) {
	int oldgx = selectedGridX;
	int oldgy = selectedGridY;
	switch (mouseChooser.getSelectedIndex()) {
	case MOUSE_GAUSS:
	    editXGauss(x, y);
	    return;
	case MOUSE_GAUSSP:
	    editXGaussP(x, y);
	    return;
	case MOUSE_TRANSLATE:
	    editXTranslate(x, y);
	    return;
	case MOUSE_SCALE:
	    editXScale(x, y);
	    return;
	case MOUSE_ROTATE:
	    editXRotate(x, y);
	    return;
	}
	findGridPoint2D(viewXMap, x, y);
	int x1 = oldgx;
	int y1 = oldgy;
	int x2 = selectedGridX;
	int y2 = selectedGridY;
	// need to draw a line from x1,y1 to x2,y2
	if (x1 == x2 && y1 == y2) {
	    editFuncPoint(x2, y2, 1);
	} else if (abs(y2-y1) > abs(x2-x1)) {
	    // y difference is greater, so we step along y's
	    // from min to max y and calculate x for each step
	    int sgn = sign(y2-y1);
	    for (y = y1; y != y2+sgn; y += sgn) {
		x = x1+(x2-x1)*(y-y1)/(y2-y1);
		editFuncPoint(x, y, 1);
	    }
	} else {
	    // x difference is greater, so we step along x's
	    // from min to max x and calculate y for each step
	    int sgn = sign(x2-x1);
	    for (x = x1; x != x2+sgn; x += sgn) {
		y = y1+(y2-y1)*(x-x1)/(x2-x1);
		editFuncPoint(x, y, 1);
	    }
	}
	transform(false);
 }

 void editP(int x, int y) {
	int oldgx = selectedGridX;
	int oldgy = selectedGridY;
	switch (mouseChooser.getSelectedIndex()) {
	case MOUSE_GAUSS:
	    editPGauss(x, y);
	    return;
	}
 }

 int sign(int x) {
	return (x < 0) ? -1 : (x == 0) ? 0 : 1;
 }
 
 int abs(int x) {
	return x < 0 ? -x : x;
 }

 void editFuncPoint(int x, int y, double v) {
	if (!dragSet && !dragClear) {
	    dragClear = func[x][y] > .1;
	    dragSet = !dragClear;
	}
	func[x][y] = (dragSet) ? v : 0;
	dragStop = true;
	cv.repaint(pause);
 }

 void editXTranslate(int x, int y) {
	int offx = (x-dragX) * sampleCount / viewXMap.width;
	int offy = (y-dragY) * sampleCount / viewXMap.height;
	int i, j;
	for (i = 0; i != sampleCount; i++)
	    for (j = 0; j != sampleCount; j++) {
		if (i-offx < 0 || j-offy < 0 ||
		    i-offx >= sampleCount ||
		    j-offy >= sampleCount)
		    continue;
		func [i][j] = translateFunc [i-offx][j-offy];
		funci[i][j] = translateFunci[i-offx][j-offy];
	    }
	transform(false);
 }

 void editXScale(int x, int y) {
	int i, j;
	int cx = viewXMap.x+viewXMap.width/2;
	int cy = viewXMap.y+viewXMap.height/2;
	double scalex = (dragX-cx)/(double) (x-cx);
	double scaley = (dragY-cy)/(double) (y-cy);
	int hx = sampleCount/2;
	int hy = sampleCount/2;
	for (i = 0; i != sampleCount; i++)
	    for (j = 0; j != sampleCount; j++) {
		int i1 = (int) ((i-hx)*scalex+hx+.5);
		int j1 = (int) ((j-hy)*scaley+hy+.5);
		if (i1 < 0 || j1 < 0 ||
		    i1 >= sampleCount ||
		    j1 >= sampleCount)
		    func[i][j] = funci[i][j] = 0;
		else {
		    func [i][j] = translateFunc [i1][j1];
		    funci[i][j] = translateFunci[i1][j1];
		}
	    }
	transform(false);
 }

 void editXRotate(int x, int y) {
	if (aspectRatio != 1)
	    return;
	int cx = viewXMap.x + viewXMap.width/2;
	int cy = viewXMap.y + viewXMap.height/2;
	double angle1 = Math.atan2(-(dragY-cy), dragX-cx);
	double angle2 = Math.atan2(-(y-cy), x-cx);
	double ad = angle2-angle1;
	int i, j;
	for (i = 0; i != lzStateCount; i++) {
	    DerivedState ds = lzStates[i];
	    ds.rotate(-ad*ds.lz);
	}
	convertDerivedToBasis();
	changingDerivedStates = true;
	dragX = x;
	dragY = y;
	cv.repaint(pause);
 }

 double lastGaussWx = -.039, lastGaussWy = -.039;

 void editXGauss(int x, int y) {
	int i, j;
	int gx = x-dragX;
	int gy = y-dragY;
	double wx = 1/(abs(gx)+.0001);
	double wy = 1/(abs(gy)+.0001);
	wx = -wx*wx*10;
	wy = -wy*wy*10;
	double rm = 32./sampleCount;
	rm *= rm;
	//System.out.println(wx + " " + wy);
	lastGaussWx = wx;
	lastGaussWy = wy;
	wx *= aspectRatio*aspectRatio;
	if (wx < -.25)
	    wx = -.25;
	if (wy < -.25)
	    wy = -.25;
	for (i = 0; i != sampleCount; i++)
	    for (j = 0; j != sampleCount; j++) {
		int x1 = i-selectedGridX;
		int y1 = j-selectedGridY;
		func[i][j] = Math.exp(rm*(wx*x1*x1+wy*y1*y1));
	    }
	transform(true);
 }

 void editXGaussP(int x, int y) {
	getMomentumCoords(viewXMap,
			  x-dragX+viewXMap.x+viewXMap.width/2,
			  y-dragY+viewXMap.y+viewXMap.height/2);
	drawXGaussP();
 }

 void drawXGaussP() {
	int i, j;
	double wx = lastGaussWx;
	double wy = lastGaussWy;
	wx *= aspectRatio*aspectRatio;
	if (wx < -.25)
	    wx = -.25;
	if (wy < -.25)
	    wy = -.25;
	double rm = 32./sampleCount;
	rm *= rm;
	for (i = 0; i <= sampleCount; i++)
	    for (j = 0; j <= sampleCount; j++) {
		int x1 = i-selectedGridX;
		int y1 = j-selectedGridY;
		double n = Math.exp(rm*(wx*x1*x1+wy*y1*y1));
		double cx = Math.cos(momentumX*x1);
		double cy = Math.cos(momentumY*y1);
		double sx = Math.sin(momentumX*x1);
		double sy = Math.sin(momentumY*y1);
		func [i][j] = n*(cx*cy - sx*sy);
		funci[i][j] = n*(cx*sy + cy*sx);
	    }
	transform(false);
 }

 double momentumX, momentumY;

 void getMomentumCoords(View v, int x, int y) {
	int pres = sampleCount*2;
	int s0 = 32;
	int p0 = (pres-s0+2)/2;
	momentumX =
	    (((x-v.x-1)*s0/(v.width-2))-s0/2) *
	    pi/sampleCount;
	momentumY =
	    (((y-v.y-1)*s0/(v.height-2))-s0/2) *
	    pi/sampleCount;
	if (momentumX > pi)
	    momentumX = pi;
	if (momentumY > pi)
	    momentumY = pi;
	if (momentumX < -pi)
	    momentumX = -pi;
	if (momentumY < -pi)
	    momentumY = -pi;
 }

 void editPGauss(int x, int y) {
	int i, j;
	int gx = x-dragX;
	int gy = y-dragY;
	/*double wx = (abs(gx)+.0001);
	double wy = (abs(gy)+.0001);
	wx = -wx*wx/100;
	wy = -wy*wy/100;*/
	double wx = aspectRatio/(abs(gx)+.0001);
	double wy = 1/(abs(gy)+.0001);
	wx = -wx*wx*10;
	wy = -wy*wy*10;
	if (wx < -.25)
	    wx = -.25;
	if (wy < -.25)
	    wy = -.25;
	double rm = 32./sampleCount;
	rm *= rm;
	getMomentumCoords(viewPMap, dragX, dragY);
	for (i = 0; i <= sampleCount; i++)
	    for (j = 0; j <= sampleCount; j++) {
		int x1 = i-sampleCount/2;
		int y1 = j-sampleCount/2;
		double n = Math.exp(rm*(wx*x1*x1+wy*y1*y1));
		double cx = Math.cos(momentumX*x1);
		double cy = Math.cos(momentumY*y1);
		double sx = Math.sin(momentumX*x1);
		double sy = Math.sin(momentumY*y1);
		func [i][j] = n*(cx*cy - sx*sy);
		funci[i][j] = n*(cx*sy + cy*sx);
	    }
	transform(false);
 }

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
	if (view.scale > 1e8)
	    view.scale = 1e8;
	g.setColor(Color.gray);
	int mid_x = winSize.width * (count/2) / (count-1);
	g.drawLine(mid_x, view.y, mid_x, view.y+view.height);

	int mid_y = view.lower_y;
	double mult = view.ymult2*view.scale;
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

	if (maxsq > 0) {
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
	if (e.getSource() == blankButton)
	    doBlank();
	if (e.getSource() == normalizeButton)
	    normalize();
	if (e.getSource() == maximizeButton)
	    maximize();
	if (e.getSource() == measureEItem)
	    measureE();
	if (e.getSource() == measureLItem)
	    measureL();
 }

 public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == resBar)
	    setLoadCount();
	if (e.getSource() == aspectBar) {
	    setLoadCount();
	    if (aspectRatio == 1) {
		measureLItem.enable();
		lCheckItem.enable();
		lStatesCheckItem.enable();
	    } else {
		measureLItem.disable();
		lCheckItem.disable();
		lStatesCheckItem.disable();
	    }
	}
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
 
 void setLoadCount() {
	int q = resBar.getValue();
	sampleCount = 1;
	while (q-- > 0)
	    sampleCount *= 2;
	if (sampleCount < 8)
	    sampleCount = 8;
	System.out.print("sampleCount = " + sampleCount + "\n");
	states = new BasisState[stateCount][stateCount];
	aspectRatio = aspectBar.getValue() / 10.;
	int i, j;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++) {
		states[i][j] = new BasisState();
		int nx = i;
		int ny = j;
		states[i][j].nx = nx;
		states[i][j].ny = ny;
		states[i][j].elevel = (.5+nx)/(aspectRatio*aspectRatio)+.5+ny;
	    }
	func = new double[sampleCount+1][sampleCount+1];
	funci = new double[sampleCount+1][sampleCount+1];
	pfuncr = pfunci = null;
	step = pi/sampleCount;
	data = new double[sampleCount*sampleCount*2*4];
	double mult = .04/states[0][0].elevel;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		states[i][j].elevel *= mult;
	hermite = new double[stateCount+1][sampleCount+1];
	double xp[] = new double[stateCount];
	alpha = .3*32/sampleCount;
	for (i = 0; i <= sampleCount; i++) {
	    double x = alpha*(i-sampleCount/2);
	    double e = Math.exp(-x*x*.5);
	    xp[1] = x;
	    for (j = 2; j != stateCount; j++)
		xp[j] = xp[j-1]*x;
	    hermite[0][i] = e;
	    hermite[1][i] = 2*x*e;
	    hermite[2][i] = (4*x*x-2)*e;
	    hermite[3][i] = (8*xp[3]-12*x)*e;
	    hermite[4][i] = (16*xp[4]-48*x*x+12)*e;
	    hermite[5][i] = (32*xp[5]-160*xp[3]+120*x)*e;
	    hermite[6][i] = (-120+720*x*x-480*xp[4]+64*xp[6])*e;
	    hermite[7][i] = (-1680*x+3360*xp[3]-1344*xp[5]+128*xp[7])*e;
	    hermite[8][i] = (1680-13440*x*x+13440*xp[4]-3584*xp[6]+
			     256*xp[8])*e;
	    hermite[9][i] = (30240*x-80640*xp[3]+48384*xp[5]-
			     9216*xp[7]+512*xp[9])*e;
	    hermite[10][i] = (-30240 + 302400*xp[2] - 403200*xp[4] +
			      161280*xp[6] - 23040*xp[8] + 1024*xp[10])*e;
	    hermite[11][i] = (-665280*x + 2217600*xp[3] - 1774080*xp[5] +
			      506880*xp[7] - 56320*xp[9] + 2048*xp[11])*e;
	    hermite[12][i] = (665280 - 7983360*xp[2] + 13305600*xp[4] -
			      7096320*xp[6] + 1520640*xp[8] -
			      135168*xp[10] + 4096*xp[12])*e;
	    hermite[13][i] = (17297280*x - 69189120*xp[3] + 69189120*xp[5] -
			      26357760*xp[7] + 4392960*xp[9] - 319488*xp[11] +
			      8192*xp[13])*e;
	    /*hermite[15][i] = (-17297280 + 242161920*xp[2] - 484323840*xp[4] +
			      322882560*xp[6] - 92252160*xp[8] +
			      12300288*xp[10] - 745472*xp[12] +
			      16384*xp[14])*e;*/
	}

	// normalize
	for (i = 0; i != stateCount; i++) {
	    double dy = 0;
	    for (j = 0; j <= sampleCount; j++)
		dy += hermite[i][j]*hermite[i][j];
	    dy = Math.sqrt(dy);
	    if (dy > 0) { // XXX
		for (j = 0; j <= sampleCount; j++)
		    hermite[i][j] /= dy;
	    }
	}
	/*
	// normalize
	double dy = 0;
	for (j = 0; j != sampleCount; j++)
	    dy += hermite[1][j]*hermite[1][j];

	for (i = 1; i <= stateCount; i++) {
	    double dy0 = Math.sqrt(dy);
	    System.out.print(dy0 + "\n");
	    for (j = 0; j != sampleCount; j++)
		hermite[i][j] /= dy0;
	    dy *= 2*i;
	}
	*/
	    
	/*for (i = 1; i <= 10; i++)
	    for (j = 1; j <= 10; j++) {
		int k;
		double dy = 0;
		for (k = 0; k != sampleCount; k++)
		    dy += hermite[i][k]*hermite[j][k];
		if (dy > 1e-5)
		    System.out.print(i + " " + j + " " + dy + "\n");
		    }*/
	int m, n;

	// calculate angular momentum states from rectangular basis
	lzStateCount = (stateCount*(stateCount+1))/2;
	lzStates = new DerivedState[lzStateCount];
	Complex x[] = new Complex[1];
	x[0] = new Complex().setReIm(1, 0);
	setLzState(0, 0, x);
	calcLzStates(x, 0, 0);
	setupDisplay();
 }

 void setLzState(int d, int g, Complex coefs[]) {
	DerivedState st = new DerivedState();
	int n = 1+d+g;
	int pos = (n*(n-1))/2 + d;
	int m = d-g;
	//System.out.println(d + " " + g + " " + n + " " + m + " " + pos);
	lzStates[pos] = st;
	st.count = n;
	st.bstates = new BasisState[n];
	st.coefs = coefs;
	int i;
	for (i = 1; i <= n; i++)
	    st.bstates[i-1] = states[i-1][n-i];
	st.lz = m;
	st.elevel = states[n-1][0].elevel;
 }

 void calcLzStates(Complex arr0[], int d, int g) {
	int n = 2+d+g;
	if (n > stateCount)
	    return;
	calcLzStatesD(arr0, d+1, g);

	Complex arr1[] = new Complex[n];
	int j;
	Complex c2 = new Complex();
	for (j = 0; j != n; j++) {
	    // use "G" operator to create state with lower m and higher n
	    Complex c = arr1[j] = new Complex();
	    if (j > 0) {
		c.set(arr0[j-1]);
		c.multRe(Math.sqrt(j));
	    } else
		c.setRe(0);
	    if (j < n-1) {
		c2.set(arr0[j]);
		c2.multReIm(0, -Math.sqrt(n-j-1));
	    } else
		c2.setRe(0);
	    c.add(c2);
	    c.multRe(1/Math.sqrt(2*(g+1)));
	    //System.out.println("G " + j + " " + c.re + " " + c.im);
	}
	setLzState(d, g+1, arr1);
	calcLzStates(arr1, d, g+1);
 }

 void calcLzStatesD(Complex arr0[], int d, int g) {
	int n = 1+d+g;
	if (n > stateCount)
	    return;
	Complex arr1[] = new Complex[n];
	int i, j;
	Complex c2 = new Complex();
	for (j = 0; j != n; j++) {
	    // use "D" operator to create state with higher m and n
	    Complex c = arr1[j] = new Complex();
	    if (j > 0) {
		c.set(arr0[j-1]);
		c.multRe(Math.sqrt(j));
	    } else
		c.setRe(0);
	    if (j < n-1) {
		c2.set(arr0[j]);
		c2.multReIm(0, Math.sqrt(n-j-1));
	    } else
		c2.setRe(0);
	    c.add(c2);
	    c.multRe(1/Math.sqrt(2*d));
	    //System.out.println("D " + j + " " + c.re + " " + c.im);
	}
	setLzState(d, g, arr1);
	calcLzStatesD(arr1, d+1, g);
 }

 void findGridPoint2D(View v, int mx, int my) {
	int res1 = sampleCount+1;
	selectedGridX = (mx-v.x)*res1 / v.width;
	selectedGridY = (my-v.y)*res1 / v.height;
	int f = 1;
	if (selectedGridX < f)
	    selectedGridX = f;
	if (selectedGridY < f)
	    selectedGridY = f;
	if (selectedGridX > sampleCount-f)
	    selectedGridX = sampleCount-f;
	if (selectedGridY > sampleCount-f)
	    selectedGridY = sampleCount-f;
	selectedGridFunc = func[selectedGridX][selectedGridY];
 }

 public void mouseDragged(MouseEvent e) {
	dragging = true;
	changingDerivedStates = false;
	edit(e);
 }
 public void mouseMoved(MouseEvent e) {
	if (dragging)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int panelHeight = getPanelHeight();
	State oldSelectedState = selectedState;
	selectedState = null;
	selectedPhasor = null;
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
	if (viewXMap != null && viewXMap.inside(x, y))
	    selection = SEL_X;
	else if (viewPMap != null && viewPMap.inside(x, y))
	    selection = SEL_P;
	else if (viewPotential != null && viewPotential.contains(x, y)) {
	    selection = SEL_POTENTIAL;
	    findStateByEnergy(y);
	} else if (viewStatesMap != null && viewStatesMap.inside(x, y))
	    findPhasor(viewStatesMap, x, y);
	else if (viewLStatesMap != null && viewLStatesMap.inside(x, y))
	    findPhasor(viewLStatesMap, x, y);
	if (selectedState != oldSelectedState)
	    cv.repaint(pause);
 }

 void findPhasor(View v, int x, int y) {
	int i;
	for (i = 0; i != v.phasorCount; i++) {
	    if (!v.phasors[i].inside(x, y))
		continue;
	    selectedPhasor = v.phasors[i];
	    selectedState = selectedPhasor.state;
	    selection = SEL_STATES;
	    break;
	}
 }
 
 void findStateByEnergy(int y) {
	int i, j;
	int floory = viewPotential.y + viewPotential.height - 5;
	double ymult = 100;
	double dist = 100;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++) {
		int yy = floory - (int) (ymult * states[i][j].elevel);
		double d = Math.abs(y-yy);
		if (d < dist) {
		    dist = d;
		    selectedState = states[i][j];
		}
	    }
 }

 public void mouseClicked(MouseEvent e) {
	if (selection == SEL_STATES)
	    editMagClick();
	if (e.getClickCount() == 2 && selectedState != null)
	    enterSelectedState();
 }

 void enterSelectedState() {
	int i, j;
	for (i = 0; i != stateCount; i++)
	    for (j = 0; j != stateCount; j++)
		if (states[i][j] != selectedState)
		    states[i][j].setRe(0);
	convertBasisToDerived();
	selectedState.setRe(1);
	if (selectedState instanceof DerivedState)
	    convertDerivedToBasis();
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
     	mouseMoved(e); // needed for mobile
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	if (selection == SEL_X)
	    findGridPoint2D(viewXMap, e.getX(), e.getY());
	else if (selection == SEL_P)
	    findGridPoint2D(viewPMap, e.getX(), e.getY());
	if (selection == SEL_X &&
	    (mouseChooser.getSelectedIndex() == MOUSE_TRANSLATE ||
	     mouseChooser.getSelectedIndex() == MOUSE_SCALE))
	    saveTranslateData();
	dragStartX = e.getX();
	dragStartY = e.getY();
	if (selectedState != null)
	    magDragStart = selectedState.mag;
	dragging = true;
	edit(e);
 }

 void saveTranslateData() {
	translateFunc  = func;
	translateFunci = funci;
	func  = new double[sampleCount+1][sampleCount+1];
	funci = new double[sampleCount+1][sampleCount+1];
 }

 public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = dragStop = changingDerivedStates = false;
	dragSet = dragClear = false;
	translateFunc = translateFunci = null;
	mouseMoved(e);
	cv.repaint(pause);
 }
 
 public boolean finished;

 public void itemStateChanged(ItemEvent e) {
	 
	 if (!finished){
		 return;
	 }
	if (e.getItemSelectable() == stoppedCheck) {
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() instanceof CheckboxMenuItem) {
	    handleResize();
	    cv.repaint(pause);
	}
	if (e.getItemSelectable() == alwaysNormItem &&
	    alwaysNormItem.getState()) {
	    normalize();
	    alwaysMaxItem.setState(false);
	    cv.repaint(pause);
	}
	if (e.getItemSelectable() == alwaysMaxItem &&
	    alwaysMaxItem.getState()) {
	    maximize();
	    alwaysNormItem.setState(false);
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
	    }
 }

	// n-dimensional discrete FFT from Numerical Recipes
	void ndfft(double data[], int nn[], int ndim, int isign) {
		int ntot = 1;
		int nprev = 1;
		int idim;
		double i2pi = isign * 2 * pi;

		for (idim = 0; idim < ndim; idim++)
			ntot *= nn[idim];
		// int steps = 0;

		for (idim = 0; idim < ndim; idim++) {

			int n = nn[idim];
			int nrem = ntot / (n * nprev);
			int ip1 = 2 * nprev;
			int ip2 = ip1 * n;
			int ip3 = ip2 * nrem;
			int i2rev = 0;
			int i2;
			int ifp1;

			/*
			 * Bit reversal stuff.
			 */

			for (i2 = 0; i2 < ip2; i2 += ip1) {

				int ibit;

				if (i2 < i2rev) {

					int i1;

					for (i1 = i2; i1 < i2 + ip1; i1 += 2) {

						int i3;

						for (i3 = i1; i3 < ip3; i3 += ip2) {

							int i3rev = i2rev + i3 - i2;
							double tempr = data[i3];
							double tempi = data[i3 + 1];

							data[i3] = data[i3rev];
							data[i3 + 1] = data[i3rev + 1];
							data[i3rev] = tempr;
							data[i3rev + 1] = tempi;
							// steps++;
						}

					}

				}

				ibit = ip2 / 2;
				while ((ibit > ip1) && (i2rev > ibit - 1)) {

					i2rev -= ibit;
					ibit /= 2;

				}

				i2rev += ibit;

			}

			/*
			 * Danielson-Lanczos stuff.
			 */

			ifp1 = ip1;
			while (ifp1 < ip2) {

				int ifp2 = 2 * ifp1;
				double theta = i2pi / ((double) ifp2 / ip1);
				double wpr;
				double wpi;
				double wr = 1.0;
				double wi = 0.0;
				int i3;

				wpr = Math.sin(0.5 * theta);
				wpr *= wpr * -2.0;
				wpi = Math.sin(theta);

				for (i3 = 0; i3 < ifp1; i3 += ip1) {

					int i1;
					double wtemp;

					for (i1 = i3; i1 < i3 + ip1; i1 += 2) {

						for (i2 = i1; i2 < ip3; i2 += ifp2) {

							int i21 = i2 + 1;
							int k2 = i2 + ifp1;
							int k21 = k2 + 1;
							double tempr = (wr * data[k2]) - (wi * data[k21]);
							double tempi = (wr * data[k21]) + (wi * data[k2]);

							data[k2] = data[i2] - tempr;
							data[k21] = data[i21] - tempi;

							data[i2] += tempr;
							data[i21] += tempi;
							// steps++;

						}

					}

					wtemp = wr;
					wr += (wr * wpr) - (wi * wpi);
					wi += (wi * wpr) + (wtemp * wpi);

				}
				ifp1 = ifp2;

			}
			nprev *= n;

		}
		// System.out.print(steps + "\n");
	}

 class PhaseColor {
	public double r, g, b;
	PhaseColor(double rr, double gg, double bb) {
	    r = rr; g = gg; b = bb;
	}
 }

 class View extends Rectangle {
	View() { }
	View(View v) { super(v); }
	int paneY;
	MemoryImageSource imageSource;
	int pixels[];
	int phasorCount;
	Phasor phasors[];
	double ymult, ymult2, scale;
	int mid_y, lower_y;
 }

 class Phasor extends Rectangle {
	Phasor(int x, int y, int a, int b) {
	    super(x, y, a, b);
	}
	State state;
 }

 class State extends Complex {
	double elevel;
 }

 class BasisState extends State {
	int nx, ny;
 }

 class DerivedState extends State {
	int count, lz;
	BasisState bstates[];
	Complex coefs[];
 }

};

