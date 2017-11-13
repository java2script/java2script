package swingjs.plaf;


import java.util.Dictionary;
import java.util.Enumeration;

//import javajs.J2SRequireImport;

import javax.swing.SwingConstants;

import java.awt.Dimension;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import javax.swing.BoundedRangeModel;
import javax.swing.JLabel;
import javax.swing.JScrollBar;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import sun.swing.DefaultLookup;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

//@J2SRequireImport(swingjs.jquery.JQueryUI.class)
@SuppressWarnings({"rawtypes", "unchecked", "unused"})
public class JSSliderUI extends JSLightweightUI implements PropertyChangeListener, ChangeListener {

	private static Object jsqueryUI = new swingjs.jquery.JQueryUI();
	JSlider jSlider;
	private int min, max, val, majorSpacing, minorSpacing;
	protected boolean paintTicks;
	protected boolean paintLabels;
	private boolean snapToTicks;
	private Dictionary<Integer, JLabel> labelTable;
	
	protected String orientation;
	
	boolean isScrollPaneScrollBar; // vertical scrollbars on scroll panes are inverted
	
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
	
	private static boolean cssLoaded = false;

	public JSSliderUI() {
		
		if (!cssLoaded) {
			// this static call allows for the CSS to be loaded only once and only when needed
			JSUtil.loadStaticResource("swingjs/jquery/jquery-ui-j2sslider.css");
			JSUtil.loadStaticResource("swingjs/jquery/jquery-ui-j2sslider.js");
			cssLoaded = true;
		}
		needPreferred = true;
		setDoc();
	}

	@Override
	protected DOMNode updateDOMNode() {
		JSlider js = (JSlider) c;
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
		boolean isHoriz = (jSlider.getOrientation() == SwingConstants.HORIZONTAL);
		boolean isVerticalScrollBar = (isScrollBar && !isHoriz);
		boolean isInverted = isVerticalScrollBar || !isScrollBar && jSlider.getInverted();
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
		} else if (isChanged) {
			DOMNode.remove(jqSlider);
			domNode.appendChild(jqSlider = DOMNode.createElement("div", id));
			setJQuerySliderAndEvents();	
		  setInnerComponentBounds(jc.getWidth(), jc.getHeight());
		}
		setup(isNew || isChanged);
		setSlider();
		if (jc.isOpaque())
			setBackground(jc.getBackground());
		return domNode;
	}

	@Override
	public void installUIImpl() {
		jSlider = (JSlider) c;
		if (isScrollBar)
			jScrollBar = (JScrollBar) c;
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
	    jSlider.setValueIsAdjusting(true);
	}

	/**
	 * called from JavaScript via the hook added in setJQuerySliderAndEvents  
	 * 
	 * @param event
	 * @param ui
	 */
	public void jqueryStop(Object event, Object ui) {
	    jSlider.setValueIsAdjusting(false);
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
		
		jSlider.setValue(val = (value));
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
//		int z = getZIndex(null);
//		if (z == z0)
//			return;
//		z0 = z;
		//System.out.println("JSSliderUI setting z to " + z);
		sliderTrack = DOMNode.firstChild(domNode);
		sliderHandle = DOMNode.firstChild(sliderTrack);
		//DOMNode.setZ(sliderTrack, z++);
		//DOMNode.setZ(sliderHandle, z++);
		// mark the handle and track with the "swingjs-ui" class
		// so as to ignore all mouse/touch events from Jmol._jsSetMouse();
		if (isNew) {
			ignoreAllMouseEvents(sliderHandle);
			ignoreAllMouseEvents(sliderTrack);
			setDataComponent(sliderHandle);
		}
	}

	private void setSliderAttr(String key, float val) {
		Object slider = $(jqSlider);
		/**
		 * @j2sNative
		 * 
		 *  var a = {};
		 *  a[key]= val;
		 *  slider.j2sslider(a);
		 */
		{}
	}

	public void setSlider() {
		setSliderAttr("value", val);
		setSliderAttr("min", min);
		setSliderAttr("max", max);

		myHeight = 10;
		int barPlace = 40;
		if (isHoriz && jSlider.getBorder() != null)
			barPlace += 10;

		String tickClass = "ui-j2sslider-tick-mark"
				+ (isHoriz ? "-vert" : "-horiz");
		$(domNode).find("." + tickClass).remove();
		$(domNode).find(".jslider-labels").remove();
		setHTMLSize(jqSlider, false);
		if (majorSpacing == 0 && minorSpacing == 0 || !paintTicks && !paintLabels)
			return;
		int margin = 10;

		int length = (isHoriz ? jSlider.getWidth() : jSlider.getHeight());
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
					$(node).css(isHoriz ? "height" : "width", "10px");
				$(node).css(isHoriz ? "left" : "top", spt).appendTo(domNode);
			}
			setHTMLSize(domNode, false);
		}
		if (paintLabels) {
			myHeight += 20;
			labelTable = jSlider.getLabelTable();
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
				DOMNode.setPositionAbsolute(labelNode, top, left);
				domNode.appendChild(labelNode);
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
		if (!isHoriz && !isScrollPaneScrollBar)
			DOMNode.setStyles(sliderTrack, "height", length + "px");
		if (isScrollPaneScrollBar)
			setScrollPaneCSS();
		setHTMLSize(domNode, false);
	}


	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		int d = 20;
		if (paintLabels || paintTicks)
			d += 10;
		if (jSlider.getBorder() != null)
			d += 10;
		// only the width or height will be read here, not both
		return new Dimension((isHoriz ? actualWidth : d), (isHoriz ? d : actualHeight));
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (prop == "ancestor") {
			setup(false);
		}
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// from Java
		//isTainted = true;
				int v;
		if ((v = jSlider.getMinimum()) != min)
			setSliderAttr("min", min = v);
		if ((v = jSlider.getMaximum()) != max)
			setSliderAttr("max", max = v);		
		if ((v = jSlider.getValue()) != val) 
			setSliderAttr("value", val = v);
		setup(false);
	}


	@Override
	public void setInnerComponentBounds(int width, int height) {
		if (!paintTicks && !paintLabels) {
			if (orientation == "vertical") {
				DOMNode.setStyles(sliderTrack, "height", (height - 20) + "px");
			}
			if (isScrollPaneScrollBar)
				setScrollPaneCSS();

		}
	}

	void setScrollPaneCSS() {
		isScrollPaneScrollBar = true;
		if (orientation == "vertical") {
			DOMNode.setStyles(sliderTrack, "left", "0px", "width", "12px");
			DOMNode.setStyles(sliderHandle, "left", "-1px");
		} else {
			DOMNode.setStyles(sliderTrack, "top", "0px", "height", "12px");
			DOMNode.setStyles(sliderHandle, "top", "-1px");
		}
	}


	public Dimension getPreferredHorizontalSize() {
		Dimension horizDim = (Dimension) DefaultLookup.get(jSlider, this,
				"Slider.horizontalSize");
		if (horizDim == null) {
			horizDim = new Dimension(200, 21);
		}
		return horizDim;
	}

	public Dimension getPreferredVerticalSize() {
		Dimension vertDim = (Dimension) DefaultLookup.get(jSlider, this,
				"Slider.verticalSize");
		if (vertDim == null) {
			vertDim = new Dimension(21, 200);
		}
		return vertDim;
	}

}
