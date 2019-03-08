package test;

import test.math.BigDecimal;
import test.math.MathContext;

public class Test_BigDecJava extends Test_ {

    
    public static void main(String[] args) {

    	testBDMul();
    	testBDDiv();
    	

	}

	// failing		testBDMul();
	
	

	private static void testBDMul() {
		BigDecimal g;
		
		g = new BigDecimal(200.05, new MathContext(6));
		System.out.println("200.050 == " + g.toString());
		assert(g.toString().equals("200.050"));

		
		g = new BigDecimal(200.05);
		System.out.println("200.05 = " + g);
		System.out.println("200 = " + g.toBigInteger());
		g = new BigDecimal(200.05, new MathContext(6));
		System.out.println(g);
		long time = 1538673122263L;//System.currentTimeMillis();
		g = BigDecimal.valueOf(time, 3);
		System.out.println(time + " " + g);
		assert (g.toString().equals("1538673122.263"));

		BigDecimal e = new BigDecimal("200.05");
		System.out.println(e);
		BigDecimal f = new BigDecimal(45000);
		System.out.println(f);
		g = f.multiply(e);
		System.out.println(g);
		assert(g.toString().equals("9002250.00"));
		assert(f.compareTo(new BigDecimal(45000)) == 0);

		f = f.movePointLeft(3);
		System.out.println(f);
		assert(f.compareTo(new BigDecimal(45000)) == -1);
		f = new BigDecimal(45000000L);
		System.out.println(f);
		f = f.movePointLeft(6);
		System.out.println(f);
		assert(f.compareTo(new BigDecimal("4500.00")) == -1);
		assert(f.compareTo(new BigDecimal("0.00450000")) == 1);
		System.out.println("testBDMul OK");
	}

	private static void testBDDiv() {
		BigDecimal g;
		g = BigDecimal.valueOf(5).divide(BigDecimal.valueOf(2));
		System.out.println(g);
		assert(g.toString().equals("2.5"));
		System.out.println("testBDDiv OK");
	}
	

}

