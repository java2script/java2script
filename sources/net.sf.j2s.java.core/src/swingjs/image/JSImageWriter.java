package swingjs.image;

import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;

import javax.imageio.IIOImage;
import javax.imageio.ImageTypeSpecifier;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.metadata.IIOMetadata;

import javajs.api.GenericImageEncoder;
import javajs.util.OC;
import javajs.util.PT;
import swingjs.JSToolkit;
import swingjs.JSUtil;
import swingjs.api.Interface;

public abstract class JSImageWriter extends ImageWriter {

    @Override
	public abstract void write(IIOMetadata streamMetadata,
            IIOImage image,
            ImageWriteParam param) throws IOException;

    @Override
	public abstract ImageWriteParam getDefaultWriteParam();
    

	protected Map<String, Object> params = new Hashtable<String, Object>();


	protected Locale locale;

	/**
	 * Create an ImageWriter that will be set with "image" and "type" later
	 * 
	 */
	public JSImageWriter() {
		super(null);
	 // allows passing a Hashtable with all information at once.
	}
	
	public void setImage(RenderedImage im) {
		params.put("image", (BufferedImage) im);		
	}


	protected void setMetaData(Object streamMetadata) {
		// not implemented
	}

	public boolean write(RenderedImage im, String fileName, OutputStream out) {
		try {
			// OC used here to pass to javajs
			OC outputChannel = null;
	    	if (out instanceof OC) {
	    		outputChannel = (OC) out;
	    		fileName = null;
	    	}    
	    	if (outputChannel == null) {
	    		outputChannel = new OC().setParams(null, fileName, false, (OutputStream) out);
	    	}
			params.put("outputChannel", outputChannel);
			write(null, new IIOImage(im, null, null), null);
		} catch (IOException e) {
			return false;
		}
		return true;
	}
	
	@Override
	public void write(IIOImage image) throws IOException {
		params.put("image", image.getRenderedImage());
		try {
			writeImage(params);
		} catch (Exception e) {
			if (e instanceof IOException)
				throw new IOException(((IOException) e).getMessage());
			e.printStackTrace();
		}
	}

	protected boolean writeToFileOrStream(String fileName, OutputStream out) {
		OC outputChannel = (OC) params.get("outputChannel");
		if (out != null) {
			outputChannel = new OC();
			outputChannel.setParams(null, fileName, false, out);
			params.put("outputChannel", outputChannel);
		}
		if (outputChannel != null)
			fileName = outputChannel.getFileName();
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

	private OC getOutputChannel(String fileName) 	throws IOException {
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
				pixels = image.getRGB(0, 0, w, h, new int[w * h], 0, w);
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

    @Override
	public Locale getLocale() {
        return locale;
    }
    
    
	@Override
	public IIOMetadata getDefaultStreamMetadata(ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IIOMetadata getDefaultImageMetadata(ImageTypeSpecifier imageType, ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IIOMetadata convertStreamMetadata(IIOMetadata inData, ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IIOMetadata convertImageMetadata(IIOMetadata inData, ImageTypeSpecifier imageType, ImageWriteParam param) {
		// TODO Auto-generated method stub
		return null;
	}


}

