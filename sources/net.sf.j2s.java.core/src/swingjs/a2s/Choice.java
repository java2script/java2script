package swingjs.a2s;

import java.awt.Color;
import java.awt.event.ItemEvent;

import javax.swing.JComboBox;

public class Choice extends JComboBox {

	
	public Choice() {
		super();
		super.setBackground(Color.white);
	}
	
	public void isAWT() {}
	
	public void select(int index) {
		super.setSelectedIndex(index);
	}

	public void select(String key) {
		super.setSelectedItem(key);
	}

	public void add(String label) {
		addItem(label);
	}

    public int countItems() {
    	return super.getItemCount();
    }
    
    public void addItem(String item) {
    	super.addItem(item);
    }

    public void insert(String item, int index) {
    	super.insertItemAt(item, index);
    }

    public void remove(String item) {
    	super.removeItem(item);    	
    }

	public String getItem(int n) {
		return (String)super.getItemAt(n);
	}
	
	@Override
	public void removeAll() {
		super.removeAllItems();
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
    	if (!秘trigger)
    		return;
    	A2SEvent.addListener(this);
    	super.fireItemStateChanged(event);
    }

    
    @Override
    public String getActionCommand() {
    	return (String) super.getSelectedItem();
    }


}
