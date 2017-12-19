package com.falstad.circuit;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.event.ItemEvent;
import java.awt.image.BufferedImage;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferInt;
import java.awt.image.MemoryImageSource;
import java.util.StringTokenizer;

import a2s.PopupMenu;

class Scope {
	final int FLAG_YELM = 32;
	static final int VAL_POWER = 1;
	static final int VAL_IB = 1;
	static final int VAL_IC = 2;
	static final int VAL_IE = 3;
	static final int VAL_VBE = 4;
	static final int VAL_VBC = 5;
	static final int VAL_VCE = 6;
	static final int VAL_R = 2;
	double minV[], maxV[], minMaxV;
	double minI[], maxI[], minMaxI;
	int scopePointCount = 128;
	int ptr, ctr, speed, position;
	int value, ivalue;
	String text;
	Rectangle rect;
	boolean showI, showV, showMax, showMin, showFreq, lockScale, plot2d, plotXY;
	CircuitElm elm, xElm, yElm;
	MemoryImageSource imageSource;
	Image image;
	int pixels[];
	int draw_ox, draw_oy;
	float dpixels[];
	CirSim sim;

	Scope(CirSim s) {
		rect = new Rectangle();
		reset();
		sim = s;
	}

	void showCurrent(boolean b) {
		showI = b;
		value = ivalue = 0;
	}

	void showVoltage(boolean b) {
		showV = b;
		value = ivalue = 0;
	}

	void showMax(boolean b) {
		showMax = b;
	}

	void showMin(boolean b) {
		showMin = b;
	}

	void showFreq(boolean b) {
		showFreq = b;
	}

	void setLockScale(boolean b) {
		lockScale = b;
	}

	void resetGraph() {
		scopePointCount = 1;
		while (scopePointCount <= rect.width)
			scopePointCount *= 2;
		minV = new double[scopePointCount];
		maxV = new double[scopePointCount];
		minI = new double[scopePointCount];
		maxI = new double[scopePointCount];
		ptr = ctr = 0;
		allocImage();
	}

	boolean active() {
		return elm != null;
	}

	void reset() {
		resetGraph();
		minMaxV = 5;
		minMaxI = .1;
		speed = 64;
		showI = showV = showMax = true;
		showFreq = lockScale = showMin = false;
		plot2d = false;
		// no showI for Output
		if (elm != null
				&& (elm instanceof OutputElm || elm instanceof LogicOutputElm || elm instanceof ProbeElm))
			showI = false;
		value = ivalue = 0;
		if (elm instanceof TransistorElm)
			value = VAL_VCE;
	}

	void setRect(Rectangle r) {
		rect = r;
		resetGraph();
	}

	int getWidth() {
		return rect.width;
	}

	int rightEdge() {
		return rect.x + rect.width;
	}

	void setElm(CircuitElm ce) {
		elm = ce;
		reset();
	}

	void timeStep() {
		if (elm == null)
			return;
		double v = elm.getScopeValue(value);
		if (v < minV[ptr])
			minV[ptr] = v;
		if (v > maxV[ptr])
			maxV[ptr] = v;
		double i = 0;
		if (value == 0 || ivalue != 0) {
			i = (ivalue == 0) ? elm.getCurrent() : elm.getScopeValue(ivalue);
			if (i < minI[ptr])
				minI[ptr] = i;
			if (i > maxI[ptr])
				maxI[ptr] = i;
		}

		if (plot2d && dpixels != null) {
			boolean newscale = false;
			while (v > minMaxV || v < -minMaxV) {
				minMaxV *= 2;
				newscale = true;
			}
			double yval = i;
			if (plotXY)
				yval = (yElm == null) ? 0 : yElm.getVoltageDiff();
			while (yval > minMaxI || yval < -minMaxI) {
				minMaxI *= 2;
				newscale = true;
			}
			if (newscale)
				clear2dView();
			double xa = v / minMaxV;
			double ya = yval / minMaxI;
			int x = (int) (rect.width * (1 + xa) * .499);
			int y = (int) (rect.height * (1 - ya) * .499);
			drawTo(x, y);
		} else {
			ctr++;
			if (ctr >= speed) {
				ptr = (ptr + 1) & (scopePointCount - 1);
				minV[ptr] = maxV[ptr] = v;
				minI[ptr] = maxI[ptr] = i;
				ctr = 0;
			}
		}
	}

	void drawTo(int x2, int y2) {
		if (draw_ox == -1) {
			draw_ox = x2;
			draw_oy = y2;
		}
		// need to draw a line from x1,y1 to x2,y2
		if (draw_ox == x2 && draw_oy == y2) {
			dpixels[x2 + rect.width * y2] = 1;
		} else if (CircuitElm.abs(y2 - draw_oy) > CircuitElm.abs(x2 - draw_ox)) {
			// y difference is greater, so we step along y's
			// from min to max y and calculate x for each step
			double sgn = CircuitElm.sign(y2 - draw_oy);
			int x, y;
			for (y = draw_oy; y != y2 + sgn; y += sgn) {
				x = draw_ox + (x2 - draw_ox) * (y - draw_oy) / (y2 - draw_oy);
				dpixels[x + rect.width * y] = 1;
			}
		} else {
			// x difference is greater, so we step along x's
			// from min to max x and calculate y for each step
			double sgn = CircuitElm.sign(x2 - draw_ox);
			int x, y;
			for (x = draw_ox; x != x2 + sgn; x += sgn) {
				y = draw_oy + (y2 - draw_oy) * (x - draw_ox) / (x2 - draw_ox);
				dpixels[x + rect.width * y] = 1;
			}
		}
		draw_ox = x2;
		draw_oy = y2;
	}

	void clear2dView() {
		for (int i = dpixels.length; --i >= 0;)
			dpixels[i] = 0;
		draw_ox = draw_oy = -1;
	}

	void adjustScale(double x) {
		minMaxV *= x;
		minMaxI *= x;
	}

	void draw2d(Graphics g) {
		
		if (pixels == null || dpixels == null)
			return;
		int col = ((sim.printableCheckItem.getState()) ? 0xFFFFFFFF : 0);
		
		for (int i = pixels.length; --i >= 0;)
			pixels[i] = col;
		for (int off = rect.width * (rect.height / 2), i = rect.width; --i >= 0;)
			pixels[i + off] = 0xFF00FF00 ;
		int ycol = ((plotXY) ? 0xFF00FF00 : 0xFFFFFF00) ;
		for (int w = rect.width, w2 = rect.width / 2, i = rect.height; --i >= 0;)
			pixels[w2 + w * i] = ycol;
		for (int i = pixels.length; --i >= 0;) {
			int q = (int) (255 * dpixels[i]);
			if (q > 0)
				pixels[i] = (0xFF000000 | (0x10101 * q)) ;
			dpixels[i] *= .997;
		}
		
		g.drawImage(image, rect.x, rect.y, null);
		g.setColor(CircuitElm.whiteColor);
		g.fillOval(rect.x + draw_ox - 2, rect.y + draw_oy - 2, 5, 5);
		int yt = rect.y + 10;
		int x = rect.x;
		if (text != null && rect.y + rect.height > yt + 5) {
			g.drawString(text, x, yt);
			yt += 15;
		}
	}

	void draw(Graphics g) {
		if (elm == null)
			return;
		if (plot2d) {
			draw2d(g);
			return;
		}
		if (pixels == null)
			return;
		int rw = rect.width;
		int rh = rect.height;
		int plen = pixels.length;
		int spcm1 = scopePointCount - 1;

		int col = ((sim.printableCheckItem.getState()) ? 0xFFFFFFFF : 0) ;
		for (int i = plen; --i >= 0;)
			pixels[i] = col;
		int x = 0;
		int maxy = (rect.height - 1) / 2;
		int y = maxy;

		boolean gotI = false;
		boolean gotV = false;
		int minRange = 4;
		double realMaxV = -1e8;
		double realMaxI = -1e8;
		double realMinV = 1e8;
		double realMinI = 1e8;
		int curColor = 0xFFFFFF00 ;
		int voltColor = (value > 0 ? 0xFFFFFFFF : 0xFF00FF00) ;
		if (sim.scopeSelected == -1 && elm == sim.mouseElm)
			curColor = voltColor = 0xFF00FFFF ;
		int ipa = ptr + scopePointCount - rw;
		for (int i = rw; --i >= 0;) {
			int ip = (i + ipa) & spcm1;
			while (maxV[ip] > minMaxV)
				minMaxV *= 2;
			while (minV[ip] < -minMaxV)
				minMaxV *= 2;
			while (maxI[ip] > minMaxI)
				minMaxI *= 2;
			while (minI[ip] < -minMaxI)
				minMaxI *= 2;
		}

		double gridStep = 1e-8;
		double gridMax = (showI ? minMaxI : minMaxV);
		while (gridStep * 100 < gridMax)
			gridStep *= 10;
		if (maxy * gridStep / gridMax < .3)
			gridStep = 0;

		boolean sublines = (maxy * gridStep / gridMax > 3);
		boolean showIandV = ((showI && showV) || gridStep == 0);
		for (int ll = -100; ll <= 100; ll++) {
			// don't show gridlines if plotting multiple values,
			// or if lines are too close together (except for center line)
			if (ll != 0 && showIandV)
				continue;
			int yl = maxy - (int) (maxy * ll * gridStep / gridMax);
			if (yl < 0 || yl >= rh - 1)
				continue;
			col = (ll == 0 ? 0xFF909090 : 0xFF404040) ;
			if (ll % 10 != 0) {
				col = 0xFF101010 ;
				if (!sublines)
					continue;
			}
			for (int ii = 0, off = yl * rw; ii < rw; ii++)
				pixels[ii + off] = col;
		}

		gridStep = 1e-15;
		double ts = sim.timeStep * speed;
		while (gridStep < ts * 5)
			gridStep *= 10;
		double tstart = sim.t - sim.timeStep * speed * rw;
		double tx = sim.t - (sim.t % gridStep);
//		int first = 1;
		for (int  ll = 0;; ll++) {
			double tl = tx - gridStep * ll;
			int gx = (int) ((tl - tstart) / ts);
			if (gx < 0)
				break;
			if (gx >= rw)
				continue;
			if (tl < 0)
				continue;
			col = 0xFF202020 ; // short-time marks (dark, almost black)
//			first = 0;
			if (((tl + gridStep / 4) % (gridStep * 10)) < gridStep) {
				col = 0xFF909090 ;  // traveling line - every 10th
				if (((tl + gridStep / 4) % (gridStep * 100)) < gridStep)
					col = 0xFF4040D0 ; // every 100th
			}
			for (int i = 0; i < plen; i += rw)
				pixels[i + gx] = col;
		}

		// these two loops are pretty much the same, and should be
		// combined!
		double f = maxy / minMaxI;
		if (value == 0 && showI) {
			int ox = -1, oy = -1;
			for (int i = 0; i != rw; i++) {
				int ip = (i + ipa) & spcm1;
				int xi = x + i;
				double minip = minI[ip];
				double maxip = maxI[ip];
				int miniy = (int) (f * minip);
				int maxiy = (int) (f * maxip);
				if (maxip > realMaxI)
					realMaxI = maxip;
				if (minip < realMinI)
					realMinI = minip;
				if (miniy <= maxy) {
					if (miniy < -minRange || maxiy > minRange)
						gotI = true;
					if (ox != -1) {
						if (miniy == oy && maxiy == oy)
							continue;
						for (int j = ox, off = rw * (y - oy); j != xi; j++)
							pixels[j + off] = curColor;
						ox = oy = -1;
					}
					if (miniy == maxiy) {
						ox = x + i;
						oy = miniy;
						continue;
					}
					for (int j = miniy; j <= maxiy; j++)
						pixels[xi + rw * (y - j)] = curColor;
				}
			}
////			if (ox != -1)
		///		for (int j = ox; j != xi; j++)
				///	pixels[j + rect.width * (y - oy)] = curColor;
		}
		if (value != 0 || showV) {
			int ox = -1, oy = -1;
			for (int i = 0; i != rw; i++) {
				int ip = (i + ipa) & spcm1;
				int xi = x + i;
				double minip = minI[ip];
				double maxip = maxI[ip];
				int minvy = (int) (f * minip);
				int maxvy = (int) (f * maxip);
				if (maxip > realMaxV)
					realMaxV = maxip;
				if (minip < realMinV)
					realMinV = minip;
				if (minvy <= maxy) {
					if (minvy < -minRange || maxvy > minRange)
						gotV = true;
					if (ox != -1) {
						if (minvy == oy && maxvy == oy)
							continue;
						for (int j = ox, off = rw * (y - oy); j != xi; j++)
							pixels[j + off] = voltColor;
						ox = oy = -1;
					}
					if (minvy == maxvy) {
						ox = xi;
						oy = minvy;
						continue;
					}
					for (int j = minvy; j <= maxvy; j++)
						pixels[xi + rw * (y - j)] = voltColor;
				}
			}
////			if (ox != -1)
		////		for (int j = ox; j != xi; j++)
				////	pixels[j + rect.width * (y - oy)] = voltColor;
		}
		double freq = 0;
		if (showFreq) {
			// try to get frequency
			// get average
			double avg = 0;
			for (int i = 0; i != rw; i++) {
				int ip = (i + ipa) & spcm1;
				avg += minV[ip] + maxV[ip];
			}
			avg /= (rw * 2);
			int state = 0;
			double thresh = avg * .05;
			int oi = 0;
			double avperiod = 0;
			int periodct = -1;
			double avperiod2 = 0;
			// count period lengths
			for (int i = 0; i < rw; i++) {
				int ip = (i + ipa) & spcm1;
				double q = maxV[ip] - avg;
				int os = state;
				if (q < thresh)
					state = 1;
				else if (q > -thresh)
					state = 2;
				if (state == 2 && os == 1) {
					int pd = i - oi;
					oi = i;
					// short periods can't be counted properly
					if (pd < 12)
						continue;
					// skip first period, it might be too short
					if (periodct >= 0) {
						avperiod += pd;
						avperiod2 += pd * pd;
					}
					periodct++;
				}
			}
			avperiod /= periodct;
			avperiod2 /= periodct;
			double periodstd = Math.sqrt(avperiod2 - avperiod * avperiod);
			freq = 1 / (avperiod * sim.timeStep * speed);
			// don't show freq if standard deviation is too great
			if (periodct < 1 || periodstd > 2)
				freq = 0;
			// System.out.println(freq + " " + periodstd + " " + periodct);
		}
		g.drawImage(image, rect.x, rect.y, null);
		g.setColor(CircuitElm.whiteColor);
		int yt = rect.y + 10;
		x += rect.x;
		if (showMax) {
			if (value != 0)
				g.drawString(CircuitElm.getUnitText(realMaxV, elm.getScopeUnits(value)), x, yt);
			else if (showV)
				g.drawString(CircuitElm.getVoltageText(realMaxV), x, yt);
			else if (showI)
				g.drawString(CircuitElm.getCurrentText(realMaxI), x, yt);
			yt += 15;
		}
		if (showMin) {
			int ym = rect.y + rh - 5;
			if (value != 0)
				g.drawString(CircuitElm.getUnitText(realMinV, elm.getScopeUnits(value)), x, ym);
			else if (showV)
				g.drawString(CircuitElm.getVoltageText(realMinV), x, ym);
			else if (showI)
				g.drawString(CircuitElm.getCurrentText(realMinI), x, ym);
		}
		if (text != null && rect.y + rh > yt + 5) {
			g.drawString(text, x, yt);
			yt += 15;
		}
		if (showFreq && freq != 0 && rect.y + rh > yt + 5)
			g.drawString(CircuitElm.getUnitText(freq, "Hz"), x, yt);
		if (ptr > 5 && !lockScale) {
			if (!gotI && minMaxI > 1e-4)
				minMaxI /= 2;
			if (!gotV && minMaxV > 1e-4)
				minMaxV /= 2;
		}
	}

	void speedUp() {
		if (speed > 1) {
			speed /= 2;
			resetGraph();
		}
	}

	void slowDown() {
		speed *= 2;
		resetGraph();
	}

	PopupMenu getMenu() {
		if (elm == null)
			return null;
		if (elm instanceof TransistorElm) {
			sim.scopeIbMenuItem.setState(value == VAL_IB);
			sim.scopeIcMenuItem.setState(value == VAL_IC);
			sim.scopeIeMenuItem.setState(value == VAL_IE);
			sim.scopeVbeMenuItem.setState(value == VAL_VBE);
			sim.scopeVbcMenuItem.setState(value == VAL_VBC);
			sim.scopeVceMenuItem.setState(value == VAL_VCE && ivalue != VAL_IC);
			sim.scopeVceIcMenuItem.setState(value == VAL_VCE && ivalue == VAL_IC);
			return sim.transScopeMenu;
		} else {
			sim.scopeVMenuItem.setState(showV && value == 0);
			sim.scopeIMenuItem.setState(showI && value == 0);
			sim.scopeMaxMenuItem.setState(showMax);
			sim.scopeMinMenuItem.setState(showMin);
			sim.scopeFreqMenuItem.setState(showFreq);
			sim.scopePowerMenuItem.setState(value == VAL_POWER);
			sim.scopeVIMenuItem.setState(plot2d && !plotXY);
			sim.scopeXYMenuItem.setState(plotXY);
			sim.scopeSelectYMenuItem.setEnabled(plotXY);
			sim.scopeResistMenuItem.setState(value == VAL_R);
			sim.scopeResistMenuItem.setEnabled(elm instanceof MemristorElm);
			return sim.scopeMenu;
		}
	}

	void setValue(int x) {
		reset();
		value = x;
	}

	String dump() {
		if (elm == null)
			return null;
		int flags = (showI ? 1 : 0) | (showV ? 2 : 0) | (showMax ? 0 : 4)
				| // showMax used to be always on
				(showFreq ? 8 : 0) | (lockScale ? 16 : 0) | (plot2d ? 64 : 0)
				| (plotXY ? 128 : 0) | (showMin ? 256 : 0);
		flags |= FLAG_YELM; // yelm present
		int eno = sim.locateElm(elm);
		if (eno < 0)
			return null;
		int yno = yElm == null ? -1 : sim.locateElm(yElm);
		String x = "o " + eno + " " + speed + " " + value + " " + flags + " "
				+ minMaxV + " " + minMaxI + " " + position + " " + yno;
		if (text != null)
			x += " " + text;
		return x;
	}

	void undump(StringTokenizer st) {
		reset();
		int e = new Integer(st.nextToken()).intValue();
		if (e == -1)
			return;
		elm = sim.getElm(e);
		speed = new Integer(st.nextToken()).intValue();
		value = new Integer(st.nextToken()).intValue();
		int flags = new Integer(st.nextToken()).intValue();
		minMaxV = new Double(st.nextToken()).doubleValue();
		minMaxI = new Double(st.nextToken()).doubleValue();
		if (minMaxV == 0)
			minMaxV = .5;
		if (minMaxI == 0)
			minMaxI = 1;
		text = null;
		yElm = null;
		try {
			position = new Integer(st.nextToken()).intValue();
			int ye = -1;
			if ((flags & FLAG_YELM) != 0) {
				ye = new Integer(st.nextToken()).intValue();
				if (ye != -1)
					yElm = sim.getElm(ye);
			}
			while (st.hasMoreTokens()) {
				if (text == null)
					text = st.nextToken();
				else
					text += " " + st.nextToken();
			}
		} catch (Exception ee) {
		}
		showI = (flags & 1) != 0;
		showV = (flags & 2) != 0;
		showMax = (flags & 4) == 0;
		showFreq = (flags & 8) != 0;
		lockScale = (flags & 16) != 0;
		plot2d = (flags & 64) != 0;
		plotXY = (flags & 128) != 0;
		showMin = (flags & 256) != 0;
	}

	void allocImage() {
		pixels = null;
		int w = rect.width;   // BH SwingJS
		int h = rect.height;  // BH SwingJS
		int n = w * h; 				// BH SwingJS
		if (w == 0 || h == 0)
			return;
		if (sim.useBufferedImage) {
			try {
				image = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
				DataBuffer db = (DataBuffer) (((BufferedImage) image).getRaster()
						.getDataBuffer());
				DataBufferInt dbi = (DataBufferInt) db;
				pixels = dbi.getData();
				/*
				 * simulate the following code using reflection: dbimage = new
				 * BufferedImage(d.width, d.height, BufferedImage.TYPE_INT_RGB);
				 * DataBuffer db = (DataBuffer)(((BufferedImage)dbimage).
				 * getRaster().getDataBuffer()); DataBufferInt dbi = (DataBufferInt) db;
				 * pixels = dbi.getData();
				 */
				// Class biclass = Class.forName("java.awt.image.BufferedImage");
				// Class dbiclass = Class.forName("java.awt.image.DataBufferInt");
				// Class rasclass = Class.forName("java.awt.image.Raster");
				// Constructor cstr = biclass.getConstructor(
				// new Class[] { int.class, int.class, int.class });
				// image = (Image) cstr.newInstance(new Object[] {
				// new Integer(w), new Integer(h),
				// new Integer(BufferedImage.TYPE_INT_RGB)});
				// Method m = biclass.getMethod("getRaster");
				// Object ras = m.invoke(image);
				// Object db = rasclass.getMethod("getDataBuffer").invoke(ras);
				// pixels = (int[])
				// dbiclass.getMethod("getData").invoke(db);
				// pixels = dbi.getData();
			} catch (Exception ee) {
				// ee.printStackTrace();
				System.out.println("BufferedImage failed");
			}
		}
		if (pixels == null) {
			pixels = new int[n];
			for (int i = n; --i >= 0;)
				pixels[i] = 0xFF000000;
			imageSource = new MemoryImageSource(w, h, pixels, 0, w);
			imageSource.setAnimated(true);
			imageSource.setFullBufferUpdates(true);
			image = sim.cv.createImage(imageSource);
		}
		dpixels = new float[n];
		draw_ox = draw_oy = -1;
	}

	void handleMenu(ItemEvent e, Object mi) {
		if (mi == sim.scopeVMenuItem)
			showVoltage(sim.scopeVMenuItem.getState());
		else if (mi == sim.scopeIMenuItem)
			showCurrent(sim.scopeIMenuItem.getState());
		else if (mi == sim.scopeMaxMenuItem)
			showMax(sim.scopeMaxMenuItem.getState());
		else if (mi == sim.scopeMinMenuItem)
			showMin(sim.scopeMinMenuItem.getState());
		else if (mi == sim.scopeFreqMenuItem)
			showFreq(sim.scopeFreqMenuItem.getState());
		else if (mi == sim.scopePowerMenuItem)
			setValue(VAL_POWER);
		else if (mi == sim.scopeIbMenuItem)
			setValue(VAL_IB);
		else if (mi == sim.scopeIcMenuItem)
			setValue(VAL_IC);
		else if (mi == sim.scopeIeMenuItem)
			setValue(VAL_IE);
		else if (mi == sim.scopeVbeMenuItem)
			setValue(VAL_VBE);
		else if (mi == sim.scopeVbcMenuItem)
			setValue(VAL_VBC);
		else if (mi == sim.scopeVceMenuItem)
			setValue(VAL_VCE);
		else if (mi == sim.scopeVceIcMenuItem) {
			plot2d = true;
			plotXY = false;
			value = VAL_VCE;
			ivalue = VAL_IC;
			resetGraph();
		} else if (mi == sim.scopeVIMenuItem) {
			plot2d = sim.scopeVIMenuItem.getState();
			plotXY = false;
			resetGraph();
		} else if (mi == sim.scopeXYMenuItem) {
			plotXY = plot2d = sim.scopeXYMenuItem.getState();
			if (yElm == null)
				selectY();
			resetGraph();
		} else if (mi == sim.scopeResistMenuItem)
			setValue(VAL_R);
	}

	void select() {
		sim.mouseElm = elm;
		if (plotXY) {
			sim.plotXElm = elm;
			sim.plotYElm = yElm;
		}
	}

	void selectY() {
		int e = (yElm == null ? -1 : sim.locateElm(yElm));
		int firstE = e;
		int n = sim.elmList.size();
		while (true) {
			for (e++; e < n; e++) {
				CircuitElm ce = sim.getElm(e);
				switch (ce.getDumpType()) {
				case 'O':
				case 'p':
					if (ce != elm) {
						yElm = ce;
						return;
					}
					break;
				}
			}
			if (firstE == -1)
				return;
			e = firstE = -1;
		}
	}
}
