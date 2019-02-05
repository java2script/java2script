package swingjs.a2s;

import javax.swing.JMenuItem;

public interface AWTMenu extends AWTMenuItem {
	
    public boolean isTearOff();
    public int getItemCount();
    public int countItems();
    public java.awt.MenuItem getItem(int index);
    public java.awt.MenuItem add(java.awt.MenuItem mi);
    public JMenuItem add(String label); // was void
    public void insert(java.awt.MenuItem menuitem, int index);
    public void insert(String label, int index);
    public void addSeparator();
    public void insertSeparator(int index);
    public void remove(int index);
    public void removeAll();


}
