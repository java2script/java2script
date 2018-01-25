package org.ultrastudio;

import java.awt.BasicStroke;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.geom.Line2D;

import javax.swing.BorderFactory;
import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

//web_Ready
//web_AppletName= Lissajous
//web_Description= llustrates the Lissajous pattern (two AC signals plotted on X and Y axes)
//web_JavaVersion= http://ultrastudio.org/en/Lissajous_curves
//web_JavaSource= https://java.net/projects/ultrastudio/sources/applets/show/us_Lissajous_s
//web_AppletImage= lissajous.png
//web_Category= Physics - Electronics
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics

/**
 * Produciton allpet to draw Lissajous curves. Faster but more difficult to
 * understand.
 * 
 * @author Audrius Meskauskas
 */
@SuppressWarnings("serial")
public class LissajousSimple extends JApplet implements ChangeListener {

	final float acceleration = 100;
	
	/**
	 * The component that draws Lissajous chart.
	 */
	class LisChart extends JPanel {
		
		float scale;
		
		/**
		 * Paint the Lissajous curve.
		 */
		public void paint(Graphics gg) {
			Graphics2D g = (Graphics2D) gg;
			int w = getWidth();
			int h = getHeight();
			float min = Math.min(w, h);
			
			scale = min/2.2f;
			g.setStroke(new BasicStroke(2));
			g.setColor(Color.RED);

			Line2D.Float line = new Line2D.Float();
			line.x2 = g(xx[0]);
			line.y2 = g(yy[0]);
			for (int i = 1; i < count; i++) {
				line.x1 = line.x2;
				line.y1 = line.y2;
				line.x2 = g(xx[i]);
				line.y2 = g(yy[i]);
				g.draw(line);
			}
		}
		
		/**
		 * Convert from model to screen coordinates.
		 */
		final float g(float v) {
			return (v + 1.1f) * scale;
		}
	}
	
	/**
	 * The component that draws the signal curves chart.
	 */
	class SigChart extends JPanel {
		
		/**
		 * Horizontal scale
		 */
		float sx;
		
		/**
		 * Vertical scale.
		 */
		float sy;
		
		/**
		 * Paint the signal curves.
		 */
		public void paint(Graphics gg) {
			Graphics2D g = (Graphics2D) gg;
			float w = getWidth();
			float h = getHeight();
			
			float p2 = (float) (Math.PI * 2.0f);			
			float ww = acceleration * p2 * ((float) count) / MAX_POINTS;
			sx = w / ww;
			sy = h / 2.2f;

			g.setStroke(new BasicStroke(2));
			g.setColor(Color.RED);
			paintSignal(g, xx);
			g.setColor(Color.BLUE);
			paintSignal(g, yy);
		}

		private void paintSignal(Graphics2D g, float[] vv) {
			Line2D.Float line = new Line2D.Float();
			line.x2 = gx(tt[0]);
			line.y2 = gy(vv[0]);
			for (int i = 1; i < count; i++) {
				line.x1 = line.x2;
				line.y1 = line.y2;
				line.x2 = gx(tt[i]);
				line.y2 = gy(vv[i]);
				g.draw(line);
			}
		}
		
		/**
		 * Convert from model to screen coordinates.
		 */
		final float gy(float v) {
			return (v + 1.1f) * sy;
		}
		/**
		 * Convert from model to screen coordinates.
		 */
		final float gx(float v) {
			return v * sx;
		}
	}	

	/**
	 * The slider for F1
	 */
	JSlider fySlider = new JSlider();

	/**
	 * The slider for F2
	 */
	JSlider fxSlider = new JSlider();

	/**
	 * The slider for F1
	 */
	JSlider aySlider = new JSlider();

	/**
	 * The slider for F2
	 */
	JSlider axSlider = new JSlider();

	JPanel sliders = new JPanel(new GridLayout(4, 1));

	/**
	 * The max number of points in the charts.
	 */
	final int MAX_POINTS = 1000;
	
	float[] xx = new float[MAX_POINTS];
	float[] yy = new float[MAX_POINTS];
	float[] tt = new float[MAX_POINTS];

	/**
	 * The actual number of points that depends on where the Lissajous curve
	 * closes.
	 */
	int count = MAX_POINTS;

	/**
	 * A demonstration application showing a normal distribution.
	 * 
	 * @param title
	 *            the frame title.
	 */
	public LissajousSimple() {
		
		setLayout(new BorderLayout(4,4));

		fySlider.setValue(2);
		fxSlider.setValue(3);

		fySlider.setMaximum(10);
		aySlider.setMaximum(180);
		fxSlider.setMaximum(10);
		axSlider.setMaximum(180);
		
		fxSlider.setMinimum(1);
		fySlider.setMinimum(1);
		fxSlider.setMinorTickSpacing(1);
		fySlider.setMinorTickSpacing(1);

		aySlider.setValue(0);
		axSlider.setValue(120);
		axSlider.setMinorTickSpacing(10);
		aySlider.setMinorTickSpacing(10);		
		aySlider.setMajorTickSpacing(60);
		axSlider.setMajorTickSpacing(60);

		fxSlider.setMajorTickSpacing(1);
		fySlider.setMajorTickSpacing(1);

		fxSlider.setBorder(BorderFactory
				.createTitledBorder("First frequency, Hz"));
		axSlider.setBorder(BorderFactory
				.createTitledBorder("First phase, degrees"));
		fySlider.setBorder(BorderFactory
				.createTitledBorder("Second frequency, Hz"));
		aySlider.setBorder(BorderFactory
				.createTitledBorder("Second phase, degrees"));
		
		LisChart lissajousChart = new LisChart();
		lissajousChart.setBorder(BorderFactory.createLineBorder(Color.BLACK));
		
		SigChart signalChart = new SigChart();
		signalChart.setPreferredSize(new Dimension(500, 100));
		signalChart.setBorder(BorderFactory.createLineBorder(Color.BLACK));

		setupSlider(fxSlider);
		setupSlider(fySlider);		
		setupSlider(axSlider);		
		setupSlider(aySlider);
		add(signalChart, BorderLayout.SOUTH);
		add(lissajousChart, BorderLayout.CENTER);
		add(sliders, BorderLayout.EAST);
		createLissajousDataSet();
	}

	private void setupSlider(JSlider slider) {
		slider.setPaintLabels(true);
		slider.setPaintTicks(true);
		slider.setPaintTrack(true);
		slider.setSnapToTicks(true);
		slider.setPreferredSize(new Dimension(200,30));
		sliders.add(slider);
		slider.addChangeListener(this);
	}

	/**
	 * Creates a dataset with sample values from the normal distribution
	 * function.
	 * 
	 * @return A dataset, contains Lissajous curve and two value over time
	 *         frequencies.
	 */
	public void createLissajousDataSet() {
		float fx = fxSlider.getValue() / 100.0f;
		float fy = fySlider.getValue() / 100.0f;

		float ax = (float) Math.toRadians(aySlider.getValue());
		float ay = (float) Math.toRadians(axSlider.getValue());

		xx = new float[MAX_POINTS];
		yy = new float[MAX_POINTS];

		final float p2 = (float) (Math.PI * 2.0f);

		for (count = 0; count < xx.length; count++) {
			float ff = acceleration * p2 * ((float) count) / MAX_POINTS;
			yy[count] = (float) Math.sin(ax + fx * ff);
			xx[count] = (float) Math.sin(ay + fy * ff);
			tt[count] = 10.0f * ff / p2;
		}

		if (count < MAX_POINTS - 1)
			count++;
	}

	@Override
	/**
	 * Called whenever sliders change the position, as we registered this applet as the change listener for the sliders.
	 */
	public void stateChanged(ChangeEvent e) {
		createLissajousDataSet();
		repaint(50);
	}

}
