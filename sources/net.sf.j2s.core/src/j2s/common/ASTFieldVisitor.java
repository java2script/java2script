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

package j2s.common;

import java.util.Iterator;
import java.util.List;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

/**
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class ASTFieldVisitor extends AbstractPluginVisitor {

	/*
	 * IE passes the following: 
	 * pubic,protected,private,static,package,
	 * implements,prototype,fasle,throws,label
	 * 
	 * Firefox passes the following:
	 * pubic,prototype,fasle,label
	 * 
	 * The following does not contains all the reserved keywords:
	 * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Reserved_Words
	 * 
	 * abstract,		boolean,		break,			byte,
	 * case,			catch,			char,			class,
	 * const,			continue,		debugger,		default, 
	 * delete,			do,				double,			else, 
	 * enum,			export,			extends,		false, 
	 * final,			finally,		float,			for, 
	 * function,		goto,			if,				implements, 
	 * import,			in,				instanceof,		int, 
	 * interface,		long,			native,			new, 
	 * null,			package,		private,		protected, 
	 * public,			return,			short,			static, 
	 * super,			switch,			synchronized,	this, 
	 * throw,			throws,			transient,		true, 
	 * try,				typeof,			var,			void, 
	 * volatile,		while,			with,
	 *  
	 */
	public static String[] keywods = new String[] {
		"class", /*"java", "javax", "sun", */"for", "while", "do", "in", "return", "function", "var", 
		"class", "pubic", "protected", "private", "new", "delete",
		"static", "package", "import", "extends", "implements",
		"instanceof", "typeof", "void", "if", "this", "super",
		"prototype", "else", "break", "true", "fasle", "try",
		"catch", "throw", "throws", "continue", "switch", "default",
		"case", "export", "import", "const", /*"label", */"with",
		"arguments",
		"valueOf"
	};

	
	boolean checkKeyworkViolation(String name) {
		for (int i = 0; i < keywods.length; i++) {
			if (keywods[i].equals(name)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Check whether the given QualifiedName is just simple or not.
	 * The "just simple" means only "*.*" format.
	 * 
	 * @param node
	 * @return
	 */
	protected boolean isSimpleQualified(QualifiedName node) {
		Name qualifier = node.getQualifier();
		if (qualifier instanceof SimpleName) {
			return true;
		} else if (qualifier instanceof QualifiedName) {
			return isSimpleQualified((QualifiedName) qualifier);
		}
		return false;
	}

	protected boolean isFieldNeedPreparation(FieldDeclaration node) {
		if ((node.getModifiers() & Modifier.STATIC) != 0) {
			return false;
		}

		List fragments = node.fragments();
		for (Iterator iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment element = (VariableDeclarationFragment) iter.next();
			Expression initializer = element.getInitializer();
			if (initializer != null) {
				Object constValue = initializer.resolveConstantExpressionValue();
				if (constValue != null && (constValue instanceof Number
						|| constValue instanceof Character
						|| constValue instanceof Boolean
						|| constValue instanceof String)) {
					return false;
				}
				if (initializer instanceof NullLiteral) {
					return false;
				}
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

}
