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

import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author josson smith
 *
 * 2006-5-21
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
	public static void destoryHandle(Object handle) {
		if (handle == null) {
			return ;
		}
		Element el = (Element) handle;
		el.onblur = null;
		el.onchange = null;
		el.onclick = null;
		el.oncontextmenu = null;
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
		Element el = (Element) handle;
	}
	
	private static Element invisibleContainer;
	private static Element lineContainer;
	private static Element blockContainer;
	
	private static void init() {
		if (invisibleContainer == null) {
			Element el = document.createElement ("DIV");
			document.body.appendChild (el);
			CSSStyle s = el.style;
			s.position = "absolute";
			s.top = "-300px";
			s.width = "3000px";
			s.height = "100px";
			s.overflow = "scroll";
			invisibleContainer = el;
			
			el = document.createElement ("DIV");
			invisibleContainer.appendChild (el);
			el.className = "system-default";
			s = el.style;
			//s.display = "inline";
			s.whiteSpace = "nowrap";
			s.overflow = "visible";
			lineContainer = el;
			
			el = document.createElement ("DIV");
			invisibleContainer.appendChild (el);
			blockContainer = el;
		}
	}
	
	private static void resetLineContainer() {
		Element container = lineContainer;
		clearChildren(container);
		container.className = "";
		CSSStyle s = container.style;
		s.cssText = "";
		//s.display = "inline";
		s.whiteSpace = "nowrap";
		s.overflow = "visible";
	};

	private static void resetBlockContainer() {
		Element container = blockContainer;
		clearChildren(container);
		container.className = "";
		container.style.cssText = "";
	};
	
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

	/**
	 * @param handle
	 * @param text
	 * @j2sNative
	if (!((/[\r\n\t&]/g).test (text))) {
		handle.style.display = "inline";
		handle.appendChild(document.createTextNode(text));
		return ;
	}
	var lines = null;
	var c160 = String.fromCharCode (160);
	var c160x8 = c160 + c160 + c160 + c160 + c160 + c160 + c160 + c160;
	var s = text.replace (/\t/g, c160x8);
	if (splitNeedFixed) {
		try {
			lines = splitIntoLines (s);
		} catch (e) {
			//popupAlert (e.message);
		}
	} else {
		lines = s.split (/\r\n|\r|\n/g);
	}
	for (var i = 0; i < lines.length; i++) {
		if (i > 0) {
			handle.appendChild (document.createElement ("BR"));
		}
		var lineEl = document.createElement ("SPAN");
		handle.appendChild (lineEl);
		//lineEl.style.whiteSpace = "nowrap";
		if (lines[i].length == 0) {
			lines[i] = String.fromCharCode (160);
		}
		var idx = lines[i].indexOf ('&');
		var lastIndex = 0;
		while (idx != -1) {
			if (idx < lines[i].length - 1) {
				var c = lines[i].charAt (idx + 1);
				if (c == '&') {
					idx = lines[i].indexOf ('&', idx + 2);
					continue;
				} else {
					var chs = lines[i].substring (lastIndex, idx);
					if (chs.length != 0) {
						lineEl.appendChild (document.createTextNode (chs));
					}
					var el = document.createElement ("SPAN");
					lineEl.appendChild (el);
					//el.style.whiteSpace = "nowrap";
					el.appendChild (document.createTextNode (c));
					lastIndex = idx + 2;
					idx = lines[i].indexOf ('&', lastIndex);
				}
			} else {
				break;
			}
		}
		if (lastIndex == 0) {
			lineEl.appendChild (document.createTextNode (lines[i].replace (/&&/g, '&')));
		} else {
			lineEl.appendChild (document.createTextNode (lines[i]
					.substring (lastIndex, lines[i].length).replace (/&&/g, '&')));
		}
	}
	 */
	public static void insertText(Object handle, String text) {
		Element el = (Element) handle;
		el.appendChild (document.createTextNode (text));
	}
	
	private static Element setupAsPlain(String str) {
		init ();
		resetLineContainer ();
		Element c = lineContainer;
		c.className = "system-default";
		//c.appendChild (document.createTextNode (str));
		insertText(c, str);
		return c;
	}

	private static Element setupAsStyled(String str, String className, String cssText) {
		init ();
		resetLineContainer ();
		Element c = lineContainer;
		if (className != null && className.length() != 0) {
			c.className = className;
		}
		if (cssText != null && cssText.length() != 0) 
		/**
		 * @j2sNative
		 * cssText = cssText.replace (/(height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig, '');
		 * c.style.cssText = cssText;
		 */
		{
			c.style.cssText = cssText;
		}
		//c.appendChild (document.createTextNode (str));
		insertText(c, str);
		return c;
	}

	private static Element setupAsPlainWrapped(String str, int wrappedWidth) {
		init ();
		resetBlockContainer();
		Element c = blockContainer;
		c.className = "system-default";
		c.style.width = wrappedWidth + "px";
		c.style.overflow = "visible";
		c.style.whiteSpace = "normal";
		//c.appendChild (document.createTextNode (str));
		insertText(c, str);
		return c;
	}

	private static Element setupAsStyledWrapped(String str, String className, String cssText, int wrappedWidth) {
		init ();
		resetLineContainer ();
		Element c = lineContainer;
		if (className != null && className.length() != 0) {
			c.className = className;
		}
		if (cssText != null && cssText.length() != 0)
		/**
		 * @j2sNative
		 * cssText = cssText.replace (/(height|width)\s*:\s*[\+\-]?\d+(cm|mm|em|px|pt)?(\s*;|$)/ig, '');
		 * c.style.cssText = cssText;
		 */
		{
			c.style.cssText = cssText;
		}
		c.style.width = wrappedWidth + "px";
		c.style.overflow = "visible";
		c.style.whiteSpace = "normal";
		//c.appendChild (document.createTextNode (str));
		insertText(c, str);
		return c;
	}
	
	public static int getStringPlainWidth(String str) {
		Element c = setupAsPlain(str);
		return getContainerWidth (c);
	}

	public static int getStringStyledWidth(String str, String className, String cssText) {
		/**
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return 0;
		 * }
		 */ {}
		Element c = setupAsStyled(str, className, cssText);
		return getContainerWidth (c);
	}
	
	public static int getStringPlainHeight(String str) {
		Element c = setupAsPlain(str);
		return getContainerHeight(c);
	}
	
	public static int getStringPlainWrappedHeight(String str, int wrappedWidth) {
		Element c = setupAsPlainWrapped(str, wrappedWidth);
		return getContainerHeight(c);
	}

	public static int getStringStyledHeight(String str, String className, String cssText) {
		/**
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return 0;
		 * }
		 */ {}
		Element c = setupAsStyled(str, className, cssText);
		return getContainerHeight(c);
	}
	
	public static int getStringStyledWrappedHeight(String str, String className, String cssText, int wrappedWidth) {
		/**
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return 0;
		 * }
		 */ {}
		Element c = setupAsStyledWrapped(str, className, cssText, wrappedWidth);
		return getContainerHeight(c);
	}
	
	public static Point getStringPlainSize(String str) {
		Element c = setupAsPlain(str);
		return new Point(getContainerWidth(c), getContainerHeight(c));
	}

	public static Point getStringStyledSize(String str, String className, String cssText) {
		/**
		 * @j2sNative
		 * var r = /display\s*:\s*none/ig;
		 * if (r.test (cssText)) {
		 * 	return new org.eclipse.swt.graphics.Point(0, 0);
		 * }
		 */ {}
		Element c = setupAsStyled(str, className, cssText);
		return new Point(getContainerWidth(c), getContainerHeight(c));
	}
}
