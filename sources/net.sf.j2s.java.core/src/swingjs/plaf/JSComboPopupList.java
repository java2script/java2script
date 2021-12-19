package swingjs.plaf;

import java.awt.Dimension;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.util.EventObject;

import javax.swing.JComponent;
import javax.swing.JList;

import swingjs.JSEvent;
import swingjs.JSKeyEvent;
import swingjs.JSMouse;
import swingjs.JSToolkit;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;
import swingjs.api.js.JSFunction;

class JSComboPopupList extends JList {

	// the ".api.js." in these method names cause them to be unqualified, all ending up method j2sCB() 
	private interface api {
		interface js extends JQueryObject {

			abstract js j2sCB(Object options);

			abstract Object[] j2sCB(String method);

			abstract Object[] j2sCB(String method, Object o);

			abstract Object[] j2sCB(String method, int i);

			abstract int j2sCB(String OPTION, String name);

		}
	}


	private final JSComboBoxUI cbui;
	private api.js j2scb;
	DOMNode popupNode;

	JSComboPopupList(JSComboBoxUI ui) {
		super(ui.comboBox.getModel());
		cbui = ui;
	}

	@Override
	public boolean 秘processUIEvent(MouseEvent e) {
		switch (e.getID()) {
		case MouseEvent.MOUSE_MOVED:
		case MouseEvent.MOUSE_ENTERED:
		case MouseEvent.MOUSE_EXITED:
			// here we implement a call that developers can catch for list hovering
			int i = getJ2SCBInt("hoveredIndex");
			if (i >= 0)
				cbui.comboBox.getRenderer().getListCellRendererComponent(this, getModel().getElementAt(i), i, true,
						false);
			updateZIndex();
			break;
		}
		return true;
	}

	private int getJ2SCBInt(String name) {
		if (j2scb == null)
			return Integer.MIN_VALUE;
		Object widget = getWidget();
		return /** @j2sNative widget.options[name] || */0;
	}

	@SuppressWarnings("unused")
	void createJ2SCB() {
		uninstallingUI();
		j2scb = (api.js) cbui.$(cbui.domNode);
		@SuppressWarnings("unused")
		Object me = this;
		JSFunction fChange = /** @j2sNative function(){p$1.fChange$O$O$S$O.apply(me,arguments)} || */
				null;
		String name = cbui.jc.getName();
		j2scb.j2sCB(/** @j2sNative {change:fChange, name:name} || */
				"");
		updateCSS();
		updateList();
		updateSelectedIndex();
		Object widget = getWidget();
		popupNode = /** @j2sNative widget.popup[0] || */null;
	}

	private Object getWidget() {
		if (j2scb == null)
			return null;
		JQueryObject obj = cbui.$(j2scb);
		return /** @j2sNative obj.data("j2sCB") || */null;
	}

	public void setComboVisible(boolean b) {
		setVisible(b, false);
	}


	void setPopupVisible(boolean vis) {
		setVisible(vis, true);
	}
	void setVisible(boolean vis, boolean andPopup) {
		if (!vis) {
			try {
			if (j2scb != null)
				j2scb.j2sCB("hidePopup");
			} catch (Throwable t) {
				// ignore
			}
			JSPopupMenuUI.hideMenusAndToolTip();
			return;
		}
		if (j2scb == null)
			createJ2SCB();
		if (cbui.isTainted)
			updateList();
		JSComponentUI.containerToFront(cbui.comboBox);
		updateZIndex();
		if (andPopup)
			j2scb.j2sCB("showPopup");
		updateSelectedIndex();

	}

	void updateZIndex() {
		if (j2scb == null) // disposed
			return;
		j2scb.j2sCB("setZIndex", JSComponentUI.getInheritedZ(cbui.comboBox) + 1);
		updateCSS();
	}

	void updateText() {
		// TODO -- this might be much more than a string
	}

	void updateCSS() {
		秘getUI().allowPaintedBackground = false;
		DOMNode.setSize(cbui.domNode, cbui.width, cbui.height);
		if (j2scb != null) {
			j2scb.j2sCB("updateCSS");
		}
	}

	void updateList() {
		if (j2scb == null)
			return;
		int n = cbui.comboBox.getItemCount();
		DOMNode[] opts = new DOMNode[n*2];
		JList l = this;
		Dimension d = l.getPreferredSize();
		int h = d.height;
		int w = d.width;
		JSListUI ui = (JSListUI) l.getUI();
		for (int i = 0, p = 0; i < n; i++) {
			opts[p++] = renderItem(i, w, ui);
			opts[p++] = renderItem(i, w, ui);
		}
		j2scb.j2sCB("updateList2", opts);
		j2scb.j2sCB("setHeight", (h > JSComboBoxUI.MAX_HEIGHT ? JSComboBoxUI.MAX_HEIGHT : 0));
		updateCSS();
	}

	private DOMNode renderItem(int i, int w, JSListUI ui) {
		JComponent j = (JComponent) cbui.comboBox.getRenderer().getListCellRendererComponent(this,
				getModel().getElementAt(i), i, true, false);
		j.setSize(w, ui.getRowHeight(i));
		return j.秘getUI().getListNode();
	}

	void updateSelectedIndex() {
		if (j2scb != null)
			j2scb.j2sCB("setSelectedIndex", cbui.comboBox.getSelectedIndex());
	}

	void updateHoverIndex() {
		if (j2scb == null)
			return;
		if (!cbui.isPopupVisible(cbui.comboBox))
			setPopupVisible(true);
		int index = getSelectedIndex();
		j2scb.j2sCB("hoverOver", index);
		cbui.comboBox.setSelectedIndex(index);
//			updateSelectedIndex();
	}

	void updateEnabled() {
		if (j2scb != null)
			j2scb.j2sCB(cbui.comboBox.isEnabled() ? "enable" : "disable");
	}

	void updateState(EventObject e, String name) {
		if (j2scb == null)
			return;
		if (name == null) {
			// ItemEvent
			updateSelectedIndex();
		}
	}

	@Override
	public void show() {
		setPopupVisible(true);
	}

	@Override
	public void hide() {
		hidePopup();
	}

	public void hidePopup() {
		setPopupVisible(false);
	}
	
	@SuppressWarnings("unused")
	@Override
	public boolean isVisible() {
		if (j2scb == null)
			return false;
		Object ret = j2scb.j2sCB("popupVisible");
		return /** @j2sNative !!ret || */
		false;
	}

	// @Override
	public JList getList() {
		return this;
	}

	// @Override
	public MouseListener getMouseListener() {
		return null;
	}

	// @Override
	public MouseMotionListener getMouseMotionListener() {
		return null;
	}

	// @Override
	public KeyListener getKeyListener() {
		return null;
	}

	public void dispose() {
		uninstallingUI();
	}


	// @Override
	public void uninstallingUI() {
		if (j2scb != null)
			j2scb.j2sCB("destroy");
		j2scb = null;
	}

	@SuppressWarnings("unused")
	private void fChange(Object event, Object cb, String type, Object data) {
		int i = /** @j2sNative data || */
				0;
		switch (type) {
		case "refreshed":
			return;
		case "destroyed":
			j2scb = null;
			return;
		case "opening":
			updateZIndex();
			return;
		case "keyevent":
			cbui.comboBox.dispatchEvent(JSKeyEvent.newJSKeyEvent(cbui.comboBox, event, 0, true));
			return;
		case "selected":
			cbui.comboBox.秘setTrigger(true);
			cbui.comboBox.setSelectedIndex(i);
			cbui.comboBox.秘setTrigger(false);
			return;
		case "mouseover":
			return;
		case "mouse":
			JSEvent jqEvent = /** @j2sNative event.originalEvent || */
					null;
			switch (/** @j2sNative jqEvent.type || */"") {
			case "mousemove":
				JSMouse.retargetMouseEvent(jqEvent, null, cbui.comboBox, JSComboPopupList.this, 0);
				break;
			case "mouseup":
				JSToolkit.dispatch(new Runnable() {
					@Override
					public void run() {
						JSMouse.retargetMouseEvent(jqEvent, null, cbui.comboBox, JSComboPopupList.this, 0);
						setVisible(false, false);
					}
				}, 10, 0);
				break;
			}
			return;
		}
	}

}