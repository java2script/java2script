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
public class ArrayDeserializeTest extends TestCase {
	String trim(String s) {
		return s.substring(s.indexOf('#') + 1);
	}
	public void testSimple() {
		SimpleSerializable ss = new SimpleSerializable();
		//System.out.println(ss.serialize());
		assertEquals(0, trim(ss.serialize()).length());
		assertEquals("", trim(ss.serialize()));
	}
	public class FloatSerialize extends SimpleSerializable {
		public float[] f = new float[] {23.2f};
	}
	public void testSimpleFloat() {
		FloatSerialize ss = new FloatSerialize();
		ss.deserialize("WLL100#CfAFCF21.2");
		assertEquals(21.2, ss.f[0], 0.0001);
	}
	public class DoubleSerialize extends SimpleSerializable {
		public double[] d = new double[] {23.2};
	}
	public void testSimpleDouble() {
		DoubleSerialize ss = new DoubleSerialize();
		ss.deserialize("WLL100#CdADCF21.2");
		assertEquals(21.2, ss.d[0], 0.0001);
	}
	public class IntSerialize extends SimpleSerializable {
		public int[] i = new int[] {23};
	}
	public void testSimpleInt() {
		IntSerialize ss = new IntSerialize();
		ss.deserialize("WLL100#CiAICD13");;
		assertEquals(13, ss.i[0]);
	}
	public class LongSerialize extends SimpleSerializable {
		public long[] l = new long[] {23};
	}
	public void testSimpleLong() {
		LongSerialize ss = new LongSerialize();
		ss.deserialize("WLL100#ClALCD13");;
		assertEquals(1, ss.l.length);
		assertEquals(13, ss.l[0]);
	}
	public class ShortSerialize extends SimpleSerializable {
		public short[] s = new short[] {23};
	}
	public void testSimpleShort() {
		ShortSerialize ss = new ShortSerialize();
		ss.deserialize("WLL100#CsASCD63");;
		assertEquals(63, ss.s[0]);
	}
	public class ByteSerialize extends SimpleSerializable {
		public byte[] b = new byte[] {23};
	}
	public void testSimpleByte() {
		ByteSerialize ss = new ByteSerialize();
		ss.deserialize("WLL100#CbABCD33");;
		assertEquals(33, ss.b[0]);
	}
	public class CharSerialize extends SimpleSerializable {
		public char[] c = new char[] {23};
	}
	public void testSimpleChar() {
		CharSerialize ss = new CharSerialize();
		ss.deserialize("WLL100#CcACCD65");;
		assertEquals('A', ss.c[0]);
	}
	public class BooleanSerialize extends SimpleSerializable {
		public boolean[] b = new boolean[] {true};
	}
	public void testSimpleBoolean() {
		BooleanSerialize ss = new BooleanSerialize();
		ss.deserialize("WLL100#CbAbCGfalse");;
		assertEquals(false, ss.b[0]);
	}
	public void testSimpleBoolean2() {
		BooleanSerialize ss = new BooleanSerialize();
		ss.deserialize("WLL100#CbAb@D56GfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalse");;
		assertEquals(56, ss.b.length);
	}
	public class StringSerialize extends SimpleSerializable {
		public String[] s = new String[] {"My name is jozz"};
	}
	public void testSimpleString() {
		StringSerialize ss = new StringSerialize();
		ss.deserialize("WLL100#CsAXCsQMy name iz jozz");;
		assertEquals("My name iz jozz", ss.s[0]);
	}
	public void testSimpleString2() {
		StringSerialize ss = new StringSerialize();
		ss.deserialize("WLL100#CsAXA");;
		assertEquals(null, ss.s);
	}
	public void testSimpleString3() {
		StringSerialize ss = new StringSerialize();
		ss.deserialize("WLL100#CsAXCs@D56abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg");;
		assertEquals(56, ss.s[0].length());
	}
	public void testSimpleString7() {
		StringSerialize ss = new StringSerialize();
		ss.deserialize("WLL100#CsAXCuN5ZGo5LuB5bu6");;
		assertEquals("÷‹» Ω®", ss.s[0]);
	}
	public class MixedSerialize extends SimpleSerializable {
		public float[] f = new float[] {23.2f};
		public double[] d = new double[] {23.2};
		public int[] n = new int[] {23};
		public long[] l = new long[] {23};
		public short[] s = new short[] {23};
		public byte[] b = new byte[] {23};
		public char[] c = new char[] {23};
		public boolean[] x = new boolean[] {false};
		public String[] str = new String[] {"Hell World"};
	}
	public void testSimpleMixed() {
		MixedSerialize ss = new MixedSerialize();
		ss.deserialize("WLL100#CfAFCF23.2CdADCF20.2CnAICD23ClALCD23CsASCD23CbABCD23CcACCD23CxAbCGfalseEstrAXCsLHell World");;
		assertEquals(20.2, ss.d[0], 0.001);
	}
}
