/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package org.eclipse.swt.internal.browser;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author josson smith
 *
 * 2006-5-21
 * @j2sPrefix O$ = 
 */
public class OS {
	
	private OS() {
		
	}
	
	public static boolean isIE = false;
	
	public static boolean isIE60 = false;
	public static boolean isIE55 = false;
	public static boolean isIE50 = false;
	
	public static boolean isMozilla = false;
	
	public static boolean isFirefox = false;
	
	public static boolean isSafari = false;
	
	public static boolean isOpera = false;
	
	/**
	 * @j2sNative
	var os = $wt.internal.browser.OS;
	var dua = navigator.userAgent;
	var dav = navigator.appVersion;
	os.isOpera = dua.indexOf("Opera") >= 0;
	var isKHTML = (dav.indexOf("Konqueror") >= 0)||(dav.indexOf("Safari") >= 0);
	os.isSafari = dav.indexOf("Safari") >= 0;
	var geckoPos = dua.indexOf("Gecko");
	os.isMozilla = (geckoPos >= 0)&&(!isKHTML);
	os.isFirefox = os.isMozilla && dua.indexOf ("Firefox") != -1;
	os.isIE = (document.all)&&(!os.isOpera);
	os.isIE50 = os.isIE && dav.indexOf("MSIE 5.0")>=0;
	os.isIE55 = os.isIE && dav.indexOf("MSIE 5.5")>=0;
	os.isIE60 = os.isIE && dav.indexOf("MSIE 6.0")>=0;
	 */
	static {
		
	}
	public static void destroyHandle(Object handle) {
		if (handle == null) {
			return ;
		}
		Element el = (Element) handle;
		el.onblur = null;
		el.onchange = null;
		el.onclick = null;
		el.oncontextmenu = null;
		el.ondblclick = null;
		el.onfocus = null;
		el.onkeydown = null;
		el.onkeypress = null;
		el.onkeyup = null;
		el.onmousedown = null;
		el.onmousemove = null;
		el.onmouseout = null;
		el.onmouseover = null;
		el.onmouseup = null;
		el.onselectchange = null;
		el.onselectstart = null;
		if (el.parentNode != null) {
			try {
				el.parentNode.removeChild (el);
			} catch (Error e) {
			}
		}
	}
	
	public static void clearChildren(Object handle) {
		if (handle == null) {
			return ;
		}
		Element el = (Element) handle;
		for (int i = el.childNodes.length - 1; i >= 0; i--) {
			el.removeChild(el.childNodes[i]);
		}
	}
	
	public static void SetWindowPos(Object handle, int x, int y, int w, int h, int flags) {
		if (handle == null) {
			return ;
		}
		//Element el = (Element) handle;
	}
	
	private static Element invisibleContainer;
	private static Object containers;
	private static Element lineContainer;
	private static Element blockContainer;
	
	private static void init() {
		if (invisibleContainer == null) {
			Element el = document.createElement ("DIV");
			document.body.appendChild (el);
			CSSStyle s = el.style;
			s.position = "absolute";
			s.left = "-4000px";
			s.top = "-300px";
			s.width = "3000px";
			s.height = "100px";
			s.overflow = "scroll";
			invisibleContainer = el;
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
		 */ {}
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
		insertText(c, str);
		return c;
	}

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
			left += el.offsetLeft;
			top += el.offsetTop;
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
		int xx = Math.min(cx, cy) / 3;
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
			s.top = (x - 3) + "px";
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
}
