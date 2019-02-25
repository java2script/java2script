package swingjs.a2s;

import java.awt.GraphicsConfiguration;

import javax.swing.JFrame;

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
		//Util.setAWTWindowDefaults(this);
	}


	@Override
	public void remove(int i) {
		super.remove(i);
	}
	
	public void setMenuBar(MenuBar m) {
		setJMenuBar(m);
	}

  public void unsetMenuBar() {
  	setJMenuBar(null);
	}


	public MenuBar getMenubar() {
		return (MenuBar) getJMenuBar();
	}

}
