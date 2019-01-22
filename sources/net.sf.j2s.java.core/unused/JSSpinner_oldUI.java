package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Event;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JSpinner;
import javax.swing.LookAndFeel;
import javax.swing.Timer;
import javax.swing.event.ChangeEvent;

import swingjs.api.js.DOMNode;

/**
 * Very minimal spinner - just an editable text box. 
 * 
 * @author Bob Hanson
 *
 */
public class JSSpinner_oldUI extends JSLightweightUI {
	private JSpinner spinner;

	private DOMNode up, dn;

	@Override
	public DOMNode updateDOMNode() {
		spinner = (JSpinner) jc;
		if (domNode == null) {
			domNode = newDOMObject("div", id);
			
			// no textNode here, because in input does not have that.
			
			// input box
			focusNode = valueNode = DOMNode.setStyles(
					newDOMObject("input", id, "type", "text"),// "padding", "0px 1px",
					"width", "30px", "text-align", "right");
			//vCenter(valueNode, -5, 0);
			bindJSKeyEvents(valueNode, true);
			DOMNode updiv = addButton(true);
			up = dn;
			DOMNode dndiv = addButton(false);
			domNode.appendChild(valueNode);
			domNode.appendChild(updiv);
			domNode.appendChild(dndiv);
			enableNodes = new DOMNode[] { valueNode, updiv, dndiv };
			setDoPropagate();
		}
		setCssFont(setValue(), c.getFont());
		int w = spinner.getWidth();//(spinner.isPreferredSizeSet() ? spinner.getPreferredSize().width : 70);
		DOMNode.setStyles(enableNodes[0], "position", "absolute", "left","1px","top","2px", "width", (w - 25) + "px");
		DOMNode.setStyles(enableNodes[1], "left", (w - 20)  + "px");
		DOMNode.setStyles(enableNodes[2], "left", (w - 20)  + "px");
		return updateDOMNodeCUI();
	}

	private DOMNode addButton(boolean isUp) {
		String key = id + "_" + (isUp ? "up" : "dn");
		String top = (isUp ? "-5px" : "5px");
		DOMNode div = DOMNode.setStyles(newDOMObject("div", key + "div"),
				"left", "33px", "top", top, "position", "absolute");
	    dn = DOMNode.setStyles(
				newDOMObject("input", key, "type", "button", "value", ""),
				"transform", "scaleY(.5)", "width", "20px", "height", "20px");
		String label = (isUp ?  "\u25b2" : "\u25bc");
		DOMNode.setAttr(dn, "value",  label);
		setDataUI(dn);
		ignoreAllMouseEvents(dn);
		bindJQueryEvents(dn, "mousedown touchstart", Event.MOUSE_DOWN);
		bindJQueryEvents(dn, "mouseup touchend", Event.MOUSE_UP);
		div.appendChild(dn);
		return div;
	}

	@Override
	public Dimension getPreferredSize(JComponent jc) {
		return new Dimension(50,20);
	}
	
	private DOMNode setValue() {
		setProp(valueNode, "value", "" + spinner.getValue());
		return valueNode;
	}
	
	private Timer timer;
	private boolean incrementing;

	/**
	 * We must let the events through, at least for the text field.
	 * 
	 * 
	 * mouse events only -- called by j2sApplet.js
	 * 
	 * @param ev
	 * @param handled
	 * @return true only if no further processing is desired
	 */
	public boolean checkStopPropagation(Object ev, boolean handled) {
		// ev.stopPropagation();
		// ev.preventDefault();
		return false;
	}

	/**
	 * called by j2sApplet.js based on bindJSEvents
	 * 
	 * Handling mousedown (start incrementing) and mouseup (stop incrementing) on
	 * the buttons
	 * 
	 * Handling ENTER pressed on text input
	 * 
	 * @return handled
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventID, Object jQueryEvent) {

		Object evTarget = /** @j2sNative jQueryEvent.target || */
				null;
		if (evTarget == focusNode) {
			int keyCode = /** @j2sNative jQueryEvent.keyCode || */
					0;
			if (keyCode == 13)
				keyCode = 10;
			if (eventID == KeyEvent.KEY_PRESSED) {
				// a key event of some sort
				if (keyCode == KeyEvent.VK_ENTER) {
					if ((/** @j2sNative jQueryEvent.type || */
					"keydown") == "keydown")
						try {
							spinner.setValue(new Integer(Integer.parseInt("" + DOMNode.getAttr(valueNode, "value"))));
						} catch (Throwable e) {
							// ignore
						}
					return CONSUMED; // not sure on this?
				}
				return NOT_CONSUMED;
			}
			return NOT_HANDLED;
		}
		incrementing = (target == up);
		if (!incrementing && target != dn)
			return HANDLED;
		switch (eventID) {
		case Event.MOUSE_DOWN:
			if (timer != null)
				timer.stop();
			timer = new Timer(200, new ActionListener() {
				@Override
				public void actionPerformed(ActionEvent e) {
					doAction();
				}
			});
			timer.start();
			doAction();
			break;
		case Event.MOUSE_UP:
			if (timer != null)
				timer.stop();
			timer = null;
			break;
		}
		return HANDLED; // aka NOT_CONSUMED
	}

	void doAction() {
		Object val = (incrementing ? 
			spinner.getNextValue() : spinner.getPreviousValue());
		if (val != null)
			spinner.setValue(val);
	}

	@Override
	public void propertyChangedFromListener(PropertyChangeEvent e, String prop) {
			propertyChangedCUI(e, prop);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		if (valueNode == null) {
			// This can happen if the model value is set and we have never displayed.
			// Q: should we create the domNode at this point? Or doesn't that matter?
			return;
		}
		setValue();
	}
	
	@Override
	public void installUI(JComponent jc) {
		spinner = (JSpinner) jc;
//    "Spinner.font", ControlFont,
//    "Spinner.ancestorInputMap",
//       new UIDefaults.LazyInputMap(new Object[] {
//                       "UP", "increment",
//                    "KP_UP", "increment",
//                     "DOWN", "decrement",
//                  "KP_DOWN", "decrement",
//       }),
    LookAndFeel.installColorsAndFont(jc, "Spinner.background", "Spinner.foreground", "Spinner.font");
    super.installUI(jc);
	}




}
