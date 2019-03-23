package swingjs.a2s;

import java.awt.Color;
import java.awt.event.ItemEvent;

import javax.swing.DefaultComboBoxModel;
import javax.swing.JComboBox;

public class Choice extends JComboBox {

	
	public Choice() {
		super();
		setBackground(Color.white);
	}
	
	public void isAWT() {}
	
	public void select(int index) {
		setSelectedIndex(index);
	}

	public void select(String key) {
		setSelectedItem(key);
	}

	public void add(String label) {
		addItem(label);
	}

    public int countItems() {
    	return getItemCount();
    }
    
    public void addItem(String item) {
    	super.addItem(item);
    }

    public void insert(String item, int index) {
    	super.insertItemAt(item, index);
    }

    public void remove(String item) {
    	removeItem(item);    	
    }

	public String getItem(int n) {
		return (String)getItemAt(n);
	}
	
	@Override
	public void removeAll() {
		removeAllItems();
	}

//	A2SListener listener = null;
//
//	@Override
//	public A2SListener getA2SListener() {
//		if (listener == null)
//			listener = new A2SListener();
//		return listener;
//	}
//
    @Override
	protected void fireActionEvent() {
    	A2SEvent.addListener(this);
    	super.fireActionEvent();
    }
    
    @Override
    protected void fireItemStateChanged(ItemEvent event) {
    	if (!_trigger) 
    		return;
    	A2SEvent.addListener(this);
    	super.fireItemStateChanged(event);
    }

    
    @Override
    public String getActionCommand() {
    	return (String) getSelectedItem();
    }


}
