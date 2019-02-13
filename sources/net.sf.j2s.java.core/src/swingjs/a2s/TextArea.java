package swingjs.a2s;

import java.awt.AWTEventMulticaster;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.TextListener;
import java.awt.im.InputMethodRequests;

import javax.swing.JScrollPane;
import javax.swing.JTextArea;

public class TextArea extends JScrollPane {

	transient protected TextListener textListener;

	public synchronized void addTextListener(TextListener l) {
		if (l == null) {
			return;
		}
		textListener = AWTEventMulticaster.add(textListener, l);
		newEventsOnly = true;
	}

	public synchronized void removeTextListener(TextListener l) {
		if (l == null) {
			return;
		}
		textListener = AWTEventMulticaster.remove(textListener, l);
	}

	public synchronized TextListener[] getTextListeners() {
		return getListeners(TextListener.class);
	}

	public Dimension getPreferredSize(int rows, int columns) {
		return preferredSize(rows, columns);
	}

	@Deprecated
	public Dimension preferredSize(int rows, int columns) {
		return ta.getSizeJS(null, 400, rows, columns);
	}

	@Override
	public Dimension getPreferredSize() {
		return preferredSize();
	}

	/**
	 * @deprecated As of JDK version 1.1, replaced by
	 *             <code>getPreferredSize()</code>.
	 */
	@Override
	@Deprecated
	public Dimension preferredSize() {
		synchronized (getTreeLock()) {
			return ((ta.rows > 0) && (ta.columns > 0)) ? preferredSize(ta.rows, ta.columns) : ta.preferredSize();
		}
	}

	/**
	 * Determines the minimum size of a text area with the specified number of rows
	 * and columns.
	 * 
	 * @param rows    the number of rows
	 * @param columns the number of columns
	 * @return the minimum dimensions required to display the text area with the
	 *         specified number of rows and columns
	 * @see java.awt.Component#getMinimumSize
	 * @since JDK1.1
	 */
	public Dimension getMinimumSize(int rows, int columns) {
		return minimumSize(rows, columns);
	}

	/**
	 * @deprecated As of JDK version 1.1, replaced by
	 *             <code>getMinimumSize(int, int)</code>.
	 */
	@Deprecated
	public Dimension minimumSize(int rows, int columns) {
		return ta.getSizeJS(null, 100, rows, columns);
//		synchronized (getTreeLock()) {
//			TextAreaPeer peer = (TextAreaPeer) ta.getPeer();
//			return (peer != null) ? peer.getMinimumSize(rows, columns) : ta.minimumSize();
//		}
	}

	/**
	 * Determines the minimum size of this text area.
	 * 
	 * @return the preferred dimensions needed for this text area
	 * @see java.awt.Component#getPreferredSize
	 * @since JDK1.1
	 */
	@Override
	public Dimension getMinimumSize() {
		return minimumSize();
	}

	/**
	 * @deprecated As of JDK version 1.1, replaced by <code>getMinimumSize()</code>.
	 */
	@Override
	@Deprecated
	public Dimension minimumSize() {
		synchronized (getTreeLock()) {
			return ((ta.rows > 0) && (ta.columns > 0)) ? minimumSize(ta.rows, ta.columns) : super.minimumSize();
		}
	}

	public InputMethodRequests getInputMethodRequests() {
		return null; //??

	}

	public String getSelectedText() {
		return ta.getSelectedText();
	}

	public boolean isEditable() {
		return ta.isEditable();
	}

	public int getSelectionStart() {
		return ta.getSelectionStart();
	}

	public void setSelectionStart(int selectionStart) {
		ta.setSelectionStart(selectionStart);
	}

	public int getSelectionEnd() {
		return ta.getSelectionEnd();
	}

	public void setSelectionEnd(int selectionEnd) {
		ta.setSelectionEnd(selectionEnd);
	}

	public void select(int selectionStart, int selectionEnd) {
		ta.select(selectionStart, selectionEnd);
	}

	public int getCaretPosition() {
		return ta.getCaretPosition();
	}

	public void isAWT() {
		// a good JavaScript trick here:
		// existance of isAWT$ checked prior to initialization 
		// static of fields avoids the fact that the default boolean 
		// won't yet be "true"
	}

	private JTextArea ta;

	/**
	 * Create and display both vertical and horizontal scrollbars.
	 * 
	 * @since JDK1.1
	 */
	public static final int SCROLLBARS_BOTH = 0;

	/**
	 * Create and display vertical scrollbar only.
	 * 
	 * @since JDK1.1
	 */
	public static final int SCROLLBARS_VERTICAL_ONLY = 1;

	/**
	 * Create and display horizontal scrollbar only.
	 * 
	 * @since JDK1.1
	 */
	public static final int SCROLLBARS_HORIZONTAL_ONLY = 2;

	/**
	 * Do not create or display any scrollbars for the text area.
	 * 
	 * @since JDK1.1
	 */
	public static final int SCROLLBARS_NONE = 3;

	public TextArea(int rows, int cols) {
		this(null, rows, cols, SCROLLBARS_BOTH);
	}

	public TextArea() {
		this(null, 0, 0, SCROLLBARS_BOTH);
	}

	public TextArea(String text) {
		this(text, 0, 0, SCROLLBARS_BOTH);
	}

	public TextArea(String text, int rows, int cols) {
		this(text, rows, cols, SCROLLBARS_BOTH);
	}

	public TextArea(String text, int rows, int columns, int scrollbars) {
		super();
		if (rows < 0)
			rows = 0;
		if (columns < 0)
			columns = 0;
		setViewportView(ta = new JTextArea(text, rows, columns));
		switch (scrollbars) {
		case SCROLLBARS_BOTH:
			setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_AS_NEEDED);
			setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_AS_NEEDED);
			break;
		case SCROLLBARS_VERTICAL_ONLY:
			setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_AS_NEEDED);
			setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_NEVER);
			break;
		case SCROLLBARS_HORIZONTAL_ONLY:
			setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_NEVER);
			setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_AS_NEEDED);
			break;
		case SCROLLBARS_NONE:
			setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_NEVER);
			setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_NEVER);
			break;
		}
	}

	public int getScrollbarVisibility() {
		boolean v = (getVerticalScrollBarPolicy() != VERTICAL_SCROLLBAR_NEVER);
		boolean h = (getHorizontalScrollBarPolicy() != HORIZONTAL_SCROLLBAR_NEVER);
		return (v && h ? SCROLLBARS_BOTH
				: v ? SCROLLBARS_VERTICAL_ONLY : h ? SCROLLBARS_HORIZONTAL_ONLY : SCROLLBARS_NONE);
	}

	public void setCaretPosition(int pos) {
		ta.setCaretPosition(pos);
		ta.requestFocusInWindow();
	}

	void awtDefaults() {

		// setAutoscrolls(true);
		// setContentType("text/plain");
	}

	// API

	public String getText() {
		return ta.getText();
	}

	public void setEditable(boolean b) {
		ta.setEditable(b);
	}

	public void selectAll() {
		ta.selectAll();
	}

	public void setTextFromUI(String t) {
		ta.setText(t);
	}
	
	public void setText(String t) {
		@SuppressWarnings("unused")
		int top = /** @j2sNative this.ta.ui.domNode.scrollTop ||*/0;
		ta.setText(t);
		/** @j2sNative this.ta.ui.domNode.scrollTop = top */		
	}

	public void insertText(String str, int pos) {
		ta.insert(str, pos);
	}

	public void insert(String str, int pos) {
		ta.insert(str, pos);
	}

	public void appendText(String str) {
		ta.append(str);
		toEnd();
	}

	private void toEnd() {
		ta.setCaretPosition(ta.getText().length());
		ta.requestFocusInWindow();
	}

	public void append(String str) {
		ta.append(str);
		toEnd();
	}

	public void replaceRange(String str, int start, int end) {
		ta.replaceRange(str, start, end);
	}

	public void replaceText(String str, int start, int end) {
		ta.replaceRange(str, start, end);
	}

	public void setColumns(int columns) {
		ta.setColumns(columns);
	}

	public void setRows(int rows) {
		ta.setRows(rows);
	}

	public int getColumns() {
		return ta.getColumns();
	}

	public int getRows() {
		return ta.getRows();
	}

	@Override
	public void setBackground(Color c) {
		if (ta != null)
			ta.setBackground(c);
	}

	@Override
	public void setForeground(Color c) {
		if (ta != null)
			ta.setForeground(c);
	}

	@Override
	public void requestFocus() {
		ta.requestFocus();
	}

}
