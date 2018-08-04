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

package net.sf.j2s.core.astvisitors;

import org.eclipse.jdt.core.dom.ITypeBinding;

/**
 * 
 * 
 */
public class TypeAdapter extends VisitorAdapter {

	public String getMyUnqualifiedClassName() {
		return myUnqualifiedClassName;
	}

	public String getMyFullClassName() {
		return myFullClassName;
	}

//	private boolean isStatic;
//	public boolean isStatic() {
//		return isStatic;
//	}
	
	public ITypeBinding getMyTypeBinding() {
		return myBinding;
	}

	private String myUnqualifiedClassName = "";
	private String myFullClassName = "";
	private ITypeBinding myBinding;

	void setClassAndBinding(String className, ITypeBinding binding) {
		myBinding = binding;
//		isStatic = Modifier.isStatic(binding.getModifiers());
		myUnqualifiedClassName = className;
		String myPackageName = visitor.getMyPackageName();
		myFullClassName = (myPackageName == null || myPackageName.length() == 0 || "java.lang".equals(myPackageName)
				|| myUnqualifiedClassName.startsWith("C$.") ? myUnqualifiedClassName : myPackageName + '.' + myUnqualifiedClassName);
	}

}
