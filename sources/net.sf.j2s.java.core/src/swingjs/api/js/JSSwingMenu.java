package swingjs.api.js;

import javax.swing.JPopupMenu;

public interface JSSwingMenu {

void disposeMenu(JPopupMenu menu);
void hideMenu(JPopupMenu menu);
void setMenu(JPopupMenu menu);
void showMenu(JPopupMenu menu, int x, int y);


}
