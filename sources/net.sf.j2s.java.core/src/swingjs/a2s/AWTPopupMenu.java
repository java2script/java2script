package swingjs.a2s;

import java.awt.Component;
import java.awt.Container;

public interface AWTPopupMenu extends AWTMenu {
    public Container getParent();
    public void show(Component origin, int x, int y);
	
}
