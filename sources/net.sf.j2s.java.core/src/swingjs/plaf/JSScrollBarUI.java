package swingjs.plaf;

import java.awt.Dimension;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JScrollBar;
import javax.swing.event.ChangeEvent;
import swingjs.api.js.DOMNode;

/**
 * The SwingjJS implementation of a JScrollBar utilizes all the JSSlider
 * capabilities. It adds an variable extent (handle size) and also has 
 * a different appearance. 
 * 
 *  TODO: block and unit increments. Right now it just tracks to where the 
 *  mouse was clicked. 
 *  
 * @author hansonr
 *
 */
public class JSScrollBarUI extends JSSliderUI {

	JSScrollPaneUI myScrollPaneUI;
	
	private boolean isInvisible;

	//private boolean isAdjusting;

	public JSScrollBarUI() {
		super();
		isScrollBar = true;
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		super.propertyChange(e);		
		if (debugging) 
					System.out.println(id + " propertyChange " + dumpEvent(e));
	}

	@Override
	public void stateChanged(ChangeEvent e) {
//		if (!isAdjusting) {
//			isAdjusting = true;
			super.stateChanged(e);
			setScrollBarExtentAndCSS();
//			isAdjusting = false;
			if (debugging) 
				System.out.println(id + " stateChange " + dumpEvent(e));
//		}		
	}


	@Override
	public Dimension getPreferredSize() {
		// thin because we are implementing jquery slider here
		int wh = (myScrollPaneUI == null ? 15 : myScrollPaneUI.scrollBarUIDisabled ? 0 : 15);
		// just used for width or height, but not both. I think.... 
		return new Dimension(wh, wh);
	}
	
	@Override
	public void setVisible(boolean b) {
		isInvisible = (myScrollPaneUI != null && myScrollPaneUI.scrollBarUIDisabled);
		b &= !isInvisible;
		DOMNode.setVisible(getOuterNode(), b);
		DOMNode.setVisible(jqSlider, b);
	}

	/**
	 * The scrollbar handle size is set in the j2sSlider jQuery component
	 * as a fraction, since the slider track is not the same size
	 * as the JScrollBar component. Could be done other ways and just
	 * send the extent, I suppose. We fall back to 0.1 if anything is wrong. 
	 * 
	 */
	@Override
	void setScrollBarExtentAndCSS() {
		String left, top, thickness;
		JScrollBar sb = (JScrollBar) jc; 
		int extent = sb.getVisibleAmount();
		int max = sb.getMaximum();
		int min = sb.getMinimum();
		
		float f = (extent > 0 && max > min && extent <= max - min 
				? extent * 1f / (max - min) : 0.1f);
		setSliderAttr("handleSize", f);
		boolean isVertical = (orientation == "vertical");
		if (myScrollPaneUI == null) {
			// in 
			int d = (isVertical ? sb.getWidth() : sb.getHeight());
			int t = (int) Math.min(d * 0.8, 12);
			left = top = ((d - t)/2 + 1) + "px";
			thickness = t + "px";
		} else {
			left = "0px";
			top = "0px";
			thickness = "12px";
		}
		if (isVertical) {
			DOMNode.setStyles(sliderTrack, "left", left, "width", thickness, "background", "lightgrey");
			DOMNode.setStyles(sliderHandle, "left", "-1px", "margin-bottom", "0px");
		} else {
			DOMNode.setStyles(sliderTrack, "top", top, "height", thickness, "background", "lightgrey");
			DOMNode.setStyles(sliderHandle, "top", "-1px", "margin-left", "0px");
		}
	}

    @Override
    public void scrollByBlock(int direction) {
    	// general click in track
		JScrollBar sb = (JScrollBar) jc; 
        int delta = sb.getBlockIncrement();
        if (delta == Integer.MIN_VALUE && direction > 0)
        	return;
        delta *= (direction > 0 ? POSITIVE_SCROLL : NEGATIVE_SCROLL);
        sb.setValue(sb.getValue() + delta);
    }

    @Override
    public void scrollByUnit(int direction) {
    	// scroll click at end of scrollbar
		JScrollBar sb = (JScrollBar) jc; 
        int delta = sb.getUnitIncrement();
        if (delta == Integer.MIN_VALUE && direction > 0)
        	return;
        delta *= (direction > 0 ? POSITIVE_SCROLL : NEGATIVE_SCROLL);
        sb.setValue(sb.getValue() + delta);
    }

    @Override
    public int getUnitIncrement() {
		JScrollBar sb = (JScrollBar) jc; 
    	return sb.getUnitIncrement();
    }
    


    @Override
    public void scrollDueToClickInTrack( int dir ) {
        scrollByBlock( dir );
    }


}



