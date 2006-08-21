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

package net.sf.j2s.core.astvisitors;

import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.QualifiedType;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.WildcardType;

/**
 * @author josson smith
 *
 * 2006-3-10
 */
public class ASTJL3 {
	public static String getTypeStringName(Type type) {
		if (type == null) {
			return null;
		}
		if (type instanceof PrimitiveType
				|| type instanceof WildcardType) {
			return null;
		} else if (type instanceof ArrayType) {
			ArrayType arrType = (ArrayType) type;
			return getTypeStringName(arrType.getElementType());
		} else if (type instanceof ParameterizedType) {
			ParameterizedType paramType = (ParameterizedType) type;
			return getTypeStringName(paramType.getType());
		} else if (type instanceof QualifiedType) {
			QualifiedType qualType = (QualifiedType) type;
			return getTypeStringName(qualType.getQualifier()) + "." + qualType.getName().getIdentifier();//.getFullyQualifiedName();
		} else if (type instanceof SimpleType) {
			SimpleType simpType = (SimpleType) type;
			return simpType.resolveBinding().getQualifiedName();
		}
		return null;
	}
}
