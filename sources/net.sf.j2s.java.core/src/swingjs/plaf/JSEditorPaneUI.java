package swingjs.plaf;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Insets;
import java.awt.JSComponent;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.beans.PropertyChangeEvent;
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JEditorPane;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.border.Border;
import javax.swing.event.CaretEvent;
import javax.swing.plaf.InputMapUIResource;
import javax.swing.plaf.UIResource;
import javax.swing.text.AbstractDocument.BranchElement;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Caret;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;
import javax.swing.text.Keymap;
import javax.swing.text.Position;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyledDocument;
import javax.swing.text.StyledEditorKit;
import javax.swing.text.View;

import javajs.util.PT;
import javajs.util.SB;
import sun.swing.DefaultLookup;
import swingjs.JSToolkit;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject.JQEvent;
import swingjs.api.js.JSFunction;

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
public class JSEditorPaneUI extends JSTextUI implements KeyListener {

	
	// For the most part, this is working fine.  CTRL-C works, but CTRL-V does not.
	// (See TextUI where I have disabled that)
	// TODO -- should try this all without <div> and just use <span> and <br>. 
	// DIV is adding \n before and after itself. 
	// differences with StyledDocument and PlainDocument. 
	//Shouldn't be this hard!
	// unfortunately, different browsers handle contentEditable differently.
	
	
	private static final String JSTAB = "<span class=\"j2stab\">\u00a0\u00a0\u00a0\u00a0</span>";
	private static final String JSTAB2 = "<span class=\"j2stab data-ui\">\u00a0\u00a0\u00a0\u00a0</span>";
	private static final int SPACES_PER_TAB = 4;
	
	protected boolean isTextPane = false;
	
	protected boolean isHtmlKit = false;
	private String jsPasteText, jsPasteHTML;

	public JSEditorPaneUI() {
		isEditorPane = isTextView = true;
	}
	
	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = newDOMObject("div", id);
			DOMNode.setStyles(domNode); // default for pre is font-height
			$(domNode).addClass("swingjs-doc");
			allowPaintedBackground = false;
			focusNode = enableNode = textNode = domNode;
			DOMNode.setStyles(domNode, "resize", "none", "margin", "0px", "padding", "1px", "box-sizing", "border-box");
			bindJSKeyEvents(focusNode, true);
			JSEditorPaneUI me = this;
			$(domNode).on("paste", /** @j2sNative function(e){ return me.handleJSPasteEvent(e.originalEvent,e)} || */null);
		}
		textListener.checkDocument();
		Font font = c.getFont();
		boolean fontChanged = !font.equals(myfont);
		if (fontChanged)
			setCssFont(domNode, font);// will check enabled and also set background
		DOMNode.setAttrs(domNode, "contentEditable", isHtmlKit || editor.isEditable() ? TRUE : FALSE, "spellcheck",
				FALSE);
		if (jc.getTopLevelAncestor() != null) {
			if (fontChanged || editor.getText() != mytext) {
				myfont = font;
				setText(null);
				// should be OK here
//			} else {
//			    System.out.println(JSUtil.getStackTrace(10));
//				System.out.println("updateDomnode");
			}
		}
		return updateDOMNodeCUI();
	} 
	
	@Override
	public void installUI(JComponent jc) {
		super.installUI(jc);
		if (getPropertyPrefix() == "TextPane")
			return;
		editor.addKeyListener(this);
        Document doc = editor.getDocument();
        if (doc == null) {
            // no model, create a default one.  This will
            // fire a notification to the updateHandler
            // which takes care of the rest.
            editor.setDocument(getEditorKit(editor).createDefaultDocument());
        } else {
//            doc.addDocumentListener(updateHandler);
//            modelChanged();
        }
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
	@Override
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
	

	Font myfont;
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
	protected void setBorder(String prefix) {
		 Border b = editor.getBorder();
		 if ((b == null) || (b instanceof UIResource)) {
		 editor.setBorder(UIManager.getBorder(prefix + ".border"));
		 }		
	}
	
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		//System.out.println("JSEPUI prop " + prop);
		switch(prop) {
		case "editorKit":
			isHtmlKit = (editor.秘jsHTMLHelper != null);
			return;
		case "text":
			setCurrentText();
			return;
		}
		super.propertyChange(e);
	}

	@SuppressWarnings("unused")
	private String currentHTML;
	private boolean isStyled;
	private String mytext;
	private DOMNode bodyNode;
	private String rawHTML;
	
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
		while (node != domNode && node != null) {
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
		
	@Override
	public void dispose() {
		super.dispose();
		mytext = currentHTML = null;
	}

//	@Override
	public void setText(String text) {

///**@j2sNative xxu= this;*/

		Document d = editor.getDocument();
		if (d == null)
			return;
		String html;
		if (text == null)
			text = editor.getText();
		if (isHtmlKit) {
			mytext = html = text;
			isHTML = true;
			DOMNode.setAttr(domNode, "innerHTML", "");
			// we will have to figure out a way for images and base.
			html = (String) editor.秘jsHTMLHelper.get("html", getInner(text, "body"));
			DOMNode.setAttrs(domNode, "contentEditable", TRUE);
			bodyNode = DOMNode.createElement("div", id0 + "_body");
			domNode.appendChild(bodyNode);
			String[] styles = (String[]) editor.秘jsHTMLHelper.get("styles", "body");
			if (styles != null)
				DOMNode.setStyles(bodyNode, styles);
			String css = (String) editor.秘jsHTMLHelper.get("css", id);
			setStyle(id0 + "_styles", css);
		} else {
			bodyNode = domNode;
			mytext = text;
			isHTML = text.startsWith("<html");
			if (isHTML) {
				DOMNode.setAttrs(domNode, "contentEditable", FALSE);
				html = getInner(text, "body");
			} else {
				SB sb = new SB();
				isStyled = ((JEditorPane) editor).getEditorKit() instanceof StyledEditorKit;
				fromJava(text, sb, d.getRootElements()[0], true, null);
//				System.out.println("JSEPUI setText\n" + dumpText(text) + "\n" + dumpText(sb.toString()));
				// This added 5 px is necessary for the last line when scrolled to appear in
				// full.
				// Don't know why. Maybe the scrollbar just needs one last div?
				html = sb.toString();// + "<div style='height:5px'><br></div>";
			}
		}
		if (isHTML) {
			setBackgroundDOM(domNode, jc.getBackground());
			if (html.equals(rawHTML))
				return;
			rawHTML = html;
			html = fixText(html);
			if (isHtmlKit) {
				URL page = (URL) editor.getDocument().getProperty("stream");
				if (page != null && page.getProtocol().equals("file") && text.indexOf("src=\".") >= 0) {
					String rp = J2S.getResourcePath("", true);
					if (rp.indexOf("://") < 0)
						rp = "file:/" + rp;
					try {
						page = new URL(rp + page.getPath().substring(1));
					} catch (MalformedURLException e1) {
					}
					String[] srcs = PT.split(text, "src=\".");
					String out = srcs[0];
					for (int i = 1; i < srcs.length; i++) {
						int pt = srcs[i].indexOf('"');
						String src = "." + srcs[i].substring(0, pt);
						try {
							src = new URL(page, src).getPath().substring(1);
						} catch (MalformedURLException e) {
						}
						out += "src=\"" +src+ srcs[i].substring(pt);
					}
					html = out;
				}
			}
		}
		// System.out.println(html);
		if (html == currentHTML)
			return;
		// had text = fixText(currentText = text) here, but result was never used
		currentText = text;
		DOMNode.setAttr(bodyNode, "innerHTML", currentHTML = html);
		updateDataUI();
		JSToolkit.dispatch(updateRunnable, 10, 0);
	}
	
	String dumpText(String text) {
		text = text.replace('\n', '.').replace('\t', '^')
				.replace(' ', '~').replace('\u00a0', '-').substring(text.indexOf(">") + 1);
		return text;
	}


	private Runnable updateRunnable = new Runnable() {

		@Override
		public void run() {
			updateJSCursor("editortext");
			scrollAsNeeded(null);
		}
		
	};
	
	private void setStyle(String id, String css) {
		DOMNode d = DOMNode.getElement(id);
		if (d == null) {
			$(body).append("<style id=" + id +">" + css + "</style>");
		} else {
			// If I use innerText here, then \n gets turned into <br>
			DOMNode.setAttr(d, "innerHTML", css);
		}
	}

	private String getInner(String html, String tag) {
		int pt = html.lastIndexOf("<" + tag);
		if (pt >= 0) {
			html = html.substring(html.indexOf(">", pt) + 1);
			pt = html.indexOf("</" + tag + ">", pt);
			if (pt >= 0)
				html = html.substring(0, pt);
		}
		return html;
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
		
		//String subtext = text.substring(start, end);
		//System.out.println("fromJava " + node.getName() + " " + node + " " + subtext.replace("\n", "."));
		//System.out.println(node + " " + start + " " + end + " " + allowBR);
		if (end == start)
			return;
		boolean isDiv = (start >= text.length() || text.charAt(end - 1) == '\n');
		if (isDiv && start + 1 == end) {
			if (allowBR) {
				sb.append("<br>");//<div><br></div>");
			}
			return;
		}
		//int nlen = sb.length();
		boolean isBranch = (node instanceof BranchElement);
		// StyledDocument starts with SECTION, then lots of PARAGRAPHS with CONTENT
		// PlainDocument starts with PARAGRAPH followed by CONTENT
		// System.out.println("node text: " + node.getName() + " " + isBranch + " " + start + " " + end + " " + text.substring(start, end).replace('\n', '.'));
		boolean isPara = (isStyled && node.getName() == "paragraph");
		//System.out.println("isPara " + isPara);
		AttributeSet a = node.getAttributes();
		String style = getCSSStyle(a, currAttr);
		boolean haveStyle = (style.length() > 0);
		if (haveStyle)
			style = " style=\"" + style + "\"";
		//haveStyle = true; // for now
		sb.append(allowBR && (isDiv || isPara)? "<div" + style + ">": haveStyle ? "<span" + style + ">" : "");
		boolean isSub = checkAttr(SUB, a, null);
		boolean isSup = !isSub && checkAttr(SUP, a, null);
		if (isSub)
			sb.append("<sub>");
		else if (isSup)
			sb.append("<sup>");
		if (isBranch) {
			for (int i = 0, n = node.getElementCount(); i < n; i++) {
				fromJava(text, sb, node.getElement(i), !isDiv && !isPara, a);
			}
		} else {
			String t = text.substring(start, isDiv ? end - 1 : end);
			// but this is nbsp; -- no breaks?? Why did I do this?
			while (t.indexOf("  ") >= 0) {
				t = t.replaceAll("  ", "\u00A0 ");
			}
			if (t.indexOf('<') >= 0) {
				t = t.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			}
			if (t.indexOf('\t') >= 0) {
				t = t.replaceAll("\t", JSTAB);
			}
			if (t.endsWith(" "))
				t = t.substring(0, t.length() - 1) + '\u00A0';
			sb.append(t);
		}
		if (isSup)
			sb.append("</sup>");
		else if (isSub)
			sb.append("</sub>");
		sb.append(allowBR && (isDiv || isPara) ? "</div>" : haveStyle ? "</span>" : "");
		//System.out.println("added " + sb.substring(nlen));
	}

	private String getCSSStyle(AttributeSet a, AttributeSet currAttr) {
		String style = "";
		if (checkAttr(BACKGROUND, a, currAttr))
			style += "background:" + toCSSString((Color) getBackground(a)) + ";";
		if (checkAttr(FOREGROUND, a, currAttr))
			style += "color:" + toCSSString((Color) getForeground(a)) + ";";
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

//	@Override
//	protected Dimension getCSSAdjustment(boolean addingCSS, boolean mutable) {
//		return mutable ? new Dimension(0, 0) : ZERO_SIZE;
//	}

	@Override
	protected String getPropertyPrefix() {
		return "EditorPane";
	}
	
	
	@SuppressWarnings("unused")
	/**
	 * used internally in JavaScript of getJSNodePt
	 */
	private Object[] lastRange;

	class Node {
		Node[] childNodes;
		String tagName;
		Node parentNode;
		String innerText;
		int length;
		String textContent;
	}

	/**
	 * Find the HTML node and offset for this Java caret position.
	 * 
	 * @param node domNode or one of its descendants
	 * @param off  document offset to start of this node
	 * @param pt   target caret position
	 * @return range information or length: [textNode,charOffset] or
	 *         [nontextNode,charNodesOffset] or [null, nlen]
	 */
	@SuppressWarnings("unused")
	@Override
	protected Object[] getJSNodePt(DOMNode dnode, int pt, Object[] lastRange, int level) {
		// JavaScript below will call this method iteratively with off >= 0.
		Node node = /** @j2sNative dnode || */
				null;
		boolean isRoot = (lastRange == null);
		pt = Math.max(0, pt);
//		if (isRoot) {
//			System.out.println("JSEPUI getJSNodePt " + editor.getText().replace('\n', '.').replace('\t', '^'));
//		}

		boolean isTAB = isJSTAB(dnode);

		// System.out.println("getting JSNodePt for " + isTAB + " " + pt + " " + (/**
		// @j2sNative node.data||node.outerHTML ||*/""));

		// Must consider several cases for BR and DIV:
		// <br>
		// <div><br><div> where br counts as 1 character --> [div, 0] or [null, 1]
		// <div>.....<br><div> where childNodes[i] is br, counts as 0 charactors -->
		// [div, i] or [null, 0]
		// as well as "raw" text in the root domNode:
		// text....<br>...text...<br>.... where br counts as 1 character -->
		// [node.parentNode, i] or [null, 1]
		//
		// also note that range can point to a character position only if the node is
		// #text
		// otherwise, it must point to a childNode index in the parent node. So <br>
		// must be indicated this second way.
		//
		// TAB will be indicated as a JSTAB string (see above).
		//
		Object[] r = /** @j2sNative 1?[]: */
				null;
		try {
			lastRange = setNode(null, node, 0);
			if (isTAB) {
				return (pt == 0 ? r = lastRange : setNode(r, null, pt - 1));
			}
			Node[] nodes = node.childNodes;
			String tag = node.tagName;
			int n = nodes.length;
			if (tag == "BR" || n == 1 && nodes[0].tagName == "BR") {
				return (pt == 0 ? setNode(r, node, 0) : setNode(r, null, pt - 1));
			}
			int nlen = 0;
			int i1 = (tag == "DIV" || tag == "P" ? 1 : 0);
			for (int i = 0; i < n; i++) {
				node = nodes[i];
				if (node.innerText != null) {
					r = getJSNodePt((DOMNode) (Object) node, pt, lastRange, ++level);
					if (r[0] != null) {
						return r;
					}
					pt = /** @j2sNative 1?r[1] : */
							0;
				} else if (node.tagName == "BR") {
					if (pt == 0)
						return setNode(r, node.parentNode, i);
					pt -= (isRoot ? 1 : 0);
				} else {
					nlen = node.length;
					if (nlen >= pt)
						return r = setNode(lastRange, node, pt);
					lastRange = setNode(lastRange, node, nlen);
					pt -= nlen;
				}
			}
			if (!isRoot)
				return setNode(r, null, Math.max(0, pt - i1));
			return r = lastRange;
		} finally {
//			System.out.println("level " + level 
//					+ " pt = " + r[1] 
//					+ " text=" + (r[0] == null ? "<null>" : (((Node) r[0]).parentNode == null ? "NULL" : ((Node) r[0]).parentNode.tagName) + " " 
//					+ ((Node) r[0]).textContent.replace('\n','.').replace('\t','^').replace(' ','_')));
		}
	}
	
	private Object[] setNode(Object[] r, Node node, int i) {
			/**
			 @j2sNative if (r) {
			 			r[0] = node;
			 			r[1] = i;
			 			return r;
			 			}
			 			r = [node, i];
			 */
		return r;
	}

	@Override
	public String getJSTextValue() {
		String s = getInnerTextSafely(domNode, false, null).toString().replaceAll("\u00A0"," "); // &nbsp;
//		System.out.println("getjSTextValue " + s);
		return s;
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
				&& (/** @j2sNative node.nodeType != 3 && ("" + node.getAttribute("class")).indexOf("j2stab") >= 0 && */true);
	}

	
	/**
	 * no backward selections in a div with contentEditable TRUE
	 */
	@Override
	protected void setJSSelection(int mark, int dot, boolean andScroll) {
		if (isHtmlKit)
			return;
		super.setJSSelection(Math.min(mark,  dot), Math.max(mark,  dot), andScroll);
	}

	@Override
	protected void jsSelect(Object[] r1, Object[] r2, boolean andScroll) {
		fixTabRange(r1);
		if (r1 != r2)
			fixTabRange(r2);
		if (r1[0] == null)
			return;
		andScroll |= (jc.秘keyAction != null);
		
		
//		System.out.println("jsSelect " + r1 + r2 + " " + andScroll);
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

	private void scrollAsNeeded(Object node) {
		@SuppressWarnings("unused")
		boolean isAtEnd = (editor.getCaret().getDot() >= editor.getText().lastIndexOf('\n'));
		
		/**
		 * @j2sNative
		 * 
		 * if (isAtEnd) {
		 *   this.domNode.scrollTop = this.domNode.scrollHeight;
		 *   return;
		 * }
		 * 
		 * if (node == null)return;
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
		 *            //System.out.println([node.innerText,"top",top, "[",off |0, (off+hn)|0, "]bottom",(top+hd)|0]);
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

//
//	private void scrollIntoView() {
//		this.setJSSelection(editor.getCaret().getMark(), editor.getCaret().getDot(), true);
//	}

	/**
	 * @param r
	 */
	private void fixTabRange(Object[] r) {
		DOMNode node = (DOMNode)r[0];
		boolean isStart = /** @j2sNative r[1] == 0|| */false;
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
		if (isHtmlKit)
			return false;
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
		//System.out.println("getJSMandD " + [toEnd,toStart]);
		 * 
		 * 			var s = window.getSelection(); anode = s.anchorNode; 
		 *   if (anode) {
		 * 
		 *            apt =
		 *            s.anchorOffset; if (anode.tagName) { anode =
		 *            anode.childNodes[apt]; apt = 0; } else { alen = anode.length; apar
		 *            = anode.parentElement; } fnode = s.focusNode; fpt = s.focusOffset;
		 *            if (fnode.tagName) { fnode = fnode.childNodes[fpt]; fpt = 0; }
		 *            else { flen = fnode.length; fpar = fnode.parentElement; }
		 *            
		 *            }
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
		if (isHtmlKit)
			return;
		//System.out.println("setJSMarkAndDot " + mark + " " + dot + " " + andScroll);
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
		if (isHtmlKit)
			return;
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

	private void replaceText(String s, int x) {
		try {
			if (x < 0) {
				int[] xy = getJavaMarkAndDot();
				x = xy[0];
				if (xy[1] > x)
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

	private String stemp;
	private int[] xyTemp;
	
    @Override
	public int viewToModel(JTextComponent t, Point pt,
            Position.Bias[] biasReturn) {
		return (isHtmlKit ? 0 : super.viewToModel(t,  pt,  biasReturn));
    }

	/**
	 * CTRL-V insertion requires knowledge of the text length at the time of
	 * keypress and then comparing that to the value at the time of keyup. Hopefully
	 * no repeating!
	 * 
	 * @return (ignored)
	 */
	@Override
	protected boolean handleCtrlV(int mode) {
		getJSMarkAndDot(markDot, 0);
		String s = (String) DOMNode.getAttr(domNode, "innerText");
		switch (mode) {
		case KeyEvent.KEY_PRESSED:
			stemp = s;
			xyTemp = getJavaMarkAndDot();
			return false;
		case KeyEvent.KEY_TYPED:
			return false;
		case KeyEvent.KEY_RELEASED:
			return handleJSPasteRelease(s);
		}
		return true;
	}
	

	/**
	 * @j2sAlias handleJSPasteEvent
	 * 
	 * @param jqevent
	 * @param e
	 * @return
	 */
    @SuppressWarnings("null")
	boolean handleJSPasteEvent(JQEvent jqevent, Object e) {
    	String text = null, html = null;
		/**
		 * @j2sNative
		 * 
		 *  var d = (e.originalEvent.clipboardData || window.clipboardData);
		 * 	text = d.getData("text");
		 *  html = d.getData("text/html");
		 * 
		 */
    	jsPasteText = text;
    	jsPasteHTML = (html.indexOf('\u00A0') >= 0 ? html.replaceAll(JSTAB,"\t").replaceAll(JSTAB2,"\t") : html);
    	return false;
	}

	private boolean handleJSPasteRelease(String s) {
		if (isHtmlKit) {
			return true;
		}
		// problem here is that JavaScript raw text has extra \n in it that the Java
		// does not.

		try {
			Document doc = editor.getDocument();
			int mark = xyTemp[0];
			int dot = xyTemp[1];
			int p = Math.min(dot, mark);
			AttributeSet a = null;
			String text = jsPasteText;
			if (doc instanceof StyledDocument) {
				StyledDocument sd = (StyledDocument) doc;
				a = sd.getCharacterElement(p).getAttributes();
				if (jsPasteHTML.indexOf('\t') >= 0) {
					text = fixTabs(text, jsPasteHTML);
				}
			}
			int len = text.length();
			if (dot != mark)
				doc.remove(p, Math.abs(dot - mark));
			if (len > 0)
				doc.insertString(p, text, a);
			SwingUtilities.invokeLater(() -> {
				editor.getCaret().setDot(p + len);
			});
//
//			if (true)
//				return true;
//			
//			
//			int x = xyTemp[0];
//			int n = s.length() - stemp.length() + xyTemp[1] - x;
//
//			System.out.println("n=" + n + " x=" + x + " newlen=" + s.length());
//			if (n <= 0)
//				return false;
//			
//		
//			x += (SPACES_PER_TAB - 1) * tabCount(editor.getDocument().getText(0, x));
//			if (x < 0)
//				return false;
//			s = s.substring(x, x + n);
//
//			// System.out.println("x=" + x + " n=" + n + " s=" +s);
//
//			if (xyTemp[0] != xyTemp[1])
//				editor.getDocument().remove(xyTemp[0], xyTemp[1] - xyTemp[0]);
//
//			editor.getDocument().insertString(xyTemp[0], s, null);
//
//			// replaceText(s, -1);
//			// setJSMarkAndDot(markDot.x, markDot.x, false);
		} catch (BadLocationException bl) {
		}
		return true;
	}

	private static String fixTabs(String text, String html) {
		// challenge here is to find the right number of tabs.
		html= replaceTag(html, "", "");
		/**
		 * @j2sNative
		 * 
		 * var s = "";
		 * var p, q, i, j;
		 * for (p = 0, q = 0, i = html.indexOf("\t"), j = text.indexOf("    "); i >= 0 && j >= 0; i = html.indexOf("\t", p), j = text.indexOf("    ", q)) {
		 *      s += text.substring(q, j) + "\t";
		 *   p = i + 1;
		 *   q = j + 4;   
		 * }
		 * text = s + text.substring(q);
		 */
		return text;
	}

	private static String replaceTag(String html, String tag, String rep) {
		/**
		 * @j2sNative
		 * 
		 *   var S = html.replace(/\n/g,'').split("<" + tag);
		 *   var s = S[0];
		 *   for (var i = 1; i < S.length; i++) {
		 *    var p = S[i].indexOf("/>");
		 *    var q = S[i].indexOf(">");
		 *    if (q >= 0 && (p < 0 || q < p))
		 *      p = q;
		 *    var t = S[i].substring(p + (q == p ? 1 : 2));
		 *    s += (rep.length ? "<" + tag + ">" : "") + t;
		 *   }
		 *   !rep && (s = s.replaceAll("</" + tag + ">",""));
		 *   return s;
		 */
		{
				return null;
		}
	}

	private int tabCount(String s) {
		int n = 0;
		for (int i = s.length(); --i >= 0;)
			if (s.charAt(i) == '\t')
				n++;
		return n;
	}
	
	@Override
	void setJSText() {
		mytext = null;
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
	
	protected final static boolean DO_KEY_DEFAULT = true;
	protected final static boolean STOP_KEY_DEFAULT_AND_PREVENT_PROPAGATION = false;


	/**
	 * This method is entered from the j2sApplet mouse listeners, 
	 * 
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		Boolean b = checkAllowEvent(jQueryEvent);
		if (b != null)
			return b;
		switch (eventType) {
		default:
			return NOT_HANDLED;
		case MouseEvent.MOUSE_ENTERED:
		case MouseEvent.MOUSE_DRAGGED:
		case MouseEvent.MOUSE_EXITED:
		case MouseEvent.MOUSE_PRESSED:
		case MouseEvent.MOUSE_RELEASED:
			if (isHtmlKit) {
				// The idea here is to disallow mouse-driven editing
				DOMNode.setAttrs(domNode, "contentEditable", FALSE);				
				editor.秘jsHTMLHelper.handleJSEvent(target, eventType, jQueryEvent);
				return HANDLED;
			}
			return HANDLED;
		case SOME_KEY_EVENT:
			setIgnoreEvent(jQueryEvent);
			if (isHtmlKit) {
				// Allow CTRL-A to select just the JEditorPane, not the whole page
				DOMNode.setAttrs(domNode, "contentEditable", TRUE);				
				return DO_KEY_DEFAULT;
			}
			JSComponent.秘dispatchKeyEvent(jc, 0, jQueryEvent, System.currentTimeMillis());
			return STOP_KEY_DEFAULT_AND_PREVENT_PROPAGATION;
		}
	}


	@Override
	public Dimension getMaximumSize(JComponent jc) {
		return ANY_SIZE;
	}
	
	@Override
	public Dimension getPreferredSize(JComponent c) {
		if (isTextPane) {
			updateDOMNode();
			String sh = DOMNode.getStyle(domNode,  "height");
			int w = (scrollPaneUI != null && scrollPaneUI.c.getWidth() != 0 ? scrollPaneUI.c.getWidth() : DOMNode.getWidth(domNode));
			DOMNode.setStyle(domNode, "height", null);
			Rectangle r = this.getBoundingRect(domNode);
			int h = (int) Math.max(0, Math.ceil(r.height));
			DOMNode.setStyle(domNode, "height", sh);
			return new Dimension(w,h);
		} else {
			return super.getPreferredSize(c);
		}
	}

	@Override
	public Dimension getMinimumSize(JComponent jc) {
//		getPreferredSize(jc);
//        Document doc = editor.getDocument();
        Insets i = jc.getInsets();
        Dimension d = new Dimension();
//        if (doc instanceof AbstractDocument) {
//            ((AbstractDocument)doc).readLock();
//        }
//        try {
            d.width = (int) rootView.getMinimumSpan(View.X_AXIS) + i.left + i.right;
            d.height = (int)  rootView.getMinimumSpan(View.Y_AXIS) + i.top + i.bottom;
//        } finally {
//            if (doc instanceof AbstractDocument) {
//                ((AbstractDocument)doc).readUnlock();
//            }
//        }
        return d;
	}

	@Override
	protected Boolean handleTab(Object jqEvent, String type) {
		if (type == "keydown")
			checkKeyListeners();
		editor.setFocusTraversalKeysEnabled(false);
		return null;
	}

	private void checkKeyListeners() {
		if (editor.秘getLastKeyListener() != this) {
			editor.removeKeyListener(this);
			editor.addKeyListener(this);
		}
	}

	@Override
	public void keyTyped(KeyEvent e) {
	}

	@Override
	public void keyPressed(KeyEvent e) {
		if (e.getKeyCode() == KeyEvent.VK_TAB) {
			if (!e.isConsumed()) {
				replaceText("\t", -1);
				e.consume();
			}
		}
	}

	@Override
	public void keyReleased(KeyEvent e) {
	}

}
