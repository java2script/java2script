package org.sgx.j2s.mauve.report.probes.j2stest;

import gnu.testlet.Testlet;
import gnu.testlet.java2.lang.String.CASE_INSENSITIVE_ORDER;
import gnu.testlet.java2.lang.String.ConsCharset;
import gnu.testlet.java2.lang.String.charAt;

import java.util.*;

import org.sgx.j2s.mauve.fixes.Fixes;
import org.sgx.j2s.mauve.report.J2sTestHarness;
import org.sgx.j2s.mauve.report.Tester;

public class T1 {
	
//	/**
//	 * @param value
//	 * @return
//	 * @j2sNative
//	 * return value
//	 */
//	 public static native long doubleToLongBits(double value);

	public static void main(String[] args) {
		new T1().test();
	}


	private LinkedList tests;

	private void test() {
//		Double.doubleToLongBits(value)
		Fixes.getInstance().applyAllFixes();
		tests = new LinkedList();
		doString();
		
		System.out.println(tests.size());
		
		Tester tester = new Tester(tests, "gnu.testlet.java2");
		tester.testAll();
		print(tester.buildHTMLReport());
	}
	
	
	private void doString() {
		tests.add(new gnu.testlet.java2.lang.String.equals());
		tests.add(new CASE_INSENSITIVE_ORDER());
		tests.add(new charAt());
		tests.add(new gnu.testlet.java2.lang.String.compareTo());
		tests.add(new ConsCharset());
		tests.add(new gnu.testlet.java2.lang.String.decode());
	}


	/**
	 * @j2sNative
	 * return document.body.innerHTML=s;
	 */
	public static native Object print(String s);
}
