package swingjs.a2s;

import java.awt.Component;
import java.awt.GraphicsConfiguration;
import java.awt.MenuBar;
import java.awt.MenuComponent;
//import java.awt.peer.FramePeer;

import javax.swing.JFrame;
import javax.swing.JMenuBar;

public class Frame extends JFrame implements A2SContainer {

	
	A2SListener listener;
	
	@Override
	public A2SListener getA2SListener() {
		return listener;
	}

		
	public Frame() {
		this(null, null);
	}

	public Frame(String title) {
		this(title, null);
	}

	
	public Frame(GraphicsConfiguration gc) {
		this(null, gc);
	}

	public Frame(String title, GraphicsConfiguration gc) {
		super(title, gc);
		listener = new A2SListener();
		Util.setAWTWindowDefaults(this);
	}


	@Override
	public void remove(int i) {
		super.remove(i);
	}
	
	public void setMenuBar(MenuBar m) {
		setJMenuBar(m);
	}

	public void remove(MenuComponent m) {
		JMenuBar mb = super.getJMenuBar();
		if (mb != null)
			mb.remove((Component) m);
	}
	
    public void unsetMenuBar() {
    	setJMenuBar(null);
	}


	public MenuBar getMenubar() {
		return (MenuBar) getJMenuBar();
	}

    @Override
	public void addNotify() {
        synchronized (getTreeLock()) {
        	getOrCreatePeer();
//            FramePeer p = (FramePeer)peer;
            if (getMenubar() != null) {
            	getMenubar().addNotify();
//                p.setMenuBar(menuBar);
            }
//            p.setMaximizedBounds(maximizedBounds);
            super.addNotify();
        }
    }

}
