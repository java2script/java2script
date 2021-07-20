package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Date;

import javax.swing.Action;
import javax.swing.ActionMap;
import javax.swing.BoxLayout;
import javax.swing.DefaultListModel;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JList;
import javax.swing.JPanel;
import javax.swing.JTable;
import javax.swing.JTextPane;
import javax.swing.ListSelectionModel;
import javax.swing.SwingUtilities;
import javax.swing.TransferHandler;
import javax.swing.table.DefaultTableModel;

import swingjs.JSUtil;
import swingjs.plaf.JSTableUI;

public class Test_Clipboard extends JFrame {

	public static class CopiableTable extends JTable {

		@SuppressWarnings("unused")
		public void copy() {
			if (/** @j2sNative true || */
			false) {
				JSTableUI ui = (JSTableUI) 秘getUI();
				ui.installDefaultTransferHandlerIfNecessary();
			}
			invokeAction("copy", TransferHandler.getCopyAction());
		}
	  
		public void invokeAction(String name, Action altAction) {
			ActionMap map = getActionMap();
			Action action = null;

			if (map != null) {
				action = map.get(name);
			}
			// installDefaultTransferHandlerIfNecessary();
			if (action == null) {
				action = altAction;
			}
			action.actionPerformed(new ActionEvent(this, ActionEvent.ACTION_PERFORMED,
					(String) action.getValue(Action.NAME), EventQueue.getMostRecentEventTime(), 0));
		}

	}

	private DefaultListModel listModel;

	public Test_Clipboard() {
		super();
		JPanel p = new JPanel();
		p.setLayout(new BoxLayout(p, BoxLayout.X_AXIS));
		add(p, BorderLayout.CENTER);
		this.setLocation(300, 300);

		//JTextArea area = new JTextArea(10, 50);
		JTextPane area = new JTextPane();
		
		area.setText("this\nis\na\ntest\n" + new Date());
		p.add(area);
		//area.setOpaque(false);
   
		//area.setBackground(Color.orange);

		String[] columnNames = { "First Name", "Last Name", "Sport", "# of Years",
				// "Vegetarian"
		};

		Object[][] data = { { "Kathy", "Smith", "Snowboarding", new Integer(5), new Boolean(false) },
				{ "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ "Kathy", "Smith", "Snowboarding", new Integer(5), new Boolean(false) },
				{ "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ "Kathy", "Smith", "Snowboarding", new Integer(5), new Boolean(false) },
				{ "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ "Kathy", "Smith", "Snowboarding", new Integer(5), new Boolean(false) },
				{ "John", "Doe", "Rowing", new Integer(3), new Boolean(true) },
				{ "Sue", "Black", "Knitting", new Integer(2), new Boolean(false) },
				{ "Jane", "White", "Speed reading", new Integer(20), new Boolean(true) },
				{ "Joe", "Brown", "Pool", new Integer(10), new Boolean(false) } };

		CopiableTable table = new CopiableTable();
		table.setModel(new DefaultTableModel(data, columnNames));
		table.setCellSelectionEnabled(true);
		table.setFillsViewportHeight(true);
		table.setBackground(Color.yellow);
		//table.setRowHeight(10); // very tight! exact match
		//table.setRowMargin(10);
		table.getColumnModel().setColumnMargin(10);
		//JScrollPane scrollPane = new JScrollPane(table);

		//p.add(scrollPane);
		p.add(table);
		
		listModel = new DefaultListModel();
		listModel.addElement("Jane Doe");
		listModel.addElement("John Smith");
		listModel.addElement("Kathy Green");
		listModel.addElement("Rose Red");
		listModel.addElement("Nearly Black");
		listModel.addElement("Pearly White");
		// Create the list and put it in a scroll pane.
		JList list = new JList(listModel);
		list.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 24));
		list.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
		list.setSelectedIndex(0);
		//list.addListSelectionListener(this);
		list.setVisibleRowCount(5);
		p.add(list);
		
		JPanel m = new JPanel(new GridLayout());

		JButton btn = new JButton("copy text");
		btn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (area.getSelectedText() == null || area.getSelectedText().length() == 0)
					area.selectAll();
				SwingUtilities.invokeLater(new Runnable() {
					public void run() {
						area.copy();
					}
				});
			}

		});
		m.add(btn, null);
		btn = new JButton("copy table");
		btn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if (table.getSelectedColumnCount() == 0 && table.getSelectedColumnCount() == 0)
					table.selectAll();
				table.copy();
			}

		});

		m.add(btn, null);
		btn = new JButton("paste");
		btn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {				
				new JSUtil().getClipboardText((text) -> {
					System.out.println(text);
				});
			}

		});
		m.add(btn, null);
		add(m, BorderLayout.SOUTH);

		pack();
		setVisible(true);
	}

	public static void main(String[] args) {
		try {
			new Test_Clipboard();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
