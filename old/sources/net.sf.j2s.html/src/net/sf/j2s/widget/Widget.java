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

package net.sf.j2s.widget;

import net.sf.j2s.html.Element;
import net.sf.j2s.html.document;

/**
 * @j2sSuffix
 * Clazz.parseHTML = net.sf.j2s.widget.Widget.parseHTML;
 * Clazz.parseCSS = net.sf.j2s.widget.Widget.parseCSS;
 */
public abstract class Widget {

	public void setElementClass(Object el) {
		String name = getClass().getSimpleName();
		boolean prevUppercase = false;
		 int size = name.length();
		String s = "";
		for (int i = 0; i < size - 1; i++) {
			char c = name.charAt(i);
			char n = name.charAt(i + 1);
			if (i > 0 && c >= 'A' && c <= 'Z') {
				if (!prevUppercase) {
					// KeyValue, V : key-value
					// size++; // insert "-" before
					s += "-";
				} else {
					// UIName, N, n='a'
					if (n < 'A' ||  n > 'Z') {
						// size++; // ui-name
						s += "-";
					}
				}
			}
			s += c;
		}
		s += name.charAt(size - 1);
		((Element) el).className = s.toLowerCase();
	}

	private static String toHTML(String raw) {
		return raw.replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;");
	}
	
	private static String getValue(String varName, Object oThis, Object oLocal, boolean updateAssignment) {
		char c = varName.charAt(1);
		Object value = null;
		boolean needHTMLizing = true;
		if (c == '.')
		/**
		 * @j2sNative
		 * value = oThis[varName.substring(2)];
		 */ {
		} else if (c == '~')
		/**
		 * @j2sNative
		 * value = oLocal[varName.substring(2)];
		 */ {
		} else if (c == '/')
		/**
		 * @j2sNative
		 * var cThis = null;
		 * if (typeof oThis == "function") {
		 * 	cThis = oThis;
		 * } else {
		 * 	cThis = oThis.getClass();
		 * }
		 * var s = cThis.getResourceAsStream(".");
		 * var path = s.url;
		 * if (path.endsWith("/.")) {
		 * 	path = path.substring(0, path.length - 2);
		 * }
		 * value = path;
		 */ {
		} else if (updateAssignment && (c == ':' || c == '#'))
		/**
		 * @j2sNative
		 * value = "<!--" + varName + "-->";
		 * needHTMLizing = false;
		 */ {
		}
		/**
		 * @j2sNative
		 * var t = typeof value;
		 * if (t == "number" || t == "boolean") {
		 * 	value = "" + value;
		 * 	t = "string";
		 * }
		 */ {
		 }
		if (value instanceof String) {
			return !needHTMLizing || value == null ? (String) value : toHTML((String) value);
		} else if (value instanceof Widget) {
			return "<!--" + varName + "-->";
		} else {
			return null;
		}
	}
	
	/*
1. replace with local variables and object fields
2. replace field bindings
3. add fields as elements 
	 */
	public static String parseXTag(Object oThis, Object oLocal, String sources) {
		String[] buffer = new String[0];
		String key = "{$";
		int lastIndex = 0;
		int index = sources.indexOf(key, 0);
		while (index != -1) {
			int idx = sources.indexOf("}", index + key.length());
			if (idx == -1) {
				break;
			}
			String var = sources.substring(index + key.length() - 1, idx); // with prefix $
			if (var.indexOf(' ') == -1) {
				String value = getValue(var, oThis, oLocal, true);
				if (value != null) {
					buffer[buffer.length] = sources.substring(lastIndex, index);
					buffer[buffer.length] = value;
					lastIndex = idx + 1;
				}
			}
			index = sources.indexOf(key, idx + 1);
		}
		if (lastIndex == 0) {
			// no replacements
		} else {
			buffer[buffer.length] = sources.substring(lastIndex);
			/**
			 * @j2sNative
			 * sources = buffer.join("");
			 */ {}
			buffer = new String[0];
			lastIndex = 0;
		}
		key = "<!--";
		index = sources.indexOf(key, 0);
		while (index != -1) {
			int idx = sources.indexOf("-->", index + key.length());
			if (idx == -1) {
				break;
			}
			String comment = sources.substring(index + key.length(), idx).trim();
			if (comment.startsWith("$") && comment.indexOf(' ') == -1) {
				String value = getValue(comment, oThis, oLocal, false);
				if (value != null) {
					buffer[buffer.length] = sources.substring(lastIndex, index);
					buffer[buffer.length] = value;
					lastIndex = idx + 3; // "-->".length()
				}
			}
			index = sources.indexOf(key, idx + 3); // 3: "-->".length()
		}
		if (lastIndex == 0) {
			// no replacements
		} else {
			buffer[buffer.length] = sources.substring(lastIndex);
			/**
			 * @j2sNative
			 * sources = buffer.join("");
			 */ {}
			buffer = new String[0];
			lastIndex = 0;
		}
		
		key = "id";
		index = sources.indexOf(key, 0);
		while (index > 0) {
			char last = sources.charAt(index - 1);
			if (!(last == ' ' || last == '\t' || last == '\n' || last == '\r')) {
				index = sources.indexOf(key, index + key.length());
				continue;
			}
			int idxEqual = index + key.length();
			do {
				char c = sources.charAt(idxEqual);
				if (c == '=') {
					break;
				} else if (c == ' ' || c == '\t') {
					idxEqual++;
					if (idxEqual == sources.length() - 1) {
						idxEqual = -1;
						break;
					}
				} else {
					idxEqual = -1;
					break;
				}
			} while (true);
			if (idxEqual == -1 || idxEqual == sources.length() - 1) {
				break;
			}
			char quote = 0;
			int idxQuoteStart = idxEqual + 1;
			do {
				char c = sources.charAt(idxQuoteStart);
				if (c == '\'' || c == '\"') {
					quote = c;
					break;
				} else if (c == ' ' || c == '\t') {
					idxQuoteStart++;
					if (idxQuoteStart == sources.length() - 1) {
						idxQuoteStart = -1;
						break;
					}
				} else {
					idxQuoteStart = -1;
					break;
				}
			} while (true);
			if (idxQuoteStart == -1 || idxQuoteStart == sources.length() - 1) {
				break;
			}
			int idxQuoteEnd = sources.indexOf(quote, idxQuoteStart + 1);
			if (idxQuoteEnd == -1 || idxQuoteEnd == sources.length() - 1) {
				break;
			}
			int idxTagStart = sources.lastIndexOf('<', index);
			if (idxTagStart == -1 || idxTagStart < lastIndex) {
				break;
			}
			String idStr = sources.substring(idxQuoteStart + 1, idxQuoteEnd).trim();
			if (idStr.startsWith("$") && idStr.indexOf(' ') == -1 && idStr.length() >= 2 && (idStr.charAt(1) == ':' || idStr.charAt(1) == '#')) {
				buffer[buffer.length] = sources.substring(lastIndex, idxTagStart);
				buffer[buffer.length] = "<!--" + idStr + "-->";
				String html = sources.substring(idxTagStart, index).replaceAll("\\s+$", "");
				buffer[buffer.length] = html;
				if (sources.length() > idxQuoteEnd) {
					char nextChar = sources.charAt(idxQuoteEnd + 1);
					if (!(nextChar == ' ' || nextChar == '>' || nextChar == '\t'
							|| nextChar == '\n' || nextChar == '\r')) {
						buffer[buffer.length] = " ";
					}
				}
				lastIndex = idxQuoteEnd + 1; // "\"".length()
			}
			index = sources.indexOf(key, idxQuoteEnd + 1);
		}
		if (lastIndex == 0) {
			// no replacements
		} else {
			buffer[buffer.length] = sources.substring(lastIndex);
			/**
			 * @j2sNative
			 * sources = buffer.join("");
			 */ {}
			buffer = new String[0];
			lastIndex = 0;
		}
		return sources;
	}

	
	/*
	 * @j2sXHTML
<div id="$:container" class="sub-item">
	<ul>
		<li>My Name:</li>
		<li><!--$.name--></li>
	</ul>
	<!--$:nameEl--><div>Howdy!</div>
	<!--$.chatButton-->
	<!--$@--><div>Modify</div>
	<!--$:historyButton--><SidebarButton />
</div>
	 */
	public static Object parseHTML(Object el, Object oThis, Object oLocal, String html) {
		/**
		 * @j2sNative
if (arguments.length == 0) {
	return null;
}
var xhtml = arguments[arguments.length - 1];
var xLocal = null;
var xThis = null;
var xEl = null;
for (var i = arguments.length - 2; i >= 0; i--) {
	var arg = arguments[i];
	var pt = arg.constructor != null ? arg.constructor.prototype : null;
	if (pt == null) continue;
	var clazzKey = "__CLASS_NAME__";
	var elementKey = "nodeName";
	if (xThis == null && typeof arg == "function" && arg[clazzKey] != null) {
		xThis = arg;
	} else if (xLocal == null && xThis == null && pt[clazzKey] == null && arg[elementKey] == null) {
		xLocal = arg;
	} else if (xThis == null && pt[clazzKey] != null && arg[elementKey] == null) {
		xThis = arg;
	} else if (xThis == null && pt[clazzKey] != null && arg[elementKey] == null) {
		xThis = arg;
	} else if (xEl == null && pt[clazzKey] == null && arg[elementKey] != null) {
		xEl = arg;
	// } else {
	}
}
html = xhtml;
oLocal = xLocal;
oThis = xThis;
el = xEl;
		 */ {}
		String newHTML = parseXTag(oThis, oLocal, html);
		Element container = document.createElement("DIV");
		document.body.appendChild(container);
		container.innerHTML = newHTML;
		Object result = parseHTMLElments(container, oThis, oLocal);
		if (el != null) {
			while (container.childNodes.length > 0) {
				((Element) el).appendChild(container.childNodes[0]);
			}
			container.parentNode.removeChild(container);
			container = null;
		}
		return result;
	}
	
	private static Object parseHTMLElments(Object el, Object oThis, Object oLocal) {
		Element container = (Element) el;
		if (container.childNodes != null && container.childNodes.length > 0) {
			Object[] markedEls = new Object[0];
			traverseDOM(container, oThis, oLocal, markedEls);
			if (markedEls.length != 0) {
				if (markedEls.length == 1) {
					return markedEls[0];
				} else
				/**
				 * @j2sNative
				 * markedEls.reverse();
				 * return markedEls;
				 */ {
					return null;
				}
			} else {
				if (container.childNodes.length == 1) {
					return container.childNodes[0];
				} else {
					for (int i = container.childNodes.length - 1; i >= 0; i--) {
						Element node = container.childNodes[i];
						String nodeName = node.nodeName;
						if (nodeName != null && nodeName.length() > 0 && !nodeName.startsWith("#")) {
							markedEls[markedEls.length] = node;
						}
					}
					if (markedEls.length == 1) {
						return markedEls[0];
					}
					return markedEls;
				}
			}
		} else {
			return null;
		}
	}
	
	private static void traverseDOM(Object containerEl, Object oThis, Object oLocal, Object[] markedEls) {
		Element container = (Element) containerEl;
		Element next = null;
		boolean debugging = false;
		/**
		 * @j2sNative
		 * debugging = window["j2s.script.debugging"];
		 */ {}
		Element[] commentEls = new Element[0]; 
		for (int i = container.childNodes.length - 1; i >= 0; i--) {
			Element node = container.childNodes[i];
			String nodeName = node.nodeName;
			if (nodeName != null && nodeName.length() > 0 && !nodeName.startsWith("#")) {
				if (node.childNodes != null && node.childNodes.length > 0) {
					traverseDOM(node, oThis, oLocal, markedEls);
				}
			} else {
				String key = node.nodeValue;
				if (key != null && key.length() > 0 && "#comment".equals(nodeName)) {
					key = key.trim();
					if (key.length() >= 2 && key.charAt(0) == '$') {
						char c = key.charAt(1);
						if (c == '.' || c == '~') {
							// insert given element before next element
							Object f = null;
							if (c == '.')
							/**
							 * @j2sNative
							 * f = oThis[key.substring(2)];
							 */ { f = (Element) oThis; }
							else // ~ : local variable 
							/**
							 * @j2sNative
							 * f = oLocal[key.substring(2)];
							 */ { f = (Element) oThis; }
							if (f instanceof Widget) {
								if (next == null) {
									((Widget) f).createContent(node.parentNode);
								} else {
									int length = container.childNodes.length;
									Element[] siblings = new Element[length - (i + 1)];
									int idx = 0;
									for (int j = length - 1; j > i; j--) {
										Element item = container.childNodes[j];
										siblings[idx] = item;
										idx++;
										node.parentNode.removeChild(item);
									}
									((Widget) f).createContent(node.parentNode);
									for (int j = siblings.length - 1; j >= 0; j--) {
										node.parentNode.appendChild(siblings[j]);
									}
								}
							}
						} else if (c == ':') {
							// assign next element to given
							if (next != null)
							/**
							 * @j2sNative
							 * oThis[key.substring(2)]  = next;
							 */ {
							}
						} else if (c == '#') {
							if (next != null)
							/**
							 * @j2sNative
							 * markedEls[markedEls.length] = next;
							 */ {
							}
						}
						if (!debugging) {
							commentEls[commentEls.length] = node;
						}
					}
				}
			}
			next = node;
		}
		if (!debugging && commentEls.length > 0) {
			for (int j = 0; j < commentEls.length; j++) {
				Element item = commentEls[j];
				item.parentNode.removeChild(item);
			}
		}
	}
	
	/*
	 * @j2sXCSS
.container {
	width:320px;
}
	 */
	public static void parseCSS(Object oThis, Object oLocal, String css) {
		/**
		 * @j2sNative
if (arguments.length == 0) {
	return null;
}
var xcss = arguments[arguments.length - 1];
var xLocal = null;
var xThis = null;
for (var i = arguments.length - 2; i >= 0; i--) {
	var arg = arguments[i];
	var pt = arg.constructor != null ? arg.constructor.prototype : null;
	if (pt == null) continue;
	var clazzKey = "__CLASS_NAME__";
	var elementKey = "nodeName";
	if (xThis == null && typeof arg == "function" && arg[clazzKey] != null) {
		xThis = arg;
	} else if (xLocal == null && xThis == null && pt[clazzKey] == null && arg[elementKey] == null) {
		xLocal = arg;
	} else if (xThis == null && pt[clazzKey] != null && arg[elementKey] == null) {
		xThis = arg;
	} else if (xThis == null && pt[clazzKey] != null && arg[elementKey] == null) {
		xThis = arg;
	// } else {
	}
}
css = xcss;
oLocal = xLocal;
oThis = xThis;
		 */ {}
		if (css != null) {
			addCSS(parseXTag(oThis, oLocal, css));
		}
	}

	/**
	 * Insert given css into DOM.
	 * 
	 * @param cssText
	 * @j2sNative
if (document.createStyleSheet != null) {
	// Internet Explorer does not support loading dynamic css styles
	// by creating <STYLE> element!
	var sheet = null;
	try {
		sheet = document.createStyleSheet ();
		sheet.cssText = cssText;
	} catch (e) {
		//sheet = document.styleSheets[document.styleSheets.length - 1];
		var min = 0;
		var idx = 0;
		for (var i = 0; i < document.styleSheets.length; i++) {
			var style = document.styleSheets[i];
			if (min == 0) {
				min = style.cssText.length;
				idx = i;
			} else if (min > style.cssText.length) {
				min = style.cssText.length;
				idx = i;
			}
		}
		sheet = document.styleSheets[idx];
		sheet.cssText += "\r\n" + cssText;
	}
} else {
	var cssStyle = document.createElement ("STYLE");
	cssStyle.appendChild (document.createTextNode (cssText));
	document.getElementsByTagName ("HEAD")[0].appendChild (cssStyle);
}
	 */
	public static void addCSS(String cssText) {
	}

	public abstract Element createContent(Object el);
	
	public void dispose() {
		
	}
	
}
