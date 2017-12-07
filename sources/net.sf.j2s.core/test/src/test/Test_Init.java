package test;

/**
 * Check for fields initialization timing.
 * 
 * @author RM
 *
 */
public class Test_Init extends Test_init0 {

	// statics -- defined once
	
	static {
		System.out.println("point 2");
		System.out.println("static string sts/sts0:" + Test_Init.sts + " " + sts0);
		assert(++loadpt == 2);

		int is = 0;
		int bs = is + 3;
	}

	// static fields -- will be defined twice -- first for initial defaults (in class), then final values (in $clinit$)

	static int iAs = 'A';
	static char cs = 'C';
	static char cis = 65; 
	static byte bAAs = 'A'; 
	static int iABs = 'A' + cs; 
	static String sts = "test";
	static int testing1s;  
	static int testing2s = 3;
	static String s; 
	static String s0 = "0";

	
	
	// nonstatic fields -- will be defined twice -- first for initial default ($init0$), then final values ($init$)
	
	int iA = 'A';
	char c = 'C';
	char ci = 65; 
	byte bAA = 'A';
	int iAB = 'A' + c; 
	String st = "test";
	
	
	int testing1;  
	int testing2 = 3;

	
	String s1;
	String s2 = "testing";

	// initializer - defined once, in $init$ only
	
	{
		System.out.println("point 5");
		System.out.println("static string sts/sts0:" + Test_Init.sts + " " + sts0);
		assert(++loadpt == 5);
		int i = 0;
		int b = i + 3;
	}
	
	

	Test_Init() {
		super();
		System.out.println("point 6");
		assert(++loadpt == 6);

		checkTesting(2);
	}

	@Override
	void checkTesting(int pass) {
		System.out.println("pass " + pass + " static string sts/sts0:" + sts + " " + sts0);
		System.out.println("pass " + pass + " testing:" + testing1 + " " + testing2);
		System.out.println("pass " + pass + " s:" + s1 + " " + s2);
		assert(testing2 == (pass == 1 ? 0 : 3));
		assert(s2 == (pass == 1 ? null : "testing"));
		// note: this next setting will be ignored!
		if (pass == 1)
			testing2 = 2;
	}

	public static void main(String[] args) {
		   new Test_Init();
		   System.out.println("Test_Init OK");
		}



}

