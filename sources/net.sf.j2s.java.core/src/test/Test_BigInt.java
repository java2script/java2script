package test;

import java.math.BigDecimal;
import java.math.BigInteger;

public class Test_BigInt extends Test_ {

	public static void main(String[] args) {

		BigInteger b = BigInteger.valueOf(1000);
		BigInteger c = BigInteger.valueOf(2000);
		BigInteger d = b.add(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		assert(d.toString().equals("24000000000000"));
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.multiply(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		d = d.divide(c);
		System.out.println(d);
		
		BigDecimal e = new BigDecimal(20000);
		BigDecimal f = new BigDecimal(45000);
		BigDecimal g = f.divide(e);
		System.out.println(g);
		System.out.println(g);
		
		
		
		// OK through 48000000000000
//		d = d.multiply(c);
//		System.out.println(d);
//		d = d.multiply(c);
//		System.out.println(d);
		System.out.println("Test_BigInt OK");
	}
}

