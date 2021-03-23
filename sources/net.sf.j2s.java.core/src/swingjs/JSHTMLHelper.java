package swingjs;

import java.awt.event.MouseEvent;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.swing.JEditorPane;
import javax.swing.event.HyperlinkEvent;
import javax.swing.event.HyperlinkEvent.EventType;
import javax.swing.text.Element;
import javax.swing.text.Style;
import javax.swing.text.StyleContext;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLDocument.Iterator;
import javax.swing.text.html.HTMLEditorKit;
import javax.swing.text.html.StyleSheet;

import javajs.util.PT;
import swingjs.plaf.JSComponentUI;

/**
 * A class to help with HTMLEditorKit-derived JEditorPane.
 * 
 * @author hansonr
 *
 */
public class JSHTMLHelper {

	public JEditorPane editor;
	public HTMLEditorKit kit;
	public HTMLDocument doc;
	private boolean installed = true;

	public JSHTMLHelper(JEditorPane editor, HTMLEditorKit kit) {
		this.editor = editor;
		this.kit = kit;
		kit.秘jsHTMLHelper = this;
	}

	public void deinstall() {
		editor = null;
		kit = null;
		installed = false;
	}

	public void setDocument(HTMLDocument doc) {
		this.doc = doc;
		doc.秘jsHTMLHelper = this;
	}

	String html = "";

	public void setText(String html) {
		this.html = (html == null ? "" : html);
	}

	public String getText() {
		return html;
	}

	private List<Element> aTagElements;

	/**
	 * handle the mouse release from clicking a hypertext link. 
	 * 
	 * @param target
	 * @param eventType
	 * @param jQueryEvent
	 * @return true if handled
	 */
	@SuppressWarnings("unused")
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		EventType type = null;
		String href = /** @j2sNative jQueryEvent.target.href || */
				null;
		if (href == null)
			return JSComponentUI.HANDLED;
		switch (eventType) {
// these don't get registered, apparently. TODO
//		case MouseEvent.MOUSE_ENTERED:
//			type = EventType.ENTERED;
//			break;
//		case MouseEvent.MOUSE_EXITED:
//			type = EventType.EXITED;
//			break;
		case MouseEvent.MOUSE_RELEASED:
			type = EventType.ACTIVATED;
			break;
		default:
			return JSComponentUI.HANDLED;
		}
		URL url = null;
		Element elem = null;
		try {
			int pt = href.indexOf("#_JSHREF_");
			if (pt < 0) {
				System.out.println("JSHTMLHelper could not find '#_JSHREF_' in " + href);
				return true;
			}
			String left = href.substring(0, pt);
			elem = getElementFromHref(left);
			href = trimHRef(href.substring(pt + 9));
			url =  new URL(doc.getBase(), href);
		} catch (MalformedURLException e) {
			// ignore -- could be anything the developer wants.
		}
		editor.fireHyperlinkUpdate(new HyperlinkEvent(editor, type, url, href, elem));
		return true;
	}

	private String trimHRef(String href) {
		href = PT.trim(href,"'\"");
		if (href.startsWith("%22") && href.endsWith("%22"))
			href = href.substring(3, href.length() - 3);
		return href;
	}

	/**
	 * Retrieve the anchor element index 
	 * @param left
	 * @return
	 */
	private Element getElementFromHref(String left) {
		int pt = left.lastIndexOf("#_JSINDEX");
		if (pt >= 0) {
			int n = PT.parseInt(left.substring(pt + 9));
			if (n >= 0 && n < aTagElements.size())
				return aTagElements.get(n);
		}
		System.out.println("JSHTMLHelper could not find '#_JSINDEX' in " + left);
		return null;
	}

	/**
	 * Add indexing into aTagElements so that we can restore that connection for the
	 * event.
	 * 
	 * @param text
	 * @return
	 */
	public String indexAnchors(String text) {
		String html = PT.rep(text, "href=", "onclick='return false' href=#_JSINDEX_##_JSHREF_");
		Iterator iter = doc.getIterator(HTML.Tag.A);
		aTagElements = new ArrayList<Element>();
		for (int i = 0; iter.isValid(); i++) {
			aTagElements.add(iter.秘getElement());
			int pt = html.indexOf("href=#_JSINDEX_#");
			if (pt > 0)
				html = html.substring(0, pt + 14) + i + html.substring(pt + 16);
			iter.next();
		}
		return html;
	}

	/**
	 * Generic method to get information from the HTMLDocument model.
	 * @param what  "html", "css", or "styles"
	 * @param data  secondary information
	 * @return appropriate object (String or String[])
	 */
	public Object get(String what, String data) {
		switch (what) {
		case "html":
			return indexAnchors(data);
		case "css":
			return getCSS(data);
		case "styles":
			return getStyles(data);
		default:
			System.out.println("JSHTMLHelper.get what? " + what);
			return null;
		}
		
	}
	
	/**
	 * Return styles as an array of key/value pairs suitable for DOMNode.setStyles(node, []).
	 * This will just be the Java doc.getStyleSheet().getStyle("body").attributes.attributes.
	 * 
	 * @return [key,value,key,value,...]
	 */
	private String[] getStyles(String name) {
		StyleSheet sheet = doc.getStyleSheet();
		if (sheet == null)
			return null;
		Style bodyStyle = sheet.getStyle(name);
		if (bodyStyle != null) 
		{
			return( /** @j2sNative bodyStyle.attributes.attributes || */null);
		}
		return null;
	}

	/**
	 * retrieve all CSS styles not including "default" or "body" that would appear
	 * within <style></style> in Java, scoped to this id.
	 * 
	 * @param id
	 * @return CSS string
	 */
	private String getCSS(String id) {
		String css = "";
		StyleSheet sheet = doc.getStyleSheet();
		if (sheet == null)
			return null;
        Enumeration styles = sheet.getStyleNames();
        while (styles.hasMoreElements()) {
            String name = (String) styles.nextElement();
            // Don't write out the default style.
            if (!name.equals(StyleContext.DEFAULT_STYLE)
            		&& !name.equals("body")) {
            	Style s = sheet.getStyle(name);
            	css += s + "\n";
            }
        }
        return css.replaceAll("NamedStyle:", "#" + id + " ").replaceAll("=",":").replaceAll(",", ";");
	}

	public static String fixLinks(String html, URL page) {
		if (page != null && page.getProtocol().equals("file") && html.indexOf("src=\".") >= 0) {
			String rp = JSUtil.J2S.getResourcePath("", true);
			if (rp.indexOf("://") < 0)
				rp = "file:/" + rp;
			try {
				page = new URL(rp + page.getPath().substring(1));
			} catch (MalformedURLException e1) {
			}
			String[] srcs = PT.split(html, "src=\"");
			String out = srcs[0];
			for (int i = 1; i < srcs.length; i++) {
				int pt = srcs[i].indexOf('"');
				String src = srcs[i].substring(0, pt);
				try {
					if (!src.startsWith("http://") && !src.startsWith("https://"))
						src = new URL(page, src).getPath().substring(1);
				} catch (MalformedURLException e) {
				}
				out += "src=\"" + src + srcs[i].substring(pt);
			}
			html = out;
		}
		return html;
	}


}

