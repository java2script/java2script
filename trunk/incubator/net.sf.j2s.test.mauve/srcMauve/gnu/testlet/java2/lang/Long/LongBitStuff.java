package gnu.testlet.java2.lang.Long;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;

/**
 * 
 * @author sgurin
 *
 */
public class LongBitStuff implements Testlet{

	@Override
	public void test(TestHarness h) {
		h.check(Long.bitCount(1000)==6, "bitCount1");
		h.check(Long.bitCount(-1000)==56, "bitCount2");
		h.check(Long.bitCount(0)==0, "bitCount3");
		
		h.check(Long.rotateRight(1000,3)==125, "rotateRight1");
		h.check(Long.rotateRight(30,0)==30, "rotateRight2");
		h.check(Long.rotateRight(1000,-3)==8000, "rotateRight3");
		
		h.check(Long.highestOneBit(1000)==512, "highestOneBit1");
		h.check(Long.highestOneBit(-1000)==-9223372036854775808l, "highestOneBit2");
				
		h.check(Long.lowestOneBit(1000)==8, "lowestOneBit1");
		h.check(Long.lowestOneBit(-1000)==8, "rotateRight2");
		
		h.check(Long.numberOfLeadingZeros(-1000)==0, "numberOfLeadingZeros1");
		h.check(Long.numberOfLeadingZeros(1234)==53, "numberOfLeadingZeros2");
		
		h.check(Long.numberOfTrailingZeros(-1000)==0, "numberOfTrailingZeros1");
		h.check(Long.numberOfTrailingZeros(123)==0, "numberOfTrailingZeros2");
		
		h.check(Long.signum(123)==1, "signum1");
		h.check(Long.signum(-123)==-1, "signum2");
		h.check(Long.signum(0)==0, "signum3");
		
		h.check(Long.reverse(123)==-2449958197289549824l, "reverse1");
		h.check(Long.reverse(-123)==-6773413839565225985l, "reverse2");
		
		h.check(Long.reverseBytes(-123)==-8791026472627208193l, "reverseBytes1");
		h.check(Long.reverseBytes(123)==8863084066665136128l, "reverseBytes2");
	}

}
