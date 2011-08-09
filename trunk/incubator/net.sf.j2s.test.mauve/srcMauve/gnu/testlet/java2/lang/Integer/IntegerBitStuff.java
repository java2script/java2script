package gnu.testlet.java2.lang.Integer;

import gnu.testlet.TestHarness;
import gnu.testlet.Testlet;
/**
 * test of java.lang.Integer.bit operations. Note that the spected results
 * are not based on javadoc but in sun jdk6 results. 
 * So it is not oriented to tests a java compiler but to assure that at 
 * least java2script behaves like sun jdk6
 * 
 * @author sgurin
 *
 */
public class IntegerBitStuff implements Testlet {

	@Override
	public void test(TestHarness h) {
//		int[]bitCountValues=new int[]{3000, 7, -9999, 25, 0, 0};
//		for (int i = 0; i < bitCountValues.length; i+=2) {
//			h.check(Integer.bitCount(bitCountValues[i])==bitCountValues[i+1], "integer bitCount for value "+bitCountValues[i]);
//		}
		
		int[]highestOneBitValues = new int[]{1000, 512, -1000, -2147483648, 0, 0};
		for (int i = 0; i < highestOneBitValues.length; i+=2) {
			h.check(Integer.highestOneBit(highestOneBitValues[i])==highestOneBitValues[i+1], "integer highestOneBitValues for value "+highestOneBitValues[i]);
		}
		
		int[]lowestOneBitValues = new int[]{1000, 8, -1000, 8, 0, 0};
		for (int i = 0; i < lowestOneBitValues.length; i+=2) {
			h.check(Integer.lowestOneBit(lowestOneBitValues[i])==lowestOneBitValues[i+1], "integer lowestOneBitValues for value "+lowestOneBitValues[i]+" - gives "+Integer.lowestOneBit(lowestOneBitValues[i])+ " but should give "+lowestOneBitValues[i+1]);
		}
		
		int[] numberOfLeadingZerosValues = new int[]{1000, 22, -1111, 0, 0, 32};
		for (int i = 0; i < numberOfLeadingZerosValues.length; i+=2) {
			h.check(Integer.numberOfLeadingZeros(numberOfLeadingZerosValues[i])==numberOfLeadingZerosValues[i+1], "integer lowestOneBitValues for value "+numberOfLeadingZerosValues[i]+" - gives "+Integer.numberOfLeadingZeros(lowestOneBitValues[i])+ " but should give "+numberOfLeadingZerosValues[i+1]);
		}
		
		
		int [] numberOfTrailingZerosValues = new int[]{1000, 3, -1000, 3, 2, 1, 0, 32};
		for (int i = 0; i < numberOfTrailingZerosValues.length; i+=2) {
			h.check(Integer.numberOfTrailingZeros(numberOfTrailingZerosValues[i])==numberOfTrailingZerosValues[i+1], "integer lowestOneBitValues for value "+numberOfTrailingZerosValues[i]+" - gives "+Integer.numberOfTrailingZeros(lowestOneBitValues[i])+ " but should give "+numberOfTrailingZerosValues[i+1]);
		}
		
		
		int [] reverseValues = new int[]{1000, 398458880, -1000, 406847487, 0, 0};
		for (int i = 0; i < reverseValues.length; i+=2) {
			h.check(Integer.reverse(reverseValues[i])==reverseValues[i+1], "integer lowestOneBitValues for value "+reverseValues[i]+" - gives "+Integer.reverse(lowestOneBitValues[i])+ " but should give "+reverseValues[i+1]);
		}
		
		
		int [] reverseBytesValues = new int[]{100, 1677721600, -88, -1459617793, 0, 0};
		for (int i = 0; i < reverseBytesValues.length; i+=2) {
			h.check(Integer.reverseBytes(reverseBytesValues[i])==reverseBytesValues[i+1], "integer lowestOneBitValues for value "+reverseBytesValues[i]+" - gives "+Integer.reverseBytes(reverseBytesValues[i])+ " but should give "+reverseBytesValues[i+1]);
		}
		
		
		h.check(Integer.rotateLeft(1000, 1)==2000, "rotateLeft (1000,1)");
		h.check(Integer.rotateLeft(-1000, 2)==-3997, "rotateLeft (-1000,2)");
		h.check(Integer.rotateLeft(-1000, -2)==1073741574, "rotateLeft (-1000, -2)");
		
		h.check(Integer.rotateRight(-1000,-2)==-3997, "rotateRight (-1000,-2)");
		h.check(Integer.rotateRight(1000,2)==250, "rotateRight (1000,2)");
		
		
		h.check(Integer.signum(1)==1, "signum(1)");
		h.check(Integer.signum(-14)==-1, "signum(-14)");
		h.check(Integer.signum(0)==0, "signum(0)");
	}

}
