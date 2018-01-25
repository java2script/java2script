package edu.uwi;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;

import javax.swing.JPanel;

// SwingJS  moved from Canvas to JPanel

class EntropyCanvas extends JPanel {
  double Entropy[];
  int EntropyCalc;
	int entCounter; // Counter used to move through Array of Entropy values
  
  EntropyCanvas()   {
    super();
  }

  private static float eMax = 65000;
	@Override
	public void paintComponent(Graphics g) {
		// BH: adjusted so that the graph plots in real time, not just at the end
		g.setColor(Color.blue);
		Dimension dim = this.getSize();
		double xScale = dim.width / EntropyCalc;
		double yScale = (dim.height - 20) / (eMax + 10);
		Point start = new Point();
		start.x = 0;
		start.y = dim.height;
		for (int i = 0; i < entCounter; i++) {
			int x = (int) Math.floor(i * xScale);
			int y = dim.height - ((int) Math.floor(Entropy[i] * yScale));
			g.drawLine(start.x, start.y, x, y);
			start.x = x;
			start.y = y;
		}
	}
  
}
