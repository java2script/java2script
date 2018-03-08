package swingjs;

import java.util.Hashtable;

import javajs.img.BMPDecoder;
import javajs.util.AU;
import java.awt.Image;
import java.awt.image.ColorModel;
import java.awt.image.ImageConsumer;
import swingjs.api.Interface;

/**
 * An image consumer for off-line images.
 * 
 * Not fully elaborated.
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 *
 */
@SuppressWarnings({"unused"})
public class JSImagekit implements ImageConsumer {

	private static final int UNK = -1;
	private static final int PNG = 0;
	private static final int JPG = 1;
	private static final int GIF = 2;
	private static final int BMP = 3;
	private static final int JPG_SOF0 = 0xC0FF;
	private static final int JPG_SOF2 = 0xC2FF;

	/**
	 * Used by JSToolkit.createImage()
	 * 
	 * @see JSToolkit 
	 */
	public JSImagekit() {
		// for reflection
	}

	/**
	 * Create a buffered image that contains the data, at least getting the width
	 * and height of a JPG, GIF, PNG, or BMP file and possibly generating a
	 * JavaScript callback to load the image into an off-screen buffer in order to
	 * finish the job.
	 * 
	 * @param data
	 * @param imageoffset
	 * @param imagelength
	 * @return
	 */
	public JSImage createImageFromBytes(byte[] data, int imageoffset,
			int imagelength, String name) {
		return createImageFromBytesStatic(data, imageoffset, imagelength, name);
	}

	private int width;
	private int height;
	private Hashtable<?, ?> props;
	private ColorModel colorModel;
	private int hints;
	private int x;
	private int y;
	private int off;
	private int scansize;
	private int[] pixels;
	private JSImage jsimage;
	private byte[] pixelBytes;
	
	@Override
	public void imageComplete(int status) {
		// from MemoryImageSource.newPixels()
		// 
		// meaning: "The pixels are ready, so make the image now"
		//
		//TODO: not considering pixelbytes
		//
		jsimage = new JSImage(pixels, width, height, null);
  }

	public Image getCreatedImage() {
		return jsimage;
	}

	@Override
	public void setDimensions(int width, int height) {
		this.width = width;
		this.height = height;
	}

	@Override
	public void setProperties(Hashtable<?, ?> props) {
		this.props = props;
	}

	@Override
	public void setColorModel(ColorModel model) {
		colorModel =  model;
	}

	@Override
	public void setHints(int hintflags) {
		hints = hintflags;
	}

	@Override
	public void setPixels(int x, int y, int w, int h, ColorModel model,
			int[] pixels, int off, int scansize) {
        if(this.pixels == null) {
            colorModel = model;
            this.pixels  = new int[width*height];
        }
        for(int n=0, j = y; n<h; n++, j++) {
          for(int m=0, i = x; m<w; m++, i++) {
             int k = i+j*width;
             this.pixels[k] = pixels[ (j-y)*scansize+(i-x)+off];
          }
        }

//		this.x = x;
//		this.y = y;
//		this.off = off;
//		this.scansize = scansize;
//		this.pixels = pixels;
	}

	@Override
	public void setPixels(int x, int y, int w, int h, ColorModel model,
			byte[] pixels, int off, int scansize) {
		colorModel = model;
		width = w;
		height = h;
		this.x = x;
		this.y = y;
		this.off = off;
		this.scansize = scansize;
		this.pixelBytes = pixels;
		JSUtil.notImplemented("byte-based image pixels");
	}

	private static JSImage createImageFromBytesStatic(byte[] data, int imageoffset,
			int imagelength, String name) {
		int w = 0, h = 0;
		int[] argb = null;
		byte[] b = null;
		String type = null;
		if (data == null) {
			// this is from Component.createImage();
			w = imageoffset;
			h = imagelength;
		} else {
			if (imagelength < 0)
				imagelength = data.length;
		  // not implemented in JavaScript:
			// b = Arrays.copyOfRange(data, imageoffset, imagelength);
			int n = imagelength - imageoffset;
      System.arraycopy(data, imageoffset, b = new byte[n], 0, n);
			if (b.length < 54)
				return null;
			switch (getSourceType(b)) {
			case BMP:
				// just get bytes directly
				BMPDecoder ie = (BMPDecoder) Interface.getInstance(
						"javajs.img.BMPDecoder", true);
				Object[] o = ie.decodeWindowsBMP(b);
				if (o == null || o[0] == null)
					return null;
				w = ((Integer) o[1]).intValue();
				h = ((Integer) o[2]).intValue();
				argb = (int[]) o[0];
				break;
			case JPG:
				int pt = 2;
				while (true) {
					switch (getInt(b, pt)) {
					case JPG_SOF0:
					case JPG_SOF2:
						h = getIntRev(b, pt + 5);
						w = getIntRev(b, pt + 7);
						pt = 0;
						break;
					}
					if (pt == 0)
						break;
					pt += 2 + getIntRev(b, pt + 2);
				}
				type = "jpeg";
				break;
			case PNG:
				w = getLong(b, 16);
				h = getLong(b, 20);
				type = "png";
				break;
			case GIF:
				w = getInt(b, 6);
				h = getInt(b, 8);
				type = "gif";
				break;
			case UNK:
				System.out.println("JSImagekit: Unknown image type: " + b[0] + " "
						+ b[1] + " " + b[2] + " " + b[3]);
				data = null;
				break;
			}
		}
		if (w == 0 || h == 0)
			return null;
		JSImage jsimage = new JSImage(argb, w, h, name); 
		if (data != null && argb == null)
			jsimage.getDOMImage(b, type);
		return jsimage;
	}

	private static int getLong(byte[] b, int pt) {
		return ((b[pt] & 0xFF) << 24) 
				+ ((b[pt + 1] & 0xFF) << 16) 
				+ ((b[pt + 2] & 0xFF) << 8) 
				+ (b[pt + 3] & 0xFF);
	}

	private static int getInt(byte[] b, int pt) {
		return (b[pt]& 0xFF) + ((b[pt + 1] & 0xFF)<< 8);
	}

	private static int getIntRev(byte[] b, int pt) {
		return ((b[pt] & 0xFF) << 8) + (b[pt + 1] & 0xFF);
	}

	public static int getSourceType(byte[] b) {
		return (b == null ? UNK : (b[0] & 0xFF) == 0x89 && b[1] == 'P' && b[2] == 'N' && b[3] == 'G' ? PNG 
			  : (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 ? JPG // FFD8
			  : b[0] == 'G' && b[1] == 'I' && b[2] == 'F' ? GIF
				: b[0] == 'B' && b[1] == 'M' ? BMP 
				: UNK);
	}

	

}
