/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package com.ognize.jface.test;

/**
 * @author josson smith
 *
 * 2006-5-1
 */
interface IWorld {
	int x = 3;
	static interface IHello {
		public void think();
	}
	class Hi implements IHello {
		public void think() {
			System.out.println(x);
		}
	}
	public void take();
}

class CS implements IWorld {
	/* (non-Javadoc)
	 * @see com.ognize.jface.test.IWorld#take()
	 */
	public void take() {
		
	}
}

class CSS implements IWorld.IHello {
	public void think() {
		
	}
}
class XX extends IWorld.Hi {

	public void think() {
		// TODO Auto-generated method stub
		
	}
	
}