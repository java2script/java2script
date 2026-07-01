package javajs.api.js;

import java.util.function.Consumer;
import java.util.function.Function;

public interface HTML5Applet {

	/**
	 * A flag that this object is really a JavaScript function that, for example,
	 * might be called from setTimeout().
	 * 
	 * @author Bob Hanson
	 *
	 */
	public interface JSFunction {

	}

	/**
	 * avoiding GCC inability to handle .finally and .catch
	 * 
	 * @j2sNative
	 * 
	 * 		eval("Promise.prototype.$then = function(resolve,reject){return this.then(function(value) {return resolve ? resolve.apply$O(value) : value},function(reason){return reject ? reject.apply$O(reason) : reason})};");
	 *      eval("Promise.prototype.$finally = function(r){this.finally(function(){r.run$()})};");
	 *      eval("Promise.prototype.$catch = function(err){this.catch(function(){err.accept$S('' + err)})};");
	 */
	
	public interface Promise {
		public Promise then(JSFunction resolve, JSFunction reject);

		public Promise $then(Function<Object, Object> resolve, Function<Object, Object> reject);

		public Promise $finally(Runnable whenDone);

		public Promise $catch(Consumer<String> onRejected);
	}

	/**
	 * The canvas that is being used by the HTML5 applet
	 * 
	 * @return
	 */
	Object _getHtml5Canvas();

	int _getHeight();

	int _getWidth();

	/**
	 * The div associated with the HTML5 applet
	 * 
	 * @return
	 */
	Object _getContentLayer();

	/**
	 * Simple resizing for an inline applet
	 * 
	 * @param widthHeight
	 */
	void _resizeApplet(int[] widthHeight);

	void _show(boolean b);

	String _getID();

	void _setAppClass(Object app);

}
