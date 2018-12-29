package swingjs.api.js;

import javajs.api.JSFunction;

public interface JQueryObject {

	public abstract void appendTo(Object obj);
	public abstract JQueryObject append(Object span);

	public abstract void bind(String actions, JSFunction f);
	public abstract void on(String eventName, Object f);

	public abstract JQueryObject focus();
	public abstract JQueryObject select();

	public abstract int width();
	public abstract int height();
	public abstract Object offset();


	public abstract void html(String html);

	public abstract DOMNode get(int i);

	public abstract JQueryObject attr(String key, String value);
	public abstract JQueryObject css(String key, String value);

	public abstract JQueryObject addClass(String name);	
	public abstract JQueryObject removeClass(String name);
	
	public abstract void show();
	public abstract void hide();

	public abstract void resize(JSFunction fHandleResize);


	/**
	 * closest ancestor
	 * 
	 * @param selector
	 * @return
	 */
	public abstract JQueryObject closest(String selector);

	/**
	 * find all descendants
	 * 
	 * @param selector
	 * @return
	 */
	public abstract JQueryObject find(String selector);

	public abstract DOMNode parent();
	public abstract void before(Object obj);
	public abstract void after(Object div);

	
	/**
	 * remove from tree, but do not clear events
	 */
	public abstract void detach(); // like remove(), but does not change event settings
	
	/**
	 * remove from tree and clear all events -- for disposal only
	 */
	public abstract void remove();

	/**
	 * fully remove all children, clearing all events
	 */
	public abstract void empty();

	
}
