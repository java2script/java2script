package org.sgx.j2s.mauve.report;

import gnu.testlet.Testlet;
import java.util.LinkedList;


import org.sgx.j2s.mauve.fixes.Fixes;
/**
 * 
 * @author sgurin
 *
 */
public class JavaUtilReport {

	public static void main(String[] args) {
		new JavaUtilReport().testJavaLang();
	}
	private LinkedList<Testlet> tests;
	public void testJavaLang() {
		Fixes.getInstance().applyAllFixes();
	    tests = new LinkedList<Testlet>();

//	    new J2sTests(tests);    
	    new JavaUtilTest(tests);
		
		Tester tester = new Tester(tests,  "gnu.testlet.java2");
		tester.testAll();
		Utils.print(tester.buildHTMLReport());
	}

}