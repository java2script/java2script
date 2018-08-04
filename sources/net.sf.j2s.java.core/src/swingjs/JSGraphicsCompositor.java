package swingjs;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.awt.image.ByteLookupTable;
import java.awt.image.ConvolveOp;
import java.awt.image.Kernel;
import java.awt.image.LookupOp;
import java.awt.image.LookupTable;
import java.awt.image.Raster;
import java.awt.image.RasterOp;
import java.awt.image.RescaleOp;
import java.awt.image.WritableRaster;

import sun.awt.image.SunWritableRaster;
import swingjs.api.js.DOMNode;

public class JSGraphicsCompositor {


	private static double[] mat6;

	JSGraphicsCompositor() {
		// for reflection
	}
	/**
	 * apply a source/destination rule to a canvas.context2d object
	 * 
	 * see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
	 * 
	 * 
	 * @param g
	 * @param alphaRule
	 * @return
	 */
	public static boolean setGraphicsCompositeAlpha(JSGraphics2D g, int alphaRule) {
		// source-over This is the default setting and draws new shapes on top of
		// the existing canvas content.
		// source-in The new shape is drawn only where both the new shape and the
		// destination canvas overlap. Everything else is made transparent.
		// source-out The new shape is drawn where it doesn't overlap the existing
		// canvas content.
		// source-atop The new shape is only drawn where it overlaps the existing
		// canvas content.
		// lighter Where both shapes overlap the color is determined by adding color
		// values.
		// xor Shapes are made transparent where both overlap and drawn normal
		// everywhere else.
		// destination-over New shapes are drawn behind the existing canvas content.
		// destination-in The existing canvas content is kept where both the new
		// shape and existing canvas content overlap. Everything else is made
		// transparent.
		// destination-out The existing content is kept where it doesn't overlap the
		// new shape.
		// destination-atop The existing canvas is only kept where it overlaps the
		// new shape. The new shape is drawn behind the canvas content.
		// darker Where both shapes overlap the color is determined by subtracting
		// color values.
	

		@SuppressWarnings("unused")
		String s = null;
		switch (alphaRule) {
		default:
		case AlphaComposite.SRC_OVER: // the default
			s = "source-over";
			break;
		case AlphaComposite.SRC_IN:
			s = "source-in";
			break;
		case AlphaComposite.SRC_OUT:
			s = "source-out";
			break;
		case AlphaComposite.SRC_ATOP:
			s = "source-atop";
			break;
		case AlphaComposite.XOR:
			s = "xor";
			break;
		case AlphaComposite.DST_OVER:
			s = "destination-over";
			break;
		case AlphaComposite.DST_IN:
			s = "destination-in";
			break;
		case AlphaComposite.DST_OUT:
			s = "destination-out";
			break;
		case AlphaComposite.DST_ATOP:
			s = "destination-atop";
			break;
		}
		/**
		 * @j2sNative
		 * 
		 *            g.ctx.globalCompositeOperation = s;
		 */
		{
		}
		return true;
	}

	/**
	 * apply a BufferedImageOp to an image enroute to
	 * 
	 * @param g
	 * @param img
	 * @param op
	 * @param x
	 * @param y
	 * @return
	 */
	public static boolean drawImageOp(JSGraphics2D g, BufferedImage img,
			BufferedImageOp op, int x, int y) {
		int type = 0;
		/**
		 * @j2sNative
		 * 
		 *            type = op.swingJStype;
		 * 
		 */
		{
		}
		switch (type) {

		case 'R':
			// HTML5 can only do simple alpha rescaling
			RescaleOp rop = (RescaleOp) op;
			float[] offsets = rop.getOffsets(null);
			float[] scaleFactors = rop.getScaleFactors(null);
			boolean canDo = (offsets.length == 4 && offsets[3] == 0);
			if (canDo)
				for (int i = 0; i < 3; i++)
					if (offsets[i] != 0 || scaleFactors[i] != 1) {
						canDo = false;
						break;
					}
			if (canDo) {
				g.setAlpha(scaleFactors[3]);
				g.drawImagePriv(img, x, y, null);
				g.setAlpha(1);
				return true;
			}
			break;
		case 'L':
			// SwingJS TODO
			break;
		case 'A':
			// SwingJS TODO
			break;
		case 'C':
			// SwingJS TODO
			break;
		}
		return false;
	}

	public static WritableRaster filterRaster(Raster src, WritableRaster dst, RasterOp op) {
		// Create the destination tile
		if (dst == null) {
			dst = op.createCompatibleDestRaster(src);
		}
		WritableRaster retRaster = null;
		int type = 0;
		/**
		 * @j2sNative
		 * 
		 *            type = op.swingJStype;
		 * 
		 */
		{
		}
		switch (type) {

		case 'L':
			LookupTable table = ((LookupOp) op).getTable();
			if (table instanceof ByteLookupTable) {
				ByteLookupTable bt = (ByteLookupTable) table;
				if (lookupByteRaster(src, dst, bt.getTable()) > 0) {
					retRaster = dst;
				}
			}
			break;

		case 'A':
			AffineTransformOp bOp = (AffineTransformOp) op;
			double[] matrix = (mat6 == null ? mat6 = new double[6] : mat6);
			bOp.getTransform().getMatrix(matrix);
			if (transformRaster(src, dst, matrix, bOp.getInterpolationType()) > 0) {
				retRaster = dst;
			}
			break;

		case 'C':
			ConvolveOp cOp = (ConvolveOp) op;
			if (convolveRaster(src, dst, cOp.getKernel(), cOp.getEdgeCondition()) > 0) {
				retRaster = dst;
			}
			break;

		default:
			break;
		}

		if (retRaster != null) {
			SunWritableRaster.markDirty(retRaster);
		}

		return retRaster;
	}

	private static int convolveRaster(Raster src, WritableRaster dst, Kernel kernel,
			int edgeCondition) {
		// SwingJS TODO
		return 0;
	}

	private static int transformRaster(Raster src, WritableRaster dst, double[] matrix,
			int interpolationType) {
		// SwingJS TODO
		return 0;
	}

	private static int lookupByteRaster(Raster src, WritableRaster dst, byte[][] table) {
		// SwingJS TODO
		return 0;
	}

	@SuppressWarnings("null")
	public static BufferedImage filterImage(BufferedImage src, BufferedImage dst,
			BufferedImageOp op) {
		BufferedImage retBI = null;
		int type = 0;
		/**
		 * @j2sNative
		 * 
		 *            type = op.swingJStype;
		 * 
		 */
		{
		}
		switch (type) {
		default:
			retBI = op.filter(src, dst);
			break;
		case 'A':
			Graphics2D g = dst.getImageGraphic();
			g.drawImage(src,
					((AffineTransformOp) op).getTransform(), null);
			retBI = dst;
			break;
		case 'L':
			// not implemented
			LookupTable table = ((LookupOp) op).getTable();
			if (table.getOffset() != 0) {
				// Right now the native code doesn't support offsets
				return null;
			}
			if (table instanceof ByteLookupTable) {
				ByteLookupTable bt = (ByteLookupTable) table;
				if (lookupByteBI(src, dst, bt.getTable()) > 0) {
					retBI = dst;
				}
			}
			break;
		case 'C':
			// not implemented
			ConvolveOp cOp = (ConvolveOp) op;
			if (convolveBI(src, dst, cOp.getKernel(), cOp.getEdgeCondition()) > 0) {
				retBI = dst;
			}
			break;
		}

		// if (retBI != null) {
		// SunWritableRaster.markDirty(retBI);
		// }
		//
		return retBI;
	}

	private static int convolveBI(BufferedImage src, BufferedImage dst, Kernel kernel,
			int edgeCondition) {
		// SwingJS TODO
		return 0;
	}

	private static int lookupByteBI(BufferedImage src, BufferedImage dst, byte[][] table) {
		// SwingJS TODO
		return 0;
	}
	
	/**
	 * Get or create a DOM image node, as needed.
	 * Images could be from:
	 * 
	 * a) java.awt.Toolkit.createImage()
	 * b) javax.imageio.ImageIO.read()
	 * c) new java.awt.BufferedImage()
	 * 
	 * 
	 *  
	 * @param img
	 * @return
	 */
	public static DOMNode createImageNode(Image img) {
	  DOMNode imgNode = null;
	  /**
	   * @j2sNative
	   * 
	   * imgNode = img._imgNode;
	   * 
	   */
	  {}
		if (imgNode == null && img instanceof BufferedImage) {
			int w = ((JSImage)img).getWidth();
			int h = ((JSImage)img).getHeight();
		  /**
		   * @j2sNative
		   * 
		   * var canvas = img._canvas;
		   * if (canvas == null) {
		   *   img.getGraphics();
		   *   canvas = img._canvas;
		   * }
		   * imgNode = canvas;
		   * imgNode.style.width = w + "px";
		   * imgNode.style.height = h + "px";
		   * 
		   */
		  {}
		  // note: images created some other way are presumed to have int[] pix defined and possibly byte[pix]
		}
		return imgNode;
	}
}
