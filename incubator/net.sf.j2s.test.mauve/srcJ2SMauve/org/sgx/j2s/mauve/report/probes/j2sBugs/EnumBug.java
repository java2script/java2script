package org.sgx.j2s.mauve.report.probes.j2sBugs;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;


public class EnumBug {
  static enum E { A, B, C }
  
  public void test(TestHarness harness)
  {
    try
      {
	E e = E.valueOf("A");
	harness.check(e.toString().equals("A"));
      }
    catch (Exception e)
      {
	harness.debug(e);
	harness.fail(e.toString());
      }
  }
}

