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

package j2s.jmol.common;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;

/**
 * This level of visitor will focus on support Java 5.0 syntax.
 * 
 * @author zhou renjian
 *
 * 2006-12-6
 */
public class ASTTigerVisitor extends ASTVisitor {

	protected void boxingNode(ASTNode element) {
		if (element instanceof Expression) {
			Expression exp = (Expression) element;
			if (exp.resolveBoxing()) {
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (typeBinding.isPrimitive()) {
					String name = typeBinding.getName();
					Code type = PrimitiveType.toCode(name);
					String primitiveTypeName = null;
					if (type == PrimitiveType.INT) {
						primitiveTypeName = "Integer";
					} else if (type == PrimitiveType.LONG) {
						primitiveTypeName = "Long";
					} else if (type == PrimitiveType.FLOAT) {
						primitiveTypeName = "Float";
					} else if (type == PrimitiveType.DOUBLE) {
						primitiveTypeName = "Double";
					} else if (type == PrimitiveType.BOOLEAN) {
						primitiveTypeName = "Boolean";
					} else if (type == PrimitiveType.BYTE) {
						primitiveTypeName = "Byte";
					} else if (type == PrimitiveType.SHORT) {
						primitiveTypeName = "Short";
					} else if (type == PrimitiveType.CHAR) {
						primitiveTypeName = "Character";
					} 
					if (primitiveTypeName != null) {
						getBuffer().append("new " + primitiveTypeName + " (");
						element.accept(this.visitor);
						getBuffer().append(")");
						return ;
					}
				}
			} else if (exp.resolveUnboxing()) {
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (!typeBinding.isPrimitive()) {
					String name = typeBinding.getQualifiedName();
					String primitiveName = null;
					if ("java.lang.Integer".equals(name)) {
						primitiveName = "int";
					} else if ("java.lang.Long".equals(name)) {
						primitiveName = "long";
					} else if ("java.lang.Float".equals(name)) {
						primitiveName = "float";
					} else if ("java.lang.Double".equals(name)) {
						primitiveName = "double";
					} else if ("java.lang.Boolean".equals(name)) {
						primitiveName = "boolean";
					} else if ("java.lang.Byte".equals(name)) {
						primitiveName = "byte";
					} else if ("java.lang.Short".equals(name)) {
						primitiveName = "short";
					} else if ("java.lang.Character".equals(name)) {
						primitiveName = "char";
					}
					 
					if (primitiveName != null) {
						getBuffer().append("(");
						element.accept(this.visitor);
						getBuffer().append(")." + primitiveName + "Value ()");
						return ;
					}
				}
			}
		}
		element.accept(this.visitor);
	}
	
}
