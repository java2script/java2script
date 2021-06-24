package test;

import java.awt.AWTEvent;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Event;
import java.awt.Rectangle;
import javax.swing.BoxLayout;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JPanel;
import javax.swing.border.TitledBorder;

/**
 * adds a menu bar
 * 
 * @author hansonr
 *
 */
public class Test_Applet_2b extends JApplet {

	Test_2Canvas canvas;
	Test_2Controls controls;
	Rectangle r;
	

	public Test_Applet_2b() {
		
		System.out.println("testing".indexOf("s", -20));
//	  Object xx = java.lang.reflect.Array.newInstance(JApplet.class, 3);
	//	Class y = xx.getClass().getComponentType();
		//System.out.println(y.getName());  
		setName("Test_2");
		
	}

	@Override
	public void init() {
		setLayout(new BorderLayout());
		JMenuBar mb = new JMenuBar();
		mb.add(new JMenu("ok"));
		mb.add(new JMenu("menu"));
		setJMenuBar(mb);
		JPanel p = new JPanel();
		p.setLayout(new BoxLayout(p, BoxLayout.LINE_AXIS));
		p.add(new JButton("test1"));
		p.add(new JButton("test2"));
		canvas = new Test_2Canvas();
		add(p, BorderLayout.SOUTH);
		canvas.setSize(850, 500);
		Container c = getContentPane();
		((JPanel) c).setBorder(new TitledBorder("testing"));
		c.setSize(850, 530);
		((JPanel) c).setOpaque(false);
		c.add(canvas, BorderLayout.CENTER);
		c.add(controls = new Test_2Controls(canvas), BorderLayout.NORTH);
//		System.out.println( controls.bg0.getForeground()); 
//				+ " "+ controls.bg0.getBackground() 
	//			+ " \n cb " + controls.getForeground() + " cf " + controls.getBackground());z
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
		Test_Applet_2 tanabe = new Test_Applet_2();
		tanabe.init();
		tanabe.start();
		f.add("Center", tanabe);
		f.setBackground(Color.white);
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

} 

