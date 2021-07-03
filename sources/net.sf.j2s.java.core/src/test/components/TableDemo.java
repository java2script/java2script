/*
 * Copyright (c) 1995, 2008, Oracle and/or its affiliates. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   - Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *
 *   - Neither the name of Oracle or the names of its
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package test.components;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Rectangle;
import javax.swing.JButton;
import javax.swing.JComponent;

/*
 * TableDemo.java requires no other files.
 */

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.SwingConstants;
import javax.swing.border.LineBorder;
import javax.swing.plaf.basic.BasicTableUI;
import javax.swing.table.AbstractTableModel;
import javax.swing.table.TableCellRenderer;

/**
 * TableDemo is just like SimpleTableDemo, except that it uses a custom
 * TableModel.
 */
public class TableDemo extends JPanel {
	public class ColorRenderer extends JLabel implements TableCellRenderer {
		
		@Override
		public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus,
				int row, int column) {
			setOpaque(true);
			setBackground(colors[row % 3]);
			setText("" + row);
			setHorizontalAlignment(SwingConstants.CENTER);
			setBorder(new LineBorder(Color.white, 3));
			return this;
		}
		
		public Component getComponent() {
			return this;
		}

	}

	static Color[] colors = new Color[] {Color.red, Color.blue, Color.green};

	public class DemoColor {}

	private DemoColor color = new DemoColor();
	private boolean DEBUG = false;
	
	JTable table;
	
	@Override
	public void paint(Graphics g) {
		System.err.println("TableDemo g.clip=" +  g.getClipBounds());
		System.err.println("TableDemo bounds=" +  getBounds());
		super.paint(g);
		
	}

	public TableDemo() {
		table = new JTable();
		if (/** @j2sNative false && */
		true)
			table.setUI(new BasicTableUI() {
				@Override
				public void paint(Graphics g, JComponent c) {
//				try { throw new NullPointerException();}catch (Exception e) {e.printStackTrace();}
//				System.err.println("TableDemoUI g.clip=" +  g.getClipBounds());
					super.paint(g, c);

				}

			});

		table.setRowHeight(40);
		// table.setRowHeight(16);
		// table.setRowMargin(1);
		table.setPreferredScrollableViewportSize(new Dimension(500, 300));
		table.setFillsViewportHeight(true);

		table.setDefaultRenderer(DemoColor.class, new ColorRenderer());

		table.setSize(600, 200);
		setTableModel(0);

		// Create the scroll pane and add the table to it.
		JScrollPane scrollPane = new JScrollPane(table);

		// Add the scroll pane to this panel.
		add(scrollPane);

		JButton btn = new JButton("New Model");
		btn.addActionListener((e) -> {
			setTableModel(pt = (pt + 1) % 3);
		});
		btn.setMaximumSize(new Dimension(80, 20));
		add(btn);
		btn = new JButton("Scroll to top");
		btn.addActionListener((e) -> {
			table.scrollRectToVisible(new Rectangle(0, 0, 10, 10));
		});
		btn.setMaximumSize(new Dimension(80, 20));
		add(btn);
		btn = new JButton("Scroll to bottom");
		btn.addActionListener((e) -> {
			table.scrollRectToVisible(new Rectangle(0, 10600, 10, 10));
		});
		btn.setMaximumSize(new Dimension(80, 20));
		add(btn);
		btn = new JButton("New headings");
		btn.addActionListener((e) -> {
			for (int i = table.getColumnModel().getColumnCount(); --i >= 0;) {
				table.getColumnModel().getColumn(i).setHeaderValue("col" + "abcdefghijklm".substring(0,(int) (Math.random()*10)));			
			}
			table.getTableHeader().repaint();
		});
		btn.setMaximumSize(new Dimension(80, 20));
		add(btn);

	}

	int pt = 0;
	
	private void setTableModel(int i) {
	    table.setModel(new MyTableModel(i));
	}

	class MyTableModel extends AbstractTableModel {
		private String[] columnNames = { "Row", "Fav. Color", "First Name", "Last Name", "Sport", "# of Years", "Vegetarian" };
		private int i = 0;
		private int dataPt = 0;

		MyTableModel(int pt) {
			dataPt = pt;
		}
		
		Object[][][] aData = {{ { ++i,  color, "Kathy", "Smith", "Snowboarding", new Integer(5), new Boolean(false) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "Joe", "Brown", "Pool", new Integer(10), new Boolean(false) } 
				}, { 
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ ++i,  color, "Joe", "Brown", "Pool", new Integer(10), new Boolean(false) }
				},
				{ 
					{ ++i,  color, "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
					{ ++i,  color, "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
					{ ++i,  color, "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				}
		};

		@Override
		public int getColumnCount() {
			return columnNames.length;
		}

		@Override
		public int getRowCount() {
			return aData[dataPt].length;
		}

		@Override
		public String getColumnName(int col) {
			return columnNames[col];
		}

		@Override
		public Object getValueAt(int row, int col) {
			return  aData[dataPt][row][col];
		}

		/*
		 * JTable uses this method to determine the default renderer/ editor for each
		 * cell. If we didn't implement this method, then the last column would contain
		 * text ("true"/"false"), rather than a check box.
		 */
		@Override
		public Class getColumnClass(int c) {
			return getValueAt(0, c).getClass();
		}

		/*
		 * Don't need to implement this method unless your table's editable.
		 */
		@Override
		public boolean isCellEditable(int row, int col) {
			// Note that the data/cell address is constant,
			// no matter where the cell appears onscreen.
			if (col < 3) {
				return false;
			} else {
				return true;
			}
		}

		/*
		 * Don't need to implement this method unless your table's data can change.
		 */
		@Override
		public void setValueAt(Object value, int row, int col) {
			if (DEBUG) {
				System.out.println("Setting value at " + row + "," + col + " to " + value + " (an instance of "
						+ value.getClass() + ")");
			}

			 aData[dataPt][row][col] = value;
			fireTableCellUpdated(row, col);

			if (DEBUG) {
				System.out.println("New value of data:");
				printDebugData();
			}
		}

		private void printDebugData() {
			int numRows = getRowCount();
			int numCols = getColumnCount();

			for (int i = 0; i < numRows; i++) {
				System.out.print("    row " + i + ":");
				for (int j = 0; j < numCols; j++) {
					System.out.print("  " +  aData[dataPt][i][j]);
				}
				System.out.println();
			}
			System.out.println("--------------------------");
		}
	}

	/**
	 * Create the GUI and show it. For thread safety, this method should be invoked
	 * from the event-dispatching thread.
	 */
	private static void createAndShowGUI() {
		// Create and set up the window.
		JFrame frame = new JFrame("TableDemo");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

		// Create and set up the content pane.
		TableDemo newContentPane = new TableDemo();
		newContentPane.setOpaque(true); // content panes must be opaque
		frame.setContentPane(newContentPane);

		// Display the window.
		frame.pack();
		frame.setVisible(true);
	}

	public static void main(String[] args) {
		// Schedule a job for the event-dispatching thread:
		// creating and showing this application's GUI.
		javax.swing.SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				createAndShowGUI();
			}
		});
	}
}
