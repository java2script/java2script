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

import java.awt.Component;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.JSComponent;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.MouseEvent;
import java.util.Enumeration;

import javax.swing.CellRendererPane;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JViewport;
import javax.swing.LookAndFeel;
import javax.swing.RowSorter;
import javax.swing.SwingUtilities;
import javax.swing.event.MouseInputListener;
import javax.swing.table.JTableHeader;
import javax.swing.table.TableCellRenderer;
import javax.swing.table.TableColumn;
import javax.swing.table.TableColumnModel;

import sun.swing.DefaultLookup;
import sun.swing.UIAction;
import swingjs.api.js.DOMNode;
/*
 * Copyright (c) 1997, 2007, Oracle and/or its affiliates. All rights reserved.
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

/**
 * BasicTableHeaderUI implementation
 *
 * @author Alan Chung
 * @author Philip Milne
 */

/**
 * A JavaScript equivalent for a table header
 * 
 * @author Bob Hanson
 * 
 */
@SuppressWarnings({ "rawtypes" })
public class JSTableHeaderUI extends JSLightweightUI {

	private JTable table;

//	private int oldrc;
//
//	private int oldrh;

	private DOMNode headdiv;

	JSTableHeaderUI() {
		super();
		isContainer = true;
	}

	private boolean working;

	@Override
	public void setTainted() {
		if (!working)
			super.setTainted();
	}

	@Override
	public DOMNode updateDOMNode() {

		table = tableHeader.getTable();
//		int rc = table.getRowCount();
//		int rh = table.getRowHeight();

		//boolean rebuild = (rc != oldrc || rh != oldrh);

//		oldrh = rh;
//		oldrc = rc;

		int thh = tableHeader.getHeight();

		int w = table.getWidth();
		if (domNode == null) {
			domNode = newDOMObject("div", id);
		}
		DOMNode.setStyles(domNode, "width", w + "px", "height", thh + "px");

//		if (rebuild)
//			createChildren();

		return setCssFont(domNode, c.getFont());

	}

//	private void createChildren() {
////		int nrows = table.getRowCount();
////		int ncols = table.getColumnCount();
////		children  = new Component[nrows * ncols];
//		// we do not need to fill these, as they may end up being 
//		// all the same object -- a single cell renderer	
//	}

	@Override
	protected void addChildrenToDOM(Component[] children, int n) {
		int ncols = table.getColumnCount();
		int thh = tableHeader.getHeight();
		int[] cw = new int[ncols];
		for (int col = 0; col < ncols; col++)
			cw[col] = table.getColumnModel().getColumn(col).getWidth();
		String rid = id + "_tab_header";
		if (headdiv != null)
			DOMNode.dispose(headdiv);
		headdiv = DOMNode.createElement("div", rid);
		DOMNode.setStyle(headdiv, "height", thh + "px");
		domNode.appendChild(headdiv);
		for (int col = 0, tx = 0; col < ncols; col++) {
			int w = cw[col];
			DOMNode td = CellHolder.findOrCreateNode(this, -1, col, tx, 0, w, headdiv);
			updateCellNode(td, col, w, thh);
			tx += w;
		}

	}

	private void updateCellNode(DOMNode td, int col, int w, int thh) {
		JSComponent c = (JSComponent) getHeaderComponent(col, w, thh, td);
		if (c != null)
			CellHolder.updateCellNode(td, c, -1, -1);
	}

	private static Cursor resizeCursor = Cursor.getPredefinedCursor(Cursor.E_RESIZE_CURSOR);

	//
	// Instance Variables
	//

	/** The JTableHeader that is delegating the painting to this UI. */
	protected JTableHeader tableHeader;
	protected CellRendererPane rendererPane;

	// Listeners that are attached to the JTable
	protected MouseInputListener mouseInputListener;

	// The column header over which the mouse currently is.
	private int rolloverColumn = -1;

	// The column that should be highlighted when the table header has the focus.
	private int selectedColumnIndex = 0; // Read ONLY via getSelectedColumnIndex!

	private final static Rectangle tmpRect = new Rectangle(), cellBounds = new Rectangle();;

	private static FocusListener focusListener = new FocusListener() {
		@Override
		public void focusGained(FocusEvent e) {
			repaintHeader(e.getSource());
		}

		@Override
		public void focusLost(FocusEvent e) {
			repaintHeader(e.getSource());
		}

		private void repaintHeader(Object source) {
			if (source instanceof JTableHeader) {
				JTableHeader th = (JTableHeader) source;
				JSTableHeaderUI ui = (JSTableHeaderUI) th.getUI();
				if (ui == null) {
					return;
				}
				th.repaint(th.getHeaderRect(ui.getSelectedColumnIndex()));
			}
		}
	};

	/**
	 * This inner class is marked &quot;public&quot; due to a compiler bug. This
	 * class should be treated as a &quot;protected&quot; inner class. Instantiate
	 * it only within subclasses of BasicTableUI.
	 */
	public class MouseInputHandler implements MouseInputListener {

		private int mouseXOffset;
		private Cursor otherCursor = resizeCursor;

		@Override
		public void mouseClicked(MouseEvent e) {
			if (e.getClickCount() % 2 == 1 && SwingUtilities.isLeftMouseButton(e)) {
				JTable table = tableHeader.getTable();
				RowSorter sorter;
				if (table != null && (sorter = table.getRowSorter()) != null) {
					int columnIndex = tableHeader.columnAtPoint(e.getPoint());
					if (columnIndex != -1) {
						columnIndex = table.convertColumnIndexToModel(columnIndex);
						sorter.toggleSortOrder(columnIndex);
					}
				}
			}
		}

		private TableColumn getResizingColumn(Point p) {
			return getResizingColumn(p, tableHeader.columnAtPoint(p));
		}

		private TableColumn getResizingColumn(Point p, int column) {
			if (column == -1) {
				return null;
			}
			Rectangle r = tableHeader.getHeaderRect(column);
			r.grow(-3, 0);
			if (r.contains(p)) {
				return null;
			}
			int midPoint = r.x + r.width / 2;
			int columnIndex;
			if (tableHeader.getComponentOrientation().isLeftToRight()) {
				columnIndex = (p.x < midPoint) ? column - 1 : column;
			} else {
				columnIndex = (p.x < midPoint) ? column : column - 1;
			}
			if (columnIndex == -1) {
				return null;
			}
			return tableHeader.getColumnModel().getColumn(columnIndex);
		}

		@Override
		public void mousePressed(MouseEvent e) {
			tableHeader.setDraggedColumn(null);
			tableHeader.setResizingColumn(null);
			tableHeader.setDraggedDistance(0);

			Point p = e.getPoint();

			// First find which header cell was hit
			TableColumnModel columnModel = tableHeader.getColumnModel();
			int index = tableHeader.columnAtPoint(p);

			if (index != -1) {
				// The last 3 pixels + 3 pixels of next column are for resizing
				TableColumn resizingColumn = getResizingColumn(p, index);
				if (canResize(resizingColumn, tableHeader)) {
					tableHeader.setResizingColumn(resizingColumn);
					if (tableHeader.getComponentOrientation().isLeftToRight()) {
						mouseXOffset = p.x - resizingColumn.getWidth();
					} else {
						mouseXOffset = p.x + resizingColumn.getWidth();
					}
				} else if (tableHeader.getReorderingAllowed()) {
					TableColumn hitColumn = columnModel.getColumn(index);
					tableHeader.setDraggedColumn(hitColumn);
					mouseXOffset = p.x;
				}
			}

			if (tableHeader.getReorderingAllowed()) {
				int oldRolloverColumn = rolloverColumn;
				rolloverColumn = -1;
				rolloverColumnUpdated(oldRolloverColumn, rolloverColumn);
			}
		}

		private void swapCursor() {
			Cursor tmp = tableHeader.getCursor();
			tableHeader.setCursor(otherCursor);
			otherCursor = tmp;
		}

		@Override
		public void mouseMoved(MouseEvent e) {
			if (canResize(getResizingColumn(e.getPoint()), tableHeader) != (tableHeader.getCursor() == resizeCursor)) {
				swapCursor();
			}
			updateRolloverColumn(e);
		}

		@Override
		public void mouseDragged(MouseEvent e) {
			int mouseX = e.getX();

			TableColumn resizingColumn = tableHeader.getResizingColumn();
			TableColumn draggedColumn = tableHeader.getDraggedColumn();

			boolean headerLeftToRight = tableHeader.getComponentOrientation().isLeftToRight();

			if (resizingColumn != null) {
				int oldWidth = resizingColumn.getWidth();
				int newWidth;
				if (headerLeftToRight) {
					newWidth = mouseX - mouseXOffset;
				} else {
					newWidth = mouseXOffset - mouseX;
				}
				mouseXOffset += changeColumnWidth(resizingColumn, tableHeader, oldWidth, newWidth);
			} else if (draggedColumn != null) {
				TableColumnModel cm = tableHeader.getColumnModel();
				int draggedDistance = mouseX - mouseXOffset;
				int direction = (draggedDistance < 0) ? -1 : 1;
				int columnIndex = viewIndexForColumn(draggedColumn);
				int newColumnIndex = columnIndex + (headerLeftToRight ? direction : -direction);
				if (0 <= newColumnIndex && newColumnIndex < cm.getColumnCount()) {
					int width = cm.getColumn(newColumnIndex).getWidth();
					if (Math.abs(draggedDistance) > (width / 2)) {
						JTable table = tableHeader.getTable();

						mouseXOffset = mouseXOffset + direction * width;
						tableHeader.setDraggedDistance(draggedDistance - direction * width);

						// Cache the selected column.
						int selectedIndex = table.convertColumnIndexToModel(getSelectedColumnIndex());

						// Now do the move.
						cm.moveColumn(columnIndex, newColumnIndex);

						// Update the selected index.
						selectColumn(table.convertColumnIndexToView(selectedIndex), false);

						return;
					}
				}
				setDraggedDistance(draggedDistance, columnIndex);
			}

			updateRolloverColumn(e);
		}

		@Override
		public void mouseReleased(MouseEvent e) {
			setDraggedDistance(0, viewIndexForColumn(tableHeader.getDraggedColumn()));

			tableHeader.setResizingColumn(null);
			tableHeader.setDraggedColumn(null);

			updateRolloverColumn(e);
		}

		@Override
		public void mouseEntered(MouseEvent e) {
			updateRolloverColumn(e);
		}

		@Override
		public void mouseExited(MouseEvent e) {
			int oldRolloverColumn = rolloverColumn;
			rolloverColumn = -1;
			rolloverColumnUpdated(oldRolloverColumn, rolloverColumn);
		}
		//
		// Protected & Private Methods
		//

		private void setDraggedDistance(int draggedDistance, int column) {
			tableHeader.setDraggedDistance(draggedDistance);
			if (column != -1) {
				tableHeader.getColumnModel().moveColumn(column, column);
			}
		}
	}

	//
	// Factory methods for the Listeners
	//

	/**
	 * Creates the mouse listener for the JTableHeader.
	 */
	protected MouseInputListener createMouseInputListener() {
		return new MouseInputHandler();
	}

	//
	// The installation/uninstall procedures and support
	//

	public static JSComponentUI createUI(JComponent h) {
		return new JSTableHeaderUI();
	}

	// Installation

	@Override
	public void installUI(JComponent c) {
		tableHeader = (JTableHeader) c;

		rendererPane = new CellRendererPane();
		tableHeader.add(rendererPane);

		installDefaults();
		installListeners();
		installKeyboardActions();
	}

	/**
	 * Initialize JTableHeader properties, e.g. font, foreground, and background.
	 * The font, foreground, and background properties are only set if their current
	 * value is either null or a UIResource, other properties are set if the current
	 * value is null.
	 *
	 * @see #installUI
	 */
	protected void installDefaults() {
		LookAndFeel.installColorsAndFont(tableHeader, "TableHeader.background", "TableHeader.foreground",
				"TableHeader.font");
		LookAndFeel.installProperty(tableHeader, "opaque", Boolean.TRUE);
	}

	/**
	 * Attaches listeners to the JTableHeader.
	 */
	protected void installListeners() {
		mouseInputListener = createMouseInputListener();

		tableHeader.addMouseListener(mouseInputListener);
		tableHeader.addMouseMotionListener(mouseInputListener);
		tableHeader.addFocusListener(focusListener);
	}

	/**
	 * Register all keyboard actions on the JTableHeader.
	 */
	protected void installKeyboardActions() {
		InputMap keyMap = (InputMap) DefaultLookup.get(tableHeader, this, "TableHeader.ancestorInputMap");
		SwingUtilities.replaceUIInputMap(tableHeader, JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT, keyMap);
		LazyActionMap.installLazyActionMap(tableHeader, JSTableHeaderUI.class, "TableHeader.actionMap");
	}

	// Uninstall methods

	@Override
	public void uninstallUI(JComponent c) {
		uninstallDefaults();
		uninstallListeners();
		uninstallKeyboardActions();

		tableHeader.remove(rendererPane);
		rendererPane = null;
		tableHeader = null;
	}

	protected void uninstallDefaults() {
	}

	protected void uninstallListeners() {
		tableHeader.removeMouseListener(mouseInputListener);
		tableHeader.removeMouseMotionListener(mouseInputListener);

		mouseInputListener = null;
	}

	/**
	 * Unregisters default key actions.
	 */
	protected void uninstallKeyboardActions() {
		SwingUtilities.replaceUIInputMap(tableHeader, JComponent.WHEN_FOCUSED, null);
		SwingUtilities.replaceUIActionMap(tableHeader, null);
	}

	/**
	 * Populates TableHeader's actions.
	 */
	static void loadActionMap(LazyActionMap map) {
		map.put(new Actions(Actions.TOGGLE_SORT_ORDER));
		map.put(new Actions(Actions.SELECT_COLUMN_TO_LEFT));
		map.put(new Actions(Actions.SELECT_COLUMN_TO_RIGHT));
		map.put(new Actions(Actions.MOVE_COLUMN_LEFT));
		map.put(new Actions(Actions.MOVE_COLUMN_RIGHT));
		map.put(new Actions(Actions.RESIZE_LEFT));
		map.put(new Actions(Actions.RESIZE_RIGHT));
		map.put(new Actions(Actions.FOCUS_TABLE));
	}

	//
	// Support for mouse rollover
	//

	/**
	 * Returns the index of the column header over which the mouse currently is.
	 * When the mouse is not over the table header, -1 is returned.
	 *
	 * @see #rolloverColumnUpdated(int, int)
	 * @return the index of the current rollover column
	 * @since 1.6
	 */
	protected int getRolloverColumn() {
		return rolloverColumn;
	}

	/**
	 * This method gets called every time the rollover column in the table header is
	 * updated. Every look and feel supporting rollover effect in table header
	 * should override this method and repaint the header.
	 *
	 * @param oldColumn the index of the previous rollover column or -1 if the mouse
	 *                  was not over a column
	 * @param newColumn the index of the new rollover column or -1 if the mouse is
	 *                  not over a column
	 * @see #getRolloverColumn()
	 * @see JTableHeader#getHeaderRect(int)
	 * @since 1.6
	 */
	protected void rolloverColumnUpdated(int oldColumn, int newColumn) {
// TODO
//		setTainted();
//		setHTMLElement();
	}

	private void updateRolloverColumn(MouseEvent e) {
		if (tableHeader.getDraggedColumn() == null && tableHeader.contains(e.getPoint())) {

			int col = tableHeader.columnAtPoint(e.getPoint());
			if (col != rolloverColumn) {
				int oldRolloverColumn = rolloverColumn;
				rolloverColumn = col;
				rolloverColumnUpdated(oldRolloverColumn, rolloverColumn);
			}
		}
	}

	//
	// Support for keyboard and mouse access
	//
	private int selectNextColumn(boolean doIt) {
		int newIndex = getSelectedColumnIndex();
		if (newIndex < tableHeader.getColumnModel().getColumnCount() - 1) {
			newIndex++;
			if (doIt) {
				selectColumn(newIndex);
			}
		}
		return newIndex;
	}

	private int selectPreviousColumn(boolean doIt) {
		int newIndex = getSelectedColumnIndex();
		if (newIndex > 0) {
			newIndex--;
			if (doIt) {
				selectColumn(newIndex);
			}
		}
		return newIndex;
	}

	/**
	 * Selects the specified column in the table header. Repaints the affected
	 * header cells and makes sure the newly selected one is visible.
	 */
	void selectColumn(int newColIndex) {
		selectColumn(newColIndex, true);
	}

	void selectColumn(int newColIndex, boolean doScroll) {
		Rectangle repaintRect = tableHeader.getHeaderRect(selectedColumnIndex);
		tableHeader.repaint(repaintRect);
		selectedColumnIndex = newColIndex;
		repaintRect = tableHeader.getHeaderRect(newColIndex);
		tableHeader.repaint(repaintRect);
		if (doScroll) {
			scrollToColumn(newColIndex);
		}
		return;
	}

	/**
	 * Used by selectColumn to scroll horizontally, if necessary, to ensure that the
	 * newly selected column is visible.
	 */
	private void scrollToColumn(int col) {
		Container container;
		JTable table;

		// Test whether the header is in a scroll pane and has a table.
		if ((tableHeader.getParent() == null) || ((container = tableHeader.getParent().getParent()) == null)
				|| !(container instanceof JScrollPane) || ((table = tableHeader.getTable()) == null)) {
			return;
		}

		// Now scroll, if necessary.
		table.computeVisibleRect(tmpRect);
		table._getCellRect(0, col, true, cellBounds);
		tmpRect.x = cellBounds.x;
		tmpRect.width = cellBounds.width;
		table.scrollRectToVisible(tmpRect);
	}

	private int getSelectedColumnIndex() {
		int numCols = tableHeader.getColumnModel().getColumnCount();
		if (selectedColumnIndex >= numCols && numCols > 0) {
			selectedColumnIndex = numCols - 1;
		}
		return selectedColumnIndex;
	}

	private static boolean canResize(TableColumn column, JTableHeader header) {
		return (column != null) && header.getResizingAllowed() && column.getResizable();
	}

	private int changeColumnWidth(TableColumn resizingColumn, JTableHeader th, int oldWidth, int newWidth) {
		resizingColumn.setWidth(newWidth);

		Container container;
		JTable table;

		if ((th.getParent() == null) || ((container = th.getParent().getParent()) == null)
				|| !(container instanceof JScrollPane) || ((table = th.getTable()) == null)) {
			return 0;
		}

		if (!container.getComponentOrientation().isLeftToRight() && !th.getComponentOrientation().isLeftToRight()) {
			JViewport viewport = ((JScrollPane) container).getViewport();
			int viewportWidth = viewport.getWidth();
			int diff = newWidth - oldWidth;
			int newHeaderWidth = table.getWidth() + diff;

			/* Resize a table */
			Dimension tableSize = table.getSize();
			tableSize.width += diff;
			table.setSize(tableSize);

			/*
			 * If this table is in AUTO_RESIZE_OFF mode and has a horizontal scrollbar, we
			 * need to update a view's position.
			 */
			if ((newHeaderWidth >= viewportWidth) && (table.getAutoResizeMode() == JTable.AUTO_RESIZE_OFF)) {
				Point p = viewport.getViewPosition();
				p.x = Math.max(0, Math.min(newHeaderWidth - viewportWidth, p.x + diff));
				viewport.setViewPosition(p);
				return diff;
			}
		}
		return 0;
	}

	//
	// Baseline
	//

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
		int baseline = -1;
		TableColumnModel columnModel = tableHeader.getColumnModel();
		for (int column = 0; column < columnModel.getColumnCount(); column++) {
			TableColumn aColumn = columnModel.getColumn(column);
			Component comp = getHeaderComponent(column);
			Dimension pref = comp.getPreferredSize();
			int columnBaseline = comp.getBaseline(pref.width, height);
			if (columnBaseline >= 0) {
				if (baseline == -1) {
					baseline = columnBaseline;
				} else if (baseline != columnBaseline) {
					baseline = -1;
					break;
				}
			}
		}
		return baseline;
	}


	@Override
	public void paint(Graphics g, JComponent c) {
		super.paint(g, c);
		if (tableHeader.getColumnModel().getColumnCount() <= 0) {
			return;
		}

		working = true;

		boolean ltr = tableHeader.getComponentOrientation().isLeftToRight();
		Rectangle clip = g.getClipBounds();
		Point left = clip.getLocation();
		Point right = new Point(clip.x + clip.width - 1, clip.y);
		TableColumnModel cm = tableHeader.getColumnModel();
		int cMin = tableHeader.columnAtPoint(ltr ? left : right);
		int cMax = tableHeader.columnAtPoint(ltr ? right : left);
		// This should never happen.
		if (cMin == -1) {
			cMin = 0;
		}
		// If the table does not have enough columns to fill the view we'll get -1.
		// Replace this with the index of the last column.
		if (cMax == -1) {
			cMax = cm.getColumnCount() - 1;
		}

		TableColumn draggedColumn = tableHeader.getDraggedColumn();
		int columnWidth;
		Rectangle cellRect = tableHeader.getHeaderRect(ltr ? cMin : cMax);
		TableColumn aColumn;
		if (ltr) {
			for (int column = cMin; column <= cMax; column++) {
				aColumn = cm.getColumn(column);
				columnWidth = aColumn.getWidth();
				cellRect.width = columnWidth;
				if (aColumn != draggedColumn) {
					paintCell(g, cellRect, column);
				}
				cellRect.x += columnWidth;
			}
		} else {
			for (int column = cMax; column >= cMin; column--) {
				aColumn = cm.getColumn(column);
				columnWidth = aColumn.getWidth();
				cellRect.width = columnWidth;
				if (aColumn != draggedColumn) {
					paintCell(g, cellRect, column);
				}
				cellRect.x += columnWidth;
			}
		}

		// Paint the dragged column if we are dragging.
		if (draggedColumn != null) {
			int draggedColumnIndex = viewIndexForColumn(draggedColumn);
			Rectangle draggedCellRect = tableHeader.getHeaderRect(draggedColumnIndex);

			// Draw a gray well in place of the moving column.
			g.setColor(tableHeader.getParent().getBackground());
			g.fillRect(draggedCellRect.x, draggedCellRect.y, draggedCellRect.width, draggedCellRect.height);

			draggedCellRect.x += tableHeader.getDraggedDistance();

			// Fill the background.
			g.setColor(tableHeader.getBackground());
			g.fillRect(draggedCellRect.x, draggedCellRect.y, draggedCellRect.width, draggedCellRect.height);

			paintCell(g, draggedCellRect, draggedColumnIndex);
		}

		paintGrid(g, cMin, cMax);

		// Remove all components in the rendererPane.
		rendererPane.removeAll();

		working = false;
	}

	private void paintGrid(Graphics g, int cMin, int cMax) {
		g.setColor(table.getGridColor());
		int h = tableHeader.getHeight();
		table._getCellRect(0, cMin, true, JSTableUI.minCell);
		table._getCellRect(0, cMax, true, JSTableUI.maxCell);
		Rectangle damagedArea = JSTableUI.minCell.union(JSTableUI.maxCell);
		if (table.getShowHorizontalLines()) {
			g.drawLine(0, h - 1, damagedArea.width, h - 1);			
		}
		if (table.getShowVerticalLines()) {
			TableColumnModel cm = table.getColumnModel();
			int x;
			if (table.getComponentOrientation().isLeftToRight()) {
				x = damagedArea.x;
				for (int column = cMin; column <= cMax; column++) {
					int w = cm.getColumn(column).getWidth();
					x += w;
					g.drawLine(x, 0, x, h - 1); 
					// BH don't know why we need x not x-1 here and below
				}
			} else {
				x = damagedArea.x;
				for (int column = cMax; column >= cMin; column--) {
					int w = cm.getColumn(column).getWidth();
					x += w;
					g.drawLine(x, 0, x, h - 1);
				}
			}
		}
	}

	//
	// Paint Methods and support
	//

	private JSComponent getHeaderComponent(int col) {
		return getHeaderComponent(col, 0, 0, null);
	}
	private JSComponent getHeaderComponent(int col, int w, int h, DOMNode td) {
		TableColumn aColumn = tableHeader.getColumnModel().getColumn(col);
		TableCellRenderer renderer = aColumn.getHeaderRenderer();
		if (renderer == null) {
			renderer = tableHeader.getDefaultRenderer();
		}

		boolean hasFocus = !tableHeader.isPaintingForPrint() && (col == getSelectedColumnIndex())
				&& tableHeader.hasFocus();
				
		JComponent c = (JComponent) renderer.getTableCellRendererComponent(tableHeader.getTable(), aColumn.getHeaderValue(), false, hasFocus,
				-1, col);
		if (c != null && td != null) {
			JSTableUI.prepareCellRendererUI(c, false, w, h, td, true, tableHeader);
		}
		return c;
	}

	private void paintCell(Graphics g, Rectangle cellRect, int columnIndex) {
		// System.out.println("paintCell header" + columnIndex);
		DOMNode td = CellHolder.findCellNode(this, null, -1, columnIndex);
		if (td == null)
			return;
		int w = cellRect.width;
		int h = cellRect.height;
		JComponent comp = (JComponent) getHeaderComponent(columnIndex, w, h, td);
		if (comp == null)
			return;
		rendererPane.paintComponent(g, comp, tableHeader, cellRect.x, cellRect.y, w, h, true);
		if (td != null)
			comp.秘getUI().setRenderer(null, 0, 0, td);
	}

	private int viewIndexForColumn(TableColumn aColumn) {
		TableColumnModel cm = tableHeader.getColumnModel();
		for (int column = 0; column < cm.getColumnCount(); column++) {
			if (cm.getColumn(column) == aColumn) {
				return column;
			}
		}
		return -1;
	}

	//
	// Size Methods
	//

	private int getHeaderHeight() {
		int height = 0;
		boolean accomodatedDefault = false;
		TableColumnModel columnModel = tableHeader.getColumnModel();
		for (int column = 0; column < columnModel.getColumnCount(); column++) {
			TableColumn aColumn = columnModel.getColumn(column);
			boolean isDefault = (aColumn.getHeaderRenderer() == null);

			if (!isDefault || !accomodatedDefault) {
				
				JSComponent comp = getHeaderComponent(column);
				JSComponentUI ui = comp.秘getUI();
				int rendererHeight = (ui.isUIDisabled ? ui.cellHeight : comp.getPreferredSize().height);
				height = Math.max(height, rendererHeight);

				// Configuring the header renderer to calculate its preferred size
				// is expensive. Optimise this by assuming the default renderer
				// always has the same height as the first non-zero height that
				// it returns for a non-null/non-empty value.
				if (isDefault && rendererHeight > 0) {
					Object headerValue = aColumn.getHeaderValue();
					if (headerValue != null) {
						headerValue = headerValue.toString();

						if (headerValue != null && !headerValue.equals("")) {
							accomodatedDefault = true;
						}
					}
				}
			}
		}
		return height;
	}

	private Dimension createHeaderSize(long width) {
		//TableColumnModel columnModel = tableHeader.getColumnModel();
		// None of the callers include the intercell spacing, do it here.
		if (width > Integer.MAX_VALUE) {
			width = Integer.MAX_VALUE;
		}
		return new Dimension((int) width, getHeaderHeight());
	}

	/**
	 * Return the minimum size of the header. The minimum width is the sum of the
	 * minimum widths of each column (plus inter-cell spacing).
	 */
	@Override
	public Dimension getMinimumSize(JComponent jc) {
		long width = 0;
		Enumeration enumeration = tableHeader.getColumnModel().getColumns();
		while (enumeration.hasMoreElements()) {
			TableColumn aColumn = (TableColumn) enumeration.nextElement();
			width = width + aColumn.getMinWidth();
		}
		return createHeaderSize(width);
	}

	/**
	 * Return the preferred size of the header. The preferred height is the maximum
	 * of the preferred heights of all of the components provided by the header
	 * renderers. The preferred width is the sum of the preferred widths of each
	 * column (plus inter-cell spacing).
	 */
	@Override
	public Dimension getPreferredSize(JComponent jc) {
		long width = 0;
		Enumeration enumeration = tableHeader.getColumnModel().getColumns();
		while (enumeration.hasMoreElements()) {
			TableColumn aColumn = (TableColumn) enumeration.nextElement();
			width = width + aColumn.getPreferredWidth();
		}
		return createHeaderSize(width);
	}

	/**
	 * Return the maximum size of the header. The maximum width is the sum of the
	 * maximum widths of each column (plus inter-cell spacing).
	 */
	@Override
	public Dimension getMaximumSize(JComponent jc) {
		long width = 0;
		Enumeration enumeration = tableHeader.getColumnModel().getColumns();
		while (enumeration.hasMoreElements()) {
			TableColumn aColumn = (TableColumn) enumeration.nextElement();
			width = width + aColumn.getMaxWidth();
		}
		return createHeaderSize(width);
	}

	private static class Actions extends UIAction {
		public static final String TOGGLE_SORT_ORDER = "toggleSortOrder";
		public static final String SELECT_COLUMN_TO_LEFT = "selectColumnToLeft";
		public static final String SELECT_COLUMN_TO_RIGHT = "selectColumnToRight";
		public static final String MOVE_COLUMN_LEFT = "moveColumnLeft";
		public static final String MOVE_COLUMN_RIGHT = "moveColumnRight";
		public static final String RESIZE_LEFT = "resizeLeft";
		public static final String RESIZE_RIGHT = "resizeRight";
		public static final String FOCUS_TABLE = "focusTable";

		public Actions(String name) {
			super(name);
		}

		@Override
		public boolean isEnabled(Object sender) {
			if (sender instanceof JTableHeader) {
				JTableHeader th = (JTableHeader) sender;
				TableColumnModel cm = th.getColumnModel();
				if (cm.getColumnCount() <= 0) {
					return false;
				}

				String key = getName();
				JSTableHeaderUI ui = (JSTableHeaderUI) th.getUI();
				if (ui != null) {
					if (key == MOVE_COLUMN_LEFT) {
						return th.getReorderingAllowed() && maybeMoveColumn(true, th, ui, false);
					} else if (key == MOVE_COLUMN_RIGHT) {
						return th.getReorderingAllowed() && maybeMoveColumn(false, th, ui, false);
					} else if (key == RESIZE_LEFT || key == RESIZE_RIGHT) {
						return canResize(cm.getColumn(ui.getSelectedColumnIndex()), th);
					} else if (key == FOCUS_TABLE) {
						return (th.getTable() != null);
					}
				}
			}
			return true;
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			JTableHeader th = (JTableHeader) e.getSource();
			JSTableHeaderUI ui = (JSTableHeaderUI) th.getUI();
			if (ui == null) {
				return;
			}

			String name = getName();
			if (TOGGLE_SORT_ORDER == name) {
				JTable table = th.getTable();
				RowSorter sorter = table.getRowSorter();
				if (sorter != null) {
					int columnIndex = ui.getSelectedColumnIndex();
					columnIndex = table.convertColumnIndexToModel(columnIndex);
					sorter.toggleSortOrder(columnIndex);
				}
			} else if (SELECT_COLUMN_TO_LEFT == name) {
				if (th.getComponentOrientation().isLeftToRight()) {
					ui.selectPreviousColumn(true);
				} else {
					ui.selectNextColumn(true);
				}
			} else if (SELECT_COLUMN_TO_RIGHT == name) {
				if (th.getComponentOrientation().isLeftToRight()) {
					ui.selectNextColumn(true);
				} else {
					ui.selectPreviousColumn(true);
				}
			} else if (MOVE_COLUMN_LEFT == name) {
				moveColumn(true, th, ui);
			} else if (MOVE_COLUMN_RIGHT == name) {
				moveColumn(false, th, ui);
			} else if (RESIZE_LEFT == name) {
				resize(true, th, ui);
			} else if (RESIZE_RIGHT == name) {
				resize(false, th, ui);
			} else if (FOCUS_TABLE == name) {
				JTable table = th.getTable();
				if (table != null) {
					table.requestFocusInWindow();
				}
			}
		}

		private void moveColumn(boolean leftArrow, JTableHeader th, JSTableHeaderUI ui) {
			maybeMoveColumn(leftArrow, th, ui, true);
		}

		private boolean maybeMoveColumn(boolean leftArrow, JTableHeader th, JSTableHeaderUI ui, boolean doIt) {
			int oldIndex = ui.getSelectedColumnIndex();
			int newIndex;

			if (th.getComponentOrientation().isLeftToRight()) {
				newIndex = leftArrow ? ui.selectPreviousColumn(doIt) : ui.selectNextColumn(doIt);
			} else {
				newIndex = leftArrow ? ui.selectNextColumn(doIt) : ui.selectPreviousColumn(doIt);
			}

			if (newIndex != oldIndex) {
				if (doIt) {
					th.getColumnModel().moveColumn(oldIndex, newIndex);
				} else {
					return true; // we'd do the move if asked
				}
			}

			return false;
		}

		private void resize(boolean leftArrow, JTableHeader th, JSTableHeaderUI ui) {
			int columnIndex = ui.getSelectedColumnIndex();
			TableColumn resizingColumn = th.getColumnModel().getColumn(columnIndex);

			th.setResizingColumn(resizingColumn);
			int oldWidth = resizingColumn.getWidth();
			int newWidth = oldWidth;

			if (th.getComponentOrientation().isLeftToRight()) {
				newWidth = newWidth + (leftArrow ? -1 : 1);
			} else {
				newWidth = newWidth + (leftArrow ? 1 : -1);
			}

			ui.changeColumnWidth(resizingColumn, th, oldWidth, newWidth);
		}
	}
	
	@Override
	protected DOMNode setHTMLElement() {
		return setHTMLElementCUI();
	}

}
