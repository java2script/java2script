package com.falstad;

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
import java.util.Random;
import java.util.Vector;

import java.applet.Applet;

import javajs.util.JSAudioThread;
import java.awt.Button;
import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.Choice;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Scrollbar;


//web_Ready
//web_AppletName= BarWaves
//web_Description= A simulation that demonstrates standing flexural waves in a bar
//web_JavaVersion= http://www.falstad.com/barwaves/
//web_AppletImage= barwaves.png
//web_Category= Physics - Waves
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, audio, AWT-to-Swing


//BarWaves.java (C) 2001 by Paul Falstad, www.falstad.com
//
//Conversion to JavaScript by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//

//AWT -> SWING
//
// import javax.swing.applet.Applet --> a2s
// import java.awt [Applet, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
// Changed paint() to paintComponent() in BarWavesCanvas and BarWavesFrame
// changed createImage to cv.createImage  

//useFrame option
//
// Added Container main and added components to main
// resize and show --> useFrame options
// added triggerShow()
//

// Java --> SwingJS
// AudioDataStream calls removed from JS version using J2SIgnore -BH
// added JSAudio support; not that ONLY 8-bit mu-law compression is supported by browsers
// and this.isJava both turns that off and selects swingjs.JSToolkit.playAudio instead of AudioDataStream. 

public class BarWaves extends Applet {
 static BarWavesFrame mf;
 void destroyFrame() {
	if (mf != null)
	    mf.dispose();
	mf = null;
 }
 public void start() {
		mf = new BarWavesFrame(this);
		mf.init();
		mf.handleResize();
	 System.out.println("init");
 }

 public static void main(String args[]) {
     mf = new BarWavesFrame(null);
     mf.init();
 }

 public void destroy() {
	if (mf != null)
	    mf.dispose();
	mf = null;
 }
 
 boolean started = false;
 
 public void paint(Graphics g) {
	 System.out.println(mf.cv.getSize());
	 super.paint(g);
	 String s = "Applet is open in a separate window.";
		if (!started)
			s = "Applet is starting.";
		else if (mf == null)
			s = "Applet is finished.";
		else if (mf.useFrame)
			mf.triggerShow();
		 if(mf == null || mf.useFrame)
			 g.drawString(s, 10, 30);
		
 }
};

class BarWavesFrame extends Frame
implements ComponentListener, ActionListener, AdjustmentListener,
          MouseMotionListener, MouseListener, ItemListener {
 
 Dimension winSize;
 Image dbimage;
 
 Random random;
 int maxTerms = 50;
 int modeCount;
 int maxMaxTerms = 90;
 int sampleCount;
 double modeTable[][];
 double modeNorms[];
 public static final double epsilon = .0000001;
 public static final double epsilon2 = .003;
 
 public String getAppletInfo() {
	return "BarWaves by Paul Falstad";
 }

 Button sineButton;
 Button blankButton;
 Checkbox stoppedCheck;
 Checkbox soundCheck;
 Choice modeChooser;
 Choice setupChooser;
 Vector setupList;
 Setup setup;
 Choice displayChooser;
 Scrollbar dampingBar;
 Scrollbar speedBar;
 Scrollbar loadBar;
 Scrollbar baseFreqBar;
 Scrollbar stiffnessBar;
 double magcoef[];
 double dampcoef[];
 double phasecoef[];
 double phasecoefcos[];
 double phasecoefadj[];
 double omega[];
 static final double pi = 3.14159265358979323846;
 double step;
 double func[];
 double funci[];
 int thickness[];
 int xpoints[], ypoints[];
 int selectedCoef;
 int magnitudesY;
 static final int SEL_NONE = 0;
 static final int SEL_FUNC = 1;
 static final int SEL_MAG = 2;
 static final int MODE_SHAPE = 0;
 static final int MODE_FORCE = 1;
 static final int MODE_THICKNESS = 2;
 static final int DISP_PHASE = 0;
 static final int DISP_PHASECOS = 1;
 static final int DISP_MODES = 2;
 static final int BOUND_HINGED = 0;
 static final int BOUND_FREE = 1;
 static final int BOUND_CLAMPED = 2;
 int selection;
 int dragX, dragY;
 boolean dragging;
 double t;
 int pause;
 Color gray1 = new Color(76,  76,  76);
 Color gray2 = new Color(127, 127, 127);
 Container main;
 public boolean useFrame;
 boolean showControls;
 
 int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
 }
 BarWavesCanvas cv;
 BarWaves applet;

 BarWavesFrame(BarWaves a) {
	super("Bar Waves Applet");
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
	setupList = new Vector();
	Setup s = new FreeBarSetup();
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	}
	selectedCoef = -1;
	main.setLayout(new BarWavesLayout());
	cv = new BarWavesCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);

	setupChooser = new Choice();
	int i;
	for (i = 0; i != setupList.size(); i++)
	    setupChooser.add("Setup: " +
			     ((Setup) setupList.elementAt(i)).getName());
	setup = (Setup) setupList.elementAt(0);
	setupChooser.addItemListener(this);
	main.add(setupChooser);

	main.add(sineButton = new Button("Fundamental"));
	sineButton.addActionListener(this);
	main.add(blankButton = new Button("Clear"));
	blankButton.addActionListener(this);
	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	main.add(stoppedCheck);
	soundCheck = new Checkbox("Sound", false);
	soundCheck.addItemListener(this);
	main.add(soundCheck);
	
	modeChooser = new Choice();
	modeChooser.add("Mouse = Shape bar");
	modeChooser.add("Mouse = Apply static force");
	modeChooser.addItemListener(this);
	main.add(modeChooser);

	displayChooser = new Choice();
	displayChooser.add("Display Phases");
	displayChooser.add("Display Phase Cosines");
	displayChooser.add("Display Modes");
	displayChooser.addItemListener(this);
	main.add(displayChooser);

	main.add(new Label("Simulation Speed", Label.CENTER));
	main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 166, 1, 24, 300));
	speedBar.addAdjustmentListener(this);

	main.add(new Label("Damping", Label.CENTER));
	main.add(dampingBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 400));
	dampingBar.addAdjustmentListener(this);

	main.add(new Label("Resolution", Label.CENTER));
	main.add(loadBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    maxTerms, 1, 40, maxMaxTerms));
	loadBar.addAdjustmentListener(this);
	setLoadCount();

	main.add(new Label("Base Frequency", Label.CENTER));
	main.add(baseFreqBar = new Scrollbar(Scrollbar.HORIZONTAL,
					105, 12, 30, 168));
	baseFreqBar.addAdjustmentListener(this);
	baseFreqBar.disable();

	main.add(new Label("String Stiffness", Label.CENTER));
	main.add(stiffnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 100));
	stiffnessBar.addAdjustmentListener(this);
	stiffnessBar.disable();

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	
	magcoef = new double[maxMaxTerms];
	phasecoef = new double[maxMaxTerms];
	phasecoefcos = new double[maxMaxTerms];
	phasecoefadj = new double[maxMaxTerms];
	func = new double[maxMaxTerms+1];
	funci = new double[maxMaxTerms+1];
	xpoints = new int[4];
	ypoints = new int[4];

	random = new Random();
	setDamping();
	reinit();
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
//	resize(500, 500);
//	handleResize();
//	show();
 }

 void reinit() {
	doFundamental();
 }
 
 boolean shown = false;

	public void triggerShow() {
		if (!shown)
			setVisible(true);
		shown = true;
	}

 void handleResize() {
     Dimension d = winSize = cv.getSize();
     System.out.println(d);
	if (winSize.width == 0)
	    return;
	dbimage = cv.createImage(d.width, d.height);
 }
 
 void doFundamental() {
	doBlank();
	magcoef[0] = 1;
	if (soundCheck.getState())
	    doPlay();
 }

 void doBlank() {
	int x;
	for (x = 0; x <= sampleCount; x++)
	    func[x] = 0;
	transform(true);
 }

 void transform(boolean novel) {
	int x, y;
	t = 0;
	for (y = 0; y != modeCount; y++) {
	    double a = 0;
	    double b = 0;
	    for (x = 1; x != sampleCount; x++) {
		a += modeTable[x][y]*func[x];
		b -= modeTable[x][y]*funci[x];
	    }
	    a /= modeNorms[y];
	    b /= omega[y]*modeNorms[y];
	    if (a < epsilon && a > -epsilon) a = 0;
	    if (b < epsilon && b > -epsilon) b = 0;
	    if (novel)
		b = 0;
	    double r = java.lang.Math.sqrt(a*a+b*b);
	    magcoef[y] = r;
	    double ph2 = java.lang.Math.atan2(b, a);
	    phasecoefadj[y] = ph2;
	    phasecoef[y] = ph2;
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

 public void updateBarWaves(Graphics realg) {
	if (winSize == null || winSize.width == 0 || dbimage == null)
	    return;
	Graphics g = dbimage.getGraphics();
	boolean allQuiet = true;
	if (!stoppedCheck.getState()) {
	    int val = speedBar.getValue()-100;
	    //if (val > 40)
	    //val += getrand(10);
	    double tadd = java.lang.Math.exp(val/20.)*(.1/50);
	    // add random crap into the time to avoid aliasing
	    tadd *= 1 + getrand(300)*(.00191171);
	    t += tadd;
	}
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());
	int i;
	int panelHeight = getPanelHeight();
	int midy = panelHeight / 2;
	int halfPanel = panelHeight / 2;
	double ymult = .75 * halfPanel;
	for (i = -1; i <= 1; i++) {
	    g.setColor((i == 0) ? gray2 : gray1);
	    g.drawLine(0,             midy+(i*(int) ymult),
		       winSize.width, midy+(i*(int) ymult));
	}
	g.setColor(gray2);
	g.drawLine(winSize.width/2, midy-(int) ymult,
		   winSize.width/2, midy+(int) ymult);
	int sampStart = (setup.leftBoundary() == BOUND_FREE) ? 1 : 0;
	int sampEnd = sampleCount-
	    ((setup.rightBoundary() == BOUND_FREE) ? 1 : 0);
	if (dragging && selection == SEL_FUNC) {
	    g.setColor(Color.cyan);
	    allQuiet = true;
	    for (i = sampStart; i <= sampEnd; i++) {
		int x = winSize.width * i / sampleCount;
		int y = midy - (int) (ymult * func[i]);
		drawBarPiece(g, x, y, i, sampStart);
	    }
	}
	if (!stoppedCheck.getState() && !dragging) {
	    for (i = 0; i != modeCount; i++)
		magcoef[i] *= dampcoef[i];
	}

	double magcoefdisp[] = magcoef;
	double phasecoefdisp[] = phasecoef;
	double phasecoefcosdisp[] = phasecoefcos;

	if (!(dragging && selection == SEL_FUNC)) {
	    g.setColor(Color.white);
	    int j;
	    for (j = 0; j != modeCount; j++) {
		if (magcoef[j] < epsilon && magcoef[j] > -epsilon) {
		    magcoef[j] = phasecoef[j] = phasecoefadj[j] = 0;
		    continue;
		}
		allQuiet = false;
		phasecoef[j] = (omega[j]*t+phasecoefadj[j]) % (2*pi);
		if (phasecoef[j] > pi)
		    phasecoef[j] -= 2*pi;
		else if (phasecoef[j] < -pi)
		    phasecoef[j] += 2*pi;
		phasecoefcos[j] = java.lang.Math.cos(phasecoef[j]);
	    }

	    for (i = sampStart; i <= sampEnd; i++) {
		int x = winSize.width * i / sampleCount;
		double dy = 0;
		for (j = 0; j != modeCount; j++)
		    dy += magcoefdisp[j] *
			modeTable[i][j] * phasecoefcosdisp[j];
		func[i] = dy;
		int y = midy - (int) (ymult * dy);
		drawBarPiece(g, x, y, i, sampStart);
	    }
	    if (setup.getThickness() == 0) {
		if (setup.leftBoundary() == BOUND_FREE)
		    drawPin(g, 1, midy, ymult);
		if (setup.rightBoundary() == BOUND_FREE)
		    drawPin(g, sampleCount-1, midy, ymult);
	    }
	}
	if (selectedCoef != -1 && !dragging &&
	    (magcoefdisp[selectedCoef] > .04 ||
	     magcoefdisp[selectedCoef] < -.04)) {
	    g.setColor(Color.yellow);
	    ymult *= magcoefdisp[selectedCoef];
	    for (i = sampStart; i <= sampEnd; i++) {
		int x = winSize.width * i / sampleCount;
		double dy = modeTable[i][selectedCoef] *
		    phasecoefcosdisp[selectedCoef];
		int y = midy - (int) (ymult * dy);
		drawBarPiece(g, x, y, i, sampStart);
	    }
	}
	if (selectedCoef != -1) {
	    int f = getFreq(selectedCoef);
	    g.setColor(Color.yellow);
	    centerString(g, f  + " Hz", panelHeight);
	} else if (soundCheck.getState()) {
	    int f = getFreq(0);
	    g.setColor(Color.white);
	    centerString(g, "Fundamental = " + f + " Hz", panelHeight);
	}
	int termWidth = getTermWidth();
	ymult = .6 * halfPanel;
	g.setColor(Color.white);
	if (displayChooser.getSelectedIndex() == DISP_PHASE ||
	    displayChooser.getSelectedIndex() == DISP_PHASECOS)
	    magnitudesY = panelHeight;
	else
	    magnitudesY = panelHeight*2;
	midy = magnitudesY + (panelHeight / 2) + (int) ymult/2;
	g.setColor(gray2);
	g.drawLine(0, midy, winSize.width, midy);
	g.setColor(gray1);
	g.drawLine(0, midy-(int)ymult, winSize.width, midy-(int) ymult);
	g.drawLine(0, midy+(int)ymult, winSize.width, midy+(int) ymult);
	g.drawLine(0, midy-(int)ymult/4, winSize.width, midy-(int) ymult/4);
	g.drawLine(0, midy+(int)ymult/4, winSize.width, midy+(int) ymult/4);
	int dotSize = termWidth-3;
	if (dotSize < 3)
	    dotSize = 3;
	for (i = 0; i != modeCount; i++) {
	    int t = termWidth * i + termWidth/2;
	    int y = midy - (int) (logcoef(magcoefdisp[i])*ymult);
	    g.setColor(i == selectedCoef ? Color.yellow : Color.white);
	    g.drawLine(t, midy, t, y);
	    g.fillOval(t-dotSize/2, y-dotSize/2, dotSize, dotSize);
	}

	if (displayChooser.getSelectedIndex() == DISP_PHASE ||
	    displayChooser.getSelectedIndex() == DISP_PHASECOS) {
	    g.setColor(Color.white);
	    boolean cosines =
		displayChooser.getSelectedIndex() == DISP_PHASECOS;
	    ymult = .75 * halfPanel;
	    midy = ((panelHeight * 5) / 2);
	    for (i = -2; i <= 2; i++) {
		if (cosines && (i == 1 || i == -1))
		    continue;
		g.setColor((i == 0) ? gray2 : gray1);
		g.drawLine(0,             midy+(i*(int) ymult)/2,
			   winSize.width, midy+(i*(int) ymult)/2);
	    }
	    if (!cosines)
		ymult /= pi;
	    for (i = 0; i != modeCount; i++) {
		int t = termWidth * i + termWidth/2;
		double ph = (cosines) ? phasecoefcosdisp[i] : phasecoefdisp[i];
		if (magcoef[i] > -epsilon2/4 && magcoefdisp[i] < epsilon2/4)
		    ph = 0;
		int y = midy - (int) (ph*ymult);
		g.setColor(i == selectedCoef ? Color.yellow : Color.white);
		g.drawLine(t, midy, t, y);
		g.fillOval(t-dotSize/2, y-dotSize/2, dotSize, dotSize);
	    }
	} else if (displayChooser.getSelectedIndex() == DISP_MODES) {
	    int sqw = (winSize.width-25)/3;
	    int sqh = (int) (sqw/pi);
	    int topY = panelHeight;
	    int leftX = 0;
	    int ox, oy = -1;
	    for (i = 0; i != modeCount; i++) {
		if (!(magcoefdisp[i] > .06 ||
		      magcoefdisp[i] < -.06))
		    continue;
		g.setColor(gray2);
		int centerX = leftX+sqw/2;
		int centerY = topY+sqh/2;
		g.drawLine(leftX, centerY, leftX+sqw, centerY);
		g.drawLine(centerX, topY, centerX, topY+sqh);
		g.setColor(i == selectedCoef ? Color.yellow : Color.white);
		g.drawRect(leftX, topY, sqw, sqh);
		ox = -1;
		ymult = sqh*.5*magcoefdisp[i];
		int j;
		for (j = sampStart; j <= sampEnd; j++) {
		    int x = leftX + sqw * j / sampleCount;
		    double dy = modeTable[j][i] * phasecoefcosdisp[i];
		    int y = centerY - (int) (ymult * dy);
		    if (ox != -1)
			g.drawLine(ox, oy, x, y);
		    ox = x;
		    oy = y;
		}
		leftX += sqw+10;
		if (leftX + sqw > winSize.width) {
		    leftX = 0;
		    topY += sqh + 10;
		    if (topY+sqh > panelHeight*2)
			break;
		}
	    }
	}
	realg.drawImage(dbimage, 0, 0, this);
	if (!stoppedCheck.getState() && !allQuiet)
	    cv.repaint(pause);
 }

 void drawPin(Graphics g, int pos, int midy, double ymult) {
	int x = winSize.width*pos/sampleCount;
	g.setColor(gray2);
	g.drawLine(x, (int) (midy-ymult),
		   x, (int) (midy+ymult));
	g.setColor(Color.white);
	g.fillOval(x-2, midy-(int) (func[pos]*ymult)-2, 5, 5);
 }

 int getTermWidth() {
	int termWidth = winSize.width / modeCount;
	int maxTermWidth = winSize.width/30;
	if (termWidth > maxTermWidth)
	    termWidth = maxTermWidth;
	termWidth &= ~1;
	return termWidth;
 }

 void getVelocities() {
	int k, j;
	for (j = 0; j != sampleCount; j++) {
	    double dy = 0;
	    for (k = 0; k != modeCount; k++)
		dy += magcoef[k] * modeTable[j][k] *
		    java.lang.Math.sin(phasecoef[k]) * omega[k];
	    funci[j] = -dy;
	}
 }

 void drawBarPiece(Graphics g, int x, int y, int i, int sampStart) {
	int thick = setup.getThickness();
	xpoints[0] = xpoints[3];
	ypoints[0] = ypoints[3];
	xpoints[1] = xpoints[2];
	ypoints[1] = ypoints[2];
	xpoints[2] = x;
	ypoints[2] = y-thick;
	xpoints[3] = x;
	ypoints[3] = y+thick;
	if (i != sampStart) {
	    if (thick == 0)
		g.drawLine(xpoints[0], ypoints[0], xpoints[2], ypoints[2]);
	    else
		g.fillPolygon(xpoints, ypoints, 4);
	}
 }

 void edit(MouseEvent e) {
	if (selection == SEL_NONE)
	    return;
	int x = e.getX();
	int y = e.getY();
	switch (selection) {
	case SEL_MAG:   editMag(x, y);   break;
	case SEL_FUNC:  editFunc(x, y);  break;
	}
 }

 void editMag(int x, int y) {
	if (selectedCoef == -1)
	    return;
	int panelHeight = getPanelHeight();
	double ymult = .6 * panelHeight/2;
	double midy = magnitudesY + (panelHeight / 2) + (int) ymult/2;
	double coef = -(y-midy) / ymult;
	coef = unlogcoef(coef);
	if (coef < -1)
	    coef = -1;
	if (coef > 1)
	    coef = 1;
	if (magcoef[selectedCoef] == coef)
	    return;
	magcoef[selectedCoef] = coef;
	cv.repaint(pause);
 }

 void editFunc(int x, int y) {
	if (modeChooser.getSelectedIndex() == MODE_FORCE) {
	    editFuncForce(x, y);
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
 
 double logep2 = 0;
 double logcoef(double x) {
	if (x >= .25 || x <= -.25)
	    return x;
	x *= 4;
	double ep2 = epsilon2;
	int sign = (x < 0) ? -1 : 1;
	x *= sign;
	if (x < ep2)
	    return 0;
	if (logep2 == 0)
	    logep2 = -java.lang.Math.log(2*ep2);
	return .25 * sign * (java.lang.Math.log(x+ep2)+logep2)/logep2;
 }

 double unlogcoef(double x) {
	if (x >= .25 || x <= -.25)
	    return x;
	double ep2 = epsilon2;
	int sign = (x < 0) ? -1 : 1;
	return .25*sign*(java.lang.Math.exp(4*x*sign*logep2-logep2)-ep2);
 }

 void editFuncPoint(int x, int y) {
	int panelHeight = getPanelHeight();
	int midy = panelHeight / 2;
	int halfPanel = panelHeight / 2;
	int periodWidth = winSize.width;
	double ymult = .75 * halfPanel;
	int lox = x * sampleCount / periodWidth;
	int hix = ((x+1) * sampleCount-1) / periodWidth;
	double val = (midy - y) / ymult;
	if (val > 1)
	    val = 1;
	if (val < -1)
	    val = -1;
	if (lox < 1)
	    lox = 1;
	if (hix >= sampleCount)
	    hix = sampleCount-1;
	for (; lox <= hix; lox++) {
	    if (modeChooser.getSelectedIndex() == MODE_THICKNESS) {
		thickness[lox] = (midy < y) ? (y-midy)*2 : (midy-y)*2;
		if (thickness[lox] == 0)
		    thickness[lox] = 1;
	    } else {
		func[lox] = val;
		funci[lox] = 0;
	    }
	}
	func[sampleCount] = func[0];
	cv.repaint(pause);
	if (soundCheck.getState() == false)
	    transform(false);
 }

 void editFuncForce(int x, int y) {
	int panelHeight = getPanelHeight();
	int midy = panelHeight / 2;
	int halfPanel = panelHeight / 2;
	int periodWidth = winSize.width;
	double ymult = .75 * halfPanel;
	int ax = x * sampleCount / periodWidth;
	double val = (midy - y) / ymult;
	if (val > 1)
	    val = 1;
	if (val < -1)
	    val = -1;
	if (ax < 1 || ax >= sampleCount)
	    return;

	// solve equation A x = b, using diagonalized A,
	// A = M Lambda M^-1.  x = M Lambda^-1 M^-1 b.  b is
	// all zeros except at ax where it is 1.
	double q[] = new double[modeCount];
	int i, j;
	
	// multiply b by Lambda^-1 M^-1.  M^-1 has eigenvectors as rows
	// (with the norm of each eigenvector divided out).  Lambda^-1
	// is a diagonal matrix with 1/lambdas as elements (lambda=omega^2)
	for (i = 0; i != modeCount; i++)
	    q[i] = modeTable[ax][i]/(omega[i]*omega[i]*modeNorms[i]);

	// multiply q by M to get result.  M has eigenvectors as columns.
	for (i = 0; i != sampleCount; i++) {
	    double dy = 0;
	    for (j = 0; j != modeCount; j++)
		dy += q[j]*modeTable[i][j];
	    func[i] = dy;
	}

	// ok now we just scale the whole thing so we get the answer
	// we want at ax.
	double mult = val/func[ax];
	for (i = 0; i <= sampleCount; i++) {
	    func[i] *= mult;
	    funci[i] = 0;
	}
	
	cv.repaint(pause);
	if (soundCheck.getState() == false)
	    transform(true);
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
	if (e.getSource() == sineButton) {
	    doFundamental();
	    cv.repaint();
	}
	if (e.getSource() == blankButton) {
	    doBlank();
	    cv.repaint();
	}
 }

 public void adjustmentValueChanged(AdjustmentEvent e) {
	//System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == dampingBar || e.getSource() == speedBar)
	    setDamping();
	if (e.getSource() == loadBar)
	    setLoadCount();
	if (e.getSource() == stiffnessBar)
	    genModes();
	cv.repaint(pause);
 }

 public boolean handleEvent(Event ev) {
     if (ev.id == Event.WINDOW_DESTROY) {
         if (applet == null) dispose();
         else applet.destroyFrame();
         return true;
     }
     return super.handleEvent(ev);
 }

 void setLoadCount() {
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	sampleCount = maxTerms = loadBar.getValue();
	step = pi/sampleCount;
	int x, y;
	thickness = new int[sampleCount+1];
	int i;
	for (i = 0; i <= sampleCount; i++)
	    thickness[i] = 5;
	genModes();
	setDamping();
 }

 void setDamping() {
	int i;
	dampcoef = new double[modeCount];
	double tadd = java.lang.Math.exp((speedBar.getValue()-100)/20.)*(.1/50);
	for (i = 0; i != modeCount; i++) {
	    double damper = java.lang.Math.exp(dampingBar.getValue()/40-3)*30;
	    if (dampingBar.getValue() <= 2)
		damper = 0;
	    double damp2 = omega[i]*java.lang.Math.sqrt(
           java.lang.Math.sqrt(1+damper*damper/(omega[i]*omega[i]))-1);
	    dampcoef[i] = java.lang.Math.exp(-damp2*tadd*.004);
	}
 }

 public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
 }
 public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	handleMouseMotion(e);
 }
 
 void handleMouseMotion(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
	int panelHeight = getPanelHeight();
	int oldCoef = selectedCoef;
	selectedCoef = -1;
	selection = 0;
	if (y < panelHeight)
	    selection = SEL_FUNC;
	if (y >= magnitudesY && y < magnitudesY+panelHeight) {
	    int termWidth = getTermWidth();
	    selectedCoef = x/termWidth;
	    if (selectedCoef >= modeCount)
		selectedCoef = -1;
	    if (selectedCoef != -1)
		selection = SEL_MAG;
	}
	if (selectedCoef != oldCoef)
	    cv.repaint(pause);
 }
 public void mouseClicked(MouseEvent e) {
	if (e.getClickCount() == 2 && selectedCoef != -1) {
	    int i;
	    for (i = 0; i != modeCount; i++)
		if (selectedCoef != i)
		    magcoef[i] = 0;
	    magcoef[selectedCoef] = 1;
	    cv.repaint(pause);
	}
 }
 public void mouseEntered(MouseEvent e) {
 }
 public void mouseExited(MouseEvent e) {
	if (!dragging && selectedCoef != -1) {
	    selectedCoef = -1;
	    cv.repaint(pause);
	}
 }
 public void mousePressed(MouseEvent e) {
	 handleMouseMotion(e); // needed for mobile
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	if (selection == SEL_FUNC)
	    getVelocities();
	dragging = true;
	edit(e);
 }
 public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	if (dragging && selection == SEL_FUNC) {
	    if (modeChooser.getSelectedIndex() == MODE_THICKNESS)
		genModes();
	    else {
		transform(false);
		if (soundCheck.getState())
		    doPlay();
	    }
	}
	if (dragging && selection == SEL_MAG && soundCheck.getState())
	    doPlay();
	dragging = false;
	cv.repaint(pause);
 }
 public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() == stoppedCheck) {
	    cv.repaint(pause);
	    return;
	}
	if (e.getItemSelectable() == soundCheck) {
	    if (soundCheck.getState()) {
		speedBar.setValue(250);
		dampingBar.setValue(170);
		baseFreqBar.enable();
		setDamping();
		doPlay();
	    } else
		baseFreqBar.disable();
	}
	if (e.getItemSelectable() == displayChooser)
	    cv.repaint(pause);
	if (e.getItemSelectable() == setupChooser) {
	    setLoadCount();
	    if (setup instanceof StiffStringSetup)
		stiffnessBar.enable();
	    else
		stiffnessBar.disable();
	}
 }

 void dodiff(double matrix[][], int r, int i, int n, double mult) {
	if (i < 1 && setup.leftBoundary() == BOUND_HINGED)
	    return;
	if (i > sampleCount-1 && setup.rightBoundary() == BOUND_HINGED)
	    return;

	if (n == 2 && !(setup instanceof StringSetup)) {
	    if (i <= 1 && setup.leftBoundary() == BOUND_FREE)
		return;
	    if (i >= sampleCount-1 && setup.rightBoundary() == BOUND_FREE)
		return;
	}

	if (n > 0) {
	    dodiff(matrix, r, i-1, n-2, -mult);
	    dodiff(matrix, r, i+1, n-2, -mult);
	    dodiff(matrix, r, i, n-2, mult*2);
	    return;
	}
	if (i >= 1 && i <= sampleCount-1)
	    matrix[r][i] += mult;
 }

	void genModes() {
		int n = sampleCount - 1;
		double matrix[][] = new double[n + 1][n + 1];
		double d[] = new double[n + 1];
		double e[] = new double[n + 1];
		int i, j;
		for (i = 1; i <= n; i++)
			setup.doMatrixStep(matrix, i, n);

		if (setup instanceof StringSetup) {
			if (setup.leftBoundary() == BOUND_FREE)
				matrix[1][1]--;
			if (setup.rightBoundary() == BOUND_FREE)
				matrix[n][n]--;
		}

//		for (j = 1; j <= n; j++) {
//			for (i = 1; i <= n; i++) {
//				System.out.print(matrix[i][j] + " ");
//			}
//			System.out.print("\n");
//		}

		tred2(matrix, n, d, e);
		tqli(d, e, n, matrix);

		modeCount = sampleCount - 1;
		omega = new double[modeCount];

		// now get the eigenvalues and sort them
		int omegamap[] = new int[sampleCount];
		for (i = j = 0; i != n; i++) {
			if (d[i + 1] < 1e-8) {
				modeCount--;
				continue;
			}
			omega[j] = java.lang.Math.sqrt(d[i + 1]);
			omegamap[j] = i;
			j++;
		}

		int si, sj;
		// sort the omegas
		for (si = 1; si < modeCount; si++) {
			double v = omega[si];
			int vm = omegamap[si];
			sj = si;
			while (omega[sj - 1] > v) {
				omega[sj] = omega[sj - 1];
				omegamap[sj] = omegamap[sj - 1];
				sj--;
				if (sj <= 0)
					break;
			}
			omega[sj] = v;
			omegamap[sj] = vm;
		}

		modeTable = new double[sampleCount + 1][modeCount];
		modeNorms = new double[modeCount];
		for (i = 0; i != modeCount; i++) {
			int om = omegamap[i] + 1;
			double maxf = 0;
			for (j = 0; j != sampleCount; j++) {
				modeTable[j][i] = matrix[j][om];
				if (modeTable[j][i] > maxf)
					maxf = modeTable[j][i];
				if (-modeTable[j][i] > maxf)
					maxf = -modeTable[j][i];
			}
			modeNorms[i] = 1 / (maxf * maxf);
			for (j = 0; j != sampleCount; j++)
				modeTable[j][i] /= maxf;
		}

		double mult = 1 / omega[0];
		for (i = 0; i != modeCount; i++)
			omega[i] *= mult;
	}

 
 void tred2(double a[][], int n, double d[], double e[]) {
	    int l,k,j,i;
	    double scale,hh,h,g,f;
	
	    // this loop gets faster as i decreases
	    for (i=n;i>=2;i--) {
		l=i-1;
		h=scale=0.0;
		if (l > 1) {
		    for (k=1;k<=l;k++)
			scale += java.lang.Math.abs(a[i][k]);
		    if (scale == 0.0)
			e[i]=a[i][l];
		    else {
			for (k=1;k<=l;k++) {
			    a[i][k] /= scale;
			    h += a[i][k]*a[i][k];
			}
			f=a[i][l];
			g=(f >= 0.0 ? -java.lang.Math.sqrt(h) : java.lang.Math.sqrt(h));
			e[i]=scale*g;
			h -= f*g;
			a[i][l]=f-g;
			f=0.0;
			for (j=1;j<=l;j++) {
			    a[j][i]=a[i][j]/h;
			    g=0.0;
			    for (k=1;k<=j;k++)
				g += a[j][k]*a[i][k];
			    for (k=j+1;k<=l;k++)
				g += a[k][j]*a[i][k];
			    e[j]=g/h;
			    f += e[j]*a[i][j];
			}
			hh=f/(h+h);
			for (j=1;j<=l;j++) {
			    f=a[i][j];
			    e[j]=g=e[j]-hh*f;
			    for (k=1;k<=j;k++)
				a[j][k] -= (f*e[k]+g*a[i][k]);
			}
		    }
		} else
		    e[i]=a[i][l];
		d[i]=h;
	    }
	    d[1]=0.0;
	    e[1]=0.0;
	    /* Contents of this loop can be omitted if eigenvectors not
	       wanted except for statement d[i]=a[i][i]; */
	    // speed decreases as i increases
	    for (i=1;i<=n;i++) {
		l=i-1;
		if (d[i] != 0) {
		    for (j=1;j<=l;j++) {
			g=0.0;
			for (k=1;k<=l;k++)
			    g += a[i][k]*a[k][j];
			for (k=1;k<=l;k++)
			    a[k][j] -= g*a[k][i];
		    }
		}
		d[i]=a[i][i];
		a[i][i]=1.0;
		for (j=1;j<=l;j++) a[j][i]=a[i][j]=0.0;
	    }
	}
 
	// this is from Numerical Recipes in C.  It finds the eigenvalues
	// and eigenvectors of an nxn tridiagonal symmetric matrix specified
	// by d[] and e[].
	void tqli(double d[], double e[], int n, double z[][]) {
	    int m,l,iter,i,k;
	    double s,r,p,g,f,dd,c,b;
   
	    for (i=2;i<=n;i++) e[i-1]=e[i];
	    e[n]=0.0;
	    // faster as l increases
	    for (l=1;l<=n;l++) {
		iter=0;
		do {
		    for (m=l;m<=n-1;m++) {
			dd=java.lang.Math.abs(d[m])+java.lang.Math.abs(d[m+1]);
			if ((double)(java.lang.Math.abs(e[m])+dd) == dd) break;
		    }
		    if (m != l) {
			if (iter++ == 30)
			    System.out.print("Too many iterations in tqli\n");
			g=(d[l+1]-d[l])/(2.0*e[l]);
			r=pythag(g,1.0);
			g=d[m]-d[l]+e[l]/(g+SIGN(r,g));
			s=c=1.0;
			p=0.0;
			for (i=m-1;i>=l;i--) {
			    f=s*e[i];
			    b=c*e[i];
			    e[i+1]=(r=pythag(f,g));
			    if (r == 0.0) {
				d[i+1] -= p;
				e[m]=0.0;
				break;
			    }
			    s=f/r;
			    c=g/r;
			    g=d[i+1]-p;
			    r=(d[i]-g)*s+2.0*c*b;
			    d[i+1]=g+(p=s*r);
			    g=c*r-b;
			    for (k=1;k<=n;k++) {
				f=z[k][i+1];
				z[k][i+1]=s*z[k][i]+c*f;
				z[k][i]=c*z[k][i]-s*f;
			    }
			}
			if (r == 0.0 && i >= l) continue;
			d[l] -= p;
			e[l]=g;
			e[m]=0.0;
		    }
		} while (m != l);
	    }
	}

	double SIGN(double a, double b) {
	    return b >= 0 ? java.lang.Math.abs(a) : -java.lang.Math.abs(a);
	}

	double SQR(double a) {
	    return a*a;
	}

	double pythag(double a, double b) {
	    double absa,absb;
	    absa=java.lang.Math.abs(a);
	    absb=java.lang.Math.abs(b);
	    if (absa > absb)
		return absa*java.lang.Math.sqrt(1.0+SQR(absb/absa));
	    else
		return (absb == 0.0 ? 0.0 : absb*java.lang.Math.sqrt(1.0+SQR(absa/absb)));
	}

 abstract class Setup {
	abstract String getName();
	abstract Setup createNext();
	abstract int leftBoundary();
	abstract int rightBoundary();
	int getThickness() { return 3; }
	void doMatrixStep(double matrix[][], int i, int n) {
	    dodiff(matrix, i, i, 4, 1);
	}
 };

 class FreeBarSetup extends Setup {
	String getName() { return "bar, free"; }
	Setup createNext() { return new HingedBarSetup(); }
	int leftBoundary() { return BOUND_FREE; }
	int rightBoundary() { return BOUND_FREE; }
 };

 class HingedBarSetup extends Setup {
	String getName() { return "bar, hinged"; }
	Setup createNext() { return new ClampedBarSetup(); }
	int leftBoundary() { return BOUND_HINGED; }
	int rightBoundary() { return BOUND_HINGED; }
 };

 class ClampedBarSetup extends Setup {
	String getName() { return "bar, clamped"; }
	Setup createNext() { return new ClampedFreeBarSetup(); }
	int leftBoundary() { return BOUND_CLAMPED; }
	int rightBoundary() { return BOUND_CLAMPED; }
 };

 class ClampedFreeBarSetup extends Setup {
	String getName() { return "bar, clamped/free"; }
	Setup createNext() { return new HingedClampedBarSetup(); }
	int leftBoundary() { return BOUND_CLAMPED; }
	int rightBoundary() { return BOUND_FREE; }
 };

 class HingedClampedBarSetup extends Setup {
	String getName() { return "bar, hinged/clamped"; }
	Setup createNext() { return new StringSetup(); }
	int leftBoundary() { return BOUND_HINGED; }
	int rightBoundary() { return BOUND_CLAMPED; }
 };

 class StringSetup extends Setup {
	String getName() { return "string, pinned"; }
	void doMatrixStep(double matrix[][], int i, int n) {
	    dodiff(matrix, i, i, 2, 1);
	}
	Setup createNext() { return new String1FreeSetup(); }
	int leftBoundary() { return BOUND_HINGED; }
	int rightBoundary() { return BOUND_HINGED; }
	int getThickness() { return 0; }
 };

 class String1FreeSetup extends StringSetup {
	String getName() { return "string, pinned/free"; }
	Setup createNext() { return new String2FreeSetup(); }
	int rightBoundary() { return BOUND_FREE; }
 };

 class String2FreeSetup extends String1FreeSetup {
	String getName() { return "string, free/free"; }
	Setup createNext() { return new StiffStringSetup(); }
	int leftBoundary() { return BOUND_FREE; }
 };

 class StiffStringSetup extends StringSetup {
	String getName() { return "stiff string, pinned"; }
	void doMatrixStep(double matrix[][], int i, int n) {
	    dodiff(matrix, i, i, 2, 1);
	    double stiff = stiffnessBar.getValue()*.1;
	    dodiff(matrix, i, i, 4, stiff);
	}
	Setup createNext() { return new StiffStringClampedSetup(); }
 };

 class StiffStringClampedSetup extends StiffStringSetup {
	String getName() { return "stiff string, clamped"; }
	Setup createNext() { return null; }
	int leftBoundary() { return BOUND_CLAMPED; }
	int rightBoundary() { return BOUND_CLAMPED; }
 };

  
 static final int to_ulaw[] = {
	0,    0,    0,    0,    0,    1,    1,    1,
	1,    2,    2,    2,    2,    3,    3,    3,
	3,    4,    4,    4,    4,    5,    5,    5,
	5,    6,    6,    6,    6,    7,    7,    7,
	7,    8,    8,    8,    8,    9,    9,    9,
	9,   10,   10,   10,   10,   11,   11,   11,
	11,   12,   12,   12,   12,   13,   13,   13,
	13,   14,   14,   14,   14,   15,   15,   15,
	15,   16,   16,   17,   17,   18,   18,   19,
	19,   20,   20,   21,   21,   22,   22,   23,
	23,   24,   24,   25,   25,   26,   26,   27,
	27,   28,   28,   29,   29,   30,   30,   31,
	31,   32,   33,   34,   35,   36,   37,   38,
	39,   40,   41,   42,   43,   44,   45,   46,
	47,   49,   51,   53,   55,   57,   59,   61,
	63,   66,   70,   74,   78,   84,   92,  104,
	254,  231,  219,  211,  205,  201,  197,  193,
	190,  188,  186,  184,  182,  180,  178,  176,
	175,  174,  173,  172,  171,  170,  169,  168,
	167,  166,  165,  164,  163,  162,  161,  160,
	159,  159,  158,  158,  157,  157,  156,  156,
	155,  155,  154,  154,  153,  153,  152,  152,
	151,  151,  150,  150,  149,  149,  148,  148,
	147,  147,  146,  146,  145,  145,  144,  144,
	143,  143,  143,  143,  142,  142,  142,  142,
	141,  141,  141,  141,  140,  140,  140,  140,
	139,  139,  139,  139,  138,  138,  138,  138,
	137,  137,  137,  137,  136,  136,  136,  136,
	135,  135,  135,  135,  134,  134,  134,  134,
	133,  133,  133,  133,  132,  132,  132,  132,
	131,  131,  131,  131,  130,  130,  130,  130,
	129,  129,  129,  129,  128,  128,  128,  128
 };

 

 double sndmin, sndmax;

 int getFreq(int n) {
	double stepsize = java.lang.Math.log(2)/12;
	double freq = java.lang.Math.exp(baseFreqBar.getValue()*stepsize);
	return (int) (freq*omega[n]);
 }

	void doPlay() {
		final int rate = 8000;
		final int sampcount = rate;

		byte b[] = new byte[sampcount];
				
		double stepsize = java.lang.Math.log(2) / 12;
		double freq = java.lang.Math.exp(baseFreqBar.getValue() * stepsize);
		double n = 2 * pi * freq / rate;
		n /= omega[0];
		// filter out frequencies above Nyquist freq
		double maxomega = pi / n;
		int m = modeCount;
		while (m > 0 && omega[m - 1] > maxomega)
			m--;
		if (m == 0)
			return;
		// filter out frequencies less than 20 Hz (we do that so that
		// they do not throw off the bounds checking of the waveform)
		int m0 = 0;
		// freq = rate*omega*n/(2*pi)
		double minomega = 20 * 2 * pi / (rate * n);
		while (m0 < m && omega[m0] < minomega)
			m0++;
		if (m0 == m)
			return;
		boolean failed;
		int i;
		int sampWindow = rate / 40;
		int offset = 0;
		double lastscale = 1000;
		double mag[] = new double[modeCount];
		for (i = 0; i != modeCount; i++)
			mag[i] = magcoef[i];
		do {
			failed = false;
			double mn = (-sndmin > sndmax) ? -sndmin : sndmax;
			if (mn < .02)
				mn = .02;
			double scale = 126 / mn;
			if (scale > lastscale)
				scale = lastscale;
			sndmin = sndmax = 0;
			for (i = 0; i != sampWindow; i++) {
				double dy = 0;
				int j;
				int ii = i + offset;
				for (j = m0; j != m; j++)
					dy += mag[j] * java.lang.Math.sin(ii * n * omega[j]) * scale;
				if (dy < sndmin)
					sndmin = dy;
				if (dy > sndmax)
					sndmax = dy;
				if (dy < -127 || dy > 127)
					failed = true;
				else {
					b[ii] = (byte) to_ulaw[128 + (int) dy];
				}
			}
			sndmin /= scale;
			sndmax /= scale;
			if (failed)
				continue;
			offset += sampWindow;
			for (i = 0; i != modeCount; i++)
				mag[i] *= dampcoef[i];
			if (offset >= sampcount)
				break;
		} while (true);

		new JSAudioThread().playULawData(b);
		
		cv.repaint();
	}

 class BarWavesCanvas extends Canvas {
	 BarWavesFrame pg;
	 BarWavesCanvas(BarWavesFrame p) {
		pg = p;
	 }
	 public Dimension getPreferredSize() {
		return new Dimension(300,400);
	 }
	 public void update(Graphics g) {
		pg.updateBarWaves(g);
	 }
	 public void paint(Graphics g) {
		pg.updateBarWaves(g);
	 }
	};
	
	class BarWavesLayout implements LayoutManager {
	 public BarWavesLayout() {}
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

};
