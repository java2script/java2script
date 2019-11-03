package org.sgx.j2s.mauve.report;

import gnu.testlet.Testlet;
import java.util.LinkedList;


import org.sgx.j2s.mauve.fixes.Fixes;
/**
 * 
 * @author sgurin
 *
 */
public class JavaLangReport {

	public static void main(String[] args) {
		new JavaLangReport().testJavaLang();
	}
	private LinkedList<Testlet> tests;
	public void testJavaLang() {
		Fixes.getInstance().applyAllFixes();
	    tests = new LinkedList<Testlet>();

	    new J2sTests(tests);
	    new JavaLangTests(tests);
		
		Tester tester = new Tester(tests, "gnu.testlet.java2");
		tester.testAll();
		Utils.print(tester.buildHTMLReport());
	}

}
