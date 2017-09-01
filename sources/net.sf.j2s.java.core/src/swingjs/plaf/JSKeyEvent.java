package swingjs.plaf;

import java.awt.AWTKeyStroke;

import java.awt.Component;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import javax.swing.JComponent;

public class JSKeyEvent extends KeyEvent {

	Object jqEvent;

	public JSKeyEvent(JComponent source, Object jQueryEvent) {
		super();
		String evType = null;
		int keyCode = 0;
		int which = 0;
		int modifiers = 0;
		int id = 0;
		long when = System.currentTimeMillis();
		char keyChar = 0;
		int keyLocation = KeyEvent.KEY_LOCATION_UNKNOWN;
		String key = "";
		Object ev = jQueryEvent;
		/**
		 * @j2sNative
		 * 
		 *						key = ev.key;
		 *            evType = ev.type;
		 *            keyCode = ev.keyCode || ev.which;
		 *            if (keyCode == 13) keyCode = 10;
		 *            if (evType == "keypress")
		 *            ev.originalEvent.preventDefault();
		 *            
		 *             
		 * 		if (ev.shiftKey)
			modifiers |= (1<<0)|(1<<6); //InputEvent.SHIFT_MASK + InputEvent.SHIFT_DOWN_MASK;
		if (ev.ctrlKey)
			modifiers |= (1<<1)|(1<<7); //InputEvent.CTRL_MASK + InputEvent.CTRL_DOWN_MASK;
		if (ev.metaKey)
			modifiers |= (1<<2)|(1<<8); //InputEvent.META_MASK + InputEvent.META_DOWN_MASK;
		if (ev.altKey)
			modifiers |= (1<<3)|(1<<9); //InputEvent.ALT_MASK + InputEvent.ALT_DOWN_MASK;
		if (ev.altGraphKey)
			modifiers |= (1<<5)|(1<<13); //InputEvent.ALT_GRAPH_MASK + InputEvent.ALT_GRAPH_DOWN_MASK;
		 * 
		 * 		if (keyCode == 8 && evType == "keypress") ev.originalEvent.preventDefault();	
		 */
		{}

		// JavaScript: keydown      keypress   keyup
		// Java:       KEY_PRESSED  KEY_TYPED  KEY_RELEASED
		
		id = (evType == "keydown" ? KeyEvent.KEY_PRESSED : evType == "keypress" ? KeyEvent.KEY_TYPED  : evType == "keyup" ? KeyEvent.KEY_RELEASED : 0);
		this.source = source;
		this.id = id;
		this.when = when;
		this.modifiers = modifiers;
		this.keyCode = keyCode;
		int ch;
		int test;
		try {
			// only safe thing to do is get Java's keyCode from itself
			// for example, "Delete" is 46 instead of 127
			this.keyCode = (key.length() == 1 ? 0 
					+ (id == 400 ? '\0' : key.toUpperCase().charAt(0)) 
					: keyCode == 10 || keyCode == 8 || keyCode == 9 ? 0 : 
					(ch = AWTKeyStroke.getVKValue ("VK_" + key.toUpperCase())) == 0 ? keyCode : ch);
		} catch (Exception e) {
			// ignore
		}		
		this.keyChar = (key.length() == 1 ? key.charAt(0) : keyCode == 10 ? '\n' : keyCode == 8 ? '\b' : keyCode == 9 ? '\t' : '\0');
		this.keyLocation = keyLocation;
		this.jqEvent = ev;
	}

}
