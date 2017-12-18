package com.falstad;

//ModeBox.java (c) 2001 by Paul Falstad, www.falstad.com.
//Rendering algorithm in this applet is based on the description of
//the algorithm used in Atom in a Box by Dean Dauger (www.dauger.com).
//We raytrace through a 3-d dataset, sampling a number of points and
//integrating over them using Simpson's rule.

//web_Ready
//web_AppletName= ModeBox
//web_Description= A simulation of standing sound waves in a 3-d rectangular box.
//web_JavaVersion= http://www.falstad.com/modebox/
//web_AppletImage= modebox.png
//web_Category= Physics - Waves
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= audio, graphics, AWT-to-Swing

//Conversion to JavaScriipt by Bob Hanson, Nadia El Mouldi, and Andreas Raduege (St. Olaf College) 
//
//Changes include:
//
//  import javax.swing.applet.Applet --> a2s
//
//	import java.awt.[Button, Canvas, Checkbox, Choice, Frame, Label, Scrollbar, TextArea] --> a2s
//
//	deprecated method .move --> .setLocation
//
//	ModeCanvas.paint and ModeBoxFrame.paint --> ModeBoxFrame.paintComponent
//
//	

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
import java.awt.image.MemoryImageSource;
import java.util.Random;

import a2s.Applet;

import a2s.Button;
import a2s.Canvas;
import a2s.Checkbox;
import a2s.Choice;
import a2s.Frame;
import a2s.Label;
import a2s.Scrollbar;

// needs annotation defining all changes implemented for JavaScript

// "dbimage == null" issue solved with added if(dbimage == null) return in updateModeBox

class ModeBoxCanvas extends Canvas {
	ModeBoxFrame pg;

	ModeBoxCanvas(ModeBoxFrame p) {
		pg = p;
	}

	@Override
	public Dimension getPreferredSize() {
		return new Dimension(300, 400);
	}

	@Override
	public void update(Graphics g) {
		pg.updateModeBox(g);
	}

	@Override
	public void paintComponent(Graphics g)  {
		pg.updateModeBox(g);
	}
}

class ModeBoxLayout implements LayoutManager {
	public ModeBoxLayout() {
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
		Insets insets = target.insets();
		int targetw = target.size().width - insets.left - insets.right;
		int cw = targetw - barwidth;
		int targeth = target.size().height - (insets.top + insets.bottom);
		target.getComponent(0).setLocation(insets.left, insets.top);
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
					h += d.height / 5;
					d.width = barwidth;
				}
				m.setLocation(cw, h);
				m.resize(d.width, d.height);
				h += d.height;
			}
		}
	}
}

public class ModeBox extends Applet {
	static ModeBoxFrame oc;

	void destroyFrame() {
		if (oc != null)
			oc.dispose();
		oc = null;
	}

	public static void main(String args[]) {
		oc = new ModeBoxFrame(null);
		oc.init();
	}

	@Override
	public void init() {
		oc = new ModeBoxFrame(this);
		oc.init();
		repaint();
	}

	@Override
	public void destroy() {
		if (oc != null)
			oc.dispose();
		oc = null;
	}

	boolean started;
	
	@Override
	public void paint(Graphics g) {
		super.paint(g);
		String s = "Applet is open in a separate window.";
		if (!started)
			s = "Applet is starting.";
		else if (oc == null)
			s = "Applet is finished.";
		else if (oc.useFrame)
			oc.triggerShow();
		started = true;
		if(oc == null || oc.useFrame)
			g.drawString(s, 10, 30);
	}

}

class ModeBoxFrame extends Frame implements ComponentListener, ActionListener,
		AdjustmentListener, MouseMotionListener, MouseListener, ItemListener {

	Thread engine = null;

	Dimension winSize;
	Image dbimage;

	Random random;
	int gridSizeX = 200;
	int gridSizeY = 200;

	public String getAppletInfo() {
		return "ModeBox by Paul Falstad";
	}

	boolean useFrame = true;
	Button clearButton;
	Checkbox stoppedCheck;
	Checkbox spectrumCheck;
	Choice modeChooser;
	Scrollbar speedBar;
	Scrollbar resolutionBar;
	Scrollbar brightnessBar;
	Scrollbar widthBar;
	Scrollbar heightBar;
	double dragZoomStart;
	double zoom = 6.5;
	double rotmatrix[];
	double selectedMinOmega;
	double selectedMaxOmega;
	Rectangle view3d;
	Rectangle viewSpectrum;
	Rectangle viewFreq[];
	double colorMult;
	static final double pi = 3.14159265358979323846;
	static final double pi2 = pi * 2;
	int xpoints[];
	int ypoints[];
	int spectrum[];
	static final int spectrumSpacing = 50;
	double func[][][];
	double data[][][];
	double boxwidth = 2;
	double boxheight = 2;
	boolean dragging = false;
	MemoryImageSource imageSource;
	int pixels[];
	int maxTerms = 16;
	static int maxModes = 10;
	static int maxDispCoefs = 8;
	static int viewDistance = 12;
	Mode modes[];
	int modeCount = 0;
	int pause;
	ModeBox applet;
	int selection = -1;
	static final int SEL_NONE = 0;
	static final int SEL_3D = 1;
	static final int SEL_MAG = 2;
	static final int SEL_SPECTRUM = 3;
	static final int MODE_ANGLE = 0;
	static final int MODE_ZOOM = 1;
	int selectedCoefX = -1;
	int selectedCoefY;
	int selectedCoefZ;
	static final int sampleCount = 15;
	int sampleMult[];
	double magDragStart;
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

	ModeBoxCanvas cv;

	ModeBoxFrame(ModeBox a) {
		super("Box Modes Applet");
		applet = a;
	}

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

		
		String os = System.getProperty("os.name");
		String jv = System.getProperty("java.version");
		boolean altRender = true;
		int res = 32;
		// change settings to speed things up where possible
		if (os.indexOf("Windows") == 0) {
			res = 48;
			if (jv.indexOf("1.1") == 0)
				altRender = true;
		}
		res = 120;

		main.setLayout(new ModeBoxLayout());
		cv = new ModeBoxCanvas(this);
		cv.addComponentListener(this);
		cv.addMouseMotionListener(this);
		cv.addMouseListener(this);
		main.add(cv);

		main.add(clearButton = new Button("Clear"));
		clearButton.addActionListener(this);

		stoppedCheck = new Checkbox("Stopped");
		stoppedCheck.addItemListener(this);
		main.add(stoppedCheck);

		spectrumCheck = new Checkbox("Show Spectrum");
		spectrumCheck.addItemListener(this);
		main.add(spectrumCheck);

		modeChooser = new Choice();
		modeChooser.add("Mouse = Adjust Angle");
		modeChooser.add("Mouse = Adjust Zoom");
		modeChooser.addItemListener(this);
		main.add(modeChooser);

		main.add(new Label("Simulation Speed", Label.CENTER));
		main.add(speedBar = new Scrollbar(Scrollbar.HORIZONTAL, 40, 1, 1, 200));
		speedBar.addAdjustmentListener(this);

		main.add(new Label("Brightness", Label.CENTER));
		main.add(brightnessBar = new Scrollbar(Scrollbar.HORIZONTAL, 28, 1, 1, 200));
		brightnessBar.addAdjustmentListener(this);

		main.add(new Label("Image Resolution", Label.CENTER));
		main.add(resolutionBar = new Scrollbar(Scrollbar.HORIZONTAL, res, 2, 20, 300));
		resolutionBar.addAdjustmentListener(this);

		main.add(new Label("Width", Label.CENTER));
		main.add(widthBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 31));
		widthBar.addAdjustmentListener(this);

		main.add(new Label("Height", Label.CENTER));
		main.add(heightBar = new Scrollbar(Scrollbar.HORIZONTAL, 10, 1, 5, 31));
		heightBar.addAdjustmentListener(this);

		main.add(new Label("http://www.falstad.com", Label.CENTER));

		try {
			String param = applet.getParameter("PAUSE");
			if (param != null)
				pause = Integer.parseInt(param);
		} catch (Exception e) {
		}

		modes = new Mode[maxModes];
		addMode(1, 0, 0).magcoef = 1;

		rotmatrix = new double[9];
		rotmatrix[0] = rotmatrix[4] = rotmatrix[8] = 1;
		xpoints = new int[2];
		ypoints = new int[2];

		// generate table of sample multipliers for efficient Simpson's rule
		int i;
		sampleMult = new int[sampleCount];
		for (i = 1; i < sampleCount; i += 2) {
			sampleMult[i] = 4;
			sampleMult[i + 1] = 2;
		}
		sampleMult[0] = sampleMult[sampleCount - 1] = 1;

		random = new Random();
		reinit();
		cv.setBackground(Color.black);
		cv.setForeground(Color.white);
		//resize(800, 700);
		//handleResize();
		//show();
		
		if (useFrame) {
			resize(800, 640);
			handleResize();
			Dimension x = getSize();
			Dimension screen = getToolkit().getScreenSize();
			setLocation((screen.width - x.width) / 2,
					(screen.height - x.height) / 2);
			show();
		} else {
			hide();
			handleResize();
			applet.validate();
		}
		requestFocus();
	}

	void handleResize() {
		reinit();
		// XXX
	}

	boolean shown = false;

	private long lastTime;

	public void triggerShow() {
		if (!shown)
			setVisible(true);
		shown = true;
	}

	void reinit() {
		setMaxTerms();
		Dimension d = winSize = cv.getSize();
		if (d.width == 0 || d.height == 0)
			return;
		calcSpectrum();
		dbimage = cv.createImage(d.width, d.height);
		setupDisplay();
		pixels = new int[view3d.width * view3d.height];
		int i;
		for (i = 0; i != view3d.width * view3d.height; i++)
			pixels[i] = 0xFF000000;
		imageSource = new MemoryImageSource(view3d.width, view3d.height, pixels, 0,
				view3d.width);
	}

	int getTermWidth() {
		return 8;
	}

	// multiply rotation matrix by rotations through angle1 and angle2
	void rotate(double angle1, double angle2) {
		double r1cos = java.lang.Math.cos(angle1);
		double r1sin = java.lang.Math.sin(angle1);
		double r2cos = java.lang.Math.cos(angle2);
		double r2sin = java.lang.Math.sin(angle2);
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
		if (maxTerms > 100)
			maxTerms = 100;
		data = new double[maxTerms][maxTerms][maxTerms];
		func = new double[gridSizeX][gridSizeY][2];
	}

	// set view rectangles for the various subwindows
	void setupDisplay() {
		int perColumn = 2;
		int perRow = 4;
		int freqHeight = getTermWidth() * (maxDispCoefs + 1) * perColumn;
		int spectrumHeight = (spectrumCheck.getState()) ? getTermWidth() * 6 : 0;
		view3d = new Rectangle(0, 0, winSize.width, winSize.height - freqHeight
				- spectrumHeight);
		if (spectrumCheck.getState())
			viewSpectrum = new Rectangle(0, view3d.height, winSize.width,
					spectrumHeight);
		else
			viewSpectrum = null;
		viewFreq = new Rectangle[maxDispCoefs];
		int i;
		int winw = getTermWidth() * maxDispCoefs;
		int winh = winw;
		int pad = getTermWidth();
		int x = (winSize.width - (winw * 4 + pad * 3)) / 2;
		for (i = 0; i != maxDispCoefs; i++)
			viewFreq[i] = new Rectangle(x + (i % perRow) * (winw + pad),
					view3d.height + spectrumHeight + (i / perRow) * (winh + pad), winw,
					winh);
	}

	// compute func[][][] array (2-d view) by raytracing through a
	// 3-d dataset (data[][][])
	void computeFunction() {
		int i, j;
		genData(false);
		double q = 3.14159265 / maxTerms;
		double cost = java.lang.Math.cos(t);
		double izoom = 1 / zoom;
		double rotm[] = rotmatrix;
		double boxhalfwidth = boxwidth / 2;
		double boxhalfheight = boxheight / 2;
		double aratio = view3d.width / (double) view3d.height;
		double camx0 = 0;
		double camz0 = viewDistance;
		double camx = rotm[0] * camx0 + rotm[2] * camz0;
		double camy = rotm[5] * camz0;
		double camz = rotm[6] * camx0 + rotm[8] * camz0;
		double camvz0 = -1;
		double r2 = rotm[2] * camvz0;
		double r5 = rotm[5] * camvz0;
		double r8 = rotm[8] * camvz0;
		for (i = 0; i != gridSizeX; i++) {
			double camvx0 = (2. * i / gridSizeX - 1) * izoom;
			if (aratio > 1)
				camvx0 *= aratio;
			double r35 = rotm[3] * camvx0 + r5;
			double r02 = rotm[0] * camvx0 + r2;
			double r68 = rotm[6] * camvx0 + r8;
			double[][] fi = func[i];
			for (j = 0; j != gridSizeY; j++) {
				double[] fij = fi[j];
				// calculate camera position and direction				
				double camvy0 = (2 * j / (double) gridSizeY - 1) * izoom;
				// preserve aspect ratio no matter what window dimensions
				if (aratio < 1)
					camvy0 /= aratio;
				// rotate camera with rotation matrix
				double camvx = rotm[1] * camvy0 + r02;
				double camvy = rotm[4] * camvy0 + r35;
				double camvz = rotm[7] * camvy0 + r68;
				double camnorm = java.lang.Math.sqrt(camvx * camvx + camvy * camvy
						+ camvz * camvz);
				// number of simpson's rule samples = 14
				int nmax = 14;
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
					func[i][j][0] = func[i][j][1] = 0;
					continue;
				}
				// sample evenly along intersecting portion
				double tstep = (maxt - mint) / (sampleCount - 1);
				double pathlen = (maxt - mint) * camnorm;
				double m = pathlen / sampleCount;
				double xmult = maxTerms / boxwidth;
				double ymult = maxTerms / boxheight;
				double zmult = maxTerms / 2.;
				double xx = camx + camvx * mint;
				double yy = camy + camvy * mint;
				double zz = camz + camvz * mint;
				double dx = camvx * tstep;
				double dy = camvy * tstep;
				double dz = camvz * tstep;
				double simpr = 0;
				double simpg = 0;
				for (int n = 0; n < sampleCount; n++, xx += dx, yy += dy, zz += dz) {
					// find grid element that contains sampled point
					int xxi = (int) ((xx + boxhalfwidth) * xmult);
					int yyi = (int) ((yy + boxhalfheight) * ymult);
					int zzi = (int) ((zz + 1) * zmult);
					double f = data[xxi][yyi][zzi];
					if (f < 0) {
						simpr += sampleMult[n] * -f;
					} else
						simpg += sampleMult[n] * f;
				}
				fij[0] = simpr * m;
				fij[1] = simpg * m;
			}
		}
	}

	int sign(double x) {
		return x < 0 ? -1 : 1;
	}

//	public void paintComponent(Graphics g) {
//		cv.repaint();
//	}

	public void updateModeBox(Graphics realg) {
		
		
		/**
		 * @j2sNative
		 *  document.title = System.currentTimeMillis() - (this.lastTime || 0);
		 *  this.lastTime = System.currentTimeMillis();
		 */
		{
			System.out.println(System.currentTimeMillis() - this.lastTime);
			this.lastTime = System.currentTimeMillis();
			
		}
		
		Graphics g = null;
		if (winSize == null || winSize.width == 0 || winSize.height == 0)
			return;
		boolean mis = true;
		g = dbimage.getGraphics();
		g.setColor(cv.getBackground());
		g.fillRect(0, 0, winSize.width, winSize.height);
		g.setColor(cv.getForeground());

		boolean allQuiet = true;
		if (!stoppedCheck.getState()) {
			int val = speedBar.getValue();
			double tadd = val * (.1 / 16);
			t += tadd;
			if (modeCount > 0)
				allQuiet = false;
		}

		int i, j, k;
		// evolve modes forward in time
		for (i = 0; i != modeCount; i++) {
			Mode m = modes[i];
			m.phasecoef = (m.omega * t + m.phasecoefadj) % (2 * pi);
			m.phasecoefcos = java.lang.Math.cos(m.phasecoef);
			m.phasemult = m.phasecoefcos * m.magcoef;
		}
		if (modeCount != 0)
			computeFunction();

		colorMult = brightnessBar.getValue() * 3;
		int winw = view3d.width;
		int winh = view3d.height;
		if (modeCount > 0) {
			for (i = 0; i != gridSizeX; i++) {
				int x = i * winw / gridSizeX;
				int x2 = (i + 1) * winw / gridSizeX;
				for (j = 0; j != gridSizeY; j++) {
					int y = j * winh / gridSizeY;
					int y2 = (j + 1) * winh / gridSizeY;
					int colval = 0xFF000000 + (getColorValue(i, j, 0) << 16)
							| (getColorValue(i, j, 1) << 8);
					if (mis) {
						int l;
						for (k = x; k < x2; k++)
							for (l = y; l < y2; l++)
								pixels[k + l * view3d.width] = colval;
					} else {
						g.setColor(new Color(colval));
						g.fillRect(x, y, x2 - x, y2 - y);
					}
				}
			}
			if (mis) {
				Image dbimage2 = cv.createImage(imageSource);
				g.drawImage(dbimage2, 0, 0, null);
			}
		}
		g.setColor(Color.white);
		// find which sides of box are visible and draw the lines
		// bounding them. Here we step through all 8 vertices on the box
		// and draw a line connecting each vertex to each adjacent vertex
		// if one of the faces adjacent to that line is visible.
		for (i = 0; i != 8; i++) {
			// here we assume the box is cube (with vertices at (+-1,+-1,+-1))
			// because the dimensions don't affect visibility.
			int sign1 = ((i & 1) == 0) ? -1 : 1;
			int sign2 = ((i & 2) == 0) ? -1 : 1;
			int sign3 = ((i & 4) == 0) ? -1 : 1;
			if (sign1 == -1 && (visibleFace(0, sign2, 0) || visibleFace(0, 0, sign3))) {
				// draw a line from (-1, sign2, sign3) to (1, sign2, sign3)
				// if one of the adjacent faces is visible
				map3d(-1, sign2, sign3, xpoints, ypoints, 0);
				map3d(1, sign2, sign3, xpoints, ypoints, 1);
				g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
			}
			if (sign2 == -1 && (visibleFace(sign1, 0, 0) || visibleFace(0, 0, sign3))) {
				// draw a line from (sign1, -1, sign3) to (sign1, 1, sign3)
				// etc.
				map3d(sign1, -1, sign3, xpoints, ypoints, 0);
				map3d(sign1, 1, sign3, xpoints, ypoints, 1);
				g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
			}
			if (sign3 == -1 && (visibleFace(sign1, 0, 0) || visibleFace(0, sign2, 0))) {
				map3d(sign1, sign2, -1, xpoints, ypoints, 0);
				map3d(sign1, sign2, 1, xpoints, ypoints, 1);
				g.drawLine(xpoints[0], ypoints[0], xpoints[1], ypoints[1]);
			}
		}
		g.setColor(Color.black);
		g.fillRect(0, view3d.height, winSize.width, winSize.height - view3d.height);
		for (i = 0; i != maxDispCoefs; i++)
			drawFrequencies(g, i);

		if (viewSpectrum != null) {
			// draw spectrum
			// modes can be identified either individually or by a
			// frequency range. We highlight whichever ones are selected.
			double selw = (selectedCoefX == -1) ? 0 : getOmega(selectedCoefX,
					selectedCoefY, selectedCoefZ);
			int selx = (int) (selw * spectrumSpacing);
			int selmin = (int) (selectedMinOmega * spectrumSpacing);
			int selmax = (int) (selectedMaxOmega * spectrumSpacing);
			int ym = viewSpectrum.height - 10;
			int y = viewSpectrum.y + viewSpectrum.height - 5;
			for (i = 1; i != winSize.width; i++) {
				if (spectrum[i] == 0)
					continue;
				int h = (int) (ym * (.2 + java.lang.Math.log(spectrum[i]) / 4));
				if (h > ym)
					h = ym;
				g.setColor((i == selx || (i >= selmin && i < selmax)) ? Color.yellow
						: Color.gray);
				g.drawLine(i, y, i, y - h);
			}
		}

		if (selectedCoefX != -1) {
			String s = "Selected mode = (" + selectedCoefX + "," + selectedCoefY
					+ "," + selectedCoefZ + ")";
			FontMetrics fm = g.getFontMetrics();
			g.setColor(Color.yellow);
			int y = view3d.y + view3d.height - fm.getDescent() - 2;
			g.drawString(s, (winSize.width - fm.stringWidth(s)) / 2, y);
		}
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

	void drawFrequencies(Graphics g, int z) {
		// draw one frequency grid for a particular z
		Rectangle view = viewFreq[z];
		int termWidth = getTermWidth();
		g.setColor(Color.white);
		int starti = 0;
		int i, j, x, y;
		for (i = starti; i <= maxDispCoefs; i++) {
			x = i * termWidth;
			g.drawLine(view.x + starti * termWidth, x + view.y, view.x + termWidth
					* maxDispCoefs, x + view.y);
			g.drawLine(view.x + x, view.y + starti * termWidth, view.x + x, view.y
					+ termWidth * maxDispCoefs);
		}
		int rcol = 0x00010000;
		int gcol = 0x00000100;
		for (i = 0; i != modeCount; i++) {
			Mode m = modes[i];
			if (m.z != z)
				continue;
			x = view.x + m.x * termWidth;
			y = view.y + m.y * termWidth;
			int val = logcoef(m.magcoef);
			if (val < -255)
				val = -255;
			if (val > 255)
				val = 255;
			if (val < 0)
				g.setColor(new Color(0xFF000000 + rcol * -val));
			else
				g.setColor(new Color(0xFF000000 + gcol * val));
			g.fillRect(x + 1, y + 1, termWidth - 1, termWidth - 1);
			int phx = (int) (m.phasecoefadj * termWidth * (1 / (pi * 2)));
			if (phx > 0) {
				// show phase line
				g.setColor(Color.blue);
				g.drawLine(x + phx, y + 1, x + phx, y + termWidth);
			}
		}
		if (selectedCoefX != -1) {
			// draw yellow square around degenerate modes
			double selOmega = getOmega(selectedCoefX, selectedCoefY, selectedCoefZ);
			g.setColor(Color.yellow);
			for (i = starti; i != maxDispCoefs; i++)
				for (j = starti; j != maxDispCoefs; j++) {
					x = view.x + i * termWidth;
					y = view.y + j * termWidth;
					if (getOmega(i, j, z) == selOmega)
						g.drawRect(x, y, termWidth, termWidth);
				}
		}
		if (selectedMinOmega > 0 && selectedMaxOmega > 0) {
			// draw yellow square around modes in selected range
			g.setColor(Color.yellow);
			for (i = starti; i != maxDispCoefs; i++)
				for (j = starti; j != maxDispCoefs; j++) {
					x = view.x + i * termWidth;
					y = view.y + j * termWidth;
					double w = getOmega(i, j, z);
					if (w >= selectedMinOmega && w < selectedMaxOmega)
						g.drawRect(x, y, termWidth, termWidth);
				}
		}
	}

	double logep2 = 0;

	int logcoef(double x) {
		double ep2 = epsilon2;
		int sign = (x < 0) ? -1 : 1;
		x *= sign;
		if (x < ep2)
			return 0;
		if (logep2 == 0)
			logep2 = -java.lang.Math.log(2 * ep2);
		return (int) (255 * sign * (java.lang.Math.log(x + ep2) + logep2) / logep2);
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
		if (e.getSource() == clearButton) {
			while (modeCount > 0)
				deleteMode(0);
			cv.repaint();
		}
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		if (e.getSource() == widthBar || e.getSource() == heightBar)
			setWidthHeight();
		if (e.getSource() == resolutionBar)
			setMaxTerms();
		cv.repaint(pause);
	}

	// set the width and/or height of box and adjust omegas to match
	void setWidthHeight() {
		boxwidth = widthBar.getValue() / 5.;
		boxheight = heightBar.getValue() / 5.;
		int i;
		for (i = 0; i != modeCount; i++) {
			Mode m = modes[i];
			m.omega = getOmega(m.x, m.y, m.z);
		}
		calcSpectrum();
	}

	void calcSpectrum() {
		int i, j, k;
		if (winSize == null)
			return;
		spectrum = new int[winSize.width];
		for (i = 0; i != maxDispCoefs; i++)
			for (j = 0; j != maxDispCoefs; j++)
				for (k = 0; k != maxDispCoefs; k++) {
					double w = getOmega(i, j, k);
					int x = (int) (w * spectrumSpacing);
					if (x >= winSize.width)
						continue;
					spectrum[x]++;
				}
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

	@Override
	public void mouseMoved(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) != 0) {
			if (selection != -1) {
				dragging = true;
			}
			return;
		}
		processMouseMotion(e);
	}
	
	void processMouseMotion(MouseEvent e) {
		int x = e.getX();
		int y = e.getY();
		oldDragX = dragX;
		oldDragY = dragY;
		dragX = x;
		dragY = y;
		int oldCoefX = selectedCoefX;
		int oldCoefY = selectedCoefY;
		int oldCoefZ = selectedCoefZ;
		selectedCoefX = -1;
		selectedCoefY = -1;
		selectedCoefZ = -1;
		selection = 0;
		selectedMinOmega = selectedMaxOmega = 0;
		int i;
		if (view3d.inside(x, y))
			selection = SEL_3D;
		if (viewSpectrum != null && viewSpectrum.inside(x, y)) {
			selection = SEL_SPECTRUM;
			selectedMinOmega = (x - 2) / (double) spectrumSpacing;
			selectedMaxOmega = (x + 2) / (double) spectrumSpacing;
		}
		for (i = 0; i != maxDispCoefs; i++) {
			Rectangle vf = viewFreq[i];
			if (vf.inside(x, y)) {
				int termWidth = getTermWidth();
				selectedCoefX = (x - vf.x) / termWidth;
				selectedCoefY = (y - vf.y) / termWidth;
				selectedCoefZ = i;
				if (selectedCoefX >= maxDispCoefs)
					selectedCoefX = -1;
				if (selectedCoefY >= maxDispCoefs)
					selectedCoefX = -1; // sic
				if (selectedCoefX != -1)
					selection = SEL_MAG;
			}
		}
		if (selectedCoefX != oldCoefX || selectedCoefY != oldCoefY
				|| selectedCoefZ != oldCoefZ)
			cv.repaint(pause);
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		if (selection == SEL_MAG)
			editMagClick();
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
		if (!dragging && selection != -1) {
			selectedCoefX = selectedCoefY = selectedCoefZ = -1;
			cv.repaint(pause);
		}
	}

	@Override
	public void mousePressed(MouseEvent e) {
		if ((e.getModifiers() & MouseEvent.BUTTON1_MASK) == 0)
			return;
		processMouseMotion(e); // needed for mobile
		oldDragX = dragStartX = e.getX();
		oldDragY = dragStartY = e.getY();
		dragZoomStart = zoom;
		if (selectedCoefX != -1) {
			Mode m = findSelectedMode();
			magDragStart = m.magcoef;
		}
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
		if (e.getItemSelectable() == spectrumCheck)
			setupDisplay();
		cv.repaint(pause);
	}

	@Override
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

	void edit(MouseEvent e) {
		if (selection == SEL_NONE)
			return;
		int x = e.getX();
		int y = e.getY();
		switch (selection) {
		case SEL_MAG:
			editMag(x, y);
			break;
		case SEL_3D:
			edit3d(x, y);
			break;
		}
	}

	void edit3d(int x, int y) {
		if (modeChooser.getSelectedIndex() == MODE_ANGLE) {
			int xo = oldDragX - x;
			int yo = oldDragY - y;
			rotate(xo / 40., yo / 40.);
			cv.repaint(pause);
		} else if (modeChooser.getSelectedIndex() == MODE_ZOOM) {
			int xo = x - dragStartX;
			zoom = dragZoomStart + xo / 20.;
			if (zoom < .1)
				zoom = .1;
			cv.repaint(pause);
		}
	}

	void editMag(int x, int y) {
		if (selectedCoefX == -1)
			return;
		double coef = (dragStartY - y) / 20. + magDragStart;
		if (coef < -1)
			coef = -1;
		if (coef > 1)
			coef = 1;
		double pcoef = (x - dragStartX) / 10.;
		if (pcoef < 0)
			pcoef = 0;
		if (pcoef > 2 * pi)
			pcoef = 2 * pi;
		Mode m = findSelectedMode();
		if (m.magcoef == coef && m.phasecoefadj == pcoef)
			return;
		m.magcoef = coef;
		m.phasecoefadj = pcoef;
		cv.repaint(pause);
	}

	void editMagClick() {
		if (selectedCoefX == -1)
			return;
		Mode m = findSelectedMode();
		if (magDragStart < .5)
			m.magcoef = 1;
		else
			m.magcoef = 0;
		m.phasecoefadj = 0;
		if (m.magcoef == 0)
			deleteMode(m);
		cv.repaint(pause);
	}

	// generate 3-d dataset
	void genData(boolean fixed) {
		double q = 3.14159265 / maxTerms;
		int x, y, z, mi;
		for (mi = 0; mi != modeCount; mi++) {
			Mode m = modes[mi];
			if (m.tableSize != maxTerms) {
				m.xtable = new double[maxTerms];
				m.ytable = new double[maxTerms];
				m.ztable = new double[maxTerms];
				m.tableSize = maxTerms;
			}
			// precompute cosine tables for speed
			for (x = 0; x != maxTerms; x++) {
				m.xtable[x] = java.lang.Math.cos(x * m.x * q) * m.phasemult;
				m.ytable[x] = java.lang.Math.cos(x * m.y * q);
				m.ztable[x] = java.lang.Math.cos(x * m.z * q);
			}
			if (mi == 0)
				for (x = 0; x != maxTerms; x++)
					for (y = 0; y != maxTerms; y++)
						for (z = 0; z != maxTerms; z++)
							data[x][y][z] = m.xtable[x] * m.ytable[y] * m.ztable[z];
			else
				for (x = 0; x != maxTerms; x++)
					for (y = 0; y != maxTerms; y++)
						for (z = 0; z != maxTerms; z++)
							data[x][y][z] += m.xtable[x] * m.ytable[y] * m.ztable[z];
		}
	}

	void deleteMode(int i) {
		for (; i < modeCount - 1; i++) {
			modes[i] = modes[i + 1];
		}
		modeCount--;
	}

	void deleteMode(Mode m) {
		int i;
		for (i = 0; i != modeCount; i++)
			if (modes[i] == m) {
				deleteMode(i);
				return;
			}
	}

	Mode addMode(int x, int y, int z) {
		if (modeCount == maxModes) {
			// one of the existing modes must be deleted; pick weakest one
			int i;
			double minmag = 1;
			int minmagi = 0;
			for (i = 0; i != modeCount; i++) {
				Mode m = modes[i];
				if (m.magcoef < minmag) {
					minmag = m.magcoef;
					minmagi = i;
				}
			}
			deleteMode(minmagi);
		}
		Mode m = new Mode();
		m.x = x;
		m.y = y;
		m.z = z;
		m.magcoef = 0;
		m.phasecoef = 0;
		m.phasecoefcos = 1;
		m.phasecoefadj = 0;
		m.omega = getOmega(x, y, z);
		modes[modeCount++] = m;
		return m;
	}

	// get angular frequency of a particular mode
	double getOmega(int x, int y, int z) {
		return java.lang.Math.sqrt(x * x / (boxwidth * boxwidth) + y * y
				/ (boxheight * boxheight) + z * z / 4.);
	}

	Mode findSelectedMode() {
		int i;
		for (i = 0; i != modeCount; i++) {
			Mode m = modes[i];
			if (selectedCoefX == m.x && selectedCoefY == m.y && selectedCoefZ == m.z)
				return m;
		}
		return addMode(selectedCoefX, selectedCoefY, selectedCoefZ);
	}

	class Mode {
		public int x, y, z;
		public double magcoef, phasecoef, phasecoefcos, phasemult, phasecoefadj,
				omega;
		int tableSize;
		public double xtable[], ytable[], ztable[];
	}
}
