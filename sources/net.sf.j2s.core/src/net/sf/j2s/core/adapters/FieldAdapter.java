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

package net.sf.j2s.core.adapters;

import java.util.HashSet;

import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;

/**
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class FieldAdapter extends AbstractPluginAdapter {

	/*
	 * IE passes the following: 
	 * public,protected,private,static,package,
	 * implements,prototype,false,throws,label
	 * 
	 * Firefox passes the following:
	 * public,prototype,false,label
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
	 *  
	 *  
	 */
	static String[] keywords = new String[] {
		"class", /*"java", "javax", "sun", */"for", "while", "do", "in", "return", "function", "var", 
		"class", "pubic", "protected", "private", "new", "delete",
		"static", "package", "import", "extends", "implements",
		"instanceof", "typeof", "void", "if", "this", "super",
		"prototype", "else", "break", "true", "false", "try",
		"catch", "throw", "throws", "continue", "switch", "default",
		"case", "export", "import", "const",/*"label", */"with",
		// BH and a few of our own, based on checking developer console:
		 "c$", "apply", "arguments", "bind", "call", "caller",
		 "watch", "unwatch", "valueOf", "isPrototypeOf", "isGenerator", 
		 "prototype"
	};

	
	public static boolean checkKeywordViolation(String name, HashSet<String> definedPackageNames) {
		for (int i = 0; i < keywords.length; i++) {
			if (keywords[i].equals(name)) {
				return true;
			}
		}
		return (definedPackageNames != null && definedPackageNames.contains(name));		
	}
	
	/**
	 * Check whether the given QualifiedName is just simple or not.
	 * The "just simple" means only "*.*" format.
	 * 
	 * @param node
	 * @return
	 */
	public static boolean isSimpleQualified(QualifiedName node) {
		Name qualifier = node.getQualifier();
		if (qualifier instanceof SimpleName) {
			return true;
		} else if (qualifier instanceof QualifiedName) {
			return isSimpleQualified((QualifiedName) qualifier);
		}
		return false;
	}

}
