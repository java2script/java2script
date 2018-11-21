package swingjs.plaf;


import java.awt.Dimension;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;

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
	
	int timer;

	public JSPopupMenuUI() {
		
		if (j2sSwingMenu == null) {
			JSUtil.loadStaticResource("swingjs/jquery/j2sMenu.js");
			j2sSwingMenu = J2S.getSwing();
		}
		isContainer = true;	
		isMenuItem = true;
		isPopupMenu = true;
		setDoc();
	}
	
	@Override
	public DOMNode updateDOMNode() {
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

	@Override
	public void setVisible(boolean b) {
		if (b) {
			if (isTainted || menu == null || outerNode == null || DOMNode.firstChild(outerNode) == null) {
				if (menu == null) {
					// important to do this here, not earlier?
					setTainted();
					setHTMLElement();
					menu = (JPopupMenu) jc;
					j2sSwingMenu.setMenu(menu);
					isTainted = false;
				} else {
					updateMenu(true);
				}
			}
			jc.addNotify();
//			jc.repackContainer();
			int x = 0, y = 0;

			/**
			 * have to cheat here, because we want screen coordinates
			 * 
			 * @j2sNative
			 * 
			 * 			x = this.menu.desiredLocationX; y = this.menu.desiredLocationY;
			 * 
			 */
			{
			}
			j2sSwingMenu.showMenu(menu, x, y);
		} else {
			hideMenu();
		}
	}

	void startTimer() {
		System.out.println("startTimer");
		Object me = this;
		timer = /** @j2sNative setTimeout(function() { me.hideMenu$()},1000) || */0;
	}

	void stopTimer() {
		System.out.println("stopTimer");
	  /** @j2sNative
	   *  
	   * if (this.timer) 
	   *   clearTimeout(this.timer); 
	   */
	  timer = 0;
	}
	
	void hideMenu() {
		System.out.println("hideMenu");
		// not private -- hideMenu$
		j2sSwingMenu.hideMenu(menu);	
	}
	
	@Override
	public void dispose() {
    DOMNode.dispose(domNode);
    DOMNode.dispose(outerNode);
    j2sSwingMenu.disposeMenu(menu);
	}

	@Override
	public Dimension getPreferredSize() {
		// unnecessary  -- will never be subject to a layout manager
		return null;
	}

	public void updateMenu(boolean andShow) {
		setTainted();
		setHTMLElement();
		JSPopupMenuUI.j2sSwingMenu.updateMenu(menu, andShow);
	}

}
