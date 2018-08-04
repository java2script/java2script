package test;

class Test_GenericIMV_AB<A, B> extends Test_ implements Test_Generic_MV<A, B> {
	
	
	void test(A a, B b) {
		test2(a, b);
	}

	private void test2(A a, B b) {
		Test_GenericIMV_AB c = new Test_GenericEABIXY();
		String s = "" + a + b;
		show(s, b);
		c.compareTo(a, b);
	}

	public int show(String msg, B b) {
		System.out.println("showing Test_AMV_AB " + msg);
		return 0;
	}

	@Override
	public int compareTo(A s) {
		// TODO Auto-generated method stub
		return 0;
	}

	public int compareTo(A s, B i) {
		// TODO Auto-generated method stub
		System.out.println("Test_GenericC AB ");
		System.out.println("Test_GenericAB should not be called.");
		assert(false);
		return -1;
	}

	@Override
	public int compareTo(A s, String t, String t1) {
		// TODO Auto-generated method stub
		return 0;
	}

}


