package swingjs.a2s;

import java.awt.MenuComponent;
import java.awt.MenuShortcut;
import java.awt.event.ActionListener;
import java.util.EventListener;

public interface AWTMenuItem extends MenuComponent {

    public void addNotify();
    public String getLabel();
    public void setLabel(String label);
    public void enable();
    public void enable(boolean b);
    public void disable();
    public MenuShortcut getShortcut();
    public void setShortcut(MenuShortcut s);
    public void deleteShortcut();
    public void setActionCommand(String command);
    public String getActionCommand();
    public void addActionListener(ActionListener l);
    public void removeActionListener(ActionListener l);
    public ActionListener[] getActionListeners();
    public <T extends EventListener> T[] getListeners(Class<T> listenerType);

}
