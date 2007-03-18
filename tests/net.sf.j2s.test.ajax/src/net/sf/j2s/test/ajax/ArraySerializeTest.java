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
public class ArraySerializeTest extends TestCase {
	String trim(String s) {
		return s.substring(s.indexOf('#') + 1);
	}
	public void testSimple() {
		SimpleSerializable ss = new SimpleSerializable();
		//System.out.println(trim(ss.serialize()));
		assertEquals(0, trim(ss.serialize()).length());
		assertEquals("", trim(ss.serialize()));
	}
	public class FloatSerialize extends SimpleSerializable {
		public float[] f = new float[] {23.2f};
	}
	public void testSimpleFloat() {
		SimpleSerializable ss = new FloatSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CfAFCF23.2", trim(ss.serialize()));
	}
	public class DoubleSerialize extends SimpleSerializable {
		public double[] d = new double[] {23.2};
	}
	public void testSimpleDouble() {
		SimpleSerializable ss = new DoubleSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CdADCF23.2", trim(ss.serialize()));
	}
	public class IntSerialize extends SimpleSerializable {
		public int[] i = new int[] {23};
	}
	public void testSimpleInt() {
		SimpleSerializable ss = new IntSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CiAICD23", trim(ss.serialize()));
	}
	public class LongSerialize extends SimpleSerializable {
		public long[] l = new long[] {23};
	}
	public void testSimpleLong() {
		SimpleSerializable ss = new LongSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("ClALCD23", trim(ss.serialize()));
	}
	public class ShortSerialize extends SimpleSerializable {
		public short[] s = new short[] {23};
	}
	public void testSimpleShort() {
		SimpleSerializable ss = new ShortSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CsASCD23", trim(ss.serialize()));
	}
	public class ByteSerialize extends SimpleSerializable {
		public byte[] b = new byte[] {23};
	}
	public void testSimpleByte() {
		SimpleSerializable ss = new ByteSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CbABCD23", trim(ss.serialize()));
	}
	public class CharSerialize extends SimpleSerializable {
		public char[] c = new char[] {23};
	}
	public void testSimpleChar() {
		SimpleSerializable ss = new CharSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CcACCD23", trim(ss.serialize()));
	}
	public class BooleanSerialize extends SimpleSerializable {
		public boolean[] b = new boolean[] {true};
	}
	public void testSimpleBoolean() {
		SimpleSerializable ss = new BooleanSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CbAbCFtrue", trim(ss.serialize()));
	}
	public void testSimpleBoolean2() {
		BooleanSerialize ss = new BooleanSerialize();
		ss.b = new boolean[56];
		System.out.println(trim(ss.serialize()));
		assertEquals("CbAb@D56GfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalseGfalse", trim(ss.serialize()));
	}
	public class StringSerialize extends SimpleSerializable {
		public String[] s = new String[] {"My name is jozz"};
	}
	public void testSimpleString() {
		SimpleSerializable ss = new StringSerialize();
		System.out.println(trim(ss.serialize()));
		assertEquals("CsAXCsQMy name is jozz", trim(ss.serialize()));
	}
	public void testSimpleString2() {
		StringSerialize ss = new StringSerialize();
		ss.s = null;
		System.out.println(trim(ss.serialize()));
		assertEquals("CsAXA", trim(ss.serialize()));
	}
	public void testSimpleString3() {
		StringSerialize ss = new StringSerialize();
		ss.s[0] = "abcdefg";
		ss.s[0] += ss.s[0];
		ss.s[0] += ss.s[0];
		ss.s[0] += ss.s[0];
		System.out.println(ss.s[0].length());
		System.out.println(trim(ss.serialize()));
		assertEquals("CsAXCs@D56abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg", trim(ss.serialize()));
	}
	public void testSimpleString7() {
		StringSerialize ss = new StringSerialize();
		ss.s[0] = "÷‹» Ω®";
		System.out.println(trim(ss.serialize()));
		assertEquals("CsAXCuN5ZGo5LuB5bu6", trim(ss.serialize()));
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
		SimpleSerializable ss = new MixedSerialize();
		System.out.println(trim(ss.serialize()));
//		assertEquals("CfAFCF23.2CdADCF23.2CnAICD23ClALCD23CsASCD23CbABCD23CcACCD23CxAbCGfalseEstrAXCsLHell World", trim(ss.serialize()));
		assertEquals("CdADCF23.2CxAbCGfalseCfAFCF23.2CbABCD23CsASCD23EstrAXCsLHell WorldClALCD23CcACCD23CnAICD23", trim(ss.serialize()));
	}
}
