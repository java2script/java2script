package edu.uwi;

//web_Ready
//web_AppletName= tanSugd3S
//web_Description= Interactive Tanabe-Sugano diagrams for inorganic d3 systems
//web_Date= $Date: 2017-01-11 19:46:04 -0600 (Wed, 11 Jan 2017) $
//web_JavaVersion=http://wwwchem.uwimona.edu.jm/courses/Tanabe-Sugano/TSapplets.html 
//web_OriginalAuthor= Robert Lancashire, University of the West Indies.
//web_SwingJSAuthor= <a href="mailto:hansonr@stolaf.edu">Bob Hanson, St. Olaf College</a>
//web_AppletImage= tansugd3s.png
//web_Category= Chemistry
//web_Features= graphics, radio buttons, scrolling text, simple threading
//web_Info=	width: 850, height: 550

import java.awt.AWTEvent;
import java.awt.BasicStroke;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Event;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Stroke;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;


import javax.swing.ButtonGroup;
import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JTextField;

public class TanSugd3S extends JApplet {

	TSd3Canvas canvas;
	TSd3Controls controls;

	public TanSugd3S() {
//	  Object xx = java.lang.reflect.Array.newInstance(JApplet.class, 3);
	//	Class y = xx.getClass().getComponentType();
		//System.out.println(y.getName());  
		setName("TanSugd3S");
	}

	@Override
	public void init() {
		setLayout(new BorderLayout());
		canvas = new TSd3Canvas();
		canvas.setSize(850, 500);
		Container c = getContentPane();
		c.setSize(850, 500);
		c.add(canvas, BorderLayout.CENTER);
		c.add(controls = new TSd3Controls(canvas), BorderLayout.NORTH);
		System.out.println("Hello, world!");
	}

	@Override
	public void setSize(int width, int height) {
		super.setSize(width, height);
		validate();
	}

	@Override
	public void destroy() {
		remove(controls);
		remove(canvas);
	}

	@Override
	public void start() {
		controls.setEnabled(true);
		//testing controls.bg0.setFont(new Font("Arial", Font.PLAIN, 20));
	}

	@Override
	public void stop() {
		controls.setEnabled(false);
	}

	@Override
	public void processEvent(AWTEvent e) {
		if (e.getID() == Event.WINDOW_DESTROY) {
			System.exit(0);
		}
	}

	public static void main(String args[]) {
		JFrame f = new JFrame("Tanabe-Sugano");
		TanSugd3S tanabe = new TanSugd3S();
		tanabe.init();
		tanabe.start();
		f.add("Center", tanabe);
		f.pack();
		f.setVisible(true);
    f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	@Override
	public String getAppletInfo() {
		return "A d3 octahedral Tanabe-Sugano Diagram";
	}

	// calculate Allowed transitions
	// v2 4T1g(F)
	static double CalcF4T1g(double x1) {
		return (15 + (3 * x1) - Math.sqrt(225 - (18 * x1) + (x1 * x1))) / 2;
	}

	// v3 4T1g(P)
	static double CalcP4T1g(double x1) {
		return (15 + (3 * x1) + Math.sqrt(225 - (18 * x1) + (x1 * x1))) / 2;
	}

	// calculate forbidden lines using empirical relationships from CAMMAG output
	// fE 2G - 2Eg
	static double CalcG2Eg(double x1) {
		return 0.0000002727 * x1 * x1 * x1 * x1 * x1 - 0.00003926 * x1 * x1 * x1
				* x1 + 0.002110 * x1 * x1 * x1 - 0.05256 * x1 * x1 + 0.6345 * x1
				+ 17.50161;
	}

	// fA1g 2G - 2A1g
	static double CalcG2A1g(double x1) {
		return x1 + 17.50161;
	}

	// fT1g 2G - 2T1g
	static double CalcG2T1g(double x1) {
		return 0.0000003205 * x1 * x1 * x1 * x1 * x1 - 0.00004689 * x1 * x1 * x1
				* x1 + 0.00258 * x1 * x1 * x1 - 0.06641 * x1 * x1 + 0.8232 * x1
				+ 17.50161;
	}

	// fT2g 2G - 2T2g
	static double CalcG2T2g(double x1) {
		return 0.0000001933 * x1 * x1 * x1 * x1 * x1 - 0.00003336 * x1 * x1 * x1
				* x1 + 0.002274 * x1 * x1 * x1 - 0.07898 * x1 * x1 + 1.557 * x1
				+ 17.50161;
	}

	// fT2H 2H - 2T2g
	static double CalcH2T2g(double x1) {
		return 0.00000002443 * x1 * x1 * x1 * x1 * x1 + 0.0000002677 * x1 * x1 * x1
				* x1 - 0.0003003 * x1 * x1 * x1 + 0.01745 * x1 * x1 + 0.6635 * x1
				+ 22.50161;
	}

	// fT1H 2H - 2T1g
	static double CalcH2T1g(double x1) {
		return 0.00000002195 * x1 * x1 * x1 * x1 * x1 - 0.000005305 * x1 * x1 * x1
				* x1 + 0.0004933 * x1 * x1 * x1 - 0.02294 * x1 * x1 + 1.570 * x1
				+ 22.50161;
	}

	// fEH 2H - 2Eg
	static double CalcH2Eg(double x1) {
		return 0.0000001881 * x1 * x1 * x1 * x1 * x1 - 0.00002683 * x1 * x1 * x1
				* x1 + 0.001416 * x1 * x1 * x1 - 0.0338 * x1 * x1 + 1.3525 * x1
				+ 22.50161;
	}

	// fT2b 2D - 2T2g
	static double CalcD2T2g(double x1) {
		return -0.0000007532 * x1 * x1 * x1 * x1 * x1 + 0.00009886 * x1 * x1 * x1
				* x1 - 0.004352 * x1 * x1 * x1 + 0.06092 * x1 * x1 + 1.378 * x1
				+ 24.8951929;
	}

	public String processDelB(String msgstr) {

		double x1, y1, y2, y3, fE, fT1, fT2, fA1, fT2b, fT2H, fT1H, fEH;
		double Delta, Bp;
		StringBuffer ret = new StringBuffer();
		int ii = msgstr.indexOf(":");
		int ll = msgstr.length();
		Delta = Double.parseDouble(msgstr.substring(0, ii).trim());
		Bp = Double.parseDouble(msgstr.substring(ii + 1, ll).trim());

		x1 = Delta / Bp;
		// v1/B
		y1 = x1;
		// v2/B
		y2 = CalcF4T1g(x1);
		// v3/B
		y3 = CalcP4T1g(x1);

		fE = CalcG2Eg(x1);
		fT1 = CalcG2T1g(x1);
		fT2 = CalcG2T2g(x1);
		fA1 = CalcG2A1g(x1);
		fT2b = CalcD2T2g(x1);
		fT2H = CalcH2T2g(x1);
		fEH = CalcH2Eg(x1);
		fT1H = CalcH2T1g(x1);

		String sBp = "" + Math.round(Bp);
		String va1 = "" + Math.round(y1 * Bp);
		String va2 = "" + Math.round(y2 * Bp);
		String va3 = "" + Math.round(y3 * Bp);
		String vfE = "" + Math.round(fE * Bp);
		String vfT1 = "" + Math.round(fT1 * Bp);
		String vfT2 = "" + Math.round(fT2 * Bp);
		String vfA1 = "" + Math.round(fA1 * Bp);
		String vfT2b = "" + Math.round(fT2b * Bp);
		String vfT2H = "" + Math.round(fT2H * Bp);
		String vfEH = "" + Math.round(fEH * Bp);
		String vfT1H = "" + Math.round(fT1H * Bp);

		ret.append("B\' " + sBp + ", A " + va1 + ", " + va2 + ", " + va3 + ", F "
				+ vfE + ", " + vfT1 + ", " + vfT2 + ", " + vfA1 + ", " + vfT2H + ", "
				+ vfEH + ", " + vfT1H + ", " + vfT2b);

		canvas.start_x = 0;
		canvas.end_x = 50;
		canvas.mouseOn = true;
		canvas.deltaB = x1;
		canvas.y1 = x1;
		canvas.y2 = y2;
		canvas.y3 = y3;
		canvas.fE = fE;
		canvas.fT1 = fT1;
		canvas.fT2 = fT2;
		canvas.fA1 = fA1;
		canvas.fT2b = fT2b;
		canvas.fT2H = fT2H;
		canvas.fEH = fEH;
		canvas.fT1H = fT1H;
		canvas.ratio21 = y2 / y1;

		canvas.repaint();

		return ret.toString();
	}

	public String processRatio(String msgstr) {
		// IE does not seem to allow passing variables from JavaScript to Java here.

		double x1, temp_ratio21, y1, y2, y3, ratio21, v1, fE, fT1, fT2, fA1, fT2b, fT2H, fT1H, fEH;
		int ii = msgstr.indexOf(":");
		int ll = msgstr.length();
		ratio21 = Double.parseDouble(msgstr.substring(0, ii).trim());
		v1 = Double.parseDouble(msgstr.substring(ii + 1, ll).trim());
		int x;
		boolean ratioFound = false;
		StringBuffer ret = new StringBuffer();
		ret.append("no value");

		for (x = 0; x <= 50; x++) {
			// x = delta/B = v1/B
			y1 = x;

			// v2/B
			y2 = CalcF4T1g(x);

			temp_ratio21 = y2 / y1;

			if ((temp_ratio21 < ratio21) && (ratio21 > 1.192) && (ratio21 < 1.75)) {
				// now break and loop between x-1 and x
				ratioFound = true;
				break;
			}
		}

		if (ratioFound) {
			for (x1 = (x - 1); x1 < x; x1 += 0.02) {
				// v1/B
				y1 = x1;

				// v2/B
				y2 = CalcF4T1g(x1);

				// v3/B
				y3 = CalcP4T1g(x1);

				fE = CalcG2Eg(x1);
				fT1 = CalcG2T1g(x1);
				fT2 = CalcG2T2g(x1);
				fA1 = CalcG2A1g(x1);
				fT2b = CalcD2T2g(x1);
				fT2H = CalcH2T2g(x1);
				fEH = CalcH2Eg(x1);
				fT1H = CalcH2T1g(x1);

				temp_ratio21 = y2 / y1;

				if (temp_ratio21 < ratio21) {
					ret = new StringBuffer();
					double Bp = v1 / x1;

					long temp = Math.round(Bp * 10);
					String tmp = new String("" + temp);
					String Bprime = (tmp.substring(0, tmp.length() - 1) + "." + tmp
							.substring(tmp.length() - 1, tmp.length()));
					y3 = CalcP4T1g(x1);

					String va1 = "" + Math.round(y1 * Bp);
					String va2 = "" + Math.round(y2 * Bp);
					String va3 = "" + Math.round(y3 * Bp);
					String vfE = "" + Math.round(fE * Bp);
					String vfT1 = "" + Math.round(fT1 * Bp);
					String vfT2 = "" + Math.round(fT2 * Bp);
					String vfA1 = "" + Math.round(fA1 * Bp);
					String vfT2b = "" + Math.round(fT2b * Bp);
					String vfT2H = "" + Math.round(fT2H * Bp);
					String vfEH = "" + Math.round(fEH * Bp);
					String vfT1H = "" + Math.round(fT1H * Bp);

					ret.append("B\' " + Bprime + ", A " + va1 + ", " + va2 + ", " + va3
							+ ", F " + vfE + ", " + vfT1 + ", " + vfT2 + ", " + vfA1 + ", "
							+ vfT2H + ", " + vfEH + ", " + vfT1H + ", " + vfT2b);

					canvas.start_x = 0;
					canvas.end_x = 50;
					canvas.mouseOn = true;
					canvas.deltaB = x1;
					canvas.y1 = x1;
					canvas.y2 = y2;
					canvas.y3 = y3;
					canvas.fE = fE;
					canvas.fT1 = fT1;
					canvas.fT2 = fT2;
					canvas.fA1 = fA1;
					canvas.fT2b = fT2b;
					canvas.fT2H = fT2H;
					canvas.fEH = fEH;
					canvas.fT1H = fT1H;
					canvas.ratio21 = y2 / y1;

					canvas.repaint();

					return ret.toString();
				}
			}
		}

		canvas.mouseOn = false;
		canvas.repaint();

		return ret.toString();
	}

} // End Class TanSugd3

// ------------------------------------------------------
class TSd3Canvas extends JPanel implements MouseListener, MouseMotionListener {

	double y; // Coordinates used for drawing graphs
	Point bottomLeft, btmLeft;
	int start_x, end_x, lrange;
	int x;
	int hlines, vlines;
	int gx;
	double deltaB;
	double xScale, yScale;
	boolean mouseOn;
	double x1, y1, y2, y3, ratio21, ratio31, ratio32, fE, fT2, fT1, fA1, fT2b,
			fT2H, fT1H, fEH;
	Font fb = new Font("Arial", Font.BOLD, 18);
	Font f = new Font("Courier", Font.PLAIN, 16);
	Color dkgreen = new Color(142, 244, 108);
	Color gold = new Color(191, 139, 32);
	Color ltgrey = new Color(233, 233, 233);
	Color teal = new Color(168, 207, 251);
	Color purple = new Color(192, 12, 255);
	Color lgreen = new Color(82, 179, 53);
	Color dgreen = new Color(41, 94, 28);
	Color copper = new Color(179, 100, 13);
	Rectangle graphRec = new Rectangle(50, 10, 600, 460);
	Rectangle outPRec = new Rectangle(650, 10, 685, 360);

	public TSd3Canvas() {
		setName("TSd3Canvas");
		setBackground(Color.blue);
		start_x = 0;
		end_x = 50;
		hlines = 10;
		vlines = 10;
		addMouseListener(this);
		addMouseMotionListener(this);
		mouseOn = false;
	}

	@Override
	public void paintComponent(Graphics g) {
		//System.out.println("TanSugd3S painting ");
		//g.setPaintMode();
		drawDiagram(g);
	}

	public void redraw(int range) {
		lrange = range;
		switch (range) {
		case 0:
			start_x = 0;
			end_x = 50;
			break;
		case 1:
			start_x = 0;
			end_x = 10;
			break;
		case 2:
			start_x = 10;
			end_x = 20;
			break;
		case 3:
			start_x = 20;
			end_x = 30;
			break;
		case 4:
			start_x = 30;
			end_x = 40;
			break;
		case 5:
			start_x = 40;
			end_x = 50;
			break;
		}
		repaint();
	}

	private void drawDiagram(Graphics g) {
		displayGraph(g);
	}

	private void displayGraph(Graphics g) {
		
		
		Graphics2D g2 = (Graphics2D) g;

		g2.setColor(ltgrey);
		g2.fillRect(0,  0, getWidth(), getHeight());
		g2.setBackground(g2.getBackground());

		Stroke stroke2 = new BasicStroke(2);
		Stroke stroke1 = new BasicStroke(1);
		Stroke stroke_d1 = new BasicStroke(1, BasicStroke.CAP_BUTT,
				BasicStroke.JOIN_BEVEL, 0, new float[] { 6, 6 }, 0);

		double yDivisor;

		//Rectangle graphRec = new Rectangle(50,10,400,310);
		g2.setColor(Color.white);
		g2.fillRect(graphRec.x, graphRec.y, graphRec.width, graphRec.height);
		// Rectangle outPRec = new Rectangle(450,10,495,210);
		g2.setColor(Color.black);
		bottomLeft = new Point(graphRec.x, graphRec.y + graphRec.height);
		btmLeft = new Point(outPRec.x, outPRec.y + outPRec.height);

		g2.drawLine(bottomLeft.x, bottomLeft.y, bottomLeft.x + graphRec.width,
				bottomLeft.y);
		g2.drawLine(bottomLeft.x, bottomLeft.y, bottomLeft.x, graphRec.y);

		xScale = ((double) graphRec.width / (end_x - start_x));
		if (end_x < 35) {
			yDivisor = TanSugd3S.CalcD2T2g(end_x);
		} else
			yDivisor = TanSugd3S.CalcP4T1g(end_x);

		yScale = (double) graphRec.height / yDivisor;

		// x is equal to delta/B
		// y is equal to E/B
		// calculate the starting values

		int[] start_x1 = { (int) (bottomLeft.x) };
		int[] start_x2 = { (int) (bottomLeft.x) };
		int[] start_x3 = { (int) (bottomLeft.x) };
		int[] start_x4 = { (int) (bottomLeft.x) };
		int[] start_x5 = { (int) (bottomLeft.x) };
		int[] start_x6 = { (int) (bottomLeft.x) };
		int[] start_x7 = { (int) (bottomLeft.x) };
		int[] start_x8 = { (int) (bottomLeft.x) };
		int[] start_x9 = { (int) (bottomLeft.x) };
		int[] start_x10 = { (int) (bottomLeft.x) };
		int[] start_x11 = { (int) (bottomLeft.x) };

		int[] start_y1 = { (int) (bottomLeft.y - (start_x * yScale)) };
		y = TanSugd3S.CalcF4T1g(start_x);
		int[] start_y2 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcP4T1g(start_x);
		int[] start_y3 = { (int) (bottomLeft.y - (yScale * y)) };

		y = TanSugd3S.CalcG2Eg(start_x);
		int[] start_y4 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcG2T1g(start_x);
		int[] start_y5 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcG2T2g(start_x);
		int[] start_y6 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcG2A1g(start_x);
		int[] start_y7 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcD2T2g(start_x);
		int[] start_y8 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcH2T2g(start_x);
		int[] start_y9 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcH2T1g(start_x);
		int[] start_y10 = { (int) (bottomLeft.y - (yScale * y)) };
		y = TanSugd3S.CalcH2Eg(start_x);
		int[] start_y11 = { (int) (bottomLeft.y - (yScale * y)) };

		int hSlines = graphRec.height / hlines;
		int vSlines = graphRec.width / vlines;

		// define hlines so that the X axis is marked at 5 or 1 unit divisions
		// define vlines so that the Y axis is marked every 10 or 5 units

		g2.setColor(ltgrey);
		g2.setStroke(stroke1);
		for (int ii = 1; ii <= hlines; ii++) {
			g2.drawLine(bottomLeft.x, bottomLeft.y - (ii * hSlines), bottomLeft.x
					+ graphRec.width, bottomLeft.y - (ii * hSlines));
		}
		for (int ii = 1; ii <= vlines; ii++) {
			g2.drawLine(bottomLeft.x + (ii * vSlines), bottomLeft.y, bottomLeft.x
					+ (ii * vSlines), bottomLeft.y - graphRec.height);
		}

		for (x = start_x; x <= end_x; x++) {
			g2.setStroke(stroke2);
			// line 1
			g2.setColor(Color.red);
			y = x;
			drawXtoY(x, y, start_x1, start_y1, g);

			// line 2
			g2.setColor(Color.blue);
			y = TanSugd3S.CalcF4T1g(x);
			drawXtoY(x, y, start_x2, start_y2, g);

			// line 3
			g2.setColor(dkgreen);
			y = TanSugd3S.CalcP4T1g(x);
			drawXtoY(x, y, start_x3, start_y3, g);

			// first forbidden line
			g2.setStroke(stroke_d1);
			g2.setColor(teal);
			y = TanSugd3S.CalcG2Eg(x);
			drawXtoY(x, y, start_x4, start_y4, g);

			// second forbidden line
			g2.setColor(Color.orange);
			y = TanSugd3S.CalcG2T1g(x);
			drawXtoY(x, y, start_x5, start_y5, g);

			// third forbidden line
			g2.setColor(gold);
			y = TanSugd3S.CalcG2T2g(x);
			drawXtoY(x, y, start_x6, start_y6, g);

			// fourth forbidden line
			g2.setColor(Color.gray);
			y = TanSugd3S.CalcG2A1g(x);
			drawXtoY(x, y, start_x7, start_y7, g);

			// fifth forbidden line
			g2.setColor(purple);
			y = TanSugd3S.CalcD2T2g(x);
			drawXtoY(x, y, start_x8, start_y8, g);

			// sixth forbidden line
			g2.setColor(lgreen);
			y = TanSugd3S.CalcH2T2g(x);
			drawXtoY(x, y, start_x9, start_y9, g);

			// seventh forbidden line
			g2.setColor(copper);
			y = TanSugd3S.CalcH2Eg(x);
			drawXtoY(x, y, start_x11, start_y11, g);

			// eight forbidden line
			g2.setColor(dgreen);
			y = TanSugd3S.CalcH2T1g(x);
			drawXtoY(x, y, start_x10, start_y10, g);
		}
		g2.setStroke(stroke1);
		g2.setColor(Color.black);
		g2.setFont(fb);

		int sx = bottomLeft.x;
		int sy = bottomLeft.y;
		g2.drawString("" + start_x, sx, sy + 15);
		g2.drawString("delta/B", sx + 170, sy + 15);
		g2.drawString("C/B=4.5", sx + 345, sy + 30);
		g2.drawString("" + end_x, graphRec.width + 35, sy + 15);
		g2.drawString("E/B", sx - 35, graphRec.y + 100);
		if (lrange == 0) {
			g2.drawString("4F", sx - 25, graphRec.y + 465);
			g2.drawString("4P", sx - 25, graphRec.y + 400);
			g2.drawString("2G", sx - 25, graphRec.y + 385);
			g2.drawString("2H", sx - 25, graphRec.y + 370);
			g2.drawString("2D", sx - 25, graphRec.y + 355);
		}
		
		if (mouseOn) {

			g2.setColor(Color.black);

			// System.out.println(deltaB+","+bottomLeft.x);

			gx = (int) (((deltaB - start_x) * xScale) + bottomLeft.x);
			g2.drawLine(gx, bottomLeft.y, gx, graphRec.y);
			g2.setFont(f);
			g2.drawString("delta/B'   " + toThreePlaces(deltaB), outPRec.x,
					outPRec.y + 15);
			g2.setColor(Color.red);
			g2.drawString("v1(T2g)/B' " + toThreePlaces(y1), outPRec.x,
					outPRec.y + 28);
			g2.setColor(Color.blue);
			g2.drawString("v2(T1g)/B' " + toThreePlaces(y2), outPRec.x,
					outPRec.y + 43);
			g2.setColor(dkgreen);
			g2.drawString("v3(T1g)/B' " + toThreePlaces(y3), outPRec.x,
					outPRec.y + 56);
			g2.setColor(Color.black);
			g2.drawString("ratio v2/v1 " + toThreePlaces(ratio21), outPRec.x,
					outPRec.y + 70);
			g2.setColor(teal);
			g2.drawString("f1 (Eg)/B' " + toThreePlaces(fE), outPRec.x,
					outPRec.y + 83);
			g2.setColor(Color.orange);
			g2.drawString("f2(T1g)/B' " + toThreePlaces(fT1), outPRec.x,
					outPRec.y + 98);
			g2.setColor(gold);
			g2.drawString("f3(T2g)/B' " + toThreePlaces(fT2), outPRec.x,
					outPRec.y + 113);
			g2.setColor(Color.gray);
			g2.drawString("f4(A1g)/B' " + toThreePlaces(fA1), outPRec.x,
					outPRec.y + 128);
			g2.setColor(lgreen);
			g2.drawString("f5(T2g)/B' " + toThreePlaces(fT2H), outPRec.x,
					outPRec.y + 143);
			g2.setColor(copper);
			g2.drawString("f6(Eg)/B'  " + toThreePlaces(fEH), outPRec.x,
					outPRec.y + 159);
			g2.setColor(dgreen);
			g2.drawString("f7(T1g)/B' " + toThreePlaces(fT1H), outPRec.x,
					outPRec.y + 173);
			g2.setColor(purple);
			g2.drawString("f8(T2g)/B' " + toThreePlaces(fT2b), outPRec.x,
					outPRec.y + 189);
			mouseOn = false;
		}
	}

	String toThreePlaces(double in) {
		long temp = Math.round(in * 1000);
		String tmp = new String("" + temp);
		return (tmp.substring(0, tmp.length() - 3) + "." + tmp.substring(
				tmp.length() - 3, tmp.length()));
	}

	private void drawXtoY(double x, double y, int[] screen_x, int[] screen_y,
			Graphics g) {
		int end_x1, end_y1;
		end_x1 = (int) (((x - start_x) * xScale) + bottomLeft.x);
		end_y1 = (int) (bottomLeft.y - (y * yScale));
		g.drawLine(screen_x[0], screen_y[0], end_x1, end_y1);
		screen_x[0] = end_x1;
		screen_y[0] = end_y1;
	}

	@Override
	public void mousePressed(MouseEvent e) {
		mouseOn = true;
		e.consume();
		gx = e.getX();
		deltaB = ((gx - bottomLeft.x) / xScale) + start_x;
		if ((deltaB >= start_x) && (deltaB <= end_x)) {
			x1 = deltaB;
			y1 = x1;
			y2 = TanSugd3S.CalcF4T1g(x1);
			y3 = TanSugd3S.CalcP4T1g(x1);

			fE = TanSugd3S.CalcG2Eg(x1);
			fT1 = TanSugd3S.CalcG2T1g(x1);
			fT2 = TanSugd3S.CalcG2T2g(x1);
			fA1 = TanSugd3S.CalcG2A1g(x1);
			fT2b = TanSugd3S.CalcD2T2g(x1);
			fT2H = TanSugd3S.CalcH2T2g(x1);
			fEH = TanSugd3S.CalcH2Eg(x1);
			fT1H = TanSugd3S.CalcH2T1g(x1);

			ratio21 = y2 / y1;
			ratio31 = y3 / y1;
			ratio32 = y3 / y2;
			repaint();
		}
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@Override
	public void mouseExited(MouseEvent e) {
	}

	@Override
	public void mouseClicked(MouseEvent e) {
	}

	@Override
	public void mouseReleased(MouseEvent e) {
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		mousePressed(e);
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

} // End Class TSd3Canvas

// ------------------------------------------------------
class TSd3Controls extends JPanel implements ItemListener {

	JTextField s;
	JTextField e;
	TSd3Canvas canvas;
	int range;
  public JComponent bg0, bg5;

	public TSd3Controls(TSd3Canvas canvas) {
		setLayout(new FlowLayout()); 
		// default for JPanel, but 
		// being explicit allows debugging.
		setName("T3d3Controls");
		this.canvas = canvas;
		range = 0;
		ButtonGroup bg = new ButtonGroup();
		bg0 = addButton(bg, "0-50", true);
		addButton(bg, "0-10", false);
		addButton(bg, "10-20", false);
		addButton(bg, "20-30", false);
		addButton(bg, "30-40", false);
		bg5 = addButton(bg, "40-50", false);
		setVisible(true);
	}

	private JComponent addButton(ButtonGroup bg, String text, boolean b) {
		JRadioButton c;
		bg.add(c = new JRadioButton(text, b));
		c.setName(text);
		add(c);
		c.addItemListener(this);
		c.setFont(new Font("Arial", Font.PLAIN & Font.BOLD, 10));
		return c;
	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		if (e.getSource() instanceof JRadioButton && e.getStateChange() == ItemEvent.SELECTED) {
			String b = ((JRadioButton) e.getItemSelectable()).getText();
			if (b == "0-50") {
				range = 0;
			} else if (b == "0-10") {
				range = 1;
			} else if (b == "10-20") {
				range = 2;
			} else if (b == "20-30") {
				range = 3;
			} else if (b == "30-40") {
				range = 4;
			} else if (b == "40-50") {
				range = 5;
			}
			canvas.redraw(range);
		}
	}
} // End Class TSd3Controls