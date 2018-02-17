package swingjs.api.js;

import javajs.api.JSFunction;

public interface JQueryObject {

	public abstract JQueryObject append(Object span);

	public abstract int width();

	public abstract int height();

	public abstract void html(String html);

	public abstract DOMNode get(int i);

	public abstract void bind(String actions, JSFunction f);

	public abstract Object offset();

	public abstract JQueryObject focus();

	public abstract JQueryObject select();

	public abstract JQueryObject attr(String key, String value);

	public abstract JQueryObject addClass(String name);
	
	public abstract void empty();

	public abstract void on(String eventName, Object f);

	public abstract void remove();

	public abstract JQueryObject find(String selector);

	public abstract void appendTo(Object obj);

	public abstract JQueryObject css(String key, String value);

	public abstract void hide();
	public abstract void show();

	public abstract void resize(JSFunction fHandleResize);

	public abstract void after(Object div);

	public abstract void detach(); // like remove(), but does not change event settings

	
}
