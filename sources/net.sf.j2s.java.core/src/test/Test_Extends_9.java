package test;

abstract public class Test_Extends_9 extends Test_ {

	{
	  System.out.println("9.1 init");
	}

	{
//		int[] test8b = new int[8];
		System.out.println("9.2 init - prepare fields");
	}


	public void test8(){
		System.out.println("Test_9.test8()");
	};

//	public Test_8b(){
//	  System.out.println("8.3 construct()");
//	};

	public Test_Extends_9(int... ints){
	  System.out.println("9.3 construct()");
		// nah, this is not the default constructor
		System.out.println("constructor 9 [], ...)");
	};

}
