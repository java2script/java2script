package test;


/**
 * Test of static initialization of subclass with object initialization of superclass prior to static initialization of superclass
 * @author hansonr
 *
 */
class Test_Static1 extends Test_ {
	
	static {
		System.out.println("Test_Static1.1 1 <clinit>1");
	}

	static int v1 = 1;
	static String s1 = "s1";
	static Test_Static2 ts12 = new Test_Static2("Static1.ts2");
	static {
		System.out.println("Test_Static1.2 14 <clinit>2");
	}
	{
		System.out.println("Test_Static1.3 10 or 15 if not from Class.forName <init>");
		
	}
	Test_Static1(String test) {
		super();
		System.out.println("Test_Static1.4 15 or 16 if not from Class.forName(Test_Static1) <c> test_int was " + test_int + " v1=" + v1 + " s1=" + s1);
		test_int = 1;
	}

	public static void main(String[] args) {
		System.out.println("Test_Static1 [main]");
		new Test_Static1("Static1.main");

	}
}
