/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/
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
