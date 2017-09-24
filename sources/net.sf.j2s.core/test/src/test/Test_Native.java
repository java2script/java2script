package test;

/**
 * @j2sXHTML
 * 
 * 			<a href=testing>testing</a>
 * 
 */
class Test_Native {

	private abstract class IF {
		abstract void testing(int a);
	}

	int test = 3;

	public native void testNative();

	public native void testNative2();

	/**
	 * @j2sNative
	 * 
	 * 			return /-* testing *-/ and <@>here
	 * 
	 */
	
	
	
	
	
	
	
	
	
	
	
	public void test() {
	}

	public void test2() {
		/**
		 * @j2sNative
		 * 
		 * 			return /-* testing *-/ and <@>here
		 * 
		 */
		{
		}
	}

	public static void main(String[] args) {
	}

}