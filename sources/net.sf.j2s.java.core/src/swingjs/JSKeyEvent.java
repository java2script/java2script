package swingjs;

import java.awt.AWTKeyStroke;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

import javax.swing.JComponent;

/**
 * Handle the conversion between JavaScript and Java key events.
 * 
 * @author Bob Hanson
 *
 */
@SuppressWarnings({"serial", "unused"})
public class JSKeyEvent extends KeyEvent {

	// used currently only by plaf/JSListUI


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
	private boolean ignore;

	public JSKeyEvent(JComponent source, Object jQueryEvent) {
		super();
		this.source = source;
		when = System.currentTimeMillis();
		keyLocation = KeyEvent.KEY_LOCATION_UNKNOWN;
		Object ev = this.jqEvent = jQueryEvent;
		// JavaScript information:
		String evType = null;
		String jskey = "";
		int jskeyCode = 0;
		boolean shift = false, ctrl = false, meta = false, alt = false, altGraph = false;
		/**
		 * @j2sNative
		 * 
		 *            evType = ev.type;
		 *			  jskey = ev.key;
		 *            jskeyCode = ev.keyCode || ev.which;
		 *            if (evType == "keypress")
		 *              ev.originalEvent.preventDefault();
		 *            shift = ev.shiftKey;
		 *            ctrl = ev.ctrlKey;
		 *            alt = ev.altKey;
		 *            meta = ev.metaKey;
		 *            altGraph = ev.altGraphKey;
		 */

		modifiers = JSKeyEvent.getModifiers(shift, ctrl, alt, meta, altGraph);

		// JavaScript: keydown      keypress   keyup
		// Java:       KEY_PRESSED  KEY_TYPED  KEY_RELEASED
		
		id = (evType == "keydown" ? KEY_PRESSED : evType == "keypress" ? KEY_TYPED  : evType == "keyup" ? KEY_RELEASED : 0);
		keyCode = getJavaKeyCode(jskeyCode, jskey);
		boolean noKey = checkNoKey(keyCode, jskey);
		if (noKey) {
			ignore = (id == KEY_TYPED);
		    keyChar = (ignore ? (char) keyCode : CHAR_UNDEFINED);
		} else {
			keyChar = getKeyChar(keyCode, jskey);
		}
		if (id == KEY_TYPED)
			keyCode = 0;
	}

	private static int getJavaKeyCode(int jskeyCode, String jskey) {
		
		// see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
			
		if (jskeyCode <= 40) {
			// 0-40 is same
			return jskeyCode;
		}
		if (jskey.length() == 1) {
			// same if 1-character, except numeric keypad 0-9
			return (jskeyCode >= 96 && jskeyCode <= 105 ? jskeyCode :  0 + jskey.toUpperCase().charAt(0));
		}
		switch (jskeyCode) {
		
		case 91: // META
			return 157; 
		case 93: // CONTEXT_MENU
			return 525;
		case 144: // NUM_LOCK
		case 145: // SCROLL_LOCK
			return jskeyCode;
		case 244: // Kanji
			return 25;
		}
		
		String keyName = "VK_" + jskey.toUpperCase();
		try {
			// get the Java code from AWTKeyStroke by name, if possible
			return AWTKeyStroke.getVKValue(keyName);
		} catch (Exception e) {
			// or add this jskeycode to the Java list and note that on System.out
			System.out.println("JSKeyEvent adding key/keyCode " + keyName + " " + jskeyCode);
			AWTKeyStroke.addKeyCode(keyName, jskeyCode);
		}
		return jskeyCode;
	}

	private static char getKeyChar(int jskeyCode, String jskey) {
		if (jskey.length() == 1)
			return jskey.charAt(0);
		switch (jskeyCode) {
		case VK_ENTER:
			return '\n';
		case VK_BACK_SPACE:
			return '\b';
		case VK_TAB:
			return '\t';
		case VK_DELETE:
			return (char) 127;
		case VK_ESCAPE:
			return (char) 27;
		default:
			return '\uFFFF';
		}
	}

	private static boolean checkNoKey(int keyCode, String jskey) {
		switch (keyCode) {
		case VK_ENTER:
		case VK_TAB:
		case VK_BACK_SPACE:
		case VK_DELETE:
		case VK_ESCAPE:
		case VK_CANCEL: // untested
		case VK_CLEAR:  // untested
			return false;
		}
		// otherwise only single-char jskeys have characters in Java
		return (jskey.length() > 1);
	}

	private static int getModifiers(boolean shift, boolean ctrl, boolean alt, boolean meta, boolean altGraph) {
		 int modifiers = 0; 
		if (shift)
			modifiers |= InputEvent.SHIFT_MASK + InputEvent.SHIFT_DOWN_MASK;
		if (ctrl)
			modifiers |= InputEvent.CTRL_MASK + InputEvent.CTRL_DOWN_MASK;
		if (alt)
			modifiers |= InputEvent.ALT_MASK + InputEvent.ALT_DOWN_MASK;
		if (meta)
			modifiers |= InputEvent.META_MASK + InputEvent.META_DOWN_MASK;
		if (altGraph)
			modifiers |= InputEvent.ALT_GRAPH_MASK + InputEvent.ALT_GRAPH_DOWN_MASK;

		
		// TODO Auto-generated method stub
		return 0;
	}

	public JSKeyEvent(JComponent jc, int eventType, long currentTimeMillis, int modifiers, int keyCode, char keyChar,
			Object jQueryEvent) {
		
//		switch (eventType) {
//		case KeyEvent.KEY_PRESSED:
//			// note that events are bundled here into one eventType
//			int keyCode = 0;
//			int modifiers = JSUtil.J2S._getKeyModifiers(jQueryEvent);
//			char keyChar = '\0';
//			String type = null;
//			/**
//			 * @j2sNative
//			 * 
//			 * keyCode = jQueryEvent.keyCode;
//			 * keyChar = jQueryEvent.key;
//			 * type = jQueryEvent.type;
//			 * 
//			 */
//			switch (type) {
//			case "keydown":
//				eventType = KeyEvent.KEY_PRESSED;
//				break;
//			case "keypress":
//				// igonred by Java for 
//				
//				
////				Control keys
////			    VK_ENTER, VK_BACKSPACE, VK_TAB, VK_ESCAPE 
////			Function keys
////			    VK_F1, VK_F2, VK_F3, VK_F4 VK_F5, VK_F6, VK_F7, VK_F8, VK_F9, VK_F10, VK_F11, VK_F12,
////			    VK_SCROLL_LOCK, VK_PRINTSCREEN, VK_PAUSE,
////			    VK_DELETE, VK_INSERT,
////			    VK_PAGE_UP, VK_PAGE_DOWN, VK_HOME, VK_END 
////			Java: pressed/released only, with keyChar 0xFFFF
////			   DEL: adds 0 127 typed
////			   INS: code is 155
////			JavaScript: down/pressed/up; but only up for printScreen
////			   PRINTSCREEN code is 44
////			   INS: code is 45
////			   DEL: code is 46
////
////			Arrow keys
////			    VK_LEFT, VK_RIGHT, VK_UP, VK_DOWN 
////			Java: pressed/released   38/0xFFFF
////				
////				
//				
//				// TODO: generate this for BACKSPACE and what other keys?
//				eventType = KeyEvent.KEY_TYPED;
//				keyChar = (char) keyCode;
//				keyCode = KeyEvent.VK_UNDEFINED;
//				break;
//			case "keyup":
//				eventType = KeyEvent.KEY_RELEASED;
//				break;				
//			}

		
		super(jc, eventType, currentTimeMillis, modifiers, keyCode, keyChar);
		jqEvent = jQueryEvent;
		// TODO Auto-generated constructor stub
	}

	public boolean doIgnore() {
		// some TYPE events are ignored
		return ignore;
	}

}
