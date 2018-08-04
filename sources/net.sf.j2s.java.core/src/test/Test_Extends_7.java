package test;

public class Test_Extends_7 extends Test_Extends_8 {

//  Java Sequence is:
// 
//	7.0 main
//	8.1 init
//	8.2 init - prepare fields
//	8.3 construct()
//	7.1 init
//	7.2 init - prepare fields
//	7.3 construct

	{
		System.out.println("7.1 init");
	}
	
	{
		//int[] test7 = new int[7];
		System.out.println("7.2 init - prepare fields");
	}

	public Test_Extends_7(int... ints) {
		// this constructor is called as default constructor
	  System.out.println("7.3 construct int[]");
	}

	public Test_Extends_7(float... floats) {
		// this constructor is not called as default constructor
		System.out.println("7.3 construct float[]");
	}

	public static void main(String[] args) {
	  System.out.println("7.0 main");
		new Test_Extends_7();
	}
}
