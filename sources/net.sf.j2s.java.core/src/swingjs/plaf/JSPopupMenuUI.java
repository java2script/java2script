package swingjs.plaf;


import java.awt.Dimension;
import java.awt.event.ContainerEvent;
import java.awt.event.ContainerListener;

import javax.swing.JComponent;
import javax.swing.JPopupMenu;
import javax.swing.LookAndFeel;

import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JSSwingMenu;
import swingjs.jquery.JQueryUI;

public class JSPopupMenuUI extends JSPanelUI implements ContainerListener {

	
	static {
		@SuppressWarnings("unused")
		Object jqueryui = JQueryUI.class; // loads jQuery.ui
	}

	// a frameless independent window
	
	private static JSSwingMenu j2sSwingMenu;
	

	@Override
	public void componentAdded(ContainerEvent e) {
		// OK, the idea here is that we detach all child nodes
		// and then reattach them. 
		DOMNode.detachAll(outerNode);
		setTainted();
		setHTMLElement();
	}

	@Override
	public void componentRemoved(ContainerEvent e) {
		DOMNode.detachAll(outerNode);
		setTainted();
		setHTMLElement();
	}

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
			DOMNode.addJqueryHandledEvent(this, domNode, "mouseenter");
		}
		return updateDOMNodeCUI();
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		checkStopPopupMenuTimer(target, eventType, jQueryEvent);
		return super.handleJSEvent(target, eventType, jQueryEvent);
	}

	@Override
	public void installUI(JComponent jc) {
		((JPopupMenu) jc).addContainerListener(this);
      LookAndFeel.installColorsAndFont(jc,
        "PopupMenu.background",
        "PopupMenu.foreground",
        "PopupMenu.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		((JPopupMenu) jc).removeContainerListener(this);
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

	/*not private*/ void hideMenu() {
		if (menu != null)
			j2sSwingMenu.hideMenu(menu);	
	}
	
	@Override
	public void dispose() {
    DOMNode.dispose(domNode);
    DOMNode.dispose(outerNode);
    if (menu != null)
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
