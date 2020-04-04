package test;

class Test_Static2 extends Test_Static3 {

	static {
		System.out.println("Test_Static2.1 8 <clinit>1");
	}

	static int v2 = 2;

	static String s2 = "s2";
	
	static {
		System.out.println("Test_Static2.2 9 <clinit>2");
	}
	
	{
		System.out.println("Test_Static2.3 5,12 <init>");
		
	}

	Test_Static2(String test) {
		super(test);
		System.out.println("Test_Static2.4 6,13 <c> test_int was " + test_int + " v2=" + v2 + " s2=" + s2 + " v3=" + v3  + " s3=" + s3);
		test_int = 2;
	}

}
