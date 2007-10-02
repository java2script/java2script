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

import net.sf.j2s.ajax.SimpleRPCRunnable;

/**
 * @author zhou renjian
 *
 * 2006-10-11
 */
public class TestSerialize extends SimpleRPCRunnable {
	public int x = 0;
	public byte xz = 3;
	public short yz = 3;
	public long xyz = 3;
	public boolean b = false;
	public String s = "hello大家好";
	public char c = '我';
	public float f = 134.0f;
	public double d = 134.0;
	public float[] fs = new float[] {42, 24};
	public double[] ds = new double[] {42, 24};
	public double mypie = Math.E;
	public String[] names = new String[] {"jozz", "josson smith", "周仁建"};
	public int[] xs = new int[] {0};
	public byte[] bbs = new byte[] {0};
	public short[] xys = new short[] {3};
	public long[] xyzs = new long[] {3};
	public boolean[] bs = new boolean[] {false};
	public char[] cs = new char[] {'我'};
	public String csx, xysx[];
	public String[] acsx, axysx[];
	public String[] xacsx, xaxysx[];
	
	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.ServletRunnable#getServletURL()
	 */
	public String url() {
		// TODO Auto-generated method stub
		return null;
	}
	/* (non-Javadoc)
	 * @see net.sf.j2s.ajax.ServletRunnable#ajaxRun()
	 */
	public void ajaxRun() {
	// TODO Auto-generated method stub
	}
	
	public static void main(String[] args) {
		TestSerialize ts = new TestSerialize();
		String ss = ts.serialize();
		System.out.println(ss);
		ts.x = 423;
		ts.xyz = 3421;
		ts.s = "my name is jozz";
		ts.c = '1';
		for (int i = 0; i < 64; i++) {
			ts.s += "w";
		}
		ts.s += "end";
		String ss2 = ts.serialize();
		System.out.println(ss2);
		ts.deserialize(ss2);
		System.out.println(ts.s);
		ts.deserialize(ss);
		System.out.println(ts.x);
		System.out.println(ts.xyz);
		System.out.println(ts.c + 10);
		System.out.println(ts.c);
		System.out.println(ts.s);
		ts.s = null;
		ts.names[2] = "412";
		ts.names = null;
		ss2 = ts.serialize();
		ts.fs[1] = 134.0f;
		System.out.println(ss2);
		ts.deserialize(ss2);
		System.out.println(ts.s);
		System.out.println(ts.fs[1]);
		//System.out.println(ts.names[2]);
		System.out.println(ts.names);
		System.out.println(ts.cs[0]);
	}
}
