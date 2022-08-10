package swingjs.plaf;


import java.util.Dictionary;
import java.util.Enumeration;

import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Insets;
import java.awt.Rectangle;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import javax.swing.BoundedRangeModel;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JScrollBar;
import javax.swing.JSlider;
import javax.swing.LookAndFeel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.InsetsUIResource;
import javax.swing.plaf.UIResource;

import sun.swing.DefaultLookup;
import swingjs.JSGraphics2D;
import swingjs.JSToolkit;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;
import swingjs.jquery.JQueryUI;

/**
 * A jQuery-based slider with lots of additional functionality.
 * See swingjs/jquery/j2sSlider.js for jQuery widget and css.
 * 
 * Subclassed by JSScrollBar.
 * 
 * @author hansonr
 */
@SuppressWarnings({"unused"})
public class JSSliderUI extends JSLightweightUI implements PropertyChangeListener, ChangeListener {

    public static final int POSITIVE_SCROLL = +1;
    public static final int NEGATIVE_SCROLL = -1;
    public static final int MIN_SCROLL = -2;
    public static final int MAX_SCROLL = +2;

	static {
		JQueryUI.loadJQSlider();
	}

	protected JSlider slider;
	private int min, max;
	protected int jsval;
	private int majorSpacing;
	private int minorSpacing;
	protected boolean paintTicks;
	protected boolean paintLabels;
	private boolean snapToTicks;
	
	protected String orientation;
	
	protected DOMNode jqSlider;
	private int z0 = Integer.MIN_VALUE;
	private BoundedRangeModel model;
	private boolean paintTrack = true;

	protected JSScrollPaneUI myScrollPaneUI;
	protected boolean isScrollBar;
	private JScrollBar jScrollBar;
	protected DOMNode sliderTrack;
	protected DOMNode sliderHandle;
	private int disabled;
	private int myHeight;
	private boolean isHoriz;
	private boolean isVerticalScrollBar;
	private boolean isInverted;
	private int[] ticks;
	private boolean noSnapping;
	
	public JSSliderUI() {		
		needPreferred = true;
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
		setSliderFields();
		min = slider.getMinimum();
		max = slider.getMaximum();
		jsval = slider.getValue();
		if (!isScrollBar) {
			minorSpacing = slider.getMinorTickSpacing();
			majorSpacing = slider.getMajorTickSpacing();
			paintTicks = (majorSpacing > 0 && slider.getPaintTicks());
			paintLabels = slider.getPaintLabels();
			paintTrack = slider.getPaintTrack();
			snapToTicks = (majorSpacing > 0 && slider.getSnapToTicks());
		}
		orientation = (slider.getOrientation() == SwingConstants.VERTICAL ? "vertical" : "horizontal");
		model = slider.getModel();
		boolean isHoriz = (slider.getOrientation() == SwingConstants.HORIZONTAL);
		boolean isVerticalScrollBar = (isScrollBar && !isHoriz);
		boolean isInverted = isVerticalScrollBar || !isScrollBar && slider.getInverted();
		boolean isChanged = sliderDisposed;
		if (isHoriz != this.isHoriz || isVerticalScrollBar != this.isVerticalScrollBar
				|| isInverted != this.isInverted) {
			this.isHoriz = isHoriz;
			this.isVerticalScrollBar = isVerticalScrollBar;
			this.isInverted = isInverted;
			isChanged = true;
		}
        if (!isScrollBar && recalculateIfInsetsChanged(recalculateIfOrientationChanged(false)))
        	isChanged = true;
        boolean isNew = (domNode == null);
		if (isNew) {
			domNode = wrap("div", id + "_wrap", jqSlider = DOMNode.createElement("div", id));
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
		setBackground(getBackground());
		setForeground(getForeground());
		return updateDOMNodeCUI();
	}
	
	private String foreColor = null;
	private boolean sliderDisposed;
	private int lastValue;
	private int margin;
	private int length;
	@Override
	public void setForeground(Color c) {
		if (!paintTicks && !paintLabels)
			return;
		if (awtPeerFG != null 
				// not for scrollbar && !jc.isDisplayable() 
				&& !awtPeerFG.equals(c))
		awtPeerFG = null;		
		if (c == null || c instanceof UIResource)
			c = Color.black;
		String s = toCSSString(c);
		if (foreColor == s)
			return;
		foreColor = s;
		if (paintTicks) { 
			
			// but this is not persisting
			
			DOMNode.setStyle(jqSlider, "background-color",s);
			String tickClass = "ui-j2sslider-tick-mark-" + (isHoriz ? "vert" : "horiz");
			
			$(domNode).find("." + tickClass).css(/** @j2sNative 1?{backgroundColor:s} :*/"","");
		}
		if (paintLabels) {
			$(domNode).find("SPAN").css("color", s);
		}
	}


	@Override
	public void setBackground(Color c) {
		if (awtPeerBG != null
				// not for scrollbar && !jc.isDisplayable()
				&& !awtPeerBG.equals(c))
			awtPeerBG = null;
		if (isScrollBar ? c != null : jc.isOpaque()) {

			if (paintTicks) {
				// they are painted with FOREground
			} else {
				DOMNode node = (myScrollPaneUI == null && !paintTicks ? jqSlider : sliderTrack);
				if (isScrollBar)
					DOMNode.setStyle(node, "background-color", toCSSString(c));
				if (isScrollBar&& (Color.WHITE.equals(c) || c.getRGB() == (0xFFEEEEEE & -1)))
					DOMNode.setStyle(sliderHandle, "background", "#ccc");
			}

		}
		if (!isScrollBar)
			setBackgroundDOM(outerNode, jc.isOpaque() && !slider.秘paintsSelf() ? getBackground() : null);
	}	
	
	@Override
	public void paintBackground(JSGraphics2D g) {
		if (!isScrollBar)
			super.paintBackground(g);
	}

	@Override
	protected void setBackgroundImpl(Color color) {
		setBackground(color);
	}

	private void disposeSlider() {
		if (sliderInitialized()) {
			Object slider = $(jqSlider);
			/**
			 * 
			 * @j2sNative
			 * 
			 * 
			 * 			slider.j2sslider("destroy");
			 *
			 */
		}
		DOMNode.dispose(jqSlider);
	}

	@Override
	public void installUI(JComponent jc) {
		setSliderFields();
	    LookAndFeel.installColorsAndFont(jc, "Slider.background", "Slider.foreground",
	            "Slider.font");
	    

        insetCache = slider.getInsets();
        leftToRightCache = JSGraphicsUtils.isLeftToRight(slider);
        focusRect = new Rectangle();
        contentRect = new Rectangle();
        labelRect = new Rectangle();
        tickRect = new Rectangle();
        trackRect = new Rectangle();
        thumbRect = new Rectangle();
        lastValue = slider.getValue();
        focusInsets = new InsetsUIResource(2,2,2,2);

	}
	
	private void setSliderFields() {
		slider = (JSlider) jc;
		if (isScrollBar)
			jScrollBar = (JScrollBar) jc;
	}

	@Override
	public void dispose() {
		sliderDisposed = true;
		super.dispose();
	}

	void setJQuerySliderAndEvents() {
		$(domNode).addClass("swingjs");
		$(domNode).addClass("ui-j2sslider-wrap"); // for mouse-down event in jquery-ui-j2sslider.js
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
	    setValueIsAdjusting(true);
	}

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryStop(Object event, Object ui) {
	    setValueIsAdjusting(false);
	    if (isScrollBar || slider.getSnapToTicks())
	    	jqueryCallback(event, ui);
	}
	
	protected void setValueIsAdjusting(boolean b) {
		slider.setValueIsAdjusting(b);
	}

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryCallback(Object event, Object obj) {
		jsval = Math.round(/** @j2sNative obj.value || */0);
		boolean ok = (noSnapping || !slider.getSnapToValue() || slider.getValueIsAdjusting());
		int setVal = (ok ? jsval : snapTo(jsval));
		setValue(setVal);
	}

	protected void setValue(int val) {
		if (val == slider.getValue())
			return;
		//System.out.println("JSSliderUI.setValue " + val);
		slider.setValue(val);
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
			setDataComponent(domNode);
			setDataComponent(sliderHandle);
		}
		sliderDisposed = false;
	}

	/**
	 * Call jquery-ui-j2sslider.js _setOption
	 * 
	 * @param key
	 * @param val
	 */
	protected void setSliderAttr(String key, float val) {
		if (sliderInitialized()) {
			try {
				String id = null;
				JQueryObject jsslider = $(jqSlider);
				/**
				 * @j2sNative
				 * 
				 * 
				 * 			id = this.jqSlider.id; jsslider.j2sslider("option",key,val);
				 */
			} catch (Throwable t) {
				// System.out.println(key + ":" + val + " could not be set for " + id);
				// ignore -- disposal problem?
			}
			noSnapping = isScrollBar;
		} else {
			noSnapping = true;
		}
	}

	private boolean sliderInitialized() {
			return (jqSlider != null && jquery.data(jqSlider, "ui-j2sslider") != null);
	}

	public void setSlider() {
		setSliderAttr("min", min);
		// hack is for list to not show bottom line
		int max = this.max;//(myScrollPaneUI == null ? this.max : this.max - 1);
		setSliderAttr("max", max);
		setSliderAttr("value", jsval);

		myHeight = 10;
		int barPlace = 40; // not for general slider or scrollbar
		if (isHoriz && slider.getBorder() != null)
			barPlace += 10;
		String tickClass = "ui-j2sslider-tick-mark" + (isHoriz ? "-vert" : "-horiz");
		$(domNode).find("." + tickClass).remove();
		$(domNode).find(".jslider-label").remove();
		getHTMLSizePreferred(jqSlider, false);
		if ((majorSpacing == 0 && minorSpacing == 0 || !paintTicks) && !paintLabels) {
			if (myScrollPaneUI != null) {
				DOMNode.setStyle(sliderHandle, "transform", null);
				DOMNode.setStyle(sliderTrack, "transform", null);
			} else if( isHoriz) {
				DOMNode.setStyles(sliderHandle, "top", "50%", "transform", "translateY(-50%)");
				DOMNode.setStyles(sliderTrack, "top", "50%", "transform", "translateY(-50%)");
			} else {
				DOMNode.setStyles(sliderHandle, "left", "50%", "transform", "translateX(-50%)");
				DOMNode.setStyles(sliderTrack, "left", "50%", "transform", "translateX(-50%)");
			}
			return;
		}
		margin = 10;
		length = (isHoriz ? slider.getWidth() : slider.getHeight());
		if (length <= 0)
			length = (isHoriz ? getPreferredHorizontalSize().width : getPreferredVerticalSize().height);
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
			ticks = new int[numTicks];
			for (int i = 0; i < numTicks; i++) {
				DOMNode node = DOMNode.createElement("div", id + "_t" + i);
				$(node).addClass("swingjs");// ??
				$(node).addClass(tickClass);
				boolean isMajor = (i % check == 0);
				ticks[i] = minorSpacing * i + min;
				float frac = (isHoriz == isInverted ? 1 - fracSpacing * i : fracSpacing * i);
				String spt = (frac * length + margin) + "px";
				if (isMajor)
					$(node).css(isHoriz ? "height" : "width", "8px");
				$(node).css(isHoriz ? "left" : "top", spt);
				domNode.insertBefore(node, sliderTrack);
			}
			if (!paintLabels)
				getHTMLSizePreferred(domNode, false);
		}
		Dictionary<Integer, JLabel> labelTable = slider.getLabelTable();
		if (paintLabels && labelTable != null) {
			myHeight += 20;
			paintLabels(labelTable, true);
		}
		if (paintTicks) {
			if (isHoriz) {
				DOMNode.setStyles(sliderHandle, "transform", "scaleX(0.5) rotateZ(45deg)", "top", "-8px");
				DOMNode.setStyles(sliderTrack, "height", "1px", "background", "black", "top", "12px", "border", "none");
				setSliderAttr("scaleX", 0.5f);
			} else {
				DOMNode.setStyles(sliderHandle, "transform", "scaleY(0.5) rotateZ(45deg)", "left", "-10px",
						"margin-bottom", "-7px");
				DOMNode.setStyles(sliderTrack, "width", "1px", "left", "12px", "background", "black", "border", "none");
				setSliderAttr("scaleY", 0.5f);
			}
		} else {
			if (isHoriz && paintLabels)
				barPlace = 30;
			DOMNode.setStyles(sliderTrack, isHoriz ? "top" : "left", barPlace + "%");
			DOMNode.setStyles(sliderHandle, isHoriz ? "top" : "left", "50%", "transform", "translateY(-50%)");
		}
		if (isScrollBar) {
			setScrollBarExtentAndCSS();
		} else {
			if (!isHoriz)
				DOMNode.setStyle(sliderTrack, "height", length + "px");
		}
		getHTMLSizePreferred(domNode, false);
	}


	@Override
	protected Dimension getHTMLSizePreferred(DOMNode obj, boolean addCSS) {
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

	public void propertyChange(PropertyChangeEvent e) {
		String propertyName = e.getPropertyName();
		switch (propertyName) {
		case "labelTable":
			// checkedLabelBaselines = false;
			calculateGeometry();
			setTainted();// slider.repaint();
			break;
		case "orientation":
		case "inverted":
		case "majorTickSpacing":
		case "minorTickSpacing":
		case "paintTicks":
		case "paintTrack":
		case "font":
		case "paintLabels":
		case "Slider.paintThumbArrowShape":
			// checkedLabelBaselines = false;
			calculateGeometry();
			setTainted();// slider.repaint();
			break;
		case "componentOrientation":
			calculateGeometry();
			setTainted();// slider.repaint();
//            InputMap km = getInputMap(JComponent.WHEN_FOCUSED, slider);
//            SwingUtilities.replaceUIInputMap(slider,
//                JComponent.WHEN_FOCUSED, km);
			break;
		case "model":
			((BoundedRangeModel) e.getOldValue()).removeChangeListener(this);
			((BoundedRangeModel) e.getNewValue()).addChangeListener(this);
//            calculateThumbLocation();
			setTainted();// slider.repaint();
			break;
		}
		super.propertyChange(e);
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
		if ((v = slider.getValue()) != jsval) {
			//System.out.println("JSSliderUI val set to " + v + " from " + jsval);
			setSliderAttr("value", jsval = v);
		}
		setup(false);
	}


	void setScrollBarExtentAndCSS() {
		// overridden in JSScrollBarUI
	}

//	@Override
//	public Dimension getMinimumSize(JComponent jc) {
//		return (isScrollBar ? super.getMinimumSize(jc) 
//				: isHoriz ? getMinimumHorizontalSize() : getMinimumVerticalSize());
//	}

	private Dimension getMinimumHorizontalSize() {
		Dimension horizDim = (Dimension) DefaultLookup.get(slider, this,
				"Slider.minimumHorizontalSize");
		if (horizDim == null) {
			horizDim = new Dimension(36, paintLabels ? 35 : 21);
		}
		return horizDim;
	}

	
	
    protected Insets focusInsets = null;
    protected Insets insetCache = null;
    protected boolean leftToRightCache = true;
    protected Rectangle focusRect = null;
    protected Rectangle contentRect = null;
    protected Rectangle labelRect = null;
    protected Rectangle tickRect = null;
    protected Rectangle trackRect = null;
    protected Rectangle thumbRect = null;

    @Override
	public Dimension getMinimumSize(JComponent c)  {
    	
		if (isScrollBar)
			return super.getMinimumSize(c); 

        recalculateIfInsetsChanged(false);
        Dimension d;

        if ( slider.getOrientation() == JSlider.VERTICAL ) {
            d = new Dimension(getMinimumVerticalSize());
            d.width = insetCache.left + insetCache.right;
            d.width += focusInsets.left + focusInsets.right;
            d.width += trackRect.width + tickRect.width + labelRect.width;
        }
        else {
            d = new Dimension(getMinimumHorizontalSize());
            d.height = insetCache.top + insetCache.bottom;
            d.height += focusInsets.top + focusInsets.bottom;
            d.height += trackRect.height + tickRect.height + labelRect.height;
        }

        return d;
    }

    protected boolean recalculateIfInsetsChanged(boolean doForce) {
        Insets newInsets = slider.getInsets();
        if (doForce || !newInsets.equals( insetCache ) ) {
            insetCache = newInsets;
            calculateGeometry();
            return true;
        }
        return false;
    }
    

	protected boolean recalculateIfOrientationChanged(boolean doit) {
		boolean ltr = JSGraphicsUtils.isLeftToRight(slider);
		if (ltr == leftToRightCache)
			return false;
		leftToRightCache = ltr;
		if (doit)
			calculateGeometry();
		return true;
	}



    protected void calculateGeometry() {
    	if (isScrollBar)
    		return;
        calculateFocusRect();
        calculateContentRect();
        calculateThumbSize();
        calculateTrackBuffer();
        calculateTrackRect();
        calculateTickRect();
        calculateLabelRect();
//        calculateThumbLocation();
    }


    protected void calculateTickRect() {
        if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
            tickRect.x = trackRect.x;
            tickRect.y = trackRect.y + trackRect.height;
            tickRect.width = trackRect.width;
            tickRect.height = (slider.getPaintTicks()) ? getTickLength() : 0;
        }
        else {
            tickRect.width = (slider.getPaintTicks()) ? getTickLength() : 0;
            if(JSGraphicsUtils.isLeftToRight(slider)) {
                tickRect.x = trackRect.x + trackRect.width;
            }
            else {
                tickRect.x = trackRect.x - tickRect.width;
            }
            tickRect.y = trackRect.y;
            tickRect.height = trackRect.height;
        }
    }


    protected int trackBuffer = 0;  // The distance that the track is from the side of the control


    protected void calculateTrackBuffer() {
        if ( slider.getPaintLabels() && slider.getLabelTable()  != null ) {
            Component highLabel = getHighestValueLabel();
            Component lowLabel = getLowestValueLabel();

            if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
                trackBuffer = Math.max( highLabel.getBounds().width, lowLabel.getBounds().width ) / 2;
                trackBuffer = Math.max( trackBuffer, thumbRect.width / 2 );
            }
            else {
                trackBuffer = Math.max( highLabel.getBounds().height, lowLabel.getBounds().height ) / 2;
                trackBuffer = Math.max( trackBuffer, thumbRect.height / 2 );
            }
        }
        else {
            if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
                trackBuffer = thumbRect.width / 2;
            }
            else {
                trackBuffer = thumbRect.height / 2;
            }
        }
    }


    protected void calculateTrackRect() {
        int centerSpacing; // used to center sliders added using BorderLayout.CENTER (bug 4275631)
        if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
            centerSpacing = thumbRect.height;
            if ( slider.getPaintTicks() ) centerSpacing += getTickLength();
            if ( slider.getPaintLabels() ) centerSpacing += getHeightOfTallestLabel();
            trackRect.x = contentRect.x + trackBuffer;
            trackRect.y = contentRect.y + (contentRect.height - centerSpacing - 1)/2;
            trackRect.width = contentRect.width - (trackBuffer * 2);
            trackRect.height = thumbRect.height;
        }
        else {
            centerSpacing = thumbRect.width;
            if (JSGraphicsUtils.isLeftToRight(slider)) {
                if ( slider.getPaintTicks() ) centerSpacing += getTickLength();
                if ( slider.getPaintLabels() ) centerSpacing += getWidthOfWidestLabel();
            } else {
                if ( slider.getPaintTicks() ) centerSpacing -= getTickLength();
                if ( slider.getPaintLabels() ) centerSpacing -= getWidthOfWidestLabel();
            }
            trackRect.x = contentRect.x + (contentRect.width - centerSpacing - 1)/2;
            trackRect.y = contentRect.y + trackBuffer;
            trackRect.width = thumbRect.width;
            trackRect.height = contentRect.height - (trackBuffer * 2);
        }

    }

    /**
     * Gets the height of the tick area for horizontal sliders and the width of the
     * tick area for vertical sliders.  BasicSliderUI uses the returned value to
     * determine the tick area rectangle.  If you want to give your ticks some room,
     * make this larger than you need and paint your ticks away from the sides in paintTicks().
     */
    protected int getTickLength() {
        return 8;
    }

    protected void calculateLabelRect() {
        if ( slider.getPaintLabels() ) {
            if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
                labelRect.x = tickRect.x - trackBuffer;
                labelRect.y = tickRect.y + tickRect.height;
                labelRect.width = tickRect.width + (trackBuffer * 2);
                labelRect.height = getHeightOfTallestLabel();
            }
            else {
                if(JSGraphicsUtils.isLeftToRight(slider)) {
                    labelRect.x = tickRect.x + tickRect.width;
                    labelRect.width = getWidthOfWidestLabel();
                }
                else {
                    labelRect.width = getWidthOfWidestLabel();
                    labelRect.x = tickRect.x - labelRect.width;
                }
                labelRect.y = tickRect.y - trackBuffer;
                labelRect.height = tickRect.height + (trackBuffer * 2);
            }
        }
        else {
            if ( slider.getOrientation() == JSlider.HORIZONTAL ) {
                labelRect.x = tickRect.x;
                labelRect.y = tickRect.y + tickRect.height;
                labelRect.width = tickRect.width;
                labelRect.height = 0;
            }
            else {
                if(JSGraphicsUtils.isLeftToRight(slider)) {
                    labelRect.x = tickRect.x + tickRect.width;
                }
                else {
                    labelRect.x = tickRect.x;
                }
                labelRect.y = tickRect.y;
                labelRect.width = 0;
                labelRect.height = tickRect.height;
            }
        }
    }

    protected int getWidthOfWidestLabel() {
        Dictionary dictionary = slider.getLabelTable();
        int widest = 0;
        if ( dictionary != null ) {
            Enumeration keys = dictionary.keys();
            while ( keys.hasMoreElements() ) {
                JComponent label = (JComponent) dictionary.get(keys.nextElement());
                widest = Math.max( label.getPreferredSize().width, widest );
                label.秘getUI().imagePersists = true;
            }
        }
        return widest;
    }

    protected int getHeightOfTallestLabel() {
        Dictionary dictionary = slider.getLabelTable();
        int tallest = 0;
        if ( dictionary != null ) {
            Enumeration keys = dictionary.keys();
            while ( keys.hasMoreElements() ) {
                JComponent label = (JComponent) dictionary.get(keys.nextElement());
                tallest = Math.max( label.getPreferredSize().height, tallest );
            }
        }
        return tallest;
    }

    /**
     * Returns the biggest value that has an entry in the label table.
     *
     * @return biggest value that has an entry in the label table, or
     *         null.
     * @since 1.6
     */
    protected Integer getHighestValue() {
        Dictionary dictionary = slider.getLabelTable();

        if (dictionary == null) {
            return null;
        }

        Enumeration keys = dictionary.keys();

        Integer max = null;

        while (keys.hasMoreElements()) {
            Integer i = (Integer) keys.nextElement();

            if (max == null || i > max) {
                max = i;
            }
        }

        return max;
    }

    /**
     * Returns the smallest value that has an entry in the label table.
     *
     * @return smallest value that has an entry in the label table, or
     *         null.
     * @since 1.6
     */
    protected Integer getLowestValue() {
        Dictionary dictionary = slider.getLabelTable();

        if (dictionary == null) {
            return null;
        }

        Enumeration keys = dictionary.keys();

        Integer min = null;

        while (keys.hasMoreElements()) {
            Integer i = (Integer) keys.nextElement();

            if (min == null || i < min) {
                min = i;
            }
        }

        return min;
    }


    protected int getWidthOfHighValueLabel() {
        Component label = getHighestValueLabel();
        int width = 0;

        if ( label != null ) {
            width = label.getPreferredSize().width;
        }

        return width;
    }

    protected int getWidthOfLowValueLabel() {
        Component label = getLowestValueLabel();
        int width = 0;

        if ( label != null ) {
            width = label.getPreferredSize().width;
        }

        return width;
    }

    protected int getHeightOfHighValueLabel() {
        Component label = getHighestValueLabel();
        int height = 0;

        if ( label != null ) {
            height = label.getPreferredSize().height;
        }

        return height;
    }

    protected int getHeightOfLowValueLabel() {
        Component label = getLowestValueLabel();
        int height = 0;

        if ( label != null ) {
            height = label.getPreferredSize().height;
        }

        return height;
    }

    /**
     * Returns the label that corresponds to the highest slider value in the label table.
     * @see JSlider#setLabelTable
     */
    protected Component getLowestValueLabel() {
        Integer min = getLowestValue();
        if (min != null) {
            return (Component)slider.getLabelTable().get(min);
        }
        return null;
    }

    /**
     * Returns the label that corresponds to the lowest slider value in the label table.
     * @see JSlider#setLabelTable
     */
    protected Component getHighestValueLabel() {
        Integer max = getHighestValue();
        if (max != null) {
            return (Component)slider.getLabelTable().get(max);
        }
        return null;
    }

    protected Dimension getThumbSize() {
        Dimension size = new Dimension();

        if ( slider.getOrientation() == JSlider.VERTICAL ) {
            size.width = 20;
            size.height = 11;
        }
        else {
            size.width = 11;
            size.height = 20;
        }

        return size;
    }

    protected void calculateFocusRect() {
        focusRect.x = insetCache.left;
        focusRect.y = insetCache.top;
        focusRect.width = slider.getWidth() - (insetCache.left + insetCache.right);
        focusRect.height = slider.getHeight() - (insetCache.top + insetCache.bottom);
    }

    protected void calculateThumbSize() {
        Dimension size = getThumbSize();
        thumbRect.setSize( size.width, size.height );
    }

    protected void calculateContentRect() {
        contentRect.x = focusRect.x + focusInsets.left;
        contentRect.y = focusRect.y + focusInsets.top;
        contentRect.width = focusRect.width - (focusInsets.left + focusInsets.right);
        contentRect.height = focusRect.height - (focusInsets.top + focusInsets.bottom);
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
	public Dimension getPreferredSize(JComponent jc) {
		if (isScrollBar)
			return super.getPreferredSize(jc);
        recalculateIfInsetsChanged(false);
        Dimension d;
        if ( slider.getOrientation() == JSlider.VERTICAL ) {
            d = new Dimension(getPreferredVerticalSize());
            d.width = insetCache.left + insetCache.right;
            d.width += focusInsets.left + focusInsets.right;
            d.width += trackRect.width + tickRect.width + labelRect.width;
        }
        else {
            d = new Dimension(getPreferredHorizontalSize());
            d.height = insetCache.top + insetCache.bottom;
            d.height += focusInsets.top + focusInsets.bottom;
            d.height += trackRect.height + tickRect.height + labelRect.height;
        }
        return d;
	}

	public Dimension getPreferredHorizontalSize() {
		Dimension horizDim = (Dimension) DefaultLookup.get(slider, this,
				"Slider.horizontalSize");
		return new Dimension(horizDim.width, Math.max(horizDim.height, myHeight));
	}

	public Dimension getPreferredVerticalSize() {
		Dimension vertDim = (Dimension) DefaultLookup.get(slider, this,
				"Slider.verticalSize");
		return new Dimension(Math.max(vertDim.width, myHeight), vertDim.height);
	}

	/**
	 * called from JSSliderUI
	 * 
	 * @param dir
	 * @param val
	 */
    public void scrollDueToClickInTrack(int dir, int val) {
        scrollByBlock(dir, val);
    }

	public void scrollByBlock(int direction) {
		scrollByBlock(direction, Integer.MAX_VALUE);
	}
	
	public void scrollByBlock(int direction, int val0) {

//		 -- slider only code
//		synchronized (slider) {
			int val = 0, blockIncrement = -1;
			if (slider.getSnapToTicks()) {
				Object jsslider = $(jqSlider);
				if (slider.getSnapToValue()) {
					val = val0;
				} else {
					blockIncrement = getTickSpacing();
				}
			} else {
				blockIncrement = (slider.getMaximum() - slider.getMinimum()) / 10;
                if (blockIncrement == 0) {
                    blockIncrement = 1;
                }
			}
			if (blockIncrement >= 0)
                val = slider.getValue() + blockIncrement * ((direction > 0) ? POSITIVE_SCROLL : direction == 0 ? 0 : NEGATIVE_SCROLL);
			setValue(snapTo(val));
		}
//	}

    private int snapTo(int val) {
    	if (ticks != null && ticks.length > 2 && slider.getSnapToTicks()) {
    	  int dc = Integer.MAX_VALUE;
    	  int v = val;
    	  for (int i = ticks.length; --i >= 0;) {
    		  int d = Math.abs(ticks[i] - val);
    		  if (d < dc) {
    			  dc = d;
    			  v = ticks[i];
    		  }
    	  }
    	  val = v;
    	}
    	return val;
	}

	public void scrollByUnit(int direction) {
        synchronized(slider)    {
            int delta = ((direction > 0) ? POSITIVE_SCROLL : NEGATIVE_SCROLL);

            if (slider.getSnapToTicks()) {
                delta *= getTickSpacing();
            }

            setValue(slider.getValue() + delta);
        }
    }
    
    public int getUnitIncrement() {
    	// JScrollBar only
    	return -1;
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
				DOMNode.setStyle(sliderTrack, "height", (height - margin * 2) + "px");
			} else if (isScrollBar) {
				DOMNode.setStyle(sliderTrack, "width", (width - margin * 2) + "px");
			}
			setScrollBarExtentAndCSS();
		}
	}

	@Override
	protected void setJSDimensions(int width, int height) {
		super.setJSDimensions(width, height);
		DOMNode.setPositionAbsolute(domNode);
		if (isHoriz) {
			int off = (height - myHeight + (insetCache.top - insetCache.bottom)) / 2;
			DOMNode.setStyles(domNode, "top", off + "px", "height", myHeight + "px");
		} else {
			DOMNode.setStyles(domNode, "left", (isScrollBar || true ? (width - myHeight) / 2 : insetCache.left) + "px", "width", myHeight + "px");
		}
		if (!isScrollBar)
			setSlider();
	}

//	@Override
//	public void endLayout() {
//		setSlider();
//		super.endLayout();		
//	}


	@Override
	public Dimension getMaximumSize(JComponent jc) {
		Dimension d = (isScrollBar ? super.getMaximumSize(jc) : null);
		return (d != null ? d : isHoriz ? new Dimension(Short.MAX_VALUE, 40) : new Dimension(40, Short.MAX_VALUE));
	}

	public void clearPaintPath() {
		if (!isScrollBar)
			setBackgroundDOM(outerNode, null);
		super.clearPaintPath();
	}

	@Override
	public void paint(Graphics g, JComponent c) {
		Dictionary<Integer, JLabel> labelTable;
		if (!isScrollBar && paintLabels && (labelTable = slider.getLabelTable()) != null) {
			paintLabels(labelTable, false);			
		}
		super.paint(g,  c);
	}

	private void paintLabels(Dictionary<Integer, JLabel> labelTable, boolean isNew) {
		Enumeration keys = labelTable.keys();
		while (keys.hasMoreElements()) {
			Object key = keys.nextElement();
			int n = Integer.parseInt(key.toString());
			JLabel label = labelTable.get(key);
			JSComponentUI lui = label.秘getUI();
			lui.imagePersists = true;
			lui.setTainted();
			lui.updateDOMNode();
			DOMNode labelNode = lui.getOuterNode();
			// need calculation of pixels
			float frac = (n - min) * 1f / (max - min);
			if (isHoriz == isInverted)
				frac = 1 - frac;
			float px = (frac * length + margin);
			int left, top;
			if (isHoriz) {
				top = (paintTicks ? 20 : 15);
				left = (int) (px - label.getWidth() / 2);
			} else {
				top = (int) (px - label.getHeight() / 2);
				left = (paintTicks ? 20 : 15);
			}
			DOMNode.setTopLeftAbsolute(labelNode, top, left);
			if (isNew) {
				DOMNode.setStyle(labelNode, "overflow", null);
				addClass(labelNode, "jslider-label");
				domNode.insertBefore(labelNode, sliderTrack);
			}
		}
	}

}
