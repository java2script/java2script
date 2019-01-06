package swingjs.plaf;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.Point;
import java.beans.PropertyChangeEvent;

import javax.swing.text.AbstractDocument.BranchElement;
import javax.swing.text.AttributeSet;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;
import javax.swing.text.StyleConstants;

import javajs.util.SB;
import swingjs.JSToolkit;
import swingjs.api.js.DOMNode;

/**
 * Note that JEditorPane does not have a no-wrap option the way JTextArea does.
 * I think this is because the concept is that you have a standard editor pane,
 * which in most instances (Word, for example) you cannot set to wrap or not wrap.
 * In this way, JTextArea is more like NotePad (can not wrap, but doesn't allow 
 * character-specific formatting), and JTextPane is more like Word. 
 * 
 *  https://stackoverflow.com/questions/7156038/jtextpane-line-wrapping
 *
 * Note also that for getPreferredSize must return the actual unwrapped extent, 
 * regardless of wrapping. 
 * 
 * HTML5 div with contenteditable is used here. 
 * 
 * 
 * @author hansonr
 *
 */
public class JSEditorPaneUI extends JSTextViewUI {


	// https://stackoverflow.com/questions/2237497/how-to-make-the-tab-key-insert-a-tab-character-in-a-contenteditable-div	
//		$(document).on('keyup', '.editor', function(e){
//			  //detect 'tab' key
//			  if(e.keyCode == 9){
//			    //add tab
//			    document.execCommand('insertHTML', false, '&#009');
//			    //prevent focusing on next element
//			    e.preventDefault()   
//			  }
//			});

	@Override
	public DOMNode updateDOMNode() {
		System.out.println("update xxu dom");
		/**
		 * @j2sNative
		 * 
		 * xxu = this;
		 * 

		 */
//		System.out.println("updatedom " + JSUtil.getStackTrace(4));
		if (domNode == null) {
			mustWrap = true;
			domNode = newDOMObject("div", id);
			$(domNode).addClass("swingjs-doc");
			setupViewNode();
		}
		textListener.checkDocument();
		setCssFont(domNode, c.getFont());
		DOMNode.setAttr(domNode, "contentEditable", "true");
		setText(null);
		return updateDOMNodeCUI();
	} 
	 
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		System.out.println(">>>>>>>>>>>>>>>JSEditorPaneUI " + prop);
		switch(prop) {
		case "text":
			getComponentText();
			return;
		}
		super.propertyChange(e);
	}

	@SuppressWarnings("unused")
	private int epTimer;
	private String currentHTML;
		
	@SuppressWarnings("unused")
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {

		String type = (/** @j2sNative jQueryEvent.type || */"");

		if (JSToolkit.isMouseEvent(eventType)) {
			if (type == "drop") {
				// do something about that - was eventType = 402;
			}
			// let DefaultCaret handle these
			return NOT_HANDLED;
		}

		if (target != null) {
			Boolean b;
			if ((b = checkAllowKey(jQueryEvent)) != null) {
				return b.booleanValue();
			}

			// A first touch down may trigger on the wrong event target
			// and not have set up window.getSelection() yet.
			// 50-ms delay allows for multiple clicks, effecting word and line selection.
			/**
			 *
			 * @j2sNative
			 * 
			 * 			var me = this; clearTimeout(this.epTimer);this.epTimer =
			 *            setTimeout(function(){me.handleJSEvent$O$I$O(null, eventType,
			 *            jQueryEvent)},50);
			 * 
			 */
			return HANDLED;
		}

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
		System.out.println("JSEditor docoffset " + pt);
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
	public void setText(String text) {
		SB sb = new SB();
		Document d = editor.getDocument();
		if (d == null)
			return;
		if (text == null)
			text = editor.getText();
		fromJava(text, sb, d.getRootElements()[0], true, null);
		//System.out.println("fromJava " + text.replace('\n', '.'));
		//System.out.println("toHTML" + sb);
		String html = sb.toString();
		if (html == currentHTML)
			return;
		currentText = text;
		DOMNode.setAttr(domNode, "innerHTML", currentHTML = html);
		updateDataUI();
		@SuppressWarnings("unused")
		JSEditorPaneUI me = this;
		/**
		 * @j2sNative
		 *   
		 *   setTimeout(function(){me.updateJSCursor$S("text")},10);
		 */
		{
			updateJSCursor("text");
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
	
	private void fromJava(String text, SB sb, Element node, boolean allowBR, AttributeSet currAttr) {
		setEditorAttrs();
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
		//haveStyle = true; // for now
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
			String t = text.substring(start, isDiv ? end - 1 : end);
			//if (start == 0) {
			if (t.indexOf(' ') >= 0)
				for (int i = 0; i < t.length(); i++) {
					if (t.charAt(i) != ' ')
						break;
				    t = t.substring(0, i) + "&nbsp;" + t.substring(i + 1);
					i += 5;
				}
			//System.out.println("text:'" + t + "'");
			//}				
			sb.append(t);
			if (haveStyle)
				sb.append("</span>");
		}
		if (isSup)
			sb.append("</sup>");
		else if (isSub)
			sb.append("</sub>");
	}

	private String getCSSStyle(AttributeSet a, AttributeSet currAttr) {
		String style = "";
		if (checkAttr(BACKGROUND, a, currAttr))
			style += "background:" + JSToolkit.getCSSColor((Color) getBackground(a)) + ";";
		if (checkAttr(FOREGROUND, a, currAttr))
			style += "color:" + JSToolkit.getCSSColor((Color) getForeground(a)) + ";";
		if (checkAttr(BOLD, a, currAttr))
			style += "font-weight:" + (isBold(a) ? "bold;" : "normal;");
		if (checkAttr(ITALIC, a, currAttr))
			style += "font-style:" + (isItalic(a) ? "italic;" : "normal;");
		if (checkAttr(FACE, a, currAttr))
			style += "font-family:" + JSToolkit.getCSSFontFamilyName(getFontFamily(a)) + ";";
		if (checkAttr(SIZE, a, currAttr))
			style += "font-size:" + getFontSize(a) + "px;";
		return style;
	}

	String ffamily;
	int fsize;
	Color fback;
	Color ffore;
	boolean fbold, fital;
	
	private void setEditorAttrs() {
		ffamily = editor.getFont().getFamily();
		fsize = editor.getFont().getSize();
		fback = editor.getBackground();
		ffore = editor.getForeground();
		fbold = editor.getFont().isBold();
		fital = editor.getFont().isItalic();
		
	}
	
	private String getFontFamily(AttributeSet a) {
		// TODO Auto-generated method stub
		String f = (String) a.getAttribute(StyleConstants.Family);
		return (f == null ? ffamily : f);
	}

	private int getFontSize(AttributeSet a) {
		Integer f = (Integer) a.getAttribute(StyleConstants.Size);
		return (f == null ? fsize : f.intValue());
	}

	private boolean isItalic(AttributeSet a) {
		Boolean f = (Boolean) a.getAttribute(StyleConstants.Italic);
		return (f == null ? fital : f.booleanValue());
	}

	private boolean isBold(AttributeSet a) {
		Boolean f = (Boolean) a.getAttribute(StyleConstants.Bold);
		return (f == null ? fbold : f.booleanValue());
	}

	private Color getForeground(AttributeSet a) {
		Color f = (Color) a.getAttribute(StyleConstants.Foreground);
		return (f == null ? ffore : f);
	}

	private Color getBackground(AttributeSet a) {
		Color f = (Color) a.getAttribute(StyleConstants.Background);
		return (f == null ? fback : f);
	}

	private boolean checkAttr(int attr, AttributeSet a, AttributeSet currAttr) {
		switch (attr) {
		case BOLD:
			return (currAttr == null || isBold(a) != isBold(currAttr));
		case ITALIC:
			return (currAttr == null || isItalic(a) != isItalic(currAttr));
		case SUB:
			return StyleConstants.isSubscript(a);
		case SUP:
			return StyleConstants.isSuperscript(a);
		case SIZE:
			return (currAttr == null || getFontSize(a) != getFontSize(currAttr)); 
		case FACE:
			return (currAttr == null || getFontFamily(a) != getFontFamily(currAttr)); 
		case FOREGROUND:
			Color f = getForeground(a);
			return f != Color.none && (currAttr == null || !f.equals(getForeground(currAttr))); 
		case BACKGROUND:
			Color b = getBackground(a);
			return b != Color.none && (currAttr == null || !b.equals(getBackground(currAttr))); 
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
		return "EditorPane.";
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
			var tag = node.tagName;
			var n = nodes.length;
			if (tag == "BR" || n == 1 && nodes[0].tagName == "BR") {
				return (pt == off ? [node, 0] : [null, 1]);
			} 
			var ipt = off;
			var nlen = 0;
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
				} else if (ipt + (nlen = (this.lastTextNode = node).length) >= pt) {
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
		return getInnerTextSafely(domNode, false, null).toString().replace('\u00A0',' '); // &nbsp;
	}

	private static Object getInnerTextSafely(DOMNode node, boolean isLast, SB sb) {
		boolean isRoot = (sb == null);
		if (isRoot)
			sb = new SB();
		Boolean ret;
		String tagName = (String) DOMNode.getAttr(node, "tagName");
		if (tagName == null) {
			sb.append((String) DOMNode.getAttr(node, "data"));
			ret = Boolean.TRUE;
		} else {
			ret = Boolean.FALSE;
			DOMNode[] nodes = (DOMNode[]) DOMNode.getAttr(node, "childNodes");
			if (tagName == "BR" || nodes.length == 1 && DOMNode.getAttr(nodes[0], "tagName") == "BR") {
				sb.append("\n");
			} else {
				for (int i = 0, n = nodes.length; i < n; i++)
					ret = (Boolean) getInnerTextSafely(nodes[i], i == n - 1, sb);
				if ((!isRoot || isLast) && ret == Boolean.TRUE) {
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
		return (isRoot ? sb.toString() : ret);
	}

	int timeoutID;
	
	@SuppressWarnings("unused")
	@Override
	void setJSTextDelayed() {
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

	@SuppressWarnings("unused")
	@Override
	protected void jsSelect(Object[] r1, Object[] r2, boolean andScroll) {
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
		
		if (andScroll) {
			System.out.println("JSEditorPane scrolling to " + r2);
			DOMNode node = (DOMNode) r2[0];
			/**
			 * @j2sNative
			 * 
			 * if (node.scrollIntoView) {
			 *   node.scrollIntoView();
			 * } else {
			 *   node.parentElement.scrollIntoView();
			 * }
			 * 
			 */
		}
	}

	@Override
	public void updateJSCursorFromCaret() {
		updateJSCursor("default");
	}

    @SuppressWarnings("unused")
	@Override
	boolean getJSMarkAndDot(Point pt) {
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

		pt.x = mark;
		pt.y = dot;

		return true;
	}


	@Override
	void setJSMarkAndDot(int mark, int dot, boolean andScroll) {
		// key up with text change -- need to refresh data-ui attributes
		// for all childNodes and also set the java caret, which will then
		// update that in JavaScript. Mark is not used here.
		editor.getCaret().setDot(dot);
		updateDataUI();
	}


}
