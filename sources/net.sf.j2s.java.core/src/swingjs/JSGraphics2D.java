package swingjs;

import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Composite;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.Paint;
import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.RenderingHints.Key;
import java.awt.Shape;
import java.awt.Stroke;
import java.awt.Toolkit;
import java.awt.font.FontRenderContext;
import java.awt.font.GlyphVector;
import java.awt.geom.AffineTransform;
import java.awt.geom.Path2D;
import java.awt.geom.PathIterator;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.awt.image.ImageObserver;
import java.awt.image.Raster;
import java.awt.image.RenderedImage;
import java.awt.image.renderable.RenderableImage;
import java.text.AttributedCharacterIterator;
import java.util.Hashtable;
import java.util.Map;

import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Canvas;
import swingjs.api.js.HTML5CanvasContext2D;
import swingjs.api.js.HTML5CanvasContext2D.ImageData;

// BH 9/18/2018 fill3DRect fix
// BH 6/2018 adds g.copyArea(x,y,width,height,dx,dy)

/**
 * generic 2D drawing methods -- JavaScript version
 * 
 * @author Bob Hanson hansonr@stolaf.edu
 */

public class JSGraphics2D implements
		// Graphics2D,
		Cloneable {

	static boolean debugClip = JSUtil.J2S.debugClip();

	private static final int DRAW_NOCLOSE = 0;
	private static final int DRAW_CLOSE = 1;
	private static final int FILL = 2;

	public int constrainX;
	public int constrainY;

	private int width;
	private int height;
	private HTML5Canvas canvas;

	private HTML5CanvasContext2D ctx;
	
	public HTML5CanvasContext2D getContext2D() {
		return ctx;
	}
	private GraphicsConfiguration gc;

	private BasicStroke currentStroke;
	private Shape currentClip;

	private AlphaComposite alphaComposite;
	private int initialState;

	// public int strokeState;
	// public int transformState;
	// public int clipState;

	// public Color foregroundColor;
	boolean isShifted;// private, but only JavaScript
	private Font font;

	private RenderingHints hints;	

	private AffineTransform transform;

	private Color backgroundColor;
	private AffineTransform fontTransform;

	public BufferedImage image;

	private static RenderingHints aa;

	// private Color currentColor;

	private static float pixelRatio = /**
										 * @j2sNative (function () { var ctx =
										 *            document.createElement("canvas").getContext("2d"), dpr =
										 *            window.devicePixelRatio || 1, bsr =
										 *            ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio
										 *            || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio ||
										 *            ctx.backingStorePixelRatio || 1; return dpr / bsr; })() ||
										 */
			1;
	static {
		System.out.println("JSGraphics2D pixelRatio is " + pixelRatio);
	}
// this is 1.5 for Windows
// nice, but now how would be do raw pixel setting, say, from images?
//    can.width = w * pixelRatio;
//    can.height = h * pixelRatio;
//    can.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

	public JSGraphics2D(Object canvas) { // this must be Object, because we are
											// passing an actual HTML5 canvas
		this.canvas = (HTML5Canvas) canvas;
		ctx = this.canvas.getContext("2d");
		transform = new AffineTransform();
		setStroke(new BasicStroke());
		/**
		 * @j2sNative
		 * 
		 * 			this.gc = SwingJS; this.width = canvas.width; this.height =
		 *            canvas.height;
		 * 
		 */
		{
		}
//		// reduce antialiasing, thank you,
//		// http://www.rgraph.net/docs/howto-get-crisp-lines-with-no- antialias.html
		setAntialias(true);
		clipPriv(0, 0, width, height);
	}

	public JSGraphics2D(HTML5Canvas canvas, BufferedImage image) {
		this(canvas);
		this.image = image;
	}

	public void setAntialias(boolean tf) {
//		if (tf) {
//			if (!isShifted)
//				ctx.translate(0.5, 0.5);
//		} else {
//			if (isShifted)
//				ctx.translate(-0.5, -0.5);
//		}
		// this is important if images are being drawn - test/TAPP6
		// see also
		// http://vaughnroyko.com/state-of-nearest-neighbor-interpolation-in-canvas/
		/**
		 * @j2sNative
		 * 
		 * 			this.ctx.mozImageSmoothingEnabled = false;
		 *            this.ctx.webkitImageSmoothingEnabled = false;
		 *            this.ctx.msImageSmoothingEnabled = false;
		 *            this.ctx.imageSmoothingEnabled = false;
		 * 
		 */
		isShifted = tf;
	}

	/**
	 * the SwingJS object
	 */
	public GraphicsConfiguration getDeviceConfiguration() {
		return gc;
	}

	public void drawLine(int x0, int y0, int x1, int y1) {
		boolean inPath = this.inPath;
		if (!inPath) {
			if (x0 == x1 && y0 == y1) {
				// meaning is to draw a point
				ctx.fillRect(x0, y0, 1, 1);
				return;
			}
			doStroke(true);
		}
		ctx.moveTo(x0, y0);
		ctx.lineTo(x1, y1);
		if (!inPath)
			doStroke(false);
	}

	public void drawOval(int left, int top, int width, int height) {
		doStroke(true);
		if (width == height)
			doCirc(left, top, width);
		else
			doArc(left, top, width, height, 0, 360, DRAW_NOCLOSE);
		doStroke(false);
	}

	public void fillOval(int left, int top, int width, int height) {
		ctx.beginPath();
		if (width == height)
			doCirc(left, top, width);
		else
			doArc(left, top, width, height, 0, 360, DRAW_CLOSE);
		ctx.fill();
	}

	private void doCirc(int left, int top, int diameter) {
		if (diameter <= 0)
			return;
		double r = diameter / 2f;
		ctx.arc(left + r, top + r, r, 0, 2 * Math.PI, false);
	}

	public void drawArc(int x, int y, int width, int height, int startAngle, int arcAngle) {
		doStroke(true);
		doArc(x, y, width, height, startAngle, arcAngle, DRAW_NOCLOSE);
		doStroke(false);
	}

	public void fillArc(int centerX, int centerY, int width, int height, int startAngle, int arcAngle) {
		ctx.beginPath();
		doArc(centerX, centerY, width, height, startAngle, arcAngle, DRAW_CLOSE);
		ctx.fill();
	}

	private void doArc(double x, double y, double width, double height, double startAngle, double arcAngle, int mode) {
		if (width <= 0 || height <= 0)
			return;
		// boolean doClose = (arcAngle - startAngle == 360);
		ctx.save();
		{
			if (arcAngle < 0) {
				startAngle += arcAngle;
				arcAngle = -arcAngle;
			}
			ctx.translate(x, y);
			ctx.scale(width / 2, height / 2);
			ctx.beginPath();
			ctx.arc(1, 1, 1, toRad(360 - startAngle), toRad(360 - arcAngle - startAngle), true);
			if (mode == DRAW_CLOSE)
				ctx.lineTo(1, 1);
		}
		ctx.restore();
	}

	private double toRad(double a) {
		return a * (Math.PI / 180);
	}

	public void clearRect(int x, int y, int width, int height) {
		clearRectPriv(x, y, width, height);
	}

	private void clearRectPriv(int x, int y, int w, int h) {
		ctx.clearRect(x, y, w, h);
		if (!clearing)
			setGraphicsColor(backgroundColor == null ? Color.WHITE : backgroundColor);
		fillRect(x, y, w, h);
		if (!clearing)
			setGraphicsColor(foregroundColor);
	}

	public void drawPolygon(Polygon p) {
		// from Graphics
		doPoly(p.xpoints, p.ypoints, p.npoints, DRAW_CLOSE);
	}

	public void drawPolygon(int[] axPoints, int[] ayPoints, int nPoints) {
		doPoly(axPoints, ayPoints, nPoints, DRAW_CLOSE);
	}

	public void drawPolyline(int[] xPoints, int[] yPoints, int nPoints) {
		doPoly(xPoints, yPoints, nPoints, DRAW_NOCLOSE);
	}

	public void fillPolygon(Polygon p) {
		// from Graphics
		doPoly(p.xpoints, p.ypoints, p.npoints, FILL);
	}

	public void fillPolygon(int[] axPoints, int[] ayPoints, int nPoints) {
		doPoly(axPoints, ayPoints, nPoints, FILL);
	}

	/**
	 * @param axPoints
	 * @param ayPoints
	 * @param nPoints
	 * @param doFill
	 */
	private void doPoly(int[] axPoints, int[] ayPoints, int nPoints, int mode) {
		ctx.beginPath();
		if (mode != FILL && !thinLine)
			ctx.translate(0.5, 0.5);
		ctx.moveTo(axPoints[0], ayPoints[0]);
		for (int i = 1; i < nPoints; i++) {
			ctx.lineTo(axPoints[i], ayPoints[i]);
		}
		if (mode != DRAW_NOCLOSE)
			ctx.lineTo(axPoints[0], ayPoints[0]);
		if (mode != FILL) {
			ctx.stroke();
			if (!thinLine)
				ctx.translate(-0.5, -0.5);
		} else {
			ctx.fill();
		}
	}

	public void drawRect(int x, int y, int width, int height) {
		// from Graphics
		if (width <= 0 || height <= 0)
			return;
		if (!thinLine)
			ctx.translate(0.5, 0.5);
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.stroke();
		if (!thinLine)
			ctx.translate(-0.5, -0.5);
	}

	public void fillRect(int x, int y, int width, int height) {
		if (width <= 0 || height <= 0)
			return;
		ctx.fillRect(x, y, width, height);
	}

	public void draw3DRect(int x, int y, int width, int height, boolean raised) {
		do3DRect(x, y, width, height, raised, DRAW_CLOSE);
	}

	public void fill3DRect(int x, int y, int width, int height, boolean raised) {
		do3DRect(x, y, width, height, raised, FILL);
	}

	private void do3DRect(int x, int y, int width, int height, boolean raised, int mode) {
		if (width <= 0 || height <= 0)
			return;
		Paint p = getPaint();
		Color c = getColor();
		Color brighter = c.brighter();
		Color darker = c.darker();

		if (!raised) {
			setColor(darker);
		} else if (p != c) {
			setColor(c);
		}
		if (mode == FILL)
			fillRect(x + 1, y + 1, width - 2, height - 2);
		setColor(raised ? brighter : darker);
		// drawLine(x, y, x, y + height - 1);
		fillRect(x, y, 1, height);
		// drawLine(x + 1, y, x + width - 2, y);
		fillRect(x + 1, y, width - 2, 1);
		setColor(raised ? darker : brighter);
		// drawLine(x + 1, y + height - 1, x + width - 1, y + height - 1);
		fillRect(x + 1, y + height - 1, width - 1, 1);
		// drawLine(x + width - 1, y, x + width - 1, y + height - 2);
		fillRect(x + width - 1, y, 1, height - 1);
		setPaint(p);
	}

	public void setFont(Font font) {
		// this equality check speeds mark/reset significantly
		if (font == this.font)
			return;
		this.font = font;
		this.fontTransform = null;
		if (font != null) {
			this.fontTransform = font.秘getRawTransformOrNull();
			ctx.font = JSToolkit.getCanvasFont(font);
		}
	}

	public void setStrokeBold(boolean tf) {
		setLineWidth(tf ? 2. : 1.);
	}

	private void setLineWidth(double d) {
		ctx.lineWidth = d;
	}

	public boolean canDoLineTo() {
		return true;
	}

	boolean inPath;

	private Color foregroundColor;

	public void doStroke(boolean isBegin) {
		inPath = isBegin;
		if (isBegin && !thinLine) {
			ctx.translate(0.5, 0.5);
			ctx.beginPath();
		} else {
			ctx.stroke();
			if (!thinLine)
				ctx.translate(-0.5, -0.5);
		}
	}

	public void lineTo(int x2, int y2) {
		if (inPath) {
			ctx.lineTo(x2, y2);
		} else {
			if (!thinLine)
				ctx.translate(0.5, 0.5);
			ctx.lineTo(x2, y2);
			if (!thinLine)
				ctx.translate(-0.5, -0.5);
		}
	}

	public void clip(Shape s) {
		ctx.beginPath();
		doShape(s);
		// this is not quite right -- the clip is an intersection, not final
		// this only affects getClip
		currentClip = s;
		ctx.clip();
	}

	public void draw(Shape s) {
		ctx.save();
		doStroke(true);
		doShape(s);
		doStroke(false);
		ctx.restore();
	}

	public void drawText(char[] chars, Font font, float x, float y) {

		ctx.save();
		Font f = getFont();
		setFont(font);
		AffineTransform tx = fontTransform;
		if (tx != null && !tx.isIdentity()) {
			ctx.transform(tx.getScaleX(), tx.getShearX(), tx.getTranslateX(), tx.getShearY(), tx.getScaleX(),
					tx.getTranslateY());
		}
		fillText(/** @j2sNative chars.join("") || */
				null, x, y);
		setFont(f);
		ctx.restore();
	}

	public void drawGlyphVector(GlyphVector gv, float x, float y) {
		JSUtil.notImplemented(null);
	}

	private final static double[] pts = new double[6];

	private int doShape(Shape s) {
		PathIterator pi = s.getPathIterator(null);
		while (!pi.isDone()) {
			switch (pi.currentSegment(pts)) {
			case PathIterator.SEG_MOVETO:
				ctx.moveTo(pts[0], pts[1]);
				break;
			case PathIterator.SEG_LINETO:
				ctx.lineTo(pts[0], pts[1]);
				break;
			case PathIterator.SEG_QUADTO:
				ctx.quadraticCurveTo(pts[0], pts[1], pts[2], pts[3]);
				break;
			case PathIterator.SEG_CUBICTO:
				ctx.bezierCurveTo(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
				break;
			case PathIterator.SEG_CLOSE:
				ctx.closePath();
				break;
			}
			pi.next();
		}
		return pi.getWindingRule();
		// then fill or stroke or clip
	}

	public void fill(Shape s) {
		ctx.save();
		if (shader != null) {
			ctx.beginPath();
			doShape(s);
			ctx.clip();
			if (shader instanceof GradientPaint) {
				GradientPaint p = (GradientPaint) shader;
				Point2D.Float p1 = (Point2D.Float) p.getPoint1();
				Point2D.Float p2 = (Point2D.Float) p.getPoint2();
				HTML5CanvasContext2D.createLinearGradient(ctx, p1, p2, JSToolkit.getCSSColor(p.getColor1(), true),
						JSToolkit.getCSSColor(p.getColor2(), true));
				ctx.beginPath();
				doShape(s);
				ctx.fill();
			} else {
				Rectangle2D yourRect = s.getBounds2D();
				double sx = transform.getScaleX();
				double sy = transform.getScaleY();
				double w = Math.ceil(sx * yourRect.getWidth());
				double h = Math.ceil(sy * yourRect.getHeight());
				HTML5Canvas shaderCanvas = /** @j2sNative this.shader.秘canvas || */
						null;
				if (shaderCanvas == null || DOMNode.getWidth(shaderCanvas) < w || DOMNode.getHeight(shaderCanvas) < h) {
					Rectangle myRect = new Rectangle(0, 0, (int) w, (int) h);
					JSGraphics2D g2 = JSImagekit.createCanvasGraphics((int) w, (int) h, null);
					if (aa == null)
						aa = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
					Raster raster = shader.createContext(null, myRect, yourRect, this.transform, aa).getRaster(0, 0,
							width, height);
					g2.getBuf8(0, 0, (int) w, (int) h);
					raster.getPixels(0, 0, (int) w, (int) h, g2.buf8);
					g2.ctx.putImageData(g2.imageData, 0, 0);
					shaderCanvas = g2.canvas;
					g2.dispose();
				}
				/**
				 * @j2sNative this.shader.秘canvas = shaderCanvas; var a =
				 *            this.ctx.globalCompositeOperation;
				 *            this.ctx.globalCompositionOperation = "source-atop";
				 */
				ctx.drawImage(shaderCanvas, 0, 0, (int) w, (int) h, yourRect.getX(), yourRect.getY(),
						yourRect.getWidth(), yourRect.getHeight());
				/**
				 * @j2sNative this.ctx.globalCompositeOperation = a;
				 */
			}
		} else {
			ctx.beginPath();
			int winding = doShape(s);
			if (winding == Path2D.WIND_EVEN_ODD) {
				ctx.fill("evenodd");
			} else {
				ctx.fill(); // "nonzero"
			}
		}
		ctx.restore();
	}

	public void drawRoundRect(int x, int y, int width, int height, int arcWidth, int arcHeight) {
		doRoundRect(x, y, width, height, arcWidth, arcHeight, DRAW_CLOSE);
	}

	public void fillRoundRect(int x, int y, int width, int height, int arcWidth, int arcHeight) {
		doRoundRect(x, y, width, height, arcWidth, arcHeight, FILL);
	}

	RoundRectangle2D.Double rrect;

	private void doRoundRect(int x, int y, int w, int h, int aw, int ah, int mode) {
		if (rrect == null || rrect.getX() != x || rrect.getY() != y || rrect.getWidth() != w || rrect.getHeight() != h
				|| rrect.getArcWidth() != aw || rrect.getArcHeight() != ah) {
			rrect = new RoundRectangle2D.Double(x, y, w, h, aw, ah);
		}
		if (mode == FILL)
			fill(rrect);
		else
			draw(rrect);
	}

	public boolean drawImage(Image img, int x, int y, Color background, ImageObserver observer) {
		JSUtil.notImplemented("transparent image pixel background fill is not supported in SwingJS");
		return drawImage(img, x, y, observer);
	}

	/**
	 * Allows for direct image transfer by buffer
	 * 
	 * @param img
	 * @param x
	 * @param y
	 * @param observer
	 * @return
	 */
	public boolean drawImage(Image img, int x, int y, ImageObserver observer) {
		return drawImage(img, x, y, img.getWidth(null), img.getHeight(null), observer);
	}

	public boolean drawImage(Image img, int x, int y, int width, int height, Color bgcolor, ImageObserver observer) {
		JSUtil.notImplemented("transparent image pixel background fill is not supported in SwingJS");
		return drawImage(img, x, y, width, height, observer);
	}

	public boolean drawImage(Image img, int x, int y, int width, int height, ImageObserver observer) {
		if (width <= 0 || height <= 0)
			return true;
		if (img != null) {
			DOMNode imgNode = ((BufferedImage) img).秘getImageNode(BufferedImage.GET_IMAGE_ALLOW_NULL);
			if (imgNode == null) {
				if (width != img.getWidth(null) || height != img.getHeight(null)) {
					// scaled image
					drawImage(img, x, y, x + width, y + width, 0, 0, img.getWidth(null), img.getHeight(null), observer);
					return true;
				}
				drawImagePriv(img, x, y, width, height, observer);
			} else {
				ctx.drawImage(imgNode, x, y, width, height);
			}
			if (observer != null)
				observe(img, observer, imgNode != null);
		}
		return true;
	}

	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2, int sx1, int sy1, int sx2, int sy2,
			Color bgcolor, ImageObserver observer) {
		JSUtil.notImplemented("transparent image pixel background fill is not supported in SwingJS");
		return drawImage(img, dx1, dy1, dx2, dy2, sx1, sy1, sx2, sy2, observer);
	}

	/**
	 * Draw an image, possibly only part of it, and possibly scaled.
	 * 
	 * @param img
	 * @param dx1 destination x1
	 * @param dy1 destination y1
	 * @param dx2 destination x2
	 * @param dy2 destination y2
	 * @param sx1 source x1
	 * @param sy1 source y1
	 * @param sx2 source x2
	 * @param sy2 source y2
	 * @param observer
	 * @return true
	 */
	@SuppressWarnings("unused")
	public boolean drawImage(Image img, int dx1, int dy1, int dx2, int dy2, int sx1, int sy1, int sx2, int sy2,
			ImageObserver observer) {
		if (img != null) {
			byte[] bytes = null;
			DOMNode imgNode = ((BufferedImage) img).秘getImageNode(BufferedImage.GET_IMAGE_ALLOW_NULL);
			if (imgNode == null) {
				// raster image -- check to see if we can draw it; if not, then create its canvas
				if (sx2 - sx1 != dx2 - dx1 || sy2 - sy1 != dy2 - dy1 || sx1 != 0 || sx2 != img.getWidth(null)
						|| sy1 != 0 || sy2 != img.getHeight(null)) {
					imgNode = ((BufferedImage) img).秘getImageNode(BufferedImage.GET_IMAGE_FOR_ICON);
				}
			}
			if (imgNode != null) {
				// we would need an image to do this
				ctx.drawImage(imgNode, sx1, sy1, sx2 - sx1, sy2 - sy1, dx1, dy1, dx2 - dx1, dy2 - dy1);
			}
			if (observer != null)
				observe(img, observer, imgNode != null);
		}
		return true;
	}

	public boolean drawImage(Image img, AffineTransform xform, ImageObserver obs) {
		return drawImageXT(img, xform, obs);
	}

	public void drawRenderedImage(RenderedImage img, AffineTransform xform) {
		drawImageXT((Image) img, xform, null);
	}

	public void drawRenderableImage(RenderableImage img, AffineTransform xform) {
		drawImageXT((Image) img, xform, null);
	}

	private boolean drawImageXT(Image img, AffineTransform xform, ImageObserver obs) {
		if (xform == null || xform.isIdentity()) {
          return drawImage(img, 0, 0, obs);
		}
		
		ctx.save();
		transformCTX(xform);
		boolean ret = drawImageFromPixelsOrRaster(img, 0, 0, obs);
		ctx.restore();
		return ret;
	}

	private ImageData imageData;
	private int[] buf8;
	private int lastx, lasty, nx, ny;
	private Paint shader;

	private boolean thinLine;

	/**
	 * @param img
	 * @param x
	 * @param y
	 * @param observer
	 * @return
	 */
	public boolean drawImageFromPixelsOrRaster(Image img, int x, int y, ImageObserver observer) {
		return (img == null ? true
				: drawImagePriv(img, x, y, img.getWidth(observer), img.getHeight(observer), observer));
	}

	/**
	 * This method first checks to see if we have pixels, for example from a
	 * user-derived raster. If we do, and the current transform is a translation only, we can use
	 * them directly. If we don't or this a scaled or skewed transform, we must draw the canvas
	 * object corresponding to this image instead. 
	 * 
	 * @param img
	 * @param x
	 * @param y
	 * @param observer
	 * @return true if img is not null
	 */
	private boolean drawImagePriv(Image img, int x, int y, int width, int height, ImageObserver observer) {
		double[] m = HTML5CanvasContext2D.setMatrix(ctx, transform);
		boolean isToSelf = (this == ((BufferedImage) img).秘g);
		boolean isOpaque = ((BufferedImage) img).秘isOpaque();
		// if get秘pix returns pixels, we use them. Otherwise we turn this into an image
		// pixels actually could be byte[w*h*4] or int[w*h]
		int[] pixels = (int[]) (isTranslationOnly(m) && !isClipped(x,y,width,height) ? ((BufferedImage) img).get秘pixFromRaster() : null);
		DOMNode imgNode = null;
		if (pixels == null) {
			imgNode = (img == observer ? canvas : ((BufferedImage) img).秘getImageNode(BufferedImage.GET_IMAGE_FROM_RASTER));
			if (imgNode != null)
				ctx.drawImage(imgNode, x, y, width, height);
		} else {
			boolean isPerPixel = (pixels.length == width * height);
			if (!isOpaque)
				buf8 = null;
			x += m[4];
			y += m[5];
			getBuf8(x, y, width, height);
			if (isPerPixel) {
				for (int pt = 0, i = 0, n = Math.min(buf8.length / 4, pixels.length); i < n; i++) {
					int argb = pixels[i];
					if (!isToSelf && !isOpaque && (argb & 0xFF000000) != 0xFF000000) {
						// best we can do here is ignore partially translucent shading
						pt += 4;
					} else {
						buf8[pt++] = (argb >> 16) & 0xFF;
						buf8[pt++] = (argb >> 8) & 0xFF;
						buf8[pt++] = argb & 0xFF;
						buf8[pt++] = (isOpaque ? 0xFF : (argb >> 24) & 0xFF);
					}
				}
			} else if (isOpaque) {
				for (int i = 0, n = Math.min(buf8.length, pixels.length); i < n; i++) {
					buf8[i] = pixels[i++] & 0xFF;
					buf8[i] = pixels[i++] & 0xFF;
					buf8[i] = pixels[i++] & 0xFF;
					buf8[i] = 0xFF;
				}
			} else if (isToSelf) {
				for (int i = 0, n = Math.min(buf8.length, pixels.length); i < n; i++) {
					buf8[i] = pixels[i] & 0xFF;
				}
			} else {
				for (int i = 0, n = Math.min(buf8.length, pixels.length); i < n; i++) {
					if ((i % 4) == 0 && (pixels[i + 3]&0xFF) != 0xFF) {
						// ignore non-opaque when transferring
						i += 3;
					} else {
						buf8[i] = pixels[i] & 0xFF;
					}
				}
			}
			ctx.putImageData(imageData, x, y);
		}
		if (observer != null)
			observe(img, observer, imgNode != null || pixels != null);
		return true;
	}

	private boolean isClipped(int x, int y, int w, int h) {
		boolean is = currentClip != null && !currentClip.contains(x, y, w, h);
		return is;
	}

	private void observe(Image img, ImageObserver observer, boolean isOK) {
		observer.imageUpdate(img, (isOK ? 0 : ImageObserver.ABORT | ImageObserver.ERROR), -1, -1, -1, -1);
	}

	private void getBuf8(int x, int y, int w, int h) {
		if (buf8 == null || x != lastx || y != lasty || nx != w || ny != h) {
			imageData = ctx.getImageData(x, y, w, h);
			buf8 = imageData.data;
			lastx = x;
			lasty = y;
			nx = w;
			ny = h;
		}
	}

	private static boolean isTranslationOnly(double[] m) {
		return (m[0] == 1 && m[1] == 0 && m[2] == 0 && m[3] == 1);
	}

	public boolean hit(Rectangle rect, Shape s, boolean onStroke) {
		JSUtil.notImplemented(null);
		return false;
	}

	public Stroke getStroke() {
		return currentStroke;
	}

	final static int[] nodash = new int[0];
	
	@SuppressWarnings("unused")
	public void setStroke(Stroke s) {
		if (!(s instanceof BasicStroke))
			return;
		BasicStroke b = currentStroke = (BasicStroke) s;
		thinLine = (b.getLineWidth() <= 0.5f);
		float[] dash = b.getDashArray();
		int n = (dash == null ? 0 : dash.length); 
		if (n == 0) {
			ctx.setLineDash(nodash);
		} else {
			int[] idash = new int[n];
			for (int i = n; --i >= 0;)
				idash[i] = (int) dash[i];
			ctx.setLineDash(idash);
		}			
		setLineWidth(b.getLineWidth());
		String lineCap, lineJoin;
		float miterLimit = -1;
		switch (b.getEndCap()) {
		case BasicStroke.CAP_BUTT:
			lineCap = "butt";
			break;
		case BasicStroke.CAP_SQUARE:
			lineCap = "square";
			break;
		case BasicStroke.CAP_ROUND:
		default:
			lineCap = "round";
		}
		switch (b.getLineJoin()) {
		case BasicStroke.JOIN_BEVEL:
			lineJoin = "bevel";
			break;
		case BasicStroke.JOIN_MITER:
			lineJoin = "miter";
			miterLimit = b.getMiterLimit();
			break;
		case BasicStroke.JOIN_ROUND:
			lineJoin = "round";
		}
		/**
		 * @j2sNative
		 * 
		 * 			this.ctx.lineCap = lineCap; this.ctx.lineJoin = lineJoin; if
		 *            (miterLimit >= 0) this.ctx.miterLimit = miterLimit;
		 */
		{
		}
		// SwingJS TODO more here
	}

	public void setRenderingHint(Key hintKey, Object hintValue) {
		//hints.put(hintKey, hintValue);
	}

	public Object getRenderingHint(Key hintKey) {
		return null;//
//		return (hints == null ? null : hints.get(hintKey));
	}

	public void setRenderingHints(Map<?, ?> hints) {
		//this.hints = new RenderingHints(null);//(Map<Key, ?>) hints);
	}

	public void addRenderingHints(Map<?, ?> hints) {
//		if (hints == null)
//			hints = new RenderingHints(new Hashtable());
//		for (Entry<?, ?> e : hints.entrySet())
//			this.hints.put(e.getKey(), e.getValue());
	}

	private static RenderingHints nohints = new RenderingHints(new Hashtable());
	public RenderingHints getRenderingHints() {
		return (hints == null ? nohints : hints);
	}

	public void setBackground(Color c) {
		// for clearRect only
		backgroundColor = c;
	}

	public Color getBackground() {
		return backgroundColor;
	}

	public Color getColor() {
		return foregroundColor;
	}

	public void setColor(Color c) {
		if (clearing) {
			clearColorSaved = c;
		} else {
			foregroundColor = c;
			setGraphicsColor(c);
		}
	}

	public void setPaint(Paint paint) {
		shader = null;
		if (paint instanceof Color) {
			setColor((Color) paint);
		} else {
			shader = paint;
		}
	}

	public Font getFont() {
		if (font == null)
			font = new Font("Arial", Font.PLAIN, 12);
		return font;
	}

	public FontMetrics getFontMetrics() {
		// from Graphics
		return getFontMetrics(getFont());
	}

	public FontMetrics getFontMetrics(Font f) {
		return Toolkit.getDefaultToolkit().getFontMetrics(f);
	}

	public void clipRect(int x, int y, int width, int height) {
		// intersect region
		clipPriv(x, y, width, height);
	}

	
	public void setClip(int x, int y, int width, int height) {
		if (currentClip != null)// && !currentClip.contains(x, y, width, height))
			unclip(Integer.MIN_VALUE);
		clipPriv(x,y, width, height);
	}

	public void setClip(Shape clip) {
		if (clip == null) {
			clipPriv(0, 0, width, height);
			return;
		}
		if (clip instanceof Rectangle) {
			Rectangle r = (Rectangle) clip;
			setClip((int) Math.floor(r.getMinX()),
					(int) Math.floor(r.getMinY()),
					(int) Math.ceil(r.getWidth()),
					(int) Math.ceil(r.getHeight()));
		} else {
			if (debugClip) {
				System.out.println("JSGraphics2D.setClip(Shape) to " + clip + " from " + currentClip);
			}
			currentClip = clip;
			ctx.beginPath();
			doShape(clip);
			ctx.clip();
		}
	}

	public void setClipPriv(Shape clip) {
		if (clip instanceof Rectangle) {
			Rectangle r = (Rectangle) clip;
			clipPriv((int) Math.floor(r.getMinX()), (int) Math.floor(r.getMinY()), (int) Math.ceil(r.getWidth()),
					(int) Math.ceil(r.getHeight()));
		} else {
			if (debugClip) {
				System.out.println("JSGraphics2D.setClipPriv(Shape) to " + clip + " from " + currentClip);
			}
			currentClip = clip;
			ctx.beginPath();
			doShape(clip);
			ctx.clip();
		}
	}

	private void clipPriv(int x, int y, int width, int height) {
		Rectangle r = (currentClip instanceof Rectangle ? (Rectangle) currentClip : null);
		Object o = currentClip;
		if (r == null || r.x != x || r.y != y || r.width != width || r.height != height) {
			currentClip = new Rectangle(x, y, width, height);
		}
		if (debugClip) {
			System.out.println("JSGraphics2D.clipPriv to " + currentClip + " from " + o);
		}
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.clip();
	}

	public boolean hitClip(int x, int y, int width, int height) {
		// from Graphics

		// Note, this implementation is not very efficient.
		// Subclasses should override this method and calculate
		// the results more directly.
		Rectangle clipRect = getClipBounds();
		if (clipRect == null) {
			return true;
		}
		return clipRect.intersects(x, y, width, height);
	}

	private void setGraphicsColor(Color c) {
		if (c == null)
			return; 
		if (image != null)
			c = image.秘getGraphicsColor(c);
		// this was the case with a JRootPanel graphic call
		int a = c.getAlpha();
		// set alpha only if it is new and if this color has an alpha not 0xFF
		float fa = a / 255F;
		if (ctx.globalAlpha != fa)
			ctx.globalAlpha = fa;
		ctx.fillStyle = ctx.strokeStyle = JSToolkit.getCSSColor(c, true);
	}

	public void copyArea(int x, int y, int width, int height, int dx, int dy) {
		ctx.putImageData(ctx.getImageData(x, y, width, height), x + dx, y + dy);
	}

	public Shape getClip() {
		// This will not be entirely accurate if shapes are involved
		return currentClip == null ? getClipBoundsImpl() : currentClip;
	}

	public void drawString(String s, int x, int y) {
		fillText(s, x, y);
	}

	public void drawChars(char[] chars, int x, int y) {
		fillText(String.valueOf(chars), x, y);
	}

	public void drawChars(char[] data, int offset, int length, int x, int y) {
		// from Graphics
		drawString(new String(data, offset, length), x, y);
	}

	public void drawBytes(byte[] data, int offset, int length, int x, int y) {
		// from Graphics
		drawString(new String(data, offset, length), x, y);
	}

	public void drawString(String str, float x, float y) {
		fillText(str, x, y);
	}

	private void fillText(String str, float x, float y) {
		ctx.fillText(str, x, y);
	}

	public void drawString(AttributedCharacterIterator iterator, int x, int y) {
		JSUtil.notImplemented(null);
	}

	public void drawString(AttributedCharacterIterator iterator, float x, float y) {
		JSUtil.notImplemented(null);
	}

	public void translate(double tx, double ty) {
		ctx.translate(tx, ty);
		transform.translate(tx, ty);
	}

	public void shear(double shx, double shy) {
		ctx.transform(1.0, shx, 0.0, shy, 1.0, 0.0);
		transform.shear(shx, shy);
	}

	public void translate(int x, int y) {
		ctx.translate(x, y);
		transform.translate(x, y);
	}

	public void rotate(double radians) {
		ctx.rotate(radians);
		transform.rotate(radians);
	}

	public void rotate(double theta, double x, double y) {
		ctx.translate(x, y);
		ctx.rotate(theta);
		ctx.translate(-x, -y);
		transform.rotate(theta, x, y);
	}

	public void scale(double sx, double sy) {
		ctx.scale(sx, sy);
		transform.scale(sx, sy);
	}

	/**
	 * concatenates the given transform matrix to the current transform
	 * 
	 */

	public void transform(AffineTransform t) {
		transformCTX(t);
		transform.concatenate(t);
		HTML5CanvasContext2D.setMatrix(ctx, null);
	}

	private void transformCTX(AffineTransform t) {
		/**
		 * @j2sNative
		 * 
		 * 			this.ctx.transform (t.m00, t.m10, t.m01, t.m11, t.m02, t.m12);
		 */
		{
		}
	}

	/**
	 * sets the transform matrix to the given one
	 */

	public void setTransform(AffineTransform t) {
		/**
		 * @j2sNative
		 * 
		 * 			this.ctx.setTransform (t.m00, t.m10, t.m01, t.m11, t.m02, t.m12);
		 * 
		 * 
		 */
		{
		}
		transform.setTransform(t);
	}

	/**
	 * Returns a copy of the current transform
	 */

	public AffineTransform getTransform() {
		return (AffineTransform) transform.clone();
	}

	// /**
	// * Returns the current Transform ignoring the "constrain"
	// * rectangle.
	// */
	// public AffineTransform cloneTransform() {
	// return (AffineTransform) transform.clone();
	// }
	//

	public Paint getPaint() {
		return getColor();
	}

	public FontRenderContext getFontRenderContext() {
		return getFontMetrics(getFont()).getFontRenderContext();
	}

	public void setPaintMode() {
		setComposite(AlphaComposite.SrcOver);
	}

	public void setXORMode(Color c) {
		if (c == null)
			throw new IllegalArgumentException("null XORColor");
		setComposite(AlphaComposite.Xor);
	}

	public Rectangle getClipRect() {
		// from Graphics
		return getClipBounds();
	}

	public Rectangle getClipBounds() {
		return getClipBounds(null);
	}

	public Rectangle getClipBounds(Rectangle r) {
		Rectangle clipRect = getClipBoundsImpl();
		if (r == null) {
			r = clipRect;
		} else {
			r.x = clipRect.x;
			r.y = clipRect.y;
			r.width = clipRect.width;
			r.height = clipRect.height;
		}
		return r;
	}

	private Rectangle getClipBoundsImpl() {
		if (currentClip == null) {
			currentClip = new Rectangle(0, 0, width, height);
		}
		return currentClip.getBounds();
	}

	private Color clearColorSaved;
	private boolean clearing;

	/**
	 * 
	 * @param comp AlphaComposite or XORComposite
	 */
	public void setComposite(Composite comp) {
		// TODO -- XORComposite
		// this equality check speeds mark/reset significantly
		if (comp == this.alphaComposite)
			return;
		// alpha composite only here
		boolean isAlpha = comp instanceof AlphaComposite;
		int newRule = (!isAlpha ? 0 : ((AlphaComposite) comp).getRule());
		boolean isValid = (isAlpha && alphaComposite == null || newRule != alphaComposite.getRule());
		if (isValid && JSGraphicsCompositor.setGraphicsCompositeAlpha(this, newRule)) {
			alphaComposite = (AlphaComposite) comp;
		}
		if (newRule == AlphaComposite.CLEAR) {
			clearColorSaved = foregroundColor;
			setColor(Color.black);
			clearing = true;
		} else if (clearing) {
			clearing = false;
			setColor(clearColorSaved);
			clearColorSaved = null;
		}

		setAlpha(comp == null ? 1 : ((AlphaComposite) comp).getAlpha());
	}

	public Composite getComposite() {
		return alphaComposite;
	}

	public void drawImage(BufferedImage img, BufferedImageOp op, int x, int y) {
		JSGraphicsCompositor.drawImageOp(this, img, op, x, y);
	}

	public void setAlpha(float f) {
		ctx.globalAlpha = f;
	}

	public HTML5Canvas getCanvas() {
		return canvas;
	}

	/////////////// saving of the state ////////////////

	private final static int SAVE_ALPHA = 0;
	private final static int SAVE_COMPOSITE = 1;
	private final static int SAVE_STROKE = 2;
	private final static int SAVE_TRANSFORM = 3;
	private final static int SAVE_FONT = 4;
	private final static int SAVE_CLIP = 5;
	private final static int SAVE_MAX = 7;

	/**
	 * creates a save object to extend the capabilities of context2d.save() that
	 * brings that into line with Java's graphics2d .create()
	 * 
	 * in development -- we need to identify all differences
	 * 
	 * 
	 * @return the length of the ctx._aSaved array after the push
	 */
	public int mark() {
		return mark(false);
	}

	private int mark(boolean isClone) {
		// note: This method is referred to in JComponent.java j2snative block as mark$
		if (debugClip) {
			System.out.println("save " + transform);
		}
		ctx.save();
		Object[] map = /** @j2sNative [] || */new Object[SAVE_MAX];
		map[SAVE_ALPHA] = (/** @j2sNative 1 ? this.ctx.globalAlpha : */0);//Float.valueOf(ctx.globalAlpha);
		map[SAVE_COMPOSITE] = alphaComposite;
		map[SAVE_STROKE] = currentStroke;
		map[SAVE_TRANSFORM] = transform;
		map[SAVE_FONT] = font;
		map[SAVE_CLIP] = currentClip;
		return HTML5CanvasContext2D.push(ctx, map);
	}

	private boolean unclipped = false;

	/**
	 * 
	 * Just clear the clip for the specified number of levels.
	 * 
	 * This method should be called in pairs on the method's Graphic parameter
	 * 
	 * g.unclip$I(-3); ... g.unclip$I(3);
	 * 
	 * 
	 * @param n before code, use n < 0 ("undo") to unclip that many levels, then
	 *          after code use n > 0 to reset the clip to what is was before
	 */
	public void unclip(int n) {
		if (debugClip) {
			System.out.println("JSGraphics2D.unclip " + n);
		}

		Object[][] stack = HTML5CanvasContext2D.getSavedStack(ctx);
		unclipped = (n < 0);
		if (unclipped)
			n = -n;
		if (n > stack.length)
			n = stack.length;
		for (int i = 0; i < n; i++) {
			ctx.restore();
//			if (isBefore)
//				setClipPriv((Shape) stack[stack.length - 1 - i][SAVE_CLIP]);
		}
		currentClip = null;
		for (int i = n; --i >= 0;) {
			setState(stack[stack.length - 1 - i]);
			if (!unclipped)
				setClipPriv((Shape) stack[stack.length - 1 - i][SAVE_CLIP]);
			ctx.save();
		}
	}

	/**
	 * try to equate g.dispose() with ctx.restore().
	 * 
	 * @param n0
	 */
	public void reset(int n0) {
		if (n0 < 1)
			n0 = 1;
		int n;
		if (unclipped) {
			unclip(Integer.MAX_VALUE);
		}
		while ((n = HTML5CanvasContext2D.getSavedLevel(ctx)) >= n0) {
			setState(HTML5CanvasContext2D.pop(ctx));
			ctx.restore();
			if (debugClip) {
				System.out.println("restore n=" + n + " " + transform);
			}
		}
	}

	private void setState(Object[] map) {
		setComposite((Composite) map[SAVE_COMPOSITE]);
		@SuppressWarnings("unused")
		int a = SAVE_ALPHA;
		setAlpha(/** @j2sNative map[a] || */0);
		shader = null;
		setStroke((Stroke) map[SAVE_STROKE]);
		setTransform((AffineTransform) map[SAVE_TRANSFORM]);
		setFont((Font) map[SAVE_FONT]);
		currentClip = (Shape) map[SAVE_CLIP];
	}

	public Graphics create(int x, int y, int width, int height) {
		// from Graphics
		// cell renderer pane and JComponent
		Graphics g = create();
		if (g == null)
			return null;
		g.translate(x, y);
		g.clipRect(0, 0, width, height);
		return g;
	}

	public Graphics create() {
		return (Graphics) clone();
	}

	@Override
	public Object clone() {
		int n = mark(false);
		if (debugClip) {
			System.out.println("clone to " + n);
		}
		JSGraphics2D g = this;
		/**
		 * avoid super call to Object.clone();
		 * 
		 * @j2sNative
		 * 
		 * 			g = Clazz.clone(this);
		 * 
		 */
		{
		}
		g.transform = new AffineTransform(transform);
		if (hints != null) {
			g.hints = (RenderingHints) hints.clone();
		}
		/*
		 * FontInfos are re-used, so must be cloned too, if they are valid, and be
		 * nulled out if invalid. The implied trade-off is that there is more to be
		 * gained from re-using these objects than is lost by having to clone them when
		 * the SG2D is cloned.
		 */
		// if (this.fontInfo != null) {
		// if (this.validFontInfo) {
		// g.fontInfo = (FontInfo)this.fontInfo.clone();
		// } else {
		// g.fontInfo = null;
		// }
		// }
		// if (this.glyphVectorFontInfo != null) {
		// g.glyphVectorFontInfo =
		// (FontInfo)this.glyphVectorFontInfo.clone();
		// g.glyphVectorFRC = this.glyphVectorFRC;
		// }
		// g.invalidatePipe();
		g.setStroke((BasicStroke) currentStroke.clone());
		g.initialState = n;
		return g;
	}

	public void dispose() {
		if (debugClip) {
			System.out.println("dispose to " + initialState);
		}
		reset(initialState);
		if (image != null) {
			image.秘graphicsDisposed();
			image = null;
		}
	}

	public int getWidth() {
		return width;
	}

	public int getHeight() {
		return height;
	}

}
