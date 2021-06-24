package test;

import test.math.BigDecimal;

import test.math.MathContext;
//import test.math.BigInteger;
//import test.math.MutableBigInteger;
//import java.util.GregorianCalendar;


public class Test_BigDec extends Test_ {

    
    public static void main(String[] args) {

    	testBDDiv();
    	testBDMul();
    	
		System.out.println("testBD OK");

	}

	// failing		testBDDiv();
	
	

	private static void testBDMul() {
		
		System.out.println("testBDMul");
		BigDecimal g;
		g = new BigDecimal(200.05, new MathContext(6));
		System.out.println("200.050 == " + g.toString());
		assert(g.toString().equals("200.050"));

		g = new BigDecimal(1);
		g = new BigDecimal(200.05);
		System.out.println("200.05 = " + g);
		assert (g.toString().equals("200.05000000000001136868377216160297393798828125"));
		System.out.println("200 = " + g.toBigInteger());
		assert (g.toBigInteger().toString().equals("200"));
		
		BigDecimal e = new BigDecimal("200.05");
		System.out.println(e);
		BigDecimal f = new BigDecimal(45000);
		System.out.println(" f = " + f);
		assert(f.compareTo(new BigDecimal(45000)) == 0);
		g = f.multiply(e);
		System.out.println(" f * 200.05 = " + g);
		assert(g.toString().equals("9002250.00"));

		f = f.movePointLeft(3);
		System.out.println(" f << 3 " + f);
		assert(f.compareTo(new BigDecimal(45000)) == -1);
		f = new BigDecimal(45000000L);
		System.out.println(" f = " + f);
		f = f.movePointLeft(6);
		System.out.println(" f << 6 " + f);
		assert(f.compareTo(new BigDecimal("4500.00")) == -1);
		assert(f.compareTo(new BigDecimal("0.00450000")) == 1);
		

		
		long time = 1538673122263L;//System.currentTimeMillis();
		g = BigDecimal.valueOf(time, 3);
		System.out.println(time + " " + g.toString());
		assert (g.toString().equals("1538673122.263"));

		System.out.println("testBDMul OK");
	}

	private static void testBDDiv() {
		
		System.out.println("testBDDiv");

		BigDecimal g, a, b;
		
		String zeros = "";
//		for (int i = 1; i < 100; i++) {
//			g = new BigDecimal("50" + zeros).divide(BigDecimal.valueOf(2), 10, BigDecimal.ROUND_DOWN);
//			//System.out.println(g);
//			assert(g.toString().equals("25" + zeros + ".0000000000"));
//			zeros += "0";
//		}
//
		zeros = "";
		BigDecimal b1000 = BigDecimal.valueOf(1000);
		for (int i = 1; i < 100; i++) {
			g = new BigDecimal("50000" + zeros);
			g=g.divide(b1000, 10, BigDecimal.ROUND_DOWN);
			System.out.println(g);
			assert(g.toString().equals("50" + zeros + ".0000000000"));
			zeros += "0";
		}

		
		a = new BigDecimal(0);
		b = new BigDecimal(2.01);
		g = a.divide(b,10,BigDecimal.ROUND_DOWN);
		System.out.println(g);
		a = new BigDecimal(5.1);
		b = new BigDecimal(2.01);
		g = a.divide(b,10,BigDecimal.ROUND_DOWN);
		System.out.println(g);
		assert(g.toString().equals("2.5373134328"));
		System.out.println("testBDDiv OK");
	}
	

}

