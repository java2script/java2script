package test;

import javajs.util.DF;

class Test_Double extends Test_{
	
	public static void main(String[] args) {
	    assert(DF.formatDecimal(-0.999999f, -4).equals("-1.000E+0"));
	    assert(DF.formatDecimal(9.999999f, -4).equals("1.000E+1"));
	    assert(DF.formatDecimal(9.999999f, 4).equals("10.0000"));
	    assert(DF.formatDecimal(9.999999f, 8).equals("9.99999900"));
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
	
}