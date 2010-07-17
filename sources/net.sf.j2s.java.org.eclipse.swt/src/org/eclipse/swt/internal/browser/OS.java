/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package org.eclipse.swt.internal.browser;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.dnd.HTMLEventWrapper;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author zhou renjian
 *
 * 2006-5-21
 * @j2sPrefix O$ = 
 */
public class OS {
	
	private OS() {
		
	}
	
	public static boolean isIE = false;
	
	public static boolean isIE90 = false;
	public static boolean isIE80 = false;
	public static boolean isIE70 = false;
	public static boolean isIE60 = false;
	public static boolean isIE55 = false;
	public static boolean isIE50 = false;
	
	public static boolean isIENeedPNGFix = false;
	
	public static boolean isMozilla = false;
	
	public static boolean isFirefox = false;
	
	public static boolean isFirefox10 = false;
	
	public static boolean isFirefox20 = false;
	
	public static boolean isFirefox30 = false;
	
	public static boolean isSafari = false;
	
	public static boolean isOpera = false;
	
	public static boolean isChrome = false;
	
	public static boolean isChrome10 = false; // Chrome 1.0 or Chrome 0.*
	
	public static boolean isChrome20 = false;
	
	public static boolean isChrome30 = false;
	
	
	/* Record Caps Lock status */
	public static boolean isCapsLockOn = false;
	
	public static Object noReturnCallback;

	/**
	 * @j2sNative
	var os = $wt.internal.browser.OS;
	var dua = navigator.userAgent;
	os.isOpera = dua.indexOf ("Opera") >= 0;
	var isKHTML = dua.indexOf ("Konqueror") >= 0 || dua.indexOf ("Safari") >= 0;
	os.isSafari = dua.indexOf ("Safari") >= 0;
	os.isChrome = dua.indexOf ("Chrome") >= 0;
	os.isChrome10 = dua.indexOf ("Chrome/1.") >= 0 || dua.indexOf ("Chrome/0.") >= 0;
	os.isChrome20 = dua.indexOf ("Chrome/2.") >= 0;
	os.isChrome30 = dua.indexOf ("Chrome/3.") >= 0;
	var geckoPos = dua.indexOf ("Gecko");
	os.isMozilla = geckoPos >= 0 && !isKHTML;
	os.isFirefox = os.isMozilla && dua.indexOf ("Firefox") != -1;
	os.isFirefox10 = os.isFirefox && (dua.indexOf ("Firefox/1.") != -1 || dua.indexOf ("Firefox/0.") != -1);
	os.isFirefox20 = os.isFirefox && dua.indexOf ("Firefox/2.") != -1;
	os.isFirefox30 = os.isFirefox && dua.indexOf ("Firefox/3.") != -1;
	os.isIE = document.all != null && !os.isOpera;
	os.isIE50 = os.isIE && dua.indexOf("MSIE 5.0")>=0;
	os.isIE55 = os.isIE && dua.indexOf("MSIE 5.5")>=0;
	os.isIE60 = os.isIE && dua.indexOf("MSIE 6.0")>=0;
	os.isIE70 = os.isIE && dua.indexOf("MSIE 7.0")>=0;
	os.isIE80 = os.isIE && dua.indexOf("MSIE 8.0")>=0;
	os.isIE90 = os.isIE && dua.indexOf("MSIE 9.0")>=0;
	os.isIENeedPNGFix = os.isIE50 || os.isIE55 || os.isIE60;
	os.noReturnCallback = os.noReturnCallbackFunction;
	 */
	static {
		
	}
	public static void destroyHandle(Object handle) {
		if (handle == null) {
			return ;
		}
		Element el = (Element) handle;
		if (el.parentNode != null) {
			try {
				el.parentNode.removeChild (el);
			} catch (Error e) {
			}
		}
		if (isIE) {
			initGC();
			gcContainer.appendChild(el);
			el = null;
			gcContainer.innerHTML = "";
		}
	}
	
	public static void clearChildren(Object handle) {
		if (handle == null || ((Element) handle).nodeType != 1) {
			return ;
		}
		initGC();
		Element el = (Element) handle;
		for (int i = el.childNodes.length - 1; i >= 0; i--) {
			Element child = el.childNodes[i];
			el.removeChild(child);
			if (isIE) {
				gcContainer.appendChild(child);
				child = null;
			}
		}
		if (isIE) {
			gcContainer.innerHTML = "";
		}
	}

	public static void deepClearChildren(Object handle) {
		if (handle == null) {
			return ;
		}
		initGC();
		Element el = (Element) handle;
		for (int i = el.childNodes.length - 1; i >= 0; i--) {
			Element child = el.childNodes[i];
			if (child.nodeType == 1) {
				deepClearChildren(child);
				destroyHandle(child);
			} else {
				el.removeChild(child);
				if (isIE) {
					gcContainer.appendChild(child);
					child = null;
				}
			}
		}
		if (isIE) {
			gcContainer.innerHTML = "";
		}
	}

	public static void SetWindowPos(Object handle, int x, int y, int w, int h, int flags) {
		if (handle == null) {
			return ;
		}
		//Element el = (Element) handle;
	}
	
	private static Element gcContainer;
	private static Element invisibleContainer;
	private static Object containers;
	private static Element lineContainer;
	private static Element blockContainer;
	
	private static void init() {
		if (invisibleContainer == null) {
			Element el = document.createElement ("DIV");
			el.id = "swt-invisible-container";
			document.body.appendChild (el);
			CSSStyle s = el.style;
			s.position = "absolute";
			s.left = "-4000px";
			s.top = "-300px";
			s.width = "3000px";
			s.height = "100px";
			s.overflow = "scroll";
			s.lineHeight = "16px"; // or "1", reset CSS
			invisibleContainer = el;
			setTextSelection(el, false);
			
			containers = new Object();
			
			el = document.createElement ("DIV");
			invisibleContainer.appendChild (el);
			el.className = "system-default";
			el.style.whiteSpace = "nowrap";
			el.style.overflow = "visible";
			lineContainer = el;
			
			el = document.createElement ("DIV");
			invisibleContainer.appendChild (el);
			el.style.overflow = "visible";
			el.style.whiteSpace = "normal";
			blockContainer = el;
		}
	}
	private static void initGC() {
		if (isIE) {
			if (gcContainer == null) {
				Element gc = document.createElement("DIV");
				gc.style.display = "none";
				gc.id = "gc";
				document.body.appendChild(gc);
				gcContainer = gc;
			}
		}
	}

	public static void dispose() {
		if (blockContainer != null) {
			deepClearChildren(blockContainer);
			destroyHandle(blockContainer);
			blockContainer = null;
		}
		if (lineContainer != null) {
			deepClearChildren(lineContainer);
			destroyHandle(lineContainer);
			lineContainer = null;
		}
		if (invisibleContainer != null) {
			deepClearChildren(invisibleContainer);
			destroyHandle(invisibleContainer);
			invisibleContainer = null;
		}
		if (containers != null) {
			Object c = containers;
			/**
			 * @j2sNative
			 * for (var p in c) {
			 * 	try {
			 * 	c[p] = null;
			 * 	delete c[p];
			 * 	} catch (e) {}
			 * }
			 */ { c.toString(); }
		}
		if (gcContainer != null) {
			gcContainer.parentNode.removeChild(gcContainer);
			gcContainer = null;
		}
	}

	private static int wScrollBar = -1;
	private static int hScrollBar = -1;
	
	private static void checkScrollBar() {
		Element el = document.createElement("DIV");
		CSSStyle s = el.style;
		s.position = "absolute";
		s.left = "-4000px";
		s.top = "-1000px";
		s.overflow = "scroll";
		s.width = "324px";
		s.height = "324px";
		document.body.appendChild(el);
		wScrollBar = el.offsetWidth - el.clientWidth;
		hScrollBar = el.offsetHeight - el.clientHeight;
		//document.body.removeChild(el);
		destroyHandle(el);
	}
	
	public static int getScrollBarWidth() {
		if (wScrollBar == -1) {
			checkScrollBar();
		}
		return wScrollBar;
	}
	
	public static int getScrollBarHeight() {
		if (hScrollBar == -1) {
			checkScrollBar();
		}
		return hScrollBar;
	}
	
	public static int getContainerWidth(Object container) {
		Element el = (Element) container;
		return Math.max(el.offsetWidth, Math.max(el.clientWidth, el.scrollWidth));
	}
	
	public static int getContainerHeight(Object container) {
		Element el = (Element) container;
		int max = Math.max(el.offsetHeight, Math.max(el.clientHeight, el.scrollHeight));
		if (isIE) {
			max--;
		}
		return max;
	}

	public static String insertText(Object el, String text) {
		String[] lines = null;
		Element handle = (Element) el;
//		el.appendChild (document.createTextNode (text));
		/**
		 * @j2sNativeSrc
		if (!((/[\r\n\t&]/).test (text))) {
			handle.style.display = "inline";
			handle.appendChild(document.createTextNode(text));
			return text;
		}
		var c160 = String.fromCharCode (160);
		var c160x8 = c160 + c160 + c160 + c160 + c160 + c160 + c160 + c160;
		var s = text.replace (/\t/g, c160x8);
		if (window["Console"] != null && Console.splitNeedFixed) {
			try {
				lines = Console.splitIntoLines (s);
			} catch (e) {
				lines = s.split (/\r\n|\r|\n/g);
			}
		} else {
			lines = s.split (/\r\n|\r|\n/g);
		}
		 * @j2sNative
		if (!((/[\r\n\t&]/).test (b))) {
			d.style.display = "inline";
			d.appendChild(document.createTextNode(b));
			return b;
		}
		var z = String.fromCharCode (160);
		var w = z + z + z + z + z + z + z + z;
		var s = b.replace (/\t/g, w);
		if (window["Console"] != null && Console.splitNeedFixed) {
			try {
				c = Console.splitIntoLines (s);
			} catch (e) {
				c = s.split (/\r\n|\r|\n/g);
			}
		} else {
			c = s.split (/\r\n|\r|\n/g);
		}
		 */ { lines = new String[0]; }
		for (int i = 0; i < lines.length; i++) {
			if (i > 0) {
				handle.appendChild (document.createElement ("BR"));
			}
			String line = lines[i];
			if (line.length() == 0)
			/**
			 * @j2sNativeSrc
			 * line = c160;
			 * @j2sNative
			 * f = z;
			 */
			{
				//line = String.fromCharCode (160);
			}
			int lastIndex = 0;
			int idx = line.indexOf ('&');
			Element lineEl = document.createElement ("SPAN");
			//lineEl.style.whiteSpace = "nowrap";
			handle.appendChild (lineEl);
			while (idx != -1) {
				if (idx < line.length() - 1) {
					char c = line.charAt (idx + 1);
					if (c == '&') {
						idx = line.indexOf ('&', idx + 2);
						continue;
					} else {
						String chs = line.substring (lastIndex, idx);
						if (chs.length() != 0) {
							lineEl.appendChild (document.createTextNode (chs));
						}
						Element span = document.createElement ("SPAN");
						lineEl.appendChild (span);
						//span.style.whiteSpace = "nowrap";
						span.appendChild (document.createTextNode ("" + c));
						text = "" + c;
						lastIndex = idx + 2;
						idx = line.indexOf ('&', lastIndex);
					}
				} else {
					break;
				}
			}
			String s = null;
			/**
			 * @j2sNativeSrc
			if (lastIndex == 0) {
				s = lines[i].replace (/&&/g, '&');
			} else {
				s = lines[i].substring (lastIndex, lines[i].length).replace (/&&/g, '&');
			}
			 * @j2sNative
			if (g == 0) {
				j = c[e].replace (/&&/g, '&');
			} else {
				j = c[e].substring (g, c[e].length).replace (/&&/g, '&');
			}
			*/ {}
			lineEl.appendChild (document.createTextNode (s));
		}
		return text;
	}

	private static String wrapCSS(String a) {
		if (a == null) {
			return null;
		} else
		/**
		 * @j2sNative
			a = a.replace (/(^|[^-])(left|top|right|bottom|height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig,'$1');
			a = a.replace (/background(-[^:]+)?\s*:\s*[^;]+(\s*;|$)/ig, '');
			a = a.replace (/visibility(-[^:]+)?\s*:\s*[^;]+(\s*;|$)/ig, '');
			a = a.trim ();
			return a;
		 */
		{
			a = a.trim ();
			return a;
		}
	}
	private static Element setupAsPlain(String str, int wrappedWidth) {
		init ();
		Element c = null;
		if (wrappedWidth > 0) {
			c = blockContainer;
			c.style.width = wrappedWidth + "px";
		} else {
			c = lineContainer;
		}
		clearChildren(c);
		c.style.display = "inline";
		insertText(c, str);
		return c;
	}

	static String[] oldDisplays = new String[0];
	
	private static Element setupAsStyled(String str, String className, String cssText, int wrappedWidth) {
		init ();
		cssText = wrapCSS(cssText);
		Object e = containers;
		Element f = null;
		String g = null;
		if (wrappedWidth > 0) {
			g = "+" + className + "|" + cssText;
		} else {
			g = "~" + className + "|" + cssText;
		}
		/**
		 * @j2sNative
		 * f = e[g];
		 */ {
			 e = g; // non-sense code
		 }
		if (f != null) {
			clearChildren (f);
		} else {
			f = document.createElement("DIV");
			invisibleContainer.appendChild(f);
			CSSStyle x = f.style;
			f.className=className;
			x.cssText=cssText;
			if (wrappedWidth > 0) {
				x.whiteSpace="normal";
			} else {
				x.whiteSpace="nowrap";
			}
			x.overflow="visible";

			/**
			 * @j2sNative
			 * e[g]=f;
			 */ {
				 g = e.toString(); // non-sense code
			 }
		}
		if (wrappedWidth > 0) {
			f.style.width = wrappedWidth + "px";
		}
		/*
		 * Set other container invisible to make sure the size is accurate
		 */
		Element[] childNodes = invisibleContainer.childNodes;
		for (int i = 0; i < childNodes.length; i++) {
			CSSStyle s = childNodes[i].style;
			if (childNodes[i] != f) {
				if (s.display != "none") {
					oldDisplays[i] = s.display;
					s.display = "none";
				}
			} else {
				if (oldDisplays[i] != null) {
					s.display = oldDisplays[i];
				}
			}
		}
		insertText (f, str);
		return f;
	}
	
	public static int getStringPlainWidth(String str) {
		Element c = setupAsPlain(str, -1);
		return getContainerWidth (c);
	}

	public static int getStringStyledWidth(String str, String className, String cssText) {
		/**
		 * @j2sNativeSrc
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return 0;
		 * }
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (c)) {
		 * 	return 0;
		 * }
		 */ {}
		Element c = setupAsStyled(str, className, cssText, -1);
		return getContainerWidth (c);
	}
	
	public static int getStringPlainHeight(String str) {
		Element c = setupAsPlain(str, -1);
		return getContainerHeight(c);
	}
	
	public static int getStringPlainWrappedHeight(String str, int wrappedWidth) {
		Element c = setupAsPlain(str, wrappedWidth);
		return getContainerHeight(c);
	}

	public static int getStringStyledHeight(String str, String className, String cssText) {
		/**
		 * @j2sNativeSrc
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return 0;
		 * }
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (c)) {
		 * 	return 0;
		 * }
		 */ {}
		Element c = setupAsStyled(str, className, cssText, -1);
		return getContainerHeight(c);
	}
	
	public static int getStringStyledWrappedHeight(String str, String className, String cssText, int wrappedWidth) {
		/**
		 * @j2sNativeSrc
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return 0;
		 * }
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (c)) {
		 * 	return 0;
		 * }
		 */ {}
		Element c = setupAsStyled(str, className, cssText, wrappedWidth);
		return getContainerHeight(c);
	}
	
	public static Point getStringPlainSize(String str) {
		Element c = setupAsPlain(str, -1);
		return new Point(getContainerWidth(c), getContainerHeight(c));
	}

	public static Point getStringStyledSize(String str, String className, String cssText) {
		/**
		 * @j2sNativeSrc
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return new org.eclipse.swt.graphics.Point(0, 0);
		 * }
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (c)) {
		 * 	return new org.eclipse.swt.graphics.Point(0, 0);
		 * }
		 */ {}
		Element c = setupAsStyled(str, className, cssText, -1);
		return new Point(getContainerWidth(c), getContainerHeight(c));
	}
	
	public static Point calcuateRelativePosition(Element el, Element relativeEl){
		Element srcEl = el;
		int left = 0;
		int top = 0;
		while (el != null && el != relativeEl) {
			left += el.offsetLeft - el.scrollLeft ;
			top += el.offsetTop - el.scrollTop;
			if (el != srcEl)
			/**
			 * @j2sNative
			var style = null;
			if (document.defaultView != null) { // OS.isMozilla || OS.isOpera
				style = document.defaultView.getComputedStyle (el, null);
			} else if (el.currentStyle != null) { // OS.isIE
				style = el.currentStyle;
			}
			if (!O$.isOpera && style != null) {
				var w = 0;
				var bw = style.borderLeftWidth;
				if (bw.length != 0) {
					w = parseInt (bw); // unit is considered as "px"
					if (!isNaN(w)) {
						left += w;
					}
				}
				bw = style.borderTopWidth;
				if (bw.length != 0) {
					w = parseInt (bw); // unit is considered as "px"
					if (!isNaN(w)) {
						top += w;
					}
				}
			}
			 */ {}
				 
			el = el.offsetParent;
		}
		return new Point(left, top);
	}
	
	public static void updateArrowSize(Object el, int style, int cx, int cy) {
		int xx = Math.min(cx, cy) / 4;
		final CSSStyle s = ((Element) el).style;
		s.borderWidth = (xx > 0 ? xx : 0) + "px";
		if ((style & SWT.LEFT) != 0) {
			s.borderLeftWidth = "0";
		} else if ((style & SWT.RIGHT) != 0) {
			s.borderRightWidth = "0";
		} else if ((style & SWT.UP) != 0) {
			s.borderTopWidth = "0";
		} else if ((style & SWT.DOWN) != 0) {
			if (xx > 1) {
				s.borderWidth = (xx - 1) + "px";
			}
			s.borderBottomWidth = "0";
		} else {
			s.borderTopWidth = "0";
		} 
		int x = cy / 6;
		xx = cy / 3;
		s.position = "relative";
		if ((style & (SWT.RIGHT | SWT.LEFT)) != 0) {
			s.top = (x - 2) + "px";
			if ((style & SWT.RIGHT) != 0) {
				s.left = "1px";
			}
		} else {
			if ((style & SWT.UP) != 0) {
				s.top = (xx - 3)+ "px";
			} else if ((style & SWT.DOWN) != 0) {
				s.top = (xx - 2)+ "px";
			}
		}
		/**
		 * TODO: Get rid of these nasty position things!
		 */
		if (OS.isMozilla && !OS.isFirefox) {
			if ((style & SWT.UP) != 0) {
				s.left = "-2px";
			} else if ((style & SWT.DOWN) != 0) {
				s.left = "-1px";
			}
		}
		if (OS.isFirefox) {
			if ((style & (SWT.RIGHT | SWT.LEFT)) != 0) {
				s.top = "-2px";
				if ((style & SWT.RIGHT) != 0) {
					s.left = "1px";
				}
			} else {
				if ((style & SWT.UP) != 0) {
					if (Math.min(cx, cy) <= 12) {
						s.left = "-1px";
					} else {
						s.left = "-2px";
					}
					s.top = "-1px";
				} else if ((style & SWT.DOWN) != 0) {
					s.left = "-1px";
					s.top = "-1px";
				}
			}
		} else if (OS.isSafari || OS.isIE80) {
			if ((style & (SWT.RIGHT | SWT.LEFT)) != 0) {
				s.top = "1px";
				if ((style & SWT.RIGHT) != 0) {
					s.left = "1px";
				}
			} else {
				if ((style & SWT.UP) != 0) {
					s.left = "-1px";
					s.top = "0";
				} else if ((style & SWT.DOWN) != 0) {
					s.left = "0";
					s.top = "1px";
				}
			}
		}

	}

	public static boolean existedCSSClass(Object el, String cssClazz) {
		Element e = (Element) el;
		String className = e.className;
		if (className == null || className.length() == 0) {
			return false;
		}
		String[] clazz = className.split("\\s");
		for (int i = 0; i < clazz.length; i++) {
			if (clazz[i] == cssClazz) {
				return true;
			}
		}
		return false;
	}

	
	public static boolean replaceCSSClassInDepth(Object el, String toBeRemovedCSSClazz, String toBeInsertedCSSClazz) {
		Element e = (Element) el;
		if (toBeRemovedCSSClazz == null || toBeRemovedCSSClazz.length() == 0 || toBeInsertedCSSClazz == null) {
			return false;
		}
		replaceCSSClass(el, toBeRemovedCSSClazz, toBeInsertedCSSClazz);
		int length = e.childNodes.length;
		boolean replaced = false;
		for(int i = 0; i < length; i++){
			replaced = replaced || replaceCSSClassInDepth(e.childNodes[i], toBeRemovedCSSClazz, toBeInsertedCSSClazz);
		}
		return replaced; 
	}
	
	public static boolean replaceCSSClass(Object el, String toBeRemovedCSSClazz, String toBeInsertedCSSClazz) {
		Element e = (Element) el;
		String className = e.className;
		if (className == null || className.length() == 0) {
			return false;
		}
		String[] clazz = className.split("\\s");
		boolean existed = false;
		for (int i = 0; i < clazz.length; i++) {
			if (clazz[i] == toBeRemovedCSSClazz) {
				existed = true;
				clazz[i] = toBeInsertedCSSClazz;
				break;
			}
		}
		if (existed) 
		/**
		 * @j2sNative
		 * e.className = clazz.join (" ");
		 */ {}
		return existed;
	}
	
	public static boolean removeCSSClassInDepth(Object el, String cssClazz){
		Element e = (Element) el;
		if (cssClazz == null || cssClazz.length() == 0) {
			return false;
		}
		removeCSSClass(el, cssClazz);
		int length = e.childNodes.length;
		boolean removed = false;
		for(int i = 0; i < length; i++){
			removed = removed || removeCSSClassInDepth(e.childNodes[i], cssClazz);
		}
		return removed; 
	}
	
	public static boolean removeCSSClass(Object el, String cssClazz) {
		Element e = (Element) el;
		String className = e.className;
		if (className == null || className.length() == 0) {
			return false;
		}
		String[] clazz = className.split("\\s");
		boolean existed = false;
		for (int i = 0; i < clazz.length; i++) {
			if (clazz[i] == cssClazz) {
				existed = true;
				for (int j = i; j < clazz.length - 1; j++) {
					clazz[j] = clazz[j + 1];
				}
				/**
				 * @j2sNative
				 * clazz.length--;
				 */ {}
				break;
			}
		}
		if (existed) 
		/**
		 * @j2sNative
		 * e.className = clazz.join (" ");
		 */ {}
		return existed;
	}

	public static boolean addCSSClass(Object el, String cssClazz) {
		Element e = (Element) el;
		String className = e.className;
		if (className == null || className.length() == 0) {
			e.className = cssClazz;
			return true;
		}
		String[] clazz = className.split("\\s");
		for (int i = 0; i < clazz.length; i++) {
			if (clazz[i] == cssClazz) {
				return false;
			}
		}
		clazz[clazz.length] = cssClazz;
		/**
		 * @j2sNative
		 * e.className = clazz.join (" ");
		 */ {}
		return true;
	}
	
	public static void toggleCSSClass(Object el, String cssClazz) {
		Element e = (Element) el;
		String className = e.className;
		if (className == null || className.length() == 0) {
			e.className = cssClazz;
			return;
		}
		String[] clazz = className.split("\\s");
		for (int i = 0; i < clazz.length; i++) {
			if (clazz[i] == cssClazz) {
				for (int j = i; j < clazz.length - 1; j++) {
					clazz[j] = clazz[j + 1];
				}
				/**
				 * @j2sNative
				 * clazz.length--;
				 * e.className = clazz.join (" ");
				 */ {}
				return;
			}
		}
		clazz[clazz.length] = cssClazz;
		/**
		 * @j2sNative
		 * e.className = clazz.join (" ");
		 */ {}
	}

	/**
	 * Keep or remove the given CSS class for the given element.
	 * It's similar to the following code:
	 * <pre>
	 * if (kept) {
	 *     OS.addCSSClass(el, cssClazz);
	 * } else {
	 *     OS.removeCSSClass(el, cssClazz);
	 * }
	 * </pre>
	 * 
	 * @param el
	 * @param cssClazz
	 * @param kept kept or remove CSS class 
	 */
	public static void updateCSSClass(Object el, String cssClazz, boolean kept) {
		Element e = (Element) el;
		String className = e.className;
		if (className == null || className.length() == 0) {
			if (kept) {
				e.className = cssClazz;
			}
			return;
		}
		String[] clazz = className.split("\\s");
		for (int i = 0; i < clazz.length; i++) {
			if (clazz[i] == cssClazz) {
				if (kept) {
					return;
				}
				for (int j = i; j < clazz.length - 1; j++) {
					clazz[j] = clazz[j + 1];
				}
				/**
				 * @j2sNative
				 * clazz.length--;
				 * e.className = clazz.join (" ");
				 */ {}
				return;
			}
		}
		if (kept) {
			clazz[clazz.length] = cssClazz;
			/**
			 * @j2sNative
			 * e.className = clazz.join (" ");
			 */ {}
		}
	}
	
	public static int getFixedBodyClientWidth() {
		Element b = document.body;
		Element p = b.parentNode;
		int bcWidth = b.clientWidth;
		int pcWidth = p.clientWidth;
		if (OS.isIE) { // && !OS.isOpera
			return (pcWidth == 0) ? bcWidth : pcWidth;
		} else if (OS.isFirefox || OS.isSafari || OS.isOpera) {
			return pcWidth;
			/*
			return (pcWidth == p.offsetWidth 
					&& pcWidth == p.scrollWidth) ? bcWidth : pcWidth;
			*/
		}
		return bcWidth;
	}
	
	public static int getFixedBodyClientHeight() {
	    Element b = document.body;
	    Element p = b.parentNode;
	    int bcHeight = b.clientHeight;
	    int pcHeight = p.clientHeight;
	    if (OS.isIE) { // && !OS.isOpera
	        return (pcHeight == 0) ? bcHeight : pcHeight;
	    } else if (OS.isFirefox || OS.isSafari) {
	        return (pcHeight == p.offsetHeight 
	                && pcHeight == p.scrollHeight) ? bcHeight : pcHeight;
	    } else if (OS.isOpera) {
	    	return pcHeight;
	    }
	    return bcHeight;
	}

	public static int getFixedBodyOffsetTop() {
	    Element b = document.body;
	    Element p = b.parentNode;
	    //int bcHeight = b.clientHeight;
	    int pcHeight = p.clientHeight;
	    int bcScrollTop = b.scrollTop + b.offsetTop;
	    int pcScrollTop = p.scrollTop + p.offsetTop;
	    if (OS.isIE) { // && !OS.isOpera
	        return (pcHeight == 0) ? bcScrollTop : pcScrollTop;
	    } else if (OS.isFirefox) {
	        return (pcHeight == p.offsetHeight 
	                && pcHeight == p.scrollHeight) ? bcScrollTop : pcScrollTop;
	    }
	    return bcScrollTop;
	}

	public static int getFixedBodyOffsetLeft() {
	    Element b = document.body;
	    Element p = b.parentNode;
	    //int bcHeight = b.clientHeight;
	    int pcHeight = p.clientHeight;
	    int bcScrollLeft = b.scrollLeft + b.offsetLeft;
	    int pcScrollLeft = p.scrollLeft + p.offsetLeft;
	    if (OS.isIE) { // && !OS.isOpera
	        return (pcHeight == 0) ? bcScrollLeft : pcScrollLeft;
	    } else if (OS.isFirefox) {
	        return (pcHeight == p.offsetHeight 
	                && pcHeight == p.scrollHeight) ? bcScrollLeft : pcScrollLeft;
	    }
	    return bcScrollLeft;
	}
	
	private static Object imageCaches = new Object();

	public static Point getImageSize(Image image) {
		int w = 16, h = 16; // Default to 16x16 for common
		if (image.packedURL != null) {
			w = image.packedItemWidth;
			h = image.packedItemHeight;
		} else if (image.width == 0 && image.height == 0) {
			if (image.url != null && image.url.length() != 0) {
				org.eclipse.swt.internal.xhtml.Image img = null;
				/**
				 * @j2sNative
				 * img = O$.imageCaches[image.url];
				 */ { imageCaches.toString(); }
				if (img == null) {
					img = new org.eclipse.swt.internal.xhtml.Image ();
					img.src = image.url;
				}
				image.width = img.width;
				image.height = img.height;
				w = img.width;
				h = img.height;
				/**
				 * @j2sNative
				 * O$.imageCaches[image.url] = img;
				 */ {}
				// TODO: The above method to find out width & height is unsafe!
				// TODO: Maybe the image may fail to be loaded!
			} // else default 16x16
		} else {
			w = image.width;
			h = image.height;
		}
		return new Point(w, h); 
	}
	
	/**
	 * @j2sNative
	 * try {
	 * handle.focus();
	 * } catch (e) {}
	 */
	public static void SetFocus(Element handle) {
		// handle.focus();
	}
	

	public static char getInputCharacter(int keyCode, boolean shiftKey) {
		char ch = '\0';
		if (keyCode == 10 || keyCode == 13 || keyCode == 9 || keyCode == 32) {
			ch = (char) keyCode;
		} else if (keyCode >= 48 && keyCode < 58) {
			if (!shiftKey) {
				ch = (char) keyCode;
			} else {
				char chs[] = {')', '!', '@', '#', '$', '%', '^', '&', '*', '('};
				ch = chs[keyCode - 48];
			}
		} else if (keyCode == 61) {
			if (!shiftKey) {
				ch = '=';
			} else {
				ch = '+';
			}
		} else if (keyCode == 59) {
			if (!shiftKey) {
				ch = ';';
			} else {
				ch = ':';
			}
		} else if (keyCode >= 65 && keyCode <= 90) {
			if ((shiftKey && isCapsLockOn) || (!shiftKey && !isCapsLockOn)) {
				ch = (char) (keyCode + 'a' - 'A');
			} else {
				ch = (char) keyCode;
			}
		} else if (keyCode >= 96 && keyCode <= 105) {
			ch = (char) (keyCode - 96 + '0');
		} else if (keyCode >= 106 && keyCode <= 111 && keyCode != 108) {
			char chs[] = {'*', '+', '?', '-', '.', '/'};
			ch = chs[keyCode - 106];
		} else if (keyCode >= 186 && keyCode <= 192) {
			if (!shiftKey) {
				char chs[] = {';', '=', ',', '-', '.', '/', '`'};
				ch = chs[keyCode - 186];
			} else {
				char chs[] = {':', '+', '<', '_', '>', '?', '~'};
				ch = chs[keyCode - 186];
			}
		} else if (keyCode >= 219 && keyCode <= 222) {
			if (!shiftKey) {
				char chs[] = {'[', '\\', ']', '\''};
				ch = chs[keyCode - 219];
			} else {
				char chs[] = {'{', '|', '}', '\"'};
				ch = chs[keyCode - 219];
			}
		} else {
			ch = (char) keyCode;
		}
		return ch;
	}
	
	public static boolean isInputCharacter(int keyCode, boolean shiftKey, boolean altKey, boolean ctrlKey) {
		if (altKey || ctrlKey) {
			return false;
		}
		if (keyCode == 10 || keyCode == 13 || keyCode == 9 || keyCode == 32
				|| keyCode == 8 || keyCode == 46 // Backspace and Delete
				|| (keyCode >= 48 && keyCode <= 57)
				|| keyCode == 59 || keyCode == 61
				|| (keyCode >= 65 && keyCode <= 90)
				|| (keyCode >= 96 && keyCode <= 111 && keyCode != 108)
				|| (keyCode >= 186 && keyCode <= 192)
				|| (keyCode >= 218 && keyCode <= 222)) {
			return true;
		}
		return false;
	}

	/**
	 * @j2sNative
	 * if (O$.isMozilla || O$.isFirefox) {
	 * 	handle.style.MozUserSelect = enabled ? "all" : "none";
	 * } else if (typeof handle.style.KhtmlUserSelect != "undefined") {
	 * 	handle.style.KhtmlUserSelect = "none";
	 * } else if (typeof handle.onselectstart != "undefined") {
	 * 	handle.onselectstart = enabled ? null : O$.noReturnCallbackFunction;
	 * 	return O$.noReturnCallbackFunction;
	 * }
	 * return null;
	 */
	public static Object setTextSelection(Element handle, boolean enabled) {
		return null;
	}
	
	static boolean noReturnCallbackFunction(Object e) {
		HTMLEventWrapper evt = new HTMLEventWrapper (e);
		evt.preventDefault ();
		evt.stopPropagation ();
		return false;
	}
}
