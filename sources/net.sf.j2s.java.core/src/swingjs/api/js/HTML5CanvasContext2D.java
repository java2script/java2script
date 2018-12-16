package swingjs.api.js;

public abstract class HTML5CanvasContext2D {

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

	public abstract void rect(double x, double y, double width, double height);

	public abstract void fillText(String s, double x, double y);

	public abstract void fillRect(double x, double y, double width, double height);

	public abstract void clearRect(int i, int j, int windowWidth, int windowHeight);

	public abstract void setLineDash(int[] dash);

	public abstract void clip();

	public abstract void quadraticCurveTo(double d, double e, double f, double g);

	public abstract void bezierCurveTo(double d, double e, double f, double g, double h, double i);

	public abstract void drawImage(DOMNode img, int x, int y, int width, int height);

	public static int[] getBuf8(Object imageData) {
		/**
		 * @j2sNative
		 * 
		 *   return imageData.data
		 */
		{
			return null;
		}
	}

	public static void putImageData(HTML5CanvasContext2D ctx, Object imageData, int x, int y) {
		/**
		 * @j2sNative
		 * 
		 *   ctx.putImageData(imageData, x, y);
		 */
		{
		}
	}

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

	public static Object[][] getSaveStack(HTML5CanvasContext2D ctx) {
		/**
		 * @j2sNative
		 * 
		 * return ctx._aSaved; 
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

	/**
	 * Static because there is no "stretchImage" function for Context2d.
	 * @param ctx
	 * @param img
	 * @param sx
	 * @param sy
	 * @param swidth
	 * @param sheight
	 * @param dx
	 * @param dy
	 * @param dwidth
	 * @param dheight
	 */
	public static void stretchImage(HTML5CanvasContext2D ctx, DOMNode img, int sx,
			int sy, int swidth, int sheight, int dx, int dy, int dwidth, int dheight) {
		/**
		 * @j2sNative
		 * 
		 * 		ctx.drawImage(img, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
		 * 
		 */
		{}
	}

	public static Object getImageData(HTML5CanvasContext2D ctx, int x, int y, int width, int height) {
		/**
		 * @j2sNative
		 * 
		 *   return ctx.getImageData(x, y, width, height);
		 */
		{
			return null;
		}
	}
	
	public static void setLineWidth(HTML5CanvasContext2D ctx, double d) {
		/**
		 * @j2sNative
		 * 
		 *    ctx.lineWidth = d;
		 *            
		 */
		{}
	}

	public static void setFont(HTML5CanvasContext2D ctx, String canvasFont) {
		/**
		 * @j2sNative
		 * 
		 *            ctx.font = canvasFont;
		 */
		{}
	}

	public static void setColor(HTML5CanvasContext2D ctx, String s) {
		/**
		 * @j2sNative
		 * 
		 *            ctx.fillStyle = ctx.strokeStyle = s;
		 */
		{}
	}

	public static void setFillStyle(HTML5CanvasContext2D ctx, String s) {
		/**
		 * @j2sNative
		 * 
		 *            ctx.fillStyle = s;
		 */
		{}
	}


}
