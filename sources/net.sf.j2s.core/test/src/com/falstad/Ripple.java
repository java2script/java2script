package com.falstad;

//Ripple.java (c) 2001 by Paul Falstad, www.falstad.com

//web_Ready
//web_AppletName= Ripple
//web_Description= A simulation of a ripple tank demonstrating wave interference.
//web_JavaVersion= http://www.falstad.com/ripple/
//web_AppletImage= ripple.png
//web_Category= Physics - waves
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, AWT-to-Swing

// see http://www.falstad.com/ripple/

// Conversion to JavaScript by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
// Changes include:
//
// import javax.swing.applet.Applet --> a2s.Applet
// 
// import java.awt.[Button, Canvas, Checkbox, Choice, Frame, Label, Scrollbar, TextArea, Dialog] --> a2s.*
//
// RippleFrame.paint --> RippleFrame.paintComponent
//
// Applet.show does not trigger componentShown(e); showFrame() moved to Ripple.init()
// 
// RippleFrame.init() changed to RippleFrame.initRF
//
// Class.getMethod not implemented; timerMethod option removed
// 
// note: In JavaScript System.getProperty("java.class.version") is null, so useBufferedImage is false
//
// deprecated method .size --> .getSize
// deprecated method .resize --> .setSize
// deprecated method .move --> .setLocation
// deprecated method .show --> .setVisible(true)
// deprecated method .hide --> .setVisible(false)
//
// removal of setBackground() for canvas. 


// optimizations for JavaScript:
//
// 1. changed some FOR statements to be more efficient
// 2. added JavaScript-specific options for setting default resolution and speed
// 3. changed logic in code to stop adjusting if resolutions is sufficient.


// program fixes:
// BH changed impDialog.show(false) to impDialog.dispose();
// BH added for impDialog setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
// BH added for frame setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);


import java.awt.Adjustable;
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
import java.awt.event.InputEvent;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.image.BufferedImage;
import java.awt.image.MemoryImageSource;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Random;
import java.util.StringTokenizer;
import java.util.Vector;

import javax.swing.SwingConstants;
import javax.swing.WindowConstants;

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


class RippleCanvas extends Canvas {
	RippleFrame pg;

	RippleCanvas(RippleFrame p) {
		pg = p;
	}

	@Override
	public Dimension getPreferredSize() {
		return new Dimension(300, 400);
	}

	@Override
	public void update(Graphics g) {
		pg.updateRipple(g);
	}

	@Override
	public void paintComponent(Graphics g) {
		pg.updateRipple(g);
	}
}

class RippleLayout implements LayoutManager {
	public RippleLayout() {
	}

	@Override
	public void addLayoutComponent(String name, Component c) {
	}

	@Override
	public void removeLayoutComponent(Component c) {
	}

	@Override
	public Dimension preferredLayoutSize(Container target) {
		return new Dimension(500, 500);
	}

	@Override
	public Dimension minimumLayoutSize(Container target) {
		return new Dimension(100, 100);
	}

	@Override
	public void layoutContainer(Container target) {
		Insets insets = target.getInsets();
		int targetw = target.getSize().width - insets.left - insets.right;
		int cw = targetw * 7 / 10;
		if (target.getComponentCount() == 1)
			cw = targetw;
		int targeth = target.getSize().height - (insets.top + insets.bottom);
		target.getComponent(0).setLocation(insets.left, insets.top);
		target.getComponent(0).setSize(cw, targeth);
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
				if (m instanceof Choice && d.width > barwidth)
					d.width = barwidth;
				if (m instanceof Label) {
					h += d.height / 5;
					d.width = barwidth;
				}
				m.setLocation(cw, h);
				m.setSize(d.width, d.height);
				h += d.height;
			}
		}
	}
}

public class Ripple extends Applet implements ComponentListener {
	RippleFrame ogf;

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
		Ripple ripple = new Ripple();
		ripple.showFrame();
	}

	void showFrame() {
		if (ogf == null) {
			started = true;
			ogf = new RippleFrame(this);
			ogf.initFrame();
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

	@Override
	public void componentHidden(ComponentEvent e) {
	}

	@Override
	public void componentMoved(ComponentEvent e) {
	}

	@Override
	public void componentShown(ComponentEvent e) {
		showFrame();
	}

	@Override
	public void componentResized(ComponentEvent e) {
		if (ogf != null)
			ogf.handleResize();
	}

	@Override
	public void destroy() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}
}

class RippleFrame extends Frame implements ComponentListener, ActionListener,
		AdjustmentListener, MouseMotionListener, MouseListener, ItemListener {

	
	// original values:
	int defaultSpeed = 1, defaultResolution = 110, startupTime = 1000, resolutionCutoff = 55;
	
	Thread engine = null;

	Dimension winSize;
	Image dbimage;

	Random random;
	int gridSizeX;
	int gridSizeY;
	int gridSizeXY;
	int gw;
	int windowWidth = 50;
	int windowHeight = 50;
	int windowOffsetX = 0;
	int windowOffsetY = 0;
	int windowBottom = 0;
	int windowRight = 0;
	public static final int sourceRadius = 7;
	public static final double freqMult = .0233333;

	public String getAppletInfo() {
		return "Ripple by Paul Falstad";
	}

	Container main;
	Button blankButton;
	Button blankWallsButton;
	Button borderButton;
	Button exportButton;
	Checkbox stoppedCheck;
	Checkbox fixedEndsCheck;
	Checkbox view3dCheck;
	Choice modeChooser;
	Choice sourceChooser;
	Choice setupChooser;
	Choice colorChooser;
	Vector setupList;
	Setup setup;
	Scrollbar dampingBar;
	Scrollbar speedBar;
	Scrollbar freqBar;
	Scrollbar resBar;
	Scrollbar brightnessBar;
	Scrollbar auxBar;
	Label auxLabel;
	double dampcoef;
	double freqTimeZero;
	double movingSourcePos = 0;
	double brightMult = 1;
	static final double pi = 3.14159265358979323846;
	float func[];
	float funci[];
	float damp[];
	boolean walls[];
	boolean exceptional[];
	int medium[];
	OscSource sources[];
	static final int MODE_SETFUNC = 0;
	static final int MODE_WALLS = 1;
	static final int MODE_MEDIUM = 2;
	static final int MODE_FUNCHOLD = 3;
	int dragX, dragY, dragStartX = -1, dragStartY;
	int selectedSource = -1;
	int sourceIndex;
	int freqBarValue;
	boolean dragging;
	boolean dragClear;
	boolean dragSet;
	public boolean useFrame;
	boolean showControls;
	double t;
	MemoryImageSource imageSource;
	int pixels[];
	int sourceCount = -1;
	boolean sourcePlane = false;
	boolean sourceMoving = false;
	boolean increaseResolution = false;
	boolean adjustResolution = true;
	int sourceFreqCount = -1;
	int sourceWaveform = SWF_SIN;
	int auxFunction;
	long startTime;
	Color wallColor, posColor, negColor, zeroColor, medColor, posMedColor,
			negMedColor, sourceColor;
	Color schemeColors[][];
	Method timerMethod;
	int timerDiv;
	ImportDialog impDialog;
	static final int mediumMax = 191;
	static final double mediumMaxIndex = .5;
	static final int SWF_SIN = 0;
	static final int SWF_SQUARE = 1;
	static final int SWF_PULSE = 2;
	static final int AUX_NONE = 0;
	static final int AUX_PHASE = 1;
	static final int AUX_FREQ = 2;
	static final int AUX_SPEED = 3;
	static final int SRC_NONE = 0;
	static final int SRC_1S1F = 1;
	static final int SRC_2S1F = 3;
	static final int SRC_2S2F = 4;
	static final int SRC_4S1F = 6;
	static final int SRC_1S1F_PULSE = 8;
	static final int SRC_1S1F_MOVING = 9;
	static final int SRC_1S1F_PLANE = 10;
	static final int SRC_2S1F_PLANE = 12;
	static final int SRC_1S1F_PLANE_PULSE = 14;
	static final int SRC_1S1F_PLANE_PHASE = 15;
	static final int SRC_6S1F = 16;
	static final int SRC_8S1F = 17;
	static final int SRC_10S1F = 18;
	static final int SRC_12S1F = 19;
	static final int SRC_16S1F = 20;
	static final int SRC_20S1F = 21;

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	RippleCanvas cv;
	Ripple applet;

	RippleFrame(Ripple a) {
		// note -- this frame has no owner, and when the applet is embedded, 
		// it will display only if useFrame="true" in the parameters
		// and if that is not the case, then RippleFrame will never show, 
		// and ImportDialog will never show, either, as its parent frame (RippleFrame)
		// is hiding.
		super("Ripple Tank Applet v1.7f");
		setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
		/**
		 * @j2sNative
		 *            this.defaultSpeed = 6; this.defaultResolution = 110;
		 *            this.startupTime = 1500; this.resolutionCutoff = 200;
		 * 
		 * 
		 */
		{
			defaultSpeed = 1;
			defaultResolution = 160;
			startupTime  = 1000;
			resolutionCutoff = 55;
		}

		applet = a;
		useFrame = true;
		showControls = true;
		adjustResolution = true;
	}

	boolean useBufferedImage = false;

	public void initFrame() {
		
		
		
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
		Setup s = new SingleSourceSetup();
		while (s != null) {
			setupList.addElement(s);
			s = s.createNext();
		}
		String os = System.getProperty("os.name");
		int res = defaultResolution;
		String jv = System.getProperty("java.class.version");
		double jvf = new Double(jv).doubleValue();
		// note: jvf will be 0 for JavaScript
		if (jvf >= 48)
			useBufferedImage = true;

		/**
		 * @j2sIgnore
		 * 
		 */
		{
			try {
				Class sysclass = Class.forName("java.lang.System");
				timerMethod = sysclass.getMethod("nanoTime", null);
				timerDiv = 1000000;
				if (timerMethod == null) {
					timerMethod = sysclass.getMethod("currentTimeMillis", null);
					timerDiv = 1;
				}
			} catch (Exception ee) {
				ee.printStackTrace();
			}
		}

		sources = new OscSource[20];
		main.setLayout(new RippleLayout());
		cv = new RippleCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		main.add(cv);

		setupChooser = new Choice();
		int i;
		for (i = 0; i != setupList.size(); i++)
			setupChooser.add("Setup: " + ((Setup) setupList.elementAt(i)).getName());
		setupChooser.addItemListener(this);
		if (showControls)
			main.add(setupChooser);

		// add(new Label("Source mode:", Label.CENTER));
		sourceChooser = new Choice();
		sourceChooser.add("No Sources");
		sourceChooser.add("1 Src, 1 Freq");
		sourceChooser.add("1 Src, 2 Freq");
		sourceChooser.add("2 Src, 1 Freq");
		sourceChooser.add("2 Src, 2 Freq");
		sourceChooser.add("3 Src, 1 Freq");
		sourceChooser.add("4 Src, 1 Freq");
		sourceChooser.add("1 Src, 1 Freq (Square)");
		sourceChooser.add("1 Src, 1 Freq (Pulse)");
		sourceChooser.add("1 Moving Src");
		sourceChooser.add("1 Plane Src, 1 Freq");
		sourceChooser.add("1 Plane Src, 2 Freq");
		sourceChooser.add("2 Plane Src, 1 Freq");
		sourceChooser.add("2 Plane Src, 2 Freq");
		sourceChooser.add("1 Plane 1 Freq (Pulse)");
		sourceChooser.add("1 Plane 1 Freq w/Phase");
		sourceChooser.add("6 Src, 1 Freq");
		sourceChooser.add("8 Src, 1 Freq");
		sourceChooser.add("10 Src, 1 Freq");
		sourceChooser.add("12 Src, 1 Freq");
		sourceChooser.add("16 Src, 1 Freq");
		sourceChooser.add("20 Src, 1 Freq");
		sourceChooser.addItemListener(this);
		if (showControls)
			main.add(sourceChooser);

		// add(new Label("Mouse mode:", Label.CENTER));
		modeChooser = new Choice();
		modeChooser.add("Mouse = Edit Wave");
		modeChooser.add("Mouse = Edit Walls");
		modeChooser.add("Mouse = Edit Medium");
		modeChooser.add("Mouse = Hold Wave");
		modeChooser.addItemListener(this);
		if (showControls)
			main.add(modeChooser);

		colorChooser = new Choice();
		colorChooser.addItemListener(this);
		if (showControls)
			main.add(colorChooser);

		blankButton = new Button("Clear Waves");
		if (showControls)
			main.add(blankButton);
		blankButton.addActionListener(this);
		blankWallsButton = new Button("Clear Walls");
		if (showControls)
			main.add(blankWallsButton);
		blankWallsButton.addActionListener(this);
		borderButton = new Button("Add Border");
		if (showControls)
			main.add(borderButton);
		borderButton.addActionListener(this);
		exportButton = new Button("Import/Export");
		if (showControls)
			main.add(exportButton);
		exportButton.addActionListener(this);
		stoppedCheck = new Checkbox("Stopped");
		stoppedCheck.addItemListener(this);
		if (showControls)
			main.add(stoppedCheck);
		fixedEndsCheck = new Checkbox("Fixed Edges", true);
		fixedEndsCheck.addItemListener(this);
		if (showControls)
			main.add(fixedEndsCheck);

		view3dCheck = new Checkbox("3-D View");
		view3dCheck.addItemListener(this);
		if (showControls)
			main.add(view3dCheck);

		Label l = new Label("Simulation Speed", SwingConstants.CENTER);
		speedBar = new Scrollbar(Adjustable.HORIZONTAL, defaultSpeed, 1, 1, 20);
		if (showControls) {
			main.add(l);
			main.add(speedBar);
		}
		speedBar.setName(l.getText());
		speedBar.addAdjustmentListener(this);

		l = new Label("Resolution", SwingConstants.CENTER);
		resBar = new Scrollbar(Adjustable.HORIZONTAL, res, 5, 5, 400);
		resBar.setName(l.getText());
		if (showControls) {
			main.add(l);
			main.add(resBar);
		}
		resBar.addAdjustmentListener(this);
		
		l = new Label("Damping", SwingConstants.CENTER);
		dampingBar = new Scrollbar(Adjustable.HORIZONTAL, 10, 1, 2, 100);
		dampingBar.addAdjustmentListener(this);
		dampingBar.setName(l.getText());
		if (showControls) {
			main.add(l);
			main.add(dampingBar);
		}

		l = new Label("Source Frequency", SwingConstants.CENTER);
		freqBar = new Scrollbar(Adjustable.HORIZONTAL, freqBarValue = 15, 1, 1, 30);
		freqBar.addAdjustmentListener(this);
		if (showControls) {
			main.add(l);
			main.add(freqBar);
		}
		freqBar.setName(l.getText());
		
		l = new Label("Brightness", SwingConstants.CENTER);
		brightnessBar = new Scrollbar(Adjustable.HORIZONTAL, 27, 1, 1, 1200);
		brightnessBar.addAdjustmentListener(this);
		if (showControls) {
			main.add(l);
			main.add(brightnessBar);
		}
		brightnessBar.setName(l.getText());
		
		auxLabel = new Label("", SwingConstants.CENTER);
		auxBar = new Scrollbar(Adjustable.HORIZONTAL, 1, 1, 1, 30);
		auxBar.addAdjustmentListener(this);
		if (showControls) {
			main.add(auxLabel);
			main.add(auxBar);
		}
    auxBar.setName("aux");
    
		if (showControls)
			main.add(new Label("http://www.falstad.com"));

		schemeColors = new Color[20][8];

		// BH moved here, after creation of dependent values
		if (!showControls)
			modeChooser.select(1);
		sourceChooser.select(SRC_1S1F);
		setResolution();

		try {
			String param;
			param = applet.getParameter("setup");
			if (param != null)
				setupChooser.select(Integer.parseInt(param));
			param = applet.getParameter("setupClass");
			if (param != null) {
				for (i = 0; i != setupList.size(); i++) {
					if (setupList.elementAt(i).getClass().getName()
							.equalsIgnoreCase("RippleFrame$" + param))
						break;
				}
				if (i != setupList.size())
					setupChooser.select(i);
			}
			for (i = 0; i != 20; i++) {
				param = applet.getParameter("colorScheme" + (i + 1));
				if (param == null)
					break;
				decodeColorScheme(i, param);
			}
		} catch (Exception e) {
			if (applet != null)
				e.printStackTrace();
		}
		if (colorChooser.getItemCount() == 0)
			addDefaultColorScheme();
		doColor();
		random = new Random();
		setDamping();
		setup = (Setup) setupList.elementAt(setupChooser.getSelectedIndex());
		reinit();
		//cv.setBackground(Color.black);
		cv.setForeground(Color.lightGray);
		startTime = getTimeMillis();

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
		reinit(true);
	}

	void reinit(boolean setup) {
		sourceCount = -1;
		System.out.print("reinit " + gridSizeX + " " + gridSizeY + "\n");
		gridSizeXY = gridSizeX * gridSizeY;
		gw = gridSizeY;
		func = new float[gridSizeXY];
		funci = new float[gridSizeXY];
		damp = new float[gridSizeXY];
		exceptional = new boolean[gridSizeXY];
		medium = new int[gridSizeXY];
		walls = new boolean[gridSizeXY];
		int i, j;
		for (i = 0; i != gridSizeXY; i++)
			damp[i] = 1f; // (float) dampcoef;
		for (i = 0; i != windowOffsetX; i++)
			for (j = 0; j != gridSizeX; j++)
				damp[i + j * gw] = damp[gridSizeX - 1 - i + gw * j] = damp[j + gw * i] = damp[j
						+ (gridSizeY - 1 - i) * gw] = (float) (.999 - (windowOffsetX - i) * .002);
		if (setup)
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
		if (winSize.width <= 0 || winSize.height <= 0) // should never be < 0 TODO
			return;
		aspectRatio = winSize.width/winSize.height;
		pixels = null;
		if (useBufferedImage) {
			try {
				/*
				 * simulate the following code using reflection: dbimage = new
				 * BufferedImage(d.width, d.height, BufferedImage.TYPE_INT_RGB);
				 * DataBuffer db = (DataBuffer)(((BufferedImage)dbimage).
				 * getRaster().getDataBuffer()); DataBufferInt dbi = (DataBufferInt) db;
				 * pixels = dbi.getData();
				 */
				Class biclass = Class.forName("java.awt.image.BufferedImage");
				Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
				Class rasclass = Class.forName("java.awt.image.Raster");
				Constructor cstr = biclass.getConstructor(new Class[] { int.class,
						int.class, int.class });
				dbimage = (Image) cstr.newInstance(new Object[] { new Integer(d.width),
						new Integer(d.height), new Integer(BufferedImage.TYPE_INT_RGB) });
				Method m = biclass.getMethod("getRaster", null);
				Object ras = m.invoke(dbimage, null);
				Object db = rasclass.getMethod("getDataBuffer", null).invoke(ras, null);
				pixels = (int[]) dbiclass.getMethod("getData", null).invoke(db, null);
			} catch (Exception ee) {
				// ee.printStackTrace();
				System.out.println("BufferedImage failed");
			}
		}
		if (pixels == null) {
			int npix = d.width * d.height;
			pixels = new int[npix];
			int i;
			for (i = npix; --i >= 0;)
				pixels[i] = 0xFF000000;
			
			// so imageSource holds the pixels along with width, height, offset and scan width
			
			imageSource = new MemoryImageSource(d.width, d.height, pixels, 0, d.width);
			imageSource.setAnimated(true);
			imageSource.setFullBufferUpdates(true);
			dbimage = cv.createImage(imageSource);
		}
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

	void doBlank() {
		int x, y;
		// I set all the elements in the grid to 1e-10 instead of 0 because
		// if I set them to zero, then the simulation slows down for a
		// short time until the grid fills up again. Don't ask me why!
		// I don't know. This showed up when I started using floats
		// instead of doubles.
		for (x = 0; x != gridSizeXY; x++)
			func[x] = funci[x] = 1e-10f;
	}

	void doBlankWalls() {
		int x, y;
		for (x = 0; x != gridSizeXY; x++) {
			walls[x] = false;
			medium[x] = 0;
		}
		calcExceptions();
	}

	void doBorder() {
		int x, y;
		for (x = 0; x < gridSizeX; x++) {
			setWall(x, windowOffsetY);
			setWall(x, windowBottom);
		}
		for (y = 0; y < gridSizeY; y++) {
			setWall(windowOffsetX, y);
			setWall(windowRight, y);
		}
		calcExceptions();
	}

	void setWall(int x, int y) {
		walls[x + gw * y] = true;
	}

	void setWall(int x, int y, boolean b) {
		walls[x + gw * y] = b;
	}

	void setMedium(int x, int y, int q) {
		medium[x + gw * y] = q;
	}

	long getTimeMillis() {
		try {
			/**
			 * @j2sNative
			 * 
			 *            return System.currentTimeMillis();
			 */
			{
				Long time = (Long) timerMethod.invoke(null, new Object[] {});
				return time.longValue() / timerDiv;
			}
		} catch (Exception ee) {
			ee.printStackTrace();
			return 0;
		}
	}

	void calcExceptions() {
		int x, y;
		// if walls are in place on border, need to extend that through
		// hidden area to avoid "leaks"
		for (x = 0; x != gridSizeX; x++)
			for (y = 0; y < windowOffsetY; y++) {
				walls[x + gw * y] = walls[x + gw * windowOffsetY];
				walls[x + gw * (gridSizeY - y - 1)] = walls[x + gw
						* (gridSizeY - windowOffsetY - 1)];
			}
		for (y = 0; y < gridSizeY; y++)
			for (x = 0; x < windowOffsetX; x++) {
				walls[x + gw * y] = walls[windowOffsetX + gw * y];
				walls[gridSizeX - x - 1 + gw * y] = walls[gridSizeX - windowOffsetX - 1
						+ gw * y];
			}
		// generate exceptional array, which is useful for doing
		// special handling of elements
		for (x = 1; x < gridSizeX - 1; x++)
			for (y = 1; y < gridSizeY - 1; y++) {
				int gi = x + gw * y;
				exceptional[gi] = walls[gi - 1] || walls[gi + 1] || walls[gi - gw]
						|| walls[gi + gw] || walls[gi] || medium[gi] != medium[gi - 1]
						|| medium[gi] != medium[gi + 1];
				if ((x == 1 || x == gridSizeX - 2)
						&& medium[gi] != medium[gridSizeX - 1 - x + gw * (y + 1)]
						|| medium[gi] != medium[gridSizeX - 1 - x + gw * (y - 1)])
					exceptional[gi] = true;
			}
		// put some extra exceptions at the corners to ensure tadd2, sinth,
		// etc get calculated
		exceptional[1 + gw] = exceptional[gridSizeX - 2 + gw] = exceptional[1
				+ (gridSizeY - 2) * gw] = exceptional[gridSizeX - 2 + (gridSizeY - 2)
				* gw] = true;
	}

	void centerString(Graphics g, String s, int y) {
		FontMetrics fm = g.getFontMetrics();
		g.drawString(s, (winSize.width - fm.stringWidth(s)) / 2, y);
	}

//	@Override
//	public void paint(Graphics g) {
//
//  BH: not needed, since cv, if it is a component of this frame, will be painted anyway,
//      and if it is not, then this frame will not be visible and will never be painted.
//
//		super.paint(g);
////		cv.repaint();
//	}

	long lastTime = 0, lastFrameTime, secTime = 0;
	int frames = 0;
	int steps = 0;
	int framerate = 0, steprate = 0;

	boolean moveRight = true;
	boolean moveDown = true;

	public void updateRipple(Graphics realg) {
		if (winSize == null || winSize.width <= 0 || winSize.height <= 0) {
			// this works around some weird bug in IE which causes the
			// applet to not show up properly sometimes.
			handleResize();
			return;
		}
		if (increaseResolution) {
			increaseResolution = false;
			if (resBar.getValue() < 495) {
				int res = resBar.getValue() + 10;
				System.out.println("increasing resolution to " + res);
				setResolution(res);
			}
		}
		long sysTime = getTimeMillis();
		double tadd = 0;
		if (!stoppedCheck.getState()) {
			int val = 5;//speedBar.getValue();
			tadd = val * .05;
		}
		int i, j;

		boolean stopFunc = dragging && selectedSource == -1
				&& view3dCheck.getState() == false
				&& modeChooser.getSelectedIndex() == MODE_SETFUNC;
		if (stoppedCheck.getState())
			stopFunc = true;
		int iterCount = speedBar.getValue();
		if (!stopFunc) {
			/*
			 * long sysTime = System.currentTimeMillis(); if (sysTime-secTime >= 1000)
			 * { framerate = frames; steprate = steps; frames = 0; steps = 0; secTime
			 * = sysTime; } lastTime = sysTime;
			 */
			int iter;
			int mxx = gridSizeX - 1;
			int mxy = gridSizeY - 1;
			for (iter = 0; iter != iterCount; iter++) {
				int jstart, jend, jinc;
				if (moveDown) {
					// we process the rows in alternate directions
					// each time to avoid any directional bias.
					jstart = 1;
					jend = mxy;
					jinc = 1;
					moveDown = false;
				} else {
					jstart = mxy - 1;
					jend = 0;
					jinc = -1;
					moveDown = true;
				}
				moveRight = moveDown;
				float sinhalfth = 0;
				float sinth = 0;
				float scaleo = 0;
				int curMedium = -1;
				for (j = jstart; j != jend; j += jinc) {
					int istart, iend, iinc;
					if (moveRight) {
						iinc = 1;
						istart = 1;
						iend = mxx;
						moveRight = false;
					} else {
						iinc = -1;
						istart = mxx - 1;
						iend = 0;
						moveRight = true;
					}
					int gi = j * gw + istart;
					int giEnd = j * gw + iend;
					for (; gi != giEnd; gi += iinc) {
						// calculate equilibrum point of this
						// element's oscillation
						float previ = func[gi - 1];
						float nexti = func[gi + 1];
						float prevj = func[gi - gw];
						float nextj = func[gi + gw];
						float basis = (nexti + previ + nextj + prevj) * .25f;
						if (exceptional[gi]) {
							if (curMedium != medium[gi]) {
								curMedium = medium[gi];
								double tadd2 = tadd
										* (1 - (mediumMaxIndex / mediumMax) * curMedium);
								sinhalfth = (float) Math.sin(tadd2 / 2);
								sinth = (float) (Math.sin(tadd2) * dampcoef);
								scaleo = (float) (1 - Math.sqrt(4 * sinhalfth * sinhalfth
										- sinth * sinth));
							}
							if (walls[gi])
								continue;
							int count = 4;
							if (fixedEndsCheck.getState()) {
								if (walls[gi - 1])
									previ = 0;
								if (walls[gi + 1])
									nexti = 0;
								if (walls[gi - gw])
									prevj = 0;
								if (walls[gi + gw])
									nextj = 0;
							} else {
								if (walls[gi - 1])
									previ = walls[gi + 1] ? func[gi] : func[gi + 1];
								if (walls[gi + 1])
									nexti = walls[gi - 1] ? func[gi] : func[gi - 1];
								if (walls[gi - gw])
									prevj = walls[gi + gw] ? func[gi] : func[gi + gw];
								if (walls[gi + gw])
									nextj = walls[gi - gw] ? func[gi] : func[gi - gw];
							}
							basis = (nexti + previ + nextj + prevj) * .25f;
						}
						// what we are doing here (aside from damping)
						// is rotating the point (func[gi], funci[gi])
						// an angle tadd about the point (basis, 0).
						// Rather than call atan2/sin/cos, we use this
						// faster method using some precomputed info.
						float a = 0;
						float b = 0;
						if (damp[gi] == 1f) {
							a = func[gi] - basis;
							b = funci[gi];
						} else {
							a = (func[gi] - basis) * damp[gi];
							b = funci[gi] * damp[gi];
						}
						func[gi] = basis + a * scaleo - b * sinth;
						funci[gi] = b * scaleo + a * sinth;
					}
				}
				t += tadd;
				if (sourceCount > 0) {
					double w = freqBar.getValue() * (t - freqTimeZero) * freqMult;
					double w2 = w;
					boolean skip = false;
					switch (auxFunction) {
					case AUX_FREQ:
						w2 = auxBar.getValue() * t * freqMult;
						break;
					case AUX_PHASE:
						w2 = w + (auxBar.getValue() - 1) * (pi / 29);
						break;
					}
					double v = 0;
					double v2 = 0;
					switch (sourceWaveform) {
					case SWF_SIN:
						v = Math.cos(w);
						if (sourceCount >= (sourcePlane ? 4 : 2))
							v2 = Math.cos(w2);
						else if (sourceFreqCount == 2)
							v = (v + Math.cos(w2)) * .5;
						break;
					case SWF_SQUARE:
						w %= pi * 2;
						v = (w < pi) ? 1 : -1;
						break;
					case SWF_PULSE: {
						w %= pi * 2;
						double pulselen = pi / 4;
						double pulselen2 = freqBar.getValue() * .2;
						if (pulselen2 < pulselen)
							pulselen = pulselen2;
						v = (w > pulselen) ? 0 : Math.sin(w * pi / pulselen);
						if (w > pulselen * 2)
							skip = true;
					}
						break;
					}
					for (j = 0; j != sourceCount; j++) {
						if ((j % 2) == 0)
							sources[j].v = (float) (v * setup.sourceStrength());
						else
							sources[j].v = (float) (v2 * setup.sourceStrength());
					}
					if (sourcePlane) {
						if (!skip) {
							for (j = 0; j != sourceCount / 2; j++) {
								OscSource src1 = sources[j * 2];
								OscSource src2 = sources[j * 2 + 1];
								OscSource src3 = sources[j];
								drawPlaneSource(src1.x, src1.y, src2.x, src2.y, src3.v, w);
							}
						}
					} else {
						if (sourceMoving) {
							int sy;
							movingSourcePos += tadd * .02 * auxBar.getValue();
							double wm = movingSourcePos;
							int h = windowHeight - 3;
							wm %= h * 2;
							sy = (int) wm;
							if (sy > h)
								sy = 2 * h - sy;
							sy += windowOffsetY + 1;
							sources[0].y = sy;
						}
						for (i = 0; i != sourceCount; i++) {
							OscSource src = sources[i];
							func[src.x + gw * src.y] = src.v;
							funci[src.x + gw * src.y] = 0;
						}
					}
				}
				setup.eachFrame();
				steps++;
				filterGrid();
			}
		}

		brightMult = Math.exp(brightnessBar.getValue() / 100. - 5.);
		if (view3dCheck.getState())
			draw3dView();
		else
			draw2dView();

		if (imageSource != null)
			imageSource.newPixels();

		realg.drawImage(dbimage, 0, 0, this);
		if (dragStartX >= 0 && !view3dCheck.getState()) {
			int x = dragStartX * windowWidth / winSize.width;
			int y = windowHeight - 1 - (dragStartY * windowHeight / winSize.height);
			String s = "(" + x + "," + y + ")";
			realg.setColor(Color.white);
			FontMetrics fm = realg.getFontMetrics();
			int h = 5 + fm.getAscent();
			realg.fillRect(0, winSize.height - h, fm.stringWidth(s) + 10, h);
			realg.setColor(Color.black);
			realg.drawString(s, 5, winSize.height - 5);
		}

		/*
		 * frames++; realg.setColor(Color.white); realg.drawString("Framerate: " +
		 * framerate, 10, 10); realg.drawString("Steprate: " + steprate, 10, 30);
		 * lastFrameTime = lastTime;
		 */
		
		if (!stoppedCheck.getState()) {
			long diff = getTimeMillis() - sysTime;
			// we want the time it takes for a wave to travel across the screen
			// to be more-or-less constant, but don't do anything after 5 seconds
			if (adjustResolution && diff > 0 && sysTime < startTime + startupTime
					&& windowOffsetX * diff / iterCount < resolutionCutoff) {
				increaseResolution = true;
				startTime = sysTime;
			} else {
				adjustResolution = false;
			}
	//		System.out.println("checkres " + diff + " " + iterCount + " " 
		//	    +  (windowOffsetX * diff / iterCount) + " " + resBar.getValue()
			//		+ " " + increaseResolution + " " + adjustResolution);
			
			if (dragging && selectedSource == -1
					&& modeChooser.getSelectedIndex() == MODE_FUNCHOLD)
				editFuncPoint(dragX, dragY);
			cv.repaint(0);
		}
	}

	// filter out high-frequency noise
	int filterCount;

	void filterGrid() {
		int x, y;
		if (fixedEndsCheck.getState())
			return;
		if (sourceCount > 0 && freqBarValue > 23)
			return;
		if (sourceFreqCount >= 2 && auxBar.getValue() > 23)
			return;
		if (++filterCount < 10)
			return;
		filterCount = 0;
		for (y = windowOffsetY; y < windowBottom; y++)
			for (x = windowOffsetX; x < windowRight; x++) {
				int gi = x + y * gw;
				if (walls[gi])
					continue;
				if (func[gi - 1] < 0 && func[gi] > 0 && func[gi + 1] < 0
						&& !walls[gi + 1] && !walls[gi - 1])
					func[gi] = (func[gi - 1] + func[gi + 1]) / 2;
				if (func[gi - gw] < 0 && func[gi] > 0 && func[gi + gw] < 0
						&& !walls[gi - gw] && !walls[gi + gw])
					func[gi] = (func[gi - gw] + func[gi + gw]) / 2;
				if (func[gi - 1] > 0 && func[gi] < 0 && func[gi + 1] > 0
						&& !walls[gi + 1] && !walls[gi - 1])
					func[gi] = (func[gi - 1] + func[gi + 1]) / 2;
				if (func[gi - gw] > 0 && func[gi] < 0 && func[gi + gw] > 0
						&& !walls[gi - gw] && !walls[gi + gw])
					func[gi] = (func[gi - gw] + func[gi + gw]) / 2;
			}
	}

	void plotPixel(int x, int y, int pix) {
		if (x < 0 || x >= winSize.width)
			return;
		try {
			pixels[x + y * winSize.width] = pix;
		} catch (Exception e) {
		}
	}

	// draw a circle the slow and dirty way
	void plotSource(int n, int xx, int yy) {
		int rad = sourceRadius;
		int j;
		int col = (sourceColor.getRed() << 16) | (sourceColor.getGreen() << 8)
				| (sourceColor.getBlue()) | 0xFF000000;
		if (n == selectedSource)
			col ^= 0xFFFFFF;
		for (j = 0; j <= rad; j++) {
			int k = (int) (Math.sqrt(rad * rad - j * j) + .5);
			plotPixel(xx + j, yy + k, col);
			plotPixel(xx + k, yy + j, col);
			plotPixel(xx + j, yy - k, col);
			plotPixel(xx - k, yy + j, col);
			plotPixel(xx - j, yy + k, col);
			plotPixel(xx + k, yy - j, col);
			plotPixel(xx - j, yy - k, col);
			plotPixel(xx - k, yy - j, col);
			plotPixel(xx, yy + j, col);
			plotPixel(xx, yy - j, col);
			plotPixel(xx + j, yy, col);
			plotPixel(xx - j, yy, col);
		}
	}

	void draw2dView() {
		int ix = 0;
		int i, j, k, l;
		for (j = 0; j != windowHeight; j++) {
			ix = winSize.width * (j * winSize.height / windowHeight);
			int j2 = j + windowOffsetY;
			int gi = j2 * gw + windowOffsetX;
			int y = j * winSize.height / windowHeight;
			int y2 = (j + 1) * winSize.height / windowHeight;
			for (i = 0; i != windowWidth; i++, gi++) {
				int x = i * winSize.width / windowWidth;
				int x2 = (i + 1) * winSize.width / windowWidth;
				int i2 = i + windowOffsetX;
				double dy = func[gi] * brightMult;
				if (dy < -1)
					dy = -1;
				if (dy > 1)
					dy = 1;
				int col = 0;
				int colR = 0, colG = 0, colB = 0;
				if (walls[gi]) {
					colR = wallColor.getRed();
					colG = wallColor.getGreen();
					colB = wallColor.getBlue();
				} else if (dy < 0) {
					double d1 = -dy;
					double d2 = 1 - d1;
					double d3 = medium[gi] * (1 / 255.01);
					double d4 = 1 - d3;
					double a1 = d1 * d4;
					double a2 = d2 * d4;
					double a3 = d1 * d3;
					double a4 = d2 * d3;
					colR = (int) (negColor.getRed() * a1 + zeroColor.getRed() * a2
							+ negMedColor.getRed() * a3 + medColor.getRed() * a4);
					colG = (int) (negColor.getGreen() * a1 + zeroColor.getGreen() * a2
							+ negMedColor.getGreen() * a3 + medColor.getGreen() * a4);
					colB = (int) (negColor.getBlue() * a1 + zeroColor.getBlue() * a2
							+ negMedColor.getBlue() * a3 + medColor.getBlue() * a4);
				} else {
					double d1 = dy;
					double d2 = 1 - dy;
					double d3 = medium[gi] * (1 / 255.01);
					double d4 = 1 - d3;
					double a1 = d1 * d4;
					double a2 = d2 * d4;
					double a3 = d1 * d3;
					double a4 = d2 * d3;
					colR = (int) (posColor.getRed() * a1 + zeroColor.getRed() * a2
							+ posMedColor.getRed() * a3 + medColor.getRed() * a4);
					colG = (int) (posColor.getGreen() * a1 + zeroColor.getGreen() * a2
							+ posMedColor.getGreen() * a3 + medColor.getGreen() * a4);
					colB = (int) (posColor.getBlue() * a1 + zeroColor.getBlue() * a2
							+ posMedColor.getBlue() * a3 + medColor.getBlue() * a4);
				}
				col = (255 << 24) | (colR << 16) | (colG << 8) | (colB);
				int ll;
				for (k = x; k != x2; k++, ix++)
					for (l = y, ll = 0; l != y2; l++, ll += winSize.width)
						pixels[ix+ll] = col;
			}
		}
		int intf = (gridSizeY / 2 - windowOffsetY) * winSize.height / windowHeight;
		for (i = 0; i != sourceCount; i++) {
			OscSource src = sources[i];
			int xx = src.getScreenX();
			int yy = src.getScreenY();
			plotSource(i, xx, yy);
		}
	}

	double realxmx, realxmy, realymz, realzmy, realzmx, realymadd, realzmadd;
	double viewAngle = pi, viewAngleDragStart;
	double viewZoom = .775, viewZoomDragStart;
	double viewAngleCos = -1, viewAngleSin = 0;
	double viewHeight = -38, viewHeightDragStart;
	double scalex, scaley;
	int centerX3d, centerY3d;
	int xpoints[] = new int[4], ypoints[] = new int[4];
	final double viewDistance = 66;

	void map3d(double x, double y, double z, int xpoints[], int ypoints[], int pt) {
		/*
		 * x *= aspectRatio; z *= -4; x *= 16./sampleCount; y *= 16./sampleCount;
		 * double realx = x*viewAngleCos + y*viewAngleSin; // range: [-10,10] double
		 * realy = z-viewHeight; double realz = y*viewAngleCos - x*viewAngleSin +
		 * viewDistance;
		 */
		double realx = realxmx * x + realxmy * y;
		double realy = realymz * z + realymadd;
		double realz = realzmx * x + realzmy * y + realzmadd;
		xpoints[pt] = centerX3d + (int) (realx / realz);
		ypoints[pt] = centerY3d - (int) (realy / realz);
	}

	double scaleMult;

	void scaleworld() {
		scalex = viewZoom * (winSize.width / 4) * viewDistance / 8;
		scaley = -scalex;
		int y = (int) (scaley * viewHeight / viewDistance);
		/*
		 * centerX3d = winSize.x + winSize.width/2; centerY3d = winSize.y +
		 * winSize.height/2 - y;
		 */
		centerX3d = winSize.width / 2;
		centerY3d = winSize.height / 2 - y;
		scaleMult = 16. / (windowWidth / 2);
		realxmx = -viewAngleCos * scaleMult * scalex;
		realxmy = viewAngleSin * scaleMult * scalex;
		realymz = -brightMult * scaley;
		realzmy = viewAngleCos * scaleMult;
		realzmx = viewAngleSin * scaleMult;
		realymadd = -viewHeight * scaley;
		realzmadd = viewDistance;
	}

	void draw3dView() {
		int half = gridSizeX / 2;
		scaleworld();
		int x, y;
		int xdir, xstart, xend;
		int ydir, ystart, yend;
		int sc = windowRight - 1;

		// figure out what order to render the grid elements so that
		// the ones in front are rendered first.
		if (viewAngleCos > 0) {
			ystart = sc;
			yend = windowOffsetY - 1;
			ydir = -1;
		} else {
			ystart = windowOffsetY;
			yend = sc + 1;
			ydir = 1;
		}
		if (viewAngleSin < 0) {
			xstart = windowOffsetX;
			xend = sc + 1;
			xdir = 1;
		} else {
			xstart = sc;
			xend = windowOffsetX - 1;
			xdir = -1;
		}
		boolean xFirst = (viewAngleSin * xdir < viewAngleCos * ydir);

		for (x = winSize.width * winSize.height; --x >= 0;)
			pixels[x] = 0xFF000000;
		/*
		 * double zval = 2.0/sampleCount; System.out.println(zval); if (sampleCount
		 * == 128) zval = .1;
		 */
		double zval = .1;
		double zval2 = zval * zval;

		for (x = xstart; x != xend; x += xdir) {
			for (y = ystart; y != yend; y += ydir) {
				if (!xFirst)
					x = xstart;
				for (; x != xend; x += xdir) {
					int gi = x + gw * y;
					map3d(x - half, y - half, func[gi], xpoints, ypoints, 0);
					map3d(x + 1 - half, y - half, func[gi + 1], xpoints, ypoints, 1);
					map3d(x - half, y + 1 - half, func[gi + gw], xpoints, ypoints, 2);
					map3d(x + 1 - half, y + 1 - half, func[gi + gw + 1], xpoints,
							ypoints, 3);
					double qx = func[gi + 1] - func[gi];
					double qy = func[gi + gw] - func[gi];
					// calculate lighting
					double normdot = (qx + qy + zval) * (1 / 1.73)
							/ Math.sqrt(qx * qx + qy * qy + zval2);
					int col = computeColor(gi, normdot);
					fillTriangle(xpoints[0], ypoints[0], xpoints[1], ypoints[1],
							xpoints[3], ypoints[3], col);
					fillTriangle(xpoints[0], ypoints[0], xpoints[2], ypoints[2],
							xpoints[3], ypoints[3], col);
					if (xFirst)
						break;
				}
			}
			if (!xFirst)
				break;
		}
	}

	int computeColor(int gix, double c) {
		double h = func[gix] * brightMult;
		if (c < 0)
			c = 0;
		if (c > 1)
			c = 1;
		c = .5 + c * .5;
		double redness = (h < 0) ? -h : 0;
		double grnness = (h > 0) ? h : 0;
		if (redness > 1)
			redness = 1;
		if (grnness > 1)
			grnness = 1;
		if (grnness < 0)
			grnness = 0;
		if (redness < 0)
			redness = 0;
		double grayness = (1 - (redness + grnness)) * c;
		double grayness2 = grayness;
		if (medium[gix] > 0) {
			double mm = 1 - (medium[gix] * (1 / 255.01));
			grayness2 *= mm;
		}
		double gray = .6;
		int ri = (int) ((c * redness + gray * grayness2) * 255);
		int gi = (int) ((c * grnness + gray * grayness2) * 255);
		int bi = (int) ((gray * grayness) * 255);
		return 0xFF000000 | (ri << 16) | (gi << 8) | bi;
	}

	void fillTriangle(int x1, int y1, int x2, int y2, int x3, int y3, int col) {
		if (x1 > x2) {
			if (x2 > x3) {
				// x1 > x2 > x3
				int ay = interp(x1, y1, x3, y3, x2);
				fillTriangle1(x3, y3, x2, y2, ay, col);
				fillTriangle1(x1, y1, x2, y2, ay, col);
			} else if (x1 > x3) {
				// x1 > x3 > x2
				int ay = interp(x1, y1, x2, y2, x3);
				fillTriangle1(x2, y2, x3, y3, ay, col);
				fillTriangle1(x1, y1, x3, y3, ay, col);
			} else {
				// x3 > x1 > x2
				int ay = interp(x3, y3, x2, y2, x1);
				fillTriangle1(x2, y2, x1, y1, ay, col);
				fillTriangle1(x3, y3, x1, y1, ay, col);
			}
		} else {
			if (x1 > x3) {
				// x2 > x1 > x3
				int ay = interp(x2, y2, x3, y3, x1);
				fillTriangle1(x3, y3, x1, y1, ay, col);
				fillTriangle1(x2, y2, x1, y1, ay, col);
			} else if (x2 > x3) {
				// x2 > x3 > x1
				int ay = interp(x2, y2, x1, y1, x3);
				fillTriangle1(x1, y1, x3, y3, ay, col);
				fillTriangle1(x2, y2, x3, y3, ay, col);
			} else {
				// x3 > x2 > x1
				int ay = interp(x3, y3, x1, y1, x2);
				fillTriangle1(x1, y1, x2, y2, ay, col);
				fillTriangle1(x3, y3, x2, y2, ay, col);
			}
		}
	}

	int interp(int x1, int y1, int x2, int y2, int x) {
		if (x1 == x2)
			return y1;
		if (x < x1 && x < x2 || x > x1 && x > x2)
			System.out.print("interp out of bounds\n");
		return (int) (y1 + ((double) x - x1) * (y2 - y1) / (x2 - x1));
	}

	void fillTriangle1(int x1, int y1, int x2, int y2, int y3, int col) {
		// x2 == x3
		int dir = (x1 > x2) ? -1 : 1;
		int x = x1;
		if (x < 0) {
			x = 0;
			if (x2 < 0)
				return;
		}
		if (x >= winSize.width) {
			x = winSize.width - 1;
			if (x2 >= winSize.width)
				return;
		}
		if (y2 > y3) {
			int q = y2;
			y2 = y3;
			y3 = q;
		}
		// y2 < y3
		while (x != x2 + dir) {
			// XXX this could be speeded up
			int ya = interp(x1, y1, x2, y2, x);
			int yb = interp(x1, y1, x2, y3, x);
			if (ya < 0)
				ya = 0;
			if (yb >= winSize.height)
				yb = winSize.height - 1;

			for (; ya <= yb; ya++)
				pixels[x + ya * winSize.width] = col;
			x += dir;
			if (x < 0 || x >= winSize.width)
				return;
		}
	}

	int abs(int x) {
		return x < 0 ? -x : x;
	}

	void drawPlaneSource(int x1, int y1, int x2, int y2, float v, double w) {
		if (y1 == y2) {
			if (x1 == windowOffsetX)
				x1 = 0;
			if (x2 == windowOffsetX)
				x2 = 0;
			if (x1 == windowOffsetX + windowWidth - 1)
				x1 = gridSizeX - 1;
			if (x2 == windowOffsetX + windowWidth - 1)
				x2 = gridSizeX - 1;
		}
		if (x1 == x2) {
			if (y1 == windowOffsetY)
				y1 = 0;
			if (y2 == windowOffsetY)
				y2 = 0;
			if (y1 == windowOffsetY + windowHeight - 1)
				y1 = gridSizeY - 1;
			if (y2 == windowOffsetY + windowHeight - 1)
				y2 = gridSizeY - 1;
		}

		/*
		 * double phase = 0; if (sourceChooser.getSelectedIndex() ==
		 * SRC_1S1F_PLANE_PHASE) phase =
		 * (auxBar.getValue()-15)*3.8*freqBar.getValue()*freqMult;
		 */

		// need to draw a line from x1,y1 to x2,y2
		if (x1 == x2 && y1 == y2) {
			func[x1 + gw * y1] = v;
			funci[x1 + gw * y1] = 0;
		} else if (abs(y2 - y1) > abs(x2 - x1)) {
			// y difference is greater, so we step along y's
			// from min to max y and calculate x for each step
			double sgn = sign(y2 - y1);
			int x, y;
			for (y = y1; y != y2 + sgn; y += sgn) {
				x = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
				double ph = sgn * (y - y1) / (y2 - y1);
				int gi = x + gw * y;
				func[gi] = setup.calcSourcePhase(ph, v, w);
				// (phase == 0) ? v :
				// (float) (Math.sin(w+ph));
				funci[gi] = 0;
			}
		} else {
			// x difference is greater, so we step along x's
			// from min to max x and calculate y for each step
			double sgn = sign(x2 - x1);
			int x, y;
			for (x = x1; x != x2 + sgn; x += sgn) {
				y = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
				double ph = sgn * (x - x1) / (x2 - x1);
				int gi = x + gw * y;
				func[gi] = setup.calcSourcePhase(ph, v, w);
				// (phase == 0) ? v :
				// (float) (Math.sin(w+ph));
				funci[gi] = 0;
			}
		}
	}

	int sign(int x) {
		return (x < 0) ? -1 : (x == 0) ? 0 : 1;
	}

	void edit(MouseEvent e) {
		if (view3dCheck.getState())
			return;
		int x = e.getX();
		int y = e.getY();
		if (selectedSource != -1) {
			x = x * windowWidth / winSize.width;
			y = y * windowHeight / winSize.height;
			if (x >= 0 && y >= 0 && x < windowWidth && y < windowHeight) {
				sources[selectedSource].x = x + windowOffsetX;
				sources[selectedSource].y = y + windowOffsetY;
			}
			return;
		}
		if (dragX == x && dragY == y)
			editFuncPoint(x, y);
		else {
			// need to draw a line from old x,y to new x,y and
			// call editFuncPoint for each point on that line. yuck.
			if (abs(y - dragY) > abs(x - dragX)) {
				// y difference is greater, so we step along y's
				// from min to max y and calculate x for each step
				int x1 = (y < dragY) ? x : dragX;
				int y1 = (y < dragY) ? y : dragY;
				int x2 = (y > dragY) ? x : dragX;
				int y2 = (y > dragY) ? y : dragY;
				dragX = x;
				dragY = y;
				for (y = y1; y <= y2; y++) {
					x = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
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
					y = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
					editFuncPoint(x, y);
				}
			}
		}
	}

	void editFuncPoint(int x, int y) {
		int xp = x * windowWidth / winSize.width + windowOffsetX;
		int yp = y * windowHeight / winSize.height + windowOffsetY;
		int gi = xp + yp * gw;
		if (modeChooser.getSelectedIndex() == MODE_WALLS) {
			if (!dragSet && !dragClear) {
				dragClear = walls[gi];
				dragSet = !dragClear;
			}
			walls[gi] = dragSet;
			calcExceptions();
			func[gi] = funci[gi] = 0;
		} else if (modeChooser.getSelectedIndex() == MODE_MEDIUM) {
			if (!dragSet && !dragClear) {
				dragClear = medium[gi] > 0;
				dragSet = !dragClear;
			}
			medium[gi] = (dragSet) ? mediumMax : 0;
			calcExceptions();
		} else {
			if (!dragSet && !dragClear) {
				dragClear = func[gi] > .1;
				dragSet = !dragClear;
			}
			func[gi] = (dragSet) ? 1 : -1;
			funci[gi] = 0;
		}
		cv.repaint(0);
	}

	 void selectSource(MouseEvent me) {
		int x = me.getX();
		int y = me.getY();
		int i;
		selectedSource = -1;
		int best = sourceRadius*2;
		best *= best;
		for (i = 0; i != sourceCount; i++) {
		    OscSource src = sources[i];
		    int sx = src.getScreenX();
		    int sy = src.getScreenY();
		    int r2 = (sx-x)*(sx-x)+(sy-y)*(sy-y);
		    if (r2 < best) {
			selectedSource = i;
			best = r2;
		    }
		}
	 }

	void setDamping() {
		/*
		 * int i; double damper = dampingBar.getValue() * .00002;// was 5 dampcoef =
		 * Math.exp(-damper);
		 */
		dampcoef = 1;
	}

	@Override
	public void componentHidden(ComponentEvent e) {
	}

	@Override
	public void componentMoved(ComponentEvent e) {
	}

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
			cv.repaint();
		}
		if (e.getSource() == blankWallsButton) {
			doBlankWalls();
			cv.repaint();
		}
		if (e.getSource() == borderButton) {
			doBorder();
			cv.repaint();
		}
		if (e.getSource() == exportButton)
			doImport();
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		Scrollbar src = (Scrollbar) e.getSource();
		System.out.print(src.getName() + "=" + src.getValue() + "\n");
		if (src == resBar) {
			setResolution();
			reinit();
		}
		if (src == dampingBar)
			setDamping();
		if (src == brightnessBar)
			cv.repaint(0);
		if (src == freqBar)
			setFreq();
	}

	void setFreqBar(int x) {
		freqBar.setValue(x);
		freqBarValue = x;
		freqTimeZero = 0;
	}

	void setFreq() {
		// adjust time zero to maintain continuity in the freq func
		// even though the frequency has changed.
		double oldfreq = freqBarValue * freqMult;
		freqBarValue = freqBar.getValue();
		double newfreq = freqBarValue * freqMult;
		double adj = newfreq - oldfreq;
		freqTimeZero = t - oldfreq * (t - freqTimeZero) / newfreq;
	}

	void setResolution() {
		windowWidth = windowHeight = resBar.getValue();
		int border = windowWidth / 9;
		if (border < 20)
			border = 20;
		windowOffsetX = windowOffsetY = border;
		gridSizeX = windowWidth + windowOffsetX * 2;
		gridSizeY = windowHeight + windowOffsetY * 2;
		windowBottom = windowOffsetY + windowHeight - 1;
		windowRight = windowOffsetX + windowWidth - 1;
	}

	void setResolution(int x) {
		resBar.setValue(x);
		setResolution();
		reinit();
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		if (view3dCheck.getState()) {
			view3dDrag(e);
		}
		if (!dragging)
			selectSource(e);
		dragging = true;
		edit(e);
		adjustResolution = false;
		cv.repaint(0);
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		if (dragging)
			return;
		int x = e.getX();
		int y = e.getY();
		dragStartX = dragX = x;
		dragStartY = dragY = y;
		viewAngleDragStart = viewAngle;
		viewHeightDragStart = viewHeight;
		selectSource(e);
		if (stoppedCheck.getState())
			cv.repaint(0);
	}

	void view3dDrag(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		viewAngle = (dragStartX - x) / 40. + viewAngleDragStart;
		while (viewAngle < 0)
			viewAngle += 2 * pi;
		while (viewAngle >= 2 * pi)
			viewAngle -= 2 * pi;
		viewAngleCos = Math.cos(viewAngle);
		viewAngleSin = Math.sin(viewAngle);
		viewHeight = (dragStartY - y) / 10. + viewHeightDragStart;

		/*
		 * viewZoom = (y-dragStartY)/40. + viewZoomDragStart; if (viewZoom < .1)
		 * viewZoom = .1; System.out.println(viewZoom);
		 */
		cv.repaint();
	}

	@Override
	public void mouseClicked(MouseEvent e) {
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
		dragStartX = -1;
	}

	@Override
	public void mousePressed(MouseEvent e) {
		adjustResolution = false;
		mouseMoved(e);
		if ((e.getModifiers() & InputEvent.BUTTON1_MASK) == 0)
			return;
		dragging = true;
		edit(e);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		if ((e.getModifiers() & InputEvent.BUTTON1_MASK) == 0)
			return;
		dragging = false;
		dragSet = dragClear = false;
		cv.repaint();
	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		if (e.getItemSelectable() == stoppedCheck) {
			cv.repaint();
			return;
		}
		if (e.getItemSelectable() == sourceChooser) {
			if (sourceChooser.getSelectedIndex() != sourceIndex)
				setSources();
		}
		if (e.getItemSelectable() == setupChooser)
			doSetup();
		if (e.getItemSelectable() == colorChooser)
			doColor();
	}

	void doSetup() {
		t = 0;
		if (resBar.getValue() < 32)
			setResolution(32);
		doBlank();
		doBlankWalls();
		// don't use previous source positions, use defaults
		sourceCount = -1;
		sourceChooser.select(SRC_1S1F);
		dampingBar.setValue(10);
		setFreqBar(5);
		setBrightness(10);
		auxBar.setValue(1);
		fixedEndsCheck.setState(true);
		setup = (Setup) setupList.elementAt(setupChooser.getSelectedIndex());
		setup.select();
		setup.doSetupSources();
		calcExceptions();
		setDamping();
		// System.out.println("setup " + setupChooser.getSelectedIndex());
	}

	void setBrightness(int x) {
		double m = x / 5.;
		m = (Math.log(m) + 5.) * 100;
		brightnessBar.setValue((int) m);
	}

	void doColor() {
		int cn = colorChooser.getSelectedIndex();
		wallColor = schemeColors[cn][0];
		posColor = schemeColors[cn][1];
		negColor = schemeColors[cn][2];
		zeroColor = schemeColors[cn][3];
		posMedColor = schemeColors[cn][4];
		negMedColor = schemeColors[cn][5];
		medColor = schemeColors[cn][6];
		sourceColor = schemeColors[cn][7];
	}

	void addDefaultColorScheme() {
		String schemes[] = {
				"#808080 #00ffff #000000 #008080 #0000ff #000000 #000080 #ffffff",
				"#808080 #00ff00 #ff0000 #000000 #00ffff #ff00ff #0000ff #0000ff",
				"#800000 #00ffff #0000ff #000000 #80c8c8 #8080c8 #808080 #ffffff",
				"#800000 #ffffff #000000 #808080 #0000ff #000000 #000080 #00ff00",
				"#800000 #ffff00 #0000ff #000000 #ffff80 #8080ff #808080 #ffffff",
				"#808080 #00ff00 #ff0000 #FFFFFF #00ffff #ff00ff #0000ff #0000ff",
				"#FF0000 #00FF00 #0000FF #FFFF00 #00FFFF #FF00FF #FFFFFF #000000" };
		int i;

		for (i = 0; i != 7; i++)
			decodeColorScheme(i, schemes[i]);
		// colorChooser.hide();
	}

	void decodeColorScheme(int cn, String s) {
		StringTokenizer st = new StringTokenizer(s);
		while (st.hasMoreTokens()) {
			int i;
			for (i = 0; i != 8; i++)
				schemeColors[cn][i] = Color.decode(st.nextToken());
		}
		colorChooser.add("Color Scheme " + (cn + 1));
	}

	void addMedium() {
		int i, j;
		for (i = 0; i != gridSizeX; i++)
			for (j = gridSizeY / 2; j != gridSizeY; j++)
				medium[i + j * gw] = mediumMax;
	}

	void setSources() {
		sourceIndex = sourceChooser.getSelectedIndex();
		int oldSCount = sourceCount;
		boolean oldPlane = sourcePlane;
		sourceFreqCount = 1;
		sourcePlane = (sourceChooser.getSelectedIndex() >= SRC_1S1F_PLANE && sourceChooser
				.getSelectedIndex() < SRC_6S1F);
		sourceMoving = false;
		sourceWaveform = SWF_SIN;
		sourceCount = 1;
		boolean phase = false;
		switch (sourceChooser.getSelectedIndex()) {
		case 0:
			sourceCount = 0;
			break;
		case 2:
			sourceFreqCount = 2;
			break;
		case 3:
			sourceCount = 2;
			break;
		case 4:
			sourceCount = 2;
			sourceFreqCount = 2;
			break;
		case 5:
			sourceCount = 3;
			break;
		case 6:
			sourceCount = 4;
			break;
		case 7:
			sourceWaveform = SWF_SQUARE;
			break;
		case 8:
			sourceWaveform = SWF_PULSE;
			break;
		case 9:
			sourceMoving = true;
			break;
		case 11:
			sourceFreqCount = 2;
			break;
		case 12:
			sourceCount = 2;
			break;
		case 13:
			sourceCount = sourceFreqCount = 2;
			break;
		case 14:
			sourceWaveform = SWF_PULSE;
			break;
		case 15:
			phase = true;
			break;
		case 16:
			sourceCount = 6;
			break;
		case 17:
			sourceCount = 8;
			break;
		case 18:
			sourceCount = 10;
			break;
		case 19:
			sourceCount = 12;
			break;
		case 20:
			sourceCount = 16;
			break;
		case 21:
			sourceCount = 20;
			break;
		}
		if (sourceFreqCount >= 2) {
			auxFunction = AUX_FREQ;
			auxBar.setValue(freqBar.getValue());
			if (sourceCount == 2)
				auxLabel.setText("Source 2 Frequency");
			else
				auxLabel.setText("2nd Frequency");
		} else if (sourceCount == 2 || sourceCount >= 4 || phase) {
			auxFunction = AUX_PHASE;
			auxBar.setValue(1);
			auxLabel.setText("Phase Difference");
		} else if (sourceMoving) {
			auxFunction = AUX_SPEED;
			auxBar.setValue(7);
			auxLabel.setText("Source Speed");
		} else {
			auxFunction = AUX_NONE;
			auxBar.setVisible(false);
			auxLabel.setVisible(false);
		}
		if (auxFunction != AUX_NONE) {
			auxBar.setVisible(true);
			auxLabel.setVisible(true);
		}
		validate();

		if (sourcePlane) {
			sourceCount *= 2;
			if (!(oldPlane && oldSCount == sourceCount)) {
				int x2 = windowOffsetX + windowWidth - 1;
				int y2 = windowOffsetY + windowHeight - 1;
				sources[0] = new OscSource(windowOffsetX, windowOffsetY + 1);
				sources[1] = new OscSource(x2, windowOffsetY + 1);
				sources[2] = new OscSource(windowOffsetX, y2);
				sources[3] = new OscSource(x2, y2);
			}
		} else if (!(oldSCount == sourceCount && !oldPlane)) {
			sources[0] = new OscSource(gridSizeX / 2, windowOffsetY + 1);
			sources[1] = new OscSource(gridSizeX / 2, gridSizeY - windowOffsetY - 2);
			sources[2] = new OscSource(windowOffsetX + 1, gridSizeY / 2);
			sources[3] = new OscSource(gridSizeX - windowOffsetX - 2, gridSizeY / 2);
			int i;
			for (i = 4; i < sourceCount; i++)
				sources[i] = new OscSource(windowOffsetX + 1 + i * 2, gridSizeY / 2);
		}
	}

	class OscSource {
		int x;
		int y;
		float v;

		OscSource(int xx, int yy) {
			x = xx;
			y = yy;
		}

		int getScreenX() {
			return ((x - windowOffsetX) * winSize.width + winSize.width / 2)
					/ windowWidth;
		}

		int getScreenY() {
			return ((y - windowOffsetY) * winSize.height + winSize.height / 2)
					/ windowHeight;
		}
	}

	void doImport() {
		if (impDialog != null) {
			requestFocus();
			//impDialog.setVisible(false);
			impDialog.dispose(); // BH added
			impDialog = null;
		}
		String dump = "";

		int i;
		dump = "$ 0 " + resBar.getValue() + " " + sourceChooser.getSelectedIndex()
				+ " " + colorChooser.getSelectedIndex() + " "
				+ fixedEndsCheck.getState() + " " + view3dCheck.getState() + " "
				+ speedBar.getValue() + " " + freqBar.getValue() + " "
				+ brightnessBar.getValue() + " " + auxBar.getValue() + "\n";
		for (i = 0; i != sourceCount; i++) {
			OscSource src = sources[i];
			dump += "s " + src.x + " " + src.y + "\n";
		}
		for (i = 0; i != gridSizeXY;) {
			if (i >= gridSizeX) {
				int istart = i;
				for (; i < gridSizeXY && walls[i] == walls[i - gridSizeX]
						&& medium[i] == medium[i - gridSizeX]; i++)
					;
				if (i > istart) {
					dump += "l " + (i - istart) + "\n";
					continue;
				}
			}
			boolean x = walls[i];
			int m = medium[i];
			int ct = 0;
			for (; i < gridSizeXY && walls[i] == x && medium[i] == m; ct++, i++)
				;
			dump += (x ? "w " : "c ") + ct + " " + m + "\n";
		}
		impDialog = new ImportDialog(this, dump);
		impDialog.setVisible(true);
	}

	void readImport(String s) {
		byte b[] = s.getBytes();
		int len = s.length();
		int p;
		int x = 0;
		int srci = 0;
		setupChooser.select(0);
		setup = (Setup) setupList.elementAt(0);
		for (p = 0; p < len;) {
			int l;
			int linelen = 0;
			for (l = 0; l != len - p; l++)
				if (b[l + p] == '\n' || b[l + p] == '\r') {
					linelen = l++;
					if (l + p < b.length && b[l + p] == '\n')
						l++;
					break;
				}
			String line = new String(b, p, linelen);
			StringTokenizer st = new StringTokenizer(line);
			while (st.hasMoreTokens()) {
				String type = st.nextToken();
				int tint = type.charAt(0);
				try {
					if (tint == '$') {
						int flags = new Integer(st.nextToken()).intValue();

						resBar.setValue(new Integer(st.nextToken()).intValue());
						setResolution();
						reinit(false);

						sourceChooser.select(new Integer(st.nextToken()).intValue());
						setSources();

						colorChooser.select(new Integer(st.nextToken()).intValue());
						doColor();

						fixedEndsCheck.setState(st.nextToken().compareTo("true") == 0);
						view3dCheck.setState(st.nextToken().compareTo("true") == 0);
						speedBar.setValue(new Integer(st.nextToken()).intValue());
						freqBar.setValue(new Integer(st.nextToken()).intValue());
						brightnessBar.setValue(new Integer(st.nextToken()).intValue());
						auxBar.setValue(new Integer(st.nextToken()).intValue());
						break;
					}
					if (tint == 'w' || tint == 'c') {
						boolean w = (tint == 'w');
						int ct = new Integer(st.nextToken()).intValue();
						int md = new Integer(st.nextToken()).intValue();
						for (; ct > 0; ct--, x++) {
							walls[x] = w;
							medium[x] = md;
						}
						break;
					}
					if (tint == 'l') {
						int ct = new Integer(st.nextToken()).intValue();
						for (; ct > 0; ct--, x++) {
							walls[x] = walls[x - gridSizeX];
							medium[x] = medium[x - gridSizeX];
						}
						break;
					}
					if (tint == 's') {
						int sx = new Integer(st.nextToken()).intValue();
						int sy = new Integer(st.nextToken()).intValue();
						sources[srci].x = sx;
						sources[srci].y = sy;
						srci++;
						break;
					}
					System.out.println("unknown type!");
				} catch (Exception ee) {
					ee.printStackTrace();
					break;
				}
				break;
			}
			p += l;

		}
		calcExceptions();
		setDamping();
	}

	class ImportDialogLayout implements LayoutManager {
		public ImportDialogLayout() {
		}

		@Override
		public void addLayoutComponent(String name, Component c) {
		}

		@Override
		public void removeLayoutComponent(Component c) {
		}

		@Override
		public Dimension preferredLayoutSize(Container target) {
			return new Dimension(500, 500);
		}

		@Override
		public Dimension minimumLayoutSize(Container target) {
			return new Dimension(100, 100);
		}

		@Override
		public void layoutContainer(Container target) {
			Insets insets = target.getInsets();
			int targetw = target.getSize().width - insets.left - insets.right;
			int targeth = target.getSize().height - (insets.top + insets.bottom);
			int i;
			int pw = 300;
			if (target.getComponentCount() == 0)
				return;
			Component cl = target.getComponent(target.getComponentCount() - 1);
			Dimension dl = cl.getPreferredSize();
			target.getComponent(0).setLocation(insets.left, insets.top);
			int cw = target.getSize().width - insets.left - insets.right;
			int ch = target.getSize().height - insets.top - insets.bottom - dl.height;
			target.getComponent(0).setSize(cw, ch);
			int h = ch + insets.top;
			int x = 0;
			for (i = 1; i < target.getComponentCount(); i++) {
				Component m = target.getComponent(i);
				if (m.isVisible()) {
					Dimension d = m.getPreferredSize();
					m.setLocation(insets.left + x, h);
					m.setSize(d.width, d.height);
					x += d.width;
				}
			}
		}
	}

	class ImportDialog extends Dialog implements ActionListener {
		RippleFrame rframe;
		Button importButton, clearButton, closeButton;
		TextArea text;

		ImportDialog(RippleFrame f, String str) {
			super(f, (str.length() > 0) ? "Export" : "Import", false);
			setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
			rframe = f;
			setLayout(new ImportDialogLayout());
			// add(text = new TextArea(str, 10, 60, TextArea.SCROLLBARS_BOTH));
			add(text = new TextArea(str, 10, 60));
			add(importButton = new Button("Import"));
			importButton.addActionListener(this);
			add(clearButton = new Button("Clear"));
			clearButton.addActionListener(this);
			add(closeButton = new Button("Close"));
			closeButton.addActionListener(this);
			setSize(400, 300);
			Point x = (main == rframe ? rframe.getLocationOnScreen() : new Point(0,0)); //BH
			Dimension d = getSize();
			setLocation(x.x + (winSize.width - d.width) / 2, x.y
					+ (winSize.height - d.height) / 2);
			setVisible(true);
			if (str.length() > 0)
				text.selectAll();
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			int i;
			Object src = e.getSource();
			if (src == importButton) {
				rframe.readImport(text.getText());
				setVisible(false);
			}
			if (src == closeButton)
				setVisible(false);
			if (src == clearButton)
				text.setText("");
		}

		@Override
		public boolean handleEvent(Event ev) {
			if (ev.id == Event.WINDOW_DESTROY) {
				rframe.requestFocus();
				setVisible(false);
				return true;
			}
			return super.handleEvent(ev);
		}
	}

	abstract class Setup {
		abstract String getName();

		abstract void select();

		void doSetupSources() {
			setSources();
		}

		void deselect() {
		}

		double sourceStrength() {
			return 1;
		}

		abstract Setup createNext();

		void eachFrame() {
		}

		float calcSourcePhase(double ph, float v, double w) {
			return v;
		}
	}

	class SingleSourceSetup extends Setup {
		@Override
		String getName() {
			return "Single Source";
		}

		@Override
		void select() {
			setFreqBar(15);
			setBrightness(27);
		}

		@Override
		Setup createNext() {
			return new DoubleSourceSetup();
		}
	}

	class DoubleSourceSetup extends Setup {
		@Override
		String getName() {
			return "Two Sources";
		}

		@Override
		void select() {
			setFreqBar(15);
			setBrightness(19);
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_2S1F);
			setSources();
			sources[0].y = gridSizeY / 2 - 8;
			sources[1].y = gridSizeY / 2 + 8;
			sources[0].x = sources[1].x = gridSizeX / 2;
		}

		@Override
		Setup createNext() {
			return new QuadrupleSourceSetup();
		}
	}

	class QuadrupleSourceSetup extends Setup {
		@Override
		String getName() {
			return "Four Sources";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_4S1F);
			setFreqBar(15);
		}

		@Override
		Setup createNext() {
			return new SingleSlitSetup();
		}
	}

	class SingleSlitSetup extends Setup {
		@Override
		String getName() {
			return "Single Slit";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i;
			int x = gridSizeX / 2;
			int y = windowOffsetY + 8; // +4
			for (i = 0; i != gridSizeX; i++)
				setWall(i, y);
			for (i = -8; i <= 8; i++)
				// was 4
				setWall(x + i, y, false);
			setBrightness(7);
			setFreqBar(25);
		}

		@Override
		Setup createNext() {
			return new DoubleSlitSetup();
		}
	}

	class DoubleSlitSetup extends Setup {
		@Override
		String getName() {
			return "Double Slit";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i;
			int x = gridSizeX / 2;
			int y = windowOffsetY + 4;
			for (i = 0; i != gridSizeX; i++)
				setWall(i, y);
			for (i = 0; i != 3; i++) {
				setWall(x - 5 - i, y, false);
				setWall(x + 5 + i, y, false);
			}
			brightnessBar.setValue(488);
			setFreqBar(22);
		}

		@Override
		Setup createNext() {
			return new TripleSlitSetup();
		}
	}

	class TripleSlitSetup extends Setup {
		@Override
		String getName() {
			return "Triple Slit";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i;
			int x = gridSizeX / 2;
			int y = windowOffsetY + 4;
			for (i = 0; i != gridSizeX; i++)
				setWall(i, y);
			for (i = -1; i <= 1; i++) {
				setWall(x - 12 + i, y, false);
				setWall(x + i, y, false);
				setWall(x + 12 + i, y, false);
			}
			setBrightness(12);
			setFreqBar(22);
		}

		@Override
		Setup createNext() {
			return new ObstacleSetup();
		}
	}

	class ObstacleSetup extends Setup {
		@Override
		String getName() {
			return "Obstacle";
		}

		@Override
		void select() {
			int i;
			int x = gridSizeX / 2;
			int y = windowOffsetY + 12; // was +6
			for (i = -15; i <= 15; i++)
				// was 5
				setWall(x + i, y);
			setBrightness(280);
			setFreqBar(20);
		}

		@Override
		Setup createNext() {
			return new HalfPlaneSetup();
		}
	}

	class HalfPlaneSetup extends Setup {
		@Override
		String getName() {
			return "Half Plane";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int x = windowOffsetX + windowWidth / 2;
			int i;
			for (i = windowWidth / 2; i < windowWidth; i++)
				setWall(windowOffsetX + i, windowOffsetY + 3);
			setBrightness(4);
			setFreqBar(25);
		}

		@Override
		Setup createNext() {
			return new DipoleSourceSetup();
		}
	}

	class DipoleSourceSetup extends Setup {
		@Override
		String getName() {
			return "Dipole Source";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_2S1F);
			setSources();
			sources[0].y = sources[1].y = gridSizeY / 2;
			sources[0].x = gridSizeX / 2 - 1;
			sources[1].x = gridSizeX / 2 + 1;
			auxBar.setValue(29);
			setFreqBar(13);
		}

		@Override
		void select() {
			setBrightness(33);
		}

		@Override
		Setup createNext() {
			return new LateralQuadrupoleSetup();
		}
	}

	class LateralQuadrupoleSetup extends Setup {
		@Override
		String getName() {
			return "Lateral Quadrupole";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_4S1F);
			setSources();
			sources[0].y = sources[2].y = gridSizeY / 2;
			sources[0].x = gridSizeX / 2 - 2;
			sources[2].x = gridSizeX / 2 + 2;
			sources[1].x = sources[3].x = gridSizeX / 2;
			sources[1].y = gridSizeY / 2 - 2;
			sources[3].y = gridSizeY / 2 + 2;
			setFreqBar(13);
			auxBar.setValue(29);
		}

		@Override
		void select() {
			setBrightness(33);
		}

		@Override
		Setup createNext() {
			return new LinearQuadrupoleSetup();
		}
	}

	class LinearQuadrupoleSetup extends Setup {
		@Override
		String getName() {
			return "Linear Quadrupole";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_4S1F);
			setSources();
			sources[0].y = sources[1].y = sources[2].y = sources[3].y = gridSizeY / 2;
			sources[0].x = gridSizeX / 2 - 3;
			sources[2].x = gridSizeX / 2 + 3;
			sources[1].x = gridSizeX / 2 + 1;
			sources[3].x = gridSizeX / 2 - 1;
			auxBar.setValue(29);
			setFreqBar(13);
		}

		@Override
		void select() {
			setBrightness(33);
		}

		@Override
		Setup createNext() {
			return new HexapoleSetup();
		}
	}

	class HexapoleSetup extends Setup {
		@Override
		String getName() {
			return "Hexapole";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_6S1F);
			setSources();
			doMultipole(6, 4);
			setFreqBar(22);
			auxBar.setValue(29);
		}

		void doMultipole(int n, double dist) {
			int i;
			for (i = 0; i != n; i++) {
				double xx = Math.round(dist * Math.cos(2 * pi * i / n));
				double yy = Math.round(dist * Math.sin(2 * pi * i / n));
				sources[i].x = gridSizeX / 2 + (int) xx;
				sources[i].y = gridSizeY / 2 + (int) yy;
			}
		}

		@Override
		void select() {
			brightnessBar.setValue(648);
		}

		@Override
		Setup createNext() {
			return new OctupoleSetup();
		}
	}

	class OctupoleSetup extends HexapoleSetup {
		@Override
		String getName() {
			return "Octupole";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_8S1F);
			setSources();
			doMultipole(8, 4);
			setFreqBar(22);
			auxBar.setValue(29);
		}

		@Override
		Setup createNext() {
			return new Multi12Setup();
		}
	}

	/*
	 * class Multi10Setup extends HexapoleSetup { String getName() { return
	 * "10-Pole"; } void doSetupSources() { sourceChooser.select(SRC_10S1F);
	 * setSources(); doMultipole(10, 6); setFreqBar(22); auxBar.setValue(29); }
	 * Setup createNext() { return new Multi12Setup(); } }
	 */
	class Multi12Setup extends HexapoleSetup {
		@Override
		String getName() {
			return "12-Pole";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_12S1F);
			setSources();
			doMultipole(12, 6);
			setFreqBar(22);
			auxBar.setValue(29);
		}

		@Override
		Setup createNext() {
			return new PlaneWaveSetup();
		}
	}

	/*
	 * class Multi16Setup extends HexapoleSetup { String getName() { return
	 * "16-Pole"; } void doSetupSources() { sourceChooser.select(SRC_16S1F);
	 * setSources(); doMultipole(16, 8); setFreqBar(22); auxBar.setValue(29); }
	 * Setup createNext() { return new Multi20Setup(); } } class Multi20Setup
	 * extends HexapoleSetup { String getName() { return "20-Pole"; } void
	 * doSetupSources() { sourceChooser.select(SRC_20S1F); setSources();
	 * doMultipole(20, 10); setFreqBar(22); auxBar.setValue(29); } Setup
	 * createNext() { return new PlaneWaveSetup(); } }
	 */
	class PlaneWaveSetup extends Setup {
		@Override
		String getName() {
			return "Plane Wave";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			// setBrightness(7);
			setFreqBar(15);
		}

		@Override
		Setup createNext() {
			return new IntersectingPlaneWavesSetup();
		}
	}

	class IntersectingPlaneWavesSetup extends Setup {
		@Override
		String getName() {
			return "Intersecting Planes";
		}

		@Override
		void select() {
			setBrightness(4);
			setFreqBar(17);
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_2S1F_PLANE);
			setSources();
			sources[0].y = sources[1].y = windowOffsetY;
			sources[0].x = windowOffsetX + 1;
			sources[2].x = sources[3].x = windowOffsetX;
			sources[2].y = windowOffsetY + 1;
			sources[3].y = windowOffsetY + windowHeight - 1;
		}

		@Override
		Setup createNext() {
			return new PhasedArray1Setup();
		}
	}

	class PhasedArray1Setup extends Setup {
		@Override
		String getName() {
			return "Phased Array 1";
		}

		@Override
		void select() {
			setBrightness(5);
			setFreqBar(17);
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_1S1F_PLANE_PHASE);
			setSources();
			sources[0].x = sources[1].x = gridSizeX / 2;
			sources[0].y = gridSizeY / 2 - 12;
			sources[1].y = gridSizeY / 2 + 12;
			auxBar.setValue(5);
		}

		@Override
		float calcSourcePhase(double ph, float v, double w) {
			ph *= (auxBar.getValue() - 15) * 3.8 * freqBar.getValue() * freqMult;
			return (float) Math.sin(w + ph);
		}

		@Override
		Setup createNext() {
			return new PhasedArray2Setup();
		}
	}

	class PhasedArray2Setup extends PhasedArray1Setup {
		@Override
		String getName() {
			return "Phased Array 2";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_1S1F_PLANE_PHASE);
			setSources();
			sources[0].x = sources[1].x = windowOffsetX + 1;
			sources[0].y = windowOffsetY + 1;
			sources[1].y = windowOffsetY + windowHeight - 2;
			auxBar.setValue(5);
		}

		@Override
		float calcSourcePhase(double ph, float v, double w) {
			double d = auxBar.getValue() * 2.5 / 30.;
			ph -= .5;
			ph = Math.sqrt(ph * ph + d * d);
			ph *= freqBar.getValue() * freqMult * 108;
			return (float) Math.sin(w + ph);
		}

		@Override
		Setup createNext() {
			return new PhasedArray3Setup();
		}
	}

	class PhasedArray3Setup extends PhasedArray2Setup {
		@Override
		String getName() {
			return "Phased Array 3";
		}

		@Override
		float calcSourcePhase(double ph, float v, double w) {
			double d = auxBar.getValue() * 2.5 / 30.;
			ph -= .5;
			ph = Math.sqrt(ph * ph + d * d);
			ph *= freqBar.getValue() * freqMult * 108;
			return (float) Math.sin(w - ph);
		}

		@Override
		Setup createNext() {
			return new DopplerSetup();
		}
	}

	class DopplerSetup extends Setup {
		@Override
		String getName() {
			return "Doppler Effect 1";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_MOVING);
			setFreqBar(13);
			setBrightness(20);
			fixedEndsCheck.setState(false);
		}

		@Override
		Setup createNext() {
			return new Doppler2Setup();
		}
	}

	class Doppler2Setup extends Setup {
		@Override
		String getName() {
			return "Doppler Effect 2";
		}

		double wall;
		int dir;
		int waiting;

		@Override
		void select() {
			wall = gridSizeY / 2.;
			dir = 1;
			waiting = 0;
			setFreqBar(13);
			setBrightness(220);
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_1S1F);
			setSources();
			sources[0].x = windowOffsetX + 1;
			sources[0].y = windowOffsetY + 1;
		}

		@Override
		void eachFrame() {
			if (waiting > 0) {
				waiting--;
				return;
			}
			int w1 = (int) wall;
			wall += dir * .04;
			int w2 = (int) wall;
			if (w1 != w2) {
				int i;
				for (i = windowOffsetX + windowWidth / 3; i <= gridSizeX - 1; i++) {
					setWall(i, w1, false);
					setWall(i, w2);
					int gi = i + w1 * gw;
					if (w2 < w1)
						func[gi] = funci[gi] = 0;
					else if (w1 > 1) {
						func[gi] = func[gi - gw] / 2;
						funci[gi] = funci[gi - gw] / 2;
					}
				}
				int w3 = (w2 - windowOffsetY) / 2 + windowOffsetY;
				for (i = windowOffsetY; i < w3; i++)
					setWall(gridSizeX / 2, i);
				setWall(gridSizeX / 2, i, false);
				calcExceptions();
			}
			if (w2 == windowOffsetY + windowHeight / 4
					|| w2 == windowOffsetY + windowHeight * 3 / 4) {
				dir = -dir;
				waiting = 1000;
			}
		}

		@Override
		Setup createNext() {
			return new SonicBoomSetup();
		}
	}

	class SonicBoomSetup extends Setup {
		@Override
		String getName() {
			return "Sonic Boom";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_MOVING);
			setFreqBar(13);
			setBrightness(20);
			fixedEndsCheck.setState(false);
		}

		@Override
		void doSetupSources() {
			setSources();
			auxBar.setValue(30);
		}

		@Override
		Setup createNext() {
			return new BigModeSetup();
		}
	}

	double aspectRatio = 1;
	
	void setupMode(int x, int y, int sx, int sy, int nx, int ny) {
		int i, j;
		for (i = 0; i != sx; i++)
			for (j = 0; j != sy; j++) {
				int gi = i + x + gw * (j + y);
				func[gi] = (float) (Math.sin(pi * nx * (i + 1) / (sx + 1)) * Math
						.sin(pi * ny * (j + 1) / (sy + 1)));
				funci[gi] = 0;
			}
	}

	void setupAcousticMode(int x, int y, int sx, int sy, int nx, int ny) {
		int i, j;
		if (nx == 0 && ny == 0)
			return;
		for (i = 0; i != sx; i++)
			for (j = 0; j != sy; j++) {
				int gi = i + x + gw * (j + y);
				func[gi] = (float) (Math.cos(pi * nx * i / (sx - 1)) * Math.cos(pi * ny
						* j / (sy - 1)));
				funci[gi] = 0;
			}
	}

	class BigModeSetup extends Setup {
		@Override
		String getName() {
			return "Big 1x1 Mode";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_NONE);
			int i;
			int n = windowWidth * 3 / 4;
			int x = windowOffsetX + windowWidth / 2 - n / 2;
			int y = windowOffsetY + windowHeight / 2 - n / 2;
			for (i = 0; i != n + 2; i++) {
				setWall(x + i - 1, y - 1);
				setWall(x + i - 1, y + n);
				setWall(x - 1, y + i - 1);
				setWall(x + n, y + i - 1);
			}
			setupMode(x, y, n, n, 1, 1);
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new OneByOneModesSetup();
		}
	}

	class OneByOneModesSetup extends Setup {
		@Override
		String getName() {
			return "1x1 Modes";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int ny = 5;
			while (y + ny < windowHeight) {
				int nx = ((y + ny) * (windowWidth - 8) / windowHeight) + 6;
				int y1 = y + windowOffsetY;
				int x1 = windowOffsetX + 1;
				for (i = 0; i != nx + 2; i++) {
					setWall(x1 + i - 1, y1 - 1);
					setWall(x1 + i - 1, y1 + ny);
				}
				for (j = 0; j != ny + 2; j++) {
					setWall(x1 - 1, y1 + j - 1);
					setWall(x1 + nx, y1 + j - 1);
				}
				setupMode(x1, y1, nx, ny, 1, 1);
				y += ny + 1;
			}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new OneByNModesSetup();
		}
	}

	class OneByNModesSetup extends Setup {
		@Override
		String getName() {
			return "1xN Modes";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int ny = 5;
			int nx = windowWidth - 2;
			int mode = 1;
			while (y + ny < windowHeight) {
				int y1 = y + windowOffsetY;
				int x1 = windowOffsetX + 1;
				for (i = 0; i != nx + 2; i++) {
					setWall(x1 + i - 1, y1 - 1);
					setWall(x1 + i - 1, y1 + ny);
				}
				for (j = 0; j != ny + 2; j++) {
					setWall(x1 - 1, y1 + j - 1);
					setWall(x1 + nx, y1 + j - 1);
				}
				setupMode(x1, y1, nx, ny, mode, 1);
				y += ny + 1;
				mode++;
			}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new NByNModesSetup();
		}
	}

	class NByNModesSetup extends Setup {
		@Override
		String getName() {
			return "NxN Modes";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int modex, modey;
			int maxmode = 3;
			if (resBar.getValue() >= 70)
				maxmode++;
			if (resBar.getValue() >= 100)
				maxmode++;
			int ny = windowHeight / maxmode - 2;
			int nx = windowWidth / maxmode - 2;
			for (modex = 1; modex <= maxmode; modex++)
				for (modey = 1; modey <= maxmode; modey++) {
					int x1 = windowOffsetX + 1 + (ny + 1) * (modey - 1);
					int y1 = windowOffsetY + 1 + (nx + 1) * (modex - 1);
					for (i = 0; i != nx + 2; i++) {
						setWall(x1 + i - 1, y1 - 1);
						setWall(x1 + i - 1, y1 + ny);
					}
					for (j = 0; j != ny + 2; j++) {
						setWall(x1 - 1, y1 + j - 1);
						setWall(x1 + nx, y1 + j - 1);
					}
					setupMode(x1, y1, nx, ny, modex, modey);
				}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new OneByNModeCombosSetup();
		}
	}

	class OneByNModeCombosSetup extends Setup {
		@Override
		String getName() {
			return "1xN Mode Combos";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int ny = 5;
			int nx = windowWidth - 2;
			while (y + ny < windowHeight) {
				int mode1 = getrand(12) + 1;
				int mode2;
				do
					mode2 = getrand(12) + 1;
				while (mode1 == mode2);
				int y1 = y + windowOffsetY;
				int x1 = windowOffsetX + 1;
				for (i = 0; i != nx + 2; i++) {
					setWall(x1 + i - 1, y1 - 1);
					setWall(x1 + i - 1, y1 + ny);
				}
				for (j = 0; j != ny + 2; j++) {
					setWall(x1 - 1, y1 + j - 1);
					setWall(x1 + nx, y1 + j - 1);
				}
				for (i = 0; i != nx; i++)
					for (j = 0; j != ny; j++) {
						int gi = i + x1 + gw * (j + y1);
						func[gi] = (float) (Math.sin(mode1 * pi * (i + 1) / (nx + 1))
								* Math.sin(pi * (j + 1) / (ny + 1)) * .5 + Math.sin(mode2 * pi
								* (i + 1) / (nx + 1))
								* Math.sin(pi * (j + 1) / (ny + 1)) * .5);
						funci[gi] = 0;
					}
				y += ny + 1;
			}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new NByNModeCombosSetup();
		}
	}

	class NByNModeCombosSetup extends Setup {
		@Override
		String getName() {
			return "NxN Mode Combos";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int maxmode = 3;
			if (resBar.getValue() >= 70)
				maxmode++;
			if (resBar.getValue() >= 100)
				maxmode++;
			int ny = windowHeight / maxmode - 2;
			int nx = windowWidth / maxmode - 2;
			int gx, gy;
			for (gx = 1; gx <= maxmode; gx++)
				for (gy = 1; gy <= maxmode; gy++) {
					int mode1x = getrand(4) + 1;
					int mode1y = getrand(4) + 1;
					int mode2x, mode2y;
					do {
						mode2x = getrand(4) + 1;
						mode2y = getrand(4) + 1;
					} while (mode1x == mode2x && mode1y == mode2y);
					int x1 = windowOffsetX + 1 + (ny + 1) * (gx - 1);
					int y1 = windowOffsetY + 1 + (nx + 1) * (gy - 1);
					for (i = 0; i != nx + 2; i++) {
						setWall(x1 + i - 1, y1 - 1);
						setWall(x1 + i - 1, y1 + ny);
					}
					for (j = 0; j != ny + 2; j++) {
						setWall(x1 - 1, y1 + j - 1);
						setWall(x1 + nx, y1 + j - 1);
					}
					for (i = 0; i != nx; i++)
						for (j = 0; j != ny; j++) {
							int gi = i + x1 + gw * (j + y1);
							func[gi] = (float) (Math.sin(mode1x * pi * (i + 1) / (nx + 1))
									* Math.sin(mode1y * pi * (j + 1) / (ny + 1)) * .5 + Math
									.sin(mode2x * pi * (i + 1) / (nx + 1))
									* Math.sin(mode2y * pi * (j + 1) / (ny + 1)) * .5);
							funci[gi] = 0;
						}
				}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new ZeroByOneModesSetup();
		}
	}

	class ZeroByOneModesSetup extends Setup {
		@Override
		String getName() {
			return "0x1 Acoustic Modes";
		}

		@Override
		void select() {
			fixedEndsCheck.setState(false);
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int ny = 5;
			while (y + ny < windowHeight) {
				int nx = ((y + ny) * (windowWidth - 8) / windowHeight) + 6;
				int y1 = y + windowOffsetY;
				int x1 = windowOffsetX + 1;
				for (i = 0; i != nx + 2; i++) {
					setWall(x1 + i - 1, y1 - 1);
					setWall(x1 + i - 1, y1 + ny);
				}
				for (j = 0; j != ny + 2; j++) {
					setWall(x1 - 1, y1 + j - 1);
					setWall(x1 + nx, y1 + j - 1);
				}
				setupAcousticMode(x1, y1, nx, ny, 1, 0);
				y += ny + 1;
			}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new ZeroByNModesSetup();
		}
	}

	class ZeroByNModesSetup extends Setup {
		@Override
		String getName() {
			return "0xN Acoustic Modes";
		}

		@Override
		void select() {
			fixedEndsCheck.setState(false);
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int ny = 5;
			int nx = windowWidth - 2;
			int mode = 1;
			while (y + ny < windowHeight) {
				int y1 = y + windowOffsetY;
				int x1 = windowOffsetX + 1;
				for (i = 0; i != nx + 2; i++) {
					setWall(x1 + i - 1, y1 - 1);
					setWall(x1 + i - 1, y1 + ny);
				}
				for (j = 0; j != ny + 2; j++) {
					setWall(x1 - 1, y1 + j - 1);
					setWall(x1 + nx, y1 + j - 1);
				}
				setupAcousticMode(x1, y1, nx, ny, mode, 0);
				y += ny + 1;
				mode++;
			}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new NByNAcoModesSetup();
		}
	}

	class NByNAcoModesSetup extends Setup {
		@Override
		String getName() {
			return "NxN Acoustic Modes";
		}

		@Override
		void select() {
			fixedEndsCheck.setState(false);
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int modex, modey;
			int maxmode = 2;
			if (resBar.getValue() >= 70)
				maxmode++;
			// weird things start to happen if maxmode goes higher than 4
			int ny = windowHeight / (maxmode + 1) - 2;
			int nx = windowWidth / (maxmode + 1) - 2;
			for (modex = 0; modex <= maxmode; modex++)
				for (modey = 0; modey <= maxmode; modey++) {
					int x1 = windowOffsetX + 1 + (ny + 1) * (modey);
					int y1 = windowOffsetY + 1 + (nx + 1) * (modex);
					for (i = 0; i != nx + 2; i++) {
						setWall(x1 + i - 1, y1 - 1);
						setWall(x1 + i - 1, y1 + ny);
					}
					for (j = 0; j != ny + 2; j++) {
						setWall(x1 - 1, y1 + j - 1);
						setWall(x1 + nx, y1 + j - 1);
					}
					setupAcousticMode(x1, y1, nx, ny, modex, modey);
				}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new CoupledCavitiesSetup();
		}
	}

	class CoupledCavitiesSetup extends Setup {
		@Override
		String getName() {
			return "Coupled Cavities";
		}

		@Override
		void select() {
			fixedEndsCheck.setState(false);
			sourceChooser.select(SRC_NONE);
			int i, j;
			int y = 1;
			int ny = 5;
			while (y + ny < windowHeight) {
				int nx = 35;
				int y1 = y + windowOffsetY;
				int x1 = windowOffsetX + 1;
				for (i = 0; i != nx + 2; i++) {
					setWall(x1 + i - 1, y1 - 1);
					setWall(x1 + i - 1, y1 + ny);
				}
				for (j = 0; j != ny + 2; j++) {
					setWall(x1 - 1, y1 + j - 1);
					setWall(x1 + nx, y1 + j - 1);
				}
				for (j = 0; j != 2; j++) {
					setWall(x1 + nx / 2, y1 + j);
					setWall(x1 + nx / 2, y1 + 4 - j);
				}
				setupAcousticMode(x1, y1, nx / 2, ny, 1, 0);
				y += ny + 3;
			}
			dampingBar.setValue(1);
		}

		@Override
		Setup createNext() {
			return new BeatsSetup();
		}
	}

	class BeatsSetup extends Setup {
		@Override
		String getName() {
			return "Beats";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_2S2F);
			setSources();
			auxBar.setValue(24);
			sources[0].y = sources[1].y = gridSizeY / 2;
			sources[0].x = gridSizeX / 2 - 2;
			sources[1].x = gridSizeX / 2 + 2;
		}

		@Override
		void select() {
			setBrightness(25);
			setFreqBar(18);
		}

		@Override
		Setup createNext() {
			return new SlowMediumSetup();
		}
	}

	class SlowMediumSetup extends Setup {
		@Override
		String getName() {
			return "Slow Medium";
		}

		@Override
		void select() {
			addMedium();
			setFreqBar(10);
			setBrightness(33);
		}

		@Override
		Setup createNext() {
			return new RefractionSetup();
		}
	}

	class RefractionSetup extends Setup {
		@Override
		String getName() {
			return "Refraction";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_1S1F_PLANE_PULSE);
			setSources();
			sources[0].x = windowOffsetX;
			sources[0].y = windowOffsetY + windowHeight / 4;
			sources[1].x = windowOffsetX + windowWidth / 3;
			sources[1].y = windowOffsetY;
			addMedium();
			setFreqBar(1);
			setBrightness(33);
		}

		@Override
		void select() {
		}

		@Override
		Setup createNext() {
			return new InternalReflectionSetup();
		}
	}

	class InternalReflectionSetup extends Setup {
		@Override
		String getName() {
			return "Internal Reflection";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_1S1F_PLANE_PULSE);
			setSources();
			sources[0].x = windowOffsetX;
			sources[0].y = windowOffsetY + windowHeight * 2 / 3;
			sources[1].x = windowOffsetX + windowWidth / 3;
			sources[1].y = windowOffsetY + windowHeight - 1;
			addMedium();
			setFreqBar(1);
			setBrightness(33);
		}

		@Override
		void select() {
		}

		@Override
		Setup createNext() {
			return new CoatingSetup();
		}
	}

	class CoatingSetup extends Setup {
		@Override
		String getName() {
			return "Anti-Reflective Coating";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F);
			addMedium();
			int i, j;
			// v2/c2 = 1-(mediumMaxIndex/mediumMax)*medium);
			// n = sqrt(v2/c2)
			double nmax = Math.sqrt(1 - mediumMaxIndex);
			double nroot = Math.sqrt(nmax);
			int mm = (int) ((1 - nmax) * mediumMax / mediumMaxIndex);
			for (i = 0; i != gridSizeX; i++)
				for (j = gridSizeY / 2 - 4; j != gridSizeY / 2; j++)
					medium[i + j * gw] = mm;
			setFreqBar(6);
			setBrightness(28);
		}

		@Override
		Setup createNext() {
			return new ZonePlateEvenSetup();
		}
	}

	class ZonePlateEvenSetup extends Setup {
		int zoneq;

		ZonePlateEvenSetup() {
			zoneq = 1;
		}

		@Override
		String getName() {
			return "Zone Plate (Even)";
		}

		@Override
		void doSetupSources() {
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			setSources();
			if (resBar.getValue() < 42)
				setResolution(42);
			int i;
			// wavelength by default = 25, we want it to be 6
			int freq = 30;
			setFreqBar(freq);
			double halfwave = 25. / (freq * 2 / 5);
			int y = sources[0].y + 1;
			int dy = windowOffsetY + windowHeight / 2 - y;
			int dy2 = dy * dy;
			int cx = gridSizeX / 2;
			for (i = 0; i != windowWidth; i++) {
				int x = windowOffsetX + i;
				int dx = cx - x;
				double dist = Math.sqrt(dx * dx + dy * dy);
				dist = (dist - dy);
				int zone = (int) (dist / halfwave);
				setWall(x, y, ((zone & 1) == zoneq));
				setWall(windowOffsetX, y);
				setWall(windowOffsetX + windowWidth - 1, y);
			}
			setBrightness(zoneq == 1 ? 4 : 7);
		}

		@Override
		Setup createNext() {
			return new ZonePlateOddSetup();
		}
	}

	class ZonePlateOddSetup extends ZonePlateEvenSetup {
		ZonePlateOddSetup() {
			zoneq = 0;
		}

		@Override
		String getName() {
			return "Zone Plate (Odd)";
		}

		@Override
		Setup createNext() {
			return new CircleSetup();
		}
	}

	class CircleSetup extends Setup {
		CircleSetup() {
			circle = true;
		}

		boolean circle;

		@Override
		String getName() {
			return "Circle";
		}

		@Override
		void doSetupSources() {
		}

		@Override
		void select() {
			int i;
			int dx = windowWidth / 2 - 2;
			double a2 = dx * dx;
			double b2 = a2 / 2;
			if (circle)
				b2 = a2;
			int cx = windowWidth / 2 + windowOffsetX;
			int cy = windowHeight / 2 + windowOffsetY;
			int ly = -1;
			for (i = 0; i <= dx; i++) {
				double y = Math.sqrt((1 - i * i / a2) * b2);
				int yi = (int) (y + 1.5);
				if (i == dx)
					yi = 0;
				if (ly == -1)
					ly = yi;
				for (; ly >= yi; ly--) {
					setWall(cx + i, cy + ly);
					setWall(cx - i, cy + ly);
					setWall(cx + i, cy - ly);
					setWall(cx - i, cy - ly);
					// setWall(cx-ly, cx+i);
					// setWall(cx+ly, cx+i);
				}
				ly = yi;
			}
			int c = (int) (Math.sqrt(a2 - b2));
			// walls[cx+c][cy] = walls[cx-c][cy] = true;
			// walls[cx][cy+c] = true;
			sourceChooser.select(SRC_1S1F_PULSE);
			setSources();
			sources[0].x = cx - c;
			sources[0].y = cy;
			setFreqBar(1);
			setBrightness(16);
		}

		@Override
		Setup createNext() {
			return new EllipseSetup();
		}
	}

	class EllipseSetup extends CircleSetup {
		EllipseSetup() {
			circle = false;
		}

		@Override
		String getName() {
			return "Ellipse";
		}

		@Override
		Setup createNext() {
			return new ResonantCavitiesSetup();
		}
	}

	class ResonantCavitiesSetup extends Setup {
		@Override
		String getName() {
			return "Resonant Cavities 1";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i, j;
			int x = 1;
			int nx = 5;
			int y1 = windowOffsetY + 11;
			while (x + nx < windowWidth) {
				int ny = ((x + nx) * (windowHeight - 18) / windowWidth) + 6;
				int x1 = x + windowOffsetX;
				for (i = 0; i != ny + 2; i++) {
					setWall(x1 - 1, y1 + i - 1);
					setWall(x1 + nx, y1 + i - 1);
				}
				for (j = 0; j != nx + 2; j++) {
					setWall(x1 + j - 1, y1 - 1);
					setWall(x1 + j - 1, y1 + ny);
				}
				setWall(x1 + nx / 2, y1 - 1, false);
				x += nx + 1;
			}
			for (; x < windowWidth; x++)
				setWall(x + windowOffsetX, y1 - 1);
			setBrightness(30);
			setFreqBar(15);
		}

		@Override
		double sourceStrength() {
			return .1;
		}

		@Override
		Setup createNext() {
			return new ResonantCavities2Setup();
		}
	}

	class ResonantCavities2Setup extends Setup {
		@Override
		String getName() {
			return "Resonant Cavities 2";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i, j;
			int x = 1;
			int nx = 5;
			int y1 = windowOffsetY + 11;
			int ny = 5;
			while (x + nx < windowWidth) {
				int x1 = x + windowOffsetX;
				for (i = 0; i != ny + 2; i++) {
					setWall(x1 - 1, y1 + i - 1);
					setWall(x1 + nx, y1 + i - 1);
				}
				for (j = 0; j != nx + 2; j++)
					setWall(x1 + j - 1, y1 + ny);
				x += nx + 1;
				ny++;
			}
			for (; x < windowWidth; x++)
				setWall(x + windowOffsetX, y1 - 1);
			setBrightness(30);
			setFreqBar(16);
		}

		@Override
		double sourceStrength() {
			return .03;
		}

		@Override
		Setup createNext() {
			return new RoomResonanceSetup();
		}
	}

	class RoomResonanceSetup extends Setup {
		@Override
		String getName() {
			return "Room Resonance";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_4S1F);
			setSources();
			int i, j;
			int modex, modey;
			int ny = 17;
			int nx = 17;
			for (modex = 1; modex <= 2; modex++)
				for (modey = 1; modey <= 2; modey++) {
					int x1 = windowOffsetX + 1 + (ny + 1) * (modey - 1);
					int y1 = windowOffsetY + 1 + (nx + 1) * (modex - 1);
					for (i = 0; i != nx + 2; i++) {
						setWall(x1 + i - 1, y1 - 1);
						setWall(x1 + i - 1, y1 + ny);
					}
					for (j = 0; j != ny + 2; j++) {
						setWall(x1 - 1, y1 + j - 1);
						setWall(x1 + nx, y1 + j - 1);
					}
				}
			sources[0].x = sources[2].x = windowOffsetX + 2;
			sources[0].y = sources[1].y = windowOffsetY + 2;
			sources[1].x = sources[3].x = windowOffsetX + 1 + nx + (nx + 1) / 2;
			sources[2].y = sources[3].y = windowOffsetY + 1 + ny + (ny + 1) / 2;
			fixedEndsCheck.setState(false);
			dampingBar.setValue(10);
			setBrightness(3);
		}

		@Override
		void doSetupSources() {
		}

		@Override
		Setup createNext() {
			return new Waveguides1Setup();
		}
	}

	class Waveguides1Setup extends Setup {
		@Override
		String getName() {
			return "Waveguides 1";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i, j;
			int x = 1;
			int nx = 3;
			int y1 = windowOffsetY + 3;
			int ny = windowHeight - 2;
			while (x + nx < windowWidth) {
				int x1 = x + windowOffsetX;
				for (i = 0; i != ny; i++) {
					setWall(x1 - 1, y1 + i - 1);
					setWall(x1 + nx, y1 + i - 1);
				}
				nx++;
				x += nx;
			}
			for (; x < windowWidth; x++)
				setWall(x + windowOffsetX, y1 - 1);
			setBrightness(6);
			setFreqBar(14);
		}

		@Override
		Setup createNext() {
			return new Waveguides2Setup();
		}
	}

	class Waveguides2Setup extends Waveguides1Setup {
		@Override
		String getName() {
			return "Waveguides 2";
		}

		@Override
		void select() {
			super.select();
			setFreqBar(8);
		}

		@Override
		Setup createNext() {
			return new Waveguides3Setup();
		}
	}

	class Waveguides3Setup extends Setup {
		@Override
		String getName() {
			return "Waveguides 3";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i, j;
			int x = 1;
			int nx = 8;
			int y1 = windowOffsetY + 3;
			int ny = windowHeight - 2;
			for (x = 1; x < windowWidth; x++)
				setWall(x + windowOffsetX, y1 - 1);
			x = 1;
			j = 0;
			while (x + nx < windowWidth && j < nx) {
				int x1 = x + windowOffsetX;
				for (i = 0; i != ny; i++) {
					setWall(x1 - 1, y1 + i - 1);
					setWall(x1 + nx, y1 + i - 1);
				}
				setWall(x1 + j++, y1 - 1, false);
				x += nx + 1;
			}
			setBrightness(89);
			setFreqBar(16);
		}

		@Override
		Setup createNext() {
			return new Waveguides4Setup();
		}
	}

	class Waveguides4Setup extends Waveguides3Setup {
		@Override
		String getName() {
			return "Waveguides 4";
		}

		@Override
		void select() {
			super.select();
			setBrightness(29);
			setFreqBar(20);
			fixedEndsCheck.setState(false);
		}

		@Override
		Setup createNext() {
			return new Waveguides5Setup();
		}
	}

	class Waveguides5Setup extends Waveguides3Setup {
		@Override
		String getName() {
			return "Waveguides 5";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i;
			int x = 1;
			int nx = 8;
			int y1 = windowOffsetY + 2;
			int ny = windowHeight - 1;
			x = 1;
			while (x + nx < windowWidth) {
				int x1 = x + windowOffsetX;
				for (i = 0; i != ny; i++) {
					setWall(x1 - 1, y1 + i - 1);
					setWall(x1 + nx, y1 + i - 1);
				}
				x += nx + 1;
			}
			setBrightness(9);
			setFreqBar(22);
		}

		@Override
		void eachFrame() {
			int y = windowOffsetY + 1;
			int nx = 8;
			int x = 1;
			int g = 1;
			while (x + nx < windowWidth) {
				int x1 = x + windowOffsetX;
				int j;
				int n1 = 1;
				int n2 = 1;
				switch (g) {
				case 1:
					n1 = n2 = 1;
					break;
				case 2:
					n1 = n2 = 2;
					break;
				case 3:
					n1 = 1;
					n2 = 2;
					break;
				case 4:
					n1 = n2 = 3;
					break;
				case 5:
					n1 = 1;
					n2 = 3;
					break;
				case 6:
					n1 = 2;
					n2 = 3;
					break;
				default:
					n1 = n2 = 0;
					break;
				}
				for (j = 0; j != nx; j++)
					func[x1 + j + gw * y] *= .5 * (Math.sin(pi * n1 * (j + 1) / (nx + 1)) + Math
							.sin(pi * n2 * (j + 1) / (nx + 1)));
				x += nx + 1;
				g++;
			}
		}

		@Override
		Setup createNext() {
			return new ParabolicMirror1Setup();
		}
	}

	/*
	 * class HornSetup extends Setup { String getName() { return "Horn"; } void
	 * select() { if (resBar.getValue() < 76) setResolution(76);
	 * fixedEndsCheck.setState(false); setFreqBar(3); int i; int cx =
	 * windowOffsetX+windowWidth/2; int yy = windowHeight/2; int oj = 0; double
	 * lmult = Math.log(windowWidth/2-2)*1.2; System.out.println(yy + " " +
	 * lmult); for (i = 0; i < yy; i++) { int j = (int) (Math.exp(i*lmult/yy));
	 * System.out.println(i + " " +j); //int j = i*((windowWidth-5)/2)/yy; while
	 * (oj <= j) { walls[cx+oj][windowOffsetY+i] = walls[cx-oj][windowOffsetY+i] =
	 * true; oj++; } oj = j; } setBrightness(12); } Setup createNext() { return
	 * new ParabolicMirror1Setup(); } }
	 */
	class ParabolicMirror1Setup extends Setup {
		@Override
		String getName() {
			return "Parabolic Mirror 1";
		}

		@Override
		void select() {
			if (resBar.getValue() < 50)
				setResolution(50);
			int i;
			int cx = windowWidth / 2 + windowOffsetX;
			int lx = 0;
			int dy = windowHeight / 2;
			int cy = windowHeight + windowOffsetY - 2;
			int dx = windowWidth / 2 - 2;
			double c = dx * dx * .5 / dy;
			if (c > 20)
				c = 20;
			for (i = 0; i <= dy; i++) {
				double x = Math.sqrt(2 * c * i);
				int xi = (int) (x + 1.5);
				for (; lx <= xi; lx++) {
					setWall(cx - lx, cy - i);
					setWall(cx + lx, cy - i);
				}
				lx = xi;
			}
			setSources();
			sources[0].x = cx;
			sources[0].y = (int) (cy - 1 - c / 2);
			setBrightness(18);
		}

		@Override
		void doSetupSources() {
		}

		@Override
		Setup createNext() {
			return new ParabolicMirror2Setup();
		}
	}

	class ParabolicMirror2Setup extends ParabolicMirror1Setup {
		@Override
		String getName() {
			return "Parabolic Mirror 2";
		}

		@Override
		void doSetupSources() {
			sourceChooser.select(SRC_1S1F_PLANE);
			brightnessBar.setValue(370);
			setFreqBar(15);
			setSources();
		}

		@Override
		Setup createNext() {
			return new SoundDuctSetup();
		}
	}

	class SoundDuctSetup extends Setup {
		@Override
		String getName() {
			return "Sound Duct";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PULSE);
			fixedEndsCheck.setState(false);
			int i;
			int cx = windowOffsetX + windowWidth / 2;
			for (i = 0; i != windowHeight - 12; i++) {
				setWall(cx - 3, i + windowOffsetY + 6);
				setWall(cx + 3, i + windowOffsetY + 6);
			}
			setFreqBar(1);
			setBrightness(60);
		}

		@Override
		Setup createNext() {
			return new BaffledPistonSetup();
		}
	}

	class BaffledPistonSetup extends Setup {
		@Override
		String getName() {
			return "Baffled Piston";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			fixedEndsCheck.setState(false);
			int i;
			for (i = 0; i != gridSizeY; i++)
				setWall(windowOffsetX + 2, i);
			for (i = 0; i <= 11; i++) {
				setWall(windowOffsetX, i + gridSizeY / 2 - 5);
				if (i != 0 && i != 11)
					setWall(windowOffsetX + 2, i + gridSizeY / 2 - 5, false);
			}
			setWall(windowOffsetX + 1, gridSizeY / 2 - 5);
			setWall(windowOffsetX + 1, gridSizeY / 2 + 6);
			setFreqBar(24);
			setSources();
			sources[0].x = sources[1].x = windowOffsetX + 1;
			sources[0].y = gridSizeY / 2 - 4;
			sources[1].y = gridSizeY / 2 + 5;
			setBrightness(18);
		}

		@Override
		void doSetupSources() {
		}

		@Override
		Setup createNext() {
			return new LowPassFilter1Setup();
		}
	}

	class LowPassFilter1Setup extends Setup {
		@Override
		String getName() {
			return "Low-Pass Filter 1";
		}

		@Override
		void select() {
			if (resBar.getValue() < 43)
				setResolution(43);
			fixedEndsCheck.setState(false);
			int i, j;
			for (i = 0; i != windowWidth; i++)
				setWall(i + windowOffsetX, windowOffsetY + 9);
			int cx = gridSizeX / 2;
			for (i = 1; i <= 4; i++)
				for (j = -7; j <= 7; j++)
					setWall(cx + j, windowOffsetY + 9 * i);
			for (i = 0; i <= 4; i++)
				for (j = -4; j <= 4; j++)
					setWall(cx + j, windowOffsetY + 9 * i, false);
			for (i = 0; i != 27; i++) {
				setWall(cx + 7, windowOffsetY + 9 + i);
				setWall(cx - 7, windowOffsetY + 9 + i);
			}
			setBrightness(38);
		}

		@Override
		Setup createNext() {
			return new LowPassFilter2Setup();
		}
	}

	class LowPassFilter2Setup extends LowPassFilter1Setup {
		@Override
		String getName() {
			return "Low-Pass Filter 2";
		}

		@Override
		void select() {
			super.select();
			setFreqBar(17);
		}

		@Override
		Setup createNext() {
			return new HighPassFilter1Setup();
		}
	}

	class HighPassFilter1Setup extends Setup {
		@Override
		String getName() {
			return "High-Pass Filter 1";
		}

		@Override
		void select() {
			if (resBar.getValue() < 43)
				setResolution(43);
			fixedEndsCheck.setState(false);
			int i, j;
			for (i = 0; i != windowWidth; i++)
				for (j = 0; j <= 25; j += 5)
					setWall(i + windowOffsetX, windowOffsetY + 9 + j);
			int cx = gridSizeX / 2;
			for (i = 0; i <= 25; i += 5)
				for (j = -4; j <= 4; j++)
					setWall(cx + j, windowOffsetY + 9 + i, false);
			setBrightness(62);
			// by default we show a freq high enough to be passed
			setFreqBar(17);
		}

		@Override
		Setup createNext() {
			return new HighPassFilter2Setup();
		}
	}

	class HighPassFilter2Setup extends HighPassFilter1Setup {
		@Override
		String getName() {
			return "High-Pass Filter 2";
		}

		@Override
		void select() {
			super.select();
			setFreqBar(7);
		}

		@Override
		Setup createNext() {
			return new BandStopFilter1Setup();
		}
	}

	class BandStopFilter1Setup extends Setup {
		@Override
		String getName() {
			return "Band-Stop Filter 1";
		}

		@Override
		void select() {
			if (resBar.getValue() < 43)
				setResolution(43);
			fixedEndsCheck.setState(false);
			int i, j, k;
			for (i = 0; i != windowWidth; i++)
				setWall(i + windowOffsetX, windowOffsetY + 9);
			int cx = gridSizeX / 2;
			for (i = 1; i <= 2; i++)
				for (j = -11; j <= 11; j++) {
					if (j > -5 && j < 5)
						continue;
					setWall(cx + j, windowOffsetY + 9 + 9 * i);
				}
			for (i = 0; i <= 1; i++)
				for (j = -4; j <= 4; j++)
					setWall(cx + j, windowOffsetY + 9 + i * 26, false);
			for (i = 0; i <= 18; i++) {
				setWall(cx + 11, windowOffsetY + 9 + i);
				setWall(cx - 11, windowOffsetY + 9 + i);
			}
			for (i = 0; i != 3; i++)
				for (j = 0; j != 3; j++)
					for (k = 9; k <= 18; k += 9) {
						setWall(cx + 5 + i, windowOffsetY + k + j);
						setWall(cx + 5 + i, windowOffsetY + 9 + k - j);
						setWall(cx - 5 - i, windowOffsetY + k + j);
						setWall(cx - 5 - i, windowOffsetY + 9 + k - j);
					}
			setBrightness(38);
			setFreqBar(2);
		}

		@Override
		Setup createNext() {
			return new BandStopFilter2Setup();
		}
	}

	class BandStopFilter2Setup extends BandStopFilter1Setup {
		@Override
		String getName() {
			return "Band-Stop Filter 2";
		}

		@Override
		void select() {
			super.select();
			setFreqBar(10);
		}

		@Override
		Setup createNext() {
			return new BandStopFilter3Setup();
		}
	}

	class BandStopFilter3Setup extends BandStopFilter1Setup {
		@Override
		String getName() {
			return "Band-Stop Filter 3";
		}

		@Override
		void select() {
			super.select();
			// at this frequency it doesn't pass
			setFreqBar(4);
		}

		@Override
		Setup createNext() {
			return new PlanarConvexLensSetup();
		}
	}

	class PlanarConvexLensSetup extends Setup {
		@Override
		String getName() {
			return "Planar Convex Lens";
		}

		@Override
		void select() {
			if (resBar.getValue() < 42)
				setResolution(42);
			sourceChooser.select(SRC_1S1F_PLANE);
			// need small wavelengths here to remove diffraction effects
			int i, j;
			int cx = gridSizeX / 2;
			int cy = windowHeight / 8 + windowOffsetY;
			int x0 = windowWidth / 3 - 2;
			int y0 = 5;
			double r = (.75 * windowHeight) * .5;
			double h = r - y0;
			double r2 = r * r;
			if (x0 > r)
				x0 = (int) r;
			for (i = 0; i <= x0; i++) {
				int y = 2 + (int) (Math.sqrt(r2 - i * i) - h + .5);
				for (; y >= 0; y--) {
					setMedium(cx + i, cy + y, mediumMax / 2);
					setMedium(cx - i, cy + y, mediumMax / 2);
				}
			}
			setFreqBar(19);
			setBrightness(6);
		}

		@Override
		Setup createNext() {
			return new BiconvexLensSetup();
		}
	}

	class BiconvexLensSetup extends Setup {
		@Override
		String getName() {
			return "Biconvex Lens";
		}

		@Override
		void select() {
			if (resBar.getValue() < 50)
				setResolution(50);
			setSources();
			int i, j;
			int cx = gridSizeX / 2;
			int cy = gridSizeY / 2;
			int x0 = windowWidth / 3 - 2;
			int y0 = 10;
			double r = (.75 * .5 * windowHeight) * .5;
			double h = r - y0;
			double r2 = r * r;
			if (x0 > r)
				x0 = (int) r;
			for (i = 0; i <= x0; i++) {
				int y = 1 + (int) (Math.sqrt(r2 - i * i) - h + .5);
				for (; y >= 0; y--) {
					setMedium(cx + i, cy + y, mediumMax / 2);
					setMedium(cx - i, cy + y, mediumMax / 2);
					setMedium(cx + i, cy - y, mediumMax / 2);
					setMedium(cx - i, cy - y, mediumMax / 2);
				}
			}
			setFreqBar(19);
			setBrightness(66);
			sources[0].y = cy - (2 + 2 * (int) r);
		}

		@Override
		void doSetupSources() {
		}

		@Override
		Setup createNext() {
			return new PlanarConcaveSetup();
		}
	}

	class PlanarConcaveSetup extends Setup {
		@Override
		String getName() {
			return "Planar Concave Lens";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i, j;
			int cx = gridSizeX / 2;
			int cy = windowHeight / 8 + windowOffsetY;
			int x0 = windowWidth / 5;
			int y0 = 5;
			double r = (.25 * windowHeight) * .5;
			double h = r - y0;
			double r2 = r * r;
			if (x0 > r)
				x0 = (int) r;
			for (i = 0; i <= x0; i++) {
				int y = y0 + 2 - (int) (Math.sqrt(r2 - i * i) - h + .5);
				for (; y >= 0; y--) {
					setMedium(cx + i, cy + y, mediumMax / 2);
					setMedium(cx - i, cy + y, mediumMax / 2);
				}
			}
			for (i = 0; i != windowWidth; i++)
				if (medium[windowOffsetX + i + gw * cy] == 0)
					setWall(windowOffsetX + i, cy);
			setFreqBar(19);
		}

		@Override
		Setup createNext() {
			return new CircularPrismSetup();
		}
	}

	class CircularPrismSetup extends Setup {
		@Override
		String getName() {
			return "Circular Prism";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE);
			int i, j;
			int cx = gridSizeX / 2;
			int cy = gridSizeY / 2;
			int x0 = windowWidth / 3 - 2;
			int y0 = x0;
			double r = (x0 * x0 + y0 * y0) / (2. * y0);
			double h = r - y0;
			double r2 = r * r;
			for (i = 0; i < x0; i++) {
				int y = (int) (Math.sqrt(r2 - i * i) - h + .5);
				for (; y >= 0; y--) {
					setMedium(cx + i, cy + y, mediumMax);
					setMedium(cx - i, cy + y, mediumMax);
					setMedium(cx + i, cy - y, mediumMax);
					setMedium(cx - i, cy - y, mediumMax);
				}
			}
			for (i = 0; i != windowWidth; i++)
				if (medium[windowOffsetX + i + gw * cy] == 0)
					setWall(windowOffsetX + i, cy);
			setFreqBar(9);
		}

		@Override
		Setup createNext() {
			return new RightAnglePrismSetup();
		}
	}

	class RightAnglePrismSetup extends Setup {
		@Override
		String getName() {
			return "Right-Angle Prism";
		}

		@Override
		void select() {
			if (resBar.getValue() < 42)
				setResolution(42);
			sourceChooser.select(SRC_1S1F_PLANE);
			int i, j;
			int cx = gridSizeX / 2;
			int cy = gridSizeY / 2;
			int x0 = windowWidth / 4;
			int y0 = x0;
			for (i = -x0; i < x0; i++)
				for (j = -y0; j <= i; j++)
					setMedium(cx + i, cy + j, mediumMax);
			for (i = 0; i != windowWidth; i++)
				if (medium[windowOffsetX + i + gw * (cy - y0)] == 0)
					setWall(windowOffsetX + i, cy - y0);
			setFreqBar(11);
		}

		@Override
		Setup createNext() {
			return new PorroPrismSetup();
		}
	}

	class PorroPrismSetup extends Setup {
		@Override
		String getName() {
			return "Porro Prism";
		}

		@Override
		void select() {
			if (resBar.getValue() < 42)
				setResolution(42);
			sourceChooser.select(SRC_1S1F_PLANE);
			setSources();
			int i, j;
			int cx = gridSizeX / 2;
			sources[1].x = cx - 1;
			int x0 = windowWidth / 2;
			int y0 = x0;
			int cy = gridSizeY / 2 - y0 / 2;
			for (i = -x0; i < x0; i++) {
				int j2 = y0 + 1 - ((i < 0) ? -i : i);
				for (j = 0; j <= j2; j++)
					setMedium(cx + i, cy + j, mediumMax);
			}
			for (i = 0; i != cy; i++)
				if (medium[cx + gw * (i + windowOffsetY)] == 0)
					setWall(cx, i + windowOffsetY);
			setFreqBar(11);
		}

		@Override
		void doSetupSources() {
		}

		@Override
		Setup createNext() {
			return new ScatteringSetup();
		}
	}

	class ScatteringSetup extends Setup {
		@Override
		String getName() {
			return "Scattering";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_1S1F_PLANE_PULSE);
			int cx = gridSizeX / 2;
			int cy = gridSizeY / 2;
			setWall(cx, cy);
			setFreqBar(1);
			dampingBar.setValue(40);
			setBrightness(52);
		}

		@Override
		Setup createNext() {
			return new LloydsMirrorSetup();
		}
	}

	class LloydsMirrorSetup extends Setup {
		@Override
		String getName() {
			return "Lloyd's Mirror";
		}

		@Override
		void select() {
			setSources();
			sources[0].x = windowOffsetX;
			sources[0].y = windowOffsetY + windowHeight * 3 / 4;
			setBrightness(75);
			setFreqBar(23);
			int i;
			for (i = 0; i != windowWidth; i++)
				setWall(i + windowOffsetX, windowOffsetY + windowHeight - 1);
		}

		@Override
		void doSetupSources() {
		}

		@Override
		Setup createNext() {
			return new TempGradient1();
		}
	}

	class TempGradient1 extends Setup {
		@Override
		String getName() {
			return "Temperature Gradient 1";
		}

		@Override
		void select() {
			int i, j;
			int j1 = windowOffsetY + windowHeight / 2;
			int j2 = windowOffsetY + windowHeight * 3 / 4;
			int j3 = windowOffsetY + windowHeight * 7 / 8;
			for (j = 0; j != gridSizeY; j++) {
				int m;
				if (j < j1)
					m = 0;
				else if (j > j2)
					m = mediumMax;
				else
					m = mediumMax * (j - j1) / (j2 - j1);
				for (i = 0; i != gridSizeX; i++)
					setMedium(i, j, m);
			}
			for (i = j3; i < windowOffsetY + windowHeight; i++)
				setWall(gridSizeX / 2, i);
			setBrightness(33);
		}

		@Override
		void doSetupSources() {
			setSources();
			sources[0].x = windowOffsetX + 2;
			sources[0].y = windowOffsetY + windowHeight - 2;
		}

		@Override
		Setup createNext() {
			return new TempGradient2();
		}
	}

	class TempGradient2 extends Setup {
		@Override
		String getName() {
			return "Temperature Gradient 2";
		}

		@Override
		void select() {
			int i, j;
			int j1 = windowOffsetY + windowHeight / 2 - windowHeight / 8;
			int j2 = windowOffsetY + windowHeight / 2 + windowHeight / 8;
			for (j = 0; j != gridSizeY; j++) {
				int m;
				if (j < j1)
					m = mediumMax;
				else if (j > j2)
					m = 0;
				else
					m = mediumMax * (j2 - j) / (j2 - j1);
				for (i = 0; i != gridSizeX; i++)
					setMedium(i, j, m);
			}
			setBrightness(31);
		}

		@Override
		void doSetupSources() {
			setSources();
			sources[0].x = windowOffsetX + 2;
			sources[0].y = windowOffsetY + windowHeight / 4;
		}

		@Override
		Setup createNext() {
			return new TempGradient3();
		}
	}

	class TempGradient3 extends Setup {
		@Override
		String getName() {
			return "Temperature Gradient 3";
		}

		@Override
		void select() {
			int i, j;
			int j1 = windowOffsetY + windowHeight / 2 - windowHeight / 5;
			int j2 = windowOffsetY + windowHeight / 2 + windowHeight / 5;
			int j3 = gridSizeY / 2;
			for (j = 0; j != gridSizeY; j++) {
				int m;
				if (j < j1 || j > j2)
					m = mediumMax;
				else if (j > j3)
					m = mediumMax * (j - j3) / (j2 - j3);
				else
					m = mediumMax * (j3 - j) / (j3 - j1);
				for (i = 0; i != gridSizeX; i++)
					setMedium(i, j, m);
			}
			setBrightness(31);
		}

		@Override
		void doSetupSources() {
			setSources();
			sources[0].x = windowOffsetX + 2;
			sources[0].y = windowOffsetY + windowHeight / 4;
		}

		@Override
		Setup createNext() {
			return new TempGradient4();
		}
	}

	class TempGradient4 extends TempGradient3 {
		@Override
		String getName() {
			return "Temperature Gradient 4";
		}

		@Override
		void select() {
			int i, j;
			int j1 = windowOffsetY + windowHeight / 2 - windowHeight / 5;
			int j2 = windowOffsetY + windowHeight / 2 + windowHeight / 5;
			int j3 = gridSizeY / 2;
			for (j = 0; j != gridSizeY; j++) {
				int m;
				if (j < j1 || j > j2)
					m = 0;
				else if (j > j3)
					m = mediumMax * (j2 - j) / (j2 - j3);
				else
					m = mediumMax * (j - j1) / (j3 - j1);
				for (i = 0; i != gridSizeX; i++)
					setMedium(i, j, m);
			}
			setBrightness(31);
		}

		@Override
		Setup createNext() {
			return new DispersionSetup();
		}
	}

	class DispersionSetup extends Setup {
		@Override
		String getName() {
			return "Dispersion";
		}

		@Override
		void select() {
			sourceChooser.select(SRC_2S2F);
			int i, j;
			for (i = 0; i != gridSizeY; i++)
				setWall(gridSizeX / 2, i);
			for (i = 0; i != gridSizeX; i++)
				for (j = 0; j != gridSizeY; j++)
					setMedium(i, j, mediumMax / 3);
			fixedEndsCheck.setState(false);
			setBrightness(16);
		}

		@Override
		void doSetupSources() {
			setSources();
			sources[0].x = gridSizeX / 2 - 2;
			sources[1].x = gridSizeX / 2 + 2;
			sources[0].y = sources[1].y = windowOffsetY + 1;
			setFreqBar(7);
			auxBar.setValue(30);
		}

		@Override
		Setup createNext() {
			return null;
		}
	}

}



