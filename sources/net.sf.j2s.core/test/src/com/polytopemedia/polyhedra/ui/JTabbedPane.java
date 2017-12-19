package com.polytopemedia.polyhedra.ui;

import java.awt.Dimension;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

import javax.swing.BoxLayout;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JPanel;

import javajs.util.Lst;

@SuppressWarnings("serial")
public class JTabbedPane extends JPanel {

	private JPanel pagePanel;
	private JComboBox<String> tabs;
	// private BS bsEnabled = new BS();

	// just faking a JTabbedPane here using a drop-down combo box and a JPanel
	// This will take considerably more work to make it right in general.

	public JTabbedPane() {
		pagePanel = new JPanel();
		pagePanel.setLayout(new BoxLayout(pagePanel, BoxLayout.PAGE_AXIS));
		tabs = new JComboBox<String>();
		tabs.setMaximumSize(new Dimension(150, 15));
		tabs.addItemListener(new ItemListener() {

			@Override
			public void itemStateChanged(ItemEvent e) {
				update(false);
			}

		});
		setLayout(new BoxLayout(this, BoxLayout.PAGE_AXIS));
		add(tabs);
		add(pagePanel);
	}

	public void add(JComponent panel, String title, int index) {
		addIndex(panel, title, index);
	}

	private class Page {
		String tab;
		JComponent component;
	}

	Lst<Page> pages = new Lst<Page>();

	public void add(String title, JComponent panel) {
		addIndex(panel, title, pages.size());
	}

	private void addIndex(JComponent panel, String title, int index) {
		// improperly allowing for multiple instances of a panel
		Page page = new Page();
		page.component = panel;
		page.tab = title;
		panel.setVisible(true);
		if (index < pages.size()) {
			pages.get(index).component = panel;
		} else {
			pages.addLast(page);
			update(true);
		}
	}

	private void update(boolean combo) {
		if (combo) {
			int i0 = tabs.getSelectedIndex();
			tabs.removeAllItems();
			for (int i = 0; i < pages.size(); i++) {
				tabs.addItem(pages.get(i).tab);
			}
			tabs.setSelectedIndex(i0 < 0 ? 0 : i0);
		}
		pagePanel.removeAll();
		int selected = getSelectedIndex();
		if (selected >= 0) {// && bsEnabled.get(selected)) {
			pagePanel.add(pages.get(selected).component);
		}
		revalidate();
		repaint();
	}

	public void setComponentAt(int index, JPanel panel) {
		if (index < 0 || index >= pages.size())
			throw new IndexOutOfBoundsException();
		pages.get(index).component = panel;
		update(false);
	}

	public int getTabCount() {
		return tabs.getItemCount();
	}

	public void setSelectedIndex(int index) {
		tabs.setSelectedIndex(index);
		update(false);
	}

	public int getSelectedIndex() {
		return tabs.getSelectedIndex();
	}

	public void setEnabledAt(int index, boolean bEnable) {
		// bsEnabled.setBitTo(index, bEnable);
		// if (!bEnable && index == getSelectedIndex()) {
		// for (int i = index - 1; --i >= 0;) {
		// if (bsEnabled.get(i)) {
		// setSelectedIndex(i);
		// return;
		// }
		// }
		// }
		// update(false, true);
	}

	public void remove(int n) {
		pages.removeItemAt(n);
		tabs.removeItemAt(n);
		update(false);
		// bsEnabled.clearAll();
		// bsEnabled.set(lastSelected);
	}

}
