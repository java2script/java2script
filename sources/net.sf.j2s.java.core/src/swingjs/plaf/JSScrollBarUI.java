package swingjs.plaf;

import java.awt.Color;
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
 * AWT version difference: An AdjustmentEvent is reported for the initial
 * mousedown event, as for Swing; Java does not report that.
 * 
 * TODO AWT,Swing difference: mouseup off the control does not call setValueIsAdjusting(false)
 *  
 * @author hansonr
 *
 */
public class JSScrollBarUI extends JSSliderUI {

	void setScrollPaneUI(JSScrollPaneUI ui) {
		myScrollPaneUI = ui;
	}
	
	private boolean isInvisible;

	//private boolean isAdjusting;

	public JSScrollBarUI() {
		super();
		isScrollBar = true;
		allowPaintedBackground = false;
	}

	@Override
	public DOMNode updateDOMNode() {
		super.updateDOMNode();
		if (isAWT && !jc.isBackgroundSet()) {
			jc.setBackground(Color.LIGHT_GRAY);
		}
//		String bgcolor = null;
//		//if (myScrollPaneUI == null) {
//			bgcolor = toCSSString(getBackground());
////
////		} else {
////			
////		}
//		DOMNode.setStyles(sliderTrack, "background", bgcolor);
		return domNode;	
		}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		super.propertyChange(e);		
	}

	@Override
	public void stateChanged(ChangeEvent e) {
			super.stateChanged(e);
			setScrollBarExtentAndCSS();
	}

	@Override
	protected void setValue(int val) { 
		if (!isAWT) {
			super.setValue(val);
			return;
		}
		JScrollBar sb = (JScrollBar) jc; 
		if (val != sb.getValue())
		((swingjs.a2s.Scrollbar) jc).setValueFromUI(val);
	}


    @Override
	protected void setValueIsAdjusting(boolean b) {
    	if (!isAWT) {
    		super.setValueIsAdjusting(b);
    		return;
    	}
		((swingjs.a2s.Scrollbar) jc).setValueIsAdjustingFromUI(b);
	}

	@Override
	public Dimension getPreferredSize(JComponent jc) {
		// thin because we are implementing jquery slider here
		int wh = (myScrollPaneUI == null ? 15 : myScrollPaneUI.scrollBarUIDisabled ? 0 : 13);
		// just used for width or height, but not both. I think.... 
		//System.out.println("JSSCrollbarUI dim " + wh + " " + myScrollPaneUI);
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
		String left, top, thickness, transform, leftt;
		JScrollBar sb = (JScrollBar) jc; 
		int extent = sb.getVisibleAmount();
		setSliderAttr("visibleAmount", extent);
		boolean isVertical = (orientation == "vertical");
		if (myScrollPaneUI == null) {
			// in 
			int d = (isVertical ? sb.getWidth() : sb.getHeight());
			int t = (int) Math.min(d * 0.8, 12);
			left = top = "50%";//((d - t)/2 + 1) + "px";
			thickness = (Math.floor(t/2)*2-1) + "px";
			leftt = "50%";
			transform = "translate(" + (isVertical ? "X":"Y") + ")";
		} else {
			left = "0px";
			// 2 here and 2 for top is to allow for scrollpane to have a 
			// 1-pixel border. Better would be to reduce the viewport
			leftt = "0px"; 
			top = (isAWT ? "4px" : "0px");
			thickness = "12px";
			transform = null;
		}
		if (isVertical) {
			DOMNode.setStyles(sliderTrack, "transform", transform, "left", left, "width", thickness);
			DOMNode.setStyles(sliderHandle, "border", "1px solid blue", "box-sizing", "border-box", "left", leftt, "margin-bottom", "0px","width", thickness);
		} else {
			DOMNode.setStyles(sliderTrack, "top", top, "height", thickness);
			DOMNode.setStyles(sliderHandle, "border", "1px solid blue", "box-sizing","border-box", "top", leftt, "margin-left", "0px","height", thickness);
		}
	}

    @Override
    public void scrollByBlock(int direction, int val0) {
    	// general click in track
		JScrollBar sb = (JScrollBar) jc; 
        int delta = getBlockIncrement();
        if (delta == Integer.MIN_VALUE && direction > 0)
        	return;
        delta *= (direction > 0 ? POSITIVE_SCROLL : NEGATIVE_SCROLL);
        setValue(sb.getValue() + delta);
    }
//
//	/**
//	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
//	 * 
//	 * @param event
//	 * @param ui
//	 */
//	@Override
//	public void jqueryStart(Object event, Object ui) {
//	}
//
//	/**
//	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
//	 * 
//	 * @param event
//	 * @param ui
//	 */
//	@Override
//	public void jqueryStop(Object event, Object ui) {
//	}

    private int getBlockIncrement() {
		JScrollBar sb = (JScrollBar) jc; 
    	if (myScrollPaneUI == null)
    		return sb.getBlockIncrement();
    	return sb.getVisibleAmount();
	}

	@Override
    public void scrollByUnit(int direction) {
    	// scroll click at end of scrollbar
		JScrollBar sb = (JScrollBar) jc; 
        int delta = sb.getUnitIncrement();
        if (delta == Integer.MIN_VALUE && direction > 0)
        	return;
        delta *= (direction > 0 ? POSITIVE_SCROLL : NEGATIVE_SCROLL);
        setValue(sb.getValue() + delta);
    }

    @Override
    public int getUnitIncrement() {
		JScrollBar sb = (JScrollBar) jc; 
    	return sb.getUnitIncrement();
    }
    


    @Override
    public void scrollDueToClickInTrack( int dir, int val ) {
        scrollByBlock( dir );
    }
    
    @Override
	protected void setOverflow() {
		if (myScrollPaneUI != null && myScrollPaneUI.scrollBarUIDisabled)
			DOMNode.setStyle(domNode, "display", "none");
	}


}



