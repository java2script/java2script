/*******************************************************************************
 * Copyright (c) 2000, 2004 IBM Corporation and others.
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
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.FontData;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;

/**
 * Instances of this class allow the user to select a font
 * from all available fonts in the system.
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
 */
public class FontDialog extends Dialog {
	FontData fontData, returnFD;
	RGB rgb;
	
	Text familyText;
	Text styleText;
	Text sizeText;
	List familyList;
	List styleList;
	List sizeList;
	Label previewLabel;
	
	Font lastFont;
	Button strikeButton;
	Button underlineButton;
	Combo colorCombo;
	
	String lastPreviewLabel;
	
	static FontFamily[] fontFamilies = new FontFamily[] {
		new FontFamily("Arial"), 
		new FontFamily("Arial Baltic"), 
		new FontFamily("Arial Black"), 
		new FontFamily("Arial CE"), 
		new FontFamily("Arial CYR"), 
		new FontFamily("Arial Greek"), 
		new FontFamily("Arial Narrow"), 
		new FontFamily("Arial TUR"), 
		new FontFamily("Basemic"), 
		new FontFamily("Basemic Symbol"), 
		new FontFamily("Basemic Times"), 
		new FontFamily("Batang"), 
		new FontFamily("BatangChe"), 
		new FontFamily("Berling Antiqua"), 
		new FontFamily("Book Antiqua"), 
		new FontFamily("Bookdings"), 
		new FontFamily("Bookman Old Style"), 
		new FontFamily("Century"), 
		new FontFamily("Century Gothic"), 
		new FontFamily("Comic Sans MS"), 
		new FontFamily("Courier"), 
		new FontFamily("Courier New"), 
		new FontFamily("Courier New Baltic"), 
		new FontFamily("Courier New CE"), 
		new FontFamily("Courier New CYR"), 
		new FontFamily("Courier New Greek"), 
		new FontFamily("Courier New TUR"), 
		new FontFamily("Dotum"), 
		new FontFamily("DotumChe"), 
		new FontFamily("Estrangelo Edessa"), 
		new FontFamily("Euclid"), 
		new FontFamily("Euclid Extra"), 
		new FontFamily("Euclid Fraktur"), 
		new FontFamily("Euclid Math One"), 
		new FontFamily("Euclid Math Two"), 
		new FontFamily("Euclid Symbol"), 
		new FontFamily("Fixedsys"), 
		new FontFamily("Franklin Gothic Medium"), 
		new FontFamily("Frutiger Linotype"), 
		new FontFamily("Garamond"), 
		new FontFamily("Gautami"), 
		new FontFamily("Georgia"), 
		new FontFamily("Gulim"), 
		new FontFamily("GulimChe"), 
		new FontFamily("Gungsuh"), 
		new FontFamily("GungsuhChe"), 
		new FontFamily("Haettenschweiler"), 
		new FontFamily("Impact"), 
		new FontFamily("Kingsoft Phonetic Plain"), 
		new FontFamily("LCD"), 
		new FontFamily("Latha"), 
		new FontFamily("Lucida Console"), 
		new FontFamily("Lucida Sans Typewriter"), 
		new FontFamily("Lucida Sans Unicode"), 
		new FontFamily("MS Gothic"), 
		new FontFamily("MS Mincho"), 
		new FontFamily("MS Outlook"), 
		new FontFamily("MS PGothic"), 
		new FontFamily("MS PMincho"), 
		new FontFamily("MS Sans Serif"), 
		new FontFamily("MS Serif"), 
		new FontFamily("MS UI Gothic"), 
		new FontFamily("MV Boli"), 
		new FontFamily("Mangal"), 
		new FontFamily("Map Symbols"), 
		new FontFamily("MapInfo Cartographic"), 
		new FontFamily("Marlett"), 
		new FontFamily("Math1"), 
		new FontFamily("Math1Mono"), 
		new FontFamily("Math2"), 
		new FontFamily("Math2Mono"), 
		new FontFamily("Math3"), 
		new FontFamily("Math3Mono"), 
		new FontFamily("Math4"), 
		new FontFamily("Math4Mono"), 
		new FontFamily("Math5"), 
		new FontFamily("Math5Mono"), 
		new FontFamily("Microsoft Sans Serif"), 
		new FontFamily("MingLiU"), 
		new FontFamily("Modern"), 
		new FontFamily("Monotype Corsiva"), 
		new FontFamily("PMingLiU"), 
		new FontFamily("Palatino Linotype"), 
		new FontFamily("Raavi"), 
		new FontFamily("Roman"), 
		new FontFamily("SPSS Marker Set"), 
		new FontFamily("Script"), 
		new FontFamily("Shruti"), 
		new FontFamily("Small Fonts"), 
		new FontFamily("Sydnie"), 
		new FontFamily("Sylfaen"), 
		new FontFamily("Symbol"), 
		new FontFamily("System"), 
		new FontFamily("Tahoma"), 
		new FontFamily("Terminal"), 
		new FontFamily("Times New Roman"), 
		new FontFamily("Times New Roman Baltic"), 
		new FontFamily("Times New Roman CE"), 
		new FontFamily("Times New Roman CYR"), 
		new FontFamily("Times New Roman Greek"), 
		new FontFamily("Times New Roman TUR"), 
		new FontFamily("Trebuchet MS"), 
		new FontFamily("Tunga"), 
		new FontFamily("Verdana"), 
		new FontFamily("WST_Czec"), 
		new FontFamily("WST_Engl"), 
		new FontFamily("WST_Fren"), 
		new FontFamily("WST_Germ"), 
		new FontFamily("WST_Ital"), 
		new FontFamily("WST_Span"), 
		new FontFamily("WST_Swed"), 
		new FontFamily("Warnock Pro"), 
		new FontFamily("Warnock Pro Caption"), 
		new FontFamily("Warnock Pro Display"), 
		new FontFamily("Warnock Pro Light"), 
		new FontFamily("Warnock Pro Light Caption"), 
		new FontFamily("Warnock Pro Light Display"), 
		new FontFamily("Warnock Pro Light Subhead"), 
		new FontFamily("Warnock Pro SmBd"), 
		new FontFamily("Warnock Pro SmBd Caption"), 
		new FontFamily("Warnock Pro SmBd Display"), 
		new FontFamily("Warnock Pro SmBd Subhead"), 
		new FontFamily("Warnock Pro Subhead"), 
		new FontFamily("Webdings"), 
		new FontFamily("Wingdings"), 
		new FontFamily("Wingdings 2"), 
		new FontFamily("Wingdings 3"), 
		new FontFamily("ZWAdobeF"), 
		/*
		new FontFamily("仿宋_GB2312", "J2S改善AJAX开发"), 
		new FontFamily("华文中宋", "J2S改善AJAX开发"), 
		new FontFamily("华文彩云", "J2S改善AJAX开发"), 
		new FontFamily("华文新魏", "J2S改善AJAX开发"), 
		new FontFamily("华文细黑", "J2S改善AJAX开发"), 
		new FontFamily("华文行楷", "J2S改善AJAX开发"), 
		new FontFamily("宋体", "J2S改善AJAX开发"), 
		new FontFamily("宋体-方正超大字符集", "J2S改善AJAX开发"), 
		new FontFamily("幼圆", "J2S改善AJAX开发"), 
		new FontFamily("新宋体", "J2S改善AJAX开发"), 
		new FontFamily("方正姚体", "J2S改善AJAX开发"), 
		new FontFamily("方正舒体", "J2S改善AJAX开发"), 
		new FontFamily("楷体_GB2312", "J2S改善AJAX开发"), 
		new FontFamily("隶书", "J2S改善AJAX开发"), 
		new FontFamily("黑体", "J2S改善AJAX开发"),
		new FontFamily("@Batang"), 
		new FontFamily("@BatangChe"), 
		new FontFamily("@Dotum"), 
		new FontFamily("@DotumChe"), 
		new FontFamily("@Fixedsys"), 
		new FontFamily("@Gulim"), 
		new FontFamily("@GulimChe"), 
		new FontFamily("@Gungsuh"), 
		new FontFamily("@GungsuhChe"), 
		new FontFamily("@MS Gothic"), 
		new FontFamily("@MS Mincho"), 
		new FontFamily("@MS PGothic"), 
		new FontFamily("@MS PMincho"), 
		new FontFamily("@MS UI Gothic"), 
		new FontFamily("@MingLiU"), 
		new FontFamily("@PMingLiU"), 
		new FontFamily("@System"), 
		new FontFamily("@Terminal"), 
		new FontFamily("@仿宋_GB2312", "J2S改善AJAX开发"), 
		new FontFamily("@华文中宋", "J2S改善AJAX开发"), 
		new FontFamily("@华文彩云", "J2S改善AJAX开发"), 
		new FontFamily("@华文新魏", "J2S改善AJAX开发"), 
		new FontFamily("@华文细黑", "J2S改善AJAX开发"), 
		new FontFamily("@华文行楷", "J2S改善AJAX开发"), 
		new FontFamily("@宋体", "J2S改善AJAX开发"), 
		new FontFamily("@宋体-方正超大字符集", "J2S改善AJAX开发"), 
		new FontFamily("@幼圆", "J2S改善AJAX开发"), 
		new FontFamily("@新宋体", "J2S改善AJAX开发"), 
		new FontFamily("@方正姚体", "J2S改善AJAX开发"), 
		new FontFamily("@方正舒体", "J2S改善AJAX开发"), 
		new FontFamily("@楷体_GB2312", "J2S改善AJAX开发"), 
		new FontFamily("@隶书", "J2S改善AJAX开发"), 
		new FontFamily("@黑体", "J2S改善AJAX开发"),
		// */ 
	};
	
	static class FontFamily {
		String name;
		String previewLabel;
		String[] scripts;
		
		public FontFamily(String name) {
			this.name = name;
		}

		public FontFamily(String name, String previewLabel) {
			this.name = name;
			this.previewLabel = previewLabel;
		}

		public FontFamily(String name, String previewLabel, String[] scripts) {
			this.name = name;
			this.previewLabel = previewLabel;
			this.scripts = scripts;
		}
	}
	
	static int[] simpleColors = new int[] {
		/*black*/ 0, 0, 0, //
		/*dark red*/ 128, 0, 0, //
		/*green*/ 0, 128, 0, //
		/*siver*/ 192, 192, 192, //
		/*olive*/ 128, 128, 0, //
		/*navy*/ 0, 0, 128, //
		/*purple*/ 128, 0, 128, //
		/*cyan */ 0, 255, 255, //
		/*grey*/ 128, 128, 128, //
		/*red*/ 255, 0, 0, //
		/*light green*/ 0, 255, 64, //
		/*yellow*/ 255, 255, 0, // 
		/*blue*/ 0, 0, 255, //
		/*pink*/ 255, 128, 255, //
		/*light blue*/ 173, 216, 230, //
		/*white*/ 255, 255, 255 //
	};
	
/**
 * Constructs a new instance of this class given only its parent.
 *
 * @param parent a shell which will be the parent of the new instance
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 *    <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed subclass</li>
 * </ul>
 */
public FontDialog (Shell parent) {
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
 * @param parent a shell which will be the parent of the new instance
 * @param style the style of dialog to construct
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 *    <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed subclass</li>
 * </ul>
 */
public FontDialog (Shell parent, int style) {
	super (parent, style);
	checkSubclass ();
}

/**
 * Returns a FontData object describing the font that was
 * selected in the dialog, or null if none is available.
 * 
 * @return the FontData for the selected font, or null
 * @deprecated use #getFontList ()
 */
public FontData getFontData () {
	return fontData;
}

/**
 * Returns a FontData set describing the font that was
 * selected in the dialog, or null if none is available.
 * 
 * @return the FontData for the selected font, or null
 * @since 2.1.1
 */
public FontData [] getFontList () {
	if (fontData == null) return null;
	FontData [] result = new FontData [1];
	result [0] = fontData;
	return result;
}

/**
 * Returns the currently selected color in the receiver.
 *
 * @return the RGB value for the selected color, may be null
 *
 * @see PaletteData#getRGBs
 * 
 * @since 2.1
 */
public RGB getRGB () {
	return rgb;
}

void updatePreviewFontData() {
	if (fontData.getName() == null) return;
	Font font = previewLabel.getFont();
	Font font2 = new Font(dialogShell.getDisplay(), fontData);
	previewLabel.setFont(font2);
	previewLabel.getParent().layout();
	if (font != null && font == lastFont) {
		lastFont.dispose();
	}
	lastFont = font2;
}

/**
 * Makes the dialog visible and brings it to the front
 * of the display.
 *
 * @return a FontData object describing the font that was selected,
 *         or null if the dialog was cancelled or an error occurred
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the dialog has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the dialog</li>
 * </ul>
 */
public FontData open () {
	/*
	if (OS.IsWinCE) SWT.error (SWT.ERROR_NOT_IMPLEMENTED);
	
	/* Get the owner HWND for the dialog *-/
	int hwndOwner = 0;
	if (parent != null) hwndOwner = parent.handle;

	/* Open the dialog *-/
	int hHeap = OS.GetProcessHeap ();
	CHOOSEFONT lpcf = new CHOOSEFONT ();
	lpcf.lStructSize = CHOOSEFONT.sizeof;
	lpcf.hwndOwner = hwndOwner;
	lpcf.Flags = OS.CF_SCREENFONTS | OS.CF_EFFECTS;
	int lpLogFont = OS.HeapAlloc (hHeap, OS.HEAP_ZERO_MEMORY, LOGFONT.sizeof);
	if (fontData != null && fontData.data != null) {
		LOGFONT logFont = fontData.data;
		int lfHeight = logFont.lfHeight;
		int hDC = OS.GetDC (0);
		int pixels = -Compatibility.round (fontData.height * OS.GetDeviceCaps(hDC, OS.LOGPIXELSY), 72);
		OS.ReleaseDC (0, hDC);
		logFont.lfHeight = pixels;
		lpcf.Flags |= OS.CF_INITTOLOGFONTSTRUCT;
		OS.MoveMemory (lpLogFont, logFont, LOGFONT.sizeof);
		logFont.lfHeight = lfHeight;
	}
	lpcf.lpLogFont = lpLogFont;
	if (rgb != null) {
		int red = rgb.red & 0xFF;
		int green = (rgb.green << 8) & 0xFF00;
		int blue = (rgb.blue << 16) & 0xFF0000;
		lpcf.rgbColors = red | green | blue;
	}
	
	/* Make the parent shell be temporary modal *-/
	Shell oldModal = null;
	Display display = null;
	if ((style & (SWT.APPLICATION_MODAL | SWT.SYSTEM_MODAL)) != 0) {
		display = parent.getDisplay ();
		oldModal = display.getModalDialogShell ();
		display.setModalDialogShell (parent);
	}

	/* Open the dialog *-/
	boolean success = OS.ChooseFont (lpcf);
	
	/* Clear the temporary dialog modal parent *-/
	if ((style & (SWT.APPLICATION_MODAL | SWT.SYSTEM_MODAL)) != 0) {
		display.setModalDialogShell (oldModal);
	}
	
	/* Compute the result *-/
	if (success) {
		LOGFONT logFont = OS.IsUnicode ? (LOGFONT) new LOGFONTW () : new LOGFONTA ();
		OS.MoveMemory (logFont, lpLogFont, LOGFONT.sizeof);

		/*
		 * This will not work on multiple screens or
		 * for printing. Should use DC for the proper device.
		 *-/
		int hDC = OS.GetDC(0);
		int logPixelsY = OS.GetDeviceCaps(hDC, OS.LOGPIXELSY);
		int pixels = 0; 
		if (logFont.lfHeight > 0) {
			/*
			 * Feature in Windows. If the lfHeight of the LOGFONT structure
			 * is positive, the lfHeight measures the height of the entire
			 * cell, including internal leading, in logical units. Since the
			 * height of a font in points does not include the internal leading,
			 * we must subtract the internal leading, which requires a TEXTMETRIC,
			 * which in turn requires font creation.
			 *-/
			int hFont = OS.CreateFontIndirect(logFont);
			int oldFont = OS.SelectObject(hDC, hFont);
			TEXTMETRIC lptm = OS.IsUnicode ? (TEXTMETRIC) new TEXTMETRICW () : new TEXTMETRICA ();
			OS.GetTextMetrics(hDC, lptm);
			OS.SelectObject(hDC, oldFont);
			OS.DeleteObject(hFont);
			pixels = logFont.lfHeight - lptm.tmInternalLeading;
		} else {
			pixels = -logFont.lfHeight;
		}
		OS.ReleaseDC(0, hDC);

		int points = Compatibility.round(pixels * 72, logPixelsY);
		fontData = FontData.win32_new (logFont, points);
		int red = lpcf.rgbColors & 0xFF;
		int green = (lpcf.rgbColors >> 8) & 0xFF;
		int blue = (lpcf.rgbColors >> 16) & 0xFF;
		rgb = new RGB (red, green, blue);
	}
		
	/* Free the OS memory *-/
	if (lpLogFont != 0) OS.HeapFree (hHeap, 0, lpLogFont);

	/*
	* This code is intentionally commented.  On some
	* platforms, the owner window is repainted right
	* away when a dialog window exits.  This behavior
	* is currently unspecified.
	*-/
//	if (hwndOwner != 0) OS.UpdateWindow (hwndOwner);
	
	if (!success) return null;
	*/
	this.returnFD = null;
	//Display display = new Display();
	dialogShell = new Shell(parent.display, style | SWT.CLOSE | SWT.APPLICATION_MODAL);
	dialogShell.setText("Font");
	GridLayout gl = new GridLayout();
	dialogShell.setLayout(gl);
	Composite fontPicker = new Composite(dialogShell, SWT.NONE);
	fontPicker.setLayoutData(new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL));
	GridLayout grid = new GridLayout(4, false);
	grid.verticalSpacing = 1;
	grid.horizontalSpacing = 8;
	fontPicker.setLayout(grid);
	Label familyLabel = new Label(fontPicker, SWT.NONE);
	GridData gdLabel = new GridData();
	gdLabel.heightHint = 20;
	familyLabel.setLayoutData(gdLabel);
	familyLabel.setText("&Font:");
	new Label(fontPicker, SWT.NONE).setText("Font st&yle:");
	new Label(fontPicker, SWT.NONE).setText("&Size:");
	//new Label(fontPicker, SWT.NONE);
	Composite buttonsPanel = new Composite(fontPicker, SWT.NONE);
	GridData gdButtons = new GridData(GridData.FILL_HORIZONTAL);
	gdButtons.verticalSpan = 3;
	gdButtons.verticalAlignment = GridData.BEGINNING;
	new Label(buttonsPanel, SWT.NONE);
	buttonsPanel.setLayoutData(gdButtons);
	GridLayout gridLayout = new GridLayout(1, true);
	gridLayout.verticalSpacing = 2;
	gridLayout.horizontalSpacing = 0;
	gridLayout.marginWidth = 0;
	buttonsPanel.setLayout(gridLayout);
	Button okButton = new Button(buttonsPanel, SWT.PUSH);
	okButton.setText("OK");
	GridData gridData = new GridData(72, 21);
	gridData.verticalIndent = GridData.BEGINNING;
	okButton.setLayoutData(gridData);
	okButton.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			returnFD = fontData;
			dialogShell.close();
		}
	});
	Button cancelButton = new Button(buttonsPanel, SWT.PUSH);
	cancelButton.setText("Cancel");
	cancelButton.setLayoutData(gridData);
	cancelButton.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			returnFD = fontData = null;
			dialogShell.close();
		}
	});
	
	familyText = new Text(fontPicker, SWT.SINGLE | SWT.BORDER);
	familyText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
	familyText.addModifyListener(new ModifyListener() {
		public void modifyText(ModifyEvent e) {
			String family = familyText.getText();
			if (family == null) return;
			boolean existed = false;
			for (int i = 0; i < fontFamilies.length; i++) {
				if (family.equals(fontFamilies[i].name)) {
					String label = fontFamilies[i].previewLabel;
					if (label == null) {
						if (lastPreviewLabel == null || !lastPreviewLabel.equals("AaBbYyZz")) {
							lastPreviewLabel = "AaBbYyZz";
							previewLabel.setText(lastPreviewLabel);
						}
					} else {
						if (lastPreviewLabel == null || !lastPreviewLabel.equals(label)) {
							lastPreviewLabel = label;
							previewLabel.setText(label);
						}
					}
					existed = true;
					break;
				}
			}
			if (!existed) return;
			String[] selection = familyList.getSelection();
			if (selection == null || selection.length == 0 || !family.equals(selection[0])) {
				familyList.setSelection(new String[] { family });
				updatePreviewFontData();
			}
		}
	});
	styleText = new Text(fontPicker, SWT.SINGLE | SWT.BORDER);
	styleText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
	styleText.addModifyListener(new ModifyListener() {
		public void modifyText(ModifyEvent e) {
			String style = styleText.getText();
			if (style == null) return;
			String[] items = styleList.getItems();
			boolean existed = false;
			for (int i = 0; i < items.length; i++) {
				if (items[i].equals(style)) {
					existed = true;
					break;
				}
			}
			if (!existed) return;
			String[] selection = styleList.getSelection();
			if (selection == null || selection.length == 0 || !style.equals(selection[0])) {
				styleList.setSelection(new String[] { style });
				updatePreviewFontData();
			}
		}
	});
	sizeText = new Text(fontPicker, SWT.SINGLE | SWT.BORDER);
	GridData gd = new GridData();
	gd.widthHint = 48;
	sizeText.setLayoutData(gd);
	sizeText.addModifyListener(new ModifyListener() {
		public void modifyText(ModifyEvent e) {
			String size = sizeText.getText();
			if (size == null) return;
			String[] selection = sizeList.getSelection();
			if (selection == null || selection.length == 0 || !size.equals(selection[0])) {
				sizeList.setSelection(new String[] { size });
			}
			updatePreviewFontData();
		}
	});
	
	familyList = new List(fontPicker, SWT.SIMPLE | SWT.V_SCROLL | SWT.BORDER);
	familyList.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			String family = familyList.getSelection()[0];
			familyText.setText(family);
			fontData.setName(family);
			updatePreviewFontData();
		}
	});
	GridData gdList = new GridData(GridData.FILL_HORIZONTAL);
	gdList.heightHint = 80;
	gdList.widthHint = 120;
	familyList.setLayoutData(gdList);
	String[] familyNames = new String[fontFamilies.length];
	for (int i = 0; i < familyNames.length; i++) {
		familyNames[i] = fontFamilies[i].name;
	}
	familyList.setItems(familyNames);
	styleList = new List(fontPicker, SWT.SINGLE | SWT.V_SCROLL | SWT.BORDER);
	styleList.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			styleText.setText(styleList.getSelection()[0]);
			int index = styleList.getSelectionIndex();
			if (index == 1) {
				fontData.setStyle(SWT.ITALIC);
			} else if (index == 2) {
				fontData.setStyle(SWT.BOLD);
			} else if (index == 3) {
				fontData.setStyle(SWT.ITALIC | SWT.BOLD);
			} else {
				fontData.setStyle(SWT.NORMAL);
			}
			updatePreviewFontData();
		}
	});
	gdList = new GridData(GridData.FILL_BOTH);
	gdList.widthHint = 90;
	styleList.setLayoutData(gdList);
	String[] styles = new String[] {"Regular", "Italic", "Bold", "Bold Italic"};
	styleList.setItems(styles);
	sizeList = new List(fontPicker, SWT.SIMPLE | SWT.V_SCROLL | SWT.BORDER);
	sizeList.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			sizeText.setText(sizeList.getSelection()[0]);
			int size = -1;
			try {
				size = Integer.parseInt(sizeList.getSelection()[0]);
			} catch (NumberFormatException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			if (size != -1) {
				fontData.setHeight(size);
				updatePreviewFontData();
			}
		}
	});
	gdList = new GridData(GridData.FILL_BOTH);
	//gdList.widthHint = 32;
	gdList.heightHint = 80;
	sizeList.setLayoutData(gdList);
	sizeList.setItems(new String[] {"8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72"});
	
	if (fontData == null) {
		fontData = new FontData();
		fontData.setStyle(SWT.NORMAL);
		fontData.setHeight(10);
	}
	String heightStr = "" + fontData.getHeight();
	sizeList.setSelection(new String[] { heightStr });
	
	Group effectGroup = new Group(fontPicker, SWT.NONE);
	effectGroup.setText("Effects");
	effectGroup.setLayout(new GridLayout());
	GridData gdEffect = new GridData(GridData.VERTICAL_ALIGN_BEGINNING | GridData.FILL_BOTH);
	gdEffect.verticalIndent = 5 + 12;
	effectGroup.setLayoutData(gdEffect);
	
	strikeButton = new Button(effectGroup, SWT.CHECK);
	strikeButton.setText("Stri&keout");
	strikeButton.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			FontData fd = fontData;
			fd.isStrikeout = ((Button) e.widget).getSelection();
			updatePreviewFontData();
		}
	});
	underlineButton = new Button(effectGroup, SWT.CHECK);
	underlineButton.setText("&Underline");
	underlineButton.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			FontData fd = fontData;
			fd.isUnderline = ((Button) e.widget).getSelection();
			updatePreviewFontData();
		}
	});
	
	new Label(effectGroup, SWT.NONE).setText("&Color:");
	colorCombo = new Combo(effectGroup, SWT.DROP_DOWN | SWT.READ_ONLY);
	String[] colorNames = new String[] { "Black", "Dark Red", "Green", "Silver", "Olive", "Navy", "Purple", "Aqua", "Gray", "Red", "Light Green", "Yellow", "Blue", "Pink", "Light Blue", "White"};
	colorCombo.setItems(colorNames);
	//colorCombo.select(0);
	colorCombo.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
	
	Composite ssPanel = new Composite(fontPicker, SWT.NONE);
	ssPanel.setLayout(new GridLayout());
	GridData gdCross = new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL);
	gdCross.horizontalSpan = 2;
	ssPanel.setLayoutData(gdCross);
	
	Group sampleGroup = new Group(ssPanel, SWT.NONE);
	sampleGroup.setLayout(new GridLayout());
	GridData gdSample = new GridData(GridData.FILL_HORIZONTAL);
	gdSample.verticalIndent = 12;
	sampleGroup.setLayoutData(gdSample);
	sampleGroup.setText("Sample");
	Composite previewComposite = new Composite(sampleGroup, SWT.BORDER);
	GridData gdPreview = new GridData(GridData.FILL_BOTH);
	gdPreview.heightHint = 36;
	previewComposite.setLayoutData(gdPreview);
	GridLayout glPreview = new GridLayout();
	glPreview.marginWidth = 0;
	glPreview.verticalSpacing = 0;
	previewComposite.setLayout(glPreview);
	previewLabel = new Label(previewComposite, SWT.NONE);
	GridData ggg = new GridData(GridData.FILL_BOTH);
	ggg.grabExcessVerticalSpace = true;
	ggg.verticalAlignment = GridData.CENTER;
	ggg.grabExcessHorizontalSpace = true;
	ggg.horizontalAlignment = GridData.CENTER;
	previewLabel.setLayoutData(ggg);
	previewLabel.setText("AaBbYyZz");
	
	new Label(ssPanel, SWT.NONE).setText("Sc&ript");
	Combo scriptCombo = new Combo(ssPanel, SWT.DROP_DOWN | SWT.READ_ONLY);
	scriptCombo.setItems(new String[] {"Western"});
	scriptCombo.select(0);
	scriptCombo.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
	
	colorCombo.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			int index = colorCombo.getSelectionIndex();
			int i3 = index + index + index;
			rgb = new RGB(simpleColors[i3], simpleColors[i3 + 1], simpleColors[i3 + 2]); 
			previewLabel.setForeground(new Color(e.display, rgb));
		}
	});
	
	int idx = 0;
	int style = fontData.getStyle();
	if ((style & SWT.BOLD) != 0 && (style & SWT.ITALIC) != 0) {
		idx = 3;
	} else if ((style & SWT.BOLD) != 0) {
		idx = 2;
	} else if ((style & SWT.ITALIC) != 0) {
		idx = 1;
	}
	styleList.setSelection(idx);
	styleText.setText(styles[idx]);
	
	familyList.setSelection(new String[] { fontData.getName() });
	familyText.setText(fontData.getName());
	sizeText.setText("" + fontData.getHeight());
	strikeButton.setSelection(fontData.isStrikeout);
	underlineButton.setSelection(fontData.isUnderline);
	
	RGB rgb = this.rgb;
	if (rgb == null) {
		rgb = new RGB(0, 0, 0);
	}
	for (int i = 0; i < simpleColors.length / 3; i++) {
		int i3 = i + i + i;
		if (simpleColors[i3] == rgb.red
				&& simpleColors[i3 + 1] == rgb.green
				&& simpleColors[i3 + 2] == rgb.blue) {
			colorCombo.select(i);
			break;
		}
	}

	dialogShell.pack();
	dialogShell.open();
	while (!dialogShell.isDisposed())
		if (!dialogShell.getDisplay().readAndDispatch()) dialogShell.getDisplay().sleep();
	//display.dispose();
	
	/**
	 * @j2sNative
	 * this.dialogReturn = this.returnFD;
	 */ {}
	return returnFD;
}

/**
 * Sets a FontData object describing the font to be
 * selected by default in the dialog, or null to let
 * the platform choose one.
 * 
 * @param fontData the FontData to use initially, or null
 * @deprecated use #setFontList (FontData [])
 */
public void setFontData (FontData fontData) {
	this.fontData = fontData;
}

/**
 * Sets a set of FontData objects describing the font to
 * be selected by default in the dialog, or null to let
 * the platform choose one.
 * 
 * @param fontData the set of FontData objects to use initially, or null
 * @since 2.1.1
 */
public void setFontList (FontData [] fontData) {
	if (fontData != null && fontData.length > 0) {
		this.fontData = fontData [0];
	} else {
		this.fontData = null;
	}
}

/**
 * Sets the receiver's selected color to be the argument.
 *
 * @param rgb the new RGB value for the selected color, may be
 *        null to let the platform to select a default when
 *        open() is called
 *
 * @see PaletteData#getRGBs
 * 
 * @since 2.1
 */
public void setRGB (RGB rgb) {
	this.rgb = rgb;
}

}
