package test;

import java.awt.color.ColorSpace;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.ComponentColorModel;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferByte;
import java.awt.image.DataBufferUShort;
import java.awt.image.IndexColorModel;
import java.awt.image.PackedColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;

import sun.awt.image.PixelConverter;

/**
 * Check for fields initialization timing.
 * 
 * @author RM
 *
 */
public class Test_Image extends Test_ {

	public static void main(String[] args) {
		
		testPacked();
		testGray();

		System.out.println("Test_Image OK");
	}

	private static void testGray() {
	    BufferedImage image = new BufferedImage(100,100, BufferedImage.TYPE_USHORT_GRAY);
	    ColorModel cm = image.getColorModel();
	    short[] bwData = ((DataBufferUShort) image.getRaster().getDataBuffer()).getData();
	    ColorSpace x = image.getColorModel().getColorSpace();
	    System.out.println(cm instanceof PackedColorModel);
	    System.out.println(cm instanceof ColorModel);
	    System.out.println(cm instanceof ComponentColorModel);
	    
	    
	    PixelConverter pc = PixelConverter.UshortGray.instance;
	    int rgb, p;

	    rgb = 0xFFFFFF00;
	    image.setRGB(0, 0, rgb);
	    p = image.getRGB(0, 0);
	    System.out.println(p + " " + Integer.toHexString(rgb));
	    rgb = pc.pixelToRgb(p, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));

	    rgb = 0xFFFF0000;
	    p = pc.rgbToPixel(rgb, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));
	    rgb = pc.pixelToRgb(p, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));

	    rgb = 0xFF00FF00;
	    p = pc.rgbToPixel(rgb, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));
	    rgb = pc.pixelToRgb(p, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));

	    rgb = 0xFF0000FF;
	    p = pc.rgbToPixel(rgb, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));
	    rgb = pc.pixelToRgb(p, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));

	    rgb = 0xFFFF0000;
	    p = pc.rgbToPixel(rgb, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));
	    rgb = pc.pixelToRgb(p, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));
	    

	    rgb = 0xFF4c4c4c;
	    p = pc.rgbToPixel(rgb, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));
	    rgb = pc.pixelToRgb(p, null);
	    System.out.println(p + " " + Integer.toHexString(rgb));

	}

	private static void testPacked() {
		
		int nx = 4, ny = 4;
	    int len = ((nx+7)/8)*ny; // each row starts on a byte boundary
	    byte[] packedData = new byte[len];
	    for (int i = 0; i < len; i++) {
	    	packedData[i] = (byte) i;
	    }
	    DataBuffer databuffer = new DataBufferByte(packedData, len);
	    WritableRaster raster = Raster.createPackedRaster(databuffer, nx, ny, 1, null);
	    // default colors are red and blue
	    ColorModel colorModel = new IndexColorModel(1, 2, new byte[] {(byte) 255, (byte) 0}, new byte[] {(byte) 0, (byte) 0}, new byte[] {(byte) 0, (byte) 255});
	    BufferedImage image = new BufferedImage(colorModel, raster, false, null);
	    
		int n = nx * ny;
		int[] pixels = new int[n * 4];
	    for (int i = 0, pt = 0; i < n; i++, pt+=4) {
	    	image.getColorModel().getComponents(i, pixels, pt);
	    	System.out.println(pixels[pt] + " " + pixels[pt+1] + " " + pixels[pt+2] + " " + pixels[pt+3]);
	    }
	}

}
