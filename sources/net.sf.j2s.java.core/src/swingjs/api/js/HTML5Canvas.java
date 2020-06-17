package swingjs.api.js;

import java.awt.image.BufferedImage;

public interface HTML5Canvas extends DOMNode {

	HTML5CanvasContext2D getContext(String str2d);

	/*
	 * Retrieves the byte[] data buffer from an HTML5 CANVAS element, optionally
	 * first setting its contents to a source IMG, CANVAS, or VIDEO element.
	 * 
	 */
	static byte[] getDataBufferBytes(HTML5Canvas canvas, DOMNode sourceNode, int w, int h) {
		if (sourceNode != null) {
			DOMNode.setAttrInt(canvas, "width", w);
			DOMNode.setAttrInt(canvas, "height", h);
		}
		HTML5CanvasContext2D ctx = canvas.getContext("2d");
		if (sourceNode != null) {
			ctx.drawImage(sourceNode, 0, 0, w, h);
		}
		// Coerse int[] to byte[]
		return (byte[]) (Object) ctx.getImageData(0, 0, w, h).data;
	}

	/**
	 * Install a source image (img, video, or canvas) into a matching BufferedImage 
	 * 
	 * @param sourceNode
	 * @param image
	 */
	static void setImageNode(DOMNode sourceNode, BufferedImage image) {
		/**
		 * @j2sNative
		 * 
		 * 			image._setImageNode$O$Z(sourceNode, false);
		 * 
		 */		{
			// can't expose this image._setImageNode(sourceNode, false);
		 }
	}
	
	

	static HTML5Canvas createCanvas(int width, int height, String id) {
		HTML5Canvas canvas = (HTML5Canvas) DOMNode.createElement("canvas", (id == null ? "img" + Math.random() : id + ""));
		DOMNode.setStyles(canvas, "width", width + "px", "height", height + "px");
		/**
		 * @j2sNative
		 * 
		 * canvas.width = width;
		 * canvas.height = height;
		 * 
		 */
		return canvas;
	}

}
