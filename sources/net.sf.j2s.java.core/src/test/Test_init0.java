package test;

public class Test_init0 extends Test_ {

	double test01;
	double test02 = 0;
	
	static int loadpt = 0;
	
	static String sts0 = "sts0";

	{
		System.out.println("point 3");
		System.out.println("static string sts/sts0:" + Test_Init.sts + " " + sts0);
		assert(++loadpt == 3);
	}
	
	static {
		System.out.println("point 1");
		System.out.println("static string sts/sts0:" + Test_Init.sts + " " + sts0);
		assert(++loadpt == 1);
		changeSts();
	}

	void checkTesting(int pass) {
		System.out.println("--");
	} 

	
	private static String changeSts() {
		String s = Test_Init.sts;
		Test_Init.sts = "temp_only";
		return s;
	}


	public Test_init0() {
		System.out.println("point 4");
		assert(++loadpt == 4);
		sts0 = "new";
		checkTesting(1);
		assert(test01 == 0 && test02 == 0); 
	};
	
}