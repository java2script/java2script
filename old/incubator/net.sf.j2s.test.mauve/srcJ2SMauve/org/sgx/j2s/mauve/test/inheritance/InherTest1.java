package org.sgx.j2s.mauve.test.inheritance;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;

public class InherTest1 implements Testlet {
@Override
public void test(TestHarness h) {
	h.check(new org.sgx.j2s.mauve.test.inheritance.auxClasses.A("A").getS().equals("A"));
	h.check(new org.sgx.j2s.mauve.test.inheritance.auxClasses.B("A").getS().equals("BA"));
}
}
