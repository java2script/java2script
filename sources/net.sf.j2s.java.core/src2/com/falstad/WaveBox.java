package com.falstad;

// WaveBox.java (c) 2001 by Paul Falstad, www.falstad.com.

//web_Ready
//web_AppletName= WaveBox
//web_Description= 
//web_JavaVersion= http://www.falstad.com/wavebox/
//web_AppletImage= wavebox.png
//web_Category= Physics - Waves
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics, AWT-to-Swing


// Rendering algorithm in this applet is based on the description of
// the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
// We raytrace through a 3-d dataset, sampling a number of points and
// integrating over them using Simpson's rule.

//Conversion to JavaScript by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//Changes:
//
//	import javax.swing.applet.Applet --> a2s
//	
//	import java.awt [Applet, Canvas, Checkbox, Choice, Frame, Label, Scrollbar] --> a2s
//
// Replaced deprecated functions (move, show, hide, insets, size, resize) --> (setLocation, setVisible(true), setVisible(false), getInsets, getSize, setSize)
//
//
//ShowFrame() moved to WavedBox.init()

import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Event;
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
import java.awt.image.MemoryImageSource;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Random;
import java.util.Vector;

import java.applet.Applet;

import java.awt.Canvas;
import java.awt.Checkbox;
import java.awt.Choice;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Scrollbar;

// NM -- switched to singjs.awt classes
// BH -- changed canvas paint(g) to paintComponent(g)
// BH -- added initialization checks for dbimage == null and winSize.height <= 0

class WaveBoxCanvas extends Canvas {
	WaveBoxFrame pg;

	WaveBoxCanvas(WaveBoxFrame p) {
		pg = p;
	}

	@Override
	public Dimension getPreferredSize() {
		return new Dimension(300, 400);
	}

	@Override
	public void update(Graphics g) {
		pg.updateWaveBox(g);
	}

	@Override
	public void paint(Graphics g) {
		pg.updateWaveBox(g);
	}
}

class WaveBoxLayout implements LayoutManager {
	public WaveBoxLayout() {
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
		Insets insets = target.getInsets();
		int targetw = target.getSize().width - insets.left - insets.right;
		int cw = targetw - barwidth;
		int targeth = target.getSize().height - (insets.top + insets.bottom);
		target.getComponent(0).setLocation(insets.left, insets.top);
		target.getComponent(0).setSize(cw, targeth);
		cw += insets.left;
		int h = insets.top;
		for (i = 1; i < target.getComponentCount(); i++) {

			Component m = target.getComponent(i);
			if (m.isVisible()) {
				Dimension d = m.getPreferredSize();
				if (d.width >= 0 && d.height >= 0) {
					if (m instanceof Scrollbar)
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
}

public class WaveBox extends Applet implements ComponentListener {
	static WaveBoxFrame ogf;

	void destroyFrame() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}

	boolean started = false;

	@Override
	public void init() {
		// addComponentListener(this);
		showFrame();
	}

	public static void main(String args[]) {
		/**
		 * @.j2sNative
		 * 
		 *             debugger;
		 * 
		 */
		{
		}
		ogf = new WaveBoxFrame(null);
		ogf.initFrame();
	}

	void showFrame() {
		if (ogf == null) {
			started = true;
			ogf = new WaveBoxFrame(this);
			ogf.initFrame();
			repaint();
		}
	}

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
	}

	@Override
	public void destroy() {
		if (ogf != null)
			ogf.dispose();
		ogf = null;
		repaint();
	}
}

class WaveBoxFrame extends Frame implements ComponentListener, ActionListener,
		AdjustmentListener, MouseMotionListener, MouseListener, ItemListener {

	Thread engine = null;

	Dimension winSize;
	Image dbimage, memimage;
	MemoryImageSource imageSource;

	Random random;
	int gridSizeX = 200;
	int gridSizeY = 200;

	public String getAppletInfo() {
		return "WaveBox by Paul Falstad";
	}

	Boolean finished;
	public boolean useFrame;
	boolean showControls;
	boolean adjustResolution = true;
	Checkbox stoppedCheck;
	Checkbox intensityCheck;
	Checkbox sidesCheck;
	Choice modeChooser;
	Choice sliceChooser;
	static final int SLICE_NONE = 0;
	static final int SLICE_X = 1;
	static final int SLICE_Y = 2;
	static final int SLICE_Z = 3;
	Scrollbar speedBar;
	Scrollbar resolutionBar;
	Scrollbar brightnessBar;
	Scrollbar freqBar;
	Scrollbar aux1Bar;
	Scrollbar aux2Bar;
	Scrollbar aux3Bar;
	Scrollbar sampleBar;

	class AuxBar {
		Scrollbar bar;
		Label label;

		AuxBar(Label l, Scrollbar b) {
			label = l;
			bar = b;
		}
	}

	AuxBar auxBars[];
	Choice setupChooser;
	Vector setupList;
	Setup setup;
	double dragZoomStart;
	double zoom = 7.5;
	double rotmatrix[];
	Rectangle view3d;
	double colorMult;
	static final double pi = 3.14159265358979323846;
	static final double pi2 = pi * 2;
	int xpoints[];
	int ypoints[];
	int spectrum[];
	static final int spectrumSpacing = 50;
	double func[][][];
	double boxwidth = 2;
	double boxheight = 2;
	double resadj;
	boolean dragging = false;
	int pixels[];
	int maxTerms = 16;
	static int maxModes = 10;
	static int maxDispCoefs = 8;
	static int viewDistance = 12;
	int pause;
	int selection = -1;
	static final int SEL_NONE = 0;
	static final int SEL_3D = 1;
	static final int SEL_MAG = 2;
	static final int SEL_SPECTRUM = 3;
	static final int MODE_ANGLE = 0;
	static final int MODE_ZOOM = 1;
	static final int MODE_SLICE = 2;
	int slicerPoints[][];
	double sliceFaces[][];
	double sliceFace[];
	int sliceFaceCount;
	double sliceval = 0;
	int sampleCount = 15;
	int sampleMult[];
	boolean selectedSlice;
	boolean needsPrecompute;
	double magDragStart;
	double cost1, cost2, sint1, sint2;
	int dragX, dragY, oldDragX, oldDragY, dragStartX, dragStartY;
	double t = 0;
	public static final double epsilon = .00001;
	public static final double epsilon2 = .003;

	int getrand(int x) {
		int q = random.nextInt();
		if (q < 0)
			q = -q;
		return q % x;
	}

	WaveBoxCanvas cv;
	WaveBox applet;

	WaveBoxFrame(WaveBox a) {
		super("3D Wave Applet v1.5a");
		applet = a;
		useFrame = true;
		showControls = true;
	}

	boolean useBufferedImage = false;

	Container main;

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
		if (useFrame) {
			main = this;
		} else
			main = applet;
		setupList = new Vector();
		Setup s = new SingleSourceSetup();
		while (s != null) {
			setupList.addElement(s);
			s = s.createNext();
		}

		String jv = System.getProperty("java.class.version");
		double jvf = new Double(jv).doubleValue();
		if (jvf >= 48)
			useBufferedImage = true;

		main.setLayout(new WaveBoxLayout());
		cv = new WaveBoxCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		if (showControls)
			main.add(cv);

		if (showControls)
			main.add(new Label("Setup:", Label.CENTER));
		setupChooser = new Choice();
		int i;
		for (i = 0; i != setupList.size(); i++)
			setupChooser.add(((Setup) setupList.elementAt(i)).getName());
		if (showControls)
			main.add(setupChooser);
		setupChooser.addItemListener(this);
		setup = (Setup) setupList.elementAt(2);
		setupChooser.select(2);

		stoppedCheck = new Checkbox("Stopped");
		stoppedCheck.addItemListener(this);
		if (showControls)
			main.add(stoppedCheck);

		intensityCheck = new Checkbox("Show Intensity");
		intensityCheck.addItemListener(this);
		if (showControls)
			main.add(intensityCheck);

		sidesCheck = new Checkbox("Show Sides");
		sidesCheck.addItemListener(this);
		if (showControls)
			main.add(sidesCheck);

		modeChooser = new Choice();
		modeChooser.add("Mouse = Adjust Angle");
		modeChooser.add("Mouse = Adjust Zoom");
		modeChooser.addItemListener(this);
		if (showControls)
			main.add(modeChooser);

		sliceChooser = new Choice();
		sliceChooser.add("No Slicing");
		sliceChooser.add("Show X Slice");
		sliceChooser.add("Show Y Slice");
		sliceChooser.add("Show Z Slice");
		sliceChooser.addItemListener(this);
		if (showControls)
			main.add(sliceChooser);

		if (showControls) {
			main.add(new Label("Simulation Speed", Label.CENTER));
			main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 15, 1, 1, 200));
		}
		speedBar.addAdjustmentListener(this);

		if (showControls) {
			main.add(new Label("Brightness", Label.CENTER));
			main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 240, 1, 1,
					2000));
		}
		brightnessBar.addAdjustmentListener(this);

		if (showControls) {
			main.add(new Label("Image Resolution", Label.CENTER));
			main.add(resolutionBar = new Scrollbar(Scrollbar.HORIZONTAL, 100, 2, 20,
					240));
		}
		resolutionBar.addAdjustmentListener(this);

		if (showControls) {
			main.add(new Label("Frequency", Label.CENTER));
			main.add(freqBar = new Scrollbar(Scrollbar.HORIZONTAL, 24, 1, 5, 60));
		}
		freqBar.addAdjustmentListener(this);

		Label lb;
		auxBars = new AuxBar[3];
		lb = new Label("Aux 1", Label.CENTER);
		if (showControls) {
			main.add(lb);
			main.add(aux1Bar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 100));
		}
		aux1Bar.addAdjustmentListener(this);
		auxBars[0] = new AuxBar(lb, aux1Bar);

		lb = new Label("Aux 2", Label.CENTER);

		if (showControls) {
			main.add(lb);
			main.add(aux2Bar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, 100));
		}
		aux2Bar.addAdjustmentListener(this);
		auxBars[1] = new AuxBar(lb, aux2Bar);

		if (showControls) {
			main.add(lb = new Label("Aux 3", Label.CENTER));
			main.add(aux3Bar = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, 100));
		}
		aux3Bar.addAdjustmentListener(this);
		auxBars[2] = new AuxBar(lb, aux3Bar);

		hideBars();

		/*
		 * add(new Label("Samples", Label.CENTER)); add(sampleBar = new
		 * Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 0, 20));
		 * sampleBar.addAdjustmentListener(this);
		 */

		main.add(new Label("http://www.falstad.com", Label.CENTER));

		/*
		 * try { String param = applet.getParameter("PAUSE"); if (param != null)
		 * pause = Integer.parseInt(param); } catch (Exception e) { }
		 */

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
		} catch (Exception e) {
			if (applet != null)
				e.printStackTrace();
		}

		slicerPoints = new int[2][5 * 2];
		sliceFaces = new double[4][3];

		rotmatrix = new double[9];
		rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
		xpoints = new int[4];
		ypoints = new int[4];

		setupSimpson();
		setup.select();

		random = new Random();
		reinit();
		cv.setBackground(Color.black);
		cv.setForeground(Color.white);

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
		}
		main.requestFocus();
	}

	void setupSimpson() {
		sampleCount = 23; // 15
		/*
		 * sampleCount = sampleBar.getValue()*2+1; System.out.println("samples = " +
		 * sampleCount);
		 */

		// generate table of sample multipliers for efficient Simpson's rule
		sampleMult = new int[sampleCount];
		int i;
		for (i = 1; i < sampleCount; i += 2) {
			sampleMult[i] = 4;
			sampleMult[i + 1] = 2;
		}
		sampleMult[0] = sampleMult[sampleCount - 1] = 1;
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
		setMaxTerms();
		Dimension d = winSize = cv.getSize();
		if (winSize.width == 0 || winSize.height <= 0)
			return;
		dbimage = createImage(d.width, d.height);
		setupDisplay();
		pixels = null;
		if (useBufferedImage) {
			try {
				/*
				 * simulate the following code using reflection: dbimage = new
				 * BufferedImage(d.width, d.height, BufferedImage.TYPE_INT_RGB);
				 * DataBuffer db = (DataBuffer)(((BufferedImage)memimage).
				 * getRaster().getDataBuffer()); DataBufferInt dbi = (DataBufferInt) db;
				 * pixels = dbi.getData();
				 */
				Class biclass = Class.forName("java.awt.image.BufferedImage");
				Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
				Class rasclass = Class.forName("java.awt.image.Raster");
				Constructor cstr = biclass.getConstructor(new Class[] { int.class,
						int.class, int.class });
				memimage = (Image) cstr.newInstance(new Object[] {
						new Integer(view3d.width), new Integer(view3d.height),
						new Integer(1) }); // BufferedImage.TYPE_INT_RGB)});
				Method m = biclass.getMethod("getRaster", null);
				Object ras = m.invoke(memimage, null);
				Object db = rasclass.getMethod("getDataBuffer", null).invoke(ras, null);
				pixels = (int[]) dbiclass.getMethod("getData", null).invoke(db, null);
			} catch (Exception ee) {
				// ee.printStackTrace();
				System.out.println("BufferedImage failed");
			}
		}
		if (pixels == null) {
			pixels = new int[view3d.width * view3d.height];
			int i;
			for (i = 0; i != view3d.width * view3d.height; i++)
				pixels[i] = 0xFF000000;
			imageSource = new MemoryImageSource(view3d.width, view3d.height, pixels,
					0, view3d.width);
			imageSource.setAnimated(true);
			imageSource.setFullBufferUpdates(true);
			memimage = cv.createImage(imageSource);
		}
	}

	int getTermWidth() {
		return 8;
	}

	// multiply rotation matrix by rotations through angle1 and angle2
	void rotate(double angle1, double angle2) {
		double r1cos = Math.cos(angle1);
		double r1sin = Math.sin(angle1);
		double r2cos = Math.cos(angle2);
		double r2sin = Math.sin(angle2);
		double rotm2[] = new double[9];

		// angle1 is angle about y axis, angle2 is angle about x axis
		rotm2[0] = r1cos;
		rotm2[1] = -r1sin * r2sin;
		rotm2[2] = r2cos * r1sin;

		rotm2[3] = 0;
		rotm2[4] = r2cos;
		rotm2[5] = r2sin;

		rotm2[6] = -r1sin;
		rotm2[7] = -r1cos * r2sin;
		rotm2[8] = r1cos * r2cos;

		double rotm1[] = rotmatrix;
		rotmatrix = new double[9];

		int i, j, k;
		for (j = 0; j != 3; j++)
			for (i = 0; i != 3; i++) {
				double v = 0;
				for (k = 0; k != 3; k++)
					v += rotm1[k + j * 3] * rotm2[i + k * 3];
				rotmatrix[i + j * 3] = v;
			}
	}

	double max(double a, double b) {
		return a > b ? a : b;
	}

	double min(double a, double b) {
		return a < b ? a : b;
	}

	void setMaxTerms() {
		gridSizeX = gridSizeY = (resolutionBar.getValue() & ~1);
		maxTerms = gridSizeX;
		/*
		 * if (maxTerms > 100) maxTerms = 100;
		 */
		resadj = 50. / maxTerms;
		needsPrecompute = true;
	}

	void setupBar(int n, String text, int val) {
		auxBars[n].label.setText(text);
		auxBars[n].label.setVisible(true);
		auxBars[n].bar.setValue(val);
		auxBars[n].bar.setVisible(true);
	}

	// set view rectangles for the various subwindows
	void setupDisplay() {
		view3d = new Rectangle(0, 0, winSize.width, winSize.height);
	}

	// compute func[][][] array (2-d view) by raytracing through a
	// 3-d dataset (data[][][])
	void computeFunction() {
		int i, j;
		double q = 3.14159265 / maxTerms;
		cost1 = Math.cos(t);
		sint1 = Math.sin(t);
		cost2 = Math.cos(t + setup.getPhaseShift());
		sint2 = Math.sin(t + setup.getPhaseShift());
		double shiftcos = Math.cos(setup.getPhaseShift());
		double shiftsin = Math.sin(setup.getPhaseShift());
		double izoom = 1 / zoom;
		double rotm[] = rotmatrix;
		double boxhalfwidth = boxwidth / 2;
		double boxhalfheight = boxheight / 2;
		double aratio = view3d.width / (double) view3d.height;
		double xmult = maxTerms / boxwidth;
		double ymult = maxTerms / boxheight;
		double zmult = maxTerms / 2.;
		boolean intensity = intensityCheck.getState();
		double aratiox = izoom, aratioy = izoom;
		// preserve aspect ratio no matter what window dimensions
		if (aratio < 1)
			aratioy /= aratio;
		else
			aratiox *= aratio;
		int slice = sliceChooser.getSelectedIndex();
		if (sidesCheck.getState())
			slice = SLICE_NONE;
		double bmult = (intensity) ? 20 : 1;
		for (i = 0; i != gridSizeX; i++)
			for (j = 0; j != gridSizeY; j++) {
				// calculate camera direction
				double camvx0 = (2 * i / (double) gridSizeX - 1) * aratiox;
				double camvy0 = (2 * j / (double) gridSizeY - 1) * aratioy;
				// rotate camera with rotation matrix
				double camx = rotm[2] * viewDistance;
				double camy = rotm[5] * viewDistance;
				double camz = rotm[8] * viewDistance;
				double camvx = rotm[0] * camvx0 + rotm[1] * camvy0 - rotm[2];
				double camvy = rotm[3] * camvx0 + rotm[4] * camvy0 - rotm[5];
				double camvz = rotm[6] * camvx0 + rotm[7] * camvy0 - rotm[8];
				double camnorm = Math.sqrt(camvx0 * camvx0 + camvy0 * camvy0 + 1);
				int n;
				double simpr = 0;
				double simpg = 0;
				// calculate intersections with planes containing box edges
				double tx1 = (-boxhalfwidth - camx) / camvx;
				double tx2 = (boxhalfwidth - camx) / camvx;
				double ty1 = (-boxhalfheight - camy) / camvy;
				double ty2 = (boxhalfheight - camy) / camvy;
				double tz1 = (-1 - camz) / camvz;
				double tz2 = (1 - camz) / camvz;
				// calculate portion of line that intersects box
				double mint = max(min(tx1, tx2), max(min(ty1, ty2), min(tz1, tz2))) + .001;
				double maxt = min(max(tx1, tx2), min(max(ty1, ty2), max(tz1, tz2))) - .001;
				if (maxt < mint) {
					// doesn't hit box
					fillSquare(i, j, 0, 0, 0);
					continue;
				}
				if (slice != SLICE_NONE) {
					double t = -100;
					switch (slice) {
					case SLICE_X:
						t = (sliceval - camx) / camvx;
						break;
					case SLICE_Y:
						t = (sliceval - camy) / camvy;
						break;
					case SLICE_Z:
						t = (sliceval - camz) / camvz;
						break;
					}

					if (t < mint || t > maxt) {
						fillSquare(i, j, 0, 0, 0);
						continue;
					}
					mint = maxt = t;
				}
				// sample evenly along intersecting portion
				double tstep = (maxt - mint) / (sampleCount - 1);
				double pathlen = (maxt - mint) * camnorm;
				int maxn = sampleCount;
				if (sidesCheck.getState()) {
					maxn = 1;
					pathlen = 5;
				} else if (slice != SLICE_NONE) {
					maxn = 1;
					pathlen = 2;
				}
				double xx = (camx + camvx * mint + boxhalfwidth) * xmult;
				double yy = (camy + camvy * mint + boxhalfheight) * ymult;
				double zz = (camz + camvz * mint + 1) * zmult;
				camvx *= tstep * xmult;
				camvy *= tstep * ymult;
				camvz *= tstep * zmult;
				for (n = 0; n < maxn; n++) {
					// find grid element that contains sampled point
					int xxi = Double.isNaN(xx) ? 0 : (int) xx;
					int yyi = Double.isNaN(yy) ? 0 : (int) yy;
					int zzi = Double.isNaN(zz) ? 0 : (int) zz;
					double f = 0;
					if (intensity) {
						// this is pretty inefficient but the speed
						// requirements are much less for intensity
						cost1 = 1;
						sint1 = 0;
						cost2 = shiftcos;
						sint2 = shiftsin;
						double a = setup.computePoint(xxi, yyi, zzi);
						cost1 = 0;
						sint1 = 1;
						cost2 = -shiftsin;
						sint2 = shiftcos;
						double b = setup.computePoint(xxi, yyi, zzi);
						f = a * a + b * b;
					} else
						f = setup.computePoint(xxi, yyi, zzi);
					if (f < 0) {
						simpr -= sampleMult[n] * f;
					} else
						simpg += sampleMult[n] * f;
					xx += camvx;
					yy += camvy;
					zz += camvz;
				}
				simpr *= pathlen / n;
				simpg *= pathlen / n;
				fillSquare(i, j, simpr * bmult, simpg * bmult, 0);
			}
	}

	int sign(double x) {
		return x < 0 ? -1 : 1;
	}


	long lastTime;

	public void updateWaveBox(Graphics realg) {
		if (dbimage == null)
			return;
		Graphics g = null;
		if (winSize == null || winSize.width == 0)
			return;
		g = dbimage.getGraphics();
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());

		boolean allQuiet = false;
		if (!stoppedCheck.getState()) {
			long sysTime = System.currentTimeMillis();
			double tadd = 0;
			if (lastTime != 0) {
				int val = speedBar.getValue();
				tadd = val * (sysTime - lastTime) * .0003;
				t += tadd;
			}
			lastTime = sysTime;
		} else {
			lastTime = 0;
			allQuiet = true;
		}
		if (intensityCheck.getState())
			allQuiet = true;

		colorMult = brightnessBar.getValue() * 5;
		if (needsPrecompute) {
			setup.precompute();
			needsPrecompute = false;
		}
		computeFunction();
		int i, j, k;

		boolean sliced = sliceChooser.getSelectedIndex() != SLICE_NONE;

		if (imageSource != null)
			imageSource.newPixels();
		g.drawImage(memimage, view3d.x, view3d.y, null);

		g.setColor(Color.white);
		drawCube(g, false);
		realg.drawImage(dbimage, 0, 0, this);
		if (!allQuiet)
			cv.repaint(pause);
	}

	// see if the face containing (nx, ny, nz) is visible.
	boolean visibleFace(int nx, int ny, int nz) {
		double viewx = viewDistance * rotmatrix[2];
		double viewy = viewDistance * rotmatrix[5];
		double viewz = viewDistance * rotmatrix[8];
		return (nx - viewx) * nx + (ny - viewy) * ny + (nz - viewz) * nz < 0;
	}

	void fillSquare(int i, int j, double cr, double cg, double cb) {
		int winw = view3d.width;
		int winh = view3d.height;
		int x = i * winw / gridSizeX;
		int y = j * winh / gridSizeY;
		int x2 = (i + 1) * winw / gridSizeX;
		int y2 = (j + 1) * winh / gridSizeY;
		cr *= colorMult;
		cg *= colorMult;
		cb *= colorMult;
		int k, l;
		if (cr == 0 && cg == 0 && cb == 0) {
			int y2l = y2 * view3d.width;
			for (k = x; k < x2; k++)
				for (l = y * view3d.width; l < y2l; l += view3d.width)
					pixels[k + l] = 0xFF000000;
			return;
		}
		double fm = max(cr, max(cg, cb));
		if (fm > 255) {
			fm /= 255;
			cr /= fm;
			cg /= fm;
			cb /= fm;
		}
		int colval = 0xFF000000 + (((int) cr) << 16) | (((int) cg) << 8)
				| (((int) cb));
		int y2l = y2 * view3d.width;
		for (k = x; k < x2; k++)
			for (l = y * view3d.width; l < y2l; l += view3d.width)
				pixels[k + l] = colval;
	}

	// draw the cube containing the particles. if drawAll is false then
	// we just draw faces that are facing the camera. This routine draws
	// each edge twice which is unnecessary, but easier.
	void drawCube(Graphics g, boolean drawAll) {
		int i;
		int slice = sliceChooser.getSelectedIndex();
		int sp = 0;
		for (i = 0; i != 6; i++) {
			// calculate normal of ith face
			int nx = (i == 0) ? -1 : (i == 1) ? 1 : 0;
			int ny = (i == 2) ? -1 : (i == 3) ? 1 : 0;
			int nz = (i == 4) ? -1 : (i == 5) ? 1 : 0;
			// if face is not facing camera, don't draw it
			if (!drawAll && !visibleFace(nx, ny, nz))
				continue;
			double pts[];
			pts = new double[3];
			int n;
			for (n = 0; n != 4; n++) {
				computeFace(i, n, pts);
				map3d(pts[0], pts[1], pts[2], xpoints, ypoints, n);
			}
			g.setColor(Color.gray);
			g.drawPolygon(xpoints, ypoints, 4);
			if (slice != SLICE_NONE && i / 2 != slice - SLICE_X) {
				if (selectedSlice)
					g.setColor(Color.yellow);
				int coord1 = (slice == SLICE_X) ? 1 : 0;
				int coord2 = (slice == SLICE_Z) ? 1 : 2;
				computeFace(i, 0, pts);
				pts[slice - SLICE_X] = sliceval;
				map3d(pts[0], pts[1], pts[2], slicerPoints[0], slicerPoints[1], sp);
				computeFace(i, 2, pts);
				pts[slice - SLICE_X] = sliceval;
				map3d(pts[0], pts[1], pts[2], slicerPoints[0], slicerPoints[1], sp + 1);
				g.drawLine(slicerPoints[0][sp], slicerPoints[1][sp],
						slicerPoints[0][sp + 1], slicerPoints[1][sp + 1]);
				sliceFaces[sp / 2][0] = nx;
				sliceFaces[sp / 2][1] = ny;
				sliceFaces[sp / 2][2] = nz;
				sp += 2;
			}
		}
		sliceFaceCount = sp;
	}

	// generate the nth vertex of the bth cube face
	void computeFace(int b, int n, double pts[]) {
		// One of the 3 coordinates (determined by a) is constant.
		// When b=0, x=-1; b=1, x=+1; b=2, y=-1; b=3, y=+1; etc
		int a = b >> 1;
		pts[a] = ((b & 1) == 0) ? -1 : 1;

		// fill in the other 2 coordinates with one of the following
		// (depending on n): -1,-1; +1,-1; +1,+1; -1,+1
		int i;
		for (i = 0; i != 3; i++) {
			if (i == a)
				continue;
			pts[i] = (((n >> 1) ^ (n & 1)) == 0) ? -1 : 1;
			n >>= 1;
		}
	}

	// map 3-d point (x,y,z) to screen, storing coordinates
	// in xpoints[pt],ypoints[pt]
	void map3d(double x, double y, double z, int xpoints[], int ypoints[], int pt) {
		x *= boxwidth / 2;
		y *= boxheight / 2;
		double rotm[] = rotmatrix;
		double realx = x * rotm[0] + y * rotm[3] + z * rotm[6];
		double realy = x * rotm[1] + y * rotm[4] + z * rotm[7];
		double realz = viewDistance - (x * rotm[2] + y * rotm[5] + z * rotm[8]);
		double scalex = view3d.width * zoom / 2;
		double scaley = view3d.height * zoom / 2;
		double aratio = view3d.width / (double) view3d.height;
		// preserve aspect ratio regardless of window dimensions
		if (aratio < 1)
			scaley *= aratio;
		else
			scalex /= aratio;
		xpoints[pt] = view3d.width / 2 + (int) (scalex * realx / realz);
		ypoints[pt] = view3d.height / 2 + (int) (scaley * realy / realz);
	}

	// map point on screen to 3-d coordinates assuming it lies on a given plane
	void unmap3d(double x3[], int x, int y, double pn[], double pp[]) {
		// first, find all points which map to (x,y) on the screen.
		// this is a line.
		double scalex = view3d.width * zoom / 2;
		double scaley = view3d.height * zoom / 2;

		double aratio = view3d.width / (double) view3d.height;
		// preserve aspect ratio regardless of window dimensions
		if (aratio < 1)
			scaley *= aratio;
		else
			scalex /= aratio;

		double vx = (x - (view3d.width / 2)) / scalex;
		double vy = (y - (view3d.height / 2)) / scaley;
		// vz = -1

		// map the line vector to object space
		double rotm[] = rotmatrix;
		double mx = viewDistance * rotm[2];
		double my = viewDistance * rotm[5];
		double mz = viewDistance * rotm[8];
		double mvx = (vx * rotm[0] + vy * rotm[1] - rotm[2]);
		double mvy = (vx * rotm[3] + vy * rotm[4] - rotm[5]);
		double mvz = (vx * rotm[6] + vy * rotm[7] - rotm[8]);

		// calculate the intersection between the line and the given plane
		double t = ((pp[0] - mx) * pn[0] + (pp[1] - my) * pn[1] + (pp[2] - mz)
				* pn[2])
				/ (pn[0] * mvx + pn[1] * mvy + pn[2] * mvz);

		x3[0] = mx + mvx * t;
		x3[1] = my + mvy * t;
		x3[2] = mz + mvz * t;
	}

	double logep2 = 0;

	int logcoef(double x) {
		double ep2 = epsilon2;
		int sign = (x < 0) ? -1 : 1;
		x *= sign;
		if (x < ep2)
			return 0;
		if (logep2 == 0)
			logep2 = -Math.log(2 * ep2);
		return (int) (255 * sign * (Math.log(x + ep2) + logep2) / logep2);
	}

	int getColorValue(int i, int j, int k) {
		int val = (int) (func[i][j][k] * colorMult);
		if (val > 255)
			val = 255;
		return val;
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
		cv.repaint(pause);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
	}

	int resBarValue;

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		System.out.print(((Scrollbar) e.getSource()).getValue() + "\n");
		if (e.getSource() == freqBar || e.getSource() == aux1Bar
				|| e.getSource() == aux2Bar || e.getSource() == aux3Bar)
			needsPrecompute = true;
		if (e.getSource() == resolutionBar
				&& resolutionBar.getValue() != resBarValue) {
			setMaxTerms();
			resBarValue = resolutionBar.getValue();
		}
		setupSimpson();
		cv.repaint(pause);
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		dragging = true;
		oldDragX = dragX;
		oldDragY = dragY;
		dragX = e.getX();
		dragY = e.getY();
		edit(e);
	}

	boolean csInRange(int x, int xa, int xb) {
		if (xa < xb)
			return x >= xa - 5 && x <= xb + 5;
		return x >= xb - 5 && x <= xa + 5;
	}

	void checkSlice(int x, int y) {
		if (sliceChooser.getSelectedIndex() == SLICE_NONE) {
			selectedSlice = false;
			return;
		}
		int n;
		selectedSlice = false;
		for (n = 0; n != sliceFaceCount; n += 2) {
			int xa = slicerPoints[0][n];
			int xb = slicerPoints[0][n + 1];
			int ya = slicerPoints[1][n];
			int yb = slicerPoints[1][n + 1];
			if (!csInRange(x, xa, xb) || !csInRange(y, ya, yb))
				continue;

			double d;
			if (xa == xb)
				d = Math.abs(x - xa);
			else {
				// write line as y=a+bx
				double b = (yb - ya) / (double) (xb - xa);
				double a = ya - b * xa;

				// solve for distance
				double d1 = y - (a + b * x);
				if (d1 < 0)
					d1 = -d1;
				d = d1 / Math.sqrt(1 + b * b);
			}
			if (d < 6) {
				selectedSlice = true;
				sliceFace = sliceFaces[n / 2];
				break;
			}
		}
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		checkSlice(e.getX(), e.getY());
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0) {
			if (selection != -1) {
				dragging = true;
			}
			return;
		}
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
		oldDragX = dragStartX = e.getX();
		oldDragY = dragStartY = e.getY();
		dragZoomStart = zoom;
		dragging = true;
		edit(e);
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		if (dragging)
			cv.repaint();
		dragging = false;
	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		if (e.getItemSelectable() == setupChooser) {
			if (sliceChooser == null)
				return;
			sliceChooser.select(0);
			setup.deselect();
			setup = (Setup) setupList.elementAt(setupChooser.getSelectedIndex());
			hideBars();
			setup.select();
			setup.precompute();
			validate();
		}
		cv.repaint(pause);
	}

	void hideBars() {
		int i;
		for (i = 0; i != 3; i++) {
			auxBars[i].label.setVisible(false);
			auxBars[i].bar.setVisible(false);
		}
	}

	@Override
	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			applet.destroyFrame();
			return true;
		}
		return super.handleEvent(ev);
	}

	void edit(MouseEvent e) {
		if (selection == SEL_NONE)
			return;
		int x = e.getX();
		int y = e.getY();
		edit3d(x, y);
	}

	void edit3d(int x, int y) {
		int mode = modeChooser.getSelectedIndex();
		if (selectedSlice)
			mode = MODE_SLICE;
		if (mode == MODE_ANGLE) {
			int xo = oldDragX - x;
			int yo = oldDragY - y;
			rotate(xo / 40., yo / 40.);
			cv.repaint(pause);
		} else if (mode == MODE_ZOOM) {
			int xo = x - dragStartX;
			zoom = dragZoomStart + xo / 20.;
			if (zoom < .1)
				zoom = .1;
			cv.repaint(pause);
		} else if (mode == MODE_SLICE) {
			double x3[] = new double[3];
			unmap3d(x3, x, y, sliceFace, sliceFace);
			switch (sliceChooser.getSelectedIndex()) {
			case SLICE_X:
				sliceval = x3[0];
				break;
			case SLICE_Y:
				sliceval = x3[1];
				break;
			case SLICE_Z:
				sliceval = x3[2];
				break;
			}
			// Avoid -1 because it causes particles to drift out of the
			// cube too easily. Avoid +1 because of that and because it is
			// not included in any density group.
			if (sliceval < -.99)
				sliceval = -.99;
			if (sliceval > .99)
				sliceval = .99;
			cv.repaint(pause);
		}
	}

	abstract class Setup {
		abstract String getName();

		void select() {
		}

		void precompute() {
		}

		void deselect() {
		}

		double getPhaseShift() {
			return 0;
		}

		abstract double computePoint(int x, int y, int z);

		abstract Setup createNext();

		Setup() {
		}
	}

	class SingleSourceSetup extends Setup {
		int dataxy[][];
		double datadzr[][], datadzi[][];
		int mxhalf;
		int mxlast;

		@Override
		String getName() {
			return "point source";
		}

		@Override
		void select() {
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			int maxdist = 0;
			double mult = freqBar.getValue() / 50.;
			dataxy = new int[maxTerms][maxTerms];
			int distmult = 4;
			for (x = 0; x != maxTerms; x++)
				for (y = 0; y != maxTerms; y++) {
					double xi = x - mxhalf;
					int yi = y - mxhalf;
					dataxy[x][y] = (int) (distmult * Math.sqrt(xi * xi + yi * yi) + .5);
					if (dataxy[x][y] > maxdist)
						maxdist = dataxy[x][y];
				}
			datadzr = new double[maxdist + 1][maxTerms];
			datadzi = new double[maxdist + 1][maxTerms];
			for (x = 0; x != maxTerms; x++)
				for (y = 0; y <= maxdist; y++) {
					int xi = x - mxhalf;
					double r = Math.sqrt(y * y / (distmult * distmult) + xi * xi)
							* resadj + .00000001;
					datadzr[y][x] = Math.cos(r * mult) / r;
					datadzi[y][x] = -Math.sin(r * mult) / r;
				}
		}

		@Override
		void deselect() {
			dataxy = null;
			datadzr = datadzi = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int d = dataxy[x][y];
			return datadzr[d][z] * cost1 - datadzi[d][z] * sint1;
		}

		@Override
		Setup createNext() {
			return new PinholeSetup();
		}
	}

	class PinholeSetup extends Setup {
		int dataxy[][];
		double datadzr[][], datadzi[][];
		int mxhalf;
		int mxlast;

		@Override
		String getName() {
			return "pinhole";
		}

		@Override
		void select() {
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			int maxdist = 0;
			double mult = freqBar.getValue() / 50.;
			dataxy = new int[maxTerms][maxTerms];
			int distmult = 4;
			for (x = 0; x != maxTerms; x++)
				for (y = 0; y != maxTerms; y++) {
					double xi = x - mxhalf;
					int yi = y - mxhalf;
					dataxy[x][y] = (int) (distmult * Math.sqrt(xi * xi + yi * yi) + .5);
					if (dataxy[x][y] > maxdist)
						maxdist = dataxy[x][y];
				}
			datadzr = new double[maxdist + 1][maxTerms];
			datadzi = new double[maxdist + 1][maxTerms];
			for (x = 0; x != maxTerms; x++)
				for (y = 0; y <= maxdist; y++) {
					double r = Math.sqrt(y * y / (distmult * distmult) + x * x) * resadj
							+ .00000001;
					datadzr[y][x] = Math.cos(r * mult) / r;
					datadzi[y][x] = -Math.sin(r * mult) / r;
				}
		}

		@Override
		void deselect() {
			dataxy = null;
			datadzr = datadzi = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int d = dataxy[x][y];
			return datadzr[d][z] * cost1 - datadzi[d][z] * sint1;
		}

		@Override
		Setup createNext() {
			return new TwoSourcesSetup();
		}
	}

	class TwoSourcesSetup extends Setup {
		int dataxy[][];
		double datadzr[][], datadzi[][], w1mult, w2mult;
		int mxhalf;
		int mxlast;
		boolean dipole;

		@Override
		String getName() {
			return "2 point sources";
		}

		@Override
		void select() {
			setupBar(0, "Source Separation", 30);
			setupBar(1, "Phase Difference", 0);
			setupBar(2, "Balance", 50);
			dipole = false;
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			dataxy = new int[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			int distmult = 4;
			double sep = aux1Bar.getValue() / 3. / resadj;
			int maxdist = 0;
			for (x = 0; x != maxTerms; x++) {
				double xi = x - mxhalf + sep + .001;
				for (y = 0; y != maxTerms; y++) {
					double yi = y - mxhalf + .001;
					dataxy[x][y] = (int) (distmult * Math.sqrt(xi * xi + yi * yi) + .5);
					if (dataxy[x][y] > maxdist)
						maxdist = dataxy[x][y];
				}
			}
			datadzr = new double[maxdist + 1][maxTerms];
			datadzi = new double[maxdist + 1][maxTerms];
			for (z = 0; z != maxTerms; z++)
				for (y = 0; y <= maxdist; y++) {
					int zi = z - mxhalf;
					double r = Math.sqrt(y * y / (distmult * distmult) + zi * zi)
							* resadj + .0000001;
					datadzr[y][z] = Math.cos(r * mult) / r;
					datadzi[y][z] = -Math.sin(r * mult) / r;
				}
			w1mult = (dipole) ? .5 : aux3Bar.getValue() / 100.;
			w2mult = 1 - w1mult;
		}

		@Override
		double getPhaseShift() {
			return (dipole) ? pi : aux2Bar.getValue() * pi / 50.;
		}

		@Override
		void deselect() {
			dataxy = null;
			datadzr = datadzi = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int d1 = dataxy[x][y];
			int d2 = dataxy[maxTerms - 1 - x][y];
			return w1mult * (datadzr[d1][z] * cost1 - datadzi[d1][z] * sint1)
					+ w2mult * (datadzr[d2][z] * cost2 - datadzi[d2][z] * sint2);
		}

		@Override
		Setup createNext() {
			return new DipoleSourceSetup();
		}
	}

	class DipoleSourceSetup extends TwoSourcesSetup {
		@Override
		String getName() {
			return "dipole source";
		}

		@Override
		void select() {
			setupBar(0, "Source Separation", 8);
			dipole = true;
		}

		@Override
		Setup createNext() {
			return new LateralQuadrupoleSetup();
		}
	}

	class LateralQuadrupoleSetup extends Setup {
		int dataxy[][];
		double datadzr[][], datadzi[][], w1mult;
		int mxhalf;
		int mxlast;

		@Override
		String getName() {
			return "lateral quadrupole";
		}

		@Override
		void select() {
			setupBar(0, "Source Separation", 20);
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			dataxy = new int[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			int distmult = 4;
			double sep = aux1Bar.getValue() / 3. / resadj;
			int maxdist = 0;
			for (x = 0; x != maxTerms; x++) {
				double xi = x - mxhalf + sep + .001;
				for (y = 0; y != maxTerms; y++) {
					double yi = y - mxhalf + .001;
					dataxy[x][y] = (int) (distmult * Math.sqrt(xi * xi + yi * yi) + .5);
					if (dataxy[x][y] > maxdist)
						maxdist = dataxy[x][y];
				}
			}
			datadzr = new double[maxdist + 1][maxTerms];
			datadzi = new double[maxdist + 1][maxTerms];
			for (z = 0; z != maxTerms; z++)
				for (y = 0; y <= maxdist; y++) {
					int zi = z - mxhalf;
					double r = Math.sqrt(y * y / (distmult * distmult) + zi * zi)
							* resadj + .0000001;
					datadzr[y][z] = .25 * Math.cos(r * mult) / r;
					datadzi[y][z] = -.25 * Math.sin(r * mult) / r;
				}
		}

		@Override
		void deselect() {
			dataxy = null;
			datadzr = datadzi = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int d1 = dataxy[x][y];
			int d2 = dataxy[maxTerms - 1 - x][y];
			int d3 = dataxy[y][x];
			int d4 = dataxy[maxTerms - 1 - y][x];
			return (datadzr[d1][z] + datadzr[d2][z] - datadzr[d3][z] - datadzr[d4][z])
					* cost1
					- (datadzi[d1][z] + datadzi[d2][z] - datadzi[d3][z] - datadzi[d4][z])
					* sint1;
		}

		@Override
		Setup createNext() {
			return new LinearQuadrupoleSetup();
		}
	}

	class LinearQuadrupoleSetup extends Setup {
		int dataxy1[][], dataxy2[][];
		double datadzr[][], datadzi[][];
		int mxhalf;
		int mxlast;

		@Override
		String getName() {
			return "linear quadrupole";
		}

		@Override
		void select() {
			setupBar(0, "Source Separation", 20);
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			double mult = freqBar.getValue() / 50.;
			dataxy1 = new int[maxTerms][maxTerms];
			dataxy2 = new int[maxTerms][maxTerms];
			int distmult = 4;
			double sep = aux1Bar.getValue() / 3. / resadj;
			int maxdist = 0;
			for (x = 0; x != maxTerms; x++) {
				double xi1 = x - mxhalf + sep + .001;
				double xi2 = x - mxhalf + sep / 2 + .001;
				for (y = 0; y != maxTerms; y++) {
					double yi = y - mxhalf + .001;
					dataxy1[x][y] = (int) (distmult * Math.sqrt(xi1 * xi1 + yi * yi) + .5);
					dataxy2[x][y] = (int) (distmult * Math.sqrt(xi2 * xi2 + yi * yi) + .5);
					if (dataxy1[x][y] > maxdist)
						maxdist = dataxy1[x][y];
					if (dataxy2[x][y] > maxdist)
						maxdist = dataxy2[x][y];
				}
			}
			datadzr = new double[maxdist + 1][maxTerms];
			datadzi = new double[maxdist + 1][maxTerms];
			for (z = 0; z != maxTerms; z++)
				for (y = 0; y <= maxdist; y++) {
					int zi = z - mxhalf;
					double r = Math.sqrt(y * y / (distmult * distmult) + zi * zi)
							* resadj + .0000001;
					datadzr[y][z] = .25 * Math.cos(r * mult) / r;
					datadzi[y][z] = -.25 * Math.sin(r * mult) / r;
				}
		}

		@Override
		void deselect() {
			dataxy1 = dataxy2 = null;
			datadzr = datadzi = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int d1 = dataxy1[x][y];
			int d2 = dataxy2[x][y];
			int d3 = dataxy1[maxTerms - 1 - x][y];
			int d4 = dataxy2[maxTerms - 1 - x][y];
			return (datadzr[d1][z] - datadzr[d2][z] + datadzr[d3][z] - datadzr[d4][z])
					* cost1
					- (datadzi[d1][z] - datadzi[d2][z] + datadzi[d3][z] - datadzi[d4][z])
					* sint1;
		}

		@Override
		Setup createNext() {
			return new TwoPinholesSetup();
		}
	}

	class TwoPinholesSetup extends Setup {
		int dataxy[][];
		double datadzr[][], datadzi[][], w1mult, w2mult;
		int mxhalf;
		int mxlast;

		@Override
		String getName() {
			return "2 pinholes";
		}

		@Override
		void select() {
			setupBar(0, "Source Separation", 30);
			setupBar(1, "Phase Difference", 0);
			setupBar(2, "Balance", 50);
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			dataxy = new int[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			int distmult = 4;
			double sep = aux1Bar.getValue() / 3. / resadj;
			int maxdist = 0;
			for (x = 0; x != maxTerms; x++) {
				double xi = x - mxhalf + sep + .001;
				for (y = 0; y != maxTerms; y++) {
					dataxy[x][y] = (int) (distmult * Math.sqrt(xi * xi + y * y) + .5);
					if (dataxy[x][y] > maxdist)
						maxdist = dataxy[x][y];
				}
			}
			datadzr = new double[maxdist + 1][maxTerms];
			datadzi = new double[maxdist + 1][maxTerms];
			for (z = 0; z != maxTerms; z++)
				for (y = 0; y <= maxdist; y++) {
					int zi = z - mxhalf;
					double r = Math.sqrt(y * y / (distmult * distmult) + zi * zi)
							* resadj + .0000001;
					datadzr[y][z] = Math.cos(r * mult) / r;
					datadzi[y][z] = -Math.sin(r * mult) / r;
				}
			w1mult = aux3Bar.getValue() / 100.;
			w2mult = 1 - w1mult;
		}

		@Override
		double getPhaseShift() {
			return aux2Bar.getValue() * pi / 50.;
		}

		@Override
		void deselect() {
			dataxy = null;
			datadzr = datadzi = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int d1 = dataxy[x][y];
			int d2 = dataxy[maxTerms - 1 - x][y];
			return w1mult * (datadzr[d1][z] * cost1 - datadzi[d1][z] * sint1)
					+ w2mult * (datadzr[d2][z] * cost2 - datadzi[d2][z] * sint2);
		}

		@Override
		Setup createNext() {
			return new SingleLineSetup();
		}
	}

	class SingleLineSetup extends Setup {
		double datar[][];
		double datai[][];
		int mxhalf;

		@Override
		String getName() {
			return "single line source";
		}

		@Override
		void select() {
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			datar = new double[maxTerms][maxTerms];
			datai = new double[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			for (x = 0; x != maxTerms; x++) {
				double xi = x - mxhalf + .001;
				for (y = 0; y != maxTerms; y++) {
					double yi = y - mxhalf + .001;
					double r = Math.sqrt(xi * xi + yi * yi) * resadj;
					datar[x][y] = .25 * bessj0(r * mult);
					datai[x][y] = -.25 * bessy0(r * mult);
				}
			}
		}

		@Override
		void deselect() {
			datar = datai = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			return datar[x][y] * cost1 - datai[x][y] * sint1;
		}

		@Override
		Setup createNext() {
			return new SingleSlitSetup();
		}
	}

	class SingleSlitSetup extends Setup {
		double datar[][];
		double datai[][];
		int mxhalf;

		@Override
		String getName() {
			return "single slit";
		}

		@Override
		void select() {
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			datar = new double[maxTerms][maxTerms];
			datai = new double[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			for (x = 0; x != maxTerms; x++) {
				double xi = x - mxhalf + .001;
				for (y = 0; y != maxTerms; y++) {
					double r = Math.sqrt(xi * xi + y * y) * resadj;
					datar[x][y] = .25 * bessj0(r * mult);
					datai[x][y] = -.25 * bessy0(r * mult);
				}
			}
		}

		@Override
		void deselect() {
			datar = datai = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			return datar[x][y] * cost1 - datai[x][y] * sint1;
		}

		@Override
		Setup createNext() {
			return new DoubleLineSetup();
		}
	}

	class DoubleLineSetup extends Setup {
		double datar[][];
		double datai[][];
		int mxhalf;
		int mxlast;
		double w1mult, w2mult;

		@Override
		String getName() {
			return "2 line sources";
		}

		@Override
		void select() {
			setupBar(0, "Source Separation", 30);
			setupBar(1, "Phase Difference", 0);
			setupBar(2, "Balance", 50);
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			mxlast = maxTerms - 1;
			datar = new double[maxTerms][maxTerms];
			datai = new double[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			double sep = aux1Bar.getValue() / 3. / resadj;
			w1mult = aux3Bar.getValue() / 100.;
			w2mult = 1 - w1mult;
			w1mult *= .25;
			w2mult *= .25;
			for (x = 0; x != maxTerms; x++) {
				double xi = x - mxhalf - sep + .001;
				for (y = 0; y != maxTerms; y++) {
					double yi = y - mxhalf + .001;
					double r = Math.sqrt(xi * xi + yi * yi) * resadj;
					datar[x][y] = bessj0(r * mult);
					datai[x][y] = -bessy0(r * mult);
				}
			}
		}

		@Override
		double getPhaseShift() {
			return aux2Bar.getValue() * pi / 50.;
		}

		@Override
		void deselect() {
			datar = datai = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int nx = mxlast - x;
			return w1mult * (datar[x][y] * cost1 - datai[x][y] * sint1) + w2mult
					* (datar[nx][y] * cost2 - datai[nx][y] * sint2);
		}

		@Override
		Setup createNext() {
			return new DoubleSlitSetup();
		}
	}

	class DoubleSlitSetup extends Setup {
		double datar[][];
		double datai[][];
		int mxhalf;
		int mxlast;
		double w1mult, w2mult;

		@Override
		String getName() {
			return "double slit";
		}

		@Override
		void select() {
			setupBar(0, "Slit Separation", 30);
			setupBar(1, "Phase Difference", 0);
			setupBar(2, "Balance", 50);
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			mxlast = maxTerms - 1;
			datar = new double[maxTerms][maxTerms];
			datai = new double[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			double sep = aux1Bar.getValue() / 3. / resadj;
			w1mult = aux3Bar.getValue() / 100.;
			w2mult = 1 - w1mult;
			w1mult *= .25;
			w2mult *= .25;
			for (x = 0; x != maxTerms; x++) {
				double xi = x - mxhalf - sep + .001;
				for (y = 0; y != maxTerms; y++) {
					double r = Math.sqrt(xi * xi + y * y) * resadj;
					datar[x][y] = bessj0(r * mult);
					datai[x][y] = -bessy0(r * mult);
				}
			}
		}

		@Override
		double getPhaseShift() {
			return aux2Bar.getValue() * pi / 50.;
		}

		@Override
		void deselect() {
			datar = datai = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			int nx = mxlast - x;
			return w1mult * (datar[x][y] * cost1 - datai[x][y] * sint1) + w2mult
					* (datar[nx][y] * cost2 - datai[nx][y] * sint2);
		}

		@Override
		Setup createNext() {
			return new TripleSlitSetup();
		}
	}
	
	class TripleSlitSetup extends Setup {
		double datar[][];
		double datai[][];
		int mxhalf;

		@Override
		String getName() {
			return "triple slit";
		}

		@Override
		void select() {
			setupBar(0, "Slit Separation", 30);
		}

		@Override
		void precompute() {
			int x, y, z;
			mxhalf = maxTerms / 2;
			datar = new double[maxTerms][maxTerms];
			datai = new double[maxTerms][maxTerms];
			double mult = freqBar.getValue() / 50.;
			double sep = aux1Bar.getValue() / 3. / resadj;
			double m = .25 / 3;
			for (x = 0; x != maxTerms; x++) {
				double xi1 = x - mxhalf - sep + .001;
				double xi2 = x - mxhalf + sep + .001;
				double xi3 = x - mxhalf + .001;
				for (y = 0; y != maxTerms; y++) {
					double r1 = Math.sqrt(xi1 * xi1 + y * y) * resadj;
					double r2 = Math.sqrt(xi2 * xi2 + y * y) * resadj;
					double r3 = Math.sqrt(xi3 * xi3 + y * y) * resadj;
					datar[x][y] = m
							* (bessj0(r1 * mult) + bessj0(r2 * mult) + bessj0(r3 * mult));
					datai[x][y] = -m
							* (bessy0(r1 * mult) + bessy0(r2 * mult) + bessy0(r3 * mult));
				}
			}
		}

		@Override
		void deselect() {
			datar = datai = null;
		}

		@Override
		double computePoint(int x, int y, int z) {
			return datar[x][y] * cost1 - datai[x][y] * sint1;
		}

		@Override
		Setup createNext() {
			return new PlaneWaveSetup();
		}
	}

	class PlaneWaveSetup extends Setup {
		@Override
		String getName() {
			return "plane wave";
		}

		@Override
		void select() {
		}

		double mult;

		@Override
		void precompute() {
			int x, y, z;
			mult = resadj * freqBar.getValue() / 50.;
		}

		@Override
		void deselect() {
		}

		@Override
		double computePoint(int x, int y, int z) {
			return .05 * (Math.cos(x * mult) * cost1 + Math.sin(x * mult) * sint1);
		}

		@Override
		Setup createNext() {
			return new TwoPlaneWavesSetup();
		}
	}

	class TwoPlaneWavesSetup extends Setup {
		double datar[][][];
		double datai[][][];
		boolean noz;

		@Override
		String getName() {
			return "2 plane waves";
		}

		@Override
		void select() {
			setupBar(0, "Source 1 Theta", 25);
			setupBar(1, "Source 1 Phi", 0);
			setupBar(2, "Balance", 50);
		}

		double k2x, k2y, k2z, mult, w1mult, w2mult;

		@Override
		void precompute() {
			mult = resadj * freqBar.getValue() / 50.;
			double ang1 = aux1Bar.getValue() * pi / 50;
			double ang2 = aux2Bar.getValue() * pi / 50;
			w1mult = aux3Bar.getValue() / 100.;
			w2mult = 1 - w1mult;
			w1mult *= .05;
			w2mult *= .05;
			double ang1cos = Math.cos(ang1);
			double ang1sin = Math.sin(ang1);
			double ang2cos = Math.cos(ang2);
			double ang2sin = Math.sin(ang2);
			k2x = ang2cos * ang1cos * mult;
			k2y = -ang2cos * ang1sin * mult;
			k2z = -ang2sin * mult;
		}

		@Override
		double computePoint(int x, int y, int z) {
			double k1 = x * mult;
			double k2 = x * k2x + y * k2y + z * k2z;
			return w1mult * (Math.cos(k1) * cost1 + Math.sin(k1) * sint1) + w2mult
					* (Math.cos(k2) * cost2 + Math.sin(k2) * sint2);
		}

		@Override
		Setup createNext() {
			return null;
		}
	};

	double bessj0(double x) {
		double ax = x, z;
		double xx, y, ans, ans1, ans2;

		if (x < 8.0) {
			y = x * x;
			ans1 = 57568490574.0
					+ y
					* (-13362590354.0 + y
							* (651619640.7 + y
									* (-11214424.18 + y * (77392.33017 + y * (-184.9052456)))));
			ans2 = 57568490411.0
					+ y
					* (1029532985.0 + y
							* (9494680.718 + y * (59272.64853 + y * (267.8532712 + y * 1.0))));
			ans = ans1 / ans2;
		} else {
			z = 8.0 / ax;
			y = z * z;
			xx = ax - 0.785398164;
			ans1 = 1.0
					+ y
					* (-0.1098628627e-2 + y
							* (0.2734510407e-4 + y * (-0.2073370639e-5 + y * 0.2093887211e-6)));
			ans2 = -0.1562499995e-1
					+ y
					* (0.1430488765e-3 + y
							* (-0.6911147651e-5 + y * (0.7621095161e-6 - y * 0.934935152e-7)));
			ans = Math.sqrt(0.636619772 / ax)
					* (Math.cos(xx) * ans1 - z * Math.sin(xx) * ans2);
		}
		return ans;
	}

	double bessy0(double x) {
		double z;
		double xx, y, ans, ans1, ans2;

		if (x < 8.0) {
			y = x * x;
			ans1 = -2957821389.0
					+ y
					* (7062834065.0 + y
							* (-512359803.6 + y
									* (10879881.29 + y * (-86327.92757 + y * 228.4622733))));
			ans2 = 40076544269.0
					+ y
					* (745249964.8 + y
							* (7189466.438 + y * (47447.26470 + y * (226.1030244 + y * 1.0))));
			ans = (ans1 / ans2) + 0.636619772 * bessj0(x) * Math.log(x);
		} else {
			z = 8.0 / x;
			y = z * z;
			xx = x - 0.785398164;
			ans1 = 1.0
					+ y
					* (-0.1098628627e-2 + y
							* (0.2734510407e-4 + y * (-0.2073370639e-5 + y * 0.2093887211e-6)));
			ans2 = -0.1562499995e-1
					+ y
					* (0.1430488765e-3 + y
							* (-0.6911147651e-5 + y
									* (0.7621095161e-6 + y * (-0.934945152e-7))));
			ans = Math.sqrt(0.636619772 / x)
					* (Math.sin(xx) * ans1 + z * Math.cos(xx) * ans2);
		}
		return ans;
	}

}
