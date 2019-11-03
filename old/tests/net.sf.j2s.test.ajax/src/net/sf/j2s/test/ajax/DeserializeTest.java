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
public class DeserializeTest extends TestCase {
	public void testSimple() {
		SimpleSerializable ss = new SimpleSerializable();
		ss.deserialize("WLL100#");
	}
	public class FloatSerialize extends SimpleSerializable {
		public float f = 23.2f;
	}
	public void testSimpleFloat() {
		FloatSerialize ss = new FloatSerialize();
		ss.deserialize("WLL100#CfFF21.2");
		assertEquals(21.2f, ss.f, 0.0001f);
	}
	public class DoubleSerialize extends SimpleSerializable {
		public double d = 23.2;
	}
	public void testSimpleDouble() {
		DoubleSerialize ss = new DoubleSerialize();
		ss.deserialize("WLL100#CdDF20.2");
		assertEquals(20.2, ss.d, 0.0001);
	}
	public class IntSerialize extends SimpleSerializable {
		public int i = 23;
	}
	public void testSimpleInt() {
		IntSerialize ss = new IntSerialize();
		ss.deserialize("WLL100#CiID13");
		assertEquals(13, ss.i);
	}
	public class LongSerialize extends SimpleSerializable {
		public long l = 23;
	}
	public void testSimpleLong() {
		LongSerialize ss = new LongSerialize();
		ss.deserialize("WLL100#ClLD33");
		assertEquals(33, ss.l);
	}
	public class ShortSerialize extends SimpleSerializable {
		public short s = 23;
	}
	public void testSimpleShort() {
		ShortSerialize ss = new ShortSerialize();
		ss.deserialize("WLL100#CsSD53");
		assertEquals(53, ss.s);
	}
	public class ByteSerialize extends SimpleSerializable {
		public byte b = 23;
	}
	public void testSimpleByte() {
		ByteSerialize ss = new ByteSerialize();
		ss.deserialize("WLL100#CbBD28");
		assertEquals(28, ss.b);
	}
	public class CharSerialize extends SimpleSerializable {
		public char c = 23;
	}
	public void testSimpleChar() {
		CharSerialize ss = new CharSerialize();
		ss.deserialize("WLL100#CcCD65");
		assertEquals('A', ss.c);
	}
	public class BooleanSerialize extends SimpleSerializable {
		public boolean b = true;
	}
	public void testSimpleBoolean() {
		BooleanSerialize ss = new BooleanSerialize();
		ss.deserialize("WLL100#CbbGfalse");
		assertEquals(false, ss.b);
	}
	public class StringSerialize extends SimpleSerializable {
		public String s = "My name is jozz";
	}
	public void testSimpleString() {
		StringSerialize ss = new StringSerialize();
		ss.deserialize("WLL100#CssQMy name iz jozz");
		assertEquals("My name iz jozz", ss.s);
	}
	public void testSimpleString2() {
		StringSerialize ss = new StringSerialize();
		ss.deserialize("WLL100#CssA");
		assertEquals(null, ss.s);
	}
	public void testSimpleString3() {
		StringSerialize ss = new StringSerialize();
		ss.s = "abcdefg";
		ss.s += ss.s;
		ss.s += ss.s;
		ss.s += ss.s;
		ss.deserialize("WLL100#Css@D56abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg");
		assertEquals(56, ss.s.length());
	}
	public void testSimpleString7() {
		StringSerialize ss = new StringSerialize();
		ss.deserialize("WLL100#CsuN5ZGo5LuB5bu6");
		assertEquals("÷‹» Ω®", ss.s);
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
		MixedSerialize ss = new MixedSerialize();
		ss.deserialize("WLL100#CfFF23.2CdDF21.2CnID23ClLD23CsSD23CbBD23CcCD23CxbGfalseEstrsLHell World");
		assertEquals(21.2, ss.d, 0.0001);
	}
}
