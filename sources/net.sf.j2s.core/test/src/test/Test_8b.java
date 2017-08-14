package test;

abstract public class Test_8b {

	{
	  System.out.println("8.1 init");
	}

	{
//		int[] test8b = new int[8];
		System.out.println("8.2 init - prepare fields");
	}


	public void test8b(){
		System.out.println("Test_8.test8()");
	};

//	public Test_8b(){
//	  System.out.println("8.3 construct()");
//	};

	public Test_8b(int... ints){
	  System.out.println("8.3 construct()");
		// nah, this is not the default constructor
		System.out.println("constructor 8 [], ...)");
	};

}
