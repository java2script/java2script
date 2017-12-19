package com.polytopemedia.colorfactory;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import javax.imageio.ImageIO;

public class ImageColorFactory implements PlanarColorFactory{
	
	private BufferedImage im;
	private final boolean repeat;
	private final Color bg;

	public ImageColorFactory (URL imageURL, Color bg) throws IOException{
		this.bg = bg;
		this.repeat = bg == null;
		im = ImageIO.read(imageURL);
	}

	public ImageColorFactory (InputStream stream, Color bg) throws IOException{
		this.bg = bg;
		this.repeat = bg == null;
		im = ImageIO.read(stream);
	}

	public Color getColor(double x, double y) {
		if (repeat) {
			x = x%1;
			y = y%1;
			while (x < 0) x++;
			while (x >= 1) x--;
			while (y < 0) y++;
			while (y >= 1) y--;
		}
		if (x < 0 || x >= 1 || y < 0 || y >= 1) {
			return bg;
		}
		x *= (im.getWidth()-1);
		y *= (im.getHeight()-1);
		int ix = (int)(Math.floor(x));
		int iy = (int)(Math.floor(y));
		int jx = ix+1;
		int jy = iy+1;
		double tx = x-ix;
		double ty = y-iy;
		float[] f00 = extractColor(ix, iy);
		float[] f01 = extractColor(ix, jy);
		float[] f10 = extractColor(jx, iy);
		float[] f11 = extractColor(jx, jy);
		float[] f = new float[f00.length];
		for (int i=0; i<f.length; i++) {
			f[i] = (float) (tx*ty*f11[i]+tx*(1-ty)*f10[i]+(1-tx)*ty*f01[i]+(1-tx)*(1-ty)*f00[i]);
		}
		return new Color(f[0],f[1],f[2]);
	}

	private float[] extractColor(int ix, int iy) {
		return new Color(im.getRGB(ix, iy)).getColorComponents(null);
	}

}
