package org.sgx.j2s.base.js;
 

/**
 * Helper function for java programmers so they can define an analog concept to javascript functions.
 * The user must override a run and indicate how many arguments its run function accepts overriding getParamCount() method.
 * 
 * Please use JsUTils.runnableToFunc for building a javascript function object that will 
 * run this runnable
 * 
 * @author sgurin
 * 
 */
public abstract class AbstractRunnable implements Runnable {
	private int paramCount;

	public AbstractRunnable() {
		this.paramCount = 0;
	}

	public AbstractRunnable(int paramCount) {

	}

	public int getParamCount() {
		return paramCount;
	}

	public void setParamCount(int paramCount) {
		this.paramCount = paramCount;
	}
	
	public void run() {}
	public Object run0(){return null;}
	public Object run1(Object o1){return null;}
	public Object run2(Object o1, Object o2){return null;}
	public Object run3(Object o1, Object o2, Object o3){return null;}
	public Object run4(Object o1, Object o2, Object o3, Object o4){return null;}
}
