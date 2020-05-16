package swingjs.api.js;

import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D.Float;

public abstract class HTML5CanvasContext2D {

	public class ImageData {
		public int[] data; 
	}

	public ImageData imageData;
	
	public Object[][] _aSaved;
	
	public double lineWidth;

	public String font, fillStyle, strokeStyle;

	public float globalAlpha;

	public abstract void drawImage(DOMNode img, double sx,
			double sy, double swidth, double sheight, double dx, double dy, double width, double height);

	public abstract ImageData getImageData(int x, int y, int width, int height);

	public abstract void beginPath();

	public abstract void moveTo(double x0, double y0);

	public abstract void lineTo(double x1, double y1);

	public abstract void stroke();

	public abstract void save();

	public abstract void scale(double f, double g);

	public abstract void arc(double centerX, double centerY, double radius, double startAngle, double  endAngle, boolean counterclockwise);

	public abstract void closePath();

	public abstract void restore();

	public abstract void translate(double x, double y);
	
	public abstract void rotate(double radians);

	public abstract void fill();


	public abstract void fill(String winding);

	public abstract void rect(double x, double y, double width, double height);

	public abstract void fillText(String s, double x, double y);

	public abstract void fillRect(double x, double y, double width, double height);

	public abstract void clearRect(double i, double j, double windowWidth, double windowHeight);

	public abstract void setLineDash(int[] dash);

	public abstract void clip();

	public abstract void quadraticCurveTo(double d, double e, double f, double g);

	public abstract void bezierCurveTo(double d, double e, double f, double g, double h, double i);

	public abstract void drawImage(DOMNode img, double x, double y, double width, double height);

	public abstract void putImageData(Object imageData, double x, double y);

	public abstract void transform(double d, double shx, double e, double shy, double f, double g);


	/**
	 * pull one save structure onto the stack array ctx._aSaved
	 * 
	 * @param ctx
	 * @return the length of the stack array after the push
	 */
	public static int push(HTML5CanvasContext2D ctx, Object[] map) {
		/**
		 * @j2sNative
		 * 
		 * (ctx._aSaved || (ctx._aSaved = [])).push(map); 
		 * return ctx._aSaved.length;
		 */
		{
			return 0;
		}
	}

	/**
	 * pull one save structure off the stack array ctx._aSaved
	 * 
	 * @param ctx
	 * @return
	 */
	public static Object[] pop(HTML5CanvasContext2D ctx) {
		/**
		 * @j2sNative
		 * 
		 * return (ctx._aSaved && ctx._aSaved.length > 0 ? ctx._aSaved.pop() : null); 
		 */
		{
			return null;
		}
	}

	public static int getSavedLevel(HTML5CanvasContext2D ctx) {
		/**
		 * @j2sNative
		 * 
		 * return (ctx._aSaved ? ctx._aSaved.length : 0); 
		 */
		{
			return 0;
		}
	}
	
	public static Object[][] getSavedStack(HTML5CanvasContext2D ctx) {
	   /**
	    * @j2sNative
	    * 
	    * return (ctx._aSaved || []);
	    */
		{
			return null;
		}
		
	}

	public static double[] setMatrix(HTML5CanvasContext2D ctx, AffineTransform transform) {
		double[] m = /**  @j2sNative ctx._m || */ null;
		if (transform == null) {
			/** @j2sNative ctx._m = null; */
			return null;			
		}
		if (m == null) {
			/**
			 * @j2sNative
			 * ctx._m = m = new Array(6);
			 */
			transform.getMatrix(m);
		}
		return m;
	}

	public static void createLinearGradient(HTML5CanvasContext2D ctx, Float p1, Float p2, String css1, String css2) {
		/**
		 * @j2sNative
		 * 
		 *   var grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
		 *   grd.addColorStop(0,css1);
		 *   grd.addColorStop(1,css2);
		 *   ctx.fillStyle = grd;
		 */
		}

	abstract public void drawImage(DOMNode domNode, int x, int y);

}
