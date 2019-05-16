package swingjs;

import java.util.HashMap;
import java.util.Map;

import swingjs.api.JSMinimalAbstractDocument;

import javajs.util.AU;
import javajs.util.SB;

import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.EventListenerList;
import javax.swing.event.UndoableEditListener;
//import javax.swing.text.AbstractDocument;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
import javax.swing.text.DocumentFilter;
import javax.swing.text.DocumentFilter.FilterBypass;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;

public abstract class JSAbstractDocument implements JSMinimalAbstractDocument {
	protected Map<Object, Object> props;
	protected JSElement root;
	protected Map<Integer, JSPosition> positions;
	protected EventListenerList listenerList;
	private boolean notifyingListeners;
	protected FilterBypass filterBypass;
	protected JSAbstractDocument me;

	protected SB sb;
	protected char[] tempChar;
	private JTextComponent editor;
	private int currentDot;
	private int currentMark;
	private boolean isAWT;

	/**
	 * Name of elements used to represent paragraphs
	 */
	public static final String ParagraphElementName = "paragraph";

	/**
	 * Name of elements used to represent content
	 */
	public static final String ContentElementName = "content";

	public JSAbstractDocument() {
		me = this;
		props = new HashMap<Object, Object>();
	}

	@Override
	public Element[] getRootElements() {
		return new Element[] { root, null };
	}

	protected void checkLoc(int start, int end) throws BadLocationException {
		if (start < 0 || end > getLength())
			throw new BadLocationException("JSAbstractDocument: out of range",
					(start < 0 ? start : end));
	}

	protected void fixPositions(int offset, int length, boolean isInsert) {
		if (positions == null || positions.isEmpty())
			return;
		if (isInsert) {
			for (Integer i : positions.keySet()) {
				int pos = i.intValue();
				if (pos > offset)
					positions.get(i).pos += length;
			}
			return;
		}
		for (Integer i : positions.keySet()) {
			int pos = i.intValue();
			if (pos <= offset)
				continue;
			if (pos >= offset + length)
				positions.get(i).pos -= length;
			else
				positions.get(i).pos = offset;
		}
	}

	/**
	 * Returns the <code>FilterBypass</code>. This will create one if one does not
	 * yet exist.
	 */
	private DocumentFilter.FilterBypass getFilterBypass() {
		if (filterBypass == null) {
			filterBypass = new DefaultFilterBypass();
		}
		return filterBypass;
	}

	@Override
	public void remove(int offs, int len) throws BadLocationException {
		DocumentFilter filter = getDocumentFilter();
		if (filter == null)
			handleRemove(offs, len);
		else
			filter.remove(getFilterBypass(), offs, len);
	}

	@Override
	public void insertString(int offset, String str, AttributeSet a)
			throws BadLocationException {
		DocumentFilter filter = getDocumentFilter();
		if (filter == null)
			handleInsertString(offset, str, a);
		else
			filter.insertString(getFilterBypass(), offset, str, a);
	}

	@Override
	public void replace(int offset, int length, String text, AttributeSet attrs)
			throws BadLocationException {
		if (length == 0 && (text == null || text.length() == 0))
			return;
		DocumentFilter filter = getDocumentFilter();
		if (filter != null) {
			filter.replace(getFilterBypass(), offset, length, text, attrs);
		} else {
			if (length > 0)
				remove(offset, length);
			if (text != null && text.length() > 0)
				insertString(offset, text, attrs);
		}
	}
	
	@Override
	public void replace(int offset, int length, String text, AttributeSet attrs, JTextComponent c)
			throws BadLocationException {
		editor = c;
		isAWT = /** @j2sNative c.isAWT$ || */false;
		if (isAWT) {
			currentDot = c.getCaret().getDot();
			currentMark = c.getCaret().getMark();
		}
		replace(offset, length, text, attrs);
	}

	public void resetAWTScroll() {
		// called by swingjs.plaf.TextListener
		if (isAWT) {
			editor.getCaret().setDot(currentMark);
			editor.getCaret().moveDot(currentDot);
		}
	}

	private void taint() {
		tempChar = null;
	}

	private void setLines() {
		root = new JSElement();
		String s = sb.toString();
		if (s.lastIndexOf('\n') != s.length() - 1)
			s += "\n";
		int ilast = 0;
		for (int i = 0; i < s.length(); i++) {
			if (s.charAt(i) != '\n')
				continue;
			JSElement e = new JSElement();
			e.start = ilast;
			e.end = i + 1;
			ilast = i + 1;
			root.addChild(e);
		}
	}

	/**
	 * Performs the actual work of inserting the text; it is assumed the caller
	 * has obtained a write lock before invoking this.
	 */
	protected void handleInsertString(int offs, String str, AttributeSet a)
			throws BadLocationException {
		if ((str == null) || (str.length() == 0)) {
			return;
		}

		checkLoc(offs, offs);
		taint();
		sb.insert(offs, str);
		fixPositions(offs, str.length(), true);
		if (str.indexOf('\n') >= 0)
			setLines();
		// TODO: what about attributes set?

		// SwingJS n/a
		// UndoableEdit u = data.insertString(offs, str);
		JSDocumentEvent e = new JSDocumentEvent(this, offs, str.length(),
				DocumentEvent.EventType.INSERT);
		// if (u != null) {
		// e.addEdit(u);
		// }

		// // see if complex glyph layout support is needed
		// if( getProperty(I18NProperty).equals( Boolean.FALSE ) ) {
		// // if a default direction of right-to-left has been specified,
		// // we want complex layout even if the text is all left to right.
		// Object d = getProperty(TextAttribute.RUN_DIRECTION);
		// if ((d != null) && (d.equals(TextAttribute.RUN_DIRECTION_RTL))) {
		// putProperty( I18NProperty, Boolean.TRUE);
		// } else {
		// char[] chars = str.toCharArray();
		// if (SwingUtilities2.isComplexLayout(chars, 0, chars.length)) {
		// putProperty( I18NProperty, Boolean.TRUE);
		// }
		// }
		// }
		//
		// insertUpdate(e, a);
		// // Mark the edit as done.
		// e.end();
		fireInsertUpdate(e);
		// only fire undo if Content implementation supports it
		// undo for the composed text is not supported for now
		// if (u != null &&
		// (a == null || !a.isDefined(StyleConstants.ComposedTextAttribute))) {
		// fireUndoableEditUpdate(new UndoableEditEvent(this, e));
		// }
	}

	/**
	 * Performs the actual work of the remove. It is assumed the caller will have
	 * obtained a <code>writeLock</code> before invoking this.
	 */
	protected void handleRemove(int offs, int len) throws BadLocationException {
		checkLoc(offs, offs + len);
		taint();
		String str = sb.substring2(offs, offs + len);
		sb.replace(offs, offs + len, "");
		fixPositions(offs, offs + len, false);
		if (str.indexOf('\n') >= 0)
			setLines();
		if (len > 0) {
			DocumentEvent chng = new JSDocumentEvent(this, offs, len,
					DocumentEvent.EventType.REMOVE);

			// boolean isComposedTextElement = false;
			// Check whether the position of interest is the composed text
			// isComposedTextElement = Utilities.isComposedTextElement(this, offs);

			// SwingJS n/a
			// removeUpdate(chng);
			// SwingJS n/a
			// UndoableEdit u = data.remove(offs, len);
			// if (u != null) {
			// chng.addEdit(u);
			// }
			// SwingJS BIDI only
			// postRemoveUpdate(chng);
			// Mark the edit as done.
			// /chng.end();
			fireRemoveUpdate(chng);
			// only fire undo if Content implementation supports it
			// undo for the composed text is not supported for now
			// SwingJS n/a
			// if ((u != null) && !isComposedTextElement) {
			// fireUndoableEditUpdate(new UndoableEditEvent(this, chng));
			// }
		}
	}

	/**
	 * Notifies all listeners that have registered interest for notification on
	 * this event type. The event instance is lazily created using the parameters
	 * passed into the fire method.
	 * 
	 * @param e
	 *          the event
	 * @see EventListenerList
	 */
	protected void fireInsertUpdate(DocumentEvent e) {
		if (listenerList == null)
			return;
		checkAlreadyNotifying();
		notifyingListeners = true;
		try {
			// Guaranteed to return a non-null array
			Object[] listeners = listenerList.getListenerList();
			// Process the listeners last to first, notifying
			// those that are interested in this event
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					// Lazily create the event:
					// if (e == null)
					// e = new ListSelectionEvent(this, firstIndex, lastIndex);
					((DocumentListener) listeners[i + 1]).insertUpdate(e);
				}
			}
		} finally {
			notifyingListeners = false;
		}
	}

	/**
	 * SwingJS note: SwingJS does not implement redo/undo and compound edits.
	 * 
	 * Notifies all listeners that have registered interest for notification on
	 * this event type. The event instance is lazily created using the parameters
	 * passed into the fire method.
	 * 
	 * @param e
	 *          the event
	 * @see EventListenerList
	 */
	protected void fireChangedUpdate(DocumentEvent e) {
		if (listenerList == null)
			return;
		checkAlreadyNotifying();
		notifyingListeners = true;
		try {
			// Guaranteed to return a non-null array
			Object[] listeners = listenerList.getListenerList();
			// Process the listeners last to first, notifying
			// those that are interested in this event
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					// Lazily create the event:
					// if (e == null)
					// e = new ListSelectionEvent(this, firstIndex, lastIndex);
					((DocumentListener) listeners[i + 1]).changedUpdate(e);
				}
			}
		} finally {
			notifyingListeners = false;
		}
	}

	/**
	 * Notifies all listeners that have registered interest for notification on
	 * this event type. The event instance is lazily created using the parameters
	 * passed into the fire method.
	 * 
	 * @param e
	 *          the event
	 * @see EventListenerList
	 */
	protected void fireRemoveUpdate(DocumentEvent e) {
		if (listenerList == null)
			return;
		checkAlreadyNotifying();
		notifyingListeners = true;
		try {
			// Guaranteed to return a non-null array
			Object[] listeners = listenerList.getListenerList();
			// Process the listeners last to first, notifying
			// those that are interested in this event
			for (int i = listeners.length - 2; i >= 0; i -= 2) {
				if (listeners[i] == DocumentListener.class) {
					// Lazily create the event:
					// if (e == null)
					// e = new ListSelectionEvent(this, firstIndex, lastIndex);
					((DocumentListener) listeners[i + 1]).removeUpdate(e);
				}
			}
		} finally {
			notifyingListeners = false;
		}
	}

	private void checkAlreadyNotifying() {
		if (notifyingListeners)
			throw new IllegalStateException(
					"One of the document listeners modifed the document. This is not allowed.");
	}

	@Override
	public void addDocumentListener(DocumentListener listener) {
		if (listenerList == null)
			listenerList = new EventListenerList();
		listenerList.add(DocumentListener.class, listener);
		// JFormattedTextField; DefaultCaret
	}

	@Override
	public void removeDocumentListener(DocumentListener listener) {
		if (listenerList != null)
			listenerList.remove(DocumentListener.class, listener);
	}

	@Override
	public void addUndoableEditListener(UndoableEditListener listener) {
		// SwingJS -- not necessary?
	}

	@Override
	public void removeUndoableEditListener(UndoableEditListener listener) {
		// SwingJS -- not necessary?
	}

	@Override
	public Object getProperty(Object key) {
		return props.get(key);
	}

	@Override
	public void putProperty(Object key, Object value) {
		props.put(key, value);
	}

	protected DocumentFilter filter;

	@Override
	public int getAsynchronousLoadPriority() {
		// synchronous
		return -1;
	}

	@Override
	public void setDocumentFilter(DocumentFilter filter) {
		this.filter = filter;
	}

	public DocumentFilter getDocumentFilter() {
		return filter;
	}

	private class DefaultFilterBypass extends DocumentFilter.FilterBypass {
		@Override
		public Document getDocument() {
			return me;
		}

		@Override
		public void remove(int offset, int length) throws BadLocationException {
			handleRemove(offset, length);
		}

		@Override
		public void insertString(int offset, String string, AttributeSet attr)
				throws BadLocationException {
			handleInsertString(offset, string, attr);
		}

		@Override
		public void replace(int offset, int length, String text, AttributeSet attrs)
				throws BadLocationException {
			handleRemove(offset, length);
			handleInsertString(offset, text, attrs);
		}
	}

	protected class JSElement implements Element {

		protected Element parent;
		protected AttributeSet attributeSet;
		protected int start;
		protected int end;
		protected int nchildren;
		protected JSElement[] children;
		protected int lastIndex;

		JSElement() {
			children = null;
			nchildren = 0;
			lastIndex = -1;
		}

		public void addChild(JSElement e) {
			if (children == null)
				children = new JSElement[10];
			else if (nchildren == children.length)
				children = (JSElement[]) AU.doubleLength(children);
			children[nchildren++] = e;
		}

		@Override
		public Document getDocument() {
			return me;
		}

		@Override
		public Element getParentElement() {
			return parent;
		}

		@Override
		public String getName() {
			return getName();
		}

		@Override
		public AttributeSet getAttributes() {
			return attributeSet;
		}

		@Override
		public int getStartOffset() {
			return start;
		}

		@Override
		public int getEndOffset() {
			return end;
		}

		@Override
		public int getElementIndex(int offset) {
			int index;
			int lower = 0;
			int upper = nchildren - 1;
			int mid = 0;
			int p0 = getStartOffset();
			int p1;

			if (nchildren == 0) {
				return 0;
			}
			if (offset >= getEndOffset()) {
				return nchildren - 1;
			}

			// see if the last index can be used.
			if ((lastIndex >= lower) && (lastIndex <= upper)) {
				Element lastHit = children[lastIndex];
				p0 = lastHit.getStartOffset();
				p1 = lastHit.getEndOffset();
				if ((offset >= p0) && (offset < p1)) {
					return lastIndex;
				}

				// last index wasn't a hit, but it does give useful info about
				// where a hit (if any) would be.
				if (offset < p0) {
					upper = lastIndex;
				} else {
					lower = lastIndex;
				}
			}

			while (lower <= upper) {
				mid = lower + ((upper - lower) / 2);
				Element elem = children[mid];
				p0 = elem.getStartOffset();
				p1 = elem.getEndOffset();
				if ((offset >= p0) && (offset < p1)) {
					// found the location
					index = mid;
					lastIndex = index;
					return index;
				} else if (offset < p0) {
					upper = mid - 1;
				} else {
					lower = mid + 1;
				}
			}

			// didn't find it, but we indicate the index of where it would belong
			if (offset < p0) {
				index = mid;
			} else {
				index = mid + 1;
			}
			lastIndex = index;
			return index;
		}

		@Override
		public int getElementCount() {
			return nchildren;
		}

		@Override
		public Element getElement(int index) {
			return (index >= nchildren ? null : children[index]);
		}

		@Override
		public boolean isLeaf() {
			return (parent != null);
		}
		
		@Override
		public String toString() {
			return "JSElement " + getStartOffset() + "," + getEndOffset();
		}

	}
}
