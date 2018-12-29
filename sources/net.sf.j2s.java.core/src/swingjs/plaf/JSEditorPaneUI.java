package swingjs.plaf;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Insets;
import java.beans.PropertyChangeEvent;

import javax.swing.text.AbstractDocument.BranchElement;
import javax.swing.JEditorPane;
import javax.swing.JTextArea;
import javax.swing.text.AttributeSet;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;
import javax.swing.text.StyleConstants;

import javajs.util.SB;
import swingjs.JSToolkit;
import swingjs.api.js.DOMNode;

public class JSEditorPaneUI extends JSTextUI {

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			allowPaintedBackground = false;
			focusNode = enableNode = textNode = domNode = newDOMObject("div", id);
			DOMNode.setStyles(domNode, "resize", "none");
			DOMNode.setAttr(domNode, "tabindex", "0");
			$(domNode).addClass("swingjs-doc");
			setDataUI(domNode);
			if (((JTextComponent) c).isEditable())
				bindJSKeyEvents(domNode, true);
		}
		textListener.checkDocument();
		setCssFont(domNode, c.getFont());
		DOMNode.setAttr(domNode, "contentEditable", editable ? "true" : "false");
		setText(null);
		return updateDOMNodeCUI();
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		//System.out.println("JSEditorPaneUI " + prop);
		if (prop == "text") {
			getComponentText();
			return;
		}
		super.propertyChange(e);
	}

	private int epTimer;
	
	@SuppressWarnings("unused")
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {

		if (target != null) {
			// A first touch down may trigger on the wrong event target
			// and not have set up window.getSelection() yet.
			// 50-ms delay allows for multiple clicks, effecting word and line selection.
			/**
			 *
			 * @j2sNative
			 * 
			 * 			var me = this; clearTimeout(this.epTimer);this.epTimer = setTimeout(function(){me.handleJSEvent$O$I$O(null,
			 *            eventType, jQueryEvent)},50);
			 * 
			 */
			return true;
		}

		int dot = 0, mark = 0, apt = 0, fpt = 0;
		DOMNode anode = null, fnode = null;
		String atag = null, ftag = null;
		
		/**
		 * @j2sNative 
		 * 
		 * 
		 * var s = window.getSelection(); 
		 * anode = s.anchorNode; 
		 * apt = s.anchorOffset;
		 * if (anode.tagName) {
		 *   anode = anode.childNodes[apt];
		 *   apt = 0;
		 * }
		 * fnode = s.focusNode; 
		 * fpt = s.focusOffset;
		 * if (fnode.tagName) {
		 *   fnode = fnode.childNodes[fpt];
		 *   fpt = 0;
		 * }
		 */

		if (anode == null || fnode == null) {
			System.out.println("JSEditorPaneUI anode or fnode is null ");
			return false;
		}
		mark = getJSDocOffset(anode);
		dot = (anode == fnode ? mark : getJSDocOffset(fnode)) + fpt;
		mark += apt;
		
		System.out.println("==windows at " + mark + "-" + dot + "/" + apt + " " + fpt);

		/**
		 * @j2sNative jQueryEvent.target = null; jQueryEvent.selectionStart = mark;
		 *            jQueryEvent.selectionEnd = dot;
		 */
		
		return super.handleJSEvent(null, eventType, jQueryEvent);
	}

	private int getJSDocOffset(DOMNode node) {
		int pt = 0;
		while (node != domNode) {
			DOMNode sib = DOMNode.getPreviousSibling(node);
			while (sib != null) {
				 pt += getJSCharCount(sib);
				 sib = DOMNode.getPreviousSibling(sib);
			}
			node = DOMNode.getParent(node);
		}
		return pt;
	}

	private int getJSCharCount(DOMNode sib) {
		int n = 0;
		switch (/** @j2sNative sib.tagName || */"") {
		case "BR":
			return 1;
		case "DIV":
			n = 1;
			break;
		}
		
		return n + (/** @j2sNative sib.textContent && sib.textContent.length || */ 0);
	}
		
	@Override
	void setSelectionRange(int mark, int dot) {
		editor.getCaret().setDot(mark);
		editor.getCaret().moveDot(dot);
		updateDataUI();
	}

	@Override
	public void setText(String text) {
		SB sb = new SB();
		Document d = editor.getDocument();
		if (d == null)
			return;
		if (text == null)
			text = editor.getText();
		currentText = text;
		fromJava(text, sb, d.getRootElements()[0], true, null);
		//System.out.println("fromJava " + text.replace('\n', '.'));
		//System.out.println("toHTML" + sb);
		DOMNode.setAttr(domNode, "innerHTML", sb.toString());
		updateDataUI();
		@SuppressWarnings("unused")
		JSEditorPaneUI me = this;
		/**
		 * @j2sNative
		 *   
		 *   setTimeout(function(){me.setJSSelection$()},10);
		 */
		{
			setJSSelection();
		}
	}

	/**
	 * after setting text, it is necessary to update all descendents to be clickable
	 */
	private void updateDataUI() {
		DOMNode[] divs = (DOMNode[]) (Object) $(domNode).find("*");
		//System.out.println("updateDataUI " + divs.length);
		for (int i = divs.length; --i >= 0;)
			DOMNode.setAttr(divs[i], "data-ui", this);
	}

	private final static int BOLD = 1;
	private final static int ITALIC = 2;
	private final static int SUB = 4;
	private final static int SUP = 8;
	private final static int SIZE = 16;
	private final static int FACE = 32;
	private final static int FOREGROUND = 64;
	private final static int BACKGROUND = 128;
	
	private static void fromJava(String text, SB sb, Element node, boolean allowBR, AttributeSet currAttr) {
		int start = node.getStartOffset();
		int end = node.getEndOffset();
		if (end == start)
			return;
		boolean isDiv = text.charAt(end - 1) == '\n';
		//System.out.println("appendHTML " + node);
		if (isDiv && start + 1 == end) {
			if (allowBR)
				sb.append("<div><br></div>");
			return;
		}
		boolean isBranch = (node instanceof BranchElement);
		AttributeSet a = node.getAttributes();
		String style = getCSSStyle(a, currAttr);
		boolean haveStyle = (style.length() > 0);
		if (haveStyle)
			style = " style=\"" + style + "\"";
		boolean isSub = checkAttr(SUB, a, null);
		boolean isSup = !isSub && checkAttr(SUP, a, null);
		if (isSub)
			sb.append("<sub>");
		else if (isSup)
			sb.append("<sup>");
		if (isBranch) {
			sb.append(isDiv ? "<div" + style + ">": haveStyle ? "<span" + style + ">" : "");
			for (int i = 0, n = node.getElementCount(); i < n; i++) {
				fromJava(text, sb, node.getElement(i), !isDiv, a);
			}
			sb.append(isDiv ? "</div>" : haveStyle ? "</span>" : "");
		} else {
			if (haveStyle)
				sb.append("<span" + style + ">");
			sb.append(text.substring(start, isDiv ? end - 1 : end));
			if (haveStyle)
				sb.append("</span>");
		}
		if (isSup)
			sb.append("</sup>");
		else if (isSub)
			sb.append("</sub>");
	}

	private static String getCSSStyle(AttributeSet a, AttributeSet currAttr) {
		String style = "";
		if (checkAttr(BACKGROUND, a, currAttr))
			style += "background:" + JSToolkit.getCSSColor(StyleConstants.getBackground(a)) + ";";
		if (checkAttr(FOREGROUND, a, currAttr))
			style += "color:" + JSToolkit.getCSSColor(StyleConstants.getForeground(a)) + ";";
		if (checkAttr(BOLD, a, currAttr))
			style += "font-weight:" + (StyleConstants.isBold(a) ? "bold;" : "normal;");
		if (checkAttr(ITALIC, a, currAttr))
			style += "font-style:" + (StyleConstants.isItalic(a) ? "italic;" : "normal;");
		if (checkAttr(FACE, a, currAttr))
			style += "font-family:" + JSToolkit.getCSSFontFamilyName(StyleConstants.getFontFamily(a)) + ";";
		if (checkAttr(SIZE, a, currAttr))
			style += "font-size:" + StyleConstants.getFontSize(a) + "px;";
		return style;
	}

	private static boolean checkAttr(int attr, AttributeSet a, AttributeSet currAttr) {
		switch (attr) {
		case BOLD:
			return (currAttr == null || StyleConstants.isBold(a) != StyleConstants.isBold(currAttr));
		case ITALIC:
			return (currAttr == null || StyleConstants.isItalic(a) != StyleConstants.isItalic(currAttr));
		case SUB:
			return StyleConstants.isSubscript(a);
		case SUP:
			return StyleConstants.isSuperscript(a);
		case SIZE:
			return (currAttr == null || StyleConstants.getFontSize(a) != StyleConstants.getFontSize(currAttr)); 
		case FACE:
			return (currAttr == null || StyleConstants.getFontFamily(a) != StyleConstants.getFontFamily(currAttr)); 
		case FOREGROUND:
			Color f = StyleConstants.getForeground(a);
			return f != Color.none && (currAttr == null || !f.equals(StyleConstants.getForeground(currAttr))); 
		case BACKGROUND:
			Color b = StyleConstants.getBackground(a);
			return b != Color.none && (currAttr == null || !b.equals(StyleConstants.getBackground(currAttr))); 
		}
		return false;
	}

	private Insets myInsets = new Insets(0, 0, 5, 5);

	@Override
	public Insets getInsets() {
		return myInsets;
	}

	@Override
	protected Dimension getCSSAdjustment(boolean addingCSS) {
		return new Dimension(0, 0);
	}

	@Override
	protected String getPropertyPrefix() {
		return "EditablePane.";
	}
	
	
	@SuppressWarnings("unused")
	private DOMNode lastTextNode;

	/**
	 * Find the HTML node and offset for this Java caret position.
	 * 
	 * @param node domNode or one of its descendants
	 * @param off  document offset to start of this node
	 * @param pt   target caret position
	 * @return range information or length: [textNode,charOffset] or [nontextNode,charNodesOffset] or [null, nlen] 
	 */
	@Override
	protected Object[] getJSNodePt(DOMNode node, int off, int pt) {
		boolean isRoot = (off < 0);
		if (isRoot) {
			lastTextNode = null;
			off = 0;
		}
		// Must consider several cases for BR and DIV:
		// <br>
		// <div><br><div> where br counts as 1 character --> [div, 0] or [null, 1]
		// <div>.....<br><div> where childNodes[i] is br, counts as 0 charactors --> [div, i] or [null, 0]
		// as well as "raw" text in the root domNode:
		// text....<br>...text...<br>.... where br counts as 1 character --> [node.parentNode, i] or [null, 1]
		//
		// also note that range can point to a character position only if the node is #text
		// otherwise, it must point to a childNodes index in the parent node. So <br> must
		// be indicated this second way.
		
		/**
		 * @j2sNative
			var nodes = node.childNodes;
			var n = nodes.length;
			if (n == 1 && nodes[0].tagName == "BR") {
				return (pt == off ? [node, 0] : [null, 1]);
			} 
			var ipt = off;
			var nlen = 0;
			var tag = node.tagName;
			var i1 = (tag == "DIV" || tag == "P" ? 1 : 0);
			for (var i = 0; i < n; i++) {
				node = nodes[i];
				if (node.innerText) {
				  ret = this.getJSNodePt$swingjs_api_js_DOMNode$I$I(node, ipt, pt, false);
				  if (ret[0] != null) {
				  	return ret;
				  	}
				  nlen = ret[1];
				} else if (node.tagName == "BR") {
					if (ipt == pt)
					  return [node.parentNode, i];
					nlen = (isRoot ? 1 : 0);
				} else if (ipt + i1 + (nlen = (this.lastTextNode = node).length) > pt) {
					return [node, Math.max(0, pt - ipt)];	
				}
				ipt += nlen;
			}
			return (isRoot ? [this.lastTextNode, Math.max(0, ret[3] - 1)] : [null, ipt + i1 - off, node, nlen]);
		 */
		{
			return null;
		}
	}
	
	@Override
	public String getJSTextValue() {
		return getInnerTextSafely(domNode, true, null);
	}

	private static String getInnerTextSafely(DOMNode node, boolean isRoot, SB sb) {
		boolean retStr = (sb == null);
		if (sb == null)
			sb = new SB();
		String tagName = (String) DOMNode.getAttr(node, "tagName");
		if (tagName == null) {
			sb.append((String) DOMNode.getAttr(node, "data"));
		} else {
			DOMNode[] nodes = (DOMNode[]) DOMNode.getAttr(node, "childNodes");
			if (nodes.length == 1
					&& tagName == "DIV" && DOMNode.getAttr(nodes[0], "tagName") == "BR") {
				sb.append("\n");
			} else {
				for (int i = 0, n = nodes.length; i < n; i++)
					getInnerTextSafely(nodes[i], isRoot ? i == n - 1 : false, sb);
				if (!isRoot) {
					switch (tagName) {
					case "DIV":
					case "BR":
					case "P":
						sb.append("\n");
						break;
					}
				}
			}
		}
		return (retStr ? sb.toString() : null);
	}

	int timeoutID;
	
	@SuppressWarnings("unused")
	@Override
	void setTextDelayed() {
		// this timeout is critical and did not work with invokeLater
		JSTextUI u = this;
		JTextComponent t = editor;
		/** 
		 * @j2sNative
		 * 
		 *  if (this.timeoutID) {
		 *  clearTimeout(this.timeoutID);
		 *  }
		 *  this.timeoutID = setTimeout(function(){u.timeoutID = 0;u.updateDOMNode$()},50);
		 */
	}

	@Override
	protected void jsSelect(Object[] r1, Object[] r2) {
		System.out.println("jsSelect " + r1 + r2);
		// range index may be NaN
		/**
		 * @j2sNative
		 *
		 *
		 *  var range = document.createRange(); 
		 * 			  range.setStart(r1[0], r1[1] || 0);
		 *            range.setEnd(r2[0], r2[1] || 0); 
		 *            var sel = window.getSelection();
		 *            sel.removeAllRanges(); 
		 *            sel.addRange(range);
		 */
	}

}
