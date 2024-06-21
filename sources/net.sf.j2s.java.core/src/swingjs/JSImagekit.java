package swingjs;

import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import javax.swing.Icon;
import javax.swing.ImageIcon;

import javajs.img.BMPDecoder;
import javajs.util.AU;

import java.awt.Component;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.ImageConsumer;
import java.awt.image.MemoryImageSource;
import java.awt.image.WritableRaster;
import java.nio.file.Path;

import swingjs.JSFileSystem.JSPath;
import swingjs.api.Interface;
import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Canvas;
import swingjs.json.JSON;

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
	private static final int VIDEO = 4;
	private static final int JPG_SOF0 = 0xC0FF;
	private static final int JPG_SOF2 = 0xC2FF;

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
		return createImageFromBytesStatic(data, imageoffset, imagelength, name, UNK);
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
		MemoryImageSource m; // just an Eclipse tag so we can find this reference;
		// note that this image is LIVE, meaning the ImageProducer can 
		// use newPixels() to update it.

		// from MemoryImageSource.newPixels()
		// 
		// meaning: "The pixels are ready, so make the image now"
		//
		//TODO: not considering pixelbytes
		//
		if (pixels != null)
			jsimage = new JSImage(pixels, width, height, null, BufferedImage.TYPE_INT_ARGB);
		else
			jsimage = new JSImage(pixelBytes, width, height, null, BufferedImage.TYPE_INT_ARGB);
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
		// assumes a standard ARGB color model.
		pixelBytes = null;
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

	/**
	 * Main entry point for ImageFilters and MemoryImageSource that delivers
	 * bytes to a consumer. 
	 * 
	 * Not yet implemented. 
	 * 
	 */
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
		this.pixels = null;
		JSUtil.notImplemented("byte-based image pixels");
	}

	private static JSImage createImageFromBytesStatic(byte[] data, int imageoffset, int imagelength, String name,
			int imageType) {
		int w = 0, h = 0;
		int[] argb = null;
		byte[] b = null;
		String type = null;
		if (data == null) {
			// this is from Component.createImage();
			w = imageoffset;
			h = imagelength;
		} else if (imageType == VIDEO) {
			b = data;
			w = imageoffset;
			h = imagelength;
			type = "video";
		} else {
			if (imagelength < 0)
				imagelength = data.length;
			// not implemented in JavaScript:
			// b = Arrays.copyOfRange(data, imageoffset, imagelength);
			int n = imagelength - imageoffset;
			System.arraycopy(data, imageoffset, b = new byte[n], 0, n);
			if (b.length < 10)// was 54??? I have no recollection of why that might be.
				return null;
			switch (imageType == UNK ? getSourceType(b) : imageType) {
			case BMP:
				// just get bytes directly
				BMPDecoder ie = (BMPDecoder) Interface.getInstance("javajs.img.BMPDecoder", true);
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
				System.out.println("JSImagekit: Unknown image type: " + b[0] + " " + b[1] + " " + b[2] + " " + b[3]);
				data = null;
				break;
			}
		}
		if (w == 0 || h == 0)
			return null;
		JSImage jsimage = new JSImage(argb, w, h, name,
				imageType == VIDEO ? BufferedImage.TYPE_HTML5_VIDEO : BufferedImage.TYPE_INT_ARGB);
		if (data != null && argb == null)
			jsimage.setImageNode(null, b, type);
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


	/**
	 * Create an ImageIcon by painting from an Icon to an HTML5 canvas, and then
	 * using that as the basis for an image. 
	 * 
	 * @param c
	 * @param icon
	 * @param id 
	 * @return
	 */
	public static ImageIcon createImageIcon(Component c, Icon icon, String id) {
		int width = icon.getIconWidth();
		int height = icon.getIconHeight();
		DOMNode canvas = DOMNode.getElement(id);
		ImageIcon imgIcon;
		BufferedImage img;
		JSGraphics2D g;
		if (canvas != null && (imgIcon = ((ImageIcon) icon).秘tempIcon) != null && DOMNode.getAttrInt(canvas, "width") == width
				&& DOMNode.getAttrInt(canvas, "height") == height) {
			// reuse this canvas
			img = (BufferedImage) imgIcon.getImage();
			g = img.秘g;
		} else {
			img = new BufferedImage(width, height, BufferedImage.TYPE_4BYTE_HTML5); 
			g = (JSGraphics2D) (Object) img.createGraphics();
//			createCanvasGraphics(width, height, id);
//			// A JSGraphics2D is not a real Graphics object - must coerce 
//			ColorModel cm = ColorModel.getRGBdefault();
//			img = new BufferedImage(cm, cm.createCompatibleWritableRaster(width, height), false, null);
			imgIcon = new ImageIcon(img, "paintedIcon");
//			img.getRaster().秘setStable(true);
		}
		icon.paintIcon(c, (Graphics)(Object) g, 0, 0);
	//	img.秘setImageFromHTML5Canvas(g);
		g.dispose();
		((ImageIcon) icon).秘tempIcon = imgIcon;
		return imgIcon;
	}

	public static JSGraphics2D createCanvasGraphics(int width, int height, String id) {
		return new JSGraphics2D(HTML5Canvas.createCanvas(width, height, id));
	}

	public Image createVideo(Path path) {
		byte[] bytes = JSUtil.getBytes(path);
		if (bytes == null)
			bytes = (byte[]) JSUtil.getCachedFileData(path.toString(), true);
		if (bytes != null)
			JSUtil.setFileBytesStatic(path, bytes);
		JSImage jsimage = new JSImage(bytes, 1, 1, path.toString(), BufferedImage.TYPE_HTML5_VIDEO);
		jsimage.setImageNode((JSPath) path, bytes, "video");
		return jsimage;
	}

	public Image createVideo(byte[] bytes) {
		return createImageFromBytesStatic(bytes, 1, 1, null, VIDEO);
	}

	public static Object getDataBlob(byte[] b, String type) {
		if (type == null)
			return (/** @j2sNative URL.createObjectURL(new Blob([b])) || */null);
		return (/** @j2sNative URL.createObjectURL(new Blob([b], {type:type})) || */null);
	}

	static boolean mediaInfoLoaded = false;
	static Object mediaInfoObject = null;
	private static String mediaInfoURL = "https://unpkg.com/mediainfo.js@0.3.1/dist/umd/index.min.js";
	

	/**
	 * Load mediainfo.js and MediaInfoModule.wasm, then use them to generate a JSON array. 
	 * 
	 * @param data
	 * @param trackType
	 * @param success
	 * @param onError
	 * @param path
	 */
	public static void getMediaInfoAsync(byte[] data, String trackType, String path, Consumer<Map<String, Object>> success, Consumer<String> onError) {

		if (!mediaInfoLoaded) {
			// load MediaInfo.js
			JSUtil.loadScriptAsync(path == null ? mediaInfoURL : path.startsWith("http") ? path : JSUtil.newJSUtil().getJ2SPath() + path, () -> {
				mediaInfoLoaded = true;
				getMediaInfoAsync(data, null, trackType, success, onError);
			});
			return;
		}
		Consumer<Object> f;
		if (mediaInfoObject == null) {
			f = new Consumer<Object>() {

				@Override
				public void accept(Object mediainfo) {
					mediaInfoObject = mediainfo;
					getMediaInfoAsync(data, null, trackType, success, onError); 
				}
				
			};
			// load MediaInfo.wasm and create MediaInfo object
			/**
			 * @j2sNative
			 * 
			 * 			MediaInfo.mediaInfoFactory( { format: 'JSON' },
			 *            function(mediainfo){ f.accept$O(mediainfo) } 
			 *          );
			 * 
			 */
			return;
		}
		f = new Consumer<Object>() {

			@Override
			public void accept(Object result) {
				try {
					Map<String, Object> info = null;
					info = (Map<String, Object>) JSON.parse((String) result);
					if (trackType != null) {
						info = (Map<String, Object>) info.get("media");
						List<Object> tracks = (List<Object>) info.get("track");
						info = null;
						for (int i = tracks.size(); --i >= 0;) {
							info = (Map<String, Object>) tracks.get(i);
							if (info.get("@type").equals(trackType))
								break;
						}
					}
					success.accept(info);
				} catch (Exception e) {
					e.printStackTrace();
					onError.accept(e.getMessage());
				}
			}
			
		};
		/**
		 * @j2sNative
		 * 
		 * 			C$.mediaInfoObject.analyzeData(data.length, 
		 * 				function(chunkSize, offset){
		 *            		return new Uint8Array(data.slice(offset, offset + chunkSize)); 
		 *            	}
		 *            ).then(
		 *            	function(result){f.accept$O(result)}, 
		 *              function(error){onError ? onError.accept$O(error) : console.log(error)}
		 *            );
		 */

	}


}
