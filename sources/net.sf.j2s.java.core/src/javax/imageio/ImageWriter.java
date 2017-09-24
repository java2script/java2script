package javax.imageio;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Hashtable;
import java.util.Map;

import swingjs.JSToolkit;
import swingjs.JSUtil;
import swingjs.api.Interface;
import javajs.api.GenericImageEncoder;
import javajs.util.OC;
import javajs.util.PT;
import java.awt.image.RenderedImage;
import java.io.OutputStream;

/**
 * SwingJS implementation using output channels (javajs.util.OC)
 * to create PNG, GIF, JPG, or JPG64 image data. 
 *
 * @see ImageReader
 * @see ImageWriteParam
 * @see javax.imageio.spi.IIORegistry
 * @see javax.imageio.spi.ImageWriterSpi
 *
 */
public class ImageWriter {

	private Map<String, Object> params = new Hashtable<String, Object>();

	private final static String VALID_FORMATS = ";PNG;GIF;JPEG;JPG;JPG64;";

	/**
	 * Create an ImageWriter that will be set with "image" and "type" later
	 * 
	 */
	public ImageWriter() {
	 // allows passing a Hashtable with all information at once.
	}
	
	public ImageWriter(RenderedImage im, String formatName) throws IIOException { //implements ImageTranscoder {
		if (im == null || formatName == null || !PT.isOneOf(formatName.toUpperCase(), VALID_FORMATS))
			throw new IIOException("Invalid format");
		params.put("image", (BufferedImage) im);
		params.put("type", formatName);
	}

	public boolean write(String fileName, OutputStream out) {
		if (out != null) {
			OC outputChannel = new OC();
			outputChannel.setParams(null, fileName, false, out);
			params.put("outputChannel", outputChannel);
		}
		try {
			Object o = writeImage(params);
			if (o instanceof String) {
				System.out.println("ImageWriter: " + o);
				return false;
			}
			if (out == null && o != null)
				JSUtil.saveFile(fileName, o, (String) params.get("mimeType"), null);
		} catch (Exception e) {
			return false;
		}
		return true;

	}

	/**
	 * Write a PNG, GIF, JPG, or JPG64 image to a file or output channel (javajs.util.OC) or return its bytes
	 * starting with an image or int[] RGB buffer; allows for appending application data with a predefined 
	 * application-specific 9-character prefix and any byte data desired.
	 * 
	 * @param params
	 *          {type:"PNG|GIF|JPEG|JPG|JPG64", transparentColor:int, fileName, image, quality
	 *          rbgbuf+width+height, pngAppData+pngAppPrefix}
	 * @return String error message or byte[] if fileName and outputChannel are null or null if successful
	 * @throws Exception
	 */
	public Object writeImage(Map<String, Object> params) throws Exception {
		BufferedImage image = (BufferedImage) params.get("image");
		if (image == null && !params.containsKey("rgbbuf"))
			throw new IllegalArgumentException("image == null!");
		byte[] bytes = null;
		String errMsg = null;
		String type = (String) params.get("type");
		if (type == null)
			type = "png";
		type = type.toUpperCase();
		String fileName = (String) params.get("fileName");
		String software = (String) params.get("software");
		if (software == null) {
			software = "SwingJS";
		}
		String comment = (String) params.get("comment");
		if (comment == null)
			params.put("comment", software);
		OC out = (OC) params.get("outputChannel");
		boolean asBytes = (out == null && fileName == null);
		boolean closeChannel = (out == null && fileName != null);
		boolean isOK = false;
		try {
			if (out == null
					&& (out = getOutputChannel(fileName)) == null)
				return "ERROR: canceled";
			fileName = out.getFileName();
			params.put("date", JSToolkit.getDateFormat("8601"));
			if (type.startsWith("JP")) {
				type = PT.rep(type, "E", "");
				if (type.equals("JPG64")) {
					params.put("outputChannelTemp", getOutputChannel(null));
				}
			} else if (type.equals("PDF")) {
			} else if (type.startsWith("PNG")) {
				// if (stateData != null) {
				// params.put("pngAppData", stateData);
				// params.put("pngAppPrefix", "Jmol Type");
				// }
			}
			String[] errRet = new String[1];
			isOK = createTheImage(image, type, out, params, errRet);
			if (closeChannel)
				out.closeChannel();
			if (isOK) {
				if (asBytes)
					bytes = out.toByteArray();
			} else {
				errMsg = errRet[0];
			}
		} finally {
			if (bytes != null || out != null)
				params.put("byteCount", Integer.valueOf(bytes != null ? bytes.length
						: isOK ? out.getByteCount() : -1));
		}
		return (errMsg == null ? bytes : errMsg);
	}

	OC getOutputChannel(String fileName) 	throws IOException {
		@SuppressWarnings("resource")
		OC outputChannel = new OC();
		return outputChannel.setParams(null, fileName, false, null);
	}

	/**
	 * @param objImage
	 * @param type
	 * @param out
	 * @param params
	 * @param errRet
	 * @return byte array if needed
	 */
	private boolean createTheImage(BufferedImage image, String type, OC out,
			Map<String, Object> params, String[] errRet) {
		params.put("mimeType", "image/" + type.toLowerCase());
		type = type.substring(0, 1) + type.substring(1).toLowerCase();
		GenericImageEncoder ie = (GenericImageEncoder) Interface.getInstance(
				"javajs.img." + type + "Encoder", true);
		if (ie == null) {
			errRet[0] = "Image encoder type " + type + " not available";
			return false;
		}
		boolean doClose = true;
		int[] pixels;
		int w, h;
		try {
			
			// finish up with the image parameters, 
			// either image or rgbbuf+width+height
			
			if (image == null) {
				w = ((Integer) params.get("width")).intValue();
				h = ((Integer) params.get("height")).intValue();
				pixels = (int[]) params.get("rgbbuf");
			} else {
				w = image.getWidth();
				h = image.getHeight();
				pixels = image.getRangeRGB(0, 0, w, h, new int[w * h], 0, w);
			}
			params.put("imageWidth", Integer.valueOf(w));
			params.put("imageHeight", Integer.valueOf(h));
			params.put("imagePixels", pixels);
			
			// now create the image using these parameters
			
			doClose = ie.createImage(type, out, params);
			
		} catch (Exception e) {
			errRet[0] = e.toString();
			out.cancel();
			doClose = true;
		} finally {
			if (doClose)
				out.closeChannel();
		}
		return (errRet[0] == null);
	}


}
