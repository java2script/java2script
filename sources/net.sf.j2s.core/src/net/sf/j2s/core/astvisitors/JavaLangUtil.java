/*******************************************************************************
 * Copyright (c) 2005 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

public class JavaLangUtil {
	public static String ripJavaLang(String name) {
		int index = name.indexOf('<');
		if (index != -1) {
			name = name.substring(0, index).trim();
		}
		index = name.indexOf("java.lang.");
		//int idx2 = -1;
		char ch = 0;
		if (index != -1 && 
				(name.indexOf('.', index + 10) == -1 
						|| ((ch = name.charAt(index + 10)) >= 'A' && ch <= 'Z'))) {
//				((idx2 = name.indexOf('.', index + 10)) == -1 
//						|| !name.substring(index + 10, idx2).startsWith ("ref"))) {
			name = name.substring(10);
		}
		String swt = "org.eclipse.swt.SWT";
		index = name.indexOf(swt);
		if (index != -1) {
			String after = name.substring(swt.length());
			if (after.length() == 0 || after.startsWith(".")) {
				name = "$WT" + after;
			}
		}
		
		swt = "org.eclipse.swt";
		index = name.indexOf(swt);
		if (index != -1) {
			String after = name.substring(swt.length());
			name = "$wt" + after;
		}

//		if (JavaScriptKeywords.checkKeyworkViolation(name)) {
//			name = "$" + name;
//		}
		return name;
	}
	public static String ripGeneric(String name) {
		int index = name.indexOf('<');
		if (index != -1) {
			name = name.substring(0, index).trim();
		}
		return name;
	}
}
