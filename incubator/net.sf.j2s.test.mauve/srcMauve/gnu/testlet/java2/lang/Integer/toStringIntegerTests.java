package gnu.testlet.java2.lang.Integer;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;
/**
 * Integer toBinaryString, 
 * @author sgurin
 *
 */
public class toStringIntegerTests implements Testlet{
@Override
public void test(TestHarness h) {
	h.check(Integer.toBinaryString(9).equals("1001"), "toBinaryString 9");
	h.check(Integer.toBinaryString(-9).equals("11111111111111111111111111110111"), "toBinaryString -9");
	h.check(Integer.toBinaryString(0).equals("0"), "toBinaryString 0");
	
	h.check(Integer.toHexString(12).equals("c"), "toHexString 12");
	h.check(Integer.toHexString(-12).equals("fffffff4"), "toHexString -12 gives: "+Integer.toHexString(-12));
	h.check(Integer.toOctalString(12), "toOctal 12");
	
}
}
