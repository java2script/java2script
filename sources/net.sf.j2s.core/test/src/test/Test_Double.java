package test;

class Test_Double extends Test_{
	
	public static void main(String[] args) {
		System.out.println(("" + new Double(3)).equals("3.0"));
		System.out.println(("" + new Float(3)).equals("3.0"));
		System.out.println(("" + new Double(3) * 3).equals("9.0"));
		float x = 3;
		float y = 3;
		int i = 3;
		System.out.println(("" + x).equals("3.0"));
		System.out.println(("" + y).equals("3.0"));
		System.out.println(("" + x * y).equals("9.0"));
		System.out.println(("" + (y + 0)).equals("3.0"));
		System.out.println(("" + (i + 0.0)).equals("3.0"));
		System.out.println(("" + Math.round(y)).equals("3"));

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