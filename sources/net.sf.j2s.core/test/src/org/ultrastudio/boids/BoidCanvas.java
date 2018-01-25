/*
 Copyright (C) 2010  Audrius Meskauskas
 Flock behavior simulator

 This  program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published  by
 the Free Software Foundation; either version 2 of the License, or (at
 your option) any later version.

 This program is distributed in the hope that it will be  useful,  but
 WITHOUT   ANY   WARRANTY;   without  even  the  implied  warranty  of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE.   See  the  GNU
 General Public License for more details.

 You  should  have  received  a copy of the GNU General Public License
 along  with  this  program;  if  not,  write  to  the  Free  Software
 Foundation,  Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307
 USA.
*/

package org.ultrastudio.boids;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;

import javax.swing.JComponent;
import javax.swing.JPanel;

/**
 * The canvas, where boids are painted.
 * 
 * @author Audrius Meskauskas
 */
@SuppressWarnings("serial")
public class BoidCanvas extends JPanel {

	Flock flock;

	public BoidCanvas() {
		setBackground(Color.WHITE);
		setForeground(Color.BLACK);
		setOpaque(true);
	}

	// Polygon to draw the boid triangle.
	// frequent garbage collection.
	int[] xx = new int[3];
	int[] yy = new int[3];

	public void paintComponent(Graphics gg) {
		Graphics2D g = (Graphics2D) gg;

		g.setColor(getBackground());
		g.fillRect(0, 0, getWidth(), getHeight());
		g.setColor(getForeground());

		for (Boid b : flock) {
			final int x = (int) b.location.x;
			final int y = (int) b.location.y;

			// We have already the speed vector that we can easily use
			// to draw the boid orientation. However we need to scale it
			// to keep the boid size uniform (maybe be interesting to have faster boid bigger?)

			// The lenght that it would be.
			double vr = Math
					.sqrt(b.speed.x * b.speed.x + b.speed.y * b.speed.y);

			// Assume 10 px is ok for the boid wing.
			double scale = 10 / vr;

			// The speed vector, scaled to be easily visible
			int vx = (int) (b.speed.x * scale);
			int vy = (int) (b.speed.y * scale);

			g.setColor(Color.YELLOW);

			xx[0] = x - vy;
			xx[1] = x + vy;
			xx[2] = x + vx;

			yy[0] = y + vx;
			yy[1] = y - vx;
			yy[2] = y + vy;

			g.fillPolygon(xx, yy, 3);
			g.setColor(Color.BLACK);
			g.drawPolygon(xx, yy, 3);
		}
	}

}
