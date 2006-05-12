package org.eclipse.swt.internal;

public abstract class RunnableCompatibility implements Runnable {
	int returnSet = 0;
	boolean returnBoolean;
	double returnNumber;
	Object returnObject;
	Object event;
	
	public Object getEvent() {
		return event;
	}

	public void setEvent(Object event) {
		this.event = event;
	}

	public void toReturn(double val) {
		returnSet = 1;
		returnNumber = val;
		returnObject = null;
	}
	
	public void toReturn(boolean val) {
		returnSet = 2;
		returnBoolean = val;
		returnNumber = 0;
		returnObject = null;
	}
	
	public void toReturn(Object val) {
		returnSet = 3;
		returnObject = val;
		returnNumber = 0;
		returnBoolean = false;
	}
	
	public boolean isReturned() {
		return returnSet != 0;
	}
}
