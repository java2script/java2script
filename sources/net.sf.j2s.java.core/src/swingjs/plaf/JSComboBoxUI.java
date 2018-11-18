package swingjs.plaf;


import javajs.util.PT;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.LookAndFeel;
import javax.swing.UIManager;
import javax.swing.event.ListDataEvent;
import javax.swing.event.ListDataListener;
import swingjs.api.js.DOMNode;

/**
 * A simple drop-down non-editable list for now. Using the jQuery method
 *  
 * 		$(domNode).on("change", f);
 * 
 * we can run our own function here when the selection is made. 
 * 
 */

public class JSComboBoxUI extends JSLightweightUI implements ItemListener, ListDataListener {

	private JComboBox comboBox;

	public JSComboBoxUI() {
		isContainer = true;
		allowPaintedBackground = false;
		setDoc();
	}
	
	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = focusNode = DOMNode.setStyles(newDOMObject("select", id), 
					"padding", "0px 0px","lineHeight", "0.8","box-sizing", "border-box");
			ignoreAllMouseEvents(domNode);
			DOMNode.addJqueryHandledEvent(this, domNode, "change");
			addJQueryFocusCallbacks();
		}
		populateList();
		checkEnabled();
    return domNode;
	}

	private void checkEnabled() {
		if (comboBox.isEnabled())
			domNode.removeAttribute("disabled");
		else
			DOMNode.setAttr(domNode, "disabled", "true");			
	}

	
	@Override
	public void setEnabled(boolean b) {
		checkEnabled();
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		switch (eventType) {
		case -1:
      int index = PT.parseInt("" + DOMNode.getAttr(domNode, "selectedIndex"));
      	comboBox.setSelectedIndex(index);
			break;
		}
		return true;
	}

	
	private void populateList() {
		$(domNode).empty();
		int n = comboBox.getItemCount();
		int iselect = comboBox.getSelectedIndex();
		for (int i = 0; i < n; i++) {
			String item = comboBox.getItemAt(i).toString();
			DOMNode option = DOMNode.createElement("option", id + "_" + (++incr));
			DOMNode.setAttr(option,  "innerHTML", item);
			if (i == iselect)
				DOMNode.setAttr(option, "selected", "true");
			domNode.appendChild(option);
		}		
	}

	@Override
	public void installUI(JComponent jc) {
		comboBox = (JComboBox) jc;
		installListeners();
    LookAndFeel.installColorsAndFont(jc,
        "ComboBox.background",
        "ComboBox.foreground",
        "ComboBox.font");
	}

	/**
	 * prefix for the HTML5LookAndFeal
	 * 
	 * @return
	 */

	@Override
	protected String getPropertyPrefix() {
		return "ComboBox.";
	}


	@Override
	protected void getDisabledColors(String pp) {
		inactiveBackground = UIManager.getColor(pp + "disabledBackground");
		inactiveForeground = UIManager.getColor(pp + "disabledForeground");		
	}

	@Override
	public void uninstallUI(JComponent jc) {
    uninstallListeners();
  }

	
  protected void installListeners() {
    comboBox.addItemListener( this );
//    if ( (propertyChangeListener = createPropertyChangeListener()) != null ) {
//        comboBox.addPropertyChangeListener( propertyChangeListener );
//    }
//    if ( (keyListener = createKeyListener()) != null ) {
//        comboBox.addKeyListener( keyListener );
//    }
//    if ( (focusListener = createFocusListener()) != null ) {
//        comboBox.addFocusListener( focusListener );
//    }
//    if ((popupMouseListener = popup.getMouseListener()) != null) {
//        comboBox.addMouseListener( popupMouseListener );
//    }
//    if ((popupMouseMotionListener = popup.getMouseMotionListener()) != null) {
//        comboBox.addMouseMotionListener( popupMouseMotionListener );
//    }
//    if ((popupKeyListener = popup.getKeyListener()) != null) {
//        comboBox.addKeyListener(popupKeyListener);
//    }

    if ( comboBox.getModel() != null ) {
        comboBox.getModel().addListDataListener( this );
    }
}

	/**
	 * Removes the installed listeners from the combo box and its model. The
	 * number and types of listeners removed and in this method should be the same
	 * that was added in <code>installListeners</code>
	 */
	protected void uninstallListeners() {
		comboBox.removeItemListener(this);
		if (comboBox.getModel() != null)
			comboBox.getModel().removeListDataListener(this);
	}

	
	
//	@Override
//	public void propertyChange(PropertyChangeEvent evt) {
//		if (debugging)
//			System.out.println("JSComboBoxUI propertychange " + evt);
//	}
	
	@Override
  public boolean contains(JComponent c, int x, int y) {
//		System.out.println("JSComboBoxUI contains check " + c);
    return true; // do not accept responsibility for this one?
  }

  /**
   * Set the visiblity of the popup
   */
  public void setPopupVisible( JComboBox c, boolean v ) {
  	// TODO
  }

  /**
   * Determine the visibility of the popup
   */
  public boolean isPopupVisible( JComboBox c ) {
  	return false;
  }

  /**
   * Determine whether or not the combo box itself is traversable
   */
  public boolean isFocusTraversable( JComboBox c ) {
  	return true;
  }

	@Override
	public void intervalAdded(ListDataEvent e) {
		//System.out.println("JSComboBoxUI interval added itemStateChanged " + e);
		revalidate();
	}

	@Override
	public void intervalRemoved(ListDataEvent e) {
		//System.out.println("JSComboBoxUI interval removed itemStateChanged " + e);
		revalidate();
	}

	@Override
	public void contentsChanged(ListDataEvent e) {
		//System.out.println("JSComboBoxUI content changed itemStateChanged " + e);
		revalidate();
	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		//System.out.println("JSComboBoxUI itemStateChanged " + e);
	}


}
