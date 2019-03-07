package test;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.MathContext;
import java.math.MutableBigInteger;
import java.util.GregorianCalendar;

import org.apache.xerces.jaxp.datatype.XMLGregorianCalendarImpl;


public class Test_BigDec extends Test_ {

    
    public static void main(String[] args) {

    	testBDMul();
    	testBDDiv();
    	

	}

	// failing		testBDMul();
	
	

	private static void testBDMul() {
		BigDecimal g;
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
		System.out.println(time + " " + g);
		assert (g.toString().equals("1538673122.263"));

		g = new BigDecimal(200.05, new MathContext(6));
		System.out.println(g);
		assert(g.toString().equals("200.050"));


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

