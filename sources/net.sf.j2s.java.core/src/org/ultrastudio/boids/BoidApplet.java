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

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JApplet;
import javax.swing.Timer;

//web_Ready
//web_AppletName= Boids
//web_Description= Illustrates a flocking algorithm
//web_JavaVersion= http://ultrastudio.org/en/Flock
//web_JavaSource= https://java.net/projects/ultrastudio/sources/applets/show/us_Boids
//web_AppletImage= boids.png
//web_Category= Mathematics
//web_Date= $Date: 2017-01-01 00:08:18 -0600 (Sun, 01 Jan 2017) $
//web_Features= graphics


/**
 * An applet, containing boids
 * 
 * @author Audrius Meskauskas
 *
 */
@SuppressWarnings("serial")
public class BoidApplet extends JApplet implements ActionListener {

	/**
	 * The canvas where to draw the boids.
	 */
	BoidCanvas canvas;

	/**
	 * The flock of boids
	 */
	Flock flock;

	int step = 250;

	Timer timer = new Timer(step, this);

	/**
	 * Self tuning step.
	 */
	long prev;

	@Override
	public void init() {

		canvas = new BoidCanvas();
		flock = new Flock();
		canvas.flock = flock;

		for (int n = 0; n < Constants.count; n++) {
			flock.addBoid();
		}

		add(canvas, BorderLayout.CENTER);
		timer.setRepeats(true);
		timer.setCoalesce(true);
		timer.start();

		canvas.addMouseListener(new MouseAdapter() {

			@Override
			public void mousePressed(MouseEvent e) {
				if (e.getButton() == MouseEvent.BUTTON3)
					flock.setCooperative(false);
				else if ((e.getModifiers() & MouseEvent.SHIFT_MASK) != 0)
					flock.multiply();
				else
					flock.setScared(true);
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				flock.setScared(false);
				flock.setCooperative(true);
			}
		});
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		// Flock space will resize automatically when resizing the applet.
		flock.size.height = getHeight();
		flock.size.width = getWidth();

		flock.iteration(step);
		canvas.repaint(step / 2);

		long now = System.currentTimeMillis();
		if (now - prev - step < step / 5) {
			if (step > 5)
				step = step / 2;
			timer.setDelay(step);
		}
		prev = now;
	}
}
