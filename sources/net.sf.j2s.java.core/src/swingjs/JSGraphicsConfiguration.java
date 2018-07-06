package swingjs;

import swingjs.api.Interface;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;
import java.awt.GraphicsConfiguration;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.Rectangle;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.WritableRaster;
import java.util.Hashtable;


/**
 * JSGraphicsConfiguration is a critical innovation for SwingJS. It
 * maintains information about the associated HTML5 applet. It is 
 * passed to new threads as they are created such that Thread.currentThread()
 * always has the current appletViewer field, and appletViewer.getGraphicsConfiguration()
 * (or actually any component involved) always returns this same configuration.
 * 
 * In this way, we can produce a graphics configuration for any JDialog or JFrame.
 *  
 * @author Bob Hanson
 * 
 *
 */
public class JSGraphicsConfiguration extends GraphicsConfiguration {

	/*
	 * NOTE: This class is called from JSToolkit using reflection.
	 * 
	 */
	public JSGraphicsConfiguration(){
		// by reflection
		System.out.println("JSGraphicsConfiguration initialized");		
	}

	@Override
	public GraphicsDevice getDevice() {
		return GraphicsEnvironment.getLocalGraphicsEnvironment().
        getDefaultScreenDevice();
	}

	@Override
	public BufferedImage createCompatibleImage(int width, int height) {
    ColorModel cm = getColorModel();
    WritableRaster wr = cm.createCompatibleWritableRaster(width, height);
    return newBufferedImage(cm, wr, false, null);
	}

	protected BufferedImage newBufferedImage(ColorModel cm, WritableRaster wr,
			boolean alphaPremultiplied, Hashtable<?, ?> properties) {
		return (BufferedImage) Interface.getInstanceWithParams(
				"java.awt.image.BufferedImage", new Class<?>[] { ColorModel.class,
						WritableRaster.class, Boolean.class, Hashtable.class },
				new Object[] { cm, wr,
						alphaPremultiplied ? Boolean.TRUE : Boolean.FALSE, properties });
	}

	@Override
	public ColorModel getColorModel() {
		return ColorModel.getRGBdefault();
	}

	@Override
	public ColorModel getColorModel(int transparency) {
		return getColorModel();
	}

	@Override
	public AffineTransform getDefaultTransform() {
		return (AffineTransform) Interface.getInstance("java.awt.geom.AffineTransform", true);
	}

	@Override
	public AffineTransform getNormalizingTransform() {
		return getDefaultTransform();
	}

	@Override
	public Rectangle getBounds() {
		DOMNode doc = null;
		/**
		 * @j2sNative
		 * 
		 *  doc = document;
		 */
		{}
		JQueryObject d = JSUtil.jQuery.$(doc);
		return new Rectangle(d.width(), d.height());
	}
}
