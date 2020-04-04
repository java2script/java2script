package test;


class Test_Static3 extends Test_ {


	static {
		System.out.println("Test_Static3.1 2 <clinit>1");
	}

	static int v3 = 3;
	static String s3 = "s3";
	

	static Test_Static2b ts2b = new Test_Static2b("new static2b"); // the killer?
	static Test_Static2 ts2 = new Test_Static2("new static2");
	
	static {
		System.out.println("Test_Static3.2 7 <clinit>2");
	}

	{
		System.out.println("Test_Static3.3 3,10,4.3<init>");
		
	}

	Test_Static3(String test) {
		System.out.println("Test_Static3.4 <c> 4,11,4.4 test_int was " + test_int + " v3=" + v3 + " s3=" + s3 + " test=" + test);
		test_int = 3;
	}
}
