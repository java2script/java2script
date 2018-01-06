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

//BH 11/18/2017 -- adds full name-qualified support for generics, including generic methods   
//BH 9/10/2017 -- adds full byte, short, and int distinction using class-level local fields $b$, $s$, and $i$, which are IntXArray[1].

/**
 * This class will traverse most of the common keyword and common expression,
 * processing and handle all interconversion among primitive types byte char short int, and
 * long as well as all boxing and unboxing of Character/char, Integer/int, etc.
 * 
 * @author zhou renjian
 * @author Bob Hanson
 *
 */
public abstract class J2SKeywordVisitor extends J2SASTVisitor {

}
