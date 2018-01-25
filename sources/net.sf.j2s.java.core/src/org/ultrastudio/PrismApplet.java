package org.ultrastudio;

import java.awt.BasicStroke;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Stroke;

import javax.swing.BorderFactory;
import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JSlider;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

//web_Ready
//web_AppletName= Prism
//web_Description= Illustrates the refraction of light by a prism
//web_JavaVersion= http://ultrastudio.org/en/Prism
//web_JavaSource= https://java.net/projects/ultrastudio/sources/applets/show/us_Prism
//web_AppletImage= prism.png
//web_Category= Physics - Optics
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics

// BH: private static String name(double n) conflicts with java.awt.Component.name
// BH: ggg.destroy() required before second call to g.create()
@SuppressWarnings("serial")
public class PrismApplet extends JApplet {

	JSlider angle;
	
	JSlider density;
	
	TitledBorder bAngle;
	
	TitledBorder bDensity;
	
	Prism prism;
	
	@Override
	public void init() {
		setLayout(new BorderLayout());
		angle = new JSlider();
		angle.setMaximum(180);
		angle.setMajorTickSpacing(30);
		angle.setMinorTickSpacing(5);
		angle.setMaximum(90);
		angle.setMinimum(0);
		angle.setValue(45);
		bAngle = BorderFactory.createTitledBorder("Incidence angle");
		angle.setBorder(bAngle);
		angle.setPaintTicks(true);
		angle.setPaintLabels(true);
		add(angle, BorderLayout.SOUTH);
		
		density = new JSlider();
		density.setMinimum(1000);
		density.setMaximum(2000);
		density.setMinorTickSpacing(20);
		density.setMajorTickSpacing(100);
	   
		bDensity = BorderFactory.createTitledBorder("Refraction coefficient ");
		density.setBorder(bDensity);
		add(density, BorderLayout.NORTH);
		density.setValue(1600);
		
		density.addChangeListener(new ChangeListener() {			
			@Override
			public void stateChanged(ChangeEvent e) {
				double n = density.getValue() * 0.001;
				prism.setDensity(n);
				updateLabels();				
			}
		});
		
		prism = new Prism();
		add(prism, BorderLayout.CENTER);
		prism.setRayEntry(angle.getValue());
		
		angle.addChangeListener(new ChangeListener() {			
			@Override
			public void stateChanged(ChangeEvent e) {
				prism.setRayEntry(angle.getValue());
				updateLabels();
			}
		});
	}

	private void updateLabels() {
		int a1 = angle.getValue();				
		String nn = myName(prism.n);
		if (nn.length() > 0)
			nn = ", "+nn;
		bDensity.setTitle(String.format("Refraction %.3f"+nn, prism.n));
		bAngle.setTitle(String.format("Incidence %d, bending %.2f", a1, Math.toDegrees(prism.dev(Math.toRadians(a1)))));
		angle.repaint();
		density.repaint();
	}
	
	//theoretically added to remove Namer dependency
	private static String myName(double n){
		int d = (int) (n * 10);
		switch (d) {
		  case 10: return "air";
		  case 13: return "ice";
		  case 14: return "teflon";
		  case 15: return "salt";
		  case 16:
		  case 17:
			  return "glass";
		  case 18: return "sapphire";
		  case 24: return "diamond";
		  default: return "";		
		}
	}
	private static final double TAN_30 = Math.tan(Math.toRadians(30));	
	/**
	 * The top angle of the prism,
	 */
	private static final  double AA = Math.toRadians(60);
	
	class Prism extends JComponent {
		


		/**
		 * Top
		 */
		Point A = new Point();
		
		/**
		 * Middle of the base
		 */
		Point AH = new Point();
		
		/**
		 * Left base point
		 */
		Point B1 = new Point();
		
		/**
		 * Right base point.
		 */
		Point B2 = new Point();
		
		/**
		 * Ray entry point.
		 */
		Point E = new Point();
		
		/**
		 * Ray exit point
		 */
		Point O = new Point();

		int h, l;
		
		int rayEntry;
		
		/**
		 * Optical density of the prism material.
		 */
		double n = 1.6;
		
		Stroke rayStroke = new BasicStroke(3);
		Stroke simpleStroke;
		
		/**
		 * Get the ray deviation of the prism.
		 * 
		 * @param a1 the entry angle (0 = right angle), radians
		 * 
		 * @return deviation angle radians
		 */
		public double dev(double a1) {
			return a1 + a2(a1) - AA;
		}
		
		public double a2(double a1) {
			double v = Math.asin(n*Math.sin(AA-Math.asin(Math.sin(a1)/n)));
			return v;
		}
		
		public double beta1(double a1) {
			return Math.asin(Math.sin(a1) / n);
		}
		
		public double delta1(double a1) {
			return a1 - beta1(a1);
		}

		public void setRayEntry(int rayEntry) {
			this.rayEntry = rayEntry;
			repaint();
		}

		public Prism() {
			setOpaque(true);
		}

		@Override
		protected void paintComponent(Graphics gg) {
			Graphics2D g = (Graphics2D) gg;
			simpleStroke = g.getStroke();
			g.setColor(Color.WHITE);
			int width = getWidth();
			int height = getHeight();
			g.fillRect(0, 0, width, height);

			A.x = width / 2;
			A.y = 0;

			h = height;

			AH.x = A.x;
			AH.y = h;

			l = (int) (h * TAN_30);

			B1.x = AH.x - l;
			B2.x = AH.x + l;
			
			B1.y = B2.y = h;
			
			E.x = (B1.x + A.x) / 2;
			E.y = (B1.y + A.y) / 2;
			
			O.x = (B2.x + A.x) / 2;
			O.y = (B2.y + A.y) / 2;
		
			int [] ex = new int[] { B1.x, A.x, B2.x };
			int [] ey = new int[] { B1.y, A.y, B2.y };

			g.setColor(new Color(255,255, (int) (255* (2.0 - n ))));
			g.fillPolygon(ex, ey, 3);		
			g.setColor(Color.YELLOW.darker());
			g.setStroke(rayStroke);
			g.drawPolygon(ex, ey, 3);
			g.setStroke(simpleStroke);
			
			g.setColor(Color.GREEN);
			line(g, E, B2);
			
			Graphics2D ggg = (Graphics2D) g.create();
			
			// Entering ray
			ggg.setStroke(rayStroke);
			ggg.rotate(Math.toRadians(-rayEntry) + AA/2, E.x, E.y);
			ggg.setColor(Color.RED);
			ggg.drawLine(E.x, E.y, E.x - 100 , E.y);
			
			// Continuation of the entering ray
			ggg.setStroke(simpleStroke);
			ggg.setColor(Color.ORANGE);
			ggg.drawLine(E.x, E.y, E.x + 100+width , E.y);
			
			double a1 = Math.toRadians(rayEntry);		
			double dev = delta1(a1);
			double a2 = a2(a1);
			
			// The code below draws path inside the prism by ray rotation and can
			// be uncommented for control during development.
			
			/*
			ggg.setColor(Color.RED);
			ggg.setStroke(rayStroke);
			ggg.rotate(dev, E.x, E.y);
			ggg.drawLine(E.x, E.y, E.x+100, E.y);
			*/
			
			double t1 = Math.PI/2 - beta1(a1);
			double t2 = Math.PI/2 - (AA - beta1(a1));
			
			double ab = E.distance(A);
			double ad = Math.sin(t1) * ab / Math.sin(t2); // The law of sines
			
			O.x = A.x + (int) ( ad * Math.sin(AA/2) );
			O.y = A.y + (int) (ad * Math.cos(AA/2)  );
			
			ggg.dispose(); // BH --- must revert in order to return to the original state of g		
			ggg = (Graphics2D) g.create();
			ggg.setColor(Color.RED);
			
			if (!Double.isNaN(a2)) { // BH
				ggg.rotate(a2 - AA/2, O.x, O.y);
				ggg.drawLine(O.x, O.y, O.x-200, O.y);
			}		
			ggg.dispose(); // BH		
			ggg = (Graphics2D) g.create();
			ggg.setColor(Color.RED);		
			
			ggg.setStroke(rayStroke);

			line(ggg, E, O);		
			
			if (!Double.isNaN(a2)) { // BH
				ggg.rotate(a2 - AA/2, O.x, O.y);
				ggg.drawLine(O.x, O.y, O.x+100, O.y);
			}		
		}

		private void line(Graphics2D g, Point a, Point b) {
			g.drawLine(a.x, a.y, b.x, b.y);
		}

		public void setDensity(double n2) {
			this.n = n2;
			repaint();		
		}
	}
	
}