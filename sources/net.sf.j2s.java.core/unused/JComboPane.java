package swingjs.plaf;

import java.awt.Dimension;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

import javax.swing.BoxLayout;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JPanel;

import javajs.util.Lst;


/**
 * TODO: very preliminary version of a simple JTabbedPane
 * 
 * @author Bob Hanson
 *
 */
public class JComboPane extends JPanel {

	private JPanel pagePanel;
	private JComboBox tabs;
	// private BS bsEnabled = new BS();

	// just faking a JTabbedPane here using a drop-down combo box and a JPanel
	// This will take considerably more work to make it right in general.

	public JComboPane() {
		pagePanel = new JPanel();
		pagePanel.setLayout(new BoxLayout(pagePanel, BoxLayout.PAGE_AXIS));
		tabs = new JComboBox();
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
		addTab(panel, title, index);
	}

	private class Page {
		String tab;
		JComponent component;
	}

	Lst<Page> pages = new Lst<Page>();

	public void add(String title, JComponent panel) {
		addTab(panel, title, pages.size());
	}

	public void addTab(String title, JComponent panel) {
		addTab(panel, title, pages.size());
	}

	public void addTab(JComponent panel, String title, int index) {
		// improperly allowing for multiple instances of a panel
		Page page = new Page();
		page.component = panel;
		page.tab = (title == null ? "tab" + index : title);
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

	@Override
	public void remove(int n) {
		pages.removeItemAt(n);
		tabs.removeItemAt(n);
		update(false);
		// bsEnabled.clearAll();
		// bsEnabled.set(lastSelected);
	}

	public void setMnemonicAt(int i, int mnemonic) {
		// TODO Auto-generated method stub
		
	}

	public void setDisplayedMnemonicIndexAt(int i, int displayedMnemonicIndex) {
		// TODO Auto-generated method stub
		
	}

}
