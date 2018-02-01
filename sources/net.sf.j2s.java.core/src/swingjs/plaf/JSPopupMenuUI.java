package swingjs.plaf;


import java.awt.Dimension;

import javax.swing.JComponent;
import javax.swing.JPopupMenu;
import javax.swing.LookAndFeel;
import swingjs.JSUtil;
import swingjs.api.js.JSSwingMenu;
import swingjs.jquery.JQueryUI;
import swingjs.api.js.DOMNode;

public class JSPopupMenuUI extends JSPanelUI {
	
	static {
		Object jqueryui = JQueryUI.class; // loads jQuery.ui
	}

	// a frameless independent window
	
	static JSSwingMenu j2sSwingMenu;
	private JPopupMenu menu;


	public JSPopupMenuUI() {
		
		if (j2sSwingMenu == null) {
			JSUtil.loadStaticResource("swingjs/jquery/j2sMenu.js");
			j2sSwingMenu = JSUtil.J2S._getSwing();
		}
		isContainer = true;	
		isMenuItem = true;
		setDoc();
	}
	
	@Override
	protected DOMNode updateDOMNode() {
		// j2sMenu.js will wrap this in a div with the appropriate
		if (domNode == null) {
//			popupMenu = (JPopupMenu) jc;
//			isTopLevel = (!(popupMenu.getInvoker() instanceof JMenu) 
//					|| ((JMenu) popupMenu.getInvoker()).isTopLevelMenu());
			domNode = containerNode = newDOMObject("ul", id);
		}
		return domNode;
	}

	@Override
	public void installUI(JComponent jc) {
    LookAndFeel.installColorsAndFont(jc,
        "PopupMenu.background",
        "PopupMenu.foreground",
        "PopupMenu.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// TODO Auto-generated method stub
		
	}

	public Object getPopup() {
		// TODO: this causes an uncaught error. 
		return null;		
	}


	/**
	 * j2s bug in this particular method makes this Clazz.overrideMethod, 
	 * but it cannot override if it has a super call,
	 * so I avoid the super call by duplicating the code from JSComponentUI
	 * 
	 */
	@Override
	public void setVisible(boolean b) {
		if (menu == null) {
			// important to do this here, not earlier?
			menu = (JPopupMenu) jc;
			j2sSwingMenu.setMenu(menu);
		}
		if (b) {
			jc.addNotify();
//			jc.repackContainer();
			getOuterNode();
			int x = 0, y = 0;
			
			/**
			 * have to cheat here, because we want screen coordinates
			 * 
			 * @j2sNative
			 * 
			 * x = this.menu.desiredLocationX;
			 * y = this.menu.desiredLocationY;
			 * 
			 */
			{}
			j2sSwingMenu.showMenu(menu, x, y);
		} else {
			j2sSwingMenu.hideMenu(menu);
		}
	}
	
	@Override
	public void dispose() {
    DOMNode.remove(domNode);
    DOMNode.remove(outerNode);
    j2sSwingMenu.disposeMenu(menu);
	}

	@Override
	public Dimension getPreferredSize() {
		// unnecessary  -- will never be subject to a layout manager
		return null;
	}


}
