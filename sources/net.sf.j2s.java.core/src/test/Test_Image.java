package test;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.color.ColorSpace;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.ComponentColorModel;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferByte;
import java.awt.image.DataBufferUShort;
import java.awt.image.IndexColorModel;
import java.awt.image.MemoryImageSource;
import java.awt.image.PackedColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;
import java.net.URL;
import java.util.Arrays;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.SwingUtilities;

import sun.awt.image.PixelConverter;

/**
 * Check for fields initialization timing.
 * 
 * @author RM
 *
 */
public class Test_Image extends Test_ {

	public static void main(String[] args) {
		
		System.err.println("TODO: testSource and testRead are not working!");
		testPacked();  
		testSource();
		testGray();
		testRead();
		testWrite();

//		System.out.println("Test_Image OK");
	}

	@SuppressWarnings("unused")
	private static void testSource() {
		try {
			int[] pixels = new int[400];
			for (int i = 0; i < 400; i++)
				pixels[i] = (int) (Math.random() > 0.5 ? 0xFFFF00FF : 0xFF00FF00);
//		{ 0xFFFF0000, 0xFF00FF00, 0xFF0000FF, 
//				0xFFFF00FF, 0xFF00FFFF, 0xFFFFFF00 };
			MemoryImageSource m = new MemoryImageSource(20, 20, pixels, 0, 20);
			Image img = Toolkit.getDefaultToolkit().createImage(m);
			System.out.println("image source state is " + getImageState((BufferedImage) img));
			Graphics g = img.getGraphics();
			g.dispose();
			showImage(img);
		} catch (Exception e) {
			// In Java this is a sun.awt.image.ToolkitImage. It does not support
			// getGraphics.
		}

	}

	private static void showImage(Image img) {
		/**
		 * @j2sNative 
		 * if (img.秘canvas) {
		 * document.body.appendChild(img.秘canvas);
		 * document.body.appendChild(document.createElement("br"));
		 * }
		 */

		System.out.println(img);
		
	}

	static String getImageState(BufferedImage img) {
		return (/** @j2sNative 1 ? img.getStateString$() : */"?");
	}
	

	private static void testRead() {
		try {
			URL url = Test_Image.class.getResource("video_image.png");
			BufferedImage img0 = ImageIO.read(url);
			System.out.println("image state after loading image is " + getImageState(img0));
			assert(img0.getWidth() == 1250);
			// invokeAndWait will work only in Java
			SwingUtilities.invokeLater(new Runnable() {

				@Override
				public void run() {
					BufferedImage img = img0;

					int[] buf = new int[]{0xFFFF0000, 0xFF00FF00, 0xFF0000FF,0,0,0,0,0,0,0};
					
					// getRGB and setRGB
					System.out.println("image state before getRGB is " + getImageState(img));
					img.getRGB(0, 0, 0, 0, buf, 0, 1250);
					System.out.println("image state after getRGB is " + getImageState(img));
					System.out.println(Arrays.toString(buf));
					img.setRGB(30, 0, 3, 1,  buf, 0, 1250);
					System.out.println("image state after setRGB is " + getImageState(img));
					img.getRGB(30, 0, 10, 1, buf, 0, 1250);
					System.out.println("image state after getRGB is " + getImageState(img));
					System.out.println(Arrays.toString(buf));
					System.out.println("must be true: " + Arrays.toString(buf).equals("[-65536, -16711936, -16776961, -15449002, -15182999, -14917253, -14651507, -14319969, -14054222, -13788219]"));

					img.getRGB(30, 0, 10, 1, buf, 0, 1250);
					System.out.println("[30:39]=" +Arrays.toString(buf));
					
					// paint after raster setRGB
					Graphics g = img.getGraphics();
					System.out.println("image state after graphics is " + getImageState(img));
					g.setColor(Color.RED);
				    // Note that in JavaScript only, this rectangle will be antialized in the last red pixel.
					g.drawRect(30, 0, 5, 5);
					g.dispose();
					System.out.println("image state after dispose is " + getImageState(img));

					
					showImage(img);

					// getRGB after paint
					
					img.getRGB(30, 0, 10, 1, buf, 0, 1250);
					System.out.println("image state after paint is " + getImageState(img));
					System.out.println(Arrays.toString(buf));

					// setRGB after paint
					buf = new int[10000];
					for (int i = 0; i < 10000; i++){
						buf[i] = 0xFF00FF00;
					}
					img.setRGB(0,0,0xFFFFFFFF);
					img.setRGB(130, 130, 100, 100,  buf, 0, 100);
					img.flush(); // this is necessary if no further painting is done

					// drawing into another image
					BufferedImage img1 = new BufferedImage(200,100, BufferedImage.TYPE_INT_ARGB);
					g = img1.getGraphics();
					g.drawImage(img, 0, 0, 125, 72, null);
					g.dispose();
					showImage(img1);

					
					// painting after setRGB
					g = img.getGraphics();
					g.drawRect(100, 100, 15, 15);
					g.dispose();
					System.out.println("image state after setRGB is " + getImageState(img));
					System.out.println(Arrays.toString(buf));
					System.out.println(img);
					
					
				}

			});
			
		} catch (Exception e) {
			e.printStackTrace();
			assert(false);
		}
		
		// TODO Auto-generated method stub
		
	}

	private static void testWrite() {
		// TODO Auto-generated method stub
		
	}

	private static void testGray() {
		BufferedImage image = new BufferedImage(100, 100, BufferedImage.TYPE_USHORT_GRAY);
		ColorModel cm = image.getColorModel();

		// Tests stolen buffer, though it is not used.

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

		int[] pixels = new int[10000];
		for (int i = 0; i < 10000; i++) {
			int pixel = (int) ((i % 100) * 2.55);
			pixels[i] = ((((((0xff << 8) | pixel) << 8) | pixel) << 8) | pixel); // ((i % 100)*0xFFFFFF/100) |
																					// 0xFF000000;//Math.random() *
																					// 0xFFFFFF);
		}
		image.setRGB(0, 0, 100, 100, pixels, 0, 100);

		// test to send color to a gray-scale image
		Graphics g = image.getGraphics();
		g.setColor(Color.green);
		System.out.println(Integer.toHexString(g.getColor().getRGB()));
		g.fillRect(25, 25, 50, 50);
		showImage(image);
		if (!GraphicsEnvironment.isHeadless()) {
			JFrame f = new JFrame();
			f.add(new JLabel(new ImageIcon(image)));
			f.pack();
			f.show();
		}
	}

	private static void testPacked() {
		
		int nx = 4, ny = 4;
	    int len = ((nx+7)/8)*ny; // each row starts on a byte boundary
	    byte[] packedData = new byte[len];
	    for (int i = 0; i < len; i++) {
	    	packedData[i] = (byte) i;
	    }
	    DataBuffer databuffer = new DataBufferByte(packedData, len);
	    int bitsPerPixel = 1;
	    WritableRaster raster = Raster.createPackedRaster(databuffer, nx, ny, bitsPerPixel, null);
	    // default colors are red and blue
	    int arrayLength = 2;
	    ColorModel colorModel = new IndexColorModel(bitsPerPixel, arrayLength, 
	    		new byte[] {(byte) 255, (byte) 0}, 
	    		new byte[] {(byte) 0, (byte) 0}, 
	    		new byte[] {(byte) 0, (byte) 255});
	    BufferedImage image = new BufferedImage(colorModel, raster, false, null);
	
	    dumpImage(image, nx, ny);
	    DataBuffer buf = image.getRaster().getDataBuffer();
	    byte[] data = ((DataBufferByte) buf).getData();
	    System.out.println(Arrays.toString(data));
	    Graphics2D g = image.createGraphics();
	    g.setColor(new Color(0,0,255));
	    g.fillRect(0, 0, 100, 100);
	    System.out.println("after drawing, not updated " + Arrays.toString(data));	    
	    g.dispose();
	    System.out.println("after disposing, updated " + Arrays.toString(data));	    
	    image.flush();
	    System.out.println("after flush, updated " + Arrays.toString(data));	    
	    dumpImage(image, nx, ny);
	}

	private static void dumpImage(BufferedImage image, int nx, int ny) {
		System.out.println("----------------");
		int n = nx * ny;
		int[] pixels = new int[n * 4];
		for (int i = 0, pt = 0; i < n; i++, pt += 4) {

			image.getColorModel().getComponents(i, pixels, pt);
			System.out.println(i + " " + nx + " " + ny + ": " + pixels[pt] + " " + pixels[pt + 1] + " " + pixels[pt + 2]
					+ " " + pixels[pt + 3]);
		}
		System.out.println("===========");
		for (int j = 0; j < ny; j++) {
			for (int i = 0; i < nx; i++) {
				System.out.print("\t" + Integer.toHexString(image.getRGB(i, j)));
			}
			System.out.println("");
		}
	}

}
