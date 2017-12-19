package com.falstad;

// Dispersion.java (C) 2002 by Paul Falstad, www.falstad.com

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
import java.util.Random;
import java.lang.Math;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.text.DecimalFormat;
import java.text.NumberFormat;

import a2s.Applet;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Scrollbar;
import a2s.TextArea;
import a2s.Dialog;

//web_Ready
//web_AppletName= Dispersion
//web_Description= Demonstrates dispersion and group velocity
//web_JavaVersion= http://www.falstad.com/dispersion/
//web_AppletImage= dispersion.png
//web_Category= Physics
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features: graphics, AWT-to-Swing

class DispersionCanvas extends Canvas {
    DispersionFrame pg;
    DispersionCanvas(DispersionFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateDispersion(g);
    }
    public void paintComponent(Graphics g) {
	super.paintComponent(g);
	pg.updateDispersion(g);
    }
};

class DispersionLayout implements LayoutManager {
    public DispersionLayout() {}
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


public class Dispersion extends Applet implements ComponentListener {
    DispersionFrame qf;
    

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
    void showFrame() {
	if (qf == null) {
	    started = true;
	    qf = new DispersionFrame(this);
	    qf.init();
	    repaint();
	}
    }
    public void paint(Graphics g) {
	super.paint(g);
	String s = "Applet is open in a separate window.";
	if (!started)
	    s = "Applet is starting.";
	else if (qf == null)
	    s = "Applet is finished.";
	else if (qf.useFrame)
	    qf.triggerShow();
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

class DispersionFrame extends Frame
  implements ComponentListener, ActionListener,
             ItemListener, DecentScrollbarListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    Random random;
    int stateCount;
    int elevelCount;
    int maxStateCount = 500;
    int sampleCount = 80;
    int pSampleCount;
    double modes[][];
    double modesLeft[][];
    public static final double epsilon = .00001;
    public static final double epsilon2 = .003;
    public static final double phasorBaseEnergy = 1;
    public static final double infiniteEnergy = 1000;
    
    public String getAppletInfo() {
	return "Dispersion by Paul Falstad";
    }

    class View extends Rectangle {
	int mid_y, lower_y;
	double ymult, ymult2, scale;
	View() { scale = 1; }
    }


    Container main;
    Checkbox stoppedCheck;
    Button restartButton;
    DecentScrollbar speedBar, resBar, freq1Bar, freq2Bar, speed1Bar, speed2Bar;
    View view1, view2, viewSum;
    View viewList[];
    int viewCount;
    static final double pi = 3.14159265358979323846;
    double step;
    double func[];
    double funci[];
    static final int stateBuffer = 5;
    boolean dragging;
    boolean startup, selectGround;
    boolean setupModified;
    boolean useFrame;
    double t1 = 1000, t2 = 1000;
    int pause;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    DispersionCanvas cv;
    Dispersion applet;
    NumberFormat showFormat;

    DispersionFrame(Dispersion a) {
	super("Dispersion v1.0");
	applet = a;
	useFrame = false;
    }

    public void init() {
	try {
	    String param = applet.getParameter("useFrame");
	    if (param != null && param.equalsIgnoreCase("true"))
		useFrame = true;
	    param = applet.getParameter("pause");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { e.printStackTrace(); }
	if (useFrame)
	    main = this;
	else
	    main = applet;
	
	main.setLayout(new DispersionLayout());
	cv = new DispersionCanvas(this);
	cv.addComponentListener(this);
	main.add(cv);

	stoppedCheck = new Checkbox("Stopped");
	stoppedCheck.addItemListener(this);
	main.add(stoppedCheck);
	
	main.add(new Label("Simulation Speed", Label.CENTER));
	main.add(speedBar = new DecentScrollbar(this, 80, 1, 300));

	new Label("Resolution", Label.CENTER);
	resBar = new DecentScrollbar(this, 260, 180, maxStateCount);

	main.add(new Label("Frequency 1", Label.CENTER));
	main.add(freq1Bar = new DecentScrollbar(this, 30, 20, 400));

	main.add(new Label("Frequency 2", Label.CENTER));
	main.add(freq2Bar = new DecentScrollbar(this, 200, 20, 400));

	main.add(new Label("Speed 1", Label.CENTER));
	main.add(speed1Bar = new DecentScrollbar(this, 30, 10, 100));

	main.add(new Label("Speed 2", Label.CENTER));
	main.add(speed2Bar = new DecentScrollbar(this, 30, 10, 100));

	main.add(restartButton = new Button("Restart"));
	restartButton.addActionListener(this);
	
	try {
	    String param;
	    param = applet.getParameter("freq1");
	    if (param != null)
		freq1Bar.setValue(Integer.parseInt(param));
	    param = applet.getParameter("freq2");
	    if (param != null)
		freq2Bar.setValue(Integer.parseInt(param));
	    param = applet.getParameter("speed1");
	    if (param != null)
		speed1Bar.setValue(Integer.parseInt(param));
	    param = applet.getParameter("speed2");
	    if (param != null)
		speed2Bar.setValue(Integer.parseInt(param));
	} catch (Exception e) { e.printStackTrace(); }
	
	setResolution();

	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
	showFormat = DecimalFormat.getInstance();
	showFormat.setMaximumFractionDigits(2);
	if (useFrame) {
	    resize(750, 600);
	    handleResize();
	    Dimension x = getSize();
	    Dimension screen = getToolkit().getScreenSize();
	    setLocation((screen.width  - x.width)/2,
			(screen.height - x.height)/2);
	    show();
	} else {
	    hide();
	    handleResize();
	    applet.validate();
	}
	main.requestFocus();
    }

    boolean shown = false;
    
    public void triggerShow() {
	if (!shown)
	    show();
	shown = true;
    }
    
    void reinit() {
    }

    void handleResize() {
        Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	viewList = new View[3];
	int i = 0;
	viewList[i++] = view1 = new View();
	viewList[i++] = view2 = new View();
	viewList[i++] = viewSum = new View();
	viewCount = i;
	int sizenum = viewCount;
	int toth = winSize.height;

	int cury = 0;
	for (i = 0; i != viewCount; i++) {
	    View v = viewList[i];
	    int h = toth/sizenum;
	    v.x = 0;
	    v.width = winSize.width;
	    v.y = cury;
	    v.height = h;
	    cury += h;
	}
	setGraphLines();
	dbimage = main.createImage(d.width, d.height);
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

    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

    public void paint(Graphics g) {
	cv.repaint();
    }

    long lastTime;
    public void updateDispersion(Graphics realg) {
	if (dbimage == null)
	    return;
	Graphics g = dbimage.getGraphics();
	if (winSize == null || winSize.width == 0)
	    return;
	boolean allQuiet = true;
	double tadd = 0;
	double f1 = freq1Bar.getValue()*.1;
	double f2 = freq2Bar.getValue()*.1;
	double s1 = speed1Bar.getValue()*f1/30.;
	double s2 = speed2Bar.getValue()*f2/30.;
	if (!stoppedCheck.getState()) {
	    int val = speedBar.getValue();
	    tadd = Math.exp(val/20.)*(.1/5);
	    long sysTime = System.currentTimeMillis();
	    if (lastTime == 0)
		lastTime = sysTime;
	    tadd *= (sysTime-lastTime)*(1/1700.);
	    t1 += tadd*s1;
	    t2 += tadd*s2;
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
	    g.setColor(Color.gray);
	    g.drawLine(0, viewList[i].y, winSize.width, viewList[i].y);
	}

	ox = -1;
	int j;
	double norm = 0;
	double normmult2 = 1/norm;
	double normmult = Math.sqrt(normmult2);
	if (norm == 0)
	    normmult = normmult2 = 0;
	
	ox = -1;
	g.setColor(Color.white);

	double maxf = 0;
	double expectx = 0;

	if (view1 != null) {
	    double mult = 2*pi*f1/sampleCount;
	    for (i = 0; i != sampleCount; i++)
		func[i] = (t1 < mult*i) ? 0 : .5*Math.sin(t1-mult*i);
	    drawFunction(g, view1, func, null, sampleCount, 0);
	}
	if (view2 != null) {
	    double mult = 2*pi*f2/sampleCount;
	    for (i = 0; i != sampleCount; i++)
		func[i] = (t2 < mult*i) ? 0 : .5*Math.sin(t2-mult*i);
	    drawFunction(g, view2, func, null, sampleCount, 0);
	}
	if (viewSum != null) {
	    double mult1 = 2*pi*f1/sampleCount;
	    double mult2 = 2*pi*f2/sampleCount;
	    for (i = 0; i != sampleCount; i++)
		func[i] = .5*(((t1 < mult1*i) ? 0 : Math.sin(t1-mult1*i)) +
			      ((t2 < mult2*i) ? 0 : Math.sin(t2-mult2*i)));
	    drawFunction(g, viewSum, func, null, sampleCount, 0);
	}

	realg.drawImage(dbimage, 0, 0, this);
	if (!stoppedCheck.getState() && !allQuiet)
	    cv.repaint(pause);
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
	int ox = -1, oy = 0;
	g.setColor(Color.gray);


	    int mid_y = view.mid_y;
	    double mult = view.ymult*view.scale;
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
	if (e.getSource() == restartButton) {
	    t1 = t2 = 0;
	}
	cv.repaint();
    }

    public void scrollbarValueChanged(DecentScrollbar ds) {
	System.out.print(ds.getValue() + "\n");
	/*if (ds == resBar)
	    adjustingStates = true;*/
    }

    public void scrollbarFinished(DecentScrollbar ds) {
	if (ds == resBar) {
	    setResolution();
	    reinit();
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
	sampleCount = 1;
	while (sampleCount < resBar.getValue())
	    sampleCount *= 2;
	func = new double[sampleCount];
    }

    public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() == stoppedCheck) {
	    cv.repaint(pause);
	    return;
	}
    }
};
