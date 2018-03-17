package swingjs.plaf;

import java.awt.AWTKeyStroke;
import java.awt.event.KeyEvent;

import javax.swing.JComponent;

@SuppressWarnings({"serial", "unused"})
public class JSKeyEvent extends KeyEvent {


//Alphanumeric keys
//    VK_0, VK_1, ..., VK_9, VK_A, VK_B, ..., VK_Z 
//Java: pressed/typed/released  (typed has charCode 0; pressed has UCASE keyCode but true-case keyChar
//JavaScript: down/pressed/up   

//Control keys
//    VK_ENTER, VK_BACKSPACE, VK_TAB, VK_ESCAPE
//Java: pressed/typed/released  (typed has charCode 0; pressed has UCASE keyCode but true-case keyChar
//JavaScript: down/pressed/up   
	
//Function keys
//    VK_F1, VK_F2, VK_F3, VK_F4 VK_F5, VK_F6, VK_F7, VK_F8, VK_F9, VK_F10, VK_F11, VK_F12,
//    VK_SCROLL_LOCK, VK_PRINTSCREEN, VK_PAUSE,
//    VK_DELETE, VK_INSERT,
//    VK_PAGE_UP, VK_PAGE_DOWN, VK_HOME, VK_END 
//Java: pressed/released only, with keyChar 0xFFFF
//   DEL: adds 0 127 typed
//   INS: code is 155
//JavaScript: down/pressed/up; only up for printScreen
//   DEL: code is 46
//   INS: code is 45

//Arrow keys
//    VK_LEFT, VK_RIGHT, VK_UP, VK_DOWN 
//Java: pressed/released   38/0xFFFF
//JavaScript: down/pressed/up  38/"ArrowUp"

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
