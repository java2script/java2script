package test;

class Test_Class3h extends Test_ implements Test_Class3fint1, Test_Class3fint3 {

   // two interfaces; references the first (7) and then the second interface field in a sub-interface(6 of 5)
   // result: interface is initialized [super,sub] [5,6] when referenced
	
	
	static  {
		System.out.println("Test_Class3h static init ");
	}

	static String test7b = test7;
	static String test =  test6;

	{
		System.out.println("Test_Class3h nonstatic init 3h 7 5 6 3h 3h 3h");
	}

	public Test_Class3h() {
		System.out.println("Test_Class3h constr ");
	}

	public static void main(String[] args) {
		System.out.println("Test_Class3h main ");
		new Test_Class3h();
	}

}
