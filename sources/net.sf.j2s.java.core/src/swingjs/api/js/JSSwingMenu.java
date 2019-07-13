package swingjs.api.js;

import javax.swing.JPopupMenu;

/**
 * An abstract class to cover the JavaScript calls made to j2sMenu
 * @author hansonr
 *
 */
public abstract class JSSwingMenu {

	public class Options {
		public JPopupMenu jPopupMenu;
		public int delay;
		public boolean disabled;
		public JQueryObject focus, blur, select;
	}
	
public JQueryObject active, activeMenu, element;
public Options options;
public abstract void disposeMenu(JPopupMenu menu);
public abstract void hideMenu(JPopupMenu menu);
public abstract void setMenu(JPopupMenu menu);
public abstract void showMenu(JPopupMenu menu, int x, int y);
public abstract void updateMenu(JPopupMenu menu, boolean andShow);
public abstract void updateMenuItem(JPopupMenu menu, DOMNode domNode);
public abstract JSSwingMenu getInstance(JPopupMenu menu);
public abstract void _keydown(Object jqevent);
}
