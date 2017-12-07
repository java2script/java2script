package test;

/**
 * Check for fields initialization timing.
 * 
 * @author RM
 *
 */
public class Test_Init extends Test_init0 {

	int testing1;
	int testing2 = 3;
	
	String s1;
	String s2 = "testing";
	
	static String s;
	
	Test_Init() {
		super();
		checkTesting(2);
	}

	@Override
	void checkTesting(int pass) {
		System.out.println("testing:" + testing1 + " " + testing2);
		System.out.println("s:" + s1 + " " + s2);
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

