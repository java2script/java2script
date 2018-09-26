package a2s;

import java.awt.Component;

import javax.swing.JScrollPane;

public class ScrollPane extends JScrollPane {

  /**
  * Specifies that horizontal/vertical scrollbar should be shown
  * only when the size of the child exceeds the size of the scrollpane
  * in the horizontal/vertical dimension.
  */
 public static final int SCROLLBARS_AS_NEEDED = 0;

 /**
  * Specifies that horizontal/vertical scrollbars should always be
  * shown regardless of the respective sizes of the scrollpane and child.
  */
 public static final int SCROLLBARS_ALWAYS = 1;

 /**
  * Specifies that horizontal/vertical scrollbars should never be shown
  * regardless of the respective sizes of the scrollpane and child.
  */
 public static final int SCROLLBARS_NEVER = 2;

	public ScrollPane() {
		super();
	}
	
	public ScrollPane(int scrollbars) {
		super();
		switch (scrollbars) {
		case SCROLLBARS_NEVER:
	    	setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_NEVER);
	    	setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_NEVER);
	    	break;			
		case SCROLLBARS_ALWAYS:
	    	setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_ALWAYS);
	    	setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_ALWAYS);
	    	break;			
		case SCROLLBARS_AS_NEEDED:
	    	break;			
		}
	}
	
	public Component add(Component c) {
		getViewport().add(c);
		return c;
	}
	
}
