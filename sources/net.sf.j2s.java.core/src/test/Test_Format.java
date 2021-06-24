package test;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.text.FieldPosition;
import java.text.NumberFormat;
import java.util.Date;

public class Test_Format extends Test_ {
	private static FieldPosition fp;

	public static void main(String[] args) {

		
		String s;

		s = new Date().toString();
		NumberFormat nf = new DecimalFormat();
		nf.setMaximumFractionDigits(2);
		nf.setMinimumFractionDigits(2);

		StringBuffer ret = new StringBuffer();
		ret.append("testing:");
		fp = new FieldPosition(java.text.NumberFormat.FRACTION_FIELD);
		
		StringBuffer ret1 = nf.format(3.456, ret, fp);
		System.out.println(ret1);
		System.out.println(fp);
		assert(ret1 == ret);
		assert(ret1.toString().equals("testing:3.46"));
		assert(fp.getBeginIndex() == 10 && fp.getEndIndex() == 12);

		
		BigDecimal bd = new BigDecimal(23.456);
		s = nf.format(bd);
		System.out.println("BigDecimal test: " + s);
		assert(s.equals("23.46"));

		BigInteger bi = BigInteger.valueOf(3200);
		s = nf.format(bi);
		System.out.println("BigInteger test: " + s);
		assert(s.equals("3,200.00"));

		bi = new BigInteger("123456789012345678901234567890");
		s = nf.format(bi);
		System.out.println("BigInteger test: " + s);
		assert(s.equals("123,456,789,012,345,678,901,234,567,890.00"));

		
		s = String.format("%s %d", "testing", 3);
		assert (s.equals("testing 3"));

		assert (String.format("%s %d-%d", "testing", 3, 4).equals("testing 3-4"));

		s = test(100 * Math.pow(10, -6), 2);
		System.out.println(s);
		assert s.equals("prec=2 0.00 0.00010 1.00e-04");

		s = test(100 * Math.pow(10, 4), 2);
		System.out.println(s);
		assert s.equals("prec=2 1000000.00 1.0e+06 1.00e+06");

		System.out.println("Test_Format OK");
	}

	private static String test(double value, int prec) {
		System.out.println(value);
		String s = "prec=" + prec + " " + String.format("%1." + prec + "f", value) + " "
				+ String.format("%1." + prec + "g", value) + " " + String.format("%1." + prec + "e", value);
		return s;
	}

}
