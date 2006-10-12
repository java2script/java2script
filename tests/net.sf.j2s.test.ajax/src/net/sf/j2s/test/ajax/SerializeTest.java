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

package net.sf.j2s.test.ajax;

import junit.framework.TestCase;
import net.sf.j2s.ajax.SimpleSerializable;

/**
 * @author josson smith
 *
 * 2006-10-11
 */
public class SerializeTest extends TestCase {
	public void testSimple() {
		SimpleSerializable ss = new SimpleSerializable();
		System.out.println(ss.serialize());
		assertEquals(0, ss.serialize().length());
		assertEquals("", ss.serialize());
	}
	public class FloatSerialize extends SimpleSerializable {
		public float f = 23.2f;
	}
	public void testSimpleFloat() {
		SimpleSerializable ss = new FloatSerialize();
		System.out.println(ss.serialize());
		assertEquals("CfFF23.2", ss.serialize());
	}
	public class DoubleSerialize extends SimpleSerializable {
		public double d = 23.2;
	}
	public void testSimpleDouble() {
		SimpleSerializable ss = new DoubleSerialize();
		System.out.println(ss.serialize());
		assertEquals("CdDF23.2", ss.serialize());
	}
	public class IntSerialize extends SimpleSerializable {
		public int i = 23;
	}
	public void testSimpleInt() {
		SimpleSerializable ss = new IntSerialize();
		System.out.println(ss.serialize());
		assertEquals("CiID23", ss.serialize());
	}
	public class LongSerialize extends SimpleSerializable {
		public long l = 23;
	}
	public void testSimpleLong() {
		SimpleSerializable ss = new LongSerialize();
		System.out.println(ss.serialize());
		assertEquals("ClLD23", ss.serialize());
	}
	public class ShortSerialize extends SimpleSerializable {
		public short s = 23;
	}
	public void testSimpleShort() {
		SimpleSerializable ss = new ShortSerialize();
		System.out.println(ss.serialize());
		assertEquals("CsSD23", ss.serialize());
	}
	public class ByteSerialize extends SimpleSerializable {
		public byte b = 23;
	}
	public void testSimpleByte() {
		SimpleSerializable ss = new ByteSerialize();
		System.out.println(ss.serialize());
		assertEquals("CbBD23", ss.serialize());
	}
	public class CharSerialize extends SimpleSerializable {
		public char c = 23;
	}
	public void testSimpleChar() {
		SimpleSerializable ss = new CharSerialize();
		System.out.println(ss.serialize());
		assertEquals("CcCD23", ss.serialize());
	}
	public class BooleanSerialize extends SimpleSerializable {
		public boolean b = true;
	}
	public void testSimpleBoolean() {
		SimpleSerializable ss = new BooleanSerialize();
		System.out.println(ss.serialize());
		assertEquals("CbbFtrue", ss.serialize());
	}
	public class StringSerialize extends SimpleSerializable {
		public String s = "My name is jozz";
	}
	public void testSimpleString() {
		SimpleSerializable ss = new StringSerialize();
		System.out.println(ss.serialize());
		assertEquals("CssQMy name is jozz", ss.serialize());
	}
	public void testSimpleString2() {
		StringSerialize ss = new StringSerialize();
		ss.s = null;
		System.out.println(ss.serialize());
		assertEquals("CssA", ss.serialize());
	}
	public void testSimpleString3() {
		StringSerialize ss = new StringSerialize();
		ss.s = "abcdefg";
		ss.s += ss.s;
		ss.s += ss.s;
		ss.s += ss.s;
		System.out.println(ss.s.length());
		System.out.println(ss.serialize());
		assertEquals("Css@D56abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg", ss.serialize());
	}
	public void testSimpleString7() {
		StringSerialize ss = new StringSerialize();
		ss.s = "÷‹» Ω®";
		System.out.println(ss.serialize());
		assertEquals("CsuN5ZGo5LuB5bu6", ss.serialize());
	}
	public class MixedSerialize extends SimpleSerializable {
		public float f = 23.2f;
		public double d = 23.2;
		public int n = 23;
		public long l = 23;
		public short s = 23;
		public byte b = 23;
		public char c = 23;
		public boolean x = false;
		public String str = "Hell World";
	}
	public void testSimpleMixed() {
		SimpleSerializable ss = new MixedSerialize();
		System.out.println(ss.serialize());
		assertEquals("CfFF23.2CdDF23.2CnID23ClLD23CsSD23CbBD23CcCD23CxbGfalseEstrsLHell World", ss.serialize());
	}
}
