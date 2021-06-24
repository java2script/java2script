package swingjs.a2s;

import java.awt.AWTEventMulticaster;
import java.awt.Dimension;
import java.awt.FontMetrics;
import java.awt.event.TextListener;
import java.awt.im.InputMethodRequests;

import javax.swing.JTextArea;
import javax.swing.ScrollPaneConstants;

public class TextArea extends JTextArea {

	public void isAWT() {
		// a good JavaScript trick here:
		// existance of isAWT$ checked prior to initialization 
		// static of fields avoids the fact that the default boolean 
		// won't yet be "true"
	}

	transient protected TextListener textListener;

	private int horizontalScrollBarPolicy;

	private int verticalScrollBarPolicy;

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
		super(text, rows < 0 ? 0 : rows, columns < 0 ? 0 : columns);
		setWrapStyleWord(false);
		setLineWrap(false);
		switch (scrollbars) {
		case SCROLLBARS_BOTH:
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
			break;
		case SCROLLBARS_VERTICAL_ONLY:
			super.setLineWrap(true);
			super.setWrapStyleWord(true);
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
			break;
		case SCROLLBARS_HORIZONTAL_ONLY:
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
			break;
		case SCROLLBARS_NONE:
			super.setLineWrap(true);
			super.setWrapStyleWord(true);
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
			break;
		}
	}

    public int getVerticalScrollBarPolicy() {
        return verticalScrollBarPolicy;
    }

	private void setVerticalScrollBarPolicy(int policy) {
		int old = verticalScrollBarPolicy;
		verticalScrollBarPolicy = policy;
		super.firePropertyChange("verticalScrollBarPolicy", old, policy);
		super.revalidate();
		super.秘repaint();
	}

    public int getHorizontalScrollBarPolicy() {
        return horizontalScrollBarPolicy;
    }

	private void setHorizontalScrollBarPolicy(int policy) {
		int old = horizontalScrollBarPolicy;
		horizontalScrollBarPolicy = policy;
		super.firePropertyChange("horizontalScrollBarPolicy", old, policy);
		super.revalidate();
		super.秘repaint();
	}

    public int getScrollbarVisibility() {
		boolean v = (getVerticalScrollBarPolicy() != ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
		boolean h = (getHorizontalScrollBarPolicy() != ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		return (v && h ? SCROLLBARS_BOTH
				: v ? SCROLLBARS_VERTICAL_ONLY : h ? SCROLLBARS_HORIZONTAL_ONLY : SCROLLBARS_NONE);
	}

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
		return super.getListeners(TextListener.class);
	}

	public Dimension getPreferredSize(int rows, int columns) {
		return preferredSize(rows, columns);
	}

	@Deprecated
	public Dimension preferredSize(int rows, int columns) {
		return super.getSizeJS(null, 400, rows, columns);
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
//		synchronized (getTreeLock()) {
			return ((super.rows > 0) && (super.columns > 0)) ? preferredSize(super.rows, super.columns) : super.preferredSize();
		}
//	}

    @Override
	protected int getColumnWidth() {
    	
    	//A column is an approximate average character width that is platform-dependent. 
    	//
    	// We will call that "n" -- it is pretty close
    	// 
        if (columnWidth == 0) {
            FontMetrics metrics = getFontMetrics(super.getFont());
            columnWidth = metrics.charWidth('n');
        }
        return columnWidth;
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
		return super.getSizeJS(null, 100, rows, columns);
//		synchronized (getTreeLock()) {
//			TextAreaPeer peer = (TextAreaPeer) super.getPeer();
//			return (peer != null) ? peer.getMinimumSize(rows, columns) : super.minimumSize();
//		}
	}

	@Override
    protected int getJ2SWidth(int columns) {
		return  columns * getColumnWidth() + 24;
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
		synchronized (super.getTreeLock()) {
			return ((super.rows > 0) && (super.columns > 0)) ? minimumSize(super.rows, super.columns) : super.minimumSize();
		}
	}

	public InputMethodRequests getInputMethodRequests() {
		return null; //??

	}

//	@Override
//	public String getSelectedText() {
//		return super.getSelectedText();
//	}
//
//	@Override
//	public boolean isEditable() {
//		return super.isEditable();
//	}
//
//	@Override
//	public int getSelectionStart() {
//		return super.getSelectionStart();
//	}
//
//	@Override
//	public void setSelectionStart(int selectionStart) {
//		super.setSelectionStart(selectionStart);
//	}
//
//	@Override
//	public void setFont(Font f) {
//		super.setFont(f);
//	}
//	
//	@Override
//	public Font getFont() {
//		return super.getFont();
//	}
//	
//	@Override
//	public int getSelectionEnd() {
//		return super.getSelectionEnd();
//	}
//
//	@Override
//	public void setSelectionEnd(int selectionEnd) {
//		super.setSelectionEnd(selectionEnd);
//	}
//
//	@Override
//	public void select(int selectionStart, int selectionEnd) {
//		super.select(selectionStart, selectionEnd);
//	}
//
//	@Override
//	public int getCaretPosition() {
//		return super.getCaretPosition();
//	}
//
	@Override
	public void setCaretPosition(int pos) {
		super.setCaretPosition(pos);
		super.requestFocusInWindow();
	}

	void awtDefaults() {

		// setAutoscrolls(true);
		// setContentType("text/plain");
	}

	// API

//	@Override
//	public String getText() {
//		return super.getText();
//	}
//
//	@Override
//	public void setEditable(boolean b) {
//		super.setEditable(b);
//	}
//
//	@Override
//	public void selectAll() {
//		super.selectAll();
//	}
//
	@Override
	public void setTextFromUI(String t) {
		super.setText(t);
	}
	
//	@Override
//	public void setText(String t) {
//		@SuppressWarnings("unused")
//		int top = /** @j2sNative this.ui.domNode.scrollTop ||*/0;
//		super.setText(t);
//		/** @j2sNative this.ui.domNode.scrollTop = top */		
//	}

//	public void insertText(String str, int pos) {
//		super.insert(str, pos);
//	}
//
//	@Override
//	public void insert(String str, int pos) {
//		super.insert(str, pos);
//	}
//
	public void appendText(String str) {
		super.append(str);
		toEnd();
	}

	@Override
	public void append(String str) {
		super.append(str);
		toEnd();
	}

	private void toEnd() {
		super.setCaretPosition(super.getText().length());
		super.requestFocusInWindow();
		super.firePropertyChange("JSToEnd", null, "JSToEnd");
	}

//	@Override
//	public void replaceRange(String str, int start, int end) {
//		super.replaceRange(str, start, end);
//	}
//
	public void replaceText(String str, int start, int end) {
		super.replaceRange(str, start, end);
	}

//	@Override
//	public void setColumns(int columns) {
//		super.setColumns(columns);
//	}
//
//	@Override
//	public void setRows(int rows) {
//		super.setRows(rows);
//	}
//
//	@Override
//	public int getColumns() {
//		return super.getColumns();
//	}
//
//	@Override
//	public int getRows() {
//		return super.getRows();
//	}
//
//	@Override
//	public void setBackground(Color c) {
//			super.setBackground(c);
//	}
//
//	@Override
//	public void setForeground(Color c) {
//			super.setForeground(c);
//	}
//
//	@Override
//	public void requestFocus() {
//		super.requestFocus();
//	}
//
}
