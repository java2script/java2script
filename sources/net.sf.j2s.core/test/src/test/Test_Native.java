package test;

/**
 * @j2sXHTML
 * 
 * 			<a href=testing>testing</a>
 * 
 */
class Test_Native extends Test_ {

	private abstract class IF {
		abstract void testing(int a);
	}

	int test = 3;

	public native void testNative();

	public native void testNative2();

	/**
	 * @j2sNative
	 * 
	 * 		//	return /-* testing *-/ and <@>here
	 * 
	 */
	public void test() {
		/**
		 * @j2sNative
		 * 
		 * 		//	return /-* test2 *-/ and <@>here
		 * 
		 */
		{
			int i =0;
		}
	}

	/**
	 * @j2sNative
	 * 
	 * 			ignored
	 * 
	 */
	int ii = 0;
	{
		ii = 1;
	}

	
	/**
	 * @j2sNative
	 * 
	 * 		 //	ok
	 * 
	 */
	{}

	public void test2() {
		int  j = 0;
		/**
		 * @j2sIgnore
		 */
		{
			j = 3 + ii;			
		}
		/**
		 * @j2sNative
		 * 
		 * 	j = 1	//	ignored
		 * 
		 */
		/**
		 * @j2sNative
		 * 
		 *  this.ii = -1;
		 * 	j = 2		// ok
		 * 
		 */
		{
		}
		assert(j == 3 + ii);
	}

	public static void main(String[] args) {
		new Test_Native().test2();
		System.out.println("Test_Native OK");
	}

}