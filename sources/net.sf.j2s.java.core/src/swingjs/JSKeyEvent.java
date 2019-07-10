package swingjs;

import java.awt.AWTKeyStroke;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

import javax.swing.JComponent;
import javax.swing.text.JTextComponent;

import swingjs.plaf.JSComponentUI;

/**
 * Handle the conversion between JavaScript and Java key events.
 *
 * used by plaf/JSListUI and plaf/JSTextUI; should be implemented for all
 * components?
 * 
 * @author Bob Hanson
 * @author Trai Nguyen
 *
 */
@SuppressWarnings({"serial", "unused"})
public class JSKeyEvent extends KeyEvent {

	public static final int KEY_UNKNOWN = 403;

	/**
	 * From j2sApplet vis JSMouse
	 * @param c 
	 * 
	 * @param id
	 * @param modifiers
	 * @param jqevent
	 * @param time
	 * @return
	 */
	public static boolean dispatchKeyEvent(JComponent c, int id, int modifiers, Object jqevent, long time) {
		if (id == KeyEvent.KEY_TYPED) {
			// HTML5 keypress is no longer reliable
			JSToolkit.consumeEvent(jqevent);
			return false;
		}
		if (c != null) {
			JSComponentUI ui = c.秘getUI();
			KeyEvent e = newJSKeyEvent(c, jqevent, 0, false);
			// create our own KEY_PRESSED event
			c.dispatchEvent(e);
			if (!ui.j2sDoPropagate)
				JSToolkit.consumeEvent(e);
			if (!e.isConsumed() && id == KeyEvent.KEY_PRESSED && e.getKeyChar() != KeyEvent.CHAR_UNDEFINED) {
				e = newJSKeyEvent(c, jqevent, KeyEvent.KEY_TYPED, false);
				
				// yield to keyboard focus manager
				c.dispatchEvent(e);

				if (!ui.j2sDoPropagate)
					JSToolkit.consumeEvent(e);
			}
		}
		return true;
	}

	/**
	 * Create a value-added KeyEvent that can trace back to the original system event.
	 * 
	 * @param source
	 * @param jqevent
	 * @param id
	 * @param isList
	 * @return
	 */
	public static JSKeyEvent newJSKeyEvent(JComponent source, Object jqevent, int id, boolean isList) {

		// JavaScript: keydown      keypress    keyup
		// Java:       KEY_PRESSED  KEY_TYPED*  KEY_RELEASED
		// Java        code/char     0/char       code/char
		//
		// *KEY_TYPED only when keyChar not CHAR_UNDEFINED (0xFFFF)

		String evType = null, jskey = null;
		int jskeyCode = 0, jskeyLocation = 0;
		Object ev = jqevent;
		/**
		 * @j2sNative
		 * 
		 * 			evType = ev.type; jskey = ev.key; 
		 * 			jskeyCode = ev.keyCode || ev.which;
		 *          jskeyLocation = ev.originalEvent.location || 0; 
		 * 			if (isList && evType == "keypress")
		 *            ev.originalEvent.preventDefault();
		 */

		if (id == 0)
			id = JSMouse.fixEventType(jqevent, 0);
		if (id == 0)
			return null;
		int keyCode = getJavaKeyCode(jskeyCode, jskey);
		char keyChar = getJavaKeyChar(keyCode, jskey);
		return (keyChar == CHAR_UNDEFINED && id == KEY_TYPED ? null
				: new JSKeyEvent(source, jqevent, id, 
						(id == KEY_TYPED ? VK_UNDEFINED : keyCode),
						keyChar,
						(id == KEY_TYPED ? KEY_LOCATION_UNKNOWN : jskeyLocation + 1))
				);
	}
	
	private JSKeyEvent(JComponent source, Object ev, int id, int keyCode, char keyChar, int location) {
		super(source, id, System.currentTimeMillis(), 0, keyCode, keyChar, location);
		byte[] bdata = new byte[0];
		/**
		 * @j2sNative
		 * 
		 *            
		 * bdata.jqevent = ev;
		 * 
		 */
		setBData(bdata);
		modifiers = JSMouse.getModifiers(ev);
	}

	private static int getJavaKeyCode(int jskeyCode, String jskey) {
		// see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
		if (jskeyCode <= 40) {
			// enter is special
			if (jskeyCode == 13)
				return VK_ENTER;
			// other 0-40 is same
			return jskeyCode;
		}
		if (jskey.length() == 1) {
			// same if 1-character, except numeric keypad 0-9
			return (jskeyCode >= 96 && jskeyCode <= 105 ? jskeyCode :  0 + jskey.toUpperCase().charAt(0));
		}
		switch (jskeyCode) {
		case 91: // META
			return VK_META; 
		case 93: // CONTEXT_MENU
			return VK_CONTEXT_MENU;
		case 144: // NUM_LOCK
		case 145: // SCROLL_LOCK
			return jskeyCode;
		case 244: // Kanji
			return VK_KANJI;
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

	private static char getJavaKeyChar(int jsKeyCode, String jskey) {
		if (jskey.length() == 1)
			return jskey.charAt(0);
		// valid Java characters that are named in JavaScript
		switch (jsKeyCode) {
		case 13:
			jsKeyCode = VK_ENTER;
			// fall through
		case VK_ENTER:
		case VK_BACK_SPACE:
		case VK_TAB:
		case VK_DELETE:
		case VK_ESCAPE:
			return (char) jsKeyCode;
		default:
			return KeyEvent.CHAR_UNDEFINED; //'\uFFFF';
		}
	}

	private static boolean hasKeyChar(int javaKeyCode, String jskey) {
		switch (javaKeyCode) {
		case VK_ENTER:
		case VK_BACK_SPACE:
		case VK_TAB:
		case VK_DELETE:
		case VK_ESCAPE:
			return true;
		default:
			// otherwise only single-char jskeys have characters in Java
			return (jskey.length() == 1);
		}
		
	}

}
