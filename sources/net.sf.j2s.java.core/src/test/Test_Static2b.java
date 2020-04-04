package test;

class Test_Static2b extends Test_Static3 {

	static {
		System.out.println("Test_Static2b.1 2.1 <clinit>1");
	}

	static int v2b = 20;

	static String s2b = "s2b";
	
	static {
		System.out.println("Test_Static2b.2 2.2 <clinit>2");
	}
	
	{
		System.out.println("Test_Static2b.3 4.1 <init>");
		
	}

	Test_Static2b(String test) {
		super(test);
		System.out.println("Test_Static2b.4 4.2 <c> test_int was " + test_int + " v2b=" + v2b + " s2b=" + s2b + " v3=" + v3  + " s3=" + s3);
		test_int = 2;
	}

}
