package swingjs;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.HeadlessException;
import java.awt.Point;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.util.Locale;


public class JSGraphicsEnvironment extends GraphicsEnvironment {

	private static GraphicsDevice device;

	/*
	 * NOTE: This class is called from java.awt.GraphicsEnvironment
	 * within in j2sNative block.
	 * 
	 */
	public JSGraphicsEnvironment(){
		System.out.println("JSGraphicsEnvironment initialized");		
	}

	@Override
	public Graphics2D createGraphics(BufferedImage img) {
		return (Graphics2D) img.getImageGraphic().create();
	}

	private static Font[] availableFonts;

	@Override
	public Font[] getAllFonts() {
		if (availableFonts == null) {
			String[] names = getAvailableFontFamilyNames();
			availableFonts = new Font[names.length];
			for (int i = names.length; --i >= 0;)
				availableFonts[i] = new Font(names[i], Font.PLAIN, 1);
		}
		return availableFonts;
	}

	@SuppressWarnings("deprecation")
	@Override
	public String[] getAvailableFontFamilyNames() {
		return Toolkit.getDefaultToolkit().getFontList();
	}

	@SuppressWarnings("deprecation")
	@Override
	public String[] getAvailableFontFamilyNames(Locale l) {
		return Toolkit.getDefaultToolkit().getFontList();
	}

	@Override
	public GraphicsDevice getDefaultScreenDevice() {
		if (device == null)
			device = (GraphicsDevice) JSUtil.getInstance("swingjs.JSScreenDevice"); 
		return device;
	}

	@Override
	public Point getCenterPoint()  {
		Dimension d = Toolkit.getDefaultToolkit().getScreenSize();
		return new Point(d.width / 2, d.height / 2);
	}

	public GraphicsDevice[] getScreenDevices() throws HeadlessException {
		return new GraphicsDevice[] {getDefaultScreenDevice()};
	}


}
