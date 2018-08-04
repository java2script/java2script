package test;

class Test_NoHeadless_1 {
	
	static boolean j2sHeadless = true;

	static {
		ClassLoader.getSystemClassLoader().setDefaultAssertionStatus(false);
	}
	
	  public static void main(String[] args) {
		  Test_NoAssert.main(args);
	  }

	
	
}