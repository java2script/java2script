package swingjs.plaf;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.KeyEvent;
import java.beans.PropertyChangeEvent;

import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JEditorPane;
import javax.swing.event.CaretEvent;
import javax.swing.plaf.InputMapUIResource;
import javax.swing.text.AbstractDocument.BranchElement;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Caret;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;
import javax.swing.text.Keymap;
import javax.swing.text.StyleConstants;

import javajs.util.PT;
import javajs.util.SB;
import sun.swing.DefaultLookup;
import swingjs.JSKeyEvent;
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

	private static final String JSTAB = "<span class='j2stab'>&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	private static final int SPACES_PER_TAB = 4;

	public JSEditorPaneUI() {
		isEditorPane = true;
		// turning this off: setDoPropagate();
	}
	
	
//	@Override
//	protected InputMap getSharedMap() { 
//		return 	(InputMap) DefaultLookup.get(editor, this, getPropertyPrefix() + ".focusInputMap");
//	}

	@Override
	protected void installKeyboardActions() {
		editor.setKeymap(createKeymap());
		super.installKeyboardActions();
	}

	/**
	 * Creates the keymap to use for the text component, and installs any necessary
	 * bindings into it. By default, the keymap is shared between all instances of
	 * this type of TextUI. The keymap has the name defined by the getKeymapName
	 * method. If the keymap is not found, then DEFAULT_KEYMAP from JTextComponent
	 * is used.
	 * <p>
	 * The set of bindings used to create the keymap is fetched from the UIManager
	 * using a key formed by combining the {@link #getPropertyPrefix} method and the
	 * string <code>.keyBindings</code>. The type is expected to be
	 * <code>JTextComponent.KeyBinding[]</code>.
	 *
	 * @return the keymap
	 * @see #getKeymapName
	 * @see javax.swing.text.JTextComponent
	 */
	protected Keymap createKeymap() {
		String nm = getKeymapName();
		Keymap map = JTextComponent.getKeymap(nm);
		if (map == null) {
			Keymap parent = JTextComponent.getKeymap(JTextComponent.DEFAULT_KEYMAP);
			map = JTextComponent.addKeymap(nm, parent);
			String prefix = getPropertyPrefix();
			Object o = DefaultLookup.get(editor, this, prefix + ".keyBindings");
			if ((o != null) && (o instanceof JTextComponent.KeyBinding[])) {
				JTextComponent.KeyBinding[] bindings = (JTextComponent.KeyBinding[]) o;
				JTextComponent.loadKeymap(map, bindings, getComponent().getActions());
			}
		}
		return map;
	}

	/**
	 * Fetches the name of the keymap that will be installed/used by default for
	 * this UI. This is implemented to create a name based upon the classname. The
	 * name is the the name of the class with the package prefix removed.
	 *
	 * @return the name
	 */
	protected String getKeymapName() {
		String nm = getClass().getName();
		int index = nm.lastIndexOf('.');
		if (index >= 0) {
			nm = nm.substring(index + 1, nm.length());
		}
		return nm;
	}

	@Override
	InputMap getInputMap() {
		InputMap map = new InputMapUIResource();
        InputMap shared =
            (InputMap)DefaultLookup.get(editor, this,
            getPropertyPrefix() + ".focusInputMap");
        if (shared != null) {
        	//System.out.println("JSEditorPaneUI inputmap " + shared.keys());
            map.setParent(shared);
        }
		return map;
	}


//	@Override
//	ActionMap createActionMap() {
//		ActionMap map = new ActionMapUIResource();
//		Action[] actions = getEditorKit(editor).getActions();
//		// System.out.println("building map for UI: " + getPropertyPrefix());
//		int n = (actions == null ? 0 : actions.length);
//		for (int i = 0; i < n; i++) {
//			Action a = actions[i];
//			map.put(a.getValue(Action.NAME), a);
//			//System.out.println("  " + a.getValue(Action.NAME));
//		}
//		// map.put(TransferHandler.getCutAction().getValue(Action.NAME),
//		// TransferHandler.getCutAction());
//		// map.put(TransferHandler.getCopyAction().getValue(Action.NAME),
//		// TransferHandler.getCopyAction());
//		// map.put(TransferHandler.getPasteAction().getValue(Action.NAME),
//		// TransferHandler.getPasteAction());
//		return map;
//	}
	
	
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
//		System.out.println("update xxu dom");
//		/**
//		 * @j2sNative
//		 * 
//		 * xxu = this;
//		 * 
//
//		 */
		if (domNode == null) {
			mustWrap = true;
			domNode = newDOMObject("div", id);
			DOMNode.setStyles(domNode); // default for pre is font-height
			$(domNode).addClass("swingjs-doc");
			setupViewNode();
		}
		textListener.checkDocument();
		setCssFont(domNode, c.getFont());
		DOMNode.setAttr(domNode, "contentEditable", TRUE);
		setText(null);
		return updateDOMNodeCUI();
	} 

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		//System.out.println("JSEPUI prop " + prop);
		switch(prop) {
		case "text":
			setCurrentText();
			return;
		}
		super.propertyChange(e);
	}

	@SuppressWarnings("unused")
	private String currentHTML;
	


	
//	private int epTimer;
//	@Override
//	protected void handleJSTextEvent(int eventType, Object jQueryEvent, int keyCode, boolean trigger) {
//		if (!trigger && isNavigationKey(keyCode)) {
//
//			// A first touch down may trigger on the wrong event target
//			// and not have set up window.getSelection() yet.
//			// 50-ms delay allows for multiple clicks, effecting word and line selection.
//			/**
//			 *
//			 * @j2sNative
//			 * 
//			 * 			var me = this; clearTimeout(this.epTimer);this.epTimer =
//			 *            setTimeout(function(){me.handleJSTextEvent$I$O$Z(eventType,
//			 *            jQueryEvent, true)},50);
//			 * 
//			 */
//			return;
//		} 
//		super.handleJSTextEvent(eventType, jQueryEvent, keyCode, true);
//	}


//	@Override
//	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
//
//		if (JSToolkit.isMouseEvent(eventType)) {
//			return NOT_HANDLED;
//		}
//		if (target != null) {
//			Boolean b = checkAllowKey(jQueryEvent);
//			if (b != null)
//				return b.booleanValue();
//
//			// A first touch down may trigger on the wrong event target
//			// and not have set up window.getSelection() yet.
//			// 50-ms delay allows for multiple clicks, effecting word and line selection.
//			/**
//			 *
//			 * @j2sNative
//			 * 
//			 * 			var me = this; clearTimeout(this.epTimer);this.epTimer =
//			 *            setTimeout(function(){me.handleJSEvent$O$I$O(null, eventType,
//			 *            jQueryEvent)},50);
//			 * 
//			 */
//			return HANDLED;
//		}
//
//		return super.handleJSEvent(null, eventType, jQueryEvent);
//	}
//
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
		//System.out.println("JSEditor docoffset " + pt);
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
		case "SPAN":
			if (isJSTAB(sib))
				return 1;
			break;
		}
		
		return n + (/** @j2sNative sib.textContent && sib.textContent.length || */ 0);
	}
		
//	@Override
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
		text = fixText(currentText = text);
		DOMNode.setAttr(domNode, "innerHTML", currentHTML = html);
		updateDataUI();
		@SuppressWarnings("unused")
		JSEditorPaneUI me = this;
		/**
		 * @j2sNative
		 *   
		 *   setTimeout(function(){me.updateJSCursor$S("editortext")},10);
		 */
		{
			updateJSCursor("editortext");
		}
	}

	/**
	 * after setting text, it is necessary to update all descendents to be clickable
	 */
	private void updateDataUI() {
		DOMNode[] divs = (DOMNode[]) (Object) $(domNode).find("*");
		//System.out.println("updateDataUI " + divs.length);
		for (int i = divs.length; --i >= 0;)
			setDataUI(divs[i]);
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
			if (t.indexOf(' ') >= 0)
				t = t.replace(' ', '\u00A0');
			if (t.indexOf('\t') >= 0) {
				t = PT.rep(t,  "\t", JSTAB);
			}
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

	@Override
	protected Dimension getCSSAdjustment(boolean addingCSS) {
		return new Dimension(0, 0);
	}

	@Override
	protected String getPropertyPrefix() {
		return "EditorPane";
	}
	
	
	@SuppressWarnings("unused")
	private Object[] lastRange;

	/**
	 * Find the HTML node and offset for this Java caret position.
	 * 
	 * @param node domNode or one of its descendants
	 * @param off  document offset to start of this node
	 * @param pt   target caret position
	 * @return range information or length: [textNode,charOffset] or [nontextNode,charNodesOffset] or [null, nlen] 
	 */
	@SuppressWarnings("unused")
	@Override
	protected Object[] getJSNodePt(DOMNode node, int off, int pt) {
		// JavaScript 
		boolean isRoot = (off < 0);
		if (isRoot) {
			lastRange = null;
			off = 0;
		} 
		
		//System.out.println("getting JSNodePt for " + off + "." + pt + " " + (/**node.data||node.outerHTML ||*/""));
		
		boolean isTAB = isJSTAB(node);
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
		//
		// TAB will be indicated as a JSTAB string (see above).

		/**
		 * @j2sNative
		 * 
		    this.lastRange = [node, 0];
			var nodes = node.childNodes;
			var tag = node.tagName;
			var n = nodes.length;
			if (tag == "BR" || n == 1 && nodes[0].tagName == "BR") {
				return (pt == off ? [node, 0] : [null, 1, null, 0, 0]);
			} 
			var ipt = off;
			var nlen = 0;
			var i1 = (tag == "DIV" || tag == "P" ? 1 : 0);
			var ptIncr = 0;
			for (var i = 0; i < n; i++) {
				node = nodes[i];
				if (node.innerText) {
				  ret = this.getJSNodePt$swingjs_api_js_DOMNode$I$I(node, ipt, pt); 
				  if (ret[0] != null) {
				  	return ret;
				  }
				  nlen = ret[1];
				  pt += ret[4];
				} else if (node.tagName == "BR") {
					if (ipt == pt)
					  return [node.parentNode, i];
					nlen = (isRoot ? 1 : 0);
				} else {
					nlen = node.length;
					var p = ipt + (isTAB ? 1 : nlen);
					if (p >= pt)
						return this.lastRange = [node, Math.max(0, !isTAB ? pt - ipt : p == pt ? nlen : 0)];
					this.lastRange = [node, node.length];
					if (isTAB)
						ptIncr = nlen - 1;
				}
				ipt += nlen;
			}
			if (!isRoot)
			  return [null, ipt + i1 - off, node, nlen, ptIncr];
			var r = this.lastRange;
			this.lastRange = null;
			return r;
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
			} else if (tagName == "SPAN" && isJSTAB(node)) {
					sb.append("\t");
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

	private static boolean isJSTAB(Object node) {
		return node != null 
				&& (/** @j2sNative node.nodeType != 3 && ("" + node.class).indexOf("j2stab") >= 0 && */true);
	}

	
	/**
	 * no backward selections in a div with contentEditable TRUE
	 */
	@Override
	protected void setJSSelection(int mark, int dot, boolean andScroll) {
		super.setJSSelection(Math.min(mark,  dot), Math.max(mark,  dot), andScroll);
	}

	@SuppressWarnings("unused")
	@Override
	protected void jsSelect(Object[] r1, Object[] r2, boolean andScroll) {
		fixTabRange(r1);
		if (r1 != r2)
			fixTabRange(r2);
		
		andScroll |= (jc.秘keyAction != null);
			
			
		
		//System.out.println("jsSelect " + r1 + r2);
		// range index may be NaN
		/**
		 * @j2sNative
		 *
		 *
		 *  var range = document.createRange(); 
		 * 			  range.setStart(r1[0], r1[1] || 0);
		 *            range.setEnd(r2[0], r2[1] || 0); 
		 *            
		 *            
		 *            var sel = window.getSelection();
		 *            sel.removeAllRanges(); 
		 *            sel.addRange(range);
		 */
		
		if (andScroll) {	
			scrollAsNeeded(r2[0]);
		} 
	}

	@SuppressWarnings("unused")
	private void scrollAsNeeded(Object node) {
		// System.out.println("JSEditorPane scrolling to " + r2);
		/**
		 * @j2sNative
		 * 
		 * 
		 * 			var h = 0; node.getBoundingClientRect || 
		 * 
		 * (node =  node.parentElement);
		 *            //
		 *            var od = $(this.domNode).offset();
		 *            var on = $(node).offset();
		 *            var hn = $(node).height();
		 *            var hd = $(this.domNode).height();
		 *             
		 *            //
		 *            var top =       this.domNode.scrollTop; 
		 *            
		 *            var off = on.top + top -od.top;
		 *            
		 *            //xxe = this.domNode;
		 *            
		 *            
	
		 *            ///System.out.println([node.innerText,"top",top, "[",off |0, (off+hn)|0, "]bottom",(top+hd)|0]);
		 *            
		 *            
		 *            if (off < top) {
		 *            //
		 *            this.domNode.scrollTop = off; 
		 *            //
		 *            } else if (off+ hn + 20 > top + hd) {
		 *            //
		 *            		this.domNode.scrollTop = off + hn - hd +20; 
		 *            //
		 *            }
		 *            
		 *            
		 *                 var top =       this.domNode.scrollTop; 
		 *            
	
		 *            //System.out.println([node.innerText,"top",top, "[",off |0, (off+hn)|0, "]bottom",(top+hd)|0]);
	
		 */
		
	}


	private void scrollIntoView() {
		this.setJSSelection(editor.getCaret().getMark(), editor.getCaret().getDot(), true);
	}

	/**
	 * @param r
	 */
	private void fixTabRange(Object[] r) {
		DOMNode node = (DOMNode)r[0];
		boolean isStart = (/** @j2sNative r[1] || */0) == 0;
		if (isJSTAB(node)) {
			if (isStart) {
				
			} else {
				
			}
			
		}
	}

	@Override
	public void caretUpdatedByProgram(CaretEvent e) {
		//System.out.println("caret update" + editor.getCaretPosition());
		updateJSCursor("noscroll");
	}


	@SuppressWarnings("unused")
	@Override
	boolean getJSMarkAndDot(Point pt, int keycode) {
		int dot = 0, mark = 0, apt = 0, fpt = 0;
		DOMNode anode = null, fnode = null, apar = null, fpar = null;
		String atag = null, ftag = null;
		int alen = 0, flen = 0;

		boolean toEnd = (keycode == KeyEvent.VK_RIGHT || keycode == KeyEvent.VK_KP_RIGHT);
		boolean toStart = (keycode == KeyEvent.VK_LEFT || keycode == KeyEvent.VK_KP_LEFT);
		/**
		 * @j2sNative
		 * 
		 * 
		 * 			var s = window.getSelection(); anode = s.anchorNode; apt =
		 *            s.anchorOffset; if (anode.tagName) { anode =
		 *            anode.childNodes[apt]; apt = 0; } else { alen = anode.length; apar
		 *            = anode.parentElement; } fnode = s.focusNode; fpt = s.focusOffset;
		 *            if (fnode.tagName) { fnode = fnode.childNodes[fpt]; fpt = 0; }
		 *            else { flen = fnode.length; fpar = fnode.parentElement; }
		 */

		if (anode == null || fnode == null) {
			System.out.println("JSEditorPaneUI anode or fnode is null ");
			return false;
		}
		boolean isAInTab = (alen == SPACES_PER_TAB && apt != 0 && isJSTAB(apar));
		boolean isFInTab = (flen == SPACES_PER_TAB && fpt != 0 && isJSTAB(fpar));
		boolean updateJS = false;
		if (isAInTab)
			apt = (apt == SPACES_PER_TAB || (updateJS = toEnd) ? 1 : 0);
		if (isFInTab)
			fpt = (fpt == SPACES_PER_TAB || (updateJS = toEnd) ? 1 : 0);
		if (toStart && (isAInTab && apt == 0 || isFInTab && fpt == 0))
			updateJS = true;
		mark = getJSDocOffset(anode);
		dot = (anode == fnode ? mark : getJSDocOffset(fnode)) + fpt;
		mark += apt;
//		System.out.println("==windows at " + mark + "-" + dot + "/" + apt + " " + fpt + " " + isAInTab + " " + isFInTab);
		pt.x = mark;
		pt.y = dot;

		if (updateJS)
			setJSSelection(mark, dot, false);
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
	
	@Override
	public boolean isFocusable() {
		return false;
	}

	
	@Override
	public void action(String what, int data) {
		int p = -1;
		switch (what) {
		case "paste":
			setText(null);
			break;
		case "delete":
			// data -1 for prev, +1 for next, 0 for just cut
			try {
				Document doc = editor.getDocument();
				Caret caret = editor.getCaret();
				int dot = caret.getDot();
				int mark = caret.getMark();
				p = Math.min(dot, mark);
				if (dot != mark) {
					doc.remove(p, Math.abs(dot - mark));
				} else {
					int len = doc.getLength();
					if (data < 0 && dot == 0 || data > 0 && dot == len || data == 0)
						return;
					int delChars = 1;
					if (data < 0)
						dot -= 2;					
					if (dot > 1 && dot < len - 1) {
						String dotChars = doc.getText(dot, 2);
						char c0 = dotChars.charAt(0);
						char c1 = dotChars.charAt(1);

						if (c0 >= '\uD800' && c0 <= '\uDBFF' && c1 >= '\uDC00' && c1 <= '\uDFFF') {
							delChars = 2;
						}
					}
					if (data < 0) {
						if (delChars == 1)
							dot++;
						p = dot;
					}
					//System.out.println("removing char at " + dot);
					doc.remove(dot, delChars);
				}
			} catch (BadLocationException bl) {
			}
			break;
		}
		if (p >= 0) {
			setText(null);
			setJSMarkAndDot(p, p, false);
		}
	}

	@Override
	protected boolean handleTab(Object jqEvent) {
		replaceText("\t", -1);
		return CONSUMED;
	}

	private void replaceText(String s, int x) {
		try {
			if (x < 0) {
				int[] xy = getJavaMarkAndDot();
				x = xy[0];
				editor.getDocument().remove(x, xy[1] - x);
			}
			if (s != null)
				editor.getDocument().insertString(x, s, null);
		} catch (BadLocationException e) {
		}
	}

	private int[] getJavaMarkAndDot() {
		int x = editor.getCaret().getMark();
		int y = editor.getCaret().getDot();
		return new int[] { Math.min(x,  y), Math.max(x,  y) };
	}

	private int len0;
	
	/**
	 * CTRL-V insertion requires knowledge of the text length at the time of keypress and 
	 * then comparing that to the value at the time of keyup. Hopefully no repeating!
	 * 
	 */
	@Override
	protected void handleFutureInsert(boolean trigger) {
		if (!trigger) {
			len0 = ((String) DOMNode.getAttr(domNode, "innerText")).length();
			return;
		}
		String newText = (String) DOMNode.getAttr(domNode, "innerText");
		int[] xy = getJavaMarkAndDot();
		int x = xy[0];
		int n = (newText.length() - len0) + (xy[1] - x);
		if (n <= 0)
			return;
		try {
			x += (SPACES_PER_TAB - 1) * tabCount(editor.getDocument().getText(0, x));
			if (x < 0)
				return;
			String s = newText.substring(x, x + n);
			getJSMarkAndDot(markDot, 0);
			replaceText(s, -1);
			setJSMarkAndDot(markDot.x, markDot.x, false);
		} catch (BadLocationException bl) {
		}
	}
	
	private int tabCount(String s) {
		int n = 0;
		for (int i = s.length(); --i >= 0;)
			if (s.charAt(i) == '\t')
				n++;
		return n;
	}

//	protected boolean handleEnter() {
//		editor.replaceSelection("\n");
//		return true;
//	}
	
	@Override
	void setJSText() {
		updateDOMNode();
//		System.out.println("JSEPUI iskeyaction " + (jc.秘keyAction != null) + "dot=" + dot + " len=" + editor.getDocument().getLength() 
//				+ "\nEDITOR: >>" + PT.esc(editor.getText()) + "<<" 
//				+ "\nJAVASC: >>" + PT.esc((String)DOMNode.getAttr(domNode, "innerText")) + "<<"
//		        + "\nJSHTML: >>" + PT.esc((String)DOMNode.getAttr(domNode, "innerHTML")) + "<<\n");
//		for (int i = 0, len = editor.getCaretPosition(); i < len; i++)
//			try {
//				System.out.println("Ed[" + i + "]=" + editor.getDocument().getText(i, 1).codePointAt(0));
//			} catch (BadLocationException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
	}

	
	boolean isPressConsumed;
	
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		Boolean b = checkAllowEvent(jQueryEvent);
		if (b != null)
			return b;
		switch (eventType) {
		default:
			return NOT_HANDLED;
		case SOME_KEY_EVENT:
			JSKeyEvent.dispatchKeyEvent(jc, 0, jQueryEvent, System.currentTimeMillis());
			/**
			 * @j2sNative
			 * 
			 * 			jQueryEvent.preventDefault(); 
			 * 			jQueryEvent.stopPropagation();
			 */
			return HANDLED;
		}
	}

}
