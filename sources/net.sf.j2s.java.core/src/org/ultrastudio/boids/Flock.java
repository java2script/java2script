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

import java.awt.geom.Rectangle2D;
import java.util.ArrayList;

/**
 * Represents the flock of boids.
 * 
 * @author Audrius Meskauskas
 */
@SuppressWarnings("serial")
public class Flock extends ArrayList<Boid> {
	
	/**
	 * The size of the drawing field.
	 */
	final Rectangle2D.Double size = new Rectangle2D.Double(); 
	
	boolean scared;
	
	boolean cooperative = true;

	/**
	 * The next step of the iteration after the given time step.
	 */
	public void iteration(double time) {
		for (Boid boid : this)
			boid.moveAhead(time);
	}

	/**
	 * When the flock is scared, boids avoid each other (flock dissolves)
	 * 
	 * @param scared if true, the flock is scared.
	 */
	public void setScared(boolean scared) {
		this.scared = scared;
	}

	/**
	 * The the flock in not cooperative, boid does not care about other boids.
	 * 
	 * @param cooperative
	 */
	public void setCooperative(boolean cooperative) {
		this.cooperative = cooperative;
	}

	public void multiply() {
		for (int i = size(); --i >= 0;)
			addBoid();
	}

	public void addBoid() {
		Boid boid = new Boid();
		boid.flock = this;
		add(boid);
	}

}
