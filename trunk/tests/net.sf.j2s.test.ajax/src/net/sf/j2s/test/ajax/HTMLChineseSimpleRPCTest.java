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

import java.io.UnsupportedEncodingException;
import junit.framework.TestCase;
import net.sf.j2s.ajax.SimpleSerializable;

/**
 * @author zhou renjian
 *
 * 2006-12-16
 */
public class HTMLChineseSimpleRPCTest extends TestCase {
	String trim(String s) {
		return s.substring(s.indexOf('#') + 1);
	}
	public class StringSerialize extends SimpleSerializable {
		public String s = "青藏线：从青海省的格尔木开始，到拉萨约1083千米。有格尔木乘至拉萨的长途汽车，运行30~40小时，2天即到。路线如下：<br>格木尔--289--五道梁--150--雁石坪--100--唐古拉山口--89--安多--138--那曲--164--当雄--75--羊八井--78--拉萨 （其中数字的单位是千米）";
	}
	public class SSerialize extends SimpleSerializable {
		public String content = "千米）";
	}
	public void testString() {
		SSerialize ds2 = new SSerialize();
		ds2.deserialize("IcontentuVMeW3nTLol48z57q/NDU=");
		System.out.println(ds2.content);
	}
	public void xtestSimpleString() {
		StringSerialize ss = new StringSerialize();
		String serialize = trim(ss.serialize());
		String expected = "Csu@E4406Z2S6JeP57q/77ya5LuO6Z2S5rW355yB55qE5qC85bCU5pyo5byA5aeL77yM5Yiw5ouJ6JCo57qmMTA4M+WNg+exs+OAguacieagvOWwlOacqOS5mOiHs+aLieiQqOeahOmVv+mAlOaxvei9pu+8jOi/kOihjDMwfjQw5bCP5pe277yMMuWkqeWNs+WIsOOAgui3r+e6v+WmguS4i++8mjxicj7moLzmnKjlsJQtLTI4OS0t5LqU6YGT5qKBLS0xNTAtLembgeefs+Wdqi0tMTAwLS3llJDlj6Tmi4nlsbHlj6MtLTg5LS3lronlpJotLTEzOC0t6YKj5puyLS0xNjQtLeW9k+mbhC0tNzUtLee+iuWFq+S6lS0tNzgtLeaLieiQqCDvvIjlhbbkuK3mlbDlrZfnmoTljZXkvY3mmK/ljYPnsbPvvIk=";
		
		System.out.println();
//		System.out.println("233,157,146,232,151,143,231,186,191,239,188,154,228,187,142,233,157,146,230,181,183,231,156,129,231,154,132,230,160,188,229,176,148,230,156,168,229,188,128,229,167,139,239,188,140,229,136,176,230,139,137,232,144,168,231,186,166,49,48,56,51,229,141,131,231,177,179,227,128,130,230,156,137,230,160,188,229,176,148,230,156,168,228,185,152,232,135,179,230,139,137,232,144,168,231,154,132,233,149,191,233,128,148,230,177,189,232,189,166,239,188,140,232,191,144,232,161,140,51,48,126,52,48,229,176,143,230,151,182,239,188,140,50,229,164,169,229,141,179,229,136,176,227,128,130,232,183,175,231,186,191,229,166,130,228,184,139,239,188,154,60,98,114,62,230,160,188,230,156,168,229,176,148,45,45,50,56,57,45,45,228,186,148,233,129,147,230,162,129,45,45,49,53,48,45,45,233,155,129,231,159,179,229,157,170,45,45,49,48,48,45,45,229,148,144,229,143,164,230,139,137,229,177,177,229,143,163,45,45,56,57,45,45,229,174,137,229,164,154,45,45,49,51,56,45,45,233,130,163,230,155,178,45,45,49,54,52,45,45,229,189,147,233,155,132,45,45,55,53,45,45,231,190,138,229,133,171,228,186,149,45,45,55,56,45,45,230,139,137,232,144,168,32,239,188,136,229,133,182,228,184,173,230,149,176,229,173,151,231,154,132,229,141,149,228,189,141,230,152,175,229,141,131,231,177,179,239,188,137,");
//		try {
//			byte[] bytes = ss.s.getBytes("UTF-8");
//			System.out.println(bytes[60]);
//			System.out.println(bytes[61]);
//			for (int i = 0; i < bytes.length; i++) {
//				System.out.print((bytes[i] < 0 ? 256 + bytes[i] : bytes[i]) + ",");
//			}
//			System.out.println();
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		System.out.println(expected);
		System.out.println(serialize);
		System.out.println(expected.length());
		System.out.println(serialize.length());
		//int i =
		assertEquals(expected, serialize);
		
		StringSerialize ds = new StringSerialize();
		ds.deserialize("WLL100#" + serialize);
		System.out.println(ds.s);
		
		assertEquals(ds.s, ss.s);
		
		
		StringSerialize ds2 = new StringSerialize();
		ds2.deserialize("WLL100#" + expected);
		System.out.println(ds2.s);
		System.out.println(ss.s);
		
		System.out.println(ds2.s.length());
		System.out.println(ss.s.length());
		
		assertEquals(ds2.s, ss.s);

	}

}
