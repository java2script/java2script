package swingjs.a2s;

import java.awt.Component;

import swingjs.JSUtil;

// Applet, Dialog, Frame
public interface A2SContainer {

   public A2SListener getA2SListener();

/**
 * Effectively add "super.paint(g)" the user's method.
 * 
 */
static void fixAWTPaint(Component c, Class<?> cl) {
	Object f = JSUtil.getJ2SAlias(c, "paint$java_awt_Graphics");
	if (!JSUtil.isForClass(f, cl)
			&& f.toString().indexOf("C$.superclazz.prototype.paint$java_awt_Graphics.apply(this") < 0) {
	/**@j2sNative
	 * 
	 *      c.paint$java_awt_Graphics = function(g) {
	 *        cl.$clazz$.prototype.paint$java_awt_Graphics.apply(c,[g]);
	 *        f.apply(c,[g]);
	 *      }
	 */
	}
}

}
