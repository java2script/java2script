package swingjs;

import java.awt.event.MouseEvent;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JEditorPane;
import javax.swing.event.HyperlinkEvent;
import javax.swing.event.HyperlinkEvent.EventType;
import javax.swing.text.Element;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLDocument.Iterator;
import javax.swing.text.html.HTMLEditorKit;

import javajs.util.PT;

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

	String html;

	public void setText(String html) {
		this.html = html;
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
	 * @return
	 */
	@SuppressWarnings("unused")
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		EventType type = null;
		String href = /** @j2sNative jQueryEvent.target.href || */
				null;
		if (href == null)
			return false;
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
			return false;
		}
		URL url = null;
		Element elem = null;
		try {
			int pt = href.indexOf("#_JSHREF_");
			if (pt < 0) {
				System.out.println("JSHTMLHelper could not find '#_JSREF_' in " + href);
				return true;
			}
			String left = href.substring(0, pt);
			elem = getElementFromHref(left);
			href = href.substring(pt + 9);
			url = new URL(href);
		} catch (MalformedURLException e) {
			System.out.println("JSHTMLHelper invalidURL: " + href);
		}
		editor.fireHyperlinkUpdate(new HyperlinkEvent(editor, type, url, href, elem));
		return true;
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
		System.out.println("JSHTMLHelper could not find 'href=#n' in " + left);
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
		String html = PT.rep(text, "href=", "href=#_JSINDEX_##_JSHREF_");
		Iterator iter = doc.getIterator(HTML.Tag.A);
		aTagElements = new ArrayList<Element>();
		for (int i = 0; iter.isValid(); i++) {
			aTagElements.add(iter.秘getElement());
			int pt = html.indexOf("href=#_JSINDEX_#");
			html = html.substring(0, pt + 14) + i + html.substring(pt + 16);
			iter.next();
		}
		return html;
	}

}
