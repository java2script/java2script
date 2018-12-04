package swingjs.plaf;


import java.util.Dictionary;
import java.util.Enumeration;

import javax.swing.SwingConstants;

import java.awt.Dimension;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import javax.swing.BoundedRangeModel;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JScrollBar;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import sun.swing.DefaultLookup;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.jquery.JQueryUI;

@SuppressWarnings({"rawtypes", "unchecked", "unused"})
public class JSSliderUI extends JSLightweightUI implements PropertyChangeListener, ChangeListener {

    public static final int POSITIVE_SCROLL = +1;
    public static final int NEGATIVE_SCROLL = -1;
    public static final int MIN_SCROLL = -2;
    public static final int MAX_SCROLL = +2;

	static {
		Object jqueryui = JQueryUI.class; // loads jQuery.ui
		// this static call allows for the CSS to be loaded only once and only when needed
		JSUtil.loadStaticResource("swingjs/jquery/jquery-ui-j2sslider.css");
		JSUtil.loadStaticResource("swingjs/jquery/jquery-ui-j2sslider.js");
	}

	protected JSlider slider;
	private int min, max, val, majorSpacing, minorSpacing;
	protected boolean paintTicks;
	protected boolean paintLabels;
	private boolean snapToTicks;
	private Dictionary<Integer, JLabel> labelTable;
	
	protected String orientation;
	
	protected DOMNode jqSlider;
	private int z0 = Integer.MIN_VALUE;
	private BoundedRangeModel model;
	private boolean paintTrack = true;

	protected boolean isScrollBar;
	private JScrollBar jScrollBar;
	protected DOMNode sliderTrack;
	protected DOMNode sliderHandle;
	private int disabled;
	private int myHeight;
	private boolean isHoriz;
	private boolean isVerticalScrollBar;
	private boolean isInverted;
	
	public JSSliderUI() {		
		needPreferred = true;
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
		JSlider js = (JSlider) jc;
		min = js.getMinimum();
		max = js.getMaximum();
		val = js.getValue();
		if (!isScrollBar) {
			minorSpacing = js.getMinorTickSpacing();
			majorSpacing = js.getMajorTickSpacing();
			paintTicks = js.getPaintTicks();
			paintLabels = js.getPaintLabels();
			paintTrack = js.getPaintTrack();
			snapToTicks = js.getSnapToTicks();
		}
		orientation = (js.getOrientation() == SwingConstants.VERTICAL ? "vertical"
				: "horizontal");
		model = js.getModel();
		boolean isHoriz = (slider.getOrientation() == SwingConstants.HORIZONTAL);
		boolean isVerticalScrollBar = (isScrollBar && !isHoriz);
		boolean isInverted = isVerticalScrollBar || !isScrollBar && slider.getInverted();
		boolean isChanged = false;
		if (isHoriz != this.isHoriz || isVerticalScrollBar != this.isVerticalScrollBar
				|| isInverted != this.isInverted) {
			this.isHoriz = isHoriz;
			this.isVerticalScrollBar = isVerticalScrollBar;
			this.isInverted = isInverted;
			isChanged = true;
		}
		boolean isNew = (domNode == null);
		if (isNew) {
			domNode = wrap("div", id + "_wrap",
					jqSlider = DOMNode.createElement("div", id));
			$(domNode).addClass("swingjs");
			setJQuerySliderAndEvents();
			setTainted();
		} else if (isChanged) {
			disposeSlider();
			domNode.appendChild(jqSlider = DOMNode.createElement("div", id + (++incr)));
			setJQuerySliderAndEvents();	
			setTainted();
		  setInnerComponentBounds(jc.getWidth(), jc.getHeight());
		}
		setup(isNew || isChanged);
		setSlider();
		if (jc.isOpaque())
			setBackground(jc.getBackground());
		return updateDOMNodeCUI();
	}

	private void disposeSlider() {
		Object slider = $(jqSlider);
		/**
		 * @j2sNative slider.j2sslider("destroy");
		 * 
		 */
		DOMNode.dispose(jqSlider);
	}

	@Override
	public void installUI(JComponent jc) {
		slider = (JSlider) jc;
		if (isScrollBar)
			jScrollBar = (JScrollBar) jc;
	}
	
	private void setJQuerySliderAndEvents() {

		Object slider = $(jqSlider);
		/**
		 * @j2sNative
		 * 
		 *            var me = this; 
		 *            slider.j2sslider(
		 *             { orientation: me.orientation, 
		 *               jslider: me.c,
		 *               isScrollBar: me.isScrollBar,
		 *               range: false, 
		 *               min: me.min,
		 *               max: me.max,
		 *               value: me.val, 
		 *               disabled: me.disabled,
		 *               inverted: me.isInverted, 
		 *               change: function(jqevent, handle) {
		 *                     me.jqueryCallback$O$O(jqevent, handle); }, 
		 *               slide: function(jqevent, handle) { 
		 *                     me.jqueryCallback$O$O(jqevent, handle); },
		 *               start: function(jqevent, handle) {
		 *                     me.jqueryStart$O$O(jqevent, handle); },
		 *               stop: function(jqevent, handle) {
		 *                     me.jqueryStop$O$O(jqevent, handle); }
		 *            });
		 */
		{
		}
	}

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryStart(Object event, Object ui) {
	    slider.setValueIsAdjusting(true);
	}

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryStop(Object event, Object ui) {
	    slider.setValueIsAdjusting(false);
	}
	
	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryCallback(Object event, Object ui) {
		int value = 0;
		
		/**
		 * @j2sNative
		 * 
		 * value = ui.value;
		 * 
		 */
		{}
		
		slider.setValue(val = Math.round(value));
	}

	@Override
	public void setEnabled(boolean b) {
		super.setEnabled(b);
		setSliderAttr("disabled", (disabled = (b ? 0 : 1)));
	}

	/**
	 * 
	 * @param isNew
	 */
	private void setup(boolean isNew) {
		sliderTrack = DOMNode.lastChild(domNode);
		sliderHandle = DOMNode.firstChild(sliderTrack);
		// mark the handle and track with the "swingjs-ui" class
		// so as to ignore all mouse/touch events from Jmol.setMouse();
		if (isNew) {
			ignoreAllMouseEvents(sliderHandle);
			ignoreAllMouseEvents(sliderTrack);
			setDataComponent(sliderHandle);
		}
	}

	/**
	 * Call jquery-ui-j2sslider.js _setOption
	 * @param key
	 * @param val
	 */
	protected void setSliderAttr(String key, float val) {
	
		String id = null;
		try {
		Object slider = $(jqSlider);
		/**
		 * @j2sNative
		 *   id = this.jqSlider.id;
		 *  slider.j2sslider("option",key,val);
		 */
		} catch (Throwable t) {
			System.out.println(key + ":" + val + " could not be set for " + id);
			// ignore -- disposal problem?
		}
	}

	public void setSlider() {
		setSliderAttr("min", min);
		setSliderAttr("max", max);
		setSliderAttr("value", val);

		myHeight = 10;
		int barPlace = 40; // not for general slider or scrollbar
		if (isHoriz && slider.getBorder() != null)
			barPlace += 10;

		String tickClass = "ui-j2sslider-tick-mark"
				+ (isHoriz ? "-vert" : "-horiz");
		$(domNode).find("." + tickClass).remove();
		$(domNode).find(".jslider-labels").remove();
		setHTMLSize(jqSlider, false);
		if (majorSpacing == 0 && minorSpacing == 0 || !paintTicks && !paintLabels)
			return;
		int margin = 10;

		int length = (isHoriz ? slider.getWidth() : slider.getHeight());
		if (length <= 0)
			length = (isHoriz ? getPreferredHorizontalSize().width
					: getPreferredVerticalSize().height);
		if (isHoriz)
			actualWidth = length;
		else
			actualHeight = length;
		length -= 2 * margin;
		if (paintTicks) {
			if (minorSpacing == 0)
				minorSpacing = majorSpacing;
			int check = majorSpacing / minorSpacing;
			float fracSpacing = minorSpacing * 1f / (max - min);
			int numTicks = ((max - min) / minorSpacing) + 1;
			myHeight += 10;
			for (int i = 0; i < numTicks; i++) {
				DOMNode node = DOMNode.createElement("div", id + "_t" + i);
				$(node).addClass("swingjs");
				$(node).addClass(tickClass);
				boolean isMajor = (i % check == 0); 
				float frac = (isHoriz == isInverted ? 1 - fracSpacing * i : fracSpacing
						* i);
				String spt = (frac * length + margin) + "px";
				if (isMajor)
					$(node).css(isHoriz ? "height" : "width", "8px");
				$(node).css(isHoriz ? "left" : "top", spt);
				domNode.insertBefore(node, sliderTrack);
			}
			if (!paintLabels)
				setHTMLSize(domNode, false);
		}
		if (paintLabels) {
			myHeight += 20;
			labelTable = slider.getLabelTable();
			Enumeration keys = labelTable.keys();
			while (keys.hasMoreElements()) {
				Object key = keys.nextElement();
				int n = Integer.parseInt(key.toString());
				JLabel label = labelTable.get(key);
				DOMNode labelNode = ((JSComponentUI) label.getUI()).getOuterNode();
				// need calculation of pixels
				float frac = (n - min) * 1f / (max - min);
				if (isHoriz == isInverted)
					frac = 1 - frac;
				float px = (frac * length + margin);
				int left, top;
				if (isHoriz) {
					top = 20;
					left = (int) (px - label.getWidth() / 2);
				} else {
					top = (int) (px - label.getHeight() / 2);
					left = 28;
				}
				DOMNode.setTopLeftAbsolute(labelNode, top, left);
				domNode.insertBefore(labelNode, sliderTrack);
			}
			
		}
		if (paintTicks) {
			if (isHoriz) {
				DOMNode.setStyles(sliderHandle, "transform",
						"scaleX(0.5) rotateZ(45deg)", "top", "-8px");
				DOMNode.setStyles(sliderTrack, "height", "1px", "background", "black",
						"top", "10px");
				setSliderAttr("scaleX", 0.5f);
			} else {
				DOMNode.setStyles(sliderHandle, "transform",
						"scaleY(0.5) rotateZ(45deg)", "left", "-10px", "margin-bottom",
						"-7px");
				DOMNode.setStyles(sliderTrack, "width", "1px", "left", "12px",
						"background", "black");
				setSliderAttr("scaleY", 0.5f);
			}

		} else {
			DOMNode.setStyles(sliderTrack, isHoriz ? "top" : "left", barPlace + "%");
		}
		if (isScrollBar) {
			setScrollBarExtentAndCSS();
		} else {
		if (!isHoriz)
			DOMNode.setStyles(sliderTrack, "height", length + "px");
		}
		setHTMLSize(domNode, false);
	}


	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		int d = 20;
		if (paintLabels)
			d += 10;
		if (paintTicks)
			d += 10;
		if (slider.getBorder() != null)
			d += 10;
		// only the width or height will be read here, not both
		return new Dimension((isHoriz ? actualWidth : d), (isHoriz ? d : actualHeight));
	} 

//	@Override
//	public void propertyChange(PropertyChangeEvent e) {
//		switch (e.getPropertyName()) {
//		case "ancestor":
//			setup(false);
//			break;
//		case "paintLabels":
//		case "paintTicks":
//		case "majorTickSpacing":
//		case "minorTickSpacing":
//		case "paintTrack":
//		case "labelTable":
//			setSlider();
//			break;
//		}
//	}

	@Override
	public void stateChanged(ChangeEvent e) {
		int v;
		if ((v = slider.getMinimum()) != min)
			setSliderAttr("min", min = v);
		if ((v = slider.getMaximum()) != max)
			setSliderAttr("max", max = v);
		if ((v = slider.getValue()) != val) {
			setSliderAttr("value", val = v);
		}
		setup(false);
	}


	void setScrollBarExtentAndCSS() {
		// scrollbar subclass only
	}

	
	@Override
	public Dimension getMinimumSize(JComponent c) {
		return (isScrollBar ? super.getMinimumSize(c) 
				: isHoriz ? getMinimumHorizontalSize() : getMinimumVerticalSize());
	}

	private Dimension getMinimumHorizontalSize() {
		Dimension horizDim = (Dimension) DefaultLookup.get(slider, this,
				"Slider.minimumHorizontalSize");
		if (horizDim == null) {
			horizDim = new Dimension(36, paintLabels ? 35 : 21);
		}
		return horizDim;
	}

	private Dimension getMinimumVerticalSize() {
		Dimension vertDim = (Dimension) DefaultLookup.get(slider, this,
				"Slider.minimumVerticalSize");
		if (vertDim == null) {
			vertDim = new Dimension(paintLabels ? 35 : 21, 36);
		}
		return vertDim;
	}

	@Override
	public Dimension getPreferredSize(JComponent c) {
		return (isScrollBar ? super.getPreferredSize(c) : isHoriz ? getPreferredHorizontalSize() : getPreferredVerticalSize());
	}

	public Dimension getPreferredHorizontalSize() {
		Dimension horizDim = (Dimension) DefaultLookup.get(slider, this,
				"Slider.horizontalSize");
		return new Dimension(horizDim.width, Math.max(horizDim.height, myHeight));
	}

	public Dimension getPreferredVerticalSize() {
		Dimension vertDim = (Dimension) DefaultLookup.get(slider, this,
				"Slider.verticalSize");
		return new Dimension(Math.max(vertDim.height, myHeight), vertDim.width);
	}
	
    public void scrollByBlock(int direction)    {
        synchronized(slider)    {
            int blockIncrement =
                (slider.getMaximum() - slider.getMinimum()) / 10;
            if (blockIncrement == 0) {
                blockIncrement = 1;
            }

            if (slider.getSnapToTicks()) {
                int tickSpacing = getTickSpacing();

                if (blockIncrement < tickSpacing) {
                    blockIncrement = tickSpacing;
                }
            }

            int delta = blockIncrement * ((direction > 0) ? POSITIVE_SCROLL : NEGATIVE_SCROLL);
            slider.setValue(slider.getValue() + delta);
        }
    }

    public void scrollByUnit(int direction) {
        synchronized(slider)    {
            int delta = ((direction > 0) ? POSITIVE_SCROLL : NEGATIVE_SCROLL);

            if (slider.getSnapToTicks()) {
                delta *= getTickSpacing();
            }

            slider.setValue(slider.getValue() + delta);
        }
    }
    
    public int getUnitIncrement() {
    	// JScrollBar only
    	return -1;
    }
    
    public void scrollDueToClickInTrack(int dir) {
        scrollByUnit(dir);
    }

    private int getTickSpacing() {
        int majorTickSpacing = slider.getMajorTickSpacing();
        int minorTickSpacing = slider.getMinorTickSpacing();

        int result;

        if (minorTickSpacing > 0) {
            result = minorTickSpacing;
        } else if (majorTickSpacing > 0) {
            result = majorTickSpacing;
        } else {
            result = 0;
        }

        return result;
    }

	@Override
	public void setInnerComponentBounds(int width, int height) {
		if (!paintTicks && !paintLabels) {
			int margin = (isScrollBar ? 6 : 10);
			if (orientation == "vertical") {
				DOMNode.setStyles(sliderTrack, "height", (height - margin * 2) + "px");
			} else if (isScrollBar) {
				DOMNode.setStyles(sliderTrack, "width", (width - margin * 2) + "px");
			}
			setScrollBarExtentAndCSS();
		}
	}

//	@Override
//	public void endLayout() {
//		setSlider();
//		super.endLayout();		
//	}


	@Override
	Dimension getMaximumSize(JComponent jc) {
		Dimension d = super.getMaximumSize(jc);
		return (d != null ? d : isHoriz ? new Dimension(Short.MAX_VALUE, 40) : new Dimension(40, Short.MAX_VALUE));
	}


}
