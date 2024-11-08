/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2012-09-11 19:29:26 -0500 (Tue, 11 Sep 2012) $
 * $Revision: 17556 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2002-2005  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
package swingjs;

import javajs.util.V3;
import java.awt.event.MouseEvent;

/**
 * JavaScript interface for two-point gesture
 * 
 */
public class JSMouse2 {

	private JSMouse mouse;

	public JSMouse2() {
		// for reflection
	}
		
		
	public JSMouse2 set(JSMouse mouse) {
		this.mouse = mouse;
		return this;
	}
	
	/**
	 * 
	 * called by JSmol as processTwoPointGesture(canvas.touches);
	 * 
	 * @param touches
	 *          [[finger1 touches],[finger2 touches]] where finger touches are
	 *          [[x0,y0],[x1,y1],[x2,y2],...]
	 * 
	 */
	public void processTwoPointGesture(float[][][] touches) {
		float[][] t1 = touches[0];
		float[][] t2 = touches[1];
		int nt = t1.length;
		if (nt < 2)
			return;
		boolean isClick = (nt > t2.length);
		float[] t1first = t1[0];
		float x1first = t1first[0];
		float y1first = t1first[1];
		
		if (isClick) {			
			mouse.clicked(System.currentTimeMillis(), (int) x1first, (int) y1first, 0, 2);
			return;
		}
		float[] t1last = t1[nt - 1];
		float x1last = t1last[0];
		float y1last = t1last[1];
		float dx1 = x1last - x1first;
		float dy1 = y1last - y1first;
		V3 v1 = V3.new3(dx1, dy1, 0);
		float d1 = v1.length();
		float[] t2first = t2[0];
		float[] t2last = t2[nt - 1];
		float x2first = t2first[0];
		float x2last = t2last[0];
		float dx2 = x2last - x2first;
		float y2first = t2first[1];
		float y2last = t2last[1];
		float dy2 = y2last - y2first;
		V3 v2 = V3.new3(dx2, dy2, 0);
		float d2 = v2.length();
		// rooted finger --> zoom (at this position, perhaps?)
		if (d1 < 1 || d2 < 1)
			return;
		v1.normalize();
		v2.normalize();
		float cos12 = (v1.dot(v2));
		// cos12 > 0.8 (same direction) will be required to indicate drag
		// cos12 < -0.8 (opposite directions) will be required to indicate zoom or
		// rotate
		if (cos12 > 0.8) {
			// two co-aligned motions -- translate
			// just use finger 1, last move
			int deltaX = (int) (x1last - t1[t1.length - 2][0]);
			int deltaY = (int) (y1last - t1[t1.length - 2][1]);
			mouse.translateXYBy(deltaX, deltaY);
		} else if (cos12 < -0.8) {
			// two classic zoom motions -- zoom
			v1 = V3.new3(x2first - x1first, y2first - y1first, 0);
			v2 = V3.new3(x2last - x1last, y2last - y1last, 0);
			float dx = v2.length() - v1.length();
			mouse.wheeled(System.currentTimeMillis(), 0, 0, dx < 0 ? -1 : 1, MouseEvent.MOUSE_WHEEL);
		}
	}

}
