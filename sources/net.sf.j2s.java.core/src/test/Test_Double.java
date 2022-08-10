package test;

import javajs.util.DF;
import javajs.util.PT;

strictfp class Test_Double extends Test_{
	
	public static void main(String[] args) {
		
		
		Double d = new Double("-0");
		Double d1 = Double.valueOf(-0);
		System.out.println(d);
		System.out.println(d1);
		System.out.println("" + d);
		System.out.println("" + d1);
		System.out.println(Double.valueOf(0) == Double.valueOf(-0));	
		System.out.println(Double.valueOf(0).equals(Double.valueOf(-0)));	
		System.out.println(d == Double.valueOf(-0));	
		System.out.println(d == Double.valueOf(0));	
		System.out.println(d1 == Double.valueOf(-0));	
		System.out.println(d1 == Double.valueOf(-0));	
		
		
		
		assert(("" + Double.valueOf(-0)).equals("0.0"));
		assert(d != Double.valueOf(0));
		assert(d != Double.valueOf(-0));
		assert(("" + d).equals("-0.0"));
		assert(d.doubleValue() == 0);
		assert(("" + d.doubleValue()).equals("-0.0"));
		assert(1/d.doubleValue() == Double.NEGATIVE_INFINITY);
		
		// noting here that in Java and JavaScript, Double.valueOf(-0) is 0, not -0
		// Java
		// and in JavaScript but not Java, "" + (-0) is "0" not "-0" -- this appears to be a mistake in JavaScript.
		

		System.out.println((PT.toDouble(-0.999999f)) + " " + (1d-0.999999d)
				+ " " + 0.000001d
		+ " " + (double) -0.999999f);
	    assert(DF.formatDecimal(-0.999999f, -4).equals("-1.000E+0"));
	    assert(DF.formatDecimal(9.999999f, -4).equals("1.000E+1"));
	    assert(DF.formatDecimal(9.999999f, 4).equals("10.0000"));
	    assert(DF.formatDecimal(9.999999d, 8).equals("9.99999900"));
		assert(("" + new Double(3)).equals("3.0"));
		assert(("" + new Float(3)).equals("3.0"));
		assert(("" + new Double(3) * 3).equals("9.0"));
		float x = 3;
		float y = 3;
		int i = 3;
		assert(("" + x).equals("3.0"));
		assert(("" + y).equals("3.0"));
		assert(("" + x * y).equals("9.0"));
		assert(("" + (y + 0)).equals("3.0"));
		assert(("" + (i + 0.0)).equals("3.0"));
		assert(("" + Math.round(y)).equals("3"));

		assert (("" + new Double(3)).equals("3.0"));
		assert (("" + new Float(3)).equals("3.0"));
		assert (("" + new Double(3) * 3).equals("9.0"));
		assert (("" + x).equals("3.0"));
		assert (("" + y).equals("3.0"));
		assert (("" + x * y).equals("9.0"));
		assert (("" + (y + 0)).equals("3.0"));
		assert (("" + (i + 0.0)).equals("3.0"));
		assert (("" + Math.round(y)).equals("3"));

		assert (new Double(3) > new Double(1));
		assert (new Double(3) <= new Float(5));

		System.out.println("Test_Double OK");
		
		

	}

//	static {
//		float ff = 1f/27;
//		double dd = 1d/27;
//		System.out.println("" + dd + " " + ff);
//		System.out.println((double) ff);
//		System.out.println(Float.valueOf(ff).doubleValue());
//		System.out.println(Double.valueOf("" + ff));
//		System.out.println("showing that (float) d is always f, "
//				+ "and Double.parseDouble(\"\" + f) does the correct rounding,"
//						+ "but you should never use (double) float,"
//						+ "because that results in trash digits");
//		for (int i = 1; i < 10000000; i++) {
//			float f = 1f/i;
//			double d = 1d/i;
//			double df = (double) f;
//			if ((float) d != f || (float) df != f || Double.parseDouble("" + f) != f) {
//				System.out.println(d + " " + ((float) d) 
//						+ " " + Double.parseDouble("" + f)
//						+ " " + f + " " + df + " " + ((float) df));
//			}
//			
//		}
//
//	}
	
}