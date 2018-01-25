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

/**
 * Various constants of the model.
 * 
 * @author Audrius Meskauskas
 */
public class Constants {

	/**
	 * Conversion between the model time and real time.
	 */
	public static double stepTime = 0.1;

	/**
	 * The "fly towards center" factor.
	 */
	public static double holdFlockCenter = 0.001;

	public static double avoidNeibourthood = 0.01;

	/**
	 * The number of boids in the flock.
	 */
	public static int count = 8;

	/**
	 * The keep away zone around boids
	 */
	public static double keepAwayDistance = 50;

	/**
	 * Minimal speed (accelerate if slower).
	 */
	public static double minSpeed = 2;

	/**
	 * Max speed (slow down if faster).
	 */
	public static double maxSpeed = minSpeed * 5;

	/**
	 * The acceleration for speed adjustment.
	 */
	public static double speedAdjust = 0.001;

}
