package com.falstad;

// DiffEq.java (C) 2001 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= DiffEq
//web_Description= Visual differential equation solver.
//web_JavaVersion= http://www.falstad.com/diffeq/
//web_AppletImage= diffeq.png
//web_Category= Mathematics
//web_Date= $Date: 2016-12-30 10:36:32 -0600 (Fri, 30 Dec 2016) $
//web_Features= graphics, AWT-to-Swing

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
import java.util.Vector;
import java.util.Random;
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

import a2s.Button;
import a2s.Canvas;
import a2s.Choice;
import a2s.Frame;

class DiffEqCanvas extends Canvas {
    DiffEqFrame pg;
    DiffEqCanvas(DiffEqFrame p) {
	pg = p;
    }
    public Dimension getPreferredSize() {
	return new Dimension(300,400);
    }
    public void update(Graphics g) {
	pg.updateDiffEq(g);
    }
    public void paintComponent(Graphics g) {
	super.paintComponent(g);
	pg.updateDiffEq(g);
    }
};

class DiffEqLayout implements LayoutManager {
    public DiffEqLayout() {}
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
	int targeth = target.size().height - (insets.top+insets.bottom);
	int ch = targeth*2/3;
	Component m = target.getComponent(0);
	m.move(insets.left, insets.top);
	m.resize(targetw, ch);
	int x = insets.left;
	int i;
	int mh = 0;
	ch += insets.top;
	for (i = 1; i != 4; i++) {
	    m = target.getComponent(i);
	    Dimension d = m.getPreferredSize();
	    m.move(x, ch);
	    m.resize(d.width, d.height);
	    x += d.width;
	    if (d.height > mh)
		mh = d.height;
	}
	ch += mh;
	int h = ch;
	int cw = target.size().width/3;
	x = insets.left;
	int cn = 0;
	for (; i < target.getComponentCount(); i++) {
	    m = target.getComponent(i);
	    if (m.isVisible()) {
		Dimension d = m.getPreferredSize();
		//if (m instanceof Scrollbar)
		//  d.width = target.size().width - cw;
		d.width = cw;
		/*if (m instanceof Label) {
		    h += d.height/3;
		    c = (target.size().width-cw-d.width)/2;
		}*/
		m.move(x, h);
		m.resize(d.width, d.height);
		h += d.height;
	    }
	    cn++;
	    if (cn == 5) {
		cn = 0;
		x += cw;
		h = ch;
	    }
	}
    }
};


public class DiffEq extends Applet implements ComponentListener {
    DiffEqFrame ogf;
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
            ogf = new DiffEqFrame(this);
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

class DiffEqFrame extends Frame
  implements ComponentListener, ActionListener, AdjustmentListener,
             MouseMotionListener, MouseListener, ItemListener {
    
    Thread engine = null;

    Dimension winSize;
    Image dbimage;
    
    Random random;
    int maxTerms = 30;
    int maxMaxTerms = 500;
    int sampleCount;
    int midy;
    double ymult;
    public boolean useFrame;
    
    DiffEq applet;
    DiffEqFrame(DiffEq a) {
	super("Differential Equation applet");
	applet = a;
    }

    double sinTable[][];
    public static final double epsilon = .00001;
    public static final double epsilon2 = .003;
    static final double yMax = 10;
    
    public String getAppletInfo() {
	return "DiffEq by Paul Falstad";
    }

    Button clearButton;
    ValueEditCanvas lhsValues[], rhsValues[], initialValues[],
	            solutionValues[];
    int selectedCoef;
    int magnitudesY;
    boolean funcSelected;
    static final int SEL_NONE = 0;
    static final int SEL_FUNC = 1;
    static final int SEL_MAG = 2;
    static final int MODE_PLUCK = 0;
    static final int MODE_SHAPE = 1;
    static final int MODE_TOUCH = 2;
    static final int MODE_FORCE = 3;
    static final int MODE_BOW = 999; // disabled
    static final int DISP_PHASE = 0;
    static final int DISP_LEFTRIGHT = 1;
    static final int DISP_PHASECOS = 2;
    static final int DISP_PHASORS = 3;
    static final int DISP_MODES = 4;
    static final int VEC_NONNEG      = (1<<0);
    static final int VEC_INTEGER     = (1<<1);
    static final int VEC_NONZERO     = (1<<2);
    static final int VEC_CONSTANT    = (1<<3);
    static final int VEC_HALFINTEGER = (1<<4);
    int selection;
    int dragX, dragY;
    boolean dragging;
    boolean bowing;
    boolean bowCaught;
    boolean forceApplied;
    double t;
    double forceMag;
    double points[][];
    int forceBarValue;
    double forceTimeZero;
    int tensionBarValue;
    NumberFormat nf;
    double func[], forceFunc[];
    LhsFunc lhsfunc;
    RhsFunc rhsfunc;
    Choice lhsChooser, rhsChooser;
    double xRangeStart, xRangeEnd, xRangeWidth;
    Vector lhsList, rhsList;
    boolean lhsChanged, rhsChanged;
    static final int pause = 0;

    int getrand(int x) {
	int q = random.nextInt();
	if (q < 0) q = -q;
	return q % x;
    }
    DiffEqCanvas cv;
    Container main;

    public void init() {
	
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

	lhsList = new Vector();
	LhsFunc lhs = new OscillatorLhsFunc();
	while (lhs != null) {
	    lhsList.addElement(lhs);
	    lhs = lhs.createNext();
	}
	rhsList = new Vector();
	RhsFunc rhs = new ZeroRhsFunc();
	while (rhs != null) {
	    rhsList.addElement(rhs);
	    rhs = rhs.createNext();
	}
	
	selectedCoef = -1;
	main.setLayout(new DiffEqLayout());
	cv = new DiffEqCanvas(this);
	cv.addComponentListener(this);
	cv.addMouseMotionListener(this);
	cv.addMouseListener(this);
	main.add(cv);
	
	lhsChooser = new Choice();
	int i;
	for (i = 0; i != lhsList.size(); i++)
	    lhsChooser.add("LHS = " +
			   ((LhsFunc) lhsList.elementAt(i)).getName());
	main.add(lhsChooser);
	lhsfunc = (LhsFunc) lhsList.elementAt(0);
	lhsChooser.addItemListener(this);

	rhsChooser = new Choice();
	for (i = 0; i != rhsList.size(); i++)
	    rhsChooser.add("RHS = " +
			   ((RhsFunc) rhsList.elementAt(i)).getName());
	main.add(rhsChooser);
	rhsfunc = (RhsFunc) rhsList.elementAt(0);
	rhsChooser.addItemListener(this);

	main.add(clearButton = new Button("Clear Function"));
	clearButton.addActionListener(this);

	lhsValues = new ValueEditCanvas[5];
	rhsValues = new ValueEditCanvas[2];
	initialValues = new ValueEditCanvas[3];
	solutionValues = new ValueEditCanvas[4];
	for (i = 0; i != 5; i++)
	    main.add(lhsValues[i] = new ValueEditCanvas());
	for (i = 0; i != 2; i++)
	    main.add(rhsValues[i] = new ValueEditCanvas());
	for (i = 0; i != 3; i++) {
	    main.add(initialValues[i] = new ValueEditCanvas());
	    initialValues[i].setValue(0);
	}
	for (i = 0; i != 4; i++)
	    main.add(solutionValues[i] = new ValueEditCanvas());
	lhsChanged = rhsChanged = true;

	setLoadCount();
	points = new double[1][2];
	points[0][0] = 1; points[0][1] = 1;

	nf = NumberFormat.getInstance();
	nf.setMaximumFractionDigits(5);

	random = new Random();
	reinit();
	cv.setBackground(Color.black);
	cv.setForeground(Color.lightGray);
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
    
    int getPanelHeight() { return winSize.height-40; }

    void centerString(Graphics g, String s, int y) {
	FontMetrics fm = g.getFontMetrics();
        g.drawString(s, (winSize.width-fm.stringWidth(s))/2, y);
    }

//    public void paint(Graphics g) {
//	cv.repaint();
//    }

    void doClear() {
	int i;
	for (i = 0; i != sampleCount; i++)
	    forceFunc[i] = 0;
    }

    void valueChanged(ValueEditCanvas vec) {
	int i;
	for (i = 0; i != 4; i++)
	    if (vec == solutionValues[i]) {
		lhsfunc.setSolution();
		break;
	    }
	cv.repaint();
    }

    void rk(double x, double Y[], double stepsize) {
	int order = lhsfunc.getOrder();
	double yn[] = new double[order];
	double k1[] = new double[order];
	double k2[] = new double[order];
	double k3[] = new double[order];
	double k4[] = new double[order];
	int i;

	double rscale = lhsfunc.getRhsScale();
	for (i = 0; i != order; i++)
	    yn[i] = Y[i];
	for (i = 0; i != order-1; i++)
	    k1[i] = stepsize * yn[i+1];
	k1[order-1] =
	    stepsize * lhsfunc.calculateDiffs(x, yn,
					      rscale*rhsfunc.calculate(x, yn));
	for (i = 0; i != order; i++)
	    yn[i] = (Y[i] + 0.5*k1[i]);
	for (i = 0; i != order-1; i++)
	    k2[i] = stepsize * yn[i+1];
	double x2 = x + stepsize*.5;
	k2[order-1] =
	    stepsize * lhsfunc.calculateDiffs(x2, yn,
				            rscale*rhsfunc.calculate(x2, yn));
	for (i = 0; i != order; i++)
	    yn[i] = (Y[i] + 0.5*k2[i]);
	for (i = 0; i != order-1; i++)
	    k3[i] = stepsize * yn[i+1];
	k3[order-1] =
	    stepsize * lhsfunc.calculateDiffs(x2, yn,
					    rscale*rhsfunc.calculate(x2, yn));

	double x3 = x+stepsize;
	for (i = 0; i != order; i++)
	    yn[i] = (Y[i] + k3[i]);
	for (i = 0; i != order-1; i++)
	    k4[i] = stepsize * yn[i+1];
	k4[order-1] =
	    stepsize * lhsfunc.calculateDiffs(x3, yn,
					   rscale*rhsfunc.calculate(x3, yn));
	for (i = 0; i != order; i++)
	    Y[i] = Y[i] + (k1[i]+2*(k2[i]+k3[i])+k4[i])/6;
    }

    void rungeKutta(double start, double dir)
    {
	int numIter=0;
	double maxh=xRangeWidth/sampleCount;
	double error=0.0, E = .001, localError;
	int order = lhsfunc.getOrder();
	double Y[] = new double[order];
	double Yhalf[] = new double[order];
	double h = maxh;
	
	Y[0] = Yhalf[0] = points[0][1];
	if (order > 1)
	    Y[1] = Yhalf[1] = initialValues[0].getValue();
	if (order > 2)
	    Y[2] = Yhalf[2] = initialValues[1].getValue();
	if (order > 3)
	    Y[3] = Yhalf[3] = initialValues[2].getValue();
	double t = start;

	int steps = 0;
	int pos = (int) ((t-xRangeStart)*sampleCount/xRangeWidth);
	func[pos] = Y[0];
	double minh = .01;
	while (t >= xRangeStart && t <= xRangeEnd) {
	    // estimate one full step
	    rk(t, Y, h*dir);

	    // estimate two half steps
	    rk(t, Yhalf, h*0.5*dir);
	    rk(t, Yhalf, h*0.5*dir);

	    // estimate the local error
	    localError = java.lang.Math.abs(Y[0] - Yhalf[0]);
	    
	    if (Y[0] > 1e6 || Y[0] < -1e6) {
		// who cares about the error
	    } else if (localError > E) {
		h *= 0.75; // decrease the step size
		if (h < minh)
		    h = minh;
	    } else if (localError < (E * 0.5)) {
		h *= 1.25; // increase the step size
		if (h > maxh)
		    h = maxh;
	    }
	    
	    int i;
	    for (i = 0; i != order; i++)
		Yhalf[i] = Y[i]; 
	    int newpos = (int) ((t-xRangeStart)*sampleCount/xRangeWidth);
	    if (dir > 0) {
		if (newpos > pos) {
		    if (newpos > sampleCount)
			newpos = sampleCount;
		    while (pos < newpos)
			func[++pos] = Y[0];
		}
	    } else {
		if (newpos < pos) {
		    if (newpos < 0)
			newpos = 0;
		    while (pos > newpos)
			func[--pos] = Y[0];
		}
	    }
	    
	    t += h*dir;
	    steps++;
	}
    }

    public void updateDiffEq(Graphics realg) {
	if (winSize == null || winSize.width == 0)
	    return;
	Graphics g = dbimage.getGraphics();
	boolean allQuiet = true;
	Color gray1 = new Color(76,  76,  76);
	Color gray2 = new Color(127, 127, 127);
	g.setColor(cv.getBackground());
	g.fillRect(0, 0, winSize.width, winSize.height);
	g.setColor(cv.getForeground());

	lhsfunc = (LhsFunc)
	    lhsList.elementAt(lhsChooser.getSelectedIndex());
	if (lhsChanged) {
	    int i;
	    for (i = 0; i != 5; i++)
		lhsValues[i].hide();
	    for (i = 0; i != 3; i++) {
		initialValues[i].hide();
		initialValues[i].setValue(0);
	    }
	    lhsfunc.newFunc();
	    if (lhsfunc.getOrder() > 1)
		initialValues[0].setLabel("Initial y'");
	    if (lhsfunc.getOrder() > 2)
		initialValues[1].setLabel("Initial y''");
	    if (lhsfunc.getOrder() > 3)
		initialValues[2].setLabel("Initial y'''");
	    rhsChooser.select(0);
	    rhsChanged = true;
	    
	    // rhs doesn't work (isn't implemented) if runge kutta isn't used
	    rhsChooser.setEnabled(lhsfunc.useRungeKutta());
	}
	lhsfunc.setup();
	rhsfunc = (RhsFunc)
	    rhsList.elementAt(rhsChooser.getSelectedIndex());
	if (rhsChanged) {
	    int i;
	    for (i = 0; i != 2; i++)
		rhsValues[i].hide();
	    rhsfunc.newFunc();
	    if (rhsfunc.isCustom())
		clearButton.enable();
	    else
		clearButton.disable();
	    for (i = 0; i != 4; i++)
		solutionValues[i].hide();
	    if (rhsfunc instanceof ZeroRhsFunc)
		lhsfunc.newFuncSolution();
	}
	rhsfunc.setup();
	main.validate();
	lhsChanged = rhsChanged = false;

	int i;
	int panelHeight = getPanelHeight();
	midy = panelHeight / 2;
	int halfPanel = panelHeight / 2;
	double ymult0 = .75 * halfPanel;
	ymult = ymult0 / yMax;
	for (i = -1; i <= 1; i++) {
	    g.setColor((i == 0) ? gray2 : gray1);
	    g.drawLine(0,             midy+(i*(int) ymult0),
		       winSize.width, midy+(i*(int) ymult0));
	}
	g.setColor(gray2);
	if (!lhsfunc.positiveOnly()) {
	    g.drawLine(winSize.width/2, midy-(int) ymult0,
		       winSize.width/2, midy+(int) ymult0);
	}

	g.setColor(Color.white);
	xRangeWidth = lhsfunc.getRangeWidth();
	xRangeStart = lhsfunc.getRangeStart();
	xRangeEnd   = lhsfunc.getRangeEnd();
	boolean useRungeKutta = lhsfunc.useRungeKutta();
	if (useRungeKutta) {
	    rungeKutta(points[0][0],  1);
	    rungeKutta(points[0][0], -1);
	}

	int ox = -1, oy = -1;
	int ox2 = -1, oy2 = -1;
	for (i = 0; i != sampleCount; i++) {
	    double dx = (i*xRangeWidth/sampleCount)+xRangeStart;
	    double dy = rhsfunc.calculate(dx, null);
	    forceFunc[i] = dy;

	    if (!useRungeKutta)
		func[i] = lhsfunc.calculate(dx);
	    // System.out.print(dx + " " + func[i] + "\n");
	}
	g.setColor(Color.red);
	drawGraph(g, forceFunc);
	g.setColor(Color.white);
	drawGraph(g, func);
	g.setColor(Color.red);
	for (i = 0; i != 1; i++) {
	    int x = (int) ((points[i][0] - xRangeStart) /xRangeWidth * winSize.width);
	    int y = midy - (int) (points[i][1] * ymult);
	    g.drawLine(x-3, y, x+3, y);
	    g.drawLine(x, y-3, x, y+3);
	}
	g.setColor(Color.white);
	centerString(g, lhsfunc.getDescription() + " = " +
		        lhsfunc.getRhsScaleDescription() +
		     rhsfunc.getDescription(), panelHeight+10);
	if (rhsfunc instanceof ZeroRhsFunc)
	    centerString(g, lhsfunc.getSolution(), panelHeight+30);
	realg.drawImage(dbimage, 0, 0, this);
    }

    void drawGraph(Graphics g, double f[]) {
	int i;
	int ox = -1, oy = -1;
	for (i = 0; i != sampleCount; i++) {
	    int x = winSize.width * i / sampleCount;
	    double dx = (i*xRangeWidth/sampleCount)+xRangeStart;
	    double dy = f[i];
	    int y = midy - (int) (ymult * dy);
	    if (Double.isNaN(dy) || Double.isInfinite(dy)) {
		ox = x;
		if (y < midy)
		    y = 0;
		else
		    y = midy*2;
		continue;
	    }
	    if (y < 0 || dy > 1e6) {
		if (oy == 0) {
		    ox = x;
		    continue;
		}
		y = 0;
	    }
	    if (y > midy*2 || dy < -1e6) {
		if (oy == midy*2) {
		    ox = x;
		    continue;
		}
		y = midy*2;
	    }
	    if (ox != -1)
		g.drawLine(ox, oy, x, y);
	    ox = x;
	    oy = y;
	}
    }

    void setPoint(double x, double y) {
	points[0][0] = x;
	points[0][1] = y;
    }

    void edit(MouseEvent e) {
	int x = e.getX();
	int y = e.getY();

	if (funcSelected) {
	    if (x == dragX) {
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
	    cv.repaint(pause);
	    return;
	}
	double dx = x*xRangeWidth/winSize.width + xRangeStart;
	double dy = (midy-y)/ymult;
	if (dx < xRangeStart)
	    dx = xRangeStart;
	if (dx >= xRangeEnd)
	    dx = xRangeEnd;

	points[0][0] = dx;
	points[0][1] = dy;
	cv.repaint(pause);
    }

    void editFuncPoint(int x, int y) {
	// XXXXX
	double dy = (midy-y)/ymult;
	int lox = x*sampleCount/winSize.width;
	int hix = (x+1)*sampleCount/winSize.width;
	if (hix > sampleCount)
	    hix = sampleCount;
	if (lox < 0)
	    lox = 0;
	for (; lox < hix; lox++)
	    forceFunc[lox] = dy;
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
	if (e.getSource() == clearButton) {
	    doClear();
	    cv.repaint();
	}
    }

    public boolean handleEvent(Event ev) {
        if (ev.id == Event.WINDOW_DESTROY) {
            applet.destroyFrame();
            return true;
        }
        return super.handleEvent(ev);
    }
    
    public void adjustmentValueChanged(AdjustmentEvent e) {
	cv.repaint(pause);
    }

    void setLoadCount() {
	sampleCount = maxTerms = maxMaxTerms;
	func = new double[sampleCount+1];
	forceFunc = new double[sampleCount+1];
    }

    public void mouseDragged(MouseEvent e) {
	dragging = true;
	edit(e);
    }

    public void mouseMoved(MouseEvent e) {
	dragX = e.getX(); dragY = e.getY();
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0)
	    return;
	if (rhsfunc.isCustom()) {
	    int px = (int) ((points[0][0] - xRangeStart) /xRangeWidth *
			    winSize.width);
	    int py = midy - (int) (points[0][1] * ymult);
	    int dx = px-e.getX();
	    int dy = py-e.getY();
	    funcSelected = (dx*dx+dy*dy > 10);
	} else {
	    funcSelected = false;
	}
    }
    public void mouseClicked(MouseEvent e) {
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
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = true;
	edit(e);
    }
    public void mouseReleased(MouseEvent e) {
	if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
	    return;
	dragging = false;
	cv.repaint(pause);
    }
    public void itemStateChanged(ItemEvent e) {
	if (e.getItemSelectable() == lhsChooser)
	    lhsChanged = true;
	if (e.getItemSelectable() == rhsChooser)
	    rhsChanged = true;
	cv.repaint(pause);
    }

    // solve these equations for c1 and c2:
    //   y  = c1 m1 + c2 m2
    //   y' = c1 m3 + c4 m4
    // m1, m2 are typically the values of the two solutions at point[0][0].
    // m3, m4 are the derivatives of the two solutions at point[0][0].
    void solveForConstants(double m1, double m2, double m3, double m4) {
	double det = m1*m4-m2*m3;
	if (det == 0) {
	    System.out.print("solveForConstants: det = 0\n");
	    return;
	}
	double c1 = ( m4*points[0][1]-m2*initialValues[0].getValue())/det;
	double c2 = (-m3*points[0][1]+m1*initialValues[0].getValue())/det;
	solutionValues[0].setValue(c1);
	solutionValues[1].setValue(c2);
    }

    abstract class LhsFunc {
	void setup() {}
	void newFunc() {}
	void newFuncSolution() {}
	boolean positiveOnly() { return false; }
	boolean useRungeKutta() { return true; }
	double getRangeWidth() { return 100; }
	double calculate(double x) { return 0; }
	double calculateDiffs(double x, double y[], double rs) { return 0; }
	double getRhsScale() { return 1; }
	String getRhsScaleDescription() { return ""; }
	abstract int getOrder();
	abstract String getDescription();
	abstract LhsFunc createNext();
	abstract String getName();
	double getRangeStart() {
	    return (lhsfunc.positiveOnly()) ? 0 : -getRangeWidth()/2;
	}
	double getRangeEnd() {
	    return getRangeStart() + getRangeWidth();
	}
	String getSolution() { return ""; }
	void setSolution() { } // XXX
    }

    class Order2LhsFunc extends LhsFunc {
	String getName() { return "ay''+by'+cy"; }
	double va, vb, vc;
	boolean complexDisc, linear;
	int getOrder() { return 2; }
	void setup() {
	    va = lhsValues[0].getValue();
	    vb = lhsValues[1].getValue();
	    vc = lhsValues[2].getValue();
	}

	double calculateDiffs(double x, double y[], double rs) {
	    return -(vb*y[1]+vc*y[0]-rs)/va;
	}

	String getDescription() {
	    return "ay'' + by' + cy";
	}

	void newFunc() {
	    lhsValues[0].setup("a",   1, VEC_NONZERO);
	    lhsValues[1].setup("b", .07, 0);
	    lhsValues[2].setup("c",   1, 0);
	    setPoint(getRangeStart(), yMax);
	}

	void newFuncSolution() {
	    solutionValues[0].setLabel("c1");
	    solutionValues[1].setLabel("c2");
	    solutionValues[2].setLabel("c3");
	    solutionValues[2].setFlags(VEC_CONSTANT);
	    solutionValues[3].setLabel("c4");
	    solutionValues[3].setFlags(VEC_CONSTANT);
	}

	String getSolution() {
	    double disc = vb*vb-4*va*vc;
	    complexDisc = false;
	    linear = false;
	    if (disc < 0) {
		disc = -disc;
		complexDisc = true;
	    }
	    disc = java.lang.Math.sqrt(disc);
	    double a1 = 0, a2 = 0;
	    double c1, c2;
	    double sarg = 0;
	    int pointcount = 2;
	    double m1, m2, m3, m4;
	    double x = points[0][0];
	    if (complexDisc) {
		a1 = a2 = -vb/(2*va);
		sarg = disc/(2*va);
		m1 = java.lang.Math.exp(a1*x) * java.lang.Math.sin(sarg*x);
		m2 = java.lang.Math.exp(a1*x) * java.lang.Math.cos(sarg*x);
		m3 = java.lang.Math.exp(a1*x)*
		    (a1*java.lang.Math.sin(sarg*x) +
		     sarg*java.lang.Math.cos(sarg*x));
		m4 = java.lang.Math.exp(a1*x)*
		    (a1*java.lang.Math.cos(sarg*x) -
		     sarg*java.lang.Math.sin(sarg*x));
	    } else if (vb == 0 && vc == 0) {
		linear = true;
		// solve two equations: y=mx+b, y'=0x+m
		m1 = points[0][0];
		m2 = m3 = 1;
		m4 = 0;
	    } else {
		a1 = (-vb+disc)/(2*va);
		a2 = (-vb-disc)/(2*va);
		m1 = java.lang.Math.exp(a1*x);
		m2 = java.lang.Math.exp(a2*x);
		m3 = a1*java.lang.Math.exp(a1*x);
		m4 = a2*java.lang.Math.exp(a2*x);
	    }
	    solveForConstants(m1, m2, m3, m4);
	    if (complexDisc) {
		solutionValues[2].setValue(a1);
		solutionValues[3].setValue(sarg);
		return "y = exp(c3 x) (c1 sin(c4 x)+c2 cos(c4 x))";
	    } else if (linear) {
		return "y = c1 x + c2";
	    } else {
		solutionValues[2].setValue(a1);
		solutionValues[3].setValue(a2);
		if (a1 == 0)
		    return "y = c1 + c2 exp(c4 x)";
		return "y = c1 exp(c3 x) + c2 exp(c4 x)";
	    }
	}

	void setSolution() {
	    double x = points[0][0];
	    if (complexDisc) {
		double c1 =   solutionValues[0].getValue();
		double c2 =   solutionValues[1].getValue();
		double a1 =   solutionValues[2].getValue();
		double sarg = solutionValues[3].getValue();
		points[0][1] = java.lang.Math.exp(a1*x) * (
		    c1*java.lang.Math.sin(sarg*x) +
		    c2*java.lang.Math.cos(sarg*x));
		double q;
		initialValues[0].setValue(q =
		    java.lang.Math.exp(a1*x)*
		    ((c1*a1-c2*sarg)*java.lang.Math.sin(sarg*x) +
		     (c2*a1+c1*sarg)*java.lang.Math.cos(sarg*x)));
	    } else if (linear) {
		double m = solutionValues[0].getValue();
		double b = solutionValues[1].getValue();
		points[0][1] = m*x+b;
		initialValues[0].setValue(m);
	    } else {
		double c1 = solutionValues[0].getValue();
		double c2 = solutionValues[1].getValue();
		double a1 = solutionValues[2].getValue();
		double a2 = solutionValues[3].getValue();
		points[0][1] = c1*java.lang.Math.exp(a1*x) +
		               c2*java.lang.Math.exp(a2*x);
		initialValues[0].setValue(
		    c1*a1*java.lang.Math.exp(a1*x) +
		    c2*a2*java.lang.Math.exp(a2*x));
	    }
	}

	LhsFunc createNext() { return new Order1LhsFunc(); }
    }

    class OscillatorLhsFunc extends Order2LhsFunc {
	String getName() { return "harmonic oscillator"; }

	double getRhsScale() { return vc; }
	String getRhsScaleDescription() { return "w\u00b2 "; }

	void setup() {
	    double beta  = lhsValues[0].getValue();
	    double omega = lhsValues[1].getValue();
	    va = 1;
	    vb = 2*beta;
	    vc = omega*omega;
	}

	String getDescription() {
	    return "y'' + 2by' + w\u00b2 y";
	}

	void newFunc() {
	    lhsValues[0].setup("b", .035, VEC_NONNEG);
	    lhsValues[1].setup("w",    1, VEC_NONNEG|VEC_NONZERO);
	    lhsValues[1].setMax(7);
	    setPoint(getRangeStart(), yMax);
	}

	void newFuncSolution() {
	    solutionValues[0].setLabel("c1");
	    solutionValues[1].setLabel("c2");
	    solutionValues[2].setLabel("c3");
	    solutionValues[3].setLabel("c4");
	    solutionValues[2].setFlags(VEC_CONSTANT);
	    solutionValues[3].setFlags(VEC_CONSTANT);
	}

	LhsFunc createNext() { return new Order2LhsFunc(); }
    }

    class Order1LhsFunc extends LhsFunc {
	String getName() { return "ay'+by"; }
	double va, vb;
	int getOrder() { return 1; }
	void setup() {
	    va = lhsValues[0].getValue();
	    vb = lhsValues[1].getValue();
	}

	double getRhsScale() { return vb; }
	String getRhsScaleDescription() { return "b "; }

	double calculateDiffs(double x, double y[], double rs) {
	    return (-vb*y[0]+rs)/va;
	}

	String getDescription() {
	    return "ay' + by";
	}

	void newFunc() {
	    lhsValues[0].setup("a", 23, VEC_NONZERO);
	    lhsValues[1].setup("b",  1, 0);
	    setPoint(0, 1);
	}

	void newFuncSolution() {
	    solutionValues[0].setLabel("c");
	    solutionValues[1].setLabel("d");
	    solutionValues[1].setFlags(VEC_CONSTANT);
	}

	String getSolution() {
	    double d = -vb/va;
	    double x = points[0][0];
	    double y1 = java.lang.Math.exp(d*x);
	    double c = points[0][1] / y1;
	    solutionValues[0].setValue(c);
	    solutionValues[1].setValue(d);
	    return "y = c exp(d x)";
	}

	void setSolution() {
	    double x = points[0][0];
	    double c = solutionValues[0].getValue();
	    double d = solutionValues[1].getValue();
	    points[0][1] = c*java.lang.Math.exp(d*x);
	}

	LhsFunc createNext() { return new FreeFallLhsFunc(); }
    }

    class FreeFallLhsFunc extends LhsFunc {
	String getName() { return "falling object"; }
	double va, vb, vc;
	int getOrder() { return 2; }
	void setup() {
	    va = lhsValues[0].getValue();
	    vb = lhsValues[1].getValue();
	    vc = lhsValues[2].getValue()*va;
	}

	double calculateDiffs(double x, double y[], double rs) {
	    return -(vb*y[1]+vc-rs)/va;
	}

	String getDescription() {
	    return "my'' + by' + mg";
	}

	void newFunc() {
	    lhsValues[0].setup("m", 1,  VEC_NONZERO|VEC_NONNEG);
	    lhsValues[1].setup("b", .07, VEC_NONNEG);
	    lhsValues[2].setup("g", .098, 0);
	    setPoint(getRangeStart(), yMax);
	}

	void newFuncSolution() {
	    solutionValues[0].setLabel("c1");
	    solutionValues[1].setLabel("c2");
	    solutionValues[1].setFlags(VEC_CONSTANT);
	    solutionValues[2].setLabel("c3");
	    solutionValues[2].setFlags(VEC_CONSTANT);
	    solutionValues[3].setLabel("c4");
	}

	String getSolution() {
	    double x = points[0][0];

	    double c2 = -vb/va;
	    double c3 = -vc/vb;
	    double c1 = 0;
	    double c4 = 0;
	 
	    if (vb == 0) {
		c1 = 0;
		c2 = -vc/2;
		c3 = initialValues[0].getValue()-2*c2*x;
		c4 = points[0][1]-c3*x-c2*x*x;
	    } else {
		c1 = (initialValues[0].getValue()-c3)/
		    (c2*java.lang.Math.exp(c2*x));
		c4 = points[0][1]-c3*x-c1*java.lang.Math.exp(c2*x);
	    }
	    solutionValues[0].setValue(c1);
	    solutionValues[1].setValue(c2);
	    solutionValues[2].setValue(c3);
	    solutionValues[3].setValue(c4);

	    if (vb == 0)
		return "y = c2 x\u00b2 + c3 x + c4";
	    return "y = c1 exp(c2 x) + c3 x + c4";
	}

	void setSolution() {
	    double x = points[0][0];
	    double c1 = solutionValues[0].getValue();
	    double c2 = solutionValues[1].getValue();
	    double c3 = solutionValues[2].getValue();
	    double c4 = solutionValues[3].getValue();
	    if (vb == 0) {
		points[0][1] = c2*x*x + c3*x + c4;
		initialValues[0].setValue(2*c2*x + c3);
	    } else {
		points[0][1] = c1*java.lang.Math.exp(c2*x) + c3*x + c4;
		initialValues[0].setValue(c1*c2*java.lang.Math.exp(c2*x) + c3);
	    }
	}

	LhsFunc createNext() { return new BesselLhsFunc(); }
    }

    class BesselLhsFunc extends LhsFunc {
	String getName() { return "Bessel"; }
	double va, c1, c2;
	int getOrder() { return 2; }
	boolean positiveOnly() { return true; }
	double vals[];

	// had bad luck with Runge-Kutta on Bessel equation...
	boolean useRungeKutta() { return false; }

	void setup() {
	    va = lhsValues[0].getValue();
	    va *= va;
	    vals = new double[4];
	    getSolution();
	    c1 = solutionValues[0].getValue();
	    c2 = solutionValues[1].getValue();
	}

	double calculate(double x) {
	    double p = lhsValues[0].getValue();
	    bessjy(x, p, vals);
	    return vals[0]*c1 + vals[2]*c2;
	}

	String getDescription() {
	    return "x\u00b2 y'' + xy' + (x\u00b2-p\u00b2)y";
	}
	
	void newFunc() {
	    lhsValues[0].setup("p", 0, VEC_NONNEG);
	    setPoint(0, yMax);
	}

	void newFuncSolution() {
	    solutionValues[0].setLabel("c1");
	    solutionValues[1].setLabel("c2");
	}

	String getSolution() {
	    double x = points[0][0];
	    double p = lhsValues[0].getValue();
	    double vals[] = new double[4];
	    bessjy(x, p, vals);
	    // m1 = y1, m2 = y2, m3 = y'1, m4 = y'2
	    solveForConstants(vals[0], vals[2], vals[1], vals[3]);
	    return "y = c1 Jp(x) + c2 Yp(x)";
	}

	void setSolution() {
	    double x = points[0][0];
	    double p = lhsValues[0].getValue();
	    double vals[] = new double[4];
	    bessjy(x, p, vals);
	    double c1 = solutionValues[0].getValue();
	    double c2 = solutionValues[1].getValue();
	    points[0][1] = vals[0]*c1 + vals[2]*c2;
	    initialValues[0].setValue(vals[1]*c1 + vals[3]*c2);
	}

	LhsFunc createNext() { return new BesselIntegerLhsFunc(); }
    }

    class BesselIntegerLhsFunc extends BesselLhsFunc {
	String getName() { return "Bessel (integer p)"; }
	void newFunc() {
	    super.newFunc();
	    lhsValues[0].setFlags(VEC_NONNEG|VEC_INTEGER);
	}
	LhsFunc createNext() { return new BesselHalfIntegerLhsFunc(); }
    }

    class BesselHalfIntegerLhsFunc extends BesselLhsFunc {
	String getName() { return "Bessel (half-integer p)"; }
	void newFunc() {
	    super.newFunc();
	    lhsValues[0].setValue(.5);
	    lhsValues[0].setFlags(VEC_NONNEG|VEC_HALFINTEGER);
	    setPoint(getRangeWidth()/2, 1);
	}
	LhsFunc createNext() { return new LegendreLhsFunc(); }
    }

    class LegendreLhsFunc extends LhsFunc {
	String getName() { return "Legendre"; }
	double va;
	int getOrder() { return 2; }
	double getRangeWidth() { return 2; }
	void setup() {
	    va = lhsValues[0].getValue();
	    va = va*(va+1);
	}
	double calculateDiffs(double x, double y[], double rs) {
	    return -(-2*x*y[1]+va*y[0]-rs)/(1-x*x);
	}
	String getDescription() {
	    return "(1-x\u00b2)y'' -2xy' + p(p+1)y";
	}
	void newFunc() {
	    lhsValues[0].setup("p", 7, VEC_NONNEG);
	    lhsValues[0].setMax(40);
	    setPoint(0, -yMax/2);
	}
	LhsFunc createNext() { return new LegendreIntegerLhsFunc(); }
    }

    class LegendreIntegerLhsFunc extends LegendreLhsFunc {
	String getName() { return "Legendre (integer order)"; }
	void newFunc() {
	    super.newFunc();
	    lhsValues[0].setup("n", 7, VEC_NONNEG|VEC_INTEGER);
	    lhsValues[0].setMax(40);
	}
	void newFuncSolution() {
	    solutionValues[0].setLabel("c1");
	    solutionValues[1].setLabel("c2");
	}

	String getSolution() {
	    double x = points[0][0];
	    int p = (int) lhsValues[0].getValue();
	    double vn[] = new double[p+2];
	    double vd[] = new double[p+2];
	    legendreP(p, x, vn, vd);
	    double pn = vn[p];
	    double pd = vd[p];
	    legendreQ(p, x, vn, vd);
	    double qn = vn[p];
	    double qd = vd[p];
	    // m1 = y1, m2 = y2, m3 = y'1, m4 = y'2
	    solveForConstants(pn, qn, pd, qd);
	    return "y = c1 Pn(x) + c2 Qn(x)";
	}

	void setSolution() {
	    double x = points[0][0];
	    int p = (int) lhsValues[0].getValue();
	    double vn[] = new double[p+2];
	    double vd[] = new double[p+2];
	    legendreP(p, x, vn, vd);
	    double pn = vn[p];
	    double pd = vd[p];
	    legendreQ(p, x, vn, vd);
	    double qn = vn[p];
	    double qd = vd[p];
	    double c1 = solutionValues[0].getValue();
	    double c2 = solutionValues[1].getValue();
	    points[0][1] = pn*c1 + qn*c2;
	    initialValues[0].setValue(pd*c1 + qd*c2);
	}

	LhsFunc createNext() { return new HermiteLhsFunc(); }
    }

    class HermiteLhsFunc extends LhsFunc {
	String getName() { return "Hermite"; }
	double va, vb, vc;
	int getOrder() { return 2; }
	double getRangeWidth() { return 4; }
	void setup() {
	    va = lhsValues[0].getValue();
	}
	//boolean positiveOnly() { return true; }
	double calculateDiffs(double x, double y[], double rs) {
	    return 2*x*y[1]-2*va*y[0]+rs;
	}
	String getDescription() {
	    return "y''-2xy'+2ny";
	}
	void newFunc() {
	    lhsValues[0].setup("n", 12, VEC_NONNEG);
	    lhsValues[0].setMax(2000);
	    setPoint(0, -yMax/2);
	}
	LhsFunc createNext() { return new JacobiLhsFunc(); }
    }

    class JacobiLhsFunc extends LhsFunc {
	String getName() { return "Jacobi"; }
	double va, vb, vn;
	int getOrder() { return 2; }
	double getRangeWidth() { return 2; }
	void setup() {
	    vn = lhsValues[0].getValue();
	    va = lhsValues[1].getValue();
	    vb = lhsValues[2].getValue();
	}
	//boolean positiveOnly() { return true; }
	double calculateDiffs(double x, double y[], double rs) {
	    return -((vb-va-(va+vb+2)*x)*y[1] +
		    vn*(vn+va+vb+1)*y[0]+rs)/(1-x*x);
	}
	String getDescription() {
	    return "(1-x\u00b2)y''+(b-a-(a+b+2)x)y'+n(n+a+b+1)y";
	}
	void newFunc() {
	    lhsValues[0].setup("n", 10, 0);
	    lhsValues[1].setup("a",  1, 0);
	    lhsValues[2].setup("b",  1, 0);
	    setPoint(0, 2);
	}
	LhsFunc createNext() { return new Order4LhsFunc(); }
    }

    class Order4LhsFunc extends LhsFunc {
	String getName() { return "ay''''+by'''+cy''+dy'+ey"; }
	double va, vb, vc, vd, ve;
	int getOrder() { return 4; }
	void setup() {
	    va = lhsValues[0].getValue();
	    vb = lhsValues[1].getValue();
	    vc = lhsValues[2].getValue();
	    vd = lhsValues[3].getValue();
	    ve = lhsValues[4].getValue();
	}
	double calculateDiffs(double x, double y[], double rs) {
	    return -(vb*y[3]+vc*y[2]+vd*y[1]+ve*y[0]-rs)/va;
	}
	String getDescription() {
	    return "ay'''' + by''' + cy'' + dy' + ey";
	}
	void newFunc() {
	    lhsValues[0].setup("a", 6, 0);
	    lhsValues[1].setup("b", 0, 0);
	    lhsValues[2].setup("c", 1, 0);
	    lhsValues[3].setup("d", 0, 0);
	    lhsValues[4].setup("e", 0, 0);
	    setPoint(0, 0);
	    initialValues[0].setValue(.1);
	    initialValues[1].setValue(.5);
	}
	LhsFunc createNext() { return new EquidimensionalOrder2LhsFunc(); }
    }

    class EquidimensionalOrder2LhsFunc extends LhsFunc {
	String getName() { return "equidimensional"; }
	double va, vb, vc;
	int getOrder() { return 2; }
	boolean positiveOnly() { return true; }
	void setup() {
	    va = lhsValues[0].getValue();
	    vb = lhsValues[1].getValue();
	    vc = lhsValues[2].getValue();
	}
	double calculateDiffs(double x, double y[], double rs) {
	    return -(vb*y[1]*x+vc*y[0]-rs)/(va*x*x);
	}
	String getDescription() {
	    return "ax\u00b2 y'' + bx y' + c y"; // XXX
	}
	void newFunc() {
	    lhsValues[0].setup("a", .5, 0);
	    lhsValues[1].setup("b",  0, 0);
	    lhsValues[2].setup("c", 20, 0);
	    setPoint(getRangeWidth()/2, yMax/2);
	}
	LhsFunc createNext() { return new PendulumLhsFunc(); }
    }

    class PendulumLhsFunc extends LhsFunc {
	String getName() { return "pendulum"; }
	double beta, omega, omega2;
	int getOrder() { return 2; }
	
	void setup() {
	    beta  = lhsValues[0].getValue();
	    omega = lhsValues[1].getValue();
	    omega2 = omega*omega;
	}

	double getRhsScale() { return omega2; }
	String getRhsScaleDescription() { return "w\u00b2 "; }

	double calculateDiffs(double x, double y[], double rs) {
	    return -2*beta*y[1]-omega2*java.lang.Math.sin(y[0])+rs;
	}

	String getDescription() {
	    return "y'' + 2by' + w\u00b2 sin(y)";
	}

	void newFunc() {
	    lhsValues[0].setup("b", .035, VEC_NONNEG);
	    lhsValues[1].setup("w",    1, VEC_NONNEG|VEC_NONZERO);
	    setPoint(getRangeStart(), 3.1);
	}

	LhsFunc createNext() { return new DuffingLhsFunc(); }
    }

    class DuffingLhsFunc extends LhsFunc {
	String getName() { return "Duffing"; }
	double va, vb, vc, vd;
	int getOrder() { return 2; }
	void setup() {
	    va = lhsValues[0].getValue();
	    vb = lhsValues[1].getValue();
	    vc = lhsValues[2].getValue();
	    vd = lhsValues[3].getValue();
	}
	double calculateDiffs(double x, double y[], double rs) {
	    return -(vb*y[1]+vc*y[0]+vd*y[0]*y[0]*y[0]-rs)/va;
	}
	String getDescription() {
	    return "ay'' + by' + cy + dy\u00b3";
	}
	void newFunc() {
	    lhsValues[0].setup("a",   6, 0);
	    lhsValues[1].setup("b",  .6, 0);
	    lhsValues[2].setup("c",   1, 0);
	    lhsValues[3].setup("d", .77, 0);
	    setPoint(getRangeStart(), yMax);
	}
	LhsFunc createNext() { return new VanDerPolFunc(); }
    }

    class VanDerPolFunc extends LhsFunc {
	String getName() { return "Van der Pol"; }
	double va, vb, vc, vd;
	int getOrder() { return 2; }
	void setup() {
	    va = lhsValues[0].getValue();
	    vb = lhsValues[1].getValue();
	    vc = lhsValues[2].getValue();
	    vd = lhsValues[3].getValue();
	}
	double calculateDiffs(double x, double y[], double rs) {
	    return (vb*(vc*vc-y[0]*y[0])*y[1]-vd*y[0]+rs)/va;
	}
	String getDescription() {
	    return "ay''+b(c\u00b2-y\u00b2)y'+dy";
	}
	void newFunc() {
	    lhsValues[0].setup("a",   6, 0);
	    lhsValues[1].setup("b", .04, 0);
	    lhsValues[2].setup("c",   3, 0);
	    lhsValues[3].setup("d",  21, 0);
	    setPoint(getRangeStart(), 1);
	}
	LhsFunc createNext() { return null; }
    }

    abstract class RhsFunc {
	void setup() {}
	boolean isCustom() { return false; }
	abstract double calculate(double x, double y[]);
	abstract RhsFunc createNext();
	abstract String getName();
	abstract String getDescription();
	void newFunc() {}
    }

    class ZeroRhsFunc extends RhsFunc {
	String getName() { return "zero"; }
	double calculate(double x, double y[]) { return 0; }
	RhsFunc createNext() { return new ImpulseRhsFunc(); }
	String getDescription() { return "0"; }
    }

    class ImpulseRhsFunc extends RhsFunc {
	String getName() { return "impulse"; }
	double vd, ve;
	void setup() {
	    vd = rhsValues[0].getValue();
	    ve = rhsValues[1].getValue();
	}
	double calculate(double x, double y[]) {
	    return x < 0 ? 0 : (x < vd) ? ve : 0;
	}
	RhsFunc createNext() { return new StepRhsFunc(); }
	String getDescription() { return "h(H(x-g)-H(x))"; }
	void newFunc() {
	    rhsValues[0].setup("g", 20, 0);
	    rhsValues[1].setup("h",  3, 0);
	}
    }

    class StepRhsFunc extends RhsFunc {
	double ve;
	void setup() {
	    ve = rhsValues[0].getValue();
	}
	String getName() { return "step"; }
	double calculate(double x, double y[]) {
	    return x > 0 ? ve : 0;
	}
	String getDescription() { return "h H(x)"; }
	RhsFunc createNext() { return new SquareWaveRhsFunc(); }
	void newFunc() {
	    rhsValues[0].setup("h", 3, 0);
	}
    }

    class SquareWaveRhsFunc extends RhsFunc {
	String getName() { return "square wave"; }
	double vd, ve;
	void setup() {
	    vd = 3.14159265*2/rhsValues[0].getValue();
	    ve = rhsValues[1].getValue();
	}
	double calculate(double x, double y[]) {
	    return (((int) x+100) % vd > (vd/2)) ? -ve : ve;
	}
	String getDescription() { return "h Square(gx)"; }
	RhsFunc createNext() { return new SineWaveRhsFunc(); }
	void newFunc() {
	    rhsValues[0].setup("g", .25, 0);
	    rhsValues[1].setup("h",   3, 0);
	}
    }

    class SineWaveRhsFunc extends RhsFunc {
	String getName() { return "sine wave"; }
	double vd, ve;
	void setup() {
	    vd = rhsValues[0].getValue();
	    ve = rhsValues[1].getValue();
	}
	double calculate(double x, double y[]) {
	    return java.lang.Math.sin(x*vd)*ve;
	}
	String getDescription() { return "h sin(gx)"; }
	RhsFunc createNext() { return new SawtoothRhsFunc(); }
	void newFunc() {
	    rhsValues[0].setup("g", .25, 0);
	    rhsValues[1].setup("h",   3, 0);
	}
    }
    class SawtoothRhsFunc extends RhsFunc {
	String getName() { return "sawtooth"; }
	double vd, ve;
	void setup() {
	    vd = 3.14159265*2/rhsValues[0].getValue();
	    ve = rhsValues[1].getValue();
	}
	double calculate(double x, double y[]) {
	    x = (x+100) % vd;
	    return (2*x/vd - 1) * ve;
	}
	String getDescription() { return "h Saw(gx)"; }
	RhsFunc createNext() { return new TriangleRhsFunc(); }
	void newFunc() {
	    rhsValues[0].setup("g", .25, 0);
	    rhsValues[1].setup("h",   3, 0);
	}
    }
    class TriangleRhsFunc extends RhsFunc {
	String getName() { return "triangle"; }
	double vd, ve;
	void setup() {
	    vd = 3.14159265/rhsValues[0].getValue();
	    ve = rhsValues[1].getValue();
	}
	double calculate(double x, double y[]) {
	    x = (x+100) % (vd*2);
	    if (x >= vd)
		return -(2*(x-vd)/vd - 1)*ve;
	    return (2*x/vd - 1) * ve;
	}
	String getDescription() { return "h Tri(gx)"; }
	void newFunc() {
	    rhsValues[0].setup("g", .25, 0);
	    rhsValues[1].setup("h",   3, 0);
	}
	RhsFunc createNext() { return new LinearRhsFunc(); }
    }
    class LinearRhsFunc extends RhsFunc {
	String getName() { return "linear"; }
	double vd;
	void setup() {
	    vd = rhsValues[0].getValue();
	}
	double calculate(double x, double y[]) {
	    return vd*x;
	}
	RhsFunc createNext() { return new ExponentialRhsFunc(); }
	String getDescription() { return "hx"; }
	void newFunc() {
	    rhsValues[0].setup("h", .1, 0);
	}
    }
    class ExponentialRhsFunc extends RhsFunc {
	String getName() { return "exponential"; }
	double vg, vh;
	void setup() {
	    vg = rhsValues[0].getValue();
	    vh = rhsValues[1].getValue();
	}
	double calculate(double x, double y[]) {
	    return java.lang.Math.exp(x*vg)*vh;
	}
	RhsFunc createNext() { return new CustomRhsFunc(); }
	String getDescription() { return "h exp(gx)"; }
	void newFunc() {
	    rhsValues[0].setup("g", .035, 0);
	    rhsValues[1].setup("h", .33,  0);
	}
    }

    class CustomRhsFunc extends RhsFunc {
	String getName() { return "custom function"; }
	boolean isCustom() { return true; }
	RhsFunc createNext() { return new CustomYRhsFunc(); }
	double calculate(double x, double y[]) {
	    int xx = (int) ((x - xRangeStart) /xRangeWidth * sampleCount);
	    if (xx < 0)
		xx = 0;
	    if (xx >= sampleCount)
		xx = sampleCount-1;
	    return forceFunc[xx];
	}
	String getDescription() { return "f(x)"; }
    }

    class CustomYRhsFunc extends RhsFunc {
	String getName() { return "custom function * y"; }
	boolean isCustom() { return true; }
	RhsFunc createNext() { return new CustomYPRhsFunc(); }
	double calculate(double x, double y[]) {
	    int xx = (int) ((x - xRangeStart) /xRangeWidth * sampleCount);
	    if (xx < 0)
		xx = 0;
	    if (xx >= sampleCount)
		xx = sampleCount-1;
	    return y == null ? forceFunc[xx] : forceFunc[xx] * y[0];
	}
	String getDescription() { return "f(x)y"; }
    }

    class CustomYPRhsFunc extends RhsFunc {
	String getName() { return "custom function * y'"; }
	boolean isCustom() { return true; }
	RhsFunc createNext() { return null; }
	double calculate(double x, double y[]) {
	    int xx = (int) ((x - xRangeStart) /xRangeWidth * sampleCount);
	    if (xx < 0)
		xx = 0;
	    if (xx >= sampleCount)
		xx = sampleCount-1;
	    return y == null ? forceFunc[xx] : forceFunc[xx] * y[1];
	}
	String getDescription() { return "f(x)y'"; }
    }

    class ValueEditCanvas extends Canvas
	  implements MouseListener, MouseMotionListener {

	boolean selectedNumber, selectedSign, dragging;
	int dragX, dragY;
	int flags;
	int labelWidth, signWidth;
	int storedChange;
	double value, oldValue, max;
	String label;
	static final int intscale = 4;

	ValueEditCanvas() {
	    addMouseMotionListener(this);
	    addMouseListener(this);
	    value = 1;
	    label = "";
	}

	void setLabel(String s) {
	    label = s + " = ";
	    flags = 0;
	    max = 1e80;
	    show();
	    repaint();
	}

	void setMax(double d) { max = d; }

	void setup(String s, double x, int f) {
	    setLabel(s);
	    setFlags(f);
	    setValue(x);
	}

	double getValue() {
	    return value;
	}

	void setValue(double x) {
	    // setValue() doesn't do anything if we are in the middle
	    // of editing the value.
	    if (dragging)
		return;
	    /*double xabs = java.lang.Math.abs(x);
	    if (xabs > 0 && xabs < 1e-6)
	    x = 0;*/ // XXX
	    value = x;
	    round();
	    repaint();
	}

	void round() {
	    if (isInteger() || isHalfInteger()) {
		value = (int) value;
		if (isHalfInteger()) {
		    if (value < 0)
			value -= .5;
		    else
			value += .5;
		}
	    }
	}

	boolean isNonNegative() {
	    return (flags & VEC_NONNEG) != 0;
	}

	boolean isInteger() {
	    return (flags & VEC_INTEGER) != 0;
	}

	boolean isHalfInteger() {
	    return (flags & VEC_HALFINTEGER) != 0;
	}

	boolean isNonZero() {
	    return (flags & VEC_NONZERO) != 0;
	}

	boolean isConst() {
	    return (flags & VEC_CONSTANT) != 0;
	}

	void setFlags(int f) {
	    flags = f;
	    if (isNonNegative() && value < 0)
		value = -value;
	    if (isNonZero() && value == 0)
		value = 1;
	    repaint();
	}
	public Dimension getPreferredSize() {
	    return new Dimension(200,20);
	}
	public void paintComponent(Graphics g) {
	    super.paintComponent(g);
	    FontMetrics fm = g.getFontMetrics();
	    labelWidth = fm.stringWidth(label);
	    signWidth = fm.stringWidth("+ ");
	    g.drawString(label, 0, 15);
	    g.setColor(selectedSign ? Color.red : Color.blue);
	    g.drawString(value > 0 ? "+" :
			 value == 0 ? "0" : "-", labelWidth, 15);
	    if (value != 0) {
		g.setColor(selectedNumber || dragging ?
			   Color.red : Color.blue);
		double v = java.lang.Math.abs(value);
		String s = nf.format(v);
		if (s.equals("0")) {
		    s = Double.toString(v);
		    int n = s.indexOf('E');
		    s = s.substring(0, 5) + s.substring(n);
		}
		g.drawString(s, labelWidth+signWidth, 15);
	    }
	}
	public void mouseDragged(MouseEvent e) {
	    if (isConst())
		return;
	    int change = e.getX() - dragX;
	    if (value == 0) {
		value = (change > 0) ? .01 : -.01;
		if (isNonNegative() && change < 0)
		    value = 0;
	    }
	    if (isInteger() || isHalfInteger()) {
		change += storedChange;
		storedChange = (change % intscale);
		value += change/intscale;
		if (isNonNegative() && value < 0)
		    value = 0;
		if (isNonZero() && value == 0)
		    value = 1;
	    } else {
		if (value < 0)
		    change = -change;
		value *= java.lang.Math.exp(change*.05);
	    }
	    if (value > max)
		value = max;
	    if (java.lang.Math.abs(value) < .00001 && !isNonZero())
		value = 0;
	    round();
	    if (value != 0)
		oldValue = value;
	    valueChanged(this);
	    dragX = e.getX();
	    dragY = e.getY();
	    dragging = true;
	    repaint();
	}
	public void mouseMoved(MouseEvent e) {
	    if (isConst())
		return;
	    if (e.getX() < labelWidth+signWidth) {
		if (!selectedSign) {
		    selectedSign = true;
		    selectedNumber = false;
		    repaint();
		}
	    } else {
		if (!selectedNumber) {
		    selectedNumber = true;
		    selectedSign = false;
		    repaint();
		}
	    }
	}
	public void mouseClicked(MouseEvent e) {
	    if (selectedSign) {
		if (e.getClickCount() == 2 && !isNonZero()) {
		    oldValue = value;
		    value = 0;
		} else if (value == 0)
		    value = oldValue;
		else if (!isNonNegative())
		    value = -value;
		valueChanged(this);
		repaint();
	    }
	}
	public void mouseEntered(MouseEvent e) {
	    if (isConst())
		return;
	    if (e.getX() < labelWidth+signWidth)
		selectedSign = true;
	    else
		selectedNumber = true;
	    repaint();
	}
	public void mouseExited(MouseEvent e) {
	    if (isConst())
		return;
	    selectedNumber = selectedSign = false;
	    repaint();
	}
	public void mousePressed(MouseEvent e) {
	    dragX = e.getX();
	    dragY = e.getY();
	    storedChange = 0;
	}
	public void mouseReleased(MouseEvent e) {
	    if (isConst())
		return;
	    dragging = false;
	    repaint();
	}
    }
    
    // returns rj, rjp, ry, ryp in values[]
    void bessjy(double x, double xnu, double values[]) {
	final double EPS = 1.0e-16;
	final double FPMIN = 1.0e-30;
	final double MAXIT = 10000;
	final double XMIN = 2.0;
	final double PI = 3.141592653589793;
	
	if (x == 0)
	    x = 1e-20;
	int i,isign,l,nl;
	double a,b,br,bi,c,cr,ci,d,del,del1,den,di,dlr,dli,dr,e,f,fact,fact2,
	    fact3,ff,gam,gam1,gam2,gammi,gampl,h,p,pimu,pimu2,q,r,rjl,
	    rjl1,rjmu,rjp1,rjpl,rjtemp,ry1,rymu,rymup,rytemp,sum,sum1,
	    temp,w,x2,xi,xi2,xmu,xmu2;
  
	if (x <= 0.0 || xnu < 0.0) {
	    System.out.print("bad arguments in bessjy\n");
	    return;
	}
	nl=(x < XMIN ? (int)(xnu+0.5) : (int)(xnu-x+1.5));
	if (nl < 0)
	    nl = 0;
	xmu=xnu-nl;
	xmu2=xmu*xmu;
	xi=1.0/x;
	xi2=2.0*xi;
	w=xi2/PI;
	isign=1;
	h=xnu*xi;
	if (h < FPMIN) h=FPMIN;
	b=xi2*xnu;
	d=0.0;
	c=h;
	for (i=1;i<=MAXIT;i++) {
	    b += xi2;
	    d=b-d;
	    if (java.lang.Math.abs(d) < FPMIN) d=FPMIN;
	    c=b-1.0/c;
	    if (java.lang.Math.abs(c) < FPMIN) c=FPMIN;
	    d=1.0/d;
	    del=c*d;
	    h=del*h;
	    if (d < 0.0) isign = -isign;
	    if (java.lang.Math.abs(del-1.0) < EPS) break;
	}
	if (i > MAXIT) {
	    System.out.print("x too large in bessjy; try asymptotic expansion\n");
	    return;
	}
	rjl=isign*FPMIN;
	rjpl=h*rjl;
	rjl1=rjl;
	rjp1=rjpl;
	fact=xnu*xi;
	for (l=nl;l>=1;l--) {
	    rjtemp=fact*rjl+rjpl;
	    fact -= xi;
	    rjpl=fact*rjtemp-rjl;
	    rjl=rjtemp;
	}
	if (rjl == 0.0) rjl=EPS;
	f=rjpl/rjl;
	if (x < XMIN) {
	    x2=0.5*x;
	    pimu=PI*xmu;
	    fact = (java.lang.Math.abs(pimu) < EPS ? 1.0 : pimu/java.lang.Math.sin(pimu));
	    d = -java.lang.Math.log(x2);
	    e=xmu*d;
	    fact2 = (java.lang.Math.abs(e) < EPS ? 1.0 :
		     (java.lang.Math.exp(e)-java.lang.Math.exp(-e))/(2*e));
	    double gvalues[] = new double[4];
	    beschb(xmu,gvalues);
	    ff=2.0/PI*fact*(gvalues[0]*
			    (java.lang.Math.exp(e)+java.lang.Math.exp(-e))/2+
			    gvalues[1]*fact2*d);
	    e=java.lang.Math.exp(e);
	    p=e/(gvalues[2]*PI);
	    q=1.0/(e*PI*gvalues[3]);
	    pimu2=0.5*pimu;
	    fact3 = (java.lang.Math.abs(pimu2) < EPS ? 1.0 : java.lang.Math.sin(pimu2)/pimu2);
	    r=PI*pimu2*fact3*fact3;
	    c=1.0;
	    d = -x2*x2;
	    sum=ff+r*q;
	    sum1=p;
	    for (i=1;i<=MAXIT;i++) {
		ff=(i*ff+p+q)/(i*i-xmu2);
		c *= (d/i);
		p /= (i-xmu);
		q /= (i+xmu);
		del=c*(ff+r*q);
		sum += del;
		del1=c*p-i*del;
		sum1 += del1;
		if (java.lang.Math.abs(del) < (1.0+java.lang.Math.abs(sum))*EPS) break;
	    }
	    if (i > MAXIT) {
		System.out.print("bessy series failed to converge\n");
		return;
	    }
	    rymu = -sum;
	    ry1 = -sum1*xi2;
	    rymup=xmu*xi*rymu-ry1;
	    rjmu=w/(rymup-f*rymu);
	} else {
	    a=0.25-xmu2;
	    p = -0.5*xi;
	    q=1.0;
	    br=2.0*x;
	    bi=2.0;
	    fact=a*xi/(p*p+q*q);
	    cr=br+q*fact;
	    ci=bi+p*fact;
	    den=br*br+bi*bi;
	    dr=br/den;
	    di = -bi/den;
	    dlr=cr*dr-ci*di;
	    dli=cr*di+ci*dr;
	    temp=p*dlr-q*dli;
	    q=p*dli+q*dlr;
	    p=temp;
	    for (i=2;i<=MAXIT;i++) {
		a += 2*(i-1);
		bi += 2.0;
		dr=a*dr+br;
		di=a*di+bi;
		if (java.lang.Math.abs(dr)+java.lang.Math.abs(di) < FPMIN) dr=FPMIN;
		fact=a/(cr*cr+ci*ci);
		cr=br+cr*fact;
		ci=bi-ci*fact;
		if (java.lang.Math.abs(cr)+java.lang.Math.abs(ci) < FPMIN) cr=FPMIN;
		den=dr*dr+di*di;
		dr /= den;
		di /= -den;
		dlr=cr*dr-ci*di;
		dli=cr*di+ci*dr;
		temp=p*dlr-q*dli;
		q=p*dli+q*dlr;
		p=temp;
		if (java.lang.Math.abs(dlr-1.0)+java.lang.Math.abs(dli) < EPS) break;
	    }
	    if (i > MAXIT) {
		System.out.print("cf2 failed in bessjy\n");
		return;
	    }
	    gam=(p-f)/q;
	    rjmu=java.lang.Math.sqrt(w/((p-f)*gam+q));
	    rjmu=(rjl > 0) ? rjmu : -rjmu;
	    rymu=rjmu*gam;
	    rymup=rymu*(p+q/gam);
	    ry1=xmu*xi*rymu-rymup;
	}
	fact=rjmu/rjl;
	values[0] = rjl1*fact;
	values[1] = rjp1*fact;
	for (i=1;i<=nl;i++) {
	    rytemp=(xmu+i)*xi2*ry1-rymu;
	    rymu=ry1;
	    ry1=rytemp;
	}
	values[2] = rymu;
	values[3] = xnu*xi*rymu-ry1;
    }
    
    // returns gam1, gam2, gampl, gammi in values[]
    void beschb(double x, double values[]) {
	double xx;
	final double c1[] = {
	    -1.142022680371172e0,6.516511267076e-3,
		3.08709017308e-4,-3.470626964e-6,6.943764e-9,
		3.6780e-11,-1.36e-13};
	final double c2[] = {
		1.843740587300906e0,-0.076852840844786e0,
		1.271927136655e-3,-4.971736704e-6,-3.3126120e-8,
		2.42310e-10,-1.70e-13,-1.0e-15};

	xx=8.0*x*x-1.0;
	values[0] = chebev(-1.0,1.0,c1,7,xx);
	values[1] = chebev(-1.0,1.0,c2,8,xx);
	values[2] = values[1]-x*values[0];
	values[3] = values[1]+x*values[0];
    }

    double chebev(double a,double b,double c[],int m,double x) {
	double d=0.0,dd=0.0,sv,y,y2;
	int j;
	
	if ((x-a)*(x-b) > 0.0) {
	    System.out.print("x not in range in routine CHEBEV\n");
	    return 0;
	}
	y2=2.0*(y=(2.0*x-a-b)/(b-a));
	for (j=m-1;j>=1;j--) {
	    sv=d;
	    d=y2*d-dd+c[j];
	    dd=sv;
	}
	return y*d-dd+0.5*c[0];
    }

    void legendreP(int n, double x, double pn[], double pd[])
    {
	double p0 = 1;
	double p1 = x;
	int k;
	pn[0] = 1; pn[1] = x;
	pd[0] = 0; pd[1] = 1;
	for (k = 2; k <= n; k++) {
	    double pf = (2*k-1.)/k*x*p1-(k-1.)/k*p0;
	    pn[k] = pf;
	    if (x == 1 || x == -1)
		pd[k] = .5*java.lang.Math.pow(x, k+1)*k*(k+1);
	    else
		pd[k] = k*(p1-x*pf)/(1-x*x);
	    p0 = p1;
	    p1 = pf;
	}
    }
    
    void legendreQ(int n, double x, double qn[], double qd[])
    {
	double q0, q1;
	int k;
	if (x == 1)
	    x = .999999999999999;
	if (x == -1)
	    x = -.99999999999999;
	q0 = .5*java.lang.Math.log((1+x)/(1-x));
	q1 = x*q0 - 1;
	qn[0] = q0;
	qn[1] = q1;
	qd[0] = 1/(1-x*x);
	qd[1] = qn[0]+x*qd[0];
	for (k = 2; k <= n; k++) {
	    double qf = ((2*k-1.)*x*q1-(k-1)*q0)/k;
	    qn[k] = qf;
	    qd[k] = (qn[k-1]-x*qf)*k/(1-x*x);
	    q0 = q1;
	    q1 = qf;
	}
    }
}
