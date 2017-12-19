package test;

class Test_cinit5 {
	
	static int j = Test_Cinit2.p;
	Test_Cinit2 a = new Test_Cinit2(j);
	Test_cinit5(int p, int jtest) {
		System.out.println("j is " + j);
		assert (j == jtest);
		System.out.println("Test_Cinit2.p is " + Test_Cinit2.p + " p is "  + p);
		assert(Test_Cinit2.p == p);
	}

	
	
}