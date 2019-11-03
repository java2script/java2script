package org.sgx.j2s.mauve.report;

import gnu.testlet.Testlet;
import java.util.LinkedList;

import org.sgx.j2s.mauve.test.exceptions.ExceptionsTest;
import org.sgx.j2s.mauve.test.inheritance.InherTest1;

public class J2sTests {

	public J2sTests(LinkedList<Testlet> tests) {
		tests.add(new ExceptionsTest());
		tests.add(new InherTest1());
	}

}
