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

public class JavaScriptKeywords {
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
	abstract 
    boolean 
    break 
    byte 
    case 
    catch 
    char 
    class 
    const 
    continue 
    debugger 
    default 
    delete 
    do 
    double
    
    else 
    enum 
    export 
    extends 
    false 
    final 
    finally 
    float 
    for 
    function 
    goto 
    if 
    implements 
    import 
    in
    
    instanceof 
    int 
    interface 
    long 
    native 
    new 
    null 
    package 
    private 
    protected 
    public 
    return 
    short 
    static 
    super
    
    switch 
    synchronized 
    this 
    throw 
    throws 
    transient 
    true 
    try 
    typeof 
    var 
    void 
    volatile 
    while 
    with 
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

	public static String[] getKeywods() {
		return keywods;
	}
	
	public static boolean checkKeyworkViolation(String name) {
		for (int i = 0; i < keywods.length; i++) {
			if (keywods[i].equals(name)) {
				return true;
			}
		}
		return false;
	}
}
