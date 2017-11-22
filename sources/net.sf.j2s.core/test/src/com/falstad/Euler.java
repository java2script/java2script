package com.falstad;
// Euler.java (c) 2001 by Paul Falstad, www.falstad.com.

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
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.image.ImageProducer;
import java.util.Vector;
import java.io.File;
import java.util.Random;
import java.util.Arrays;
import java.lang.Math;
import java.text.NumberFormat;
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

import a2s.Applet;

import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Scrollbar;

//web_Ready
//web_AppletName= Euler's Equation
//web_Description= Demonstrates Taylor series expansion of complex exponentials
//web_JavaVersion= http://www.falstad.com/euler/
//web_AppletImage= euler.png
//web_Category= Mathematics
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features: graphics, AWT-to-Swing

class EulerCanvas extends Canvas {
    EulerFrame pg;
    EulerCanvas(EulerFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateEuler(g);
    }
    public void paintComponent(Graphics g) {
	pg.updateEuler(g);
    }
};

class EulerLayout implements LayoutManager {
    public EulerLayout() {}
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

public class Euler extends Applet implements ComponentListener {
    EulerFrame ogf;
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
    
    void showFrame() {
	if (ogf == null) {
	    started = true;
	    ogf = new EulerFrame(this);
	    ogf.init();
	    repaint();
	}
    }
    
    @Override
    public void paint(Graphics g) {
        super.paint(g); // required to avoid hover-mouse repaint
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

class EulerFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseListener, MouseMotionListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    public String getAppletInfo() {
	return "Euler by Paul Falstad";
    }

    Choice modeChooser;
    Choice centerChooser;
    Checkbox animateCheck;
    Scrollbar zoomBar;
    Scrollbar termsBar;
    double zoom;
    static final double pi = 3.14159265358979323846;
    static final double pi2 = pi*2;
    int xpoints[];
    int ypoints[];
    int pause;
    Euler applet;
    static final int MODE_RESULT = 0;
    static final int MODE_ARG = 1;
    double zr = 0, zi = 3*pi/4;
    double orgx = 0, orgy = 0;
    boolean mouseDown;
    public boolean useFrame;

    EulerCanvas cv;

    EulerFrame(Euler a) {
	super("Euler's Formula Applet v1.1");
	applet = a;
    }

    public void init() {
	Container main;
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

	main.setLayout(new EulerLayout());
	cv = new EulerCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);

	animateCheck = new Checkbox("Animate");
	animateCheck.addItemListener(this);
	animateCheck.setState(true);
	main.add(animateCheck);
	
	modeChooser = new Choice();
	modeChooser.add("Mouse = Select exp(z)");
	modeChooser.add("Mouse = Select z");
	modeChooser.addItemListener(this);
	main.add(modeChooser);
	
	centerChooser = new Choice();
	centerChooser.add("Center = Origin");
	centerChooser.add("Center = exp(z)");
	centerChooser.addItemListener(this);
	main.add(centerChooser);
	
	main.add(new Label("Zoom", Label.CENTER));
	main.add(zoomBar = new Scrollbar(Scrollbar.HORIZONTAL, 96, 1, 60, 200));
	zoomBar.addAdjustmentListener(this);

	main.add(new Label("# of Terms", Label.CENTER));
	main.add(termsBar = new Scrollbar(Scrollbar.HORIZONTAL, 50, 1, 1, 51));
	termsBar.addAdjustmentListener(this);

	main.add(new Label("http://www.falstad.com", Label.CENTER));

	try {
	    String param = applet.getParameter("PAUSE");
	    if (param != null)
		pause = Integer.parseInt(param);
	} catch (Exception e) { }
	
	xpoints = new int[4];
	ypoints = new int[4];

	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.white);
        if (useFrame) {
            setSize(550, 550);
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
        Dimension d = winSize = cv.getSize();
	if (winSize.width == 0)
	    return;
	dbimage = cv.createImage(d.width, d.height);
    }

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    long lastTime = 0;
    
    public void updateEuler(Graphics realg) {
	zoom = java.lang.Math.exp(-(zoomBar.getValue()-100)*.3);
	Graphics g = null;
	if (winSize == null || winSize.width == 0)
	    return;
	g = dbimage.getGraphics();
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());

	double expv = java.lang.Math.exp(zr);
	double resultr = java.lang.Math.cos(zi)*expv;
	double resulti = java.lang.Math.sin(zi)*expv;
	if (centerChooser.getSelectedIndex() != 0) {
	    orgx = resultr;
	    orgy = resulti;
	} else {
	    orgx = orgy = 0;
	}

	g.setColor(Color.darkGray);
	int gridSpace = 1;
	while (gridSpace*10 < zoom)
	    gridSpace *= 10;
	do {
	    int i;
	    for (i = -10; i <= 10; i++) {
		map2d(i*gridSpace, -10*gridSpace, 0);
		map2d(i*gridSpace,  10*gridSpace, 1);
		drawLine(g);
		map2d(-10*gridSpace, i*gridSpace, 0);
		map2d( 10*gridSpace, i*gridSpace, 1);
		drawLine(g);
	    }
	    gridSpace = gridSpace / 10;
	} while (gridSpace > 0);

	int terms = termsBar.getValue();
	
	if (terms < 20) {
	    int i;
	    for (i = -100; i <= 100; i++) {
		double xr = 1, xi = 0;
		double ix = 0, iy = 0;
		double zi2 = pi*i/50.;
		int n = 0;
		for (; n < terms; n++) {
		    ix += xr; iy += xi;
		    double nxr = xr*zr - xi*zi2;
		    double nxi = xi*zr + xr*zi2;
		    xr = nxr/(n+1); xi = nxi/(n+1);
		}
		map2d(ix, iy, 1);
		if (i > -100)
		    drawLine(g);
		xpoints[0] = xpoints[1];
		ypoints[0] = ypoints[1];
	    }
	}

	map2d(-expv, expv, 0);
	map2d(expv, -expv, 1);
	drawOval(g, xpoints[0], ypoints[0],
		   xpoints[1]-xpoints[0], ypoints[1]-ypoints[0]);

	map2d(zr, zi, 0);
	map2d(zr+1, zi, 1);
	drawLine(g);

	g.setColor(Color.gray);
	map2d(0, 0, 0);
	drawLinePts(g, 0, ypoints[0], winSize.width-1, ypoints[0]);
	drawLinePts(g, xpoints[0], 0, xpoints[0], winSize.height-1);
	map2d(-1, 1, 0);
	map2d(1, -1, 1);
	drawOval(g, xpoints[0], ypoints[0],
		 xpoints[1]-xpoints[0], ypoints[1]-ypoints[0]);

	double xr = 1, xi = 0;
	double ix = 0, iy = 0;
	int n = 0;
	map2d(0, 0, 0);
	map2d(resultr, resulti, 1);
	drawLine(g);

	g.setColor(Color.white);
	for (; n < terms; n++) {
	    g.setColor((n % 2) == 0 ? Color.blue : Color.cyan);
	    map2d(ix, iy, 0);
	    ix += xr; iy += xi;
	    map2d(ix, iy, 1);
	    drawLine(g);
	    double nxr = xr*zr - xi*zi;
	    double nxi = xi*zr + xr*zi;
	    xr = nxr/(n+1); xi = nxi/(n+1);
	}
	g.setColor(Color.red);
	drawDot(g, resultr, resulti);
	g.setColor(Color.green);
	drawDot(g, zr, zi);

	int textspace = 20;
	g.setColor(cv.getBackground());
	g.fillRect(0, winSize.height-textspace, winSize.width-1, textspace);
	NumberFormat nf = NumberFormat.getInstance();
	nf.setMaximumFractionDigits(3);
	FontMetrics fm = g.getFontMetrics();
	String st = "z = " + formatNumber(zr, zi, nf);
	String st2 = "  exp(z) = " + formatNumber(resultr, resulti, nf);
	int ty = winSize.height-textspace/4;
	g.setColor(Color.green);
	g.drawString(st, 10, ty);
	g.setColor(Color.red);
	g.drawString(st2, 10+fm.stringWidth(st), ty);
	realg.drawImage(dbimage, 0, 0, this);
	
	if (animateCheck.getState() && !mouseDown) {
	    long tm = System.currentTimeMillis();
	    if (lastTime == 0)
		lastTime = tm;
	    zi += pi/100 * (tm-lastTime)/17.;
	    if (zi > pi)
		zi = -pi;
	    lastTime = tm;
	    cv.repaint(pause);
	} else
	    lastTime = 0;
    }

    String formatNumber(double r, double i, NumberFormat nf) {
	if (r == 0) {
	    if (i == 0)
		return "0";
	    return nf.format(i) + "i";
	}
	if (i == 0)
	    return nf.format(r);
	return nf.format(r) + (i < 0 ? "" : "+") + nf.format(i) + "i";
    }

    void drawOval(Graphics g, int x, int y, int rx, int ry) {
	if (onScreen(x, y) && onScreen(x+rx, y+ry))
	    g.drawOval(x, y, rx, ry);
    }

    boolean onScreen(int x, int y) {
	return (x >= 0 && x < winSize.width && y >= 0 && y < winSize.height);
    }

    boolean maxInt(int x) {
	return (x == -214748368 || x == 2147483647);
    }

    void drawLine(Graphics g) {
	drawLinePts(g, xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
    }

    void drawLinePts(Graphics g, int x1, int y1, int x2, int y2) {
	// if you attempt to draw lines that are way offscreen, you can
	// crash the java runtime.  So we prevent that by doing a bunch
	// of bounds checking and clipping here.

	if (onScreen(x1, y1) && onScreen(x2, y2)) {
	    g.drawLine(x1, y1, x2, y2);
	    return;
	}
	if (maxInt(x1) || maxInt(y1) || maxInt(x2) || maxInt(y2))
	    return;
	if ((x1 < 0 && x2 < 0) || (y1 < 0 && y2 < 0) ||
	    (x1 >= winSize.width && x2 >= winSize.width) ||
	    (y1 >= winSize.height && y2 >= winSize.height))
	    return;
	if (x1 == x2) {
	    // lines with zero slope have to be handled as a special case
	    if (y1 < 0)
		y1 = 0;
	    if (y2 < 0)
		y2 = 0;
	    if (y1 >= winSize.height)
		y1 = winSize.height-1;
	    if (y2 >= winSize.height)
		y2 = winSize.height-1;
	    g.drawLine(x1, y1, x1, y2);
	    return;
	}
	double m = (y2-y1)/(double) (x2-x1);
	if (x1 < 0) {
	    y1 -= x1*m;
	    x1 = 0;
	}
	if (y1 < 0) {
	    x1 -= y1/m;
	    y1 = 0;
	}
	if (x2 < 0) {
	    y2 -= x2*m;
	    x2 = 0;
	}
	if (y2 < 0) {
	    x2 -= y2/m;
	    y2 = 0;
	}
	if (x1 >= winSize.width) {
	    int a = winSize.width-1-x1;
	    y1 += a*m;
	    x1 += a;
	}
	if (x2 >= winSize.width) {
	    int a = winSize.width-1-x2;
	    y2 += a*m;
	    x2 += a;
	}
	if (y1 >= winSize.height) {
	    int a = winSize.height-1-y1;
	    y1 += a;
	    x1 += a/m;
	}
	if (y2 >= winSize.height) {
	    int a = winSize.height-1-y2;
	    y2 += a;
	    x2 += a/m;
	}
	if (onScreen(x1, y1) && onScreen(x2, y2))
	    g.drawLine(x1, y1, x2, y2);
    }

    void drawDot(Graphics g, double x, double y) {
	map2d(x, y, 0);
	if (onScreen(xpoints[0], ypoints[0]))
	    g.fillOval(xpoints[0]-2, ypoints[0]-2, 5, 5);
    }

    void map2d(double x, double y, int n) {
	xpoints[n] = (int) (winSize.width * (zoom+x-orgx)/(zoom*2));
	ypoints[n] = (int) (winSize.height * (zoom-y+orgy)/(zoom*2));
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
    }

    public void adjustmentValueChanged(AdjustmentEvent e) {
	cv.repaint(pause);
    }

    public void mouseDragged(MouseEvent e) {
	doMouse(e);
    }
    public void mouseMoved(MouseEvent e) {
	/*if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	    doMouse(e);*/
    }
    public void mouseEntered(MouseEvent e) {
    }
    public void mouseExited(MouseEvent e) {
    }
    public void mouseClicked(MouseEvent e) {
    }
    public void mousePressed(MouseEvent e) {
	doMouse(e);
    }
    void doMouse(MouseEvent e) {
	mouseDown = true;
	int ex = e.getX();
	int ey = e.getY();
	double x = ex*zoom*2./winSize.width - zoom + orgx;
	double y = -(ey*zoom*2./winSize.height - zoom - orgy);
	if (modeChooser.getSelectedIndex() == MODE_RESULT) {
	    if (x == 0 && y == 0)
		x = .00001;
	    zr = .5*java.lang.Math.log(x*x+y*y);
	    zi = java.lang.Math.atan2(y, x);
	} else {
	    zr = x;
	    zi = y;
	}
	cv.repaint(pause);
    }
    public void mouseReleased(MouseEvent e) {
	mouseDown = false;
	cv.repaint(pause);
    }
    public void itemStateChanged(ItemEvent e) {
	cv.repaint(pause);
    }
    public boolean handleEvent(Event ev) {
        if (ev.id == Event.WINDOW_DESTROY) {
            applet.destroyFrame();
            return true;
        }
        return super.handleEvent(ev);
    }
}
