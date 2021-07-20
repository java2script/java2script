package swingjs.a2s;

import java.awt.Adjustable;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.Point;

import javax.swing.JScrollPane;

public class ScrollPane extends JScrollPane {

	/**
	 * Specifies that horizontal/vertical scrollbar should be shown only when the
	 * size of the child exceeds the size of the scrollpane in the
	 * horizontal/vertical dimension.
	 */
	public static final int SCROLLBARS_AS_NEEDED = 0;

	/**
	 * Specifies that horizontal/vertical scrollbars should always be shown
	 * regardless of the respective sizes of the scrollpane and child.
	 */
	public static final int SCROLLBARS_ALWAYS = 1;

	/**
	 * Specifies that horizontal/vertical scrollbars should never be shown
	 * regardless of the respective sizes of the scrollpane and child.
	 */
	public static final int SCROLLBARS_NEVER = 2;

	public void isAWT() {
	}

	public void isAWTContainer() {}


	public ScrollPane() {
        this(SCROLLBARS_AS_NEEDED);
    }

	public ScrollPane(int scrollbars) {
		super();
		switch (scrollbars) {
		case SCROLLBARS_NEVER:
			super.setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_NEVER);
			super.setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_NEVER);
			break;
		case SCROLLBARS_ALWAYS:
			super.setVerticalScrollBarPolicy(VERTICAL_SCROLLBAR_ALWAYS);
			super.setHorizontalScrollBarPolicy(HORIZONTAL_SCROLLBAR_ALWAYS);
			break;
		case SCROLLBARS_AS_NEEDED:
			break;
		}
//        setBackground(Color.LIGHT_GRAY); // fills in around the scrollbars
		super.setOpaque(true);
	}

	@Override
	public Component add(Component c) {
		super.getViewport().add(c);
		if (!super.isBackgroundSet() && c.isBackgroundSet())
			super.setBackground(c.getBackground());
		return c;
	}

	public Adjustable getVAdjustable() {
		return super.getVerticalScrollBar();// vAdjustable;
	}

	public Adjustable getHAdjustable() {
		return super.getHorizontalScrollBar();// hAdjustable;
	}

	public void setScrollPosition(int x, int y) {
		synchronized (super.getTreeLock()) {
			if (super.getComponentCount() == 0) {
				throw new NullPointerException("child is null");
			}
			super.getHorizontalScrollBar().setValue(x);
			super.getVerticalScrollBar().setValue(y);
		}
	}

	public void setScrollPosition(Point p) {
		setScrollPosition(p.x, p.y);
	}

	public Point getScrollPosition() {
		synchronized (super.getTreeLock()) {
			if (super.getComponentCount() == 0) {
				throw new NullPointerException("child is null");
			}
			return new Point(super.getHorizontalScrollBar().getValue(), 
					super.getVerticalScrollBar().getValue());
		}
	}

    /**
     * Returns the current size of the scroll pane's view port.
     * @return the size of the view port in pixels
     */
    public Dimension getViewportSize() {
        Insets i = getInsets();
        return new Dimension(width - i.right - i.left,
                             height - i.top - i.bottom);
    }

    @Override
	public Insets getInsets() {
       return 秘getInsets();
    }

}
