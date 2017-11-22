package com.falstad;
// Antenna.java (c) 2004 by Paul Falstad, www.falstad.com



import java.io.InputStream;
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
import java.awt.image.ImageProducer;
import java.util.Vector;
import java.io.File;
import java.util.Random;
import java.util.Arrays;
import java.awt.image.MemoryImageSource;
import java.lang.Math;
import java.text.NumberFormat;

import a2s.Applet;
import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Scrollbar;

//web_Ready
//web_AppletName= Antenna
//web_Description= Generates antenna radiation patterns
//web_JavaVersion= http://www.falstad.com/antenna/
//web_AppletImage= antenna.png
//web_Category= Physics - Electronics
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features: graphics, AWT-to-Swing

class AntennaCanvas extends Canvas {
    AntennaFrame pg;
    AntennaCanvas(AntennaFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateAntenna(g);
    }
    public void paintComponent(Graphics g) {
	pg.updateAntenna(g);
    }
};

class AntennaLayout implements LayoutManager {
    public AntennaLayout() {}
    public void addLayoutComponent(String name, Component c) {}
    public void removeLayoutComponent(Component c) {}
    public Dimension preferredLayoutSize(Container target) {
	return new Dimension(500, 500);
    }
    public Dimension minimumLayoutSize(Container target) {
	return new Dimension(100,100);
    }
    public void layoutContainer(Container target) {
	Insets insets = target.insets();
	int targetw = target.size().width - insets.left - insets.right;
	int cw = targetw* 7/10;
	int targeth = target.size().height - (insets.top+insets.bottom);
	target.getComponent(0).move(insets.left, insets.top);
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
		m.move(cw, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	}
    }
};

public class Antenna extends Applet {
    static AntennaFrame ogf;
    void destroyFrame() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
    }
    public void init() {
	ogf = new AntennaFrame(this);
	ogf.init();
    }
    public void destroy() {
	if (ogf != null)
	    ogf.dispose();
	ogf = null;
    }
    public static void main(String args[]) {
        ogf = new AntennaFrame(null);
        ogf.init();
    }
    
    boolean started = false;

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

};

class AntennaFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    Random random;
    int windowWidth = 50;
    int windowHeight = 50;
    int wallWidth;
    
    public String getAppletInfo() {
	return "Antenna by Paul Falstad";
    }

    Checkbox stoppedCheck;
    Checkbox memoryImageSourceCheck;
    Checkbox intensityCheck;
    Checkbox graphCheck;
    Checkbox infoCheck;
    Choice setupChooser;
    Vector setupList;
    Setup setup;
    Scrollbar zoomBar;
    Scrollbar angleBar;
    Scrollbar freqBar;
    Scrollbar resBar;
    Scrollbar speedBar;
    Scrollbar brightnessBar;
    double colorMult;
    Label auxLabels[];
    Scrollbar auxBars[];
    static final int auxBarCount = 5;
    static final double pi = 3.14159265358979323846;
    double colorFunc[][][];
    double apertureR[];
    double apertureI[];
    int dragX, dragY;
    int xpoints[], ypoints[];
    boolean dragging;
    boolean dragClear;
    boolean dragSet;
    boolean recompute;
    double t;
    double wavelength;
    int pause;
    MemoryImageSource imageSource;
    int pixels[];
    Rectangle viewFourier, viewGraph;
    double fourierFunc[];
    int arrayCount = 0, arrayStart, arraySep;
    static final int phaseColorCount = 480;
    Color phaseColors[];

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    AntennaCanvas cv;
    Antenna applet;

    public boolean useFrame;
    Container main;

    AntennaFrame(Antenna a) {
	super("Antenna Applet");
	applet = a;
    }

    public void init() {
	setupList = new Vector();
	Setup s = new LinearSetup();
	while (s != null) {
	    setupList.addElement(s);
	    s = s.createNext();
	}
	
	try {
	    if (applet != null) {
		String param = applet.getParameter("useFrame");
		if (param != null && param.equalsIgnoreCase("false"))
		    useFrame = false;
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
	/*
	int res = 80;
	boolean altRender = false;
	// change settings to speed things up where possible
	if (os.indexOf("Windows") == 0) {
	    res = 120;
	    if (jv.indexOf("1.1") == 0)
		altRender = true;
	}
	*/

	fourierFunc = new double[181];
	
	main.setLayout(new AntennaLayout());
	cv = new AntennaCanvas(this);
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

	intensityCheck = new Checkbox("Show Intensity", true);
	intensityCheck.addItemListener(this);
	main.add(intensityCheck);

	graphCheck = new Checkbox("Show Graph", false);
	graphCheck.addItemListener(this);
	main.add(graphCheck);

	infoCheck = new Checkbox("Show Info", true);
	infoCheck.addItemListener(this);
	main.add(infoCheck);

	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	stoppedCheck.disable();
	main.add(stoppedCheck);
	memoryImageSourceCheck = new Checkbox("Alternate Rendering",
					      true);
	memoryImageSourceCheck.addItemListener(this);
//	add(memoryImageSourceCheck);

	main.add(new Label("Speed", Label.CENTER));
	main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 14, 1, 1, 40));
	speedBar.addAdjustmentListener(this);
	speedBar.disable();

	main.add(new Label("Zoom Out", Label.CENTER));
	main.add(zoomBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 10, 200));
	zoomBar.addAdjustmentListener(this);

	main.add(new Label("Resolution", Label.CENTER));
	main.add(resBar = new Scrollbar(Scrollbar.HORIZONTAL, 300, 5, 120, 600));
	resBar.addAdjustmentListener(this);

	main.add(new Label("Source Frequency", Label.CENTER));
	main.add(freqBar = new Scrollbar(Scrollbar.HORIZONTAL,
				     120, 1, 1, 236));
	freqBar.addAdjustmentListener(this);

	main.add(new Label("Brightness", Label.CENTER));
	main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL,
				    27, 1, 1, 1000));
	brightnessBar.addAdjustmentListener(this);

	auxLabels = new Label[auxBarCount];
	auxBars   = new Scrollbar[auxBarCount];
	for (i = 0; i != auxBarCount; i++) {
	    main.add(auxLabels[i] = new Label("Aux " + (i+1), Label.CENTER));
	    main.add(auxBars[i] = new Scrollbar(Scrollbar.HORIZONTAL,
					   50, 1, 0, 100));
	    auxBars[i].addAdjustmentListener(this);
	}

	main.add(new Label("http://www.falstad.com"));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }

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
	setResolution();
	reinit();
	setup = (Setup) setupList.elementAt(0);
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);

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

    void reinit() {
	doSetup();
    }

    void apertureChanged() {
	clearAperture();
	setup.doAperture();
	int i;
	double maxf = 0;
	for (i = 0; i != wallWidth; i++) {
	    double f = java.lang.Math.sqrt(apertureR[i]*apertureR[i] +
					   apertureI[i]*apertureI[i]);
	    if (f > maxf)
		maxf = f;
	}
	for (i = 0; i != wallWidth; i++) {
	    apertureR[i] /= maxf;
	    apertureI[i] /= maxf;
	}
	recompute = true;
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
	pixels = new int[d.width*d.height];
	int i;
	for (i = 0; i != d.width*d.height; i++)
	    pixels[i] = 0xFF000000;
	imageSource = new MemoryImageSource(d.width, d.height, pixels, 0,
					    d.width);
	viewFourier = new Rectangle(winSize.width-100,
				      winSize.height-100,
				      100, 100);
    }

    public boolean handleEvent(Event ev) {
        if (ev.id == Event.WINDOW_DESTROY) {
            if (applet == null)
                dispose();
            else
                applet.destroyFrame();
            return true;
        }
        return super.handleEvent(ev);
    }
    
    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    boolean calculateNotice;
    public void updateAntenna(Graphics realg) {
	if (winSize == null || winSize.width == 0) {
	    // this works around some weird bug in IE which causes the
	    // applet to not show up properly sometimes.
	    handleResize();
	    return;
	}
        Graphics g = null;

	if (!calculateNotice && recompute) {
	    FontMetrics fm = realg.getFontMetrics();
	    realg.setColor(Color.black);
	    String cs = "Calculating...";
	    realg.fillRect(0, winSize.height-30, 20+fm.stringWidth(cs), 30);
	    realg.setColor(Color.white);
	    realg.drawString(cs, 10, winSize.height-10);
	    cv.repaint(0);
	    calculateNotice = true;
	    return;
	}
	calculateNotice = false;

	boolean mis = true; // memoryImageSourceCheck.getState();
	g = dbimage.getGraphics();
	if (!mis) {
	    g.setColor(cv.getBackground());
	    g.fillRect(0, 0, winSize.width, winSize.height);
	}
	
	double tadd = 0;
	if (!stoppedCheck.getState()) {
	    int val = speedBar.getValue();
	    tadd = val*.05;
	    // add random crap into the time to avoid aliasing
	    tadd += val*getrand(20) * (.0001091171/4);
	    tadd *= freqBar.getValue() / 34.;
	    t += tadd;
	}
	double trotr = Math.cos(t);
	double troti = Math.sin(t);
	int i, j;
	
	boolean stopFunc = false;
	if (stoppedCheck.getState())
	    stopFunc = true;
	if (recompute) {
	    recompute = false;
	    double zoom = (zoomBar.getValue()/10.);
	    int apStart = -1, apEnd = -1;
	    int compWidth = (int) (zoom*windowWidth);
	    for (i = 0; i != wallWidth; i++) {
		if (apertureR[i] != 0 || apertureI[i] != 0) {
		    apEnd = i;
		    if (apStart == -1)
			apStart = i;
		}
	    }
	    if (apStart == -1)
		apStart = apEnd = wallWidth/2;
	    int waveStart = wallWidth/2-apEnd;
	    int waveEnd = wallWidth/2+compWidth/2-apStart;
	    int sz = 1;
	    while (sz < compWidth + waveEnd - waveStart)
		sz *= 2;
	    /*System.out.println(apStart + " " + apEnd + " " +
			       waveStart + " " + waveEnd + " " +
			       compWidth + " " + sz + " " + zoom);*/
	    
	    int szm = sz*2-1;
	    double line1[] = new double[sz*2];
	    double line2[] = new double[sz*2];
	    double line1_last[] = new double[sz*2];
	    for (i = 0; i != wallWidth; i++)
		if (apertureR[i] != 0 || apertureI[i] != 0) {
		    int ii = (i - wallWidth/2)*2;
		    int i0 = i - wallWidth/2;
		    line2[ii & szm] = apertureR[i];
		    line2[(ii+1) & szm] = apertureI[i];
		}
	    four1(line2, sz, 1);
	    
	    //System.out.print("computing...");
	    double m = freqBar.getValue()/120.;
	    double m0 = Math.sqrt(m);
	    wavelength = 2*pi/m;
	    //System.out.println("lambda = " + wavelength);
	    int jh = windowHeight/2;
	    boolean dipole = setup instanceof LinearSetup;
	    for (j = 0; j <= jh; j++) {
		for (i = 0; i != sz*2; i++)
		    line1[i] = 0;
		int jj = j-jh;
		double jz2 = jj*jj*zoom*zoom;
		int i2;
		int sz2 = sz*2;
		for (i = i2 = 0; i <= waveEnd; i++, i2 += 2) {
		    double dist1 = Math.sqrt(i*i+jz2);
		    double dist2 = dist1*m;
		    double dr = 1/(dist1+.0001);
		    line1[i2] = Math.cos(dist2)*dr;
		    line1[i2+1] = -Math.sin(dist2)*dr;
		    if (dipole) {
			double jz3a = jj*zoom + 1;
			double jz32 = jz3a*jz3a;
			dist1 = Math.sqrt(i*i+jz32);
			dist2 = dist1*m;
			dr = 1/(dist1+.0001);
			line1[i2] -= Math.cos(dist2)*dr;
			line1[i2+1] += Math.sin(dist2)*dr;
		    }
		    if (i > 0) {
			line1[sz2-i2] = line1[i2];
			line1[sz2-i2+1] = line1[i2+1];
		    }
		}
		four1(line1, sz, 1);
		for (i = 0; i != sz; i++) {
		    int ii = i*2;
		    double a = line1[ii]*line2[ii] -
			line1[ii+1]*line2[ii+1];
		    double b = line1[ii+1]*line2[ii] +
			line1[ii]*line2[ii+1];
		    line1[ii] = a;
		    line1[ii+1] = b;
		}
		four1(line1, sz, -1);
		double qmult = 400./sz;
		double oaddr = 0, oaddi = 0;
		for (i = 0; i != windowWidth; i++) {
		    double ir1 = (int) ((i-windowWidth/2  )*zoom);
		    double ir2 = (int) ((i-windowWidth/2+1)*zoom);
		    int ii1 = (int) ir1;
		    int ii2 = (int) ir2;
		    int iic = ii2-ii1;
		    if (intensityCheck.getState())
			colorFunc[i][j][0] = 0;
		    else {
			colorFunc[i][j][0] = 0;
			colorFunc[i][j][1] = 0;
		    }
		    int ii;
		    for (ii = ii1; ii <= ii2; ii++) {
			double q1 = line1[szm & (ii*2  )]*qmult;
			double q2 = line1[szm & (ii*2+1)]*qmult;
			double mu = .001;
			if (ii == ii1)
			    mu *= 1-(ir1-ii1);
			else if (ii == ii2)
			    mu *= ir2-ii2;
			if (intensityCheck.getState())
			    colorFunc[i][j][0] += (q1*q1+q2*q2) * mu;
			else {
			    colorFunc[i][j][0] += q1*mu;
			    colorFunc[i][j][1] += q2*mu;
			}
		    }
		    if (intensityCheck.getState()) {
			colorFunc[i][j][0] /= ir2-ir1;
		    } else {
			colorFunc[i][j][0] /= ir2-ir1;
			colorFunc[i][j][1] /= ir2-ir1;
		    }
		}
	    }
	    int sign = (intensityCheck.getState() || !dipole) ? 1 : -1;
	    for (j = 0; j != jh; j++) {
		int j2 = windowHeight-1-j;
		for (i = 0; i != windowWidth; i++) {
		    colorFunc[i][j2][0] = sign*colorFunc[i][j][0];
		    colorFunc[i][j2][1] = sign*colorFunc[i][j][1];
		}
	    }
	    //System.out.println("done");
	}

	colorMult = 30*Math.exp(brightnessBar.getValue()/50.-10);
	if (!intensityCheck.getState())
	    colorMult *= 1.5;
	int ix = 0;
	int k, l;
	for (j = 0; j != windowHeight; j++) {
	    for (i = 0; i != windowWidth; i++) {
		int x = i*winSize.width/windowWidth;
		int y = j*winSize.height/windowHeight;
		int x2 = (i+1)*winSize.width/windowWidth;
		int y2 = (j+1)*winSize.height/windowHeight;
		int colval = 0;
		if (intensityCheck.getState()) {
		    colval = 0xFF000000 + (getColorValue(i, j, 0) << 8);
		} else {
		    double q1 = colorFunc[i][j][0];
		    double q2 = colorFunc[i][j][1];
		    double q = (q1*trotr - q2*troti)*colorMult;
		    if (q > 0) {
			int qq = (int) (q*255);
			if (qq > 255)
			    qq = 255;
			colval = 0xFF000000 + (qq << 8);
		    } else {
			int qq = (int) (-q*255);
			if (qq > 255)
			    qq = 255;
			colval = 0xFF000000 + (qq << 16);
		    }
		}
		if (mis) {
		    for (k = x; k < x2; k++)
			for (l = y; l < y2; l++)
			    pixels[k+l*winSize.width] = colval;
		} else {
		    g.setColor(new Color(colval));
		    g.fillRect(x, y, x2-x, y2-y);
		}
	    }
	}

	double zoom = (zoomBar.getValue()/10.);
	//System.out.println(zoom + " " + windowWidth + " " + winSize.width);
	for (i = 0; i != windowWidth; i++) {
	    double ir1 = (int) ((i-windowWidth/2  )*zoom);
	    double ir2 = (int) ((i-windowWidth/2+1)*zoom);
	    int ii1 = (int) ir1;
	    int ii2 = (int) ir2;
	    int iic = ii2-ii1;
	    int ii;
	    double funcr = 0, funcb = 0;
	    for (ii = ii1; ii <= ii2; ii++) {
		int ij = ii+wallWidth/2;
		if (ij < 0 || ij >= wallWidth)
		    continue;
		//System.out.println(i + " " + ii + " " + zoom);
		double mu = 1;
		if (ii == ii1)
		    mu *= 1-(ir1-ii1);
		else if (ii == ii2)
		    mu *= ir2-ii2;
		funcb += (apertureR[ij]*apertureR[ij] +
			  apertureI[ij]*apertureI[ij])*mu;
		double ph = Math.atan2(apertureI[ij],
				       apertureR[ij])/pi;
		if (ph < 0)
		    funcr += (2+ph)*mu;
		else
		    funcr += ph*mu;
	    }
	    funcb /= ir2-ir1;
	    funcr /= (ir2-ir1)*2;
	    //System.out.println(i + " " + funcb);
	    int valb = (int) (funcb*255);
	    int valr = (int) (funcr*funcb*255);
	    if (valb < 64)
		valb = 64;
	    if (valb > 255)
		valb = 255;
	    if (valr < 0)
		valr = 0;
	    if (valr > 255)
		valr = 255;
	    if (funcb == 0)
		continue;
	    int colval = 0xFF000000 + (valr << 16) | valb;
	    int x = i*winSize.width/windowWidth;
	    int x2 = (i+1)*winSize.width/windowWidth;
	    int y = (windowHeight/2)*winSize.height/windowHeight;
	    int y2 = (windowHeight/2+1)*winSize.height/windowHeight;
	    if (mis) {
		for (k = x; k < x2; k++)
		    for (l = y; l < y2; l++)
			pixels[k+l*winSize.width] = colval;
	    } else {
		g.setColor(new Color(colval));
		g.fillRect(x, y, x2-x, y2-y);
	    }
	}
	
	if (mis) {
	    Image img = cv.createImage(imageSource);
	    g.drawImage(img, 0, 0, this);
	}

	if (setup instanceof FourierFunctionSetup) {
	    g.setColor(cv.getBackground());
	    g.fillRect(viewFourier.x, viewFourier.y,
		       viewFourier.width, viewFourier.height);
	    int cx = viewFourier.x + viewFourier.width/2;
	    int cy = viewFourier.y + viewFourier.height - 10;
	    int cr = 40;
	    int ox = -1, oy = -1;
	    g.setColor(Color.darkGray);
	    g.drawLine(viewFourier.x, cy,
		       viewFourier.x+viewFourier.width, cy);
	    g.drawLine(cx, viewFourier.y, cx, cy);
	    g.setColor(Color.white);
	    for (i = 0; i <= 180; i++) {
		double ang = (180-i)*pi/180.;
		int x = cx+(int) (Math.cos(ang)*cr*fourierFunc[i]);
		int y = cy-(int) (Math.sin(ang)*cr*fourierFunc[i]);
		if (ox != -1)
		    g.drawLine(ox, oy, x, y);
		ox = x; oy = y;
	    }
	}

	int infoWidth = 100;
	if (infoCheck.getState()) {
	    NumberFormat nf = NumberFormat.getInstance();
	    nf.setMaximumFractionDigits(2);
	    String s = setup.getInfo(nf);
	    if (s != null) {
		g.setColor(Color.black);
		FontMetrics fm = g.getFontMetrics();
		int x = 20+fm.stringWidth(s);
		g.fillRect(winSize.width-x, winSize.height-30, x, 30);
		g.setColor(Color.white);
		g.drawString(s, winSize.width-x+10, winSize.height-10);
		infoWidth = x;
	    }
	}
	
	if (graphCheck.getState()) {
	    viewGraph = new Rectangle(0, winSize.height-100,
				      winSize.width-infoWidth, 100);
	    g.setColor(cv.getBackground());
	    g.fillRect(viewGraph.x, viewGraph.y,
		       viewGraph.width, viewGraph.height);
	    int cx = viewGraph.x + viewGraph.width/2;
	    int cy = viewGraph.y + viewGraph.height - 10;
	    g.setColor(Color.darkGray);
	    g.drawLine(viewGraph.x, cy,
		       viewGraph.x+viewGraph.width, cy);
	    g.drawLine(cx, viewGraph.y, cx, viewGraph.y+viewGraph.height);
	    g.setColor(Color.white);
	    int ox = -1, oy = -1;
	    int vheight = viewGraph.height-20;
	    int spacing = viewGraph.width/arrayCount;
	    for (i = 0; i != arrayCount; i++) {
		int x = i*viewGraph.width/arrayCount;
		if (spacing > 1) {
		    x = i*spacing + spacing/2 +
			(viewGraph.width-(spacing*arrayCount))/2;
		}
		int s = arrayStart + i*arraySep;
		double f = Math.sqrt(apertureR[s]*apertureR[s] +
				     apertureI[s]*apertureI[s]);
		int y = cy - (int) (vheight * f);
		double ang = java.lang.Math.atan2(apertureI[s],
						  apertureR[s]);
		g.setColor(phaseColors[(int)((ang+pi)*phaseColorCount/
					     (2*pi+.2))]);
		g.drawLine(x, y, x, cy);
	    }
	}

	realg.drawImage(dbimage, 0, 0, this);
	if (!intensityCheck.getState() && !stoppedCheck.getState())
	    cv.repaint(pause);
    }

    int getColorValue(int i, int j, int k) {
	double val = (colorFunc[i][j][k] * colorMult);
	if (val > 255)
	    val = 255;
	return (int)val;
    }

    int abs(int x) {
	return x < 0 ? -x : x;
    }

    int sign(int x) {
	return (x < 0) ? -1 : (x == 0) ? 0 : 1;
    }

    public void componentHidden(ComponentEvent e){}
    public void componentMoved(ComponentEvent e){}
    public void componentShown(ComponentEvent e) {
	cv.repaint();
    }

    public void componentResized(ComponentEvent e) {
	handleResize();
	cv.repaint(100);
    }
    public void actionPerformed(ActionEvent e) {
    }

    public void adjustmentValueChanged(AdjustmentEvent e) {
	System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
	if (e.getSource() == resBar && resBar.getValue() != resBarValue)
	    setResolution();
	int i;
	for (i = 0; i != auxBarCount; i++)
	    if (e.getSource() == auxBars[i]) {
		apertureChanged();
		break;
	    }
	if (e.getSource() == zoomBar || e.getSource() == freqBar)
	    apertureChanged();
	cv.repaint(pause);
    }

    int resBarValue = -1;
    void setResolution() {
	resBarValue = windowWidth = windowHeight = resBar.getValue();
	if ((windowWidth & 1) == 1)
	    windowWidth = windowHeight = resBarValue-1;
	windowHeight++;
	colorFunc = new double[windowWidth][windowHeight][2];
	wallWidth = 512;
	apertureR = new double[wallWidth];
	apertureI = new double[wallWidth];
	System.out.print(windowWidth + " " + windowHeight + "\n");
	apertureChanged();
    }

    void setResolution(int x) {
	resBar.setValue(x);
	setResolution();
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
	cv.repaint(pause);
    }
    public void mouseMoved(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	int x = e.getX();
	int y = e.getY();
	dragX = x; dragY = y;
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
	dragging = true;
	edit(e);
    }
    public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = false;
	dragSet = dragClear = false;
	apertureChanged();
	cv.repaint();
    }

    void edit(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();
	if (!viewFourier.contains(x, y))
	    return;
	int cx = viewFourier.x + viewFourier.width/2;
	int cy = viewFourier.y + viewFourier.height - 10;
	int cr = 40;
	x -= cx;
	y -= cy;
	double ang2 = Math.atan2(-y, x);
	int ai2 = (int) (180-ang2*180/pi);

	int x1 = dragX-cx;
	int y1 = dragY-cy;
	double ang1 = Math.atan2(-y1, x1);
	int ai1 = (int) (180-ang1*180/pi);

	dragX = e.getX(); dragY = e.getY();

	while (true) {
	    if (ai2 < 0 || ai2 > 180)
		return;
	    fourierFunc[ai2] = Math.sqrt(x*x+y*y)/cr;
	    if (ai2 == ai1)
		break;
	    if (ai1 < ai2)
		ai2--;
	    else
		ai2++;
	}
    }
    
    public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() == intensityCheck) {
	    setResolution();
	    recompute = true;
	    cv.repaint();
	    if (intensityCheck.getState()) {
		stoppedCheck.disable();
		speedBar.disable();
	    } else {
		stoppedCheck.enable();
		speedBar.enable();
	    }
	    return;
	}
	if (e.getItemSelectable() == stoppedCheck ||
	    e.getItemSelectable() == graphCheck ||
	    e.getItemSelectable() == infoCheck) {
	    cv.repaint();
	    return;
	}
	if (e.getItemSelectable() == memoryImageSourceCheck) {
	    dbimage = createImage(winSize.width, winSize.height);
	}
	if (e.getItemSelectable() == setupChooser) {
	    doSetup();
	    cv.repaint(pause);
	}
    }

    void clearAperture() {
	int i;
	for (i = 0; i != wallWidth; i++)
	    apertureR[i] = apertureI[i] = 0;
    }
    
    void doSetup() {
	int i;
	for (i = 0; i != auxBarCount; i++)
	    auxBars[i].setValue(10);
	freqBar.setValue(120);
	zoomBar.setValue(10);
	setup = (Setup)
	    setupList.elementAt(setupChooser.getSelectedIndex());
	brightnessBar.setValue(500);
	setup.select();
	double m = freqBar.getValue()/120.;
	wavelength = 2*pi/m;
	apertureChanged();
	for (i = 0; i < setup.getAuxBarCount(); i++) {
	    auxLabels[i].show();
	    auxBars[i].show();
	}
	for (; i < auxBarCount; i++) {
	    auxLabels[i].hide();
	    auxBars[i].hide();
	}
	validate();
    }

    abstract class Setup {
	abstract String getName();
	abstract void select();
	abstract void doAperture();
	abstract Setup createNext();
	String getInfo(NumberFormat nf) { return null; }
	int getAuxBarCount() { return 2; }
    };

    class LinearSetup extends Setup {
	String getName() { return "Linear Antenna (End-Fed)"; }
	void select() {
	    auxLabels[0].setText("Length");
	    brightnessBar.setValue(580);
	    freqBar.setValue(19);
	}
	void doAperture() {
	    int x;
	    int w = auxBars[0].getValue()*2;
	    if (w == 0)
		w = 2;
	    double m = freqBar.getValue()/120.;
	    for (x = 0; x != w; x++)
		apertureR[wallWidth/2 - w/2 + x] =
		    Math.sin((w-x)*m);
	    arrayCount = w;
	    arraySep = 1;
	    arrayStart = wallWidth/2 - w/2;
	}
	String getInfo(NumberFormat nf) {
	    int w = auxBars[0].getValue()*2;
	    return "Length/wavelength = " + nf.format(w/wavelength);
	}
	int getAuxBarCount() { return 1; }
	Setup createNext() { return new LinearCenterSetup(); }
    }
    class LinearCenterSetup extends LinearSetup {
	String getName() { return "Linear Antenna (Center-Fed)"; }
	void select() {
	    auxLabels[0].setText("Length");
	    auxLabels[1].setText("Feed Separation");
	    auxBars[1].setValue(0);
	    brightnessBar.setValue(580);
	    freqBar.setValue(19);
	    auxBars[0].setValue(20);
	}
	void doAperture() {
	    int x;
	    int w = auxBars[0].getValue();
	    int s = auxBars[1].getValue();
	    if (w == 0)
		w = 2;
	    double m = freqBar.getValue()/120.;
	    for (x = 0; x != w; x++) {
		double f = Math.sin((w-x)*m);
		apertureR[wallWidth/2 - s/2 - x] =
		    apertureR[wallWidth/2 + s/2 + x] = f;
	    }
	    arrayCount = w*2+s;
	    arraySep = 1;
	    arrayStart = wallWidth/2 - s/2 - w;
	}
	String getInfo(NumberFormat nf) {
	    int w = auxBars[0].getValue()*2;
	    return "Total length/wavelength = " + nf.format(w/wavelength);
	}
	int getAuxBarCount() { return 2; }
	Setup createNext() { return new LoopSetup(); }
    }
    class LoopSetup extends Setup {
	String getName() { return "Loop Cross Section"; }
	void select() {
	    auxLabels[0].setText("Size");
	    brightnessBar.setValue(620);
	    freqBar.setValue(17);
	}
	void doAperture() {
	    int w = auxBars[0].getValue()+1;
	    apertureR[wallWidth/2 + w] = 1;
	    apertureR[wallWidth/2 - w] = -1;
	}
	int getAuxBarCount() { return 1; }
	String getInfo(NumberFormat nf) {
	    int w = (auxBars[0].getValue()+1)*2;
	    return "Diameter/wavelength = " + nf.format(w/wavelength);
	}
	Setup createNext() { return new BroadsideArraySetup(); }
    }
    abstract class UniformArraySetup extends Setup {
	int spacing;
	void select() {
	    auxLabels[0].setText("Separation");
	    auxLabels[1].setText("Phase Difference");
	    auxLabels[2].setText("Count");
	    brightnessBar.setValue(550);
	}
	void doAperture() {
	    int s = auxBars[0].getValue();
	    double pd = auxBars[1].getValue() *2*pi/100.;
	    int c = auxBars[2].getValue();
	    if (c == 0)
		c = 1;
	    if (s == 0)
		s = 1;
	    if (s*c > wallWidth)
		s = wallWidth/c;
	    spacing = s;
	    //System.out.println("width = " + w);
	    int x;
	    for (x = 0; x != c; x++) {
		int xx = wallWidth/2 - (c*s - s+1)/2 + x*s;
		if (x == 0)
		    arrayStart = xx;
		apertureR[xx] = Math.cos(pd*x);
		apertureI[xx] = Math.sin(pd*x);
	    }
	    arrayCount = c;
	    arraySep = s;
	}
	String getInfo(NumberFormat nf) {
	    return "Separation/wavelength = " + nf.format(spacing/wavelength);
	}
	int getAuxBarCount() { return 3; }
    }
    class BroadsideArraySetup extends UniformArraySetup {
	String getName() { return "Broadside Array"; }
	void select() {
	    super.select();
	    freqBar.setValue(77);
	    auxBars[0].setValue(3);
	    auxBars[1].setValue(0);
	    auxBars[2].setValue(10);
	}
	Setup createNext() { return new EndFireArraySetup(); }
    }
    class EndFireArraySetup extends UniformArraySetup {
	String getName() { return "End-Fire Array"; }
	void select() {
	    super.select();
	    freqBar.setValue(77);
	    auxBars[0].setValue(3);
	    auxBars[1].setValue(33);
	    auxBars[2].setValue(10);
	}
	Setup createNext() { return new BinomialArraySetup(); }
    }
    class BinomialArraySetup extends Setup {
	String getName() { return "Binomial Array"; }
	void select() {
	    freqBar.setValue(77);
	    auxLabels[0].setText("Separation");
	    auxLabels[1].setText("Phase Difference");
	    auxLabels[2].setText("Count");
	    auxBars[0].setValue(3);
	    auxBars[1].setValue(0);
	    auxBars[2].setValue(10);
	    brightnessBar.setValue(600);
	}
	int spacing;
	void doAperture() {
	    int s = auxBars[0].getValue();
	    double pd = auxBars[1].getValue() *2*pi/100.;
	    int c = auxBars[2].getValue();
	    if (c == 0)
		c = 1;
	    if (s == 0)
		s = 1;
	    if (s*c > wallWidth)
		s = wallWidth/c;
	    spacing = s;
	    double mx = binom(c, c/2);
	    //System.out.println("width = " + w);
	    int x;
	    for (x = 0; x != c; x++) {
		int xx = wallWidth/2 - (c*s - s+1)/2 + x*s;
		if (x == 0)
		    arrayStart = xx;
		double mult = binom(c, x)/mx;
		apertureR[xx] = Math.cos(pd*x)*mult;
		apertureI[xx] = Math.sin(pd*x)*mult;
	    }
	    arrayCount = c;
	    arraySep = s;
	}
	double binom(int a, int b) {
	    double q = 1;
	    int i;
	    for (i = 1; i <= b; i++)
		q *= (a-i)/(double) i;
	    return q;
	}
	String getInfo(NumberFormat nf) {
	    return "Separation/wavelength = " + nf.format(spacing/wavelength);
	}
	int getAuxBarCount() { return 3; }
	Setup createNext() { return new SchelkunoffSetup(); }
    }
    class SchelkunoffSetup extends Setup {
	String getName() { return "Schelkunoff Polynomial Array"; }
	void select() {
	    auxLabels[0].setText("Separation");
	    auxLabels[1].setText("Zero 1");
	    auxLabels[2].setText("Zero 2");
	    auxBars[0].setValue(3);
	    auxBars[1].setValue(25);
	    auxBars[2].setValue(75);
	    brightnessBar.setValue(723);
	}
	void doAperture() {
	    int s = auxBars[0].getValue();
	    double psi = 2*pi*s/wavelength;
	    double ang1 = (1-auxBars[1].getValue()/50.) * psi;
	    double ang2 = (1-auxBars[2].getValue()/50.) * psi;
	    double a1 = Math.cos(ang1);
	    double b1 = Math.sin(ang1);
	    double a2 = Math.cos(ang2);
	    double b2 = Math.sin(ang2);
	    apertureR[wallWidth/2-s] = 1;
	    apertureR[wallWidth/2  ] = -2*(a1+a2);
	    apertureI[wallWidth/2  ] = -2*(b1+b2);
	    apertureR[wallWidth/2+s] = a1*a2 - b1*b2;
	    apertureI[wallWidth/2+s] = a1*b2 + a2*b1;
	    arrayCount = 3;
	    arraySep = s;
	    arrayStart = wallWidth/2-s;
	    //System.out.println(s + " " + wavelength + " " + (psi*180/pi));
	}
	int getAuxBarCount() { return 3; }
	Setup createNext() { return new FourierSectoralSetup(); }
    }
    class FourierSectoralSetup extends Setup {
	String getName() { return "Sectoral (Fourier)"; }
	void select() {
	    auxLabels[0].setText("Size");
	    auxLabels[1].setText("Angle");
	    auxLabels[2].setText("Beam Width");
	    auxBars[0].setValue(40);
	    auxBars[1].setValue(35);
	    auxBars[2].setValue(65);
	    zoomBar.setValue(50);
	    brightnessBar.setValue(750);
	}
	void doAperture() {
	    int s = auxBars[0].getValue();
	    double ag = (auxBars[1].getValue()/50.-1)*pi;
	    double wid = (auxBars[2].getValue()/300.)*pi + pi/6;
	    double q1 = ag-wid;
	    double q2 = ag+wid;
	    if (q2 > pi)
		q2 = pi;
	    if (q1 < -pi)
		q1 = -pi;
	    int i;
	    for (i = 0; i <= 180; i++) {
		double ang = (i-90)*pi/90.;
		fourierFunc[i] = (ang >= q1 && ang <= q2) ? 1 : 0;
	    }
	    int sep = (int) (wavelength / 2);
	    if (sep == 0)
		sep = 1;
	    int x;
	    if (s*sep > wallWidth/2)
		s = wallWidth/2 / sep;
	    for (x = -s; x <= s; x++) {
		int xx = wallWidth/2 + x*sep;
		if (xx < 0 || xx >= wallWidth)
		    continue;
		double a = -(Math.sin(-x*q2)-
			     Math.sin(-x*q1))/x;
		double b = (Math.cos(x*q2)-
			    Math.cos(x*q1))/x;
		if (x == 0) {
		    a = q2-q1;
		    b = 0;
		}
		apertureR[xx] = a;
		apertureI[xx] = b;
	    }
	    arrayCount = s*2+1;
	    arraySep = sep;
	    arrayStart = wallWidth/2-s*sep;
	}
	int getAuxBarCount() { return 3; }
	Setup createNext() { return new FourierFunctionSetup(); }
    }
    class FourierFunctionSetup extends Setup {
	String getName() { return "Fourier Function"; }
	void select() {
	    auxLabels[0].setText("Size");
	    auxBars[0].setValue(40);
	    int i;
	    for (i = 0; i <= 180; i++) {
		fourierFunc[i] = (i > 90) ? 0 : i/90.;
	    }
	    zoomBar.setValue(50);
	    brightnessBar.setValue(750);
	}
	void doAperture() {
	    int s = auxBars[0].getValue();
	    int sep = (int) (wavelength / 2);
	    if (sep == 0)
		sep = 1;
	    int x;
	    if (s*sep > wallWidth/2)
		s = wallWidth/2 / sep;
	    for (x = -s; x <= s; x++) {
		int xx = wallWidth/2 + x*sep;
		if (xx < 0 || xx >= wallWidth)
		    continue;
		int i;
		double a0 = 0, b0 = 0;
		for (i = 0; i <= 180; i++) {
		    double ang = (i-90)*pi/90. * x;
		    double a1 = Math.cos(ang);
		    double b1 = Math.sin(-ang);
		    a0 += a1*fourierFunc[i];
		    b0 += b1*fourierFunc[i];
		}
		apertureR[xx] = a0;
		apertureI[xx] = b0;
	    }
	    arrayCount = s*2+1;
	    arraySep = sep;
	    arrayStart = wallWidth/2-s*sep;
	}
	int getAuxBarCount() { return 1; }
	Setup createNext() { return null; }
    }

    // fourier transform
    void four1(double data[],int nn,int isign) {
	int n,mmax,m,j,istep,i;
	double wtemp,wr,wpr,wpi,wi,theta;
	double tempr,tempi;
	
	n=nn << 1;
	j=1;
	for (i=1;i<n;i+=2) {
	    if (j > i) {
		tempr = data[j-1]; data[j-1] = data[i-1]; data[i-1] = tempr;
		tempr = data[j]; data[j] = data[i]; data[i] = tempr;
	    }
	    m=n >> 1;
	    while (m >= 2 && j > m) {
		j -= m;
		m >>= 1;
	    }
	    j += m;
	}
	mmax=2;
	while (n > mmax) {
	    istep=2*mmax;
	    theta=6.28318530717959/(isign*mmax);
	    wtemp=Math.sin(0.5*theta);
	    wpr = -2.0*wtemp*wtemp;
	    wpi=Math.sin(theta);
	    wr=1.0;
	    wi=0.0;
	    for (m=1;m<mmax;m+=2) {
		for (i=m;i<=n;i+=istep) {
		    j=i+mmax;
		    tempr=wr*data[j-1]-wi*data[j];
		    tempi=wr*data[j]+wi*data[j-1];
		    data[j-1]=data[i-1]-tempr;
		    data[j]=data[i]-tempi;
		    data[i-1] += tempr;
		    data[i] += tempi;
		}
		wr=(wtemp=wr)*wpr-wi*wpi+wr;
		wi=wi*wpr+wtemp*wpi+wi;
	    }
	    mmax=istep;
	}
    }

    double bessj0, bessy0;
    void computeBessel(double x) {
	double ax = x,z;
	double xx,y,ans,ans1,ans2;

	if (x < 8.0) {
	    y=x*x;
	    ans1=57568490574.0+y*(-13362590354.0+y*(651619640.7
						    +y*(-11214424.18+y*(77392.33017+y*(-184.9052456)))));
	    ans2=57568490411.0+y*(1029532985.0+y*(9494680.718
						  +y*(59272.64853+y*(267.8532712+y*1.0))));
	    bessj0 = ans=ans1/ans2;

	    ans1 = -2957821389.0+y*(7062834065.0+y*(-512359803.6
						    +y*(10879881.29+y*(-86327.92757+y*228.4622733))));
	    ans2=40076544269.0+y*(745249964.8+y*(7189466.438
						 +y*(47447.26470+y*(226.1030244+y*1.0))));
	    bessy0=(ans1/ans2)+0.636619772*bessj0*Math.log(x);
	    
	} else {
	    z=8.0/ax;
	    y=z*z;
	    xx=ax-0.785398164;
	    ans1=1.0+y*(-0.1098628627e-2+y*(0.2734510407e-4
					    +y*(-0.2073370639e-5+y*0.2093887211e-6)));
	    ans2 = -0.1562499995e-1+y*(0.1430488765e-3
				+y*(-0.6911147651e-5+y*(0.7621095161e-6
						      -y*0.934935152e-7)));
	    double sax = Math.sqrt(0.636619772/ax);
	    double cosxx = Math.cos(xx);
	    double sinxx = Math.sin(xx);
	    bessj0 = sax * (cosxx*ans1-z*sinxx*ans2);

	    ans2 = -0.1562499995e-1+y*(0.1430488765e-3
				+y*(-0.6911147651e-5+y*(0.7621095161e-6
						      +y*(-0.934945152e-7))));
	    bessy0 = sax*(sinxx*ans1+z*cosxx*ans2);
	    
	}
    }
}
