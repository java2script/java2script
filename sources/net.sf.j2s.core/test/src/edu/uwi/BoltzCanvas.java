package edu.uwi;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.Rectangle;

import javax.swing.JPanel;

// SwingJS only change was using JPanel instead of Canvas
// reactivated text fields
// adjusted final title 
public class BoltzCanvas extends JPanel { // SwingJS was Canvas
  public int maxEnergy;      //Max energy a particle can get
  public int energyLevels[]; //number of particles at each Level
  public int xFactor;
	private Boltzmann boltzmann;
     
  public BoltzCanvas(Boltzmann boltzmann)   {
	super();
	this.boltzmann = boltzmann;
  }

	@Override
	public void paintComponent(Graphics g) {
		g.setColor(getForeground());
		g.setPaintMode();
		displayBoltz(g);
	}

	static int nPaint;
	
	void displayBoltz(Graphics g) {
		int i;
		nPaint++;
		Rectangle r = getBounds();
		// g.clearRect(r.x, r.y, r.width, r.height);

		g.setColor(Color.black);

		// Display Axis Labels
		g.drawString(
				"A Boltzmann Simulation ("
						+ (boltzmann.ShowText.levelInfo.length() == 0 ? (boltzmann.maxCollisions - boltzmann.numOfCollisions)
								: boltzmann.maxCollisions) + ")", r.x + 110, r.y + 10);
		g.drawString("E", r.x + 5, r.y + 145);
		g.drawString("No. of Particles", r.x + 110, r.y + 286);

		Rectangle graphRec = new Rectangle(r.x + 20, r.y + 20, r.width - 40,
				r.height - 40);
		g.clearRect(graphRec.x - 1, graphRec.y - 1, graphRec.width + 3,
				graphRec.height + 2);
		g.drawRect(graphRec.x - 2, graphRec.y - 2, graphRec.width + 4,
				graphRec.height + 3);
		Point bottomRight = new Point(graphRec.x + graphRec.width, graphRec.y
				+ graphRec.height);

		// looks for energy level with most (approximate) particles
		for (i = maxEnergy; i > 0; i--) {
			if (energyLevels[i] >= 1)
				break;
			maxEnergy--;
		}

		xFactor = 0;
		for (i = 1; i <= (maxEnergy); i++) {
			if (energyLevels[i] > xFactor) {
				xFactor = energyLevels[i];
				// At start when there is only 1 E-level
				// display it halfway up the screen
				if (i == maxEnergy)
					maxEnergy = 2 * maxEnergy;
			}
		}

		double xScale = ((double) graphRec.width) / xFactor;

		double yScale = ((double) graphRec.height) / (maxEnergy + 1);

		// double a,b;
		g.setColor(Color.red);

		int curY = 0; // Stores the y-coordinate for the current energy level
		for (i = 0; i <= maxEnergy; i++) {
			curY = (bottomRight.y - 1) - ((int) (yScale * (i + 1)));

			if (energyLevels[i] > 0) {
				boolean isMax = (energyLevels[i] == xFactor);
				if (isMax)
					g.setColor(Color.BLUE);
				g.drawLine(graphRec.x, curY, graphRec.x
						+ ((int) (xScale * energyLevels[i])), curY);
				if (isMax)
					g.setColor(Color.RED);

			}
		}
	}
  
  
} //End Class BoltzCanvas
