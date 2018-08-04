package a2s;

import java.awt.GraphicsConfiguration;

import javax.swing.JFrame;

public class Frame extends JFrame implements A2SContainer {

	
	A2SListener listener;
	
	@Override
	public A2SListener getA2SListener() {
		// TODO Auto-generated method stub
		return null;
	}

		
	public Frame() {
		super();
		listener = new A2SListener();
	}

	public Frame(String title) {
		super(title);
	}

	
	public Frame(GraphicsConfiguration gc) {
		super(gc);
	}

	public Frame(String title, GraphicsConfiguration gc) {
		super(title, gc);
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
