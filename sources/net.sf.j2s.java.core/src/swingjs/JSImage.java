package swingjs;

import java.awt.Component;
import java.awt.Image;
import java.awt.image.BufferedImage;

import javajs.util.Base64;
import swingjs.api.js.DOMNode;

/**
 * A JavaScript version of BufferedImage. 
 * 
 * Created from JSImagekit when creating an image 
 * from byte[] or from loading a GIF, PNG, or JPG image.
 * 
 * The difference is that when from byte[] data, the 
 * field _pix will be initialized to the raster data, 
 * but _imgNode will be null; when an image is used, then
 * _pix will be there, but it will not be populated unless
 * a call to setRGB is made. Until then, JSGraphics2D.drawImage will
 * simply use the image itself. But the _pix data will still
 * be available as _imgNode.pbuf32.
 * 
 * Only integer raster data RGB and ARGB have been implemented.
 * 
 * useful states:
 * 
 * _domNode != null ==> came from an image node (image file)
 * _canvas != null ==> an image has been created from raster data 
 * 
 * 
 * 
 * 
 * @author Bob Hanson
 *
 */
public class JSImage extends BufferedImage {

	// a BufferedImage in name only, actually;
	
	// TODO: implement simple ColorModel and Raster
	
	public String src;

	public JSImage(int[] argb, int width, int height, String src) {
		super(width, height, TYPE_INT_ARGB);
		this.src = src;
		_pix = argb;		
	}
	
  
  /**
   * Use HTML5 to load PNG, JPG, or GIF image in order to extract its pixels
   * 
   * @param b
   * @param type
   */
	@SuppressWarnings("unused")
	public void getDOMImage(byte[] b, String type) {
		String dataurl = "data:image/" + type + ";base64,"  + Base64.getBase64(b).toString();
		DOMNode img = null;
		/**
		 * @j2sNative
		 *   img = new Image(this.width, this.height);
		 *   //if (this.callback) img.onload = this.callback;
		 *   img.src = dataurl;
		 */
		{}
		_imgNode = img;
	}

    /**
     * font will be derived from this component when graphics is created
     * @param c
     * @return
     */
	public Image setComponent(Component c) {
		_component = c;
		return this;
	}

}
