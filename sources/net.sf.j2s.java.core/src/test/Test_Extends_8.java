package test;

abstract public class Test_Extends_8 extends Test_Extends_9 {

	{
	  System.out.println("8.1 init");
	}

	{
		//int[] test8 = new int[8];
		System.out.println("8.2 init - prepare fields");
	}


	public void test8(){
		System.out.println("Test_Extends_8.test8()");
	};

//	public Test_8(){
//	  System.out.println("8.3 construct()");
//	};

//	public Test_8(int... ints){
//	  System.out.println("8.3 construct()");
//		// nah, this is not the default constructor
//		System.out.println("constructor 8 [], ...)");
//	};

}
