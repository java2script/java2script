package test;

import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferByte;
import java.awt.image.IndexColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;

/**
 * Check for fields initialization timing.
 * 
 * @author RM
 *
 */
public class Test_Image extends Test_ {

	public static void main(String[] args) {
		
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

		System.out.println("Test_Image OK");
	}

}
