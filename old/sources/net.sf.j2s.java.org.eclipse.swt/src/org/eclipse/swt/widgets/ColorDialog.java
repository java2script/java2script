/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.swt.widgets;


import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.graphics.PaletteData;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.internal.ResizeSystem;
import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.dnd.DragAdapter;
import org.eclipse.swt.internal.dnd.DragAndDrop;
import org.eclipse.swt.internal.dnd.DragEvent;
import org.eclipse.swt.internal.dnd.HTMLEventWrapper;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;

/**
 * Instances of this class allow the user to select a color
 * from a predefined set of available colors.
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>(none)</dd>
 * <dt><b>Events:</b></dt>
 * <dd>(none)</dd>
 * </dl>
 * <p>
 * IMPORTANT: This class is intended to be subclassed <em>only</em>
 * within the SWT implementation.
 * </p>
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.widgets.ColorDialog");
 */

public class ColorDialog extends Dialog {
	static class HSL {
		public int h, s, l;
		
		public HSL(int h, int s, int l) {
			this.h = h;
			this.s = s;
			this.l = l;
		}

		public RGB toRGB() {
	        double r = 0, g = 0, b = 0;
			double temp1, temp2;
			double H = h / 240f; // h / 360.0;
			double S = s / 240f; // s / 100.0;
			double L = l / 240f; // l / 100.0;
			if (L == 0) {
				r = g = b = 0;
			} else {
				if (S == 0) {
					r = g = b = L;
				} else {
					temp2 = ((L <= 0.5) ? L * (1.0 + S) : L + S - (L * S));
					temp1 = 2.0 * L - temp2;
					double[] t3 = new double[] { H + 1.0 / 3.0, H,
							H - 1.0 / 3.0 };
					double[] clr = new double[] { 0, 0, 0 };
					for (int i = 0; i < 3; i++) {
						if (t3[i] < 0)
							t3[i] += 1.0;
						if (t3[i] > 1)
							t3[i] -= 1.0;
						if (6.0 * t3[i] < 1.0)
							clr[i] = temp1 + (temp2 - temp1) * t3[i] * 6.0;
						else if (2.0 * t3[i] < 1.0)
							clr[i] = temp2;
						else if (3.0 * t3[i] < 2.0)
							clr[i] = (temp1 + (temp2 - temp1)
									* ((2.0 / 3.0) - t3[i]) * 6.0);
						else
							clr[i] = temp1;
					}
					r = clr[0];
					g = clr[1];
					b = clr[2];
				}
			}
			return new RGB((int) (255 * r), (int) (255 * g), (int) (255 * b));
		}
		
		public void fromRGB(RGB rgb) {
			float var_R = ( rgb.red / 255f );                    
			float var_G = ( rgb.green / 255f );
			float var_B = ( rgb.blue / 255f );
			
			float var_Min;    //Min. value of RGB
			float var_Max;    //Max. value of RGB
			float del_Max;    //Delta RGB value
							 
			if (var_R > var_G) 
				{ var_Min = var_G; var_Max = var_R; }
			else 
				{ var_Min = var_R; var_Max = var_G; }

			if (var_B > var_Max) var_Max = var_B;
			if (var_B < var_Min) var_Min = var_B;

			del_Max = var_Max - var_Min; 
									 
			float H = 0, S, L;
			L = ( var_Max + var_Min ) / 2f;
		
			if ( del_Max == 0 ) { H = 0; S = 0; } // gray
			else {                                //Chroma
				if ( L < 0.5 ) 
					S = del_Max / ( var_Max + var_Min );
				else           
					S = del_Max / ( 2 - var_Max - var_Min );
		
				float del_R = ( ( ( var_Max - var_R ) / 6f ) + ( del_Max / 2f ) ) / del_Max;
				float del_G = ( ( ( var_Max - var_G ) / 6f ) + ( del_Max / 2f ) ) / del_Max;
				float del_B = ( ( ( var_Max - var_B ) / 6f ) + ( del_Max / 2f ) ) / del_Max;
		
				if ( var_R == var_Max ) 
					H = del_B - del_G;
				else if ( var_G == var_Max ) 
					H = ( 1 / 3f ) + del_R - del_B;
				else if ( var_B == var_Max ) 
					H = ( 2 / 3f ) + del_G - del_R;
				if ( H < 0 ) H += 1;
				if ( H > 1 ) H -= 1;
			}
			h = (int)(240*H); // (int)(360*H);
			s = (int)(S*240); // (int)(S*100);
			l = (int)(L*240); // (int)(L*100);
		}
	}
	
	RGB rgb;
	
	static RGB[] customColors = new RGB[16];
	static RGB lastSelectedColor;
	
	int selectedCustomIndex;
	
	Element customButton, addToCustomButton, okButton, cancelButton;
	Element hText, lText, sText, rText, gText, bText;
	Element[] basicColorBoxes, customColorBoxes;
	Element[] colorStrips;
	Element previewBlock, colorBlock, hsPicker, stripBlock, lPicker;

	private RunnableCompatibility updateRGBRunnable;
	private RunnableCompatibility updateHSLRunnable;

	private Object hColorBlockClick;
	private Object hStripBlockClick;
	private Object hAdd2CustomClick;
	private Object hCustomClick;
	private Object hOKClick;
	private Object hCancelClick;

	private Object[] basicColorBoxClicks, customColorBoxClicks;

	private DragAndDrop dnd;

/**
 * Constructs a new instance of this class given only its parent.
 * 
 * @param parent
 *            a composite control which will be the parent of the new instance
 * 
 * @exception IllegalArgumentException
 *                <ul>
 *                <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 *                </ul>
 * @exception SWTException
 *                <ul>
 *                <li>ERROR_THREAD_INVALID_ACCESS - if not called from the
 *                thread that created the parent</li>
 *                <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed
 *                subclass</li>
 *                </ul>
 * 
 * @see SWT
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 */
public ColorDialog (Shell parent) {
	this (parent, SWT.PRIMARY_MODAL);
}

/**
 * Constructs a new instance of this class given its parent
 * and a style value describing its behavior and appearance.
 * <p>
 * The style value is either one of the style constants defined in
 * class <code>SWT</code> which is applicable to instances of this
 * class, or must be built by <em>bitwise OR</em>'ing together 
 * (that is, using the <code>int</code> "|" operator) two or more
 * of those <code>SWT</code> style constants. The class description
 * lists the style constants that are applicable to the class.
 * Style bits are also inherited from superclasses.
 * </p>
 *
 * @param parent a composite control which will be the parent of the new instance (cannot be null)
 * @param style the style of control to construct
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 *    <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed subclass</li>
 * </ul>
 *
 * @see SWT
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 */
public ColorDialog (Shell parent, int style) {
	super (parent, style);
	checkSubclass ();
}

/*
int CCHookProc (int hdlg, int uiMsg, int lParam, int lpData) {
	switch (uiMsg) {
		case OS.WM_INITDIALOG:
			if (title != null && title.length () != 0) {
				/* Use the character encoding for the default locale *-/
				TCHAR buffer = new TCHAR (0, title, true);
				OS.SetWindowText (hdlg, buffer);
			}
			break;
	}
	return 0;
}
*/

/**
 * Returns the currently selected color in the receiver.
 *
 * @return the RGB value for the selected color, may be null
 *
 * @see PaletteData#getRGBs
 */
public RGB getRGB () {
	return rgb;
}

void releaseHandles() {
	if (dnd != null) {
		dnd.unbind();
		dnd = null;
	}
	Object[] hsl = new Object[] { hText, sText, lText };
	for (int i = 0; i < hsl.length; i++) {
		if (hsl[i] != null) {
			Clazz.removeEvent(hsl[i], "change", updateRGBRunnable);
			Clazz.removeEvent(hsl[i], "keyup", updateRGBRunnable);
			OS.destroyHandle(hsl[i]);
		}
	}
	Object[] rgb = new Object[] { rText, gText, bText };
	for (int i = 0; i < rgb.length; i++) {
		if (rgb[i] != null) {
			Clazz.removeEvent(rgb[i], "change", updateHSLRunnable);
			Clazz.removeEvent(rgb[i], "keyup", updateHSLRunnable);
			OS.destroyHandle(rgb[i]);
		}
	}
	hText = null;
	sText = null;
	lText = null;
	rText = null;
	gText = null;
	bText = null;
	updateHSLRunnable = null;
	updateRGBRunnable = null;

	if (customButton != null) {
		OS.destroyHandle(customButton);
		customButton = null;
	}
	if (addToCustomButton != null) {
		OS.destroyHandle(addToCustomButton);
		addToCustomButton = null;
	}
	if (okButton != null) {
		OS.destroyHandle(okButton);
		okButton = null;
	}
	if (cancelButton != null) {
		OS.destroyHandle(cancelButton);
		cancelButton = null;
	}
	if (hsPicker != null) {
		OS.destroyHandle(hsPicker);
		hsPicker = null;
	}
	if (lPicker != null) {
		OS.destroyHandle(lPicker);
		lPicker = null;
	}
	if (stripBlock != null) {
		OS.destroyHandle(stripBlock);
		stripBlock = null;
	}
	if (colorBlock != null) {
		OS.destroyHandle(colorBlock);
		colorBlock = null;
	}
	for (int i = 0; i < basicColorBoxes.length; i++) {
		if (basicColorBoxes[i] != null) {
			if (basicColorBoxClicks[i] != null) {
				Clazz.removeEvent(basicColorBoxes[i], "click", basicColorBoxClicks[i]);
				basicColorBoxClicks[i] = null;
			}
			OS.destroyHandle(basicColorBoxes[i]);
			basicColorBoxes[i] = null;
		}
	}
	for (int i = 0; i < customColorBoxes.length; i++) {
		if (customColorBoxes[i] != null) {
			if (customColorBoxClicks[i] != null) {
				Clazz.removeEvent(customColorBoxes[i], "click", customColorBoxClicks[i]);
				customColorBoxClicks[i] = null;
			}
			OS.destroyHandle(customColorBoxes[i]);
			customColorBoxes[i] = null;
		}
	}
}

/**
 * Makes the receiver visible and brings it to the front
 * of the display.
 *
 * @return the selected color, or null if the dialog was
 *         cancelled, no color was selected, or an error
 *         occurred
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public RGB open () {
	if (rgb == null) {
		if (lastSelectedColor != null) {
			rgb = lastSelectedColor;
		} else {
			rgb = new RGB(0, 0, 0);
		}
	}
	
	dialogShell = new Shell(parent.display, style | SWT.CLOSE | SWT.APPLICATION_MODAL) {

		protected void releaseHandle() {
			releaseHandles();
			super.releaseHandle();
		}
		
	};
	dialogShell.setLayout(new GridLayout());
	final Composite composite = new Composite(dialogShell, SWT.NONE);
	String[] buf = new String[0];
    buf[buf.length] = "<div class=\"color-dialog\">";
    buf[buf.length] = "<div class=\"basic-panel\">";
    buf[buf.length] = "<div class=\"color-dialog-label\"><span>B</span>asic colors:</div>";
    buf[buf.length] = "<div class=\"basic-colors-grid\">";
    
    final Object map = new Object();
    final Object colorMap = new Object();
    String[] colors = null;
    /**
     * @j2sNative
colors = [
"apple green", 128, 255, 0,
"aqua", 0, 255, 255,
"black", 0, 0, 0,
"blue", 0, 0, 255,
"blueviolet", 128, 0, 255,
"chocolate", 128, 64, 64,
"dark blueviolet", 64, 0, 128,
"dark brown", 64, 0, 0,
"dark forest green", 0, 64, 0,
"dark olive", 128, 128, 64,
"dark orange", 255, 128, 0,
"dark purple", 64, 0, 64,
"dark purple", 64, 0, 64,
"dark red", 128, 0, 0,
"dark teal", 0, 64, 64,
"dark turquoise", 0, 64, 128,
"deep sky blue", 0, 128, 255,
"green", 0, 128, 0,
"grey", 128, 128, 128,
"light green", 0, 255, 64,
"light grey", 192, 192, 192,
"light teal", 64, 128, 128,
"lime", 0, 255, 0,
"magenta", 255, 0, 255,
"maroon", 128, 0, 64,
"medium blue", 0, 0, 160,
"medium slate blue", 128, 128, 255,
"midnight blue", 0, 0, 64,
"navy", 0, 0, 128,
"olive", 128, 128, 0,
"pale green", 128, 255, 128,
"pale rose", 255, 128, 192,
"pale slate blue", 128, 128, 192,
"pale turquoise", 128, 255, 255,
"pale yellow", 255, 255, 128,
"pink", 255, 128, 255,
"pumpkin", 255, 128, 64,
"purple", 128, 0, 128,
"red", 255, 0, 0,
"rose", 255, 0, 128,
"saddle brown", 128, 64, 0,
"salmon", 255, 128, 128,
"sea green", 0, 128, 64,
"spring green", 0, 255, 128,
"teal", 0, 128, 128,
"turquoise", 0, 128, 192,
"white", 255, 255, 255,
"yellow", 255, 255, 0
];
for (var i = 0; i < 48; i++) {
	var i4 = i + i + i + i;
	var arr = [colors[i4 + 1], colors[i4 + 2], colors[i4 + 3]];
	colorMap[colors[i4]] = arr;
	map[colors[i4]] = arr.join (',');
}
     */ { map.toString(); if (colors == null); }
     
    final String[] colorMatrix = new String[] { "salmon", "pale yellow",
				"pale green", "spring green", "pale turquoise",
				"deep sky blue", "pale rose", "pink", "red", "yellow",
				"apple green", "light green", "aqua", "turquoise",
				"pale slate blue", "magenta", "chocolate", "pumpkin", "lime",
				"teal", "dark turquoise", "medium slate blue", "maroon",
				"rose", "dark red", "dark orange", "green", "sea green",
				"blue", "medium blue", "purple", "blueviolet", "dark brown",
				"saddle brown", "dark forest green", "dark teal", "navy",
				"midnight blue", "dark purple", "dark blueviolet", "black",
				"olive", "dark olive", "grey", "light teal", "light grey",
				"dark purple", "white" };
    boolean selected = false;
    for (int i = 0; i < 48; i++) {
    	buf[buf.length] = "<div class=\"box-focus\"><div class=\"box-select";
    	if (!selected) {
	    	int[] rgbColor = null;
	    	/**
	    	 * @j2sNative
	    	 * rgbColor = colorMap[colorMatrix[i]];
	    	 */ { rgbColor = new int[0]; }
	    	if (rgb.red == rgbColor[0] && rgb.green == rgbColor[1] && rgb.blue == rgbColor[2]) {
	    		buf[buf.length] = " color-selected";
	    		selected = true;
	    	}
    	}
    	buf[buf.length] = "\"><div class=\"color-box\" style=\"background-color:rgb(";
    	/**
    	 * @j2sNative
    	 * buf[buf.length] = map[colorMatrix[i]];
    	 */ {}
    	buf[buf.length] = ");\"";
    	buf[buf.length] = "></div></div></div>";
    }
    buf[buf.length] = "</div>";
    buf[buf.length] = "<div class=\"color-dialog-label\"><span>C</span>ustom colors:</div>";
    buf[buf.length] = "<div class=\"custom-colors-grid\">";
    for (int i = 0; i < 16; i++) {
    	buf[buf.length] = "<div class=\"box-focus\"><div class=\"box-select\"><div class=\"color-box\"></div></div></div>";
    }
    buf[buf.length] = "</div>";
    buf[buf.length] = "<button class=\"define-custom-colors-button\"><span>D</span>efine Custom Colors &gt;&gt;</button>";
    buf[buf.length] = "<div class=\"color-dialog-button-panel\">";
    buf[buf.length] = "<button class=\"color-dialog-button ok-button\">OK</button>";
    buf[buf.length] = "<button class=\"color-dialog-button cancel-button\">Cancel</button>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "<div class=\"custom-panel\">";
    buf[buf.length] = "<div class=\"color-picker-panel\">";
    buf[buf.length] = "<div class=\"color-hs-block\">";
    buf[buf.length] = "<div class=\"color-cross-picker\">";
    buf[buf.length] = "<div class=\"color-cross-top\"></div>";
    buf[buf.length] = "<div class=\"color-cross-right\"></div>";
    buf[buf.length] = "<div class=\"color-cross-bottom\"></div>";
    buf[buf.length] = "<div class=\"color-cross-left\"></div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "<div class=\"color-l-picker\">";
    buf[buf.length] = "<div class=\"color-strip\">";
    for (int i = 0; i < 29; i++) {
        buf[buf.length] = "<div></div>";
    }
    buf[buf.length] = "</div>";
    buf[buf.length] = "<div class=\"color-slider\"></div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "<div class=\"color-selector-panel\">";
    buf[buf.length] = "<div class=\"color-preview\">";
    buf[buf.length] = "<div class=\"color-preview-block\"></div>";
    buf[buf.length] = "<div class=\"color-dialog-label\">Color | Soli<span>d</span></div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "<div class=\"color-hsl-selector\">";
    buf[buf.length] = "<div class=\"color-dialog-label\">Hu<span>e</span>:</div>";
    buf[buf.length] = "<input class=\"color-dialog-selector\" value=\"0\" />";
    buf[buf.length] = "<div class=\"color-dialog-label\"><span>S</span>at:</div>";
    buf[buf.length] = "<input class=\"color-dialog-selector\" value=\"0\" />";
    buf[buf.length] = "<div class=\"color-dialog-label\"><span>L</span>um:</div>";
    buf[buf.length] = "<input class=\"color-dialog-selector\" value=\"0\" />";
    buf[buf.length] = "<div class=\"color-dialog-label\"></div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "<div class=\"color-rgb-selector\">";
    buf[buf.length] = "<div class=\"color-dialog-label\"><span>R</span>ed:</div>";
    buf[buf.length] = "<input class=\"color-dialog-selector\" value=\"0\" />";
    buf[buf.length] = "<div class=\"color-dialog-label\"><span>G</span>reen:</div>";
    buf[buf.length] = "<input class=\"color-dialog-selector\" value=\"0\" />";
    buf[buf.length] = "<div class=\"color-dialog-label\">Bl<span>u</span>e:</div>";
    buf[buf.length] = "<input class=\"color-dialog-selector\" value=\"0\" />";
    buf[buf.length] = "<div class=\"color-dialog-label\"></div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "<button class=\"add-to-custom-colors-button\"><span>A</span>dd to Custom Colors</button>";
    buf[buf.length] = "</div>";
    buf[buf.length] = "</div>";
    
    String tmpStr = null;
    /**
     * @j2sNative
     * tmpStr = buf.join ('');
     */ {}
	final Element containerHandle = composite.containerHandle();
	containerHandle.innerHTML = tmpStr;
	composite.setLayoutData(new GridData(200, 280));
	
	Element[] btns = containerHandle.getElementsByTagName("BUTTON");
	for (int i = 0; i < btns.length; i++) {
		Element btn = btns[i];
		String cssClass = btns[i].className;
		if (cssClass == "define-custom-colors-button") {
			customButton = btn;
		} else if (cssClass == "add-to-custom-colors-button") {
			addToCustomButton = btn;
		} else if (cssClass.indexOf("ok-button") != -1) {
			okButton = btn;
		} else if (cssClass.indexOf("cancel-button") != -1) {
			cancelButton = btn;
		}
	}
	Element dialogEl = containerHandle.childNodes[0];
	hCustomClick = new RunnableCompatibility() {
		public void run() {
			composite.setLayoutData(new GridData(480, 280));
			dialogShell.pack();
			customButton.disabled = true;
			customButton.style.color = "gray";
			
			configureCustomPanel();
			
			OS.addCSSClass(containerHandle.childNodes[0], "color-dialog-custom");
//			parent.display.asyncExec(new Runnable() {
//				public void run() {
//					OS.SetFocus(hText); //hText.focus();
//				}
//			});
		}
	};
	Clazz.addEvent(customButton, "click", hCustomClick);
	
	hOKClick = new RunnableCompatibility() {
		public void run() {
			int r = constrain(rText, 255);
			int g = constrain(gText, 255);
			int b = constrain(bText, 255);
			lastSelectedColor = rgb = new RGB(r, g, b);
			dialogReturn = rgb;
			dialogShell.close();
		}
	};
	Clazz.addEvent(okButton, "click", hOKClick);
	
	hCancelClick = new RunnableCompatibility() {
		public void run() {
			dialogShell.close();
		}
	};
	Clazz.addEvent(cancelButton, "click", hCancelClick);
	
	Element[] inputs = containerHandle.getElementsByTagName("INPUT");
	hText = inputs[0];
	lText = inputs[1];
	sText = inputs[2];
	rText = inputs[3];
	gText = inputs[4];
	bText = inputs[5];

	Element customEl = dialogEl.childNodes[1];
	previewBlock = customEl.childNodes[1].childNodes[0].childNodes[0];
	Element colorPanel = customEl.childNodes[0];
	hsPicker = colorPanel.childNodes[0].childNodes[0];
	colorBlock = colorPanel.childNodes[0];
	stripBlock = colorPanel.childNodes[1].childNodes[0];
	lPicker = colorPanel.childNodes[1].childNodes[1];
	
	Element basicEl = dialogEl.childNodes[0];
	basicColorBoxes = copyChildNodes(basicEl.childNodes[1]);
	customColorBoxes = copyChildNodes(basicEl.childNodes[3]);
	colorStrips = copyChildNodes(colorPanel.childNodes[1].childNodes[0]);
	
	basicColorBoxClicks = new Object[basicColorBoxes.length];
	customColorBoxClicks = new Object[customColorBoxes.length];
	
	for (int i = 0; i < basicColorBoxes.length; i++) {
		final int index = i;
		basicColorBoxClicks[i] = new RunnableCompatibility() {
			public void run() {
				int i = index;
				int[] rgbColor = null;
				Object map = colorMap;
				String[] matrix = colorMatrix;
		    	/**
		    	 * @j2sNative
		    	 * rgbColor = colorMap[matrix[i]];
		    	 */ { map.toString(); matrix.toString(); rgbColor = new int[0]; }
		    	HSL hsl = new HSL(0, 0, 0);
		    	hsl.fromRGB(new RGB(rgbColor[0], rgbColor[1], rgbColor[2]));
				updateFromHSL(hsl.h, hsl.s, hsl.l);
		    	updateFromRGB(rgbColor[0], rgbColor[1], rgbColor[2]);
				switchColorBox(i);
			}
		};
		Clazz.addEvent(basicColorBoxes[i], "click", basicColorBoxClicks[i]);
	}
	for (int i = 0; i < customColorBoxes.length; i++) {
		final int index = i;
		customColorBoxClicks[i] = new RunnableCompatibility() {
			public void run() {
				RGB rgb = customColors[index];
				if (rgb == null) {
			    	rgb = new RGB(255, 255, 255);
				}
		    	HSL hsl = new HSL(0, 0, 0);
		    	hsl.fromRGB(rgb);
				updateFromHSL(hsl.h, hsl.s, hsl.l);
				selectedCustomIndex = index;
				updateFromRGB(rgb.red, rgb.green, rgb.blue);
				switchColorBox(index + 48);
			}
		};
		Clazz.addEvent(customColorBoxes[i], "click", customColorBoxClicks[i]);
		if (customColors[i] != null) {
			RGB color = customColors[i]; 
			customColorBoxes[i].childNodes[0].childNodes[0].style.backgroundColor = "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
		}
	}
	
	updateFromRGB(rgb.red, rgb.green, rgb.blue);
	int h = constrain(hText, 239);
	int s = constrain(sText, 240);
	int l = constrain(lText, 240);
	updateFromHSL(h, s, l);
	
	dialogShell.setText((title == null || title.length() == 0)? "Color" : title);
	dialogShell.pack();
	dialogShell.open();
	Point size = dialogShell.getSize();
	int y = (dialogShell.getMonitor().clientHeight - size.y) / 2 - 20;
	if (y < 0) {
		y = 0;
	}
	dialogShell.setLocation((dialogShell.getMonitor().clientWidth - size.x) / 2, y);
	ResizeSystem.register(dialogShell, SWT.CENTER);
	
	Display display = parent.getDisplay();
	while (!dialogShell.isDisposed()) {
		if (!display.readAndDispatch()) display.sleep();
	}
	
	/*
	/* Get the owner HWND for the dialog *-/
	int hwndOwner = parent.handle;

	/* Create the CCHookProc *-/
	Callback callback = new Callback (this, "CCHookProc", 4); //$NON-NLS-1$
	int lpfnHook = callback.getAddress ();
	if (lpfnHook == 0) SWT.error(SWT.ERROR_NO_MORE_CALLBACKS);
	
	/* Allocate the Custom Colors *-/
	Display display = parent.display;
	if (display.lpCustColors == 0) {
		int hHeap = OS.GetProcessHeap ();
		display.lpCustColors = OS.HeapAlloc (hHeap, OS.HEAP_ZERO_MEMORY, 16 * 4);
	}
	
	/* Open the dialog *-/	
	CHOOSECOLOR lpcc = new CHOOSECOLOR ();
	lpcc.lStructSize = CHOOSECOLOR.sizeof;
	lpcc.Flags = OS.CC_ANYCOLOR | OS.CC_ENABLEHOOK;
	lpcc.lpfnHook = lpfnHook;
	lpcc.hwndOwner = hwndOwner;
	lpcc.lpCustColors = display.lpCustColors;
	if (rgb != null) {
		lpcc.Flags |= OS.CC_RGBINIT;
		int red = rgb.red & 0xFF;
		int green = (rgb.green << 8) & 0xFF00;
		int blue = (rgb.blue << 16) & 0xFF0000;
		lpcc.rgbResult = red | green | blue;
	}
	
	/* Make the parent shell be temporary modal *-/
	Shell oldModal = null;
	if ((style & (SWT.APPLICATION_MODAL | SWT.SYSTEM_MODAL)) != 0) {
		oldModal = display.getModalDialogShell ();
		display.setModalDialogShell (parent);
	}
	
	/* Open the dialog *-/
	boolean success = OS.ChooseColor (lpcc);
	
	/* Clear the temporary dialog modal parent *-/
	if ((style & (SWT.APPLICATION_MODAL | SWT.SYSTEM_MODAL)) != 0) {
		display.setModalDialogShell (oldModal);
	}
	
	if (success) {
		int red = lpcc.rgbResult & 0xFF;
		int green = (lpcc.rgbResult >> 8) & 0xFF;
		int blue = (lpcc.rgbResult >> 16) & 0xFF;
		rgb = new RGB (red, green, blue);
	}
	
	/* Free the CCHookProc *-/
	callback.dispose ();
	
	/* Free the Custom Colors *-/
	/*
	* This code is intentionally commented.  Currently,
	* there is exactly one set of custom colors per display.
	* The memory associated with these colors is released
	* when the display is disposed.
	*-/
//	if (lpCustColors != 0) OS.HeapFree (hHeap, 0, lpCustColors);
	
	/*
	* This code is intentionally commented.  On some
	* platforms, the owner window is repainted right
	* away when a dialog window exits.  This behavior
	* is currently unspecified.
	*-/
//	if (hwndOwner != 0) OS.UpdateWindow (hwndOwner);
	
	if (!success) return null;
	*/
	return rgb;
}

void configureCustomPanel() {
	hAdd2CustomClick = new RunnableCompatibility() {
		public void run() {
			int r = constrain(rText, 255);
			int g = constrain(gText, 255);
			int b = constrain(bText, 255);
			customColors[selectedCustomIndex % 16] = new RGB(r, g, b);
			customColorBoxes[selectedCustomIndex % 16].childNodes[0].childNodes[0].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
			selectedCustomIndex = (selectedCustomIndex + 1) % 16;
		}
	};
	Clazz.addEvent(addToCustomButton, "click", hAdd2CustomClick);

	dnd = new DragAndDrop();
	dnd.addDragListener(new DragAdapter() {
		int originalTop = 0;
		public boolean dragging(DragEvent e) {
			int top = originalTop + e.deltaY();
			int l = 240 - top * 240 / 172;
			if (l < 0 && lText.value == "0") return true;
			if (l > 240 && lText.value == "240") return true;
			lText.value = "" + l;
			int h = constrain(hText, 239);
			int s = constrain(sText, 240);
			l = constrain(lText, 240);
			updateFromHSL(h, s, l);
			l = constrain(lText, 240);
			e.sourceElement.style.top = (172 - l * 172 / 240 - 5) + "px";
			return true;
		}
		public boolean dragBegan(DragEvent e) {
			CSSStyle style = e.sourceElement.style;
			originalTop = style.top.length() > 0 ? Integer.parseInt(style.top) : 0;
			return true;
		}
	});
	dnd.bind(lPicker);
	
	hColorBlockClick = new RunnableCompatibility() {
		public void run() {
			HTMLEventWrapper e = new HTMLEventWrapper(getEvent());
			Point pt = OS.calcuateRelativePosition(colorBlock, document.body);
			int h = (e.x - pt.x) * 239 / 198;
			int s = 240 - (e.y - pt.y) * 240 / 172;
			hText.value = "" + h;
			sText.value = "" + s;
			
			h = constrain(hText, 239);
			s = constrain(sText, 240);
			int l = constrain(lText, 240);
			updateFromHSL(h, s, l);
		}
	};
	Clazz.addEvent(colorBlock, "click", hColorBlockClick);
	
	hStripBlockClick = new RunnableCompatibility() {
		public void run() {
			HTMLEventWrapper e = new HTMLEventWrapper(getEvent());
			Point pt = OS.calcuateRelativePosition(stripBlock, document.body);
			int l = 240 - (e.y - pt.y) * 240 / 172;
			lText.value = "" + l;
			
			int h = constrain(hText, 239);
			int s = constrain(sText, 240);
			l = constrain(lText, 240);
			updateFromHSL(h, s, l);
		}
	};
	Clazz.addEvent(hStripBlockClick, "click", hStripBlockClick);
	
	updateRGBRunnable = new RunnableCompatibility() {
		public void run() {
			int h = constrain(hText, 239);
			int s = constrain(sText, 240);
			int l = constrain(lText, 240);
			updateFromHSL(h, s, l);
		}
	};

	updateHSLRunnable = new RunnableCompatibility() {
		public void run() {
			int r = constrain(rText, 255);
			int g = constrain(gText, 255);
			int b = constrain(bText, 255);
			updateFromRGB(r, g, b);
		}
	};

	Object[] hsl = new Object[] { hText, sText, lText };
	for (int i = 0; i < hsl.length; i++) {
		Clazz.addEvent(hsl[i], "change", updateRGBRunnable);
		Clazz.addEvent(hsl[i], "keyup", updateRGBRunnable);
	}
	Object[] rgb = new Object[] { rText, gText, bText };
	for (int i = 0; i < rgb.length; i++) {
		Clazz.addEvent(rgb[i], "change", updateHSLRunnable);
		Clazz.addEvent(rgb[i], "keyup", updateHSLRunnable);
	}
}

int constrain(Object el, int max) {
	Element textEl = (Element) el;
	int val = Integer.parseInt(textEl.value);
	if (val < 0) {
		val = 0;
		textEl.value = "0";
		textEl.select();
	} else if (val > max) {
		val = max;
		textEl.value = "" + max;
		textEl.select();
	}
	return val;
}
/**
 * Sets the receiver's selected color to be the argument.
 *
 * @param rgb the new RGB value for the selected color, may be
 *        null to let the platform select a default when
 *        open() is called
 * @see PaletteData#getRGBs
 */
public void setRGB (RGB rgb) {
	this.rgb = rgb;
}

void updateFromHSL(int h, int s, int l) {
	RGB rgb = new HSL(h, s, l).toRGB();
	rText.value = "" + rgb.red;
	gText.value = "" + rgb.green;
	bText.value = "" + rgb.blue;
	previewBlock.style.backgroundColor = "rgb(" + rgb.red + "," + rgb.green + "," + rgb.blue + ")";
	hsPicker.style.left = h * 198 / 239 + "px";
	hsPicker.style.top = (240 - s) * 172 / 240 + "px";
	lPicker.style.top = (240 - l - 5) * 172 / 240 + "px";
	updateColorStrip(h, s);
}

void updateFromRGB(int r, int g, int b) {
	HSL hsl = new HSL(0, 0, 0);
	hsl.fromRGB(new RGB(r, g, b));
	hText.value = "" + hsl.h;
	sText.value = "" + hsl.s;
	lText.value = "" + hsl.l;
	previewBlock.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	hsPicker.style.left = hsl.h * 198 / 239 + "px";
	hsPicker.style.top = (240 - hsl.s) * 172 / 240 + "px";
	lPicker.style.top = (240 - hsl.l - 5) * 172 / 240 + "px";
	updateColorStrip(hsl.h, hsl.s);
}

void updateColorStrip(int h, int s) {
	for (int i = 0; i < colorStrips.length; i++) {
		int l = 240 - i * 240 / 29;
		RGB rgb = new HSL(h, s, l).toRGB();
		colorStrips[i].style.backgroundColor = "rgb(" + rgb.red + "," + rgb.green + "," + rgb.blue + ")";
	}
}

void switchColorBox(int index) {
	if (index > 48) {
		for (int i = 0; i < basicColorBoxes.length; i++) {
			OS.removeCSSClass(basicColorBoxes[i].childNodes[0], "color-selected");
		}
		for (int i = 0; i < customColorBoxes.length; i++) {
			OS.updateCSSClass(customColorBoxes[i].childNodes[0], "color-selected", i == index - 48);
		}
	} else {
		for (int i = 0; i < basicColorBoxes.length; i++) {
			OS.updateCSSClass(basicColorBoxes[i].childNodes[0], "color-selected", i == index);
		}
		for (int i = 0; i < customColorBoxes.length; i++) {
			OS.removeCSSClass(customColorBoxes[i].childNodes[0], "color-selected");
		}
	}
}

Element[] copyChildNodes(Object o) {
	Element el = (Element) o;
	int length = el.childNodes.length;
	Element[] childNodes = new Element[length];
	for (int i = 0; i < length; i++) {
		childNodes[i] = el.childNodes[i];
	}
	return childNodes;
}
}
