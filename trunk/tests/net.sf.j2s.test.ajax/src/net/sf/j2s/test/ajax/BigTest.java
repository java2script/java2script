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

import net.sf.j2s.ajax.SimpleSerializable;
import junit.framework.TestCase;

/**
 * @author zhou renjian
 *
 * 2006-10-13
 */
public class BigTest extends TestCase {
	String trim(String s) {
		return s.substring(s.indexOf('#') + 1);
	}
	public void testJavaSource() {
	    String tmpStr = "";
	    tmpStr += "/*******************************************************************************\r\n";
	    tmpStr += " * Copyright (c) 2007 java2script and others.\r\n";
	    tmpStr += " * All rights reserved. This program and the accompanying materials\r\n";
	    tmpStr += " * are made available under the terms of the Eclipse Public License v1.0\r\n";
	    tmpStr += " * which accompanies this distribution, and is available at\r\n";
	    tmpStr += " * http://www.eclipse.org/legal/epl-v10.html\r\n";
	    tmpStr += " *\r\n";
	    tmpStr += " * Contributors:\r\n";
	    tmpStr += " *     Zhou Renjian - initial API and implementation\r\n";
	    tmpStr += " *******************************************************************************/\r\n";

	    tmpStr += "package net.sf.j2s.ajax.test;\r\n";

	    tmpStr += "import junit.framework.TestCase;\r\n";
	    tmpStr += "import net.sf.j2s.ajax.SimpleSerializable;\r\n";

	    tmpStr += "/**\r\n";
	    tmpStr += " * @author zhou renjian\r\n";
	    tmpStr += " *\r\n";
	    tmpStr += " * 2006-10-11\r\n";
	    tmpStr += " */\r\n";
	    tmpStr += "public class SerializeTest extends TestCase {\r\n";
	    tmpStr += "	public void testSimple() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new SimpleSerializable();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(0, ss.serialize().length());\r\n";
	    tmpStr += "		assertEquals(\"\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class FloatSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public float f = 23.2f;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleFloat() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new FloatSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CfFF23.2\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class DoubleSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public double d = 23.2;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleDouble() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new DoubleSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CdDF23.2\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class IntSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public int i = 23;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleInt() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new IntSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CiID23\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class LongSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public long l = 23;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleLong() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new LongSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"ClLD23\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class ShortSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public short s = 23;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleShort() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new ShortSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CsSD23\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class ByteSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public byte b = 23;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleByte() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new ByteSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CbBD23\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class CharSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public char c = 23;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleChar() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new CharSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CcCD23\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class BooleanSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public boolean b = true;\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleBoolean() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new BooleanSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CbbFtrue\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class StringSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public String s = \"My name is jozz\";\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleString() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new StringSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CssQMy name is jozz\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleString2() {\r\n";
	    tmpStr += "		StringSerialize ss = new StringSerialize();\r\n";
	    tmpStr += "		ss.s = null;\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CssA\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleString3() {\r\n";
	    tmpStr += "		StringSerialize ss = new StringSerialize();\r\n";
	    tmpStr += "		ss.s = \"abcdefg\";\r\n";
	    tmpStr += "		ss.s += ss.s;\r\n";
	    tmpStr += "		ss.s += ss.s;\r\n";
	    tmpStr += "		ss.s += ss.s;\r\n";
	    tmpStr += "		System.out.println(ss.s.length());\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"Css@D56abcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefgabcdefg\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleString7() {\r\n";
	    tmpStr += "		StringSerialize ss = new StringSerialize();\r\n";
	    tmpStr += "		ss.s = \"÷‹» Ω®\";\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CsuN5ZGo5LuB5bu6\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public class MixedSerialize extends SimpleSerializable {\r\n";
	    tmpStr += "		public float f = 23.2f;\r\n";
	    tmpStr += "		public double d = 23.2;\r\n";
	    tmpStr += "		public int n = 23;\r\n";
	    tmpStr += "		public long l = 23;\r\n";
	    tmpStr += "		public short s = 23;\r\n";
	    tmpStr += "		public byte b = 23;\r\n";
	    tmpStr += "		public char c = 23;\r\n";
	    tmpStr += "		public boolean x = false;\r\n";
	    tmpStr += "		public String str = \"Hell World\";\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "	public void testSimpleMixed() {\r\n";
	    tmpStr += "		SimpleSerializable ss = new MixedSerialize();\r\n";
	    tmpStr += "		System.out.println(ss.serialize());\r\n";
	    tmpStr += "		assertEquals(\"CfFF23.2CdDF23.2CnID23ClLD23CsSD23CbBD23CcCD23CxbGfalseEstrsLHell World\", ss.serialize());\r\n";
	    tmpStr += "	}\r\n";
	    tmpStr += "}\r\n";
	    
	    /**
	     * @j2sNative
	     * var normal = /^[\u0000-\u00ff]*$/.test(tmpStr);
	     * if (normal) {
	     * log ("OK:" + normal);
	     * } else {
	     * log ("not OK");
	     * }
	     * var normal = /^[\u0000-\u00ff]*$/.test("hello\r\nfasd");
	     * if (normal) {
	     * log ("OK:" + normal);
	     * } else {
	     * log ("not OK");
	     * }
	     * var normal = /^[\u0000-\u00ff]*$/.test("hello\r\nfa∆‰sd");
	     * if (normal) {
	     * log ("OK:" + normal);
	     * } else {
	     * log ("not OK");
	     * }
	     */ {}
	    //if (true) return;

	    StringSS sss = new StringSS();
	    sss.s = tmpStr;
	    String serialize = trim(sss.serialize());
	    System.out.println(serialize);
	    System.out.println(serialize.length());
	    assertEquals(6153, serialize.length());
	}
    public class StringSS extends SimpleSerializable {
    	public String s;
    	
    };
}
