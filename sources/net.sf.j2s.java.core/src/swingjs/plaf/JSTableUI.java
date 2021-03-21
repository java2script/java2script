/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2005, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package swingjs.plaf;

import java.awt.Color;
import java.awt.Component;
import java.awt.ComponentOrientation;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.JSComponent;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.datatransfer.Transferable;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.BitSet;
import java.util.Enumeration;

import javax.swing.Action;
import javax.swing.ActionMap;
import javax.swing.CellEditor;
import javax.swing.CellRendererPane;
import javax.swing.DefaultListSelectionModel;
import javax.swing.InputMap;
import javax.swing.JCheckBox;
import javax.swing.JComponent;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.KeyStroke;
import javax.swing.ListSelectionModel;
import javax.swing.LookAndFeel;
import javax.swing.SwingUtilities;
import javax.swing.Timer;
import javax.swing.TransferHandler;
import javax.swing.UIDefaults;
import javax.swing.UIManager;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.event.MouseInputListener;
import javax.swing.plaf.UIResource;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.JTableHeader;
import javax.swing.table.TableCellEditor;
import javax.swing.table.TableCellRenderer;
import javax.swing.table.TableColumn;
import javax.swing.table.TableColumnModel;

import sun.swing.DefaultLookup;
import sun.swing.SwingUtilities2;
import sun.swing.UIAction;
import swingjs.api.js.DOMNode;

/**
 * A JavaScript equivalent for a JTable
 * 
 * @author Bob Hanson
 *
 */
public class JSTableUI extends JSPanelUI {

	static final Rectangle tmpRect = new Rectangle(), cellRect = new Rectangle(), minCell = new Rectangle(),
			maxCell = new Rectangle();

	protected JTable header;
	protected JTable table;
	private int oldrc;
	private int oldrh;
	int currentRowMin = -1, currentRowMax = -1;
	private boolean working;
	private int oldWidth;
	private int oldHeight;
	private Object oldFont;
		
	private boolean isScrolling, justLaidOut;

//	private DOMNode canvasNode;
//
//	public DOMNode getCanvasNode() {
//		return canvasNode;
//	}
	
	private DOMNode tableNode;

	public void setScrolling() {
		// from JSScrollPane
		isScrolling = true;
	}

	public JSTableUI() {
		super();
		isTable = true;
	}

	public DOMNode getDOMNode() {
		return updateDOMNode();
	}


	@Override
	public DOMNode updateDOMNode() {

		int rc = table.getRowCount();
		int rh = table.getRowHeight();

		boolean rebuild = (rc != oldrc || rh != oldrh);

		oldrh = rh;
		oldrc = rc;

		if (domNode == null) {
			domNode = newDOMObject("div", id);
			tableNode = domNode;
//			canvasNode = newDOMObject("canvas", id + "_canvas");
//			tableNode = newDOMObject("div", id + "_table");
//			domNode.appendChild(canvasNode);
//			domNode.appendChild(tableNode);
			enableJSKeys(true);
			DOMNode.setStyle(tableNode,  "outline", "none");
			// bindJSKeyEvents(domNode, true);
		}
		if (rebuild) {
			currentRowMin = currentRowMax = -1;
		}

		Dimension d = getPreferredSize(jc);
		int w = d.width;// tcm.getTotalColumnWidth();
		int h = d.height;// table.getVisibleRect().height - thh;

		if (w != oldWidth || h != oldHeight) {
			oldWidth = w;
			oldHeight = h;
			DOMNode.setStyles(tableNode, "width", w + "px", "height", h + "px");
//			DOMNode.setStyles(canvasNode, "width", w + "px", "height", h + "px");
		}
		Font font = c.getFont();
		if (!font.equals(oldFont)) {
			oldFont = font;
			setCssFont(tableNode, c.getFont());
		}
		return updateDOMNodeCUI();
	}

	@Override
	public void beginLayout() {
		super.beginLayout();
	}

	@Override
	public void setBounds(int x, int y, int w, int h, int op) {
		//if (getScrollPane() == null)
			enableTable(true);
		super.setBounds(x, y, w, h, op);
	}
	@Override
	public void endLayout() {
		super.endLayout();
		currentRowMin = currentRowMax = -1;
		justLaidOut = true;
		enableTable(true);
	}

	@Override
	public void endValidate() {
		// no need to update HTML upon validation of a table.
	}

	@Override
	public void update(Graphics g, JComponent c) {
		if (isUIDisabled)
			return;
		// create the DOM elements, if needed
		// if (!isScrolling)
		// setHTMLElement();
		// paint the backgrounds and borders, if needed
		paint(g, c);
	}

	@Override
	public void updateCursorImmediately() {
		if (isUIDisabled)
			return;
		// setHTMLElement(); // don't do this with table
		setCursor();
	}

	@Override
	protected int getContainerHeight() {
		return height = table.getParent().getHeight();
	}

	@Override
	public void setTainted() {
		if (!working)
			isTainted = true;
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		switch (prop) {
		case "model":
			currentRowMin = currentRowMax = -1;
			isLaidOut = false;
			setHTMLElement();
		    enableTable(false);
			JScrollPane sp = getScrollPane();
			if (sp != null) {
				sp.getVerticalScrollBar().setValue(0);
			}
			if (table.getRowCount() == 0) {
				setHidden(true);
			}
			return;
		case "autoCreateRowSorter":
		case "rowSorter":
		case "sorter":
		case "autoResizeMode":
		case "tableCellEditor":
		case "gridColor":
		case "preferredSize":
		case "background":
		case "ancestor":
		case "tableData":
		case "ToolTipText":
			// TODO ?
			return;
		}
		//System.out.println("JTableUI property not handled: " + prop);
		super.propertyChange(e);
	}

	private void enableTable(boolean b) {
		JSTableHeaderUI hui = this.getHeaderUI();
		if (hui != null)
			hui.setUIDisabled(!b);
		setUIDisabled(!b);
	}

	private JSTableHeaderUI getHeaderUI() {
		JTableHeader th = table.getTableHeader();
		return (th == null ? null : (JSTableHeaderUI) th.getUI());
	}


	/**
	 * Each cell is controlled by a single renderer, but each renderer may control
	 * any number of cells in any number of tables. So in this case there is no 1:1
	 * mapping of component and ui. But we do have the table/row/col to distinguish
	 * them.
	 * 
	 * @param row
	 * @param col
	 * @return
	 */
	private JSComponent getCellRendererComponent(TableCellRenderer renderer, int row, int col, int w, int h, DOMNode td,
			boolean fullPaint) {
		// SwingJS adds the idea that the default renderers need only be prepared once
		// the
		// component is known. Other renderers may operate on a component so need a
		// second
		// one.
		JSComponent cNoPrep = /** @j2sNative renderer.秘getComponent$ && renderer.秘getComponent$() || */
				null;
		JSComponent c = (cNoPrep == null ? (JSComponent) table.prepareRenderer(renderer, row, col) : cNoPrep);			
		if (c != null) {
			if (prepareCellRendererUI(c, cNoPrep != null, w, h, td, fullPaint, (JComponent) table))
				table.prepareRenderer(renderer, row, col);
		}
		return c;
	}

	static boolean prepareCellRendererUI(JSComponent c, boolean forcePrep, int w, int h, DOMNode td, boolean fullPaint, JComponent table) {
		JSComponentUI ui = c.秘getUI();
		boolean wasDisabled = ui.isUIDisabled;
		c.秘reshape(c.getX(), c.getY(), w, h, false);
		ui.setRenderer(c, w, h, null);
		ui.setTargetParent(table);
		if (fullPaint && wasDisabled || forcePrep) {
			// repeat, now that the UI is enabled
			if (wasDisabled) {
				ui.restoreCellNodes(td);
				// at this point td COULD still empty, if we wanted it to be, and
				// domNode is just an attribute of td.
			}
			ui.setTainted();
			return true;
		}
		return false;
	}

	@Override
	protected Component[] getChildren() {
		return null;
	}

	@Override
	protected int getChildCount() {
		return table.getRowCount() * table.getColumnCount();
	}

	private boolean havePainted;

	@Override
	protected void addChildrenToDOM(Component[] children, int n) {
		if (currentRowMin == -1) {
			setHidden(true);
			havePainted = false;
			int ncols = table.getColumnCount();
			int rowCount = table.getRowCount();
			getColumnWidths(true);
			int rminy, rmaxy, rminx, rmaxx;
			table.computeVisibleRect(tmpRect);
			rminx = tmpRect.x;
			rmaxx = tmpRect.x + tmpRect.width;
			int h = table.getRowHeight();

			if (getScrollPane() == null) {
				int height = 0;
				if (rowCount > 0 && ncols > 0) {
					Rectangle r = table.getCellRect(rowCount - 1, 0, true);
					height = r.y + r.height;
					DOMNode.setStyles(outerNode, "overflow", "hidden", "height", height + "px");
				}
			}

			$(tableNode).empty();
			addLocalCanvas(true);
			rminy = tmpRect.y;
			rmaxy = tmpRect.y + tmpRect.height;
			if (tmpRect.height != 0) {
				currentRowMin = 0;
				addElements(rminx, rminy, rmaxx, rmaxy, h, 0, rowCount, 0, ncols);
			}
		}
	}

	private void setHidden(boolean b) {
		DOMNode.setStyle(domNode, "visibility", b ? "hidden" : "visible");
		if (b && outerNode != null && DOMNode.getStyle(outerNode, "width") == null)
			DOMNode.setStyle(outerNode, "width", "inherit");
	}

	private int[] cw = new int[10];
	private int[] cwOld = new int[10];
    
	private void getColumnWidths(boolean isNew) {
		int ncols = table.getColumnCount();
		if (ncols > cw.length) {
			cw = new int[ncols];
			cwOld = new int[ncols];
		}
		if (isNew)
			bsRowTainted.clear();
		boolean colTainted = false;
		TableColumnModel cm = table.getColumnModel();
		for (int col = 0; col < ncols; col++) {
			int w = cw[col] = cm.getColumn(col).getWidth();
			if (!isNew && cwOld[col] != w) {
				colTainted = true;
			}
			cwOld[col] = w;
		}
		if (colTainted)
			bsRowTainted.set(0, table.getRowCount());
	}

	/**
	 * Add rows and columns to the domNode as necessary to complete the specified
	 * row and column set.
	 * 
	 * @param rminx
	 * @param rminy
	 * @param rmaxx
	 * @param rmaxy
	 * @param cw
	 * @param h
	 * @param row1
	 * @param row2
	 * @param col1
	 * @param col2
	 */
	private DOMNode addElements(int rminx, int rminy, int rmaxx, int rmaxy, int h, int row1, int row2,
			int col1, int col2) {
		int col, tx0;
		for (col = 0, tx0 = 0; col < col1; tx0 += cw[col++]) {
			// loop to first column
		}
		for (int row = row1, ty = row1 * h; row < row2 && ty < rmaxy; row++, ty += h) {
			if (ty + h < rminy)
				continue;
			String rid = id + "_tab_row" + row;
			// Note that rows will end up in unpredictable order, but that does not matter.
			// All that matters is that they have the right y and height value.
			DOMNode tr = DOMNode.getElement(rid);
			boolean rowExists = (tr != null);
			if (!rowExists) {
				tr = DOMNode.createElement("div", rid);
				tableNode.appendChild(tr);
			}
			DOMNode.setStyle(tr, "height", h + "px");
			col = col1;
			for (int w, tx = tx0; col < col2 && tx < rmaxx; col++, tx += w) {
				w = cw[col];
				if (tx + w < rminx)
					continue;
				DOMNode td = CellHolder.findOrCreateNode((JSComponentUI) this, row, col, tx, ty, w, tr); 
				updateCellNode(td, row, col, w, h);
				if (rminx < 0)
					return td;
			}
		}
		return null;
	}

	private void updateCellNode(DOMNode td, int row, int col, int w, int h) {
		JSComponent c = (JSComponent) getCellRendererComponent(table.getCellRenderer(row, col), row, col, w, h, td, true);
		if (c != null)
			CellHolder.updateCellNode(td, c, -1, -1);
	}

	JComponent editorComp;

//
//	private Boolean ttipEnabled;
//
//
//
//
//	private MouseEvent me;

	public void prepareDOMEditor(boolean starting, int row, int col) {
		if (editorComp != null) {
			editorComp.setVisible(true);
			editorComp.setVisible(false);
		}
		editorComp = (JComponent) table.getEditorComponent();
		if (starting) {
//		  
//			boolean haveToolTip = /** @j2sNative !!javax.swing.ToolTipManager || */false;
//			ttipEnabled = new Boolean(haveToolTip && ToolTipManager.sharedInstance().isEnabled());
//			ToolTipManager.sharedInstance().setEnabled(false);
			if (editorComp != null) {
				editorComp.setVisible(false);
				editorComp.setVisible(true);
				notifyEntry(false);
			}
		} else { 
			row = table.getEditingRow();
			col = table.getEditingColumn();
			if (col >= table.getColumnCount())
				return;
			DOMNode td = CellHolder.findCellNode(this, null, row, col);
			if (td == null) {
				td = addElement(row, col, table.getRowHeight());
			}
			updateCellNode(td, row, col, 0, 0);
			repaintCell(row, col);
			notifyEntry(true);
//			if (ttipEnabled == Boolean.TRUE)
//				ToolTipManager.sharedInstance().setEnabled(true);
//			ttipEnabled = null;
		}
	}

	/*
	 * Copyright 1997-2007 Sun Microsystems, Inc. All Rights Reserved. DO NOT ALTER
	 * OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
	 *
	 * This code is free software; you can redistribute it and/or modify it under
	 * the terms of the GNU General Public License version 2 only, as published by
	 * the Free Software Foundation. Sun designates this particular file as subject
	 * to the "Classpath" exception as provided by Sun in the LICENSE file that
	 * accompanied this code.
	 *
	 * This code is distributed in the hope that it will be useful, but WITHOUT ANY
	 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
	 * A PARTICULAR PURPOSE. See the GNU General Public License version 2 for more
	 * details (a copy is included in the LICENSE file that accompanied this code).
	 *
	 * You should have received a copy of the GNU General Public License version 2
	 * along with this work; if not, write to the Free Software Foundation, Inc., 51
	 * Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
	 *
	 * Please contact Sun Microsystems, Inc., 4150 Network Circle, Santa Clara, CA
	 * 95054 USA or visit www.sun.com if you need additional information or have any
	 * questions.
	 */

	private DOMNode addElement(int row, int col, int h) {
		return 	addElements(Integer.MIN_VALUE, Integer.MIN_VALUE, Integer.MAX_VALUE, Integer.MAX_VALUE, h, row,
		row + 1, col, col + 1);
	}

	private void notifyEntry(boolean isEntry) {
		table.dispatchEvent(new MouseEvent(table, (isEntry ? MouseEvent.MOUSE_ENTERED : MouseEvent.MOUSE_EXITED),
				System.currentTimeMillis(), 0, -1, -1, 0, false));
	}

	private static final StringBuilder BASELINE_COMPONENT_KEY = new StringBuilder("Table.baselineComponent");

	//
	// Instance Variables
	//

	protected CellRendererPane rendererPane;

	// Listeners that are attached to the JTable
	protected KeyListener keyListener;
	protected FocusListener focusListener;
	MouseInputListener mouseInputListener;

	private Handler handler;

	/**
	 * Local cache of Table's client property "Table.isFileList"
	 */
	private boolean isFileList = false;
	public boolean dragging;

	private boolean isNewModel;

	//
	// Helper class for keyboard actions
	//

	private static class Actions extends UIAction {
		private static final String CANCEL_EDITING = "cancel";
		private static final String SELECT_ALL = "selectAll";
		private static final String CLEAR_SELECTION = "clearSelection";
		private static final String START_EDITING = "startEditing";

		private static final String NEXT_ROW = "selectNextRow";
		private static final String NEXT_ROW_CELL = "selectNextRowCell";
		private static final String NEXT_ROW_EXTEND_SELECTION = "selectNextRowExtendSelection";
		private static final String NEXT_ROW_CHANGE_LEAD = "selectNextRowChangeLead";
		private static final String PREVIOUS_ROW = "selectPreviousRow";
		private static final String PREVIOUS_ROW_CELL = "selectPreviousRowCell";
		private static final String PREVIOUS_ROW_EXTEND_SELECTION = "selectPreviousRowExtendSelection";
		private static final String PREVIOUS_ROW_CHANGE_LEAD = "selectPreviousRowChangeLead";

		private static final String NEXT_COLUMN = "selectNextColumn";
		private static final String NEXT_COLUMN_CELL = "selectNextColumnCell";
		private static final String NEXT_COLUMN_EXTEND_SELECTION = "selectNextColumnExtendSelection";
		private static final String NEXT_COLUMN_CHANGE_LEAD = "selectNextColumnChangeLead";
		private static final String PREVIOUS_COLUMN = "selectPreviousColumn";
		private static final String PREVIOUS_COLUMN_CELL = "selectPreviousColumnCell";
		private static final String PREVIOUS_COLUMN_EXTEND_SELECTION = "selectPreviousColumnExtendSelection";
		private static final String PREVIOUS_COLUMN_CHANGE_LEAD = "selectPreviousColumnChangeLead";

		private static final String SCROLL_LEFT_CHANGE_SELECTION = "scrollLeftChangeSelection";
		private static final String SCROLL_LEFT_EXTEND_SELECTION = "scrollLeftExtendSelection";
		private static final String SCROLL_RIGHT_CHANGE_SELECTION = "scrollRightChangeSelection";
		private static final String SCROLL_RIGHT_EXTEND_SELECTION = "scrollRightExtendSelection";

		private static final String SCROLL_UP_CHANGE_SELECTION = "scrollUpChangeSelection";
		private static final String SCROLL_UP_EXTEND_SELECTION = "scrollUpExtendSelection";
		private static final String SCROLL_DOWN_CHANGE_SELECTION = "scrollDownChangeSelection";
		private static final String SCROLL_DOWN_EXTEND_SELECTION = "scrollDownExtendSelection";

		private static final String FIRST_COLUMN = "selectFirstColumn";
		private static final String FIRST_COLUMN_EXTEND_SELECTION = "selectFirstColumnExtendSelection";
		private static final String LAST_COLUMN = "selectLastColumn";
		private static final String LAST_COLUMN_EXTEND_SELECTION = "selectLastColumnExtendSelection";

		private static final String FIRST_ROW = "selectFirstRow";
		private static final String FIRST_ROW_EXTEND_SELECTION = "selectFirstRowExtendSelection";
		private static final String LAST_ROW = "selectLastRow";
		private static final String LAST_ROW_EXTEND_SELECTION = "selectLastRowExtendSelection";

		// add the lead item to the selection without changing lead or anchor
		private static final String ADD_TO_SELECTION = "addToSelection";

		// toggle the selected state of the lead item and move the anchor to it
		private static final String TOGGLE_AND_ANCHOR = "toggleAndAnchor";

		// extend the selection to the lead item
		private static final String EXTEND_TO = "extendTo";

		// move the anchor to the lead and ensure only that item is selected
		private static final String MOVE_SELECTION_TO = "moveSelectionTo";

		// give focus to the JTableHeader, if one exists
		private static final String FOCUS_HEADER = "focusHeader";

		protected int dx;
		protected int dy;
		protected boolean extend;
		protected boolean inSelection;

		// horizontally, forwards always means right,
		// regardless of component orientation
		protected boolean forwards;
		protected boolean vertically;
		protected boolean toLimit;

		protected int leadRow;
		protected int leadColumn;

		Actions(String name) {
			super(name);
		}

		Actions(String name, int dx, int dy, boolean extend, boolean inSelection) {
			super(name);

			// Actions spcifying true for "inSelection" are
			// fairly sensitive to bad parameter values. They require
			// that one of dx and dy be 0 and the other be -1 or 1.
			// Bogus parameter values could cause an infinite loop.
			// To prevent any problems we massage the params here
			// and complain if we get something we can't deal with.
			if (inSelection) {
				this.inSelection = true;

				// look at the sign of dx and dy only
				dx = sign(dx);
				dy = sign(dy);

				// make sure one is zero, but not both
				assert (dx == 0 || dy == 0) && !(dx == 0 && dy == 0);
			}

			this.dx = dx;
			this.dy = dy;
			this.extend = extend;
		}

		Actions(String name, boolean extend, boolean forwards, boolean vertically, boolean toLimit) {
			this(name, 0, 0, extend, false);
			this.forwards = forwards;
			this.vertically = vertically;
			this.toLimit = toLimit;
		}

		private static int clipToRange(int i, int a, int b) {
			return Math.min(Math.max(i, a), b - 1);
		}

		private void moveWithinTableRange(JTable table, int dx, int dy) {
			leadRow = clipToRange(leadRow + dy, 0, table.getRowCount());
			leadColumn = clipToRange(leadColumn + dx, 0, table.getColumnCount());
		}

		private static int sign(int num) {
			return (num < 0) ? -1 : ((num == 0) ? 0 : 1);
		}

		/**
		 * Called to move within the selected range of the given JTable. This method
		 * uses the table's notion of selection, which is important to allow the user to
		 * navigate between items visually selected on screen. This notion may or may
		 * not be the same as what could be determined by directly querying the
		 * selection models. It depends on certain table properties (such as whether or
		 * not row or column selection is allowed). When performing modifications, it is
		 * recommended that caution be taken in order to preserve the intent of this
		 * method, especially when deciding whether to query the selection models or
		 * interact with JTable directly.
		 */
		private boolean moveWithinSelectedRange(JTable table, int dx, int dy, ListSelectionModel rsm,
				ListSelectionModel csm) {

			// Note: The Actions constructor ensures that only one of
			// dx and dy is 0, and the other is either -1 or 1

			// find out how many items the table is showing as selected
			// and the range of items to navigate through
			int totalCount;
			int minX, maxX, minY, maxY;

			boolean rs = table.getRowSelectionAllowed();
			boolean cs = table.getColumnSelectionAllowed();

			// both column and row selection
			if (rs && cs) {
				totalCount = table.getSelectedRowCount() * table.getSelectedColumnCount();
				minX = csm.getMinSelectionIndex();
				maxX = csm.getMaxSelectionIndex();
				minY = rsm.getMinSelectionIndex();
				maxY = rsm.getMaxSelectionIndex();
				// row selection only
			} else if (rs) {
				totalCount = table.getSelectedRowCount();
				minX = 0;
				maxX = table.getColumnCount() - 1;
				minY = rsm.getMinSelectionIndex();
				maxY = rsm.getMaxSelectionIndex();
				// column selection only
			} else if (cs) {
				totalCount = table.getSelectedColumnCount();
				minX = csm.getMinSelectionIndex();
				maxX = csm.getMaxSelectionIndex();
				minY = 0;
				maxY = table.getRowCount() - 1;
				// no selection allowed
			} else {
				totalCount = 0;
				// A bogus assignment to stop javac from complaining
				// about unitialized values. In this case, these
				// won't even be used.
				minX = maxX = minY = maxY = 0;
			}

			// For some cases, there is no point in trying to stay within the
			// selected area. Instead, move outside the selection, wrapping at
			// the table boundaries. The cases are:
			boolean stayInSelection;

			// - nothing selected
			if (totalCount == 0 ||
			// - one item selected, and the lead is already selected
					(totalCount == 1 && table.isCellSelected(leadRow, leadColumn))) {

				stayInSelection = false;

				maxX = table.getColumnCount() - 1;
				maxY = table.getRowCount() - 1;

				// the mins are calculated like this in case the max is -1
				minX = Math.min(0, maxX);
				minY = Math.min(0, maxY);
			} else {
				stayInSelection = true;
			}

			// the algorithm below isn't prepared to deal with -1 lead/anchor
			// so massage appropriately here first
			if (dy == 1 && leadColumn == -1) {
				leadColumn = minX;
				leadRow = -1;
			} else if (dx == 1 && leadRow == -1) {
				leadRow = minY;
				leadColumn = -1;
			} else if (dy == -1 && leadColumn == -1) {
				leadColumn = maxX;
				leadRow = maxY + 1;
			} else if (dx == -1 && leadRow == -1) {
				leadRow = maxY;
				leadColumn = maxX + 1;
			}

			// In cases where the lead is not within the search range,
			// we need to bring it within one cell for the the search
			// to work properly. Check these here.
			leadRow = Math.min(Math.max(leadRow, minY - 1), maxY + 1);
			leadColumn = Math.min(Math.max(leadColumn, minX - 1), maxX + 1);

			// find the next position, possibly looping until it is selected
			do {
				calcNextPos(dx, minX, maxX, dy, minY, maxY);
			} while (stayInSelection && !table.isCellSelected(leadRow, leadColumn));

			return stayInSelection;
		}

		/**
		 * Find the next lead row and column based on the given dx/dy and max/min
		 * values.
		 */
		private void calcNextPos(int dx, int minX, int maxX, int dy, int minY, int maxY) {

			if (dx != 0) {
				leadColumn += dx;
				if (leadColumn > maxX) {
					leadColumn = minX;
					leadRow++;
					if (leadRow > maxY) {
						leadRow = minY;
					}
				} else if (leadColumn < minX) {
					leadColumn = maxX;
					leadRow--;
					if (leadRow < minY) {
						leadRow = maxY;
					}
				}
			} else {
				leadRow += dy;
				if (leadRow > maxY) {
					leadRow = minY;
					leadColumn++;
					if (leadColumn > maxX) {
						leadColumn = minX;
					}
				} else if (leadRow < minY) {
					leadRow = maxY;
					leadColumn--;
					if (leadColumn < minX) {
						leadColumn = maxX;
					}
				}
			}
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			String key = getName();
			JTable table = (JTable) e.getSource();

			ListSelectionModel rsm = table.getSelectionModel();
			leadRow = getAdjustedLead(table, true, rsm);

			ListSelectionModel csm = table.getColumnModel().getSelectionModel();
			leadColumn = getAdjustedLead(table, false, csm);

			if (key == SCROLL_LEFT_CHANGE_SELECTION || // Paging Actions
					key == SCROLL_LEFT_EXTEND_SELECTION || key == SCROLL_RIGHT_CHANGE_SELECTION
					|| key == SCROLL_RIGHT_EXTEND_SELECTION || key == SCROLL_UP_CHANGE_SELECTION
					|| key == SCROLL_UP_EXTEND_SELECTION || key == SCROLL_DOWN_CHANGE_SELECTION
					|| key == SCROLL_DOWN_EXTEND_SELECTION || key == FIRST_COLUMN
					|| key == FIRST_COLUMN_EXTEND_SELECTION || key == FIRST_ROW || key == FIRST_ROW_EXTEND_SELECTION
					|| key == LAST_COLUMN || key == LAST_COLUMN_EXTEND_SELECTION || key == LAST_ROW
					|| key == LAST_ROW_EXTEND_SELECTION) {
				if (toLimit) {
					if (vertically) {
						int rowCount = table.getRowCount();
						this.dx = 0;
						this.dy = forwards ? rowCount : -rowCount;
					} else {
						int colCount = table.getColumnCount();
						this.dx = forwards ? colCount : -colCount;
						this.dy = 0;
					}
				} else {
					if (((JSTableUI) table.秘getUI()).getScrollPane() == null) {
						return;
					}

					Dimension delta = table.getParent().getSize();

					if (vertically) {
						table._getCellRect(leadRow, 0, true, tmpRect);
						if (forwards) {
							// scroll by at least one cell
							tmpRect.y += Math.max(delta.height, tmpRect.height);
						} else {
							tmpRect.y -= delta.height;
						}

						this.dx = 0;
						int newRow = table.rowAtPoint(tmpRect.getLocation());
						if (newRow == -1 && forwards) {
							newRow = table.getRowCount();
						}
						this.dy = newRow - leadRow;
					} else {
						table._getCellRect(0, leadColumn, true, tmpRect);

						if (forwards) {
							// scroll by at least one cell
							tmpRect.x += Math.max(delta.width, tmpRect.width);
						} else {
							tmpRect.x -= delta.width;
						}

						int newColumn = table.columnAtPoint(tmpRect.getLocation());
						if (newColumn == -1) {
							boolean ltr = table.getComponentOrientation().isLeftToRight();

							newColumn = forwards ? (ltr ? table.getColumnCount() : 0)
									: (ltr ? 0 : table.getColumnCount());

						}
						this.dx = newColumn - leadColumn;
						this.dy = 0;
					}
				}
			}
			if (key == NEXT_ROW || // Navigate Actions
					key == NEXT_ROW_CELL || key == NEXT_ROW_EXTEND_SELECTION || key == NEXT_ROW_CHANGE_LEAD
					|| key == NEXT_COLUMN || key == NEXT_COLUMN_CELL || key == NEXT_COLUMN_EXTEND_SELECTION
					|| key == NEXT_COLUMN_CHANGE_LEAD || key == PREVIOUS_ROW || key == PREVIOUS_ROW_CELL
					|| key == PREVIOUS_ROW_EXTEND_SELECTION || key == PREVIOUS_ROW_CHANGE_LEAD || key == PREVIOUS_COLUMN
					|| key == PREVIOUS_COLUMN_CELL || key == PREVIOUS_COLUMN_EXTEND_SELECTION
					|| key == PREVIOUS_COLUMN_CHANGE_LEAD ||
					// Paging Actions.
					key == SCROLL_LEFT_CHANGE_SELECTION || key == SCROLL_LEFT_EXTEND_SELECTION
					|| key == SCROLL_RIGHT_CHANGE_SELECTION || key == SCROLL_RIGHT_EXTEND_SELECTION
					|| key == SCROLL_UP_CHANGE_SELECTION || key == SCROLL_UP_EXTEND_SELECTION
					|| key == SCROLL_DOWN_CHANGE_SELECTION || key == SCROLL_DOWN_EXTEND_SELECTION || key == FIRST_COLUMN
					|| key == FIRST_COLUMN_EXTEND_SELECTION || key == FIRST_ROW || key == FIRST_ROW_EXTEND_SELECTION
					|| key == LAST_COLUMN || key == LAST_COLUMN_EXTEND_SELECTION || key == LAST_ROW
					|| key == LAST_ROW_EXTEND_SELECTION) {

				if (table.isEditing() && !table.getCellEditor().stopCellEditing()) {
					return;
				}

				// Unfortunately, this strategy introduces bugs because
				// of the asynchronous nature of requestFocus() call below.
				// Introducing a delay with invokeLater() makes this work
				// in the typical case though race conditions then allow
				// focus to disappear altogether. The right solution appears
				// to be to fix requestFocus() so that it queues a request
				// for the focus regardless of who owns the focus at the
				// time the call to requestFocus() is made. The optimisation
				// to ignore the call to requestFocus() when the component
				// already has focus may ligitimately be made as the
				// request focus event is dequeued, not before.

				// boolean wasEditingWithFocus = table.isEditing() &&
				// table.getEditorComponent().isFocusOwner();

				boolean changeLead = false;
				if (key == NEXT_ROW_CHANGE_LEAD || key == PREVIOUS_ROW_CHANGE_LEAD) {
					changeLead = (rsm.getSelectionMode() == ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);
				} else if (key == NEXT_COLUMN_CHANGE_LEAD || key == PREVIOUS_COLUMN_CHANGE_LEAD) {
					changeLead = (csm.getSelectionMode() == ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);
				}

				if (changeLead) {
					moveWithinTableRange(table, dx, dy);
					if (dy != 0) {
						// casting should be safe since the action is only enabled
						// for DefaultListSelectionModel
						((DefaultListSelectionModel) rsm).moveLeadSelectionIndex(leadRow);
						if (getAdjustedLead(table, false, csm) == -1 && table.getColumnCount() > 0) {

							((DefaultListSelectionModel) csm).moveLeadSelectionIndex(0);
						}
					} else {
						// casting should be safe since the action is only enabled
						// for DefaultListSelectionModel
						((DefaultListSelectionModel) csm).moveLeadSelectionIndex(leadColumn);
						if (getAdjustedLead(table, true, rsm) == -1 && table.getRowCount() > 0) {

							((DefaultListSelectionModel) rsm).moveLeadSelectionIndex(0);
						}
					}

					table._getCellRect(leadRow, leadColumn, false, tmpRect);
					table.scrollRectToVisible(tmpRect);
				} else if (!inSelection) {
					moveWithinTableRange(table, dx, dy);
					table.changeSelection(leadRow, leadColumn, false, extend);
				} else {
					if (table.getRowCount() <= 0 || table.getColumnCount() <= 0) {
						// bail - don't try to move selection on an empty table
						return;
					}

					if (moveWithinSelectedRange(table, dx, dy, rsm, csm)) {
						// this is the only way we have to set both the lead
						// and the anchor without changing the selection
						if (rsm.isSelectedIndex(leadRow)) {
							rsm.addSelectionInterval(leadRow, leadRow);
						} else {
							rsm.removeSelectionInterval(leadRow, leadRow);
						}

						if (csm.isSelectedIndex(leadColumn)) {
							csm.addSelectionInterval(leadColumn, leadColumn);
						} else {
							csm.removeSelectionInterval(leadColumn, leadColumn);
						}

						table._getCellRect(leadRow, leadColumn, false, cellRect);
						if (cellRect != null) {
							table.scrollRectToVisible(cellRect);
						}
					} else {
						table.changeSelection(leadRow, leadColumn, false, false);
					}
				}

				/*
				 * if (wasEditingWithFocus) { table.editCellAt(leadRow, leadColumn); final
				 * Component editorComp = table.getEditorComponent(); if (editorComp != null) {
				 * SwingUtilities.invokeLater(new Runnable() { public void run() {
				 * editorComp.requestFocus(); } }); } }
				 */
			} else if (key == CANCEL_EDITING) {
				table.removeEditor();
			} else if (key == SELECT_ALL) {
				table.selectAll();
			} else if (key == CLEAR_SELECTION) {
				table.clearSelection();
			} else if (key == START_EDITING) {
				if (!table.hasFocus()) {
					CellEditor cellEditor = table.getCellEditor();
					if (cellEditor != null && !cellEditor.stopCellEditing()) {
						return;
					}
					table.requestFocus();
					return;
				}
				table.editCellAt(leadRow, leadColumn, e);
				Component editorComp = table.getEditorComponent();
				if (editorComp != null) {
					editorComp.requestFocus();
				}
			} else if (key == ADD_TO_SELECTION) {
				if (!table.isCellSelected(leadRow, leadColumn)) {
					int oldAnchorRow = rsm.getAnchorSelectionIndex();
					int oldAnchorColumn = csm.getAnchorSelectionIndex();
					rsm.setValueIsAdjusting(true);
					csm.setValueIsAdjusting(true);
					table.changeSelection(leadRow, leadColumn, true, false);
					rsm.setAnchorSelectionIndex(oldAnchorRow);
					csm.setAnchorSelectionIndex(oldAnchorColumn);
					rsm.setValueIsAdjusting(false);
					csm.setValueIsAdjusting(false);
				}
			} else if (key == TOGGLE_AND_ANCHOR) {
				table.changeSelection(leadRow, leadColumn, true, false);
			} else if (key == EXTEND_TO) {
				table.changeSelection(leadRow, leadColumn, false, true);
			} else if (key == MOVE_SELECTION_TO) {
				table.changeSelection(leadRow, leadColumn, false, false);
			} else if (key == FOCUS_HEADER) {
				JTableHeader th = table.getTableHeader();
				if (th != null) {
					// Set the header's selected column to match the table.
					int col = table.getSelectedColumn();
					if (col >= 0) {
						JSTableHeaderUI thUI = (JSTableHeaderUI) th.getUI();
						thUI.selectColumn(col);
					}

					// Then give the header the focus.
					th.requestFocusInWindow();
				}
			}
		}

		@Override
		public boolean isEnabled(Object sender) {
			String key = getName();

			if (sender instanceof JTable
					&& Boolean.TRUE.equals(((JTable) sender).getClientProperty("Table.isFileList"))) {
				if (key == NEXT_COLUMN || key == NEXT_COLUMN_CELL || key == NEXT_COLUMN_EXTEND_SELECTION
						|| key == NEXT_COLUMN_CHANGE_LEAD || key == PREVIOUS_COLUMN || key == PREVIOUS_COLUMN_CELL
						|| key == PREVIOUS_COLUMN_EXTEND_SELECTION || key == PREVIOUS_COLUMN_CHANGE_LEAD
						|| key == SCROLL_LEFT_CHANGE_SELECTION || key == SCROLL_LEFT_EXTEND_SELECTION
						|| key == SCROLL_RIGHT_CHANGE_SELECTION || key == SCROLL_RIGHT_EXTEND_SELECTION
						|| key == FIRST_COLUMN || key == FIRST_COLUMN_EXTEND_SELECTION || key == LAST_COLUMN
						|| key == LAST_COLUMN_EXTEND_SELECTION || key == NEXT_ROW_CELL || key == PREVIOUS_ROW_CELL) {

					return false;
				}
			}

			if (key == CANCEL_EDITING && sender instanceof JTable) {
				return ((JTable) sender).isEditing();
			} else if (key == NEXT_ROW_CHANGE_LEAD || key == PREVIOUS_ROW_CHANGE_LEAD) {
				// discontinuous selection actions are only enabled for
				// DefaultListSelectionModel
				return sender != null && ((JTable) sender).getSelectionModel() instanceof DefaultListSelectionModel;
			} else if (key == NEXT_COLUMN_CHANGE_LEAD || key == PREVIOUS_COLUMN_CHANGE_LEAD) {
				// discontinuous selection actions are only enabled for
				// DefaultListSelectionModel
				return sender != null
						&& ((JTable) sender).getColumnModel().getSelectionModel() instanceof DefaultListSelectionModel;
			} else if (key == ADD_TO_SELECTION && sender instanceof JTable) {
				// This action is typically bound to SPACE.
				// If the table is already in an editing mode, SPACE should
				// simply enter a space character into the table, and not
				// select a cell. Likewise, if the lead cell is already selected
				// then hitting SPACE should just enter a space character
				// into the cell and begin editing. In both of these cases
				// this action will be disabled.
				JTable table = (JTable) sender;
				int leadRow = getAdjustedLead(table, true);
				int leadCol = getAdjustedLead(table, false);
				return !(table.isEditing() || table.isCellSelected(leadRow, leadCol));
			} else if (key == FOCUS_HEADER && sender instanceof JTable) {
				JTable table = (JTable) sender;
				return table.getTableHeader() != null;
			}

			return true;
		}
	}

	//
	// The Table's Key listener
	//

	/**
	 * This inner class is marked &quot;public&quot; due to a compiler bug. This
	 * class should be treated as a &quot;protected&quot; inner class. Instantiate
	 * it only within subclasses of BasicTableUI.
	 * <p>
	 * As of Java 2 platform v1.3 this class is no longer used. Instead
	 * <code>JTable</code> overrides <code>processKeyBinding</code> to dispatch the
	 * event to the current <code>TableCellEditor</code>.
	 */
	public class KeyHandler implements KeyListener {
		// NOTE: This class exists only for backward compatability. All
		// its functionality has been moved into Handler. If you need to add
		// new functionality add it to the Handler, but make sure this
		// class calls into the Handler.
		@Override
		public void keyPressed(KeyEvent e) {
			getHandler().keyPressed(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {
			getHandler().keyReleased(e);
		}

		@Override
		public void keyTyped(KeyEvent e) {
			getHandler().keyTyped(e);
		}
	}

	//
	// The Table's focus listener
	//

	/**
	 * This inner class is marked &quot;public&quot; due to a compiler bug. This
	 * class should be treated as a &quot;protected&quot; inner class. Instantiate
	 * it only within subclasses of BasicTableUI.
	 */
	public class FocusHandler implements FocusListener {
		// NOTE: This class exists only for backward compatability. All
		// its functionality has been moved into Handler. If you need to add
		// new functionality add it to the Handler, but make sure this
		// class calls into the Handler.
		@Override
		public void focusGained(FocusEvent e) {
			getHandler().focusGained(e);
		}

		@Override
		public void focusLost(FocusEvent e) {
			getHandler().focusLost(e);
		}
	}

	//
	// The Table's mouse and mouse motion listeners
	//

	/**
	 * This inner class is marked &quot;public&quot; due to a compiler bug. This
	 * class should be treated as a &quot;protected&quot; inner class. Instantiate
	 * it only within subclasses of BasicTableUI.
	 */
	public class MouseInputHandler implements MouseInputListener {
		// NOTE: This class exists only for backward compatability. All
		// its functionality has been moved into Handler. If you need to add
		// new functionality add it to the Handler, but make sure this
		// class calls into the Handler.
		@Override
		public void mouseClicked(MouseEvent e) {
			getHandler().mouseClicked(e);
		}

		@Override
		public void mousePressed(MouseEvent e) {
			getHandler().mousePressed(e);
		}

		@Override
		public void mouseReleased(MouseEvent e) {
			getHandler().mouseReleased(e);
		}

		@Override
		public void mouseEntered(MouseEvent e) {
			getHandler().mouseEntered(e);
		}

		@Override
		public void mouseExited(MouseEvent e) {
			getHandler().mouseExited(e);
		}

		@Override
		public void mouseMoved(MouseEvent e) {
			getHandler().mouseMoved(e);
		}

		@Override
		public void mouseDragged(MouseEvent e) {
			getHandler().mouseDragged(e);
		}
	}

	private class Handler implements KeyListener, FocusListener, MouseInputListener, PropertyChangeListener,
			ListSelectionListener, ActionListener
	// ,
	// BeforeDrag
	{

		// FocusListener
		private void repaintLeadCell() {
			int lr = getAdjustedLead(table, true);
			int lc = getAdjustedLead(table, false);

			if (lr < 0 || lc < 0) {
				return;
			}
			repaintCell(lr, lc);
		}

		@Override
		public void focusGained(FocusEvent e) {
			repaintLeadCell();
		}

		@Override
		public void focusLost(FocusEvent e) {
			repaintLeadCell();
		}

		// KeyListener
		@Override
		public void keyPressed(KeyEvent e) {
		}

		@Override
		public void keyReleased(KeyEvent e) {
		}

		@Override
		public void keyTyped(KeyEvent e) {
			KeyStroke keyStroke = KeyStroke.getKeyStroke(e.getKeyChar(), e.getModifiers());

			// We register all actions using ANCESTOR_OF_FOCUSED_COMPONENT
			// which means that we might perform the appropriate action
			// in the table and then forward it to the editor if the editor
			// had focus. Make sure this doesn't happen by checking our
			// InputMaps.
			InputMap map = table.getInputMap(JComponent.WHEN_FOCUSED);
			if (map != null && map.get(keyStroke) != null) {
				return;
			}
			map = table.getInputMap(JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
			if (map != null && map.get(keyStroke) != null) {
				return;
			}

			keyStroke = KeyStroke.getKeyStrokeForEvent(e);

			// The AWT seems to generate an unconsumed \r event when
			// ENTER (\n) is pressed.
			if (e.getKeyChar() == '\r') {
				return;
			}

			int leadRow = getAdjustedLead(table, true);
			int leadColumn = getAdjustedLead(table, false);
			if (leadRow != -1 && leadColumn != -1 && !table.isEditing()) {
				if (!table.editCellAt(leadRow, leadColumn)) {
					return;
				}
			}

			// Forwarding events this way seems to put the component
			// in a state where it believes it has focus. In reality
			// the table retains focus - though it is difficult for
			// a user to tell, since the caret is visible and flashing.

			// Calling table.requestFocus() here, to get the focus back to
			// the table, seems to have no effect.

			Component editorComp = table.getEditorComponent();
			if (table.isEditing() && editorComp != null) {
				if (editorComp instanceof JComponent) {
					JComponent component = (JComponent) editorComp;
					map = component.getInputMap(JComponent.WHEN_FOCUSED);
					Object binding = (map != null) ? map.get(keyStroke) : null;
					if (binding == null) {
						map = component.getInputMap(JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
						binding = (map != null) ? map.get(keyStroke) : null;
					}
					if (binding != null) {
						ActionMap am = component.getActionMap();
						Action action = (am != null) ? am.get(binding) : null;
						if (action != null
								&& SwingUtilities.notifyAction(action, keyStroke, e, component, e.getModifiers())) {
							e.consume();
						}
					}
				}
			}
		}

		// MouseInputListener

		// Component receiving mouse events during editing.
		// May not be editorComponent.
		private Component dispatchComponent;

		private boolean repostEvent(MouseEvent e) {
			// Check for isEditing() in case another event has
			// caused the editor to be removed. See bug #4306499.
			if (dispatchComponent == null || !table.isEditing()) {
				return false;
			}
			int row = table.getEditingRow(), column = table.getEditingColumn();
			if (dispatchComponent instanceof JCheckBox)
				((JCheckBox) dispatchComponent).setSelected(((Boolean)table.getValueAt(row, column)).booleanValue());
			MouseEvent e2 = SwingUtilities.convertMouseEvent(table, e, dispatchComponent);
			dispatchComponent.dispatchEvent(e2);
			return true;
		}

		@Override
		public void mouseClicked(MouseEvent e) {
		}

		private void setDispatchComponent(MouseEvent e) {

			Component editorComponent = table.getEditorComponent();
			Point p = e.getPoint();
			Point p2 = SwingUtilities.convertPoint(table, p, editorComponent);
			dispatchComponent = SwingUtilities.getDeepestComponentAt(editorComponent, p2.x, p2.y);			
			
//			dispatchComponent = JSMouse.getJ2SEventTarget(e);
			if (dispatchComponent == null && table.isEditing()) {
				dispatchComponent = table.getEditorComponent();
			}
			 SwingUtilities2.setSkipClickCount(dispatchComponent,
			 e.getClickCount() - 1);
		}

		private void setValueIsAdjusting(boolean flag) {
			table.getSelectionModel().setValueIsAdjusting(flag);
			table.getColumnModel().getSelectionModel().setValueIsAdjusting(flag);
		}

		// The row and column where the press occurred and the
		// press event itself
		private int pressedRow;
		private int pressedCol;
		private MouseEvent pressedEvent;

		// Whether or not the mouse press (which is being considered as part
		// of a drag sequence) also caused the selection change to be fully
		// processed.
		private boolean dragPressDidSelection;

		// Set to true when a drag gesture has been fully recognized and DnD
		// begins. Use this to ignore further mouse events which could be
		// delivered if DnD is cancelled (via ESCAPE for example)
		private boolean dragStarted;

//		// Whether or not we should start the editing timer on release
//		private boolean shouldStartTimer;

		// To cache the return value of pointOutsidePrefSize since we use
		// it multiple times.
		private boolean outsidePrefSize;

		// Used to delay the start of editing.
		private Timer timer = null;

		private boolean canStartDrag() {
			if (pressedRow == -1 || pressedCol == -1) {
				return false;
			}

			if (isFileList) {
				return !outsidePrefSize;
			}

			// if this is a single selection table
			if ((table.getSelectionModel().getSelectionMode() == ListSelectionModel.SINGLE_SELECTION) && (table
					.getColumnModel().getSelectionModel().getSelectionMode() == ListSelectionModel.SINGLE_SELECTION)) {

				return true;
			}

			return table.isCellSelected(pressedRow, pressedCol);
		}

		@Override
		public void mousePressed(MouseEvent e) {
			if (SwingUtilities2.shouldIgnore(e, table)) {
				return;
			}

			if (table.isEditing()) {
				if (!table.getCellEditor().stopCellEditing()) {
					Component editorComponent = table.getEditorComponent();
					if (editorComponent != null && !editorComponent.hasFocus()) {
						SwingUtilities2.compositeRequestFocus(editorComponent);
					}
					return;
				}
			}

			Point p = e.getPoint();
			pressedRow = table.rowAtPoint(p);
			pressedCol = table.columnAtPoint(p);
			outsidePrefSize = pointOutsidePrefSize(pressedRow, pressedCol, p);

//			if (isFileList) {
//				shouldStartTimer = table.isCellSelected(pressedRow, pressedCol) && !e.isShiftDown()
//						&& !e.isControlDown() && !outsidePrefSize;
//			}

			if (table.getDragEnabled()) {
				mousePressedDND(e);
			} else {
				SwingUtilities2.adjustFocus(table);
				if (!isFileList) {
					setValueIsAdjusting(true);
				}
				adjustSelection(e);
			}
		}

		private void mousePressedDND(MouseEvent e) {
			pressedEvent = e;
			boolean grabFocus = true;
			dragStarted = false;

			if (canStartDrag()) {// && DragRecognitionSupport.mousePressed(e)) {

				dragPressDidSelection = false;

				if (e.isControlDown() && isFileList) {
					// do nothing for control - will be handled on release
					// or when drag starts
					return;
				} else if (!e.isShiftDown() && table.isCellSelected(pressedRow, pressedCol)) {
					// clicking on something that's already selected
					// and need to make it the lead now
					table.getSelectionModel().addSelectionInterval(pressedRow, pressedRow);
					table.getColumnModel().getSelectionModel().addSelectionInterval(pressedCol, pressedCol);

					return;
				}

				dragPressDidSelection = true;

				// could be a drag initiating event - don't grab focus
				grabFocus = false;
			} else

			if (!isFileList) {
				// When drag can't happen, mouse drags might change the selection in the table
				// so we want the isAdjusting flag to be set
				setValueIsAdjusting(true);
			}

			if (grabFocus) {
				SwingUtilities2.adjustFocus(table);
			}

			adjustSelection(e);
		}

		private void adjustSelection(MouseEvent e) {
			// Fix for 4835633
			if (outsidePrefSize) {
				// If shift is down in multi-select, we should just return.
				// For single select or non-shift-click, clear the selection
				if (e.getID() == MouseEvent.MOUSE_PRESSED && (!e.isShiftDown()
						|| table.getSelectionModel().getSelectionMode() == ListSelectionModel.SINGLE_SELECTION)) {
					table.clearSelection();
					TableCellEditor tce = table.getCellEditor();
					if (tce != null) {
						tce.stopCellEditing();
					}
				}
				return;
			}
			// The autoscroller can generate drag events outside the
			// table's range.
			if ((pressedCol == -1) || (pressedRow == -1)) {
				return;
			}

			boolean dragEnabled = table.getDragEnabled();

			if (!dragEnabled && !isFileList && table.editCellAt(pressedRow, pressedCol, e)) {

				setDispatchComponent(e);
				repostEvent(e);
			}

			CellEditor editor = table.getCellEditor();
			if (dragEnabled || editor == null || editor.shouldSelectCell(e)) {
				table.changeSelection(pressedRow, pressedCol, e.isControlDown(), e.isShiftDown());
			}
		}

		@Override
		public void valueChanged(ListSelectionEvent e) {
			if (timer != null) {
				timer.stop();
				timer = null;
			}
		}

		@Override
		public void actionPerformed(ActionEvent ae) {
			table.editCellAt(pressedRow, pressedCol, null);
			Component editorComponent = table.getEditorComponent();
			if (editorComponent != null && !editorComponent.hasFocus()) {
				SwingUtilities2.compositeRequestFocus(editorComponent);
			}
			return;
		}

//		private void maybeStartTimer() {
//			if (!shouldStartTimer) {
//				return;
//			}
//
//			if (timer == null) {
//				timer = new Timer(1200, this);
//				timer.setRepeats(false);
//			}
//
//			timer.start();
//		}

		@Override
		public void mouseReleased(MouseEvent e) {
			dragging = false;
			if (SwingUtilities2.shouldIgnore(e, table)) {
				return;
			}

			if (table.getDragEnabled()) {
				mouseReleasedDND(e);
			} else {
//				if (isFileList) {
//					maybeStartTimer();
//				}
			}

			pressedEvent = null;
			repostEvent(e);
			dispatchComponent = null;
			setValueIsAdjusting(false);
			// SwingJS: for some reason this is important to keep the tooltips active
			notifyEntry(true);
		}

		private void mouseReleasedDND(MouseEvent e) {
			MouseEvent me = e;// DragRecognitionSupport.mouseReleased(e);
			if (me != null) {
				SwingUtilities2.adjustFocus(table);
				if (!dragPressDidSelection) {
					adjustSelection(me);
				}
			}

			if (!dragStarted) {
//				if (isFileList) {
//					maybeStartTimer();
//					return;
//				}

				Point p = e.getPoint();

				if (pressedEvent != null && table.rowAtPoint(p) == pressedRow && table.columnAtPoint(p) == pressedCol
						&& table.editCellAt(pressedRow, pressedCol, pressedEvent)) {

					setDispatchComponent(pressedEvent);
					repostEvent(pressedEvent);

					// This may appear completely odd, but must be done for backward
					// compatibility reasons. Developers have been known to rely on
					// a call to shouldSelectCell after editing has begun.
					CellEditor ce = table.getCellEditor();
					if (ce != null) {
						ce.shouldSelectCell(pressedEvent);
					}
				}
			}
			rebuildTable();
		}

		@Override
		public void mouseEntered(MouseEvent e) {
		}

		@Override
		public void mouseExited(MouseEvent e) {
		}

		@Override
		public void mouseMoved(MouseEvent e) {
		}

		@Override
		public void mouseDragged(MouseEvent e) {
			if (SwingUtilities2.shouldIgnore(e, table)) {
				return;
			}
			dragging = true;
			if (table.getDragEnabled()
//	            		&& (DragRecognitionSupport.mouseDragged(e, this) || 
//	                    		dragStarted)
			) {

				return;
			}

			repostEvent(e);

			// Check isFileList:
			// Until we support drag-selection, dragging should not change
			// the selection (act like single-select).
			if (isFileList || table.isEditing()) {
				return;
			}

			Point p = e.getPoint();
			int row = table.rowAtPoint(p);
			int column = table.columnAtPoint(p);
			// The autoscroller can generate drag events outside the
			// table's range.
			if ((column == -1) || (row == -1)) {
				return;
			}

			table.changeSelection(row, column, e.isControlDown(), true);
		}

		// PropertyChangeListener
		@Override
		public void propertyChange(PropertyChangeEvent event) {
			switch (event.getPropertyName()) {
			case "tableCellEditor":
				prepareDOMEditor(event.getNewValue() != null, pressedRow, pressedCol);
				break;
			case "componentOrientation":
				InputMap inputMap = getInputMap(JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
				SwingUtilities.replaceUIInputMap(table, JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT, inputMap);
				JTableHeader header = table.getTableHeader();
				if (header != null) {
					header.setComponentOrientation((ComponentOrientation) event.getNewValue());
				}
				break;
			case "model":
				newModel();
				break;
			case "dropLocation":
				rebuildTable();
//	                JTable.DropLocation oldValue = (JTable.DropLocation)event.getOldValue();
//	                repaintDropLocation(oldValue);
//	                repaintDropLocation(table.getDropLocation());
				break;
			case "Table.isFileList":
				isFileList = Boolean.TRUE.equals(table.getClientProperty("Table.isFileList"));
				table.revalidate();
				table.秘repaint();
				if (isFileList) {
					table.getSelectionModel().addListSelectionListener(getHandler());
				} else {
					table.getSelectionModel().removeListSelectionListener(getHandler());
					timer = null;
				}
				break;
			case "selectionModel":
				if (isFileList) {
					ListSelectionModel old = (ListSelectionModel) event.getOldValue();
					old.removeListSelectionListener(getHandler());
					table.getSelectionModel().addListSelectionListener(getHandler());
				}
				break;
			}
		}

//	        private void repaintDropLocation(JTable.DropLocation loc) {
//	            if (loc == null) {
//	                return;
//	            }
//
//	            if (!loc.isInsertRow() && !loc.isInsertColumn()) {
//	                Rectangle rect = table.getCellRect(loc.getRow(), loc.getColumn(), false);
//	                if (rect != null) {
//	                    table.repaint(rect);
//	                }
//	                return;
//	            }
//
//	            if (loc.isInsertRow()) {
//	                Rectangle rect = extendRect(getHDropLineRect(loc), true);
//	                if (rect != null) {
//	                    table.repaint(rect);
//	                }
//	            }
//
//	            if (loc.isInsertColumn()) {
//	                Rectangle rect = extendRect(getVDropLineRect(loc), false);
//	                if (rect != null) {
//	                    table.repaint(rect);
//	                }
//	            }
//	        }
	}

	public void rebuildTable() {
		setTainted();
		currentRowMin = -1;
		setHTMLElement();
		rebuildHeader();
	}

	private void rebuildHeader() {
		JSComponentUI ui = getHeaderUI();
		if (ui != null) {
			ui.setTainted();
			ui.setHTMLElement();
			table.getTableHeader().秘repaint();
		}
	}

	/*
	 * Returns true if the given point is outside the preferredSize of the item at
	 * the given row of the table. (Column must be 0). Returns false if the
	 * "Table.isFileList" client property is not set.
	 */
	private boolean pointOutsidePrefSize(int row, int column, Point p) {
		if (!isFileList) {
			return false;
		}

		return SwingUtilities2.pointOutsidePrefSize(table, row, column, p);
	}

	public void newModel() {
		isNewModel = true;
	}

	public boolean haveSrollPane() {
		return (table.getParent().getParent() instanceof JScrollPane);
	}

	public void repaintCell(int lr, int lc) {
		table._getCellRect(lr, lc, false, tmpRect);
		table.repaint(tmpRect);
	}

	//
	// Factory methods for the Listeners
	//

	private Handler getHandler() {
		if (handler == null) {
			handler = new Handler();
		}
		return handler;
	}

	/**
	 * Creates the key listener for handling keyboard navigation in the JTable.
	 */
	protected KeyListener createKeyListener() {
		return getHandler();
	}

	/**
	 * Creates the focus listener for handling keyboard navigation in the JTable.
	 */
	protected FocusListener createFocusListener() {
		return getHandler();
	}

	/**
	 * Creates the mouse listener for the JTable.
	 */
	protected MouseInputListener createMouseInputListener() {
		return getHandler();
	}

//	//
//	// The installation/uninstall procedures and support
//	//
//
//	public static JSComponentUI createUI(JComponent c) {
//		return new JSTableUI();
//	}

	// Installation

	@Override
	public void installUI(JComponent c) {
		table = (JTable) c;
		rendererPane = new CellRendererPane();
		table.add(rendererPane);
		installDefaults();
		installDefaults2();
		installListeners();
		installKeyboardActions();
	}

	/**
	 * Initialize JTable properties, e.g. font, foreground, and background. The
	 * font, foreground, and background properties are only set if their current
	 * value is either null or a UIResource, other properties are set if the current
	 * value is null.
	 *
	 * @see #installUI
	 */
	protected void installDefaults() {
		LookAndFeel.installColorsAndFont(table, "Table.background", "Table.foreground", "Table.font");
		// JTable's original row height is 16. To correctly display the
		// contents on Linux we should have set it to 18, Windows 19 and
		// Solaris 20. As these values vary so much it's too hard to
		// be backward compatable and try to update the row height, we're
		// therefor NOT going to adjust the row height based on font. If the
		// developer changes the font, it's there responsability to update
		// the row height.

		LookAndFeel.installProperty(table, "opaque", Boolean.TRUE);

		Color sbg = table.getSelectionBackground();
		if (sbg == null || sbg instanceof UIResource) {
			table.setSelectionBackground(UIManager.getColor("Table.selectionBackground"));
		}

		Color sfg = table.getSelectionForeground();
		if (sfg == null || sfg instanceof UIResource) {
			table.setSelectionForeground(UIManager.getColor("Table.selectionForeground"));
		}

		Color gridColor = table.getGridColor();
		if (gridColor == null || gridColor instanceof UIResource) {
			table.setGridColor(UIManager.getColor("Table.gridColor"));
		}

		// install the scrollpane border
		JScrollPane sp = getScrollPane();
		if (sp != null) {
			sp.addPropertyChangeListener(this);
			LookAndFeel.installBorder(sp, "Table.scrollPaneBorder");
		}
		isFileList = Boolean.TRUE.equals(table.getClientProperty("Table.isFileList"));
	}

    JScrollPane getScrollPane() {
		Container parent;
		parent = ((parent = table.getParent()) == null ? null : parent.getParent());
		return (parent instanceof JScrollPane ? (JScrollPane) parent : null);
	}

	private void installDefaults2() {
		//installTransferHandlerIfNeeded();
	}
	
	public void installDefaultTransferHandlerIfNecessary() {
	        TransferHandler th = table.getTransferHandler();
	        if (th == null || th instanceof UIResource) {
	            table.setTransferHandler(defaultTransferHandler);
	            // default TransferHandler doesn't support drop
	            // so we don't want drop handling
	            if (table.getDropTarget() instanceof UIResource) {
	                table.setDropTarget(null);
	            }
	        }
	}

	/**
	 * Attaches listeners to the JTable.
	 */
	protected void installListeners() {
		focusListener = createFocusListener();
		keyListener = createKeyListener();
		mouseInputListener = createMouseInputListener();
		table.addFocusListener(focusListener);
		table.addKeyListener(keyListener);
		table.addMouseListener(mouseInputListener);
		table.addMouseMotionListener(mouseInputListener);
		table.addPropertyChangeListener(getHandler());
		if (isFileList) {
			table.getSelectionModel().addListSelectionListener(getHandler());
		}
	}

	/**
	 * Register all keyboard actions on the JTable.
	 */
	protected void installKeyboardActions() {
		LazyActionMap.installLazyActionMap(table, JSTableUI.class, "Table.actionMap");

		InputMap inputMap = getInputMap(JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
		SwingUtilities.replaceUIInputMap(table, JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT, inputMap);
	}

	InputMap getInputMap(int condition) {
		if (condition == JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT) {
			InputMap keyMap = (InputMap) DefaultLookup.get(table, this, "Table.ancestorInputMap");
			InputMap rtlKeyMap;

			if (table.getComponentOrientation().isLeftToRight() || ((rtlKeyMap = (InputMap) DefaultLookup.get(table,
					this, "Table.ancestorInputMap.RightToLeft")) == null)) {
				return keyMap;
			} else {
				rtlKeyMap.setParent(keyMap);
				return rtlKeyMap;
			}
		}
		return null;
	}

	static void loadActionMap(LazyActionMap map) {
		// IMPORTANT: There is a very close coupling between the parameters
		// passed to the Actions constructor. Only certain parameter
		// combinations are supported. For example, the following Action would
		// not work as expected:
		// new Actions(Actions.NEXT_ROW_CELL, 1, 4, false, true)
		// Actions which move within the selection only (having a true
		// inSelection parameter) require that one of dx or dy be
		// zero and the other be -1 or 1. The point of this warning is
		// that you should be very careful about making sure a particular
		// combination of parameters is supported before changing or
		// adding anything here.

		map.put(new Actions(Actions.NEXT_COLUMN, 1, 0, false, false));
		map.put(new Actions(Actions.NEXT_COLUMN_CHANGE_LEAD, 1, 0, false, false));
		map.put(new Actions(Actions.PREVIOUS_COLUMN, -1, 0, false, false));
		map.put(new Actions(Actions.PREVIOUS_COLUMN_CHANGE_LEAD, -1, 0, false, false));
		map.put(new Actions(Actions.NEXT_ROW, 0, 1, false, false));
		map.put(new Actions(Actions.NEXT_ROW_CHANGE_LEAD, 0, 1, false, false));
		map.put(new Actions(Actions.PREVIOUS_ROW, 0, -1, false, false));
		map.put(new Actions(Actions.PREVIOUS_ROW_CHANGE_LEAD, 0, -1, false, false));
		map.put(new Actions(Actions.NEXT_COLUMN_EXTEND_SELECTION, 1, 0, true, false));
		map.put(new Actions(Actions.PREVIOUS_COLUMN_EXTEND_SELECTION, -1, 0, true, false));
		map.put(new Actions(Actions.NEXT_ROW_EXTEND_SELECTION, 0, 1, true, false));
		map.put(new Actions(Actions.PREVIOUS_ROW_EXTEND_SELECTION, 0, -1, true, false));
		map.put(new Actions(Actions.SCROLL_UP_CHANGE_SELECTION, false, false, true, false));
		map.put(new Actions(Actions.SCROLL_DOWN_CHANGE_SELECTION, false, true, true, false));
		map.put(new Actions(Actions.FIRST_COLUMN, false, false, false, true));
		map.put(new Actions(Actions.LAST_COLUMN, false, true, false, true));

		map.put(new Actions(Actions.SCROLL_UP_EXTEND_SELECTION, true, false, true, false));
		map.put(new Actions(Actions.SCROLL_DOWN_EXTEND_SELECTION, true, true, true, false));
		map.put(new Actions(Actions.FIRST_COLUMN_EXTEND_SELECTION, true, false, false, true));
		map.put(new Actions(Actions.LAST_COLUMN_EXTEND_SELECTION, true, true, false, true));

		map.put(new Actions(Actions.FIRST_ROW, false, false, true, true));
		map.put(new Actions(Actions.LAST_ROW, false, true, true, true));

		map.put(new Actions(Actions.FIRST_ROW_EXTEND_SELECTION, true, false, true, true));
		map.put(new Actions(Actions.LAST_ROW_EXTEND_SELECTION, true, true, true, true));

		map.put(new Actions(Actions.NEXT_COLUMN_CELL, 1, 0, false, true));
		map.put(new Actions(Actions.PREVIOUS_COLUMN_CELL, -1, 0, false, true));
		map.put(new Actions(Actions.NEXT_ROW_CELL, 0, 1, false, true));
		map.put(new Actions(Actions.PREVIOUS_ROW_CELL, 0, -1, false, true));

		map.put(new Actions(Actions.SELECT_ALL));
		map.put(new Actions(Actions.CLEAR_SELECTION));
		map.put(new Actions(Actions.CANCEL_EDITING));
		map.put(new Actions(Actions.START_EDITING));

		map.put(TransferHandler.getCutAction().getValue(Action.NAME), TransferHandler.getCutAction());
		map.put(TransferHandler.getCopyAction().getValue(Action.NAME), TransferHandler.getCopyAction());
		map.put(TransferHandler.getPasteAction().getValue(Action.NAME), TransferHandler.getPasteAction());

		map.put(new Actions(Actions.SCROLL_LEFT_CHANGE_SELECTION, false, false, false, false));
		map.put(new Actions(Actions.SCROLL_RIGHT_CHANGE_SELECTION, false, true, false, false));
		map.put(new Actions(Actions.SCROLL_LEFT_EXTEND_SELECTION, true, false, false, false));
		map.put(new Actions(Actions.SCROLL_RIGHT_EXTEND_SELECTION, true, true, false, false));

		map.put(new Actions(Actions.ADD_TO_SELECTION));
		map.put(new Actions(Actions.TOGGLE_AND_ANCHOR));
		map.put(new Actions(Actions.EXTEND_TO));
		map.put(new Actions(Actions.MOVE_SELECTION_TO));
		map.put(new Actions(Actions.FOCUS_HEADER));
	}

	// Uninstallation

	@Override
	public void uninstallUI(JComponent c) {
		uninstallDefaults();
		uninstallListeners();
		uninstallKeyboardActions();

		table.remove(rendererPane);
		rendererPane = null;
		table = null;
	}

	protected void uninstallDefaults() {
//	        if (table.getTransferHandler() instanceof UIResource) {
//	            table.setTransferHandler(null);
//	        }
	}

	protected void uninstallListeners() {
		table.removeFocusListener(focusListener);
		table.removeKeyListener(keyListener);
		table.removeMouseListener(mouseInputListener);
		table.removeMouseMotionListener(mouseInputListener);
		table.removePropertyChangeListener(getHandler());
		if (isFileList) {
			table.getSelectionModel().removeListSelectionListener(getHandler());
		}

		focusListener = null;
		keyListener = null;
		mouseInputListener = null;
		handler = null;
	}

	protected void uninstallKeyboardActions() {
		SwingUtilities.replaceUIInputMap(table, JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT, null);
		SwingUtilities.replaceUIActionMap(table, null);
	}

	/**
	 * Returns the baseline.
	 *
	 * @throws NullPointerException     {@inheritDoc}
	 * @throws IllegalArgumentException {@inheritDoc}
	 * @see javax.swing.JComponent#getBaseline(int, int)
	 * @since 1.6
	 */
	@Override
	public int getBaseline(JComponent c, int width, int height) {
		super.getBaseline(c, width, height);
		UIDefaults lafDefaults = UIManager.getLookAndFeelDefaults();
		Component renderer = (Component) lafDefaults.get(BASELINE_COMPONENT_KEY);
		if (renderer == null) {
			DefaultTableCellRenderer tcr = new DefaultTableCellRenderer();
			renderer = tcr.getTableCellRendererComponent(table, "a", false, false, -1, -1);
			lafDefaults.put(BASELINE_COMPONENT_KEY, renderer);
		}
		renderer.setFont(table.getFont());
		int rowMargin = table.getRowMargin();
		return renderer.getBaseline(Integer.MAX_VALUE, table.getRowHeight() - rowMargin) + rowMargin / 2;
	}

	/**
	 * Returns an enum indicating how the baseline of the component changes as the
	 * size changes.
	 *
	 * @throws NullPointerException {@inheritDoc}
	 * @see javax.swing.JComponent#getBaseline(int, int)
	 * @since 1.6
	 */
	@Override
	public Component.BaselineResizeBehavior getBaselineResizeBehavior(JComponent c) {
		super.getBaselineResizeBehavior(c);
		return Component.BaselineResizeBehavior.CONSTANT_ASCENT;
	}

	//
	// Size Methods
	//

	private Dimension createTableSize(long width) {
		int height = 0;
		int rowCount = table.getRowCount();
		if (rowCount > 0 && table.getColumnCount() > 0) {
			table._getCellRect(rowCount - 1, 0, true, cellRect);
			height = cellRect.y + cellRect.height;
		}
		// Width is always positive. The call to abs() is a workaround for
		// a bug in the 1.1.6 JIT on Windows.
		long tmp = Math.abs(width);
		if (tmp > Integer.MAX_VALUE) {
			tmp = Integer.MAX_VALUE;
		}
		return new Dimension((int) tmp, height);
	}

	/**
	 * Return the minimum size of the table. The minimum height is the row height
	 * times the number of rows. The minimum width is the sum of the minimum widths
	 * of each column.
	 */
	@Override
	public Dimension getMinimumSize(JComponent jc) {
		long width = 0;
		Enumeration<TableColumn> enumeration = table.getColumnModel().getColumns();
		while (enumeration.hasMoreElements()) {
			TableColumn aColumn = enumeration.nextElement();
			width = width + aColumn.getMinWidth();
		}
		return createTableSize(width);
	}

	/**
	 * Return the preferred size of the table. The preferred height is the row
	 * height times the number of rows. The preferred width is the sum of the
	 * preferred widths of each column.
	 */
	@Override
	public Dimension getPreferredSize(JComponent jc) {
		long width = 0;
		Enumeration<TableColumn> enumeration = table.getColumnModel().getColumns();
		while (enumeration.hasMoreElements()) {
			TableColumn aColumn = enumeration.nextElement();
			width = width + aColumn.getPreferredWidth();
		}
		return createTableSize(width);
	}

	/**
	 * Return the maximum size of the table. The maximum height is the row
	 * heighttimes the number of rows. The maximum width is the sum of the maximum
	 * widths of each column.
	 */
	@Override
	public Dimension getMaximumSize(JComponent jc) {
		long width = 0;
		Enumeration<TableColumn> enumeration = table.getColumnModel().getColumns();
		while (enumeration.hasMoreElements()) {
			TableColumn aColumn = enumeration.nextElement();
			width = width + aColumn.getMaxWidth();
		}
		return createTableSize(width);
	}

	//
	// Paint methods and support
	//

	private int lastWidth;
	private boolean resized;
	private boolean repaintAll;

	/**
	 * Paint a representation of the <code>table</code> instance that was set in
	 * installUI().
	 */
	@Override
	public void paint(Graphics g, JComponent c) {
		super.paint(g, c);
		// BH 2019.07.04
		// This method is entered from JViewport.blitDoubleBuffered (from scrolling)
		// or from JComponent.paintComponent (initially, or from resize, for instance)

		//table.getFillsViewportHeight();
		int rc = table.getRowCount();
		int cc = table.getColumnCount();
		checkRemoveCells(rc, cc);
		// 2020.08.04 g.getClipBounds works now, no need for the hack.
		Rectangle clip = g.getClipBounds(myClip);
		int rh = table.getRowHeight();
		if (getScrollPane() != null) {
			DOMNode.setStyles(outerNode, "overflow", "hidden", "height", (rc * rh) + "px");
		}
		table.computeVisibleRect(tmpRect);

		if (rc <= 0 || cc <= 0 ||
		// this check prevents us from painting the entire table
		// when the clip doesn't intersect our bounds at all
				!tmpRect.intersects(clip)) {
			paintDropLines(g);
			return;
		}

		clip = tmpRect.intersection(clip);

		Point upperLeft = clip.getLocation();
		Point lowerRight = new Point(clip.x + clip.width - 1, clip.y + clip.height - 1);

		int rMin = table.rowAtPoint(upperLeft);
		int rMax = table.rowAtPoint(lowerRight);

		// happens after new model when scrollbar is not at 0
		
		// This should never happen (as long as our bounds intersect the clip,
		// which is why we bail above if that is the case).
		if (rMin == -1) {
			rMin = 0;
		}
		// If the table does not have enough rows to fill the view we'll get -1.
		// (We could also get -1 if our bounds don't intersect the clip,
		// which is why we bail above if that is the case).
		// Replace this with the index of the last row.
		if (rMax == -1) {
			rMax = rc - 1;
		}
		resized = (tmpRect.width != lastWidth);
		if (resized) {
			// table has been resized
			if (rMax - rMin > 1) {
				JScrollPane sp = getScrollPane();
				if (sp != null) {
					int val = Math.max(1, (rMax - rMin - 1) * rh);
					sp.getVerticalScrollBar().setBlockIncrement(val);
					sp.getVerticalScrollBar().setUnitIncrement((val + 1) / 2);

				}
			}
			boolean was0 = (lastWidth == 0);
			lastWidth = tmpRect.width;
			repaintAll = true;
			if (!was0) {

				rebuildTable();
				JSTableHeaderUI hui = getHeaderUI();
				if (hui != null)
					hui.paint(g, c);
				table.repaint();//tmpRect);
				return;
			}
		}
		working = true;

		boolean ltr = table.getComponentOrientation().isLeftToRight();

		int cMin = table.columnAtPoint(ltr ? upperLeft : lowerRight);
		int cMax = table.columnAtPoint(ltr ? lowerRight : upperLeft);
		// This should never happen.
		if (cMin == -1) {
			cMin = 0;
		}
		// If the table does not have enough columns to fill the view we'll get -1.
		// Replace this with the index of the last column.
		if (cMax == -1) {
			cMax = table.getColumnCount() - 1;
		}

		JTableHeader header = table.getTableHeader();
		TableColumn draggedColumn = (header == null) ? null : header.getDraggedColumn();

		// Paint the grid.
		paintGrid(g, rMin, rMax, cMin, cMax);

		// only paint the new rows
		int rMin0 = rMin;
		int rMax0 = rMax;

		if (rMin != rMax && !repaintAll && draggedColumn == null) {
			if (rMax > currentRowMax && rMin < currentRowMax) {
				rMin = currentRowMax + 1;
			} else if (rMin < currentRowMin && rMax > currentRowMin) {
				rMax = currentRowMin - 1;
			}
		}
		currentRowMin = rMin0;
		currentRowMax = rMax0;

		// Paint the cells.
		paintCells(g, rMin0, rMax0, rMin, rMax, cMin, cMax);
		paintDropLines(g);

		if (draggedColumn != null)
			rebuildHeader();

		working = false;
		dragging = false;
		repaintAll = false;
		setHidden(false);
	}

	private int lastRowCount, lastColCount;
	
	private void checkRemoveCells(int nrows, int ncols) {
		if (nrows < lastRowCount) {
			// remove all missing rows
			for (int r = nrows; r < lastRowCount; r++) {
				DOMNode node = CellHolder.findCellNode(this, null, r, -1);
				if (node != null) {
					DOMNode.remove(node);
				}
			}
		}
		if (ncols < lastColCount) {
			// remove all extra columns for visible rows only
			for (int r = 0; r < nrows; r++) {
				for (int c = ncols; c < lastColCount; c++) {
					DOMNode node = CellHolder.findCellNode(this, null, r, c);
					if (node != null) {
						DOMNode.remove(node);
//						if (j == 0)
//							bsRowTainted.set(i);
//						DOMNode.setVisible(node, false);
					}
				}
			}
		}
		lastColCount = ncols;
		lastRowCount = nrows;
	}

	private Rectangle myClip = new Rectangle();
//	private Rectangle getClip(Graphics g) {
//		if (table.parent instanceof JViewport) {
//// abandoned -- not necessary 
//			JSViewportUI ui = ((JSViewportUI)table.parent.getUI());
//			if (isNewModel) {
//				ui.myClip.x = ui.myClip.y = 0;
//				isNewModel = false;
//			}
//			return ui.myClip; 
//		} else {
//			myClip.width = table.getWidth();
//			myClip.height = table.getHeight();
//		}
//		return myClip;
//	}

	/**
	 * In SwingJS, track when columns have been resized so that we can ensure that, when cells
	 * are painted, their TD elements are correctly positioned and sized.
	 */
	private BitSet bsRowTainted = new BitSet();

	private void paintCells(Graphics g, int rMin0, int rMax0, int rMin, int rMax, int cMin, int cMax) {
		TableColumnModel cm = table.getColumnModel();
		int columnMargin = cm.getColumnMargin();

		int h = table.getRowHeight();
		
		boolean forceNew = (dragging || justLaidOut);

		getColumnWidths(false);
		int columnWidth;

		if (table.getComponentOrientation().isLeftToRight()) {
			for (int row = rMin0; row <= rMax0; row++) {
				table._getCellRect(row, cMin, false, cellRect);
				boolean colTainted = bsRowTainted.get(row);
				DOMNode tr = DOMNode.getElement(id + "_tab_row" + row);
				for (int column = cMin; column <= cMax; column++) {
					columnWidth = cw[column];
					cellRect.width = columnWidth - columnMargin;
//					if (aColumn != draggedColumn) {
					paintCell(g, cellRect, row, column, h, tr, forceNew, colTainted);
//					}
					cellRect.x += columnWidth;
				}
				if (colTainted)
					bsRowTainted.clear(row);
			}
		} else {
			for (int row = rMin0; row <= rMax0; row++) {
				table._getCellRect(row, cMin, false, cellRect);
//				aColumn = cm.getColumn(cMin);
//				if (aColumn != draggedColumn) {
//					columnWidth = aColumn.getWidth();
//					cellRect.width = columnWidth - columnMargin;
//					paintCell(g, cellRect, row, cMin, cw, h);
//				}
				DOMNode tr = DOMNode.getElement(id + "_tab_row" + row);
				boolean colTainted = bsRowTainted.get(row);
				for (int column = cMin; column <= cMax; column++) {
					columnWidth = cw[column];
					cellRect.width = columnWidth - columnMargin;
					if (column != cMin)
						cellRect.x -= columnWidth;
//					if (aColumn != draggedColumn) {
					paintCell(g, cellRect, row, column, h, tr, forceNew, colTainted);
//					}
				}
				if (colTainted)
					bsRowTainted.clear(row);
			}
		}

		// Paint the dragged column if we are dragging.
//		if (draggedColumn != null) {
//			paintDraggedArea(g, rMin, rMax, draggedColumn, header.getDraggedDistance());
//		}

		// Remove any renderers that may be left in the rendererPane.
		// Note that without this, sometimes the last cell rendered ends up blank,
		// probably because its ui has been disposed.
		rendererPane.removeAll();
		isScrolling = false;
		justLaidOut = false;
		havePainted = true;
	}

	private void paintCell(Graphics g, Rectangle cellRect, int row, int col, int h, DOMNode tr, boolean forceNew,
			boolean colTainted) {

		if (table.isEditing() && table.getEditingRow() == row && table.getEditingColumn() == col) {
			Component component = table.getEditorComponent();
			if (component instanceof JTextField) {
				component.setBounds(new Rectangle(cellRect.x - 2, cellRect.y - 2, cellRect.width, cellRect.height));
			} else {
				component.setBounds(cellRect);
			}
			component.validate();
			return;
		}
		// Get the appropriate rendering component
		// and switch its ui domNode to the one for the
		// given row and column. Painting the component
		// then modifies this particular cell. and switch it back
		DOMNode td = (forceNew || tr == null ? null : CellHolder.findCellNode(this, null, row, col));
		boolean newtd = (td == null);
		if (newtd) {
			td = addElement(row, col, h);
		} else if (colTainted) {
			DOMNode.setStyles(td, "left", cellRect.x + "px", "width", cw[col] + "px", "display", null);
		} else {
			DOMNode.setStyle(td, "display", null);
		}
		boolean fullPaint = (newtd || !havePainted || !isScrolling || table.getSelectedRowCount() > 0);
		TableCellRenderer renderer = (fullPaint ? table.getCellRenderer(row, col)
				: table.getCellRendererOrNull(row, col, isScrolling));
		if (!fullPaint) {
			// no need to paint the default renderers with nothing selected
			/**
			 * @j2sNative if (!renderer || renderer.__CLASS_NAME__.indexOf("javax.swing.")
			 *            == 0) return;
			 */
		}
		JComponent comp = (JComponent) getCellRendererComponent(renderer, row, col, cw[col], h, td, fullPaint);
		if (comp == null)
			return;
		boolean shouldValidate = fullPaint && !isScrolling;
		rendererPane.paintComponent(g, comp, table, cellRect.x, cellRect.y, cellRect.width, cellRect.height,
				shouldValidate);
		// Note that this sets ui.jc = null.
		comp.秘getUI().setRenderer(null, 0, 0, td);
	}

	/*
	 * Paints the grid lines within <I>aRect</I>, using the grid color set with
	 * <I>setGridColor</I>. Paints vertical lines if
	 * <code>getShowVerticalLines()</code> returns true and paints horizontal lines
	 * if <code>getShowHorizontalLines()</code> returns true.
	 */
	private void paintGrid(Graphics g, int rMin, int rMax, int cMin, int cMax) {
		g.setColor(table.getGridColor());
		//System.out.println("JSTableUI paintGrid " + rMin + " " + rMax);
		table._getCellRect(rMin, cMin, true, minCell);
		table._getCellRect(rMax, cMax, true, maxCell);
		Rectangle damagedArea = minCell.union(maxCell);

		if (table.getShowHorizontalLines()) {
			int tableWidth = damagedArea.x + damagedArea.width;
			int y = damagedArea.y;
			for (int row = rMin; row <= rMax; row++) {
				y += table.getRowHeight(row);
				g.drawLine(damagedArea.x, y - 1, tableWidth - 1, y - 1);
			}
		}
		if (table.getShowVerticalLines()) {
			TableColumnModel cm = table.getColumnModel();
			int tableHeight = damagedArea.y + damagedArea.height;
			int x;
			if (table.getComponentOrientation().isLeftToRight()) {
				x = damagedArea.x;
				for (int column = cMin; column <= cMax; column++) {
					int w = cm.getColumn(column).getWidth();
					x += w;
					g.drawLine(x - 1, 0, x - 1, tableHeight - 1);
				}
			} else {
				x = damagedArea.x;
				for (int column = cMax; column >= cMin; column--) {
					int w = cm.getColumn(column).getWidth();
					x += w;
					g.drawLine(x - 1, 0, x - 1, tableHeight - 1);
				}
			}
		}
	}

//	private int viewIndexForColumn(TableColumn aColumn) {
//		TableColumnModel cm = table.getColumnModel();
//		for (int column = 0; column < cm.getColumnCount(); column++) {
//			if (cm.getColumn(column) == aColumn) {
//				return column;
//			}
//		}
//		return -1;
//	}

	private void paintDropLines(Graphics g) {
//        JTable.DropLocation loc = table.getDropLocation();
//        if (loc == null) {
//            return;
//        }
//
//        Color color = UIManager.getColor("Table.dropLineColor");
//        Color shortColor = UIManager.getColor("Table.dropLineShortColor");
//        if (color == null && shortColor == null) {
//            return;
//        }
//
//        Rectangle rect;
//
//        rect = getHDropLineRect(loc);
//        if (rect != null) {
//            int x = rect.x;
//            int w = rect.width;
//            if (color != null) {
//                extendRect(rect, true);
//                g.setColor(color);
//                g.fillRect(rect.x, rect.y, rect.width, rect.height);
//            }
//            if (!loc.isInsertColumn() && shortColor != null) {
//                g.setColor(shortColor);
//                g.fillRect(x, rect.y, w, rect.height);
//            }
//        }
//
//        rect = getVDropLineRect(loc);
//        if (rect != null) {
//            int y = rect.y;
//            int h = rect.height;
//            if (color != null) {
//                extendRect(rect, false);
//                g.setColor(color);
//                g.fillRect(rect.x, rect.y, rect.width, rect.height);
//            }
//            if (!loc.isInsertRow() && shortColor != null) {
//                g.setColor(shortColor);
//                g.fillRect(rect.x, y, rect.width, h);
//            }
//        }
	}

//    private Rectangle getHDropLineRect(JTable.DropLocation loc) {
//        if (!loc.isInsertRow()) {
//            return null;
//        }
//
//        int row = loc.getRow();
//        int col = loc.getColumn();
//        if (col >= table.getColumnCount()) {
//            col--;
//        }
//
//        Rectangle rect = table.getCellRect(row, col, true);
//
//        if (row >= table.getRowCount()) {
//            row--;
//            Rectangle prevRect = table.getCellRect(row, col, true);
//            rect.y = prevRect.y + prevRect.height;
//        }
//
//        if (rect.y == 0) {
//            rect.y = -1;
//        } else {
//            rect.y -= 2;
//        }
//
//        rect.height = 3;
//
//        return rect;
//    }
//
//    private Rectangle getVDropLineRect(JTable.DropLocation loc) {
//        if (!loc.isInsertColumn()) {
//            return null;
//        }
//
//        boolean ltr = table.getComponentOrientation().isLeftToRight();
//        int col = loc.getColumn();
//        Rectangle rect = table.getCellRect(loc.getRow(), col, true);
//
//        if (col >= table.getColumnCount()) {
//            col--;
//            rect = table.getCellRect(loc.getRow(), col, true);
//            if (ltr) {
//                rect.x = rect.x + rect.width;
//            }
//        } else if (!ltr) {
//            rect.x = rect.x + rect.width;
//        }
//
//        if (rect.x == 0) {
//            rect.x = -1;
//        } else {
//            rect.x -= 2;
//        }
//
//        rect.width = 3;
//
//        return rect;
//    }
//
//    private Rectangle extendRect(Rectangle rect, boolean horizontal) {
//        if (rect == null) {
//            return rect;
//        }
//
//        if (horizontal) {
//            rect.x = 0;
//            rect.width = table.getWidth();
//        } else {
//            rect.y = 0;
//
//            if (table.getRowCount() != 0) {
//                Rectangle lastRect = table.getCellRect(table.getRowCount() - 1, 0, true);
//                rect.height = lastRect.y + lastRect.height;
//            } else {
//                rect.height = table.getHeight();
//            }
//        }
//
//        return rect;
//    }

	private static int getAdjustedLead(JTable table, boolean row, ListSelectionModel model) {

		int index = model.getLeadSelectionIndex();
		int compare = row ? table.getRowCount() : table.getColumnCount();
		return index < compare ? index : -1;
	}

	private static int getAdjustedLead(JTable table, boolean row) {
		return row ? getAdjustedLead(table, row, table.getSelectionModel())
				: getAdjustedLead(table, row, table.getColumnModel().getSelectionModel());
	}


	    private static final TransferHandler defaultTransferHandler = new TableTransferHandler();

	static class TableTransferHandler extends TransferHandler implements UIResource {

		/**
		 * Create a Transferable to use as the source for a data transfer.
		 *
		 * @param c The component holding the data to be transfered. This argument is
		 *          provided to enable sharing of TransferHandlers by multiple
		 *          components.
		 * @return The representation of the data to be transfered.
		 *
		 */
		@Override
		protected Transferable createTransferable(JComponent c) {
			if (c instanceof JTable) {
				JTable table = (JTable) c;
				int[] rows;
				int[] cols;

				if (!table.getRowSelectionAllowed() && !table.getColumnSelectionAllowed()) {
					return null;
				}

				if (!table.getRowSelectionAllowed()) {
					int rowCount = table.getRowCount();

					rows = new int[rowCount];
					for (int counter = 0; counter < rowCount; counter++) {
						rows[counter] = counter;
					}
				} else {
					rows = table.getSelectedRows();
				}

				if (!table.getColumnSelectionAllowed()) {
					int colCount = table.getColumnCount();

					cols = new int[colCount];
					for (int counter = 0; counter < colCount; counter++) {
						cols[counter] = counter;
					}
				} else {
					cols = table.getSelectedColumns();
				}

				if (rows == null || cols == null || rows.length == 0 || cols.length == 0) {
					return null;
				}

				StringBuffer plainBuf = new StringBuffer();
				StringBuffer htmlBuf = new StringBuffer();

				htmlBuf.append("<html>\n<body>\n<table>\n");

				for (int row = 0; row < rows.length; row++) {
					htmlBuf.append("<tr>\n");
					for (int col = 0; col < cols.length; col++) {
						Object obj = table.getValueAt(rows[row], cols[col]);
						String val = ((obj == null) ? "" : obj.toString());
						plainBuf.append(val + "\t");
						htmlBuf.append("  <td>" + val + "</td>\n");
					}
					// we want a newline at the end of each line and not a tab
					plainBuf.deleteCharAt(plainBuf.length() - 1).append("\n");
					htmlBuf.append("</tr>\n");
				}

				// remove the last newline
				plainBuf.deleteCharAt(plainBuf.length() - 1);
				htmlBuf.append("</table>\n</body>\n</html>");

				return new BasicTransferable(plainBuf.toString(), htmlBuf.toString());
			}

			return null;
		}

		@Override
		public int getSourceActions(JComponent c) {
			return COPY;
		}

	}

    public void invokeAction(String name, Action altAction) {
        ActionMap map = table.getActionMap();
        Action action = null;

        if (map != null) {
            action = map.get(name);
        }
        installDefaultTransferHandlerIfNecessary();
        if (action == null) {
            action = altAction;
        }
        action.actionPerformed(new ActionEvent(this,
                               ActionEvent.ACTION_PERFORMED, (String)action.
                               getValue(Action.NAME),
                               EventQueue.getMostRecentEventTime(), 0));
    }

}
