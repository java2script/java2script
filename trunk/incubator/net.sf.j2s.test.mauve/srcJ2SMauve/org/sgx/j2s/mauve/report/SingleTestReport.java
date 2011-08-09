package org.sgx.j2s.mauve.report;

import gnu.testlet.Testlet;
import gnu.testlet.java2.lang.Character.CharacterTest;
import gnu.testlet.java2.lang.Character.classify;
import gnu.testlet.java2.lang.Double.parseDouble;
import gnu.testlet.java2.lang.Enum.PR33183;
import gnu.testlet.java2.lang.Integer.IntegerBitStuff;
import gnu.testlet.java2.lang.Integer.IntegerTest;
import gnu.testlet.java2.lang.Integer.Tests15;
import gnu.testlet.java2.lang.Integer.compareTo;
import gnu.testlet.java2.lang.Integer.decode;
import gnu.testlet.java2.lang.Integer.getInteger;
import gnu.testlet.java2.lang.Integer.new_Integer;
import gnu.testlet.java2.lang.Integer.parseInt;
import gnu.testlet.java2.lang.Integer.toStringIntegerTests;
import gnu.testlet.java2.lang.String.CASE_INSENSITIVE_ORDER;
import gnu.testlet.java2.lang.String.StringTest;
import gnu.testlet.java2.util.AbstractCollection.AcuniaAbstractCollectionTest;
import gnu.testlet.java2.util.AbstractList.AcuniaAbstractListTest;
import gnu.testlet.java2.util.Collections.copy;
import gnu.testlet.java2.util.Vector.removeAll;
import gnu.testlet.java2.util.regex.Matcher.Regions;
import gnu.testlet.java2.util.regex.Matcher.hitEnd;
import gnu.testlet.java2.util.regex.Pattern.matches;

import java.util.LinkedList;

import org.sgx.j2s.mauve.fixes.Fixes;
import org.sgx.j2s.mauve.test.exceptions.ExceptionsTest;
import org.sgx.j2s.mauve.test.inheritance.InherTest1;

public class SingleTestReport {
	public static void main(String[] args) {
//		doInteger();
//		Fixes.getInstance().applyAllFixes();
//		doCharacter();
		LinkedList<Testlet> tests = new LinkedList<Testlet>();
//		JavaLangTests.doCharacter(tests);
//		JavaLangTests.doLong(tests);
		tests.add(new AcuniaAbstractListTest()); 
		test(tests);
		
		try {
			System.out.println("sdf"); 
		} catch (Exception e) {
			// TODO: handle exception
		}
//		
	}

//	private static void doCharacter() {
//		new SingleTestReport().test(new Testlet[]{
//				});
//	}

	private static void doInteger() {
		new SingleTestReport().test(new Testlet[]{
			new IntegerTest(), 
			new compareTo(), 
			new decode(), 
			new getInteger(), 
			new IntegerBitStuff(), 
			new new_Integer(),
			new parseInt(),
			new Tests15(), 
			new toStringIntegerTests()
			});
	}

	public void test(Testlet[] t) {
		Fixes.getInstance().applyAllFixes();
		LinkedList<Testlet> tests = new LinkedList<Testlet>();
		for (int i = 0; i < t.length; i++) {
			tests.add(t[i]);
		}
//	    tests = new LinkedList<Testlet>();

//	    new J2sTests(tests);
//	    new JavaLangTests(tests);
		test(tests);
		
	}

	private static void test(LinkedList<Testlet> tests) {

		Tester tester = new Tester(tests, "gnu.testlet.java2");
		tester.testAll();
		Utils.print(tester.buildHTMLReport());
	}
}
