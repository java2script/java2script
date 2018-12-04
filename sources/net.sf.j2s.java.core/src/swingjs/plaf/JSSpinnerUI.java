package swingjs.plaf;

import java.awt.Event;
import java.awt.event.KeyEvent;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

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
public class JSSpinnerUI extends JSLightweightUI {
	private JSpinner spinner;

	private DOMNode dn, up, dnNode, upNode;
	
	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {

			domNode = newDOMObject("div", id);

			// no textNode here, because in input does not have that.
			
			// input box
			focusNode = valueNode = DOMNode.setStyles(
					newDOMObject("input", id, "type", "text"), "padding", "0px 1px",
					"width", "30px", "text-align", "right");
			vCenter(valueNode, -10, 0);
			bindJSKeyEvents(valueNode, false);

			// increment button
			up = DOMNode.setStyles(newDOMObject("div", id + "_updiv"),
					"left", "33px", "top", "-5px", "position", "absolute");
			upNode = DOMNode.setStyles(
					newDOMObject("input", id + "_up", "type", "button", "value", ""),
					"transform", "scaleY(.5)", "width", "20px", "height", "20px");
			DOMNode.setAttr(upNode, "value",  "\u25b2");
			up.appendChild(upNode);
			bindJSEvents(upNode, "mousedown touchstart", Event.MOUSE_DOWN, true);
			bindJSEvents(upNode, "mouseup touchend", Event.MOUSE_UP, true);

			// decrement button
			dn = DOMNode.setStyles(newDOMObject("div", id + "_dndiv"),
					"left", "33px", "top", "5px", "position", "absolute");
			dnNode = DOMNode.setStyles(
					newDOMObject("input", id + "_dn", "type", "button", "value", ""),
					"transform", "scaleY(.5)", "width", "20px", "height",
					"20px");
			DOMNode.setAttr(dnNode, "value",  "\u25bc");
			dn.appendChild(dnNode);
			bindJSEvents(dnNode, "mousedown touchstart", Event.MOUSE_DOWN, true);
			bindJSEvents(dnNode, "mouseup touchend", Event.MOUSE_UP, true);

			domNode.appendChild(valueNode);
			domNode.appendChild(up);
			domNode.appendChild(dn);

			enableNodes = new DOMNode[] { valueNode, up, dn };

			addJQueryFocusCallbacks();
			
		}
		setCssFont(setValue(), c.getFont());
		int w = (spinner.isPreferredSizeSet() ? spinner.getPreferredSize().width : 70);
		DOMNode.setStyles(valueNode, "width", (w - 38) + "px");
		DOMNode.setStyles(up, "left", (w - 34)  + "px");
		DOMNode.setStyles(dn, "left", (w - 34)  + "px");
		return updateDOMNodeCUI();
	}

	private DOMNode setValue() {
		setProp(valueNode, "value", "" + spinner.getValue());
		return valueNode;
	}
	
	private Timer timer;
	private boolean incrementing;
	/**
	 * called by j2sApplet.js based on bindJSEvents
	 * 
	 * Handling mousedown (start incrementing) and mouseup (stop incrementing)
	 * on the buttons
	 * 
	 * Handling ENTER pressed on text input
	 * 
	 * @return handled
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventID, Object jQueryEvent) {
		
		int keyCode = 0;
		String id = (String) DOMNode.getAttr((DOMNode)target, "id");
		/**
		 * @j2sNative
		 * 
		 *            keyCode = jQueryEvent.keyCode; if (keyCode == 13) keyCode =
		 *            10;
		 *            
		 */
		{
		}
		switch (eventID) {
		case Event.MOUSE_DOWN:
			if (timer != null)
				timer.stop();
			incrementing = (id == this.id + "_up");
			if (!incrementing && id != this.id + "_dn")
				return true;
			timer = new Timer(20, new ActionListener() {
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
		case KeyEvent.KEY_PRESSED:
			if (keyCode == 10) {
			try {
					int n = Integer.parseInt("" + DOMNode.getAttr(valueNode, "value"));
				spinner.setValue(new Integer(n));
			} catch (Throwable e) {
				// ignore
			}
		}
			break;
		}
		return true;
	}

	void doAction() {
		Object val = (incrementing ? 
			spinner.getNextValue() : spinner.getPreviousValue());
		if (val != null)
			spinner.setValue(val);
	}

	@Override
	public void propertyChangedFromListener(String prop) {
			propertyChangedCUI(prop);
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
