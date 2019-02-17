package swingjs.a2s;

import java.awt.AWTEventMulticaster;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.TextListener;
import java.awt.im.InputMethodRequests;

import javax.swing.JScrollBar;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.ScrollPaneConstants;

public class TextArea extends JTextArea {

	transient protected TextListener textListener;

	private int horizontalScrollBarPolicy;

	private int verticalScrollBarPolicy;

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
		synchronized (getTreeLock()) {
			return ((super.rows > 0) && (super.columns > 0)) ? preferredSize(super.rows, super.columns) : super.preferredSize();
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
		return super.getSizeJS(null, 100, rows, columns);
//		synchronized (getTreeLock()) {
//			TextAreaPeer peer = (TextAreaPeer) super.getPeer();
//			return (peer != null) ? peer.getMinimumSize(rows, columns) : super.minimumSize();
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
			return ((super.rows > 0) && (super.columns > 0)) ? minimumSize(super.rows, super.columns) : super.minimumSize();
		}
	}

	public InputMethodRequests getInputMethodRequests() {
		return null; //??

	}

	public String getSelectedText() {
		return super.getSelectedText();
	}

	public boolean isEditable() {
		return super.isEditable();
	}

	public int getSelectionStart() {
		return super.getSelectionStart();
	}

	public void setSelectionStart(int selectionStart) {
		super.setSelectionStart(selectionStart);
	}

	@Override
	public void setFont(Font f) {
		super.setFont(f);
	}
	
	@Override
	public Font getFont() {
		return super.getFont();
	}
	
	public int getSelectionEnd() {
		return super.getSelectionEnd();
	}

	public void setSelectionEnd(int selectionEnd) {
		super.setSelectionEnd(selectionEnd);
	}

	public void select(int selectionStart, int selectionEnd) {
		super.select(selectionStart, selectionEnd);
	}

	public int getCaretPosition() {
		return super.getCaretPosition();
	}

	public void isAWT() {
		// a good JavaScript trick here:
		// existance of isAWT$ checked prior to initialization 
		// static of fields avoids the fact that the default boolean 
		// won't yet be "true"
	}

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
		//setViewportView(new JTextArea(text, rows, columns));
		switch (scrollbars) {
		case SCROLLBARS_BOTH:
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
			break;
		case SCROLLBARS_VERTICAL_ONLY:
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
			break;
		case SCROLLBARS_HORIZONTAL_ONLY:
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
			break;
		case SCROLLBARS_NONE:
			setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
			setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
			break;
		}
	}

    /**
     * Returns the vertical scroll bar policy value.
     * @return the <code>verticalScrollBarPolicy</code> property
     * @see #setVerticalScrollBarPolicy
     */
    public int getVerticalScrollBarPolicy() {
        return verticalScrollBarPolicy;
    }


    /**
     * Determines when the vertical scrollbar appears in the scrollpane.
     * Legal values are:
     * <ul>
     * <li><code>ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED</code>
     * <li><code>ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER</code>
     * <li><code>ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS</code>
     * </ul>
     *
     * @param policy one of the three values listed above
     * @exception IllegalArgumentException if <code>policy</code>
     *                          is not one of the legal values shown above
     * @see #getVerticalScrollBarPolicy
     *
     * @beaninfo
     *   preferred: true
     *       bound: true
     * description: The scrollpane vertical scrollbar policy
     *        enum: VERTICAL_SCROLLBAR_AS_NEEDED ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED
     *              VERTICAL_SCROLLBAR_NEVER ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER
     *              VERTICAL_SCROLLBAR_ALWAYS ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS
     */
    private void setVerticalScrollBarPolicy(int policy) {
        int old = verticalScrollBarPolicy;
        verticalScrollBarPolicy = policy;
        firePropertyChange("verticalScrollBarPolicy", old, policy);
        revalidate();
        repaint();
    }


    /**
     * Returns the horizontal scroll bar policy value.
     * @return the <code>horizontalScrollBarPolicy</code> property
     * @see #setHorizontalScrollBarPolicy
     */
    public int getHorizontalScrollBarPolicy() {
        return horizontalScrollBarPolicy;
    }


    /**
     * Determines when the horizontal scrollbar appears in the scrollpane.
     * The options are:<ul>
     * <li><code>ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED</code>
     * <li><code>ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER</code>
     * <li><code>ScrollPaneConstants.HORIZONTAL_SCROLLBAR_ALWAYS</code>
     * </ul>
     *
     * @param policy one of the three values listed above
     * @exception IllegalArgumentException if <code>policy</code>
     *                          is not one of the legal values shown above
     * @see #getHorizontalScrollBarPolicy
     *
     * @beaninfo
     *   preferred: true
     *       bound: true
     * description: The scrollpane scrollbar policy
     *        enum: HORIZONTAL_SCROLLBAR_AS_NEEDED ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED
     *              HORIZONTAL_SCROLLBAR_NEVER ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER
     *              HORIZONTAL_SCROLLBAR_ALWAYS ScrollPaneConstants.HORIZONTAL_SCROLLBAR_ALWAYS
     */
    private void setHorizontalScrollBarPolicy(int policy) {
        int old = horizontalScrollBarPolicy;
        horizontalScrollBarPolicy = policy;
        firePropertyChange("horizontalScrollBarPolicy", old, policy);
        revalidate();
        repaint();
    }

    public int getScrollbarVisibility() {
		boolean v = (getVerticalScrollBarPolicy() != ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER);
		boolean h = (getHorizontalScrollBarPolicy() != ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		return (v && h ? SCROLLBARS_BOTH
				: v ? SCROLLBARS_VERTICAL_ONLY : h ? SCROLLBARS_HORIZONTAL_ONLY : SCROLLBARS_NONE);
	}

	public void setCaretPosition(int pos) {
		super.setCaretPosition(pos);
		super.requestFocusInWindow();
	}

	void awtDefaults() {

		// setAutoscrolls(true);
		// setContentType("text/plain");
	}

	// API

	public String getText() {
		return super.getText();
	}

	public void setEditable(boolean b) {
		super.setEditable(b);
	}

	public void selectAll() {
		super.selectAll();
	}

	public void setTextFromUI(String t) {
		super.setText(t);
	}
	
	public void setText(String t) {
		@SuppressWarnings("unused")
		int top = /** @j2sNative this.super.ui.domNode.scrollTop ||*/0;
		super.setText(t);
		/** @j2sNative this.super.ui.domNode.scrollTop = top */		
	}

	public void insertText(String str, int pos) {
		super.insert(str, pos);
	}

	public void insert(String str, int pos) {
		super.insert(str, pos);
	}

	public void appendText(String str) {
		super.append(str);
		toEnd();
	}

	private void toEnd() {
		super.setCaretPosition(super.getText().length());
		super.requestFocusInWindow();
	}

	public void append(String str) {
		super.append(str);
		toEnd();
	}

	public void replaceRange(String str, int start, int end) {
		super.replaceRange(str, start, end);
	}

	public void replaceText(String str, int start, int end) {
		super.replaceRange(str, start, end);
	}

	public void setColumns(int columns) {
		super.setColumns(columns);
	}

	public void setRows(int rows) {
		super.setRows(rows);
	}

	public int getColumns() {
		return super.getColumns();
	}

	public int getRows() {
		return super.getRows();
	}

	@Override
	public void setBackground(Color c) {
			super.setBackground(c);
	}

	@Override
	public void setForeground(Color c) {
			super.setForeground(c);
	}

	@Override
	public void requestFocus() {
		super.requestFocus();
	}

}
