/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     Zhou Renjian - initial Java2Script implementation
 *******************************************************************************/
package org.eclipse.swt.widgets;


import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.ResizeSystem;
import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.dnd.DragAndDrop;
import org.eclipse.swt.internal.dnd.HTMLEventWrapper;
import org.eclipse.swt.internal.dnd.ShellFrameDND;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

/**
 * Instances of this class provide the appearance and
 * behavior of <code>Shells</code>, but are not top
 * level shells or dialogs. Class <code>Shell</code>
 * shares a significant amount of code with this class,
 * and is a subclass.
 * <p>
 * IMPORTANT: This class was intended to be abstract and
 * should <em>never</em> be referenced or instantiated.
 * Instead, the class <code>Shell</code> should be used.
 * </p>
 * <p>
 * Instances are always displayed in one of the maximized, 
 * minimized or normal states:
 * <ul>
 * <li>
 * When an instance is marked as <em>maximized</em>, the
 * window manager will typically resize it to fill the
 * entire visible area of the display, and the instance
 * is usually put in a state where it can not be resized 
 * (even if it has style <code>RESIZE</code>) until it is
 * no longer maximized.
 * </li><li>
 * When an instance is in the <em>normal</em> state (neither
 * maximized or minimized), its appearance is controlled by
 * the style constants which were specified when it was created
 * and the restrictions of the window manager (see below).
 * </li><li>
 * When an instance has been marked as <em>minimized</em>,
 * its contents (client area) will usually not be visible,
 * and depending on the window manager, it may be
 * "iconified" (that is, replaced on the desktop by a small
 * simplified representation of itself), relocated to a
 * distinguished area of the screen, or hidden. Combinations
 * of these changes are also possible.
 * </li>
 * </ul>
 * </p>
 * Note: The styles supported by this class must be treated
 * as <em>HINT</em>s, since the window manager for the
 * desktop on which the instance is visible has ultimate
 * control over the appearance and behavior of decorations.
 * For example, some window managers only support resizable
 * windows and will always assume the RESIZE style, even if
 * it is not set.
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>BORDER, CLOSE, MIN, MAX, NO_TRIM, RESIZE, TITLE, ON_TOP, TOOL</dd>
 * <dt><b>Events:</b></dt>
 * <dd>(none)</dd>
 * </dl>
 * Class <code>SWT</code> provides two "convenience constants"
 * for the most commonly required style combinations:
 * <dl>
 * <dt><code>SHELL_TRIM</code></dt>
 * <dd>
 * the result of combining the constants which are required
 * to produce a typical application top level shell: (that 
 * is, <code>CLOSE | TITLE | MIN | MAX | RESIZE</code>)
 * </dd>
 * <dt><code>DIALOG_TRIM</code></dt>
 * <dd>
 * the result of combining the constants which are required
 * to produce a typical application dialog shell: (that 
 * is, <code>TITLE | CLOSE | BORDER</code>)
 * </dd>
 * </dl>
 * <p>
 * IMPORTANT: This class is intended to be subclassed <em>only</em>
 * within the SWT implementation.
 * </p>
 *
 * @see #getMinimized
 * @see #getMaximized
 * @see Shell
 * @see SWT
 * 
 * @j2sRequireImport org.eclipse.swt.internal.browser.OS
 */

public class Decorations extends Canvas {
	Image image, smallImage, largeImage;
	Image [] images;
	Menu menuBar;
	Menu [] menus;
	Control savedFocus;
	Button defaultButton, saveDefault;
	//int swFlags, hAccel, nAccel;
	boolean moved, resized, opened, maximized, minimized;
	//int oldX = OS.CW_USEDEFAULT, oldY = OS.CW_USEDEFAULT;
	//int oldWidth = OS.CW_USEDEFAULT, oldHeight = OS.CW_USEDEFAULT;
	Element contentHandle;
	Element shellTitle;
	Element shellIcon;
	Element modalHandle;
	private Rectangle oldBounds;
	private String lastClientAreaCSSText;
	private String lastBodyCSSText;
	private int lastBodyScrollLeft;
	private int lastBodyScrollTop;
//	private Object lastClientAreaOnScroll;
	Element shellMin;
	Element shellMax;
	Element shellClose;
	Element titleBar;
	Element shellMenuBar;
	Element shellToolBar;
	private ShellFrameDND shellFrameDND;
	private Object hContentKeyDown;
	private Object hIconClick;
	private Object hMinClick;
	Object hMaxClick;
	private Object hCloseClick;
	private Object hTitleBarClick;
	private Object hNoTextSelection;
	private DragAndDrop dnd;

/**
 * Prevents uninitialized instances from being created outside the package.
 * @j2sIgnore
 */
Decorations () {
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
 * @see SWT#BORDER
 * @see SWT#CLOSE
 * @see SWT#MIN
 * @see SWT#MAX
 * @see SWT#RESIZE
 * @see SWT#TITLE
 * @see SWT#NO_TRIM
 * @see SWT#SHELL_TRIM
 * @see SWT#DIALOG_TRIM
 * @see SWT#ON_TOP
 * @see SWT#TOOL
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 * 
 * @j2sIgnore
 */
public Decorations (Composite parent, int style) {
	super (parent, checkStyle (style));
}

void addMenu (Menu menu) {
	if (menus == null) menus = new Menu [4];
	for (int i=0; i<menus.length; i++) {
		if (menus [i] == null) {
			menus [i] = menu;
			return;
		}
	}
	Menu [] newMenus = new Menu [menus.length + 4];
	newMenus [menus.length] = menu;
	System.arraycopy (menus, 0, newMenus, 0, menus.length);
	menus = newMenus;
}

void bringToTop () {
	bringToTop(true, true);
}

void bringToTop (boolean parentShell, boolean childShells) {
	Display.topMaxShell = null;
	Display.topMaxShellNeedUpdated = true;
	if (parentShell && childShells) {
		Display.deactivateAllTitleBarShells();
	}
	if (parentShell && parent != null && parent instanceof Decorations) {
		((Decorations) parent).bringToTop(true, false);
	}
	if (titleBar != null) {
		titleBar.style.backgroundColor = "activecaption";
		shellTitle.style.color = "captiontext";
	}
	/*
	* This code is intentionally commented.  On some platforms,
	* the ON_TOP style creates a shell that will stay on top
	* of every other shell on the desktop.  Using SetWindowPos ()
	* with HWND_TOP caused problems on Windows 98 so this code is
	* commented out until this functionality is specified and
	* the problems are fixed.
	*/
//	if ((style & SWT.ON_TOP) != 0) {
//		int flags = OS.SWP_NOSIZE | OS.SWP_NOMOVE | OS.SWP_NOACTIVATE; 
//		OS.SetWindowPos (handle, OS.HWND_TOP, 0, 0, 0, 0, flags);
//	} else {
		//OS.BringWindowToTop (handle);
		CSSStyle style = handle.style;
//		style.visibility = "visible";
//		if (style.display == "none") {
//			style.display = "block";
//		}
		if (style.zIndex != window.currentTopZIndex) {
			style.zIndex = window.currentTopZIndex = window.currentTopZIndex + 2;
		}
		if ((style.width == null || style.width.length() == 0) 
				&& (style.height == null || style.height.length() == 0)){
			setSize(this.width, this.height);
		}
		setLocation(this.left, this.top);
		
		if ((this.style & SWT.TOOL) == 0)
		/**
		 * @j2sNative
		 * var title = this.getText();
		 * if (title != null) {
		 * 	// Record default title
		 * 	if (window["document.title"] == null) {
		 * 		window["document.title"] = document.title;
		 * 	}
		 * 	if (window["document.title.setter"] == null) {
		 * 		document.title = title; // set title directly
		 * 	} else {
		 * 		// document.title.setter may modify title
		 * 		window["document.title.setter"] (title);
		 * 	}
		 * }
		 */ {}
		int count = children.length; //handle.childNodes.length;
		for (int i = 0; i < count; i++) {
			Control control = children[i]; //display.getControl (handle.childNodes[i]);
			if (control != null && control != this && control.handle != null
					&& (control instanceof Shell)/* && control.isVisible()*/) {
				style = control.handle.style;
				if (style != null && style.zIndex != window.currentTopZIndex) {
					style.zIndex = window.currentTopZIndex = window.currentTopZIndex + 2;
				}
			}
		}
		// widget could be disposed at this point
//	}
	if (childShells && this instanceof Shell) {
		Shell sh = (Shell) this;
		Shell[] children = sh.getShells();
		for (int i = 0; i < children.length; i++) {
			Shell s = children[i];
			if ((s.style & (SWT.APPLICATION_MODAL | SWT.PRIMARY_MODAL | SWT.SYSTEM_MODAL)) != 0
					&& s.isVisible() && !s.isDisposed()) {
				s.bringToTop(false, true);
			}
		}
		
		Dialog.checkExistedDialogs((Shell) this);
	}
	
	if (modalHandle != null) {
		modalHandle.style.zIndex = handle.style.zIndex - 1;
	}
}

static int checkStyle (int style) {
	if ((style & SWT.NO_TRIM) != 0) {
		style &= ~(SWT.CLOSE | SWT.TITLE | SWT.MIN | SWT.MAX | SWT.RESIZE | SWT.BORDER);
	}
	/*
	if (OS.IsWinCE) {
		/*
		* Feature in WinCE PPC.  WS_MINIMIZEBOX or WS_MAXIMIZEBOX
		* are not supposed to be used.  If they are, the result
		* is a button which does not repaint correctly.  The fix
		* is to remove this style.
		*-/
		if ((style & SWT.MIN) != 0) style &= ~SWT.MIN;
		if ((style & SWT.MAX) != 0) style &= ~SWT.MAX;
		return style;
	}
	*/
	if ((style & (SWT.MENU | SWT.MIN | SWT.MAX | SWT.CLOSE)) != 0) {
		style |= SWT.TITLE;
	}
	
	/*
	* If either WS_MINIMIZEBOX or WS_MAXIMIZEBOX are set,
	* we must also set WS_SYSMENU or the buttons will not
	* appear.
	*/
	if ((style & (SWT.MIN | SWT.MAX)) != 0) style |= SWT.CLOSE;
	
	/*
	* Both WS_SYSMENU and WS_CAPTION must be set in order
	* to for the system menu to appear.
	*/
	if ((style & SWT.CLOSE) != 0) style |= SWT.TITLE;
	
	/*
	* Bug in Windows.  The WS_CAPTION style must be
	* set when the window is resizable or it does not
	* draw properly.
	*/
	/*
	* This code is intentionally commented.  It seems
	* that this problem originally in Windows 3.11,
	* has been fixed in later versions.  Because the
	* exact nature of the drawing problem is unknown,
	* keep the commented code around in case it comes
	* back.
	*/
//	if ((style & SWT.RESIZE) != 0) style |= SWT.TITLE;
	
	return style;
}

void checkBorder () {
	/* Do nothing */
}

void checkOpened () {
	if (!opened) resized = false;
}

protected void checkSubclass () {
	if (!isValidSubclass ()) error (SWT.ERROR_INVALID_SUBCLASS);
}

/*
int callWindowProc (int hwnd, int msg, int wParam, int lParam) {
	if (handle == 0) return 0;
	return OS.DefMDIChildProc (hwnd, msg, wParam, lParam);
}
*/

void closeWidget () {
	Event event = new Event ();
	event.doit = true;
	sendEvent (SWT.Close, event);
	if (event.doit && !isDisposed ()) dispose ();
}

/*
int compare (ImageData data1, ImageData data2, int width, int height, int depth) {
	int value1 = Math.abs (data1.width - width), value2 = Math.abs (data2.width - width);
	if (value1 == value2) {
		int transparent1 = data1.getTransparencyType ();
		int transparent2 = data2.getTransparencyType ();
		if (transparent1 == transparent2) {
			if (data1.depth == data2.depth) return 0;
			return data1.depth > data2.depth && data1.depth <= depth ? -1 : 1;
		}
		if (!OS.IsWinCE && OS.WIN32_VERSION >= OS.VERSION (5, 1)) {
			if (transparent1 == SWT.TRANSPARENCY_ALPHA) return -1;
			if (transparent2 == SWT.TRANSPARENCY_ALPHA) return 1;
		}
		if (transparent1 == SWT.TRANSPARENCY_MASK) return -1;
		if (transparent2 == SWT.TRANSPARENCY_MASK) return 1;
		if (transparent1 == SWT.TRANSPARENCY_PIXEL) return -1;
		if (transparent2 == SWT.TRANSPARENCY_PIXEL) return 1;
		return 0;
	}
	return value1 < value2 ? -1 : 1;
}
*/

Control computeTabGroup () {
	return this;
}

Control computeTabRoot () {
	return this;
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Composite#containerHandle()
 */
protected Element containerHandle() {
	return contentHandle;
}

public Rectangle computeTrim (int x, int y, int width, int height) {
	checkWidget ();
	if ((style & SWT.NO_TRIM) == 0) {
		if ((style & (SWT.TITLE | SWT.CLOSE | SWT.MIN | SWT.MAX)) != 0) {
			//height += 20;
			height += Math.max(OS.getContainerHeight(titleBar), 19);
			if (width < 105) {
				width = 105;
			}
		}
		if ((style & (SWT.TITLE | SWT.CLOSE | SWT.MIN | SWT.MAX | SWT.BORDER)) != 0) {
			width += 8;
			height += 5;
			x -= 4;
			y -= 3;
			if (OS.isIE50 || OS.isIE55 || OS.isIE60) {
				y -= 2;
			}
		} else {
			width += 6;
			height += 6;
			x -= 3;
			y -= 3;
		}
		if ((style & SWT.BORDER) != 0) {
			width += 4;
			height += 2;
			x += 1;
			//y += 1;
		}
	}
	return new Rectangle (x, y, width, height);
	/*
	/* Get the size of the trimmings *-/
	RECT rect = new RECT ();
	OS.SetRect (rect, x, y, x + width, y + height);
	int bits1 = OS.GetWindowLong (handle, OS.GWL_STYLE);
	int bits2 = OS.GetWindowLong (handle, OS.GWL_EXSTYLE);
	boolean hasMenu = OS.IsWinCE ? false : OS.GetMenu (handle) != 0;
	OS.AdjustWindowRectEx (rect, bits1, hasMenu, bits2);

	/* Get the size of the scroll bars *-/
	if (horizontalBar != null) rect.bottom += OS.GetSystemMetrics (OS.SM_CYHSCROLL);
	if (verticalBar != null) rect.right += OS.GetSystemMetrics (OS.SM_CXVSCROLL);

	/* Get the height of the menu bar *-/
	if (hasMenu) {
		RECT testRect = new RECT ();
		OS.SetRect (testRect, 0, 0, rect.right - rect.left, rect.bottom - rect.top);
		OS.SendMessage (handle, OS.WM_NCCALCSIZE, 0, testRect);
		while ((testRect.bottom - testRect.top) < height) {
			rect.top -= OS.GetSystemMetrics (OS.SM_CYMENU) - OS.GetSystemMetrics (OS.SM_CYBORDER);
			OS.SetRect(testRect, 0, 0, rect.right - rect.left, rect.bottom - rect.top);
			OS.SendMessage (handle, OS.WM_NCCALCSIZE, 0, testRect);
		}
	}
	return new Rectangle (rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top);
	*/
}

void createAccelerators () {
	/*
	hAccel = nAccel = 0;
	int maxAccel = 0;
	MenuItem [] items = display.items;
	if (menuBar == null || items == null) {
		if (!OS.IsPPC) return;
		maxAccel = 1;
	} else {
		maxAccel = OS.IsPPC ? items.length + 1 : items.length;
	}
	ACCEL accel = new ACCEL ();
	byte [] buffer1 = new byte [ACCEL.sizeof];	
	byte [] buffer2 = new byte [maxAccel * ACCEL.sizeof];
	if (menuBar != null && items != null) {
		for (int i=0; i<items.length; i++) {
			MenuItem item = items [i];
			if (item != null && item.accelerator != 0) {
				Menu menu = item.parent;
				if (menu.parent == this) {
					while (menu != null && menu != menuBar) {
						menu = menu.getParentMenu ();
					}
					if (menu == menuBar) {
						item.fillAccel (accel);
						OS.MoveMemory (buffer1, accel, ACCEL.sizeof);
						System.arraycopy (buffer1, 0, buffer2, nAccel * ACCEL.sizeof, ACCEL.sizeof);
						nAccel++;
					}
				}
			}
		}
	}
	if (OS.IsPPC) {
		/* 
		* Note on WinCE PPC.  Close the shell when user taps CTRL-Q.
		* IDOK represents the "Done Button" which also closes the shell.
		*-/
		accel.fVirt = (byte) (OS.FVIRTKEY | OS.FCONTROL);
		accel.key = (short) 'Q';
		accel.cmd = (short) OS.IDOK;
		OS.MoveMemory (buffer1, accel, ACCEL.sizeof);
		System.arraycopy (buffer1, 0, buffer2, nAccel * ACCEL.sizeof, ACCEL.sizeof);
		nAccel++;			
	}
	if (nAccel != 0) hAccel = OS.CreateAcceleratorTable (buffer2, nAccel);
	*/
}

Image createIcon (Image image) {
	/*
	ImageData data = image.getImageData ();
	if (data.alpha == -1 && data.alphaData == null) {
		ImageData mask = data.getTransparencyMask ();
		return new Image (display, data, mask);
	}
	int width = data.width, height = data.height;
	int hMask, hBitmap;
	int hDC = OS.GetDC (handle);
	int dstHdc = OS.CreateCompatibleDC (hDC), oldDstBitmap;
	if (!OS.IsWinCE && OS.WIN32_VERSION >= OS.VERSION (5, 1)) {
		hBitmap = Display.create32bitDIB (image.handle, data.alpha, data.alphaData, data.transparentPixel);
		hMask = OS.CreateBitmap (width, height, 1, 1, null);
		oldDstBitmap = OS.SelectObject (dstHdc, hMask);
		OS.PatBlt (dstHdc, 0, 0, width, height, OS.BLACKNESS);
	} else {
		hMask = Display.createMaskFromAlpha (data, width, height);
		/* Icons need black pixels where the mask is transparent *-/
		hBitmap = OS.CreateCompatibleBitmap (hDC, width, height);
		oldDstBitmap = OS.SelectObject (dstHdc, hBitmap);
		int srcHdc = OS.CreateCompatibleDC (hDC);
		int oldSrcBitmap = OS.SelectObject (srcHdc, image.handle);
		OS.PatBlt (dstHdc, 0, 0, width, height, OS.BLACKNESS);
		OS.BitBlt (dstHdc, 0, 0, width, height, srcHdc, 0, 0, OS.SRCINVERT);
		OS.SelectObject (srcHdc, hMask);
		OS.BitBlt (dstHdc, 0, 0, width, height, srcHdc, 0, 0, OS.SRCAND);
		OS.SelectObject (srcHdc, image.handle);
		OS.BitBlt (dstHdc, 0, 0, width, height, srcHdc, 0, 0, OS.SRCINVERT);
		OS.SelectObject (srcHdc, oldSrcBitmap);
		OS.DeleteDC (srcHdc);
	}
	OS.SelectObject (dstHdc, oldDstBitmap);
	OS.DeleteDC (dstHdc);
	OS.ReleaseDC (handle, hDC);
	ICONINFO info = new ICONINFO ();
	info.fIcon = true;
	info.hbmColor = hBitmap;
	info.hbmMask = hMask;
	int hIcon = OS.CreateIconIndirect (info);
	if (hIcon == 0) SWT.error(SWT.ERROR_NO_HANDLES);
	OS.DeleteObject (hBitmap);
	OS.DeleteObject (hMask);
	return Image.win32_new (display, SWT.ICON, hIcon);
	*/
	return null;
}

private static Element createCSSDiv(Element handle, String css) {
	Element el = document.createElement("DIV");
	el.className = css;
	handle.appendChild(el);
	return el;
}

protected static void createResizeHandles(Element handle) {
	String[] handles = new String[] {
			"shell-left-top",
			"shell-right-top",
			"shell-center-top",
			"shell-left-middle",
			"shell-right-middle",
			"shell-center-middle",
			"shell-left-bottom",
			"shell-right-bottom",
			"shell-center-bottom"
	};
	for (int i = 0; i < handles.length; i++) {
		createCSSDiv(handle, handles[i]);
	}
}

protected static void appendShadowHandles(Element handle, boolean top, boolean right, boolean bottom, boolean left) {
	String[] handles = new String[] {
			left && top ? "shadow-left-top" : null,
			right && top ? "shadow-right-top" : null,
			top ? "shadow-center-top" : null,
			left ? "shadow-left-middle" : null,
			right ? "shadow-right-middle" : null,
			"shadow-center-middle",
			left && bottom ? "shadow-left-bottom" : null,
			right && bottom ? "shadow-right-bottom" : null,
			bottom ? "shadow-center-bottom" : null
	};
	for (int i = 0; i < handles.length; i++) {
		if (handles[i] != null) {
			createCSSDiv(handle, handles[i]);
		}
	}
	if (OS.isChrome10) {
		handle.style.opacity = "1";
	}
	if (OS.isIE) {
		handle.style.filter = "";
	}
}

protected static void createShadowHandles(Element handle) {
	appendShadowHandles(handle, true, true, true, true);
}

protected static void createNarrowShadowHandles(Element handle) {
	String[] handles = new String[] {
			"shadow-narrow-left-top",
			"shadow-narrow-right-top",
			"shadow-narrow-center-top",
			"shadow-narrow-left-middle",
			"shadow-narrow-right-middle",
			"shadow-narrow-center-middle",
			"shadow-narrow-left-bottom",
			"shadow-narrow-right-bottom",
			"shadow-narrow-center-bottom"
	};
	for (int i = 0; i < handles.length; i++) {
		createCSSDiv(handle, handles[i]);
	}
	if (OS.isChrome10) {
		handle.style.opacity = "1";
	}
	if (OS.isIE) {
		handle.style.filter = "";
	}
}

protected void createHandle() {
	/*
	super.createHandle ();
	if (parent != null || ((style & SWT.TOOL) != 0)) {
		setParent ();
		setSystemMenu ();
	}
	*/
	
	if ((style & SWT.APPLICATION_MODAL) != 0
			|| (style & SWT.PRIMARY_MODAL) != 0) {
		display.timerExec(10, new Runnable() {
			public void run() {
				addModalLayer();
			}
		});
	}
	handle = document.createElement("DIV");
	handle.className = "shell-default shell-trim";
	handle.style.lineHeight = "16px"; // or "1", reset CSS
	handle.style.visibility = "hidden";
	
	//nextWindowLocation();
	
	if (window.defaultWindowWidth == null) {
		window.defaultWindowWidth = "768";
	}
	if (window.defaultWindowHeight == null) {
		window.defaultWindowHeight = "558";
	}
	width = Integer.parseInt(window.defaultWindowWidth);
	height = Integer.parseInt(window.defaultWindowHeight);

	this.width = 768;
	this.height = 558;
//	if ((style & SWT.NO_TRIM) == 0 & (style & SWT.RESIZE) != 0) {
//		handle.className += " shell-trim";
//	}
	getMonitor().handle.appendChild(handle);
	if ((style & SWT.NO_TRIM) == 0 && (style & SWT.RESIZE) != 0) {
		createResizeHandles(handle);
	}
	boolean supportShadow = false;
	/**
	 * @j2sNative
	 * supportShadow = window["swt.disable.shadow"] != true;
	 */ {}
	if (supportShadow) {
		createShadowHandles(handle);
	}
	if ((style & SWT.NO_TRIM) == 0
			&& (style & (SWT.TITLE | SWT.MIN | SWT.MAX | SWT.CLOSE)) != 0) {
		setSystemMenu();
	}
	String contentCSS = "shell-content";
	if ((style & SWT.TOOL) != 0) {
		contentCSS += " shell-tool";
	}
	contentHandle = createCSSDiv(handle, contentCSS);
	if (DragAndDrop.class != null) {
		dnd = new DragAndDrop();
		shellFrameDND = new ShellFrameDND() {
			protected int deltaWidth = 0;
			protected int deltaHeight = 0;
			public boolean isDraggable(HTMLEventWrapper e) {
				if (super.isDraggable(e) && !getMaximized()) {
					String cssName = e.target.className;
					if (cssName.indexOf("shell-title-text") != -1
							&& oldBounds != null) {
						return false;
					}
					return true;
				} else {
					return false;
				}
			}
			public boolean initFrameBounds(int x, int y, int width, int height) {
				Rectangle bs = getBounds();
				this.deltaWidth = this.sourceWidth - bs.width;
				this.deltaHeight = this.sourceHeight - bs.height;
				return true;
			}
			public boolean updateShellBounds(int x, int y, int w, int h) {
				boolean moved = (x != left || y != top);
				w -= deltaWidth;
				h -= deltaHeight;
				boolean resized = (w != width || h != height);
				setBounds(x, y, w, h);
				if (moved) {
					sendEvent(SWT.Move);
				}
				if (resized) {
					sendEvent(SWT.Resize);
				}
				bringToTop();
				return true;
			}
		};
		dnd.addDragListener(shellFrameDND);
		dnd.bind(handle);
	}
//	Clazz.addEvent(contentHandle, "click", new RunnableCompatibility(){
//		public void run(){
//			OS.SetFocus(contentHandle); //contentHandle.focus();
//		}
//	});
	hContentKeyDown = new RunnableCompatibility() {
		public void run() {
			HTMLEvent e = (HTMLEvent) getEvent();
			if(defaultButton == null){
				return;
			}
			if(e.keyCode == 13){
				if (!defaultButton.isEnabled()) {
					toReturn(true);
					return ;
				}
				
				if ((defaultButton.style & (SWT.CHECK | SWT.TOGGLE)) != 0) {
					
					if ((defaultButton.style & SWT.CHECK) != 0) {
						if (e.srcElement != defaultButton.btnHandle  && e.target != defaultButton.btnHandle) {
							defaultButton.setSelection (!defaultButton.getSelection ());
						}
					} else {
						defaultButton.setSelection (!defaultButton.getSelection ());
					}
				} else {
					if ((defaultButton.style & SWT.RADIO) != 0) {
						if ((defaultButton.parent.getStyle () & SWT.NO_RADIO_GROUP) != 0) {
							defaultButton.setSelection (!defaultButton.getSelection ());
						} else {
							defaultButton.selectRadio ();
						}
					}
				}
				defaultButton.postEvent (SWT.Selection);
				toReturn(true);
			}
		}
	}; 
	Clazz.addEvent(contentHandle, "keydown", hContentKeyDown);
}

void nextWindowLocation(int wHint, int hHint) {
	/*
	 * if the user has set the bounds of the shell we should not override it!
	 */
	if(locationSet) {
		return;
	}
	
	int delta = OS.getStringPlainHeight("A") + 4 + 6 + 1;
	if (window.defaultWindowLeft == null) {
		window.defaultWindowLeft = "160";
	} else {
		int num = Integer.parseInt("" + window.defaultWindowLeft);
		num += delta;
		if (num + wHint > getMonitor().clientWidth) {
			num = delta;
		}
		window.defaultWindowLeft = "" + num;
	}
	if (window.defaultWindowTop == null) {
		window.defaultWindowTop = "48";
	} else {
		int num = Integer.parseInt("" + window.defaultWindowTop);
		num += delta;
		if (num + hHint > getMonitor().clientHeight) {
			num = delta;
		}
		window.defaultWindowTop = "" + num;
	}
	left = Integer.parseInt(window.defaultWindowLeft);
	top = Integer.parseInt(window.defaultWindowTop);
	left += OS.getFixedBodyOffsetLeft ();
	top += OS.getFixedBodyOffsetTop ();
}

void addModalLayer() {
	modalHandle = document.createElement ("DIV");
	modalHandle.className = "shell-modal-block";
	modalHandle.style.zIndex = handle.style.zIndex - 1;
	getMonitor().handle.insertBefore(modalHandle, handle);
}

/**
 * @j2sNative
 * ClazzLoader.loadClass ("org.eclipse.swt.widgets.HTMLSource", (function (o) { return function () {
 * new $wt.widgets.HTMLSource ().exportSource (o, a);
 * }; }) (this));
 * @j2sNativeSrc
 * ClazzLoader.loadClass ("org.eclipse.swt.widgets.HTMLSource", (function (o) { return function () {
 * new $wt.widgets.HTMLSource ().exportSource (o, onlyContent);
 * }; }) (this));
 */
void exportHTMLSource(boolean onlyContent) {
}

/**
 * @j2sNative
 * ClazzLoader.loadClass ("org.eclipse.swt.widgets.About", (function (o) { return function () {
 * 	$wt.widgets.About.openAbout (o);
 * }; }) (this));
 * @j2sNativeSrc
 * ClazzLoader.loadClass ("org.eclipse.swt.widgets.About", (function (o) { return function () {
 * 	$wt.widgets.About.openAbout (o);
 * }; }) (this));
 */
void openAboutJava2Script() {
}

protected void createWidget () {
	super.createWidget ();
//	swFlags = OS.IsWinCE ? OS.SW_SHOWMAXIMIZED : OS.SW_SHOWNOACTIVATE;
//	hAccel = -1;
}

void destroyAccelerators () {
//	if (hAccel != 0 && hAccel != -1) OS.DestroyAcceleratorTable (hAccel);
//	hAccel = -1;
}

public void dispose () {
	if (isDisposed()) return;
	if (!isValidThread ()) error (SWT.ERROR_THREAD_INVALID_ACCESS);
	if (!(this instanceof Shell)) {
		setVisible (false);
		if (!traverseDecorations (false)) {
			Shell shell = getShell ();
			shell.setFocus ();
		}
	}
	
	if (shellFrameDND != null) {
		shellFrameDND.dispose();
		shellFrameDND = null;
	}
	
	if ((this.style & SWT.TOOL) == 0)
	/**
	 * Return to default title
	 * @j2sNative
	 * if (window["document.title"] != null) {
	 * 	document.title = window["document.title"];
	 * }
	 */ {}
	if ((this.getStyle() & SWT.TOOL) == 0 && display.taskBar != null) {
		display.taskBar.removeShellItem ((Shell) this);
	}
	super.dispose ();
}

Menu findMenu (Element hMenu) {
	if (menus == null) return null;
	for (int i=0; i<menus.length; i++) {
		Menu menu = menus [i];
		if (menu != null && hMenu == menu.handle) return menu;
	}
	return null;
}

void fixDecorations (Decorations newDecorations, Control control, Menu [] menus) {
	if (this == newDecorations) return;
	if (control == savedFocus) savedFocus = null;
	if (control == defaultButton) defaultButton = null;
	if (control == saveDefault) saveDefault = null;
	if (menus == null) return;
	Menu menu = control.menu;
	if (menu != null) {
		int index = 0;
		while (index <menus.length) {
			if (menus [index] == menu) {
				control.setMenu (null);
				return;
			}
			index++;
		}
		menu.fixMenus (newDecorations);
		destroyAccelerators ();
		newDecorations.destroyAccelerators ();
	}
}

public Rectangle getBounds () {
	checkWidget ();
	/*
	if (!OS.IsWinCE) {
		if (OS.IsIconic (handle)) {
			WINDOWPLACEMENT lpwndpl = new WINDOWPLACEMENT ();
			lpwndpl.length = WINDOWPLACEMENT.sizeof;
			OS.GetWindowPlacement (handle, lpwndpl);
			int width = lpwndpl.right - lpwndpl.left;
			int height = lpwndpl.bottom - lpwndpl.top;
			return new Rectangle (lpwndpl.left, lpwndpl.top, width, height);
		}
	}
	*/
	return super.getBounds ();
}

private boolean minable() {
	return (style & SWT.MIN) != 0 
			&& ((style & SWT.BORDER) == 0 || (style & SWT.RESIZE) != 0);
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Composite#getBorderWidth()
 */
public int getBorderWidth() {
	return (style & SWT.NO_TRIM) != 0 ? 1 : 0;
}
public Rectangle getClientArea () {
	checkWidget ();
	/*
	/* 
	* Note: The CommandBar is part of the client area,
	* not the trim.  Applications don't expect this so
	* subtract the height of the CommandBar.
	*-/
	if (OS.IsHPC) {
		Rectangle rect = super.getClientArea ();
		if (menuBar != null) {
			int hwndCB = menuBar.hwndCB;
			int height = OS.CommandBar_Height (hwndCB);
			rect.y += height;
			rect.height -= height;
		}
		return rect;
	}
	if (!OS.IsWinCE) {
		if (OS.IsIconic (handle)) {
			WINDOWPLACEMENT lpwndpl = new WINDOWPLACEMENT ();
			lpwndpl.length = WINDOWPLACEMENT.sizeof;
			OS.GetWindowPlacement (handle, lpwndpl);
			int width = lpwndpl.right - lpwndpl.left;
			int height = lpwndpl.bottom - lpwndpl.top;
			/*
			* Feature in Windows.  For some reason WM_NCCALCSIZE does
			* not compute the client area when the window is minimized.
			* The fix is to compute it using AdjustWindowRectEx() and
			* GetSystemMetrics().
			* 
			* NOTE: This code fails to compute the correct client area
			* for a minimized window where the menu bar would wrap were
			* the window restored.  There is no fix for this problem at
			* this time.
			*-/
			if (horizontalBar != null) width -= OS.GetSystemMetrics (OS.SM_CYHSCROLL);
			if (verticalBar != null) height -= OS.GetSystemMetrics (OS.SM_CXVSCROLL);
			RECT rect = new RECT ();
			int bits1 = OS.GetWindowLong (handle, OS.GWL_STYLE);
			int bits2 = OS.GetWindowLong (handle, OS.GWL_EXSTYLE);
			boolean hasMenu = OS.IsWinCE ? false : OS.GetMenu (handle) != 0;
			OS.AdjustWindowRectEx (rect, bits1, hasMenu, bits2);
			width = Math.max (0, width - (rect.right - rect.left));
			height = Math.max (0, height - (rect.bottom - rect.top));
			return new Rectangle (0, 0, width, height);
		}
	}
	*/
	//return super.getClientArea ();
	//return new Rectangle(0, 0, OS.getContainerWidth(handle), OS.getContainerHeight(handle));
	int w = width;
	int h = height;
	if ((style & (SWT.TITLE | SWT.CLOSE | SWT.MIN | SWT.MAX)) != 0) {
		//h -= 20;
		h -= Math.max(OS.getContainerHeight(titleBar), 19) + 2;
		w -= 8;
		//h -= 8;
		h -= 5;
		if ((style & SWT.BORDER) != 0) {
			w -= 4;
			h -= 4;
		}
		if (OS.existedCSSClass(handle, "shell-menu-bar")) {
			//h -= 21;
			h -= 1 + OS.getContainerHeight(shellMenuBar);
		}
	} else if ((style & SWT.TOOL) != 0){
		h -= 2;
		w -= 2;
	} else {
		h -= 6;
		w -= 6;
	}
	return new Rectangle(0, 0, w, h);
}

/**
 * Returns the receiver's default button if one had
 * previously been set, otherwise returns null.
 *
 * @return the default button or null
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @see #setDefaultButton
 */
public Button getDefaultButton () {
	checkWidget ();
	return defaultButton;
}

/**
 * Returns the receiver's image if it had previously been 
 * set using <code>setImage()</code>. The image is typically
 * displayed by the window manager when the instance is
 * marked as iconified, and may also be displayed somewhere
 * in the trim when the instance is in normal or maximized
 * states.
 * <p>
 * Note: This method will return null if called before
 * <code>setImage()</code> is called. It does not provide
 * access to a window manager provided, "default" image
 * even if one exists.
 * </p>
 * 
 * @return the image
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Image getImage () {
	checkWidget ();
	return image;
}

/**
 * Returns the receiver's images if they had previously been 
 * set using <code>setImages()</code>. Images are typically
 * displayed by the window manager when the instance is
 * marked as iconified, and may also be displayed somewhere
 * in the trim when the instance is in normal or maximized
 * states. Depending where the icon is displayed, the platform
 * chooses the icon with the "best" attributes.  It is expected
 * that the array will contain the same icon rendered at different
 * sizes, with different depth and transparency attributes.
 * 
 * <p>
 * Note: This method will return an empty array if called before
 * <code>setImages()</code> is called. It does not provide
 * access to a window manager provided, "default" image
 * even if one exists.
 * </p>
 * 
 * @return the images
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public Image [] getImages () {
	checkWidget ();
	if (images == null) return new Image [0];
	Image [] result = new Image [images.length];
	System.arraycopy (images, 0, result, 0, images.length);
	return result;
}

public Point getLocation () {
	checkWidget ();
	/*
	if (!OS.IsWinCE) {
		if (OS.IsIconic (handle)) {
			WINDOWPLACEMENT lpwndpl = new WINDOWPLACEMENT ();
			lpwndpl.length = WINDOWPLACEMENT.sizeof;
			OS.GetWindowPlacement (handle, lpwndpl);
			return new Point (lpwndpl.left, lpwndpl.top);
		}
	}
	return super.getLocation ();
	*/
/*	
	int x = 0;//64;
	int y = 0;//64;
	String left = handle.style.left;
	if (left != null && left.length() != 0) {
		x = Integer.parseInt(left);
	}
	String top = handle.style.top;
	if (top != null && top.length() != 0) {
		y = Integer.parseInt(top);
	}
	return new Point (x, y);
*/
	return new Point (left, top);
}

/**
 * Returns <code>true</code> if the receiver is currently
 * maximized, and false otherwise. 
 * <p>
 *
 * @return the maximized state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @see #setMaximized
 */
public boolean getMaximized () {
	checkWidget ();
	/*
	if (OS.IsWinCE) return swFlags == OS.SW_SHOWMAXIMIZED;
	if (OS.IsWindowVisible (handle)) return OS.IsZoomed (handle);
	return swFlags == OS.SW_SHOWMAXIMIZED;
	*/
	//return OS.existedCSSClass(titleBar, "shell-maximized");
	return oldBounds != null;
}

/**
 * Returns the receiver's menu bar if one had previously
 * been set, otherwise returns null.
 *
 * @return the menu bar or null
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Menu getMenuBar () {
	checkWidget ();
	return menuBar;
}

/**
 * Returns <code>true</code> if the receiver is currently
 * minimized, and false otherwise. 
 * <p>
 *
 * @return the minimized state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @see #setMinimized
 */
public boolean getMinimized () {
	checkWidget ();
	/*
	if (OS.IsWinCE) return false;
	if (OS.IsWindowVisible (handle)) return OS.IsIconic (handle);
	return swFlags == OS.SW_SHOWMINNOACTIVE;
	*/
	if (this.parent == null) {
		return this.handle.style.display == "none";
	}
	return this.minimized; // TODO
}

String getNameText () {
	return getText ();
}

public Point getSize () {
	checkWidget ();
	/*
	if (!OS.IsWinCE) {
		if (OS.IsIconic (handle)) {
			WINDOWPLACEMENT lpwndpl = new WINDOWPLACEMENT ();
			lpwndpl.length = WINDOWPLACEMENT.sizeof;
			OS.GetWindowPlacement (handle, lpwndpl);
			int width = lpwndpl.right - lpwndpl.left;
			int height = lpwndpl.bottom - lpwndpl.top;
			return new Point (width, height);
		}
	}
	*/
	return super.getSize ();
//	Point size = super.getSize();
//	//size.y += 26;
//	size.y += 6;
//	if (titleBar != null) {
//		size.y += OS.getContainerHeight(titleBar);
//	}
//	return size;
}

/**
 * Returns the receiver's text, which is the string that the
 * window manager will typically display as the receiver's
 * <em>title</em>. If the text has not previously been set, 
 * returns an empty string.
 *
 * @return the text
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public String getText () {
	checkWidget ();
	/*
	int length = OS.GetWindowTextLength (handle);
	if (length == 0) return "";
	/* Use the character encoding for the default locale *-/
	TCHAR buffer = new TCHAR (0, length + 1);
	OS.GetWindowText (handle, buffer, length + 1);
	return buffer.toString (0, length);
	*/
	if (this.shellTitle == null) {
		return "";
	}
	Element[] children = this.shellTitle.childNodes;
	if (children.length <= 0) {
		return "";
	}
	String text = children[0].nodeValue;
	return text == null ? "" : text;
}

public boolean isReparentable () {
	checkWidget ();
	/*
	* Feature in Windows.  Calling SetParent() for a shell causes
	* a kind of fake MDI to happen.  It doesn't work well on Windows
	* and is not supported on the other platforms.  The fix is to
	* disallow the SetParent().
	*/
	return false;
}

boolean isTabGroup () {
	/*
	* Can't test WS_TAB bits because they are the same as WS_MAXIMIZEBOX.
	*/
	return true;
}

boolean isTabItem () {
	/*
	* Can't test WS_TAB bits because they are the same as WS_MAXIMIZEBOX.
	*/
	return false;
}

Decorations menuShell () {
	return this;
}

protected void releaseHandle() {
	if (dnd != null) {
		dnd.unbind();
		dnd = null;
	}
	if (shellMin != null) {
		if (hMinClick != null) {
			Clazz.removeEvent(shellMin, "click", hMinClick);
			hMinClick = null;
		}
		OS.destroyHandle(shellMin);
		shellMin = null;
	}
	if (shellMax != null) {
		if (hMaxClick != null) {
			Clazz.removeEvent(shellMax, "click", hMaxClick);
		}
		OS.destroyHandle(shellMax);
		shellMax = null;
	}
	if (shellClose != null) {
		if (hCloseClick != null) {
			Clazz.removeEvent(shellClose, "click", hCloseClick);
			hCloseClick = null;
		}
		OS.destroyHandle(shellClose);
		shellClose = null;
	}
	if (shellIcon != null) {
		if (hIconClick != null) {
			Clazz.removeEvent(shellIcon, "click", hIconClick);
			hIconClick = null;
		}
		OS.destroyHandle(shellIcon);
		shellIcon = null;
	}
	if (shellTitle != null) {
		OS.destroyHandle(shellTitle);
		shellTitle = null;
	}
	if (titleBar != null) {
		if ((style & SWT.MAX) != 0 && hMaxClick != null) {
			Clazz.removeEvent(titleBar, "click", hMaxClick);
		}
		if (hTitleBarClick != null) {
			Clazz.removeEvent(titleBar, "click", hTitleBarClick);
			hTitleBarClick = null;
		}
		if (hNoTextSelection != null) {
			Clazz.removeEvent(titleBar, "selectstart", hNoTextSelection);
			hNoTextSelection = null;
		}
		OS.destroyHandle(titleBar);
		titleBar = null;
	}
	if (shellMenuBar != null) {
		OS.destroyHandle(shellMenuBar);
		shellMenuBar = null;
	}
	if (shellToolBar != null) {
		OS.destroyHandle(shellToolBar);
		shellToolBar = null;
	}
	if (contentHandle != null) {
		if (hContentKeyDown != null) {
			Clazz.removeEvent(contentHandle, "keydown", hContentKeyDown);
			hContentKeyDown = null;
		}
		OS.destroyHandle(contentHandle);
		contentHandle = null;
	}
	if (modalHandle != null) {
		OS.destroyHandle(modalHandle);
		modalHandle = null;
	}
	hMaxClick = null;
	super.releaseHandle();
}
protected void releaseWidget () {
	if (menuBar != null) menuBar.releaseResources ();
	menuBar = null;
	if (menus != null) {
		do {
			int index = 0;
			while (index < menus.length) {
				Menu menu = menus [index];
				if (menu != null && !menu.isDisposed ()) {
					while (menu.getParentMenu () != null) {
						menu = menu.getParentMenu ();
					}
					menu.dispose ();
					break;
				}
				index++;
			}
			if (index == menus.length) break;
		} while (true);
	}
	menus = null;
	
	super.releaseWidget ();
	if (smallImage != null) smallImage.dispose ();
	if (largeImage != null) largeImage.dispose ();
	smallImage = largeImage = image = null;
	images = null;
	savedFocus = null;
	defaultButton = saveDefault = null;
//	if (hAccel != 0 && hAccel != -1) OS.DestroyAcceleratorTable (hAccel);
//	hAccel = -1;
}

void removeMenu (Menu menu) {
	if (menus == null) return;
	for (int i=0; i<menus.length; i++) {
		if (menus [i] == menu) {
			menus [i] = null;
			return;
		}
	}
}

boolean restoreFocus () {
	if (display.ignoreRestoreFocus) return true;
	if (savedFocus != null && savedFocus.isDisposed ()) savedFocus = null;
	if (savedFocus != null && savedFocus.setSavedFocus ()) return true;
	/*
	* This code is intentionally commented.  When no widget
	* has been given focus, some platforms give focus to the
	* default button.  Windows doesn't do this.
	*/
//	if (defaultButton != null && !defaultButton.isDisposed ()) {
//		if (defaultButton.setFocus ()) return true;
//	}
	return false;
}

void saveFocus () {
	/*
	Control control = display._getFocusControl ();
	if (control != null && control != this && this == control.menuShell ()) {
		setSavedFocus (control);
	}
	*/
}
/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#setBackground(org.eclipse.swt.graphics.Color)
 */
public void setBackground(Color color) {
	checkWidget ();
	if (color != null)
	contentHandle.style.backgroundColor = color.getCSSHandle();
}
void setBounds (int x, int y, int width, int height, int flags, boolean defer) {
	/*
	if (OS.IsWinCE) {
		swFlags = OS.SW_RESTORE;
	} else {
		if (OS.IsIconic (handle)) {
			setPlacement (x, y, width, height, flags);
			return;
		}
	}
	forceResize ();
	RECT rect = new RECT ();
	OS.GetWindowRect (handle, rect);
	boolean sameOrigin = true;
	if ((OS.SWP_NOMOVE & flags) == 0) {
		sameOrigin = rect.left == x && rect.top == y;
		if (!sameOrigin) moved = true;
	}
	boolean sameExtent = true;
	if ((OS.SWP_NOSIZE & flags) == 0) {
		sameExtent = rect.right - rect.left == width && rect.bottom - rect.top == height;
		if (!sameExtent) resized = true;
	}
	if (!OS.IsWinCE) {
		if (OS.IsZoomed (handle)) {
			if (sameOrigin && sameExtent) return;
			setPlacement (x, y, width, height, flags);
			setMaximized (false);
			return;
		}
	}
	*/
	super.setBounds (x, y, width, height, flags, defer);
}

/**
 * If the argument is not null, sets the receiver's default
 * button to the argument, and if the argument is null, sets
 * the receiver's default button to the first button which
 * was set as the receiver's default button (called the 
 * <em>saved default button</em>). If no default button had
 * previously been set, or the saved default button was
 * disposed, the receiver's default button will be set to
 * null.
 * <p>
 * The default button is the button that is selected when
 * the receiver is active and the user presses ENTER.
 * </p>
 *
 * @param button the new default button
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the button has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setDefaultButton (Button button) {
	checkWidget ();
	setDefaultButton (button, true);
}

void setDefaultButton (Button button, boolean save) {
	if (button == null) {
		if (defaultButton == saveDefault) {
			if (save) saveDefault = null;
			return;
		}
	} else {
		if (button.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
		if ((button.style & SWT.PUSH) == 0) return;
		if (button == defaultButton) return;
	}
	if (defaultButton != null) {
		if (!defaultButton.isDisposed ()) defaultButton.setDefault (false);
	}
	if ((defaultButton = button) == null) defaultButton = saveDefault;
	if (defaultButton != null) {
		if (!defaultButton.isDisposed ()) defaultButton.setDefault (true);
	}
	if (save) saveDefault = defaultButton;
	if (saveDefault != null && saveDefault.isDisposed ()) saveDefault = null;
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#setForeground(org.eclipse.swt.graphics.Color)
 */
public void setForeground(Color color) {
	checkWidget ();
	if (color != null)
	contentHandle.style.color = color.getCSSHandle();
}
/**
 * Sets the receiver's image to the argument, which may
 * be null. The image is typically displayed by the window
 * manager when the instance is marked as iconified, and
 * may also be displayed somewhere in the trim when the
 * instance is in normal or maximized states.
 * 
 * @param image the new image (or null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the image has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setImage (Image image) {
	checkWidget ();
	if (image != null && image.isDisposed ()) error (SWT.ERROR_INVALID_ARGUMENT);
	this.image = image;
	setImages (image, null);
	if (image != null && image.isDisposed ()) error (SWT.ERROR_INVALID_ARGUMENT);
	this.image = image;
	//setImages (image, null);
//		if (image != null) {
//			shellIcon.style.backgroundImage = "url('" + image.url + "')";
//		}
	if (image == null) {
		shellIcon.style.backgroundImage = "";
		shellIcon.style.backgroundPosition = "";
//		if (OS.isIE50 || OS.isIE55 || OS.isIE60 || OS.isIE70) {
//			shellIcon.style.backgroundPosition = "50% 53%";
//		}
		if (OS.isIENeedPNGFix && shellIcon.style.filter != null) {
			shellIcon.style.filter = "";
		}
		return;
	}

	if (shellIcon != null && this.image.handle == null && this.image.url != null && this.image.url.length() != 0) {
		CSSStyle iconStyle = shellIcon.style;
//		if (OS.isIE50 || OS.isIE55 || OS.isIE60 || OS.isIE70) {
//			shellIcon.style.backgroundPosition = "center center";
//		}
		if (OS.isIENeedPNGFix && image.url.toLowerCase().endsWith(".png") && contentHandle.style.filter != null) {
//				Element imgBackground = document.createElement("DIV");
//				imgBackground.style.position = "absolute";
//				imgBackground.style.width = "100%";
//				imgBackground.style.height = "100%";
//				imgBackground.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
//				handle.appendChild(imgBackground);
			iconStyle.backgroundImage = "url(\"about:blank\")";
			iconStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
		} else {
			if (OS.isIENeedPNGFix && iconStyle.filter != null) iconStyle.filter = ""; 
			iconStyle.backgroundRepeat = "no-repeat";
			if (this.image.packedURL != null) {
				iconStyle.backgroundImage = "url(\"" + this.image.packedURL + "\")";
				int y = this.image.packedOffsetY;
				if (this.image.packedItemHeight <= 20) {
					y -= (20 - this.image.packedItemHeight) / 2;
				}
				iconStyle.backgroundPosition = "-" + this.image.packedOffsetX + "px -" + y + "px";
			} else {
				iconStyle.backgroundPosition = "center center";
				iconStyle.backgroundImage = "url(\"" + this.image.url + "\")";
			}
		}
	}
}

void setImages (Image image, Image [] images) {
	/*
	* Feature in WinCE.  WM_SETICON and WM_GETICON set the icon
	* for the window class, not the window instance.  This means
	* that it is possible to set an icon into a window and then
	* later free the icon, thus freeing the icon for every window.
	* The fix is to avoid the API.
	* 
	* On WinCE PPC, icons in windows are not displayed.
	*-/
	if (OS.IsWinCE) return;
	if (smallImage != null) smallImage.dispose ();
	if (largeImage != null) largeImage.dispose ();
	smallImage = largeImage = null;
	int hSmallIcon = 0, hLargeIcon = 0;
	Image smallIcon = null, largeIcon = null;
	if (image != null) {
		smallIcon = largeIcon = image;
	} else {
		if (images != null && images.length > 0) {
			int depth = display.getIconDepth ();
			ImageData [] datas = null;
			if (images.length > 1) {
				Image [] bestImages = new Image [images.length];
				System.arraycopy (images, 0, bestImages, 0, images.length);
				datas = new ImageData [images.length];
				for (int i=0; i<datas.length; i++) {
					datas [i] = images [i].getImageData ();
				}
				images = bestImages;
				sort (images, datas, OS.GetSystemMetrics (OS.SM_CXSMICON), OS.GetSystemMetrics (OS.SM_CYSMICON), depth);
			}
			smallIcon = images [0];
			if (images.length > 1) {
				sort (images, datas, OS.GetSystemMetrics (OS.SM_CXICON), OS.GetSystemMetrics (OS.SM_CYICON), depth);
			}
			largeIcon = images [0];
		}
	}
	if (smallIcon != null) {
		switch (smallIcon.type) {
			case SWT.BITMAP:
				smallImage = createIcon (smallIcon);
				hSmallIcon = smallImage.handle;
				break;
			case SWT.ICON:
				hSmallIcon = smallIcon.handle;
				break;
		}
	}
	OS.SendMessage (handle, OS.WM_SETICON, OS.ICON_SMALL, hSmallIcon);
	if (largeIcon != null) {
		switch (largeIcon.type) {
			case SWT.BITMAP:
				largeImage = createIcon (largeIcon);
				hLargeIcon = largeImage.handle;
				break;
			case SWT.ICON:
				hLargeIcon = largeIcon.handle;
				break;
		}
	}
	OS.SendMessage (handle, OS.WM_SETICON, OS.ICON_BIG, hLargeIcon);
	
	/*
	* Bug in Windows.  When WM_SETICON is used to remove an
	* icon from the window trimmings for a window with the
	* extended style bits WS_EX_DLGMODALFRAME, the window
	* trimmings do not redraw to hide the previous icon.
	* The fix is to force a redraw.
	*-/
	if (!OS.IsWinCE) {
		if (hSmallIcon == 0 && hLargeIcon == 0 && (style & SWT.BORDER) != 0) {
			int flags = OS.RDW_FRAME | OS.RDW_INVALIDATE;
			OS.RedrawWindow (handle, null, 0, flags);
		}
	}
	*/
}

/**
 * Sets the receiver's images to the argument, which may
 * be an empty array. Images are typically displayed by the
 * window manager when the instance is marked as iconified,
 * and may also be displayed somewhere in the trim when the
 * instance is in normal or maximized states. Depending where
 * the icon is displayed, the platform chooses the icon with
 * the "best" attributes. It is expected that the array will
 * contain the same icon rendered at different sizes, with
 * different depth and transparency attributes.
 * 
 * @param images the new image array
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the array of images is null</li>
 *    <li>ERROR_INVALID_ARGUMENT - if one of the images is null or has been disposed</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public void setImages (Image [] images) {
	checkWidget ();
	if (images == null) error (SWT.ERROR_INVALID_ARGUMENT);
	for (int i = 0; i < images.length; i++) {
		if (images [i] == null || images [i].isDisposed ()) error (SWT.ERROR_INVALID_ARGUMENT);
	}
	this.images = images;
	//setImages (null, images);
	setImage(images[0]);
}

/**
 * Sets the maximized state of the receiver.
 * If the argument is <code>true</code> causes the receiver
 * to switch to the maximized state, and if the argument is
 * <code>false</code> and the receiver was previously maximized,
 * causes the receiver to switch back to either the minimized
 * or normal states.
 * <p>
 * Note: The result of intermixing calls to <code>setMaximized(true)</code>
 * and <code>setMinimized(true)</code> will vary by platform. Typically,
 * the behavior will match the platform user's expectations, but not
 * always. This should be avoided if possible.
 * </p>
 *
 * @param maximized the new maximized state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @see #setMinimized
 */
public void setMaximized (boolean maximized) {
	checkWidget ();
	/*
	swFlags = maximized ? OS.SW_SHOWMAXIMIZED : OS.SW_RESTORE;
	if (OS.IsWinCE) {
		/*
		* Note: WinCE does not support SW_SHOWMAXIMIZED and SW_RESTORE. The
		* workaround is to resize the window to fit the parent client area.
		*-/
		if (maximized) {
			RECT rect = new RECT ();
			OS.SystemParametersInfo (OS.SPI_GETWORKAREA, 0, rect, 0);
			int width = rect.right - rect.left, height = rect.bottom - rect.top;
			if (OS.IsPPC) {
				/* Leave space for the menu bar *-/
				if (menuBar != null) {
					int hwndCB = menuBar.hwndCB;
					RECT rectCB = new RECT ();
					OS.GetWindowRect (hwndCB, rectCB);
					height -= rectCB.bottom - rectCB.top;
				}
			}
			int flags = OS.SWP_NOZORDER | OS.SWP_DRAWFRAME | OS.SWP_NOACTIVATE;
			SetWindowPos (handle, 0, rect.left, rect.top, width, height, flags);	
		}
	} else {
		if (!OS.IsWindowVisible (handle)) return;
		if (maximized == OS.IsZoomed (handle)) return;
		OS.ShowWindow (handle, swFlags);
		OS.UpdateWindow (handle);
	}
	*/
	Display.topMaxShell = null;
	Display.topMaxShellNeedUpdated = true;
	this.maximized = maximized;
	String key = "shell-maximized";
	Element b = document.body;
	boolean isStrictMode = b.parentNode.clientHeight != 0;
	Element node = b;
	if (((OS.isFirefox && node.scrollLeft == 0 && node.scrollTop == 0)
			|| OS.isIE) && isStrictMode) {
		node = b.parentNode;
	}
	Monitor monitor = getMonitor();
	boolean updateBody = (monitor.handle == document.body); // update with current body client area
	if (maximized) {
		
		if (updateBody) {
			lastBodyScrollLeft = node.scrollLeft;
			lastBodyScrollTop = node.scrollTop;
			
			lastClientAreaCSSText = node.style.cssText;
			lastBodyCSSText = b.style.cssText;
			
			node.style.border = "0 none transparent";
			node.style.overflow = "hidden";
			b.style.margin = "0";
			b.style.padding = "0";
			node.scrollLeft = 0;
			node.scrollTop = 0;
		}
//		boolean toUpdateMax = false;
		if (contentHandle != null) {
			if (oldBounds == null) {
				oldBounds = getBounds();
				//oldBounds.width -= 4; // FIXME
			}
			//Monitor monitor = getMonitor();
			int height = monitor.clientHeight;
			int width = monitor.clientWidth;
			if (monitor.handle == document.body) { // update with current body client area
				width = document.body.parentNode.clientWidth;
				height = OS.getFixedBodyClientHeight();
			}
			//int titleHeight = ((style & SWT.TITLE) != 0) ? 20 : 0;
			int titleHeight = ((style & SWT.TITLE) != 0) ? OS.getContainerHeight(titleBar) : 0;
//			boolean isOptMaximized = false;
//			/**
//			 * @j2sNative
//			 * isOptMaximized = window["ShellManager"] != null; 
//			 */ {}
//			 
//			
//			if (!isOptMaximized) {
//				setBounds(computeTrim(0, 0, width, height - titleHeight));
//			} else {
				Rectangle trim = computeTrim(0, -titleHeight, width, height);
				setBounds(trim.x, trim.y, trim.width, trim.height);
//				toUpdateMax = true;
//			}
		}
		ResizeSystem.register(this, SWT.MAX);
		if (titleBar != null) {
			OS.addCSSClass(titleBar, key);
			if (shellMax != null) {
				shellMax.title = "Restore";
			}
		}
		window.currentTopZIndex++;
		handle.style.zIndex = window.currentTopZIndex;
		if (contentHandle != null) {
			window.setTimeout(Clazz.makeFunction(new Runnable() {
			
				public void run() {
					Shell lastShell = Display.getTopMaximizedShell();
					if (lastShell == null || lastShell.titleBar == null) return;
					if (display.topBar != null) {
						MaximizedTitle topBar = display.topBar;
						topBar.handleApproaching();
						topBar.updateLayout();
						topBar.updateLastModified();
					}
				}
			
			}), 250);
		}
	} else {
		setBounds(oldBounds);
		if (titleBar != null) {
			OS.removeCSSClass(titleBar, key);
			if (shellMax != null) {
				shellMax.title = "Maximize";
			}
		}
		oldBounds = null;
		ResizeSystem.unregister(this, SWT.MAX);
		if (updateBody) {
			node.style.cssText = lastClientAreaCSSText;
			b.style.cssText = lastBodyCSSText;
			if (OS.isOpera) {
				String ofl = node.style.overflow;
				if (ofl == null || ofl.length() == 0) {
					node.style.overflow = "auto";
				}
				ofl = node.style.overflow;
				if (ofl == null || ofl.length() == 0) {
					b.style.overflow = "auto";
				}
			}
			node.scrollLeft = lastBodyScrollLeft;
			node.scrollTop = lastBodyScrollTop;
		}
	}
}

/**
 * Sets the receiver's menu bar to the argument, which
 * may be null.
 *
 * @param menu the new menu bar
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the menu has been disposed</li> 
 *    <li>ERROR_INVALID_PARENT - if the menu is not in the same widget tree</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setMenuBar (Menu menu) {
	checkWidget ();
	if (menuBar == menu) return;
	if (menu != null) {
		if (menu.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
		if ((menu.style & SWT.BAR) == 0) error (SWT.ERROR_MENU_NOT_BAR);
		if (menu.parent != this) error (SWT.ERROR_INVALID_PARENT);
	}	
	/*
	if (OS.IsWinCE) {
		if (OS.IsHPC) {
			boolean resize = menuBar != menu;
			if (menuBar != null) OS.CommandBar_Show (menuBar.hwndCB, false);
			menuBar = menu;
			if (menuBar != null) OS.CommandBar_Show (menuBar.hwndCB, true);
			if (resize) {
				sendEvent (SWT.Resize);
				if (isDisposed ()) return;
				if (layout != null) {
					markLayout (false, false);
					updateLayout (true, false);
				}
			}
		} else {
			if (OS.IsPPC) {
				/*
				* Note in WinCE PPC.  The menu bar is a separate popup window.
				* If the shell is full screen, resize its window to leave
				* space for the menu bar.
				*-/
				boolean resize = getMaximized () && menuBar != menu;
				if (menuBar != null) OS.ShowWindow (menuBar.hwndCB, OS.SW_HIDE);
				menuBar = menu;
				if (menuBar != null) OS.ShowWindow (menuBar.hwndCB, OS.SW_SHOW);
				if (resize) setMaximized (true);
			}
			if (OS.IsSP) {
				if (menuBar != null) OS.ShowWindow (menuBar.hwndCB, OS.SW_HIDE);
				menuBar = menu;
				if (menuBar != null) OS.ShowWindow (menuBar.hwndCB, OS.SW_SHOW);
			}
		} 
	} else {
		if (menu != null) display.removeBar (menu);
		menuBar = menu;
		int hMenu = menuBar != null ? menuBar.handle: 0;
		OS.SetMenu (handle, hMenu);
	}
	destroyAccelerators ();
	*/
	if (menuBar == menu) return;
	if (menu != null) {
		if (menu.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
		if ((menu.style & SWT.BAR) == 0) error (SWT.ERROR_MENU_NOT_BAR);
		if (menu.parent != this) error (SWT.ERROR_INVALID_PARENT);
	}	
	if (menu != null) display.removeBar (menu);
	menuBar = menu;
//		Object hMenu = menuBar != null ? menuBar.handle: null;
	/*
	 * Set the menu!
	 */
}

/**
 * Sets the minimized stated of the receiver.
 * If the argument is <code>true</code> causes the receiver
 * to switch to the minimized state, and if the argument is
 * <code>false</code> and the receiver was previously minimized,
 * causes the receiver to switch back to either the maximized
 * or normal states.
 * <p>
 * Note: The result of intermixing calls to <code>setMaximized(true)</code>
 * and <code>setMinimized(true)</code> will vary by platform. Typically,
 * the behavior will match the platform user's expectations, but not
 * always. This should be avoided if possible.
 * </p>
 *
 * @param minimized the new maximized state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @see #setMaximized
 */
public void setMinimized (boolean minimized) {
	checkWidget ();
	/*
	if (OS.IsWinCE) return;
	swFlags = minimized ? OS.SW_SHOWMINNOACTIVE : OS.SW_RESTORE;
	if (!OS.IsWindowVisible (handle)) return;
	if (minimized == OS.IsIconic (handle)) return;
	int flags = swFlags;
	if (flags == OS.SW_SHOWMINNOACTIVE && handle == OS.GetActiveWindow ()) {
		flags = OS.SW_MINIMIZE;
	}
	OS.ShowWindow (handle, flags);
	OS.UpdateWindow (handle);
	*/
	Display.topMaxShell = null;
	Display.topMaxShellNeedUpdated = true;
	if (!minimized) {
		if (this.maximized) {
			this.minimized = minimized;
//			this.setMaximized(true);
			if (display.taskBar != null) {
				this.handle.style.display = minimized ? "none" : "";
			}
			return;
		}
	}
	if (display.taskBar != null) {
		this.handle.style.display = minimized ? "none" : "";
		if (this.minimized != minimized) {
			display.taskBar.handleApproaching();
			display.taskBar.setMinimized(false);
			display.taskBar.updateLastModified();
			display.taskBar.updateLayout();
		}
		if (!minimized) {
			bringToTop();
		} else {
			Shell topShell = Display.getTopShell();
			if (topShell != null) {
				topShell.bringToTop();
				topShell.forceFocus();
			} else 
			/**
			 * Return to default title
			 * @j2sNative
			 * if (window["document.title"] != null) {
			 * 	document.title = window["document.title"];
			 * }
			 */ {}
		}
		this.minimized = minimized;
		return;
	}
	this.minimized = minimized;
	if (minimized && contentHandle != null) {
		//handle.style.display = "none";
		if (oldBounds == null) {
			oldBounds = getBounds();
			oldBounds.width -= 2; // FIXME
		}
		int width = oldBounds.width;
		if (width < 200) {
			width = 200;
		}
		//setBounds(-1, getMonitor().clientHeight - 26, 120, 0);
		setBounds(-1, getMonitor().clientHeight - 6 - (titleBar != null ? OS.getContainerHeight(titleBar) : 0), 120, 0);
	} else if (!minimized) {
		bringToTop();
	}
	if (minimized) {
		ResizeSystem.register(this, SWT.MIN);
	} else {
		ResizeSystem.unregister(this, SWT.MIN);
	}
}

void setParent () {
	/*
	* In order for an MDI child window to support
	* a menu bar, setParent () is needed to reset
	* the parent.  Otherwise, the MDI child window
	* will appear as a separate shell.  This is an
	* undocumented and possibly dangerous Windows
	* feature.
	*/
	/*
	int hwndParent = parent.handle;
	display.lockActiveWindow = true;
	OS.SetParent (handle, hwndParent);
	if (!OS.IsWindowVisible (hwndParent)) {
		OS.ShowWindow (handle, OS.SW_SHOWNA);
	}
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	bits &= ~OS.WS_CHILD;
	OS.SetWindowLong (handle, OS.GWL_STYLE, bits | OS.WS_POPUP);
	OS.SetWindowLong (handle, OS.GWL_ID, 0);
	int flags = OS.SWP_NOSIZE | OS.SWP_NOMOVE | OS.SWP_NOACTIVATE; 
	SetWindowPos (handle, OS.HWND_BOTTOM, 0, 0, 0, 0, flags);
	display.lockActiveWindow = false;
	*/
}

/*
void setPlacement (int x, int y, int width, int height, int flags) {
	WINDOWPLACEMENT lpwndpl = new WINDOWPLACEMENT ();
	lpwndpl.length = WINDOWPLACEMENT.sizeof;
	OS.GetWindowPlacement (handle, lpwndpl);
	lpwndpl.showCmd = OS.SW_SHOWNA;
	if (OS.IsIconic (handle)) {
		lpwndpl.showCmd = OS.SW_SHOWMINNOACTIVE;
	} else {
		if (OS.IsZoomed (handle)) {
			lpwndpl.showCmd = OS.SW_SHOWMAXIMIZED;
		}
	}
	boolean sameOrigin = true;
	if ((flags & OS.SWP_NOMOVE) == 0) {
		sameOrigin = lpwndpl.left != x || lpwndpl.top != y;
		lpwndpl.right = x + (lpwndpl.right - lpwndpl.left);
		lpwndpl.bottom = y + (lpwndpl.bottom - lpwndpl.top);
		lpwndpl.left = x;
		lpwndpl.top = y;
	}
	boolean sameExtent = true;
	if ((flags & OS.SWP_NOSIZE) == 0) {
		sameExtent = lpwndpl.right - lpwndpl.left != width || lpwndpl.bottom - lpwndpl.top != height;
		lpwndpl.right = lpwndpl.left + width;
		lpwndpl.bottom = lpwndpl.top + height;
	}
	OS.SetWindowPlacement (handle, lpwndpl);
	if (OS.IsIconic (handle)) {
		if (sameOrigin) {
			moved = true;
			Point location = getLocation ();
			oldX = location.x;
			oldY = location.y;
			sendEvent (SWT.Move);
			if (isDisposed ()) return;
		}
		if (sameExtent) {
			resized = true;
			Rectangle rect = getClientArea ();
			oldWidth = rect.width;
			oldHeight = rect.height;
			sendEvent (SWT.Resize);
			if (isDisposed ()) return;
			if (layout != null) {
				markLayout (false, false);
				updateLayout (true, false);
			}
		}
	}
}
*/

void setSavedFocus (Control control) {
	savedFocus = control;
}

void setSystemMenu () {
	/*
	if (OS.IsWinCE) return;
	int hMenu = OS.GetSystemMenu (handle, false);
	if (hMenu == 0) return;
	int oldCount = OS.GetMenuItemCount (hMenu);
	if ((style & SWT.RESIZE) == 0) {
		OS.DeleteMenu (hMenu, OS.SC_SIZE, OS.MF_BYCOMMAND);
	}
	if ((style & SWT.MIN) == 0) {
		OS.DeleteMenu (hMenu, OS.SC_MINIMIZE, OS.MF_BYCOMMAND);
	}
	if ((style & SWT.MAX) == 0) {
		OS.DeleteMenu (hMenu, OS.SC_MAXIMIZE, OS.MF_BYCOMMAND);
	}
	if ((style & (SWT.MIN | SWT.MAX)) == 0) {
		OS.DeleteMenu (hMenu, OS.SC_RESTORE, OS.MF_BYCOMMAND);
	}
	int newCount = OS.GetMenuItemCount (hMenu);
	if ((style & SWT.CLOSE) == 0 || newCount != oldCount) {	
		OS.DeleteMenu (hMenu, OS.SC_TASKLIST, OS.MF_BYCOMMAND);
		MENUITEMINFO info = new MENUITEMINFO ();
		info.cbSize = MENUITEMINFO.sizeof;
		info.fMask = OS.MIIM_ID;
		int index = 0;
		while (index < newCount) {
			if (OS.GetMenuItemInfo (hMenu, index, true, info)) {
				if (info.wID == OS.SC_CLOSE) break;
			}
			index++;
		}
		if (index != newCount) {
			OS.DeleteMenu (hMenu, index - 1, OS.MF_BYPOSITION);
			if ((style & SWT.CLOSE) == 0) {
				OS.DeleteMenu (hMenu, OS.SC_CLOSE, OS.MF_BYCOMMAND);
			}
		}
	}
	*/
	titleBar = document.createElement("DIV");
	titleBar.className = "shell-title-bar";
	hNoTextSelection = OS.setTextSelection(this.titleBar, false);

	if ((style & SWT.TOOL) == 0 && (style & (SWT.CLOSE | SWT.MIN | SWT.MAX)) != 0) {
		shellIcon = document.createElement("DIV");
		shellIcon.className = "shell-title-icon";
//		if (OS.isIE50 || OS.isIE55 || OS.isIE60 || OS.isIE70) {
//			shellIcon.style.backgroundPosition = "50% 53%";
//		}
		titleBar.appendChild(shellIcon);
		hIconClick = new RunnableCompatibility() {
			public void run() {
				HTMLEvent e = (HTMLEvent)getEvent();
				if (e == null || (!e.ctrlKey && !e.altKey && !e.shiftKey)) {
					openAboutJava2Script();
				} else {
					exportHTMLSource(e.shiftKey);
				}
			}
		};
		Clazz.addEvent(shellIcon, "click", hIconClick);
	}

	if (minable()) {
		shellMin = document.createElement("DIV");
		shellMin.className = "shell-title-min";
//		if (OS.isIE50 || OS.isIE55 || OS.isIE60 || OS.isIE70) {
//			shellMin.style.backgroundPosition = "0% 53%";
//		}
		shellMin.title = "Minimze";
		titleBar.appendChild(shellMin);
		hMinClick = new RunnableCompatibility() {
			public void run() {
				Decorations shell = Decorations.this;
				ResizeSystem.unregister(shell, SWT.MIN);
				setMinimized(true);
				if (display.topBar != null) {
					display.topBar.returnTopMaximized((Shell) shell);
				}
				toReturn(false);
				new HTMLEventWrapper(getEvent()).stopPropagation();
			}
		};
		Clazz.addEvent(shellMin, "click", hMinClick);
	}

	if ((style & SWT.MAX) != 0) {
		shellMax = document.createElement("DIV");
		shellMax.className = "shell-title-normal-max";
		shellMax.title = "Maximize";
		titleBar.appendChild(shellMax);
		hMaxClick = new RunnableCompatibility() {
			public void run() {
				boolean cur = !getMaximized();
				setMaximized(cur);
				Decorations shell = Decorations.this;
				if (!cur && display.topBar != null) {
					display.topBar.returnTopMaximized((Shell) shell);
				}
				display.timerExec(25, new Runnable() {
					public void run() {
						layout();
					}
				});
			}
		};
		Clazz.addEvent(shellMax, "click", hMaxClick);
	}

	if ((style & SWT.CLOSE) != 0) {
		shellClose = document.createElement("DIV");
		shellClose.className = "shell-title-close";
		shellClose.title = "Close";
		titleBar.appendChild(shellClose);
		hCloseClick = new RunnableCompatibility() {
			public void run() {
				if (Decorations.this instanceof Shell) {
					Shell shell = (Shell) Decorations.this;
					if (display.topBar != null) {
						display.topBar.returnTopMaximized(shell);
					}
					shell.close();
				}
				toReturn(false);
			}
		};
		Clazz.addEvent(shellClose, "click", hCloseClick);
	}
	shellTitle = document.createElement("DIV");
	shellTitle.className = "shell-title-text";
	
	/**
	 * Ubuntu's Firefox has different active caption background color! 
	 * @j2sNative
	 * if (window["ubuntu.css.colors.fixed"] == null
	 * 		&& navigator.userAgent.indexOf ("Ubuntu") != -1) {
	 * 	this.titleBar.style.backgroundColor = "highlight";
	 * 	this.shellTitle.style.color = "highlighttext";
	 * }
	 */ {}
	 
	titleBar.appendChild(shellTitle);
	if ((style & SWT.MAX) != 0) {
		Clazz.addEvent(titleBar, "dblclick", hMaxClick);
	}

	//shellTitle.appendChild(document.createTextNode("-"));

	handle.appendChild(titleBar);
	hTitleBarClick = new RunnableCompatibility() {
		public void run() {
			if (isVisible()) { // may be invisible after clicking close button
				bringToTop();
				forceFocus();
				/*
				if(contentHandle != null){
					OS.SetFocus(contentHandle); //contentHandle.focus();
				}
				*/
			}
			toReturn(true);
		}
	};
	Clazz.addEvent(titleBar, "click", hTitleBarClick);
	
	window.currentTopZIndex += 2;
	handle.style.zIndex = window.currentTopZIndex;
}

/**
 * Sets the receiver's text, which is the string that the
 * window manager will typically display as the receiver's
 * <em>title</em>, to the argument, which must not be null. 
 *
 * @param string the new text
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the text is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setText (String string) {
	checkWidget ();
	if (string == null) error (SWT.ERROR_NULL_ARGUMENT);
	/* Use the character encoding for the default locale */
//	TCHAR buffer = new TCHAR (0, string, true);
//	OS.SetWindowText (handle, buffer);
	if (shellTitle != null && shellTitle.childNodes != null) {
		OS.clearChildren(shellTitle);
		shellTitle.appendChild(document.createTextNode(string));
		
		if ((this.style & SWT.TOOL) == 0 && Display.getTopShell() == this)
		/**
		 * @j2sNative
		 * var title = this.getText();
		 * if (title != null) {
		 * 	// Record default title
		 * 	if (window["document.title"] == null) {
		 * 		window["document.title"] = document.title;
		 * 	}
		 * 	if (window["document.title.setter"] == null) {
		 * 		document.title = title; // set title directly
		 * 	} else {
		 * 		// document.title.setter may modify title
		 * 		window["document.title.setter"] (title);
		 * 	}
		 * }
		 */ {}

		if (this.parent == null && (this.getStyle() & SWT.TOOL) == 0
				&& display.taskBar != null) {
			display.taskBar.handleApproaching();
		}
		if (display.taskBar != null) {
			window.setTimeout(Clazz.makeFunction(new Runnable() {
			
				public void run() {
					display.taskBar.updateLayout();
					// lastMM
				}
			
			}), 50);
		}
	}
}

public void setVisible (boolean visible) {
	checkWidget ();
	if (drawCount != 0) {
		if (((state & HIDDEN) == 0) == visible) return;
	} else {
		//if (visible == OS.IsWindowVisible (handle)) return;
		if (visible == (handle.style.visibility != "hidden")) return;
	}
	handle.style.visibility = visible ? "" : "hidden";
	handle.style.display = visible ? "" : "none";
	if (visible) {
		/*
		* It is possible (but unlikely), that application
		* code could have disposed the widget in the show
		* event.  If this happens, just return.
		*/
		sendEvent (SWT.Show);
		if (isDisposed ()) return;
		/*
		if (OS.IsHPC) {
			if (menuBar != null) {
				int hwndCB = menuBar.hwndCB;
				OS.CommandBar_DrawMenuBar (hwndCB, 0);
			}
		}
		if (drawCount != 0) {
			state &= ~HIDDEN;
		} else {
			if (OS.IsWinCE) {
				OS.ShowWindow (handle, OS.SW_SHOW);
			} else {
				if (menuBar != null) {
					display.removeBar (menuBar);
					OS.DrawMenuBar (handle);
				}
				OS.ShowWindow (handle, swFlags);
			}
			if (isDisposed ()) return;
			opened = true;
			if (!moved) {
				moved = true;
				Point location = getLocation ();
				oldX = location.x;
				oldY = location.y;
			}
			if (!resized) {
				resized = true;
				Rectangle rect = getClientArea ();
				oldWidth = rect.width;
				oldHeight = rect.height;
			}
			OS.UpdateWindow (handle);
		}
		*/
	} else {
		/*
		if (!OS.IsWinCE) {
			if (OS.IsIconic (handle)) {
				swFlags = OS.SW_SHOWMINNOACTIVE;
			} else {
				if (OS.IsZoomed (handle)) {
					swFlags = OS.SW_SHOWMAXIMIZED;
				} else {
					if (handle == OS.GetActiveWindow ()) {
						swFlags = OS.SW_RESTORE;
					} else {
						swFlags = OS.SW_SHOWNOACTIVATE;
					}
				}
			}
		}
		if (drawCount != 0) {
			state |= HIDDEN;
		} else {
			OS.ShowWindow (handle, OS.SW_HIDE);
		}
		*/
		if (isDisposed ()) return;
		sendEvent (SWT.Hide);
	}
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Composite#SetWindowPos(java.lang.Object, java.lang.Object, int, int, int, int, int)
 */
protected boolean SetWindowPos(Object hWnd, Object hWndInsertAfter, int X, int Y, int cx, int cy, int uFlags) {
	// TODO: comment the following codes. 
	if ((style & SWT.NO_TRIM) == 0) {
		int w = 0;
		int h = 0;
		if ((style & (SWT.TITLE | SWT.CLOSE | SWT.MIN | SWT.MAX)) != 0) {
			w = 113;
			//h = 28;
			h = 8 + OS.getContainerHeight(titleBar);
		}
		if ((style & SWT.BORDER) != 0) {
			w += 2;
			h += 2;
		}
		if (width < w) {
			width = w;
			cx = w;
		}
		if (height < h) {
			height = h;
			cy = h;
		}
	}
	if (titleBar != null) {
		int dw = 8;
		//int dh = 28;
		int tbh = OS.getContainerHeight(titleBar);
		if (tbh == 0 || tbh == 20 || tbh > 30) { // FIXME
			tbh = 22;
		}
		if (OS.isIE && (tbh == 19)) {
			tbh = 21;
		}
		int dh = 5 + tbh + 2;
		int dww = 8; 
		if ((style & SWT.BORDER) != 0) {
			dw += 4;
			dh += 4;
			dww += 4;
		}
		if (OS.existedCSSClass(handle, "shell-menu-bar")) {
			shellMenuBar.style.top = (3 + tbh) + "px";
			int mbh = OS.getContainerHeight(shellMenuBar);
			if (mbh < 20) {
				mbh = tbh - 2;
			}
//			dh += 21;
//			tbh += 21;
			dh += mbh + 1;
			tbh += mbh + 1;
		}
		contentHandle.style.top = (((style & SWT.BORDER) != 0 ? 1 : 1) + tbh + 2) + "px"; 
		contentHandle.style.left = (((style & SWT.BORDER) != 0 ? 1 : 1) + 2) + "px"; 
		contentHandle.style.height = ((height - dh >= 0) ? height - dh : 0) + "px";
		contentHandle.style.width = ((width - dw) > 0 ? width - dw : 0) + "px";
		titleBar.style.width = ((width - dww) > 0 ? width - dww : 0) + "px";
		updateShellTitle(width - dww + 8);
	} else {
		contentHandle.style.top = "0px";
		contentHandle.style.left = "0px";
		int dw = 8;
		int dh = 8;
		if ((style & SWT.NO_TRIM) != 0) {
			dw = 0;
			dh = 0;
		} else if ((style & SWT.TOOL) != 0) {
			dw = 4;
			dh = 2;
			cx -= 2;
			cy -= 2;
		} else {
			dw = 6;
			dh = 4;
			cx -= 4;
			cy -= 4;
		}
//		if ((style & SWT.BORDER) != 0) {
//			dw -= 2;
//			dh -= 2;
//		}
		contentHandle.style.height = ((height - dh >= 0) ? height - dh : 0) + "px";
		contentHandle.style.width = (width - dw > 0 ? width - dw : 0) + "px";
	}
	if ((style & SWT.BORDER) != 0) {
		cx -= 6;
		cy -= 4;
	} else if ((style & SWT.NO_TRIM) == 0) {
		cx -= 2;
	}
	Element el = (Element) hWnd;
	el.style.left = X + "px";
	el.style.top = Y + "px";
	el.style.width = (cx > 0 ? cx : 0) + "px";
	el.style.height = (cy > 0 ? cy : 0) + "px";
	
	return true;
//	return super.SetWindowPos(hWnd, hWndInsertAfter, X, Y, cx, cy, uFlags);
}

protected void updateShellTitle(int width) {
	int ww = 18;
	int w = ww;
	if (shellClose != null) {
		shellClose.style.left = (width - 8 - 2 - w) + "px"; 
		w += ww;
	}
	if (shellMax != null) {
		shellMax.style.left = (width - 8 - 2 - w) + "px"; 
		w += ww;
	}
	if (shellMin != null) {
		shellMin.style.left = (width - 8 - 2 - w) + "px";
		w += ww;
	}
	w -= ww;
	if (shellIcon != null) {
		shellIcon.style.left = 2 + "px"; 
		shellTitle.style.left = (4 + ww) + "px";
		w += ww;
	} else {
		shellTitle.style.left = 4 + "px";
	}
	shellTitle.style.width = (width - 8 - 8 - w) + "px";
}

/*
void sort (Image [] images, ImageData [] datas, int width, int height, int depth) {
	/* Shell Sort from K&R, pg 108 *-/
	int length = images.length;
	if (length <= 1) return;
	for (int gap=length/2; gap>0; gap/=2) {
		for (int i=gap; i<length; i++) {
			for (int j=i-gap; j>=0; j-=gap) {
		   		if (compare (datas [j], datas [j + gap], width, height, depth) >= 0) {
					Image swap = images [j];
					images [j] = images [j + gap];
					images [j + gap] = swap;
					ImageData swapData = datas [j];
					datas [j] = datas [j + gap];
					datas [j + gap] = swapData;
		   		}
	    	}
	    }
	}
}

boolean translateAccelerator (MSG msg) {
	if (!isEnabled () || !isActive ()) return false;
	if (menuBar != null && !menuBar.isEnabled ()) return false;
	if (translateMDIAccelerator (msg) || translateMenuAccelerator (msg)) return true;
	Decorations decorations = parent.menuShell ();
	return decorations.translateAccelerator (msg);
}

boolean translateMenuAccelerator (MSG msg) {
	if (hAccel == -1) createAccelerators ();
	return hAccel != 0 && OS.TranslateAccelerator (handle, hAccel, msg) != 0;
}

boolean translateMDIAccelerator (MSG msg) {
	if (!(this instanceof Shell)) {
		Shell shell = getShell ();
		int hwndMDIClient = shell.hwndMDIClient;
		if (hwndMDIClient != 0 && OS.TranslateMDISysAccel (hwndMDIClient, msg)) {
			return true;
		}
		if (msg.message == OS.WM_KEYDOWN) {
			if (OS.GetKeyState (OS.VK_CONTROL) >= 0) return false;
			switch (msg.wParam) {
				case OS.VK_F4:
					OS.PostMessage (handle, OS.WM_CLOSE, 0, 0);
					return true;
				case OS.VK_F6:
					if (traverseDecorations (true)) return true;
			}
			return false;
		}
		if (msg.message == OS.WM_SYSKEYDOWN) {
			switch (msg.wParam) {
				case OS.VK_F4:
					OS.PostMessage (shell.handle, OS.WM_CLOSE, 0, 0);
					return true;
			}
			return false;
		}
	}
	return false;
}
*/

boolean traverseDecorations (boolean next) {
	Control [] children = parent._getChildren ();
	int length = children.length;
	int index = 0;
	while (index < length) {
		if (children [index] == this) break;
		index++;
	}
	/*
	* It is possible (but unlikely), that application
	* code could have disposed the widget in focus in
	* or out events.  Ensure that a disposed widget is
	* not accessed.
	*/
	int start = index, offset = (next) ? 1 : -1;
	while ((index = (index + offset + length) % length) != start) {
		Control child = children [index];
		if (!child.isDisposed () && child instanceof Decorations) {
			if (child.setFocus ()) return true;
		}
	}
	return false;
}

/**
 * Updates the monitor size whenever the window is resized
 *
 */
public void _updateMonitorSize() {
	Monitor monitor = getMonitor();
	Element el = monitor.handle;
	if (el == document.body) {
		monitor.clientWidth = OS.getFixedBodyClientWidth(); //document.body.clientWidth; 
		monitor.clientHeight = OS.getFixedBodyClientHeight(); //document.body.clientHeight;
		monitor.x = 0;
		monitor.y = 0;
		monitor.width = window.screen.availWidth;
		monitor.height = window.screen.availHeight;
	} else {
		/*
		 * Ignore non document.body's bounds change events
		Point pt = OS.getElementPositionInShell(el, document.body);
		//el.style.position = "absolute";
		monitor.x = pt.x;
		monitor.y = pt.y;
		monitor.width = monitor.clientWidth = OS.getContainerWidth(el);
		monitor.height = monitor.clientHeight = OS.getContainerHeight(el);
		*/
	}

	/*
	monitor.clientWidth = document.body.clientWidth; 
	monitor.width = window.screen.availWidth;
	monitor.clientHeight = document.body.clientHeight;
	monitor.height = window.screen.availHeight;
	monitor.clientX = monitor.x = 0;
	monitor.clientY = monitor.y = 0;
	*/
}

/*
boolean traverseItem (boolean next) {
	return false;
}

boolean traverseReturn () {
	if (defaultButton == null || defaultButton.isDisposed ()) return false;
	if (!defaultButton.isVisible () || !defaultButton.isEnabled ()) return false;
	defaultButton.click ();
	return true;
}

CREATESTRUCT widgetCreateStruct () {
	return new CREATESTRUCT ();
}

int widgetExtStyle () {
	int bits = super.widgetExtStyle () | OS.WS_EX_MDICHILD;
	bits &= ~OS.WS_EX_CLIENTEDGE;
	if ((style & SWT.NO_TRIM) != 0) return bits;
	if (OS.IsPPC) {
		if ((style & SWT.CLOSE) != 0) bits |= OS.WS_EX_CAPTIONOKBTN;
	}
	if ((style & SWT.RESIZE) != 0) return bits;
	if ((style & SWT.BORDER) != 0) bits |= OS.WS_EX_DLGMODALFRAME;
	return bits;
}

int widgetParent () {
	Shell shell = getShell ();
	return shell.hwndMDIClient ();
}

int widgetStyle () {
	/* 
	* Clear WS_VISIBLE and WS_TABSTOP.  NOTE: In Windows, WS_TABSTOP
	* has the same value as WS_MAXIMIZEBOX so these bits cannot be
	* used to control tabbing.
	*-/
	int bits = super.widgetStyle () & ~(OS.WS_TABSTOP | OS.WS_VISIBLE);
	
	/* Set the title bits and no-trim bits *-/
	bits &= ~OS.WS_BORDER;
	if ((style & SWT.NO_TRIM) != 0) return bits;
	if ((style & SWT.TITLE) != 0) bits |= OS.WS_CAPTION;
	
	/* Set the min and max button bits *-/
	if ((style & SWT.MIN) != 0) bits |= OS.WS_MINIMIZEBOX;
	if ((style & SWT.MAX) != 0) bits |= OS.WS_MAXIMIZEBOX;
	
	/* Set the resize, dialog border or border bits *-/
	if ((style & SWT.RESIZE) != 0) {
		/*
		* Note on WinCE PPC.  SWT.RESIZE is used to resize
		* the Shell according to the state of the IME.
		* It does not set the WS_THICKFRAME style.
		*-/
		if (!OS.IsPPC) bits |= OS.WS_THICKFRAME;	
	} else {
		if ((style & SWT.BORDER) == 0) bits |= OS.WS_BORDER;
	}

	/* Set the system menu and close box bits *-/
	if (!OS.IsPPC && !OS.IsSP) {
		if ((style & SWT.CLOSE) != 0) bits |= OS.WS_SYSMENU;
	}
	
	return bits;
}

int windowProc (int hwnd, int msg, int wParam, int lParam) {
	switch (msg) {
		case Display.SWT_GETACCEL:
		case Display.SWT_GETACCELCOUNT:
			if (hAccel == -1) createAccelerators ();
			return msg == Display.SWT_GETACCELCOUNT ? nAccel : hAccel;
	}
	return super.windowProc (hwnd, msg, wParam, lParam);
}

LRESULT WM_ACTIVATE (int wParam, int lParam) {
	LRESULT result = super.WM_ACTIVATE (wParam, lParam);
	if (result != null) return result;
	/*
	* Feature in AWT.  When an AWT Window is activated,
	* for some reason, it seems to forward the WM_ACTIVATE
	* message to the parent.  Normally, the parent is an
	* AWT Frame.  When AWT is embedded in SWT, the SWT
	* shell gets the WM_ACTIVATE and assumes that it came
	* from Windows.  When an SWT shell is activated it
	* restores focus to the last control that had focus.
	* If this control is an embedded composite, it takes
	* focus from the AWT Window.  The fix is to ignore
	* WM_ACTIVATE messages that come from AWT Windows.
	*-/
	if (OS.GetParent (lParam) == handle) {
		TCHAR buffer = new TCHAR (0, 128);
		OS.GetClassName (lParam, buffer, buffer.length ());
		String className = buffer.toString (0, buffer.strlen ());
		if (className.equals (Display.AWT_WINDOW_CLASS)) {
			return LRESULT.ZERO;
		}
	}
	if ((wParam & 0xFFFF) != 0) {
		/*
		* When the high word of wParam is non-zero, the activation
		* state of the window is being changed while the window is
		* minimized. If this is the case, do not report activation
		* events or restore the focus.
		*-/
		if ((wParam >> 16) != 0) return result;
		Control control = display.findControl (lParam);
		if (control == null || control instanceof Shell) {
			if (this instanceof Shell) {
				sendEvent (SWT.Activate);
				if (isDisposed ()) return LRESULT.ZERO;
			}
		}
		if (restoreFocus ()) return LRESULT.ZERO;	
	} else {
		Display display = this.display;
		boolean lockWindow = display.isXMouseActive ();
		if (lockWindow) display.lockActiveWindow = true;
		Control control = display.findControl (lParam);
		if (control == null || control instanceof Shell) {
			if (this instanceof Shell) {
				sendEvent (SWT.Deactivate);
				if (!isDisposed ()) {
					Shell shell = getShell ();
					shell.setActiveControl (null);
					// widget could be disposed at this point
				}
			}
		}
		if (lockWindow) display.lockActiveWindow = false;
		if (isDisposed ()) return LRESULT.ZERO;
		saveFocus ();
	}
	return result;
}

LRESULT WM_CLOSE (int wParam, int lParam) {
	LRESULT result = super.WM_CLOSE (wParam, lParam);
	if (result != null) return result;
	if (isEnabled () && isActive ()) closeWidget ();
	return LRESULT.ZERO;
}

LRESULT WM_HOTKEY (int wParam, int lParam) {
	LRESULT result = super.WM_HOTKEY (wParam, lParam);
	if (result != null) return result;
	if (OS.IsSP) {
		/*
		* Feature on WinCE SP.  The Back key is either used to close
		* the foreground Dialog or used as a regular Back key in an EDIT
		* control. The article 'Back Key' in MSDN for Smartphone 
		* describes how an application should handle it.  The 
		* workaround is to override the Back key when creating
		* the menubar and handle it based on the style of the Shell.
		* If the Shell has the SWT.CLOSE style, close the Shell.
		* Otherwise, send the Back key to the window with focus.
		*-/
		if (((lParam >> 16) & 0xFFFF) == OS.VK_ESCAPE) {
			if ((style & SWT.CLOSE) != 0) {
				OS.PostMessage (handle, OS.WM_CLOSE, 0, 0);
			} else {
				OS.SHSendBackToFocusWindow (OS.WM_HOTKEY, wParam, lParam);
			}
			return LRESULT.ZERO;
		}
	}
	return result;
}

LRESULT WM_KILLFOCUS (int wParam, int lParam) {
	LRESULT result = super.WM_KILLFOCUS (wParam, lParam);
	saveFocus ();
	return result;
}

LRESULT WM_MOVE (int wParam, int lParam) {
	if (moved) {
		Point location = getLocation ();
		if (location.x == oldX && location.y == oldY) {
			return null;
		}
		oldX = location.x;
		oldY = location.y;
	}
	return super.WM_MOVE (wParam, lParam);
}

LRESULT WM_NCACTIVATE (int wParam, int lParam) {
	LRESULT result = super.WM_NCACTIVATE (wParam, lParam);
	if (result != null) return result;
	if (wParam == 0) {
		if (display.lockActiveWindow) return LRESULT.ZERO;
		Control control = display.findControl (lParam);
		if (control != null) {
			Shell shell = getShell ();
			Decorations decorations = control.menuShell ();
			if (decorations.getShell () == shell) {
				if (this instanceof Shell) return LRESULT.ONE;
				if (display.ignoreRestoreFocus) {
					if (display.lastHittest != OS.HTCLIENT) {
						result = LRESULT.ONE;
					}
				}
			}
		}
	}
	if (!(this instanceof Shell)) {
		int hwndShell = getShell().handle;
		OS.SendMessage (hwndShell, OS.WM_NCACTIVATE, wParam, lParam);
	}
	return result;
}

LRESULT WM_QUERYOPEN (int wParam, int lParam) {
	LRESULT result = super.WM_QUERYOPEN (wParam, lParam);
	if (result != null) return result;
	sendEvent (SWT.Deiconify);
	// widget could be disposed at this point
	return result;
}

LRESULT WM_SETFOCUS (int wParam, int lParam) {
	LRESULT result = super.WM_SETFOCUS (wParam, lParam);
	if (savedFocus != this) restoreFocus ();
	return result;
}

LRESULT WM_SIZE (int wParam, int lParam) {
	LRESULT result = null;
	boolean changed = true;
	if (resized) {
		int newWidth = 0, newHeight = 0;
		switch (wParam) {
			case OS.SIZE_RESTORED:
			case OS.SIZE_MAXIMIZED:
				newWidth = lParam & 0xFFFF;
				newHeight = lParam >> 16;
				break;
			case OS.SIZE_MINIMIZED:
				Rectangle rect = getClientArea ();
				newWidth = rect.width;
				newHeight = rect.height;
				break;
		}
		changed = newWidth != oldWidth || newHeight != oldHeight;
		if (changed) {
			oldWidth = newWidth;
			oldHeight = newHeight;
		}
	}
	if (changed) {
		result = super.WM_SIZE (wParam, lParam);
		if (isDisposed ()) return result;
	}
	if (wParam == OS.SIZE_MINIMIZED) {
		sendEvent (SWT.Iconify);
		// widget could be disposed at this point
	}
	return result;
}

LRESULT WM_SYSCOMMAND (int wParam, int lParam) {
	LRESULT result = super.WM_SYSCOMMAND (wParam, lParam);
	if (result != null) return result;
	if (!(this instanceof Shell)) {
		int cmd = wParam & 0xFFF0;
		switch (cmd) {
			case OS.SC_CLOSE: {
				OS.PostMessage (handle, OS.WM_CLOSE, 0, 0);
				return LRESULT.ZERO;
			}
			case OS.SC_NEXTWINDOW: {
				traverseDecorations (true);
				return LRESULT.ZERO;
			}
		}
	}
	return result;
}

LRESULT WM_WINDOWPOSCHANGING (int wParam, int lParam) {
	LRESULT result = super.WM_WINDOWPOSCHANGING (wParam, lParam);
	if (result != null) return result;
	if (display.lockActiveWindow) {
		WINDOWPOS lpwp = new WINDOWPOS ();
		OS.MoveMemory (lpwp, lParam, WINDOWPOS.sizeof);
		lpwp.flags |= OS.SWP_NOZORDER;
		OS.MoveMemory (lParam, lpwp, WINDOWPOS.sizeof);
	}
	return result;
}

*/
}
