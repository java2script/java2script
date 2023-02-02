/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 2000, 2011, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify itp
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */
package java.awt;

import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import sun.awt.AppContext;

/**
 * An <code>AWTKeyStroke</code> represents a key action on the keyboard, or
 * equivalent input device. <code>AWTKeyStroke</code>s can correspond to only a
 * press or release of a particular key, just as <code>KEY_PRESSED</code> and
 * <code>KEY_RELEASED</code> <code>KeyEvent</code>s do; alternately, they can
 * correspond to typing a specific Java character, just as
 * <code>KEY_TYPED</code> <code>KeyEvent</code>s do. In all cases,
 * <code>AWTKeyStroke</code>s can specify modifiers (alt, shift, control, meta,
 * altGraph, or a combination thereof) which must be present during the action
 * for an exact match.
 * <p>
 * <code>AWTKeyStrokes</code> are immutable, and are intended to be unique.
 * Client code should never create an <code>AWTKeyStroke</code> on its own, but
 * should instead use a variant of <code>getAWTKeyStroke</code>. Client use of
 * these factory methods allows the <code>AWTKeyStroke</code> implementation to
 * cache and share instances efficiently.
 * 
 * @see #getAWTKeyStroke
 * 
 * @author Arnaud Weber
 * @author David Mendenhall
 * @since 1.4
 */
@SuppressWarnings({"rawtypes", "unchecked"})
public class AWTKeyStroke {

	private static Map modifierKeywords;
	/**
	 * Associates VK_XXX (as a String) with code (as Integer). This is done to
	 * avoid the overhead of the reflective call to find the constant.
	 */
	private static VKCollection vks;

	// A key for the collection of AWTKeyStrokes within AppContext.
	private static String APP_CONTEXT_CACHE_KEY = "AWTKeyStroke_CACHE_KEY";//new Object();
	// A key within the cache
	private static String APP_CONTEXT_KEYSTROKE_KEY = "AWTKeyStroke_KEYSTROKE_KEY";//new AWTKeyStroke();

	/*
	 * Reads keystroke class from AppContext and if null, puts there the
	 * AWTKeyStroke class. Must be called under locked AWTKeyStroke.class
	 */
	private static Class getAWTKeyStrokeClass() {
		Class clazz = (Class) AppContext.getAppContext().get(AWTKeyStroke.class);
		if (clazz == null) {
			clazz = AWTKeyStroke.class;
			AppContext.getAppContext().put(AWTKeyStroke.class, AWTKeyStroke.class);
		}
		return clazz;
	}

	private char keyChar = KeyEvent.CHAR_UNDEFINED;
	private int keyCode = KeyEvent.VK_UNDEFINED;
	private int modifiers;
	private boolean onKeyRelease;

	/**
	 * Constructs an <code>AWTKeyStroke</code> with default values. The default
	 * values used are:
	 * <table border="1" summary="AWTKeyStroke default values">
	 * <tr>
	 * <th>Property</th>
	 * <th>Default Value</th>
	 * </tr>
	 * <tr>
	 * <td>Key Char</td>
	 * <td><code>KeyEvent.CHAR_UNDEFINED</code></td>
	 * </tr>
	 * <tr>
	 * <td>Key Code</td>
	 * <td><code>KeyEvent.VK_UNDEFINED</code></td>
	 * </tr>
	 * <tr>
	 * <td>Modifiers</td>
	 * <td>none</td>
	 * </tr>
	 * <tr>
	 * <td>On key release?</td>
	 * <td><code>false</code></td>
	 * </tr>
	 * </table>
	 * 
	 * <code>AWTKeyStroke</code>s should not be constructed by client code. Use a
	 * variant of <code>getAWTKeyStroke</code> instead.
	 * 
	 * @see #getAWTKeyStroke
	 */
	protected AWTKeyStroke() {
	}

	/**
	 * Constructs an <code>AWTKeyStroke</code> with the specified values.
	 * <code>AWTKeyStroke</code>s should not be constructed by client code. Use a
	 * variant of <code>getAWTKeyStroke</code> instead.
	 * 
	 * @param keyChar
	 *          the character value for a keyboard key
	 * @param keyCode
	 *          the key code for this <code>AWTKeyStroke</code>
	 * @param modifiers
	 *          a bitwise-ored combination of any modifiers
	 * @param onKeyRelease
	 *          <code>true</code> if this <code>AWTKeyStroke</code> corresponds to
	 *          a key release; <code>false</code> otherwise
	 * @see #getAWTKeyStroke
	 */
	protected AWTKeyStroke(char keyChar, int keyCode, int modifiers,
			boolean onKeyRelease) {
		this.keyChar = keyChar;
		this.keyCode = keyCode;
		this.modifiers = modifiers;
		this.onKeyRelease = onKeyRelease;
	}

	/**
	 * Registers a new class which the factory methods in
	 * <code>AWTKeyStroke</code> will use when generating new instances of
	 * <code>AWTKeyStroke</code>s. After invoking this method, the factory methods
	 * will return instances of the specified Class. The specified Class must be
	 * either <code>AWTKeyStroke</code> or derived from <code>AWTKeyStroke</code>,
	 * and it must have a no-arg constructor. The constructor can be of any
	 * accessibility, including <code>private</code>. This operation flushes the
	 * current <code>AWTKeyStroke</code> cache.
	 * 
	 * @param subclass
	 *          the new Class of which the factory methods should create instances
	 * @throws IllegalArgumentException
	 *           if subclass is <code>null</code>, or if subclass does not have a
	 *           no-arg constructor
	 * @throws ClassCastException
	 *           if subclass is not <code>AWTKeyStroke</code>, or a class derived
	 *           from <code>AWTKeyStroke</code>
	 */
	protected static void registerSubclass(Class<?> subclass) {
		if (subclass == null) {
			throw new IllegalArgumentException("subclass cannot be null");
		}
		synchronized (AWTKeyStroke.class) {
			Class keyStrokeClass = (Class) AppContext.getAppContext().get(
					AWTKeyStroke.class);
			if (keyStrokeClass != null && keyStrokeClass.equals(subclass)) {
				// Already registered
				return;
			}
		}
		if (!AWTKeyStroke.class.isAssignableFrom(subclass)) {
			throw new ClassCastException("subclass is not derived from AWTKeyStroke");
		}

//		Constructor ctor = getCtor(subclass);
//
//
//		if (ctor == null) {
//			throw new IllegalArgumentException(couldNotInstantiate);
//		}
		AWTKeyStroke stroke = null;
		try {
			stroke = (AWTKeyStroke) subclass.newInstance();
		} catch (Throwable t) {
		}
		if (stroke == null)
			throw new IllegalArgumentException("AWTKeystroke subclass could not be instantiated");

		synchronized (AWTKeyStroke.class) {
			AppContext.getAppContext().put(AWTKeyStroke.class, subclass);
			AppContext.getAppContext().remove(APP_CONTEXT_CACHE_KEY);
			AppContext.getAppContext().remove(APP_CONTEXT_KEYSTROKE_KEY);
		}
	}

//	/*
//	 * returns noarg Constructor for class with accessible flag. No security
//	 * threat as accessible flag is set only for this Constructor object, not for
//	 * Class constructor.
//	 */
//	private static Constructor getCtor(final Class clazz) {
//		try {
//			return clazz.getDeclaredConstructor((Class[]) null);
//		} catch (Throwable e) {
//			e.printStackTrace();
//		}
//		return null;
//	}

	private static synchronized AWTKeyStroke getCachedStroke
        (char keyChar, int keyCode, int modifiers, boolean onKeyRelease)
    {
        Map cache = (Map)AppContext.getAppContext().get(APP_CONTEXT_CACHE_KEY);
        AWTKeyStroke cacheKey = (AWTKeyStroke)AppContext.getAppContext().get(APP_CONTEXT_KEYSTROKE_KEY);

        if (cache == null) {
            cache = new HashMap();
            AppContext.getAppContext().put(APP_CONTEXT_CACHE_KEY, cache);
        }

        if (cacheKey == null) {
            try {
                cacheKey = (AWTKeyStroke) getAWTKeyStrokeClass().newInstance();
            } catch (Throwable t) {
            }
        }
        cacheKey.keyChar = keyChar;
        cacheKey.keyCode = keyCode;
        cacheKey.modifiers = mapNewModifiers(mapOldModifiers(modifiers));
        cacheKey.onKeyRelease = onKeyRelease;

        AWTKeyStroke stroke = (AWTKeyStroke)cache.get(cacheKey.秘toString());
        if (stroke == null) {
            stroke = cacheKey;
            cache.put(stroke.秘toString(), stroke);
            AppContext.getAppContext().remove(APP_CONTEXT_KEYSTROKE_KEY);
        }
        return stroke;
//    	return null;
    }

	/**
	 * Returns a shared instance of an <code>AWTKeyStroke</code> that represents a
	 * <code>KEY_TYPED</code> event for the specified character.
	 * 
	 * @param keyChar
	 *          the character value for a keyboard key
	 * @return an <code>AWTKeyStroke</code> object for that key
	 */
	public static AWTKeyStroke getAWTKeyStroke(char keyChar) {
		return getCachedStroke(keyChar, KeyEvent.VK_UNDEFINED, 0, false);
	}

	/**
	 * Returns a shared instance of an {@code AWTKeyStroke} that represents a
	 * {@code KEY_TYPED} event for the specified Character object and a set of
	 * modifiers. Note that the first parameter is of type Character rather than
	 * char. This is to avoid inadvertent clashes with calls to
	 * <code>getAWTKeyStroke(int keyCode, int modifiers)</code>.
	 * 
	 * The modifiers consist of any combination of following:
	 * <ul>
	 * <li>java.awt.event.InputEvent.SHIFT_DOWN_MASK
	 * <li>java.awt.event.InputEvent.CTRL_DOWN_MASK
	 * <li>java.awt.event.InputEvent.META_DOWN_MASK
	 * <li>java.awt.event.InputEvent.ALT_DOWN_MASK
	 * <li>java.awt.event.InputEvent.ALT_GRAPH_DOWN_MASK
	 * </ul>
	 * The old modifiers listed below also can be used, but they are mapped to
	 * _DOWN_ modifiers.
	 * <ul>
	 * <li>java.awt.event.InputEvent.SHIFT_MASK
	 * <li>java.awt.event.InputEvent.CTRL_MASK
	 * <li>java.awt.event.InputEvent.META_MASK
	 * <li>java.awt.event.InputEvent.ALT_MASK
	 * <li>java.awt.event.InputEvent.ALT_GRAPH_MASK
	 * </ul>
	 * also can be used, but they are mapped to _DOWN_ modifiers.
	 * 
	 * Since these numbers are all different powers of two, any combination of
	 * them is an integer in which each bit represents a different modifier key.
	 * Use 0 to specify no modifiers.
	 * 
	 * @param keyChar
	 *          the Character object for a keyboard character
	 * @param modifiers
	 *          a bitwise-ored combination of any modifiers
	 * @return an <code>AWTKeyStroke</code> object for that key
	 * @throws IllegalArgumentException
	 *           if <code>keyChar</code> is <code>null</code>
	 * 
	 * @see java.awt.event.InputEvent
	 */
	public static AWTKeyStroke getAWTKeyStroke(Character keyChar, int modifiers) {
		if (keyChar == null) {
			throw new IllegalArgumentException("keyChar cannot be null");
		}
		return getCachedStroke(keyChar.charValue(), KeyEvent.VK_UNDEFINED,
				modifiers, false);
	}

	/**
	 * Returns a shared instance of an <code>AWTKeyStroke</code>, given a numeric
	 * key code and a set of modifiers, specifying whether the key is activated
	 * when it is pressed or released.
	 * <p>
	 * The "virtual key" constants defined in <code>java.awt.event.KeyEvent</code>
	 * can be used to specify the key code. For example:
	 * <ul>
	 * <li><code>java.awt.event.KeyEvent.VK_ENTER</code>
	 * <li><code>java.awt.event.KeyEvent.VK_TAB</code>
	 * <li><code>java.awt.event.KeyEvent.VK_SPACE</code>
	 * </ul>
	 * The modifiers consist of any combination of:
	 * <ul>
	 * <li>java.awt.event.InputEvent.SHIFT_DOWN_MASK
	 * <li>java.awt.event.InputEvent.CTRL_DOWN_MASK
	 * <li>java.awt.event.InputEvent.META_DOWN_MASK
	 * <li>java.awt.event.InputEvent.ALT_DOWN_MASK
	 * <li>java.awt.event.InputEvent.ALT_GRAPH_DOWN_MASK
	 * </ul>
	 * The old modifiers
	 * <ul>
	 * <li>java.awt.event.InputEvent.SHIFT_MASK
	 * <li>java.awt.event.InputEvent.CTRL_MASK
	 * <li>java.awt.event.InputEvent.META_MASK
	 * <li>java.awt.event.InputEvent.ALT_MASK
	 * <li>java.awt.event.InputEvent.ALT_GRAPH_MASK
	 * </ul>
	 * also can be used, but they are mapped to _DOWN_ modifiers.
	 * 
	 * Since these numbers are all different powers of two, any combination of
	 * them is an integer in which each bit represents a different modifier key.
	 * Use 0 to specify no modifiers.
	 * 
	 * @param keyCode
	 *          an int specifying the numeric code for a keyboard key
	 * @param modifiers
	 *          a bitwise-ored combination of any modifiers
	 * @param onKeyRelease
	 *          <code>true</code> if the <code>AWTKeyStroke</code> should
	 *          represent a key release; <code>false</code> otherwise
	 * @return an AWTKeyStroke object for that key
	 * 
	 * @see java.awt.event.KeyEvent
	 * @see java.awt.event.InputEvent
	 */
	public static AWTKeyStroke getAWTKeyStroke(int keyCode, int modifiers,
			boolean onKeyRelease) {
		return getCachedStroke(KeyEvent.CHAR_UNDEFINED, keyCode, modifiers,
				onKeyRelease);
	}

	/**
	 * Returns a shared instance of an <code>AWTKeyStroke</code>, given a numeric
	 * key code and a set of modifiers. The returned <code>AWTKeyStroke</code>
	 * will correspond to a key press.
	 * <p>
	 * The "virtual key" constants defined in <code>java.awt.event.KeyEvent</code>
	 * can be used to specify the key code. For example:
	 * <ul>
	 * <li><code>java.awt.event.KeyEvent.VK_ENTER</code>
	 * <li><code>java.awt.event.KeyEvent.VK_TAB</code>
	 * <li><code>java.awt.event.KeyEvent.VK_SPACE</code>
	 * </ul>
	 * The modifiers consist of any combination of:
	 * <ul>
	 * <li>java.awt.event.InputEvent.SHIFT_DOWN_MASK
	 * <li>java.awt.event.InputEvent.CTRL_DOWN_MASK
	 * <li>java.awt.event.InputEvent.META_DOWN_MASK
	 * <li>java.awt.event.InputEvent.ALT_DOWN_MASK
	 * <li>java.awt.event.InputEvent.ALT_GRAPH_DOWN_MASK
	 * </ul>
	 * The old modifiers
	 * <ul>
	 * <li>java.awt.event.InputEvent.SHIFT_MASK
	 * <li>java.awt.event.InputEvent.CTRL_MASK
	 * <li>java.awt.event.InputEvent.META_MASK
	 * <li>java.awt.event.InputEvent.ALT_MASK
	 * <li>java.awt.event.InputEvent.ALT_GRAPH_MASK
	 * </ul>
	 * also can be used, but they are mapped to _DOWN_ modifiers.
	 * 
	 * Since these numbers are all different powers of two, any combination of
	 * them is an integer in which each bit represents a different modifier key.
	 * Use 0 to specify no modifiers.
	 * 
	 * @param keyCode
	 *          an int specifying the numeric code for a keyboard key
	 * @param modifiers
	 *          a bitwise-ored combination of any modifiers
	 * @return an <code>AWTKeyStroke</code> object for that key
	 * 
	 * @see java.awt.event.KeyEvent
	 * @see java.awt.event.InputEvent
	 */
	public static AWTKeyStroke getAWTKeyStroke(int keyCode, int modifiers) {
		return getCachedStroke(KeyEvent.CHAR_UNDEFINED, keyCode, modifiers, false);
	}

	/**
	 * Returns an <code>AWTKeyStroke</code> which represents the stroke which
	 * generated a given <code>KeyEvent</code>.
	 * <p>
	 * This method obtains the keyChar from a <code>KeyTyped</code> event, and the
	 * keyCode from a <code>KeyPressed</code> or <code>KeyReleased</code> event.
	 * The <code>KeyEvent</code> modifiers are obtained for all three types of
	 * <code>KeyEvent</code>.
	 * 
	 * @param anEvent
	 *          the <code>KeyEvent</code> from which to obtain the
	 *          <code>AWTKeyStroke</code>
	 * @throws NullPointerException
	 *           if <code>anEvent</code> is null
	 * @return the <code>AWTKeyStroke</code> that precipitated the event
	 */
	public static AWTKeyStroke getAWTKeyStrokeForEvent(KeyEvent anEvent) {
		int id = anEvent.getID();
		switch (id) {
		case KeyEvent.KEY_PRESSED:
		case KeyEvent.KEY_RELEASED:
			return getCachedStroke(KeyEvent.CHAR_UNDEFINED, anEvent.getKeyCode(),
					anEvent.getModifiers(), (id == KeyEvent.KEY_RELEASED));
		case KeyEvent.KEY_TYPED:
			return getCachedStroke(anEvent.getKeyChar(), KeyEvent.VK_UNDEFINED,
					anEvent.getModifiers(), false);
		default:
			// Invalid ID for this KeyEvent
			return null;
		}
	}

	/**
	 * Parses a string and returns an <code>AWTKeyStroke</code>. The string must
	 * have the following syntax:
	 * 
	 * <pre>
	 *    &lt;modifiers&gt;* (&lt;typedID&gt; | &lt;pressedReleasedID&gt;)
	 * 
	 *    modifiers := shift | control | ctrl | meta | alt | altGraph
	 *    typedID := typed &lt;typedKey&gt;
	 *    typedKey := string of length 1 giving Unicode character.
	 *    pressedReleasedID := (pressed | released) key
	 *    key := KeyEvent key code name, i.e. the name following "VK_".
	 * </pre>
	 * 
	 * If typed, pressed or released is not specified, pressed is assumed. Here
	 * are some examples:
	 * 
	 * <pre>
	 *     "INSERT" => getAWTKeyStroke(KeyEvent.VK_INSERT, 0);
	 *     "control DELETE" => getAWTKeyStroke(KeyEvent.VK_DELETE, InputEvent.CTRL_MASK);
	 *     "alt shift X" => getAWTKeyStroke(KeyEvent.VK_X, InputEvent.ALT_MASK | InputEvent.SHIFT_MASK);
	 *     "alt shift released X" => getAWTKeyStroke(KeyEvent.VK_X, InputEvent.ALT_MASK | InputEvent.SHIFT_MASK, true);
	 *     "typed a" => getAWTKeyStroke('a');
	 * </pre>
	 * 
	 * @param s
	 *          a String formatted as described above
	 * @return an <code>AWTKeyStroke</code> object for that String
	 * @throws IllegalArgumentException
	 *           if <code>s</code> is <code>null</code>, or is formatted
	 *           incorrectly
	 */
	public static AWTKeyStroke getAWTKeyStroke(String s) {
		if (s == null) {
			throw new IllegalArgumentException("String cannot be null");
		}

		final String errmsg = "String formatted incorrectly";

		StringTokenizer st = new StringTokenizer(s, " ");

		int mask = 0;
		boolean released = false;
		boolean typed = false;
		boolean pressed = false;

		synchronized (AWTKeyStroke.class) {
			if (modifierKeywords == null) {
				Map uninitializedMap = new HashMap(8, 1.0f);
				uninitializedMap
						.put(
								"shift",
								Integer.valueOf(InputEvent.SHIFT_DOWN_MASK
										| InputEvent.SHIFT_MASK));
				uninitializedMap.put("control",
						Integer.valueOf(InputEvent.CTRL_DOWN_MASK | InputEvent.CTRL_MASK));
				uninitializedMap.put("ctrl",
						Integer.valueOf(InputEvent.CTRL_DOWN_MASK | InputEvent.CTRL_MASK));
				uninitializedMap.put("meta",
						Integer.valueOf(InputEvent.META_DOWN_MASK | InputEvent.META_MASK));
				uninitializedMap.put("alt",
						Integer.valueOf(InputEvent.ALT_DOWN_MASK | InputEvent.ALT_MASK));
				uninitializedMap.put(
						"altGraph",
						Integer.valueOf(InputEvent.ALT_GRAPH_DOWN_MASK
								| InputEvent.ALT_GRAPH_MASK));
				uninitializedMap.put("button1",
						Integer.valueOf(InputEvent.BUTTON1_DOWN_MASK));
				uninitializedMap.put("button2",
						Integer.valueOf(InputEvent.BUTTON2_DOWN_MASK));
				uninitializedMap.put("button3",
						Integer.valueOf(InputEvent.BUTTON3_DOWN_MASK));
				modifierKeywords = Collections.synchronizedMap(uninitializedMap);
			}
		}

		int count = st.countTokens();

		for (int i = 1; i <= count; i++) {
			String token = st.nextToken();

			if (typed) {
				if (token.length() != 1 || i != count) {
					throw new IllegalArgumentException(errmsg);
				}
				return getCachedStroke(token.charAt(0), KeyEvent.VK_UNDEFINED, mask,
						false);
			}

			if (pressed || released || i == count) {
				if (i != count) {
					throw new IllegalArgumentException(errmsg);
				}

				String keyCodeName = "VK_" + token;
				int keyCode = getVKValue(keyCodeName);

				return getCachedStroke(KeyEvent.CHAR_UNDEFINED, keyCode, mask, released);
			}

			if (token.equals("released")) {
				released = true;
				continue;
			}
			if (token.equals("pressed")) {
				pressed = true;
				continue;
			}
			if (token.equals("typed")) {
				typed = true;
				continue;
			}

			Integer tokenMask = (Integer) modifierKeywords.get(token);
			if (tokenMask != null) {
				mask |= tokenMask.intValue();
			} else {
				throw new IllegalArgumentException(errmsg);
			}
		}

		throw new IllegalArgumentException(errmsg);
	}

	private static VKCollection getVKCollection() {
		return (vks == null ? (vks = new VKCollection()) : vks);
	}

	public static void addKeyCode(String key, int keyCode) {
		getVKCollection().put(key,  Integer.valueOf(keyCode));
	}
	
	
	/**
	 * Returns the integer constant for the KeyEvent.VK field named
	 * <code>key</code>. This will throw an <code>IllegalArgumentException</code>
	 * if <code>key</code> is not a valid constant.
	 */
	public static int getVKValue(String key) {
		VKCollection vkCollect = getVKCollection();
		Integer value = vkCollect.findCode(key);
		if (value == null) {
			vkCollect.put(key, Integer.valueOf(-1));
			throw new IllegalArgumentException("String formatted incorrectly");
		}
		return value.intValue();
	}

	/**
	 * Returns the character for this <code>AWTKeyStroke</code>.
	 * 
	 * @return a char value
	 * @see #getAWTKeyStroke(char)
	 * @see KeyEvent#getKeyChar
	 */
	public final char getKeyChar() {
		return keyChar;
	}

	/**
	 * Returns the numeric key code for this <code>AWTKeyStroke</code>.
	 * 
	 * @return an int containing the key code value
	 * @see #getAWTKeyStroke(int,int)
	 * @see KeyEvent#getKeyCode
	 */
	public final int getKeyCode() {
		return keyCode;
	}

	/**
	 * Returns the modifier keys for this <code>AWTKeyStroke</code>.
	 * 
	 * @return an int containing the modifiers
	 * @see #getAWTKeyStroke(int,int)
	 */
	public final int getModifiers() {
		return modifiers;
	}

	/**
	 * Returns whether this <code>AWTKeyStroke</code> represents a key release.
	 * 
	 * @return <code>true</code> if this <code>AWTKeyStroke</code> represents a
	 *         key release; <code>false</code> otherwise
	 * @see #getAWTKeyStroke(int,int,boolean)
	 */
	public final boolean isOnKeyRelease() {
		return onKeyRelease;
	}

	/**
	 * Returns the type of <code>KeyEvent</code> which corresponds to this
	 * <code>AWTKeyStroke</code>.
	 * 
	 * @return <code>KeyEvent.KEY_PRESSED</code>, <code>KeyEvent.KEY_TYPED</code>,
	 *         or <code>KeyEvent.KEY_RELEASED</code>
	 * @see java.awt.event.KeyEvent
	 */
	public final int getKeyEventType() {
		if (keyCode == KeyEvent.VK_UNDEFINED) {
			return KeyEvent.KEY_TYPED;
		} else {
			return (onKeyRelease) ? KeyEvent.KEY_RELEASED : KeyEvent.KEY_PRESSED;
		}
	}

	/**
	 * Returns a numeric value for this object that is likely to be unique, making
	 * it a good choice as the index value in a hash table.
	 * 
	 * @return an int that represents this object
	 */
	@Override
	public int hashCode() {
		return (((int) keyChar) + 1) * (2 * (keyCode + 1)) * (modifiers + 1)
				+ (onKeyRelease ? 1 : 2);
	}

	/**
	 * Returns true if this object is identical to the specified object.
	 * 
	 * @param anObject
	 *          the Object to compare this object to
	 * @return true if the objects are identical
	 */
	@Override
	public final boolean equals(Object anObject) {
		if (anObject instanceof AWTKeyStroke) {
			AWTKeyStroke ks = (AWTKeyStroke) anObject;
			return (ks.keyChar == keyChar && ks.keyCode == keyCode
					&& ks.onKeyRelease == onKeyRelease && ks.modifiers == modifiers);
		}
		return false;
	}

	/**
	 * Returns a string that displays and identifies this object's properties. The
	 * <code>String</code> returned by this method can be passed as a parameter to
	 * <code>getAWTKeyStroke(String)</code> to produce a key stroke equal to this
	 * key stroke.
	 * 
	 * @return a String representation of this object
	 * @see #getAWTKeyStroke(String)
	 */
	@Override
	public String toString() {
		return (keyCode == KeyEvent.VK_UNDEFINED ? getModifiersText(modifiers) + "typed " + keyChar
				: getModifiersText(modifiers) + (onKeyRelease ? "released" : "pressed") + " " + getVKText(keyCode));
	}
	
	public String 秘toString() {
	        if (keyCode == KeyEvent.VK_UNDEFINED) {
	            return getModifiersText(modifiers) + "typed " + keyChar;
	        } else {
	            return getModifiersText(modifiers) +
	                (onKeyRelease ? "released" : "pressed") + " " + keyCode;
	        }
	}

	static private String getModifiersText(int modifiers) {
		StringBuilder buf = new StringBuilder();

		if ((modifiers & InputEvent.SHIFT_DOWN_MASK) != 0) {
			buf.append("shift ");
		}
		if ((modifiers & InputEvent.CTRL_DOWN_MASK) != 0) {
			buf.append("ctrl ");
		}
		if ((modifiers & InputEvent.META_DOWN_MASK) != 0) {
			buf.append("meta ");
		}
		if ((modifiers & InputEvent.ALT_DOWN_MASK) != 0) {
			buf.append("alt ");
		}
		if ((modifiers & InputEvent.ALT_GRAPH_DOWN_MASK) != 0) {
			buf.append("altGraph ");
		}
		if ((modifiers & InputEvent.BUTTON1_DOWN_MASK) != 0) {
			buf.append("button1 ");
		}
		if ((modifiers & InputEvent.BUTTON2_DOWN_MASK) != 0) {
			buf.append("button2 ");
		}
		if ((modifiers & InputEvent.BUTTON3_DOWN_MASK) != 0) {
			buf.append("button3 ");
		}

		return buf.toString();
	}

	static private String getVKText(int keyCode) {
		Integer key = Integer.valueOf(keyCode);
		String name = getVKCollection().findName(key);
		return (name == null ? "UNKNOWN" : name.substring(3));
	}

	/**
	 * Returns a cached instance of <code>AWTKeyStroke</code> (or a subclass of
	 * <code>AWTKeyStroke</code>) which is equal to this instance.
	 * 
	 * @return a cached instance which is equal to this instance
	 */
	protected Object readResolve() throws java.io.ObjectStreamException {
		synchronized (AWTKeyStroke.class) {
			Class newClass = getClass();
			Class awtKeyStrokeClass = getAWTKeyStrokeClass();
			if (!newClass.equals(awtKeyStrokeClass)) {
				registerSubclass(newClass);
			}
			return getCachedStroke(keyChar, keyCode, modifiers, onKeyRelease);
		}
	}

	 private static int mapOldModifiers(int modifiers) {
	 if ((modifiers & InputEvent.SHIFT_MASK) != 0) {
	 modifiers |= InputEvent.SHIFT_DOWN_MASK;
	 }
	 if ((modifiers & InputEvent.ALT_MASK) != 0) {
	 modifiers |= InputEvent.ALT_DOWN_MASK;
	 }
	 if ((modifiers & InputEvent.ALT_GRAPH_MASK) != 0) {
	 modifiers |= InputEvent.ALT_GRAPH_DOWN_MASK;
	 }
	 if ((modifiers & InputEvent.CTRL_MASK) != 0) {
	 modifiers |= InputEvent.CTRL_DOWN_MASK;
	 }
	 if ((modifiers & InputEvent.META_MASK) != 0) {
	 modifiers |= InputEvent.META_DOWN_MASK;
	 }
	
	 modifiers &= InputEvent.SHIFT_DOWN_MASK
	 | InputEvent.ALT_DOWN_MASK
	 | InputEvent.ALT_GRAPH_DOWN_MASK
	 | InputEvent.CTRL_DOWN_MASK
	 | InputEvent.META_DOWN_MASK
	 | InputEvent.BUTTON1_DOWN_MASK
	 | InputEvent.BUTTON2_DOWN_MASK
	 | InputEvent.BUTTON3_DOWN_MASK;
	
	 return modifiers;
	 }
	
	 private static int mapNewModifiers(int modifiers) {
	 if ((modifiers & InputEvent.SHIFT_DOWN_MASK) != 0) {
	 modifiers |= InputEvent.SHIFT_MASK;
	 }
	 if ((modifiers & InputEvent.ALT_DOWN_MASK) != 0) {
	 modifiers |= InputEvent.ALT_MASK;
	 }
	 if ((modifiers & InputEvent.ALT_GRAPH_DOWN_MASK) != 0) {
	 modifiers |= InputEvent.ALT_GRAPH_MASK;
	 }
	 if ((modifiers & InputEvent.CTRL_DOWN_MASK) != 0) {
	 modifiers |= InputEvent.CTRL_MASK;
	 }
	 if ((modifiers & InputEvent.META_DOWN_MASK) != 0) {
	 modifiers |= InputEvent.META_MASK;
	 }
	
	 return modifiers;
	 }

}

@SuppressWarnings({"rawtypes", "unchecked"})
class VKCollection {
	Map<String, String> code2name;
	Map<String, Integer> name2code;

	
	public VKCollection() {
		code2name = new HashMap<>();
		name2code = new HashMap<>();
		Object[][] list = new Object[0][];
		/**
		 * @j2sNative
		 * for (var k in C$)
		 *   if (("" + k).indexOf("VK_") == 0)
		 *   	list.push([k, C$[k]]);
		 */
		for (int i = 0; i < list.length; i++)
		{  
			put((String) list[i][0], Integer.valueOf(/** @j2sNative list[i][1] ||*/0));
		}	
		
	}

	public synchronized void put(String name, Integer code) {
		// assert((name != null) && (code != null));
		// assert(findName(code) == null);
		// assert(findCode(name) == null);
		code2name.put("" + code, name);
		name2code.put(name, code);
	}

	public synchronized Integer findCode(String name) {
		// assert(name != null);
		return (Integer) name2code.get(name);
	}

	public synchronized String findName(Integer code) {
		// assert(code != null);
		return (String) code2name.get("" + code);
	}
	
	
	
    /* Virtual key codes copied from KeyEvent but not "final" */

    static int VK_ENTER          = 0x0A; // '\n'
    static int VK_BACK_SPACE     = 0x08; // '\b'
    static int VK_TAB            = 0x09; // '\t'
    static int VK_CANCEL         = 0x03;
    static int VK_CLEAR          = 0x0C;
    static int VK_SHIFT          = 0x10;
    static int VK_CONTROL        = 0x11;
    static int VK_ALT            = 0x12;
    static int VK_PAUSE          = 0x13;
    static int VK_CAPS_LOCK      = 0x14;
    static int VK_ESCAPE         = 0x1B;
    static int VK_SPACE          = 0x20;
    static int VK_PAGE_UP        = 0x21;
    static int VK_PAGE_DOWN      = 0x22;
    static int VK_END            = 0x23;
    static int VK_HOME           = 0x24;

    /**
     * Constant for the non-numpad <b>left</b> arrow key.
     * @see #VK_KP_LEFT
     */
    static int VK_LEFT           = 0x25;

    /**
     * Constant for the non-numpad <b>up</b> arrow key.
     * @see #VK_KP_UP
     */
    static int VK_UP             = 0x26;

    /**
     * Constant for the non-numpad <b>right</b> arrow key.
     * @see #VK_KP_RIGHT
     */
    static int VK_RIGHT          = 0x27;

    /**
     * Constant for the non-numpad <b>down</b> arrow key.
     * @see #VK_KP_DOWN
     */
    static int VK_DOWN           = 0x28;

    /**
     * Constant for the comma key, ","
     */
    static int VK_COMMA          = 0x2C;

    /**
     * Constant for the minus key, "-"
     * @since 1.2
     */
    static int VK_MINUS          = 0x2D;

    /**
     * Constant for the period key, "."
     */
    static int VK_PERIOD         = 0x2E;

    /**
     * Constant for the forward slash key, "/"
     */
    static int VK_SLASH          = 0x2F;

    /** VK_0 thru VK_9 are the same as ASCII '0' thru '9' (0x30 - 0x39) */
    static int VK_0              = 0x30;
    static int VK_1              = 0x31;
    static int VK_2              = 0x32;
    static int VK_3              = 0x33;
    static int VK_4              = 0x34;
    static int VK_5              = 0x35;
    static int VK_6              = 0x36;
    static int VK_7              = 0x37;
    static int VK_8              = 0x38;
    static int VK_9              = 0x39;

    /**
     * Constant for the semicolon key, ";"
     */
    static int VK_SEMICOLON      = 0x3B;

    /**
     * Constant for the equals key, "="
     */
    static int VK_EQUALS         = 0x3D;

    /** VK_A thru VK_Z are the same as ASCII 'A' thru 'Z' (0x41 - 0x5A) */
    static int VK_A              = 0x41;
    static int VK_B              = 0x42;
    static int VK_C              = 0x43;
    static int VK_D              = 0x44;
    static int VK_E              = 0x45;
    static int VK_F              = 0x46;
    static int VK_G              = 0x47;
    static int VK_H              = 0x48;
    static int VK_I              = 0x49;
    static int VK_J              = 0x4A;
    static int VK_K              = 0x4B;
    static int VK_L              = 0x4C;
    static int VK_M              = 0x4D;
    static int VK_N              = 0x4E;
    static int VK_O              = 0x4F;
    static int VK_P              = 0x50;
    static int VK_Q              = 0x51;
    static int VK_R              = 0x52;
    static int VK_S              = 0x53;
    static int VK_T              = 0x54;
    static int VK_U              = 0x55;
    static int VK_V              = 0x56;
    static int VK_W              = 0x57;
    static int VK_X              = 0x58;
    static int VK_Y              = 0x59;
    static int VK_Z              = 0x5A;

    /**
     * Constant for the open bracket key, "["
     */
    static int VK_OPEN_BRACKET   = 0x5B;

    /**
     * Constant for the back slash key, "\"
     */
    static int VK_BACK_SLASH     = 0x5C;

    /**
     * Constant for the close bracket key, "]"
     */
    static int VK_CLOSE_BRACKET  = 0x5D;

    static int VK_NUMPAD0        = 0x60;
    static int VK_NUMPAD1        = 0x61;
    static int VK_NUMPAD2        = 0x62;
    static int VK_NUMPAD3        = 0x63;
    static int VK_NUMPAD4        = 0x64;
    static int VK_NUMPAD5        = 0x65;
    static int VK_NUMPAD6        = 0x66;
    static int VK_NUMPAD7        = 0x67;
    static int VK_NUMPAD8        = 0x68;
    static int VK_NUMPAD9        = 0x69;
    static int VK_MULTIPLY       = 0x6A;
    static int VK_ADD            = 0x6B;

    /**
     * This constant is obsolete, and is included only for backwards
     * compatibility.
     * @see #VK_SEPARATOR
     */
    static int VK_SEPARATER      = 0x6C;

    /**
     * Constant for the Numpad Separator key.
     * @since 1.4
     */
    static int VK_SEPARATOR      = VK_SEPARATER;

    static int VK_SUBTRACT       = 0x6D;
    static int VK_DECIMAL        = 0x6E;
    static int VK_DIVIDE         = 0x6F;
    static int VK_DELETE         = 0x7F; /* ASCII DEL */
    static int VK_NUM_LOCK       = 0x90;
    static int VK_SCROLL_LOCK    = 0x91;

    /** Constant for the F1 function key. */
    static int VK_F1             = 0x70;

    /** Constant for the F2 function key. */
    static int VK_F2             = 0x71;

    /** Constant for the F3 function key. */
    static int VK_F3             = 0x72;

    /** Constant for the F4 function key. */
    static int VK_F4             = 0x73;

    /** Constant for the F5 function key. */
    static int VK_F5             = 0x74;

    /** Constant for the F6 function key. */
    static int VK_F6             = 0x75;

    /** Constant for the F7 function key. */
    static int VK_F7             = 0x76;

    /** Constant for the F8 function key. */
    static int VK_F8             = 0x77;

    /** Constant for the F9 function key. */
    static int VK_F9             = 0x78;

    /** Constant for the F10 function key. */
    static int VK_F10            = 0x79;

    /** Constant for the F11 function key. */
    static int VK_F11            = 0x7A;

    /** Constant for the F12 function key. */
    static int VK_F12            = 0x7B;

    /**
     * Constant for the F13 function key.
     * @since 1.2
     */
    /* F13 - F24 are used on IBM 3270 keyboard; use random range for constants. */
    static int VK_F13            = 0xF000;

    /**
     * Constant for the F14 function key.
     * @since 1.2
     */
    static int VK_F14            = 0xF001;

    /**
     * Constant for the F15 function key.
     * @since 1.2
     */
    static int VK_F15            = 0xF002;

    /**
     * Constant for the F16 function key.
     * @since 1.2
     */
    static int VK_F16            = 0xF003;

    /**
     * Constant for the F17 function key.
     * @since 1.2
     */
    static int VK_F17            = 0xF004;

    /**
     * Constant for the F18 function key.
     * @since 1.2
     */
    static int VK_F18            = 0xF005;

    /**
     * Constant for the F19 function key.
     * @since 1.2
     */
    static int VK_F19            = 0xF006;

    /**
     * Constant for the F20 function key.
     * @since 1.2
     */
    static int VK_F20            = 0xF007;

    /**
     * Constant for the F21 function key.
     * @since 1.2
     */
    static int VK_F21            = 0xF008;

    /**
     * Constant for the F22 function key.
     * @since 1.2
     */
    static int VK_F22            = 0xF009;

    /**
     * Constant for the F23 function key.
     * @since 1.2
     */
    static int VK_F23            = 0xF00A;

    /**
     * Constant for the F24 function key.
     * @since 1.2
     */
    static int VK_F24            = 0xF00B;

    static int VK_PRINTSCREEN    = 0x9A;
    static int VK_INSERT         = 0x9B;
    static int VK_HELP           = 0x9C;
    static int VK_META           = 0x9D;

    static int VK_BACK_QUOTE     = 0xC0;
    static int VK_QUOTE          = 0xDE;

    /**
     * Constant for the numeric keypad <b>up</b> arrow key.
     * @see #VK_UP
     * @since 1.2
     */
    static int VK_KP_UP          = 0xE0;

    /**
     * Constant for the numeric keypad <b>down</b> arrow key.
     * @see #VK_DOWN
     * @since 1.2
     */
    static int VK_KP_DOWN        = 0xE1;

    /**
     * Constant for the numeric keypad <b>left</b> arrow key.
     * @see #VK_LEFT
     * @since 1.2
     */
    static int VK_KP_LEFT        = 0xE2;

    /**
     * Constant for the numeric keypad <b>right</b> arrow key.
     * @see #VK_RIGHT
     * @since 1.2
     */
    static int VK_KP_RIGHT       = 0xE3;

    /* For European keyboards */
    /** @since 1.2 */
    static int VK_DEAD_GRAVE               = 0x80;
    /** @since 1.2 */
    static int VK_DEAD_ACUTE               = 0x81;
    /** @since 1.2 */
    static int VK_DEAD_CIRCUMFLEX          = 0x82;
    /** @since 1.2 */
    static int VK_DEAD_TILDE               = 0x83;
    /** @since 1.2 */
    static int VK_DEAD_MACRON              = 0x84;
    /** @since 1.2 */
    static int VK_DEAD_BREVE               = 0x85;
    /** @since 1.2 */
    static int VK_DEAD_ABOVEDOT            = 0x86;
    /** @since 1.2 */
    static int VK_DEAD_DIAERESIS           = 0x87;
    /** @since 1.2 */
    static int VK_DEAD_ABOVERING           = 0x88;
    /** @since 1.2 */
    static int VK_DEAD_DOUBLEACUTE         = 0x89;
    /** @since 1.2 */
    static int VK_DEAD_CARON               = 0x8a;
    /** @since 1.2 */
    static int VK_DEAD_CEDILLA             = 0x8b;
    /** @since 1.2 */
    static int VK_DEAD_OGONEK              = 0x8c;
    /** @since 1.2 */
    static int VK_DEAD_IOTA                = 0x8d;
    /** @since 1.2 */
    static int VK_DEAD_VOICED_SOUND        = 0x8e;
    /** @since 1.2 */
    static int VK_DEAD_SEMIVOICED_SOUND    = 0x8f;

    /** @since 1.2 */
    static int VK_AMPERSAND                = 0x96;
    /** @since 1.2 */
    static int VK_ASTERISK                 = 0x97;
    /** @since 1.2 */
    static int VK_QUOTEDBL                 = 0x98;
    /** @since 1.2 */
    static int VK_LESS                     = 0x99;

    /** @since 1.2 */
    static int VK_GREATER                  = 0xa0;
    /** @since 1.2 */
    static int VK_BRACELEFT                = 0xa1;
    /** @since 1.2 */
    static int VK_BRACERIGHT               = 0xa2;

    /**
     * Constant for the "@" key.
     * @since 1.2
     */
    static int VK_AT                       = 0x0200;

    /**
     * Constant for the ":" key.
     * @since 1.2
     */
    static int VK_COLON                    = 0x0201;

    /**
     * Constant for the "^" key.
     * @since 1.2
     */
    static int VK_CIRCUMFLEX               = 0x0202;

    /**
     * Constant for the "$" key.
     * @since 1.2
     */
    static int VK_DOLLAR                   = 0x0203;

    /**
     * Constant for the Euro currency sign key.
     * @since 1.2
     */
    static int VK_EURO_SIGN                = 0x0204;

    /**
     * Constant for the "!" key.
     * @since 1.2
     */
    static int VK_EXCLAMATION_MARK         = 0x0205;

    /**
     * Constant for the inverted exclamation mark key.
     * @since 1.2
     */
    static int VK_INVERTED_EXCLAMATION_MARK = 0x0206;

    /**
     * Constant for the "(" key.
     * @since 1.2
     */
    static int VK_LEFT_PARENTHESIS         = 0x0207;

    /**
     * Constant for the "#" key.
     * @since 1.2
     */
    static int VK_NUMBER_SIGN              = 0x0208;

    /**
     * Constant for the "+" key.
     * @since 1.2
     */
    static int VK_PLUS                     = 0x0209;

    /**
     * Constant for the ")" key.
     * @since 1.2
     */
    static int VK_RIGHT_PARENTHESIS        = 0x020A;

    /**
     * Constant for the "_" key.
     * @since 1.2
     */
    static int VK_UNDERSCORE               = 0x020B;

    /**
     * Constant for the Microsoft Windows "Windows" key.
     * It is used for both the left and right version of the key.
     * @see #getKeyLocation()
     * @since 1.5
     */
    static int VK_WINDOWS                  = 0x020C;

    /**
     * Constant for the Microsoft Windows Context Menu key.
     * @since 1.5
     */
    static int VK_CONTEXT_MENU             = 0x020D;

    /* for input method support on Asian Keyboards */

    /* not clear what this means - listed in Microsoft Windows API */
    static int VK_FINAL                    = 0x0018;

    /** Constant for the Convert function key. */
    /* Japanese PC 106 keyboard, Japanese Solaris keyboard: henkan */
    static int VK_CONVERT                  = 0x001C;

    /** Constant for the Don't Convert function key. */
    /* Japanese PC 106 keyboard: muhenkan */
    static int VK_NONCONVERT               = 0x001D;

    /** Constant for the Accept or Commit function key. */
    /* Japanese Solaris keyboard: kakutei */
    static int VK_ACCEPT                   = 0x001E;

    /* not clear what this means - listed in Microsoft Windows API */
    static int VK_MODECHANGE               = 0x001F;

    /* replaced by VK_KANA_LOCK for Microsoft Windows and Solaris;
       might still be used on other platforms */
    static int VK_KANA                     = 0x0015;

    /* replaced by VK_INPUT_METHOD_ON_OFF for Microsoft Windows and Solaris;
       might still be used for other platforms */
    static int VK_KANJI                    = 0x0019;

    /**
     * Constant for the Alphanumeric function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard: eisuu */
    static int VK_ALPHANUMERIC             = 0x00F0;

    /**
     * Constant for the Katakana function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard: katakana */
    static int VK_KATAKANA                 = 0x00F1;

    /**
     * Constant for the Hiragana function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard: hiragana */
    static int VK_HIRAGANA                 = 0x00F2;

    /**
     * Constant for the Full-Width Characters function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard: zenkaku */
    static int VK_FULL_WIDTH               = 0x00F3;

    /**
     * Constant for the Half-Width Characters function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard: hankaku */
    static int VK_HALF_WIDTH               = 0x00F4;

    /**
     * Constant for the Roman Characters function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard: roumaji */
    static int VK_ROMAN_CHARACTERS         = 0x00F5;

    /**
     * Constant for the All Candidates function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard - VK_CONVERT + ALT: zenkouho */
    static int VK_ALL_CANDIDATES           = 0x0100;

    /**
     * Constant for the Previous Candidate function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard - VK_CONVERT + SHIFT: maekouho */
    static int VK_PREVIOUS_CANDIDATE       = 0x0101;

    /**
     * Constant for the Code Input function key.
     * @since 1.2
     */
    /* Japanese PC 106 keyboard - VK_ALPHANUMERIC + ALT: kanji bangou */
    static int VK_CODE_INPUT               = 0x0102;

    /**
     * Constant for the Japanese-Katakana function key.
     * This key switches to a Japanese input method and selects its Katakana input mode.
     * @since 1.2
     */
    /* Japanese Macintosh keyboard - VK_JAPANESE_HIRAGANA + SHIFT */
    static int VK_JAPANESE_KATAKANA        = 0x0103;

    /**
     * Constant for the Japanese-Hiragana function key.
     * This key switches to a Japanese input method and selects its Hiragana input mode.
     * @since 1.2
     */
    /* Japanese Macintosh keyboard */
    static int VK_JAPANESE_HIRAGANA        = 0x0104;

    /**
     * Constant for the Japanese-Roman function key.
     * This key switches to a Japanese input method and selects its Roman-Direct input mode.
     * @since 1.2
     */
    /* Japanese Macintosh keyboard */
    static int VK_JAPANESE_ROMAN           = 0x0105;

    /**
     * Constant for the locking Kana function key.
     * This key locks the keyboard into a Kana layout.
     * @since 1.3
     */
    /* Japanese PC 106 keyboard with special Windows driver - eisuu + Control; Japanese Solaris keyboard: kana */
    static int VK_KANA_LOCK                = 0x0106;

    /**
     * Constant for the input method on/off key.
     * @since 1.3
     */
    /* Japanese PC 106 keyboard: kanji. Japanese Solaris keyboard: nihongo */
    static int VK_INPUT_METHOD_ON_OFF      = 0x0107;

    /* for Sun keyboards */
    /** @since 1.2 */
    static int VK_CUT                      = 0xFFD1;
    /** @since 1.2 */
    static int VK_COPY                     = 0xFFCD;
    /** @since 1.2 */
    static int VK_PASTE                    = 0xFFCF;
    /** @since 1.2 */
    static int VK_UNDO                     = 0xFFCB;
    /** @since 1.2 */
    static int VK_AGAIN                    = 0xFFC9;
    /** @since 1.2 */
    static int VK_FIND                     = 0xFFD0;
    /** @since 1.2 */
    static int VK_PROPS                    = 0xFFCA;
    /** @since 1.2 */
    static int VK_STOP                     = 0xFFC8;

    /**
     * Constant for the Compose function key.
     * @since 1.2
     */
    static int VK_COMPOSE                  = 0xFF20;

    /**
     * Constant for the AltGraph function key.
     * @since 1.2
     */
    static int VK_ALT_GRAPH                = 0xFF7E;

    /**
     * Constant for the Begin key.
     * @since 1.5
     */
    static int VK_BEGIN                    = 0xFF58;

}
