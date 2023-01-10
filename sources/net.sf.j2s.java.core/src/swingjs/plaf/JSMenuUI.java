package swingjs.plaf;

import java.awt.Component;
import java.awt.Dimension;
import java.awt.JSComponent;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JMenu;
import javax.swing.event.MenuEvent;
import javax.swing.event.MenuListener;

import swingjs.api.js.DOMNode;

public class JSMenuUI extends JSMenuItemUI implements MenuListener {

	private JMenu jm;

	public JSMenuUI() {
		isMenu = true;
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
		boolean isMenuBarMenu = jm.isTopLevelMenu();
		if (domNode != null && isMenuItem == isMenuBarMenu) {
			// we have changed the type of menu, from popup to menubar or something like
			// that.
			// the outerNode for a menu item is its domNode, the <li> tag. But a MenuBar
			// needs
			// the outerNode. The domNode should be fine. The big change is the
			// containerNode
			outerNode = null;
			if (isMenuBarMenu)
				DOMNode.detachAll(((JSComponentUI) jc.getParent().ui).domNode);
		}
		if (domNode == null) {
			domNode = createItem(isMenuBarMenu ? "_bar" : "_elem", null);
			bindJQueryEvents(domNode, "mouseenter mouseleave", SOME_MOUSE_EVENT);
		}
		imagePersists = true;
		allowTextAlignment = isMenuItem = !isMenuBarMenu;
		containerNode = (isMenuBarMenu ? null : domNode);
		addClass(domNode, isMenuBarMenu ? "j2s-menuBar-menu" : "j2s-popup-menu");
		removeClass(domNode, !isMenuBarMenu ? "j2s-menuBar-menu" : "j2s-popup-menu");
		if (isMenuBarMenu)
			removeClass(menuAnchorNode, "a");
		else
			addClass(menuAnchorNode, "a");
		setCssFont(domNode, c.getFont());
		DOMNode.setVisible(domNode, jc.isVisible());
		setIconAndText("menu", currentIcon, currentGap, currentText);
		setAlignments(jm, false);
		updateCenteringNode();
		if (isMenuBarMenu)
			DOMNode.setStyle(textNode, "left", "0px");
		return domNode;
	}

	@Override
	public void propertyChangedFromListener(PropertyChangeEvent e, String prop) {
		// System.out.println("JSMenuUI prop = " + prop + " " + jm.getText());
		if (JSComponent.秘getTopInvokableAncestor(jc, false) != null)
			updateDOMNode(); // font changes 
		super.propertyChangedFromListener(e, prop);
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		// System.out.println("JSMenuUI prop " + prop);
		if (jc.isVisible()) {
			if (prop == "ancestor") {
				rebuild();
			}
		}
		super.propertyChange(e);
	}

	private void rebuild() {
		if (jc.getParent() != null) {
			if (domNode != null && isMenuItem == jm.isTopLevelMenu()) {
        outerNode = null;
				reInit(true);
				return;
			}
		}
	}

	@Override
	public void installUI(JComponent jc) {
		jm = (JMenu) jc;
		super.installUI(jc);
		jm.addMenuListener(this);
		((JMenu) menuItem).setDelay(200);
	}

	@Override
	public void uninstallUI(JComponent jc) {
		super.uninstallUI(jc);
	}

	/**
	 * note that the last element is null if array is oversize
	 * 
	 */
	@Override
	protected Component[] getChildren() {
		return (isMenuItem ? new Component[] { jm.getPopupMenu() } : JSComponent.秘getChildArray(jm));
	}

	@Override
	protected int getChildCount() {
		return (isMenuItem ? 1 : jc.getComponentCount());
	}

	@Override
	protected String getPropertyPrefix() {
		return "Menu";
	}

	@Override
	public void menuSelected(MenuEvent e) {
		if (jm.isTopLevelMenu())
		jm.setPopupMenuVisible(true);		
	}

	@Override
	public void menuDeselected(MenuEvent e) {
		if (jm.isTopLevelMenu())
		jm.setPopupMenuVisible(false);		
	}

	@Override
	public void menuCanceled(MenuEvent e) {
		if (jm.isTopLevelMenu())
		jm.setPopupMenuVisible(false);		
	}

}
