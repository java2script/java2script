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

package net.sf.j2s.test.ajax;

import junit.framework.TestCase;
import net.sf.j2s.ajax.SimpleSerializable;

/**
 * @author zhou renjian
 *
 * 2006-10-11
 */
public class SerializeTest extends TestCase {
	String trim(String s) {
		return s.substring(s.indexOf('#') + 1);
	}
	public void testSimple() {
		SimpleSerializable ss = new SimpleSerializable();
		System.out.println(trim(ss.serialize()));
		assertEquals(0, trim(ss.serialize()).length());
		assertEquals("", trim(ss.serialize()));
	}
	public class FloatSerialize extends SimpleSerializable {
		public float f = 23.2f;
	}
	public void testSimpleFloat() {
		SimpleSerializable ss = new FloatSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CfFF23.2", trim(ss.serialize()));
	}
	public class DoubleSerialize extends SimpleSerializable {
		public double d = 23.2;
	}
	public void testSimpleDouble() {
		SimpleSerializable ss = new DoubleSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CdDF23.2", trim(ss.serialize()));
	}
	public class IntSerialize extends SimpleSerializable {
		public int i = 23;
	}
	public void testSimpleInt() {
		SimpleSerializable ss = new IntSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CiID23", trim(ss.serialize()));
	}
	public class LongSerialize extends SimpleSerializable {
		public long l = 23;
	}
	public void testSimpleLong() {
		SimpleSerializable ss = new LongSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("ClLD23", trim(ss.serialize()));
	}
	public class ShortSerialize extends SimpleSerializable {
		public short s = 23;
	}
	public void testSimpleShort() {
		SimpleSerializable ss = new ShortSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CsSD23", trim(ss.serialize()));
	}
	public class ByteSerialize extends SimpleSerializable {
		public byte b = 23;
	}
	public void testSimpleByte() {
		SimpleSerializable ss = new ByteSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CbBD23", trim(ss.serialize()));
	}
	public class CharSerialize extends SimpleSerializable {
		public char c = 23;
	}
	public void testSimpleChar() {
		SimpleSerializable ss = new CharSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CcCD23", trim(ss.serialize()));
	}
	public class BooleanSerialize extends SimpleSerializable {
		public boolean b = true;
	}
	public void testSimpleBoolean() {
		SimpleSerializable ss = new BooleanSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CbbFtrue", trim(ss.serialize()));
	}
	public class StringSerialize extends SimpleSerializable {
		public String s = "My name is jozz";
	}
	public void testSimpleString() {
		SimpleSerializable ss = new StringSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CssQMy name is jozz", trim(ss.serialize()));
	}
	public void testSimpleString2() {
		StringSerialize ss = new StringSerialize();
		ss.s = null;
		System.out.println(trim(ss.serialize()));
		assertEquals("CssA", trim(ss.serialize()));
	}
	public void testSimpleString3() {
		StringSerialize ss = new StringSerialize();
		ss.s = "abcdefg";
		ss.s += ss.s;
		ss.s += ss.s;
		ss.s += ss.s;
		System.out.println(ss.s.length());
		System.out.println(trim(ss.serialize()));
		assertEquals("Css@D56abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg", trim(ss.serialize()));
	}
	public void testSimpleString7() {
		StringSerialize ss = new StringSerialize();
		ss.s = "÷‹» Ω®";
		System.out.println(trim(ss.serialize()));
		assertEquals("CsuN5ZGo5LuB5bu6", trim(ss.serialize()));
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
		System.out.println(trim(ss.serialize()));
		//assertEquals("CfFF23.2CdDF23.2CnID23ClLD23CsSD23CbBD23CcCD23CxbGfalseEstrsLHell World", trim(ss.serialize()));
		assertEquals("EstrsLHell WorldCcCD23CfFF23.2CxbGfalseClLD23CnID23CsSD23CdDF23.2CbBD23", trim(ss.serialize()));
	}
}
