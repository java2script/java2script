/*******************************************************************************
 * Copyright (c) 2000, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     Dmitry Stalnov (dstalnov@fusionone.com) - contributed fix for
 *       bug "inline method - doesn't handle implicit cast" (see
 *       https://bugs.eclipse.org/bugs/show_bug.cgi?id=24941).
 *******************************************************************************/
package net.sf.j2s.core.astvisitors.adapters;

import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;

public class Bindings {
	
	/**
	 * Checks if the two bindings are equal. First an identity check is
	 * made an then the key of the bindings are compared. 
	 * @param b1 first binding treated as <code>this</code>. So it must
	 *  not be <code>null</code>
	 * @param b2 the second binding.
	 * @return boolean
	 */
	private static boolean equals(IBinding b1, IBinding b2) {
		boolean isEqualTo= b1.isEqualTo(b2);
		if (!isEqualTo 
				&& b1 instanceof ITypeBinding 
				&& b2 instanceof ITypeBinding) {
			ITypeBinding bb1 = (ITypeBinding) b1;
			ITypeBinding bb2 = (ITypeBinding) b2;
			String bb1Name = bb1.getBinaryName();
			if (bb1Name != null) {
				isEqualTo = bb1Name.equals(bb2.getBinaryName());
			}
		}
		return isEqualTo;
	}
		
	/**
	 * Returns <code>true</code> if the given type is a super type of a candidate.
	 * <code>true</code> is returned if the two type bindings are identical
	 * @param possibleSuperType the type to inspect
	 * @param type the type whose super types are looked at
	 * @return <code>true</code> iff <code>possibleSuperType</code> is
	 * 		a super type of <code>type</code> or is equal to it
	 */
	public static boolean isSuperType(ITypeBinding possibleSuperType, ITypeBinding type) {
		if (type.isArray() || type.isPrimitive()) {
			return false;
		}
		if (Bindings.equals(type, possibleSuperType)) {
			return true;
		}
		ITypeBinding superClass= type.getSuperclass();
		if (superClass != null && isSuperType(possibleSuperType, superClass))
				return true;
		
		if (possibleSuperType.isInterface()) {
			ITypeBinding[] superInterfaces= type.getInterfaces();
			for (int i= 0; i < superInterfaces.length; i++) {
				if (isSuperType(possibleSuperType, superInterfaces[i])) {
					return true;
				}			
			}
		}
		return false;
	}
		
}
